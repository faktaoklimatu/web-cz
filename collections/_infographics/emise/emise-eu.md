---
layout:     infographic
title:      "Emise skleníkových plynů států EU"
slug:       "emise-eu"
redirect_from: "/emise-eu"
published:  2019-08-22
weight:     95
tags-scopes: [ eu ]
tags-topics: [ emise ]
caption:    "Poměrové srovnání ročních emisí 27 členských států EU a přepočet na obyvatele."
data-jupyter:  "https://github.com/faktaoklimatu/data-analysis/blob/master/notebooks/emissions/treemap-EU.ipynb"
data-orig:
  - [ "Eurostat", "https://ec.europa.eu/eurostat/databrowser/product/view/ENV_AIR_GGE" ]
---

## Jak číst tento graf?

Všechny hodnoty v grafu jsou <glossary id="antropogennisklenikoveplyny">antropogenní emise</glossary> skleníkových plynů CO<sub>2</sub>, N<sub>2</sub>O, CH<sub>4</sub>, HFC, PFC, SF<sub>6</sub>, NF<sub>3</sub> vyjádřené jako <glossary id="co2eq">CO<sub>2</sub>eq</glossary>. Jednotka CO<sub>2</sub> ekvivalent zohledňuje dlouhodobý efekt skleníkových plynů v atmosféře a převádí je na množství CO<sub>2</sub>, které by mělo stejný efekt. Více viz článek [Global warming potential](https://en.wikipedia.org/wiki/Global_warming_potential).

{% include preview-box.html
    title="Jak jsou emise rozdělené mezi světové regiony?"
    text="Obdobnou infografiku jsme vytvořili i pro celosvětové emise skleníkových plynů."
    slug="emise-svet"
%}

V levé části jsou celkové roční emise členských států EU za rok 2023 v mil. tun CO<sub>2</sub>eq, vč. procentuálního zastoupení. Plocha zabraná konkrétním státem odpovídá poměru vůči celku.

Největší státy EU (jak [z hlediska počtu obyvatel](https://en.wikipedia.org/wiki/List_of_European_Union_member_states_by_population), tak [z hlediska HDP](https://en.wikipedia.org/wiki/List_of_sovereign_states_in_Europe_by_GDP_(nominal))) mají v absolutních číslech nejvyšší emise:

* Německo se svými cca 83 mil. obyvateli: 700,6 mil. t CO<sub>2</sub>eq
* Itálie se svými cca 59 mil. obyvateli: 396,4 mil. t CO<sub>2</sub>eq
* Francie se svými cca 68 mil. obyvateli: 393,0 mil. t CO<sub>2</sub>eq
* Polsko se svými cca 37 mil. obyvateli: 352,0 mil. t CO<sub>2</sub>eq

Česká republika jako stát s cca 10,8 mil. obyvateli a emisemi 103,5 mil. t CO<sub>2</sub>eq __je v přepočtu na obyvatele 5. největším emitentem EU__ a má více než 2× vyšší emise než stejně velké Švédsko (cca 10,5 mil. obyvatel).

## Zajímavosti a komentáře k ročním emisím na obyvatele

* Lucembursko, které je v přepočtu na obyvatele na prvním místě, má [dle platformy Votum Klima](https://today.rtl.lu/news/luxembourg/a/1184731.html) tak vysoké emise kvůli nafto-benzínovému turismu (5× vyšší než průměr EU)
* Irsko, na druhém místě, má velmi vysoký podíl zemědělské produkce (skoro 5× vyšší než průměr EU)
* Kypr, na třetím místě, má velmi špinavou energetiku založenou na spalování ropných produktů (topných olejů a nafty)
* Polsko, na čtvrtém místě, má také špinavou energetiku založenou zejména na spalování uhlí
* Česko, na pátém místě, má také velmi vysoký podíl špinavé energetiky (2× vyšší než průměr EU, zejména vlivem hnědouhelných elektráren) - viz naše  [související infografika](/infografiky/emise-cr-detail).

## Poznámky k datům o emisích

Emisní inventura poskytovaná Eurostatem využívá formát a strukturu dat CRF (_Common Reporting Format_). Veškerá metodika k výpočtům a reportingu je na stránkách národního programu inventarizace emisí ([NGGIP – national greenhouse gas inventory programme](https://www.ipcc-nggip.iges.or.jp/)) a je závazná pro všechny státy [UNFCCC](https://cs.wikipedia.org/wiki/R%C3%A1mcov%C3%A1_%C3%BAmluva_OSN_o_zm%C4%9Bn%C4%9B_klimatu). Data o emisích poskytují Eurostatu jednotlivé země EU – data za Českou republiku sestavuje ČHMÚ, podílí se na tom ovšem více českých institucí.

**Údaje odpovídají emisím vyprodukovaným v dané zemi**, avšak vzhledem k vývozu a dovozu zboží nemusejí odpovídat emisím vzniklých ze spotřeby v dané zemi. ČR například do dalších zemí EU vyváží elektřinu, ocel, automobily apod. a dováží zboží z jiných zemí EU nebo z Číny. **Zahrnutí letecké dopravy je podobně problematické** – zobrazený příspěvek letecké dopravy odpovídá emisím vyprodukovaným lety z letišť v dané zemi. Je to tedy pravděpodobně podhodnocený údaj (mnoho Čechů létá z Vídně či Bratislavy) a neodpovídá zcela množství emisí, které Češi způsobí (typicky např. let českého člověka do New Yorku s přestupem v Amsterdamu se započítá do zobrazených emisí jen jako Praha–Amsterdam, zatímco emise z letu Amsterdam–New York se započtou Nizozemsku). Není také započítáno, že emise vypuštěné vysoko v atmosféře mají přibližně dvojnásobný efekt.
