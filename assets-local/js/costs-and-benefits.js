(function () {
  'use strict';

  const data = window.COSTS_AND_BENEFITS;
  if (!data) return;

  // ── State ────────────────────────────────────────────────────────────────
  // discountRate is fixed (control removed); stored as integer % points, /100 on use.
  // priceUncertainty: −10 / 0 / +10 (%)  → globalPriceFactor (scales all fuel prices).
  // capexLevel: −1 optimistic / 0 mid / +1 pessimistic → capexMeasMult using each
  //   measure's own capex_sensitivity (so the toggle matches the tornado analysis).
  const state = {
    carbonPrice:           70,
    discountRate:           3,
    fuelScenario:          'CP',
    priceUncertainty:       0,
    capexLevel:             0,
    electricityPriceFactor: CostsBenefits.getDefaultElectricityPriceFactor(data),
  };

  const DEFAULT_CAPEX_SENSITIVITY = 0.1;  // fallback when a measure omits capex_sensitivity

  // NPV at default slider values — used as the permanent sort key so row order
  // never changes when the user moves the controls.
  const defaultNpvMap = new Map();

  function findMeasure(id) {
    return [...(data.buildings_measures || []), ...(data.transport_measures || [])]
      .find(m => m.id === id);
  }

  // Shared calculate() options for the current control state, per measure.
  function calcOpts(measure) {
    const capexSens = measure.capex_sensitivity != null ? measure.capex_sensitivity : DEFAULT_CAPEX_SENSITIVITY;
    return {
      measureId:              measure.id,
      data,
      discountRate:           state.discountRate / 100,
      carbonPriceEur:         state.carbonPrice,
      priceScenario:          state.fuelScenario,
      electricityPriceFactor: state.electricityPriceFactor,
      globalPriceFactor:      1 + state.priceUncertainty / 100,
      capexMeasMult:          1 + state.capexLevel * capexSens,
    };
  }

  // ── Tooltip ──────────────────────────────────────────────────────────────
  // A single floating div reused by all charts. Appears immediately on hover
  // (no browser-native <title> delay).
  const tip = document.createElement('div');
  Object.assign(tip.style, {
    position:      'fixed',
    pointerEvents: 'none',
    background:    '#fff',
    color:         '#515b66',
    border:        '1px solid #dce3e8',
    borderRadius:  '8px',
    padding:       '7px 11px',
    fontSize:      '13px',
    lineHeight:    '1.45',
    fontFamily:    'Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif',
    whiteSpace:    'pre-wrap',  // keep \n line breaks AND wrap long lines
    boxShadow:     '0 4px 14px rgba(0,0,0,0.12)',
    zIndex:        '9999',
    display:       'none',
    maxWidth:      '280px',
  });
  document.body.appendChild(tip);

  function showTip(event, text) {
    tip.style.whiteSpace = 'pre-wrap';
    tip.style.maxWidth = '280px';
    tip.textContent = text;
    tip.style.display = 'block';
    moveTip(event);
  }
  function showTipHtml(event, html) {
    tip.style.whiteSpace = 'normal';
    tip.style.maxWidth = 'none';   // let the card widen so the label stays on one line
    tip.innerHTML = html;
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
    const carbonPrices    = [0, 200];
    const scenarios       = ['CP', 'NZ', 'CP_EC'];
    const priceFactors    = [0.9, 1.1];   // ± energy-price uncertainty extremes
    const capexLevels     = [-1, 1];       // optimistic / pessimistic CAPEX extremes

    for (const m of allMeasures) {
      const capexSens = m.capex_sensitivity != null ? m.capex_sensitivity : DEFAULT_CAPEX_SENSITIVITY;
      for (const cp of carbonPrices) {
        for (const sc of scenarios) {
          for (const gf of priceFactors) {
            for (const cl of capexLevels) {
              try {
                const result = CostsBenefits.calculate({
                  measureId:             m.id,
                  data,
                  discountRate:          state.discountRate / 100,
                  carbonPriceEur:        cp,
                  priceScenario:         sc,
                  electricityPriceFactor: state.electricityPriceFactor,
                  globalPriceFactor:     gf,
                  capexMeasMult:         1 + cl * capexSens,
                });
                vals.push(result.npv);
              } catch (_) { /* skip */ }
            }
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
      const result = CostsBenefits.calculate(calcOpts(measure));
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

  // Worst-/best-case NPV band = min/max NPV over the full factorial of three levers:
  // energy scenario (CP/CP_EC/NZ) × investment-cost level (optimistic/pessimistic) ×
  // carbon price (0–200 €/t). Exact NPV is evaluated at every combination (no summing
  // approximation). Other inputs stay at the current setting, so the current dot always
  // lies within the band.
  function computeBand(measure) {
    const base  = calcOpts(measure);
    const capexSens = measure.capex_sensitivity != null ? measure.capex_sensitivity : DEFAULT_CAPEX_SENSITIVITY;
    const npvOf = o => { try { return CostsBenefits.calculate(o).npv; } catch (_) { return null; } };
    let lo = Infinity, hi = -Infinity;
    // Full factorial of: energy scenario × Výše investičních nákladů × cena uhlíku.
    // Other inputs stay at the current setting, so the dot always sits inside the band.
    for (const sc of ['CP', 'CP_EC', 'NZ']) {           // energy scenario
      for (const cl of [-1, 1]) {                        // investment-cost extremes
        for (const cp of [0, 200]) {                     // carbon-price extremes
          const v = npvOf({ ...base, priceScenario: sc, carbonPriceEur: cp,
                            capexMeasMult: 1 + cl * capexSens });
          if (v == null) continue;
          lo = Math.min(lo, v);
          hi = Math.max(hi, v);
        }
      }
    }
    return isFinite(lo) && isFinite(hi) ? { lo, hi } : null;
  }

  // ── Formatting ───────────────────────────────────────────────────────────
  const fmtInt = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 });

  function fmtCZK(v) {
    const sign = v < 0 ? '−' : '+';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + (Math.round(abs / 1e5) / 10).toFixed(1).replace('.', ',') + '\u00a0mil. Kč';
    if (abs >= 1e3) return sign + fmtInt.format(Math.round(abs / 1e3))    + '\u00a0tis. Kč';
    return sign + fmtInt.format(abs) + '\u00a0Kč';
  }

  function fmtCO2(savedT) {
    if (savedT === null || savedT === undefined) return '—';
    const sign = savedT < 0 ? '−' : '';
    const abs  = Math.abs(savedT);
    if (abs >= 100) return sign + fmtInt.format(Math.round(abs))           + '\u00a0t CO₂';
    if (abs >= 1)   return sign + (Math.round(abs * 10) / 10).toFixed(1).replace('.', ',')  + '\u00a0t CO₂';
    return sign + fmtInt.format(Math.round(abs * 1000)) + '\u00a0kg CO₂';
  }

  // X t CO₂ (or kg CO₂) saved per 1 000 CZK of `czk`.
  // Round x (positive) to 3 significant figures, no trailing zeros.
  function fmt3sig(x) { return parseFloat(x.toPrecision(3)).toString().replace('.', ','); }

  // Kč needed to save 1 t CO₂ (czk signed: + = cost, −= earning).
  function fmtCZKperT(czk, savedT) {
    if (savedT == null || !savedT || !isFinite(czk / savedT)) return '—';
    const v    = czk / savedT;
    const sign = v < 0 ? '−' : '';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + fmt3sig(abs / 1e6) + ' mil. Kč/t CO₂';
    if (abs >= 1e3) return sign + fmt3sig(abs / 1e3) + ' tis. Kč/t CO₂';
    return sign + fmt3sig(abs) + ' Kč/t CO₂';
  }

  // Kč needed to save 1 MWh of gas (czk signed: + = cost, −= earning).
  function fmtCZKperMWh(czk, mwh) {
    if (mwh == null || !mwh || !isFinite(czk / mwh)) return '—';
    const v    = czk / mwh;
    const sign = v < 0 ? '−' : '';
    const abs  = Math.abs(v);
    if (abs >= 1e6) return sign + fmt3sig(abs / 1e6) + ' mil. Kč/MWh';
    if (abs >= 1e3) return sign + fmt3sig(abs / 1e3) + ' tis. Kč/MWh';
    return sign + fmt3sig(abs) + ' Kč/MWh';
  }

  // Kč needed to save 1 litre of fuel (czk signed: + = cost, −= earning).
  function fmtCZKperL(czk, litres) {
    if (litres == null || !litres || !isFinite(czk / litres)) return '—';
    const v    = czk / litres;
    const sign = v < 0 ? '−' : '';
    const abs  = Math.abs(v);
    if (abs >= 1000) return sign + fmt3sig(abs / 1000) + ' tis. Kč/l';
    return sign + fmt3sig(abs) + ' Kč/l';
  }

  function fmtL(litres) {
    if (litres == null || !isFinite(litres)) return '—';
    const sign = litres < 0 ? '−' : '';
    const abs  = Math.abs(litres);
    if (abs >= 1000) return sign + fmtInt.format(Math.round(abs / 10) * 10) + ' l';
    return sign + fmtInt.format(Math.round(abs)) + ' l';
  }

  function fmtMWh(mwh) {
    if (mwh == null || !isFinite(mwh)) return '—';
    const sign = mwh < 0 ? '−' : '';
    const abs  = Math.abs(mwh);
    if (abs >= 1000) return sign + (Math.round(abs / 100) / 10).toFixed(1).replace('.', ',') + ' GWh';
    if (abs >= 1)    return sign + fmtInt.format(Math.round(abs))           + ' MWh';
    return sign + fmtInt.format(Math.round(abs * 1000)) + ' kWh';
  }

  // ── Controls ─────────────────────────────────────────────────────────────
  function setupControls() {
    setupSlider('carbon-price-slider', 'carbon-price-value', v => {
      state.carbonPrice = v;
      return v + '\u00a0€/t\u00a0CO₂';
    });
    setupSegmented('fuel-scenario-seg', 'scenario', v => { state.fuelScenario = v; updateCarbonLock(); });
    setupSegmented('capex-level-seg',  'capex',    v => { state.capexLevel = +v; });
    // Group-level hover: control-labels carrying a data-desc get the same styled tooltip.
    document.querySelectorAll('#secondary-navbar .control-label[data-desc]').forEach(lbl => {
      const html = `<div style="font-size:12px;font-weight:700;color:${CLR_TEXT};margin-bottom:3px">${lbl.textContent}</div>`
        + `<div style="font-size:12px;color:${CLR_SUB};max-width:240px">${lbl.dataset.desc}</div>`;
      lbl.style.cursor = 'help';
      lbl.addEventListener('mouseover', e => showTipHtml(e, html));
      lbl.addEventListener('mousemove', moveTip);
      lbl.addEventListener('mouseout',  hideTip);
    });
    updateCarbonLock();
  }

  // Under Net-zero the carbon price follows the scenario trajectory, so the slider
  // is inert — cover it with an explanatory overlay.
  function updateCarbonLock() {
    document.getElementById('carbon-group')?.classList.toggle('is-locked', state.fuelScenario === 'NZ');
  }

  // Segmented control: single-click select, active state, re-render. Each button's
  // data-desc shows as the styled (summary-chart) tooltip on hover.
  function setupSegmented(containerId, dataKey, onSelect) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const btns = el.querySelectorAll('.seg-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        onSelect(btn.dataset[dataKey]);
        renderAll();
      });
      if (btn.dataset.desc) {
        const html = `<div style="font-size:12px;font-weight:700;color:${CLR_TEXT};margin-bottom:3px">${btn.textContent}</div>`
          + `<div style="font-size:12px;color:${CLR_SUB};max-width:240px">${btn.dataset.desc}</div>`;
        btn.addEventListener('mouseover', e => showTipHtml(e, html));
        btn.addEventListener('mousemove', moveTip);
        btn.addEventListener('mouseout',  hideTip);
      }
    });
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
  // Fixed display order of the building measures (summary chart + section flow).
  const BUILDING_ORDER = [
    'Tepelné čerpadlo',
    'Renovace se zateplením',
    'Střešní fotovoltaika + baterie',
    'Kotel na dřevo',
    'Elektrický kotel',
  ];
  const buildingOrderIdx = n => { const i = BUILDING_ORDER.indexOf(n); return i === -1 ? 999 : i; };

  // Buildings ordered by the fixed list above; transport collapsed to one row.
  function getSummaryRows(section) {
    const isBuildings = section === 'buildings';
    const allMeasures = isBuildings ? data.buildings_measures : data.transport_measures;
    const catField    = isBuildings ? 'building_category' : 'transport_category';

    // Transport: collapse every electric-vs-fossil comparison onto a single row.
    if (!isBuildings) {
      const dots = allMeasures
        .filter(m => m.measure_baseline_id || m.measure_baseline)
        .map(m => {
          const calc = computeRow(m);
          if (!calc) return null;
          const detail = m.measure_baseline ? m.measure_name + ' vs. ' + m.measure_baseline : m.measure_name;
          return { label: detail, npv: calc.npv };
        })
        .filter(Boolean);
      return dots.length
        ? [{ name: 'Elektromobil', baseline: 'automobil na fosilní paliva', dots }]
        : [];
    }

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
      .sort((a, b) => buildingOrderIdx(a.name) - buildingOrderIdx(b.name));
  }

  const xAxisFmt = v => {
    const a = Math.abs(v);
    const s = v < 0 ? '−' : v > 0 ? '+' : '';
    if (a >= 1e6) return s + (a / 1e6).toFixed(1).replace('.', ',') + ' mil.';
    if (a >= 1e3) return s + Math.round(a / 1e3)  + ' tis.';
    return v === 0 ? '0' : s + a;
  };

  // ── Summary chart ─────────────────────────────────────────────────────────
  const SUMMARY_ROW_H   = 72;   // match the measure-chart ROW_H
  const SUMMARY_LABEL_W = 300;   // room for the leading measure icon + label
  const SUMMARY_ICON_SZ = 34;    // leading measure illustration
  const SUMMARY_LABEL_X = 4 + SUMMARY_ICON_SZ + 10;   // text starts after the icon
  const SUMMARY_MARGIN  = { top: 50, right: 16, bottom: 34 };  // top: header + direction labels; bottom: x-axis
  const SECTION_GAP     = 26;   // extra top padding before each later section
  const SECTION_HDR_H   = 22;

  const COLOR_BUILDINGS = '#2860b4';
  const COLOR_TRANSPORT = '#6b4fa0';

  // NPV > 0: favorable (teal); NPV < 0: costly (red)
  const COLOR_FAVORABLE = '#1a7a85';
  const COLOR_COSTLY    = '#903156';   // unified adverse/negative colour (matches the NPV dot)

  // CO₂ squares — fixed global scale so all measures are comparable
  const CO2_UNIT     = 25;  // 1 box = 25 t CO₂ (= 25 000 kg)
  const CO2_MAX_COLS =  4;  // wrap to new row after 4 boxes (= 100 t = 100K kg)

  function renderSummaryChart(container) {
    if (!globalXDomain) return;

    const sections = [
      { label: 'Opatření v budovách', rows: getSummaryRows('buildings'), color: COLOR_BUILDINGS },
      { label: 'Opatření v dopravě',  rows: getSummaryRows('transport'),  color: COLOR_TRANSPORT },
    ].filter(s => s.rows.length > 0);

    if (!sections.length) { container.hidden = true; return; }

    const totalW  = container.clientWidth || 640;
    const chartW  = Math.max(totalW - SUMMARY_LABEL_W - SUMMARY_MARGIN.right, 120);
    const totalH  = sections.reduce((h, s) =>
      h + SECTION_HDR_H + s.rows.length * SUMMARY_ROW_H, 0
    ) + SUMMARY_MARGIN.top + SUMMARY_MARGIN.bottom + SECTION_GAP * (sections.length - 1);

    const xScale = d3.scaleLinear().domain(globalXDomain).range([0, chartW]);
    const z      = xScale(0);

    // ── Create SVG skeleton once ──────────────────────────────────────────
    let svg = d3.select(container).select('svg');
    if (svg.empty()) {
      svg = d3.select(container).append('svg').attr('role', 'img')
        .style('font-family', 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif');
      svg.append('text').attr('class', 'npv-hdr').attr('text-anchor', 'middle').attr('y', 16)
        .attr('font-family', CB_FONT).attr('font-size', '13px').attr('font-weight', '700')
        .style('letter-spacing', '0.04em').attr('fill', CLR_HDR);
      svg.append('g').attr('class', 'x-top');   // NPV scale labels + ticks below the chart
      svg.append('text').attr('class', 'half-lbl half-lbl-l')
        .attr('font-family', CB_FONT).attr('font-size', '14px').attr('font-weight', '500').attr('text-anchor', 'middle');
      svg.append('text').attr('class', 'half-lbl half-lbl-r')
        .attr('font-family', CB_FONT).attr('font-size', '14px').attr('font-weight', '500').attr('text-anchor', 'middle');
      svg.append('g').attr('class', 'sec-hdrs');
      svg.append('g').attr('class', 'rows-g');
    }

    svg.attr('width', totalW).attr('height', totalH);

    // Update static elements that depend on width/height
    svg.select('.npv-hdr').attr('x', SUMMARY_LABEL_W + chartW / 2).attr('y', 16)
      .text('ROZDÍL NET PRESENT VALUE OPROTI EMISNĚ NÁROČNĚJŠÍ VARIANTĚ (Kč)');

    // Direction labels — under the header, flanking the 0 line (neutral colour)
    svg.select('.half-lbl-l')
      .attr('x', SUMMARY_LABEL_W + z - 8).attr('y', 36).attr('text-anchor', 'end')
      .attr('fill', CLR_TEXT)
      .text('← Emisně náročnější varianta je výhodnější');
    svg.select('.half-lbl-r')
      .attr('x', SUMMARY_LABEL_W + z + 8).attr('y', 36).attr('text-anchor', 'start')
      .attr('fill', CLR_TEXT)
      .text('Nízkoemisní opatření je výhodnější →');

    // NPV scale — bottom axis: short tick then label, neutral grey; drop the −1 mil. label
    const xtop = svg.select('.x-top');
    xtop.selectAll('*').remove();
    const axisY = totalH - SUMMARY_MARGIN.bottom + 6;
    xScale.ticks(5).filter(t => t > -1e6).forEach(t => {
      const tx = SUMMARY_LABEL_W + xScale(t);
      xtop.append('line')
        .attr('x1', tx).attr('x2', tx).attr('y1', axisY).attr('y2', axisY + 6)
        .attr('stroke', '#cfd6dc').attr('stroke-width', 1);
      xtop.append('text')
        .attr('x', tx).attr('y', axisY + 20).attr('text-anchor', 'middle')
        .attr('font-size', '12px').attr('fill', CLR_SUB).text(xAxisFmt(t));
    });

    // ── Section headers (fixed y — row counts never change) ───────────────
    // Pre-compute y-offsets per section
    const secOffsets = [];
    let cy = SUMMARY_MARGIN.top;
    sections.forEach((s, i) => {
      if (i > 0) cy += SECTION_GAP;   // extra top padding before each later section
      secOffsets.push({ headerY: cy, rowsY: cy + SECTION_HDR_H });
      cy += SECTION_HDR_H + s.rows.length * SUMMARY_ROW_H;
    });

    const secSel = svg.select('.sec-hdrs').selectAll('text.sec-hdr')
      .data(sections, s => s.label);
    secSel.enter().append('text').attr('class', 'sec-hdr')
      .attr('font-size', '13px').attr('font-weight', '700').style('letter-spacing', '0.04em')
      .merge(secSel)
      .attr('x', 4)
      .attr('fill', CLR_HDR)
      .attr('y', (s, i) => secOffsets[i].headerY + 14)
      .text(s => s.label.toUpperCase());
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

    rowEnter.append('line').attr('class', 'r-divider').attr('stroke', '#eaedf0').attr('stroke-width', 1);
    rowEnter.append('line').attr('class', 'r-zero').attr('stroke', '#eaedf0').attr('stroke-width', 1);
    rowEnter.append('image').attr('class', 'r-icon').attr('x', 4)
      .attr('width', SUMMARY_ICON_SZ).attr('height', SUMMARY_ICON_SZ);
    rowEnter.append('text').attr('class', 'r-name').attr('x', SUMMARY_LABEL_X)
      .attr('font-family', CB_FONT).attr('font-size', '14px').attr('font-weight', '700').attr('fill', CLR_TEXT);
    rowEnter.append('text').attr('class', 'r-base').attr('x', SUMMARY_LABEL_X)
      .attr('font-family', CB_FONT).attr('font-size', '14px').attr('font-weight', '500').attr('fill', CLR_TEXT);
    rowEnter.append('g').attr('class', 'r-dots');

    // MERGE — transition y-position; update content
    const rowAll = rowSel.merge(rowEnter);

    rowAll.transition().duration(ANIM_MS).ease(d3.easeCubicInOut)
      .attr('transform', d => `translate(0,${d.targetY})`)
      .attr('opacity', 1);

    rowAll.each(function (row) {
      const g   = d3.select(this);
      const mid = SUMMARY_ROW_H / 2;

      // Per-row divider (top edge) + solid zero tick — matching the measure charts
      const ZG = 8;
      g.select('.r-divider').attr('x1', 0).attr('x2', totalW).attr('y1', 0).attr('y2', 0);
      g.select('.r-zero')
        .attr('x1', SUMMARY_LABEL_W + z).attr('x2', SUMMARY_LABEL_W + z)
        .attr('y1', ZG).attr('y2', SUMMARY_ROW_H - ZG);

      const iconHref = measureIconHref(row.name);
      g.select('.r-icon')
        .attr('y', mid - SUMMARY_ICON_SZ / 2)
        .attr('href', iconHref)
        .style('display', iconHref ? null : 'none');

      g.select('.r-name').attr('y', row.baseline ? mid - 2 : mid + 5).text(row.name);
      g.select('.r-base').attr('y', mid + 15).text(row.baseline ? 'vs. ' + lcBaseline(row.baseline) : '');

      const dotsG = g.select('.r-dots');
      dotsG.selectAll('*').remove();
      for (const dot of row.dots) {
        const html = summaryDotTip(dot, row.name);
        dotsG.append('circle')
          .attr('cx', SUMMARY_LABEL_W + xScale(dot.npv.value)).attr('cy', mid)
          .attr('r', 7).attr('fill', npvDotColor(dot.npv.value))
          .attr('stroke', 'white').attr('stroke-width', 2).attr('opacity', 0.85)
          .style('cursor', 'pointer')
          .on('mouseover', e  => showTipHtml(e, html))
          .on('mousemove', moveTip)
          .on('mouseout',  hideTip);
      }
    });

    rowSel.exit().transition().duration(ANIM_MS).attr('opacity', 0).remove();
  }

  // ── Detailed measure chart ────────────────────────────────────────────────
  // Visual style ported from the explainer beeswarm (costs-benefits-beeswarm.js):
  // Inter typography, slate/grey palette, energy-class badges, block/circle
  // pictographs for CO₂ & fossil-import, diverging NPV dot colour.
  const ROW_H   = 72;
  const LABEL_W = 210;
  const CO2_W   = 120;
  const FUEL_W  = 160;
  const ICON_W  = 30;   // trailing "more info" affordance column
  const MARGIN  = { top: 50, right: 12, bottom: 34 };

  const SQ         = 9;    // pictograph square/circle size (px)
  const SQ_PER_ROW = 5;    // wrap to a new row after 5
  const CO2_PER_SQ = 20;   // 1 square = 20 t CO₂
  const MWH_PER_SQ = 50;   // 1 circle = 50 MWh

  // ── Beeswarm palette ───────────────────────────────────────────────────────
  const CB_FONT      = 'Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif';
  const CLR_TEXT     = '#515b66';  // primary labels, measure name, NPV label
  const CLR_SUB      = '#9ea7b3';  // stat pictographs, zero line, secondary
  const CLR_POS      = '#006063';  // favorable (NPV > 0) end of diverging scale
  const CLR_NEG_COAL = '#903156';  // adverse NPV dot (flat, no gradient)
  const CLR_NEG_GAS  = '#903156';  // emission-increase pictograph (unified with the adverse colour)
  const CLR_HDR      = '#3e3e4c';  // column / chart-title headers (dark slate)

  // Leading illustration icon per measure (shared with the explainer beeswarm set).
  const CB_ICON_BASE   = '/assets-local/img/costs-and-benefits';
  const MEASURE_ICONS  = {
    'Tepelné čerpadlo':               'tepelne-cerpadlo',
    'Renovace se zateplením':         'zatepleni',
    'Střešní fotovoltaika + baterie': 'fotovoltaika',
    'Kotel na dřevo':                 'biomasa-kotel',
    'Elektrický kotel':               'elektrokotel',
    'Elektromobil':                   'elektroauto-male',
  };
  function measureIconHref(name) {
    return MEASURE_ICONS[name] ? `${CB_ICON_BASE}/${MEASURE_ICONS[name]}.svg` : null;
  }

  // NPV dot: flat favourable (teal) vs. adverse (maroon) — no gradient, no fuel variation.
  function npvDotColor(npv) { return npv >= 0 ? COLOR_FAVORABLE : CLR_NEG_COAL; }

  // Split a context label like "Rodinný dům uhlí – E" into { prefix, badge:'E' }.
  // Labels without a trailing " – <A–F>" (transport, apartments, measure names)
  // return the whole string as prefix and no badge.
  function splitLabel(label) {
    const m = /^(.*?)\s*–\s*([A-F])\s*$/.exec(label || '');
    return m ? { prefix: m[1], badge: m[2] } : { prefix: label || '', badge: null };
  }

  // Arrow-shaped energy-class badge as an inline HTML span (wraps naturally in the
  // foreignObject label). ponytail: HTML clip-path instead of an SVG polygon so the
  // whole label stays in one wrapping <div>.
  function badgeHtml(letter, marginLeft = 5) {
    if (!letter) return '';
    return `<span style="display:inline-block;background:${CLR_TEXT};color:#fff;` +
           `font-size:8px;font-weight:700;line-height:1.3;padding:1px 8px 1px 5px;margin-left:${marginLeft}px;` +
           `clip-path:polygon(0 0,72% 0,100% 50%,72% 100%,0 100%);">${letter}</span>`;
  }

  // Context prefix, dropping the trailing fuel word (uhlí/plyn) for measures where
  // the fuel is already implied by the "vs. baseline" line. Two measures keep it.
  const FUEL_IN_CONTEXT = ['Renovace se zateplením', 'Střešní fotovoltaika + baterie'];
  function contextPrefix(prefix, measureName) {
    if (FUEL_IN_CONTEXT.includes(measureName)) {
      return prefix.replace(/\s+uhlí\s*$/i, ' (kotel na uhlí)').replace(/\s+plyn\s*$/i, ' (kotel na plyn)');
    }
    return prefix.replace(/\s+(uhlí|plyn)\s*$/i, '');
  }

  // Lowercase the first letter of each comma-separated baseline name (used after "vs.").
  const lcBaseline = s => s ? s.split(', ').map(p => p.charAt(0).toLowerCase() + p.slice(1)).join(', ') : s;

  // Context label HTML for a row. FVE is distinguished by household electricity use
  // ("⚡ SPOTŘEBA X MWh"), everything else by its energy-class badge + building type.
  function contextHtml(measureName, measureId, label) {
    if (measureName === 'Střešní fotovoltaika + baterie') {
      const m = findMeasure(measureId);
      const mwh = m && m.demand_electricity_mwh != null ? m.demand_electricity_mwh : null;
      const building = splitLabel(label).prefix.replace(/\s+(uhlí|plyn)\s*$/i, '').toUpperCase();
      const bolt = `<svg width="7" height="11" viewBox="0 0 7.102574 11.367486" style="display:inline-block;vertical-align:-1px;margin-right:4px">`
        + `<path d="M7.102574,4.520453L3.551287,4.520453L3.551287,0L0,6.846908L3.551287,6.846908L3.551287,11.367486Z" fill="${CLR_TEXT}"/></svg>`;
      return building + ' ' + bolt + 'SPOTŘEBA' + (mwh != null ? ' ' + mwh + ' MWh' : '');
    }
    const { prefix, badge } = splitLabel(label);
    return badgeHtml(badge, 0) + (badge ? ' ' : '') + contextPrefix(prefix, measureName).toUpperCase();
  }

  // HTML for a summary-dot tooltip: context label (badge + context, fuel-aware) + value.
  function summaryDotTip(dot, measureName) {
    const { prefix, badge } = splitLabel(dot.label || '');
    const ctxText = badge
      ? badgeHtml(badge, 0) + ' ' + contextPrefix(prefix, measureName).toUpperCase()
      : (dot.label || '').toUpperCase();
    const ctx = `<div style="font-size:11px;font-weight:700;letter-spacing:0.04em;color:${CLR_SUB};margin-bottom:3px;white-space:nowrap">${ctxText}</div>`;
    const val = `<div style="font-size:15px;font-weight:700;color:${npvDotColor(dot.npv.value)}">${fmtCZK(dot.npv.value)}</div>`;
    return ctx + val;
  }

  // Grid of grey squares growing upward from bottomY, centred on cx.
  function drawBlockGrid(svg, cx, bottomY, n, perRow, sq, fill) {
    if (n <= 0) return;
    n = Math.min(n, perRow * 2);
    const startX = cx - (perRow * sq) / 2;
    for (let i = 0; i < n; i++) {
      svg.append('rect')
        .attr('x', startX + (i % perRow) * sq)
        .attr('y', bottomY - (Math.floor(i / perRow) + 1) * sq)
        .attr('width', sq).attr('height', sq)
        .attr('fill', fill || CLR_SUB).attr('stroke', 'white').attr('stroke-width', 0.5);
    }
  }

  // Grid of circles growing upward from bottomY, centred on cx.
  function drawCircleGrid(svg, cx, bottomY, n, perRow, sq, fill) {
    if (n <= 0) return;
    n = Math.min(n, perRow * 2);
    const rr = sq / 2, startX = cx - (perRow * sq) / 2;
    for (let i = 0; i < n; i++) {
      svg.append('circle')
        .attr('cx', startX + (i % perRow) * sq + rr)
        .attr('cy', bottomY - (Math.floor(i / perRow) + 1) * sq + rr)
        .attr('r', rr - 0.8).attr('fill', fill || CLR_SUB);
    }
  }

  // Build styled row objects from a list of measure entries.
  // labelField = 'building_category' | 'transport_category' | 'measure_name'.
  function buildRows(entries, labelField) {
    return entries
      .map(m => {
        const calc = computeRow(m);
        if (!calc) return null;
        if (!defaultNpvMap.has(m.id)) defaultNpvMap.set(m.id, calc.npv.value);
        const band = computeBand(m);
        const npv  = band
          ? { value: calc.npv.value,
              low:  Math.min(band.lo, calc.npv.value),
              high: Math.max(band.hi, calc.npv.value) }
          : calc.npv;
        return {
          label:               m[labelField],
          measureName:         m.measure_name || null,
          baselineName:        m.measure_baseline || null,
          measureId:           m.id,
          npv,
          co2Saved:            calc.co2Saved,
          capexDiff:           calc.capexDiff,
          sector:              calc.sector,
          gasSavings:          calc.gasSavings,
          fuelSavings:         calc.fuelSavings,
          fossilImportSavings: calc.fossilImportSavings,
          sensitivity:         calc.sensitivity,
        };
      })
      .filter(Boolean)
      .sort((a, b) => (defaultNpvMap.get(b.measureId) ?? 0) - (defaultNpvMap.get(a.measureId) ?? 0));
  }

  // ── Shared row-chart renderer (beeswarm-styled) ─────────────────────────────
  // Clear-and-redraw (no reorder animation — rows only change on control change).
  function renderRowChart(container, rows, colHeaderLabel) {
    const totalW = container.clientWidth || 640;
    const chartW = Math.max(totalW - LABEL_W - CO2_W - FUEL_W - ICON_W - MARGIN.right, 160);
    const totalH = rows.length * ROW_H + MARGIN.top + MARGIN.bottom;

    const xScale = d3.scaleLinear().domain(globalXDomain || [-500000, 500000]).range([0, chartW]);
    const z = xScale(0);

    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append('svg')
      .attr('role', 'img').attr('width', totalW).attr('height', totalH)
      .style('font-family', CB_FONT);

    // Column x anchors. Stat columns are LEFT-aligned: texts and pictographs
    // start at *LX; GRID_HALF shifts a grid's centre so its left edge lands on *LX.
    const co2X0  = LABEL_W + chartW;
    const fuelX0 = co2X0 + CO2_W;
    const iconCX = fuelX0 + FUEL_W + ICON_W / 2;
    const co2LX  = co2X0 + 6;
    const fuelLX = fuelX0 + 6;
    const GRID_HALF = (SQ_PER_ROW * SQ) / 2;

    // ── Column headers (uppercase, multi-line via tspan) ──────────────────────
    const hdr = (x, lines, anchor = 'middle') => {
      const t = svg.append('text').attr('class', 'chart-col-header')
        .attr('x', x).attr('y', 28).attr('text-anchor', anchor)
        .attr('font-family', CB_FONT).attr('fill', CLR_HDR)
        .style('letter-spacing', '0.06em');
      lines.forEach((ln, i) =>
        t.append('tspan').attr('x', x).attr('dy', i === 0 ? '0' : '1.2em').text(ln));
      return t;
    };
    hdr(4, [colHeaderLabel], 'start');
    hdr(LABEL_W + chartW / 2, ['ROZDÍL V NET PRESENT VALUE']);
    hdr(co2LX,  ['SNÍŽENÍ', 'EMISÍ'], 'start');
    hdr(fuelLX, ['SNÍŽENÍ IMPORTU', 'ROPY A ZEMNÍHO PLYNU'], 'start');

    // ── Rows ────────────────────────────────────────────────────────────────
    const ZERO_GAP = 7;   // inset so the per-row zero tick never touches a divider
    rows.forEach((row, i) => {
      const top = MARGIN.top + i * ROW_H;
      const mid = top + ROW_H / 2;
      const numY = mid + 18;   // shared bottom baseline for all the value numbers
      const color = npvDotColor(row.npv.value);
      const dotX  = LABEL_W + xScale(row.npv.value);

      const g = svg.append('g').attr('class', 'd-row').style('cursor', 'pointer')
        .on('click', () => toggleRowDetail(container, row));
      g.append('rect')
        .attr('x', 0).attr('y', top).attr('width', totalW).attr('height', ROW_H)
        .attr('fill', 'transparent');

      // Divider between rows (skip above the first row)
      if (i > 0) {
        svg.append('line')
          .attr('x1', 0).attr('x2', totalW).attr('y1', top).attr('y2', top)
          .attr('stroke', '#eaedf0').attr('stroke-width', 1);
      }

      // Per-row zero tick — short segment that stops short of the dividers
      svg.append('line')
        .attr('x1', LABEL_W + z).attr('x2', LABEL_W + z)
        .attr('y1', top + ZERO_GAP).attr('y2', top + ROW_H - ZERO_GAP)
        .attr('stroke', '#eaedf0').attr('stroke-width', 1);

      // ── Label (foreignObject → HTML) ──────────────────────────────────────
      // Box spans the full row so the (secondary) context line may overflow the
      // column edge instead of wrapping; pointer-events:none keeps the chart
      // interactions (band/dot hover, row click) working underneath.
      const fo  = g.append('foreignObject')
        .attr('x', 4).attr('y', top + 2).attr('width', totalW - 8).attr('height', ROW_H - 4);
      const div = fo.append('xhtml:div')
        .style('display', 'flex').style('flex-direction', 'column')
        .style('justify-content', 'center').style('height', '100%')
        .style('pointer-events', 'none')
        .style('font-family', CB_FONT);
      // Label: context prefix + badge, measure name, then "vs. baseline" — all slate #515b66.
      // Buildings: measure name is already the section title, so the row shows only
      // the context (badge + building type) and the "vs. baseline" line.
      const hasContext = row.measureName && row.measureName !== row.label;
      if (hasContext) {
        div.append('xhtml:span')
          .style('font-size', '10px').style('font-weight', '700').style('line-height', '1.2')
          .style('color', CLR_TEXT).style('letter-spacing', '0.04em').style('white-space', 'nowrap')
          .html(contextHtml(row.measureName, row.measureId, row.label));
      } else {
        const { prefix, badge } = splitLabel(row.label);
        const mainText = badge ? prefix.toUpperCase() : row.label;
        div.append('xhtml:span')
          .style('font-size', '13px').style('font-weight', '600').style('line-height', '1.25')
          .style('color', CLR_TEXT).style('letter-spacing', badge ? '0.03em' : '0')
          .html(mainText + badgeHtml(badge));
      }
      if (row.baselineName) {
        div.append('xhtml:span')
          .style('font-size', '16px').style('font-weight', '500').style('margin-top', '2px')
          .style('color', CLR_TEXT)
          .text('vs. ' + lcBaseline(row.baselineName));
      }

      // ── NPV: uncertainty band + dot + label ────────────────────────────────
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

      svg.append('line')
        .attr('x1', LABEL_W + xScale(row.npv.low)).attr('x2', LABEL_W + xScale(row.npv.high))
        .attr('y1', mid).attr('y2', mid)
        .attr('stroke', CLR_SUB).attr('stroke-width', 5)
        .attr('stroke-linecap', 'round').attr('opacity', 0.3);
      svg.append('rect')
        .attr('x', LABEL_W + xScale(row.npv.low)).attr('y', mid - 8)
        .attr('width', Math.max(xScale(row.npv.high) - xScale(row.npv.low), 1)).attr('height', 16)
        .attr('fill', 'transparent')
        .on('mouseover', e => showTip(e, bandTip)).on('mousemove', moveTip).on('mouseout', hideTip);

      svg.append('circle')
        .attr('cx', dotX).attr('cy', mid).attr('r', 7)
        .attr('fill', color).attr('stroke', 'white').attr('stroke-width', 2)
        .on('mouseover', e => showTip(e, dotTip)).on('mousemove', moveTip).on('mouseout', hideTip);
      svg.append('text')
        .attr('x', dotX).attr('y', numY).attr('text-anchor', 'middle')
        .attr('font-family', CB_FONT).attr('font-size', '13px').attr('font-weight', '700')
        .attr('fill', CLR_TEXT).text(fmtCZK(row.npv.value));

      // ── CO₂: square pictograph + value (left-aligned). Emission INCREASES are
      //    red squares with the amount + a "zvyšuje emise" note underneath. ────
      const co2Neg = row.co2Saved !== null && row.co2Saved < 0;
      const co2Pos = row.co2Saved !== null && row.co2Saved > 0;
      const co2Mag = row.co2Saved !== null ? Math.abs(row.co2Saved) : 0;
      const nCo2 = (co2Pos || co2Neg)
        ? Math.min(SQ_PER_ROW * 2, Math.max(1, Math.round(co2Mag / CO2_PER_SQ))) : 0;
      const co2Col = co2Pos ? COLOR_FAVORABLE : co2Neg ? CLR_NEG_COAL : CLR_SUB;
      if (nCo2) drawBlockGrid(svg, co2LX + GRID_HALF, numY - 14, nCo2, SQ_PER_ROW, SQ, co2Col);
      svg.append('text')
        .attr('x', co2LX).attr('y', numY).attr('text-anchor', 'start')
        .attr('font-family', CB_FONT).attr('font-size', '12px').attr('font-weight', '700')
        .attr('fill', co2Col)
        .text(fmtCO2(co2Neg ? co2Mag : row.co2Saved));
      if (co2Neg) {
        svg.append('text')
          .attr('x', co2LX).attr('y', numY + 12).attr('text-anchor', 'start')
          .attr('font-family', CB_FONT).attr('font-size', '10px').attr('font-weight', '400')
          .attr('fill', CLR_NEG_COAL).text('zvyšuje emise');
      }

      // ── Fossil import: scope 1 + scope 2 total (same figure as the detail
      //    window's big number). Positive → teal circles + value. ──────────────
      const fis     = row.fossilImportSavings;
      const fuelTot = fis ? (fis.scope1TotalMwh || 0) + (fis.scope2TotalMwh || 0) : null;
      const fuelPos = fuelTot != null && fuelTot > 0;
      const nFuel   = fuelPos ? Math.min(SQ_PER_ROW * 2, Math.max(1, Math.round(fuelTot / MWH_PER_SQ))) : 0;
      const fuelCol = fuelTot == null || fuelTot === 0 ? CLR_SUB : fuelTot > 0 ? COLOR_FAVORABLE : CLR_NEG_COAL;
      if (fuelPos) drawCircleGrid(svg, fuelLX + GRID_HALF, numY - 14, nFuel, SQ_PER_ROW, SQ, COLOR_FAVORABLE);
      svg.append('text')
        .attr('x', fuelLX).attr('y', numY).attr('text-anchor', 'start')
        .attr('font-family', CB_FONT).attr('font-size', '12px').attr('font-weight', '700')
        .attr('fill', fuelCol).text(fuelTot == null ? '—' : fuelTot === 0 ? '–' : fmtMWh(fuelTot));

      // ── "more info" affordance — the whole row is already clickable; this only
      //    signals that a detail view exists. ────────────────────────────────
      g.append('foreignObject')
        .attr('x', iconCX - 12).attr('y', mid - 12).attr('width', 24).attr('height', 24)
        .append('xhtml:span')
        .attr('class', 'material-symbols-outlined')
        .attr('title', 'Zobrazit detail')
        .style('font-size', '20px').style('line-height', '24px').style('color', CLR_SUB)
        .text('manage_search');
    });

    // ── X axis (bottom, grey) ─────────────────────────────────────────────────
    svg.append('g').attr('class', 'chart-axis')
      .attr('transform', `translate(${LABEL_W},${MARGIN.top + rows.length * ROW_H})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(xAxisFmt))
      .call(sel => { sel.selectAll('.tick line').attr('stroke', CLR_SUB); sel.select('.domain').remove(); });
  }

  function renderMeasureChart(container, section, measureName) {
    const isBuildings = section === 'buildings';
    const allMeasures = isBuildings ? data.buildings_measures : data.transport_measures;
    const catField    = isBuildings ? 'building_category' : 'transport_category';

    const entries = allMeasures.filter(m =>
      m.measure_name === measureName && (m.measure_baseline_id || m.measure_baseline)
    );
    if (!entries.length) { container.hidden = true; return; }
    const rows = buildRows(entries, catField);
    if (!rows.length) { container.hidden = true; return; }
    container.hidden = false;
    renderRowChart(container, rows, 'KONTEXT');
  }

  // ── Group chart (transport: all measures in one category group) ──────────
  // Renders every measure whose transport_category starts with `group`
  // (e.g. "Nové" matches "Nové malé" and "Nové velké").
  function renderGroupChart(container, section, group) {
    const isBuildings = section === 'buildings';
    const allMeasures = isBuildings ? data.buildings_measures : data.transport_measures;
    const catField    = isBuildings ? 'building_category' : 'transport_category';

    const entries = allMeasures.filter(m =>
      (m.measure_baseline_id || m.measure_baseline) &&
      m[catField] && m[catField].startsWith(group)
    );
    if (!entries.length) { container.hidden = true; return; }
    const rows = buildRows(entries, 'measure_name');
    if (!rows.length) { container.hidden = true; return; }
    container.hidden = false;
    renderRowChart(container, rows, 'OPATŘENÍ');
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
  let openMeasureId = null;
  let openRowMeta   = null;   // { label, measureName, baselineName } — display metadata from clicked row

  function toggleRowDetail(_container, row) {
    if (openMeasureId === row.measureId) {
      openMeasureId = null;
      openRowMeta   = null;
      closeDetailBar();
      return;
    }
    openMeasureId = row.measureId;
    openRowMeta   = { label: row.label, measureName: row.measureName, baselineName: row.baselineName };
    renderOpenDetail();
  }

  function closeDetailBar() {
    const bar = document.getElementById('row-detail-bar');
    if (!bar) return;
    bar.classList.remove('is-open');
    bar.querySelector('.row-detail-inner').innerHTML = '';
    document.getElementById('row-detail-backdrop')?.classList.remove('is-open');
  }

  function renderOpenDetail() {
    if (!openMeasureId || !openRowMeta) return;
    const measure = findMeasure(openMeasureId);
    if (!measure) return;

    // Full result for timeline + tornado
    let result;
    try { result = CostsBenefits.calculate(calcOpts(measure)); } catch (e) { return; }

    // Reconstruct the full row object (same shape as buildRows produces)
    const calc = computeRow(measure);
    if (!calc) return;
    const band = computeBand(measure);
    const npv  = band
      ? { value: calc.npv.value, low: Math.min(band.lo, calc.npv.value), high: Math.max(band.hi, calc.npv.value) }
      : calc.npv;
    const row = {
      ...openRowMeta,
      measureId:           openMeasureId,
      npv,
      co2Saved:            calc.co2Saved,
      capexDiff:           calc.capexDiff,
      sector:              calc.sector,
      gasSavings:          calc.gasSavings,
      fuelSavings:         calc.fuelSavings,
      fossilImportSavings: calc.fossilImportSavings,
      sensitivity:         calc.sensitivity,
    };

    renderDetailPanel(row, result);
  }

  function statCell(label, value, iconEl, color, note, noteColor) {
    const cell = document.createElement('div');
    const l = document.createElement('div');
    l.className = 'rd-lbl';
    l.textContent = label;
    const v = document.createElement('div');
    v.className = 'rd-stat-val';
    if (iconEl) v.appendChild(iconEl);
    const t = document.createElement('span');
    t.textContent = value;
    if (color) t.style.color = color;
    v.appendChild(t);
    if (note) {
      const n = document.createElement('span');
      n.className = 'rd-stat-note';
      n.innerHTML = note;               // note may contain <strong>
      if (noteColor) n.style.color = noteColor;
      v.appendChild(n);
    }
    cell.appendChild(l);
    cell.appendChild(v);
    return cell;
  }

  // Plain CZK (no +/− sign) for descriptive amounts like CAPEX.
  function czkPlain(v) {
    const a = Math.abs(Math.round(v));
    if (a >= 1e6) return (Math.round(a / 1e5) / 10).toString().replace('.', ',') + ' mil. Kč';
    if (a >= 1e3) return fmtInt.format(Math.round(a / 1e3)) + ' tis. Kč';
    return fmtInt.format(a) + ' Kč';
  }

  // Payback verdict from the cumulative-NPV series (handles non-monotonic curves
  // that start positive then sink negative). Returns { verdict, year }.
  //   'never'   → ends negative (not worth it, regardless of early positives)
  //   'always'  → ends positive and never dipped negative
  //   'payback' → ends positive after being negative; year = first permanently-positive year
  function paybackInfo(yb) {
    if (!yb || !yb.length) return { verdict: 'never' };
    if (yb[yb.length - 1].cumDisc < 0) return { verdict: 'never' };
    let lastNeg = null;
    for (const r of yb) if (r.cumDisc < 0) lastNeg = r.year;
    return lastNeg == null ? { verdict: 'always', year: 0 } : { verdict: 'payback', year: lastNeg + 1 };
  }

  const capexTotal = m => m.capex_czk != null
    ? m.capex_czk
    : (m.capex_technology_czk || 0) + (m.capex_installation_czk || 0) + (m.capex_preparation_czk || 0);

  const measureLifetime = m => Math.round(m.lifetime || 0);

  // Energy cost over the whole lifetime = Σ (consumption × fuel price) for each year,
  // using the selected scenario's per-year prices (forward-filled) + current factors.
  // Nominal sum (not discounted); mirrors the calculator's fuel→price key.
  function lifetimeEnergyCost(m) {
    const scen = (data.fuel_scenarios || []).find(s => s.scenario === state.fuelScenario);
    const life = measureLifetime(m);
    if (!scen || !scen.prices || !scen.prices.length || !m.fuel || !life) return null;
    const key = m.fuel.toLowerCase();
    const gf  = 1 + state.priceUncertainty / 100;
    const consumption = m.transport_category
      ? (m.demand_energy_per_100km || 0) * (m.mileage || 0) / 100
      : (m.demand_heat_measure_mwh || 0);
    let total = 0;
    for (let y = 1; y <= life; y++) {
      let pe = scen.prices[0];
      for (const p of scen.prices) if (p.year_investment <= y) pe = p;   // forward-fill
      let price = pe[key];
      if (price == null) return null;
      if (m.fuel === 'Electricity' && m.transport_category) price *= (state.electricityPriceFactor || 1);
      total += consumption * price * gf;
    }
    return total;
  }
  const lifeEnergy = x => { const c = lifetimeEnergyCost(x); return c == null ? '—' : czkPlain(c); };

  // Parameter rows for the measure-vs-baseline comparison table.
  function comparisonSpecs(m) {
    if (m.transport_category) {
      return [
        ['Pořizovací cena',            x => czkPlain(capexTotal(x))],
        ['Náklady na palivo za životnost', lifeEnergy],
        ['Provoz za životnost',        x => czkPlain(((x.opex_maintenance_czk || 0) + (x.opex_repairs_czk || 0) + (x.opex_insurance_czk || 0)) * measureLifetime(x))],
        ['Spotřeba',                   x => x.demand_energy_per_100km != null ? fmtInt.format(Math.round(x.demand_energy_per_100km * 1000)) + ' kWh/100 km' : '—'],
        ['Roční nájezd',               x => x.mileage != null ? fmtInt.format(x.mileage) + ' km' : '—'],
        ['Životnost',                  x => x.lifetime != null ? Math.round(x.lifetime) + ' let' : '—'],
      ];
    }
    return [
      ['Investiční náklady',            x => czkPlain(capexTotal(x))],
      ['Náklady na energii za životnost', lifeEnergy],
      ['Údržba za životnost',           x => x.opex_maintenance_czk != null ? czkPlain(x.opex_maintenance_czk * measureLifetime(x)) : '—'],
      ['Spotřeba paliva',               x => x.demand_heat_measure_mwh != null ? x.demand_heat_measure_mwh + ' MWh/rok' : '—'],
      ['Účinnost',                      x => x.efficiency != null ? String(x.efficiency).replace('.', ',') : '—'],
      ['Životnost',                     x => x.lifetime != null ? Math.round(x.lifetime) + ' let' : '—'],
    ];
  }

  // Measure vs. baseline parameters — parameters as columns, one row per variant.
  function renderComparison(container, measure, baseline) {
    if (!measure) return;
    const specs = comparisonSpecs(measure);
    const tbl = document.createElement('table');
    tbl.className = 'rd-params';

    const thead = document.createElement('thead');
    const htr = document.createElement('tr');
    htr.innerHTML = '<th></th>' + specs.map(([label]) => `<th>${label}</th>`).join('');
    thead.appendChild(htr);
    tbl.appendChild(thead);

    const tb = document.createElement('tbody');
    const variantRow = (m, cls) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td class="rd-params-name ${cls}">${m.measure_name || ''}</td>`
        + specs.map(([, get]) => `<td class="${cls}">${get(m)}</td>`).join('');
      tb.appendChild(tr);
    };
    variantRow(measure, 'rd-params-meas');
    if (baseline) variantRow(baseline, 'rd-params-base');
    tbl.appendChild(tb);
    container.appendChild(tbl);
  }

  function renderDetailPanel(row, result) {
    const bar = document.getElementById('row-detail-bar');
    if (!bar) return;
    const inner = bar.querySelector('.row-detail-inner');
    inner.innerHTML = '';
    bar.classList.add('is-open');
    document.getElementById('row-detail-backdrop')?.classList.add('is-open');

    const measure = findMeasure(row.measureId);
    const baseline = measure && measure.measure_baseline_id ? findMeasure(measure.measure_baseline_id) : null;

    // Current-settings caption (shown under the title)
    const SCEN  = { CP: 'Současné politiky', CP_EC: 'Energetická krize', NZ: 'Net-zero' };
    const CAPEX = { '-1': 'optimistická', '0': 'střední', '1': 'pesimistická' };
    const pu = (state.priceUncertainty > 0 ? '+' : '') + state.priceUncertainty + ' %';
    const settingsText =
      `Scénář cen energií: ${SCEN[state.fuelScenario] || state.fuelScenario} · `
      + `Cena uhlíku: ${state.carbonPrice} € · `
      + `Výše investičních nákladů: ${CAPEX[state.capexLevel] || state.capexLevel} · `
      + `Diskontní míra: ${state.discountRate} %`;

    // ── Header: title block on its own row ────────────────────────────────────
    const hdr = document.createElement('div');
    hdr.className = 'rd-header';

    const idBlock = document.createElement('div');
    idBlock.className = 'rd-identity';
    const hasContext = row.measureName && row.measureName !== row.label;
    if (hasContext) {
      const ctx = document.createElement('div');
      ctx.className = 'rd-context';
      ctx.innerHTML = contextHtml(row.measureName, row.measureId, row.label);
      idBlock.appendChild(ctx);
    }
    const title = document.createElement('div');
    title.className = 'rd-title';
    const strong = document.createElement('span');
    strong.className = 'rd-title-name';
    strong.textContent = row.measureName || row.label;
    title.appendChild(strong);
    if (row.baselineName) {
      const vs = document.createElement('span');
      vs.className = 'rd-vs';
      vs.textContent = ' vs. ' + lcBaseline(row.baselineName);
      title.appendChild(vs);
    }
    idBlock.appendChild(title);
    const settings = document.createElement('div');
    settings.className = 'rd-settings';
    settings.textContent = settingsText;
    idBlock.appendChild(settings);
    hdr.appendChild(idBlock);

    const closeBtn = document.createElement('button');
    closeBtn.className   = 'row-detail-close';
    closeBtn.textContent = '✕';
    closeBtn.onclick = () => { openMeasureId = null; openRowMeta = null; closeDetailBar(); };
    hdr.appendChild(closeBtn);
    inner.appendChild(hdr);

    // ── Row 2: three stat cells — NPV (1-4) · emise (5-8) · dovoz (9-12) ──────
    const npvColor = row.npv.value >= 0 ? COLOR_FAVORABLE : COLOR_COSTLY;
    const npvCell = statCell('Rozdíl v Net Present Value', fmtCZK(row.npv.value), null, npvColor);
    npvCell.classList.add('rd-stat--npv');
    inner.appendChild(npvCell);

    // Conditional colouring shared by all three KPIs: favorable = teal, adverse = red.
    const co2Neg = row.co2Saved !== null && row.co2Saved < 0;
    const co2 = row.co2Saved;
    const emiseColor = co2 == null || co2 === 0 ? CLR_TEXT : co2 > 0 ? COLOR_FAVORABLE : COLOR_COSTLY;
    const emiseCell = statCell('Snížení emisí',
      co2Neg ? 'zvyšuje emise o ' + fmtCO2(Math.abs(row.co2Saved)) : fmtCO2(row.co2Saved),
      null, emiseColor);
    emiseCell.classList.add('rd-stat--emise');
    inner.appendChild(emiseCell);

    const s1 = row.fossilImportSavings ? row.fossilImportSavings.scope1TotalMwh : null;
    const s2 = row.fossilImportSavings ? row.fossilImportSavings.scope2TotalMwh : 0;
    const dovozTotal = row.fossilImportSavings ? (s1 || 0) + (s2 || 0) : null;
    const dovozNote = s2
      ? (s2 < 0
          ? 'Včetně zvýšení dovozu plynu (<strong>' + fmtMWh(Math.abs(s2)) + '</strong>) na výrobu el. energie.'
          : 'Včetně snížení dovozu plynu (<strong>' + fmtMWh(s2) + '</strong>) na výrobu el. energie.')
      : null;
    const dovozColor = dovozTotal == null || dovozTotal === 0 ? CLR_TEXT : dovozTotal > 0 ? COLOR_FAVORABLE : COLOR_COSTLY;
    const dovozValue = dovozTotal == null ? '—' : dovozTotal === 0 ? '–' : fmtMWh(dovozTotal);
    const dovozCell = statCell('Snížení dovozu ropy a zemního plynu', dovozValue,
      null, dovozColor, dovozNote, s2 > 0 ? CLR_POS : CLR_SUB);
    dovozCell.classList.add('rd-stat--dovoz');
    inner.appendChild(dovozCell);

    // Divider below the KPI row (matches the one under the header)
    const kpiHr = document.createElement('div');
    kpiHr.className = 'rd-hr';
    inner.appendChild(kpiHr);

    // ── Row 3: Kumulativní NPV v čase (cols 1-6) · Citlivostní analýza (7-12) ──
    if ((result.yearByYear || []).length) {
      const wrap = document.createElement('div');
      wrap.className = 'rd-chart--timeline';
      const lbl = document.createElement('div');
      lbl.className = 'row-detail-section-label';
      lbl.textContent = 'Rozdíl v kumulativní Net Present Value v čase (Kč)';

      // Headline: prominent payback figure + supporting text
      const note = document.createElement('div');
      note.className = 'rd-payback';
      const nm = row.measureName || row.label;
      const pb = paybackInfo(result.yearByYear);
      const yr = n => n + ' ' + (n === 1 ? 'rok' : (n >= 2 && n <= 4 ? 'roky' : 'let'));
      if (pb.verdict === 'never') {
        note.innerHTML = `Investice do opatření „${nm}“ se za dobu životnosti <strong>nevyplatí</strong>.`;
      } else if (pb.verdict === 'always') {
        note.innerHTML = `Investice do opatření „${nm}“ je výhodná <strong>ihned</strong>.`;
      } else {
        note.innerHTML = `Investice do opatření „${nm}“ se vyplatí za <strong>${yr(pb.year)}</strong>.`;
      }

      const timelineEl = document.createElement('div');
      timelineEl.className = 'row-detail-timeline';
      wrap.appendChild(lbl);
      wrap.appendChild(note);
      wrap.appendChild(timelineEl);
      inner.appendChild(wrap);
      renderNpvTimeline(timelineEl, result);
    }

    const carbon = measure ? carbonSensitivity(measure) : null;
    // The navbar's "Výše investičních nákladů" is one lever (it scales the measure's
    // CAPEX), so collapse the two CAPEX sensitivity rows into a single matching row and
    // relabel its ends optimistická/pesimistická.
    const capexLbl = l => (l && l.includes('+')) ? 'pesimistická' : 'optimistická';
    const sens = [...(result.sensitivity || []), ...(carbon ? [carbon] : [])].flatMap(s => {
      if (s.param === 'Investiční náklady základní varianty') return [];   // merged into the row below
      if (s.param === 'Investiční náklady opatření')
        return [{ ...s, param: 'Výše investičních nákladů', minLabel: capexLbl(s.minLabel), maxLabel: capexLbl(s.maxLabel) }];
      return [s];
    });
    if (sens.length) {
      const wrap = document.createElement('div');
      wrap.className = 'rd-chart--sens';
      const lbl = document.createElement('div');
      lbl.className = 'row-detail-section-label';
      lbl.textContent = 'Co ovlivňuje výhodnost';
      const sub = document.createElement('div');
      sub.className = 'rd-section-sub';
      sub.textContent = 'Jak ovlivní ekonomickou výhodnost opatření změna jednotlivých parametrů.';
      const tornEl = document.createElement('div');
      tornEl.className = 'row-detail-sens';
      wrap.appendChild(lbl);
      wrap.appendChild(sub);
      wrap.appendChild(tornEl);
      inner.appendChild(wrap);
      renderSensitivity(tornEl, sens, result.npv);
    }

    // ── Row 4: Parametry — full width, measures as rows / parameters as columns ──
    if (measure) {
      const wrap = document.createElement('div');
      wrap.className = 'rd-params-row';
      const phr = document.createElement('div');
      phr.className = 'rd-hr';
      phr.style.margin = '0 0 16px';
      const cmp = document.createElement('div');
      wrap.appendChild(phr);
      wrap.appendChild(cmp);
      inner.appendChild(wrap);
      renderComparison(cmp, measure, baseline);
    }
  }


  function renderNpvTimeline(container, result) {
    const FONT = CB_FONT;   // Inter — the detail window is all Inter except the footer
    const rows = result.yearByYear || [];
    if (!rows.length) return;

    const margin  = { top: 16, right: 74, bottom: 32, left: 6 };   // y-axis on the right + trailing padding
    const chartH  = 110;

    const years  = rows.map(r => r.year);

    // Fit the available container width so the whole lifetime is always visible.
    const totalW = Math.max(container.clientWidth || 520, margin.left + margin.right + 160);
    const chartW = totalW - margin.left - margin.right;
    const totalH = chartH + margin.top + margin.bottom;

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
      .call(d3.axisBottom(xScale).tickValues(tickValues).tickSize(3).tickFormat(d => d))
      .call(sel => { sel.selectAll('.tick line').attr('stroke', CLR_SUB); sel.select('.domain').remove(); });
    chart.append('text')
      .attr('x', 0).attr('y', chartH + 28)
      .attr('text-anchor', 'start').attr('font-size', '11px').attr('fill', CLR_SUB)
      .text('Rok od investice →');

    // Y axis — on the right of the chart
    chart.append('g').attr('class', 'chart-axis')
      .attr('transform', `translate(${chartW},0)`)
      .call(d3.axisRight(yScale).ticks(2).tickSize(3).tickFormat(xAxisFmt))
      .call(sel => { sel.selectAll('.tick line').attr('stroke', CLR_SUB); sel.select('.domain').remove(); });
  }

  // Carbon-price sensitivity across the slider range (0–200 €/t), other inputs held.
  function carbonSensitivity(measure) {
    const base = calcOpts(measure);
    const npvAt = cp => { try { return CostsBenefits.calculate({ ...base, carbonPriceEur: cp }).npv; } catch (_) { return null; } };
    const a = npvAt(0), b = npvAt(200);
    if (a == null || b == null) return null;
    if (a === b) return null;   // carbon price has no effect on NPV → omit the row
    return {
      param: 'Cena uhlíku',
      minNpv: Math.min(a, b), maxNpv: Math.max(a, b),
      minLabel: a <= b ? '0 €' : '200 €',
      maxLabel: a <= b ? '200 €' : '0 €',
    };
  }

  function renderSensitivity(container, sensInput, baseNpv) {
    renderSensTable(container, sensInput, baseNpv);
  }

  // Compact table: parameter name (left) + dumbbell on the SAME line, one row each,
  // sorted by impact, divider between rows, with a shared NPV x-axis on top.
  function renderSensTable(container, sensInput, baseNpv) {
    const sens = [...(sensInput || [])]
      .sort((a, b) => (b.maxNpv - b.minNpv) - (a.maxNpv - a.minNpv));
    if (!sens.length) return;

    const width  = container.clientWidth || 500;
    const LBL_W  = Math.min(190, Math.max(130, width * 0.36));
    const ROW    = 48;   // taller: NPV value above the dots + input label beside them
    const M      = { top: 30, right: 8, bottom: 4 };   // top holds the NPV axis
    const PAD    = 42;   // room for the flanking input labels at the extremes
    const totalH = sens.length * ROW + M.top + M.bottom;
    const plotX  = LBL_W;
    const plotW  = Math.max(width - LBL_W - M.right, 140);

    const vals = [baseNpv, ...sens.flatMap(s => [s.minNpv, s.maxNpv])];
    let xMin = Math.min(...vals), xMax = Math.max(...vals);
    const pad = (xMax - xMin) * 0.04 || 10000;
    const x = d3.scaleLinear().domain([xMin - pad, xMax + pad]).nice().range([PAD, plotW - PAD]);
    const dom = x.domain(), showZero = dom[0] <= 0 && dom[1] >= 0;

    const svg = d3.select(container).append('svg')
      .attr('width', width).attr('height', totalH).style('font-family', CB_FONT);

    // Top NPV axis — tick labels + short ticks, no domain line (like the dumbbell axis).
    // Drop any label closer than MIN_GAP px to the previous one so wide "+140 tis."
    // labels never overlap on a narrow plot.
    const axis = svg.append('g').attr('transform', `translate(${plotX},0)`);
    const MIN_GAP = 62;
    let lastTx = -Infinity;
    x.ticks(6).forEach(t => {
      const tx = x(t);
      if (tx - lastTx < MIN_GAP) return;
      lastTx = tx;
      axis.append('text').attr('x', tx).attr('y', 12).attr('text-anchor', 'middle')
        .attr('font-size', '11px').attr('fill', CLR_SUB).text(xAxisFmt(t));
      axis.append('line').attr('x1', tx).attr('x2', tx).attr('y1', 17).attr('y2', 22)
        .attr('stroke', CLR_SUB).attr('stroke-width', 1);
    });

    if (showZero) {
      const z = plotX + x(0);
      svg.append('line').attr('x1', z).attr('x2', z).attr('y1', M.top).attr('y2', totalH - M.bottom)
        .attr('stroke', '#dce1e6').attr('stroke-width', 1);
    }

    sens.forEach((s, i) => {
      const top = M.top + i * ROW, cy = top + ROW / 2;
      if (i > 0) svg.append('line').attr('x1', 0).attr('x2', width).attr('y1', top).attr('y2', top)
        .attr('stroke', '#f0f2f4').attr('stroke-width', 1);

      // Parameter name — left column, wraps, vertically centred
      const fo = svg.append('foreignObject').attr('x', 0).attr('y', top).attr('width', LBL_W - 12).attr('height', ROW);
      fo.append('xhtml:div')
        .style('display', 'flex').style('align-items', 'center').style('height', '100%')
        .style('font-size', '12px').style('font-weight', '700').style('line-height', '1.15')
        .style('color', CLR_TEXT).style('font-family', CB_FONT)
        .text(s.param);

      const xLo = plotX + x(s.minNpv), xHi = plotX + x(s.maxNpv), xCur = plotX + x(baseNpv);
      // Colour by NPV sign: teal favourable, #903156 adverse — used by line, dots and value.
      const npvCol = v => v >= 0 ? COLOR_FAVORABLE : CLR_NEG_COAL;
      const zx = plotX + x(0);
      const seg = (x1, x2, c) => svg.append('line').attr('x1', x1).attr('x2', x2).attr('y1', cy).attr('y2', cy)
        .attr('stroke', c).attr('stroke-width', 2).attr('stroke-linecap', 'round');
      if (s.minNpv < 0) seg(xLo, Math.min(zx, xHi), CLR_NEG_COAL);
      if (s.maxNpv > 0) seg(Math.max(zx, xLo), xHi, COLOR_FAVORABLE);
      // Edge cases: hollow (white fill, sign-coloured ring). Current NPV: solid, coloured by sign.
      svg.append('circle').attr('cx', xLo).attr('cy', cy).attr('r', 5)
        .attr('fill', '#fff').attr('stroke', npvCol(s.minNpv)).attr('stroke-width', 2);
      svg.append('circle').attr('cx', xHi).attr('cy', cy).attr('r', 5)
        .attr('fill', '#fff').attr('stroke', npvCol(s.maxNpv)).attr('stroke-width', 2);
      svg.append('circle').attr('cx', xCur).attr('cy', cy).attr('r', 5)
        .attr('fill', npvCol(baseNpv));

      // Input-bound (edge-case) labels — normal weight
      svg.append('text').attr('x', xLo - 8).attr('y', cy + 4).attr('text-anchor', 'end')
        .attr('font-size', '12px').attr('font-weight', '400').attr('fill', CLR_TEXT).text(s.minLabel || '');
      svg.append('text').attr('x', xHi + 8).attr('y', cy + 4).attr('text-anchor', 'start')
        .attr('font-size', '12px').attr('font-weight', '400').attr('fill', CLR_TEXT).text(s.maxLabel || '');

      // NPV value above each dot — light, coloured by sign (matches the line)
      const near = (xHi - xLo) < 90;
      svg.append('text').attr('x', near ? xLo - 3 : xLo).attr('y', cy - 13).attr('text-anchor', near ? 'end' : 'middle')
        .attr('font-size', '10px').attr('font-weight', '600').attr('fill', npvCol(s.minNpv)).text(xAxisFmt(s.minNpv));
      svg.append('text').attr('x', near ? xHi + 3 : xHi).attr('y', cy - 13).attr('text-anchor', near ? 'start' : 'middle')
        .attr('font-size', '10px').attr('font-weight', '600').attr('fill', npvCol(s.maxNpv)).text(xAxisFmt(s.maxNpv));
    });
  }

  // Dumbbell: min ● — current ◦ — max ●, one row per parameter, sorted by span.
  // opts.labelMode 'input' → endpoint labels are the input bounds (0 €, ±15 %, …);
  //                'value' → endpoint labels are the NPV values.
  // opts.dividers  → horizontal rule between parameter blocks (table look).
  // opts.axis      → draw the bottom NPV axis.
  function renderDumbbell(container, sensInput, baseNpv, opts) {
    const { labelMode = 'input', dividers = false, axis = true } = opts || {};
    const sens = [...(sensInput || [])]
      .sort((a, b) => (b.maxNpv - b.minNpv) - (a.maxNpv - a.minNpv));
    if (!sens.length) return;

    const width  = container.clientWidth || 460;
    const ROW    = 58;
    const M      = { top: 14, right: 24, bottom: axis ? 26 : 6, left: 6 };
    const totalH = sens.length * ROW + M.top + M.bottom;
    const chartW = Math.max(width - M.left - M.right, 160);

    const vals = [baseNpv, ...sens.flatMap(s => [s.minNpv, s.maxNpv])];
    let xMin = Math.min(...vals), xMax = Math.max(...vals);
    const pad = (xMax - xMin) * 0.12 || 10000;
    const x = d3.scaleLinear().domain([xMin - pad, xMax + pad]).nice().range([0, chartW]);
    const dom = x.domain(), showZero = dom[0] <= 0 && dom[1] >= 0;

    const svg = d3.select(container).append('svg')
      .attr('width', width).attr('height', totalH).style('font-family', CB_FONT);
    const chart = svg.append('g').attr('transform', `translate(${M.left},0)`);

    if (showZero) {
      const z = x(0);
      chart.append('line').attr('x1', z).attr('x2', z)
        .attr('y1', M.top - 2).attr('y2', totalH - M.bottom)
        .attr('stroke', '#d5dae0').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');
    }

    sens.forEach((s, i) => {
      const top = M.top + i * ROW, cy = top + 30;
      const xLo = x(s.minNpv), xHi = x(s.maxNpv), xCur = x(baseNpv);

      // Divider between parameter blocks (table look)
      if (dividers && i > 0) {
        chart.append('line').attr('x1', 0).attr('x2', chartW).attr('y1', top).attr('y2', top)
          .attr('stroke', '#f0f2f4').attr('stroke-width', 1);
      }

      chart.append('text').attr('x', 0).attr('y', top + 12)
        .attr('font-size', '12px').attr('font-weight', '500').attr('fill', CLR_TEXT).text(s.param);

      // Connector coloured by NPV value: red where negative, teal where positive.
      const zx = x(0);
      const seg = (x1, x2, c) => chart.append('line').attr('x1', x1).attr('x2', x2).attr('y1', cy).attr('y2', cy)
        .attr('stroke', c).attr('stroke-width', 2).attr('stroke-linecap', 'round');
      if (s.minNpv < 0) seg(xLo, Math.min(zx, xHi), COLOR_COSTLY);
      if (s.maxNpv > 0) seg(Math.max(zx, xLo), xHi, COLOR_FAVORABLE);
      // neutral endpoint markers (colour lives in the connector now)
      chart.append('circle').attr('cx', xLo).attr('cy', cy).attr('r', 5).attr('fill', CLR_SUB);
      chart.append('circle').attr('cx', xHi).attr('cy', cy).attr('r', 5).attr('fill', CLR_SUB);
      // current NPV (hollow marker in the middle)
      chart.append('circle').attr('cx', xCur).attr('cy', cy).attr('r', 5)
        .attr('fill', '#fff').attr('stroke', CLR_TEXT).attr('stroke-width', 2);

      const labLo = labelMode === 'value' ? xAxisFmt(s.minNpv) : (s.minLabel || '');
      const labHi = labelMode === 'value' ? xAxisFmt(s.maxNpv) : (s.maxLabel || '');
      const clamp = px => Math.max(14, Math.min(chartW - 14, px));
      chart.append('text').attr('x', clamp(xLo)).attr('y', cy + 17).attr('text-anchor', 'middle')
        .attr('font-size', '10px').attr('fill', '#9ea7b3').text(labLo);
      chart.append('text').attr('x', clamp(xHi)).attr('y', cy + 17).attr('text-anchor', 'middle')
        .attr('font-size', '10px').attr('fill', '#9ea7b3').text(labHi);
    });

    if (axis) {
      chart.append('g')
        .attr('transform', `translate(0,${totalH - M.bottom})`).attr('class', 'chart-axis')
        .call(d3.axisBottom(x).ticks(4).tickSize(3).tickFormat(xAxisFmt))
        .call(sel => { sel.selectAll('.tick line').attr('stroke', CLR_SUB); sel.select('.domain').remove(); });
    }
  }

  // Sensitivity tornado (biggest lever on top): red = downside, teal = upside,
  // parameter label above each bar so bars use the full column width.
  function renderTornado(container, sensInput, baseNpv) {
    const sens = [...(sensInput || [])]
      .sort((a, b) => (b.maxNpv - b.minNpv) - (a.maxNpv - a.minNpv));
    if (!sens.length) return;

    const width  = container.clientWidth || 420;
    const ROW    = 46, BAR = 12;
    const M      = { top: 16, right: 14, bottom: 26, left: 2 };
    const totalH = sens.length * ROW + M.top + M.bottom;
    const chartW = Math.max(width - M.left - M.right, 120);

    // Zoom to the outcome range; pull in 0 only when uncertainty crosses it.
    const vals = [baseNpv, ...sens.flatMap(s => [s.minNpv, s.maxNpv])];
    let xMin = Math.min(...vals), xMax = Math.max(...vals);
    if (xMin <= 0 && xMax >= 0) { xMin = Math.min(xMin, 0); xMax = Math.max(xMax, 0); }
    const pad = (xMax - xMin) * 0.08 || 10000;
    const x = d3.scaleLinear().domain([xMin - pad, xMax + pad]).nice().range([0, chartW]);
    const dom = x.domain(), showZero = dom[0] <= 0 && dom[1] >= 0;

    const svg = d3.select(container).append('svg')
      .attr('width', width).attr('height', totalH).style('font-family', CB_FONT);
    const chart = svg.append('g').attr('transform', `translate(${M.left},0)`);

    if (showZero) {
      const z = x(0);
      chart.append('line').attr('x1', z).attr('x2', z)
        .attr('y1', M.top - 2).attr('y2', totalH - M.bottom)
        .attr('stroke', '#c9d0d6').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');
    }

    sens.forEach((s, i) => {
      const top = M.top + i * ROW, by = top + 22;
      chart.append('text').attr('x', 0).attr('y', top + 11)
        .attr('font-size', '12px').attr('font-weight', '500').attr('fill', CLR_TEXT).text(s.param);
      if (s.minNpv !== baseNpv) chart.append('rect')      // downside
        .attr('x', x(Math.min(baseNpv, s.minNpv))).attr('y', by)
        .attr('width', Math.abs(x(s.minNpv) - x(baseNpv))).attr('height', BAR)
        .attr('fill', COLOR_COSTLY).attr('opacity', 0.8);
      if (s.maxNpv !== baseNpv) chart.append('rect')      // upside
        .attr('x', x(Math.min(baseNpv, s.maxNpv))).attr('y', by)
        .attr('width', Math.abs(x(s.maxNpv) - x(baseNpv))).attr('height', BAR)
        .attr('fill', COLOR_FAVORABLE).attr('opacity', 0.8);
    });

    chart.append('g')
      .attr('transform', `translate(0,${totalH - M.bottom})`).attr('class', 'chart-axis')
      .call(d3.axisBottom(x).ticks(4).tickSize(3).tickFormat(xAxisFmt))
      .call(sel => { sel.selectAll('.tick line').attr('stroke', CLR_SUB); sel.select('.domain').remove(); });
  }

  // ── Render all ────────────────────────────────────────────────────────────
  function renderAll() {
    const summaryEl = document.getElementById('summary-chart');
    if (summaryEl) renderSummaryChart(summaryEl);

    document.querySelectorAll('.measure-chart[data-section]').forEach(el => {
      if (el.hasAttribute('data-group')) {
        renderGroupChart(el, el.dataset.section, el.dataset.group);   // '' = whole section
      } else {
        renderMeasureChart(el, el.dataset.section, el.dataset.measure);
      }
    });

    renderOpenDetail();
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

    const backdrop = document.getElementById('row-detail-backdrop');
    if (backdrop) backdrop.addEventListener('click', () => {
      openMeasureId = null; openRowMeta = null; closeDetailBar();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();