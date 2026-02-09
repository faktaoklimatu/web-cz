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
    ["done", "#0085b6"],
    ["in-progress", "#ffbc5b"],
    ["problematic", "#bb2719"],
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
// GENERATE STACKED BAR CHART
/////////////////////

function initStackedBarChart() {
    const container = d3.select("#stacked-bar");
    if (container.empty()) {
        console.error("Container #stacked-bar not found");
        return;
    }

    // Clear previous render
    container.selectAll("*").remove();


    const labelAreaHeight = 50; // space for labels above
    const barHeight = 40;
    const bracketAreaHeight = 40; // space below the bar for brackets + text
    const height = labelAreaHeight + barHeight + bracketAreaHeight;
    const width = 1110;

    const data = [
        {
            status: "problematic",
            label: ["Nejasný", "odchod"],
            value: highlights.find(d => d.status === "problematic")?.num_households ?? 0
        },
        {
            status: "in-progress",
            label: ["Odchod", "probíhá"],
            value: highlights.find(d => d.status === "in-progress")?.num_households ?? 0
        },
        {
            status: "done",
            label: ["Odchod", "dokončen"],
            value: highlights.find(d => d.status === "done")?.num_households ?? 0
        },
        {
            status: "not-shown",
            label: ["Nezobrazujeme", " "],
            value: highlights.find(d => d.status === "not-shown")?.num_households ?? 0
        },
        {
            status: "ets2",
            label: [" ", " "],
            value: +num_households_ets2_total || 0
        }
    ];

    const stackedData = cumulative(data);
    const total = d3.sum(data, d => d.value);

    // Scales for horizontal placement
    const xScale = d3.scaleLinear()
        .domain([0, total])
        .range([0, width]);

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMinYMid meet");

    // RENDERING BARCHART
    svg.selectAll('rect')
        .data(stackedData)
        .enter().append('rect')
        .attr('class', 'rect-stacked')
        .attr('x', d => xScale(d.x0))
        .attr('y', labelAreaHeight)
        .attr('height', barHeight)
        .attr('width', d => xScale(d.value))
        .style('fill', d => statusColor.get(d.status) ?? "#555")
        .style('stroke', "white");

    // Reusable bracket renderer (below the bar)
    function drawBracketBelow({
        svg,
        stackedData,
        xScale,
        labelAreaHeight,
        barHeight,
        startStatus,
        endStatus,
        text,
        height = 10,
        gap = 10,
        stroke = "#999",
        strokeWidth = 1,
        textFill = "#999",
        fontSize = ".9rem",
        fontWeight = "300",
    }) {
        const dStart = stackedData.find(d => d.status === startStatus);
        const dEnd = stackedData.find(d => d.status === endStatus);
        if (!dStart || !dEnd) return;

        // Ensure bracket always goes left->right even if statuses are passed reversed
        const x0 = Math.min(dStart.x0, dEnd.x1);
        const x1 = Math.max(dStart.x0, dEnd.x1);

        const xStart = xScale(x0);
        const xEnd = xScale(x1);

        // Position below the bar
        const yTop = labelAreaHeight + barHeight + gap;
        const yBottom = yTop + height;
        const xBuffer = 1;

        const g = svg.append("g")
            .attr("class", `stacked-bracket bracket-${startStatus}-to-${endStatus}`)
            .attr("fill", "none")
            .attr("stroke", stroke)
            .attr("stroke-width", strokeWidth);

        // Left vertical
        g.append("line")
            .attr("x1", xStart + xBuffer)
            .attr("x2", xStart + xBuffer)
            .attr("y1", yTop)
            .attr("y2", yBottom);

        // Bottom horizontal
        g.append("line")
            .attr("x1", xStart + xBuffer)
            .attr("x2", xEnd - xBuffer)
            .attr("y1", yBottom)
            .attr("y2", yBottom);

        // Right vertical
        g.append("line")
            .attr("x1", xEnd - xBuffer)
            .attr("x2", xEnd - xBuffer)
            .attr("y1", yBottom)
            .attr("y2", yTop);

        // Centered label ON the bracket line with white background
        if (text) {
            const cx = (xStart + xEnd) / 2;
            const cy = yBottom; // aligned with bracket line

            const labelGroup = g.append("g")
                .attr("class", "bracket-label-group")
                .attr("transform", `translate(${cx}, ${cy})`);

            const txt = labelGroup.append("text")
                .attr("class", "bracket-label")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("fill", textFill)
                .attr("font-size", fontSize)
                .attr("font-weight", fontWeight)
                .text(text);

            // Draw background rect based on text bbox
            const bbox = txt.node().getBBox();
            const padX = 6;
            const padY = 3;

            labelGroup.insert("rect", "text")
                .attr("x", bbox.x - padX)
                .attr("y", bbox.y - padY)
                .attr("width", bbox.width + padX * 2)
                .attr("height", bbox.height + padY * 2)
                .attr("rx", 2)
                .attr("ry", 2)
                .attr("fill", "#fff")
                .attr("stroke", "none");
        }
    }

    // Status labels ABOVE the bar (multi-line using tspans)
    const labelGroup = svg.append('g')
        .attr('class', 'stacked-labels');

    const lineHeightEm = 1.1;

    const lbl = labelGroup.selectAll('text.stacked-label')
        .data(stackedData)
        .enter().append('text')
        .attr('class', 'stacked-label')
        .attr('x', d => xScale(d.x0))
        .attr('y', 20) // baseline for first line
        .attr('text-anchor', 'start')
        .attr('fill', d => statusColor.get(d.status) ?? '#555')
        .attr('font-size', '1.1rem')
        .attr('font-weight', '500');

    // Add one tspan per line
    lbl.each(function (d) {
        const lines = Array.isArray(d.label) ? d.label : [String(d.label ?? '')];
        const t = d3.select(this);
        t.selectAll('tspan')
            .data(lines)
            .enter().append('tspan')
            .attr('x', xScale(d.x0) + 2)
            .attr('dy', (line, i) => i === 0 ? '0em' : `${lineHeightEm}em`)
            .text(line => line);
    });

    // Avoid overlaps: if previous label extends beyond its own segment,
    // push the next label to the right so the two labels don't collide.
    const LABEL_PAD = 12;
    const labelNodes = lbl.nodes();

    for (let i = 1; i < labelNodes.length; i++) {
        const prevNode = labelNodes[i - 1];
        const prevD = stackedData[i - 1];

        const prevBBox = prevNode.getBBox();
        const prevLabelRight = prevBBox.x + prevBBox.width;

        const prevSegRight = xScale(prevD.x1);

        if (prevLabelRight > prevSegRight) {
            const currNode = labelNodes[i];
            const currD = stackedData[i];

            const currSegLeft = xScale(currD.x0);
            const newX = Math.max(currSegLeft, prevLabelRight + LABEL_PAD);

            const sel = d3.select(currNode);
            sel.attr('x', newX);
            sel.selectAll('tspan').attr('x', newX + 2);
        }
    }

    // Percentage labels
    svg.selectAll('.text-percent')
        .data(stackedData)
        .enter().append('text')
        .attr('class', 'text-percent')
        .attr('text-anchor', 'left')
        .attr('fill', 'white')
        .attr('font-size', '.9rem')
        .attr('font-weight', '500')
        .attr('font-stretch', '75%')
        .attr('x', d => xScale(d.x0) + 6)
        .attr('y', labelAreaHeight + (barHeight / 2 + 5))
        .text(d => d3.formatLocale({ decimal: "," }).format(".0f")(d.value / total * 100) + ' %');

    // Add EU ETS1 bracket
    drawBracketBelow({
        svg,
        stackedData,
        xScale,
        labelAreaHeight,
        barHeight,
        startStatus: "problematic",
        endStatus: "not-shown",
        text: "Teplárny v systému EU ETS 1",
    });

    // Add EU ETS2 bracket
    drawBracketBelow({
        svg,
        stackedData,
        xScale,
        labelAreaHeight,
        barHeight,
        startStatus: "ets2",
        endStatus: "ets2",
        text: "Teplárny mimo EU ETS 1",
    });

    // Set font
    svg.selectAll("text")
        .attr("font-family", "Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif");
}

initStackedBarChart();

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
        "vresova": { dx: -2, dy: 25 },
        "tisova": { dx: -2, dy: 25 },
        "prunerov": { dx: -10, dy: 35 },
        "tusimice": { dx: 1, dy: 10 },
        "komorany": { dx: 1, dy: 20 },
        "ledvice": { dx: 1, dy: 10 },
        "kladno": { dx: -40, dy: 0 },
        "praha-pravy-breh-vltavy": { dx: -20, dy: 65 },
        "praha-levy-breh-vltavy": { dx: -5, dy: -10 },
        "strakonice": { dx: 1, dy: 20 },
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
        .text(d => `${d.name} — ${(Math.round(d.num_households / 1000) * 1000).toLocaleString("cs-CZ")} domácností`);
}

initCzechFacilitiesMap();
