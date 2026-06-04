(function () {
  'use strict';

  const data = window.COSTS_AND_BENEFITS;
  if (!data) return;

  // ── State ────────────────────────────────────────────────────────────────
  // discountRate stored as integer percentage points (0–7); divided by 100 on use.
  const state = {
    carbonPrice:           60,
    discountRate:           3,
    fuelScenario:          'CP',
    electricityPriceFactor: CostsBenefits.getDefaultElectricityPriceFactor(data),
  };

  // ── Tooltip ──────────────────────────────────────────────────────────────
  // A single floating div reused by all charts. Appears immediately on hover
  // (no browser-native <title> delay).
  const tip = document.createElement('div');
  Object.assign(tip.style, {
    position:      'fixed',
    pointerEvents: 'none',
    background:    'rgba(30,30,30,0.88)',
    color:         '#fff',
    borderRadius:  '5px',
    padding:       '5px 9px',
    fontSize:      '13px',
    lineHeight:    '1.45',
    fontFamily:    'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif',
    whiteSpace:    'pre-wrap',  // keep \n line breaks AND wrap long lines
    zIndex:        '9999',
    display:       'none',
    maxWidth:      '260px',
  });
  document.body.appendChild(tip);

  function showTip(event, text) {
    tip.textContent = text;
    tip.style.display = 'block';
    moveTip(event);
  }
  function moveTip(event) {
    const pad = 12;
    const tw  = tip.offsetWidth, th = tip.offsetHeight;
    let x = event.clientX + pad, y = event.clientY + pad;
    if (x + tw > window.innerWidth  - 4) x = event.clientX - tw - pad;
    if (y + th > window.innerHeight - 4) y = event.clientY - th - pad;
    tip.style.left = x + 'px';
    tip.style.top  = y + 'px';
  }
  function hideTip() { tip.style.display = 'none'; }

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
                measureId:             m.id,
                data,
                discountRate:          dr,
                carbonPriceEur:        cp,
                priceScenario:         sc,
                electricityPriceFactor: state.electricityPriceFactor,
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
        measureId:             measure.id,
        data,
        discountRate:          state.discountRate / 100,
        carbonPriceEur:        state.carbonPrice,
        priceScenario:         state.fuelScenario,
        electricityPriceFactor: state.electricityPriceFactor,
      });
      const sens  = result.sensitivity || [];
      const low   = sens.length ? Math.min(...sens.map(s => s.minNpv)) : result.npv;
      const high  = sens.length ? Math.max(...sens.map(s => s.maxNpv)) : result.npv;
      return {
        npv:         { value: result.npv, low, high },
        co2Saved:    result.emissionSavings ? -result.emissionSavings.totalT : null,
        capexDiff:   result.capexDiff,
        sector:      result.sector,
        gasSavings:          result.gasSavings,
        fuelSavings:         result.fuelSavings,
        fossilImportSavings: result.fossilImportSavings,
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

  // X t CO₂ (or kg CO₂) saved per 1 000 CZK of `czk`.
  // Round x (positive) to 3 significant figures, no trailing zeros.
  function fmt3sig(x) { return parseFloat(x.toPrecision(3)).toString(); }

  // Kč needed to save 1 t CO₂ (czk signed: + = cost, −= earning).
  function fmtCZKperT(czk, savedT) {
    if (savedT == null || !savedT || !isFinite(czk / savedT)) return '—';
    const v    = czk / savedT;
    const sign = v < 0 ? '−' : '';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + fmt3sig(abs / 1e6) + ' mil. Kč/t CO₂';
    if (abs >= 1e3) return sign + fmt3sig(abs / 1e3) + ' tis. Kč/t CO₂';
    return sign + fmt3sig(abs) + ' Kč/t CO₂';
  }

  // Kč needed to save 1 MWh of gas (czk signed: + = cost, −= earning).
  function fmtCZKperMWh(czk, mwh) {
    if (mwh == null || !mwh || !isFinite(czk / mwh)) return '—';
    const v    = czk / mwh;
    const sign = v < 0 ? '−' : '';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + fmt3sig(abs / 1e6) + ' mil. Kč/MWh';
    if (abs >= 1e3) return sign + fmt3sig(abs / 1e3) + ' tis. Kč/MWh';
    return sign + fmt3sig(abs) + ' Kč/MWh';
  }

  // Kč needed to save 1 litre of fuel (czk signed: + = cost, −= earning).
  function fmtCZKperL(czk, litres) {
    if (litres == null || !litres || !isFinite(czk / litres)) return '—';
    const v    = czk / litres;
    const sign = v < 0 ? '−' : '';
    const abs  = Math.abs(v);
    if (abs >= 1000) return sign + fmt3sig(abs / 1000) + ' tis. Kč/l';
    return sign + fmt3sig(abs) + ' Kč/l';
  }

  function fmtL(litres) {
    if (litres == null || !isFinite(litres)) return '—';
    const sign = litres < 0 ? '−' : '';
    const abs  = Math.abs(litres);
    if (abs >= 1000) return sign + fmtInt.format(Math.round(abs / 10) * 10) + ' l';
    return sign + fmtInt.format(Math.round(abs)) + ' l';
  }

  function fmtMWh(mwh) {
    if (mwh == null || !isFinite(mwh)) return '—';
    const sign = mwh < 0 ? '−' : '';
    const abs  = Math.abs(mwh);
    if (abs >= 1000) return sign + (Math.round(abs / 100) / 10).toFixed(1) + ' GWh';
    if (abs >= 1)    return sign + fmtInt.format(Math.round(abs))           + ' MWh';
    return sign + fmtInt.format(Math.round(abs * 1000)) + ' kWh';
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

  // CO₂ squares — fixed global scale so all measures are comparable
  const CO2_UNIT     = 25;  // 1 box = 25 t CO₂ (= 25 000 kg)
  const CO2_MAX_COLS =  4;  // wrap to new row after 4 boxes (= 100 t = 100K kg)

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
        const tipText = dot.label ? fmtCZK(dot.npv.value) + '\n' + dot.label : fmtCZK(dot.npv.value);
        dotsG.append('circle')
          .attr('cx', SUMMARY_LABEL_W + xScale(dot.npv.value)).attr('cy', mid)
          .attr('r', 6).attr('fill', dot.npv.value >= 0 ? COLOR_FAVORABLE : COLOR_COSTLY)
          .attr('stroke', 'white').attr('stroke-width', 1.5).attr('opacity', 0.85)
          .on('mouseover', e  => showTip(e, tipText))
          .on('mousemove', moveTip)
          .on('mouseout',  hideTip);
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
  const FUEL_W  = 120;
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
          measureId:    m.id,
          npv:          calc.npv,
          co2Saved:     calc.co2Saved,
          capexDiff:    calc.capexDiff,
          sector:       calc.sector,
          gasSavings:          calc.gasSavings,
          fuelSavings:         calc.fuelSavings,
          fossilImportSavings: calc.fossilImportSavings,
          sensitivity:  calc.sensitivity,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.npv.value - a.npv.value);

    if (!rows.length) { container.hidden = true; return; }

    const totalW = container.clientWidth || 640;
    const chartW = Math.max(totalW - LABEL_W - CO2_W - FUEL_W - MARGIN.right, 120);
    const totalH = rows.length * ROW_H + MARGIN.top + MARGIN.bottom;

    const xScale = d3.scaleLinear()
      .domain(globalXDomain || [-500000, 500000])
      .range([0, chartW]);
    const z = xScale(0);

    // ── Create SVG skeleton once ──────────────────────────────────────────
    let svg = d3.select(container).select('svg');
    if (svg.empty()) {
      svg = d3.select(container).append('svg').attr('role', 'img')
        .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');
      svg.append('text').attr('class', 'chart-col-header ctx-hdr').attr('x', 4).attr('y', 16).text('Kontext');
      svg.append('text').attr('class', 'chart-col-header npv-hdr').attr('text-anchor', 'middle').attr('y', 16);
      svg.append('text').attr('class', 'chart-col-header co2-hdr').attr('text-anchor', 'start').attr('y', 16);
      svg.append('text').attr('class', 'chart-col-header fuel-hdr').attr('text-anchor', 'start').attr('y', 16);
      svg.append('line').attr('class', 'zero-line')
        .attr('stroke', '#bbb').attr('stroke-width', 1).attr('stroke-dasharray', '3 3');
      svg.append('g').attr('class', 'rows-g');
      svg.append('g').attr('class', 'chart-axis x-axis');
    }

    svg.attr('width', totalW).attr('height', totalH);

    // Update static elements
    svg.select('.npv-hdr').attr('x', LABEL_W + z).text('Rozdíl NPV oproti základní variantě');
    svg.select('.co2-hdr').attr('x', LABEL_W + chartW + 8).text('Úspora emisí');
    svg.select('.fuel-hdr').attr('x', LABEL_W + chartW + CO2_W + 8)
      .call(el => {
        const x = LABEL_W + chartW + CO2_W + 8;
        el.selectAll('*').remove();
        el.append('tspan').attr('x', x).attr('dy', '0').text('Úspora importu');
        el.append('tspan').attr('x', x).attr('dy', '1.1em').text('ropy a plynu');
      });
    svg.select('.zero-line')
      .attr('x1', LABEL_W + z).attr('x2', LABEL_W + z)
      .attr('y1', MARGIN.top - 4).attr('y2', totalH - MARGIN.bottom);

    // ── Row data join ─────────────────────────────────────────────────────
    const rowSel = svg.select('.rows-g').selectAll('g.d-row').data(rows, d => d.label);

    // ENTER — appear at final position, fade in
    const rowEnter = rowSel.enter().append('g').attr('class', 'd-row')
      .attr('transform', (d, i) => `translate(0,${MARGIN.top + i * ROW_H})`)
      .attr('opacity', 0);

    // Transparent full-width rect — catches clicks in the empty label area
    rowEnter.append('rect').attr('class', 'row-bg')
      .attr('x', 0).attr('y', 0).attr('height', ROW_H).attr('fill', 'transparent');

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
    rowEnter.append('g').attr('class', 'fuel-g');

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

      g.select('.row-bg').attr('width', totalW);
      g.style('cursor', 'pointer')
       .on('click', () => toggleRowDetail(container, row));

      g.select('.lbl-main').text(row.label);
      g.select('.lbl-base').text(row.baselineName ? 'vs. ' + row.baselineName : '');

      const dominant = row.sensitivity && row.sensitivity.length
        ? row.sensitivity.reduce((b, s) => (s.maxNpv - s.minNpv) > (b.maxNpv - b.minNpv) ? s : b)
        : null;
      const bandTip = [
        `Rozsah nejistoty: ${fmtCZK(row.npv.low)} až ${fmtCZK(row.npv.high)}`,
        dominant ? `Největší vliv: ${dominant.param}` : null,
      ].filter(Boolean).join('\n');
      const dotTip = [
        fmtCZK(row.npv.value),
        dominant ? `Největší vliv: ${dominant.param}` : null,
      ].filter(Boolean).join('\n');

      g.select('.band-line')
        .attr('x1', LABEL_W + xScale(row.npv.low)).attr('x2', LABEL_W + xScale(row.npv.high))
        .attr('y1', mid).attr('y2', mid);
      g.select('.band-hit')
        .attr('x', LABEL_W + xScale(row.npv.low))
        .attr('y', mid - 8)
        .attr('width', Math.max(xScale(row.npv.high) - xScale(row.npv.low), 1))
        .on('mouseover', e => showTip(e, bandTip))
        .on('mousemove', moveTip)
        .on('mouseout',  hideTip);

      g.select('.npv-dot').attr('cx', dotX).attr('cy', mid).attr('fill', color)
        .on('mouseover', e => showTip(e, dotTip))
        .on('mousemove', moveTip)
        .on('mouseout',  hideTip);
      g.select('.npv-lbl').attr('x', dotX).attr('y', mid - 11).attr('fill', color)
        .text(fmtCZK(row.npv.value));

      // CO₂ squares — fixed global scale: 1 box = CO2_UNIT t, wrap at CO2_MAX_COLS
      const co2G   = g.select('.co2-g');
      co2G.selectAll('*').remove();
      const co2Color = (row.co2Saved !== null && row.co2Saved < 0) ? COLOR_COSTLY : COLOR_FAVORABLE;
      const SQ = 7, SQ_GAP = 2, SQ_STEP = SQ + SQ_GAP;
      const absVal   = row.co2Saved !== null ? Math.abs(row.co2Saved) : 0;
      // Round to nearest half-unit (12.5 t), then split into full + half boxes
      const halfUnits = row.co2Saved !== null ? Math.round(absVal / (CO2_UNIT / 2)) : 0;
      const nSq      = Math.floor(halfUnits / 2);   // full boxes (25 t each)
      const hasHalf  = (halfUnits % 2) === 1;        // leftover half-box (12.5 t)
      const sqX     = LABEL_W + chartW + 8;

      // Grid layout: treat half-box as occupying one slot in row 0
      const nSlots  = nSq + (hasHalf ? 1 : 0);
      const nCols   = Math.min(nSlots, CO2_MAX_COLS);
      const nRows   = nSlots > 0 ? Math.ceil(nSlots / CO2_MAX_COLS) : 0;
      const gridH   = nRows > 0 ? nRows * SQ + (nRows - 1) * SQ_GAP : 0;
      const gridTop = mid - gridH / 2;

      for (let s = 0; s < nSq; s++) {
        const col    = s % CO2_MAX_COLS;
        const rowIdx = Math.floor(s / CO2_MAX_COLS);
        co2G.append('rect')
          .attr('x', sqX + col * SQ_STEP)
          .attr('y', gridTop + rowIdx * SQ_STEP)
          .attr('width', SQ).attr('height', SQ)
          .attr('fill', co2Color).attr('opacity', 0.7);
      }
      if (hasHalf) {
        // Half-box in the next slot after all full boxes
        const hCol    = nSq % CO2_MAX_COLS;
        const hRowIdx = Math.floor(nSq / CO2_MAX_COLS);
        co2G.append('rect')
          .attr('x', sqX + hCol * SQ_STEP)
          .attr('y', gridTop + hRowIdx * SQ_STEP)
          .attr('width', SQ / 2).attr('height', SQ)
          .attr('fill', co2Color).attr('opacity', 0.7);
      }
      const textX = sqX + CO2_MAX_COLS * SQ_STEP + 4;
      const co2Negative = row.co2Saved !== null && row.co2Saved < 0;
      const co2RelStr = (!co2Negative && row.co2Saved) ? fmtCZKperT(-row.npv.value, row.co2Saved) : null;
      co2G.append('text')
        .attr('x', textX).attr('y', (co2RelStr || co2Negative) ? mid - 1 : mid + 5)
        .attr('font-size', '13px').attr('fill', co2Color)
        .text(fmtCO2(row.co2Saved));
      if (co2Negative) {
        co2G.append('text')
          .attr('x', textX).attr('y', mid + 13)
          .attr('font-size', '10px').attr('fill', '#bbb')
          .text('zvyšuje emise');
      } else if (co2RelStr) {
        co2G.append('text')
          .attr('x', textX).attr('y', mid + 13)
          .attr('font-size', '10px').attr('fill', '#bbb')
          .text(co2RelStr);
      }

      // Fuel / gas column
      const fuelG    = g.select('.fuel-g');
      const fuelColX = LABEL_W + chartW + CO2_W + 8;
      fuelG.selectAll('*').remove();
      let fuelAbsStr = '—', fuelRelStr = null;
      if (row.fossilImportSavings) {
        const fis = row.fossilImportSavings;
        fuelAbsStr = fmtMWh(fis.scope1TotalMwh);
        const s2 = fis.scope2TotalMwh;
        if (s2 !== 0) fuelRelStr = (s2 > 0 ? '+' : '−') + fmtMWh(Math.abs(s2)) + ' výroba elektřiny';
      }
      fuelG.append('text')
        .attr('x', fuelColX).attr('y', fuelRelStr ? mid - 1 : mid + 5)
        .attr('font-size', '13px').attr('fill', '#555')
        .text(fuelAbsStr);
      if (fuelRelStr) {
        fuelG.append('text')
          .attr('x', fuelColX).attr('y', mid + 13)
          .attr('font-size', '10px').attr('fill', '#bbb')
          .text(fuelRelStr)
          .append('title').text('zemní plyn spotřebovaný na výrobu elektřiny');
      }
    });

    rowSel.exit().transition().duration(ANIM_MS).attr('opacity', 0).remove();

    // ── X axis ────────────────────────────────────────────────────────────
    svg.select('.x-axis')
      .attr('transform', `translate(${LABEL_W},${MARGIN.top + rows.length * ROW_H})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(xAxisFmt));
  }

  // ── Group chart (transport: all measures in one category group) ──────────
  // Renders every measure whose transport_category starts with `group`
  // (e.g. "Nové" matches "Nové malé" and "Nové velké").
  // Row label = measure_name; secondary line = baseline name.
  function renderGroupChart(container, section, group) {
    const isBuildings = section === 'buildings';
    const allMeasures = isBuildings ? data.buildings_measures : data.transport_measures;
    const catField    = isBuildings ? 'building_category' : 'transport_category';

    const entries = allMeasures.filter(m =>
      (m.measure_baseline_id || m.measure_baseline) &&
      m[catField] && m[catField].startsWith(group)
    );
    if (!entries.length) { container.hidden = true; return; }
    container.hidden = false;

    const rows = entries
      .map(m => {
        const calc = computeRow(m);
        if (!calc) return null;
        return {
          label:        m.measure_name,
          baselineName: m.measure_baseline || null,
          measureId:    m.id,
          npv:          calc.npv,
          co2Saved:     calc.co2Saved,
          capexDiff:    calc.capexDiff,
          sector:       calc.sector,
          gasSavings:          calc.gasSavings,
          fuelSavings:         calc.fuelSavings,
          fossilImportSavings: calc.fossilImportSavings,
          sensitivity:         calc.sensitivity,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.npv.value - a.npv.value);

    if (!rows.length) { container.hidden = true; return; }

    // Reuse the same SVG skeleton and rendering logic as renderMeasureChart.
    const totalW = container.clientWidth || 640;
    const chartW = Math.max(totalW - LABEL_W - CO2_W - FUEL_W - MARGIN.right, 120);
    const totalH = rows.length * ROW_H + MARGIN.top + MARGIN.bottom;

    const xScale = d3.scaleLinear()
      .domain(globalXDomain || [-500000, 500000])
      .range([0, chartW]);
    const z = xScale(0);

    let svg = d3.select(container).select('svg');
    if (svg.empty()) {
      svg = d3.select(container).append('svg').attr('role', 'img')
        .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');
      svg.append('text').attr('class', 'chart-col-header ctx-hdr').attr('x', 4).attr('y', 16).text('Opatření');
      svg.append('text').attr('class', 'chart-col-header npv-hdr').attr('text-anchor', 'middle').attr('y', 16);
      svg.append('text').attr('class', 'chart-col-header co2-hdr').attr('text-anchor', 'start').attr('y', 16);
      svg.append('text').attr('class', 'chart-col-header fuel-hdr').attr('text-anchor', 'start').attr('y', 16);
      svg.append('line').attr('class', 'zero-line')
        .attr('stroke', '#bbb').attr('stroke-width', 1).attr('stroke-dasharray', '3 3');
      svg.append('g').attr('class', 'rows-g');
      svg.append('g').attr('class', 'chart-axis x-axis');
    }

    svg.attr('width', totalW).attr('height', totalH);
    svg.select('.npv-hdr').attr('x', LABEL_W + z).text('Rozdíl NPV oproti základní variantě');
    svg.select('.co2-hdr').attr('x', LABEL_W + chartW + 8).text('Úspora emisí');
    svg.select('.fuel-hdr').attr('x', LABEL_W + chartW + CO2_W + 8)
      .call(el => {
        const x = LABEL_W + chartW + CO2_W + 8;
        el.selectAll('*').remove();
        el.append('tspan').attr('x', x).attr('dy', '0').text('Úspora importu');
        el.append('tspan').attr('x', x).attr('dy', '1.1em').text('ropy a plynu');
      });
    svg.select('.zero-line')
      .attr('x1', LABEL_W + z).attr('x2', LABEL_W + z)
      .attr('y1', MARGIN.top - 4).attr('y2', totalH - MARGIN.bottom);

    const rowSel = svg.select('.rows-g').selectAll('g.d-row').data(rows, d => d.label);

    const rowEnter = rowSel.enter().append('g').attr('class', 'd-row')
      .attr('transform', (d, i) => `translate(0,${MARGIN.top + i * ROW_H})`)
      .attr('opacity', 0);

    rowEnter.append('rect').attr('class', 'row-bg')
      .attr('x', 0).attr('y', 0).attr('height', ROW_H).attr('fill', 'transparent');

    const fo = rowEnter.append('foreignObject')
      .attr('x', 4).attr('y', 2).attr('width', LABEL_W - 8).attr('height', ROW_H - 4);
    const div = fo.append('xhtml:div')
      .style('display', 'flex').style('flex-direction', 'column')
      .style('justify-content', 'center').style('height', '100%');
    div.append('xhtml:span').attr('class', 'lbl-main')
      .style('font-size', '14px').style('line-height', '1.3').style('color', '#444');
    div.append('xhtml:span').attr('class', 'lbl-base')
      .style('font-size', '11px').style('color', '#bbb').style('margin-top', '1px');

    const bandG = rowEnter.append('g').attr('class', 'u-band');
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
    rowEnter.append('g').attr('class', 'fuel-g');

    const rowAll = rowSel.merge(rowEnter);
    rowAll.transition().duration(ANIM_MS).ease(d3.easeCubicInOut)
      .attr('transform', (d, i) => `translate(0,${MARGIN.top + i * ROW_H})`)
      .attr('opacity', 1);

    rowAll.each(function (row) {
      const g     = d3.select(this);
      const mid   = ROW_H / 2;
      const color = row.npv.value >= 0 ? COLOR_FAVORABLE : COLOR_COSTLY;
      const dotX  = LABEL_W + xScale(row.npv.value);

      g.select('.row-bg').attr('width', totalW);
      g.style('cursor', 'pointer').on('click', () => toggleRowDetail(container, row));
      g.select('.lbl-main').text(row.label);
      g.select('.lbl-base').text(row.baselineName ? 'vs. ' + row.baselineName : '');

      const dominant = row.sensitivity && row.sensitivity.length
        ? row.sensitivity.reduce((b, s) => (s.maxNpv - s.minNpv) > (b.maxNpv - b.minNpv) ? s : b)
        : null;
      const bandTip = [
        `Rozsah nejistoty: ${fmtCZK(row.npv.low)} až ${fmtCZK(row.npv.high)}`,
        dominant ? `Největší vliv: ${dominant.param}` : null,
      ].filter(Boolean).join('\n');
      const dotTip = [
        fmtCZK(row.npv.value),
        dominant ? `Největší vliv: ${dominant.param}` : null,
      ].filter(Boolean).join('\n');

      g.select('.band-line')
        .attr('x1', LABEL_W + xScale(row.npv.low)).attr('x2', LABEL_W + xScale(row.npv.high))
        .attr('y1', mid).attr('y2', mid);
      g.select('.band-hit')
        .attr('x', LABEL_W + xScale(row.npv.low)).attr('y', mid - 8)
        .attr('width', Math.max(xScale(row.npv.high) - xScale(row.npv.low), 1))
        .on('mouseover', e => showTip(e, bandTip)).on('mousemove', moveTip).on('mouseout', hideTip);
      g.select('.npv-dot').attr('cx', dotX).attr('cy', mid).attr('fill', color)
        .on('mouseover', e => showTip(e, dotTip)).on('mousemove', moveTip).on('mouseout', hideTip);
      g.select('.npv-lbl').attr('x', dotX).attr('y', mid - 11).attr('fill', color)
        .text(fmtCZK(row.npv.value));

      // CO₂ squares
      const co2G    = g.select('.co2-g');
      co2G.selectAll('*').remove();
      const co2Color = (row.co2Saved !== null && row.co2Saved < 0) ? COLOR_COSTLY : COLOR_FAVORABLE;
      const SQ = 7, SQ_GAP = 2, SQ_STEP = SQ + SQ_GAP;
      const absVal   = row.co2Saved !== null ? Math.abs(row.co2Saved) : 0;
      const halfUnits = row.co2Saved !== null ? Math.round(absVal / (CO2_UNIT / 2)) : 0;
      const nSq      = Math.floor(halfUnits / 2);
      const hasHalf  = (halfUnits % 2) === 1;
      const sqX      = LABEL_W + chartW + 8;
      const nSlots   = nSq + (hasHalf ? 1 : 0);
      const nRows    = nSlots > 0 ? Math.ceil(nSlots / CO2_MAX_COLS) : 0;
      const gridH    = nRows > 0 ? nRows * SQ + (nRows - 1) * SQ_GAP : 0;
      const gridTop  = mid - gridH / 2;
      for (let s = 0; s < nSq; s++) {
        co2G.append('rect')
          .attr('x', sqX + (s % CO2_MAX_COLS) * SQ_STEP)
          .attr('y', gridTop + Math.floor(s / CO2_MAX_COLS) * SQ_STEP)
          .attr('width', SQ).attr('height', SQ).attr('fill', co2Color).attr('opacity', 0.7);
      }
      if (hasHalf) {
        co2G.append('rect')
          .attr('x', sqX + (nSq % CO2_MAX_COLS) * SQ_STEP)
          .attr('y', gridTop + Math.floor(nSq / CO2_MAX_COLS) * SQ_STEP)
          .attr('width', SQ / 2).attr('height', SQ).attr('fill', co2Color).attr('opacity', 0.7);
      }
      const textX = sqX + CO2_MAX_COLS * SQ_STEP + 4;
      const co2Negative = row.co2Saved !== null && row.co2Saved < 0;
      const co2RelStr = (!co2Negative && row.co2Saved) ? fmtCZKperT(-row.npv.value, row.co2Saved) : null;
      co2G.append('text').attr('x', textX).attr('y', (co2RelStr || co2Negative) ? mid - 1 : mid + 5)
        .attr('font-size', '13px').attr('fill', co2Color).text(fmtCO2(row.co2Saved));
      if (co2Negative) {
        co2G.append('text').attr('x', textX).attr('y', mid + 13)
          .attr('font-size', '10px').attr('fill', '#bbb').text('zvyšuje emise');
      } else if (co2RelStr) {
        co2G.append('text').attr('x', textX).attr('y', mid + 13)
          .attr('font-size', '10px').attr('fill', '#bbb').text(co2RelStr);
      }

      // Fuel column
      const fuelG    = g.select('.fuel-g');
      const fuelColX = LABEL_W + chartW + CO2_W + 8;
      fuelG.selectAll('*').remove();
      let fuelAbsStr = '—', fuelRelStr = null;
      if (row.fossilImportSavings) {
        const fis = row.fossilImportSavings;
        fuelAbsStr = fmtMWh(fis.scope1TotalMwh);
        const s2 = fis.scope2TotalMwh;
        if (s2 !== 0) fuelRelStr = (s2 > 0 ? '+' : '−') + fmtMWh(Math.abs(s2)) + ' výroba elektřiny';
      }
      fuelG.append('text').attr('x', fuelColX).attr('y', fuelRelStr ? mid - 1 : mid + 5)
        .attr('font-size', '13px').attr('fill', '#555').text(fuelAbsStr);
      if (fuelRelStr) {
        fuelG.append('text').attr('x', fuelColX).attr('y', mid + 13)
          .attr('font-size', '10px').attr('fill', '#bbb').text(fuelRelStr)
          .append('title').text('zemní plyn spotřebovaný na výrobu elektřiny');
      }
    });

    rowSel.exit().transition().duration(ANIM_MS).attr('opacity', 0).remove();

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

  // ── Row detail panel ─────────────────────────────────────────────────────
  function toggleRowDetail(container, row) {
    const existing = container.querySelector('.row-detail');
    const wasOpen  = existing && existing.dataset.rowLabel === row.label;
    if (existing) existing.remove();
    if (wasOpen) return;

    let result;
    try {
      result = CostsBenefits.calculate({
        measureId:             row.measureId,
        data,
        discountRate:          state.discountRate / 100,
        carbonPriceEur:        state.carbonPrice,
        priceScenario:         state.fuelScenario,
        electricityPriceFactor: state.electricityPriceFactor,
      });
    } catch (e) { return; }

    renderDetailPanel(container, row, result);
  }

  function renderDetailPanel(container, row, result) {
    const panel = document.createElement('div');
    panel.className    = 'row-detail';
    panel.dataset.rowLabel = row.label;

    // Header
    const hdr = document.createElement('div');
    hdr.className = 'row-detail-header';
    const title = document.createElement('span');
    title.className = 'row-detail-title';
    title.innerHTML = `<strong>${row.label}</strong>${row.baselineName ? ` <span class="row-detail-vs">vs. ${row.baselineName}</span>` : ''}`;
    const closeBtn = document.createElement('button');
    closeBtn.className   = 'row-detail-close';
    closeBtn.textContent = '✕';
    closeBtn.onclick = () => panel.remove();
    hdr.appendChild(title);
    hdr.appendChild(closeBtn);
    panel.appendChild(hdr);

    // Stats grid (3 rows × 3 cols + row labels)
    const savedT     = result.emissionSavings ? -result.emissionSavings.totalT : null;
    const extraCapex = -result.capexDiff;   // positive = measure costs more than baseline

    function makeStat(label, value, extraClass, tip, sub) {
      const d = document.createElement('div');
      d.className = 'row-detail-stat' + (extraClass ? ' ' + extraClass : '');
      const subHtml = sub ? `<span class="stat-sub">${sub}</span>` : '';
      d.innerHTML = `<span class="stat-lbl">${label}</span><span class="stat-val">${value}</span>${subHtml}`;
      if (tip) {
        d.addEventListener('mouseover', e => showTip(e, tip));
        d.addEventListener('mousemove', moveTip);
        d.addEventListener('mouseout',  hideTip);
      }
      return d;
    }
    function makeRowLbl(text) {
      const d = document.createElement('div');
      d.className = 'stats-row-lbl';
      d.textContent = text;
      return d;
    }
    function makeColHdr(text, extraClass) {
      const d = document.createElement('div');
      d.className = 'stats-col-hdr-cell' + (extraClass ? ' ' + extraClass : '');
      d.textContent = text;
      return d;
    }

    const grid = document.createElement('div');
    grid.className = 'stats-grid';

    // Column header row
    grid.appendChild(document.createElement('div'));           // empty corner
    grid.appendChild(document.createElement('div'));           // col 1: no header
    grid.appendChild(makeColHdr('Kč / NPV',      'stats-cell-npv'));
    grid.appendChild(makeColHdr('Kč / diff CAPEX', 'stats-cell-capex'));

    // Row 1: Money
    const payVal = result.paybackYear != null ? result.paybackYear + ' let' : '—';
    grid.appendChild(makeRowLbl('Peníze'));
    grid.appendChild(makeStat('Návratnost',  payVal));
    grid.appendChild(makeStat('NPV',           fmtCZK(result.npv),       'stats-cell-npv'));
    grid.appendChild(makeStat('Rozdíl CAPEX', fmtCZK(result.capexDiff), 'stats-cell-capex'));

    // Row 2: Emissions
    if (savedT != null) {
      grid.appendChild(makeRowLbl('Emise'));
      grid.appendChild(makeStat('Úspora emisí', fmtCO2(savedT)));
      grid.appendChild(makeStat('Kč/t CO₂',
        fmtCZKperT(-result.npv, savedT), 'stats-cell-npv'));
      grid.appendChild(makeStat('Kč/t CO₂',
        fmtCZKperT(extraCapex, savedT), 'stats-cell-capex'));
    }

    // Row 3: natural gas (buildings) or liquid fuel/PHM (transport)
    {
      {
        const fis        = result.fossilImportSavings;
        grid.appendChild(makeRowLbl('Fosilní import (sc. 1)'));
        const s1Total = fis ? fis.scope1TotalMwh : null;
        const s1Ann   = fis ? fis.scope1AnnualMwh : null;
        const s2Total = fis ? fis.scope2TotalMwh  : null;
        const annSubS1 = s1Ann != null ? '(' + fmtMWh(s1Ann) + '/rok)' : null;
        grid.appendChild(makeStat('Úspora sc. 1 celkem', s1Total != null ? fmtMWh(s1Total) : '—',
          null, null, annSubS1));
        grid.appendChild(makeStat('Kč/MWh sc. 1',
          s1Total == null || !s1Total ? '—' : fmtCZKperMWh(-result.npv, s1Total),
          'stats-cell-npv'));
        grid.appendChild(makeStat('Kč/MWh sc. 1',
          s1Total == null || !s1Total ? '—' : fmtCZKperMWh(extraCapex, s1Total),
          'stats-cell-capex'));
        grid.appendChild(makeRowLbl('Fosilní import (sc. 2)'));
        const annSubS2 = fis ? '(' + fmtMWh(fis.scope2AnnualMwh) + '/rok)' : null;
        grid.appendChild(makeStat('Sc. 2 (el. grid)', s2Total != null ? fmtMWh(s2Total) : '—',
          null, null, annSubS2));
        grid.appendChild(makeStat('Gas factor', fis ? (fis.gasFactor * 100).toFixed(1) + ' %' : '—'));
        grid.appendChild(makeStat(''));
      }
    }

    panel.appendChild(grid);

    // NPV timeline chart
    const timelineEl = document.createElement('div');
    if ((result.yearByYear || []).length) {
      const tlHdr = document.createElement('div');
      tlHdr.className   = 'row-detail-section-label';
      tlHdr.textContent = 'Kumulativní NPV v čase';
      panel.appendChild(tlHdr);
      timelineEl.className = 'row-detail-timeline';
      panel.appendChild(timelineEl);
    }

    // Tornado chart
    const tornEl = document.createElement('div');
    const sens = result.sensitivity || [];
    if (sens.length) {
      const tornHdr = document.createElement('div');
      tornHdr.className   = 'row-detail-section-label';
      tornHdr.textContent = 'Citlivostní analýza';
      panel.appendChild(tornHdr);
      tornEl.className = 'row-detail-tornado';
      panel.appendChild(tornEl);
    }

    // Append panel before rendering charts so clientWidth is valid
    container.appendChild(panel);
    if (timelineEl.className) renderNpvTimeline(timelineEl, result);
    if (tornEl.className)     renderTornado(tornEl, result);
  }

  function renderNpvTimeline(container, result) {
    const FONT = 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif';
    const rows = result.yearByYear || [];
    if (!rows.length) return;

    const margin  = { top: 16, right: 12, bottom: 32, left: 64 };
    const chartH  = 110;

    const years  = rows.map(r => r.year);

    // Fixed bar step so every year occupies the same width regardless of lifetime.
    const BAR_STEP = 20;   // px per year slot (bar + gap)
    const chartW   = years.length * BAR_STEP;
    const totalW   = margin.left + chartW + margin.right;
    const totalH   = chartH + margin.top + margin.bottom;

    const [vMin, vMax] = d3.extent(rows, r => r.cumDisc);

    const xScale = d3.scaleBand().domain(years).range([0, chartW]).padding(0.12);
    const yScale = d3.scaleLinear()
      .domain([Math.min(vMin, 0), Math.max(vMax, 0)]).nice()
      .range([chartH, 0]);

    const svg = d3.select(container).append('svg')
      .attr('width', totalW).attr('height', totalH)
      .style('font-family', FONT)
      .style('display', 'block');

    const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Zero baseline
    const z = yScale(0);
    chart.append('line')
      .attr('x1', 0).attr('x2', chartW).attr('y1', z).attr('y2', z)
      .attr('stroke', '#ccc').attr('stroke-width', 1);

    // Payback year marker
    if (result.paybackYear != null && xScale(result.paybackYear) != null) {
      const px = xScale(result.paybackYear) + xScale.bandwidth() / 2;
      chart.append('line')
        .attr('x1', px).attr('x2', px).attr('y1', 0).attr('y2', chartH)
        .attr('stroke', '#aaa').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');
      chart.append('text').attr('x', px + 3).attr('y', 10)
        .attr('font-size', '10px').attr('fill', '#aaa').text('Návratnost');
    }

    // Bars
    rows.forEach(row => {
      const color = row.cumDisc >= 0 ? COLOR_FAVORABLE : COLOR_COSTLY;
      chart.append('rect')
        .attr('x', xScale(row.year))
        .attr('y', Math.min(yScale(row.cumDisc), z))
        .attr('width', xScale.bandwidth())
        .attr('height', Math.max(Math.abs(yScale(row.cumDisc) - z), 1))
        .attr('fill', color).attr('opacity', 0.75);
    });

    // X axis — thin out labels on longer lifetimes
    const lifetime   = years[years.length - 1] || 0;
    const step       = lifetime <= 15 ? 1 : lifetime <= 30 ? 5 : 10;
    const tickValues = years.filter(y => y % step === 0);
    chart.append('g')
      .attr('transform', `translate(0,${chartH})`).attr('class', 'chart-axis')
      .call(d3.axisBottom(xScale).tickValues(tickValues).tickFormat(d => d));
    chart.append('text')
      .attr('x', 0).attr('y', chartH + 28)
      .attr('text-anchor', 'start').attr('font-size', '11px').attr('fill', '#999')
      .text('Rok od investice →');

    // Y axis
    chart.append('g').attr('class', 'chart-axis')
      .call(d3.axisLeft(yScale).ticks(4).tickFormat(xAxisFmt));
  }

  function renderTornado(container, result) {
    const FONT = 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif';
    const sens  = [...(result.sensitivity || [])]
      .sort((a, b) => (b.maxNpv - b.minNpv) - (a.maxNpv - a.minNpv));
    if (!sens.length) return;

    const width   = container.clientWidth || 560;
    const TROW_H  = 26;
    const TLBL_W  = 220;
    const TM      = { top: 22, right: 12, bottom: 28 };
    const totalH  = sens.length * TROW_H + TM.top + TM.bottom;
    const chartW  = Math.max(width - TLBL_W - TM.right, 80);

    const baseNpv = result.npv;
    const allVals = [0, baseNpv, ...sens.flatMap(s => [s.minNpv, s.maxNpv])];
    const [xMin, xMax] = d3.extent(allVals);
    const pad = (xMax - xMin) * 0.06 || 10000;
    const xScale = d3.scaleLinear()
      .domain([Math.min(xMin - pad, 0), Math.max(xMax + pad, 0)])
      .nice().range([0, chartW]);

    const svg = d3.select(container).append('svg')
      .attr('width', width).attr('height', totalH)
      .style('font-family', FONT);

    const chart = svg.append('g').attr('transform', `translate(${TLBL_W},0)`);

    // Zero line
    const z = xScale(0);
    chart.append('line')
      .attr('x1', z).attr('x2', z)
      .attr('y1', TM.top - 2).attr('y2', totalH - TM.bottom)
      .attr('stroke', '#aaa').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');
    chart.append('text').attr('x', z).attr('y', TM.top - 4)
      .attr('text-anchor', 'middle').attr('font-size', '10px').attr('fill', '#aaa')
      .text('NPV = 0');

    sens.forEach((s, i) => {
      const midY = TM.top + i * TROW_H + TROW_H / 2;
      const barH = TROW_H * 0.55;

      // Parameter label
      svg.append('text').attr('x', TLBL_W - 6).attr('y', midY + 4)
        .attr('text-anchor', 'end').attr('font-size', '12px').attr('fill', '#555')
        .text(s.param);

      // Downside bar: baseNpv → minNpv (worse direction)
      if (s.minNpv !== baseNpv) {
        chart.append('rect')
          .attr('x', xScale(Math.min(baseNpv, s.minNpv)))
          .attr('y', midY - barH / 2)
          .attr('width', Math.abs(xScale(s.minNpv) - xScale(baseNpv)))
          .attr('height', barH)
          .attr('fill', COLOR_COSTLY).attr('opacity', 0.75);
      }
      // Upside bar: baseNpv → maxNpv (better direction)
      if (s.maxNpv !== baseNpv) {
        chart.append('rect')
          .attr('x', xScale(Math.min(baseNpv, s.maxNpv)))
          .attr('y', midY - barH / 2)
          .attr('width', Math.abs(xScale(s.maxNpv) - xScale(baseNpv)))
          .attr('height', barH)
          .attr('fill', COLOR_FAVORABLE).attr('opacity', 0.75);
      }
    });

    // X axis
    chart.append('g')
      .attr('transform', `translate(0,${totalH - TM.bottom})`)
      .attr('class', 'chart-axis')
      .call(d3.axisBottom(xScale).ticks(4).tickFormat(xAxisFmt));
  }

  // ── Render all ────────────────────────────────────────────────────────────
  function renderAll() {
    // Close any open detail panels — params changed, values would be stale
    document.querySelectorAll('.row-detail').forEach(el => el.remove());

    const summaryEl = document.getElementById('summary-chart');
    if (summaryEl) renderSummaryChart(summaryEl);

    document.querySelectorAll('.measure-chart[data-section]').forEach(el => {
      if (el.dataset.group) {
        renderGroupChart(el, el.dataset.section, el.dataset.group);
      } else {
        renderMeasureChart(el, el.dataset.section, el.dataset.measure);
      }
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    globalXDomain = computeGlobalDomain();

    // Compute fixed ordering using default params (state is at defaults here).
    fixedBuildingOrder  = getSummaryRows('buildings').map(r => r.name);
    fixedTransportOrder = getSummaryRows('transport').map(r => r.name);
    reorderSection('buildings', fixedBuildingOrder);
    // Transport uses fixed group headings (Nové / Ojeté) — no per-measure reordering needed.

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