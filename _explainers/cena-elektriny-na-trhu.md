---
layout:      explainer
title:       "Jak se na trhu stanovuje cena elektřiny?"
slug:        "cena-elektriny-na-trhu"
published:   2022-03-02
author:      "Jakub Zamouřil, Jan Krčál"
weight:      50
tags-scopes: [ eu, cr ]
tags-topics: [ energetika ]
cover-source-author: "Alexandru Boicu"
cover-source-license: "Unsplash licence"
cover-source-license-url: "https://unsplash.com/license"
cover-source-text: "Unsplash"
cover-source-url: "https://unsplash.com/photos/h0z0ptvGVR8"
perex:       "Cena elektřiny na velkoobchodním trhu je výrazně proměnlivá. Podle jakého mechanismu je stanovená? A proč je tak citlivá na cenu jediného vstupu, jakým je zemní plyn?"

---

Pro vysvětlení, jak se tvoří cena elektřiny, začneme dvěma důležitými koncepty: jak se v síti zajišťuje vyrovnávání výroby se spotřebou elektřiny, a jak si jednotlivé elektrárny stanovují minimální cenu, za kterou jsou ochotné elektřinu na trh prodávat.

## Jak se v elektrické síti vyrovnává výroba a spotřeba?
Základní princip elektrické sítě je, že výroba elektřiny musí být vždy (zhruba) stejná jako spotřeba elektřiny. V případě, kdy spotřeba elektřiny výrazně přesáhne její výrobu, dochází k většímu namáhání generátorů elektřiny. Pokud výroba výrazně přesáhne spotřebu, může docházet k poškození elektrické rozvodné sítě. Obojí pak v extrémním případě může vést k tzv. _blackoutu_, tedy k přerušení dodávky elektřiny. **Výrobu a spotřebu je tak nutné neustále balancovat v reálném čase.**

Spotřeba elektřiny se v průběhu dne liší – zpravidla je přes den vyšší než v noci. V zimě pak poptávka po elektřině bývá vyšší než v létě z důvodu vytápění (v dalších dekádách ale může letní spotřeba převýšit zimní kvůli oteplování klimatu a rostoucí potřebě klimatizace). 

{% include figure.html
    name="rocni-maximum-spotreby-des.png"
    alt="Průběh hrubé spotřeby ve dnech ročního maxima"
    source-text="ERÚ"
    source-url="https://www.eru.cz/documents/10540/6616306/Rocni_zprava_provoz_ES_2020.pdf/edc0cb03-700a-43a7-8c08-a1ccb3f2d173"
%}

Spotřebu elektřiny lze do určité míry dopředu odhadovat a je tedy možné dopředu plánovat i to, kolik bude potřeba v každém okamžiku vyrobit elektřiny. Toto plánování, tedy propojování nabídky elektráren na výrobu elektřiny s předpokládanou poptávkou dodavatelů elektřiny, probíhá na **energetické burze**, jak dopodrobna popíšeme dále.

Protože však spotřebu elektřiny dopředu nikdy nelze odhadnout zcela přesně, v síti se vždy budou vyskytovat malé odchylky, které je potřeba vyrovnat v reálném čase. Tuto regulaci provádí provozovatel přenosové soustavy, kterým je v České republice společnost ČEPS, a.s. Její řídící středisko sleduje v reálném čase spotřebu elektřiny v ČR a zajišťuje vyrovnávání výroby se spotřebou. Zjednodušeně řečeno ČEPS dává pokyny ke zvýšení nebo snížení výkonu vhodných nasmlouvaných elektráren (typicky uhelných nebo plynových). Vyrovnávání výroby a spotřeby je [blíže popsáno](#ceps) v dodatcích na konci textu.

Na stránkách ČEPS můžete sledovat živě data o [výrobě elektřiny](https://www.ceps.cz/cs/data#Generation) a [zatížení sítě](https://www.ceps.cz/cs/data#Load) (tedy spotřebě) v ČR.

## Podle čeho se vybírá, které elektrárny poběží?
Spotřeba elektřiny v ČR se v závislosti na dni a hodině pohybuje mezi 4,5 GW a 11,5 GW. Celkový instalovaný výkon všech elektráren (vč. tepláren) v ČR je ale [zhruba 21,3 GW](https://www.eru.cz/documents/10540/6616306/Rocni_zprava_provoz_ES_2020.pdf/edc0cb03-700a-43a7-8c08-a1ccb3f2d173). Protože export do zahraničí má kapacitní omezení, mohou v každém okamžiku běžet jen některé elektrárny a ostatní jsou ponechány vypnuté.

{% include figure.html
    name="vyroba-spotreba-des.png"
    name-mobile="vyroba-spotreba-des.png"
    alt="Kolik můžeme vyrobit a kolik zvládneme spotřebovat"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Pro zapínání a vypínání elektráren je zásadních několik parametrů: jejich **maximální možná výroba** (_instalovaný výkon_), **rychlost, s jakou je možné je zapnout** (_doba náběhu_), např. k pokrytí denní špičky spotřeby, a také **náklady na výrobu elektřiny**. Elektrárny v ČR můžeme zjednodušeně rozdělit do následujících hlavních kategorií:[^1]

{% include figure.html
    name="zdroje-elektriny.png"
    name-mobile="zdroje-elektriny.png"
    alt="Hlavní typy zdrojů elektřiny v ČR"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Které elektrárny v daný den a hodinu poběží, se přitom **rozhoduje na burze s elektřinou** – poběží ty, kterým se na daný den a hodinu podaří svou elektřinu na trhu prodat (elektrárny samozřejmě musí při prodeji elektřiny respektovat svoji schopnost elektřinu v daný den a hodinu skutečně vyrobit a tedy i svoji dobu náběhu). 

Jako první pro uspokojení poptávky po elektřině se využívají ty zdroje, které produkují nejlevnější elektřinu (tzn. podávají nejlevnější nabídky elektřiny). Když je poptávka vyšší, než kolik mohou uspokojit levné zdroje elektřiny, využívají se dražší a dražší zdroje, dokud není poptávka uspokojena. Naopak při snižování poptávky po elektřině se ty nejdražší zdroje elektřiny přestávají využívat jako první. Tomuto seřazení zdrojů podle ceny se v angličtině říká _merit order_.

{% include figure.html
    name="merit-order-des.png"
    name-mobile="merit-order-des.png"
    alt="Ilustrace seřazení zdrojů podle ceny (tzv. merit order)"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Jak ilustruje graf výše, v danou chvíli typicky není k dispozici veškerý instalovaný výkon. Počasí omezuje výkon solárních a větrných elektráren. Uhelné a plynové elektrárny často rezervují část svého výkonu na vyrovnávání výroby a spotřeby (na pokyny společnosti ČEPS) a tak tento výkon nemůžou nabízet na burze. Výkon jaderných elektráren mohou zase omezit plánované odstávky.

Upozorňujeme, že tento ilustrativní graf _merit orderu_ je velmi zjednodušený. Nabídkové ceny jednotlivých elektráren nejsou veřejně k dispozici, každá elektrárna v dané kategorii má v praxi trochu jinou efektivitu a tedy trochu jiné náklady. Skutečná křivka _merit orderu_ tak bude tvořena spoustou maličko odlišných cenových úrovní místo těch několika málo, které ukazujeme zde.


## Jak každá elektrárna stanovuje svou minimální cenu, za kterou bude dodávat elektřinu?

{% include preview-box.html
    slug="emisni-povolenky-ets"
%}

Elektrárny mají obecně dva druhy nákladů – fixní náklady a variabilní náklady. **Fixní náklady** jsou výdaje, které musí majitel elektrárny platit bez ohledu na to, jestli elektrárna běží, nebo stojí. Jsou to například mzdy zaměstnancům, náklady na údržbu, či rozpočítané náklady na stavbu elektrárny. **Variabilní náklady** jsou výdaje, které majitel musí zaplatit za každou jednotku vyrobené elektřiny. Sem patří zejména cena paliva, a případně i cena emisní povolenky, pokud elektrárna při výrobě elektřiny spaluje fosilní paliva a tedy vypouští oxid uhličitý.

Každý majitel elektrárny chce vyrábět elektřinu vždy, kdy se mu to vyplatí, což znamená, kdy cena prodané jednotky elektřiny přesáhne výrobní náklady na tuto jednotku elektřiny. Elektrárny tak nabízejí elektřinu za částku, které je rovná jejich variabilním nákladům – za nižší částku nejsou ochotny elektřinu vyrábět (s výjimkou jaderných elektráren, které je drahé odstavovat). Za vyrobenou elektřinu pak elektrárny zpravidla dostanou vyšší částku, než jaká byla jejich nabídková cena – dostanou peníze podle ceny elektřiny na trhu.

## Jak se stanovuje cena elektřiny na trhu?
V každém okamžiku se porovnává poptávka po elektřině od zákazníků s minimálními cenami od jednotlivých elektráren. Pro Českou republiku se to děje na energetické burze PXE v Praze. Ty nejlevnější elektrárny, které jsou dohromady schopné uspokojit poptávku, vyrábějí elektřinu. **Cena elektřiny na trhu je pak ta cena, za kterou elektřinu vyrábí ten poslední (nejdražší) zdroj, který je ještě potřeba k uspokojení poptávky.** Jak se cena elektřiny mění při rostoucí poptávce ukazuje následující animace.

{% include figure.html
    name="merit-order-animace.gif"
    name-mobile="merit-order-animace.gif"
    alt="Merit order (animovaný)"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

**Výslednou cenu elektřiny obdrží všechny právě vyrábějící elektrárny, i ty, které nabídly nižší nabídkovou částku.** Tím trh zajišťuje, že elektrárny mají motivaci nabídnout nejnižší možné ceny za výrobu elektřiny (kdyby nabídly vyšší, posunou se v _merit order_ a jejich služby nemusí být vůbec využity), ale přitom většinou dostanou vyšší částku, ze které mohou generovat provozní zisk. Celkově to tedy znamená, že čím je vyšší poptávka po elektřině, tím se musí zapojovat dražší a dražší zdroje elektřiny, což navyšuje cenu elektřiny pro celý trh.

Praktickou ukázku toho, jak vypadá [graf poptávky a nabídky elektřiny](https://www.ote-cr.cz/cs/kratkodobe-trhy/elektrina/krivky-sesouhlaseni), můžete nalézt například na stránkách českého operátora trhu s elektřinou.

## Z čeho pokryje elektrárna své fixní náklady?
Když elektrárna vyrábí, generuje provozní zisk, protože cena elektřiny je většinou o něco vyšší než její nabídková cena. Fixní náklady pak elektrárna pokrývá z tohoto provozního zisku. Protože však výši jejích příjmů za jednotku vyrobené elektřiny určuje trh, její provozní zisk závisí na průměrné ceně elektřiny na trhu. 

Pokud jsou tyto ceny příliš nízké, některé elektrárny nezvládnou pokrýt své fixní náklady a budou uzavřeny. To způsobí snížení nabídky kapacit pro výrobu elektřiny a zvýšení průměrné ceny elektřiny. Pokud je průměrná cena elektřiny naopak vysoká, přiláká to investice do nových levnějších elektráren, které rozšířením levnější nabídky pro výrobu elektřiny způsobí snížení průměrné ceny elektřiny. Takto se trh s elektřinou sám reguluje.

## Které zdroje elektřiny jsou nejlevnější a které nejdražší?

{% include figure.html
    name="naklady-des.png"
    name-mobile="naklady-des.gif"
    alt="Struktura nákladů podle typu elektrárny"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Nejlevnější elektřinu v současnosti produkují obnovitelné zdroje elektřiny. Tyto zdroje nepotřebují žádné palivo a neplatí za emisní povolenky, protože nevypouštějí oxid uhličitý. Jejich variabilní náklady jsou tak téměř nulové. Tyto zdroje tedy vyrábějí elektřinu vždy, kdy mohou, dle aktuálních podmínek.

{% include preview-box.html
    title="Vývoj cen elektřiny podle zdrojů"
    text="Jeden ze způsobů, jak vyjádřit fixní i variabilní náklady jedním číslem jsou tzv. _sdružené náklady na výrobu elektřiny_. Tato grafika se dívá na jejich vývoj v čase."
    slug="cena-energie"
%}

Druhým nejlevnějším zdrojem jsou (již postavené) jaderné elektrárny, protože mají velmi nízké variabilní náklady. Když se berou v potaz fixní náklady, tak vycházejí jaderné zdroje poměrně draze, což je jeden z důvodu, proč se v posledních desetiletích v Evropě staví velmi málo nových jaderných elektráren. Na trhu mají jaderné elektrárny zvláštní postavení, jelikož regulovat jejich výkon je obtížné. Pokud v některý moment poptávku pokryjí jen obnovitelné a jaderné zdroje, tak mají přednost jaderné zdroje (zápornou nabídkovou cenou jednoduše na burze vytlačí obnovitelné zdroje). 

V době, kdy výroba z obnovitelných zdrojů a jaderných elektráren nestačí k pokrytí celé poptávky po elektřině, přicházejí na řadu mnohem dražší zdroje, ve kterých je možné vyrábět elektřinu dle potřeby (jsou regulovatelné). Mezi těmito zdroji jsou například elektrárny na uhlí, zemní plyn, či biomasu. Jejich pořadí opět určí to, za jak nízkou cenu jsou tyto elektrárny schopné produkovat elektřinu. Toto pořadí je tedy závislé na cenách paliva pro tyto elektrárny a na jejich emisní náročnosti – čím víc vypustí elektrárna oxidu uhličitého na jednotku vyrobené elektřiny, tím víc musí elektrárna zaplatit na emisních povolenkách, a tím je jednotková cena vyrobené elektřiny dražší. To je mechanismus, kterým emisní povolenky motivují snižování emisní náročnosti celé soustavy[^2].

Mezi cenou nejlevnějších a nejdražších zdrojů jsou obrovské rozdíly. **Během jednoho dne tak cena elektřiny může oscilovat mezi nulou a několika sty euro**, podle momentální spotřeby a podle výroby z obnovitelných zdrojů. Instalovaný výkon obnovitelných zdrojů bude v Evropě nadále růst. Můžeme tedy čekat **častější hodiny s velmi nízkou ceny elektřiny** a tedy i **méně hodin s velmi vysokými cenami elektřiny**. Tímto budeme postupně snižovat závislost na fosilních zdrojích a také emise skleníkových plynů v energetice. Velkých výkyvů ceny elektřiny na burze se ale jen tak nezbavíme.

## Dodatky

### Jak konkrétně ČEPS zajišťuje rovnováhu mezi výrobou a spotřebou v každém okamžiku? {#ceps}
Společnost ČEPS pro zajištění výkonové rovnováhy využívá nasmlouvaných dodavatelů podpůrných služeb, v tomto případě konkrétně tzv. _služeb výkonové rovnováhy_. Dodavatelé služeb výkonové rovnováhy jsou dnes v Česku typicky velké elektrárny a teplárny, které mají **flexibilní výrobu**. Jde tedy [hlavně o uhelné nebo plynové zdroje](https://www.ceps.cz/cs/statistiky-svr), které mohou rychle začít vyrábět elektřinu v případě jejího nedostatku, nebo s výrobou rychle přestat v případě přebytku. Kromě běžných elektráren jsou pro pokrytí špiček poptávky po elektřině připraveny ještě další elektrárny v záloze, zpravidla plynové. Protože poptávka dosahuje špiček pouze malou část roku, tyto elektrárny jsou většinu roku nevyužity a na běžném trhu by nemohly pokrýt své fixní náklady. ČEPS tedy za poskytování podpůrných služeb platí kromě variabilních plateb za objem využitých služeb také fixní měsíční platby (za instalovaný výkon), kterými mohou elektrárny pokrývat své fixní náklady.

Od začátku roku 2021 platí volnější [pravidla](https://oenergetice.cz/prenos-elektriny/ceps-upravila-kodex-rizeni-soustavy-se-budou-moci-zapojit-nove-subjekty), podle kterých bude v budoucnu možné otevřít trh s těmito službami pro více obchodních modelů: např. pro bateriová úložiště nebo pro **flexibilitu ve spotřebě**. Tu mohou nabízet např. velké chlazené sklady, kde příliš nezáleží na rozdílu několika stupňů Celsia. Při nedostatku elektřiny tak mohou o něco odložit chlazení nebo naopak při přebytku elektřiny sklady zchladit více a tím stabilizovat síť. Firmy jsou motivovány poskytovat podpůrné služby jednak fixními kapacitními platbami, jednak poplatky za každé skutečné využití těchto služeb.

### Kdy na burze probíhá obchod s elektřinou na daný den a danou hodinu?

Když trochu zjednodušíme situaci, elektřina se obchoduje ve dvou časových horizontech. Jednak **krátkodobě** na tzv. _spotovém trhu_. Na něm se hlavně obchoduje elektřina na příští den (_day-ahead_), a také je možné obchodovat na právě probíhající den (_intra-day_). V tomto horizontu se elektřina obchoduje zvlášť na každou hodinu dne.

Jednak se obchoduje **dlouhodobě** na tzv. _futures trhu_. Takto si zajistí většina dodavatelů elektřiny alespoň část odhadované spotřeby svých zákazníků. Tento trh funguje stejným způsobem jako trh v reálném čase, ale pracuje s odhadovanými budoucími náklady na výrobu elektřiny jednotlivých elektráren. Elektřina nakoupená na tomto trhu je většinou mírně dražší (protože je v ní započítáno riziko), chrání ale dodavatele elektřiny před náhlým kolísáním ceny elektřiny, které při obchodování v reálném čase může nastat. Díky nákupům dopředu můžou dodavatelé nabízet svým zákazníkům fixovanou cenu elektřiny na několik let dopředu. V tomto horizontu se obchoduje hlavně fixní odběr (tzv. _base load_) na zvolený den, měsíc, kvartál nebo kalendářní rok.

### Proč je cena elektřiny na českém trhu tolik závislá na ceně elektřiny v Německu?
Obchodníci na burze s elektřinou mají možnost nakoupit elektřinu na burze v Německu a prodat ji v Česku (a naopak). Přitom si ovšem musí nakoupit potřebnou kapacitu na přeshraničních elektrických vedeních od operátora přenosové sítě. Protože je však Německo a Česko relativně dobře propojené, většinu času se daří elektřinu přeprodávat mezi trhy a tím synchronizovat její cenu (tomu se říká _arbitráž_). Některé země jsou přitom tzv. _implicitně propojené_, což znamená, že mají mezi sebou dostatek elektrických spojení a obchodníci si ani nemusí kvůli přeshraničním obchodům nakupovat kapacity na přeshraničních linkách. Takto je ČR propojená se Slovenskem, Maďarskem a Rumunskem. Stejně dobře jsou také propojeny země západní Evropy. To znamená, že v praxi cenu elektřiny v Česku určuje mnohem "větší" _merit order_, do kterého vstupuje na jedné straně také spousta elektráren z Německa a dalších okolních zemí a na druhé straně poptávka dodavatelů elektřiny z těchto zemí.

Dlouhodobým cílem EU je pak propojení celé Evropy do jednoho velkého implicitně propojeného trhu. K tomu bude mimo jiné potřeba dále posílit evropskou přenosovou soustavu. To umožní snazší přenos elektřiny mezi zeměmi, pokud tedy například bude větrno v Severním moři, tamní větrné elektrárny budou moci napájet elektřinou velkou část Evropy.

### Musí elektrárny prodávat svou elektřinu na burze? 
Nemusí, elektrárny se mohou také dohodnout s jinými subjekty (firmami či institucemi) na přímém odběru elektřiny formou dlouhodobé bilaterální dohody či _power purchase agreement (PPA)_. Tato elektřina pak vůbec neprochází přes burzu a cena prodané elektřiny se řídí tím, co si dané subjekty mezi sebou dohodly. Ceny takto prodané elektřiny ale v principu kopírují ceny na _futures trhu_. Při výrazně nižších cenách PPA by prodejce raději prodával na burze, při výrazně vyšších cenách PPA by na burze raději nakoupil nakupující. Výhoda PPA pro obě strany je flexibilita podmínek, jaké si subjekty mohou mezi sebou domluvit.

### Jak funguje podpora obnovitelných zdrojů elektřiny?
Solární a větrné zdroje mají velmi nízké provozní náklady a relativně vysoké investiční náklady. To je kombinace, která přináší velké riziko pro investora, že se z ceny na burze investiční náklady nesplatí. Státy EU proto nabízí různé formy podpory, aby soukromé investory motivovaly k výstavbě těchto zdrojů. Nejčastější forma je tzv. _feed in tariff_, u kterého stát nabízí dlouhodobou garanci minimální výkupní ceny. Výrobci sice nadále obchodují na burze, stát jim ale vyrovná příjmy, pokud je cena na burze nižší než ta garantovaná. Tento mechanismus se uplatňuje na různé další obnovitelné zdroje elektřiny, od bioplynových stanic po malé vodní elektrárny. Část nákladů na tuto podporu v Česku platí přímo zákazníci v rámci regulované složky ceny elektřiny, část nákladů pokrývá stát z výnosů prodeje emisních povolenek. S postupným snižováním investičních nákladů také může klesat minimální výkupní cena, v Evropě se v dnešní době nejčastěji určuje formou aukcí.

Kombinace vysokých investičních nákladů a nízkých provozních nákladů se ovšem týká i nových jaderných zdrojů, proto akciová společnost ČEZ při diskuzích o výstavbě nových reaktorů opakovaně požaduje od státu nějakou podporu nebo garanci výkupní ceny.

## Zdroje
* ["Úvod do liberalizované energetiky: Trh s elektřinou"](https://www.mpo-efekt.cz/upload/7799f3fd595eeee1fa66875530f33e8a/kniha-trh-s-elektrinou.pdf)
* ["Open Electricity Economics Handbook"](http://open-electricity-economics.org/index.html)

## Poznámky

[^1]: Pro zjednodušení tabulka vynechává přečerpávací elektrárny (asi 1,2 GW), které jenom umožňují elektřinu v omezené míře ukládat.
[^2]: Emisní povolenky např. dopadají tvrdě na hnědé uhlí, oproti zemnímu plynu má hnědé uhlí skoro 3x vyšší emisní náročnost. Pro hnědouhelné elektrárny tvoří emisní povolenky převážnou část variabilních nákladů.