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
  fill: #bbb;
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
.chart-axis text  { font-size: 10px; fill: #888; }

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
        Porovnání scénářů ceny uhlíku: 60 € vs. 200 €
      </button>
      <div id="static-comparison-chart" class="quadrant-chart static-comparison-chart" hidden></div>
    </div>
  </div>
</div>

<div class="section pt-3 pb-2">
  <div class="container">
    <p class="chart-col-header mb-2">Křivka marginálních nákladů dekarbonizace (MAC curve)</p>
    <div id="mac-chart" style="overflow-x:auto;"></div>
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
    <p class="chart-col-header mb-3">Úspora paliva při plošném nasazení opatření</p>
    <table class="table table-sm" style="max-width:700px;">
      <thead>
        <tr>
          <th>Opatření</th>
          <th class="text-end">Počet opatření</th>
          <th class="text-end">Úspora na jednotku</th>
          <th class="text-end">Celková roční úspora</th>
          <th class="text-end">Z 60 TWh dovozů plynu</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tepelné čerpadlo <small class="text-muted">(Rodinný dům plyn – E)</small></td>
          <td class="text-end">200 000</td>
          <td class="text-end">24 MWh plynu / rok</td>
          <td class="text-end"><strong>4,8 TWh plynu / rok</strong></td>
          <td class="text-end">8 %</td>
        </tr>
        <tr>
          <td>Zateplení + fasáda <small class="text-muted">(Rodinný dům plyn – E)</small></td>
          <td class="text-end">200 000</td>
          <td class="text-end">10 MWh plynu / rok</td>
          <td class="text-end"><strong>2 TWh plynu / rok</strong></td>
          <td class="text-end">3,3 %</td>
        </tr>
        <tr>
          <td>Malý elektromobil <small class="text-muted">(Nové malé)</small></td>
          <td class="text-end">500 000</td>
          <td class="text-end">975 l benzínu / rok</td>
          <td class="text-end"><strong>487,5 mil. l benzínu / rok</strong></td>
          <td class="text-end">—</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-muted" style="font-size:0.8em;">
            Tepelné čerpadlo: baseline Plynový kotel 24 MWh/rok → opatření přechází na elektřinu (0 MWh plynu).
            Zateplení + fasáda: baseline 24 MWh/rok → opatření 14 MWh/rok plynu.
            Malý elektromobil: baseline Nové malé auto na benzín, 6,5 l/100 km × 15 000 km/rok = 975 l/rok → elektromobil nespotřebuje benzín.
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
