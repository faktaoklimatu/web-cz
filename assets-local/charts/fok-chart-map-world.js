/**
 * fok-chart-map-world.js — world choropleth map factory
 *
 * Colors countries by a categorical or quantitative value.
 * Uses Natural Earth 110m TopoJSON from jsDelivr (no local file needed).
 *
 * Requires topojson-client to be loaded before this file:
 *   <script src="https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js"></script>
 *
 * Dependencies: D3 v7+  →  topojson-client  →  fok-theme.js  →  fok-utils.js  →  this file
 *
 * Usage:
 *   await fokMapWorld('#container', countryColors, {
 *     unknown: '#e8eef6',
 *     tooltipHtml: (iso2, color) => `<strong>${iso2}</strong>`,
 *   });
 *
 * @param {string} containerSelector
 * @param {object} countryColors   — { ISO2_code: fillColor }  e.g. { 'DE': '#3b3b93', 'FR': '#0d80d8' }
 * @param {object} options
 * @param {string} [options.unknown='#e8eef6']    fill for countries not in countryColors
 * @param {string} [options.ocean='#fff']         background (svg fill)
 * @param {string} [options.border='#fff']        country border color
 * @param {function} [options.tooltipHtml]        (iso2, color, d) => HTML string
 * @param {number}  [options.width=800]
 * @param {number}  [options.height=440]
 * @param {object}  [options.theme]
 * @returns {Promise<{svg, tip}>}
 */
async function fokMapWorld(containerSelector, countryColors, options = {}) {
  const theme    = { ...FoKTheme, ...(options.theme ?? {}) };
  const W        = options.width   ?? 800;
  const H        = options.height  ?? 440;
  const unknown  = options.unknown ?? theme.axis.gridColor;
  const border   = options.border  ?? '#fff';

  // ── ISO-2 → ISO numeric lookup ────────────────────────────────────────────
  // (Natural Earth / world-atlas uses numeric ISO 3166-1 codes as feature IDs)
  const ISO2_NUM = {
    AD:20,AE:784,AF:4,AG:28,AL:8,AM:51,AO:24,AR:32,AT:40,AU:36,AZ:31,
    BA:70,BB:52,BD:50,BE:56,BF:854,BG:100,BH:48,BI:108,BJ:204,BN:96,
    BO:68,BR:76,BS:44,BT:64,BW:72,BY:112,BZ:84,
    CA:124,CD:180,CF:140,CG:178,CH:756,CI:384,CL:152,CM:120,CN:156,
    CO:170,CR:188,CU:192,CY:196,CZ:203,
    DE:276,DJ:262,DK:208,DO:214,DZ:12,
    EC:218,EE:233,EG:818,ER:232,ES:724,ET:231,
    FI:246,FJ:242,FR:250,
    GA:266,GB:826,GE:268,GH:288,GM:270,GN:324,GQ:226,GR:300,GT:320,
    GW:624,GY:328,
    HN:340,HR:191,HT:332,HU:348,
    ID:360,IE:372,IL:376,IN:356,IQ:368,IR:364,IS:352,IT:380,
    JM:388,JO:400,JP:392,
    KE:404,KG:417,KH:116,KP:408,KR:410,KW:414,KZ:398,
    LA:418,LB:422,LK:144,LR:430,LS:426,LT:440,LU:442,LV:428,LY:434,
    MA:504,MD:498,ME:499,MG:450,MK:807,ML:466,MM:104,MN:496,MR:478,
    MT:470,MU:480,MW:454,MX:484,MY:458,MZ:508,
    NA:516,NE:562,NG:566,NI:558,NL:528,NO:578,NP:524,NZ:554,
    OM:512,
    PA:591,PE:604,PG:598,PH:608,PK:586,PL:616,PT:620,PY:600,
    QA:634,
    RO:642,RS:688,RU:643,RW:646,
    SA:682,SB:90,SD:729,SE:752,SG:702,SI:705,SK:703,SL:694,SN:686,
    SO:706,SR:740,SS:728,SV:222,SY:760,SZ:748,
    TD:148,TG:768,TH:764,TJ:762,TM:795,TN:788,TO:776,TR:792,TT:780,
    TZ:834,
    UA:804,UG:800,US:840,UY:858,UZ:860,
    VE:862,VN:704,
    YE:887,
    ZA:710,ZM:894,ZW:716,
  };

  // Build numeric → color lookup
  const numColor = {};
  Object.entries(countryColors).forEach(([iso2, color]) => {
    const num = ISO2_NUM[iso2.toUpperCase()];
    if (num !== undefined) numColor[num] = color;
  });

  // ── Clear container ───────────────────────────────────────────────────────
  const container = d3.select(containerSelector);
  container.selectAll('*').remove();

  // ── SVG scaffold ──────────────────────────────────────────────────────────
  const svg = fokResponsiveSVG(container, `0 0 ${W} ${H}`)
    .style('background', options.ocean ?? '#fff');

  // ── Load TopoJSON ─────────────────────────────────────────────────────────
  const topoUrl = options.topoJsonUrl
    ?? 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

  let world;
  try {
    world = await d3.json(topoUrl);
  } catch (err) {
    console.error('fokMapWorld: failed to load TopoJSON', err);
    container.append('p')
      .style('color', theme.colors.negative)
      .style('font-family', theme.font)
      .text('Mapu se nepodařilo načíst.');
    return;
  }

  const countries = topojson.feature(world, world.objects.countries);

  // ── Projection ────────────────────────────────────────────────────────────
  const projection = d3.geoNaturalEarth1()
    .fitSize([W, H], countries);
  const path = d3.geoPath().projection(projection);

  // ── Tooltip ───────────────────────────────────────────────────────────────
  const tip = fokTooltip(theme);

  // Build reverse lookup: numeric ID → ISO-2
  const NUM_ISO2 = {};
  Object.entries(ISO2_NUM).forEach(([iso2, num]) => { NUM_ISO2[num] = iso2; });

  const defaultTooltip = (iso2, color) =>
    `<span style="font-family:${theme.font};color:${color}">■</span> `
    + `<span style="font-family:${theme.font}">${iso2}</span>`;

  const tooltipHtml = options.tooltipHtml ?? defaultTooltip;

  // ── Draw countries ────────────────────────────────────────────────────────
  svg.selectAll('.world-country')
    .data(countries.features)
    .join('path')
    .attr('class', 'world-country')
    .attr('d', path)
    .attr('fill', d => numColor[+d.id] ?? unknown)
    .attr('stroke', border)
    .attr('stroke-width', 0.5)
    .on('mouseover', function(event, d) {
      const color = numColor[+d.id];
      if (!color) return;
      d3.select(this).attr('opacity', 0.75);
      const iso2 = NUM_ISO2[+d.id] ?? String(d.id);
      tip.show(tooltipHtml(iso2, color, d));
      tip.move(event);
    })
    .on('mousemove', event => tip.move(event))
    .on('mouseleave', function(event, d) {
      if (!numColor[+d.id]) return;
      d3.select(this).attr('opacity', 1);
      tip.hide();
    });

  return { svg, tip, projection, path };
}
