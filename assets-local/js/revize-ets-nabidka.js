/* Nabídka povolenek vs. uhlíkový rozpočet 2031–2040 for the revize-ets
 * explainer: the theoretical allowance supply in phase V stacked against the
 * cumulative emissions compatible with the 2040 target. Segments carry short
 * names; values and full descriptions are in the hover tooltip. Brackets left
 * of the supply bar group the segments by phase.
 *
 * Data: Öko-Institut (2026), "Out of balance – Assessing the 2026 Commission
 * proposal for the EU ETS 1", Figure 3. The brief only gives rounded values in
 * its text (3 500 / 1 600 / 250 / 600 / ~1 000 / ~10 % / ~5 400), so these are
 * the bar heights read from the vector paths of the PDF figure. Its cap includes
 * the extended aviation and shipping scope, so it is higher than the cap in
 * emisni-strop.csv. Markup: includes-local/revize-ets-nabidka.html.
 */
(function () {
  const el = document.getElementById("ets-nabidka");
  if (!el || typeof d3 === "undefined") return;

  const GROUPS = [
    { key: "faze5", color: "#3b3b93", label: "Množství povolenek ve\u00a0fázi\u00a0V" },
    { key: "faze4", color: "#6b6bd1", label: "Přebytek povolenek z\u00a0fáze\u00a0IV" },
  ];
  // name: shown in the bar (medium), note: an optional light line under it; label: the full description, in the tooltip.
  const SUPPLY = [   // bottom to top
    { group: "faze5", value: 3527.5, name: "Povolenky dle současného emisního stropu", label: "Povolenky dle současného emisního stropu" },
    { group: "faze5", value: 1600.3, name: "Zpomalení tempa snižování emisí", note: "(nižší lineární redukční faktor včetně negativních emisí)", label: "Povolenky navíc kvůli pomalejšímu snižování emisního stropu (nižší lineární redukční faktor)" },
    { group: "faze5", value: 250.6,  name: "Negativní emise", label: "Povolenky navíc, z jejichž dražby Komise nakoupí certifikáty odstranění emisí" },
    { group: "faze4", value: 598.5,  name: "Přebytek z\u00a0fáze\u00a0IV", label: "Přebytek z fáze IV (potenciální dodatečná nabídka)" },
    { group: "faze4", value: 994.7,  name: "Rezerva tržní stability", label: "Povolenky kumulované v rezervě tržní stability" },
    { group: "faze4", value: 360.4,  name: "Investment Booster", label: "Povolenky, které podpořené podniky obdrží skrze Investment Booster" },
  ];
  const BUDGET = { value: 5412.1, name: "Uhlíkový rozpočet v souladu s cílem 2040", label: "Uhlíkový rozpočet v souladu s cílem 2040", color: "#75808e" };
  const Y_MAX = 8000;
  // Layout.
  // Keys ending in "Narrow" apply below 520 px; the rest of each pair above it.
  const CFG = {
    height: 540,              // whole chart, px; tall enough for the thin negative-emissions segment
    fontSize: 12,             // axis, brackets, captions
    barFontSize: 12,          // names inside the bars (shrinks by up to 2 px to fit a thin segment)
    bracketWidth: 150,        // column left of the supply bar for the bracket labels, px
    supplyWidth: 0.3,         // supply bar, share of the width left after brackets and gap
    demandWidth: 0.3,         // budget bar, same share basis
    barGap: 40,               // between the two bars, px
    marginLeft: 46,           // y-axis numbers, px
    marginBottom: 48,         // captions under the bars, px
    heightNarrow: 600,
    fontSizeNarrow: 11,
    barFontSizeNarrow: 11,
    bracketWidthNarrow: 76,
    supplyWidthNarrow: 0.55,
    demandWidthNarrow: 0.45,
    barGapNarrow: 16,
    marginLeftNarrow: 38,
    marginBottomNarrow: 60,
    marginTop: 26,            // unit label above the plot, px
    textPad: 8,               // inset of the names inside the bars, px
    bracketGap: 8,            // supply bar to bracket, px
    bracketLabelGap: 6,       // bracket to its label, px
    captionGap: 8,            // bars to captions, px
    lineHeight: 1.2,          // multiple of the font size
  };
  const C = { grid: "#e6e6e6", text: "#515b66" };
  const color = key => GROUPS.find(gr => gr.key === key).color;
  // Rounded to 10: the figure is read off a chart, not a table.
  const num = d3.formatLocale({ decimal: ",", thousands: " ", grouping: [3] }).format(",.0f");
  const amount = v => num(Math.round(v / 10) * 10);

  // Redraws whenever the container's width changes; also fires once on observe — the first draw.
  let w = 0;
  new ResizeObserver(() => { if (el.clientWidth !== w) { w = el.clientWidth; draw(); } }).observe(el);

  function draw() {
    // viewBox = rendered width, so text keeps its pixel size (charts guideline).
    const W0 = el.clientWidth;
    if (!W0) return;
    const narrow = W0 < 520;
    const v = key => CFG[narrow ? key + "Narrow" : key];
    const fs = v("fontSize"), bfs = v("barFontSize"), lh = fs * CFG.lineHeight, pad = CFG.textPad;
    const H0 = v("height");
    const mg = { top: CFG.marginTop, right: 0, bottom: v("marginBottom"), left: v("marginLeft") };
    const W = W0 - mg.left - mg.right;

    // Columns: bracket labels | supply bar | gap | budget bar.
    const bw = v("bracketWidth"), gap = v("barGap"), avail = W - bw - gap;
    const sx = bw, sw = Math.round(avail * v("supplyWidth")), dw = Math.round(avail * v("demandWidth"));
    const dx = sx + sw + gap;

    d3.select(el).selectAll("svg, .tip").remove();
    const svg = d3.select(el).append("svg").attr("id", "ets-nabidka-svg").attr("viewBox", [0, 0, W0, H0])   // id: chart-download.js
      .attr("role", "img")
      .attr("aria-label", `Nabídka povolenek v letech 2031–2040 podle Öko-Institutu: zhruba ${amount(d3.sum(SUPPLY, d => d.value))} milionů, ` +
        `z toho ${amount(d3.sum(SUPPLY.filter(d => d.group === "faze5"), d => d.value))} milionů nově ve fázi V. ` +
        `Uhlíkový rozpočet v souladu s cílem 2040 je ${amount(BUDGET.value)} Mt CO2eq.`);
    const g = svg.append("g").attr("transform", `translate(${mg.left},${mg.top})`)
      .attr("font-size", fs).attr("fill", C.text);
    const tip = d3.select(el).append("div").attr("class", "tip");

    // Captions are wrapped before the plot height is set: a narrow bar can push
    // one to three lines, and marginBottom is then only the minimum.
    // The number is how many leading words are bold; measured bold throughout, so a line never runs long.
    const captions = [[sx, sw, "Nabídka povolenek v letech 2031–2040", 2], [dx, dw, "Poptávka po povolenkách (emise)", 1]]
      .map(([x, width, caption, bold]) => [x, wrapLines(g, words(caption), width, fs, 700), bold]);
    const captionLines = d3.max(captions, ([, lines]) => lines.length);
    mg.bottom = Math.max(mg.bottom, CFG.captionGap + (captionLines - 1) * lh + fs + 4);
    const H = H0 - mg.top - mg.bottom;
    const y = d3.scaleLinear().domain([0, Y_MAX]).range([H, 0]);

    // Grid, y labels, unit.
    const ticks = d3.range(0, Y_MAX + 1, narrow ? 2000 : 1000);
    g.append("g").selectAll("line").data(ticks).join("line")
      .attr("x2", W).attr("y1", y).attr("y2", y).attr("stroke", C.grid);
    g.append("g").attr("text-anchor", "end").selectAll("text").data(ticks).join("text")
      .attr("x", -8).attr("y", y).attr("dy", "0.35em").text(num);
    g.append("text").attr("x", -mg.left).attr("y", -12).attr("font-weight", 700).text("milionů povolenek / Mt CO₂eq");

    // Supply stack.
    let base = 0;
    const segs = SUPPLY.map(d => ({ ...d, y0: base, y1: (base += d.value) }));
    segs.forEach(d => {
      const top = y(d.y1), h = y(d.y0) - top;
      const rect = g.append("rect").attr("x", sx).attr("width", sw).attr("y", top).attr("height", h)
        .attr("fill", color(d.group)).attr("stroke", "#fff").attr("stroke-width", 1);
      hover(rect, `<strong>${amount(d.value)} mil. povolenek</strong><br>${d.label}`);
      inside(d.name, d.note, sx, top, sw, h);
    });

    // Brackets: a "[" beside each phase's run of segments, its label to the left.
    GROUPS.forEach(gr => {
      const run = segs.filter(d => d.group === gr.key);
      const top = y(run[run.length - 1].y1) + 1, bottom = y(run[0].y0) - 1, bx = sx - CFG.bracketGap;
      g.append("polyline").attr("fill", "none").attr("stroke", gr.color)
        .attr("points", [[bx + 5, top], [bx, top], [bx, bottom], [bx + 5, bottom]].join(" "));
      const lines = wrapLines(g, words(gr.label), bx - CFG.bracketLabelGap - 2, fs);
      const t = g.append("text").attr("text-anchor", "end").attr("fill", gr.color).attr("font-weight", 700);
      const y0 = (top + bottom) / 2 - ((lines.length - 1) * lh) / 2;
      lines.forEach((line, i) => t.append("tspan").attr("x", bx - CFG.bracketLabelGap).attr("y", y0 + i * lh).attr("dy", "0.35em").text(line));
    });

    // Budget bar.
    const btop = y(BUDGET.value);
    const brect = g.append("rect").attr("x", dx).attr("width", dw).attr("y", btop).attr("height", H - btop).attr("fill", BUDGET.color);
    hover(brect, `<strong>${amount(BUDGET.value)} Mt CO₂eq</strong><br>${BUDGET.label}`);
    inside(BUDGET.name, null, dx, btop, dw, H - btop);

    // Column captions under the bars, their leading words bold.
    captions.forEach(([x, lines, bold]) => {
      const t = g.append("text");
      let seen = 0;   // words on the lines above
      lines.forEach((line, i) => {
        const ts = t.append("tspan").attr("x", x).attr("y", H + CFG.captionGap + i * lh + fs * 0.8);
        const ws = line.split(" "), b = Math.max(0, Math.min(ws.length, bold - seen));
        seen += ws.length;
        if (b) ts.append("tspan").attr("font-weight", 700).text(ws.slice(0, b).join(" "));
        if (b < ws.length) ts.append("tspan").text((b ? " " : "") + ws.slice(b).join(" "));
      });
    });

    // White name inside a block, medium, with an optional light note on its own
    // lines below: top-aligned, centred when tight, and a size or two smaller if
    // that is what it takes to fit a thin segment.
    function inside(name, note, x, top, width, height) {
      const k = CFG.lineHeight;
      const parts = note ? [[name, 500], [note, 300]] : [[name, 500]];
      let size = bfs, lines;
      for (; size > bfs - 3; size--) {
        lines = parts.flatMap(([text, weight]) =>
          wrapLines(g, words(text), width - 2 * pad, size, weight).map(line => [line, weight]));
        if ((lines.length - 1) * size * k + size <= height - 2) break;
      }
      const blockH = (lines.length - 1) * size * k + size;
      const y0 = top + Math.min(pad, (height - blockH) / 2);
      const t = g.append("text").attr("fill", "#fff").attr("font-size", size).attr("pointer-events", "none");
      lines.forEach(([line, weight], i) => t.append("tspan").attr("font-weight", weight)
        .attr("x", x + pad).attr("y", y0 + i * size * k + size * 0.8).text(line));
    }

    // Tooltip on hover, and on tap for touch screens.
    function hover(sel, html) {
      sel.on("pointermove click", ev => {
        tip.html(html).style("display", "block");
        const [px, py] = d3.pointer(ev, el);
        tip.style("left", Math.min(px + 12, el.clientWidth - tip.node().offsetWidth) + "px").style("top", py + 14 + "px");
      }).on("pointerleave", () => tip.style("display", "none"));
    }
  }

  // Words of a label, a one-letter word (v, s, a…) glued to the next one so it never ends a line.
  const words = text => text.replace(/(?<=^|\s)(\p{L}) /gu, "$1\u00a0").split(" ");

  // Splits words into lines no wider than `width`, measured in the chart's font.
  function wrapLines(g, words, width, fs, weight) {
    const probe = g.append("text").attr("font-size", fs).attr("font-weight", weight || null);
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
