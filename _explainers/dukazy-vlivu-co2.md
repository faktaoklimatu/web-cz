---
layout:      explainer
title:       "Empirické důkazy vlivu CO₂ na klima"
slug:        "dukazy-vlivu-co2"
published:   2021-07-01
author:      "Jakub Zamouřil"
weight:      70
tags-scopes: [ svet ]
tags-topics: [ klima ]
cover-source-author: "ActionVance"
cover-source-text: "Unsplash"
cover-source-license: "Unsplash licence"
cover-source-license-url: "https://unsplash.com/license"
cover-source-url: "https://unsplash.com/photos/t7EL2iG3jMc"
perex:     "Perex: [TODO]"
---

Ve vědecké komunitě se dnes všeobecně přijímá, že současná změna klimatu je způsobena zvyšováním koncentrací skleníkových plynů v atmosféře, a to zejména oxidu uhličitého. Toto přijetí je dáno množstvím empirických důkazů, z nichž některé si představíme v následujícím explaineru.

## Fyzikální pozadí: Proč se klimatologové zabývají zářením a toky energie?

Země je stejně jako ostatní planety obklopena vesmírným vakuem, kterým se energie může šířit pouze ve formě záření. Planety v této formě přijímají energii (teplo) od Slunce a současně také samy slabě tepelně září (tomuto záření planet se říká *albedo*). Ze zákonů termodynamiky vyplývá, že má-li planeta ustálenou teplotu, pak množství záření přijatého od Slunce je stejné jako množství záření, které planeta sama vyzáří.

Atmosféra může způsobit rozdíl mezi tepelným zářením, které vyzařuje povrch planety, a tepelným zářením vycházejícím z horní vrstvy atmosféry (TOA, *top-of-atmosphere*) tím, že část záření pohltí a odrazí zpět k povrchu. Teplota se pak ustálí na vyšší hodnotě, než jakou by planeta měla bez atmosféry. Tomuto mechanismu se říká *skleníkový efekt*.

## Lze skleníkový efekt experimentálně změřit?

Vliv skleníkových plynů na výměnu energie mezi Zemí a okolním vesmírem (neboli *radiační působení skleníkových plynů*) lze vypočítat pomocí fyzikálních modelů. Je to možné díky tomu, že známe fyzikální vlastnosti jednotlivých skleníkových plynů a známe také jejich koncentraci v atmosféře. Nicméně i jejich radiační působení lze přímo experimentálně změřit.

Protože skleníkové plyny část infračerveného záření odráží zpět k Zemi, zesilování skleníkového efektu vede ke snižování množství infračerveného záření, jež uniká do vesmíru, a naopak zvyšování množství infračerveného záření, které přichází k Zemi. Oba tyto jevy byly experimentálně změřeny a potvrzeny.

### Satelitní měření infračerveného záření odcházejícího od Země

Již více než 50 let jsou na oběžné dráze Země satelity vybavené spektrometry, které dokáží měřit spektrum záření odcházejícího od Země. Jedním z prvních takových satelitů byl Nimbus 4 americké agentury NASA (vypuštěn v roce 1970). Od té doby proběhla řada podobných misí, jejichž cílem bylo pozorování naší planety a měření jejích charakteristik. Od vypuštění japonského satelitu ADEOS v roce 1996 pak máme k dispozici měření z nejvyšších vrstev atmosféry téměř nepřetržitě, díky využití různých instrumentů na mnoha dalších satelitech. Tím nejnovějším je NOAA-20, vypuštěný v roce 2017.

{% include figure.html
    name="noaa-20.jpg"
    alt="Počítačová vizualizace satelitu NOAA-20 ve vesmíru."
    caption="Satelit NOAA-20."
    source-text="NASA"
    source-url="https://ceres.larc.nasa.gov/instruments/satellite-missions/"
%}
<!-- TODO: NASA Image License, https://www.nasa.gov/multimedia/guidelines/index.html -->

Naměřené snížení množství infračerveného záření unikajícího do vesmíru mezi lety 1970 a 1996 je zobrazeno v grafu níže. Graf ukazuje relativní výsledek měření v roce 1996 oproti roku 1970. Rovná tečkovaná linka na hodnotě 0 tedy odpovídá měření v roce 1970, zatímco tučná červená křivka odpovídá měření v roce 1996. V grafu je tedy zřetelně vidět, jak se v tomto časovém období snížilo množství záření v infračerveném pásmu, jež od Země odchází.

{% include figure.html
    name="zmena-unikajiciho-zareni.png"
    alt="[TODO]"
    caption="Změna záření unikajícího do vesmíru mezi lety 1970 a 1996, změřená satelitními přístroji."
    source-text="Harries et al. (2001)"
    source-url="http://doi.org/10.1038/35066553"
%}
<!-- TODO: Překlad grafu: [Czechglobe](https://skepticalscience.com/Czech-translation-of-Scientific-Guide-to-Skepticism.html) -->

Zajímavým faktem je, že každý skleníkový plyn zachycuje trochu jiné vlnové délky záření. Které přesně, to záleží na tvaru jeho molekul. Díky tomuto poznatku je pak snížení unikajícího záření na jednotlivých vlnových délkách možné připsat na vrub konkrétním skleníkovým plynům (viz popisky v grafu). Oxid uhličitý např. zachycuje záření zejména na vlnových délkách okolo vlnočtu 670 cm<sup>−1</sup> a 2 300 cm<sup>−1</sup>, metan zase kolem vlnočtu 1 300 cm<sup>−1</sup> a 3 000 cm<sup>−1</sup>.

### Měření infračerveného záření přicházejícího k Zemi

Rostoucí množství infračerveného záření přicházejícího k Zemi bylo naopak zaznamenáno pozemními stanicemi (viz obrázek níže). Na většině světových stanic bylo mezi lety 1973 a 2008 naměřeno zvýšení množství infračerveného záření (oranžově, červeně). Na některých stanicích k výrazné změně nedošlo (zeleně), a na některých se dokonce množství dopadajícího infračerveného záření snížilo (modře). Tyto místní rozdíly lze vysvětlit menším množství vodní páry v dané oblasti v důsledku změny klimatu (oblast je nyní v průměru sušší než dříve), a tedy i lokálním snížením skleníkového efektu.

{% include figure.html
    name="trend-ir-zareni.jpg"
    alt="[TODO]"
    caption="Trend množství infračerveného záření přicházejícího k Zemi mezi lety 1973–2008."
    source-text="Wang & Liang (2009)"
    source-url="https://doi.org/10.1029/2009JD011800"
%}

Celosvětovým trendem u infračerveného záření dopadajícího k Zemi mezi lety 1973–2008 je [postupné zvyšování jeho množství](https://doi.org/10.1029/2009JD011800), a to o 2,2 W/m<sup>2</sup> za dekádu. Tento fakt přitom nelze vysvětlit rostoucím množstvím záření od Slunce či odjinud z vesmíru, neboť toto záření má široké spektrum a nárůst intenzity záření je patrný pouze ve spektru infračerveném – což jasně ukazuje na skleníkové plyny jako původce tohoto zvýšení.

Slunce lze jako příčinu tohoto nárůstu intenzity záření vyloučit ještě ze dvou dalších důvodů. Prvním je jednoduché provádění těchto měření v noci. Výsledky jsou totiž stejné: infračerveného záření přichází k Zemi více. Druhým důvodem jsou pak měření satelitů na oběžné dráze, jež sledují množství záření přicházejícího od Slunce. Podle těchto měření dokonce množství záření přicházejícího od Slunce [v posledních 50 letech mírně klesá](https://doi.org/10.12942/lrsp-2008-3), takže ani v tomto případě nemůže jít o příčinu naměřeného zvýšení.

## Jaký podíl na změně radiačního působení mají jednotlivé skleníkové plyny?

Jak již bylo zmíněno výše, jednotlivé skleníkové plyny zachytávají různé vlnové délky infračerveného záření, a tak je ze změny spektra možné určit jejich podíl na změně klimatu. Navíc se pomocí těchto měření přicházejícího záření dají ověřit také modely radiačního působení skleníkových plynů. Ukazuje se, že existující modely se [velmi dobře shodují s výsledky těchto měření](https://doi.org/10.5589/m04-044).

{% include figure.html
    name="spektrum-dlouhovlnneho-zareni.png"
    alt="[TODO]"
    caption="Spektrum dlouhovlnného záření přicházejícího k Zemi (naměřeno v Kanadě v únoru 2006, nadmořská výška cca 200 m)."
    source-text="Evans & Puckrin (2006)"
    source-url="https://ams.confex.com/ams/pdfpapers/100737.pdf"
%}

Při určování velikosti vlivu jednotlivých skleníkových plynů je ovšem nutné rozlišovat příčiny a důsledky. Největší část skleníkového efektu totiž způsobuje vodní pára. Na její množství v atmosféře ale lidstvo má jen velmi omezený přímý vliv – určité množství vodní páry sice vypouští např. zavlažováním či chlazením, toto množství je však zanedbatelné ve srovnání s množstvím vodní páry vzniklé přirozeným vypařováním (zde je na místě připomenout, že 71 % povrchu Země pokrývají oceány). Koncentrace vodní páry ve vzduchu tedy záleží hlavně na teplotě, protože vyšší teplota znamená vyšší výpar a [teplejší vzduch dokáže zadržet více vodní páry](https://cs.wikipedia.org/wiki/Vlhkost_vzduchu). Kromě toho se vodní pára vyskytuje prakticky výhradně ve spodních 10 km atmosféry, zatímco ostatní skleníkové plyny působí zejména ve vyšších vrstvách.

Když tedy lidstvo způsobí mírné oteplení planety tím, že vypustí skleníkové plyny jako oxid uhličitý, toto oteplení zvýší celkové množství vodní páry ve vzduchu na planetě, a to dodatečně povede k dalšímu oteplení. Vodní pára tedy zesiluje oteplovací efekt ostatních skleníkových plynů.

Se znalostí zvýšení koncentrací skleníkových plynů v atmosféře můžeme fyzikálními výpočty zjistit, že přímé lidské emise jsou celkově zodpovědné za zvýšení záření přicházejícího k Zemi zhruba o 3 W/m<sup>2</sup> a že 2 W/m<sup>2</sup> z toho způsobily emise CO<sup>2</sup>. Nedávno se podařilo tyto hodnoty i [experimentálně změřit za pomoci satelitů](https://doi.org/10.1029/2020GL091585): mezi lety 2003 a 2018 se toto člověkem způsobené radiační působení zvýšilo zhruba o 0,5 W/m<sup>2</sup>. Kvůli zpětným vazbám v klimatu, zejména pak následnému zvýšení množství vodní páry v atmosféře, je však tento efekt několikanásobně zesílen.

## Jak změna radiačního působení mění globální teplotu?

Rostoucí množství přicházejícího záření musí zákonitě způsobit zvýšení teploty. Jak vysoké toto zvýšení bude, lze celkem jednoduše vypočítat – je to stejné, jako když zapnete troubu s určitým výkonem a chcete vypočítat teplotu, na které se ustálí její vnitřek. Výpočty ukazují, že zdvojnásobení množství CO<sub>2</sub> v atmosféře vede ke zvýšení radiačního působení o 3,7 W/m<sup>2</sup>, což by bez dalších zpětných vazeb vedlo k oteplení planety [zhruba o 1 °C](https://pubs.giss.nasa.gov/abs/ha07600n.html).

Ve skutečnosti však v klimatu fungují ještě zpětné vazby – např. zvýšení teploty vede k většímu množství vodní páry v atmosféře a dalšímu oteplení. Jiná zpětná vazba spočívá v tom, že zvýšení teploty způsobuje roztátí sněhu a ledovců, které odrážely velkou část slunečního záření zpět. Tyto a další podobné zpětné vazby způsobují celkové oteplení o [zhruba 3 °C při zdvojnásobení koncentrace CO<sub>2</sub>](https://www.carbonbrief.org/explainer-how-scientists-estimate-climate-sensitivity). Této veličině, tedy globálnímu oteplení způsobenému zdvojnásobením koncentrací CO<sub>2</sub>, se říká *citlivost klimatu*.

## Souhlasí pozorované oteplení s výpočty oteplení způsobeného skleníkovými plyny?

Klimatické modely se používají k predikci působení skleníkových plynů na globální teploty již od 70. let minulého století. Během této doby se průběžně zlepšovaly s tím, jak se zdokonalovala výpočetní technika a zvyšovalo se množství naměřených dat, které byly k dispozici. Ve 21. století jsou již klimatické modely velmi sofistikované a kromě skleníkových plynů modelují celý vodní cyklus, vzdušné a mořské proudění, vliv změn vlhkosti a teploty na rostliny a další parametry ovlivňující zemské klima.

Protože globální oteplování závisí zejména na množství vypouštěných skleníkových plynů a není možné předpovědět, kolik těchto plynů bude lidstvo v příštích dekádách vypouštět, pracují klimatické modely s určitými scénáři, tedy vždy předpovídají oteplení pro dané množství vypuštěných emisí. V současnosti se ukazuje, že [výstupy klimatických modelů se shodují se skutečností](https://climate.nasa.gov/news/2943/study-confirms-climate-models-are-getting-future-warming-projections-right/), tedy že pozorované oteplení je v rámci odchylky stejně velké jako předpovězené oteplení způsobené skleníkovými plyny. Modelovaná velikost přírodních vlivů, jako je sluneční aktivita, vulkanismus a podobně, se blíží nule.

{% include figure.html
    name="predpovezene-otepleni.jpg"
    alt="[TODO]"
    caption="Pozorované globální oteplení (červeně) a oteplení způsobené skleníkovými plyny předpovězené klimatickými modely (černě)."
    source-text="Gavin Schmidt, NASA"
    source-url="https://climate.nasa.gov/news/2943/study-confirms-climate-models-are-getting-future-warming-projections-right/"
%}
<!-- TODO: NASA Image License, https://www.nasa.gov/multimedia/guidelines/index.html -->

## Zdroje a další odkazy

*   Loeb, N. G., Johnson, G. C., Thorsen, T. J., Lyman, J. M., Rose, F. G., & Kato, S. (2021). Satellite and ocean data reveal marked increase in Earth's heating rate. *Geophysical Research Letters*, 48, e2021GL093047. [DOI 10.1029/2021GL093047](https://doi.org/10.1029/2021GL093047)
