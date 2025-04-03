---
layout:      explainer
title:       "Jakým bariérám čelí dekarbonizace sektoru budov v Česku?"
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
perex:       "Sektor budov se v Česku podílí na necelé polovině spotřeby energie a přibližně třetině vyprodukovaných emisí skleníkových plynů. Jde především o emise, které vznikají spalováním zemního plynu a uhlí pro získávání tepla nebo elektřiny, v menší míře pak ty, které pochází z produkce stavebních materiálů. Budovy tak mají velký dekarbonizační potenciál. Ten ale naráží na bariéry, jako je chybějící strategie renovace budov nebo nedostatek finančních prostředků. Hlavní proměnnou je v tomto případě čas – zrenovovat celý domovní fond totiž není otázkou let, nýbrž desetiletí."
---

{% capture cinnosti %}

Když se bavíme o sektoru budov v kontextu dekarbonizace, běžně máme na mysli snižování emisí při činnostech, které souvisí především s jejich provozem, výstavbou a demolicí.

Provoz budov zahrnuje následující činnosti:

- vytápění,
- chlazení,
- větrání,
- ohřev vody,
- vaření,
- svícení,
- pohon elektrospotřebičů (pračka, lednička, počítač, mobilní telefon atd.),
- provoz výtahů nebo eskalátorů.

Pod výstavbu, příp. demolici, budov řadíme tyto činnosti:

- výrobu a dopravu stavebních materiálů (cementu, cihel, oceli, dřeva, izolace atd.),
- samotnou výstavbu (případně rekonstrukci nebo demolici), včetně využívání stavebních strojů,
- nakládání se stavebním odpadem,
- výrobu energetických technologií pro budovy (tepelných čerpadel, fotovoltaických panelů, baterií atd.).

{% endcapture %}

{% include expander-figure.html
    name="cinnosti"
    expanded=false
    class="contrast-figure "
    label="Jaké činnosti spadají pod sektor budov?"
    content=cinnosti
%}

## Energie a emise v sektoru budov

Ačkoliv díky renovacím a navyšujícím se standardům pro energetickou náročnost budov potřeba energie i vyprodukované emise v sektoru klesají,[^eea-data] nadále v poměru k celku zaujímají nezanedbatelné množství s velkým potenciálem pro dekarbonizaci.

### Kde vzniká a je spotřebovávána energie?

Provoz budov stojí za přibližně **43 % konečné spotřeby energie v Česku**.[^eurostat-balances] Ta zahrnuje především energii potřebnou pro provoz budov, tedy vytápění a ohřev teplé vody skrze dálkové teplo nebo kotlů na zemní plyn, biomasu, uhlí či elektřinu. Z pohledu emisí je zásadní, z jakého zdroje je energie vyráběna. Jako zdroj vytápění a ohřevu vody v domácnostech převažuje biomasa (často v podobě dřeva, týká se především rodinných domů), zemní plyn nebo nakupované teplo (které pochází z uhlí, zemního plynu nebo v menší míře z biomasy). Menší část energie je využívaná pro svícení a provoz elektrospotřebičů, který zajišťuje elektřina, jejíž emisní náročnost odráží současný mix Česka (42 % fosilní paliva, 41 % jádro, 17 % obnovitelné zdroje v roce 2024[^ember-mix]). Energie pro vaření pak pochází ze zemního plynu nebo elektřiny.

Menší část energie (odhadem asi 3 % konečné spotřeby energie Česka, 11 % energie spotřebované v průmyslu[^energie-prumysl]) je pak potřebná v průmyslu pro výrobu stavebních materiálů, při výstavbě a rekonstrukci nebo demolici.

{% include figure.html
    name="cs-dekarbonizace-budov-bariery-energie.svg"
    name-mobile="cs-dekarbonizace-budov-bariery-energie.svg"
    alt="TODO"
    source-text="Český statistický úřad, Energo 2021"
    source-url="https://csu.gov.cz/produkty/spotreba-paliv-a-energii-v-domacnostech-energo-2021"
%}

### Kde vnikají emise?

Obdobně jako energie i emise se dělí podle toho, v jaké fázi vznikají, a to na:

- **Provozní**, které vznikají hlavně při výrobě elektřiny a tepla kvůli spalování paliv. A to jednak v lokálních kotlích nebo kamnech přímo v budovách (9 % emisí Česka v roce 2022), jednak při výrobě elektřiny nebo tepla v elektrárnách a teplárnách, které je následně dodáváno do domácností a kanceláří (asi 20 % emisí Česka).[^prime-neprime]
- **Zabudované**, které pochází z výroby stavebních materiálů[^procesni-spalovaci] – cementu, vápna a (asi 7 % emisí Česka).[^zabudovane-emise] Dále sem spadá část emisí z výroby oceli nebo z přepravy a likvidace materiálů.

Celkem tak budovy v celém životním cyklu zaujímají **přibližně 36 % emisí skleníkových plynů Česka.**

{% include figure.html
    name="cs-dekarbonizace-budov-bariery-emise.svg"
    name-mobile="cs-dekarbonizace-budov-bariery-emise.svg"
    class="narrow-figure"
    alt="TODO"
    source-text="Evropská agentura pro životní prostředí, data za rok 2022 a vlastní zpracování (podíl emisí v průmyslu)"
    source-url="https://climate-energy.eea.europa.eu/topics/climate-change-mitigation/greenhouse-gas-emissions-inventory/data"
%}

## Jaké jsou bariéry pro snižování emisí?

Dekarbonizace sektoru budov naráží na řadu překážek, které zpomalují tempo renovací a snižují jejich dostupnost. Bariéry lze rozdělit do následujících skupin:

- systémová omezení,
- složitost financování a administrativy,
- nedostatek pracovních kapacit a technologií,
- sociální a psychologické faktory ovlivňující ochotu lidí renovovat.

Jednotlivé bariéry zároveň nestojí samy o sobě, ale jsou mezi sebou provázané. Například neexistence společné datové základny činí obtížnější tvorbu dlouhodobé strategie renovace budov. Níže shrnujeme ty hlavní se známých bariér.[^vycet]

Ačkoliv většina bariér platí pro většinu budov, některé z nich se týkají specificky rezidenčních budov. Jednak o nich existuje více dat, jednak je jich několikanásobně více.[^sance-pro-budovy]

{% include figure.html
    name="cs-dekarbonizace-budov-bariery-schema.svg"
    name-mobile="cs-dekarbonizace-budov-bariery-schema.svg"
    alt="TODO"
    source-text="Fakta o klimatu"
%}

### Systémové bariéry

**Chybí data o stavu budov**

Bez bližší znalosti fondu budov zahrnující stáří, energetickou náročnost, památkovou ochranu a další parametry je obtížné plánovat a cílit opatření na podporu renovací efektivně. Data buď:
- neexistují (např. o velikosti nerezidenčních budov a jejich spotřebě nebo o energeticky nejnáročnějších budovách),
- jsou nepřístupná veřejnosti (např. data o průkazech energetické náročnosti budovy, PENB) nebo
- jsou roztříštěna napříč úřady a nejsou mezi sebou provázaná.

Analýza stavu budov v Česku aktuálně probíhá v gesci ministerstva průmyslu a obchodu.

Jako příklad dobré praxe může sloužit dánský [registr budov a bydlení](https://bbr.dk/om-bbr) (*Bygnings- og Boligregistret*, BBR), který shromažďuje informace o rezidenčních i nerezidenčních budovách na jednom místě – typ, rok výstavby nebo rekonstrukce, velikost, způsob vytápění, materiály atd. Údaje přitom spravuje jak veřejný sektor, tak vlastníci nemovitostí, kteří jsou povinni nahlašovat jejich změny.

**Chybí aktuální strategie renovace budov**

Renovace vyžadují stabilní a předvídatelné podmínky jak pro domácnosti a firmy, tak i pro stavební sektor. Chybějící aktuální strategie brzdí rozvoj nabídky i poptávky.[^strategie-mpo] Sektor budov je navíc například v porovnání s elektroenergetikou, která je koncentrovaná do několika provozů, roztříštěný. V Česku je kolem tří milionů budov, z nichž každá je v jiném stavu a patří jinému majiteli. A to znamená i různé možnosti dekarbonizace. Hůře se v něm také investičně plánuje.

Česko v gesci ministerstva průmyslu a obchodu čeká příprava vnitrostátního plánu renovace budov,[^epbd] který bude směřovat k uhlíkově neutrálnímu fondu budov do roku 2050.

**Nedostatečná provázanost opatření**

S tématem chybějící strategie úzce souvisí i promyšlenější [provázanost opatření](/explainery/nastroje-stat) na podporu dekarbonizace budov. Ta vyžaduje kombinaci regulací, ekonomických pobídek (dotací, úvěrů, daňových úlev) a poradenství, a také větší zapojení obcí a developerů. Jinými slovy, k renovaci budov nedojde pouze zpřísněním norem nebo zpoplatněním emisí, je také potřeba poskytnout dotační a investiční podporu, realizovat informační kampaně či nabízet poradenství, které zvýší všeobecné povědomí o možnostech a výhodách renovace. Navíc musí být na trhu dostatek nízkoemisních technologií, jako jsou tepelná čerpadla nebo solární panely, a musí být dost kvalifikované pracovní síly, která umožní jejich instalaci.

Propojení nástrojů se částečně daří v programu [Nová zelená usporám](https://novazelenausporam.cz/), kdy je kromě dotace k dispozici energetické poradenství, možnost zvýhodněného úvěru a zároveň probíhá aktivní spolupráce s realizačními firmami.

**Nízká motivace k renovacím v nájemním sektoru**

V nájemním bydlení často chybí motivace pro vlastníky investovat do renovací, jelikož náklady na energie nenesou oni, nýbrž nájemnící. Ti pak budou těžit i z potenciálních úspor. Pokud už se vlastník pro renovaci rozhodne, může vést ke zvyšování nájemného, což představuje sociální riziko pro nájemce. Nájemní bydlení v Česku tvoří přibližně [20 %](https://scitani.gov.cz/pravni-duvod-uzivani-bytu) bytového fondu (900 tisíc bytů). Chybí přitom opatření, která by kombinovala podporu renovace se zajištěním dostupnosti bydlení. Inspirací může být Vídeň, kde veřejná podpora renovací podmiňuje zachování dostupného nájmu po určitou dobu.[^viden]

**Nedostatek poradenských kapacit**

Chybí poradenské kapacity pro obce, domácnosti i podniky o tom, jak vypadá efektivní renovace, která přinese největší úsporu – nejvíce energie v budovách je potřeba na vytápění, a proto je často vhodným prvním krokem zateplení.

Vláda ve [Vnitrostátním plánu ČR v oblasti energetiky a klimatu](https://mpo.gov.cz/assets/cz/energetika/strategicke-a-koncepcni-dokumenty/2024/12/Vnitrostatni-plan-Ceske-republiky-v-oblasti-energetiky-a-klimatu-_prosinec-2024_.pdf) kromě navýšení poradenských kapacit[^poradci] počítá i se zřízením pilotních kontaktních míst, tzv. *one-stop-shopů*, které budou nabízet jak technické, tak administrativní a finanční poradenství.[^necp] Ministerstvo životního prostředí pak v červenci 2025 vyhlásilo [výzvu](https://mzp.gov.cz/cz/pro-media-a-verejnost/aktuality/archiv-tiskovych-zprav/mzp-pripravuje-reformu-energetickeho) na podporu energetického poradenství, ve které podpoří školení pro energetické poradce i manažery, osvětové programy pro veřejnost nebo tvorbu energeticko-klimatických plánů.

### Finanční a administrativní bariéry

**Vysoké investiční náklady**

Počáteční náklady na komplexní renovaci jsou vysoké, část domácností na ně se svými příjmy nevystačí. Stávající dotační programy, např. [Nová zelená úsporám](https://novazelenausporam.cz/), pomáhají, ale nemusí pokrýt celou investici, takže jsou dostupné hlavně pro ty, kteří mají vlastní úspory nebo si mohou dovolit úvěr. V minulosti navíc byla dotační podpora vyplácena zpětně, což se od roku 2025 změnilo a nyní je poskytována zálohově předem. V příštích letech by měly být k dispozici další prostředky v rámci [Sociálního klimatického fondu](https://mzp.gov.cz/cz/agenda/prehled-dotaci/socialni-klimaticky-fond#:~:text=Prost%C5%99edky%20Soci%C3%A1ln%C3%ADho%20klimatick%C3%A9ho%20fondu%20jsou,a%20sn%C3%AD%C5%BEen%C3%AD%20energetick%C3%A9%20n%C3%A1ro%C4%8Dnosti%20budov.). Vysoké investiční nároky se netýkají pouze domácností, ale i vlastníků nerezidenčních budov.

**Administrativní zátěž pro obce, podniky i domácnosti**

Komplikované a časově náročné procesy – od žádosti o dotaci po stavební povolení – zpomalují realizaci renovací a mohou řadu domácností, firem i obcí od investic odradit.

Kromě zjednodušení procesů může pomoct již zmíněné navýšení poradenských kapacit.

### Kapacita pracovní síly a technologické bariéry

**Nedostatek kvalifikované pracovní síly**

Chybí dostatek kvalifikovaných lidí pro zateplování, instalaci tepelných čerpadel, fotovoltaických systémů apod.[^necp-kapacity] Stávající kapacity nestačí pokrýt rostoucí poptávku, což zpomaluje tempo renovací, a tedy pokles spotřeby energie a emisí.

Vzniká tak prostor pro tvorbu nových pracovních míst. Stejně tak pro prohlubování expertízy stávajících zaměstnanců a zaměstnankyň v sektoru stavebnictví a energetiky.[^cid]

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

## Kdo se může podílet na řešení bariér?

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