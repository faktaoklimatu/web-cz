---
layout:      explainer
title:       "Jaká je průměrná teplota planety Země?"
slug:        "teplota-zeme"
published:   2023-09-15
authors:
  - id: "ondras-pribyla"
  - id: "jirka-lnenicka"
    minor-role: "editace"
weight:      74
tags-scopes: [  ]
tags-topics: [  ]
cover-source-author:        "Robert Schwemmer, NOAA, NOS, CINMS"
cover-source-license:       "CC BY 2.0"
cover-source-license-url:   "https://creativecommons.org/licenses/by/2.0/deed.en"
cover-source-text:          "NOAA Photo Library"
cover-source-url:           "https://www.flickr.com/photos/noaaphotolib/5033367878/"
perex: |
    Průměrná teplota planety se pohybuje okolo 15 °C a s postupující klimatickou změnou se pomalu zvyšuje – zhruba o 0,2 °C za dekádu. Otázka průměrné teploty planety je ale trochu komplikovanější, záleží totiž například na ročních obdobích. Více vysvětluje následující text.
---
**Průměrná teplota planety** je dobře definovaný koncept. V textech o Zemi či v odborných článcích na něj však člověk narazí jen zřídka. Částečně i proto, že jde o údaj, který není příliš reprezentativní. Teploty na Zemi mají obrovský rozptyl (zatímco v Antarktidě běžně dosahují −60 °C a v tropických oblastech okolo +40 °C) a průměrnou teplotu planety si zkrátka nelze jednoduše představovat jako něco mezi Antarktidou a tropy.

Přesto je užitečné vědět, jak se průměrná teplota planety mění, zejména pro pochopení dynamiky planetárního klimatu. Proto vznikl tento text. (Koncept teplotní anomálie, který se v praxi používá mnohem častěji, je zde jen zběžně nastíněn a podrobněji bude vysvětlen jinde.)

## Jak se měří průměrná teplota planety?

Kdyby existovala hustá síť měřicích stanic, které by pokrývaly celou planetu, dala by se průměrná teplota Země spočítat jednoduchým zprůměrováním okamžitých naměřených hodnot. Potíž je ale jednak v tom, že dnešní síť není dostatečně hustá (zejména v některých opuštěných oblastech pouští či v oceánech) a jednak v tom, že ne všechny stanice měří stále, mohou mít výpadky apod. Přesto lze díky matematickým metodám a modelování s docela velkou přesností spočítat, jaká by byla teplota planety, kdyby taková ideálně hustá síť měřicích stanic skutečně existovala.

Jedním z projektů, které se věnují teplotě planety, je [Climate Reanalyzer](https://climatereanalyzer.org/clim/t2_daily/).[^climatereanalyzer] Jím používaný model počasí vezme každé tři hodiny dostupná data z meteorologických stanic a družicových měření, dopočítá počasí v oblastech mezi stanicemi a každý den výslednou teplotu zprůměruje pro posledních 24 hodin a pro celý povrch planety.

Ukazuje se, že různé **reanalýzy**[^reanalyza] (tedy modely, které takto dopočítávají teplotní data) docházejí k velmi podobným výsledkům, zejména v odchylkách teploty. Jinak řečeno: výsledky modelů jsou vcelku spolehlivé, a pokud jeden model říká, že aktuální teplota planety je o např. 1,5 °C vyšší, než je normální teplota pro daný den, bude i v ostatních modelech vycházet stejná teplotní odchylka.[^reanalyzy-rozdily]

## Jak se mění teplota planety během roku?

Teplota planety v průběhu roku kolísá. Minimum nastává v lednu a bývá okolo 12,3 °C, maximum přichází koncem července a pohybuje se kolem 16,3 °C. Přesněji řečeno: takto to bývalo dříve,[^ref-obdobi-min-max] dnes klimatická změna teplotní průběhy postupně zvedá směrem k vyšším teplotám, což je podrobněji vysvětleno níže.

{% include figure.html
    name="prumerna-teplota-planety-des.svg"
    name-mobile="prumerna-teplota-planety-mob.svg"
    alt="Průměrná teplota planety v průběhu roku"
    source-text="Fakta o klimatu, data Climate Reanalyzer"
    source-url="https://climatereanalyzer.org/clim/t2_daily/"
%}

Proč k tomuto kolísání v průběhu roku dochází? Hlavním důvodem je rozložení kontinentů na planetě. Většina se nachází na severní polokouli, a protože se teplota nad kontinenty mění v průběhu roku více než nad oceány (oceány se ohřívají a ochlazují pomaleji než pevnina, tedy jejich teplota tolik nekolísá), převažuje v globálním měřítku vliv střídání ročních období na severní polokouli.

{% include figure.html
    name="polokoule-pevnina-des.svg"
    name-mobile="polokoule-pevnina-mob.svg"
    alt="Obrázek znázorňující podíl pevniny a oceánů na obou polokoulích. Severní polokoule má 40 % pevniny, zatímco jižní pouze 20 %."
    source-text="Fakta o klimatu, data Wikipedia"
    source-url="https://en.wikipedia.org/wiki/Hemispheres_of_Earth"
%}

Jak se mění teplota na severní a na jižní polokouli? Průměrná teplota severní polokoule je nejnižší v lednu (okolo 8,2 °C) a nejvyšší v červenci (okolo 21,5 °C). Na jižní polokouli nastává zima v červenci (průměrná teplota je v té době okolo 11,2 °C), léto pak vrcholí v lednu (průměrná teplota okolo 16,5 °C). Rozdíl průměrných teplot mezi létem a zimou na severní polokouli je 13,3 °C, na jižní polokouli jen 5,3 °C. Proto **z celoplanetárního hlediska převažuje vliv polokoule severní a nejvyšší teplota celé planety nastává, když je na severní polokouli léto**.

{% include figure.html
    name="prumerna-teplota-polokoule-des.svg"
    name-mobile="prumerna-teplota-polokoule-mob.svg"
    alt="Čárový graf zobrazující průměrnou teplotu planety a severní a jižní polokoule."
    source-text="Fakta o klimatu, data Climate Reanalyzer"
    source-url="https://climatereanalyzer.org/clim/t2_daily/"
%}

## Jak teplotu planety ovlivňuje změna klimatu?

Graf ročního průběhu průměrných teplot planety za posledních 140 let ukazuje zřetelné oteplování: průměrné teploty v jednotlivých měsících jsou zobrazeny různými barvami – modře ty z let 1880–1920, následující dekády jsou zeleně a žlutě a údaje po roce 2000 jsou červeně. V takto zobrazených datech lze dobře vidět, jak se průměrné teploty planety posouvají k vyšším hodnotám, současné tempo je zhruba 0,2 °C za dekádu. **Planeta se od roku 1880 oteplila přibližně o 1,2 °C**.

{% include figure.html
    name="gistemp.png"
    alt="Sezónní průběh teplot planety"
    caption="Sezónní průběh teplot planety"
    source-text="NASA GISSTEMP"
    source-url="https://data.giss.nasa.gov/gistemp/graphs_v4/graph_data/GISTEMP_Seasonal_Cycle_since_1880/graph.html"
%}

Při pohledu na obrázek je také snadné pochopit, proč se místo teploty planety obvykle používá koncept **teplotní odchylky** (někdy též *teplotní anomálie*): v souvislosti s globálním oteplováním totiž není zajímavé, jaká byla teplota planety v konkrétním měsíci (třeba v únoru), ale jak moc je tento únor teplejší než průměrný únor v nějakém referenčním období[^referencni-obdobi] (v tomto článku je používáno stejné referenční období, s jakým pracuje Climate Reanalyzer, tedy 1979–2000).

Konkrétní příklad: v únoru roku 1999 byla průměrná teplota planety 13,0 °C a v červenci téhož roku 16,2 °C. Červenec byl o několik stupňů teplejší než únor, což ale vzhledem k obvyklému ročnímu průběhu teploty není nijak překvapivé. Srovnání teplot těchto dvou měsíců s průměrnými hodnotami teplot za období 1979–2000 však už dává jiný obrázek. Červencová teplota planety v roce 1999 odpovídala průměrným hodnotám za dané období, kdežto únorová teplota byla o 0,3 °C vyšší než průměrné hodnoty březnových teplot v tomto období. Tedy: v únoru 1999 byla sice planeta chladnější než v červenci, ale únor byl znatelně teplejší, než by bylo obvyklé (červenec byl průměrný).

Tento *rozdíl* mezi průměrnou teplotou konkrétního měsíce v daném roce a průměrem teplot pro tento měsíc za referenční období se nazývá *teplotní odchylka*.[^anomalie] Výpočtům a vlastnostem teplotní odchylky bude věnován samostatný text.

## Čím jsou způsobeny krátkodobé výkyvy v teplotě planety?

Kromě dlouhodobého trendu oteplování lze v teplotě planety sledovat i krátkodobé výkyvy. K tomu je potřeba se podívat na teplotu planety v denním rozlišení, aktuální data jsou k dispozici například na stránce [Climate Reanalyzer](https://climatereanalyzer.org/clim/t2_daily/).

{% include figure.html
    name="prumerna-denni-teplota-des.svg"
    name-mobile="prumerna-denni-teplota-mob.svg"
    alt="Čárový graf zobrazující průměrnou teplotu planety a denní teplotu planety v letech 2022 a 2023."
    source-text="Fakta o klimatu, data Climate Reanalyzer"
%}

Tyto výkyvy souvisejí s aktuálním počasím v konkrétním regionu – tedy momentálním rozložením teplé a studené vzduchové hmoty a stavem teplých a studených mořských proudů. Dalším důležitým faktorem je pak fáze jevu El Niño (přesněji řečeno fáze tzv. [Jižní oscilace](https://cs.wikipedia.org/wiki/El_Ni%C3%B1o)).

Během intenzivních vln veder v jižní Evropě, na jihu USA a v Číně v červenci 2023 přesáhl jeden takový výkyv planetární teploty hodnotu 17,2 °C. Tento rekord přitáhl pozornost médií, protože dosud nikdy v historii měření (přesněji řečeno v historii reanalýz) nepřesáhla teplota planety 16,9 °C a navíc byl dosavadní rekord překonán o 0,3 °C, což je v kontextu průměrné teploty planety opravdu hodně. Pravděpodobně to byl okamžik, kdy planeta dosáhla nejvyšší teploty za posledních 125 000 let (tedy od konce předchozí doby meziledové). V tomto výkyvu zřejmě hrálo roli více faktorů: nástup velmi silného El Niña, snížení aerosolového stínění v důsledku odsíření lodní dopravy, extrémní tání mořského ledu v okolí Antarktidy a slabší větry nad Atlantikem, které snížily promíchávání povrchových vod.

Dá se nicméně očekávat, že tato hodnota bude v dalších letech znovu překonána, protože **globální oteplování se zastaví nejdříve v druhé polovině 21. století**.

## Poznámky a zdroje

[^referencni-obdobi]: V kontextu klimatické změny se jako referenční období používá nejčastěji tzv. pre-industriál (léta 1850–1900). K němu se například vztahuje i hranice oteplení 1,5 °C zmíněná v Pařížské dohodě. Jiná referenční období používají meteorologové – zpravidla jsou to poslední tři dekády. ČHMÚ proto obvykle uvádí teplotní anomálie vztažené k referenčnímu období 1990–2019. V tomto článku jsou referenčním obdobím roky 1979–2000 (se stejným obdobím pracuje i Climate Reanalyzer). Používání různých referenčních období je někdy trochu matoucí, zejména pro laickou veřejnost, a věci zbytečně komplikuje.

[^anomalie]: Z praktického hlediska je možná ještě důležitější, že na rozdíl od průměrné teploty planety je teplotní anomálie robustní koncept. Nezávisí totiž na hustotě nebo konkrétním rozmístění sítě měřicích stanic, není k němu nutná vzájemná kalibrace stanic a není podstatným způsobem ovlivněn případnými výpadky měření.

[^ref-obdobi-min-max]: Tyto hodnoty nejvyšších a nejnižších průměrných teplot planety jsou z období 1979–2008.

[^climatereanalyzer]: **Climate Reanalyzer** je projekt vědců z americké University of Maine, který shromažďuje a analyzuje data ze satelitních a staničních měření. Reanalýzy počasí na území jednotlivých států jsou vcelku běžnou záležitostí, dělá je například i Český hydrometeorologický ústav. Climate Reanalyzer je jeden z projektů, který poskytuje reanalýzy pro celou planetu, navíc veřejně a ve snadno dostupném formátu.

[^reanalyza]: Populární vysvětlení konceptu *reanalýzy* nabízí například krátké video [(copernicus.eu)](https://climate.copernicus.eu/providing-consistent-picture-changes-climate-and-air-quality). Úplnější přehled o vývoji těchto metod i o aktuálně dostupných reanalýzách lze najít na stránkách vědecké komunity [Reanalyses.org](https://reanalyses.org/).

[^reanalyzy-rozdily]: Jednotlivé reanalýzy se mírně liší ve výpočtech interpolací nebo v tom, jak podrobně se snaží modelovat horské oblasti. V důsledku toho vychází v různých reanalýzách různé hodnoty aktuální průměrné teploty planety. Reanalýzy se ale prakticky shodují ve výsledcích teplotní anomálie (teplotní odchylky). Podrobnější diskuzi o spolehlivosti reanalýz lze najít např. na webu [RealClimate](https://www.realclimate.org/index.php/archives/2017/08/observations-reanalyses-and-the-elusive-absolute-global-mean-temperature/).

