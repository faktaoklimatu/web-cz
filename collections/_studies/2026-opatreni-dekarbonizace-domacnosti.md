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

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=manage_search" />

<style>
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  -webkit-font-smoothing: antialiased;
}
</style>

<style>
/* Remove the alternating grey section background — keep the page uniformly white */
.section, .section:nth-of-type(odd), .section:nth-of-type(even) { background-color: #fff; }

/* ── Page-wide typography ───────────────────────────────────────────────────
   The whole study uses Inter (site chrome / main navbar stays as the site sets). */
#secondary-navbar, .section, .between-navbars,
.section h1, .section h2, .section h3,
.perex, .page-type, .measure-takeaway {
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Arial, sans-serif;
}

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

/* ── In-page measure navigation ────────────────────────────────────────────── */
.measure-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 18px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e6e9ed;
}
.measure-nav a {
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Arial, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1a7a85;
  text-decoration: none;
  white-space: nowrap;
}
.measure-nav a:hover { text-decoration: underline; }

/* Anchored headings must clear the sticky main + secondary navbars */
.section h2 { scroll-margin-top: 190px; }

.control-group {
  display: flex;
  flex-direction: column;
  flex: 1 1 180px;
  max-width: 360px;
  min-width: 160px;
}
.control-group.control-group--seg {
  flex: 0 0 auto;
  max-width: none;
}
.control-group.control-group--narrow {
  flex: 0 1 210px;
  min-width: 150px;
  max-width: 210px;
}

/* Segmented control — all options visible, single click, hover title for details */
.seg {
  display: inline-flex;
  margin-top: 4px;
  border: 1px solid #d3dae0;
  border-radius: 6px;
  overflow: hidden;
  align-self: flex-start;
}
.seg-btn {
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Arial, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 5px 11px;
  background: #fff;
  color: #666;
  border: none;
  border-right: 1px solid #d3dae0;
  cursor: pointer;
  white-space: nowrap;
}
.seg-btn:last-child { border-right: none; }
.seg-btn:hover { background: #f0f3f5; color: #515b66; }
.seg-btn.is-active { background: #515b66; color: #fff; }

.control-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2px;
}

.control-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #515b66;
  font-family: 'Inter';
}

.control-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: #515b66;
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

/* ── Row detail backdrop ─────────────────────────────────────────────────── */
#row-detail-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 6;
  background: rgba(0,0,0,0.28);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}
#row-detail-backdrop.is-open { display: block; }

/* ── Row detail floating card ────────────────────────────────────────────── */
#row-detail-bar {
  display: none;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(calc(100% - 30px), 1200px);
  z-index: 900;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #dce3e8;
  box-shadow: 0 12px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.07);
  overflow: hidden;
}
#row-detail-bar.is-open { display: block; }
.row-detail-inner {
  padding: 30px 24px 24px;
  overflow-x: auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  row-gap: 22px;
  align-items: start;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif;
}

/* Short explanatory subtitle under a section label */
.rd-section-sub {
  font-size: 12px; color: #9ea7b3; line-height: 1.4; margin: -1px 0 12px; max-width: 46ch;
}

/* Timeline headline — sentence, then the prominent payback figure on its own line */
.rd-payback {
  display: flex; flex-direction: column; gap: 3px;
  margin: 2px 0 14px; max-width: 60ch;
}
.rd-payback-txt { font-size: 13px; color: #515b66; line-height: 1.4; }
.rd-payback-num { font-size: 24px; font-weight: 700; color: #515b66; line-height: 1.15; }

/* Citlivostní analýza — tornado / dumbbell */
.row-detail-sens svg { display: block; }

/* Variant toggle (dev/testing) */
.rd-sens-toggle { display: flex; gap: 4px; margin-bottom: 10px; }
.rd-sens-tbtn {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 10px; font-weight: 600; letter-spacing: 0.02em;
  color: #9ea7b3; background: #f4f6f8; border: 1px solid #e2e6ea; border-radius: 4px;
  padding: 3px 8px; cursor: pointer;
}
.rd-sens-tbtn:hover { color: #515b66; }
.rd-sens-tbtn.is-active { color: #fff; background: #515b66; border-color: #515b66; }

/* Measure vs. baseline parameter comparison (params as columns, one row per variant) */
.rd-params { width: 100%; border-collapse: collapse; font-size: 13px; }
.rd-params th, .rd-params td {
  text-align: left; padding: 8px 16px 8px 0; border-bottom: 1px solid #f0f2f4; vertical-align: baseline;
  font-variant-numeric: tabular-nums;
}
.rd-params tbody tr:last-child td { border-bottom: none; }
.rd-params thead th {
  font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; color: #9ea7b3; font-weight: 700;
  padding-bottom: 8px;
}
.rd-params-name { font-variant-numeric: normal; }        /* first column: variant name */
.rd-params-meas { color: #515b66; font-weight: 600; }
.rd-params-base { color: #9ea7b3; }

/* Current-settings caption under the title */
.rd-settings {
  margin-top: 8px;
  font-size: 12px;
  color: #9ea7b3;
  line-height: 1.4;
}

/* ── 12-column grid placement ───────────────────────────────────────────── */
.rd-header      { grid-column: 1 / -1; }
.rd-stat--npv   { grid-column: 1 / 5; }
.rd-stat--emise { grid-column: 5 / 9; }
.rd-stat--dovoz { grid-column: 9 / 13; }
.rd-chart--timeline { grid-column: 1 / 7;  min-width: 0; }
.rd-chart--sens     { grid-column: 7 / 13; min-width: 0; }
.rd-params-row      { grid-column: 1 / -1; }
.rd-hr              { grid-column: 1 / -1; border-bottom: 1px solid #eef1f4; }

/* Header: title block (identity + close) */
.rd-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid #eef1f4;   /* separates identity from the metrics */
  font-family: Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif;
}
.rd-identity { flex: 1 1 auto; min-width: 0; }
.rd-context {
  font-size: 12px; font-weight: 600; letter-spacing: 0.04em;
  color: #515b66; margin-bottom: 3px;
}
.rd-title { font-size: 22px; color: #515b66; line-height: 2; }
.rd-title-name { font-weight: 700; }
.rd-vs { color: #9ea7b3; font-weight: 400; }

.rd-lbl {
  font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;
  color: #9ea7b3; line-height: 1.2; margin-bottom: 10px;
}
.rd-stat-val {
  display: flex; flex-direction: column; align-items: flex-start; justify-content: center;
  gap: 2px;
  font-size: 24px; font-weight: 700; color: #515b66;   /* all three KPIs share one style */
}
.rd-stat-val svg { flex: 0 0 auto; }
.rd-stat-note { font-size: 11px; font-weight: 400; }

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

.row-detail-section-label {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #999;
  margin-bottom: 4px;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif;
}

/* ── Measure takeaway ────────────────────────────────────────────────────── */
.measure-takeaway {
  font-size: 0.95rem;
  color: #515b66;
  line-height: 1.4;
  margin: -0.25rem 0 1rem;
  max-width: 72ch;
}
.row-detail-timeline { overflow-x: auto; }
.row-detail-timeline svg { display: block; }
</style>

{% assign data = site.data["costs-and-benefits"] %}

{% assign building_measure_names = "" | split: "" %}
{% for measure in data.buildings_measures %}
  {% if measure.measure_baseline_id %}
    {% unless building_measure_names contains measure.measure_name %}
      {% assign building_measure_names = building_measure_names | push: measure.measure_name %}
    {% endunless %}
  {% endif %}
{% endfor %}

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

  <nav class="container measure-nav" aria-label="Přejít na opatření">
    {% for name in building_measure_names %}
    <a href="#m-{{ forloop.index }}">{{ name }}</a>
    {% endfor %}
    <a href="#m-nove">Nové elektromobily</a>
    <a href="#m-ojete">Ojeté elektromobily</a>
  </nav>

  <div class="container controls-inner">

    <div class="control-group control-group--seg">
      <span class="control-label">Scénář energií</span>
      <div class="seg" id="fuel-scenario-seg">
        <button type="button" class="seg-btn is-active" data-scenario="CP" title="Vývoj cen energií při zachování současných politik a trhů.">Současné politiky</button>
        <button type="button" class="seg-btn" data-scenario="CP_EC" title="Opakování energetické krize – trvale vyšší ceny fosilních paliv.">Energetická krize</button>
        <button type="button" class="seg-btn" data-scenario="NZ" title="Cesta k uhlíkové neutralitě – rostoucí cena uhlíku, levnější čistá energie.">Net-zero</button>
      </div>
    </div>

    <div class="control-group control-group--narrow">
      <div class="control-head">
        <span class="control-label">Nejistota cen energií</span>
        <span class="control-value" id="price-uncertainty-value">0&nbsp;%</span>
      </div>
      <div class="slider-with-ticks">
        <input type="range" id="price-uncertainty-slider" min="-10" max="10" step="10" value="0">
        <div class="tick-labels">
          <span class="tick-label" style="left:8px">
            <span class="tick-mark"></span>
            <span class="tick-text">−10 %<small>levnější</small></span>
          </span>
          <span class="tick-label" style="left:50%">
            <span class="tick-mark"></span>
            <span class="tick-text">0 %<small>základ</small></span>
          </span>
          <span class="tick-label" style="left:calc(100% - 8px)">
            <span class="tick-mark"></span>
            <span class="tick-text">+10 %<small>dražší</small></span>
          </span>
        </div>
      </div>
    </div>

    <div class="control-group">
      <div class="control-head">
        <span class="control-label">Cena uhlíku (ETS&nbsp;2)</span>
        <span class="control-value" id="carbon-price-value">70&thinsp;€</span>
      </div>
      <div class="slider-with-ticks">
        <input type="range" id="carbon-price-slider" min="0" max="200" step="10" value="70">
        <div class="tick-labels">
          <!-- left = calc(val/200 * (100% - 16px) + 8px) -->
          <span class="tick-label" style="left:8px">
            <span class="tick-mark"></span>
            <span class="tick-text">0 €</span>
          </span>
          <span class="tick-label" style="left:calc(20% + 4.8px)">
            <span class="tick-mark"></span>
            <span class="tick-text">40 €</span>
          </span>
          <span class="tick-label" style="left:calc(35% + 2.4px)">
            <span class="tick-mark"></span>
            <span class="tick-text">70 €</span>
          </span>
          <span class="tick-label" style="left:50%">
            <span class="tick-mark"></span>
            <span class="tick-text">100 €</span>
          </span>
          <span class="tick-label" style="left:calc(100% - 8px)">
            <span class="tick-mark"></span>
            <span class="tick-text">200 €</span>
          </span>
        </div>
      </div>
    </div>

    <div class="control-group control-group--seg">
      <span class="control-label">Výše investičních nákladů</span>
      <div class="seg" id="capex-level-seg">
        <button type="button" class="seg-btn" data-capex="-1" title="Nižší investiční náklady (rychlejší zlevňování technologií).">Optimistická</button>
        <button type="button" class="seg-btn is-active" data-capex="0" title="Očekávané investiční náklady.">Střední</button>
        <button type="button" class="seg-btn" data-capex="1" title="Vyšší investiční náklady, než se čeká.">Pesimistická</button>
      </div>
    </div>

  </div>
</div>

<div id="row-detail-backdrop"></div>
<div id="row-detail-bar">
  <div class="container row-detail-inner"></div>
</div>

<div class="section pt-3 pb-2">
  <div class="container">
    <div id="summary-chart" class="measure-chart"></div>
  </div>
</div>

<div class="section">
<div class="container" markdown="1">

# Budovy

{% for name in building_measure_names %}
## {{ name }} {#m-{{ forloop.index }}}
{% if name == "Renovace se zateplením" %}
<p class="measure-takeaway">Ekonomicky se vyplatí zejména u energeticky náročných domů (třída E, F) – úspora provozu vyváží nákladnou renovaci. U domů s vyšším standardem (třída D a výše) se zateplení čistě ekonomicky spíše nevyplatí.</p>
{% elsif name == "Tepelné čerpadlo" %}
<p class="measure-takeaway">Ekonomická výhodnost závisí na ceně uhlíku – bez jeho zpoplatnění se tepelné čerpadlo mírně nevyplatí, ale při ceně 70&thinsp;€/t CO₂ se vyplatí napříč všemi typy budov.</p>
{% elsif name == "Kotel na dřevo" %}
<p class="measure-takeaway">Oproti plynovému kotli se kotel na dřevo ekonomicky vyplatí i bez zpoplatnění uhlíku, oproti uhelný kotli při ceně alespoň 40&thinsp;€/t CO₂. Snížení emisí CO₂ je ale sporné – novější vědecké práce zpochybňují uhlíkovou neutralitu spalování dřeva.</p>
{% elsif name == "Elektrický kotel" %}
<p class="measure-takeaway">Elektrický kotel se ekonomicky výrazně nevyplatí v energeticky náročnějších budovách, a nevyplatí se ani emisně – český elektroenergetický mix má vyšší emisní intenzitu než samotný zemní plyn.</p>
{% elsif name == "Střešní fotovoltaika + baterie" %}
<p class="measure-takeaway">Ekonomická výhodnost roste s vyšší spotřebou elektřiny v domě. Při nízké nebo střední spotřebě (4–7&thinsp;MWh ročně) se investice bez dotací nemusí vrátit – fotovoltaika se nejvíce vyplatí v domácnostech, které elektřinu hojně využívají (tepelné čerpadlo, elektromobil).</p>
{% endif %}
<div class="measure-chart" data-section="buildings" data-measure="{{ name | escape }}"></div>
{% endfor %}

# Doprava

{:.text-muted style="font-size:0.8rem; margin-top:-0.5rem"}
Cena elektřiny pro elektromobily odpovídá scénáři „Nabíjím převážně doma ze sítě" (faktor 1,33).

## Nové {#m-nove}

<p class="measure-takeaway">Nové elektromobily jsou v Česku v celkových nákladech za 15 let životnosti již výhodné ve srovnání s novými auty se spalovacím motorem – navzdory vyšší pořizovací ceně. Ekonomická výhodnost ale zásadně závisí na způsobu nabíjení: při převážně domácím nabíjení se elektromobil vyplatí, při nabíjení venku nikoli.</p>

<div class="measure-chart" data-section="transport" data-group="Nové"></div>

## Ojeté {#m-ojete}

<p class="measure-takeaway">Ojeté elektromobily jsou při převážně domácím nabíjení v celkových nákladech za 10 let výhodné oproti srovnatelným ojetinám se spalovacím motorem. Výsledek závisí na konkrétním modelu a ceně ojetiny.</p>

<div class="measure-chart" data-section="transport" data-group="Ojeté"></div>

</div>
</div>
