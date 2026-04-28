(function () {
  'use strict';

  const data = window.COSTS_AND_BENEFITS;
  if (!data) return;

  // ── State ─────────────────────────────────────────────────────────────────
  const state = {
    carbonPrice:  60,
    discountRate:  3,
    fuelScenario: 'CP',
  };

  // ── Formatting ────────────────────────────────────────────────────────────
  const fmtInt = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 });

  function fmtCZK(v) {
    const sign = v < 0 ? '− ' : '+ ';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + (Math.round(abs / 1e5) / 10).toFixed(1) + ' mil. Kč';
    if (abs >= 1e3) return sign + fmtInt.format(Math.round(abs / 1e3))    + ' tis. Kč';
    return sign + fmtInt.format(abs) + ' Kč';
  }

  // ── Controls ──────────────────────────────────────────────────────────────
  function setupControls() {
    setupSlider('carbon-price-slider', 'carbon-price-value', v => {
      state.carbonPrice = v;
      return v + ' €';
    });
    setupSlider('discount-rate-slider', 'discount-rate-value', v => {
      state.discountRate = v;
      return v + ' %';
    });
    const fsSelect = document.getElementById('fuel-scenario-select');
    if (fsSelect) {
      fsSelect.addEventListener('change', () => {
        state.fuelScenario = fsSelect.value;
        renderAll();
      });
    }
  }

  function setupSlider(sliderId, valueId, onUpdate) {
    const slider  = document.getElementById(sliderId);
    const valueEl = document.getElementById(valueId);
    if (!slider || !valueEl) return;
    slider.addEventListener('input', () => {
      valueEl.textContent = onUpdate(+slider.value);
      renderAll();
    });
  }

  // ── Chart constants ───────────────────────────────────────────────────────
  const CP_CHART_MEASURES = [
    'Tepelné čerpadlo',
    'Zateplení + fasáda',
    'Výměna oken a dveří',
    'Elektrický kotel',
    'Kotel na biomasu',
    'Soláry na střeše+baterie',
    'Malý elektromobil',
  ];
  const CP_CHART_COLORS = [
    '#1a7a85', '#2860b4', '#6b4fa0', '#c05a1a',
    '#2e7d32', '#8b6914', '#c0392b',
  ];

  // ── Tornado chart ─────────────────────────────────────────────────────────
  function renderTornadoChart(container, category, param = 'Cena uhlíku') {
    const catField = 'building_category';

    // Three parameter values shown as individual dots
    const paramSteps = param === 'Diskontní míra'
      ? [
          { label: '0 %',  discountRate: 0,                carbonPrice: state.carbonPrice },
          { label: '3 %',  discountRate: 3,                carbonPrice: state.carbonPrice },
          { label: '7 %',  discountRate: 7,                carbonPrice: state.carbonPrice },
        ]
      : [
          { label: '0 €',   discountRate: state.discountRate, carbonPrice: 0   },
          { label: '60 €',  discountRate: state.discountRate, carbonPrice: 60  },
          { label: '200 €', discountRate: state.discountRate, carbonPrice: 200 },
        ];

    const STEP_COLORS = ['#0d4a52', '#1a7a85', '#6ab4bc'];

    const allMeasures = [
      ...(data.buildings_measures || []),
      ...(data.transport_measures  || []),
    ].filter(m =>
      (m.measure_baseline_id || m.measure_baseline) &&
      CP_CHART_MEASURES.includes(m.measure_name) &&
      (!category || m[catField] === category || m.transport_category === category)
    );

    const rows = CP_CHART_MEASURES.map((name, ni) => {
      const entries = allMeasures.filter(m => m.measure_name === name);
      if (!entries.length) return null;

      // Find any entry that computes without error
      const entry = entries.find(m => {
        try {
          const r = CostsBenefits.calculate({
            measureId: m.id, data,
            discountRate:   paramSteps[1].discountRate / 100,
            carbonPriceEur: paramSteps[1].carbonPrice,
            priceScenario:  state.fuelScenario,
          });
          return !isNaN(r.npv);
        } catch (_) { return false; }
      });
      if (!entry) return null;

      // Compute NPV for each of the three parameter steps
      const npvs = paramSteps.map(ps => {
        try {
          const r = CostsBenefits.calculate({
            measureId:      entry.id, data,
            discountRate:   ps.discountRate / 100,
            carbonPriceEur: ps.carbonPrice,
            priceScenario:  state.fuelScenario,
          });
          return isNaN(r.npv) ? null : r.npv;
        } catch (_) { return null; }
      });

      if (npvs.every(v => v == null)) return null;

      return { name, color: CP_CHART_COLORS[ni], npvs };
    }).filter(Boolean);

    if (!rows.length) { container.hidden = true; return; }

    const ROW_H    = 32;
    const LABEL_W  = 200;
    const T_MARGIN = { top: 28, right: 24, bottom: 36, left: 8 };

    const totalW = container.clientWidth || 700;
    const chartW = Math.max(totalW - LABEL_W - T_MARGIN.left - T_MARGIN.right, 120);
    const totalH = rows.length * ROW_H + T_MARGIN.top + T_MARGIN.bottom;

    // X domain across all NPV values
    const allVals = rows.flatMap(r => r.npvs.filter(v => v != null));
    const [xMin, xMax] = d3.extent(allVals);
    const xPad = (xMax - xMin) * 0.06 || 20000;
    const xDomain = d3.scaleLinear().domain([xMin - xPad, xMax + xPad]).nice().domain();
    const xScale  = d3.scaleLinear().domain(xDomain).range([0, chartW]);

    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append('svg').attr('width', totalW).attr('height', totalH);

    const chartOriginX = T_MARGIN.left + LABEL_W;
    const chart = svg.append('g').attr('transform', `translate(${chartOriginX}, 0)`);

    // Zero line
    const zx = xScale(0);
    chart.append('line')
      .attr('x1', zx).attr('x2', zx)
      .attr('y1', T_MARGIN.top).attr('y2', totalH - T_MARGIN.bottom)
      .attr('stroke', '#ccc').attr('stroke-width', 1).attr('stroke-dasharray', '3 3');

    for (let i = 0; i < rows.length; i++) {
      const r    = rows[i];
      const midY = T_MARGIN.top + i * ROW_H + ROW_H / 2;

      // Measure label
      svg.append('text')
        .attr('x', T_MARGIN.left + LABEL_W - 8).attr('y', midY + 4)
        .attr('text-anchor', 'end').attr('font-size', '11px').attr('fill', '#444')
        .text(r.name);

      // Three dots — one per parameter step
      paramSteps.forEach((ps, pi) => {
        const npv = r.npvs[pi];
        if (npv == null) return;
        const dotX = xScale(npv);
        chart.append('circle')
          .attr('cx', dotX).attr('cy', midY)
          .attr('r', 5).attr('fill', STEP_COLORS[pi])
          .attr('stroke', 'white').attr('stroke-width', 1.5);
        // Parameter value label above dot
        chart.append('text')
          .attr('x', dotX).attr('y', midY - 8)
          .attr('text-anchor', 'middle')
          .attr('font-size', '9px').attr('fill', STEP_COLORS[pi])
          .text(ps.label);
      });
    }

    // X axis (NPV in Kč)
    chart.append('g')
      .attr('transform', `translate(0, ${totalH - T_MARGIN.bottom})`)
      .attr('class', 'chart-axis')
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(v => {
        const a = Math.abs(v), s = v < 0 ? '−' : v > 0 ? '+' : '';
        if (a >= 1e6) return s + (a / 1e6).toFixed(1) + ' M';
        if (a >= 1e3) return s + Math.round(a / 1e3) + ' tis.';
        return v === 0 ? '0' : s + a;
      }));

    // Legend — only for carbon price chart (discount rate chart has inline labels)
    if (param !== 'Diskontní míra') {
      const legX = chartW - 120;
      const legY = 8;
      const LEG_DOT_R = 4;
      const DOT_GAP   = 26;

      paramSteps.forEach((ps, pi) => {
        const cx = legX + pi * DOT_GAP;
        chart.append('circle')
          .attr('cx', cx).attr('cy', legY + LEG_DOT_R)
          .attr('r', LEG_DOT_R).attr('fill', STEP_COLORS[pi]);
        chart.append('text')
          .attr('x', cx).attr('y', legY + LEG_DOT_R * 2 + 9)
          .attr('text-anchor', 'middle')
          .attr('font-size', '9px').attr('fill', STEP_COLORS[pi])
          .text(ps.label);
      });
    }
  }

  // ── Quadrant chart ────────────────────────────────────────────────────────
  // X = Rozdíl NPV oproti základní variantě (Kč)
  // Y = Kč / t CO₂  (= −NPV / savedT)
  // One point per measure (each row with measure_baseline_id), colored by sector.

  const Q_COLOR_BUILDINGS = '#2860b4';
  const Q_COLOR_TRANSPORT = '#6b4fa0';
  const Q_ANIM_MS = 450;

  // Filter state — sectors and measure names that are currently visible.
  // measures = null means "not yet initialised"; after first render it's a Set.
  const qFilter = {
    sectors:  new Set(['buildings', 'transport']),
    measures: null,
  };

  // Y-axis mode: 'co2' = total CO₂ saved (t), 'abatement' = abatement cost (Kč/t CO₂)
  let qYMode = 'co2';

  // Build the filter UI (runs once; subsequent calls are no-ops).
  function qBuildFilters(wrap, allPoints) {
    if (wrap.querySelector('.q-filters')) return;

    const measureNames = [];
    for (const p of allPoints) {
      if (!measureNames.includes(p.name)) measureNames.push(p.name);
    }
    if (!qFilter.measures) {
      qFilter.measures = new Set(measureNames);
    }

    const filtersDiv = document.createElement('div');
    filtersDiv.className = 'q-filters';

    // ── Sector row (replaces SVG legend) ───────────────────────────────────
    const sectorRow = document.createElement('div');
    sectorRow.className = 'q-filter-row';

    const sLbl = document.createElement('span');
    sLbl.className = 'q-filter-label';
    sLbl.textContent = 'Sektor:';
    sectorRow.appendChild(sLbl);

    [
      { key: 'buildings', label: 'Budovy',  color: Q_COLOR_BUILDINGS },
      { key: 'transport', label: 'Doprava', color: Q_COLOR_TRANSPORT },
    ].forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'q-filter-btn q-sector-btn' + (qFilter.sectors.has(s.key) ? ' active' : '');
      btn.dataset.sector = s.key;
      btn.innerHTML =
        `<span class="q-filter-dot" style="background:${s.color}"></span>${s.label}`;
      btn.addEventListener('click', () => {
        if (qFilter.sectors.has(s.key)) {
          qFilter.sectors.delete(s.key);
          btn.classList.remove('active');
        } else {
          qFilter.sectors.add(s.key);
          btn.classList.add('active');
        }
        renderAll();
      });
      sectorRow.appendChild(btn);
    });
    filtersDiv.appendChild(sectorRow);

    // ── Measure row ────────────────────────────────────────────────────────
    const measRow = document.createElement('div');
    measRow.className = 'q-filter-row';

    const mLbl = document.createElement('span');
    mLbl.className = 'q-filter-label';
    mLbl.textContent = 'Opatření:';
    measRow.appendChild(mLbl);

    measureNames.forEach(name => {
      const btn = document.createElement('button');
      btn.className = 'q-filter-btn q-measure-btn' + (qFilter.measures.has(name) ? ' active' : '');
      btn.dataset.measureName = name;
      btn.textContent = name;
      btn.addEventListener('click', () => {
        if (qFilter.measures.has(name)) {
          qFilter.measures.delete(name);
          btn.classList.remove('active');
        } else {
          qFilter.measures.add(name);
          btn.classList.add('active');
        }
        renderAll();
      });
      measRow.appendChild(btn);
    });
    filtersDiv.appendChild(measRow);

    // ── Y-axis toggle row ──────────────────────────────────────────────────
    const yRow = document.createElement('div');
    yRow.className = 'q-filter-row';

    const yLbl = document.createElement('span');
    yLbl.className = 'q-filter-label';
    yLbl.textContent = 'Osa Y:';
    yRow.appendChild(yLbl);

    [
      { key: 'co2',       label: 'Úspora CO₂ (t)' },
      { key: 'abatement', label: 'Abatement cost (Kč/t CO₂)' },
    ].forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'q-filter-btn q-ymode-btn' + (qYMode === item.key ? ' active' : '');
      btn.dataset.ymode = item.key;
      btn.textContent = item.label;
      btn.addEventListener('click', () => {
        if (qYMode === item.key) return;
        qYMode = item.key;
        wrap.querySelectorAll('.q-ymode-btn').forEach(b =>
          b.classList.toggle('active', b.dataset.ymode === item.key)
        );
        renderAll();
      });
      yRow.appendChild(btn);
    });
    filtersDiv.appendChild(yRow);

    // Insert before the chart SVG container
    wrap.insertBefore(filtersDiv, wrap.querySelector('.quadrant-chart') || wrap.firstChild);
  }

  // Floating tooltip (single instance, reused)
  const qTip = document.createElement('div');
  Object.assign(qTip.style, {
    position:      'fixed',
    pointerEvents: 'none',
    background:    'rgba(30,30,30,0.88)',
    color:         '#fff',
    borderRadius:  '5px',
    padding:       '5px 9px',
    fontSize:      '13px',
    lineHeight:    '1.45',
    fontFamily:    'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif',
    whiteSpace:    'pre-wrap',
    zIndex:        '9999',
    display:       'none',
    maxWidth:      '280px',
  });
  document.body.appendChild(qTip);

  function showQTip(event, text) {
    qTip.textContent = text;
    qTip.style.display = 'block';
    moveQTip(event);
  }
  function moveQTip(event) {
    const pad = 12;
    const tw  = qTip.offsetWidth, th = qTip.offsetHeight;
    let x = event.clientX + pad, y = event.clientY + pad;
    if (x + tw > window.innerWidth  - 4) x = event.clientX - tw - pad;
    if (y + th > window.innerHeight - 4) y = event.clientY - th - pad;
    qTip.style.left = x + 'px';
    qTip.style.top  = y + 'px';
  }
  function hideQTip() { qTip.style.display = 'none'; }

  // Number formatters
  const qFmtInt = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 });

  function qFmtAxis(v) {
    const a = Math.abs(v), s = v < 0 ? '−' : v > 0 ? '+' : '';
    if (a >= 1e6) return s + (a / 1e6).toFixed(1) + ' M';
    if (a >= 1e3) return s + Math.round(a / 1e3)  + ' tis.';
    return v === 0 ? '0' : s + a;
  }

  function qFmtCZK(v) {
    const sign = v < 0 ? '− ' : '+ ';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + (Math.round(abs / 1e5) / 10).toFixed(1) + ' mil. Kč';
    if (abs >= 1e3) return sign + qFmtInt.format(Math.round(abs / 1e3))    + ' tis. Kč';
    return sign + qFmtInt.format(abs) + ' Kč';
  }

  function qFmt3sig(x) { return parseFloat(x.toPrecision(3)).toString(); }

  function qFmtCZKperT(czk, savedT) {
    if (savedT == null || !savedT || !isFinite(czk / savedT)) return '—';
    const v    = czk / savedT;
    const sign = v < 0 ? '− ' : '+ ';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + qFmt3sig(abs / 1e6) + ' mil. Kč/t CO₂';
    if (abs >= 1e3) return sign + qFmt3sig(abs / 1e3) + ' tis. Kč/t CO₂';
    return sign + qFmt3sig(abs) + ' Kč/t CO₂';
  }

  function qFmtTonnes(t) {
    if (t == null || !isFinite(t)) return '—';
    const sign = t < 0 ? '− ' : '';
    const abs  = Math.abs(t);
    if (abs >= 1) return sign + qFmt3sig(abs) + ' t CO₂';
    return sign + Math.round(abs * 1000) + ' kg CO₂';
  }

  // Stable axis domains: computed once across all parameter combinations so
  // points animate within fixed scales rather than the axes shifting.
  // quadrantDomains.co2 and .abatement each carry an { x, y } pair.
  let quadrantDomains = null;

  function qComputePoints(carbonPrice, discountRatePct, scenario) {
    const all = [
      ...(data.buildings_measures || []),
      ...(data.transport_measures  || []),
    ].filter(m => m.measure_baseline_id);

    const points = [];
    for (const m of all) {
      try {
        const r = CostsBenefits.calculate({
          measureId:      m.id,
          data,
          discountRate:   discountRatePct / 100,
          carbonPriceEur: carbonPrice,
          priceScenario:  scenario,
        });
        const savedT = r.emissionSavings ? -r.emissionSavings.totalT : null;
        if (savedT == null || savedT === 0) continue;
        if (!isFinite(r.npv)) continue;

        // NPV uncertainty range from sensitivity analysis (CAPEX ±30 %, fuel prices ±30 %)
        const sens   = r.sensitivity || [];
        const npvLow  = sens.length ? Math.min(...sens.map(s => s.minNpv)) : r.npv;
        const npvHigh = sens.length ? Math.max(...sens.map(s => s.maxNpv)) : r.npv;

        // savedT uncertainty range across the three fuel-price scenarios
        // (carbon price / discount rate don't affect emission factors)
        const savedTValues = ['CP', 'NZ', 'CP_EC'].map(sc => {
          try {
            const rs = CostsBenefits.calculate({
              measureId:      m.id,
              data,
              discountRate:   discountRatePct / 100,
              carbonPriceEur: carbonPrice,
              priceScenario:  sc,
            });
            const v = rs.emissionSavings ? -rs.emissionSavings.totalT : null;
            return (v !== null && isFinite(v)) ? v : null;
          } catch (_) { return null; }
        }).filter(v => v !== null);
        const savedTLow  = savedTValues.length ? Math.min(...savedTValues) : savedT;
        const savedTHigh = savedTValues.length ? Math.max(...savedTValues) : savedT;

        // Abatement cost = −NPV / savedT (positive = you PAY per tonne, negative = you EARN)
        const kcPerT     = -r.npv   / savedT;
        const kcPerTLow  = -npvHigh / savedT;   // most negative = most beneficial per tonne
        const kcPerTHigh = -npvLow  / savedT;   // most positive = most costly per tonne

        points.push({
          id:        m.id,
          name:      m.measure_name,
          category:  m.building_category || m.transport_category || '',
          sector:    r.sector,
          npv:       r.npv,
          savedT,
          kcPerT,
          npvLow,    npvHigh,
          savedTLow, savedTHigh,
          kcPerTLow, kcPerTHigh,
        });
      } catch (_) { /* skip */ }
    }
    return points;
  }

  function computeQuadrantDomains() {
    const carbonPrices  = [0, 60, 100, 200];
    const discountRates = [0, 3, 7];
    const scenarios     = ['CP', 'NZ', 'CP_EC'];

    const xs = [], yCo2 = [], yAb = [];
    for (const cp of carbonPrices) {
      for (const dr of discountRates) {
        for (const sc of scenarios) {
          for (const p of qComputePoints(cp, dr, sc)) {
            xs.push(p.npv);
            yCo2.push(p.savedT);
            if (isFinite(p.kcPerT)) yAb.push(p.kcPerT);
          }
        }
      }
    }
    if (!xs.length) return {
      co2:       { x: [-500000, 500000], y: [-100, 100] },
      abatement: { x: [-500000, 500000], y: [-50000, 50000] },
    };

    function niceRange(vals, forceZero) {
      const ext  = d3.extent(vals);
      const pad  = (ext[1] - ext[0]) * 0.05 || Math.abs(ext[0]) * 0.05 || 1000;
      const dLow  = forceZero ? Math.min(ext[0] - pad, 0) : ext[0] - pad;
      const dHigh = forceZero ? Math.max(ext[1] + pad, 0) : ext[1] + pad;
      return d3.scaleLinear().domain([dLow, dHigh]).nice().domain();
    }

    const xDomain = niceRange(xs, true);
    return {
      co2:       { x: xDomain, y: niceRange(yCo2, true) },
      abatement: { x: xDomain, y: niceRange(yAb,  true) },
    };
  }

  function renderQuadrantChart(container) {
    if (!quadrantDomains) return;

    // container is #quadrant-wrap; the SVG lives inside #quadrant-chart
    const chartContainer = container.querySelector('.quadrant-chart') || container;

    const allPoints = qComputePoints(state.carbonPrice, state.discountRate, state.fuelScenario);

    // Build filter UI on first call
    qBuildFilters(container, allPoints);

    // Apply active filters
    const points = allPoints.filter(p =>
      qFilter.sectors.has(p.sector) &&
      (qFilter.measures === null || qFilter.measures.has(p.name))
    );

    const isAbatement = qYMode === 'abatement';
    const domain = isAbatement ? quadrantDomains.abatement : quadrantDomains.co2;

    const M = { top: 32, right: 24, bottom: 56, left: 100 };
    const totalW = chartContainer.clientWidth || 720;
    const totalH = 720;
    const chartW = Math.max(totalW - M.left - M.right, 200);
    const chartH = totalH - M.top - M.bottom;

    const xScale = d3.scaleLinear().domain(domain.x).range([0, chartW]);
    // Both modes: high value at top → range [chartH, 0]
    const yScale = d3.scaleLinear().domain(domain.y).range([chartH, 0]);

    let svg = d3.select(chartContainer).select('svg');
    if (svg.empty()) {
      svg = d3.select(chartContainer).append('svg').attr('role', 'img')
        .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');

      svg.append('rect').attr('class', 'q-plot-bg')
        .attr('fill', '#fafbfc').attr('stroke', '#eee').attr('stroke-width', 1);

      svg.append('line').attr('class', 'q-zero-x')
        .attr('stroke', '#aaa').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');
      svg.append('line').attr('class', 'q-zero-y')
        .attr('stroke', '#aaa').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');

      svg.append('g').attr('class', 'chart-axis q-x-axis');
      svg.append('g').attr('class', 'chart-axis q-y-axis');

      svg.append('text').attr('class', 'q-axis-label q-x-label').attr('text-anchor', 'middle');
      svg.append('text').attr('class', 'q-axis-label q-y-label').attr('text-anchor', 'middle');

      svg.append('text').attr('class', 'q-quad-label q-quad-tr').attr('text-anchor', 'end');
      svg.append('text').attr('class', 'q-quad-label q-quad-tl').attr('text-anchor', 'start');
      svg.append('text').attr('class', 'q-quad-label q-quad-br').attr('text-anchor', 'end');
      svg.append('text').attr('class', 'q-quad-label q-quad-bl').attr('text-anchor', 'start');

      svg.append('ellipse').attr('class', 'q-uncertainty')
        .style('pointer-events', 'none')
        .attr('opacity', 0);

      svg.append('g').attr('class', 'q-points');
    }

    svg.attr('width', totalW).attr('height', totalH);

    const ox = M.left, oy = M.top;
    const zx = ox + xScale(0);
    const zy = oy + yScale(0);

    svg.select('.q-plot-bg')
      .attr('x', ox).attr('y', oy)
      .attr('width', chartW).attr('height', chartH);

    svg.select('.q-zero-x')
      .attr('x1', ox).attr('x2', ox + chartW)
      .attr('y1', zy).attr('y2', zy);
    svg.select('.q-zero-y')
      .attr('x1', zx).attr('x2', zx)
      .attr('y1', oy).attr('y2', oy + chartH);

    svg.select('.q-x-axis')
      .attr('transform', `translate(${ox},${oy + chartH})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(qFmtAxis));
    svg.select('.q-y-axis')
      .attr('transform', `translate(${ox},${oy})`)
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(qFmtAxis));

    svg.select('.q-x-label')
      .attr('x', ox + chartW / 2).attr('y', oy + chartH + 42)
      .text('Rozdíl NPV oproti základní variantě (Kč)');
    svg.select('.q-y-label')
      .attr('transform', `translate(${ox - 64},${oy + chartH / 2}) rotate(-90)`)
      .text(isAbatement ? 'Abatement cost (Kč / t CO₂)' : 'Úspora emisí (t CO₂)');

    // Quadrant labels — depend on Y mode.
    // CO₂ mode:       top = more CO₂ saved,      bottom = more CO₂ emitted
    // Abatement mode: top = cheapest abatement,   bottom = most expensive (diagonal)
    const QPAD = 6;
    if (isAbatement) {
      // Y = −NPV/savedT: positive = you PAY per tonne (costly), negative = you EARN per tonne
      // TR: NPV > 0, Y > 0 → savedT < 0 (costs money AND increases emissions — rare)
      svg.select('.q-quad-tr').attr('x', ox + chartW - QPAD).attr('y', oy + 14)
        .text('Ztráta + ↑ emise');
      // TL: NPV < 0, Y > 0 → savedT > 0 (costly decarbonisation — most measures here)
      svg.select('.q-quad-tl').attr('x', ox + QPAD).attr('y', oy + 14)
        .text('Drahá dekarbonizace');
      // BR: NPV > 0, Y < 0 → savedT > 0 (net savings AND CO₂ reduction — win-win)
      svg.select('.q-quad-br').attr('x', ox + chartW - QPAD).attr('y', oy + chartH - QPAD)
        .text('Výhodná dekarbonizace');
      // BL: NPV < 0, Y < 0 → savedT < 0 (costly AND increases emissions — rare)
      svg.select('.q-quad-bl').attr('x', ox + QPAD).attr('y', oy + chartH - QPAD)
        .text('Levné, ale ↑ emise');
    } else {
      svg.select('.q-quad-tr').attr('x', ox + chartW - QPAD).attr('y', oy + 14)
        .text('Win-win: úspora i dekarbonizace');
      svg.select('.q-quad-tl').attr('x', ox + QPAD).attr('y', oy + 14)
        .text('Drahá dekarbonizace');
      svg.select('.q-quad-br').attr('x', ox + chartW - QPAD).attr('y', oy + chartH - QPAD)
        .text('Levné, ale ↑ emise');
      svg.select('.q-quad-bl').attr('x', ox + QPAD).attr('y', oy + chartH - QPAD)
        .text('Ztráta + ↑ emise');
    }

    // Points
    const ptSel = svg.select('.q-points').selectAll('circle.q-pt').data(points, d => d.id);

    const yVal  = d => isAbatement ? d.kcPerT  : d.savedT;
    const yLow  = d => isAbatement ? d.kcPerTLow  : d.savedTLow;
    const yHigh = d => isAbatement ? d.kcPerTHigh : d.savedTHigh;

    const ptEnter = ptSel.enter().append('circle').attr('class', 'q-pt')
      .attr('r', 6)
      .attr('opacity', 0.85)
      .attr('stroke', 'white')
      .attr('stroke-width', 1.5)
      .attr('cx', d => ox + xScale(d.npv))
      .attr('cy', d => oy + yScale(yVal(d)));

    const ptAll = ptSel.merge(ptEnter);

    ptAll
      .attr('fill', d => d.sector === 'buildings' ? Q_COLOR_BUILDINGS : Q_COLOR_TRANSPORT)
      .style('cursor', 'pointer')
      .on('mouseover', function (e, d) {
        d3.select(this).attr('r', 8).attr('opacity', 1);

        // Show uncertainty ellipse
        const cx = ox + xScale(d.npv);
        const cy = oy + yScale(yVal(d));
        const rx = Math.max((xScale(d.npvHigh) - xScale(d.npvLow)) / 2, 4);
        const ry = Math.max(Math.abs(yScale(yHigh(d)) - yScale(yLow(d))) / 2, 4);
        d3.select(this.closest('svg')).select('.q-uncertainty')
          .attr('cx', cx).attr('cy', cy)
          .attr('rx', rx).attr('ry', ry)
          .attr('fill', '#aaa').attr('fill-opacity', 0.12)
          .attr('stroke', '#bbb').attr('stroke-width', 1)
          .attr('stroke-dasharray', '4 3')
          .attr('opacity', 1);

        const lines = isAbatement ? [
          d.name + (d.category ? ' — ' + d.category : ''),
          'NPV: ' + qFmtCZK(d.npv) + '  [' + qFmtCZK(d.npvLow) + ' — ' + qFmtCZK(d.npvHigh) + ']',
          'Abatement cost: ' + qFmtCZKperT(d.npv, d.savedT) + '  [' + qFmtCZKperT(d.npvLow, d.savedT) + ' — ' + qFmtCZKperT(d.npvHigh, d.savedT) + ']',
        ] : [
          d.name + (d.category ? ' — ' + d.category : ''),
          'NPV: ' + qFmtCZK(d.npv) + '  [' + qFmtCZK(d.npvLow) + ' — ' + qFmtCZK(d.npvHigh) + ']',
          'Úspora emisí: ' + qFmtTonnes(d.savedT) + '  [' + qFmtTonnes(d.savedTLow) + ' — ' + qFmtTonnes(d.savedTHigh) + ']',
        ];
        showQTip(e, lines.join('\n'));
      })
      .on('mousemove', moveQTip)
      .on('mouseout', function () {
        d3.select(this).attr('r', 6).attr('opacity', 0.85);
        d3.select(this.closest('svg')).select('.q-uncertainty').attr('opacity', 0);
        hideQTip();
      })
      .transition().duration(Q_ANIM_MS).ease(d3.easeCubicInOut)
      .attr('cx', d => ox + xScale(d.npv))
      .attr('cy', d => oy + yScale(yVal(d)));

    ptSel.exit().remove();
  }

  // ── Static comparison chart (60 € vs 200 €, fixed params) ─────────────────
  function renderStaticComparisonChart(container) {
    if (!quadrantDomains) return;

    const pointsA = qComputePoints(60,  3, 'CP');  // 60 €  — low opacity
    const pointsB = qComputePoints(200, 3, 'CP');  // 200 € — full opacity

    // Pair by measure id
    const pairs = pointsA.map(a => {
      const b = pointsB.find(p => p.id === a.id);
      return b ? { a, b } : null;
    }).filter(Boolean);

    const M      = { top: 32, right: 24, bottom: 56, left: 100 };
    const totalW = container.clientWidth || 720;
    const totalH = 720;
    const chartW = Math.max(totalW - M.left - M.right, 200);
    const chartH = totalH - M.top - M.bottom;
    const ox = M.left, oy = M.top;

    const xScale = d3.scaleLinear().domain(quadrantDomains.co2.x).range([0, chartW]);
    const yScale = d3.scaleLinear().domain(quadrantDomains.co2.y).range([chartH, 0]);

    d3.select(container).selectAll('*').remove();

    const svg = d3.select(container).append('svg')
      .attr('width', totalW).attr('height', totalH)
      .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');

    // Arrowhead marker
    svg.append('defs').append('marker')
      .attr('id', 'sc-arrow')
      .attr('viewBox', '0 -4 8 8')
      .attr('refX', 7).attr('refY', 0)
      .attr('markerWidth', 5).attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path').attr('d', 'M0,-4L8,0L0,4').attr('fill', '#aaa');

    // Background + zero lines
    svg.append('rect')
      .attr('x', ox).attr('y', oy).attr('width', chartW).attr('height', chartH)
      .attr('fill', '#fafbfc').attr('stroke', '#eee').attr('stroke-width', 1);

    const zx = ox + xScale(0), zy = oy + yScale(0);
    svg.append('line')
      .attr('x1', ox).attr('x2', ox + chartW).attr('y1', zy).attr('y2', zy)
      .attr('stroke', '#aaa').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');
    svg.append('line')
      .attr('x1', zx).attr('x2', zx).attr('y1', oy).attr('y2', oy + chartH)
      .attr('stroke', '#aaa').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');

    // Axes
    svg.append('g').attr('class', 'chart-axis')
      .attr('transform', `translate(${ox},${oy + chartH})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(qFmtAxis));
    svg.append('g').attr('class', 'chart-axis')
      .attr('transform', `translate(${ox},${oy})`)
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(qFmtAxis));

    // Axis labels
    svg.append('text').attr('class', 'q-axis-label').attr('text-anchor', 'middle')
      .attr('x', ox + chartW / 2).attr('y', oy + chartH + 42)
      .text('Rozdíl NPV oproti základní variantě (Kč)');
    svg.append('text').attr('class', 'q-axis-label').attr('text-anchor', 'middle')
      .attr('transform', `translate(${ox - 64},${oy + chartH / 2}) rotate(-90)`)
      .text('Úspora emisí (t CO₂)');

    // Quadrant labels
    const QPAD = 6;
    [
      { cls: 'end',   x: ox + chartW - QPAD, y: oy + 14,            text: 'Win-win: úspora i dekarbonizace' },
      { cls: 'start', x: ox + QPAD,          y: oy + 14,            text: 'Drahá dekarbonizace' },
      { cls: 'end',   x: ox + chartW - QPAD, y: oy + chartH - QPAD, text: 'Levné, ale ↑ emise' },
      { cls: 'start', x: ox + QPAD,          y: oy + chartH - QPAD, text: 'Ztráta + ↑ emise' },
    ].forEach(q => {
      svg.append('text').attr('class', 'q-quad-label')
        .attr('text-anchor', q.cls).attr('x', q.x).attr('y', q.y).text(q.text);
    });

    // Legend
    const legG = svg.append('g').attr('transform', `translate(${ox + 8}, ${oy - 22})`);
    [
      { label: '60 € cena uhlíku',  opacity: 0.2, dash: true  },
      { label: '200 € cena uhlíku', opacity: 0.85, dash: false },
    ].forEach((it, i) => {
      const cx = i * 180;
      legG.append('circle').attr('cx', cx).attr('cy', 6).attr('r', 5)
        .attr('fill', '#888').attr('opacity', it.opacity)
        .attr('stroke', 'white').attr('stroke-width', 1.5);
      legG.append('text').attr('class', 'q-legend-text')
        .attr('x', cx + 13).attr('y', 10)
        .attr('font-size', '11px').attr('fill', '#555')
        .text(it.label);
    });

    // Arrows (drawn before dots so dots sit on top)
    const DOT_R = 6;
    pairs.forEach(({ a, b }) => {
      const ax = ox + xScale(a.npv), ay = oy + yScale(a.savedT);
      const bx = ox + xScale(b.npv), by = oy + yScale(b.savedT);
      const dx = bx - ax, dy = by - ay;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < DOT_R * 2 + 2) return; // too short to draw
      const nx = dx / len, ny = dy / len;
      svg.append('line')
        .attr('x1', ax + nx * (DOT_R + 1)).attr('y1', ay + ny * (DOT_R + 1))
        .attr('x2', bx - nx * (DOT_R + 3)).attr('y2', by - ny * (DOT_R + 3))
        .attr('stroke', '#ccc').attr('stroke-width', 1.5)
        .attr('marker-end', 'url(#sc-arrow)');
    });

    // Set A dots — 20 % opacity
    pairs.forEach(({ a }) => {
      svg.append('circle')
        .attr('cx', ox + xScale(a.npv)).attr('cy', oy + yScale(a.savedT))
        .attr('r', DOT_R)
        .attr('fill', a.sector === 'buildings' ? Q_COLOR_BUILDINGS : Q_COLOR_TRANSPORT)
        .attr('opacity', 0.2)
        .attr('stroke', 'white').attr('stroke-width', 1.5);
    });

    // Set B dots — full opacity
    pairs.forEach(({ b }) => {
      svg.append('circle')
        .attr('cx', ox + xScale(b.npv)).attr('cy', oy + yScale(b.savedT))
        .attr('r', DOT_R)
        .attr('fill', b.sector === 'buildings' ? Q_COLOR_BUILDINGS : Q_COLOR_TRANSPORT)
        .attr('opacity', 0.85)
        .attr('stroke', 'white').attr('stroke-width', 1.5);
    });
  }

  // ── MAC curve ─────────────────────────────────────────────────────────────

  // All building categories in display order
  const MAC_BUILDING_CATS = [
    'Rodinný dům uhlí – E',
    'Rodinný dům uhlí – C',
    'Rodinný dům plyn – E',
    'Rodinný dům plyn – C',
    'Byt ve starší zástavbě s vlastním plynovým kotlem',
    'Byt v panelovém domě s plynovou kotelnou',
  ];
  const MAC_CAT_COLORS = {
    'Rodinný dům uhlí – E':                             '#7b4f2e',
    'Rodinný dům uhlí – C':                             '#b07a50',
    'Rodinný dům plyn – E':                             '#c45e00',
    'Rodinný dům plyn – C':                             '#e08c3a',
    'Byt ve starší zástavbě s vlastním plynovým kotlem':'#2e7d5b',
    'Byt v panelovém domě s plynovou kotelnou':         '#1a7a85',
  };

  // Filter state — selected building category (single)
  const macFilter = { category: MAC_BUILDING_CATS[0] };

  function macBuildFilters(wrap) {
    if (wrap.querySelector('.mac-filters')) return;

    const filtersDiv = document.createElement('div');
    filtersDiv.className = 'mac-filters q-filters';

    const row = document.createElement('div');
    row.className = 'q-filter-row';
    const lbl = document.createElement('label');
    lbl.className = 'q-filter-label';
    lbl.textContent = 'Typ budovy:';
    lbl.setAttribute('for', 'mac-cat-select');
    row.appendChild(lbl);

    const sel = document.createElement('select');
    sel.id = 'mac-cat-select';
    sel.className = 'form-select form-select-sm';
    sel.style.cssText = 'width:auto; min-width:200px;';
    MAC_BUILDING_CATS.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      if (cat === macFilter.category) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', () => {
      macFilter.category = sel.value;
      macRenderSVG(wrap);
    });
    row.appendChild(sel);

    filtersDiv.appendChild(row);
    wrap.insertBefore(filtersDiv, wrap.firstChild);
  }

  function macRenderSVG(container) {
    const allPoints = qComputePoints(state.carbonPrice, state.discountRate, state.fuelScenario)
      .filter(p =>
        p.sector === 'buildings' &&
        p.category === macFilter.category &&
        isFinite(p.kcPerT) && isFinite(p.savedT) && p.savedT > 0
      );

    allPoints.sort((a, b) => a.kcPerT - b.kcPerT);

    const M      = { top: 32, right: 24, bottom: 80, left: 90 };
    const totalW = container.clientWidth || 720;
    const totalH = 420;
    const chartW = Math.max(totalW - M.left - M.right, 200);
    const chartH = totalH - M.top - M.bottom;
    const ox = M.left, oy = M.top;

    let cumX = 0;
    const bars = allPoints.map(p => {
      const x0 = cumX;
      cumX += p.savedT;
      return { ...p, x0, x1: cumX };
    });
    const totalSavedT = cumX;

    const xScale = d3.scaleLinear().domain([0, totalSavedT]).range([0, chartW]);
    const yMin = Math.min(0, ...bars.map(b => b.kcPerTLow));
    const yMax = Math.max(0, ...bars.map(b => b.kcPerTHigh));
    const yPad = (yMax - yMin) * 0.12 || 1000;
    const yScale = d3.scaleLinear()
      .domain([yMin - yPad, yMax + yPad])
      .range([chartH, 0]);

    // Remove old SVG only
    d3.select(container).select('svg').remove();

    const svg = d3.select(container).append('svg')
      .attr('width', totalW).attr('height', totalH)
      .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');

    svg.append('rect')
      .attr('x', ox).attr('y', oy).attr('width', chartW).attr('height', chartH)
      .attr('fill', '#fafbfc').attr('stroke', '#eee').attr('stroke-width', 1);

    const zy = oy + yScale(0);
    svg.append('line')
      .attr('x1', ox).attr('x2', ox + chartW).attr('y1', zy).attr('y2', zy)
      .attr('stroke', '#888').attr('stroke-width', 1);

    svg.append('g').attr('class', 'chart-axis')
      .attr('transform', `translate(${ox},${oy + chartH})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(v => {
        if (Math.abs(v) >= 1000) return (v / 1000).toFixed(0) + ' kt';
        return v.toFixed(0) + ' t';
      }));
    svg.append('g').attr('class', 'chart-axis')
      .attr('transform', `translate(${ox},${oy})`)
      .call(d3.axisLeft(yScale).ticks(6).tickFormat(v => {
        const abs = Math.abs(v);
        if (abs >= 1e6) return (v / 1e6).toFixed(1) + ' M';
        if (abs >= 1e3) return (v / 1e3).toFixed(0) + ' tis.';
        return v.toFixed(0);
      }));

    svg.append('text').attr('class', 'q-axis-label').attr('text-anchor', 'middle')
      .attr('x', ox + chartW / 2).attr('y', oy + chartH + 52)
      .text('Kumulativní úspora emisí (t CO₂)');
    svg.append('text').attr('class', 'q-axis-label').attr('text-anchor', 'middle')
      .attr('transform', `translate(${ox - 64},${oy + chartH / 2}) rotate(-90)`)
      .text('Abatement cost (Kč / t CO₂)');

    // Shared tooltip element
    let macTip = document.getElementById('mac-tip');
    if (!macTip) {
      macTip = document.createElement('div');
      macTip.id = 'mac-tip';
      Object.assign(macTip.style, {
        position: 'fixed', pointerEvents: 'none', background: 'rgba(30,30,30,0.88)',
        color: '#fff', fontSize: '12px', lineHeight: '1.5', padding: '6px 10px',
        borderRadius: '4px', whiteSpace: 'pre', display: 'none', zIndex: 9999,
      });
      document.body.appendChild(macTip);
    }

    const fmtKcT = v => {
      const abs = Math.abs(v), sign = v < 0 ? '− ' : '+ ';
      if (abs >= 1e6) return sign + (abs / 1e6).toFixed(2) + ' M Kč/t';
      if (abs >= 1e3) return sign + (abs / 1e3).toFixed(0) + ' tis. Kč/t';
      return sign + Math.round(abs) + ' Kč/t';
    };
    const fmtT = v => Math.abs(v) >= 1000 ? (v / 1000).toFixed(1) + ' kt' : Math.round(v) + ' t';

    const barsG = svg.append('g');
    bars.forEach(b => {
      const color = MAC_CAT_COLORS[b.category] || Q_COLOR_BUILDINGS;
      const bx = ox + xScale(b.x0);
      const bw = Math.max(xScale(b.x1) - xScale(b.x0) - 1, 1);

      // Uncertainty whisker
      const wx = bx + bw / 2;
      const wTop    = oy + yScale(b.kcPerTHigh);
      const wBottom = oy + yScale(b.kcPerTLow);
      barsG.append('line')
        .attr('x1', wx).attr('x2', wx).attr('y1', wTop).attr('y2', wBottom)
        .attr('stroke', color).attr('stroke-width', 1.5).attr('opacity', 0.35);
      [[wTop], [wBottom]].forEach(([wy]) => {
        barsG.append('line')
          .attr('x1', wx - 3).attr('x2', wx + 3).attr('y1', wy).attr('y2', wy)
          .attr('stroke', color).attr('stroke-width', 1.5).attr('opacity', 0.35);
      });

      // Bar
      const barTop = oy + yScale(Math.max(b.kcPerT, 0));
      const barH   = Math.max(Math.abs(oy + yScale(Math.min(b.kcPerT, 0)) - barTop), 1);
      barsG.append('rect')
        .attr('x', bx).attr('y', barTop).attr('width', bw).attr('height', barH)
        .attr('fill', color).attr('opacity', 0.75)
        .attr('stroke', color).attr('stroke-width', 0.5)
        .style('cursor', 'pointer')
        .on('mouseover', function (e) {
          d3.select(this).attr('opacity', 1);
          macTip.textContent = [
            b.name + ' — ' + b.category,
            'Abatement cost: ' + fmtKcT(b.kcPerT) + '  [' + fmtKcT(b.kcPerTLow) + ' — ' + fmtKcT(b.kcPerTHigh) + ']',
            'Úspora CO₂: ' + fmtT(b.savedT),
          ].join('\n');
          macTip.style.display = 'block';
          macTip.style.left = (e.clientX + 14) + 'px';
          macTip.style.top  = (e.clientY - 28) + 'px';
        })
        .on('mousemove', e => {
          macTip.style.left = (e.clientX + 14) + 'px';
          macTip.style.top  = (e.clientY - 28) + 'px';
        })
        .on('mouseout', function () {
          d3.select(this).attr('opacity', 0.75);
          macTip.style.display = 'none';
        });

      // Rotated label — only if bar wide enough
      if (bw > 20) {
        const shortName = b.name.length > 22 ? b.name.slice(0, 20) + '…' : b.name;
        const labelY = b.kcPerT >= 0 ? barTop - 4 : barTop + barH + 4;
        const anchor = b.kcPerT >= 0 ? 'end' : 'start';
        barsG.append('text')
          .attr('transform', `translate(${bx + bw / 2},${labelY}) rotate(-60)`)
          .attr('text-anchor', anchor)
          .attr('font-size', '9px').attr('fill', '#666')
          .style('pointer-events', 'none')
          .text(shortName);
      }
    });
  }

  function renderMACChart(container) {
    macBuildFilters(container);
    macRenderSVG(container);
  }

  // ── Render all charts on the page ─────────────────────────────────────────
  function renderAll() {
    document.querySelectorAll('.tornado-chart[data-category]').forEach(el => {
      renderTornadoChart(el, el.dataset.category, el.dataset.param || 'Cena uhlíku');
    });
    const qEl = document.getElementById('quadrant-wrap');
    if (qEl) renderQuadrantChart(qEl);
    const macEl = document.getElementById('mac-chart');
    if (macEl) {
      macBuildFilters(macEl); // no-op after first call
      macRenderSVG(macEl);
    }
    // Re-render static chart on resize if visible
    const scEl = document.getElementById('static-comparison-chart');
    if (scEl && !scEl.hidden) renderStaticComparisonChart(scEl);
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    if (document.getElementById('quadrant-wrap')) {
      quadrantDomains = computeQuadrantDomains();
    }

    // Toggle for static comparison chart
    const toggleBtn = document.getElementById('static-chart-toggle');
    const staticEl  = document.getElementById('static-comparison-chart');
    if (toggleBtn && staticEl) {
      toggleBtn.addEventListener('click', () => {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', String(!expanded));
        staticEl.hidden = expanded;
        if (!expanded) renderStaticComparisonChart(staticEl);
      });
    }

    setupControls();
    renderAll();
    window.addEventListener('resize', renderAll);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
