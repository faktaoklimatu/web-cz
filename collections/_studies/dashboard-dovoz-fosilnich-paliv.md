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
body-class:    dashboard-dovoz
extra-scripts: [ /assets-local/js/dashboard-dovoz-fosilnich-paliv.js ]
---

<script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>
<script src="/assets-local/charts/fok-theme.js"></script>
<script src="/assets-local/charts/fok-utils.js"></script>
<script src="/assets-local/charts/fok-chart-line.js"></script>
<script src="/assets-local/charts/fok-chart-bar.js"></script>
<script src="/assets-local/charts/fok-chart-bar-stacked.js"></script>
<script src="/assets-local/charts/fok-chart-area-stacked.js"></script>
<script>
  window.DASHBOARD_DOVOZ = {
    highlights:  {{ site.data["dashboard-dovoz-fosilnich-paliv"].highlights  | jsonify }},
    payments:    {{ site.data["dashboard-dovoz-fosilnich-paliv"].payments    | jsonify }},
    plyn:        {{ site.data["dashboard-dovoz-fosilnich-paliv"].plyn        | jsonify }},
    ropa:        {{ site.data["dashboard-dovoz-fosilnich-paliv"].ropa        | jsonify }},
    energy_mix:  {{ site.data["dashboard-dovoz-fosilnich-paliv"].energy_mix  | jsonify }},
  };
</script>

<div id="dovoz-header">
  <div class="kpi">
    <span class="kpi-label"><i class="fas fa-calendar-alt"></i> Rok 2025</span>
  </div>
</div>

<div class="row">
  <div class="col-md-4">
    <div class="kpi">
      <span class="kpi-label"><i class="fas fa-coins"></i> celkové výdaje</span>
      <span class="kpi-value" id="kpi-total"></span>
    </div>
    <div id="chart-celkem-czk"></div>
  </div>
  <div class="col-md-4">
    <div class="kpi">
      <span class="kpi-label"><i class="fas fa-chart-line"></i> podíl HDP</span>
      <span class="kpi-value" id="kpi-gdp"></span>
    </div>
    <div id="chart-celkem-hdp"></div>
  </div>
  <div class="col-md-4">
    <div class="kpi">
      <span class="kpi-label"><i class="fas fa-bolt"></i> podíl prim. energie</span>
      <span class="kpi-value" id="kpi-energy"></span>
    </div>
    <div id="chart-celkem-energie"></div>
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
