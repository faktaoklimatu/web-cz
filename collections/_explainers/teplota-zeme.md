---
layout:      explainer
title:       "Jaká je průměrná teplota planety Země?"
slug:        "teplota-zeme"
published:   2023-08-29
authors:
  - id: "ondras-pribyla"
  - id: "jirka-lnenicka"
    minor-role: "editace"

weight:      74
tags-scopes: [  ]
tags-topics: [  ]
cover-source-author:        ""
cover-source-text:          "Pixabay"
cover-source-license:       "Pixabay License"
cover-source-license-url:   "https://pixabay.com/service/license-summary/"
cover-source-url:           ""
perex:       "Průměrná teplota planety se pohybuje okolo 15°C a s postupující klimatickou změnou pomalu roste tempem zhruba 0,2°C za dekádu. Otázka průměrné teploty planety je ale trochu komplikovanější - záleží totiž například na ročních obdobích - a vyplatí se podívat na ni podrobněji."
---

**Průměrná teplota planety** je dobře definovaný koncept. V textech o Zemi nebo v odborných článcích však na něj narazíte jen zřídka. Jedním z důvodů je, že průměrná teplota planety moc reprezentativní. Teploty na planetě Zemi mají obrovský rozptyl - v Antarktidě jsou běžné teploty -60°C, v tropických oblastech pak okolo +40°C  - a průměrnou teplotu planety si prostě nelze představovat jako něco mezi Antarktidou a tropy.

Vědět jak se mění průměrná teplota planety je užitečné pro pochopení dynamiky planetárního klimatu - tím se budeme zabývat v tomto článku. Koncept teplotní anomálie, který se v praxi používá mnohem častěji, zde jen zběžně ukážeme a podrobněji bude vysvětlen v jiném textu.  

## Jak se měří průměrná teplota planety?

Kdybychom měli hustou síť měřicích stanic, které by pokrývaly celou planetu, dala by se průměrná teplota planety spočítat prostě průměrováním okamžitých naměřených hodnot. Potíž je v tom, že síť měřicích stanic není dostatečně hustá (zejména v některých opuštěných oblastech pouští či na oceánech), ale také v tom, že ne všechny stanice měří stále a mohou mít výpadky. Matematické metody a modelování ale umožňují s docela velkou přesností spočítat, jaká by byla teplota planety kdybychom takovou ideální hustou sítˇ měřicích stanic skutečně měli.

Teplota planety, tak jak ji počítá [Climate Reanalyser](https://climatereanalyzer.org/clim/t2_daily/)[^climatereanalyser] je výstupem modelu počasí, který každé tři hodiny vezme dostupná data z meteorologických stanic a družicových měření, dopočítá počasí v oblastech mezi stanicemi, a každý den výslednou teplotu zprůměruje přes posledních 24 hodin a přes celý povrch planety.

Ukazuje se, že různé *reanalýzy*[^climatereanalyser] (tedy modely, které takto dopočítávají teplotní data) docházejí k velmi podobným výsledkům zejména v odchylkách teploty. Jinak řečeno, výsledky modelů jsou vcelku spolehlivé a pokud jeden model říká, že aktuální teplota planety je o např. 1,5°C teplejší než normál pro daný den, bude i v ostatních modelech vycházet stejná teplotní odchylka[^reanalyse_differences]. 


## Jak se mění teplota planety během roku?

Teplota planety v průběhu roku kolísá. Minimum nastává v lednu a bývá okolo 12,3°C, maximum nastává koncem července a bývá okolo 16,3°C. Takto to alespoň bývalo dříve[^ref_max], ale klimatická změna teplotní průběhy postupně zvedá směrem k vyšším teplotám, což podrobněji vysvětlujeme níže. 

{% include figure.html
    name="prumerna-teplota-planety-des.svg"
    name-mobile="prumerna-teplota-planety-mob.svg"
    alt="Průměrná teplota planety v průběhu roku"
    source-text="Fakta o klimatu, data Climate Reanalyzer"
    source-url="https://climatereanalyzer.org/clim/t2_daily/"
%}

Proč se teplota planety v průběhu roku takto mění? Hlavní důvod je rozložení kontinentů. Většina jich je na severní polokouli a protože se teplota nad kontinenty mění v průběhu roku více než nad oceány, převažuje vliv ročních období na severní polokouli.

{% include figure.html
    name="polokoule-pevnina-des.svg"
    name-mobile="polokoule-pevnina-mob.svg"
    alt="Obrázek znázorňující podíl pevniny a oceánů na polokoulích. Severní polokoule má 40 % pevniny, zatímco jižní pouze 20 %."
    source-text="Fakta o klimatu, data Wikipedia"
    source-url="https://en.wikipedia.org/wiki/Hemispheres_of_Earth"
%}

 Podívejme se podrobněji na průběhy teplot na severní a na jižní polokouli: **Průměrná teplota severní polokoule je nejnižší v lednu**, okolo 8,2°C,  a nejvyšší v červenci, okolo 21,5°C. **Na jižní polokouli nastáva zima v červenci** a průměrná teplota jižní polokoule je v té době okolo 11,2°C. Léto na jižní polokouli vrcholí v lednu, kdy je její průměrná teplota okolo 16,5°C. Rozdíl průměrných teplot  mezi létem a zimou je 13,3°C pro severní polokouli, zatímco pro jižní polokouli jen 5,3°C. Proto v celoplanetárním pohledu převažuje vliv severní polokoule a nevyšší teplota planety nastává když je na severní polokouli léto.  

{% include figure.html
    name="prumerna-teplota-polokoule-des.svg"
    name-mobile="prumerna-teplota-polokoule-mob.svg"
    alt="Čárový graf zobrazující průměrnou teplotu planety a severní a jižní polokoule."
    source-text="Fakta o klimatu, data Climate Reanalyzer"
    source-url="https://climatereanalyzer.org/clim/t2_daily/"
%}

## Jak se mění teplota planety v souvislosti se změnou klimatu?

Graf ročního průběhu průměrných teplot planety za posledních 140 let ukazuje zřetelné oteplování: Průměrné teploty v jednotlivých měsících jsou zobrazeny různou barvou - modře ty z let 1880-1920, následující dekády zeleně a žlutě a údaje po roce 2000 červeně. V takto zobrazených datech můžeme dobře vidět jak se průměrné teploty planety posouvají k vyšším hodnotám tempem zhruba 0,2°C za dekádu.  Planeta se od roku 1880 oteplila přibližně o 1,2°C.

{% include figure.html
    name="gistemp.png"
    alt="Sezónní průběh teplot planety"
    caption="Sezónní průběh teplot planety"
    source-text="NASA GISSTEMP"
    source-url="https://data.giss.nasa.gov/gistemp/graphs_v4/graph_data/GISTEMP_Seasonal_Cycle_since_1880/graph.html"
%}

Pohledem na obrázek můžeme také snadno pochopit, proč se místo teploty planety používá koncept **teplotní odchylky**(někdy také *teplotní anomálie*): V souvislosti s globálním oteplováním není zajímavé jaká byla teplota planety v konkrétním měsíci - třeba únoru, ale jak moc je tento únor teplejší než průměrný únor v nějakém referenčním období[^referencni_obdobi]. V tomto článku se vztahujeme k referenčnímu období 1979-2000. 

Ukažme si to na konkrétním příkladu: V únoru roku 1999 byla průměrná teplota planety 13,0°C, a v červenci téhož roku 16,2°C. Červenec byl o několik stupňů teplejší než únor - to ale vzhledem k běžnému ročnímu průběhu teploty není nijak překvapivé.  Když však srovnáme teplty těchto dvou měsíců s průměrnými hodnotami teplot za období 1979 - 2000, získáme jiný obrázek.  Červencová teplota planety v roce 1999 odpovídala průměrným hodnotám za dané období, kdežto únorová teplota byla o 0,3°C vyšší než průměrné hodnoty březnových teplot v tomto období. Zjednodušeně: v únoru 1999 byla sice planeta v únoru chladnější než v červenci, ale únor byl znatelně teplejší než bychom čekali, zatímco červenec byl průměrný.  

Tento *rozdíl* mezi teplotou konkrétního mměsíce a průměrnou hodnotou teplot pro daný měsíc za referenční období se nazývá *teplotní odchylka* (někdy také *teplotní anomálie*)[^T_anomaly]. Podrobně se výpočtům a vlastnostem teplotní odchylky budeme věnovat v samostatném textu. 

## Čím jsou způsobeny krátkodobé výkyvy v teplotě planety?

Kromě dlouhodobého trendu oteplování můžeme sledovat i krátkodobé výkyvy v teplotě planety. K tomu je potřeba se podívat na teplotu planety v denním rozlišení a aktuální data můžete vidět například na stránce [Climate Reanalyzer](https://climatereanalyzer.org/clim/t2_daily/).

{% include figure.html
    name="prumerna-denni-teplota-des.svg"
    name-mobile="prumerna-denni-teplota-mob.svg"
    alt="Čárový graf zobrazující průměrnou teplotu planety a denní teplotu planety v letech 2022 a 2023."
    source-text="Fakta o klimatu, data Climate Reanalyzer"
%}

Tyto výkyvy souvisí s aktuálním regionálním počasím - tedy s tím jak jsou zrovna rozloženy teplých a studených vzduchové hmoty a jaký je stav teplých a studených mořských proudů. Dalším důležitým faktorem je  fáze El Nino (přesněji řečeno fáze tzv. [Jižní oscilace](https://cs.wikipedia.org/wiki/El_Ni%C3%B1o)).

V červenci 2023, když probíhaly silné vlny veder v Jižní Evropě, na jihu USA a v Číně,    
jeden takový výkyv planetární teploty přesáhl hodnotu 17,2°C. Tento rekord přitáhl pozornost médií, protože dosud nikdy v historii měření (přesněji řečeno v historii reanalýz) nepřesáhla teplota planety 16,9°C a dosavadní rekord byl překonán o 0,3°C což je v kontextu průměrné teploty planety opravdu hodně a byl to nejspíš okamžik, kdy planeta dosáhla nejvyšší teploty za posledních 125 000 let (od konce předchozí doby meziledové). V tomto výkyvu hrálo roli zřejmě více faktorů: nástup velmi silného El nina, snížení aerosolového stínění v důsledku odsíření lodní dopravy, extrémní tání mořského ledu v okolí Antarktidy a slabší větry nad Atlantikem, které snížily promíchávání povrchových vod.   

Můžeme nicméně očekávat, že tato hodnota bude v dalších letech překonána, protože globální oteplování se zastaví nejdříve až v druhé polovině 21. století.



## Poznámky a zdroje


[^referencni_obdobi]: V kontextu klimatické změny se jako referenční období používá nejčastěji tzv. pre-industriál (který je definován jako 1850-1900). K němu se například vztahuje i hranice oteplení 1,5°C zmíněná v Pařížské dohodě. Jiná referenční období používají meteorologové - zpravidla poslední tři dekády - takže v ČHMÚ zpravidla uvádí teplotní anomálie vztažené k referenčnímu období 1990-2019. V tomto článku je referenční období 1979-2000. Jestli vám to, že různé skupiny vědců vybírají různá refrenční období připadá jako podivné komplikování něčeho, co by mohlo být jednodušší, máte pravdu. 

[^T_anomaly]: Z praktického hlediska je možná ještě důležitější, že narozdíl od průměrné teploty planety je teplotní anomálie je narozdíl od průměrné teploty planety robustní koncept - nezávisí na hustotě nebo konkrétním rozmístění sítě měřicích stanic, není k němu nutná vzájemná kalibrace stanic a není podstatným způsobem ovlivněn případnými výpadky měření. 

[^ref_max]: Tyto hodnoty nejvyšších a nejnižších průměrných teplot planety jsou z let  1979-2008

[^climatereanalyser]: **Climate reanalyser** je projekt vědců z University of Maine, shromažďující a analyzující data ze satelitních a staničních měření. Tzv. *reanalýzy* počasí na území jednotlivých států jsou vcelku běžná záležitost, dělá je například i ČHMÚ. **Climate Reanalyser** je jeden z projektů poskytujících reanalýzy veřejně ve snadno dostupném formátu a pro celou planetu. 
Populární vysvětlení konceptu *reanalýzy* nabízí například krátké video [(copernicus.eu)](https://climate.copernicus.eu/providing-consistent-picture-changes-climate-and-air-quality). Úplnější přehled o vývoji těchto metod i o aktuálně dostupných reanalýzách lze najít na stránkách věděcké komunity [Reanalysis.org](https://reanalyses.org/). 

[^reanalyse_differences]: Jednotlivé reanalýzy se mírně liší ve výpočtech interpolací nebo v tom, jak podrobně se snaží modelovat horské oblasti. V důsledku toho vychází v různých reanalýzách různé hodnoty aktuální průměrné teploty planety. Reanalýzy se ale prakticky shodují ve výsledcích teplotní anomálie (teplotní odchylky). Podrobnější dikusi spolehlivosti reanalýz lze najít např. na webu [RealClimate](https://www.realclimate.org/index.php/archives/2017/08/observations-reanalyses-and-the-elusive-absolute-global-mean-temperature/). 

