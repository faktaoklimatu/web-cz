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
  };
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
 * @param {number} [options.gap=8]           — gap between swatch and label
 * @param {number} [options.itemSpacing=20]  — spacing between legend items
 * @param {object} [theme]
 */
function fokLegend(container, items, options = {}, theme = FoKTheme) {
  const sel = typeof container === 'string' ? d3.select(container) : container;
  const direction    = options.direction    ?? 'horizontal';
  const swatchSize   = options.swatchSize   ?? 12;
  const gap          = options.gap          ?? 8;
  const itemSpacing  = options.itemSpacing  ?? 20;

  const legendEl = sel.append('div').attr('class', 'fok-legend fok-legend--' + direction);

  items.forEach(item => {
    const itemEl = legendEl.append('div').attr('class', 'fok-legend__item');

    itemEl.append('span')
      .attr('class', 'fok-legend__swatch')
      .style('background', item.color)
      .style('width',  swatchSize + 'px')
      .style('height', swatchSize + 'px');

    itemEl.append('span')
      .attr('class', 'fok-legend__label')
      .style('font-family', theme.font)
      .style('font-size', theme.fontSize.axisLabel + 'px')
      .style('color', theme.colors.grey)
      .style('margin-left', gap + 'px')
      .text(item.label);
  });
}

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------

/**
 * Creates a floating tooltip div and returns show/hide/move helpers.
 * Appends the tooltip to document.body (escapes SVG stacking context).
 *
 * @param {object} [theme]
 * @returns {{ show: function, move: function, hide: function, remove: function }}
 */
function fokTooltip(theme = FoKTheme) {
  const tip = d3.select('body').append('div')
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
