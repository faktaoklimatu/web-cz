// Filter 
const controls = document.getElementById("controls-status");
const ignoreContainer = document.getElementById("highlights-dashboard-teplaren");

controls.addEventListener("change", e => {
  if (!e.target.matches("input[type='checkbox']")) return;

  const checkbox = e.target;
  const statusClass = checkbox.closest(".form-check").classList
    .value
    .split(" ")
    .find(c => c.startsWith("status-"));

  document.querySelectorAll("." + statusClass).forEach(el => {
    if (controls.contains(el)) return;          // keep controls
    if (ignoreContainer?.contains(el)) return;  // keep highlights
    el.style.display = checkbox.checked ? "" : "none";
  });
});

// Import YAML data
const { highlights, facilities } = window.DASHBOARD_TEPLAREN;

// COLOR SCHEME
const statusColor = new Map([
    ["done", "#0085b6"],
    ["in-progress", "#ffbc5b"],
    ["problematic", "#bb2719"],
    ["not-shown", "#999"],
]);

////////////////////
// GENERATE TREE MAP
////////////////////

if (!highlights || !Array.isArray(highlights)) {
  console.error("DASHBOARD_TEPLAREN.highlights is missing or not an array", window.DASHBOARD_TEPLAREN);
  // stop; nothing to render
  throw new Error("Missing highlights");
}

const treeMapContainer = document.querySelector("#treemap");
if (!treeMapContainer) {
  console.error("Treemap container #treemap not found");
  throw new Error("Missing #treemap");
}

const treeMapSVG = d3.select(treeMapContainer)
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("preserveAspectRatio", "none");

function renderTreeMap() {
  const width = Math.floor(treeMapContainer.clientWidth);
  const height = Math.floor(treeMapContainer.clientHeight);
  if (!width || !height) return;

  // match the actual container size
  treeMapSVG.attr("viewBox", `0 0 ${width} ${height}`);

  const root = d3.hierarchy({ name: "root", children: highlights })
    .sum(d => d.num_households ?? 0)
    .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

  const totalHouseholds = d3.sum(highlights, d => d.num_households ?? 0);
  const fmtPct = d3.format(".1f");

  d3.treemap()
    .size([width, height])
    .paddingInner(2)
    .round(true)(root);

  const leaves = root.leaves();

  const cell = treeMapSVG.selectAll("g.cell")
    .data(leaves, d => d.data.status)
    .join(
      enter => {
        const g = enter.append("g").attr("class", "cell");
        g.append("rect");
        g.append("title");
        g.append("text").attr("class", "status");
        g.append("text").attr("class", "pctHouseholds");
        return g;
      }
    )
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

  cell.select("rect")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => statusColor.get(d.data.status));

  cell.select("title")
    .text(d => `${d.data.status}: ${fmtPct((d.value / totalHouseholds) * 100)}%`);

  cell.each(function(d) {
    const w = d.x1 - d.x0, h = d.y1 - d.y0;
    const g = d3.select(this);

    const showStatus = (w > 90 && h > 28);
    const showPct    = (w > 60 && h > 46);

    const statusLabel = {
        "done": "Bez uhlí",
        "in-progress": "Odchod probíhá",
        "problematic": "Nejasné",
        "not-shown": "Nezobrazujeme"
    }

    const suffixInProgress =
    "domácností (připojených na CZT) je napojených na teplárny kde odchod od uhlí probíhá, nebo je naplánovaný";

    g.select("text.status")
        .attr("x", 12).attr("y", 26)
        .style("display", showStatus ? null : "none")
        .text(statusLabel[d.data.status] ?? d.data.status);

    let pctHouseholdsLabel;
    {
    const pct = `${fmtPct((d.value / totalHouseholds) * 100)}%`;
    pctHouseholdsLabel =
        d.data.status === "in-progress"
        ? `${pct} ${suffixInProgress}`
        : pct;
    }

    const pctSel = g.select("text.pctHouseholds")
        .attr("x", 12)
        .attr("y", 46)
        .style("display", showPct ? null : "none")
        .text(pctHouseholdsLabel);

    // Only wrap when visible AND when it's the long variant
    if (showPct && d.data.status === "in-progress") {
        pctSel.call(wrapText, d.x1 - d.x0 - 24);
    }
  });
}

renderTreeMap();

let rafId = 0;
const ro = new ResizeObserver(() => {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    rafId = 0;
    renderTreeMap();
  });
});
ro.observe(treeMapContainer);

/////////////////////
// GENERATE CZECH MAP
/////////////////

async function initCzechFacilitiesMap() {
    const container = d3.select("#map");
    if (container.empty()) {
        console.error("Container #map not found");
        return;
    }

    // Build SVG inside the DIV
    const svg = container.append("svg")
        .attr("width", "100%")
        .attr("height", "100%") 
        .attr("viewBox", "0 0 900 520")
        .attr("preserveAspectRatio", "xMidYMid meet");

    const gMap = svg.append("g").attr("class", "cz");
    const gPts = svg.append("g").attr("class", "facilities");
    gPts.attr("font-family", "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif");
    gPts.attr("fill", "#111");

    // Load CZ GeoJSON
    let cz;
    try {
        cz = await d3.json("/assets-local/files/cz-map.json");
    } catch (e) {
        console.error("Failed to load CZ map GeoJSON", e);
    return;
    }

    // Parse + keep only valid lon/lat
    const pts = facilities
        .map(d => {
            const lon = +String(d.lon).replace(",", ".");
            const lat = +String(d.lat).replace(",", ".");
            const num = +String(d.num_households ?? 0).replace(",", ".");
            return { ...d, lon, lat, num_households: num };
        })
        .filter(d => Number.isFinite(d.lon) && Number.isFinite(d.lat));

    // Fit projection to the map
    const vb = svg.attr("viewBox").split(" ").map(Number);
    const width = vb[2], height = vb[3];
    const padding = 100;

    const projection = d3.geoMercator().fitExtent(  [[0, 0], [width - padding, height]],  cz);
    const path = d3.geoPath(projection);

    // Draw map
    gMap.selectAll("path")
        .data(cz.features ?? [cz])
        .join("path")
        .attr("d", path)
        .attr("fill", "#e8eef6")
        .attr("stroke", "#3a3a3a")
        .attr("stroke-width", 0.8);

    // Project points (and drop any that can’t be projected)
    const projected = pts
        .map(d => ({ ...d, xy: projection([d.lon, d.lat]) }))
        .filter(d => d.xy && Number.isFinite(d.xy[0]) && Number.isFinite(d.xy[1]));

    // Radius scale by num_households (sqrt looks best for bubbles)
    const r = d3.scaleSqrt()
        .domain(d3.extent(projected, d => d.num_households))
        .range([3, 25]); // tweak

    // Helper: turn facility name into an in-page anchor id, e.g. "Olomouc" -> "olomouc"
    function slugifyAnchor(s) {
        return String(s)
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // remove diacritics
            .replace(/&/g, " and ")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    // Draw clickable facilities (circle + two-line label)
    const facilityLink = gPts.selectAll("a.facility")
        .data(projected, d => d.name)
        .join(
            enter => {
            const a = enter.append("a").attr("class", d => `facility status-${d.status}`);
            a.append("circle");
            a.append("text").attr("class", "facility-name");
            return a;
        },
        update => update,
        exit => exit.remove()
        )
        .attr("href", d => `#${slugifyAnchor(d.name)}`);

    facilityLink.select("circle")
        .attr("cx", d => d.xy[0])
        .attr("cy", d => d.xy[1])
        .attr("r", d => r(d.num_households))
        .attr("fill", d => statusColor.get(d.status) ?? "#555")
        .attr("fill-opacity", 0.75)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);

    // Label positioning
    const labelGap = 1; 

    // Custom label positions
    const labelOffsetOverride = {
        "otrokovice": { dx: -20, dy: 30 },
        "valasske-mezirici": { dx: 5, dy: 15 },
        "frydek-mistek": { dx: -15, dy: 32 },
        "ostrava": { dx: -50, dy: -5 },
        "karvina": { dx: 2, dy: 15 },
        "detmarovice": { dx: 0, dy: 1 },
        "vresova": { dx: -2, dy: 30 },
        "prunerov": { dx: -10, dy: 35 },
        "tusimice": { dx: 1, dy: 10 },
        "chvaletice": { dx: -10, dy: 25 },
        "praha-pravy-breh-vltavy": { dx: -20, dy: 65 },
    };
    function getLabelOffset(d) {
        const key = slugifyAnchor(d.name); 
        return labelOffsetOverride[key] ?? { dx: labelGap, dy: 0 };
    }

    facilityLink.select("text.facility-name")
        .attr("x", d => {
            const off = getLabelOffset(d);
            return d.xy[0] + r(d.num_households) + off.dx;
        })
        .attr("y", d => {
            const off = getLabelOffset(d);
            return d.xy[1] - r(d.num_households) + off.dy;
        })
        .text(d => d.name);

    // Tooltip on hover
    facilityLink.selectAll("title").remove();
    facilityLink.append("title")
        .text(d => `${d.name} — ${d.num_households.toLocaleString("cs-CZ")} domácností`);
}

initCzechFacilitiesMap();

//
// Text wrapping function (Mike Bostock–style)
//

function wrapText(text, width) {
  text.each(function () {
    const textSel = d3.select(this);
    const words = textSel.text().split(/\s+/).reverse();
    let word;
    let line = [];
    let lineNumber = 0;
    const lineHeight = 1.1; // ems
    const y = textSel.attr("y");
    const dy = parseFloat(textSel.attr("dy") || 0);

    let tspan = textSel.text(null)
      .append("tspan")
      .attr("x", textSel.attr("x"))
      .attr("y", y)
      .attr("dy", dy + "em");

    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = textSel.append("tspan")
          .attr("x", textSel.attr("x"))
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  });
}