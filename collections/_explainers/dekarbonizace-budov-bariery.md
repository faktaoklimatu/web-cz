---
layout:      explainer
title:       "Jakým bariérám čelí dekarbonizace sektoru budov v Česku?"
slug:        "dekarbonizace-budov-bariery"
published:   2025-04-03
authors:
  - id: "katerina-kolouchova"
  - ids: ["jirka-lnenicka"]
    minor-role: "editace"
weight:      90
tags-scopes: [ cr ]
tags-topics: [ opatreni ]
cover-source-author:        "Agent J"
cover-source-text:          "Unsplash"
cover-source-license:       "Unsplash License"
cover-source-license-url:   "https://unsplash.com/license"
cover-source-url:           "https://unsplash.com/photos/PtDNIlRSKRg"
perex:       "Sektor budov se v Česku podílí na emisích skleníkových plynů přibližně 35 %. Jde především o emise, které vznikají spalováním zemního plynu a uhlí pro získávání tepla nebo elektřiny, v menší míře pak ty, které pochází z produkce stavebních materiálů. Budovy tak mají velký dekarbonizační potenciál. Ten ale naráží na několik bariér, které v textu přibližujeme. Hlavní proměnnou je v tomto případě čas – zrenovovat celý domovní fond totiž není otázkou let, nýbrž desetiletí."
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
- výrobu nízkoemisních technologií (tepelných čerpadel, fotovoltaických panelů, baterií atd.).

{% endcapture %}

{% include expander-figure.html
    name="cinnosti"
    expanded=false
    class="contrast-figure "
    label="Jaké činnosti spadají pod sektor budov?"
    content=cinnosti
%}

## Energie a emise v sektoru budov

Ačkoliv díky renovacím a navyšujícím se standardům pro energetickou náročnost budov potřeba energie i vyprodukované emise potřebné v sektoru klesají, nadále v poměru k celku zaujímají nezanedbatelné množství s velkým potenciálem pro dekarbonizaci.

### Kde vzniká a je spotřebovávána energie?

Budovy stojí za přibližně **43 % konečné spotřeby energie v Česku**. Ta zahrnuje především energii potřebnou pro provoz budov, tedy vytápění a ohřev teplé vody skrze dálkové teplo nebo kotlů na zemní plyn, biomasu, uhlí či elektřinu. Z pohledu emisí je zásadní, z jakého zdroje je energie vyráběna. Jako zdroj vytápění a ohřevu vody v domácnostech převažuje biomasa (často v podobě dřeva, týká se především rodinných domů), zemní plyn nebo nakupované teplo (které pochází z uhlí, zemního plynu nebo v menší míře z biomasy). Menší část energie je využívaná pro svícení a provoz elektrospotřebičů, který zajišťuje elektřina, jejíž emisní náročnost odráží současný mix Česka (50 % fosilní paliva, 37 % jádro, 13 % OZE). Energie pro vaření pak pochází ze zemního plynu nebo elektřiny.

Menší část energie *(kolik orientačně?)* je pak potřebná v průmyslu pro výrobu stavebních materiálů, při výstavbě a rekonstrukci nebo demolici.

{% capture energie-domacnosti %}

{% include figure.html
    name="sankey-energie-domacnosti.png"
    name-mobile="sankey-energie-domacnosti.png"
    alt="TODO"
    source-text="Energo 2021"
    source-url="https://csu.gov.cz/produkty/spotreba-paliv-a-energii-v-domacnostech-energo-2021"
%}

{% endcapture %}

{% include expander-figure.html
    name="energie-domacnosti"
    expanded=false
    class="contrast-figure "
    label="Příklad: Spotřeba energie v domácnostech"
    content=energie-domacnosti
%}

### Kde vnikají emise?

Obdobně jako energie i emise se dělí podle toho, v jaké fázi vznikají, a to na:

- **Provozní**, které vznikají hlavně při výrobě elektřiny a tepla kvůli spalování paliv. A to jednak v lokálních kotlích nebo kamnech přímo v budovách (10 % emisí Česka), jednak při výrobě elektřiny nebo tepla v elektrárnách a teplárnách, které je následně dodáváno do domácností a kanceláří (asi 20 % emisí Česka).[^prime-neprime]
- **Zabudované**, které pochází z výroby stavebních materiálů[^procesni-spalovaci] – cementu, vápna a (asi 5 % emisí Česka). Dále sem spadá část emisí z výroby oceli nebo z přepravy a likvidace materiálů.

Celkem tak budovy v celém životním cyklu zaujímají **přibližně 35 % emisí skleníkových plynů Česka.**

## Jaké jsou bariéry pro snižování emisí?

Dekarbonizace sektoru budov naráží na řadu překážek, které zpomalují tempo renovací a snižují jejich dostupnost. Bariéry lze rozdělit do následujících skupin:

- systémová omezení,
- složitost financování a administrativy,
- nedostatek pracovních kapacit a technologií
- a také sociální a psychologické faktory ovlivňující ochotu lidí renovovat.

Jednotlivé bariéry zároveň nestojí samy o sobě, ale jsou mezi sebou provázané. Například neexistence společné datové základny činí tvorbu dlouhodobé strategie renovace budov obtížnější.

Ač většina bariér platí pro většinu budov, některé z nich se týkají specificky rezidenčních budov. Jednak o nich existuje více dat, jednak je jich několikanásobně více.[^sance-pro-budovy]

Níže shrnujeme ty hlavní se známých bariér, ambicí však není poskytnout vyčerpávající výčet.

### Systémové bariéry

**Chybějící data o stavu budov**

Bez bližší znalosti fondu budov zahrnující stáří, energetickou náročnost, památkovou ochranu a další parametry je obtížné plánovat a cílit renovace efektivně. Data buď:
- neexistují (např. o velikosti nerezidenčních budov a jejich spotřebě nebo o energeticky nejnáročnějších budovách),
- jsou nepřístupná veřejnosti (data o průkazech energetické náročnosti budovy, PENB) nebo
- jsou roztříštěna napříč úřady a nejsou mezi sebou provázaná.

Jako příklad dobré praxe může sloužit dánský [registr budov a bydlení](https://bbr.dk/om-bbr) (*Bygnings- og Boligregistret*, BBR), který shromažďuje informace o rezidenčních i nerezidenčních budovách na jednom místě – typ, rok výstavby nebo rekonstrukce, velikost, způsob vytápění, materiály atd. Údaje přitom spravuje jak veřejný sektor, tak vlastníci nemovitostí, kteří jsou povinni nahlašovat jejich změny.

Kdo může změnit: MPO, MŽP, ČSÚ

**Chybějící strategie renovace budov**

Renovace vyžadují stabilní a předvídatelné podmínky jak pro domácnosti a firmy, tak i pro stavební sektor. Chybějící aktuální strategie brzdí rozvoj nabídky i poptávky.[^strategie-mpo] Sektor budov je navíc například v porovnání s elektroenergetikou, která je koncentrovaná do několika provozů, roztříštěný. V Česku je kolem tří milionů budov, z nichž každá je v jiném stavu a patří jinému majiteli. A to znamená i různé možnosti dekarbonizace. Hůře se v něm tak investičně plánuje.

Česko v gesci ministerstva průmyslu a obchodu čeká příprava vnitrostátního plánu renovace budov[^epbd], který bude směřovat k uhlíkově neutrálnímu fondu budov do roku 2050.

Kdo může změnit: MPO, MŽP

**Nedostatečná provázanost opatření**

S tématem chybějící strategie úzce souvisí i promyšlenější [provázanost opatření](/explainery/nastroje-stat) na podporu dekarbonizace budov. Ta vyžaduje kombinaci regulací, ekonomických pobídek (dotací, úvěrů, daňových úlev) a poradenství, a také větší zapojení obcí a developerů. Jinými slovy, k renovaci budov nedojde pouze zpřísněním norem nebo zpoplatněním emisí, je také potřeba poskytnout dotační a investiční podporu, realizovat informační kampaně či nabízet poradenství, které zvýší všeobecné povědomí o možnostech a výhodách renovace. Navíc musí být na trhu dostatek nízkoemisních technologií, jako jsou tepelná čerpadla nebo solární panely, a musí být dost kvalifikované pracovní síly, která umožní jejich instalaci.

Propojení nástrojů se částečně daří v programu [Nová zelená usporám](https://novazelenausporam.cz/), kdy je kromě dotace k dispozici energetické poradenství, možnost zvýhodněného úvěru a zároveň probíhá aktivní spolupráce s realizačními firmami.

Kdo může změnit: MPO, MŽP (SFŽP)

**Nízká motivace k renovacím v nájemním sektoru**

V nájemním bydlení často chybí motivace pro vlastníky investovat do renovací, jelikož náklady na energie nenesou oni, nýbrž nájemnící. Ti pak budou těžit i z potenciálních úspor. Pokud už se vlastník pro renovaci rozhodne, může vést ke zvyšování nájemného, což představuje sociální riziko pro nájemce. Nájemní bydlení v Česku tvoří přibližně [20 %](https://scitani.gov.cz/pravni-duvod-uzivani-bytu) bytového fondu (900 tisíc bytů). Chybí přitom opatření, která by kombinovala podporu renovace se zajištěním dostupnosti bydlení. Inspirací může být Vídeň, kde veřejná podpora renovací podmiňuje zachování dostupného nájmu po určitou dobu.[^viden]

Kdo může změnit: MPO, MMR

**Nedostatek poradenských kapacit**

Chybí poradenské kapacity pro obce, domácnosti i podniky o tom, jak vypadá efektivní renovace, která přinese největší úsporu – nejvíce energie v budovách je potřeba na vytápění, a proto je často vhodným prvním krokem zateplení.

Vláda ve [Vnitrostátním plánu ČR v oblasti energetiky a klimatu](https://mpo.gov.cz/assets/cz/energetika/strategicke-a-koncepcni-dokumenty/2024/12/Vnitrostatni-plan-Ceske-republiky-v-oblasti-energetiky-a-klimatu-_prosinec-2024_.pdf) kromě navýšení poradenských kapacit[^poradci] počítá i se zřízením pilotních kontaktních míst, tzv. *one-stop-shopů*, které budou nabízet jak technické, tak administrativní a finanční poradenství.[^necp]

Kdo může změnit: MPO

### Finanční a administrativní bariéry

**Vysoké investiční náklady**

Počáteční náklady na komplexní renovaci jsou vysoké, část domácností na ně se svými příjmy nevystačí. Stávající dotační programy, např. [Nová zelená úsporám](https://novazelenausporam.cz/), pomáhají, ale nemusí pokrýt celou investici, takže jsou dostupné hlavně pro ty, kteří mají vlastní úspory nebo si mohou dovolit úvěr. V minulosti navíc byla dotační podpora vyplácena zpětně, což se od roku 2025 změnilo a nyní je poskytována zálohově předem. Vysoké investiční nároky se netýkají pouze domácností, ale i nerezidenčních budov.

Kdo může změnit: MPO, MŽP (SFŽP), banky, municipality

**Administrativní zátěž pro obce, podniky i domácnosti**

Komplikované a časově náročné procesy – od žádosti o dotaci po stavební povolení – zpomalují realizaci renovací a mohou řadu domácností, firem i obcí od investic odradit.

Kromě zjednodušení procesů může pomoct již zmíněné navýšení poradenských kapacit.

Kdo může změnit: MŽP (SFŽP), MMR

### Kapacita pracovní síly a technologické bariéry

**Nedostatek kvalifikované pracovní síly**

Chybí dostatek kvalifikovaných lidí pro zateplování, instalaci tepelných čerpadel, fotovoltaických systémů apod.[^necp-kapacity] Stávající kapacity nestačí pokrýt rostoucí poptávku, což zpomaluje tempo renovací, a tedy pokles spotřeby energie a emisí.

Vzniká tak prostor pro tvorbu nových pracovních míst. Stejně tak pro prohlubování expertízy stávajících zaměstnanců a zaměstnankyň v sektoru stavebnictví a energetiky.[^cid]

Kdo může změnit: MŠMT, kraje, vzdělávací instituce

**Dlouhé čekací lhůty na technologie**

S nedostatkem kapacit realizačních firem souvisí i riziko nedostupnosti technologií nebo materiálů. Situace, kdy poptávka po nízkoemisních technologiích výrazně převyšuje nabídku, vede k dlouhým čekacím lhůtám a potenciálně vyšší ceně. Ta pro tepelná čerpadla během energetické krize byla i více než [šest měsíců](https://www.ekonews.cz/dnes-objednate-nejdrive-v-zime-dostanete-dodaci-lhuty-na-tepelna-cerpadla-jsou-minimalne-pul-roku/). Dlouhé čekání může pro domácnosti i podniky snižovat ochotu investovat.

**Zranitelnost dodavatelských řetězců**

Technologie a materiály pro dekarbonizaci budov – jako fotovoltaické panely – jsou z velké části vyráběny mimo Evropu, především v Číně. Pandemie koronaviru ukázala, jak křehké jsou globální dodavatelské řetězce: narušení logistiky a výroby vedlo k nedostatku stavebních materiálů a prudkému [růstu cen](https://mpo.gov.cz/assets/cz/stavebnictvi-a-suroviny/informace-z-odvetvi/2023/1/Stavebnictvi-2022.pdf). Podobné riziko představuje rostoucí poptávka po kritických surovinách (např. lithiu nebo mědi), jejichž naleziště jsou jednak koncentrovaná především mimo EU, jednak jsou do velké míry [kontrolované Čínou](https://www.amo.cz/wp-content/uploads/2023/06/FS_cina_06.pdf).

Z toho důvodu se EU v poslední době soustředí na posílení vlastní soběstačnosti – ať už navýšením výroby nízkoemisních technologií na jejím území skrze [akt o průmyslu pro čisté nulové emise](https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/european-green-deal/green-deal-industrial-plan/net-zero-industry-act_cs) (*Net-Zero Industry Act*, NZIA) nebo prostřednictvím [aktu o kritických surovinách](https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/european-green-deal/green-deal-industrial-plan/european-critical-raw-materials-act_cs) (*Critical Raw Materials Act*, CRMA), jehož cílem je rozvíjet jak domácí těžbu, zpracování a recyklaci, tak navázat stabilní partnerství se třetími zeměmi.

### Sociální a psychologické bariéry

**Spokojenost se stavem nemovitosti**

Značná část domácností je stavem své nemovitosti spokojena (dle průzkumu STEM). Bez tlaku vysokých cen energií nebo jiného akutního problému chybí motivace ke změně. Do rozhodování domácností se kromě ekonomických faktorů promítají také společenské vzorce, zvyky (např. zvyk financovat renovace z úspor) nebo vztah ke změnám. Své investice tak plánují jiným způsobem než firmy nebo stát.

**Prostorová a časová náročnost renovace**

Komplexní rekonstrukce vyžaduje dočasné uvolnění přestavovaných prostor. Ne každá domácnost má možnost přestěhovat se jinam nebo žít v provizorních podmínkách během stavebních prací.

**Málo příkladů dobré praxe**

Pokud v okolí nedochází k renovacím, chybí přímá zkušenost a inspirace. Lidé se tak obtížněji rozhodují a zároveň vzniká prostor pro mýty, jako například „zateplený dům nedýchá“.

Kdo může změnit: MPO, MŽP, municipality

**Nejistota budoucích cen**

Nejistota ohledně vývoje cen zemního plynu a tedy výhodnosti přechodu na tepelné čerpadlo nebo transformace teplárenství může snižovat ochotu investovat.

## Kdo se může podílet na řešení bariér?

Možnost adresovat zmíněné bariéry mají především vláda a příslušná ministerstva (především MPO, MŽP a MMR) a vládní instituce. Dále kraje a obce. V dílčích případech pak instituce jako Český statistický úřad. Případně i soukromý sektor skrze... Nebo banky... *Bude rozepsáno šířeji.* Spolupráce a koordinace mezi jednotlivými aktéry je zásadní.

## Poznámky a zdroje

[^prime-neprime]: Podle místa vzniku se tyto emise také označují jako přímé a nepřímé. Zatímco přímé (tzv. *scope 1* emise) vznikají při spalování paliv v budovách, nepřímé (tzv. *scope 2* emise) při výrobě energie v teplárnách a elektrárnách.

[^procesni-spalovaci]: Emise z výroby stavebních materiálů pochází jednak spalováním paliv při zahřívání na vysoké teploty, jednak během chemických reakcí (např. při výrobě cementu).

[^sance-pro-budovy]: Dle [odhadu](https://mpo.gov.cz/assets/cz/energetika/energeticka-ucinnost/strategicke-dokumenty/2020/6/_20_III_dlouhodoba_strategie_renovaci_20200520_schvalene.pdf) Šance pro budovy z roku 2016 je nerezidenčních budov asi 600 000. Jde přitom jak o velké kancelářské objekty, školy nebo nemocnice, tak o malá rekreační zařízení jako chatky. Rezidenčních budov je oproti tomu dle Sčítání lidu, domů a bytů z roku 2021 kolem 2,3 milionů (z toho jsou necelé 2 miliony obydlené).

[^strategie-mpo]: [Poslední strategie](https://mpo.gov.cz/assets/cz/energetika/energeticka-ucinnost/strategicke-dokumenty/2020/6/_20_III_dlouhodoba_strategie_renovaci_20200520_schvalene.pdf) pro renovace budov vznikla na MPO v roce 2020. Aktuálně probíhá příprava nové.

[^epbd]: Úkol sestavit plán vychází z unijní směrnice o energetické náročnosti budov (*Energy Performance of Buildings Directive*, EPBD). [Článek 3](https://eur-lex.europa.eu/legal-content/CS/TXT/HTML/?uri=OJ:L_202401275#art_3) upřesňuje, které informace by měl plán obsahovat – shrnutí současného stavu fondu budov, cíle a indikátory a politiky k jejich naplnění, investiční potřeby atd.

[^viden]: To je součástí tzv. programu jemné obnovy města (*Sanfte Stadterneuerung*). Více viz Hatz, Gerhard. Can public subsidized urban renewal solve the gentrification issue? Dissecting the Viennese example. Cities 115 (2021). https://doi.org/10.1016/j.cities.2021.103218

[^poradci]: Do seznamu stávajících poradců a poradkyň lze nahlédnout [zde](https://efekt.gov.cz/cz/ekis/strediska-EKIS).

[^necp]: Viz str. 158 [Vnistrostátního plánu ČR v oblasti energetiky a klimatu](https://mpo.gov.cz/assets/cz/energetika/strategicke-a-koncepcni-dokumenty/2024/12/Vnitrostatni-plan-Ceske-republiky-v-oblasti-energetiky-a-klimatu-_prosinec-2024_.pdf).

[^necp-kapacity]: Nedostatek pracovních kapacit zmiňuje i [Vnistrostátní plán ČR v oblasti energetiky a klimatu](https://mpo.gov.cz/assets/cz/energetika/strategicke-a-koncepcni-dokumenty/2024/12/Vnitrostatni-plan-Ceske-republiky-v-oblasti-energetiky-a-klimatu-_prosinec-2024_.pdf).

[^cid]: Potřebu navýšit kvalifikace v oblasti nízkoemisních řešení obsahuje jako jednu z priorit i [Dohoda o čistém průmyslu](https://commission.europa.eu/topics/eu-competitiveness/clean-industrial-deal_cs), kterou Evropská komise představila v únoru 2025.