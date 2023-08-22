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

## Jak průměrnou teplotu planety změřit nebo spočítat?

Kdybychom měli hustou síť měřicích stanic, které by pokrývaly celou planetu, dala by se průměrná teplota planety[^prumernateplota] spočítat prostě průměrováním okamžitých naměřených hodnot. Potíž je v tom, že síť měřicích stanic není dostatečně hustá (v některých opuštěných oblastech pouští či na oceánech je spíše řídká), ale také v tom, že ne všechny stanice měří stále a mohou mít výpadky. Matematické metody a modelování ale umožňují s docela velkou přesností spočítat, jaká by byla teplota planety kdybychom takovou ideální hustou sítˇ měřicích stanic skutečně měli.

Teplota planety, tak jak ji počítá [Climate Reanalyser](https://climatereanalyzer.org/clim/t2_daily/)[^climatereanalyser] je výstupem modelu počasí, který každé tři hodiny vezme dostupná data z meteorologických stanic a družicových měření, dopočítá počasí v oblastech mezi stanicemi, a výslednou teplotu zprůměruje přes posledních 24 hodin a přes celý povrch planety.

Pozn.: Ukazuje se, že různé Reanalýzy (tedy modely, které takto dopočítávají teplotní data) docházejí k velmi blízkým výsledkům (rozptyl je do 0,5°C v absolutní hodnotě teploty, ale denní nebo měsíční změny teploty v různých reanalýzách jsou prakticky stejné - jinak řečeno modely se liší v tom, jakou váhu přikládají např výše položeným oblastem - jak hustou síť měřích stanic ve vysokých nadmořských výškách simulují - ale velmi přesně se navzájem shodují na velikosti změn teploty)
https://www.realclimate.org/index.php/archives/2017/08/observations-reanalyses-and-the-elusive-absolute-global-mean-temperature/ 

## Jak se mění teplota planety během roku?

Teplota planety v průběhu roku kolísá. Minimum nastává v lednu a bývá okolo 12,5°C, maximum nastává koncem července a bývá okolo 16,5°C. [pozn tyto hodnoty minim a maxim jsou průměrné hodnoty z let  1979-2008 - check if correct]

{% include figure.html
    name="2mtemp.jpg"
    alt="2mtemp"
    caption="2mtemp"
    source-text="Climate Reanalyzer"
    source-url="https://climatereanalyzer.org/clim/t2_daily/"
%}

Proč se teplota planety takto mění? Hlavní důvod je rozložení kontinentů. Většina jich je na severní polokouli a protože se teplota nad kontinenty mění v průběhu roku více než nad oceány, převažuje vliv ročních období na severní polokouli. Podívejme se podrobněji na průběhy teplot na severní a na jižní polokouli:

{% include figure.html
    name="polokoule.png"
    alt="Průměrná denní teplota v průběhu roku"
%}

{% include figure.html
    name="prumerna-denni-teplota.png"
    alt="Průměrná denní teplota v průběhu roku"
%}

{% include figure.html
    name="prumerna-denni-teplota2.png"
    alt="Průměrná denní teplota v průběhu roku 2"
%}

Na severní polokouli jsou nejnižší teploty v lednu okolo 8,2°C a nejvyšší teploty v červenci okolo 21,5°C. Na jižní polokouli jsou naopak nejvyšší teploty v červenci okolo 11,2°C a nejvyšší teploty v lednu okolo 16,5°C.

https://climatereanalyzer.org/clim/t2_daily/

## Jak se mění teplota planety v souvislosti se změnou klimatu?

Graf ročního průměrných teplot planety v jednotlivých měsících vykreslený za posledních 140 let ukazuje zřetelné oteplování - průměrné teploty planety se posouvají k vyšším hodnotám a planeta se od za tuto dobu oteplila přibližně o 1,2°C.

{% include figure.html
    name="gistemp.png"
    alt="GISTEMP sezónní cyklus"
    caption="GISTEMP sezónní cyklus"
    source-text="NASA"
    source-url="https://data.giss.nasa.gov/gistemp/graphs_v4/graph_data/GISTEMP_Seasonal_Cycle_since_1880/graph.html"
%}

Pohledem na obrázek můžeme také snadno pochopit, proč se místo teploty planety používá koncept teplotní anomálie:  V souvislosti s globálním oteplováním není zajímavé jaká byla teplota planety v konkrétním měsíci - třeba červnu, ale jak moc je tento červen teplejší než průměrný červen v nějakém referenčním období. V kontextu klimatické změny se jako referenční období používá tzv. pre-industriál (který je definován jako 1850-1900). K němu se například vztahuje i hranice oteplení 1,5°C zmíněná v Pařížské dohodě. Jiná referenční období používají meteorologové - zpravidla poslední tři dekády - takže v ČHMÚ zpravidla uvádí teplotní anomálie vztažené k referenčnímu období 1990-2019.

## Jak se mění teplota planety v souvislosti se změnou klimatu?

Když se podíváme na teplotu planety v denním rozlišení (tak jak nabízí [Climate Reanalyzer](https://climatereanalyzer.org/clim/t2_daily/)) uvidíme průběžné kolísání. Tyto výkyvy souvisí s aktuálním regionálním počasím - tedy aktuálním rozložením tlakových výší a níží, teplých a studených vzduchových hmot,  aktuálním stavem teplých a studených mořských proudů nebo fází tzv. [Jižní oscilace (El nino, La Nina)](https://cs.wikipedia.org/wiki/El_Ni%C3%B1o).

V červenci 2023, když probíhaly silné vlny veder v jižní evropě, na jihu USA a v Číně,    
jeden takový výkyv planetární teploty přesáhl hodnotu 17,2°C. Tento rekord přitáhl pozornost médií, protože dosud nikdy v historii měření (přesněji řečeno reanalýz) nepřesáhla teplota planety 16,9°C a dosavadní rekord byl překonán o 0.3°C což je v kontextu průměrné teploty planety opravdu hodně. Byl to nejspíš okamžik, kdy planeta dosáhla navyšší teploty za posledních 125 000 let (od konce předchozí doby meziledové - tato hodnota bude ale v dalších letech nespíše překonána, globální oteplování se zastaví nejspíše až v druhé polovině 21. století.)
[možná vložit výřez dat z CliRea nebo dát interaktivní odkaz na aktuální data - doplněný o popisky os…??]

## Jak souvisí teplota planety a teplotní anomálie? 

V praxi se koncept průměrné teploty planety většinou nepoužívá. Místo něj se uvádí takzvaná teplotní anomálie, neboli odchylka naměřené teploty od dlouhodobého průměru pro daný den, měsíc či rok. Důvody pro častější používání teplotní anomálie jsou dva: 

* V kontextu globálního oteplování nepotřebujeme vědět teplotu planety v určitém měsíci, ale to, o kolik byl daný měsíc v průměru teplejší…
* Teplotní anomálie je narozdíl od průměrné teploty planety robustní koncept - nezávisí na hustotě nebo konkrétním rozmístění sítě měřicích stanic, není k němu nutná vzájemná kalibrace stanic a není podstatným způsobem ovlivněn případnými výpadky měření. 

?? možná v rozbalovátku?? možná stojí za to podrobněji ilustrovat graficky schématem: mapka rozložení teplot (heatmap) a v ní vyznačeny dvě trojice stanic - jedna trojice spíše “v nížinách” druhá spíše na kopcích. Komentář pak řekne že průměr z těch tří hodnot je v jednom případě řekněme 16°C a v druhém třeba 9°C - jinak řečeno, výsledná průměrná teplota závisí na tom, které měřicí stanice vyberu. 
Čím bude síť stanic hustší, tím víc se bude průměr měření blížit “ideálnímu” průměru… Ale podstatné je, že pokud bude celá oblast o 2°C teplejší - např proto, že bude zrovna přecházet teplá fronta, projeví se to v podstatě stejně na horách i v nížinách - odchylka teploty nebude ovlivněna výběrem stanic. 
Podobně se to dá ilustrovat na výpadku měření: když vypadne “horská” stanice, zvýší to “průměrnou teplotu” aniž by se reálně změnilo rozložení teplot.

Matematicky pak to jde zapsat jako: 
průměr odchylek = odchylka průměru - možná má smysl s tím ve vysvětlování začít.

## Poznámky a zdroje

[^prumernateplota]: Průměrná roční teplota je cca 15°C tedy cca 288 K - jak ale píšeme níže, teplota na různých místech kolísá v průběhu roku různě, což vede i k tomu, že celková průměrná teplota planety kolísá v průběhu roku.
[^climatereanalyser]: Climate reanalyser je projekt vědců z University of Maine, shromažďující a analyzující data ze satelitních a staničních měření (Reanalýzy na území jednotlivých států jsou běžná věc, dělá je například i ČHMÚ. Climate Reanalyser je jeden z mála projektů poskytujících reanalýzy celosvětově).