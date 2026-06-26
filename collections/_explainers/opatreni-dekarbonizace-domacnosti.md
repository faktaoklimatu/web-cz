---
layout:      empty
title:       "Opatření pro dekarbonizaci domácností – grafy"
slug:        "opatreni-dekarbonizace-domacnosti"
body-class:  "page-opatreni-dekarbonizace"
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

<div class="section pt-4 pb-3" id="souhrn_npv">
  <div class="container">
    <h2 class="key-chart-title">Ekonomicky nejvýhodnější je renovace<br>energeticky nehospodárného domu</h2>
    <p class="key-chart-subtitle">Náklady na investici jsou zde vyváženy nižšími provozními náklady<br>a výsledek je robustní pro širokou škálu vstupních parametrů.</p>
  </div>
</div>

<div class="section pt-4 pb-3" id="souhrn_emise">
  <div class="container">
    <h2 class="key-chart-title">Nejvíce emisí CO<sub>2</sub> lze uspořit u energeticky nehospodárných domů, kde se topí uhlím</h2>
  </div>
</div>

<div class="section pt-4 pb-3" id="souhrn_import">
  <div class="container">
    <h2 class="key-chart-title">Nejvíce importu fosilních paliv lze uspořit u energeticky nehospodárných domů vytápěných plynem</h2>
  </div>
</div>

<div class="section pt-4 pb-3" id="souhrn_vse">
  <div class="container">
    <h2 class="key-chart-title">Různá opatření přináší různé kombinace výhod</h2>
  </div>
</div>

<div class="section pt-4 pb-3" id="scenare-vyvoje-cen">
  <div class="container">
    <h2 class="key-chart-title">Scénáře vývoje cen energií a uhlíku a emisní intenzity elektřiny</h2>
    <div id="scenario-charts-legend" style="margin-bottom:1rem;"></div>
    <div id="scenario-charts"></div>
  </div>
</div>

<div class="section pt-4 pb-3" id="srovnani-vozidel">
  <div class="container">
    <h2 class="key-chart-title">Srovnání vybraných dvojic vozidel</h2>
  </div>
</div>

<div class="section pt-4 pb-3" id="vyhodnost-elektromobilu">
  <div class="container">
    <h2 class="key-chart-title">Výhodnost elektromobilu závisí na způsobu nabíjení</h2>
  </div>
</div>

<div class="section pt-4 pb-3" id="renovace-zatepleni">
  <div class="container">
    <h2 class="key-chart-title">Renovace se zateplením</h2>
  </div>
</div>

<div class="section pt-4 pb-3" id="tepelne-cerpadlo">
  <div class="container">
    <h2 class="key-chart-title">Tepelné čerpadlo</h2>
  </div>
</div>

<div class="section pt-4 pb-3" id="vyhodnost-tepelneho-cerpadla">
  <div class="container">
    <h2 class="key-chart-title">Výhodnost tepelného čerpadla závisí na poměru cen elektřiny a plynu</h2>
  </div>
</div>

<div class="section pt-4 pb-3" id="kotel-biomasu">
  <div class="container">
    <h2 class="key-chart-title">Kotel na dřevo</h2>
  </div>
</div>

<div class="section pt-4 pb-3" id="elektrokotel">
  <div class="container">
    <h2 class="key-chart-title">Elektrokotel</h2>
  </div>
</div>

<div class="section pt-4 pb-3" id="fve">
  <div class="container">
    <h2 class="key-chart-title">Střešní fotovoltaika a baterie</h2>
  </div>
</div>

<div class="section pt-4 pb-3" id="cena-tuny-co2">
  <div class="container">
    <h2 class="key-chart-title">Kolik stojí úspora jedné tuny emisí CO<sub>2</sub>?</h2>
  </div>
</div>

<div class="section pt-4 pb-3" id="vyhodnost-vs-emise">
  <div class="container">
    <h2 class="key-chart-title">Ekonomická výhodnost vs. úspora emisí CO<sub>2</sub></h2>
    <div id="vyhodnost-vs-emise-chart"></div>
  </div>
</div>

<div class="section pt-4 pb-3" id="scenare-cen-energii">
  <div class="container">
    <h2 class="key-chart-title">Jak ekonomickou výhodnost opatření ovlivňují různé scénáře cen energií?</h2>
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
    <div id="dumbbell-combined"></div>
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
    <p class="chart-col-header mb-2">Velký elektromobil — náklady a vliv diskontování</p>
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
      <p id="sensitivity-beeswarm-note" class="eff-note" style="display:none"></p>
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

