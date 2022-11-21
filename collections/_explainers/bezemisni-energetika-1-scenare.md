---
layout:      explainer
title:       "Jaké má Česko cesty k bezemisní elektřině?"
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
  Dekarbonizace energetiky je klíčový a nutný krok k dosažení uhlíkové neutrality. Tento krok není možné udělat snadno a hned, i pro bohaté evropské státy je to významná technická a ekonomická výzva na dalších 20 až 30 let. Pokud chceme jít smysluplnou cestou, musíme alespoň v obrysech porozumět nástrahám, které nás na ní čekají, a možným cílům, ke kterým bychom chtěli dojít. Tento text provádí právě takový průzkum terénu, z pohledu české a evropské elektroenergetiky.

---

{% include series-box.html series-id=page.series-id selected=page.slug %}

{% include tldr.html content="
- Během dalších 30 let budeme potřebovat **znatelně více elektřiny** než dnes.
- Zásadní jsou **solární a větrné zdroje**. V rámci těchto zdrojů **klíčovou roli hraje větrná energetika**, pro vyrovnanost výroby během roku. Udržení nebo mírné navýšení současné **výroby z jádra** nám může problém zjednodušit.
- Pokud nedokážeme postavit dostatek lokálních větrných zdrojů, potřebujeme to nahradit importem větrné výroby ze zahraničí, výraznějším rozvojem jaderné energetiky, nebo spoléhat na dlouhodobé ukládání elektřiny, příp. technologii _CCS_.
- Do rozhodování o budoucí energetice vstupuje řada aspektů: stabilita sítě, finanční náklady, energetická bezpečnost nebo i provázanost s centrálním zásobováním teplem.
- Plány na dalších 30 let nutně obsahují velké množství neznámých parametrů: potřebujeme pojmenovávat různé druhy rizik a zvažovat jejich přijatelnost.
" %}

## Jaké jsou klíčové parametry budoucí energetiky?

_Toto je komplexní otázka a tak začneme rámováním celého problému. Později pak na základě technologicky dostupných možností ukazujeme několik ilustrativních scénářů. Cílem tohoto textu není poskytnout odbornou studii transformace elektroenergetiky. Chceme srozumitelně ukazovat obrysy možných cest a rozhodnutí, která nás čekají. Pro lepší pochopitelnost celý problém zjednodušujeme, konkrétní omezení zmíníme na patřičných místech v textu._

### Kolik budeme potřebovat elektřiny?

Úplně na začátku si musíme uvědomit základní kontext dekarbonizace: **výroba elektřiny bude hrát v budoucím světě klíčovou roli**. Při dekarbonizaci totiž potřebujeme zásadně omezit emise skleníkových plynů v dalších sektorech, kde spalujeme fosilní paliva: v dopravě, ve vytápění, v průmyslu. Pro mnohé případy je elektrifikace nejvýhodnější nebo dokonce jediná realistická možnost náhrady tohoto spalování fosilních paliv. Pro zbylé oblasti, kde elektřina není vhodná (např. letecká a lodní doprava nebo průmyslové procesy s vysokými teplotami) se navíc ve velké míře počítá s využitím vodíku nebo syntetických paliv vyráběných z nadbytečné elektřiny. Znamená to, že v budoucnu budeme potřebovat elektřinu i v oblastech, kde jsme ji (díky používání fosilních paliv) doposud nepotřebovali. **I přes zásadní energetické úspory tak spotřeba elektřiny v dalších 30 letech vzroste řádově o polovinu.**

<!-- Více detailů k proměně celkové energetiky nabízíme v samostatném explaineru. -->

**Problém, který řešíme je tedy mnohem těžší, než jen nahradit stávající zdroje elektřiny nízkoemisními. Potřebujeme zásadně snížit emise a současně zásadně zvýšit výrobu elektřiny.**

{% include preview-box.html
    class="highlight-text-box"
    text="**TWh**, tedy **terawatthodina** je jednotka energie. Tolik elektřiny v současnosti za rok vyrobí menší uhelná elektrárna nebo v domácnostech spotřebuje asi 700 000 obyvatel ČR."
%}

Pro jednoduchost budeme v této sérii textů předpokládat postupný nárůst čisté spotřeby až ke **100 TWh ročně**[^consumption-metric], jak ukazuje následující graf. Tento nárůst zhruba odpovídá odhadům [dostupných studií](#studie).

_TODO: Anotovat v grafu, že v roce 2020 byla čistá spotřeba 59 TWh._{:.todo}

{% include figure.html
    class="narrow-figure"
    name="consumption.png"
    alt="Ilustrativní vývoj spotřeby v ČR v dalších dekádách."
    caption="Ilustrativní vývoj čisté spotřeby v ČR v dalších dekádách."
    source-text="Fakta o klimatu"
%}

### Jak rychle potřebujeme dekarbonizovat výrobu elektřiny?

Dalším přitěžujícím parametrem tohoto problému je potřebná rychlost změny. **Závažnost důsledků klimatické změny ve velké míře závisí na rychlosti dekarbonizace.** Množství emisí uhlíku, které ještě můžeme vypustit do atmosféry, abychom v souladu s Pařížskou dohodou udrželi průměrné oteplení do 1,5 °C, označuje tzv. [uhlíkový rozpočet](/infografiky/koncept-uhlikovy-rozpocet). Při současných emisích bychom náš zbývající uhlíkový rozpočet vyčerpali asi za 10 let. Snížení celosvětových emisí už v této dekádě je tedy klíčové.

**Je důležité dodat, že takto rychle nemusíme energetiku dekarbonizovat kompletně.** Pokud se nám do konce této dekády a s pomocí dnes dostupných technologií podaří snížit emise v elektroenergetice třeba na 50 % současných hodnot, získáme tím více času na odstranění dalších emisí a více času na vývoj technologií, které zatím nejsou komerčně dostupné. Během třicátých let ovšem také nesmíme polevit. Až se nám podaří snížit emise v elektroenergetice třeba na 10 % současných hodnot, budeme čerpat zbývající uhlíkový rozpočet 10x pomaleji a můžeme si tak pro zbylou dekarbonizaci dopřát větší rozvážnost.

### Na jakých pilířích můžeme budoucí energetiku postavit?

{% include preview-box.html
    title="Detaily k jednotlivým technologiím"
    text="Více informací k jednotlivým zdrojům elektřiny nabízí další díl této série."
    slug="bezemisni-energetika-2-technologie"
%}

Ve světle těchto východisek v tomto textu budeme pracovat s následujícími pilíři pro výrobu bezemisní elektřiny v Česku:

1. **Slunce a vítr** mají velmi rychlé nasazení, nízké investiční náklady a stále obrovský nevyužitý potenciál v ČR. Tyto zdroje mají ale výrazně proměnlivou výrobu.
2. **Jádro** dokáže vyrábět stabilně, má ale dlouhou dobu výstavby, vysoké investiční náklady a vysoké investiční riziko. Část těchto problémů by mohla překonat technologie _malých modulárních reaktorů_, která zatím ale není zralá ke komerčnímu nasazení.
3. **Nízkoemisní flexibilní zdroje** jsou potřeba pro neustálé vyrovnávání výroby a spotřeby. Může to být biomasa, vodní elektrárny, fosilní zdroje s <glossary id='ccs'>CCS</glossary>. Podobnou funkci také plní technologie pro ukládání elektřiny (přečerpávací elektrárny, baterie, zelený vodík, apod.) a flexibilita spotřeby.

Naši současnou spotřebu pokrývají tyto tři pilíře jen z části, zbytek pokrývá vysokoemisní fosilní pilíř:
{% include figure.html
    name="mix-current.png"
    alt="Současné pokrytí spotřeby v ČR"
    caption="Současnou (čistou) spotřebu pokrývají bezemisní pilíře jen z části."
    source-text="Fakta o klimatu"
%}

V budoucnu potřebujeme tyto tři pilíře uváženě kombinovat. Např. nějakou míru bezemisních flexibilních zdrojů potřebujeme v každém scénáři, více jich ale budeme potřebovat při velkém využití elektřiny ze slunce a větru.

Další strategické rozhodnutí je, jak výraznou chceme **soběstačnost ve výrobě elektřiny**, tedy jakou část spotřeby chceme nutně pokrýt z českých zdrojů. Zbytek bychom mohli **importovat ze zahraničí**, pokud to dovolí výrobní kapacity okolních států a možnosti přeshraniční přenosové soustavy.


### Co musí budoucí mix splňovat?

Jaká můžeme použít kritéria ve výběru a hodnocení jednotlivých cest dekarbonizace? Budoucí mix musí splnit celou řadu vlastností, tady chceme zdůraznit 6 z nich:

{% include columns.html
    class="wide-figure-desktop longread-small mb-2"
    column-class="col-12 col-md-6 mb-2"
    col1="
#### Stabilita

Pro fungování elektrické sítě je nutné, aby výroba elektřiny vždy odpovídala spotřebě. Pokud nebudeme mít _zdrojovou přiměřenost_, tedy dostatečné technické nástroje, jak stabilitu sítě zajišťovat, hrozí nám _blackouty_ se všemi ničivými dopady na společnost a hospodářství.

#### Sezónní vyváženost

Důležitá podmínka pro stabilitu sítě je soulad výroby a spotřeby na sezónní škále. Pro jednoduchost v tomto textu budeme rozlišovat _letní půlku roku_ (duben–září) od _zimní_ (říjen–březen).

Sezóna ovlivňuje výrobu, v letní půlce roku se například vyrobí 3x více elektřiny ze slunce než v zimní půlce. Sezóna také ovlivňuje spotřebu, v zimní půlce je dnes asi o 20 % vyšší spotřeba než v letní. Při výrazné elektrifikaci vytápění může být v roce 2050 zimní spotřeba dokonce o 40–50 % vyšší než v letní půlce roku.

#### Soulad s potřebami teplárenství

V Česku máme rozsáhlé systémy centrálního zásobování teplem. Teplárny kromě tepla vyrábí i elektřinu a tak řešení pro dekarbonizaci elektroenergetiky je nutně provázané s řešením pro dekarbonizaci tepláren. Část těchto soustav lze elektrifikovat (velkými tepelnými čerpadly, např. využívající odpadní teplo z čističek odpadních vod), takové řešení ale není použitelné všude. Další teplárny (na biomasu nebo bioplyn nebo zelený vodík) mohou plnit roli záložních zdrojů pro vyrovnávání výkyvů ve výrobě ze slunce a větru. V teplárenství se také v budoucnu může využívat odpadní teplo z malých modulárních reaktorů.
"
    col2="
#### Přiměřené náklady

Důležitý aspekt jsou budoucí celkové náklady na výrobu elektřiny, tedy součet investičních i provozních nákladů ze strany státu, energetických firem a dalších aktérů.

Pravděpodobně budou o něco vyšší než dnes (srovnání s dnešními náklady ovšem může být zavádějící, protože typicky do nákladů nezapočítáváme všechny negativní externality jako znečištění ovzduší a dopady na klima).

Přesto nutně potřebujeme, aby i v budoucnu byla elektřina dostupná a umožnila tak dostatečný životní standard pro všechny vrstvy společnosti. Celkově, čím nižší budou náklady na výrobu bezemisní elektřiny, tím snazší bude celá transformace politicky i ekonomicky.

#### Energetická bezpečnost

Více než polovina současné konečné spotřeby energie pochází z dovezené ropy a zemního plynu. Klíčový aspekt budoucí energetiky tedy je: jak můžeme snížit naši závislost na každém jednotlivém státu, ze kterého tyto suroviny pochází? A jak a o kolik můžeme snížit naši energetickou závislost obecně?

#### Vyvážené riziko

Energetická bezpečnost poukazuje na některé druhy rizik. Transformace jich bude přinášet širší škálu: investiční rizika obřích staveb, rizika skončení ve slepé uličce (např. při sázce na konkrétní budoucí technologii), rizika společenské nestability, když se transformace nebude dařit. Tedy riziko dopadů změny klimatu není rozhodně to jediné na stole.

Vlády i soukromé firmy budou dělat spoustu rozhodnutí s nejasnými důsledky. Všichni aktéři a obzvláště stát musí tuto škálu rizik přijmout a vhodnou strategií snižovat jejich pravděpodobnost a jejich možné dopady.
"%}

## Jak mohou vypadat úspěšné scénáře?

Jak tedy může budoucí mix výroby elektřiny vypadat? Pomocí tří _ilustrativních_ scénářů chceme ukázat základní možnosti, jak můžeme v dalších dekádách naši rostoucí spotřebu pokrývat[^pokryti-spotreby]. Každý z těchto scénářů ukazuje určitou krajní cestu, v praxi nepochybně zvolíme nějakou kompromisní cestu mezi těmito extrémy.

{% assign comment_vre="
Tento scénář vyžaduje nejvýraznější rozvoj domácí **solární a větrné energetiky**, ale také výraznou výrobu z flexibilních zdrojů.

To v rámci flexibilních zdrojů vyžaduje široké nasazení dlouhodobého ukládání elektřiny - pomocí **zeleného vodíku**. Tato technologie zatím ovšem není dost levná, aby se v Česku tržně prosadila (oproti spalování uhlí)." %}
{% assign comment_import="
**Import elektřiny z větru, převážně v zimní polovině roku** snižuje nároky na výrobu z flexibilních zdrojů a v menší míře i na domácí výrobu ze slunce a větru.

Tento scénář ovšem závisí na výrobě v jiných zemích a vyžaduje stavbu dalších interkonektorů, což jsou nákladné liniové stavby s obtížným schvalováním." %}
{% assign comment_nuclear="
**Výrazný rozvoj výroby z jádra** má smysl jedině v kombinaci s rozvojem solární a větrné energetiky. Nejsme totiž schopni postavit tolik nových bloků, abychom tím pokryli celý nárůst spotřeby.

Rozvoj jádra snižuje tlak na ostatní pilíře. Může ale také během 20. a 30. let omezit rozvoj slunce a větru (sníží jejich návratnost, příp. i ochotu státu je dotovat). To zvyšuje celkovou výrobu z fosilních zdrojů a tak i emise CO<sub>2</sub>." %}
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
    alt="Ilustrativní scénáře úspěšné dekarbonizace energetiky v Česku"
    caption=caption_comments
    source-text="Fakta o klimatu"
%}

{% capture failure_scenarios %}
Pro kontext je užitečné ukázat ilustrativní neúspěšné scénáře, spojené s malými úspěchy v rozvoji slunce a větru a se zpožděním případných jaderných staveb*:

{% assign comment_fail_wind="
Pokud **nebudeme schopni postavit dost větrných elektráren**, zúží se škála možností jak pokrýt rostoucí spotřebu a nahradit stárnoucí jádro. To může vést k rostoucí výrobě z fosilních zdrojů.

Pomoct by mohly jiné nástroje, které vyžadují dlouhodobé plánování a rozvoj: posílení interkonektorů a import větrné energie ze zahraničí, dostatečně levná sezónní akumulace, která umožní větší rozvoj solární energie, fosilní plyn s CCS."%}
{% assign comment_fail_nuclear="
Může dojít k **selhání a zrušení rozpracovaných jaderných projektů** (i to se ve světě v historii stalo). Při úspěšném paralelním rozvoji OZE ani to nemusí vést ke katastrofickým akumulovaným emisím CO<sub>2</sub>. Přesto je v takovém scénáři nutné připravovat půdu pro další výrobní pilíře, abychom na takovou situaci byli schopni v 50. a 60. letech adekvátně reagovat.
"%}
{% assign comment_fail_nuclear_vre="
Pokud bychom vsadili pouze na jádro, pravděpodobně nebude dost politické ani byznysové vůle v mezičase výrazně rozvíjet slunce a vítr.

V případě **výrazného zpoždění jaderných staveb** tak hrozí velké akumulované emise CO<sub>2</sub>.

V praxi by nejspíš do určité míry pomohly přetoky OZE ze zahraničí.
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

{:.longread-small}
\* Pro jednoduchost porovnání i v těchto neúspěšných scénářích necháváme stejný vývoj spotřeby. Ve skutečnosti by neúspěchy v dekarbonizaci výroby elektřiny pravděpodobně vedly i k pomalejší elektrifikaci a tedy pomalejšímu nárůstu spotřeby elektřiny.

{% endcapture %}

{% include expander-figure.html
    name="failure-scenarios"
    class="wide-figure-desktop contrast-figure "
    label-class="large-expander-title"
    label="Kontext: Jak mohou vypadat neúspěšné scénáře?"
    content=failure_scenarios
%}

V dalším textu přidáváme k těmto ilustrativním scénářům několik vhledů, které nám dále vyjasní, jak mezi nimi vybírat.

## Jak dosáhnout sezónní vyváženosti?

**Klíčový problém českého bezemisního mixu je pokrytí zimní spotřeby.** Pro jednoduchost rozdělujeme rok na dvě poloviny, _zimní půlkou_ myslíme období _říjen–březen_. V zimní polovině roku dodají solární panely výrazně méně než v letní polovině. Naopak, větrné elektrárny vyrábí více v zimě.

{% include figure.html
    name="factors-solar-wind.png"
    alt="Průměrné koeficienty využití solárních a větrných zdrojů během roku"
    caption="Průměrné koeficienty využití solárních a větrných zdrojů během roku. Více v přehledech potenciálu [slunce](/infografiky/potencial-solarni-energie-cr-strechy) a [větru](/infografiky/potencial-vetrne-energie-cr) v ČR."
    source-text="Fakta o klimatu"
%}

**V Česku máme pro pokrytí zimní poloviny roku nedostatečný potenciál větru**. Ukážeme to na ambiciózní výrobě z větru ve výši 30 TWh za rok (to je asi 50x více než dnes, pořád ale bezpečně pod technickým potenciálem větrné energetiky v Česku). Když k tomu přidáme tolik slunce, abychom neměli v létě zásadní přebytky, bude vždy v zimě podstatně chybět elektřina. V následujícím ilustrativním mixu to dorovnává biomasa a další (neupřesněné) flexibilní zdroje.

{% include figure.html
    class="seminarrow-figure"
    name="seasonal-baseline.png"
    alt="Sezónní vyváženost ilustrativního mixu"
    caption="Scénář bezemisní výroby elektřiny s ambiciózním rozvojem větrné energetiky (bez nového jádra). Tento scénář vyžaduje velké množství flexibilních zdrojů, obzvláště v zimě."
    source-text="Fakta o klimatu"
%}

Jak naznačujeme, vhodným flexibilním výrobním zdrojem na pokrytí části zimní spotřeby je **biomasa**. Jednak se dobře skladuje, jednak je vhodná pro menší teplárenské bloky, tedy kromě v zimě potřebné elektřiny může poskytnout i v zimě potřebné teplo. Pokrýt z tohoto zdroje více než 30 TWh elektřiny ročně (a další desítky TWh tepla) je ovšem na hraně potenciálu biomasy. Oproti dnešku by to znamenalo alespoň zdvojnásobit energetické využití biomasy[^aktualni-skala-biomasy], což by přinášelo by konflikty s dalšími hodnotami jako je biodiverzita nebo estetika krajiny.

Dalším možným flexibilním výrobním zdrojem jsou **fosilní zdroje s CCS**. Ty ovšem ve velkém použití také přináší sadu problémů, obzvláště se pojí s nenulovými emisemi.

**Proto je výhodné doplnit mix dalšími významnými zdroji na zimní polovinu roku**, abychom potřebovali méně biomasy a zdrojů s CCS. Ukážeme si tři základní možnosti (které odpovídají třem úspěšným scénářům v úvodu):

{% capture caption_comments_seasonality %}
{% include columns.html
    class="longread-small"
    column-class="col-4"
    col1="
#### 1. Zelený vodík

Můžeme **posílit roli slunce** a zásadně využívat **sezónní akumulaci do zeleného vodíku**, která je zatím poměrně drahá. To závisí na zlevnění technologií pro výrobu zeleného vodíku, aby se vyplatila provozovat třeba jen 15 % hodin z roku, kdy budou přebytky výroby ze slunce."
    col2="
#### 2. Import (větrné výroby)
**Elektřinu z větru můžeme importovat ze zahraničí, což hlavně dorovnává zimní bilanci.** V tak velké míře to není možné bez posílení přenosové soustavy ze sousedních států. To vyžaduje složité povolování a realizaci liniových staveb.
"
    col3="
{:start='3'}
#### 3. Posílení jádra
Tento scénář vyžaduje kromě výrazného rozvoje výroby ze slunce a větru také **velmi ambiciózní** rozvoj jaderné energetiky – 3 nové velké jaderné bloky a několik dalších malých modulárních reaktorů.
"
%}
{% endcapture %}
{% include figure.html
    class="wide-figure-desktop wide-figure-mobile wide-figure-mobile-caption-above mt-0"
    name="seasonal-alternatives.png"
    alt="Sezónní vyváženost ilustrativního mixu"
    caption-above=caption_comments_seasonality
    caption="Různé přístupy doplňují chybějící výrobu v zimě jiným způsobem, buď akumulací přebytků z léta nebo zdrojem, který je schopen více vyrábět v zimě (ať už je to zahraniční větrná výroba na moři nebo jaderné bloky, u kterých lze na léto plánovat výměny palivových souborů, příp. flexibilně snižovat výrobu)"
    source-text="Fakta o klimatu"
%}

Spoléhat se v Česku **čistě** na slunce a vítr není možné. Vždy potřebujeme alespoň jeden nesnadný nástroj pro vyrovnání zimní spotřeby: zelený vodík, import, jádro, případně velké množství biomasy nebo fosilní zdroje s CCS.

Je potřeba pamatovat na to, že zde ukazujeme optimistický scénář rozvoje větrné energetiky. V základním scénáři výše se **mezera v pokrytí zimní spotřeby elektřiny může z 25 TWh zvětšit až na 40 TWh**, pokud se nám nepodaří větrnou energetiku patřičně rozvinout.

## Kolik to celé bude stát?

Pro jednoduchost se v tomto textu zaměříme na **systémové náklady na výrobu elektřiny**. Tedy jaké budou celkové investiční a provozní náklady všech aktérů, kteří dohromady tvoří elektrizační soustavu. Toto číslo můžeme jen odhadovat na základě nákladů dostupných referenčních projektů. V tomto textu budeme používat dnešní ceny jednotlivých technologií[^cena-technologii] a nepočítáme s predikcemi jejich zlevňování v budoucnu. V tomto smyslu tedy nabízíme konzervativní odhady budoucích nákladů: _Kolik by to celé stálo, pokud se žádná z rozvíjejících technologií nepodaří zásadně zlevnit?_

### 2018: Kolik to stojí dnes?

Pro perspektivu, **podle našich hrubých odhadů byly v roce 2018 české systémové náklady na výrobu elektřinu v řádu 220 miliard korun ročně.** Řádově z toho palivo tvořilo asi 30 miliard, investiční náklady na elektrárny asi 90 miliard[^cena-fixni-naklady], fixní provozní náklady elektráren asi 40 miliard a zbylých 60 miliard směřovalo na provoz celé sítě, placené pomocí regulované složky ceny elektřiny[^cena-regulovane-elektriny]. **V přepočtu na 1 kWh čisté spotřeby jsme tedy měli systémové náklady okolo 3,60 Kč/kWh.**

**V současné energetické krizi** pro roky 2021/2022 se ovšem systémové náklady zvyšují až ke 285 miliardám ročně (4,40 Kč/kWh), převážná většina nárůstu jde na vrub mnohonásobně vyšší ceny zemního plynu[^cena-zemni-plyn].

{% include figure.html
    name="costs-2018.png"
    alt="Hrubý odhad současných systémových nákladů na výroby elektřiny"
    caption="Hrubý odhad současných systémových nákladů na výroby elektřiny v Česku (2018–2021), bez daní a emisních povolenek."
    source-text="Fakta o klimatu"
%}

V tomto odhadu **nejsou počítané emisní povolenky** ani další daně. V roce 2018 by k tomu povolenky s cenou okolo 25 EUR za tunu přidaly dalších zhruba 20 miliard, v roce 2021 s cenou okolo 80 EUR za tunu by přidaly asi 65 miliard, což dělá 0,30–1,00 Kč/kWh čisté spotřeby. Tyto peníze nezahrnujeme do systémových nákladů, protože jsou státním příjmem, který jde převážně zpět na investice do dekarbonizace. Na druhou stranu jsou to náklady, které platí zákazníci za elektřinu a které při nízkoemisním mixu v budoucnu odpadnou.

Naopak tento odhad pravděpodobně **přeceňuje investiční náklady**, protože většina elektráren byla stavěna za minulého režimu za státní peníze a dnes splácí nanejvýš úvěry za investice do odsíření a další ekologizaci provozů. Kdybychom pro uhelné a jaderné elektrárny uvažovali jen třetinové investiční náklady, klesnou investiční náklady asi o 40 miliard, což je asi 60 halířů na kWh čisté spotřeby.

<!-- Tento odhad je založen na současném výrobním mixu a referenčních nákladech jednotlivých technologií. Tedy na potřebných investicích a nákladech na provoz a údržbu (pro daný koeficient využití elektrárny) a na nákladech na palivo a emisní povolenky. Z tohoto pohledu je potřeba brát výsledná čísla jen jako řádové odhady. Přes zjevnou nepřesnost ale tato čísla poskytují užitečné srovnání s budoucími náklady: ukazují, o kolik je budoucí nízkoemisní mix v principu nákladnější než dnešní významně fosilní. -->

### 2050: Kolik může stát nízkoemisní mix?

**Podobným postupem jsme odhadli systémové náklady pro naše tři ilustrativní scénáře.** Je třeba zdůraznit, že pro takový odhad nestačí pronásobit [sdružené náklady na výrobu elektřiny (LCOE)](/infografiky/cena-energie) výrobním mixem ve scénáři. **Systémové náklady budoucí sítě mají řadu další složek:**
- **Neefektivita nadvýroby.** Výrazné využití slunce a větru s sebou přináší v mnoha hodinách v roce znatelnou nadvýrobu, která je součástí systémových nákladů. Např. kdyby tato nadvýroba byla 10 TWh za rok, stojí nás to ročně okolo 15 miliard navíc.
- **Náklady na záložní zdroje.** Záložní zdroje nepotřebuje jen slunce a vítr, jsou také potřeba pro (nečekané) odstávky jaderných bloků. Při využití třeba 15 % času je potřeba kapitálové náklady rozpočítat na mnohem menší množství vyrobené elektřiny. Běžně uváděné hodnoty LCOE často předpokládají maximální využití a jsou tedy pro záložní zdroje zavádějící. Udržování záložních zdrojů může Česko stát několik desítek miliard korun ročně.[^cena-paroplynova-zaloha]
- **Náklady na výraznější posilování přenosové a distribuční soustavy** by byly významné pro scénář založený na velkém podílu slunce a větru, obzvláště pak při výrazném importu elektřiny ze zahraničí. Nad rámec dnes běžných investicí to pro Česko mohou být opět desítky miliard korun každý rok.[^cena-rozvoj-site]
- **Riziko dalších nákladů spojených se stavbou a likvidací jednotlivých zdrojů.** To může být prodražení jaderných staveb, nečekaně vysoké náklady na stavbu trvalého úložiště jaderného odpadu nebo nečekaně vysoké náklady na recyklaci komponent obnovitelných zdrojů. Prodražení stavby dvou nových velkých jaderných bloků na dvojnásobek odhadovaných investic (což je v Evropě v posledních dekádách poměrně běžný scénář) by např. znamenalo dodatečné každoroční náklady asi 30 miliard ročně.[^cena-prodrazeni-jadra]

**U všech tří scénářů vychází poměrné podobné systémové náklady.** Rozdíly v odhadované ceně zde pochopitelně jsou, ale mnohem významnější než tyto rozdíly je nejistota v každém z odhadů.

{% capture caption_comments_costs %}
{% include columns.html
    class="longread-small"
    column-class="col-4"
    col1="
#### 1. Zelený vodík

Ve scénaři se zeleným vodíkem hraje podstatnou roli cena solárních panelů a cena hydrolyzérů. Při konzervativním odhadu těchto cen vychází tento scénář jako nejdražší, při mírném snížení těchto nákladů se ovšem může snadno dostat na srovnatelnou úroveň s ostatními."
    col2="
#### 2. Import (větrné výroby)

Tento scénář nepřekvapivě vychází o něco levnější, protože počítá s výrobou části elektřiny ve výhodnějších podmínkách v zahraničí ale poskytuje tak o něco nižší energetickou nezávislost Česka. Pro přesnější odhady by byla potřeba robustní studie nákladů na posílení přenosových soustav.
"
    col3="
{:start='3'}
#### 3. Posílení jádra
Posílení jádra přináší významné investiční riziko. Pokud se podaří udržet investice na úrovni referenčních projektů z minulých dekád, má tento scénář také poměrně nízké náklady. Při významném prodražení těchto staveb by ovšem náklady mohly vyjít jako nejvyšší.
"
%}
{% endcapture %}
{% include figure.html
    class="wide-figure-desktop wide-figure-mobile wide-figure-mobile-caption-above mt-0"
    name="costs-2050.png"
    alt="Současné systémové náklady"
    caption-above=caption_comments_costs
    caption="Hrubý odhad systémových nákladů na výrobu bezemisní elektřiny v Česku v roce 2050, bez daní."
    source-text="Fakta o klimatu"
%}

Budoucí systémové náklady u každého ze scénářů vycházejí o něco vyšší než jsou současné náklady. Rozdíl je to ale poměrně malý. Tady je potřeba zopakovat, že tyto odhady nepočítají s dalším zlevňování technologií pro nízkoemisní výrobu elektřiny a jsou tedy pravděpodobně nadsazené.

## Jaká rizika souvisí s transformací elektroenergetiky?

Výroba a distribuce elektřiny je naprosto klíčová infrastruktura. **Výrazná transformace s sebou nutně přináší širokou škálu rizik**. Širokou škálu rizik **dopadů změny klimatu** ovšem přináší i zachování současného stavu příp. příliš pomalá a opatrná transformace. Níže ukazujeme základní naznačení obou druhů rizik, pro transformační rizika ovšem zacházíme do většího detailu.

{% include figure.html
    name="risk-map.png"
    alt="Přehled různých rizik transformace a netransformace energetiky"
    caption="Přehled různých rizik transformace a netransformace energetiky"
    source-text="Fakta o klimatu"
%}

V jednoduchosti se může stát, že budeme transformovat podle scénáře, který se ukáže jako chybný, že k prosazení transformace nasadíme špatné regulace nebo že se nám prostě dobrý plán podpořený dobrými regulacemi nepodaří dost rychle a levně zrealizovat.

Je několik základních nástrojů ke snížení rizika transformace:
- **Diverzifikovaný** rozvoj nízkoemisních výrobních kapacit (a diverzifikace investic do výzkumu a vývoje).
- **Široká škála možných pokračování** transformace. Potřebujeme zajistit, že na probíhající transformaci ve dvacátých letech může navázat celá škála technicky smysluplných strategií ve třicátých a čtyřicátých letech. Transformační riziko bude nižší, když nebudeme závislí na úspěšném rozvoji a škálování jedné konkrétní technologie (např. zelený vodík nebo malé modulární reaktory).
- **Dostatečná rezerva** ve výrobní kapacitě i v primárních energetických zdrojích. Taková rezerva sice zvyšuje celkové systémové náklady, snižuje ale riziko podobných turbulencí, jakou je ta okolo ruského plynu. Příkladem takového opatření může být třeba udržovat část uhelné energetiky po jejím odstavení nějakou dobu v záloze (za státní peníze).

**Všechny tyto aspekty volají po vhodné kombinaci všech tří ukázkových scénářů, tedy po urychleném rozvoji obnovitelných zdrojů a technologií pro dlouhodobou akumulaci a současně po rozvoji jaderných zdrojů stejně jako přenosových kapacit pro import obnovitelné elektřiny ze zahraničí.**

## Shrnutí

**Krátkodobá strategie pro Česko a Evropu je poměrně jasná: potřebujeme maximalizovat instalaci solárních a větrných elektráren a současně podporovat rozvoj široké škály řešení pro vyrovnávání jejich podstatně proměnlivé výroby**, abychom mohli postupně snižovat výrobu elektřiny z fosilních zdrojů. Pro zimní půlku roku je **obzvláště důležité rozvíjet větrnou energetiku**. Český potenciál pro tyto technologie je omezený (v případě větru), ale [velmi podstatný](/infografiky/potencial-vetrne-energie-cr): jeho využití ve velké míře závisí na jasné strategické podpoře ze strany státu. Výrazně vyšší podíl solárních a větrných zdrojů dobře zapadá do mnoha návazných scénářů transformace. Navíc není žádná jiná cesta, která by mohla tak rychle přispět ke snížení emisí.

**Jádro je další legitimní pilíř bezemisní energetiky pro Evropu**, který ale nepomůže v rychlé dekarbonizaci. Současným mixem může zahýbat až za 15—20 let, vzhledem ke stárnoucím zdrojům ovšem bude pro Česko pro další desetiletí velká výzva i jen stávající výrobu z jádra udržet. Stavba konvenčních jaderných bloků navíc nese obrovské investiční riziko, které energetické firmy nejsou schopné nést samy. Pokud je tedy chceme stavět, musíme se smířit s tím, že budou (stejně jako slunce a vítr) vyžadovat státní podporu nebo státem garantovanou výkupní cenu.

**Porovnání celkových nákladů těchto dvou pilířů je zatíženo velkou mírou nejistoty.** Zkušenosti z poslední dekády nás vedou k opatrnému optimismu ohledně budoucích celkových nákladů energetiky založené na slunci a větru. Přesto je možné, že tyto náklady budou vyšší než celkové náklady na řešení založené na jádru a nebo že prostě nebudeme schopni výrobu ze slunce a větru dostatečně zvýšit. V rámci diverzifikace rizika tedy může být racionální strategií pro Česko **současně urychleně rozvíjet OZE a také budovat jeden či více nových jaderných bloků, příp. malých modulárních reaktorů**.

Vedle rozvoje obou hlavních pilířů bloků je dalším klíčovým nástrojem pro snížení rizik **užší energetická spolupráce napříč Evropou**. To znamená více sladit národní energetické koncepce a urychleně pokračovat v dalším strategickém propojování přenosových soustav. **Česko touto cestou může získat přístup k výrobě z obnovitelných zdrojů nad limity toho, co jsme schopni postavit na našem území.** Konkrétně k větrným farmám na moři, k jižnímu slunci v zimě, příp. k elektřině ze zeleného vodíku.

**Kromě toho potřebujeme další významné flexibilní zdroje bezemisní elektřiny**, obzvláště pro zimní půlku roku. Role flexibilních zdrojů bude ještě významnější, pokud nebudeme rozvíjet jadernou energetiku a nebo neposílíme přístup k přebytkům obnovitelné elektřiny ze zahraničí. Mnohé z flexibilních zdrojů vyžadují dlouhodobé plánování, podporu a přípravu: výroba nebo import **zeleného vodíku** vyžaduje rozvoj infrastruktury, **fosilní zdroje s CCS** vyžadují přípravu a vybudování úložišť uhlíku, **velké množství biomasy** vyžaduje proměnu nakládání s odpady i proměnu hospodaření v krajině. Dostatečný rozvoj těchto nástrojů tak závisí na dlouhodobé strategické podpoře státu.

Pro připomenutí: těmto strategickým volbám je nadřazeno několik imperativů mimo rámec tohoto textu: podporovat pokračující **energetické úspory** a lépe využívat domácí **druhotné zdroje energie** (jako odpadní teplo). Nejlevnější elektřina je často ta, kterou vůbec nevyrobíme a energetické úspory pomáhají krotit nárůst spotřeby.

## Poznámky a zdroje

### Zdroje
* Climate Change 2022: Mitigation of Climate Change, [Chapter 6: Energy systems](https://www.ipcc.ch/report/ar6/wg3/downloads/report/IPCC_AR6_WGIII_Chapter_06.pdf), IPCC, 2022.
* C Breyer et al. [On the History and Future of 100% Renewable Energy Systems Research](https://ieeexplore.ieee.org/document/9837910), IEEE Access, 2022.
* [Net Zero by 2050](https://www.iea.org/reports/net-zero-by-2050), IEA, 2021.
* [Nuclear Power and Secure Energy Transitions](https://www.iea.org/reports/nuclear-power-and-secure-energy-transitions), IEA, 2022.

{:#studie}
### Scénáře transformace české energetiky do roku 2050

* [New Generation: Building a clean European electricity system by 2035](https://ember-climate.org/insights/research/new-generation/), EMBER Climate, 2022 (obsahuje [scénáře](https://ember-climate.org/data/data-tools/european-clean-power-pathways-explorer/) až do roku 2050).
* [Energetická revoluce](https://www.greenpeace.org/static/planet4-czech-republic-stateless/2021/10/93cc9533-energeticka_revoluce.pdf), Greenpeace a Hnutí Duha, 2021.
* [Klimaticky neutrální Česko](https://www.mckinsey.com/cz/~/media/mckinsey/locations/europe%20and%20middle%20east/czech%20republic/our%20work/decarbonization_report_cz_vf.pdf), McKinsey & Company, 2020.

### Poznámky

[^consumption-metric]: Technicky vzato jde o čistou spotřebu a ztráty při přenosu a distribuci elektřiny. Tedy z hrubé spotřeby vynecháváme složky závislé na energetickém mixu: vlastní spotřebu elektráren a spotřebu přečerpávacích vodních elektráren.
[^pokryti-spotreby]: Při výrazném nasazení slunce a větru dochází snadno v určitých momentech k nadvýrobě elektřiny. Proto v grafech nezobrazujeme, kolik elektřiny celkově zdroj vyrobí, ale kolik je z ní přímo použitelné, tedy jakou měrou zdroj přispěje k pokrytí momentální poptávky. Část nadbytků je ovšem možné uložit a využít později, tato elektřina se objeví v kategorii flexibilních zdrojů.
[^aktualni-skala-biomasy]: Pro srovnání, v roce 2020 se z biomasy a bioplynu vyrobilo 4,7 TWh [elektřiny](https://www.eru.cz/rocni-zprava-o-provozu-elektrizacni-soustavy-cr-pro-rok-2020) a 6,4 TWh [tepla](https://www.eru.cz/rocni-zprava-o-provozu-teplarenskych-soustav-cr-za-rok-2020) netto. K tomu bylo podle [statistik energetické bilance](https://ec.europa.eu/eurostat/web/energy/energy-flow-diagrams) Eurostatu potřeba asi 20 TWh biomasy, dalších asi 30 TWh pevné biomasy se spaluje přímo v domácnostech a v průmyslu a z dalších cca 8 TWh řepky se vyrobí 3,2 TWh bionafty (při [40% účinnosti](https://journals.sagepub.com/doi/pdf/10.1260/0144-5987.32.6.1005) konverze). Celkově je tedy dnešní primární produkce biomasy na energetické účely v Česku okolo 60 TWh ročně. Pro výrobu 30 TWh elektřiny a (řekněme) 30 TWh tepla bychom potřebovali minimálně 100 TWh biomasy, další biomasa se jistě spotřebuje v domácnostech a průmyslu. V součtu by to tedy bylo alespoň 2x více energetické biomasy než dnes.
[^cena-technologii]: Pracujeme nejvíce s [odhady od IEA](https://iea.blob.core.windows.net/assets/ae17da3d-e8a5-4163-a3ec-2e6fb0b5677d/Projected-Costs-of-Generating-Electricity-2020.pdf) z roku 2020 a s odhady od poradenské agentury [Lazard](https://www.lazard.com/perspective/levelized-cost-of-energy-levelized-cost-of-storage-and-levelized-cost-of-hydrogen/). Na základě těchto zdrojů sestavujeme koeficienty pro náš [vlastní výpočet](https://docs.google.com/spreadsheets/d/16UJHRk10fZ9UC6-z8G8HyiUdiJOtRYdD-nsO_KIwTIY/edit?pli=1#gid=1790381195) systémových nákladů.
[^cena-fixni-naklady]: Toto číslo nejlépe vyjadřuje _jaké by byly investiční náklady, kdybychom naši momentální výrobní základnu stavěli dnes_ a tudíž nevyjadřuje skutečnou výši splácených úvěrů jednotlivých firem. Výjimku ve výpočtu děláme u solárních a větrných elektráren, u nichž bereme odhad investičních nákladů okolo roku 2010 (kdy byla většina z nich postavena) a u jaderné elektrárny Dukovany, u které odhadujeme pouze investiční náklady na její prodloužení provozu do poloviny 40. let.
[^cena-regulovane-elektriny]: Obsahuje to náklady na distribuční a přenosové soustavy (provoz, investice, ztráty v síti; řádově 50 mld. korun ročně), náklady na udržování stability v síti (řádově do 10 mld. ročně).
[^cena-zemni-plyn]: V tomto výpočtu bereme výrobní mix z roku 2021 a předpokládáme průměrnou cenu zemního plynu na úrovni 150 EUR/MWh.
[^cena-ilustrativniho-mixu]: Zde počítáme konzervativněji na 1 kWh elektřiny náklady 1,20 Kč pro slunce, 1,30 Kč pro vítr, 3,50 Kč pro jádro, 4 Kč pro biomasu, 5 Kč pro krátkodobé ukládání stejně jako pro plyn s CCS. Ceny pro slunce a vítr jsou oproti celosvětovému indexu upraveny úměrně nižším výnosům v ČR. Cena pro biomasu zhruba odpovídá dřívějším výkupním cenám pro bioplyn a čistou biomasu v rámci podpory OZE. Cena pro krátkodobé ukládání počítá s odhadem [LCOS](https://www.lazard.com/media/451882/lazards-levelized-cost-of-storage-version-70-vf.pdf) 200 EUR / MWh, cena plynu s CCS vychází z [odhadu IEA](https://www.iea.org/reports/projected-costs-of-generating-electricity-2020) ale odhad zvyšujeme pro velké nejistoty v ceně technologie i v ceně paliva.
[^cena-paroplynova-zaloha]: Pro řádovou představu, 5 GW paroplynových záloh s CCS by vyžadovalo _overnight costs_ v řádu 300 mld. korun, při úrokové míře 8 % a 30 letech provozu to vytváří náklady asi 25 mld. korun ročně.
[^cena-rozvoj-site]: Investice na běžnou obnovu a rozvoj přenosové a distribuční soustavy jsou dnes okolo 20 mld. korun ročně (viz [MAF CZ 2021](https://www.ceps.cz/cs/tiskove-zpravy/novinka/ceps-vydava-maf-cz-2021-analyzuje-dopady-ruznych-smeru-vyvoje-energetickeho-mixu-do-roku-2040), kap. 7). Tyto náklady jsou placené z regulované složky ceny elektřiny. S rostoucími potřebami nové energetiky se do roku 2030 očekává růst k investicím ve výši 30 mld. korun ročně. Tyto odhady jsou ovšem založené na poměrně opatrných plánech rozvoje výroby ze slunce a větru, pravděpodobně tedy ve skutečnosti nebudou stačit, obzvláště pro rok 2050. Pro srovnání: náklady na cca 500 km budovaného podzemního 2 GW HVDC kabelu v Německu se [odhadují](https://www.mdr.de/nachrichten/sachsen-anhalt/faq-strom-trasse-suedostlink-verlauf-kosten-100.html#sprung9) v přepočtu na 110 mld. korun. Cena jednoho kilometru takového spojení tedy zhruba odpovídá [ceně nové dálnice](https://zdopravy.cz/od-roku-2009-doslo-ke-snizeni-ceny-za-kilometr-dalnice-o-tretinu-rika-sef-rsd-79485/), podobně jako dálnice se ale může ještě podstatně prodražit. Podobná vzdálenost odděluje Česko od Baltského moře, při výrazné roli importu elektřiny bychom potřebovali několikanásobek této přenosové kapacity. Tedy dodatečné náklady ve výši několika desítek miliard korun ročně rozhodně není nadsazený odhad.
[^cena-prodrazeni-jadra]: Dva nové velké jaderné bloky by dodaly cca 15 TWh ročně. Pokud investiční náklady této výroby stoupnou z 80 EUR/MWh na 160 EUR/MWh, znamená to vícenáklady 2 Kč na jednu kWh z těchto zdrojů a tedy celkem asi 30 mld. korun ročně.
[^cena-vysledna]: Toto dává hrubý odhad celkové průměrné ceny elektřiny pro zákazníky bez DPH. Maloodběratelé, obzvláště s nízkou spotřebou, přispívají výrazně více na provoz distribuční soustavy a podporované zdroje energie a proto pro ně bude cena až o několik korun na kWh vyšší. Velké podniky naopak typicky mají cenu o něco nižší než je celorepublikový průměr.
