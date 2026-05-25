// =============================================================================
// Costs & Benefits Calculator
//
// Calculates NPV, emission savings, energy savings (buildings), and sensitivity
// analysis for pairs of decarbonisation measures vs. their fossil baselines.
//
// Expected input: data object from _data/costs-and-benefits.yaml (via Jekyll).
//
// Usage:
//   const result = CostsBenefits.calculate({
//     measureId: 20,
//     data: window.CB_DATA,             // {{ site.data['costs-and-benefits'] | jsonify }}
//     discountRate: 0.03,               // e.g. 0.00, 0.03, 0.07
//     carbonPriceEur: 60,               // e.g. 0, 60, 100, 200
//     priceScenario: 'CP',              // 'CP', 'NZ', or 'CP_EC'
//     exchangeRate: 23,                 // CZK per EUR
//     electricityPriceFactor: 1.0,      // transport EV charging scenario multiplier
//                                       // (from electricity_price_scenarios in the YAML)
//                                       // 0.5 = home solar, 1.0 = home grid, 2.0 = fast charger
//   });
//
// =============================================================================

const CostsBenefits = (() => {
  'use strict';

  // ---------------------------------------------------------------------------
  // Constants
  // ---------------------------------------------------------------------------
  const DEFAULT_DISCOUNT_RATE    = 0.03;
  const DEFAULT_CARBON_PRICE_EUR = 60;
  const DEFAULT_PRICE_SCENARIO   = 'CP';
  const DEFAULT_EXCHANGE_RATE    = 23;

  // Sensitivity analysis parameter labels (mirrors R make_variants)
  const SENSITIVITY_PARAM_ORDER = [
    // 'Cena uhlíku',
    // 'Diskontní míra',
    'Investiční náklady opatření',
    'Investiční náklady základní varianty',
    'Cena elektřiny',
    'Cena zemního plynu',
    'Cena hnědého uhlí',
    'Cena biomasy',
    'Cena benzínu',
    'Cena nafty',
  ];

  const FUEL_PRICE_LABEL = {
    Electricity: 'Cena elektřiny',
    Gas:         'Cena zemního plynu',
    Lignite:     'Cena hnědého uhlí',
    Biomass:     'Cena biomasy',
    Petrol:      'Cena benzínu',
    Diesel:      'Cena nafty',
  };

  // ---------------------------------------------------------------------------
  // Data helpers
  // ---------------------------------------------------------------------------

  function getPricesForScenario(data, scenario) {
    const entries = data.fuel_scenarios.filter(s => s.scenario === scenario);
    if (!entries.length) throw new Error(`Unknown price scenario: ${scenario}`);
    if (entries.length === 1) return entries[0].prices;

    // Multiple entries per scenario (one per fuel type): merge all into a single
    // prices array keyed by year_investment, with later entries' fields overwriting earlier ones.
    const yearMap = {};
    for (const entry of entries) {
      for (const p of entry.prices) {
        yearMap[p.year_investment] = Object.assign(yearMap[p.year_investment] || {}, p);
      }
    }
    return Object.values(yearMap).sort((a, b) => a.year_investment - b.year_investment);
  }

  function getPricesForYear(scenarioPrices, yearInvestment) {
    return scenarioPrices.find(p => p.year_investment === yearInvestment) || null;
  }

  function getEmissionFactor(fuel, yearPrices, emissionFactors) {
    if (fuel === 'Electricity') return yearPrices.electricity_emission_factor_kg_mwh;
    const entry = emissionFactors.find(f => f.fuel === fuel);
    return entry ? entry.emission_factor : 0;
  }

  function getFuelPrice(yearPrices, fuel) {
    const key = fuel.toLowerCase();
    return yearPrices[key] !== undefined ? yearPrices[key] : 0;
  }

  // Precise fuel heat demand (MWh) computed from source parameters rather than the
  // rounded integer stored in demand_heat_measure_mwh, which can drift ~5 % from
  // the exact fraction used in the Excel reference model.
  function computeHeatDemand(measure) {
    if (measure.demand_heat_building_mwh != null && measure.efficiency) {
      const savings = measure.energy_savings || 0;
      return measure.demand_heat_building_mwh * (1 - savings) / measure.efficiency;
    }
    return measure.demand_heat_measure_mwh;
  }

  // Total CAPEX for a measure (buildings split into three parts; transport has capex_czk)
  function getCapex(measure) {
    return (measure.capex_technology_czk  || 0)
         + (measure.capex_installation_czk || 0)
         + (measure.capex_preparation_czk  || 0)
         + (measure.capex_czk              || 0);
  }

  function getSector(measure) {
    return measure.building_category ? 'buildings' : 'transport';
  }

  // ---------------------------------------------------------------------------
  // Annual OPEX calculation
  // ---------------------------------------------------------------------------

  function calcBuildingOpex(measure, yearPrices, sccCzk, emissionFactors) {
    const heatDemand = computeHeatDemand(measure);
    const priceHeat  = getFuelPrice(yearPrices, measure.fuel);
    const priceEl    = yearPrices.electricity;
    const efFuel     = getEmissionFactor(measure.fuel, yearPrices, emissionFactors);
    const efEl       = yearPrices.electricity_emission_factor_kg_mwh;

    const energyCost  = heatDemand                              * priceHeat
                      + measure.demand_electricity_measure_mwh  * priceEl;
    // Carbon price applies only to direct fossil fuel combustion, not to electricity
    // (electricity price already embeds ETS costs at the generation level).
    // This covers both auxiliary electricity (demand_electricity_mwh) and measures
    // that use electricity as their primary heating fuel (e.g. heat pump, electric boiler).
    const efFuelForCarbon = measure.fuel === 'Electricity' ? 0 : efFuel;
    const carbonCost  = sccCzk * heatDemand * efFuelForCarbon / 1000;
    return energyCost + measure.opex_maintenance_czk + carbonCost;
  }

  function calcTransportOpex(measure, yearPrices, sccCzk, emissionFactors, electricityPriceFactor) {
    const consumption = measure.demand_energy_per_100km * measure.mileage / 100;
    let   priceF      = getFuelPrice(yearPrices, measure.fuel);
    // Scale electricity price by the charging-scenario factor from electricity_price_scenarios
    // (home grid / home solar / fast charger). Has no effect on ICE/hybrid vehicles.
    if (measure.fuel === 'Electricity') priceF *= electricityPriceFactor;
    // Carbon price applies only to fossil fuels, not electricity.
    const ef          = measure.fuel === 'Electricity'
                        ? 0
                        : getEmissionFactor(measure.fuel, yearPrices, emissionFactors);
    const carbonCost  = sccCzk * consumption * ef / 1000;
    return consumption * priceF
         + measure.opex_maintenance_czk
         + (measure.opex_insurance_czk || 0)
         + (measure.opex_repairs_czk || 0)
         + carbonCost;
  }

  function calcOpex(measure, sector, yearPrices, sccCzk, emissionFactors, electricityPriceFactor) {
    return sector === 'buildings'
      ? calcBuildingOpex(measure, yearPrices, sccCzk, emissionFactors)
      : calcTransportOpex(measure, yearPrices, sccCzk, emissionFactors, electricityPriceFactor);
  }

  // ---------------------------------------------------------------------------
  // Core NPV computation
  // ---------------------------------------------------------------------------
  // Options:
  //   discountRate          – real discount rate (0.03 = 3 %)
  //   carbonPriceEur        – social cost of carbon in EUR/t CO2
  //   exchangeRate          – CZK per EUR
  //   electricityPriceFactor– EV charging scenario multiplier (transport only, default 1.0)
  //   capexBlMult           – multiplier for baseline CAPEX  (default 1.0, sensitivity only)
  //   capexMeasMult         – multiplier for measure CAPEX   (default 1.0, sensitivity only)
  //   fuelPriceMult         – multiplier for a specific fuel price (sensitivity only)
  //   fuelPriceName         – which fuel to scale ('Gas', 'Electricity', etc.)

  function computeNpv(baseline, measure, sector, scenarioPrices, opts, emissionFactors) {
    const discountRate          = opts.discountRate          !== undefined ? opts.discountRate          : DEFAULT_DISCOUNT_RATE;
    const carbonPriceEur        = opts.carbonPriceEur        !== undefined ? opts.carbonPriceEur        : DEFAULT_CARBON_PRICE_EUR;
    const exchangeRate          = opts.exchangeRate          !== undefined ? opts.exchangeRate          : DEFAULT_EXCHANGE_RATE;
    const electricityPriceFactor= opts.electricityPriceFactor!== undefined ? opts.electricityPriceFactor: 1.0;
    const capexBlMult           = opts.capexBlMult           !== undefined ? opts.capexBlMult           : 1.0;
    const capexMeasMult         = opts.capexMeasMult         !== undefined ? opts.capexMeasMult         : 1.0;
    const fuelPriceMult         = opts.fuelPriceMult         !== undefined ? opts.fuelPriceMult         : 1.0;
    const fuelPriceName         = opts.fuelPriceName         || null;
    const globalPriceFactor     = opts.globalPriceFactor     !== undefined ? opts.globalPriceFactor     : 1.0;

    const sccCzkDefault = carbonPriceEur * exchangeRate;
    const lifetime = Math.min(baseline.lifetime, measure.lifetime);
    const capexDiff = getCapex(baseline) * capexBlMult - getCapex(measure) * capexMeasMult;

    let opexSum = 0;

    for (let t = 1; t <= lifetime; t++) {
      const rawPrices = getPricesForYear(scenarioPrices, t);
      if (!rawPrices) continue;

      // Apply optional fuel price multipliers for sensitivity analysis
      const yearPrices = applyGlobalPriceFactor(applyFuelPriceMult(rawPrices, fuelPriceName, fuelPriceMult), globalPriceFactor);

      // Use per-year NZ carbon price trajectory when available
      const sccCzk = yearPrices.carbon_price_eur_nz != null
        ? yearPrices.carbon_price_eur_nz * exchangeRate
        : sccCzkDefault;

      const discFactor = discountRate === 0 ? 1 : 1 / Math.pow(1 + discountRate, t);

      const opexBl   = calcOpex(baseline, sector, yearPrices, sccCzk, emissionFactors, electricityPriceFactor);
      const opexMeas = calcOpex(measure,  sector, yearPrices, sccCzk, emissionFactors, electricityPriceFactor);

      opexSum += (opexBl - opexMeas) * discFactor;
    }

    return Math.round(capexDiff + opexSum);
  }

  // Returns prices for a single year with one fuel price scaled by `mult`
  function applyFuelPriceMult(yearPrices, fuelName, mult) {
    if (!fuelName || mult === 1.0) return yearPrices;
    const copy = Object.assign({}, yearPrices);
    const key = fuelName.toLowerCase();
    if (copy[key] !== undefined) copy[key] = copy[key] * mult;
    return copy;
  }

  const FUEL_PRICE_KEYS = ['electricity', 'gas', 'lignite', 'biomass', 'petrol', 'diesel'];

  // Returns prices for a single year with all fuel prices scaled by `factor`
  function applyGlobalPriceFactor(yearPrices, factor) {
    if (!factor || factor === 1.0) return yearPrices;
    const copy = Object.assign({}, yearPrices);
    for (const key of FUEL_PRICE_KEYS) {
      if (copy[key] !== undefined) copy[key] *= factor;
    }
    return copy;
  }

  // ---------------------------------------------------------------------------
  // Year-by-year table (used for payback and charts)
  // ---------------------------------------------------------------------------

  function buildYearByYear(baseline, measure, sector, scenarioPrices, opts, emissionFactors) {
    const discountRate          = opts.discountRate          !== undefined ? opts.discountRate          : DEFAULT_DISCOUNT_RATE;
    const carbonPriceEur        = opts.carbonPriceEur        !== undefined ? opts.carbonPriceEur        : DEFAULT_CARBON_PRICE_EUR;
    const exchangeRate          = opts.exchangeRate          !== undefined ? opts.exchangeRate          : DEFAULT_EXCHANGE_RATE;
    const electricityPriceFactor= opts.electricityPriceFactor!== undefined ? opts.electricityPriceFactor: 1.0;
    const sccCzkDefault         = carbonPriceEur * exchangeRate;
    const lifetime       = Math.min(baseline.lifetime, measure.lifetime);
    const capexDiff      = getCapex(baseline) - getCapex(measure);

    const rows = [];
    let cumDisc = capexDiff; // year 0: CAPEX difference (not discounted)

    // Year 0 – embedded emissions only
    rows.push({
      year:              0,
      opexBaseline:      0,
      opexMeasure:       0,
      opexDiff:          0,
      discFactor:        1,
      opexDiffDisc:      capexDiff,
      cumDisc:           capexDiff,
      emissionsBaseline: baseline.emissions_embedded_kg,
      emissionsMeasure:  measure.emissions_embedded_kg,
      emissionsDiff:     measure.emissions_embedded_kg - baseline.emissions_embedded_kg,
      energyBaseline:    null,
      energyMeasure:     null,
      energyDiff:        null,
    });

    for (let t = 1; t <= lifetime; t++) {
      const yearPrices = getPricesForYear(scenarioPrices, t);
      if (!yearPrices) continue;

      const sccCzk = yearPrices.carbon_price_eur_nz != null
        ? yearPrices.carbon_price_eur_nz * exchangeRate
        : sccCzkDefault;

      const discFactor = discountRate === 0 ? 1 : 1 / Math.pow(1 + discountRate, t);

      const opexBl   = calcOpex(baseline, sector, yearPrices, sccCzk, emissionFactors, electricityPriceFactor);
      const opexMeas = calcOpex(measure,  sector, yearPrices, sccCzk, emissionFactors, electricityPriceFactor);

      const opexDiff     = opexBl - opexMeas;
      const opexDiffDisc = opexDiff * discFactor;
      cumDisc += opexDiffDisc;

      // Operational emissions (kg CO2)
      const efFuelBl   = getEmissionFactor(baseline.fuel, yearPrices, emissionFactors);
      const efFuelMeas = getEmissionFactor(measure.fuel,  yearPrices, emissionFactors);
      const efEl       = yearPrices.electricity_emission_factor_kg_mwh;

      let emBl, emMeas, enBl, enMeas;

      if (sector === 'buildings') {
        const heatBl   = computeHeatDemand(baseline);
        const heatMeas = computeHeatDemand(measure);
        emBl   = heatBl   * efFuelBl   + baseline.demand_electricity_measure_mwh * efEl;
        emMeas = heatMeas * efFuelMeas  + measure.demand_electricity_measure_mwh  * efEl;
        enBl   = heatBl   + baseline.demand_electricity_measure_mwh;
        enMeas = heatMeas + measure.demand_electricity_measure_mwh;
      } else {
        const cBl   = baseline.demand_energy_per_100km * baseline.mileage / 100;
        const cMeas = measure.demand_energy_per_100km  * measure.mileage  / 100;
        emBl   = cBl   * efFuelBl;
        emMeas = cMeas * efFuelMeas;
        enBl   = null;
        enMeas = null;
      }

      rows.push({
        year:              t,
        opexBaseline:      Math.round(opexBl),
        opexMeasure:       Math.round(opexMeas),
        opexDiff:          Math.round(opexDiff),
        discFactor,
        opexDiffDisc:      Math.round(opexDiffDisc),
        cumDisc:           Math.round(cumDisc),
        emissionsBaseline: Math.round(emBl),
        emissionsMeasure:  Math.round(emMeas),
        emissionsDiff:     Math.round(emMeas - emBl),       // negative = measure emits less
        energyBaseline:    enBl,
        energyMeasure:     enMeas,
        energyDiff:        enBl !== null ? enMeas - enBl : null,  // negative = measure uses less
      });
    }

    return rows;
  }

  // ---------------------------------------------------------------------------
  // Aggregate indicators
  // ---------------------------------------------------------------------------

  function calcPaybackYear(yearByYear) {
    for (const row of yearByYear) {
      if (row.year > 0 && row.cumDisc >= 0) return row.year;
    }
    return null; // never pays back within lifetime
  }

  function calcEmissionSavings(yearByYear, npv, capexDiff) {
    // Sum operational diffs (row.emissionsDiff, sign: measure - baseline, negative = good)
    // Plus embedded at year 0
    const totalKg = yearByYear.reduce((acc, row) => acc + (row.emissionsDiff || 0), 0);
    const totalT  = totalKg / 1000;

    // Total baseline emissions (operational + embedded)
    const totalBlKg = yearByYear.reduce((acc, row) => {
      if (row.year === 0) return acc + (row.emissionsBaseline || 0);
      return acc + (row.emissionsBaseline || 0);
    }, 0);

    const relative    = totalBlKg !== 0 ? totalKg / totalBlKg : null;
    // perNpv: negative = favorable (NPV positive + emission savings negative cancel to negative)
    // positive = extra cost per tonne CO2 saved (NPV negative but still saving emissions)
    const perNpv      = totalT !== 0 ? npv / totalT : null;
    const perCapexDiff = totalT !== 0 ? capexDiff / totalT : null;

    return { totalT, totalKg, relative, perNpv, perCapexDiff };
  }

  // Annual liquid-fuel consumption (litres) – Petrol or Diesel transport measures only.
  const LIQUID_FUELS = new Set(['Petrol', 'Diesel']);
  function annualFuelLitres(measure, sector) {
    if (!LIQUID_FUELS.has(measure.fuel)) return 0;
    if (sector === 'transport') return measure.demand_energy_per_100km * measure.mileage / 100;
    return 0;
  }

  // Liquid-fuel (PHM) savings over the lifetime (litres) – transport only.
  // Returns null when neither baseline nor measure uses liquid fuel.
  function calcFuelSavings(baseline, measure, sector, lifetime) {
    const annualBl   = annualFuelLitres(baseline, sector);
    const annualMeas = annualFuelLitres(measure,  sector);
    if (annualBl === 0 && annualMeas === 0) return null;
    const annualSaved = annualBl - annualMeas;   // positive = saving fuel
    return { annualL: annualSaved, totalL: annualSaved * lifetime };
  }

  // Annual natural-gas consumption (MWh) – buildings measures only.
  function annualGasMwh(measure, sector) {
    if (measure.fuel !== 'Gas') return 0;
    if (sector === 'buildings') return computeHeatDemand(measure);
    return 0;
  }

  // Natural-gas savings over the lifetime (MWh) – buildings only.
  // Returns null when neither baseline nor measure uses gas.
  function calcGasSavings(baseline, measure, sector, lifetime) {
    const annualBl   = annualGasMwh(baseline, sector);
    const annualMeas = annualGasMwh(measure,  sector);
    if (annualBl === 0 && annualMeas === 0) return null;
    const annualSaved = annualBl - annualMeas;   // positive = saving gas
    return { annualMwh: annualSaved, totalMwh: annualSaved * lifetime };
  }

  function calcEnergySavings(yearByYear, npv, capexDiff) {
    // Buildings only – returns null if energy data not present
    const hasEnergy = yearByYear.some(r => r.year > 0 && r.energyDiff !== null);
    if (!hasEnergy) return null;

    const operationalRows = yearByYear.filter(r => r.year > 0);
    // Annual energy is constant across years (no price dependency), so use year 1
    const year1 = operationalRows[0];
    const annualMwh = year1 ? year1.energyDiff : 0;

    const totalMwh = operationalRows.reduce((acc, r) => acc + (r.energyDiff || 0), 0);
    const totalBlMwh = operationalRows.reduce((acc, r) => acc + (r.energyBaseline || 0), 0);

    const relative     = totalBlMwh !== 0 ? totalMwh / totalBlMwh : null;
    const perNpv       = totalMwh !== 0 ? npv / totalMwh : null;
    const perCapexDiff = totalMwh !== 0 ? capexDiff / totalMwh : null;

    return { totalMwh, annualMwh, relative, perNpv, perCapexDiff };
  }

  // ---------------------------------------------------------------------------
  // Sensitivity analysis (mirrors R make_variants + prep_tornado logic)
  //
  // Returns one object per sensitivity parameter, each with:
  //   param        – parameter name
  //   baselineNpv  – NPV at default settings
  //   minNpv       – lowest NPV across all variants of this parameter
  //   maxNpv       – highest NPV
  //   minLabel     – label of the variant that produced minNpv
  //   maxLabel     – label of the variant that produced maxNpv
  //   minDev       – minNpv − baselineNpv
  //   maxDev       – maxNpv − baselineNpv
  // ---------------------------------------------------------------------------

  function computeSensitivity(baseline, measure, sector, scenarioPrices, baseOpts, emissionFactors) {
    const baseNpv = computeNpv(baseline, measure, sector, scenarioPrices, baseOpts, emissionFactors);
    if (baseNpv === null) return null;

    // Collect relevant fuels (deduped, in order: baseline first)
    const fuelSet = [baseline.fuel];
    if (measure.fuel && !fuelSet.includes(measure.fuel)) fuelSet.push(measure.fuel);

    // Build variant list following R's make_variants structure
    const variants = [
      // // Discount rate
      // { param: 'Diskontní míra', label: '0 %',  opts: { ...baseOpts, discountRate: 0.00 } },
      // { param: 'Diskontní míra', label: '3 %',  opts: { ...baseOpts, discountRate: 0.03 } },
      // { param: 'Diskontní míra', label: '7 %',  opts: { ...baseOpts, discountRate: 0.07 } },
      // // Carbon price
      // { param: 'Cena uhlíku',    label: '0 €',  opts: { ...baseOpts, carbonPriceEur: 0   } },
      // { param: 'Cena uhlíku',    label: '60 €', opts: { ...baseOpts, carbonPriceEur: 60  } },
      // { param: 'Cena uhlíku',    label: '200 €',opts: { ...baseOpts, carbonPriceEur: 200 } },
      // CAPEX of the alternative measure
      { param: 'Investiční náklady opatření', label: '-30 %', opts: { ...baseOpts, capexMeasMult: 0.7 } },
      { param: 'Investiční náklady opatření', label: 'Základ', opts: { ...baseOpts, capexMeasMult: 1.0 } },
      { param: 'Investiční náklady opatření', label: '+30 %', opts: { ...baseOpts, capexMeasMult: 1.3 } },
      // CAPEX of the baseline
      { param: 'Investiční náklady základní varianty', label: '-30 %', opts: { ...baseOpts, capexBlMult: 0.7 } },
      { param: 'Investiční náklady základní varianty', label: 'Základ', opts: { ...baseOpts, capexBlMult: 1.0 } },
      { param: 'Investiční náklady základní varianty', label: '+30 %', opts: { ...baseOpts, capexBlMult: 1.3 } },
    ];

    // Fuel price variants for all fuels used by baseline or measure
    fuelSet.forEach(fuel => {
      const paramLabel = FUEL_PRICE_LABEL[fuel] || `Cena: ${fuel}`;
      [
        { mult: 0.7, label: '-30 %' },
        { mult: 1.0, label: 'Základ' },
        { mult: 1.3, label: '+30 %' },
      ].forEach(({ mult, label }) => {
        // "Základ" variant with no scaling is equivalent to the baseline opts
        const fuelName = mult === 1.0 ? null : fuel;
        variants.push({
          param: paramLabel,
          label,
          opts: { ...baseOpts, fuelPriceName: fuelName, fuelPriceMult: mult },
        });
      });
    });

    // Compute NPV for every variant
    const computed = variants.map(v => ({
      param: v.param,
      label: v.label,
      npv:   computeNpv(baseline, measure, sector, scenarioPrices, v.opts, emissionFactors),
    })).filter(v => v.npv !== null);

    // Group by param and derive range
    const byParam = {};
    computed.forEach(v => {
      if (!byParam[v.param]) byParam[v.param] = [];
      byParam[v.param].push(v);
    });

    const sensitivity = Object.entries(byParam)
      .map(([param, rows]) => {
        const npvs    = rows.map(r => r.npv);
        const minIdx  = npvs.indexOf(Math.min(...npvs));
        const maxIdx  = npvs.indexOf(Math.max(...npvs));
        return {
          param,
          baselineNpv: baseNpv,
          minNpv:   rows[minIdx].npv,
          maxNpv:   rows[maxIdx].npv,
          minLabel: rows[minIdx].label,
          maxLabel: rows[maxIdx].label,
          minDev:   rows[minIdx].npv - baseNpv,
          maxDev:   rows[maxIdx].npv - baseNpv,
        };
      })
      .filter(r => r.maxNpv - r.minNpv > 0); // skip params with no effect

    // Sort by the predefined order (unrecognised params appended at the end)
    sensitivity.sort((a, b) => {
      const ai = SENSITIVITY_PARAM_ORDER.indexOf(a.param);
      const bi = SENSITIVITY_PARAM_ORDER.indexOf(b.param);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

    return sensitivity;
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  function calculate(options) {
    const {
      measureId,
      data,
      discountRate          = DEFAULT_DISCOUNT_RATE,
      carbonPriceEur        = DEFAULT_CARBON_PRICE_EUR,
      priceScenario         = DEFAULT_PRICE_SCENARIO,
      exchangeRate          = DEFAULT_EXCHANGE_RATE,
      electricityPriceFactor = 1.0,
      globalPriceFactor      = 1.0,
      capexMeasMult          = 1.0,
      capexBlMult            = 1.0,
    } = options;

    // Locate the measure
    const allMeasures = [
      ...(data.buildings_measures || []),
      ...(data.transport_measures  || []),
    ];
    const measure = allMeasures.find(m => m.id === measureId);
    if (!measure) throw new Error(`Measure id ${measureId} not found`);
    if (!measure.measure_baseline_id) throw new Error(`Measure id ${measureId} has no measure_baseline_id`);

    const baseline = allMeasures.find(m => m.id === measure.measure_baseline_id);
    if (!baseline) throw new Error(`Baseline id ${measure.measure_baseline_id} not found`);

    const sector          = getSector(measure);
    const scenarioPrices  = getPricesForScenario(data, priceScenario);
    const emissionFactors = data.fuel_emission_factors;
    const lifetime        = Math.min(baseline.lifetime, measure.lifetime);

    const baseOpts = { discountRate, carbonPriceEur, exchangeRate, electricityPriceFactor, globalPriceFactor, capexMeasMult, capexBlMult };

    const npv = computeNpv(baseline, measure, sector, scenarioPrices, baseOpts, emissionFactors);

    const capexDiff  = getCapex(baseline) - getCapex(measure);
    const yearByYear = buildYearByYear(baseline, measure, sector, scenarioPrices, baseOpts, emissionFactors);

    return {
      sector,
      measure,
      baseline,
      lifetime,
      capexDiff,
      npv,
      paybackYear:     calcPaybackYear(yearByYear),
      emissionSavings: calcEmissionSavings(yearByYear, npv, capexDiff),
      energySavings:   calcEnergySavings(yearByYear, npv, capexDiff),  // null for transport
      fuelSavings:     calcFuelSavings(baseline, measure, sector, lifetime),
      gasSavings:      calcGasSavings(baseline, measure, sector, lifetime),
      yearByYear,
      sensitivity:     computeSensitivity(baseline, measure, sector, scenarioPrices, baseOpts, emissionFactors),
    };
  }

  return { calculate };
})();
