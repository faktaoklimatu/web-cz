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
  // Computed once at init across all measures × all parameter combinations.
  // Fixed so the scale never shifts when controls change.
  let globalXDomain = null;

  // ── Fixed section order ───────────────────────────────────────────────────
  // Computed once at init using default params; never changes (dynamic
  // reordering of H2 sections would be disorienting while scrolling).
  let fixedBuildingOrder = null;
  let fixedTransportOrder = null;

  function computeGlobalDomain() {
    const allMeasures = [
      ...(data.buildings_measures || []),
      ...(data.transport_measures  || []),
    ].filter(m => m.measure_baseline_id || m.measure_baseline);

    const vals = [];
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
            } catch (_) { /* skip */ }
          }
        }
      }
    }
    if (!vals.length) return [-500000, 500000];

    const [vMin, vMax] = d3.extent(vals);
    return d3.scaleLinear()
      .domain([Math.min(vMin, 0), Math.max(vMax, 0)])
      .nice()
      .domain();
  }

  // ── Calculation ──────────────────────────────────────────────────────────
  // Returns { npv: { value, low, high }, co2Saved, sensitivity } or null.
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
        npv:         { value: result.npv, low, high },
        co2Saved:    result.emissionSavings ? -result.emissionSavings.totalT : null,
        sensitivity: sens,
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
    if (abs >= 100) return sign + fmtInt.format(Math.round(abs))           + '\u202ft CO₂';
    if (abs >= 1)   return sign + (Math.round(abs * 10) / 10).toFixed(1)  + '\u202ft CO₂';
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

  // ── Shared helpers ────────────────────────────────────────────────────────
  const ANIM_MS = 450;

  // Returns a sorted array of { name, baseline, dots } for one section.
  // Sorted descending by mean NPV so the most favorable measure is on top.
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

    return measureNames
      .map(name => {
        const entries = allMeasures.filter(m =>
          m.measure_name === name && (m.measure_baseline_id || m.measure_baseline)
        );
        const dots = entries.map(m => {
          const calc = computeRow(m);
          if (!calc) return null;
          return { label: m[catField], npv: calc.npv };
        }).filter(Boolean);
        const baselines = [...new Set(entries.map(m => m.measure_baseline).filter(Boolean))];
        return { name, baseline: baselines.length ? baselines.join(', ') : null, dots };
      })
      .filter(r => r.dots.length > 0)
      .sort((a, b) => d3.mean(b.dots, d => d.npv.value) - d3.mean(a.dots, d => d.npv.value));
  }

  const xAxisFmt = v => {
    const a = Math.abs(v);
    const s = v < 0 ? '−' : v > 0 ? '+' : '';
    if (a >= 1e6) return s + (a / 1e6).toFixed(1) + ' M';
    if (a >= 1e3) return s + Math.round(a / 1e3)  + ' tis.';
    return v === 0 ? '0' : s + a;
  };

  // ── Summary chart ─────────────────────────────────────────────────────────
  const SUMMARY_ROW_H   = 44;
  const SUMMARY_LABEL_W = 260;
  const SUMMARY_MARGIN  = { top: 48, right: 16, bottom: 36 };
  const SECTION_HDR_H   = 22;

  const COLOR_BUILDINGS = '#2860b4';
  const COLOR_TRANSPORT = '#6b4fa0';

  // NPV > 0: favorable (teal); NPV < 0: costly (red)
  const COLOR_FAVORABLE = '#1a7a85';
  const COLOR_COSTLY    = '#c0392b';

  function renderSummaryChart(container) {
    if (!globalXDomain) return;

    const sections = [
      { label: 'Budovy',  rows: getSummaryRows('buildings'), color: COLOR_BUILDINGS },
      { label: 'Doprava', rows: getSummaryRows('transport'),  color: COLOR_TRANSPORT },
    ].filter(s => s.rows.length > 0);

    if (!sections.length) { container.hidden = true; return; }

    const totalW  = container.clientWidth || 640;
    const chartW  = Math.max(totalW - SUMMARY_LABEL_W - SUMMARY_MARGIN.right, 120);
    const totalH  = sections.reduce((h, s) =>
      h + SECTION_HDR_H + s.rows.length * SUMMARY_ROW_H, 0
    ) + SUMMARY_MARGIN.top + SUMMARY_MARGIN.bottom;

    const xScale = d3.scaleLinear().domain(globalXDomain).range([0, chartW]);
    const z      = xScale(0);

    // ── Create SVG skeleton once ──────────────────────────────────────────
    let svg = d3.select(container).select('svg');
    if (svg.empty()) {
      svg = d3.select(container).append('svg').attr('role', 'img')
        .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');
      svg.append('text').attr('class', 'chart-col-header lbl-hdr').attr('x', 4).attr('y', 16)
        .text('Opatření');
      svg.append('text').attr('class', 'chart-col-header npv-hdr').attr('text-anchor', 'middle').attr('y', 16);
      svg.append('line').attr('class', 'zero-line')
        .attr('stroke', '#bbb').attr('stroke-width', 1).attr('stroke-dasharray', '3 3');
      svg.append('text').attr('class', 'half-lbl half-lbl-l')
        .attr('font-size', '11px').attr('font-style', 'italic').attr('fill', '#bbb').attr('text-anchor', 'middle');
      svg.append('text').attr('class', 'half-lbl half-lbl-r')
        .attr('font-size', '11px').attr('font-style', 'italic').attr('fill', '#bbb').attr('text-anchor', 'middle');
      svg.append('g').attr('class', 'sec-hdrs');
      svg.append('g').attr('class', 'rows-g');
      svg.append('g').attr('class', 'chart-axis x-axis');
    }

    svg.attr('width', totalW).attr('height', totalH);

    // Update static elements that depend on width/height
    svg.select('.npv-hdr').attr('x', SUMMARY_LABEL_W + chartW / 2)
      .text('Rozdíl NPV oproti základní variantě (Kč)');
    svg.select('.zero-line')
      .attr('x1', SUMMARY_LABEL_W + z).attr('x2', SUMMARY_LABEL_W + z)
      .attr('y1', SUMMARY_MARGIN.top - 4).attr('y2', totalH - SUMMARY_MARGIN.bottom);
    svg.select('.half-lbl-l').attr('x', SUMMARY_LABEL_W + z / 2).attr('y', 34)
      .text('Fosilní opatření je výhodnější');
    svg.select('.half-lbl-r').attr('x', SUMMARY_LABEL_W + z + (chartW - z) / 2).attr('y', 34)
      .text('Dekarbonizační opatření je výhodnější');

    // ── Section headers (fixed y — row counts never change) ───────────────
    // Pre-compute y-offsets per section
    const secOffsets = [];
    let cy = SUMMARY_MARGIN.top;
    for (const s of sections) {
      secOffsets.push({ headerY: cy, rowsY: cy + SECTION_HDR_H });
      cy += SECTION_HDR_H + s.rows.length * SUMMARY_ROW_H;
    }

    const secSel = svg.select('.sec-hdrs').selectAll('text.sec-hdr')
      .data(sections, s => s.label);
    secSel.enter().append('text').attr('class', 'sec-hdr')
      .attr('font-size', '13px').attr('font-weight', '700')
      .merge(secSel)
      .attr('x', 4)
      .attr('fill', s => s.color)
      .attr('y', (s, i) => secOffsets[i].headerY + 14)
      .text(s => s.label);
    secSel.exit().remove();

    // ── Measure rows (animated on reorder) ───────────────────────────────
    // Build a flat list with absolute y-positions
    const allRows = [];
    sections.forEach((s, si) => {
      s.rows.forEach((row, ri) => {
        allRows.push({ ...row, targetY: secOffsets[si].rowsY + ri * SUMMARY_ROW_H });
      });
    });

    const rowSel = svg.select('.rows-g').selectAll('g.s-row').data(allRows, d => d.name);

    // ENTER — appear at final position, fade in
    const rowEnter = rowSel.enter().append('g').attr('class', 's-row')
      .attr('transform', d => `translate(0,${d.targetY})`)
      .attr('opacity', 0);

    rowEnter.append('text').attr('class', 'r-name').attr('x', 8).attr('font-size', '13px').attr('fill', '#444');
    rowEnter.append('text').attr('class', 'r-base').attr('x', 8).attr('font-size', '11px').attr('fill', '#aaa');
    rowEnter.append('g').attr('class', 'r-dots');

    // MERGE — transition y-position; update content
    const rowAll = rowSel.merge(rowEnter);

    rowAll.transition().duration(ANIM_MS).ease(d3.easeCubicInOut)
      .attr('transform', d => `translate(0,${d.targetY})`)
      .attr('opacity', 1);

    rowAll.each(function (row) {
      const g   = d3.select(this);
      const mid = SUMMARY_ROW_H / 2;

      g.select('.r-name').attr('y', row.baseline ? mid - 1 : mid + 4).text(row.name);
      g.select('.r-base').attr('y', mid + 13).text(row.baseline ? 'vs. ' + row.baseline : '');

      const dotsG = g.select('.r-dots');
      dotsG.selectAll('*').remove();
      for (const dot of row.dots) {
        const dg = dotsG.append('g');
        if (dot.label) dg.append('title').text(fmtCZK(dot.npv.value) + '\n' + dot.label);
        dg.append('circle')
          .attr('cx', SUMMARY_LABEL_W + xScale(dot.npv.value)).attr('cy', mid)
          .attr('r', 6).attr('fill', dot.npv.value >= 0 ? COLOR_FAVORABLE : COLOR_COSTLY)
          .attr('stroke', 'white').attr('stroke-width', 1.5).attr('opacity', 0.85);
      }
    });

    rowSel.exit().transition().duration(ANIM_MS).attr('opacity', 0).remove();

    // ── X axis ────────────────────────────────────────────────────────────
    svg.select('.x-axis')
      .attr('transform', `translate(${SUMMARY_LABEL_W},${totalH - SUMMARY_MARGIN.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(xAxisFmt));
  }

  // ── Detailed measure chart ────────────────────────────────────────────────
  const ROW_H  = 54;
  const LABEL_W = 200;
  const CO2_W   = 150;
  const MARGIN  = { top: 28, right: 16, bottom: 36 };

  function renderMeasureChart(container, section, measureName) {
    const isBuildings = section === 'buildings';
    const allMeasures = isBuildings ? data.buildings_measures : data.transport_measures;
    const catField    = isBuildings ? 'building_category' : 'transport_category';

    const entries = allMeasures.filter(m =>
      m.measure_name === measureName && (m.measure_baseline_id || m.measure_baseline)
    );
    if (!entries.length) { container.hidden = true; return; }
    container.hidden = false;

    const rows = entries
      .map(m => {
        const calc = computeRow(m);
        if (!calc) return null;
        return {
          label:        m[catField],
          baselineName: m.measure_baseline || null,
          npv:          calc.npv,
          co2Saved:     calc.co2Saved,
          sensitivity:  calc.sensitivity,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.npv.value - a.npv.value);

    if (!rows.length) { container.hidden = true; return; }

    const totalW = container.clientWidth || 640;
    const chartW = Math.max(totalW - LABEL_W - CO2_W - MARGIN.right, 120);
    const totalH = rows.length * ROW_H + MARGIN.top + MARGIN.bottom;

    const xScale = d3.scaleLinear()
      .domain(globalXDomain || [-500000, 500000])
      .range([0, chartW]);
    const z = xScale(0);

    // CO₂ unit — pick a round value so the largest bar fills ~8 squares
    const maxAbsCo2 = Math.max(...rows.map(r => Math.abs(r.co2Saved ?? 0)));
    const rawUnit   = maxAbsCo2 / 8;
    const magnitude = Math.pow(10, Math.floor(Math.log10(Math.max(rawUnit, 1))));
    const co2Unit   = ([1, 2, 5, 10].find(f => f * magnitude >= rawUnit) || 10) * magnitude;

    // ── Create SVG skeleton once ──────────────────────────────────────────
    let svg = d3.select(container).select('svg');
    if (svg.empty()) {
      svg = d3.select(container).append('svg').attr('role', 'img')
        .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');
      svg.append('text').attr('class', 'chart-col-header ctx-hdr').attr('x', 4).attr('y', 16).text('Kontext');
      svg.append('text').attr('class', 'chart-col-header npv-hdr').attr('text-anchor', 'middle').attr('y', 16);
      svg.append('text').attr('class', 'chart-col-header co2-hdr').attr('text-anchor', 'start').attr('y', 16);
      svg.append('line').attr('class', 'zero-line')
        .attr('stroke', '#bbb').attr('stroke-width', 1).attr('stroke-dasharray', '3 3');
      svg.append('g').attr('class', 'rows-g');
      svg.append('g').attr('class', 'chart-axis x-axis');
    }

    svg.attr('width', totalW).attr('height', totalH);

    // Update static elements
    svg.select('.npv-hdr').attr('x', LABEL_W + z).text('Rozdíl NPV oproti základní variantě');
    svg.select('.co2-hdr').attr('x', LABEL_W + chartW + 8).text('Úspora emisí');
    svg.select('.zero-line')
      .attr('x1', LABEL_W + z).attr('x2', LABEL_W + z)
      .attr('y1', MARGIN.top - 4).attr('y2', totalH - MARGIN.bottom);

    // ── Row data join ─────────────────────────────────────────────────────
    const rowSel = svg.select('.rows-g').selectAll('g.d-row').data(rows, d => d.label);

    // ENTER — appear at final position, fade in
    const rowEnter = rowSel.enter().append('g').attr('class', 'd-row')
      .attr('transform', (d, i) => `translate(0,${MARGIN.top + i * ROW_H})`)
      .attr('opacity', 0);

    // foreignObject label (created once; text updated below)
    const fo = rowEnter.append('foreignObject')
      .attr('x', 4).attr('y', 2).attr('width', LABEL_W - 8).attr('height', ROW_H - 4);
    const div = fo.append('xhtml:div')
      .style('display', 'flex').style('flex-direction', 'column')
      .style('justify-content', 'center').style('height', '100%');
    div.append('xhtml:span').attr('class', 'lbl-main')
      .style('font-size', '14px').style('line-height', '1.3').style('color', '#444');
    div.append('xhtml:span').attr('class', 'lbl-base')
      .style('font-size', '11px').style('color', '#bbb').style('margin-top', '1px');

    // Uncertainty band
    const bandG = rowEnter.append('g').attr('class', 'u-band');
    bandG.append('title').attr('class', 'band-tip');
    bandG.append('line').attr('class', 'band-line')
      .attr('stroke', '#999').attr('stroke-width', 5)
      .attr('stroke-linecap', 'round').attr('opacity', 0.35);
    bandG.append('rect').attr('class', 'band-hit')
      .attr('height', 16).attr('fill', 'transparent');

    rowEnter.append('circle').attr('class', 'npv-dot').attr('r', 6)
      .attr('stroke', 'white').attr('stroke-width', 2);
    rowEnter.append('text').attr('class', 'npv-lbl')
      .attr('text-anchor', 'middle').attr('font-size', '14px');
    rowEnter.append('g').attr('class', 'co2-g');

    // MERGE — animate y; update all content
    const rowAll = rowSel.merge(rowEnter);

    rowAll.transition().duration(ANIM_MS).ease(d3.easeCubicInOut)
      .attr('transform', (d, i) => `translate(0,${MARGIN.top + i * ROW_H})`)
      .attr('opacity', 1);

    rowAll.each(function (row) {
      const g     = d3.select(this);
      const mid   = ROW_H / 2;
      const color = row.npv.value >= 0 ? COLOR_FAVORABLE : COLOR_COSTLY;
      const dotX  = LABEL_W + xScale(row.npv.value);

      g.select('.lbl-main').text(row.label);
      g.select('.lbl-base').text(row.baselineName ? 'vs. ' + row.baselineName : '');

      const dominant = row.sensitivity && row.sensitivity.length
        ? row.sensitivity.reduce((b, s) => (s.maxNpv - s.minNpv) > (b.maxNpv - b.minNpv) ? s : b)
        : null;
      g.select('.band-tip').text(dominant ? `Největší vliv: ${dominant.param}` : '');
      g.select('.band-line')
        .attr('x1', LABEL_W + xScale(row.npv.low)).attr('x2', LABEL_W + xScale(row.npv.high))
        .attr('y1', mid).attr('y2', mid);
      g.select('.band-hit')
        .attr('x', LABEL_W + xScale(row.npv.low))
        .attr('y', mid - 8)
        .attr('width', Math.max(xScale(row.npv.high) - xScale(row.npv.low), 1));

      g.select('.npv-dot').attr('cx', dotX).attr('cy', mid).attr('fill', color);
      g.select('.npv-lbl').attr('x', dotX).attr('y', mid - 11).attr('fill', color)
        .text(fmtCZK(row.npv.value));

      // CO₂ squares (rebuilt each update — not animated)
      const co2G    = g.select('.co2-g');
      co2G.selectAll('*').remove();
      const co2Color  = (row.co2Saved !== null && row.co2Saved < 0) ? COLOR_COSTLY : COLOR_FAVORABLE;
      const SQ = 7, SQ_STEP = 9;
      const nSq = row.co2Saved !== null ? Math.round(Math.abs(row.co2Saved) / co2Unit) : 0;
      const sqX = LABEL_W + chartW + 8;
      for (let s = 0; s < nSq; s++) {
        co2G.append('rect')
          .attr('x', sqX + s * SQ_STEP).attr('y', mid - SQ / 2)
          .attr('width', SQ).attr('height', SQ).attr('fill', co2Color).attr('opacity', 0.7);
      }
      co2G.append('text')
        .attr('x', sqX + Math.max(nSq, 1) * SQ_STEP + 2).attr('y', mid + 5)
        .attr('font-size', '13px').attr('fill', co2Color)
        .text(fmtCO2(row.co2Saved));
    });

    rowSel.exit().transition().duration(ANIM_MS).attr('opacity', 0).remove();

    // ── X axis ────────────────────────────────────────────────────────────
    svg.select('.x-axis')
      .attr('transform', `translate(${LABEL_W},${MARGIN.top + rows.length * ROW_H})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(xAxisFmt));
  }

  // ── DOM section reordering ───────────────────────────────────────────────
  // Reorders the H2 + chart-div pairs inside a section to match a given
  // measure-name order.  Called once at init; never called again.
  function reorderSection(sectionId, order) {
    if (!order || !order.length) return;

    // Collect all (h2, chartDiv) pairs for this section
    const charts = Array.from(
      document.querySelectorAll(`.measure-chart[data-section="${sectionId}"]`)
    );
    const pairs = charts.map(chart => {
      const h2 = chart.previousElementSibling;
      return (h2 && h2.tagName === 'H2') ? { name: chart.dataset.measure, h2, chart } : null;
    }).filter(Boolean);

    if (!pairs.length) return;

    // Sort pairs into the desired order
    const rank = new Map(order.map((name, i) => [name, i]));
    pairs.sort((a, b) =>
      (rank.has(a.name) ? rank.get(a.name) : Infinity) -
      (rank.has(b.name) ? rank.get(b.name) : Infinity)
    );

    // Find the H1 anchor for this section ('Budovy' / 'Doprava')
    const sectionLabel = sectionId === 'buildings' ? 'Budovy' : 'Doprava';
    const parent = pairs[0].h2.parentNode;
    const h1 = Array.from(parent.children)
      .find(el => el.tagName === 'H1' && el.textContent.trim() === sectionLabel);
    if (!h1) return;

    // Re-insert pairs in sorted order immediately after the H1
    let anchor = h1;
    for (const { h2, chart } of pairs) {
      anchor.after(h2);
      h2.after(chart);
      anchor = chart;
    }
  }

  // ── Render all ────────────────────────────────────────────────────────────
  function renderAll() {
    const summaryEl = document.getElementById('summary-chart');
    if (summaryEl) renderSummaryChart(summaryEl);

    document.querySelectorAll('.measure-chart[data-section]').forEach(el => {
      renderMeasureChart(el, el.dataset.section, el.dataset.measure);
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    globalXDomain = computeGlobalDomain();

    // Compute fixed ordering using default params (state is at defaults here).
    fixedBuildingOrder  = getSummaryRows('buildings').map(r => r.name);
    fixedTransportOrder = getSummaryRows('transport').map(r => r.name);
    reorderSection('buildings', fixedBuildingOrder);
    reorderSection('transport', fixedTransportOrder);

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
