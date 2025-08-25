---
layout:      explainer
title:       "Jaké bariéry stojí v cestě dekarbonizaci sektoru budov v Česku?"
slug:        "dekarbonizace-budov-bariery"
published:   2025-08-11
authors:
  - id: "katerina-kolouchova"
  - ids: ["jirka-lnenicka"]
    minor-role: "editace"
  - name: "Michal Čejka, Tomáš Trubačík"
    minor-role: "konzultace"
weight:      90
tags-scopes: [ cr ]
tags-topics: [ opatreni ]
cover-source-author:        "Jakub Żerdzicki"
cover-source-text:          "Unsplash"
cover-source-license:       "Unsplash License"
cover-source-license-url:   "https://unsplash.com/license"
cover-source-url:           "https://unsplash.com/photos/a-small-town-surrounded-by-trees-and-hills-yLMf_BaOh1o"
perex:       "Téměř polovina celkové spotřeby energie v Česku a přibližně třetina vyprodukovaných emisí skleníkových plynů je spojena se sektorem budov. Dekarbonizaci tohoto sektoru nicméně komplikují různé bariéry: například chybějící strategie renovace budov či nedostatek finančních prostředků. Důležitou roli hraje také čas – zrenovovat celý domovní fond totiž není otázkou let, nýbrž desetiletí. Přehled hlavních bariér dekarbonizace budov v Česku přináší následující text."
infographics-url: /assets-local/files/dekarbonizace-budov-bariery-infografika.pdf
---

{% capture cinnosti %}

S provozem budov souvisí:

- vytápění
- chlazení
- větrání
- ohřev vody
- vaření
- svícení
- provoz elektrospotřebičů (např. pračka, lednička nebo počítač)
- provoz výtahů a eskalátorů

S výstavbou, případně demolicí, souvisí:

- výroba a doprava stavebních materiálů (např. cementu, cihel, oceli, dřeva či izolačních materiálů)
- samotná výstavba (případně rekonstrukce či demolice), včetně využívání stavebních strojů
- nakládání se stavebním odpadem
- výroba energetických technologií pro budovy (např. tepelných čerpadel, fotovoltaických panelů, baterií)

Dekarbonizace sektoru budov znamená eliminovat emise související s provozem budov i emise spojené s jejich výstavbou a demolicí.

{% endcapture %}

{% include expander-figure.html
    name="cinnosti"
    expanded=false
    class="contrast-figure "
    label="Jaké činnosti jsou se sektorem budov spojeny?"
    content=cinnosti
%}

## Energie a emise v sektoru budov

V tomto sektoru **emise skleníkových plynů vznikají hlavně při spalování zemního plynu a uhlí** (k získávání tepla a elektřiny), v menší míře pocházejí z výroby stavebních materiálů. Díky renovacím a zvyšování standardů pro energetickou náročnost budov celková spotřeba energie i množství emisí v tomto sektoru postupně klesá,[^eea-data] přesto je jeho podíl na spotřebě i emisích i nadále značný, a je zde tedy i velký potenciál pro další dekarbonizaci.

### Kolik energie budovy spotřebují a z čeho je vyrobena?

**S provozem budov je spojeno přibližně 43 % konečné spotřeby energie v Česku**.[^eurostat-balances] Jde zejména o energii potřebnou k vytápění a ohřevu teplé vody v teplárnách (dálkové teplo) nebo v lokálních kotlích na zemní plyn, biomasu, uhlí či elektřinu. 

Z hlediska emisí skleníkových plynů je zásadní, z jakého zdroje se energie vyrábí. U rodinných domů převažuje jako zdroj vytápění a ohřevu vody zemní plyn a biomasa (často jde o dřevo), v bytových domech je to většinou zemní plyn či nakupované teplo (pocházející z uhlí, zemního plynu a částečně z biomasy). Menší část spotřeby tvoří elektřina, využívaná také na svícení, provoz elektrospotřebičů a vaření (částečně se při vaření využívá i zemní plyn). Emisní náročnost elektřiny v Česku je dána současným energetickým mixem země (v roce 2024 zde bylo 42 % elektřiny vyrobeno z fosilních paliv, 41 % z jádra a 17 % z obnovitelných zdrojů[^ember-mix]).

Menší část energie se spotřebuje v průmyslu při výrobě stavebních materiálů, výstavbě a rekonstrukci nebo demolici. Odhadem jde o cca 3 % konečné spotřeby energie Česka a 11 % energie spotřebované v průmyslu.[^energie-prumysl]

{% include figure.html
    name="cs-dekarbonizace-budov-bariery-energie.svg"
    name-mobile="cs-dekarbonizace-budov-bariery-energie.svg"
    alt="Sankey graf, který zobrazuje, jak se jednotlivé zdroje energie v domácnostech podílí na činnostech, jako je vytápění, ohřev vody, svícení apod."
    source-text="Český statistický úřad, Energo 2021"
    source-url="https://csu.gov.cz/produkty/spotreba-paliv-a-energii-v-domacnostech-energo-2021"
%}

### Jaké emise jsou s budovami spojeny?

Také emise skleníkových plynů lze rozdělit podle toho, v jaké fázi životního cyklu budovy vznikají, a to na:

- **Provozní** – produkované hlavně při výrobě elektřiny a tepla (spalování paliv). Vznikají jednak v lokálních kotlích nebo kamnech přímo v budovách (9 % emisí Česka v roce 2022), jednak v elektrárnách a teplárnách při výrobě elektřiny nebo tepla, které je následně dodáváno do domácností a kanceláří (asi 20 % emisí Česka).[^prime-neprime]
- **Zabudované** – pocházejí z výroby stavebních materiálů[^procesni-spalovaci] – cementu, vápna nebo oceli (asi 7 % emisí Česka).[^zabudovane-emise] Kromě toho jde též o část emisí z výroby oceli nebo z přepravy a likvidace materiálů.

Celkem je tak s budovami v celém jejich životním cyklu spojeno přibližně **36 % emisí skleníkových plynů Česka.**

{% include figure.html
    name="cs-dekarbonizace-budov-bariery-emise.svg"
    name-mobile="cs-dekarbonizace-budov-bariery-emise.svg"
    class="narrow-figure"
    alt="Koláčový graf, který zobrazuje podíl emisí skleníkových připadající budovám. V Česku to v roce 2022 bylo asi 36 %."
    source-text="Evropská agentura pro životní prostředí, data za rok 2022 a vlastní zpracování (podíl emisí v průmyslu)"
    source-url="https://climate-energy.eea.europa.eu/topics/climate-change-mitigation/greenhouse-gas-emissions-inventory/data"
%}

## Bariéry pro renovaci budov a snižování emisí

Přestože je se sektorem budov spojena více než třetina emisí skleníkových plynů Česka, jeho dekarbonizace naráží na řadu překážek, které zpomalují tempo renovací a snižují jejich dostupnost:

- systémová omezení
- složitost administrativy a vysoké náklady 
- nedostatek pracovních kapacit a technologií
- sociální a psychologické faktory ovlivňující ochotu lidí renovovat

Hlavní překážky shrnuje text níže.[^vycet] Tyto bariéry jsou navíc často mezi sebou provázány – například neexistuje společná datová základna o stavu budov, což komplikuje vytváření dlouhodobé strategie renovace budov. Některé bariéry dekarbonizace jsou specifické pro rezidenční budovy (o kterých existuje více dat, zároveň je jich několikanásobně více než budov nerezidenčních), řada překážek je však obecnější a týká se většiny budov.[^sance-pro-budovy]

### Systémové bariéry

{% include lead-in-figure.html
    name="systemove-bariery.svg"
    class="leadin-figure-small"
    alt="Piktogram systémových bariér"
%}

**Chybějí data o stavu budov**

Bez znalosti stáří budov, jejich energetické náročnosti, stupně památkové ochrany a dalších parametrů je obtížné plánovat a efektivně cílit opatření na podporu renovací. Data buď:
- vůbec neexistují (např. o velikosti nerezidenčních budov a jejich spotřebě či o budovách, které jsou energeticky nejnáročnější) nebo
- jsou nepřístupná veřejnosti (např. data o průkazech energetické náročnosti budovy – PENB) nebo
- jsou roztříštěna napříč úřady a nejsou mezi sebou provázána, aby s nimi bylo možné efektivně pracovat

Analýza stavu budov v Česku aktuálně probíhá (v gesci ministerstva průmyslu a obchodu).

Jako příklad dobré praxe může sloužit dánský [registr budov a bydlení](https://bbr.dk/om-bbr) (*Bygnings- og Boligregistret*, BBR), který shromažďuje informace o rezidenčních i nerezidenčních budovách na jednom místě – typ, rok výstavby nebo rekonstrukce, velikost, způsob vytápění, materiály atd. Údaje přitom spravuje jak veřejný sektor, tak vlastníci nemovitostí, kteří jsou povinni nahlašovat jejich změny.

**Chybí aktuální strategie renovace budov**

Renovace vyžadují stabilní a předvídatelné podmínky jak pro domácnosti a firmy, tak pro stavební sektor. Fakt, že v Česku chybí aktuální strategie renovace budov, brzdí rozvoj nabídky i poptávky.[^strategie-mpo] Sektor budov je navíc například v porovnání s elektroenergetikou, koncentrovanou do několika provozů, velmi roztříštěný – v Česku je okolo tří milionů budov, z nichž každá je v jiném stavu a patří jinému majiteli. V takovém prostředí je mnohem složitější dělat změny a hůře se v něm také investičně plánuje.

Česko nyní čeká příprava vnitrostátního plánu renovace budov (řeší ministerstvo průmyslu a obchodu),[^epbd] který bude směřovat k uhlíkově neutrálnímu fondu budov do roku 2050.

**Opatření nejsou mezi sebou dostatečně provázána**

S tématem chybějící strategie úzce souvisí i potřeba promyšlenější [provázanosti opatření](/explainery/nastroje-stat) na podporu dekarbonizace budov. Tedy jak dobře zkombinovat regulace, ekonomické pobídky (dotace, úvěry, daňové úlevy) a poradenství, a jak více zapojit obce a developery. Jinými slovy: k renovaci nestačí zpřísnit normy nebo zpoplatnit emise, vyžaduje to i dotační a investiční podporu, a kromě toho také informační kampaně a nabídku poradenství, jež zvýší všeobecné povědomí o možnostech a výhodách renovace. Navíc musí být na trhu dostatek nízkoemisních technologií, jako jsou tepelná čerpadla nebo solární panely, a musí být dost kvalifikované pracovní síly, která umožní jejich instalaci. 

S kombinací více různých nástrojů již pracuje program [Nová zelená úsporám](https://novazelenausporam.cz/): kromě dotace je k dispozici i energetické poradenství, možnost zvýhodněného úvěru a zároveň probíhá aktivní spolupráce s realizačními firmami.

**Pronajímatelé nemovitostí mají často nízkou motivaci renovovat**

Mnohdy chybí motivace pronajímatele investovat do větších renovací – náklady na energie totiž nenesou oni, ale nájemci. Ti pak budou těžit i z potenciálních úspor. Pokud se vlastník pro renovaci přece jen rozhodne, může to vést ke zvyšování nájemného a sociálním rizikům s tím spojeným (například pro nájemce začne být bydlení už příliš drahé). Nájemní bydlení dnes v Česku tvoří přibližně [20 %](https://scitani.gov.cz/pravni-duvod-uzivani-bytu) bytového fondu (900 tisíc bytů). Chybějí přitom opatření, která by kombinovala podporu renovace se zajištěním dostupného bydlení. Inspirací může být Vídeň, kde je veřejná podpora renovací budov podmíněna zachováním dostupného nájmu po určitou dobu.[^viden]

**Není dostatek poradenských kapacit**

Chybějí poradenské kapacity pro obce, domácnosti i podniky, které by ukázaly, jak vypadá efektivní renovace vedoucí k největší úspoře – například by názorně vysvětlovaly, že často je prvním výhodným krokem zateplení (nejvíce energie v budovách se totiž spotřebuje na vytápění).

Česká vláda nicméně ve [Vnitrostátním plánu ČR v oblasti energetiky a klimatu](https://mpo.gov.cz/assets/cz/energetika/strategicke-a-koncepcni-dokumenty/2024/12/Vnitrostatni-plan-Ceske-republiky-v-oblasti-energetiky-a-klimatu-_prosinec-2024_.pdf) kromě navýšení poradenských kapacit[^poradci] počítá i se zřízením pilotních kontaktních míst, tzv. *one-stop-shopů*, které budou nabízet jak technické, tak administrativní a finanční poradenství.[^necp] Také ministerstvo životního prostředí v červenci 2025 vyhlásilo [výzvu](https://mzp.gov.cz/cz/pro-media-a-verejnost/aktuality/archiv-tiskovych-zprav/mzp-pripravuje-reformu-energetickeho) na podporu energetického poradenství, v níž podpoří školení pro energetické poradce i manažery, osvětové programy pro veřejnost nebo tvorbu energeticko-klimatických plánů.

### Finanční a administrativní bariéry

{% include lead-in-figure.html
    name="financni-bariery.svg"
    class="leadin-figure-small"
    alt="Piktogram finančních a administrativních bariér"
%}

**Vysoké investiční náklady**

Počáteční náklady na komplexní renovaci jsou vysoké a příjmy části domácností na ně nestačí. Pomoci mohou stávající dotační programy, např. [Nová zelená úsporám](https://novazelenausporam.cz/), nemusejí však pokrýt celou investici, takže jsou dostupné hlavně pro ty, kteří mají dostatečné vlastní úspory nebo si mohou dovolit úvěr. Navíc v minulosti byla dotační podpora vyplácena až zpětně. To se od roku 2025 změnilo a nyní je poskytována zálohově předem. Další prostředky by měly být v příštích letech k dispozici také v rámci [Sociálního klimatického fondu](https://mzp.gov.cz/cz/agenda/prehled-dotaci/socialni-klimaticky-fond#:~:text=Prost%C5%99edky%20Soci%C3%A1ln%C3%ADho%20klimatick%C3%A9ho%20fondu%20jsou,a%20sn%C3%AD%C5%BEen%C3%AD%20energetick%C3%A9%20n%C3%A1ro%C4%8Dnosti%20budov.). 

Vysoké investiční nároky se netýkají pouze domácností, ale i vlastníků nerezidenčních budov.

**Velká administrativní zátěž pro obce, podniky i domácnosti**

Komplikované a časově náročné procesy – od žádosti o dotaci až po stavební povolení – zpomalují realizaci renovací a mohou řadu domácností, firem i obcí od investic odradit.

Kromě zjednodušení procesů by pomohlo i již zmíněné navýšení poradenských kapacit.

### Technologické bariéry a chybějící kapacita pracovní síly

{% include lead-in-figure.html
    name="technologicke-bariery.svg"
    class="leadin-figure-small"
    alt="Piktogram technologických bariér"
%}

**Nedostatek kvalifikované pracovní síly**

Chybí dostatek kvalifikovaných pracovníků na zateplování, instalaci tepelných čerpadel, fotovoltaických systémů apod.[^necp-kapacity] Stávající kapacity nestačí pokrýt rostoucí poptávku, což zpomaluje tempo renovací, a tedy i pokles spotřeby energie a snižování emisí skleníkových plynů. Z druhé strany tím ale také vzniká prostor pro tvorbu nových pracovních míst a pro prohlubování expertizy lidí pracujících v sektoru stavebnictví a energetiky.[^cid]

**Dlouhé čekací lhůty na technologie**

S nedostatkem kapacit realizačních firem souvisí i riziko nedostupnosti technologií nebo materiálů. Situace, kdy poptávka po nízkoemisních technologiích výrazně převyšuje nabídku, vede k dlouhým čekacím lhůtám a potenciálně vyšší ceně. Například na tepelná čerpadla bylo během energetické krize nutné čekat i více než [šest měsíců](https://www.ekonews.cz/dnes-objednate-nejdrive-v-zime-dostanete-dodaci-lhuty-na-tepelna-cerpadla-jsou-minimalne-pul-roku/). Obava z dlouhého čekání může u domácností i podniků snižovat ochotu investovat.

**Zranitelnost dodavatelských řetězců**

Technologie a materiály pro dekarbonizaci budov (jako například fotovoltaické panely) se z velké části vyrábí mimo Evropu, většina v jedné zemi – v Číně. Pandemie koronaviru ukázala, jak křehké tyto globální dodavatelské řetězce jsou: narušení logistiky a výroby vedlo k nedostatku stavebních materiálů a prudkému [růstu cen](https://mpo.gov.cz/assets/cz/stavebnictvi-a-suroviny/informace-z-odvetvi/2023/1/Stavebnictvi-2022.pdf). Podobné riziko představuje rostoucí poptávka po kritických surovinách (např. lithiu nebo mědi), jejichž naleziště jsou jednak převážně mimo EU, jednak jsou do velké míry rovněž [kontrolována Čínou](https://www.amo.cz/wp-content/uploads/2023/06/FS_cina_06.pdf).

Z toho důvodu se EU v poslední době soustředí na posílení vlastní soběstačnosti. Usiluje o to navýšit výrobu nízkoemisních technologií na vlastním území prostřednictvím [aktu o průmyslu pro čisté nulové emise](https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/european-green-deal/green-deal-industrial-plan/net-zero-industry-act_cs) (*Net-Zero Industry Act*, NZIA), rozvíjet domácí těžbu, zpracování a recyklaci prostřednictvím [aktu o kritických surovinách](https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/european-green-deal/green-deal-industrial-plan/european-critical-raw-materials-act_cs) (*Critical Raw Materials Act*, CRMA) a zároveň navázat stabilní partnerství s dalšími zeměmi.

### Sociální a psychologické bariéry

{% include lead-in-figure.html
    name="socialni-bariery.svg"
    class="leadin-figure-small"
    alt="Piktogram sociálních a psychologických bariér"
%}

**Spokojenost se stavem nemovitosti**

Podle průzkumů je značná část domácností v Česku se stavem své nemovitosti spokojena.[^stem] Bez tlaku vysokých cen energií nebo jiného akutního problému chybí motivace ke změně.

**Prostorová a časová náročnost renovace**

Komplexní rekonstrukce vyžaduje dočasné uvolnění přestavovaných prostor. Ne každá domácnost má ovšem možnost přestěhovat se na čas jinam nebo žít během stavebních prací v provizorních podmínkách.

**Málo příkladů dobré praxe**

Pokud v okolí nedochází k renovacím, chybí přímá zkušenost a inspirace. Lidé se tak obtížněji rozhodují a zároveň vzniká prostor pro mýty (například "zateplený dům nedýchá").

**Společenské vzorce a averze ke změnám**

Do rozhodování domácností se kromě ekonomických faktorů promítají také společenské vzorce a zvyky – například zvyk financovat renovace z úspor (když nejsou úspory, renovace se odkládá). Své investice plánují domácnosti jiným způsobem než firmy nebo stát. Roli hraje i vztah ke změnám, a to jak v případě domácností, tak stavebních firem – může jít o neochotu něco měnit, ale i o obtížnost nahrazení dosavadních stavebních postupů novými.

**Nejistota budoucích cen**

Ochotu investovat může snižovat i nejistota ohledně dalšího vývoje cen zemního plynu a elektřiny (případně vývoje ceny emisní povolenky pro spalování paliv v budovách – [EU ETS 2](/explainery/emisni-povolenky-ets-2)). Výhodnost přechodu na tepelné čerpadlo nebo důležitost transformace teplárenství je pak v důsledku nejistoty vývoje cen méně zřejmá.

## Kdo se může na řešení bariér podílet

Odstranění bariér v dekarbonizaci budov – a tedy včasné snížení emisí v sektoru – vyžaduje **koordinovanou spolupráci státu, samospráv, firem i obyvatelstva**.
- Významnou roli (hlavně v nastavování prostředí) má vláda a příslušná ministerstva – především ministerstvo průmyslu a obchodu a ministerstvo životního prostředí (strategie, dotační programy, poradenství) a ministerstvo pro místní rozvoj (stavební legislativa a nájemní bydlení).
- Samosprávy mohou přímo iniciovat renovace veřejných budov, nabízet dostupné bydlení nebo poskytovat energetické poradenství a osvětu.
- Banky a finanční instituce mohou s překonáváním bariéry v podobě vysokých investičních nákladů pomáhat nabídkou zvýhodněných úvěrů.
- Z hlediska realizace úsporných opatření je důležitá i role soukromého sektoru, konkrétně stavebních a developerských firem nebo výrobců a dodavatelů technologií. Ti všichni mají vliv na dostupnost a kvalitu technologií, kapacitu pracovní síly i rychlost realizace.
- Svou roli mohou hrát také různé státní instituce, například Český statistický úřad může přispět k vytvoření společné datové základny.

{% include includes-local/figure-plain-download-preview.html
    link=page.infographics-url
    preview="infografika-nahled.png"
    alt="Náhled jednostránkového shrnutí bariér dekarbonizace budov v Česku"
    caption="Jednostránkové shrnutí bariér dekarbonizace budov v Česku ke stažení ve formátu PDF."
%}

<div class="download">
    <a href="{{ page.infographics-url }}" class="btn btn-primary" download>
        <i class="fas fa-fw fa-download"></i>
        Stáhnout PDF
    </a>
</div>

## Poznámky a zdroje

Děkujeme všem expertům a expertkám, jejichž cenné vhledy z praxe přispěly k finální podobě tohoto textu. 

[^eea-data]: Emise z provozu budov klesly v Česku mezi lety 1990 a 2022 o 37 %. Jde o součet přímých i nepřímých emisí z provozu rezidenčních i nerezidenčních budov dle [reportu](https://climate-energy.eea.europa.eu/topics/climate-change-mitigation/greenhouse-gas-emissions-inventory/data) Evropské agentury pro životní prostředí.

[^eurostat-balances]: Jde o průměr za roky 2018–2022 na základě dat Eurostatu (dataset [nrg_bal_c](https://doi.org/10.2908/NRG_BAL_C)).

[^ember-mix]: Viz [data](https://ember-energy.org/data/electricity-data-explorer) think tanku Ember.

[^energie-prumysl]: Jde o odhad vycházející z dat [Českého statistického úřadu](https://csu.gov.cz/produkty/spotreba-paliv-a-energie-2023) pro roky 2021 až 2023 a Eurostatu (dataset [nrg_bal_c](https://doi.org/10.2908/NRG_BAL_C)). Konkrétně je v odhadu zahrnuta výstavba a demolice budov (1 TWh), dále výroba nekovových minerálů (4 TWh), výroba železa a oceli (3 TWh) a dřevozpracující průmysl (1 TWh).

[^prime-neprime]: Podle místa vzniku se tyto emise také označují jako přímé a nepřímé. Zatímco přímé (tzv. *scope 1* emise) vznikají při spalování paliv v budovách, nepřímé (tzv. *scope 2* emise) jsou spojeny s výrobou energie v teplárnách a elektrárnách. Zatímco přímé provozní emise ze spalování paliv v rezidenčních i nerezidenčních budovách jsou uvedeny v každoroční [inventarizaci emisí skleníkových plynů](/infografiky/emise-cr), nepřímé provozní emise [dopočítává](https://climate-energy.eea.europa.eu/topics/climate-change-mitigation/greenhouse-gas-emissions-inventory/data) Evropská agentura pro životní prostředí (EEA) jako odpovídající podíl emisí z výroby elektřiny a tepla podle konečné spotřeby energie dle energetických statistik (jde o tzv. *end-user emissions*).

[^procesni-spalovaci]: Emise z výroby stavebních materiálů pocházejí jednak ze spalování paliv při zahřívání na vysoké teploty, jednak z chemických reakcí (např. při výrobě cementu).

[^zabudovane-emise]: Jde o podíl [průmyslových emisí](/infografiky/emise-cr-prumysl), které významně souvisejí s výrobou stavebních materiálů a výstavbou. Jejich podíl připadající budovám je pro účely tohoto textu zjednodušeně odhadnut na základě dat ke [konečné spotřebě energie](https://doi.org/10.2908/NRG_BAL_C). Konkrétně jsou to: 3 Mt CO<sub>2</sub>eq z výroby železa a oceli, 2 Mt z výroby nekovových minerálů, 1 Mt ze zpracovatelského průmyslu a konstrukce, 2 Mt z F-plynů. Dohromady jde o 8 Mt, což představuje 7 % celkových emisí skleníkových plynů Česka.

[^vycet]: Ambicí tohoto textu není poskytnout vyčerpávající výčet. Ve větším detailu se bariérám dekarbonizace budov věnuje například studie [Zero Carbon Roadmap – Cesta ke klimaticky neutrálním budovám v České republice](https://www.czgbc.org/cs/zero-carbon-roadmap) České rady pro šetrné budovy.

[^sance-pro-budovy]: Dle [odhadu](https://mpo.gov.cz/assets/cz/energetika/energeticka-ucinnost/strategicke-dokumenty/2020/6/_20_III_dlouhodoba_strategie_renovaci_20200520_schvalene.pdf) Šance pro budovy z roku 2016 je nerezidenčních budov asi 600 000. Jde přitom jak o velké kancelářské objekty, školy nebo nemocnice, tak o malé objekty, jako jsou rekreační chatky. Rezidenčních budov je oproti tomu dle [Sčítání lidu, domů a bytů z roku 2021](https://scitani.gov.cz/druh-domu) cca 2,3 milionu (z toho jsou necelé 2 miliony obydlené).

[^strategie-mpo]: [Poslední strategie](https://mpo.gov.cz/assets/cz/energetika/energeticka-ucinnost/strategicke-dokumenty/2020/6/_20_III_dlouhodoba_strategie_renovaci_20200520_schvalene.pdf) pro renovace budov vznikla na ministerstvu průmyslu a obchodu v roce 2020. Aktuálně probíhá příprava strategie nové.

[^epbd]: Úkol sestavit tento plán vychází z unijní směrnice o energetické náročnosti budov (*Energy Performance of Buildings Directive*, EPBD) z roku 2024. [Článek 3](https://eur-lex.europa.eu/legal-content/CS/TXT/HTML/?uri=OJ:L_202401275#art_3) upřesňuje, které informace by měl plán obsahovat – shrnutí současného stavu fondu budov, cíle a indikátory a politiky k jejich naplnění, investiční potřeby atd.

[^viden]: To je součástí tzv. programu jemné obnovy města (*Sanfte Stadterneuerung*). Více viz Hatz, Gerhard. *Can public subsidized urban renewal solve the gentrification issue? Dissecting the Viennese example.* Cities 115 (2021). https://doi.org/10.1016/j.cities.2021.103218

[^poradci]: Do seznamu stávajících poradců a poradkyň lze nahlédnout [zde](https://efekt.gov.cz/cz/ekis/strediska-EKIS).

[^necp]: Viz str. 158 [Vnitrostátního plánu ČR v oblasti energetiky a klimatu](https://mpo.gov.cz/assets/cz/energetika/strategicke-a-koncepcni-dokumenty/2024/12/Vnitrostatni-plan-Ceske-republiky-v-oblasti-energetiky-a-klimatu-_prosinec-2024_.pdf).

[^necp-kapacity]: Nedostatek pracovních kapacit zmiňuje i [Vnitrostátní plán ČR v oblasti energetiky a klimatu](https://mpo.gov.cz/assets/cz/energetika/strategicke-a-koncepcni-dokumenty/2024/12/Vnitrostatni-plan-Ceske-republiky-v-oblasti-energetiky-a-klimatu-_prosinec-2024_.pdf).

[^cid]: Potřebu zvýšit míru kvalifikace v oblasti nízkoemisních řešení obsahuje jako jednu z priorit i [Dohoda o čistém průmyslu](https://commission.europa.eu/topics/eu-competitiveness/clean-industrial-deal_cs), kterou Evropská komise představila v únoru roku 2025.

[^stem]: Viz např. [průzkum STEM](https://www.stem.cz/wp-content/uploads/2024/10/AAA_STEM_vytapime_a_zateplujeme_Vfin.pdf) (2024), slide 28. Při dotazování na investice do jednotlivých úsporných opatření (nová okna, zateplení stěn apod.) odpovídá více než polovina respondentů, že nejsou potřeba. V kontextu závazků a emisních cílů to ukazuje, že je potřeba posílit obecné povědomí o provázanosti emisní/energetické náročnosti a realizaci úsporných opatření. A poukazovat na provázanost s ekonomickými úsporami nebo vyšším komfortem.