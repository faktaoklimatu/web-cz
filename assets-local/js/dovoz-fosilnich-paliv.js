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
  // every other country code falls into Ostatní — including Eurostat's
  // "country not specified" codes (QU, QV). Grey is reserved for Ostatní,
  // so no named band can be mistaken for the leftovers.
  const ROPA = {
    RU: ['rusko',          'Rusko',          '#805828'],
    AZ: ['azerbajdzan',    'Ázerbájdžán',    '#cc9446'],
    KZ: ['kazachstan',     'Kazachstán',     '#eeca53'],
    NO: ['norsko',         'Norsko',         '#377e7c'],
    SA: ['saudska_arabie', 'Saúdská Arábie', '#60a476'],
    US: ['usa',            'USA',            '#92cbc1'],
  };
  const PLYN = {
    RU: ['rusko',    'Rusko',    '#805828'],
    NO: ['norsko',   'Norsko',   '#377e7c'],
    DE: ['nemecko',  'Německo',  '#8aa0b5'],
  };
  const OSTATNI = ['ostatni', 'Ostatní', '#c7ccd1'];

  // Both fuels together, as energy rather than as tonnes or crowns. The suppliers
  // of the two are merged and cut to the four biggest, because the per-fuel
  // charts further down hold the detail. Colours are the ones the fuel charts
  // already use, so a country reads the same everywhere.
  const FOSIL = {
    RU: ['rusko',       'Rusko',         '#805828'],
    AZ: ['azerbajdzan', 'Ázerbájdžán',   '#cc9446'],
    NO: ['norsko',      'Norsko',        '#377e7c'],
    KZ: ['kazachstan',  'Kazachstán',    '#eeca53'],
  };

  // Net calorific values in TJ/Gg, which is the same number as GJ per tonne.
  // Mass is the only energy-bearing column in the customs data, so this is what
  // puts a tonne of crude and a tonne of gas on one scale. Gas is the IPCC 2006
  // default (vol. 2, table 1.2); crude is 42.6 rather than that table's 42.3.
  const NCV = { crude_oil: 42.6, natural_gas: 48.0 };
  const toPJ = (kg, commodity) => kg * NCV[commodity] * 1e-9;

  // The line along the top of every by-country stack: the year's total.
  const COLOR_TOTAL = '#3e3e4c';

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
  const inWindow = d => d.year >= YEAR_FROM && d.year <= YEAR_TO;

  /** What one commodity cost per year, in mld. Kč. */
  function spending(rows, commodity) {
    const byYear = d3.rollup(rows.filter(d => d.commodity === commodity && inWindow(d)),
      rs => d3.sum(rs, d => d.value_mil_czk) / 1000, d => d.year);
    return years.map(year => ({ year, czk_mld: byYear.get(year) ?? 0 }));
  }

  /** Imports per year in PJ, split by country of origin. Each row also carries
   *  the two fuels' own totals: the bands answer "from where", the totals
   *  answer "how much of which", and the tooltip shows both. The chart only
   *  reads the country keys, so the extra fields are ignored there. */
  function energyByCountry(rows, codes) {
    const keys = keysOf(codes);
    const byYear = d3.group(rows.filter(inWindow), d => d.year);
    return years.map(year => {
      const out = Object.fromEntries(keys.map(k => [k, 0]));
      out.year = year;
      out.ropa_pj = 0;
      out.plyn_pj = 0;
      (byYear.get(year) ?? []).forEach(d => {
        const pj = toPJ(d.mass_kg, d.commodity);
        out[(codes[d.country_code] ?? OSTATNI)[0]] += pj;
        if (d.commodity === 'crude_oil') out.ropa_pj += pj;
        else out.plyn_pj += pj;
      });
      return out;
    });
  }

  Promise.all([
    d3.csv(`${DATA}/imports-annual.csv`, importRow),
    d3.csv(`${DATA}/gdp.csv`, d => [+d.year, +d.value_mil_czk]),
  ]).then(([imports, gdp]) => {
    const ofFuel = c => imports.filter(d => d.commodity === c);
    const ropa = {
      czk: spending(imports, 'crude_oil'),
      energie: energyByCountry(ofFuel('crude_oil'), ROPA),
    };
    const plyn = {
      czk: spending(imports, 'natural_gas'),
      energie: energyByCountry(ofFuel('natural_gas'), PLYN),
    };
    const gdpByYear = new Map(gdp);

    const payments = years.map((year, i) => {
      const total = ropa.czk[i].czk_mld + plyn.czk[i].czk_mld;
      return {
        year,
        ropa_czk_mld: ropa.czk[i].czk_mld,
        plyn_czk_mld: plyn.czk[i].czk_mld,
        total_czk_mld: total,
        gdp_share_pct: 100 * total * 1000 / gdpByYear.get(year),
      };
    });

    // Catches a malformed drop-in export: every year needs a GDP figure to
    // divide by.
    years.filter(y => !gdpByYear.has(y))
      .forEach(y => console.warn(`dovoz: no GDP for ${y}`));

    render({ ropa, plyn, payments, energie: energyByCountry(imports, FOSIL) });
  }).catch(err => console.error('dovoz: data failed to load', err));

  function render({ ropa, plyn, payments, energie }) {
    const lastOf = rows => rows[rows.length - 1];
    const totalPJ = row => row.ropa_pj + row.plyn_pj;
    const setText = (id, text) => { document.getElementById(id).textContent = text; };

    // Every KPI speaks for the last complete year.
    document.querySelectorAll('.kpi-label')
      .forEach(el => { el.textContent += ` (${YEAR_TO})`; });

    setText('kpi-total',  fokFormatNumber(lastOf(payments).total_czk_mld, 1) + ' mld. Kč');
    setText('kpi-gdp',    fokFormatNumber(lastOf(payments).gdp_share_pct, 1) + ' % HDP');
    setText('kpi-energy', fokFormatNumber(totalPJ(lastOf(energie)), 0) + ' PJ');

    // The two fuels, wherever they are drawn side by side. Reds, kept apart from
    // the countries' greens and browns — ropa and Rusko appear in charts a screen
    // apart and must not read as the same series.
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
    const pj     = d => `${fokFormatNumber(d, 1)} PJ`;
    const head   = y => `<strong style="font-family:${theme.font}">${y}</strong><br>`;
    const plain  = s => `<span style="font-family:${theme.font}">${s}</span>`;

    // Ropa and plyn are meant to be read against each other, so their money and
    // energy charts share one scale each rather than each picking its own.
    const maxCzk = Math.ceil(d3.max(ropa.czk.concat(plyn.czk), d => d.czk_mld) / 50) * 50;
    const maxPJ  = Math.ceil(d3.max(ropa.energie.concat(plyn.energie), totalPJ) / 100) * 100;

    const money = (sel, rows, color) => w => fokBarChart(sel, rows, {
      x: d => String(d.year), y: d => d.czk_mld,
      color, title: 'Výdaje', yLabel: 'mld. Kč',
      width: w, height: 260, theme,
      yDomain: [0, maxCzk], yTicks: 4,
      xTickValues: xTicks.map(String),
      yFormat: v => fokFormatNumber(v, 0),
      tooltipHtml: d => head(d.year) + plain(czkMld(d.czk_mld)),
    });

    // Stacked by country of origin, with the year's total drawn on top. The
    // library's own tooltip lists the bands but not what they add up to, which
    // is what the line is for. Same shape as the default — topmost band first —
    // then, where both fuels are stacked together, the split the stack hides,
    // because the bands answer "from where" and say nothing about which fuel.
    const energy = (sel, rows, codes, extra) => w => {
      const keys = keysOf(codes), colors = colorsOf(codes), labels = labelsOf(codes);
      return fokAreaChartStacked(sel, rows, {
        x: d => d.year, keys, colors, labels,
        yLabel: 'PJ', totalLine: COLOR_TOTAL,
        width: w, height: 260, theme, legend: true,
        xTickValues: xTicks, xFormat: String,
        yFormat: v => fokFormatNumber(v, 0),
        ...extra,
        tooltipHtml: row => head(row.year)
          + keys.slice().reverse().map(k =>
              `<span style="color:${colors[k]}">■</span> `
              + plain(`${labels[k]}: ${pj(row[k])}`)).join('<br>')
          + `<div style="font-family:${theme.font};margin-top:4px;padding-top:4px;`
          + `border-top:1px solid ${theme.colors.gridLine}">`
          + (codes === FOSIL ? `Ropa: ${pj(row.ropa_pj)}<br>Zemní plyn: ${pj(row.plyn_pj)}` : '')
          + `<div style="font-weight:700">Celkem: ${pj(totalPJ(row))}</div>`
          + `</div>`,
      });
    };
    const fuelTicks = d3.range(0, maxPJ + 1, 100);
    const fuelEnergy = (sel, rows, codes) => energy(sel, rows, codes, {
      title: 'Dovoz', yMax: maxPJ, yTickValues: fuelTicks,
    });

    // Variant 2 splits that chart in two: how much, in the fuel's own colour on
    // the same scale, and from where, as shares of each year's imports.
    const objem = (sel, rows, color) => w => fokLineChart(sel, rows, {
      x: d => d.year, y: totalPJ, area: true, areaOpacity: 0.6,
      title: 'Objem', yLabel: 'PJ',
      width: w, height: 260, theme: lineTheme(color),
      yDomain: [0, maxPJ], yTickValues: fuelTicks,
      xTickValues: xTicks, xFormat: String,
      yFormat: v => fokFormatNumber(v, 0),
      tooltipHtml: d => head(d.year) + plain(pj(totalPJ(d))),
    });

    const podil = (sel, rows, codes) => w => fokAreaChartStacked(sel, rows, {
      x: d => d.year, keys: keysOf(codes), colors: colorsOf(codes), labels: labelsOf(codes),
      proportional: true, title: 'Podle zemí', yLabel: '% dovozu',
      width: w, height: 260, theme, legend: true,
      xTickValues: xTicks, xFormat: String,
    });

    // Each entry draws into its container at that container's own width; the
    // hidden variant's containers measure 0 and are skipped.
    const CHARTS = [
      ['#chart-celkem-czk', w => fokBarChartStacked('#chart-celkem-czk',
        payments.map(d => ({ year: String(d.year), ropa: d.ropa_czk_mld, plyn: d.plyn_czk_mld })), {
          x: d => d.year,
          keys: ['ropa', 'plyn'],
          colors: { ropa: COLOR_ROPA, plyn: COLOR_PLYN },
          labels: { ropa: 'Ropa', plyn: 'Zemní plyn' },
          yLabel: 'mld. Kč',
          width: w, height: 260, theme,
          xTickValues: xTicks.map(String),
          yFormat: v => fokFormatNumber(v, 0),
          tooltipHtml: (raw, key) => head(raw.year)
            + `<span style="color:${key === 'ropa' ? COLOR_ROPA : COLOR_PLYN}">■</span> `
            + plain(`${key === 'ropa' ? 'Ropa' : 'Zemní plyn'}: ${czkMld(raw[key])}`),
        })],

      ['#chart-celkem-hdp', w => fokLineChart('#chart-celkem-hdp', payments, {
        x: d => d.year, y: d => d.gdp_share_pct,
        yLabel: '% HDP',
        width: w, height: 260, theme: lineTheme(COLOR_ROPA),
        xTickValues: xTicks, xFormat: String,
        yFormat: v => fokFormatNumber(v, 1),
        tooltipHtml: d => head(d.year) + plain(`${fokFormatNumber(d.gdp_share_pct, 1)} % HDP`),
      })],

      // The series peaks just under 700 PJ; left to itself the axis puts 14
      // labels on a 320px-wide panel.
      ['#chart-celkem-energie', energy('#chart-celkem-energie', energie, FOSIL,
        { yTickValues: [0, 200, 400, 600] })],

      ['#chart-ropa-czk',     money('#chart-ropa-czk', ropa.czk, COLOR_ROPA)],
      ['#chart-ropa-energie', fuelEnergy('#chart-ropa-energie', ropa.energie, ROPA)],
      ['#chart-plyn-czk',     money('#chart-plyn-czk', plyn.czk, COLOR_PLYN)],
      ['#chart-plyn-energie', fuelEnergy('#chart-plyn-energie', plyn.energie, PLYN)],
      ['#chart-ropa-objem',   objem('#chart-ropa-objem', ropa.energie, COLOR_ROPA)],
      ['#chart-ropa-podil',   podil('#chart-ropa-podil', ropa.energie, ROPA)],
      ['#chart-plyn-objem',   objem('#chart-plyn-objem', plyn.energie, COLOR_PLYN)],
      ['#chart-plyn-podil',   podil('#chart-plyn-podil', plyn.energie, PLYN)],
    ];

    const drawAll = () => CHARTS.forEach(([sel, draw]) => {
      const w = Math.round(document.querySelector(sel).getBoundingClientRect().width);
      if (w > 0) draw(w);
    });

    // Prototype only: two layouts for the fuel boxes, switched by the floating
    // buttons. Kept in the URL hash, so a copied link opens the same variant.
    // Switching changes the columns' widths, hence the redraw.
    const switches = document.querySelectorAll('.variant-switch button');
    const setVariant = v => {
      document.body.classList.toggle('variant-2', v === 2);
      switches.forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.variant === v)));
      history.replaceState(null, '', v === 2 ? '#varianta-2' : location.pathname + location.search);
      drawAll();
    };
    switches.forEach(b => b.addEventListener('click', () => setVariant(+b.dataset.variant)));
    setVariant(location.hash === '#varianta-2' ? 2 : 1);

    // Redrawing is the only way to resize: the width is baked into the viewBox.
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawAll, 200);
    });
  }
});
