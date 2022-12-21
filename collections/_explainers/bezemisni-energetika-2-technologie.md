---
layout:      explainer
title:       "Z čeho můžeme v Česku vyrábět bezemisní elektřinu?"
series-id:   "serie-elektrina-2050-cr"
series-order: "II"
slug:        "bezemisni-energetika-2-technologie"
published:   2022-09-15
author:      "Jan Krčál"
weight:      50
tags-scopes: [ eu, cr ]
tags-topics: [ energetika ]
cover-source-author: "Karsten Würth"
cover-source-license: "Unsplash licence"
cover-source-license-url: "https://unsplash.com/license"
cover-source-text: "Unsplash"
cover-source-url: "https://unsplash.com/photos/0w-uTa0Xz7w"
perex: |
  Abychom mohli energetiku dekarbonizovat dostatečně rychle, potřebujeme významně posílit bezemisní zdroje elektřiny. Tento text se zaměřuje na možnosti výroby, které jsou dnes technologicky dostupné a dají se v ČR využít.
---

{% include series-box.html series-id=page.series-id selected=page.slug %}

{% include tldr.html content="
- Zásadními zdroji bezemisní elektřiny v Česku mohou být **slunce a vítr**. Kvůli vyrovnanosti výroby během roku bude **klíčový rozvoj větrné energetiky**.
- Pomocí **jaderné energetiky** nemůžeme pokrýt celou spotřebu země dostatečně rychle. Udržení nebo mírné navýšení současné výroby z jádra nicméně může dekarbonizaci energetiky ulehčit.
- Když nesvítí a nefouká, máme na výběr z řady **nízkoemisních flexibilních zdrojů**. Nicméně vyrábět elektřinu z nich je zpravidla dražší než vyrábět ze slunce, větru či jádra. Je tedy důležité [vybudovat v ČR energetický mix](/explainery/bezemisni-energetika-1-scenare) tak, abychom tyto flexibilní zdroje potřebovali co nejméně.
" %}

_V tomto textu najdete přehled základních technologií pro bezemisní či nízkoemisní výrobu elektřiny. Více o možnostech jejich kombinace do nízkoemisního mixu se dočtete [v předchozím dílu](/explainery/bezemisni-energetika-1-scenare) série._
{: .longread-small}

Než se pustíme do zkoumání možností jednotlivých technologií, připomeňme základní škálu problému, který řešíme. Dnes v Česku spotřebujeme okolo 60 TWh elektřiny ročně. Do roku 2050 očekáváme výrazný nárůst spotřeby, hlavně kvůli elektrifikaci části dopravy, vytápění a průmyslu. Odhady tohoto nárůstu se mírně liší, pro účely tohoto textu nám bude stačit dobře zapamatovatelný hrubý odhad: **v roce 2050 budeme potřebovat pokrýt zhruba 100 TWh spotřeby za rok**.

## Slunce a vítr

**Slunce a vítr jsou už dnes zdrojem elektřiny s nejnižšími celkovými náklady** (a to i v českých podmínkách, kde např. 1 m<sup>2</sup> solárního panelu vyrobí za rok jen okolo 1,3 MWh elektřiny oproti 2 MWh na jihu Španělska[^OZE-potencial]). Celkové náklady na výrobu elektřiny z nové větrné nebo solární elektrárny jsou dnes dokonce asi 2x nižší než pouhé provozní náklady na výrobu z hnědého uhlí.[^OZE-cena]

### Slunce
{% include figure.html
    class="wide-figure-desktop"
    name="solar-des.svg"
    name-mobile="solar-mob.svg"
    alt="Přehled vlastností solárních zdrojů"
    source-text="Fakta o klimatu"
%}

**I v českém prostředí je možné vyrobit ze slunce několikanásobek celkové roční spotřeby elektřiny.** Potenciál pro tuto výrobu na nejvhodnějších plochách (střechy, fasády, bývalé povrchové doly, brownfieldy apod.) je [významný](/infografiky/potencial-solarni-energie-cr-strechy), ale omezený. Prakticky neomezený potenciál má zemědělská krajina. Solární panely na polích sice vzbuzují odpor obyvatel, je ale třeba si uvědomit, že **hektar solárních panelů dokáže vyrobit zhruba 30x více energie než hektar řepky pěstované na bionaftu.** Za tímto účelem přitom u nás řepku pěstujeme asi na [1 300 km2](https://eagri.cz/public/web/file/682857/SVZ_Olejniny_12_2020.pdf), což je plocha, která by na pokrytí naší současné spotřeby elektřiny stačila. Navíc dnes již existují i kompromisní řešení, například tzv. agrivoltaika, kdy se půda využívá dvojím způsobem – k pěstování zemědělských plodin, které lépe rostou ve stínu než na přímém slunci a daří se jim pod vysoko umístěnými, řídce osazenými solárními panely. V Česku je ale tento slibný přístup[^OZE-agrivoltaika-zdroje] zatím [v počátcích](https://www.agromanual.cz/cz/clanky/management-a-legislativa/management/agrivoltaika-v-podminkach-ceske-republiky).

### Vítr
{% include figure.html
    class="wide-figure-desktop"
    name="wind-des.svg"
    name-mobile="wind-mob.svg"
    alt="Přehled vlastností větrných zdrojů"
    source-text="Fakta o klimatu"
%}

I když vítr hodně fouká především u moře a to u nás nemáme, i tak můžeme s pomocí větru pokrýt znatelnou část své spotřeby. [Studie](https://www.ufa.cas.cz/DATA/vetrna-energie/Potencial_vetrne_energie_2020.pdf) Ústavu fyziky atmosféry AV ČR odhaduje technický potenciál výroby z tohoto zdroje v Česku na cca 70 TWh / rok. [Realizovatelný potenciál](/infografiky/potencial-vetrne-energie-cr) do velké míry závisí na podpoře obyvatel a politiků – řádově se dá odhadnout na 10—30 TWh / rok.

**Slunce a vítr k sobě potřebují flexibilní zdroje**, které rozebíráme níže. Zásadním problémem u solárních a větrných elektráren je totiž proměnlivost jejich výroby.
<!--Krátkodobému bezemisnímu vyrovnávání výroby ze slunce a větru a možnostem různých technologií se podrobněji věnujeme v dalším dílu série. -->
V tomto textu se zabýváme především sezónní proměnlivostí – solární zdroje nejvíc vyrábějí na jaře a v létě, větrné naopak na podzim a v zimě.

**Pro sezónně vyrovnanou výrobu v ČR z větru a slunce je potřeba, aby výrazně převažovala výroba z větru** (alespoň v poměru 3:1 ve prospěch větru[^OZE-vyvazeny-mix]). V Česku ale zatím máme značnou převahu výroby ze slunce (cca 3:1 ve prospěch slunce). To rozhodně neodpovídá rozložení spotřeby. Kdybychom rozvíjeli obnovitelnou výrobu v tomto poměru, vyžadovalo by to velké akumulační kapacity, tedy mít do čeho elektřinu ukládat, abychom ji mohli využít, když slunce tolik nesvítí:

{% include figure.html
    name="solar-wind-seasonality-des.svg"
    name-mobile="solar-wind-seasonality-mob.svg"
    alt="Slunce a vítr se mohou vhodně doplňovat."
    caption="Grafy ukazují hypotetickou výrobu ze slunce a větru v Česku na úrovni 60 TWh za rok, v poměru 3:1 a 1:3. Výroba je rozložená do jednotlivých měsíců podle průměrů za roky 2015–2020. Srovnáváme to s čistou spotřebou v jednotlivých měsících, opět průměrnou za roky 2015–2020."
    source-text="Fakta o klimatu"
%}

## Jádro

### Konvenční jádro
{% include figure.html
    class="wide-figure-desktop"
    name="nuclear-conventional-des.svg"
    name-mobile="nuclear-conventional-mob.svg"
    alt="Přehled vlastností konvenčních jaderných zdrojů"
    source-text="Fakta o klimatu"
%}

**Jádro může být jedním ze stavebních kamenů bezemisní výroby elektřiny.** Evropská komise jej navrhuje přechodně do roku 2045 povolit v [taxonomii](/infografiky/taxonomie-eu) jako udržitelnou investici, což zjednodušuje financování nových jaderných projektů. Podmínkou je vytvoření národních plánů na vybudování trvalého úložiště jaderného odpadu do roku 2050.

**Nové jaderné elektrárny či bloky u nás mohou hrát roli v období po roce 2040. Nijak nám ale nepomáhají snižovat emise skleníkových plynů v nejbližších letech** (podle emisních závazků EU a ČR). Plánování a stavba těchto elektráren v Evropě totiž v poslední době trvá i více než 20 let, přičemž mnoho nedávných projektů nedokázalo ani zdaleka dodržet původní časový plán.[^jadro-zpozdeni]

**Stavba nových jaderných bloků s sebou nese velké investiční riziko a relativně vysoké náklady. Je tak pro ni obtížné se prosadit v prostředí liberalizovaného trhu.** V posledních desetiletích nedošlo v Evropě k žádné stavbě čistě na tržní bázi[^Hinkley] a také ČEZ se v posledních deseti letech opakovaně bránil vstupu do nového jaderného bloku na vlastní tržní riziko. S pokračujícím rozvojem výroby z větru a slunce bude situace na [trhu s elektřinou](https://faktaoklimatu.cz/explainery/cena-elektriny-na-trhu) pro jaderné bloky [čím dál složitější](http://open-electricity-economics.org/book/text/05.html#4-the-impact-of-renewable-energy). Časté nadbytky výroby z obnovitelných zdrojů totiž budou snižovat průměrnou cenu elektřiny na burze a tím i zisky provozovatelů jaderných zdrojů, případně je ve chvílích nadbytku budou tlačit ke snížení výroby.[^jadro-flexibilni] Rozvoj jaderné energetiky tedy závisí na podpoře od státu.

**K zajištění dostatečné výroby v Česku by zdaleka nestačilo postavit jeden či dva bloky.** Kdybychom chtěli jádrem pokrýt většinu budoucí spotřeby ČR, řekněme 90 TWh za rok, potřebovali bychom instalovaný výkon okolo 12 GW. Dnes máme asi 4 GW, z toho 2 GW v současných Dukovanech nejspíš budeme muset do roku 2050 uzavřít. Zároveň [probíhá tendr](https://ct24.ceskatelevize.cz/domaci/3456182-zive-brifink-premiera-fialy-po-navsteve-jaderne-elektrarny-dukovany) na jeden nový blok v Dukovanech o velikosti 1,2 GW. Takových nových bloků bychom ovšem do roku 2050 museli postavit 8. To by najednou vyžadovalo nemyslitelné množství financí, expertní kapacity a obrovské investiční riziko. Kromě toho bychom museli pro stavbu využít další lokality, což není snadné vzhledem k odporu místních obyvatel.

Vzhledem k těmto vlastnostem jaderných elektráren a rychlosti rozvoji obnovitelných zdrojů je realistické uvažovat buď o odklonu od jaderné energetiky, nebo jen o jejím omezeném rozvoji.[^jadro-know-how]

### Malé modulární reaktory (SMR)
{% include figure.html
    class="wide-figure-desktop"
    name="nuclear-smr-des.svg"
    name-mobile="nuclear-smr-mob.svg"
    alt="Přehled vlastností SMR"
    source-text="Fakta o klimatu"
%}

**Malé modulární reaktory (SMR) mohou přispět k rychlejšímu rozvoji jádra ve 30. a 40. letech.** Jde o [pestrou škálu](https://aris.iaea.org/Publications/SMR_booklet_2022.pdf) technologií, která slibuje menší reaktory (s elektrickým výkonem řádově 10—300 MW), jež by mělo být možné sériově vyrábět v továrně a v podstatě hotové je dopravovat na místo použití. Díky svému pasivnímu designu by měly být také bezpečnější, protože v případě krizové situace vydrží déle bez zásahu operátorů a bez dodávky elektřiny zvenku. Tyto vlastnosti by měly přispět k výrazně snazšímu rozšíření této technologie. Ministerstvo průmyslu a obchodu už připravuje rámec pro jejich výstavbu v ČR. V našich podmínkách mohou být obzvláště atraktivní při dekarbonizaci velkých tepláren.

**SMR nejsou a v nejbližších letech nebudou komerčně dostupné.** Přes intenzivní výzkum a vývoj panuje kolem této technologie spousta nejistoty. Prosadí se vůbec? Jak rychle je bude možné škálovat? Jaká bude jejich cena a jak rychle bude tato cena klesat? Z tohoto důvodu není vhodné o nich uvažovat jako o jediném řešení pro dekarbonizaci. V dalších dekádách ale mohou zpestřit paletu našich možností.

## Doplňkové flexibilní zdroje

Kromě již zmíněných zdrojů lze k výrobě elektřiny využít i další technologie. Ty mohou v budoucím nízkoemisním mixu jen těžko hrát stěžejní úlohu, mohou nám ale posloužit jako zdroje doplňkové, jejichž výkon můžeme regulovat dle potřeby. Pro fungování celé soustavy jsou tyto flexibilní zdroje naprosto klíčové, protože mohou dodávat elektřinu, když právě nesvítí či nefouká (a nebo je některý z jaderných bloků v nečekané odstávce). V dalším textu se zaměřujeme na dnešní hlavní technologie, i když je samozřejmě možné, že se později v praxi prosadí něco úplně jiného.

Protože se v tomto textu soustředíme na výrobu elektřiny, nebudeme podrobně rozvádět **geotermální zdroje**. Ty jsou v Česku [velmi důležitým bezemisním zdrojem **tepla**](https://www.ekonews.cz/nova-mapa-ukazuje-kde-se-daji-v-cesku-hloubit-geotermalni-vrty-energie-ze-zeme-ma-potencial/), příp. chladu. Z těchto zdrojů je možné (ve vybraných lokalitách v Česku) vyrábět spolu s teplem i elektřinu. Z pohledu dnešních nákladů je ale potenciál na výrobu elektřiny z geotermálních zdrojů v Česku nízký (v porovnání s ostatními technologiemi, které zde představujeme).

### Hydro
{% include figure.html
    class="wide-figure-desktop"
    name="hydro-des.svg"
    name-mobile="hydro-mob.svg"
    alt="Přehled vlastností vodních zdrojů"
    source-text="Fakta o klimatu"
%}

**Potenciál vodních elektráren v Česku je malý a využíváme jej téměř naplno.**[^pocencial-hydro] S ohledem na ochranu krajiny je navíc v dnešní Evropě velmi těžké prosadit stavbu nové velké přehrady. Můžeme tedy v ČR dál rozvíjet síť malých vodních elektráren, ty ale elektřiny vyrobí jen málo a z hlediska budoucí spotřeby nejsou příliš významné.

**Vodní elektrárny mají určitou flexibilitu**, např. vyšší výrobou ráno a večer doplňují výrobu ze slunce. Množství vody za rok je však omezené a přehrady musí vždy alespoň nějakou vodu pouštět. Zhruba 40 % výroby je tak neflexibilní (v posledních letech se v ČR minimální výkon hydra pohybuje mezi 70–100 MW, průměrný výkon za celý rok pak mezi 200 a 300 MW).

### Biomasa
{% include figure.html
    class="wide-figure-desktop"
    name="biomass-des.svg"
    name-mobile="biomass-mob.svg"
    alt="Přehled vlastností biomasy jako zdroje"
    source-text="Fakta o klimatu"
%}

{% include expander-figure.html
    name="about-biomass"
    class="contrast-figure"
    label="Kontext: Jak se vyrábí energie z biomasy?"
    content="
**Biomasa se dá využívat různými způsoby.** Ve výrobě elektřiny to je hlavně:
1. **Přímé spalování rostlinné hmoty** v elektrárnách a teplárnách, které se podobají těm uhelným.
2. **Výroba bioplynu** anaerobní fermentací (bez přístupu vzduchu). V plynovém spalovacím motoru se dá z bioplynu vyrábět elektřina a teplo.
3. **Výroba biometanu** pročištěním bioplynu. Biometan lze vtlačit do plynárenské sítě a dále spalovat např. v paroplynových elektrárnách.

Mimo výrobu elektřiny se biomasa ve velkém používá k **vytápění** a také se z ní vyrábějí **kapalná biopaliva** (u nás typicky bionafta z řepky\*).

{:.longread-tiny}
\* Dnes se biopaliva používají velmi neefektivně – přimíchávají se plošně do nafty. Není ovšem možné vyrobit dost biopaliv na to, abychom tím zásadně pohnuli emisemi v silniční dopravě. V budoucnu mohou tato paliva sloužit k dekarbonizaci vybraných oblastí, kde jiné technologie nebudou k dispozici (uvažuje se o části letecké, námořní nebo dálkové kamionové dopravy).
"
%}

**Využití odpadů a zbytků** je podstatným zdrojem biomasy – využít se dají odpadní vody, organická složka komunálního odpadu, hnůj, zbytky ze sklizně nebo odřezky ze zpracování dřeva (štěpka). **Potenciál odpadních a zbytkových surovin k výrobě elektřiny je ale omezený.** Mnohé z nich totiž mají i další uplatnění: využívají se jako krmivo pro dobytek, k výrobě tepla, jako organické hnojivo či jako masa uhlíku, který je možné přirozeně <glossary id='sekvestrace'>uložit v půdě</glossary>.

**Cílené pěstování energetických plodin** je dalším zdrojem biomasy – mezi ně patří například kukuřice, řepka, ozdobnice obrovská (miscanthus) nebo stromy. **Potenciál cíleně pěstované biomasy je ale také omezený.** Má to dvě příčiny:
- **Energetické plodiny jsou oproti jiným zdrojů energie velmi málo efektivní.** Na jednom hektaru zemědělské půdy je možné za rok vypěstovat biomasu na výrobu 20–30 MWh elektřiny[^vynos-biomasa], tedy veškerá zemědělská půda ČR (přes 4 mil. hektarů) by dodala 85–125 TWh ročně.

- **Energetické plodiny soutěží o prostor s plodinami zemědělskými a také s přírodou**, využití veškeré zemědělské půdy v ČR na biomasu je samozřejmě nemyslitelné. I celosvětově musíme být obezřetní, na nízkých cenách potravin závisí živobytí lidí v chudých zemích.

**Biomasa v energetice může mít vysoké nepřímé emise.** Z hlediska klimatu dává tento zdroj smysl pouze při lokálním využití nebo při transportu nízkoemisní dopravou. Potřebujeme, aby energie získaná z biomasy výrazně převýšila energii vloženou do pěstování, sklizně a přepravy.

Přes všechny tyto výhrady může biomasa díky snadnému skladování hrát **důležitou roli ve vyrovnávání výkyvů ve výrobě ze slunce a větru**.

### Uhlí nebo zemní plyn s CCS
{% include figure.html
    class="wide-figure-desktop"
    name="ccs-des.svg"
    name-mobile="ccs-mob.svg"
    alt="Přehled vlastností zdrojů v kombinaci s CCS"
    source-text="Fakta o klimatu"
%}

{% include expander-figure.html
    name="about-ccs"
    class="contrast-figure"
    label="Kontext: Jak funguje CCS?"
    content="
**CCS je souhrnný název pro různé postupy na zachytávání odpadního oxidu uhličitého a jeho trvalé uložení do podzemního úložiště.**\* K ukládání se využívají jednak geologické útvary jako _solné vodonosné vrstvy_ a jednak vytěžená naleziště ropy a zemního plynu (kde CO<sub>2</sub> v rámci techniky [_enhanced oil recovery_](https://en.wikipedia.org/wiki/Enhanced_oil_recovery) umožňuje další těžbu).

**CCS se může v budoucnu významně využívat i mimo elektroenergetiku**:
- Při **dekarbonizaci průmyslových procesů jako výroba cementu, železa, oceli** atd. (při této výrobě se totiž CO<sub>2</sub> uvolňuje jinou reakcí než hořením fosilních paliv).
- Jako **technický nástroj k dosažení záporných emisí <glossary id='sekvestrace'>sekvestrací uhlíku</glossary>**, nasazený na elektrárnu či teplárnu na biomasu (_bioenergy with CCS_, _BECCS_) nebo jako zařízení na zachytávání uhlíku přímo z atmosféry (_direct air capture_, _DAC_).

{:.longread-tiny}
\* Místo trvalého ukládání uhlíku se uvažuje i o jeho využití v průmyslu (_carbon capture and utilization_, _CCU_). Nevýhodou tohoto postupu je, že je takový uhlík obvykle časem znovu vypuštěn do atmosféry. To platí zejména při využití uhlíku k výrobě syntetických paliv.
"
%}

**Technologie CCS je zatím do velké míry nerozvinutá**: na celém světě je dnes v provozu pouze [jedna elektrárna](https://en.wikipedia.org/wiki/Boundary_Dam_Power_Station) v Kanadě (a potom [další zařízení](https://www.sciencedirect.com/science/article/pii/S2590332221005418) mimo elektroenergetiku, obvykle využívaná při zpracování zemního plynu). Většina CCS projektů ohlášených ve světě v minulé dekádě byla zrušena, kolem úspěšného rozvoje této technologie a realizace nových projektů tedy panuje značná nejistota. Kromě toho **CCS závisí na infrastruktuře pro trvalé ukládání**, která zatím není ve střední Evropě k dispozici a vyžaduje nový systém potrubí transportující CO<sub>2</sub> do úložiště. V současnosti takovou infrastrukturu rozvíjí např. [Norsko](https://www.iea.org/policies/12675-ccs-project-longship).

**CCS neznamená nulové emise.** Dokáže zachytit pouze cca 85–95 % přímých emisí a nezachytí nepřímé emise při těžbě a přepravě fosilních paliv, takže např. plynové turbíny s CCS nejsou zdaleka klimaticky neutrální. Kromě toho vyžaduje CCS další rozvoj fosilní těžby a je těžké zaručit, že se významná část paliv z takových projektů skutečně spálí s použitím CCS. **CCS navíc prodlužuje naši závislost na státech, které produkují fosilní paliva.**

Přes všechny tyto problémy **mohou fosilní elektrárny s CCS hrát důležitou roli při vyrovnávání výkyvů v produkci ze slunce a větru.** Úspěšný rozvoj CCS v Česku ale  bude záviset na podpoře vlády, protože příprava úložiště CO<sub>2</sub> s sebou zatím nese příliš mnoho nejistot a rizika pro soukromé investory. Další zdroje informací o CCS najdete v [naší rešerši](/studie/2022-reserse-ccs).

### Plynové turbíny na zelený nebo modrý vodík
{% include figure.html
    class="wide-figure-desktop"
    name="hydrogen-des.svg"
    name-mobile="hydrogen-mob.svg"
    alt="Přehled vlastností vodíkových zdrojů"
    source-text="Fakta o klimatu"
%}

{% include expander-figure.html
    name="about-hydrogen"
    class="contrast-figure"
    label="Kontext: Jaké typy vodíku existují a k čemu je vodík potřeba?"
    content="
**Vodík je už dnes důležitá surovina v chemickém průmyslu** a celosvětově se jej spotřebuje okolo [90 Mt za rok](https://www.iea.org/fuels-and-technologies/hydrogen). Existuje několik hlavních způsobů jeho výroby (ty se označují barvami podle emisní náročnosti):
- **šedý** (naprostá většina dnešní produkce): vyrábí se primárně ze zemního plynu pomocí štěpení vodní parou ([_methane steam reforming_](https://en.wikipedia.org/wiki/Steam_reforming)), přičemž jako vedlejší produkt vzniká CO<sub>2</sub>.
- **modrý** (malá část dnešní produkce): na celý proces lze aplikovat CCS, čímž vzniká relativně nízkoemisní vodík. Na světě je zatím několik zařízení vyrábějících modrý vodík (to největší v rafinérii [Port Arthur v USA](https://www.airproducts.com/company/innovation/carbon-capture#/) zachytí každý rok asi 1 Mt CO<sub>2</sub> a vyrobí řádově několik set tisíc tun vodíku za rok).
- **zelený** (zanedbatelná část dnešní produkce): vyrábí se z nadbytků bezemisní elektřiny pomocí elektrolýzy vody.

**Kromě využití v energetice je vodík klíčový i pro dekarbonizaci dalších odvětví, která je náročné elektrifikovat:**
- jako palivo při výrobě oceli a cementu, kde je elektrifikace komplikovaná kvůli příliš vysokým teplotám výrobních procesů;
- jako palivo pro námořní dopravu a část kamionové dopravy;
- jako palivo pro leteckou dopravu (vodík je možné převést do formy syntetických paliv velmi podobných palivům fosilním a využít je v běžném leteckém motoru).
"
%}

**Vodík lze využít jako velkokapacitní energetické úložiště pro elektřinu ze slunce a větru**, když je jí v síti nadbytek. Vodík je možné ekonomicky skladovat ve velkém objemu a na delší dobu v podzemních zásobnících. Potom se z něj dá vyrábět elektřina v paroplynových blocích, které se podobají těm na zemní plyn.[^vodik-turbiny] Díky relativně snadnému skladování na zimu je vodík také potenciálním kandidátem pro dekarbonizaci tepláren.

**Podíl zeleného vodíku má stoupat.** V rámci plánu [REPowerEU](https://ec.europa.eu/commission/presscorner/detail/en/IP_22_3131) chce EU **do roku 2030 dosáhnout roční spotřeby 20 Mt vodíku**. Polovina se má vyrábět uvnitř EU a polovina dovážet z dalších států (např. ze severu Afriky). To není málo – na výrobu těchto 20 Mt zeleného vodíku je potřeba asi 1 000 TWh bezemisní elektřiny navíc (tedy asi 35 % současné [roční spotřeby EU](https://ember-climate.org/data/data-explorer/)), a není proto jasné, zda se tento plán podaří realizovat.

**Ani 20 Mt ročně nenasytí poptávku EU, protože větší část vyrobeného vodíku bude nejspíš potřeba mimo energetiku.** Pro přibližnou orientaci: ze zmíněných 20 Mt vodíku ročně by se dalo zpětně vyrobit jen asi 350 TWh elektřiny (přibližně 12 % současné roční spotřeby EU), tedy jen třetina elektřiny, která se spotřebuje na výrobu tohoto vodíku. Pro vyrovnávání výkyvů ve výrobě ze slunce a větru je to ale i tak velké číslo, např. podle [progresivního scénáře](https://ember-climate.org/data/data-tools/european-clean-power-pathways-explorer/) think tanku Ember bude v roce 2050 na vyrovnání výkyvů v celé Evropě potřeba jen asi 110 TWh elektřiny z vodíku.

### Technologie na krátkodobé vyrovnávání

**Tyto technologie nejsou primárním zdrojem elektřiny.** Umožňují pouze na daném místě o malý čas posunout její výrobu (pomocí ukládání elektřiny) nebo spotřebu (pomocí flexibility spotřeby). Proto se jim v tomto textu podrobně nevěnujeme.

<!-- Více detailů najdete v navazujícím textu o vyrovnávání sítě. -->

**Krátkodobé vyrovnávání se už dnes do značné míry využívá.** V Česku jsou nejvýznamnější:
- **přečerpávací vodní elektrárny** na straně výroby (za rok vyrobí [zhruba 1 TWh](https://www.eru.cz/sites/default/files/import_files/Rocni_zprava_provoz_ES_2020.pdf)) a
- **nízký tarif** na straně spotřeby (za rok se v něm spotřebuje [přes 10 TWh](https://www.eru.cz/sites/default/files/import_files/Rocni_zprava_provoz_ES_2020.pdf)).

Je třeba dodat, že 1 TWh spotřebovaná v nízkém tarifu neposkytuje zdaleka takovou flexibilitu jako 1 TWh dodaná z přečerpávací elektrárny. Pomáhá ale snižovat rozdíl mezi spotřebou ve dne a v noci.

Při velkém zastoupení slunce a větru v energetickém mixu budeme krátkodobé vyrovnávání potřebovat výrazně víc, řádově 5–20 TWh za rok. Přečerpávací elektrárny nicméně není v ČR možné příliš rozšiřovat, takže **pro krátkodobé vyrovnávání bude nutné rozšíření nových technologií** (např. lithiové baterie apod.[^flexibilita-nastroje]).

## Závěr

**V České republice můžeme pro nízkoemisní výrobu elektřiny rozvíjet řadu technologií.** Některé jsou dostupné a cenově výhodné už teď, třeba solární a větrné elektrárny (a z určitého pohledu i konvenční jaderné zdroje). Další, například vodíkové technologie, malé modulární reaktory, příp. i CCS, mohou k větší komerční zralosti dospět už v průběhu této dekády.

Nicméně je třeba dodat, že s každou z těchto hlavních technologií je spojeno nějaké podstatné omezení. Většina výroby ze slunce je koncentrována do relativně málo hodin během teplejší poloviny roku. Větrná energetika zase má v Česku omezený potenciál na to, aby dokázala spolehlivě pokrýt spotřebu v chladnější části roku. Jaderné zdroje narážejí na velmi dlouhou dobu výstavby a vysoké investiční náklady, tedy i velké investiční riziko. Proto není úplně samozřejmé, že Česko skutečně dojde k levnému a stabilnímu energetickému mixu. O to víc potřebujeme možné scénáře posuzovat komplexně a **na další rozvoj elektroenergetiky v ČR mít vypracovaný dlouhodobý plán**.

## Poznámky a zdroje

[^OZE-potencial]: Světový solární potenciál mapuje [globalsolaratlas.info](https://globalsolaratlas.info), větrný pak [globalwindatlas.info](https://globalwindatlas.info).
[^OZE-cena]: Celkové náklady spojené s výrobou ze slunce a větru jsou dnes v ČR okolo 50 EUR / MWh. Většinu z toho tvoří náklady investiční, protože tyto elektrárny nepotřebují žádné palivo ani emisní povolenky. U hnědého uhlí jsou jen samotné provozní náklady elektrárny přibližně 100 EUR / MWh, u zemního plynu i přes 300 EUR / MWh. Cenu výroby z uhlí zvyšuje rostoucí cena emisních povolenek, cenu výroby ze zemního plynu pak (hodně proměnlivá) cena této suroviny.
[^OZE-agrivoltaika-zdroje]: Pro Česko zatím není k agrivoltaice zpracována žádná relevantní studie, další vhledy by měl poskytnout probíhající [výzkumný projekt](https://www.isvavai.cz/cep?ss=detail&h=SS05010243). V angličtině se dá najít zdrojů mnoho: základní přehled nabízí např. [popularizační video](https://www.youtube.com/watch?v=lgZBlD-TCFE) ze série _Undecided_, pro geograficky podobné Německo zpracoval [studii](https://www.ise.fraunhofer.de/en/publications/studies/agrivoltaics-opportunities-for-agriculture-and-the-energy-transition.html) _Frauenhofer Institut_.
[^OZE-vyvazeny-mix]: Pro budoucí spotřebu bude ovšem český optimální mix odlišný. Optimální mix totiž vždy závisí na podnebí dané země: zatímco povětrnost se často kryje se spotřebou tepla, oslunění se překrývá s provozem klimatizací. V českých podmínkách by tedy v případě větší elektrifikace vytápění bylo vhodné ještě vyšší zastoupení elektřiny z větru oproti slunci, cca v poměru 4:1 nebo 5:1.
[^jadro-zpozdeni]: Příprava jaderného projektu trvá alespoň 5–10 let, např. u reaktoru Dukovany 5 počítaly [plány](https://www.idnes.cz/ekonomika/domaci/cez-dukovany-jaderne-bloky-dostavba-ekologie-jadro-energetika.A191113_174721_ekonomika_rts) v roce 2019 se zahájením výstavby až v roce 2029. Délka výstavby pak v poslední době často dalece překračuje 10 let. Např. výstavba finského bloku Olkiluoto 3 [trvala](https://oenergetice.cz/rychle-zpravy/finska-jaderna-elektrarna-olkiluoto-dosahla-kritikality-standardni-provoz-bude-zahajen-nejdrive-cervnu) 17 let (místo odhadovaných 4), u francouzského bloku Flamanville 3 se dnes [odhaduje](https://oenergetice.cz/jaderne-elektrarny/novy-jaderny-blok-flamanville-3-se-kvuli-pandemii-prodrazi-opet-zpozdi) na 16 let (místo původních 6), u britských bloků Hinkley Point C se dnes [odhaduje](https://oenergetice.cz/jaderne-elektrarny/jaderna-elektrarna-hinkley-point-c-hlasi-zpozdeni-1-blok-by-mel-zahajit-vyrobu-pul-roku-pozdeji) na 10 let (místo původních 8, elektrárna je ale zatím v rané fázi výstavby).
[^Hinkley]: Např. u Hinkley Point C ve Velké Británii [garantuje vláda](https://www.gov.uk/government/collections/hinkley-point-c) výkupní cenu okolo 110 EUR / MWh.
[^jadro-flexibilni]: Pro energetiku s velkým podílem obnovitelných zdrojů jsou relativně vhodné novější flexibilní jaderné reaktory, které dokáží rychle regulovat výkon. Takové technické možnosti má velká část reaktorů 3. generace. Třeba francouzský reaktor Belleville 1 má instalovaný výkon 1,3 GW, během cca 2 hodin však dokáže z plného výkonu přejít na minimální výkon 300 MW. Snížením výkonu může provozovatel optimalizovat náklady v časech nadvýroby ze slunce a větru. Širší kontext nabízí například [zpráva IEA](https://iea.blob.core.windows.net/assets/ad5a93ce-3a7f-461d-a441-8a05b7601887/Nuclear_Power_in_a_Clean_Energy_System.pdf) o roli jádra v bezemisní energetice.
[^jadro-know-how]: Jistým argumentem pro opatrný rozvoj je také udržení českého know-how v oblasti výstavby a provozu jaderných zdrojů. To by přispělo k diverzifikaci rizika v budoucnu.
[^pocencial-hydro]: Podle [závěrů](https://www.mzp.cz/cz/vodni_elektrarny_vyuziti_analyza) výzkumného projektu z roku 2015 je nevyužitý potenciál malých vodních elektráren v ČR asi 0,23 TWh za rok.
[^vynos-biomasa]: Výpočet je založen na [odhadu výnosu](https://onlinelibrary.wiley.com/doi/10.1111/j.1365-3040.1995.tb00565.x) ozdobnice (miscanthus) až 0,78 W/m<sup>2</sup> (ve spalném teple) a na předpokladu 45% účinnosti konverze na elektřinu, tedy celkově zhruba 0,35 W/m<sup>2</sup> (v elektřině). To také přibližně odpovídá [odhadu](https://www.withouthotair.com/c6/page_43.shtml) 0,15–0,3 W/m<sup>2</sup>, který udělal David MacKay ve své knize _Sustainable Energy – without the hot air_. Výnos 0,35 W/m<sup>2</sup> dá 3,5 kW/ha, tedy asi 30 MWh za rok na jeden hektar.
[^vodik-turbiny]: V současnosti není zatím na trhu žádná turbína, která by dokázala spalovat 100% vodík. Například Siemens [nabízí](https://www.siemens-energy.com/global/en/priorities/future-technologies/hydrogen/zehtc.html) turbíny, které dokáží spalovat směs 75 % vodíku a 25 % zemního plynu, a turbíny na 100% vodík chce mít na trhu do roku 2030.
[^flexibilita-nastroje]: Možné technologie na straně výroby: např. baterie, gravitační úložiště, tepelná úložiště, úložiště na stlačený vzduch – u všech těchto technologií ovšem potřebujeme dosáhnout výrazného zlevnění. Na straně spotřeby: individuálně řízená flexibilita spotřeby v domácnostech (zahrnuje elektroauta, nová tepelná čerpadla a elektrické bojlery) a flexibilita spotřeby v průmyslu.
