/**
 * fok-chart-line.js — line / area chart factory
 *
 * Renders one or more time-series lines (with optional filled areas) into a container.
 * All cosmetics come from the theme; no hardcoded colors or sizes.
 *
 * Dependencies (load order):
 *   D3 v7+  →  fok-theme.js  →  fok-utils.js  →  this file
 *
 * Basic usage — single series:
 *   fokLineChart('#chart', data, {
 *     x: d => new Date(d.year, 0, 1),
 *     y: d => d.value,
 *     yLabel: 'Mt CO₂',
 *   });
 *
 * Multi-series usage:
 *   fokLineChart('#chart', seriesArray, {
 *     multi: true,
 *     x: d => new Date(d.year, 0, 1),
 *     y: d => d.value,
 *     series: d => d.sector,      // group key accessor
 *     legend: true,
 *   });
 *
 * Options:
 *   x           {function}  accessor for x value (Date or number)
 *   y           {function}  accessor for y value
 *   series      {function}  accessor for series key (multi-series mode)
 *   multi       {boolean}   treat data as multi-series (default false)
 *   area        {boolean}   fill area under line(s) (default false)
 *   legend      {boolean}   render a legend (multi-series, default false)
 *   yLabel      {string}    y-axis label
 *   xLabel      {string}    x-axis label
 *   title       {string}    chart title
 *   yDomain     {[min,max]} override y scale domain
 *   xDomain     {[min,max]} override x scale domain
 *   yFormat     {function}  tick formatter for y axis
 *   xFormat     {function}  tick formatter for x axis
 *   tooltipHtml {function}  (d) => HTML string for hovered point tooltip
 *   width       {number}    viewBox width  (default 800)
 *   height      {number}    viewBox height (default 420)
 *   margins     {object}    override default margins
 *   theme       {object}    override full theme
 */
function fokLineChart(containerSelector, data, options = {}) {
  // ── Resolve config ──────────────────────────────────────────────────────
  const theme  = { ...FoKTheme, ...(options.theme ?? {}) };
  const margin = fokMargin(options.margins ?? {}, theme);
  const W      = options.width  ?? 800;
  const H      = options.height ?? 420;
  const inner  = { w: W - margin.left - margin.right, h: H - margin.top - margin.bottom };

  const xAcc = options.x      ?? (d => d.date);
  const yAcc = options.y      ?? (d => d.value);
  const kAcc = options.series ?? (d => d.series ?? 'default');

  // ── Prepare series ───────────────────────────────────────────────────────
  let seriesMap;
  if (options.multi) {
    seriesMap = d3.group(data, kAcc);
  } else {
    seriesMap = new Map([['default', data]]);
  }

  const seriesKeys   = [...seriesMap.keys()];
  const colorScale   = fokColorOrdinal(seriesKeys, theme);

  const allPoints = data.map(d => ({ _x: xAcc(d), _y: +yAcc(d), _k: kAcc(d), _raw: d }));
  const xExtent = options.xDomain ?? d3.extent(allPoints, p => p._x);
  const yAll    = allPoints.map(p => p._y);
  const yMin    = options.yDomain ? options.yDomain[0] : Math.min(0, d3.min(yAll));
  const yMax    = options.yDomain ? options.yDomain[1] : d3.max(yAll);

  // ── Clear container ─────────────────────────────────────────────────────
  const container = d3.select(containerSelector);
  container.selectAll('*').remove();

  // ── Title ───────────────────────────────────────────────────────────────
  if (options.title) {
    container.append('div')
      .attr('class', 'fok-chart__title')
      .style('font-family', theme.fontTitle)
      .style('font-size', theme.fontSize.title + 'px')
      .style('font-weight', theme.fontWeight.titleBold)
      .style('color', theme.colors.text)
      .style('margin-bottom', '8px')
      .text(options.title);
  }

  // ── SVG scaffold ────────────────────────────────────────────────────────
  const svg = fokResponsiveSVG(container, `0 0 ${W} ${H}`);
  const g   = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // ── Clip path ────────────────────────────────────────────────────────────
  const clipId = 'fok-clip-' + Math.random().toString(36).slice(2, 7);
  svg.append('defs').append('clipPath')
    .attr('id', clipId)
    .append('rect')
    .attr('width', inner.w)
    .attr('height', inner.h);

  // ── Scales ──────────────────────────────────────────────────────────────
  const isTimeScale = xExtent[0] instanceof Date;
  const xScale = isTimeScale
    ? d3.scaleTime().domain(xExtent).range([0, inner.w])
    : d3.scaleLinear().domain(xExtent).range([0, inner.w]);

  const yScale = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([inner.h, 0])
    .nice();

  // ── Grid + Axes ──────────────────────────────────────────────────────────
  g.append('g')
    .attr('class', 'fok-axis fok-axis--y')
    .call(fokAxisY(yScale, {
      ticks:      options.yTicks      ?? 6,
      tickValues: options.yTickValues,
      tickFormat: options.yFormat ?? (v => fokFormatNumber(v)),
      gridLines: true,
      gridWidth: inner.w,
    }, theme));
  g.append('g')
    .attr('class', 'fok-axis fok-axis--x')
    .attr('transform', `translate(0,${inner.h})`)
    .call(fokAxisX(xScale, {
      ticks:      options.xTicks      ?? 8,
      tickValues: options.xTickValues,
      tickFormat: options.xFormat,
    }, theme));

  // ── Axis labels ──────────────────────────────────────────────────────────
  if (options.yLabel) {
    g.append('text')
      .attr('class', 'fok-axis-label')
      .attr('x', -margin.left + 4)
      .attr('y', -10)
      .attr('text-anchor', 'start')
      .attr('fill', theme.colors.grey)
      .attr('font-family', theme.font)
      .attr('font-size', theme.fontSize.axisLabel)
      .text(options.yLabel);
  }

  // ── Line/area generators ─────────────────────────────────────────────────
  const lineGen = d3.line()
    .x(d => xScale(d._x))
    .y(d => yScale(d._y))
    .defined(d => d._y != null && !isNaN(d._y));

  const areaGen = d3.area()
    .x(d => xScale(d._x))
    .y0(yScale(0))
    .y1(d => yScale(d._y))
    .defined(d => d._y != null && !isNaN(d._y));

  // ── Draw series ──────────────────────────────────────────────────────────
  const seriesG = g.append('g').attr('clip-path', `url(#${clipId})`);

  seriesKeys.forEach((key, i) => {
    const pts = seriesMap.get(key).map(d => ({
      _x: xAcc(d), _y: +yAcc(d), _k: key, _raw: d,
    }));
    const color = colorScale(key);

    if (options.area) {
      seriesG.append('path')
        .datum(pts)
        .attr('class', 'fok-area')
        .attr('d', areaGen)
        .attr('fill', color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.18);
    }

    seriesG.append('path')
      .datum(pts)
      .attr('class', 'fok-line')
      .attr('d', lineGen)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', theme.line.strokeWidth)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round');
  });

  // ── Tooltip overlay ───────────────────────────────────────────────────────
  const tip = fokTooltip(theme);

  const defaultTooltip = pt =>
    `<strong style="font-family:${theme.font}">${
      pt._x instanceof Date ? pt._x.getFullYear() : pt._x
    }</strong><br>` +
    (options.multi ? `<span style="color:${colorScale(pt._k)}">${pt._k}</span><br>` : '') +
    `<span style="font-family:${theme.font}">${fokFormatNumber(pt._y, 1)}</span>` +
    (options.yLabel ? ` ${options.yLabel}` : '');

  const tooltipHtml = options.tooltipHtml
    ? pt => options.tooltipHtml(pt._raw)
    : defaultTooltip;

  // Voronoi overlay for hover detection
  const voronoi = d3.Delaunay.from(
    allPoints,
    p => xScale(p._x),
    p => yScale(p._y),
  ).voronoi([0, 0, inner.w, inner.h]);

  const hoverG = seriesG.append('g').attr('class', 'fok-hover-layer');

  hoverG.selectAll('.fok-voronoi-cell')
    .data(allPoints)
    .join('path')
    .attr('class', 'fok-voronoi-cell')
    .attr('d', (d, i) => voronoi.renderCell(i))
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseover', function(event, pt) {
      tip.show(tooltipHtml(pt));
      tip.move(event);

      // highlight nearest dot
      hoverG.selectAll('.fok-hover-dot').remove();
      hoverG.append('circle')
        .attr('class', 'fok-hover-dot')
        .attr('cx', xScale(pt._x))
        .attr('cy', yScale(pt._y))
        .attr('r', theme.line.dotRadiusHovered)
        .attr('fill', colorScale(pt._k))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('pointer-events', 'none');
    })
    .on('mousemove', event => tip.move(event))
    .on('mouseleave', function() {
      tip.hide();
      hoverG.selectAll('.fok-hover-dot').remove();
    });

  // ── Legend ────────────────────────────────────────────────────────────────
  if (options.legend && options.multi) {
    const legendItems = seriesKeys.map(k => ({ label: k, color: colorScale(k) }));
    fokLegend(container, legendItems, {}, theme);
  }

  return { svg, tip };
}
