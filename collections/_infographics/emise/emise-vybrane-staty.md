---
layout:     infographic
title:      "Srovnání emisí skleníkových plynů na obyvatele"
slug:       "emise-vybrane-staty"
redirect_from: "/emise-vybrane-staty"
published:  2019-07-23
weight:     70
tags-scopes: [ eu ]
tags-topics: [ emise ]
caption:    "Srovnání emisí některých zemí EU přepočtených na obyvatele (jednotka jsou tuny CO<sub>2</sub>eq na obyvatele), zobrazeny podle sektorů."
data-orig:
  - [ "Eurostat", "https://ec.europa.eu/eurostat/web/products-datasets/-/ENV_AIR_GGE" ]
  - [ "Náš Jupyter notebook", "https://github.com/faktaoklimatu/data-analysis/blob/master/notebooks/emissions-selected-countries.ipynb" ]
---

## Co je v grafice zobrazeno?

* Všechny hodnoty emisí uvádíme v jednotkách <glossary id="co2eq">CO<sub>2</sub>eq</glossary>.
* Roční objemy emisí skleníkových plynů jsou v různých státech EU různé - nejvíce emisí produkují Německo, Francie a Itálie – ale tyto země mají také nejvíce obyvatel. Aby bylo možné čísla srovnávat, uvádíme přepočet v tunách CO<sub>2</sub>eq na obyvatele na rok.
* Výběr států pro graf: zobrazení všech států EU by bylo nepřehledné a zásadní rozdíly by nebyly dobře vidět. Vybrali jsme tedy vedle ČR šest dalších států tak, aby byly zastoupeny sousední země i určité extrémy v Evropě, a celý vzorek tak byl co nejvíce reprezentativní. Z vybraných zemí má ČR nejvyšší emise, což ale odráží i pozici ČR v EU. (Vyšší emise na obyvatele než ČR má jen Lucembursko, Irsko, Kypr a Polsko.)
* V grafu jsou zobrazeny <glossary id="antropogennisklenikoveplyny">antropogenní emise</glossary> CO<sub>2</sub> a N<sub>2</sub>O, CH<sub>4</sub>, HFC, PFC, SF<sub>6</sub>, NF<sub>3</sub> vyjádřené jako <glossary id="co2eq">CO<sub>2</sub>eq</glossary>.

## Co znamenají jednotlivé sektory a jaké jsou v nich rozdíly v rámci EU?

* __Rozdíly ve výrobě elektřiny a tepla:__ Státy, které k výrobě elektřiny a tepla využívají z velké části hnědé uhlí, mají emise z energetiky okolo 3–4 tun CO<sub>2</sub>eq na osobu a rok. Většina státu EU má však jiný energetický mix a průměrné emise z energetiky v celé EU jsou 1,3 t CO<sub>2</sub>eq na osobu na rok, 15 států má emise z energetiky ještě nižší.
* __Rozdíly v emisích z průmyslu__ souvisí s typem průmyslu dané země. Emise skleníkových plynů v průmyslu vznikají zejména při spalování fosilních paliv (typicky pro zahřívání – destilaci, sušení, tavení apod.) a jako vedlejší produkt různých procesů, např. při výrobě cementu, zpracování železné rudy nebo při používání chladicích plynů. Průměrná hodnota emisí tohoto sektoru v EU je 1,8 t CO<sub>2</sub>eq na osobu na rok.
* __Rozdíly v dopravě__ (včetně letecké): V emisích z dopravy se státy liší výrazně méně než ve výrobě elektřiny a tepla. Většina států EU má emise mezi 1,5–3 tuny CO<sub>2</sub>eq na osobu na rok, průměrná hodnota v EU je 2,0 t CO<sub>2</sub>eq na osobu na rok. Typicky zhruba 50–60 % z emisí dopravy pochází z osobních aut, 5–15 % z letecké dopravy a 30–45 % z nákladní dopravy a autobusů.
* __Rozdíly v emisích z budov__ (topení, ohřev vody a vaření pomocí fosilních paliv v domácnostech, kancelářích a institucích): Průměrná hodnota emisí z tohoto sektoru je v EU 0,8 t CO<sub>2</sub>eq na obyvatele na rok, přičemž většina zemí je v rozmezí 0,2–1,2 tun CO<sub>2</sub>eq na osobu na rok. Typicky zhruba ⅔–¾ z těchto emisí pocházejí z domácností.
* __Rozdíly v zemědělství:__ pochází především z chovu hospodářských zvířat (metan) a z obdělávání půdy (průmyslová hnojiva produkují N<sub>2</sub>O). Téměř všechny státy v EU mají emise ze zemědělství mezi 0,6–1,5 t CO<sub>2</sub>eq/osoba na rok. Výjimečně vysoké emise mají Irsko (3,93 t CO<sub>2</sub>eq/osoba/rok) a Dánsko (2,13 t CO<sub>2</sub>eq/osoba/rok), kde tři čtvrtiny emisí připadají na chov dobytka.
* __Rozdíly v odpadovém hospodářství:__ Emise z odpadového hospodářství produkují především skládky odpadu, ze kterých do atmosféry uniká metan. V zemích EU mají všechny státy emise z odpadového hospodářství mezi 0,1–0,6 tun CO<sub>2</sub>eq na obyvatele na rok.

## Poznámky k datům o emisích

* Emisní inventura poskytovaná Eurostatem využívá formát a strukturu dat CRF (common reporting format), veškerá metodika k výpočtům a reportingu je na stránkách národního programu inventarizace emisí ([NGGIP - national greenhouse gas inventory programme](https://www.ipcc-nggip.iges.or.jp/)) a je závazná pro všechny státy [UNFCCC](https://cs.wikipedia.org/wiki/R%C3%A1mcov%C3%A1_%C3%BAmluva_OSN_o_zm%C4%9Bn%C4%9B_klimatu).
* Data o emisích poskytují Eurostatu jednotlivé země EU – tedy data za Českou republiku reportovala přímo Česká republika, konkrétně skrze Evropskou agenturu pro životní prostředí.
* Údaje odpovídají emisím vyprodukovaným v dané zemi – ovšem vzhledem k vývozu a dovozu zboží nemusejí odpovídat emisím vzniklých ze spotřeby v dané zemi. ČR například do dalších zemí EU vyváží elektřinu, ocel, automobily apod a dováží zboží z jiných zemí EU nebo z Číny.
* V rámci této infografiky jsou v údajích o emisích zahrnuty emise z letecké dopravy a zobrazené hodnoty odpovídají emisím vyprodukovaným z letů z letišť v dané zemi. Hodnota tedy nemusí odpovídat přesnému množství emisí, které obyvatelé daného státu způsobí (typicky např. let českého člověka do New Yorku s přestupem v Amsterdamu se započítá do emisí ČR jen jako Praha-Amsterdam, zatímco emise z letu Amsterdam-New York se započtou Nizozemí). Není také započítáno, že emise vypuštěné vysoko v atmosféře mají přibližně dvojnásobný efekt.
* Všechny údaje jsou zaokrouhlené na jedno desetinné místo, ale velikosti plochy odpovídají přesným hodnotám. V důsledku toho se mohou lišit velikosti jednotlivých čtverců, i když se neliší číselný údaj.
