---
layout:        survey
type:          "Interaktivní přehled"
title:         "Dovoz fosilních paliv do ČR"
slug:          dashboard-dovoz-fosilnich-paliv
redirect_from:
  - /dashboard-dovoz-fosilnich-paliv
  - /dovoz-fosilnich-paliv
weight:        210
published:     2026-04-01
tags-scopes:   [ cesko ]
tags-topics:   [ energetika, ekonomika ]
caption:       "Kolik Česká republika platí za dovoz ropy a zemního plynu a odkud je dováží?"
intro: |
    Tento přehled ukazuje vývoj dovozu fosilních paliv do České republiky v letech 2017–2025.
    Zaměřuje se na ropu a zemní plyn — jejich objem, cenu a původ.
extra-scripts: [ /assets-local/js/dashboard-dovoz-fosilnich-paliv.js ]
---
<div id="last-updated" class="small">
Poslední aktualizace dat: {{ site.data["dashboard-dovoz-fosilnich-paliv"].timestamp | date: "%-d. %-m. %Y" }}
</div>

<script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>
<script src="/assets-local/charts/fok-theme.js"></script>
<script src="/assets-local/charts/fok-utils.js"></script>
<script src="/assets-local/charts/fok-chart-line.js"></script>
<script src="/assets-local/charts/fok-chart-bar.js"></script>
<script src="/assets-local/charts/fok-chart-bar-stacked.js"></script>
<script src="/assets-local/charts/fok-chart-area-stacked.js"></script>
<script>
  window.DASHBOARD_DOVOZ = {
    highlights: {{ site.data["dashboard-dovoz-fosilnich-paliv"].highlights | jsonify }},
    payments:   {{ site.data["dashboard-dovoz-fosilnich-paliv"].payments   | jsonify }},
    plyn:       {{ site.data["dashboard-dovoz-fosilnich-paliv"].plyn       | jsonify }},
    ropa:       {{ site.data["dashboard-dovoz-fosilnich-paliv"].ropa       | jsonify }},
  };
</script>

<div id="dovoz-header">
  <p class="small">Rok <span id="dovoz-year"></span></p>
  <div class="dovoz-kpis">
    <div class="kpi">
      <span class="kpi-value" id="kpi-total"></span>
      <span class="kpi-label">celkové výdaje</span>
    </div>
    <div class="kpi">
      <span class="kpi-value" id="kpi-gdp"></span>
      <span class="kpi-label">podíl HDP</span>
    </div>
    <div class="kpi">
      <span class="kpi-value" id="kpi-energy"></span>
      <span class="kpi-label">celkové prim. energie</span>
    </div>
  </div>
</div>

<h2>Celkové výdaje za ropa a plyn</h2>

<div class="row">
  <div class="col-md-6">
    <div id="chart-celkem-czk"></div>
  </div>
  <div class="col-md-6">
    <div id="chart-celkem-hdp"></div>
  </div>
</div>

<div class="row mt-5">

  <div class="col-md-6">
    <h2>Ropa</h2>
    <div class="row">
      <div class="col-6">
        <div id="chart-ropa-czk"></div>
      </div>
      <div class="col-6">
        <div id="chart-ropa-kg"></div>
      </div>
    </div>
    <div id="chart-ropa-zeme"></div>
  </div>

  <div class="col-md-6">
    <h2>Zemní plyn</h2>
    <div class="row">
      <div class="col-6">
        <div id="chart-plyn-czk"></div>
      </div>
      <div class="col-6">
        <div id="chart-plyn-kg"></div>
      </div>
    </div>
    <div id="chart-plyn-zeme"></div>
  </div>

</div>
