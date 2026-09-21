(function () {
  const DATA = window.ETS_DASHBOARD;
  if (!DATA) return;

  const ACTIVITIES = DATA.activities;    // [{n, short}] — broad sector groups
  const INSTALLS = DATA.installs;        // [{n,c,act,co}] — all Czech installations
  const RECORDS = DATA.records;          // [[instIdx, year, emissions|null, allocation]]
  const YEAR_MIN = DATA.year_min;
  const YEAR_MAX = DATA.year_max;

  // Chart look — single source of truth. The dev sidebar (ets-dev-sidebar.js,
  // only active with ?dev=1) mutates this and calls window.ETS_REDRAW().
  // The colours are mirrored as CSS variables in the page's <style> block so
  // the HTML legend swatches match; the sidebar keeps both in step.
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
  window.ETS_CFG = CFG;

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

  // One hatch definition for both charts, fully CFG-driven.
  function addHatch(defs, id) {
    const s = CFG.hatchSize;
    defs.append("pattern")
      .attr("id", id)
      .attr("width", s).attr("height", s)
      .attr("patternUnits", "userSpaceOnUse")
      .attr("patternTransform", `rotate(${CFG.hatchAngle})`)
      .call(p => {
        p.append("rect").attr("width", s).attr("height", s).attr("fill", CFG.colorAlloc);
        p.append("line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", s)
          .attr("stroke", CFG.hatchColor).attr("stroke-width", CFG.hatchStroke)
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

  // Group installations under their facility/site name (installs[].co) —
  // e.g. every install with co "ČEZ" nests under a "ČEZ" header. This is
  // distinct from installs[].own, the current contractual owner (used for
  // the separate "Současný vlastník" facet below) — co is the site's own
  // identity, own is who currently runs it, and they often differ (a site
  // can change hands while keeping its name). Sites with only one
  // installation stay flat, shown plainly rather than as a redundant
  // one-item group; a flat row combines co and n as "co – n" so the site is
  // still identifiable without a group header — unless the two are already
  // identical (the installation's own name just repeats the site name), in
  // which case that would only duplicate the text, so it's shown flat and
  // bare. Flat entries and group headers are merged into one list; sortKey
  // (the flat row's display text, the site name for group rows) is only the
  // alphabetical tie-break — renderInstallOptions orders the panel by
  // emissions, biggest first, the same as the "Současný vlastník" list.
  const installRows = (() => {
    const byCo = new Map();
    INSTALLS.forEach((inst, i) => {
      if (!inst.co) return;
      if (!byCo.has(inst.co)) byCo.set(inst.co, []);
      byCo.get(inst.co).push({ i, n: inst.n });
    });
    const grouped = new Set();
    const rows = [];
    byCo.forEach((items, co) => {
      if (items.length < 2) return;
      items.sort((a, b) => a.n.localeCompare(b.n, "cs"));
      items.forEach(({ i }) => grouped.add(i));
      rows.push({ type: "group", co, items, sortKey: co });
    });
    INSTALLS.forEach((inst, i) => {
      if (grouped.has(i)) return;
      const label = inst.co && inst.co !== inst.n ? `${inst.co} – ${inst.n}` : inst.n;
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

  // An empty set is how "no restriction" is normally represented, but
  // "Vybrat vše" fills the set instead — same meaning, so the toggle reads the
  // same rather than showing the full count ("180 vlastníků").
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

  function refreshRealActivityToggle() {
    const btn = document.getElementById("ets-real-activity-toggle");
    const sel = state.realActivities;
    const industrial = getSelectableIndustrialRealActivities();
    const isWholeIndustryGroup = sel.size === industrial.length && industrial.every(ra => sel.has(ra));
    if (sel.size === 0 || isEverySelected(sel, sortedRealActivities.length))
      btn.textContent = "Všechna odvětví";
    else if (isWholeIndustryGroup) btn.textContent = "Průmysl";
    else if (sel.size === 1) btn.textContent = [...sel][0];
    else btn.textContent = sel.size + " odvětví";
    btn.title = btn.textContent;
  }

  function refreshInstallToggle() {
    const btn = document.getElementById("ets-installation-toggle");
    const sel = state.installs;
    if (sel.size === 0 || isEverySelected(sel, INSTALLS.length))
      btn.textContent = "Všechna zařízení";
    else if (sel.size === 1) btn.textContent = INSTALLS[[...sel][0]].n;
    else btn.textContent = sel.size + " " + pluralCz(sel.size, "instalace", "instalací");
    btn.title = btn.textContent;
  }

  function refreshCompanyToggle() {
    const btn = document.getElementById("ets-company-toggle");
    const sel = state.companies;
    if (sel.size === 0 || isEverySelected(sel, ALL_OWNERS.size))
      btn.textContent = "Všichni vlastníci";
    else if (sel.size === 1) btn.textContent = [...sel][0];
    else btn.textContent = sel.size + " " + pluralCz(sel.size, "vlastníci", "vlastníků");
    btn.title = btn.textContent;
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
      name.title = name.textContent;
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
      // name, or the site name (co), so searching the site surfaces the
      // whole group even if no single installation name contains it.
      const visible = row.items
        .filter(({ i, n }) => shown(i) &&
          (!q || n.toLowerCase().includes(q) || row.co.toLowerCase().includes(q)))
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
      groupName.textContent = groupE > 0 ? `${row.co} (${fmt(groupE)})` : row.co;
      groupName.title = groupName.textContent;
      groupLabel.appendChild(groupCb);
      groupLabel.appendChild(groupName);
      wrap.appendChild(groupLabel);

      visible.forEach(({ i, n }) => wrap.appendChild(buildOption(i, n, true)));
      rendered++;
    });
    if (!rendered) wrap.innerHTML = '<div class="ms-empty">Žádná instalace nenalezena</div>';
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
      name.title = name.textContent;
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
      name.title = ra;
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

    // "Select all / clear" only ever touch the currently rendered (i.e.
    // availability/search-filtered) rows, so they behave predictably together
    // with cross-filtering and the search box.

    document.querySelector('#ets-real-activity-panel [data-action="all"]').addEventListener("click", function () {
      // [data-ra] excludes the "Průmysl" group checkbox, which has no
      // dataset.ra of its own — including it here would add "undefined" to
      // state.realActivities and silently inflate its size.
      document.querySelectorAll("#ets-real-activity-options input[type=checkbox][data-ra]").forEach(cb => {
        cb.checked = true;
        state.realActivities.add(cb.dataset.ra);
      });
      onFilterChange();
    });
    document.querySelector('#ets-real-activity-panel [data-action="none"]').addEventListener("click", function () {
      document.querySelectorAll("#ets-real-activity-options input[type=checkbox][data-ra]").forEach(cb => {
        cb.checked = false;
        state.realActivities.delete(cb.dataset.ra);
      });
      onFilterChange();
    });

    document.getElementById("ets-company-search").addEventListener("input", function () {
      renderCompanyOptions(this.value);
    });
    document.querySelector('#ets-company-panel [data-action="all"]').addEventListener("click", function () {
      document.querySelectorAll("#ets-company-options input[type=checkbox]").forEach(cb => {
        cb.checked = true;
        state.companies.add(cb.dataset.own);
      });
      onFilterChange();
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
    document.querySelector('#ets-installation-panel [data-action="all"]').addEventListener("click", function () {
      // [data-idx] excludes company group checkboxes, which have no
      // dataset.idx of their own — including them here would add NaN to
      // state.installs and silently inflate its size.
      document.querySelectorAll("#ets-installation-options input[type=checkbox][data-idx]").forEach(cb => {
        cb.checked = true;
        state.installs.add(+cb.dataset.idx);
      });
      onFilterChange();
    });
    document.querySelector('#ets-installation-panel [data-action="none"]').addEventListener("click", function () {
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
    updateYearBar();
    renderPhaseAnnotations();
  }

  function updateYearBar() {
    document.getElementById("ets-year-from-val").textContent = state.yearFrom;
    document.getElementById("ets-year-to-val").textContent = state.yearTo;
    const span = YEAR_MAX - YEAR_MIN || 1;
    const fromPct = (state.yearFrom - YEAR_MIN) / span * 100;
    const toPct = (state.yearTo - YEAR_MIN) / span * 100;
    const fill = document.getElementById("ets-year-fill");
    fill.style.left = fromPct + "%";
    fill.style.width = (toPct - fromPct) + "%";
  }

  // EU ETS trading-phase boundaries below the year slider — fixed regulatory
  // dates, not derived from the data, so computed once against YEAR_MIN/MAX
  // rather than refreshed on every drag. Tick marks on the track itself show
  // exactly where each phase starts; the labels just name the phase (the
  // year range is already visible via the ticks and the slider's own
  // min/max, so it isn't repeated in text). Phase II's label sits flush left
  // and phase IV's flush right (like axis min/max labels), since both run to
  // the edge of the data range; only phase III, a fully-enclosed span, gets
  // a label centered on its own midpoint.
  function renderPhaseAnnotations() {
    const span = YEAR_MAX - YEAR_MIN || 1;
    const pct = y => (y - YEAR_MIN) / span * 100;
    const boundaries = [2012.5, 2020.5].filter(y => y > YEAR_MIN && y < YEAR_MAX);

    const ticks = document.getElementById("ets-year-phase-ticks");
    ticks.innerHTML = boundaries.map(y => `<span class="range-tick" style="left:${pct(y)}%"></span>`).join("");

    const labels = document.getElementById("ets-phase-annotations");
    const phase3CenterPct = pct((2013 + 2020) / 2);
    labels.innerHTML =
      '<span class="phase-annotation phase-annotation--left">Fáze II</span>' +
      `<span class="phase-annotation phase-annotation--center" style="left:${phase3CenterPct}%">Fáze III</span>` +
      '<span class="phase-annotation phase-annotation--right">Fáze IV</span>';
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
  function updateFilterSummary(idxs) {
    const el = document.getElementById("ets-filter-summary");
    if (idxs.length === 0) {
      el.textContent = "Pro tento výběr nejsou k dispozici žádná data.";
      return;
    }
    const distinctRa = [...new Set(idxs.map(i => INSTALLS[i].ra).filter(Boolean))];
    const distinctCos = [...new Set(idxs.map(i => INSTALLS[i].own))];
    // One segment per filter control: odvětví, vlastníci, instalace. A facet
    // still spanning every value in the data says "vše" — the count would just
    // be the dataset total and carry no information. Otherwise the values are
    // named outright while there are few enough, else counted (the noun in
    // nominative plural for 2-4 and genitive plural for 5+, which is what
    // pluralCz buckets; "odvětví" is identical in both, so it needs no call).
    el.textContent = [
      distinctRa.length === ALL_REAL_ACTIVITIES.size
        ? "Všechna odvětví"
        : distinctRa.length <= 2
        ? "Odvětví: " + distinctRa.join(", ")
        : distinctRa.length + " odvětví",
      distinctCos.length === ALL_OWNERS.size
        ? "Všichni vlastníci"
        : distinctCos.length <= 3
        ? (distinctCos.length === 1 ? "Současný vlastník: " : "Současní vlastníci: ") +
          distinctCos.join(", ")
        : distinctCos.length + " " + pluralCz(distinctCos.length, "vlastníci", "vlastníků"),
      idxs.length === INSTALLS.length
        ? "Všechny instalace"
        : idxs.length <= 3
        ? "Instalace: " + idxs.map(i => INSTALLS[i].n).join(", ")
        : idxs.length + " " + pluralCz(idxs.length, "instalace", "instalací"),
    ].join(" · ");
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
    const d = a - e;

    document.getElementById("ets-kpi-e").textContent = fmt(e);
    document.getElementById("ets-kpi-a").textContent = fmt(a, "povolenek");
    // Share of emissions covered by free allocation — the aggregate of the
    // per-sector "Povolenky zdarma" column in chart 2, so it is rounded the
    // same way and likewise not capped at 100 % (over-allocation is the
    // finding worth showing). Undefined with no emissions to divide by.
    const share = e > 0 ? Math.round(a / e * 100) : null;
    document.getElementById("ets-kpi-share").textContent =
      share == null ? "—" : share + " %";
    document.getElementById("ets-kpi-d-label").textContent = d >= 0 ? "Přebytek povolenek" : "Deficit povolenek";
    document.getElementById("ets-kpi-d").textContent = (d >= 0 ? "+" : "") + fmt(d, "povolenek");
    document.getElementById("ets-kpi-d-card").className = "kpi-card " + (d >= 0 ? "surplus" : "deficit");
  }

  // ── Tooltip ───────────────────────────────────────────────────────────────
  const tip = document.getElementById("tooltip");
  function showTip(ev, html) { tip.innerHTML = html; tip.style.display = "block"; moveTip(ev); }
  function moveTip(ev) {
    tip.style.left = Math.min(ev.clientX + 12, window.innerWidth - 240) + "px";
    tip.style.top = Math.min(ev.clientY + 12, window.innerHeight - 130) + "px";
  }
  function hideTip() { tip.style.display = "none"; }

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

    if (state.installs.size === 1) {
      const inst = INSTALLS[[...state.installs][0]];
      document.getElementById("ets-timeline-title").textContent = inst.n;
    } else {
      document.getElementById("ets-timeline-title").textContent = "Emise a povolenky zdarma v čase";
    }

    const allYears = d3.range(YEAR_MIN, YEAR_MAX + 1);
    const dataMap = byYear;
    allYears.forEach(yr => {
      const d = dataMap[yr];
      if (!d) return;
      d.deficit = Math.max(d.e - d.a, 0); // emissions above what allocation covers
      d.top = Math.max(d.e, d.a);
    });
    const visibleYears = allYears.filter(yr => dataMap[yr] && state.yearFrom <= yr && yr <= state.yearTo);
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

    svg.append("text")
      .attr("x", -mg.left + 2).attr("y", -12)
      .attr("font-size", CFG.axisFontSize + "px").attr("fill", CFG.axisTextColor)
      .text("povolenek / t CO₂");

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
        const bal = d.a - d.e;
        showTip(event,
          `<strong>${yr}</strong><br>` +
          `Ověřené emise: <strong>${fmt(d.e)}</strong><br>` +
          `Bezplatné povolenky: <strong>${fmt(d.a)}</strong><br>` +
          `Bilance: <strong>${bal >= 0 ? "+" : ""}${fmt(bal)}</strong>`
        );
      })
      .on("mousemove", moveTip)
      .on("mouseout", hideTip);

    svg.append("g").attr("transform", `translate(0,${H})`)
      .call(d3.axisBottom(x).tickValues(visibleYears).tickFormat(d3.format("d")))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").remove())
      .call(g => g.selectAll(".tick text").attr("font-size", CFG.axisFontSize + "px").attr("fill", CFG.axisTextColor));
    svg.append("g")
      .call(d3.axisLeft(y).ticks(CFG.tickCount).tickFormat(fmtShort))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", CFG.gridColor))
      .call(g => g.selectAll(".tick text").attr("font-size", CFG.axisFontSize + "px").attr("fill", CFG.axisTextColor));
  }

  // ── Chart 2: activity breakdown — one emissions bar per sector, uncovered
  // share overlaid on it, allocation marked by a plain line ──────────────────
  function renderActivityChart(idxs) {
    const svgEl = document.getElementById("ets-svg-activity");
    const W0 = svgEl.clientWidth;
    const barThickness = fixedBarWidth();
    if (!W0 || !barThickness) return;

    // Both grouping keys are already display-ready strings on the
    // installation, so neither needs a lookup array.
    const byOwner = activityGroupBy === "own";
    const keyOf = i => (byOwner ? INSTALLS[i].own : INSTALLS[i].ra) || "Neuvedeno";

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

    // mg.right reserves two things to the right of the plotted bars: the
    // in-line "Mt" tail label right after each bar (within labelGutter,
    // below), and a fixed-position "X %" column further right (headed
    // "Povolenky zdarma"), showing the share of that row's emissions
    // matched by free allocation. mg.top makes room for that column header.
    const mg = { top: 26, right: 150, bottom: 24, left: 230 };
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

    // Reserve a right-hand gutter for the tail label so it never overlaps the
    // longest bar (which otherwise spans the full plot width) — the
    // allocation itself, in Mt with a Czech decimal comma and one decimal.
    const labelGutter = 60;
    const coverageText = d => `${(d.a / 1e6).toFixed(1).replace(".", ",")} Mt`;
    // Allocation as a share of emissions — not capped at 100%, since a
    // surplus (allocation > emissions) is exactly the case worth surfacing.
    // The "Povolenky zdarma" wording lives once in the column header instead
    // of repeating on every row.
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
    const x = d3.scaleLinear().domain([0, maxVal]).range([0, Math.max(W - labelGutter, 40)]).nice();

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

    svg.selectAll(".a-bar-label")
      .data(data.filter(d => d.e > 0))
      .join("text").attr("class", "a-bar-label")
      .attr("x", d => x(d.top) + 8)
      .attr("y", d => y(d.key) + y.bandwidth() / 2)
      .attr("dy", "0.32em")
      .attr("font-size", CFG.valueFontSize + "px")
      .attr("fill", "#718096")
      .text(coverageText);

    // Separate fixed-position right-hand column (independent of bar length)
    // showing the share of that row's emissions actually matched by free
    // allocation — e.g. "124 %", headed by a single "Povolenky zdarma"
    // column-name label instead of repeating the wording on every row.
    svg.append("text")
      .attr("x", W + mg.right - 16).attr("y", -12)
      .attr("text-anchor", "end")
      .attr("font-size", CFG.axisFontSize + "px")
      .attr("fill", CFG.axisTextColor)
      .text("Povolenky zdarma");

    svg.selectAll(".a-share-label")
      .data(data.filter(d => d.e > 0))
      .join("text").attr("class", "a-share-label")
      .attr("x", W + mg.right - 16)
      .attr("y", d => y(d.key) + y.bandwidth() / 2)
      .attr("dy", "0.32em")
      .attr("text-anchor", "end")
      .attr("font-size", CFG.valueFontSize + "px")
      .attr("font-weight", "600")
      .attr("fill", "#2d3748")
      .text(shareText);

    svg.append("g")
      .call(d3.axisLeft(y))
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

    const k = 0.4; // px per Mt
    const GAP = 10, LAYOUT_MIN = 16, BAR_MIN = 1.5;
    const X_L = 240, BAR_W = 10, X_R = 620;
    const Y0 = 30;

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

    const H = Math.max(srcLayout.bottom, tgtLayout.bottom) + 20;
    svgEl.setAttribute("viewBox", `0 0 900 ${H}`);
    svgEl.style.height = H + "px";
    d3.select(svgEl).selectAll("*").remove();
    const svg = d3.select(svgEl);

    const xm = (X_L + BAR_W + X_R) / 2;
    svg.selectAll(".sankey-link")
      .data(linkGeo)
      .join("path").attr("class", "sankey-link")
      .attr("d", l => {
        const x0 = X_L + BAR_W, x1 = X_R;
        const y0t = l.yS, y0b = l.yS + l.h, y1t = l.yT, y1b = l.yT + l.h;
        return `M${x0},${y0t} C${xm},${y0t} ${xm},${y1t} ${x1},${y1t} ` +
          `L${x1},${y1b} C${xm},${y1b} ${xm},${y0b} ${x0},${y0b} Z`;
      })
      .attr("fill", CFG.colorUncovered).attr("fill-opacity", 0.28).attr("stroke", "none")
      .on("mouseover", (ev, l) => showTip(ev,
        `<strong>${l.act}</strong> → <strong>${l.ra}</strong><br>${fmt(l.value * 1e6)}`))
      .on("mousemove", moveTip).on("mouseout", hideTip);

    // Wraps by character count rather than measured pixel width (unlike the
    // shared wrapText helper used elsewhere) because this chart renders once
    // at page load while still nested inside two collapsed dropdowns —
    // getComputedTextLength() reads 0 for text under a display:none
    // ancestor, so a measurement-based wrap would never trigger.
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

    function drawNodes(names, layoutPos, x, anchor, labelX) {
      svg.selectAll(null)
        .data(names).enter()
        .append("rect")
        .attr("x", x).attr("width", BAR_W)
        .attr("y", n => layoutPos.get(n).barY).attr("height", n => layoutPos.get(n).barH)
        .attr("rx", 2).attr("fill", CFG.colorEmissions);
      svg.selectAll(null)
        .data(names).enter()
        .append("text")
        .attr("text-anchor", anchor).attr("font-size", CFG.axisFontSize + "px").attr("fill", CFG.axisTextColor)
        .each(function (n) {
          const lines = wrapLabelByChars(n, 26);
          const cy = layoutPos.get(n).slotY + layoutPos.get(n).slotH / 2;
          const startY = cy - (lines.length - 1) * 7;
          d3.select(this).selectAll("tspan")
            .data(lines)
            .join("tspan")
            .attr("x", labelX)
            .attr("y", (d, i) => startY + i * 14)
            .attr("dy", "0.32em")
            .text(d => d);
        });
    }
    drawNodes(sources, srcLayout.pos, X_L, "end", X_L - 10);
    drawNodes(targets, tgtLayout.pos, X_R, "start", X_R + BAR_W + 10);

    svg.append("text").attr("x", X_L - 10).attr("y", 14)
      .attr("text-anchor", "end").attr("font-size", "13px").attr("font-weight", "700").attr("fill", "#2d3748")
      .text("Hlavní odvětví (dle ETS)");
    svg.append("text").attr("x", X_R + BAR_W + 10).attr("y", 14)
      .attr("text-anchor", "start").attr("font-size", "13px").attr("font-weight", "700").attr("fill", "#2d3748")
      .text("Skutečné odvětví");
  }

  // ── Update ────────────────────────────────────────────────────────────────
  function update() {
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
  // Redraw hook for the dev sidebar (?dev=1) after it mutates CFG.
  window.ETS_REDRAW = () => { update(); renderSankeyChart(); };
  window.addEventListener("resize", () => {
    const idxs = getFilteredInstallIndices();
    renderTimeline(idxs);
    renderActivityChart(idxs);
  });
})();
