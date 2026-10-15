/* Bezplatné povolenky pro odvětví pod CBAM, 2025–2038, for the revize-ets
 * explainer: the CBAM factor — the share of their benchmark free allocation
 * that producers of CBAM goods still receive — under current law (grey) and
 * under the proposed revision (blue), which stretches the phase-out from 2034
 * to 2038. The axis marks the year each line reaches zero in its colour.
 *
 * Data: /assets-local/files/revize-ets/cbam-faktor.csv (sheet "2026 CBAM
 * explainer", list "CBAM factor": ETS directive Art. 10a(1a) and the 2026
 * proposal). Markup: includes-local/revize-ets-bezplatne.html.
 */
(function () {
  const el = document.getElementById("ets-bezplatne");
  if (!el || typeof d3 === "undefined") return;

  const C = { grid: "#e6e6e6", text: "#515b66" };
  const SERIES = [   // drawn in this order, so the revision ends up on top
    { key: "povolenky_zdarma", color: "#75808e", width: 2.5, label: "Původní plán" },
    { key: "povolenky_zdarma_revize", color: "#3b3b93", width: 3.5, label: "Návrh revize" },
  ];
  const Y_TICKS = [0, 25, 50, 75, 100];
  const pct = v => String(v).replace(".", ",") + " %";

  // A blank cell comes after its series has reached zero: no free allocation.
  const val = s => (s === "" ? null : +s);
  d3.csv(el.dataset.src, r => ({
    rok: +r.rok,
    povolenky_zdarma: val(r.povolenky_zdarma),
    povolenky_zdarma_revize: val(r.povolenky_zdarma_revize),
  })).then(rows => {
    // Redraws whenever the container's width changes; also fires once on observe — the first draw.
    let w = 0;
    new ResizeObserver(() => {
      if (el.clientWidth !== w) { w = el.clientWidth; draw(rows); }
    }).observe(el);
  });

  function draw(rows) {
    // viewBox = rendered width, so text keeps its pixel size (charts guideline).
    const W0 = el.clientWidth;
    if (!W0) return;
    const narrow = W0 < 440;   // phones; the desktop chart at 0.8 of the column is ~500 px
    const fs = narrow ? 11 : 13;
    const H0 = narrow ? 320 : 266;
    const mg = { top: 28, right: 14, bottom: 32, left: narrow ? 38 : 46 };
    const W = W0 - mg.left - mg.right, H = H0 - mg.top - mg.bottom;

    const first = rows[0].rok, last = rows[rows.length - 1].rok;
    const byYear = new Map(rows.map(r => [r.rok, r]));
    const x = d3.scaleLinear().domain([first, last]).range([0, W]);
    const y = d3.scaleLinear().domain([0, 100]).range([H, 0]);
    const zeroYear = key => (rows.find(r => r[key] === 0) || {}).rok;

    d3.select(el).selectAll("svg, .tip").remove();
    const svg = d3.select(el).append("svg").attr("id", "ets-bezplatne-svg")   // chart-download.js finds it by id
      .attr("viewBox", [0, 0, W0, H0])
      .attr("role", "img")
      .attr("aria-label", `Podíl povolenek zdarma pro odvětví v CBAM: podle současných pravidel klesne na nulu ` +
        `v roce ${zeroYear(SERIES[0].key)}, podle návrhu revize v roce ${zeroYear(SERIES[1].key)}.`);
    const g = svg.append("g").attr("transform", `translate(${mg.left},${mg.top})`)
      .attr("font-size", fs).attr("fill", C.text);

    // Grid, y labels, unit.
    g.append("g").selectAll("line").data(Y_TICKS).join("line")
      .attr("x2", W).attr("y1", y).attr("y2", y).attr("stroke", C.grid);
    g.append("g").attr("text-anchor", "end").selectAll("text").data(Y_TICKS).join("text")
      .attr("x", -8).attr("y", y).attr("dy", "0.35em").text(pct);
    g.append("text").attr("x", -mg.left).attr("y", -14).attr("font-weight", 700)
      .text("Podíl povolenek zdarma pro odvětví v CBAM");

    // Note in the empty top right, on a white box that hides the grid lines.
    const note = g.append("text").attr("text-anchor", "end");
    [
      [["Povolenky zdarma nahrazuje "], ["CBAM", 700], [","]],
      [["který pokrývá emisně náročné dovozy"]],
      [["ze zemí mimo EU"]],
    ].forEach((runs, i) => {
      const line = note.append("tspan").attr("x", W).attr("y", y(100) + fs + (i + 2) * fs * 1.3);
      runs.forEach(([t, weight]) => line.append("tspan").attr("font-weight", weight || null).text(t));
    });
    const box = note.node().getBBox();
    g.insert("rect", () => note.node())
      .attr("x", box.x - 6).attr("y", box.y - 4).attr("width", box.width + 12).attr("height", box.height + 8)
      .attr("fill", "#fff");

    // Lines with a dot per year.
    SERIES.forEach(s => {
      const pts = rows.filter(r => r[s.key] !== null);
      g.append("path").attr("d", d3.line().x(r => x(r.rok)).y(r => y(r[s.key]))(pts))
        .attr("fill", "none").attr("stroke", s.color).attr("stroke-width", s.width).attr("stroke-linejoin", "round");
      g.append("g").attr("fill", s.color).selectAll("circle").data(pts).join("circle")
        .attr("cx", r => x(r.rok)).attr("cy", r => y(r[s.key])).attr("r", narrow ? 2.5 : 3);
    });

    // Direct labels: the original plan under both lines on the left, where the
    // plot is empty; the revision above its 15 % plateau.
    label(g, x(first + 4.6), y(45), SERIES[0], "end");
    label(g, x(last - 2.5), y(15) - 12, SERIES[1], "middle");

    // X axis: every other year (the even ones, so both zero years are among them),
    // each line's zero year bold in its colour.
    const zeros = SERIES.map(s => ({ rok: zeroYear(s.key), color: s.color })).filter(z => z.rok);
    const base = d3.range(first, last + 1).filter(r => r % 2 === 0);
    const ticks = base.filter(t => !zeros.some(z => z.rok === t)).map(rok => ({ rok, color: C.text, bold: false }))
      .concat(zeros.map(z => ({ rok: z.rok, color: z.color, bold: true })));
    const xt = g.append("g").attr("transform", `translate(0,${H})`).attr("text-anchor", "middle")
      .selectAll("g").data(ticks).join("g").attr("transform", t => `translate(${x(t.rok)},0)`);
    xt.append("line").attr("y1", 4).attr("y2", 9).attr("stroke", t => t.color).attr("stroke-width", t => (t.bold ? 1.5 : 1));
    xt.append("text").attr("y", 24).attr("fill", t => t.color).attr("font-weight", t => (t.bold ? 700 : null)).text(t => t.rok);

    // Hover: a guide line and the year's values.
    const tip = d3.select(el).append("div").attr("class", "tip");
    const guide = g.append("line").attr("y2", H).attr("stroke", C.text).attr("stroke-dasharray", "2,3").style("display", "none");
    g.append("rect").attr("width", W).attr("height", H).attr("fill", "transparent")
      .on("pointermove click", ev => {
        const [mx] = d3.pointer(ev);
        const r = byYear.get(Math.max(first, Math.min(last, Math.round(x.invert(mx)))));
        guide.attr("x1", x(r.rok)).attr("x2", x(r.rok)).style("display", null);
        const lines = SERIES.slice().reverse()
          .map(s => `<span style="color:${s.color}">${s.label}:</span> <strong>${pct(r[s.key] ?? 0)}</strong>`).join("<br>");
        tip.html(`<strong>${r.rok}</strong><br>${lines}`).style("display", "block");
        const tw = tip.node().offsetWidth, px = mg.left + x(r.rok);
        tip.style("left", (px + 12 + tw > W0 ? px - 12 - tw : px + 12) + "px").style("top", mg.top + 8 + "px");
      })
      .on("pointerleave", () => { guide.style("display", "none"); tip.style("display", "none"); });
  }

  // Bold series name with a white halo, so it stays legible over grid lines.
  function label(g, x, y, s, anchor) {
    g.append("text").attr("x", x).attr("y", y).attr("text-anchor", anchor)
      .attr("fill", s.color).attr("font-weight", 700)
      .attr("paint-order", "stroke").attr("stroke", "#fff").attr("stroke-width", 4).attr("stroke-linejoin", "round")
      .text(s.label);
  }
})();
