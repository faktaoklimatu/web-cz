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
 *   emise-co2.csv       Our World in Data, owid-co2-data.csv (1950–2024)
 *   emise-sektory.csv   EDGAR 2025 booklet, GHG_by_sector_and_country, 2024
 *   emise-celkem.csv    EDGAR 2025 booklet, GHG_totals_by_country and
 *                       GHG_per_capita_by_country, 2024, incl. GLOBAL TOTAL
 *                       as "svet" (shares of world; per-capita population)
 *   elektrina-mix.csv   Ember yearly_full_release_long_format.csv, generation
 *                       by fuel, both % and TWh
 *   kapacita.csv        Ember yearly_full_release_long_format.csv, capacity GW
 *                       by fuel (shares of the total are computed here)
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

  // Colours match the waffle squares in the text (emise-podil-waffle.html).
  const REGIONS = [
    { key: "cina",  label: "Čína",  color: "#e0495a" },
    { key: "usa",   label: "USA",   color: "#3b85d8" },
    { key: "indie", label: "Indie", color: "#8a3eb0" },
    { key: "eu",    label: "EU",    color: "#36369b" },
  ];
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
  // shares add up to 100 % with no remainder to show.
  const MIX = [
    { key: "coal",    label: "Uhlí",                   color: "#eb4a66", from: ["Coal"] },
    { key: "fossil",  label: "Plyn a ostatní fosilní", color: "#b3306e", from: ["Gas", "Other Fossil"] },
    { key: "nuclear", label: "Jádro",                  color: "#7f94a6", from: ["Nuclear"] },
    { key: "oze",     label: "Obnovitelné zdroje",     color: "#30b8ab",
      from: ["Hydro", "Bioenergy", "Other Renewables", "Wind", "Solar"] },
  ];
  // Installed capacity by source, bottom of the stack first. Nuclear and
  // fossil plants count to the total the shares are taken of, but are not
  // drawn (`hidden`). Ember's few GW of "Other Renewables" (geothermal etc.)
  // ride with biomass.
  const CAPACITY = [
    { key: "wind",    label: "Vítr",                  color: "#237dde", from: ["Wind"] },
    { key: "solar",   label: "Slunce",                color: "#ffb32e", from: ["Solar"] },
    { key: "bio",     label: "Biomasa a ostatní OZE", color: "#ca851c", from: ["Bioenergy", "Other Renewables"] },
    { key: "hydro",   label: "Voda",                  color: "#a1bdcf", from: ["Hydro"] },
    { key: "nuclear", label: "Jádro",                 color: "#ebeef0", from: ["Nuclear"], hidden: true },
    { key: "fossil",  label: "Fosilní zdroje",        color: "#c5c8ca", from: ["Coal", "Gas", "Other Fossil"], hidden: true },
  ];

  // EDGAR sectors in the categories and palette of the FoK emission
  // infographics (fok-theme.js, colors.sectors). Fuel Exploitation (refining,
  // fugitive emissions) goes to industry, as CRF 1.A.1.b/c and 1.B do in
  // data-analysis lib/R/emissions-utils.r. EDGAR has no remainder, so the
  // infographic's "Jiné" category would always be empty and is left out.
  const SECTORS = [
    { key: "energetika",  label: "Výroba elektřiny a tepla", color: "#f4465b", from: ["Power Industry"] },
    { key: "prumysl",     label: "Průmysl",                  color: "#3b3b93",
      from: ["Industrial Combustion", "Processes", "Fuel Exploitation"] },
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

  // Climate targets for the timeline. A note is a list of [text, bold, italic]
  // runs; non-breaking spaces keep "−55 %" in one piece when it wraps.
  const GOALS = [
    { region: "eu", label: "Evropská unie", short: "EU", marks: [
      { year: 2030, kind: "dot", place: "above", note: [["−55 %", true], [" emisí oproti 1990"]] },
      { year: 2040, kind: "dot", place: "above", note: [["−90 %", true], [" emisí oproti 1990"]] },
      { year: 2050, kind: "neutral" },
    ] },
    { region: "usa", label: "USA", short: "USA", marks: [
      { year: 2050, kind: "cancelled", note: [["zrušeno", false, true]],
        tip: "Cíle Bidenovy administrativy – klimatická neutralita do roku 2050, −50–52 % emisí " +
             "do roku 2030 a −61–66 % do roku 2035 oproti roku 2005 – zrušila Trumpova administrativa." },
    ] },
    { region: "cina", label: "Čína", short: "Čína", marks: [
      { year: 2030, kind: "dot", place: "above", note: [["zvrátit růst", true], [" emisí"]] },
      { year: 2035, kind: "dot", place: "below", note: [["−7 až −10 %", true],
        [" do roku 2035 oproti roku s maximálními hodnotami (pravděpodobně 2025 nebo 2026)"]] },
      { year: 2060, kind: "neutral" },
    ] },
    { region: "indie", label: "Indie", short: "Indie", marks: [
      { year: 2070, kind: "neutral", align: "end" },
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

  // Draws the chart now and again whenever the svg's width changes: on window
  // resize, and when the collapsed box holding it is opened (it has no width
  // until then). `draw(svg, width)` returns the height it needs.
  function mount(id, draw) {
    const el = document.getElementById(id + "-svg");
    if (!el) return () => {};
    let last = 0;
    const redraw = () => {
      const w = Math.round(el.getBoundingClientRect().width);
      if (!w) return;
      last = w;
      const svg = d3.select(el);
      svg.selectAll("*").remove();
      svg.attr("height", draw(svg, w));
    };
    new ResizeObserver(() => {
      if (Math.round(el.getBoundingClientRect().width) !== last) redraw();
    }).observe(el);
    // Text is measured for wrapping and placement; once the webfont is in,
    // measure again, or labels sized against the fallback font run long.
    document.fonts.ready.then(redraw);
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
  function smallMultiples(svg, width, o) {
    const multi = o.keys.length > 1;
    let top = multi ? legend(svg, o.keys, width) : 0;
    top += 26 + unitCaption(svg, o.unit, top + 13, width);

    const cols = width >= 560 ? 4 : 2;
    const left = 40, gapX = 16, titleH = 22, axisH = 22, rowGap = 14;
    const panelW = (width - left - gapX * (cols - 1)) / cols;
    const plotH = cols === 4 ? 150 : 130;

    const years = o.rows.get(REGIONS[0].key).map(d => d.year);
    const x = d3.scaleLinear().domain(d3.extent(years)).range([0, panelW]);
    const y = d3.scaleLinear().domain([0, o.yMax]).range([plotH, 0]).nice(4);
    const stack = d3.stack().keys(o.keys.map(k => k.key));
    const area = d3.area().x(d => x(d.data.year)).y0(d => y(d[0])).y1(d => y(d[1]));

    REGIONS.forEach((r, i) => {
      const col = i % cols, row = Math.floor(i / cols);
      const g = svg.append("g").attr("transform",
        `translate(${left + col * (panelW + gapX)},${top + row * (titleH + plotH + axisH + rowGap)})`);
      g.append("text").attr("y", 15).attr("font-size", 15).attr("font-weight", 700)
        .attr("fill", multi ? C.title : r.color).text(r.label);

      const p = g.append("g").attr("transform", `translate(0,${titleH})`);
      p.append("g").call(d3.axisLeft(y).ticks(4).tickSize(-panelW).tickFormat(col === 0 ? tickFmt : ""))
        .call(a => a.select(".domain").remove())
        .call(a => a.selectAll(".tick line").attr("stroke", C.grid))
        .call(a => axisText(a.selectAll(".tick text")));

      const data = o.rows.get(r.key);
      p.selectAll(".area").data(stack(data)).join("path")
        .attr("fill", (s, j) => o.keys[j].color || r.color)
        .attr("d", area);

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
    let top = legend(svg, o.keys, width);
    top += 40 + unitCaption(svg, o.unit, top + 13, width);

    const GAP = 2, PAD = 8, VALUE_SIZE = 12, NAME_SIZE = 13, TOTAL_SIZE = 26;
    const color = key => o.keys.find(k => k.key === key).color;
    const total = r => d3.sum(o.keys, k => o.rows.get(r.key)[k.key]);
    const regions = REGIONS.slice().sort((a, b) => total(b) - total(a));
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
          .attr("font-size", NAME_SIZE).attr("font-weight", 700).attr("fill", d.r.color)
          .text(d.r.label.toUpperCase());
        g.append("text").attr("x", -PAD).attr("y", NAME_SIZE + 6 + TOTAL_SIZE * 0.8).attr("text-anchor", "end")
          .attr("font-size", TOTAL_SIZE).attr("font-weight", 700).attr("fill", C.title)
          .text(fmt(sum, 1));

        d.sq.forEach(s => {
          const v = o.rows.get(d.r.key)[s.key], c = color(s.key);
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
            t.attr("fill", "#fff").attr("text-anchor", "end").attr("x", s.x + s.w - 4)
              .attr("y", s.pos === "bottom" ? s.y + VALUE_SIZE + 2 : s.y + s.w - 4);
          } else if (s.pos === "top") {
            t.attr("fill", c).attr("text-anchor", "end").attr("x", s.x + s.w).attr("y", s.y - 4);
          } else {
            t.attr("fill", c).attr("x", s.x + s.w + 4)
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
    const mg = { top: 30 + unitCaption(svg, o.unit, 13, width), right: 56, bottom: 24, left: 34 };
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

  // Waffle as in the original FoK graphic: one square per percent of the
  // world, five to a column, columns filled bottom-up from the left, name and
  // share underneath. The last block (rest of the world) stands further off.
  //   o.rows: [{region, value, share}]
  function waffle(svg, width, o) {
    const top = 30 + unitCaption(svg, o.unit, 13, width), ROWS = 5, NAME_SIZE = 15, GAP = 1.5, GAP_LAST = 3;
    const counts = largestRemainder(o.rows.map(d => d.share), 100);
    const blocks = o.rows.map((d, i) => ({ ...d, n: counts[i], cols: Math.ceil(counts[i] / ROWS) }));
    const measure = (text, weight) => {
      const t = svg.append("text").attr("font-size", NAME_SIZE).attr("font-weight", weight).text(text);
      const w = t.node().getComputedTextLength();
      t.remove();
      return w;
    };
    blocks.forEach(b => {
      b.labelW = Math.max(measure(b.region.label, 700), measure(fmt(b.share, 1) + " %", 400));
    });
    const gapAfter = i => (i === blocks.length - 2 ? GAP_LAST : GAP);
    const rowWidth = cell => d3.sum(blocks, (b, i) =>
      Math.max(b.cols * cell, b.labelW) + (i < blocks.length - 1 ? gapAfter(i) * cell : 0));
    // Largest square that fits the row, capped near the original's size.
    let lo = 4, hi = 24;
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      if (rowWidth(mid) <= width) lo = mid; else hi = mid;
    }
    const cell = lo;

    let x = 0;
    blocks.forEach((b, i) => {
      const g = svg.append("g").attr("transform", `translate(${x},${top})`);
      const textColor = d3.lab(b.region.color).l > 75 ? d3.lab(b.region.color).darker(1.5) : b.region.color;
      g.selectAll("rect").data(d3.range(b.n)).join("rect")
        .attr("x", j => Math.floor(j / ROWS) * cell)
        .attr("y", j => (ROWS - 1 - j % ROWS) * cell)
        .attr("width", cell - 2).attr("height", cell - 2)
        .attr("fill", b.region.color)
        .on("mousemove", ev => showTip(ev, `${sw(b.region.color)}<strong>${b.region.label}</strong>: ` +
          `${fmt(b.share, 1)} % (${fmt(b.value, 0)} ${o.short})`))
        .on("mouseleave", hideTip);
      g.append("text").attr("y", ROWS * cell + 6 + NAME_SIZE)
        .attr("font-size", NAME_SIZE).attr("font-weight", 700).attr("fill", textColor)
        .text(b.region.label);
      g.append("text").attr("y", ROWS * cell + 6 + NAME_SIZE * 2 + 4)
        .attr("font-size", NAME_SIZE).attr("font-weight", 400).attr("fill", textColor)
        .text(fmt(b.share, 1) + " %");
      x += Math.max(b.cols * cell, b.labelW) + gapAfter(i) * cell;
    });
    return top + ROWS * cell + 6 + NAME_SIZE * 2 + 8;
  }

  // Timeline of climate targets, after the FoK graphic in the article draft:
  // a line per region, small dots for interim targets with an arrowed note,
  // a large dot for climate neutrality, a crossed one for a cancelled target.
  function timeline(svg, width, goals) {
    const NOTE = 13, LINE_H = 16, NEUTRAL = 15, YEAR = 18, R = 11, r = 4.5;
    const narrow = width < 560;
    const regionOf = key => REGIONS.find(x => x.key === key);

    const widths = new Map();
    const measure = (t, size, bold, italic) => {
      const id = [t, size, bold, italic].join("|");
      if (!widths.has(id)) {
        // white-space: pre, or SVG drops a word's trailing space from the
        // measurement and every wrapped line comes out a few px too long.
        const el = svg.append("text").attr("font-size", size).attr("font-weight", bold ? 700 : 400)
          .attr("font-style", italic ? "italic" : null).style("white-space", "pre").text(t);
        widths.set(id, el.node().getComputedTextLength());
        el.remove();
      }
      return widths.get(id);
    };

    // Greedy word wrap over styled runs; breaks only at plain spaces.
    function wrap(runs, maxW) {
      const words = runs.flatMap(([t, bold, italic]) =>
        t.split(/(?<= )/).map(w => ({ t: w, bold, italic })));
      const lines = [[]];
      let w = 0;
      words.forEach(word => {
        const ww = measure(word.t, NOTE, word.bold, word.italic);
        if (w + ww > maxW && lines[lines.length - 1].length) {
          lines.push([]);
          w = 0;
          word = { ...word, t: word.t.replace(/^ /, "") };
        }
        lines[lines.length - 1].push(word);
        w += ww;
      });
      return { lines, w: d3.max(lines, l => d3.sum(l, x => measure(x.t, NOTE, x.bold, x.italic))) };
    }
    function drawRuns(g, line, x, y, color, anchor) {
      const t = g.append("text").attr("x", x).attr("y", y).attr("font-size", NOTE).attr("fill", color)
        .attr("text-anchor", anchor || "start");
      line.forEach(word => t.append("tspan").attr("font-weight", word.bold ? 700 : 400)
        .attr("font-style", word.italic ? "italic" : null).text(word.t));
    }
    // A small curved arrow; its head is one three-point stroke at (x2, y2).
    function arrow(g, x1, y1, cx, cy, x2, y2, color) {
      g.append("path").attr("d", `M${x1},${y1}Q${cx},${cy} ${x2},${y2}`)
        .attr("fill", "none").attr("stroke", color).attr("stroke-width", 1.3);
      const a = Math.atan2(y2 - cy, x2 - cx);
      const wing = d => `${x2 - 6 * Math.cos(a + d)},${y2 - 6 * Math.sin(a + d)}`;
      g.append("path").attr("d", `M${wing(-0.6)}L${x2},${y2}L${wing(0.6)}`)
        .attr("fill", "none").attr("stroke", color).attr("stroke-width", 1.3)
        .attr("stroke-linejoin", "round").attr("stroke-linecap", "round");
    }

    const labelOf = gl => (narrow ? gl.short : gl.label);
    const LABEL = narrow ? 14 : 17;
    const labelCol = d3.max(goals, gl => measure(labelOf(gl), LABEL, true)) + 16;
    const x = d3.scaleLinear().domain([2027, 2072]).range([labelCol, width - 4]);

    // Lay out every annotation first: horizontal span and height above or
    // below its line, so the rows can be spaced to clear each other.
    const rows = goals.map(gl => {
      const reg = regionOf(gl.region);
      const marks = gl.marks.map((m, i) => {
        const cx = x(m.year);
        // A note runs on until the next thing drawn on its own side of the line.
        const sideOf = mk => (mk.kind === "dot" ? mk.place : "above");
        const next = gl.marks.slice(i + 1).find(mk => sideOf(mk) === sideOf(m));
        if (m.kind === "neutral") {
          const w = Math.max(measure("Klimatická neutralita", NEUTRAL, true), measure(String(m.year), YEAR));
          // Hangs right from the dot, or left of it where it would run off the edge.
          const align = m.align || (cx - R + w > width ? "end" : "start");
          const x0 = align === "end" ? cx + R - w : cx - R;
          return { ...m, align, cx, side: "above", x0, x1: x0 + w, h: 18 + 22 + NEUTRAL };
        }
        if (m.kind === "cancelled") {
          const w = measure(m.note[0][0], NOTE, false, true);
          return { ...m, cx, side: "above", x0: cx - 14 - w, x1: cx, h: 26 + NOTE };
        }
        const tx = cx + (m.place === "below" ? 22 : 12);
        const maxRight = next ? x(next.year) - (next.kind === "dot" ? 16 : R + 16) : width - 4;
        const wrapped = wrap(m.note, Math.max(60, maxRight - tx));
        const n = wrapped.lines.length;
        return { ...m, cx, side: m.place, tx, wrapped, x0: tx, x1: tx + wrapped.w,
                 h: m.place === "below" ? 30 + (n - 1) * LINE_H + 4 : 16 + n * LINE_H };
      });
      return { gl, reg, marks,
               above: marks.filter(m => m.side === "above"), below: marks.filter(m => m.side === "below") };
    });

    const overlaps = (a, b) => a.x0 < b.x1 + 8 && b.x0 < a.x1 + 8;
    let y = 30 + (d3.max(rows[0].above, m => m.h) || 0) + 8;
    rows.forEach((row, i) => {
      if (i) {
        const prev = rows[i - 1];
        const pairs = prev.below.flatMap(b => row.above.filter(a => overlaps(a, b)).map(a => a.h + b.h + 10));
        y += Math.max(40, (d3.max(prev.below, m => m.h) || 0) + 12,
                      (d3.max(row.above, m => m.h) || 0) + 12, d3.max(pairs) || 0);
      }
      row.y = y;
    });

    // Axis on top: year labels with a short tick under each.
    [2030, 2040, 2050, 2060, 2070].forEach(yr => {
      svg.append("text").attr("x", x(yr)).attr("y", 14).attr("text-anchor", "middle")
        .attr("font-size", C.axisFontSize + 1).attr("fill", C.axis).text(yr);
      svg.append("line").attr("x1", x(yr)).attr("x2", x(yr)).attr("y1", 20).attr("y2", 26)
        .attr("stroke", C.axis).attr("stroke-width", 1.3);
    });

    rows.forEach(row => {
      const c = row.reg.color, g = svg.append("g");
      g.append("text").attr("x", labelCol - 16).attr("y", row.y).attr("dy", "0.35em")
        .attr("text-anchor", "end").attr("font-size", LABEL).attr("font-weight", 700).attr("fill", c)
        .text(labelOf(row.gl));
      g.append("line").attr("x1", labelCol).attr("x2", width).attr("y1", row.y).attr("y2", row.y)
        .attr("stroke", "#8a94a3").attr("stroke-width", 1.5);

      row.marks.forEach(m => {
        if (m.kind === "neutral") {
          g.append("circle").attr("cx", m.cx).attr("cy", row.y).attr("r", R)
            .attr("fill", c).attr("stroke", "#fff").attr("stroke-width", 4).attr("paint-order", "stroke");
          const ax = m.align === "end" ? m.cx + R : m.cx - R, anchor = m.align === "end" ? "end" : "start";
          g.append("text").attr("x", ax).attr("y", row.y - 40).attr("text-anchor", anchor)
            .attr("font-size", NEUTRAL).attr("font-weight", 700).attr("fill", c).text("Klimatická neutralita");
          g.append("text").attr("x", ax).attr("y", row.y - 18).attr("text-anchor", anchor)
            .attr("font-size", YEAR).attr("fill", c).text(m.year);
        } else if (m.kind === "cancelled") {
          g.append("circle").attr("cx", m.cx).attr("cy", row.y).attr("r", R)
            .attr("fill", c).attr("stroke", "#fff").attr("stroke-width", 4).attr("paint-order", "stroke")
            .on("mousemove", ev => showTip(ev, m.tip)).on("mouseleave", hideTip);
          [[-1, -1, 1, 1], [-1, 1, 1, -1]].forEach(([a, b, d, e]) => g.append("line")
            .attr("x1", m.cx + a * 4.5).attr("y1", row.y + b * 4.5).attr("x2", m.cx + d * 4.5).attr("y2", row.y + e * 4.5)
            .attr("stroke", "#fff").attr("stroke-width", 2.5).attr("stroke-linecap", "round")
            .attr("pointer-events", "none"));
          drawRuns(g, [{ t: m.note[0][0], italic: true }], m.cx - 14, row.y - 26, c, "end");
          arrow(g, m.cx - 10, row.y - 30, m.cx, row.y - 30, m.cx, row.y - R - 4, c);
        } else {
          g.append("circle").attr("cx", m.cx).attr("cy", row.y).attr("r", r)
            .attr("fill", c).attr("stroke", "#fff").attr("stroke-width", 4).attr("paint-order", "stroke");
          const n = m.wrapped.lines.length;
          if (m.side === "above") {
            const last = row.y - 16;
            m.wrapped.lines.forEach((line, i) => drawRuns(g, line, m.tx, last - (n - 1 - i) * LINE_H, c));
            arrow(g, m.tx - 3, last - 4, m.cx, last - 4, m.cx, row.y - r - 4, c);
          } else {
            const first = row.y + 30;
            m.wrapped.lines.forEach((line, i) => drawRuns(g, line, m.tx, first + i * LINE_H, c));
            arrow(g, m.tx - 3, first - 4, m.cx, first - 4, m.cx, row.y + r + 4, c);
          }
        }
      });
    });

    const last = rows[rows.length - 1];
    return last.y + Math.max(R + 6, (d3.max(last.below, m => m.h) || 0) + 6);
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
  csv("emise-celkem.csv").then(raw => {
    const total = key => +raw.find(d => d.region === key).ghg_total_mt;
    const world = total("svet");
    const rows = REGIONS.map(r => ({ region: r, value: total(r.key) }))
      .sort((a, b) => b.value - a.value);
    rows.push({ region: { key: "zbytek", label: "Zbytek světa", color: "#b5b8bd" },
                value: world - d3.sum(rows, d => d.value) });
    rows.forEach(d => { d.share = d.value / world * 100; });
    mount("graf-podil", (svg, w) => waffle(svg, w, {
      rows, short: "Mt CO₂eq",
      unit: "1 čtvereček = 1 % světových emisí skleníkových plynů (bez lesnictví a využití půdy)",
    }));
  });

  // Emise CO₂ — switch between total, per capita and cumulative share.
  csv("emise-co2.csv").then(raw => {
    const METRICS = {
      total:     { label: "Celkové emise", col: "co2_mt", k: 1 / 1000, decimals: 2, short: "mld. t",
                   unit: "Roční emise CO₂ (mld. t)" },
      perCapita: { label: "Na obyvatele", col: "co2_per_capita_t", k: 1, decimals: 1, short: "t",
                   unit: "Roční emise CO₂ na obyvatele (t)" },
      cumShare:  { label: "Podíl na kumulativních emisích", col: "share_cumulative_pct", k: 1, decimals: 1, short: "%",
                   unit: "Podíl na světových emisích CO₂ od roku 1750 (%)" },
    };
    let metric = "total", draw = () => {};
    addSwitch("graf-emise", Object.entries(METRICS).map(([key, m]) => ({ key, label: m.label })),
      key => { metric = key; draw(); });
    draw = mount("graf-emise", (svg, w) => {
      const m = METRICS[metric];
      const rows = new Map();
      d3.group(raw, d => d.region).forEach((rr, reg) =>
        rows.set(reg, rr.map(d => ({ year: +d.year, v: +d[m.col] * m.k }))));
      return smallMultiples(svg, w, {
        keys: [{ key: "v" }], rows, unit: m.unit, short: m.short, decimals: m.decimals,
        yMax: d3.max([...rows.values()].flat(), d => d.v), xTicks: [1950, 1990, 2024],
      });
    });
  });

  // Emise podle sektorů na obyvatele — all gases summed per sector. The
  // population is EDGAR's own (its total over its per-capita figure), so the
  // regions' totals here match the per-capita numbers EDGAR publishes.
  Promise.all([csv("emise-sektory.csv"), csv("emise-celkem.csv")]).then(([raw, perCapita]) => {
    const population = new Map(perCapita.map(d => [d.region, d.ghg_total_mt / d.ghg_per_capita_t]));
    const lookup = new Map(SECTORS.flatMap(s => s.from.map(f => [f, s.key])));
    const rows = new Map();
    d3.group(raw, d => d.region).forEach((rr, reg) => {
      const sums = Object.fromEntries(SECTORS.map(s => [s.key, 0]));
      rr.forEach(d => {
        const key = lookup.get(d.sector);
        if (key) sums[key] += +d.mt_co2eq;
        else console.warn("emise-sektory.csv: neznámý sektor", d.sector);
      });
      rows.set(reg, Object.fromEntries(SECTORS.map(s => [s.key, sums[s.key] / population.get(reg)])));
    });
    mount("graf-sektory", (svg, w) => squares(svg, w, {
      keys: SECTORS, rows, layout: SQUARES_LAYOUT, short: "t CO₂eq",
      unit: "Tuny CO₂eq na obyvatele (bez lesnictví a využití půdy)",
    }));
  });

  // Mix výroby elektřiny — shares or TWh, both straight from Ember.
  csv("elektrina-mix.csv").then(raw => {
    const METRICS = {
      share: { label: "Podíl", col: "share_pct", decimals: 1, short: "%",
               unit: "Podíl na výrobě elektřiny (%)" },
      twh:   { label: "Výroba v TWh", col: "twh", decimals: 0, short: "TWh",
               unit: "Výroba elektřiny (TWh)" },
    };
    const rows = Object.fromEntries(Object.entries(METRICS).map(([k, m]) => [k, byYear(raw, MIX, "source", m.col)]));
    // Shares stack to 100; for TWh the shared scale runs to the largest total.
    const yMax = {
      share: 100,
      twh: d3.max([...rows.twh.values()].flat(), d => d3.sum(MIX, k => d[k.key])),
    };
    let metric = "share", draw = () => {};
    addSwitch("graf-mix", Object.entries(METRICS).map(([key, m]) => ({ key, label: m.label })),
      key => { metric = key; draw(); });
    draw = mount("graf-mix", (svg, w) => smallMultiples(svg, w, {
      ...METRICS[metric], keys: MIX, rows: rows[metric], yMax: yMax[metric], xTicks: [2000, 2010, 2025],
    }));
  });

  // Instalovaný výkon — GW, or each source's share of the region's total.
  csv("kapacita.csv").then(raw => {
    const gw = byYear(raw, CAPACITY, "source", "gw");
    const shown = CAPACITY.filter(k => !k.hidden);
    const share = new Map([...gw].map(([reg, years]) => [reg, years.map(d => {
      const total = d3.sum(CAPACITY, k => d[k.key]);
      return Object.fromEntries([["year", d.year], ...CAPACITY.map(k => [k.key, d[k.key] / total * 100])]);
    })]));
    const METRICS = {
      share: { label: "Podíl", rows: share, yMax: 100, decimals: 1, short: "%",
               unit: "Podíl na celkovém instalovaném výkonu (%)" },
      gw:    { label: "Výkon v GW", rows: gw, decimals: 0, short: "GW",
               yMax: d3.max([...gw.values()].flat(), d => d3.sum(shown, k => d[k.key])),
               unit: "Instalovaný výkon (GW)" },
    };
    let metric = "share", draw = () => {};
    addSwitch("graf-oze", Object.entries(METRICS).map(([key, m]) => ({ key, label: m.label })),
      key => { metric = key; draw(); });
    draw = mount("graf-oze", (svg, w) => smallMultiples(svg, w, {
      ...METRICS[metric], keys: shown, xTicks: [2000, 2010, 2025],
    }));
  });

  // Podíl elektromobilů na prodejích nových aut.
  csv("elektromobily.csv").then(raw => {
    const series = REGIONS.map(r => ({ ...r,
      values: raw.filter(d => d.region === r.key).map(d => ({ year: +d.year, v: +d.share_pct })) }));
    mount("graf-elektromobily", (svg, w) => lines(svg, w, {
      series, decimals: 1, short: "%", xTicks: [2010, 2015, 2020, 2025],
      unit: "Podíl elektromobilů na prodejích nových osobních aut (%)",
    }));
  });

  // Míra elektrifikace — in a collapsed box, drawn once it is opened.
  csv("elektrifikace.csv").then(raw => {
    const series = [...REGIONS, WORLD].map(r => ({ ...r,
      values: raw.filter(d => d.region === r.key).map(d => ({ year: +d.year, v: +d.share_pct })) }));
    mount("graf-elektrifikace", (svg, w) => lines(svg, w, {
      series, decimals: 1, short: "%", xTicks: [2000, 2005, 2010, 2015, 2019],
      unit: "Podíl elektřiny na konečné spotřebě energie (%)",
    }));
  });

  // Investice do energetické transformace — absolute or as a share of GDP.
  csv("investice.csv").then(raw => {
    const METRICS = {
      abs: { label: "Objem investic", short: "mld. $", decimals: 0,
             unit: "Investice v roce 2025 (mld. USD)", v: d => +d.investment_bn_usd },
      gdp: { label: "Podíl na HDP", short: "%", decimals: 1,
             unit: "Investice v roce 2025 jako podíl na HDP (%)", v: d => d.investment_bn_usd / d.gdp_bn_usd * 100 },
    };
    let metric = "abs", draw = () => {};
    addSwitch("graf-investice", Object.entries(METRICS).map(([key, m]) => ({ key, label: m.label })),
      key => { metric = key; draw(); });
    draw = mount("graf-investice", (svg, w) => {
      const m = METRICS[metric];
      return bars(svg, w, { ...m, rows: raw.map(d => ({ region: region(d.region), v: m.v(d) })) });
    });
  });
})();
