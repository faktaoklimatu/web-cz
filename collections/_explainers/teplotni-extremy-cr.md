---
layout:      explainer
title:       "Jak se mění počet extrémně teplých a extrémně studených dní v Česku?"
slug:        "teplotni-extremy-cr"
published:   2023-02-20
author:      "Ondráš Přibyla"
weight:      80
tags-scopes: [ cr ]
tags-topics: [ klima ]
cover-source-author: ""
cover-source-license: ""
cover-source-license-url: "https://creativecommons.org/licenses/by-sa/3.0"
cover-source-text: "Rozvodněná Vltava při plavebních komorách u Dětského ostrova, Wikimedia Commons"
cover-source-url: "https://commons.wikimedia.org/wiki/File:Povodn%C4%9B_v_Praze,_05.jpg"
perex:       "Na Silvestra roku 2022 vystoupila teplota v pražském Klementinu na hodnotu 17,7 °C. Předchozí Silvestr, tedy roku 2021, to bylo o něco méně, 14,4 °C. Nicméně nevjyšší silvestrovské teploty bývaly v Klementinu okolo 2,3 °C, takže poslední dva Silvestry byly opravdu výjimečně teplé. Zdá se, že také v létě přichází vlny veder častěji a opakovaně padají teplotní rekordy. Nabízí se tedy otázka: <strong>Mění se počet podobných výjimečně teplých dní, nebo je jich víceméně stejně, jako jich bývalo dříve? A jak jsou na tom výjímečně chladné dny?</strong>"
---
## Pojmy a zarámování

Abychom mohli na tuto otázku poskytnout odpověď podloženou daty, musíme si nejprve vyjasnit pár konceptů:

- Máme-li posuzovat, zda je denní teplota běžná nebo extrémní, **musíme si vždy říct kdy** – pro který den **a kde** – na jakém místě. Například 25 °C je v létě docela běžná teplota, ale na konci října už jde o extrém. Podobně teploty pod −10 °C nejsou v zimě na horách velké překvapení, ale v nížině může jít i v zimě o výjimečně chladný den.[^max-avg-min]
- **Výjimečnost dne budeme posuzovat podle toho, o kolik je teplejší nebo chladnější, než bychom čekali.** Tedy zajímá nás, jak velký je teplotní rozdíl mezi teplotou, která byla změřena, a průměrnou teplotou pro konkrétní den a místo. Většina dní v roce se od průměrné teploty pro daný den příliš neliší – zhruba 75–80 % dní v roce je v intervalu plus minus pět stupňů od průměrné teploty pro daný den. Takové teplotní odchylky můžeme považovat za běžné. Je-li den o více než 5 °C teplejší než teplotní normál[^teplotni-normal] pro daný den, budeme ho považovat za *výrazně teplejší* a je-li teplejší o více než 10°C, budeme o něm mluvit jako o *extrémně teplém*. Podobně za *výrazně* a *extrémně chladnější* budeme považovat dny, které jsou o 5 °C nebo 10 °C chladnější než teplotní normál pro daný den.
- **Počty výjimečně teplých a chladných dní budeme srovnávat s obdobím 1961–1980**[^referencni-obdobi] a kdykoliv v následujícím textu použijeme slovo *dříve*, myslíme tím právě roky 1961–1980. Proč zrovna takto? Od roku 1961 máme dostatečné množství pravidelně měřících meteostanic na celém území ČR, takže máme dostatek dat, abychom mohli podrobně porovnávat s dalšími dekádami. Zároveň budeme moci srovnat tři dvacetiletky: 1961–1980, 1981–2000 a 2001–2020, které zhruba odpovídají dobám, kdy se vyrůstaly generace X, mileniálové a generace Z. Můžeme se pak lépe vztáhnout ke vzpomínkám, které jsou uvozeny větou "…v době mého mládí".

{% include figure.html
    name="pojmy-zaramovani-des.png"
    alt="TODO ALT TEXT"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Ukažme si úvahy nejprve na konkrétních příkladech. Kdybychom porovnali všechny Silvestry v Klementinu od roku 1961 až do roku 2022, zjistíme, že ten v roce 2022 byl zdaleka nejteplejší. Jen šestkrát se od roku 1961 stalo, že silvestrovské teploty přesáhly hodnotu 10 °C.[^silvestry-v-praze] A nejchladnější silvestr v Klementinu byl v roce 1996, kdy teplota nevystoupila nad −9,7 °C. V průměru bývala *dříve*, tedy v letech 1961–1980, nejvyšší denní teplota 2,3 °C.[^prumery-v-praze] **Silvestr v roce 2022 byl o celých 15,4 °C teplejší než jaký býval průměrný silvestr dříve.** Tomuto rozdílu teploty pro konkrétní den v daném roce od průměrné teploty pro ten stejný den říkáme *teplotní odchylka*.

{% include figure.html
    name="silvestry-klementinum-des.svg"
    alt="TODO ALT TEXT"
    source-text="Fakta o klimatu, ČHMÚ"
    source-url="https://faktaoklimatu.cz"
%}

{:.todo}
(V beeswarm grafu je důležité zobrazit absolutní teploty, odchylky a pásma "běžné" (±5°C), (±8°C) a (±10°C))

Podobný výpočet můžeme provést pro jiný den, nebo jiné místo v Česku. Třeba o letním slunovratu v červnu 2021 byla v Brně naměřena nejvyšší denní teplota 32,1 °C.[^slunovrat-brno] V průměru tam o letních slunovratech bývaly *dříve* teploty 22,8 °C[^max-teploty] a tedy letní slunovrat z roku 2021 byl o 9,3 °C teplejší než dříve.

{% include figure.html
    name="slunovraty-turany-des.svg"
    alt="TODO ALT TEXT"
    source-text="Fakta o klimatu, ČHMÚ"
    source-url="https://faktaoklimatu.cz"
%}

Teploty pro konkrétní dny a konkrétní stanice si můžete porovnat na webu [Envidata](https://envidata.cz/dataAnalysis/jakbylo/stationSelect.php?parameter=T).

## Co je běžná proměnlivost počasí a co jsou již výjimečné teploty?

Když si podobné výpočty teplotní odchylky provedeme pro různé dny v roce a různé meteostanice, zjistíme, že **teplotní odchylka deset a více °C od průměrné teploty pro daný den je vzácná**. *Dříve* takový den nastával v průměru jen asi <span class="todo">šestkrát</span>[^min-avg-max2] za celý rok, z toho průměrně tři dny v roce bývaly o více než 10 °C teplejší a tři dny o více než 10 °C chladnější než normál pro daný den. Menší odchylky od normálu jsou ale častější a dny s teplotní odchylkou do plus minus 5 °C by nás neměly vůbec překvapovat. Takových dní je zhruba 75–80 % dní v roce".[^diskuse-bezne]

Kdybychom to opět chtěli ilustrovat na příkladech, můžeme říct, že *dříve* bývaly *běžně* o Silvestrech v Klementinu nejvyšší denní teploty mezi <span class="todo">−4,4 °C a +6,4 °C</span>. O letním slunovratu v Brně bývaly *běžně* nejvyšší denní teploty mezi <span class="todo">17,7 °C a 27,7 °C</span>. Na horách je  samozřejmě o kus chladněji než v nížinách, takže například pro slunovraty na Lysé hoře bývaly běžné nejvyšší denní teploty mezi <span class="todo">9,5 °C a 19,5 °C</span>.[^lysa-hora]

{% include figure.html
    name="slunovraty-lysa-hora-des.svg"
    alt="TODO ALT TEXT"
    source-text="Fakta o klimatu, ČHMÚ"
    source-url="https://faktaoklimatu.cz"
%}

## Jak se mění počty výjimečně teplých dní?

Nyní se můžeme podívat, jak se počty výjimečně teplých dní mění a jako příklad si vezmeme stanici Brno-Tuřany. Zatímco v letech 1961–1980 bývalo *výrazně teplejších* dní (TA > +5 °C) asi 41 ročně, v letech 1981–2000 už to bylo 60 ročně a v letech 2001–2020 již 79 ročně. Co tato čísla znamenají? Výrazně teplé dny jsou rozloženy v průběhu celého roku: ty zimní vnímáme jako oblevy, letní jako extrémní horka a na podzim je považujeme za teplé babí léto. Ale přibývá jich podstatným způsobem a můžeme říci, že generace Z zažívá více než dvakrát více výrazně teplých dní než generace X.

Podobně se posouvá i počet *extrémně teplých* dní (TA > +10 °C). V letech 1961–1980 býval takový den průměrně třikrát do roka, ale v letech 2001–2020 už jich máme 8 za rok.

{% include figure.html
    name="teple-dny-des.svg"
    class="narrow-figure"
    alt="TODO: ALT TEXT"
    source-text="Fakta o klimatu, ČHMÚ"
    source-url="https://faktaoklimatu.cz"
%}

## Jak se mění počty výjimečně chladných dní?

Výjimečně chladných dnů naopak ubývá, což si opět můžeme ukázat na datech ze stanice Brno-Tuřany. Zatímco v letech 1961–1980 bývalo *výrazně chladnějších* dní (TA < −5 °C) asi 43 ročně, v letech 1981–2000 klesl jejich počet na 40 a v letech 2001–2020 na 31 dní v roce. Podobně jako teplé dny, i výrazně chladnější dny se mohou vyskytovat v průběhu celého roku a podle toho je vnímáme buď jako velmi mrazivé dny v zimě, jarní mrazíky na jaře, nebo prudká ochlazení v létě. Můžeme říci, že současná generace jich zažívá ani ne polovinu oproti svým rodičům.

Pro *extrémně chladné* dny (TA < −10 °C) ale není pokles tak jednoznačný, v průměru přicházejí stále 1–3 ročně. (2,2× v období 1961–1980, 2,8× v období 1981–2000 a 2× v období 2001–2020). Tedy zatímco extrémně teplých dní zřetelně přibývá, extrémně chladné dny se vyskytují víceméně podobně často.

{% include figure.html
    name="chladne-dny-des.svg"
    class="narrow-figure"
    alt="TODO ALT TEXT"
    source-text="Fakta o klimatu, ČHMÚ"
    source-url="https://faktaoklimatu.cz"
%}

## Histogram teplotních odchylek a jeho vývoj

Podrobně lze posun rozložení teplotních odchylek zobrazit v tzv. histogramu. Na něm zřetelně vidíme několik zajímavých vlastností počasí:

- Většina teplotních odchylek je v blízkosti 0 °C. To znamená, že většina dní má teplotu docela blízkou teplotnímu normálu pro daný den.
- Jen málo dní má teplotní odchylku vetší než 10 °C a odchylky větší než 13 °C se prakticky nikdy nevyskytují.
- Histogram se postupně posouvá. Jeho střed se mezi obdobími 1961–1980 a 2001–2020 posunul o necelé 2 °C, což odpovídá faktu, že Česká republika se za posledních 60 let oteplila o 2 °C.[^diskuse-otepleni]
- Extrémně teplých dní postupně zřetelně přibývá, úbytek extrémně chladných dní je méně zřetelný.

{% include figure.html
    name="histogram-anomalii-des.png"
    alt="TODO ALT TEXT"
    source-text="Fakta o klimatu, ČHMÚ"
    source-url="https://faktaoklimatu.cz"
%}

## Souvislosti ze světa, teplotní rekordy a budoucí vývoj

- Teplotní odchylky nám mohou pomoci srovnávat variabilitu počasí a teplotní extrémy i mezi různými místy na planetě. Tropy a pobřežní oblasti mívají typicky nižší variabilitu počasí a tedy užší histogramy teplotních odchylek, naopak kontinentální a arktické oblasti mívají větší variabilitu a tedy i širší histogramy. Pokud se ale budeme držet v oblastech mírného pásma, můžeme teplotní odchylky pro extrémní teploty srovnávat v podstatě přímo. Když v červenci 2022 zasáhla extrémní vlna veder Anglii a v Londýně naměřili 40 °C, odpovídá to teplotní odchylce více než 15 °C. Tato vlna veder je právem považována za naprosto extrémní a atribuční analýzy ukazují, že bez klimatické změny by taková vlna veder vůbec nemohla přijít.

{:.todo}
(ověřit s Jáchymem)

- Meteorologové se občas zmiňují o teplotních rekordech a jejich překonávání. Prakticky ve vždy platí, že teplotní rekord pro daný den měl teplotní odchylku více než 10 °C. Nejvyšší teplotní odchylka od normálu z let 1961–1980 zaznamenaná na území ČR je <span class="todo">ZZ °C</span>.

- S pokračujícím oteplováním se budou zvyšovat i počty extrémně teplých dní. Statistické modelování ukazuje, že počty *výrazně teplejších* dní (TA > +5 °C) by mohly v období 2021–2040 dosáhnout hodnot okolo <span class="todo">110 dní za rok</span> (což je téměř třetina roku) a *extrémně teplých* budou zřejmě pravidelně více než 10 za rok. To bude mít samozřejmě dopady na přírodu (dřívější kvetení a sklizeň ale i větší sucha v létě). Podrobnější předpovědi z klimatických modelů ukazuje CzechGlobe na webu [klimatickazmena.cz](https://www.klimatickazmena.cz/cs/)

{:.todo}
(ověřit s Matějem)

## Zdroje a poznámky

[^max-avg-min]: Je to ještě o trošku komplikovanější: v průběhu dne se můžeme zaměřit na nejvyšší denní teplotu (ta bývá zpravidla odpoledne), nejnižší denní teplotu (brzy ráno) anebo průměrnou denní teplotu. Jak ale ukazujeme ve výpočtech [zde](https://github.com/faktaoklimatu/data-analysis/blob/extremy/notebooks/teplotni-extremy-cr.ipynb), jsou odchylky mezi nejnižší, nejvyšší a průměrnou denní teplotou navzájem dobře korelované a tedy analýza počtu výjimečně telých nebo chladných dní dopadne podobně nezávisle na tom, zda dny porovnáváme podle nejnižší, nejvyšší nebo průměrné denní teploty. Další analýzy dopadnou se mohou nepatrně lišit, když se se namísto nejvyšší denní teplotu zaměříme na průměrnou nebo nejnižší, ale celkový charakter četnosti jednotlivých typů dní se nijak významně nezmění.

[^min-avg-max2]: Opět se budou údaje lišit podle toho, zda se zaměřujeme na nejvyšší denní, nejnižší denní nebo průměrné denní teploty: Teplotní odchylka o velikosti 10 °C a více od denního normálu se *dříve* vyskytovala v průměru šestkrát za rok pro nejvyšší denní teplotu, dvakrát za rok pro průměrnou denní teplotu a XX krát za rok pro minimální denní teplotu (na stanici Brno-Tuřany). Ve všech případech jsou dny s tak velkou teplotní odchylkou velmi vzácné, nicméně pro nejvyšší denní a nejnižší denní nastávají malinko častěji než pro průměrnou denní teplotu.

[^teplotni-normal]: Teplotní normál je průměrná teplota pro daný den (například Silvestr) za referenční období. Jako referenční období používáme v tomto článku roky 1961–1980.

[^referencni-obdobi]: Zároveň v celé této analýze používáme 1961–1980 jako referenční období, tedy k tomuto období se vztahují teplotní normály pro jednotlivé dny.

[^silvestry-v-praze]: Bylo to v letech 1978, 1993, 2006, 2006, 2021 a 2022.

[^prumery-v-praze]: S postupných globálním oteplováním se to mírně mění. V letech 1961–1980 byla průměrná nejvyšší teplota v Klementinu o silvestru 2,3 °C, v letech 2001–2020 už to bylo 4,4 °C.

[^slunovrat-brno]: Teploty pro jednotlivé dny v Brně-Tuřanech: https://www.envidata.cz/dataAnalysis/jakbylo/T.php?ID=B2BTUR01

[^max-teploty]: V těchto příkladech srovnáváme tzv. denní maxima, neboli nejvyšší denní teploty. Jak ukazujeme v technické diskusi, statistiky se významně nezmění ani když bychom uvažovali o průmerných denních teplotách nebo o denních minimech.

[^diskuse-bezne]: Tento údaj se mírně liší pro průměrné denní a nejvyšší denní teploty. Podrobněji to můžeme vidět skrze percentily. Pro *průměrné* denní teploty v Brně-Tuřanech vychází 1. a 9. decil teplotní odchylky na −3,30 °C a +3,14 °C (pro období 1961–1980). Pro nejvyšší denní teploty je rozptyl o něco větší, 1. a 9. decil teplotní odchylky nejvyšší denní teploty vychází na −4,27 °C a +4,05 °C. Je ale praktičtější říct si, že za běžné budeme považovat teplotní odchylky do ±5 °C od denního normálu. V případě srovnávání průměrných denních teplot pak do tohoto rozmezí spadne 84 % dní, v případě nejvyšších denních teplot pak 77 % dní. Takto vycházjí percentily pro Brno-Tuřany, jiné stanice v ČR se budou mírně lišit.

[^lysa-hora]: Tadydle https://envidata.cz/dataAnalysis/jakbylo/T.php?ID=O1LYSA01

[^diskuse-otepleni]: Přesněji to lze říci takto: Stanice Brno-Tuřany se otepluje s trendem <span class="todo">XX °C za dekádu a tedy mezi roky 1970 a 2010, což jsou středy dvou zmíněných období, se oteplila o 4 × XX °C</span>. Tento posun vidíme na histogramu. Česko se otepluje <span class="todo">YY za dekádu, což mezi roku 1970 a 2010 dělá 4 × YY °C</span>, ale mezi koncovými roky období, tedy mezi 1961 a 2022 to je 2 °C.

