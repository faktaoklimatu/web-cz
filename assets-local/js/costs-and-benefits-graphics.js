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
    const fsSelect       = document.getElementById('fuel-scenario-select');
    const cpSlider       = document.getElementById('carbon-price-slider');
    const cpValueEl      = document.getElementById('carbon-price-value');
    const cpControlGroup = cpSlider && cpSlider.closest('.control-group');

    function applyFuelScenario(scenario) {
      state.fuelScenario = scenario;
      const isNZ = scenario === 'NZ';
      if (cpSlider) {
        cpSlider.disabled = isNZ;
        if (cpControlGroup) cpControlGroup.classList.toggle('control-group--disabled', isNZ);
      }
      if (isNZ && cpValueEl) cpValueEl.textContent = 'trajektorie NZ';
      else if (!isNZ && cpValueEl) cpValueEl.textContent = state.carbonPrice + ' €';
    }

    if (fsSelect) {
      fsSelect.addEventListener('change', () => {
        applyFuelScenario(fsSelect.value);
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
    'Malý hybrid',
    'Velký elektromobil',
    'Velký hybrid',
  ];
  const CP_CHART_COLORS = [
    '#1a7a85', '#2860b4', '#6b4fa0', '#c05a1a',
    '#2e7d32', '#8b6914', '#c0392b',
    '#e67e22', '#16a085', '#8e44ad',
  ];

  // ── Tornado chart ─────────────────────────────────────────────────────────
  //
  // Cena uhlíku:  band spanning NPV at 0 € → 200 €; dot at current carbon price.
  // Diskontní míra: three coloured dots at 0 %, 3 % and 7 % (no band).

  function renderTornadoChart(container, category, param = 'Cena uhlíku', exclude = [], forceDomain = null) {
    const catField = 'building_category';

    const allMeasures = [
      ...(data.buildings_measures || []),
      ...(data.transport_measures  || []),
    ].filter(m =>
      (m.measure_baseline_id || m.measure_baseline) &&
      CP_CHART_MEASURES.includes(m.measure_name) &&
      (!category || m[catField] === category || m.transport_category === category)
    );

    function calcNpv(entry, cp, dr) {
      try {
        const r = CostsBenefits.calculate({
          measureId:      entry.id, data,
          discountRate:   dr / 100,
          carbonPriceEur: cp,
          priceScenario:  state.fuelScenario,
        });
        return isNaN(r.npv) ? null : r.npv;
      } catch (_) { return null; }
    }

    function findEntry(entries, cp, dr) {
      return entries.find(m => {
        try {
          const r = CostsBenefits.calculate({
            measureId: m.id, data,
            discountRate: dr / 100, carbonPriceEur: cp,
            priceScenario: state.fuelScenario,
          });
          return !isNaN(r.npv);
        } catch (_) { return false; }
      });
    }

    if (param === 'Diskontní míra') {
      // ── Three-dot variant ──────────────────────────────────────────────────
      const STEP_COLORS  = ['#0d4a52', '#1a7a85', '#6ab4bc'];
      const STEP_RATES   = [0, 3, 7];
      const STEP_LABELS  = ['0 %', '3 %', '7 %'];

      const rows = CP_CHART_MEASURES.map((name, ni) => {
        if (exclude.includes(name)) return null;
        const entries = allMeasures.filter(m => m.measure_name === name);
        if (!entries.length) return null;
        const entry = findEntry(entries, state.carbonPrice, 3);
        if (!entry) return null;
        const npvs = STEP_RATES.map(dr => calcNpv(entry, state.carbonPrice, dr));
        if (npvs.every(v => v == null)) return null;
        return { name, npvs };
      }).filter(Boolean);

      if (!rows.length) { container.hidden = true; return; }

      const ROW_H    = 32;
      const LABEL_W  = 200;
      const T_MARGIN = { top: 20, right: 24, bottom: 36, left: 8 };
      const totalW   = container.clientWidth || 700;
      const chartW   = Math.max(totalW - LABEL_W - T_MARGIN.left - T_MARGIN.right, 120);
      const totalH   = rows.length * ROW_H + T_MARGIN.top + T_MARGIN.bottom;

      const allVals  = rows.flatMap(r => r.npvs.filter(v => v != null));
      const [xMin, xMax] = d3.extent(allVals);
      const xPad  = (xMax - xMin) * 0.06 || 20000;
      const xDomain = forceDomain || d3.scaleLinear().domain([xMin - xPad, xMax + xPad]).nice().domain();
      const xScale = d3.scaleLinear().domain(xDomain).range([0, chartW]);

      d3.select(container).selectAll('*').remove();
      const svg   = d3.select(container).append('svg').attr('width', totalW).attr('height', totalH);
      const chart = svg.append('g').attr('transform', `translate(${T_MARGIN.left + LABEL_W}, 0)`);

      const zx = xScale(0);
      chart.append('line')
        .attr('x1', zx).attr('x2', zx)
        .attr('y1', T_MARGIN.top).attr('y2', totalH - T_MARGIN.bottom)
        .attr('stroke', '#ccc').attr('stroke-width', 1).attr('stroke-dasharray', '3 3');

      for (let i = 0; i < rows.length; i++) {
        const r    = rows[i];
        const midY = T_MARGIN.top + i * ROW_H + ROW_H / 2;

        svg.append('text')
          .attr('x', T_MARGIN.left + LABEL_W - 8).attr('y', midY + 4)
          .attr('text-anchor', 'end').attr('font-size', '11px').attr('fill', '#444')
          .text(r.name);

        STEP_RATES.forEach((dr, pi) => {
          const npv = r.npvs[pi];
          if (npv == null) return;
          const dotX = xScale(npv);
          chart.append('circle')
            .attr('cx', dotX).attr('cy', midY)
            .attr('r', 5).attr('fill', STEP_COLORS[pi])
            .attr('stroke', 'white').attr('stroke-width', 1.5);
          chart.append('text')
            .attr('x', dotX).attr('y', midY - 8)
            .attr('text-anchor', 'middle')
            .attr('font-size', '9px').attr('fill', STEP_COLORS[pi])
            .text(STEP_LABELS[pi]);
        });
      }

      chart.append('g')
        .attr('transform', `translate(0, ${totalH - T_MARGIN.bottom})`)
        .attr('class', 'chart-axis')
        .call(d3.axisBottom(xScale).ticks(5).tickFormat(v => {
          const a = Math.abs(v), s = v < 0 ? '−' : v > 0 ? '+' : '';
          if (a >= 1e6) return s + (a / 1e6).toFixed(1) + ' M';
          if (a >= 1e3) return s + Math.round(a / 1e3) + ' tis.';
          return v === 0 ? '0' : s + a;
        }));

    } else {
      // ── Band + dot variant (Cena uhlíku) ──────────────────────────────────
      const rows = CP_CHART_MEASURES.map((name, ni) => {
        if (exclude.includes(name)) return null;
        const entries = allMeasures.filter(m => m.measure_name === name);
        if (!entries.length) return null;
        const entry = findEntry(entries, 100, state.discountRate);
        if (!entry) return null;

        const dr = state.discountRate;
        const npvAtMin   = calcNpv(entry, 0,   dr);
        const npvAtMax   = calcNpv(entry, 200, dr);
        const npvCurrent = calcNpv(entry, state.carbonPrice, dr);
        if (npvCurrent == null) return null;

        return { name, color: CP_CHART_COLORS[ni], npvAtMin, npvAtMax, npvCurrent };
      }).filter(Boolean);

      if (!rows.length) { container.hidden = true; return; }

      const ROW_H    = 32;
      const LABEL_W  = 200;
      const T_MARGIN = { top: 34, right: 24, bottom: 36, left: 8 };
      const totalW   = container.clientWidth || 700;
      const chartW   = Math.max(totalW - LABEL_W - T_MARGIN.left - T_MARGIN.right, 120);
      const totalH   = rows.length * ROW_H + T_MARGIN.top + T_MARGIN.bottom;

      const allVals = rows.flatMap(r =>
        [r.npvAtMin, r.npvAtMax, r.npvCurrent].filter(v => v != null)
      );
      const [xMin, xMax] = d3.extent(allVals);
      const xPad  = (xMax - xMin) * 0.06 || 20000;
      const xDomain = forceDomain || d3.scaleLinear().domain([xMin - xPad, xMax + xPad]).nice().domain();
      const xScale = d3.scaleLinear().domain(xDomain).range([0, chartW]);

      d3.select(container).selectAll('*').remove();
      const svg   = d3.select(container).append('svg').attr('width', totalW).attr('height', totalH);
      const chart = svg.append('g').attr('transform', `translate(${T_MARGIN.left + LABEL_W}, 0)`);

      const zx = xScale(0);
      chart.append('line')
        .attr('x1', zx).attr('x2', zx)
        .attr('y1', T_MARGIN.top).attr('y2', totalH - T_MARGIN.bottom)
        .attr('stroke', '#ccc').attr('stroke-width', 1).attr('stroke-dasharray', '3 3');

      for (let i = 0; i < rows.length; i++) {
        const r    = rows[i];
        const midY = T_MARGIN.top + i * ROW_H + ROW_H / 2;
        const barH = ROW_H * 0.38;

        svg.append('text')
          .attr('x', T_MARGIN.left + LABEL_W - 8).attr('y', midY + 4)
          .attr('text-anchor', 'end').attr('font-size', '11px').attr('fill', '#444')
          .text(r.name);

        if (r.npvAtMin != null && r.npvAtMax != null) {
          const x1 = xScale(r.npvAtMin);
          const x2 = xScale(r.npvAtMax);
          chart.append('rect')
            .attr('x', Math.min(x1, x2)).attr('y', midY - barH / 2)
            .attr('width', Math.max(Math.abs(x2 - x1), 1)).attr('height', barH)
            .attr('fill', r.color).attr('opacity', 0.25).attr('rx', 3);
        }

        const dotX = xScale(r.npvCurrent);
        chart.append('circle')
          .attr('cx', dotX).attr('cy', midY)
          .attr('r', 5).attr('fill', r.color)
          .attr('stroke', 'white').attr('stroke-width', 1.5);
      }

      chart.append('g')
        .attr('transform', `translate(0, ${totalH - T_MARGIN.bottom})`)
        .attr('class', 'chart-axis')
        .call(d3.axisBottom(xScale).ticks(5).tickFormat(v => {
          const a = Math.abs(v), s = v < 0 ? '−' : v > 0 ? '+' : '';
          if (a >= 1e6) return s + (a / 1e6).toFixed(1) + ' M';
          if (a >= 1e3) return s + Math.round(a / 1e3) + ' tis.';
          return v === 0 ? '0' : s + a;
        }));

      // Legend
      const BAND_W = 60, BAND_H = 10, DOT_R = 4;
      const legY = 8, legX = chartW - BAND_W - 100;

      chart.append('rect')
        .attr('x', legX).attr('y', legY)
        .attr('width', BAND_W).attr('height', BAND_H)
        .attr('fill', '#999').attr('opacity', 0.25).attr('rx', 2);
      chart.append('circle')
        .attr('cx', legX + BAND_W / 2).attr('cy', legY + BAND_H / 2)
        .attr('r', DOT_R).attr('fill', '#888')
        .attr('stroke', 'white').attr('stroke-width', 1.5);
      chart.append('text')
        .attr('x', legX).attr('y', legY - 2)
        .attr('font-size', '9px').attr('fill', '#aaa').text('0 €');
      chart.append('text')
        .attr('x', legX + BAND_W).attr('y', legY - 2)
        .attr('text-anchor', 'end').attr('font-size', '9px').attr('fill', '#aaa').text('200 €');
      chart.append('text')
        .attr('x', legX + BAND_W / 2).attr('y', legY + BAND_H + 9)
        .attr('text-anchor', 'middle').attr('font-size', '9px').attr('fill', '#888').text('NPV');
    }
  }
  // ── Multi-category tornado chart ──────────────────────────────────────────
  // Renders several category groups in one SVG with a shared x-axis.
  // categories: array of category strings, e.g. ['Nové malé', 'Ojeté malé']
  function renderMultiTornadoChart(container, categories, param = 'Cena uhlíku', exclude = [], forceDomain = null) {
    const isDiscountRate = param === 'Diskontní míra';
    const STEP_COLORS  = ['#0d4a52', '#1a7a85', '#6ab4bc'];
    const STEP_RATES   = [0, 3, 7];
    const STEP_LABELS  = ['0 %', '3 %', '7 %'];

    function calcNpv(entry, cp, dr) {
      try {
        const r = CostsBenefits.calculate({
          measureId: entry.id, data,
          discountRate: dr / 100, carbonPriceEur: cp,
          priceScenario: state.fuelScenario,
        });
        return isNaN(r.npv) ? null : r.npv;
      } catch (_) { return null; }
    }

    function findEntry(entries, cp, dr) {
      return entries.find(m => {
        try {
          const r = CostsBenefits.calculate({
            measureId: m.id, data,
            discountRate: dr / 100, carbonPriceEur: cp,
            priceScenario: state.fuelScenario,
          });
          return !isNaN(r.npv);
        } catch (_) { return false; }
      });
    }

    // Build rows for each category group
    const groups = categories.map(category => {
      const allMeasures = [
        ...(data.buildings_measures || []),
        ...(data.transport_measures  || []),
      ].filter(m =>
        (m.measure_baseline_id || m.measure_baseline) &&
        CP_CHART_MEASURES.includes(m.measure_name) &&
        (!category || m.building_category === category || m.transport_category === category)
      );

      const rows = CP_CHART_MEASURES.map((name, ni) => {
        if (exclude.includes(name)) return null;
        const entries = allMeasures.filter(m => m.measure_name === name);
        if (!entries.length) return null;

        if (isDiscountRate) {
          const entry = findEntry(entries, state.carbonPrice, 3);
          if (!entry) return null;
          const npvs = STEP_RATES.map(dr => calcNpv(entry, state.carbonPrice, dr));
          if (npvs.every(v => v == null)) return null;
          return { name, color: CP_CHART_COLORS[ni], npvs };
        } else {
          const entry = findEntry(entries, 100, state.discountRate);
          if (!entry) return null;
          const dr = state.discountRate;
          const npvAtMin   = calcNpv(entry, 0,   dr);
          const npvAtMax   = calcNpv(entry, 200, dr);
          const npvCurrent = calcNpv(entry, state.carbonPrice, dr);
          if (npvCurrent == null) return null;
          return { name, color: CP_CHART_COLORS[ni], npvAtMin, npvAtMax, npvCurrent };
        }
      }).filter(Boolean);

      return { category, rows };
    }).filter(g => g.rows.length > 0);

    if (!groups.length) { container.hidden = true; return; }

    const ROW_H          = 32;
    const GROUP_HEADER_H = 22;
    const GROUP_GAP      = 12;
    const LABEL_W        = 200;
    const T_MARGIN       = { top: isDiscountRate ? 20 : 34, right: 24, bottom: 36, left: 8 };

    const totalW  = container.clientWidth || 700;
    const chartW  = Math.max(totalW - LABEL_W - T_MARGIN.left - T_MARGIN.right, 120);
    const totalH  = groups.reduce((h, g) => h + GROUP_HEADER_H + g.rows.length * ROW_H, 0)
                  + (groups.length - 1) * GROUP_GAP
                  + T_MARGIN.top + T_MARGIN.bottom;

    // Shared x-domain
    const allVals = groups.flatMap(g => g.rows.flatMap(r =>
      isDiscountRate
        ? r.npvs.filter(v => v != null)
        : [r.npvAtMin, r.npvAtMax, r.npvCurrent].filter(v => v != null)
    ));
    const [xMin, xMax] = d3.extent(allVals);
    const xPad  = (xMax - xMin) * 0.06 || 20000;
    const xDomain = forceDomain || d3.scaleLinear().domain([xMin - xPad, xMax + xPad]).nice().domain();
    const xScale = d3.scaleLinear().domain(xDomain).range([0, chartW]);

    d3.select(container).selectAll('*').remove();
    const svg   = d3.select(container).append('svg').attr('width', totalW).attr('height', totalH);
    const chart = svg.append('g').attr('transform', `translate(${T_MARGIN.left + LABEL_W}, 0)`);

    // Zero line (full chart height)
    const zx = xScale(0);
    chart.append('line')
      .attr('x1', zx).attr('x2', zx)
      .attr('y1', T_MARGIN.top).attr('y2', totalH - T_MARGIN.bottom)
      .attr('stroke', '#ccc').attr('stroke-width', 1).attr('stroke-dasharray', '3 3');

    // Legend for carbon price chart (top-right, drawn once)
    if (!isDiscountRate) {
      const BAND_W = 60, BAND_H = 10, DOT_R = 4;
      const legY = 8, legX = chartW - BAND_W - 100;
      chart.append('rect')
        .attr('x', legX).attr('y', legY)
        .attr('width', BAND_W).attr('height', BAND_H)
        .attr('fill', '#999').attr('opacity', 0.25).attr('rx', 2);
      chart.append('circle')
        .attr('cx', legX + BAND_W / 2).attr('cy', legY + BAND_H / 2)
        .attr('r', DOT_R).attr('fill', '#888').attr('stroke', 'white').attr('stroke-width', 1.5);
      chart.append('text')
        .attr('x', legX).attr('y', legY - 2)
        .attr('font-size', '9px').attr('fill', '#aaa').text('0 €');
      chart.append('text')
        .attr('x', legX + BAND_W).attr('y', legY - 2)
        .attr('text-anchor', 'end').attr('font-size', '9px').attr('fill', '#aaa').text('200 €');
      chart.append('text')
        .attr('x', legX + BAND_W / 2).attr('y', legY + BAND_H + 9)
        .attr('text-anchor', 'middle').attr('font-size', '9px').attr('fill', '#888').text('NPV');
    }

    let currentY = T_MARGIN.top;

    for (let gi = 0; gi < groups.length; gi++) {
      const group = groups[gi];

      // Category header label
      svg.append('text')
        .attr('x', T_MARGIN.left + 4).attr('y', currentY + 15)
        .attr('font-size', '11px').attr('font-weight', '700').attr('fill', '#555')
        .text(group.category.toUpperCase());
      currentY += GROUP_HEADER_H;

      for (const r of group.rows) {
        const midY = currentY + ROW_H / 2;
        const barH = ROW_H * 0.38;

        // Measure label
        svg.append('text')
          .attr('x', T_MARGIN.left + LABEL_W - 8).attr('y', midY + 4)
          .attr('text-anchor', 'end').attr('font-size', '11px').attr('fill', '#444')
          .text(r.name);

        if (isDiscountRate) {
          STEP_RATES.forEach((dr, pi) => {
            const npv = r.npvs[pi];
            if (npv == null) return;
            const dotX = xScale(npv);
            chart.append('circle')
              .attr('cx', dotX).attr('cy', midY)
              .attr('r', 5).attr('fill', STEP_COLORS[pi])
              .attr('stroke', 'white').attr('stroke-width', 1.5);
            chart.append('text')
              .attr('x', dotX).attr('y', midY - 8)
              .attr('text-anchor', 'middle')
              .attr('font-size', '9px').attr('fill', STEP_COLORS[pi])
              .text(STEP_LABELS[pi]);
          });
        } else {
          if (r.npvAtMin != null && r.npvAtMax != null) {
            const x1 = xScale(r.npvAtMin), x2 = xScale(r.npvAtMax);
            chart.append('rect')
              .attr('x', Math.min(x1, x2)).attr('y', midY - barH / 2)
              .attr('width', Math.max(Math.abs(x2 - x1), 1)).attr('height', barH)
              .attr('fill', r.color).attr('opacity', 0.25).attr('rx', 3);
          }
          const dotX = xScale(r.npvCurrent);
          chart.append('circle')
            .attr('cx', dotX).attr('cy', midY)
            .attr('r', 5).attr('fill', r.color)
            .attr('stroke', 'white').attr('stroke-width', 1.5);
        }

        currentY += ROW_H;
      }

      if (gi < groups.length - 1) currentY += GROUP_GAP;
    }

    // X axis
    chart.append('g')
      .attr('transform', `translate(0, ${totalH - T_MARGIN.bottom})`)
      .attr('class', 'chart-axis')
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(v => {
        const a = Math.abs(v), s = v < 0 ? '−' : v > 0 ? '+' : '';
        if (a >= 1e6) return s + (a / 1e6).toFixed(1) + ' M';
        if (a >= 1e3) return s + Math.round(a / 1e3) + ' tis.';
        return v === 0 ? '0' : s + a;
      }));
  }

  // ── Quadrant chart ────────────────────────────────────────────────────────
  // X = Rozdíl NPV oproti základní variantě (Kč)
  // Y = Kč / t CO₂  (= −NPV / savedT)
  // One point per measure (each row with measure_baseline_id), colored by sector.

  const Q_COLOR_BUILDINGS = '#2860b4';
  const Q_COLOR_TRANSPORT = '#6b4fa0';
  const Q_ANIM_MS = 450;

  // Quadrant colours (dot fill, keyed by TR/TL/BR/BL)
  const Q_DOT_COLORS = { tr: '#1f8c47', tl: '#c43535', br: '#1a72b8', bl: '#8b35b0' };
  function qQuadrantColor(npv, yVal) {
    if (npv >= 0) return yVal >= 0 ? Q_DOT_COLORS.tr : Q_DOT_COLORS.br;
    return yVal >= 0 ? Q_DOT_COLORS.tl : Q_DOT_COLORS.bl;
  }

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
          capexPerT: r.emissionSavings ? r.emissionSavings.perCapexDiff : null,
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

      svg.append('rect').attr('class', 'q-quad-bg q-quad-bg-tr').attr('fill', 'rgba(40,160,80,0.07)');
      svg.append('rect').attr('class', 'q-quad-bg q-quad-bg-tl').attr('fill', 'rgba(200,80,80,0.07)');
      svg.append('rect').attr('class', 'q-quad-bg q-quad-bg-br').attr('fill', 'rgba(80,160,220,0.07)');
      svg.append('rect').attr('class', 'q-quad-bg q-quad-bg-bl').attr('fill', 'rgba(180,100,200,0.07)');

      svg.append('line').attr('class', 'q-zero-x')
        .attr('stroke', '#aaa').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');
      svg.append('line').attr('class', 'q-zero-y')
        .attr('stroke', '#aaa').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');

      svg.append('g').attr('class', 'chart-axis q-x-axis');
      svg.append('g').attr('class', 'chart-axis q-y-axis');

      svg.append('text').attr('class', 'q-axis-label q-x-label').attr('text-anchor', 'middle');
      svg.append('text').attr('class', 'q-axis-label q-y-label').attr('text-anchor', 'middle');

      svg.append('text').attr('class', 'q-quad-label q-quad-tr').attr('text-anchor', 'end')
        .attr('font-size', '12px').attr('font-weight', '600').attr('fill', '#145c2a');
      svg.append('text').attr('class', 'q-quad-label q-quad-tl').attr('text-anchor', 'start')
        .attr('font-size', '12px').attr('font-weight', '600').attr('fill', '#7a1010');
      svg.append('text').attr('class', 'q-quad-label q-quad-br').attr('text-anchor', 'end')
        .attr('font-size', '12px').attr('font-weight', '600').attr('fill', '#0d3d70');
      svg.append('text').attr('class', 'q-quad-label q-quad-bl').attr('text-anchor', 'start')
        .attr('font-size', '12px').attr('font-weight', '600').attr('fill', '#4d1066');

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

    // Quadrant background fills — sized by where the zero axes cross
    const qzx = Math.max(ox, Math.min(ox + chartW, zx)); // clamped zero x
    const qzy = Math.max(oy, Math.min(oy + chartH, zy)); // clamped zero y
    svg.select('.q-quad-bg-tr').attr('x', qzx).attr('y', oy).attr('width', ox + chartW - qzx).attr('height', qzy - oy);
    svg.select('.q-quad-bg-tl').attr('x', ox).attr('y', oy).attr('width', qzx - ox).attr('height', qzy - oy);
    svg.select('.q-quad-bg-br').attr('x', qzx).attr('y', qzy).attr('width', ox + chartW - qzx).attr('height', oy + chartH - qzy);
    svg.select('.q-quad-bg-bl').attr('x', ox).attr('y', qzy).attr('width', qzx - ox).attr('height', oy + chartH - qzy);

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
      .attr('fill', d => qQuadrantColor(d.npv, yVal(d)))
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
    const qzx = Math.max(ox, Math.min(ox + chartW, zx));
    const qzy = Math.max(oy, Math.min(oy + chartH, zy));
    svg.append('rect').attr('x', qzx).attr('y', oy).attr('width', ox + chartW - qzx).attr('height', qzy - oy).attr('fill', 'rgba(40,160,80,0.07)');
    svg.append('rect').attr('x', ox).attr('y', oy).attr('width', qzx - ox).attr('height', qzy - oy).attr('fill', 'rgba(200,80,80,0.07)');
    svg.append('rect').attr('x', qzx).attr('y', qzy).attr('width', ox + chartW - qzx).attr('height', oy + chartH - qzy).attr('fill', 'rgba(80,160,220,0.07)');
    svg.append('rect').attr('x', ox).attr('y', qzy).attr('width', qzx - ox).attr('height', oy + chartH - qzy).attr('fill', 'rgba(180,100,200,0.07)');

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
      { cls: 'end',   x: ox + chartW - QPAD, y: oy + 14,            text: 'Win-win: úspora i dekarbonizace', color: '#145c2a' },
      { cls: 'start', x: ox + QPAD,          y: oy + 14,            text: 'Drahá dekarbonizace',             color: '#7a1010' },
      { cls: 'end',   x: ox + chartW - QPAD, y: oy + chartH - QPAD, text: 'Levné, ale ↑ emise',             color: '#0d3d70' },
      { cls: 'start', x: ox + QPAD,          y: oy + chartH - QPAD, text: 'Ztráta + ↑ emise',               color: '#4d1066' },
    ].forEach(q => {
      svg.append('text').attr('class', 'q-quad-label')
        .attr('text-anchor', q.cls).attr('x', q.x).attr('y', q.y)
        .attr('font-size', '12px').attr('font-weight', '600').attr('fill', q.color)
        .text(q.text);
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
        .attr('fill', qQuadrantColor(a.npv, a.savedT))
        .attr('opacity', 0.2)
        .attr('stroke', 'white').attr('stroke-width', 1.5);
    });

    // Set B dots — full opacity
    pairs.forEach(({ b }) => {
      svg.append('circle')
        .attr('cx', ox + xScale(b.npv)).attr('cy', oy + yScale(b.savedT))
        .attr('r', DOT_R)
        .attr('fill', qQuadrantColor(b.npv, b.savedT))
        .attr('opacity', 0.85)
        .attr('stroke', 'white').attr('stroke-width', 1.5);
    });
  }

  // ── Beeswarm chart ────────────────────────────────────────────────────────
  function renderBeeswarmChart(container, sharedAbsMax) {
    const points = qComputePoints(state.carbonPrice, state.discountRate, state.fuelScenario)
      .filter(p => p.savedT > 0 && isFinite(p.kcPerT));

    const M = { top: 20, right: 24, bottom: 48, left: 24 };
    const totalW = container.clientWidth || 720;
    const totalH = 200;
    const chartW = totalW - M.left - M.right;
    const chartH = totalH - M.top - M.bottom;
    const midY   = M.top + chartH / 2;

    const ext = d3.extent(points, p => p.kcPerT);
    const localAbsMax = Math.max(Math.abs(ext[0]), Math.abs(ext[1])) * 1.1;
    const xScale = d3.scaleLinear().domain([-(sharedAbsMax || localAbsMax), sharedAbsMax || localAbsMax]).range([0, chartW]).nice();

    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append('svg')
      .attr('width', totalW).attr('height', totalH)
      .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');

    // Zero line
    const zx = M.left + xScale(0);
    svg.append('line')
      .attr('x1', zx).attr('x2', zx).attr('y1', M.top).attr('y2', M.top + chartH)
      .attr('stroke', '#bbb').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');

    // Half labels
    svg.append('text')
      .attr('x', zx - 8).attr('y', M.top + 14)
      .attr('text-anchor', 'end').attr('font-size', '11px').attr('fill', '#1a72b8').attr('opacity', 0.8)
      .text('Opatření je výhodnější než fosilní alternativa');
    svg.append('text')
      .attr('x', zx + 8).attr('y', M.top + 14)
      .attr('text-anchor', 'start').attr('font-size', '11px').attr('fill', '#8b35b0').attr('opacity', 0.8)
      .text('Opatření je dražší než fosilní alternativa');

    // X axis
    svg.append('g').attr('class', 'chart-axis')
      .attr('transform', `translate(${M.left},${M.top + chartH})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(v => {
        const abs = Math.abs(v);
        return abs >= 1e6 ? (v / 1e6).toFixed(1) + ' M' : abs >= 1e3 ? (v / 1e3).toFixed(0) + ' tis.' : v.toString();
      }));

    svg.append('text').attr('text-anchor', 'middle')
      .attr('x', M.left + chartW / 2).attr('y', totalH - 2)
      .attr('font-size', '11px').attr('fill', '#666')
      .text('Kč / t CO₂');

    // Beeswarm via force simulation
    const DOT_R = 5;
    const simNodes = points.map(p => ({ ...p, x: M.left + xScale(p.kcPerT), y: midY }));
    d3.forceSimulation(simNodes)
      .force('x', d3.forceX(d => M.left + xScale(d.kcPerT)).strength(1))
      .force('y', d3.forceY(midY).strength(0.1))
      .force('collide', d3.forceCollide(DOT_R + 1.5))
      .stop()
      .tick(120);

    // Clamp dots within chart area
    simNodes.forEach(n => {
      n.y = Math.max(M.top + DOT_R, Math.min(M.top + chartH - DOT_R, n.y));
    });

    const dotG = svg.append('g');
    dotG.selectAll('circle').data(simNodes).enter().append('circle')
      .attr('r', DOT_R)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => d.kcPerT < 0 ? '#1a72b8' : '#8b35b0')
      .attr('opacity', 0.85)
      .attr('stroke', 'white').attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .on('mouseover', function(e, d) {
        d3.select(this).attr('r', DOT_R + 2).attr('opacity', 1);
        showQTip(e, [
          d.name + (d.category ? ' — ' + d.category : ''),
          'Náklady: ' + qFmtCZKperT(-d.npv, d.savedT),
        ].join('\n'));
      })
      .on('mousemove', moveQTip)
      .on('mouseout', function() {
        d3.select(this).attr('r', DOT_R).attr('opacity', 0.85);
        hideQTip();
      });
  }

  // ── CAPEX beeswarm chart ──────────────────────────────────────────────────
  function renderCapexBeeswarmChart(container, sharedAbsMax) {
    const points = qComputePoints(state.carbonPrice, state.discountRate, state.fuelScenario)
      .filter(p => p.savedT > 0 && p.capexPerT != null && isFinite(p.capexPerT));

    const M = { top: 20, right: 24, bottom: 48, left: 24 };
    const totalW = container.clientWidth || 720;
    const totalH = 200;
    const chartW = totalW - M.left - M.right;
    const chartH = totalH - M.top - M.bottom;
    const midY   = M.top + chartH / 2;

    const ext = d3.extent(points, p => p.capexPerT);
    const localAbsMax = Math.max(Math.abs(ext[0]), Math.abs(ext[1])) * 1.1;
    const xScale = d3.scaleLinear().domain([-(sharedAbsMax || localAbsMax), sharedAbsMax || localAbsMax]).range([0, chartW]).nice();

    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append('svg')
      .attr('width', totalW).attr('height', totalH)
      .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');

    const zx = M.left + xScale(0);
    svg.append('line')
      .attr('x1', zx).attr('x2', zx).attr('y1', M.top).attr('y2', M.top + chartH)
      .attr('stroke', '#bbb').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');

    svg.append('text')
      .attr('x', zx - 8).attr('y', M.top + 14)
      .attr('text-anchor', 'end').attr('font-size', '11px').attr('fill', '#1a72b8').attr('opacity', 0.8)
      .text('Opatření vyžaduje nižší investici než fosilní alternativa');
    svg.append('text')
      .attr('x', zx + 8).attr('y', M.top + 14)
      .attr('text-anchor', 'start').attr('font-size', '11px').attr('fill', '#8b35b0').attr('opacity', 0.8)
      .text('Opatření vyžaduje vyšší investici než fosilní alternativa');

    svg.append('g').attr('class', 'chart-axis')
      .attr('transform', `translate(${M.left},${M.top + chartH})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(v => {
        const abs = Math.abs(v);
        return abs >= 1e6 ? (v / 1e6).toFixed(1) + ' M' : abs >= 1e3 ? (v / 1e3).toFixed(0) + ' tis.' : v.toString();
      }));

    svg.append('text').attr('text-anchor', 'middle')
      .attr('x', M.left + chartW / 2).attr('y', totalH - 2)
      .attr('font-size', '11px').attr('fill', '#666')
      .text('Kč / t CO₂ (rozdíl v investičních nákladech)');

    const DOT_R = 5;
    const simNodes = points.map(p => ({ ...p, x: M.left + xScale(p.capexPerT), y: midY }));
    d3.forceSimulation(simNodes)
      .force('x', d3.forceX(d => M.left + xScale(d.capexPerT)).strength(1))
      .force('y', d3.forceY(midY).strength(0.1))
      .force('collide', d3.forceCollide(DOT_R + 1.5))
      .stop()
      .tick(120);

    simNodes.forEach(n => {
      n.y = Math.max(M.top + DOT_R, Math.min(M.top + chartH - DOT_R, n.y));
    });

    svg.append('g').selectAll('circle').data(simNodes).enter().append('circle')
      .attr('r', DOT_R)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => d.capexPerT < 0 ? '#1a72b8' : '#8b35b0')
      .attr('opacity', 0.85)
      .attr('stroke', 'white').attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .on('mouseover', function(e, d) {
        d3.select(this).attr('r', DOT_R + 2).attr('opacity', 1);
        const fmt = v => {
          const abs = Math.abs(v);
          const s = abs >= 1e6 ? (v / 1e6).toFixed(2) + ' M' : abs >= 1e3 ? (v / 1e3).toFixed(1) + ' tis.' : Math.round(v).toString();
          return s + ' Kč/t CO₂';
        };
        showQTip(e, [
          d.name + (d.category ? ' — ' + d.category : ''),
          'Rozdíl v investicích: ' + fmt(d.capexPerT),
        ].join('\n'));
      })
      .on('mousemove', moveQTip)
      .on('mouseout', function() {
        d3.select(this).attr('r', DOT_R).attr('opacity', 0.85);
        hideQTip();
      });
  }

  // ── NPV scenario comparison (shared helpers) ──────────────────────────────
  const SCENARIO_DEFS = [
    { key: 'CP',    label: 'Současné politiky', color: '#2860b4' },
    { key: 'NZ',    label: 'Net-zero',           color: '#1f8c47' },
    { key: 'CP_EC', label: 'Energetická krize',  color: '#c43535' },
  ];

  // categoryFilter: array of category strings, or null for all
  function computeScenarioRows(categoryFilter) {
    const byId = {};
    for (const sc of SCENARIO_DEFS) {
      const pts = qComputePoints(state.carbonPrice, state.discountRate, sc.key)
        .filter(p => !categoryFilter || categoryFilter.includes(p.category));
      for (const p of pts) {
        if (!byId[p.id]) byId[p.id] = { id: p.id, name: p.name, category: p.category, sector: p.sector };
        if (isFinite(p.npv)) byId[p.id][sc.key] = p.npv;
      }
    }
    return Object.values(byId)
      .filter(d => SCENARIO_DEFS.every(sc => d[sc.key] != null))
      .sort((a, b) => a.CP - b.CP);
  }

  // ── Dumbbell chart ─────────────────────────────────────────────────────────
  // categoryFilter: array of category strings, or null for all
  // sharedDomain: [min, max] passed from renderAll for a harmonised x axis
  function renderDumbbellChart(container, categoryFilter, sharedDomain) {
    const rows = computeScenarioRows(categoryFilter);
    if (!rows.length) return;

    const DOT_R = 4;
    const ROW_H = 22;
    const M = { top: 6, right: 16, bottom: 36, left: 160 };
    const totalW = container.clientWidth || 360;
    const chartW = totalW - M.left - M.right;
    const totalH = M.top + rows.length * ROW_H + M.bottom;

    const domain = sharedDomain || (() => {
      const vals = rows.flatMap(d => SCENARIO_DEFS.map(sc => d[sc.key]));
      const [mn, mx] = d3.extent(vals);
      const p = (mx - mn) * 0.04 || Math.abs(mn || mx) * 0.1 || 10000;
      return [mn - p, mx + p];
    })();
    const xScale = d3.scaleLinear().domain(domain).nice().range([0, chartW]);

    const fmtTick = v => {
      const abs = Math.abs(v);
      return abs >= 1e6 ? (v / 1e6).toFixed(1) + ' M' : abs >= 1e3 ? (v / 1e3).toFixed(0) + ' tis.' : v.toString();
    };

    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append('svg')
      .attr('width', totalW).attr('height', totalH)
      .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');

    // X axis
    svg.append('g').attr('class', 'chart-axis')
      .attr('transform', `translate(${M.left},${M.top + rows.length * ROW_H})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(fmtTick));
    svg.append('text').attr('text-anchor', 'middle')
      .attr('x', M.left + chartW / 2).attr('y', totalH - 4)
      .attr('font-size', '10px').attr('fill', '#888').text('NPV (Kč)');

    // Zero line
    const zx = M.left + xScale(0);
    svg.append('line')
      .attr('x1', zx).attr('x2', zx)
      .attr('y1', M.top).attr('y2', M.top + rows.length * ROW_H)
      .attr('stroke', '#ccc').attr('stroke-width', 1).attr('stroke-dasharray', '3 3');

    rows.forEach((d, i) => {
      const cy = M.top + i * ROW_H + ROW_H / 2;

      svg.append('text').attr('x', M.left - 6).attr('y', cy + 4)
        .attr('text-anchor', 'end').attr('font-size', '10px').attr('fill', '#333')
        .text(d.name);

      const npvs = SCENARIO_DEFS.map(sc => d[sc.key]);
      svg.append('line')
        .attr('x1', M.left + xScale(Math.min(...npvs)))
        .attr('x2', M.left + xScale(Math.max(...npvs)))
        .attr('y1', cy).attr('y2', cy)
        .attr('stroke', '#ddd').attr('stroke-width', 1.5);

      // Give reduced opacity to dots that land on exactly the same pixel
      const dotPts = SCENARIO_DEFS.map(sc => ({ sc, px: Math.round(M.left + xScale(d[sc.key])) }));
      const opacityMap = Object.fromEntries(dotPts.map(p => [p.sc.key, 1]));
      dotPts.forEach((a, ai) => dotPts.forEach((b, bi) => {
        if (bi > ai && a.px === b.px) { opacityMap[a.sc.key] = 0.4; opacityMap[b.sc.key] = 0.4; }
      }));

      // CP_EC and NZ first, CP last so blue stays on top
      [...SCENARIO_DEFS].reverse().forEach(sc => {
        svg.append('circle')
          .attr('cx', M.left + xScale(d[sc.key])).attr('cy', cy)
          .attr('r', DOT_R)
          .attr('fill', sc.color).attr('stroke', 'white').attr('stroke-width', 1.2)
          .attr('opacity', opacityMap[sc.key])
          .style('cursor', 'pointer')
          .on('mouseover', function(e) {
            d3.select(this).attr('r', DOT_R + 2);
            showQTip(e, [
              d.name + (d.category ? ' — ' + d.category : ''),
              sc.label + ': ' + fmtCZK(d[sc.key]),
            ].join('\n'));
          })
          .on('mousemove', moveQTip)
          .on('mouseout', function() { d3.select(this).attr('r', DOT_R); hideQTip(); });
      });
    });
  }

  function renderDumbbellLegend(container) {
    d3.select(container).select('svg').remove();
    const totalW = container.clientWidth || 400;
    const svg = d3.select(container).append('svg').attr('width', totalW).attr('height', 20)
      .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');
    SCENARIO_DEFS.forEach((sc, i) => {
      const lx = i * 160;
      svg.append('circle').attr('cx', lx + 5).attr('cy', 10).attr('r', 4.5).attr('fill', sc.color);
      svg.append('text').attr('x', lx + 14).attr('y', 14)
        .attr('font-size', '11px').attr('fill', '#555').text(sc.label);
    });
  }

  const DUMBBELL_CONFIGS = [
    { id: 'dumbbell-rd-uhli-e',   categories: ['Rodinný dům uhlí – E'] },
    { id: 'dumbbell-rd-plyn-e',   categories: ['Rodinný dům plyn – E'] },
    { id: 'dumbbell-nove-male',   categories: ['Nové malé']            },
    { id: 'dumbbell-nove-velke',  categories: ['Nové velké']           },
    { id: 'dumbbell-ojete-male',  categories: ['Ojeté malé']           },
    { id: 'dumbbell-ojete-velke', categories: ['Ojeté velké']          },
  ];

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
  // Collect all NPV values that will appear in a given chart container.
  function collectNpvsForEl(el) {
    const param   = el.dataset.param || 'Cena uhlíku';
    const exclude = el.dataset.exclude ? el.dataset.exclude.split(',').map(s => s.trim()) : [];
    const cats    = el.dataset.categories
      ? el.dataset.categories.split('|')
      : (el.dataset.category ? [el.dataset.category] : []);
    const isDR    = param === 'Diskontní míra';
    const vals    = [];

    for (const category of cats) {
      const measures = [
        ...(data.buildings_measures || []),
        ...(data.transport_measures  || []),
      ].filter(m =>
        (m.measure_baseline_id || m.measure_baseline) &&
        CP_CHART_MEASURES.includes(m.measure_name) &&
        !exclude.includes(m.measure_name) &&
        (!category || m.building_category === category || m.transport_category === category)
      );

      for (const name of CP_CHART_MEASURES) {
        if (exclude.includes(name)) continue;
        const entries = measures.filter(m => m.measure_name === name);
        if (!entries.length) continue;
        const entry = entries.find(m => {
          try {
            const r = CostsBenefits.calculate({
              measureId: m.id, data,
              discountRate: 0.03, carbonPriceEur: 60,
              priceScenario: state.fuelScenario,
            });
            return !isNaN(r.npv);
          } catch (_) { return false; }
        });
        if (!entry) continue;

        const cps = isDR ? [state.carbonPrice] : [0, state.carbonPrice, 200];
        const drs = isDR ? [0, 3, 7] : [state.discountRate];
        for (const cp of cps) {
          for (const dr of drs) {
            try {
              const r = CostsBenefits.calculate({
                measureId: entry.id, data,
                discountRate: dr / 100, carbonPriceEur: cp,
                priceScenario: state.fuelScenario,
              });
              if (!isNaN(r.npv)) vals.push(r.npv);
            } catch (_) {}
          }
        }
      }
    }
    return vals;
  }

  function renderAll() {
    // Compute shared x-domain per domain group
    const groupVals = {};
    document.querySelectorAll('.tornado-chart[data-domain-group]').forEach(el => {
      const g = el.dataset.domainGroup;
      if (!groupVals[g]) groupVals[g] = [];
      groupVals[g].push(...collectNpvsForEl(el));
    });
    const sharedDomains = {};
    for (const [g, vals] of Object.entries(groupVals)) {
      if (!vals.length) continue;
      const [vMin, vMax] = d3.extent(vals);
      const xPad = (vMax - vMin) * 0.06 || 20000;
      sharedDomains[g] = d3.scaleLinear().domain([vMin - xPad, vMax + xPad]).nice().domain();
    }

    document.querySelectorAll('.tornado-chart[data-categories]').forEach(el => {
      const cats   = el.dataset.categories.split('|');
      const excl   = el.dataset.exclude ? el.dataset.exclude.split(',').map(s => s.trim()) : [];
      const domain = el.dataset.domainGroup ? sharedDomains[el.dataset.domainGroup] || null : null;
      renderMultiTornadoChart(el, cats, el.dataset.param || 'Cena uhlíku', excl, domain);
    });
    document.querySelectorAll('.tornado-chart[data-category]').forEach(el => {
      const excl   = el.dataset.exclude ? el.dataset.exclude.split(',').map(s => s.trim()) : [];
      const domain = el.dataset.domainGroup ? sharedDomains[el.dataset.domainGroup] || null : null;
      renderTornadoChart(el, el.dataset.category, el.dataset.param || 'Cena uhlíku', excl, domain);
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
    const beeEl = document.getElementById('beeswarm-chart');
    const capexBeeEl = document.getElementById('beeswarm-capex-chart');
    if (beeEl || capexBeeEl) {
      const allPts = qComputePoints(state.carbonPrice, state.discountRate, state.fuelScenario)
        .filter(p => p.savedT > 0);
      const kcVals    = allPts.filter(p => isFinite(p.kcPerT)).map(p => p.kcPerT);
      const capexVals = allPts.filter(p => p.capexPerT != null && isFinite(p.capexPerT)).map(p => p.capexPerT);
      const allVals   = [...kcVals, ...capexVals];
      const sharedAbsMax = allVals.length
        ? Math.max(Math.abs(d3.min(allVals)), Math.abs(d3.max(allVals))) * 1.1
        : undefined;
      if (beeEl) renderBeeswarmChart(beeEl, sharedAbsMax);
      if (capexBeeEl) renderCapexBeeswarmChart(capexBeeEl, sharedAbsMax);
    }
    // Compute shared x-axis domain across all dumbbell charts
    const allDbVals = [];
    DUMBBELL_CONFIGS.forEach(cfg => {
      computeScenarioRows(cfg.categories).forEach(r =>
        SCENARIO_DEFS.forEach(sc => { if (r[sc.key] != null) allDbVals.push(r[sc.key]); })
      );
    });
    let sharedDbDomain;
    if (allDbVals.length) {
      const [dbMin, dbMax] = d3.extent(allDbVals);
      const dbPad = (dbMax - dbMin) * 0.04;
      sharedDbDomain = [dbMin - dbPad, dbMax + dbPad];
    }
    const legendEl = document.getElementById('dumbbell-legend');
    if (legendEl) renderDumbbellLegend(legendEl);
    DUMBBELL_CONFIGS.forEach(cfg => {
      const el = document.getElementById(cfg.id);
      if (el) renderDumbbellChart(el, cfg.categories, sharedDbDomain);
    });
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
