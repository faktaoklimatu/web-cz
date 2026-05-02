/**
 * fok-chart-area-stacked.js — stacked area chart factory
 *
 * Renders a stacked area chart (optionally normalized to 100 %) into a container.
 * All cosmetics come from the theme; no hardcoded colors or sizes.
 *
 * Dependencies (load order):
 *   D3 v7+  →  fok-theme.js  →  fok-utils.js  →  this file
 *
 * Usage:
 *   fokAreaChartStacked('#chart', data, {
 *     x:            d => d.year,           // string or number year
 *     keys:         ['a', 'b', 'c'],       // stacking order (bottom → top)
 *     colors:       { a: '#f00', b: '#00f', c: '#0f0' },
 *     labels:       { a: 'A', b: 'B', c: 'C' },
 *     proportional: true,                  // normalize rows to 100 %
 *     yLabel:       '% objemu',
 *     title:        'Původ',
 *     width:        420,
 *     height:       300,
 *     theme:        myTheme,
 *     tooltipHtml:  row => `<b>${row.year}</b>...`,
 *   });
 *
 * Options:
 *   x             {function}  accessor returning the x value (numeric year or string)
 *   keys          {string[]}  series keys in stacking order (bottom first)
 *   colors        {object}    { key: colorString }
 *   labels        {object}    { key: labelString }
 *   proportional  {boolean}   normalize each row to 100 % (default false)
 *   legend        {boolean}   render a color legend below the chart (default false)
 *   yLabel        {string}    y-axis label
 *   title         {string}    chart title
 *   yFormat       {function}  override y-axis tick formatter
 *   tooltipHtml   {function}  (row) => HTML string shown on hover
 *   width         {number}    viewBox width  (default 800)
 *   height        {number}    viewBox height (default 420)
 *   margins       {object}    override default margins
 *   theme         {object}    override full theme
 */
function fokAreaChartStacked(containerSelector, data, options = {}) {
  const theme  = { ...FoKTheme, ...(options.theme ?? {}) };
  const margin = fokMargin(options.margins ?? {}, theme);
  const W      = options.width  ?? 800;
  const H      = options.height ?? 420;
  const inner  = { w: W - margin.left - margin.right, h: H - margin.top - margin.bottom };

  const keys   = options.keys   ?? [];
  const colors = options.colors ?? {};
  const labels = options.labels ?? {};
  const xAcc   = options.x ?? (d => d.year);

  // Normalize to proportional if requested
  const rows = data.map(d => {
    const row = { ...d };
    if (options.proportional) {
      const total = keys.reduce((s, k) => s + (+(row[k] ?? 0)), 0);
      if (total > 0) keys.forEach(k => { row[k] = (+(row[k] ?? 0) / total) * 100; });
    }
    return row;
  });

  const xVals = rows.map(d => +(xAcc(d)));

  // Stack
  const series = d3.stack().keys(keys)(rows);

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
  const g   = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  // ── Scales ──────────────────────────────────────────────────────────────
  const xScale = d3.scaleLinear().domain(d3.extent(xVals)).range([0, inner.w]);
  const yMax   = options.proportional ? 100 : d3.max(series, s => d3.max(s, d => d[1]));
  const yScale = d3.scaleLinear().domain([0, yMax]).range([inner.h, 0]);

  // ── Grid + Axes ──────────────────────────────────────────────────────────
  const yFmt = options.yFormat
    ?? (options.proportional ? v => `${Math.round(v)} %` : v => fokFormatNumber(v));

  g.append('g')
    .attr('class', 'fok-axis fok-axis--y')
    .call(fokAxisY(yScale, {
      tickValues: options.proportional ? [0, 25, 50, 75, 100] : undefined,
      tickFormat: yFmt,
      gridLines:  true,
      gridWidth:  inner.w,
    }, theme));

  g.append('g')
    .attr('class', 'fok-axis fok-axis--x')
    .attr('transform', `translate(0,${inner.h})`)
    .call(fokAxisX(xScale, {
      tickValues: xVals,
      tickFormat: v => String(Math.round(v)),
    }, theme));

  // ── Y-axis label ─────────────────────────────────────────────────────────
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

  // ── Area + separator line generators ─────────────────────────────────────
  const areaGen = d3.area()
    .x((d, i) => xScale(xVals[i]))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]));

  const topLineGen = d3.line()
    .x((d, i) => xScale(xVals[i]))
    .y(d => yScale(d[1]));

  // ── Draw stacked areas ───────────────────────────────────────────────────
  const areasG = g.append('g');

  series.forEach(s => {
    areasG.append('path')
      .datum(s)
      .attr('fill', colors[s.key] ?? theme.colors.categorical[0])
      .attr('opacity', 0.88)
      .attr('d', areaGen);

    areasG.append('path')
      .datum(s)
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.8)
      .attr('opacity', 0.5)
      .attr('d', topLineGen);
  });

  // ── Tooltip + vertical crosshair ─────────────────────────────────────────
  const tip = fokTooltip(theme);

  const vline = g.append('line')
    .attr('y1', 0).attr('y2', inner.h)
    .attr('stroke', theme.colors.grey)
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', '4 3')
    .attr('opacity', 0)
    .attr('pointer-events', 'none');

  function defaultTooltip(row) {
    const xVal = +xAcc(row);
    let html = `<strong style="font-family:${theme.font}">${Math.round(xVal)}</strong><br>`;
    keys.slice().reverse().forEach(k => {
      const v = +(row[k] ?? 0);
      html += `<span style="color:${colors[k] ?? '#888'}">■</span> `
        + `<span style="font-family:${theme.font}">${labels[k] ?? k}: ${fokFormatNumber(v, 1)}${options.proportional ? ' %' : ''}</span><br>`;
    });
    return html;
  }

  const tooltipFn = options.tooltipHtml ?? defaultTooltip;

  g.append('rect')
    .attr('width', inner.w)
    .attr('height', inner.h)
    .attr('fill', 'transparent')
    .style('cursor', 'crosshair')
    .on('mousemove', function(event) {
      const [mx] = d3.pointer(event);
      const xYear = xScale.invert(mx);
      const closest = xVals.reduce(
        (best, yr) => Math.abs(yr - xYear) < Math.abs(best - xYear) ? yr : best,
        xVals[0],
      );
      const row = rows.find(d => +xAcc(d) === closest);
      if (!row) return;
      vline.attr('x1', xScale(closest)).attr('x2', xScale(closest)).attr('opacity', 1);
      tip.show(tooltipFn(row));
      tip.move(event);
    })
    .on('mouseleave', () => { vline.attr('opacity', 0); tip.hide(); });

  // ── Legend ────────────────────────────────────────────────────────────────
  if (options.legend) {
    const legendItems = keys.map(k => ({ label: labels[k] ?? k, color: colors[k] ?? '#888' }));
    fokLegend(container, legendItems, {}, theme);
  }

  return { svg, tip };
}
