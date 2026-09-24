(function () {
  const DATA = window.ETS_DASHBOARD;
  if (!DATA) return;

  const ACTIVITIES = DATA.activities;    // [{n, short}] — broad sector groups
  const INSTALLS = DATA.installs;        // [{n,c,act,co}] — all Czech installations
  const RECORDS = DATA.records;          // [[instIdx, year, emissions|null, allocation]]
  const YEAR_MIN = DATA.year_min;
  const YEAR_MAX = DATA.year_max;

  // Chart look — single source of truth for everything drawn inside the SVGs.
  // The colours are mirrored as CSS variables in the page's <style> block,
  // which the HTML legend swatches read; keep the two in sync.
  const CFG = {
    colorEmissions: "#1b4c6f", // the whole emissions bar
    colorUncovered: "#8ba1b1", // overlay: emissions above the free allocation
    colorAlloc: "#fffafa",     // background the surplus hatch is drawn on
    colorLine: "#000000",      // allocation marker line
    haloColor: "#ffffff",      // stroked under the marker, both charts
    haloWidth: 1.5,            // halo thickness per side, 0 = no halo
    showSurplus: true,         // both charts: hatched block for over-allocation
    // Geometry is per chart — chart 1 (#ets-svg-timeline, "Emise a povolenky
    // zdarma v čase") and chart 2 (#ets-svg-activity, "Kolik emisí pokryly
    // povolenky zdarma?") are tuned independently. Colours above are shared.
    barPadding: 0.26,         // chart 1: gap between year bars (0-1)
    lineWidth: 3.5,           // chart 1: allocation marker thickness
    tickCount: 5,             // chart 1: axis ticks
    allocStepped: true,       // chart 1: draw allocation as one staircase
    barPaddingActivity: 0.15, // chart 2: gap between sector bars (0-1)
    lineWidthActivity: 3.5,   // chart 2: allocation marker thickness
    tickCountActivity: 5,     // chart 2: axis ticks
    sankeyHorizontal: false,  // sankey: stack nodes along x, flow top to bottom
    minBarActivity: 25,       // chart 2: rows never thinner than this (px)
    hatchSize: 6,             // surplus hatch: pattern tile size
    hatchAngle: 45,
    hatchStroke: 4.75,
    hatchOpacity: 1,
    hatchColor: "#ff9c66",
    axisFontSize: 13,         // axis tick labels
    axisLabelFontSize: 14,    // sector names on the activity chart
    valueFontSize: 13.5,      // in-chart value labels (Mt, %)
    axisTextColor: "#718096",
    gridColor: "#edf2f7",
  };

  // The same breakpoint the page's CSS uses for .control-group, read from JS.
  // The window "resize" handler at the bottom redraws both charts, which also
  // covers crossing this threshold (and a phone rotating).
  const MOBILE = window.matchMedia("(max-width: 640px)");

  // Chart 2's sector names do not fit a phone-width axis. Keyed on the
  // NORMALISED name: several values in the data carry non-breaking spaces
  // (e.g. "Výroba elektřiny a tepla"), so a plain lookup would never match.
  const SHORT_ACTIVITY_NAMES = {
    "Výroba elektřiny a tepla": "Výroba el. a tepla",
    "Rafinace minerálních olejů": "Rafinace",
    "Ostatní minerály (keramika, cihly, minerální vlna, sádra)": "Ostatní minerály",
    "Potravinářský průmysl": "Potraviny",
  };
  // Display only — the row's key is untouched, so tooltips keep the full name.
  // Owner names fall through unchanged, since none of them are in the map.
  function activityLabel(key) {
    return MOBILE.matches ? (SHORT_ACTIVITY_NAMES[normalizeActName(key)] || key) : key;
  }

  // Chart 1's margins live out here because fixedBarWidth() needs its plot
  // width before renderTimeline runs.
  const TL_MARGIN = { top: 26, right: 16, bottom: 28, left: 64 };
  const FULL_YEARS = YEAR_MAX - YEAR_MIN + 1;

  // The bar width chart 1 has when the whole year span is shown. Both charts
  // key off it: chart 1 keeps this width whatever the year selection, and
  // chart 2 matches it, so bars carry the same visual weight in both.
  // Depends on the container width, so it is recomputed on every render.
  function fixedBarWidth() {
    const el = document.getElementById("ets-svg-timeline");
    const W = (el ? el.clientWidth : 0) - TL_MARGIN.left - TL_MARGIN.right;
    if (W <= 0) return 0;
    // d3.scaleBand with paddingInner = paddingOuter = p: step = W / (n + p).
    return (W / (FULL_YEARS + CFG.barPadding)) * (1 - CFG.barPadding);
  }

  // The allocation marker is stroked twice: a wider halo underneath, then the
  // line itself on top — the halo leaves a visible margin against the bar
  // fill it sits on. Returns the [stroke, width] passes, in draw order.
  function markerPasses(width) {
    return CFG.haloWidth > 0
      ? [[CFG.haloColor, width + CFG.haloWidth * 2], [CFG.colorLine, width]]
      : [[CFG.colorLine, width]];
  }

  // One hatch definition for both charts and the legend swatches, fully
  // CFG-driven. `scale` shrinks the whole pattern (tile and stroke together),
  // so a scaled copy stays the same pattern rather than a different one.
  function addHatch(defs, id, scale) {
    scale = scale || 1;
    const s = CFG.hatchSize * scale;
    defs.append("pattern")
      .attr("id", id)
      .attr("width", s).attr("height", s)
      .attr("patternUnits", "userSpaceOnUse")
      .attr("patternTransform", `rotate(${CFG.hatchAngle})`)
      .call(p => {
        p.append("rect").attr("width", s).attr("height", s).attr("fill", CFG.colorAlloc);
        p.append("line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", s)
          .attr("stroke", CFG.hatchColor).attr("stroke-width", CFG.hatchStroke * scale)
          .attr("opacity", CFG.hatchOpacity);
      });
  }

  // ── Lookups built once ────────────────────────────────────────────────────
  const recordsByInstall = new Map();
  RECORDS.forEach(r => {
    const i = r[0];
    if (!recordsByInstall.has(i)) recordsByInstall.set(i, []);
    recordsByInstall.get(i).push(r);
  });

  // Selected options float to the top of the "Současný vlastník" and
  // "Zařízení" lists, against the live selection — every checkbox runs
  // onFilterChange(), which re-renders both lists, so a ticked row rises
  // immediately. Note the cost: the rows below it shift up by one, so ticking
  // several in a row means re-aiming each time.
  const byPin = (pin, a, b) => (pin.has(b) ? 1 : 0) - (pin.has(a) ? 1 : 0);

  // Every value each facet can take, to recognise an unfiltered facet.
  const ALL_REAL_ACTIVITIES = new Set(INSTALLS.map(i => i.ra).filter(Boolean));
  const ALL_OWNERS = new Set(INSTALLS.map(i => i.own));

  // Chart 2 can group its rows by real activity or by current owner. A view
  // option for that one chart, not a filter, so it is kept out of `state`.
  let activityGroupBy = "ra";   // "ra" | "own"
  const ACTIVITY_OWNER_ROWS = 10;  // 180 owners exist; the rest are aggregated

  const state = {
    realActivities: new Set(), // real-activity names (installs[].ra); empty = all
    companies: new Set(),  // owner names (installs[].own); empty = all companies
    installs: new Set(),   // install indices; empty = all installations
    yearFrom: YEAR_MIN,
    yearTo: YEAR_MAX,
  };

  // ── Formatting ────────────────────────────────────────────────────────────
  function fmt(n, unit) {
    if (n == null) return "—";
    const abs = Math.abs(n);
    const sign = n < 0 ? "−" : "";
    // Czech convention uses a comma for the decimal point (not a period).
    if (unit === "povolenek") {
      if (abs >= 1e6) return sign + d3.format(".1f")(abs / 1e6).replace(".", ",") + " mil. povolenek";
      if (abs >= 1e3) return sign + d3.format(".1f")(abs / 1e3).replace(".", ",") + " tis. povolenek";
      return sign + d3.format(",")(abs) + " povolenek";
    }
    if (abs >= 1e6) return sign + d3.format(".1f")(abs / 1e6).replace(".", ",") + " Mt";
    if (abs >= 1e3) return sign + d3.format(".1f")(abs / 1e3).replace(".", ",") + " kt";
    return sign + d3.format(",")(abs) + " t";
  }
  function fmtShort(n) {
    if (n == null) return "—";
    const abs = Math.abs(n);
    const sign = n < 0 ? "−" : "";
    if (abs >= 1e6) return sign + Math.round(abs / 1e6) + " mil.";
    if (abs >= 1e3) return sign + Math.round(abs / 1e3) + " tis.";
    return sign + String(abs);
  }

  // ── Filtering ─────────────────────────────────────────────────────────────
  // All facets are multi-select and combine with AND: an installation must
  // match the real-activity selection (if any) AND the company selection (if
  // any) AND be in the installation selection (if any). An empty Set means
  // "no restriction on this facet".
  function getFilteredInstallIndices() {
    const out = [];
    for (let i = 0; i < INSTALLS.length; i++) {
      const inst = INSTALLS[i];
      if (state.realActivities.size && !state.realActivities.has(inst.ra)) continue;
      if (state.companies.size && !state.companies.has(inst.own)) continue;
      if (state.installs.size && !state.installs.has(i)) continue;
      out.push(i);
    }
    return out;
  }

  // ── Cross-filtering ──────────────────────────────────────────────────────────
  // Each facet's option list only offers values that are actually reachable
  // given the OTHER facets' current selections (its own facet is excluded
  // from the check, since that's the thing being chosen).
  function getAvailableRealActivities() {
    const out = new Set();
    for (let i = 0; i < INSTALLS.length; i++) {
      const inst = INSTALLS[i];
      if (state.companies.size && !state.companies.has(inst.own)) continue;
      if (state.installs.size && !state.installs.has(i)) continue;
      out.add(inst.ra);
    }
    return out;
  }
  function getAvailableCompanies() {
    const out = new Set();
    for (let i = 0; i < INSTALLS.length; i++) {
      const inst = INSTALLS[i];
      if (state.realActivities.size && !state.realActivities.has(inst.ra)) continue;
      if (state.installs.size && !state.installs.has(i)) continue;
      out.add(inst.own);
    }
    return out;
  }
  function getAvailableInstalls() {
    const out = new Set();
    for (let i = 0; i < INSTALLS.length; i++) {
      const inst = INSTALLS[i];
      if (state.realActivities.size && !state.realActivities.has(inst.ra)) continue;
      if (state.companies.size && !state.companies.has(inst.own)) continue;
      out.add(i);
    }
    return out;
  }

  // ── Controls: activity / owner / installation multi-select dropdowns ────────
  const sortedCompanies = Array.from(new Set(INSTALLS.map(inst => inst.own).filter(Boolean)))
    .sort((a, b) => a.localeCompare(b, "cs"));

  // Group installations under their facility/site name (installs[].operator)
  // — e.g. every install with operator "ČEZ" nests under a "ČEZ" header.
  // This is distinct from installs[].own, the current contractual owner
  // (used for the separate "Současný vlastník" facet below) — operator is
  // the site's own identity, own is who currently runs it, and they often
  // differ (a site can change hands while keeping its name). Sites with
  // only one installation stay flat, shown plainly rather than as a
  // redundant one-item group; a flat row combines operator and n as
  // "operator – n" so the site is still identifiable without a group
  // header — unless the two are already identical (the installation's own
  // name just repeats the site name), in which case that would only
  // duplicate the text, so it's shown flat and bare. Flat entries and group
  // headers are merged into one list; sortKey (the flat row's display text,
  // the site name for group rows) is only the alphabetical tie-break —
  // renderInstallOptions orders the panel by emissions, biggest first, the
  // same as the "Současný vlastník" list.
  const installRows = (() => {
    const byOperator = new Map();
    INSTALLS.forEach((inst, i) => {
      if (!inst.operator) return;
      if (!byOperator.has(inst.operator)) byOperator.set(inst.operator, []);
      byOperator.get(inst.operator).push({ i, n: inst.n });
    });
    const grouped = new Set();
    const rows = [];
    byOperator.forEach((items, operator) => {
      if (items.length < 2) return;
      items.sort((a, b) => a.n.localeCompare(b.n, "cs"));
      items.forEach(({ i }) => grouped.add(i));
      rows.push({ type: "group", operator, items, sortKey: operator });
    });
    INSTALLS.forEach((inst, i) => {
      if (grouped.has(i)) return;
      const label = inst.operator && inst.operator !== inst.n ? `${inst.operator} – ${inst.n}` : inst.n;
      rows.push({ type: "flat", i, n: label, sortKey: label });
    });
    rows.sort((a, b) => a.sortKey.localeCompare(b.sortKey, "cs"));
    return rows;
  })();

  // "Ostatní odvětví" is a catch-all, not a real category, so it's pinned to
  // the bottom of the list instead of sorting alphabetically with the rest.
  const REAL_ACTIVITY_OTHER = "Ostatní odvětví";
  const sortedRealActivities = Array.from(new Set(INSTALLS.map(inst => inst.ra).filter(Boolean)))
    .sort((a, b) => {
      if (a === REAL_ACTIVITY_OTHER) return 1;
      if (b === REAL_ACTIVITY_OTHER) return -1;
      return a.localeCompare(b, "cs");
    });

  // An empty set is how "no restriction" is normally represented, but ticking
  // every row by hand fills the set instead — same meaning, so the toggle
  // reads the same rather than showing the full count ("180 vlastníků").
  const isEverySelected = (sel, total) => total > 0 && sel.size === total;

  // Czech plural agreement: 1 = singular (handled separately), 2–4 = "few", else "many".
  function pluralCz(n, few, many) { return (n >= 2 && n <= 4) ? few : many; }

  // "Výroba elektřiny a tepla" is also the largest single value on the real-
  // activity facet, so it gets the same pinned-primary + selectable
  // "Průmysl" group hierarchy as "Hlavní odvětví" (see ACTIVITY_PRIMARY_NAME
  // / normalizeActName further down — referenced here, not redefined).
  function isRealActivityPrimary(ra) { return normalizeActName(ra) === normalizeActName(ACTIVITY_PRIMARY_NAME); }
  function getIndustrialRealActivities() {
    return sortedRealActivities.filter(ra => !isRealActivityPrimary(ra));
  }
  function getSelectableIndustrialRealActivities() {
    const available = getAvailableRealActivities();
    return getIndustrialRealActivities().filter(ra => available.has(ra) || state.realActivities.has(ra));
  }

  function isWholeIndustrySelected() {
    const industrial = getSelectableIndustrialRealActivities();
    return industrial.length > 0 &&
      state.realActivities.size === industrial.length &&
      industrial.every(ra => state.realActivities.has(ra));
  }

  function refreshRealActivityToggle() {
    const btn = document.getElementById("ets-real-activity-toggle");
    const sel = state.realActivities;
    const isWholeIndustryGroup = isWholeIndustrySelected();
    if (sel.size === 0 || isEverySelected(sel, sortedRealActivities.length))
      btn.textContent = "Všechna odvětví";
    else if (isWholeIndustryGroup) btn.textContent = "Průmysl";
    else if (sel.size === 1) btn.textContent = [...sel][0];
    else btn.textContent = sel.size + " odvětví";
    btn.dataset.tip = btn.textContent;
  }

  function refreshInstallToggle() {
    const btn = document.getElementById("ets-installation-toggle");
    const sel = state.installs;
    if (sel.size === 0 || isEverySelected(sel, INSTALLS.length))
      btn.textContent = "Všechna zařízení";
    else if (sel.size === 1) btn.textContent = INSTALLS[[...sel][0]].n;
    else btn.textContent = sel.size + " zařízení";
    btn.dataset.tip = btn.textContent;
  }

  function refreshCompanyToggle() {
    const btn = document.getElementById("ets-company-toggle");
    const sel = state.companies;
    if (sel.size === 0 || isEverySelected(sel, ALL_OWNERS.size))
      btn.textContent = "Všichni vlastníci";
    else if (sel.size === 1) btn.textContent = [...sel][0];
    else btn.textContent = sel.size + " " + pluralCz(sel.size, "vlastníci", "vlastníků");
    btn.dataset.tip = btn.textContent;
  }

  // Re-renders the (optionally search-filtered) checkbox list for installations,
  // grouped per installRows above. Re-used on init, on every keystroke in the
  // search box, and whenever another facet's selection changes the set of
  // reachable installations. Options that are no longer reachable are hidden
  // unless already selected, so a selection never silently disappears — the
  // user can still see and deselect it. A group's membership (its shared
  // name prefix) doesn't change with search/availability — only which of
  // its installations are currently shown does.
  // Emissions per installation over the selected years, with every other
  // facet applied but not the installation facet itself — same rule as
  // computeCompanyEmissions, so each option shows what picking it would bring.
  function computeInstallEmissions() {
    const sums = new Map();
    for (let i = 0; i < INSTALLS.length; i++) {
      const inst = INSTALLS[i];
      if (state.realActivities.size && !state.realActivities.has(inst.ra)) continue;
      if (state.companies.size && !state.companies.has(inst.own)) continue;
      let e = 0;
      (recordsByInstall.get(i) || []).forEach(r => {
        const [, y, em] = r;
        if (y < state.yearFrom || y > state.yearTo) return;
        e += em || 0;
      });
      sums.set(i, e);
    }
    return sums;
  }

  function renderInstallOptions(filterText) {
    const wrap = document.getElementById("ets-installation-options");
    wrap.innerHTML = "";
    const q = (filterText || "").trim().toLowerCase();
    const available = getAvailableInstalls();
    const emissions = computeInstallEmissions();
    const shown = i => available.has(i) || state.installs.has(i);
    const emOf = i => (shown(i) ? emissions.get(i) || 0 : 0);
    // A row's weight: its own emissions, or the total of the installations it
    // groups. Deliberately ignores the search query, so the number describes
    // the site itself and the order does not jump while typing — same as the
    // owner list, whose figures are query-independent too.
    const rowEmissions = row => row.type === "flat"
      ? emOf(row.i)
      : row.items.reduce((sum, { i }) => sum + emOf(i), 0);
    // Selected rows first, then biggest emitters, with alphabetical only as a
    // tie-break (and for rows with no emissions in the selected years). A
    // group counts as selected if any member is.
    const pin = state.installs;
    const rowPinned = row => row.type === "flat"
      ? pin.has(row.i)
      : row.items.some(({ i }) => pin.has(i));
    const rows = installRows
      .map(row => ({ row, e: rowEmissions(row), pinned: rowPinned(row) }))
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) ||
        b.e - a.e || a.row.sortKey.localeCompare(b.row.sortKey, "cs"))
      .map(({ row }) => row);

    function buildOption(i, n, nested) {
      const label = document.createElement("label");
      label.className = nested ? "ms-option ms-option--nested" : "ms-option";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.dataset.idx = i;
      cb.checked = state.installs.has(i);
      cb.addEventListener("change", function () {
        if (this.checked) state.installs.add(i); else state.installs.delete(i);
        onFilterChange();
      });
      const e = emOf(i);
      const name = document.createElement("span");
      name.className = "ms-option-name";
      name.textContent = e > 0 ? `${n} (${fmt(e)})` : n;
      name.dataset.tip = name.textContent;
      label.appendChild(cb);
      label.appendChild(name);
      return label;
    }

    let rendered = 0;
    rows.forEach(row => {
      if (row.type === "flat") {
        if (!shown(row.i)) return;
        if (q && !row.n.toLowerCase().includes(q)) return;
        wrap.appendChild(buildOption(row.i, row.n, false));
        rendered++;
        return;
      }
      // Group row: a query matches either an individual installation's own
      // name, or the site name (operator), so searching the site surfaces
      // the whole group even if no single installation name contains it.
      const visible = row.items
        .filter(({ i, n }) => shown(i) &&
          (!q || n.toLowerCase().includes(q) || row.operator.toLowerCase().includes(q)))
        .sort((a, b) => byPin(pin, a.i, b.i) ||
          emOf(b.i) - emOf(a.i) || a.n.localeCompare(b.n, "cs"));
      if (!visible.length) return;
      const idxs = visible.map(({ i }) => i);
      const selectedCount = idxs.filter(i => state.installs.has(i)).length;

      const groupLabel = document.createElement("label");
      groupLabel.className = "ms-option ms-group-label";
      const groupCb = document.createElement("input");
      groupCb.type = "checkbox";
      groupCb.checked = selectedCount === idxs.length;
      groupCb.indeterminate = selectedCount > 0 && selectedCount < idxs.length;
      groupCb.addEventListener("change", function () {
        idxs.forEach(i => { if (this.checked) state.installs.add(i); else state.installs.delete(i); });
        onFilterChange();
      });
      const groupE = rowEmissions(row);
      const groupName = document.createElement("span");
      groupName.className = "ms-option-name";
      groupName.textContent = groupE > 0 ? `${row.operator} (${fmt(groupE)})` : row.operator;
      groupName.dataset.tip = groupName.textContent;
      groupLabel.appendChild(groupCb);
      groupLabel.appendChild(groupName);
      wrap.appendChild(groupLabel);

      visible.forEach(({ i, n }) => wrap.appendChild(buildOption(i, n, true)));
      rendered++;
    });
    if (!rendered) wrap.innerHTML = '<div class="ms-empty">Žádné zařízení nenalezeno</div>';
  }

  // Sums verified emissions per owner within the currently selected year
  // range, restricted to installations reachable given the OTHER facets
  // (real activity / installation) — mirrors getAvailableCompanies but
  // returns per-owner totals instead of just a reachability Set. Used to
  // both order and annotate the owner dropdown.
  function computeCompanyEmissions() {
    const sums = new Map();
    for (let i = 0; i < INSTALLS.length; i++) {
      const inst = INSTALLS[i];
      if (!inst.own) continue;
      if (state.realActivities.size && !state.realActivities.has(inst.ra)) continue;
      if (state.installs.size && !state.installs.has(i)) continue;
      let e = 0;
      (recordsByInstall.get(i) || []).forEach(r => {
        const [, y, em] = r;
        if (y < state.yearFrom || y > state.yearTo) return;
        e += em || 0;
      });
      sums.set(inst.own, (sums.get(inst.own) || 0) + e);
    }
    return sums;
  }

  // Re-renders the (optionally search-filtered) checkbox list for companies,
  // ordered by their total verified emissions in the selected year range
  // (highest first) with that total shown in brackets after the name. See
  // renderInstallOptions for the availability/hide-unless-selected rule.
  function renderCompanyOptions(filterText) {
    const wrap = document.getElementById("ets-company-options");
    wrap.innerHTML = "";
    const q = (filterText || "").trim().toLowerCase();
    const available = getAvailableCompanies();
    const emissions = computeCompanyEmissions();
    const filtered = sortedCompanies
      .filter(own => (available.has(own) || state.companies.has(own)) && (!q || own.toLowerCase().includes(q)))
      .sort((a, b) => byPin(state.companies, a, b) ||
        (emissions.get(b) || 0) - (emissions.get(a) || 0) || a.localeCompare(b, "cs"));
    if (!filtered.length) {
      wrap.innerHTML = '<div class="ms-empty">Žádný vlastník nenalezen</div>';
      return;
    }
    filtered.forEach(own => {
      const label = document.createElement("label");
      label.className = "ms-option";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.dataset.own = own;
      cb.checked = state.companies.has(own);
      cb.addEventListener("change", function () {
        if (this.checked) state.companies.add(own); else state.companies.delete(own);
        onFilterChange();
      });
      const e = emissions.get(own) || 0;
      const name = document.createElement("span");
      name.className = "ms-option-name";
      name.textContent = e > 0 ? `${own} (${fmt(e)})` : own;
      name.dataset.tip = name.textContent;
      label.appendChild(cb);
      label.appendChild(name);
      wrap.appendChild(label);
    });
  }

  // Re-renders the "Odvětví" (real-activity) checkbox list, two-tier:
  // "Výroba elektřiny a tepla" pinned standalone at top, everything else
  // (including the "Ostatní odvětví" catch-all, sorted last within the
  // group by sortedRealActivities) nested under a selectable "Průmysl"
  // header. No search box — the list is short enough not to need one. See
  // renderInstallOptions for the availability/hide-unless-selected rule.
  function renderRealActivityOptions() {
    const wrap = document.getElementById("ets-real-activity-options");
    wrap.innerHTML = "";
    const available = getAvailableRealActivities();

    function buildOption(ra, nested) {
      const label = document.createElement("label");
      label.className = nested ? "ms-option ms-option--nested" : "ms-option";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.dataset.ra = ra;
      cb.checked = state.realActivities.has(ra);
      cb.addEventListener("change", function () {
        if (this.checked) state.realActivities.add(ra); else state.realActivities.delete(ra);
        onFilterChange();
      });
      const name = document.createElement("span");
      name.className = "ms-option-name";
      name.textContent = ra;
      name.dataset.tip = ra;
      label.appendChild(cb);
      label.appendChild(name);
      return label;
    }

    const visible = sortedRealActivities.filter(ra => available.has(ra) || state.realActivities.has(ra));
    const primary = visible.filter(isRealActivityPrimary);
    const others = visible.filter(ra => !isRealActivityPrimary(ra));

    primary.forEach(ra => {
      const opt = buildOption(ra, false);
      opt.classList.add("ms-group-label"); // same top-level styling as "Průmysl" below it
      wrap.appendChild(opt);
    });
    if (others.length) {
      const selectedCount = others.filter(ra => state.realActivities.has(ra)).length;

      const groupLabel = document.createElement("label");
      groupLabel.className = "ms-option ms-group-label";
      const groupCb = document.createElement("input");
      groupCb.type = "checkbox";
      groupCb.checked = selectedCount === others.length;
      groupCb.indeterminate = selectedCount > 0 && selectedCount < others.length;
      groupCb.addEventListener("change", function () {
        others.forEach(ra => { if (this.checked) state.realActivities.add(ra); else state.realActivities.delete(ra); });
        onFilterChange();
      });
      const groupName = document.createElement("span");
      groupName.className = "ms-option-name";
      groupName.textContent = "Průmysl";
      groupLabel.appendChild(groupCb);
      groupLabel.appendChild(groupName);
      wrap.appendChild(groupLabel);

      others.forEach(ra => wrap.appendChild(buildOption(ra, true)));
    }
    if (!wrap.children.length) wrap.innerHTML = '<div class="ms-empty">Žádné odvětví nenalezeno</div>';
  }

  // "Výroba elektřiny a tepla" is by far the largest emitter category, which
  // is why it's pinned standalone at the top of the "Odvětví" hierarchy
  // above, with everything else grouped under "Průmysl".
  const ACTIVITY_PRIMARY_NAME = "Výroba elektřiny a tepla";

  // Normalize before comparing: the data file inserts non-breaking spaces
  // around single-letter Czech prepositions ("a", "i", ...) per Czech
  // typographic convention, which look identical to a plain space but
  // compare unequal against a hardcoded literal.
  function normalizeActName(s) { return s.normalize("NFC").replace(/\u00A0/g, " "); }

  // Re-renders all three option panels, preserving whatever search text is
  // currently typed. Called whenever a selection changes anywhere, since one
  // facet's choice can change what the other two facets can still offer.
  function refreshOptionPanels() {
    renderRealActivityOptions();
    renderCompanyOptions(document.getElementById("ets-company-search").value);
    renderInstallOptions(document.getElementById("ets-installation-search").value);
  }

  // Single entry point for "a filter selection changed": refresh toggle
  // labels, re-filter all option panels against each other, and redraw.
  function onFilterChange() {
    refreshRealActivityToggle();
    refreshCompanyToggle();
    refreshInstallToggle();
    refreshOptionPanels();
    update();
  }

  function populateControls() {
    refreshOptionPanels();
    refreshRealActivityToggle();
    refreshCompanyToggle();
    refreshInstallToggle();
  }

  function setupDropdownToggle(toggleId, panelId) {
    const toggle = document.getElementById(toggleId);
    const panel = document.getElementById(panelId);
    toggle.addEventListener("click", function (ev) {
      ev.stopPropagation();
      const willOpen = !panel.classList.contains("open");
      document.querySelectorAll(".ms-panel.open").forEach(p => p.classList.remove("open"));
      if (willOpen) panel.classList.add("open");
    });
    panel.addEventListener("click", ev => ev.stopPropagation());
  }

  function setupControls() {
    document.querySelectorAll("#ets-activity-groupby button").forEach(btn => {
      btn.addEventListener("click", function () {
        if (activityGroupBy === this.dataset.group) return;
        activityGroupBy = this.dataset.group;
        document.querySelectorAll("#ets-activity-groupby button")
          .forEach(b => b.classList.toggle("active", b === this));
        renderActivityChart(getFilteredInstallIndices());
      });
    });

    setupDropdownToggle("ets-real-activity-toggle", "ets-real-activity-panel");
    setupDropdownToggle("ets-company-toggle", "ets-company-panel");
    setupDropdownToggle("ets-installation-toggle", "ets-installation-panel");
    document.addEventListener("click", function () {
      document.querySelectorAll(".ms-panel.open").forEach(p => p.classList.remove("open"));
    });

    // "Zrušit výběr" only ever touches the currently rendered (i.e.
    // availability/search-filtered) rows, so it behaves predictably together
    // with cross-filtering and the search box.

    document.querySelector('#ets-real-activity-panel [data-action="none"]').addEventListener("click", function () {
      // [data-ra] excludes the "Průmysl" group checkbox, which has no
      // dataset.ra of its own.
      document.querySelectorAll("#ets-real-activity-options input[type=checkbox][data-ra]").forEach(cb => {
        cb.checked = false;
        state.realActivities.delete(cb.dataset.ra);
      });
      onFilterChange();
    });

    document.getElementById("ets-company-search").addEventListener("input", function () {
      renderCompanyOptions(this.value);
    });
    document.querySelector('#ets-company-panel [data-action="none"]').addEventListener("click", function () {
      document.querySelectorAll("#ets-company-options input[type=checkbox]").forEach(cb => {
        cb.checked = false;
        state.companies.delete(cb.dataset.own);
      });
      onFilterChange();
    });

    document.getElementById("ets-installation-search").addEventListener("input", function () {
      renderInstallOptions(this.value);
    });
    document.querySelector('#ets-installation-panel [data-action="none"]').addEventListener("click", function () {
      // [data-idx] excludes company group checkboxes, which have no
      // dataset.idx of their own.
      document.querySelectorAll("#ets-installation-options input[type=checkbox][data-idx]").forEach(cb => {
        cb.checked = false;
        state.installs.delete(+cb.dataset.idx);
      });
      onFilterChange();
    });

    const yFrom = document.getElementById("ets-year-from");
    const yTo = document.getElementById("ets-year-to");
    yFrom.min = yTo.min = YEAR_MIN;
    yFrom.max = yTo.max = YEAR_MAX;
    yFrom.value = state.yearFrom;
    yTo.value = state.yearTo;
    yFrom.addEventListener("input", function () {
      state.yearFrom = Math.min(+this.value, state.yearTo);
      this.value = state.yearFrom;
      updateYearBar();
      renderCompanyOptions(document.getElementById("ets-company-search").value);
      update();
    });
    yTo.addEventListener("input", function () {
      state.yearTo = Math.max(+this.value, state.yearFrom);
      this.value = state.yearTo;
      updateYearBar();
      renderCompanyOptions(document.getElementById("ets-company-search").value);
      update();
    });
    // The two year captions are inputs: applied on change (blur or Enter)
    // rather than on every keystroke, so a half-typed "20" is not clamped to
    // the range before the reader finishes.
    const yFromVal = document.getElementById("ets-year-from-val");
    const yToVal = document.getElementById("ets-year-to-val");
    [yFromVal, yToVal].forEach(el => { el.min = YEAR_MIN; el.max = YEAR_MAX; });
    function applyTypedYears() {
      const clamp = v => Math.min(Math.max(Math.round(v), YEAR_MIN), YEAR_MAX);
      let a = clamp(Number(yFromVal.value) || state.yearFrom);
      let b = clamp(Number(yToVal.value) || state.yearTo);
      if (a > b) { const t = a; a = b; b = t; }   // typing a start past the end swaps them
      state.yearFrom = a;
      state.yearTo = b;
      yFrom.value = a;
      yTo.value = b;
      updateYearBar();
      renderCompanyOptions(document.getElementById("ets-company-search").value);
      update();
    }
    yFromVal.addEventListener("change", applyTypedYears);
    yToVal.addEventListener("change", applyTypedYears);

    renderPhaseAnnotations();
    updateYearBar();
  }

  function updateYearBar() {
    document.getElementById("ets-year-from-val").value = state.yearFrom;
    document.getElementById("ets-year-to-val").value = state.yearTo;
    const span = YEAR_MAX - YEAR_MIN || 1;
    const fromPct = (state.yearFrom - YEAR_MIN) / span * 100;
    const toPct = (state.yearTo - YEAR_MIN) / span * 100;
    const fill = document.getElementById("ets-year-fill");
    fill.style.left = fromPct + "%";
    fill.style.width = (toPct - fromPct) + "%";

    // A phase label lights up while any part of that phase falls inside the
    // selected range, so the reader can see which trading phases they are
    // looking at without reading the years off the boxes above. It is an
    // overlap test, not "a handle is standing in it": a phase wholly enclosed
    // by the range holds neither handle and is the most covered of all.
    document.querySelectorAll("#ets-phase-annotations .phase-annotation").forEach(el => {
      const overlaps = +el.dataset.from <= state.yearTo && +el.dataset.to >= state.yearFrom;
      el.classList.toggle("is-active", overlaps);
    });
  }

  // EU ETS trading phases — fixed regulatory dates, not derived from the data.
  // Only each phase's first year is stated; its last is the year before the
  // next one starts, and the tick between them sits on the half year. Stating
  // the starts alone is what keeps the ticks, the labels' midpoints and the
  // overlap test in updateYearBar from being able to disagree.
  const PHASE_STARTS = [
    { label: "Fáze II", start: 2008 },
    { label: "Fáze III", start: 2013 },
    { label: "Fáze IV", start: 2021 },
  ];

  // Drawn below the year slider. Tick marks on the track show where each phase
  // starts; the labels just name it (the years are already visible via the
  // ticks and the slider's own min/max, so they are not repeated in text).
  // The first label sits flush left and the last flush right, like axis
  // min/max labels, since both run to the edge of the data range; the
  // fully-enclosed ones are centred on their own midpoint.
  function renderPhaseAnnotations() {
    const span = YEAR_MAX - YEAR_MIN || 1;
    const pct = y => (y - YEAR_MIN) / span * 100;
    const phases = PHASE_STARTS.map((p, i) => ({
      label: p.label,
      from: Math.max(p.start, YEAR_MIN),
      to: i + 1 < PHASE_STARTS.length ? PHASE_STARTS[i + 1].start - 1 : YEAR_MAX,
    }));
    const boundaries = phases.slice(1)
      .map(p => p.from - 0.5)
      .filter(y => y > YEAR_MIN && y < YEAR_MAX);

    // Placed in the thumbs' own coordinate system, not as a plain percentage
    // of the track: a range input centres its thumb within the track minus one
    // thumb width, so the two scales diverge by up to half a thumb and a
    // boundary next to a handle ends up hidden underneath it. --ets-thumb is
    // defined on .dual-range, alongside the thumb's own width.
    const ticks = document.getElementById("ets-year-phase-ticks");
    ticks.innerHTML = boundaries.map(y =>
      `<span class="range-tick" style="left:calc(var(--ets-thumb) / 2 + (100% - var(--ets-thumb)) * ${pct(y) / 100})"></span>`
    ).join("");

    const labels = document.getElementById("ets-phase-annotations");
    labels.innerHTML = phases.map((p, i) => {
      const place = i === 0 ? 'class="phase-annotation phase-annotation--left"'
        : i === phases.length - 1 ? 'class="phase-annotation phase-annotation--right"'
        : `class="phase-annotation phase-annotation--center" style="left:${pct((p.from + p.to) / 2)}%"`;
      return `<span ${place} data-from="${p.from}" data-to="${p.to}">${p.label}</span>`;
    }).join("");
  }

  // ── Filter summary ───────────────────────────────────────────────────────
  // One segment each for activity / owner / installation, derived from
  // what's ACTUALLY in the filtered result set — not just what's explicitly
  // checked in that facet's own dropdown. "Hlavní odvětví" in particular has
  // no filter control of its own any more, so this is the only place its
  // value (implied by the other facets) is surfaced at all. Few enough
  // distinct values → name them; otherwise just a count. Sits below the
  // filter controls, describing the whole page's current selection rather
  // than any one chart.
  // Past this many values a facet is counted rather than listed by name.
  // Shared by both summary lines so they do not disagree about when a list
  // becomes a count.
  const NAME_LIMIT = 3;

  function updateFilterSummary(idxs) {
    const full = document.getElementById("ets-filter-summary");
    const narrowed = document.getElementById("ets-activity-filter-summary");
    if (idxs.length === 0) {
      full.textContent = "Pro tento výběr nejsou k dispozici žádná data.";
      if (narrowed) narrowed.textContent = "";
      return;
    }
    const distinctRa = [...new Set(idxs.map(i => INSTALLS[i].ra).filter(Boolean))];
    const distinctCos = [...new Set(idxs.map(i => INSTALLS[i].own))];
    // Chart 2's line stands alone — its heading names no part of the selection
    // — so unlike chart 1's it states every facet, not only the narrowed ones.
    // Each is read off the filtered result rather than off the checkboxes, so
    // it describes what is actually plotted above it.


    // "Průmysl" is every real activity except the primary one, and reads far
    // better than "9 odvětví". Recognised from the result rather than from the
    // dropdown's own state, so it cannot claim the whole of industry while
    // another facet has since narrowed the selection to part of it.
    const industrial = getIndustrialRealActivities();
    const wholeIndustry = distinctRa.length === industrial.length &&
      industrial.every(ra => distinctRa.includes(ra));

    const raText =
      distinctRa.length === ALL_REAL_ACTIVITIES.size ? "Všechna odvětví"
      : wholeIndustry ? "Průmysl"
      : distinctRa.length <= NAME_LIMIT ? "Odvětví: " + distinctRa.join(", ")
      : distinctRa.length + " odvětví";

    // Nominative plural for 2-4 and genitive plural for 5+, which is what
    // pluralCz buckets; "odvětví" and "zařízení" are identical in both.
    const ownText =
      distinctCos.length === ALL_OWNERS.size ? "Všichni vlastníci"
      : distinctCos.length <= NAME_LIMIT
        ? (distinctCos.length === 1 ? "Současný vlastník: " : "Současní vlastníci: ") +
          distinctCos.join(", ")
      : distinctCos.length + " " + pluralCz(distinctCos.length, "vlastníci", "vlastníků");

    const instText =
      idxs.length === INSTALLS.length ? "Všechna zařízení"
      : idxs.length <= NAME_LIMIT ? "Zařízení: " + idxs.map(i => INSTALLS[i].n).join(", ")
      : idxs.length + " zařízení";

    // Owners are the one facet that can be dropped: naming the individual
    // installations already pins the selection down to its finest grain, and
    // the owner is then a property of those plants rather than a choice the
    // reader made.
    if (narrowed) {
      narrowed.textContent = (facetNarrowed(state.installs, INSTALLS.length)
        ? [raText, instText]
        : [raText, ownText, instText]).join(" · ");
    }

    // Chart 1's heading already names one facet and the period, so its line
    // carries only what the heading leaves out: the facets the reader actually
    // restricted, minus the one the heading speaks for. Built from the
    // selections rather than from the result — picking a single owner should
    // not spell out the sectors that owner happens to span, since the reader
    // never chose those.
    const spoken = titleNamesItsFacet() ? titleFacet() : null;
    const line = [];
    const ra = [...state.realActivities];
    const own = [...state.companies];
    const inst = [...state.installs];

    if (spoken !== "ra" && facetNarrowed(state.realActivities, sortedRealActivities.length)) {
      line.push(isWholeIndustrySelected() ? "Průmysl"
        : ra.length <= NAME_LIMIT ? "Odvětví: " + ra.join(", ")
        : ra.length + " odvětví");
    }
    // Owners are the one facet worth naming even when the reader never opened
    // its dropdown: choosing an installation chooses its owner implicitly, and
    // for a single plant that is exactly what the line should say. So whenever
    // the installation facet narrows the selection the owners are read off the
    // result instead — which also keeps the line honest when an owner was
    // ticked whose plants the installation filter then excluded.
    const ownNamed = facetNarrowed(state.installs, INSTALLS.length) ? distinctCos
      : facetNarrowed(state.companies, ALL_OWNERS.size) ? own
      : null;
    if (spoken !== "own" && ownNamed) {
      line.push(ownNamed.length <= NAME_LIMIT
        ? (ownNamed.length === 1 ? "Současný vlastník: " : "Současní vlastníci: ") + ownNamed.join(", ")
        : ownNamed.length + " " + pluralCz(ownNamed.length, "vlastníci", "vlastníků"));
    }
    if (spoken !== "inst" && facetNarrowed(state.installs, INSTALLS.length)) {
      line.push(inst.length <= NAME_LIMIT
        ? "Zařízení: " + inst.map(i => INSTALLS[i].n).join(", ")
        : inst.length + " zařízení");
    }
    full.textContent = line.join(" · ");
  }

  // ── KPIs ──────────────────────────────────────────────────────────────────
  function updateKPIs(idxs) {
    let e = 0, a = 0;
    idxs.forEach(i => {
      (recordsByInstall.get(i) || []).forEach(r => {
        const [, y, em, al] = r;
        if (y < state.yearFrom || y > state.yearTo) return;
        e += em || 0;
        a += al || 0;
      });
    });
    // "CO2" rides with the value, not the label — the unit itself (t/kt/Mt)
    // comes from fmt() and changes with magnitude, so the suffix is appended
    // here rather than sitting static in the markup. <sub> for a real
    // subscript, as the label used to render it.
    const emisEl = document.getElementById("ets-kpi-e");
    emisEl.textContent = fmt(e) + " CO";
    emisEl.appendChild(document.createElement("sub")).textContent = "2";
    document.getElementById("ets-kpi-a").textContent = fmt(a, "povolenek");
    // Share of emissions covered by free allocation — the aggregate of the
    // per-sector "Povolenky zdarma" column in chart 2, so it is rounded the
    // same way and likewise not capped at 100 % (over-allocation is the
    // finding worth showing). Undefined with no emissions to divide by.
    const share = e > 0 ? Math.round(a / e * 100) : null;
    document.getElementById("ets-kpi-share").textContent =
      share == null ? "—" : share + " %";
  }

  // ── Tooltip ───────────────────────────────────────────────────────────────
  const tip = document.getElementById("tooltip");
  function showTip(ev, html) { tip.innerHTML = html; tip.style.display = "block"; moveTip(ev); }
  function moveTip(ev) {
    // Flip to the other side of the cursor rather than clamping to the
    // viewport edge: the card's width varies with its content, so a fixed
    // clamp would either overflow or park it far from the pointer.
    const pad = 12;
    const tw = tip.offsetWidth, th = tip.offsetHeight;
    let x = ev.clientX + pad, y = ev.clientY + pad;
    if (x + tw > window.innerWidth - 4) x = ev.clientX - tw - pad;
    if (y + th > window.innerHeight - 4) y = ev.clientY - th - pad;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
  }
  function hideTip() { tip.style.display = "none"; }

  // Filter rows and the closed dropdown buttons ellipsise long names, so the
  // full text shows on hover. The browser's native title= waits well over a
  // second and cannot be restyled, so those elements carry data-tip and reuse
  // this tooltip instead. The delay is what keeps sweeping down a long list
  // from flashing a card on every row on the way past.
  const TIP_DELAY_MS = 500;
  let tipTimer = null;
  // textContent, not innerHTML: these strings are owner and installation
  // names straight from the dataset.
  function showTipText(ev, text) {
    tip.textContent = text;
    tip.style.display = "block";
    moveTip(ev);
  }
  // Guarded because an SVG element's `closest` is missing in older engines,
  // and these listeners see every pointer event on the page.
  const tipTarget = ev => (ev.target.closest ? ev.target.closest("[data-tip]") : null);

  document.addEventListener("mouseover", ev => {
    const el = tipTarget(ev);
    if (!el) return;
    clearTimeout(tipTimer);
    tipTimer = setTimeout(() => showTipText(ev, el.dataset.tip), TIP_DELAY_MS);
  });
  document.addEventListener("mousemove", ev => {
    if (tip.style.display === "block" && tipTarget(ev)) moveTip(ev);
  });
  document.addEventListener("mouseout", ev => {
    if (!tipTarget(ev)) return;
    clearTimeout(tipTimer);
    hideTip();
  });

  // The hatch swatch in both legends is drawn with the chart's own pattern
  // rather than approximated in CSS: a repeating-linear-gradient rotates the
  // opposite way to SVG's patternTransform, so it would mirror the stripes,
  // and it could not follow the angle/width at all.
  const LEGEND_HATCH_SCALE = 0.7;
  function renderLegendSwatches() {
    document.querySelectorAll(".legend-swatch.hatch-light").forEach((el, i) => {
      el.innerHTML = "";
      const id = "ets-hatch-legend-" + i;
      const svg = d3.select(el).append("svg")
        .attr("width", "100%").attr("height", "100%");
      addHatch(svg.append("defs"), id, LEGEND_HATCH_SCALE);
      svg.append("rect").attr("width", "100%").attr("height", "100%")
        .attr("fill", `url(#${id})`);
    });
  }

  // ── Chart 1 title ─────────────────────────────────────────────────────────
  // Names the narrowest scope it can state cleanly. There is no subtitle, so a
  // phrase must never claim more than is really selected — hence the
  // "vybraných …" forms whenever a facet holds several values that cannot all
  // be named. Proper names (an installation, an owner) lead the sentence;
  // categories follow the "Emise a povolenky zdarma …" stem.

  // Built from the years actually plotted, not the slider, so a selection whose
  // data starts later does not claim a period it has no bars for.
  function periodPhrase(years) {
    const from = years.length ? years[0] : state.yearFrom;
    const to = years.length ? years[years.length - 1] : state.yearTo;
    return from === to ? `v roce ${from}` : `za období ${from}–${to}`;
  }

  function sectorPhrase(ra) {
    // The catch-all would otherwise read "v odvětví ostatní odvětví".
    if (normalizeActName(ra) === REAL_ACTIVITY_OTHER) return "v ostatních odvětvích";
    // A trailing parenthetical is an explanatory gloss ("Ostatní minerály
    // (keramika, cihly, …)") — useful on an axis, far too long in a headline.
    const name = ra.replace(/\s*\(.*\)\s*$/, "");
    return "v odvětví " + name.charAt(0).toLowerCase() + name.slice(1);
  }

  // Returns the parts separately: the period is set in regular weight, so it
  // goes in its own element rather than into one string.
  // A facet counts as narrowed only if it was actually restricted: an empty
  // set and a fully ticked one both mean "no restriction".
  function facetNarrowed(sel, total) {
    return sel.size > 0 && !isEverySelected(sel, total);
  }
  // True when the heading names its facet outright — a single installation or
  // owner, a single sector, the whole industry group, or nothing filtered. Its
  // vague forms ("ve vybraných zařízeních") say which facet but not which
  // values, so the summary still has to spell those out.
  function titleNamesItsFacet() {
    const f = titleFacet();
    if (f === "inst") return state.installs.size === 1;
    if (f === "own") return state.companies.size === 1;
    const sel = state.realActivities;
    return !facetNarrowed(sel, sortedRealActivities.length) ||
      isWholeIndustrySelected() || sel.size === 1;
  }

  // The facet the heading speaks for — the narrowest one that is narrowed.
  function titleFacet() {
    if (facetNarrowed(state.installs, INSTALLS.length)) return "inst";
    if (facetNarrowed(state.companies, ALL_OWNERS.size)) return "own";
    return "ra";
  }

  function timelineTitle(years) {
    const period = periodPhrase(years);
    const named = subject => ({ lead: `${subject}: emise a povolenky zdarma`, period });
    const about = phrase => ({ lead: `Emise a povolenky zdarma ${phrase}`, period });

    if (facetNarrowed(state.installs, INSTALLS.length)) {
      return state.installs.size === 1
        ? named(INSTALLS[[...state.installs][0]].n)
        : about("ve vybraných zařízeních");
    }
    if (facetNarrowed(state.companies, ALL_OWNERS.size)) {
      return state.companies.size === 1
        ? named([...state.companies][0])
        : about("u vybraných vlastníků");
    }

    const sel = state.realActivities;
    if (!facetNarrowed(sel, sortedRealActivities.length))
      return about("v EU ETS");
    if (isWholeIndustrySelected()) return about("v průmyslu");
    if (sel.size === 1) return about(sectorPhrase([...sel][0]));
    return about("ve vybraných odvětvích");
  }

  // ── Chart 1: timeline — one emissions bar per year, uncovered share
  // overlaid on it, allocation drawn as a marker (optionally a staircase) ──
  function renderTimeline(idxs) {
    const svgEl = document.getElementById("ets-svg-timeline");
    const W0 = svgEl.clientWidth, H0 = svgEl.clientHeight;
    if (!W0 || !H0) return;

    const mg = TL_MARGIN;
    const W = W0 - mg.left - mg.right;
    const H = H0 - mg.top - mg.bottom;

    d3.select(svgEl).selectAll("*").remove();

    d3.select(svgEl).append("defs");

    const svg = d3.select(svgEl).append("g").attr("transform", `translate(${mg.left},${mg.top})`);

    const byYear = {};
    idxs.forEach(i => {
      (recordsByInstall.get(i) || []).forEach(r => {
        const [, y, em, al] = r;
        if (!byYear[y]) byYear[y] = { y, e: 0, a: 0 };
        byYear[y].e += em || 0;
        byYear[y].a += al || 0;
      });
    });

    const allYears = d3.range(YEAR_MIN, YEAR_MAX + 1);
    const dataMap = byYear;
    allYears.forEach(yr => {
      const d = dataMap[yr];
      if (!d) return;
      d.deficit = Math.max(d.e - d.a, 0); // emissions above what allocation covers
      d.top = Math.max(d.e, d.a);
    });
    const visibleYears = allYears.filter(yr => dataMap[yr] && state.yearFrom <= yr && yr <= state.yearTo);
    // Built as nodes, not innerHTML: the lead carries installation and owner
    // names straight from the dataset.
    const { lead, period } = timelineTitle(visibleYears);
    const titleEl = document.getElementById("ets-timeline-title");
    titleEl.textContent = lead + " ";
    const periodEl = document.createElement("span");
    periodEl.className = "title-period";
    periodEl.textContent = period;
    titleEl.appendChild(periodEl);
    const maxVal = d3.max(visibleYears, yr => dataMap[yr].top) || 1;
    // Bar width is fixed at whatever it is for the full year span, so
    // narrowing the selection makes the chart narrower instead of making the
    // bars fatter. Sizing the range to the visible count at that same step
    // keeps the bars left-aligned against the value axis, with the freed
    // space left empty on the right.
    const stepFull = W / (FULL_YEARS + CFG.barPadding);
    const x = d3.scaleBand()
      .domain(visibleYears)
      .range([0, stepFull * (visibleYears.length + CFG.barPadding)])
      .padding(CFG.barPadding);
    const y = d3.scaleLinear().domain([0, maxVal * 1.05]).range([H, 0]).nice();

    svg.append("g")
      .call(d3.axisLeft(y).tickSize(-W).tickFormat("").ticks(CFG.tickCount))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", CFG.gridColor));

    // One bar per year: total verified emissions. The share free allocation
    // does not cover is drawn over its top, so a year reads as a single
    // quantity with a marked part rather than as a stack of three.
    svg.selectAll(".bar-emissions")
      .data(visibleYears)
      .join("rect").attr("class", "bar-emissions")
      .attr("x", yr => x(yr)).attr("y", yr => y(dataMap[yr].e))
      .attr("width", x.bandwidth()).attr("height", yr => H - y(dataMap[yr].e))
      .attr("fill", CFG.colorEmissions);

    svg.selectAll(".bar-uncovered")
      .data(visibleYears.filter(yr => dataMap[yr].deficit > 0))
      .join("rect").attr("class", "bar-uncovered")
      .attr("x", yr => x(yr)).attr("y", yr => y(dataMap[yr].e))
      .attr("width", x.bandwidth())
      .attr("height", yr => y(dataMap[yr].a) - y(dataMap[yr].e))
      .attr("fill", CFG.colorUncovered);

    // Over-allocation as a hatched block up to the allocation marker. Off by
    // default: the marker already shows it by floating above the bar.
    if (CFG.showSurplus) {
      addHatch(d3.select(svgEl).select("defs"), "ets-hatch-surplus");
      svg.selectAll(".bar-surplus")
        .data(visibleYears.filter(yr => dataMap[yr].a > dataMap[yr].e))
        .join("rect").attr("class", "bar-surplus")
        .attr("x", yr => x(yr)).attr("y", yr => y(dataMap[yr].a))
        .attr("width", x.bandwidth()).attr("height", yr => y(dataMap[yr].e) - y(dataMap[yr].a))
        .attr("fill", "url(#ets-hatch-surplus)");
    }

    // Allocation marker — either one flat segment sitting on each bar
    // (default), or a continuous staircase whose treads span the full band
    // step, so the year-to-year change reads as one line with visible risers.
    if (CFG.allocStepped) {
      const gap = x.step() - x.bandwidth();
      let d = "";
      visibleYears.forEach((yr, i) => {
        const lvl = y(dataMap[yr].a);
        // Treads are widened by half a gap on each side, so consecutive years
        // meet exactly and the riser between them is a single vertical line.
        d += (i === 0 ? `M${x(yr) - gap / 2},${lvl}` : `V${lvl}`) +
             `H${x(yr) + x.bandwidth() + gap / 2}`;
      });
      markerPasses(CFG.lineWidth).forEach(([stroke, width]) => {
        svg.append("path").attr("class", "line-allocation")
          .attr("d", d).attr("fill", "none")
          .attr("stroke", stroke).attr("stroke-width", width)
          .attr("stroke-linejoin", "miter");
      });
    } else {
      // A separate class per pass, so the second pass joins its own elements
      // instead of re-binding the halo's.
      markerPasses(CFG.lineWidth).forEach(([stroke, width], i) => {
        svg.selectAll(".line-allocation-" + i)
          .data(visibleYears)
          .join("line").attr("class", "line-allocation-" + i)
          .attr("x1", yr => x(yr)).attr("x2", yr => x(yr) + x.bandwidth())
          .attr("y1", yr => y(dataMap[yr].a)).attr("y2", yr => y(dataMap[yr].a))
          .attr("stroke", stroke).attr("stroke-width", width);
      });
    }

    svg.selectAll(".hover-zone")
      .data(visibleYears)
      .join("rect").attr("class", "hover-zone")
      .attr("x", yr => x(yr)).attr("y", 0)
      .attr("width", x.bandwidth()).attr("height", H)
      .attr("fill", "transparent")
      .on("mouseover", function (event, yr) {
        const d = dataMap[yr];
        // Same rounding and the same uncapped treatment as the KPI card and
        // chart 2's column, so the three never disagree for a given year.
        const share = d.e > 0 ? Math.round(d.a / d.e * 100) + " %" : "—";
        showTip(event,
          `<strong>${yr}</strong><br>` +
          `Ověřené emise: <strong>${fmt(d.e)}</strong><br>` +
          `Bezplatné povolenky: <strong>${fmt(d.a)}</strong><br>` +
          `Pokrytí emisí povolenkami zdarma: <strong>${share}</strong>`
        );
      })
      .on("mousemove", moveTip)
      .on("mouseout", hideTip);

    // Every year label collides at phone width, so only multiples of five are
    // labelled. A range too narrow to hold two of those falls back to its first
    // and last year, so the axis is never left unlabelled.
    let tickYears = visibleYears;
    if (MOBILE.matches && visibleYears.length > 2) {
      const byFive = visibleYears.filter(yr => yr % 5 === 0);
      tickYears = byFive.length >= 2
        ? byFive
        : [visibleYears[0], visibleYears[visibleYears.length - 1]];
    }

    svg.append("g").attr("transform", `translate(0,${H})`)
      .call(d3.axisBottom(x).tickValues(tickYears).tickFormat(d3.format("d")))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").remove())
      .call(g => g.selectAll(".tick text").attr("font-size", CFG.axisFontSize + "px").attr("fill", CFG.axisTextColor));
    const leftAxis = svg.append("g")
      .call(d3.axisLeft(y).ticks(CFG.tickCount).tickFormat(fmtShort))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", CFG.gridColor))
      .call(g => g.selectAll(".tick text").attr("font-size", CFG.axisFontSize + "px").attr("fill", CFG.axisTextColor));

    // Unit caption, flush with the left edge of the widest tick label so the
    // axis reads as one column. Measured from the rendered labels rather than
    // guessed, since their width depends on the formatted values and the
    // font size, both of which change.
    const tickLefts = [];
    leftAxis.selectAll(".tick text").each(function () { tickLefts.push(this.getBBox().x); });
    svg.append("text")
      .attr("x", tickLefts.length ? Math.min(...tickLefts) : -mg.left + 2)
      .attr("y", -12)
      .attr("font-size", CFG.axisFontSize + "px").attr("fill", CFG.axisTextColor)
      .text("Povolenky / tuny CO₂");
  }

  // ── Chart 2: activity breakdown — one emissions bar per sector, uncovered
  // share overlaid on it, allocation marked by a plain line ──────────────────
  function renderActivityChart(idxs) {
    const svgEl = document.getElementById("ets-svg-activity");
    const W0 = svgEl.clientWidth;
    const chart1Bar = fixedBarWidth();
    // Zero means chart 1 has not been laid out yet — test that, not the
    // floored value below, which is never zero.
    if (!W0 || !chart1Bar) return;
    // Rows follow chart 1's bar width but never drop below the floor, so the
    // sector labels stay legible on a narrow screen. Past that point the two
    // charts no longer match in thickness — legibility wins.
    const barThickness = Math.max(chart1Bar, CFG.minBarActivity);

    // Both grouping keys are already display-ready strings on the
    // installation, so neither needs a lookup array.
    const byOwner = activityGroupBy === "own";
    const keyOf = i => (byOwner ? INSTALLS[i].own : INSTALLS[i].ra) || "Neuvedeno";
    document.getElementById("ets-activity-title").textContent = byOwner
      ? "Kolik vybraných emisí pokryly povolenky zdarma podle vlastníka?"
      : "Kolik vybraných emisí pokryly povolenky zdarma podle odvětví?";

    const byKey = {};
    idxs.forEach(i => {
      const key = keyOf(i);
      if (!byKey[key]) byKey[key] = { key, e: 0, a: 0 };
      (recordsByInstall.get(i) || []).forEach(r => {
        const [, y, em, al] = r;
        if (y < state.yearFrom || y > state.yearTo) return;
        byKey[key].e += em || 0;
        byKey[key].a += al || 0;
      });
    });

    const ranked = Object.values(byKey)
      .filter(d => d.e > 0 || d.a > 0)
      .sort((a, b) => b.e - a.e);
    // There are only ~10 real activities, so they all fit. Owners run to 180,
    // where the top 10 are 86 % of emissions — so the tail is summed into a
    // final row rather than dropped, keeping the rows adding up to the KPI
    // cards above. It is appended after sorting so it stays last, even though
    // its total would otherwise place it near the top.
    let data;
    if (byOwner && ranked.length > ACTIVITY_OWNER_ROWS) {
      const tail = ranked.slice(ACTIVITY_OWNER_ROWS);
      data = ranked.slice(0, ACTIVITY_OWNER_ROWS).concat([tail.reduce((acc, d) => {
        acc.e += d.e; acc.a += d.a; return acc;
      }, { key: `Ostatní vlastníci (${tail.length})`, e: 0, a: 0 })]);
    } else {
      data = ranked.slice(0, 12);
    }

    // mg.right reserves the fixed-position "X %" column to the right of the
    // bars, showing the share of that row's emissions matched by free
    // allocation. mg.top makes room for that column's header.
    // At phone width the desktop margins (230 + 150) exceed the whole SVG, so
    // the plot collapses to its 40px floor — hence a narrower set, paired with
    // the shortened axis labels in SHORT_ACTIVITY_NAMES.
    const mg = MOBILE.matches
      ? { top: 46, right: 64, bottom: 24, left: 116 }
      : { top: 46, right: 150, bottom: 24, left: 230 };
    const W = W0 - mg.left - mg.right;
    // Rows are as thick as chart 1's bars, so the height follows from how many
    // sectors there are rather than being set in CSS. Sizing the range this
    // way makes scaleBand's bandwidth come out exactly at barThickness.
    const rowStep = barThickness / (1 - CFG.barPaddingActivity);
    const H = data.length
      ? rowStep * (data.length + CFG.barPaddingActivity)
      : 80; // nothing to plot — just enough room for the empty-state message
    svgEl.style.height = (H + mg.top + mg.bottom) + "px";

    d3.select(svgEl).selectAll("*").remove();
    const svg = d3.select(svgEl).append("g").attr("transform", `translate(${mg.left},${mg.top})`);

    if (!data.length) {
      svg.append("text").attr("x", W / 2).attr("y", H / 2)
        .attr("text-anchor", "middle").attr("fill", "#a0aec0").attr("font-size", "15px")
        .text("Pro tento výběr nejsou k dispozici žádná data.");
      return;
    }

    // Allocation as a share of emissions — not capped at 100%, since a
    // surplus (allocation > emissions) is exactly the case worth surfacing.
    // The wording lives once in the column header instead of on every row.
    const shareText = d => `${Math.round(d.a / d.e * 100)} %`;

    // Same encoding as chart 1 — one emissions bar with the uncovered share
    // overlaid — except the allocation marker is a plain line per row, never
    // a staircase (the rows are sectors, not a time series).
    data.forEach(d => {
      d.surplus = Math.max(d.a - d.e, 0);
      d.deficit = Math.max(d.e - d.a, 0);
      d.top = Math.max(d.e, d.a);
    });

    const maxVal = d3.max(data, d => d.top) || 1;
    const y = d3.scaleBand().domain(data.map(d => d.key)).range([0, H]).padding(CFG.barPaddingActivity);
    const x = d3.scaleLinear().domain([0, maxVal]).range([0, Math.max(W, 40)]).nice();

    if (CFG.showSurplus) addHatch(svg.append("defs"), "ets-hatch-surplus-activity");

    svg.append("g")
      .call(d3.axisBottom(x).tickSize(H).tickFormat("").ticks(CFG.tickCountActivity))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", CFG.gridColor).attr("y1", -H));

    function tipHtml(d) {
      const extra = d.surplus > 0
        ? `Povolenky zdarma alokované navíc: <strong>${fmt(d.surplus)}</strong><br>`
        : d.deficit > 0
        ? `Emise nepokryté povolenkami zdarma: <strong>${fmt(d.deficit)}</strong><br>`
        : "";
      return `<strong>${d.key}</strong><br>` +
        `Ověřené emise: <strong>${fmt(d.e)}</strong><br>` +
        `Bezplatné povolenky: <strong>${fmt(d.a)}</strong><br>` +
        extra;
    }

    svg.selectAll(".a-bar-emissions")
      .data(data).join("rect").attr("class", "a-bar-emissions")
      .attr("y", d => y(d.key)).attr("x", 0)
      .attr("height", y.bandwidth()).attr("width", d => x(d.e))
      .attr("fill", CFG.colorEmissions)
      .on("mouseover", (ev, d) => showTip(ev, tipHtml(d)))
      .on("mousemove", moveTip).on("mouseout", hideTip);

    svg.selectAll(".a-bar-uncovered")
      .data(data.filter(d => d.deficit > 0)).join("rect").attr("class", "a-bar-uncovered")
      .attr("y", d => y(d.key)).attr("x", d => x(d.a))
      .attr("height", y.bandwidth()).attr("width", d => x(d.e) - x(d.a))
      .attr("fill", CFG.colorUncovered)
      .on("mouseover", (ev, d) => showTip(ev, tipHtml(d)))
      .on("mousemove", moveTip).on("mouseout", hideTip);

    if (CFG.showSurplus) {
      svg.selectAll(".a-bar-surplus")
        .data(data.filter(d => d.surplus > 0)).join("rect").attr("class", "a-bar-surplus")
        .attr("y", d => y(d.key)).attr("x", d => x(d.e))
        .attr("height", y.bandwidth()).attr("width", d => x(d.a) - x(d.e))
        .attr("fill", "url(#ets-hatch-surplus-activity)")
        .on("mouseover", (ev, d) => showTip(ev, tipHtml(d)))
        .on("mousemove", moveTip).on("mouseout", hideTip);
    }

    markerPasses(CFG.lineWidthActivity).forEach(([stroke, width], i) => {
      svg.selectAll(".a-line-allocation-" + i)
        .data(data)
        .join("line").attr("class", "a-line-allocation-" + i)
        .attr("y1", d => y(d.key)).attr("y2", d => y(d.key) + y.bandwidth())
        .attr("x1", d => x(d.a)).attr("x2", d => x(d.a))
        .attr("stroke", stroke).attr("stroke-width", width);
    });

    // Separate fixed-position right-hand column (independent of bar length)
    // showing the share of that row's emissions actually matched by free
    // allocation — e.g. "124 %", under a single column-name heading rather
    // than repeating the wording on every row.
    // Set in the same type as the values it heads and right-aligned with them,
    // wrapped onto two lines so it stays inside the column's width. Laid out
    // upwards from the plot edge, so adding a line grows into mg.top.
    const shareX = W + mg.right - 16;
    const headLines = ["Pokrytí emisí", "povolenkami zdarma"];
    const headLineH = Math.round(CFG.valueFontSize * 1.25);
    const head = svg.append("text")
      .attr("x", shareX)
      .attr("y", -10 - (headLines.length - 1) * headLineH)
      .attr("text-anchor", "end")
      .attr("font-size", CFG.valueFontSize + "px")
      .attr("font-weight", "500")
      .attr("fill", "#2d3748");
    headLines.forEach((line, i) => head.append("tspan")
      .attr("x", shareX).attr("dy", i ? headLineH : 0).text(line));

    svg.selectAll(".a-share-label")
      .data(data.filter(d => d.e > 0))
      .join("text").attr("class", "a-share-label")
      .attr("x", W + mg.right - 16)
      .attr("y", d => y(d.key) + y.bandwidth() / 2)
      .attr("dy", "0.32em")
      .attr("text-anchor", "end")
      .attr("font-size", CFG.valueFontSize + "px")
      .attr("font-weight", "500")
      .attr("fill", "#2d3748")
      .text(shareText);

    svg.append("g")
      .call(d3.axisLeft(y).tickFormat(activityLabel))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").remove())
      .call(g => g.selectAll(".tick text").attr("font-size", CFG.axisLabelFontSize + "px").attr("fill", CFG.axisTextColor)
        .call(wrapText, mg.left - 20, -10));

    svg.append("g").attr("transform", `translate(0,${H})`)
      .call(d3.axisBottom(x).ticks(CFG.tickCountActivity).tickFormat(fmtShort))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", CFG.gridColor))
      .call(g => g.selectAll(".tick text").attr("font-size", CFG.axisFontSize + "px").attr("fill", CFG.axisTextColor));
  }

  // Wrap long activity-name axis labels onto two lines instead of overflowing.
  function wrapText(selection, width, xOffset) {
    xOffset = xOffset == null ? -10 : xOffset;
    selection.each(function () {
      const text = d3.select(this);
      const words = (text.text() || "").split(/\s+/).reverse();
      let word, line = [], lineNumber = 0;
      const y = text.attr("y") || 0;
      const dy = 0.32;
      text.text(null);
      let tspan = text.append("tspan").attr("x", xOffset).attr("y", y).attr("dy", dy + "em");
      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width && line.length > 1) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          lineNumber++;
          if (lineNumber >= 2) { tspan.text(tspan.text() + "…"); break; }
          tspan = text.append("tspan").attr("x", xOffset).attr("y", y).attr("dy", (lineNumber + dy) + "em").text(word);
        }
      }
    });
  }

  // ── Sankey: hlavní ETS aktivita → skutečné odvětví ──────────────────────────
  // Explains, in the methodology expander, why "Hlavní odvětví (dle ETS)" and
  // "Skutečné odvětví" sometimes diverge (e.g. a steelworks' own boiler is
  // formally classified under "Výroba elektřiny a tepla"). Deliberately static
  // — cumulative emissions across the WHOLE dataset, not filtered by the
  // page's controls, since it's illustrating a fixed data quirk rather than
  // the current selection. Uses a fixed internal viewBox (not the panel's
  // measured clientWidth/clientHeight like the other two charts) because it
  // lives inside a collapsed dropdown at page load, where clientWidth/Height
  // would read 0.
  function renderSankeyChart() {
    const svgEl = document.getElementById("ets-svg-sankey");
    if (!svgEl) return;

    const emByInstall = new Map();
    RECORDS.forEach(r => {
      const [idx, , em] = r;
      if (em) emByInstall.set(idx, (emByInstall.get(idx) || 0) + em);
    });

    const flowMap = new Map(); // "act|||ra" -> Mt
    INSTALLS.forEach((inst, i) => {
      const v = emByInstall.get(i) || 0;
      if (v <= 0) return;
      const act = ACTIVITIES[inst.act].short;
      const ra = inst.ra || "Neuvedeno";
      const key = act + "|||" + ra;
      flowMap.set(key, (flowMap.get(key) || 0) + v);
    });
    const links = [...flowMap.entries()].map(([key, value]) => {
      const [act, ra] = key.split("|||");
      return { act, ra, value: value / 1e6 }; // Mt
    });
    if (!links.length) return;

    const srcTotals = new Map(), tgtTotals = new Map();
    links.forEach(l => {
      srcTotals.set(l.act, (srcTotals.get(l.act) || 0) + l.value);
      tgtTotals.set(l.ra, (tgtTotals.get(l.ra) || 0) + l.value);
    });
    const sources = [...srcTotals.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);
    const targets = [...tgtTotals.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);
    const srcOrder = new Map(sources.map((n, i) => [n, i]));
    const tgtOrder = new Map(targets.map((n, i) => [n, i]));

    // Geometry is written in two axes rather than x/y: nodes are stacked along
    // the STACK axis and the ribbons run along the FLOW axis. Default puts
    // stack on y and flow on x (two columns, left to right); the horizontal
    // variant swaps them (two rows, top to bottom).
    const T = !!CFG.sankeyHorizontal;
    const GAP = 10, LAYOUT_MIN = 16, BAR_MIN = 1.5;
    const BAR_W = 10;
    const Y0 = 30, PAD_END = 20;

    // Both columns are labelled outside their bars, and the ribbons get what is
    // left between them. Trimming LABEL_RIGHT is what pushes the whole diagram
    // further right; the left gutter is the wider of the two because that
    // column carries the real-sector names, which are the longer set.
    const LABEL_LEFT = 300, LABEL_RIGHT = 210, FLOW_SPAN = 590;
    const FLOW_A = T ? 170 : LABEL_LEFT;                   // near row / left column
    const FLOW_B = T ? 430 : FLOW_A + BAR_W + FLOW_SPAN;   // far row / right column

    // px per Mt, solved so the taller column fills SANKEY_H instead of being a
    // fixed scale that has to be retuned whenever the data grows. A node too
    // small to reach LAYOUT_MIN takes a fixed share of the height rather than a
    // proportional one, so the scale is re-solved over the rest until the set
    // of pinned nodes stops changing — with this data most nodes are pinned, so
    // a single linear pass would overshoot the target by a fifth.
    const SANKEY_H = 400;
    function solveScale(values) {
      const avail = SANKEY_H - Y0 - PAD_END - (values.length - 1) * GAP;
      let k = avail / d3.sum(values);
      for (let i = 0; i < 20; i++) {
        const free = values.filter(v => v * k >= LAYOUT_MIN);
        if (!free.length) break;
        const next = (avail - (values.length - free.length) * LAYOUT_MIN) / d3.sum(free);
        if (Math.abs(next - k) < 1e-9) break;
        k = next;
      }
      return k;
    }
    const k = Math.min(solveScale([...srcTotals.values()]),
                       solveScale([...tgtTotals.values()]));
    // "stack,flow" -> "x,y" for whichever orientation is active. Bezier control
    // points transpose the same way, so one path string serves both.
    const P = (stack, flow) => (T ? `${stack},${flow}` : `${flow},${stack}`);

    function layout(names, totals) {
      const pos = new Map();
      let y = Y0;
      names.forEach(name => {
        const total = totals.get(name);
        const barH = Math.max(total * k, BAR_MIN);
        const slotH = Math.max(barH, LAYOUT_MIN);
        const barY = y + (slotH - barH) / 2;
        pos.set(name, { slotY: y, slotH, barY, barH });
        y += slotH + GAP;
      });
      return { pos, bottom: y - GAP };
    }
    const srcLayout = layout(sources, srcTotals);
    const tgtLayout = layout(targets, tgtTotals);

    const srcCursor = new Map(sources.map(n => [n, srcLayout.pos.get(n).barY]));
    const tgtCursor = new Map(targets.map(n => [n, tgtLayout.pos.get(n).barY]));
    const linkGeo = [...links]
      .sort((a, b) => (srcOrder.get(a.act) - srcOrder.get(b.act)) || (tgtOrder.get(a.ra) - tgtOrder.get(b.ra)))
      .map(l => {
        const h = l.value * k;
        const yS = srcCursor.get(l.act);
        srcCursor.set(l.act, yS + h);
        return { ...l, h, yS };
      });
    linkGeo
      .sort((a, b) => (tgtOrder.get(a.ra) - tgtOrder.get(b.ra)) || (srcOrder.get(a.act) - srcOrder.get(b.act)))
      .forEach(l => {
        l.yT = tgtCursor.get(l.ra);
        tgtCursor.set(l.ra, l.yT + l.h);
      });

    const stackExtent = Math.max(srcLayout.bottom, tgtLayout.bottom) + PAD_END;
    const flowExtent = T ? FLOW_B + BAR_W + 170 : FLOW_B + BAR_W + LABEL_RIGHT;
    const vbW = T ? stackExtent : flowExtent;
    const vbH = T ? flowExtent : stackExtent;
    svgEl.setAttribute("viewBox", `0 0 ${vbW} ${vbH}`);
    // Sized by ratio, not by a pixel height: the SVG is width:100% of its
    // panel, so a fixed height that disagrees with the viewBox letterboxes the
    // drawing inside it. aspect-ratio also needs no measurement, which matters
    // because this chart first renders inside a collapsed dropdown.
    svgEl.style.height = "auto";
    svgEl.style.aspectRatio = `${vbW} / ${vbH}`;
    d3.select(svgEl).selectAll("*").remove();
    const svg = d3.select(svgEl);

    const mid = (FLOW_A + BAR_W + FLOW_B) / 2;
    const LINK_BASE = 0.28, LINK_ON = 0.6, LINK_OFF = 0.06;
    svg.selectAll(".sankey-link")
      .data(linkGeo)
      .join("path").attr("class", "sankey-link")
      .attr("d", l => {
        const f0 = FLOW_A + BAR_W, f1 = FLOW_B;
        // The left column is the real sector and the right one the ETS
        // activity, so a ribbon leaves the TARGET's stack position and lands on
        // the source's — the reverse of the order the links were built in.
        const s0t = l.yT, s0b = l.yT + l.h, s1t = l.yS, s1b = l.yS + l.h;
        return `M${P(s0t, f0)} C${P(s0t, mid)} ${P(s1t, mid)} ${P(s1t, f1)} ` +
          `L${P(s1b, f1)} C${P(s1b, mid)} ${P(s0b, mid)} ${P(s0b, f0)} Z`;
      })
      .attr("fill", CFG.colorUncovered).attr("fill-opacity", LINK_BASE).attr("stroke", "none")
      .on("mouseover", (ev, l) => showTip(ev,
        `<strong>${l.ra}</strong> → <strong>${l.act}</strong><br>${fmt(l.value * 1e6)}`))
      .on("mousemove", moveTip).on("mouseout", hideTip);

    // Pointing at a node lifts the ribbons touching it and fades the rest, so a
    // sector's share can be followed across without reading every label. `key`
    // says which end of the link that column stands for.
    function highlightFlows(key, name) {
      svg.selectAll(".sankey-link").attr("fill-opacity", l =>
        !name ? LINK_BASE : l[key] === name ? LINK_ON : LINK_OFF);
    }

    // Wraps by character count rather than measured pixel width (unlike the
    // shared wrapText helper used elsewhere) because this chart renders once
    // at page load while still inside the collapsed "Data a metodologie"
    // expander — getComputedTextLength() reads 0 for text under a
    // display:none ancestor, so a measurement-based wrap would never trigger.
    function wrapLabelByChars(text, maxChars) {
      if (text.length <= maxChars) return [text];
      const words = text.split(/\s+/);
      const lines = [];
      let line = "";
      words.forEach(w => {
        const candidate = line ? line + " " + w : w;
        if (candidate.length > maxChars && line) {
          lines.push(line);
          line = w;
        } else {
          line = candidate;
        }
      });
      if (line) lines.push(line);
      if (lines.length > 2) return [lines[0], lines[1] + "…"];
      return lines;
    }

    // `before` = labels sit on the low side of the row/column (left, or above).
    function drawNodes(names, layoutPos, flowPos, before, key) {
      // Both the bar and its label are handles for the same node.
      const hover = sel => sel
        .style("cursor", "pointer")
        .on("mouseenter", (ev, n) => highlightFlows(key, n))
        .on("mouseleave", () => highlightFlows(null, null));

      svg.selectAll(null)
        .data(names).enter()
        .append("rect")
        .attr("x", n => (T ? layoutPos.get(n).barY : flowPos))
        .attr("y", n => (T ? flowPos : layoutPos.get(n).barY))
        .attr("width", n => (T ? layoutPos.get(n).barH : BAR_W))
        .attr("height", n => (T ? BAR_W : layoutPos.get(n).barH))
        .attr("fill", CFG.colorEmissions)
        .call(hover);

      const labelFlow = before ? flowPos - 10 : flowPos + BAR_W + 10;
      // Rotating the frame flips which anchor runs away from the bar: local +x
      // points up the screen after rotate(-90), so the two modes are opposites.
      const anchor = T ? (before ? "start" : "end") : (before ? "end" : "start");

      svg.selectAll(null)
        .data(names).enter()
        .append("text")
        .attr("text-anchor", anchor)
        .attr("font-size", CFG.axisFontSize + "px").attr("fill", CFG.axisTextColor)
        .attr("transform", n => {
          if (!T) return null;
          const c = layoutPos.get(n).slotY + layoutPos.get(n).slotH / 2;
          return `translate(${c},${labelFlow}) rotate(-90)`;
        })
        .each(function (n) {
          // Stacked sideways at 22 chars in the rotated frame: the space a
          // label has there is the node's own width, not a shared gutter.
          const lines = wrapLabelByChars(n, T ? 22 : 26);
          const c = layoutPos.get(n).slotY + layoutPos.get(n).slotH / 2;
          d3.select(this).selectAll("tspan")
            .data(lines)
            .join("tspan")
            .attr("x", T ? 0 : labelFlow)
            .attr("y", T ? null : (d, i) => c - (lines.length - 1) * 7 + i * 14)
            .attr("dy", (d, i) => (T
              ? (i === 0 ? `${-(lines.length - 1) * 0.45}em` : "0.95em")
              : "0.32em"))
            .text(d => d);
        })
        .call(hover);
    }
    drawNodes(targets, tgtLayout.pos, FLOW_A, true, "ra");
    drawNodes(sources, srcLayout.pos, FLOW_B, false, "act");

    // Column/row headings. Transposed they cannot sit beside the rows (the
    // rotated labels are there), so they head the whole block instead.
    const heading = (text, x, y, anchor) => svg.append("text")
      .attr("x", x).attr("y", y).attr("text-anchor", anchor)
      .attr("font-size", "13px").attr("font-weight", "700").attr("fill", "#2d3748")
      .text(text);
    if (T) {
      heading("Skutečné odvětví", 0, 14, "start");
      heading("Hlavní odvětví (dle ETS)", 0, flowExtent - 6, "start");
    } else {
      heading("Skutečné odvětví", FLOW_A - 10, 14, "end");
      heading("Hlavní odvětví (dle ETS)", FLOW_B + BAR_W + 10, 14, "start");
    }
  }

  // ── Update ────────────────────────────────────────────────────────────────
  function update() {
    renderLegendSwatches();
    const idxs = getFilteredInstallIndices();
    updateFilterSummary(idxs);
    updateKPIs(idxs);
    renderTimeline(idxs);
    renderActivityChart(idxs);
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  populateControls();
  setupControls();
  update();
  renderSankeyChart();
  window.addEventListener("resize", () => {
    const idxs = getFilteredInstallIndices();
    renderTimeline(idxs);
    renderActivityChart(idxs);
  });
})();
