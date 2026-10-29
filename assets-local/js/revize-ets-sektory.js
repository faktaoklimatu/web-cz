/* Rozšíření ETS o další sektory, for the revize-ets explainer: EU emissions in
 * 2024 split into ETS1 today, what the revision adds to it, ETS2 and the rest,
 * with the sectors under the two ETS1 parts. It used to be an HTML bar
 * (emise-ets-bar.html); as an SVG, chart-download.js can export it. Same
 * layout: the bar, a label under each part, and two sector lists, each as wide
 * as the ETS1-today part. Below 560 px the labels and lists stack.
 *
 * Icons and text wrapping: revize-ets-svg.js. Markup: includes-local/revize-ets-sektory.html.
 */
(function () {
  const el = document.getElementById("ets-sektory");
  if (!el || typeof d3 === "undefined" || !window.ETS_SVG) return;

  // Hodnoty v Mt CO2eq, 2024. align: kam se zarovná popisek pod dílem.
  // items: sektory pod dílem; runs = [[text, tučně?], …], note = menší řádek pod nimi.
  const DATA = [
    { label: "ETS1 nyní", value: 1186.5, color: "#6c6cd6", align: "left", items: [
      { icon: "bolt", runs: [["Výroba elektřiny a tepla", 1]] },
      { icon: "industry", runs: [["Průmysl", 1]] },
      { icon: "plane", runs: [["Lety v rámci Evropského hospodářského prostoru (EHP) + Velká Británie a Švýcarsko", 1]] },
      { icon: "ship", runs: [["Lodě s tonáží 5 000 a vyšší", 1]],
        note: "Při plavbách v rámci EU se u nich započítává 100 % emisí, při plavbách mezi EU a třetími zeměmi pak 50 % emisí." },
    ] },
    { label: "ETS1 nově", prefix: "+ ", value: 66.2, color: "#3b3b93", align: "left", items: [
      { icon: "plane", runs: [["Lety z EHP do třetích zemí v okruhu 5 tisíc kilometrů", 1], ["od letiště ve Frankfurtu", 0], ["+ veškeré soukromé lety", 1]],
        note: "Od roku 2029." },
      { icon: "ship", runs: [["Lodě s tonáží 400–5 000", 1]] },
      { icon: "trash-can", runs: [["Spalování komunálního odpadu", 1]],
        note: "Postupné zahrnutí mezi lety 2031–2034." },
    ] },
    { label: "ETS2", value: 1261, color: "#75808e", align: "right" },   // grey of the budget bar in the Öko-Institut chart
    { label: "Mimo ETS", value: 529.3, color: "#b5b8bd", align: "right" },
  ];
  const total = d3.sum(DATA, d => d.value);
  const pct = v => (v / total * 100).toFixed(1).replace(".", ",") + " %";

  // Redraws whenever the container's width changes; also fires once on observe — the first draw.
  let w = 0;
  new ResizeObserver(() => { if (el.clientWidth !== w) { w = el.clientWidth; draw(); } }).observe(el);

  function draw() {
    // viewBox = rendered width, so text keeps its pixel size (charts guideline).
    const W = el.clientWidth;
    if (!W) return;
    const narrow = W < 560;
    const S = narrow
      ? { barH: 28, label: 14, item: 14, note: 12, r: 11 }
      : { barH: 40, label: 16, item: 15, note: 12.5, r: 12 };
    const LH = 1.3, GAP = 2, ICON_GAP = 10, ITEM_GAP = 10, COL_PAD = 16;
    const TOP = 8;   // air above the bar, so the exported file does not start on its edge

    d3.select(el).selectAll("svg, .tip").remove();
    const svg = d3.select(el).append("svg").attr("id", "ets-sektory-svg")   // chart-download.js finds it by id
      .attr("role", "img")
      .attr("aria-label", "Emise EU v roce 2024: " + DATA.map(d => `${d.label} ${pct(d.value)}`).join(", ") +
        ". ETS1 nově přidá " + DATA[1].items.map(it => it.runs.map(r => r[0]).join(" ")).join("; ") + ".");
    const g = svg.append("g").attr("transform", `translate(0,${TOP})`);
    const tip = d3.select(el).append("div").attr("class", "tip");
    const { wrap, line, done } = ETS_SVG.text(g);

    // The bar: parts in proportion to their emissions, 2 px apart.
    const unit = (W - GAP * (DATA.length - 1)) / total;
    let x = 0;
    const parts = DATA.map(d => { const p = { ...d, x, w: d.value * unit }; x += p.w + GAP; return p; });
    parts.forEach(p => {
      g.append("rect").attr("x", p.x).attr("width", Math.max(p.w, 2)).attr("height", S.barH).attr("fill", p.color)
        .on("pointermove click", ev => {
          tip.html(`<strong>${p.label}</strong><br>${d3.format(",.0f")(p.value).replace(/,/g, " ")} Mt CO₂eq (${pct(p.value)})`)
            .style("display", "block");
          const [px, py] = d3.pointer(ev, el);
          tip.style("left", Math.min(px + 12, W - tip.node().offsetWidth) + "px").style("top", py + 14 + "px");
        })
        .on("pointerleave", () => tip.style("display", "none"));
    });

    let y = S.barH + 10;
    if (narrow) {
      // One line per part, "name — share", then each list under its part's name.
      parts.forEach((p, i) => line(0, y + S.label * (1 + i * LH), [[(p.prefix || "") + p.label, 1], [" — " + pct(p.value), 0]], S.label, p.color));
      y += S.label * (1 + (parts.length - 1) * LH) + 14;
      parts.filter(p => p.items).forEach(p => {
        y += 10 + S.label;
        line(0, y, [[(p.prefix || "") + p.label, 1]], S.label, p.color);
        y = list(p, 0, W, y + 10);
      });
    } else {
      // Name and share under each part, flush with its left or right edge.
      parts.forEach(p => {
        const right = p.align === "right", lx = right ? p.x + p.w : p.x;
        line(lx, y + S.label, [[(p.prefix || "") + p.label, 1]], S.label, p.color, right ? "end" : null);
        line(lx, y + S.label * (1 + LH), [[pct(p.value), 0]], S.label, p.color, right ? "end" : null);
      });
      // Sector lists side by side, each as wide as the ETS1-today part.
      const listW = parts[0].w, top = y + S.label * (1 + LH) + 28;
      y = d3.max(parts.filter(p => p.items), p => list(p, p.x, listW, top));
    }

    done();
    svg.attr("viewBox", [0, 0, W, Math.ceil(TOP + y + 4)]);

    // Items of one part from `top` down, in a column `width` wide at x0; returns the bottom.
    function list(p, x0, width, top) {
      const tx = 2 * S.r + ICON_GAP, textW = width - tx - COL_PAD;
      let yt = top;
      p.items.forEach(it => {
        const cy = yt + S.r;
        ETS_SVG.badge(g, it.icon, x0 + S.r, cy, S.r, p.color);
        // First line centred on the icon, the note in smaller type under the text.
        const lines = wrap(it.runs, textW, S.item);
        lines.forEach((runs, i) => line(x0 + tx, cy + S.item * 0.35 + i * S.item * LH, runs, S.item, p.color));
        let bottom = cy + S.item * LH / 2 + (lines.length - 1) * S.item * LH;
        if (it.note) {
          const notes = wrap([[it.note, 0]], textW, S.note);
          notes.forEach((runs, i) => line(x0 + tx, bottom + S.note * (1 + i * LH), runs, S.note, p.color));
          bottom += 4 + notes.length * S.note * LH;
        }
        yt = Math.max(yt + 2 * S.r, bottom) + ITEM_GAP;
      });
      return yt - ITEM_GAP;
    }
  }
})();
