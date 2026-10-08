/**
 * dovoz-fosilnich-paliv.js — charts for
 * collections/_studies/2026-interaktivni-prehled-dovoz-fosilnich-paliv.md
 *
 * Reads the ČSÚ exports in assets-local/files/dovoz-fosilnich-paliv/ straight
 * from the browser and aggregates them here, so the CSVs are the only copy of
 * the numbers — drop a newer export in and the page follows.
 *
 * Charts are the shared FoK library (assets-local/charts/), whose `width` option
 * is the viewBox width. Per ai-prototyping-guidelines.md that has to match the
 * width the container is actually rendered at, or the SVG scales and every label
 * scales with it — so we measure the container instead of hardcoding a number.
 * That is also what keeps the text readable once the panels stack on a phone.
 */

// The look of the charts, in one place. With ?dev=1 the tuning sidebar
// (dovoz-dev-sidebar.js) writes into this object and calls DOVOZ_REDRAW, so it
// lives outside the DOMContentLoaded handler: the sidebar reads it on load.
window.DOVOZ_CFG = {
  // The two fuels, wherever they are drawn side by side.
  colorRopa: '#813751',
  colorPlyn: '#d4a1a1',
  colorTotal: '#3e3e4c',   // the line along the top of every by-country stack
  showDefense: true,       // GDP chart: defence spending as a faint line, for scale
  gdpFirst: false,         // KPI row: the GDP share first, ahead of the spending
  colorDefense: '#d0d9e1',
  showMsmt: false,         // GDP chart: the education ministry's spending (MŠMT)
  colorMsmt: '#bcd3c1',
  showSfdi: false,         // GDP chart: the transport infrastructure fund's (SFDI)
  colorSfdi: '#e2cfae',
  // Suppliers, keyed by the slugs in the country tables below, so a country
  // reads the same in every chart. Grey is reserved for Ostatní, so no named
  // band can be mistaken for the leftovers.
  rusko: '#eb4c42',
  azerbajdzan: '#ffa578',
  kazachstan: '#ffd282',
  norsko: '#1671ab',
  saudska_arabie: '#c7a671',
  usa: '#92cbc1',
  nemecko: '#8aa0b5',
  ostatni: '#c7ccd1',
  chartHeight: 260,        // px, every chart
  chartFraction: 0.75,     // fuel columns, desktop: a chart's share of its column's width
  fuelBoxed: false,        // fuel columns drawn as boxes
  fuelBoxColored: false,   // …with the border in the fuel's colour
  barPadding: 0.2,         // gap between bars (0-1)
  lineWidth: 2,            // line charts
  areaOpacity: 0.6,        // fill under the small multiples' lines
  showBenchmarks: false,   // price charts: Brent / TTF exchange prices, for reference
  colorBenchmark: '#7a8696',
  gasGCV: false,           // gas prices per MWh of gross calorific value, as gas is quoted
  exploreYMax: 40,         // PJ, top of the monthly import axes unless a month goes higher
  toolAspect: 0.5,         // the explorer's chart, legend included: height ÷ width (2:1)
  titleSize: 16,           // chart titles drawn by the library
  axisSize: 12,            // axis ticks, units and legends
  axisTextColor: '#53616e',
  gridColor: '#e8eef6',
};

document.addEventListener('DOMContentLoaded', () => {
  const CFG = window.DOVOZ_CFG;
  const DATA = '/assets-local/files/dovoz-fosilnich-paliv';

  // The source runs 1999–2026, but 2026 is a part-year (its monthly companion
  // stops at month 7) and has no GDP figure, so it would read as a collapse in
  // imports. Widen this once the year closes.
  const YEAR_FROM = 2017;
  const YEAR_TO   = 2025;

  // Which suppliers get a band of their own, in stack order, bottom first;
  // every other country code falls into Ostatní — including Eurostat's
  // "country not specified" codes (QU, QV). Colours are in CFG, by slug.
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
    DE: ['nemecko',  'Německo'],
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

  // Net calorific values in TJ/Gg, which is the same number as GJ per tonne.
  // Mass is the only energy-bearing column in the customs data, so this is what
  // puts a tonne of crude and a tonne of gas on one scale. Gas is the IPCC 2006
  // default (vol. 2, table 1.2); crude is 42.6 rather than that table's 42.3.
  const NCV = { crude_oil: 42.6, natural_gas: 48.0 };
  const toPJ = (kg, commodity) => kg * NCV[commodity] * 1e-9;

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
  // The same export cut by month, for the exploration.
  const monthlyRow = d => ({ ...importRow(d), month: +d.month });

  const years = d3.range(YEAR_FROM, YEAR_TO + 1);
  const inWindow = d => d.year >= YEAR_FROM && d.year <= YEAR_TO;

  /** What one commodity cost per year, in mld. Kč, for the given years. */
  function spending(rows, commodity, yrs) {
    const byYear = d3.rollup(rows.filter(d => d.commodity === commodity),
      rs => d3.sum(rs, d => d.value_mil_czk) / 1000, d => d.year);
    return yrs.map(year => ({ year, czk_mld: byYear.get(year) ?? 0 }));
  }

  /** Imports in PJ, split by country of origin. The result also carries the
   *  two fuels' own totals: the bands answer "from where", the totals answer
   *  "how much of which", and the tooltip shows both. The chart only reads the
   *  country keys, so the extra fields are ignored there. */
  function byCountry(rows, codes) {
    const out = Object.fromEntries(keysOf(codes).map(k => [k, 0]));
    out.ropa_pj = 0;
    out.plyn_pj = 0;
    rows.forEach(d => {
      const pj = toPJ(d.mass_kg, d.commodity);
      out[(codes[d.country_code] ?? OSTATNI)[0]] += pj;
      if (d.commodity === 'crude_oil') out.ropa_pj += pj;
      else out.plyn_pj += pj;
    });
    return out;
  }

  /** Spending in mld. Kč, split the same way. */
  function czkByCountry(rows, codes) {
    const out = Object.fromEntries(keysOf(codes).map(k => [k, 0]));
    rows.forEach(d => { out[(codes[d.country_code] ?? OSTATNI)[0]] += d.value_mil_czk / 1000; });
    return out;
  }

  /** Average import price in Kč/MWh: what was paid over the energy that came,
   *  overall (`prumer`) and per country. Under `minMWh` it is NaN — a small
   *  consignment's unit value says nothing about a price — which the line
   *  chart draws as a gap. Customs value at the border, not an exchange price. */
  const toMWh = d => d.mass_kg * NCV[d.commodity] / 3600;
  function prices(rows, codes, minMWh) {
    const price = rs => {
      const mwh = d3.sum(rs, toMWh);
      return mwh >= minMWh ? d3.sum(rs, d => d.value_mil_czk) * 1e6 / mwh : NaN;
    };
    const byKey = d3.group(rows, d => (codes[d.country_code] ?? OSTATNI)[0]);
    return { prumer: price(rows), ...Object.fromEntries(keysOf(codes).map(k => [k, price(byKey.get(k) ?? [])])) };
  }

  /** PJ by country, per year of the window. */
  function energyByCountry(rows, codes) {
    const byYear = d3.group(rows.filter(inWindow), d => d.year);
    return years.map(year => ({ year, ...byCountry(byYear.get(year) ?? [], codes) }));
  }

  Promise.all([
    d3.csv(`${DATA}/imports-annual.csv`, importRow),
    d3.csv(`${DATA}/imports-monthly.csv`, monthlyRow),
    d3.csv(`${DATA}/gdp.csv`, d => [+d.year, +d.value_mil_czk]),
    d3.csv(`${DATA}/defense.csv`, d => [+d.year, +d.total_mld_czk]),
    d3.csv(`${DATA}/msmt.csv`, d => [+d.year, +d.total_mld_czk]),
    d3.csv(`${DATA}/sfdi.csv`, d => [+d.year, +d.total_mld_czk]),
    d3.csv(`${DATA}/benchmarks-monthly.csv`, d => ({
      year: +d.year, month: +d.month, brent: +d.brent_usd_bbl, ttf: +d.ttf_usd_mmbtu, usd: +d.usd_czk,
    })),
  ]).then(([imports, monthly, gdp, defense, msmt, sfdi, benchmarks]) => {
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
    const defenseByYear = new Map(defense);
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
        // Comparisons over the same GDP, so every line shares a base: defence,
        // the education ministry (MŠMT) and the transport infrastructure fund (SFDI).
        defense_pct: 100 * defenseByYear.get(year) * 1000 / gdpByYear.get(year),
        msmt_pct: 100 * msmtByYear.get(year) * 1000 / gdpByYear.get(year),
        sfdi_pct: 100 * sfdiByYear.get(year) * 1000 / gdpByYear.get(year),
      };
    });

    // Catches a malformed drop-in export: every year needs a GDP figure to
    // divide by.
    years.filter(y => !gdpByYear.has(y))
      .forEach(y => console.warn(`dovoz: no GDP for ${y}`));

    // The two import files are one export. Replace one without the other and
    // the exploration would quietly disagree with the charts above it.
    const massBy = rows => d3.rollup(rows, rs => d3.sum(rs, d => d.mass_kg),
      d => `${d.commodity} ${d.year}`);
    const [annualKg, monthlyKg] = [massBy(imports), massBy(monthly)];
    new Set([...annualKg.keys(), ...monthlyKg.keys()]).forEach(key => {
      const [a, m] = [annualKg.get(key) ?? 0, monthlyKg.get(key) ?? 0];
      if (Math.abs(a - m) > 1e-3 * Math.max(a, m))
        console.warn(`dovoz: monthly and annual exports disagree for ${key}`);
    });

    render({ ropa, plyn, payments, monthly, imports, benchmarks, toNewest, energie: energyByCountry(imports, FOSIL) });
  }).catch(err => console.error('dovoz: data failed to load', err));

  function render({ ropa, plyn, payments, monthly, imports, benchmarks, toNewest, energie }) {
    const lastOf = rows => rows[rows.length - 1];
    const totalPJ = row => row.ropa_pj + row.plyn_pj;
    const setText = (id, text) => { document.getElementById(id).textContent = text; };

    // Every KPI speaks for the last complete year.
    document.querySelectorAll('.kpi-label')
      .forEach(el => { el.textContent += ` (${YEAR_TO})`; });

    setText('kpi-total',  fokFormatNumber(lastOf(payments).total_czk_mld, 1) + ' mld. Kč');
    setText('kpi-gdp',    fokFormatNumber(lastOf(payments).gdp_share_pct, 1) + ' % HDP');
    setText('kpi-energy', fokFormatNumber(totalPJ(lastOf(energie)), 0) + ' PJ');

    // Rebuilt from CFG on every draw, so the tuning sidebar's changes show.
    let theme;
    const makeTheme = () => ({
      ...FoKTheme,
      colors:   { ...FoKTheme.colors, grey: CFG.axisTextColor },
      fontSize: { ...FoKTheme.fontSize, title: CFG.titleSize, axisLabel: CFG.axisSize },
      axis:     { ...FoKTheme.axis, gridColor: CFG.gridColor },
      bar:      { ...FoKTheme.bar, padding: CFG.barPadding },
      line:     { ...FoKTheme.line, strokeWidth: CFG.lineWidth },
    });
    // A line chart takes its colour from categorical[0], not from colors.primary.
    const lineTheme = c => ({
      ...theme,
      colors: { ...theme.colors, categorical: [c, ...theme.colors.categorical.slice(1)] },
    });

    // Every other year, so the labels never collide once the panels are narrow.
    const xTicks = years.filter((_, i) => i % 2 === 0);
    const czkMld = d => `${fokFormatNumber(d, 1)} mld. Kč`;
    const pj     = d => `${fokFormatNumber(d, 1)} PJ`;
    const head   = y => `<strong style="font-family:${theme.font}">${y}</strong><br>`;
    const plain  = s => `<span style="font-family:${theme.font}">${s}</span>`;

    // Ropa and plyn are meant to be read against each other, so their money and
    // energy charts share one scale each rather than each picking its own.
    const maxCzk = Math.ceil(d3.max(ropa.czk.concat(plyn.czk), d => d.czk_mld) / 50) * 50;
    const maxPJ  = Math.ceil(d3.max(ropa.energie.concat(plyn.energie), totalPJ) / 100) * 100;

    // The fuel columns' yearly charts run to the newest year in the export.
    // A part-year is a hatched, half-opaque bar (spending) or empty axis
    // (imports), and
    // its tooltip says how far it goes. Every year is labelled where it fits;
    // narrow, every other one, counted back from the newest.
    const isPartYear = year => lastMonth.get(year) < 12;
    const yearName = year => isPartYear(year) ? `${year} (leden–${monthLong(lastMonth.get(year))})` : year;
    const colTicks = sel => d3.range(lastYear, YEAR_FROM - 1, isNarrow(sel) ? -2 : -1).reverse();

    const money = (sel, rows, color) => w => fokBarChart(sel, rows, {
      x: d => String(d.year), y: d => d.czk_mld,
      color, partial: d => isPartYear(d.year), yLabel: 'mld. Kč',
      width: w, height: CFG.chartHeight, theme,
      yDomain: [0, maxCzk], yTicks: 4,
      xTickValues: colTicks(sel).map(String),
      yFormat: v => fokFormatNumber(v, 0),
      tooltipHtml: d => head(yearName(d.year)) + plain(czkMld(d.czk_mld)),
    });

    // Stacked by country of origin, with the total drawn on top. The library's
    // own tooltip lists the bands but not what they add up to, which is what
    // the line is for. Same shape as the default — topmost band first — then,
    // where both fuels are stacked together, the split the stack hides, because
    // the bands answer "from where" and say nothing about which fuel. `when`
    // names the row: a year here, a month in the exploration. With `share`
    // the bands are the chart's percentages; the total stays in PJ.
    const bandsTip = (codes, when, share = false) => {
      const keys = keysOf(codes), colors = colorsOf(codes), labels = labelsOf(codes);
      return row => head(when(row))
        + keys.slice().reverse().map(k =>
            `<span style="color:${colors[k]}">■</span> `
            + plain(`${labels[k]}: ${share ? fokFormatNumber(row[k], 0) + ' %' : pj(row[k])}`)).join('<br>')
        + `<div style="font-family:${theme.font};margin-top:4px;padding-top:4px;`
        + `border-top:1px solid ${theme.colors.gridLine}">`
        + (codes === FOSIL ? `Ropa: ${pj(row.ropa_pj)}<br>Zemní plyn: ${pj(row.plyn_pj)}` : '')
        + `<div style="font-weight:700">Celkem: ${pj(totalPJ(row))}</div>`
        + `</div>`;
    };
    const energy = (sel, rows, codes, extra) => w => fokAreaChartStacked(sel, rows, {
      x: d => d.year, keys: keysOf(codes), colors: colorsOf(codes), labels: labelsOf(codes),
      yLabel: 'PJ', totalLine: CFG.colorTotal,
      width: w, height: CFG.chartHeight, theme, legend: true,
      xTickValues: xTicks, xFormat: String,
      yFormat: v => fokFormatNumber(v, 0),
      tooltipHtml: bandsTip(codes, row => row.year),
      ...extra,
    });
    const fuelTicks = d3.range(0, maxPJ + 1, 100);
    // With toggles.share, each year's imports as 100 %: the split by country
    // without the swings in volume. The total line would sit on the top edge.
    const fuelEnergy = (sel, rows, codes) => energy(sel, rows, codes, {
      yMax: maxPJ, yTickValues: fuelTicks,
      xDomain: [YEAR_FROM, lastYear], xTickValues: colTicks(sel),
      ...(toggles.share && {
        proportional: true, totalLine: null, yLabel: '% dovozu', yTickValues: undefined,
        yFormat: v => `${v} %`, tooltipHtml: bandsTip(codes, row => row.year, true),
      }),
    });

    // Reader toggles above the column charts. Each kind is one setting for both
    // fuels — every checkbox of a kind follows — so the columns stay comparable
    // row by row.
    const toggles = { yearSpendByCountry: false, minis: false, share: false, spendByCountry: false, priceByCountry: false };

    // The span selector by the fuel headings: all charts, the long-term ones
    // or the latest 36 months'. Both headings carry one and stay in step.
    let span = 'all';
    document.querySelectorAll('[data-span-select] button').forEach(b => b.addEventListener('click', () => {
      span = b.dataset.value;
      document.querySelectorAll('[data-span-select] button')
        .forEach(x => x.setAttribute('aria-pressed', String(x.dataset.value === span)));
      drawAll();
    }));
    document.querySelectorAll('[data-toggle]').forEach(box => box.addEventListener('change', () => {
      toggles[box.dataset.toggle] = box.checked;
      document.querySelectorAll(`[data-toggle="${box.dataset.toggle}"]`)
        .forEach(b => { b.checked = box.checked; });
      drawAll();
    }));

    // Small multiples, behind the "zvlášť po zemích" toggles: one small chart
    // per country, so a band a stack squeezes between others reads on its own.
    // They are drawn over the whole chart's own box, which stays laid out
    // (hidden, not removed), so switching never changes the page's height. At
    // most six, three to a row in two rows — ropa's seven bands lose Ostatní —
    // at the height of the shorter of the two fuels' boxes, so the tiles match
    // across the columns. One scale for every country of both fuels; only the
    // first tile of a row labels it. `drawTile(node, key, tile)` draws one.
    // Left margins of the first tile and the rest. The grid's first column is
    // their difference less the column gap, so every plot is equally wide:
    // keep `grid-template-columns` in .mini-grid in step.
    const MINI_AXIS = 36, MINI_EDGE = 6;
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
    // `perRow` and `max` default to the columns' three and six; the explorer,
    // a full row wide, takes four and eight. Over `max`, Ostatní goes first.
    const tiles = (sel, boxSels, codes, drawTile, { perRow = 3, max = 6 } = {}) => {
      const grid = d3.select(sel).html('');
      let keys = keysOf(codes);
      if (keys.length > max) keys = keys.filter(k => k !== OSTATNI[0]).slice(0, max);
      grid.style('height', d3.min(boxSels, s => document.querySelector(s).getBoundingClientRect().height) + 'px')
        .style('grid-template-columns', `${MINI_AXIS - MINI_EDGE - 12}px repeat(${perRow}, minmax(0, 1fr))`)
        .style('grid-template-rows', `repeat(${Math.ceil(keys.length / perRow)}, minmax(0, 1fr))`);
      const colors = colorsOf(codes), labels = labelsOf(codes);
      keys.forEach((k, i) => {
        const first = i % perRow === 0;
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
    };

    // "Zvlášť po zemích" for columns: one row per country, stacked in a single
    // chart over the whole chart's box, which keeps its size — the biggest
    // supplier at the bottom, Ostatní on top (it is no country). Every row
    // stands on its own zero on one shared scale (`o.top`), so the bars compare
    // across rows, and the periods line up down the shared x axis. The y axis
    // shrinks to one note of that scale; the rows are named instead.
    const countryRows = (sel, boxSels, data, codes, o) => {
      const box = d3.select(sel).html('')
        .style('grid-template-columns', '1fr').style('grid-template-rows', '1fr');
      const H = Math.round(d3.min(boxSels, s => document.querySelector(s).getBoundingClientRect().height));
      box.style('height', H + 'px');
      const W = Math.round(box.node().getBoundingClientRect().width);
      const colors = colorsOf(codes), labels = labelsOf(codes);
      const total = k => d3.sum(data, d => d[k]);
      const keys = keysOf(codes).filter(k => k !== OSTATNI[0])
        .sort((a, b) => total(b) - total(a)).concat(OSTATNI[0]);
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = `600 ${theme.fontSize.axisLabel}px Roboto, sans-serif`;
      const m = { top: 24, right: 8, bottom: 32, left: Math.ceil(d3.max(keys, k => ctx.measureText(labels[k]).width)) + 12 };
      const inner = { w: W - m.left - m.right, h: H - m.top - m.bottom };
      const rowH = inner.h / keys.length;
      const x = d3.scaleBand(data.map(o.key), [0, inner.w])
        .paddingInner(theme.bar.padding).paddingOuter(theme.bar.padding / 2);
      const y = d3.scaleLinear([0, o.top], [0, rowH * 0.9]);
      const svg = fokResponsiveSVG(box, `0 0 ${W} ${H}`);
      const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);
      g.append('text').attr('class', 'fok-axis-label')
        .attr('x', -m.left + 4).attr('y', -10)
        .attr('fill', theme.colors.grey).attr('font-family', theme.font).attr('font-size', theme.fontSize.axisLabel)
        .text(`Řádek každé země: 0–${fokFormatNumber(o.top, 0)} ${o.unit}`);
      const tip = fokTooltip(theme);
      keys.forEach((k, i) => {
        const row = g.append('g').attr('transform', `translate(0,${rowH * (keys.length - i)})`);
        row.append('line').attr('x2', inner.w).attr('stroke', theme.axis.gridColor);
        row.append('text').attr('x', -8).attr('y', -2).attr('text-anchor', 'end')
          .attr('fill', readable(colors[k])).attr('font-family', theme.font)
          .attr('font-size', theme.fontSize.axisLabel).attr('font-weight', 600).text(labels[k]);
        row.selectAll('rect').data(data).join('rect')
          .attr('x', d => x(o.key(d))).attr('width', x.bandwidth())
          .attr('y', d => -y(d[k])).attr('height', d => y(d[k]))
          .attr('fill', d => o.partial?.(d) ? fokHatch(svg, colors[k]) : colors[k])
          .attr('opacity', d => o.partial?.(d) ? 0.5 : 1)
          .on('mouseover', (event, d) => { tip.show(head(o.label(d)) + plain(`${labels[k]}: ${o.fmt(d[k])}`)); tip.move(event); })
          .on('mousemove', event => tip.move(event))
          .on('mouseleave', () => tip.hide());
      });
      g.append('g').attr('class', 'fok-axis fok-axis--x').attr('transform', `translate(0,${inner.h})`)
        .call(fokAxisX(x, { tickValues: o.ticks, tickFormat: o.tickFormat }, theme));
      fokMarkers(g, o.markers, mk => x(mk.band) == null ? null : x(mk.band) + (mk.offset ?? 0.5) * x.bandwidth(), inner, theme);
      return svg;
    };

    // Dovoz: an area per country, in PJ or, with the 100 % toggle, as shares
    // of each year's imports.
    const miniMax = Math.ceil(d3.max([[ropa.energie, ROPA], [plyn.energie, PLYN]],
      ([rows, codes]) => d3.max(rows, r => d3.max(keysOf(codes), k => r[k]))) / 50) * 50;
    const minis = (sel, rows, codes) => () => {
      const share = toggles.share;
      const top = share ? 100 : miniMax;
      const value = share ? (d, k) => 100 * d[k] / totalPJ(d) : (d, k) => d[k];
      const fmt = share ? v => `${fokFormatNumber(v, 0)} %` : pj;
      tiles(sel, ['#chart-ropa-energie', '#chart-plyn-energie'], codes, (node, k, t) => {
        fokLineChart(node, rows, {
          x: d => d.year, y: d => value(d, k), area: true, areaOpacity: CFG.areaOpacity,
          yLabel: t.first ? (share ? '%' : 'PJ') : undefined,
          width: t.width, height: t.height, margins: t.margins,
          theme: lineTheme(t.color),
          yDomain: [0, top], yTickValues: [0, top], yFormat: t.yFormat,
          xDomain: [YEAR_FROM, lastYear], xTickValues: [YEAR_FROM, lastYear], xFormat: String,
          tooltipHtml: d => head(d.year) + plain(`${t.label}: ${fmt(value(d, k))}`),
        });
        // The two year labels sit on the plot's edges; anchored inward, they
        // stay inside the tile instead of running into the next one.
        d3.select(node).selectAll('.fok-axis--x .tick text')
          .attr('text-anchor', (_, i, all) => i === 0 ? 'start' : i === all.length - 1 ? 'end' : 'middle');
      });
    };

    // Výdaje by year, per country: a row per country (countryRows), the
    // part-year hatched as in the whole chart. One scale for both fuels.
    const yearCzk = c => toNewest.map(year => ({ year,
      ...czkByCountry(imports.filter(d => d.commodity === c && d.year === year), c === 'crude_oil' ? ROPA : PLYN) }));
    const yearCzkRows = { crude_oil: yearCzk('crude_oil'), natural_gas: yearCzk('natural_gas') };
    const yearCzkTop = d3.nice(0, d3.max([['crude_oil', ROPA], ['natural_gas', PLYN]], ([c, codes]) =>
      d3.max(yearCzkRows[c], r => d3.max(keysOf(codes), k => r[k]))), 2)[1];
    const yearSpendRows = (sel, commodity, codes) => () =>
      countryRows(sel, ['#chart-ropa-czk', '#chart-plyn-czk'], yearCzkRows[commodity], codes, {
        key: d => String(d.year), top: yearCzkTop, unit: 'mld. Kč', fmt: czkMld,
        label: d => yearName(d.year), partial: d => isPartYear(d.year),
        ticks: colTicks(sel).map(String),
      });

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
    const monthPJ = (commodity, year, month) =>
      d3.sum(ofMonth(commodity, year, month), d => toPJ(d.mass_kg, d.commodity));

    // Monthly import axes run to CFG.exploreYMax, taller only when a month needs it.
    const axisTop = peak => peak > CFG.exploreYMax ? d3.nice(0, peak, 4)[1] : CFG.exploreYMax;
    // Twelve labels fit a half-row on a desktop, not on a phone.
    const isNarrow = sel => document.querySelector(sel).getBoundingClientRect().width < 440;
    // 24 February 2022: day 55 of the year, on the year-fraction scale of the month charts.
    const INVASION = { x: 2022 + 54 / 365, label: 'Ruská invaze na Ukrajinu' };

    // The columns' last two charts: the latest 36 months, money then energy.
    // Each pair shares an axis across the fuels, like the yearly charts.
    // 36: the charts' titles and texts on the page say so — change them together.
    const recent = windowMonths.slice(-36);
    const recentPeak = d3.max(['crude_oil', 'natural_gas'], c => d3.max(recent, d => monthPJ(c, d.year, d.month)));
    const spendPeak = d3.max(['crude_oil', 'natural_gas'], c =>
      d3.max(recent, d => d3.sum(ofMonth(c, d.year, d.month), r => r.value_mil_czk) / 1000));
    const spendTop = d3.nice(0, spendPeak, 4)[1];
    // Bands are months, keyed "2025-1"; only Januaries are labelled, with the year.
    const ymKey = d => `${d.year}-${d.month}`;
    const recentJanuaries = recent.filter(d => d.month === 1);

    // A column per month in the fuel's colour; toggles.spendByCountry swaps it
    // for a row per country (countryRows).
    const spendMonths = (sel, commodity, color) => w => fokBarChart(sel,
      recent.map(d => ({ ...d, key: ymKey(d), czk: d3.sum(ofMonth(commodity, d.year, d.month), r => r.value_mil_czk) / 1000 })), {
        x: d => d.key, y: d => d.czk, color, yLabel: 'mld. Kč',
        width: w, height: CFG.chartHeight, theme,
        yDomain: [0, spendTop], yTickValues: d3.ticks(0, spendTop, 4),
        xTickValues: recentJanuaries.map(ymKey), xFormat: k => k.split('-')[0],
        yFormat: v => fokFormatNumber(v, 0),
        tooltipHtml: d => head(`${monthLong(d.month)} ${d.year}`) + plain(czkMld(d.czk)),
      });
    const spendTileTop = d3.nice(0, d3.max([['crude_oil', ROPA], ['natural_gas', PLYN]], ([c, codes]) =>
      d3.max(recent, d => d3.max(Object.values(czkByCountry(ofMonth(c, d.year, d.month), codes))))), 2)[1];
    const spendRows = (sel, commodity, codes) => () =>
      countryRows(sel, ['#chart-ropa-czk-mesice', '#chart-plyn-czk-mesice'],
        recent.map(d => ({ ...d, ...czkByCountry(ofMonth(commodity, d.year, d.month), codes) })), codes, {
          key: ymKey, top: spendTileTop, unit: 'mld. Kč', fmt: czkMld,
          label: d => `${monthLong(d.month)} ${d.year}`,
          ticks: recentJanuaries.map(ymKey), tickFormat: k => k.split('-')[0],
        });

    // Imports per month by country, as the run above draws them.
    const importMonths = (sel, commodity, codes) => {
      const top = axisTop(recentPeak);
      return energy(sel, recent.map(d => ({
        ...d, t: d.year + (d.month - 1) / 12, ...byCountry(ofMonth(commodity, d.year, d.month), codes),
      })), codes, {
        x: d => d.t, markers: [INVASION],
        xTickValues: recentJanuaries.map(d => d.year), xFormat: String,
        yMax: top, yTickValues: d3.ticks(0, top, 4),
        tooltipHtml: bandsTip(codes, d => `${monthLong(d.month)} ${d.year}`),
      });
    };

    // Average import prices, Kč/MWh: by year (YEAR_FROM–YEAR_TO) and for the
    // latest 36 months. One line per fuel; with toggles.priceByCountry the
    // countries join it, each only where it brought at least PRICE_MIN_MWH
    // that month (12× that a year). Each chart's axis covers every line both
    // fuels can show, so the toggle never rescales it; it starts at zero.
    const PRICE_MIN_MWH = 50000;   // 50 GWh
    const kcMwh = v => `${fokFormatNumber(v, 0)} Kč/MWh`;
    const yearPrices = c => years.map(year =>
      ({ year, ...prices(imports.filter(d => d.commodity === c && d.year === year), c === 'crude_oil' ? ROPA : PLYN, 12 * PRICE_MIN_MWH) }));
    const monthPrices = c => recent.map(d =>
      ({ ...d, t: d.year + (d.month - 1) / 12, ...prices(ofMonth(c, d.year, d.month), c === 'crude_oil' ? ROPA : PLYN, PRICE_MIN_MWH) }));
    const priceRows = {
      years: { crude_oil: yearPrices('crude_oil'), natural_gas: yearPrices('natural_gas') },
      months: { crude_oil: monthPrices('crude_oil'), natural_gas: monthPrices('natural_gas') },
    };
    // Exchange prices for reference (CFG.showBenchmarks), monthly averages:
    // Brent and TTF from the World Bank's Pink Sheet in US$, at the ČNB's
    // monthly US$ rate (benchmarks-monthly.csv). A barrel of Brent (38° API,
    // ~7.53 bbl/t) at crude's NCV of 42.6 GJ/t holds 1.57 MWh; an MMBtu is
    // 0.293 MWh of gross calorific value, and gas's NCV is 0.9 of its GCV
    // (IPCC 2006). Everything is kept per MWh of NCV, like the import prices;
    // CFG.gasGCV then moves gas — ours and TTF alike — to GCV, as gas is quoted.
    const MWH_PER_BBL = 42.6 / 7.53 / 3.6;
    const MWH_PER_MMBTU = 0.293071;
    const NCV_PER_GCV = 0.9;
    const benchMonth = new Map(benchmarks.map(b => [ymKey(b), {
      crude_oil: b.brent * b.usd / MWH_PER_BBL,
      natural_gas: b.ttf * b.usd / MWH_PER_MMBTU / NCV_PER_GCV,
    }]));
    const benchYear = (c, year) => d3.mean(d3.range(1, 13), m => benchMonth.get(`${year}-${m}`)?.[c]);
    const BENCH_NAME = { crude_oil: 'Brent (burza)', natural_gas: 'TTF (burza)' };

    // The rows a price chart draws: ours on the chosen basis, plus the
    // exchange price when shown.
    const priceKeys = codes => ['prumer', ...keysOf(codes)];
    const priceSeries = (kind, commodity, codes) => {
      const basis = commodity === 'natural_gas' && CFG.gasGCV ? NCV_PER_GCV : 1;
      return priceRows[kind][commodity].map(r => ({
        ...r,
        ...Object.fromEntries(priceKeys(codes).map(k => [k, r[k] * basis])),
        bench: CFG.showBenchmarks
          ? basis * (kind === 'years' ? benchYear(commodity, r.year) : benchMonth.get(ymKey(r))?.[commodity])
          : NaN,
      }));
    };
    const priceTop = kind => d3.nice(0, d3.max([['crude_oil', ROPA], ['natural_gas', PLYN]], ([c, codes]) =>
      d3.max(priceSeries(kind, c, codes), r => d3.max([...priceKeys(codes), 'bench'], k => r[k]))), 4)[1];

    const price = (sel, kind, commodity, codes, color) => w => {
      const split = toggles.priceByCountry;
      const rows = priceSeries(kind, commodity, codes);
      const colors = colorsOf(codes), labels = labelsOf(codes);
      // The exchange price first and the average last, so the reference sits
      // under everything and the average over the countries.
      const lines = (CFG.showBenchmarks ? [['bench', BENCH_NAME[commodity], CFG.colorBenchmark]] : [])
        .concat(split ? keysOf(codes).map(k => [k, labels[k], colors[k]]) : [])
        .concat([['prumer', 'Průměr', split ? CFG.colorTotal : color]]);
      const top = priceTop(kind);
      const yearly = kind === 'years';
      return fokLineChart(sel, lines.flatMap(([key, series]) => rows.map(r => ({ ...r, series, price: r[key] }))), {
        multi: true, x: d => yearly ? d.year : d.t, y: d => d.price, legend: lines.length > 1,
        dashed: series => series === BENCH_NAME[commodity],
        yLabel: commodity === 'natural_gas' && CFG.gasGCV ? 'Kč/MWh spalného tepla' : 'Kč/MWh',
        width: w, height: CFG.chartHeight,
        theme: { ...theme, colors: { ...theme.colors, categorical: lines.map(l => l[2]) } },
        yDomain: [0, top], yTickValues: d3.ticks(0, top, 4),
        xTickValues: yearly ? d3.range(YEAR_FROM, YEAR_TO + 1, isNarrow(sel) ? 2 : 1) : recentJanuaries.map(d => d.year),
        xFormat: String,
        yFormat: v => fokFormatNumber(v, 0),
        tooltipHtml: r => head(yearly ? r.year : `${monthLong(r.month)} ${r.year}`)
          + `<div style="font-family:${theme.font};font-weight:700">Průměr: ${kcMwh(r.prumer)}</div>`
          + (split ? keysOf(codes).filter(k => Number.isFinite(r[k])).reverse().map(k =>
              `<span style="color:${colors[k]}">■</span> ` + plain(`${labels[k]}: ${kcMwh(r[k])}`)).join('<br>') : '')
          + (Number.isFinite(r.bench) ? (split ? '<br>' : '') + `<span style="color:${CFG.colorBenchmark}">■</span> `
              + plain(`${BENCH_NAME[commodity]}: ${kcMwh(r.bench)}`) : ''),
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
      metric: 'energy', fuel: 'both', split: 'country', step: 'years',
      tiles: false, bench: false, invasion: false, hormuz: false,
    };
    const toolMonths = monthsOf(monthly.filter(d => d.year >= TOOL_FIRST));
    const lastFullYear = d3.max(toolMonths.filter(d => d.month === 12), d => d.year);
    const yearGroups = d3.group(imports, d => d.commodity, d => d.year);
    const BOTH = { ...ROPA, ...PLYN };   // every named supplier of either fuel
    const codesOf = c => c === 'crude_oil' ? ROPA : PLYN;
    const FUEL_NAME = {
      crude_oil:   { gen: 'ropy', acc: 'ropu', label: 'Ropa' },
      natural_gas: { gen: 'zemního plynu', acc: 'zemní plyn', label: 'Zemní plyn' },
      both:        { gen: 'ropy a zemního plynu', acc: 'ropu a zemní plyn' },
    };

    // The period slider; the stretch between the thumbs is drawn darker.
    const toolFrom = document.getElementById('tool-from');
    const toolTo = document.getElementById('tool-to');
    const toolRange = toolFrom.closest('.dual-range');
    [toolFrom, toolTo].forEach(r => Object.assign(r, { min: TOOL_FIRST, max: lastYear, step: 1 }));
    toolFrom.value = YEAR_FROM;
    toolTo.value = lastYear;
    const paintRange = () => {
      const at = v => (v - TOOL_FIRST) / (lastYear - TOOL_FIRST);
      toolRange.style.setProperty('--from', at(+toolFrom.value));
      toolRange.style.setProperty('--to', at(+toolTo.value));
    };
    paintRange();
    // The thumbs never cross: the one dragged stops a year short of the other.
    [toolFrom, toolTo].forEach(r => r.addEventListener('input', () => {
      if (+toolFrom.value >= +toolTo.value)
        r.value = r === toolFrom ? +toolTo.value - 1 : +toolFrom.value + 1;
      paintRange();
      drawAll();
    }));
    document.querySelectorAll('.tool [data-control] button').forEach(b => b.addEventListener('click', () => {
      const group = b.closest('[data-control]');
      TOOL[group.dataset.control] = b.dataset.value;
      group.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      drawAll();
    }));
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
      const byCountry = TOOL.split === 'country' && splitAllowed;
      let from = +toolFrom.value, to = +toolTo.value;
      if (TOOL.step === 'years') { to = Math.min(to, lastFullYear); from = Math.min(from, to - 1); }
      return {
        fuels, price, splitAllowed, byCountry, from, to,
        codes: fuels.length > 1 ? BOTH : codesOf(fuels[0]),
        tiles: byCountry && TOOL.tiles, bench: price && TOOL.bench,
      };
    };

    // One y-axis per metric, step and period, whatever fuel, split or option is
    // picked, so switching those never rescales the chart — only the period
    // does, zooming in on what it holds: the most any view of that metric
    // reaches in it — both fuels stacked, or for prices every line there can be
    // (per fuel, see below). `tiles` is the same for a single country, for
    // small multiples and rows.
    const toolTops = v => {
      const period = { from: v.from, to: v.to };
      const both = ['crude_oil', 'natural_gas'];
      const view = (fuels, byCountry) => ({ ...period, fuels, byCountry, bench: true,
        price: TOOL.metric === 'price', codes: fuels.length > 1 ? BOTH : codesOf(fuels[0]) });
      const peak = (d, keys) => d3.max(d.rows, r => d3.max(keys, k => r[k]));
      // Prices are the one exception: each fuel keeps its own axis, as gas —
      // with TTF in 2022 — would otherwise leave oil a strip along the bottom.
      // Still one axis per fuel whatever else is picked; both fuels share one.
      if (TOOL.metric === 'price') {
        const views = TOOL.fuel === 'both'
          ? [view(both, false), view(['crude_oil'], true), view(['natural_gas'], true)]
          : [view([TOOL.fuel], true)];
        const p = d3.max(views, vv => { const d = toolData(vv); return peak(d, d.lines.map(([k]) => k)); });
        return { chart: p, tiles: p };
      }
      const total = toolData(view(both, false)), countries = toolData(view(both, true));
      return { chart: d3.max(total.rows, r => d3.sum(total.keys, k => r[k])), tiles: peak(countries, countries.keys) };
    };

    // Exchange prices, from benchmarks-monthly.csv as converted above. The
    // World Bank's European gas series is TTF only from April 2015 (before, a
    // border-price mix), so gas has none earlier. A year's figure needs all
    // twelve months.
    const benchAt = (c, p) => {
      if (c === 'natural_gas' && p.year * 12 + (p.month ?? 12) < 2015 * 12 + 4) return NaN;
      if (p.month) return benchMonth.get(ymKey(p))?.[c] ?? NaN;
      const months = d3.range(1, 13).map(m => benchMonth.get(`${p.year}-${m}`)?.[c]);
      return months.every(Number.isFinite) ? d3.mean(months) : NaN;
    };

    // Rows and series for a view: one row per year or month, a value per key.
    // Keys: the countries, or the fuels (both, no split), or the one fuel.
    const toolData = v => {
      const periods = TOOL.step === 'years'
        ? d3.range(v.from, v.to + 1).map(year => ({ year, x: year, key: String(year), label: String(year) }))
        : toolMonths.filter(d => d.year >= v.from && d.year <= v.to).map(d =>
            ({ ...d, x: d.year + (d.month - 1) / 12, key: ymKey(d), label: `${monthLong(d.month)} ${d.year}` }));
      const rowsIn = (c, p) => TOOL.step === 'years' ? yearGroups.get(c)?.get(p.year) ?? [] : ofMonth(c, p.year, p.month);
      const fuelColor = c => c === 'crude_oil' ? CFG.colorRopa : CFG.colorPlyn;
      const basis = c => c === 'natural_gas' && CFG.gasGCV ? NCV_PER_GCV : 1;
      let keys, colors, labels;
      if (v.byCountry) { keys = keysOf(v.codes); colors = colorsOf(v.codes); labels = labelsOf(v.codes); }
      else {
        keys = v.fuels;
        colors = Object.fromEntries(v.fuels.map(c => [c, fuelColor(c)]));
        labels = Object.fromEntries(v.fuels.map(c => [c, FUEL_NAME[c].label]));
      }
      const minMWh = TOOL.step === 'years' ? 12 * PRICE_MIN_MWH : PRICE_MIN_MWH;
      const amount = rs => TOOL.metric === 'energy'
        ? d3.sum(rs, d => toPJ(d.mass_kg, d.commodity)) : d3.sum(rs, d => d.value_mil_czk) / 1000;
      const rows = periods.map(p => {
        const row = { ...p };
        if (v.price && v.byCountry) {
          const c = v.fuels[0], pr = prices(rowsIn(c, p), v.codes, minMWh);
          [...keys, 'prumer'].forEach(k => { row[k] = pr[k] * basis(c); });
          row.bench = basis(c) * benchAt(c, p);
        } else if (v.price) {
          v.fuels.forEach(c => {
            row[c] = prices(rowsIn(c, p), codesOf(c), minMWh).prumer * basis(c);
            row[`bench-${c}`] = basis(c) * benchAt(c, p);
          });
        } else if (v.byCountry) {
          const g = d3.group(v.fuels.flatMap(c => rowsIn(c, p)), d => (v.codes[d.country_code] ?? OSTATNI)[0]);
          keys.forEach(k => { row[k] = amount(g.get(k) ?? []); });
        } else {
          v.fuels.forEach(c => { row[c] = amount(rowsIn(c, p)); });
        }
        return row;
      });
      // Price lines: the exchange price(s) underneath, then the countries and
      // their average — or each fuel's average.
      const lines = !v.price ? [] : [
        ...(v.bench ? (v.byCountry ? [['bench', BENCH_NAME[v.fuels[0]], CFG.colorBenchmark]]
          : v.fuels.map(c => [`bench-${c}`, BENCH_NAME[c], CFG.colorBenchmark])) : []),
        ...keys.map(k => [k, labels[k], colors[k]]),
        ...(v.byCountry ? [['prumer', 'Průměr', CFG.colorTotal]] : []),
      ];
      const unit = { energy: 'PJ', czk: 'mld. Kč',
        price: v.fuels.every(c => basis(c) !== 1) ? 'Kč/MWh spalného tepla' : 'Kč/MWh' }[TOOL.metric];
      const fmt = { energy: pj, czk: czkMld, price: x => `${fokFormatNumber(x, 0)} ${unit}` }[TOOL.metric];
      return { rows, keys, colors, labels, lines, unit, fmt };
    };

    // Ticks: a year label every few years, so at most a dozen fit (six narrow).
    const toolTicks = (sel, v) =>
      d3.range(v.from, v.to + 1, Math.ceil((v.to - v.from + 1) / (isNarrow(sel) ? 6 : 12)));
    // Context events, each a checkbox under Kontext: a dated line on the year
    // scale, or within its column for spending. Without labels in the tiles.
    const CONTEXT = [
      { option: 'invasion', label: 'Ruská invaze na Ukrajinu', date: [2022, 2, 24] },
      // US and Israeli strikes on Iran, 28 February 2026; Iran declared the
      // strait closed on 4 March (en.wikipedia.org/wiki/2026_Strait_of_Hormuz_crisis).
      { option: 'hormuz', label: 'Krize v Hormuzském průlivu', date: [2026, 2, 28] },
    ];
    const contextMarkers = (withLabels = true) => CONTEXT.filter(e => TOOL[e.option]).map(({ label, date: [y, m, d] }) => {
      const text = withLabels ? label : '';
      const dayOfYear = (Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 864e5;
      if (TOOL.metric !== 'czk') return { x: y + dayOfYear / 365, label: text };
      return TOOL.step === 'years' ? { band: String(y), offset: dayOfYear / 365, label: text }
        : { band: `${y}-${m}`, offset: (d - 1) / new Date(y, m, 0).getDate(), label: text };
    });

    // Legend inside the SVG: swatch and label, wrapped to the plot's width.
    const legendLayout = (items, width) => {
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = `${theme.fontSize.axisLabel}px Roboto, sans-serif`;
      let x = 0, y = 0;
      const placed = items.map(it => {
        const w = 18 + ctx.measureText(it.label).width;
        if (x > 0 && x + w > width) { x = 0; y += 20; }
        const at = { ...it, x, y };
        x += w + 16;
        return at;
      });
      return { placed, height: items.length ? y + 20 : 0 };
    };

    const toolChart = w => {
      const v = toolView();
      const { rows, keys, colors, labels, lines, unit, fmt } = toolData(v);
      document.querySelector('[data-control="split"] [data-value="country"]').disabled = !v.splitAllowed;
      // Options show only where they apply: data-when names the view's flag.
      // Hidden, they keep their place, so the controls never shift.
      document.querySelectorAll('.tool [data-when]').forEach(el => {
        el.style.visibility = v[el.dataset.when] ? '' : 'hidden';
      });
      document.getElementById('tool-period').textContent = `${v.from}–${v.to}`;

      const sum = r => d3.sum(keys, k => r[k]);
      const top = d3.nice(0, toolTops(v).chart || 1, 5)[1];
      const ticks = toolTicks('#chart-tool', v);
      const legendWidth = w - theme.margins.left - theme.margins.right;
      const legend = legendLayout((v.price ? lines : keys.map(k => [k, labels[k], colors[k]]))
        .map(([key, label, color]) => ({ label, color, dashed: key.startsWith('bench') })), legendWidth);
      // Room for the longest legend any view can have, so the chart keeps one
      // height whatever is picked and the page never jumps. The whole chart,
      // legend included, is CFG.toolAspect of its width (2:1) — but on a phone
      // that would leave the plot a sliver under the legend, hence the floor.
      const legendRoom = legendLayout([...Object.values(labelsOf(BOTH)), 'Průměr', ...Object.values(BENCH_NAME)]
        .map(label => ({ label })), legendWidth).height;
      const height = Math.max(Math.round(w * CFG.toolAspect), 360);
      const swatch = c => `<span style="color:${c}">■</span> `;
      const tip = r => head(r.label) + (v.price
        ? lines.slice().reverse().filter(([k]) => Number.isFinite(r[k]))
            .map(([k, label, color]) => swatch(color) + plain(`${label}: ${fmt(r[k])}`)).join('<br>')
        : keys.slice().reverse().map(k => swatch(colors[k]) + plain(`${labels[k]}: ${fmt(r[k])}`)).join('<br>')
          + (keys.length > 1 ? `<div style="font-family:${theme.font};font-weight:700;margin-top:4px">Celkem: ${fmt(sum(r))}</div>` : ''));
      const common = {
        width: w, height, theme, margins: { bottom: theme.margins.bottom + legendRoom },
        yLabel: unit, yFormat: x => fokFormatNumber(x, 0), legend: false, markers: contextMarkers(),
      };

      let chart;
      if (v.price) {
        const benchNames = new Set(Object.values(BENCH_NAME));
        chart = fokLineChart('#chart-tool', lines.flatMap(([key, series]) => rows.map(r => ({ ...r, series, val: r[key] }))), {
          ...common, multi: true, x: d => d.x, y: d => d.val, dashed: series => benchNames.has(series),
          theme: { ...theme, colors: { ...theme.colors, categorical: lines.map(l => l[2]) } },
          yDomain: [0, top], yTickValues: d3.ticks(0, top, 5),
          xDomain: d3.extent(rows, r => r.x), xTickValues: ticks, xFormat: String, tooltipHtml: tip,
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
      chart.svg.attr('id', 'tool-svg');
      const lg = chart.svg.append('g').attr('class', 'tool-legend')
        .attr('transform', `translate(${theme.margins.left},${height - legendRoom + 4})`);
      legend.placed.forEach(it => {
        // A dashed series gets a dashed stroke for a swatch, the rest a square.
        if (it.dashed) lg.append('line').attr('x1', it.x).attr('x2', it.x + 12).attr('y1', it.y + 6).attr('y2', it.y + 6)
          .attr('stroke', it.color).attr('stroke-width', 2).attr('stroke-dasharray', '4 2');
        else lg.append('rect').attr('x', it.x).attr('y', it.y).attr('width', 12).attr('height', 12).attr('fill', it.color);
        lg.append('text').attr('x', it.x + 18).attr('y', it.y + 10)
          .attr('font-family', theme.font).attr('font-size', theme.fontSize.axisLabel)
          .attr('fill', theme.colors.grey).text(it.label);
      });

      // Title and summary: on the page, and in a saved file's header.
      const metricName = { energy: 'Dovoz', czk: 'Výdaje za', price: 'Průměrná dovozní cena' }[TOOL.metric];
      const fuelName = FUEL_NAME[TOOL.fuel][TOOL.metric === 'czk' ? 'acc' : 'gen'];
      document.getElementById('tool-title').textContent =
        `${metricName} ${fuelName}${v.byCountry ? ' podle zemí' : ''}, ${v.from}–${v.to}`;
      document.getElementById('tool-summary').textContent = [
        { energy: 'Energie v PJ', czk: 'Celní hodnota v mld. Kč',
          price: `Celní hodnota dělená energetickým obsahem dovozu, v ${unit}` }[TOOL.metric]
          + (TOOL.step === 'years' ? ', roční' : ', měsíční') + (v.price ? ' průměry.' : ' součty.'),
        v.tiles ? 'Každá země zvlášť, na společné ose.' : '',
        TOOL.step === 'years' && +toolTo.value > lastFullYear ? `Rok ${lastFullYear + 1} je neúplný, ukazují ho měsíce.` : '',
        v.price && v.byCountry ? 'Země s malým dovozem graf vynechává.' : '',
        v.bench ? 'Burzovní cena: Brent, resp. TTF (od dubna 2015), podle Světové banky, přepočtená kurzem ČNB.' : '',
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
        countryRows('#chart-tool-tiles', ['#chart-tool'], rows, v.codes, {
          key: d => d.key, top: d3.nice(0, toolTops(v).tiles || 1, 10)[1],
          unit, fmt, label: d => d.label, markers: contextMarkers(),
          ticks: TOOL.step === 'years' ? ticks.map(String) : ticks.map(y => `${y}-1`).filter(k => rows.some(r => r.key === k)),
          tickFormat: k => k.split('-')[0],
        });
        return;
      }
      const value = (r, k) => r[k];
      const yTop = d3.nice(0, toolTops(v).tiles || 1, 3)[1];
      const ends = rows.length ? [rows[0], rows[rows.length - 1]] : [];
      tiles('#chart-tool-tiles', ['#chart-tool'], v.codes, (node, k, t) => {
        const tip = r => head(r.label) + plain(`${t.label}: ${fmt(value(r, k))}`)
          + (v.bench && Number.isFinite(r.bench) ? '<br>' + plain(`${BENCH_NAME[v.fuels[0]]}: ${fmt(r.bench)}`) : '');
        const shared = {
          width: t.width, height: t.height, margins: t.margins, yFormat: t.yFormat,
          yLabel: t.first ? unit : undefined, markers: contextMarkers(false), tooltipHtml: tip,
        };
        if (TOOL.metric === 'czk') {
          fokBarChart(node, rows, {
            ...shared, theme, x: d => d.key, y: d => value(d, k), color: t.color,
            yDomain: [0, yTop], yTickValues: [0, yTop],
            xTickValues: ends.map(r => r.key), xFormat: key => key.split('-')[0],
          });
        } else {
          const series = v.bench ? [['bench', CFG.colorBenchmark], [k, t.color]] : [[k, t.color]];
          fokLineChart(node, series.flatMap(([key, ]) => rows.map(r => ({ ...r, series: key, val: r[key] }))), {
            ...shared, multi: true, x: d => d.x, y: d => d.val, dashed: series => series === 'bench',
            area: TOOL.metric === 'energy', areaOpacity: CFG.areaOpacity,
            theme: { ...theme, colors: { ...theme.colors, categorical: series.map(s => s[1]) } },
            yDomain: [0, yTop], yTickValues: [0, yTop],
            xDomain: d3.extent(rows, r => r.x), xTickValues: ends.map(r => r.year), xFormat: String,
          });
        }
        d3.select(node).selectAll('.fok-axis--x .tick text')
          .attr('text-anchor', (_, i, all) => i === 0 ? 'start' : i === all.length - 1 ? 'end' : 'middle');
      }, { perRow: 4, max: 8 });
    };

    // Each entry draws into its container at that container's own width;
    // hidden containers measure 0 and are skipped. Built per draw, so the
    // colours are whatever CFG holds now.
    const charts = () => [
      ['#chart-celkem-czk', w => fokBarChartStacked('#chart-celkem-czk',
        payments.map(d => ({ year: String(d.year), ropa: d.ropa_czk_mld, plyn: d.plyn_czk_mld })), {
          x: d => d.year,
          keys: ['ropa', 'plyn'],
          colors: { ropa: CFG.colorRopa, plyn: CFG.colorPlyn },
          labels: { ropa: 'Ropa', plyn: 'Zemní plyn' },
          yLabel: 'mld. Kč',
          width: w, height: CFG.chartHeight, theme,
          xTickValues: xTicks.map(String),
          yFormat: v => fokFormatNumber(v, 0),
          // The whole year whichever band is hovered: the sum, then the two
          // fuels in stack order, top first.
          tooltipHtml: raw => head(raw.year)
            + `<div style="font-family:${theme.font};font-weight:700">Celkem: ${czkMld(raw.ropa + raw.plyn)}</div>`
            + [['plyn', 'Zemní plyn', CFG.colorPlyn], ['ropa', 'Ropa', CFG.colorRopa]].map(([k, label, color]) =>
                `<span style="color:${color}">■</span> ` + plain(`${label}: ${czkMld(raw[k])}`)).join('<br>'),
        })],

      ['#chart-celkem-hdp', w => {
        // Comparisons switched on in the sidebar join as faint lines for scale —
        // listed first, so they are drawn behind the imports' line.
        const lines = [
          [CFG.showDefense, 'Výdaje na obranu', 'defense_pct', CFG.colorDefense],
          [CFG.showMsmt, 'Výdaje na školství (MŠMT)', 'msmt_pct', CFG.colorMsmt],
          [CFG.showSfdi, 'Výdaje na dopravní infrastrukturu (SFDI)', 'sfdi_pct', CFG.colorSfdi],
        ].filter(([shown]) => shown).map(([, ...line]) => line)
          .concat([['Ropa a zemní plyn', 'gdp_share_pct', CFG.colorRopa]]);
        const compared = lines.length > 1;
        return fokLineChart('#chart-celkem-hdp',
          lines.flatMap(([series, field]) => payments.map(d => ({ ...d, series, pct: d[field] }))), {
            multi: true, x: d => d.year, y: d => d.pct, legend: compared,
            yLabel: '% HDP',
            width: w, height: CFG.chartHeight,
            theme: { ...theme, colors: { ...theme.colors, categorical: lines.map(l => l[2]) } },
            xTickValues: xTicks, xFormat: String,
            yFormat: v => fokFormatNumber(v, 1),
            tooltipHtml: d => head(d.year) + lines.slice().reverse().map(([series, field]) =>
              plain(`${compared ? series + ': ' : ''}${fokFormatNumber(d[field], 1)} % HDP`)).join('<br>'),
          });
      }],

      // The series peaks just under 700 PJ; left to itself the axis puts 14
      // labels on a 320px-wide panel.
      ['#chart-celkem-energie', energy('#chart-celkem-energie', energie, FOSIL,
        { yTickValues: [0, 200, 400, 600] })],

      ['#chart-ropa-czk',     money('#chart-ropa-czk', ropa.czk, CFG.colorRopa)],
      ['#chart-ropa-energie', fuelEnergy('#chart-ropa-energie', ropa.energie, ROPA)],
      ['#chart-plyn-czk',     money('#chart-plyn-czk', plyn.czk, CFG.colorPlyn)],
      ['#chart-plyn-energie', fuelEnergy('#chart-plyn-energie', plyn.energie, PLYN)],
      ['#chart-ropa-czk-roky', yearSpendRows('#chart-ropa-czk-roky', 'crude_oil', ROPA)],
      ['#chart-plyn-czk-roky', yearSpendRows('#chart-plyn-czk-roky', 'natural_gas', PLYN)],
      ['#chart-ropa-mini',    minis('#chart-ropa-mini', ropa.energie, ROPA)],
      ['#chart-plyn-mini',    minis('#chart-plyn-mini', plyn.energie, PLYN)],
      ['#chart-ropa-czk-mesice',     spendMonths('#chart-ropa-czk-mesice', 'crude_oil', CFG.colorRopa)],
      ['#chart-plyn-czk-mesice',     spendMonths('#chart-plyn-czk-mesice', 'natural_gas', CFG.colorPlyn)],
      ['#chart-ropa-czk-tiles',      spendRows('#chart-ropa-czk-tiles', 'crude_oil', ROPA)],
      ['#chart-plyn-czk-tiles',      spendRows('#chart-plyn-czk-tiles', 'natural_gas', PLYN)],
      ['#chart-ropa-energie-mesice', importMonths('#chart-ropa-energie-mesice', 'crude_oil', ROPA)],
      ['#chart-plyn-energie-mesice', importMonths('#chart-plyn-energie-mesice', 'natural_gas', PLYN)],
      ['#chart-ropa-cena',           price('#chart-ropa-cena', 'years', 'crude_oil', ROPA, CFG.colorRopa)],
      ['#chart-plyn-cena',           price('#chart-plyn-cena', 'years', 'natural_gas', PLYN, CFG.colorPlyn)],
      ['#chart-ropa-cena-mesice',    price('#chart-ropa-cena-mesice', 'months', 'crude_oil', ROPA, CFG.colorRopa)],
      ['#chart-plyn-cena-mesice',    price('#chart-plyn-cena-mesice', 'months', 'natural_gas', PLYN, CFG.colorPlyn)],
      ['#chart-tool',         toolChart],
      ['#chart-tool-tiles',   toolTiles],
    ];

    const drawAll = () => {
      theme = makeTheme();
      // Before measuring: these decide which charts show at all.
      // A class per reader toggle, for the CSS that swaps a chart for its tiles.
      Object.entries(toggles).forEach(([key, on]) => document.body.classList.toggle(`tiles-${key}`, on));
      document.body.classList.toggle('tiles-toolTiles', toolView().tiles);
      document.body.classList.toggle('span-long', span === 'long');
      document.body.classList.toggle('span-recent', span === 'recent');
      document.body.classList.toggle('show-bench', CFG.showBenchmarks);
      document.body.style.setProperty('--dovoz-chart-fraction', CFG.chartFraction);
      document.body.classList.toggle('fuel-boxed', CFG.fuelBoxed);
      document.body.classList.toggle('fuel-box-colored', CFG.fuelBoxColored);
      document.body.style.setProperty('--dovoz-color-ropa', CFG.colorRopa);
      document.body.style.setProperty('--dovoz-color-plyn', CFG.colorPlyn);
      // The KPI row is reordered in the DOM, not with CSS order, so reading
      // and tabbing follow what is on screen.
      const kpiRow = document.getElementById('main-charts');
      const panelOf = id => document.getElementById(id).closest('.chart-panel');
      kpiRow.insertBefore(panelOf('kpi-gdp'),
        CFG.gdpFirst ? kpiRow.firstElementChild : panelOf('kpi-total').nextElementSibling);
      charts().forEach(([sel, draw]) => {
        const w = Math.round(document.querySelector(sel).getBoundingClientRect().width);
        if (w > 0) draw(w);
      });
    };
    window.DOVOZ_REDRAW = drawAll;
    // ponytail: any control redraws every chart, not just its own — cheap here.
    drawAll();

    // Redrawing is the only way to resize: the width is baked into the viewBox.
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawAll, 200);
    });
  }
});
