---
layout:        empty
type:          "Interaktivní přehled"
title:         "Vliv fosilních paliv na&nbsp;cenu elektřiny v&nbsp;Evropě"
slug:          2026-interaktivni-prehled-fosilni-elektrina
body-class:    fosilni-elektrina
redirect_from:
- /2026-interaktivni-prehled-fosilni-elektrina
published:     2026-11-16
caption:       "V kolika hodinách roku se v evropských zemích vyplatí vyrábět elektřinu z uhlí nebo plynu?"
intro: |
    Cena elektřiny na burze se mění každou hodinu. Když je dostatek levné elektřiny z větru, slunce nebo jádra, zůstává pod náklady fosilních elektráren. Jakmile ale cena náklady nejlevnější uhelné nebo plynové elektrárny přesáhne, **vyplatí se vyrábět z fosilních paliv a právě ony cenu zpravidla určují**. Přehled ukazuje, v jakém podílu hodin roku k tomu v jednotlivých zemích dochází.
include_in_search: true
extra-scripts:
- /assets-local/js/fosilni-elektrina.js
- /assets-local/js/fosilni-elektrina-vysvetleni.js
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icons/7.2.3/css/flag-icons.min.css">
<script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>
<script src="/assets-local/charts/fok-theme.js"></script>
<script src="/assets-local/charts/fok-utils.js"></script>
<script src="/assets-local/charts/fok-chart-line.js"></script>
<div class="section pb-3">
  <div class="container between-navbars">
    <h1>{{ page.title }}</h1>
    <div class="page-type">{{ page.type }}</div>
    <div class="perex narrow-text">{{ page.intro | markdownify }}</div>
  </div>
</div>

<div class="section pt-4">
  <div class="container">

    <div class="fe-heading-row">
      <h2 class="fe-heading" id="fe-compare-heading">Jak se v&nbsp;Evropě změnil podíl hodin, kdy cenu elektřiny určují fosilní paliva</h2>
      <div class="seg-buttons fe-toggle" id="fe-toggle" role="group" aria-label="Zobrazená paliva"></div>
    </div>
    <div class="chart-panel">
      <h3 class="chart-title" id="fe-compare-title">Vážený podíl hodin, kdy cenu elektřiny určovaly fosilní zdroje: 2020 a&nbsp;2025</h3>
      <p class="fe-lead" id="fe-compare-lead"></p>
      <div class="fe-legend fe-legend-cmp"><span><span class="dot hollow"></span>2020</span><span><span class="dot"></span>2025</span><span>vpravo změna v&nbsp;procentních bodech (p.&nbsp;b.)</span></div>
      <div id="fe-compare"></div>
      <p class="chart-note">Země seřazeny podle podílu v roce 2025, od nejnižšího. Porovnáváme rok 2020 s rokem 2025: dřívější roky ovlivnila levná povolenka a levný plyn (viz Skandinávie níže). Německo a Lucembursko tvoří společnou cenovou zónu, proto mají stejné hodnoty. Kurzívou jsou země mimo EU. Chybí Kypr a Malta (bez dat).</p>
    </div>

    <h2 class="fe-heading">Vývoj jednotlivých zemí od roku 2016</h2>
    <p class="chart-note">Přerušovaná čára je rok, který ještě neskončil. Najeďte myší na rok v grafu: zobrazí se podíl za daný rok, které zdroje se započítávají, a pro každou hodinu roku (den v roce vodorovně, hodina dne svisle), jak daleko byla cena od nákladů fosilních elektráren. Plně červeně jsou hodiny nad náklady, s rostoucí vzdáleností pod nimi barva bledne a o 30 % nákladů pod nimi je bílá. Světlé hodiny uprostřed dne v létě ukazují vliv solární elektřiny.</p>
    <p class="chart-note fe-grid-note">Řazeno stejně jako graf výše, do dvou skupin. Země mimo EU (Velká Británie, Norsko, Švýcarsko, Srbsko) jsou označeny. Chybí Kypr a Malta (bez dat). * U Chorvatska, Irska a Velké Británie začíná graf prvním úplným rokem s daty (2017, 2018, 2017). Tenké čáry pod každým grafem jsou jen kontext: roční podíl nefosilních (obnovitelné zdroje a jádro) a fosilních zdrojů na výrobě elektřiny podle Emberu (0–100 %, bez vlastního popisku osy).</p>
    <div class="fe-legend" id="fe-legend"></div>
    <div id="fe-groups"></div>

    <div class="fe-notes">
      <a class="expander collapsed" data-toggle="collapse" data-target="#fe-method" aria-expanded="false" aria-controls="fe-method">
        <div class="expander-button"><i class="fas fa-chevron-down"></i></div>
        <h2 class="fe-heading">Jak to počítáme</h2>
      </a>
      <div class="collapse" id="fe-method">

      <h3>Základní myšlenka</h3>
      <p>Cena elektřiny na denním trhu se pro každou hodinu určí podle nejdražší elektrárny, kterou je ještě potřeba zapnout, aby se pokryla poptávka. Větrné a solární elektrárny, ale i jaderné či vodní, mají velmi nízké provozní náklady. Uhelné a plynové elektrárny naopak při výrobě spalují palivo a platí za emisní povolenky. Pro každou z nich proto umíme spočítat <strong>krátkodobé mezní náklady</strong>, tedy náklady na jednu další vyrobenou megawatthodinu:</p>
      <p class="fe-formula">náklady = provozní náklady + (cena paliva + emise × cena povolenky) / účinnost</p>
      <ul>
        <li><strong>Hnědé uhlí:</strong> účinnost 36 %, emise 0,36 t CO₂ na MWh paliva, cena paliva podle skupiny zemí (v Německu asi 6,5 EUR/MWh paliva).</li>
        <li><strong>Černé uhlí:</strong> účinnost 38 %, emise 0,341 t CO₂ na MWh paliva, cena jihoafrického uhlí.</li>
        <li><strong>Plyn:</strong> účinnost 55 %, emise 0,202 t CO₂ na MWh paliva, cena plynu TTF.</li>
        <li>Provozní náklady jsou u všech tří 2 EUR/MWh; cena povolenky je denní, ceny paliv měsíční.</li>
      </ul>
      <p>Je-li cena elektřiny vyšší než tyto náklady, elektrárna vydělává a vyplatí se jí běžet: fosilní zdroje jsou potřeba a zpravidla cenu určují. Je-li nižší, elektrárna by na další megawatthodině prodělávala a trh ji nepotřebuje, protože levná elektřina z jiných zdrojů stačí. Některé elektrárny, například teplárny, ale běží i tehdy, protože musí dodávat teplo. Proto hodiny těsně pod náklady počítáme téměř naplno, viz níže.</p>

      <h3>Jak to vypadá v jednom měsíci: únor 2026</h3>
      <p>Graf ukazuje skutečné hodinové ceny a náklady ve vybrané zemi, kde je hodně větru a slunce. Je z února, kdy se výkon solárních elektráren během měsíce rychle zvedá. Černá čára je cena elektřiny v každé hodině (šedá, když je pod náklady nejlevnější fosilní elektrárny). Barevné čáry jsou náklady hnědouhelné, černouhelné a plynové elektrárny, pokud se v zemi započítávají. Mění se jen pomalu, protože ceny paliv a povolenek se vyvíjejí po dnech a měsících, kdežto cena elektřiny skáče každou hodinu. Dole je výroba větru a slunce. Přepínačem lze vybrat jinou zemi.</p>
      <div class="seg-buttons fe-ex-picker" id="fe-ex-country" role="group" aria-label="Země"></div>
      <figure class="fe-figure">
        <div id="fe-ex-march"></div>
        <div class="fe-ex-notes"></div>
        <figcaption></figcaption>
      </figure>
      <p>V grafu se dají sledovat tři situace. <strong>Bezvětří:</strong> cena je večer i v noci nad náklady a fosilní elektrárny ji určují. <strong>Slunce:</strong> každý slunečný den klesne v poledne cena pod náklady, protože solární elektřina vytlačí z trhu nejdražší zdroje, a večer se po západu slunce zase vrátí nad náklady. S tím, jak se v průběhu února zvedá solární špička, se polední propad prohlubuje. <strong>Vítr:</strong> větrné dny stlačí ceny pod náklady po celých 24 hodin. Ve Španělsku, kde je hodně slunce a plyn je jediná započítávaná technologie, je cena v poledne trvale kolem nuly.</p>

      <h3>Jak z hodin vzniká roční podíl</h3>
      <p><strong>Uhlí nebo plyn</strong> značí hodiny, kdy cena převýšila náklady nejlevnější z hnědouhelné, černouhelné a plynové elektrárny. <strong>Jen plyn</strong> značí hodiny, kdy cena převýšila náklady plynové elektrárny.</p>
      <p>Podíl je vážený: hodina nad náklady má váhu 1, hodina o 30 % nákladů a více pod nimi váhu 0 a mezi tím váha klesá lineárně, takže hodina těsně pod náklady se počítá téměř naplno. Roční podíl je průměr vah všech hodin. Tím se do podílu promítá i to, že fosilní elektrárny často běží i při ceně těsně pod svými náklady.</p>

      <h3>Které technologie se započítávají</h3>
      <p>Do nákladů se počítají jen technologie, které v dané zemi nebo v zemích propojených na společném trhu skutečně vyrábějí (alespoň 1 % výroby). Propojené jsou země, jejichž ceny se shodují alespoň v 10 % hodin. Země mimo společný trh (například Švýcarsko nebo Velká Británie) posuzujeme podle přímých sousedů. Norsko je výjimka: uhlí se tam nepočítá ani přes sousední země, protože jeho cenu určuje především vodní energie, plyn se počítá. Cena hnědého uhlí vychází z předpokladů ENTSO-E (TYNDP 2024), které ji rozlišují podle skupin zemí; Česko patří mezi země s nejlevnějším uhlím.</p>

      <h3>Proč v létě 2022 slunce nesrazilo poledne pod náklady uhlí, ale v létě 2021 ano</h3>
      <p>V letech 2021 a 2022 se solární výroba nezmenšila, naopak vzrostla. Přesto byla v létě 2022 cena v poledne v mnoha zemích výrazně nad náklady fosilních elektráren. Příklad Německa, květen–srpen, polední hodiny (11–15 h):</p>
      <figure class="fe-figure">
        <div id="fe-ex-noon"></div>
        <figcaption>Německo, průměr za květen–srpen v hodinách 11–15 (poledne) a 18–21 (večer). Ceny: Ember, náklady: výpočet Fakta o klimatu.</figcaption>
      </figure>
      <p><strong>Co znamená cena pod náklady uhelné elektrárny.</strong> Cena klesne pod náklady uhelné elektrárny jen tehdy, když k pokrytí poptávky v dané hodině stačí zdroje s nižšími náklady: slunce, vítr, jádro, voda, biomasa a elektrárny, které nelze vypnout. Uhelné bloky pak musí snižovat výkon. Rozhoduje tedy hlavně to, kolik poptávky po těchto levných zdrojích zbývá, a ne to, jak drahé jsou palivo a povolenky.</p>
      <p><strong>Léto 2021.</strong> Náklady všech tří technologií ležely blízko sebe (74 až 87 EUR/MWh). Průměrná polední cena byla 61 EUR/MWh, tedy pod nimi všemi, a pod náklady hnědého uhlí byla v 59 % polednů. Solární elektřina spolu s ostatními levnými zdroji pokryla většinu poptávky a uhelné bloky ustupovaly.</p>
      <p><strong>Léto 2022.</strong> Solární výkon v poledne byl o 5 GW vyšší, ale ostatní levné zdroje ztratily víc. Jádro bylo o 3,7 GW nižší (na konci roku 2021 byly odstaveny tři ze šesti německých reaktorů), vítr o 2,2 GW nižší (slabší léto) a voda o 0,6 GW nižší (sucho). Slunce, vítr, jádro, voda a biomasa dohromady tak v poledne vyrobily o 1,6 GW méně než v roce 2021. Spotřeba v Německu byla sice o 2,4 GW nižší, ale vývoz do sousedních zemí byl o 1,5 GW vyšší. Fosilní elektrárny proto musely v poledne vyrábět o 3 GW víc (hnědé uhlí +2,0 GW, černé uhlí +1,4 GW, plyn −0,4 GW). Při ceně kolem 226 EUR/MWh uhelné elektrárny pořádně vydělávaly a nic je z trhu nevytlačilo.</p>
      <div id="fe-ex-table"></div>
      <p><strong>Proč byla cena vysoká.</strong> Trhy jsou propojené. Německo v poledne část výroby vyváželo do zemí, kde byla cena ještě vyšší: ve Francii (323 EUR/MWh kvůli výpadkům jaderných reaktorů) a v Itálii (348 EUR/MWh). A náklady fosilních elektráren se mezi léty 2021 a 2022 rozestoupily: hnědé uhlí zdražilo jen z 74 na 104 EUR/MWh, černé uhlí z 87 na 179 a plyn z 83 na 311. Solární elektřina v poledne vytlačila nejdražší plynové bloky (cena byla pod náklady plynu v 79 % polednů), ale poptávka po uhlí zůstala a cena se držela mezi náklady černého uhlí a plynu. Nad náklady nejlevnější, hnědouhelné elektrárny proto byla v 79 % polednů, v roce 2021 jen ve 41 %.</p>
      <p class="fe-caveat">Jde o výklad na datech z Německa. Z dostupných dat neumíme oddělit všechny příčiny, například omezení přenosové kapacity nebo chování jednotlivých elektráren.</p>

      <h3>Skandinávie a roky před 2020</h3>
      <p>Ve Skandinávii vychází před rokem 2020 vysoký podíl hodin nad náklady fosilních elektráren (ve Švédsku 73 %, 56 %, 72 % a 84 % v letech 2016 až 2019), přestože tamní elektřina je téměř bez fosilních zdrojů. Neznamená to, že by ceny určovaly skandinávské uhelné nebo plynové elektrárny. Důvody jsou dva:</p>
      <ul>
        <li><strong>Nízká laťka.</strong> V letech 2016 a 2017 stála povolenka asi 5 EUR/t a plyn byl levný, takže náklady nejlevnější fosilní elektrárny činily jen 28 až 35 EUR/MWh. Běžná skandinávská cena se jim rovnala. Po roce 2020 povolenka podražila na 25, 53 a 80 EUR/t a spolu s plynem zvedla náklady na 80 až 160 EUR/MWh, kdežto skandinávské ceny zůstaly nižší.</li>
        <li><strong>Propojení s kontinentem.</strong> V letech 2016 až 2019 se švédské a německé ceny lišily o méně než 5 EUR/MWh v 50 až 66 % hodin, v roce 2020 už jen ve 26 % a v roce 2022 v 9 %. Když je vody málo, hodnota vody v nádržích se ukotví na nákladech kontinentálních tepelných elektráren, které by ji nahradily. Norská vodní výroba byla v roce 2019 jen 125 TWh proti 139 až 144 TWh v ostatních letech 2016 až 2021 a skandinávské ceny se v letech 2018 a 2019 téměř rovnaly německým.</li>
      </ul>
      <figure class="fe-figure">
        <div id="fe-ex-nordics"></div>
        <figcaption>Roční průměry. Ceny: Ember, náklady: výpočet Fakta o klimatu. Švédské náklady jsou náklady nejlevnější z uhelné a plynové elektrárny, která se ve Švédsku podle pravidla výše započítává.</figcaption>
      </figure>
      <p>Ukazatel proto u zemí s převahou vody neměří výrobu fosilních elektráren, ale vztah ceny k jejich nákladům. Skandinávské hodnoty před rokem 2020 je dobré číst s touto výhradou.</p>

      <h3>Data a omezení</h3>
      <p>Ceny plynu a uhlí jsou měsíční průměry, takže jde o odhad: u plynu je pro Česko, Polsko, Itálii, Španělsko a Portugalsko připočtena roční přirážka podle místního trhu. Ve Španělsku a Portugalsku se v letech 2022–2023 uplatnil strop ceny plynu (tzv. iberská výjimka).</p>
      <p class="fe-source">Zdroj: ceny elektřiny Ember (CC BY 4.0), ceny plynu a uhlí Světová banka (Pink Sheet, CC BY 4.0), kurz ECB, ceny povolenek Instrat, výroba Energy-Charts (Fraunhofer ISE, CC BY 4.0), výpočet Fakta o klimatu.</p>
      </div>
    </div>
  </div>
</div>
