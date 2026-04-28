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

  // ── Render all charts on the page ─────────────────────────────────────────
  function renderAll() {
    document.querySelectorAll('.tornado-chart[data-category]').forEach(el => {
      renderTornadoChart(el, el.dataset.category, el.dataset.param || 'Cena uhlíku');
    });
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
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
