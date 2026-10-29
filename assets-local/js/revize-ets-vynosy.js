/* Pravidla pro využití výnosů z dražeb povolenek, for the revize-ets explainer:
 * today all revenue goes to climate and decarbonisation measures; the proposal
 * keeps that frame for 100 % of it but earmarks at least half for decarbonising
 * the ETS sectors. It used to be HTML; as an SVG, chart-download.js can export
 * it. Same layout: two labelled bars, a bracket over the proposal's bar, and
 * under each of its halves what the money goes to (stacked below 440 px).
 *
 * Icons and text wrapping: revize-ets-svg.js. Markup: includes-local/revize-ets-vynosy.html.
 */
(function () {
  const el = document.getElementById("ets-vynosy");
  if (!el || typeof d3 === "undefined" || !window.ETS_SVG) return;

  const C = { navrh: "#3b3b93", dosud: "#75808e" };
  const PRIORITY = [   // where the at-least-half goes
    { icon: "industry", text: "čistá energetika, dekarbonizace a elektrifikace průmyslu" },
    { icon: "plane", text: "letecká a námořní doprava" },
    { icon: "train", text: "přechod na čisté způsoby dopravy" },
    { icon: "trash-can", text: "nově zahrnuté odpadové hospodářství" },
    { icon: "recycle", text: "oběhové hospodářství a podpora nízkouhlíkových produktů" },
    { icon: "ellipsis", text: "a další" },   // the list is not exhaustive
  ];
  const OTHER = [   // examples of what the rest may go to
    { icon: "house", text: "snižování energetické náročnosti budov, podpora obnovitelných systémů vytápění" },
    { icon: "hand-holding-dollar", text: "finanční podpora domácností s nižšími a středními příjmy" },
    { icon: "cloud-arrow-down", text: "zachytávání CO₂" },
    { icon: "cloud-sun-rain", text: "opatření na přizpůsobení se změnám klimatu" },
  ];

  // Redraws whenever the container's width changes; also fires once on observe — the first draw.
  let w = 0;
  new ResizeObserver(() => { if (el.clientWidth !== w) { w = el.clientWidth; draw(); } }).observe(el);

  function draw() {
    // viewBox = rendered width, so text keeps its pixel size (charts guideline).
    const W = el.clientWidth;
    if (!W) return;
    const narrow = W < 440;   // phones; the desktop chart at 0.8 of the column is ~500 px
    const fs = narrow ? 13 : 14.4, head = narrow ? 15 : 16, lh = 1.3;
    const barH = narrow ? 32 : 40, pad = 10, r = 12.8, GAP = 2;

    d3.select(el).selectAll("svg").remove();
    const svg = d3.select(el).append("svg").attr("id", "ets-vynosy-svg")   // chart-download.js finds it by id
      .attr("role", "img")
      .attr("aria-label", "Dosud: 100 % výnosů z dražeb povolenek na klimatická a dekarbonizační opatření. " +
        "Návrh revize: 100 % v souladu s klimatickými cíli EU, z toho nejméně 50 % na dekarbonizaci sektorů v ETS (" +
        PRIORITY.map(p => p.text).join(", ") + "), zbytek na další klimatická a dekarbonizační opatření, například " + OTHER.map(p => p.text).join(", ") + ".");
    const g = svg.append("g").attr("transform", "translate(0,4)");
    const { wrap, line, done } = ETS_SVG.text(g);

    // A bar with white text inside (runs, see revize-ets-svg.js), as tall as the text needs; returns its bottom.
    function bar(x, top, width, color, runs) {
      const lines = wrap(runs, width - 2 * pad, fs);
      const h = Math.max(barH, lines.length * fs * lh + 12);
      g.append("rect").attr("x", x).attr("y", top).attr("width", width).attr("height", h).attr("fill", color);
      const first = top + h / 2 - (lines.length - 1) * fs * lh / 2 + fs * 0.35;
      lines.forEach((runs, i) => line(x + pad, first + i * fs * lh, runs, fs, "#fff"));
      return top + h;
    }

    // Dosud.
    let y = fs;
    line(0, y, [["DOSUD", 0]], fs, C.dosud);
    y = bar(0, y + 8, W, C.dosud, [["100 % na klimatická a dekarbonizační opatření", 1], ["i mimo ETS sektory", 300]]) + 36;

    // Návrh revize: title, the bracket's text and bracket, the split bar.
    line(0, y, [["NÁVRH REVIZE", 1]], fs, C.navrh);
    y += 8;
    wrap([["100 % výnosů v souladu s klimatickými cíli EU, bez prodlužování závislosti na fosilních palivech", 0]], W, fs)
      .forEach(runs => { y += fs * lh; line(0, y, runs, fs, C.navrh); });
    y += 8;
    g.append("polyline").attr("fill", "none").attr("stroke", C.navrh)
      .attr("points", [[0.5, y + 6], [0.5, y], [W - 0.5, y], [W - 0.5, y + 6]].join(","));
    y += 10;
    const half = (W - GAP) / 2;
    y = Math.max(bar(0, y, half, C.navrh, [["nejméně 50 %", 1]]), bar(half + GAP, y, half, C.dosud, [["zbytek", 1]])) + 14;

    // What each half pays for: side by side under its half, stacked on a phone.
    const colW = narrow ? W : half - 16;
    const left = column(0, y, colW, "Dekarbonizace sektorů v ETS", C.navrh, PRIORITY, ", především:");
    const right = narrow ? column(0, left + 12, colW, "Další klimatická a dekarbonizační opatření", C.dosud, OTHER, ", například:")
      : column(half + GAP, y, colW, "Další klimatická a dekarbonizační opatření", C.dosud, OTHER, ", například:");

    done();
    svg.attr("viewBox", [0, 0, W, Math.ceil(Math.max(left, right) + 8)]);

    // A heading, bold but for its regular ending (", například:"), and the icon list; returns the bottom.
    function column(x0, top, width, title, color, items, ending) {
      let yy = top;
      wrap([[title, 1], [ending, 0]], width, head).forEach(runs => { yy += head * lh; line(x0, yy, runs, head, color); });
      yy += 10;
      items.forEach(it => {
        const cy = yy + r, tx = x0 + 2 * r + 8;
        ETS_SVG.badge(g, it.icon, x0 + r, cy, r, color);
        const lines = wrap([[it.text, 0]], width - (tx - x0), fs);
        // First line centred on the icon, the rest below it.
        lines.forEach((runs, i) => line(tx, cy + fs * 0.35 + i * fs * lh, runs, fs, color));
        yy = Math.max(yy + 2 * r, cy + fs * lh / 2 + (lines.length - 1) * fs * lh) + 8;
      });
      return yy;
    }
  }
})();
