/**
 * fok-chart-bar-stacked.js — stacked bar chart factory
 *
 * Covers two common patterns:
 *   1. Proportional horizontal bar  (options.proportional: true, options.horizontal: true)
 *      → used for "share of X" single-row breakdowns
 *   2. Stacked vertical/horizontal bars
 *      → used for small-multiples "base + delta" charts (fuel prices, etc.)
 *
 * Dependencies: D3 v7+  →  fok-theme.js  →  fok-utils.js  →  this file
 *
 * Data format:
 *   Array of row objects. Each row must contain one field per `options.keys` entry.
 *   The `x` accessor picks the category label from each row.
 *
 * Usage — proportional single-row:
 *   fokBarChartStacked('#el', [{ ets1: 35, ets2: 39, rest: 26 }], {
 *     x: () => '',
 *     keys:   ['ets1', 'ets2', 'rest'],
 *     colors: { ets1: '#3b3b93', ets2: '#0d80d8', rest: '#b5b8bd' },
 *     labels: { ets1: 'ETS 1',   ets2: 'ETS 2',   rest: 'Nezpoplatněné' },
 *     proportional: true,
 *     horizontal:   true,
 *     showInnerLabels: true,
 *   });
 *
 * Usage — stacked vertical (small multiples):
 *   fokBarChartStacked('#el', data, {
 *     x:      d => d.permitPrice + '€',
 *     keys:   ['base', 'ets'],
 *     colors: { base: '#bfcad9', ets: '#3b3b93' },
 *     labels: { base: 'Současná cena',  ets: 'Nárůst (ETS 2)' },
 *     yLabel: 'Kč / litr',
 *   });
 *
 * Options:
 *   keys          {string[]}   stack keys, bottom→top order
 *   colors        {object}     key → fill color
 *   labels        {object}     key → display label (legend, tooltip)
 *   x             {function}   category accessor  (default: d => d.label)
 *   horizontal    {boolean}    horizontal bars     (default false)
 *   proportional  {boolean}    normalize to 100%   (default false)
 *   showInnerLabels {boolean}  text inside bars    (default false)
 *   legend        {boolean}    render legend       (default true when >1 key)
 *   legendDirection {'horizontal'|'vertical'}      (default 'horizontal')
 *   tooltipHtml   {function}   (rawRow, key) => HTML
 *   yLabel        {string}
 *   title         {string}
 *   width/height  {number}
 *   margins       {object}
 *   theme         {object}
 */
function fokBarChartStacked(containerSelector, data, options = {}) {
  // ── Config ────────────────────────────────────────────────────────────────
  const theme   = { ...FoKTheme, ...(options.theme ?? {}) };
  const margin  = fokMargin(options.margins ?? {}, theme);
  const W       = options.width  ?? 800;
  const H       = options.height ?? 420;
  const inner   = { w: W - margin.left - margin.right, h: H - margin.top - margin.bottom };

  const keys        = options.keys        ?? [];
  const colorMap    = options.colors      ?? {};
  const labelMap    = options.labels      ?? {};
  const xAcc        = options.x           ?? (d => d.label);
  const horiz       = options.horizontal  ?? false;
  const proportional = options.proportional ?? false;
  const showLabels  = options.showInnerLabels ?? false;

  // ── Normalize rows ────────────────────────────────────────────────────────
  const rows = data.map(d => {
    const total = keys.reduce((s, k) => s + (+d[k] || 0), 0);
    const row   = { _x: xAcc(d), _raw: d, _total: total };
    keys.forEach(k => {
      row[k] = proportional ? (+d[k] || 0) / total * 100 : (+d[k] || 0);
    });
    return row;
  });

  // ── Clear + title ─────────────────────────────────────────────────────────
  const container = d3.select(containerSelector);
  container.selectAll('*').remove();

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

  // ── SVG scaffold ──────────────────────────────────────────────────────────
  const svg = fokResponsiveSVG(container, `0 0 ${W} ${H}`);
  const g   = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  // ── D3 stack ──────────────────────────────────────────────────────────────
  const stack  = d3.stack().keys(keys);
  const series = stack(rows);
  const yMax   = proportional ? 100 : d3.max(series, s => d3.max(s, d => d[1]));
  const cats   = rows.map(r => r._x);

  // ── Scales ────────────────────────────────────────────────────────────────
  let xScale, yScale;
  if (!horiz) {
    xScale = d3.scaleBand().domain(cats).range([0, inner.w])
      .paddingInner(theme.bar.padding).paddingOuter(theme.bar.padding / 2);
    yScale = d3.scaleLinear().domain([0, yMax]).range([inner.h, 0]).nice();
  } else {
    xScale = d3.scaleLinear().domain([0, yMax]).range([0, inner.w]);
    yScale = d3.scaleBand().domain(cats).range([0, inner.h])
      .paddingInner(theme.bar.padding).paddingOuter(theme.bar.padding / 2);
  }

  // ── Axes ──────────────────────────────────────────────────────────────────
  const pctFmt = v => Math.round(v) + ' %';

  if (!horiz) {
    g.append('g').attr('class', 'fok-axis fok-axis--y')
      .call(fokAxisY(yScale, {
        ticks:      options.yTicks ?? 6,
        tickValues: options.yTickValues,
        tickFormat: proportional ? pctFmt : (options.yFormat ?? (v => fokFormatNumber(v))),
        gridLines:  true,
        gridWidth:  inner.w,
      }, theme));

    g.append('g').attr('class', 'fok-axis fok-axis--x')
      .attr('transform', `translate(0,${inner.h})`)
      .call(fokAxisX(xScale, { tickValues: options.xTickValues, tickFormat: options.xFormat }, theme));
  } else {
    // Horizontal: y-axis = categories (band), x-axis = values
    g.append('g').attr('class', 'fok-axis fok-axis--y')
      .call(fokAxisY(yScale, { tickFormat: options.xFormat, gridLines: false }, theme));

    g.append('g').attr('class', 'fok-axis fok-axis--x')
      .attr('transform', `translate(0,${inner.h})`)
      .call(fokAxisX(xScale, {
        ticks:      proportional ? 5 : 6,
        tickFormat: proportional ? pctFmt : (options.yFormat ?? (v => fokFormatNumber(v))),
        gridLines:  true,
        gridHeight: inner.h,
      }, theme));
  }

  // ── y-axis label (horizontal, above chart) ────────────────────────────────
  if (options.yLabel && !horiz) {
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
  if (options.yLabel && horiz) {
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

  // ── Tooltip ───────────────────────────────────────────────────────────────
  const tip = fokTooltip(theme);

  function defaultTooltip(d, key) {
    const raw = proportional ? d._raw[key] : d[key];
    const fmt = proportional
      ? fokFormatNumber(raw, 1) + ' %'
      : fokFormatNumber(d[key], 1) + (options.yLabel ? ' ' + options.yLabel : '');
    return `<strong style="font-family:${theme.font}">${d._x || ''}</strong><br>`
      + `<span style="color:${colorMap[key] ?? '#666'}">■</span> `
      + `<span style="font-family:${theme.font}">${labelMap[key] ?? key}: ${fmt}</span>`;
  }

  // ── Draw stacked rects ────────────────────────────────────────────────────
  series.forEach(s => {
    const key = s.key;
    const grp = g.append('g').attr('class', 'fok-stack-group');

    const rects = grp.selectAll('rect')
      .data(s)
      .join('rect')
      .attr('class', 'fok-bar')
      .attr('fill',         colorMap[key] ?? theme.colors.primary)
      .attr('stroke',       '#fff')
      .attr('stroke-width', 0.5)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 0.8);
        tip.show(options.tooltipHtml ? options.tooltipHtml(d.data._raw, key) : defaultTooltip(d.data, key));
        tip.move(event);
      })
      .on('mousemove', event => tip.move(event))
      .on('mouseleave', function() {
        d3.select(this).attr('opacity', 1);
        tip.hide();
      });

    if (!horiz) {
      rects
        .attr('x',      d => xScale(d.data._x))
        .attr('width',  xScale.bandwidth())
        .attr('y',      d => yScale(d[1]))
        .attr('height', d => Math.max(0, yScale(d[0]) - yScale(d[1])));

      if (showLabels) {
        const minH = theme.fontSize.axisLabel * 2.5;
        const offset = theme.fontSize.axisLabel * 1.5;
        grp.selectAll('.fok-bar-label')
          .data(s.filter(d => yScale(d[0]) - yScale(d[1]) >= minH))
          .join('text')
          .attr('class', 'fok-bar-label')
          .attr('x', d => xScale(d.data._x) + xScale.bandwidth() / 2)
          .attr('y', d => yScale(d[1]) + offset)
          .attr('text-anchor', 'middle')
          .attr('fill', '#fff')
          .attr('font-family', theme.font)
          .attr('font-size', 10)
          .attr('font-weight', 400)
          .attr('pointer-events', 'none')
          .text(d => {
            const val = proportional ? (d[1] - d[0]) : d.data._raw[key];
            return proportional
              ? Math.round(d[1] - d[0]) + ' %'
              : fokFormatNumber(val, 0);
          });
      }
    } else {
      rects
        .attr('y',      d => yScale(d.data._x))
        .attr('height', yScale.bandwidth())
        .attr('x',      d => xScale(d[0]))
        .attr('width',  d => Math.max(0, xScale(d[1]) - xScale(d[0])));
    }

    // ── Inner labels (proportional + horizontal mode) ──────────────────────
    if (showLabels && horiz) {
      grp.selectAll('.fok-bar-label')
        .data(s.filter(d => xScale(d[1]) - xScale(d[0]) > 28))
        .join('text')
        .attr('class', 'fok-bar-label')
        .attr('x',    d => xScale(d[0]) + (xScale(d[1]) - xScale(d[0])) / 2)
        .attr('y',    d => yScale(d.data._x) + yScale.bandwidth() / 2)
        .attr('dy',   '0.35em')
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .attr('font-family', theme.font)
        .attr('font-size', theme.fontSize.axisLabel)
        .attr('font-weight', theme.fontWeight.bold)
        .attr('pointer-events', 'none')
        .text(d => {
          const val = proportional ? (d[1] - d[0]) : d.data._raw[key];
          return proportional
            ? Math.round(d[1] - d[0]) + ' %'
            : fokFormatNumber(val, 0);
        });
    }
  });

  // ── Legend ────────────────────────────────────────────────────────────────
  const showLegend = options.legend !== false && keys.length > 1;
  if (showLegend) {
    const items = keys.map(k => ({ label: labelMap[k] ?? k, color: colorMap[k] ?? theme.colors.primary }));
    fokLegend(container, items, { direction: options.legendDirection ?? 'horizontal' }, theme);
  }

  return { svg, tip };
}
