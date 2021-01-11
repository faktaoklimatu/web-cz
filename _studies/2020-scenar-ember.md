---
layout:      infographic
title:       "Ember: Scénář transformace elektroenergetiky ČR"
slug:        "2020-scenar-ember"
redirect_from: "/2020-scenar-ember"
published:   2020-11-19
weight:      91
tags-scopes: [ cr ]
tags-topics: [ energetika, opatreni ]
caption:     "Studie Ember zkoumá možnou proměnu české elektroenergetiky do roku 2030. Konkrétně zkoumá variantu ukončení provozu všech českých uhelných elektráren a uhelných tepláren. V tomto rámci pak hledá nákladově optimální výstavbu a provoz elektráren. Studie ukazuje, že i takto ambiciózní scénář je myslitelný, vyžaduje ale výrazné tempo rozvoje solárních, větrných i záložních plynových elektráren."
data-our:    "https://docs.google.com/spreadsheets/d/16fITQ_Y51CWL1co734tU5hHQUAf298chxxr3q0-lFWI/edit"
data-orig:
  - [ "Shrnutí (CZ)", "https://ember-climate.org/wp-content/uploads/2020/11/Cesko_bez_uhli_od_2030_Ember.pdf" ]
  - [ "Podrobná zpráva (EN)", "https://ember-climate.org/project/coal-free-czechia-2030/" ]
---

{% include local-includes/energeticke-scenare/jak-cist.md %}

## Metodické komentáře ke grafice

{% include local-includes/energeticke-scenare/rozdeleni-zdroju-2019.md %}

### Rozdělení zdrojů do kategorií: rok 2030

Oproti číslům udávaným v samotné studii mírně upravujeme kategorizaci, aby více odpovídala našemu rozdělení pro rok 2019 a také dalším studiím.

* **Plyn:** Studie Ember jako plyn označuje pouze paroplynové elektrárny a nové plynové kogenerační jednotky, protože stávající kogenerační jednotky nejsou předmětem optimalizace v jejich modelu. My je k této kategorii přidáváme, konkrétně kategorii _Other thermal_ z jejich podkladových dat. Kromě stávajících kogeneračních jednotek jsou v kategorii _Other thermal_ další zařízení, jako například spalovny odpadu. Ty jsou ovšem zanedbatelné instalovaným výkonem i výrobou, a tak jejich zařazení do kategorie plyn nemá znatelný vliv na grafiku ani na odhad emisí.
* **Biomasa a bioplyn:** Studie tuto kategorii neuvádí (protože není předmětem optimalizace v modelu). My do ní z podkladových dat vybíráme kategorii _Other renewable_, což je v naprosté většině právě biomasa a bioplyn (kromě toho také biologicky rozložitelný komunální odpad).

{% include local-includes/energeticke-scenare/emise.md %}

Pro studii Ember je ještě třeba zdůraznit, že **ukazujeme úsporu emisí pouze z výroby elektřiny**. Studie zahrnuje také transformaci teplárenství, která by vedla k dalším úsporám emisí z výroby tepla. Tyto úspory infografika nevyčísluje (pro srovnatelnost s dalšími scénáři, které teplárenství neřeší).

## O studii Ember

[Ember](https://www.ember-climate.org/) je nezávislý klimatický think tank, zaměřující se na urychlení světové transformace energetiky. Součástí jeho práce je zveřejňování dat o energetice či modelování možností transformace energetiky v různých částech světa.  Studie, ze které vycházíme v této vizualizaci, byla zveřejněna v listopadu 2020 a [shrnutí studie](https://ember-climate.org/wp-content/uploads/2020/11/Cesko_bez_uhli_od_2030_Ember.pdf) je k dispozici v češtině. Pokud vás zajímají bližší detaily ohledně metodiky modelování, předpokladů a dalších parametrů modelu, nahlédněte do [podrobné zprávy v angličtině](http://www.ember-climate.org/research/coal-free-cz-2030).

### Zaměření studie

Studie Ember nabízí jeden z nejambicióznějších scénářů pro český uhelný phase-out. Tento scénář totiž zkoumá, jak se s co nejnižšími náklady dostat v roce 2030 k energetice zcela bez uhlí, tedy jak bez uhelných elektráren, tak bez uhelných tepláren. Takový razantní phase-out zkoumá pomocí zavedeného modelu, který bere v potaz celoevropský kontext. V rámci tohoto prostoru model zohledňuje:

1. ekonomiku budování a provozování energetických zdrojů pomocí modelu celoevropského trhu s elektřinou během celého roku v hodinovém rozlišení,
2. velmi zjednodušenou přenosovou soustavu (tento model agreguje každý evropský stát do jednoho uzlu a tyto uzly propojuje podle existující přenosové sítě),
3. počasí a jeho vliv na výrobu obnovitelných zdrojů.

To znamená, že výroba v jednotlivých státech a přeshraniční toky elektřiny jsou v každé hodině určovány (1) tržními mechanismy (bez předpokladů jakýchkoliv dotací), (2) limity přenosové soustavy a (3) momentálním počasím (to je důležité pro větrné a solární elektrárny).

V tomto rámci pak model optimalizuje výstavbu vybraných typů nových zdrojů v ČR (konkrétně paroplynových elektráren, plynových tepláren, větrných elektráren a solárních elektráren) tak, aby naplnil po celou dobu životnosti těchto zdrojů poptávku po elektřině za minimální cenu. Ani pro výstavbu obnovitelných zdrojů nejsou předpokládány žádné dotace.

### Co studie neřeší

Studie Ember optimalizuje výstavbu zdrojů jen v rámci ČR. Pro všechny ostatní státy předpokládá fixní rozvoj zdrojů a přenosové soustavy podle plánů TYNDP _Evropské sítě provozovatelů přenosových soustav_ ([ENTSO-E](https://www.entsoe.eu/)). To není zcela realistické, protože v konečném důsledku může být levnější dovážet více elektřiny ze zahraničních zdrojů, např. z off-shore větrných farem v Polsku nebo v Německu, než tuto elektřinu vyrábět lokálně. Tento model však vynucuje, aby se v Česku přibližně pokryla poptávka po elektřině domácí výrobou. Což ovšem z pohledu státu a energetické bezpečnosti může být atraktivní výsledek, a tak může případný rozdíl nákladů (mezi levným dovozem a dražší výrobou) dotovat.

Studie dále nemodeluje národní přenosovou a distribuční soustavu. To znamená, že tato studie vlastně předpokládá, že elektřina vyrobená kdekoliv v ČR se dostane v kteroukoliv hodinu ke kterýmkoliv zákazníkům v ČR (a to stejné pro další státy EU). V důsledku studie není schopná vzít v potaz omezení spojená s připojením nových obnovitelných zdrojů do distribuční soustavy a s tím spojené nutné investice v infrastruktuře.

Tento zjednodušený přístup je použit i pro distribuci tepla. Tedy celá ČR je agregovaná a model nijak neřeší lokality, ve kterých je potřeba budovat nové teplárenské kapacity místo uhelných tepláren.

## Metodika modelování studie Ember

Ember pro tento model použil zavedený nástroj [Artelys Crystal Supergrid](https://www.artelys.com/crystal/super-grid/), který umožňuje plánovat a optimalizovat investice v elektrizační soustavě. Tento model stojí na řadě předpokladů:

### Kontext

* U energetiky v jiných evropských zemích se předpokládá vývoj podle plánů TYNDP _Evropské sítě provozovatelů přenosových soustav_ [ENTSO-E](https://www.entsoe.eu/), konkrétně scénář _Sustainable Transition_ z [verze plánů z roku 2018](https://tyndp.entsoe.eu/tyndp2018/). Výhled pro uhelné kapacity okolních zemí podle tohoto scénáře je zhruba konzistentní s jejich národními plány NECP.
* Vzhledem k omezeným datům o dalších státech EU je modelování provedeno pouze pro roky 2020, 2025 a 2030.
* Přenosová soustava je zjednodušená na vedení vysokého napětí propojující jednotlivé státy.
* Poptávka po elektřině se vyvíjí podle predikce NECP.
* Počasí je v modelu zohledněno pomocí průběhu ve třech referenčních obdobích (roky 2002, 2006 a 2010) hodinu po hodině. Tyto roky byly vybrány tak, aby zachytily možnou meziroční variabilitu počasí. Toto je jediný nástroj, který tato studie používá ke zkoumání extrémních vlivů počasí na stabilitu sítě.

### Omezení instalovaného výkonu

U některých zdrojů model předpokládá vývoj instalovaného výkonu podle plánů NECP, konkrétně u jaderných, vodních a přečerpávacích elektráren, stejně jako u elektráren na biomasu a bioplynových stanic. Další instalovaný výkon model nechává optimalizovat v rámci určitých omezení:

* Uhlí musí do roku 2025 omezit instalovaný výkon o 40 %, do roku 2030 pak o 100 %, tedy na 0 GW.
* Nově instalovaný výkon u solárních a větrných instalací je podle expertních odhadů omezen ve dvou obdobích (mezi lety 2020–2025 a mezi lety 2025–2030). V součtu tak nesmí v roce 2030 instalovaný výkon překročit 10 GW u slunce a 4 GW u větru.
* Plynové teplárny musí přidat alespoň 250 MW výkonu (podle plánů NECP).
* Jediné paroplynové elektrárny nejsou jakkoliv omezené.

### Teplárenství

Model se zaměřuje jen na teplo v současnosti vyráběné z uhlí (asi 60 PJ v roce 2019). Vývoje poptávky po teple z uhelných elektráren odhadují následovně:

* Celkovou poptávku po teple odvozují z predikce NECP (9 % snížení oproti 2016) a z dalších studií o zateplování budov. Odhadují tak celkové snížení o 15 % v roce 2030 oproti roku 2019.
* U neuhelných zdrojů tepla předpokládají postupný rozvoj podle NECP.
* U uhelných tepláren, které nevyrábějí elektřinu, předpokládají úplnou náhradu za jiný zdroj (vzhledem k současnému ekonomickému tlaku na uhelné teplárny).

Z toho vychází, že **v roce 2030 bude potřeba pokrýt 40 PJ tepla jako náhradu za odstavené uhelné elektrárny**. Optimální výrobu tohoto chybějícího tepla hledají za následujících omezení:

* Na základě studií o využití odpadního tepla (z průmyslu) v ČR odhadují potenciál tohoto zdroje do roku 2030 na 11 PJ. Tato výroba tepla může probíhat nepřetržitě, a proto o tuto hodnotu snižují poptávku.
* Pro zbývající poptávku umožňují kombinaci velkých tepelných čerpadel (s topným faktorem 3,5), kogeneračních jednotek na plyn nebo biomasu a tepláren na plyn nebo biomasu. Vynucují, aby alespoň 15 PJ bylo pokryto kogeneračními jednotkami nebo teplárnami. Toto množství tepla odpovídá odhadu poptávky po teple v průmyslových podnicích, kde konzervativně očekávají náhradu uhlí za technicky obdobné řešení.

## Výsledky studie Ember

### Náhrada uhlí ve výrobě elektřiny

Studie přináší tyto hlavní výsledky:

* Obnovitelné zdroje v nákladové optimalizaci naplnily limity na nový instalovaný výkon. To znamená, že i v českých klimatických podmínkách bude ekonomicky výhodné bez státních dotací výrazně rozvíjet obnovitelné zdroje. Podíl těchto zdrojů ve výrobě elektřiny podle tohoto modelu v roce 2030 tvoří 38 %.
* Odstavení uhelných elektráren a rozvoj obnovitelných zdrojů (jejichž dodávky závisí na počasí) vyžaduje výrazné navýšení instalovaného výkonu plynových elektráren. Ty fungují do velké míry jako záloha v době, kdy nesvítí slunce nebo nefouká vítr. Nejde jen o průběh výroby během dne, ale také o sezónní variace – elektřiny z plynu je více potřeba v zimě než v létě. Výhodnost provozu paroplynových elektráren ovšem do velké míry závisí na rozvoji zdrojů v okolních zemích a rozvoji bateriových úložišť (viz níže).
* Čistý export elektřiny postupně klesá se zavíráním hnědouhelných elektráren až k mírnému deficitu exportu v roce 2030.
* S odhadovanými investičními náklady okolo 10,5 mld. euro (necelých 300 miliard korun) je to v našem srovnání nejdražší scénář. Z toho by asi polovina investic šla do solárních instalací a asi 30 % do větrných elektráren. Celková suma ovšem neobsahuje investice do přenosové a distribuční soustavy, protože použitý model je neumožňuje odhadnout.

Nakolik je takový rozvoj obnovitelných zdrojů realistický, záleží ve velké míře na aktivitě firem, ochotě státní správy a provozovatelů distribuční soustavy a také ve velké míře na souhlasu obyvatelstva. Pro srovnání, nejaktivnější rok minulého solárního boomu byl rok 2010, kdy se podle dat ERÚ připojilo do sítě asi 1,5 GW instalovaného výkonu solárních elektráren. Scénář Ember předpovídá rozvoj o necelé 3 GW v příštích 5 letech a o dalších cca 5 GW v letech 2025–2030 (tedy asi 1 GW za rok).

### Jak funguje síť s tolika obnovitelnými zdroji

Stabilita dodávek je zajištěna pomocí dostatečné zálohy plynových zdrojů. Maximální spotřeba napříč celým rokem 2030 (a napříč všemi modelovými roky počasí) je 12,6 GW. Instalovaný výkon všech řiditelných zdrojů je 13,95 GW, což dává dostatečnou rezervu i pro odstávku jednoho jaderného bloku.

Na druhou stranu je podle modelu elektřina z obnovitelných zdrojů často importována nebo exportována. Silně propojená evropská soustava tak umožňuje zužitkovat přebytky v elektřině z jednoho státu v okolních státech. Podle modelu tak při této míře obnovitelných zdrojů (i bez baterií) nedochází k vynucenému odstavení obnovitelných zdrojů při nadbytku výroby kvůli stabilizaci sítě.

### Náhrada uhlí v teplárenství

Pro transformaci teplárenství odhadují náklady okolo 2,2 mld. euro. Toto zahrnuje jen výše zmíněných 40 PJ tepla a nezahrnuje tak rozvoj dalších zdrojů tepla očekávaný v NECP.

* Nákladově nejvýhodnější je využití odpadního tepla (investice asi 92 mil. euro), kde skutečným limitem je jen potenciál tohoto zdroje.
* Pro svůj výhodný provoz naplnila maximální limit instalace také velká tepelná čerpadla. A to přes výrazné vstupní náklady (odhadovaná investice je 1,35 mld. euro i bez nákladů na integraci do stávající infrastruktury). Očekávaná spotřeba elektřiny je asi 1,2 TWh za rok a je přidána k odhadu poptávky pro optimalizaci výroby elektřiny.
* Zbylou poptávku plní ve velké míře nové plynové kogenerační jednotky a v zanedbatelné míře plynové teplárny.
* Biomasa pro velké provozní náklady v této optimalizaci není použita vůbec (nad rámec odhadů v NECP).

## Varianty scénáře Ember

Ember ještě kromě hlavního scénáře modeloval dva alternativní.

### Referenční scénář

V tomto scénáři nebyl požadován uhelný phase-out. Rozvoj instalovaného výkonu všech ostatních zdrojů byl pro rok 2030 stanoven podle predikcí [scénáře NECP](2019-scenar-necp). V tomto velmi těsném rámci pak probíhala optimalizace výroby elektřiny podle nejnižších nákladů.

Tento scénář vedl k velmi pomalu klesajícímu instalovanému výkonu uhelných elektráren, k pomalu klesajícímu čistému exportu (5,8 TWh) a k nižšímu poměru výroby z obnovitelných zdrojů (18,6 %).

Pro srovnání, [scénář BloombergNEF](2020-scenar-bloombergnef) také nevyžaduje uhelný phase-out, ale přichází k jiným výsledkům primárně díky větší flexibilitě ve výstavbě plynových, solárních a hlavně větrných elektráren.

### Scénář s bateriemi

Stejný jako hlavní scénář, jen vyžaduje instalaci bateriových systémů pro solární elektrárny. Konkrétně jde o Li-ion baterie s 2 GW instalovaného výkonu (to odpovídá 20 % solárního instalovaného výkonu) a kapacitou na 2 hodiny.

Tento scénář vedl ke snížené výstavbě paroplynových elektráren (v roce 2030 celkem 3 GW, tedy o 1 GW méně než v hlavním scénáři). V důsledku nasazení baterií nejsou přebytky v obnovitelné výrobě exportované, ale později (během večerní špičky) spotřebované v Česku (+0,5 TWh). To nadále oslabuje ekonomiku provozu plynových elektráren (−1,4 TWh) a místo toho upřednostňuje import (+1 TWh).
