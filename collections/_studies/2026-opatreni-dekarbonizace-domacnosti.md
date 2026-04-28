---
layout:        empty
type:          "Interaktivní přehled"
title:         "Opatření pro dekarbonizaci domácností"
slug:          2026-opatreni-dekarbonizace-domacnosti
redirect_from:
- /opatreni-dekarbonizace-domacnosti
weight:        210
published:     2026-04-21
tags-scopes:   [ cesko ]
tags-topics:   [ opatreni, budovy, doprava ]
caption:       "Jak jsou nákladově efektivní různá opatření pro dekarbonizaci domácností?"
intro: |
    Tento přehled porovnává nákladovou efektivitu opatření pro dekarbonizaci domácností – jak v oblasti budov, tak v dopravě. Pro každé opatření lze porovnat jeho efektivitu v různých kontextech (typ budovy nebo vozidla).
extra-scripts:
- https://d3js.org/d3.v7.min.js
- /assets-local/js/costs-benefits-calculator.js
- /assets-local/js/costs-and-benefits.js
---

<script>
  window.COSTS_AND_BENEFITS = {{ site.data["costs-and-benefits"] | jsonify }};
</script>

<style>
/* ── Controls bar ──────────────────────────────────────────────────────────── */
/* Sticky behaviour, z-index, shadow and background are handled by the site's
   #secondary-navbar / .secondary-navbar-stuck styles in _core_design.scss.    */

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
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #666;
}

.control-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1a7a85;
}

/* ── Slider with ticks ─────────────────────────────────────────────────────── */
/* Thumb width on Chrome/Edge/Firefox is ~16 px; tick positions use
   left: calc(val/max * (100% - 16px) + 8px) so marks centre on the thumb.    */
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
  font-size: 0.7rem;
  text-align: center;
  color: #888;
  line-height: 1.2;
  white-space: nowrap;
}
.tick-text small {
  display: block;
  color: #bbb;
  font-size: 0.625rem;
}

/* ── Chart ─────────────────────────────────────────────────────────────────── */
.measure-chart {
  margin: 4px 0 24px;
  overflow-x: auto;
}
.measure-chart svg { display: block; }

.chart-col-header {
  font-size: 11px;
  fill: #999;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.chart-axis path,
.chart-axis line { stroke: #ddd; }
.chart-axis text  { font-size: 12px; fill: #888; }

/* ── Clickable detail rows ─────────────────────────────────────────────── */
.d-row { cursor: pointer; }

/* ── Row detail panel ──────────────────────────────────────────────────── */
.row-detail {
  background: #f7f9fa;
  border: 1px solid #e0e6ea;
  border-radius: 6px;
  margin: 0 0 20px;
  padding: 12px 16px 10px;
  font-family: Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif;
  font-size: 13px;
}

.row-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  color: #333;
}
.row-detail-title strong { font-size: 14px; }
.row-detail-vs { color: #999; margin-left: 4px; font-size: 12px; }

.row-detail-close {
  background: none;
  border: none;
  font-size: 15px;
  color: #bbb;
  cursor: pointer;
  padding: 0 0 0 12px;
  line-height: 1;
  flex-shrink: 0;
}
.row-detail-close:hover { color: #555; }

/* Stats grid — 4 columns: row-label + 3 data cols */
.stats-grid {
  display: grid;
  grid-template-columns: 2.8rem 1fr 1fr 1fr;
  row-gap: 6px;
  margin-bottom: 12px;
  align-items: start;
}

/* Row category label (Peníze / Emise / Plyn) */
.stats-row-lbl {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #ccc;
  align-self: center;
  padding-right: 4px;
}

/* Column header cells (top of col 2 and col 3) */
.stats-col-hdr-cell {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #bbb;
  padding-bottom: 4px;
  border-bottom: 1px solid #e8e8e8;
}

/* Individual stat cell */
.row-detail-stat {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.stat-lbl {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #aaa;
}
.stat-val {
  font-size: 0.92rem;
  font-weight: 600;
  color: #333;
}
.stat-sub {
  font-size: 0.7rem;
  font-weight: 400;
  color: #bbb;
  margin-top: 1px;
}

/* Dashed left dividers on the NPV and CAPEX columns */
.stats-cell-npv,
.stats-cell-capex {
  border-left: 1px dashed #e0e0e0;
  padding-left: 10px;
}

.row-detail-section-label {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #999;
  margin-bottom: 4px;
}
.row-detail-tornado svg { display: block; }
.row-detail-timeline { overflow-x: auto; }
.row-detail-timeline svg { display: block; }
</style>

{% assign data = site.data["costs-and-benefits"] %}

<div class="section pb-3">
  <div class="container between-navbars">
    <h1>{{ page.title }}</h1>
    <div class="page-type">{{ page.type }}</div>
    {% include tags.html tags=page.tags slug=page.slug link="true" %}
    <div class="perex narrow-text">{{ page.intro | markdownify }}</div>
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
          <!-- left = calc(val/200 * (100% - 16px) + 8px) -->
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
          <!-- left = calc(val/7 * (100% - 16px) + 8px) -->
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
    <div id="summary-chart" class="measure-chart"></div>
  </div>
</div>

<div class="section">
<div class="container" markdown="1">

# Budovy

{% assign building_measure_names = "" | split: "" %}
{% for measure in data.buildings_measures %}
  {% if measure.measure_baseline_id %}
    {% unless building_measure_names contains measure.measure_name %}
      {% assign building_measure_names = building_measure_names | push: measure.measure_name %}
    {% endunless %}
  {% endif %}
{% endfor %}

{% for name in building_measure_names %}
## {{ name }}
<div class="measure-chart" data-section="buildings" data-measure="{{ name | escape }}"></div>
{% endfor %}

# Doprava

{% assign transport_measure_names = "" | split: "" %}
{% for measure in data.transport_measures %}
  {% if measure.measure_baseline_id %}
    {% unless transport_measure_names contains measure.measure_name %}
      {% assign transport_measure_names = transport_measure_names | push: measure.measure_name %}
    {% endunless %}
  {% endif %}
{% endfor %}

{% for name in transport_measure_names %}
## {{ name }}
<div class="measure-chart" data-section="transport" data-measure="{{ name | escape }}"></div>
{% endfor %}

</div>
</div>
