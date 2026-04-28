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

.chart-col-header {
  font-size: 10px;
  fill: #999;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.chart-axis path,
.chart-axis line { stroke: #ddd; }
.chart-axis text  { font-size: 10px; fill: #888; }
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

    <div class="control-group">
      <div class="control-head">
        <span class="control-label">Cena uhlíku</span>
        <span class="control-value" id="carbon-price-value">60&thinsp;€</span>
      </div>
      <div class="slider-with-ticks">
        <input type="range" id="carbon-price-slider" min="0" max="200" step="10" value="60">
        <div class="tick-labels">
          <span class="tick-label" style="left:8px">
            <span class="tick-mark"></span>
            <span class="tick-text">0 €<small>bez ceny uhlíku</small></span>
          </span>
          <span class="tick-label" style="left:calc(30% + 3.2px)">
            <span class="tick-mark"></span>
            <span class="tick-text">60 €<small>ETS2 nižší</small></span>
          </span>
          <span class="tick-label" style="left:50%">
            <span class="tick-mark"></span>
            <span class="tick-text">100 €<small>ETS2 vyšší</small></span>
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

    <div class="control-group control-group--select">
      <label class="control-label" for="fuel-scenario-select">Scénář cen energií</label>
      <select id="fuel-scenario-select" class="form-select form-select-sm mt-1">
        <option value="CP">Současné politiky</option>
        <option value="NZ">Net-zero</option>
        <option value="CP_EC">Energetická krize</option>
      </select>
    </div>

  </div>
</div>

<div class="section pt-3 pb-2">
  <div class="container">
    <p class="chart-col-header mb-2">Cena uhlíku</p>
    <div style="display:flex; gap:2rem; flex-wrap:wrap;">
      <div style="flex:1; min-width:280px;">
        <p class="chart-col-header mb-1">Rodinný dům uhlí – E</p>
        <div class="tornado-chart" data-category="Rodinný dům uhlí – E" data-param="Cena uhlíku"></div>
      </div>
      <div style="flex:1; min-width:280px;">
        <p class="chart-col-header mb-1">Rodinný dům plyn – E</p>
        <div class="tornado-chart" data-category="Rodinný dům plyn – E" data-param="Cena uhlíku"></div>
      </div>
    </div>
    <p class="chart-col-header mb-2 mt-4">Diskontní míra</p>
    <div style="display:flex; gap:2rem; flex-wrap:wrap;">
      <div style="flex:1; min-width:280px;">
        <p class="chart-col-header mb-1">Rodinný dům uhlí – E</p>
        <div class="tornado-chart" data-category="Rodinný dům uhlí – E" data-param="Diskontní míra"></div>
      </div>
      <div style="flex:1; min-width:280px;">
        <p class="chart-col-header mb-1">Rodinný dům plyn – E</p>
        <div class="tornado-chart" data-category="Rodinný dům plyn – E" data-param="Diskontní míra"></div>
      </div>
    </div>
  </div>
</div>
