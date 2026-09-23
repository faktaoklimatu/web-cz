/* Free allocation vs verified emissions in the EU ETS — two panels for the
 * CBAM explainer, drawn in the same encoding as the ETS dashboard: one bar per
 * year for verified emissions, the share free allocation does not cover laid
 * over its top, a stepped marker at the allocation level, and a hatched block
 * where allocation ran past emissions.
 *
 * Data: _data/cbam-povolenky-zdarma.yaml (EEA, Union Registry, July 2026).
 */
(function () {
  const DATA = window.CBAM_POVOLENKY;
  if (!DATA || typeof d3 === "undefined") return;

  // Kept in step with the custom properties in assets-local/_cbam-charts.scss,
  // which the legend swatches read; the SVG cannot use those directly.
  const C = {
    emissions: "#1b4c6f",
    uncovered: "#8ba1b1",
    hatchBg: "#fffafa",
    hatch: "#ff9c66",
    line: "#000000",
    halo: "#ffffff",
    haloWidth: 1.5,
    lineWidth: 3.5,
    barPadding: 0.26,
    grid: "#edf2f7",
    axisText: "#718096",
    axisFontSize: 13,
  };

  const TICKS = 5;   // shared by nice() and ticks() — see the y scale below
  const PANELS = [
    { key: "total", svg: "cbam-svg-total" },
    { key: "industry", svg: "cbam-svg-industry" },
  ];

  function fmt(n) {
    const abs = Math.abs(n);
    if (abs >= 1e6) return d3.format(".1f")(abs / 1e6).replace(".", ",") + " Mt";
    if (abs >= 1e3) return d3.format(".1f")(abs / 1e3).replace(".", ",") + " kt";
    return d3.format(",")(abs) + " t";
  }
  const fmtShort = n => (n >= 1e6 ? Math.round(n / 1e6) + " mil." : Math.round(n / 1e3) + " tis.");

  const tip = document.getElementById("cbam-tooltip");
  function showTip(ev, html) { tip.innerHTML = html; tip.style.display = "block"; moveTip(ev); }
  function moveTip(ev) {
    tip.style.left = Math.min(ev.clientX + 14, window.innerWidth - tip.offsetWidth - 8) + "px";
    tip.style.top = Math.max(ev.clientY - tip.offsetHeight - 12, 8) + "px";
  }
  function hideTip() { tip.style.display = "none"; }

  function addHatch(defs, id, scale) {
    const s = 6 * (scale || 1);
    defs.append("pattern")
      .attr("id", id).attr("width", s).attr("height", s)
      .attr("patternUnits", "userSpaceOnUse").attr("patternTransform", "rotate(45)")
      .call(p => {
        p.append("rect").attr("width", s).attr("height", s).attr("fill", C.hatchBg);
        p.append("line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", s)
          .attr("stroke", C.hatch).attr("stroke-width", 4.75 * (scale || 1));
      });
  }
  // The marker is stroked twice, a wider halo first, so it keeps a margin
  // against the bar it sits on.
  const markerPasses = () => [[C.halo, C.lineWidth + C.haloWidth * 2], [C.line, C.lineWidth]];

  function render(panel) {
    const svgEl = document.getElementById(panel.svg);
    if (!svgEl) return;
    const W0 = svgEl.clientWidth, H0 = svgEl.clientHeight;
    if (!W0 || !H0) return;

    const rows = DATA.series[panel.key];
    const mg = { top: 24, right: 8, bottom: 26, left: 62 };
    const W = W0 - mg.left - mg.right, H = H0 - mg.top - mg.bottom;

    d3.select(svgEl).selectAll("*").remove();
    const defs = d3.select(svgEl).append("defs");
    addHatch(defs, "cbam-hatch-" + panel.key);
    const svg = d3.select(svgEl).append("g").attr("transform", `translate(${mg.left},${mg.top})`);

    const years = rows.map(r => r[0]);
    const byYear = new Map(rows.map(r => [r[0], { e: r[1], a: r[2] }]));
    const maxVal = d3.max(rows, r => Math.max(r[1], r[2])) || 1;
    const x = d3.scaleBand().domain(years).range([0, W]).padding(C.barPadding);
    // nice() takes the SAME count as ticks(): left to its default of 10 it
    // rounds the domain onto a finer grid than the labels use, so the top
    // label can land below the plot edge in one panel and exactly on it in
    // the other — which reads as two different gaps under the unit caption.
    const y = d3.scaleLinear().domain([0, maxVal * 1.05]).range([H, 0]).nice(TICKS);

    svg.append("g")
      .call(d3.axisLeft(y).tickSize(-W).tickFormat("").ticks(TICKS))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", C.grid));

    svg.selectAll(".bar").data(years).join("rect")
      .attr("x", yr => x(yr)).attr("y", yr => y(byYear.get(yr).e))
      .attr("width", x.bandwidth()).attr("height", yr => H - y(byYear.get(yr).e))
      .attr("fill", C.emissions);

    svg.selectAll(".unc")
      .data(years.filter(yr => byYear.get(yr).e > byYear.get(yr).a)).join("rect")
      .attr("x", yr => x(yr)).attr("y", yr => y(byYear.get(yr).e))
      .attr("width", x.bandwidth())
      .attr("height", yr => y(byYear.get(yr).a) - y(byYear.get(yr).e))
      .attr("fill", C.uncovered);

    svg.selectAll(".sur")
      .data(years.filter(yr => byYear.get(yr).a > byYear.get(yr).e)).join("rect")
      .attr("x", yr => x(yr)).attr("y", yr => y(byYear.get(yr).a))
      .attr("width", x.bandwidth())
      .attr("height", yr => y(byYear.get(yr).e) - y(byYear.get(yr).a))
      .attr("fill", `url(#cbam-hatch-${panel.key})`);

    // Allocation as one staircase: treads widened by half the bar gap so
    // consecutive years meet exactly and each riser is a single vertical line.
    const gap = x.step() - x.bandwidth();
    let d = "";
    years.forEach((yr, i) => {
      const lvl = y(byYear.get(yr).a);
      d += (i === 0 ? `M${x(yr) - gap / 2},${lvl}` : `V${lvl}`) +
           `H${x(yr) + x.bandwidth() + gap / 2}`;
    });
    markerPasses().forEach(([stroke, width]) => {
      svg.append("path").attr("d", d).attr("fill", "none")
        .attr("stroke", stroke).attr("stroke-width", width).attr("stroke-linejoin", "miter");
    });

    svg.selectAll(".hover").data(years).join("rect")
      .attr("x", yr => x(yr)).attr("y", 0)
      .attr("width", x.bandwidth()).attr("height", H).attr("fill", "transparent")
      .on("mouseover", (ev, yr) => {
        const v = byYear.get(yr);
        const share = v.e > 0 ? Math.round(v.a / v.e * 100) + " %" : "—";
        showTip(ev, `<strong>${yr}</strong><br>` +
          `Ověřené emise: <strong>${fmt(v.e)}</strong><br>` +
          `Povolenky zdarma: <strong>${fmt(v.a)}</strong><br>` +
          `Pokrytí emisí povolenkami zdarma: <strong>${share}</strong>`);
      })
      .on("mousemove", moveTip).on("mouseout", hideTip);

    // Only multiples of five are labelled — 21 years of ticks is more than the
    // axis needs, and it matches the figure this replaces.
    const ticks = years.filter(yr => yr % 5 === 0);
    svg.append("g").attr("transform", `translate(0,${H})`)
      .call(d3.axisBottom(x).tickValues(ticks).tickFormat(d3.format("d")))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").remove())
      .call(g => g.selectAll(".tick text")
        .attr("font-size", C.axisFontSize + "px").attr("fill", C.axisText));

    const leftAxis = svg.append("g")
      .call(d3.axisLeft(y).ticks(TICKS).tickFormat(fmtShort))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", C.grid))
      .call(g => g.selectAll(".tick text")
        .attr("font-size", C.axisFontSize + "px").attr("fill", C.axisText));

    // Unit caption flush with the left edge of the widest tick label.
    const lefts = [];
    leftAxis.selectAll(".tick text").each(function () { lefts.push(this.getBBox().x); });
    svg.append("text")
      .attr("x", lefts.length ? Math.min(...lefts) : -mg.left + 2).attr("y", -10)
      .attr("font-size", C.axisFontSize + "px").attr("font-weight", "700")
      .attr("fill", C.axisText)
      .text("Povolenky / tuny CO₂");
  }

  function renderLegendSwatches() {
    document.querySelectorAll("#cbam-charts .legend-swatch.hatch-light").forEach((el, i) => {
      el.innerHTML = "";
      const id = "cbam-hatch-legend-" + i;
      const svg = d3.select(el).append("svg").attr("width", "100%").attr("height", "100%");
      addHatch(svg.append("defs"), id, 0.7);
      svg.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", `url(#${id})`);
    });
  }

  const drawAll = () => { renderLegendSwatches(); PANELS.forEach(render); };
  drawAll();
  window.addEventListener("resize", drawAll);
})();
