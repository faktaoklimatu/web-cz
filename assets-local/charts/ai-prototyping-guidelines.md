# Datavis AI Prototyping Guidelines

Rules for AI-assisted chart prototyping in the FoK design system (D3 + fok-theme.js).

---

## Chart types and when to use them

| Chart type | Use when |
|---|---|
| Stacked bar (horizontal, proportional) | Share of total — single row breakdown |
| Stacked bar (vertical, small multiples) | Compare base + delta across categories |
| Stacked area (proportional) | Geographic/categorical mix evolving over time |
| Line chart | Time series, trends over years |
| Choropleth map (world) | Geographic comparison of a single variable |

---

## Connecting historical data to targets

**Rule: use a dashed line to bridge the gap between the last measured value and the target.**

This pattern separates fact (solid line = measured data) from plan (dashed line = projected/required trajectory).

```
Historical data ────────────── ╌╌╌╌╌╌╌╌╌○ Target
                           ^last          ^target year
                           data point
```

### Implementation

```js
// Dashed projection segment
g.append('path')
  .datum([
    { date: new Date(lastYear, 0, 1), value: lastValue },
    { date: new Date(targetYear, 0, 1), value: targetValue },
  ])
  .attr('fill', 'none')
  .attr('stroke', lineColor)
  .attr('stroke-width', 1.2)          // slightly thinner than the solid line
  .attr('stroke-dasharray', '5 4')
  .attr('d', d3.line().x(d => xSc(d.date)).y(d => ySc(d.value)));
```

### Target marker: open circle

Target values are always drawn as an **open circle** (white fill, colored stroke) — not a filled dot. Filled dots are used for actual data points.

```js
g.append('circle')
  .attr('cx', xSc(new Date(targetYear, 0, 1)))
  .attr('cy', ySc(targetValue))
  .attr('r', 5)
  .attr('fill', '#fff')               // open = projected, not measured
  .attr('stroke', lineColor)
  .attr('stroke-width', 2);
```

### Annotation placement

- Last data point label: anchored to the **left/above** the point (`text-anchor: end`) so it doesn't run into the dashed segment
- Target label: anchored to the **right** of the circle (`text-anchor: start`, `x + 8`)
- Use `FoKTheme.colors.grey` for the target annotation, the series color for the data annotation

---

## General rules

### SVG width must match rendered column width

The chart `width` option sets the SVG `viewBox`. Because the SVG is responsive (`width: 100%`), it scales to fit its container. Text in SVG scales proportionally with the viewBox — **if the viewBox is wider than the container, all text shrinks; if narrower, it grows.**

**The only way to get consistent font sizes across all charts is to set `width` to the actual rendered pixel width of the chart's container** — not a generic default. This is what makes a 12 px axis label look 12 px everywhere.

| Layout | Approx. rendered width | Correct `width` option |
|---|---|---|
| Full-width content column | ~800 px | `800` (default) |
| `.col-md-6` (half column) | ~420 px | `420` |
| `.col-6` inside `.col-md-6` (quarter) | ~200 px | `200` |

```js
// Wrong — default 800px viewBox in a 420px column → text appears ~63% of intended size
fokBarChartStacked('#chart', data, { height: 340 });

// Wrong — 280px viewBox in a 200px column → text appears ~71% of intended size
fokLineChart('#chart', data, { width: 280, height: 220 });

// Correct — viewBox matches the actual rendered column width
fokBarChartStacked('#chart-half', data, { width: 420, height: 340 });
fokLineChart('#chart-quarter', data, { width: 200, height: 220 });
```

> **To verify**: measure the rendered container with DevTools. The rendered pixel width of the container and the `width` option must match for text to appear at the intended size.

### Fonts

- Titles: **Inter Bold** (`FoKTheme.fontTitle`, weight 700)
- Everything else: **Roboto** (`FoKTheme.font`, weight 400/700)
- Minimum readable font size in SVG coordinates: **12px** — but only meaningful if the viewBox width is set correctly (see above)

### Colors

Line charts use `theme.colors.categorical[0]` for the first (or only) series — **not** `theme.colors.primary`. To override the line color, override `categorical`:

```js
// Wrong — primary is not used by line charts
theme: { ...FoKTheme, colors: { ...FoKTheme.colors, primary: '#3b3b93' } }

// Correct
theme: { ...FoKTheme, colors: { ...FoKTheme.colors, categorical: ['#3b3b93', ...FoKTheme.colors.categorical.slice(1)] } }
```

Named sector colors from `FoKTheme.colors.sectors`:

| Sector | Color |
|---|---|
| energetika | `#f4465b` |
| průmysl | `#3b3b93` |
| doprava | `#8546af` |
| budovy | `#0d80d8` |
| zemědělství | `#00aa95` |
| odpady | `#fab519` |
| ostatní | `#b5b8bd` |

### Small multiples

- Set `width: 420` (or match the actual column width) on each chart — the SVG viewBox scaling will otherwise make text illegible
- Shared legend below the grid, not repeated per chart (`legend: false` on each chart, render once manually)

### Y-axis ticks

- Prefer explicit `yTickValues` over automatic ticks for cleaner grids
- Round to natural intervals: 500 or 1000 for large absolute values, 10 for small (e.g. Kč/litr)

### Axis styling

- No domain lines (axis baseline) — set via `_styleAxis()` in fok-utils.js, applies globally
- Y-axis label: horizontal text above the chart, left-aligned, not rotated
- Tick padding: 12px (set in `FoKTheme.axis.tickPadding`)

### Lines

**Never use smoothed curves.** All lines must use `d3.curveLinear` (the D3 default). Do not pass any curve option to `d3.line()` or `d3.area()`. This applies to fokLineChart, fokBarChartStacked, and any custom D3 code in this project. `curveMonotoneX`, `curveBasis`, `curveCardinal`, and all other interpolators are forbidden.

- Solid line for measured/historical data
- Dashed line (`stroke-dasharray: '5 4'`, `stroke-width` slightly reduced) for projections and trajectories
