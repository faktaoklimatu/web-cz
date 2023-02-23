---
layout:      explainer
title:       "Jaké cesty mohou dovést Česko k bezemisní elektřině?"
series-id:   "serie-elektrina-2050-cr"
series-order: "I"
slug:        "bezemisni-energetika-1-scenare"
published:   2022-09-15
author:      "Jan Krčál"
weight:      50
tags-scopes: [ eu, cr ]
tags-topics: [ energetika ]
cover-source-author: "Andreas Gücklhorn"
cover-source-license: "Unsplash licence"
cover-source-license-url: "https://unsplash.com/license"
cover-source-text: "Unsplash"
cover-source-url: "https://unsplash.com/photos/7razCd-RUGs"
perex: |
  Jedním z klíčových kroků k dosažení uhlíkové neutrality je dekarbonizace energetiky. Nebude snadná ani rychlá – i pro bohaté evropské státy představuje významnou technologickou a ekonomickou výzvu na dalších 20 až 30 let. Proto potřebujeme porozumět nástrahám, které nás na této cestě čekají, a mít jasnější představu, kam vlastně chceme dojít. Jak se má česká a evropská elektroenergetika změnit? Základní průzkum tohoto složitého terénu nabízí následující text.

---

{% include series-box.html series-id=page.series-id selected=page.slug %}

{% include tldr.html content="
- V dalších 30 letech naše **spotřeba elektřiny znatelně naroste** (oproti dnešku).
- Zásadní budou **solární a větrné zdroje**. Kvůli vyrovnanosti výroby během roku bude **klíčový rozvoj větrné energetiky**. Udržení nebo mírné navýšení současné **výroby z jádra** nám může problém s nedostatkem elektřiny zjednodušit.
- Pokud nedokážeme postavit dostatek lokálních větrných zdrojů, budeme to muset kompenzovat importováním větrné energie ze zahraničí, výraznějším rozvojem jaderné energetiky a nebo spoléhat na dlouhodobé ukládání elektřiny, případně vyšší emise řešit pomocí technologie CCS.
- S rozhodováním o budoucí energetice je spojena řada otázek: stabilita sítě, finanční náklady, energetická bezpečnost, ale třeba i provázanost s centrálním zásobováním teplem.
- Plány na následujících 30 let tedy obsahují **mnoho neznámých parametrů** a my potřebujeme pojmenovávat rizika s tím spojená a zvažovat jejich přijatelnost.
" %}

## Jaké jsou klíčové otázky budoucí energetiky?

_Tento text není odbornou studií o transformaci elektroenergetiky. Nabízí úvod do tématu a několik ilustrativních scénářů dalšího vývoje – ukazuje možné cesty a rozhodnutí, která nás čekají. Pro lepší pochopitelnost celý problém poněkud zjednodušujeme, o konkrétních omezeních se píše na patřičných místech v textu._

Zaměříme se zejména na následující 4 otázky:
- Kolik elektřiny budeme v dalších desetiletích potřebovat?
- Jak rychle potřebujeme její výrobu dekarbonizovat?
- Na jakých pilířích se dá budoucí energetika postavit?
- Co musí budoucí energetický mix splňovat?

### Kolik elektřiny budeme potřebovat?

Na začátku je třeba zmínit základní kontext dekarbonizace: **výroba elektřiny bude hrát v budoucím světě klíčovou roli**. Při dekarbonizaci potřebujeme zásadně omezit emise skleníkových plynů v sektorech, kde spalujeme fosilní paliva: v energetice, v dopravě, ve vytápění, v průmyslu. V mnoha případech je elektrifikace nejvýhodnější, či dokonce jediná realistická možnost náhrady tohoto spalování fosilních paliv. Pro zbylé oblasti, kde elektřina není vhodná (např. letecká a lodní doprava nebo průmyslové procesy s vysokými teplotami), se navíc ve velké míře počítá s využitím vodíku nebo syntetických paliv vyráběných z nadbytečné elektřiny. To jinými slovy znamená, že budeme potřebovat elektřinu i tam, kde jsme ji (díky využívání fosilních paliv) doposud nepotřebovali. **I přes zásadní energetické úspory tak spotřeba elektřiny v dalších 30 letech vzroste řádově o polovinu.**

<!-- Více detailů k celkové proměně energetiky nabízíme v samostatném explaineru. -->

Problém, který řešíme, je tedy mnohem těžší než jen nahradit stávající zdroje elektřiny nízkoemisními. **Potřebujeme zásadně snížit emise a současně výrazně zvýšit výrobu elektřiny.**

{% include preview-box.html
    class="highlight-text-box"
    text="**TWh**, tedy **terawatthodina** je jednotka energie. Jednu TWh elektřiny v současnosti za rok vyrobí menší uhelná elektrárna nebo v domácnostech spotřebuje asi 700 000 obyvatel ČR."
%}

Pro jednoduchost budeme v této sérii textů předpokládat postupný nárůst spotřeby až ke **100 TWh ročně**[^consumption-metric], jak ukazuje následující graf. Tento nárůst zhruba odpovídá odhadům [dostupných studií](#studie).

_TODO: Opravit data, hodnota teď by měla být asi 63._{:.todo}

{% include figure.html
    name="consumption.svg"
    class="seminarrow-figure"
    alt="Ilustrativní vývoj spotřeby v ČR v dalších dekádách."
    caption="Ilustrativní vývoj spotřeby elektřiny v ČR v dalších dekádách – součet čisté spotřeby a ztrát v sítích."
    source-text="Fakta o klimatu"
%}

### Jak rychle potřebujeme výrobu elektřiny dekarbonizovat?

Dalším parametrem, který to celé komplikuje, je rychlost, s níž potřebujeme transformaci provést. **Závažnost důsledků klimatické změny do velké míry závisí na rychlosti dekarbonizace.** Množství emisí uhlíku, které ještě můžeme jako lidstvo vypustit do atmosféry, pokud chceme v souladu s Pařížskou dohodou udržet průměrné oteplení do 1,5 °C, označuje tzv. [uhlíkový rozpočet](/infografiky/koncept-uhlikovy-rozpocet). Při současných emisích bychom náš zbývající uhlíkový rozpočet pro oteplení do 1,5 °C vyčerpali asi za 10 let. Proto je klíčové snížit celosvětové emise už v této dekádě.

Je ale důležité dodat, že **takto rychle nemusíme energetiku dekarbonizovat kompletně.** Pokud se nám do konce této dekády a s pomocí dnes dostupných technologií podaří snížit emise v elektroenergetice třeba na 50 % současných hodnot, získáme tím více času na odstranění dalších emisí a více času na vývoj technologií, které zatím nejsou komerčně dostupné. Polevit ovšem nesmíme ani potom. Až se nám podaří snížit emise v elektroenergetice na cca 10 % současných hodnot, budeme čerpat zbývající uhlíkový rozpočet 10x pomaleji, a můžeme si tak pro zbylou dekarbonizaci dopřát větší rozvážnost.

### Na jakých pilířích se dá budoucí energetika postavit?

{% include preview-box.html
    title="Detaily k jednotlivým technologiím"
    text="Více informací k jednotlivým zdrojům elektřiny nabízí další díl této série."
    slug="bezemisni-energetika-2-technologie"
%}

Modelování budoucí energetiky musí brát výše uvedená východiska v potaz. V tomto textu budeme pracovat s následujícími pilíři pro výrobu bezemisní elektřiny v Česku:

1. **Slunce a vítr** lze začít využívat velmi rychle, přičemž oba tyto zdroje mají nízké investiční náklady a v ČR stále obrovský nevyužitý potenciál. Jejich nevýhodou je výrazně proměnlivá výroba.
2. **Jádro** dokáže vyrábět stabilně, postavit jadernou elektrárnu však trvá mnoho let, navíc jsou zde vysoké investiční náklady a vysoké investiční riziko. Část těchto problémů by mohla překonat technologie _malých modulárních reaktorů_, ta ale zatím není zralá ke komerčnímu nasazení.
3. **Nízkoemisní flexibilní zdroje** jsou potřeba pro neustálé vyrovnávání výroby a spotřeby. Může to být třeba biomasa, vodní elektrárny (nebo fosilní zdroje při použití technologie <glossary id='ccs'>CCS</glossary>). Podobnou funkci plní také technologie pro ukládání elektřiny (např. přečerpávací elektrárny, baterie nebo _zelený vodík_, tedy vodík vyrobený pomocí nadbytků obnovitelné elektřiny). K vyrovnávání výroby a spotřeby lze také přispět _flexibilitou spotřeby_, tedy přizpůsobením spotřeby možnostem výroby, např. jejím odložením na vhodnější čas.

Současnou spotřebu v ČR pokrývají tyto tři pilíře jen zčásti, zbytek stále stojí na vysokoemisním pilíři – využívání fosilních paliv:
{% include figure.html
    name="mix-current.svg"
    alt="Současné pokrytí spotřeby v ČR"
    caption="Současnou spotřebu pokrývají bezemisní pilíře jen zčásti."
    source-text="Fakta o klimatu"
%}

V budoucnu potřebujeme tyto tři pilíře uváženě kombinovat. Například nějakou míru využití bezemisních flexibilních zdrojů potřebujeme v každém scénáři, více jich ale budeme potřebovat při velkém využívání elektřiny ze slunce a větru.

Další strategické rozhodnutí spočívá v tom, jak moc chceme **být ve výrobě elektřiny soběstační**, tedy jakou část spotřeby chceme určitě pokrýt z českých zdrojů. Zbytek bychom mohli **importovat ze zahraničí** – pokud to dovolí výrobní kapacity okolních států a možnosti přeshraniční přenosové soustavy.


### Co musí budoucí energetický mix splňovat?

Pro budoucí mix české energetiky je důležitá řada vlastností. Zde chceme zdůraznit 5 z nich:

{% include columns.html
    class="wide-figure-desktop longread-small mb-2"
    column-class="col-12 col-md-6 mb-2"
    col1='
#### Stabilita

Pro fungování elektrické sítě je nutné, aby výroba elektřiny vždy odpovídala spotřebě. Pokud nebudeme mít **zdrojovou přiměřenost**, tedy dostatečné technické nástroje, abychom tuto stabilitu sítě zajistili, hrozí nám _blackouty_, jež mají ničivé dopady na společnost i ekonomiku.

Další důležitou podmínkou pro stabilitu sítě je **sezónní vyváženost**, tedy soulad výroby a spotřeby v různých ročních obdobích. Pro jednoduchost zde budeme dělit rok jen na dvě sezóny: _letní polovinu_ (duben–září) a _zimní polovinu_ (říjen–březen).

Sezóna významně ovlivňuje výrobu: v letní polovině roku se například vyrobí 3x více elektřiny ze slunce než v zimní polovině. Sezóna také ovlivňuje spotřebu: ta je v zimní polovině dnes asi o 20 % vyšší než v letní. A pokud v dalších dekádách výrazně vzroste vytápění elektřinou, může být v roce 2050 zimní spotřeba dokonce o 40–50 % vyšší než v letním období.

#### Přiměřené náklady

Důležitým aspektem jsou i celkové budoucí náklady na výrobu elektřiny – tedy součet nákladů investičních a provozních. Na těch se podílí stát, energetické firmy a další aktéři.

Tyto náklady budou pravděpodobně o něco vyšší než dnes (nicméně toto srovnání může být zavádějící, protože do nákladů obvykle nezapočítáváme veškeré negativní externality, jako je třeba znečištění ovzduší nebo dopady na klima). Přesto nutně potřebujeme, aby i v budoucnu byla elektřina cenově dostupná a zajistila dostatečný životní standard všem vrstvám společnosti.

Obecně pak lze říct, že čím nižší budou náklady na výrobu bezemisní elektřiny, tím snazší bude celá transformace politicky i ekonomicky.
'
    col2='
#### Soulad s potřebami teplárenství

V Česku máme rozsáhlé systémy centrálního zásobování teplem. A protože teplárny kromě tepla vyrábí i elektřinu, je řešení pro dekarbonizaci elektroenergetiky nutně provázané s řešením pro dekarbonizaci tepláren.

Část těchto soustav lze elektrifikovat (velkými tepelnými čerpadly, které například využívají odpadní teplo z čističek odpadních vod), takové řešení ale není použitelné všude. Další teplárny (využívající biomasu, bioplyn nebo zelený vodík) mohou plnit roli záložních zdrojů pro vyrovnávání výkyvů ve výrobě elektřiny ze slunce a větru. V teplárenství se také v budoucnu může využívat odpadní teplo z malých modulárních reaktorů.

#### Energetická bezpečnost

V současnosti více než polovina konečné spotřeby energie v ČR pochází z dovezené ropy a zemního plynu. Klíčovou otázkou tedy je: jak snížit naši závislost na každém jednotlivém státu, ze kterého tyto suroviny pochází? A jak a o kolik můžeme snížit naši energetickou závislost obecně?

#### Vyvážené riziko

S energetickou bezpečností a s transformací souvisejí i další rizika: rizika investic do obřích staveb, skončení ve slepé uličce (když například vsadíme příliš mnoho na konkrétní budoucí technologii), riziko společenské nestability, když se transformace nebude dařit. Ani zdaleka tedy nejde "jen" o riziko dopadů klimatické změny.

Vlády i soukromé firmy čeká spousta velkých rozhodnutí, jejichž důsledky nelze předvídat dostatečně jasně. Všichni aktéři (a stát především) musí s všemi těmito riziky počítat a vhodnou strategií snižovat jejich pravděpodobnost a možné dopady.
'
%}

## Jak mohou vypadat úspěšné (a neúspěšné) scénáře?

Pomocí následujících tří _ilustrativních_ scénářů chceme ukázat základní možnosti, jak by se dala v dalších dekádách rostoucí spotřeba pokrývat[^pokryti-spotreby]. Každý z těchto scénářů je přitom určitou krajní variantou – v praxi nepochybně zvolíme nějakou kompromisní cestu mezi těmito extrémy.

{% assign comment_vre="
Tento scénář vyžaduje nejvýraznější rozvoj domácí **solární a větrné energetiky**, ale také nemalou část výroby z flexibilních zdrojů.

V rámci flexibilních zdrojů to vyžaduje především nasazení **zeleného vodíku** k dlouhodobému ukládání elektřiny. Tato technologie nicméně zatím není dostatečně levná, aby se v Česku tržně prosadila (oproti spalování uhlí)." %}
{% assign comment_import="
**Import elektřiny z větru, převážně v zimní polovině roku**, snižuje nároky na výrobu z flexibilních zdrojů a v menší míře i na domácí výrobu ze slunce a větru.

Tento scénář ovšem závisí tom, kolik elektřiny se bude vyrábět v jiných zemích. Vyžaduje také vybudování dalších interkonektorů (tedy především elektrického vedení), které jsou nákladné a mají obtížný proces schvalování." %}
{% assign comment_nuclear="
**Výrazný rozvoj výroby z jádra** má smysl jedině v kombinaci s rozvojem solární a větrné energetiky. Nejsme totiž schopni postavit tolik nových bloků, abychom tím pokryli celý nárůst spotřeby.

Rozvoj jádra sice snižuje tlak na ostatní pilíře, může ale také během 20. a 30. let omezit rozvoj solárních a větrných elektráren (sníží jejich návratnost, případně i ochotu státu je dotovat). To by zvýšilo celkovou výrobu z fosilních zdrojů a tím i emise CO<sub>2</sub>." %}
{% capture caption_comments %}
{% include columns.html
    class="longread-small"
    column-class="col-4"
    col1=comment_vre
    col2=comment_import
    col3=comment_nuclear
%}
{% endcapture %}
{% include figure.html
    class="wide-figure-desktop wide-figure-mobile wide-figure-mobile-caption-below"
    name="mix-success.png"
    alt="Ilustrativní scénáře úspěšné dekarbonizace energetiky v ČR"
    caption=caption_comments
    source-text="Fakta o klimatu"
%}

{% capture failure_scenarios %}
Pro srovnání může být užitečné ukázat i neúspěšné scénáře, tedy co by znamenal malý rozvoj výroby ze slunce a větru a zpoždění případných jaderných staveb*:

{% assign comment_fail_wind="
Pokud vsadíme na slunce a vítr a **nebudeme schopni postavit dost větrných elektráren**, bude těžké pokrýt rostoucí spotřebu elektřiny a nahradit stárnoucí jádro.

To může v nejhorším případě vést i k růstu výroby z fosilních zdrojů.
"%}
{% assign comment_fail_nuclear="
Může dojít k **selhání či zrušení rozpracovaných jaderných projektů** (i to se ve světě v minulosti už stalo).

Ani to nemusí vést ke katastrofickým akumulovaným emisím CO<sub>2</sub>, pokud budeme **paralelně úspěšně rozvíjet výrobu ze slunce a větru**.
"%}
{% assign comment_fail_nuclear_vre="
**Kdybychom vsadili pouze na jádro**, pravděpodobně nebude mezi politiky ani v byznysu dostatek vůle výrazně v mezičase rozvíjet slunce a vítr.

V případě **výrazného zpoždění jaderných staveb** tak hrozí velké akumulované emise CO<sub>2</sub>.
"%}
{% capture caption_comments_fail %}
{% include columns.html
    class="longread-small"
    column-class="col-4"
    col1=comment_fail_wind
    col2=comment_fail_nuclear
    col3=comment_fail_nuclear_vre%}
{% endcapture %}
{% include figure.html
    name="mix-failure.png"
    class="wide-figure-mobile wide-figure-mobile-caption-below"
    alt="Ilustrativní scénáře neúspěšné dekarbonizace energetiky v Česku"
    caption=caption_comments_fail
    source-text="Fakta o klimatu"
%}

V praxi by ve všech těchto neúspěšných scénářích pomohly přetoky výroby ze slunce a větru ze zahraničí. Bez strategického rozvoje přenosových soustav jsou ale možnosti importu omezené. Stejně tak je důležitá strategická příprava na rozvoj dalších technologií, ať už pro sezónní akumulaci, nebo na snížení dopadů fosilní výroby. To nám umožní na případné problémy a selhání ve vybraném scénáři rychleji reagovat.

{:.longread-small}
\* Pro jednodušší porovnání ponecháváme i v těchto neúspěšných scénářích stejný vývoj spotřeby. Ve skutečnosti by neúspěchy v dekarbonizaci výroby elektřiny pravděpodobně vedly i k pomalejší elektrifikaci, a tedy i pomalejšímu nárůstu spotřeby elektřiny.

{% endcapture %}

{% include expander-figure.html
    name="failure-scenarios"
    expanded=true
    class="wide-figure-desktop contrast-figure "
    label-class="large-expander-title"
    label="Kontext: Jak mohou vypadat neúspěšné scénáře?"
    content=failure_scenarios
%}

Výše uvedené ilustrativní scénáře rozvádíme podrobněji v dalším textu, aby bylo více zřejmé, jak mezi nimi vybírat.

## Jak dosáhnout stabilní výroby?

Základní princip elektrické sítě spočívá v tom, že výroba elektřiny musí být vždy (zhruba) stejná jako její spotřeba. Pokud to neplatí, může to vést k výpadkům elektřiny nebo v extrémním případě k tzv. _blackoutu_, tedy k plošnému přerušení dodávky elektřiny. **Výrobu a spotřebu je proto nutné neustále balancovat v reálném čase.**

Toto je obzvláště náročné, pokud velkou část výroby tvoří solární a větrné zdroje s výrazně proměnlivou výrobou. Základním nástrojem je _zdrojová přiměřenost_, tedy dostatečný výkon řiditelných zdrojů elektřiny, které jsou schopné pokrýt spotřebu, když zrovna nesvítí a nefouká.

Z hlediska budoucí bezemisní energetiky nás zajímají dva časové horizonty:
* **Krátkodobé vyrovnávání**, tedy jak dokážeme vyrovnávat výpadky ve výrobě (nebo zužitkovat nadbytky ve výrobě) v horizontu několika hodin, celého dne nebo jednoho týdne.
* **Sezónní vyváženost**, tedy jak zajistíme, že výroba odpovídá spotřebě v každém z ročních období.

### Krátkodobé vyrovnávání

Krátkodobé vyrovnávání je o něco snazší, protože můžete použít zdroje, které v takové míře nedokážete provozovat trvale. Ať jsou to zdroje s omezeným objemem roční výroby (např. vodní elektrárny nebo bioplyn a biomasa) nebo investičně nákladná úložiště s omezenou kapacitou (přečerpávací elektrárny, bateriové úložiště, apod.) nebo zdroje s vysokými provozními náklady (např. plynové zdroje s CCS).

To neznamená, že to je snadné. Když je špatný den, za celý den nevyrobí solární ani větrné elektrárny v Česku v podstatě nic. I když započítáme určitou stabilní výrobu z jádra, potřebujeme v průběhu takového dne pokrýt dalších 200 – 250 GWh spotřeby. Největší česká přečerpávací elektrárna Dlouhé stráně má přitom kapacitu zhruba 3 GWh.

Nástroje pro krátkodobé vyrovnávání bude v podstatné míře vyžadovat každý z našich ilustrativních scénářů, proto toto téma necháváme na samostatný explainer.

### Sezónní vyváženost

**Klíčový problém českého bezemisního mixu je pokrytí zimní spotřeby**, která je vyšší než v létě. **Na zimní výrobu jsou vhodné větrné elektrárny**, na rozdíl od solárních elektráren.

{% capture seasonal_factors %}
{% include figure.html
    name="factors-solar-wind.png"
    alt="Průměrné koeficienty využití solárních a větrných zdrojů během roku"
    caption="Průměrné koeficienty využití solárních a větrných zdrojů během roku. Více v přehledech potenciálu [slunce](/infografiky/potencial-solarni-energie-cr-strechy) a [větru](/infografiky/potencial-vetrne-energie-cr) v ČR."
    source-text="Fakta o klimatu"
%}
{% endcapture %}

{% include expander-figure.html
    name="seasonal-factors"
    class="contrast-figure"
    label="Kontext: Jak vyrábí během roku solární a větrné zdroje?"
    content=seasonal_factors
%}

**V Česku máme ale pro pokrytí zimní poloviny roku[^seasons-definition] nedostatečný potenciál větru**. I kdyby se nám podařil ambiciózní rozvoj větrné energetiky[^seasons-wind] a přidali jsme k tomu výrobu z Temelína a tolik výroby ze slunce, abychom neměli v létě zásadní přebytky, v zimě by stále podstatně chyběla elektřina. Konkrétně by v zimní polovině roku **chybělo pokrýt téměř 50 % spotřeby** dalšími zdroji, jak ukazuje následující ilustrace.

<!-- Pořád bychom totiž v zimní polovině roku **potřebovali pokrýt téměř 50 % spotřeby** flexibilními zdroji, jak ukazuje následující ilustrace. -->

{% include figure.html
    class="seminarrow-figure"
    name="seasonal-baseline.png"
    alt="Sezónní vyváženost ilustrativního mixu"
    caption="Rozdělení výroby elektřiny do letní a zimní sezóny pro scénář s ambiciózním rozvojem větrné energetiky (bez nového jádra). Tento scénář vyžaduje velké množství flexibilních zdrojů, obzvláště v zimě."
    source-text="Fakta o klimatu"
%}

**Z čeho můžeme tedy v zimě vyrobit další elektřinu?** Tři podstatné nástroje jsou obsaženy v našich ilustrativních scénářích:

1. Můžeme **posílit roli slunce** a zásadně využívat **sezónní akumulaci do zeleného vodíku**.
2. Můžeme importovat **elektřinu z větru ze zahraničí**, což dorovnává hlavně zimní bilanci.
3. Můžeme kromě výroby ze slunce a větru také **výrazně posílit jadernou energetiku**.
{: .upper-alpha}

Těmito způsoby rozhodně nemusíme pokrýt všechnu v zimě chybějící elektřinu. Dalšími **doplňkovými flexibilními zdroji** jsou:
* **biomasa**, která se dobře skladuje a je vhodná pro menší teplárenské bloky, tedy kromě v zimě potřebné elektřiny může poskytnout i v zimě potřebné teplo. Biomasa ale nemůže pokrýt veškerou v zimě chybějící elektřinu. To by oproti dnešku znamenalo výrazně navýšit energetické využití biomasy[^aktualni-skala-biomasy], což by přinášelo by konflikty s dalšími hodnotami jako je biodiverzita nebo estetika krajiny.
* **fosilní paliva s CCS**, která můžou být vhodným zdrojem na pokrývání špiček. Opět nejsou úplně vhodná na pokrytí veškeré v zimě chybějící elektřiny, protože ve velkém využití také přináší sadu problémů, obzvláště pak zbytkové emise skleníkových plynů.

{% capture seasonality %}
{% capture caption_comments_seasonality %}
{% include columns.html
    class="longread-small"
    column-class="col-4"
    col1="
#### A. slunce + vítr + zelený vodík

**Když posílíme výrobu ze slunce**, zimní výrobu doplní zčásti přímo slunce, zčásti **zelený vodík vyrobený v létě z přebytků ze slunce** a z části biomasa a další flexibilní zdroje.

Výroba zeleného vodíku je ovšem zatím stále poměrně drahá."
    col2="
#### B. slunce + vítr + import

**Import obzvláště větrné výroby** ze zahraničí může uvolnit tlak na biomasu a další flexibilní zdroje.

Tolik importu ovšem není možné bez posílení evropské přenosové soustavy. To vyžaduje složité povolování a realizaci liniových staveb.
"
    col3="
{:start='3'}
#### C. slunce + vítr + jádro
**Ambiciózní rozvoj jaderné energetiky** (současně s rozvojem výroby ze slunce a větru) může také uvolnit tlak na biomasu a další flexibilní zdroje.

K takovému nárůstu výroby z jádra bychom ale potřebovali 3 nové velké jaderné bloky a několik dalších malých modulárních reaktorů.
"
%}
{% endcapture %}
{% include figure.html
    class="wide-figure-mobile-caption-above mt-0"
    name="seasonal-alternatives.png"
    alt="Sezónní vyváženost ilustrativního mixu"
    caption-above=caption_comments_seasonality
    caption="Každý přístup doplňuje chybějící výrobu v zimě jiným způsobem. Všechny ale pořád počítají s určitou mírou biomasy (příp. dalších flexibilních zdrojů)."
    source-text="Fakta o klimatu"
%}
{% endcapture %}

{% include expander-figure.html
    name="seasonality"
    class="wide-figure-desktop wide-figure-mobile contrast-figure"
    label-class="large-expander-title"
    label="Podrobnosti: Jak dosahují sezónní vyváženosti naše ilustrativní scénáře?"
    content=seasonality
%}

**Spoléhat se v Česku čistě na slunce a vítr není možné.** **Vždy budeme potřebovat další nesnadné nástroje pro pokrytí zimní spotřeby: zelený vodík, import, jádro**, případně velké množství biomasy nebo fosilní zdroje s CCS.

Je potřeba pamatovat na to, že zde počítáme s ambiciózním rozvojem větrné energetiky. Pokud se nám větrnou energetiku nepodaří patřičně rozvinout, mezera v pokrytí zimní spotřeby se ještě dál podstatně prohloubí, což celý problém ještě ztíží.

## Kolik to celé bude stát?

Pro jednoduchost se zde zaměříme na **systémové náklady na výrobu elektřiny**. Tedy jaké budou celkové investiční a provozní náklady všech aktérů, kteří dohromady tvoří elektrizační soustavu? Toto číslo lze pouze odhadovat, a to na základě nákladů dostupných referenčních projektů.

V tomto textu budeme používat dnešní ceny jednotlivých technologií[^cena-technologii] a nepočítáme s jejich předpokládaným zlevňováním v budoucnu. Jinak řečeno – nabízíme konzervativní odhady budoucích nákladů: _Kolik by to celé stálo, kdyby žádná z rozvíjených technologií zásadně nezlevnila?_

**Z tohoto pohledu by dekarbonizace v Česku přinesla mírné zvýšení systémových nákladů** na výrobu elektřiny. V textu představujeme tři ilustrativní scénáře: záleží na tom, který z nich zvolíme? Malé rozdíly v jejich nákladech vidíme, ale nejistota v odhadech je mnohem významnější než tyto rozdíly.

### Kolik to stojí dnes?

Aby odhady budoucích nákladů dávaly smyl, musíme je srovnat se současnými náklady. Podle hrubých odhadů Fakt o klimatu byly **v roce 2018 české systémové náklady na výrobu elektřiny cca 180 – 220 miliard korun ročně.** Z toho palivo tvořilo asi 30 miliard, investiční náklady na elektrárny zhruba 50 – 90 miliard[^cena-fixni-naklady], fixní provozní náklady elektráren přibližně 40 miliard a zbylých 60 miliard směřovalo na provoz celé sítě, placené pomocí regulované složky ceny elektřiny[^cena-regulovane-elektriny]. V tomto odhadu nejsou započítány emisní povolenky[^cena-povolenky] ani další daně. Celkově v přepočtu **na 1 kWh čisté spotřeby jsme měli systémové náklady okolo 3,00 – 3,60 Kč/kWh.**

**V současné energetické krizi** se ovšem systémové náklady v letech 2021/2022 zvyšují až ke 285 miliardám ročně (4,40 Kč/kWh). Převážná většina nárůstu jde na vrub mnohonásobně vyšší ceně zemního plynu[^cena-zemni-plyn]. Je potřeba dodat, že nárůst průměrné [ceny elektřiny na trhu](/explainery/cena-elektriny-na-trhu) je v těchto letech mnohem výraznější než nárůst _systémových nákladů_. Rozdíl mezi těmito dvěma hodnotami pak tvoří neočekávané zisky (_windfall profits_) výrobců elektřiny a dalších aktérů.

{% include figure.html
    class="seminarrow-figure"
    name="costs-2018.svg"
    name-mobile="costs-2018-mob.svg"
    alt="Hrubý odhad současných systémových nákladů na výrobu elektřiny"
    caption="Hrubý odhad současných systémových nákladů na výrobu elektřiny v ČR (2018–2021), bez daní a emisních povolenek."
    source-text="Fakta o klimatu"
%}

### Kolik může stát nízkoemisní mix v roce 2050?

Podobným postupem jsme odhadli systémové náklady pro naše tři ilustrativní scénáře. Je třeba zdůraznit, že k takovému odhadu nestačí pouze pronásobit [sdružené náklady na výrobu elektřiny (LCOE)](/infografiky/cena-energie) výrobním mixem ve scénáři. **Systémové náklady budoucí sítě mají řadu dalších složek:**
- **Neefektivita nadvýroby.** Výrazné využívání slunce a větru s sebou přináší po mnoho hodin v roce znatelnou nadvýrobu, kterou musíme započítat do systémových nákladů. Kdyby například tato nadvýroba byla 10 TWh za rok, bude nás to ročně stát okolo 15 miliard navíc.
- **Náklady na záložní zdroje.** Záložní zdroje nejsou potřeba jen kvůli slunci a větru, ale i pro (nečekané) odstávky jaderných bloků. Například při využití 15 % času je potřeba kapitálové náklady rozpočítat na mnohem menší množství vyrobené elektřiny. Běžně uváděné hodnoty LCOE často předpokládají maximální využití, a jsou tedy pro záložní zdroje zavádějící. Udržování záložních zdrojů může Česko stát několik desítek miliard korun ročně.[^cena-paroplynova-zaloha]
- **Náklady na výraznější posilování přenosové a distribuční soustavy** by byly významné pro scénář založený na velkém podílu slunce a větru, zvlášť pokud bychom importovali hodně elektřiny ze zahraničí. Nad rámec dnes běžných investic to pro Česko mohou být opět desítky miliard korun každý rok.[^cena-rozvoj-site]
- **Riziko dalších nákladů spojených se stavbou a likvidací jednotlivých zdrojů.** Může jít o prodražení jaderných staveb, nečekaně vysoké náklady na stavbu trvalého úložiště jaderného odpadu nebo nečekaně vysoké náklady na recyklaci komponent obnovitelných zdrojů. Prodražení stavby dvou nových velkých jaderných bloků na dvojnásobek odhadovaných investic (což je v Evropě v posledních dekádách poměrně běžné) by například znamenalo dodatečné každoroční náklady asi 30 miliard ročně.[^cena-prodrazeni-jadra]

**U všech tří scénářů nám vychází rozumné systémové náklady, v rozsahu 3,50 – 4,20 Kč / KWh.** Tyto náklady jsou sice potenciálně o něco vyšší než v roce 2018, ale neznamená to žádné výrazné zvýšení, které by ohrozilo domácnosti a průmysl. Stejně tak tyto výsledné náklady mohou být nižší, pokud se potřebné technologie podaří v dalších dekádách zlevnit. _TODO: Doladit výpočet a udělat poslední aktualizaci grafů a čísel výše_{:.todo}

Pochopitelně nám také vychází mírné rozdíly nákladů mezi jednotlivými scénáři, jako nejdražší vychází scénář se zeleným vodíkem. To není překvapivé, protože staví na technologii, která zatím není rozšířená a tedy je poměrně drahá. Každý z těchto odhadů je ale zatížen určitou nejistotou, a tak je potřeba tyto rozdíly interpretovat opatrně: z hlediska systémových nákladů jsou všechny naše ilustrativní scénáře srovnatelné.

{% capture cost_2050_details %}
{% capture caption_comments_costs %}
{% include columns.html
    class="longread-small"
    column-class="col-4"
    col1="
#### A. slunce + vítr + zelený vodík

Ve scénaři se zeleným vodíkem hraje podstatnou roli cena solárních panelů a cena hydrolyzérů. Při konzervativním odhadu těchto cen vychází tento scénář jako nejdražší, při mírném snížení těchto nákladů se ovšem může snadno dostat na úroveň srovnatelnou s ostatními."
    col2="
#### B. slunce + vítr + import

Tento scénář vychází o něco levnější, protože počítá s výrobou části elektřiny ve výhodnějších podmínkách v zahraničí. Zároveň ale znamená o něco nižší energetickou nezávislost Česka. Přesnější odhady by vyžadovaly robustní studii nákladů spojených s posílením přenosových soustav.
"
    col3="
{:start='3'}
#### C. slunce + vítr + jádro
Posílení jádra s sebou nese významné investiční riziko. Pokud by se podařilo udržet investice na podobné úrovni jako u referenčních projektů v minulosti, měl by tento scénář také poměrně nízké náklady. Při významném prodražení stavby nových jaderných bloků by ovšem tento scénář mohl vyjít jako nejdražší.
"
%}
{% endcapture %}
{% include figure.html
    class="wide-figure-mobile-caption-above mt-0"
    name="costs-2050.svg"
    alt="Současné systémové náklady"
    caption-above=caption_comments_costs
    caption="Hrubý odhad systémových nákladů na výrobu bezemisní elektřiny v Česku v roce 2050, bez daní."
    source-text="Fakta o klimatu"
%}
{% endcapture %}

{% include expander-figure.html
    name="cost-2050-details"
    class="wide-figure-desktop wide-figure-mobile contrast-figure "
    label-class="large-expander-title"
    label="Podrobnosti: Jaké jsou náklady jednotlivých scénářů?"
    content=cost_2050_details
%}

## Jaká rizika jsou s transformací elektroenergetiky spojena?

Výroba a distribuce elektřiny představuje naprosto klíčovou infrastrukturu státu. Její **zásadní transformace je nutně spojena s řadou rizik**. Širokou škálu rizik spojených s **dopady změny klimatu** však přináší i zachování současného stavu, případně příliš pomalá a opatrná transformace. Základní přehled obou skupin rizik přinášíme níže, u transformačních rizik zacházíme do většího detailu.

{% include figure.html
    name="risk-map.svg"
    name-mobile="risk-map-mob.svg"
    alt="Přehled různých rizik transformace a netransformace energetiky"
    caption="Přehled různých rizik transformace a netransformace energetiky (a jejich konkrétních příkladů)"
    source-text="Fakta o klimatu"
%}

Zjednodušeně řečeno se může stát, že
* budeme **transformovat podle scénáře, který se ukáže jako chybný** (např. Evropa příliš spoléhala na zemní plyn, což se ukázalo jako bezpečnostní riziko), nebo
* **k prosazení transformace zvolíme špatné regulace** (např. český nepovedený solární boom okolo roku 2010) nebo
* se nám prostě solidní plán podpořený funkčními regulacemi **nepodaří dost rychle a levně zrealizovat** (např. když rozvoj větru nebo rozvoj přenosové soustavy výrazně zbrzdí povolovací procesy).

Ke snížení rizik spojených s transformací můžeme využít několik základních nástrojů:
- **Diverzifikovaný** rozvoj nízkoemisních výrobních kapacit (a diverzifikace investic do výzkumu a vývoje).
- **Široká škála možných pokračování** transformace. Potřebujeme zajistit, že na probíhající transformaci ve 20. letech bude moci navázat celá škála technicky smysluplných strategií ve 30. a 40. letech. Transformační riziko bude nižší, pokud nebudeme závislí na úspěšném rozvoji a škálování jedné konkrétní technologie (např. zelený vodík nebo malé modulární reaktory).
- **Dostatečná rezerva** ve výrobní kapacitě i v primárních energetických zdrojích. Taková rezerva sice zvyšuje celkové systémové náklady, snižuje ale riziko turbulencí, jako je například ta spojená s ruským plynem. Takovým opatřením může být třeba udržování části uhelné energetiky po jejím odstavení nějakou dobu v záloze (za státní peníze).

**Ideálním řešením se zdá být vhodná kombinace všech tří ukázkových scénářů. Tedy výrazně urychlit rozvoj obnovitelných zdrojů a technologií pro dlouhodobou akumulaci a současně mírně posílit jaderné zdroje a také přenosové kapacity pro import obnovitelné elektřiny ze zahraničí.**

## Co z toho plyne?

Pro přechod Česka na bezemisní energetiku z toho plyne několik základních závěrů:

Potřebujeme maximalizovat instalaci solárních a obzvláště pak větrných elektráren
{: .callout .contrast-figure}

Výrazně vyšší podíl solárních a větrných zdrojů dobře zapadá do mnoha návazných scénářů transformace. Navíc není žádná jiná cesta, která by mohla tak rychle přispět ke snížení emisí. **Rozvoj větrné energetiky je obzvláště důležitý pro zimní půlku roku.** Potenciál větru je v Česku omezený, ale pořád [velmi podstatný](/infografiky/potencial-vetrne-energie-cr): jeho využití ve velké míře závisí na jasné strategické podpoře ze strany státu.

Potřebujeme posilovat energetickou spolupráci napříč Evropou a urychlit další propojování a posilování přenosových soustav
{: .callout .contrast-figure}

To znamená více sladit národní energetické koncepce, aby dohromady tvořily funkční evropský mix. Podle toho můžeme pokračovat ve strategickém propojování přenosových soustav. **Česko touto cestou může získat přístup k výrobě z obnovitelných zdrojů nad limity toho, co jsme schopni postavit na našem území.** Konkrétně k větrným farmám na moři, k jižnímu slunci v zimě, příp. k elektřině ze zeleného vodíku. Stejně tak **lépe propojená síť umožní lépe vstřebávat výkyvy ve výrobě ze slunce a větru**. Užší energetická spolupráce v Evropě je klíčový nástroj pro snížení nákladů i rizik transformace energetiky v Česku.

Potřebujeme podporovat rozvoj široké škály řešení pro vyrovnávání podstatně proměnlivé výroby ze slunce a větru
{: .callout .contrast-figure}

To nám umožní dále snižovat výrobu elektřiny z fosilních zdrojů a dokonce postupně snižovat jejich instalovaný výkon. Mnohé z flexibilních zdrojů vyžadují dlouhodobé plánování, podporu a přípravu: výroba nebo import **zeleného vodíku** vyžaduje rozvoj infrastruktury, **fosilní zdroje s CCS** vyžadují přípravu a vybudování úložišť uhlíku, **velké množství biomasy** vyžaduje proměnu nakládání s odpady i proměnu hospodaření v krajině. Dostatečný rozvoj těchto nástrojů tak závisí na dlouhodobé strategické podpoře státu.

Potřebujeme rozumnou strategii ohledně budoucnosti jaderné energetiky
{: .callout .contrast-figure}

Jinými slovy, potřebujeme politické rozhodnutí, jak výraznou roli má hrát jádro v naší energetice za 30 let. Rozvoj jádra může odchod od fosilních paliv v Česku o něco zjednodušit. Možnosti rozvoje jádra jsou ale omezené: nepomůže nám v rychlé dekarbonizaci a do roku 2050 nemůže zdaleka pokrýt celou naši spotřebu. Vzhledem ke stárnoucím zdrojům bude pro Česko velká výzva i jen stávající výrobu z jádra udržet. **Jediná realistická cesta rozvoje jaderné energetiky je souběžně s výrazným rozvojem energetiky založené na slunci a větru.** Také samozřejmě můžeme od rozvoje jaderné energetiky upustit a spolehnout se na ostatní zdroje elektřiny a import, příp. čekat na vývoj ohledně malých modulárních reaktorů.

Stavba konvenčních jaderných bloků nese obrovské investiční riziko, které energetické firmy nejsou schopné nést samy. Pokud je tedy chceme stavět, bude to vyžadovat státní podporu nebo státem garantovanou výkupní cenu.

Porovnání nákladů a rizik jednotlivých scénářů je zatížené nejistotou. Je rozumné bezemisní energetiku rozvíjet na více frontách
{: .callout .contrast-figure}

Jak se ukazujeme našimi ilustrativními scénáři: k bezemisní energetice vede více cest. Protože každá z nich je spojená s nemalými riziky, je rozumné (alespoň v následující dekádě) usilovat o ambiciózní rozvoj více druhů bezemisních zdrojů elektřiny a tím diverzifikovat rizika. Pokud budoucí vývoj ukáže, že některá z nabízených cest je výrazně jistější a výhodnější, můžeme další rozvoj více zaměřit tímto směrem.

Pro připomenutí: těmto strategickým volbám je nadřazený imperativ mimo rámec tohoto textu:

Potřebujeme podporovat pokračující **energetické úspory** a lépe využívat domácí **druhotné zdroje energie** (jako odpadní teplo)
{: .callout .contrast-figure}

Nejlevnější elektřina je často ta, kterou vůbec nevyrobíme a energetické úspory pomáhají krotit nárůst spotřeby. Nejde jen o úsporu nákladů, více zdrojů bezemisní elektřiny má v Česku omezený potenciál rozvoje, pokrýt nižší spotřebu tedy je principiálně snazší.

## Poznámky a zdroje

### Zdroje
* Climate Change 2022: Mitigation of Climate Change, [Chapter 6: Energy systems](https://www.ipcc.ch/report/ar6/wg3/downloads/report/IPCC_AR6_WGIII_Chapter_06.pdf), IPCC, 2022.
* C. Breyer et al. [On the History and Future of 100% Renewable Energy Systems Research](https://ieeexplore.ieee.org/document/9837910), IEEE Access, 2022.
* [Net Zero by 2050](https://www.iea.org/reports/net-zero-by-2050), IEA, 2021.
* [Nuclear Power and Secure Energy Transitions](https://www.iea.org/reports/nuclear-power-and-secure-energy-transitions), IEA, 2022.
{: .footnotes}

{:#studie}
### Scénáře transformace české energetiky do roku 2050

* [New Generation: Building a clean European electricity system by 2035](https://ember-climate.org/insights/research/new-generation/), EMBER Climate, 2022 (obsahuje [scénáře](https://ember-climate.org/data/data-tools/european-clean-power-pathways-explorer/) až do roku 2050).
* [Energetická revoluce](https://www.greenpeace.org/static/planet4-czech-republic-stateless/2021/10/93cc9533-energeticka_revoluce.pdf), Greenpeace a Hnutí Duha, 2021.
* [Klimaticky neutrální Česko](https://www.mckinsey.com/cz/~/media/mckinsey/locations/europe%20and%20middle%20east/czech%20republic/our%20work/decarbonization_report_cz_vf.pdf), McKinsey & Company, 2020.
{: .footnotes}

### Poznámky

[^consumption-metric]: Technicky vzato jde o čistou spotřebu a ztráty při přenosu a distribuci elektřiny. Z hrubé spotřeby tedy vynecháváme složky závislé na energetickém mixu: vlastní spotřebu elektráren a spotřebu přečerpávacích vodních elektráren.
[^pokryti-spotreby]: V případě velkého využívání slunce a větru snadno dochází v určitých momentech k nadvýrobě elektřiny. Proto v grafech nezobrazujeme, kolik zdroj vyrobí elektřiny celkem, ale kolik z ní je přímo použitelné, tedy do jaké míry zdroj přispěje k pokrytí momentální poptávky. Část nadbytků je ovšem možné uložit a využít později, tato elektřina se pak objeví v kategorii flexibilních zdrojů.
[^seasons-definition]: Pro jednoduchost rozdělujeme rok na dvě poloviny, _zimní půlkou_ myslíme období _říjen–březen_, _letní půlkou_ pak období _duben–září_.
[^seasons-wind]: Tímto myslíme výrobu z větru ve výši 30 TWh za rok. To je sice asi 50x více než dnes, pořád je to ale bezpečně pod technickým potenciálem větrné energetiky v Česku (a blízko tomu, jak svůj potenciál už dnes využívá jižní část Německa).
[^aktualni-skala-biomasy]: Pro srovnání: v roce 2020 se z biomasy a bioplynu vyrobilo 4,7 TWh [elektřiny](https://www.eru.cz/rocni-zprava-o-provozu-elektrizacni-soustavy-cr-pro-rok-2020) a 6,4 TWh [tepla](https://www.eru.cz/rocni-zprava-o-provozu-teplarenskych-soustav-cr-za-rok-2020) netto. K tomu bylo podle [statistik energetické bilance](https://ec.europa.eu/eurostat/web/energy/energy-flow-diagrams) Eurostatu potřeba asi 20 TWh biomasy, dalších asi 30 TWh pevné biomasy se spaluje přímo v domácnostech a v průmyslu a z dalších cca 8 TWh řepky se vyrobí 3,2 TWh bionafty (při [60% energetických ztrátách](https://journals.sagepub.com/doi/pdf/10.1260/0144-5987.32.6.1005) při výrobě bionafty). Celkově se tedy dnes v Česku primární produkce biomasy na energetické účely pohybuje okolo 60 TWh ročně. K výrobě veškeré chybějící elektřiny (tedy 30 TWh) a dalšího velkého množství tepla (řekněme opět 30 TWh) bychom potřebovali minimálně 100 TWh biomasy, přičemž další biomasa se jistě spotřebuje v domácnostech a průmyslu. V součtu by to tedy bylo alespoň 2x více energetické biomasy než dnes.
[^cena-technologii]: Pracujeme nejvíce s [odhady od IEA](https://iea.blob.core.windows.net/assets/ae17da3d-e8a5-4163-a3ec-2e6fb0b5677d/Projected-Costs-of-Generating-Electricity-2020.pdf) z roku 2020 a s odhady od poradenské agentury [Lazard](https://www.lazard.com/perspective/levelized-cost-of-energy-levelized-cost-of-storage-and-levelized-cost-of-hydrogen/). Na základě těchto zdrojů sestavujeme koeficienty pro náš [vlastní výpočet](https://docs.google.com/spreadsheets/d/16UJHRk10fZ9UC6-z8G8HyiUdiJOtRYdD-nsO_KIwTIY/edit?pli=1#gid=1790381195) systémových nákladů.
[^cena-fixni-naklady]: Číslo 90 miliard korun nejlépe vyjadřuje, _jaké by byly investiční náklady, kdybychom naši momentální výrobní základnu stavěli dnes_, tedy nikoli skutečnou výši splácených úvěrů jednotlivých firem. Výjimku ve výpočtu děláme u solárních a větrných elektráren, u nichž bereme odhad investičních nákladů okolo roku 2010 (kdy byla většina z nich postavena), a u jaderné elektrárny Dukovany, u které odhadujeme pouze investiční náklady spojené prodloužením jejího provozu do poloviny 40. let. Kdybychom pro uhelné elektrárny a elektrárnu Temelín uvažovali jen třetinové investiční náklady, klesnou celkové investiční náklady asi o 40 miliard.
[^cena-regulovane-elektriny]: Obsahuje náklady na distribuční a přenosové soustavy (provoz, investice, ztráty v síti; řádově 50 mld. korun ročně) a náklady na udržování stability v síti (řádově do 10 mld. ročně).
[^cena-povolenky]: V roce 2018 by k tomu povolenky přidaly dalších zhruba 20 miliard (s cenou okolo 25 EUR za tunu emisí), v roce 2021 asi 65 miliard (okolo 80 EUR za tunu). To dělá 0,30–1,00 Kč/kWh čisté spotřeby. Tyto peníze nicméně do systémových nákladů nezahrnujeme, protože jsou státním příjmem, který jde převážně zpět na investice do dekarbonizace. Na druhou stranu jsou to náklady, které platí zákazníci za elektřinu a které při nízkoemisním mixu v budoucnu odpadnou.
[^cena-zemni-plyn]: V tomto výpočtu bereme výrobní mix z roku 2021 a předpokládáme průměrnou cenu zemního plynu na úrovni 150 EUR/MWh.
[^cena-ilustrativniho-mixu]: Zde počítáme náklady na 1 kWh elektřiny konzervativněji: 1,20 Kč slunce, 1,30 Kč vítr, 3,50 Kč jádro, 4 Kč biomasa, 5 Kč krátkodobé ukládání a stejně tak plyn s CCS. Ceny pro slunce a vítr jsou oproti celosvětovému indexu upraveny – úměrně nižším výnosům v ČR. Cena pro biomasu zhruba odpovídá dřívějším výkupním cenám pro bioplyn a čistou biomasu v rámci podpory OZE. Cena pro krátkodobé ukládání počítá s odhadem [LCOS](https://www.lazard.com/media/451882/lazards-levelized-cost-of-storage-version-70-vf.pdf) 200 EUR / MWh, cena plynu s CCS vychází z [odhadu IEA](https://www.iea.org/reports/projected-costs-of-generating-electricity-2020), odhad ale zvyšujeme kvůli velké nejistotě v ceně technologie i paliva.
[^cena-paroplynova-zaloha]: Pro přibližnou představu: 5 GW paroplynových záloh s CCS by vyžadovalo _overnight costs_ řádově 300 mld. korun, při úrokové míře 8 % a 30 letech provozu to vytváří náklady asi 25 mld. korun ročně.
[^cena-rozvoj-site]: Investice spojené s běžnou obnovou a rozvojem přenosové a distribuční soustavy se dnes pohybují okolo 20 mld. korun ročně (viz [MAF CZ 2021](https://www.ceps.cz/cs/tiskove-zpravy/novinka/ceps-vydava-maf-cz-2021-analyzuje-dopady-ruznych-smeru-vyvoje-energetickeho-mixu-do-roku-2040), kap. 7). Tyto náklady se  platí z regulované složky ceny elektřiny. S rostoucími potřebami nové energetiky se nicméně do roku 2030 očekává nárůst investic až ke 30 mld. korun ročně. Tyto odhady jsou navíc založeny na poměrně opatrných plánech rozvoje výroby ze slunce a větru, ve skutečnosti tedy pravděpodobně nebudou stačit, obzvláště pro rok 2050. Pro srovnání: náklady na cca 500 km budovaného podzemního 2 GW HVDC kabelu v Německu se [odhadují](https://www.mdr.de/nachrichten/sachsen-anhalt/faq-strom-trasse-suedostlink-verlauf-kosten-100.html#sprung9) v přepočtu na 110 mld. korun. Cena jednoho kilometru takového spojení tedy zhruba odpovídá [ceně nové dálnice](https://zdopravy.cz/od-roku-2009-doslo-ke-snizeni-ceny-za-kilometr-dalnice-o-tretinu-rika-sef-rsd-79485/), podobně jako dálnice se ale může ještě podstatně prodražit. Podobná vzdálenost odděluje Česko od Baltského moře, pokud však budeme muset hodně elektřiny importovat, budeme potřebovat několikanásobek této přenosové kapacity. Dodatečné náklady ve výši několika desítek miliard korun ročně tedy rozhodně nejsou nadsazený odhad.
[^cena-prodrazeni-jadra]: Dva nové velké jaderné bloky by dodaly cca 15 TWh ročně. Pokud investiční náklady této výroby stoupnou z 80 EUR/MWh na 160 EUR/MWh, znamená to vícenáklady 2 Kč na jednu kWh z těchto zdrojů, tedy celkem asi 30 mld. korun ročně.
[^cena-vysledna]: Toto je hrubý odhad celkové průměrné ceny elektřiny pro zákazníky bez DPH. Nicméně maloodběratelé, zvlášť ti s nízkou spotřebou, přispívají na provoz distribuční soustavy a podporované zdroje energie výrazně více, proto pro ně bude cena až o několik korun na kWh vyšší. Velké podniky mají naopak obvykle cenu o něco nižší, než je celorepublikový průměr.
