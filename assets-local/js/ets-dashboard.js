(function () {
  const DATA = window.ETS_DASHBOARD;
  if (!DATA) return;

  const ACTIVITIES = DATA.activities;    // [{n, short}] — broad sector groups
  const INSTALLS = DATA.installs;        // [{n,c,act,co}] — all Czech installations
  const RECORDS = DATA.records;          // [[instIdx, year, emissions|null, allocation]]
  const YEAR_MIN = DATA.year_min;
  const YEAR_MAX = DATA.year_max;

  // Timeline chart colors — keep in sync with the .legend-swatch styles in the
  // page's <style> block (hardcoded there too, since it's plain HTML/CSS).
  const COLOR_COVERED = "#506D87"; // emissions covered by free allowances (+ hatched: surplus allowances)
  // Free-allocation portions (covered + surplus hatch, both charts) —
  // lighter than COLOR_COVERED so they read as distinct from the deficit.
  const COLOR_ALLOCATION_SURPLUS = "#7994AB";

  // ── Lookups built once ────────────────────────────────────────────────────
  const recordsByInstall = new Map();
  RECORDS.forEach(r => {
    const i = r[0];
    if (!recordsByInstall.has(i)) recordsByInstall.set(i, []);
    recordsByInstall.get(i).push(r);
  });

  const state = {
    activities: new Set(), // activity indices; empty = all activities
    companies: new Set(),  // company names (installs[].co); empty = all companies
    installs: new Set(),   // install indices; empty = all installations
    yearFrom: YEAR_MIN,
    yearTo: YEAR_MAX,
    activityView: "absolute", // "absolute" | "relative" — chart 2's bar scaling
  };

  // ── Formatting ────────────────────────────────────────────────────────────
  function fmt(n, unit) {
    if (n == null) return "—";
    const abs = Math.abs(n);
    const sign = n < 0 ? "−" : "";
    // Czech convention uses a comma for the decimal point (not a period).
    if (unit === "povolenek") {
      if (abs >= 1e6) return sign + d3.format(".2f")(abs / 1e6).replace(".", ",") + " mil. povolenek";
      if (abs >= 1e3) return sign + d3.format(".1f")(abs / 1e3).replace(".", ",") + " tis. povolenek";
      return sign + d3.format(",")(abs) + " povolenek";
    }
    if (abs >= 1e6) return sign + d3.format(".2f")(abs / 1e6).replace(".", ",") + " Mt";
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
  // match the activity selection (if any) AND the company selection (if any)
  // AND be in the installation selection (if any). An empty Set means "no
  // restriction on this facet".
  function getFilteredInstallIndices() {
    const out = [];
    for (let i = 0; i < INSTALLS.length; i++) {
      const inst = INSTALLS[i];
      if (state.activities.size && !state.activities.has(inst.act)) continue;
      if (state.companies.size && !state.companies.has(inst.co)) continue;
      if (state.installs.size && !state.installs.has(i)) continue;
      out.push(i);
    }
    return out;
  }

  // ── Cross-filtering ──────────────────────────────────────────────────────────
  // Each facet's option list only offers values that are actually reachable
  // given the OTHER two facets' current selections (its own facet is excluded
  // from the check, since that's the thing being chosen).
  function getAvailableActivities() {
    const out = new Set();
    for (let i = 0; i < INSTALLS.length; i++) {
      const inst = INSTALLS[i];
      if (state.companies.size && !state.companies.has(inst.co)) continue;
      if (state.installs.size && !state.installs.has(i)) continue;
      out.add(inst.act);
    }
    return out;
  }
  function getAvailableCompanies() {
    const out = new Set();
    for (let i = 0; i < INSTALLS.length; i++) {
      const inst = INSTALLS[i];
      if (state.activities.size && !state.activities.has(inst.act)) continue;
      if (state.installs.size && !state.installs.has(i)) continue;
      out.add(inst.co);
    }
    return out;
  }
  function getAvailableInstalls() {
    const out = new Set();
    for (let i = 0; i < INSTALLS.length; i++) {
      const inst = INSTALLS[i];
      if (state.activities.size && !state.activities.has(inst.act)) continue;
      if (state.companies.size && !state.companies.has(inst.co)) continue;
      out.add(i);
    }
    return out;
  }

  // ── Controls: activity / owner / installation multi-select dropdowns ────────
  const sortedInstalls = INSTALLS
    .map((inst, i) => ({ i, n: inst.n }))
    .sort((a, b) => a.n.localeCompare(b.n, "cs"));

  const sortedCompanies = Array.from(new Set(INSTALLS.map(inst => inst.co).filter(Boolean)))
    .sort((a, b) => a.localeCompare(b, "cs"));

  // Czech plural agreement: 1 = singular (handled separately), 2–4 = "few", else "many".
  function pluralCz(n, few, many) { return (n >= 2 && n <= 4) ? few : many; }

  function refreshActivityToggle() {
    const btn = document.getElementById("ets-activity-toggle");
    const sel = state.activities;
    const industrial = getSelectableIndustrialIndices();
    const isWholeIndustryGroup = sel.size === industrial.length && industrial.every(i => sel.has(i));
    if (sel.size === 0) btn.textContent = "Všechny aktivity";
    else if (isWholeIndustryGroup) btn.textContent = "Průmysl";
    else if (sel.size === 1) btn.textContent = ACTIVITIES[[...sel][0]].short;
    else btn.textContent = sel.size + " " + pluralCz(sel.size, "aktivity", "aktivit");
  }

  function refreshInstallToggle() {
    const btn = document.getElementById("ets-installation-toggle");
    const sel = state.installs;
    if (sel.size === 0) btn.textContent = "Všechny instalace";
    else if (sel.size === 1) btn.textContent = INSTALLS[[...sel][0]].n;
    else btn.textContent = sel.size + " " + pluralCz(sel.size, "instalace", "instalací");
  }

  function refreshCompanyToggle() {
    const btn = document.getElementById("ets-company-toggle");
    const sel = state.companies;
    if (sel.size === 0) btn.textContent = "Všichni vlastníci";
    else if (sel.size === 1) btn.textContent = [...sel][0];
    else btn.textContent = sel.size + " " + pluralCz(sel.size, "vlastníci", "vlastníků");
  }

  // Re-renders the (optionally search-filtered) checkbox list for installations.
  // Re-used on init, on every keystroke in the search box, and whenever another
  // facet's selection changes the set of reachable installations. Options that
  // are no longer reachable are hidden unless already selected, so a selection
  // never silently disappears — the user can still see and deselect it.
  function renderInstallOptions(filterText) {
    const wrap = document.getElementById("ets-installation-options");
    wrap.innerHTML = "";
    const q = (filterText || "").trim().toLowerCase();
    const available = getAvailableInstalls();
    const filtered = sortedInstalls.filter(x =>
      (available.has(x.i) || state.installs.has(x.i)) && (!q || x.n.toLowerCase().includes(q)));
    if (!filtered.length) {
      wrap.innerHTML = '<div class="ms-empty">Žádná instalace nenalezena</div>';
      return;
    }
    filtered.forEach(({ i, n }) => {
      const label = document.createElement("label");
      label.className = "ms-option";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.dataset.idx = i;
      cb.checked = state.installs.has(i);
      cb.addEventListener("change", function () {
        if (this.checked) state.installs.add(i); else state.installs.delete(i);
        onFilterChange();
      });
      const name = document.createElement("span");
      name.className = "ms-option-name";
      name.textContent = n;
      label.appendChild(cb);
      label.appendChild(name);
      wrap.appendChild(label);
    });
  }

  // Re-renders the (optionally search-filtered) checkbox list for companies.
  // See renderInstallOptions for the availability/hide-unless-selected rule.
  function renderCompanyOptions(filterText) {
    const wrap = document.getElementById("ets-company-options");
    wrap.innerHTML = "";
    const q = (filterText || "").trim().toLowerCase();
    const available = getAvailableCompanies();
    const filtered = sortedCompanies.filter(co =>
      (available.has(co) || state.companies.has(co)) && (!q || co.toLowerCase().includes(q)));
    if (!filtered.length) {
      wrap.innerHTML = '<div class="ms-empty">Žádný vlastník nenalezen</div>';
      return;
    }
    filtered.forEach(co => {
      const label = document.createElement("label");
      label.className = "ms-option";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.dataset.co = co;
      cb.checked = state.companies.has(co);
      cb.addEventListener("change", function () {
        if (this.checked) state.companies.add(co); else state.companies.delete(co);
        onFilterChange();
      });
      const name = document.createElement("span");
      name.className = "ms-option-name";
      name.textContent = co;
      label.appendChild(cb);
      label.appendChild(name);
      wrap.appendChild(label);
    });
  }

  // Re-renders the activity checkbox list. See renderInstallOptions for the
  // availability/hide-unless-selected rule (no search box here — the list is
  // short enough that one isn't needed).
  // "Výroba elektřiny a tepla" is by far the largest emitter category, so it
  // stays pinned at the top level; every other activity is grouped beneath a
  // "Průmysl" header, giving the list a two-tier hierarchy instead of one
  // flat alphabetical-ish dump. The group header is itself selectable — it
  // checks/unchecks every activity nested under it at once.
  const ACTIVITY_PRIMARY_NAME = "Výroba elektřiny a tepla";

  // Normalize before comparing: the data file inserts non-breaking spaces
  // around single-letter Czech prepositions ("a", "i", ...) per Czech
  // typographic convention, which look identical to a plain space but
  // compare unequal against a hardcoded literal.
  function normalizeActName(s) { return s.normalize("NFC").replace(/\u00A0/g, " "); }
  function isActivityPrimary(act) { return normalizeActName(act.n) === normalizeActName(ACTIVITY_PRIMARY_NAME); }
  function getIndustrialActivityIndices() {
    return ACTIVITIES.map((act, i) => i).filter(i => !isActivityPrimary(ACTIVITIES[i]));
  }
  // Same as above, but narrowed to activities that are actually selectable
  // right now (available given other filters, or already selected) — some
  // activities have zero installations in the data and never render as an
  // option, so comparing against the full list would never count as "whole".
  function getSelectableIndustrialIndices() {
    const available = getAvailableActivities();
    return getIndustrialActivityIndices().filter(i => available.has(i) || state.activities.has(i));
  }

  function renderActivityOptions() {
    const wrap = document.getElementById("ets-activity-options");
    wrap.innerHTML = "";
    const available = getAvailableActivities();

    function buildOption(i, act, nested) {
      const label = document.createElement("label");
      label.className = nested ? "ms-option ms-option--nested" : "ms-option";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.dataset.idx = i;
      cb.checked = state.activities.has(i);
      cb.addEventListener("change", function () {
        if (this.checked) state.activities.add(i); else state.activities.delete(i);
        onFilterChange();
      });
      // Use the short label here — the full label can run to 60+ characters
      // (e.g. "Ostatní nerostné suroviny (sklo, keramika, minerální vlna, sádra)").
      const name = document.createElement("span");
      name.className = "ms-option-name";
      name.textContent = act.short;
      label.appendChild(cb);
      label.appendChild(name);
      return label;
    }

    const visible = ACTIVITIES
      .map((act, i) => ({ act, i }))
      .filter(({ i }) => available.has(i) || state.activities.has(i));
    const isPrimary = isActivityPrimary;
    const primary = visible.filter(({ act }) => isPrimary(act));
    const others = visible.filter(({ act }) => !isPrimary(act));

    primary.forEach(({ i, act }) => {
      const opt = buildOption(i, act, false);
      opt.classList.add("ms-group-label"); // same top-level styling as "Průmysl" below it
      wrap.appendChild(opt);
    });
    if (others.length) {
      const otherIdxs = others.map(({ i }) => i);
      const selectedCount = otherIdxs.filter(i => state.activities.has(i)).length;

      const groupLabel = document.createElement("label");
      groupLabel.className = "ms-option ms-group-label";
      const groupCb = document.createElement("input");
      groupCb.type = "checkbox";
      groupCb.checked = selectedCount === otherIdxs.length;
      groupCb.indeterminate = selectedCount > 0 && selectedCount < otherIdxs.length;
      groupCb.addEventListener("change", function () {
        otherIdxs.forEach(i => { if (this.checked) state.activities.add(i); else state.activities.delete(i); });
        onFilterChange();
      });
      const groupName = document.createElement("span");
      groupName.className = "ms-option-name";
      groupName.textContent = "Průmysl";
      groupLabel.appendChild(groupCb);
      groupLabel.appendChild(groupName);
      wrap.appendChild(groupLabel);

      others.forEach(({ i, act }) => wrap.appendChild(buildOption(i, act, true)));
    }
    if (!wrap.children.length) wrap.innerHTML = '<div class="ms-empty">Žádná aktivita nenalezena</div>';
  }

  // Re-renders all three option panels, preserving whatever search text is
  // currently typed. Called whenever a selection changes anywhere, since one
  // facet's choice can change what the other two facets can still offer.
  function refreshOptionPanels() {
    renderActivityOptions();
    renderCompanyOptions(document.getElementById("ets-company-search").value);
    renderInstallOptions(document.getElementById("ets-installation-search").value);
  }

  // Single entry point for "a filter selection changed": refresh toggle
  // labels, re-filter all option panels against each other, and redraw.
  function onFilterChange() {
    refreshActivityToggle();
    refreshCompanyToggle();
    refreshInstallToggle();
    refreshOptionPanels();
    update();
  }

  function populateControls() {
    refreshOptionPanels();
    refreshActivityToggle();
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
    setupDropdownToggle("ets-activity-toggle", "ets-activity-panel");
    setupDropdownToggle("ets-company-toggle", "ets-company-panel");
    setupDropdownToggle("ets-installation-toggle", "ets-installation-panel");
    document.addEventListener("click", function () {
      document.querySelectorAll(".ms-panel.open").forEach(p => p.classList.remove("open"));
    });

    // "Select all / clear" only ever touch the currently rendered (i.e.
    // availability/search-filtered) rows, so they behave predictably together
    // with cross-filtering and the search box.
    document.querySelector('#ets-activity-panel [data-action="all"]').addEventListener("click", function () {
      document.querySelectorAll("#ets-activity-options input[type=checkbox]").forEach(cb => {
        cb.checked = true;
        state.activities.add(+cb.dataset.idx);
      });
      onFilterChange();
    });
    document.querySelector('#ets-activity-panel [data-action="none"]').addEventListener("click", function () {
      document.querySelectorAll("#ets-activity-options input[type=checkbox]").forEach(cb => {
        cb.checked = false;
        state.activities.delete(+cb.dataset.idx);
      });
      onFilterChange();
    });

    document.getElementById("ets-company-search").addEventListener("input", function () {
      renderCompanyOptions(this.value);
    });
    document.querySelector('#ets-company-panel [data-action="all"]').addEventListener("click", function () {
      document.querySelectorAll("#ets-company-options input[type=checkbox]").forEach(cb => {
        cb.checked = true;
        state.companies.add(cb.dataset.co);
      });
      onFilterChange();
    });
    document.querySelector('#ets-company-panel [data-action="none"]').addEventListener("click", function () {
      document.querySelectorAll("#ets-company-options input[type=checkbox]").forEach(cb => {
        cb.checked = false;
        state.companies.delete(cb.dataset.co);
      });
      onFilterChange();
    });

    document.getElementById("ets-installation-search").addEventListener("input", function () {
      renderInstallOptions(this.value);
    });
    document.querySelector('#ets-installation-panel [data-action="all"]').addEventListener("click", function () {
      document.querySelectorAll("#ets-installation-options input[type=checkbox]").forEach(cb => {
        cb.checked = true;
        state.installs.add(+cb.dataset.idx);
      });
      onFilterChange();
    });
    document.querySelector('#ets-installation-panel [data-action="none"]').addEventListener("click", function () {
      document.querySelectorAll("#ets-installation-options input[type=checkbox]").forEach(cb => {
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
      update();
    });
    yTo.addEventListener("input", function () {
      state.yearTo = Math.max(+this.value, state.yearFrom);
      this.value = state.yearTo;
      updateYearBar();
      update();
    });
    updateYearBar();

    document.querySelectorAll("#ets-activity-view-toggle .view-toggle-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        if (this.dataset.view === state.activityView) return;
        state.activityView = this.dataset.view;
        document.querySelectorAll("#ets-activity-view-toggle .view-toggle-btn")
          .forEach(b => b.classList.toggle("active", b === this));
        renderActivityChart(getFilteredInstallIndices());
      });
    });
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
    document.getElementById("ets-kpi-d").textContent = (d >= 0 ? "+" : "") + fmt(d);
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

  // ── Chart 1: timeline — stacked bars: covered / surplus (hatched) / deficit ─
  function renderTimeline(idxs) {
    const svgEl = document.getElementById("ets-svg-timeline");
    const W0 = svgEl.clientWidth, H0 = svgEl.clientHeight;
    if (!W0 || !H0) return;

    const mg = { top: 26, right: 16, bottom: 28, left: 64 };
    const W = W0 - mg.left - mg.right;
    const H = H0 - mg.top - mg.bottom;

    d3.select(svgEl).selectAll("*").remove();

    const defs = d3.select(svgEl).append("defs");
    defs.append("pattern")
      .attr("id", "ets-hatch-surplus")
      .attr("width", 6).attr("height", 6)
      .attr("patternUnits", "userSpaceOnUse")
      .attr("patternTransform", "rotate(45)")
      .call(p => {
        p.append("rect").attr("width", 6).attr("height", 6).attr("fill", COLOR_ALLOCATION_SURPLUS);
        p.append("line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 6)
          .attr("stroke", "#fff").attr("stroke-width", 2.5).attr("opacity", 0.6);
      });

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

    // Subtitle: one segment each for activity / owner / installation, derived
    // from what's ACTUALLY in the filtered result set — not just what's
    // explicitly checked in that facet's own dropdown. This way, narrowing
    // via one facet (e.g. picking an owner with a single activity) still
    // surfaces the implied activity name, even though "Hlavní aktivita"
    // itself has nothing selected. Few enough distinct values → name them;
    // otherwise just a count.
    const subEl = document.getElementById("ets-timeline-sub");
    if (idxs.length === 0) {
      subEl.textContent = "Pro tento výběr nejsou k dispozici žádná data.";
    } else {
      const distinctActs = [...new Set(idxs.map(i => INSTALLS[i].act))];
      const distinctCos = [...new Set(idxs.map(i => INSTALLS[i].co))];
      subEl.textContent = [
        distinctActs.length <= 2
          ? distinctActs.map(a => ACTIVITIES[a].short).join(", ")
          : distinctActs.length + " " + pluralCz(distinctActs.length, "aktivity", "aktivit"),
        distinctCos.length <= 2
          ? distinctCos.join(", ")
          : distinctCos.length + " " + pluralCz(distinctCos.length, "vlastníci", "vlastníků"),
        idxs.length <= 3
          ? idxs.map(i => INSTALLS[i].n).join(", ")
          : idxs.length + " " + pluralCz(idxs.length, "instalace", "instalací"),
      ].join(" · ");
    }

    const allYears = d3.range(YEAR_MIN, YEAR_MAX + 1);
    const dataMap = byYear;
    allYears.forEach(yr => {
      const d = dataMap[yr];
      if (!d) return;
      d.covered = Math.min(d.e, d.a); // portion of emissions matched by free allocation
      d.deficit = Math.max(d.e - d.a, 0); // emissions above what allocation covers
      d.top = Math.max(d.e, d.a);
    });
    const visibleYears = allYears.filter(yr => dataMap[yr] && state.yearFrom <= yr && yr <= state.yearTo);
    const maxVal = d3.max(visibleYears, yr => dataMap[yr].top) || 1;
    // Band domain matches years that actually have data in the selected range
    // (not the full slider span), so there's no reserved blank space either
    // for years excluded by the slider or for years the current filter simply
    // has no records for (e.g. an installation whose reporting starts later).
    const x = d3.scaleBand().domain(visibleYears).range([0, W]).padding(0.18);
    const y = d3.scaleLinear().domain([0, maxVal * 1.05]).range([H, 0]).nice();

    svg.append("text")
      .attr("x", -mg.left + 2).attr("y", -12)
      .attr("font-size", "13px").attr("fill", "#718096")
      .text("povolenek / t CO₂");

    svg.append("g")
      .call(d3.axisLeft(y).tickSize(-W).tickFormat("").ticks(5))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#edf2f7").attr("stroke-dasharray", "3,3"));

    // Bottom of the bar: the portion of emissions actually matched by free
    // allocation — lighter, same family as the surplus hatch, so everything
    // "allocation-related" reads as one lighter tone against the plain blue.
    svg.selectAll(".bar-covered")
      .data(visibleYears)
      .join("rect").attr("class", "bar-covered")
      .attr("x", yr => x(yr)).attr("y", yr => y(dataMap[yr].covered))
      .attr("width", x.bandwidth()).attr("height", yr => H - y(dataMap[yr].covered))
      .attr("fill", COLOR_ALLOCATION_SURPLUS);

    // Where emissions exceed allocation, cap the covered portion with the
    // plain solid blue for the uncovered excess.
    svg.selectAll(".bar-deficit")
      .data(visibleYears.filter(yr => dataMap[yr].deficit > 0))
      .join("rect").attr("class", "bar-deficit")
      .attr("x", yr => x(yr)).attr("y", yr => y(dataMap[yr].e))
      .attr("width", x.bandwidth()).attr("height", yr => y(dataMap[yr].covered) - y(dataMap[yr].e))
      .attr("fill", COLOR_COVERED);

    // Where allocation exceeds emissions, cap the bar with a hatched block up
    // to the allocation line — makes the surplus itself visible as an area,
    // not just implied by the line floating above the bar.
    svg.selectAll(".bar-surplus")
      .data(visibleYears.filter(yr => dataMap[yr].a > dataMap[yr].e))
      .join("rect").attr("class", "bar-surplus")
      .attr("x", yr => x(yr)).attr("y", yr => y(dataMap[yr].a))
      .attr("width", x.bandwidth()).attr("height", yr => y(dataMap[yr].e) - y(dataMap[yr].a))
      .attr("fill", "url(#ets-hatch-surplus)");

    svg.selectAll(".line-allocation")
      .data(visibleYears)
      .join("line").attr("class", "line-allocation")
      .attr("x1", yr => x(yr)).attr("x2", yr => x(yr) + x.bandwidth())
      .attr("y1", yr => y(dataMap[yr].a)).attr("y2", yr => y(dataMap[yr].a))
      .attr("stroke", "#1a202c").attr("stroke-width", 3);

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
      .call(g => g.select(".domain").attr("stroke", "#e2e8f0"))
      .call(g => g.selectAll(".tick line").attr("stroke", "#e2e8f0"))
      .call(g => g.selectAll(".tick text").attr("font-size", "13px").attr("fill", "#718096"));
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat(fmtShort))
      .call(g => g.select(".domain").attr("stroke", "#e2e8f0"))
      .call(g => g.selectAll(".tick line").attr("stroke", "#e2e8f0"))
      .call(g => g.selectAll(".tick text").attr("font-size", "13px").attr("fill", "#718096"));
  }

  // ── Chart 2: activity breakdown — two bars per activity (emissions / allowances) ─
  function renderActivityChart(idxs) {
    const svgEl = document.getElementById("ets-svg-activity");
    const W0 = svgEl.clientWidth, H0 = svgEl.clientHeight;
    if (!W0 || !H0) return;

    const byAct = {};
    idxs.forEach(i => {
      const act = INSTALLS[i].act;
      if (!byAct[act]) byAct[act] = { act, e: 0, a: 0 };
      (recordsByInstall.get(i) || []).forEach(r => {
        const [, y, em, al] = r;
        if (y < state.yearFrom || y > state.yearTo) return;
        byAct[act].e += em || 0;
        byAct[act].a += al || 0;
      });
    });

    const data = Object.values(byAct)
      .filter(d => d.e > 0 || d.a > 0)
      .filter(d => ACTIVITIES[d.act].n !== "ETS2 sektory")
      .sort((a, b) => b.e - a.e)
      .slice(0, 12);

    const mg = { top: 8, right: 16, bottom: 24, left: 230 };
    const W = W0 - mg.left - mg.right;
    const H = H0 - mg.top - mg.bottom;

    d3.select(svgEl).selectAll("*").remove();
    const svg = d3.select(svgEl).append("g").attr("transform", `translate(${mg.left},${mg.top})`);

    if (!data.length) {
      svg.append("text").attr("x", W / 2).attr("y", H / 2)
        .attr("text-anchor", "middle").attr("fill", "#a0aec0").attr("font-size", "15px")
        .text("Pro tento výběr nejsou k dispozici žádná data.");
      return;
    }

    // Reserve a right-hand gutter for the tail label so it never overlaps the
    // longest bar (which otherwise spans the full plot width). Relative view
    // shows the coverage ratio; absolute view shows the allocation itself,
    // in Mt with a Czech decimal comma and a single decimal place.
    const labelGutter = 60;
    const coverageText = d => state.activityView === "relative"
      ? `${Math.round(d.a / d.e * 100)} % emisí`
      : `${(d.a / 1e6).toFixed(1).replace(".", ",")} Mt`;

    // Same encoding as chart 1: a light "covered" portion, a dark "deficit"
    // cap when emissions exceed allocation, a light hatched cap when
    // allocation exceeds emissions, and a black line marking the exact
    // allocation value. In relative view, each bar is rescaled so the
    // activity's own emissions (d.e) sit at 100% — surplus can still push
    // past that, deficit can't.
    const isRelative = state.activityView === "relative";
    data.forEach(d => {
      d.covered = Math.min(d.e, d.a);
      d.surplus = Math.max(d.a - d.e, 0);
      d.deficit = Math.max(d.e - d.a, 0);
      d.top = d.covered + d.surplus + d.deficit; // = max(e, a)
      const scale = (isRelative && d.e > 0) ? 100 / d.e : 1;
      d.dCovered = d.covered * scale;
      d.dSurplus = d.surplus * scale;
      d.dDeficit = d.deficit * scale;
      d.dTop = d.top * scale;
      d.dA = d.a * scale;
    });

    const maxVal = d3.max(data, d => d.dTop) || 1;
    const y = d3.scaleBand().domain(data.map(d => d.act)).range([0, H]).padding(0.3);
    const x = d3.scaleLinear().domain([0, maxVal]).range([0, Math.max(W - labelGutter, 40)]).nice();
    const axisFormat = isRelative ? (v => Math.round(v) + " %") : fmtShort;

    const defs = svg.append("defs");
    defs.append("pattern")
      .attr("id", "ets-hatch-surplus-activity")
      .attr("width", 6).attr("height", 6)
      .attr("patternUnits", "userSpaceOnUse")
      .attr("patternTransform", "rotate(45)")
      .call(p => {
        p.append("rect").attr("width", 6).attr("height", 6).attr("fill", COLOR_ALLOCATION_SURPLUS);
        p.append("line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 6)
          .attr("stroke", "#fff").attr("stroke-width", 2.5).attr("opacity", 0.6);
      });

    svg.append("g")
      .call(d3.axisBottom(x).tickSize(H).tickFormat("").ticks(5))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#edf2f7").attr("stroke-dasharray", "3,3").attr("y1", -H));

    function tipHtml(d) {
      const extra = d.surplus > 0
        ? `Povolenky zdarma alokované navíc: <strong>${fmt(d.surplus)}</strong><br>`
        : d.deficit > 0
        ? `Emise nepokryté povolenkami zdarma: <strong>${fmt(d.deficit)}</strong><br>`
        : "";
      return `<strong>${ACTIVITIES[d.act].n}</strong><br>` +
        `Ověřené emise: <strong>${fmt(d.e)}</strong><br>` +
        `Bezplatné povolenky: <strong>${fmt(d.a)}</strong><br>` +
        extra;
    }

    svg.selectAll(".a-bar-covered")
      .data(data).join("rect").attr("class", "a-bar-covered")
      .attr("y", d => y(d.act)).attr("x", 0)
      .attr("height", y.bandwidth()).attr("width", d => x(d.dCovered))
      .attr("fill", COLOR_ALLOCATION_SURPLUS)
      .on("mouseover", (ev, d) => showTip(ev, tipHtml(d)))
      .on("mousemove", moveTip).on("mouseout", hideTip);

    svg.selectAll(".a-bar-deficit")
      .data(data.filter(d => d.deficit > 0)).join("rect").attr("class", "a-bar-deficit")
      .attr("y", d => y(d.act)).attr("x", d => x(d.dCovered))
      .attr("height", y.bandwidth()).attr("width", d => x(d.dCovered + d.dDeficit) - x(d.dCovered))
      .attr("fill", COLOR_COVERED)
      .on("mouseover", (ev, d) => showTip(ev, tipHtml(d)))
      .on("mousemove", moveTip).on("mouseout", hideTip);

    svg.selectAll(".a-bar-surplus")
      .data(data.filter(d => d.surplus > 0)).join("rect").attr("class", "a-bar-surplus")
      .attr("y", d => y(d.act)).attr("x", d => x(d.dCovered))
      .attr("height", y.bandwidth()).attr("width", d => x(d.dCovered + d.dSurplus) - x(d.dCovered))
      .attr("fill", "url(#ets-hatch-surplus-activity)")
      .on("mouseover", (ev, d) => showTip(ev, tipHtml(d)))
      .on("mousemove", moveTip).on("mouseout", hideTip);

    svg.selectAll(".a-line-allocation")
      .data(data)
      .join("line").attr("class", "a-line-allocation")
      .attr("y1", d => y(d.act)).attr("y2", d => y(d.act) + y.bandwidth())
      .attr("x1", d => x(d.dA)).attr("x2", d => x(d.dA))
      .attr("stroke", "#1a202c").attr("stroke-width", 3);

    svg.selectAll(".a-bar-label")
      .data(data.filter(d => d.e > 0))
      .join("text").attr("class", "a-bar-label")
      .attr("x", d => x(d.dTop) + 8)
      .attr("y", d => y(d.act) + y.bandwidth() / 2)
      .attr("dy", "0.32em")
      .attr("font-size", "13.5px")
      .attr("fill", "#718096")
      .text(coverageText);

    svg.append("g")
      .call(d3.axisLeft(y).tickFormat(d => ACTIVITIES[d].short))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").remove())
      .call(g => g.selectAll(".tick text").attr("font-size", "14px").attr("fill", "#718096")
        .call(wrapText, mg.left - 20, -10));

    svg.append("g").attr("transform", `translate(0,${H})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(axisFormat))
      .call(g => g.select(".domain").attr("stroke", "#e2e8f0"))
      .call(g => g.selectAll(".tick line").attr("stroke", "#e2e8f0"))
      .call(g => g.selectAll(".tick text").attr("font-size", "12px").attr("fill", "#718096"));
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

  // ── Update ────────────────────────────────────────────────────────────────
  function update() {
    const idxs = getFilteredInstallIndices();
    updateKPIs(idxs);
    renderTimeline(idxs);
    renderActivityChart(idxs);
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  populateControls();
  setupControls();
  update();
  window.addEventListener("resize", () => {
    const idxs = getFilteredInstallIndices();
    renderTimeline(idxs);
    renderActivityChart(idxs);
  });
})();
