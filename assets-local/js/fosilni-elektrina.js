/**
 * fosilni-elektrina.js — charts for
 * collections/_studies/2026-interaktivni-prehled-fosilni-elektrina.md
 *
 * Data: assets-local/files/fosilni-elektrina/, written by export_dashboard.py in
 * data-analysis (the ai-pipelines pipeline fossil-electricity-dash):
 *   yearly.csv       country (ISO 3), year, hours, fossil_pct, gas_pct, partial
 *   hourly-<ISO3>.csv date, hours, gas_hours: per local day two strings of 24 characters, against
 *                    the cheapest fossil plant and against the gas plant alone: 0 = spot above the
 *                    floor, 1-k = how far below it as a share of the floor (steps of 1.5 %, rounded
 *                    up), l = more than 30 % below, - = no result. One file per country, fetched
 *                    only when a year of that country is hovered.
 *   fuels.json       country -> year -> {l, h, g}: why lignite, hard coal and gas are in or
 *                    out of the country's floor (o own, [countries] their coupled partners,
 *                    x nobody, e exception, a gas always, ? no data); fetched on first hover
 *   meta.json        last_date, countries
 *
 * Charts are the shared FoK library (assets-local/charts/); the hover popup
 * is drawn here, into the library's tooltip.
 */
document.addEventListener('DOMContentLoaded', () => {
  const DATA = '/assets-local/files/fosilni-elektrina';
  const MAIN = 'CZE';
  // Names for the popup, the tiles and the comparison.
  const NAMES = {
    CZE: 'Česko', DEU: 'Německo', POL: 'Polsko', SVK: 'Slovensko', AUT: 'Rakousko',
    ESP: 'Španělsko', ITA: 'Itálie', NLD: 'Nizozemsko', FRA: 'Francie', DNK: 'Dánsko',
    BEL: 'Belgie', BGR: 'Bulharsko', EST: 'Estonsko', FIN: 'Finsko', GRC: 'Řecko',
    HUN: 'Maďarsko', LTU: 'Litva', LUX: 'Lucembursko', LVA: 'Lotyšsko', PRT: 'Portugalsko',
    ROU: 'Rumunsko', SVN: 'Slovinsko', SWE: 'Švédsko', HRV: 'Chorvatsko', IRL: 'Irsko',
    GBR: 'Velká Británie', NOR: 'Norsko', CHE: 'Švýcarsko', SRB: 'Srbsko',
    ALB: 'Albánie', BIH: 'Bosna a Hercegovina', MKD: 'Severní Makedonie', MNE: 'Černá Hora',
    XKX: 'Kosovo', UKR: 'Ukrajina', MDA: 'Moldavsko', TUR: 'Turecko',
  };
  // EU members with data (Cyprus and Malta have none). Croatia and Ireland start
  // later than 2016; they are marked with an asterisk.
  const EU = ['AUT', 'BEL', 'BGR', 'CZE', 'DEU', 'DNK', 'ESP', 'EST', 'FIN', 'FRA', 'GRC', 'HUN',
    'ITA', 'LTU', 'LUX', 'LVA', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'SWE', 'HRV', 'IRL'];
  // The opening comparison starts in 2020: the years before are marked by cheap carbon
  // and gas (and by the Nordic coupling to the continent). The small charts start in 2016.
  const CMP_FROM = 2020, CMP_TO = 2025;
  // Other European countries with data, shown too (in italics, marked "mimo EU").
  const NON_EU = ['GBR', 'NOR', 'CHE', 'SRB'];
  // First year used where it is later than 2016 (Great Britain: the first full year).
  const LATE = { HRV: 2017, IRL: 2018, GBR: 2017 };
  const label = iso => NAMES[iso] + (LATE[iso] ? '*' : '');
  // Flags: the flag-icons set (CSS and SVG files from cdnjs, the same version as the
  // stylesheet linked in the page), by ISO 3166-1 alpha-2 code.
  const FLAG_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icons/7.2.3/flags/4x3';
  const ISO2 = {
    AUT: 'at', BEL: 'be', BGR: 'bg', CZE: 'cz', DEU: 'de', DNK: 'dk', ESP: 'es', EST: 'ee',
    FIN: 'fi', FRA: 'fr', GRC: 'gr', HUN: 'hu', ITA: 'it', LTU: 'lt', LUX: 'lu', LVA: 'lv',
    NLD: 'nl', POL: 'pl', PRT: 'pt', ROU: 'ro', SVK: 'sk', SVN: 'si', SWE: 'se', HRV: 'hr',
    IRL: 'ie', GBR: 'gb', NOR: 'no', CHE: 'ch', SRB: 'rs',
  };
  const flagHtml = iso => ISO2[iso] ? `<span class="fi fi-${ISO2[iso]} fe-flag"></span>` : '';
  // The countries are ordered by their share in the last year, low to high, and
  // split in three groups; each group ends with the country named here.
  const GROUPS = [
    { title: 'Téměř odpojeno od fosilních zdrojů', last: 'ESP' },
    { title: 'V přechodu', last: 'LUX' },
    { title: 'Převážně fosilní', last: null },
  ];
  // The groups come from the ranking by all fossil fuels (so a country stays in its
  // group when the view is switched to gas only); within a group, countries are
  // ordered by the share shown.
  let groupOf = {};
  function ranked(rows, key) {
    const val = (iso, year) => rows.find(r => r.country === iso && r.year === year)?.[key];
    const data = [...EU, ...NON_EU].map(iso => ({ iso, from: CMP_FROM, a: val(iso, CMP_FROM), b: val(iso, CMP_TO) }))
      .filter(d => d.a != null && d.b != null)
      .map(d => ({ ...d, diff: d.b - d.a }));
    if (!Object.keys(groupOf).length) {
      let g = 0;
      [...data].sort((p, q) => p.b - q.b).forEach(d => { groupOf[d.iso] = g; if (GROUPS[g].last === d.iso) g++; });
    }
    data.forEach(d => { d.group = groupOf[d.iso]; });
    return data.sort((p, q) => p.group - q.group || p.b - q.b);
  }
  const FOSSIL = { key: 'fossil_pct', label: 'Fosilní zdroje (uhlí nebo plyn)', color: '#81334b', width: 3.6 };
  const GAS_ONLY = { key: 'gas_pct', label: 'z toho plyn', color: '#d87069', width: 1.4 };
  // The two views of the page (the toggle).
  const MODES = {
    all: {
      key: 'fossil_pct', series: [FOSSIL],
      heading: 'určují fosilní paliva',
      title: 'Vážený podíl hodin, kdy cenu elektřiny určovaly fosilní zdroje',
      share: 'podíl hodin',
    },
    gas: {
      key: 'gas_pct', series: [{ ...GAS_ONLY, label: 'Plyn', width: 3.6 }],
      heading: 'určuje zemní plyn',
      title: 'Vážený podíl hodin, kdy cenu elektřiny určovala plynová elektrárna',
      share: 'podíl hodin nad náklady plynové elektrárny',
    },
  };
  let mode = 'all';
  const view = () => MODES[mode];
  const TILE_HEIGHT = 130, FIRST_YEAR = 2016;

  const theme = FoKTheme;
  const pct = v => `${String(Math.round(v)).replace('.', ',')} %`;

  // ── Hourly profiles, one file per country, fetched on first use ──────────
  const profileCache = new Map();
  const loadProfile = iso => {
    const file = `hourly-${iso}.csv`;
    if (!profileCache.has(file)) profileCache.set(file, d3.csv(`${DATA}/${file}`));
    return profileCache.get(file);
  };
  // Why each fuel is in or out of a country's floor, fetched once on first hover.
  let fuelsPromise = null;
  const loadFuels = () => fuelsPromise ??= d3.json(`${DATA}/fuels.json`);

  const FUEL_NAMES = { l: 'hnědé uhlí', h: 'černé uhlí', g: 'plyn' };
  const names = list => list.map(c => NAMES[c] ?? c).slice(0, 5).join(', ') + (list.length > 5 ? ' a další' : '');
  // Which fuels the floor of a country counts in a year, and why (Czech HTML).
  function fuelsHtml(fuels, iso, year) {
    const reasons = fuels?.[iso]?.[String(year)];
    if (!reasons) return '';
    const included = [], left = [];
    for (const k of ['l', 'h', 'g']) {
      const r = reasons[k], name = FUEL_NAMES[k];
      if (r === 'o') included.push(`${name} (vlastní elektrárny)`);
      else if (Array.isArray(r)) included.push(`${name} (elektrárny v propojených zemích: ${names(r)})`);
      else if (r === 'a') included.push(`${name} (vždy)`);
      else if (r === '?') included.push(`${name} (chybí údaje o výrobě)`);
      else if (r === 'e') left.push(`${name} (výjimka: cenu určuje vodní energie)`);
      else left.push(`${name} (méně než 1 % výroby v zemi i v propojených zemích)`);
    }
    return `<b>Do nákladů se započítává:</b> ${included.join('; ')}.` +
      (left.length ? `<br><b>Nezapočítává se:</b> ${left.join('; ')}.` : '');
  }

  // ── The popup: both ratios of a year and its hour-by-day profile ─────────
  // It sits beside the yearly chart it belongs to. The profile has the day of the
  // year on x and the hour of the (local) day on y. A cell is fully red where the
  // spot price in that hour was above the cost of the cheapest fossil plant, and
  // fades linearly to white as the price falls below it: white at 30 % of the floor below it.
  // Midday cells turning light in summer show the effect of solar power.
  const MONTHS = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'];
  const LEVELS = '0123456789abcdefghijkl', FADE_TO = 20;
  const RED_ALL = [129, 51, 75], RED_GAS = [200, 84, 76], NO_DATA = [232, 235, 238];
  const redOf = () => mode === 'gas' ? RED_GAS : RED_ALL;
  const strength = level => level === 0 ? 1 : Math.max(0, 1 - Math.min(level, FADE_TO) / FADE_TO);
  const shade = t => redOf().map(c => Math.round(255 + (c - 255) * t));
  const css = c => `rgb(${c.join(',')})`;
  const gradientOf = () => `linear-gradient(to right, ${[FADE_TO, 15, 10, 5, 0].map(l => css(shade(strength(l)))).join(', ')})`;

  function popupHtml(iso, row) {
    const head = `<div class="fe-popup-title">${NAMES[iso] ?? iso}, ${row.year}` +
      (row.partial ? ' <span class="fe-popup-partial">(rok ještě neskončil)</span>' : '') + '</div>';
    const values = mode === 'all'
      ? '<div class="fe-popup-values">' +
        `<div class="fe-popup-main"><b style="color:${FOSSIL.color}">${pct(row.fossil_pct)}</b>` +
        '<span>vážený podíl hodin v roce nad náklady fosilních zdrojů (uhlí nebo plyn)</span></div>' +
        '</div>' +
        '<div class="fe-popup-fuels"></div>'
      : '<div class="fe-popup-values">' +
        `<div class="fe-popup-main"><b style="color:${GAS_ONLY.color}">${pct(row.gas_pct)}</b>` +
        '<span>vážený podíl hodin v roce nad náklady plynové elektrárny</span></div></div>';
    return head + values +
      '<div class="fe-popup-chart"><div class="fe-popup-loading">Načítám data…</div></div>' +
      '<div class="fe-popup-note">Každý čtvereček je jedna hodina: den v roce vodorovně, hodina dne (místní čas) svisle.' +
      '<div class="fe-popup-scale"><span>o 30 % nákladů a více pod nimi</span>' +
      `<i style="background:${gradientOf()}"></i><span>nad nákladem</span></div>` +
      `<span class="band" style="background:${css(NO_DATA)}"></span>bez dat</div>`;
  }

  function drawProfile(popup, iso, year, W) {
    loadProfile(iso).then(all => {
      if (!popup.isConnected) return;
      const rows = all.filter(r => r.date.startsWith(`${year}-`));
      const H = W < 420 ? 170 : 210, m = { top: 4, right: 6, bottom: 20, left: 34 };
      const pw = W - m.left - m.right, ph = H - m.top - m.bottom;
      const jan1 = new Date(year, 0, 1), days = d3.timeDay.count(jan1, new Date(year + 1, 0, 1));

      // One pixel per hour; scaled up by the browser without smoothing.
      const cv = document.createElement('canvas');
      cv.width = days; cv.height = 24;
      const ctx = cv.getContext('2d'), img = ctx.createImageData(days, 24);
      rows.forEach(r => {
        const col = d3.timeDay.count(jan1, new Date(`${r.date}T00:00:00`));
        if (col < 0 || col >= days) return;
        for (let h = 0; h < 24; h++) {
          const level = LEVELS.indexOf(r[mode === 'gas' ? 'gas_hours' : 'hours'][h]), i = 4 * (h * days + col);
          img.data.set([...(level < 0 ? NO_DATA : shade(strength(level))), 255], i);
        }
      });
      ctx.putImageData(img, 0, 0);

      const svg = d3.select(popup).select('.fe-popup-chart').html('').append('svg')
        .attr('width', '100%').attr('viewBox', `0 0 ${W} ${H}`).style('display', 'block');
      svg.append('image').attr('href', cv.toDataURL())
        .attr('x', m.left).attr('y', m.top).attr('width', pw).attr('height', ph)
        .attr('preserveAspectRatio', 'none').style('image-rendering', 'pixelated');
      svg.append('g').selectAll('text').data([0, 6, 12, 18, 24]).join('text')
        .attr('x', m.left - 4).attr('y', h => m.top + ph * h / 24 + 3.5).attr('text-anchor', 'end')
        .attr('font-size', 10).attr('fill', theme.colors.grey).text(h => `${h}:00`);
      svg.append('g').selectAll('text').data(d3.range(0, 12, W < 420 ? 2 : 1)).join('text')
        .attr('x', mo => m.left + pw * d3.timeDay.count(jan1, new Date(year, mo, 1)) / days + 2)
        .attr('y', H - 6).attr('text-anchor', 'start')
        .attr('font-size', 10).attr('fill', theme.colors.grey).text(mo => MONTHS[mo]);
    });
  }

  function drawCountry(sel, iso, rows, o) {
    const mine = rows.filter(r => r.country === iso && r.year >= (LATE[iso] ?? 0));
    if (!mine.length) return;
    const node = document.querySelector(sel);
    const width = Math.round(node.getBoundingClientRect().width);
    if (!width) return;
    const lastYear = d3.max(mine, r => r.year);
    const partial = mine.some(r => r.year === lastYear && r.partial);
    const SERIES = view().series;
    const lineTheme = { ...theme, colors: { ...theme.colors, categorical: SERIES.map(s => s.color) } };
    const data = SERIES.flatMap(s => mine.map(r => ({
      series: s.label, year: r.year, value: r[s.key], country: iso,
    })));
    const ends = [Math.max(FIRST_YEAR, d3.min(mine, r => r.year)), lastYear];
    fokLineChart(sel, data, {
      multi: true, area: true, areaOpacity: 0.16, x: d => d.year, y: d => d.value, series: d => d.series,
      width, height: o.height, theme: lineTheme,
      legend: false,
      yDomain: [0, 100], yTickValues: [0, 50, 100],
      yFormat: v => `${v} %`,
      xDomain: [FIRST_YEAR, lastYear],
      xTickValues: ends,
      xFormat: String,
      partialAfter: partial ? lastYear - 1 : undefined,
    });

    // Hover selects the whole year: a vertical line, both values highlighted, and
    // a popup laid over this chart. (The library's per-point hover is replaced.)
    const svgNode = d3.select(sel).select('svg').node();
    const gNode = svgNode.querySelector('g');
    const clip = svgNode.querySelector('clipPath rect');
    const innerW = +clip.getAttribute('width'), innerH = +clip.getAttribute('height');
    const x = d3.scaleLinear().domain([FIRST_YEAR, lastYear]).range([0, innerW]);
    const y = d3.scaleLinear().domain([0, 100]).range([innerH, 0]);
    const g = d3.select(gNode);
    g.select('.fok-hover-layer').remove();
    const vline = g.append('line').attr('y1', 0).attr('y2', innerH)
      .attr('stroke', theme.colors.grey).attr('stroke-width', 1).attr('opacity', 0)
      .attr('pointer-events', 'none');
    const dots = g.append('g').attr('pointer-events', 'none');
    const tip = fokTooltip(theme);
    let current = null;
    g.append('rect').attr('width', innerW).attr('height', innerH).attr('fill', 'transparent')
      .style('cursor', 'crosshair')
      .on('mousemove', event => {
        const [mx] = d3.pointer(event, gNode);
        const row = d3.least(mine, r => Math.abs(x(r.year) - mx));
        if (!row || row === current) return;
        current = row;
        vline.attr('x1', x(row.year)).attr('x2', x(row.year)).attr('opacity', 1);
        dots.selectAll('circle').data(SERIES).join('circle')
          .attr('cx', x(row.year)).attr('cy', s => y(row[s.key])).attr('r', s => s.width > 2 ? 5 : 3.5)
          .attr('fill', s => s.color).attr('stroke', '#fff').attr('stroke-width', 1.5);
        // The popup sits beside the chart (right, else left, else below), never on it.
        const box = node.getBoundingClientRect();
        const W = Math.min(430, window.innerWidth - 16), vw = window.innerWidth;
        tip.show(`<div class="fe-popup">${popupHtml(iso, row)}</div>`);
        const el = document.querySelector('.fok-tooltip');
        el.style.boxSizing = 'border-box';
        el.style.width = `${W}px`;
        el.style.maxWidth = 'none';
        let left, top = box.top;
        if (box.right + 8 + W <= vw - 8) left = box.right + 8;
        else if (box.left - 8 - W >= 8) left = box.left - 8 - W;
        else { left = Math.max(8, Math.min(box.left, vw - W - 8)); top = box.bottom + 8; }
        top = Math.max(8, Math.min(top, window.innerHeight - el.offsetHeight - 8));
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
        const inner = W - 2 * parseFloat(getComputedStyle(el).paddingLeft || 0);
        drawProfile(el.querySelector('.fe-popup'), iso, row.year, Math.round(inner));
        if (mode === 'all') loadFuels().then(f => {
          const slot = el.querySelector('.fe-popup-fuels');
          if (slot && current === row) slot.innerHTML = fuelsHtml(f, iso, row.year);
        });
      })
      .on('mouseleave', () => {
        current = null; vline.attr('opacity', 0); dots.selectAll('*').remove(); tip.hide();
      });

    // All fossil sources are the story: a thick line over a light area; gas is a thin helper.
    const root = d3.select(sel);
    SERIES.forEach(sr => {
      root.selectAll('path.fok-line').filter(function () {
        return (this.getAttribute('stroke') || '').toLowerCase() === sr.color;
      }).attr('stroke-width', function () {
        return this.getAttribute('stroke-dasharray') ? sr.width * 0.85 : sr.width;
      });
    });
    if (SERIES.length > 1) root.selectAll('path.fok-area').filter(function () {
      return (this.getAttribute('fill') || '').toLowerCase() === SERIES[1].color;
    }).remove();
    d3.select(sel).selectAll('.fok-axis--x .tick text')
      .attr('text-anchor', (_, i, all) => i === 0 ? 'start' : i === all.length - 1 ? 'end' : 'middle');
  }

  // ── Opening chart: change of the fossil share between two years, in p. p. ─
  const pp = v => `${v < 0 ? '−' : v > 0 ? '+' : ''}${String(Math.abs(Math.round(v))).replace('.', ',')} p. b.`;
  const bodu = n => n === 1 ? 'procentní bod' : n >= 2 && n <= 4 ? 'procentní body' : 'procentních bodů';
  function drawCompare(rows) {
    const node = document.getElementById('fe-compare');
    const W = Math.round(node.getBoundingClientRect().width);
    if (!W) return;
    const data = ranked(rows, view().key);
    const narrow = W < 480;
    const svg = d3.select(node).html('').append('svg')
      .attr('width', W).style('display', 'block').attr('font-family', 'inherit');
    // The left margin fits the longest name, a flag before it.
    const probe = svg.append('text').attr('font-size', 13).attr('font-weight', 700);
    const labelW = d3.max(data, d => (probe.text(NAMES[d.iso]), probe.node().getComputedTextLength()));
    probe.remove();
    const FLAG_W = 16, FLAG_H = 12, FLAG_GAP = 6;
    const m = { top: 26, right: narrow ? 66 : 76, bottom: 4, left: Math.ceil(labelW) + FLAG_W + FLAG_GAP + 16 };
    const rowH = narrow ? 24 : 26, gH = 24, H = m.top + m.bottom + rowH * data.length + gH * GROUPS.length;
    svg.attr('height', H).attr('viewBox', `0 0 ${W} ${H}`);
    const x = d3.scaleLinear().domain([0, 100]).range([m.left, W - m.right]);
    const yRow = i => m.top + gH * (data[i].group + 1) + rowH * i + rowH / 2;
    const fossil = view().series[0].color;
    const ticks = [0, 25, 50, 75, 100];
    svg.append('g').selectAll('line').data(ticks).join('line')
      .attr('x1', x).attr('x2', x).attr('y1', m.top - 4).attr('y2', H - m.bottom)
      .attr('stroke', theme.axis.gridColor);
    svg.append('g').selectAll('text').data(ticks).join('text')
      .attr('x', x).attr('y', m.top - 10).attr('text-anchor', 'middle')
      .attr('font-size', 11).attr('fill', theme.colors.grey).text(d => `${d} %`);

    // The groups: a small grey title above the first row of each, a hairline between.
    GROUPS.forEach((grp, g) => {
      const first = data.findIndex(d => d.group === g);
      if (first < 0) return;
      const top = m.top + gH * g + rowH * first;
      if (g > 0) svg.append('line').attr('x1', 0).attr('x2', W).attr('y1', top + 2).attr('y2', top + 2)
        .attr('stroke', theme.axis.gridColor);
      svg.append('text').attr('x', 2).attr('y', top + gH - 7).attr('font-size', 11)
        .attr('font-weight', 600).attr('letter-spacing', '0.02em').attr('fill', theme.colors.grey)
        .text(grp.title.toUpperCase());
    });

    const row = svg.append('g').selectAll('g').data(data).join('g')
      .attr('class', d => d.iso === MAIN ? 'fe-cmp-row fe-cmp-main' : 'fe-cmp-row');
    row.filter(d => d.iso === MAIN).append('rect')
      .attr('x', 0).attr('width', W).attr('y', (_, i) => yRow(data.findIndex(e => e.iso === MAIN)) - rowH / 2)
      .attr('height', rowH).attr('fill', '#f7ecee');
    row.append('text').attr('x', m.left - 10).attr('y', (d) => yRow(data.indexOf(d)) + 4)
      .attr('text-anchor', 'end').attr('font-size', 13)
      .attr('font-weight', d => d.iso === MAIN ? 700 : 400).attr('fill', '#1a202c')
      .attr('font-style', d => NON_EU.includes(d.iso) ? 'italic' : null)
      .text(d => NAMES[d.iso]);
    // A small flag right before each name (the names are right-aligned): subtle, thin outline.
    row.each(function (d) {
      if (!ISO2[d.iso]) return;
      const name = d3.select(this).select('text').node();
      const cy = yRow(data.indexOf(d));
      const fx = name.getBBox().x - FLAG_GAP - FLAG_W;
      d3.select(this).append('image').attr('href', `${FLAG_CDN}/${ISO2[d.iso]}.svg`)
        .attr('x', fx).attr('y', cy - FLAG_H / 2).attr('width', FLAG_W).attr('height', FLAG_H)
        .attr('preserveAspectRatio', 'xMidYMid slice').attr('opacity', 0.9);
      d3.select(this).append('rect').attr('x', fx).attr('y', cy - FLAG_H / 2).attr('width', FLAG_W)
        .attr('height', FLAG_H).attr('fill', 'none').attr('stroke', 'rgba(0,0,0,0.15)').attr('stroke-width', 0.75);
    });
    row.append('line').attr('y1', d => yRow(data.indexOf(d))).attr('y2', d => yRow(data.indexOf(d)))
      .attr('x1', d => x(d.a)).attr('x2', d => x(d.b))
      .attr('stroke', fossil).attr('stroke-opacity', 0.55)
      .attr('stroke-width', d => d.iso === MAIN ? 4 : 2.5);
    row.append('circle').attr('cx', d => x(d.a)).attr('cy', d => yRow(data.indexOf(d)))
      .attr('r', d => d.iso === MAIN ? 6 : 4.5).attr('fill', '#fff')
      .attr('stroke', fossil).attr('stroke-width', 2);
    row.append('circle').attr('cx', d => x(d.b)).attr('cy', d => yRow(data.indexOf(d)))
      .attr('r', d => d.iso === MAIN ? 6 : 4.5).attr('fill', fossil);
    row.append('text').attr('x', W - m.right + 10).attr('y', d => yRow(data.indexOf(d)) + 4)
      .attr('font-size', 13).attr('font-weight', d => d.iso === MAIN ? 700 : 400)
      .attr('fill', '#1a202c').text(d => pp(d.diff));

    // Hover: both values and the change of the row's country.
    const tip = fokTooltip(theme);
    row.append('rect').attr('x', 0).attr('width', W).attr('height', rowH)
      .attr('y', d => yRow(data.indexOf(d)) - rowH / 2).attr('fill', 'transparent')
      .on('mouseover', (event, d) => {
        tip.show(`<strong>${NAMES[d.iso]}</strong><br>${d.from}: <b>${pct(d.a)}</b><br>` +
          `${CMP_TO}: <b>${pct(d.b)}</b><br>změna ${pp(d.diff)}` +
          '<br><span style="color:#53616e;font-size:11px">klikněte pro graf země</span>');
        // The tooltip element is shared with the yearly charts' popup: undo its sizing.
        const el = document.querySelector('.fok-tooltip');
        el.style.width = ''; el.style.maxWidth = ''; el.style.boxSizing = '';
        tip.move(event);
      })
      .on('mousemove', event => tip.move(event))
      .on('mouseleave', () => tip.hide())
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        // Scroll to the country's small chart and flash it.
        const tile = document.getElementById(`fe-tile-${d.iso}`);
        if (!tile) return;
        tip.hide();
        tile.scrollIntoView({ behavior: 'smooth', block: 'center' });
        tile.classList.remove('fe-flash');
        void tile.offsetWidth;
        tile.classList.add('fe-flash');
      });

    // One sentence on where Czechia stands.
    const cz = data.find(d => d.iso === MAIN);
    if (cz) {
      const smaller = data.filter(d => d.diff > cz.diff).length;
      const verb = cz.diff < 0 ? 'snížilo' : 'zvýšilo';
      document.getElementById('fe-compare-lead').innerHTML =
        `Česko ${verb} ${view().share} z ${pct(cz.a)} na ${pct(cz.b)}, tedy o <strong>${Math.abs(Math.round(cz.diff))} ${bodu(Math.abs(Math.round(cz.diff)))}</strong>. ` +
        (smaller ? `Menší pokles než Česko zaznamenalo ${smaller} z ${data.length} zemí, ` +
          `větší ${data.length - smaller - 1}.` : `Nejmenší změnu ze ${data.length} evropských zemí.`);
    }
  }

  // ── Page ──────────────────────────────────────────────────────────────────
  const legend = document.getElementById('fe-legend');
  const renderLegend = () => {
    legend.innerHTML = view().series.map(s =>
      `<span><span class="swatch" style="border-color:${s.color};border-top-width:${s.width}px"></span>${s.label}</span>`).join('') +
      '<span><span class="swatch dashed" style="border-color:#53616e"></span>rok, který ještě neskončil</span>';
  };

  d3.csv(`${DATA}/yearly.csv`, d => ({
    country: d.country, year: +d.year, fossil_pct: +d.fossil_pct, gas_pct: +d.gas_pct, partial: +d.partial,
  })).then(rows => {
    ranked(rows, 'fossil_pct'); // fixes the groups from the ranking by all fossil fuels

    // The small charts, in the order and groups of the comparison above.
    let GRID = [];
    const buildGrid = () => {
      const order = ranked(rows, view().key);
      GRID = order.map(d => d.iso);
      const groups = document.getElementById('fe-groups');
      groups.innerHTML = '';
      GROUPS.forEach((grp, g) => {
        const members = order.filter(d => d.group === g);
        if (!members.length) return;
        const section = document.createElement('div');
        section.className = 'fe-group';
        section.innerHTML = `<h3 class="fe-group-title">${grp.title}</h3><div class="fe-grid"></div>`;
        members.forEach(d => {
          const tile = document.createElement('div');
          tile.className = 'fe-tile';
          tile.id = `fe-tile-${d.iso}`;
          tile.innerHTML = `<h3>${flagHtml(d.iso)}${label(d.iso)}${NON_EU.includes(d.iso) ? ' <span class="fe-non-eu">mimo EU</span>' : ''}</h3><div id="fe-chart-${d.iso}"></div>`;
          section.querySelector('.fe-grid').appendChild(tile);
        });
        groups.appendChild(section);
      });
    };
    const draw = () => {
      document.getElementById('fe-compare-heading').textContent =
        `Jak se v\u00a0Evropě změnil podíl hodin, kdy cenu elektřiny ${view().heading}`;
      document.getElementById('fe-compare-title').textContent = `${view().title}: ${CMP_FROM} a ${CMP_TO}`;
      renderLegend();
      drawCompare(rows);
      GRID.forEach(iso => drawCountry(`#fe-chart-${iso}`, iso, rows, { height: TILE_HEIGHT }));
    };

    // The toggle: all fossil fuels or gas only; everything follows it.
    const toggle = document.getElementById('fe-toggle');
    toggle.innerHTML = [['all', 'Všechna fosilní paliva (uhlí a plyn)'], ['gas', 'Jen plyn']]
      .map(([m, text]) => `<button type="button" data-mode="${m}" aria-pressed="${m === mode}">${text}</button>`).join('');
    toggle.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button || button.dataset.mode === mode) return;
      mode = button.dataset.mode;
      toggle.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
      document.querySelector('.fok-tooltip')?.style.setProperty('opacity', '0');
      buildGrid();
      draw();
    });

    buildGrid();
    draw();
    // Redraw when the layout width changes (the SVGs are sized to their containers).
    let widths = '';
    const widthsNow = () => [...document.querySelectorAll('#fe-compare, #fe-groups .fe-tile')]
      .map(n => Math.round(n.getBoundingClientRect().width)).join();
    const redraw = () => { const now = widthsNow(); if (now !== widths) { widths = now; draw(); } };
    new ResizeObserver(redraw).observe(document.getElementById('fe-groups'));
    new ResizeObserver(() => window.dispatchEvent(new Event('resize'))).observe(document.getElementById('fe-compare'));
    window.addEventListener('resize', redraw);
  });
});
