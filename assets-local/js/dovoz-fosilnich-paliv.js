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
document.addEventListener('DOMContentLoaded', () => {
  const DATA = '/assets-local/files/dovoz-fosilnich-paliv';

  // The source runs 1999–2026, but 2026 is a part-year (its monthly companion
  // stops at month 7) and has no GDP figure, so it would read as a collapse in
  // imports. Widen this once the year closes.
  const YEAR_FROM = 2017;
  const YEAR_TO   = 2025;

  // Which suppliers get a band of their own, in stack order, bottom first;
  // every other country code falls into Ostatní. Grey is reserved for Ostatní,
  // so no named band can be mistaken for the leftovers.
  const ROPA = {
    RU: ['rusko',          'Rusko',          '#d73027'],
    AZ: ['azerbajdzan',    'Ázerbájdžán',    '#73d5d6'],
    KZ: ['kazachstan',     'Kazachstán',     '#e07b00'],
    NO: ['norsko',         'Norsko',         '#2b2b9e'],
    SA: ['saudska_arabie', 'Saúdská Arábie', '#f0c030'],
    US: ['usa',            'USA',            '#7f6a9e'],
  };
  const PLYN = {
    RU: ['rusko',    'Rusko',    '#d73027'],
    NO: ['norsko',   'Norsko',   '#2b2b9e'],
    DE: ['nemecko',  'Německo',  '#8aa0b5'],
    // Eurostat's "country not specified" code — a third of the 2025 gas bill,
    // so it is named rather than folded into Ostatní. Slate, because it is the
    // one band that stands for an absence rather than for a supplier.
    QU: ['neurceno', 'Neurčená země', '#5b6470'],
  };
  const OSTATNI = ['ostatni', 'Ostatní', '#c7ccd1'];

  // Primary energy, stack order bottom first. The two imported fossil bands are
  // the subject of the page and carry the fuel colours; everything else is grey,
  // so the chart reads as "this much of our energy is shipped in".
  const ENERGIE = {
    dovoz_ropy:    ['Dovoz ropy',          '#bd3d52'],
    dovoz_plynu:   ['Dovoz plynu',         '#ff7773'],
    pevna_paliva:  ['Dovoz pevných paliv', '#ffbab8'],
    domace_fos:    ['Domácí fos. paliva',  '#ffdbda'],
    jaderne_teplo: ['Jaderné teplo',       '#b5bcc4'],
    oze:           ['OZE',                 '#d8dde2'],
  };
  const ENERGIE_KEYS = Object.keys(ENERGIE);

  const keysOf   = m => Object.values(m).map(v => v[0]).concat(OSTATNI[0]);
  const labelsOf = m => Object.fromEntries(Object.values(m).concat([OSTATNI]).map(v => [v[0], v[1]]));
  const colorsOf = m => Object.fromEntries(Object.values(m).concat([OSTATNI]).map(v => [v[0], v[2]]));

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

  const years = d3.range(YEAR_FROM, YEAR_TO + 1);

  /** Totals and country shares per year for one commodity. Shares are shares of
   *  mass, matching the "% objemu" axis the bands are drawn against. */
  function aggregate(rows, commodity, codes) {
    const byYear = d3.group(
      rows.filter(d => d.commodity === commodity && d.year >= YEAR_FROM && d.year <= YEAR_TO),
      d => d.year);
    const keys = keysOf(codes);
    return {
      keys,
      rows: years.map(year => {
        const rs = byYear.get(year) ?? [];
        const kg = d3.sum(rs, d => d.mass_kg);
        const shares = Object.fromEntries(keys.map(k => [k, 0]));
        rs.forEach(d => { shares[(codes[d.country_code] ?? OSTATNI)[0]] += d.mass_kg; });
        if (kg) keys.forEach(k => { shares[k] = 100 * shares[k] / kg; });
        return {
          year,
          czk_mld: d3.sum(rs, d => d.value_mil_czk) / 1000,
          mt: kg / 1e9,
          shares,
        };
      }),
    };
  }

  // primary-energy.csv opens with "#" notes on where its numbers came from and
  // d3's parser has no comment syntax, so they are stripped before parsing.
  const csvWithNotes = (url, row) =>
    d3.text(url).then(t => d3.csvParse(t.replace(/^#.*(\r?\n)/gm, ''), row));

  Promise.all([
    d3.csv(`${DATA}/imports-annual.csv`, importRow),
    d3.csv(`${DATA}/gdp.csv`, d => [+d.year, +d.value_mil_czk]),
    csvWithNotes(`${DATA}/primary-energy.csv`, d => {
      const row = { year: +d.year };
      ENERGIE_KEYS.forEach(k => { row[k] = +d[k]; });
      return row;
    }),
  ]).then(([imports, gdp, energie]) => {
    const ropa = aggregate(imports, 'crude_oil', ROPA);
    const plyn = aggregate(imports, 'natural_gas', PLYN);
    const gdpByYear = new Map(gdp);

    const payments = years.map((year, i) => {
      const total = ropa.rows[i].czk_mld + plyn.rows[i].czk_mld;
      return {
        year,
        ropa_czk_mld: ropa.rows[i].czk_mld,
        plyn_czk_mld: plyn.rows[i].czk_mld,
        total_czk_mld: total,
        gdp_share_pct: 100 * total * 1000 / gdpByYear.get(year),
      };
    });

    // Catches a malformed drop-in export: every year's bands have to add up, and
    // every year needs a GDP figure to divide by.
    [ropa, plyn].forEach(f => f.rows.forEach(r => {
      const sum = d3.sum(Object.values(r.shares));
      if (Math.abs(sum - 100) > 0.1) console.warn(`dovoz: ${r.year} shares sum to ${sum}`);
    }));
    years.filter(y => !gdpByYear.has(y))
      .forEach(y => console.warn(`dovoz: no GDP for ${y}`));

    render({ ropa, plyn, payments, energie });
  }).catch(err => console.error('dovoz: data failed to load', err));

  function render({ ropa, plyn, payments, energie }) {
    const last = payments[payments.length - 1];
    // The rows sum to ~99.2, not 100, so the headline share is taken against
    // each year's own total — the same normalisation the chart applies.
    const lastEnergie = energie[energie.length - 1];
    const energieTotal = d3.sum(ENERGIE_KEYS, k => lastEnergie[k]);
    const importedPct = 100 * (lastEnergie.dovoz_ropy + lastEnergie.dovoz_plynu) / energieTotal;
    document.getElementById('data-year').textContent = `Rok ${YEAR_TO}`;
    document.getElementById('kpi-total').textContent =
      fokFormatNumber(last.total_czk_mld, 1) + ' mld. Kč';
    document.getElementById('kpi-gdp').textContent =
      fokFormatNumber(last.gdp_share_pct, 1) + ' % HDP';
    document.getElementById('kpi-energy').textContent =
      fokFormatNumber(importedPct, 0) + ' %';

    // The two fuels, wherever they are drawn side by side. Deliberately not
    // ROPA.RU's red — ropa and Rusko appear in charts a screen apart and must
    // not read as the same series.
    const COLOR_ROPA = '#bd3d52';
    const COLOR_PLYN = '#ff7773';

    const theme = { ...FoKTheme, line: { ...FoKTheme.line, strokeWidth: 2 } };
    // A line chart takes its colour from categorical[0], not from colors.primary.
    const lineTheme = c => ({
      ...theme,
      colors: { ...FoKTheme.colors, categorical: [c, ...FoKTheme.colors.categorical.slice(1)] },
    });

    // Every other year, so the labels never collide once the panels are narrow.
    const xTicks = years.filter((_, i) => i % 2 === 0);
    const czkMld = d => `${fokFormatNumber(d, 1)} mld. Kč`;
    const head   = y => `<strong style="font-family:${theme.font}">${y}</strong><br>`;
    const plain  = s => `<span style="font-family:${theme.font}">${s}</span>`;

    // Ropa and plyn are meant to be read against each other, so their money and
    // volume charts share one scale each rather than each picking its own.
    const both   = ropa.rows.concat(plyn.rows);
    const maxCzk = Math.ceil(d3.max(both, d => d.czk_mld) / 50) * 50;
    const maxMt  = Math.ceil(d3.max(both, d => d.mt));

    const shareRows = fuel => fuel.rows.map(d => ({ year: d.year, ...d.shares }));

    const money = (sel, fuel, color) => w => fokBarChart(sel, fuel.rows, {
      x: d => String(d.year), y: d => d.czk_mld,
      color, title: 'Výdaje', yLabel: 'mld. Kč',
      width: w, height: 260, theme,
      yDomain: [0, maxCzk], yTicks: 4,
      xTickValues: xTicks.map(String),
      yFormat: v => fokFormatNumber(v, 0),
      tooltipHtml: d => head(d.year) + plain(czkMld(d.czk_mld)),
    });

    const volume = (sel, fuel, color) => w => fokLineChart(sel, fuel.rows, {
      x: d => d.year, y: d => d.mt, area: true,
      title: 'Objem', yLabel: 'Mt',
      width: w, height: 260, theme: lineTheme(color),
      yDomain: [0, maxMt], yTicks: 4,
      xTickValues: xTicks, xFormat: String,
      yFormat: v => fokFormatNumber(v, 0),
      tooltipHtml: d => head(d.year) + plain(`${fokFormatNumber(d.mt, 2)} Mt`),
    });

    const origin = (sel, fuel, codes, title) => w => fokAreaChartStacked(sel, shareRows(fuel), {
      x: d => d.year, keys: fuel.keys,
      colors: colorsOf(codes), labels: labelsOf(codes),
      proportional: true, title, yLabel: '% objemu',
      width: w, height: 380, theme, legend: true,
      xTickValues: xTicks, xFormat: String,
    });

    // Each entry draws into its container at that container's own width.
    const CHARTS = [
      ['#chart-celkem-czk', w => fokBarChartStacked('#chart-celkem-czk',
        payments.map(d => ({ year: String(d.year), ropa: d.ropa_czk_mld, plyn: d.plyn_czk_mld })), {
          x: d => d.year,
          keys: ['ropa', 'plyn'],
          colors: { ropa: COLOR_ROPA, plyn: COLOR_PLYN },
          labels: { ropa: 'Ropa', plyn: 'Zemní plyn' },
          title: 'Výdaje za ropu a plyn', yLabel: 'mld. Kč',
          width: w, height: 260, theme,
          xTickValues: xTicks.map(String),
          yFormat: v => fokFormatNumber(v, 0),
          tooltipHtml: (raw, key) => head(raw.year)
            + `<span style="color:${key === 'ropa' ? COLOR_ROPA : COLOR_PLYN}">■</span> `
            + plain(`${key === 'ropa' ? 'Ropa' : 'Zemní plyn'}: ${czkMld(raw[key])}`),
        })],

      ['#chart-celkem-hdp', w => fokLineChart('#chart-celkem-hdp', payments, {
        x: d => d.year, y: d => d.gdp_share_pct,
        title: 'Podíl na HDP Česka', yLabel: '% HDP',
        width: w, height: 260, theme: lineTheme(COLOR_ROPA),
        xTickValues: xTicks, xFormat: String,
        yFormat: v => fokFormatNumber(v, 1),
        tooltipHtml: d => head(d.year) + plain(`${fokFormatNumber(d.gdp_share_pct, 1)} % HDP`),
      })],

      ['#chart-celkem-energie', w => fokAreaChartStacked('#chart-celkem-energie', energie, {
        x: d => d.year, keys: ENERGIE_KEYS,
        colors: Object.fromEntries(Object.entries(ENERGIE).map(([k, v]) => [k, v[1]])),
        labels: Object.fromEntries(Object.entries(ENERGIE).map(([k, v]) => [k, v[0]])),
        proportional: true, title: 'Podíl na primární energii', yLabel: '%',
        width: w, height: 260, theme, legend: true,
        xTickValues: xTicks, xFormat: String,
      })],

      ['#chart-ropa-czk',  money('#chart-ropa-czk',  ropa, COLOR_ROPA)],
      ['#chart-ropa-kg',   volume('#chart-ropa-kg',  ropa, COLOR_ROPA)],
      ['#chart-ropa-zeme', origin('#chart-ropa-zeme', ropa, ROPA, 'Odkud Česko dováží ropu')],
      ['#chart-plyn-czk',  money('#chart-plyn-czk',  plyn, COLOR_PLYN)],
      ['#chart-plyn-kg',   volume('#chart-plyn-kg',  plyn, COLOR_PLYN)],
      ['#chart-plyn-zeme', origin('#chart-plyn-zeme', plyn, PLYN, 'Odkud Česko dováží zemní plyn')],
    ];

    const drawAll = () => CHARTS.forEach(([sel, draw]) => {
      const w = Math.round(document.querySelector(sel).getBoundingClientRect().width);
      if (w > 0) draw(w);
    });

    drawAll();

    // Redrawing is the only way to resize: the width is baked into the viewBox.
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawAll, 200);
    });
  }
});
