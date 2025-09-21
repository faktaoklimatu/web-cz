---
layout:     infographic
title:      "Výroba elektřiny na osobu v EU a Británii"
slug:       "elektrina-na-osobu-eu"
redirect_from: "/elektrina-na-osobu-eu"
published:  2020-06-01
weight:     93
tags-scopes: [ eu ]
tags-topics: [ energetika ]
caption:    "Vývoj vyrobené elektřiny na osobu podle jednotlivých zdrojů v letech 2000–2024 a srovnání se spotřebou pro členské státy Evropské unie a Velkou Británii. Hodnoty jsou uváděné v kWh na osobu za rok."
data-orig:
  - [ "Náš Jupyter notebook", "https://github.com/faktaoklimatu/data-analysis/blob/master/notebooks/per-capita-electricity-generation-eu.ipynb" ]
  - [ "Ember (výroba a spotřeba elektřiny)", "https://ember-energy.org/data/yearly-electricity-data/" ]
  - [ "OSN (populace)", "https://population.un.org/wpp/Download/Files/1_Indicator%20(Standard)/EXCEL_FILES/1_General/WPP2024_GEN_F01_DEMOGRAPHIC_INDICATORS_COMPACT.xlsx" ]
---

## Jak číst tento graf

{% include preview-box.html
    title="Světové srovnání"
    text="Podobné srovnání výroby elektřiny na osobu pro celý svět a hlavní regiony."
    slug="elektrina-na-osobu-svet"
%}

* Graf znázorňuje **množství vyrobené elektřiny na osobu podle jednotlivých zdrojů v letech 2000–2024** ve všech členských státech Evropské unie[^EU] a ve Velké Británii. Hodnoty jsou uváděné v **<glossary id="w">kWh</glossary> vyrobené (a spotřebované) elektřiny na osobu za rok**.
* Výroba elektřiny je také doplněna o průměrnou spotřebu, která **v roce 2024 v celé Evropské unii byla 6 075 kWh na osobu**. Graf ukazuje, jak se tato průměrná spotřeba liší v jednotlivých členských státech a jak se tato spotřeba vyvíjí v čase. Rozdíl mezi průměrnou výrobou a průměrnou spotřebou představuje dovoz a vývoz elektřiny.
* Ostatní fosilní paliva zahrnují především zemní plyn, obnovitelné zdroje obsahují solární, větrné i vodní elektrárny, výrobu elektřiny z biomasy, bioplynu a ze spalování odpadu.

## Komentáře ke grafu

* Elektřina představuje pouze část z celkové spotřeby energií, například většina energie spotřebovaná na dopravu či vytápění není v grafu zahrnuta (neboť se jedná o přímé spalování fosilních paliv, nikoli o elektřinu).
* Z grafu jsou zřejmé velké rozdíly v množství vyrobené i spotřebované elektřiny mezi jednotlivými státy. V některých případech lze tyto rozdíly vysvětlit právě rozdílnou mírou elektrifikace dopravy nebo vytápění, například vysokou mírou elektrifikace vytápění u Švédska.[^svedsko]
* Ačkoli uhlí je jen jedním z fosilních paliv, jeho spalování uvolňuje nejvíce emisí v přepočtu na získanou energii. Například zemní plyn uvolňuje přibližně jen poloviční množství skleníkových plynů na jednotku energie oproti uhlí (zejména hnědému). Proto má smysl uvádět v infografice podíl uhlí jako samostatnou kategorii – a proto je samozřejmě také důležité usilovat o snížení podílu uhlí ve výrobě elektřiny.
* **Podíl uhlí na výrobě elektřiny v EU klesl z 30,5 % v roce 2000 na 9,8 % v roce 2024.** Uhlí bylo nahrazeno obnovitelnými zdroji (nárůst z 15,5 % na 47,6 %), především rozvojem větrných elektráren, ovšem ke značnému nárůstu došlo i u solárních elektráren a výroby elektřiny z biomasy a odpadu. Podíl jaderné elektřiny se snížil z 32,8 % na 23,6 %, podíl ostatních fosilních paliv mírně klesl z 21,2 % na 19,1 % (mírně se zvýšilo zastoupení plynu mezi ostatními fosilními palivy).
* Pokles zastoupení uhlí a jeho nahrazení obnovitelnými zdroji vedly v EU k výraznému zlepšení uhlíkové intenzity při výrobě elektřiny, v roce 2000 se při výrobě 1 kWh elektřiny uvolnilo 419 gramů CO<sub>2</sub>, v roce 2023 již pouze 213 gramů CO<sub>2</sub>.
* Nejvyšší podíl uhlí na výrobě elektřiny ze států EU má Polsko – 54 % v roce 2024, Česká republika byla druhá s 36,5 %. Polsko však vyrábí i spotřebovává výrazně méně elektřiny na osobu než Česká republika, při srovnání absolutních hodnot **Česká republika vyrábí nejvíce elektřiny z uhlí na osobu z celé Evropské unie** – 2 484 kWh na osobu (druhé Polsko vyrábí z uhlí 2 363 kWh na osobu). Pouze 5 států Evropské unie má podíl uhlí na výrobě elektřiny vyšší než 15 %. Naopak nejnižší (nebo žádný) podíl uhlí na výrobě elektřiny mají Portugalsko (v roce 2021 došlo k vypnutí poslední uhelné elektrárny, elektřina je vyráběna z obnovitelných zdrojů a zemního plynu), Švédsko (téměř veškerá energie je vyráběna z obnovitelných zdrojů – vodních a větrných elektráren – a z jádra), Belgie (kombinace jaderné elektřiny, obnovitelných zdrojů a zemního plynu), Rakousko (provoz poslední uhelné elektrárny byl ukončen v roce 2020, většinu elektřiny dodávají vodní elektrárny), Slovensko (provoz poslední uhelné elektrárny ukončen v roce 2024), Irsko (provoz poslední uhelné elektrárny ukončen v roce 2025), Francie (vyrobí více než 70 % elektřiny z jaderných elektráren) a další menší státy (Estonsko, Litva, Lotyšsko, Kypr, Lucembursko a Malta, některé z nich však vyrábí většinu elektřiny z jiných fosilních paliv).
* Mnoho států vyváží nebo dováží větší množství elektřiny, Evropská unie jako celek je však v oblasti elektřiny prakticky soběstačná (dováží v průměru posledních let méně než 0,2 % spotřebované elektřiny).

{% comment %}
Podíl importu EU: https://github.com/faktaoklimatu/data-analysis/blob/master/notebooks/electricity-generation-res.ipynb
{% endcomment %}

## Zdroj dat

* Infografika je založená na [datech](https://ember-energy.org/data/yearly-electricity-data/) o výrobě a spotřebě elektřiny od organizace [Ember](https://ember-climate.org/). Jedná se o nezávislý klimatický think-tank, zaměřený na podporu přechodu od uhlí k čistým zdrojům elektřiny. Ember vychází především z dat Eurostatu, nejaktuálnější data byla doplněna z národních a dalších zdrojů.
* Think-tank Ember kromě datových sad publikuje také každý rok souhrnné zprávy o výrobě elektřiny v [Evropské unii](https://ember-energy.org/latest-insights/european-electricity-review-2025/) a [na celém světě](https://ember-energy.org/latest-insights/global-electricity-review-2025/).
* Data o populaci jsou převzata od Organizace spojených národů.

## Poznámky

[^EU]: Jde o tzv. EU-27: 27 států, které jsou k roku 2023 součástí Evropské unie, tedy bez Velké Británie, která formálně Unii opustila 31. ledna 2020.
[^svedsko]: Například v domácnostech tvoří elektřina ve Švédsku skoro 50 % konečné spotřeby energie, v Česku je to jen cca 20 %.

{% comment %}
Poměr energie na konečné spotřebě domácností ve Švédsku a ČR: ručně porovnán pomocí https://ec.europa.eu/eurostat/cache/sankey/energy/sankey.html?geos=SE&year=2023&unit=KTOE&fuels=TOTAL&highlight=_&nodeDisagg=0101000000000&flowDisagg=true&language=EN
{% endcomment %}
