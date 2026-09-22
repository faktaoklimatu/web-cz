---
layout:        empty
type:          "Interaktivní přehled"
title:         "Emise a povolenky zdarma v EU ETS"
slug:          2026-interaktivni-prehled-ets
redirect_from:
- /2026-interaktivni-prehled-ets
published:     2026-08-04
caption:       "Jak velkou část emisí v EU ETS pokrývají povolenky zdarma?"
intro: |
    Tento přehled ukazuje bilanci emisí skleníkových plynů a povolenek zdarma energetických a průmyslových podniků v Česku. Zatímco v sektoru elektřiny a tepla povolenky zdarma po roce 2012 klesají, průmysl jimi stále pokryje většinu svých emisí.
extra-scripts:
- https://d3js.org/d3.v7.min.js
- /assets-local/js/ets-dashboard.js
preview_type: "Interaktivní přehled"
include_in_search: true
---

<script>
  window.ETS_DASHBOARD = {{ site.data["ets-dashboard"] | jsonify }};
</script>

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400..700&display=swap" rel="stylesheet">

<style>
/* ── Chart look tokens ─────────────────────────────────────────────────────
   Mirror of the CFG block in assets-local/js/ets-dashboard.js — the SVG
   charts read CFG, these swatches/sizes read the variables. Keep both in
   sync.                                                                    */
:root {
  --ets-emissions: #1b4c6f;
  --ets-uncovered: #8ba1b1;
  --ets-alloc: #fffafa;           /* hatch background */
  --ets-hatch: #ff9c66;           /* hatch stripes */
  --ets-line: #000000;
  --ets-chart-height: 340px;      /* sankey + fallback */
  --ets-timeline-height: 350px;   /* chart 1; chart 2's height is derived in JS */
  --ets-title-size-1: 24px;       /* chart 1 heading */
  --ets-title-size-2: 24px;       /* chart 2 heading */
  --ets-legend-size: 14px;        /* legend text, both charts */
  --ets-box-border: 1px;          /* chart panel outline; 0 = none */
  --ets-kpi-label-size: 13px;     /* KPI cards */
  --ets-kpi-tracking: 0.25px;
  --ets-kpi-value-size: 24px;   /* matches --ets-title-size-1 */
  --ets-kpi-pad-y: 18px;
  --ets-kpi-pad-x: 18px;
  --ets-kpi-gap: 12px;
  --ets-kpi-border: 1px;
  --ets-legend-gap: 25px;         /* space under the legend row, both charts */
  --ets-legend-gap-top: 0px;      /* space above it */
  --ets-summary-pad-t: 14px;      /* filter-summary line, both charts */
  --ets-summary-pad-b: 0px;
}

/* ── Title / perex ─────────────────────────────────────────────────────────── */
#secondary-navbar {
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Arial, sans-serif;
}

/* ── Controls bar ──────────────────────────────────────────────────────────── */
/* Sticky behaviour, z-index, shadow and background are handled by the site's
   #secondary-navbar / .secondary-navbar-stuck styles in _core_design.scss.    */
.controls-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 28px;
  align-items: flex-start;
  padding-top: 12px;
  padding-bottom: 12px;
}
.control-group {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 220px;
}
.control-group.control-group--years { min-width: 200px; max-width: 260px; flex: 1 1 0; }
.control-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}
.control-label {
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #515b66;
  white-space: nowrap;
}
.control-value {
  font-size: 0.85rem;
  font-weight: 700;
  color: #515b66;
}
/* The two years are editable. They read as plain text until pointed at, so
   the control still looks like a caption rather than a form. */
.year-input {
  width: 3.6em; padding: 0 2px;
  border: 1px solid transparent; border-radius: 3px; background: none;
  font: inherit; color: inherit; text-align: center;
  -moz-appearance: textfield;
}
.year-input::-webkit-outer-spin-button,
.year-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.year-input:hover { border-color: #ced4da; }
.year-input:focus { border-color: #5b7c99; background: #fff; outline: none; }

/* ── Multi-select dropdowns (activity / installation) ─────────────────────── */
.ms-dropdown { position: relative; }
.ms-toggle {
  width: 100%;
  text-align: left;
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5'%3E%3Cpath fill='%23515b66' d='M0 0h8L4 5z'/%3E%3C/svg%3E") no-repeat right 12px center;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 6px 28px 6px 12px;
  font-size: 0.9rem;
  color: #2d3748;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ms-toggle:focus { outline: 2px solid #5b7c99; outline-offset: 1px; }
.ms-panel {
  display: none;
  position: absolute;
  z-index: 20;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: #fff;
  border: 1px solid #ced4da;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  padding: 6px 0;
}
.ms-panel.open { display: block; }
.ms-search { margin: 0 10px 6px; width: calc(100% - 20px); }
.ms-actions {
  display: flex; justify-content: space-between;
  padding: 0 10px 6px; margin-bottom: 4px;
  border-bottom: 1px solid #f0f2f4;
}
.ms-actions button {
  background: none; border: none; padding: 0;
  font-size: 0.75rem; color: #5b7c99; cursor: pointer;
}
.ms-actions button:hover { text-decoration: underline; }
.ms-option {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 12px; cursor: pointer; font-size: 0.85rem;
}
.ms-option:hover { background: #f0f3f5; }
.ms-option input[type="checkbox"] { cursor: pointer; flex-shrink: 0; accent-color: #5b7c99; }
.ms-option-name {
  flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  /* !important: the site's span[title] rule (higher specificity) would otherwise win */
  text-decoration: none !important;
}
.ms-option--nested { padding-left: 28px; }
/* A group header is itself a clickable option — its checkbox selects the whole
   site — so it reads like one, inheriting .ms-option's type. The rule above it
   and its children's indent carry the grouping; a shrunken uppercase caption
   made a live control look like a disabled label, and uppercased "Mt" to "MT". */
.ms-group-label {
  margin-top: 4px;
  padding-top: 10px;
  border-top: 1px solid #f0f2f4;
}
/* Only the option list scrolls. The search box and the select-all actions sit
   outside it, so they stay put at the top of the panel instead of scrolling
   out of reach — no sticky positioning needed. The vh cap keeps the panel from
   growing taller than a short window. */
.ms-options { max-height: min(420px, 60vh); overflow-y: auto; }
.ms-options > .ms-group-label:first-child { border-top: none; margin-top: 0; }
.ms-empty { padding: 10px 12px; font-size: 0.85rem; color: #a0aec0; }

@media (max-width: 640px) {
  /* No sticky filter bar on a phone: it eats a third of the viewport, and the
     charts are what the reader came for. Overrides web-core's sticky rule and
     the .secondary-navbar-stuck shadow its navbar.js toggles in — the inline
     `top` that script sets stops applying once the element is static. */
  #secondary-navbar { position: static; margin-top: 0; }
  #secondary-navbar.secondary-navbar-stuck { box-shadow: none; background-color: #fff; }

  /* Label beside its selector rather than above it — three stacked pairs cost
     far more vertical space than a phone screen can spare. */
  .control-group {
    flex-basis: 100%; min-width: 0;
    flex-direction: row; align-items: center; gap: 10px;
  }
  .control-group > .control-label {
    flex: 0 0 88px;        /* one column, so the selectors line up */
    white-space: normal;   /* lets "Současný vlastník" take two lines */
  }
  .control-group > .ms-dropdown { flex: 1 1 auto; min-width: 0; }
  /* Období keeps its stacked head + track, and takes the full width. */
  .control-group.control-group--years {
    flex-direction: column; align-items: stretch;
    max-width: none; gap: 0;
  }
}

/* ── Year dual-range slider ───────────────────────────────────────────────── */
.dual-range { position: relative; height: 26px; display: flex; align-items: center; margin-top: 6px; }
.range-track-bg { position: absolute; left: 0; right: 0; height: 4px; background: #dde3e8; border-radius: 2px; }
.range-fill { position: absolute; height: 4px; background: #515b66; border-radius: 2px; pointer-events: none; }
.dual-range input[type="range"] {
  position: absolute; width: 100%; margin: 0;
  background: none; pointer-events: none;
  -webkit-appearance: none; appearance: none; outline: none;
}
.dual-range input[type="range"]::-webkit-slider-thumb {
  pointer-events: all; -webkit-appearance: none; appearance: none;
  width: 16px; height: 16px; border-radius: 50%;
  background: #fff; cursor: pointer;
  border: 2px solid #515b66; box-shadow: 0 1px 4px rgba(0,0,0,0.25);
}
.dual-range input[type="range"]::-moz-range-thumb {
  pointer-events: all; width: 14px; height: 14px; border-radius: 50%;
  background: #fff; cursor: pointer; border: 2px solid #515b66; box-shadow: 0 1px 4px rgba(0,0,0,0.25);
}
.range-ticks { position: absolute; left: 0; right: 0; top: 0; bottom: 0; pointer-events: none; }
.range-tick { position: absolute; top: 15px; width: 1px; height: 8px; background: #ced4da; }
.phase-annotations { position: relative; height: 14px; margin-top: 2px; }
.phase-annotation {
  position: absolute; top: 0;
  font-size: 10.5px; font-weight: 500; color: #a0aec0; white-space: nowrap;
}
.phase-annotation--left { left: 0; }
.phase-annotation--center { transform: translateX(-50%); }
.phase-annotation--right { right: 0; }

/* ── KPI cards ─────────────────────────────────────────────────────────────── */
#ets-kpi-row { display: flex; flex-wrap: wrap; gap: var(--ets-kpi-gap); margin: 0 0 16px; }
.kpi-card {
  flex: 1; min-width: 180px;
  color: #515b66;
  padding: var(--ets-kpi-pad-y) var(--ets-kpi-pad-x);
  border: var(--ets-kpi-border) solid #e2e8f0;
  border-radius: 8px;
}
.kpi-label {
  font-size: var(--ets-kpi-label-size); font-weight: 600;
  text-transform: uppercase; letter-spacing: var(--ets-kpi-tracking);
  color: inherit; margin-bottom: 0;
}
.kpi-value { font-size: var(--ets-kpi-value-size); font-weight: 700; color: inherit; }
/* Midway between --ets-emissions (#1b4c6f) and --ets-uncovered (#8ba1b1),
   the two tones the emissions bar is drawn in. */
.kpi-card.emissions { color: #537690; }
.kpi-card.allocation { color: #2d3748; }

/* ── Chart panels ──────────────────────────────────────────────────────────── */
.chart-panel {
  background: #fff; border-radius: 8px;
  border: var(--ets-box-border) solid #e2e8f0; padding: 16px 18px;
  margin-bottom: 16px;
}
/* Everything drawn inside a chart panel — SVG text, legend, panel title —
   plus the tooltip the charts render and the KPI row, which sits outside the
   panels. SVG <text> has no font-family of its own, so it inherits this. */
.chart-panel, #tooltip, #ets-kpi-row {
  font-family: 'Roboto', system-ui, -apple-system, Segoe UI, Arial, sans-serif;
}
.chart-panel h2 { font-size: 17px; font-weight: 700; color: #2d3748; margin: 0; }
/* Heads the whole first panel (title, filters, KPIs, chart), so it overrides
   the 17px panel-heading rule above and keeps a gap under itself. */
.chart-panel > #ets-timeline-title {
  font-size: var(--ets-title-size-1);
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 10px;
}
.chart-panel > #ets-timeline-title .title-period { font-weight: 400; }
#ets-activity-title { font-size: var(--ets-title-size-2); margin: 0 0 10px; }
.filter-summary {
  font-size: 14px; font-weight: 400; color: #718096; margin-bottom: 0;
  padding: var(--ets-summary-pad-t) 0 var(--ets-summary-pad-b);
}
.chart-panel svg { width: 100%; height: var(--ets-chart-height); display: block; }
#ets-svg-timeline { height: var(--ets-timeline-height); }
/* The heading takes a full row of its own (flex-basis 100% forces the wrap),
   so it has the whole chart width for a long generated title. The legend and
   chart 2's grouping switch then share the row underneath it. */
.panel-header { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 16px; margin-bottom: var(--ets-legend-gap); }
.panel-title-group { flex: 0 0 100%; }
.legend { display: flex; flex-wrap: wrap; gap: 6px 14px; margin-top: var(--ets-legend-gap-top); min-width: 0; }
.legend-item { display: flex; align-items: center; gap: 5px; font-size: var(--ets-legend-size); font-weight: 500; white-space: nowrap; }
/* Square, not a wide bar, and each label carries its own swatch colour. */
.legend-swatch {
  width: 12px; height: 12px; border-radius: 0; flex-shrink: 0;
  box-sizing: border-box; overflow: hidden; line-height: 0;
}
/* The allocation is drawn as a marker line in both charts, so its swatch is a
   line too, not a filled square like the area series. */
.legend-item.li-line .legend-swatch { width: 14px; height: 3px; }
.legend-item.li-emissions { color: var(--ets-emissions); }
.legend-item.li-uncovered { color: var(--ets-uncovered); }
.legend-item.li-line      { color: var(--ets-line); }
.legend-item.li-hatch     { color: var(--ets-hatch); }
.legend-item.li-emissions .legend-swatch { background: var(--ets-emissions); }
.legend-item.li-uncovered .legend-swatch { background: var(--ets-uncovered); }
.legend-item.li-line      .legend-swatch { background: var(--ets-line); }
/* Filled by renderLegendSwatches() with the chart's own SVG hatch pattern;
   the background is only what shows before that runs. */
.legend-swatch.hatch-light { background: var(--ets-alloc); border: 1px solid #cbd5e0; }

#tooltip {
  position: fixed; background: #1a202c; color: #e2e8f0;
  padding: 8px 12px; border-radius: 6px; font-size: 11px;
  pointer-events: none; display: none; z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4); line-height: 1.7; max-width: 240px;
}

.ets-sankey-indent { margin-left: 2rem; margin-top: -0.5rem; }
.ets-sankey-toggle .expander-title { font-size: 0.85rem; }
</style>

<div class="section pb-3">
  <div class="container between-navbars">
    <h1>{{ page.title }}</h1>
    <div class="page-type">{{ page.type }}</div>
    {% include tags.html tags=page.tags slug=page.slug link="true" %}
    <div class="perex narrow-text">{{ page.intro | markdownify }}</div>
  </div>
</div>

<div id="secondary-navbar" class="section">
  <div class="container controls-inner">

  <div class="control-group">
    <span class="control-label">Odvětví</span>
    <div class="ms-dropdown" id="ets-real-activity-ms">
      <button type="button" class="ms-toggle" id="ets-real-activity-toggle">Všechna odvětví</button>
      <div class="ms-panel" id="ets-real-activity-panel">
        <div class="ms-actions">
          <button type="button" data-action="all">Vybrat vše</button>
          <button type="button" data-action="none">Zrušit výběr</button>
        </div>
        <div class="ms-options" id="ets-real-activity-options"></div>
      </div>
    </div>
  </div>

  <div class="control-group">
    <span class="control-label">Současný vlastník</span>
    <div class="ms-dropdown" id="ets-company-ms">
      <button type="button" class="ms-toggle" id="ets-company-toggle">Všichni vlastníci</button>
      <div class="ms-panel" id="ets-company-panel">
        <input type="text" class="form-control ms-search" id="ets-company-search" placeholder="Hledat vlastníka…">
        <div class="ms-actions">
          <button type="button" data-action="all">Vybrat vše</button>
          <button type="button" data-action="none">Zrušit výběr</button>
        </div>
        <div class="ms-options" id="ets-company-options"></div>
      </div>
    </div>
  </div>

  <div class="control-group">
    <span class="control-label">Zařízení</span>
    <div class="ms-dropdown" id="ets-installation-ms">
      <button type="button" class="ms-toggle" id="ets-installation-toggle">Všechna zařízení</button>
      <div class="ms-panel" id="ets-installation-panel">
        <input type="text" class="form-control ms-search" id="ets-installation-search" placeholder="Hledat zařízení…">
        <div class="ms-actions">
          <button type="button" data-action="all">Vybrat vše</button>
          <button type="button" data-action="none">Zrušit výběr</button>
        </div>
        <div class="ms-options" id="ets-installation-options"></div>
      </div>
    </div>
  </div>

  <div class="control-group control-group--years">
    <div class="control-head">
      <span class="control-label">Období</span>
      <span class="control-value"><input type="number" class="year-input" id="ets-year-from-val" step="1" inputmode="numeric" aria-label="Od roku">–<input type="number" class="year-input" id="ets-year-to-val" step="1" inputmode="numeric" aria-label="Do roku"></span>
    </div>
    <div class="dual-range">
      <div class="range-track-bg"></div>
      <div class="range-ticks" id="ets-year-phase-ticks"></div>
      <div class="range-fill" id="ets-year-fill"></div>
      <input type="range" id="ets-year-from" step="1">
      <input type="range" id="ets-year-to" step="1">
    </div>
    <div class="phase-annotations" id="ets-phase-annotations"></div>
  </div>

  </div>
</div>

<div class="section pt-4">
  <div class="container">

    <div id="ets-kpi-row">
      <div class="kpi-card emissions">
        <div class="kpi-label">Vyprodukované emise</div>
        <div class="kpi-value" id="ets-kpi-e">—</div>
      </div>
      <div class="kpi-card allocation">
        <div class="kpi-label">Povolenky alokované zdarma</div>
        <div class="kpi-value" id="ets-kpi-a">—</div>
      </div>
      <div class="kpi-card coverage">
        <div class="kpi-label">Pokrytí emisí povolenkami zdarma</div>
        <div class="kpi-value" id="ets-kpi-share">—</div>
      </div>
    </div>

    <div class="chart-panel">
      <h2 id="ets-timeline-title">Vývoj v čase</h2>

      <div class="panel-header">
        <div class="legend">
          <div class="legend-item li-emissions"><div class="legend-swatch"></div>Emise pokryté povolenkami zdarma</div>
          <div class="legend-item li-uncovered"><div class="legend-swatch"></div>Emise nepokryté povolenkami zdarma</div>
          <div class="legend-item li-line"><div class="legend-swatch"></div>Povolenky zdarma</div>
          <div class="legend-item li-hatch legend-surplus"><div class="legend-swatch hatch-light"></div>Povolenky zdarma alokované navíc</div>
        </div>
      </div>
      <svg id="ets-svg-timeline"></svg>

      <div class="filter-summary" id="ets-filter-summary"></div>
    </div>

    <div class="chart-panel">
      <div class="panel-header">
        <div class="panel-title-group">
          <h2 id="ets-activity-title">Kolik vybraných emisí pokryly povolenky zdarma podle odvětví?</h2>
        </div>
        <div class="legend">
          <div class="legend-item li-emissions"><div class="legend-swatch"></div>Emise pokryté povolenkami zdarma</div>
          <div class="legend-item li-uncovered"><div class="legend-swatch"></div>Emise nepokryté povolenkami zdarma</div>
          <div class="legend-item li-line"><div class="legend-swatch"></div>Povolenky zdarma</div>
          <div class="legend-item li-hatch legend-surplus"><div class="legend-swatch hatch-light"></div>Povolenky zdarma alokované navíc</div>
        </div>
      </div>
      <svg id="ets-svg-activity"></svg>

      <div class="filter-summary" id="ets-activity-filter-summary"></div>
    </div>

{% capture povolenky-zdarma %}
[Povolenky zdarma](https://climate.ec.europa.eu/areas-action/carbon-markets/eu-emissions-trading-system-eu-ets/free-allocation/about-free-allocation_en?prefLang=cs) v minulosti vycházely především ze dvou předpokladů:
* **Postupný náběh systému**, aby se zařízení měla čas přizpůsobit a nákup emisních povolenek pro ně nebyl bezprostředním navýšením nákladů. To však v prvních letech vedlo k výraznému přebytku povolenek zdarma nad skutečně vyprodukovanými emisemi. Některé ze zařízení tak nebyly kompenzovány pouze 1:1, ale naopak na bezplatných alokacích vydělaly (v grafech je tato nadměrná alokace zobrazená jako *Povolenky zdarma alokované navíc*).
* **Riziko úniku uhlíku** v energeticky náročných průmyslových sektorech (jejich aktuální seznam [zde](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=uriserv:OJ.L_.2019.120.01.0020.01.CES&toc=OJ:L:2019:120:FULL)), kde by mohlo dojít k tomu, že unijní podniky přesunou svou výrobů mimo EU do zemí s nižšími emisními standardy nebo dojde k upřednostňování konkurence z těchto zemí na úkor domácího průmyslu.

Zatímco výroba elektřiny (s výjimkami pro modernizaci sektoru) povolenky zdarma od roku 2013 nedostává (neexistuje zde riziko úniku uhlíku), teplárenství dostává pouze část (v současnosti až [30 %](https://mzp.gov.cz/system/files/2025-12/opok-MPkCNP-20251211.pdf)), průmysl kvůli riziku uhlíku stále dostává většinu. Povolenky zdarma by měl ve většině sektorů nahradit [mechanismus uhlíkového vyrovnání na hranicích](/explainery/cbam) (*Carbon Border Adjustment Mechanism*, CBAM).

**Jak konkrétně jsou povolenky zdarma pro průmysl rozdělovány?**
* Povolenky zdarma jsou alokovány na základě benchmarku emisní intenzity výroby daného produktu, který odpovídá průměru 10 % nejefektivnějších zařízení v daném sektoru v EU.
* Systém tak odměňuje ty nejefektivnější – ty, co se do benchmarku vejdou obdrží všechny povolenky zdarma. Instalace, které jsou pod benchmarkem naopak dostávají pouze část. Například pokud je benchmark 0,1 tuna CO<sub>2</sub> na tunu výroby a zařízení vyrábí 1000 tun s emisní intenzitou 0,15, dostane 100 povolenek zdarma a 50 musí nakoupit. Aby byla zařízení motivovaná dekarbonizovat, jsou benchmarky postupně zpřísňovány.
* V praxi to pak vypadá tak, že členský stát zašle v pětiletém cyklu podklady od jednotlivých zařízení (údaje o výrobě, riziko úniku uhlíku) Evropské komisi, která je musí schválit. Poté příslušný orgán (v Česku Ministerstvo životního prostředí) povolenky každý rok alokuje. Instalace musí každý rok MŽP reportovat svou výrobu, aby nedošlo k tomu, že dostanouv více povolenek, než potřebují. Detaily obsahuje metodika [na stránkách](https://mzp.gov.cz/cz/agenda/klima-a-energetika/emisni-obchodovani/bezplatna-alokace-2021-2030-eu-ets-1) MŽP.

Povolenky zdarma jsou na jedné straně velmi vítaným opatřením ze strany průmyslu, který má díky nim stran plateb za emise srovnatelné podmínky se zahraniční konkurencí a více prostoru na drahé investice do dekarbonizace. Na druhou stranu je otázkou, zda právě chybějící cenový signál není to, co (mimo jiné) transformaci průmyslu brzdí. Podle posledního návrhu Evropské komise by tak v budoucnu alokace povolenek zdarma měla být podmíněna vypracováním konkrétních investičních plánů do dekarbonizace výroby podniku nebo již zrealizovanými dekarbonizačními opatřeními.

Kromě povolenek zdarma navíc také některé průmyslové podniky dostávají tzv. **kompenzaci nepřímých nákladů**, tedy náhradu zvýšených základů za elektřinu v důsledku ETS. Informace o vyplacených kompenzacích lze nalézt na [webu](https://mpo.gov.cz/cz/prumysl/prumysl-a-zivotni-prostredi/kompenzace-neprimych-nakladu/) Ministerstva průmyslu a obchodu (např. přehled za rok 2024 [zde](https://mpo.gov.cz/cz/prumysl/prumysl-a-zivotni-prostredi/kompenzace-neprimych-nakladu/informace-o-vyplacenych-kompenzacich-neprimych-nakladu-za-kalendarni-rok-2024--291108/)).

{% endcapture %}

{% include expander-figure.html
    name="povolenky-zdarma"
    label="Jak fungují povolenky zdarma?"
    class="large-expander-title"
    content=povolenky-zdarma
%}

{% capture sankey-figure %}
<div class="chart-panel">
  <div class="panel-header">
    <div class="panel-title-group">
      <h2>Mapování hlavní ETS aktivity na skutečné odvětví</h2>
    </div>
  </div>
  <svg id="ets-svg-sankey"></svg>
</div>
{% endcapture %}

{% capture data %}

Data o alokacích povolenek zdarma a ověřených emisí pochází z [Unijního registru](https://union-registry-data.ec.europa.eu/report/welcome), konkrétně souboru [*Verified emissions 2025*](https://climate.ec.europa.eu/document/download/53018483-62b3-499e-9ab9-b4a831cc44f4_en?filename=verified_emissions_2025_en.xlsx).

Pro účely přehledu pracujeme pouze s daty pro Česko, přičemž jsme pro lepší srozumitelnost a analýzu přidali následující atributy:
* Odvětví zařízení – původní data obsahují data o hlavní aktivitě (odvětví), která ale v některých případech přesně neodpovídá skutečné aktivitě. Jde především o průmyslová zařízení zařazené do aktivity Výroba elektřiny a tepla (spalování paliv), kam se podnik dostal kvůli tomu, protože překročil práh tepelného příkonu (nad 20 MW) a nikoliv práh definovaný objemem výroby (např. stanovený objem denní produkce), ačkoliv reálně působí v konkrétním průmyslovém odvětví. Aby bylo možné lépe analyzovat, jaká je situace v jednotlivých odvětvích, přidali jsme na základě rešerše toto skutečné odvětví.

{% include expander-figure.html
    name="sankey-mapping"
    class="ets-sankey-indent"
    label="Mapování hlavní aktivity dle ETS na skutečné odvětví"
    label-class="ets-sankey-toggle"
    content=sankey-figure
%}

* Současný vlastník – k názvu zařízení (podniku) jsme na základě rešerše přidali současného vlastníka zařízení (historii vlastnictví pro zjednodušení nezahrnujeme). Ve většině případů jde o mateřskou společnost. V rozbalovacím seznamu jsme je následně seřadili podle množství emisí, které jejich podniky vyprodukují.

Tabulka se skutečnými odvětvími a současnými vlastníky je k dispozici k nahlédnutí [zde](https://docs.google.com/spreadsheets/d/1DX6MGLeiKXbGsPxHH9HwjuK7qOFl27XdsFu5CzDWH1Y/edit?usp=sharing), v případě nalezených nesrovnalostí nás prosím kontaktuje na info@faktaoklimatu.cz.

Zdrojový kód pro zpracování dat je k dispozici na GitHubu (DOPLNIT LINK).

{% endcapture %}

{% include expander-figure.html
    name="data"
    label="Data a metodologie"
    class="large-expander-title"
    content=data
%}

  </div>
</div>

<div id="tooltip"></div>
