(function () {
  'use strict';

  const data = window.COSTS_AND_BENEFITS;
  if (!data) return;

  // ── State ─────────────────────────────────────────────────────────────────
  const state = {
    carbonPrice:           60,
    discountRate:           3,
    fuelScenario:         'CP',
    electricityPriceFactor: 1.0,
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
    'Soláry na střeše + baterie',
    'Fasáda + renovace',
    'Elektromobil',
    'Hybrid',
  ];
  const CP_CHART_COLORS = [
    // Buildings (indices 0–6)
    '#1a7a85', '#2860b4', '#6b4fa0', '#c05a1a', '#2e7d32', '#8b6914',
    '#cd853f',  // Fasáda + renovace
    // Transport (indices 7–8)
    '#c0392b', '#e67e22',  // Elektromobil, Hybrid
  ];

  // Maps virtual transport measure names to the actual YAML measure names per context.
  const TRANSPORT_MEASURE_MAP = {
    'Elektromobil': {
      'Nové malé':   'Nový malý elektromobil',
      'Nové velké':  'Nový velký elektromobil',
      'Ojeté malé':  'Ojetý malý elektromobil',
      'Ojeté velké': 'Ojetý velký elektromobil',
    },
    'Hybrid': {
      'Nové malé':   'Nový malý hybrid',
      'Nové velké':  'Nový velký hybrid',
      'Ojeté malé':  'Ojetý malý hybrid',
      'Ojeté velké': 'Ojetý velký hybrid',
    },
  };

  // ── Helpers for resolving virtual transport names in chart filters ────────
  // Returns the actual YAML measure name for a given CP_CHART_MEASURES entry
  // and category (e.g. 'Elektromobil' + 'Nové malé' → 'Nový malý elektromobil').
  function cpActualName(virtualName, category) {
    return (TRANSPORT_MEASURE_MAP[virtualName] || {})[category] || virtualName;
  }
  // Returns true if the given actual measure name is represented by any entry
  // in CP_CHART_MEASURES for this category.
  function cpIncludesForCat(measureName, category) {
    return CP_CHART_MEASURES.some(n => cpActualName(n, category) === measureName);
  }

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
      cpIncludesForCat(m.measure_name, category) &&
      (!category || m[catField] === category || m.transport_category === category)
    );

    function calcNpv(entry, cp, dr) {
      try {
        const r = CostsBenefits.calculate({
          measureId:             entry.id, data,
          discountRate:          dr / 100,
          carbonPriceEur:        cp,
          priceScenario:         state.fuelScenario,
          electricityPriceFactor: state.electricityPriceFactor,
        });
        return isNaN(r.npv) ? null : r.npv;
      } catch (_) { return null; }
    }

    function findEntry(entries, cp, dr) {
      return entries.find(m => {
        try {
          const r = CostsBenefits.calculate({
            measureId:             m.id, data,
            discountRate:          dr / 100, carbonPriceEur: cp,
            priceScenario:         state.fuelScenario,
            electricityPriceFactor: state.electricityPriceFactor,
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
        const actualName = cpActualName(name, category);
        const entries = allMeasures.filter(m => m.measure_name === actualName);
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
        const actualName = cpActualName(name, category);
        const entries = allMeasures.filter(m => m.measure_name === actualName);
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
    const isElTariff     = param === 'Tarif elektřiny';
    const STEP_COLORS  = ['#0d4a52', '#1a7a85', '#6ab4bc'];
    const STEP_RATES   = [0, 3, 7];
    const STEP_LABELS  = ['0 %', '3 %', '7 %'];
    const TARIFF_SCENARIOS = [...(data.electricity_price_scenarios || [])]
      .filter(s => s.electricity_price_scenario !== 'Nabíjím doma ze sítě')
      .sort((a, b) => a.electricity_price_factor - b.electricity_price_factor);
    const TARIFF_FACTORS   = TARIFF_SCENARIOS.map(s => s.electricity_price_factor);
    const TARIFF_COLORS    = ['#2d1b54', '#6b4fa0', '#9b7fd0', '#c8b4e8'].slice(0, TARIFF_FACTORS.length);
    const TARIFF_LABELS    = TARIFF_SCENARIOS.map(s => s.electricity_price_scenario);

    // epFactor defaults to current state; pass an explicit value for the tariff chart.
    function calcNpv(entry, cp, dr, epFactor = state.electricityPriceFactor) {
      try {
        const r = CostsBenefits.calculate({
          measureId:             entry.id, data,
          discountRate:          dr / 100, carbonPriceEur: cp,
          priceScenario:         state.fuelScenario,
          electricityPriceFactor: epFactor,
        });
        return isNaN(r.npv) ? null : r.npv;
      } catch (_) { return null; }
    }

    function findEntry(entries, cp, dr) {
      return entries.find(m => {
        try {
          const r = CostsBenefits.calculate({
            measureId:             m.id, data,
            discountRate:          dr / 100, carbonPriceEur: cp,
            priceScenario:         state.fuelScenario,
            electricityPriceFactor: state.electricityPriceFactor,
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
        cpIncludesForCat(m.measure_name, category) &&
        (!category || m.building_category === category || m.transport_category === category)
      );

      const rows = CP_CHART_MEASURES.map((name, ni) => {
        if (exclude.includes(name)) return null;
        const actualName = cpActualName(name, category);
        const entries = allMeasures.filter(m => m.measure_name === actualName);
        if (!entries.length) return null;

        if (isDiscountRate) {
          const entry = findEntry(entries, state.carbonPrice, 3);
          if (!entry) return null;
          const npvs = STEP_RATES.map(dr => calcNpv(entry, state.carbonPrice, dr));
          if (npvs.every(v => v == null)) return null;
          return { name, color: CP_CHART_COLORS[ni], npvs };
        } else if (isElTariff) {
          const entry = findEntry(entries, state.carbonPrice, state.discountRate);
          if (!entry) return null;
          const npvs = TARIFF_FACTORS.map(f => calcNpv(entry, state.carbonPrice, state.discountRate, f));
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
    const T_MARGIN       = { top: isElTariff ? 64 : isDiscountRate ? 20 : 34, right: 24, bottom: 36, left: 8 };

    const totalW  = container.clientWidth || 700;
    const chartW  = Math.max(totalW - LABEL_W - T_MARGIN.left - T_MARGIN.right, 120);
    const totalH  = groups.reduce((h, g) => h + GROUP_HEADER_H + g.rows.length * ROW_H, 0)
                  + (groups.length - 1) * GROUP_GAP
                  + T_MARGIN.top + T_MARGIN.bottom;

    // Shared x-domain
    const allVals = groups.flatMap(g => g.rows.flatMap(r =>
      (isDiscountRate || isElTariff)
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
    if (!isDiscountRate && !isElTariff) {
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

    // Legend for tariff chart: vertical list of coloured dots + full scenario names.
    if (isElTariff) {
      const DOT_R  = 4;
      const ITEM_H = 14;
      const legY   = 6;
      TARIFF_FACTORS.forEach((_, pi) => {
        const iy = legY + pi * ITEM_H;
        chart.append('circle')
          .attr('cx', DOT_R).attr('cy', iy + DOT_R)
          .attr('r', DOT_R).attr('fill', TARIFF_COLORS[pi])
          .attr('stroke', 'white').attr('stroke-width', 1);
        chart.append('text')
          .attr('x', DOT_R * 2 + 5).attr('y', iy + DOT_R + 3)
          .attr('font-size', '9px').attr('fill', '#888')
          .text(TARIFF_LABELS[pi]);
      });
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

        if (isDiscountRate || isElTariff) {
          const DOT_COLORS = isElTariff ? TARIFF_COLORS : STEP_COLORS;
          const DOT_LABELS = isElTariff ? TARIFF_LABELS : STEP_LABELS;
          r.npvs.forEach((npv, pi) => {
            if (npv == null) return;
            const dotX = xScale(npv);
            chart.append('circle')
              .attr('cx', dotX).attr('cy', midY)
              .attr('r', 5).attr('fill', DOT_COLORS[pi])
              .attr('stroke', 'white').attr('stroke-width', 1.5);
            // Inline labels only for discount rate; tariff uses a legend instead.
            if (!isElTariff) {
              chart.append('text')
                .attr('x', dotX).attr('y', midY - 8)
                .attr('text-anchor', 'middle')
                .attr('font-size', '9px').attr('fill', DOT_COLORS[pi])
                .text(DOT_LABELS[pi]);
            }
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
  const Q_DOT_COLORS = { tr: '#006b94', tl: '#8dcdeb', br: '#e2a4a4', bl: '#973d4c' };
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
    const sign = v < 0 ? '−' : '+';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + (Math.round(abs / 1e5) / 10).toFixed(1) + ' mil. Kč';
    if (abs >= 1e3) return sign + qFmtInt.format(Math.round(abs / 1e3))    + ' tis. Kč';
    return sign + qFmtInt.format(abs) + ' Kč';
  }

  function qFmt3sig(x) { return parseFloat(x.toPrecision(3)).toString(); }

  function qFmtCZKperT(czk, savedT) {
    if (savedT == null || !savedT || !isFinite(czk / savedT)) return '—';
    const v    = czk / savedT;
    const sign = v < 0 ? '−' : '+';
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
          measureId:             m.id,
          data,
          discountRate:          discountRatePct / 100,
          carbonPriceEur:        carbonPrice,
          priceScenario:         scenario,
          electricityPriceFactor: state.electricityPriceFactor,
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
              measureId:             m.id,
              data,
              discountRate:          discountRatePct / 100,
              carbonPriceEur:        carbonPrice,
              priceScenario:         sc,
              electricityPriceFactor: state.electricityPriceFactor,
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

      svg.append('rect').attr('class', 'q-quad-bg q-quad-bg-tr').attr('fill', 'rgba(0,133,173,0.15)');
      svg.append('rect').attr('class', 'q-quad-bg q-quad-bg-tl').attr('fill', 'rgba(172,205,220,0.15)');
      svg.append('rect').attr('class', 'q-quad-bg q-quad-bg-br').attr('fill', 'rgba(226,164,164,0.15)');
      svg.append('rect').attr('class', 'q-quad-bg q-quad-bg-bl').attr('fill', 'rgba(151,61,76,0.15)');

      svg.append('line').attr('class', 'q-zero-x')
        .attr('stroke', '#aaa').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');
      svg.append('line').attr('class', 'q-zero-y')
        .attr('stroke', '#aaa').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');

      svg.append('g').attr('class', 'chart-axis q-x-axis');
      svg.append('g').attr('class', 'chart-axis q-y-axis');

      svg.append('text').attr('class', 'q-axis-label q-x-label').attr('text-anchor', 'middle');
      svg.append('text').attr('class', 'q-axis-label q-y-label').attr('text-anchor', 'middle');

      svg.append('text').attr('class', 'q-quad-label q-quad-tr').attr('text-anchor', 'end')
        .attr('font-weight', '700').style('fill', Q_DOT_COLORS.tr);
      svg.append('text').attr('class', 'q-quad-label q-quad-tl').attr('text-anchor', 'start')
        .attr('font-weight', '700').style('fill', Q_DOT_COLORS.tl);
      svg.append('text').attr('class', 'q-quad-label q-quad-br').attr('text-anchor', 'end')
        .attr('font-weight', '700').style('fill', Q_DOT_COLORS.br);
      svg.append('text').attr('class', 'q-quad-label q-quad-bl').attr('text-anchor', 'start')
        .attr('font-weight', '700').style('fill', Q_DOT_COLORS.bl);

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
      svg.select('.q-quad-tr').attr('x', ox + chartW - QPAD).attr('y', oy + 14)
        .text('ZTRÁTA A ZVÝŠENÍ EMISÍ');
      svg.select('.q-quad-tl').attr('x', ox + QPAD).attr('y', oy + 14)
        .text('DRAHÁ DEKARBONIZACE');
      svg.select('.q-quad-br').attr('x', ox + chartW - QPAD).attr('y', oy + chartH - QPAD)
        .text('ÚSPORA I DEKARBONIZACE');
      svg.select('.q-quad-bl').attr('x', ox + QPAD).attr('y', oy + chartH - QPAD)
        .text('ÚSPORA, NO ZVÝŠENÍ EMISÍ');
    } else {
      svg.select('.q-quad-tr').attr('x', ox + chartW - QPAD).attr('y', oy + 14)
        .text('ÚSPORA I DEKARBONIZACE');
      svg.select('.q-quad-tl').attr('x', ox + QPAD).attr('y', oy + 14)
        .text('DRAHÁ DEKARBONIZACE');
      svg.select('.q-quad-br').attr('x', ox + chartW - QPAD).attr('y', oy + chartH - QPAD)
        .text('ÚSPORA, NO ZVÝŠENÍ EMISÍ');
      svg.select('.q-quad-bl').attr('x', ox + QPAD).attr('y', oy + chartH - QPAD)
        .text('ZTRÁTA A ZVÝŠENÍ EMISÍ');
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
    svg.append('rect').attr('x', qzx).attr('y', oy).attr('width', ox + chartW - qzx).attr('height', qzy - oy).attr('fill', 'rgba(0,133,173,0.15)');
    svg.append('rect').attr('x', ox).attr('y', oy).attr('width', qzx - ox).attr('height', qzy - oy).attr('fill', 'rgba(172,205,220,0.15)');
    svg.append('rect').attr('x', qzx).attr('y', qzy).attr('width', ox + chartW - qzx).attr('height', oy + chartH - qzy).attr('fill', 'rgba(226,164,164,0.15)');
    svg.append('rect').attr('x', ox).attr('y', qzy).attr('width', qzx - ox).attr('height', oy + chartH - qzy).attr('fill', 'rgba(151,61,76,0.15)');

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
      { cls: 'end',   x: ox + chartW - QPAD, y: oy + 14,            text: 'ÚSPORA I DEKARBONIZACE', color: Q_DOT_COLORS.tr },
      { cls: 'start', x: ox + QPAD,          y: oy + 14,            text: 'DRAHÁ DEKARBONIZACE',    color: Q_DOT_COLORS.tl },
      { cls: 'end',   x: ox + chartW - QPAD, y: oy + chartH - QPAD, text: 'ÚSPORA, NO ZVÝŠENÍ EMISÍ', color: Q_DOT_COLORS.br },
      { cls: 'start', x: ox + QPAD,          y: oy + chartH - QPAD, text: 'ZTRÁTA A ZVÝŠENÍ EMISÍ',   color: Q_DOT_COLORS.bl },
    ].forEach(q => {
      svg.append('text').attr('class', 'q-quad-label')
        .attr('text-anchor', q.cls).attr('x', q.x).attr('y', q.y)
        .attr('font-weight', '700').style('fill', q.color)
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
    'Byt ve starší zástavbě s vlastním plynovým kotlem',
    'Byt v panelovém domě s plynovou kotelnou',
  ];
  const MAC_CAT_COLORS = {
    'Rodinný dům uhlí – E':                             '#7b4f2e',
    'Rodinný dům uhlí – C':                             '#b07a50',
    'Rodinný dům plyn – E':                             '#c45e00',
    'Rodinný dům plyn – C':                             '#e08c3a',
    'Byt ve starší zástavbě s vlastním plynovým kotlem':'#2e7d5b',
    'Byt v panelovém domě s plynovou kotelnou':         '#1a7a85',
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
    const isDR       = param === 'Diskontní míra';
    const isElTariff = param === 'Tarif elektřiny';
    const vals       = [];

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
              measureId:             m.id, data,
              discountRate:          0.03, carbonPriceEur: 60,
              priceScenario:         state.fuelScenario,
              electricityPriceFactor: state.electricityPriceFactor,
            });
            return !isNaN(r.npv);
          } catch (_) { return false; }
        });
        if (!entry) continue;

        const cps       = (isDR || isElTariff) ? [state.carbonPrice] : [0, state.carbonPrice, 200];
        const drs       = isDR ? [0, 3, 7] : [state.discountRate];
        const epFactors = isElTariff
          ? [...(data.electricity_price_scenarios || [])]
              .filter(s => s.electricity_price_scenario !== 'Nabíjím doma ze sítě')
              .sort((a, b) => a.electricity_price_factor - b.electricity_price_factor)
              .map(s => s.electricity_price_factor)
          : [state.electricityPriceFactor];
        for (const cp of cps) {
          for (const dr of drs) {
            for (const epF of epFactors) {
              try {
                const r = CostsBenefits.calculate({
                  measureId:             entry.id, data,
                  discountRate:          dr / 100, carbonPriceEur: cp,
                  priceScenario:         state.fuelScenario,
                  electricityPriceFactor: epF,
                });
                if (!isNaN(r.npv)) vals.push(r.npv);
              } catch (_) {}
            }
          }
        }
      }
    }
    return vals;
  }

  // ── Chart export (SVG / PNG download) ────────────────────────────────────────

  const CHART_EXPORT_CSS = [
    'text { font-family: Roboto, system-ui, sans-serif; }',
    '.chart-axis line { stroke: #ddd; }',
    '.chart-axis text { font-size: 10px; fill: #888; font-family: Roboto, system-ui, sans-serif; }',
    '.q-quad-label   { font-size: 10px; fill: #bbb; font-style: italic; }',
    '.q-axis-label   { font-size: 12px; fill: #666; font-weight: 500; }',
    '.chart-col-header { font-size: 10px; fill: #999; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }',
  ].join('\n');

  function prepareExportSVG(svgEl) {
    const clone = svgEl.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    if (!clone.getAttribute('viewBox')) {
      const w = clone.getAttribute('width') || svgEl.getBoundingClientRect().width;
      const h = clone.getAttribute('height') || svgEl.getBoundingClientRect().height;
      clone.setAttribute('viewBox', `0 0 ${w} ${h}`);
    }
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = CHART_EXPORT_CSS;
    clone.insertBefore(style, clone.firstChild);
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('fill', 'white');
    clone.insertBefore(bg, style.nextSibling);
    return clone;
  }

  function triggerDownload(url, filename) {
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportSVG(svgEl, filename) {
    const clone = prepareExportSVG(svgEl);
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' });
    triggerDownload(URL.createObjectURL(blob), filename + '.svg');
  }

  function exportPNG(svgEl, filename) {
    const clone = prepareExportSVG(svgEl);
    const svgStr = new XMLSerializer().serializeToString(clone);
    const url = URL.createObjectURL(new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' }));
    const w = +svgEl.getAttribute('width') || svgEl.getBoundingClientRect().width;
    const h = +svgEl.getAttribute('height') || svgEl.getBoundingClientRect().height;
    const scale = 2;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = w * scale; canvas.height = h * scale;
      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);
      ctx.fillStyle = 'white'; ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob(blob => triggerDownload(URL.createObjectURL(blob), filename + '.png'), 'image/png');
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  }

  function fokDownloadBar(container, filename) {
    const old = container.querySelector('.chart-dl-bar');
    if (old) old.remove();
    if (!container.querySelector('svg')) return;
    const bar = document.createElement('div');
    bar.className = 'chart-dl-bar';
    ['SVG', 'PNG'].forEach(fmt => {
      const btn = document.createElement('button');
      btn.className = 'chart-dl-btn';
      btn.textContent = '↓ ' + fmt;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const svg = container.querySelector('svg');
        if (svg) (fmt === 'SVG' ? exportSVG : exportPNG)(svg, filename);
      });
      bar.appendChild(btn);
    });
    container.appendChild(bar);
  }

  function addDownloadBars() {
    document.querySelectorAll('.tornado-chart').forEach(el => {
      const cat   = el.dataset.category || (el.dataset.categories || '').split('|')[0];
      const param = el.dataset.param || 'Cena uhlíku';
      fokDownloadBar(el, 'tornado-' + [cat, param].filter(Boolean).join('-'));
    });
    [
      ['quadrant-chart',          'quadrant'],
      ['static-comparison-chart', 'quadrant-porovnani'],
      ['mac-chart',               'mac-curve'],
      ['beeswarm-chart',          'beeswarm-npv'],
      ['beeswarm-capex-chart',    'beeswarm-capex'],
      ...DUMBBELL_CONFIGS.map(c => [c.id, c.id]),
    ].forEach(([id, name]) => {
      const el = document.getElementById(id);
      if (el) fokDownloadBar(el, name);
    });
  }

  // ── Import cost table ─────────────────────────────────────────────────────
  function getScenarioPrices(scenario) {
    const entries = data.fuel_scenarios.filter(s => s.scenario === scenario);
    if (!entries.length) return [];
    if (entries.length === 1) return entries[0].prices;
    const yearMap = {};
    for (const entry of entries)
      for (const p of entry.prices)
        yearMap[p.year_investment] = Object.assign(yearMap[p.year_investment] || {}, p);
    return Object.values(yearMap).sort((a, b) => a.year_investment - b.year_investment);
  }

  function sumFuelCost(prices, fuelKey, annualAmount, years) {
    let total = 0;
    for (let t = 1; t <= years; t++) {
      const yp = prices.find(p => p.year_investment === t);
      if (yp && yp[fuelKey] != null) total += yp[fuelKey] * annualAmount;
    }
    return total;
  }

  function fmtMld(v) {
    return (v / 1e9).toFixed(1) + ' mld. Kč';
  }

  // Renders one horizontal bar per scenario, stacked vertically.
  // Full bar length = total fuel savings value; hatched right portion = CAPEX diff.
  // domMax is shared across all measures so bars are comparable.
  // scenarioDefs: optional array of {color, label} — defaults to SCENARIO_DEFS.
  function renderNetBar(container, fuelValues, capex, domMax, scenarioDefs) {
    scenarioDefs = scenarioDefs || SCENARIO_DEFS;
    const BAR_H  = 8;
    const GAP    = 3;
    const LABEL_W = 44;  // px reserved on right for value labels
    const PAD    = { l: 4, r: LABEL_W, t: 2, b: 2 };
    const n      = fuelValues.length;
    const H      = PAD.t + n * BAR_H + (n - 1) * GAP + PAD.b;
    const W      = container.clientWidth || 200;
    const chartW = W - PAD.l - PAD.r;

    const domMin = 0;
    if (domMax == null) domMax = Math.max(...fuelValues) * 1.05 || 1;
    const scale = v => PAD.l + (v - domMin) / (domMax - domMin) * chartW;

    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append('svg').attr('width', W).attr('height', H);

    // Shared hatch pattern for the CAPEX portion
    const patId = 'hatch-' + Math.random().toString(36).slice(2, 8);
    const defs = svg.append('defs');
    const pat  = defs.append('pattern')
      .attr('id', patId).attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 5).attr('height', 5)
      .attr('patternTransform', 'rotate(45)');
    pat.append('line')
      .attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 5)
      .attr('stroke', '#999').attr('stroke-width', 1.5);

    fuelValues.forEach((fuel, i) => {
      const y       = PAD.t + i * (BAR_H + GAP);
      const sc      = scenarioDefs[i];
      const net     = fuel - capex;
      const netPx   = scale(Math.max(0, net));  // solid bar ends here
      const fuelPx  = scale(fuel);
      const zeroPx  = scale(0);

      // Full fuel bar (base colour, lower opacity under hatch area)
      if (fuelPx > zeroPx) {
        svg.append('rect')
          .attr('x', zeroPx).attr('y', y)
          .attr('width', fuelPx - zeroPx).attr('height', BAR_H)
          .attr('fill', sc.color).attr('opacity', 0.25).attr('rx', 2);
      }

      // Solid net-benefit portion (0 → net), capped at fuel bar, full opacity
      if (net > 0) {
        const solidEndPx = Math.min(netPx, fuelPx);  // cap when capex < 0
        svg.append('rect')
          .attr('x', zeroPx).attr('y', y)
          .attr('width', solidEndPx - zeroPx).attr('height', BAR_H)
          .attr('fill', sc.color).attr('opacity', 0.85).attr('rx', 2);
      }

      // Hatch overlay on the CAPEX portion (net → fuel, or whole bar if net ≤ 0)
      const hatchStart = Math.max(zeroPx, netPx);
      if (fuelPx > hatchStart) {
        svg.append('rect')
          .attr('x', hatchStart).attr('y', y)
          .attr('width', fuelPx - hatchStart).attr('height', BAR_H)
          .attr('fill', `url(#${patId})`).attr('rx', 2);
      }

      // Value label to the right of the bar
      svg.append('text')
        .attr('x', fuelPx + 4)
        .attr('y', y + BAR_H / 2)
        .attr('dominant-baseline', 'middle')
        .attr('font-size', 9)
        .attr('fill', sc.color)
        .text((fuel / 1e9).toFixed(0) + ' mld.');
    });
  }

  function renderImportCostTable() {
    // ── YAML measure IDs ──────────────────────────────────────────────────────
    // All fuel savings, lifetimes, and CAPEX diffs are derived from the YAML.
    // Only deployment counts and import price scenarios are editorial choices.
    const IDS = {
      hp:   { m: 37, b: 9  },   // Tepelné čerpadlo vs. Plynový kotel  (RD plyn–E)
      ins:  { m: 42, b: 11 },   // Fasáda + renovace vs. Fasáda (RD plyn–E)
      ev:   { m: 59, b: 55 },   // Nový malý elektromobil vs. Nové malé auto na benzín
      ev_l: { m: 61, b: 56 },   // Nový velký elektromobil vs. Nové velké auto na naftu
    };
    const DEPLOY = { hp: 200_000, ins: 200_000, ev: 500_000, ev_l: 300_000 };

    // Czech fossil fuel import totals (external statistics, not in YAML)
    const CZ_GAS_MWH = 60e6;   // ~60 TWh/year natural gas imports
    const CZ_OIL_BBL = 50.4e6; // ~50.4 mil. barrels/year crude oil imports

    // Conversion constants
    const L_PER_BBL     = 158.987;
    const CRUDE_L_PER_L = { petrol: 5, diesel: 2.5 }; // European refinery yields
    const EUR_CZK       = 25;
    const USD_CZK       = 23;

    // ── Resolve measures from YAML ────────────────────────────────────────────
    const byId = (list, id) => list.find(x => x.id === id);
    const bm   = data.buildings_measures;
    const tm   = data.transport_measures;

    const M = {
      hp:   { m: byId(bm, IDS.hp.m),   b: byId(bm, IDS.hp.b)   },
      ins:  { m: byId(bm, IDS.ins.m),  b: byId(bm, IDS.ins.b)  },
      ev:   { m: byId(tm, IDS.ev.m),   b: byId(tm, IDS.ev.b)   },
      ev_l: { m: byId(tm, IDS.ev_l.m), b: byId(tm, IDS.ev_l.b) },
    };

    // ── Annual fuel savings per unit ──────────────────────────────────────────
    // Gas: baseline gas consumption minus measure gas consumption (0 if measure uses electricity)
    const gasPerUnit = {
      hp:  M.hp.b.demand_heat_measure_mwh  - (M.hp.m.fuel  === 'Electricity' ? 0 : M.hp.m.demand_heat_measure_mwh),
      ins: M.ins.b.demand_heat_measure_mwh - M.ins.m.demand_heat_measure_mwh,
    };
    // Oil: baseline liters per year (EV uses no fuel, so all baseline consumption is saved)
    const litresPerUnit = {
      ev:   M.ev.b.demand_energy_per_100km   * M.ev.b.mileage   / 100,
      ev_l: M.ev_l.b.demand_energy_per_100km * M.ev_l.b.mileage / 100,
    };
    const oilFuel = {
      ev:   M.ev.b.fuel.toLowerCase(),
      ev_l: M.ev_l.b.fuel.toLowerCase(),
    };

    // ── CAPEX diff (total across deployed units) ───────────────────────────────
    const bCapex = m => (m.capex_technology_czk || 0) + (m.capex_installation_czk || 0) + (m.capex_preparation_czk || 0);
    const CAPEX = {
      hp:   (bCapex(M.hp.m)  - bCapex(M.hp.b))  * DEPLOY.hp,
      ins:  (bCapex(M.ins.m) - bCapex(M.ins.b)) * DEPLOY.ins,
      ev:   (M.ev.m.capex_czk  - M.ev.b.capex_czk)  * DEPLOY.ev,
      ev_l: (M.ev_l.m.capex_czk - M.ev_l.b.capex_czk) * DEPLOY.ev_l,
    };

    // ── Fill table cells ──────────────────────────────────────────────────────
    const fill = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    const fmtMldSigned = v => (v < 0 ? '−' : '') + Math.abs(v / 1e9).toFixed(0) + ' mld. Kč';

    // Savings per unit
    fill('savings-unit-hp',   gasPerUnit.hp.toFixed(0)  + ' MWh plynu');
    fill('savings-unit-ins',  gasPerUnit.ins.toFixed(0) + ' MWh plynu');
    fill('savings-unit-ev',   (litresPerUnit.ev   / L_PER_BBL).toFixed(1) + ' barelu');
    fill('savings-unit-ev_l', (litresPerUnit.ev_l / L_PER_BBL).toFixed(1) + ' barelu');

    // % of imports
    const gasPct  = (mwh, n) => (mwh * n / CZ_GAS_MWH * 100).toFixed(1).replace('.', ',') + ' %';
    const oilPct  = (l,   n) => (l * n / L_PER_BBL / CZ_OIL_BBL * 100).toFixed(1).replace('.', ',') + ' %';
    fill('savings-imports-hp',   gasPct(gasPerUnit.hp,  DEPLOY.hp));
    fill('savings-imports-ins',  gasPct(gasPerUnit.ins, DEPLOY.ins));
    fill('savings-imports-ev',   oilPct(litresPerUnit.ev,   DEPLOY.ev));
    fill('savings-imports-ev_l', oilPct(litresPerUnit.ev_l, DEPLOY.ev_l));

    // CAPEX diff
    ['hp', 'ins', 'ev', 'ev_l'].forEach(k => fill('capex-diff-' + k, fmtMldSigned(CAPEX[k])));

    // ── Import price scenarios ────────────────────────────────────────────────
    const IMPORT_SC = [
      { key: 'low',  label: 'Běžné ceny',       color: '#2860b4', gas_eur_mwh: 40,  oil_usd_bbl: 80  },
      { key: 'high', label: 'Energetická krize', color: '#c43535', gas_eur_mwh: 180, oil_usd_bbl: 150 },
    ];

    // Price column labels
    const gasLabel = `€${IMPORT_SC[0].gas_eur_mwh}–${IMPORT_SC[1].gas_eur_mwh}/MWh`;
    const oilLabel = `$${IMPORT_SC[0].oil_usd_bbl}–${IMPORT_SC[1].oil_usd_bbl}/barel`;
    fill('fuel-price-hp',   gasLabel);
    fill('fuel-price-ins',  gasLabel);
    fill('fuel-price-ev',   oilLabel);
    fill('fuel-price-ev_l', oilLabel);

    // ── Fuel import value (CZK) ───────────────────────────────────────────────
    const gasVal = (mwh, n, years, sc) => mwh * n * years * sc.gas_eur_mwh * EUR_CZK;
    const oilVal = (l,   n, years, sc, fuel) =>
      l * CRUDE_L_PER_L[fuel] / L_PER_BBL * n * years * sc.oil_usd_bbl * USD_CZK;

    const fuelValue = {};
    IMPORT_SC.forEach(sc => {
      fuelValue[sc.key] = {
        hp:   gasVal(gasPerUnit.hp,       DEPLOY.hp,  M.hp.m.lifetime,   sc),
        ins:  gasVal(gasPerUnit.ins,      DEPLOY.ins, M.ins.m.lifetime,  sc),
        ev:   oilVal(litresPerUnit.ev,    DEPLOY.ev,  M.ev.m.lifetime,   sc, oilFuel.ev),
        ev_l: oilVal(litresPerUnit.ev_l,  DEPLOY.ev_l, M.ev_l.m.lifetime, sc, oilFuel.ev_l),
      };
    });

    // Shared x-domain across all measures and scenarios
    const allFuels = ['hp', 'ins', 'ev', 'ev_l'].flatMap(k => IMPORT_SC.map(sc => fuelValue[sc.key][k]));
    const domMax   = Math.max(...allFuels) * 1.05;

    ['hp', 'ins', 'ev', 'ev_l'].forEach(k => {
      const el  = document.getElementById('net-benefit-bar-' + k);
      const vals = IMPORT_SC.map(sc => fuelValue[sc.key][k]);
      if (el) renderNetBar(el, vals, CAPEX[k], domMax, IMPORT_SC);
    });
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
    addDownloadBars();
    renderImportCostTable();
  }

  // ── Gas savings range chart ────────────────────────────────────────────────
  function renderGasSavingsRangeChart() {
    const el = document.getElementById('gas-savings-range-chart');
    if (!el) return;

    const N         = 200_000;
    const TOTAL_GAS = 60;      // TWh Czech gas imports
    const LOW_MWH   = 24;
    const HIGH_MWH  = 34;
    const STEPS     = 50;

    const pts = d3.range(LOW_MWH, HIGH_MWH + 0.001, (HIGH_MWH - LOW_MWH) / STEPS)
      .map(c => ({ mwh: c, twh: N * c / 1e6 }));

    const lowTWh  = N * LOW_MWH  / 1e6;
    const highTWh = N * HIGH_MWH / 1e6;

    const W = 560, H = 180;
    const ML = 54, MR = 90, MT = 28, MB = 44;
    const iW = W - ML - MR, iH = H - MT - MB;

    el.innerHTML = '';
    const svg = d3.select(el)
      .append('svg')
        .attr('viewBox', `0 0 ${W} ${H}`)
        .attr('style', 'max-width:560px; width:100%; display:block;');

    const g = svg.append('g').attr('transform', `translate(${ML},${MT})`);

    const x = d3.scaleLinear().domain([LOW_MWH, HIGH_MWH]).range([0, iW]);
    const y = d3.scaleLinear().domain([0, Math.ceil(highTWh + 1)]).range([iH, 0]).nice();

    // Gridlines
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickSize(-iW).tickFormat(''))
      .call(ax => { ax.select('.domain').remove(); ax.selectAll('line').attr('stroke', '#eee'); });

    // Area
    g.append('path')
      .datum(pts)
      .attr('d', d3.area().x(d => x(d.mwh)).y0(iH).y1(d => y(d.twh)).curve(d3.curveBasis))
      .attr('fill', '#2860b4').attr('opacity', 0.15);

    // Line
    g.append('path')
      .datum(pts)
      .attr('d', d3.line().x(d => x(d.mwh)).y(d => y(d.twh)).curve(d3.curveBasis))
      .attr('fill', 'none').attr('stroke', '#2860b4').attr('stroke-width', 2);

    // Endpoint dots
    [[LOW_MWH, lowTWh], [HIGH_MWH, highTWh]].forEach(([mwh, twh]) => {
      g.append('circle').attr('cx', x(mwh)).attr('cy', y(twh))
        .attr('r', 5).attr('fill', '#2860b4');
    });

    // Endpoint labels
    g.append('text').attr('x', x(LOW_MWH)).attr('y', y(lowTWh) - 10)
      .attr('text-anchor', 'middle').attr('font-size', 11).attr('fill', '#2860b4').attr('font-weight', 600)
      .text(`${lowTWh.toFixed(1)} TWh (${(lowTWh / TOTAL_GAS * 100).toFixed(0)} %)`);
    g.append('text').attr('x', x(HIGH_MWH)).attr('y', y(highTWh) - 10)
      .attr('text-anchor', 'middle').attr('font-size', 11).attr('fill', '#2860b4').attr('font-weight', 600)
      .text(`${highTWh.toFixed(1)} TWh (${(highTWh / TOTAL_GAS * 100).toFixed(1)} %)`);

    // Axes
    g.append('g').attr('class', 'chart-axis').attr('transform', `translate(0,${iH})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d => d + ' MWh'));
    g.append('g').attr('class', 'chart-axis')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + ' TWh'));

    // Axis labels
    g.append('text').attr('x', iW / 2).attr('y', iH + 36)
      .attr('text-anchor', 'middle').attr('font-size', 11).attr('fill', '#888')
      .text('Průměrná spotřeba tepla budovy (MWh/rok)');
    svg.append('text')
      .attr('transform', `translate(12,${MT + iH / 2}) rotate(-90)`)
      .attr('text-anchor', 'middle').attr('font-size', 11).attr('fill', '#888')
      .text('Celková úspora plynu (TWh/rok)');
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
        if (!expanded) {
          renderStaticComparisonChart(staticEl);
          fokDownloadBar(staticEl, 'quadrant-porovnani');
        }
      });
    }

    setupControls();
    renderAll();
    renderGasSavingsRangeChart();
    window.addEventListener('resize', renderAll);
    // sensitivity beeswarm initialised by costs-benefits-beeswarm.js
  }

  // Icons for the beeswarm chart — embedded as data URIs so exported SVGs are self-contained
  const SB_ICONS = {
    'Uhelný kotel':     'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMi43MDM0OTIgMjYuMTU5NDMiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEsIC5jbHMtMiB7CiAgICAgICAgZmlsbDogIzhjM2Y1ZjsKICAgICAgfQoKICAgICAgLmNscy0xLCAuY2xzLTIsIC5jbHMtMywgLmNscy00IHsKICAgICAgICBzdHJva2Utd2lkdGg6IC4yNXB4OwogICAgICB9CgogICAgICAuY2xzLTEsIC5jbHMtMiwgLmNscy0zLCAuY2xzLTQsIC5jbHMtNSB7CiAgICAgICAgc3Ryb2tlOiAjMzMzOwogICAgICAgIHN0cm9rZS1saW5lam9pbjogcm91bmQ7CiAgICAgIH0KCiAgICAgIC5jbHMtMSwgLmNscy00LCAuY2xzLTUgewogICAgICAgIHN0cm9rZS1saW5lY2FwOiByb3VuZDsKICAgICAgfQoKICAgICAgLmNscy0zIHsKICAgICAgICBmaWxsOiAjZTNlNmViOwogICAgICB9CgogICAgICAuY2xzLTQsIC5jbHMtNiB7CiAgICAgICAgZmlsbDogI2ZmZjsKICAgICAgfQoKICAgICAgLmNscy01IHsKICAgICAgICBmaWxsOiBub25lOwogICAgICB9CgogICAgICAuY2xzLTUsIC5jbHMtNiB7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAuNXB4OwogICAgICB9CgogICAgICAuY2xzLTYgewogICAgICAgIGZpbGwtcnVsZTogZXZlbm9kZDsKICAgICAgICBzdHJva2U6ICM3NTgwOGU7CiAgICAgICAgc3Ryb2tlLWxpbmVqb2luOiBiZXZlbDsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj4KICAgIDxnPgogICAgICA8Zz4KICAgICAgICA8Zz4KICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSIxMy4yODE2NzEgMTkuNTQ1MzUgNi43MDMzNTcgNi4zMjM2NTMgLjEyNSAxMS45NDkzNDIgMS43NjQ0NDQgMTIuODk1ODc1IDEuNzY0NDQ0IDE5LjAzNDIyIDExLjY0MjI3MSAyNC43MzcxODcgMTEuNjQyMjcxIDE4LjU5ODg0MiAxMy4yODE2NzEgMTkuNTQ1MzUiLz4KICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSIyMy44NjI2MyAxMy40MzgyMTkgMTcuMjg0MzE2IC4yMTY1MjIgMTAuNzA1OTU5IDUuODQyMjExIDEyLjM0NTQwMyA2Ljc4ODc0NSAxMi4zNDU0MDMgMTIuOTI3MDkgMjIuMjIzMjMgMTguNjMwMDU2IDIyLjIyMzIzIDEyLjQ5MTcxMSAyMy44NjI2MyAxMy40MzgyMTkiLz4KICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSIxNy4yODQzMTYgLjIxNjUyMiA2LjcwMzM1NyA2LjMyMzY1MyAxMy4yODE2NzEgMTkuNTQ1MzUgMjMuODYyNjMgMTMuNDM4MjE5IDE3LjI4NDMxNiAuMjE2NTIyIi8+CiAgICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTYiIHBvaW50cz0iMTEuNjQyMjcxIDI0LjczNzE4NyAyMi4yMjMyMyAxOC42MzAwNTYgMjIuMjIzMjMgMTQuMzg0NDUgMTMuMjgxNjcxIDE5LjU0NTM1IDExLjY0MjI3MSAxOC41OTg4NDIgMTEuNjQyMjcxIDI0LjczNzE4NyIvPgogICAgICAgIDwvZz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTYiIHBvaW50cz0iNS43ODk3MDggMTguNzA4NTUzIDMuNDE3NzcyIDE3LjMzOTExNSAzLjQxNzc3MiAxMy44ODg2MjQgNS43ODk3MDggMTUuMjU4MDYyIDUuNzg5NzA4IDE4LjcwODU1MyIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSI5LjM0NzgwMSAyMC43NjI4MTkgNi45NzU4NjUgMTkuMzkzMzgxIDYuOTc1ODY1IDE1Ljk0Mjg5IDkuMzQ3ODAxIDE3LjMxMjMyOCA5LjM0NzgwMSAyMC43NjI4MTkiLz4KICAgICAgPC9nPgogICAgICA8Zz4KICAgICAgICA8Zz4KICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMyIgcG9pbnRzPSIyMi4xOTk4NzQgMjUuOTA5NDMgMTcuMjY5ODQ0IDIzLjA2MzA3NSAxNy4yNjk4NDQgNi45MTY5OTQgMjIuMTk5ODc0IDkuNzYzMzQ4IDIyLjE5OTg3NCAyNS45MDk0MyIvPgogICAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0zIiBwb2ludHM9IjMyLjQ1MzQ5MiAzLjg0MzQxOSAyMi4yMjIwNDIgOS43MzYxNCAxNy4yNjk4NDQgNi45MTY5OTQgMjcuNTAxMjkzIDEuMDI0MjcyIDMyLjQ1MzQ5MiAzLjg0MzQxOSIvPgogICAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0zIiBwb2ludHM9IjMyLjQ1MzQ5MiAxOS45ODk1MDEgMjIuMTk5ODc0IDI1LjkwOTQzIDIyLjE5OTg3NCA5Ljc2MzM0OCAzMi40NTM0OTIgMy44NDM0MTkgMzIuNDUzNDkyIDE5Ljk4OTUwMSIvPgogICAgICAgIDwvZz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTUiIHBvaW50cz0iMTcuMjY5ODQ0IDYuOTE2OTk0IDI3LjUwMTI5MyAxLjAyNDI3MiAzMi40NTM0OTIgMy44NDM0MTkgMzIuNDUzNDkyIDE5Ljk4OTUwMSAyMi4xOTk4NzQgMjUuOTA5NDMgMTcuMjY5ODQ0IDIzLjA2MzA3NSAxNy4yNjk4NDQgNi45MTY5OTQiLz4KICAgICAgICA8Zz4KICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIzMS4xMDQyNTYgMTEuMDk3NTQ2IDIzLjg4MzcxIDE1LjI2NjMzIDIzLjg4MzcxIDIzLjU0MzU0MSAzMS4xMDQyNTYgMTkuMzc0NzU3IDMxLjEwNDI1NiAxMS4wOTc1NDYiLz4KICAgICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTI3LjE1MTc4MiwxNS40ODk4NjdjLS4wMDA1OTYuMDAwMDAzLS4wMDE0OTEuMDAxMjAyLS4wMDExOTMuMDAxNzE0LjQ4MjcxNiwxLjE4MDQwNS0xLjE0MTM1MiwyLjA4NzYxNy0xLjIxMzI1MSwzLjcyMDIxNS0uMDY1MTMsMS40Nzg4OTYuNzg2MTY5LDEuMzYxMzIsMS41NjM3NjcuOTE5MzkzLjc4MjcyOC0uNDQ0ODQzLDEuNjA5MjcxLTEuNTUwNjcsMS42MDkyNzEtMi43Mzc3MDYsMC0uOTAzMDA5LS43MTI4OTQtLjYxNjg1Ny0uMzU2Mjk4LTEuNTgxODUzLS40MjkwNDguMjkxODAyLS43MDEzNzQuNzg1NDI1LS42MTE3MjcsMS4yNTYzMDYuMDU4MzQ2LjMwNjQ2OS0uMjIwMjc1LjY5Mzg1OC0uNDM1NDI4LjY4MDA3Ni0uMTkwODM1LS4wMTIyMjQtLjE2OTUyOS0uMjk1NS0uMDAyNTYxLS41Nzk4ODMuMzU2Mjk4LS42MDA4MTguNDcwMDk5LTEuNTkxNjE5LS41NTI1OC0xLjY3ODI2MSIvPgogICAgICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjUuMjIzNjA3LDEyLjY1NTQyMmMwLC40MjQxNDktLjI5OTk0Ni45NDExNjQtLjY2OTk0OSwxLjE1NDc4NXMtLjY2OTk0OS4wNDI5NTQtLjY2OTk0OS0uMzgxMTk1YzAtLjQyNDE0OS4yOTk5NDYtLjk0MTE2NC42Njk5NDktMS4xNTQ3ODVzLjY2OTk0OS0uMDQyOTU0LjY2OTk0OS4zODExOTVaIi8+CiAgICAgICAgICA8bGluZSBjbGFzcz0iY2xzLTQiIHgxPSIyNS44MDQ4NzIiIHkxPSIxMS45ODU3NzEiIHgyPSIzMS4xMDQyNTYiIHkyPSI4LjkyNjE3Ii8+CiAgICAgICAgICA8bGluZSBjbGFzcz0iY2xzLTQiIHgxPSIyNS44MDQ4NzIiIHkxPSIxMi42NTM4ODciIHgyPSIzMS4xMDQyNTYiIHkyPSI5LjU5NDI4NiIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgIDxsaW5lIGNsYXNzPSJjbHMtNCIgeDE9IjE4LjMzMzc2IiB5MT0iMjIuMDc0NTYxIiB4Mj0iMjAuODc4MTA5IiB5Mj0iMjMuNTQzNTQxIi8+CiAgICAgICAgICA8bGluZSBjbGFzcz0iY2xzLTQiIHgxPSIxOC4zMzM3NiIgeTE9IjIxLjQwODU0NCIgeDI9IjIwLjg3ODEwOSIgeTI9IjIyLjg3NzUyNSIvPgogICAgICAgICAgPGxpbmUgY2xhc3M9ImNscy00IiB4MT0iMTguMzMzNzYiIHkxPSIyMC43NDI1MjciIHgyPSIyMC44NzgxMDkiIHkyPSIyMi4yMTE1MDgiLz4KICAgICAgICAgIDxsaW5lIGNsYXNzPSJjbHMtNCIgeDE9IjE4LjMzMzc2IiB5MT0iMjAuMDc2NTExIiB4Mj0iMjAuODc4MTA5IiB5Mj0iMjEuNTQ1NDkyIi8+CiAgICAgICAgICA8bGluZSBjbGFzcz0iY2xzLTQiIHgxPSIxOC4zMzM3NiIgeTE9IjE5LjQzMzQ2IiB4Mj0iMjAuODc4MTA5IiB5Mj0iMjAuOTAyNDQxIi8+CiAgICAgICAgPC9nPgogICAgICA8L2c+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=',
    'Plynový kotel':    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMi43MDM0OTIgMjYuMTU5NDMiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6ICNlM2U2ZWI7CiAgICAgIH0KCiAgICAgIC5jbHMtMSwgLmNscy0yLCAuY2xzLTMsIC5jbHMtNCwgLmNscy01IHsKICAgICAgICBzdHJva2U6ICMzMzM7CiAgICAgICAgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDsKICAgICAgfQoKICAgICAgLmNscy0xLCAuY2xzLTIsIC5jbHMtMywgLmNscy01IHsKICAgICAgICBzdHJva2Utd2lkdGg6IC4yNXB4OwogICAgICB9CgogICAgICAuY2xzLTIsIC5jbHMtMywgLmNscy00IHsKICAgICAgICBzdHJva2UtbGluZWNhcDogcm91bmQ7CiAgICAgIH0KCiAgICAgIC5jbHMtMiwgLmNscy01IHsKICAgICAgICBmaWxsOiAjZTM3MzczOwogICAgICB9CgogICAgICAuY2xzLTMsIC5jbHMtNiB7CiAgICAgICAgZmlsbDogI2ZmZjsKICAgICAgfQoKICAgICAgLmNscy00IHsKICAgICAgICBmaWxsOiBub25lOwogICAgICB9CgogICAgICAuY2xzLTQsIC5jbHMtNiB7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAuNXB4OwogICAgICB9CgogICAgICAuY2xzLTYgewogICAgICAgIGZpbGwtcnVsZTogZXZlbm9kZDsKICAgICAgICBzdHJva2U6ICM3NTgwOGU7CiAgICAgICAgc3Ryb2tlLWxpbmVqb2luOiBiZXZlbDsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj4KICAgIDxnPgogICAgICA8Zz4KICAgICAgICA8Zz4KICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSIxMy4yODE2NzEgMTkuNTQ1MzUgNi43MDMzNTcgNi4zMjM2NTMgLjEyNSAxMS45NDkzNDIgMS43NjQ0NDQgMTIuODk1ODc1IDEuNzY0NDQ0IDE5LjAzNDIyIDExLjY0MjI3MSAyNC43MzcxODcgMTEuNjQyMjcxIDE4LjU5ODg0MiAxMy4yODE2NzEgMTkuNTQ1MzUiLz4KICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSIyMy44NjI2MyAxMy40MzgyMTkgMTcuMjg0MzE2IC4yMTY1MjIgMTAuNzA1OTU5IDUuODQyMjExIDEyLjM0NTQwMyA2Ljc4ODc0NSAxMi4zNDU0MDMgMTIuOTI3MDkgMjIuMjIzMjMgMTguNjMwMDU2IDIyLjIyMzIzIDEyLjQ5MTcxMSAyMy44NjI2MyAxMy40MzgyMTkiLz4KICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSIxNy4yODQzMTYgLjIxNjUyMiA2LjcwMzM1NyA2LjMyMzY1MyAxMy4yODE2NzEgMTkuNTQ1MzUgMjMuODYyNjMgMTMuNDM4MjE5IDE3LjI4NDMxNiAuMjE2NTIyIi8+CiAgICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTYiIHBvaW50cz0iMTEuNjQyMjcxIDI0LjczNzE4NyAyMi4yMjMyMyAxOC42MzAwNTYgMjIuMjIzMjMgMTQuMzg0NDUgMTMuMjgxNjcxIDE5LjU0NTM1IDExLjY0MjI3MSAxOC41OTg4NDIgMTEuNjQyMjcxIDI0LjczNzE4NyIvPgogICAgICAgIDwvZz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTYiIHBvaW50cz0iNS43ODk3MDggMTguNzA4NTUzIDMuNDE3NzcyIDE3LjMzOTExNSAzLjQxNzc3MiAxMy44ODg2MjQgNS43ODk3MDggMTUuMjU4MDYyIDUuNzg5NzA4IDE4LjcwODU1MyIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSI5LjM0NzgwMSAyMC43NjI4MTkgNi45NzU4NjUgMTkuMzkzMzgxIDYuOTc1ODY1IDE1Ljk0Mjg5IDkuMzQ3ODAxIDE3LjMxMjMyOCA5LjM0NzgwMSAyMC43NjI4MTkiLz4KICAgICAgPC9nPgogICAgICA8Zz4KICAgICAgICA8Zz4KICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIyMi4xOTk4NzQgMjUuOTA5NDMgMTcuMjY5ODQ0IDIzLjA2MzA3NSAxNy4yNjk4NDQgNi45MTY5OTQgMjIuMTk5ODc0IDkuNzYzMzQ4IDIyLjE5OTg3NCAyNS45MDk0MyIvPgogICAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjMyLjQ1MzQ5MiAzLjg0MzQxOSAyMi4yMjIwNDIgOS43MzYxNCAxNy4yNjk4NDQgNi45MTY5OTQgMjcuNTAxMjkzIDEuMDI0MjcyIDMyLjQ1MzQ5MiAzLjg0MzQxOSIvPgogICAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjMyLjQ1MzQ5MiAxOS45ODk1MDEgMjIuMTk5ODc0IDI1LjkwOTQzIDIyLjE5OTg3NCA5Ljc2MzM0OCAzMi40NTM0OTIgMy44NDM0MTkgMzIuNDUzNDkyIDE5Ljk4OTUwMSIvPgogICAgICAgIDwvZz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTQiIHBvaW50cz0iMTcuMjY5ODQ0IDYuOTE2OTk0IDI3LjUwMTI5MyAxLjAyNDI3MiAzMi40NTM0OTIgMy44NDM0MTkgMzIuNDUzNDkyIDE5Ljk4OTUwMSAyMi4xOTk4NzQgMjUuOTA5NDMgMTcuMjY5ODQ0IDIzLjA2MzA3NSAxNy4yNjk4NDQgNi45MTY5OTQiLz4KICAgICAgICA8Zz4KICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNSIgcG9pbnRzPSIzMS4xMDQyNTYgMTEuMDk3NTQ2IDIzLjg4MzcxIDE1LjI2NjMzIDIzLjg4MzcxIDIzLjU0MzU0MSAzMS4xMDQyNTYgMTkuMzc0NzU3IDMxLjEwNDI1NiAxMS4wOTc1NDYiLz4KICAgICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTI3LjE1MTc4MiwxNS40ODk4NjdjLS4wMDA1OTYuMDAwMDAzLS4wMDE0OTEuMDAxMjAyLS4wMDExOTMuMDAxNzE0LjQ4MjcxNiwxLjE4MDQwNS0xLjE0MTM1MiwyLjA4NzYxNy0xLjIxMzI1MSwzLjcyMDIxNS0uMDY1MTMsMS40Nzg4OTYuNzg2MTY5LDEuMzYxMzIsMS41NjM3NjcuOTE5MzkzLjc4MjcyOC0uNDQ0ODQzLDEuNjA5MjcxLTEuNTUwNjcsMS42MDkyNzEtMi43Mzc3MDYsMC0uOTAzMDA5LS43MTI4OTQtLjYxNjg1Ny0uMzU2Mjk4LTEuNTgxODUzLS40MjkwNDguMjkxODAyLS43MDEzNzQuNzg1NDI1LS42MTE3MjcsMS4yNTYzMDYuMDU4MzQ2LjMwNjQ2OS0uMjIwMjc1LjY5Mzg1OC0uNDM1NDI4LjY4MDA3Ni0uMTkwODM1LS4wMTIyMjQtLjE2OTUyOS0uMjk1NS0uMDAyNTYxLS41Nzk4ODMuMzU2Mjk4LS42MDA4MTguNDcwMDk5LTEuNTkxNjE5LS41NTI1OC0xLjY3ODI2MSIvPgogICAgICAgICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjUuMjIzNjA3LDEyLjY1NTQyMmMwLC40MjQxNDktLjI5OTk0Ni45NDExNjQtLjY2OTk0OSwxLjE1NDc4NXMtLjY2OTk0OS4wNDI5NTQtLjY2OTk0OS0uMzgxMTk1YzAtLjQyNDE0OS4yOTk5NDYtLjk0MTE2NC42Njk5NDktMS4xNTQ3ODVzLjY2OTk0OS0uMDQyOTU0LjY2OTk0OS4zODExOTVaIi8+CiAgICAgICAgICA8bGluZSBjbGFzcz0iY2xzLTMiIHgxPSIyNS44MDQ4NzIiIHkxPSIxMS45ODU3NzEiIHgyPSIzMS4xMDQyNTYiIHkyPSI4LjkyNjE3Ii8+CiAgICAgICAgICA8bGluZSBjbGFzcz0iY2xzLTMiIHgxPSIyNS44MDQ4NzIiIHkxPSIxMi42NTM4ODciIHgyPSIzMS4xMDQyNTYiIHkyPSI5LjU5NDI4NiIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgIDxsaW5lIGNsYXNzPSJjbHMtMyIgeDE9IjE4LjMzMzc2IiB5MT0iMjIuMDc0NTYxIiB4Mj0iMjAuODc4MTA5IiB5Mj0iMjMuNTQzNTQxIi8+CiAgICAgICAgICA8bGluZSBjbGFzcz0iY2xzLTMiIHgxPSIxOC4zMzM3NiIgeTE9IjIxLjQwODU0NCIgeDI9IjIwLjg3ODEwOSIgeTI9IjIyLjg3NzUyNSIvPgogICAgICAgICAgPGxpbmUgY2xhc3M9ImNscy0zIiB4MT0iMTguMzMzNzYiIHkxPSIyMC43NDI1MjciIHgyPSIyMC44NzgxMDkiIHkyPSIyMi4yMTE1MDgiLz4KICAgICAgICAgIDxsaW5lIGNsYXNzPSJjbHMtMyIgeDE9IjE4LjMzMzc2IiB5MT0iMjAuMDc2NTExIiB4Mj0iMjAuODc4MTA5IiB5Mj0iMjEuNTQ1NDkyIi8+CiAgICAgICAgICA8bGluZSBjbGFzcz0iY2xzLTMiIHgxPSIxOC4zMzM3NiIgeTE9IjE5LjQzMzQ2IiB4Mj0iMjAuODc4MTA5IiB5Mj0iMjAuOTAyNDQxIi8+CiAgICAgICAgPC9nPgogICAgICA8L2c+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=',
    'Tepelné čerpadlo': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNS4zMTY0MSAyOC4zNDU4NDQiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6ICNlM2U2ZWI7CiAgICAgIH0KCiAgICAgIC5jbHMtMSwgLmNscy0yLCAuY2xzLTMgewogICAgICAgIHN0cm9rZS13aWR0aDogLjI1cHg7CiAgICAgIH0KCiAgICAgIC5jbHMtMSwgLmNscy0yLCAuY2xzLTMsIC5jbHMtNCB7CiAgICAgICAgc3Ryb2tlOiAjMzMzOwogICAgICAgIHN0cm9rZS1saW5lam9pbjogcm91bmQ7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgZmlsbDogIzM1OTc4ZjsKICAgICAgfQoKICAgICAgLmNscy0zLCAuY2xzLTUgewogICAgICAgIGZpbGw6ICNmZmY7CiAgICAgIH0KCiAgICAgIC5jbHMtNSB7CiAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkOwogICAgICAgIHN0cm9rZTogIzc1ODA4ZTsKICAgICAgICBzdHJva2UtbGluZWpvaW46IGJldmVsOwogICAgICB9CgogICAgICAuY2xzLTUsIC5jbHMtNCB7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAuNXB4OwogICAgICB9CgogICAgICAuY2xzLTQgewogICAgICAgIGZpbGw6IG5vbmU7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+CiAgICA8Zz4KICAgICAgPGc+CiAgICAgICAgPGc+CiAgICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTUiIHBvaW50cz0iMTMuMjgxNjcxIDE5LjU0NTM1IDYuNzAzMzU3IDYuMzIzNjUzIC4xMjUgMTEuOTQ5MzQyIDEuNzY0NDQ0IDEyLjg5NTg3NSAxLjc2NDQ0NCAxOS4wMzQyMiAxMS42NDIyNzEgMjQuNzM3MTg3IDExLjY0MjI3MSAxOC41OTg4NDIgMTMuMjgxNjcxIDE5LjU0NTM1Ii8+CiAgICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTUiIHBvaW50cz0iMjMuODYyNjMgMTMuNDM4MjE5IDE3LjI4NDMxNiAuMjE2NTIyIDEwLjcwNTk1OSA1Ljg0MjIxMSAxMi4zNDU0MDMgNi43ODg3NDUgMTIuMzQ1NDAzIDEyLjkyNzA5IDIyLjIyMzIzIDE4LjYzMDA1NiAyMi4yMjMyMyAxMi40OTE3MTEgMjMuODYyNjMgMTMuNDM4MjE5Ii8+CiAgICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTUiIHBvaW50cz0iMTcuMjg0MzE2IC4yMTY1MjIgNi43MDMzNTcgNi4zMjM2NTMgMTMuMjgxNjcxIDE5LjU0NTM1IDIzLjg2MjYzIDEzLjQzODIxOSAxNy4yODQzMTYgLjIxNjUyMiIvPgogICAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjExLjY0MjI3MSAyNC43MzcxODcgMjIuMjIzMjMgMTguNjMwMDU2IDIyLjIyMzIzIDE0LjM4NDQ1IDEzLjI4MTY3MSAxOS41NDUzNSAxMS42NDIyNzEgMTguNTk4ODQyIDExLjY0MjI3MSAyNC43MzcxODciLz4KICAgICAgICA8L2c+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjUuNzg5NzA4IDE4LjcwODU1MyAzLjQxNzc3MiAxNy4zMzkxMTUgMzQuMTc3NzIgMTMuODg4NjI0IDUuNzg5NzA4IDE1LjI1ODA2MiA1Ljc4OTcwOCAxOC43MDg1NTMiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTUiIHBvaW50cz0iOS4zNDc4MDEgMjAuNzYyODE5IDYuOTc1ODY1IDE5LjM5MzM4MSA2Ljk3NTg2NSAxNS45NDI4OSA5LjM0NzgwMSAxNy4zMTIzMjggOS4zNDc4MDEgMjAuNzYyODE5Ii8+CiAgICAgIDwvZz4KICAgICAgPGc+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjIxLjE3ODMzNyAyOC4wODcxNTMgMTUuMzgwODA2IDI0LjczOTk0NiAxNS4zODA4MDYgMTIuODE3MzQ3IDIxLjE3ODMzNyAxNi4xNjQ1NTMgMjEuMTc4MzM3IDI4LjA4NzE1MyIvPgogICAgICAgIDxsaW5lIGNsYXNzPSJjbHMtMyIgeDE9IjE5LjIxMzQ0MiIgeTE9IjE3LjA4NTI4OCIgeDI9IjE3LjAxNTE5NSIgeTI9IjE1LjgxNjEzIi8+CiAgICAgICAgPGxpbmUgY2xhc3M9ImNscy0zIiB4MT0iMTkuMjEzNDQyIiB5MT0iMTguMTA2OTY2IiB4Mj0iMTcuMDE1MTk1IiB5Mj0iMTYuODM3ODA4Ii8+CiAgICAgICAgPGxpbmUgY2xhc3M9ImNscy0zIiB4MT0iMTkuMjEzNDQyIiB5MT0iMTkuMTI4NjQ0IiB4Mj0iMTcuMDE1MTk1IiB5Mj0iMTcuODU5NDg2Ii8+CiAgICAgICAgPGxpbmUgY2xhc3M9ImNscy0zIiB4MT0iMTkuMjEzNDQyIiB5MT0iMjAuMTUwMzIyIiB4Mj0iMTcuMDE1MTk1IiB5Mj0iMTguODgxMTY0Ii8+CiAgICAgICAgPGxpbmUgY2xhc3M9ImNscy0zIiB4MT0iMTkuMjEzNDQyIiB5MT0iMjEuMTcyIiB4Mj0iMTcuMDE1MTk1IiB5Mj0iMTkuOTAyODQyIi8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjM1LjEyMzA1NSA4LjA1MzU1NSAyOS4zNjc0OTMgNC43MzA1NzkgMTUuMzgwODA2IDEyLjgwNTc5NyAyMS4xMzYzNjggMTYuMTI4NzcyIDM1LjEyMzA1NSA4LjA1MzU1NSIvPgogICAgICAgIDxnPgogICAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjM1LjE2NDIyIDIwLjAxMTkzNSAyMS4xNzc1MzMgMjguMDg3MTUzIDIxLjE3NzUzMyAxNi4xNjQ1NTMgMzUuMTY0MjIgOC4wODkzMzYgMzUuMTY0MjIgMjAuMDExOTM1Ii8+CiAgICAgICAgICA8bGluZSBjbGFzcz0iY2xzLTMiIHgxPSIzMS42NDEyNDEiIHkxPSIxMi4xMjgiIHgyPSIzMy44Mzk0ODgiIHkyPSIxMC44NTg4NDEiLz4KICAgICAgICAgIDxsaW5lIGNsYXNzPSJjbHMtMyIgeDE9IjMxLjY0MTI0MSIgeTE9IjEzLjE0OTY3NyIgeDI9IjMzLjgzOTQ4OCIgeTI9IjExLjg4MDUxOSIvPgogICAgICAgICAgPGxpbmUgY2xhc3M9ImNscy0zIiB4MT0iMzEuNjQxMjQxIiB5MT0iMTQuMTcxMzU1IiB4Mj0iMzMuODM5NDg4IiB5Mj0iMTIuOTAyMTk3Ii8+CiAgICAgICAgICA8bGluZSBjbGFzcz0iY2xzLTMiIHgxPSIzMS42NDEyNDEiIHkxPSIxNS4xOTMwMzMiIHgyPSIzMy44Mzk0ODgiIHkyPSIxMy45MjM4NzUiLz4KICAgICAgICAgIDxsaW5lIGNsYXNzPSJjbHMtMyIgeDE9IjMxLjY0MTI0MSIgeTE9IjE2LjIxNDcxMSIgeDI9IjMzLjgzOTQ4OCIgeTI9IjE0Ljk0NTU1MyIvPgogICAgICAgICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzAuMjYwNTM1LDE3LjAxMTg2MmMwLDIuNDQ3NzE5LTEuNzMwOTU3LDUuNDMxMzU1LTMuODY2MjAxLDYuNjY0MTM5LTIuMTM1MjQ0LDEuMjMyNzg0LTMuODY2MjAxLjI0Nzg4NC0zLjg2NjIwMS0yLjE5OTgzNCwwLTIuNDQ3NzE5LDEuNzMwOTU3LTUuNDMxMzU1LDMuODY2MjAxLTYuNjY0MTM5LDIuMTM1MjQ0LTEuMjMyNzg0LDMuODY2MjAxLS4yNDc4ODQsMy44NjYyMDEsMi4xOTk4MzRaIi8+CiAgICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggY2xhc3M9ImNscy0zIiBkPSJNMjMuODM3NjI0LDE5LjA2MTYxOWwyLjU1Njg4OS4yMjQxMDgtMi40NzQ4NiwzLjA2MzQyNWMtLjI3ODQ5Ny0uMzQ2NDctLjQzNDM1MS0uODQ4MzItLjQzNDM1MS0xLjQ4NzExMiwwLS41NzMwMjYuMTMxMjQ2LTEuMTkzNjc0LjM1MjMyMi0xLjgwMDQyMVoiLz4KICAgICAgICAgICAgPHBhdGggY2xhc3M9ImNscy0zIiBkPSJNMjguODc3NTc2LDE5LjQ5NjA5N2MtLjUwNzk3NywxLjI0MjA5My0xLjQzNDA5OCwyLjQxNTU4MS0yLjQ4MzA2MywzLjAyMTIwMXYtMy4yMzE1NzFsMi40ODMwNjMuMjEwMzY5WiIvPgogICAgICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0yOC45NTk0MDQsMTYuMTA0NTU4bC0yLjU2NDg5MiwzLjE4MTE3di0zLjQ0NzYxN2MxLjEwNjM4NS0uNjM4NzcxLDIuMDczMzIxLS40OTI0NzUsMi41NjQ4OTIuMjY2NDQ3WiIvPgogICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTQiIHBvaW50cz0iMjkuMjY5NzgyIDQuODA1NTc1IDE1LjI4Mjk5NCAxMi44MjYxMDEgMTUuMjgyOTk0IDI0Ljc0ODc0MiAyMS4wNzk4OTYgMjguMDk1Mjk1IDIxLjA3OTg5NiAyOC4wOTU4NDQgMjEuMDgwMTcxIDI4LjA5NTg0NCAyMS4wODA3MiAyOC4wOTU4NDQgMjEuMDgwNzIgMjguMDk1Mjk1IDM1LjA2NjQxIDIwLjAyMDk2OSAzNS4wNjY0MSA4LjA5ODMyOCAyOS4yNjk3ODIgNC44MDU1NzUiLz4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+',
  };

  // Shared exports for costs-benefits-beeswarm.js
  window.CB_SHARED = {
    CP_CHART_MEASURES,
    CP_CHART_COLORS,
    TRANSPORT_MEASURE_MAP,
    cpActualName,
    cpIncludesForCat,
    fokDownloadBar,
    fmtCZK,
    SB_ICONS,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
