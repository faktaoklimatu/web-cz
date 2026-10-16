/**
 * fok-utils.js — shared D3 helpers
 *
 * All helpers accept an explicit theme argument so they are testable in isolation
 * and work correctly if the caller passes a patched theme.
 *
 * Dependencies (must be loaded before this file):
 *   - D3 v7+
 *   - fok-theme.js  (FoKTheme)
 */

// ---------------------------------------------------------------------------
// Margin
// ---------------------------------------------------------------------------

/**
 * Returns a margin object merged with theme defaults.
 * @param {object} overrides — partial {top, right, bottom, left}
 * @param {object} [theme]
 * @returns {{top: number, right: number, bottom: number, left: number}}
 */
function fokMargin(overrides = {}, theme = FoKTheme) {
  return { ...theme.margins, ...overrides };
}

// ---------------------------------------------------------------------------
// Responsive SVG
// ---------------------------------------------------------------------------

/**
 * Appends a 100%-wide SVG to container with a fixed viewBox.
 * Returns the d3 selection of the <svg> element.
 *
 * @param {d3.Selection|string} container — d3 selection or CSS selector string
 * @param {string} viewBox — e.g. "0 0 800 400"
 * @param {string} [cssClass]
 * @returns {d3.Selection}
 */
function fokResponsiveSVG(container, viewBox, cssClass = 'fok-chart-svg') {
  const sel = typeof container === 'string' ? d3.select(container) : container;
  return sel.append('svg')
    .attr('width', '100%')
    .attr('viewBox', viewBox)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('class', cssClass);
}

// ---------------------------------------------------------------------------
// Axes
// ---------------------------------------------------------------------------

/**
 * Creates a styled bottom (X) axis.
 *
 * @param {d3.Scale} scale
 * @param {object}  [options]
 * @param {number}  [options.ticks]
 * @param {function}[options.tickFormat]
 * @param {boolean} [options.gridLines=false] — draw vertical grid lines
 * @param {number}  [options.gridHeight]      — required when gridLines=true
 * @param {object}  [theme]
 * @returns {function} — d3 axis + post-render styler
 */
function fokAxisX(scale, options = {}, theme = FoKTheme) {
  const axis = d3.axisBottom(scale)
    .tickSize(options.gridLines ? -options.gridHeight : theme.axis.tickSize)
    .tickPadding(theme.axis.tickPadding);

  if (options.ticks !== undefined)      axis.ticks(options.ticks);
  if (options.tickFormat !== undefined) axis.tickFormat(options.tickFormat);
  if (options.tickValues !== undefined) axis.tickValues(options.tickValues);

  return function(selection) {
    selection.call(axis);
    _styleAxis(selection, options.gridLines, theme);
  };
}

/**
 * Creates a styled left (Y) axis.
 *
 * @param {d3.Scale} scale
 * @param {object}  [options]
 * @param {number}  [options.ticks]
 * @param {function}[options.tickFormat]
 * @param {boolean} [options.gridLines=true]  — draw horizontal grid lines (default on)
 * @param {number}  [options.gridWidth]       — required when gridLines=true
 * @param {number[]}[options.gridValues]      — grid lines at these values too,
 *                                              e.g. every 50 under labels every 100
 * @param {object}  [theme]
 * @returns {function}
 */
function fokAxisY(scale, options = {}, theme = FoKTheme) {
  const gridLines = options.gridLines !== false;
  const axis = d3.axisLeft(scale)
    .tickSize(gridLines ? -options.gridWidth : theme.axis.tickSize)
    .tickPadding(theme.axis.tickPadding);

  if (options.ticks !== undefined)      axis.ticks(options.ticks);
  if (options.tickFormat !== undefined) axis.tickFormat(options.tickFormat);
  if (options.tickValues !== undefined) axis.tickValues(options.tickValues);

  return function(selection) {
    selection.call(axis);
    _styleAxis(selection, gridLines, theme);
    if (gridLines && options.gridValues) {
      selection.append('g').attr('class', 'fok-grid')
        .call(d3.axisLeft(scale).tickValues(options.gridValues).tickSize(-options.gridWidth).tickFormat(''))
        .call(g => _styleAxis(g, true, theme));
    }
  };
}

/**
 * Width a left axis takes: its widest tick label plus the tick padding. As a
 * chart's left margin, it puts the widest label flush with the SVG's left
 * edge, the others right-aligned to it. Takes the same ticks, tickValues and
 * tickFormat as fokAxisY, so it measures the labels the axis will draw.
 * Measured on a canvas: before the web font loads it measures the fallback,
 * so a page redraws once document.fonts.ready.
 *
 * @param {d3.Scale} scale — a linear or band scale; only its domain counts
 * @param {object}  [options]
 * @param {object}  [theme]
 * @returns {number}
 */
function fokAxisYWidth(scale, options = {}, theme = FoKTheme) {
  const format = options.tickFormat ?? (scale.tickFormat ? scale.tickFormat(options.ticks) : String);
  const ctx = (fokAxisYWidth.ctx ??= document.createElement('canvas').getContext('2d'));
  ctx.font = `${theme.fontSize.axisLabel}px ${theme.font}`;
  return Math.ceil(d3.max(_tickValues(scale, options), v => ctx.measureText(format(v)).width) ?? 0)
    + theme.axis.tickPadding;
}

/**
 * The y axis' unit (e.g. "mld. Kč"), drawn last so it sits over the data.
 * By default above the plot, flush with the widest tick label (the SVG's left
 * edge when the margin is fokAxisYWidth). With `inline`, on the top tick's line
 * right after its label — "350 mld. Kč" — over a box in the panel's colour
 * that hides the grid line and whatever else runs under it.
 *
 * @param {d3.Selection} g       — the plot group, translated by the margins
 * @param {d3.Scale}     scale   — the y scale
 * @param {object}       options — the axis' ticks / tickValues, as for fokAxisY
 * @param {string}       text
 * @param {object}       where   — { marginLeft, inline, background = '#fff' }
 * @param {object}       [theme]
 */
function fokAxisYLabel(g, scale, options, text, where, theme = FoKTheme) {
  const box = where.inline ? g.append('rect') : null;
  const label = g.append('text')
    .attr('class', 'fok-axis-label')
    .attr('fill', theme.colors.grey)
    .attr('font-family', theme.font)
    .attr('font-size', theme.fontSize.axisLabel)
    .attr('pointer-events', 'none')
    .attr('text-anchor', 'start')
    .text(text);
  if (!where.inline) {
    label.attr('x', -where.marginLeft).attr('y', -10);
    return;
  }
  // The tick labels end tickPadding left of the plot; a space after that.
  label.attr('x', -theme.axis.tickPadding).attr('dx', '0.3em')
    .attr('y', scale(d3.max(_tickValues(scale, options)))).attr('dy', '0.32em');
  const b = label.node().getBBox();
  box.attr('x', b.x).attr('y', b.y).attr('width', b.width + 4).attr('height', b.height)
    .attr('fill', where.background ?? '#fff').attr('pointer-events', 'none');
}

// The values a d3 axis on `scale` labels, given fokAxisY's options.
function _tickValues(scale, options) {
  return options.tickValues ?? (scale.ticks ? scale.ticks(options.ticks) : scale.domain());
}

function _styleAxis(selection, isGrid, theme) {
  // Domain line — always hidden (grid lines carry the visual weight)
  selection.select('.domain').attr('stroke', 'none');

  // Ticks — grid lines get gridColor, regular ticks get tickColor
  selection.selectAll('.tick line')
    .attr('stroke', isGrid ? theme.axis.gridColor : theme.axis.tickColor)
    .attr('stroke-width', 1);

  // Labels
  selection.selectAll('.tick text')
    .attr('fill', theme.colors.grey)
    .attr('font-family', theme.font)
    .attr('font-size', theme.fontSize.axisLabel);
}

// ---------------------------------------------------------------------------
// Annotation
// ---------------------------------------------------------------------------

/**
 * Appends a styled text annotation to an SVG group.
 *
 * @param {d3.Selection} svg      — the <g> or <svg> to append to
 * @param {string}       text
 * @param {number}       x
 * @param {number}       y
 * @param {object}       [options]
 * @param {string}       [options.anchor='start']  — text-anchor
 * @param {string}       [options.color]
 * @param {object}       [theme]
 * @returns {d3.Selection} the text element
 */
function fokAnnotation(svg, text, x, y, options = {}, theme = FoKTheme) {
  return svg.append('text')
    .attr('class', 'fok-annotation')
    .attr('x', x)
    .attr('y', y)
    .attr('text-anchor', options.anchor ?? 'start')
    .attr('fill', options.color ?? theme.colors.grey)
    .attr('font-family', theme.font)
    .attr('font-size', theme.fontSize.annotation)
    .text(text);
}

// ---------------------------------------------------------------------------
// Hatch fill
// ---------------------------------------------------------------------------

/**
 * Diagonal stripes in `color` over the rect (x, y, w, h) of `g`, for a partial
 * period: 2.5 px stripes every 6 px, rising at 45°, lined up across every rect
 * in `g`. They are plain polygons cut to the rect, not a <pattern> fill, which
 * editors such as Figma drop from an imported SVG. pointer-events off, so the
 * rect under them keeps its hover. Returns the <path>.
 */
function fokHatch(g, x, y, w, h, color) {
  return fokHatchPolygon(g, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], color);
}

/** The same stripes over any convex polygon of `g`, its points [[x, y], …]. */
function fokHatchPolygon(g, poly, color) {
  const P = 6 * Math.SQRT2, T = 2.5 * Math.SQRT2;   // period and stripe width, along x + y
  // The part of polygon `poly` where f ≥ 0: one Sutherland–Hodgman pass.
  const clip = (poly, f) => poly.flatMap((p, i) => {
    const q = poly[(i + 1) % poly.length], fp = f(p), fq = f(q);
    const out = fp >= 0 ? [p] : [];
    if ((fp >= 0) !== (fq >= 0)) {
      const t = fp / (fp - fq);
      out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]);
    }
    return out;
  });
  const sums = poly.map(p => p[0] + p[1]);
  let d = '';
  for (let s = Math.floor(Math.min(...sums) / P) * P; s < Math.max(...sums); s += P) {
    const stripe = clip(clip(poly, p => p[0] + p[1] - s), p => s + T - p[0] - p[1]);
    if (stripe.length > 2) d += 'M' + stripe.map(p => p.map(v => +v.toFixed(2)).join(',')).join('L') + 'Z';
  }
  return g.append('path').attr('class', 'fok-hatch').attr('d', d)
    .attr('fill', color).attr('pointer-events', 'none');
}

// ---------------------------------------------------------------------------
// Event markers
// ---------------------------------------------------------------------------

/**
 * Event markers: a dashed vertical line through the plot, its label in the top
 * margin, clear of whatever the chart does there. pointer-events off, so the
 * hover targets underneath still answer. An empty label draws the line alone.
 *
 * @param {d3.Selection} g        the plot group (origin at the plot's top left)
 * @param {object[]}     markers  as the chart received them
 * @param {function}     xOf      marker => x in the plot, or null to skip it
 * @param {{w:number,h:number}} inner  the plot's size; markers off it are skipped
 */
function fokMarkers(g, markers, xOf, inner, theme = FoKTheme) {
  (markers ?? []).forEach(m => {
    const mx = xOf(m);
    if (mx == null || !Number.isFinite(mx) || mx < 0 || mx > inner.w) return;
    const mg = g.append('g').attr('class', 'fok-marker').attr('pointer-events', 'none');
    mg.append('line')
      .attr('x1', mx).attr('x2', mx)
      .attr('y1', -4).attr('y2', inner.h)
      .attr('stroke', theme.colors.text)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3 3');
    if (m.label) {
      // Centred on the line, unless that would run past the plot's edge: then
      // it hangs inward from the line. Half the width is estimated from the
      // character count, which is close enough for a short label.
      const half = m.label.length * theme.fontSize.axisLabel * 0.28;
      mg.append('text')
        .attr('x', mx).attr('y', -10)
        .attr('text-anchor', mx + half > inner.w ? 'end' : mx - half < 0 ? 'start' : 'middle')
        .attr('fill', theme.colors.text)
        .attr('font-family', theme.font)
        .attr('font-size', theme.fontSize.axisLabel)
        .text(m.label);
    }
  });
}

// ---------------------------------------------------------------------------
// Legend
// ---------------------------------------------------------------------------

/**
 * Renders a horizontal (default) or vertical color legend into container.
 *
 * @param {d3.Selection|string} container
 * @param {Array<{label: string, color: string}>} items
 * @param {object} [options]
 * @param {'horizontal'|'vertical'} [options.direction='horizontal']
 * @param {number} [options.swatchSize=12]
 * @param {number} [options.gap=14]          — gap between swatch and label
 * @param {number} [options.radius]          — swatch corner radius, px (CSS default 2)
 * @param {function}[options.labelColor]     — item → label colour (default theme grey)
 * @param {string} [options.position='bottom'] — 'top': before the chart's SVG
 * @param {number} [options.itemSpacing]     — spacing between legend items, px (CSS default 16)
 * @param {number} [options.fontSize]        — label size, px (default theme axisLabel)
 * @param {string} [options.justify]         — CSS justify-content of the row, e.g. 'space-between'
 * @param {object} [theme]
 */
function fokLegend(container, items, options = {}, theme = FoKTheme) {
  const sel = typeof container === 'string' ? d3.select(container) : container;
  const direction    = options.direction    ?? 'horizontal';
  const swatchSize   = options.swatchSize   ?? 12;
  const gap          = options.gap          ?? 14;

  const legendEl = (options.position === 'top' ? sel.insert('div', ':scope > svg') : sel.append('div'))
    .attr('class', `fok-legend fok-legend--${direction} fok-legend--${options.position ?? 'bottom'}`)
    .style('column-gap', options.itemSpacing != null ? options.itemSpacing + 'px' : null)
    .style('justify-content', options.justify ?? null);

  items.forEach(item => {
    const itemEl = legendEl.append('div').attr('class', 'fok-legend__item');

    // A dashed series (item.dashed) gets a dashed stroke for a swatch, so the
    // legend reads like the line; everything else a filled square.
    const swatch = itemEl.append('span')
      .attr('class', 'fok-legend__swatch')
      .style('width',  swatchSize + 'px')
      .style('border-radius', options.radius != null ? options.radius + 'px' : null);
    if (item.dashed) swatch.style('height', 0).style('border-top', `2px dashed ${item.color}`);
    else swatch.style('background', item.color).style('height', swatchSize + 'px');

    itemEl.append('span')
      .attr('class', 'fok-legend__label')
      .style('font-family', theme.font)
      .style('font-size', (options.fontSize ?? theme.fontSize.axisLabel) + 'px')
      .style('color', options.labelColor ? options.labelColor(item) : theme.colors.grey)
      .style('margin-left', gap + 'px')
      .text(item.label);
  });
}

/**
 * A text label at (x, y), px in `g`: one or more lines, `**…**` in a line bold.
 * `valign` puts y at the last line's baseline, the others stacked above it
 * ('baseline', the default); at the block's middle ('middle'); at the first
 * line's cap height ('top'); or at the first line's middle ('first'). A white
 * halo keeps it legible where a line crosses it, unless `halo: false` (a label
 * on a filled band). Returns the <text>.
 *
 * @param {d3.Selection} g
 * @param {number} x
 * @param {number} y
 * @param {object} l — { lines, anchor = 'start', valign = 'baseline', color,
 *   fontSize (default theme axisLabel), halo = true }
 * @param {object} [theme]
 */
function fokLabel(g, x, y, l, theme = FoKTheme) {
  const n = l.lines.length;
  const text = g.append('text')
    .attr('class', 'fok-label')
    .attr('y', y)
    .attr('text-anchor', l.anchor ?? 'start')
    .attr('fill', l.color ?? theme.colors.grey)
    .attr('font-family', theme.font)
    .attr('font-size', l.fontSize ?? theme.fontSize.axisLabel)
    .attr('pointer-events', 'none');
  if (l.halo !== false) {
    text.attr('stroke', '#fff').attr('stroke-width', 3).attr('paint-order', 'stroke')
      .attr('stroke-linejoin', 'round');   // no spikes at the letters' corners
  }
  l.lines.forEach((line, i) => {
    const row = text.append('tspan').attr('x', x)
      .attr('dy', i ? '1.2em' : {
        middle: `${0.35 - 0.6 * (n - 1)}em`,
        top: '0.71em',   // Roboto's cap height
        first: '0.35em',
      }[l.valign] ?? `${-1.2 * (n - 1)}em`);
    line.split('**').forEach((part, j) => part && row.append('tspan')
      .attr('font-weight', j % 2 ? theme.fontWeight.bold : null).text(part));
  });
  return text;
}

// ---------------------------------------------------------------------------
// Arrows
// ---------------------------------------------------------------------------

/**
 * Arrowheads by name, for fokArrow's `head`. Each draws its head into `g` with
 * the tip at `tip`, pointing along `angle` (radians: the curve's direction
 * over the head's length), and says how far short of the tip the line stops
 * (`inset`), so a head is not poked through by the line. `a` carries the
 * arrow's resolved color, strokeWidth, headSize and headAngle (radians).
 * Another kind of head is one more entry.
 */
const FOK_ARROW_HEADS = {
  none: { inset: () => 0, draw: () => {} },
  // Two strokes back from the tip, square-ended and mitred to a sharp point.
  // A mitre sticks out past the strokes' vertex, so the vertex is set back
  // that far and the point lands on the tip; the line ends at the vertex.
  open: {
    inset: a => a.strokeWidth / (2 * Math.sin(a.headAngle)),
    draw: (g, tip, angle, a) => {
      const v = fokArrowBack(tip, angle, a.strokeWidth / (2 * Math.sin(a.headAngle)));
      return g.append('path')
        .attr('d', `M${fokArrowBarb(v, angle, a, -1)}L${v}L${fokArrowBarb(v, angle, a, 1)}`)
        .attr('fill', 'none').attr('stroke', a.color).attr('stroke-width', a.strokeWidth)
        .attr('stroke-linecap', 'butt').attr('stroke-linejoin', 'miter').attr('stroke-miterlimit', 10);
    },
  },
  // A solid triangle; the line ends at its base.
  triangle: {
    inset: a => a.headSize * Math.cos(a.headAngle),
    draw: (g, tip, angle, a) => g.append('path')
      .attr('d', `M${fokArrowBarb(tip, angle, a, -1)}L${tip}L${fokArrowBarb(tip, angle, a, 1)}Z`)
      .attr('fill', a.color),
  },
  // A dot on the target; the line ends at its edge.
  dot: {
    inset: a => a.headSize / 2,
    draw: (g, tip, angle, a) => g.append('circle')
      .attr('cx', tip[0]).attr('cy', tip[1]).attr('r', a.headSize / 2).attr('fill', a.color),
  },
};

/** One barb of a head: headSize back from the tip, headAngle to the given side. */
function fokArrowBarb(tip, angle, a, side) {
  const t = angle + Math.PI + side * a.headAngle;
  return [tip[0] + a.headSize * Math.cos(t), tip[1] + a.headSize * Math.sin(t)].map(v => +v.toFixed(2));
}

/** The point `d` px back from `p` against direction `angle`. */
function fokArrowBack(p, angle, d) {
  return [p[0] - d * Math.cos(angle), p[1] - d * Math.sin(angle)].map(v => +v.toFixed(2));
}

/**
 * An annotation arrow in `g`: a text, and a curved line from it to what it is
 * about. px in `g`; the chart factories take the ends in data units (their
 * `arrows` option) and pass them on here.
 *
 * The line is a cubic Bézier curve from textEnd to target. `bezier` places its
 * two control points as fractions of that run, the way CSS cubic-bezier()
 * does: [x1, y1, x2, y2] puts the first at textEnd + (x1·dx, y1·dy) and the
 * second at textEnd + (x2·dx, y2·dy). The default [0.5, 0, 1, 0.5] leaves the
 * text level and arrives at the target upright; [0, 0, 1, 1] is straight.
 * `controls` gives the two points outright instead, where the run is too short
 * for fractions — a hook out and back round the end of a band, say.
 *
 * @param {d3.Selection} g
 * @param {object} a — {
 *   target: [x, y]   where the head points; the tip stops `gap` (4) short of it.
 *                    Without one there is no line, only the text at textEnd
 *   textEnd: [x, y]  where the line leaves the text
 *   lines            the text, as fokLabel's: one string a line, `**…**` bold
 *   side             where the text sits from textEnd, `textGap` (4) away:
 *                    'right' (default) or 'left', level with its first line's
 *                    middle; 'above' or 'below', centred
 *   bezier           [x1, y1, x2, y2], see above
 *   controls         [[x, y], [x, y]], the control points themselves; over bezier
 *   head             a key of FOK_ARROW_HEADS: 'open' (default), 'triangle',
 *                    'dot', 'none'; headSize (6 px), headAngle (35°, degrees),
 *                    its strokes as thick as the line. The head points
 *                    the way the curve runs over its last headSize, not along
 *                    the tangent at the very tip, which a bend near the end
 *                    would leave looking askew.
 *   color            line, head and text (default theme grey); strokeWidth (1)
 *   fontSize         default theme axisLabel
 *   background       a white box under the text (default true), cutting the
 *                    grid lines behind it; false gives fokLabel's halo instead
 * }
 * @param {object} [theme]
 * @returns {d3.Selection} the arrow's <g>
 */
function fokArrow(g, a, theme = FoKTheme) {
  const o = {
    color: theme.colors.grey, strokeWidth: 1, headSize: 6, gap: 4, textGap: 4,
    head: 'open', bezier: [0.5, 0, 1, 0.5], side: 'right', background: true,
    ...a,
  };
  o.headAngle = (a.headAngle ?? 35) * Math.PI / 180;
  const head = FOK_ARROW_HEADS[o.head] ?? FOK_ARROW_HEADS.open;
  const [sx, sy] = o.textEnd;
  const arrow = g.append('g').attr('class', 'fok-arrow').attr('pointer-events', 'none');

  // Without a target, the text alone.
  if (o.target) {
    const [tx, ty] = o.target;
    const [dx, dy] = [tx - sx, ty - sy];
    const [x1, y1, x2, y2] = o.bezier;
    const [c1, c2] = o.controls ?? [[sx + x1 * dx, sy + y1 * dy], [sx + x2 * dx, sy + y2 * dy]];

    // The curve ends at the tip, `gap` short of the target the way it arrives
    // there: from its last control point that is not on the target.
    const from = [c2, c1, o.textEnd].find(p => Math.hypot(tx - p[0], ty - p[1]) > 1e-6) ?? o.textEnd;
    const tip = fokArrowBack(o.target, Math.atan2(ty - from[1], tx - from[0]), o.gap);
    const P = [o.textEnd, c1, c2, tip];
    const lerp = (p, q, t) => [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
    // de Casteljau: the control points of the curve's part from 0 to t, the
    // last of them its point at t.
    const upTo = t => {
      const p01 = lerp(P[0], P[1], t), p12 = lerp(P[1], P[2], t), p23 = lerp(P[2], P[3], t);
      const p012 = lerp(p01, p12, t), p123 = lerp(p12, p23, t);
      return [P[0], p01, p012, lerp(p012, p123, t)];
    };
    // The last t whose point is `dist` px or more from the tip.
    const tBack = dist => {
      for (let t = 1; t > 0; t -= 0.002) {
        const q = upTo(t)[3];
        if (Math.hypot(tip[0] - q[0], tip[1] - q[1]) >= dist) return t;
      }
      return 0;
    };
    const q = upTo(tBack(o.headSize * Math.cos(o.headAngle)))[3];
    const angle = Math.atan2(tip[1] - q[1], tip[0] - q[0]);

    const r = p => p.map(v => +v.toFixed(2));
    const [, l1, l2, l3] = upTo(tBack(head.inset(o)));
    arrow.append('path')
      .attr('d', `M${r(o.textEnd)}C${r(l1)},${r(l2)},${r(l3)}`)
      .attr('fill', 'none').attr('stroke', o.color).attr('stroke-width', o.strokeWidth)
      .attr('stroke-linecap', 'butt');
    head.draw(arrow, tip, angle, o);
  }

  const at = {
    right: [sx + o.textGap, sy, 'start', 'first'],
    left:  [sx - o.textGap, sy, 'end', 'first'],
    above: [sx, sy - o.textGap, 'middle', 'baseline'],
    below: [sx, sy + o.textGap, 'middle', 'top'],
  }[o.side] ?? [sx + o.textGap, sy, 'start', 'first'];
  const text = fokLabel(arrow, at[0], at[1], {
    lines: o.lines, anchor: at[2], valign: at[3], color: o.color, fontSize: o.fontSize,
    halo: !o.background,
  }, theme);
  if (o.background) {
    const b = text.node().getBBox(), pad = 3;
    arrow.insert('rect', () => text.node())
      .attr('x', b.x - pad).attr('y', b.y - pad)
      .attr('width', b.width + 2 * pad).attr('height', b.height + 2 * pad)
      .attr('fill', '#fff');
  }
  return arrow;
}

/**
 * A chart's `arrows` option, drawn into its plot group `g`: each as fokArrow's,
 * with target, textEnd and controls in data units, which `at([x, y])` turns
 * into px.
 */
function fokArrowsIn(g, arrows, at, theme = FoKTheme) {
  (arrows ?? []).forEach(a => fokArrow(g, {
    ...a, target: a.target && at(a.target), textEnd: at(a.textEnd), controls: a.controls?.map(at),
  }, theme));
}

/**
 * Grows a chart upward until everything in its plot group `g` fits in the
 * SVG: for text set above the plot, such as an arrow's. The plot keeps its
 * size and place in the group; the SVG gets taller and the group moves down.
 * Updates margin.top; returns how many px it grew.
 */
function fokFitTop(svg, g, margin, W, H, pad = 2) {
  const over = Math.ceil(-g.node().getBBox().y - margin.top + pad);
  if (over <= 0) return 0;
  margin.top += over;
  g.attr('transform', `translate(${margin.left},${margin.top})`);
  svg.attr('viewBox', `0 0 ${W} ${H + over}`);
  return over;
}

/**
 * A legend drawn into the SVG, one item a row, on a box in the panel's colour:
 * for a legend laid over an empty corner of the plot rather than beside it.
 * Square swatches; the label `gap` (default a third of a swatch) to the right.
 *
 * @param {d3.Selection} g     — the plot group
 * @param {Array<{label: string, color: string}>} items — top row first
 * @param {object} [options]   — x, y: the box's top-left corner, px in `g`
 *   (its top-right one with `align: 'right'`); swatchSize (12), gap,
 *   rowGap (6), padding (6), background ('#fff'), labelColor (item → colour;
 *   default theme grey)
 * @param {object} [theme]
 */
function fokLegendSvg(g, items, options = {}, theme = FoKTheme) {
  const size = options.swatchSize ?? 12;
  const gap  = options.gap ?? size / 3;
  const pad  = options.padding ?? 6;
  const box  = g.append('g').attr('class', 'fok-legend-svg').attr('pointer-events', 'none')
    .attr('transform', `translate(${options.x ?? 0},${options.y ?? 0})`);
  const bg   = box.append('rect').attr('fill', options.background ?? '#fff');
  const rows = box.append('g');
  items.forEach((item, i) => {
    const row = rows.append('g').attr('transform', `translate(${pad},${pad + i * (size + (options.rowGap ?? 6))})`);
    row.append('rect').attr('width', size).attr('height', size).attr('fill', item.color);
    row.append('text')
      .attr('x', size + gap).attr('y', size / 2).attr('dy', '0.35em')
      .attr('fill', options.labelColor ? options.labelColor(item) : theme.colors.grey)
      .attr('font-family', theme.font)
      .attr('font-size', theme.fontSize.axisLabel)
      .text(item.label);
  });
  const b = rows.node().getBBox();
  const w = b.x + b.width + pad;
  bg.attr('width', w).attr('height', b.y + b.height + pad);
  if (options.align === 'right') {
    box.attr('transform', `translate(${(options.x ?? 0) - w},${options.y ?? 0})`);
  }
}

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------

/**
 * Returns show/hide/move helpers for the page's floating tooltip div, kept on
 * document.body (escapes SVG stacking context).
 *
 * There is one such div per page, shared by every chart and every redraw. A
 * new one per draw piled up on <body>, and one that was showing when its chart
 * redrew under the mouse stayed stuck: the handler that would hide it went
 * with the old chart. Each call restyles it and hides it.
 * ponytail: styled by the last chart drawn; restyle in show() if a page ever
 * mixes tooltip themes.
 *
 * @param {object} [theme]
 * @returns {{ show: function, move: function, hide: function, remove: function }}
 */
function fokTooltip(theme = FoKTheme) {
  const tip = d3.select('body').selectAll('.fok-tooltip').data([null]).join('div')
    .attr('class', 'fok-tooltip')
    .style('position', 'fixed')
    .style('pointer-events', 'none')
    .style('opacity', 0)
    .style('background', theme.tooltip.background)
    .style('border', theme.tooltip.border)
    .style('border-radius', theme.tooltip.borderRadius + 'px')
    .style('box-shadow', theme.tooltip.shadow)
    .style('padding', theme.tooltip.padding)
    .style('font-family', theme.font)
    .style('font-size', theme.fontSize.tooltip + 'px')
    .style('color', theme.colors.text)
    .style('z-index', 9999);

  return {
    show(html) {
      tip.html(html).style('opacity', 1);
    },
    move(event) {
      const [mx, my] = [event.clientX, event.clientY];
      const tipNode = tip.node();
      const w = tipNode.offsetWidth;
      const h = tipNode.offsetHeight;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const offset = 12;

      let x = mx + offset;
      let y = my - h / 2;

      if (x + w > vw - 8) x = mx - w - offset;
      if (y < 8)           y = 8;
      if (y + h > vh - 8)  y = vh - h - 8;

      tip.style('left', x + 'px').style('top', y + 'px');
    },
    hide() {
      tip.style('opacity', 0);
    },
    remove() {
      tip.remove();
    },
  };
}

// ---------------------------------------------------------------------------
// Color scale helpers
// ---------------------------------------------------------------------------

/**
 * Returns a d3 ordinal scale mapped to the theme categorical palette.
 * @param {string[]} domain
 * @param {object}   [theme]
 * @returns {d3.ScaleOrdinal}
 */
function fokColorOrdinal(domain, theme = FoKTheme) {
  return d3.scaleOrdinal()
    .domain(domain)
    .range(theme.colors.categorical);
}

/**
 * Returns a d3 diverging scale for temperature anomaly.
 * @param {number} min
 * @param {number} max
 * @param {object} [theme]
 * @returns {d3.ScaleDiverging}
 */
function fokColorDiverging(min, max, theme = FoKTheme) {
  return d3.scaleDiverging()
    .domain([min, 0, max])
    .interpolator(d3.interpolateRgbBasis([
      theme.colors.sequential.cold,
      theme.colors.sequential.neutral,
      theme.colors.sequential.warm,
    ]));
}

// ---------------------------------------------------------------------------
// Number formatting helpers
// ---------------------------------------------------------------------------

/**
 * Formats a number with Czech locale conventions (space as thousands separator).
 * e.g. 1234567.8 → "1 234 568"
 */
function fokFormatNumber(value, decimals = 0) {
  return value.toLocaleString('cs-CZ', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formats a value with a unit suffix.
 * e.g. fokFormatUnit(42.3, 'Mt CO₂', 1) → "42,3 Mt CO₂"
 */
function fokFormatUnit(value, unit, decimals = 1) {
  return fokFormatNumber(value, decimals) + ' ' + unit;
}
