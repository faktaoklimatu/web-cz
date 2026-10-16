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
  colorGdp: '#a13f54',     // KPI GDP chart: the imports' line
  showDefense: false,      // GDP chart: defence spending as a faint line, for scale
  gdpFirst: false,         // KPI row: the GDP share first, ahead of the spending
  kpiUnitInline: true,     // KPI row: each axis' unit after its top label ("350 mld. Kč")
  colorDefense: '#d0d9e1',
  showMsmt: true,          // GDP chart: the education ministry's spending (MŠMT)
  colorMsmt: '#9aa5b1',
  showSfdi: true,          // GDP chart: the transport infrastructure fund's (SFDI)
  colorSfdi: '#9aa5b1',
  compareDash: '8 2',      // GDP chart: the comparisons' dashes, dash and gap 4 : 1
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
  kpiPlotHeight: 254,      // px, the KPI charts' plot alone, margins aside (1.2 × the 212 it was)
  chartFraction: 0.75,     // fuel columns, desktop: a chart's share of its column's width
  fuelBoxed: false,        // fuel columns drawn as boxes
  fuelBoxColored: false,   // …with the border in the fuel's colour
  barPadding: 0.2,         // gap between bars (0-1)
  lineWidth: 2,            // line charts
  areaOpacity: 0.6,        // fill under the small multiples' lines
  showBenchmarks: false,   // price charts: Brent / TTF exchange prices, dashed in their fuel's colour
  gasGCV: false,           // gas prices per MWh of gross calorific value, as gas is quoted
  toolAspect: 0.5,         // the explorer's chart, legend included: height ÷ width (2:1)
  titleSize: 16,           // chart titles drawn by the library
  axisSize: 12,            // axis ticks, units and legends
  axisTextColor: '#53616e',
  gridColor: '#e8eef6',
};

document.addEventListener('DOMContentLoaded', () => {
  const CFG = window.DOVOZ_CFG;
  const DATA = '/assets-local/files/dovoz-fosilnich-paliv';
  // The route map's countries: Natural Earth at 1:50m — the library's 110m
  // world is too coarse zoomed in on Europe, where it closes the Bosporus.
  // Loaded on its own, so the charts never wait for it.
  const worldReady = d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
    .then(t => topojson.feature(t, t.objects.countries).features);

  // The source runs 1999–2026, but 2026 is a part-year (its monthly companion
  // stops at month 7) and has no GDP figure, so it would read as a collapse in
  // imports. Widen this once the year closes.
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

  // Net calorific values in TJ/Gg, which is the same number as GJ per tonne.
  // Mass is the only energy-bearing column in the customs data, so this is what
  // puts a tonne of crude and a tonne of gas on one scale. Gas is the IPCC 2006
  // default (vol. 2, table 1.2); crude is 42.6 rather than that table's 42.3.
  const NCV = { crude_oil: 42.6, natural_gas: 48.0 };
  // Gas's NCV is 0.9 of its gross calorific value (IPCC 2006), the basis it is
  // traded and quoted on.
  const NCV_PER_GCV = 0.9;
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

    // Ropa and plyn are meant to be read against each other, so their money
    // charts share one scale rather than each picking its own. maxPJ is the
    // per-country tiles' (minis).
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

    // An arrow's text is the page's: the `arrow` of the chart's foot include in
    // the .md, its lines split at "|". Without one the chart draws no arrow;
    // where it points is the chart's, in `arrow`.
    const arrowsFor = (sel, arrow) => {
      const text = document.querySelector(`.chart-foot[data-chart="${sel.slice(1)}"]`)?.dataset.arrow;
      return text ? [{ ...arrow, lines: text.split('|') }] : [];
    };

    const money = (sel, rows, color, extra) => w => fokBarChart(sel, rows, {
      x: d => String(d.year), y: d => d.czk_mld,
      color, partial: d => isPartYear(d.year), yLabel: 'mld. Kč', yLabelInline: true,
      width: w, height: CFG.chartHeight, theme,
      yDomain: [0, maxCzk], yTicks: 4,
      xTickValues: colTicks(sel).map(String),
      yFormat: v => fokFormatNumber(v, 0),
      tooltipHtml: d => head(yearName(d.year)) + plain(czkMld(d.czk_mld)),
      ...extra,
    });

    // Stacked by country of origin, with the total drawn on top. The library's
    // own tooltip lists the bands but not what they add up to, which is what
    // the line is for. Same shape as the default — topmost band first — then,
    // where both fuels are stacked together, the split the stack hides, because
    // the bands answer "from where" and say nothing about which fuel. `when`
    // names the row: a year here, a month in the exploration. With `share`
    // the bands are the chart's percentages; the total stays in PJ. `fmt`
    // writes a value in the chart's unit; with `pct` each band also gets its
    // share of the row's total, "(57 %)".
    const bandsTip = (codes, when, { share = false, fmt = pj, pct = false } = {}) => {
      const keys = keysOf(codes), colors = colorsOf(codes), labels = labelsOf(codes);
      return row => head(when(row))
        + keys.slice().reverse().map(k =>
            `<span style="color:${colors[k]}">■</span> `
            + plain(`${labels[k]}: ${share ? fokFormatNumber(row[k], 0) + ' %' : fmt(row[k])}`
              + (pct ? ` (${fokFormatNumber(100 * row[k] / totalPJ(row), 0)} %)` : ''))).join('<br>')
        + `<div style="font-family:${theme.font};margin-top:4px;padding-top:4px;`
        + `border-top:1px solid ${theme.colors.gridLine}">`
        + (codes === FOSIL ? `Ropa: ${fmt(row.ropa_pj)}<br>Zemní plyn: ${fmt(row.plyn_pj)}` : '')
        + `<div style="font-weight:700">Celkem: ${fmt(totalPJ(row))}</div>`
        + `</div>`;
    };
    const energy = (sel, rows, codes, extra) => w => fokAreaChartStacked(sel, rows, {
      x: d => d.year, keys: keysOf(codes), colors: colorsOf(codes), labels: labelsOf(codes),
      yLabel: 'PJ', yLabelInline: true, totalLine: CFG.colorTotal,
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
      const chart = energy(sel, rows, codes, {
        ...extra, legend: false, height: CFG.chartHeight + room, margins: { top: theme.margins.top + room },
      })(w);
      drawLegend(chart.svg, legend, room - legend.height, it => readable(it.color));
      return chart;
    };

    // The columns' import charts each speak the fuel's own unit, not PJ:
    // crude by mass, gas in TWh of gross calorific value, as it is traded.
    // PER_PJ is what one PJ makes. The rows come back in `unit`, the fuels'
    // totals (ropa_pj, plyn_pj) too, with the tooltip's format.
    const PER_PJ = {
      'mil. t': 1 / NCV.crude_oil,
      'tis. t': 1000 / NCV.crude_oil,
      'TWh': 1 / 3.6 / NCV_PER_GCV,
    };
    const inUnit = (rows, codes, unit) => {
      const fields = [...keysOf(codes), 'ropa_pj', 'plyn_pj'];
      return {
        rows: rows.map(r => ({ ...r, ...Object.fromEntries(fields.map(k => [k, r[k] * PER_PJ[unit]])) })),
        fmt: v => `${fokFormatNumber(v, 1)} ${unit}`,
      };
    };

    // "Postupný konec dovozu z Ruska" on the yearly imports: the text alone,
    // no arrow, over the stack's right end and flush with the plot's right
    // edge (lastYear, where the grid lines end).
    const russiaEndNote = (sel, textY) => arrowsFor(sel, { textEnd: [lastYear, textY], side: 'left', textGap: 0 });

    // By year: the unit, the axis' top and its label step. With
    // toggles.share, each year's imports as 100 %: the split by country
    // without the swings in volume. The total line would sit on the top edge.
    const fuelEnergy = (sel, rows, codes, { unit, top, step }, extra) => {
      const u = inUnit(rows, codes, unit);
      return columnEnergy(sel, u.rows, codes, {
        yLabel: unit, yMax: top, yTickValues: d3.range(0, top + step / 2, step),
        xDomain: [YEAR_FROM, lastYear], xTickValues: colTicks(sel),
        tooltipHtml: bandsTip(codes, row => row.year, { fmt: u.fmt, pct: true }),
        ...extra,
        ...(toggles.share && {
          proportional: true, totalLine: null, yLabel: '% dovozu', yTickValues: undefined,
          yFormat: v => `${v} %`, tooltipHtml: bandsTip(codes, row => row.year, { share: true }),
        }),
      });
    };

    // Reader toggles above the column charts. Each kind is one setting for both
    // fuels — every checkbox of a kind follows — so the columns stay comparable
    // row by row.
    const toggles = { yearSpendByCountry: false, minis: false, minisRows: false, share: false, spendByCountry: false, priceByCountry: false };

    // The span selector above the fuel columns: the long-term charts or the
    // latest 36 months', in both columns at once.
    let span = 'long';
    document.querySelectorAll('[data-span-select] button').forEach(b => b.addEventListener('click', () => {
      span = b.dataset.value;
      document.querySelectorAll('[data-span-select] button')
        .forEach(x => x.setAttribute('aria-pressed', String(x.dataset.value === span)));
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
    // chart over the whole chart's box — the biggest supplier at the bottom,
    // Ostatní on top (it is no country). Every bar is drawn to the whole chart's
    // own scale, so a column of bars down the rows adds up to that period's
    // stacked bar; each row is as tall as its country's highest bar, not one
    // height for all. The countries peak at different times, so the rows can
    // need more room than the box: then the chart grows rather than shrinking
    // the scale. `o.plotH` and `o.top` are the whole chart's plot height and
    // the top of its axis; the bar charts nice() that top, and so does this.
    // With `o.area` the rows are areas over `o.xDomain`, as in the imports
    // chart, which takes its top as given.
    const countryRows = (sel, boxSels, data, codes, o) => {
      const box = d3.select(sel).html('')
        .style('grid-template-columns', '1fr').style('grid-template-rows', '1fr');
      const boxH = Math.round(d3.min(boxSels, s => document.querySelector(s).getBoundingClientRect().height));
      const W = Math.round(box.node().getBoundingClientRect().width);
      const colors = colorsOf(codes), labels = labelsOf(codes);
      const total = k => d3.sum(data, d => d[k]);
      const keys = keysOf(codes).filter(k => k !== OSTATNI[0])
        .sort((a, b) => total(b) - total(a)).concat(OSTATNI[0]);
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = `600 ${theme.fontSize.axisLabel}px Roboto, sans-serif`;
      // An area runs to the plot's edge, and so does its last year's label.
      const m = { top: 24, right: o.area ? theme.margins.right : 8, bottom: 32, left: Math.ceil(d3.max(keys, k => ctx.measureText(labels[k]).width)) + 12 };
      const perUnit = o.plotH / (o.area ? o.top : d3.scaleLinear().domain([0, o.top]).nice().domain()[1]);
      // A row: its tallest bar, never less than its name needs, and a gap above.
      const rowHs = keys.map(k => Math.max(perUnit * (d3.max(data, d => d[k]) || 0), 14) + 8);
      const H = Math.max(boxH, Math.ceil(m.top + d3.sum(rowHs) + m.bottom));
      box.style('height', H + 'px');
      box.node().closest('.fuel-plot').style.minHeight = H > boxH ? H + 'px' : '';
      const inner = { w: W - m.left - m.right, h: H - m.top - m.bottom };
      const x = o.area ? d3.scaleLinear(o.xDomain, [0, inner.w])
        : d3.scaleBand(data.map(o.key), [0, inner.w])
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
        if (o.area) {
          // Area and line as in the small multiples; hovering a row marks the
          // nearest year.
          const y = d => -perUnit * d[k];
          row.append('path').datum(data).attr('fill', colors[k]).attr('opacity', CFG.areaOpacity)
            .attr('d', d3.area().x(d => x(o.key(d))).y0(0).y1(y));
          row.append('path').datum(data).attr('fill', 'none').attr('stroke', colors[k])
            .attr('stroke-width', CFG.lineWidth).attr('stroke-linejoin', 'round')
            .attr('d', d3.line().x(d => x(o.key(d))).y(y));
          const dot = row.append('circle').attr('r', 3.5).attr('fill', colors[k]).attr('opacity', 0);
          row.append('rect').attr('y', -rowHs[i]).attr('width', inner.w).attr('height', rowHs[i])
            .attr('fill', 'transparent')
            .on('mousemove', event => {
              const mx = d3.pointer(event)[0];
              const d = data[d3.leastIndex(data, r => Math.abs(x(o.key(r)) - mx))];
              dot.attr('cx', x(o.key(d))).attr('cy', y(d)).attr('opacity', 1);
              tip.show(head(o.label(d)) + plain(`${labels[k]}: ${o.fmt(d[k])}`)); tip.move(event);
            })
            .on('mouseleave', () => { dot.attr('opacity', 0); tip.hide(); });
          base -= rowHs[i];
          return;
        }
        row.selectAll('rect').data(data).join('rect')
          .attr('x', d => x(o.key(d))).attr('width', x.bandwidth())
          .attr('y', d => -perUnit * d[k]).attr('height', d => perUnit * d[k])
          .attr('fill', d => o.partial?.(d) ? '#fff' : colors[k])
          .attr('fill-opacity', d => o.partial?.(d) ? 0 : null)
          .on('mouseover', (event, d) => { tip.show(head(o.label(d)) + plain(`${labels[k]}: ${o.fmt(d[k])}`)); tip.move(event); })
          .on('mousemove', event => tip.move(event))
          .on('mouseleave', () => tip.hide())
          // A part-year: the empty bar keeps the hover, stripes over it.
          .filter(d => o.partial?.(d)).each(function() {
            const b = this.getBBox();
            fokHatch(row, b.x, b.y, b.width, b.height, colors[k]).attr('opacity', 0.5);
          });
        base -= rowHs[i];
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
      if (toggles.minisRows) {
        const data = share ? rows.map(d => ({ ...d, ...Object.fromEntries(keysOf(codes).map(k => [k, value(d, k)])) })) : rows;
        countryRows(sel, ['#chart-ropa-energie', '#chart-plyn-energie'], data, codes, {
          area: true, key: d => d.year, xDomain: [YEAR_FROM, lastYear],
          plotH: CFG.chartHeight - theme.margins.top - theme.margins.bottom, top: share ? 100 : maxPJ,
          unit: share ? '% dovozu' : 'PJ', fmt, label: d => yearName(d.year),
          ticks: colTicks(sel), tickFormat: String,
        });
        return;
      }
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
    // part-year hatched as in the whole chart, on the whole chart's scale.
    const yearCzk = c => toNewest.map(year => ({ year,
      ...czkByCountry(imports.filter(d => d.commodity === c && d.year === year), c === 'crude_oil' ? ROPA : PLYN) }));
    const yearCzkRows = { crude_oil: yearCzk('crude_oil'), natural_gas: yearCzk('natural_gas') };
    const yearSpendRows = (sel, commodity, codes) => () =>
      countryRows(sel, ['#chart-ropa-czk', '#chart-plyn-czk'], yearCzkRows[commodity], codes, {
        key: d => String(d.year), plotH: CFG.chartHeight - theme.margins.top - theme.margins.bottom, top: maxCzk, unit: 'mld. Kč', fmt: czkMld,
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

    // A column per month in the fuel's colour; toggles.spendByCountry swaps it
    // for a row per country (countryRows).
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
    const spendRows = (sel, commodity, codes) => () =>
      countryRows(sel, ['#chart-ropa-czk-mesice', '#chart-plyn-czk-mesice'],
        recent.map(d => ({ ...d, ...czkByCountry(ofMonth(commodity, d.year, d.month), codes) })), codes, {
          key: ymKey, plotH: CFG.chartHeight - theme.margins.top - theme.margins.bottom, top: spendTop, unit: 'mld. Kč', fmt: czkMld,
          label: d => `${monthLong(d.month)} ${d.year}`,
          ticks: recentJanuaries.map(ymKey), tickFormat: k => k.split('-')[0],
        });

    // Imports per month by country, as the run above draws them, in the
    // fuel's own unit (inUnit) on an axis of its own.
    const importMonths = (sel, commodity, codes, extra) => {
      const unit = commodity === 'crude_oil' ? 'tis. t' : 'TWh';
      const u = inUnit(recent.map(d => ({
        ...d, t: d.year + (d.month - 1) / 12, ...byCountry(ofMonth(commodity, d.year, d.month), codes),
      })), codes, unit);
      const top = d3.nice(0, d3.max(u.rows, totalPJ), 4)[1];
      return columnEnergy(sel, u.rows, codes, {
        x: d => d.t, markers: [INVASION], yLabel: unit,
        xTickValues: recentJanuaries.map(d => d.year), xFormat: String,
        yMax: top, yTickValues: d3.ticks(0, top, 4),
        tooltipHtml: bandsTip(codes, d => `${monthLong(d.month)} ${d.year}`, { fmt: u.fmt, pct: true }),
        ...extra,
      });
    };
    // Gas's 36 months of imports: June 2025, the peak, as storage fills for
    // the winter — onto the top of the stack, from text over the months
    // before it. The axis runs to 12 TWh, which leaves the text its room.
    const refillArrow = sel => arrowsFor(sel, {
      target: [2025 + 5 / 12, d3.sum(ofMonth('natural_gas', 2025, 6), d => toPJ(d.mass_kg, d.commodity)) * PER_PJ.TWh],
      textEnd: [2025.25, 11.3], side: 'left',
    });

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
      const lines = (CFG.showBenchmarks ? [['bench', BENCH_NAME[commodity], color]] : [])
        .concat(split ? keysOf(codes).map(k => [k, labels[k], colors[k]]) : [])
        .concat([['prumer', 'Průměr', split ? CFG.colorTotal : color]]);
      const top = priceTop(kind);
      const yearly = kind === 'years';
      return fokLineChart(sel, lines.flatMap(([key, series]) => rows.map(r => ({ ...r, series, price: r[key] }))), {
        multi: true, x: d => yearly ? d.year : d.t, y: d => d.price, legend: lines.length > 1,
        dashed: series => series === BENCH_NAME[commodity],
        yLabel: commodity === 'natural_gas' && CFG.gasGCV ? 'Kč/MWh spalného tepla' : 'Kč/MWh',
        yLabelInline: true, width: w, height: CFG.chartHeight,
        theme: { ...theme, colors: { ...theme.colors, categorical: lines.map(l => l[2]) } },
        yDomain: [0, top], yTickValues: d3.ticks(0, top, 4),
        xTickValues: yearly ? d3.range(YEAR_FROM, YEAR_TO + 1, isNarrow(sel) ? 2 : 1) : recentJanuaries.map(d => d.year),
        xFormat: String,
        yFormat: v => fokFormatNumber(v, 0),
        tooltipHtml: r => head(yearly ? r.year : `${monthLong(r.month)} ${r.year}`)
          + `<div style="font-family:${theme.font};font-weight:700">Průměr: ${kcMwh(r.prumer)}</div>`
          + (split ? keysOf(codes).filter(k => Number.isFinite(r[k])).reverse().map(k =>
              `<span style="color:${colors[k]}">■</span> ` + plain(`${labels[k]}: ${kcMwh(r[k])}`)).join('<br>') : '')
          + (Number.isFinite(r.bench) ? (split ? '<br>' : '') + `<span style="color:${color}">■</span> `
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
      metric: 'czk', fuel: 'both', split: false, step: 'months',
      tiles: false, bench: false, invasion: false, hormuz: false,
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
      both:        { gen: 'ropy a zemního plynu', acc: 'ropu a zemní plyn' },
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
      const period = { from: v.from, to: v.to, fromIdx: v.fromIdx, toIdx: v.toIdx };
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
      // Imports of one fuel are in its own unit (toolData), so on its own axis.
      const fuels = TOOL.metric === 'energy' && TOOL.fuel !== 'both' ? [TOOL.fuel] : both;
      const total = toolData(view(fuels, false)), countries = toolData(view(fuels, true));
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
        : toolMonths.filter(d => mIdx(d) >= v.fromIdx && mIdx(d) <= v.toIdx).map(d =>
            ({ ...d, x: d.year + (d.month - 1) / 12, key: ymKey(d), label: `${monthLong(d.month)} ${d.year}` }));
      const rowsIn = (c, p) => TOOL.step === 'years' ? yearGroups.get(c)?.get(p.year) ?? [] : ofMonth(c, p.year, p.month);
      const basis = c => c === 'natural_gas' && CFG.gasGCV ? NCV_PER_GCV : 1;
      let keys, colors, labels;
      if (v.byCountry) { keys = keysOf(v.codes); colors = colorsOf(v.codes); labels = labelsOf(v.codes); }
      else {
        keys = v.fuels;
        colors = Object.fromEntries(v.fuels.map(c => [c, fuelColor(c)]));
        labels = Object.fromEntries(v.fuels.map(c => [c, FUEL_NAME[c].label]));
      }
      const minMWh = TOOL.step === 'years' ? 12 * PRICE_MIN_MWH : PRICE_MIN_MWH;
      // Imports: both fuels together in PJ, the only unit they share; one fuel
      // in its own, as in the columns — crude by mass, gas in TWh (PER_PJ).
      const energyUnit = v.fuels.length > 1 ? 'PJ'
        : v.fuels[0] === 'natural_gas' ? 'TWh' : TOOL.step === 'years' ? 'mil. t' : 'tis. t';
      const perPJ = PER_PJ[energyUnit] ?? 1;
      const amount = rs => TOOL.metric === 'energy'
        ? d3.sum(rs, d => toPJ(d.mass_kg, d.commodity)) * perPJ : d3.sum(rs, d => d.value_mil_czk) / 1000;
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
        ...(v.bench ? (v.byCountry ? [['bench', BENCH_NAME[v.fuels[0]], fuelColor(v.fuels[0])]]
          : v.fuels.map(c => [`bench-${c}`, BENCH_NAME[c], fuelColor(c)])) : []),
        ...keys.map(k => [k, labels[k], colors[k]]),
        ...(v.byCountry ? [['prumer', 'Průměr', CFG.colorTotal]] : []),
      ];
      const unit = { energy: energyUnit, czk: 'mld. Kč',
        price: v.fuels.every(c => basis(c) !== 1) ? 'Kč/MWh spalného tepla' : 'Kč/MWh' }[TOOL.metric];
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
    const contextMarkers = (withLabels = true) => CONTEXT.filter(e => TOOL[e.option]).map(({ label, date: [y, m, d] }) => {
      const text = withLabels ? label : '';
      const dayOfYear = (Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 864e5;
      if (TOOL.metric !== 'czk') return { x: y + dayOfYear / 365, label: text };
      return TOOL.step === 'years' ? { band: String(y), offset: dayOfYear / 365, label: text }
        : { band: `${y}-${m}`, offset: (d - 1) / new Date(y, m, 0).getDate(), label: text };
    });

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
        .map(([key, label, color]) => ({ label, color, dashed: key.startsWith('bench') })), legendWidth, 4);
      // Room for the longest legend any view can have, so the chart keeps one
      // height whatever is picked and the page never jumps. The whole chart,
      // legend included, is CFG.toolAspect of its width (2:1) — but on a phone
      // that would leave the plot a sliver under the legend, hence the floor.
      const legendRoom = legendLayout([...Object.values(labelsOf(BOTH)), 'Průměr', ...Object.values(BENCH_NAME)]
        .map(label => ({ label })), legendWidth, 4).height;
      const height = Math.max(Math.round(w * CFG.toolAspect), 360);
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
        width: w, height, theme, margins: { bottom: theme.margins.bottom + legendRoom },
        yLabel: unit, yLabelInline: true, yFormat: x => fokFormatNumber(x, 0), legend: false, markers: contextMarkers(),
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
      // Hidden rows aren't redrawn and would keep the download id.
      d3.selectAll('#tool-svg').attr('id', null);
      chart.svg.attr('id', 'tool-svg');
      toolScale = { plotH: height - theme.margins.top - theme.margins.bottom - legendRoom, top };
      drawLegend(chart.svg, legend, height - legendRoom + 4, it => readable(it.color));

      // Title and summary: on the page, and in a saved file's header.
      const metricName = { energy: 'Dovoz', czk: 'Výdaje za', price: 'Průměrná dovozní cena' }[TOOL.metric];
      const fuelName = FUEL_NAME[TOOL.fuel][TOOL.metric === 'czk' ? 'acc' : 'gen'];
      // The period in regular (.chart-title-period), on the page and in a
      // saved file, which takes the span as a run of its own weight.
      const title = document.getElementById('tool-title');
      title.textContent = `${metricName} ${fuelName}${v.byCountry ? ' podle zemí' : ''}`;
      title.append(Object.assign(document.createElement('span'),
        { className: 'chart-title-period', textContent: `, ${periodText(v, true)}` }));
      document.getElementById('tool-summary').textContent = [
        { energy: { 'PJ': 'Energie v PJ', 'TWh': 'Energie v TWh spalného tepla' }[unit] ?? `Hmotnost v ${unit}`,
          czk: 'Celní hodnota v mld. Kč',
          price: `Celní hodnota dělená energetickým obsahem dovozu, v ${unit}` }[TOOL.metric]
          + (TOOL.step === 'years' ? ', roční' : ', měsíční') + (v.price ? ' průměry.' : ' součty.'),
        v.tiles ? 'Každá země zvlášť, na společné ose.' : '',
        TOOL.step === 'years' && idxYear(+toolTo.value) > lastFullYear ? `Rok ${lastFullYear + 1} je neúplný, ukazují ho měsíce.` : '',
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
        // The rows are one SVG, so the download buttons take them instead.
        d3.select('#tool-svg').attr('id', null);
        countryRows('#chart-tool-tiles', ['#chart-tool'], rows, v.codes, {
          key: d => d.key, plotH: toolScale.plotH, top: toolScale.top,
          unit, fmt, label: d => d.label, markers: contextMarkers(),
          ticks: TOOL.step === 'years' ? ticks.map(String) : ticks.map(y => `${y}-1`).filter(k => rows.some(r => r.key === k)),
          tickFormat: k => k.split('-')[0],
        }).attr('id', 'tool-svg');
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
          const series = v.bench ? [['bench', fuelColor(v.fuels[0])], [k, t.color]] : [[k, t.color]];
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

    // ── The route map: where the crude comes from, and how ──────────────────
    // Two crude pipelines enter Czechia: Družba, which brought Russia's oil,
    // and IKL from Ingolstadt, fed by TAL from the port of Trieste, where all
    // the rest lands by tanker. Customs data give the country of origin, not
    // the way the oil came, so each route is that rule drawn out, simplified:
    // the pipelines roughly as they run, the sea legs along open water.
    // Points are [lon, lat]; every route ends at MERO's tank farm, Nelahozeves.
    // A year from TOOL_FIRST to YEAR_TO is picked on a slider; "Přehrát rok"
    // plays it month by month, and "výdaje" adds squares for what was paid.
    const PIPELINES = {
      'Družba': [[52.3, 54.9], [50.1, 53.2], [45.0, 53.2], [39.5, 52.6], [34.4, 53.25], [32.7, 52.85],
        [29.25, 52.05], [25.15, 50.08], [22.3, 48.62], [20.3, 48.45], [17.9, 48.45], [16.9, 48.85],
        [16.0, 49.4], [14.3, 50.26]],
      TAL: [[13.78, 45.63], [12.97, 46.6], [12.5, 47.25], [12.17, 47.58], [12.0, 48.0], [11.43, 48.77]],
      IKL: [[11.43, 48.77], [12.1, 49.05], [12.47, 49.65], [13.4, 49.85], [14.3, 50.26]],
      BTC: [[49.47, 40.18], [44.8, 41.7], [42.9, 41.6], [41.27, 39.9], [39.5, 39.75], [37.0, 39.75],
        [36.9, 37.6], [35.83, 36.88]],
      CPC: [[53.45, 46.15], [51.9, 47.1], [47.9, 46.3], [44.3, 46.0], [40.57, 45.44], [37.77, 44.72]],
    };
    // Every tanker meets the others in the Ionian Sea, sails the Strait of
    // Otranto and the Adriatic to Trieste, and the oil goes on by TAL and IKL.
    const VIA_TRIESTE = [[18.6, 38.3], [18.9, 40.25], [17.6, 42.0], [15.6, 42.7], [14.5, 43.6], [13.1, 44.6],
      [13.2, 45.4], ...PIPELINES.TAL, ...PIPELINES.IKL.slice(1)];
    // Tankers from the Atlantic — Norway's, America's — come in by Gibraltar.
    const VIA_GIBRALTAR = [[-5.6, 35.96], [-3.0, 36.0], [1.0, 37.3], [8.0, 37.9], [11.5, 37.5], [13.0, 36.9],
      [15.5, 36.4], ...VIA_TRIESTE];
    // By supplier slug, as in ROPA; one without a route warns below.
    const ROUTES = {
      rusko: PIPELINES['Družba'],
      azerbajdzan: [...PIPELINES.BTC, [35.5, 36.45], [34.8, 35.95], [32.6, 35.7], [29.5, 35.5], [26.5, 34.6],
        [24.0, 34.6], [21.5, 36.2], ...VIA_TRIESTE],
      kazachstan: [...PIPELINES.CPC, [37.3, 44.45], [34.0, 43.6], [30.5, 42.3], [29.1, 41.25], [29.0, 41.0],
        [28.0, 40.75], [26.7, 40.4], [26.2, 40.02], [25.3, 39.0], [24.65, 38.05], [24.1, 37.65], [23.6, 36.9],
        [23.1, 36.05], [21.5, 36.6], ...VIA_TRIESTE],
      saudska_arabie: [[38.06, 24.09], [37.3, 24.6], [35.4, 26.0], [34.0, 27.5], [33.3, 28.5], [32.55, 29.95],
        [32.35, 30.6], [32.3, 31.3], [29.0, 33.0], [25.0, 34.3], [21.5, 36.0], ...VIA_TRIESTE],
      norsko: [[5.03, 60.81], [3.8, 60.0], [3.0, 57.0], [2.6, 53.5], [1.6, 51.0], [-1.0, 50.2], [-5.8, 48.5],
        [-9.8, 43.3], [-10.0, 39.0], [-9.4, 36.8], [-6.3, 36.0], ...VIA_GIBRALTAR],
      // From the Gulf of Mexico, far off the map: the band comes in off the Atlantic.
      usa: [[-12.5, 35.0], [-8.5, 35.6], ...VIA_GIBRALTAR],
      // Everyone else — Libya, Algeria, Nigeria, Iraq, … — by tanker as well:
      // a short band from no one place, joining the others in the Ionian Sea.
      ostatni: [[17.0, 35.0], ...VIA_TRIESTE],
    };
    keysOf(ROPA).filter(k => !ROUTES[k])
      .forEach(k => console.warn(`dovoz: crude from ${k} has no route on the map`));
    // Where routes share the way they run side by side, in this order from
    // left to right of travel — the order they come in, west to east — so no
    // band crosses another. Each is moved aside from the first point it shares.
    const STACK = ['norsko', 'usa', 'ostatni', 'saudska_arabie', 'azerbajdzan', 'kazachstan'];
    const ptKey = p => p.join();
    const JOINS = Object.fromEntries(Object.entries(ROUTES).map(([s, route]) => {
      const others = new Set(Object.entries(ROUTES).filter(([o]) => o !== s).flatMap(([, r]) => r.map(ptKey)));
      return [s, route.findIndex(p => others.has(ptKey(p)))];
    }));
    // Labels: a supplier's at its origin, a pipeline's beside a point of it.
    // The sides are mapLabel's.
    const ORIGIN_LABEL = { rusko: 'right', azerbajdzan: 'below end', kazachstan: 'below end',
      saudska_arabie: 'above start', norsko: 'right', usa: 'below start', ostatni: 'below' };
    const PIPELINE_LABEL = [['Družba', [39.5, 52.6], 'above'], ['TAL', [12.5, 47.25], 'left'],
      ['IKL', [12.47, 49.65], 'left'], ['BTC', [42.9, 41.6], 'above'], ['CPC', [44.3, 46.0], 'above']];
    const PJ_PER_PX = 15;   // band width: PJ a year per pixel, on a map 1000 px wide
    const MIN_PJ = 0.5;     // a supplier under this in a year is left off: stray consignments
    const SQUARE_MLD = 5;   // výdaje: mld. Kč a square — Russia, 2012–2025 played through, is ~120
    const MONTH_MS = 200;   // a month, playing
    // While the map plays, a glint runs along each band toward Czechia: layers
    // of faint white, each shorter, all ending at the head — the band's colour,
    // lightened most at the front. One every `every` px, `length` px long.
    const GLINT = { every: 90, length: 40, layers: 4, opacity: 0.15, speed: 160 };   // speed: px/s
    const TRIESTE = PIPELINES.TAL[0];

    // What the map shows: a year, or while it plays, up to a month of it.
    // A play runs from January of `since` to December of `until` — one year,
    // or every year — and the labels and squares count from its start.
    const MAP = { year: YEAR_TO, month: 0, spend: false, since: YEAR_TO, until: YEAR_TO };   // month 0: the whole year
    let playTimer, glintTimer;
    const mapView = () => {
      // Every month from January of y0 to month m of y1.
      const span = (y0, y1, m) => d3.range(y0, y1 + 1).flatMap(y =>
        d3.range(1, (y === y1 ? m : 12) + 1).flatMap(mm => ofMonth('crude_oil', y, mm)));
      const year = byCountry(span(MAP.year, MAP.year, 12), ROPA);
      const whole = span(MAP.since, MAP.until, 12);
      const sofar = span(MAP.since, MAP.year, MAP.month || 12);
      const total = byCountry(whole, ROPA);
      return {
        total,
        // Everyone the play reaches, so no label or squares leave mid-way.
        present: Object.keys(ROUTES).filter(s => total[s] >= MIN_PJ),
        // Band width: the year, or the month at its yearly rate (×12), so a
        // steady flow keeps its width as the map plays.
        flow: MAP.month ? byCountry(ofMonth('crude_oil', MAP.year, MAP.month), ROPA) : year,
        perYear: MAP.month ? 12 : 1,
        // Labels and squares: the year, or what came and was paid since the start.
        pj: byCountry(sofar, ROPA),
        czk: czkByCountry(sofar, ROPA),
        czkYear: czkByCountry(whole, ROPA),
      };
    };

    // A label beside a point: a line per [text, attributes], then, given
    // `squares`, that many squares in rows of ten. Haloed in white so it reads
    // across bands and borders; `gap` is how far it keeps off the point. Side:
    // above or below, centred on the point — or with "start"/"end", that edge
    // at it — or left or right, the first line level with the point.
    const mapLabel = (g, [x, y], spec, lines, { gap = 10, squares = 0, color } = {}) => {
      const LH = 15, SQ = 5, ROW = 10;
      const [side, align] = spec.split(' ');
      const anchor = align ?? { above: 'middle', below: 'middle', left: 'end', right: 'start' }[side];
      const x0 = x + ({ left: -gap, right: gap }[side] ?? { start: -6, end: 6 }[align] ?? 0);
      const textH = lines.length * LH;
      const gridH = squares ? 4 + Math.ceil(squares / ROW) * (SQ + 1) : 0;
      const top = side === 'above' ? y - gap - textH - gridH : side === 'below' ? y + gap : y - 7;
      const text = g.append('text').attr('text-anchor', anchor).attr('font-family', theme.font)
        .attr('stroke', '#fff').attr('stroke-width', 3).attr('stroke-linejoin', 'round').attr('paint-order', 'stroke');
      lines.forEach(([t, attrs], i) => {
        const span = text.append('tspan').attr('x', x0).attr('y', top + 11 + i * LH).text(t);
        Object.entries(attrs).forEach(([k, v]) => span.attr(k, v));
      });
      if (!squares) return;
      const gridW = Math.min(squares, ROW) * (SQ + 1) - 1;
      const left = { start: x0, middle: x0 - gridW / 2, end: x0 - gridW }[anchor];
      g.append('g').attr('fill', color).selectAll('rect').data(d3.range(squares)).join('rect')
        .attr('x', i => left + (i % ROW) * (SQ + 1)).attr('y', i => top + textH + 4 + Math.floor(i / ROW) * (SQ + 1))
        .attr('width', SQ).attr('height', SQ);
    };

    // A route on screen, shifted `off` px to the left of travel from its point
    // `from` on — where it joins the others — and mitred at the bends, so bands
    // side by side keep their width. Before, it runs on its own line, through
    // its pipeline; the curve eases it across.
    const unit = (a, b) => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; };
    const shifted = (proj, route, off, from) => {
      const p = route.map(proj), n = p.length;
      return p.map((pt, i) => {
        if (i < from) return pt;
        const a = unit(p[Math.max(i - 1, 0)], p[Math.max(i, 1)]);
        const b = unit(p[Math.min(i, n - 2)], p[Math.min(i + 1, n - 1)]);
        const t = unit([0, 0], [a[0] + b[0], a[1] + b[1]]);
        const o = off / Math.max(0.5, t[0] * a[0] + t[1] * a[1]);
        return [pt[0] + t[1] * o, pt[1] - t[0] * o];
      });
    };
    const curve = d3.line().curve(d3.curveCatmullRom.alpha(0.5));

    // The land and the pipelines, at the container's width; updateMap then
    // puts on the flows and labels, and redraws those alone as the map plays.
    let world, mapScene;   // the countries, once worldReady has them; the map as drawn
    const drawMap = w => {
      if (!world) return;
      const box = d3.select('#mapa-ropy').html('');
      // Framed on the routes, as tight as their labels allow.
      const PAD = 16;
      const routes = { type: 'MultiPoint', coordinates: Object.values(ROUTES).flat() };
      const proj = d3.geoAzimuthalEqualArea().rotate([-22, -46]).fitWidth(w - 2 * PAD, routes);
      const [[, y0], [, y1]] = d3.geoPath(proj).bounds(routes);
      proj.fitExtent([[PAD, PAD], [w - PAD, PAD + y1 - y0]], routes);
      // The library lets its SVGs overflow for axis labels; a map's land must not.
      const svg = fokResponsiveSVG(box, `0 0 ${w} ${Math.round(y1 - y0 + 2 * PAD)}`)
        .style('overflow', 'hidden')
        .attr('role', 'img').attr('aria-labelledby', 'mapa-ropy-title');
      svg.append('g').selectAll('path').data(world).join('path')
        .attr('d', d3.geoPath(proj))
        .attr('fill', d => +d.id === 203 ? '#c9d3df' : theme.axis.gridColor)   // 203: Česko
        .attr('stroke', '#fff').attr('stroke-width', 0.5);
      const flows = svg.append('g').attr('fill', 'none').attr('stroke-linejoin', 'round');
      // The pipelines over the bands: a thin line through them, which tells a
      // pipeline from a tanker's way — half-opaque, so even Russia's narrow
      // band still shows red under Družba's.
      svg.append('g').attr('fill', 'none').attr('stroke', theme.colors.grey).attr('stroke-width', 1)
        .attr('stroke-opacity', 0.55)
        .selectAll('path').data(Object.values(PIPELINES)).join('path')
        .attr('d', pts => curve(pts.map(proj)));
      // On a phone the suppliers' labels would pile up in the east, so they
      // go in a list under the map instead.
      mapScene = { proj, w, flows, labels: svg.append('g'),
        list: w < 560 ? box.append('ul').attr('class', 'route-list') : null };
      updateMap();
    };

    // Bands, glints and labels for MAP as it stands; `ms` eases the bands there.
    const updateMap = (ms = 0) => {
      if (!mapScene) return;
      const { proj, w, flows, labels, list } = mapScene;
      const v = mapView();
      const bandW = s => v.flow[s] > 0 ? Math.max(v.flow[s] * v.perYear / PJ_PER_PX * w / 1000, 1) : 0;
      const offset = {};
      let edge = d3.sum(STACK, bandW) / 2;
      STACK.forEach(s => { offset[s] = edge - bandW(s) / 2; edge -= bandW(s); });
      const pathOf = s => curve(STACK.includes(s) ? shifted(proj, ROUTES[s], offset[s], JOINS[s]) : ROUTES[s].map(proj));
      const ease = sel => ms ? sel.transition().duration(ms).ease(d3.easeLinear) : sel;

      // A group per supplier: its band and the glint's layers over it. The
      // year's biggest first, so a narrow band crossing a wide one stays on top.
      const groups = flows.selectAll('g')
        .data(v.present.slice().sort((a, b) => v.total[b] - v.total[a]), s => s)
        .join(enter => {
          const g = enter.append('g');
          g.append('path').attr('stroke', s => CFG[s]).attr('stroke-linecap', 'round');
          d3.range(1, GLINT.layers + 1).forEach(i => {
            const len = GLINT.length * i / GLINT.layers;
            g.append('path').attr('class', 'glint').attr('data-len', len)
              .attr('stroke', '#fff').attr('stroke-opacity', GLINT.opacity)
              .attr('stroke-dasharray', `${len} ${GLINT.every - len}`);
          });
          return g;
        })
        .order();
      groups.selectAll('.glint').attr('display', playTimer ? null : 'none');
      ease(groups.selectAll('path')).attr('d', pathOf).attr('stroke-width', bandW);

      labels.html('');
      const small = { 'font-size': theme.fontSize.axisLabel, fill: theme.colors.grey };
      const trunk = d3.sum(STACK, bandW) / 2;
      // On a phone the pipelines' names would crowd out the suppliers'.
      if (w >= 560) {
        PIPELINE_LABEL.forEach(([name, at, side]) =>
          mapLabel(labels, proj(at), side, [[name, { ...small, 'font-style': 'italic' }]],
            { gap: name === 'TAL' || name === 'IKL' ? trunk + 6 : 6 }));
      }
      labels.append('circle').attr('r', 3).attr('fill', theme.colors.grey)
        .attr('cx', proj(TRIESTE)[0]).attr('cy', proj(TRIESTE)[1]);
      mapLabel(labels, proj(TRIESTE), 'right', [['Terst', small]], { gap: trunk + 4 });
      const amount = s => `${fokFormatNumber(v.pj[s], 0)} PJ · ${fokFormatNumber(100 * v.pj[s] / v.pj.ropa_pj, 0)} %`;
      const squares = (s, czk = v.czk) => MAP.spend ? Math.round(czk[s] / SQUARE_MLD) : 0;
      v.present.forEach(s => {
        const at = proj(ROUTES[s][0]);
        const color = readable(CFG[s]);
        // Ostatní has no place of its own to mark.
        if (s !== OSTATNI[0]) labels.append('circle').attr('cx', at[0]).attr('cy', at[1]).attr('r', 4)
          .attr('fill', CFG[s]).attr('stroke', '#fff').attr('stroke-width', 1.5);
        if (!list) mapLabel(labels, at, ORIGIN_LABEL[s], [
          [labelsOf(ROPA)[s], { 'font-size': 13, 'font-weight': 700, fill: color }],
          [amount(s), small],
          ...(MAP.spend ? [[czkMld(v.czk[s]), small]] : []),
        ], { squares: squares(s), color });
      });
      // The phone's list, biggest first. Each row of squares keeps the room
      // the whole year's take, so the page stays put as the map plays.
      list?.selectAll('li').data(v.present.slice().sort((a, b) => v.total[b] - v.total[a])).join('li')
        .style('color', s => readable(CFG[s]))
        .html(s => `<b>${labelsOf(ROPA)[s]}</b> <span>${amount(s)}${MAP.spend ? ' · ' + czkMld(v.czk[s]) : ''}</span>`
          + (MAP.spend ? `<span class="route-squares" style="min-height:${Math.ceil(squares(s, v.czkYear) / 10) * 6}px">`
            + '<i></i>'.repeat(squares(s)) + '</span>' : ''));
      // Top left, over the Atlantic: the month while playing, the squares' key.
      if (MAP.month) labels.append('text').attr('x', 20).attr('y', 44)
        .attr('font-family', theme.font).attr('font-size', w < 600 ? 16 : 22).attr('font-weight', 700)
        .attr('fill', theme.colors.grey).text(`${monthLong(MAP.month)} ${MAP.year}`);
      if (MAP.spend) {
        const ky = MAP.month ? 66 : 36;
        labels.append('rect').attr('x', 20).attr('y', ky - 6).attr('width', 5).attr('height', 5)
          .attr('fill', theme.colors.grey);
        labels.append('text').attr('x', 30).attr('y', ky).attr('font-family', theme.font)
          .attr('font-size', theme.fontSize.axisLabel).attr('fill', theme.colors.grey)
          .text(`= ${fokFormatNumber(SQUARE_MLD, 0)} mld. Kč za ropu`);
      }
    };

    // The controls above the map: the year, playing one or all, and výdaje.
    const mapYear = document.getElementById('mapa-rok');
    const playButtons = { year: document.getElementById('mapa-play'), all: document.getElementById('mapa-play-all') };
    const PLAY_LABEL = { year: '▶ Přehrát rok', all: `▶ ${TOOL_FIRST}–${YEAR_TO}` };
    Object.assign(mapYear, { min: TOOL_FIRST, max: YEAR_TO, step: 1, value: YEAR_TO });
    const paintMapYear = () => {
      mapYear.value = MAP.year;
      document.getElementById('mapa-rok-value').textContent = MAP.year;
      document.getElementById('mapa-ropy-title').textContent = `Dovoz ropy podle země původu, ${MAP.year}`;
      mapYear.closest('.dual-range').style.setProperty('--to', (MAP.year - TOOL_FIRST) / (YEAR_TO - TOOL_FIRST));
    };
    paintMapYear();
    // Done playing — at the end or stopped — the map goes back to the year it is on.
    const stopMap = () => {
      playTimer?.stop();
      glintTimer?.stop();
      playTimer = glintTimer = null;
      Object.assign(MAP, { month: 0, since: MAP.year, until: MAP.year });
      Object.entries(playButtons).forEach(([k, b]) => { b.setAttribute('aria-pressed', 'false'); b.textContent = PLAY_LABEL[k]; });
      updateMap(MONTH_MS);
    };
    Object.entries(playButtons).forEach(([kind, button]) => button.addEventListener('click', () => {
      if (playTimer) { stopMap(); return; }
      button.setAttribute('aria-pressed', 'true');
      button.textContent = '■ Zastavit';
      if (kind === 'all') Object.assign(MAP, { year: TOOL_FIRST, since: TOOL_FIRST, until: YEAR_TO });
      MAP.month = 1;
      paintMapYear();
      playTimer = d3.interval(() => {
        if (MAP.month === 12 && MAP.year === MAP.until) { stopMap(); return; }
        if (MAP.month === 12) { MAP.year += 1; MAP.month = 1; paintMapYear(); } else MAP.month += 1;
        updateMap(MONTH_MS);
      }, MONTH_MS);
      // Every layer's head at the same distance, moving on with the time.
      glintTimer = d3.timer(t => mapScene?.flows.selectAll('.glint')
        .attr('stroke-dashoffset', function () { return this.dataset.len - t / 1000 * GLINT.speed; }));
      updateMap(MONTH_MS);
    }));
    mapYear.addEventListener('input', () => {
      Object.assign(MAP, { year: +mapYear.value, since: +mapYear.value, until: +mapYear.value });
      paintMapYear();
      if (playTimer) stopMap(); else updateMap();
    });
    document.getElementById('mapa-vydaje').addEventListener('change', e => {
      MAP.spend = e.target.checked;
      updateMap();
    });

    // Each entry draws into its container at that container's own width;
    // hidden containers measure 0 and are skipped. Built per draw, so the
    // colours are whatever CFG holds now.
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
          yLabel: 'mld. Kč', yLabelInline: CFG.kpiUnitInline,
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
        // Comparisons switched on in the sidebar join as faint lines for scale —
        // listed first, so they are drawn behind the imports' line.
        const lines = [
          [CFG.showDefense, 'Výdaje na obranu', 'defense_pct', CFG.colorDefense],
          [CFG.showMsmt, 'Výdaje na školství (rozpočet MŠMT)', 'msmt_pct', CFG.colorMsmt],
          [CFG.showSfdi, 'Výdaje na dopravní infrastrukturu (rozpočet SFDI)', 'sfdi_pct', CFG.colorSfdi],
        ].filter(([shown]) => shown).map(([, ...line]) => line)
          .concat([['Ropa a zemní plyn', 'gdp_share_pct', CFG.colorGdp]]);
        const compared = lines.length > 1;
        // Labels on the lines instead of a legend, each where its line has
        // room: imports right of their 2022 peak, level with its top; MŠMT
        // over its line on the left, its halo cutting the line; SFDI under its
        // line on the right (above it runs the imports'). x in years, y in
        // % HDP: the last row's baseline. Defence has none.
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
            lineLabels: Object.fromEntries(lines.filter(([series]) => lineLabels[series])
              .map(([series, , color]) => [series, { ...lineLabels[series], color: readable(color) }])),
            yLabel: '% HDP', yLabelInline: CFG.kpiUnitInline,
            width: w, height: kpiHeight(), margins: kpiMargins,
            theme: { ...theme, colors: { ...theme.colors, categorical: lines.map(l => l[2]) } },
            xTickValues: xTicks, xFormat: String,
            yDomain: [0, 5], yTickValues: d3.range(0, 6), yFormat: v => fokFormatNumber(v, 0),
            tooltipHtml: d => head(d.year) + lines.slice().reverse().map(([series, field]) =>
              plain(`${compared ? series + ': ' : ''}${fokFormatNumber(d[field], 1)} % HDP`)).join('<br>'),
          });
      }],

      // The series peaks just under 700 PJ (2019), so the axis runs to 800:
      // labels every 200, grid every 100.
      // All five countries in one line above the chart, at 11 px: their
      // swatches and names take ~299 of the card's 321 px, so the items spread
      // over the full width (at least 4 px apart) and wrap only on a narrower
      // card. With a legend this chart keeps its height; the other two grow
      // into its row (levelKpi).
      ['#chart-celkem-energie', energy('#chart-celkem-energie', energie, FOSIL, {
        yMax: 800, yTickValues: d3.range(0, 801, 200), yGridValues: d3.range(0, 801, 100),
        yLabelInline: CFG.kpiUnitInline, margins: kpiMargins, height: kpiHeight(0),
        legendOptions: { ...kpiLegend, fontSize: 11, itemSpacing: 4, justify: 'space-between' },
      })],

      ['#chart-ropa-czk',     money('#chart-ropa-czk', ropa.czk, CFG.colorRopa)],
      ['#chart-ropa-energie', fuelEnergy('#chart-ropa-energie', ropa.energie, ROPA,
        { unit: 'mil. t', top: 10, step: 2 },
        { arrows: russiaEndNote('#chart-ropa-energie', 9.2) })],
      // The 2022 peak, pointed out (fokArrow): from the text right of the bar
      // down onto its top.
      ['#chart-plyn-czk',     money('#chart-plyn-czk', plyn.czk, CFG.colorPlyn, {
        arrows: arrowsFor('#chart-plyn-czk', {
          target: [2022, plyn.czk.find(d => d.year === 2022).czk_mld],
          textEnd: [2022.8, 270],
        }),
      })],
      ['#chart-plyn-energie', fuelEnergy('#chart-plyn-energie', plyn.energie, PLYN,
        { unit: 'TWh', top: 140, step: 20 },
        { arrows: russiaEndNote('#chart-plyn-energie', 125) })],
      ['#chart-ropa-czk-roky', yearSpendRows('#chart-ropa-czk-roky', 'crude_oil', ROPA)],
      ['#chart-plyn-czk-roky', yearSpendRows('#chart-plyn-czk-roky', 'natural_gas', PLYN)],
      ['#chart-ropa-mini',    minis('#chart-ropa-mini', ropa.energie, ROPA)],
      ['#chart-plyn-mini',    minis('#chart-plyn-mini', plyn.energie, PLYN)],
      ['#chart-ropa-czk-mesice',     spendMonths('#chart-ropa-czk-mesice', 'crude_oil', CFG.colorRopa,
        { arrows: hormuzArrow('#chart-ropa-czk-mesice', 'crude_oil') })],
      ['#chart-plyn-czk-mesice',     spendMonths('#chart-plyn-czk-mesice', 'natural_gas', CFG.colorPlyn)],
      ['#chart-ropa-czk-tiles',      spendRows('#chart-ropa-czk-tiles', 'crude_oil', ROPA)],
      ['#chart-plyn-czk-tiles',      spendRows('#chart-plyn-czk-tiles', 'natural_gas', PLYN)],
      ['#chart-ropa-energie-mesice', importMonths('#chart-ropa-energie-mesice', 'crude_oil', ROPA)],
      ['#chart-plyn-energie-mesice', importMonths('#chart-plyn-energie-mesice', 'natural_gas', PLYN, {
        yMax: 12, yTickValues: d3.range(0, 13, 2), arrows: refillArrow('#chart-plyn-energie-mesice'),
      })],
      ['#chart-ropa-cena',           price('#chart-ropa-cena', 'years', 'crude_oil', ROPA, CFG.colorRopa)],
      ['#chart-plyn-cena',           price('#chart-plyn-cena', 'years', 'natural_gas', PLYN, CFG.colorPlyn)],
      ['#chart-ropa-cena-mesice',    price('#chart-ropa-cena-mesice', 'months', 'crude_oil', ROPA, CFG.colorRopa)],
      ['#chart-plyn-cena-mesice',    price('#chart-plyn-cena-mesice', 'months', 'natural_gas', PLYN, CFG.colorPlyn)],
      ['#chart-tool',         toolChart],
      ['#chart-tool-tiles',   toolTiles],
      ['#mapa-ropy',          drawMap],
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
      theme = makeTheme();
      // Before measuring: these decide which charts show at all.
      // A class per reader toggle, for the CSS that swaps a chart for its tiles.
      Object.entries(toggles).forEach(([key, on]) => document.body.classList.toggle(`tiles-${key}`, on));
      document.body.classList.toggle('tiles-toolTiles', toolView().tiles);
      document.querySelectorAll('.fuel-plot').forEach(p => { p.style.minHeight = ''; });
      document.body.classList.toggle('span-long', span === 'long');
      document.body.classList.toggle('span-recent', span === 'recent');
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
      levelKpi();
    };
    window.DOVOZ_REDRAW = drawAll;
    // The collapsed explorer and map have no width, so drawAll skips them;
    // draw them once opened.
    $('#nastroj-collapse, #mapa-collapse').on('shown.bs.collapse', drawAll);
    // ponytail: any control redraws every chart, not just its own — cheap here.
    drawAll();
    // The left margins are measured in Roboto: once it loads, again.
    document.fonts.ready.then(drawAll);
    // A font arriving after the last draw can rewrap a KPI legend; the row's
    // size changes with it, and levelKpi follows.
    new ResizeObserver(levelKpi).observe(document.getElementById('main-charts'));
    worldReady.then(features => { world = features; drawAll(); })
      .catch(err => console.error('dovoz: map failed to load', err));

    // Redrawing is the only way to resize: the width is baked into the viewBox.
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawAll, 200);
    });
  }
});
