/**
 * dovoz-fosilnich-paliv.js — charts for
 * collections/_studies/2026-interaktivni-prehled-dovoz-fosilnich-paliv.md
 *
 * Data: assets-local/files/dovoz-fosilnich-paliv/*.csv, as the analyst
 * delivers them — keep the file and column names. Read straight from the
 * browser and aggregated here, so the CSVs are the only copy of the numbers:
 * drop a newer delivery in and the page follows.
 *   imports-annual.csv      ČSÚ, statistika zahraničního obchodu, dovoz podle
 *   imports-monthly.csv     země původu, by year and by month from 1999:
 *                           commodity (crude_oil, natural_gas), country_code
 *                           (ISO 2; _RESIDUAL, QU, QV = unattributed), mass_kg,
 *                           value_mil_czk (customs value). One export, so the
 *                           two are checked against each other on load;
 *                           mass_kg is blank in 2006–2008.
 *   gdp.csv                 ČSÚ, nominal GDP, mil. Kč
 *   msmt.csv, sfdi.csv      the education ministry's and the transport
 *                           infrastructure fund's spending, mld. Kč — the KPI
 *                           GDP chart's comparisons
 *
 * Charts are the shared FoK library (assets-local/charts/), whose `width` option
 * is the viewBox width. Per ai-prototyping-guidelines.md that has to match the
 * width the container is actually rendered at, or the SVG scales and every label
 * scales with it — so we measure the container instead of hardcoding a number.
 * That is also what keeps the text readable once the panels stack on a phone.
 */

document.addEventListener('DOMContentLoaded', () => {
  // The look of the charts, in one place.
  const CFG = {
    // The two fuels, wherever they are drawn side by side.
    colorRopa: '#813751',
    colorPlyn: '#d4a1a1',
    colorTotal: '#3e3e4c',   // the line along the top of every by-country stack
    colorGdp: '#a13f54',     // KPI GDP chart: the imports' line
    colorCompare: '#9aa5b1', // GDP chart's comparisons (MŠMT, SFDI) and the explorer's context lines
    compareDash: '8 2',      // …their dashes, dash and gap 4 : 1
    // Suppliers, keyed by the slugs in the country tables below, so a country
    // reads the same in every chart. Grey is reserved for Ostatní, so no named
    // band can be mistaken for the leftovers.
    rusko: '#db4d43',
    azerbajdzan: '#f59c70',
    kazachstan: '#fbd189',
    norsko: '#35759c',
    saudska_arabie: '#c19753',
    usa: '#92cbc1',
    ostatni: '#c7ccd1',
    chartHeight: 260,        // px, every chart but the KPI row's
    kpiPlotHeight: 254,      // px, the KPI charts' plot alone, margins aside
    barPadding: 0.2,         // gap between bars (0-1)
    lineWidth: 2,            // line charts
    areaOpacity: 0.6,        // fill under the small multiples' lines
    // Energy — the imports, and the MWh every price is per — on one basis and
    // in one unit across the page, so ropa and plyn add up and a volume times
    // a price is the spending (TWh × Kč/MWh ÷ 1000 = mld. Kč).
    //   energyBasis: 'gcv' — gross calorific value (spalné teplo), as gas is
    //                        traded (TTF), billed and reported (Eurostat's gas
    //                        statistics)
    //                'ncv' — net calorific value (výhřevnost), as energy
    //                        balances add fuels up (ČSÚ, Eurostat, IEA)
    //   energyUnit:  'twh' | 'pj'
    energyBasis: 'gcv',
    energyUnit: 'twh',
    // The unit an import price is shown in (PRICE_UNITS below): each fuel on
    // its own — its column charts and the explorer with that fuel alone — and
    // both fuels together on one chart (the explorer).
    //   'barrel' — Kč/barel, as crude is quoted (crude_oil only)
    //   'mwh'    — Kč/MWh, on energyBasis
    //   'pj'     — mil. Kč/PJ, on energyBasis
    priceUnit: { crude_oil: 'barrel', natural_gas: 'mwh', both: 'mwh' },
    toolAspect: 0.5,         // the explorer's chart, legend included: height ÷ width (2:1)
    titleSize: 16,           // chart titles drawn by the library
    axisSize: 12,            // axis ticks, units and legends
    axisTextColor: '#53616e',
    gridColor: '#e8eef6',
  };

  // Conversion factors: customs tonnes → energy and barrels.
  const CONVERSIONS = {
    ncv: { crude_oil: 42.6, natural_gas: 48.0 },        // výhřevnost, GJ/t
    ncvPerGcv: { crude_oil: 0.95, natural_gas: 0.9 },   // výhřevnost ÷ spalné teplo
    barrelsPerTonne: 7.53,                              // crude oil
  };

  const DATA = '/assets-local/files/dovoz-fosilnich-paliv';
  // The source runs 1999–2026, but 2026 is a part-year and has no GDP figure,
  // so the KPI row stops at the last complete year. Move this once it closes.
  const YEAR_FROM = 2017;
  const YEAR_TO   = 2025;

  // Which suppliers get a band of their own, in stack order, bottom first;
  // every other country code falls into Ostatní — including Eurostat's
  // "country not specified" codes (QU, QV), and Germany's gas. Colours are in
  // CFG, by slug.
  const ROPA = {
    RU: ['rusko',          'Rusko'],
    AZ: ['azerbajdzan',    'Ázerbájdžán'],
    KZ: ['kazachstan',     'Kazachstán'],
    NO: ['norsko',         'Norsko'],
    SA: ['saudska_arabie', 'Saúdská Arábie'],
    US: ['usa',            'USA'],
  };
  const PLYN = {
    RU: ['rusko',    'Rusko'],
    NO: ['norsko',   'Norsko'],
  };
  const OSTATNI = ['ostatni', 'Ostatní'];

  // Both fuels together, as energy rather than as tonnes or crowns. The suppliers
  // of the two are merged and cut to the four biggest, because the per-fuel
  // charts further down hold the detail.
  const FOSIL = {
    RU: ['rusko',       'Rusko'],
    AZ: ['azerbajdzan', 'Ázerbájdžán'],
    NO: ['norsko',      'Norsko'],
    KZ: ['kazachstan',  'Kazachstán'],
  };

  // Calorific values in GJ/t on CFG.energyBasis (CONVERSIONS). Mass is the
  // only energy-bearing column in the customs data.
  const { ncv: NCV, ncvPerGcv: NCV_PER_GCV } = CONVERSIONS;
  const GCV = CFG.energyBasis === 'gcv';
  const CV = GCV ? { crude_oil: NCV.crude_oil / NCV_PER_GCV.crude_oil, natural_gas: NCV.natural_gas / NCV_PER_GCV.natural_gas } : NCV;
  // The basis in words: after a unit ("TWh spalného tepla") and as a noun.
  const BASIS = GCV ? { of: 'spalného tepla', name: 'spalné teplo', in: 've spalném teple' }
    : { of: 'výhřevnosti', name: 'výhřevnost', in: 've výhřevnosti' };
  // The page's text that names it (a source line in the .md).
  document.querySelectorAll('[data-energy-basis]').forEach(el => { el.textContent = BASIS.in; });
  // …and that quotes CONVERSIONS (the sources section), with the decimals given.
  document.querySelectorAll('[data-conversion]').forEach(el => {
    const v = el.dataset.conversion.split('.').reduce((o, k) => o?.[k], CONVERSIONS);
    if (v != null) el.textContent = fokFormatNumber(v, String(v).split('.')[1]?.length ?? 0);
  });
  // Energy in CFG.energyUnit; `perPJ` is how many of it make a PJ.
  const ENERGY = { twh: { label: 'TWh', perPJ: 1 / 3.6 }, pj: { label: 'PJ', perPJ: 1 } }[CFG.energyUnit];
  const toEnergy = (kg, commodity) => kg * CV[commodity] * 1e-9 * ENERGY.perPJ;

  const keysOf   = m => Object.values(m).map(v => v[0]).concat(OSTATNI[0]);
  const labelsOf = m => Object.fromEntries(Object.values(m).concat([OSTATNI]).map(v => [v[0], v[1]]));
  const colorsOf = m => Object.fromEntries(keysOf(m).map(k => [k, CFG[k]]));

  // d3.autoType is deliberately not used: it reads a bare "2017" as a Date.
  // mass_kg is blank for 2006–2008 in the source, outside the window used here,
  // but the fallback keeps a future gap from poisoning a sum with NaN.
  const importRow = d => ({
    commodity: d.commodity,
    year: +d.year,
    country_code: d.country_code,
    mass_kg: d.mass_kg ? +d.mass_kg : 0,
    value_mil_czk: d.value_mil_czk ? +d.value_mil_czk : 0,
  });
  // The same export cut by month, for the latest 36 months and the explorer.
  const monthlyRow = d => ({ ...importRow(d), month: +d.month });

  const years = d3.range(YEAR_FROM, YEAR_TO + 1);
  const inWindow = d => d.year >= YEAR_FROM && d.year <= YEAR_TO;

  /** What one commodity cost per year, in mld. Kč, for the given years. */
  function spending(rows, commodity, yrs) {
    const byYear = d3.rollup(rows.filter(d => d.commodity === commodity),
      rs => d3.sum(rs, d => d.value_mil_czk) / 1000, d => d.year);
    return yrs.map(year => ({ year, czk_mld: byYear.get(year) ?? 0 }));
  }

  /** Imports in CFG.energyUnit, split by country of origin. The result also carries the
   *  two fuels' own totals: the bands answer "from where", the totals answer
   *  "how much of which", and the tooltip shows both. The chart only reads the
   *  country keys, so the extra fields are ignored there. */
  function byCountry(rows, codes) {
    const out = Object.fromEntries(keysOf(codes).map(k => [k, 0]));
    out.ropa_e = 0;
    out.plyn_e = 0;
    rows.forEach(d => {
      const e = toEnergy(d.mass_kg, d.commodity);
      out[(codes[d.country_code] ?? OSTATNI)[0]] += e;
      if (d.commodity === 'crude_oil') out.ropa_e += e;
      else out.plyn_e += e;
    });
    return out;
  }

  /** Average import price in Kč/MWh: what was paid over the energy that came,
   *  overall (`prumer`) and per country. Under `minMWh` it is NaN — a small
   *  consignment's unit value says nothing about a price — which the line
   *  chart draws as a gap. Customs value at the border, not an exchange price. */
  const toMWh = d => d.mass_kg * CV[d.commodity] / 3600;
  function prices(rows, codes, minMWh) {
    const price = rs => {
      const mwh = d3.sum(rs, toMWh);
      return mwh >= minMWh ? d3.sum(rs, d => d.value_mil_czk) * 1e6 / mwh : NaN;
    };
    const byKey = d3.group(rows, d => (codes[d.country_code] ?? OSTATNI)[0]);
    return { prumer: price(rows), ...Object.fromEntries(keysOf(codes).map(k => [k, price(byKey.get(k) ?? [])])) };
  }

  /** Energy by country, per year of the window. */
  function energyByCountry(rows, codes) {
    const byYear = d3.group(rows.filter(inWindow), d => d.year);
    return years.map(year => ({ year, ...byCountry(byYear.get(year) ?? [], codes) }));
  }

  Promise.all([
    d3.csv(`${DATA}/imports-annual.csv`, importRow),
    d3.csv(`${DATA}/imports-monthly.csv`, monthlyRow),
    d3.csv(`${DATA}/gdp.csv`, d => [+d.year, +d.value_mil_czk]),
    d3.csv(`${DATA}/msmt.csv`, d => [+d.year, +d.total_mld_czk]),
    d3.csv(`${DATA}/sfdi.csv`, d => [+d.year, +d.total_mld_czk]),
  ]).then(([imports, monthly, gdp, msmt, sfdi]) => {
    const ofFuel = c => imports.filter(d => d.commodity === c);
    // Spending runs on to the newest year in the export, part-year included:
    // the fuel columns draw that year's bar as an outline. Imports stop at
    // YEAR_TO, as a part-year area would read as a collapse. `payments` reads
    // spending by index from YEAR_FROM, so the extra year never reaches it.
    const toNewest = d3.range(YEAR_FROM, d3.max(imports, d => d.year) + 1);
    const ropa = {
      czk: spending(imports, 'crude_oil', toNewest),
      energie: energyByCountry(ofFuel('crude_oil'), ROPA),
    };
    const plyn = {
      czk: spending(imports, 'natural_gas', toNewest),
      energie: energyByCountry(ofFuel('natural_gas'), PLYN),
    };
    const gdpByYear = new Map(gdp);
    const msmtByYear = new Map(msmt);
    const sfdiByYear = new Map(sfdi);

    const payments = years.map((year, i) => {
      const total = ropa.czk[i].czk_mld + plyn.czk[i].czk_mld;
      return {
        year,
        ropa_czk_mld: ropa.czk[i].czk_mld,
        plyn_czk_mld: plyn.czk[i].czk_mld,
        total_czk_mld: total,
        gdp_share_pct: 100 * total * 1000 / gdpByYear.get(year),
        // Comparisons over the same GDP, so every line shares a base: the
        // education ministry (MŠMT) and the transport infrastructure fund (SFDI).
        msmt_pct: 100 * msmtByYear.get(year) * 1000 / gdpByYear.get(year),
        sfdi_pct: 100 * sfdiByYear.get(year) * 1000 / gdpByYear.get(year),
      };
    });

    // Catches a malformed drop-in export: every year needs a GDP figure to
    // divide by.
    years.filter(y => !gdpByYear.has(y))
      .forEach(y => console.warn(`dovoz: no GDP for ${y}`));

    // The two import files are one export. Replace one without the other and
    // the months would quietly disagree with the years.
    const massBy = rows => d3.rollup(rows, rs => d3.sum(rs, d => d.mass_kg),
      d => `${d.commodity} ${d.year}`);
    const [annualKg, monthlyKg] = [massBy(imports), massBy(monthly)];
    new Set([...annualKg.keys(), ...monthlyKg.keys()]).forEach(key => {
      const [a, m] = [annualKg.get(key) ?? 0, monthlyKg.get(key) ?? 0];
      if (Math.abs(a - m) > 1e-3 * Math.max(a, m))
        console.warn(`dovoz: monthly and annual exports disagree for ${key}`);
    });

    render({ ropa, plyn, payments, monthly, imports, toNewest, energie: energyByCountry(imports, FOSIL) });
  }).catch(err => console.error('dovoz: data failed to load', err));

  function render({ ropa, plyn, payments, monthly, imports, toNewest, energie }) {
    const lastOf = rows => rows[rows.length - 1];
    const totalE = row => row.ropa_e + row.plyn_e;
    const setText = (id, text) => { document.getElementById(id).textContent = text; };

    // Every KPI speaks for the last complete year.
    document.querySelectorAll('.kpi-label')
      .forEach(el => { el.textContent += ` (${YEAR_TO})`; });

    setText('kpi-total',  fokFormatNumber(lastOf(payments).total_czk_mld, 1) + ' mld. Kč');
    setText('kpi-gdp',    fokFormatNumber(lastOf(payments).gdp_share_pct, 1) + ' % HDP');
    setText('kpi-energy', `${fokFormatNumber(totalE(lastOf(energie)), 0)} ${ENERGY.label}`);
    // The imports' KPI explains its unit on hover: which basis, why, and the
    // figure on the other one.
    {
      const last = lastOf(energie);
      const other = GCV ? last.ropa_e * NCV_PER_GCV.crude_oil + last.plyn_e * NCV_PER_GCV.natural_gas
        : last.ropa_e / NCV_PER_GCV.crude_oil + last.plyn_e / NCV_PER_GCV.natural_gas;
      // Inline: the tooltip's <strong> is its heading, a block.
      const bold = t => `<span style="font-weight:700">${t}</span>`;
      const why = GCV
        ? [`Energie dovezené ropy a zemního plynu ve ${bold('spalném teple')}, tedy tak, jak se zemní plyn obchoduje a účtuje (burza, faktury).`,
           `Ve výhřevnosti, kterou používají energetické bilance (ČSÚ, Eurostat), by to bylo ${fokFormatNumber(other, 0)} ${ENERGY.label}.`]
        : [`Energie dovezené ropy a zemního plynu ve ${bold('výhřevnosti')}, tak jak ji používají energetické bilance (ČSÚ, Eurostat).`,
           `Ve spalném teple, ve kterém se obchoduje a účtuje zemní plyn, by to bylo ${fokFormatNumber(other, 0)} ${ENERGY.label}.`];
      const html = `<div style="font-family:${FoKTheme.font};max-width:280px">`
        + `<strong>${fokFormatNumber(totalE(last), 0)} ${ENERGY.label} ${BASIS.of}</strong><br>`
        + why.join('<br>') + (ENERGY.label === 'TWh' ? '<br>1 TWh = 3,6 PJ.' : '<br>1 PJ ≈ 0,28 TWh.') + '</div>';
      const tip = fokTooltip(FoKTheme);
      d3.select(document.getElementById('kpi-energy').closest('.kpi')).classed('kpi--info', true)
        .on('mouseenter', e => { tip.show(html); tip.move(e); })
        .on('mousemove', e => tip.move(e))
        .on('mouseleave', () => tip.hide());
    }

    const theme = {
      ...FoKTheme,
      colors:   { ...FoKTheme.colors, grey: CFG.axisTextColor },
      fontSize: { ...FoKTheme.fontSize, title: CFG.titleSize, axisLabel: CFG.axisSize },
      axis:     { ...FoKTheme.axis, gridColor: CFG.gridColor },
      bar:      { ...FoKTheme.bar, padding: CFG.barPadding },
      line:     { ...FoKTheme.line, strokeWidth: CFG.lineWidth },
    };
    // A line chart takes its colour from categorical[0], not from colors.primary.
    const lineTheme = c => ({
      ...theme,
      colors: { ...theme.colors, categorical: [c, ...theme.colors.categorical.slice(1)] },
    });

    // Every other year, so the labels never collide once the panels are narrow.
    const xTicks = years.filter((_, i) => i % 2 === 0);
    const czkMld = d => `${fokFormatNumber(d, 1)} mld. Kč`;
    const en     = d => `${fokFormatNumber(d, 1)} ${ENERGY.label}`;
    const head   = y => `<strong style="font-family:${theme.font}">${y}</strong><br>`;
    const plain  = s => `<span style="font-family:${theme.font}">${s}</span>`;

    // Ropa and plyn are meant to be read against each other, so their money
    // and energy charts share one scale each rather than each picking its own.
    const maxCzk = Math.ceil(d3.max(ropa.czk.concat(plyn.czk), d => d.czk_mld) / 50) * 50;
    const maxE  = d3.nice(0, d3.max(ropa.energie.concat(plyn.energie), totalE), 4)[1];
    // An energy axis to `top`: labels and grid lines on the same round steps
    // (20 TWh in the fuel columns, 50 in the KPI card with today's data).
    const energyAxis = top => ({ yMax: top, yTickValues: d3.ticks(0, top, 4) });

    // The fuel columns' yearly charts run to the newest year in the export.
    // A part-year is estimated whole (estimate): spending's bar is what was
    // paid so far, solid, and the rest of the year hatched over it; imports
    // give the estimated total alone, a grey hatched area dashed in from the
    // last full year. Its tooltip says how far the data go. Every year is
    // labelled where it fits; narrow, every other one, counted back from the
    // newest.
    const isPartYear = year => lastMonth.get(year) < 12;
    const yearName = year => isPartYear(year) ? `${year} (leden–${monthLong(lastMonth.get(year))})` : year;
    const colTicks = sel => d3.range(lastYear, YEAR_FROM - 1, isNarrow(sel) ? -2 : -1).reverse();

    // An arrow's text is the page's: the `arrow` of the chart's foot include in
    // the .md, its lines split at "|". Without one the chart draws no arrow;
    // where it points is the chart's, in `arrow`.
    const arrowsFor = (sel, arrow) => {
      const text = document.querySelector(`.chart-foot[data-chart="${sel.slice(1)}"]`)?.dataset.arrow;
      return text ? [{ ...arrow, lines: text.split('|') }] : [];
    };

    // A part-year estimated: the year's head, the whole-year figure, what the
    // data hold so far, and how the rest was reckoned.
    const estimateTip = (est, fmt, whole, sofar, note) => head(`${est.year} (odhad)`)
      + `<div style="font-family:${theme.font};font-weight:700">Celý rok: ${fmt(whole)}</div>`
      + plain(`Leden–${monthLong(est.last)}: ${fmt(sofar)} (skutečnost)`)
      + `<div style="font-family:${theme.font};font-size:11px;color:${theme.colors.grey};`
      + `max-width:240px;margin-top:4px">${note}</div>`;

    const money = (sel, commodity, rows, color, extra) => w => {
      const est = estimate(commodity);
      const tip = est && estimateTip(est, czkMld, est.czk, est.czkSoFar,
        `Zbytek roku: dovoz za ${est.rest} jako průměr let ${est.years}, za ceny období ${est.recent}.`);
      const chart = fokBarChart(sel, rows, {
        x: d => String(d.year), y: d => d.czk_mld,
        color, partial: d => isPartYear(d.year) && !est, yLabel: 'mld. Kč', yLabelInline: true,
        width: w, height: CFG.chartHeight, theme,
        yDomain: [0, d3.nice(0, Math.max(maxCzk, est?.czk ?? 0), 4)[1]], yTicks: 4,
        xTickValues: colTicks(sel).map(String),
        yFormat: v => fokFormatNumber(v, 0),
        tooltipHtml: d => est && d.year === est.year ? tip : head(yearName(d.year)) + plain(czkMld(d.czk_mld)),
        ...extra,
      });
      if (!est) return chart;
      // The rest of the year over the part paid: hatched, with the bar's tooltip.
      const { g, xScale: x, yScale: y } = chart;
      const x0 = x(String(est.year)), top = y(est.czk), base = y(est.czkSoFar);
      g.append('rect').attr('x', x0).attr('y', top).attr('width', x.bandwidth()).attr('height', base - top)
        .attr('fill', '#fff').attr('fill-opacity', 0)
        .on('mouseover', e => { chart.tip.show(tip); chart.tip.move(e); })
        .on('mousemove', e => chart.tip.move(e))
        .on('mouseleave', () => chart.tip.hide());
      fokHatch(g, x0, top, x.bandwidth(), base - top, color).attr('opacity', 0.5);
      return chart;
    };

    // Stacked by country of origin, with the total drawn on top. The library's
    // own tooltip lists the bands but not what they add up to, which is what
    // the line is for. Same shape as the default — topmost band first — then,
    // where both fuels are stacked together, the split the stack hides, because
    // the bands answer "from where" and say nothing about which fuel. `when`
    // names the row: a year or a month. `fmt` writes a value in the chart's
    // unit; with `pct` each band also gets its share of the row's total, "(57 %)".
    const bandsTip = (codes, when, { fmt = en, pct = false } = {}) => {
      const keys = keysOf(codes), colors = colorsOf(codes), labels = labelsOf(codes);
      return row => head(when(row))
        + keys.slice().reverse().map(k =>
            `<span style="color:${colors[k]}">■</span> `
            + plain(`${labels[k]}: ${fmt(row[k])}`
              + (pct ? ` (${fokFormatNumber(100 * row[k] / totalE(row), 0)} %)` : ''))).join('<br>')
        + `<div style="font-family:${theme.font};margin-top:4px;padding-top:4px;`
        + `border-top:1px solid ${theme.colors.gridLine}">`
        + (codes === FOSIL ? `Ropa: ${fmt(row.ropa_e)}<br>Zemní plyn: ${fmt(row.plyn_e)}` : '')
        + `<div style="font-weight:700">Celkem: ${fmt(totalE(row))}</div>`
        + `</div>`;
    };
    const energy = (sel, rows, codes, extra) => w => fokAreaChartStacked(sel, rows, {
      x: d => d.year, keys: keysOf(codes), colors: colorsOf(codes), labels: labelsOf(codes),
      yLabel: ENERGY.label, yLabelInline: true, totalLine: CFG.colorTotal,
      width: w, height: CFG.chartHeight, theme, legend: true,
      xTickValues: xTicks, xFormat: String,
      yFormat: v => fokFormatNumber(v, 0),
      tooltipHtml: bandsTip(codes, row => row.year),
      ...extra,
    });

    // A legend in the SVG, so a downloaded file keeps it: a swatch and its
    // label per item, wrapped to `width`; `gap` is the swatch-to-label gap.
    const LEGEND_ROW = 20;
    const legendLayout = (items, width, gap = 6) => {
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = `${theme.fontSize.axisLabel}px Roboto, sans-serif`;
      let x = 0, y = 0;
      const placed = items.map(it => {
        const w = 12 + gap + ctx.measureText(it.label).width;
        if (x > 0 && x + w > width) { x = 0; y += LEGEND_ROW; }
        const at = { ...it, x, y };
        x += w + 16;
        return at;
      });
      return { placed, gap, height: items.length ? y + LEGEND_ROW : 0 };
    };
    // Draws a laid-out legend at (0, y) of `svg`, labels in the axis grey or
    // in labelColor(item).
    const drawLegend = (svg, legend, y, labelColor = () => theme.colors.grey) => {
      const lg = svg.append('g').attr('class', 'svg-legend').attr('transform', `translate(0,${y})`);
      legend.placed.forEach(it => {
        // A dashed series gets a dashed stroke for a swatch, the rest a square.
        if (it.dashed) lg.append('line').attr('x1', it.x).attr('x2', it.x + 12).attr('y1', it.y + 6).attr('y2', it.y + 6)
          .attr('stroke', it.color).attr('stroke-width', 2).attr('stroke-dasharray', '4 2');
        else lg.append('rect').attr('x', it.x).attr('y', it.y).attr('width', 12).attr('height', 12).attr('fill', it.color);
        lg.append('text').attr('x', it.x + 12 + legend.gap).attr('y', it.y + 10)
          .attr('font-family', theme.font).attr('font-size', theme.fontSize.axisLabel)
          .attr('fill', labelColor(it)).text(it.label);
      });
    };

    // The columns' imports: the KPI cards' legend — square swatches, a third
    // of one to the label, each label in its colour — in the SVG, flush left
    // above the plot. Both fuels keep room for the taller of their two
    // legends, so the plots stay level across the columns.
    const legendItems = codes => keysOf(codes).map(k => ({ label: labelsOf(codes)[k], color: colorsOf(codes)[k] }));
    const columnEnergy = (sel, rows, codes, extra) => w => {
      const room = d3.max([ROPA, PLYN], c => legendLayout(legendItems(c), w, 4).height);
      const legend = legendLayout(legendItems(codes), w, 4);
      // The fuels' own charts have the room to name the basis: "TWh spalného tepla".
      const chart = energy(sel, rows, codes, {
        yLabel: GCV ? `${ENERGY.label} ${BASIS.of}` : ENERGY.label,
        ...extra, legend: false, height: CFG.chartHeight + room, margins: { top: theme.margins.top + room },
      })(w);
      drawLegend(chart.svg, legend, room - legend.height, it => readable(it.color));
      return chart;
    };

    // "Postupný konec dovozu z Ruska" on the yearly imports: the text alone,
    // no arrow, over the stack's right end and flush with the plot's right
    // edge (lastYear, where the grid lines end).
    const russiaEndNote = (sel, textY) => arrowsFor(sel, { textEnd: [lastYear, textY], side: 'left', textGap: 0 });

    // By year, on the axis ropa and plyn share (maxE).
    // The part-year's estimate is the total alone (estimate): its row is all
    // gaps, so the stack stops at the last full year and the hover still
    // reaches it; over it, an area hatched in the grid lines' colour up to the
    // estimate, the total line dashed in to its top, as thick as the solid.
    const fuelEnergy = (sel, rows, codes, extra) => {
      const est = estimate(codes === ROPA ? 'crude_oil' : 'natural_gas');
      const gaps = est && { year: est.year, estimate: true,
        ...Object.fromEntries([...keysOf(codes), 'ropa_e', 'plyn_e'].map(k => [k, NaN])) };
      const bands = bandsTip(codes, row => row.year, { pct: true });
      const tip = est && estimateTip(est, en, est.e, est.eSoFar,
        `Zbytek roku: ${est.rest} jako průměr let ${est.years}. Jen celkem, bez rozdělení podle zemí.`);
      const draw = columnEnergy(sel, est ? [...rows, gaps] : rows, codes, {
        ...energyAxis(maxE),
        xDomain: [YEAR_FROM, lastYear], xTickValues: colTicks(sel),
        tooltipHtml: row => row.estimate ? tip : bands(row),
        ...extra,
      });
      return w => {
        const chart = draw(w);
        if (!est) return chart;
        const { g, xScale: x, yScale: y } = chart;
        const prev = rows.find(r => r.year === est.year - 1);
        const from = [x(est.year - 1), y(totalE(prev))], to = [x(est.year), y(est.e)];
        fokHatchPolygon(g, [[from[0], y(0)], from, to, [to[0], y(0)]], theme.axis.gridColor);
        g.append('line').attr('pointer-events', 'none')
          .attr('x1', from[0]).attr('y1', from[1]).attr('x2', to[0]).attr('y2', to[1])
          .attr('stroke', CFG.colorTotal).attr('stroke-width', 2).attr('stroke-dasharray', '5 4');
        return chart;
      };
    };

    // The span selector above the fuel columns: the long-term charts or the
    // latest 36 months', in both columns at once.
    let span = 'long';
    document.querySelectorAll('[data-span-select] button').forEach(b => b.addEventListener('click', () => {
      span = b.dataset.value;
      document.querySelectorAll('[data-span-select] button')
        .forEach(x => x.setAttribute('aria-pressed', String(x.dataset.value === span)));
      drawAll();
    }));

    // Each name in its country's colour, darkened in the same hue only as far
    // as it takes to read on white (4.5:1): the pale ones — Kazachstán, USA,
    // Ostatní — would all but vanish as text.
    const luminance = c => {
      const f = v => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      const { r, g, b } = d3.rgb(c);
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const readable = c => {
      let hsl = d3.hsl(c);
      while (1.05 / (luminance(hsl) + 0.05) < 4.5 && hsl.l > 0) hsl = d3.hsl(hsl.h, hsl.s, hsl.l - 0.02);
      return hsl.formatHex();
    };

    // The explorer by country, "každá země ve vlastním grafu": drawn over the
    // whole chart's box, which stays laid out (hidden, not removed), so
    // switching never changes the page's height.
    //
    // Small multiples: one small chart per country, so a band a stack squeezes
    // between others reads on its own. Four to a row, at most eight — over
    // that, Ostatní goes first. One scale for every tile; only the first tile
    // of a row labels it. `drawTile(node, key, tile)` draws one.
    // Left margins of the first tile and the rest. The grid's first column is
    // their difference less the column gap, so every plot is equally wide.
    const MINI_AXIS = 36, MINI_EDGE = 6, PER_ROW = 4, MAX_TILES = 8;
    const tiles = (sel, boxSel, codes, drawTile) => {
      const grid = d3.select(sel).html('');
      let keys = keysOf(codes);
      if (keys.length > MAX_TILES) keys = keys.filter(k => k !== OSTATNI[0]).slice(0, MAX_TILES);
      grid.style('height', document.querySelector(boxSel).getBoundingClientRect().height + 'px')
        .style('grid-template-columns', `${MINI_AXIS - MINI_EDGE - 12}px repeat(${PER_ROW}, minmax(0, 1fr))`)
        .style('grid-template-rows', `repeat(${Math.ceil(keys.length / PER_ROW)}, minmax(0, 1fr))`);
      const colors = colorsOf(codes), labels = labelsOf(codes);
      keys.forEach((k, i) => {
        const first = i % PER_ROW === 0;
        const cell = grid.append('div').classed('mini-first', first);
        const label = cell.append('div').attr('class', 'mini-label')
          .style('color', readable(colors[k])).text(labels[k]).node();
        const node = cell.append('div').node();
        drawTile(node, k, {
          first, color: colors[k], label: labels[k],
          width: Math.round(node.getBoundingClientRect().width),
          height: Math.round(cell.node().getBoundingClientRect().height - label.getBoundingClientRect().height),
          margins: { top: 20, right: 8, bottom: 28, left: first ? MINI_AXIS : MINI_EDGE },
          yFormat: first ? v => fokFormatNumber(v, 0) : () => '',
        });
      });
      // Laid out, the tiles become one SVG, as countryRows' rows are one, so a
      // download takes them all: each tile's <svg> nested where it stood, each
      // name as text in its place.
      const box = grid.node().getBoundingClientRect();
      const at = el => { const r = el.getBoundingClientRect(); return { x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height }; };
      const parts = [...grid.node().children].map(cell => {
        const label = cell.querySelector('.mini-label');
        return { svg: cell.querySelector('svg'), s: at(cell.querySelector('svg')), l: at(label),
          text: label.textContent, color: label.style.color };
      });
      grid.html('').style('grid-template-columns', '1fr').style('grid-template-rows', '1fr');
      const out = fokResponsiveSVG(grid, `0 0 ${Math.round(box.width)} ${Math.round(box.height)}`);
      parts.forEach(p => {
        out.append('text').attr('x', p.l.x).attr('y', p.l.y + p.l.h / 2).attr('dy', '0.35em')
          .attr('fill', p.color).attr('font-family', theme.font).attr('font-size', 13).attr('font-weight', 600)
          .text(p.text);
        d3.select(p.svg).attr('class', null).attr('overflow', 'visible')
          .attr('x', p.s.x).attr('y', p.s.y).attr('width', p.s.w).attr('height', p.s.h);
        out.node().appendChild(p.svg);
      });
      return out;
    };

    // Spending: one row of columns per country, stacked in a single chart —
    // the biggest supplier at the bottom, Ostatní on top (it is no country).
    // Every bar is drawn to the whole chart's own scale, so a column of bars
    // down the rows adds up to that period's stacked bar; each row is as tall
    // as its country's highest bar, not one height for all. The countries
    // peak at different times, so the rows can need more room than the box:
    // then the chart grows rather than shrinking the scale. `o.plotH` and
    // `o.top` are the whole chart's plot height and the top of its axis.
    const countryRows = (sel, boxSel, data, codes, o) => {
      const box = d3.select(sel).html('')
        .style('grid-template-columns', '1fr').style('grid-template-rows', '1fr');
      const boxH = Math.round(document.querySelector(boxSel).getBoundingClientRect().height);
      const W = Math.round(box.node().getBoundingClientRect().width);
      const colors = colorsOf(codes), labels = labelsOf(codes);
      const total = k => d3.sum(data, d => d[k]);
      const keys = keysOf(codes).filter(k => k !== OSTATNI[0])
        .sort((a, b) => total(b) - total(a)).concat(OSTATNI[0]);
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = `600 ${theme.fontSize.axisLabel}px Roboto, sans-serif`;
      const m = { top: 24, right: 8, bottom: 32, left: Math.ceil(d3.max(keys, k => ctx.measureText(labels[k]).width)) + 12 };
      const perUnit = o.plotH / o.top;
      // A row: its tallest bar, never less than its name needs, and a gap above.
      const rowHs = keys.map(k => Math.max(perUnit * (d3.max(data, d => d[k]) || 0), 14) + 8);
      const H = Math.max(boxH, Math.ceil(m.top + d3.sum(rowHs) + m.bottom));
      box.style('height', H + 'px');
      box.node().closest('.fuel-plot').style.minHeight = H > boxH ? H + 'px' : '';
      const inner = { w: W - m.left - m.right, h: H - m.top - m.bottom };
      const x = d3.scaleBand(data.map(o.key), [0, inner.w])
        .paddingInner(theme.bar.padding).paddingOuter(theme.bar.padding / 2);
      const svg = fokResponsiveSVG(box, `0 0 ${W} ${H}`);
      const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);
      g.append('text').attr('class', 'fok-axis-label')
        .attr('x', -m.left + 4).attr('y', -10)
        .attr('fill', theme.colors.grey).attr('font-family', theme.font).attr('font-size', theme.fontSize.axisLabel)
        .text(`${o.unit}, ve stejném měřítku jako celkový graf`);
      const tip = fokTooltip(theme);
      let base = inner.h;   // rows from the bottom up
      keys.forEach((k, i) => {
        const row = g.append('g').attr('class', 'country-row').attr('transform', `translate(0,${base})`);
        row.append('line').attr('x2', inner.w).attr('stroke', theme.axis.gridColor);
        row.append('text').attr('x', -8).attr('y', -2).attr('text-anchor', 'end')
          .attr('fill', readable(colors[k])).attr('font-family', theme.font)
          .attr('font-size', theme.fontSize.axisLabel).attr('font-weight', 600).text(labels[k]);
        row.selectAll('rect').data(data).join('rect')
          .attr('x', d => x(o.key(d))).attr('width', x.bandwidth())
          .attr('y', d => -perUnit * d[k]).attr('height', d => perUnit * d[k])
          .attr('fill', colors[k])
          .on('mouseover', (event, d) => { tip.show(head(o.label(d)) + plain(`${labels[k]}: ${o.fmt(d[k])}`)); tip.move(event); })
          .on('mousemove', event => tip.move(event))
          .on('mouseleave', () => tip.hide());
        base -= rowHs[i];
      });
      g.append('g').attr('class', 'fok-axis fok-axis--x').attr('transform', `translate(0,${inner.h})`)
        .call(fokAxisX(x, { tickValues: o.ticks, tickFormat: o.tickFormat }, theme));
      fokMarkers(g, o.markers, mk => x(mk.band) == null ? null : x(mk.band) + (mk.offset ?? 0.5) * x.bandwidth(), inner, theme);
      return svg;
    };

    // Months: Czech names, and every month of the export from YEAR_FROM.
    const monthFmt = opts => {
      const f = new Intl.DateTimeFormat('cs', opts);
      return m => f.format(new Date(2000, m - 1));
    };
    const monthShort = monthFmt({ month: 'short' });   // led, úno, …
    const monthLong  = monthFmt({ month: 'long' });    // leden, únor, …

    const monthsOf = rows => [...d3.rollup(rows, rs => d3.max(rs, d => d.month), d => d.year)]
      .sort(([a], [b]) => a - b)
      .flatMap(([year, last]) => d3.range(1, last + 1).map(month => ({ year, month })));
    const lastMonth = d3.rollup(monthly.filter(d => d.year >= YEAR_FROM),
      rs => d3.max(rs, d => d.month), d => d.year);
    const lastYear = d3.max(lastMonth.keys());
    const windowMonths = monthsOf(monthly.filter(d => d.year >= YEAR_FROM));

    const monthGroups = Object.fromEntries(['crude_oil', 'natural_gas'].map(c =>
      [c, d3.group(monthly.filter(d => d.commodity === c), d => d.year, d => d.month)]));
    const ofMonth = (commodity, year, month) => monthGroups[commodity].get(year)?.get(month) ?? [];

    // ── The part-year's estimate ────────────────────────────────────────────
    // The year the export stops in, whole: what came and was paid so far, and
    // the rest of the year as the same months averaged over the EST_YEARS
    // years before — the amount — at the price of the year's own last three
    // months, for spending. By fuel, totals only; null once the year closes.
    const EST_YEARS = 3;
    const estimate = commodity => {
      const year = lastYear, last = lastMonth.get(year);
      if (last >= 12) return null;
      const sum = (y, months, f) => d3.sum(months, m => d3.sum(ofMonth(commodity, y, m), f));
      const e = d => toEnergy(d.mass_kg, d.commodity), czk = d => d.value_mil_czk / 1000;
      const sofar = d3.range(1, last + 1), rest = d3.range(last + 1, 13);
      const recent = d3.range(Math.max(1, last - 2), last + 1);
      const restE = d3.mean(d3.range(year - EST_YEARS, year), y => sum(y, rest, e));
      const czkPerE = sum(year, recent, czk) / sum(year, recent, e);
      const span = ms => ms.length > 1 ? `${monthLong(ms[0])}–${monthLong(ms[ms.length - 1])}` : monthLong(ms[0]);
      return {
        year, last,
        eSoFar: sum(year, sofar, e), czkSoFar: sum(year, sofar, czk),
        e: sum(year, sofar, e) + restE, czk: sum(year, sofar, czk) + restE * czkPerE,
        rest: span(rest), recent: `${span(recent)} ${year}`, years: `${year - EST_YEARS}–${year - 1}`,
      };
    };
    // Twelve labels fit a half-row on a desktop, not on a phone.
    const isNarrow = sel => document.querySelector(sel).getBoundingClientRect().width < 440;
    // 24 February 2022: day 55 of the year, on the year-fraction scale of the month charts.
    const INVASION = { x: 2022 + 54 / 365, label: 'Ruská invaze na Ukrajinu' };

    // The columns' last two charts: the latest 36 months, money then energy.
    // Spending shares an axis across the fuels, like the yearly charts.
    // 36: the charts' titles and texts on the page say so — change them together.
    const recent = windowMonths.slice(-36);
    const spendPeak = d3.max(['crude_oil', 'natural_gas'], c =>
      d3.max(recent, d => d3.sum(ofMonth(c, d.year, d.month), r => r.value_mil_czk) / 1000));
    const spendTop = d3.nice(0, spendPeak, 4)[1];
    // Bands are months, keyed "2025-1"; only Januaries are labelled, with the year.
    const ymKey = d => `${d.year}-${d.month}`;
    const recentJanuaries = recent.filter(d => d.month === 1);

    // A column per month in the fuel's colour.
    const monthCzk = (commodity, year, month) => d3.sum(ofMonth(commodity, year, month), r => r.value_mil_czk) / 1000;
    const spendMonths = (sel, commodity, color, extra) => w => fokBarChart(sel,
      recent.map(d => ({ ...d, key: ymKey(d), czk: monthCzk(commodity, d.year, d.month) })), {
        x: d => d.key, y: d => d.czk, color, yLabel: 'mld. Kč', yLabelInline: true,
        width: w, height: CFG.chartHeight, theme,
        yDomain: [0, spendTop], yTickValues: d3.ticks(0, spendTop, 4),
        xTickValues: recentJanuaries.map(ymKey), xFormat: k => k.split('-')[0],
        yFormat: v => fokFormatNumber(v, 0),
        tooltipHtml: d => head(`${monthLong(d.month)} ${d.year}`) + plain(czkMld(d.czk)),
        ...extra,
      });
    // The Hormuz crisis (28 February 2026, see CONTEXT) on the 36 months'
    // spending: onto March, its first month, from text left of January, over
    // the months before it. The tip stops at 11 mld. Kč, or on the bar's top
    // where the bar is taller.
    const hormuzArrow = (sel, commodity) => arrowsFor(sel, {
      target: ['2026-3', Math.max(11, monthCzk(commodity, 2026, 3))],
      textEnd: ['2026-1', 13.5], side: 'left',
    });
    // Imports per month by country, as the run above draws them, ropa and
    // plyn on one axis (recentTop) like the yearly charts.
    const monthE = (commodity, year, month) => d3.sum(ofMonth(commodity, year, month), d => toEnergy(d.mass_kg, d.commodity));
    const recentTop = d3.nice(0, d3.max(['crude_oil', 'natural_gas'], c => d3.max(recent, d => monthE(c, d.year, d.month))), 4)[1];
    const importMonths = (sel, commodity, codes, extra) => columnEnergy(sel, recent.map(d => ({
      ...d, t: d.year + (d.month - 1) / 12, ...byCountry(ofMonth(commodity, d.year, d.month), codes),
    })), codes, {
      x: d => d.t, markers: [INVASION],
      xTickValues: recentJanuaries.map(d => d.year), xFormat: String,
      yMax: recentTop, yTickValues: d3.ticks(0, recentTop, 4),
      tooltipHtml: bandsTip(codes, d => `${monthLong(d.month)} ${d.year}`, { pct: true }),
      ...extra,
    });
    // Gas's 36 months of imports: June 2025, the peak, as storage fills for
    // the winter — onto the top of the stack, from text over the months
    // before it, high on the axis (recentTop), where they leave room.
    const refillArrow = sel => arrowsFor(sel, {
      target: [2025 + 5 / 12, monthE('natural_gas', 2025, 6)],
      textEnd: [2025.25, 0.94 * recentTop], side: 'left',
    });

    // Average import prices: by year, to the newest in the export — an
    // average, unlike a total, reads true for a part-year, whose tooltip
    // names its months — and for the latest 36 months. One line per fuel, on
    // its own axis, from zero. By country (the explorer), a country counts
    // only where it brought at least PRICE_MIN_MWH that month (that times the
    // months in a year).
    const PRICE_MIN_MWH = 50000;   // 50 GWh
    // Prices are computed in Kč per MWh (CFG.energyBasis) and shown in
    // CFG.priceUnit: `basis` takes Kč/MWh to the unit. A barrel holds
    // CV / barrelsPerTonne of energy; a PJ is 277 778 MWh, so mil. Kč/PJ is Kč/MWh
    // over 3.6.
    const MWH_PER_BBL = CV.crude_oil / CONVERSIONS.barrelsPerTonne / 3.6;
    const PRICE_UNITS = {
      barrel: { basis: MWH_PER_BBL, label: 'Kč/barel' },
      mwh:    { basis: 1,       label: GCV ? `Kč/MWh ${BASIS.of}` : 'Kč/MWh' },
      pj:     { basis: 1 / 3.6, label: GCV ? `mil. Kč/PJ ${BASIS.of}` : 'mil. Kč/PJ' },
    };
    const ALLOWED_UNITS = {
      crude_oil: ['barrel', 'mwh', 'pj'],
      natural_gas: ['mwh', 'pj'],
      both: ['mwh', 'pj'],
    };
    Object.entries(ALLOWED_UNITS).forEach(([c, ok]) => {
      if (!ok.includes(CFG.priceUnit[c])) throw new Error(`dovoz: CFG.priceUnit.${c} must be one of ${ok.join(', ')}`);
    });
    // `c`: 'crude_oil', 'natural_gas' or 'both'.
    const priceBasis = c => PRICE_UNITS[CFG.priceUnit[c]].basis;
    const priceUnit = c => PRICE_UNITS[CFG.priceUnit[c]].label;
    const priceFmt = unit => v => `${fokFormatNumber(v, 0)} ${unit}`;

    // The fuel columns' price rows: each year's or month's average, in the
    // fuel's own unit.
    const priceRows = (kind, c) => {
      const avg = rs => prices(rs, {}, 1).prumer * priceBasis(c);
      return kind === 'years'
        ? toNewest.map(year => ({ year, prumer: avg(imports.filter(d => d.commodity === c && d.year === year)) }))
        : recent.map(d => ({ ...d, t: d.year + (d.month - 1) / 12, prumer: avg(ofMonth(c, d.year, d.month)) }));
    };

    const price = (sel, kind, commodity, color) => w => {
      const rows = priceRows(kind, commodity);
      const top = d3.nice(0, d3.max(rows, r => r.prumer), 4)[1];
      const yearly = kind === 'years';
      const kc = priceFmt(priceUnit(commodity));
      return fokLineChart(sel, rows, {
        x: d => yearly ? d.year : d.t, y: d => d.prumer,
        yLabel: priceUnit(commodity), yLabelInline: true, width: w, height: CFG.chartHeight,
        theme: lineTheme(color),
        yDomain: [0, top], yTickValues: d3.ticks(0, top, 4),
        xTickValues: yearly ? colTicks(sel) : recentJanuaries.map(d => d.year),
        xFormat: String,
        yFormat: v => fokFormatNumber(v, 0),
        // A part-year's average is dashed in from the last full year.
        partialAfter: yearly && isPartYear(lastYear) ? lastYear - 1 : undefined,
        tooltipHtml: r => head(yearly ? yearName(r.year) : `${monthLong(r.month)} ${r.year}`)
          + `<div style="font-family:${theme.font};font-weight:700">Průměr: ${kc(r.prumer)}</div>`,
      });
    };

    // ── The explorer: one chart, every view ─────────────────────────────────
    // Ukazatel × palivo × členění × krok × období, picked above the chart; the
    // chart, its title and its summary line follow, and chart-download.js saves
    // it as PNG or SVG with that title, summary and source. Each metric keeps
    // its own form whatever else is picked — imports an area, spending columns,
    // prices lines — and the legend is drawn into the SVG, so a saved file keeps
    // it. By country, the chart can split into small multiples in its own box.
    // Years stop at the last complete year, as a part-year total would read as
    // a collapse; months run to the newest.
    const TOOL_FIRST = 2012;
    const TOOL = {
      metric: 'czk', fuel: 'both', split: false, step: 'months',
      tiles: false, invasion: false, hormuz: false,
    };
    const toolMonths = monthsOf(monthly.filter(d => d.year >= TOOL_FIRST));
    const lastFullYear = d3.max(toolMonths.filter(d => d.month === 12), d => d.year);
    const yearGroups = d3.group(imports, d => d.commodity, d => d.year);
    const BOTH = { ...ROPA, ...PLYN };   // every named supplier of either fuel
    const codesOf = c => c === 'crude_oil' ? ROPA : PLYN;
    const fuelColor = c => c === 'crude_oil' ? CFG.colorRopa : CFG.colorPlyn;
    const FUEL_NAME = {
      crude_oil:   { gen: 'ropy', acc: 'ropu', label: 'Ropa' },
      natural_gas: { gen: 'zemního plynu', acc: 'zemní plyn', label: 'Zemní plyn' },
    };

    // The period slider, in months: a month's index is year·12 + month − 1.
    // By year it steps twelve at a time, each thumb on a January standing for
    // its whole year; by month, one. Switching keeps the period: a year's
    // "to" opens out to its last month, a month's falls back to its year. The
    // stretch between the thumbs is drawn darker.
    const mIdx = d => d.year * 12 + d.month - 1;
    const idxYear = i => Math.floor(i / 12);
    const lastIdx = mIdx(toolMonths[toolMonths.length - 1]);
    const toolFrom = document.getElementById('tool-from');
    const toolTo = document.getElementById('tool-to');
    const toolRange = toolFrom.closest('.dual-range');
    const paintRange = () => {
      const at = v => (v - toolFrom.min) / (toolFrom.max - toolFrom.min);
      toolRange.style.setProperty('--from', at(+toolFrom.value));
      toolRange.style.setProperty('--to', at(+toolTo.value));
    };
    const setSlider = (from, to) => {
      const byYear = TOOL.step === 'years';
      [toolFrom, toolTo].forEach(r => Object.assign(r, {
        min: TOOL_FIRST * 12, max: byYear ? lastYear * 12 : lastIdx, step: byYear ? 12 : 1,
      }));
      toolFrom.value = byYear ? idxYear(from) * 12 : from;
      toolTo.value = byYear ? idxYear(to) * 12 : Math.min(idxYear(to) * 12 + 11, lastIdx);
      paintRange();
    };
    setSlider(YEAR_FROM * 12, lastYear * 12);
    // The thumbs never cross: the one dragged stops a step short of the other.
    [toolFrom, toolTo].forEach(r => r.addEventListener('input', () => {
      if (+toolFrom.value >= +toolTo.value)
        r.value = r === toolFrom ? +toolTo.value - +r.step : +toolFrom.value + +r.step;
      paintRange();
      drawAll();
    }));
    document.querySelectorAll('.tool [data-control] button').forEach(b => b.addEventListener('click', () => {
      const group = b.closest('[data-control]');
      const [from, to] = [+toolFrom.value, +toolTo.value];
      TOOL[group.dataset.control] = b.dataset.value;
      group.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      if (group.dataset.control === 'step') setSlider(from, to);
      drawAll();
    }));
    // Palivo: checkboxes, either fuel or both, never neither — the last one
    // ticked stays ticked.
    const fuelBoxes = [...document.querySelectorAll('.tool [data-fuel]')];
    fuelBoxes.forEach(box => box.addEventListener('change', () => {
      const picked = fuelBoxes.filter(b => b.checked).map(b => b.dataset.fuel);
      if (!picked.length) { box.checked = true; return; }
      TOOL.fuel = picked.length > 1 ? 'both' : picked[0];
      drawAll();
    }));
    // Členění: a checkbox, by country or the total (TOOL.split, data-option).
    const splitBox = document.querySelector('.tool [data-option="split"]');
    document.querySelectorAll('.tool [data-option]').forEach(box => box.addEventListener('change', () => {
      TOOL[box.dataset.option] = box.checked;
      drawAll();
    }));

    // What the controls add up to. Prices by country only for one fuel: a
    // country's oil and gas averaged together would mean nothing.
    const toolView = () => {
      const fuels = TOOL.fuel === 'both' ? ['crude_oil', 'natural_gas'] : [TOOL.fuel];
      const price = TOOL.metric === 'price';
      const splitAllowed = !(price && fuels.length > 1);
      const byCountry = TOOL.split && splitAllowed;
      // Years for the year view and the axis ticks, months for the month view.
      const fromIdx = +toolFrom.value, toIdx = +toolTo.value;
      let from = idxYear(fromIdx), to = idxYear(toIdx);
      if (TOOL.step === 'years') { to = Math.min(to, lastFullYear); from = Math.min(from, to - 1); }
      return {
        fuels, price, splitAllowed, byCountry, from, to, fromIdx, toIdx,
        codes: fuels.length > 1 ? BOTH : codesOf(fuels[0]),
        tiles: byCountry && TOOL.tiles,
      };
    };

    // One y-axis per metric, step and period, whatever fuel, split or option is
    // picked, so switching those never rescales the chart — only the period
    // does, zooming in on what it holds: the most any view of that metric
    // reaches in it — both fuels stacked, or for prices every line there can be
    // (per fuel, see below). `tiles` is the same for a single country, for
    // small multiples and rows.
    const toolTops = v => {
      const period = { from: v.from, to: v.to, fromIdx: v.fromIdx, toIdx: v.toIdx };
      const both = ['crude_oil', 'natural_gas'];
      const view = (fuels, byCountry) => ({ ...period, fuels, byCountry,
        price: TOOL.metric === 'price', codes: fuels.length > 1 ? BOTH : codesOf(fuels[0]) });
      const peak = (d, keys) => d3.max(d.rows, r => d3.max(keys, k => r[k]));
      // Prices are the one exception: each fuel alone keeps its own axis, in
      // its own unit (priceBasis), whatever else is picked; both fuels share
      // one, in CFG.priceUnit.both.
      if (TOOL.metric === 'price') {
        const views = TOOL.fuel === 'both' ? [view(both, false)] : [view([TOOL.fuel], true)];
        const p = d3.max(views, vv => { const d = toolData(vv); return peak(d, d.lines.map(([k]) => k)); });
        return { chart: p, tiles: p };
      }
      const total = toolData(view(both, false)), countries = toolData(view(both, true));
      return { chart: d3.max(total.rows, r => d3.sum(total.keys, k => r[k])), tiles: peak(countries, countries.keys) };
    };

    // Rows and series for a view: one row per year or month, a value per key.
    // Keys: the countries, or the fuels (both, no split), or the one fuel.
    const toolData = v => {
      const periods = TOOL.step === 'years'
        ? d3.range(v.from, v.to + 1).map(year => ({ year, x: year, key: String(year), label: String(year) }))
        : toolMonths.filter(d => mIdx(d) >= v.fromIdx && mIdx(d) <= v.toIdx).map(d =>
            ({ ...d, x: d.year + (d.month - 1) / 12, key: ymKey(d), label: `${monthLong(d.month)} ${d.year}` }));
      const rowsIn = (c, p) => TOOL.step === 'years' ? yearGroups.get(c)?.get(p.year) ?? [] : ofMonth(c, p.year, p.month);
      // Prices: one fuel in its own unit, both in CFG.priceUnit.both.
      const basis = c => priceBasis(v.fuels.length > 1 ? 'both' : c);
      let keys, colors, labels;
      if (v.byCountry) { keys = keysOf(v.codes); colors = colorsOf(v.codes); labels = labelsOf(v.codes); }
      else {
        keys = v.fuels;
        colors = Object.fromEntries(v.fuels.map(c => [c, fuelColor(c)]));
        labels = Object.fromEntries(v.fuels.map(c => [c, FUEL_NAME[c].label]));
      }
      const minMWh = TOOL.step === 'years' ? 12 * PRICE_MIN_MWH : PRICE_MIN_MWH;
      const amount = rs => TOOL.metric === 'energy'
        ? d3.sum(rs, d => toEnergy(d.mass_kg, d.commodity)) : d3.sum(rs, d => d.value_mil_czk) / 1000;
      const rows = periods.map(p => {
        const row = { ...p };
        if (v.price && v.byCountry) {
          const c = v.fuels[0], pr = prices(rowsIn(c, p), v.codes, minMWh);
          [...keys, 'prumer'].forEach(k => { row[k] = pr[k] * basis(c); });
        } else if (v.price) {
          v.fuels.forEach(c => { row[c] = prices(rowsIn(c, p), codesOf(c), minMWh).prumer * basis(c); });
        } else if (v.byCountry) {
          const g = d3.group(v.fuels.flatMap(c => rowsIn(c, p)), d => (v.codes[d.country_code] ?? OSTATNI)[0]);
          keys.forEach(k => { row[k] = amount(g.get(k) ?? []); });
        } else {
          v.fuels.forEach(c => { row[c] = amount(rowsIn(c, p)); });
        }
        return row;
      });
      // Price lines: the countries and their average — or each fuel's average.
      const lines = !v.price ? [] : [
        ...keys.map(k => [k, labels[k], colors[k]]),
        ...(v.byCountry ? [['prumer', 'Průměr', CFG.colorTotal]] : []),
      ];
      const unit = { energy: ENERGY.label, czk: 'mld. Kč',
        price: priceUnit(v.fuels.length > 1 ? 'both' : v.fuels[0]) }[TOOL.metric];
      const fmt = { energy: x => `${fokFormatNumber(x, 1)} ${unit}`, czk: czkMld,
        price: x => `${fokFormatNumber(x, 0)} ${unit}` }[TOOL.metric];
      return { rows, keys, colors, labels, lines, unit, fmt };
    };

    // Ticks: a year label every few years, so at most a dozen fit (six narrow).
    // By month, on Januaries, so only those inside the period.
    const toolTicks = (sel, v) =>
      d3.range(v.from, v.to + 1, Math.ceil((v.to - v.from + 1) / (isNarrow(sel) ? 6 : 12)))
        .filter(y => TOOL.step === 'years' || (y * 12 >= v.fromIdx && y * 12 <= v.toIdx));
    // "2017–2025", or by month "led 2017 – čvc 2026" — with `long` names, for
    // the title, "leden 2017 – červenec 2026".
    const periodText = (v, long = false) => {
      if (TOOL.step === 'years') return `${v.from}–${v.to}`;
      const month = long ? monthLong : monthShort;
      return `${month(v.fromIdx % 12 + 1)} ${idxYear(v.fromIdx)} – ${month(v.toIdx % 12 + 1)} ${idxYear(v.toIdx)}`;
    };
    // Context events, each a checkbox under Kontext: a dated line on the year
    // scale, or within its column for spending. Without labels in the tiles.
    const CONTEXT = [
      { option: 'invasion', label: 'Začátek ruské invaze na Ukrajinu', date: [2022, 2, 24] },
      // US and Israeli strikes on Iran, 28 February 2026; Iran declared the
      // strait closed on 4 March (en.wikipedia.org/wiki/2026_Strait_of_Hormuz_crisis).
      { option: 'hormuz', label: 'Začátek krize v Hormuzském průlivu', date: [2026, 2, 28] },
    ];
    // Drawn as the KPI's comparisons are (Výdaje na školství): grey, dashed
    // 4 : 1, the label in the line's grey darkened to read. With both shown,
    // the earlier's label goes a row higher, so on a narrow chart they never
    // run into each other; the chart's top margin makes the room (toolChart).
    const contextMarkers = (withLabels = true) => {
      const shown = CONTEXT.filter(e => TOOL[e.option]);
      return shown.map(({ label, date: [y, m, d] }, i) => {
        const text = withLabels ? label : '';
        const style = { color: CFG.colorCompare, dash: CFG.compareDash, width: CFG.lineWidth * 0.75,
          labelColor: readable(CFG.colorCompare), level: shown.length - 1 - i };
        const dayOfYear = (Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 864e5;
        if (TOOL.metric !== 'czk') return { ...style, x: y + dayOfYear / 365, label: text };
        return TOOL.step === 'years' ? { ...style, band: String(y), offset: dayOfYear / 365, label: text }
          : { ...style, band: `${y}-${m}`, offset: (d - 1) / new Date(y, m, 0).getDate(), label: text };
      });
    };

    // The whole chart's plot height and axis top, for the rows drawn over it.
    let toolScale;
    const toolChart = w => {
      const v = toolView();
      const { rows, keys, colors, labels, lines, unit, fmt } = toolData(v);
      splitBox.disabled = !v.splitAllowed;
      // Options show only where they apply: data-when names the view's flag.
      // Hidden, they keep their place, so the controls never shift.
      document.querySelectorAll('.tool [data-when]').forEach(el => {
        el.style.visibility = v[el.dataset.when] ? '' : 'hidden';
      });
      document.getElementById('tool-period').textContent = periodText(v);

      const sum = r => d3.sum(keys, k => r[k]);
      const top = d3.nice(0, toolTops(v).chart || 1, 5)[1];
      const ticks = toolTicks('#chart-tool', v);
      // Flush left, under the y labels; styled as the KPI cards' and the
      // columns': a third of a swatch to the label, the label in its colour.
      const legendWidth = w - theme.margins.right;
      const legend = legendLayout((v.price ? lines : keys.map(k => [k, labels[k], colors[k]]))
        .map(([, label, color]) => ({ label, color })), legendWidth, 4);
      // Room for the longest legend any view can have, so the chart keeps one
      // height whatever is picked and the page never jumps. The whole chart,
      // legend included, is CFG.toolAspect of its width (2:1) — but on a phone
      // that would leave the plot a sliver under the legend, hence the floor.
      const legendRoom = legendLayout([...Object.values(labelsOf(BOTH)), 'Průměr']
        .map(label => ({ label })), legendWidth, 4).height;
      const height = Math.max(Math.round(w * CFG.toolAspect), 360);
      // A row more over the plot for each context label past the first.
      const markerRoom = Math.max(0, CONTEXT.filter(e => TOOL[e.option]).length - 1) * fokMarkerRow(theme);
      const swatch = c => `<span style="color:${c}">■</span> `;
      // Imports also give each band's share of that year's or month's total.
      const share = (r, k) => TOOL.metric === 'energy' && keys.length > 1 && sum(r) > 0
        ? ` (${fokFormatNumber(100 * r[k] / sum(r), 0)} %)` : '';
      const tip = r => head(r.label) + (v.price
        ? lines.slice().reverse().filter(([k]) => Number.isFinite(r[k]))
            .map(([k, label, color]) => swatch(color) + plain(`${label}: ${fmt(r[k])}`)).join('<br>')
        : keys.slice().reverse().map(k => swatch(colors[k]) + plain(`${labels[k]}: ${fmt(r[k])}${share(r, k)}`)).join('<br>')
          + (keys.length > 1 ? `<div style="font-family:${theme.font};font-weight:700;margin-top:4px">Celkem: ${fmt(sum(r))}</div>` : ''));
      const common = {
        width: w, height, theme,
        margins: { bottom: theme.margins.bottom + legendRoom, top: theme.margins.top + markerRoom },
        yLabel: unit, yLabelInline: true, yFormat: x => fokFormatNumber(x, 0), legend: false, markers: contextMarkers(),
      };

      let chart;
      if (v.price) {
        chart = fokLineChart('#chart-tool', lines.flatMap(([key, series]) => rows.map(r => ({ ...r, series, val: r[key] }))), {
          ...common, multi: true, x: d => d.x, y: d => d.val,
          theme: { ...theme, colors: { ...theme.colors, categorical: lines.map(l => l[2]) } },
          xDomain: d3.extent(rows, r => r.x), xTickValues: ticks, xFormat: String, tooltipHtml: tip,
          yDomain: [0, top], yTickValues: d3.ticks(0, top, 5),
        });
      } else if (TOOL.metric === 'czk') {
        chart = fokBarChartStacked('#chart-tool', rows, {
          ...common, x: d => d.key, keys, colors, labels,
          yMax: top, yTickValues: d3.ticks(0, top, 5),
          xTickValues: TOOL.step === 'years' ? ticks.map(String) : ticks.map(y => `${y}-1`).filter(k => rows.some(r => r.key === k)),
          xFormat: k => k.split('-')[0], tooltipHtml: tip,
        });
      } else {
        chart = fokAreaChartStacked('#chart-tool', rows, {
          ...common, x: d => d.x, keys, colors, labels, totalLine: keys.length > 1 ? CFG.colorTotal : null,
          yMax: top, yTickValues: d3.ticks(0, top, 5),
          xTickValues: ticks, xFormat: String, tooltipHtml: tip,
        });
      }
      // Hidden rows aren't redrawn and would keep the download id.
      d3.selectAll('#tool-svg').attr('id', null);
      chart.svg.attr('id', 'tool-svg');
      toolScale = { plotH: height - theme.margins.top - markerRoom - theme.margins.bottom - legendRoom, top };
      drawLegend(chart.svg, legend, height - legendRoom + 4, it => readable(it.color));

      // Title and summary: on the page, and in a saved file's header.
      const metricName = { energy: 'Dovoz', czk: 'Výdaje za', price: 'Průměrná dovozní cena' }[TOOL.metric];
      // Each fuel's name in its colour, the chart's legend in itself — unless
      // the chart is split by country, whose colours are the countries'. The
      // period in regular (.chart-title-period). A saved file takes each span
      // as a run of its own weight and colour.
      const span = (text, props) => Object.assign(document.createElement('span'), { textContent: text, ...props });
      const fuelNames = v.fuels.flatMap((c, i) => {
        const name = span(FUEL_NAME[c][TOOL.metric === 'czk' ? 'acc' : 'gen']);
        if (!v.byCountry) name.style.color = readable(fuelColor(c));
        return i ? [' a ', name] : [name];
      });
      document.getElementById('tool-title').replaceChildren(`${metricName} `, ...fuelNames,
        v.byCountry ? ' podle zemí' : '', span(`, ${periodText(v, true)}`, { className: 'chart-title-period' }));
      document.getElementById('tool-summary').textContent = [
        { energy: `Energie v ${ENERGY.label} ${BASIS.of}`,
          czk: 'Celní hodnota v mld. Kč',
          price: unit === PRICE_UNITS.barrel.label ? 'Celní hodnota za barel dovezené ropy'
            : `Celní hodnota dělená energetickým obsahem dovozu${GCV ? '' : ` (${BASIS.name})`}, v ${unit}` }[TOOL.metric]
          + (TOOL.step === 'years' ? ', roční' : ', měsíční') + (v.price ? ' průměry.' : ' součty.'),
        v.tiles ? 'Každá země zvlášť, na společné ose.' : '',
        TOOL.step === 'years' && idxYear(+toolTo.value) > lastFullYear ? `Rok ${lastFullYear + 1} je neúplný, ukazují ho měsíce.` : '',
        v.price && v.byCountry ? 'Země s malým dovozem graf vynechává.' : '',
      ].filter(Boolean).join(' ');
    };

    // The same view country by country, over the whole chart's box: spending
    // as rows (countryRows), imports and prices as small multiples, four to a
    // row and up to eight, each tile's form following the metric.
    const toolTiles = () => {
      const v = toolView();
      if (!v.tiles) return;
      const { rows, keys, fmt, unit } = toolData(v);
      if (TOOL.metric === 'czk') {
        const ticks = toolTicks('#chart-tool-tiles', v);
        // The rows are one SVG, so the download buttons take them instead.
        d3.select('#tool-svg').attr('id', null);
        countryRows('#chart-tool-tiles', '#chart-tool', rows, v.codes, {
          key: d => d.key, plotH: toolScale.plotH, top: toolScale.top,
          unit, fmt, label: d => d.label, markers: contextMarkers(),
          ticks: TOOL.step === 'years' ? ticks.map(String) : ticks.map(y => `${y}-1`).filter(k => rows.some(r => r.key === k)),
          tickFormat: k => k.split('-')[0],
        }).attr('id', 'tool-svg');
        return;
      }
      const yTop = d3.nice(0, toolTops(v).tiles || 1, 3)[1];
      const ends = rows.length ? [rows[0], rows[rows.length - 1]] : [];
      d3.select('#tool-svg').attr('id', null);
      tiles('#chart-tool-tiles', '#chart-tool', v.codes, (node, k, t) => {
        fokLineChart(node, rows, {
          width: t.width, height: t.height, margins: t.margins, yFormat: t.yFormat,
          yLabel: t.first ? unit : undefined, markers: contextMarkers(false),
          tooltipHtml: r => head(r.label) + plain(`${t.label}: ${fmt(r[k])}`),
          x: d => d.x, y: d => d[k],
          area: TOOL.metric === 'energy', areaOpacity: CFG.areaOpacity,
          theme: lineTheme(t.color),
          yDomain: [0, yTop], yTickValues: [0, yTop],
          xDomain: d3.extent(rows, r => r.x), xTickValues: ends.map(r => r.year), xFormat: String,
        });
        // The two year labels sit on the plot's edges; anchored inward, they
        // stay inside the tile instead of running into the next one.
        d3.select(node).selectAll('.fok-axis--x .tick text')
          .attr('text-anchor', (_, i, all) => i === 0 ? 'start' : i === all.length - 1 ? 'end' : 'middle');
      }).attr('id', 'tool-svg');
    };

    // "Stáhnout: CSV" under the explorer: what it shows, as a table — a row
    // per year or month, a column per series, in the chart's unit. Czech
    // conventions, as Czech Excel opens it: ";" between fields, a decimal
    // comma, and a BOM so the diacritics read as UTF-8.
    document.getElementById('tool-csv').addEventListener('click', () => {
      const v = toolView();
      const { rows, keys, labels, lines, unit } = toolData(v);
      const byMonth = TOOL.step === 'months';
      const series = v.price ? lines.map(([k, label]) => [k, label]) : keys.map(k => [k, labels[k]]);
      const table = [
        ['rok', ...(byMonth ? ['měsíc'] : []), ...series.map(([, label]) => `${label} [${unit}]`)],
        ...rows.map(r => [r.year, ...(byMonth ? [r.month] : []),
          ...series.map(([k]) => Number.isFinite(r[k]) ? String(+r[k].toFixed(3)).replace('.', ',') : '')]),
      ];
      const blob = new Blob(['\ufeff' + d3.dsvFormat(';').formatRows(table)], { type: 'text/csv;charset=utf-8' });
      const a = Object.assign(document.createElement('a'),
        { href: URL.createObjectURL(blob), download: 'dovoz-fosilnich-paliv.csv' });
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href));
    });

    // Each entry draws into its container at that container's own width;
    // hidden containers measure 0 and are skipped.
    // The KPI cards' legends: above the chart, square swatches, each label in
    // its swatch's colour (darkened where it would not read on white) and a
    // third of a swatch away from it.
    const kpiLegend = { position: 'top', radius: 0, gap: 12 / 3, labelColor: it => readable(it.color) };
    // Above a KPI chart's plot as much white as under its year labels: 20 px
    // of margin less the top label's upper half (~5 px) plus the card's 16 px
    // rule gap, against the 40 px bottom margin less the labels (~25 px) plus
    // the card's 16 px padding — about 31 px each.
    const kpiMargins = { top: 20 };
    const kpiHeight = (grow = kpiGrow) => kpiMargins.top + CFG.kpiPlotHeight + theme.margins.bottom + grow;
    // A KPI chart with no legend above it (spending, GDP) takes that row as
    // well: it is drawn this much taller, the height of the legend row the
    // other cards share — measured after each draw, see levelKpi.
    let kpiGrow = 0;

    const charts = () => [
      ['#chart-celkem-czk', w => {
        const chart = fokBarChartStacked('#chart-celkem-czk',
          payments.map(d => ({ year: String(d.year), ropa: d.ropa_czk_mld, plyn: d.plyn_czk_mld })), {
          x: d => d.year,
          keys: ['ropa', 'plyn'],
          colors: { ropa: CFG.colorRopa, plyn: CFG.colorPlyn },
          labels: { ropa: 'Ropa', plyn: 'Zemní plyn' },
          yLabel: 'mld. Kč', yLabelInline: true,
          width: w, height: kpiHeight(), theme, margins: kpiMargins,
          xTickValues: xTicks.map(String),
          yMax: 400, yTickValues: d3.range(0, 401, 100), yGridValues: d3.range(0, 401, 50),
          legend: false,
          yFormat: v => fokFormatNumber(v, 0),
          // The whole year whichever band is hovered: the sum, then the two
          // fuels in stack order, top first.
          tooltipHtml: raw => head(raw.year)
            + `<div style="font-family:${theme.font};font-weight:700">Celkem: ${czkMld(raw.ropa + raw.plyn)}</div>`
            + [['plyn', 'Zemní plyn', CFG.colorPlyn], ['ropa', 'Ropa', CFG.colorRopa]].map(([k, label, color]) =>
                `<span style="color:${color}">■</span> ` + plain(`${label}: ${czkMld(raw[k])}`)).join('<br>'),
        });
        // The legend over the plot's empty top left, its corner at 320 mld. Kč
        // and 2017.3 (a year a band), plyn over ropa as they stack.
        const x = chart.xScale, year = 2017.3;
        fokLegendSvg(chart.g, [
          { label: 'Zemní plyn', color: CFG.colorPlyn },
          { label: 'Ropa', color: CFG.colorRopa },
        ], {
          x: x(String(Math.floor(year))) + x.bandwidth() / 2 + (year % 1) * x.step(),
          y: chart.yScale(320), labelColor: kpiLegend.labelColor,
        }, theme);
        return chart;
      }],

      ['#chart-celkem-hdp', w => {
        // Comparisons as faint lines for scale — listed first, so they are
        // drawn behind the imports' line.
        const lines = [
          ['Výdaje na školství (rozpočet MŠMT)', 'msmt_pct', CFG.colorCompare],
          ['Výdaje na dopravní infrastrukturu (rozpočet SFDI)', 'sfdi_pct', CFG.colorCompare],
          ['Ropa a zemní plyn', 'gdp_share_pct', CFG.colorGdp],
        ];
        // Labels on the lines instead of a legend, each where its line has
        // room: imports right of their 2022 peak, level with its top; MŠMT
        // over its line on the left, its halo cutting the line; SFDI under its
        // line on the right (above it runs the imports'). x in years, y in
        // % HDP: the last row's baseline.
        const lineLabels = {
          'Ropa a zemní plyn': { x: 2022.3, y: 4.85, lines: ['**Ropa**', '**a zemní plyn**'] },
          'Výdaje na školství (rozpočet MŠMT)': { x: 2017.45, y: 3.25, lines: ['Výdaje', 'na školství'] },
          'Výdaje na dopravní infrastrukturu (rozpočet SFDI)':
            { x: 2024.35, y: 1.22, anchor: 'end', lines: ['Výdaje na dopravní', 'infrastrukturu'] },
        };
        return fokLineChart('#chart-celkem-hdp',
          lines.flatMap(([series, field]) => payments.map(d => ({ ...d, series, pct: d[field] }))), {
            multi: true, x: d => d.year, y: d => d.pct, legend: false,
            dashed: series => series !== 'Ropa a zemní plyn', dashArray: CFG.compareDash,
            lineLabels: Object.fromEntries(lines.map(([series, , color]) =>
              [series, { ...lineLabels[series], color: readable(color) }])),
            yLabel: '% HDP', yLabelInline: true,
            width: w, height: kpiHeight(), margins: kpiMargins,
            theme: { ...theme, colors: { ...theme.colors, categorical: lines.map(l => l[2]) } },
            xTickValues: xTicks, xFormat: String,
            yDomain: [0, 5], yTickValues: d3.range(0, 6), yFormat: v => fokFormatNumber(v, 0),
            tooltipHtml: d => head(d.year) + lines.slice().reverse().map(([series, field]) =>
              plain(`${series}: ${fokFormatNumber(d[field], 1)} % HDP`)).join('<br>'),
          });
      }],

      // The axis runs to the series' peak (2019) rounded up, labelled and
      // gridded on round steps (energyAxis).
      // All five countries in one line above the chart, at 11 px: their
      // swatches and names take ~299 of the card's 321 px, so the items spread
      // over the full width (at least 4 px apart) and wrap only on a narrower
      // card. With a legend this chart keeps its height; the other two grow
      // into its row (levelKpi).
      ['#chart-celkem-energie', energy('#chart-celkem-energie', energie, FOSIL, {
        ...energyAxis(d3.nice(0, d3.max(energie, totalE), 4)[1]),
        yLabelInline: true, margins: kpiMargins, height: kpiHeight(0),
        legendOptions: { ...kpiLegend, fontSize: 11, itemSpacing: 4, justify: 'space-between' },
      })],

      ['#chart-ropa-czk',     money('#chart-ropa-czk', 'crude_oil', ropa.czk, CFG.colorRopa)],
      ['#chart-ropa-energie', fuelEnergy('#chart-ropa-energie', ropa.energie, ROPA,
        { arrows: russiaEndNote('#chart-ropa-energie', 0.95 * maxE) })],
      // The 2022 peak, pointed out (fokArrow): from the text right of the bar
      // down onto its top.
      ['#chart-plyn-czk',     money('#chart-plyn-czk', 'natural_gas', plyn.czk, CFG.colorPlyn, {
        arrows: arrowsFor('#chart-plyn-czk', {
          target: [2022, plyn.czk.find(d => d.year === 2022).czk_mld],
          textEnd: [2022.8, 270],
        }),
      })],
      ['#chart-plyn-energie', fuelEnergy('#chart-plyn-energie', plyn.energie, PLYN,
        { arrows: russiaEndNote('#chart-plyn-energie', 0.95 * maxE) })],
      ['#chart-ropa-czk-mesice',     spendMonths('#chart-ropa-czk-mesice', 'crude_oil', CFG.colorRopa,
        { arrows: hormuzArrow('#chart-ropa-czk-mesice', 'crude_oil') })],
      ['#chart-plyn-czk-mesice',     spendMonths('#chart-plyn-czk-mesice', 'natural_gas', CFG.colorPlyn)],
      ['#chart-ropa-energie-mesice', importMonths('#chart-ropa-energie-mesice', 'crude_oil', ROPA)],
      ['#chart-plyn-energie-mesice', importMonths('#chart-plyn-energie-mesice', 'natural_gas', PLYN,
        { arrows: refillArrow('#chart-plyn-energie-mesice') })],
      ['#chart-ropa-cena',           price('#chart-ropa-cena', 'years', 'crude_oil', CFG.colorRopa)],
      ['#chart-plyn-cena',           price('#chart-plyn-cena', 'years', 'natural_gas', CFG.colorPlyn)],
      ['#chart-ropa-cena-mesice',    price('#chart-ropa-cena-mesice', 'months', 'crude_oil', CFG.colorRopa)],
      ['#chart-plyn-cena-mesice',    price('#chart-plyn-cena-mesice', 'months', 'natural_gas', CFG.colorPlyn)],
      ['#chart-tool',         toolChart],
      ['#chart-tool-tiles',   toolTiles],
    ];

    // The KPI cards share their rows (subgrid, see #main-charts in the SCSS); a
    // chart with no legend above it spans the legend row and its own. Drawn at
    // the legend row's height more, its time axis stays level with the
    // others'. The legend is measured, not its row, which the taller chart
    // could itself have stretched. Stacked on a phone, a card has no legend
    // row to take. Redraws only when the height has changed.
    const levelKpi = () => {
      const boxes = ['#chart-celkem-czk', '#chart-celkem-hdp', '#chart-celkem-energie']
        .map(sel => document.querySelector(sel));
      const sameRow = new Set(boxes.map(b => Math.round(b.getBoundingClientRect().top))).size === 1;
      const legends = boxes.map(b => b.querySelector(':scope > .fok-legend')).filter(Boolean);
      const grow = sameRow ? Math.round(d3.max(legends, l =>
        l.getBoundingClientRect().height + parseFloat(getComputedStyle(l).marginBottom)) ?? 0) : 0;
      if (grow === kpiGrow) return;
      kpiGrow = grow;
      charts().filter(([sel]) => sel === '#chart-celkem-czk' || sel === '#chart-celkem-hdp')
        .forEach(([sel, draw]) => draw(Math.round(document.querySelector(sel).getBoundingClientRect().width)));
    };

    const drawAll = () => {
      // Before measuring: these decide which charts show at all.
      document.body.classList.toggle('tiles-toolTiles', toolView().tiles);
      document.querySelectorAll('.fuel-plot').forEach(p => { p.style.minHeight = ''; });
      document.body.classList.toggle('span-long', span === 'long');
      document.body.classList.toggle('span-recent', span === 'recent');
      charts().forEach(([sel, draw]) => {
        const w = Math.round(document.querySelector(sel).getBoundingClientRect().width);
        if (w > 0) draw(w);
      });
      levelKpi();
    };
    // The collapsed explorer has no width, so drawAll skips it; draw it once
    // opened.
    $('#nastroj-collapse').on('shown.bs.collapse', drawAll);
    // ponytail: any control redraws every chart, not just its own — cheap here.
    drawAll();
    // The left margins are measured in Roboto: once it loads, again.
    document.fonts.ready.then(drawAll);
    // A font arriving after the last draw can rewrap a KPI legend; the row's
    // size changes with it, and levelKpi follows.
    new ResizeObserver(levelKpi).observe(document.getElementById('main-charts'));

    // Redrawing is the only way to resize: the width is baked into the viewBox.
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawAll, 200);
    });
  }
});
