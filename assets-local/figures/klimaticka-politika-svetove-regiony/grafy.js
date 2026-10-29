/* Grafy explaineru „Jak se ke klimatické politice staví USA, Čína a Indie ve
 * srovnání s EU“ — d3 v podobě grafů z explaineru CBAM, s patičkou
 * „Zdroj / Stáhnout: PNG, SVG“ jako dashboard ETS.
 *
 * Markup: includes-local/chart-panel.html (one per chart, id = graf-*),
 * styles: assets-local/_chart-panel.scss, export: assets-local/js/chart-download.js.
 * Legends and unit captions are drawn inside the svg so the export keeps them.
 *
 * Data: assets-local/files/klimaticka-politika-svetove-regiony/*.csv — plain
 * extracts of the sources, filtered to the four regions; grouping and shares
 * are computed here. To refresh, re-export from the same source and keep the
 * column names:
 *   emise-ghg.csv       EDGAR 2026 booklet, GHG_totals_by_country and
 *                       GHG_per_capita_by_country, 1990–2025, incl. GLOBAL
 *                       TOTAL as "svet" (shares of world; per-capita population)
 *   emise-co2.csv       Our World in Data, owid-co2-data.csv (1950–2024),
 *                       only for the cumulative CO₂ share
 *   emise-sektory.csv   EDGAR 2026 booklet, GHG_by_sector_and_country, 2025
 *                       (gases without the GWP_100_AR5_ prefix)
 *   elektrina-mix.csv   Ember yearly_full_release_long_format.csv, generation
 *                       by fuel, both % and TWh
 *   kapacita.csv        Ember yearly_full_release_long_format.csv, capacity GW
 *                       by fuel (shares of the total are computed here)
 *   populace.csv        UN WPP 2024, population 1 July (mil.; 2024–25 medium
 *                       variant, EU = sum of the 27 members), for per capita
 *   elektromobily.csv   OWID grapher electric-car-sales-share (IEA GEVO 2026)
 *   elektrifikace.csv   IEA chart "Share of electricity in total final
 *                       consumption in selected countries and regions"
 *   investice.csv       BloombergNEF ETIT 2026 (2025 investment, $bn) and
 *                       IMF WEO nominal GDP 2025 ($bn) for the GDP share
 */
(function () {
  "use strict";
  if (typeof d3 === "undefined") return;

  const DIR = "/assets-local/files/klimaticka-politika-svetove-regiony/";

  // Region colours live in CSS (--region-* in assets-local/_chart-panel.scss),
  // shared with the region boxes in the text. Read at draw time, so the ?dev=1
  // sidebar can change them live; the hex is only a fallback.
  const rootStyle = getComputedStyle(document.documentElement);
  const varColor = (name, fallback) => rootStyle.getPropertyValue(name).trim() || fallback;
  const regionColor = (key, fallback) => varColor("--region-" + key, fallback);
  const REGIONS = [
    { key: "cina",  label: "Čína",  get color() { return regionColor("cina", "#e0495a"); } },
    { key: "usa",   label: "USA",   get color() { return regionColor("usa", "#3b85d8"); } },
    { key: "indie", label: "Indie", get color() { return regionColor("indie", "#8546af"); } },
    { key: "eu",    label: "EU",    long: "Evropská unie", get color() { return regionColor("eu", "#36369b"); } },
  ];
  // Small-multiple panels (areas, squares) in the article order.
  const PANEL_ORDER = ["eu", "usa", "cina", "indie"];
  const regionOf = key => REGIONS.find(x => x.key === key);
  const WORLD = { key: "svet", label: "Svět", color: "#9ba5ad", dashed: true };

  const C = {
    grid: "#edf2f7",
    axis: "#718096",
    title: "#2d3748",
    axisFontSize: 12,
    legendFontSize: 14,
  };

  // Electricity mix in four groups, bottom of the stack first; Ember's fuels
  // in `from`. Between them they cover all nine of Ember's fuels, so the
  // shares add up to 100 % with no remainder to show. Colours are CSS
  // variables (--mix-*) like the region ones, so the ?dev=1 sidebar tunes them.
  const MIX = [
    { key: "coal",    label: "Uhlí",                   get color() { return varColor("--mix-coal", "#914b64"); },
      from: ["Coal"] },
    { key: "fossil",  label: "Plyn a ostatní fosilní zdroje", get color() { return varColor("--mix-fossil", "#e29292"); },
      from: ["Gas", "Other Fossil"] },
    { key: "nuclear", label: "Jádro",                  get color() { return varColor("--mix-nuclear", "#a7cad3"); },
      from: ["Nuclear"] },
    { key: "oze",     label: "Obnovitelné zdroje",     get color() { return varColor("--mix-oze", "#008a94"); },
      from: ["Hydro", "Bioenergy", "Other Renewables", "Wind", "Solar"] },
  ];
  // Renewables by source, bottom of the stack first; the same groups split
  // both capacity and generation. Nuclear and fossil are not drawn
  // (`hidden`). Ember's few GW of "Other Renewables" (geothermal etc.) ride
  // with biomass.
  const CAPACITY = [
    { key: "hydro",   label: "Voda",                  color: "#a1bdcf", from: ["Hydro"] },
    { key: "wind",    label: "Vítr",                  color: "#237dde", from: ["Wind"] },
    { key: "solar",   label: "Slunce",                color: "#ffb32e", from: ["Solar"] },
    { key: "bio",     label: "Biomasa a ostatní OZE", color: "#ca851c", from: ["Bioenergy", "Other Renewables"] },
    { key: "nuclear", label: "Jádro",                 color: "#ebeef0", from: ["Nuclear"], hidden: true },
    { key: "fossil",  label: "Fosilní zdroje",        color: "#c5c8ca", from: ["Coal", "Gas", "Other Fossil"], hidden: true },
  ];

  // EDGAR sectors in the categories and palette of the FoK emission
  // infographics (fok-theme.js, colors.sectors). Fuel Production (refining,
  // fugitive emissions) goes to industry, as CRF 1.A.1.b/c and 1.B do in
  // data-analysis lib/R/emissions-utils.r. EDGAR has no remainder, so the
  // infographic's "Jiné" category would always be empty and is left out.
  const SECTORS = [
    { key: "energetika",  label: "Výroba elektřiny a tepla", color: "#f4465b", from: ["Power Industry"] },
    { key: "prumysl",     label: "Průmysl",                  color: "#3b3b93",
      from: ["Industrial Combustion", "Processes", "Fuel Production"] },
    { key: "doprava",     label: "Doprava",                  color: "#8546af", from: ["Transport"] },
    { key: "budovy",      label: "Budovy",                   color: "#0d80d8", from: ["Buildings"] },
    { key: "zemedelstvi", label: "Zemědělství",              color: "#00aa95", from: ["Agriculture"] },
    { key: "odpady",      label: "Odpadové hospodářství",    color: "#fab519", from: ["Waste"] },
  ];
  // Where each sector's square goes around the central one, as in the
  // infographic. Top and bottom read left to right, right reads top to bottom.
  const SQUARES_LAYOUT = {
    center: "energetika",
    top:    ["prumysl", "doprava"],
    right:  ["budovy", "zemedelstvi"],
    bottom: ["odpady"],
  };

  // Climate targets for the timeline. side: where the region's dots push to
  // and its notes go. A note is a list of [text, bold, italic] runs; the
  // chart has no title, the neutrality notes say what it shows. An interim
  // target (kind "dot") has a note in regular weight; `tip` adds a tooltip. Non-breaking
  // spaces keep "−55 %" and "v roce" in one piece when it wraps.
  const GOALS = [
    { region: "eu", side: "above", marks: [
      { year: 2030, kind: "dot", note: [["−55 %", true], [" emisí oproti 1990"]] },
      { year: 2040, kind: "dot", note: [["−90 %", true], [" emisí oproti 1990"]] },
      { year: 2050, kind: "neutral",
        note: [["EU", true], [" plánuje dosáhnout klimatické neutrality v\u00a0roce "], ["2050", true]] },
    ] },
    { region: "indie", side: "above", marks: [
      { year: 2070, kind: "neutral", note: [["Indie", true], [" v\u00a0roce "], ["2070", true]] },
    ] },
    { region: "usa", side: "below", marks: [
      { year: 2050, kind: "cancelled", note: [["USA", true], [" svůj cíl zrušily"]],
        tip: "Za Bidenovy administrativy byl cíl klimatické neutrality nastaven na rok 2050. Tento cíl " +
             "byl zrušen s nástupem Trumpa. Zrušeny byly i dílčí cíle −50–52 % emisí do roku 2030 " +
             "a −61–66 % do roku 2035 oproti roku 2005." },
    ] },
    { region: "cina", label: "Čína", short: "Čína", side: "below", marks: [
      { year: 2030, kind: "dot", note: [["zvrátit růst", true], [" emisí"]] },
      { year: 2035, kind: "dot", note: [["−7 až −10 %", true], [" oproti vrcholu emisí"]],
        tip: "−7 až −10 % emisí do roku 2035 oproti roku s maximálními hodnotami (pravděpodobně 2025 nebo 2026)" },
      { year: 2060, kind: "neutral", note: [["Čína", true], [" v\u00a0roce "], ["2060", true]] },
    ] },
  ];

  const locale = d3.formatLocale({ decimal: ",", thousands: " ", grouping: [3], currency: ["", ""] });
  const fmt = (v, d) => locale.format(`,.${d}f`)(v);
  const tickFmt = v => fmt(v, v % 1 ? 1 : 0);

  // ── Shared pieces ─────────────────────────────────────────────────────────

  const tip = d3.select("body").append("div").attr("class", "d3-tooltip");
  function showTip(ev, html) { tip.html(html).style("display", "block"); moveTip(ev); }
  function moveTip(ev) {
    const n = tip.node();
    tip.style("left", Math.min(ev.clientX + 14, window.innerWidth - n.offsetWidth - 8) + "px")
       .style("top", Math.max(ev.clientY - n.offsetHeight - 12, 8) + "px");
  }
  function hideTip() { tip.style("display", "none"); }
  const sw = color => `<span class="swatch" style="background:${color}"></span>`;

  // Legend as svg text, each label in its swatch's colour as in the CBAM
  // charts. Wraps to `width`; returns the height it took, gap included.
  function legend(svg, items, width) {
    const g = svg.append("g");
    const rowH = 20, gap = 14;
    let x = 0, y = 0;
    items.forEach(it => {
      const item = g.append("g");
      item.append("rect").attr("y", -10).attr("width", 12).attr("height", 12).attr("fill", it.color);
      const t = item.append("text").attr("x", 17)
        .attr("font-size", C.legendFontSize).attr("font-weight", 500)
        // Very light swatches would leave their label unreadable on white.
        .attr("fill", d3.lab(it.color).l > 75 ? d3.lab(it.color).darker(1.5) : it.color)
        .text(it.label);
      const w = 17 + t.node().getComputedTextLength();
      if (x > 0 && x + w > width) { x = 0; y += rowH; }
      item.attr("transform", `translate(${x},${y + 12})`);
      x += w + gap;
    });
    return y + rowH + 10;
  }

  // Bold unit caption over the plot, as in the CBAM charts, wrapped to the
  // width. Returns the height its extra lines add.
  function unitCaption(svg, text, y, width) {
    const t = svg.append("text").attr("x", 0).attr("y", y)
      .attr("font-size", 13).attr("font-weight", 700).attr("fill", C.axis);
    let line = t.append("tspan").attr("x", 0), lines = 1;
    text.split(" ").forEach(word => {
      const prev = line.text();
      line.text(prev ? prev + " " + word : word);
      if (prev && line.node().getComputedTextLength() > width) {
        line.text(prev);
        line = t.append("tspan").attr("x", 0).attr("dy", 16).text(word);
        lines += 1;
      }
    });
    return (lines - 1) * 16;
  }

  function axisText(sel) {
    return sel.attr("font-size", C.axisFontSize).attr("fill", C.axis);
  }

  // The unit right after the top tick label, on its grid line ("20 mld. t
  // CO₂eq"), over a box in the background colour that hides the grid and data
  // under it, as dataviz does (axis.yLabel, inline). Draw it after the data.
  function inlineUnit(g, y, ticks, text) {
    const box = g.append("rect").attr("fill", "#fff");
    const t = axisText(g.append("text")).attr("x", 0).attr("dx", "0.3em")
      .attr("y", y(d3.max(y.ticks(ticks)))).attr("dy", "0.32em").text(text);
    const b = t.node().getBBox();
    box.attr("x", b.x).attr("y", b.y).attr("width", b.width + 4).attr("height", b.height);
  }

  // Every chart's redraw, for the ?dev=1 sidebar after it changes a colour.
  const redraws = [];
  window.REGIONY_REDRAW = () => redraws.forEach(f => f());

  // Draws the chart now and again whenever the svg's width changes: on window
  // resize, and when the collapsed box holding it is opened (it has no width
  // until then). `draw(svg, width)` returns the height it needs.
  function mount(id, draw) {
    const el = document.getElementById(id + "-svg");
    if (!el) return () => {};
    let last = 0;
    // The layout width, not the bounding box: a sticky chart shrunk with a
    // transform (the ?dev=1 experiment) must still draw at full size.
    const width = () => el.parentNode.clientWidth;
    const redraw = () => {
      const w = width();
      if (!w) return;
      last = w;
      const svg = d3.select(el);
      svg.selectAll("*").remove();
      svg.attr("height", draw(svg, w));
      // A chart narrower than its panel (the waffle) ends its foot at the
      // chart's right edge, not the panel's.
      const b = el.getBBox(), gap = w - (b.x + b.width);
      foot.style.marginRight = gap > w / 10 ? gap + "px" : "";
    };
    const foot = el.parentNode.querySelector(".chart-foot");
    new ResizeObserver(() => {
      if (width() !== last) redraw();
    }).observe(el);
    // Text is measured for wrapping and placement; once the webfont is in,
    // measure again, or labels sized against the fallback font run long.
    document.fonts.ready.then(redraw);
    redraws.push(redraw);
    return redraw;
  }

  // Tab row above the svg, ETS dashboard style.
  function addSwitch(id, options, onChange) {
    const el = document.getElementById(id + "-svg");
    if (!el) return;
    const seg = d3.select(el.parentNode).insert("div", () => el).attr("class", "seg")
      .attr("role", "group");
    seg.selectAll("button").data(options).join("button")
      .attr("type", "button").text(d => d.label)
      .classed("active", (d, i) => i === 0)
      .attr("aria-pressed", (d, i) => String(i === 0))
      .on("click", function (ev, d) {
        seg.selectAll("button").classed("active", false).attr("aria-pressed", "false");
        d3.select(this).classed("active", true).attr("aria-pressed", "true");
        onChange(d.key);
      });
  }

  // ── Chart types ───────────────────────────────────────────────────────────

  // One panel per region, stacked areas over ONE shared y scale — panels that
  // auto-scale independently make the comparison meaningless.
  //   o.rows: Map region → [{year, <key>: value}]   o.keys: [{key, label, color}]
  //   (a single key with no colour takes the region's colour)
  //   o.square: plot area as tall as it is wide
  function smallMultiples(svg, width, o) {
    const multi = o.keys.length > 1;
    const top = multi ? legend(svg, o.keys, width) + 4 : 4;

    const cols = width >= 560 ? 4 : 2;
    // The left margin is the top tick label's width: that label starts flush
    // with the chart's left edge and the others end where it ends (d3 sets
    // them 3 px left of the plot). Ticks depend only on the niced domain.
    // ponytail: assumes the top label is the widest, true for counts from 0.
    const ticks = d3.scaleLinear().domain([0, o.yMax]).nice(4).ticks(4);
    // o.tickSuffix (" %"): the unit after every tick label instead of once on the top line.
    const tickLabel = o.tickSuffix ? v => tickFmt(v) + o.tickSuffix : tickFmt;
    const probe = axisText(svg.append("text")).text(tickLabel(d3.max(ticks)));
    const left = Math.ceil(probe.node().getComputedTextLength()) + 3;
    probe.remove();
    // titleH: the region name and room under it for the top tick label.
    const gapX = 16, titleH = 32, axisH = 22, rowGap = 14;
    const panelW = (width - left - gapX * (cols - 1)) / cols;
    const plotH = o.square ? panelW : cols === 4 ? 150 : 130;

    const years = o.rows.get(REGIONS[0].key).map(d => d.year);
    const x = d3.scaleLinear().domain(d3.extent(years)).range([0, panelW]);
    const y = d3.scaleLinear().domain([0, o.yMax]).range([plotH, 0]).nice(4);
    const stack = d3.stack().keys(o.keys.map(k => k.key));
    const area = d3.area().x(d => x(d.data.year)).y0(d => y(d[0])).y1(d => y(d[1]));

    PANEL_ORDER.map(regionOf).forEach((r, i) => {
      const col = i % cols, row = Math.floor(i / cols);
      const g = svg.append("g").attr("transform",
        `translate(${left + col * (panelW + gapX)},${top + row * (titleH + plotH + axisH + rowGap)})`);
      // The region in full (r.long); the first column's name starts at the
      // chart's left edge, over the tick labels.
      g.append("text").attr("x", col === 0 ? -left : 0).attr("y", 15).attr("font-size", 15).attr("font-weight", 700)
        .attr("fill", multi ? C.title : r.color).text(r.long || r.label);

      const p = g.append("g").attr("transform", `translate(0,${titleH})`);
      p.append("g").call(d3.axisLeft(y).ticks(4).tickSize(-panelW).tickFormat(col === 0 ? tickLabel : ""))
        .call(a => a.select(".domain").remove())
        .call(a => a.selectAll(".tick line").attr("stroke", C.grid))
        .call(a => axisText(a.selectAll(".tick text")));

      const data = o.rows.get(r.key);
      p.selectAll(".area").data(stack(data)).join("path")
        .attr("fill", (s, j) => o.keys[j].color || r.color)
        .attr("d", area);
      if (col === 0 && !o.tickSuffix) inlineUnit(p, y, 4, o.short);

      p.append("g").attr("transform", `translate(0,${plotH})`)
        .call(d3.axisBottom(x).tickValues(o.xTicks).tickFormat(d3.format("d")).tickSize(4))
        .call(a => a.select(".domain").attr("stroke", C.axis))
        .call(a => a.selectAll(".tick line").attr("stroke", C.axis))
        .call(a => axisText(a.selectAll(".tick text")))
        // The end years would run into the neighbouring panel's labels, so
        // they hang inwards from their ticks.
        .call(a => a.selectAll(".tick text").attr("text-anchor", (d, j, all) =>
          j === 0 ? "start" : j === all.length - 1 ? "end" : "middle"));

      const rule = p.append("line").attr("y1", 0).attr("y2", plotH)
        .attr("stroke", C.title).attr("stroke-width", 1).style("display", "none");
      p.append("rect").attr("width", panelW).attr("height", plotH).attr("fill", "transparent")
        .on("mousemove", ev => {
          const yr = Math.round(x.invert(d3.pointer(ev)[0]));
          const d = data.find(e => e.year === yr);
          if (!d) return;
          rule.style("display", null).attr("x1", x(yr)).attr("x2", x(yr));
          const lines = multi
            ? o.keys.slice().reverse().filter(k => d[k.key] > 0)
                .map(k => `${sw(k.color)}${k.label}: <strong>${fmt(d[k.key], o.decimals)} ${o.short}</strong>`)
            : [`${sw(r.color)}${fmt(d[o.keys[0].key], o.decimals)} ${o.short}`];
          showTip(ev, `<strong>${r.label}, ${yr}</strong><br>` + lines.join("<br>"));
        })
        .on("mouseleave", () => { rule.style("display", "none"); hideTip(); });
    });

    const rows = Math.ceil(REGIONS.length / cols);
    return top + rows * (titleH + plotH + axisH) + (rows - 1) * rowGap;
  }

  // Sector squares laid out as in the FoK infographic "Srovnání emisí
  // skleníkových plynů na obyvatele" (data-analysis, notebooks/
  // emissions-selected-countries.ipynb, make_squares_for_country): the centre
  // square at 0,0, the top row ending at its right edge, the right column
  // ending at its bottom edge, the bottom row starting at its left edge. A
  // square's AREA is proportional to its value, on one scale for all regions.
  //   o.rows: Map region → {<key>: value}   o.layout: SQUARES_LAYOUT
  function squares(svg, width, o) {
    // EXPERIMENT (?dev=1 sidebar, body class rg-squares-region): every square
    // of a region in the region's colour, fading sector by sector in the
    // legend's order. ponytail: the step is fixed at 15 %, 6 sectors fit.
    const byRegion = document.body.classList.contains("rg-squares-region");
    const strength = key => 1 - 0.15 * o.keys.findIndex(k => k.key === key);
    const shade = (base, key) => d3.interpolateRgb("#fff", base)(strength(key));
    const keys = byRegion ? o.keys.map(k => ({ ...k, color: shade(C.title, k.key) })) : o.keys;
    let top = legend(svg, keys, width);
    top += 40 + unitCaption(svg, o.unit, top + 13, width);

    const GAP = 2, PAD = 8, VALUE_SIZE = 12, NAME_SIZE = 13, TOTAL_SIZE = 26;
    const color = (key, r) => byRegion ? shade(r.color, key) : o.keys.find(k => k.key === key).color;
    const total = r => d3.sum(o.keys, k => o.rows.get(r.key)[k.key]);
    const regions = PANEL_ORDER.map(regionOf);
    const maxValue = d3.max(regions, r => d3.max(o.keys, k => o.rows.get(r.key)[k.key]));

    // Square positions for one region at `side` px for the largest value.
    // y grows down; the centre square's top-left corner is the origin.
    function place(row, side) {
      const size = v => Math.sqrt(Math.max(0, v) / maxValue) * side;
      const wc = size(row[o.layout.center]);
      const out = [{ key: o.layout.center, x: 0, y: 0, w: wc, pos: "center" }];
      let x = wc;
      o.layout.top.slice().reverse().forEach(key => {
        const w = size(row[key]);
        x -= w;
        out.push({ key, x, y: -GAP - w, w, pos: "top" });
        x -= GAP;
      });
      let y = wc;
      o.layout.right.slice().reverse().forEach(key => {
        const w = size(row[key]);
        y -= w;
        out.push({ key, x: wc + GAP, y, w, pos: "right" });
        y -= GAP;
      });
      x = 0;
      o.layout.bottom.forEach(key => {
        const w = size(row[key]);
        if (!w) return;
        out.push({ key, x, y: wc + GAP, w, pos: "bottom" });
        x += w + GAP;
      });
      return out;
    }

    const widths = new Map();   // measured once per text and size
    function textWidth(text, size) {
      const id = size + "|" + text;
      if (!widths.has(id)) {
        const t = svg.append("text").attr("font-size", size).attr("font-weight", 700).text(text);
        widths.set(id, t.node().getComputedTextLength());
        t.remove();
      }
      return widths.get(id);
    }
    const labelW = d3.max(regions, r =>
      Math.max(textWidth(r.label.toUpperCase(), NAME_SIZE), textWidth(fmt(total(r), 1), TOTAL_SIZE)));
    const labelH = NAME_SIZE + 6 + TOTAL_SIZE;
    const valueText = (r, s) => fmt(o.rows.get(r.key)[s.key], 1);
    const fitsInside = (s, text) => s.w >= textWidth(text, VALUE_SIZE) + 8 && s.w >= VALUE_SIZE + 8;

    // Left of the centre square sits the name and total, unless the top row
    // reaches further left (it runs above the label, so they do not clash).
    // On the right, a value written beside a small square counts too.
    const extent = (r, sq) => {
      const left = Math.max(-d3.min(sq, s => s.x), labelW + PAD);
      const right = d3.max(sq, s => {
        const text = valueText(r, s);
        return s.x + s.w + (s.pos !== "top" && !fitsInside(s, text) ? 4 + textWidth(text, VALUE_SIZE) : 0);
      });
      return { left, width: left + right };
    };

    // All regions in one row when there is room for it, two per row on a
    // phone. Each region takes the width it needs, not an equal column.
    const perRow = width >= 560 ? regions.length : 2;
    const rows = d3.range(0, regions.length, perRow).map(i => regions.slice(i, i + perRow));
    const MIN_GAP = 16;
    // Largest side that still fits every row into the width; capped so a
    // wide screen does not blow the squares up.
    let lo = 10, hi = 170;
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      const fits = rows.every(row => d3.sum(row, r => extent(r, place(o.rows.get(r.key), mid)).width)
        + MIN_GAP * (row.length - 1) <= width);
      if (fits) lo = mid; else hi = mid;
    }
    const side = lo;

    let y0 = top;
    rows.forEach((regs, i) => {
      const row = regs.map(r => ({ r, sq: place(o.rows.get(r.key), side) }));
      row.forEach(d => { d.ext = extent(d.r, d.sq); });
      const above = d3.max(row, d => -d3.min(d.sq, s => s.y)) + VALUE_SIZE + 4;
      const below = d3.max(row, d => Math.max(d3.max(d.sq, s => s.y + s.w), labelH));
      // Spare width goes evenly around the regions.
      const spare = (width - d3.sum(row, d => d.ext.width)) / row.length;
      let x0 = spare / 2;
      row.forEach(d => {
        const g = svg.append("g").attr("transform", `translate(${x0 + d.ext.left},${y0 + above})`);
        x0 += d.ext.width + spare;
        const sum = total(d.r);

        g.append("text").attr("x", -PAD).attr("y", NAME_SIZE).attr("text-anchor", "end")
          .attr("font-size", NAME_SIZE).attr("font-weight", 700).attr("fill", C.title)
          .text(d.r.label.toUpperCase());
        g.append("text").attr("x", -PAD).attr("y", NAME_SIZE + 6 + TOTAL_SIZE * 0.8).attr("text-anchor", "end")
          .attr("font-size", TOTAL_SIZE).attr("font-weight", 700).attr("fill", C.title)
          .text(fmt(sum, 1));

        d.sq.forEach(s => {
          const v = o.rows.get(d.r.key)[s.key], c = color(s.key, d.r);
          // Text beside a square takes the full colour, a pale shade would not read.
          const ink = byRegion ? d.r.color : c;
          const label = o.keys.find(k => k.key === s.key).label;
          g.append("rect").attr("x", s.x).attr("y", s.y).attr("width", s.w).attr("height", s.w)
            .attr("fill", c)
            .on("mousemove", ev => showTip(ev, `<strong>${d.r.label}</strong><br>${sw(c)}${label}: ` +
              `<strong>${fmt(v, 2)} ${o.short}</strong> (${fmt(v / sum * 100, 0)} %)`))
            .on("mouseleave", hideTip);

          // The value sits in the square's inner corner when it fits there,
          // otherwise beside the square in its colour, as in the infographic.
          const text = valueText(d.r, s);
          const inside = fitsInside(s, text);
          const t = g.append("text").attr("font-size", VALUE_SIZE).attr("font-weight", 500)
            .attr("pointer-events", "none").text(text);
          if (inside) {
            t.attr("fill", byRegion && strength(s.key) < 0.55 ? d.r.color : "#fff").attr("text-anchor", "end").attr("x", s.x + s.w - 4)
              .attr("y", s.pos === "bottom" ? s.y + VALUE_SIZE + 2 : s.y + s.w - 4);
          } else if (s.pos === "top") {
            t.attr("fill", ink).attr("text-anchor", "end").attr("x", s.x + s.w).attr("y", s.y - 4);
          } else {
            t.attr("fill", ink).attr("x", s.x + s.w + 4)
              .attr("y", s.pos === "bottom" ? s.y + VALUE_SIZE : s.y + s.w - 2);
          }
        });
      });
      y0 += above + below + (i < rows.length - 1 ? 28 : 0);
    });
    return y0;
  }

  // Line per series, labelled at its end instead of a legend.
  //   o.series: [{key, label, color, dashed?, values: [{year, v}]}]
  function lines(svg, width, o) {
    const mg = { top: 12, right: 56, bottom: 24, left: 34 };
    const H = width >= 560 ? 300 : 240;
    const W = width - mg.left - mg.right;
    const g = svg.append("g").attr("transform", `translate(${mg.left},${mg.top})`);
    const all = o.series.flatMap(s => s.values);
    const x = d3.scaleLinear().domain(d3.extent(all, d => d.year)).range([0, W]);
    const y = d3.scaleLinear().domain([0, d3.max(all, d => d.v)]).range([H, 0]).nice(5);

    g.append("g").call(d3.axisLeft(y).ticks(5).tickSize(-W).tickFormat(tickFmt))
      .call(a => a.select(".domain").remove())
      .call(a => a.selectAll(".tick line").attr("stroke", C.grid))
      .call(a => axisText(a.selectAll(".tick text")));
    g.append("g").attr("transform", `translate(0,${H})`)
      .call(d3.axisBottom(x).tickValues(o.xTicks).tickFormat(d3.format("d")).tickSize(4))
      .call(a => a.select(".domain").attr("stroke", C.axis))
      .call(a => a.selectAll(".tick line").attr("stroke", C.axis))
      .call(a => axisText(a.selectAll(".tick text")));

    const line = d3.line().x(d => x(d.year)).y(d => y(d.v));
    o.series.forEach(s => {
      g.append("path").datum(s.values).attr("fill", "none")
        .attr("stroke", s.color).attr("stroke-width", 2.5)
        .attr("stroke-dasharray", s.dashed ? "5 4" : null).attr("d", line);
    });

    // End labels, pushed apart where the lines finish close together.
    const ends = o.series.map(s => ({ s, y: y(s.values[s.values.length - 1].v) }))
      .sort((a, b) => a.y - b.y);
    ends.forEach((e, i) => { if (i && e.y - ends[i - 1].y < 15) e.y = ends[i - 1].y + 15; });
    ends.forEach(e => g.append("text").attr("x", W + 6).attr("y", e.y).attr("dy", "0.35em")
      .attr("font-size", 13).attr("font-weight", 700).attr("fill", e.s.color).text(e.s.label));
    inlineUnit(g, y, 5, o.short);

    const rule = g.append("line").attr("y1", 0).attr("y2", H)
      .attr("stroke", C.title).attr("stroke-width", 1).style("display", "none");
    g.append("rect").attr("width", W).attr("height", H).attr("fill", "transparent")
      .on("mousemove", ev => {
        const yr = Math.round(x.invert(d3.pointer(ev)[0]));
        rule.style("display", null).attr("x1", x(yr)).attr("x2", x(yr));
        const rows = o.series.map(s => [s, s.values.find(d => d.year === yr)]).filter(([, d]) => d)
          .sort((a, b) => b[1].v - a[1].v)
          .map(([s, d]) => `${sw(s.color)}${s.label}: <strong>${fmt(d.v, o.decimals)} ${o.short}</strong>`);
        showTip(ev, `<strong>${yr}</strong><br>` + rows.join("<br>"));
      })
      .on("mouseleave", () => { rule.style("display", "none"); hideTip(); });

    return mg.top + H + mg.bottom;
  }

  // Horizontal bars, largest first, value at the end of each.
  //   o.rows: [{region, v}]
  function bars(svg, width, o) {
    const top = 26 + unitCaption(svg, o.unit, 13, width), labelW = 52, barH = 30, gap = 12, valueW = 64;
    const rows = o.rows.slice().sort((a, b) => b.v - a.v);
    const x = d3.scaleLinear().domain([0, d3.max(rows, d => d.v)]).range([0, width - labelW - valueW]);
    rows.forEach((d, i) => {
      const g = svg.append("g").attr("transform", `translate(0,${top + i * (barH + gap)})`);
      g.append("text").attr("y", barH / 2).attr("dy", "0.35em")
        .attr("font-size", 15).attr("font-weight", 700).attr("fill", d.region.color).text(d.region.label);
      g.append("rect").attr("x", labelW).attr("width", x(d.v)).attr("height", barH).attr("fill", d.region.color);
      g.append("text").attr("x", labelW + x(d.v) + 6).attr("y", barH / 2).attr("dy", "0.35em")
        .attr("font-size", 14).attr("font-weight", 700).attr("fill", d.region.color)
        .text(fmt(d.v, o.decimals) + " " + o.short);
    });
    return top + rows.length * (barH + gap) - gap;
  }

  // Rounds shares to whole units summing to exactly `total`: floor everything,
  // then hand the rest out by largest remainder.
  function largestRemainder(values, total) {
    const sum = d3.sum(values);
    const exact = values.map(v => v / sum * total);
    const out = exact.map(Math.floor);
    d3.range(values.length).sort((a, b) => (exact[b] - out[b]) - (exact[a] - out[a]))
      .slice(0, total - d3.sum(out)).forEach(i => { out[i] += 1; });
    return out;
  }

  // Waffle: a 4-row grid, one square per percent of the world. The regions
  // follow one another with no gap, column by column from the left, each
  // column filled top-down; the last block (rest of the world) carries on
  // the same sequence, shifted right past an empty column. Name and share sit under the column a
  // block starts in, nudged sideways where narrow regions would collide.
  //   o.rows: [{region, value, share}]
  function waffle(svg, width, o) {
    const top = o.unit ? 26 + unitCaption(svg, o.unit, 13, width) : 0;
    const ROWS = 4, COLS = 25, NAME_SIZE = 15, LABEL_GAP = 12, SQUARE_GAP = 2, REST_GAP_COLS = 1;
    const cell = width * 0.8 * 0.8 / COLS;   // 4/5 of the width for 4 × 25, scaled down to 0.8
    const counts = largestRemainder(o.rows.map(d => d.share), ROWS * COLS);
    let first = 0;
    const blocks = o.rows.map((d, i) => {
      // Same row offset as where the previous block stopped, just moved past
      // an empty column, so the sequence reads on rather than restarting.
      if (i === o.rows.length - 1) first += (REST_GAP_COLS + (first % ROWS ? 1 : 0)) * ROWS;
      const b = { ...d, first, n: counts[i] };
      first += counts[i];
      return b;
    });
    const measure = (text, weight) => {
      const t = svg.append("text").attr("font-size", NAME_SIZE).attr("font-weight", weight).text(text);
      const w = t.node().getComputedTextLength();
      t.remove();
      return w;
    };

    // Labels: at their start column, pushed right past the previous one, then
    // pulled back left from the edge. ponytail: on a very narrow screen the
    // five labels may still not fit side by side; stack them if that matters.
    blocks.forEach(b => {
      b.labelW = Math.max(measure(b.region.label, 700), measure(fmt(b.share, 1) + " %", 400));
      b.labelX = Math.floor(b.first / ROWS) * cell;
    });
    blocks.forEach((b, i) => {
      if (i) b.labelX = Math.max(b.labelX, blocks[i - 1].labelX + blocks[i - 1].labelW + LABEL_GAP);
    });
    for (let i = blocks.length - 1; i >= 0; i--) {
      const limit = i === blocks.length - 1 ? width : blocks[i + 1].labelX - LABEL_GAP;
      blocks[i].labelX = Math.min(blocks[i].labelX, limit - blocks[i].labelW);
    }

    const g = svg.append("g").attr("transform", `translate(0,${top})`);
    blocks.forEach(b => {
      const textColor = d3.lab(b.region.color).l > 75 ? d3.lab(b.region.color).darker(1.5) : b.region.color;
      g.append("g").selectAll("rect").data(d3.range(b.first, b.first + b.n)).join("rect")
        .attr("x", k => Math.floor(k / ROWS) * cell)
        .attr("y", k => (k % ROWS) * cell)
        .attr("width", cell - SQUARE_GAP).attr("height", cell - SQUARE_GAP)
        .attr("fill", b.region.color)
        .on("mousemove", ev => showTip(ev, `${sw(b.region.color)}<strong>${b.region.label}</strong>: ` +
          `${fmt(b.share, 1)} % (${fmt(b.value, 0)} ${o.short})`))
        .on("mouseleave", hideTip);
      g.append("text").attr("x", b.labelX).attr("y", ROWS * cell + 6 + NAME_SIZE)
        .attr("font-size", NAME_SIZE).attr("font-weight", 700).attr("fill", textColor)
        .text(b.region.label);
      g.append("text").attr("x", b.labelX).attr("y", ROWS * cell + 6 + NAME_SIZE * 2 + 4)
        .attr("font-size", NAME_SIZE).attr("font-weight", 400).attr("fill", textColor)
        .text(fmt(b.share, 1) + " %");
    });
    return top + ROWS * cell + 6 + NAME_SIZE * 2 + 8;
  }

  // Climate targets on one time line, no arrows: a large dot for each
  // region's climate-neutrality year with its note right at it (the chart has
  // no title, the notes say it), the same dot with a × for a cancelled target,
  // and a small dot with a regular-weight note for each interim target. EU and India
  // sit above the line, China and USA below; a dot below moves down off one
  // above of the same year. Notes are laid out from the right: each wraps to
  // end before the next on its side, and one that still does not fit (narrow
  // screens) moves a level away from the line, with a thin leader. Years
  // under it all.
  function timeline(svg, width, goals) {
    // Interim notes: regular, at the size of the source line under the chart.
    const NOTE = parseFloat(getComputedStyle(svg.node().parentNode.querySelector(".chart-foot")).fontSize) || 13;
    const LABEL = 15, LINE_H = 16, LEVEL_GAP = 6, R = 8.8, r = 4.5;
    // Interim dot style, an experiment in the ?dev=1 sidebar: filled (default),
    // ring, tick or diamond, as a body class.
    const dotStyle = ["ring", "tick", "diamond"].find(k => document.body.classList.contains("rg-dot-" + k));
    const NOTE_MIN = 40, NOTE_MAX = 140, LABEL_MAX = 230, PAD = 8, NOTE_GAP = 4;
    // Large dot to its label; the ?dev=1 sidebar tunes it.
    const LABEL_GAP = parseFloat(varColor("--timeline-label-gap", "6"));
    const narrow = width < 560;

    // A run's `bold`: true (700), a weight, or none (400).
    const fw = bold => bold === true ? 700 : bold || 400;
    const widths = new Map();
    const measure = (t, size, bold, italic) => {
      const id = [t, size, bold, italic].join("|");
      if (!widths.has(id)) {
        // white-space: pre, or SVG drops a word's trailing space from the
        // measurement and every wrapped line comes out a few px too long.
        const el = svg.append("text").attr("font-size", size).attr("font-weight", fw(bold))
          .attr("font-style", italic ? "italic" : null).style("white-space", "pre").text(t);
        widths.set(id, el.node().getComputedTextLength());
        el.remove();
      }
      return widths.get(id);
    };

    // Greedy word wrap over styled runs; breaks only at plain spaces.
    function wrap(runs, maxW, size) {
      const words = runs.flatMap(([t, bold, italic]) =>
        t.split(/(?<= )/).map(w => ({ t: w, bold, italic })));
      const lines = [[]];
      let w = 0;
      words.forEach(word => {
        const ww = measure(word.t, size, word.bold, word.italic);
        if (w + ww > maxW && lines[lines.length - 1].length) {
          lines.push([]);
          w = 0;
          word = { ...word, t: word.t.replace(/^ /, "") };
        }
        lines[lines.length - 1].push(word);
        w += ww;
      });
      return { lines, w: d3.max(lines, l => d3.sum(l, x => measure(x.t.trimEnd(), size, x.bold, x.italic))) };
    }
    function drawRuns(g, line, x, y, color, anchor, size) {
      const t = g.append("text").attr("x", x).attr("y", y).attr("font-size", size).attr("fill", color)
        .attr("text-anchor", anchor);
      line.forEach(word => t.append("tspan").attr("font-weight", fw(word.bold))
        .attr("font-style", word.italic ? "italic" : null).text(word.t));
    }

    const x = d3.scaleLinear().domain([2028, 2072]).range([R + 4, width - R - 4]);
    const marks = goals.flatMap(gl => gl.marks.map(m => ({
      ...m, side: gl.side, color: regionOf(gl.region).color, cx: x(m.year), rad: m.kind === "dot" ? r : R, dy: 0,
    })));

    // Dots of the same year: the one above stays on the line, the one below
    // moves down until they no longer touch.
    marks.forEach(a => marks.forEach(b => {
      const d = a.rad + b.rad + 3, dx = Math.abs(a.cx - b.cx);
      if (a.side === "below" && b.side === "above" && dx < d) a.dy = Math.max(a.dy, Math.sqrt(d * d - dx * dx));
    }));

    // Horizontal: right to left per side. A note starts at its dot's left edge
    // (or ends at its right edge where it would run off the chart) and wraps to
    // end before the next note; it takes the level nearest the line where it
    // fits, and its leader reserves a corridor on the levels it crosses.
    const extent = {};
    ["above", "below"].forEach(side => {
      const occ = [];
      const free = (k, [a, b]) => !(occ[k] || []).some(([c, d]) => c < b && a < d);
      let limit = width;   // left edge of the nearest level-0 label to the right
      const placed = marks.filter(m => m.side === side).sort((a, b) => b.cx - a.cx);
      placed.forEach(m => {
        let k = 0;
        const big = m.kind !== "dot";
        m.size = big ? LABEL : NOTE;
        const runs = big ? m.note : m.note.map(([t]) => [t, false]);
        const maxW = big ? LABEL_MAX : NOTE_MAX, room = limit - PAD - (m.cx - m.rad);
        // Squeezed by the chart's right edge (not by another note): end at the
        // dot's right edge instead, with the room on the left.
        const end = limit === width && room < Math.min(maxW, wrap(runs, Infinity, m.size).w);
        // ponytail: an end-aligned note takes at most a quarter of the width, so
        // on a phone it wraps rather than squeezing the notes to its left.
        m.wrapped = wrap(runs, Math.max(NOTE_MIN, Math.min(maxW, end ? width / 4 : room)), m.size);
        m.align = end ? "end" : "start";
        m.x0 = end ? m.cx + m.rad - m.wrapped.w : m.cx - m.rad;
        const span = [m.x0, m.x0 + m.wrapped.w + PAD], corridor = [m.cx - 3, m.cx + 3];
        while (!free(k, span) || d3.range(k).some(j => !free(j, corridor))) k++;
        d3.range(k).forEach(j => (occ[j] = occ[j] || []).push(corridor));
        m.level = k;
        m.h = m.wrapped.lines.length * LINE_H;
        (occ[k] = occ[k] || []).push([m.x0, m.x0 + m.wrapped.w + PAD]);
        if (!k) limit = Math.min(limit, m.x0);
      });
      // Vertical: level 0 hugs its own dot, each further level clears the one before.
      const ext = [];
      d3.range(d3.max(placed, m => m.level) + 1).forEach(k => placed.filter(m => m.level === k).forEach(m => {
        m.inner = k ? ext[k - 1] + LEVEL_GAP : m.dy + m.rad + (m.kind === "dot" ? NOTE_GAP : LABEL_GAP);
        ext[k] = Math.max(ext[k] || 0, m.inner + m.h);
      }));
      extent[side] = d3.max(ext) || 0;
    });

    const lineY = extent.above + 4;
    svg.append("line").attr("x1", 0).attr("x2", width).attr("y1", lineY).attr("y2", lineY)
      .attr("stroke", "#8a94a3").attr("stroke-width", 1.5);

    // Years under everything, ticks without an axis line; the ticks repeat on the line.
    const axisY = lineY + extent.below + 16;
    [2030, 2040, 2050, 2060, 2070].forEach(yr => {
      svg.append("line").attr("x1", x(yr)).attr("x2", x(yr)).attr("y1", lineY - 4).attr("y2", lineY + 4)
        .attr("stroke", "#8a94a3").attr("stroke-width", 1.5);
      svg.append("line").attr("x1", x(yr)).attr("x2", x(yr)).attr("y1", axisY).attr("y2", axisY + 5)
        .attr("stroke", C.axis).attr("stroke-width", 1);
      svg.append("text").attr("x", x(yr)).attr("y", axisY + 19).attr("text-anchor", "middle")
        .attr("font-size", C.axisFontSize + 1).attr("fill", C.axis).text(yr);
    });

    marks.forEach(m => {
      const g = svg.append("g"), c = m.color, up = m.side === "above" ? -1 : 1;
      const cy = lineY + up * m.dy;
      if (m.kind !== "dot" || !dotStyle) {
        g.append("circle").attr("cx", m.cx).attr("cy", cy).attr("r", m.rad)
          .attr("fill", c).attr("stroke", "#fff").attr("stroke-width", m.kind === "dot" ? 4 : 3)
          .attr("paint-order", "stroke");
      } else if (dotStyle === "ring") {
        g.append("circle").attr("cx", m.cx).attr("cy", cy).attr("r", m.rad)
          .attr("fill", "#fff").attr("stroke", c).attr("stroke-width", 2);
      } else if (dotStyle === "tick") {
        g.append("line").attr("x1", m.cx).attr("x2", m.cx).attr("y1", cy - 7).attr("y2", cy + 7)
          .attr("stroke", c).attr("stroke-width", 2.5).attr("stroke-linecap", "round");
      } else {
        const d = m.rad + 1;
        g.append("path").attr("d", `M${m.cx},${cy - d}L${m.cx + d},${cy}L${m.cx},${cy + d}L${m.cx - d},${cy}Z`)
          .attr("fill", c).attr("stroke", "#fff").attr("stroke-width", 2).attr("paint-order", "stroke");
      }
      // A cancelled target: the same dot with a white × in it.
      if (m.kind === "cancelled") {
        const k = m.rad * 0.42;
        g.append("path").attr("d", `M${m.cx - k},${cy - k}L${m.cx + k},${cy + k}M${m.cx + k},${cy - k}L${m.cx - k},${cy + k}`)
          .attr("stroke", "#fff").attr("stroke-width", 1.8).attr("stroke-linecap", "round");
      }
      if (m.tip) g.style("cursor", "default").on("mousemove", ev => showTip(ev, m.tip)).on("mouseleave", hideTip);

      // Baselines: lines stack away from the line, the first one nearest it.
      const inner = lineY + up * m.inner, n = m.wrapped.lines.length;
      const baseline = i => up < 0 ? inner - 3 - (n - 1 - i) * LINE_H : inner + m.size - 2 + i * LINE_H;
      const tx = m.align === "end" ? m.x0 + m.wrapped.w : m.x0;
      m.wrapped.lines.forEach((line, i) => drawRuns(g, line, tx, baseline(i), c, m.align, m.size));
      if (m.level) {
        g.append("line").attr("x1", m.cx).attr("x2", m.cx)
          .attr("y1", cy + up * (m.rad + 2)).attr("y2", inner - up * 2)
          .attr("stroke", c).attr("stroke-width", 1);
      }
    });

    return axisY + 24;
  }

  // ── Data → charts ─────────────────────────────────────────────────────────

  mount("graf-cile", (svg, w) => timeline(svg, w, GOALS));

  const region = key => REGIONS.find(r => r.key === key) || WORLD;

  // Groups long rows (region, year, <source>, <value>) into one object per
  // region and year with a field per group in `groups`, missing ones as 0.
  function byYear(raw, groups, sourceCol, valueCol) {
    const lookup = new Map(groups.flatMap(gr => gr.from.map(f => [f, gr.key])));
    const out = new Map();
    d3.group(raw, d => d.region).forEach((rows, reg) => {
      const years = new Map();
      rows.forEach(d => {
        const yr = +d.year;
        if (!years.has(yr)) years.set(yr, Object.fromEntries([["year", yr], ...groups.map(gr => [gr.key, 0])]));
        const key = lookup.get(d[sourceCol]);
        if (key) years.get(yr)[key] += +d[valueCol];
      });
      out.set(reg, [...years.values()].sort((a, b) => a.year - b.year));
    });
    return out;
  }

  const csv = name => d3.csv(DIR + name);   // rows stay strings; no autoType

  // Podíl na světových emisích — EDGAR's GLOBAL TOTAL includes international
  // aviation and shipping, which therefore count to the rest of the world.
  csv("emise-ghg.csv").then(raw => {
    const total = key => +raw.find(d => d.region === key && d.year === "2025").ghg_mt;
    const world = total("svet");
    const rows = REGIONS.map(r => ({ region: r, value: total(r.key) }))
      .sort((a, b) => b.value - a.value);
    rows.push({ region: { key: "zbytek", label: "Zbytek světa", color: "#b5b8bd" },
                value: world - d3.sum(rows, d => d.value) });
    rows.forEach(d => { d.share = d.value / world * 100; });
    mount("graf-podil", (svg, w) => waffle(svg, w, {
      rows, short: "Mt CO₂eq", unit: "Podíl Číny, USA, Indie a EU na globálních emisích skleníkových plynů v roce 2025",
    }));
  });

  // Emise skleníkových plynů (EDGAR, CO₂eq) — total, per capita and by sector.
  // The cumulative share is CO₂ only (OWID): summing CO₂eq over centuries
  // would count long-gone methane in full. Views that differ from the markup
  // carry their own title and source, swapped above and below the chart (the
  // PNG/SVG export reads them live), so the change of gas is never silent.
  Promise.all([csv("emise-ghg.csv"), csv("emise-co2.csv"), csv("emise-sektory.csv")])
    .then(([ghg, co2, sectorRaw]) => {
    const perCapita = ghg.filter(d => d.year === "2025");
    // Emise podle sektorů na obyvatele — all gases summed per sector. The
    // population is EDGAR's own (its total over its per-capita figure), so the
    // regions' totals here match the per-capita numbers EDGAR publishes.
    const population = new Map(perCapita.map(d => [d.region, d.ghg_mt / d.ghg_per_capita_t]));
    const lookup = new Map(SECTORS.flatMap(s => s.from.map(f => [f, s.key])));
    const sectorRows = new Map();
    d3.group(sectorRaw, d => d.region).forEach((rr, reg) => {
      const sums = Object.fromEntries(SECTORS.map(s => [s.key, 0]));
      rr.forEach(d => {
        const key = lookup.get(d.sector);
        if (key) sums[key] += +d.mt_co2eq;
        else console.warn("emise-sektory.csv: neznámý sektor", d.sector);
      });
      sectorRows.set(reg, Object.fromEntries(SECTORS.map(s => [s.key, sums[s.key] / population.get(reg)])));
    });

    const METRICS = {
      total:     { label: "Celkové emise", data: ghg, col: "ghg_mt", k: 1 / 1000, decimals: 2, short: "mld. t CO₂eq" },
      perCapita: { label: "Na obyvatele", data: ghg, col: "ghg_per_capita_t", k: 1, decimals: 1, short: "t CO₂eq na obyv." },
      sectors:   { label: "Sektory na obyvatele",
                   title: "Emise skleníkových plynů na obyvatele podle sektorů v roce 2025" },
      cumShare:  { label: "Historický podíl CO₂", data: co2, col: "share_cumulative_pct", k: 1, decimals: 1, short: "%",
                   title: "Podíl na kumulativních emisích CO₂ od roku 1750 (jen CO₂, bez ostatních plynů)",
                   source: '<a href="https://ourworldindata.org/co2-emissions-metrics">Our World in Data</a> (Global Carbon Budget)' },
    };
    const titleEl = document.getElementById("graf-emise-title");
    const sourceEl = document.getElementById("graf-emise-source");
    const base = { title: titleEl?.textContent, source: sourceEl?.innerHTML };
    let metric = "total", draw = () => {};
    addSwitch("graf-emise", Object.entries(METRICS).map(([key, m]) => ({ key, label: m.label })),
      key => {
        metric = key;
        if (titleEl) titleEl.textContent = METRICS[key].title || base.title;
        if (sourceEl) sourceEl.innerHTML = METRICS[key].source ? "Zdroj: " + METRICS[key].source : base.source;
        draw();
      });
    draw = mount("graf-emise", (svg, w) => {
      if (metric === "sectors") return squares(svg, w, {
        keys: SECTORS, rows: sectorRows, layout: SQUARES_LAYOUT, short: "t CO₂eq",
        unit: "Tuny CO₂eq na obyvatele (bez lesnictví a využití půdy)",
      });
      const m = METRICS[metric];
      const rows = new Map();
      d3.group(m.data, d => d.region).forEach((rr, reg) => {
        if (regionOf(reg)) rows.set(reg, rr.filter(d => +d.year >= 1990).map(d => ({ year: +d.year, v: +d[m.col] * m.k })));
      });
      return smallMultiples(svg, w, {
        keys: [{ key: "v" }], rows, short: m.short, decimals: m.decimals,
        yMax: d3.max([...rows.values()].flat(), d => d.v), xTicks: [1990, 2010, d3.max(m.data, d => +d.year)],
      });
    });
  });

  // Mix výroby elektřiny — shares or TWh straight from Ember, and TWh per
  // inhabitant (UN WPP population, as for the renewables chart).
  Promise.all([csv("elektrina-mix.csv"), csv("populace.csv")]).then(([raw, popRaw]) => {
    const METRICS = {
      share:     { label: "Podíl", col: "share_pct", decimals: 1, short: "%", tickSuffix: "\u00a0%" },
      twh:       { label: "Výroba", col: "twh", decimals: 0, short: "TWh" },
      perCapita: { label: "Na obyvatele", decimals: 1, short: "MWh na obyv." },
    };
    const rows = { share: byYear(raw, MIX, "source", "share_pct"), twh: byYear(raw, MIX, "source", "twh") };
    // TWh / mil. obyvatel = MWh na obyvatele.
    const pop = new Map(popRaw.map(d => [d.region + d.year, +d.population_mil]));
    rows.perCapita = new Map([...rows.twh].map(([reg, years]) => [reg, years.map(d =>
      Object.fromEntries([["year", d.year], ...MIX.map(k => [k.key, d[k.key] / pop.get(reg + d.year)])]))]));
    // Shares stack to 100; the others share one scale up to the largest total.
    const stackMax = r => d3.max([...r.values()].flat(), d => d3.sum(MIX, k => d[k.key]));
    const yMax = { share: 100, twh: stackMax(rows.twh), perCapita: stackMax(rows.perCapita) };
    let metric = "share", draw = () => {};
    addSwitch("graf-mix", Object.entries(METRICS).map(([key, m]) => ({ key, label: m.label })),
      key => { metric = key; draw(); });
    draw = mount("graf-mix", (svg, w) => smallMultiples(svg, w, {
      ...METRICS[metric], keys: MIX, rows: rows[metric], yMax: yMax[metric], xTicks: [2000, 2010, 2025],
      square: true,
    }));
  });

  // Rozvoj obnovitelných zdrojů — capacity (GW, per capita), generation (TWh) and
  // its share. Not the share of capacity: that counts idle
  // peakers and reserve plants alongside running ones.
  Promise.all([csv("kapacita.csv"), csv("populace.csv"), csv("elektrina-mix.csv")]).then(([raw, popRaw, mixRaw]) => {
    const gw = byYear(raw, CAPACITY, "source", "gw");
    const shown = CAPACITY.filter(k => !k.hidden);
    const share = byYear(mixRaw, CAPACITY, "source", "share_pct");
    const twh = byYear(mixRaw, CAPACITY, "source", "twh");
    // GW / mil. obyvatel × 1000 = W na obyvatele.
    const pop = new Map(popRaw.map(d => [d.region + d.year, +d.population_mil]));
    const perCapita = new Map([...gw].map(([reg, years]) => [reg, years.map(d =>
      Object.fromEntries([["year", d.year], ...CAPACITY.map(k => [k.key, d[k.key] / pop.get(reg + d.year) * 1000])]))]));
    const stackMax = rows => d3.max([...rows.values()].flat(), d => d3.sum(shown, k => d[k.key]));
    const METRICS = {
      gw:        { label: "Instalovaný výkon", rows: gw, decimals: 0, short: "GW", yMax: stackMax(gw) },
      perCapita: { label: "Výkon na obyvatele", rows: perCapita, decimals: 0, short: "W na obyv.", yMax: stackMax(perCapita) },
      twh:       { label: "Výroba", rows: twh, decimals: 0, short: "TWh", yMax: stackMax(twh) },
      share:     { label: "Podíl na výrobě elektřiny", rows: share, yMax: 100, decimals: 1, short: "%" },
    };
    let metric = "gw", draw = () => {};
    addSwitch("graf-oze", Object.entries(METRICS).map(([key, m]) => ({ key, label: m.label })),
      key => { metric = key; draw(); });
    draw = mount("graf-oze", (svg, w) => smallMultiples(svg, w, {
      ...METRICS[metric], keys: shown, xTicks: [2000, 2010, 2025], square: true,
    }));
  });

  // Podíl elektromobilů na prodejích nových aut.
  csv("elektromobily.csv").then(raw => {
    // Built per draw: spreading r reads its colour getter once and freezes it.
    const series = () => REGIONS.map(r => ({ ...r,
      values: raw.filter(d => d.region === r.key).map(d => ({ year: +d.year, v: +d.share_pct })) }));
    mount("graf-elektromobily", (svg, w) => lines(svg, w, {
      series: series(), decimals: 1, short: "%", xTicks: [2010, 2015, 2020, 2025],
    }));
  });

  // Míra elektrifikace — in a collapsed box, drawn once it is opened.
  csv("elektrifikace.csv").then(raw => {
    const series = () => [...REGIONS, WORLD].map(r => ({ ...r,
      values: raw.filter(d => d.region === r.key).map(d => ({ year: +d.year, v: +d.share_pct })) }));
    mount("graf-elektrifikace", (svg, w) => lines(svg, w, {
      series: series(), decimals: 1, short: "%", xTicks: [1990, 2000, 2010, 2024],
    }));
  });

  // Investice do energetické transformace — absolute or as a share of GDP.
  csv("investice.csv").then(raw => {
    const METRICS = {
      gdp: { label: "Podíl na HDP", short: "%", decimals: 1,
             unit: "% HDP", v: d => d.investment_bn_usd / d.gdp_bn_usd * 100 },
      abs: { label: "Objem investic", short: "mld. $", decimals: 0,
             unit: "mld. USD", v: d => +d.investment_bn_usd },
    };
    let metric = "gdp", draw = () => {};
    addSwitch("graf-investice", Object.entries(METRICS).map(([key, m]) => ({ key, label: m.label })),
      key => { metric = key; draw(); });
    draw = mount("graf-investice", (svg, w) => {
      const m = METRICS[metric];
      return bars(svg, w, { ...m, rows: raw.map(d => ({ region: region(d.region), v: m.v(d) })) });
    });
  });
})();
