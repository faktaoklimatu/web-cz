---
layout:        empty
type:          "Interaktivní přehled"
title:         "Dovoz ropy a zemního plynu do ČR"
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

    <div class="chart-row" id="main-charts">
      <div class="chart-panel">
        <div class="kpi">
          <div class="kpi-label">Výdaje za ropu a plyn</div>
          <div class="kpi-value" id="kpi-total"></div>
        </div>
        <div id="chart-celkem-czk"></div>
        <p class="kpi-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="chart-panel">
        <div class="kpi">
          <div class="kpi-label">Podíl na HDP Česka</div>
          <div class="kpi-value" id="kpi-gdp"></div>
        </div>
        <div id="chart-celkem-hdp"></div>
        <p class="kpi-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="chart-panel">
        <div class="kpi">
          <div class="kpi-label">Dovoz ropy a zemního plynu</div>
          <div class="kpi-value" id="kpi-energy"></div>
        </div>
        <div id="chart-celkem-energie"></div>
        <p class="kpi-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>

    <div class="fuel-box">
      <h2 class="fuel-heading">Ropa</h2>
      <div class="chart-row">
        <div class="fuel-chart"><div id="chart-ropa-czk"></div></div>
        <div class="fuel-chart v1-only">
          <div id="chart-ropa-energie"></div>
        </div>
        <div class="fuel-chart v2-only"><div id="chart-ropa-objem"></div></div>
        <div class="fuel-chart v2-only">
          <div id="chart-ropa-podil"></div>
        </div>
      </div>
    </div>

    <div class="fuel-box">
      <h2 class="fuel-heading">Zemní plyn</h2>
      <div class="chart-row">
        <div class="fuel-chart"><div id="chart-plyn-czk"></div></div>
        <div class="fuel-chart v1-only">
          <div id="chart-plyn-energie"></div>
          <p class="chart-note">Kategorie „Ostatní“ zahrnuje i dovoz, u něhož statistika zemi původu neuvádí — od roku 2023 jde převážně o zkapalněný plyn nakoupený na evropském trhu.</p>
        </div>
        <div class="fuel-chart v2-only"><div id="chart-plyn-objem"></div></div>
        <div class="fuel-chart v2-only">
          <div id="chart-plyn-podil"></div>
          <p class="chart-note">Kategorie „Ostatní“ zahrnuje i dovoz, u něhož statistika zemi původu neuvádí — od roku 2023 jde převážně o zkapalněný plyn nakoupený na evropském trhu.</p>
        </div>
      </div>
    </div>

  </div>
</div>

{% comment %} Jen pro prototyp: přepíná dvě rozvržení boxů s palivy. {% endcomment %}
<div class="variant-switch" role="group" aria-label="Varianta rozvržení">
  <button type="button" data-variant="1">Varianta 1</button>
  <button type="button" data-variant="2">Varianta 2</button>
</div>
