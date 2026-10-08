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
- /assets-local/js/chart-download.js
- /assets-local/js/dovoz-dev-sidebar.js
---

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400..700&display=swap" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js"></script>
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
      </div>
      <div class="chart-panel">
        <div class="kpi">
          <div class="kpi-label">Podíl na HDP Česka</div>
          <div class="kpi-value" id="kpi-gdp"></div>
        </div>
        <div id="chart-celkem-hdp"></div>
      </div>
      <div class="chart-panel">
        <div class="kpi">
          <div class="kpi-label">Dovoz ropy a zemního plynu</div>
          <div class="kpi-value" id="kpi-energy"></div>
        </div>
        <div id="chart-celkem-energie"></div>
      </div>
    </div>

    {% comment %} Dva sloupce, ropa a plyn, zarovnané po řádcích: každý má
    přesně třináct prvků, viz .fuel-columns v _dovoz-fosilnich-paliv.scss. {% endcomment %}
    <div class="fuel-columns">
      <div class="fuel-head">
        <h2 class="fuel-heading">Ropa</h2>
        <div class="seg-buttons seg-buttons--small" data-span-select role="group" aria-label="Které grafy ukázat">
          <button type="button" data-value="all" aria-pressed="true">Vše</button>
          <button type="button" data-value="long" aria-pressed="false">Dlouhodobě</button>
          <button type="button" data-value="recent" aria-pressed="false">Posledních 36 měsíců</button>
        </div>
      </div>
      <div class="fuel-figure" data-span="long">
        <div class="chart-head">
          <h3 class="chart-title">Výdaje za ropu</h3>
          <label class="chart-toggle"><input type="checkbox" data-toggle="yearSpendByCountry" autocomplete="off"> zvlášť po zemích</label>
        </div>
        <div class="fuel-plot" data-tiles="yearSpendByCountry">
          <div id="chart-ropa-czk" class="whole"></div>
          <div id="chart-ropa-czk-roky" class="mini-grid tiles"></div>
        </div>
      </div>
      <p class="fuel-copy" data-span="long">Za dovoz ropy Česko obvykle platí zhruba 75 až 95 miliard korun ročně. Výjimkou byl rok 2020, kdy během pandemie klesly ceny i dovezené množství, a rok 2022, kdy po ruské invazi na Ukrajinu výdaje vyskočily na 115 miliard. V roce 2025 to bylo 82 miliard.</p>
      <div class="fuel-figure" data-span="long">
        <div class="chart-head">
          <h3 class="chart-title">Dovoz ropy</h3>
          <div class="chart-toggles chart-toggles--sub">
            <label class="chart-toggle"><input type="checkbox" data-toggle="share" autocomplete="off"> 100 %</label>
            <label class="chart-toggle"><input type="checkbox" data-toggle="minis" autocomplete="off"> zvlášť po zemích</label>
            <label class="chart-toggle chart-toggle--sub"><input type="checkbox" data-toggle="minisRows" autocomplete="off"> pod sebou</label>
          </div>
        </div>
        <div class="fuel-plot" data-tiles="minis">
          <div id="chart-ropa-energie" class="whole"></div>
          <div id="chart-ropa-mini" class="mini-grid tiles"></div>
        </div>
      </div>
      <p class="fuel-copy" data-span="long">Dovezené množství ropy se drží kolem 300 PJ ročně, mění se ale její původ. Ještě v roce 2023 pocházelo z Ruska 58 % dovozu, v roce 2025 už jen 8 % — přes 90 % tvořila ropa z Ázerbájdžánu, Norska, Kazachstánu a Saúdské Arábie.</p>
      <div class="fuel-figure" data-span="long">
        <div class="chart-head">
          <h3 class="chart-title">Průměrná dovozní cena ropy</h3>
          <label class="chart-toggle"><input type="checkbox" data-toggle="priceByCountry" autocomplete="off"> podle zemí</label>
        </div>
        <div id="chart-ropa-cena"></div>
        <p class="chart-note">Průměrná dovozní cena je celní hodnota dovozu dělená jeho energetickým obsahem, ne burzovní cena. Země s dovozem pod 600 GWh za rok graf vynechává.</p>
        <p class="chart-note bench-only">Burzovní cena: Brent, resp. TTF — měsíční průměry podle Světové banky (Pink Sheet), přepočtené měsíčním kurzem ČNB.</p>
      </div>
      <p class="fuel-copy" data-span="long">Průměrná dovozní cena ropy vzrostla z 800 Kč/MWh v roce 2017 na 1 310 Kč/MWh v roce 2022, v roce 2025 to bylo 1 010 Kč/MWh. Do roku 2024 byla ruská ropa každý rok levnější než ázerbájdžánská — v letech 2022 a 2023 zhruba o třetinu a o čtvrtinu.</p>
      <div class="fuel-figure" data-span="recent">
        <div class="chart-head">
          <h3 class="chart-title">Výdaje za ropu za posledních 36 měsíců</h3>
          <label class="chart-toggle"><input type="checkbox" data-toggle="spendByCountry" autocomplete="off"> zvlášť po zemích</label>
        </div>
        <div class="fuel-plot" data-tiles="spendByCountry">
          <div id="chart-ropa-czk-mesice" class="whole"></div>
          <div id="chart-ropa-czk-tiles" class="mini-grid tiles"></div>
        </div>
      </div>
      <p class="fuel-copy" data-span="recent">Měsíčně jde za ropu v průměru necelých 8 miliard korun, částky ale silně kolísají: od necelých 4 do přes 12 miliard. Za posledních 36 měsíců šlo nejvíc peněz do Ázerbájdžánu (39 %), Ruska (24 %) a Kazachstánu (18 %).</p>
      <div class="fuel-figure" data-span="recent">
        <h3 class="chart-title">Dovoz ropy za posledních 36 měsíců</h3>
        <div id="chart-ropa-energie-mesice"></div>
      </div>
      <p class="fuel-copy" data-span="recent">Ruská ropa do Česka naposledy dorazila v dubnu 2025. Její místo zaplnila hlavně ropa z Norska a Saúdské Arábie, vedle dosavadních dodávek z Ázerbájdžánu a Kazachstánu.</p>
      <div class="fuel-figure" data-span="recent">
        <div class="chart-head">
          <h3 class="chart-title">Průměrná dovozní cena ropy za posledních 36 měsíců</h3>
          <label class="chart-toggle"><input type="checkbox" data-toggle="priceByCountry" autocomplete="off"> podle zemí</label>
        </div>
        <div id="chart-ropa-cena-mesice"></div>
        <p class="chart-note">Průměrná dovozní cena je celní hodnota dovozu dělená jeho energetickým obsahem, ne burzovní cena. Země s dovozem pod 50 GWh za měsíc graf vynechává.</p>
        <p class="chart-note bench-only">Burzovní cena: Brent, resp. TTF — měsíční průměry podle Světové banky (Pink Sheet), přepočtené měsíčním kurzem ČNB.</p>
      </div>
      <p class="fuel-copy" data-span="recent">V roce 2025 průměrná cena ropy postupně klesala až pod 870 Kč/MWh v prosinci. Na jaře 2026 prudce vzrostla — v červnu na 1 720 Kč/MWh, nejvíc za poslední tři roky.</p>

      <div class="fuel-head">
        <h2 class="fuel-heading">Zemní plyn</h2>
        <div class="seg-buttons seg-buttons--small" data-span-select role="group" aria-label="Které grafy ukázat">
          <button type="button" data-value="all" aria-pressed="true">Vše</button>
          <button type="button" data-value="long" aria-pressed="false">Dlouhodobě</button>
          <button type="button" data-value="recent" aria-pressed="false">Posledních 36 měsíců</button>
        </div>
      </div>
      <div class="fuel-figure" data-span="long">
        <div class="chart-head">
          <h3 class="chart-title">Výdaje za zemní plyn</h3>
          <label class="chart-toggle"><input type="checkbox" data-toggle="yearSpendByCountry" autocomplete="off"> zvlášť po zemích</label>
        </div>
        <div class="fuel-plot" data-tiles="yearSpendByCountry">
          <div id="chart-plyn-czk" class="whole"></div>
          <div id="chart-plyn-czk-roky" class="mini-grid tiles"></div>
        </div>
      </div>
      <p class="fuel-copy" data-span="long">Do roku 2020 Česko za dovoz zemního plynu platilo 26 až 52 miliard korun ročně. V roce 2022 výdaje vyskočily na 232 miliard — téměř trojnásobek roku 2021 — přestože se dovezené množství skoro nezměnilo. V roce 2025 to bylo 79 miliard.</p>
      <div class="fuel-figure" data-span="long">
        <div class="chart-head">
          <h3 class="chart-title">Dovoz zemního plynu</h3>
          <div class="chart-toggles chart-toggles--sub">
            <label class="chart-toggle"><input type="checkbox" data-toggle="share" autocomplete="off"> 100 %</label>
            <label class="chart-toggle"><input type="checkbox" data-toggle="minis" autocomplete="off"> zvlášť po zemích</label>
            <label class="chart-toggle chart-toggle--sub"><input type="checkbox" data-toggle="minisRows" autocomplete="off"> pod sebou</label>
          </div>
        </div>
        <div class="fuel-plot" data-tiles="minis">
          <div id="chart-plyn-energie" class="whole"></div>
          <div id="chart-plyn-mini" class="mini-grid tiles"></div>
        </div>
        <p class="chart-note">Kategorie „Ostatní“ zahrnuje i dovoz, u něhož statistika zemi původu neuvádí — od roku 2023 jde převážně o zkapalněný plyn nakoupený na evropském trhu.</p>
      </div>
      <p class="fuel-copy" data-span="long">Ještě v roce 2021 pocházelo z Ruska 97 % dovezeného plynu. Od roku 2023 převažuje plyn z Norska, v roce 2024 se ale ruský podíl vrátil na 30 %. V roce 2025 ruský plyn chybí úplně a 29 % dovozu tvoří plyn, u něhož statistika zemi původu neuvádí.</p>
      <div class="fuel-figure" data-span="long">
        <div class="chart-head">
          <h3 class="chart-title">Průměrná dovozní cena zemního plynu</h3>
          <label class="chart-toggle"><input type="checkbox" data-toggle="priceByCountry" autocomplete="off"> podle zemí</label>
        </div>
        <div id="chart-plyn-cena"></div>
        <p class="chart-note">Průměrná dovozní cena je celní hodnota dovozu dělená jeho energetickým obsahem, ne burzovní cena. Země s dovozem pod 600 GWh za rok graf vynechává.</p>
        <p class="chart-note bench-only">Burzovní cena: Brent, resp. TTF — měsíční průměry podle Světové banky (Pink Sheet), přepočtené měsíčním kurzem ČNB.</p>
      </div>
      <p class="fuel-copy" data-span="long">Plyn zdražoval mnohem prudčeji než ropa: z 310 Kč/MWh v roce 2020 na 2 580 Kč/MWh v roce 2022, tedy víc než osmkrát. Ceny plynu z různých zemí se přitom liší jen málo — v roce 2022 stál ruský i norský kolem 2 610 Kč/MWh. V roce 2025 to bylo průměrně 1 070 Kč/MWh.</p>
      <div class="fuel-figure" data-span="recent">
        <div class="chart-head">
          <h3 class="chart-title">Výdaje za zemní plyn za posledních 36 měsíců</h3>
          <label class="chart-toggle"><input type="checkbox" data-toggle="spendByCountry" autocomplete="off"> zvlášť po zemích</label>
        </div>
        <div class="fuel-plot" data-tiles="spendByCountry">
          <div id="chart-plyn-czk-mesice" class="whole"></div>
          <div id="chart-plyn-czk-tiles" class="mini-grid tiles"></div>
        </div>
      </div>
      <p class="fuel-copy" data-span="recent">Za plyn Česko měsíčně platí v průměru přes 6 miliard korun. Za posledních 36 měsíců šly dvě třetiny těchto peněz za plyn z Norska, 18 % za plyn bez uvedené země původu a 12 % do Ruska.</p>
      <div class="fuel-figure" data-span="recent">
        <h3 class="chart-title">Dovoz zemního plynu za posledních 36 měsíců</h3>
        <div id="chart-plyn-energie-mesice"></div>
      </div>
      <p class="fuel-copy" data-span="recent">Dovoz plynu se během roku mění víc než u ropy: nejvíc ho přichází od května do července, kdy se plní zásobníky. Ruský plyn statistika naposledy zachycuje v prosinci 2024.</p>
      <div class="fuel-figure" data-span="recent">
        <div class="chart-head">
          <h3 class="chart-title">Průměrná dovozní cena zemního plynu za posledních 36 měsíců</h3>
          <label class="chart-toggle"><input type="checkbox" data-toggle="priceByCountry" autocomplete="off"> podle zemí</label>
        </div>
        <div id="chart-plyn-cena-mesice"></div>
        <p class="chart-note">Průměrná dovozní cena je celní hodnota dovozu dělená jeho energetickým obsahem, ne burzovní cena. Země s dovozem pod 50 GWh za měsíc graf vynechává.</p>
        <p class="chart-note bench-only">Burzovní cena: Brent, resp. TTF — měsíční průměry podle Světové banky (Pink Sheet), přepočtené měsíčním kurzem ČNB.</p>
      </div>
      <p class="fuel-copy" data-span="recent">Za poslední tři roky se měsíční cena plynu držela zhruba mezi 920 a 1 360 Kč/MWh, daleko pod vrcholem roku 2022. Nejlevnější byl dovoz na konci roku 2025, od března 2026 je cena zase nad 1 150 Kč/MWh.</p>
    </div>

    {% comment %} Interaktivní graf: ovládání nastavuje TOOL v dovoz-fosilnich-paliv.js,
    stahování obstarává chart-download.js podle data-* atributů tlačítek. {% endcomment %}
    <div class="tool">
      <h2 class="fuel-heading">Prozkoumejte data</h2>
      <div class="tool-controls">
        <div class="control-group">
          <span class="control-label">Ukazatel</span>
          <div class="seg-buttons" data-control="metric" role="group" aria-label="Ukazatel">
            <button type="button" data-value="energy" aria-pressed="true">Dovoz</button>
            <button type="button" data-value="czk" aria-pressed="false">Výdaje</button>
            <button type="button" data-value="price" aria-pressed="false">Cena</button>
          </div>
          <label class="chart-toggle" data-when="price"><input type="checkbox" data-option="bench" autocomplete="off"> burzovní cena</label>
        </div>
        <div class="control-group">
          <span class="control-label">Palivo</span>
          <div class="seg-buttons" data-control="fuel" role="group" aria-label="Palivo">
            <button type="button" data-value="crude_oil" aria-pressed="false">Ropa</button>
            <button type="button" data-value="natural_gas" aria-pressed="false">Zemní plyn</button>
            <button type="button" data-value="both" aria-pressed="true">Obojí</button>
          </div>
        </div>
        <div class="control-group">
          <span class="control-label">Členění</span>
          <div class="seg-buttons" data-control="split" role="group" aria-label="Členění">
            <button type="button" data-value="total" aria-pressed="false">Celkem</button>
            <button type="button" data-value="country" aria-pressed="true">Podle zemí</button>
          </div>
          <label class="chart-toggle" data-when="byCountry"><input type="checkbox" data-option="tiles" autocomplete="off"> zvlášť po zemích</label>
        </div>
        <div class="control-group">
          <span class="control-label">Krok</span>
          <div class="seg-buttons" data-control="step" role="group" aria-label="Krok">
            <button type="button" data-value="years" aria-pressed="true">Roky</button>
            <button type="button" data-value="months" aria-pressed="false">Měsíce</button>
          </div>
        </div>
        <div class="control-group control-group--years">
          <div class="control-head">
            <span class="control-label">Období</span>
            <output class="control-value" id="tool-period"></output>
          </div>
          <span class="dual-range">
            <span class="range-fill"></span>
            <input type="range" id="tool-from" aria-label="Od roku">
            <input type="range" id="tool-to" aria-label="Do roku">
          </span>
        </div>
        <div class="control-group control-group--inline">
          <span class="control-label">Kontext</span>
          <label class="chart-toggle"><input type="checkbox" data-option="invasion" autocomplete="off"> ruská invaze na Ukrajinu</label>
          <label class="chart-toggle"><input type="checkbox" data-option="hormuz" autocomplete="off"> krize v Hormuzském průlivu</label>
        </div>
      </div>
      <div class="chart-panel tool-panel">
        <h3 class="chart-title" id="tool-title"></h3>
        <div class="fuel-plot" data-tiles="toolTiles">
          <div id="chart-tool" class="whole"></div>
          <div id="chart-tool-tiles" class="mini-grid tiles"></div>
        </div>
        <div class="filter-summary" id="tool-summary"></div>
        <div class="chart-foot">
          <span id="tool-source">Zdroj: ČSÚ, statistika zahraničního obchodu (dovoz podle země původu); energie přepočtena výhřevností</span>
          <span class="chart-downloads">Stáhnout:
            <button type="button" class="chart-download" data-format="png" data-svg="tool-svg" data-filename="dovoz-fosilnich-paliv.svg" data-title="#tool-title" data-subtitle="#tool-summary" data-source="#tool-source">PNG</button>,
            <button type="button" class="chart-download" data-svg="tool-svg" data-filename="dovoz-fosilnich-paliv.svg" data-title="#tool-title" data-subtitle="#tool-summary" data-source="#tool-source">SVG</button>
          </span>
        </div>
      </div>
    </div>

    {% comment %} Mapa tras ropy: ropovody a pásy podle dovozu, kreslí ji
    drawMap v dovoz-fosilnich-paliv.js. {% endcomment %}
    <div class="route-map">
      <h2 class="fuel-heading">Kudy ropa do Česka přichází</h2>
      <div class="tool-controls">
        <div class="control-group control-group--years">
          <div class="control-head">
            <span class="control-label">Rok</span>
            <output class="control-value" id="mapa-rok-value"></output>
          </div>
          <span class="dual-range">
            <span class="range-fill"></span>
            <input type="range" id="mapa-rok" aria-label="Rok">
          </span>
        </div>
        <div class="control-group">
          <span class="control-label">Po měsících</span>
          <div class="seg-buttons">
            <button type="button" id="mapa-play" aria-pressed="false">▶ Přehrát rok</button>
            <button type="button" id="mapa-play-all" aria-pressed="false">▶ 2012–2025</button>
          </div>
        </div>
        <div class="control-group">
          <span class="control-label">Výdaje</span>
          <label class="chart-toggle"><input type="checkbox" id="mapa-vydaje" autocomplete="off"> ukázat výdaje</label>
        </div>
      </div>
      <div class="chart-panel">
        <h3 class="chart-title" id="mapa-ropy-title"></h3>
        <div id="mapa-ropy"></div>
        <p class="chart-note">Šířka pásu odpovídá množství ropy dovezené z dané země za rok; při přehrávání po měsících ukazuje měsíční dovoz přepočtený na rok a čísla i čtverečky výdajů (1 čtvereček = 5 mld. Kč) se načítají od začátku přehrávání. Do Česka vedou dva ropovody: Družba, kterou do dubna 2025 přitékala ruská ropa, a IKL z Ingolstadtu, který ropovod TAL spojuje s přístavem Terst. Ropa z ostatních zemí do Terstu připlouvá tankery. Trasy jsou zjednodušené — statistika uvádí zemi původu, ne cestu.</p>
        <div class="chart-foot">
          <span>Zdroj: ČSÚ, statistika zahraničního obchodu (dovoz podle země původu); energie přepočtena výhřevností. Mapa: Natural Earth.</span>
        </div>
      </div>
    </div>
  </div>
</div>
