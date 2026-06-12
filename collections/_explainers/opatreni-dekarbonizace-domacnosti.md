---
layout:      empty
title:       "Opatření pro dekarbonizaci domácností – grafy"
slug:        "opatreni-dekarbonizace-domacnosti"
published:   2026-04-28
authors:
  - ids: ["katerina-kolouchova", "jan-krcal"]
  - ids: ["marcel-otruba"]
    minor-role: "vizualizace"
weight:      74.5
tags-scopes: [ eu ]
tags-topics: [ emise, opatreni, ekonomika ]
extra-scripts:
- https://d3js.org/d3.v7.min.js
- /assets-local/js/costs-benefits-calculator.js
- /assets-local/js/costs-and-benefits-graphics.js
- /assets-local/js/costs-benefits-beeswarm.js
---

<script>
  window.COSTS_AND_BENEFITS = {{ site.data["costs-and-benefits"] | jsonify }};
</script>

<style>
/* ── Controls bar ──────────────────────────────────────────────────────────── */
.controls-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 32px;
  align-items: flex-start;
  padding-bottom: 0.25rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  flex: 1 1 180px;
  max-width: 360px;
  min-width: 160px;
}
.control-group.control-group--select {
  flex: 0 1 200px;
  min-width: 160px;
  max-width: 220px;
  justify-content: flex-end;
}
.control-group--disabled {
  opacity: 0.4;
  pointer-events: none;
}

.control-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2px;
}

.control-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #666;
}

.control-value {
  font-size: 12px;
  font-weight: 700;
  color: #1a7a85;
}

/* ── Slider with ticks ─────────────────────────────────────────────────────── */
.slider-with-ticks {
  position: relative;
  padding-bottom: 34px;
}
.slider-with-ticks input[type=range] {
  width: 100%;
  margin: 0;
  cursor: pointer;
  accent-color: #1a7a85;
}
.tick-labels {
  position: absolute;
  left: 0;
  right: 0;
  top: 20px;
  pointer-events: none;
}
.tick-label {
  position: absolute;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tick-mark {
  display: block;
  width: 1px;
  height: 6px;
  background: #bbb;
  margin-bottom: 1px;
}
.tick-text {
  font-size: 9px;
  text-align: center;
  color: #888;
  line-height: 1.2;
  white-space: nowrap;
}
.tick-text small {
  display: block;
  color: #bbb;
  font-size: 8px;
}

/* ── Chart ─────────────────────────────────────────────────────────────────── */
.tornado-chart {
  margin: 4px 0 24px;
  overflow-x: auto;
}
.tornado-chart svg { display: block; }

.quadrant-wrap {
  margin: 4px 0 24px;
}
.quadrant-chart {
  overflow-x: auto;
}
.quadrant-chart svg { display: block; }

.q-quad-label {
  font-size: 10px;
  font-style: italic;
}

.q-axis-label {
  font-size: 12px;
  fill: #666;
  font-weight: 500;
}

/* ── Quadrant filters ──────────────────────────────────────────────────────── */
.q-filters {
  margin-bottom: 10px;
}
.q-filter-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 6px;
  margin-bottom: 6px;
}
.q-filter-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #999;
  margin-right: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}
.q-filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 10px 3px;
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  background: #f8f8f8;
  color: #bbb;
  font-size: 11px;
  font-family: inherit;
  cursor: pointer;
  line-height: 1.6;
  transition: border-color 0.12s, color 0.12s, background 0.12s, opacity 0.12s;
}
.q-filter-btn.active {
  background: #fff;
  color: #333;
  border-color: #bbb;
}
.q-filter-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  opacity: 0.35;
  transition: opacity 0.12s;
}
.q-filter-btn.active .q-filter-dot { opacity: 1; }
.q-sector-btn.active[data-sector="buildings"] { color: #2860b4; border-color: #2860b4; }
.q-sector-btn.active[data-sector="transport"] { color: #6b4fa0; border-color: #6b4fa0; }
/* Beeswarm control panel sections */
.sb-section-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #bbb;
  margin: 10px 0 2px;
}
.sb-section-separator {
  border: none;
  border-top: 1px solid #f0f0f0;
  margin: 6px 0;
}
.sb-cat-group-prefix {
  font-size: 10px;
  font-weight: 600;
  color: #aaa;
  margin: 0 2px 0 4px;
  white-space: nowrap;
  align-self: center;
}
.sb-group-dot {
  font-size: 14px;
  color: #ccc;
  margin: 0 4px;
  align-self: center;
}

/* ── Static comparison chart toggle ────────────────────────────────────────── */
.static-chart-toggle-wrap {
  margin-top: 12px;
}
.static-chart-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 14px 6px;
  border: 1.5px solid #ddd;
  border-radius: 6px;
  background: #f8f8f8;
  color: #555;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;
}
.static-chart-toggle-btn:hover { background: #f0f0f0; border-color: #bbb; }
.static-chart-toggle-btn[aria-expanded="true"] { background: #fff; border-color: #aaa; color: #333; }
.static-chart-toggle-icon {
  font-size: 9px;
  transition: transform 0.2s;
  display: inline-block;
}
.static-chart-toggle-btn[aria-expanded="true"] .static-chart-toggle-icon {
  transform: rotate(90deg);
}
.static-comparison-chart {
  margin-top: 12px;
}

.chart-col-header {
  font-size: 10px;
  fill: #999;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.chart-axis path,
.chart-axis line { stroke: #ddd; }
.chart-axis text  { font-size: 14px; fill: #888; }

/* Beeswarm column headers (KONTEXT, NÁVRATNOST, OPATŘENÍ …) */
.sb-col-hdr {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  fill: #aaa;
  font-family: Inter, system-ui, sans-serif;
}

/* ── Chart download buttons ─────────────────────────────────────────────────── */
.chart-dl-bar {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  margin-top: 4px;
}
.chart-dl-btn {
  font-size: 10px;
  color: #bbb;
  background: none;
  border: 1px solid #e4e7ed;
  border-radius: 3px;
  padding: 2px 8px 3px;
  cursor: pointer;
  font-family: inherit;
  line-height: 1.4;
  letter-spacing: 0.02em;
  transition: color 0.12s, border-color 0.12s;
}
.chart-dl-btn:hover {
  color: #53616e;
  border-color: #aaa;
}

/* ── Sensitivity beeswarm ────────────────────────────────────────────────────── */
.sb-filters {
  padding-bottom: 10px;
}

.sb-legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 16px;
  margin-top: 8px;
}
.sb-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #555;
}
/* ── Efficiency charts ─────────────────────────────────────────────────── */
.eff-section { padding-top: 8px; }
.eff-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  align-items: flex-start;
  margin-bottom: 24px;
  padding: 14px 16px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e8ecef;
}
.eff-filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.eff-filter-group--multi  { flex: 1 1 180px; max-width: 280px; }
.eff-filter-group--select { min-width: 160px; max-width: 210px; }
.eff-sector-btns { display: flex; gap: 6px; flex-wrap: wrap; }
.eff-sector-btn {
  padding: 4px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
  color: #555;
  transition: background 0.15s, color 0.15s;
}
.eff-sector-btn.active { background: #1a7a85; color: #fff; border-color: #1a7a85; }
.eff-multiselect { font-size: 12px; }
.eff-chart { overflow-x: auto; margin: 4px 0 28px; }
.eff-chart svg { display: block; }
.eff-chart-title { font-size: 1rem; font-weight: 600; margin: 24px 0 2px; color: #333; }
.eff-note { font-size: 0.78rem; color: #aaa; margin: 0 0 6px; font-style: italic; }
</style>

<div class="section pb-3">
  <div class="container between-navbars">
    <h1>{{ page.title }}</h1>
    {% include tags.html tags=page.tags slug=page.slug link="true" %}
  </div>
</div>

<div id="secondary-navbar" class="section">
  <div class="container page-title">{{ page.title }}</div>
  <div class="container controls-inner">

    <div class="control-group control-group--select">
      <label class="control-label" for="fuel-scenario-select">Scénář cen energií</label>
      <select id="fuel-scenario-select" class="form-select form-select-sm mt-1">
        <option value="CP">Současné politiky</option>
        <option value="NZ">Net-zero</option>
        <option value="CP_EC">Energetická krize</option>
      </select>
    </div>

    <div class="control-group">
      <div class="control-head">
        <span class="control-label">Cena uhlíku</span>
        <span class="control-value" id="carbon-price-value">70&thinsp;€</span>
      </div>
      <div class="slider-with-ticks">
        <input type="range" id="carbon-price-slider" min="0" max="200" step="10" value="70">
        <div class="tick-labels">
          <span class="tick-label" style="left:8px">
            <span class="tick-mark"></span>
            <span class="tick-text">0 €<small>bez ceny uhlíku</small></span>
          </span>
          <span class="tick-label" style="left:calc(20% + 4.8px)">
            <span class="tick-mark"></span>
            <span class="tick-text">40 €<small>ETS2 nižší</small></span>
          </span>
          <span class="tick-label" style="left:calc(35% + 2.4px)">
            <span class="tick-mark"></span>
            <span class="tick-text">70 €<small>výchozí</small></span>
          </span>
          <span class="tick-label" style="left:calc(100% - 8px)">
            <span class="tick-mark"></span>
            <span class="tick-text">200 €<small>skutečná cena</small></span>
          </span>
        </div>
      </div>
    </div>

    <div class="control-group">
      <div class="control-head">
        <span class="control-label">Diskontní míra</span>
        <span class="control-value" id="discount-rate-value">3&thinsp;%</span>
      </div>
      <div class="slider-with-ticks">
        <input type="range" id="discount-rate-slider" min="0" max="7" step="1" value="3">
        <div class="tick-labels">
          <span class="tick-label" style="left:8px">
            <span class="tick-mark"></span>
            <span class="tick-text">0 %<small>běžný účet</small></span>
          </span>
          <span class="tick-label" style="left:calc(42.857% + 1.14px)">
            <span class="tick-mark"></span>
            <span class="tick-text">3 %<small>spořicí účet</small></span>
          </span>
          <span class="tick-label" style="left:calc(100% - 8px)">
            <span class="tick-mark"></span>
            <span class="tick-text">7 %<small>akcie</small></span>
          </span>
        </div>
      </div>
    </div>

  </div>
</div>

<div class="section pt-3 pb-2">
  <div class="container">
    <p class="chart-col-header mb-2">Nákladová efektivita opatření</p>
    <div id="quadrant-wrap" class="quadrant-wrap">
      <div id="quadrant-chart" class="quadrant-chart"></div>
    </div>
    <div class="static-chart-toggle-wrap">
      <button id="static-chart-toggle" class="static-chart-toggle-btn" aria-expanded="false">
        <span class="static-chart-toggle-icon">▶</span>
        Porovnání scénářů ceny uhlíku: 70 € vs. 200 €
      </button>
      <div id="static-comparison-chart" class="quadrant-chart static-comparison-chart" hidden></div>
    </div>
  </div>
</div>

<div class="section pt-3 pb-2">
  <div class="container">
    <p class="chart-col-header mb-2">Úspora emisí vs. NPV – velikost bubliny = úspora paliva</p>
    <p class="text-muted" style="font-size:0.85rem; margin-top:-0.25rem; margin-bottom:0.75rem;">
      Zobrazena jsou pouze opatření, která snižují emise (kladná osa Y).
      Velikost bubliny odpovídá celkovému množství ušetřeného paliva přes celou životnost
      (MWh plynu pro budovy, litry pro dopravu).
    </p>
    <div style="display:flex; gap:2rem; flex-wrap:wrap;">
      <div style="flex:1; min-width:280px;">
        <p class="chart-col-header mb-1">Budovy</p>
        <div id="fuel-bubble-buildings" class="quadrant-chart"></div>
      </div>
      <div style="flex:1; min-width:280px;">
        <p class="chart-col-header mb-1">Doprava</p>
        <div id="fuel-bubble-transport" class="quadrant-chart"></div>
      </div>
    </div>
  </div>
</div>

<div class="section pt-3 pb-2">
  <div class="container">

    <p class="chart-col-header mb-2" style="color:#2860b4">Budovy</p>

    <p class="chart-col-header mb-1">Cena uhlíku</p>
    <div style="display:flex; gap:2rem; flex-wrap:wrap; margin-bottom:1.5rem;">
      <div style="flex:1; min-width:280px;">
        <p class="chart-col-header mb-1">Rodinný dům uhlí – E</p>
        <div class="tornado-chart" data-category="Rodinný dům uhlí – E" data-param="Cena uhlíku" data-domain-group="cena-uhliku"></div>
      </div>
      <div style="flex:1; min-width:280px;">
        <p class="chart-col-header mb-1">Rodinný dům plyn – E</p>
        <div class="tornado-chart" data-category="Rodinný dům plyn – E" data-param="Cena uhlíku" data-domain-group="cena-uhliku"></div>
      </div>
    </div>

    <p class="chart-col-header mb-1">Diskontní míra</p>
    <div style="display:flex; gap:2rem; flex-wrap:wrap; margin-bottom:3rem;">
      <div style="flex:1; min-width:280px;">
        <p class="chart-col-header mb-1">Rodinný dům uhlí – E</p>
        <div class="tornado-chart" data-category="Rodinný dům uhlí – E" data-param="Diskontní míra" data-exclude="Elektrický kotel" data-domain-group="diskontni-mira"></div>
      </div>
      <div style="flex:1; min-width:280px;">
        <p class="chart-col-header mb-1">Rodinný dům plyn – E</p>
        <div class="tornado-chart" data-category="Rodinný dům plyn – E" data-param="Diskontní míra" data-exclude="Elektrický kotel" data-domain-group="diskontni-mira"></div>
      </div>
    </div>

    <p class="chart-col-header mb-2" style="color:#6b4fa0">Doprava</p>

    <p class="chart-col-header mb-1">Cena uhlíku</p>
    <div style="display:flex; gap:2rem; flex-wrap:wrap; margin-bottom:1.5rem;">
      <div style="flex:1; min-width:200px;">
        <div class="tornado-chart" data-categories="Nové malé|Ojeté malé" data-param="Cena uhlíku" data-domain-group="cena-uhliku"></div>
      </div>
      <div style="flex:1; min-width:200px;">
        <div class="tornado-chart" data-categories="Nové velké|Ojeté velké" data-param="Cena uhlíku" data-domain-group="cena-uhliku"></div>
      </div>
    </div>

    <p class="chart-col-header mb-1">Diskontní míra</p>
    <div style="display:flex; gap:2rem; flex-wrap:wrap; margin-bottom:1.5rem;">
      <div style="flex:1; min-width:200px;">
        <div class="tornado-chart" data-categories="Nové malé|Ojeté malé" data-param="Diskontní míra" data-domain-group="diskontni-mira"></div>
      </div>
      <div style="flex:1; min-width:200px;">
        <div class="tornado-chart" data-categories="Nové velké|Ojeté velké" data-param="Diskontní míra" data-domain-group="diskontni-mira"></div>
      </div>
    </div>

    <p class="chart-col-header mb-1">Tarif elektřiny</p>
    <div style="display:flex; gap:2rem; flex-wrap:wrap;">
      <div style="flex:1; min-width:200px;">
        <div class="tornado-chart" data-categories="Nové malé|Ojeté malé" data-param="Tarif elektřiny" data-domain-group="tarif-elektriny"></div>
      </div>
      <div style="flex:1; min-width:200px;">
        <div class="tornado-chart" data-categories="Nové velké|Ojeté velké" data-param="Tarif elektřiny" data-domain-group="tarif-elektriny"></div>
      </div>
    </div>

  </div>
</div>

<div class="section pt-3 pb-2">
  <div class="container">
    <p class="chart-col-header mb-2">Náklady na tunu ušetřeného CO₂ — rozložení opatření</p>
    <div id="beeswarm-chart"></div>
    <div id="kc-per-t-controls" style="margin-top:1.5rem;"></div>
    <div id="kc-per-t-bar-chart" style="margin-top:0.5rem; overflow-x:auto;"></div>
  </div>
</div>

<div class="section pt-3 pb-2">
  <div class="container">
    <p class="chart-col-header mb-2">Rozdíl v investičních nákladech na tunu ušetřeného CO₂</p>
    <div id="beeswarm-capex-chart"></div>
  </div>
</div>

<div class="section pt-3 pb-4">
  <div class="container">
    <p class="chart-col-header mb-2">NPV opatření v různých cenových scénářích</p>
    <div id="dumbbell-legend" style="margin-bottom:1rem;"></div>
    <div style="display:flex; gap:2rem; margin-bottom:1.5rem;">
      <div style="flex:1; min-width:0;">
        <p class="chart-col-header mb-1" style="color:#2860b4">Rodinný dům uhlí – E</p>
        <div id="dumbbell-rd-uhli-e"></div>
      </div>
      <div style="flex:1; min-width:0;">
        <p class="chart-col-header mb-1" style="color:#2860b4">Rodinný dům plyn – E</p>
        <div id="dumbbell-rd-plyn-e"></div>
      </div>
    </div>
    <div style="display:flex; gap:2rem; margin-bottom:1.5rem;">
      <div style="flex:1; min-width:0;">
        <p class="chart-col-header mb-1" style="color:#6b4fa0">Nové malé</p>
        <div id="dumbbell-nove-male"></div>
      </div>
      <div style="flex:1; min-width:0;">
        <p class="chart-col-header mb-1" style="color:#6b4fa0">Nové velké</p>
        <div id="dumbbell-nove-velke"></div>
      </div>
    </div>
    <div style="display:flex; gap:2rem;">
      <div style="flex:1; min-width:0;">
        <p class="chart-col-header mb-1" style="color:#6b4fa0">Ojeté malé</p>
        <div id="dumbbell-ojete-male"></div>
      </div>
      <div style="flex:1; min-width:0;">
        <p class="chart-col-header mb-1" style="color:#6b4fa0">Ojeté velké</p>
        <div id="dumbbell-ojete-velke"></div>
      </div>
    </div>
  </div>
</div>

<div class="section pt-3 pb-4">
  <div class="container">
    <p class="chart-col-header mb-1">Předpoklady cen energií ve třech scénářích</p>
    <div id="scenario-charts-legend" style="margin-bottom:0.5rem;"></div>
    <div id="scenario-charts" style="display:flex; flex-wrap:wrap; gap:12px 20px;"></div>
  </div>
</div>

<div class="section pt-3 pb-4">
  <div class="container">
    <p class="chart-col-header mb-3">Kolik opatření a za kolik peněz je potřeba nainstalovat, aby došlo k úspoře 1 % ropy nebo zemního plynu?</p>
    <div style="overflow-x:auto;">
    <table class="table table-sm" style="min-width:700px;">
      <thead>
        <tr>
          <th style="min-width:220px;">Opatření</th>
          <th class="text-end">Úspora / jednotku / rok</th>
          <th class="text-end">Počet</th>
          <th class="text-end">Celkové náklady opatření</th>
          <th class="text-end">Rozdíl investičních nákladů oproti vysokoemisní alternativě</th>
          <th>Palivo</th>
          <th>Hodnota ušetřeného paliva (životnost)
            <br><small class="text-muted fw-normal">░ = rozdíl invest. nákladů; <span style="color:#2860b4">■</span> Běžné ceny <span style="color:#c43535">■</span> Energetická krize</small></th>
        </tr>
      </thead>
      <tbody id="import-cost-tbody">
        <tr data-fuel-key="hp">
          <td>Tepelné čerpadlo <small class="text-muted">(RD plyn–C, 15 let, vs. plynový kotel)</small></td>
          <td class="text-end" id="savings-unit-hp">…</td>
          <td class="text-end" id="deploy-hp">…</td>
          <td class="text-end" id="capex-measure-hp">…</td>
          <td class="text-end" id="capex-diff-hp">…</td>
          <td class="text-muted">Zemní plyn</td>
          <td id="net-benefit-bar-hp" style="min-width:240px; width:40%;"></td>
        </tr>
        <tr data-fuel-key="ins">
          <td>Renovace se zateplením <small class="text-muted">(RD plyn–F, 40 let, vs. renovace bez zateplení)</small></td>
          <td class="text-end" id="savings-unit-ins">…</td>
          <td class="text-end" id="deploy-ins">…</td>
          <td class="text-end" id="capex-measure-ins">…</td>
          <td class="text-end" id="capex-diff-ins">…</td>
          <td class="text-muted">Zemní plyn</td>
          <td id="net-benefit-bar-ins" style="min-width:240px; width:40%;"></td>
        </tr>
        <tr data-fuel-key="fve">
          <td>Soláry na střeše + baterie <small class="text-muted">(RD plyn–E, 25 let, vs. Nedělám nic; úspora plynu přes výrobu el. ze sítě)</small></td>
          <td class="text-end" id="savings-unit-fve">…</td>
          <td class="text-end" id="deploy-fve">…</td>
          <td class="text-end" id="capex-measure-fve">…</td>
          <td class="text-end" id="capex-diff-fve">…</td>
          <td class="text-muted">Zemní plyn</td>
          <td id="net-benefit-bar-fve" style="min-width:240px; width:40%;"></td>
        </tr>
        <tr data-fuel-key="ev">
          <td>Malý elektromobil <small class="text-muted">(Nové malé, 15 let, vs. benzínové auto)</small></td>
          <td class="text-end" id="savings-unit-ev">…</td>
          <td class="text-end" id="deploy-ev">…</td>
          <td class="text-end" id="capex-measure-ev">…</td>
          <td class="text-end" id="capex-diff-ev">…</td>
          <td class="text-muted">Ropa</td>
          <td id="net-benefit-bar-ev" style="min-width:240px; width:40%;"></td>
        </tr>
        <tr data-fuel-key="ev_l">
          <td>Velký elektromobil <small class="text-muted">(Nové velké, 15 let, vs. naftové auto)</small></td>
          <td class="text-end" id="savings-unit-ev_l">…</td>
          <td class="text-end" id="deploy-ev_l">…</td>
          <td class="text-end" id="capex-measure-ev_l">…</td>
          <td class="text-end" id="capex-diff-ev_l">…</td>
          <td class="text-muted">Ropa</td>
          <td id="net-benefit-bar-ev_l" style="min-width:240px; width:40%;"></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="7" class="text-muted" style="font-size:0.8em;">
            Tepelné čerpadlo (RD plyn–C): baseline Plynový kotel 14 MWh/rok → opatření přechází na elektřinu (0 MWh plynu).
            Renovace se zateplením (RD plyn–F): baseline Renovace bez zateplení 29 MWh/rok → opatření 13 MWh/rok plynu.
            Soláry na střeše + baterie (RD plyn–E): baseline Nedělám nic 4 MWh/rok el. ze sítě → opatření 1 MWh/rok; úspora 3 MWh/rok el. × 20 % (podíl plynu v české výrobě elektřiny, výhledová hodnota) / 55 % (účinnost CCGT) ≈ 1,1 MWh/rok plynu.
            Malý elektromobil: baseline Nové malé auto na benzín, 6,5 l/100 km × 15 000 km/rok = 975 l/rok → elektromobil nespotřebuje benzín.
            Velký elektromobil: baseline Nové velké auto na naftu, 7,2 l/100 km × 15 000 km/rok = 1 080 l/rok nafty; 1 080 / 158,987 ≈ 6,8 barelu/rok.
            Počet nasazených jednotek je u každého opatření zvolen tak, aby celková úspora odpovídala přibližně 1 % českých dovozů příslušného paliva. Základna: 60 TWh/rok dovozu zemního plynu (5 442 039 939 kg při výhřevnosti ~11 kWh/kg); 50,4 mil. barelů/rok dovozu ropy (6 856 765 464 kg při ~136 kg/barel).
            Hodnota ušetřeného paliva vychází z cen dovozu paliva (nikoliv maloobchodních cen): pro plyn €40/MWh (běžné ceny) a €180/MWh (energetická krize) — TTF benchmark; pro ropu $80/barel resp. $150/barel (Brent crude); přepočet EUR/CZK = 25, USD/CZK = 23. Jedná se o úspory devizových výdajů ČR po celou dobu životnosti opatření — bez diskontování.
          </td>
        </tr>
      </tfoot>
    </table>
    </div>

  </div>
</div>

<div class="section pt-3 pb-4">
  <div class="container">
    <p class="chart-col-header mb-2">Malý elektromobil — náklady a vliv diskontování</p>
    <p class="text-muted" style="font-size:0.85rem; margin-top:-0.25rem; margin-bottom:0.75rem;">
      Vlevo: rozložení celkových nákladů po dobu životnosti (CAPEX + OPEX) pro baseline a opatření.
      Vpravo: vliv diskontní míry na kumulativní NPV — šedá část ukazuje, kolik hodnoty diskontování „skryje".
    </p>
    <div style="display:flex; gap:2rem; flex-wrap:wrap;">
      <div style="flex:1; min-width:240px; max-width:50%;">
        <div id="cost-breakdown-chart"></div>
      </div>
      <div style="flex:1; min-width:240px; max-width:50%;">
        <div id="discount-line-chart"></div>
      </div>
    </div>
  </div>
</div>

<div class="section pt-3 pb-4">
  <div class="container">
    <p class="chart-col-header mb-2">Sensitivita NPV — všechny kombinace parametrů</p>
    <p class="text-muted" style="font-size:12px;margin-bottom:12px;">
      Každá tečka = jedna kombinace (scénář cen × cena uhlíku × diskontní míra) pro daný kontext.
      Zvýrazněné tečky = výchozí kombinace (Současné politiky · 70 € · 3 %).
    </p>
    <div id="sensitivity-beeswarm-wrap">
      <div id="sensitivity-beeswarm-chart"></div>
      <div id="sensitivity-beeswarm-legend" class="sb-legend"></div>
    </div>
  </div>
</div>


<div class="section pt-3 pb-4 eff-section">
  <div class="container">
    <p class="chart-col-header mb-2">Efektivita ve&#345;ejn&#253;ch investic</p>
    <p class="text-muted" style="font-size:0.85rem; margin-top:-0.25rem; margin-bottom:0.75rem;">
      Kolik emis&#237; CO&#8322;, zemn&#237;ho plynu nebo pohynn&#253;ch hmot lze u&#353;et&#345;it na ka&#382;dou investovanou miliardu korun
      &#8211; m&#283;&#345;eno jako rozd&#237;l CAPEX oprot&#237; z&#225;kladn&#237; variant&#283;, kumulovan&#253; za celou dobu &#382;ivotnosti opat&#345;en&#237;.
    </p>

    <div class="eff-controls">
      <div class="eff-filter-group">
        <span class="control-label">Sektor</span>
        <div class="eff-sector-btns">
          <button class="eff-sector-btn active" data-sector="buildings">Budovy</button>
          <button class="eff-sector-btn active" data-sector="transport">Doprava</button>
        </div>
      </div>
      <div class="eff-filter-group eff-filter-group--multi" style="flex: 2 1 300px; max-width: 480px;">
        <label class="control-label" for="eff-combo-select">Opat&#345;en&#237; &times; kontext <small>(nic = v&#353;e)</small></label>
        <select id="eff-combo-select" multiple size="8" class="form-select form-select-sm eff-multiselect"></select>
      </div>
      <div class="eff-filter-group eff-filter-group--select">
        <label class="control-label" for="eff-unit-select">Jednotky</label>
        <select id="eff-unit-select" class="form-select form-select-sm mt-1">
          <option value="abs">Absolutn&#237;</option>
          <option value="pct">% &#269;esk&#233;ho celku</option>
        </select>
      </div>
      <div class="eff-filter-group eff-filter-group--select">
        <label class="control-label" for="eff-norm-select">Normalizace</label>
        <select id="eff-norm-select" class="form-select form-select-sm mt-1">
          <option value="none" selected>&#381;&#225;dn&#225;</option>
          <option value="diff">Diff of CAPEX</option>
          <option value="full">Full CAPEX</option>
        </select>
      </div>
      <div class="eff-filter-group eff-filter-group--select">
        <span class="control-label">Obdob&#237;</span>
        <label class="mt-1" style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px;">
          <input type="checkbox" id="eff-yearly-check">
          Ro&#269;n&#237; (ne celkov&#225;)
        </label>
      </div>
      <div class="eff-filter-group eff-filter-group--select">
        <label class="control-label" for="eff-sort-select">Řadit dle</label>
        <select id="eff-sort-select" class="form-select form-select-sm mt-1">
          <option value="co2PerBilCZK" selected>Emise CO&#8322;</option>
          <option value="fossilTwhPerScale">Fosiln&#237; paliva</option>
          <option value="npvPerBilCZK">NPV</option>
        </select>
      </div>
      <div class="eff-filter-group eff-filter-group--select">
        <label class="control-label" for="eff-scale-select">Investice</label>
        <select id="eff-scale-select" class="form-select form-select-sm mt-1">
          <option value="1e11" selected>100&#160;mld.&#160;K&#269;</option>
          <option value="1e10">10&#160;mld.&#160;K&#269;</option>
          <option value="1e9">1&#160;mld.&#160;K&#269;</option>
          <option value="1e6">1&#160;mil.&#160;K&#269;</option>
        </select>
      </div>
      <div class="eff-filter-group eff-filter-group--select">
        <span class="control-label">Citlivost NPV</span>
        <label class="mt-1" style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px;">
          <input type="checkbox" id="eff-npv-beeswarm-check">
          Beeswarm (NPV)
        </label>
      </div>
    </div>

      <ul class="nav nav-tabs mt-3 mb-0" id="eff-tab-nav">
      <li class="nav-item"><button class="nav-link active" data-tab="co2">Emise CO&#8322;</button></li>
      <li class="nav-item"><button class="nav-link" data-tab="fossil">Fosiln&#237; paliva</button></li>
      <li class="nav-item"><button class="nav-link" data-tab="npv">NPV</button></li>
    </ul>
    <div class="tab-content border border-top-0 rounded-bottom p-3">
      <div id="eff-tab-co2" class="tab-pane show active">
        <h3 id="eff-co2-title" class="eff-chart-title"></h3>
        <div id="eff-co2-chart" class="eff-chart"></div>
      </div>
      <div id="eff-tab-fossil" class="tab-pane">
        <h3 id="eff-fossil-title" class="eff-chart-title"></h3>
        <p class="eff-note">Zemn&#237; plyn (budovy) + kapaln&#225; paliva &#8211; benz&#237;n &amp; nafta (doprava), p&#345;epo&#269;teno na TWh (~9,5&#160;kWh/l). Referen&#269;n&#237; hodnota: ~200&#160;TWh/rok.</p>
        <div id="eff-fossil-chart" class="eff-chart"></div>
      </div>
      <div id="eff-tab-npv" class="tab-pane">
        <h3 id="eff-npv-title" class="eff-chart-title"></h3>
        <p class="eff-note">&#268;ist&#225; sou&#269;asn&#225; hodnota (NPV) opat&#345;en&#237; p&#345;i aktu&#225;ln&#237;m nastaven&#237; parametr&#367;. Kladn&#225; hodnota = opat&#345;en&#237; se vyplat&#237;, z&#225;porn&#225; = net&#237; n&#225;kladov&#283; efektivn&#237;. Ro&#269;n&#237; re&#382;im d&#283;l&#237; NPV dobou &#382;ivotnosti.</p>
        <div id="eff-npv-chart" class="eff-chart"></div>
      </div>
    </div>

  </div>
</div>

---

{% capture demo_slide_content %}
  <!-- Simple bar chart demo — content starts at y=210 -->
  <rect x="90"  y="210" width="200" height="28" rx="2" fill="#1a7a85" fill-opacity="0.85"/>
  <rect x="90"  y="254" width="340" height="28" rx="2" fill="#1a7a85" fill-opacity="0.70"/>
  <rect x="90"  y="298" width="130" height="28" rx="2" fill="#1a7a85" fill-opacity="0.55"/>
  <text x="302" y="224" font-size="21" fill="#333333" font-family="'Inter', Arial, sans-serif" dominant-baseline="middle">Kategorie A</text>
  <text x="442" y="268" font-size="21" fill="#333333" font-family="'Inter', Arial, sans-serif" dominant-baseline="middle">Kategorie B</text>
  <text x="232" y="312" font-size="21" fill="#333333" font-family="'Inter', Arial, sans-serif" dominant-baseline="middle">Kategorie C</text>
{% endcapture %}
{% include includes-local/slide.html
   id="demo-slide-01"
   title="Název snímku"

   content=demo_slide_content
%}

---

{% capture buildings_npv_chart %}
  <g id="bnpv-chart-uhli"></g>
  <g id="bnpv-chart-plyn"></g>
  <g id="bnpv-legend"></g>
{% endcapture %}
{% include includes-local/slide.html
   id="buildings-npv-slide"
   title="NPV opatření – citlivost na cenu uhlíku"
   subtitle="Diskont 3 % · scénář CP · rozsah 0–200 € CO₂"
   content=buildings_npv_chart
%}

<script>
window.addEventListener('load', function () {
  var data = window.COSTS_AND_BENEFITS;
  if (!data || typeof CostsBenefits === 'undefined' || typeof d3 === 'undefined') return;

  /* ── Style constants (beeswarm style guide) ── */
  var FONT        = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif";
  var C_LABEL     = '#333333';
  var C_TICK      = '#888888';
  var C_TICK_LINE = '#9ba5ad';
  var C_ZERO      = '#cccccc';
  var R_CUR       = 12;    /* all dots same size */
  var SW_CUR      = 1.5;   /* default dot outline stroke-width */
  var SW_LINE     = 1.5;
  var OP_LINE     = 0.25;

  /* ── x domain: fixed ±800 tis. Kč ── */
  var X_DOMAIN = [-800000, 800000];

  /* ── Diverging NPV color scale — mirrors beeswarm "Výhodnost" ──
       Coal:  ['#903156', '#e0e0e0', '#006063']
       Gas:   ['#c0392b', '#e0e0e0', '#006063']        */
  function makeColorScale(category) {
    var negColor = /uhlí/i.test(category) ? '#903156' : '#c0392b';
    return d3.scaleLinear()
      .domain([X_DOMAIN[0], 0, X_DOMAIN[1]])
      .range([negColor, '#e0e0e0', '#006063'])
      .clamp(true);
  }

  /* ── Data helpers ── */
  var MEASURES = ['Tepelné čerpadlo','Zateplení + fasáda','Výměna oken a dveří',
                  'Elektrický kotel','Kotel na biomasu','Střešní fotovoltaika + baterie',
                  'Renovace se zateplením'];

  function calcNpv(entry, cp, dr) {
    try {
      var r = CostsBenefits.calculate({ measureId: entry.id, data: data,
        discountRate: dr / 100, carbonPriceEur: cp,
        priceScenario: 'CP', electricityPriceFactor: 1 });
      return isNaN(r.npv) ? null : r.npv;
    } catch (_) { return null; }
  }

  function buildRows(category) {
    var allM = (data.buildings_measures || []).filter(function (m) {
      return m.building_category === category && (m.measure_baseline_id || m.measure_baseline);
    });
    return MEASURES.map(function (name) {
      var entry = allM.find(function (m) { return m.measure_name === name; });
      if (!entry) return null;
      var npvCur = calcNpv(entry, 60, 3);
      if (npvCur == null) return null;
      return { name: name,
               npvMin: calcNpv(entry, 0,   3),
               npvMax: calcNpv(entry, 200, 3),
               npvCur: npvCur };
    }).filter(Boolean);
  }

  var rowsA = buildRows('Rodinný dům uhlí – E');
  var rowsB = buildRows('Rodinný dům plyn – E');
  if (!rowsA.length && !rowsB.length) return;

  /* ── Layout ── */
  var LEFT    = 90;
  var LABEL_W = 280;
  var COL6_X  = 948;                              /* 6 cols: 90 + 6×147 − 24 */
  var CW      = COL6_X - LEFT - LABEL_W - 20;    /* ≈ 558 px */
  var ROW_H   = 44;
  var MT      = 38;
  var MB      = 20;
  var CHART_H = MT + MEASURES.length * ROW_H + MB;
  var GAP     = 28;
  var Y1      = 210;
  var Y2      = Y1 + CHART_H + GAP;

  var xSc = d3.scaleLinear().domain(X_DOMAIN).range([0, CW]);

  var fmt = function (v) {
    var a = Math.abs(v), s = v < 0 ? '−' : v > 0 ? '+' : '';
    if (a >= 1e6) return s + (a / 1e6).toFixed(1) + ' M';
    if (a >= 1e3) return s + Math.round(a / 1e3) + ' tis.';
    return v === 0 ? '0' : s + a;
  };

  /* ── Chart renderer ── */
  function renderChart(groupId, rows, originY, label, colorScale, showAxis) {
    var g = d3.select('#' + groupId)
      .attr('transform', 'translate(' + LEFT + ',' + originY + ')');

    /* category header */
    g.append('text')
      .attr('x', 0).attr('y', 0)
      .attr('dominant-baseline', 'text-before-edge')
      .attr('font-size', 22).attr('font-family', FONT)
      .attr('font-weight', 600).attr('fill', '#555555')
      .text(label);

    var chart = g.append('g').attr('transform', 'translate(' + LABEL_W + ',' + MT + ')');

    /* zero reference line */
    chart.append('line')
      .attr('x1', xSc(0)).attr('x2', xSc(0))
      .attr('y1', 0).attr('y2', rows.length * ROW_H)
      .attr('stroke', C_ZERO).attr('stroke-width', 1.5);

    rows.forEach(function (r, i) {
      var midY = i * ROW_H + ROW_H / 2;
      var xMin = r.npvMin != null ? xSc(r.npvMin) : xSc(r.npvCur);
      var xMax = r.npvMax != null ? xSc(r.npvMax) : xSc(r.npvCur);
      var xCur = xSc(r.npvCur);

      /* measure label */
      g.append('text')
        .attr('x', LABEL_W - 16).attr('y', MT + midY)
        .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
        .attr('font-size', 22).attr('font-family', FONT).attr('fill', C_LABEL)
        .text(r.name);

      /* connecting line — neutral, dots carry the color */
      chart.append('line')
        .attr('x1', xMin).attr('x2', xMax)
        .attr('y1', midY).attr('y2', midY)
        .attr('stroke', '#bbbbbb').attr('stroke-width', SW_LINE).attr('opacity', OP_LINE);

      /* min dot */
      if (r.npvMin != null)
        chart.append('circle').attr('cx', xSc(r.npvMin)).attr('cy', midY)
          .attr('r', R_CUR).attr('fill', colorScale(r.npvMin));

      /* max dot */
      if (r.npvMax != null)
        chart.append('circle').attr('cx', xSc(r.npvMax)).attr('cy', midY)
          .attr('r', R_CUR).attr('fill', colorScale(r.npvMax));

      /* current dot — thin dark gray outline */
      chart.append('circle').attr('cx', xCur).attr('cy', midY)
        .attr('r', R_CUR).attr('fill', colorScale(r.npvCur))
        .attr('stroke', '#444444').attr('stroke-width', SW_CUR);
    });

    /* x-axis (axisTop, like beeswarm) */
    if (showAxis)
      chart.append('g')
        .call(d3.axisTop(xSc).ticks(5).tickFormat(fmt))
        .call(function (ax) {
          ax.select('.domain').remove();
          ax.selectAll('.tick line').attr('stroke', C_TICK_LINE).attr('stroke-width', 1);
          ax.selectAll('.tick text')
            .attr('font-size', 20).attr('font-family', FONT).attr('fill', C_TICK);
        });
  }

  renderChart('bnpv-chart-uhli', rowsA, Y1, 'Rodinný dům uhlí – E', makeColorScale('uhlí'),  true);
  renderChart('bnpv-chart-plyn', rowsB, Y2, 'Rodinný dům plyn – E', makeColorScale('plyn'),   true);

  /* ── Legend ── */
  var leg = d3.select('#bnpv-legend')
    .attr('transform', 'translate(' + (COL6_X + 40) + ',' + Y1 + ')');

  /* color gradient strip */
  var LW = 160, LH = 14;
  var defs = d3.select('#buildings-npv-slide').append('defs');
  var grad = defs.append('linearGradient').attr('id', 'bnpv-grad')
    .attr('x1','0%').attr('x2','100%');
  grad.append('stop').attr('offset','0%').attr('stop-color','#903156');
  grad.append('stop').attr('offset','50%').attr('stop-color','#e0e0e0');
  grad.append('stop').attr('offset','100%').attr('stop-color','#006063');

  leg.append('rect').attr('x', 0).attr('y', 16)
    .attr('width', LW).attr('height', LH).attr('rx', 3)
    .attr('fill', 'url(#bnpv-grad)');
  leg.append('text').attr('x', 0).attr('y', 12)
    .attr('font-size', 18).attr('font-family', FONT).attr('fill', C_TICK).text('−800 tis.');
  leg.append('text').attr('x', LW).attr('y', 12)
    .attr('text-anchor', 'end')
    .attr('font-size', 18).attr('font-family', FONT).attr('fill', C_TICK).text('+800 tis.');
  leg.append('text').attr('x', LW / 2).attr('y', 46)
    .attr('text-anchor', 'middle')
    .attr('font-size', 18).attr('font-family', FONT).attr('fill', '#aaaaaa').text('NPV (Kč)');

  /* dot size legend */
  [['none',    '0 € / 200 €'],
   ['#444444', '70 € CO₂']
  ].forEach(function (cfg, i) {
    var cy = 80 + i * 36;
    leg.append('circle').attr('cx', R_CUR).attr('cy', cy)
      .attr('r', R_CUR).attr('fill', '#888')
      .attr('stroke', cfg[0]).attr('stroke-width', cfg[0] === 'none' ? 0 : SW_CUR);
    leg.append('text').attr('x', R_CUR * 2 + 8).attr('y', cy)
      .attr('dominant-baseline', 'middle')
      .attr('font-size', 18).attr('font-family', FONT).attr('fill', C_TICK)
      .text(cfg[1]);
  });
});
</script>

---

{% capture transport_npv_chart %}
  <g id="tnpv-chart-male"></g>
  <g id="tnpv-chart-velke"></g>
  <g id="tnpv-legend"></g>
{% endcapture %}
{% include includes-local/slide.html
   id="transport-npv-slide"
   title="NPV opatření – doprava, citlivost na cenu uhlíku"
   subtitle="Diskont 3 % · scénář CP · rozsah ±800 tis. Kč"
   content=transport_npv_chart
%}

<script>
window.addEventListener('load', function () {
  var data = window.COSTS_AND_BENEFITS;
  if (!data || typeof CostsBenefits === 'undefined' || typeof d3 === 'undefined') return;

  /* ── Style (same as buildings slide) ── */
  var FONT        = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif";
  var C_LABEL     = '#333333';
  var C_TICK      = '#888888';
  var C_TICK_LINE = '#9ba5ad';
  var C_ZERO      = '#cccccc';
  var R_CUR       = 12;
  var SW_CUR      = 1.5;
  var SW_LINE     = 1.5;
  var OP_LINE     = 0.25;

  /* ── x domain: fixed ±800 tis. Kč ── */
  var X_DOMAIN = [-800000, 800000];

  /* ── Diverging color scale — transport: ['#8c3f5f', '#e0e0e0', '#006063'] ── */
  var colorScale = d3.scaleLinear()
    .domain([X_DOMAIN[0], 0, X_DOMAIN[1]])
    .range(['#8c3f5f', '#e0e0e0', '#006063'])
    .clamp(true);

  function calcNpv(entry, cp, dr) {
    try {
      var r = CostsBenefits.calculate({ measureId: entry.id, data: data,
        discountRate: dr / 100, carbonPriceEur: cp,
        priceScenario: 'CP', electricityPriceFactor: 1 });
      return isNaN(r.npv) ? null : r.npv;
    } catch (_) { return null; }
  }

  function buildRows(transportCategory) {
    var allM = (data.transport_measures || []).filter(function (m) {
      return m.transport_category === transportCategory &&
             (m.measure_baseline_id || m.measure_baseline);
    });
    return allM.map(function (m) {
      var npvCur = calcNpv(m, 60, 3);
      if (npvCur == null) return null;
      return { name: m.measure_name,
               npvMin: calcNpv(m, 0,   3),
               npvMax: calcNpv(m, 200, 3),
               npvCur: npvCur };
    }).filter(Boolean);
  }

  var rowsA = buildRows('Nové malé');
  var rowsB = buildRows('Nové velké');
  if (!rowsA.length && !rowsB.length) return;

  /* ── Layout (same grid as buildings slide) ── */
  var LEFT    = 90;
  var LABEL_W = 280;
  var COL6_X  = 948;
  var CW      = COL6_X - LEFT - LABEL_W - 20;
  var ROW_H   = 44;
  var MT      = 38;
  var MB      = 20;
  var CHART_H = MT + Math.max(rowsA.length, rowsB.length) * ROW_H + MB;
  var GAP     = 28;
  var Y1      = 210;
  var Y2      = Y1 + CHART_H + GAP;

  var xSc = d3.scaleLinear().domain(X_DOMAIN).range([0, CW]);

  var fmt = function (v) {
    var a = Math.abs(v), s = v < 0 ? '−' : v > 0 ? '+' : '';
    if (a >= 1e6) return s + (a / 1e6).toFixed(1) + ' M';
    if (a >= 1e3) return s + Math.round(a / 1e3) + ' tis.';
    return v === 0 ? '0' : s + a;
  };

  function renderChart(groupId, rows, originY, label, showAxis) {
    var g = d3.select('#' + groupId)
      .attr('transform', 'translate(' + LEFT + ',' + originY + ')');

    g.append('text')
      .attr('x', 0).attr('y', 0)
      .attr('dominant-baseline', 'text-before-edge')
      .attr('font-size', 22).attr('font-family', FONT)
      .attr('font-weight', 600).attr('fill', '#555555')
      .text(label);

    var chart = g.append('g').attr('transform', 'translate(' + LABEL_W + ',' + MT + ')');

    /* zero line — solid */
    chart.append('line')
      .attr('x1', xSc(0)).attr('x2', xSc(0))
      .attr('y1', 0).attr('y2', rows.length * ROW_H)
      .attr('stroke', C_ZERO).attr('stroke-width', 1.5);

    rows.forEach(function (r, i) {
      var midY = i * ROW_H + ROW_H / 2;
      var xMin = r.npvMin != null ? xSc(r.npvMin) : xSc(r.npvCur);
      var xMax = r.npvMax != null ? xSc(r.npvMax) : xSc(r.npvCur);
      var xCur = xSc(r.npvCur);

      g.append('text')
        .attr('x', LABEL_W - 16).attr('y', MT + midY)
        .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
        .attr('font-size', 22).attr('font-family', FONT).attr('fill', C_LABEL)
        .text(r.name);

      chart.append('line')
        .attr('x1', xMin).attr('x2', xMax)
        .attr('y1', midY).attr('y2', midY)
        .attr('stroke', '#bbbbbb').attr('stroke-width', SW_LINE).attr('opacity', OP_LINE);

      if (r.npvMin != null)
        chart.append('circle').attr('cx', xSc(r.npvMin)).attr('cy', midY)
          .attr('r', R_CUR).attr('fill', colorScale(r.npvMin));

      if (r.npvMax != null)
        chart.append('circle').attr('cx', xSc(r.npvMax)).attr('cy', midY)
          .attr('r', R_CUR).attr('fill', colorScale(r.npvMax));

      chart.append('circle').attr('cx', xCur).attr('cy', midY)
        .attr('r', R_CUR).attr('fill', colorScale(r.npvCur))
        .attr('stroke', '#444444').attr('stroke-width', SW_CUR);
    });

    if (showAxis)
      chart.append('g')
        .call(d3.axisTop(xSc).ticks(5).tickFormat(fmt))
        .call(function (ax) {
          ax.select('.domain').remove();
          ax.selectAll('.tick line').attr('stroke', C_TICK_LINE).attr('stroke-width', 1);
          ax.selectAll('.tick text')
            .attr('font-size', 20).attr('font-family', FONT).attr('fill', C_TICK);
        });
  }

  renderChart('tnpv-chart-male',  rowsA, Y1, 'Doprava – nové malé',  true);
  renderChart('tnpv-chart-velke', rowsB, Y2, 'Doprava – nové velké', true);

  /* ── Legend ── */
  var leg = d3.select('#tnpv-legend')
    .attr('transform', 'translate(' + (COL6_X + 40) + ',' + Y1 + ')');

  var LW = 160, LH = 14;
  var defs = d3.select('#transport-npv-slide').append('defs');
  var grad = defs.append('linearGradient').attr('id', 'tnpv-grad')
    .attr('x1','0%').attr('x2','100%');
  grad.append('stop').attr('offset','0%').attr('stop-color','#8c3f5f');
  grad.append('stop').attr('offset','50%').attr('stop-color','#e0e0e0');
  grad.append('stop').attr('offset','100%').attr('stop-color','#006063');

  leg.append('rect').attr('x', 0).attr('y', 16)
    .attr('width', LW).attr('height', LH).attr('rx', 3)
    .attr('fill', 'url(#tnpv-grad)');
  leg.append('text').attr('x', 0).attr('y', 12)
    .attr('font-size', 18).attr('font-family', FONT).attr('fill', C_TICK).text('−800 tis.');
  leg.append('text').attr('x', LW).attr('y', 12)
    .attr('text-anchor', 'end')
    .attr('font-size', 18).attr('font-family', FONT).attr('fill', C_TICK).text('+800 tis.');
  leg.append('text').attr('x', LW / 2).attr('y', 46)
    .attr('text-anchor', 'middle')
    .attr('font-size', 18).attr('font-family', FONT).attr('fill', '#aaaaaa').text('NPV (Kč)');

  [['none',    '0 € / 200 €'],
   ['#444444', '70 € CO₂']
  ].forEach(function (cfg, i) {
    var cy = 80 + i * 36;
    leg.append('circle').attr('cx', R_CUR).attr('cy', cy)
      .attr('r', R_CUR).attr('fill', '#888')
      .attr('stroke', cfg[0]).attr('stroke-width', cfg[0] === 'none' ? 0 : SW_CUR);
    leg.append('text').attr('x', R_CUR * 2 + 8).attr('y', cy)
      .attr('dominant-baseline', 'middle')
      .attr('font-size', 18).attr('font-family', FONT).attr('fill', C_TICK)
      .text(cfg[1]);
  });
});
</script>
---

{% capture eff_chart_content %}
  <g id="eff-slide-chart"></g>
{% endcapture %}
{% include includes-local/slide.html
   id="eff-slide"
   title="Efektivita veřejných investic do dekarbonizace"
   subtitle="Default: 70 € CO₂ · diskont 3 % · scénář CP · hodnoty na 1 mld. Kč investice"
   content=eff_chart_content
%}

<script>
window.addEventListener('load', function () {
  var data = window.COSTS_AND_BENEFITS;
  if (!data || typeof CostsBenefits === 'undefined' || typeof d3 === 'undefined') return;

  /* ── Style ── */
  var FONT           = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif";
  var C_LABEL        = '#333333';
  var C_TEAL         = '#1a7a85';
  var C_GRAY         = '#9ba5ad';
  var C_BAR_POS      = '#9ba5ad';
  var C_BAR_NEG      = '#e07b5a';
  var FUEL_KWH_PER_L = 9.5;
  var INVEST_SCALE   = 1e9;  /* per 1 mld. CZK */

  /* ── Measures ── */
  var MEASURES = [
    { catField:'transport_category', cat:'Ojeté malé',           name:'Ojetý malý elektromobil',    label:'Ojetý malý elektromobil',   base:'vs. ojeté malé auto na benzín', ctx1:null, ctx2:null },
    { catField:'transport_category', cat:'Nové velké',            name:'Nový velký elektromobil',    label:'Nový velký elektromobil',    base:'vs. nové velké auto na naftu',  ctx1:null, ctx2:null },
    { catField:'building_category',  cat:'Rodinný dům uhlí – E', name:'Renovace se zateplením',     label:'Renovace a nová fasáda',     base:'vs. jenom nová fasáda',         ctx1:'Rodinný dům s uhelným kotlem',  ctx2:'nehospodárná energetická třída' },
    { catField:'building_category',  cat:'Rodinný dům plyn – E', name:'Renovace se zateplením',     label:'Renovace a nová fasáda',     base:'vs. jenom nová fasáda',         ctx1:'Rodinný dům s plynovým kotlem', ctx2:'nehospodárná energetická třída' },
    { catField:'building_category',  cat:'Rodinný dům uhlí – E', name:'Tepelné čerpadlo',           label:'Tepelné čerpadlo',           base:'vs. uhelný kotel',              ctx1:'Rodinný dům s uhelným kotlem',  ctx2:'nehospodárná energetická třída' },
    { catField:'building_category',  cat:'Rodinný dům plyn – E', name:'Tepelné čerpadlo',           label:'Tepelné čerpadlo',           base:'vs. plynový kotel',             ctx1:'Rodinný dům s plynovým kotlem', ctx2:'nehospodárná energetická třída' },
    { catField:'building_category',  cat:'Rodinný dům plyn – C', name:'Soláry na střeše + baterie', label:'Soláry na střeše + baterie', base:'vs. bez solárů',                ctx1:'Rodinný dům s plynovým kotlem', ctx2:'úsporná energetická třída' },
  ];

  /* ── Data helpers ── */
  var allM = (data.buildings_measures || []).concat(data.transport_measures || [])
    .filter(function(m) { return m.measure_baseline_id || m.measure_baseline; });

  /* FIX 1: fallback to full CAPEX if capexDiff is unusable */
  function computeRow(m) {
    try {
      var r = CostsBenefits.calculate({ measureId:m.id, data:data,
        discountRate:0.03, carbonPriceEur:70, priceScenario:'CP', electricityPriceFactor:1 });
      /* Use full measure CAPEX as denominator:
         NPV / capex_measure * 1 mld  (as specified by user) */
      var fullCap = (m.capex_technology_czk || 0) + (m.capex_installation_czk || 0)
                  + (m.capex_preparation_czk || 0) + (m.capex_czk || 0);
      if (!fullCap || fullCap <= 0) fullCap = Math.abs(r.capexDiff); /* fallback */
      if (!fullCap || fullCap <= 0) return null;
      var co2 = r.emissionSavings ? -r.emissionSavings.totalT : null;
      var gTwh = r.gasSavings  ? r.gasSavings.totalMwh * 1e-6               : 0;
      var fTwh = r.fuelSavings ? r.fuelSavings.totalL * FUEL_KWH_PER_L * 1e-9 : 0;
      return {
        npv:    r.npv / fullCap * INVEST_SCALE,
        co2:    co2 != null ? co2 / fullCap * INVEST_SCALE : null,
        fossil: (r.gasSavings || r.fuelSavings) ? (gTwh + fTwh) / fullCap * INVEST_SCALE : null,
        count:  Math.round(1e9 / fullCap),   /* opatření za 1 mld Kč */
      };
    } catch(_) { return null; }
  }

  var rows = MEASURES.map(function(cfg) {
    var m = allM.find(function(x) { return x[cfg.catField] === cfg.cat && x.measure_name === cfg.name; });
    if (!m) return null;
    var v = computeRow(m);
    return v ? { label:cfg.label, base:cfg.base, ctx1:cfg.ctx1, ctx2:cfg.ctx2, npv:v.npv, co2:v.co2, fossil:v.fossil, count:v.count } : null;
  }).filter(Boolean);
  if (!rows.length) return;

  /* ── Layout ── */
  var LX     = 90;
  var LW     = 430;   /* label column width; right edge = 520 */
  var NPV_X  = 540;   /* NPV bars start */
  var NPV_W  = 440;   /* NPV bars width */
  var CO2_X  = 1040;
  var FSL_X  = 1420;
  var CNT_X  = 1680;  /* count column (narrow) */
  var HDR_Y  = 210;
  var ROW0_Y = 268;
  var ROW_H  = 107;  /* bar 75px + 16px padding each side */

  /* Fixed x-domain at mld scale (full-CAPEX denominator keeps values moderate) */
  var X_DOMAIN = [-400000000, 800000000];
  var xSc = d3.scaleLinear().domain(X_DOMAIN).range([0, NPV_W]);

  /* ── Unit-chart constants (at mld scale: values ×1000 vs mil scale) ── */
  var co2Unit = 10000;        /* 1 square = 10 kt CO₂ */
  var fslUnit = 50000 / 1e6; /* 1 square = 50 GWh (stored in TWh: 50000 MWh × 1e-6) */
  var BAR_H  = 75;
  var SQ     = BAR_H / 5;  /* 15px — 5 squares = full bar height */

  /* Discrete unit squares: max 5 per column, wrap right, no gap, white stroke */
  function drawSquares(col_x, mid, value, unit, color) {
    if (value == null || value <= 0) {
      g.append('text').attr('x', col_x).attr('y', mid)
        .attr('dominant-baseline','middle').attr('font-size', 22)
        .attr('font-family', FONT).attr('fill','#aaaaaa').text('–');
      return;
    }
    var n     = Math.max(1, Math.round(value / unit));
    var cols  = Math.ceil(n / 5);
    var top   = mid - BAR_H / 2;
    for (var i = 0; i < n; i++) {
      var c = Math.floor(i / 5);   /* column index */
      var r = i % 5;               /* row index (0=top) */
      g.append('rect')
        .attr('x', col_x + c * SQ)
        .attr('y', top   + r * SQ)
        .attr('width', SQ).attr('height', SQ)
        .attr('rx', 0)
        .attr('fill', color).attr('opacity', 0.75)
        .attr('stroke', 'white').attr('stroke-width', 1);
    }
    var valTxt = color === C_TEAL
      ? (value >= 1000 ? Math.round(value/1000) + ' kt' : Math.round(value) + ' t')
      : (function(twh){ return twh >= 1 ? twh.toFixed(2)+' TWh' : Math.round(twh*1000)+' GWh'; })(value);
    g.append('text')
      .attr('x', col_x + cols * SQ + 10)
      .attr('y', mid)
      .attr('dominant-baseline','middle').attr('font-size', 22)
      .attr('font-family', FONT).attr('fill','#444444').text(valTxt);
  }

  /* ── Formatters (mld scale) ── */
  function fmtNpv(v) {
    var s = v < 0 ? '−' : '+', a = Math.abs(v);
    if (a >= 1e9) return s + (a/1e9).toFixed(2) + ' mld';
    if (a >= 1e6) return s + Math.round(a/1e6) + ' mil.';
    return s + Math.round(a/1000) + ' tis.';
  }
  function fmtCount(v) {
    if (!v || v <= 0) return '–';
    if (v >= 1000) return (v/1000).toFixed(1).replace('.0','') + ' tis.';
    return '' + v;
  }

  /* ── Render ── */
  var g = d3.select('#eff-slide-chart');

  /* column headers */
  function hdr(cx, title, sub, sub2) {
    g.append('text').attr('x', cx).attr('y', HDR_Y)
      .attr('text-anchor','middle').attr('dominant-baseline','text-before-edge')
      .attr('font-size', 24).attr('font-family', FONT).attr('font-weight', 600).attr('fill','#444444')
      .text(title);
    g.append('text').attr('x', cx).attr('y', HDR_Y + 30)
      .attr('text-anchor','middle').attr('dominant-baseline','text-before-edge')
      .attr('font-size', 17).attr('font-family', FONT).attr('fill','#999999').text(sub);
    if (sub2)
      g.append('text').attr('x', cx).attr('y', HDR_Y + 52)
        .attr('text-anchor','middle').attr('dominant-baseline','text-before-edge')
        .attr('font-size', 15).attr('font-family', FONT).attr('fill','#bbbbbb').text(sub2);
  }
  hdr(NPV_X + NPV_W/2, 'Efektivita investice',   'Kč NPV (životnost) / 1 mld. Kč invest');
  hdr(CO2_X + 120,     'Úspora emisí',            'kt CO₂ / 1 mld. Kč',  '■ = 10 kt');
  hdr(FSL_X + 120,     'Úspora fosilních paliv',  'TWh / 1 mld. Kč',     '■ = 50 GWh');
  hdr(CNT_X + 65,      'Počet opatření',           'za 1 mld. Kč (CAPEX)');

  /* zero line */
  var zx = NPV_X + xSc(0);
  g.append('line')
    .attr('x1', zx).attr('x2', zx)
    .attr('y1', ROW0_Y - 8).attr('y2', ROW0_Y + rows.length * ROW_H + 4)
    .attr('stroke', '#cccccc').attr('stroke-width', 1.5);

  rows.forEach(function(r, i) {
    var rowY = ROW0_Y + i * ROW_H;
    var mid  = rowY + ROW_H / 2;

    if (i > 0)
      g.append('line').attr('x1', LX).attr('x2', 1820)
        .attr('y1', rowY).attr('y2', rowY)
        .attr('stroke', '#f0f0f0').attr('stroke-width', 1);

    /* ── Labels: left-aligned, evenly spaced ──
         Building rows (ctx1+ctx2): 4 lines — 13+4+13+6+24+5+15 = 80px, top pad 14
         Transport rows:            2 lines — 24+5+15 = 44px, top pad 32            */
    if (r.ctx1) {
      g.append('text').attr('x', LX).attr('y', rowY + 14)
        .attr('dominant-baseline','text-before-edge')
        .attr('font-size', 13).attr('font-family', FONT).attr('fill','#aaaaaa')
        .text(r.ctx1);
      g.append('text').attr('x', LX).attr('y', rowY + 31)
        .attr('dominant-baseline','text-before-edge')
        .attr('font-size', 13).attr('font-family', FONT).attr('fill','#aaaaaa')
        .text(r.ctx2);
      g.append('text').attr('x', LX).attr('y', rowY + 50)
        .attr('dominant-baseline','text-before-edge')
        .attr('font-size', 24).attr('font-family', FONT).attr('font-weight', 700).attr('fill', C_LABEL)
        .text(r.label);
      g.append('text').attr('x', LX).attr('y', rowY + 79)
        .attr('dominant-baseline','text-before-edge')
        .attr('font-size', 15).attr('font-family', FONT).attr('fill','#aaaaaa')
        .text(r.base);
    } else {
      g.append('text').attr('x', LX).attr('y', rowY + 32)
        .attr('dominant-baseline','text-before-edge')
        .attr('font-size', 24).attr('font-family', FONT).attr('font-weight', 700).attr('fill', C_LABEL)
        .text(r.label);
      g.append('text').attr('x', LX).attr('y', rowY + 61)
        .attr('dominant-baseline','text-before-edge')
        .attr('font-size', 15).attr('font-family', FONT).attr('fill','#aaaaaa')
        .text(r.base);
    }

    /* ── NPV bar: clamp to domain, label always right of zero ── */
    var npvClamped = Math.max(X_DOMAIN[0], Math.min(X_DOMAIN[1], r.npv));
    var x0 = NPV_X + xSc(0);
    var x1 = NPV_X + xSc(npvClamped);
    var bX = Math.min(x0, x1), bW = Math.max(Math.abs(x1 - x0), 2);
    var bColor = r.npv >= 0 ? C_BAR_POS : C_BAR_NEG;
    var clipped = r.npv !== npvClamped;
    g.append('rect').attr('x', bX).attr('y', mid - BAR_H/2)
      .attr('width', bW).attr('height', BAR_H).attr('rx', 0)
      .attr('fill', bColor).attr('opacity', 0.82);
    /* FIX 3: label always right of zero line, never into label column */
    var lblX = Math.max(zx + 8, NPV_X + 8);
    g.append('text').attr('x', lblX).attr('y', mid)
      .attr('dominant-baseline','middle').attr('font-size', 22)
      .attr('font-family', FONT).attr('font-weight', 600).attr('fill', bColor)
      .text((clipped ? '›› ' : '') + fmtNpv(r.npv));

    /* ── Unit squares ── */
    drawSquares(CO2_X, mid, r.co2,    co2Unit,  C_TEAL);
    drawSquares(FSL_X, mid, r.fossil, fslUnit,  C_GRAY);

    /* ── Count per mld ── */
    g.append('text').attr('x', CNT_X).attr('y', mid)
      .attr('dominant-baseline','middle')
      .attr('font-size', 20).attr('font-family', FONT).attr('font-weight', 400).attr('fill','#aaaaaa')
      .text(fmtCount(r.count));
  });
});
</script>
