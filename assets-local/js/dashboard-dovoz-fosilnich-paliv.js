document.addEventListener('DOMContentLoaded', () => {
  const { highlights, payments, plyn, ropa, energy_mix } = window.DASHBOARD_DOVOZ;

  // ── KPI header ────────────────────────────────────────────────────────────
  document.getElementById('dovoz-year').textContent = highlights.year;
  document.getElementById('kpi-total').textContent =
    fokFormatNumber(highlights.total_czk_mld, 1) + ' mld. Kč';
  document.getElementById('kpi-gdp').textContent =
    fokFormatNumber(highlights.gdp_share_pct, 1).replace('.', ',') + ' % HDP';
  document.getElementById('kpi-energy').textContent =
    highlights.primary_energy_pct + ' %';

  // ── Color constants ───────────────────────────────────────────────────────
  const COLOR_ROPA = '#bd3d52';
  const COLOR_PLYN = '#ff7773';

  const ROPA_COLORS = {
    azerbajdzan:    '#73d5d6',
    kazachstan:     '#e07b00',
    rusko:          '#d73027',
    saudska_arabie: '#f0c030',
    usa:            '#c4c4c4',
    ostatni:        '#aaaaaa',
  };

  const ROPA_LABELS = {
    azerbajdzan:    'Ázerbájdžán',
    kazachstan:     'Kazachstán',
    rusko:          'Rusko',
    saudska_arabie: 'Saúdská Arábie',
    usa:            'USA',
    ostatni:        'Ostatní',
  };

  const PLYN_COLORS = {
    rusko:   '#d73027',
    norsko:  '#2B2B9E',
    nemecko: '#888888',
    ostatni: '#aaaaaa',
  };

  const PLYN_LABELS = {
    rusko:   'Rusko',
    norsko:  'Norsko',
    nemecko: 'Německo',
    ostatni: 'Ostatní',
  };

  // ── Shared theme with strokeWidth 2 ──────────────────────────────────────
  const theme2 = {
    ...FoKTheme,
    line: { ...FoKTheme.line, strokeWidth: 2 },
  };

  // ── Chart 1: Celkové výdaje (ropa + plyn stacked bars) ───────────────────
  const celkemData = payments.map(d => ({
    year: String(d.year),
    plyn: d.plyn_czk_mln / 1000,
    ropa: d.ropa_czk_mln / 1000,
  }));

  const topXTicks = ['2017', '2019', '2021', '2023', '2025'];
  const topXTicksNum = [2017, 2019, 2021, 2023, 2025];

  fokBarChartStacked('#chart-celkem-czk', celkemData, {
    x:               d => d.year,
    keys:            ['ropa', 'plyn'],
    colors:          { ropa: COLOR_ROPA, plyn: COLOR_PLYN },
    labels:          { ropa: 'Ropa', plyn: 'Zemní plyn' },
    title:           'Výdaje za ropu a plyn',
    width:           280,
    height:          240,
    showInnerLabels: true,
    xTickValues:     topXTicks,
    theme:           theme2,
    yFormat: v => fokFormatNumber(v, 0),
    tooltipHtml: (raw, key) => {
      const label = key === 'ropa' ? 'Ropa' : 'Zemní plyn';
      const color = key === 'ropa' ? COLOR_ROPA : COLOR_PLYN;
      return `<strong style="font-family:${FoKTheme.font}">${raw.year}</strong><br>`
        + `<span style="color:${color}">■</span> `
        + `<span style="font-family:${FoKTheme.font}">${label}: ${fokFormatNumber(raw[key], 1)} mld. Kč</span>`;
    },
  });

  // ── Chart 2: Podíl HDP — stacked area (Rusko + ostatní = celkem) ─────────
  const hdpAreaData = payments.map(d => ({
    year:    d.year,
    rusko:   d.russia_share_pct,
    ostatni: d.gdp_share_pct - d.russia_share_pct,
  }));

  fokAreaChartStacked('#chart-celkem-hdp', hdpAreaData, {
    x:           d => d.year,
    keys:        ['rusko', 'ostatni'],
    colors:      { rusko: '#d73027', ostatni: '#b0b0b0' },
    labels:      { rusko: 'z toho Rusku', ostatni: 'Ostatní země' },
    title:       'Podíl HDP',
    width:       280,
    height:      240,
    xTickValues: topXTicksNum,
    theme:       theme2,
    yFormat:     v => fokFormatNumber(v, 1),
  });

  // ── Chart 3: Podíl na primární energii — stacked area ────────────────────
  const ENERGIE_KEYS   = ['dovoz_ropy', 'dovoz_plynu', 'pevna_paliva', 'domace_fos', 'jaderne_teplo', 'oze'];
  const ENERGIE_COLORS = {
    dovoz_ropy:    COLOR_ROPA,
    dovoz_plynu:   COLOR_PLYN,
    pevna_paliva:  '#ffbab8',
    domace_fos:    '#8f9aa3',
    jaderne_teplo: '#aab2ba',
    oze:           '#c5cdd4',
  };
  const ENERGIE_LABELS = {
    dovoz_ropy:    'Dovoz ropy',
    dovoz_plynu:   'Dovoz plynu',
    pevna_paliva:  'Dovoz pevných paliv',
    domace_fos:    'Domácí fos. paliva',
    jaderne_teplo: 'Jaderné teplo',
    oze:           'OZE',
  };

  fokAreaChartStacked('#chart-celkem-energie', energy_mix, {
    x:      d => d.year,
    keys:   ENERGIE_KEYS,
    colors: ENERGIE_COLORS,
    labels: ENERGIE_LABELS,
    title:  'Podíl na primární energii',
    width:  280,
    height: 240,
    theme:  theme2,
    yFormat: v => fokFormatNumber(v, 0),
    yTickValues: [0, 25, 50, 75, 100],
  });

  // ── Shared scales for ropa/plyn comparison ───────────────────────────────
  const maxCzkMld = Math.ceil(Math.max(
    d3.max(ropa, d => d.total_czk_mln / 1000),
    d3.max(plyn, d => d.total_czk_mln / 1000),
  ) / 50) * 50;

  const smallXTicks  = ['2020', '2025'];
  const smallXDates  = [new Date(2020, 0, 1), new Date(2025, 0, 1)];

  // ── ROPA: výdaje — bar chart ──────────────────────────────────────────────
  fokBarChart('#chart-ropa-czk', ropa, {
    x:           d => String(d.year),
    y:           d => d.total_czk_mln / 1000,
    color:       COLOR_ROPA,
    yLabel:      'mld. Kč',
    title:       'Výdaje',
    width:       200,
    height:      180,
    theme:       theme2,
    yDomain:     [0, maxCzkMld],
    yTicks:      4,
    xTickValues: smallXTicks,
    yFormat:     v => fokFormatNumber(v, 0),
    tooltipHtml: d => `<strong>${d.year}</strong><br>${fokFormatNumber(d.total_czk_mln / 1000, 1)} mld. Kč`,
  });

  // ── ROPA: objem — area chart ──────────────────────────────────────────────
  fokLineChart('#chart-ropa-kg', ropa, {
    x:           d => new Date(d.year, 0, 1),
    y:           d => d.total_kg / 1e9,
    area:        true,
    yLabel:      'Mt',
    title:       'Objem',
    width:       200,
    height:      180,
    theme: {
      ...theme2,
      colors: { ...FoKTheme.colors, categorical: [COLOR_ROPA, ...FoKTheme.colors.categorical.slice(1)] },
    },
    yTicks:      4,
    xTickValues: smallXDates,
    yFormat:     v => fokFormatNumber(v, 1),
    tooltipHtml: d => `<strong>${d.year}</strong><br>${fokFormatNumber(d.total_kg / 1e9, 2)} Mt`,
  });

  // ── ROPA: země stacked area (proportional) ───────────────────────────────
  const ropaZemeKeys = ['rusko', 'azerbajdzan', 'kazachstan', 'saudska_arabie', 'usa', 'ostatni'];
  const ropaZemeData = ropa.map(d => {
    const row = { year: d.year };
    ropaZemeKeys.forEach(k => { row[k] = d.countries[k]?.pct ?? 0; });
    return row;
  });

  fokAreaChartStacked('#chart-ropa-zeme', ropaZemeData, {
    x:            d => d.year,
    keys:         ropaZemeKeys,
    colors:       ROPA_COLORS,
    labels:       ROPA_LABELS,
    proportional: true,
    yLabel:       '% objemu',
    title:        'Dovoz ropy',
    width:        420,
    height:       240,
    theme:        theme2,
    annotations: [
      { x: 2017.5, y: 25, text: 'Rusko', anchor: 'start', color: '#fff' },
      { x: 2017.5, y: 68, text: 'Ázerbájdžán', anchor: 'start', color: '#fff' },
      { x: 2017.5, y: 95, text: 'Kazachstán', anchor: 'start', color: '#fff' },
    ]
  });

  // ── PLYN: výdaje — bar chart ──────────────────────────────────────────────
  fokBarChart('#chart-plyn-czk', plyn, {
    x:           d => String(d.year),
    y:           d => d.total_czk_mln / 1000,
    color:       COLOR_PLYN,
    yLabel:      'mld. Kč',
    title:       'Výdaje',
    width:       200,
    height:      180,
    theme:       theme2,
    yDomain:     [0, maxCzkMld],
    yTicks:      4,
    xTickValues: smallXTicks,
    yFormat:     v => fokFormatNumber(v, 0),
    tooltipHtml: d => `<strong>${d.year}</strong><br>${fokFormatNumber(d.total_czk_mln / 1000, 1)} mld. Kč`,
  });

  // ── PLYN: objem — area chart ──────────────────────────────────────────────
  fokLineChart('#chart-plyn-kg', plyn, {
    x:           d => new Date(d.year, 0, 1),
    y:           d => d.total_kg / 1e9,
    area:        true,
    yLabel:      'Mt',
    title:       'Objem',
    width:       200,
    height:      180,
    theme: {
      ...theme2,
      colors: { ...FoKTheme.colors, categorical: [COLOR_PLYN, ...FoKTheme.colors.categorical.slice(1)] },
    },
    yTicks:      4,
    xTickValues: smallXDates,
    yFormat:     v => fokFormatNumber(v, 1),
    tooltipHtml: d => `<strong>${d.year}</strong><br>${fokFormatNumber(d.total_kg / 1e9, 2)} Mt`,
  });

  // ── PLYN: země stacked area (proportional) ───────────────────────────────
  const plynZemeKeys = ['rusko', 'norsko', 'nemecko', 'ostatni'];
  const plynZemeData = plyn.map(d => {
    const row = { year: d.year };
    plynZemeKeys.forEach(k => { row[k] = d.countries[k]?.pct ?? 0; });
    return row;
  });

  fokAreaChartStacked('#chart-plyn-zeme', plynZemeData, {
    x:            d => d.year,
    keys:         plynZemeKeys,
    colors:       PLYN_COLORS,
    labels:       PLYN_LABELS,
    proportional: true,
    yLabel:       '% objemu',
    title:        'Dovoz zemního plynu',
    width:        420,
    height:       240,
    theme:        theme2,
    annotations: [
      { x: 2017.5, y: 25, text: 'Rusko', anchor: 'start', color: '#fff' },
      { x: 2019.5, y: 95, text: 'Německo', anchor: 'start', color: '#fff' },
      { x: 2023, y: 60, text: 'Norsko', anchor: 'start', color: '#fff' }
    ]
  });
});
