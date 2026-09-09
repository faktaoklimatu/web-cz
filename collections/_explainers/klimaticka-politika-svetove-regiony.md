---
layout:      explainer
title:       "Jak se ke klimatické politice staví další světové regiony ve srovnání s EU"
slug:        "klimaticka-politika-svetove-regiony"
published:   2026-08-26
# TODO: doplnit autory a jejich role
authors:
  - id: "eliska-soperova"
weight:      76
tags-scopes: [ svet ]
tags-topics: [ opatreni, emise ]
extra-scripts:
- https://d3js.org/d3.v7.min.js
- /assets-local/charts/fok-theme.js
- /assets-local/charts/fok-utils.js
- /assets-local/charts/fok-chart-area-stacked.js
- /assets-local/figures/klimaticka-politika-svetove-regiony/emise-regiony-chart.js
cover-source-author:        "Marcel Otruba"
cover-source-text:          "Fakta o klimatu"
cover-source-license:       "CC BY 4.0"
cover-source-license-url:   "https://creativecommons.org/licenses/by/4.0/deed.cs"
cover-source-url:           "https://faktaoklimatu.cz/explainery/klimaticka-politika-svetove-regiony"
perex: |
    Od přijetí Pařížské dohody se dekarbonizace transformovala z morálního imperativu ve strategickou nutnost, která dnes definuje ekonomický růst i národní bezpečnost. Klimatická politika, jakožto soubor legislativních, strategických a ekonomických nástrojů, se tak stala hlavním hybatelem globální energetické tranzice. Tento trend se přitom dávno netýká pouze Evropské unie, tradičně vnímané jako klimatický lídr. Navzdory nařčení zbytku světa z domnělé nečinnosti v oblasti dekarbonizace vykazují klíčoví globální aktéři jako USA, Čína či Indie dynamický pokrok, kterým v mnoha ohledech Evropu dokonce předstihují.
---

Tato komparativní analýza zasazuje klimatickou politiku EU do globálního kontextu a srovnává ji právě s USA, Čínou a Indií, které spolu s Unií tvoří čtyři největší světové emitenty skleníkových plynů tvořící přes polovinu všech vypuštěných emisí. Práce porovnává jak jejich regulatorní rámce, tak reálný pokrok v dekarbonizaci. Srovnání přitom reflektuje limity plynoucí z odlišných politických systémů, socioekonomické reality a geografických specifik jednotlivých aktérů.

## Podíl jednotlivých států na globálních emisích

{% include figure.html
    name="podil-global.png"
    alt="TODO"
%}

## Specifika klimatických politik jednotlivých regionů

**Čína** {% include includes-local/emise-podil-waffle.html color="#e0495a" squares="29" pct="29,2 %" %}

* Během poslední dekády Čína ovládla trh čistých technologií masivní domácí výstavbou OZE, rozvojem elektromobility a investicemi na globálním jihu.
* Klimatickou politiku využívá k posílení ekonomického vlivu a zajištění vlastní energetické soběstačnosti.
* Centrální řízení sice umožňuje bleskovou implementaci opatření, absence zpětné vazby však vede k neefektivitě a porušování lidských práv.

**USA** {% include includes-local/emise-podil-waffle.html color="#3b85d8" squares="11" pct="11,1 %" %}

* Klimatická politika jako nástroj pro ekonomický růst a rozvoj pokročilých technologií.
* Politická opatření skrze nepřímé finanční pobídky, zejména tzv. tax credits.
* Federace s výrazně se lišícími přístupy a situacemi jednotlivých federálních států.
* Navzdory klimatickému skepticismu Trumpovy administrativy energetická transformace pokračuje, a to pro svoji ekonomickou profitabilitu.

**Indie** {% include includes-local/emise-podil-waffle.html color="#8a3eb0" squares="8" pct="8,2 %" %}

* Indie představuje specifický příklad rozvojové ekonomiky čelící řadě základních socioekonomických problémů a je příjemcem mezinárodní finanční pomoci.
* Klimatická politika a energetická tranzice jsou vnímány jako hlavní motor ekonomického rozvoje.
* Promyšlená podpora solární energie a domácí výroby technologií prostřednictvím štědrých finančních pobídek slouží jako globální příklad dobré praxe.
* Všechny politiky kladou striktní důraz na sociální spravedlnost a masivní finanční podporu zranitelných skupin obyvatelstva.

**EU** {% include includes-local/emise-podil-waffle.html color="#36369b" squares="6" pct="5,9 %" %}

* EU disponuje nejpropracovanější klimatickou legislativou na světě.
* Původní důraz na ochranu budoucích generací v posledních letech doplňuje snaha o zajištění konkurenceschopnosti a energetické bezpečnosti.
* Mnohoúrovňové rozhodování sice zajišťuje demokratickou shodu, ale prodlužuje implementaci opatření, která z velké části závisí na politické vůli členských států.

{% include includes-local/chart-figure.html
    id="emise-regiony"
    caption="Emise CO<sub>2</sub> čtyř největších emitentů. Přepínač volí mezi celkovými emisemi, emisemi na obyvatele a podílem na kumulativních emisích. Všechny čtyři grafy mají stejnou svislou osu, takže je lze přímo srovnávat."
    source-text="Our World in Data (owid-co2-data.csv), data 1950–2023"
    source-url="https://ourworldindata.org/co2-emissions-metrics"
%}

## Klimatické cíle, governance, hlavní politiky

|  | Klimatická neutralita | Emisní cíle |
| :-: | :-: | :-: |
| EU | 2050 | −55 % do roku 2030 oproti 1990<br>−90 % do roku 2040 oproti 1990 |
| USA | zrušeno<br>(původně 2050)[^usa-neutralita] | zrušeno<br>(původně −50–52 % do roku 2030 oproti 2005 a −61–66 % do roku 2035 oproti 2005) |
| Čína | 2060 | zvrátit růst emisí do roku 2030<br>−7–10 % do roku 2035 oproti roku s maximálními hodnotami (pravděpodobně 2025 nebo 2026) |
| Indie | 2070 | – |

**EU**

* **Klimatické politiky a strategie:** Evropská klimatická politika vychází z mezinárodního rámce Pařížské dohody, v jejímž rámci EU pravidelně aktualizuje své mezinárodní závazky. Nad tento rámec EU disponuje vlastním propracovaným systémem politik se středně a dlouhodobými cíli. Vše zastřešuje dlouhodobá strategie Zelená dohoda. Její klimatické závazky jsou od roku 2021 právně závazné díky Evropskému klimatickému zákonu. Pro praktické dosažení svých cílů EU zavádí konkrétní sektorová opatření a indikativní cíle, jako jsou podpora obnovitelných zdrojů, zvyšování energetické účinnosti, přísnější CO<sub>2</sub> standardy pro nová auta, regulace emisí metanu a nový systém obchodování s emisními povolenkami ETS2.
* **Nástroje:** Evropská klimatická politika stojí na regulatorních opatřeních, které kombinují ekonomické mechanismy s přísnými technickými standardy a limity. Jedním z nejúčinnějších opatření je systém obchodování s emisními povolenkami. Současný EU ETS1 pokrývá těžký průmysl a výrobu elektřiny a tepla, kterým ukládá povinnost platit za každou vypuštěnou tunu CO<sub>2</sub>. Od spuštění systému v roce 2005 díky tomu emise v těchto sektorech klesly o 60 %. V roce 2028 bude přijat EU ETS2, který bude snižovat emise v sektorech bydlení a silniční dopravy.
* **Governance:** Klimatická politika EU vzniká víceúrovňovým procesem, na kterém se podílejí unijní instituce, členské státy i veřejnost. Legislativní proces stojí na třech pilířích, kdy Evropská komise pravidla navrhuje, zatímco Rada EU zastupující vlády a Evropský parlament reprezentující občany je společně schvalují. Výsledná legislativa má dvě formy. Většinu agendy tvoří směrnice, které státům určují závazný cíl, ale způsob jeho dosažení nechávají na nich. Úspěch celé klimatické politiky proto závisí především na přístupu samotných členských států. Pro okamžité a jednotné sjednocení pravidel pak slouží nařízení, jež jsou účinná ihned po schválení.

**USA**

* **Strategie a politiky:** Za Bidenovy administrativy se klimatická politika opírala jak o mezinárodní politický rámec pod Pařížskou dohodou, tak o národní strategie. V roce 2025, ještě před nástupem Trumpa, USA zveřejnily aktualizovaný mezinárodní závazek snížit emise o 61–66 % do roku 2035 oproti roku 2005. V roce 2021 navíc Bidenova administrativa vydala dlouhodobou klimatickou strategii s cílem dosáhnout klimatické neutrality do roku 2050. S návratem Trumpa USA odstoupily od Pařížské dohody a upustily od všech klimatických strategií.
* **Nástroje:** Klimatická politika v USA je tradičně řízena trhem a staví primárně na finančních pobídkách a daňových úlevách. Bidenova administrativa na tomto principu přijala ambiciózní zákon o snížení inflace (*Inflation Reduction Act*), který zavedl daňové úlevy pro čisté technologie, jako jsou elektromobily a obnovitelné zdroje. Následná Trumpova administrativa se sice pokusila tyto kroky zvrátit a obnovit podporu pro fosilní zdroje, tržní síly však zůstávají hlavním tahounem. Vzhledem k rostoucí ekonomické atraktivitě zelených technologií pokračuje americké hospodářství v dekarbonizaci i navzdory politickým změnám a rušení federálních emisních limitů.
* **Governance:** USA jsou federálním státem, kde klimatické směřování regionu úzce souvisí s exekutivou, a tedy s tím, kdo je zrovna prezidentem. Ten má přímou kontrolu nad Agenturou životního prostředí, která vydává regulace, jako například emisní limity. Zároveň prezident může regulaci rušit formou vládních nařízení (*executive orders*). Přesto jednotlivé americké státy mají velkou autonomii, která jim umožňuje přijímat vlastní klimatické cíle a opatření. Klimatická politika se tak výrazně liší na úrovni amerických států.

**Čína**

* **Klimatické politiky a strategie:** Většinu klimatických cílů si Čína stanovuje v rámci svých mezinárodních závazků a v rámci svých pětiletých plánů, ve kterých určuje směřování své ekonomiky. Čína má tzv. dvojí emisní cíl přijatý v roce 2020, který obsahuje cíl pro klimatickou neutralitu a nutnost zastavit nárůst emisí uhlíku do roku 2030. Dlouhodobě však Čína upřednostňuje cíle pro snižování uhlíkové náročnosti (CO<sub>2</sub> na HDP) spíše než absolutní emisní cíle. Nedávno se však přístup Číny změnil a ve svém aktualizovaném národním příspěvku, tzv. NDC, si stanovila za cíl snížit své emise až o 10 % oproti roku, kdy země dosáhne svých maximálních hodnot, než začnou klesat.
* **Nástroje:** Rozvoj čistých technologií v Číně stojí především na masivní dotační politice. Stát cíleně financuje výzkum a optimalizaci výrobních procesů, což v kombinaci s kontrolou dodavatelských řetězců a tvrdou konkurencí na domácím trhu vedlo k radikálnímu snížení výrobních nákladů. Díky této veřejné podpoře a obřím úsporám z rozsahu Čína srazila ceny zelených technologií na minimum, čímž zásadně přispěla k jejich zlevnění po celém světě. Západní země však tuto dotační politiku často označují za nelegální. Vede k takzvanému dumpingu, kdy Čína prodává čisté technologie v zahraničí za ceny nižší, než jsou její vlastní výrobní náklady.
* **Governance:** Stejně jako celý stát i čínská klimatická politika je centrálně řízena a určována zhora centrální vládou. Hlavní rozhodující moc má Ústřední výbor Komunistické strany Číny (CCCPC) v čele s čínským vůdcem Si Ťin-pingem, který určuje hlavní směr a vydává obecné strategie. Následně Čínský národní lidový kongres (NPCC), který je ekvivalentem parlamentu, přijímá konkrétní závazné cíle v rámci pětiletých plánů. Cíle přijaté centrální vládou jsou následně rozdělovány mezi nižší správní celky.

**Indie**

* **Klimatické politiky a strategie:** Klimatická politika Indie se opírá o mezinárodní klimatický rámec pod Pařížskou dohodou, v rámci kterého pravidelně přijímá své mezinárodní závazky. Indie si kromě cíle klimatické neutrality v roce 2070 stanovila také dva další oficiální cíle pro emisní intenzitu a podíl elektřiny z nefosilních zdrojů ve svém aktualizovaném národním příspěvku. Kromě toho Indie vlastní zastřešující národní politický rámec *National Action Plan on Climate Change* (NAPCC) a disponuje řadou promyšlených sektorových strategií s dalšími indikativními cíli. Například v národním plánu pro elektřinu Indie plánuje vystavět 280 GW solární kapacity do roku 2030 a v rámci národního plánu pro dopravu si Indie stanovila za cíl dosáhnout 30% podílu elektroaut do stejného roku.
* **Nástroje:** Indie disponuje promyšlenou klimatickou politikou, která je tvořená kombinací různých opatření od přímých dotací přes tržní pobídky po technické standardy. Obzvláště účinnými se ukázaly být cílené dotační programy pro malé solární elektrárny, které významně přispěly k dosažení univerzálního přístupu k elektřině a hrají důležitou roli v modernizaci indického zemědělství.
* **Governance:** V Indii je v otázce klimatu vedoucím orgánem *Ministry of New and Renewable Energy*, které je podporováno expertními institucemi, jako jsou NITI Aayog, vládní think tank zabývající se veřejnou politikou, a *National Institute of Solar Energy* (NISE), nezávislá výzkumná organizace zaměřená na solární energetiku. V Indii funguje „kooperativní federalismus“, kdy klimatické politiky a strategie jsou přijímány centrální vládou a státy a svazová území se na implementaci výrazně podílejí tím, že si mohou přizpůsobit strategie svým konkrétním socioekonomickým a energetickým podmínkám.

## Emise regionů a jejich historický vývoj

**EU**

* Zatímco globálně emise rostou, EU je od roku 1990 snížila o 40 % v roce 2025. Největší zásluhu na tom mají energetika a průmysl, kde k poklesu přispěly konec uhlí, rozvoj obnovitelných zdrojů a vyšší efektivita výroby. Přesto tyto sektory patří mezi největší zdroje emisí, a to kvůli přetrvávající závislosti EU na zemním plynu. Nejslabším článkem zůstává doprava, kde kvůli pokračujícímu využívání fosilních paliv emise klesly jen minimálně a v mnoha členských zemích dál rostou. I přes dosavadní úspěchy však není jisté, zda EU svých ambiciózních klimatických cílů dosáhne. Proto bude naprosto klíčové důsledné zavádění dalších klimatických opatření a politik samotnými členskými státy.

**USA**

* Na rozdíl od EU snížily USA své emise oproti roku 1990 pouze o 5 %. Největší pokles emisí zaznamenala energetika, a to hlavně díky přechodu z uhlí na levný zemní plyn po břidlicové revoluci (tzv. *shale boom*) v roce 2005. Energetika však zůstává nejvíce znečišťujícím sektorem, a to proto, že USA jsou největším producentem a vývozcem ropy a zemního plynu. Podobně velkým znečišťovatelem je doprava, kde za vysokými emisemi stojí extrémní závislost na osobních autech a specifická, rozlehlá geografie amerických měst. Navzdory negativnímu postoji prezidenta Trumpa k dekarbonizaci predikce ukazují, že USA jsou na cestě ke snížení emisí o 26 % až 41 % do roku 2040 a k dekarbonizaci v roce 2058. Klíčový je trh, který pod tlakem globální ekonomiky pohání rozvoj čistých technologií, a to navzdory všem překážkám ze strany americké vlády.

**Čína**

* Jako „světová továrna“ a prudce se rozvíjející ekonomika je Čína největším globálním emitentem; její emise však v posledních dvou letech stagnují a v roce 2025 dokonce začaly klesat, a to díky masivnímu rozvoji obnovitelných zdrojů energie (OZE). Tento trend vytváří paradox, kdy je země zároveň největším znečišťovatelem i světovým lídrem v kapacitě OZE. Klíčovým zdrojem znečištění zůstává sektor elektřiny a tepla poháněný uhlím, následovaný těžkým průmyslem (výroba oceli a železa), který je stále téměř plně závislý na fosilních palivech. Naopak doprava tvoří pouhých 10 % čínských emisí, mnohem méně než je tomu u vyspělých ekonomik. Svůj podíl má na tom velký rozvoj elektromobility.

**Indie**

* Indie je příkladem rychle se rozvíjející ekonomiky, jejíž emise prudce rostou. Přesto nárůst emisí v poslední době prudce zpomaluje, a to zejména díky masivní výstavbě solárních parků, která zároveň zásadně přispěla k dosažení univerzálního přístupu indické populace k elektřině. Na rozdíl od ostatních zemí je v Indii jedním z největších znečišťovatelů sektor zemědělství, který je masivním zdrojem emisí metanu a je zodpovědný za pětinu všech emisí. Nejvíce znečišťujícím sektorem však zůstává výroba elektřiny a tepla, kde je Indie podobně jako Čína závislá na uhlí.

**EU**

* Roční emise: 2,42 miliardy t
* Emise na hlavu: 5,39 t
* Podíl na kumulativních emisích: 16,27 %

**USA**

* Roční emise: 4,90 miliardy t
* Emise na hlavu: 14,20 t
* Podíl na kumulativních emisích: 23,52 %

**Čína**

* Roční emise: 12,29 miliardy t
* Emise na hlavu: 8,66 t
* Podíl na kumulativních emisích: 15,42 %

**Indie**

* Roční emise: 3,19 miliardy t
* Emise na hlavu: 2,20 t
* Podíl na kumulativních emisích: 3,57 %

## Zdroje emisí v jednotlivých zemích (emise podle sektoru)

**EU**

**USA**

**Čína**

**Indie**

## Elektrický mix

**EU**

* V posledních letech začínají v evropském elektrickém mixu hrát zásadní roli nízkoemisní zdroje a podíl zemního plynu na výrobě elektřiny se snižuje. Aktuálně 71 % elektřiny pochází z čistých zdrojů a z toho 30 % obstarávají solární a větrná energie. V EU největší rozvoj zažívá solární energetika, kdy produkce elektřiny ze slunce roste meziročně o 21 % v posledních pěti letech a v roce 2025 její produkce byla dvakrát větší než v roce 2020. Zároveň rok 2025 byl rokem, kdy ze slunce a větru pocházelo víc elektřiny než z fosilních zdrojů ve 14 z 27 evropských zemí.

**USA**

* Přestože rozvoj OZE v USA má o něco pomalejší a pozdější nástup, i USA zažívají v posledních letech prudký rozvoj solární a větrné energie. Aktuálně 43 % elektřiny pochází z čistých zdrojů a z toho 19 % ze slunce a větru. Podíl elektřiny v některých amerických státech je i vyšší. Například v Kalifornii z obnovitelných zdrojů pochází kolem 60 % elektřiny. V Kansasu 50 % elektřiny pochází pouze z větru.

**Čína**

* Čínský elektrický mix byl historicky postaven na uhelných zdrojích. To se ale v posledních letech mění. Čína je regionem s největším nárůstem solární a větrné kapacity ve velmi krátké době. Elektřina z obnovitelných zdrojů tak z velké části uspokojuje rostoucí poptávku po elektřině a rok 2025 byl prvním rokem, kdy OZE vyrobily více elektřiny než uhlí. Aktuálně 42 % elektřiny pochází z čistých zdrojů a 22 % z větru a slunce.

**Indie**

* Podobně jako Čína i Indie se potýká s prudkým nárůstem poptávky po elektřině a její mix je založený na uhlí. V posledních pěti letech však Indie masivně staví solární zdroje a bateriová úložiště. Podíl elektřiny z OZE tak rychle roste, zatímco podíl elektřiny z uhlí se rychle snižuje z 91 % v roce 2023 na 64 % v roce 2024. Aktuálně tak 27 % elektřiny pochází z čistých zdrojů a 14 % ze slunce a větru.

## Progres

### Aktuální a plánovaná kapacita OZE v GW

Právě výstavba kapacity obnovitelných zdrojů je oblast, kde rozvojové země jako Čína a Indie překvapí. Zatímco v EU nebo USA výstavba určovaná trhem průběžně roste, v Indii a Číně dochází ke skokovým meziročním nárůstům. Například Čína během prvních šesti měsíců v roce 2025 postavila dvakrát tolik OZE kapacity jako celý svět dohromady a Indie díky své rychlé výstavbě OZE nyní disponuje 3. největší kapacitou OZE na světě poté, co v roce 2025 předstihla Německo.

**EU**

**USA**

**Čína**

**Indie**

### Elektromobilita

Podíl elektroaut na prodejích aut, vývoj 2010 až 2025.

V oblasti elektromobility je Čína jasným světovým lídrem. Na jejím domácím trhu tvoří elektromobily již více než polovinu všech nově prodaných vozů. Zároveň čínští výrobci elektroaut upevňují svou dominanci na světovém trhu. V roce 2025 se čínští výrobci podíleli na celosvětovém prodeji elektromobilů celými 60 %, zatímco evropští i severoameričtí výrobci dosáhli na světovém trhu každý pouhých 15 %.

### Míra elektrifikace

Vedle výstavby OZE, klíčových pro výrobu **čisté elektřiny**, je druhým pilířem dekarbonizace míra elektrifikace ekonomiky. Ta ukazuje, jak efektivně země nahrazují přímé spalování fosilních paliv elektřinou v budovách, dopravě a průmyslu. K jejímu měření slouží **podíl elektřiny na konečné spotřebě energie (TFEC)**. Tento indikátor nám ukazuje, do jaké míry přecházejí klíčoví spotřebitelé, jako jsou firmy a domácnosti, od přímého spalování paliv k využívání elektrické energie.[^elektrifikace-zdroj]

* Čína: 32 %
* EU a USA: stagnace na 24 % od roku 2010
* Indie: 21 %

V míře elektrifikace Čína jasně vede, a to zejména díky rychlé instalaci tepelných čerpadel a rozvoji elektromobility. Díky tomu role uhlí v sektoru budov a průmyslu rychle klesá a elektřina se stala hlavním zdrojem energie jak v sektoru budov, tak v průmyslu, a v dopravě rychle posiluje. Velkou roli hrají také posilování přenosových soustav a velká výstavba bateriových úložišť, které umožňují rychlou integraci OZE do elektrické sítě.

Oproti tomu míra elektrifikace v USA a EU už od roku 2010 stagnuje na hodnotách kolem 20 %, a to zejména kvůli nedostatečné kapacitě elektrické sítě a chybějícím bateriovým úložištím.

Elektrifikace v Indii je sice pomalejší, ale to se v posledních letech mění. Elektrifikace v Indii je řízena rychlou výstavbou OZE, zejména velkých solárních parků, doplněnou rychlou výstavbou malých solárních elektráren na střechách domů a farmách, kde například dochází k rychlé instalaci elektrických čerpadel. V dopravě odbyt elektromobilů není tak rychlý, s podporou vlády však dochází k rychlé elektrifikaci dvou- a tříkolových vozidel, která v roce 2025 tvořila 60 %, respektive 26 % prodejů.

### Investice do energetické transformace

Ukazatel investic do energetické transformace vyjadřuje objem veřejných a soukromých financí vynaložených na výstavbu čistých technologií a infrastruktury. Pro objektivní srovnání jednotlivých států je vhodné sledovat jejich podíl na HDP, který eliminuje vliv velikosti ekonomiky.

Samotná výše investic však přímo neodráží skutečné tempo dekarbonizace, protože je nutné zohlednit také další faktory, jako jsou růst celkové poptávky po elektřině, míra zapojení veřejného sektoru nebo poměr výdajů směřujících do čistých versus fosilních zdrojů.

Přesto dobře ukazuje, jak se jednotlivé státy angažují v energetické transformaci a jsou tak schopny mobilizovat tyto investice. Každý region k tomu volí jinou strategii: EU sází na robustní politický rámec, USA na pobídky pro soukromý kapitál a spotřebitele a Čína na masivní budování výrobních kapacit.

Čína je absolutním lídrem, co se týče investic do energetické transformace. V roce 2025 tyto investice dosáhly částky 800 miliard. Čína se tak podílí 34 % na celosvětových investicích a investuje více než dalších šest zemí dohromady.

## Role v mezinárodních klimatických jednáních

**EU**

* EU je dlouhodobým lídrem v mezinárodní klimatické politice. Ambiciózní cíle prosazovala již od podpisu Úmluvy OSN v roce 1992 i při klíčovém vyjednání Pařížské dohody v roce 2015. Její vystupování však bývá komplikované a nejednotné. Jelikož je životní prostředí sdílenou kompetencí, musí EU před jednáními složitě hledat shodu mezi všemi členskými státy. Na mezinárodní úrovni ji pak reprezentují Evropská komise, předsednictví Rady EU a jednání se účastní i prezident Evropské rady. I členské státy vysílají své delegace, aby mohly hájit své individuální zájmy.

**USA**

* USA hrají v klimatických jednáních klíčovou roli díky svému ekonomickému vlivu a vysokým emisím. Do jednání jsou zapojeny od přijetí UNFCCC v roce 1992, prosazují však spíše flexibilní a tržní mechanismy než závazné emisní cíle. Z toho důvodu neratifikovaly Kjótský protokol. V roce 2014 USA oznámily s Čínou společné klimatické kroky a později se připojily k Pařížské dohodě, která umožňuje státům stanovovat si vlastní dobrovolné cíle. Přesto USA za vlády Donalda Trumpa od Pařížské dohody i od rámce UNFCCC odstoupily.

**Čína**

* Čína je smluvní stranou UNFCCC a připojila se ke Kjótskému protokolu i Pařížské dohodě. Prosazuje princip společné, ale rozdílné odpovědnosti a nadále trvá na statusu rozvojové země, který jí dává větší flexibilitu při snižování emisí. Přestože sama finanční pomoc nepožaduje, poskytuje ji jiným rozvojovým státům skrze vlastní iniciativy (jako *South–South Cooperation* nebo *Belt and Road Initiative*). Do mezinárodních jednání se zapojuje stále aktivněji a akcentuje obchodní spolupráci, což jí pomáhá posilovat globální vliv a podporovat domácí sektor čistých technologií. Dělá to však spíše z ekonomických a mocenských důvodů, a ne pro záchranu klimatu. Proto mnozí pozorovatelé nevěří, že by se Čína ujala role lídra v mezinárodních klimatických jednáních.

**Indie**

* Jakožto velký zastánce multilateralismu je Indie aktivním členem mezinárodních jednání a podporuje mezinárodní spolupráci. Indie v mezinárodních jednáních dlouhodobě prosazuje princip společné, ale rozdílné odpovědnosti a klimatické spravedlnosti. Tyto zásady nevyužívá ke zbavení se odpovědnosti, ale k získání potřebné flexibility pro svůj rozvoj. Dlouhodobě požaduje předvídatelné a dostatečné klimatické finance ze strany vyspělých států, které hodnotí jako nezbytné pro dekarbonizaci rozvojového světa. Za tímto účelem se kromě mezinárodních klimatických jednání účastní a vede řadu iniciativ s cílem reformovat mezinárodní finanční instituce a zpřístupnit finance pro energetickou transformaci a ochranu klimatu rozvojovým státům.

## Poznámky

[^usa-neutralita]: Za Bidenovy administrativy byl cíl klimatické neutrality nastaven na rok 2050. Tento cíl byl zrušen s nástupem Donalda Trumpa.

[^elektrifikace-zdroj]: Data pro Čínu, USA a EU (OECD) viz [China Energy Transition Review 2025](https://ember-energy.org/app/uploads/2025/09/China-Energy-Transition-Review-2025.pdf#page=22.99), Ember, s. 23.
