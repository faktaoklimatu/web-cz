(function () {
  'use strict';

  const data = window.COSTS_AND_BENEFITS;
  if (!data) return;

  // ── State ────────────────────────────────────────────────────────────────
  // discountRate is fixed (control removed); stored as integer % points, /100 on use.
  // priceUncertainty: −10 / 0 / +10 (%)  → globalPriceFactor (scales all fuel prices).
  // capexLevel: −1 optimistic / 0 mid / +1 pessimistic → capexMeasMult using each
  //   measure's own capex_sensitivity (so the toggle matches the tornado analysis).
  const state = {
    carbonPrice:           70,
    discountRate:           3,
    fuelScenario:          'CP',
    priceUncertainty:       0,
    capexLevel:             0,
    electricityPriceFactor: CostsBenefits.getDefaultElectricityPriceFactor(data),
  };

  const DEFAULT_CAPEX_SENSITIVITY = 0.1;  // fallback when a measure omits capex_sensitivity

  // NPV at default slider values — used as the permanent sort key so row order
  // never changes when the user moves the controls.
  const defaultNpvMap = new Map();

  function findMeasure(id) {
    return [...(data.buildings_measures || []), ...(data.transport_measures || [])]
      .find(m => m.id === id);
  }

  // Shared calculate() options for the current control state, per measure.
  function calcOpts(measure) {
    const capexSens = measure.capex_sensitivity != null ? measure.capex_sensitivity : DEFAULT_CAPEX_SENSITIVITY;
    return {
      measureId:              measure.id,
      data,
      discountRate:           state.discountRate / 100,
      carbonPriceEur:         state.carbonPrice,
      priceScenario:          state.fuelScenario,
      electricityPriceFactor: state.electricityPriceFactor,
      globalPriceFactor:      1 + state.priceUncertainty / 100,
      capexMeasMult:          1 + state.capexLevel * capexSens,
    };
  }

  // ── Tooltip ──────────────────────────────────────────────────────────────
  // A single floating div reused by all charts. Appears immediately on hover
  // (no browser-native <title> delay).
  const tip = document.createElement('div');
  Object.assign(tip.style, {
    position:      'fixed',
    pointerEvents: 'none',
    background:    'rgba(30,30,30,0.88)',
    color:         '#fff',
    borderRadius:  '5px',
    padding:       '5px 9px',
    fontSize:      '13px',
    lineHeight:    '1.45',
    fontFamily:    'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif',
    whiteSpace:    'pre-wrap',  // keep \n line breaks AND wrap long lines
    zIndex:        '9999',
    display:       'none',
    maxWidth:      '260px',
  });
  document.body.appendChild(tip);

  function showTip(event, text) {
    tip.textContent = text;
    tip.style.display = 'block';
    moveTip(event);
  }
  function moveTip(event) {
    const pad = 12;
    const tw  = tip.offsetWidth, th = tip.offsetHeight;
    let x = event.clientX + pad, y = event.clientY + pad;
    if (x + tw > window.innerWidth  - 4) x = event.clientX - tw - pad;
    if (y + th > window.innerHeight - 4) y = event.clientY - th - pad;
    tip.style.left = x + 'px';
    tip.style.top  = y + 'px';
  }
  function hideTip() { tip.style.display = 'none'; }

  // ── Global x-axis domain ─────────────────────────────────────────────────
  // Computed once at init across all measures × all parameter combinations.
  // Fixed so the scale never shifts when controls change.
  let globalXDomain = null;

  // ── Fixed section order ───────────────────────────────────────────────────
  // Computed once at init using default params; never changes (dynamic
  // reordering of H2 sections would be disorienting while scrolling).
  let fixedBuildingOrder = null;
  let fixedTransportOrder = null;

  function computeGlobalDomain() {
    const allMeasures = [
      ...(data.buildings_measures || []),
      ...(data.transport_measures  || []),
    ].filter(m => m.measure_baseline_id || m.measure_baseline);

    const vals = [];
    const carbonPrices    = [0, 200];
    const scenarios       = ['CP', 'NZ', 'CP_EC'];
    const priceFactors    = [0.9, 1.1];   // ± energy-price uncertainty extremes
    const capexLevels     = [-1, 1];       // optimistic / pessimistic CAPEX extremes

    for (const m of allMeasures) {
      const capexSens = m.capex_sensitivity != null ? m.capex_sensitivity : DEFAULT_CAPEX_SENSITIVITY;
      for (const cp of carbonPrices) {
        for (const sc of scenarios) {
          for (const gf of priceFactors) {
            for (const cl of capexLevels) {
              try {
                const result = CostsBenefits.calculate({
                  measureId:             m.id,
                  data,
                  discountRate:          state.discountRate / 100,
                  carbonPriceEur:        cp,
                  priceScenario:         sc,
                  electricityPriceFactor: state.electricityPriceFactor,
                  globalPriceFactor:     gf,
                  capexMeasMult:         1 + cl * capexSens,
                });
                vals.push(result.npv);
              } catch (_) { /* skip */ }
            }
          }
        }
      }
    }
    if (!vals.length) return [-500000, 500000];

    const [vMin, vMax] = d3.extent(vals);
    return d3.scaleLinear()
      .domain([Math.min(vMin, 0), Math.max(vMax, 0)])
      .nice()
      .domain();
  }

  // ── Calculation ──────────────────────────────────────────────────────────
  // Returns { npv: { value, low, high }, co2Saved, sensitivity } or null.
  function computeRow(measure) {
    try {
      const result = CostsBenefits.calculate(calcOpts(measure));
      const sens  = result.sensitivity || [];
      const low   = sens.length ? Math.min(...sens.map(s => s.minNpv)) : result.npv;
      const high  = sens.length ? Math.max(...sens.map(s => s.maxNpv)) : result.npv;
      return {
        npv:         { value: result.npv, low, high },
        co2Saved:    result.emissionSavings ? -result.emissionSavings.totalT : null,
        capexDiff:   result.capexDiff,
        sector:      result.sector,
        gasSavings:          result.gasSavings,
        fuelSavings:         result.fuelSavings,
        fossilImportSavings: result.fossilImportSavings,
        sensitivity: sens,
      };
    } catch (e) {
      console.warn('CostsBenefits.calculate error for measure id', measure.id, ':', e.message);
      return null;
    }
  }

  // Worst-/best-case NPV band — the FULL uncertainty envelope, so it stays stationary
  // and every navbar control just repositions the dot within it. Spans all four
  // navbar inputs at their extremes: energy scenario (CP/CP_EC/NZ), carbon price
  // (0–200 €), ±10 % overall energy-price uncertainty, and CAPEX — plus the per-fuel
  // price thresholds. Within one (scenario, carbon) base the per-dimension deviations
  // are summed (NPV is ~linear in each price/CAPEX term, so the joint extreme ≈ sum of
  // one-at-a-time extremes); the outer min/max spans scenarios × carbon extremes.
  // ponytail: the global ±10 % factor and the per-fuel thresholds both move energy
  // prices, so they stack — deliberately widening the band per the chosen inputs.
  function computeBand(measure) {
    const base  = calcOpts(measure);
    const npvOf = o => { try { return CostsBenefits.calculate(o).npv; } catch (_) { return null; } };
    let lo = Infinity, hi = -Infinity;
    for (const sc of ['CP', 'CP_EC', 'NZ']) {
      for (const cp of [0, 200]) {   // carbon-price slider extremes
        const neutral = { ...base, priceScenario: sc, carbonPriceEur: cp, globalPriceFactor: 1.0, capexMeasMult: 1.0 };
        let r;
        try { r = CostsBenefits.calculate(neutral); } catch (_) { continue; }
        const b = r.npv;
        let dLo = 0, dHi = 0;
        // CAPEX (measure + baseline) and per-fuel price swings — already computed
        // one-at-a-time by the calculator's sensitivity analysis.
        (r.sensitivity || []).forEach(s => { dLo += s.minNpv - b; dHi += s.maxNpv - b; });
        // ±10 % overall energy-price uncertainty
        const gLo = npvOf({ ...neutral, globalPriceFactor: 0.9 });
        const gHi = npvOf({ ...neutral, globalPriceFactor: 1.1 });
        if (gLo != null && gHi != null) { dLo += Math.min(gLo, gHi) - b; dHi += Math.max(gLo, gHi) - b; }
        lo = Math.min(lo, b + dLo);
        hi = Math.max(hi, b + dHi);
      }
    }
    return isFinite(lo) && isFinite(hi) ? { lo, hi } : null;
  }

  // ── Formatting ───────────────────────────────────────────────────────────
  const fmtInt = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 });

  function fmtCZK(v) {
    const sign = v < 0 ? '−\u202f' : '+\u202f';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + (Math.round(abs / 1e5) / 10).toFixed(1) + '\u202fmil. Kč';
    if (abs >= 1e3) return sign + fmtInt.format(Math.round(abs / 1e3))    + '\u202ftis. Kč';
    return sign + fmtInt.format(abs) + '\u202fKč';
  }

  function fmtCO2(savedT) {
    if (savedT === null || savedT === undefined) return '—';
    const sign = savedT < 0 ? '−' : '';
    const abs  = Math.abs(savedT);
    if (abs >= 100) return sign + fmtInt.format(Math.round(abs))           + '\u202ft CO₂';
    if (abs >= 1)   return sign + (Math.round(abs * 10) / 10).toFixed(1)  + '\u202ft CO₂';
    return sign + fmtInt.format(Math.round(abs * 1000)) + '\u202fkg CO₂';
  }

  // X t CO₂ (or kg CO₂) saved per 1 000 CZK of `czk`.
  // Round x (positive) to 3 significant figures, no trailing zeros.
  function fmt3sig(x) { return parseFloat(x.toPrecision(3)).toString(); }

  // Kč needed to save 1 t CO₂ (czk signed: + = cost, −= earning).
  function fmtCZKperT(czk, savedT) {
    if (savedT == null || !savedT || !isFinite(czk / savedT)) return '—';
    const v    = czk / savedT;
    const sign = v < 0 ? '−' : '';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + fmt3sig(abs / 1e6) + ' mil. Kč/t CO₂';
    if (abs >= 1e3) return sign + fmt3sig(abs / 1e3) + ' tis. Kč/t CO₂';
    return sign + fmt3sig(abs) + ' Kč/t CO₂';
  }

  // Kč needed to save 1 MWh of gas (czk signed: + = cost, −= earning).
  function fmtCZKperMWh(czk, mwh) {
    if (mwh == null || !mwh || !isFinite(czk / mwh)) return '—';
    const v    = czk / mwh;
    const sign = v < 0 ? '−' : '';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + fmt3sig(abs / 1e6) + ' mil. Kč/MWh';
    if (abs >= 1e3) return sign + fmt3sig(abs / 1e3) + ' tis. Kč/MWh';
    return sign + fmt3sig(abs) + ' Kč/MWh';
  }

  // Kč needed to save 1 litre of fuel (czk signed: + = cost, −= earning).
  function fmtCZKperL(czk, litres) {
    if (litres == null || !litres || !isFinite(czk / litres)) return '—';
    const v    = czk / litres;
    const sign = v < 0 ? '−' : '';
    const abs  = Math.abs(v);
    if (abs >= 1000) return sign + fmt3sig(abs / 1000) + ' tis. Kč/l';
    return sign + fmt3sig(abs) + ' Kč/l';
  }

  function fmtL(litres) {
    if (litres == null || !isFinite(litres)) return '—';
    const sign = litres < 0 ? '−' : '';
    const abs  = Math.abs(litres);
    if (abs >= 1000) return sign + fmtInt.format(Math.round(abs / 10) * 10) + ' l';
    return sign + fmtInt.format(Math.round(abs)) + ' l';
  }

  function fmtMWh(mwh) {
    if (mwh == null || !isFinite(mwh)) return '—';
    const sign = mwh < 0 ? '−' : '';
    const abs  = Math.abs(mwh);
    if (abs >= 1000) return sign + (Math.round(abs / 100) / 10).toFixed(1) + ' GWh';
    if (abs >= 1)    return sign + fmtInt.format(Math.round(abs))           + ' MWh';
    return sign + fmtInt.format(Math.round(abs * 1000)) + ' kWh';
  }

  // ── Controls ─────────────────────────────────────────────────────────────
  function setupControls() {
    setupSlider('carbon-price-slider', 'carbon-price-value', v => {
      state.carbonPrice = v;
      return v + '\u202f€';
    });
    setupSlider('price-uncertainty-slider', 'price-uncertainty-value', v => {
      state.priceUncertainty = v;
      const sign = v > 0 ? '+' : v < 0 ? '\u2212' : '';
      return sign + Math.abs(v) + '\u202f%';
    });
    const fsSelect = document.getElementById('fuel-scenario-select');
    if (fsSelect) {
      fsSelect.addEventListener('change', () => {
        state.fuelScenario = fsSelect.value;
        renderAll();
      });
    }
    const capexSelect = document.getElementById('capex-level-select');
    if (capexSelect) {
      capexSelect.addEventListener('change', () => {
        state.capexLevel = +capexSelect.value;
        renderAll();
      });
    }
  }

  function setupSlider(sliderId, valueId, onUpdate) {
    const slider  = document.getElementById(sliderId);
    const valueEl = document.getElementById(valueId);
    if (!slider || !valueEl) return;
    slider.addEventListener('input', () => {
      valueEl.textContent = onUpdate(+slider.value);
      renderAll();
    });
  }

  // ── Shared helpers ────────────────────────────────────────────────────────
  const ANIM_MS = 450;

  // Returns a sorted array of { name, baseline, dots } for one section.
  // Sorted descending by mean NPV so the most favorable measure is on top.
  function getSummaryRows(section) {
    const isBuildings = section === 'buildings';
    const allMeasures = isBuildings ? data.buildings_measures : data.transport_measures;
    const catField    = isBuildings ? 'building_category' : 'transport_category';

    // Transport: collapse every electric-vs-fossil comparison onto a single row.
    if (!isBuildings) {
      const dots = allMeasures
        .filter(m => m.measure_baseline_id || m.measure_baseline)
        .map(m => {
          const calc = computeRow(m);
          if (!calc) return null;
          const detail = m.measure_baseline ? m.measure_name + ' vs. ' + m.measure_baseline : m.measure_name;
          return { label: detail, npv: calc.npv };
        })
        .filter(Boolean);
      return dots.length
        ? [{ name: 'Elektromobil', baseline: 'automobil na fosilní paliva', dots }]
        : [];
    }

    const measureNames = [];
    for (const m of allMeasures) {
      if ((m.measure_baseline_id || m.measure_baseline) && !measureNames.includes(m.measure_name)) {
        measureNames.push(m.measure_name);
      }
    }

    return measureNames
      .map(name => {
        const entries = allMeasures.filter(m =>
          m.measure_name === name && (m.measure_baseline_id || m.measure_baseline)
        );
        const dots = entries.map(m => {
          const calc = computeRow(m);
          if (!calc) return null;
          return { label: m[catField], npv: calc.npv };
        }).filter(Boolean);
        const baselines = [...new Set(entries.map(m => m.measure_baseline).filter(Boolean))];
        return { name, baseline: baselines.length ? baselines.join(', ') : null, dots };
      })
      .filter(r => r.dots.length > 0)
      .sort((a, b) => d3.mean(b.dots, d => d.npv.value) - d3.mean(a.dots, d => d.npv.value));
  }

  const xAxisFmt = v => {
    const a = Math.abs(v);
    const s = v < 0 ? '−' : v > 0 ? '+' : '';
    if (a >= 1e6) return s + (a / 1e6).toFixed(1) + ' M';
    if (a >= 1e3) return s + Math.round(a / 1e3)  + ' tis.';
    return v === 0 ? '0' : s + a;
  };

  // ── Summary chart ─────────────────────────────────────────────────────────
  const SUMMARY_ROW_H   = 72;   // match the measure-chart ROW_H
  const SUMMARY_LABEL_W = 260;
  const SUMMARY_MARGIN  = { top: 48, right: 16, bottom: 36 };
  const SECTION_HDR_H   = 22;

  const COLOR_BUILDINGS = '#2860b4';
  const COLOR_TRANSPORT = '#6b4fa0';

  // NPV > 0: favorable (teal); NPV < 0: costly (red)
  const COLOR_FAVORABLE = '#1a7a85';
  const COLOR_COSTLY    = '#c0392b';

  // CO₂ squares — fixed global scale so all measures are comparable
  const CO2_UNIT     = 25;  // 1 box = 25 t CO₂ (= 25 000 kg)
  const CO2_MAX_COLS =  4;  // wrap to new row after 4 boxes (= 100 t = 100K kg)

  function renderSummaryChart(container) {
    if (!globalXDomain) return;

    const sections = [
      { label: 'Budovy',  rows: getSummaryRows('buildings'), color: COLOR_BUILDINGS },
      { label: 'Doprava', rows: getSummaryRows('transport'),  color: COLOR_TRANSPORT },
    ].filter(s => s.rows.length > 0);

    if (!sections.length) { container.hidden = true; return; }

    const totalW  = container.clientWidth || 640;
    const chartW  = Math.max(totalW - SUMMARY_LABEL_W - SUMMARY_MARGIN.right, 120);
    const totalH  = sections.reduce((h, s) =>
      h + SECTION_HDR_H + s.rows.length * SUMMARY_ROW_H, 0
    ) + SUMMARY_MARGIN.top + SUMMARY_MARGIN.bottom;

    const xScale = d3.scaleLinear().domain(globalXDomain).range([0, chartW]);
    const z      = xScale(0);

    // ── Create SVG skeleton once ──────────────────────────────────────────
    let svg = d3.select(container).select('svg');
    if (svg.empty()) {
      svg = d3.select(container).append('svg').attr('role', 'img')
        .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');
      svg.append('text').attr('class', 'chart-col-header lbl-hdr').attr('x', 4).attr('y', 16)
        .text('Opatření');
      svg.append('text').attr('class', 'chart-col-header npv-hdr').attr('text-anchor', 'middle').attr('y', 16);
      svg.append('line').attr('class', 'top-divider')
        .attr('stroke', '#e6e9ed').attr('stroke-width', 1);
      svg.append('text').attr('class', 'half-lbl half-lbl-l')
        .attr('font-size', '11px').attr('font-style', 'italic').attr('fill', '#bbb').attr('text-anchor', 'middle');
      svg.append('text').attr('class', 'half-lbl half-lbl-r')
        .attr('font-size', '11px').attr('font-style', 'italic').attr('fill', '#bbb').attr('text-anchor', 'middle');
      svg.append('g').attr('class', 'sec-hdrs');
      svg.append('g').attr('class', 'rows-g');
      svg.append('g').attr('class', 'chart-axis x-axis');
    }

    svg.attr('width', totalW).attr('height', totalH);

    // Update static elements that depend on width/height
    svg.select('.top-divider')
      .attr('x1', 0).attr('x2', totalW)
      .attr('y1', SUMMARY_MARGIN.top - 8).attr('y2', SUMMARY_MARGIN.top - 8);
    svg.select('.npv-hdr').attr('x', SUMMARY_LABEL_W + chartW / 2)
      .text('Rozdíl NPV oproti základní variantě (Kč)');
    svg.select('.half-lbl-l').attr('x', SUMMARY_LABEL_W + z / 2).attr('y', 34)
      .text('Fosilní opatření je výhodnější');
    svg.select('.half-lbl-r').attr('x', SUMMARY_LABEL_W + z + (chartW - z) / 2).attr('y', 34)
      .text('Dekarbonizační opatření je výhodnější');

    // ── Section headers (fixed y — row counts never change) ───────────────
    // Pre-compute y-offsets per section
    const secOffsets = [];
    let cy = SUMMARY_MARGIN.top;
    for (const s of sections) {
      secOffsets.push({ headerY: cy, rowsY: cy + SECTION_HDR_H });
      cy += SECTION_HDR_H + s.rows.length * SUMMARY_ROW_H;
    }

    const secSel = svg.select('.sec-hdrs').selectAll('text.sec-hdr')
      .data(sections, s => s.label);
    secSel.enter().append('text').attr('class', 'sec-hdr')
      .attr('font-size', '13px').attr('font-weight', '700')
      .merge(secSel)
      .attr('x', 4)
      .attr('fill', s => s.color)
      .attr('y', (s, i) => secOffsets[i].headerY + 14)
      .text(s => s.label);
    secSel.exit().remove();

    // ── Measure rows (animated on reorder) ───────────────────────────────
    // Build a flat list with absolute y-positions
    const allRows = [];
    sections.forEach((s, si) => {
      s.rows.forEach((row, ri) => {
        allRows.push({ ...row, targetY: secOffsets[si].rowsY + ri * SUMMARY_ROW_H });
      });
    });

    const rowSel = svg.select('.rows-g').selectAll('g.s-row').data(allRows, d => d.name);

    // ENTER — appear at final position, fade in
    const rowEnter = rowSel.enter().append('g').attr('class', 's-row')
      .attr('transform', d => `translate(0,${d.targetY})`)
      .attr('opacity', 0);

    rowEnter.append('line').attr('class', 'r-divider').attr('stroke', '#eaedf0').attr('stroke-width', 1);
    rowEnter.append('line').attr('class', 'r-zero').attr('stroke', CLR_SUB).attr('stroke-width', 1);
    rowEnter.append('text').attr('class', 'r-name').attr('x', 4)
      .attr('font-family', CB_FONT).attr('font-size', '14px').attr('font-weight', '700').attr('fill', CLR_TEXT);
    rowEnter.append('text').attr('class', 'r-base').attr('x', 4)
      .attr('font-family', CB_FONT).attr('font-size', '14px').attr('font-weight', '500').attr('fill', CLR_TEXT);
    rowEnter.append('g').attr('class', 'r-dots');

    // MERGE — transition y-position; update content
    const rowAll = rowSel.merge(rowEnter);

    rowAll.transition().duration(ANIM_MS).ease(d3.easeCubicInOut)
      .attr('transform', d => `translate(0,${d.targetY})`)
      .attr('opacity', 1);

    rowAll.each(function (row) {
      const g   = d3.select(this);
      const mid = SUMMARY_ROW_H / 2;

      // Per-row divider (top edge) + solid zero tick — matching the measure charts
      const ZG = 8;
      g.select('.r-divider').attr('x1', 0).attr('x2', totalW).attr('y1', 0).attr('y2', 0);
      g.select('.r-zero')
        .attr('x1', SUMMARY_LABEL_W + z).attr('x2', SUMMARY_LABEL_W + z)
        .attr('y1', ZG).attr('y2', SUMMARY_ROW_H - ZG);

      g.select('.r-name').attr('y', row.baseline ? mid - 2 : mid + 5).text(row.name);
      g.select('.r-base').attr('y', mid + 15).text(row.baseline ? 'vs. ' + row.baseline : '');

      const dotsG = g.select('.r-dots');
      dotsG.selectAll('*').remove();
      for (const dot of row.dots) {
        const tipText = dot.label ? fmtCZK(dot.npv.value) + '\n' + dot.label : fmtCZK(dot.npv.value);
        const fuelHint = (dot.label || '') + ' ' + (row.baseline || '');
        dotsG.append('circle')
          .attr('cx', SUMMARY_LABEL_W + xScale(dot.npv.value)).attr('cy', mid)
          .attr('r', 6).attr('fill', npvFill(dot.npv.value, fuelHint))
          .attr('stroke', 'white').attr('stroke-width', 1.5).attr('opacity', 0.85)
          .on('mouseover', e  => showTip(e, tipText))
          .on('mousemove', moveTip)
          .on('mouseout',  hideTip);
      }
    });

    rowSel.exit().transition().duration(ANIM_MS).attr('opacity', 0).remove();

    // ── X axis ────────────────────────────────────────────────────────────
    svg.select('.x-axis')
      .attr('transform', `translate(${SUMMARY_LABEL_W},${totalH - SUMMARY_MARGIN.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(xAxisFmt));
  }

  // ── Detailed measure chart ────────────────────────────────────────────────
  // Visual style ported from the explainer beeswarm (costs-benefits-beeswarm.js):
  // Inter typography, slate/grey palette, energy-class badges, block/circle
  // pictographs for CO₂ & fossil-import, diverging NPV dot colour.
  const ROW_H   = 72;
  const LABEL_W = 210;
  const CO2_W   = 120;
  const FUEL_W  = 160;
  const ICON_W  = 30;   // trailing "more info" affordance column
  const MARGIN  = { top: 46, right: 12, bottom: 34 };

  const SQ         = 9;    // pictograph square/circle size (px)
  const SQ_PER_ROW = 5;    // wrap to a new row after 5
  const CO2_PER_SQ = 20;   // 1 square = 20 t CO₂
  const MWH_PER_SQ = 50;   // 1 circle = 50 MWh

  // ── Beeswarm palette ───────────────────────────────────────────────────────
  const CB_FONT      = 'Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif';
  const CLR_TEXT     = '#515b66';  // primary labels, measure name, NPV label
  const CLR_SUB      = '#9ea7b3';  // stat pictographs, zero line, secondary
  const CLR_POS      = '#006063';  // favorable (NPV > 0) end of diverging scale
  const CLR_NEG_COAL = '#903156';
  const CLR_NEG_GAS  = '#c0392b';
  const CLR_NEG_DEF  = '#8c3f5f';

  // NPV → fill: negative end shifts by fuel of the context; grey at 0; teal positive.
  function npvFill(npv, fuelHint) {
    const neg = /uhlí|uhelný/i.test(fuelHint) ? CLR_NEG_COAL
              : /plyn/i.test(fuelHint)          ? CLR_NEG_GAS
              :                                   CLR_NEG_DEF;
    const dom = globalXDomain || [-500000, 500000];
    return d3.scaleLinear().domain([dom[0], 0, dom[1]])
      .range([neg, '#e0e0e0', CLR_POS]).clamp(true)(npv);
  }

  // Split a context label like "Rodinný dům uhlí – E" into { prefix, badge:'E' }.
  // Labels without a trailing " – <A–F>" (transport, apartments, measure names)
  // return the whole string as prefix and no badge.
  function splitLabel(label) {
    const m = /^(.*?)\s*–\s*([A-F])\s*$/.exec(label || '');
    return m ? { prefix: m[1], badge: m[2] } : { prefix: label || '', badge: null };
  }

  // Arrow-shaped energy-class badge as an inline HTML span (wraps naturally in the
  // foreignObject label). ponytail: HTML clip-path instead of an SVG polygon so the
  // whole label stays in one wrapping <div>.
  function badgeHtml(letter, marginLeft = 5) {
    if (!letter) return '';
    return `<span style="display:inline-block;background:${CLR_TEXT};color:#fff;` +
           `font-size:8px;font-weight:700;line-height:1.3;padding:1px 8px 1px 5px;margin-left:${marginLeft}px;` +
           `clip-path:polygon(0 0,72% 0,100% 50%,72% 100%,0 100%);">${letter}</span>`;
  }

  // Grid of grey squares growing upward from bottomY, centred on cx.
  function drawBlockGrid(svg, cx, bottomY, n, perRow, sq, fill) {
    if (n <= 0) return;
    n = Math.min(n, perRow * 2);
    const startX = cx - (perRow * sq) / 2;
    for (let i = 0; i < n; i++) {
      svg.append('rect')
        .attr('x', startX + (i % perRow) * sq)
        .attr('y', bottomY - (Math.floor(i / perRow) + 1) * sq)
        .attr('width', sq).attr('height', sq)
        .attr('fill', fill || CLR_SUB).attr('stroke', 'white').attr('stroke-width', 0.5);
    }
  }

  // Grid of circles growing upward from bottomY, centred on cx.
  function drawCircleGrid(svg, cx, bottomY, n, perRow, sq, fill) {
    if (n <= 0) return;
    n = Math.min(n, perRow * 2);
    const rr = sq / 2, startX = cx - (perRow * sq) / 2;
    for (let i = 0; i < n; i++) {
      svg.append('circle')
        .attr('cx', startX + (i % perRow) * sq + rr)
        .attr('cy', bottomY - (Math.floor(i / perRow) + 1) * sq + rr)
        .attr('r', rr - 0.8).attr('fill', fill || CLR_SUB);
    }
  }

  // Build styled row objects from a list of measure entries.
  // labelField = 'building_category' | 'transport_category' | 'measure_name'.
  function buildRows(entries, labelField) {
    return entries
      .map(m => {
        const calc = computeRow(m);
        if (!calc) return null;
        if (!defaultNpvMap.has(m.id)) defaultNpvMap.set(m.id, calc.npv.value);
        const band = computeBand(m);
        const npv  = band
          ? { value: calc.npv.value,
              low:  Math.min(band.lo, calc.npv.value),
              high: Math.max(band.hi, calc.npv.value) }
          : calc.npv;
        return {
          label:               m[labelField],
          measureName:         m.measure_name || null,
          baselineName:        m.measure_baseline || null,
          measureId:           m.id,
          npv,
          co2Saved:            calc.co2Saved,
          capexDiff:           calc.capexDiff,
          sector:              calc.sector,
          gasSavings:          calc.gasSavings,
          fuelSavings:         calc.fuelSavings,
          fossilImportSavings: calc.fossilImportSavings,
          sensitivity:         calc.sensitivity,
        };
      })
      .filter(Boolean)
      .sort((a, b) => (defaultNpvMap.get(b.measureId) ?? 0) - (defaultNpvMap.get(a.measureId) ?? 0));
  }

  // ── Shared row-chart renderer (beeswarm-styled) ─────────────────────────────
  // Clear-and-redraw (no reorder animation — rows only change on control change).
  function renderRowChart(container, rows, colHeaderLabel) {
    const totalW = container.clientWidth || 640;
    const chartW = Math.max(totalW - LABEL_W - CO2_W - FUEL_W - ICON_W - MARGIN.right, 160);
    const totalH = rows.length * ROW_H + MARGIN.top + MARGIN.bottom;

    const xScale = d3.scaleLinear().domain(globalXDomain || [-500000, 500000]).range([0, chartW]);
    const z = xScale(0);

    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append('svg')
      .attr('role', 'img').attr('width', totalW).attr('height', totalH)
      .style('font-family', CB_FONT);

    // Column x anchors. Stat columns are LEFT-aligned: texts and pictographs
    // start at *LX; GRID_HALF shifts a grid's centre so its left edge lands on *LX.
    const co2X0  = LABEL_W + chartW;
    const fuelX0 = co2X0 + CO2_W;
    const iconCX = fuelX0 + FUEL_W + ICON_W / 2;
    const co2LX  = co2X0 + 6;
    const fuelLX = fuelX0 + 6;
    const GRID_HALF = (SQ_PER_ROW * SQ) / 2;

    // ── Column headers (uppercase, multi-line via tspan) ──────────────────────
    const hdr = (x, lines, anchor = 'middle') => {
      const t = svg.append('text').attr('class', 'chart-col-header')
        .attr('x', x).attr('y', 12).attr('text-anchor', anchor)
        .attr('font-family', CB_FONT).attr('fill', '#aaa')
        .style('letter-spacing', '0.06em');
      lines.forEach((ln, i) =>
        t.append('tspan').attr('x', x).attr('dy', i === 0 ? '0' : '1.2em').text(ln));
      return t;
    };
    hdr(4, [colHeaderLabel], 'start');
    hdr(LABEL_W + chartW / 2, ['VÝHODNOST (NPV)']);
    hdr(co2LX,  ['SNÍŽENÍ', 'EMISÍ'], 'start');
    hdr(fuelLX, ['SNÍŽENÍ IMPORTU', 'ROPY A ZEMNÍHO PLYNU'], 'start');

    // ── Rows ────────────────────────────────────────────────────────────────
    const ZERO_GAP = 7;   // inset so the per-row zero tick never touches a divider
    rows.forEach((row, i) => {
      const top = MARGIN.top + i * ROW_H;
      const mid = top + ROW_H / 2;
      const fuelHint = (row.label || '') + ' ' + (row.baselineName || '');
      const color = npvFill(row.npv.value, fuelHint);
      const dotX  = LABEL_W + xScale(row.npv.value);

      const g = svg.append('g').attr('class', 'd-row').style('cursor', 'pointer')
        .on('click', () => toggleRowDetail(container, row));
      g.append('rect')
        .attr('x', 0).attr('y', top).attr('width', totalW).attr('height', ROW_H)
        .attr('fill', 'transparent');

      // Divider between rows (skip above the first row)
      if (i > 0) {
        svg.append('line')
          .attr('x1', 0).attr('x2', totalW).attr('y1', top).attr('y2', top)
          .attr('stroke', '#eaedf0').attr('stroke-width', 1);
      }

      // Per-row zero tick — short segment that stops short of the dividers
      svg.append('line')
        .attr('x1', LABEL_W + z).attr('x2', LABEL_W + z)
        .attr('y1', top + ZERO_GAP).attr('y2', top + ROW_H - ZERO_GAP)
        .attr('stroke', CLR_SUB).attr('stroke-width', 1);

      // ── Label (foreignObject → wrapping HTML) ──────────────────────────────
      const fo  = g.append('foreignObject')
        .attr('x', 4).attr('y', top + 2).attr('width', LABEL_W - 8).attr('height', ROW_H - 4);
      const div = fo.append('xhtml:div')
        .style('display', 'flex').style('flex-direction', 'column')
        .style('justify-content', 'center').style('height', '100%')
        .style('font-family', CB_FONT);
      // Label: context prefix + badge, measure name, then "vs. baseline" — all slate #515b66.
      const hasContext = row.measureName && row.measureName !== row.label;
      if (hasContext) {
        const { prefix, badge } = splitLabel(row.label);
        div.append('xhtml:span')
          .style('font-size', '10px').style('font-weight', '700').style('line-height', '1.2')
          .style('color', CLR_TEXT).style('letter-spacing', '0.04em')
          .html(badgeHtml(badge, 0) + (badge ? ' ' : '') + prefix.toUpperCase());
        div.append('xhtml:span')
          .style('font-size', '14px').style('font-weight', '700').style('line-height', '1.2')
          .style('color', CLR_TEXT).style('margin-top', '2px')
          .text(row.measureName);
      } else {
        const { prefix, badge } = splitLabel(row.label);
        const mainText = badge ? prefix.toUpperCase() : row.label;
        div.append('xhtml:span')
          .style('font-size', '13px').style('font-weight', '600').style('line-height', '1.25')
          .style('color', CLR_TEXT).style('letter-spacing', badge ? '0.03em' : '0')
          .html(mainText + badgeHtml(badge));
      }
      if (row.baselineName) {
        div.append('xhtml:span')
          .style('font-size', '14px').style('font-weight', '500').style('margin-top', '1px')
          .style('color', CLR_TEXT)
          .text('vs. ' + row.baselineName);
      }

      // ── NPV: uncertainty band + dot + label ────────────────────────────────
      const dominant = row.sensitivity && row.sensitivity.length
        ? row.sensitivity.reduce((b, s) => (s.maxNpv - s.minNpv) > (b.maxNpv - b.minNpv) ? s : b)
        : null;
      const bandTip = [
        `Rozsah nejistoty: ${fmtCZK(row.npv.low)} až ${fmtCZK(row.npv.high)}`,
        dominant ? `Největší vliv: ${dominant.param}` : null,
      ].filter(Boolean).join('\n');
      const dotTip = [
        fmtCZK(row.npv.value),
        dominant ? `Největší vliv: ${dominant.param}` : null,
      ].filter(Boolean).join('\n');

      svg.append('line')
        .attr('x1', LABEL_W + xScale(row.npv.low)).attr('x2', LABEL_W + xScale(row.npv.high))
        .attr('y1', mid).attr('y2', mid)
        .attr('stroke', CLR_SUB).attr('stroke-width', 5)
        .attr('stroke-linecap', 'round').attr('opacity', 0.3);
      svg.append('rect')
        .attr('x', LABEL_W + xScale(row.npv.low)).attr('y', mid - 8)
        .attr('width', Math.max(xScale(row.npv.high) - xScale(row.npv.low), 1)).attr('height', 16)
        .attr('fill', 'transparent')
        .on('mouseover', e => showTip(e, bandTip)).on('mousemove', moveTip).on('mouseout', hideTip);

      svg.append('circle')
        .attr('cx', dotX).attr('cy', mid).attr('r', 7)
        .attr('fill', color).attr('stroke', 'white').attr('stroke-width', 2)
        .on('mouseover', e => showTip(e, dotTip)).on('mousemove', moveTip).on('mouseout', hideTip);
      svg.append('text')
        .attr('x', dotX).attr('y', mid - 12).attr('text-anchor', 'middle')
        .attr('font-family', CB_FONT).attr('font-size', '13px').attr('font-weight', '700')
        .attr('fill', CLR_TEXT).text(fmtCZK(row.npv.value));

      // ── CO₂: square pictograph + value (left-aligned). Emission INCREASES are
      //    red squares with the amount + a "zvyšuje emise" note underneath. ────
      const co2Neg = row.co2Saved !== null && row.co2Saved < 0;
      const co2Pos = row.co2Saved !== null && row.co2Saved > 0;
      const co2Mag = row.co2Saved !== null ? Math.abs(row.co2Saved) : 0;
      const nCo2 = (co2Pos || co2Neg)
        ? Math.min(SQ_PER_ROW * 2, Math.max(1, Math.round(co2Mag / CO2_PER_SQ))) : 0;
      if (nCo2) drawBlockGrid(svg, co2LX + GRID_HALF, mid - 4, nCo2, SQ_PER_ROW, SQ,
        co2Neg ? CLR_NEG_GAS : COLOR_FAVORABLE);
      svg.append('text')
        .attr('x', co2LX).attr('y', nCo2 ? mid + 16 : mid + 4).attr('text-anchor', 'start')
        .attr('font-family', CB_FONT).attr('font-size', '12px').attr('font-weight', '700')
        .attr('fill', co2Neg ? CLR_NEG_GAS : CLR_SUB)
        .text(fmtCO2(co2Neg ? co2Mag : row.co2Saved));
      if (co2Neg) {
        svg.append('text')
          .attr('x', co2LX).attr('y', mid + 30).attr('text-anchor', 'start')
          .attr('font-family', CB_FONT).attr('font-size', '10px').attr('font-weight', '400')
          .attr('fill', CLR_NEG_GAS).text('zvyšuje emise');
      }

      // ── Fossil import: scope 1 circles + value (left-aligned). The scope-2
      //    "výroba el." breakdown lives in the detail window, not here. ────────
      const s1 = row.fossilImportSavings ? row.fossilImportSavings.scope1TotalMwh : null;
      const s1Pos = s1 != null && s1 > 0;
      const nS1 = s1Pos ? Math.min(SQ_PER_ROW * 2, Math.max(1, Math.round(s1 / MWH_PER_SQ))) : 0;
      if (s1Pos) drawCircleGrid(svg, fuelLX + GRID_HALF, mid - 4, nS1, SQ_PER_ROW, SQ, COLOR_FAVORABLE);
      svg.append('text')
        .attr('x', fuelLX).attr('y', s1Pos ? mid + 16 : mid + 4).attr('text-anchor', 'start')
        .attr('font-family', CB_FONT).attr('font-size', '12px').attr('font-weight', '700')
        .attr('fill', CLR_SUB).text(s1 != null ? fmtMWh(s1) : '—');

      // ── "more info" affordance — the whole row is already clickable; this only
      //    signals that a detail view exists. ────────────────────────────────
      g.append('foreignObject')
        .attr('x', iconCX - 12).attr('y', mid - 12).attr('width', 24).attr('height', 24)
        .append('xhtml:span')
        .attr('class', 'material-symbols-outlined')
        .attr('title', 'Zobrazit detail')
        .style('font-size', '20px').style('line-height', '24px').style('color', CLR_SUB)
        .text('manage_search');
    });

    // ── X axis (bottom, grey) ─────────────────────────────────────────────────
    svg.append('g').attr('class', 'chart-axis')
      .attr('transform', `translate(${LABEL_W},${MARGIN.top + rows.length * ROW_H})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(xAxisFmt))
      .call(sel => { sel.selectAll('.tick line').attr('stroke', CLR_SUB); sel.select('.domain').remove(); });
  }

  function renderMeasureChart(container, section, measureName) {
    const isBuildings = section === 'buildings';
    const allMeasures = isBuildings ? data.buildings_measures : data.transport_measures;
    const catField    = isBuildings ? 'building_category' : 'transport_category';

    const entries = allMeasures.filter(m =>
      m.measure_name === measureName && (m.measure_baseline_id || m.measure_baseline)
    );
    if (!entries.length) { container.hidden = true; return; }
    const rows = buildRows(entries, catField);
    if (!rows.length) { container.hidden = true; return; }
    container.hidden = false;
    renderRowChart(container, rows, 'KONTEXT');
  }

  // ── Group chart (transport: all measures in one category group) ──────────
  // Renders every measure whose transport_category starts with `group`
  // (e.g. "Nové" matches "Nové malé" and "Nové velké").
  function renderGroupChart(container, section, group) {
    const isBuildings = section === 'buildings';
    const allMeasures = isBuildings ? data.buildings_measures : data.transport_measures;
    const catField    = isBuildings ? 'building_category' : 'transport_category';

    const entries = allMeasures.filter(m =>
      (m.measure_baseline_id || m.measure_baseline) &&
      m[catField] && m[catField].startsWith(group)
    );
    if (!entries.length) { container.hidden = true; return; }
    const rows = buildRows(entries, 'measure_name');
    if (!rows.length) { container.hidden = true; return; }
    container.hidden = false;
    renderRowChart(container, rows, 'OPATŘENÍ');
  }

  // ── DOM section reordering ───────────────────────────────────────────────
  // Reorders the H2 + chart-div pairs inside a section to match a given
  // measure-name order.  Called once at init; never called again.
  function reorderSection(sectionId, order) {
    if (!order || !order.length) return;

    // Collect all (h2, chartDiv) pairs for this section
    const charts = Array.from(
      document.querySelectorAll(`.measure-chart[data-section="${sectionId}"]`)
    );
    const pairs = charts.map(chart => {
      const h2 = chart.previousElementSibling;
      return (h2 && h2.tagName === 'H2') ? { name: chart.dataset.measure, h2, chart } : null;
    }).filter(Boolean);

    if (!pairs.length) return;

    // Sort pairs into the desired order
    const rank = new Map(order.map((name, i) => [name, i]));
    pairs.sort((a, b) =>
      (rank.has(a.name) ? rank.get(a.name) : Infinity) -
      (rank.has(b.name) ? rank.get(b.name) : Infinity)
    );

    // Find the H1 anchor for this section ('Budovy' / 'Doprava')
    const sectionLabel = sectionId === 'buildings' ? 'Budovy' : 'Doprava';
    const parent = pairs[0].h2.parentNode;
    const h1 = Array.from(parent.children)
      .find(el => el.tagName === 'H1' && el.textContent.trim() === sectionLabel);
    if (!h1) return;

    // Re-insert pairs in sorted order immediately after the H1
    let anchor = h1;
    for (const { h2, chart } of pairs) {
      anchor.after(h2);
      h2.after(chart);
      anchor = chart;
    }
  }

  // ── Row detail panel ─────────────────────────────────────────────────────
  let openMeasureId = null;
  let openRowMeta   = null;   // { label, measureName, baselineName } — display metadata from clicked row

  function toggleRowDetail(_container, row) {
    if (openMeasureId === row.measureId) {
      openMeasureId = null;
      openRowMeta   = null;
      closeDetailBar();
      return;
    }
    openMeasureId = row.measureId;
    openRowMeta   = { label: row.label, measureName: row.measureName, baselineName: row.baselineName };
    renderOpenDetail();
  }

  function closeDetailBar() {
    const bar = document.getElementById('row-detail-bar');
    if (!bar) return;
    bar.classList.remove('is-open');
    bar.querySelector('.row-detail-inner').innerHTML = '';
    document.getElementById('row-detail-backdrop')?.classList.remove('is-open');
  }

  function renderOpenDetail() {
    if (!openMeasureId || !openRowMeta) return;
    const measure = findMeasure(openMeasureId);
    if (!measure) return;

    // Full result for timeline + tornado
    let result;
    try { result = CostsBenefits.calculate(calcOpts(measure)); } catch (e) { return; }

    // Reconstruct the full row object (same shape as buildRows produces)
    const calc = computeRow(measure);
    if (!calc) return;
    const band = computeBand(measure);
    const npv  = band
      ? { value: calc.npv.value, low: Math.min(band.lo, calc.npv.value), high: Math.max(band.hi, calc.npv.value) }
      : calc.npv;
    const row = {
      ...openRowMeta,
      measureId:           openMeasureId,
      npv,
      co2Saved:            calc.co2Saved,
      capexDiff:           calc.capexDiff,
      sector:              calc.sector,
      gasSavings:          calc.gasSavings,
      fuelSavings:         calc.fuelSavings,
      fossilImportSavings: calc.fossilImportSavings,
      sensitivity:         calc.sensitivity,
    };

    renderDetailPanel(row, result);
  }

  function statCell(label, value, iconEl, color, note, noteColor) {
    const cell = document.createElement('div');
    const l = document.createElement('div');
    l.className = 'rd-lbl';
    l.textContent = label;
    const v = document.createElement('div');
    v.className = 'rd-stat-val';
    if (iconEl) v.appendChild(iconEl);
    const t = document.createElement('span');
    t.textContent = value;
    if (color) t.style.color = color;
    v.appendChild(t);
    if (note) {
      const n = document.createElement('span');
      n.className = 'rd-stat-note';
      n.textContent = note;
      if (noteColor) n.style.color = noteColor;
      n.title = 'zemní plyn spotřebovaný na výrobu elektřiny';
      v.appendChild(n);
    }
    cell.appendChild(l);
    cell.appendChild(v);
    return cell;
  }

  // Plain CZK (no +/− sign) for descriptive amounts like CAPEX.
  function czkPlain(v) {
    const a = Math.abs(Math.round(v));
    if (a >= 1e6) return (Math.round(a / 1e5) / 10).toString().replace('.', ',') + ' mil. Kč';
    if (a >= 1e3) return fmtInt.format(Math.round(a / 1e3)) + ' tis. Kč';
    return fmtInt.format(a) + ' Kč';
  }

  // Descriptive context of the measure/building — CAPEX, car type, consumption, lifetime.
  function measureContextLine(m) {
    if (!m) return '';
    const capex = m.capex_czk != null
      ? m.capex_czk
      : (m.capex_technology_czk || 0) + (m.capex_installation_czk || 0) + (m.capex_preparation_czk || 0);
    const parts = [];
    if (m.transport_category) {
      if (m.transport_category)          parts.push('Typ: ' + m.transport_category);
      if (capex)                         parts.push('Cena ' + czkPlain(capex));
      if (m.demand_energy_per_100km != null) parts.push('Spotřeba ' + fmtInt.format(Math.round(m.demand_energy_per_100km * 1000)) + ' kWh/100 km');
      if (m.mileage != null)             parts.push('Nájezd ' + fmtInt.format(m.mileage) + ' km/rok');
    } else {
      if (capex)                         parts.push('Investice ' + czkPlain(capex));
      if (m.demand_heat_building_mwh != null) parts.push('Spotřeba tepla ' + m.demand_heat_building_mwh + ' MWh/rok');
    }
    if (m.lifetime != null)              parts.push('Životnost ' + Math.round(m.lifetime) + ' let');
    return parts.join('  ·  ');
  }

  const FUEL_CZ = {
    Electricity: 'Elektřina', Lignite: 'Hnědé uhlí', 'Black coal': 'Černé uhlí', 'Hard coal': 'Černé uhlí',
    Coal: 'Uhlí', 'Natural gas': 'Zemní plyn', Gas: 'Zemní plyn', Biomass: 'Biomasa', Wood: 'Dřevo',
    'Wood pellets': 'Dřevní pelety', Petrol: 'Benzín', Gasoline: 'Benzín', Diesel: 'Nafta', 'Heating oil': 'Topný olej',
  };
  const fuelCz = f => FUEL_CZ[f] || f || '—';
  const capexTotal = m => m.capex_czk != null
    ? m.capex_czk
    : (m.capex_technology_czk || 0) + (m.capex_installation_czk || 0) + (m.capex_preparation_czk || 0);

  // Parameter rows for the measure-vs-baseline comparison table.
  function comparisonSpecs(m) {
    if (m.transport_category) {
      return [
        ['Pořizovací cena', x => czkPlain(capexTotal(x))],
        ['Provoz / rok',    x => czkPlain((x.opex_maintenance_czk || 0) + (x.opex_repairs_czk || 0) + (x.opex_insurance_czk || 0))],
        ['Palivo',          x => fuelCz(x.fuel)],
        ['Spotřeba',        x => x.demand_energy_per_100km != null ? fmtInt.format(Math.round(x.demand_energy_per_100km * 1000)) + ' kWh/100 km' : '—'],
        ['Roční nájezd',    x => x.mileage != null ? fmtInt.format(x.mileage) + ' km' : '—'],
        ['Životnost',       x => x.lifetime != null ? Math.round(x.lifetime) + ' let' : '—'],
      ];
    }
    return [
      ['Investiční náklady', x => czkPlain(capexTotal(x))],
      ['Provoz / rok',       x => x.opex_maintenance_czk != null ? czkPlain(x.opex_maintenance_czk) : '—'],
      ['Palivo',             x => fuelCz(x.fuel)],
      ['Spotřeba paliva',    x => x.demand_heat_measure_mwh != null ? x.demand_heat_measure_mwh + ' MWh/rok' : '—'],
      ['Účinnost',           x => x.efficiency != null ? String(x.efficiency).replace('.', ',') : '—'],
      ['Životnost',          x => x.lifetime != null ? Math.round(x.lifetime) + ' let' : '—'],
    ];
  }

  // Measure vs. baseline parameters as a compact 3-column table.
  function renderComparison(container, measure, baseline) {
    if (!measure) return;
    const specs = comparisonSpecs(measure);
    const tbl = document.createElement('table');
    tbl.className = 'rd-params';
    const htr = document.createElement('tr');
    htr.innerHTML = '<th></th>'
      + `<th class="rd-params-meas">${measure.measure_name || ''}</th>`
      + (baseline ? `<th class="rd-params-base">${baseline.measure_name || ''}</th>` : '');
    const thead = document.createElement('thead');
    thead.appendChild(htr);
    tbl.appendChild(thead);
    const tb = document.createElement('tbody');
    specs.forEach(([label, get]) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td class="rd-params-lbl">${label}</td>`
        + `<td class="rd-params-meas">${get(measure)}</td>`
        + (baseline ? `<td class="rd-params-base">${get(baseline)}</td>` : '');
      tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    container.appendChild(tbl);
  }

  function renderDetailPanel(row, result) {
    const bar = document.getElementById('row-detail-bar');
    if (!bar) return;
    const inner = bar.querySelector('.row-detail-inner');
    inner.innerHTML = '';
    bar.classList.add('is-open');
    document.getElementById('row-detail-backdrop')?.classList.add('is-open');

    const measure = findMeasure(row.measureId);

    // ── Header: title block on its own row ────────────────────────────────────
    const hdr = document.createElement('div');
    hdr.className = 'rd-header';

    const idBlock = document.createElement('div');
    idBlock.className = 'rd-identity';
    const hasContext = row.measureName && row.measureName !== row.label;
    if (hasContext) {
      const { prefix, badge } = splitLabel(row.label);
      const ctx = document.createElement('div');
      ctx.className = 'rd-context';
      ctx.innerHTML = badgeHtml(badge, 0) + (badge ? ' ' : '') + prefix.toUpperCase();
      idBlock.appendChild(ctx);
    }
    const title = document.createElement('div');
    title.className = 'rd-title';
    const strong = document.createElement('span');
    strong.className = 'rd-title-name';
    strong.textContent = row.measureName || row.label;
    title.appendChild(strong);
    if (row.baselineName) {
      const vs = document.createElement('span');
      vs.className = 'rd-vs';
      vs.textContent = ' vs. ' + row.baselineName;
      title.appendChild(vs);
    }
    idBlock.appendChild(title);
    const metaText = measureContextLine(measure);
    if (metaText) {
      const meta = document.createElement('div');
      meta.className = 'rd-meta';
      meta.textContent = metaText;
      idBlock.appendChild(meta);
    }
    hdr.appendChild(idBlock);

    const closeBtn = document.createElement('button');
    closeBtn.className   = 'row-detail-close';
    closeBtn.textContent = '✕';
    closeBtn.onclick = () => { openMeasureId = null; openRowMeta = null; closeDetailBar(); };
    hdr.appendChild(closeBtn);
    inner.appendChild(hdr);

    // ── Row 2: three stat cells — NPV (1-4) · emise (5-8) · dovoz (9-12) ──────
    const npvColor = row.npv.value >= 0 ? COLOR_FAVORABLE : COLOR_COSTLY;
    const npvCell = statCell('Rozdíl v Net Present Value', fmtCZK(row.npv.value), null, npvColor);
    npvCell.classList.add('rd-stat--npv');
    inner.appendChild(npvCell);

    // Single-item detail: pictographs have nothing to compare against, so show
    // the number alone (bigger). Pictographs stay in the multi-row measure charts.
    const co2Neg = row.co2Saved !== null && row.co2Saved < 0;
    const emiseCell = statCell('Snížení emisí',
      co2Neg ? 'zvyšuje emise o ' + fmtCO2(Math.abs(row.co2Saved)) : fmtCO2(row.co2Saved),
      null, co2Neg ? CLR_NEG_GAS : CLR_TEXT);
    emiseCell.classList.add('rd-stat--emise');
    inner.appendChild(emiseCell);

    const s1 = row.fossilImportSavings ? row.fossilImportSavings.scope1TotalMwh : null;
    const s2 = row.fossilImportSavings ? row.fossilImportSavings.scope2TotalMwh : 0;
    const dovozNote = s2 ? (s2 > 0 ? '+' : '−') + fmtMWh(Math.abs(s2)) + ' na výrobu elektřiny' : null;
    const dovozCell = statCell('Snížení dovozu ropy a zemního plynu', s1 != null ? fmtMWh(s1) : '—',
      null, CLR_TEXT, dovozNote, s2 > 0 ? CLR_POS : CLR_SUB);
    dovozCell.classList.add('rd-stat--dovoz');
    inner.appendChild(dovozCell);

    // ── Row 3: Kumulativní NPV v čase (cols 1-8) · Citlivostní analýza (9-12) ──
    if ((result.yearByYear || []).length) {
      const wrap = document.createElement('div');
      wrap.className = 'rd-chart--timeline';
      const lbl = document.createElement('div');
      lbl.className = 'row-detail-section-label';
      lbl.textContent = 'Kumulativní NPV v čase';
      const timelineEl = document.createElement('div');
      timelineEl.className = 'row-detail-timeline';
      wrap.appendChild(lbl);
      wrap.appendChild(timelineEl);

      // Full parameter comparison — measure vs. fossil baseline — under the timeline
      const baseline = measure && measure.measure_baseline_id ? findMeasure(measure.measure_baseline_id) : null;
      const plbl = document.createElement('div');
      plbl.className = 'row-detail-section-label';
      plbl.style.marginTop = '22px';
      plbl.textContent = 'Parametry';
      const cmp = document.createElement('div');
      wrap.appendChild(plbl);
      wrap.appendChild(cmp);

      inner.appendChild(wrap);
      renderNpvTimeline(timelineEl, result);
      renderComparison(cmp, measure, baseline);
    }

    const carbon = measure ? carbonSensitivity(measure) : null;
    const sens = [...(result.sensitivity || []), ...(carbon ? [carbon] : [])];
    if (sens.length) {
      const wrap = document.createElement('div');
      wrap.className = 'rd-chart--sens';
      const lbl = document.createElement('div');
      lbl.className = 'row-detail-section-label';
      lbl.textContent = 'Citlivostní analýza';
      const tornEl = document.createElement('div');
      tornEl.className = 'row-detail-sens';
      wrap.appendChild(lbl);
      wrap.appendChild(tornEl);
      inner.appendChild(wrap);
      renderTornado(tornEl, sens, result.npv);
    }

    // Footer: the slider inputs these figures were computed with
    const SCEN  = { CP: 'Současné politiky', CP_EC: 'Energetická krize', NZ: 'Net-zero' };
    const CAPEX = { '-1': 'optimistická', '0': 'střední', '1': 'pesimistická' };
    const pu = (state.priceUncertainty > 0 ? '+' : '') + state.priceUncertainty + ' %';
    const footer = document.createElement('div');
    footer.className = 'rd-footer';
    footer.textContent =
      `Platí pro nastavení: scénář energií „${SCEN[state.fuelScenario] || state.fuelScenario}“ · `
      + `nejistota cen ${pu} · cena uhlíku ${state.carbonPrice} € · `
      + `investiční náklady ${CAPEX[state.capexLevel] || state.capexLevel}`;
    inner.appendChild(footer);
  }


  function renderNpvTimeline(container, result) {
    const FONT = CB_FONT;   // Inter — the detail window is all Inter except the footer
    const rows = result.yearByYear || [];
    if (!rows.length) return;

    const margin  = { top: 16, right: 12, bottom: 32, left: 64 };
    const chartH  = 110;

    const years  = rows.map(r => r.year);

    // Fixed bar step so every year occupies the same width regardless of lifetime.
    const BAR_STEP = 20;   // px per year slot (bar + gap)
    const chartW   = years.length * BAR_STEP;
    const totalW   = margin.left + chartW + margin.right;
    const totalH   = chartH + margin.top + margin.bottom;

    const [vMin, vMax] = d3.extent(rows, r => r.cumDisc);

    const xScale = d3.scaleBand().domain(years).range([0, chartW]).padding(0.12);
    const yScale = d3.scaleLinear()
      .domain([Math.min(vMin, 0), Math.max(vMax, 0)]).nice()
      .range([chartH, 0]);

    const svg = d3.select(container).append('svg')
      .attr('width', totalW).attr('height', totalH)
      .style('font-family', FONT)
      .style('display', 'block');

    const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Zero baseline
    const z = yScale(0);
    chart.append('line')
      .attr('x1', 0).attr('x2', chartW).attr('y1', z).attr('y2', z)
      .attr('stroke', '#ccc').attr('stroke-width', 1);

    // Payback year marker
    if (result.paybackYear != null && xScale(result.paybackYear) != null) {
      const px = xScale(result.paybackYear) + xScale.bandwidth() / 2;
      chart.append('line')
        .attr('x1', px).attr('x2', px).attr('y1', 0).attr('y2', chartH)
        .attr('stroke', '#aaa').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');
      chart.append('text').attr('x', px + 3).attr('y', 10)
        .attr('font-size', '10px').attr('fill', '#aaa').text('Návratnost');
    }

    // Bars
    rows.forEach(row => {
      const color = row.cumDisc >= 0 ? COLOR_FAVORABLE : COLOR_COSTLY;
      chart.append('rect')
        .attr('x', xScale(row.year))
        .attr('y', Math.min(yScale(row.cumDisc), z))
        .attr('width', xScale.bandwidth())
        .attr('height', Math.max(Math.abs(yScale(row.cumDisc) - z), 1))
        .attr('fill', color).attr('opacity', 0.75);
    });

    // X axis — thin out labels on longer lifetimes
    const lifetime   = years[years.length - 1] || 0;
    const step       = lifetime <= 15 ? 1 : lifetime <= 30 ? 5 : 10;
    const tickValues = years.filter(y => y % step === 0);
    chart.append('g')
      .attr('transform', `translate(0,${chartH})`).attr('class', 'chart-axis')
      .call(d3.axisBottom(xScale).tickValues(tickValues).tickSize(3).tickFormat(d => d))
      .call(sel => { sel.selectAll('.tick line').attr('stroke', CLR_SUB); sel.select('.domain').remove(); });
    chart.append('text')
      .attr('x', 0).attr('y', chartH + 28)
      .attr('text-anchor', 'start').attr('font-size', '11px').attr('fill', '#999')
      .text('Rok od investice →');

    // Y axis
    chart.append('g').attr('class', 'chart-axis')
      .call(d3.axisLeft(yScale).ticks(4).tickSize(3).tickFormat(xAxisFmt))
      .call(sel => { sel.selectAll('.tick line').attr('stroke', CLR_SUB); sel.select('.domain').remove(); });
  }

  // Carbon-price sensitivity across the slider range (0–200 €/t), other inputs held.
  function carbonSensitivity(measure) {
    const base = calcOpts(measure);
    const npvAt = cp => { try { return CostsBenefits.calculate({ ...base, carbonPriceEur: cp }).npv; } catch (_) { return null; } };
    const a = npvAt(0), b = npvAt(200);
    if (a == null || b == null) return null;
    return { param: 'Cena uhlíku', minNpv: Math.min(a, b), maxNpv: Math.max(a, b) };
  }

  // Sensitivity tornado (biggest lever on top): red = downside, teal = upside,
  // parameter label above each bar so bars use the full column width.
  function renderTornado(container, sensInput, baseNpv) {
    const sens = [...(sensInput || [])]
      .sort((a, b) => (b.maxNpv - b.minNpv) - (a.maxNpv - a.minNpv));
    if (!sens.length) return;

    const width  = container.clientWidth || 420;
    const ROW    = 46, BAR = 12;
    const M      = { top: 16, right: 14, bottom: 26, left: 2 };
    const totalH = sens.length * ROW + M.top + M.bottom;
    const chartW = Math.max(width - M.left - M.right, 120);

    // Zoom to the outcome range; pull in 0 only when uncertainty crosses it.
    const vals = [baseNpv, ...sens.flatMap(s => [s.minNpv, s.maxNpv])];
    let xMin = Math.min(...vals), xMax = Math.max(...vals);
    if (xMin <= 0 && xMax >= 0) { xMin = Math.min(xMin, 0); xMax = Math.max(xMax, 0); }
    const pad = (xMax - xMin) * 0.08 || 10000;
    const x = d3.scaleLinear().domain([xMin - pad, xMax + pad]).nice().range([0, chartW]);
    const dom = x.domain(), showZero = dom[0] <= 0 && dom[1] >= 0;

    const svg = d3.select(container).append('svg')
      .attr('width', width).attr('height', totalH).style('font-family', CB_FONT);
    const chart = svg.append('g').attr('transform', `translate(${M.left},0)`);

    if (showZero) {
      const z = x(0);
      chart.append('line').attr('x1', z).attr('x2', z)
        .attr('y1', M.top - 2).attr('y2', totalH - M.bottom)
        .attr('stroke', '#c9d0d6').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');
    }

    sens.forEach((s, i) => {
      const top = M.top + i * ROW, by = top + 22;
      chart.append('text').attr('x', 0).attr('y', top + 11)
        .attr('font-size', '12px').attr('font-weight', '500').attr('fill', CLR_TEXT).text(s.param);
      if (s.minNpv !== baseNpv) chart.append('rect')
        .attr('x', x(Math.min(baseNpv, s.minNpv))).attr('y', by)
        .attr('width', Math.abs(x(s.minNpv) - x(baseNpv))).attr('height', BAR)
        .attr('fill', COLOR_COSTLY).attr('opacity', 0.8);
      if (s.maxNpv !== baseNpv) chart.append('rect')
        .attr('x', x(Math.min(baseNpv, s.maxNpv))).attr('y', by)
        .attr('width', Math.abs(x(s.maxNpv) - x(baseNpv))).attr('height', BAR)
        .attr('fill', COLOR_FAVORABLE).attr('opacity', 0.8);
    });

    chart.append('g')
      .attr('transform', `translate(0,${totalH - M.bottom})`).attr('class', 'chart-axis')
      .call(d3.axisBottom(x).ticks(4).tickSize(3).tickFormat(xAxisFmt))
      .call(sel => { sel.selectAll('.tick line').attr('stroke', CLR_SUB); sel.select('.domain').remove(); });
  }

  // ── Render all ────────────────────────────────────────────────────────────
  function renderAll() {
    const summaryEl = document.getElementById('summary-chart');
    if (summaryEl) renderSummaryChart(summaryEl);

    document.querySelectorAll('.measure-chart[data-section]').forEach(el => {
      if (el.dataset.group) {
        renderGroupChart(el, el.dataset.section, el.dataset.group);
      } else {
        renderMeasureChart(el, el.dataset.section, el.dataset.measure);
      }
    });

    renderOpenDetail();
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    globalXDomain = computeGlobalDomain();

    // Compute fixed ordering using default params (state is at defaults here).
    fixedBuildingOrder  = getSummaryRows('buildings').map(r => r.name);
    fixedTransportOrder = getSummaryRows('transport').map(r => r.name);
    reorderSection('buildings', fixedBuildingOrder);
    // Transport uses fixed group headings (Nové / Ojeté) — no per-measure reordering needed.

    setupControls();
    renderAll();
    window.addEventListener('resize', renderAll);

    const backdrop = document.getElementById('row-detail-backdrop');
    if (backdrop) backdrop.addEventListener('click', () => {
      openMeasureId = null; openRowMeta = null; closeDetailBar();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();