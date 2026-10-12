// Grafy prezentace „Co rozhoduje o prosperitě českého průmyslu?“
// (collections/_explainers/prosperita-ceskeho-prumyslu.md).
//
// Every chart draws into a .slide-chart div of a slide. A slide is a 1920 × 1080
// design canvas scaled to the page (web-core _slides.scss), so each SVG gets the
// container's size in design pixels as its viewBox: text set to 22 here is 22 px
// on the canvas, and the drawing scales with the slide without a redraw.
//
// Data: one CSV per sheet of the deck's workbook (CZ_ETS_prumysl_data_v13.xlsx),
// saved as is — a few lines describing the table, an empty line, the table.
// A newer export can replace a file one to one.
(function () {
  "use strict";

  const DIR = "/assets-local/files/prosperita-ceskeho-prumyslu/";

  // ── Look ─────────────────────────────────────────────────────────────────
  // FoK chart style (assets-local/charts/fok-theme.js) at slide scale: the
  // canvas is shown at roughly 0.6× on a laptop, so 22 design px reads like
  // the theme's 12–13 px.
  const FS = { tick: 22, label: 23, value: 22, legend: 22, small: 20 };
  // Every bar chart: bar thickness at most, and the label column of charts
  // listing the branches, so bars line up from slide to slide.
  const BAR = 28;
  const ROW_MAX = 64;
  const LW = 360;
  const TH = {
    ...FoKTheme,
    fontSize: { ...FoKTheme.fontSize, axisLabel: FS.tick, annotation: FS.small },
    axis: { ...FoKTheme.axis, tickSize: 8, tickPadding: 12 },
  };
  const C = {
    text: FoKTheme.colors.text,
    grey: FoKTheme.colors.grey,
    light: FoKTheme.colors.lightGrey,
    grid: FoKTheme.colors.gridLine,
    energy: FoKTheme.colors.sectors.energetika, // energeticky nejnáročnější obory
    core: FoKTheme.colors.sectors.budovy,       // strojírenství, elektro a auta
    other: FoKTheme.colors.sectors.ostatni,
    cz: FoKTheme.colors.sectors.prumysl,        // Česko / hlavní řada
    dark: FoKTheme.colors.grey,                 // EU27, průmysl celkem
    energyLight: "#f9a8b2",
    tint: "#fde8ea",                            // podbarvení „rizikového“ kvadrantu
  };
  // Emissions vs. free allocation keep the look of the ETS overview
  // (/studie/2026-interaktivni-prehled-ets, assets-local/js/ets-dashboard.js),
  // with its line and hatch scaled up for the slide canvas.
  const ETS = {
    emissions: "#1b4c6f", uncovered: "#8ba1b1", allocBg: "#fffafa", hatch: "#ff9c66",
    line: "#000000", halo: "#ffffff", lineWidth: 5, haloWidth: 2, hatchSize: 9, hatchStroke: 7,
  };

  // The deck's three groups of manufacturing branches (NACE codes).
  const ENERGY = ["C17", "C20", "C23", "C24", "C19-20"]; // papír, chemie, cement/sklo/keramika, hutě
  const CORE = ["C26", "C27", "C28", "C29", "C30"];      // elektronika, el. zařízení, stroje, auta, ost. doprava
  const group = (nace) => (ENERGY.includes(nace) ? "energy" : CORE.includes(nace) ? "core" : "other");
  const groupColor = (nace) => C[group(nace)];
  const GROUPS = [
    { label: "energeticky nejnáročnější (hlavní emitenti v ETS)", color: C.energy },
    { label: "strojírenství, elektro a auta – exportní jádro", color: C.core },
    { label: "ostatní", color: C.other },
  ];
  const GROUPS_SHORT = [
    { label: "energeticky náročné", color: C.energy },
    { label: "strojírenství a automotive", color: C.core },
    { label: "ostatní", color: C.other },
  ];

  const COUNTRY = {
    CZ: "Česko", DE: "Německo", AT: "Rakousko", PL: "Polsko", SK: "Slovensko", HU: "Maďarsko",
    SI: "Slovinsko", RO: "Rumunsko", IT: "Itálie", NL: "Nizozemsko", ES: "Španělsko", FR: "Francie",
    SE: "Švédsko", FI: "Finsko", EU27: "EU27", EU27_2020: "EU27",
  };

  // ── Data judgments ───────────────────────────────────────────────────────
  // Slide 7 leaves out small branches outside the energy-intensive group, as
  // the deck does, so the labelled bubbles stay readable.
  const EXPOZICE_SKIP = ["C13-15", "C16", "C18", "C19", "C20", "C21"];
  // Slide 18 outlook: the CBAM phase-out cuts the free allocation of the
  // steelworks itself, not of its power plant. 2024 allocation of Třinecké
  // železárny (Union Registry, installation 114), kt; the rest of the site's
  // allocation (Energetika Třinec, 51 kt) stays.
  const TRINEC_STEEL_ALLOC_2024 = 3325.7;
  const CBAM_FACTOR = { 2030: 0.515, 2034: 0 };
  // Slide 11 keeps the deck's y range; the three points outside it sit on the
  // edge as triangles (they still count in the trend).
  const EMISNI_Y = [-45, 125];
  // Slides 16–20 share one output scale (index 2015 = 100), so the branches
  // compare across slides: from Czech steel's 71 to Czech cars' 150.
  const OUTPUT_Y = { domain: [65, 155], ticks: d3.range(70, 151, 10) };

  // ── Loading ──────────────────────────────────────────────────────────────
  const files = new Map();
  function sheet(name) {
    if (!files.has(name)) {
      files.set(name, d3.text(DIR + name + ".csv").then((text) => {
        const lines = text.split(/\r?\n/);
        const blank = lines.findIndex((line) => !line.replace(/[",\s]/g, ""));
        return d3.csvParse(lines.slice(blank + 1).join("\n"));
      }));
    }
    return files.get(name);
  }
  const num = (v) => (v == null || v === "" ? null : +v);

  // ── Formatting ───────────────────────────────────────────────────────────
  const fmt = (v, d = 0) => v.toLocaleString("cs-CZ", { minimumFractionDigits: d, maximumFractionDigits: d });
  const pct = (v, d = 0) => fmt(v, d) + " %";
  // Signed, with a true minus; a value that rounds to zero carries no sign.
  function sgn(v, d = 0) {
    const r = +Math.abs(v).toFixed(d);
    return (r === 0 ? "" : v > 0 ? "+" : "−") + fmt(r, d);
  }
  const fmtTJ = (v) => fmt(v, v >= 10 ? 0 : 1);
  const change = (values) => (values[values.length - 1] / values[0] - 1) * 100;

  // ── Drawing helpers ──────────────────────────────────────────────────────
  let uidCount = 0;
  const uid = (name) => `pcp-${name}-${++uidCount}`;
  const tip = fokTooltip(FoKTheme);

  function canvas(el) {
    const k = 1920 / el.closest(".slide").getBoundingClientRect().width;
    const W = Math.round(el.clientWidth * k);
    const H = Math.round(el.clientHeight * k);
    const svg = d3.select(el).append("svg")
      .attr("viewBox", `0 0 ${W} ${H}`)
      .attr("font-family", FoKTheme.font)
      .attr("font-size", FS.label)
      .attr("fill", C.text);
    return { svg, W, H };
  }

  // Text; `parts` is a string or a list of [string, options] runs.
  function txt(g, x, y, parts, o = {}) {
    const t = g.append("text")
      .attr("x", x).attr("y", y).attr("dy", o.dy ?? "0.35em")
      .attr("text-anchor", o.anchor || "start")
      .attr("font-size", o.size || FS.label)
      .attr("font-weight", o.bold ? 700 : null)
      .attr("fill", o.color || C.text);
    if (typeof parts === "string") return t.text(parts);
    parts.forEach(([s, po = {}]) => t.append("tspan")
      .attr("font-weight", po.bold ? 700 : null)
      .attr("fill", po.color || null)
      .attr("font-size", po.size || null)
      .text(s));
    return t;
  }

  // Several lines centred on y (o.top: the first line sits on y instead).
  function lines(g, x, y, list, o = {}) {
    const lh = (o.size || FS.label) * 1.2;
    const y0 = o.top ? y : y - ((list.length - 1) * lh) / 2;
    list.forEach((line, i) => txt(g, x, y0 + i * lh, line, o));
  }

  // Rows of bars spread over the height, but no bar thicker than BAR, so bars
  // match across slides; a short list gets wider gaps (up to ROW_MAX apart)
  // rather than fatter bars, and only a very short one leaves room below.
  function rows(n, top, bottom, padding = 0.3, max = BAR) {
    const step = Math.min((bottom - top) / n, ROW_MAX);
    const p = Math.max(padding, 1 - max / step);
    return d3.scaleBand().domain(d3.range(n)).range([top, top + step * n]).paddingInner(p).paddingOuter(p / 2);
  }

  function rect(g, x0, x1, y, h, fill) {
    return g.append("rect")
      .attr("x", Math.min(x0, x1)).attr("y", y)
      .attr("width", Math.max(Math.abs(x1 - x0), 0)).attr("height", h)
      .attr("fill", fill);
  }

  function vline(g, x, y0, y1, o = {}) {
    return g.append("line").attr("x1", x).attr("x2", x).attr("y1", y0).attr("y2", y1)
      .attr("stroke", o.color || C.light).attr("stroke-width", o.width || 2)
      .attr("stroke-dasharray", o.dashed ? "8 6" : null);
  }

  function hline(g, y, x0, x1, o = {}) {
    return g.append("line").attr("x1", x0).attr("x2", x1).attr("y1", y).attr("y2", y)
      .attr("stroke", o.color || C.light).attr("stroke-width", o.width || 2)
      .attr("stroke-dasharray", o.dashed ? "8 6" : null);
  }

  function hover(sel, html) {
    sel.style("cursor", "default")
      .on("mouseenter", (event, d) => { tip.show(html(d)); tip.move(event); })
      .on("mousemove", (event) => tip.move(event))
      .on("mouseleave", () => tip.hide());
  }

  // Diagonal hatch: the ETS overview's surplus pattern, or (with a colour)
  // the "of which UK" stripes on slide 23.
  function hatch(svg, color = ETS.hatch, bg = ETS.allocBg) {
    let defs = svg.select("defs");
    if (defs.empty()) defs = svg.insert("defs", ":first-child");
    const id = uid("hatch");
    const s = ETS.hatchSize;
    defs.append("pattern").attr("id", id)
      .attr("width", s).attr("height", s)
      .attr("patternUnits", "userSpaceOnUse")
      .attr("patternTransform", "rotate(45)")
      .call((p) => {
        p.append("rect").attr("width", s).attr("height", s).attr("fill", bg);
        p.append("line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", s)
          .attr("stroke", color).attr("stroke-width", color === ETS.hatch ? ETS.hatchStroke : s * 0.45);
      });
    return `url(#${id})`;
  }

  // Legend; items: {label, color, kind: box|line|ets-line|dash|ring|dot|diamond|fill}.
  function legend(g, items, x, y, o = {}) {
    const size = o.size || FS.legend;
    const sw = Math.round(size * 0.9);
    const gap = o.gap ?? 36;
    const lh = o.lineHeight || size * 1.55;
    let cx = x;
    let cy = y;
    items.forEach((it, i) => {
      if (o.columns) {
        const col = i % o.columns;
        cx = x + (o.columnWidths ? d3.sum(o.columnWidths.slice(0, col)) : col * o.columnWidth);
        cy = y + Math.floor(i / o.columns) * lh;
      }
      const item = g.append("g").attr("transform", `translate(${cx},${cy})`);
      swatch(item, it, sw);
      const t = txt(item, sw + 10, 0, it.label, { size, color: it.textColor });
      if (o.columns) return;
      if (o.vertical) cy += lh;
      else cx += sw + 10 + t.node().getComputedTextLength() + gap;
    });
  }

  function swatch(g, it, sw) {
    const kind = it.kind || "box";
    if (kind === "box" || kind === "fill") {
      g.append("rect").attr("x", 0).attr("y", -sw / 2).attr("width", sw).attr("height", sw)
        .attr("fill", it.color).attr("stroke", it.stroke || null).attr("stroke-width", it.stroke ? 1.5 : null);
    } else if (kind === "line" || kind === "dash") {
      g.append("line").attr("x1", 0).attr("x2", sw).attr("y1", 0).attr("y2", 0)
        .attr("stroke", it.color).attr("stroke-width", 4).attr("stroke-dasharray", kind === "dash" ? "6 4" : null);
    } else if (kind === "ets-line") {
      g.append("line").attr("x1", 0).attr("x2", sw).attr("y1", 0).attr("y2", 0)
        .attr("stroke", ETS.line).attr("stroke-width", ETS.lineWidth);
    } else if (kind === "ring" || kind === "dot") {
      g.append("circle").attr("cx", sw / 2).attr("cy", 0).attr("r", sw / 2.6)
        .attr("fill", kind === "ring" ? "white" : it.color).attr("stroke", it.color).attr("stroke-width", 3);
    } else if (kind === "diamond") {
      g.append("rect").attr("x", -sw / 3).attr("y", -sw / 3).attr("width", sw / 1.5).attr("height", sw / 1.5)
        .attr("transform", `translate(${sw / 2},0) rotate(45)`).attr("fill", it.color);
    }
  }

  // Pushes labels apart vertically: items {y, h}; keeps their order.
  function spread(items, top, bottom) {
    items.sort((a, b) => a.y - b.y);
    for (let i = 1; i < items.length; i++) {
      const min = items[i - 1].y + (items[i - 1].h + items[i].h) / 2;
      if (items[i].y < min) items[i].y = min;
    }
    const over = items.length ? items[items.length - 1].y + items[items.length - 1].h / 2 - bottom : 0;
    if (over > 0) {
      items[items.length - 1].y -= over;
      for (let i = items.length - 2; i >= 0; i--) {
        const max = items[i + 1].y - (items[i + 1].h + items[i].h) / 2;
        if (items[i].y > max) items[i].y = max;
      }
    }
    if (items.length && items[0].y - items[0].h / 2 < top) items[0].y = top + items[0].h / 2;
  }

  // Label next to a bubble: pos is t|b|l|r|tl|tr|bl|br, or [dx, dy, anchor]
  // with a thin leader line from the bubble.
  function bubbleLabel(g, cx, cy, r, name, pos, o = {}) {
    const pad = 8;
    if (Array.isArray(pos)) {
      const [dx, dy, anchor] = pos;
      const len = Math.hypot(dx, dy) || 1;
      g.append("line")
        .attr("x1", cx + (dx / len) * (r + 2)).attr("y1", cy + (dy / len) * (r + 2))
        .attr("x2", cx + dx - (anchor === "end" ? -6 : anchor === "start" ? 6 : 0)).attr("y2", cy + dy)
        .attr("stroke", C.light).attr("stroke-width", 1.5);
      return txt(g, cx + dx, cy + dy, name, { ...o, anchor });
    }
    const spec = {
      t: [0, -(r + pad + 8), "middle"], b: [0, r + pad + 8, "middle"],
      l: [-(r + pad), 0, "end"], r: [r + pad, 0, "start"],
      tl: [-(r * 0.7 + pad), -(r * 0.7 + pad), "end"], tr: [r * 0.7 + pad, -(r * 0.7 + pad), "start"],
      bl: [-(r * 0.7 + pad), r * 0.7 + pad, "end"], br: [r * 0.7 + pad, r * 0.7 + pad, "start"],
    }[pos];
    return txt(g, cx + spec[0], cy + spec[1], name, { ...o, anchor: spec[2] });
  }

  function yAxis(g, y, x0, width, o = {}) {
    g.append("g").attr("transform", `translate(${x0},0)`)
      .call(fokAxisY(y, { gridWidth: width, tickValues: o.ticks, tickFormat: o.format || ((v) => fmt(v, Number.isInteger(v) ? 0 : 1)) }, TH));
  }

  function xAxis(g, x, y0, o = {}) {
    g.append("g").attr("transform", `translate(0,${y0})`)
      .call(fokAxisX(x, { tickValues: o.ticks, tickFormat: o.format, gridLines: !!o.grid, gridHeight: o.grid }, TH));
  }

  // ── Reusable chart types ─────────────────────────────────────────────────

  // Time series indexed to 2015 = 100, labelled at their ends.
  function indexChart(el, series, o = {}) {
    const { svg, W, H } = canvas(el);
    const m = { top: 14, right: o.right ?? 250, bottom: 52, left: 64 };
    const years = series[0].values.map((d) => d.year);
    const x = d3.scaleLinear().domain(d3.extent(years)).range([m.left, W - m.right]);
    const y = d3.scaleLinear().domain(o.domain).range([H - m.bottom, m.top]);
    yAxis(svg, y, m.left, W - m.left - m.right, { ticks: o.ticks });
    xAxis(svg, x, H - m.bottom, { ticks: [2015, 2018, 2021, 2025], format: d3.format("d") });
    svg.selectAll(".tick line").filter((d) => d === 100).attr("stroke", C.light).attr("stroke-width", 2);
    const line = d3.line().x((d) => x(d.year)).y((d) => y(d.v)).defined((d) => d.v != null);
    const labels = [];
    series.forEach((s) => {
      svg.append("path").datum(s.values)
        .attr("fill", "none").attr("stroke", s.color).attr("stroke-width", s.width || 5)
        .attr("stroke-linejoin", "round").attr("stroke-dasharray", s.dashed ? "12 8" : null)
        .attr("d", line);
      if (s.dots !== false) {
        svg.append("g").selectAll("circle").data(s.values.filter((d) => d.v != null)).join("circle")
          .attr("cx", (d) => x(d.year)).attr("cy", (d) => y(d.v)).attr("r", 5).attr("fill", s.color)
          .call(hover, (d) => `<strong>${s.name} ${d.year}</strong><br>${fmt(d.v, 1)}`);
      }
      const last = s.values.filter((d) => d.v != null).pop();
      const text = typeof s.label === "string" ? [s.label] : s.label;
      labels.push({ s, text, x: x(last.year), y: y(last.v), h: text.length * FS.label * 1.2 + 6 });
    });
    spread(labels, m.top, H - m.bottom);
    labels.forEach((l) => lines(svg, l.x + 14, l.y, l.text, { color: l.s.color, bold: true }));
  }

  // Slides 17–20: labour, energy and ETS costs per 100 € of turnover.
  async function costBars(el, nace) {
    const r = (await sheet("s16-20-naklady")).find((d) => d.NACE === nace);
    const prace = +r.prace_na_100EUR;
    const energie = +r.energie_na_100EUR;
    const etsEl = +r.ETS_v_elektrine_na_100EUR;
    const etsDirect = +r.ETS_primo_na_100EUR;
    const { svg, W, H } = canvas(el);
    const lw = 150;
    // One scale for all four branches, so the slides compare.
    const x = d3.scaleLinear().domain([0, 20]).range([lw, W - 110]);
    const band = d3.scaleBand().domain([0, 1, 2]).range([10, H - 20]).paddingInner(0.55).paddingOuter(0.15);
    const bw = Math.min(band.bandwidth(), BAR);
    const y = (i) => band(i) + (band.bandwidth() - bw) / 2;
    const row = (i, name) => txt(svg, lw - 14, y(i) + bw / 2, name, { anchor: "end" });
    row(0, "Práce");
    rect(svg, x(0), x(prace), y(0), bw, C.other);
    txt(svg, x(prace) + 10, y(0) + bw / 2, fmt(prace, 1) + " €", { size: FS.value });
    row(1, "Energie");
    rect(svg, x(0), x(energie), y(1), bw, "#dfe2e5");
    rect(svg, x(0), x(etsEl), y(1), bw, C.energy);
    txt(svg, x(energie) + 10, y(1) + bw / 2, fmt(energie, 1) + " €", { size: FS.value });
    txt(svg, x(0), y(1) + bw + 24, `z toho ETS v elektřině ${fmt(etsEl, 1)} €`, { size: FS.small, color: C.energy });
    row(2, "ETS přímo");
    rect(svg, x(0), x(Math.max(etsDirect, 0)), y(2), bw, C.energy);
    vline(svg, x(0), y(2), y(2) + bw, { color: C.energy, width: 3 });
    txt(svg, x(Math.max(etsDirect, 0)) + 12, y(2) + bw / 2, fmt(Math.max(etsDirect, 0), etsDirect > 0 && etsDirect < 0.2 ? 2 : 1) + " €", { size: FS.value, bold: true });
  }

  // Emissions against free allocation in the look of the ETS overview: one
  // bar of verified emissions per year, the part free allocation does not
  // cover in grey-blue, over-allocation hatched, the allocation as a black
  // staircase. `data`: [{year, e, a}] in Mt; consecutive years share a staircase.
  function etsBars(svg, g, data, x, y, o = {}) {
    const bw = x.bandwidth();
    const gap = x.step() - bw;
    const surplus = hatch(svg);
    const y0 = y(0);
    data.forEach((d) => {
      rect(g, x(d.year), x(d.year) + bw, y(d.e), y0 - y(d.e), ETS.emissions);
      if (d.e > d.a) rect(g, x(d.year), x(d.year) + bw, y(d.e), y(d.a) - y(d.e), ETS.uncovered);
      if (d.a > d.e) rect(g, x(d.year), x(d.year) + bw, y(d.a), y(d.e) - y(d.a), surplus);
    });
    // Staircase over runs of consecutive years; a lone bar gets a flat marker.
    const runs = [];
    data.forEach((d, i) => {
      if (i && d.year === data[i - 1].year + 1) runs[runs.length - 1].push(d);
      else runs.push([d]);
    });
    runs.forEach((run) => {
      let path = "";
      run.forEach((d, i) => {
        const lvl = y(d.a);
        path += (i === 0 ? `M${x(d.year) - gap / 2},${lvl}` : `V${lvl}`) + `H${x(d.year) + bw + gap / 2}`;
      });
      [[ETS.halo, ETS.lineWidth + ETS.haloWidth * 2], [ETS.line, ETS.lineWidth]].forEach(([stroke, width]) => {
        g.append("path").attr("d", path).attr("fill", "none")
          .attr("stroke", stroke).attr("stroke-width", width).attr("stroke-linejoin", "miter");
      });
    });
    g.append("g").selectAll("rect").data(data).join("rect")
      .attr("x", (d) => x(d.year) - gap / 2).attr("width", x.step())
      .attr("y", y.range()[1]).attr("height", y0 - y.range()[1])
      .attr("fill", "transparent")
      .call(hover, (d) => `<strong>${o.title ? o.title + " " : ""}${d.year}${d.outlook ? " (výhled)" : ""}</strong><br>` +
        `Ověřené emise: <strong>${fmt(d.e, 2)} mil. t</strong><br>` +
        `Povolenky zdarma: <strong>${fmt(d.a, 2)} mil. t</strong><br>` +
        `Pokrytí emisí povolenkami zdarma: <strong>${d.e > 0 ? Math.round((d.a / d.e) * 100) + " %" : "—"}</strong>`);
  }

  const ETS_LEGEND = [
    { label: "Emise pokryté povolenkami zdarma", color: ETS.emissions },
    { label: "Emise nepokryté povolenkami zdarma", color: ETS.uncovered },
    { label: "Povolenky zdarma", kind: "ets-line" },
    { label: "Povolenky zdarma alokované navíc", kind: "fill" },
  ];

  // Narrow panels get the same four items under shorter names, two per row.
  const ETS_LEGEND_SHORT = [
    { label: "Emise kryté povolenkami", color: ETS.emissions },
    { label: "Povolenky zdarma", kind: "ets-line" },
    { label: "Emise nekryté povolenkami", color: ETS.uncovered },
    { label: "Povolenky navíc", kind: "fill" },
  ];

  function etsLegend(svg, g, x, y, o = {}) {
    const items = (o.short ? ETS_LEGEND_SHORT : ETS_LEGEND)
      .map((it) => (it.kind === "fill" ? { ...it, color: hatch(svg), stroke: "#e0b8a0" } : it));
    legend(g, items, x, y, o);
  }

  // Years 2013–2025 of a branch's emissions and free allocation (tonnes).
  async function branchEts(el, name) {
    const data = (await sheet(name)).map((d) => ({ year: +d.rok, e: +d.emise_t / 1e6, a: +d.povolenky_zdarma_t / 1e6 }));
    const { svg, W, H } = canvas(el);
    const m = { top: 110, right: 10, bottom: 50, left: 44 };
    const x = d3.scaleBand().domain(data.map((d) => d.year)).range([m.left, W - m.right]).padding(0.26);
    const y = d3.scaleLinear().domain([0, 6]).range([H - m.bottom, m.top]);
    yAxis(svg, y, m.left, W - m.left - m.right, { ticks: [0, 1, 2, 3, 4, 5, 6] });
    xAxis(svg, x, H - m.bottom, { ticks: [2013, 2017, 2021, 2025], format: d3.format("d") });
    etsBars(svg, svg.append("g"), data, x, y);
    etsLegend(svg, svg.append("g"), m.left, 14, { short: true, columns: 2, columnWidths: [(W - m.left) * 0.58], size: FS.small, lineHeight: 34 });
  }

  // ── Slide charts ─────────────────────────────────────────────────────────
  const CHARTS = {};

  // Shares are of all manufacturing (C, refineries included), while only the
  // 18 branches are listed. The sheet's share columns are rounded to two
  // decimals, and rounding those again to one misplaces values like 1,65, so
  // the total of C is recovered from the largest share, which pins it best.
  async function sizeRows() {
    const raw = await sheet("s03-velikost");
    const total = (value, share) => {
      const top = raw.reduce((a, b) => (+b[share] > +a[share] ? b : a));
      return +top[value] / (+top[share] / 100);
    };
    const hph = total("HPH_2025_mil_EUR", "podil_HPH_prumyslu_%");
    const emp = total("zamestnanost_2025_tis", "podil_zamestnanosti_prumyslu_%");
    return raw.map((d) => ({
      nace: d.NACE, name: d.obor,
      share: (+d.HPH_2025_mil_EUR / hph) * 100, hphAbs: +d.HPH_2025_mil_EUR / 1000,
      emp: +d.zamestnanost_2025_tis, empShare: (+d.zamestnanost_2025_tis / emp) * 100,
      sales: +d.trzby_2024_mil_EUR / 1000,
    })).sort((a, b) => b.share - a.share);
  }

  // 3 — size of branches
  CHARTS.velikost = async (el) => {
    const data = await sizeRows();
    const { svg, W, H } = canvas(el);
    const lw = LW;
    const y = rows(data.length, 0, H);
    const x = d3.scaleLinear().domain([0, d3.max(data, (d) => d.share)]).range([lw, lw + (W - lw) * 0.5]);
    data.forEach((d, i) => {
      const cy = y(i) + y.bandwidth() / 2;
      const strong = group(d.nace) === "energy";
      txt(svg, lw - 14, cy, d.name, { anchor: "end", bold: strong, color: strong ? C.energy : C.text });
      rect(svg, x(0), x(d.share), y(i), y.bandwidth(), groupColor(d.nace));
      txt(svg, x(d.share) + 10, cy, [[pct(d.share, 1)], [` (${fmt(d.emp)} tis. zaměstnanců)`, { color: C.grey }]], { size: FS.value });
    });
    legend(svg, GROUPS, W - 600, H - 120, { vertical: true });
  };

  // 4 — change of output
  CHARTS.vyvoj = async (el) => {
    const data = (await sheet("s04-vyvoj"))
      .map((d) => ({ nace: d.NACE, name: d.obor, v: +d.zmena_vyroby_2015_2025 * 100 }))
      .sort((a, b) => b.v - a.v);
    const { svg, W, H } = canvas(el);
    const lw = LW;
    const y = rows(data.length, 0, H);
    const x = d3.scaleLinear().domain([-30, 82]).range([lw + 20, W - 120]);
    vline(svg, x(0), 0, H, { color: C.grey });
    data.forEach((d, i) => {
      const cy = y(i) + y.bandwidth() / 2;
      const strong = group(d.nace) === "energy";
      txt(svg, lw - 14, cy, d.name, { anchor: "end", bold: strong, color: strong ? C.energy : C.text });
      rect(svg, x(0), x(d.v), y(i), y.bandwidth(), groupColor(d.nace));
      const neg = d.v < 0 || +Math.abs(d.v).toFixed(0) === 0;
      txt(svg, x(d.v) + (neg ? -10 : 10), cy, sgn(d.v) + " %", { anchor: neg ? "end" : "start", size: FS.value });
    });
    legend(svg, GROUPS, W - 600, H - 120, { vertical: true });
  };

  // 5 — labour vs. energy share of costs
  CHARTS.naklady = async (el) => {
    const [costs, size] = await Promise.all([sheet("s05-naklady"), sheet("s03-velikost")]);
    const hph = new Map(size.map((d) => [d.NACE, +d.HPH_2025_mil_EUR]));
    const data = costs.map((d) => {
      const total = +d.nakupy_zbozi_sluzeb_mil_EUR + +d.osobni_naklady_mil_EUR;
      return {
        nace: d.NACE, name: d.obor, hph: hph.get(d.NACE),
        prace: (+d.osobni_naklady_mil_EUR / total) * 100,
        energie: (+d.nakupy_energie_mil_EUR / total) * 100,
      };
    });
    const { svg, W, H } = canvas(el);
    const m = { top: 60, right: 20, bottom: 90, left: 70 };
    const x = d3.scaleLinear().domain([5, 26.5]).range([m.left, W - m.right]);
    const y = d3.scaleLinear().domain([0, 11]).range([H - m.bottom, m.top]);
    const r = d3.scaleSqrt().domain([0, d3.max(data, (d) => d.hph)]).range([0, 58]);
    yAxis(svg, y, m.left, W - m.left - m.right, { ticks: [0, 2, 4, 6, 8, 10] });
    xAxis(svg, x, H - m.bottom, { ticks: [5, 10, 15, 20, 25], grid: H - m.bottom - m.top });
    txt(svg, (m.left + W - m.right) / 2, H - 16, "Náklady práce, % celkových nákladů", { anchor: "middle", size: FS.tick, color: C.grey });
    txt(svg, m.left - 50, 18, "Nákupy energie, % celkových nákladů", { size: FS.tick, color: C.grey });
    const mx = d3.median(data, (d) => d.prace);
    const my = d3.median(data, (d) => d.energie);
    vline(svg, x(mx), m.top, H - m.bottom, { color: C.grey, dashed: true });
    hline(svg, y(my), m.left, W - m.right, { color: C.grey, dashed: true });
    const q = { size: FS.small, color: C.grey };
    txt(svg, m.left + 12, m.top + 16, "Náročné hlavně na energii", q);
    txt(svg, W - m.right - 12, m.top + 16, "Náročné na energii i práci", { ...q, anchor: "end" });
    txt(svg, m.left + 12, H - m.bottom - 18, "Rozhodují materiály a díly", q);
    txt(svg, W - m.right - 12, H - m.bottom - 18, "Náročné hlavně na práci", { ...q, anchor: "end" });
    const pos = {
      C24: "t", C20: "t", C23: "t", C17: "t", "C10-12": "l", C16: "b", C22: "t", C27: "t",
      "C13-15": "t", C18: [46, -44, "start"], C25: [-120, 18, "end"], C31_32: "t", C28: "r", C33: "br",
      C21: "b", C30: "b", C29: "l", C26: "br",
    };
    const g = svg.append("g");
    data.slice().sort((a, b) => b.hph - a.hph).forEach((d) => {
      g.append("circle").datum(d).attr("cx", x(d.prace)).attr("cy", y(d.energie)).attr("r", r(d.hph))
        .attr("fill", groupColor(d.nace)).attr("fill-opacity", 0.85).attr("stroke", "white").attr("stroke-width", 2)
        .call(hover, (d) => `<strong>${d.name}</strong><br>Práce: ${pct(d.prace, 1)} nákladů<br>Energie: ${pct(d.energie, 1)} nákladů<br>HPH 2025: ${fmt(d.hph / 1000, 1)} mld. €`);
    });
    data.forEach((d) => bubbleLabel(svg, x(d.prace), y(d.energie), r(d.hph), d.name, pos[d.nace] || "t", { size: FS.label }));
    legend(svg, GROUPS, W - 1330, 18, { size: FS.small });
  };

  // 6 — energy intensity and main energy carrier
  const CARRIERS = [
    ["elektrina_TJ", "Elektřina", "elektřina", "#0d80d8"],
    ["plyn_TJ", "Zemní plyn", "plyn", "#fab519"],
    ["uhli_koks_TJ", "Uhlí a koks", "uhlí a koks", "#3a3a45"],
    ["koks_vysokopec_plyn_TJ", "Koksárenský a vysokopecní plyn", "koksárenský plyn", "#8a949c"],
    ["nafta_surovina_TJ", "Nafta (surovina)", "nafta", "#d8bf9a"],
    ["ostatni_ropne_TJ", "Ostatní ropné produkty", "ropné prod.", "#9a7350"],
    ["teplo_TJ", "Teplo", "teplo", "#8546af"],
    ["biomasa_TJ", "Biomasa", "biomasa", "#00aa95"],
    ["odpady_TJ", "Odpady", "odpady", "#d3d7db"],
  ];
  const DARK_CARRIERS = ["#0d80d8", "#3a3a45", "#9a7350", "#8546af", "#00aa95"];

  async function energyRows() {
    return (await sheet("s06-energie")).map((d) => {
      const parts = CARRIERS.map(([key]) => +d[key]);
      const total = d3.sum(parts);
      const main = d3.maxIndex(parts);
      return {
        nace: d.NACE, name: d.obor, tj: +d.TJ_na_mil_EUR_HPH, total,
        shares: parts.map((p) => (p / total) * 100),
        main: CARRIERS[main][2], mainShare: (parts[main] / total) * 100,
      };
    }).sort((a, b) => b.tj - a.tj);
  }

  CHARTS.energie = async (el) => {
    const data = await energyRows();
    const { svg, W, H } = canvas(el);
    const lw = LW;
    const y = rows(data.length, 0, H);
    const x = d3.scaleLog().domain([0.5, 150]).range([lw, lw + (W - lw) * 0.62]);
    data.forEach((d, i) => {
      const cy = y(i) + y.bandwidth() / 2;
      const strong = group(d.nace) === "energy";
      txt(svg, lw - 14, cy, d.name, { anchor: "end", bold: strong, color: strong ? C.energy : C.text });
      rect(svg, x(0.5), x(d.tj), y(i), y.bandwidth(), groupColor(d.nace));
      txt(svg, x(d.tj) + 10, cy, [[fmtTJ(d.tj)], [` · hlavně ${d.main} ${pct(d.mainShare)}`, { color: C.grey }]], { size: FS.value });
    });
    legend(svg, GROUPS, W - 600, H - 120, { vertical: true });
  };

  // 7 — energy intensity vs. import penetration, 2015 → 2024
  CHARTS.expozice = async (el) => {
    const pen = (d, y) => (+d["dovoz_" + y] / (+d["produkce_" + y] - +d["vyvoz_" + y] + +d["dovoz_" + y])) * 100;
    const data = (await sheet("s07-expozice")).filter((d) => !EXPOZICE_SKIP.includes(d.NACE)).map((d) => ({
      nace: d.NACE, name: d.obor,
      p15: pen(d, 2015), p24: pen(d, 2024),
      e15: +d.energie_2015_TJ / +d.HPH_2015, e23: +d.energie_2023_TJ / +d.HPH_2023,
      h15: +d.HPH_2015, h24: +d.HPH_2024,
    }));
    const { svg, W, H } = canvas(el);
    const m = { top: 40, right: 30, bottom: 90, left: 76 };
    const x = d3.scaleLinear().domain([0, 100]).range([m.left, W - m.right]);
    const y = d3.scaleLog().domain([0.4, 200]).range([H - m.bottom, m.top]);
    const r = d3.scaleSqrt().domain([0, d3.max(data, (d) => Math.max(d.h15, d.h24))]).range([0, 62]);
    rect(svg, x(50), x(100), y(200), y(10) - y(200), C.tint);
    yAxis(svg, y, m.left, W - m.left - m.right, { ticks: [0.5, 1, 2, 5, 10, 20, 50, 100], format: (v) => fmt(v, v < 1 ? 1 : 0) });
    xAxis(svg, x, H - m.bottom, { ticks: [0, 20, 40, 60, 80, 100], format: (v) => (v === 100 ? "100 %" : v), grid: H - m.bottom - m.top });
    vline(svg, x(50), m.top, H - m.bottom, { color: C.grey, dashed: true });
    hline(svg, y(10), m.left, W - m.right, { color: C.grey, dashed: true });
    txt(svg, (m.left + W - m.right) / 2, H - 16, "Dovozní penetrace: dovoz / zdánlivá domácí spotřeba", { anchor: "middle", size: FS.tick, color: C.grey });
    txt(svg, m.left - 56, 12, "TJ energie na mil. € HPH (log. škála)", { size: FS.tick, color: C.grey });
    lines(svg, W - m.right - 14, m.top + 22, ["Vysoká náročnost + silná konkurence dovozu", "→ nejtěžší přenést náklad ETS do cen"], { anchor: "end", bold: true, color: C.energy, top: true });
    lines(svg, m.left + 14, m.top + 22, ["Náročné, ale chráněné", "(regionální trh)"], { size: FS.small, color: C.grey, top: true });
    txt(svg, W - m.right - 14, y(10) + 26, "Obchodovatelné, energeticky nenáročné", { anchor: "end", size: FS.small, color: C.grey });
    const arrow = uid("arrow");
    svg.append("defs").append("marker").attr("id", arrow)
      .attr("viewBox", "0 0 10 10").attr("refX", 8).attr("refY", 5)
      .attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto")
      .append("path").attr("d", "M0,0L10,5L0,10z").attr("fill", C.grey);
    const g = svg.append("g");
    const byHph = data.slice().sort((a, b) => b.h24 - a.h24);
    byHph.forEach((d) => g.append("circle").attr("cx", x(d.p15)).attr("cy", y(d.e15)).attr("r", r(d.h15))
      .attr("fill", groupColor(d.nace)).attr("fill-opacity", 0.3));
    byHph.forEach((d) => {
      const x1 = x(d.p15), y1 = y(d.e15), x2 = x(d.p24), y2 = y(d.e23);
      const len = Math.hypot(x2 - x1, y2 - y1);
      if (len < 8) return;
      const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
      g.append("line").attr("x1", x1).attr("y1", y1)
        .attr("x2", x2 - ux * Math.min(len / 2, r(d.h24) * 0.6)).attr("y2", y2 - uy * Math.min(len / 2, r(d.h24) * 0.6))
        .attr("stroke", C.grey).attr("stroke-width", 2.5).attr("marker-end", `url(#${arrow})`);
    });
    byHph.forEach((d) => g.append("circle").datum(d).attr("cx", x(d.p24)).attr("cy", y(d.e23)).attr("r", r(d.h24))
      .attr("fill", groupColor(d.nace)).attr("fill-opacity", 0.9).attr("stroke", "white").attr("stroke-width", 2)
      .call(hover, (d) => `<strong>${d.name}</strong><br>Dovozní penetrace: ${pct(d.p15)} → ${pct(d.p24)}<br>Energetická náročnost: ${fmtTJ(d.e15)} → ${fmtTJ(d.e23)} TJ/mil. €`));
    const pos = {
      "C19-20": [-36, 30, "end"], C24: [120, -12, "start"], C17: [150, 0, "start"], C23: [-60, -40, "end"],
      "C10-12": [-40, -60, "end"], C25: [-110, -16, "end"], C30: [-130, 50, "end"], C33: [10, 50, "start"],
      C29: [-70, 70, "end"], C22: [60, -50, "start"], C28: [150, -50, "start"], C31_32: [120, 10, "start"],
      C27: [20, 70, "start"], C26: [60, 40, "start"],
    };
    data.forEach((d) => {
      const strong = group(d.nace) === "energy";
      bubbleLabel(svg, x(d.p24), y(d.e23), r(d.h24), d.name, pos[d.nace] || "t", { bold: strong, color: strong ? C.energy : C.text });
    });
    legend(svg, GROUPS, W - 1330, 12, { size: FS.small });
  };

  // 8 — import penetration, EU vs. outside
  const CBAM_MARK = { C24: " (CBAM)", C20: " (CBAM*)", C23: " (CBAM*)" };
  CHARTS.obchod = async (el) => {
    const data = (await sheet("s08-obchod"))
      .map((d) => ({ nace: d.NACE, name: d.obor + (CBAM_MARK[d.NACE] || ""), eu: +d["dovoz_z_EU_%"], out: +d["dovoz_mimo_EU_%"] }))
      .sort((a, b) => b.eu + b.out - (a.eu + a.out));
    const { svg, W, H } = canvas(el);
    const lw = LW;
    const y = rows(data.length, 0, H);
    const x = d3.scaleLinear().domain([0, 90]).range([lw, W - 330]);
    data.forEach((d, i) => {
      const cy = y(i) + y.bandwidth() / 2;
      txt(svg, lw - 14, cy, d.name, { anchor: "end" });
      rect(svg, x(0), x(d.eu), y(i), y.bandwidth(), C.cz);
      rect(svg, x(d.eu), x(d.eu + d.out), y(i), y.bandwidth(), C.energy);
      txt(svg, x(d.eu + d.out) + 10, cy, pct(d.eu + d.out), { size: FS.value });
    });
    legend(svg, [{ label: "dovoz z EU", color: C.cz }, { label: "dovoz z mimo EU", color: C.energy }], W - 280, H - 70, { vertical: true });
  };

  // 10 — energy and ETS costs as % of value added
  CHARTS["naklady-ets"] = async (el) => {
    const raw = await sheet("s10-naklady-ets");
    const data = raw.map((d) => ({
      nace: d.NACE, name: d.NACE === "C" ? "Průmysl celkem (C)" : d.obor,
      share: +d.podil_HPH * 100, energy: +d["nakupy_energie_%HPH"], indirect: +d["neprime_ETS_%HPH"],
      direct: num(d["prime_ETS_%HPH"]),
    }));
    const { svg, W, H } = canvas(el);
    const lw = LW;
    const head = 70;
    const y = rows(data.length, head + 6, H, 0.22);
    const bw = y.bandwidth();
    const xa = d3.scaleLinear().domain([0, 24]).range([lw + 6, lw + 190]);
    const xb = d3.scaleLinear().domain([0, 55]).range([lw + 380, W - 330]);
    const xc = W - 20;
    const hs = { size: FS.small, color: C.grey, top: true };
    lines(svg, xa(0), 8, ["Podíl na HPH", "průmyslu 2024"], hs);
    lines(svg, xb(0), 8, ["Nákupy energie (šedě) a z toho nepřímé náklady ETS", "v ceně elektřiny (červeně), % HPH odvětví, 2024"], hs);
    lines(svg, xc, 8, ["Přímé čisté", "náklady ETS*"], { ...hs, anchor: "end" });
    const marks = { C24: "²", C20: "¹" };
    data.forEach((d, i) => {
      const cy = y(i) + bw / 2;
      const total = d.nace === "C";
      if (total) hline(svg, y(i) - 8, xb(0), W - 20, { color: C.light, width: 1.5 });
      txt(svg, lw - 14, cy, d.name, { anchor: "end", bold: total });
      if (!total) {
        rect(svg, xa(0), xa(d.share), y(i), bw, C.cz);
        txt(svg, xa(d.share) + 8, cy, pct(d.share, 1), { size: FS.value });
      }
      rect(svg, xb(0), xb(d.energy), y(i), bw, "#dfe2e5");
      const red = rect(svg, xb(0), xb(d.indirect), y(i), bw, C.energy);
      const label = fmt(d.indirect, 1);
      const inside = xb(d.indirect) - xb(0) > label.length * 12 + 12;
      txt(svg, inside ? xb(0) + 8 : xb(d.indirect) + 6, cy, label, { size: FS.small, bold: true, color: inside ? "white" : C.energy });
      red.call(hover, () => `<strong>${d.name}</strong><br>Nákupy energie: ${pct(d.energy, 1)} HPH<br>z toho nepřímé náklady ETS: ${pct(d.indirect, 1)} HPH`);
      txt(svg, xb(d.energy) + 10, cy, pct(d.energy), { size: FS.value, bold: total });
      let direct = "—";
      let color = C.light;
      if (d.direct != null) {
        const zero = +Math.abs(d.direct).toFixed(1) === 0;
        direct = zero ? "0,0 %" : sgn(d.direct, 1) + " %";
        color = d.direct > 0 && !zero ? C.text : C.core;
      }
      txt(svg, xc, cy, direct + (marks[d.nace] || ""), { anchor: "end", bold: d.direct != null, color, size: FS.value });
    });
  };

  // 11 — change of output vs. emission intensity, six countries
  CHARTS.emisni = async (el) => {
    const [pts, size] = await Promise.all([sheet("s11-emisni"), sheet("s03-velikost")]);
    const names = new Map(size.map((d) => [d.NACE, d.obor]));
    const data = pts.map((d) => ({
      country: d.zeme, nace: d.obor, x: +d.emisni_narocnost_2015_2019_t_mil_EUR, y: +d["zmena_vyroby_2015_2025_%"],
    }));
    const { svg, W, H } = canvas(el);
    const m = { top: 24, right: 24, bottom: 92, left: 96 };
    const x = d3.scaleLog().domain([2.5, 7000]).range([m.left, W - m.right]);
    const y = d3.scaleLinear().domain(EMISNI_Y).range([H - m.bottom, m.top]);
    rect(svg, x(300), x(7000), y(0), y(EMISNI_Y[0]) - y(0), C.tint);
    yAxis(svg, y, m.left, W - m.left - m.right, {
      ticks: [-40, -20, 0, 20, 40, 60, 80, 100, 120],
      format: (v) => (v === 120 ? "+120 %" : sgn(v)),
    });
    xAxis(svg, x, H - m.bottom, { ticks: [3, 10, 30, 100, 300, 1000, 3000], format: (v) => fmt(v), grid: H - m.bottom - m.top });
    vline(svg, x(300), m.top, H - m.bottom, { color: C.grey, dashed: true });
    hline(svg, y(0), m.left, W - m.right, { color: C.grey, dashed: true });
    txt(svg, (m.left + W - m.right) / 2, H - 16, "Emisní náročnost, průměr 2015–2019 (t CO₂e na mil. € HPH, log. škála)", { anchor: "middle", size: FS.tick, color: C.grey });
    const q = { size: FS.small, color: C.grey };
    txt(svg, m.left + 12, m.top + 14, "Čisté a rostoucí", q);
    txt(svg, W - m.right - 12, m.top + 14, "Emisně náročné, ale rostoucí", { ...q, anchor: "end" });
    txt(svg, m.left + 12, H - m.bottom - 16, "Čisté, ale klesající", q);
    txt(svg, W - m.right - 12, H - m.bottom - 16, "Emisně náročné a klesající", { anchor: "end", bold: true, color: C.energy });
    // Trend across all points: change of output against log10 of intensity.
    const lx = data.map((d) => Math.log10(d.x));
    const ly = data.map((d) => d.y);
    const mx = d3.mean(lx);
    const my = d3.mean(ly);
    const sxy = d3.sum(lx, (v, i) => (v - mx) * (ly[i] - my));
    const sxx = d3.sum(lx, (v) => (v - mx) ** 2);
    const syy = d3.sum(ly, (v) => (v - my) ** 2);
    const slope = sxy / sxx;
    const corr = sxy / Math.sqrt(sxx * syy);
    const fit = (v) => my + slope * (Math.log10(v) - mx);
    svg.append("line").attr("x1", x(6)).attr("y1", y(fit(6))).attr("x2", x(5000)).attr("y2", y(fit(5000)))
      .attr("stroke", C.grey).attr("stroke-width", 3).attr("stroke-dasharray", "10 7");
    lines(svg, x(4.6), y(98), [
      "Trend napříč zeměmi: odvětví s 10× vyšší",
      `emisní náročností rostla v průměru o ${fmt(-slope)} p. b. méně`,
      `(korelace ${sgn(corr, 2)} – slabá vazba)`,
    ], { top: true });
    const g = svg.append("g");
    const clamp = (v) => Math.max(EMISNI_Y[0], Math.min(EMISNI_Y[1], v));
    const tipHtml = (d) => `<strong>${COUNTRY[d.country]}: ${names.get(d.nace) || d.nace}</strong><br>Emisní náročnost: ${fmt(d.x)} t CO₂e/mil. €<br>Změna výroby: ${sgn(d.y)} %`;
    data.filter((d) => d.country !== "CZ").forEach((d) => {
      const cy = y(clamp(d.y));
      const shape = d.y === clamp(d.y)
        ? g.append("circle").attr("cx", x(d.x)).attr("cy", cy).attr("r", 6)
        : g.append("path").attr("d", d.y > 0 ? "M-8,6L0,-8L8,6z" : "M-8,-6L0,8L8,-6z").attr("transform", `translate(${x(d.x)},${cy})`);
      shape.datum(d).attr("fill", "#c6ccd2").call(hover, tipHtml);
      if (d.nace === "C24") txt(g, x(d.x) + 10, cy, d.country, { size: FS.small, color: C.light });
    });
    const pos = {
      C21: [60, -36, "start"], C30: [-30, -50, "end"], C29: [-40, -10, "end"], C27: [60, -36, "start"],
      C25: [-90, -28, "end"], C26: [-60, 40, "end"], C31_32: [-80, 40, "end"], C33: [120, -40, "start"],
      C22: [110, 30, "start"], C28: [-50, 34, "end"], C18: [0, 46, "middle"], "C13-15": [40, 54, "start"],
      C16: [70, 40, "start"], "C10-12": [30, 46, "start"], C17: [30, -36, "start"], C20: [40, -60, "start"],
      C23: [-50, 40, "end"], C24: [-30, -2, "end"],
    };
    data.filter((d) => d.country === "CZ").forEach((d) => {
      const strong = group(d.nace) === "energy";
      const color = strong ? C.energy : C.cz;
      g.append("circle").datum(d).attr("cx", x(d.x)).attr("cy", y(d.y)).attr("r", 11)
        .attr("fill", color).attr("stroke", "white").attr("stroke-width", 2).call(hover, tipHtml);
      bubbleLabel(svg, x(d.x), y(d.y), 11, names.get(d.nace), pos[d.nace] || "t", { bold: strong, color });
    });
  };

  // 12 — electricity price for large industrial consumers
  CHARTS.elektrina = async (el) => {
    const data = (await sheet("s12-elektrina")).map((d) => ({
      code: d.zeme, name: COUNTRY[d.zeme] || d.zeme,
      v19: +d.IF_2019_EUR_MWh, v25: +d.IF_2025_EUR_MWh, v26: num(d.IF_2026_EUR_MWh),
    }));
    const { svg, W, H } = canvas(el);
    const lw = 220;
    const y = rows(data.length, 40, H, 0.25);
    const bw = y.bandwidth();
    const x = d3.scaleLinear().domain([0, 182]).range([lw, W - 360]);
    const c25 = W - 300;
    const c26 = W - 150;
    txt(svg, c25, 12, "2025", { size: FS.small, color: C.grey });
    txt(svg, c26, 12, "1. pol. 2026", { size: FS.small, color: C.energy });
    data.forEach((d, i) => {
      const cy = y(i) + bw / 2;
      const cz = d.code === "CZ";
      const eu = d.code.startsWith("EU");
      txt(svg, lw - 14, cy, d.name, { anchor: "end", bold: cz, color: cz ? C.cz : C.text });
      rect(svg, x(0), x(d.v25), y(i), bw, cz ? C.cz : eu ? C.dark : C.other)
        .call(hover, () => `<strong>${d.name}</strong><br>2019: ${fmt(d.v19)} €/MWh<br>2025: ${fmt(d.v25)} €/MWh` + (d.v26 ? `<br>1. pol. 2026: ${fmt(d.v26)} €/MWh` : ""));
      svg.append("circle").attr("cx", x(d.v19)).attr("cy", cy).attr("r", 9)
        .attr("fill", "white").attr("stroke", C.text).attr("stroke-width", 3).attr("pointer-events", "none");
      if (d.v26 != null) {
        svg.append("rect").attr("x", -9).attr("y", -9).attr("width", 18).attr("height", 18)
          .attr("transform", `translate(${x(d.v26)},${cy}) rotate(45)`).attr("fill", C.energy).attr("pointer-events", "none");
        txt(svg, c26, cy, fmt(d.v26) + " €", { size: FS.value, color: C.energy });
      }
      txt(svg, c25, cy, fmt(d.v25) + " €", { size: FS.value, bold: cz, color: cz ? C.cz : C.text });
    });
    legend(svg, [
      { label: "2019", kind: "ring", color: C.text },
      { label: "1. pololetí 2026", kind: "diamond", color: C.energy },
      { label: "2025", color: C.other },
    ], x(112), H - 130, { vertical: true });
  };

  // 13 — productivity vs. labour costs
  CHARTS["produktivita-index"] = async (el) => {
    const d = await sheet("s13-produktivita");
    const s = (key) => d.map((r) => ({ year: +r.rok, v: +r[key] }));
    const cost = s("naklady_prace_na_zam_2015=100");
    const ulc = s("jednotkove_naklady_prace_2015=100");
    const prod = s("produktivita_2015=100");
    const ch = (v) => sgn(change(v.map((p) => p.v))) + " %";
    indexChart(el, [
      { name: "Náklady práce na zaměstnance", values: cost, color: C.energy, label: ["Náklady práce", "na zaměstnance " + ch(cost)] },
      { name: "Náklady práce na jednotku výkonu", values: ulc, color: C.cz, label: ["Náklady práce na", "jednotku výkonu " + ch(ulc)] },
      { name: "Produktivita", values: prod, color: C.core, label: ["Produktivita (HPH", "na pracovníka) " + ch(prod)] },
    ], { domain: [95, 210], ticks: [100, 125, 150, 175, 200], right: 250 });
  };

  CHARTS["produktivita-ulc"] = async (el) => {
    const data = (await sheet("s13-srovnani"))
      .map((d) => ({ code: d.zeme, name: COUNTRY[d.zeme] + (d.posledni_rok !== "2025" ? "*" : ""), v: +d["zmena_jednotkovych_nakladu_prace_od_2015_%"] }))
      .sort((a, b) => b.v - a.v);
    const { svg, W, H } = canvas(el);
    const lw = 170;
    const y = rows(data.length, 0, H, 0.35);
    const x = d3.scaleLinear().domain([0, 100]).range([lw, W - 100]);
    data.forEach((d, i) => {
      const cy = y(i) + y.bandwidth() / 2;
      const cz = d.code === "CZ";
      txt(svg, lw - 14, cy, d.name, { anchor: "end", bold: cz, color: cz ? C.cz : C.text });
      rect(svg, x(0), x(d.v), y(i), y.bandwidth(), cz ? C.cz : C.other);
      txt(svg, x(d.v) + 10, cy, sgn(d.v) + " %", { size: FS.value, bold: cz });
    });
  };

  CHARTS["produktivita-prace"] = async (el) => {
    const raw = await sheet("s05-naklady");
    const share = (r) => (+r.osobni_naklady_mil_EUR / +r.trzby_mil_EUR) * 100;
    const top = raw.map((r) => ({ nace: r.NACE, name: r.obor, v: share(r) })).sort((a, b) => b.v - a.v).slice(0, 10);
    const total = (d3.sum(raw, (r) => +r.osobni_naklady_mil_EUR) / d3.sum(raw, (r) => +r.trzby_mil_EUR)) * 100;
    const data = [...top, { nace: "C", name: "Průmysl celkem", v: total }];
    const { svg, W, H } = canvas(el);
    const lw = 300;
    const y = rows(data.length, 0, H, 0.3);
    const x = d3.scaleLinear().domain([0, 24]).range([lw, W - 100]);
    const strong = ["C28", "C25", "C"];
    data.forEach((d, i) => {
      const cy = y(i) + y.bandwidth() / 2;
      const s = strong.includes(d.nace);
      txt(svg, lw - 14, cy, d.name, { anchor: "end", bold: s, size: FS.small + 1 });
      rect(svg, x(0), x(d.v), y(i), y.bandwidth(), d.nace === "C" ? C.dark : s ? C.cz : C.other);
      txt(svg, x(d.v) + 10, cy, pct(d.v, 1), { size: FS.value, bold: s });
    });
  };

  // 14 — manual occupations
  CHARTS.manualni = async (el) => {
    const data = (await sheet("s14-manualni")).map((d) => ({
      code: d.zeme, name: COUNTRY[d.zeme] || d.zeme,
      i7: +d["ISCO7_%"], i8: +d["ISCO8_%"], i9: +d["ISCO9_%"],
      total: +d["manualni_2025_%"], t22: +d["manualni_2022_%"], people: +d.manualni_2025_tis,
    })).sort((a, b) => b.total - a.total);
    const { svg, W, H } = canvas(el);
    const lw = 220;
    const y = rows(data.length, 0, H, 0.32);
    const bw = y.bandwidth();
    // 66 % (the widest value) ends at ~60 % of the width, leaving room for labels.
    const x = d3.scaleLinear().domain([0, 106]).range([lw, W]);
    const colors = [C.cz, C.core, "#9ecdf2"];
    data.forEach((d, i) => {
      const cy = y(i) + bw / 2;
      const cz = d.code === "CZ";
      txt(svg, lw - 14, cy, d.name, { anchor: "end", bold: cz, color: cz ? C.cz : C.text });
      let acc = 0;
      [d.i7, d.i8, d.i9].forEach((v, k) => { rect(svg, x(acc), x(acc + v), y(i), bw, colors[k]); acc += v; });
      const end = Math.max(x(acc), x(d.t22));
      svg.append("circle").attr("cx", x(d.t22)).attr("cy", cy).attr("r", 9)
        .attr("fill", "white").attr("stroke", C.text).attr("stroke-width", 3);
      const people = d.people >= 10000 ? fmt(d.people / 1000, 1) + " mil." : fmt(d.people) + " tis.";
      txt(svg, end + 22, cy, [[pct(d.total), { bold: true }], [` (${people})`, { color: C.grey }]], { size: FS.value, color: cz ? C.cz : C.text });
    });
    legend(svg, [
      { label: "celkem 2022", kind: "ring", color: C.text },
      { label: "Řemeslníci a opraváři (ISCO 7)", color: colors[0] },
      { label: "Obsluha strojů a montážní dělníci (ISCO 8)", color: colors[1] },
      { label: "Pomocní pracovníci (ISCO 9)", color: colors[2] },
    ], W - 560, H - 4 * 34 - 4, { vertical: true, size: FS.small, lineHeight: 34 });
  };

  // 16–20 — branch stories
  async function outputSeries(key, extra = []) {
    const d = await sheet("s16-20-vyroba");
    return d.map((r) => ({ year: +r.rok, v: +r[key] })).concat(extra);
  }
  const label = (name, values) => `${name} ${sgn(change(values.map((p) => p.v)))} %`;

  CHARTS["auta-vyroba"] = async (el) => {
    const d = await sheet("s16-auta");
    const cz = d.map((r) => ({ year: +r.rok, v: +r["vyroba_CZ_2015=100"] }));
    const de = d.map((r) => ({ year: +r.rok, v: +r["vyroba_DE_2015=100"] }));
    indexChart(el, [
      { name: "Česko", values: cz, color: C.cz, label: label("Česko", cz) },
      { name: "Německo", values: de, color: C.other, dots: false, width: 4, label: label("Německo", de) },
    ], { ...OUTPUT_Y, right: 190 });
  };

  function laborChart(el, d) {
    const cost = d.map((r) => ({ year: +r.rok, v: +r["naklady_prace_na_zam_2015=100"] }));
    const out = d.map((r) => ({ year: +r.rok, v: +r["vyroba_na_pracujiciho_2015=100"] }));
    const top = Math.ceil(d3.max(cost, (p) => p.v) / 20) * 20;
    indexChart(el, [
      { name: "Náklady práce na zaměstnance", values: cost, color: C.energy, label: ["Náklady práce na", label("zaměstnance", cost)] },
      { name: "Výroba na pracujícího", values: out, color: C.core, label: ["Výroba na", label("pracujícího", out)] },
    ], { domain: [95, top], ticks: d3.range(100, top + 1, 20), right: 230 });
  }
  CHARTS["auta-prace"] = async (el) => laborChart(el, await sheet("s16-auta"));
  CHARTS["stroje-prace"] = async (el) => laborChart(el, await sheet("s17-stroje"));

  CHARTS["auta-cina"] = async (el) => {
    const data = (await sheet("s16-cina")).map((d) => ({ year: +d.rok, v: +d.dovoz_aut_HS8703_z_Ciny_do_EU_mil_EUR / 1000 }));
    const { svg, W, H } = canvas(el);
    const m = { top: 30, right: 10, bottom: 52, left: 54 };
    const x = d3.scaleBand().domain(data.map((d) => d.year)).range([m.left, W - m.right]).padding(0.22);
    const y = d3.scaleLinear().domain([0, 16]).range([H - m.bottom, m.top]);
    yAxis(svg, y, m.left, W - m.left - m.right, { ticks: [0, 5, 10, 15] });
    xAxis(svg, x, H - m.bottom, { format: (v) => String(v).slice(2) });
    data.forEach((d) => {
      rect(svg, x(d.year), x(d.year) + x.bandwidth(), y(d.v), y(0) - y(d.v), d.year >= 2022 ? C.energy : C.energyLight)
        .call(hover, () => `<strong>${d.year}</strong><br>${fmt(d.v, 1)} mld. €`);
      txt(svg, x(d.year) + x.bandwidth() / 2, y(d.v) - 16, fmt(d.v, 1), { anchor: "middle", size: FS.small });
    });
  };

  CHARTS["stroje-vyroba"] = async (el) => {
    const d = await sheet("s17-stroje");
    const cz = d.map((r) => ({ year: +r.rok, v: +r["vyroba_CZ_2015=100"] }));
    const de = await outputSeries("C28_DE");
    indexChart(el, [
      { name: "Česko", values: cz, color: C.cz, label: label("Česko", cz) },
      { name: "Německo", values: de, color: C.other, dots: false, width: 4, label: label("Německo", de) },
    ], { ...OUTPUT_Y, right: 190 });
  };

  CHARTS["hute-vyroba"] = async (el) => {
    const [cz, de, pl, sk] = await Promise.all([
      outputSeries("C24_CZ"), outputSeries("C24_DE"), outputSeries("C24_PL"),
      // ŠÚ SR publishes base metals only together with metal products
      // (C24 + C25), with 2021 = 100; rebased here to 2015.
      d3.csv(DIR + "sk-vyroba.csv").then((table) => {
        const r = table.find((d) => d.nace === "24-25");
        return d3.range(2015, 2026).map((y) => ({ year: y, v: (+r[y] / +r[2015]) * 100 }));
      }),
    ]);
    indexChart(el, [
      { name: "Polsko", values: pl, color: C.core, dots: false, width: 4, label: label("Polsko", pl) },
      { name: "Slovensko*", values: sk, color: C.other, dots: false, width: 4, dashed: true, label: label("Slovensko*", sk) },
      { name: "Německo", values: de, color: C.other, dots: false, width: 4, label: label("Německo", de) },
      { name: "Česko", values: cz, color: C.cz, label: label("Česko", cz) },
    ], { ...OUTPUT_Y, right: 220 });
  };

  CHARTS["chemie-vyroba"] = async (el) => {
    const [cz, de] = await Promise.all([outputSeries("C20_CZ"), outputSeries("C20_DE")]);
    indexChart(el, [
      { name: "Česko", values: cz, color: C.cz, label: label("Česko", cz) },
      { name: "Německo", values: de, color: C.other, dots: false, width: 4, label: label("Německo", de) },
    ], { ...OUTPUT_Y, right: 190 });
  };

  CHARTS["cement-vyroba"] = async (el) => {
    const [cz, de] = await Promise.all([outputSeries("C23_CZ"), outputSeries("C23_DE")]);
    indexChart(el, [
      { name: "Česko", values: cz, color: C.cz, label: label("Česko", cz) },
      { name: "Německo", values: de, color: C.other, dots: false, width: 4, label: label("Německo", de) },
    ], { ...OUTPUT_Y, right: 190 });
  };

  CHARTS["stroje-naklady"] = (el) => costBars(el, "C28");
  CHARTS["hute-naklady"] = (el) => costBars(el, "C24");
  CHARTS["chemie-naklady"] = (el) => costBars(el, "C20");
  CHARTS["cement-naklady"] = (el) => costBars(el, "C23");
  CHARTS["chemie-ets"] = (el) => branchEts(el, "s19-chemie");
  CHARTS["cement-ets"] = (el) => branchEts(el, "s20-cement");

  // 18 — steel sites: Třinec and Ostrava, with Třinec's CBAM outlook
  CHARTS["hute-ets"] = async (el) => {
    const raw = await sheet("s18-hute");
    const site = (name) => raw.filter((d) => d.lokalita === name)
      .map((d) => ({ year: +d.rok, e: +d.emise_kt / 1000, a: +d.povolenky_zdarma_kt / 1000 }));
    const trinec = site("Třinec");
    const ostrava = site("Ostrava");
    const now = trinec.find((d) => d.year === 2024);
    const other = now.a - TRINEC_STEEL_ALLOC_2024 / 1000;
    const outlook = Object.entries(CBAM_FACTOR).map(([year, f]) => ({
      year: +year, e: now.e, a: other + (TRINEC_STEEL_ALLOC_2024 / 1000) * f, outlook: true,
    }));
    const { svg, W, H } = canvas(el);
    const m = { top: 92, right: 8, bottom: 50, left: 44 };
    // Empty slots set the outlook apart and give its year labels room.
    const years = [...d3.range(2013, 2026), "gap1", 2030, "gap2", 2034];
    const x = d3.scaleBand().domain(years).range([m.left, W - m.right]).padding(0.26);
    const panelGap = 34;
    const ph = (H - m.top - m.bottom - panelGap) / 2;
    [[trinec.concat(outlook), "Třinec", m.top], [ostrava, "Ostrava", m.top + ph + panelGap]].forEach(([data, name, top]) => {
      const y = d3.scaleLinear().domain([0, 6]).range([top + ph, top]);
      yAxis(svg, y, m.left, W - m.left - m.right, { ticks: [0, 2, 4, 6] });
      etsBars(svg, svg.append("g"), data, x, y, { title: name });
      txt(svg, m.left + 10, top + 10, name, { bold: true });
    });
    xAxis(svg, x, H - m.bottom, { ticks: [2013, 2017, 2021, 2025, 2030, 2034], format: d3.format("d") });
    const yT = d3.scaleLinear().domain([0, 6]).range([m.top + ph, m.top]);
    outlook.forEach((d) => txt(svg, x(d.year) + x.bandwidth() / 2, yT(d.e) - 20, fmt(d.e - d.a, 1), { anchor: "middle", bold: true, size: FS.small }));
    txt(svg, (x(2030) + x(2034) + x.bandwidth()) / 2, yT(d3.max(outlook, (d) => d.e)) - 50, "výhled (CBAM)", { anchor: "middle", size: FS.small, color: C.grey });
    etsLegend(svg, svg.append("g"), m.left, 12, { short: true, columns: 2, columnWidths: [(W - m.left) * 0.58], size: FS.small, lineHeight: 34 });
  };

  // 22 — all industrial installations in the EU ETS
  async function allowances() {
    return (await sheet("s22-povolenky")).map((d) => ({
      year: +d.rok, price: +d.cena_EUR_t,
      eProc: +d.emise_procesni_t / 1e6, aProc: +d.povolenky_zdarma_procesni_t / 1e6,
      e: (+d.emise_procesni_t + +d.emise_spalovaci_prum_t) / 1e6,
      a: (+d.povolenky_zdarma_procesni_t + +d.povolenky_zdarma_spalovaci_prum_t) / 1e6,
    }));
  }

  CHARTS.povolenky = async (el) => {
    const data = await allowances();
    const { svg, W, H } = canvas(el);
    const m = { top: 14, right: 8, bottom: 120, left: 56 };
    const x = d3.scaleBand().domain(data.map((d) => d.year)).range([m.left, W - m.right]).padding(0.26);
    const y = d3.scaleLinear().domain([0, 25]).range([H - m.bottom, m.top]);
    yAxis(svg, y, m.left, W - m.left - m.right, { ticks: [0, 5, 10, 15, 20, 25] });
    xAxis(svg, x, H - m.bottom, { format: d3.format("d") });
    etsBars(svg, svg.append("g"), data, x, y, { title: "Průmysl" });
    txt(svg, m.left, H - 52, "Cena povolenky (€/t):", { size: FS.small, color: C.grey });
    data.forEach((d) => txt(svg, x(d.year) + x.bandwidth() / 2, H - 16, fmt(d.price), { anchor: "middle", size: FS.small, color: C.grey }));
  };

  CHARTS["povolenky-procesni"] = async (el) => {
    const all = await allowances();
    const data = all.map((d) => ({ year: d.year, e: d.eProc, a: d.aProc }));
    const deficit = d3.sum(all, (d) => d.e - d.a);
    const cost = d3.sum(all, (d) => (d.e - d.a) * d.price) / 1000;
    const { svg, W, H } = canvas(el);
    const m = { top: 14, right: 8, bottom: 120, left: 56 };
    const x = d3.scaleBand().domain(data.map((d) => d.year)).range([m.left, W - m.right]).padding(0.26);
    const y = d3.scaleLinear().domain([0, 25]).range([H - m.bottom, m.top]);
    yAxis(svg, y, m.left, W - m.left - m.right, { ticks: [0, 5, 10, 15, 20, 25] });
    xAxis(svg, x, H - m.bottom, { ticks: [2013, 2017, 2021, 2025], format: d3.format("d") });
    etsBars(svg, svg.append("g"), data, x, y, { title: "Procesní činnosti" });
    etsLegend(svg, svg.append("g"), m.left + 14, 30, { vertical: true, size: FS.small, lineHeight: 34 });
    lines(svg, m.left + 14, 200, [
      "Průmysl dostává většinu povolenek zdarma",
      "(obvykle 75–85 % emisí), ne všechny.",
      [["Souhrn 2013–2025: ", {}], [`emise o ${fmt(deficit)} mil. t vyšší`, { bold: true }]],
      `než bezplatné povolenky (≈ ${fmt(cost, 1)} mld. € v cenách`,
      "daného roku), hlavně chemie (≈ 1,1 mld. €)",
      "a hutě (≈ 0,4 mld. €).",
    ], { size: FS.small, top: true });
  };

  // 23 — exports outside the EU ETS area
  const DOWNSTREAM = ["C25", "C27", "C28", "C29", "C30"];
  CHARTS["cbam-vyvoz"] = async (el) => {
    const data = (await sheet("s23-cbam-vyvoz")).map((d) => {
      const prod = +d.produkce_2024;
      const outEts = +d.vyvoz_mimo_EU - +d.Norsko - +d.Svycarsko; // vč. Spojeného království
      const uk = +d.Spojene_kralovstvi;
      const color = d.NACE === "C24" ? C.energy : ["C20", "C23"].includes(d.NACE) ? C.energyLight : DOWNSTREAM.includes(d.NACE) ? C.core : C.other;
      return { nace: d.NACE, name: d.obor, share: ((outEts - uk) / prod) * 100, uk: (uk / prod) * 100, volume: outEts / 1000, color };
    }).sort((a, b) => b.share + b.uk - (a.share + a.uk));
    const { svg, W, H } = canvas(el);
    const lw = LW;
    const y = rows(data.length, 0, H, 0.28);
    const x = d3.scaleLinear().domain([0, 30]).range([lw, lw + (W - lw) * 0.52]);
    data.forEach((d, i) => {
      const cy = y(i) + y.bandwidth() / 2;
      txt(svg, lw - 14, cy, d.name, { anchor: "end" });
      rect(svg, x(0), x(d.share), y(i), y.bandwidth(), d.color);
      rect(svg, x(d.share), x(d.share + d.uk), y(i), y.bandwidth(), hatch(svg, d.color, "white"))
        .attr("stroke", d.color).attr("stroke-width", 1.5);
      txt(svg, x(d.share + d.uk) + 12, cy, [[`${pct(d.share)} + UK ${pct(d.uk)}`], [` (${fmt(d.volume, 1)} mld. €)`, { color: C.grey }]], { size: FS.value });
    });
    legend(svg, [
      { label: "CBAM – celý obor (ocel)", color: C.energy },
      { label: "CBAM – část oboru (cement; hnojiva, vodík)", color: C.energyLight },
      { label: "Odběratelé oceli a hliníku (downstream)", color: C.core },
      { label: "Ostatní", color: C.other },
      { label: "z toho Spojené království (vlastní ETS, CBAM od 2027)", kind: "fill", color: hatch(svg, C.grey, "white"), stroke: C.grey },
    ], W - 600, H - 5 * 36 + 10, { vertical: true, size: FS.small, lineHeight: 36 });
  };

  // 24 — regions: map of emissions and energy-intensive jobs
  CHARTS["kraje-mapa"] = async (el) => {
    const [geo, kraje, jobs] = await Promise.all([d3.json(DIR + "kraje.json"), sheet("s24-kraje"), sheet("s24-prac-mista")]);
    const share = new Map(jobs.map((d) => [d.NUTS2, +d["podil_%"]]));
    const emis = new Map(kraje.map((d) => [d.NUTS3, +d.prum_emise_ETS_2015_2019_kt]));
    const { svg, W, H } = canvas(el);
    const legendH = 100;
    const projection = d3.geoMercator().fitExtent([[10, 10], [W - 10, H - legendH]], geo);
    const path = d3.geoPath(projection);
    const color = d3.scaleLinear().domain([7, 22]).range(["#fde8ea", C.energy]).clamp(true);
    svg.append("g").selectAll("path").data(geo.features).join("path")
      .attr("d", path).attr("fill", (f) => color(share.get(f.properties.nuts3.slice(0, 4))))
      .attr("stroke", "white").attr("stroke-width", 2.5)
      .call(hover, (f) => `<strong>${f.properties.kraj}</strong><br>Průmyslové emise EU ETS: ${fmt(emis.get(f.properties.nuts3) / 1000, 1)} Mt ročně<br>Místa v energeticky náročných oborech (region NUTS 2): ${pct(share.get(f.properties.nuts3.slice(0, 4)), 1)}`);
    const r = d3.scaleSqrt().domain([0, d3.max(emis.values())]).range([0, 66]);
    // Středočeský kraj surrounds Prague; its centroid would land in the city.
    const shift = { CZ020: [0, 46] };
    const g = svg.append("g").attr("pointer-events", "none");
    geo.features.forEach((f) => {
      const code = f.properties.nuts3;
      const [cx0, cy0] = path.centroid(f);
      const [dx, dy] = shift[code] || [0, 0];
      const cx = cx0 + dx;
      const cy = cy0 + dy;
      const v = emis.get(code);
      g.append("circle").attr("cx", cx).attr("cy", cy).attr("r", Math.max(r(v), 5))
        .attr("fill", "white").attr("fill-opacity", 0.25).attr("stroke", C.text).attr("stroke-width", 3);
      if (v >= 400) txt(g, cx, cy + Math.max(r(v), 5) + 18, fmt(v / 1000, 1) + " Mt", { anchor: "middle", bold: true, size: FS.small });
    });
    legend(svg, [
      { label: "~8 %", color: color(8) },
      { label: "~12 %", color: color(12) },
      { label: "17 % Moravskoslezsko", color: color(17.3) },
      { label: "22 % Severozápad", color: color(21.8) },
    ], 20, H - 70, { columns: 2, columnWidth: 300, size: FS.small, lineHeight: 36 });
  };

  CHARTS["kraje-zamestnanost"] = async (el) => {
    const data = (await sheet("s24-kraje")).map((d) => ({
      name: d.kraj,
      x: +d.prum_emise_ETS_2015_2019_kt / +d.zamestnani_prumer_2015_2019_tis,
      y: (+d.zamestnani_C_2023_tis / +d.zamestnani_C_2015_tis - 1) * 100,
      c15: +d.zamestnani_C_2015_tis, c23: +d.zamestnani_C_2023_tis,
    }));
    const avg = (d3.sum(data, (d) => d.c23) / d3.sum(data, (d) => d.c15) - 1) * 100;
    const corr = (list) => {
      const lx = list.map((d) => Math.log10(d.x));
      const ly = list.map((d) => d.y);
      const mx = d3.mean(lx);
      const my = d3.mean(ly);
      return d3.sum(lx, (v, i) => (v - mx) * (ly[i] - my)) / Math.sqrt(d3.sum(lx, (v) => (v - mx) ** 2) * d3.sum(ly, (v) => (v - my) ** 2));
    };
    const { svg, W, H } = canvas(el);
    const m = { top: 20, right: 20, bottom: 92, left: 76 };
    const x = d3.scaleLog().domain([0.15, 40]).range([m.left, W - m.right]);
    const y = d3.scaleLinear().domain([-19, 8]).range([H - m.bottom, m.top]);
    const r = d3.scaleSqrt().domain([0, d3.max(data, (d) => d.c15)]).range([0, 34]);
    rect(svg, x(1), x(40), y(avg), y(-19) - y(avg), C.tint);
    yAxis(svg, y, m.left, W - m.left - m.right, { ticks: [-15, -10, -5, 0, 5], format: (v) => (v === 5 ? "+5 %" : sgn(v)) });
    xAxis(svg, x, H - m.bottom, { ticks: [0.3, 1, 3, 10, 30], format: (v) => fmt(v, v < 1 ? 1 : 0), grid: H - m.bottom - m.top });
    vline(svg, x(1), m.top, H - m.bottom, { color: C.grey, dashed: true });
    hline(svg, y(avg), m.left, W - m.right, { color: C.grey, dashed: true });
    txt(svg, (m.left + W - m.right) / 2, H - 16, "Emise EU ETS na zaměstnaného, 2015–2019 (t CO₂, log. škála)", { anchor: "middle", size: FS.tick, color: C.grey });
    txt(svg, W - m.right - 12, H - m.bottom - 20, "Hodně emisí, místa ubývají", { anchor: "end", bold: true, color: C.energy });
    const noPrague = data.filter((d) => d.name !== "Praha");
    lines(svg, W - m.right - 12, m.top + 14, [
      [[`korelace ${fmt(corr(data), 2)} (bez Prahy ${fmt(corr(noPrague), 2)}; n = ${data.length})`, { bold: true }]],
      `čárkovaně průměr ČR ${sgn(avg, 1)} %`,
    ], { anchor: "end", size: FS.small, top: true });
    const pos = {
      Praha: [-28, 0, "end"], "Královéhradecký": "r", "Moravskoslezský": [-20, -70, "end"], "Středočeský": "t",
      "Ústecký": "t", "Zlínský": [-30, -50, "end"], Vysočina: "l", "Plzeňský": [-40, 30, "end"],
      "Jihočeský": [10, 70, "start"], "Jihomoravský": [40, 100, "start"], "Olomoucký": "br",
      "Pardubický": "r", "Liberecký": "b", "Karlovarský": "r",
    };
    const g = svg.append("g");
    data.forEach((d) => {
      const hot = d.x > 10;
      const color = hot ? C.energy : C.cz;
      g.append("circle").datum(d).attr("cx", x(d.x)).attr("cy", y(d.y)).attr("r", r(d.c15))
        .attr("fill", color).attr("fill-opacity", 0.9).attr("stroke", "white").attr("stroke-width", 2)
        .call(hover, (d) => `<strong>${d.name}</strong><br>Emise na zaměstnaného: ${fmt(d.x, 1)} t<br>Zaměstnanost v průmyslu 2015 → 2023: ${sgn(d.y, 1)} %`);
      bubbleLabel(svg, x(d.x), y(d.y), r(d.c15), `${d.name} ${sgn(d.y)} %`, pos[d.name] || "t", { size: FS.small, bold: hot, color: hot ? C.energy : C.text });
    });
  };

  // 27 — appendix: three measures of size
  CHARTS["priloha-velikost"] = async (el) => {
    const data = await sizeRows();
    const { svg, W, H } = canvas(el);
    const lw = LW;
    const head = 40;
    const y = rows(data.length, head + 10, H - 60, 0.25);
    const cols = [
      { title: "Podíl na HPH průmyslu 2025", x0: lw + 10, w: 280, max: 21, v: (d) => d.share, label: (d) => [[pct(d.share, 1)], [` (${fmt(d.hphAbs, 1)} mld. €)`, { color: C.grey }]] },
      { title: "Podíl na zaměstnanosti v průmyslu 2025", x0: lw + 590, w: 250, max: 16, v: (d) => d.empShare, label: (d) => [[pct(d.empShare, 1)], [` (${fmt(d.emp)} tis.)`, { color: C.grey }]] },
      { title: "Tržby 2024", x0: lw + 1090, w: 190, max: 72, v: (d) => d.sales, label: (d) => [[`${fmt(d.sales, 1)} mld. €`]] },
    ];
    cols.forEach((c) => {
      const x = d3.scaleLinear().domain([0, c.max]).range([c.x0, c.x0 + c.w]);
      txt(svg, c.x0, 14, c.title, { size: FS.small, color: C.grey });
      data.forEach((d, i) => {
        rect(svg, x(0), x(c.v(d)), y(i), y.bandwidth(), groupColor(d.nace));
        txt(svg, x(c.v(d)) + 8, y(i) + y.bandwidth() / 2, c.label(d), { size: FS.small });
      });
    });
    data.forEach((d, i) => txt(svg, lw - 14, y(i) + y.bandwidth() / 2, d.name, { anchor: "end", size: FS.small + 1 }));
    legend(svg, GROUPS_SHORT, W - 900, H - 20, { size: FS.small });
  };

  // 28 — appendix: contributions to growth
  CHARTS["priloha-prispevky"] = async (el) => {
    const data = (await sheet("s04-vyvoj")).map((d) => ({
      nace: d.NACE, name: d.obor, w: +d.vaha_HPH_2015 * 100, ch: +d.zmena_vyroby_2015_2025 * 100, c: +d.prispevek_pb,
    })).sort((a, b) => b.c - a.c);
    const { svg, W, H } = canvas(el);
    const lw = LW;
    const y = rows(data.length, 60, H - 60, 0.25);
    const bw = y.bandwidth();
    const xw = d3.scaleLinear().domain([0, 20]).range([lw + 10, lw + 330]);
    const xc = d3.scaleLinear().domain([-30, 80]).range([lw + 560, W - 260]);
    const hs = { size: FS.small, color: C.grey, top: true };
    lines(svg, xw(0), 4, ["Váha: podíl na HPH", "zpracovatelského průmyslu 2015"], hs);
    lines(svg, xc(-30), 4, ["Změna objemu výroby 2015 → 2025"], hs);
    lines(svg, W - 20, 4, ["Příspěvek", "(p. b.)"], { ...hs, anchor: "end" });
    vline(svg, xc(0), 50, H - 60, { color: C.grey });
    data.forEach((d, i) => {
      const cy = y(i) + bw / 2;
      txt(svg, lw - 14, cy, d.name, { anchor: "end", size: FS.small + 1 });
      rect(svg, xw(0), xw(d.w), y(i), bw, C.cz);
      txt(svg, xw(d.w) + 8, cy, pct(d.w, 1), { size: FS.small });
      rect(svg, xc(0), xc(d.ch), y(i), bw, groupColor(d.nace));
      const neg = d.ch < 0 || +Math.abs(d.ch).toFixed(0) === 0;
      txt(svg, xc(d.ch) + (neg ? -8 : 8), cy, (d.ch < 0 && +Math.abs(d.ch).toFixed(0) === 0 ? "−0" : sgn(d.ch)) + " %", { anchor: neg ? "end" : "start", size: FS.small });
      txt(svg, W - 20, cy, sgn(d.c, 2), { anchor: "end", size: FS.small + 1, bold: Math.abs(d.c) >= 0.5 });
    });
    legend(svg, [
      { label: "energeticky náročná (ETS)", color: C.energy },
      { label: "strojírenství a automotive", color: C.core },
      { label: "ostatní", color: C.other },
    ], xc(-30), H - 20, { size: FS.small });
  };

  // 29 — appendix: energy mix
  CHARTS["priloha-energie"] = async (el) => {
    const data = await energyRows();
    const { svg, W, H } = canvas(el);
    const lw = LW;
    const legendH = 90;
    const y = rows(data.length, 40, H - legendH, 0.22);
    const bw = y.bandwidth();
    const xm = d3.scaleLinear().domain([0, 100]).range([lw + 10, lw + 920]);
    const xi = d3.scaleLog().domain([0.5, 150]).range([lw + 990, W - 70]);
    txt(svg, xm(0), 10, "Skladba užité energie (%)", { size: FS.small, color: C.grey });
    txt(svg, xi(0.5), 10, "Energetická náročnost (TJ na mil. € HPH, log.)", { size: FS.small, color: C.grey });
    data.forEach((d, i) => {
      const cy = y(i) + bw / 2;
      txt(svg, lw - 14, cy, d.name, { anchor: "end", size: FS.small + 1 });
      let acc = 0;
      d.shares.forEach((s, k) => {
        const [, name, , color] = CARRIERS[k];
        rect(svg, xm(acc), xm(acc + s), y(i), bw, color)
          .call(hover, () => `<strong>${d.name}</strong><br>${name}: ${pct(s, 1)}`);
        if (s >= 14) txt(svg, xm(acc + s / 2), cy, fmt(s), { anchor: "middle", size: FS.small - 2, color: DARK_CARRIERS.includes(color) ? "white" : C.text });
        acc += s;
      });
      rect(svg, xi(0.5), xi(d.tj), y(i), bw, groupColor(d.nace));
      txt(svg, xi(d.tj) + 8, cy, fmtTJ(d.tj), { size: FS.small });
    });
    legend(svg, CARRIERS.map(([, name, , color]) => ({ label: name, color })), 20, H - 62,
      { columns: 5, columnWidth: 345, size: FS.small, lineHeight: 36 });
  };

  // 30 — appendix: imports and exports
  CHARTS["priloha-obchod"] = async (el) => {
    const marks = { C24: "  [CBAM]", C20: "  [CBAM*]", C23: "  [CBAM*]" };
    const data = (await sheet("s08-obchod")).map((d) => ({
      nace: d.NACE, name: d.obor + (marks[d.NACE] || ""),
      ie: +d["dovoz_z_EU_%"], io: +d["dovoz_mimo_EU_%"],
      ee: +d["vyvoz_do_EU_%_produkce"], eo: +d["vyvoz_mimo_oblast_ETS_%_produkce"],
    })).sort((a, b) => b.ie + b.io - (a.ie + a.io));
    const { svg, W, H } = canvas(el);
    const lw = LW;
    const y = rows(data.length, 50, H - 60, 0.25);
    const bw = y.bandwidth();
    const xi = d3.scaleLinear().domain([0, 100]).range([lw + 10, lw + 560]);
    const xe = d3.scaleLinear().domain([0, 100]).range([lw + 740, W - 40]);
    txt(svg, xi(0), 14, "Dovozní penetrace 2024: dovoz z EU / z mimo EU", { size: FS.small, color: C.grey });
    txt(svg, xe(0), 14, "Vývoz 2024 (% produkce): do EU / mimo oblast EU ETS", { size: FS.small, color: C.grey });
    data.forEach((d, i) => {
      const cy = y(i) + bw / 2;
      txt(svg, lw - 14, cy, d.name, { anchor: "end", size: FS.small + 1 });
      rect(svg, xi(0), xi(d.ie), y(i), bw, C.cz);
      rect(svg, xi(d.ie), xi(d.ie + d.io), y(i), bw, C.energy);
      txt(svg, xi(d.ie + d.io) + 8, cy, pct(d.ie + d.io), { size: FS.small });
      rect(svg, xe(0), xe(d.ee), y(i), bw, "#9d9dc9");
      rect(svg, xe(d.ee), xe(d.ee + d.eo), y(i), bw, C.energyLight);
      txt(svg, xe(d.ee + d.eo) + 8, cy, pct(d.ee + d.eo), { size: FS.small });
    });
    legend(svg, [
      { label: "EU", color: C.cz },
      { label: "mimo EU (u vývozu: mimo EU, Norsko a Švýcarsko)", color: C.energy },
    ], xe(0), H - 20, { size: FS.small });
  };

  // 31 — appendix: summary table, shaded by rank among the 18 branches
  CHARTS.souhrn = async (el) => {
    const [table, size] = await Promise.all([sheet("s31-souhrn"), sizeRows()]);
    const share = new Map(size.map((d) => [d.nace, d.share]));
    // The sheet's share column is rounded to two decimals; see sizeRows().
    const data = table.map((d) => ({ ...d, "podil_HPH_%": share.get(d.NACE) }));
    const cols = [
      { key: "podil_HPH_%", head: ["Podíl na HPH", "průmyslu 2025"], f: (v) => pct(v, 1), shade: "flat" },
      { key: "zmena_vyroby_2015_2025_%", head: ["Výroba", "2015 → 2025"], f: (v) => sgn(v) + " %", shade: "diverging" },
      { key: "TJ_mil_EUR_HPH", head: ["Energie", "TJ/mil. € HPH"], f: fmtTJ },
      { key: "energie_%_nakladu", head: ["Energie", "% nákladů"], f: (v) => pct(v, 1) },
      { key: "prace_%_nakladu", head: ["Práce", "% nákladů"], f: (v) => pct(v) },
      { key: "dovozni_penetrace_%", head: ["Dovozní", "penetrace"], f: (v) => pct(v) },
      { key: "dovoz_mimo_EU_%", head: ["z toho", "mimo EU"], f: (v) => pct(v) },
      { key: "vyvoz_mimo_oblast_ETS_%", head: ["Vývoz mimo", "oblast ETS"], f: (v) => pct(v) },
      { key: "prime_ETS_%HPH", head: ["Přímý náklad", "ETS, % HPH"], f: (v) => (Math.abs(v) < 0.05 ? "≈ 0" : sgn(v, 1) + " %"), shade: "value" },
    ];
    const { svg, W, H } = canvas(el);
    const lw = LW;
    const head = 70;
    const cw = (W - lw - 10) / cols.length;
    const y = rows(data.length, head, H, 0.1, Infinity);
    const red = d3.interpolateRgb("#fff3f5", C.energy);
    const blue = d3.interpolateRgb("#f0f7fd", C.core);
    cols.forEach((c, j) => {
      const cx = lw + 10 + j * cw + cw / 2;
      lines(svg, cx, 8, c.head, { anchor: "middle", size: FS.small, bold: true, color: C.grey, top: true });
      const vals = data.map((d) => +d[c.key]);
      const sorted = vals.slice().sort((a, b) => b - a);
      data.forEach((d, i) => {
        const v = +d[c.key];
        let t = 0;
        let fill;
        if (c.shade === "flat") fill = "#eef3f8";
        else if (c.shade === "diverging") fill = v >= 0 ? blue(Math.min(v / 76, 1)) : red(Math.min(-v / 30, 1));
        else if (c.shade === "value") { t = Math.max(v, 0) / d3.max(vals); fill = v > 0.05 ? red(t) : "white"; }
        else { t = 1 - sorted.indexOf(v) / (vals.length - 1); fill = red(t * 0.9); }
        if (c.shade === "diverging") t = Math.abs(v) / (v >= 0 ? 76 : 30);
        svg.append("rect").attr("x", lw + 10 + j * cw + 3).attr("y", y(i)).attr("width", cw - 6).attr("height", y.bandwidth()).attr("fill", fill);
        txt(svg, cx, y(i) + y.bandwidth() / 2, c.f(v), { anchor: "middle", size: FS.small, color: t > 0.6 ? "white" : C.text });
      });
    });
    data.forEach((d, i) => {
      const strong = group(d.NACE) === "energy";
      txt(svg, lw - 6, y(i) + y.bandwidth() / 2, d.obor, { anchor: "end", size: FS.small + 1, bold: strong, color: strong ? C.energy : C.text });
    });
  };

  // ── Start ────────────────────────────────────────────────────────────────
  // Text widths are measured for legends and labels, so wait for the fonts.
  Promise.all(["400 22px Roboto", "700 22px Roboto"].map((f) => document.fonts.load(f))).then(() => {
    document.querySelectorAll(".slide-chart[data-chart]").forEach((el) => {
      const draw = CHARTS[el.dataset.chart];
      if (!draw) return console.warn("Neznámý graf:", el.dataset.chart);
      Promise.resolve(draw(el)).catch((err) => console.error("Graf " + el.dataset.chart, err));
    });
  });
})();
