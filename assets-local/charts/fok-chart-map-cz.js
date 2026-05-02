/**
 * fok-chart-map-cz.js — Czech Republic map factory
 *
 * Renders a choropleth or point map of the Czech Republic.
 * GeoJSON is loaded from the path passed in options (or the default asset path).
 *
 * Dependencies (load order):
 *   D3 v7+  →  fok-theme.js  →  fok-utils.js  →  this file
 *
 * Basic usage — dot map:
 *   fokMapCz('#map-container', points, {
 *     lon: d => d.longitude,
 *     lat: d => d.latitude,
 *     color: d => statusColor(d.status),
 *     tooltipHtml: d => `<strong>${d.name}</strong>`,
 *   });
 *
 * Options:
 *   geoJsonPath  {string}    path to CZ GeoJSON (default '/assets-local/files/cz-map.json')
 *   lon          {function}  longitude accessor
 *   lat          {function}  latitude accessor
 *   color        {function|string}  point fill color
 *   r            {function|number}  point radius (default 6)
 *   tooltipHtml  {function}  (d) => HTML string
 *   width        {number}    viewBox width  (default 900)
 *   height       {number}    viewBox height (default 520)
 *   theme        {object}    override full theme
 *
 * Returns a Promise that resolves when the map has rendered.
 */
async function fokMapCz(containerSelector, points, options = {}) {
  const theme     = { ...FoKTheme, ...(options.theme ?? {}) };
  const W         = options.width  ?? 900;
  const H         = options.height ?? 520;
  const geoPath   = options.geoJsonPath ?? '/assets-local/files/cz-map.json';

  const lonAcc    = options.lon   ?? (d => d.longitude);
  const latAcc    = options.lat   ?? (d => d.latitude);
  const colorAcc  = typeof options.color === 'function'
    ? options.color
    : () => (typeof options.color === 'string' ? options.color : theme.colors.primary);
  const rAcc      = typeof options.r === 'function'
    ? options.r
    : () => (options.r ?? 6);

  // ── Clear container ──────────────────────────────────────────────────────
  const container = d3.select(containerSelector);
  container.selectAll('*').remove();

  // ── SVG scaffold ─────────────────────────────────────────────────────────
  const svg = fokResponsiveSVG(container, `0 0 ${W} ${H}`);

  const gMap = svg.append('g').attr('class', 'cz-regions');
  const gPts = svg.append('g').attr('class', 'cz-points');

  // ── Load GeoJSON ─────────────────────────────────────────────────────────
  let geojson;
  try {
    geojson = await d3.json(geoPath);
  } catch (err) {
    console.error('fokMapCz: failed to load GeoJSON from', geoPath, err);
    container.append('p')
      .style('color', theme.colors.negative)
      .style('font-family', theme.font)
      .text('Mapu se nepodařilo načíst.');
    return;
  }

  // ── Projection fitted to CZ bounding box ────────────────────────────────
  const projection = d3.geoMercator().fitSize([W, H], geojson);
  const path       = d3.geoPath().projection(projection);

  // ── Draw regions ─────────────────────────────────────────────────────────
  gMap.selectAll('path')
    .data(geojson.features)
    .join('path')
    .attr('class', 'cz-region')
    .attr('d', path)
    .attr('fill', theme.axis.gridColor)
    .attr('stroke', '#fff')
    .attr('stroke-width', 0.8);

  // ── Tooltip ───────────────────────────────────────────────────────────────
  const tip = fokTooltip(theme);

  const defaultTooltip = d =>
    `<span style="font-family:${theme.font}">${lonAcc(d).toFixed(3)}, ${latAcc(d).toFixed(3)}</span>`;

  const tooltipHtml = options.tooltipHtml ?? defaultTooltip;

  // ── Draw points ───────────────────────────────────────────────────────────
  const validPoints = points.filter(d => {
    const lon = +lonAcc(d), lat = +latAcc(d);
    return isFinite(lon) && isFinite(lat);
  });

  gPts.selectAll('circle')
    .data(validPoints)
    .join('circle')
    .attr('class', 'cz-point')
    .attr('cx', d => projection([+lonAcc(d), +latAcc(d)])[0])
    .attr('cy', d => projection([+lonAcc(d), +latAcc(d)])[1])
    .attr('r', d => rAcc(d))
    .attr('fill', d => colorAcc(d))
    .attr('stroke', '#fff')
    .attr('stroke-width', 1)
    .on('mouseover', function(event, d) {
      d3.select(this).attr('r', rAcc(d) * 1.5);
      tip.show(tooltipHtml(d));
      tip.move(event);
    })
    .on('mousemove', event => tip.move(event))
    .on('mouseleave', function(event, d) {
      d3.select(this).attr('r', rAcc(d));
      tip.hide();
    });

  return { svg, tip, projection, path };
}
