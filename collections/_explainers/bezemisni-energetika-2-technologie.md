---
layout:      explainer
title:       "Které technologie k výrobě bezemisní elektřiny můžeme v Česku využít?"
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
  Abychom mohli energetiku dekarbonizovat dostatečně rychle, potřebujeme významně posílit bezemisní zdroje elektřiny. Tento text se zaměřuje na možnosti výroby, které jsou dnes technologicky dostupné a zároveň v Česku použitelné.
---

{% include series-box.html series-id=page.series-id selected=page.slug %}

{% include tldr.html content="
- Zásadními zdroji bezemisní elektřiny v Česku mohou být **slunce a vítr**. Kvůli vyrovnanosti výroby během roku bude **klíčový rozvoj větrné energetiky**.
- Pomocí **jaderné energetiky** nemůžeme dostatečně rychle pokrýt celou spotřebu Česka. Udržení nebo mírné navýšení současné výroby z jádra nicméně může dekarbonizaci energetiky ulehčit.
- Když nesvítí a nefouká, máme na výběr z řady **nízkoemisních flexibilních zdrojů**. Nicméně výroba z nich je zpravidla dražší než výroba ze slunce, větru i jádra. Je tedy důležité [vybudovat v ČR energetický mix](/explainery/bezemisni-energetika-1-scenare) tak, abychom tyto flexibilní zdroje potřebovali co nejméně.
" %}

_Tento text nabízí přehled základních technologií pro bezemisní či nízkoemisní výrobu elektřiny. Více o možnostech jejich kombinace do nízkoemisního mixu se dočtete [v předchozím textu](/explainery/bezemisni-energetika-1-scenare)._

_TODO: Nějak připomenout základní východisko, že spotřeba naroste z 60 na cca 100 TWh za rok._{:.todo}

## Slunce a vítr

**Slunce a vítr jsou už dnes zdrojem elektřiny s nejnižšími celkovými náklady** (a to i v českých podmínkách, kde např. 1 m<sup>2</sup> solárního panelu vyrobí za rok jen okolo 1,3 MWh elektřiny oproti 2 MWh na jihu Španělska[^OZE-potencial]). Celkové náklady na výrobu elektřiny z nové větrné nebo solární elektrárny jsou dnes dokonce asi 2x nižší než pouhé provozní náklady na výrobu z hnědého uhlí.[^OZE-cena]

### Slunce
{% include figure.html
    name="solar.png"
    alt="Přehled vlastností solárních zdrojů"
    source-text="Fakta o klimatu"
%}

**I v českém prostředí je možné vyrobit ze slunce několikanásobek celkové roční spotřeby elektřiny.** Potenciál pro tuto výrobu na nejvhodnějších plochách (střechy, fasády, bývalé povrchové doly, brownfieldy apod.) je [významný](/infografiky/potencial-solarni-energie-cr-strechy), ale omezený. Prakticky neomezený potenciál má zemědělská krajina. Solární panely na polích sice vzbuzují odpor obyvatel, nicméně **hektar solárních panelů dokáže vyrobit zhruba 30x více energie než hektar řepky pěstované na bionaftu.** Za tímto účelem přitom u nás řepku pěstujeme asi na [1 300 km2](https://eagri.cz/public/web/file/682857/SVZ_Olejniny_12_2020.pdf), což je plocha, která by na pokrytí současné spotřeby Česka stačila. Navíc dnes již existují i kompromisní řešení, například tzv. agrovoltaika, kdy se půda využívá dvojím způsobem – k pěstování zemědělských plodin, jež lépe rostou ve stínu než na přímém slunci a daří se jim pod vysoko umístěnými, řídce osazenými solárními panely. V Česku je ale tento slibný přístup[^OZE-agrivoltaika-zdroje] zatím [v počátcích](https://www.agromanual.cz/cz/clanky/management-a-legislativa/management/agrivoltaika-v-podminkach-ceske-republiky).

### Vítr
{% include figure.html
    name="wind.png"
    alt="Přehled vlastností větrných zdrojů"
    source-text="Fakta o klimatu"
%}

I když hodně fouká především u moře a to u nás nemáme, i tak můžeme pokrýt znatelnou část své spotřeby z větru. [Studie](https://www.ufa.cas.cz/DATA/vetrna-energie/Potencial_vetrne_energie_2020.pdf) Ústavu fyziky atmosféry odhaduje technický potenciál výroby z větru v ČR na cca 70 TWh / rok. [Realizovatelný potenciál](/infografiky/potencial-vetrne-energie-cr) do velké míry závisí na podpoře obyvatel a politiků – řádově ho můžeme odhadnout na 10—30 TWh / rok.

**Slunce a vítr k sobě nutně potřebují flexibilní zdroje**, které rozebíráme níže. Zásadním problémem u solárních a větrných elektráren je totiž proměnlivost jejich výroby.
<!--Krátkodobému bezemisnímu vyrovnávání výroby ze slunce a větru a možnostem různých technologií se podrobněji věnujeme v dalším textu. -->
V tomto textu se zabýváme především sezónní proměnlivostí – solární zdroje vyrábějí nejvíc na jaře a v létě, větrné naopak na podzim a v zimě.

**Pro sezónně vyrovnanou výrobu z větru a slunce je potřeba, aby výrazně převažovala výroba z větru** (alespoň v poměru 3:1 ve prospěch větru[^OZE-vyvazeny-mix]). V Česku ale zatím máme výraznou převahu výroby ze slunce (cca 3:1 ve prospěch slunce). To rozhodně neodpovídá rozložení spotřeby a vyžadovalo by výraznou sezónní akumulaci:

{% include figure.html
    name="solar-wind-seasonality.png"
    alt="Slunce a vítr se mohou vhodně doplňovat."
    caption="Převaha slunce v energetickém mixu bude vyžadovat sezónní akumulaci, převaha větru by odpovídala spotřebě. Grafy ukazují hypotetickou výrobu ze slunce a větru na úrovni 60 TWh za rok, v poměru 3:1 a 1:3. Ukazujeme průměrnou čistou spotřebu (za roky 2015–2020) a extrapolaci výroby založenou na průměrných koeficientech využití slunce a větru v ČR (opět za roky 2015–2020)."
    source-text="Fakta o klimatu"
%}

**Pro sezónní vyváženost výroby ze slunce a větru tedy v Česku potřebujeme zásadně podpořit instalaci větrných zdrojů.**

## Jádro

### Konvenční jádro
{% include figure.html
    name="nuclear-conventional.png"
    alt="Přehled vlastností konvenčních jaderných zdrojů"
    source-text="Fakta o klimatu"
%}

**Jádro může být jedním ze stavebních kamenů bezemisní výroby elektřiny.** Evropská komise navrhuje přechodně do roku 2045 povolit v [taxonomii](/infografiky/taxonomie-eu) jako udržitelnou investici, což zjednodušuje financování nových jaderných projektů. Podmínkou k tomu jsou národní plány na vybudování trvalého úložiště jaderného odpadu do roku 2050.

**Stavba jaderných elektráren může hrát roli v období po roce 2040, ale nijak nepomáhá snižovat emise skleníkových plynů v nejbližších letech** (podle emisních závazků EU a Česka). Plánování a stavba jaderných elektráren v Evropě totiž v poslední době trvá i více než 20 let, mnoho nedávných projektů nebylo schopno zdaleka dodržet původní časový plán.[^jadro-zpozdeni]

**Stavba nových jaderných bloků s sebou nese velké investiční riziko a relativně velké náklady. Je tak pro ni obtížné se prosadit v prostředí liberalizovaného trhu.** V posledních desetiletích v Evropě nedošlo k žádné stavbě čistě na tržní bázi, např. u Hinkley Point C ve Velké Británii [garantuje vláda](https://www.gov.uk/government/collections/hinkley-point-c) výkupní cenu okolo 110 EUR / MWh. V Česku se také ČEZ v posledních deseti letech opakovaně bránil vstupu do nového jaderného bloku na vlastní tržní riziko. S pokračujícím rozvojem větru a slunce bude situace na [trhu s elektřinou](https://faktaoklimatu.cz/explainery/cena-elektriny-na-trhu) pro jaderné bloky [čím dál složitější](http://open-electricity-economics.org/book/text/05.html#4-the-impact-of-renewable-energy). Časté nadbytky výroby z obnovitelných zdrojů totiž budou snižovat průměrnou cenu elektřiny na burze a s ní i zisky provozovatelů jaderných zdrojů, příp. je ve chvílích nadbytku tlačit ke snížení výroby.[^jadro-flexibilni] Rozvoj jaderné energetiky tedy závisí na podpoře od státu.

**Pro zajištění dostatečné výroby v Česku by zdaleka nestačilo postavit jeden či dva bloky**: Kdybychom chtěli jádrem pokrýt většinu budoucí spotřeby České spotřeby, řekněme 90 TWh za rok, potřebovali bychom instalovaný výkon okolo 12 GW. Dnes máme výkon asi 4 GW, z toho 2 GW v současných Dukovanech nejspíš budeme muset do roku 2050 uzavřít. V současnosti [běží tendr](https://ct24.ceskatelevize.cz/domaci/3456182-zive-brifink-premiera-fialy-po-navsteve-jaderne-elektrarny-dukovany) na jeden nový blok v Dukovanech o velikosti 1,2 GW. Takových nových bloků bychom ovšem do roku 2050 museli postavit 8. To by najednou vyžadovalo nemyslitelné množství financí, investičního rizika a expertní kapacity. Kromě toho bychom museli využít další lokality, což není snadné vzhledem k lokálnímu odporu obyvatel.

Vzhledem k těmto vlastnostem jaderných elektráren a rychlosti rozvoji OZE je realistické uvažovat buď o odklonu od jaderné energetiky, nebo jen o jejím omezeném rozvoji.[^jadro-know-how]

### Malé modulární reaktory (SMRs)
{% include figure.html
    name="nuclear-smr.png"
    alt="Přehled vlastností SMR jaderných zdrojů"
    source-text="Fakta o klimatu"
%}

**Malé modulární reaktory (SMRs) mohou přispět k rychlejšímu rozvoji jádra ve 30. a 40. letech.** Je to [pestrá škála](https://aris.iaea.org/Publications/SMR_booklet_2022.pdf) technologií, která slibuje menší reaktory (řádově s elektrickým výkonem 10—300 MW), které by mělo být možné sériově vyrábět v továrně a v principu hotové dopravovat na místo použití. Díky jejich pasivnímu designu by měly také nabízet vyšší bezpečnost, protože v případě krizové situace vydrží déle bez zásahu operátorů a bez dodávky elektřiny zvenku. Tyto vlastnosti by měly přispět k výrazně snazšímu škálování této technologie. Ministerstvo průmyslu a obchodu už připravuje rámec pro výstavbu SMRs v Česku. Pro české podmínky mohou být obzvláště atraktivní pro dekarbonizaci velkých tepláren.

**SMRs nejsou a v nejbližších letech nebudou komerčně dostupné.** Přes intenzivní výzkum a vývoj je ohledně této technologie spousta nejistot: prosadí se vůbec, jak rychle je bude možné škálovat, jaká bude jejich cena a jak rychle tato cena bude klesat? Z tohoto důvodu SMRs nejsou vhodné jako jediné řešení pro dekarbonizaci. Mohou ale v dalších dekádách zpestřit paletu možností.

## Doplňkové flexibilní zdroje

V této sekci postupně probereme další technologie, které těžko mohou plnit stěžejní roli v budoucím mixu, ale mohou plnit roli doplňkových zdrojů, jejichž výkon můžeme podle potřeby ovládat. Takové flexibilní zdroje jsou pro fungování celé soustavy naprosto klíčové, protože mohou dodávat elektřinu, když nesvítí nebo nefouká (a nebo když je některý jaderný blok v nečekané odstávce). Zaměřujeme se na dnešní hlavní technologie, je samozřejmě možné, že se v praxi prosadí nějaká úplně jiná technologie.

_TODO: Zahrnout i geotermál? Mluví se o něm, tak by to bylo dobrý vymezit_{:.todo}

### Hydro
{% include figure.html
    name="hydro.png"
    alt="Přehled vlastností vodních zdrojů"
    source-text="Fakta o klimatu"
%}

**Potenciál vodních elektráren v Česku je malý a prakticky vyčerpaný.**[^pocencial-hydro] V dnešní Evropě je navíc s ohledem na ochranu krajiny velmi těžké prosadit stavbu nové velké přehrady. Můžeme sice dále rozvíjet síť malých vodních elektráren, ty ale vyrobí malé množství elektřiny, navíc s nízkou flexibilitou.

**Vodní elektrárny mají určitou flexibilitu**, např. vyšší výrobou ráno a večer doplňují výrobu ze slunce. Množství vody za rok je ale omezené a přehrady musí vždy alespoň nějakou vodu pouštět. Zhruba 40 % výroby je tak neflexibilní (v posledních letech je v Česku minimální výkon hydra mezi 70–100 MW, průměrný výkon za celý rok pak mezi 200 a 300 MW).

### Biomasa
{% include figure.html
    name="biomass.png"
    alt="Přehled vlastností zdrojů na biomasu"
    source-text="Fakta o klimatu"
%}

{% include expander-figure.html
    name="about-biomass"
    class="contrast-figure"
    label="Kontext: Jak se vyrábí energie z biomasy?"
    content="
**Biomasa se dá využívat různými způsoby.** Ve výrobě elektřiny to je hlavně:
1. **Přímé spalováním rostlinné hmoty** v elektrárnách a teplárnách podobných uhelným.
2. **Výroba bioplynu** anaerobní fermentací. Z bioplynu lze v plynovém spalovacím motoru vyrábět elektřinu a teplo.
3. **Výroba biometanu** pročištěním bioplynu. Biometan lze vtlačit do plynárenské sítě a dále spalovat např. v paroplynových elektrárnách.

Mimo výrobu elektřiny se biomasa ve velkém používá k **vytápění** a také se z ní vyrábí **kapalná biopaliva** (u nás typicky bionafta z řepky<sup>*</sup>).

{:.longread-small}
<sup>*</sup> Dnes se biopaliva používají docela hloupě – přimíchávají se plošně do nafty. Nejde ovšem vyrobit dost biopaliv, abychom takto zásadně pohnuli emisemi v silniční dopravě. V budoucnu mohou sloužit k dekarbonizaci vybraných oblastí, kde jiné technologie nebudou k dispozici (uvažuje se o části letecké, námořní nebo dálkové kamionové dopravy).
"
%}

**Pouhé využití odpadů a zbytků je podstatný zdroj biomasy**: odpadní vody, organická složka komunálního odpadu, hnůj, zbytky ze sklizně, nebo odřezky ze zpracování dřeva. **Potenciál odpadních a zbytkových surovin je ale omezený.** Navíc mnohé z nich mají i další uplatnění: jako krmivo pro dobytek, pro výrobu tepla, jako organické hnojivo, jako masa uhlíku, který se může přirozeně <glossary id='sekvestrace'>uložit v půdě</glossary>.

**Cílené pěstování energetických plodin je další zdroj biomasy**: od kukuřice přes řepku až po ozdobnici obrovskou (miscanthus) a stromy. **Potenciál cíleně pěstované biomasy je ale také omezený.** Má to dvě příčiny:
- **Energetické plodiny jsou oproti jiným zdrojů energie velmi málo efektivní.** Na jednom hektaru zemědělské půdy můžeme za rok vypěstovat biomasu na výrobu 20–30 MWh elektřiny[^vynos-biomasa], tedy veškerá zemědělská půda ČR (přes 4 mil. hektarů) by dodala 85–125 TWh ročně.

- **Energetické plodiny soutěží o prostor s produkcí potravin a s divokou přírodou**, využití veškeré zemědělské půdy v ČR na biomasu je nemyslitelné. I celosvětově musíme být obezřetní, na nízkých cenách potravin závisí živobytí lidí v chudých zemích.

**Biomasa v energetice může mít vysoké nepřímé emise.** Energetické využití biomasy má z hlediska klimatu smysl jen v uměřeném okolí jejího původu nebo při použití nízkoemisní dopravy. Tak jako tak potřebujeme, aby energie získaná z biomasy výrazně převýšila energii vloženou do jejího pěstování, sklizně a transportu.

Přes všechny tyto výhrady **biomasa může hrát důležitou roli ve vyrovnávání výkyvů ve výrobě ze slunce a větru** díky jejímu snadnému skladování.

### Uhlí nebo zemní plyn s CCS
{% include figure.html
    name="ccs.png"
    alt="Přehled vlastností zdrojů s CCS"
    source-text="Fakta o klimatu"
%}

{% include expander-figure.html
    name="about-ccs"
    class="contrast-figure"
    label="Kontext: Jak funguje CCS?"
    content="
**CCS označuje škálu postupů na zachytávání odpadního oxidu uhličitého a jeho trvalé uložení do podzemního úložiště.**<sup>*</sup> K ukládání se používají geologické útvary jako _solné vodonosné vrstvy_ nebo vytěžená naleziště ropy nebo zemního plynu (kde CO<sub>2</sub> v rámci techniky [_enhanced oil recovery_](https://en.wikipedia.org/wiki/Enhanced_oil_recovery) umožňuje další těžbu).

**CCS může mít v budoucnu významná využití mimo elektroenergetiku**:
- Pro **dekarbonizaci průmyslových procesů jako výroba cementu, železa, oceli** atd. (u nich se totiž oxid uhličitý uvolňuje jinou reakcí než hořením fosilních paliv)
- Jako **technický nástroj k dosažení záporných emisí <glossary id='sekvestrace'>sekvestrací uhlíku</glossary>**, buď nasazený na elektrárnu či teplárnu na biomasu (_bioenergy with CCS_, _BECCS_) nebo ve formě zařízení na zachytávání uhlíku přímo z atmosféry (_direct air capture_, _DAC_).

{:.longread-small}
<sup>*</sup> Místo trvalého ukládání uhlíku se také uvažuje o jeho využití v průmyslu (_carbon capture and utilization_, _CCU_). Nevýhodou tohoto postupu je, že se takový uhlík typicky časem znovu vypustí do atmosféry. To platí obzvlášť při využití uhlíku pro výrobu syntetických paliv.
"
%}

**CCS je do velké míry nerozvinutá technologie**: na celém světě momentálně provozuje CCS jen [jedna elektrárna](https://en.wikipedia.org/wiki/Boundary_Dam_Power_Station) v Kanadě (a [řada dalších zařízení](https://www.sciencedirect.com/science/article/pii/S2590332221005418) mimo elektroenergetiku, po většinou ve zpracování zemního plynu). Většina CCS projektů celosvětově ohlášených v minulé dekádě byla zrušena, tedy kolem úspěšného rozvoje této technologie a realizace nově ohlášených projektů panuje značná nejistota. **CCS závisí na infrastruktuře pro trvalé ukládání**, která zatím není ve střední Evropě k dispozici a vyžaduje nový systém potrubí transportující CO<sub>2</sub> na místa ukládání. Taková infrastruktura se v současnosti [rozvíjí např. v Norsku](https://www.iea.org/policies/12675-ccs-project-longship).

**CCS není zcela bezemisní.** CCS zachytává pouze zhruba 85–95 % přímých emisí. Navíc nezachytí nepřímé emise při těžbě a přepravě fosilních paliv, takže např. plynové turbíny s CCS nejsou zdaleka klimaticky neutrální. CCS navíc vyžaduje další rozvoj fosilní těžby: je těžké zaručit, že se významná část paliv z takových projektů skutečně spálí s použitím CCS. **CCS navíc prodlužuje naši závislost na státech, které produkují fosilní paliva.**

**Přes všechny tyto problémy mohou fosilní elektrárny s CCS hrát důležitou roli ve vyrovnávání výkyvů v produkci ze slunce a větru.** Úspěšný rozvoj CCS v Česku ovšem stojí na podpoře vlády, protože příprava úložiště CO<sub>2</sub> zatím s sebou nese příliš mnoho nejistot a rizika pro soukromé investory. Další zdroje informací o CCS nabízí [naše rešerše](/studie/2022-reserse-ccs).

### Plynové turbíny na zelený nebo modrý vodík
{% include figure.html
    name="hydrogen.png"
    alt="Přehled vlastností vodíkových zdrojů"
    source-text="Fakta o klimatu"
%}

{% include expander-figure.html
    name="about-hydrogen"
    class="contrast-figure"
    label="Kontext: Jaké jsou typy vodíku a k čemu je vodík potřeba?"
    content="
**Vodík je už dnes důležitá surovina v chemickém průmyslu s celosvětovou spotřebou okolo [90 Mt za rok](https://www.iea.org/fuels-and-technologies/hydrogen). Je několik hlavních způsobů výroby vodíku** (označovaných barvami):
- **šedý** (naprostá většina dnešní produkce): V současnosti se vodík vyrábí primárně ze zemního plynu štěpením vodní parou ([_methane steam reforming_](https://en.wikipedia.org/wiki/Steam_reforming)) s CO<sub>2</sub> jako vedlejším produktem.
- **modrý** (malá část dnešní produkce): Na celý proces lze aplikovat CCS a vzniká tak relativně nízkoemisní vodík. Na světě je dnes několik zařízení vyrábějící modrý vodík (největší v rafinérii [Port Arthur, USA](https://www.airproducts.com/company/innovation/carbon-capture#/) zachytí každý rok asi 1 Mt CO<sub>2</sub> a tedy vyrobí řádově několik set tisíc tun vodíku za rok).
- **zelený** (zanedbatelná část dnešní produkce): Vyrábí se z (nadbytků) bezemisní elektřiny pomocí elektrolýzy vody.

**Kromě energetiky je vodík klíčový pro dekarbonizaci dalších odvětví, kde je elektrifikace náročná:**
- jako palivo při výrobě oceli a cementu, kde je elektrifikace komplikovaná kvůli příliš vysokým procesním teplotám;
- jako palivo pro námořní dopravu a část kamionové dopravy;
- jako palivo pro leteckou dopravu (alternativně lze vodík převést do formy syntetických paliv velmi podobných fosilním a využít v běžném leteckém motoru).
"
%}

**Vodík lze využít jako velkokapacitní energetické úložiště pro elektřinu ze slunce a větru**, když je jí v síti nadbytek. Vodík se dá ekonomicky skladovat ve velkém objemu a na delší dobu v podzemních zásobnících. Z vodíku se pak dá vyrábět elektřina v paroplynových blocích rámcově podobných těm na zemní plyn.[^vodik-turbiny] Díky relativně snadnému skladování na zimu je vodík také potenciální kandidát pro dekarbonizaci tepláren.

**Podíl zeleného vodíku má stoupat.** V rámci plánu [REPowerEU](https://ec.europa.eu/commission/presscorner/detail/en/IP_22_3131) **Unie chce do roku 2030 dosáhnout roční spotřeby 20 Mt vodíku**. Polovina se má vyrábět uvnitř EU, polovina dovážet z dalších států (např. ze severu Afriky). To není vůbec málo, na výrobu těchto 20 Mt zeleného vodíku je potřeba asi 1 000 TWh bezemisní elektřiny navíc (asi 35 % současné [roční spotřeby EU](https://ember-climate.org/data/data-explorer/)), a tak není zřejmé, že se tento plán podaří realizovat.

**Ani 20 Mt ročně nenasytí poptávku EU, protože větší část vodíku nejspíš bude potřeba mimo energetiku.** Pro řádovou orientaci: ze zmíněných 20 Mt vodíku ročně by se dalo zpětně vyrobit jen asi 350 TWh elektřiny (asi 12 % současné roční spotřeby EU, tedy jen třetina elektřiny, která se spotřebuje na výrobu tohoto vodíku). Pro vyrovnávání výkyvů ve výrobě ze slunce a větru je to ale i tak velké číslo, např. podle [progresivního scénáře](https://ember-climate.org/data/data-tools/european-clean-power-pathways-explorer/) think-tanku Ember bude v roce 2050 potřeba pro vyrovnání výkyvů v celé Evropě jen asi 110 TWh elektřiny z vodíku.

### Technologie na krátkodobé vyrovnávání

**Tyto technologie nejsou primárním zdrojem elektřiny.** Pouze umožňují na daném místě o malý čas posunout výrobu elektřiny (pomocí ukládání elektřiny) nebo spotřebu elektřiny (pomocí flexibility spotřeby). Proto se jim v tomto textu podrobně nevěnujeme.

<!-- Více detailů je v navazujícím textu o vyrovnávání sítě. -->

**Krátkodobé vyrovnávání je už dnes výrazně používané.** Nejvýznamnější dnešní technologie v Česku jsou:
- **přečerpávací vodní elektrárny** na straně výroby (za rok vyrobí [zhruba 1 TWh](https://www.eru.cz/sites/default/files/import_files/Rocni_zprava_provoz_ES_2020.pdf)) a
- **nízký tarif** na straně spotřeby (za rok se v něm spotřebuje [přes 10 TWh](https://www.eru.cz/sites/default/files/import_files/Rocni_zprava_provoz_ES_2020.pdf)).

Je třeba dodat, že 1 TWh spotřebovaná v nízkém tarifu neposkytuje zdaleka tolik flexibility jako 1 TWh dodaná z přečerpávací elektrárny, pomáhá ale snižovat rozdíl mezi spotřebou ve dne a v noci.

Při velkém zastoupení slunce a větru budeme krátkodobého vyrovnávání potřebovat výrazně víc, v řádu 5–20 TWh za rok. Přečerpávací elektrárny není možné příliš rozšiřovat. **Pro krátkodobé vyrovnávání tedy bude potřeba rozšíření nových technologií** (jako např. lithiové baterie a jiné[^flexibilita-nastroje]).

## Závěr

**Z pohledu České republiky můžeme rozvíjet celou řadu technologií pro nízkoemisní výrobu elektřiny.** Některé z nich jsou dostupné a cenově výhodné už teď, jako solární a větrné elektrárny (a z určitého pohledu i konvenční jaderné zdroje). Další technologie, jako vodíkové technologie, malé modulární reaktory, příp. i CCS mohou dospět k větší komerční zralosti už během této dekády.

Je potřeba dodat, že každá z těchto hlavních technologií má nějaké podstatné omezení. Většina výroby ze slunce je koncentrovaná do malé části hodin během teplejší půlky roku. Větrná energetika má v Česku omezený potenciál, aby dokázala pokrýt chladnější část roku. Jaderné zdroje naráží na velmi dlouhou výstavbu a vysoké investiční náklady a tedy vysoké investiční riziko. Proto není úplně samozřejmé, že Česko skutečně dojde k levnému a stabilnímu mixu. Potřebujeme možné scénáře komplexně posuzovat a vývoj elektroenergetiky dlouhodobě plánovat.

## Poznámky a zdroje

[^OZE-potencial]: Solární potenciál mapuje [globalsolaratlas.info](https://globalsolaratlas.info), větrný pak [globalwindatlas.info](https://globalwindatlas.info).
[^OZE-cena]: Celkové náklady pro slunce a vítr v ČR jsou dnes okolo 50 EUR / MWh. Většina z toho jsou investiční náklady, protože tyto elektrárny nepotřebují žádné palivo ani emisní povolenky. Jen samotné provozní náklady pro hnědé uhlí jsou okolo 100 EUR / MWh, pro zemní plyn klidně přes 300 EUR / MWh. Cenu výroby z uhlí tlačí nahoru emisní povolenky, cenu výroby ze zemního plynu pak (hodně proměnlivá) cena této suroviny.
[^OZE-agrivoltaika-zdroje]: Pro Česko zatím není k agrivoltaice zpracovaná žádná relevantní studie, další vhledy by měl poskytnout probíhající [výzkumný projekt](https://www.isvavai.cz/cep?ss=detail&h=SS05010243). V angličtině je zdrojů mnoho: základní přehled nabízí např. [popularizační video](https://www.youtube.com/watch?v=lgZBlD-TCFE) ze série _Undecided_, pro geograficky podobné Německo zpracoval [studii](https://www.ise.fraunhofer.de/en/publications/studies/agrivoltaics-opportunities-for-agriculture-and-the-energy-transition.html) _Frauenhofer Institut_.
[^OZE-vyvazeny-mix]: Pro budoucí spotřebu ovšem bude český optimální mix odlišný. Optimální mix totiž závisí na podnebí dané země: povětrnost se často kryje se spotřebou tepla zatímco oslunění s provozem klimatizací. V českých podmínkách by tedy při větší elektrifikaci vytápění bylo vhodné ještě vyšší zastoupení elektřiny z větru, cca v poměru 4:1 nebo 5:1.
[^jadro-zpozdeni]: Příprava jaderného projektu trvá alespoň 5–10 let, např. u reaktoru Dukovany 5 [plány](https://www.idnes.cz/ekonomika/domaci/cez-dukovany-jaderne-bloky-dostavba-ekologie-jadro-energetika.A191113_174721_ekonomika_rts) v roce 2019 počítaly se zahájením výstavby až v roce 2029. Délka výstavby pak v poslední době často vysoce překračuje 10 let. Např. výstavba finského bloku Olkiluoto 3 [trvala](https://oenergetice.cz/rychle-zpravy/finska-jaderna-elektrarna-olkiluoto-dosahla-kritikality-standardni-provoz-bude-zahajen-nejdrive-cervnu) 17 let (místo odhadovaných 4), u francouzského bloku Flamanville 3 se dnes [odhaduje](https://oenergetice.cz/jaderne-elektrarny/novy-jaderny-blok-flamanville-3-se-kvuli-pandemii-prodrazi-opet-zpozdi) na 16 let (místo původních 6), u britských bloků Hinkley Point C se dnes [odhaduje](https://oenergetice.cz/jaderne-elektrarny/jaderna-elektrarna-hinkley-point-c-hlasi-zpozdeni-1-blok-by-mel-zahajit-vyrobu-pul-roku-pozdeji) na 10 let (místo původních 8, elektrárna je ale zatím v rané fázi výstavby).
[^jadro-flexibilni]:  Pro energetiku s velkým podílem obnovitelných zdrojů jsou relativně vhodné novější flexibilní jaderné reaktory, které dokáží rychle regulovat výkon. Takové technické možnosti má velká část reaktorů 3. generace. Pro ilustraci, francouzský reaktor Belleville 1 má instalovaný výkon 1,3 GW. Během cca 2 hodin dokáže z plného výkonu přejít na minimální výkon 300 MW. Snížením výkonu může provozatel optimalizovat náklady v časech nadvýroby ze slunce a větru. Více kontextu vysvětluje například [zpráva IEA](https://iea.blob.core.windows.net/assets/ad5a93ce-3a7f-461d-a441-8a05b7601887/Nuclear_Power_in_a_Clean_Energy_System.pdf) o roli jádra v bezemisní energetice.
[^jadro-know-how]: Jistým argumentem pro opatrný rozvoj je také udržení českého know-how pro stavbu a provoz jaderných zdrojů. To by přispělo k diverzifikaci rizika v budoucnu.
[^pocencial-hydro]: Podle [závěrů](https://www.mzp.cz/cz/vodni_elektrarny_vyuziti_analyza) výzkumného projektu z roku 2015 je nevyužitý potenciál malých vodních elektráren v Česku asi 0,23 TWh za rok.
[^vynos-biomasa]: Výpočet je založen na [odhadu výnosu](https://onlinelibrary.wiley.com/doi/10.1111/j.1365-3040.1995.tb00565.x) ozdobnice (miscanthus) až 0,78 W/m<sup>2</sup> (ve spalném teple) a na předpokladu 45% účinnosti konverze na elektřinu, tedy celkově zhruba 0,35 W/m<sup>2</sup> (v elektřině). To také zhruba odpovídá [odhadu](https://www.withouthotair.com/c6/page_43.shtml) 0,15 – 0,3 W/m<sup>2</sup>, který udělal David MacKay ve své knize _Sustainable Energy – without the hot air_. Výnos 0,35 W/m<sup>2</sup> dá 3,5 kW/ha a tedy asi 30 MWh za rok na jeden hektar.
[^vodik-turbiny]: V současnosti ale není na trhu žádná turbína, která by dokázala spalovat 100% vodík. Např. Siemens [nabízí](https://www.siemens-energy.com/global/en/priorities/future-technologies/hydrogen/zehtc.html) turbíny, které dokáží spalovat směs 75 % vodíku a 25 % zemního plynu a má za cíl mít na trhu turbíny na 100 % vodík do roku 2030.
[^flexibilita-nastroje]: Možné technologie na straně výroby: např. baterie, gravitační úložiště, tepelná úložiště, úložiště na stlačený vzduch; u všech těchto technologií potřebujeme dosáhnout výrazného zlevnění. Na straně spotřeby: individuálně řízená flexibilita spotřeby v domácnostech (zahrnující elektroauta, nová tepelná čerpadla a elektrické bojlery), flexibilita spotřeby v průmyslu.
