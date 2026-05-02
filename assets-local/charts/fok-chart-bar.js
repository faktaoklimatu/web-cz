/**
 * fok-chart-bar.js — bar chart factory
 *
 * Renders a vertical bar chart into a container element.
 * All cosmetics come from the theme; no hardcoded colors or sizes.
 *
 * Dependencies (load order):
 *   D3 v7+  →  fok-theme.js  →  fok-utils.js  →  this file
 *
 * Basic usage:
 *   fokBarChart('#my-container', data, {
 *     x: d => d.label,
 *     y: d => d.value,
 *     yLabel: 'Mt CO₂',
 *   });
 *
 * Data format:
 *   Array of objects. The `x` and `y` accessors tell the chart which fields to use.
 *
 * Options:
 *   x          {function}  accessor for x category (default: d => d.label)
 *   y          {function}  accessor for y value    (default: d => d.value)
 *   color      {function|string}  accessor or fixed color for bar fill
 *                               (default: theme.colors.primary)
 *   yLabel     {string}    label shown on y-axis
 *   xLabel     {string}    label shown on x-axis
 *   title      {string}    chart title rendered above
 *   yDomain    {[min,max]} override y scale domain
 *   yFormat    {function}  tick formatter for y axis
 *   xFormat    {function}  tick formatter for x axis (band labels)
 *   tooltipHtml{function}  (d) => HTML string for tooltip
 *   width      {number}    viewBox width  (default 800)
 *   height     {number}    viewBox height (default 420)
 *   margins    {object}    override default margins
 *   theme      {object}    override full theme
 *   horizontal {boolean}   render as horizontal bar chart (default false)
 *   sorted     {boolean}   sort bars descending by value (default false)
 */
function fokBarChart(containerSelector, data, options = {}) {
  // ── Resolve config ──────────────────────────────────────────────────────
  const theme   = { ...FoKTheme, ...(options.theme ?? {}) };
  const margin  = fokMargin(options.margins ?? {}, theme);
  const W       = options.width  ?? 800;
  const H       = options.height ?? 420;
  const inner   = { w: W - margin.left - margin.right, h: H - margin.top - margin.bottom };

  const xAcc    = options.x     ?? (d => d.label);
  const yAcc    = options.y     ?? (d => d.value);
  const colorAcc = typeof options.color === 'function'
    ? options.color
    : () => (typeof options.color === 'string' ? options.color : theme.colors.primary);

  const horiz   = options.horizontal ?? false;
  const sorted  = options.sorted     ?? false;

  // ── Prepare data ────────────────────────────────────────────────────────
  let rows = data.map(d => ({ _x: xAcc(d), _y: +yAcc(d), _raw: d }));
  if (sorted) rows = rows.slice().sort((a, b) => d3.descending(a._y, b._y));

  const labels = rows.map(r => r._x);
  const yMax   = options.yDomain ? options.yDomain[1] : d3.max(rows, r => r._y);
  const yMin   = options.yDomain ? options.yDomain[0] : Math.min(0, d3.min(rows, r => r._y));

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
  const svg = fokResponsiveSVG(container, `0 0 ${W} ${H}`)
    .attr('class', 'fok-chart-svg');

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // ── Scales ──────────────────────────────────────────────────────────────
  let xScale, yScale;

  if (!horiz) {
    xScale = d3.scaleBand()
      .domain(labels)
      .range([0, inner.w])
      .paddingInner(theme.bar.padding)
      .paddingOuter(theme.bar.padding / 2);

    yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([inner.h, 0])
      .nice();
  } else {
    // Horizontal: x→value, y→category
    xScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([0, inner.w])
      .nice();

    yScale = d3.scaleBand()
      .domain(labels)
      .range([0, inner.h])
      .paddingInner(theme.bar.padding)
      .paddingOuter(theme.bar.padding / 2);
  }

  // ── Grid + Axes ──────────────────────────────────────────────────────────
  if (!horiz) {
    // Horizontal grid lines
    g.append('g')
      .attr('class', 'fok-axis fok-axis--y')
      .call(fokAxisY(yScale, {
        ticks: 6,
        tickFormat: options.yFormat ?? (v => fokFormatNumber(v)),
        gridLines: true,
        gridWidth: inner.w,
      }, theme));

    // X axis
    g.append('g')
      .attr('class', 'fok-axis fok-axis--x')
      .attr('transform', `translate(0,${inner.h})`)
      .call(fokAxisX(xScale, {
        tickFormat: options.xFormat,
      }, theme));
  } else {
    // Horizontal bar chart: y-axis = categories, x-axis = values
    g.append('g')
      .attr('class', 'fok-axis fok-axis--y')
      .call(fokAxisY(yScale, {
        tickFormat: options.xFormat,
        gridLines: false,
      }, theme));

    g.append('g')
      .attr('class', 'fok-axis fok-axis--x')
      .attr('transform', `translate(0,${inner.h})`)
      .call(fokAxisX(xScale, {
        ticks: 6,
        tickFormat: options.yFormat ?? (v => fokFormatNumber(v)),
        gridLines: true,
        gridHeight: inner.h,
      }, theme));


  }

  // ── Zero line ────────────────────────────────────────────────────────────
  if (yMin < 0) {
    const zeroY = !horiz ? yScale(0) : xScale(0);
    g.append('line')
      .attr('class', 'fok-zero-line')
      .attr('x1', horiz ? zeroY : 0)
      .attr('x2', horiz ? zeroY : inner.w)
      .attr('y1', horiz ? 0 : zeroY)
      .attr('y2', horiz ? inner.h : zeroY)
      .attr('stroke', theme.colors.grey)
      .attr('stroke-width', 1);
  }

  // ── Axis labels ──────────────────────────────────────────────────────────
  if (options.yLabel) {
    if (!horiz) {
      // Horizontal label above the top of the y-axis
      g.append('text')
        .attr('class', 'fok-axis-label')
        .attr('x', -margin.left + 4)
        .attr('y', -10)
        .attr('text-anchor', 'start')
        .attr('fill', theme.colors.grey)
        .attr('font-family', theme.font)
        .attr('font-size', theme.fontSize.axisLabel)
        .text(options.yLabel);
    } else {
      // Horizontal bar: value axis is x — label below x-axis
      g.append('text')
        .attr('class', 'fok-axis-label')
        .attr('x', inner.w / 2)
        .attr('y', inner.h + margin.bottom - 4)
        .attr('text-anchor', 'middle')
        .attr('fill', theme.colors.grey)
        .attr('font-family', theme.font)
        .attr('font-size', theme.fontSize.axisLabel)
        .text(options.yLabel);
    }
  }

  if (options.xLabel) {
    g.append('text')
      .attr('class', 'fok-axis-label')
      .attr('x', horiz ? -(inner.h / 2) : inner.w / 2)
      .attr('y', horiz ? -(margin.left - 14) : inner.h + margin.bottom - 4)
      .attr('transform', horiz ? 'rotate(-90)' : null)
      .attr('text-anchor', 'middle')
      .attr('fill', theme.colors.grey)
      .attr('font-family', theme.font)
      .attr('font-size', theme.fontSize.axisLabel)
      .text(options.xLabel);
  }

  // ── Tooltip ──────────────────────────────────────────────────────────────
  const tip = fokTooltip(theme);

  const defaultTooltip = d =>
    `<strong style="font-family:${theme.font}">${d._x}</strong><br>` +
    `<span style="font-family:${theme.font}">${fokFormatNumber(d._y, 1)}</span>` +
    (options.yLabel ? ` ${options.yLabel}` : '');

  const tooltipHtml = options.tooltipHtml
    ? d => options.tooltipHtml(d._raw)
    : defaultTooltip;

  // ── Bars ─────────────────────────────────────────────────────────────────
  const bars = g.selectAll('.fok-bar')
    .data(rows)
    .join('rect')
    .attr('class', 'fok-bar');

  if (!horiz) {
    bars
      .attr('x',      d => xScale(d._x))
      .attr('width',  xScale.bandwidth())
      .attr('y',      d => d._y >= 0 ? yScale(d._y) : yScale(0))
      .attr('height', d => Math.abs(yScale(d._y) - yScale(0)))
      .attr('fill',   d => colorAcc(d._raw))
      .attr('rx',     theme.bar.radius)
      .attr('ry',     theme.bar.radius);
  } else {
    bars
      .attr('y',      d => yScale(d._x))
      .attr('height', yScale.bandwidth())
      .attr('x',      d => d._y >= 0 ? xScale(0) : xScale(d._y))
      .attr('width',  d => Math.abs(xScale(d._y) - xScale(0)))
      .attr('fill',   d => colorAcc(d._raw))
      .attr('rx',     theme.bar.radius)
      .attr('ry',     theme.bar.radius);
  }

  bars
    .on('mouseover', function(event, d) {
      d3.select(this).attr('opacity', 0.8);
      tip.show(tooltipHtml(d));
      tip.move(event);
    })
    .on('mousemove', (event) => tip.move(event))
    .on('mouseleave', function() {
      d3.select(this).attr('opacity', 1);
      tip.hide();
    });

  // Cleanup tooltip when chart is replaced
  return { svg, tip };
}
