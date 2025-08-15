---
layout:      explainer
title:       "Jaké bariéry stojí v cestě dekarbonizaci sektoru budov v Česku?"
slug:        "dekarbonizace-budov-bariery"
published:   2025-08-11
authors:
  - id: "katerina-kolouchova"
  - ids: ["jirka-lnenicka"]
    minor-role: "editace"
weight:      90
tags-scopes: [ cr ]
tags-topics: [ opatreni ]
cover-source-author:        "Jakub Żerdzicki"
cover-source-text:          "Unsplash"
cover-source-license:       "Unsplash License"
cover-source-license-url:   "https://unsplash.com/license"
cover-source-url:           "https://unsplash.com/photos/a-small-town-surrounded-by-trees-and-hills-yLMf_BaOh1o"
perex:       "Se sektorem budov souvisí téměř polovina celkové spotřeby energie v Česku a přibližně třetina vyprodukovaných emisí skleníkových plynů. Tyto emise vznikají hlavně při spalování zemního plynu a uhlí (k získávání tepla a elektřiny), v menší míře pocházejí z výroby stavebních materiálů. Sektor budov tedy má velký dekarbonizační potenciál, zároveň jsou zde ale i různé bariéry, které jeho dekarbonizaci brání: např. chybějící strategie renovace budov či nedostatek finančních prostředků. Velkou roli hraje také čas – zrenovovat celý domovní fond totiž není otázkou let, nýbrž desetiletí. Jednotlivým bariérám se podrobněji věnuje následující text."
---

{% capture cinnosti %}

Při dekarbonizaci sektoru budov jde o to snížit emise spojené s provozem, výstavbou a demolicí budov.

S provozem budov souvisí:

- vytápění
- chlazení
- větrání
- ohřev vody
- vaření
- svícení
- provoz elektrospotřebičů v domácnosti (např. pračka, lednička nebo počítač)
- provoz výtahů a eskalátorů

S výstavbou, případně demolicí, souvisí:

- výroba a doprava stavebních materiálů (např. cementu, cihel, oceli, dřeva či izolačních materiálů)
- samotná výstavba (případně rekonstrukce či demolice), včetně využívání stavebních strojů
- nakládání se stavebním odpadem
- výroba energetických technologií pro budovy (např. tepelných čerpadel, fotovoltaických panelů, baterií)

{% endcapture %}

{% include expander-figure.html
    name="cinnosti"
    expanded=false
    class="contrast-figure "
    label="Jaké činnosti jsou se sektorem budov spojeny?"
    content=cinnosti
%}

## Energie a emise v sektoru budov

Díky renovacím a postupnému zvyšování standardů pro energetickou náročnost budov potřeba energie i vyprodukované emise v sektoru klesají.[^eea-data] Přesto mají budovy v Česku i nadále velký podíl na celkové spotřebě energií a celkových emisích země, a je zde tedy i velký potenciál pro další dekarbonizaci.

### Kde se spotřebovává energie a jak se tato energie vyrábí?

**S provozem budov je spojeno přibližně 43 % konečné spotřeby energie v Česku**.[^eurostat-balances] Jde zejména o energii potřebnou na vytápění a ohřev teplé vody, ať už v teplárenství (dálkové teplo) nebo v kotlích na zemní plyn, biomasu, uhlí či elektřinu. Z hlediska emisí je zásadní, z jakého zdroje se energie vyrábí. U rodinných domů převažuje jako zdroj vytápění a ohřevu vody zemní plyn a biomasa (často v podobě dřeva), v bytových domech je to často zemní plyn či nakupované teplo (pocházející z uhlí, zemního plynu a částečně z biomasy). Menší část spotřeby tvoří elektřina, využívaná na svícení, provoz elektrospotřebičů a vaření (částečně se při vaření využívá i zemní plyn). Emisní náročnost elektřiny vychází ze současného energetického mixu v Česku (v roce 2024 bylo 42 % elektřiny vyrobeno z fosilních paliv, 41 % z jádra a 17 % z obnovitelných zdrojů[^ember-mix]).

Menší část energie se spotřebuje v průmyslu při výrobě stavebních materiálů, výstavbě a rekonstrukci nebo demolici. Odhadem jde o cca 3 % konečné spotřeby energie Česka a 11 % energie spotřebované v průmyslu.[^energie-prumysl]

{% include figure.html
    name="cs-dekarbonizace-budov-bariery-energie.svg"
    name-mobile="cs-dekarbonizace-budov-bariery-energie.svg"
    alt="TODO"
    source-text="Český statistický úřad, Energo 2021"
    source-url="https://csu.gov.cz/produkty/spotreba-paliv-a-energii-v-domacnostech-energo-2021"
%}

### Kde vznikají emise?

Obdobně jako energie se i emise dělí podle toho, v jaké fázi vznikají, a to na:

- **Provozní** – vznikají hlavně spalováním paliv při výrobě elektřiny a tepla. Jednak v lokálních kotlích nebo kamnech přímo v budovách (9 % emisí Česka v roce 2022), jednak při výrobě elektřiny nebo tepla v elektrárnách a teplárnách, které je následně dodáváno do domácností a kanceláří (asi 20 % emisí Česka).[^prime-neprime]
- **Zabudované** – pocházejí z výroby stavebních materiálů[^procesni-spalovaci] – cementu, vápna a (asi 7 % emisí Česka).[^zabudovane-emise] Kromě toho jde také o část emisí z výroby oceli nebo z přepravy a likvidace materiálů.

Celkem je tak s budovami v celém jejich životním cyklu spojeno **přibližně 36 % emisí skleníkových plynů Česka.**

{% include figure.html
    name="cs-dekarbonizace-budov-bariery-emise.svg"
    name-mobile="cs-dekarbonizace-budov-bariery-emise.svg"
    class="narrow-figure"
    alt="TODO"
    source-text="Evropská agentura pro životní prostředí, data za rok 2022 a vlastní zpracování (podíl emisí v průmyslu)"
    source-url="https://climate-energy.eea.europa.eu/topics/climate-change-mitigation/greenhouse-gas-emissions-inventory/data"
%}

## Bariéry pro renovaci budov a snižování emisí

Dekarbonizace sektoru budov naráží na řadu překážek, které zpomalují tempo renovací a snižují jejich dostupnost pro obyvatele:

- systémová omezení
- složitost financování a administrativy
- nedostatek pracovních kapacit a technologií
- sociální a psychologické faktory ovlivňující ochotu lidí renovovat

Jednotlivé bariéry jsou mezi sebou provázané – například neexistuje společná datová základna o stavu budov, což komplikuje vytváření dlouhodobé strategie renovace budov. Hlavní bariéry pro dekarbonizaci shrnuje text níže.[^vycet] Ačkoliv řada z nich se týká většiny budov, některé z nich se jsou specifické pro rezidenční budovy. O těchto budovách existuje více dat, zároveň je jich několikanásobně více než budov nerezidenčních.[^sance-pro-budovy]

{% include figure.html
    name="cs-dekarbonizace-budov-bariery-schema.svg"
    name-mobile="cs-dekarbonizace-budov-bariery-schema.svg"
    alt="TODO"
    source-text="Fakta o klimatu"
%}

### Systémové bariéry

**Chybějí data o stavu budov**

Bez znalosti stáří, energetické náročnosti, stupně památkové ochrany a dalších parametrů fondu budov je obtížné plánovat a efektivně cílit opatření na podporu renovací. Data buď:
- neexistují (např. o velikosti nerezidenčních budov a jejich spotřebě či o energeticky nejnáročnějších budovách)
- jsou nepřístupná veřejnosti (např. data o průkazech energetické náročnosti budovy – PENB) nebo
- jsou roztříštěna napříč úřady a nejsou mezi sebou provázána.

Analýza stavu budov v Česku aktuálně probíhá (v gesci ministerstva průmyslu a obchodu).

Jako příklad dobré praxe může sloužit dánský [registr budov a bydlení](https://bbr.dk/om-bbr) (*Bygnings- og Boligregistret*, BBR), který shromažďuje informace o rezidenčních i nerezidenčních budovách na jednom místě – typ, rok výstavby nebo rekonstrukce, velikost, způsob vytápění, materiály atd. Údaje přitom spravuje jak veřejný sektor, tak vlastníci nemovitostí, kteří jsou povinni nahlašovat jejich změny.

**Chybí aktuální strategie renovace budov**

Renovace vyžadují stabilní a předvídatelné podmínky jak pro domácnosti a firmy, tak i pro stavební sektor. Fakt, že chybí aktuální strategie renovace, brzdí rozvoj nabídky i poptávky.[^strategie-mpo] Sektor budov je navíc například v porovnání s elektroenergetikou, koncentrovanou do několika provozů, velmi roztříštěný – v Česku je okolo tří milionů budov, z nichž každá je v jiném stavu a patří jinému majiteli. V takovém prostředí je složitější dělat změny a hůře se v něm také investičně plánuje.

Česko čeká příprava vnitrostátního plánu renovace budov (řeší ministerstvo průmyslu a obchodu),[^epbd] který bude směřovat k uhlíkově neutrálnímu fondu budov do roku 2050.

**Opatření nejsou dostatečně provázaná**

S tématem chybějící strategie úzce souvisí i potřeba promyšlenější [provázanosti opatření](/explainery/nastroje-stat) na podporu dekarbonizace budov. Tedy jak dobře zkombinovat regulace, ekonomické pobídky (dotace, úvěry, daňové úlevy) a poradenství, a jak více zapojit obce a developery. Jinými slovy: k renovaci nestačí zpřísnit normy nebo zpoplatnit emise, vyžaduje to i dotační a investiční podporu, a kromě toho také informační kampaně a nabídku poradenství, které zvýší všeobecné povědomí o možnostech a výhodách renovace. Navíc musí být na trhu dostatek nízkoemisních technologií, jako jsou tepelná čerpadla nebo solární panely, a musí být dost kvalifikované pracovní síly, která umožní jejich instalaci. 

Propojení nástrojů se částečně daří v programu [Nová zelená úsporám](https://novazelenausporam.cz/), kdy je kromě dotace k dispozici i energetické poradenství, možnost zvýhodněného úvěru a zároveň probíhá aktivní spolupráce s realizačními firmami.

**V nájemním bydlení je nízká motivace renovovat**

Často chybí motivace pronajímatele investovat do renovací – náklady na energie totiž nenesou oni, ale nájemci. Ti pak budou těžit i z potenciálních úspor. Pokud už se vlastník pro renovaci rozhodne, může to vést ke zvyšování nájemného, což představuje sociální riziko (pro nájemce bude bydlení příliš drahé). Nájemní bydlení dnes v Česku tvoří přibližně [20 %](https://scitani.gov.cz/pravni-duvod-uzivani-bytu) bytového fondu (900 tisíc bytů). Chybějí přitom opatření, která by kombinovala podporu renovace se zajištěním dostupnosti bydlení. Inspirací může být Vídeň, kde je veřejná podpora renovací podmíněna zachováním dostupného nájmu po určitou dobu.[^viden]

**Není dostatek poradenských kapacit**

Chybějí poradenské kapacity pro obce, domácnosti i podniky o tom, jak vypadá efektivní renovace, která přinese největší úspory. Například výhodnost zateplení jako prvního kroku – nejvíce energie v budovách se spotřebuje na vytápění.

Vláda ve [Vnitrostátním plánu ČR v oblasti energetiky a klimatu](https://mpo.gov.cz/assets/cz/energetika/strategicke-a-koncepcni-dokumenty/2024/12/Vnitrostatni-plan-Ceske-republiky-v-oblasti-energetiky-a-klimatu-_prosinec-2024_.pdf) kromě navýšení poradenských kapacit[^poradci] počítá i se zřízením pilotních kontaktních míst, tzv. *one-stop-shopů*, které budou nabízet jak technické, tak administrativní a finanční poradenství.[^necp] Ministerstvo životního prostředí v červenci 2025 vyhlásilo [výzvu](https://mzp.gov.cz/cz/pro-media-a-verejnost/aktuality/archiv-tiskovych-zprav/mzp-pripravuje-reformu-energetickeho) na podporu energetického poradenství, ve které podpoří školení pro energetické poradce i manažery, osvětové programy pro veřejnost nebo tvorbu energeticko-klimatických plánů.

### Finanční a administrativní bariéry

**Vysoké investiční náklady**

Počáteční náklady na komplexní renovaci jsou vysoké a příjmy části domácností na ně nestačí. Pomáhají stávající dotační programy, např. [Nová zelená úsporám](https://novazelenausporam.cz/), nemusejí však pokrýt celou investici, takže jsou dostupné hlavně pro ty, kteří mají vlastní úspory nebo si mohou dovolit úvěr. Navíc v minulosti byla dotační podpora vyplácena zpětně. To se od roku 2025 změnilo a nyní je poskytována zálohově předem. V příštích letech by měly být k dispozici další prostředky v rámci [Sociálního klimatického fondu](https://mzp.gov.cz/cz/agenda/prehled-dotaci/socialni-klimaticky-fond#:~:text=Prost%C5%99edky%20Soci%C3%A1ln%C3%ADho%20klimatick%C3%A9ho%20fondu%20jsou,a%20sn%C3%AD%C5%BEen%C3%AD%20energetick%C3%A9%20n%C3%A1ro%C4%8Dnosti%20budov.). Vysoké investiční nároky se netýkají pouze domácností, ale i vlastníků nerezidenčních budov.

**Velká administrativní zátěž pro obce, podniky i domácnosti**

Komplikované a časově náročné procesy – od žádosti o dotaci až po stavební povolení – zpomalují realizaci renovací a mohou řadu domácností, firem i obcí od investic odradit.

Kromě zjednodušení procesů může pomoct i výše zmíněné navýšení poradenských kapacit.

### Kapacita pracovní síly a technologické bariéry

**Nedostatek kvalifikované pracovní síly**

Chybí dostatek kvalifikovaných pracovníků na zateplování, instalaci tepelných čerpadel, fotovoltaických systémů apod.[^necp-kapacity] Stávající kapacity nestačí pokrýt rostoucí poptávku, což zpomaluje tempo renovací, a tedy i pokles spotřeby energie a emisí skleníkových plynů. Vzniká tak prostor pro tvorbu nových pracovních míst a pro prohlubování expertizy lidí pracujících v sektoru stavebnictví a energetiky.[^cid]

**Dlouhé čekací lhůty na technologie**

S nedostatkem kapacit realizačních firem souvisí i riziko nedostupnosti technologií nebo materiálů. Situace, kdy poptávka po nízkoemisních technologiích výrazně převyšuje nabídku, vede k dlouhým čekacím lhůtám a potenciálně vyšší ceně. Ta pro tepelná čerpadla během energetické krize byla i více než [šest měsíců](https://www.ekonews.cz/dnes-objednate-nejdrive-v-zime-dostanete-dodaci-lhuty-na-tepelna-cerpadla-jsou-minimalne-pul-roku/). Dlouhé čekání může pro domácnosti i podniky snižovat ochotu investovat.

**Zranitelnost dodavatelských řetězců**

Technologie a materiály pro dekarbonizaci budov – jako fotovoltaické panely – jsou z velké části vyráběny mimo Evropu, především v Číně. Pandemie koronaviru ukázala, jak křehké jsou globální dodavatelské řetězce: narušení logistiky a výroby vedlo k nedostatku stavebních materiálů a prudkému [růstu cen](https://mpo.gov.cz/assets/cz/stavebnictvi-a-suroviny/informace-z-odvetvi/2023/1/Stavebnictvi-2022.pdf). Podobné riziko představuje rostoucí poptávka po kritických surovinách (např. lithiu nebo mědi), jejichž naleziště jsou jednak koncentrovaná především mimo EU, jednak jsou do velké míry [kontrolované Čínou](https://www.amo.cz/wp-content/uploads/2023/06/FS_cina_06.pdf).

Z toho důvodu se EU v poslední době soustředí na posílení vlastní soběstačnosti – ať už navýšením výroby nízkoemisních technologií na jejím území skrze [akt o průmyslu pro čisté nulové emise](https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/european-green-deal/green-deal-industrial-plan/net-zero-industry-act_cs) (*Net-Zero Industry Act*, NZIA) nebo prostřednictvím [aktu o kritických surovinách](https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/european-green-deal/green-deal-industrial-plan/european-critical-raw-materials-act_cs) (*Critical Raw Materials Act*, CRMA), jehož cílem je rozvíjet jak domácí těžbu, zpracování a recyklaci, tak navázat stabilní partnerství se třetími zeměmi.

### Sociální a psychologické bariéry

**Spokojenost se stavem nemovitosti**

Značná část domácností je stavem své nemovitosti spokojena.[^stem] Bez tlaku vysokých cen energií nebo jiného akutního problému chybí motivace ke změně.

**Prostorová a časová náročnost renovace**

Komplexní rekonstrukce vyžaduje dočasné uvolnění přestavovaných prostor. Ne každá domácnost má možnost přestěhovat se jinam nebo žít v provizorních podmínkách během stavebních prací.

**Málo příkladů dobré praxe**

Pokud v okolí nedochází k renovacím, chybí přímá zkušenost a inspirace. Lidé se tak obtížněji rozhodují a zároveň vzniká prostor pro mýty, jako například "zateplený dům nedýchá".

**Averze ke změnám**

Do rozhodování domácností se kromě ekonomických faktorů promítají také společenské vzorce a zvyky (např. zvyk financovat renovace z úspor). Své investice tak plánují jiným způsobem než firmy nebo stát. Roli hraje i vztah ke změnám, a to jak v případě domácností, tak stavebních firem, kdy může být obtížné nahradit dosavadní stavební postupy novými.

**Nejistota budoucích cen**

Nejistota ohledně vývoje cen zemního plynu a elektřiny (případně ceny emisní povolenky pro spalování paliv v budovách – [EU ETS 2](/explainery/emisni-povolenky-ets-2)), a tedy výhodnosti přechodu na tepelné čerpadlo nebo transformace teplárenství, může snižovat ochotu investovat. Obdobně do toho 

## Kdo se může na řešení bariér podílet

Odstranění bariér v dekarbonizaci budov – a tedy včasné snížení emisí v sektoru – vyžaduje **koordinovanou spolupráci státu, samospráv, firem i obyvatelstva**.
- Významnou roli hlavně pro nastavování prostředí hraje vláda a příslušná ministerstva – především ministerstvo průmyslu a obchodu a ministerstvo životního prostředí (strategie, dotační programy, poradenství) nebo ministerstvo pro místní rozvoj (stavební legislativa a nájemní bydlení).
- Samosprávy mohou přímo iniciovat renovace veřejných budov, nabízet dostupné bydlení nebo poskytovat energetické poradenství a osvětu.
- Banky a finanční instituce mohou pomoct překonávat bariéru vysokých investičních nákladů nabídkou zvýhodněných úvěrů.
- Z hlediska realizace úsporných opatření je pak důležitá role soukromého sektoru, konkrétně stavebních a developerských firem nebo výrobců a dodavatelů technologií, které ovlivňují dostupnost a kvalitu technologií, kapacitu pracovní síly i rychlost realizace.
- Dílčí roli mohou hrát také státní instituce, jako například Český statistický úřad pro tvorbu společné datové základny.

## Poznámky a zdroje

Tento text se opírá i o konzultace s experty a expertkami a jejich vhledy z praxe, děkujeme za ně.

[^eea-data]: Emise z provozu budov klesly v Česku mezi lety 1990 a 2022 o 37 %. Jde o součet přímých i nepřímých emisí z provoz rezidenčních i komerčních budov dle [reportu](https://climate-energy.eea.europa.eu/topics/climate-change-mitigation/greenhouse-gas-emissions-inventory/data) Evropské agentury pro životní prostředí.

[^eurostat-balances]: Jde o průměr za roky 2018–2022 na základě dat Eurostatu (dataset [nrg_bal_c](https://doi.org/10.2908/NRG_BAL_C)).

[^ember-mix]: Viz [data](https://ember-energy.org/data/electricity-data-explorer) think tanku Ember.

[^energie-prumysl]: Jde o odhad vycházející z dat [Českého statistického úřadu](https://csu.gov.cz/produkty/spotreba-paliv-a-energie-2023) pro léta 2021 až 2023 a Eurostatu (dataset [nrg_bal_c](https://doi.org/10.2908/NRG_BAL_C)). Konkrétně zahrnujeme výstavbu a demolici budov (v tom 1 TWh), nekovové minerály (4 TWh), výrobu železa a oceli (3 TWh) a dřevozpracující průmysl (1 TWh).

[^prime-neprime]: Podle místa vzniku se tyto emise také označují jako přímé a nepřímé. Zatímco přímé (tzv. *scope 1* emise) vznikají při spalování paliv v budovách, nepřímé (tzv. *scope 2* emise) při výrobě energie v teplárnách a elektrárnách. Zatímco přímé provozní emise ze spalování paliv v rezidenčních i nerezidenčních budovách jsou uvedeny v každoroční [inventarizaci emisí skleníkových plynů](/infografiky/emise-cr), nepřímé provozní emise [dopočítává](https://climate-energy.eea.europa.eu/topics/climate-change-mitigation/greenhouse-gas-emissions-inventory/data) Evropská agentura pro životní prostředí (EEA) jako odpovídající podíl emisí z výroby elektřiny a tepla podle konečné spotřeby energie dle energetických statistik (jde o tzv. *end-user emissions*).

[^procesni-spalovaci]: Emise z výroby stavebních materiálů pochází jednak spalováním paliv při zahřívání na vysoké teploty, jednak během chemických reakcí (např. při výrobě cementu).

[^zabudovane-emise]: Jde o podíl [průmyslových emisí](/infografiky/emise-cr-prumysl), které významně souvisí s výrobou stavebních materiálů a výstavbou. Jejich podíl připadající budovám jsme pro účely tohoto textu zjednodušene odhadli na základě dat [konečné spotřeby energie](https://doi.org/10.2908/NRG_BAL_C). Konkrétně 3 Mt CO2eq z výroby železa a oceli, 2 Mt z nekovových minerálů, 1 Mt ze zpracovatelského průmyslu a konstrukce, 2 Mt z F-plynů. Dohromady jde o 8 Mt, což představuje 7 % emisí Česka.

[^vycet]: Ambicí textu není není poskytnout vyčerpávající výčet. Bariérám dekarbonizace budov se ve větším detailu věnuje například i studie [Zero Carbon Roadmap – Cesta ke klimaticky neutrálním budovám v České republice](https://www.czgbc.org/cs/zero-carbon-roadmap) České rady pro šetrné budovy.

[^sance-pro-budovy]: Dle [odhadu](https://mpo.gov.cz/assets/cz/energetika/energeticka-ucinnost/strategicke-dokumenty/2020/6/_20_III_dlouhodoba_strategie_renovaci_20200520_schvalene.pdf) Šance pro budovy z roku 2016 je nerezidenčních budov asi 600 000. Jde přitom jak o velké kancelářské objekty, školy nebo nemocnice, tak o malá rekreační zařízení jako chatky. Rezidenčních budov je oproti tomu dle [Sčítání lidu, domů a bytů z roku 2021](https://scitani.gov.cz/druh-domu) kolem 2,3 milionů (z toho jsou necelé 2 miliony obydlené).

[^strategie-mpo]: [Poslední strategie](https://mpo.gov.cz/assets/cz/energetika/energeticka-ucinnost/strategicke-dokumenty/2020/6/_20_III_dlouhodoba_strategie_renovaci_20200520_schvalene.pdf) pro renovace budov vznikla na MPO v roce 2020. Aktuálně probíhá příprava nové.

[^epbd]: Úkol sestavit plán vychází z unijní směrnice o energetické náročnosti budov (*Energy Performance of Buildings Directive*, EPBD) z roku 2024. [Článek 3](https://eur-lex.europa.eu/legal-content/CS/TXT/HTML/?uri=OJ:L_202401275#art_3) upřesňuje, které informace by měl plán obsahovat – shrnutí současného stavu fondu budov, cíle a indikátory a politiky k jejich naplnění, investiční potřeby atd.

[^viden]: To je součástí tzv. programu jemné obnovy města (*Sanfte Stadterneuerung*). Více viz Hatz, Gerhard. *Can public subsidized urban renewal solve the gentrification issue? Dissecting the Viennese example.* Cities 115 (2021). https://doi.org/10.1016/j.cities.2021.103218

[^poradci]: Do seznamu stávajících poradců a poradkyň lze nahlédnout [zde](https://efekt.gov.cz/cz/ekis/strediska-EKIS).

[^necp]: Viz str. 158 [Vnistrostátního plánu ČR v oblasti energetiky a klimatu](https://mpo.gov.cz/assets/cz/energetika/strategicke-a-koncepcni-dokumenty/2024/12/Vnitrostatni-plan-Ceske-republiky-v-oblasti-energetiky-a-klimatu-_prosinec-2024_.pdf).

[^necp-kapacity]: Nedostatek pracovních kapacit zmiňuje i [Vnistrostátní plán ČR v oblasti energetiky a klimatu](https://mpo.gov.cz/assets/cz/energetika/strategicke-a-koncepcni-dokumenty/2024/12/Vnitrostatni-plan-Ceske-republiky-v-oblasti-energetiky-a-klimatu-_prosinec-2024_.pdf).

[^cid]: Potřebu navýšit kvalifikace v oblasti nízkoemisních řešení obsahuje jako jednu z priorit i [Dohoda o čistém průmyslu](https://commission.europa.eu/topics/eu-competitiveness/clean-industrial-deal_cs), kterou Evropská komise představila v únoru 2025.

[^stem]: Viz [průzkum STEM](https://www.stem.cz/wp-content/uploads/2024/10/AAA_STEM_vytapime_a_zateplujeme_Vfin.pdf) (2024), slide 28. Při dotazování na investice do jednotlivých úsporných opatření (nová okna, zateplení stěn apod.) více než povolina respondentů odpovídá, že není potřeba. V kontextu závazků a emisních cílů to tak ukazuje potřebu posílit v povědomí lidí provázanost emisní/energetické náročnosti a realizací úsporných opatření. Stejně tak provázanost s ekonomickými úsporami nebo vyšším komfortem.