---
layout:      explainer
title:       "Jak se na trhu stanovuje cena elektřiny?"
slug:        "cena-elektriny-na-trhu"
published:   2022-03-02
authors:
  - id: "jakub-zamouril"
  - id: "jan-krcal"
  - id: "kristi-psorn-zakopcanova"
    minor-role: "vizualizace"
  - name: "Prokop Čech"
    affiliation: Nano Energies
    minor-role: "konzultace"
weight:      50
tags-scopes: [ eu, cr ]
tags-topics: [ energetika ]
cover-source-author: "Alexandru Boicu"
cover-source-license: "Unsplash licence"
cover-source-license-url: "https://unsplash.com/license"
cover-source-text: "Unsplash"
cover-source-url: "https://unsplash.com/photos/h0z0ptvGVR8"
perex:       "Cena elektřiny na velkoobchodním trhu je výrazně proměnlivá. Podle jakého mechanismu se stanovuje? A proč je tak citlivá na změnu v ceně jediné položky – zemního plynu?"

---

Vysvětlení tvorby ceny elektřiny začneme dvěma důležitými koncepty: jak se v síti zajišťuje vyrovnávání výroby elektřiny s její spotřebou a podle čeho si jednotlivé elektrárny stanovují minimální cenu, za kterou jsou ochotny elektřinu na trhu prodávat.

## Jak se v elektrické síti vyrovnává výroba a spotřeba?
Základní princip elektrické sítě spočívá v tom, že výroba elektřiny musí být vždy (zhruba) stejná jako její spotřeba. Jestliže spotřeba výrazně přesáhne výrobu, dochází k většímu namáhání generátorů elektřiny. Pokud naopak výroba výrazně přesáhne spotřebu, může docházet k poškozování elektrické rozvodné sítě. Obojí pak v extrémním případě může vést k tzv. _blackoutu_, tedy k přerušení dodávky elektřiny. **Výrobu a spotřebu je proto nutné neustále balancovat v reálném čase.**

Spotřeba elektřiny se v průběhu dne liší – přes den je zpravidla vyšší než v noci. V zimě bývá poptávka po elektřině vyšší z důvodu vytápění (nicméně kvůli oteplování klimatu a rostoucí potřebě využívat klimatizace může v dalších dekádách letní spotřeba převýšit zimní).

{% include figure.html
    name="rocni-maximum-spotreby-des.png"
    alt="Průběh hrubé spotřeby ve dnech ročního maxima"
    source-text="ERÚ"
    source-url="https://www.eru.cz/documents/10540/6616306/Rocni_zprava_provoz_ES_2020.pdf/edc0cb03-700a-43a7-8c08-a1ccb3f2d173"
%}

Spotřebu elektřiny lze do určité míry dopředu odhadovat, a je proto možné předem plánovat i to, kolik elektřiny bude v každém okamžiku potřeba vyrobit. Toto plánování, tedy propojování nabídky elektráren na výrobu elektřiny s předpokládanou poptávkou dodavatelů elektřiny, probíhá na **energetické burze**, jak dopodrobna popíšeme dále.

Protože však spotřebu elektřiny nelze nikdy odhadnout zcela přesně, v síti se vždy budou vyskytovat malé odchylky, které je potřeba v reálném čase vyrovnávat. Tuto regulaci provádí provozovatel přenosové soustavy, kterým je v České republice společnost ČEPS, a. s. Její řídicí středisko sleduje v reálném čase spotřebu elektřiny v ČR a zajišťuje vyrovnávání výroby se spotřebou. Zjednodušeně řečeno: ČEPS dává pokyny ke zvýšení nebo snížení výkonu vhodných nasmlouvaných elektráren (typicky uhelných nebo plynových). Vyrovnávání výroby a spotřeby je [blíže popsáno](#ceps) v dodatcích na konci textu.

Na stránkách ČEPS můžete živě sledovat data o [výrobě elektřiny](https://www.ceps.cz/cs/data#Generation) a [zatížení sítě](https://www.ceps.cz/cs/data#Load) (tedy spotřebě) v ČR.

## Podle čeho se vybírá, které elektrárny poběží?
Spotřeba elektřiny v ČR se v závislosti na dni a hodině pohybuje mezi 4,5 GW a 11,5 GW. Celkový instalovaný výkon všech elektráren (včetně tepláren) v ČR je ale [zhruba 21,3 GW](https://www.eru.cz/documents/10540/6616306/Rocni_zprava_provoz_ES_2020.pdf/edc0cb03-700a-43a7-8c08-a1ccb3f2d173). Protože export do zahraničí má svá kapacitní omezení, mohou v určitém okamžiku běžet vždy jen některé elektrárny, zatímco ostatní jsou ponechány vypnuté.

{% include figure.html
    name="vyroba-spotreba-des.svg"
    name-mobile="vyroba-spotreba-des.svg"
    alt="Kolik můžeme vyrobit a kolik zvládneme spotřebovat"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Pro zapínání a vypínání elektráren jsou zásadní tyto parametry: jejich **maximální možná výroba** (_instalovaný výkon_), **rychlost, s jakou je možné je zapnout** (_doba náběhu_), např. k pokrytí denní špičky spotřeby, a také **náklady na výrobu elektřiny**. Elektrárny v ČR lze zjednodušeně rozdělit do následujících hlavních kategorií:[^precerpavacky]

{% include figure.html
    name="zdroje-elektriny-des.svg"
    name-mobile="zdroje-elektriny-des.svg"
    alt="Hlavní typy zdrojů elektřiny v ČR"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Které elektrárny v daný den a hodinu poběží, o tom se **rozhoduje na burze s elektřinou** – poběží ty, kterým se na daný den a hodinu podaří svou elektřinu na trhu prodat (elektrárny samozřejmě musí při prodeji elektřiny respektovat svou schopnost elektřinu v daný den a hodinu skutečně vyrobit, tedy brát v potaz i svou dobu náběhu).

Jako první se k uspokojení poptávky využívají ty zdroje, které produkují elektřinu nejlevněji (tzn. podávají nejnižší cenové nabídky). Když je poptávka vyšší, než kolik mohou tyto levné zdroje pokrýt, využívají se dražší a dražší zdroje – dokud není poptávka uspokojena. Naopak při snižování poptávky po elektřině se nejdražší zdroje přestávají využívat jako první. Tomuto seřazení zdrojů podle ceny se v angličtině říká _merit order_.

{% include figure.html
    name="merit-order-des.svg"
    name-mobile="merit-order-des.svg"
    alt="Ilustrace seřazení zdrojů podle ceny (tzv. merit order)"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Jak ilustruje graf výše, v danou chvíli obvykle není k dispozici veškerý instalovaný výkon. Počasí omezuje výkon solárních a větrných elektráren. Uhelné a plynové elektrárny často rezervují část svého výkonu na vyrovnávání výroby a spotřeby (dle pokynů společnosti ČEPS), a tento výkon proto nemohou nabízet na burze. Výkon jaderných elektráren zase mohou omezit plánované odstávky.

Upozorňujeme, že tento ilustrativní graf _merit orderu_ je velmi zjednodušený. Nabídkové ceny jednotlivých elektráren nejsou veřejně k dispozici, každá elektrárna v dané kategorii má v praxi trochu jinou efektivitu, a tedy trochu jiné náklady. Skutečná křivka _merit orderu_ tak bude tvořena spoustou mírně odlišných cenových úrovní místo těch několika málo, jež ukazujeme zde.


## Jak každá elektrárna stanovuje svou minimální cenu, za kterou bude elektřinu dodávat?
Obecně vzato mají elektrárny dva druhy nákladů – fixní a variabilní. **Fixní náklady** jsou výdaje, které musí majitel elektrárny platit bez ohledu na to, jestli elektrárna běží, nebo stojí. Jsou to například mzdy zaměstnancům, náklady na údržbu či rozpočítané náklady na stavbu elektrárny. **Variabilní náklady** jsou výdaje, které musí majitel zaplatit za každou jednotku vyrobené elektřiny. Sem patří zejména cena paliva, a případně i cena emisní povolenky, pokud elektrárna při výrobě elektřiny spaluje fosilní paliva, a tedy vypouští oxid uhličitý.

{% include preview-box.html
    slug="emisni-povolenky-ets"
%}

Každý majitel elektrárny chce vyrábět elektřinu vždy, když se mu to vyplatí, tedy když cena prodané jednotky elektřiny přesáhne její výrobní náklady. Elektrárny tak nabízejí elektřinu za částku, které se rovná jejich variabilním nákladům – za nižší částku nejsou ochotny elektřinu vyrábět. Za vyrobenou elektřinu pak elektrárny zpravidla dostanou vyšší částku, než jaká byla jejich nabídková cena – dostanou peníze podle ceny elektřiny na trhu.

## Jak se stanovuje cena elektřiny na trhu?
V každém okamžiku se porovnává poptávka po elektřině od zákazníků s minimálními cenami od jednotlivých elektráren. V případě České republiky se to děje na energetické burze PXE v Praze. Elektřinu vždy vyrábějí ty nejlevnější elektrárny, které jsou dohromady schopny uspokojit poptávku. **Cena elektřiny na trhu je pak ta, za kterou elektřinu vyrábí ten poslední (nejdražší) zdroj, který je ještě potřeba k uspokojení poptávky.** Jak se cena elektřiny mění při rostoucí poptávce, ukazuje následující animace.

{% include figure.html
    name="merit-order-animace.gif"
    name-mobile="merit-order-animace.gif"
    alt="Merit order (animovaný)"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

**Výslednou cenu elektřiny obdrží všechny právě vyrábějící elektrárny – i ty, které měly nižší nabídkovou částku.** Tím trh motivuje elektrárny nabízet elektřinu za nejnižší možné ceny (kdyby nabídly vyšší, posunou se v _merit order_ a jejich služby nemusí být vůbec využity), zároveň elektrárny většinou dostanou vyšší částku, ze které pak mohou generovat provozní zisk. Celkově to tedy znamená, že čím vyšší je poptávka po elektřině, tím více se musí zapojovat dražší a dražší zdroje, což navyšuje cenu elektřiny pro celý trh.

Praktickou ukázku toho, jak vypadá [graf poptávky a nabídky elektřiny](https://www.ote-cr.cz/cs/kratkodobe-trhy/elektrina/krivky-sesouhlaseni), můžete nalézt například na stránkách českého operátora trhu s elektřinou.

## Z čeho pokryje elektrárna své fixní náklady?
Když elektrárna vyrábí, generuje provozní zisk, protože cena elektřiny na trhu je většinou o něco vyšší než nabídková cena. Fixní náklady pak elektrárna pokrývá z tohoto provozního zisku. Protože však výši jejích příjmů z jednotky vyrobené elektřiny určuje trh, závisí provozní zisk elektrárny na průměrné ceně elektřiny na trhu.

Pokud budou tyto ceny příliš nízké, některé elektrárny nezvládnou pokrýt své fixní náklady a budou uzavřeny. Tím se ovšem sníží nabídka kapacit pro výrobu elektřiny a zvýší se průměrná cena elektřiny. Je-li průměrná cena elektřiny naopak vysoká, přiláká to investice do nových, levnějších elektráren, které pak rozšířením nabídky pro výrobu levnější elektřiny způsobí snížení průměrné ceny elektřiny. Takto se trh s elektřinou sám reguluje.

## Které zdroje elektřiny jsou nejlevnější a které nejdražší?

{% include figure.html
    name="naklady-des.svg"
    name-mobile="naklady-des.svg"
    alt="Struktura nákladů podle typu elektrárny"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Nejlevnější elektřinu v současnosti produkují obnovitelné zdroje. Ty nepotřebují žádné palivo a neplatí za emisní povolenky, protože nevypouštějí oxid uhličitý. Jejich variabilní náklady jsou tak téměř nulové. Tyto zdroje vyrábějí elektřinu vždy, kdy je to dle aktuálních podmínek možné.

{% include preview-box.html
    title="Vývoj cen elektřiny podle zdrojů"
    text="Jedním ze způsobů, jak vyjádřit fixní i variabilní náklady jedním číslem, jsou tzv. _sdružené náklady na výrobu elektřiny_. Tato grafika se dívá na vývoj těchto nákladů v čase."
    slug="cena-energie"
%}

Druhým nejlevnějším zdrojem jsou (již postavené) jaderné elektrárny, protože mají velmi nízké variabilní náklady. Pokud však připočteme fixní náklady, vycházejí jaderné zdroje poměrně draze, což je jeden z důvodů, proč se v posledních desetiletích v Evropě staví velmi málo nových jaderných elektráren. Na trhu mají jaderné elektrárny zvláštní postavení, neboť je obtížné regulovat jejich výkon. Pokud jsou v daný moment poptávku schopny pokrýt jen obnovitelné a jaderné zdroje, mají přednost jaderné (protože svoji elektřinu na daný moment prodaly už dávno na _futures_ trhu[^flexibilita-jadra]).

V době, kdy výroba z obnovitelných zdrojů a jaderných elektráren k pokrytí celé poptávky po elektřině nestačí, přicházejí na řadu mnohem dražší zdroje, u kterých je možné vyrábět elektřinu dle potřeby (jsou regulovatelné). Mezi ně patří například elektrárny na uhlí, zemní plyn či biomasu. Pořadí jejich využití opět určí to, za jak nízkou cenu jsou tyto elektrárny schopny elektřinu vyrobit. To závisí na cenách paliva pro tyto elektrárny a na jejich emisní náročnosti – čím víc oxidu uhličitého na jednotku vyrobené elektřiny elektrárna vypustí, tím víc musí zaplatit na emisních povolenkách a tím je jednotková cena vyrobené elektřiny dražší. Pomocí tohoto mechanismu motivují emisní povolenky ke snižování emisní náročnosti celé soustavy[^povolenky-uhli].

{% include preview-box.html
    title="Růst cen elektřiny na podzim 2021"
    text="Jak si vysvětlit dramatický nárůst ceny elektřiny na podzim roku 2021? Poslechněte si díl našeho podcastu."
    slug="21-rust-cen-elektriny"
%}

Mezi cenou nejlevnějších a nejdražších zdrojů jsou obrovské rozdíly. **Během jednoho dne tak může cena elektřiny oscilovat mezi nulou a několika stovkami eur**, podle momentální spotřeby a podle výroby z obnovitelných zdrojů. Instalovaný výkon obnovitelných zdrojů bude v Evropě nadále růst. Můžeme tedy čekat **častější hodiny s velmi nízkou cenou elektřiny**, a tedy i **méně hodin s velmi vysokými cenami elektřiny**. Tímto způsobem budeme postupně snižovat závislost na fosilních zdrojích a také emise skleníkových plynů v energetice. Velkých výkyvů ceny elektřiny na burze se ale jen tak nezbavíme.

## Dodatky

### Jak konkrétně ČEPS zajišťuje rovnováhu mezi výrobou a spotřebou v každém okamžiku? {#ceps}
Společnost ČEPS pro zajištění výkonové rovnováhy využívá nasmlouvaných dodavatelů podpůrných služeb, v tomto případě konkrétně tzv. _služeb výkonové rovnováhy_. Dodavateli služeb výkonové rovnováhy jsou dnes v Česku typicky velké elektrárny a teplárny, které mají **flexibilní výrobu**. Jde tedy hlavně o [vodní, přečerpávací, uhelné nebo plynové zdroje](https://www.ceps.cz/cs/statistiky-svr), které mohou rychle začít vyrábět elektřinu v případě jejího nedostatku nebo s výrobou rychle přestat v případě přebytku. Kromě běžných elektráren jsou na pokrytí špiček poptávky po elektřině připraveny ještě další elektrárny v záloze, zpravidla plynové. Protože poptávka dosahuje špiček pouze malou část roku, jsou tyto elektrárny po většinu roku nevyužity a na běžném trhu by nemohly pokrýt své fixní náklady. Provozovatel přenosové soustavy tedy za poskytování podpůrných služeb platí kromě variabilních plateb za objem využitých služeb také fixní měsíční platby (za instalovaný výkon), kterými mohou elektrárny pokrývat své fixní náklady.

Od začátku roku 2021 platí volnější [pravidla](https://oenergetice.cz/prenos-elektriny/ceps-upravila-kodex-rizeni-soustavy-se-budou-moci-zapojit-nove-subjekty), podle nichž bude v budoucnu možné otevřít trh s těmito službami pro více obchodních modelů: např. pro bateriová úložiště nebo pro **flexibilitu ve spotřebě**. Tu mohou nabízet třeba velké chlazené sklady, kde příliš nezáleží na rozdílu několika stupňů Celsia. Při nedostatku elektřiny mohou o něco odložit chlazení nebo naopak při přebytku elektřiny sklady zchladit více, a tím síť stabilizovat. Firmy jsou motivovány poskytovat podpůrné služby jednak fixními kapacitními platbami, jednak poplatky za každé skutečné využití těchto služeb.

### Kdy na burze probíhá obchod s elektřinou na daný den a danou hodinu?

Když situaci trochu zjednodušíme, dá se říct, že elektřina se obchoduje ve dvou časových horizontech. Jednak **krátkodobě** na tzv. _spotovém trhu_, kde se obchoduje hlavně elektřina na příští den (_day-ahead_) a je možné tu obchodovat i elektřinu na právě probíhající den (_intra-day_). V tomto horizontu se elektřina obchoduje na každou hodinu daného dne zvlášť.

Dále se obchoduje **dlouhodobě** na tzv. _futures trhu_. Tím si většina dodavatelů elektřiny zajistí alespoň část odhadované spotřeby svých zákazníků. Tento trh funguje stejným způsobem jako trh v reálném čase, ale pracuje s odhadovanými budoucími náklady na výrobu elektřiny jednotlivých elektráren. V tomto horizontu se obchoduje hlavně fixní odběr (tzv. _base load_) na zvolený den, měsíc, kvartál nebo kalendářní rok. Cena elektřiny na tomto trhu většinou zhruba odpovídá výsledné průměrné ceně na spotovém trhu za dané období (přesněji řečeno bývá o něco dražší, protože je v ní započítáno riziko). V případě neočekávaného vývoje se ovšem výsledné spotové ceny můžou výrazně odchýlit od předchozích cen na dlouhodobém trhu. Například můžou být výrazně vyšší, jako v případě probíhající plynové krize okolo války na Ukrajině. Nákupy na dlouhodobém trhu tedy chrání dodavatele před náhlým kolísáním ceny elektřiny. Díky nákupům dopředu mohou dodavatelé poskytovat svým zákazníkům fixovanou cenu elektřiny na několik let dopředu.

### Proč je cena elektřiny na českém trhu tolik závislá na ceně elektřiny v Německu?
Obchodníci na burze s elektřinou mají možnost nakoupit elektřinu na burze v Německu a prodat ji v Česku (a naopak). Přitom si ovšem musí nakoupit potřebnou kapacitu na přeshraničních elektrických vedeních od operátora přenosové sítě. Protože jsou však Německo a Česko relativně dobře propojené, většinu času se daří elektřinu mezi trhy přeprodávat a tím synchronizovat její cenu (tomu se říká _arbitráž_). Některé země jsou přitom tzv. _implicitně propojené_, což znamená, že mají mezi sebou dostatek elektrických spojení a obchodníci si ani nemusí kvůli přeshraničním obchodům nakupovat kapacity na přeshraničních linkách. Takto je ČR propojena se Slovenskem, Maďarskem a Rumunskem. Stejně dobře jsou mezi sebou propojeny také země západní Evropy. To znamená, že v praxi cenu elektřiny v Česku určuje mnohem "větší" _merit order_, do kterého vstupuje na jedné straně také spousta elektráren z Německa a dalších okolních zemí a na druhé straně poptávka dodavatelů elektřiny z těchto zemí.

Dlouhodobým cílem EU je pak propojení celé Evropy do jednoho velkého, implicitně propojeného trhu. To umožní snazší přenos elektřiny mezi zeměmi – pokud tedy například bude větrno v Severním moři, tamní větrné elektrárny budou moci napájet elektřinou velkou část Evropy. K tomu ovšem bude mimo jiné potřeba posílit evropskou přenosovou soustavu.

### Musí elektrárny prodávat svou elektřinu na burze?
Nemusí, elektrárny se mohou dohodnout i s jinými subjekty (firmami či institucemi) na přímém odběru elektřiny formou dlouhodobé bilaterální dohody či _power purchase agreement (PPA)_. Tato elektřina pak vůbec neprochází přes burzu a cena prodané elektřiny se řídí tím, co si dané subjekty mezi sebou dohodly. Ceny takto prodané elektřiny ale v principu kopírují ceny na _futures trhu_. Při výrazně nižších cenách PPA by prodejce raději prodával na burze, při výrazně vyšších cenách PPA by na burze raději nakoupil nakupující. Výhodou PPA pro obě strany je flexibilita podmínek, jež si subjekty mohou mezi sebou domluvit.

### Jak funguje podpora obnovitelných zdrojů elektřiny?
Solární a větrné zdroje mají velmi nízké provozní náklady a relativně vysoké investiční náklady. To je kombinace, která přináší velké riziko pro investora, že se jeho investiční náklady z ceny na burze nesplatí. Státy EU proto nabízejí různé formy podpory, aby soukromé investory k výstavbě těchto zdrojů motivovaly. Nejčastější formou je tzv. _feed in tariff_, u kterého stát nabízí dlouhodobou garanci minimální výkupní ceny. Výrobci sice nadále obchodují na burze, stát jim ale vyrovná příjmy, pokud je cena na burze nižší než ta garantovaná. Tento mechanismus se uplatňuje i na různé další obnovitelné zdroje elektřiny, od bioplynových stanic až po malé vodní elektrárny. Část nákladů na tuto podporu v Česku platí přímo zákazníci v rámci regulované složky ceny elektřiny, část nákladů pokrývá stát z výnosů prodeje emisních povolenek. S postupným snižováním investičních nákladů také může klesat minimální výkupní cena, v Evropě se v dnešní době nejčastěji určuje formou aukcí.

Kombinace vysokých investičních nákladů a nízkých provozních nákladů se ovšem týká i nových jaderných zdrojů, proto akciová společnost ČEZ při diskuzích o výstavbě nových reaktorů opakovaně požaduje od státu nějakou podporu nebo garanci výkupní ceny.

## Zdroje
* Asociace energetických manažerů. ["Úvod do liberalizované energetiky: Trh s elektřinou"](https://www.mpo-efekt.cz/upload/7799f3fd595eeee1fa66875530f33e8a/kniha-trh-s-elektrinou.pdf)
* OEE Project. ["Open Electricity Economics Handbook"](http://open-electricity-economics.org/index.html)
* ERÚ. ["Roční zpráva o provozu elektrizační soustavy České republiky za rok 2020"](https://www.eru.cz/documents/10540/6616306/Rocni_zprava_provoz_ES_2020.pdf/edc0cb03-700a-43a7-8c08-a1ccb3f2d173)

## Poznámky

[^precerpavacky]: Pro zjednodušení jsou v tabulce vynechány přečerpávací elektrárny (asi 1,2 GW), které jenom umožňují elektřinu v omezené míře ukládat.
[^flexibilita-jadra]: Futures trh více rozebíráme v [dodatcích](#kdy-na-burze-probíhá-obchod-s-elektřinou-na-daný-den-a-danou-hodinu). Pokud je na trhu v daný moment nadbytek elektřiny z obnovitelných a jaderných zdrojů, cena elektřiny na trhu může klesnout až k nule nebo dokonce do záporných čísel. To znamená, že výrobci jsou ochotní vyrábět zadarmo nebo dokonce platit někomu, kdo spotřebuje jejich elektřinu. Mírně zápornou cenu jim pak kompenzuje separátní prodej tzv. [_záruk původu_ zelené elektřiny](https://www.dsadvokati.cz/cz/blog/dsa-clanky/69-zaruky-puvodu-doklad-o-tom-ze-nakupuji-zelenou-energii) a v některých zemích i dotace pro obnovitelnou elektřinu. Jaderné zdroje, které na danou chvíli svoji elektřinu dávno prodaly na _futures_ trhu, si mohou vybrat tuto prodanou elektřinu nevyrobit a místo ní jako náhradu zadarmo nebo dokonce s dalším ziskem nakoupit stejné množství obnovitelné elektřiny na _krátkodobém_ trhu. Tím by v souladu s tržními principy uvolnily prostor pro obnovitelné zdroje (kterém mají nižší provozní náklady). Stávající české jaderné elektrárny nicméně nejsou schopné svůj výkon tak rychle měnit, u budoucích jaderných zdrojů by ale k tomuto jevu mohlo docházet.
[^povolenky-uhli]: Emisní povolenky dopadají tvrdě například na hnědé uhlí – oproti zemnímu plynu má hnědé uhlí skoro 3x vyšší emisní náročnost. Pro hnědouhelné elektrárny tvoří emisní povolenky převážnou část variabilních nákladů.
