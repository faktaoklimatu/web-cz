/* Emisní strop EU ETS 2021–2050 for the revize-ets explainer: the current
 * trajectory, the Commission proposal and the proposal without international
 * credits (LRF 2.7 % instead of 1.7 % after 2036), drawn as steps — one tread
 * per year, centred on its tick. Above the plot runs the LRF ruler — a line
 * ticked where the LRF changes, each value centred over its stretch; the axis
 * marks the year each line reaches zero in that line's colour. On desktop the
 * row titles sit in a column left of the plot; on a phone they run full width.
 *
 * Data: /assets-local/files/revize-ets/emisni-strop.csv (sheet "ETS podíl
 * emisí a LRF", list LRF). Markup: includes-local/revize-ets-strop.html.
 */
(function () {
  const el = document.getElementById("ets-strop");
  if (!el || typeof d3 === "undefined") return;

  const C = {
    soucasna: "#75808e",
    navrh: "#3b3b93",
    bez: "#0d80d8",
    band: "#f2f4f7",   // phase IV background
    grid: "#e6e6e6",
    text: "#515b66",
  };
  const SERIES = [   // drawn in this order, so the proposal ends up on top
    { key: "soucasna", color: C.soucasna, width: 2.5, label: "Současná trajektorie" },
    { key: "bez_kreditu", color: C.bez, width: 1.5, label: "Bez mezin. kreditů" },
    { key: "navrh", color: C.navrh, width: 4, label: "Nový návrh" },
  ];
  const PHASE_V = 2031;
  const Y_TICKS = [0, 500, 1000, 1500];
  const num = d3.formatLocale({ decimal: ",", thousands: " ", grouping: [3] }).format(",.0f");
  const pct = v => (v * 100).toFixed(1).replace(".", ",") + " %";

  d3.csv(el.dataset.src, r => ({
    rok: +r.rok,
    soucasna: r.soucasna / 1e6,
    navrh: r.navrh / 1e6,
    bez_kreditu: r.bez_kreditu / 1e6,
    lrf_navrh: +r.lrf_navrh,
    lrf_bez_kreditu: +r.lrf_bez_kreditu,
  })).then(rows => {
    // Redraws whenever the container's width changes; also fires once on observe — the first draw.
    let w = 0;
    new ResizeObserver(() => {
      if (el.clientWidth !== w) { w = el.clientWidth; draw(rows); }
    }).observe(el);
  });

  function draw(rows) {
    // viewBox = rendered width, so 13 px text stays 13 px (charts guideline).
    const W0 = el.clientWidth;
    if (!W0) return;
    const narrow = W0 < 520;
    const fs = narrow ? 11 : 13, lh = fs * 1.25;
    // Left column for the row titles (desktop) or just the y-axis numbers (phone).
    const LABEL_W = narrow ? 40 : 150;
    const mg = { right: 8, bottom: 32, left: LABEL_W };

    // Rows above the plot, in SVG coordinates: phase headers, the LRF ruler with
    // its title, the unit. The title is wrapped first, as it sets the row height.
    const probe = d3.select(el).append("svg").style("position", "absolute").style("visibility", "hidden");   // text measures only inside an <svg>
    const lrfTitle = [["Tempo snižování emisního stropu", 700], ["(lineární redukční faktor)", 300]]
      .flatMap(([text, weight]) => wrapLines(probe, words(text), narrow ? W0 : LABEL_W - 12, fs, { weight })
        .map(line => [line, weight]));
    probe.remove();
    const phaseY = fs + 4;
    const titleTop = phaseY + 12;
    // Desktop: ruler centred on the title block beside it. Phone: ruler under the title.
    const rulerY = narrow ? titleTop + lrfTitle.length * lh + fs + 8
      : titleTop + Math.max(lrfTitle.length * lh, fs + 18) / 2 + 6;
    const unitY = Math.max(rulerY + 6, titleTop + lrfTitle.length * lh) + fs + 12;
    mg.top = unitY + lh + 12;   // the unit takes two lines
    const H = Math.round(Math.max(380, Math.min(500, W0 * 0.62))) - 112;   // plot height as before the title grew
    const H0 = mg.top + H + mg.bottom;
    const W = W0 - mg.left - mg.right;

    const first = rows[0].rok, last = rows[rows.length - 1].rok;
    const byYear = new Map(rows.map(r => [r.rok, r]));
    const x = d3.scaleLinear().domain([first - 0.5, last + 0.5]).range([0, W]);
    const y = d3.scaleLinear().domain([0, d3.max(rows, r => r.soucasna) * 1.05]).range([H, 0]);
    const step = x(1) - x(0);
    const zeroYear = key => (rows.find(r => r.rok >= PHASE_V && r[key] === 0) || {}).rok;

    d3.select(el).selectAll("svg, .tip").remove();
    const svg = d3.select(el).append("svg").attr("id", "ets-strop-svg")   // chart-download.js finds it by id
      .attr("viewBox", [0, 0, W0, H0])
      .attr("role", "img")
      .attr("aria-label", `Emisní strop EU ETS ${first}–${last}. Podle současných pravidel klesne na nulu v roce ${zeroYear("soucasna")}, ` +
        `podle návrhu revize v roce ${zeroYear("navrh")}, bez mezinárodních kreditů v roce ${zeroYear("bez_kreditu")}.`);

    const defs = svg.append("defs");
    [["navrh", C.navrh], ["bez", C.bez]].forEach(([id, color]) => defs.append("marker")
      .attr("id", "ets-strop-sipka-" + id)
      .attr("viewBox", [0, 0, 10, 10]).attr("refX", 8).attr("refY", 5)
      .attr("markerWidth", 7).attr("markerHeight", 7).attr("orient", "auto")
      .append("path").attr("d", "M1,1L9,5L1,9")
      .attr("fill", "none").attr("stroke", color).attr("stroke-width", 1.5));

    const g = svg.append("g").attr("transform", `translate(${mg.left},${mg.top})`)
      .attr("font-size", fs).attr("fill", C.text);

    // Phase IV background, then grid lines run out to the chart's left edge,
    // their numbers sitting on them flush left, in line with the row titles.
    g.append("rect").attr("x", 0).attr("width", x(PHASE_V - 0.5)).attr("height", H).attr("fill", C.band);
    g.append("g").selectAll("line").data(Y_TICKS).join("line")
      .attr("x1", -mg.left).attr("x2", W).attr("y1", y).attr("y2", y).attr("stroke", C.grid);
    g.append("g").selectAll("text").data(Y_TICKS).join("text")
      .attr("x", -mg.left).attr("y", t => y(t) - 5).text(num);
    // Rows above the plot, drawn in SVG coordinates (minus the plot's top margin).
    const top = -mg.top;
    const unit = g.append("text").attr("font-weight", 700);
    ["milionů", "povolenek"].forEach((w, i) => unit.append("tspan").attr("x", -mg.left).attr("y", top + unitY + i * lh).text(w));

    // Phase headers.
    [[first, `FÁZE IV`, ` (${first}–${PHASE_V - 1})`, C.text], [PHASE_V, "FÁZE V", ` (${PHASE_V}–2040)`, C.navrh]]
      .forEach(([from, name, years, color]) => {
        const t = g.append("text").attr("x", x(from - 0.5)).attr("y", top + phaseY).attr("fill", color);
        t.append("tspan").attr("font-weight", 700).text(name);
        if (!narrow) t.append("tspan").text(years);
      });

    // LRF ruler: its title, then one stretch per run of equal LRF, ticked at
    // each change, the value centred above. Phase IV grey, phase V navy.
    const tt = g.append("text").attr("fill", C.text);
    lrfTitle.forEach(([line, weight], i) => tt.append("tspan").attr("x", -mg.left)
      .attr("y", top + titleTop + i * lh + fs * 0.8).attr("font-weight", weight).text(line));
    const runs = [];
    rows.forEach(r => {
      const run = runs[runs.length - 1];
      if (run && run.lrf === r.lrf_navrh) run.to = r.rok;
      else runs.push({ lrf: r.lrf_navrh, from: r.rok, to: r.rok });
    });
    const ry = top + rulerY;
    let phaseVLabel;   // the first phase V value, which the note below lines up with
    runs.forEach((run, i) => {
      const x0 = x(run.from - 0.5), x1 = x(run.to + 0.5), v = run.from >= PHASE_V;
      const color = v ? C.navrh : C.soucasna;
      g.append("line").attr("x1", x0).attr("x2", x1).attr("y1", ry).attr("y2", ry).attr("stroke", color).attr("stroke-width", 1.5);
      const ticks = i === runs.length - 1 ? [x0, x1] : [x0];
      ticks.forEach(tx => g.append("line").attr("x1", tx).attr("x2", tx).attr("y1", ry - 5).attr("y2", ry + 5)
        .attr("stroke", color).attr("stroke-width", 1.5));
      const label = g.append("text").attr("x", (x0 + x1) / 2).attr("text-anchor", "middle").attr("y", ry - 9)
        .attr("fill", v ? C.navrh : C.text).attr("font-weight", v ? 700 : null).text(pct(run.lrf));
      if (v && !phaseVLabel) phaseVLabel = label;
    });

    // What the LRF becomes without credits, just under the ruler and flush with
    // the first phase V value: three set lines on desktop, free wrapping on a
    // phone; on a white box so the grid does not run through the text.
    const alt = rows.find(r => r.lrf_bez_kreditu !== r.lrf_navrh);
    if (alt) {
      const nx = phaseVLabel.node().getBBox().x;
      const bold = pct(alt.lrf_bez_kreditu) + ",";
      const set = [`${bold} pokud by po roce ${alt.rok}`, "nebyly k dispozici dostatečně", "kvalitní mezinárodní kredity"];
      const lines = narrow ? wrapLines(g, words(set.join(" ")), W - nx, fs, { italic: true }) : set;
      const t = g.append("text").attr("x", nx).attr("y", ry + 14 + fs).attr("fill", C.bez).attr("font-style", "italic");
      lines.forEach((line, i) => {
        const ts = t.append("tspan").attr("x", nx).attr("dy", i ? "1.25em" : 0);
        if (i === 0 && line.startsWith(bold)) {
          ts.append("tspan").attr("font-weight", 700).text(bold);
          ts.append("tspan").text(line.slice(bold.length));
        } else ts.text(line);
      });
      const bb = t.node().getBBox();
      g.insert("rect", () => t.node()).attr("x", bb.x - 4).attr("y", bb.y - 2)
        .attr("width", bb.width + 8).attr("height", bb.height + 4).attr("fill", "#fff");
    }

    // The three caps.
    const treads = (key, from) => rows.filter(r => r.rok >= from)
      .flatMap(r => [[x(r.rok - 0.5), y(r[key])], [x(r.rok + 0.5), y(r[key])]]);
    SERIES.forEach(s => g.append("path")
      .attr("d", d3.line()(treads(s.key, s.key === "soucasna" ? first : PHASE_V)))
      .attr("fill", "none").attr("stroke", s.color).attr("stroke-width", s.width));

    // Annotations, placed in data coordinates so they follow the lines.
    const navrhLabel = label(g, x(2036.6), y(760), ["Nový návrh", "emisního stropu"], { color: C.navrh });
    arrowTo(g, navrhLabel, [x(2034.3), y(byYear.get(2034).navrh) - 6], "ets-strop-sipka-navrh", C.navrh, fs);
    const bezLabel = label(g, W, y(500), ["Nový návrh", "bez mezinárodních", "kreditů"], { color: C.bez, anchor: "end", italic: true });
    arrowTo(g, bezLabel, [x(2041), y(byYear.get(2041).bez_kreditu) - 6], "ets-strop-sipka-bez", C.bez, fs);
    label(g, x(2035.4) - 8, y(270), ["Současná", "trajektorie", "emis. stropu"], { color: C.text, anchor: "end", boldFirst: false });

    // X axis: a few round years plus the year each cap reaches zero.
    const zeros = SERIES.map(s => ({ rok: zeroYear(s.key), color: s.color })).filter(z => z.rok);
    const base = (step >= 14 ? [first, 2025, 2030, 2035] : [first, 2030])
      .concat(step >= 26 ? [PHASE_V] : [], step >= 20 ? [last] : []);
    const ticks = base.filter(t => !zeros.some(z => z.rok === t)).map(rok => ({ rok, color: C.text, bold: false }))
      .concat(zeros.map(z => ({ rok: z.rok, color: z.color, bold: true })));
    const xt = g.append("g").attr("transform", `translate(0,${H})`).attr("text-anchor", "middle")
      .selectAll("g").data(ticks).join("g").attr("transform", t => `translate(${x(t.rok)},0)`);
    xt.append("line").attr("y1", 4).attr("y2", 10).attr("stroke", t => t.color).attr("stroke-width", t => t.bold ? 1.5 : 1);
    xt.append("text").attr("y", 26).attr("fill", t => t.color).attr("font-weight", t => t.bold ? 700 : null)
      .text(t => t.rok === PHASE_V ? String(t.rok).slice(2) : t.rok);

    // Hover: a guide line and the year's values.
    const tip = d3.select(el).append("div").attr("class", "tip");
    const guide = g.append("line").attr("y2", H).attr("stroke", C.text).attr("stroke-dasharray", "2,3").style("display", "none");
    g.append("rect").attr("width", W).attr("height", H).attr("fill", "transparent")
      .on("pointermove", ev => {
        const [mx] = d3.pointer(ev);
        const r = byYear.get(Math.max(first, Math.min(last, Math.round(x.invert(mx)))));
        guide.attr("x1", x(r.rok)).attr("x2", x(r.rok)).style("display", null);
        const values = r.rok < PHASE_V
          ? `Emisní strop: <strong>${num(r.soucasna)} mil.</strong>`
          : SERIES.slice().reverse().map(s => `<span style="color:${s.color}">${s.label}:</span> <strong>${num(r[s.key])} mil.</strong>`).join("<br>");
        tip.html(`<strong>${r.rok}</strong><br>${values}`).style("display", "block");
        const tw = tip.node().offsetWidth, px = mg.left + x(r.rok);
        tip.style("left", (px + 12 + tw > W0 ? px - 12 - tw : px + 12) + "px").style("top", mg.top + 8 + "px");
      })
      .on("pointerleave", () => { guide.style("display", "none"); tip.style("display", "none"); });
  }

  // Multi-line label with a white halo; first line bold unless told otherwise.
  function label(g, x, y, lines, { color, anchor = "start", italic = false, boldFirst = true }) {
    const t = g.append("text").attr("x", x).attr("y", y).attr("text-anchor", anchor).attr("fill", color)
      .attr("font-style", italic ? "italic" : null)
      .attr("paint-order", "stroke").attr("stroke", "#fff").attr("stroke-width", 4).attr("stroke-linejoin", "round");
    lines.forEach((line, i) => t.append("tspan").attr("x", x).attr("dy", i ? "1.2em" : 0)
      .attr("font-weight", i === 0 && boldFirst ? 700 : null).text(line));
    return t;
  }

  // Curved arrow from the left edge of a label's first line to `to`.
  function arrowTo(g, labelSel, to, markerId, color, fs) {
    const box = labelSel.node().getBBox();
    const from = [box.x - 4, box.y + fs * 0.6];
    g.append("path").attr("d", `M${from}Q${to[0]},${from[1]},${to}`)
      .attr("fill", "none").attr("stroke", color).attr("stroke-width", 1)
      .attr("marker-end", `url(#${markerId})`);
  }

  // Words of a label, a one-letter word (v, k, a…) glued to the next one so it never ends a line.
  const words = text => text.replace(/(?<=^|\s)(\p{L}) /gu, "$1\u00a0").split(" ");

  // Splits words into lines no wider than `width`, measured in the chart's font.
  function wrapLines(g, words, width, fs, { weight = null, italic = false } = {}) {
    const probe = g.append("text").attr("font-size", fs).attr("font-weight", weight)
      .attr("font-style", italic ? "italic" : null);
    const lines = [];
    let line = [];
    for (const word of words) {
      probe.text([...line, word].join(" "));
      if (line.length && probe.node().getComputedTextLength() > width) { lines.push(line.join(" ")); line = [word]; }
      else line.push(word);
    }
    lines.push(line.join(" "));
    probe.remove();
    return lines;
  }
})();
