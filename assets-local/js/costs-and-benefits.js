(function () {
  'use strict';

  const data = window.COSTS_AND_BENEFITS;
  if (!data) return;

  // ── State ────────────────────────────────────────────────────────────────
  // discountRate stored as integer percentage points (0–7); divided by 100 on use.
  const state = {
    carbonPrice:  60,
    discountRate:  3,
    fuelScenario: 'CP',
  };

  // ── Global x-axis domain ─────────────────────────────────────────────────
  // Computed once at init across all measures, all sensitivity params.
  // Fixed so the scale never shifts when controls change.
  let globalXDomain = null;

  function computeGlobalDomain() {
    const allMeasures = [
      ...(data.buildings_measures || []),
      ...(data.transport_measures  || []),
    ].filter(m => m.measure_baseline_id || m.measure_baseline);

    const vals = [];

    // Sample across boundary parameter values to get a wide domain.
    const carbonPrices  = [0, 60, 200];
    const discountRates = [0, 0.03, 0.07];
    const scenarios     = ['CP', 'NZ', 'CP_EC'];

    for (const m of allMeasures) {
      for (const cp of carbonPrices) {
        for (const dr of discountRates) {
          for (const sc of scenarios) {
            try {
              const result = CostsBenefits.calculate({
                measureId:      m.id,
                data,
                discountRate:   dr,
                carbonPriceEur: cp,
                priceScenario:  sc,
              });
              vals.push(result.npv);
              const sens = result.sensitivity || [];
              for (const s of sens) {
                vals.push(s.minNpv, s.maxNpv);
              }
            } catch (_) { /* skip */ }
          }
        }
      }
    }

    if (!vals.length) return [-500000, 500000];

    const [vMin, vMax] = d3.extent(vals);
    const pad = (vMax - vMin) * 0.08 || 50000;
    return d3.scaleLinear()
      .domain([Math.min(vMin - pad, -pad), Math.max(vMax + pad, pad)])
      .nice()
      .domain();
  }

  // ── Calculation ──────────────────────────────────────────────────────────
  // Returns { npv: { value, low, high }, co2Saved } or null on error.
  // Uncertainty range = overall min/max NPV across all sensitivity parameters.
  function computeRow(measure) {
    try {
      const result = CostsBenefits.calculate({
        measureId:      measure.id,
        data,
        discountRate:   state.discountRate / 100,
        carbonPriceEur: state.carbonPrice,
        priceScenario:  state.fuelScenario,
      });

      const sens  = result.sensitivity || [];
      const low   = sens.length ? Math.min(...sens.map(s => s.minNpv)) : result.npv;
      const high  = sens.length ? Math.max(...sens.map(s => s.maxNpv)) : result.npv;

      return {
        npv:      { value: result.npv, low, high },
        co2Saved: result.emissionSavings ? -result.emissionSavings.totalT : null,
      };
    } catch (e) {
      console.warn('CostsBenefits.calculate error for measure id', measure.id, ':', e.message);
      return null;
    }
  }

  // ── Formatting ───────────────────────────────────────────────────────────
  const fmtInt = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 });

  function fmtCZK(v) {
    const sign = v < 0 ? '−\u202f' : '+\u202f';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + (Math.round(abs / 1e5) / 10).toFixed(1) + '\u202fmil. Kč';
    if (abs >= 1e3) return sign + fmtInt.format(Math.round(abs / 1e3))    + '\u202ftis. Kč';
    return sign + fmtInt.format(abs) + '\u202fKč';
  }

  function fmtCO2(savedT) {
    if (savedT === null || savedT === undefined) return '—';
    const sign = savedT < 0 ? '−' : '';
    const abs  = Math.abs(savedT);
    if (abs >= 100) return sign + fmtInt.format(Math.round(abs))            + '\u202ft CO₂';
    if (abs >= 1)   return sign + (Math.round(abs * 10) / 10).toFixed(1)   + '\u202ft CO₂';
    return sign + fmtInt.format(Math.round(abs * 1000)) + '\u202fkg CO₂';
  }

  // ── Controls ─────────────────────────────────────────────────────────────
  function setupControls() {
    setupSlider('carbon-price-slider', 'carbon-price-value', v => {
      state.carbonPrice = v;
      return v + '\u202f€';
    });
    setupSlider('discount-rate-slider', 'discount-rate-value', v => {
      state.discountRate = v;
      return v + '\u202f%';
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

  // ── Summary chart ────────────────────────────────────────────────────────
  const SUMMARY_ROW_H  = 36;
  const SUMMARY_LABEL_W = 260;
  const SUMMARY_MARGIN  = { top: 28, right: 16, bottom: 36 };

  // Color scheme: buildings teal family, transport orange family
  const COLOR_BUILDINGS = '#1a7a85';
  const COLOR_TRANSPORT = '#c05a1a';

  function getSummaryRows(section) {
    const isBuildings = section === 'buildings';
    const allMeasures = isBuildings ? data.buildings_measures : data.transport_measures;
    const catField    = isBuildings ? 'building_category' : 'transport_category';

    const measureNames = [];
    for (const m of allMeasures) {
      if ((m.measure_baseline_id || m.measure_baseline) && !measureNames.includes(m.measure_name)) {
        measureNames.push(m.measure_name);
      }
    }

    return measureNames.map(name => {
      const entries = allMeasures.filter(m =>
        m.measure_name === name && (m.measure_baseline_id || m.measure_baseline)
      );
      const dots = entries.map(m => {
        const calc = computeRow(m);
        if (!calc) return null;
        return { label: m[catField], npv: calc.npv };
      }).filter(Boolean);
      return { name, dots };
    }).filter(r => r.dots.length > 0);
  }

  function renderSummaryChart(container) {
    if (!globalXDomain) return;

    const buildingRows  = getSummaryRows('buildings');
    const transportRows = getSummaryRows('transport');

    const sections = [
      { label: 'Budovy',  rows: buildingRows,  color: COLOR_BUILDINGS },
      { label: 'Doprava', rows: transportRows, color: COLOR_TRANSPORT },
    ].filter(s => s.rows.length > 0);

    if (!sections.length) { container.hidden = true; return; }

    const totalRows = sections.reduce((n, s) => n + s.rows.length, 0);
    const sectionHeaderH = 22;
    const totalH = sections.reduce((h, s) =>
      h + sectionHeaderH + s.rows.length * SUMMARY_ROW_H, 0
    ) + SUMMARY_MARGIN.top + SUMMARY_MARGIN.bottom;

    const totalW = container.clientWidth || 640;
    const chartW = Math.max(totalW - SUMMARY_LABEL_W - SUMMARY_MARGIN.right, 120);

    d3.select(container).selectAll('*').remove();

    const svg = d3.select(container)
      .append('svg')
      .attr('width', totalW)
      .attr('height', totalH)
      .attr('role', 'img');

    const xScale = d3.scaleLinear()
      .domain(globalXDomain)
      .range([0, chartW]);

    const chart = svg.append('g').attr('transform', `translate(${SUMMARY_LABEL_W},0)`);

    // Column headers
    const headerY = 16;
    svg.append('text').attr('x', 4).attr('y', headerY)
      .attr('class', 'chart-col-header').text('Opatření');
    chart.append('text').attr('x', chartW / 2).attr('y', headerY)
      .attr('text-anchor', 'middle').attr('class', 'chart-col-header')
      .text('Rozdíl NPV oproti základní variantě (Kč)');

    // Zero line
    const z = xScale(0);
    chart.append('line')
      .attr('x1', z).attr('x2', z)
      .attr('y1', SUMMARY_MARGIN.top - 4).attr('y2', totalH - SUMMARY_MARGIN.bottom)
      .attr('stroke', '#bbb').attr('stroke-width', 1).attr('stroke-dasharray', '3 3');

    let currentY = SUMMARY_MARGIN.top;

    for (const section of sections) {
      // Section header
      svg.append('text')
        .attr('x', 4).attr('y', currentY + 14)
        .attr('font-size', '11px').attr('font-weight', '700')
        .attr('fill', section.color).attr('text-transform', 'uppercase')
        .text(section.label);
      currentY += sectionHeaderH;

      for (const row of section.rows) {
        const midY = currentY + SUMMARY_ROW_H / 2;

        // Measure label
        svg.append('text')
          .attr('x', 8).attr('y', midY + 4)
          .attr('font-size', '11px').attr('fill', '#444')
          .text(row.name);

        // Dots for each context
        const dotColor = section.color;

        // Uncertainty bars first (so dots render on top)
        for (const dot of row.dots) {
          chart.append('line')
            .attr('x1', xScale(dot.npv.low)).attr('x2', xScale(dot.npv.high))
            .attr('y1', midY).attr('y2', midY)
            .attr('stroke', dotColor).attr('stroke-width', 4)
            .attr('stroke-linecap', 'round').attr('opacity', 0.15);
        }

        // Dots
        for (const dot of row.dots) {
          const color = dot.npv.value >= 0 ? COLOR_BUILDINGS : COLOR_TRANSPORT;
          chart.append('circle')
            .attr('cx', xScale(dot.npv.value)).attr('cy', midY)
            .attr('r', 4).attr('fill', color)
            .attr('stroke', 'white').attr('stroke-width', 1.5)
            .attr('opacity', 0.85);
        }

        currentY += SUMMARY_ROW_H;
      }
    }

    // X axis
    chart.append('g')
      .attr('transform', `translate(0,${totalH - SUMMARY_MARGIN.bottom})`)
      .attr('class', 'chart-axis')
      .call(
        d3.axisBottom(xScale).ticks(5).tickFormat(v => {
          const a = Math.abs(v);
          const s = v < 0 ? '−' : v > 0 ? '+' : '';
          if (a >= 1e6) return s + (a / 1e6).toFixed(1) + ' M';
          if (a >= 1e3) return s + Math.round(a / 1e3)  + ' tis.';
          return v === 0 ? '0' : s + a;
        })
      );
  }

  // ── Chart rendering ──────────────────────────────────────────────────────
  const ROW_H  = 54;
  const LABEL_W = 200;
  const CO2_W   = 110;
  const MARGIN  = { top: 28, right: 16, bottom: 36 };

  // NPV > 0: measure saves money vs baseline (economically favorable)
  // NPV < 0: measure costs extra vs baseline
  const COLOR_FAVORABLE = '#1a7a85';
  const COLOR_COSTLY    = '#c05a1a';

  function renderAll() {
    const summaryEl = document.getElementById('summary-chart');
    if (summaryEl) renderSummaryChart(summaryEl);

    document.querySelectorAll('.measure-chart[data-section]').forEach(el => {
      renderMeasureChart(el, el.dataset.section, el.dataset.measure);
    });
  }

  function renderMeasureChart(container, section, measureName) {
    const isBuildings = section === 'buildings';
    const allMeasures = isBuildings ? data.buildings_measures : data.transport_measures;
    const catField    = isBuildings ? 'building_category' : 'transport_category';

    const entries = allMeasures.filter(m =>
      m.measure_name === measureName && (m.measure_baseline_id || m.measure_baseline)
    );
    if (!entries.length) { container.hidden = true; return; }

    const rows = entries
      .map(m => {
        const calc = computeRow(m);
        if (!calc) return null;
        return {
          label:        m[catField],
          baselineName: m.measure_baseline || null,
          npv:          calc.npv,
          co2Saved:     calc.co2Saved,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.npv.value - b.npv.value);

    if (!rows.length) { container.hidden = true; return; }

    const totalW  = container.clientWidth || 640;
    const chartW  = Math.max(totalW - LABEL_W - CO2_W - MARGIN.right, 120);
    const totalH  = rows.length * ROW_H + MARGIN.top + MARGIN.bottom;

    d3.select(container).selectAll('*').remove();

    const svg = d3.select(container)
      .append('svg')
      .attr('width', totalW)
      .attr('height', totalH)
      .attr('role', 'img');

    // ── X scale (fixed global domain) ────────────────────────────────────
    const xScale = d3.scaleLinear()
      .domain(globalXDomain || [-500000, 500000])
      .range([0, chartW]);

    const chart = svg.append('g').attr('transform', `translate(${LABEL_W},0)`);

    // ── Column headers ────────────────────────────────────────────────────
    const headerY = 16;
    svg.append('text').attr('x', 4).attr('y', headerY)
      .attr('class', 'chart-col-header').text('Kontext');
    chart.append('text').attr('x', chartW / 2).attr('y', headerY)
      .attr('text-anchor', 'middle').attr('class', 'chart-col-header')
      .text('Rozdíl NPV oproti základní variantě');
    chart.append('text').attr('x', chartW + CO2_W / 2 + 4).attr('y', headerY)
      .attr('text-anchor', 'middle').attr('class', 'chart-col-header')
      .text('Klimatický přínos');

    // ── Zero line ─────────────────────────────────────────────────────────
    const z = xScale(0);
    chart.append('line')
      .attr('x1', z).attr('x2', z)
      .attr('y1', MARGIN.top - 4).attr('y2', totalH - MARGIN.bottom)
      .attr('stroke', '#bbb').attr('stroke-width', 1).attr('stroke-dasharray', '3 3');

    // ── Rows ──────────────────────────────────────────────────────────────
    rows.forEach((row, i) => {
      const gy    = MARGIN.top + i * ROW_H;
      const midY  = gy + ROW_H / 2;
      const color = row.npv.value >= 0 ? COLOR_FAVORABLE : COLOR_COSTLY;

      // Row label (foreignObject for text wrapping)
      const fo = chart.append('foreignObject')
        .attr('x', -LABEL_W + 4).attr('y', gy + 2)
        .attr('width', LABEL_W - 8).attr('height', ROW_H - 4);
      const labelDiv = fo.append('xhtml:div')
        .style('display', 'flex').style('flex-direction', 'column')
        .style('justify-content', 'center').style('height', '100%');
      labelDiv.append('xhtml:span')
        .style('font-size', '12px').style('line-height', '1.3').style('color', '#444')
        .text(row.label);
      if (row.baselineName) {
        labelDiv.append('xhtml:span')
          .style('font-size', '10px').style('color', '#bbb').style('margin-top', '1px')
          .text('vs. ' + row.baselineName);
      }

      // Uncertainty bar (sensitivity range)
      chart.append('line')
        .attr('x1', xScale(row.npv.low)).attr('x2', xScale(row.npv.high))
        .attr('y1', midY).attr('y2', midY)
        .attr('stroke', color).attr('stroke-width', 5)
        .attr('stroke-linecap', 'round').attr('opacity', 0.2);

      // End-cap ticks
      [row.npv.low, row.npv.high].forEach(v => {
        chart.append('line')
          .attr('x1', xScale(v)).attr('x2', xScale(v))
          .attr('y1', midY - 6).attr('y2', midY + 6)
          .attr('stroke', color).attr('stroke-width', 1.5).attr('opacity', 0.45);
      });

      // Central dot
      chart.append('circle')
        .attr('cx', xScale(row.npv.value)).attr('cy', midY)
        .attr('r', 6).attr('fill', color)
        .attr('stroke', 'white').attr('stroke-width', 2);

      // NPV value label (swap sides when near right edge)
      const dotX      = xScale(row.npv.value);
      const labelLeft = dotX + 11 > chartW - 80;
      chart.append('text')
        .attr('x', labelLeft ? dotX - 11 : dotX + 11)
        .attr('y', midY + 4)
        .attr('text-anchor', labelLeft ? 'end' : 'start')
        .attr('font-size', '11px').attr('fill', color)
        .text(fmtCZK(row.npv.value));

      // CO₂ saved column
      const co2Color = (row.co2Saved !== null && row.co2Saved < 0) ? COLOR_COSTLY : '#3a7a50';
      chart.append('text')
        .attr('x', chartW + 8).attr('y', midY + 4)
        .attr('font-size', '11px').attr('fill', co2Color)
        .text(fmtCO2(row.co2Saved));
    });

    // ── X axis ────────────────────────────────────────────────────────────
    chart.append('g')
      .attr('transform', `translate(0,${MARGIN.top + rows.length * ROW_H})`)
      .attr('class', 'chart-axis')
      .call(
        d3.axisBottom(xScale).ticks(5).tickFormat(v => {
          const a = Math.abs(v);
          const s = v < 0 ? '−' : v > 0 ? '+' : '';
          if (a >= 1e6) return s + (a / 1e6).toFixed(1) + ' M';
          if (a >= 1e3) return s + Math.round(a / 1e3)  + ' tis.';
          return v === 0 ? '0' : s + a;
        })
      );
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    globalXDomain = computeGlobalDomain();
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
