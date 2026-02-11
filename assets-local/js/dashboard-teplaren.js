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
const { highlights, facilities, num_households_ets2_total } = window.DASHBOARD_TEPLAREN;

// COLOR SCHEME
const statusColor = new Map([
    ["done", "#1c7a96"],
    ["in-progress", "#ffcb6e"],
    ["problematic", "#c65163"],
    ["not-shown", "#999"],
    ["ets2", "#aaa"]
]);

function cumulative(data, valueKey = "value") {
    let acc = 0;
    return data.map(d => {
        const v = +d[valueKey] || 0;
        const out = {
            ...d,
            x0: acc,
            x1: acc + v
        };
        acc += v;
        return out;
    });
}

/////////////////////
// GENERATE CZECH MAP
////////////////////

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
    gPts.attr("font-family", "Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif");
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

    const projection = d3.geoMercator().fitExtent([[0, 0], [width - padding, height]], cz);
    const path = d3.geoPath(projection);

    // Draw map
    gMap.selectAll("path")
        .data(cz.features ?? [cz])
        .join("path")
        .attr("d", path)
        .attr("fill", "#e8eef6")
        .attr("stroke", "#3a3a3a")
        .attr("stroke-width", 0.8);

    // Optional facility coordinate overrides
    // - Use { lon, lat } to replace the raw coordinates (still goes through the projection)
    //   Example:  "ostrava": { dpx: -10, dpy: 6 },
    // - Use { dpx, dpy } to nudge the projected point in SVG pixels
    //   Example: "praha-levy-breh-vltavy": { lon: 14.42, lat: 50.08 },
    const facilityCoordOverride = {
        "praha-pravy-breh-vltavy" : { dpx: 0, dpy: 20},
        "praha-levy-breh-vltavy" : { dpx: 0, dpy: 75},
        "steti" : { dpx: -20, dpy: -10},
        "pisek" : { dpx: 0, dpy: -10},
        "olomouc" : { dpx: 0, dpy: -10},
        "usti-nad-labem" : { dpx: 0, dpy: -30},
        "ostrava" : { dpx: -50, dpy: 0},
        "otrokovice" : { dpx: -5, dpy: 20},
        "detmarovice" : { dpx: 0, dpy: -10},
        "karvina" : { dpx: 0, dpy: -5},
        "frydek-mistek" : { dpx: 0, dpy: 10},
        "trinec" : { dpx: 0, dpy: 5},
        "tisova" : { dpx: -5, dpy: 0},
        "ledvice" : { dpx: 0, dpy: -5},
        "prunerov" : { dpx: -25, dpy: 0},
        "kladno" : { dpx: -30, dpy: 0},
        "tusimice" : { dpx: -15, dpy: 10},
        "kralupy" : { dpx: -10, dpy: 0},
        "komorany" : { dpx: 10, dpy: 0},
    };

    function getFacilityXY(d) {
        const key = slugifyAnchor(d.name);
        const ov = facilityCoordOverride[key];

        // Absolute lon/lat override
        const lon = (ov && Number.isFinite(+ov.lon)) ? +ov.lon : d.lon;
        const lat = (ov && Number.isFinite(+ov.lat)) ? +ov.lat : d.lat;

        const base = projection([lon, lat]);
        if (!base) return null;

        // Pixel nudge override
        const dpx = ov?.dpx ? +ov.dpx : 0;
        const dpy = ov?.dpy ? +ov.dpy : 0;

        return [base[0] + dpx, base[1] + dpy];
    }

    // Project points (and drop any that can’t be projected)
    const projected = pts
        .map(d => ({ ...d, xy: getFacilityXY(d) }))
        .filter(d => d.xy && Number.isFinite(d.xy[0]) && Number.isFinite(d.xy[1]));

    // One house icon represents ~10 000 households, but we FIRST round households to the nearest 1 000
    // Example: 11 000 -> 1 icon, 15 000 -> 2 icons
    const HOUSEHOLDS_PER_ICON = 10000;
    const ROUND_TO = 1000;

    // Box marker layout
    const boxSize = 15;
    const boxGap = 0;
    const maxCols = 5; // wrap to new row after this many boxes

    // 5-point house icon (pentagon) path generator
    function housePathAt(x, y, s) {
        // Points: bottom-left, bottom-right, top-right wall, roof peak, top-left wall
        const p0 = [x, y + s];
        const p1 = [x + s, y + s];
        const p2 = [x + s, y + s * 0.45];
        const p3 = [x + s * 0.5, y];
        const p4 = [x, y + s * 0.45];
        return `M${p0[0]},${p0[1]}L${p1[0]},${p1[1]}L${p2[0]},${p2[1]}L${p3[0]},${p3[1]}L${p4[0]},${p4[1]}Z`;
    }

    function numBoxes(d) {
        const raw = +d.num_households || 0;
        const rounded = Math.round(raw / ROUND_TO) * ROUND_TO;
        const n = Math.round(rounded / HOUSEHOLDS_PER_ICON);
        return Math.max(0, n);
    }

    function markerDims(d) {
        const n = numBoxes(d);
        if (n === 0) return { w: 0, h: 0, cols: 0, rows: 0 };
        const cols = Math.min(maxCols, n);
        const rows = Math.ceil(n / maxCols);
        const w = cols * boxSize + Math.max(0, cols - 1) * boxGap;
        const h = rows * boxSize + Math.max(0, rows - 1) * boxGap;
        return { w, h, cols, rows };
    }

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

    // Draw clickable facilities (box marker + two-line label)
    const facilityLink = gPts.selectAll("a.facility")
        .data(projected, d => d.name)
        .join(
            enter => {
                const a = enter.append("a").attr("class", d => `facility status-${d.status}`);
                a.append("g").attr("class", "facility-marker");
                a.append("text").attr("class", "facility-name");
                return a;
            },
            update => update,
            exit => exit.remove()
        )
        .attr("href", d => `#${slugifyAnchor(d.name)}`);

    // Render box markers (one box per 10k households)
    facilityLink.each(function (d) {
        const a = d3.select(this);
        const g = a.select("g.facility-marker");

        const n = numBoxes(d);
        const dims = markerDims(d);

        // Clear previous marker
        g.selectAll("*").remove();

        if (n === 0) return;

        // Anchor = leftmost house in bottom row (top-left corner of that house)
        const rows = dims.rows;
        const x0 = d.xy[0];
        const y0 = d.xy[1] - (rows - 1) * (boxSize + boxGap);

        const boxes = d3.range(n).map(i => ({ i }));

        g.selectAll("path.house")
            .data(boxes, b => b.i)
            .join("path")
            .attr("class", "house")
            .attr("d", b => {
                const x = x0 + (b.i % maxCols) * (boxSize + boxGap);
                // Fill from the bottom row first, then upwards
                const rowFromBottom = Math.floor(b.i / maxCols);
                const rowFromTop = (rows - 1) - rowFromBottom;
                const y = y0 + rowFromTop * (boxSize + boxGap);
                return housePathAt(x, y, boxSize);
            })
            .attr("fill", statusColor.get(d.status) ?? "#555")
            .attr("fill-opacity", 0.9)
            .attr("stroke", "#fff")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round");
    });

    // Label positioning
    // Default: label under the houses, left-aligned to the marker’s left edge.
    // Overrides:
    //  - "above" : above the houses
    //  - "right" : to the right of the houses (uses labelGap as horizontal gap)
    //  - "left"  : to the left of the houses (uses labelGap as horizontal gap)
    const labelGap = 2;
    const labelBelowPad = 14; // keeps current look (status quo)

    const labelPosOverride = {
        "detmarovice": "right",
        //"steti": "left",
        "kolin": "above",
        "kralupy": "left",
        "mlada-boleslav": "right",
        "trinec": "right",
        "ledvice": "left",    
        "prunerov": "above",    
    };

    function getLabelPos(d) {
        const key = slugifyAnchor(d.name);
        return labelPosOverride[key] ?? "below";
    }

    // Set text first so measurements work
    const labels = facilityLink.select("text.facility-name")
        .text(d => d.name);

    labels.each(function (d) {
    const t = d3.select(this);
    const pos = getLabelPos(d);
    const dims = markerDims(d);

    // Anchor logic: d.xy is the top-left of the leftmost house in the bottom row
    const leftX = d.xy[0];
    const rightX = d.xy[0] + dims.w;
    const topY = d.xy[1] - (dims.rows - 1) * (boxSize + boxGap);
    const bottomY = d.xy[1] + boxSize; // bottom edge of the grid
    const midY = topY + dims.h / 2;

    // Reset common attrs
    t.attr("text-anchor", "start");

    if (pos === "above") {
        t.attr("dominant-baseline", "auto")
        .attr("x", leftX)
        .attr("y", topY - labelGap);
        return;
    }

    if (pos === "right") {
        t.attr("dominant-baseline", "middle")
        .attr("x", rightX + labelGap)
        .attr("y", midY);
        return;
    }

    if (pos === "left") {
        // Measure rendered width to place label to the left
        const w = this.getBBox().width;
        t.attr("dominant-baseline", "middle")
        .attr("x", leftX - labelGap - w)
        .attr("y", midY);
        return;
    }

    // Default: below (status quo)
    t.attr("dominant-baseline", "auto")
        .attr("x", leftX)
        .attr("y", bottomY + labelBelowPad + labelGap);
    });

    // Tooltip on hover
    facilityLink.selectAll("title").remove();
    facilityLink.append("title")
        .text(d => `${d.name} — ${(Math.round(d.num_households / 1000) * 1000).toLocaleString("cs-CZ")} domácností`);
}

initCzechFacilitiesMap();
