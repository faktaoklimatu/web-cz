---
layout:        empty
type:          "Interaktivní přehled"
title:         "Dovoz fosilních paliv do ČR"
slug:          2026-interaktivni-prehled-dovoz-fosilnich-paliv
body-class:    dovoz-fosilnich-paliv
redirect_from:
- /2026-interaktivni-prehled-dovoz-fosilnich-paliv
published:     2026-09-25
caption:       "Kolik Česko platí za dovoz ropy a zemního plynu a odkud je dováží?"
intro: |
    Tento přehled ukazuje vývoj dovozu fosilních paliv do České republiky v letech 2017–2025. Zaměřuje se na ropu a zemní plyn — jejich objem, cenu a původ.
preview_type: "Interaktivní přehled"
include_in_search: true
extra-scripts:
- /assets-local/js/dovoz-fosilnich-paliv.js
---

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400..700&display=swap" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>
<script src="/assets-local/charts/fok-theme.js"></script>
<script src="/assets-local/charts/fok-utils.js"></script>
<script src="/assets-local/charts/fok-chart-line.js"></script>
<script src="/assets-local/charts/fok-chart-bar.js"></script>
<script src="/assets-local/charts/fok-chart-bar-stacked.js"></script>
<script src="/assets-local/charts/fok-chart-area-stacked.js"></script>
<div class="section pb-3">
  <div class="container between-navbars">
    <h1>{{ page.title }}</h1>
    <div class="page-type">{{ page.type }}</div>
    <div class="perex narrow-text">{{ page.intro | markdownify }}</div>
  </div>
</div>

<div class="section pt-4">
  <div class="container">

    <div class="data-year"><i class="fa-regular fa-calendar"></i> <span id="data-year"></span></div>

    <div id="kpi-row">
      <div class="kpi-card">
        <div class="kpi-label">Celkové výdaje</div>
        <div class="kpi-value" id="kpi-total"></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Podíl HDP</div>
        <div class="kpi-value" id="kpi-gdp"></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Podíl prim. energie</div>
        <div class="kpi-value" id="kpi-energy"></div>
      </div>
    </div>

    <div class="chart-row">
      <div class="chart-panel"><div id="chart-celkem-czk"></div></div>
      <div class="chart-panel"><div id="chart-celkem-hdp"></div></div>
      <div class="chart-panel"><div id="chart-celkem-energie"></div></div>
    </div>

    <h2 class="fuel-heading">Ropa</h2>
    <div class="chart-row">
      <div class="chart-panel"><div id="chart-ropa-czk"></div></div>
      <div class="chart-panel"><div id="chart-ropa-kg"></div></div>
    </div>
    <div class="chart-panel"><div id="chart-ropa-zeme"></div></div>

    <h2 class="fuel-heading">Zemní plyn</h2>
    <div class="chart-row">
      <div class="chart-panel"><div id="chart-plyn-czk"></div></div>
      <div class="chart-panel"><div id="chart-plyn-kg"></div></div>
    </div>
    <div class="chart-panel">
      <div id="chart-plyn-zeme"></div>
      <p class="chart-note">Jako „neurčená země“ vykazuje statistika dovoz, u něhož není země původu uvedena — od roku 2023 jde převážně o zkapalněný plyn nakoupený na evropském trhu.</p>
    </div>

  </div>
</div>
