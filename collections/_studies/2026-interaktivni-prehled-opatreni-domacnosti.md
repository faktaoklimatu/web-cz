---
layout:        empty
type:          "Interaktivní přehled"
title:         "Opatření pro dekarbonizaci domácností"
slug:          2026-interaktivni-prehled-opatreni-domacnosti
redirect_from:
- /2026-interaktivni-prehled-opatreni-domacnosti
published:     2026-07-27
caption:       "Jak jsou nákladově efektivní různá opatření pro dekarbonizaci domácností?"
intro: |
    Tento přehled porovnává efektivitu opatření pro dekarbonizaci domácností v budovách a dopravě oproti emisně náročnějším variantám. A to z pohledu jejich ekonomiky, emisí CO₂ a úspory dovážených fosilních paliv.
extra-scripts:
- https://d3js.org/d3.v7.min.js
- /assets-local/js/costs-benefits-calculator.js
- /assets-local/js/costs-and-benefits.js
- /assets-local/figures/2026-analyza-opatreni-domacnosti/scenare-cen-energii-chart.js
preview_type: "Interaktivní přehled"
preview_image: "/assets/studies/2026-interaktivni-prehled-opatreni-domacnosti.jpg"
include_in_search: true
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
   Only the interactive UI (controls, charts, detail) uses Inter; classic text
   (headings, paragraphs, perex, takeaways) keeps the site's default Source Sans. */
#secondary-navbar {
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Arial, sans-serif;
}
/* …but the page title is classic text — keep it in the site font. */
#secondary-navbar .page-title {
  font-family: 'Source Sans Pro', sans-serif;
}

/* ── Controls bar ──────────────────────────────────────────────────────────── */
/* Sticky behaviour, z-index, shadow and background are handled by the site's
   #secondary-navbar / .secondary-navbar-stuck styles in _core_design.scss.    */

.controls-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 40px;   /* row-gap only shows between wrapped rows, not below a single row */
  align-items: flex-start;
  padding-bottom: 0.25rem;
}

/* ── In-page measure navigation ────────────────────────────────────────────── */
/* Extra space above the sticky title once the navbar collapses (scrolled down) */
#secondary-navbar.secondary-navbar-stuck { padding-top: 10px; }
#secondary-navbar.secondary-navbar-stuck .page-title { opacity: 1; margin-bottom: 1rem; }

.measure-nav {
  display: none;
}

@media (min-width: 768px) {
  .measure-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 18px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e6e9ed;
    font-size: 0.9rem;
  }
  #secondary-navbar .measure-nav a {
    font-family: 'Inter', system-ui, -apple-system, Segoe UI, Arial, sans-serif;
    font-size: 0.8rem !important;   /* override the site's larger link styling */
    font-weight: 600;
    color: #1a7a85 !important;      /* override the site's grey link colour */
    text-decoration: none !important;
    white-space: nowrap;
    line-height: 1.3;
  }
  #secondary-navbar .measure-nav a:hover { color: #0d5a63 !important; text-decoration: none !important; }
  /* Active measure (site scroll-spy adds .highlighted) → bold, not underlined */
  #secondary-navbar .measure-nav a.highlighted {
    font-weight: 700;
    text-decoration: none !important;
  }
}

/* Anchored headings must clear the sticky main + secondary navbars */
.section h2 { scroll-margin-top: 190px; }

.control-group {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;          /* equal thirds across the three controls */
  max-width: none;
  min-width: 340px;
  position: relative;   /* anchor for the Net-zero overlay */
}

/* Net-zero: the carbon price follows the scenario, so the slider is replaced by a note */
.carbon-lock {
  display: none;
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Arial, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #515b66;
  line-height: 1.35;
  padding-top: 8px;
}
#carbon-group.is-locked .carbon-lock       { display: block; }
#carbon-group.is-locked .slider-with-ticks { display: none; }
#carbon-group.is-locked .control-value     { display: none; }
.control-group.control-group--seg {
  flex: 1 1 0;
}

/* Segmented control — all options visible, single click, hover title for details */
.seg {
  display: flex;
  width: 100%;          /* fill the group so both segmented rows are equal width */
  margin-top: 4px;
  border: 1px solid #d3dae0;
  border-radius: 6px;
  overflow: hidden;
}
.seg-btn {
  flex: 1 1 0;          /* buttons share the seg width evenly */
  text-align: center;
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
  white-space: nowrap;   /* keep the label on one line (no wrap-induced overlap) */
}

.control-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: #515b66;
}

/* Narrow screens: stack each control full-width; let button labels wrap, not clip */
@media (max-width: 640px) {
  .control-group,
  .control-group.control-group--seg { flex-basis: 100%; min-width: 0; }
  .seg-btn { white-space: normal; padding: 5px 6px; }
}

/* ── Slider with ticks ─────────────────────────────────────────────────────── */
/* Thumb width on Chrome/Edge/Firefox is ~16 px; tick positions use
   left: calc(val/max * (100% - 16px) + 8px) so marks centre on the thumb.    */
.slider-with-ticks {
  position: relative;
  padding-bottom: 16px;
}
.slider-with-ticks input[type=range] {
  width: 100%;
  margin: 0;
  cursor: pointer;
  accent-color: #515b66;
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

.measure-chart, #summary-chart {
  width: var(--wide-figure-width);
}
@media (min-width: 768px) {
  .measure-chart, #summary-chart {
    width: 100%;
  }
}

.measure-chart svg { display: block; }

.chart-col-header {
  font-size: 11px;
  fill: #515b66;
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
  top: var(--cb-detail-top, 90px);   /* sits just below the sticky navbar (JS-measured) */
  transform: translateX(-50%);
  width: min(calc(100% - 30px), 1200px);
  max-height: calc(100dvh - var(--cb-detail-top, 90px) - 20px);
  z-index: 900;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #dce3e8;
  box-shadow: 0 12px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.07);
  overflow: hidden auto;   /* scroll inside the card if it's taller than the space */
}
#row-detail-bar.is-open { display: block; }
.row-detail-inner {
  padding: 30px 24px 24px;
  overflow-x: auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 52px;
  row-gap: 22px;
  align-items: start;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif;
}

/* Short explanatory subtitle under a section label */
.rd-section-sub {
  font-size: 12px; color: #515b66; line-height: 1.4; margin: -1px 0 12px; max-width: 46ch;
}

/* Timeline headline — sentence with the payback figure bolded inline */
.rd-payback {
  font-size: 13px; color: #515b66; line-height: 1.45;
  margin: 2px 0 14px; max-width: 60ch;
}
.rd-payback strong { font-weight: 700; }

/* Citlivostní analýza — tornado / dumbbell */
.row-detail-sens svg { display: block; }

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
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Arial, sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  color: #515b66;
  line-height: 1.4;
}

/* ── 12-column grid placement ───────────────────────────────────────────── */
.rd-header      { grid-column: 1 / -1; }
.rd-stat--npv   { grid-column: 1 / 7; }    /* 6fr */
.rd-stat--emise { grid-column: 7 / 10; }   /* 3fr */
.rd-stat--dovoz { grid-column: 10 / 13; }  /* 3fr */
.rd-chart--timeline { grid-column: 1 / 7;  min-width: 0; }
.rd-chart--sens     { grid-column: 7 / 13; min-width: 0; }
.rd-params-row      { grid-column: 1 / -1; }
.rd-hr              { grid-column: 1 / -1; border-bottom: 1px solid #eef1f4; }

/* Header: title block (identity + close) */
.rd-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row-reverse;
  gap: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid #eef1f4;   /* separates identity from the metrics */
  font-family: Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif;
}

@media (min-width: 768px) {
  .rd-header {
    flex-direction: row;
  }
}

.rd-identity { flex: 1 1 auto; min-width: 0; }
.rd-context {
  font-size: 12px; font-weight: 600; letter-spacing: 0.02em;
  color: #515b66; margin-bottom: 3px;
}
.rd-title { font-size: 22px; color: #515b66; line-height: 2; }
.rd-title-name { font-weight: 700; }
.rd-vs { color: #9ea7b3; font-weight: 400; }

.rd-lbl {
  font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;
  color: #515b66; line-height: 1.2; margin-bottom: 10px;
}
.rd-stat-val {
  display: flex; flex-direction: column; align-items: flex-start; justify-content: center;
  gap: 2px;
  font-size: 24px; font-weight: 700; color: #515b66;   /* all three KPIs share one style */
}
.rd-stat-val svg { flex: 0 0 auto; }
.rd-stat-note { font-size: 11px; font-weight: 400; text-decoration: none; border-bottom: none; }
.rd-stat-note strong { font-weight: 700; }

.row-detail-close {
  background: none;
  border: none;
  font-size: 15px;
  color: #9ea7b3;
  cursor: pointer;
  padding: 0 0 0 12px;
  line-height: 1;
  flex-shrink: 0;
}
.row-detail-close:hover { color: #555; }

.row-detail-section-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #515b66;
  margin-bottom: 4px;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif;
}

/* ── Measure heading icon (leading figure) ───────────────────────────────── */
.section h2 .measure-icon {
  height: 1.4em;
  width: auto;
  vertical-align: -0.32em;
  margin-right: 0.5rem;
}

/* ── Measure takeaway ────────────────────────────────────────────────────── */
.measure-takeaway {
  font-size: 1.1rem;
  color: #515b66;
  line-height: 1.4;
  margin: -0.25rem 0 1rem;
  max-width: 72ch;
}
.row-detail-timeline { overflow-x: auto; }
.row-detail-timeline svg { display: block; }
</style>

{% assign data = site.data["costs-and-benefits"] %}

{% comment %} Fixed display order (must match BUILDING_ORDER in costs-and-benefits.js) {% endcomment %}
{% assign building_measure_names = "Tepelné čerpadlo|Renovace se zateplením|Střešní fotovoltaika + baterie|Kotel na dřevo|Elektrický kotel" | split: "|" %}

<div class="section pb-3">
  <div class="container between-navbars">
    <h1>{{ page.title }}</h1>
    <div class="page-type">{{ page.type }}</div>
    {% include tags.html tags=page.tags slug=page.slug link="true" %}
    <div class="perex narrow-text">{{ page.intro | markdownify }}</div>
  </div>
</div>

<div id="secondary-navbar" class="section">
  <nav class="container measure-nav" aria-label="Přejít na opatření">
    {% for name in building_measure_names %}
    <a href="#m-{{ forloop.index }}">{{ name }}</a>
    {% endfor %}
    <a href="#m-nove">Elektromobily</a>
  </nav>

  <div class="container controls-inner">

    <div class="control-group control-group--seg">
      <span class="control-label" data-desc="Všechny scénáře reflektují probíhající Hormuzskou krizi a předpokládají její trvání do roku 2028.">Scénář cen energií</span>
      <div class="seg" id="fuel-scenario-seg">
        <button type="button" class="seg-btn is-active" data-scenario="CP" data-desc="Vychází z aktuálně platných plánů (rozvoj OZE nebo jaderné energetiky, konec uhlí).">Současné politiky</button>
        <button type="button" class="seg-btn" data-scenario="CP_EC" data-desc="Totožný se scénářem současných politik, akorát předpokládá hypotetickou šestiletou energetickou krizi od roku 2029, která zvýší ceny fosilních paliv i elektřiny ze sítě.">Energetická krize</button>
        <button type="button" class="seg-btn" data-scenario="NZ" data-desc="Odráží vyšší tempo adopce nízkoemisních zdrojů a průměrnou cenu emisní povolenky ve výši 200 €.">Net-zero</button>
      </div>
    </div>

    <div class="control-group control-group--seg">
      <span class="control-label">Výše investičních nákladů</span>
      <div class="seg" id="capex-level-seg">
        <button type="button" class="seg-btn" data-capex="-1" data-desc="Nízkoemisní opatření je relativně levnější, zatímco emisně náročnější varianta je relativně dražší než ve středním scénáři.">Optimistická</button>
        <button type="button" class="seg-btn is-active" data-capex="0" data-desc="Námi stanovená průměrná cena nízkoemisního opatření i emisně náročnější varianty.">Střední</button>
        <button type="button" class="seg-btn" data-capex="1" data-desc="Nízkoemisní opatření je relativně dražší, zatímco emisně náročnější varianta je relativně levnější než ve středním scénáři.">Pesimistická</button>
      </div>
    </div>

    <div class="control-group" id="carbon-group">
      <div class="control-head">
        <span class="control-label">Cena uhlíku (ETS&nbsp;2)</span>
        <span class="control-value" id="carbon-price-value">70&thinsp;€/t&nbsp;CO₂</span>
      </div>
      <div class="carbon-lock" id="carbon-lock">Cena uhlíku má ve scénáři net-zero předem stanovenou trajektorii v průměrné výši 200 €.</div>
      <div class="slider-with-ticks">
        <input type="range" id="carbon-price-slider" min="0" max="200" step="10" value="70">
        <div class="tick-labels">
          <!-- left = calc(val/200 * (100% - 16px) + 8px) -->
          <span class="tick-label" style="left:8px">
            <span class="tick-mark"></span>
            <span class="tick-text">0 €</span>
          </span>
          <span class="tick-label" style="left:calc(35% + 2.4px)">
            <span class="tick-mark"></span>
            <span class="tick-text">70 €</span>
          </span>
          <span class="tick-label" style="left:calc(100% - 8px)">
            <span class="tick-mark"></span>
            <span class="tick-text">200 €</span>
          </span>
        </div>
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
    <div class="wide-figure-mobile">
      <div id="summary-chart" class="measure-chart"></div>
    </div>
  </div>
</div>

<div class="section">
<div class="container" markdown="1">

# Budovy

{% for name in building_measure_names %}
{% case name %}{% when "Tepelné čerpadlo" %}{% assign micon = "tepelne-cerpadlo" %}{% when "Renovace se zateplením" %}{% assign micon = "zatepleni" %}{% when "Střešní fotovoltaika + baterie" %}{% assign micon = "fotovoltaika" %}{% when "Kotel na dřevo" %}{% assign micon = "biomasa-kotel" %}{% when "Elektrický kotel" %}{% assign micon = "elektrokotel" %}{% else %}{% assign micon = "" %}{% endcase %}
## <img class="measure-icon" src="/assets-local/figures/2026-analyza-opatreni-domacnosti/{{ micon }}.svg" alt=""> {{ name }} {#m-{{ forloop.index }}}
{% if name == "Renovace se zateplením" %}
<p class="measure-takeaway">Ekonomicky se vyplatí především zateplení energeticky náročných rodinných domů, a to i ve scénářích s nízkou cenou uhlíku. Snížení emisí CO₂ po zateplení je nejvyšší u domů vytápěných uhlím, protože mají vysokou emisní náročnost.</p>
{% elsif name == "Tepelné čerpadlo" %}
<p class="measure-takeaway">Ekonomická výhodnost závisí na ceně uhlíku – bez jeho zpoplatnění se tepelné čerpadlo mírně nevyplatí, ale při ceně 70&thinsp;€/t CO₂ se vyplatí napříč všemi typy budov. K největší úspoře emisí dochází u domů, které využívají k vytápění uhlí. Naopak úsporu dovážených fosilních paliv přináší náhrada plynových kotlů (uhlí je totiž z velké části lokální).</p>
{% elsif name == "Kotel na dřevo" %}
<p class="measure-takeaway">Ekonomicky se vyplatí především v případě levného zdroje dřeva, což však bývá vyváženo nároky na jeho přípravu a skladování. Ačkoliv je dřevo obecně považováno za uhlíkově neutrální zdroj, v realitě je jeho nízká emisní stopa sporná. Spalování dřeva navíc způsobuje lokální znečištění ovzduší.</p>
{% elsif name == "Elektrický kotel" %}
<p class="measure-takeaway">Elektrický kotel se vyplatí pouze v budovách s velmi nízkou spotřebou energie. V případě využívání elektřiny ze sítě ve srovnání s plynovým kotlem nepřináší úsporu emisí – český elektrický mix má vyšší emisní intenzitu než samotný zemní plyn.</p>
{% elsif name == "Střešní fotovoltaika + baterie" %}
<p class="measure-takeaway">Ekonomická výhodnost roste s vyšší spotřebou elektřiny v domě. Při nízké nebo střední spotřebě (4–7&thinsp;MWh ročně) se investice bez dotací nemusí vrátit. Fotovoltaika se tak více vyplatí v domácnostech, které spotřebují větší množství elektřiny – na ohřev teplé vody, provoz tepelného čerpadla, dobíjení elektromobilu apod.</p>
{% endif %}
<div class="wide-figure-mobile">
  <div class="measure-chart" data-section="buildings" data-measure="{{ name | escape }}"></div>
</div>
{% endfor %}

# Doprava

## <img class="measure-icon" src="/assets-local/figures/2026-analyza-opatreni-domacnosti/elektroauto-male.svg" alt=""> Elektromobily {#m-nove}

<p class="measure-takeaway">Elektromobily jsou již v Česku často ekonomicky výhodnější oproti srovnatelným autům se spalovacím motorem, uvažujeme-li celkové náklady za vlastnictví a provoz aut po dobu jejich životnosti. Ekonomická výhodnost závisí na způsobu nabíjení – vyplatí se především při levném domácím nabíjení a také vysoké ceně pohonných hmot.</p>

<div class="wide-figure-mobile">
  <div class="measure-chart" data-section="transport" data-group=""></div>
</div>

<p class="measure-takeaway">Cena elektřiny pro elektromobily odpovídá scénáři, kdy se vozidlo nabíjí ze 70 % doma ze sítě, z 20 % na pomalé AC nabíječce a z 10 % na rychlé DC nabíječce.</p>

</div>
</div>

<div class="section">
<div class="container">
<div class="row">
<div class="col-lg-8 longread" markdown="1">

{% include preview-box.html
    title="Související studie"
    text="Podrobné výsledky z tohoto interaktivního přehledu najdete ve studii."
    slug="2026-analyza-opatreni-domacnosti"
%}

## Vstupní data a scénáře cen energií

Kompletní sadu vstupních parametrů použitou pro analýzu opatření naleznete v našem [datasetu](https://docs.google.com/spreadsheets/d/1B5GQVkr3jh0dDXflDDjGOmC_nnb_bFX-OwR4t94pfNM/edit?usp=sharing).

Dataset obsahuje i námi definované tři scénáře vývoje cen paliv a elektřiny včetně emisní intenzity a ceny emisní povolenky (v případě net-zero scénáře).

</div>
</div>

{% capture scenare-cen-energii %}
<div id="scenare-cen-energii"></div>
{% endcapture %}

{% include expander-figure.html
    name="scenare-cen-energii"
    label="Scénáře vývoje cen energií"
    class="large-expander-title"
    content=scenare-cen-energii
%}

</div>
</div>
