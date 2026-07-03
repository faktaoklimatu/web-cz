(function () {
  'use strict';
  const data = window.COSTS_AND_BENEFITS;
  if (!data) return;
  const shared = window.CB_SHARED || {};
  const CP_CHART_MEASURES     = shared.CP_CHART_MEASURES     || [];
  const CP_CHART_COLORS       = shared.CP_CHART_COLORS       || [];
  const TRANSPORT_MEASURE_MAP = shared.TRANSPORT_MEASURE_MAP || {};
  const cpActualName          = shared.cpActualName          || ((n) => n);
  const cpIncludesForCat      = shared.cpIncludesForCat      || (() => false);
  const addDownloadBar        = shared.addDownloadBar        || (() => {});
  const fmtCZK                = shared.fmtCZK                || (v => v);

  // ── Sensitivity beeswarm constants ────────────────────────────────────────
  const SB_SCENARIOS      = ['CP', 'NZ', 'CP_EC'];
  const SB_SCENARIO_LABEL = { CP: 'Současné politiky', NZ: 'Net-zero', CP_EC: 'Energetická krize' };
  // Derived from YAML carbon_cost_scenarios — gives [0, 60, 100, 200]
  const SB_CARBON_PRICES  = [...new Set([
    ...(data.carbon_cost_scenarios || []).map(s => s.carbon_price_eur),
    40, 70,
  ])].sort((a, b) => a - b);
  const SB_DISCOUNT_RATES = [0, 3, 7];
  const SB_DEFAULT        = { scenario: 'CP', cp: 70, dr: 3 };
  let   SB_X_DOMAIN       = [-800000, 800000];
  const SB_CAPEX_CASES    = [
    { key: 'worst',     label: 'Nejhorší', sensitivityFactor: +1.0 },
    { key: 'reference', label: 'Normální', sensitivityFactor:  0.0 },
    { key: 'best',      label: 'Nejlepší', sensitivityFactor: -1.0 },
  ];
  const SB_CAPEX_FALLBACK = 0.10;
  const SB_PRICE_CASES    = [
    { key: 'worst',  label: 'Pesimistický', fossilMult: 0.9, cleanMult: 1.1 },
    { key: 'normal', label: 'Normální',     fossilMult: 1.0, cleanMult: 1.0 },
    { key: 'best',   label: 'Optimistický', fossilMult: 1.1, cleanMult: 0.9 },
  ];

  // Color-by scales
  const SB_SC_COLORS  = { CP: '#de7c1a', NZ: '#19a0a8', CP_EC: '#b33064' };
  const SB_CP_COLOR_SCALE = d3.scaleLinear()
    .domain([0, 60, 100, 200])
    .range(['#fde0c8', '#fc8d59', '#d7301f', '#7f0000']);
  const SB_DR_COLORS  = { 0: '#c6dbef', 3:  '#4292c6', 7:   '#08306b' };
  const SB_PF_COLORS  = { worst: '#c0392b', normal: '#aaa', best: '#2471a3' };
  const SB_CAT_COLORS = {
    'Rodinný dům uhlí – C':                              '#5a1a2e',
    'Rodinný dům uhlí – D':                              '#742440',
    'Rodinný dům uhlí – E':                              '#903156',
    'Rodinný dům uhlí – F':                              '#b05070',
    'Rodinný dům plyn – A':                              '#b04040',
    'Rodinný dům plyn – C':                              '#cc5555',
    'Rodinný dům plyn – D':                              '#d96666',
    'Rodinný dům plyn – E':                              '#e37373',
    'Rodinný dům plyn – F':                              '#ee9898',
    'Byt ve starší zástavbě s vlastním plynovým kotlem': '#2e7d5b',
    'Byt v panelovém domě s plynovou kotelnou':          '#1a7a85',
    'Nové malé':  '#6b4fa0',
    'Nové velké': '#8546af',
    'Ojeté malé': '#9b6fc4',
    'Ojeté velké':'#b090d4',
  };
  const SB_BUILDING_CATS = [
    'Rodinný dům uhlí – C', 'Rodinný dům uhlí – D',
    'Rodinný dům uhlí – E', 'Rodinný dům uhlí – F',
    'Rodinný dům plyn – A', 'Rodinný dům plyn – C',
    'Rodinný dům plyn – D', 'Rodinný dům plyn – E',
    'Rodinný dům plyn – F',
    'Byt ve starší zástavbě s vlastním plynovým kotlem',
    'Byt v panelovém domě s plynovou kotelnou',
  ];
  const SB_TRANSPORT_CATS = ['Nové malé', 'Nové velké', 'Ojeté malé', 'Ojeté velké'];

  // ── State ─────────────────────────────────────────────────────────────────
  let sbSelectedMeasure     = null;
  let sbMeasureGroups       = null;
  let sbGrouped             = 'context';
  let sbShowUncertainty     = false;
  let sbShowViolin          = false;
  let sbOnlyDefault         = false;  // show only výchozí dot + NPV label
  let sbColorBy             = 'npv'; // null | 'sc' | 'cp' | 'dr' | 'pf' | 'npv'
  let sbDotR                = 7.2;   // dot radius (px) — dot-size slider
  let sbFontScale           = 1.0;   // font-size multiplier — font-scale slider
  let sbCollideScale        = 1.0;   // collision radius multiplier — overlap slider
  let sbEnabledScenarios    = new Set(['CP', 'NZ', 'CP_EC']);
  let sbEnabledDiscountRates = new Set([3]);
  let sbEnabledCarbonPrices  = new Set([40, 70, 100]);
  let sbEnabledBuildingCats  = new Set(SB_BUILDING_CATS);
  let sbEnabledPriceCases    = new Set(['worst', 'normal', 'best']);
  let sbEnabledCapexCases    = new Set(['worst', 'reference', 'best']);
  let sbTransportAge         = new Set(['Nové', 'Ojeté']);
  let sbTransportSize        = new Set(['malé', 'velké']);

  // Registry for measure/baseline illustration SVGs.
  const SB_ICONS = shared.SB_ICONS || window.SB_ICONS || {};

  // Draw an illustration icon (or placeholder) into `svg` at the given position.
  // Draw a grid of filled squares (block pictograph), growing upward from bottomY.
  // cx = horizontal centre, bottomY = bottom edge of the grid.
  // Row 0 = bottom row (fills first); row 1 = top row (fills when n > maxPerRow).
  // Squares: grey #515b66, white 0.5 px border, no gap.
  function sbDrawBlockGrid(svg, cx, bottomY, nFilled, maxPerRow, sqSize) {
    if (nFilled <= 0) return;
    const n      = Math.min(nFilled, maxPerRow * 2);
    const gridW  = maxPerRow * sqSize;
    const startX = cx - gridW / 2;
    for (let i = 0; i < n; i++) {
      const col          = i % maxPerRow;
      const rowFromBot   = Math.floor(i / maxPerRow);  // 0 = bottom row
      const y            = bottomY - (rowFromBot + 1) * sqSize;
      svg.append('rect')
        .attr('x', startX + col * sqSize).attr('y', y)
        .attr('width', sqSize).attr('height', sqSize)
        .attr('fill', '#9ea7b3')
        .attr('stroke', 'white').attr('stroke-width', 0.5);
    }
  }

  // Like sbDrawBlockGrid but grows downward from topY instead of upward from bottomY.
  function sbDrawBlockGridDown(svg, cx, topY, nFilled, maxPerRow, sqSize, fillColor) {
    if (nFilled <= 0) return;
    const n      = Math.min(nFilled, maxPerRow * 2);
    const gridW  = maxPerRow * sqSize;
    const startX = cx - gridW / 2;
    for (let i = 0; i < n; i++) {
      const col        = i % maxPerRow;
      const rowFromTop = Math.floor(i / maxPerRow);
      const y          = topY + rowFromTop * sqSize;
      svg.append('rect')
        .attr('x', startX + col * sqSize).attr('y', y)
        .attr('width', sqSize).attr('height', sqSize)
        .attr('fill', fillColor || '#dde5ea')
        .attr('stroke', 'white').attr('stroke-width', 0.5);
    }
  }

  function sbDrawCircleGrid(svg, cx, bottomY, nFilled, maxPerRow, sqSize) {
    if (nFilled <= 0) return;
    const n      = Math.min(nFilled, maxPerRow * 2);
    const r      = sqSize / 2;
    const startX = cx - (maxPerRow * sqSize) / 2;
    for (let i = 0; i < n; i++) {
      const col        = i % maxPerRow;
      const rowFromBot = Math.floor(i / maxPerRow);
      svg.append('circle')
        .attr('cx', startX + col * sqSize + r)
        .attr('cy', bottomY - (rowFromBot + 1) * sqSize + r)
        .attr('r', r - 0.8)
        .attr('fill', '#9ea7b3');
    }
  }

  function sbDrawCircleGridDown(svg, cx, topY, nFilled, maxPerRow, sqSize, fillColor) {
    if (nFilled <= 0) return;
    const n      = Math.min(nFilled, maxPerRow * 2);
    const r      = sqSize / 2;
    const startX = cx - (maxPerRow * sqSize) / 2;
    for (let i = 0; i < n; i++) {
      const col        = i % maxPerRow;
      const rowFromTop = Math.floor(i / maxPerRow);
      svg.append('circle')
        .attr('cx', startX + col * sqSize + r)
        .attr('cy', topY + rowFromTop * sqSize + r)
        .attr('r', r - 0.8)
        .attr('fill', fillColor || '#dde5ea');
    }
  }

  function sbDrawIcon(svg, name, x, y, w, h) {
    const href = SB_ICONS[name];
    if (href) {
      svg.append('image')
        .attr('href', href)
        .attr('x', x).attr('y', y)
        .attr('width', w).attr('height', h)
        .attr('preserveAspectRatio', 'xMidYMid meet');
    } else {
      // Placeholder: dashed rectangle
      svg.append('rect')
        .attr('x', x).attr('y', y)
        .attr('width', w).attr('height', h)
        .attr('fill', 'none')
        .attr('stroke', '#9ea7b3')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4 3')
        .attr('rx', 4);
    }
  }

  function sbFindEntry(measureName, category) {
    const resolvedName = (TRANSPORT_MEASURE_MAP[measureName] || {})[category] || measureName;
    return [...(data.buildings_measures || []), ...(data.transport_measures || [])].find(m =>
      m.measure_name === resolvedName &&
      (m.building_category === category || m.transport_category === category)
    );
  }

  function sbCalcNpvFull(entry, scenario, cp, dr, fossilMult, cleanMult, capexMeasMult, capexBlMult) {
    try {
      const r = CostsBenefits.calculate({
        measureId:              entry.id, data,
        discountRate:           dr / 100,
        carbonPriceEur:         cp,
        priceScenario:          scenario,
        electricityPriceFactor: CostsBenefits.getDefaultElectricityPriceFactor(data),
        fossilMult,
        cleanMult,
        capexMeasMult,
        capexBlMult,
      });
      if (isNaN(r.npv)) return null;
      const sens    = r.sensitivity || [];
      const npvLow  = sens.length ? Math.min(...sens.map(s => s.minNpv)) : r.npv;
      const npvHigh = sens.length ? Math.max(...sens.map(s => s.maxNpv)) : r.npv;
      return { npv: r.npv, npvLow, npvHigh };
    } catch (_) { return null; }
  }

  const sbCalcNpv = (...args) => sbCalcNpvFull(...args)?.npv ?? null;

  function sbBuildMeasureGroups() {
    // Derive cats from the actual data so we don't miss contexts (e.g. apartment buildings)
    // that exist in the data but aren't in CP_CHART_MEASURES.
    const allB = data.buildings_measures || [];
    const allT = data.transport_measures  || [];

    // All unique measure names, ordered by CP_CHART_MEASURES then any extras
    const bNamesAll = [...new Set(allB.map(m => m.measure_name))];
    const bNames = [...CP_CHART_MEASURES.filter(n => bNamesAll.includes(n)), ...bNamesAll.filter(n => !CP_CHART_MEASURES.includes(n))];

    function catsFor(names, entries, allowedCats) {
      return names
        .map(name => ({
          name,
          cats: allowedCats.filter(cat =>
            entries.some(m => m.measure_name === name &&
              (m.building_category === cat || m.transport_category === cat))
          ),
        }))
        .filter(g => g.cats.length > 0);
    }

    // Transport groups use virtual names from TRANSPORT_MEASURE_MAP
    const transportGroups = Object.keys(TRANSPORT_MEASURE_MAP).map(virtualName => ({
      name: virtualName,
      cats: SB_TRANSPORT_CATS.filter(cat => {
        const resolved = TRANSPORT_MEASURE_MAP[virtualName][cat];
        return resolved && allT.some(m => m.measure_name === resolved && m.transport_category === cat);
      }),
    })).filter(g => g.cats.length > 0);

    const lcB = allB.filter(m => m.measure_baseline_id);
    const lcT = allT.filter(m => m.measure_baseline_id);
    const buildingBaselines  = [...new Set(lcB.map(m => m.measure_baseline).filter(Boolean))];
    const transportBaselines = [...new Set(lcT.map(m => m.measure_baseline).filter(Boolean))];

    return {
      buildings: catsFor(bNames, allB, SB_BUILDING_CATS),
      transport: transportGroups,
      buildingBaselines,
      transportBaselines,
    };
  }

  // ── Abbreviations for building context pills ───────────────────────────────
  // Each entry: { full: <full category name>, group: <group prefix label>, label: <pill label> }
  const SB_CAT_ABBREV = [
    { full: 'Rodinný dům uhlí – C', group: 'uhlí',  label: 'C' },
    { full: 'Rodinný dům uhlí – D', group: 'uhlí',  label: 'D' },
    { full: 'Rodinný dům uhlí – E', group: 'uhlí',  label: 'E' },
    { full: 'Rodinný dům uhlí – F', group: 'uhlí',  label: 'F' },
    { full: 'Rodinný dům plyn – A', group: 'plyn',  label: 'A' },
    { full: 'Rodinný dům plyn – C', group: 'plyn',  label: 'C' },
    { full: 'Rodinný dům plyn – D', group: 'plyn',  label: 'D' },
    { full: 'Rodinný dům plyn – E', group: 'plyn',  label: 'E' },
    { full: 'Rodinný dům plyn – F', group: 'plyn',  label: 'F' },
    { full: 'Byt ve starší zástavbě s vlastním plynovým kotlem', group: null, label: 'Byt plynový' },
    { full: 'Byt v panelovém domě s plynovou kotelnou',          group: null, label: 'Byt panelák' },
  ];

  function sbBuildFilters(wrap) {
    if (wrap.querySelector('.sb-filters')) return;
    const filtersDiv = document.createElement('div');
    filtersDiv.className = 'sb-filters q-filters';

    const rerender = () => sbRenderChart(document.getElementById('sensitivity-beeswarm-chart'));

    // ── Helper: single-select measure row ─────────────────────────────────
    function makeMeasureRow(labelText, groups) {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = labelText;
      row.appendChild(lbl);
      groups.forEach(g => {
        const btn = document.createElement('button');
        btn.className = 'q-filter-btn sb-measure-btn' + (sbSelectedMeasure === g.name ? ' active' : '');
        btn.dataset.measure = g.name;
        btn.textContent = g.name;
        btn.addEventListener('click', () => {
          sbSelectedMeasure = g.name;
          wrap.querySelectorAll('.sb-measure-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.measure === g.name)
          );
          rerender();
        });
        row.appendChild(btn);
      });
      return row;
    }

    // ── Helper: multi-select toggle row (minimum 1 active) ────────────────
    function makeToggleRow(labelText, items, stateSet, onToggle) {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = labelText;
      row.appendChild(lbl);
      items.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'q-filter-btn' + (stateSet.has(item) ? ' active' : '');
        btn.dataset.val = item;
        btn.textContent = item;
        btn.addEventListener('click', () => {
          if (stateSet.has(item)) {
            if (stateSet.size > 1) stateSet.delete(item);
          } else {
            stateSet.add(item);
          }
          btn.classList.toggle('active', stateSet.has(item));
          onToggle();
        });
        row.appendChild(btn);
      });
      return row;
    }

    // ── Section label helper ───────────────────────────────────────────────
    function makeSectionLabel(text) {
      const el = document.createElement('div');
      el.className = 'sb-section-label';
      el.textContent = text;
      return el;
    }

    // ── Separator helper ───────────────────────────────────────────────────
    function makeSeparator() {
      const el = document.createElement('div');
      el.className = 'sb-section-separator';
      return el;
    }

    const lcBuildings = sbMeasureGroups.buildings.filter(g => CP_CHART_MEASURES.includes(g.name));
    const lcTransport = sbMeasureGroups.transport.filter(g => CP_CHART_MEASURES.includes(g.name));

    // ══ SECTION: OPATŘENÍ ════════════════════════════════════════════════
    filtersDiv.appendChild(makeSectionLabel('Opatření'));

    // Row: building measure single-select
    filtersDiv.appendChild(makeMeasureRow('Budovy:', lcBuildings));

    // Row: building context compact toggles
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'Kontext:';
      row.appendChild(lbl);

      // Group prefix labels: track current group so we insert prefix only on first in group
      let currentGroup = undefined;
      SB_CAT_ABBREV.forEach(entry => {
        // Insert group prefix label when group changes (only for named groups)
        if (entry.group !== null && entry.group !== currentGroup) {
          currentGroup = entry.group;
          const prefix = document.createElement('span');
          prefix.className = 'sb-cat-group-prefix';
          prefix.textContent = entry.group;
          row.appendChild(prefix);
        } else if (entry.group === null) {
          currentGroup = null;
        }

        const btn = document.createElement('button');
        btn.className = 'q-filter-btn sb-cat-btn' + (sbEnabledBuildingCats.has(entry.full) ? ' active' : '');
        btn.dataset.cat = entry.full;
        btn.title = entry.full;
        btn.textContent = entry.label;
        btn.addEventListener('click', () => {
          if (sbEnabledBuildingCats.has(entry.full)) {
            if (sbEnabledBuildingCats.size > 1) sbEnabledBuildingCats.delete(entry.full);
          } else {
            sbEnabledBuildingCats.add(entry.full);
          }
          btn.classList.toggle('active', sbEnabledBuildingCats.has(entry.full));
          rerender();
        });
        row.appendChild(btn);
      });
      filtersDiv.appendChild(row);
    }

    // ── Separator ─────────────────────────────────────────────────────────
    filtersDiv.appendChild(makeSeparator());

    // Row: transport measure single-select
    filtersDiv.appendChild(makeMeasureRow('Doprava:', lcTransport));

    // Row: transport context (age + size on one row)
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'Kontext:';
      row.appendChild(lbl);

      // Age group label
      const ageLbl = document.createElement('span');
      ageLbl.className = 'sb-cat-group-prefix';
      ageLbl.textContent = 'Stáří';
      row.appendChild(ageLbl);

      ['Nové', 'Ojeté'].forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'q-filter-btn' + (sbTransportAge.has(item) ? ' active' : '');
        btn.dataset.val = item;
        btn.textContent = item;
        btn.addEventListener('click', () => {
          if (sbTransportAge.has(item)) {
            if (sbTransportAge.size > 1) sbTransportAge.delete(item);
          } else {
            sbTransportAge.add(item);
          }
          btn.classList.toggle('active', sbTransportAge.has(item));
          rerender();
        });
        row.appendChild(btn);
      });

      // Mid-dot separator between age and size
      const dot = document.createElement('span');
      dot.className = 'sb-group-dot';
      dot.textContent = '·';
      row.appendChild(dot);

      // Size group label
      const sizeLbl = document.createElement('span');
      sizeLbl.className = 'sb-cat-group-prefix';
      sizeLbl.textContent = 'Vel.';
      row.appendChild(sizeLbl);

      ['malé', 'velké'].forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'q-filter-btn' + (sbTransportSize.has(item) ? ' active' : '');
        btn.dataset.val = item;
        btn.textContent = item;
        btn.addEventListener('click', () => {
          if (sbTransportSize.has(item)) {
            if (sbTransportSize.size > 1) sbTransportSize.delete(item);
          } else {
            sbTransportSize.add(item);
          }
          btn.classList.toggle('active', sbTransportSize.has(item));
          rerender();
        });
        row.appendChild(btn);
      });
      filtersDiv.appendChild(row);
    }

    // ══ SECTION: PARAMETRY ════════════════════════════════════════════════
    filtersDiv.appendChild(makeSectionLabel('Parametry'));

    // Row: Scénář
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'Scénář:';
      row.appendChild(lbl);
      SB_SCENARIOS.forEach(sc => {
        const btn = document.createElement('button');
        btn.className = 'q-filter-btn sb-scenario-btn' + (sbEnabledScenarios.has(sc) ? ' active' : '');
        btn.dataset.scenario = sc;
        btn.textContent = SB_SCENARIO_LABEL[sc];
        btn.addEventListener('click', () => {
          if (sbEnabledScenarios.has(sc)) {
            if (sbEnabledScenarios.size > 1) sbEnabledScenarios.delete(sc);
          } else {
            sbEnabledScenarios.add(sc);
          }
          btn.classList.toggle('active', sbEnabledScenarios.has(sc));
          rerender();
        });
        row.appendChild(btn);
      });
      filtersDiv.appendChild(row);
    }

    // Row: Ceny paliv
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'Ceny paliv:';
      row.appendChild(lbl);
      SB_PRICE_CASES.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'q-filter-btn sb-pf-btn' + (sbEnabledPriceCases.has(item.key) ? ' active' : '');
        btn.dataset.pf = item.key;
        btn.textContent = item.label;
        btn.addEventListener('click', () => {
          if (sbEnabledPriceCases.has(item.key)) {
            if (sbEnabledPriceCases.size > 1) sbEnabledPriceCases.delete(item.key);
          } else {
            sbEnabledPriceCases.add(item.key);
          }
          btn.classList.toggle('active', sbEnabledPriceCases.has(item.key));
          rerender();
        });
        row.appendChild(btn);
      });
      filtersDiv.appendChild(row);
    }

    // Row: CAPEX
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'CAPEX:';
      row.appendChild(lbl);
      SB_CAPEX_CASES.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'q-filter-btn sb-cx-btn' + (sbEnabledCapexCases.has(item.key) ? ' active' : '');
        btn.dataset.cx = item.key;
        btn.textContent = item.label;
        btn.addEventListener('click', () => {
          if (sbEnabledCapexCases.has(item.key)) {
            if (sbEnabledCapexCases.size > 1) sbEnabledCapexCases.delete(item.key);
          } else {
            sbEnabledCapexCases.add(item.key);
          }
          btn.classList.toggle('active', sbEnabledCapexCases.has(item.key));
          rerender();
        });
        row.appendChild(btn);
      });
      filtersDiv.appendChild(row);
    }

    // Row: Diskontní míra
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'Diskontní míra:';
      row.appendChild(lbl);
      SB_DISCOUNT_RATES.forEach(dr => {
        const btn = document.createElement('button');
        btn.className = 'q-filter-btn sb-dr-btn' + (sbEnabledDiscountRates.has(dr) ? ' active' : '');
        btn.dataset.dr = dr;
        btn.textContent = dr + ' %';
        btn.addEventListener('click', () => {
          if (sbEnabledDiscountRates.has(dr)) {
            if (sbEnabledDiscountRates.size > 1) sbEnabledDiscountRates.delete(dr);
          } else {
            sbEnabledDiscountRates.add(dr);
          }
          btn.classList.toggle('active', sbEnabledDiscountRates.has(dr));
          rerender();
        });
        row.appendChild(btn);
      });
      filtersDiv.appendChild(row);
    }

    // Row: Cena CO₂
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'Cena CO₂:';
      row.appendChild(lbl);
      SB_CARBON_PRICES.forEach(cp => {
        const btn = document.createElement('button');
        btn.className = 'q-filter-btn sb-cp-btn' + (sbEnabledCarbonPrices.has(cp) ? ' active' : '');
        btn.dataset.cp = cp;
        btn.textContent = cp + ' €';
        btn.addEventListener('click', () => {
          if (sbEnabledCarbonPrices.has(cp)) {
            if (sbEnabledCarbonPrices.size > 1) sbEnabledCarbonPrices.delete(cp);
          } else {
            sbEnabledCarbonPrices.add(cp);
          }
          btn.classList.toggle('active', sbEnabledCarbonPrices.has(cp));
          rerender();
        });
        row.appendChild(btn);
      });
      filtersDiv.appendChild(row);
    }

    // ══ SECTION: VIZUALIZACE ══════════════════════════════════════════════
    filtersDiv.appendChild(makeSectionLabel('Vizualizace'));

    // Row: Řádky (grouping)
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'Řádky:';
      row.appendChild(lbl);
      [
        { key: 'none',     label: 'Jeden řádek' },
        { key: 'context',  label: 'Kontext' },
        { key: 'rdFuel',   label: 'RD souhrnně' },
        { key: 'fuel',     label: 'Uhlí / Plyn' },
        { key: 'scenario', label: 'Scénář' },
        { key: 'price',    label: 'Cena uhlíku' },
        { key: 'discount', label: 'Diskontní míra' },
      ].forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'q-filter-btn sb-group-btn' + (sbGrouped === item.key ? ' active' : '');
        btn.dataset.grouped = item.key;
        btn.textContent = item.label;
        btn.addEventListener('click', () => {
          sbGrouped = item.key;
          wrap.querySelectorAll('.sb-group-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.grouped === item.key)
          );
          rerender();
        });
        row.appendChild(btn);
      });
      filtersDiv.appendChild(row);
    }

    // Row: Barvy dle
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'Barvy dle:';
      row.appendChild(lbl);
      [
        { key: null,   label: 'Šedá' },
        { key: 'sc',   label: 'Scénář' },
        { key: 'cp',   label: 'Cena CO₂' },
        { key: 'dr',   label: 'Diskont. míra' },
        { key: 'pf',   label: 'Ceny energie' },
        { key: 'npv',  label: 'Výhodnost' },
      ].forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'q-filter-btn sb-color-btn' + (sbColorBy === item.key ? ' active' : '');
        btn.dataset.colorBy = item.key ?? '';
        btn.textContent = item.label;
        btn.addEventListener('click', () => {
          sbColorBy = item.key;
          wrap.querySelectorAll('.sb-color-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.colorBy === (item.key ?? ''))
          );
          rerender();
        });
        row.appendChild(btn);
      });
      filtersDiv.appendChild(row);
    }

    // Row: Rozsah osy (scale slider)
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'Rozsah osy:';
      row.appendChild(lbl);
      const scaleVal = document.createElement('span');
      scaleVal.className = 'q-filter-label';
      const fmtDomain = v => v >= 1e6 ? (v / 1e6).toFixed(1).replace('.', ',') + ' M' : Math.round(v / 1e3) + ' tis.';
      scaleVal.textContent = '± ' + fmtDomain(SB_X_DOMAIN[1]);
      scaleVal.style.minWidth = '60px';
      const slider = document.createElement('input');
      slider.type  = 'range';
      slider.min   = 100000;
      slider.max   = 1500000;
      slider.step  = 50000;
      slider.value = SB_X_DOMAIN[1];
      slider.style.cssText = 'flex:1;margin:0 8px;max-width:200px;';
      slider.addEventListener('input', () => {
        const v = +slider.value;
        SB_X_DOMAIN = [-v, v];
        scaleVal.textContent = '± ' + fmtDomain(v);
        rerender();
      });
      row.appendChild(slider);
      row.appendChild(scaleVal);
      filtersDiv.appendChild(row);
    }

    // Row: Veľkosť bodiek (dot radius)
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'Veľkosť bodiek:';
      row.appendChild(lbl);
      const dotVal = document.createElement('span');
      dotVal.className = 'q-filter-label';
      dotVal.textContent = sbDotR.toFixed(1);
      dotVal.style.minWidth = '30px';
      const dotSlider = document.createElement('input');
      dotSlider.type  = 'range';
      dotSlider.min   = 3;
      dotSlider.max   = 15;
      dotSlider.step  = 0.5;
      dotSlider.value = sbDotR;
      dotSlider.style.cssText = 'flex:1;margin:0 8px;max-width:200px;';
      dotSlider.addEventListener('input', () => {
        sbDotR = +dotSlider.value;
        dotVal.textContent = sbDotR.toFixed(1);
        rerender();
      });
      row.appendChild(dotSlider);
      row.appendChild(dotVal);
      filtersDiv.appendChild(row);
    }

    // Row: Veľkosť písma (font scale)
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'Veľkosť písma:';
      row.appendChild(lbl);
      const fontVal = document.createElement('span');
      fontVal.className = 'q-filter-label';
      fontVal.textContent = '×' + sbFontScale.toFixed(2);
      fontVal.style.minWidth = '40px';
      const fontSlider = document.createElement('input');
      fontSlider.type  = 'range';
      fontSlider.min   = 0.5;
      fontSlider.max   = 2.0;
      fontSlider.step  = 0.05;
      fontSlider.value = sbFontScale;
      fontSlider.style.cssText = 'flex:1;margin:0 8px;max-width:200px;';
      fontSlider.addEventListener('input', () => {
        sbFontScale = +fontSlider.value;
        fontVal.textContent = '×' + sbFontScale.toFixed(2);
        rerender();
      });
      row.appendChild(fontSlider);
      row.appendChild(fontVal);
      filtersDiv.appendChild(row);
    }

    // Row: Rozostup bodiek (collision scale)
    {
      const row = document.createElement('div');
      row.className = 'q-filter-row';
      const lbl = document.createElement('span');
      lbl.className = 'q-filter-label';
      lbl.textContent = 'Rozostup bodiek:';
      row.appendChild(lbl);
      const colVal = document.createElement('span');
      colVal.className = 'q-filter-label';
      colVal.textContent = sbCollideScale.toFixed(1) + '×';
      colVal.style.minWidth = '35px';
      const colSlider = document.createElement('input');
      colSlider.type  = 'range';
      colSlider.min   = 0.5;
      colSlider.max   = 3.0;
      colSlider.step  = 0.1;
      colSlider.value = sbCollideScale;
      colSlider.style.cssText = 'flex:1;margin:0 8px;max-width:200px;';
      colSlider.addEventListener('input', () => {
        sbCollideScale = +colSlider.value;
        colVal.textContent = sbCollideScale.toFixed(1) + '×';
        rerender();
      });
      row.appendChild(colSlider);
      row.appendChild(colVal);
      filtersDiv.appendChild(row);
    }

    wrap.insertBefore(filtersDiv, wrap.firstChild);
  }

  function sbRenderChart(container) {
    if (!container || !sbSelectedMeasure || !sbMeasureGroups) return;
    const allGroups = [...sbMeasureGroups.buildings, ...sbMeasureGroups.transport];
    const group = allGroups.find(g => g.name === sbSelectedMeasure);
    if (!group) return;

    // Build all dots: one per (category × scenario × carbon_price × discount_rate).
    // NZ scenario has a fixed internal carbon trajectory — iterate only once to avoid duplicates.
    const sbAllMeasures = [...(data.buildings_measures || []), ...(data.transport_measures || [])];
    const dots = [];
    const isTransport = TRANSPORT_MEASURE_MAP[sbSelectedMeasure] != null;
    const activeCats = isTransport
      ? group.cats.filter(cat => {
          const [age, size] = cat.split(' ');  // e.g. 'Nové malé' → ['Nové', 'malé']
          return sbTransportAge.has(age) && sbTransportSize.has(size);
        })
      : group.cats.filter(cat => sbEnabledBuildingCats.has(cat));
    for (const cat of activeCats) {
      const entry = sbFindEntry(sbSelectedMeasure, cat);
      if (!entry || !entry.measure_baseline_id) continue;
      const baseline = sbAllMeasures.find(m => m.id === entry.measure_baseline_id);
      const measS = entry.capex_sensitivity    ?? SB_CAPEX_FALLBACK;
      const blS   = baseline?.capex_sensitivity ?? SB_CAPEX_FALLBACK;
      for (const capexCase of SB_CAPEX_CASES.filter(c => sbEnabledCapexCases.has(c.key))) {
        const { sensitivityFactor } = capexCase;
        const capexMeasMult = 1 + sensitivityFactor * measS;
        const capexBlMult   = 1 - sensitivityFactor * blS;
        for (const priceCase of SB_PRICE_CASES.filter(p => sbEnabledPriceCases.has(p.key))) {
          const { fossilMult, cleanMult } = priceCase;
          for (const sc of SB_SCENARIOS.filter(s => sbEnabledScenarios.has(s))) {
            // FVE + baterie: electricity savings are unaffected by carbon price (ETS2 covers
            // only fossil-fuel sectors, not electricity tariffs in this model) → fix cp to default.
            const cpFixed = sbSelectedMeasure === 'Střešní fotovoltaika + baterie';
            const cps = (sc === 'NZ' || cpFixed)
              ? [SB_DEFAULT.cp]
              : SB_CARBON_PRICES.filter(p => sbEnabledCarbonPrices.has(p));
            for (const cp of cps) {
              for (const dr of SB_DISCOUNT_RATES.filter(r => sbEnabledDiscountRates.has(r))) {
                const isDefault = sc === SB_DEFAULT.scenario && cp === SB_DEFAULT.cp && dr === SB_DEFAULT.dr && priceCase.key === 'normal' && capexCase.key === 'reference';
                if (sbShowUncertainty) {
                  const res = sbCalcNpvFull(entry, sc, cp, dr, fossilMult, cleanMult, capexMeasMult, capexBlMult);
                  if (res == null) continue;
                  dots.push({ cat, sc, cp, dr, priceCase: priceCase.key, capexCase: capexCase.key, npv: res.npv, npvLow: res.npvLow, npvHigh: res.npvHigh, isDefault, x: 0, y: 0 });
                } else {
                  const npv = sbCalcNpv(entry, sc, cp, dr, fossilMult, cleanMult, capexMeasMult, capexBlMult);
                  if (npv == null) continue;
                  dots.push({ cat, sc, cp, dr, priceCase: priceCase.key, capexCase: capexCase.key, npv, isDefault, x: 0, y: 0 });
                }
              }
            }
          }
        }
      }
    }

    if (!dots.length) {
      d3.select(container).selectAll('*').remove();
      return;
    }

    // Only show lanes that actually have dots (skips cats with missing baseline data etc.)
    const catsWithDots = new Set(dots.map(d => d.cat));
    const cats = activeCats.filter(cat => catsWithDots.has(cat)).slice().sort((a, b) => {
      const npvA = (dots.find(d => d.cat === a && d.isDefault) || {}).npv ?? 0;
      const npvB = (dots.find(d => d.cat === b && d.isDefault) || {}).npv ?? 0;
      return npvB - npvA;
    });
    const totalW = container.clientWidth || 720;
    const DOT_R  = sbDotR;
    const fs     = px => (sbFontScale * px).toFixed(1) + 'px';

    // Resolve lane config for the active grouping mode
    const fuelOf = d => /uhlí/i.test(d.cat) ? 'Uhlí' : /plyn/i.test(d.cat) ? 'Plyn' : 'Ostatní';
    const fuelColors = { 'Uhlí': '#903156', 'Plyn': '#e37373', 'Ostatní': '#9ea7b3' };
    const fuelLanes = ['Uhlí', 'Plyn', 'Ostatní'].filter(v => dots.some(d => fuelOf(d) === v));

    const rdFuelLaneOf = d => {
      if (/Rodinný dům/i.test(d.cat)) return /uhlí/i.test(d.cat) ? 'Rodinný dům – uhlí' : 'Rodinný dům – plyn';
      return d.cat;
    };
    const rdFuelColors = { 'Rodinný dům – uhlí': '#903156', 'Rodinný dům – plyn': '#e37373' };
    const rdFuelLaneOrder = ['Rodinný dům – uhlí', 'Rodinný dům – plyn', ...SB_BUILDING_CATS.filter(c => !/Rodinný dům/i.test(c))];
    const rdFuelLanes = rdFuelLaneOrder.filter(v => dots.some(d => rdFuelLaneOf(d) === v));

    const sbCatLabel = v => v.replace(/ – ([A-F])(\b|$)/, ' ($1)');
    const sbLcColor  = name => /renovace bez zateplení/i.test(name) ? '#c05a1a' : '#1a7a85';

    // ── Column layout: left padding | chart | measure | stats ─────────────
    const leftZoneW        = Math.round(totalW * 0.12);    // shrunken left context column (×1.2 of 0.10 base)
    const rightMeasW       = Math.round(totalW * 0.20);   // low-carbon measure column (icon + text)
    const rightStatW       = Math.round(totalW * 0.25);   // stat columns (2 × 12.5 %)
    const statColW         = rightStatW / 2;              // each stat sub-column
    const SQ_SIZE          = 10;   // block square px
    const SQ_PER_ROW       = 5;
    const CO2_PER_SQ       = 20;
    const MWH_PER_SQ       = 50;
    const LTR_PER_SQ       = 2000;
    const CHART_R_GAP        = 18;                        // gap between beeswarm right edge and right columns
    const RIGHT_MARGIN_STATS = CHART_R_GAP + rightMeasW + rightStatW;

    const LANE_CONFIGS = {
      context:  { lanes: cats,             laneOf: d => d.cat,   labelFn: sbCatLabel,                colorFn: v => SB_CAT_COLORS[v] || '#515b66',    leftMargin: leftZoneW, rightMargin: RIGHT_MARGIN_STATS, showBaselineLabel: true },
      rdFuel:   { lanes: rdFuelLanes,      laneOf: rdFuelLaneOf, labelFn: sbCatLabel,                colorFn: v => rdFuelColors[v] || SB_CAT_COLORS[v] || '#515b66', leftMargin: leftZoneW, rightMargin: RIGHT_MARGIN_STATS, showBaselineLabel: true },
      scenario: { lanes: SB_SCENARIOS,     laneOf: d => d.sc,    labelFn: v => SB_SCENARIO_LABEL[v], colorFn: () => '#515b66',                        leftMargin: 160 },
      price:    { lanes: SB_CARBON_PRICES, laneOf: d => d.cp,    labelFn: v => v + ' €',             colorFn: () => '#515b66',                        leftMargin:  60 },
      discount: { lanes: SB_DISCOUNT_RATES,laneOf: d => d.dr,    labelFn: v => v + ' %',             colorFn: () => '#515b66',                        leftMargin:  50 },
      fuel:     { lanes: fuelLanes,        laneOf: fuelOf,       labelFn: v => v,                    colorFn: v => fuelColors[v] || '#9ea7b3',        leftMargin:  70 },
    };
    const laneCfg = LANE_CONFIGS[sbGrouped] || null;

    let M, LANE_H, totalH, yTarget, yClamp;
    if (laneCfg) {
      M      = { top: laneCfg.showBaselineLabel ? 56 : 30, right: laneCfg.rightMargin || 24, bottom: 40, left: laneCfg.leftMargin };
      LANE_H = DOT_R * 26.2; // targets ~850 px total height at 4 lanes
      totalH = laneCfg.lanes.length * LANE_H + M.top + M.bottom;
      yTarget = d => {
        const idx = laneCfg.lanes.indexOf(laneCfg.laneOf(d));
        return M.top + (idx === -1 ? 0 : idx) * LANE_H + LANE_H / 2;
      };
      yClamp = (d, y) => {
        const idx = laneCfg.lanes.indexOf(laneCfg.laneOf(d));
        const cy  = M.top + (idx === -1 ? 0 : idx) * LANE_H + LANE_H / 2;
        return Math.max(cy - LANE_H / 2 + DOT_R, Math.min(cy + LANE_H / 2 - DOT_R, y));
      };
    } else {
      M      = { top: 30, right: 24, bottom: 40, left: 24 };
      LANE_H = DOT_R * 48;
      totalH = LANE_H + M.top + M.bottom;
      const midY = M.top + LANE_H / 2;
      yTarget = () => midY;
      yClamp  = (d, y) => Math.max(M.top + DOT_R, Math.min(M.top + LANE_H - DOT_R, y));
    }

    const chartW = Math.max(totalW - M.left - M.right, 200);
    const xScale = d3.scaleLinear().domain([SB_X_DOMAIN[0], SB_X_DOMAIN[1]]).range([0, chartW]);

    // Column centre x positions (used when showBaselineLabel)
    const RX           = M.left + chartW;              // beeswarm right edge
    const xRightCols   = RX + CHART_R_GAP;             // start of right columns (after gap)
    const rightMeasCX  = xRightCols + rightMeasW / 2;  // centre of measure column
    const xStatCO2     = xRightCols + rightMeasW + statColW / 2;
    const xStatPlyn    = xRightCols + rightMeasW + statColW + statColW / 2;
    const fuelColHeader = 'ÚSPORA IMPORTU ROPY A PLYNU';

    const xTarget = d => M.left + xScale(Math.max(SB_X_DOMAIN[0], Math.min(SB_X_DOMAIN[1], d.npv)));
    dots.forEach(d => {
      d.x  = xTarget(d);
      d.y  = yTarget(d);
      d.fy = d.isDefault ? yTarget(d) : undefined; // pin default dot to centre line
    });

    // Snap x back to NPV position after each tick so only y is displaced by collide
    const sim = d3.forceSimulation(dots)
      .force('y', d3.forceY(d => yTarget(d)).strength(laneCfg ? 0.85 : 0.3))
      .force('collide', d3.forceCollide(DOT_R * sbCollideScale))
      .stop();
    const ticks = laneCfg ? 120 : 150;
    for (let i = 0; i < ticks; i++) {
      sim.tick();
      dots.forEach(d => { d.x = xTarget(d); });
    }

    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append('svg')
      .attr('width', totalW).attr('height', totalH)
      .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');

    const NEG_HATCH_ID = 'sb-neg-hatch';
    const defs = svg.append('defs');
    const hPat = defs.append('pattern')
      .attr('id', NEG_HATCH_ID).attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 5).attr('height', 5)
      .attr('patternTransform', 'rotate(45 0 0)');
    hPat.append('rect').attr('width', 5).attr('height', 5).attr('fill', '#9ea7b3');
    hPat.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 5)
      .attr('stroke', 'white').attr('stroke-width', 2);

    // Zero line
    const zx = M.left + xScale(0);
    svg.append('line')
      .attr('x1', zx).attr('x2', zx)
      .attr('y1', M.top).attr('y2', totalH - M.bottom)
      .attr('stroke', '#9ea7b3').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');

    // Column headers (drawn once above all lanes) — styled via .sb-col-hdr CSS class
    if (laneCfg?.showBaselineLabel) {
      // Multi-line column headers: each word on its own line via tspan
      const hdrLines = (x, lines, anchor = 'middle') => {
        const t = svg.append('text')
          .attr('class', 'sb-col-hdr').attr('x', x).attr('y', 12)
          .attr('text-anchor', anchor)
          .attr('font-size', fs(9)).attr('letter-spacing', '0.04em')
          .attr('font-weight', '700').attr('fill', shared.BSW_CFG?.clrSub || '#aaa');
        lines.forEach((line, i) => {
          t.append('tspan').attr('x', x).attr('dy', i === 0 ? '0' : '1.25em').text(line);
        });
        return t;
      };

      hdrLines(M.left + chartW / 2,   ['VÝHODNOST']);
      hdrLines(xRightCols + 77,       ['OPATŘENÍ'],                   'start');
      hdrLines(xStatCO2,              ['ÚSPORA', 'EMISÍ']);
      hdrLines(xStatPlyn,             ['ÚSPORA', 'IMPORTU', 'ROPY A PLYNU']);
    }

    // Grouped mode: lane lines + left-side labels
    if (laneCfg) {
      laneCfg.lanes.forEach((v, i) => {
        const cy = M.top + i * LANE_H + LANE_H / 2;
        svg.append('line')
          .attr('x1', M.left).attr('x2', M.left + chartW)
          .attr('y1', cy).attr('y2', cy)
          .attr('stroke', '#9ea7b3').attr('stroke-width', 1);

        const showBl = laneCfg.showBaselineLabel;
        const labelY = showBl ? cy - 5 : cy + 4;

        if (showBl) {
          const firstCat = laneCfg.laneOf === rdFuelLaneOf
            ? cats.find(c => rdFuelLaneOf({ cat: c }) === v)
            : v;
          const measEntry = firstCat ? sbFindEntry(sbSelectedMeasure, firstCat) : null;
          const blName    = measEntry?.measure_baseline || '';
          const blColor   = /uhlí|uhelný/i.test(blName) ? '#903156'
                          : /plyn/i.test(blName)         ? '#e37373'
                          : /renovace/i.test(blName)     ? '#c05a1a'
                          : '#9ea7b3';

          const ctxLabel    = laneCfg.labelFn(v);
          const letterMatch = ctxLabel.match(/\(([A-F])\)$/);
          const badgeLetter = letterMatch?.[1] ?? null;
          const ctxPrefix   = ctxLabel
            .replace(/\s*\([A-F]\)$/, '')
            .replace(/\s*(uhlí|plyn)\s*$/i, '')
            .trim();

          // ── Layout: two text lines centered around lane cy ──────────────
          const CTX_PX    = sbFontScale * 12;
          const BADGE_H   = Math.round(CTX_PX);          // badge matches context text height
          const BADGE_W   = Math.round(BADGE_H * 1.3);
          const BADGE_TIP = Math.round(BADGE_H * 0.4);
          const ctxTextY  = cy - Math.round(CTX_PX * 0.9);
          const nameTextY = cy + Math.round(CTX_PX * 1.0);

          const drawBadge = (bx, by) => {
            const pts = [
              `${bx},${by}`,
              `${bx + BADGE_W},${by}`,
              `${bx + BADGE_W + BADGE_TIP},${by + BADGE_H / 2}`,
              `${bx + BADGE_W},${by + BADGE_H}`,
              `${bx},${by + BADGE_H}`,
            ].join(' ');
            svg.append('polygon').attr('points', pts).attr('fill', '#515b66');
            svg.append('text')
              .attr('x', bx + BADGE_W / 2).attr('y', by + BADGE_H - Math.round(BADGE_H * 0.2))
              .attr('text-anchor', 'middle').attr('font-size', fs(9)).attr('font-weight', '700')
              .attr('font-family', 'Inter, system-ui, sans-serif').attr('fill', '#fff')
              .text(badgeLetter);
          };

          // ── LEFT column: context + badge + baseline name (no icon) ──────────
          svg.append('text')
            .attr('x', 4).attr('y', ctxTextY)
            .attr('text-anchor', 'start').attr('font-size', fs(12)).attr('font-weight', '500')
            .attr('font-family', 'Inter, system-ui, sans-serif').attr('fill', '#515b66')
            .text(ctxPrefix.toUpperCase());
          if (badgeLetter) {
            drawBadge(4 + ctxPrefix.length * sbFontScale * 7.8 + 6, ctxTextY - BADGE_H + 2);
          }
          svg.append('text')
            .attr('x', 4).attr('y', nameTextY)
            .attr('text-anchor', 'start').attr('font-size', fs(14)).attr('font-weight', '500')
            .attr('font-family', 'Inter, system-ui, sans-serif').attr('fill', blColor)
            .text(blName);

          // ── RIGHT column: icon (left) + context + badge + measure name ────────
          const MEAS_ICON_W = 54;
          const measIconX   = xRightCols + 15;
          const measTextX   = measIconX + MEAS_ICON_W + 8;
          sbDrawIcon(svg, sbSelectedMeasure, measIconX, cy - MEAS_ICON_W / 2, MEAS_ICON_W, MEAS_ICON_W);
          svg.append('text')
            .attr('x', measTextX).attr('y', ctxTextY)
            .attr('text-anchor', 'start').attr('font-size', fs(12)).attr('font-weight', '500')
            .attr('font-family', 'Inter, system-ui, sans-serif').attr('fill', '#515b66')
            .text(ctxPrefix.toUpperCase());
          if (badgeLetter) {
            drawBadge(measTextX + ctxPrefix.length * sbFontScale * 7.8 + 6, ctxTextY - BADGE_H + 2);
          }
          svg.append('text')
            .attr('x', measTextX).attr('y', nameTextY)
            .attr('text-anchor', 'start').attr('font-size', fs(14)).attr('font-weight', '700')
            .attr('font-family', 'Inter, system-ui, sans-serif').attr('fill', '#515b66')
            .text(sbSelectedMeasure);

          // ── STATS at default params (CP · 70€ · 3%) ─────────────────────────
          let co2Saved = null, fuelSaved = null;
          if (measEntry?.id != null) {
            try {
              const res = CostsBenefits.calculate({
                measureId:      measEntry.id, data,
                discountRate:   SB_DEFAULT.dr / 100,
                carbonPriceEur: SB_DEFAULT.cp,
                priceScenario:  SB_DEFAULT.scenario,
              });
              co2Saved  = res.emissionSavings != null ? -res.emissionSavings.totalT : null;
              fuelSaved = res.fossilImportSavings != null ? {
                scope1: res.fossilImportSavings.scope1TotalMwh,
                scope2: res.fossilImportSavings.scope2TotalMwh,
              } : null;
            } catch (_) {}
          }

          // Stat cell: blocks grow upward from cy, value text below centre
          const STAT_CLR = '#9ea7b3';
          const drawStatCell = (cx, nSq, valueText, useCircles = false) => {
            if (nSq > 0) {
              if (useCircles) sbDrawCircleGrid(svg, cx, cy - 4, nSq, SQ_PER_ROW, SQ_SIZE);
              else            sbDrawBlockGrid(svg, cx, cy - 4, nSq, SQ_PER_ROW, SQ_SIZE);
            }
            svg.append('text')
              .attr('x', cx).attr('y', cy + 16)
              .attr('text-anchor', 'middle').attr('font-size', fs(12)).attr('font-weight', '700')
              .attr('font-family', 'Inter, system-ui, sans-serif').attr('fill', STAT_CLR)
              .text(valueText);
          };

          const nCo2 = co2Saved != null && co2Saved > 0
            ? Math.min(SQ_PER_ROW * 2, Math.max(1, Math.round(co2Saved / CO2_PER_SQ))) : 0;
          drawStatCell(xStatCO2, nCo2,
            co2Saved != null && co2Saved > 0 ? Math.round(co2Saved) + ' t CO₂' : '–');

          // Scope 1: direct fossil savings (gas + liquid fuel, in MWh)
          const scope1Mwh  = fuelSaved != null ? fuelSaved.scope1 : null;
          const scope2Mwh  = fuelSaved != null ? fuelSaved.scope2 : null;
          const nScope1 = scope1Mwh != null && scope1Mwh > 0
            ? Math.min(SQ_PER_ROW * 2, Math.max(1, Math.round(scope1Mwh / MWH_PER_SQ))) : 0;
          drawStatCell(xStatPlyn, nScope1,
            scope1Mwh != null && scope1Mwh !== 0 ? Math.round(scope1Mwh) + ' MWh' : '–', true);

          // Separator line + Scope 2: positive (solar) above line, negative (BEV) below line
          if (scope2Mwh != null && scope2Mwh !== 0) {
            const sepY      = cy + 22;   // fixed reference line below scope1 label
            const gridHalfW = SQ_PER_ROW * SQ_SIZE / 2;
            svg.append('line')
              .attr('x1', xStatPlyn - gridHalfW).attr('x2', xStatPlyn + gridHalfW)
              .attr('y1', sepY).attr('y2', sepY)
              .attr('stroke', '#9ea7b3').attr('stroke-width', 0.8).attr('stroke-dasharray', '3 2');
            const nScope2 = Math.min(SQ_PER_ROW, Math.max(1, Math.round(Math.abs(scope2Mwh) / MWH_PER_SQ)));
            const s2Sign  = scope2Mwh > 0 ? '+' : '−';
            let lblY;
            if (scope2Mwh > 0) {
              // Savings: blocks sit just above the separator line, growing upward (teal)
              const nRowsS2 = Math.ceil(nScope2 / SQ_PER_ROW);
              sbDrawCircleGridDown(svg, xStatPlyn, sepY - 3 - nRowsS2 * SQ_SIZE,
                nScope2, SQ_PER_ROW, SQ_SIZE, '#b8d8d0');
              lblY = sepY + 14;
            } else {
              // Extra consumption: grey hatched circles, downward from just below separator line
              const s2RowH = Math.ceil(nScope2 / SQ_PER_ROW) * SQ_SIZE;
              sbDrawCircleGridDown(svg, xStatPlyn, sepY + 3, nScope2, SQ_PER_ROW, SQ_SIZE,
                `url(#${NEG_HATCH_ID})`);
              lblY = sepY + 3 + s2RowH + 12;
            }
            const lblX      = scope2Mwh < 0 ? xStatPlyn - gridHalfW : xStatPlyn;
            const lblAnchor = scope2Mwh < 0 ? 'start' : 'middle';
            const lbl = svg.append('text')
              .attr('x', lblX).attr('y', lblY)
              .attr('text-anchor', lblAnchor).attr('font-size', fs(10)).attr('font-weight', '400')
              .attr('font-family', 'Inter, system-ui, sans-serif').attr('fill', '#9ea7b3')
              .text(s2Sign + Math.round(Math.abs(scope2Mwh)) + ' MWh výroba el.');
            lbl.append('title').text('zemní plyn spotřebovaný na výrobu elektřiny');
          }
        } else {
          svg.append('text')
            .attr('x', M.left - 8).attr('y', labelY)
            .attr('text-anchor', 'end')
            .attr('font-size', fs(10)).attr('fill', laneCfg.colorFn(v))
            .text(laneCfg.labelFn(v));
        }
      });
    }

    // X axis — 5 ticks always including 0, placed just below NÁVRATNOST header (top of chart)
    {
      const tickStep = d3.tickStep(SB_X_DOMAIN[0], SB_X_DOMAIN[1], 4);
      const tickVals = [-2, -1, 0, 1, 2].map(n => n * tickStep)
        .filter(v => v >= SB_X_DOMAIN[0] && v <= SB_X_DOMAIN[1]);
      svg.append('g')
        .attr('class', 'chart-axis')
        .attr('transform', `translate(${M.left},${M.top})`)
        .call(sel => {
          sel.call(d3.axisTop(xScale).tickValues(tickVals).tickFormat(v => {
            const a = Math.abs(v), s = v < 0 ? '−' : v > 0 ? '+' : '';
            if (a >= 1e6) return s + (a / 1e6).toFixed(1) + ' M';
            if (a >= 1e3) return s + Math.round(a / 1e3) + ' tis.';
            return v === 0 ? '0' : s + a;
          }));
          sel.select('.domain').remove();
          sel.selectAll('.tick line').attr('stroke', '#9ea7b3').attr('stroke-width', 1);
          // font-size and fill come from .chart-axis text CSS rule
        });
    }

    // Tooltip
    let sbTip = document.getElementById('sb-tip');
    if (!sbTip) {
      sbTip = document.createElement('div');
      sbTip.id = 'sb-tip';
      Object.assign(sbTip.style, {
        position: 'fixed', pointerEvents: 'none', background: 'rgba(30,30,30,0.88)',
        color: '#fff', fontSize: '12px', lineHeight: '1.5', padding: '6px 10px',
        borderRadius: '4px', whiteSpace: 'pre', display: 'none', zIndex: 9999,
      });
      document.body.appendChild(sbTip);
    }

    const fmtNpv = v => {
      const abs = Math.abs(v), sign = v < 0 ? '− ' : '+ ';
      if (abs >= 1e6) return sign + (Math.round(abs / 1e5) / 10).toFixed(1) + ' mil. Kč';
      if (abs >= 1e3) return sign + Math.round(abs / 1e3) + ' tis. Kč';
      return sign + Math.round(abs) + ' Kč';
    };

    // Violin chart — KDE density shape per lane (drawn behind everything)
    if (sbShowViolin) {
      const bw = (SB_X_DOMAIN[1] - SB_X_DOMAIN[0]) * 0.04; // bandwidth = 4 % of x-range (80 000 Kč)
      const epKernel = (bw) => x => Math.abs(x) <= bw ? 0.75 * (1 - (x/bw) * (x/bw)) / bw : 0;
      const kernel = epKernel(bw);
      const nThresh = 300;
      const thresholds = d3.range(nThresh).map(i =>
        SB_X_DOMAIN[0] + (i / (nThresh - 1)) * (SB_X_DOMAIN[1] - SB_X_DOMAIN[0])
      );

      const laneGroups = laneCfg
        ? laneCfg.lanes.map(v => ({
            cy: M.top + laneCfg.lanes.indexOf(v) * LANE_H + LANE_H / 2,
            npvs: dots.filter(d => laneCfg.laneOf(d) === v).map(d => d.npv),
          }))
        : [{ cy: M.top + LANE_H / 2, npvs: dots.map(d => d.npv) }];

      laneGroups.forEach(({ cy, npvs }) => {
        if (npvs.length < 2) return;
        const density = thresholds.map(t => [t, d3.mean(npvs, d => kernel(t - d))]);
        const maxDensity = d3.max(density, d => d[1]);
        if (!maxDensity) return;

        const halfH  = LANE_H * 0.42;
        const dScale = d3.scaleLinear().domain([0, maxDensity]).range([0, halfH]);

        const area = d3.area()
          .defined(d => d[0] >= SB_X_DOMAIN[0] && d[0] <= SB_X_DOMAIN[1])
          .x(d  => M.left + xScale(d[0]))
          .y0(d => cy - dScale(d[1]))
          .y1(d => cy + dScale(d[1]))
          .curve(d3.curveBasis);

        svg.append('path')
          .datum(density)
          .attr('fill', '#9ea7b3')
          .attr('opacity', 0.28)
          .attr('d', area);

        // Median tick
        const med = d3.median(npvs);
        if (med != null) {
          const mx = M.left + xScale(Math.max(SB_X_DOMAIN[0], Math.min(SB_X_DOMAIN[1], med)));
          svg.append('line')
            .attr('x1', mx).attr('x2', mx)
            .attr('y1', cy - halfH * 0.65).attr('y2', cy + halfH * 0.65)
            .attr('stroke', '#515b66').attr('stroke-width', 1.5)
            .attr('stroke-dasharray', '3 2');
        }
      });
    }

    // Per-dot uncertainty bands (drawn behind circles)
    if (sbShowUncertainty) {
      const bandH = DOT_R * 1.2;
      svg.selectAll('.sb-unc-band')
        .data(dots.filter(d => d.npvLow != null && d.npvHigh != null))
        .join('rect')
        .attr('class', 'sb-unc-band')
        .attr('x',      d => M.left + xScale(Math.max(SB_X_DOMAIN[0], d.npvLow)))
        .attr('width',  d => Math.max(1, xScale(Math.min(SB_X_DOMAIN[1], d.npvHigh)) - xScale(Math.max(SB_X_DOMAIN[0], d.npvLow))))
        .attr('y',      d => yClamp(d, d.y) - bandH / 2)
        .attr('height', bandH)
        .attr('fill',   '#9ea7b3')
        .attr('opacity', d => d.isDefault ? 0.35 : 0.12)
        .attr('rx', 2);
    }

    // Diverging NPV color scale anchored to axis range (SB_X_DOMAIN)
    // Výhodnost (NPV) colour scale — negative end shifts by fuel type of the context
    const sbNpvFill = d => {
      const negColor = /uhlí/i.test(d.cat)  ? '#903156'   // coal → deep rose
                     : /plyn/i.test(d.cat)   ? '#c0392b'   // gas  → warm red
                     : '#8c3f5f';                           // transport / other → default
      return d3.scaleLinear()
        .domain([SB_X_DOMAIN[0], 0, SB_X_DOMAIN[1]])
        .range([negColor, '#e0e0e0', '#006063'])
        .clamp(true)(d.npv);
    };

    const dotFill = d => {
      if (sbColorBy === 'sc')  return SB_SC_COLORS[d.sc] || '#9ea7b3';
      if (sbColorBy === 'cp')  return SB_CP_COLOR_SCALE(d.cp);
      if (sbColorBy === 'dr')  return SB_DR_COLORS[d.dr] || '#9ea7b3';
      if (sbColorBy === 'pf')  return SB_PF_COLORS[d.priceCase] || '#9ea7b3';
      if (sbColorBy === 'npv') return sbNpvFill(d);
      return '#9ea7b3';
    };

    // Draw non-default dots first (behind), then default dots on top
    // In violin mode or solo-default mode only the výchozí dot is shown
    const dotSubsets = (sbShowViolin || sbOnlyDefault)
      ? [dots.filter(d => d.isDefault)]
      : [dots.filter(d => !d.isDefault), dots.filter(d => d.isDefault)];
    dotSubsets.forEach(subset => {
      svg.selectAll(null)
        .data(subset)
        .join('circle')
        .attr('cx', d => Math.max(M.left + DOT_R, Math.min(M.left + chartW - DOT_R, d.x)))
        .attr('cy', d => yClamp(d, d.y))
        .attr('r', d => d.isDefault ? DOT_R + 1 : DOT_R)
        .attr('fill', dotFill)
        .attr('opacity', d => d.isDefault ? 1 : 0.6)
        .attr('stroke', d => d.isDefault ? '#333' : 'none')
        .attr('stroke-width', d => d.isDefault ? 1.2 : 0)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
          d3.select(this).attr('opacity', 1);
          const cpLabel = d.sc === 'NZ' ? 'trajektorie NZ' : d.cp + ' €';
          sbTip.textContent = [
            d.cat,
            'Scénář: ' + SB_SCENARIO_LABEL[d.sc],
            'Cena uhlíku: ' + cpLabel,
            'Diskontní míra: ' + d.dr + ' %',
            'NPV: ' + fmtNpv(d.npv),
          ].join('\n');
          sbTip.style.display = 'block';
          sbTip.style.left = (event.clientX + 14) + 'px';
          sbTip.style.top  = (event.clientY - 28) + 'px';
        })
        .on('mousemove', event => {
          sbTip.style.left = (event.clientX + 14) + 'px';
          sbTip.style.top  = (event.clientY - 28) + 'px';
        })
        .on('mouseout', function(event, d) {
          d3.select(this).attr('opacity', d.isDefault ? 1 : 0.6);
          sbTip.style.display = 'none';
        });
    });

    // NPV labels above referenční dots — always visible
    svg.selectAll(null)
      .data(dots.filter(d => d.isDefault))
      .join('text')
      .attr('x', d => Math.max(M.left + DOT_R, Math.min(M.left + chartW - DOT_R, d.x)))
      .attr('y', d => yClamp(d, d.y) - (DOT_R + 1) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', fs(12))
      .attr('font-weight', '700')
      .attr('font-family', 'Inter, system-ui, sans-serif')
      .attr('fill', '#515b66')
      .text(d => fmtNpv(d.npv));

    addDownloadBar(container, 'sensitivity-beeswarm');

    // Measure-specific footnote
    const noteEl = document.getElementById('sensitivity-beeswarm-note');
    if (noteEl) {
      if (sbSelectedMeasure === 'Střešní fotovoltaika + baterie') {
        noteEl.textContent = 'Poznámka: Cena uhlíku (ETS2) se vztahuje pouze na fosilní sektory, nikoli na ceny elektřiny — pro FVE + baterie proto není zdrojem nejistoty a je fixována na výchozí hodnotě ' + SB_DEFAULT.cp + ' €/t CO₂.';
        noteEl.style.display = '';
      } else {
        noteEl.textContent = '';
        noteEl.style.display = 'none';
      }
    }

    // Context legend: always shown except when grouping BY context (labels are in the chart then)
    const legendEl = document.getElementById('sensitivity-beeswarm-legend');
    if (legendEl) {
      legendEl.innerHTML = '';
      if (sbGrouped !== 'context' && sbGrouped !== 'rdFuel') {
        cats.forEach(cat => {
          const item = document.createElement('div');
          item.className = 'sb-legend-item';
          const swatch = document.createElement('span');
          swatch.style.cssText = `display:inline-block;width:10px;height:10px;border-radius:50%;background:${SB_CAT_COLORS[cat] || '#9ea7b3'};flex-shrink:0;`;
          const label = document.createElement('span');
          label.textContent = cat;
          item.appendChild(swatch);
          item.appendChild(label);
          legendEl.appendChild(item);
        });
      }

      // Uncertainty band toggle
      const uncBtn = document.createElement('button');
      uncBtn.className = 'chart-dl-btn';
      uncBtn.style.cssText = 'align-self:center; margin-left:4px;';
      uncBtn.textContent = sbShowUncertainty ? 'Rozsah ✓' : 'Rozsah';
      uncBtn.addEventListener('click', () => {
        sbShowUncertainty = !sbShowUncertainty;
        sbRenderChart(document.getElementById('sensitivity-beeswarm-chart'));
      });
      legendEl.appendChild(uncBtn);

      // Violin chart toggle
      const violinBtn = document.createElement('button');
      violinBtn.className = 'chart-dl-btn';
      violinBtn.style.cssText = 'align-self:center; margin-left:4px;';
      violinBtn.textContent = sbShowViolin ? 'Housle ✓' : 'Housle';
      violinBtn.addEventListener('click', () => {
        sbShowViolin = !sbShowViolin;
        sbRenderChart(document.getElementById('sensitivity-beeswarm-chart'));
      });
      legendEl.appendChild(violinBtn);

      const defaultBtn = document.createElement('button');
      defaultBtn.className = 'chart-dl-btn';
      defaultBtn.style.cssText = 'align-self:center; margin-left:4px;';
      defaultBtn.textContent = sbOnlyDefault ? 'Výchozí ✓' : 'Výchozí';
      defaultBtn.addEventListener('click', () => {
        sbOnlyDefault = !sbOnlyDefault;
        sbRenderChart(document.getElementById('sensitivity-beeswarm-chart'));
      });
      legendEl.appendChild(defaultBtn);
    }
  }

  function sbInit() {
    const wrap = document.getElementById('sensitivity-beeswarm-wrap');
    if (!wrap) return;

    sbMeasureGroups = sbBuildMeasureGroups();
    // sbEnabledBuildingCats is already initialized as new Set(SB_BUILDING_CATS)
    const allGroups = [...sbMeasureGroups.buildings, ...sbMeasureGroups.transport];
    if (!allGroups.length) return;

    sbSelectedMeasure = allGroups[0].name;
    sbBuildFilters(wrap);

    const chartEl = document.getElementById('sensitivity-beeswarm-chart');
    sbRenderChart(chartEl);

    window.addEventListener('resize', () => {
      const el = document.getElementById('sensitivity-beeswarm-chart');
      if (el) sbRenderChart(el);
    });
  }

  // ── Self-initialize ────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sbInit);
  } else {
    sbInit();
  }
})();
