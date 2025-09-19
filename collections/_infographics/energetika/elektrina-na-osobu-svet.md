---
layout:     infographic
title:      "Výroba elektřiny na osobu ve světových regionech"
slug:       "elektrina-na-osobu-svet"
redirect_from: "/elektrina-na-osobu-svet"
published:  2020-06-01
weight:     120
tags-scopes: [ svet ]
tags-topics: [ energetika ]
caption:    "Vývoj vyrobené elektřiny ve světě v přepočtu na osobu podle jednotlivých zdrojů v letech 2000–2024, včetně údajů pro hlavní světové regiony. Hodnoty jsou uváděné v kWh na osobu za rok."
data-orig:  [["Náš Jupyter notebook", "https://github.com/faktaoklimatu/data-analysis/blob/master/notebooks/electricity-generation-world-regions.ipynb"], ["Ember (výroba a spotřeba elektřiny)", "https://ember-energy.org/data/yearly-electricity-data/"], ["OSN (populace)", "https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/EXCEL_FILES/1_General/WPP2024_GEN_F01_DEMOGRAPHIC_INDICATORS_COMPACT.xlsx"]]
---

## Jak číst tento graf

* Graf znázorňuje **celosvětový vývoj vyrobené elektřiny na osobu podle jednotlivých zdrojů v letech 2000–2024** a také srovnání s vybranými světovými regiony. Hodnoty jsou uváděné v **<glossary id="w">kWh</glossary> vyrobené elektřiny na osobu za rok**.
* Všechny grafy mají shodnou vertikální osu, proto u regionů s velmi nízkou průměrnou spotřebou na osobu zabírá vyplněná část jen velmi malý prostor grafu.
* Srovnání na osobu však nezohledňuje odlišnou velikost jednotlivých regionů, proto **pravý sloupec doplňuje podíl regionů na celkové globální výrobě elektřiny v roce 2024**. Porovnání regionů z hlediska celkového množství vyrobené elektřiny nabízí doplňující infografika [Výroba elektřiny ve světových regionech](/infografiky/elektrina-svet).

## Komentáře ke grafu

* **Výroba elektřiny na osobu v České republice v roce 2024 byla 6 744 kWh, tedy více než průměry ve zobrazených regionech s výjimkou USA a Číny.** Česká republika je zároveň velký vývozce elektřiny, proto průměrná spotřeba elektřiny na osobu byla nižší, 6 129 kWh. I tato hodnota je téměř dvojnásobná oproti světovému průměru.
* Celosvětově došlo mezi lety 2000 a 2024 k navýšení produkce elektřiny o více než 100 %, zároveň v tomto období došlo k nárůstu populace o 2 miliardy obyvatel. V přepočtu na osobu se výroba elektřiny zvýšila o 54 %, v absolutních hodnotách došlo k navýšení kapacit všech zdrojů výroby elektřiny s výjimkou ostatních fosilních paliv (výroba elektřiny z ropy atd.). Podíl uhlí na výrobě elektřiny mírně klesl (z 38 % na 34 %), podíl jádra klesl ještě výrazněji (ze 17 % na 9 %), naopak došlo ke zvýšení podílů zemního plynu (z 18 % na 22 %) a obnovitelných zdrojů (z 19 % na 32 %, především díky rozvoji větrných a solárních elektráren).
* Z grafu jsou také patrné **trendy jednotlivých regionů**:
  * V **Evropské unii** se spotřeba elektřiny na osobu prakticky nemění, dochází však k výraznému nahrazování uhlí ve výrobě elektřiny obnovitelnými zdroji.
  * Spotřeba elektřiny na osobu v **USA** mírně klesla, stále je však mnohonásobně vyšší než světový průměr. Od roku 2007 dochází k poklesu podílu uhlí ve výrobě elektřiny, které je však nahrazováno především zemním plynem, částečně také obnovitelnými zdroji.
  * V **Číně** se spotřeba elektřiny na osobu zvýšila mezi lety 2000 a 2024 pětinásobně. Došlo k navyšování kapacit všech zdrojů výroby elektřiny, přesto uhlí je v Číně stále dominujícím zdrojem s 58% podílem (avšak v porovnání se 78 % v roce 2000).
  * V **Indii** došlo k více než dvojnásobnému nárůstu výroby elektřiny na osobu v daném období, přesto je však méně než poloviční ve srovnání s celosvětovým průměrem. Uhlí je stále dominantním zdrojem při výrobě elektřiny se 75% podílem, zároveň dochází i k pozvolnému rozvoji ostatních zdrojů.
  * **Ostatní státy světa** představují velice různorodou skupinu, kde výroba elektřiny na osobu některých států převyšuje USA (například v Kanadě nebo v ropných státech blízkého východu), zároveň v mnoha jiných státech je nižší než v Indii (zpravidla v afrických a některých asijských státech).
* Graf zobrazuje elektřinu vyrobenou v jednotlivých regionech, nikoli skutečně spotřebovanou. Například v případě České republiky tvoří čistý export 9 % vyrobené elektřiny. U velkých regionů v grafu je však dovoz a vývoz prakticky zanedbatelný.
* Elektřina představuje pouze část z celkové spotřeby energií, například většina energie spotřebovaná na dopravu či vytápění není v grafu zahrnuta (neboť se jedná o přímé spalování fosilních paliv, nikoli o elektřinu).
* Do grafu nejsou zahrnuté některé další obnovitelné zdroje s marginálním podílem na výrobě (například geotermální energie), celosvětově se jedná o 0,3 % produkce elektřiny.

## Zdroj dat

* Infografika je založená na [datech](https://ember-energy.org/data/yearly-electricity-data/) o výrobě a spotřebě elektřiny od organizace [Ember](https://ember-climate.org/). Jedná se o nezávislý klimatický think-tank, zaměřený na podporu přechodu od uhlí k čistým zdrojům elektřiny. Na stránkách Emberu je možné najít i [interaktivní dashboard](https://ember-energy.org/data/electricity-data-explorer/), kde lze data procházet po jednotlivých zemích i zdrojích energie.
* Ember vychází především z dat Eurostatu pro Evropskou unii, z národních databází pro USA, Čínu, Indii a další větší státy a z mezinárodní datové sekce amerického ministerstva energetiky pro ostatní státy světa.
* Think-tank Ember kromě datových sad publikuje také každý rok souhrnné zprávy o výrobě elektřiny v [Evropské unii](https://ember-climate.org/insights/research/european-electricity-review-2025/) a [na celém světě](https://ember-energy.org/latest-insights/global-electricity-review-2025/).
* Data o populaci jsou převzata od Organizace spojených národů.
