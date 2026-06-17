---
layout:      explainer
title:       "Kapacitní trh v Česku: jak zajistit bezpečný odchod od uhlí"
slug:        "2026-kapacitni-trh-v-cesku"
published:   2026-06-15
authors:
  - name: "Paweł Wiejski"
  - id: "jan-krcal"
weight:      50
tags-scopes: [ cr ]
tags-topics: [ energetika ]
cover-source-author:      "Untitled Photo"
cover-source-text:        "Unsplash"
cover-source-license:     "Unsplash License"
cover-source-license-url: "https://unsplash.com/license"
cover-source-url: "https://unsplash.com/photos/white-and-blue-factory-under-white-clouds-during-daytime-g8FpKb4J38E"
perex: |
  Evropská energetika postupně přechází na obnovitelné zdroje. K tomu je ovšem potřeba zajistit dostatek elektráren pro spolehlivé dodávky elektřiny po celý rok. Čím dál více států se v tomto spoléhá na takzvané kapacitní trhy. Zavedení kapacitního trhu připravuje i Česko (mimo jiné kvůli bezpečnému odchodu od uhlí). Oč jde a co to přinese?

---

{% include tldr.html content="
- Evropská energetika potřebuje nové záložní elektrárny pro stabilizaci sítě s obnovitelnými zdroji i jako náhradu končících uhelných elektráren. Samotný trh s elektřinou ale nedává dostatečnou motivaci k jejich výstavbě.
- Tuto motivaci má poskytnout tzv. **kapacitní trh**, což je doplněk trhu s elektřinou, který Česko momentálně chystá zavést.
- Tento text vysvětluje principy fungování takového trhu a dává doporučení pro jeho zavedení a následné řízení v Česku.
" %}

## Jaký problém řeší kapacitní mechanismy?

Energetika v Evropě prochází rychlou proměnou – za posledních 25 let narostl podíl solárních a větrných zdrojů na výrobě elektřiny v EU z méně než 1 % na více než 30 %. Současně s tím klesá výroba elektřiny z uhlí a postupně dochází v mnoha zemích k uzavírání uhelných elektráren. Tuto proměnu táhne kupředu technologický vývoj stejně jako politické úsilí o dekarbonizaci a vyšší energetickou suverenitu Evropy.[^1]

{% include figure.html
    name="25-let-energetiky-eu.svg"
    class="narrow-figure"
    alt="Dva grafy znázorňující vývoj výroby elektřiny v EU v letech 2000–2025. Levý graf: podíl solárních a větrných zdrojů vzrostl z méně než 1 % na 30 %. Pravý graf: podíl uhelných elektráren klesl ze 30 % na 9 %."
    caption="Zatímco podíl solárních a větrných zdrojů na výrobě elektřiny v EU vzrostl za 25 let třicetinásobně, podíl uhlí klesl na třetinu."
    source-text="Our World in Data"
    source-url="https://github.com/owid/energy-data"
%}

Tato transformace vede napříč Evropou k postupnému úbytku řiditelných elektráren[^2] a ke změnám na trhu s elektřinou: když svítí slunce nebo hodně fouká vítr, je elektřina levná a je jí nadbytek. **Když je ale zataženo nebo bezvětří, jsou potřeba záložní zdroje** jako plynové elektrárny nebo bateriová úložiště, jejichž výroba elektřiny se dá dobře řídit a zvládnou tak chybějící elektřinu dodat.

**Nové záložní elektrárny se ale dnes na trhu těžko uživí.** Tyto elektrárny (stejně jako další druhy elektráren) prodávají elektřinu na trhu a tím generují provozní zisk, ze kterého postupně splácí svoje investiční náklady. Trh s elektřinou ovšem funguje tak, že takové záložní zdroje většinu času prodávají elektřinu za cenu blízko svých provozních nákladů (zjednodušeně za cenu paliva a emisních povolenek). Výraznějších provozních zisků pak dosahují jen v obdobích větší zátěže celé soustavy, kdy jsou pro nasycení poptávky potřeba ještě méně efektivní a provozně dražší elektrárny. Tyto výraznější zisky jsou i v současnosti velmi špatně předvídatelné, často nedostatečné, a navíc jsou zatížené další nejistotou do budoucna v důsledku rychlé proměny celé elektroenergetiky.[^3] Pouze na základě tržních signálů proto napříč Evropou nové záložní elektrárny nevznikají v potřebném množství ani dostatečně rychle. Naopak může docházet k uzavírání některých stávajících záložních elektráren. Jde tak o určité selhání trhu.

**Regulátoři a provozovatelé přenosových soustav napříč Evropou na toto selhání reagují.** Snaží se zajistit dostatek řiditelných zdrojů, tedy dostatečnou kapacitu soustavy, dalšími stimuly nad rámec trhu. A těmi jsou právě kapacitní mechanismy. V rámci nich získávají výrobci (vedle běžného obchodování na trhu s elektřinou) odměnu za poskytovanou kapacitu, tedy za to, že jsou v případě potřeby připraveni elektřinu vyrobit.

## Jak fungují kapacitní mechanismy?

Řada evropských zemí již nějakou formu kapacitního mechanismu zavedla. Obecně je lze rozdělit do dvou typů:

- **Strategická rezerva** (využívá Německo, Švédsko, Finsko) – cílený mechanismus, v němž provozovatel přenosové soustavy platí stávajícímu výrobci (typicky fosilní elektrárně) roční sjednaný poplatek za to, že zůstane k dispozici pro případ krizové situace. Tento poplatek elektrárně v principu hradí fixní náklady jako platy zaměstnanců nebo nutnou údržbu a přiměřený zisk. Výměnou za to elektrárna nesmí prodávat elektřinu na běžném trhu – funguje pouze na pokyn provozovatele přenosové soustavy. Proto se jí někdy říká „studená" rezerva. Bloky pro strategickou rezervu vybírá provozovatel soustavy, obvykle z řad elektráren, u kterých se už chystalo uzavření a typicky jsou dávno účetně odepsané.
- **Kapacitní trh** (využívá Velká Británie, Francie, Irsko, Itálie, Belgie, Polsko, nově má schváleno Španělsko, zvažuje Německo, Řecko a také Česko) – škála tržních mechanismů, kde výrobci soutěží v aukcích o možnost poskytovat soustavě potřebný instalovaný výkon (kapacitu) na dané období. Provozovatel soustavy ze všech nabídek v aukci vybere ty bloky, které za to požadují nejnižší roční kompenzaci, tzv. kapacitní platbu. Tyto vybrané bloky dále běžně působí na trhu s elektřinou. Výměnou za tuto kapacitní platbu však musí zajistit, že smluvní kapacitu budou na trhu poskytovat během celého období, kdy to mechanismus vyžaduje (což může být např. zimní půlka roku, kdy je vyšší spotřeba elektřiny).

Strategická rezerva může být sjednávána přímo – bez aukce, zatímco **kapacitní trh vždy stojí na aukcích**. Potřebná kapacita se tedy tržním principem zajišťuje za nejlevnější možnou cenu (pokud je na trhu dostatečná konkurence).

{% include figure.html
    name="mapa-kapacitni-mechanizmy.svg"
    alt="Mapa Evropy znázorňující typy kapacitních mechanismů: kapacitní trhy zavedly Velká Británie, Francie, Irsko, Itálie, Belgie, Polsko a Španělsko; strategické rezervy využívají Švédsko, Finsko a Německo; zavedení kapacitních trhů zvažuje Německo, Česko a Řecko."
    caption="Mapa evropských zemí podle typu zavedeného kapacitního mechanismu."
    source-text="Fakta o klimatu"
%}

**V praxi to funguje při zajišťování kapacity na daný cílový rok**, např. 2032, takto:

1. **Uzavření kontraktu, často roky předem:** Provozovatel přenosové soustavy vybere – přímo nebo aukcí – vhodné výrobce elektřiny (dodavatele kapacity) a uzavře s nimi kapacitní kontrakty. V případě kapacitního trhu se to typicky děje s víceletým předstihem, aby do té doby bylo možné stihnout postavit nové elektrárny.

2. **Funkční elektrárna:** Podepsaným kontraktem je každý z vybraných dodavatelů vázán kapacitu v cílovém roce skutečně poskytovat – tedy mít provozuschopnou elektrárnu. Provozovatel přenosové soustavy může podle smlouvy tuto provozuschopnost testovat a také udělovat vysoké pokuty, pokud dodavatel podmínky neplní.

3. **Kapacitní platba:** Provozovatel přenosové soustavy platí podle smlouvy dodavateli v cílovém roce fixní roční kapacitní platbu. Peníze na to získá od spotřebitelů elektřiny v podobě nových regulovaných poplatků. **Na kapacitní platby se tedy v konečném důsledku složí všichni zákazníci.**

**Mechanismy se ještě mohou lišit délkou kontraktu.** Ty se u strategických rezerv uzavírají typicky jen na 12 měsíců a v případě potřeby se tak každý rok obnovují. Jde o udržení stávajících elektráren, které nepotřebují žádnou dlouhodobou finanční jistotu. U kapacitních trhů můžou být kontrakty delší, např. na 10 let. To je pro dodavatele důležité pro snížení investičního rizika při výstavbě nových elektráren. V takovém případě se jednou smlouvou provozovatel zaváže po dobu 10 let od cílového roku dodavateli každoročně vyplácet kapacitní platbu a naopak dodavatel se zaváže celých 10 let elektrárnu provozovat a poskytovat tak soustavě potřebnou kapacitu.

**Celkově jde u kapacitních plateb o nemalé peníze.** Velikost nákladů na kapacitní mechanismy závisí na mnoha faktorech, zejména na jejich konkrétním nastavení a vnějších tržních podmínkách. Do konce roku 2024 byly v rámci různých kapacitních mechanismů po celé Evropě nasmlouvány služby v celkové hodnotě zhruba 87 miliard €.[^4] Stávající kapacitní poplatky tvoří napříč Evropou 1 % až 8 % účtu za elektřinu pro domácnosti, přičemž se očekává, že tento podíl může časem ještě růst.[^5] Proto je také důležité kapacitní mechanismy napříč Evropou dobře nastavovat, aby se náklady udržely co nejnižší.

**CISAF: sjednocování pravidel pro kapacitní mechanismy.** Kapacitní mechanismy napříč Evropou vznikaly postupně v průběhu posledních 10 let. Jsou mezi nimi výrazné odlišnosti v konkrétních pravidlech (např. polský mechanismus dlouhé roky podporoval stávající uhelné elektrárny, což dnes už není možné). Evropská komise se snaží pravidla pro nové mechanismy sjednotit, zjednodušit a zrychlit pomocí jednotného rámce pro jejich schvalování. Jde o rámec CISAF (_Clean Industry State Aid Framework_), který Komise představila v červnu 2025.

Protože Česko plánuje zavést **kapacitní trh**, zbývající text se zaměřuje na tento typ mechanismu.

## Proč Česko potřebuje kapacitní trh?

Navzdory relativně pomalému nástupu obnovitelných zdrojů čekají českou energetiku zásadní výzvy v oblasti spolehlivosti dodávek elektřiny. Ta by totiž bez dostatečných investic do nových záložních elektráren v dalších letech klesala. To by mohlo vést k občasné regulaci spotřeby v průmyslu, nebo dokonce lokálním či plošnějším blackoutům. **Kapacitní trh má tento problém vyřešit tím, že poskytne finanční motivaci pro výstavbu nových záložních elektráren.**[^6]

**Proč Česko potřebuje nové záložní elektrárny?** Velkou část řiditelného instalovaného výkonu dnes poskytují **uhelné elektrárny**. Ty ovšem v posledních letech bojují o rentabilitu, a to hlavně kvůli vysokým cenám emisních povolenek EU ETS a tlaku na zlevňování silové elektřiny.[^7] Skupina Sev.en už dokonce ohlásila uzavření svých uhelných elektráren na přelom roku 2026/2027. Elektřinu ale opět dočasně zdražila Hormuzská krize, čímž se uhelným elektrárnám vrátila ziskovost, a jejich uzavření se tak o nějaký čas odkládá.[^8] V každém případě se velmi pravděpodobně budou v Česku uhelné elektrárny postupně uzavírat. Aby se udržela spolehlivost české soustavy, je potřeba staré uhelné elektrárny z velké části nahradit elektrárnami novými.[^9]

**Nové záložní elektrárny se ovšem v Česku téměř nestaví.** Jak je popsáno výše, investoři čelí příliš velkému riziku spojenému s rychlou proměnou energetiky a návratnost takových projektů je velmi nejistá.

V Česku proto podle pravidelného modelování energetiky pro nadcházející roky vycházejí znepokojující výsledky v oblasti spolehlivosti dodávek. Konkrétně má Česko mezi zeměmi EU pro rok 2028 jednu z nejvyšších hodnot očekávané doby ztráty zatížení (loss of load expectation, **LOLE**) – 19,9 hodin za rok.[^10] Jde o počet hodin za rok, kdy soustava nemusí být schopna pokrýt poptávku po elektřině a provozovatel soustavy tak potřebuje regulovat spotřebu (v průmyslu). Tato hodnota zhruba 3× přesahuje pro Česko stanovený standard spolehlivosti – 6,7 hodiny ročně.[^11]

{% include figure.html
    name="lole-cesko.svg"
    alt="Infografika znázorňující očekávanou dobu ztráty zatížení (LOLE) v Česku pro rok 2028: 19,9 hodin za rok, což přibližně třikrát překračuje český standard spolehlivosti 6,7 hodin ročně."
    caption="Česká hodnota LOLE pro rok 2028 podle evropského hodnocení přiměřenosti zdrojů."
    source-text="ENTSO-E, ERAA 2025"
    source-url="https://www.entsoe.eu/outlooks/eraa/2025/"

%}

{% capture lole_box %}
**LOLE** (loss of load expectation, česky očekávaná doba ztráty zatížení) je pravděpodobnostní ukazatel, který vyjadřuje, kolik hodin v roce nebude dostupný instalovaný výkon stačit na pokrytí poptávky po elektřině. Jde o měřítko energetické bezpečnosti – vysoká hodnota LOLE znamená, že systém není spolehlivý a hrozí riziko výpadků elektřiny.

**Jak se LOLE počítá?** Hodnota se zjišťuje pomocí modelování energetických soustav. Jde o průměr délky nedodávky elektřiny (v hodinách za rok) napříč velkým množstvím simulovaných scénářů s různými proměnnými, jako jsou průběh počasí, koeficienty využití obnovitelných zdrojů, poptávka po elektřině, neplánované výpadky elektráren a další.
{% endcapture %}

{% include expander-figure.html
    name="lole-box"
    label="Co je přesně ukazatel LOLE?"
    class="contrast-figure"
    content=lole_box
%}

## Jak může kapacitní trh v Česku vypadat?

V Evropě nenajdete dva identické kapacitní trhy. Jejich podoba se velmi liší podle cílů daného státu, vnitřních podmínek na trhu, energetického mixu, stávající legislativy a mnoha dalších faktorů. Při návrhu kapacitního trhu je třeba vzít v úvahu několik parametrů.

### Kolik kapacity je potřeba?

To je naprosto klíčový parametr, náklady kapacitního trhu jsou zhruba úměrné poptávané kapacitě. Poptávaná kapacita proto musí vycházet z pečlivé analýzy podložené modelováním. Data a předpoklady těchto modelů by měly být otevřené, aby je mohli prozkoumat nezávislí odborníci i veřejnost. Tyto odhady v sobě vždy mají řadu nejistot:

- **Poptávka po elektřině (ve špičce) se těžko odhaduje.** Na jedné straně ji bude zvyšovat elektrifikace dopravy, vytápění a průmyslu. Na druhé straně bude poptávku tlačit dolů rozvoj energetické účinnosti, rozvoj flexibility spotřeby, rostoucí role decentralizované výroby z obnovitelných zdrojů, stejně jako demografický vývoj či možná proměna struktury průmyslu v Česku.
- **Budoucí výrobní mix je také nejistý.** Obzvláště není jasné, jaký bude přesně v Česku a v okolních zemích podíl obnovitelných zdrojů na výrobě a jak rychle se podaří rozvíjet evropské soustavy pro přenos přebytků z obnovitelné výroby mezi státy. Tyto nejisté parametry ovšem určují potřebu kapacit v jednotlivých zemích. Např. pro budoucnost s výrazným rozvojem větrné energetiky by Česko potřebovalo jinou kapacitu než pro budoucnost bez rozvoje větrné energetiky.[^12]

Chybná rozhodnutí mohou na jedné straně vést k nadbytečné kapacitě, a tím i ke zbytečně vysokým nákladům, na straně druhé pak k nedostatku kapacity a možným problémům se stabilitou sítě během roku.

Část této nejistoty lze vyřešit postupnými aukcemi. Například je možné vydražit 80 % očekávané potřebné kapacity pro rok 2032 šest let dopředu, tedy v roce 2026. Zbývající část potřebné kapacity se dá lépe odhadnout a dodražit o několik let později (blíže k cílovému roku 2032), kdy už v odhadech není tolik nejistoty.

Celkově ovšem správné vyvážení potřebné kapacity vyžaduje pravidelné revize a dobré propojení s energetickými strategiemi. Proto by zavedení kapacitního trhu mělo jít ruku v ruce s jasnou strategií ze strany vlády (např. v podobě dlouho odkládané aktualizace Státní energetické koncepce).

### Jaké typy elektráren mohou být zahrnuty?

Technologie, které se mohou kapacitních trhů účastnit, jsou omezeny emisními pravidly EU. Podle pravidel EU nesmí nově postavené elektrárny zapojené do kapacitních trhů překročit emise 550 g CO₂/kWh. V praxi to znamená, že **uhelné elektrárny se těchto trhů účastnit nemohou**.[^13]

**Nejde ovšem jen o elektrárny.** O kapacitní platby mohou soutěžit bateriová úložiště a další akumulační zařízení, a dokonce také flexibilita spotřeby, tedy schopnost (např. velkých průmyslových podniků) snížit při extrémních situacích svoji spotřebu elektřiny, a tím soustavě pomoct.

Zmíněné technologie – plynová elektrárna, bateriové úložiště a flexibilní továrna – se ale mezi sebou zásadně liší v tom, kolik hodin dokáží nepřetržitě poskytovat soustavě svoji kapacitu. Tyto rozdíly v charakteristikách technologií se v návrhu kapacitního trhu zohledňují pomocí tzv. **derating faktorů** (neboli faktorů snížení hodnoty).

{% capture derating_box %}
**Derating faktory** v kapacitním trhu umožňují rozlišovat mezi technologiemi v aukcích na základě toho, kolik kapacity jsou v průměru skutečně schopny poskytnout v obdobích nedostatku ve srovnání se svým nominálním výkonem. Například plynová elektrárna může mít v aukci derating faktor přes 90 %, zatímco bateriové úložiště bude mít pravděpodobně derating faktor mnohem nižší, v rozmezí 10 % až 60 % v závislosti na metodice a délce akumulace.

**Jak vstupují derating faktory do aukce?** V aukci se bere v potaz jen úměrná část nominálního výkonu podle derating faktoru: např. 60 MW bateriové úložiště s derating faktorem 30 % by se dražilo jako 18MW zařízení stejně jako 20MW plynová turbína s derating faktorem 90 %. Podle derating faktorů totiž tato dvě zařízení soustavě poskytují stejný užitek a provozovatel je tak za ně ochoten platit stejné kapacitní platby, přestože baterie má trojnásobný nominální výkon. Takové bateriové úložiště by tedy muselo být 3× levnější na jednotku nominálního výkonu než plynová turbína, aby nad ní v aukci zvítězilo.

Tyto faktory se stanovují na základě modelování energetiky, často však podléhají politickým tlakům. Například v Polsku byl derating faktor pro baterie v aukci na rok 2028 nastaven na absurdně vysokých 95 %, ale pro pozdější aukci na rok 2029 klesl na 12,33 % – aniž by byla kterákoli hodnota podložena veřejně dostupným modelem. Oproti tomu belgický kapacitní trh využívá ke stanovení faktorů pro všechny technologie konzistentní a veřejně dostupnou metodiku.
{% endcapture %}

{% include expander-figure.html
    name="derating-box"
    label="Derating faktory: jak se porovnávají různé technologie?"
    content=derating_box
    expanded=true
    class="contrast-figure"
%}

### Jak dlouhé jsou kapacitní kontrakty?

Dalším důležitým parametrem kapacitního trhu je délka kontraktů, tedy na kolik let se stát v aukci zaváže ke každoroční podpoře zařízení, která v aukci uspějí. Delší kontrakty dávají investorům více jistoty, což se může projevit nižší cenou v aukci. Pro daný stát naopak fixují konkrétní řešení (např. plynové elektrárny) na dlouhou dobu – i když se v mezičase může objevit levnější alternativa s nižšími provozními emisemi.

Z toho důvodu rámec CISAF omezuje maximální délku kontraktu pro fosilní elektrárny na 15 let a preferuje jednoleté kontrakty. Delší kontrakty jsou umožněny pro projekty vyžadující vysoké investiční náklady (které je těžké financovat bez jistoty víceletého kontraktu, a tudíž by na základě jednoletých kontraktů jen stěží vznikly).

### Jak se náklady rozloží mezi spotřebitele?

**Náklady na kapacitní platby lze mezi spotřebitele v Česku rozložit mnoha způsoby.** Rozdíly v sazbách mohou být mezi jednotlivými skupinami odběratelů – domácnosti, malé a střední podniky či velký průmysl – mohou být zatíženy různě, což je v jádru politické rozhodnutí.

**Rámec CISAF stanovuje důležitou podmínku: kapacitní poplatek musí být výrazně vyšší v obdobích odběrové špičky** (90 % poplatku musí být alokováno spotřebitelům v 1 % až 5 % hodin v roce s nejvyšší cenou, kdy je soustava pod největším tlakem). Tento princip rozdělení nákladů motivuje lidi a firmy spotřebovávat méně energie v době špiček.[^14] Z dlouhodobého pohledu pak tlačí na celkově menší potřebu kapacity, a tedy na snížení celkových nákladů kapacitních trhů.

## Jaké kroky jsou potřeba k zavedení kapacitního trhu?

Kapacitní trh vyhlašuje stát prostřednictvím legislativy a správních rozhodnutí. Podle práva EU se jedná o veřejnou podporu, která vyžaduje schválení Evropskou komisí, tzv. notifikaci.

Aby Česko získalo notifikaci k zavedení kapacitního trhu, musí projít v souladu s rámcem CISAF a podle nařízení o vnitřním trhu s elektřinou[^15] několika kroky. Česko již některé z úvodních kroků splnilo a kapacitní trh by mohlo zavést už v průběhu roku 2026.

{% include figure.html
    name="kapacitni-trh-kroky.svg"
    name-mobile="kapacitni-trh-kroky.svg"
    alt="Kroky potřebné k zavedení kapacitního trhu v Česku"
    caption="Přehled kroků, které musí Česko splnit pro zavedení kapacitního trhu a získání notifikace Evropské komise."
    source-text="Fakta o klimatu"
%}

## Jaké jsou výhody a problémy kapacitních trhů?

**Výhody:**

- Dobře navržený kapacitní trh dává státu nástroj, který doplňuje národní energetické plánování a **umožňuje zajistit energetickou bezpečnost** (předcházet nedostatku elektřiny nebo extrémně vysokým cenám).
- V praxi **dokáže zajistit financování nových projektů nezbytných pro stabilitu sítě**. Účastníkům trhu poskytuje předvídatelné investiční prostředí, což umožňuje efektivní plánování dlouhodobých investic do infrastruktury a elektráren.
- Může vést **k nákladově efektivnímu řešení prostřednictvím konkurenčních aukcí**.
{:.plus-list}

**Problémy:**

- **Kapacitní trhy mohou vést k nadbytečné výstavbě elektráren**, což zvyšuje náklady pro spotřebitele. Návrh těchto trhů mají často na starosti provozovatelé přenosových soustav, jejichž hlavním úkolem je udržet bezpečnost dodávek. Provozovatel se tak logicky bude více obávat toho, že zajistí příliš málo kapacity, než toho, že jí zajistí nadbytek. Tomu lze alespoň částečně čelit transparentností v modelování potřebných kapacit a zapojením odborné veřejnosti ve formě pravidelných konzultací.
- **Z kapacitních trhů se dnes podporují převážně elektrárny na zemní plyn** (kvůli jejich flexibilitě a spolehlivosti). V kombinaci s dlouhými kontrakty a se sklonem k naddimenzování kapacit to může vést k dlouhodobé závislosti na plynových elektrárnách (tzv. gas lock-in), vysoké závislosti na dovozu a v konečném důsledku k vysokým emisím skleníkových plynů. Tomu lze alespoň částečně čelit tím, že se do aukcí za spravedlivých podmínek umožní vstup bezemisních technologií a kapacitní trhy se budou postupně upravovat pro nové, čisté technologie (nové typy úložišť energie, elektrárny na vodík, plynové elektrárny s technologií zachytávání uhlíku, nové pokročilé designy jaderných elektráren, elektrárny spalující udržitelně pěstovanou biomasu atd.).
{:.minus-list}

Zároveň je ale nutné pamatovat na to, že hlavní nástroj pro snižování závislosti na plynu leží mimo samotný kapacitní trh. Je jím dostatečný rozvoj obnovitelných zdrojů elektřiny, hlavně pak větrné energetiky (v dlouhodobém horizontu doplněný jadernou energetikou). Bez rozvoje obnovitelných zdrojů bude česká elektroenergetika v průběhu 30. let na zemním plynu značně závislá.

{% capture alternatives_box %}
Jak je vysvětleno výše, trh s elektřinou neposkytuje dostatek pobídek pro investice do nových kapacit. V odborné literatuře je to označováno jako tzv. „problém chybějících peněz" (missing money problem). Kromě kapacitních trhů existují i jiná řešení, která nevyžadují tolik průběžného řízení ze strany státu a fungují ještě více tržně.

Jde hlavně o různé formy principu **scarcity pricing**<sup>*</sup> (tržního oceňování elektráren v období nedostatku). Existují dvě základní možnosti:

- **Lépe oceňovat v období nedostatku elektrárny na hlavním krátkodobém trhu s elektřinou.** To znamená na tomto trhu odstranit nebo zvýšit umělý cenový strop, který je dnes na úrovni 4000 €/MWh. Tím se zajistí, aby cena elektřiny plně odrážela situaci na trhu v reálném čase. V hodinách nedostatku to pak umožňuje typicky závěrným zdrojům generovat větší provozní zisky, díky kterým investoři dokáží splácet úvodní vysokou investici. Tento přístup využívá např. americký Texas nebo trh s elektřinou v jihovýchodní části Austrálie.
- **Lépe oceňovat rezervní kapacitu na podpůrných trzích**, například na krátkodobém trhu s podpůrnými službami a odchylkami, které slouží ke stabilizaci sítě v reálném čase. To probíhá nejčastěji administrativně, kdy se s narůstající zátěží v systému (při rostoucím nedostatku momentálně dostupných kapacit) matematickým vzorcem výrazně zvyšuje cena podpůrných služeb nebo odchylek. Tento princip doplňuje nárazové a obtížně předvídatelné zisky v období nedostatku (scarcity periods, jež trvají jednotky až desítky hodin ročně) nižšími, avšak lépe předvídatelnými a stabilnějšími zisky ve špičkách zatížení (ve stovkách hodin v roce). Tento přístup opět využívají v Texasu a Austrálii,<sup>†</sup> ale také například v Belgii nebo Velké Británii.

Dobře navržený scarcity pricing může být ekonomicky efektivnější a omezuje riziko nadbytečné výstavby kapacit. Ve vzácných situacích však může vést k neočekávaně vysokým cenám elektřiny na krátkodobém trhu,<sup>‡</sup> což je politicky a sociálně citlivé, a proto ho evropské země zavádějí jen velmi opatrně.

Scarcity pricing motivuje k investicím ve střednědobém až dlouhodobém horizontu. Pokud je však potřeba neváhat a vybudovat nové elektrárny rychle (což je případ českého odchodu od uhlí, ale také případ rychlé výstavby datacenter v mnoha zemích po světě), mohou být kapacitní trhy vhodnější volbou.

<sup>*</sup> Nějakou formu scarcity pricing prosazuje mezinárodní think-tank pro energetickou politiku Regulatory Assistance Project, např. viz [Power System Blueprint](https://blueprint.raponline.org/).
{: .longread-tiny.mb-0}

<sup>†</sup> Princip scarcity pricing na hlavním i podpůrném trhu lze efektivně kombinovat. V Texasu stejně jako v Austrálii se využívá společný algoritmus pro sesouhlasení obou trhů, kdy vysoké ceny na podpůrném trhu také tlačí vzhůru ceny na hlavním trhu a naopak.
{: .longread-tiny.mb-0}

<sup>‡</sup> K extrémně vysokým cenám došlo např. během energetické krize v Texasu v roce 2021, kterou způsobila bezprecedentní zimní bouře. Texaský trh s elektřinou je založený na principu scarcity pricing.
{: .longread-tiny}

{% endcapture %}

{% include expander-figure.html
    name="alternatives-box"
    label="Jak se těmto problémům vyhnout: alternativní řešení"
    content=alternatives_box
    class="contrast-figure"
%}

## Doporučení: jak co nejlépe uvést kapacitní trh do praxe?

Kapacitní trh může být užitečným nástrojem pro zajištění trvalého dostatku elektřiny v síti. Dokáže předejít drahým a nebezpečným výpadkům a umožní lepší integraci obnovitelných zdrojů do energetického systému. Může však také zvýšit ceny elektřiny pro spotřebitele, vést k nadměrné podpoře fosilních zdrojů a zpomalit transformaci směrem k nízkouhlíkové energetice. Aby se minimalizovala rizika a náklady a zároveň zachovaly přínosy, doporučujeme při návrhu a implementaci (na základě nejlepší evropské praxe) zohlednit řadu faktorů.

1. **Jasný směr a řízení.** Integrovat kapacitní trh do energetické strategie země.[^19] Stanovit pro něj jasné, měřitelné cíle a pravidelně vyhodnocovat, zda jich bylo dosaženo.
2. **Důraz na transparentnost.** Zpřístupnit předpoklady modelování a celý proces zavádění kapacitního trhu veřejné kontrole. Konzultovat postup s účastníky trhu i s odborníky. Transparentnost může zvýšit kvalitu celého trhu a zabránit nežádoucímu politickému vlivu silných zájmových skupin.
3. **Spravedlivý přístup pro všechny technologie.** Podložit stanovení derating faktorů argumenty a veřejně dostupnými výstupy z modelování. Do systému lze zapojit různé technologie prostřednictvím oddělených aukcí pro různá časová období – kratší časové rámce zvýhodní baterie, zatímco delší podpoří tepelné zdroje.[^20]
4. **Otevřenost přeshraniční spolupráci.** Vést otevřený dialog se sousedy a lépe sladit parametry sousedních kapacitních trhů, což může omezit vzájemné negativní vlivy těchto trhů a zvýšit jejich celkovou efektivitu.
5. **Snižování závislosti na plynu (gas lock-in).** Plynové elektrárny jsou v krátkodobém horizontu nezbytné, ale jejich nadměrná výstavba může dlouhodobě zpomalit dekarbonizaci. Při návrhu trhu je klíčové správně odhadnout potřebu kapacit a tyto odhady pravidelně revidovat. Dlouhodobé aukce s kapacitou vysoutěženou na vzdálenou budoucnost k závislosti na plynu přispívají – je proto výhodnější nemalou část kapacity kontrahovat v krátkodobých aukcích a odhady potřebné kapacity upravovat podle nových dat.
{:.circled-list}

## Poznámky a zdroje

### Zdroje

- [Rámec CISAF](https://competition-policy.ec.europa.eu/about/contribution-clean-just-and-competitive-transition/clean-industrial-deal-state-aid-framework-cisaf_en)
- [Nařízení (EU) 2019/943 o vnitřním trhu s elektřinou](https://eur-lex.europa.eu/legal-content/CS/ALL/?uri=CELEX%3A32019R0943)

### Poznámky

[^1]: Z technologických vlivů je to hlavně rozvoj a zlevňování obnovitelných zdrojů a akumulace, z politických vlivů systém EU ETS či podpora výstavby obnovitelných zdrojů, a v neposlední řadě také ekonomické faktory.
[^2]: Jde o zdroje, jejichž výkon lze dispečersky řídit. Elektřinu tak dokážou dodávat téměř kdykoliv, nezávisle na aktuálním počasí.
[^3]: Navíc jsou regulatorně zastropované, protože maximální cena elektřiny na evropském velkoobchodním trhu je omezena částkou 4000 €/MWh, což dále snižuje profitabilitu investic do záložních zdrojů. Pro plynové zdroje přináší další regulatorní nejistotu evropská taxonomie udržitelných investic, která po roce 2035 zapovídá spalování fosilního zemního plynu (bez zachytávání uhlíku).
[^4]: Aurora Energy Research (2025), [Capacity remuneration mechanisms in Europe](https://beyondfossilfuels.org/wp-content/uploads/2025/01/202501_BFF_CRM-Report_.pdf).
[^5]: Pro lepší představu: pro českou domácnost se spotřebou 3 MWh ročně by to mohlo znamenat 250 Kč až 1 800 Kč za rok. Vyšší hranice tohoto odhadu je srovnatelná s nedávno pozastaveným poplatkem za podporované zdroje energie (POZE).
[^6]: Protože Česko potřebuje podpořit výstavbu nových elektráren, kapacitní mechanismus ve formě strategické rezervy pro něj není vhodný.
[^7]: Tento tlak na zlevňování na společném evropském trhu působí hlavně zahraniční obnovitelné zdroje, ale přidávají se k němu i české solární elektrárny.
[^8]: Např. dle článku na Ekonomickém deníku: [Uhlí se vrací do hry. Tykač definitivně odkládá konec Počerad i Chvaletic](https://ekonomickydenik.cz/seven-uhelne-bloky-odstavime-pozdeji/).
[^9]: V posledních letech se staví nebo připravují k výstavbě projekty celé řady tepláren, které odcházejí od uhlí, nejčastěji směrem k zemnímu plynu. Jejich předpokládaný instalovaný výkon ve výrobě elektřiny ovšem zdaleka nestačí jako náhrada uhelných elektráren.
[^10]: Jde o výsledky analýzy [ERAA 2025](https://www.entsoe.eu/eraa/2025/) od ENTSO-E (Evropské sítě provozovatelů elektroenergetických přenosových soustav).
[^11]: Standard spolehlivosti je stanovený podle optimalizace společenských nákladů. Bere v potaz náklady na výstavbu nejlevnější nové elektrárny a porovnává je s náklady nedodávky elektřiny pro celou ekonomiku. Kvůli nedodávce menší než 6,7 hodiny se v Česku ekonomicky nevyplatí budovat elektrárnu, při delší nedodávce se to už ekonomicky vyplatí.
[^12]: Rozvoj větrné energetiky by nijak zásadně nesnížil celkový objem potřebné kapacity (protože během zimy nastávají delší období, kdy napříč střední Evropou málo fouká). Zato by ale proměnil strukturu potřebné kapacity: větší podíl na kapacitě by mohla tvořit levnější řešení (špičkovací elektrárny, baterie a další formy tzv. čisté flexibility).
[^13]: Pro stávající elektrárny, které nesplňují tyto emisní limity, platí ještě alternativní podmínka 350 kg CO₂ ročně na instalovaný kW výkonu, která výrazně omezuje celkové využití elektrárny během roku. České hnědouhelné elektrárny by se tak teoreticky mohly zapojit do strategické rezervy, pokud by byly využity cca jen ve 2–3 % hodin během roku. Viz dokument sítě regulátorů ACER (2019): [Examples of Calculation CO2 emission limits in Capacity Mechanisms](https://www.acer.europa.eu/sites/default/files/documents/Official_documents/Acts_of_the_Agency/Opinions/Documents/ACERs%20Opinion%2022-2019%20examples%20of%20calculation.pdf). V praxi tento limit jejich využití znemožňuje, protože pro tak nízké využití by provozování hnědouhelného lomu bylo nepřijatelně drahé.
[^14]: Takové zpoplatnění je založeno na chytrém měření spotřeby, v jehož zavádění Česko zaostává za většinou evropských zemí. Je proto otevřenou otázkou, jak tento princip může Česko nejlépe splnit (v reakci na český plán reformy trhu s elektřinou Evropská komise doporučuje rozšířit nasazování chytrého měření).
[^15]: Nařízení (EU) 2019/943.
[^19]: Jako strategie dlouhodobého rozvoje energetiky pro potřeby kapacitního trhu těžko může v roce 2026 sloužit Státní energetická koncepce z roku 2015. Jako referenční strategický dokument může sloužit poslední verze Vnitrostátního plánu České republiky v oblasti energetiky a klimatu (2024), ovšem i tento plán není příliš konkrétní z hlediska zajištění hladkého odchodu od uhlí. Větší technické detaily tak mohou poskytnout např. studie MAF od společnosti ČEPS.
[^20]: Podle CISAF musí být kapacitní trh otevřený i zahraničním účastníkům. Některé země však tuto účast skrytě omezují, což zvyšuje ceny.
