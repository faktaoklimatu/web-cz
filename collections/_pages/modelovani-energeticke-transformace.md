---
layout:     empty
title:      "Modelování energetické transformace"
slug:       modelovani-energeticke-transformace
intro: |
    Česko i Evropu čeká v následujících desetiletích proměna energetiky směrem k menšímu využívání fosilních paliv a větší roli obnovitelných zdrojů elektřiny. A do této proměny budou nejspíše zasahovat i nové technologie (baterie, vodík, CCS, nebo třeba modulární jaderné reaktory).

    Pro plánování a pro informované rozhodování o transformaci energetiky potřebujeme chápat možnosti a limity jednotlivých zdrojů a technologií a také porozumět, jak budou zdroje a technologie fungovat dohromady, jak pokryjí spotřebu energie a za jakou cenu. Pro zodpovězení těchto a dalších otázek vytváříme otevřený, tedy veřejně dostupný model energetiky.
search_type: "Model"
search_image: "/assets-local/img/modelovani-energeticke-transformace-mob.png"
---

<div class="section"><div class="container">
    <h1>{{ page.title }}</h1>
    <div class="lead narrow-text">{{ page.intro | markdownify }}</div>
</div></div>

<div class="full-screen-cover" style="--path-desktop: url('/assets-local/img/modelovani-energeticke-transformace-des.png'); --path-mobile: url('{{ page.search_image }}');"></div>

<div class="section"><div class="container container-xl-fluid"><div class="row justify-content-center">
<div class="longread-xl-space-left"></div>
<div class="col-lg-4 longread-toc invisible">
    <div class="sticky-toc">
        <h2>{{ site.data.lang.text.toc }}</h2>
        <div id="TOC"></div>
    </div>
</div>
<div class="longread-xl-space-middle"></div>
<div class="col-lg-8 longread" markdown="1">

<div class="alert alert-info data-staleness" role="alert">
<h5 class="alert-heading"><i class="fas fa-lightbulb"></i> Pracujeme na tom</h5>
<p>Naše práce na energetickém modelu pro ČR a okolí rozhodně není u konce. Průběžně budeme zveřejňovat výstupy modelování, z nich plynoucí vhledy o transformaci energetiky i samotný kód modelu.</p>
<p>Vše zveřejníme pod licencí <i>Creative Commons</i> (stejně jako všechny naše ostatní materiály).</p>
</div>

## Cíle modelování

Fakta o klimatu dlouhodobě usilují o kultivaci veřejné diskuse o klimatické změně a potřebné dekarbonizaci. V Česku je obor elektroenergetiky největším emitentem skleníkových plynů, dekarbonizace tohoto oboru je tedy zásadním úkolem pro naši společnost.

**Fakta o klimatu usilují o**:
1. **jednoduchý a srozumitelný veřejný model** české (a středoevropské) elektroenergetiky,
2. **srozumitelnou vizualizaci výstupů** tohoto modelu.

Chceme, aby se možnosti (a také limity) rozvoje elektroenergetiky staly srozumitelnými a pochopitelnými pro všechny, kteří se účastní veřejné diskuse: pro novináře, politiky, občanskou společnost.

## Naše modely

Máme dvě úrovně modelu: jednoduchý didaktický model pro širokou veřejnost a složitější optimalizační model pro odbornější veřejnost.

### Didaktický model

Tento model je obzvláště vhodný pro **pochopení možností rozvoje solární a větrné energetiky v Česku**.

* Pracujeme s veřejnými **historickými daty** z [ENTSO-E Transparency Platform](https://transparency.entsoe.eu/) o výrobě a spotřebě elektřiny, nejčastěji v hodinovém rozlišení.
* Model uvažuje pouze **výrobu z nízkoemisních zdrojů, které mají nízké provozní náklady (jádro, hydro, slunce, vítr)**. Tímto ukazujeme jakou část spotřeby mohou tyto zdroje pokrýt v jednotlivých hodinách, dnech, týdnech, ročních obdobích.
* **Výrobu z těchto zdrojů i spotřebu lze zvyšovat podle fixních faktorů**: tím můžeme zkoumat budoucnost, ve které budeme mít 10x instalaci větrných zdrojů nebo 5x instalaci solárních elektráren.
* **Zbývající poptávka po elektřině se dnes pokrývá zejména fosilními palivy**, v budoucnosti ji bude potřeba pokrýt nízkoemisími flexibilními zdroji. Model umožňuje vidět, kolik poptávky zbývá nepokryto a **které zdroje potřebujeme rozvíjet, aby zbývající poptávky bylo během celého roku co nejméně**.
* **Přenosová soustava** je modelována velmi zjednodušeně: každý stát je jeden uzel, modelujeme pouze kapacity interkonektorů, které tyto státy propojují a ztráty při přenosu do jiného státu. Distribuční soustava není modelována vůbec.
* Kromě týdenních průběhů ukazujeme i **sumární statistiky pro jednotlivé týdny v roce a pro celý rok**.

{% capture didactic %}
{% include figure.html
    name="ukazka-didakticky.png"
    class="wide-figure-mobile"
    alt="Ukázka výstupu: ČR dnes a při 6x rozvoji slunce a větru"
    source-text="Fakta o klimatu"
%}
{% endcapture %}
{% include expander-figure.html
    name="didactic"
    class="wide-figure-desktop contrast-figure"
    label-class="large-expander-title"
    label="Ukázka výstupu: ČR dnes a při 6x rozvoji slunce a větru"
    content=didactic
%}

<a href="https://drive.google.com/drive/folders/1GR2ao0wMrTJgwO-64XQGmh8tqga1oO-r?usp=share_link" target="_blank" class="btn btn-secondary"><i class="fas fa-fw fa-chart-area"></i> Více výstupů didaktického modelu</a>

### Optimalizační model

Tento model rozšiřuje základní didaktický model a umožňuje navíc:
* **Pokrýt zbývající poptávku po elektřině pomocí zadaných flexibilních zdrojů a úložišť elektřiny.** Model při tom **minimalizuje** buď **provozní náklady** nebo **provozní i investiční náklady** celého systému.
* Přibližně **predikovat spotové ceny** elektřiny na trhu v průběhu celého roku.
* V rámci sumární statistiky počítat koeficienty využití a **ziskovost jednotlivých zdrojů elektřiny**.


{% capture optimization %}
{% include figure.html
    name="ukazka-optimalizacni.png"
    class="wide-figure-mobile"
    alt="Ukázka výstupu: ČR dnes a v roce 2050 při výrazném rozvoji slunce, větru a zeleného vodíku"
    source-text="Fakta o klimatu"
%}
{% endcapture %}
{% include expander-figure.html
    name="optimization"
    class="wide-figure-desktop contrast-figure"
    label-class="large-expander-title"
    label="Ukázka výstupu: ČR dnes a v roce 2050 při výrazném rozvoji slunce, větru a zeleného vodíku"
    content=optimization
%}

<a href="https://drive.google.com/drive/folders/1d2QWrEN1BZgYOmoMPGF77UfAzFbFWkMe?usp=share_link" target="_blank" class="btn btn-secondary"><i class="fas fa-fw fa-chart-area"></i> Více výstupů optimalizačního modelu</a>

## Plány na další rozvoj

Tímto rozhodně nekončíme. V budoucnu bychom chtěli především přidat:
* základní provázanost s teplárenstvím,
* přesnější modelování spotřeby včetně její flexibility,
* modelování systémových služeb.

<a href="{{ site.fundraising }}" target="_blank" class="btn btn-primary"><i class="d-md-none d-lg-inline fas fa-fw fa-heart"></i> Podpořte vývoj modelů energetiky</a>

</div>
<div class="longread-xl-space-right"></div>
</div></div></div>
