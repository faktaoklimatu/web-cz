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

<style>
/* ── Title / perex ─────────────────────────────────────────────────────────── */
#secondary-navbar {
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Arial, sans-serif;
}

/* ── Controls bar ──────────────────────────────────────────────────────────── */
/* Sticky behaviour, z-index, shadow and background are handled by the site's
   #secondary-navbar / .secondary-navbar-stuck styles in _core_design.scss.    */
.controls-inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
}
.controls-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 28px;
  align-items: flex-start;
}
.control-group {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 220px;
}
.control-group.control-group--years { min-width: 170px; max-width: 220px; flex: 0.8 1 0; }
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
  max-height: 340px;
  overflow-y: auto;
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
.ms-group-label {
  padding: 8px 12px 4px;
  margin-top: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #a0aec0;
  border-top: 1px solid #f0f2f4;
}
.ms-options > .ms-group-label:first-child { border-top: none; margin-top: 0; }
.ms-empty { padding: 10px 12px; font-size: 0.85rem; color: #a0aec0; }

@media (max-width: 640px) {
  .control-group {
    flex-basis: 100%; min-width: 0;
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

/* ── KPI cards ─────────────────────────────────────────────────────────────── */
#ets-kpi-row { display: flex; flex-wrap: wrap; gap: 12px; margin: 24px 0; }
.kpi-card {
  flex: 1; min-width: 200px;
  background: #fff; border-radius: 8px;
  padding: 14px 18px; border: 1px solid #e2e8f0;
}
.kpi-label { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #718096; margin-bottom: 4px; }
.kpi-value { font-size: 24px; font-weight: 700; color: #2d3748; }
.kpi-sub { font-size: 13px; ; font-weight: 500; color: #718096; margin-top: 3px; }
.kpi-card.emissions .kpi-value { color: #506D87; }
.kpi-card.allocation .kpi-value { color: #7994AB; }

/* ── Chart panels ──────────────────────────────────────────────────────────── */
.chart-panel {
  background: #fff; border-radius: 8px;
  border: 1px solid #e2e8f0; padding: 16px 18px;
  margin-bottom: 16px;
}
.chart-panel h2 { font-size: 17px; font-weight: 700; color: #2d3748; margin: 0; }
.chart-sub { font-size: 15px; font-weight: 500; color: #718096; margin-top: 2px; margin-bottom: 10px; }
.chart-panel svg { width: 100%; height: 340px; display: block; }
.panel-header { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 8px; }
.panel-title-group { flex: 1; min-width: 200px; }
.legend { display: flex; gap: 14px; flex-shrink: 0; margin-top: 2px; }
.legend-item { display: flex; align-items: center; gap: 5px; font-size: 13px; ; font-weight: 500; color: #718096; white-space: nowrap; }
.legend-swatch { width: 14px; height: 3px; border-radius: 1px; }
.legend-swatch.sq { height: 10px; border-radius: 2px; }
.legend-swatch.hatch-light {
  background-color: #7994AB;
  background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.75) 0, rgba(255,255,255,0.75) 1.5px, transparent 1.5px, transparent 4px);
}
.legend-swatch.line-box {
  background-color: #7994AB;
  border-top: 3px solid #1a202c;
  box-sizing: border-box;
  height: 10px;
}

.view-toggle {
  display: inline-flex;
  border: 1px solid #ced4da;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  margin-top: 8px;
}
.view-toggle-btn {
  background: #fff;
  border: none;
  padding: 5px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  cursor: pointer;
  flex: 0 0 auto;
  text-align: center;
  white-space: nowrap;
}
.view-toggle-btn + .view-toggle-btn { border-left: 1px solid #ced4da; }
.view-toggle-btn.active { background: #5b7c99; color: #fff; }

#tooltip {
  position: fixed; background: #1a202c; color: #e2e8f0;
  padding: 8px 12px; border-radius: 6px; font-size: 11px;
  pointer-events: none; display: none; z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4); line-height: 1.7; max-width: 240px;
}
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

    <div class="controls-row controls-row--years">
      <div class="control-group control-group--years">
        <div class="control-head">
          <span class="control-label">Období</span>
          <span class="control-value"><span id="ets-year-from-val"></span>–<span id="ets-year-to-val"></span></span>
        </div>
        <div class="dual-range">
          <div class="range-track-bg"></div>
          <div class="range-fill" id="ets-year-fill"></div>
          <input type="range" id="ets-year-from" step="1">
          <input type="range" id="ets-year-to" step="1">
        </div>
      </div>
    </div>

    <div class="controls-row controls-row--filters">

      <div class="control-group">
        <span class="control-label">Hlavní odvětví (dle ETS)</span>
        <div class="ms-dropdown" id="ets-activity-ms">
          <button type="button" class="ms-toggle" id="ets-activity-toggle">Všechny aktivity</button>
          <div class="ms-panel" id="ets-activity-panel">
            <div class="ms-actions">
              <button type="button" data-action="all">Vybrat vše</button>
              <button type="button" data-action="none">Zrušit výběr</button>
            </div>
            <div class="ms-options" id="ets-activity-options"></div>
          </div>
        </div>
      </div>

      <div class="control-group">
        <span class="control-label">Skutečné odvětví</span>
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
        <span class="control-label">Instalace</span>
        <div class="ms-dropdown" id="ets-installation-ms">
          <button type="button" class="ms-toggle" id="ets-installation-toggle">Všechny instalace</button>
          <div class="ms-panel" id="ets-installation-panel">
            <input type="text" class="form-control ms-search" id="ets-installation-search" placeholder="Hledat instalaci…">
            <div class="ms-actions">
              <button type="button" data-action="all">Vybrat vše</button>
              <button type="button" data-action="none">Zrušit výběr</button>
            </div>
            <div class="ms-options" id="ets-installation-options"></div>
          </div>
        </div>
      </div>

    </div>

  </div>
</div>

<div class="section pt-4">
  <div class="container">

    <div id="ets-kpi-row">
      <div class="kpi-card emissions">
        <div class="kpi-label">Emise CO<sub>2</sub></div>
        <div class="kpi-value" id="ets-kpi-e">—</div>
      </div>
      <div class="kpi-card allocation">
        <div class="kpi-label">Povolenky zdarma</div>
        <div class="kpi-value" id="ets-kpi-a">—</div>
      </div>
      <div class="kpi-card" id="ets-kpi-d-card">
        <div class="kpi-label">Bilance (povolenky zdarma − emise)</div>
        <div class="kpi-value" id="ets-kpi-d">—</div>
      </div>
    </div>

    <div class="chart-panel">
      <div class="panel-header">
        <div class="panel-title-group">
          <h2 id="ets-timeline-title">Vývoj v čase</h2>
          <div class="chart-sub" id="ets-timeline-sub"></div>
        </div>
        <div class="legend">
          <div class="legend-item"><div class="legend-swatch sq" style="background:#506D87"></div>Emise</div>
          <div class="legend-item"><div class="legend-swatch sq line-box"></div>Bezplatné povolenky</div>
          <div class="legend-item"><div class="legend-swatch sq hatch-light"></div>Povolenky zdarma alokované navíc</div>
        </div>
      </div>
      <svg id="ets-svg-timeline"></svg>
    </div>

    <div class="chart-panel">
      <div class="panel-header">
        <div class="panel-title-group">
          <h2>Kolik emisí pokryly povolenky zdarma?</h2>
          <div class="view-toggle" id="ets-activity-groupby-toggle">
            <button type="button" class="view-toggle-btn active" data-groupby="act">Hlavní odvětví (dle ETS)</button>
            <button type="button" class="view-toggle-btn" data-groupby="ra">Skutečné odvětví</button>
          </div>
        </div>
        <div class="legend">
          <div class="legend-item"><div class="legend-swatch sq" style="background:#506D87"></div>Emise</div>
          <div class="legend-item"><div class="legend-swatch sq line-box"></div>Bezplatné povolenky</div>
          <div class="legend-item"><div class="legend-swatch sq hatch-light"></div>Povolenky zdarma alokované navíc</div>
        </div>
      </div>
      <svg id="ets-svg-activity"></svg>
    </div>

{% capture povolenky-zdarma %}
[Povolenky zdarma](https://climate.ec.europa.eu/areas-action/carbon-markets/eu-emissions-trading-system-eu-ets/free-allocation/about-free-allocation_en?prefLang=cs) v minulosti vycházely především ze dvou předpokladů:
* **Postupný náběh systému**, aby se podniky měly čas přizpůsobit a nákup emisních povolenek pro ně nebyl bezprostředním navýšením nákladů. To však v prvních letech vedlo k výraznému přebytku povolenek zdarma nad skutečně vyprodukovanými emisemi. Některé z podniků tak nebyly pouze kompenzovány 1:1, ale naopak na bezplatných alokacích vydělaly.
* **Riziko úniku uhlíku** v energeticky náročných průmyslových sektorech, kde by mohlo dojít k tomu, že unijní podniky přesunou svou výrobů mimo EU do zemí s nižšími emisními standardy nebo dojde k upřednostňování konkurence z těchto zemí na úkor domácího průmyslu.

Zatímco výroba elektřiny (s výjimkami pro modernizaci sektoru) povolenky zdarma od roku 2013 nedostává, teplárenství dostává pouze část (v současnosti až [30 %](https://mzp.gov.cz/system/files/2025-12/opok-MPkCNP-20251211.pdf)), průmysl kvůli riziku uhlíku stále dostává většinu. Povolenky zdarma by měl ve většině sektorů nahradit mechanismus uhlíkového vyrovnání na hranicích (*Carbon Border Adjustment Mechanism*, CBAM).

Povolenky zdarma jsou na jedné straně velmi vítaným opatřením ze strany průmyslu, který má díky nim stran plateb za emise srovnatelné podmínky se zahraniční konkurencí a více prostoru na drahé investice do dekarbonizace. Na druhou stranu je otázkou, zda právě chybějící cenový signál není to, co (mimo jiné) transformaci průmyslu brzdí. Podle posledního návrhu Evropské komise by tak v budoucnu alokace povolenek zdarma měla být podmíněna vypracováním konkrétních investičních plánů do dekarbonizace výroby podniku nebo již zrealizovanými dekarbonizačními opatřeními.

Kromě povolenek zdarma navíc také některé průmyslové podniky dostávají tzv. **kompenzaci nepřímých nákladů**, tedy náhradu zvýšených základů za elektřinu v důsledku ETS. Informace o vyplacených kompenzacích lze nalézt na [webu](https://mpo.gov.cz/cz/prumysl/prumysl-a-zivotni-prostredi/kompenzace-neprimych-nakladu/) Ministerstva průmyslu a obchodu (např. přehled za rok 2024 [zde](https://mpo.gov.cz/cz/prumysl/prumysl-a-zivotni-prostredi/kompenzace-neprimych-nakladu/informace-o-vyplacenych-kompenzacich-neprimych-nakladu-za-kalendarni-rok-2024--291108/)).

{% endcapture %}

{% include expander-figure.html
    name="povolenky-zdarma"
    label="Jak fungují povolenky zdarma?"
    class="large-expander-title"
    content=povolenky-zdarma
%}

{% capture data %}
Tady bude popsaný zdroj dat a transformace dat. S odkazem na GitHub.
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
