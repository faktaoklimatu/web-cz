---
layout:        empty
type:          "Interaktivní přehled"
title:         "EU ETS: Emise a povolenky zdarma v Česku"
slug:          2026-interaktivni-prehled-ets
body-class:    ets-dashboard
redirect_from:
- /2026-interaktivni-prehled-ets
published:     2026-09-25
caption:       "Jak velkou část emisí v EU ETS pokrývají povolenky zdarma?"
intro: |
    Tento přehled zobrazuje bilanci emisí skleníkových plynů a povolenek zdarma energetických a průmyslových podniků v Česku. Umožňuje měnit pohled podle jednotlivých odvětví, vlastníků nebo zařízení. To ukazuje, že zatímco v sektoru elektřiny a tepla povolenky zdarma po roce 2012 klesají, průmysl jimi stále pokryje většinu svých emisí.
extra-scripts:
- https://d3js.org/d3.v7.min.js
- /assets-local/js/ets-dashboard.js
- /assets-local/js/chart-download.js
preview_type: "Interaktivní přehled"
preview_image: "/assets/studies/2026-interaktivni-prehled-ets.svg"
include_in_search: true
---

<script>
  window.ETS_DASHBOARD = {{ site.data["ets-dashboard"] | jsonify }};
</script>

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400..700&display=swap" rel="stylesheet">


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
      <div class="range-fill" id="ets-year-fill"></div>
      <div class="range-ticks" id="ets-year-phase-ticks"></div>
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
      <div class="chart-foot">
        <span id="ets-source-timeline">Zdroj: <a href="https://union-registry-data.ec.europa.eu/report/welcome">Unijní registr EU ETS</a></span>
        <span class="chart-downloads">Stáhnout:
          <button type="button" class="chart-download" data-format="png" data-svg="ets-svg-timeline" data-filename="ets-vyvoj-v-case.svg" data-title="#ets-timeline-title" data-subtitle="#ets-filter-summary" data-source="#ets-source-timeline">PNG</button>,
          <button type="button" class="chart-download" data-svg="ets-svg-timeline" data-filename="ets-vyvoj-v-case.svg" data-title="#ets-timeline-title" data-subtitle="#ets-filter-summary" data-source="#ets-source-timeline">SVG</button>
        </span>
      </div>
    </div>

    <div class="chart-panel">
      <div class="seg" id="ets-activity-groupby">
        <button type="button" data-group="ra" class="active">Odvětví</button>
        <button type="button" data-group="own">Vlastníci</button>
      </div>

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
      <div class="chart-foot">
        <span id="ets-source-activity">Zdroj: <a href="https://union-registry-data.ec.europa.eu/report/welcome">Unijní registr EU ETS</a></span>
        <span class="chart-downloads">Stáhnout:
          <button type="button" class="chart-download" data-format="png" data-svg="ets-svg-activity" data-filename="ets-podle-odvetvi.svg" data-title="#ets-activity-title" data-subtitle="#ets-activity-filter-summary" data-source="#ets-source-activity">PNG</button>,
          <button type="button" class="chart-download" data-svg="ets-svg-activity" data-filename="ets-podle-odvetvi.svg" data-title="#ets-activity-title" data-subtitle="#ets-activity-filter-summary" data-source="#ets-source-activity">SVG</button>
        </span>
      </div>
    </div>

{% capture povolenky-zdarma %}
[Povolenky zdarma](https://climate.ec.europa.eu/areas-action/carbon-markets/eu-emissions-trading-system-eu-ets/free-allocation/about-free-allocation_en?prefLang=cs) v minulosti vycházely především ze dvou předpokladů:
* **Postupný náběh systému**, aby se zařízení měla čas přizpůsobit a nákup emisních povolenek pro ně nebyl bezprostředním navýšením nákladů. To však v prvních letech vedlo k výraznému přebytku povolenek zdarma nad skutečně vyprodukovanými emisemi. Některé ze zařízení tak nebyly kompenzovány pouze 1:1, ale naopak na bezplatných alokacích vydělaly (v grafech je tato nadměrná alokace zobrazená jako *Povolenky zdarma alokované navíc*).
* **Riziko úniku uhlíku** v energeticky náročných průmyslových sektorech (jejich aktuální seznam [zde](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=uriserv:OJ.L_.2019.120.01.0020.01.CES&toc=OJ:L:2019:120:FULL)), kde by mohlo dojít k tomu, že unijní podniky přesunou svou výrobů mimo EU do zemí s nižšími emisními standardy nebo dojde k upřednostňování konkurence z těchto zemí na úkor domácího průmyslu.

Zatímco výroba elektřiny povolenky zdarma od roku 2013 téměř nedostává (riziko úniku uhlíku je zde omezené), teplárenství dostává pouze část (v současnosti maximálně [30 %](https://mzp.gov.cz/system/files/2025-12/opok-MPkCNP-20251211.pdf)), průmysl kvůli riziku uhlíku stále dostává většinu. Povolenky zdarma by měl ve většině sektorů postupně nahradit [mechanismus uhlíkového vyrovnání na hranicích](/explainery/cbam) (*Carbon Border Adjustment Mechanism*, CBAM).

**Jak konkrétně jsou povolenky zdarma pro průmysl rozdělovány?**
* Povolenky zdarma jsou alokovány na základě benchmarku emisní intenzity výroby daného produktu, který odpovídá průměru 10 % nejefektivnějších zařízení v daném sektoru v EU.
* Systém tak odměňuje ty nejefektivnější – ty, co se do benchmarku vejdou, obdrží všechny povolenky zdarma. Instalace, které jsou pod benchmarkem, naopak dostávají pouze část. Například pokud je benchmark pro určitý produkt 0,1 tuna CO<sub>2</sub> na tunu výroby tohoto produktu a zařízení ho vyrábí s emisní intenzitou 0,15 t CO<sub>2</sub>/t výroby, tak dostane dvě třetiny povolenek zdarma a zbylou třetinu musí dokoupit. Pokud zařízení vyrobí 1000 t produktu ročně, emituje při tom 150 tun CO<sub>2</sub>, k čemuž dostane 100 povolenek zdarma a 50 jich musí nakoupit. Aby byla zařízení motivovaná dále dekarbonizovat, jsou benchmarky postupně zpřísňovány (vždy podle 10 % nejefektivnější produkce v EU).
* V praxi to pak vypadá tak, že členský stát zašle v pětiletém cyklu podklady od jednotlivých zařízení (údaje o výrobě, popis rizika úniku uhlíku) Evropské komisi, která je musí schválit. Poté příslušný orgán (v Česku Ministerstvo životního prostředí) povolenky každý rok alokuje. Instalace musí každý rok MŽP reportovat svou výrobu, aby nedošlo k tomu, že dostanou více povolenek, než potřebují na svoji výrobu. Detaily obsahuje [metodika](https://mzp.gov.cz/cz/agenda/klima-a-energetika/emisni-obchodovani/bezplatna-alokace-2021-2030-eu-ets-1) na stránkách MŽP.

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

Data o alokacích povolenek zdarma a ověřených emisí pochází z [Unijního registru](https://union-registry-data.ec.europa.eu/report/welcome), konkrétně souboru [*Verified emissions 2025*](https://climate.ec.europa.eu/document/download/53018483-62b3-499e-9ab9-b4a831cc44f4_en?filename=verified_emissions_2025_en.xlsx).

Pro účely přehledu pracujeme pouze s daty pro Česko, přičemž jsme pro lepší srozumitelnost a analýzu přidali následující atributy:
* **Odvětví zařízení** – původní data obsahují data o hlavní aktivitě (odvětví) daného zařízení, která ale v některých případech přesně neodpovídá skutečné aktivitě celého podniku. Jde především o primárně průmyslová zařízení zařazené do aktivity _Výroba elektřiny a tepla (spalování paliv)_, kam se podnik dostal kvůli tomu, protože překročil práh tepelného příkonu (nad 20 MW) a nikoliv práh definovaný objemem výroby (např. stanovený objem denní produkce). Přeřazení takového zařízení do konkrétního průmyslového odvětví (na základě naší rešerše) umožňuje výrazně přesněji analyzovat, jaká je celková situace v jednotlivých odvětvích průmyslu. Přesto ale tímto postupem nelze zachytit skutečnost zcela přesně. Mnohé primárně průmyslové teplárny totiž současně také dodávají teplo zákazníkům mimo průmysl (kteří jim tak pokryjí část nákladů za povolenky), stejně jako mnohé primárně městské teplárny současně také dodávají teplo do průmyslových podniků (což znamená pro průmysl nepřímo náklady za povolenky navíc). O těchto dodávkách tepla nejsou veřejná data, a proto je v tomto přehledu nelze zohlednit.

<div class="chart-panel ets-sankey-indent">
  <div class="panel-header">
    <div class="panel-title-group">
      <h2 id="ets-sankey-title">Mapování hlavní ETS aktivity na skutečné odvětví</h2>
    </div>
  </div>
  <svg id="ets-svg-sankey"></svg>
  <div class="chart-foot">
    <span id="ets-source-sankey">Zdroj: <a href="https://union-registry-data.ec.europa.eu/report/welcome">Unijní registr EU ETS</a>, rešerše Fakta o klimatu</span>
    <span class="chart-downloads">Stáhnout:
      <button type="button" class="chart-download" data-format="png" data-svg="ets-svg-sankey" data-filename="ets-mapovani-odvetvi.svg" data-title="#ets-sankey-title" data-source="#ets-source-sankey">PNG</button>,
      <button type="button" class="chart-download" data-svg="ets-svg-sankey" data-filename="ets-mapovani-odvetvi.svg" data-title="#ets-sankey-title" data-source="#ets-source-sankey">SVG</button>
    </span>
  </div>
</div>

* **Současný vlastník** – k názvu zařízení (podniku) jsme na základě rešerše přidali současného vlastníka zařízení (historii vlastnictví pro zjednodušení nezahrnujeme). Ve většině případů jde o mateřskou společnost, u které se potkávají všechny její česká zařízení zahrnutá v ETS1. V rozbalovacím seznamu jsme je následně seřadili podle množství emisí, které jejich zařízení vyprodukují.

Tabulka se skutečnými odvětvími a současnými vlastníky je k dispozici k nahlédnutí [zde](https://docs.google.com/spreadsheets/d/1DX6MGLeiKXbGsPxHH9HwjuK7qOFl27XdsFu5CzDWH1Y/edit?usp=sharing), v případě nalezených nesrovnalostí nás prosím kontaktuje na info@faktaoklimatu.cz.

Tabulka s emisemi skleníkových plynů a povolenek zdarma v letech 2008–2025 pro všechna zařízení v Česku, doplněná o současné vlastníky a skutečná odvětví, je pro případné další analýzy k dispozici [zde](https://github.com/faktaoklimatu/data-analysis/blob/data-dashboard-ets1/outputs/ets-dashboard/ETS-data.csv).

Zdrojový kód pro zpracování dat je k dispozici na [GitHubu](https://github.com/faktaoklimatu/data-analysis/tree/data-dashboard-ets1/scripts/dashboard-ets1).

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
