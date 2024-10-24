---
layout:      explainer
title:       "Výroba elektřiny v Česku bez uhlí: dodatečné Q&A ke studii"
slug:        "2024-qa-vyroba-elektriny-v-cesku-bez-uhli"
published:   2024-10-21
authors:
  - ids: ["jan-krcal", "matej-grabovsky"]
weight:      74
tags-scopes: [ svet ]
tags-topics: [ emise, opatreni ]
cover-source-author:        "Marcel Otruba"
cover-source-text:          "Fakta o klimatu"
cover-source-license:       "CC BY 4.0"
cover-source-license-url:   "https://creativecommons.org/licenses/by/4.0/deed.cs"
cover-source-url:           "https://faktaoklimatu.cz/explainery/2024-qa-vyroba-elektriny-v-cesku-bez-uhli"
perex: |
    Česko má dnes nadbytečnou kapacitu uhelných zdrojů. A současně v Česku probíhá vášnivá debata okolo možnosti a nemožnosti rychlého odklonu od uhlí ve výrobě elektřiny. Politicky se tyto diskuse koncentrují okolo možných uhelných přílepků v zákoně lex OZE 3. V analytickém týmu Fakt o klimatu jsme nedávno vydali studii <em>Výroba elektřiny v Česku bez uhlí</em>, ve které argumentujeme, že velká většina současných uhelných elektráren není potřeba pro zajištění dodávek elektřiny. Zde znovu vysvětujeme hlavní sdělení studie a podrobně odpovídáme na sadu otázek a kritických připomínek.
---

**Nadbytečná kapacita se dá ale argumentovat ještě výrazně jednodušeji.** Současný čistý instalovaný výkon řiditelných zdrojů v Česku je přibližně 15,4 GW (slunce, vítr a průtočné vodní elektrárny do tohoto výkonu nepočítáme, protože nemusí vyrábět, když je budeme potřebovat). Špička zatížení za posledních 10 let přitom byla 11,4 GW.

{% include figure.html
    name="instalovany-vykon-cr.svg"
    alt="Řiditelných zdrojů je dnes v ČR 15,4 GW netto, historické maximum zatížení je 11,4 GW"
%}

{% include preview-box.html
    title="Studie o odklonu od uhlí"
    text="Tento text rozvíjí nedávno zveřejněnou studii a odpovídá na sadu otázek, které k nám po jejím zveřejnění přišly."
    slug="2024-vyroba-elektriny-v-cesku-bez-uhli"
%}

**Česko má tedy nadbytek řiditelného výkonu v řádu několika GW.** Část tohoto řiditelného instalovaného výkonu samozřejmě nemůže běžet stále na plný výkon, např. vodní nebo přečerpávací vodní elektrárny nebo při plánovaných i neplánovaných odstávkách jednotlivých bloků.

Takto extrémní špička zatížení ovšem taky trvá jen několik hodin. Například během rekordního 15. února 2021 bylo zatížení v pásmu 10,8–11,4 GW jen 7 hodin mezi 7h ráno a 13h odpoledne, tedy výrobu nad 10,8 GW v ten by byla schopna dodat přečerpávací elektrárna Dlouhé Stráně. Obecně je zatížení nad 10,8 GW v Česku poměrně vzácné: za posledních 10 let k němu došlo jen ve 4 letech, v součtu v 69 hodinách a nikdy ne déle než 8h v kuse.

**Proč má Česko takový nadbytečný výkon?** Z ekonomických důvodů. Při současné ceně emisních povolenek je výroba elektřiny z uhlí levnější než výroba ze zemního plynu. Většina takto vyrobené elektřiny z uhlí směřuje na export.

Ze stejných ekonomických důvodů by ale při nárůstu ceny emisní povolenky došlo k výraznému útlumu výroby elektřiny z uhlí a tedy k prudkému poklesu ziskovosti uhelných elektráren. To by záhy mohlo vést až k uzavření některých elektráren a lomů. Takové uzavření nepotřebných uhelných elektráren by vedlo ke snížení celkových nákladů energetického systému, protože provoz lomů i provoz uhelných elektráren má vysoké fixní náklady. Naopak udržet tyto elektrárny v provozu formou státní subvence by celkové náklady jenom zvýšilo.

**Pro důležitá rozhodnutí v energetice jsou samozřejmě potřeba podrobnější analýzy.** Proto jsme ve zmíněné studii zpracovali scénáře na základě modelu celé propojené evropské soustavu, v hodinovém rozlišení a napříč mnoha scénáři počasí, které ovlivňuje spotřebu elektřiny i výrobu z obnovitelných zdrojů. Tato studie dochází k podobným závěrům jako zjednodušená úvaha výše.

Naše analýza vyvolala celou řadu reakcí a komentářů, v dalším textu se podíváme na ty nejpodstatnější, rozdělené do několika kategorií.

**Obecně platí, že pro kvalitní rozhodování je potřeba podrobná a věcná diskuse, proto vítáme konstruktivní a fundované komentáře podložené otevřenými daty a modely.** Považujeme za nesmírně důležité, aby Česko procházelo dekarbonizací a modernizací s co nejmenšími ekonomickými náklady a sociálními dopady, a k tomuto cíli se naší prací snažíme přispět.

## Používáme standardní model elektroenergetiky v hodinovém rozlišení

Část připomínek se soustředí na to, že náš model není dokonalý. Ano, víme o tom. Každý model je z principu nepřesný a nedokonalý a podle toho je potřeba interpretovat jeho výstupy. Nedostatky vyplývají buď z povahy dat, která jsou pro modelování k dispozici, nebo z prostých technických a výpočetních limitů samotného modelu. Daly by se daly shrnout do tří kategorií:

{% include expander-figure.html
    name="omezeni-prenosu"
    class="qa-uhli"
    label="Váš model nezahrnuje omezení na přenosu uvnitř jednotlivých zemí. Nenadsazuje možnosti importu elektřiny?"
    content="Ano, model nezahrnuje omezení přenosové soustavy uvnitř jednotlivých států. To je standardně používané zjednodušení, které pomáhá udržet přijatelné výpočetní nároky. Nevíme o žádném geograficky jemnějším modelu celoevropské soustavy, jehož výsledky by jakkoliv vstupovaly do české veřejné debaty. Roční čistý import Česka v jednotlivých scénářích není nijak zásadní a česká soustava na něm nezávisí, proto toto omezení modelu nemá na výsledky podstatný vliv."
%}

{% include expander-figure.html
    name="podpurne-sluzby"
    class="qa-uhli"
    label="Váš model neobsahuje podpůrné služby. Může Česko odstavit uhelné elektrárny, které tyto služby poskytují?"
    content="Služby výkonové rovnováhy modelujeme implicitně, studie popisuje použitou metodiku. Nefrekvenční podpůrné služby jako \"start ze tmy\" model skutečně nezahrnuje, což studie otevřeně přiznává. Přímo v manažerském shrnutí píšeme: \"Je třeba urychleně najít náhradní řešení všech typů podpůrných služeb, které dnes uhelné elektrárny poskytují.\"

To samozřejmě také může znamenat o něco pomalejší odstavování uhelných elektráren, než vychází na základě modelové optimalizace. Během topné sezóny nečekáme z pohledu služeb výkonové rovnováhy zásadní problémy, protože i po odstavení většiny uhelných elektráren by v síti nadále zůstalo velké množství řiditelných zdrojů, které tyto služby mohou dodávat. Část služeb výkonové rovnováhy je navíc možné obchodovat přeshraničně, což může snižovat jejich cenu. Jak ale naznačuje letošní tzv. superkritický scénář od společnosti ČEPS, mimo topnou sezónu může po odstavení většiny uhelných zdrojů docházet k nedostatku celé řady podpůrných služeb (FCR, FRR-, aFFR+, aFRR-). Proto je potřeba dokončit implementaci Lex OZE 3 a vpustit tak na trh řadu nových poskytovatelů, včetně akumulace a agregace.

Větší jasnost by do tohoto tématu měla přinést chystaná zpráva MAF 2023 od společnosti ČEPS."
%}

{% include expander-figure.html
    name="tezba-uhli"
    class="qa-uhli"
    label="Proč model nezahrnuje těžbu uhlí a spoustu technických aspektů, které s tím souvisí?"
    content="Přestože těžbu uhlí model nezahrnuje, studie jasně pojmenovává dopady snižující se těžby na ekonomiku provozu jednotlivých lomů. Pro zahrnutí lomů a provázanosti zdrojů uhlí a kotlů do modelace bohužel chybí hodnověrné a úplné veřejně dostupné informace."
%}

Tyto nedokonalosti modelu je tak potřeba řešit na úrovni interpretace výsledků, vrátíme se k tomu v závěru textu.

## Naše metodika modelování energetiky je technologicky neutrální

Dostáváme připomínky, že naše metodika modelování straní obnovitelným zdrojům. Používáme standardní metodiku, která je technologicky neutrální. Jako společnost každopádně potřebujeme najít racionální cestu vpřed s nejnižšími náklady, nehledě na technologie.

{% include expander-figure.html
    name="jadro-spot"
    class="qa-uhli"
    label="Model Fakt o klimatu simuluje pouze spotovou cenu, většina elektřiny se ale prodává na forwardech, např. z jádra. Nevede k nesmyslným výsledkům, které nemohou být výhodné pro zákazníka?

OZE nemohou přispět k levné elektřině, to může jedině jádro. OZE mohou zlevňovat jen pokud je jich málo, pokud nedochází k jejich omezování a pokud neovlivňují dramaticky síť. Jinak stoupají náklady na síťové a regulační služby a na provozní dotace. Nemýlí se model Fakt o klimatu, když započítává pouze cenu silové elektřiny?"
    content="Náš model nesimuluje spotovou cenu, pouze počítá nákladově optimální nasazování zdrojů hodinu po hodině, což je chování, ke kterému taktéž v principu vede spotový trh. Na tomto chování nic podstatného nemění ani obchodování na forwardovém trhu. I ten, kdo prodal svoji elektřinu roky dopředu na forwardovém trhu, samozřejmě bude dál obchodovat na spotovém trhu, pokud se mu to vyplatí: může nakoupit levně na spotu, snížit vlastní výrobu a ušetřit tak peníze na provozních nákladech.

V tzv. _long-run_ optimalizaci, kterou používáme pro studii [Cesty k čisté a levné elektřině v roce 2050](/2024-cesty-k-ciste-a-levne-elektrine-2050) optimalizace zahrnuje kombinaci investičních a provozních nákladů. To vede k nákladově optimálnímu mixu, který zahrnuje investiční i provozní náklady na záložní zdroje, náklady na pokrývání výkyvů ve výrobě z obnovitelných zdrojů, ekonomické ztráty související s mařením elektřiny z obnovitelných zdrojů. Tato metodika tak implicitně zahrnuje i náklady na potřebné dotace, které by zajistily obnovitelný zdrojům rentabilitu.

Tato metoda nestraní ani proměnlivým obnovitelným zdrojům, ani stabilním jaderným zdrojům. Ve výpočtech hledáme nákladově co nejefektivnější dekarbonizaci Česka. (Ostatně v této dřívější studii otevřeně píšeme, že pokud by se podařilo zajistit nízké investiční náklady u nových velkých jaderných bloků nebo pokud se podaří obdobně zlevnit výstavbu SMRs, tak by rozvoj jaderné energetiky podstatně přispíval ke snížení celkových nákladů. Jen nám na základě širší sady scénářů nepřijde pro Česko strategické sázet _výhradně_ na rozvoj jaderné energetiky.)

V optimalizaci nemáme náklady na rozvoj a údržbu přenosové a distribuční soustavy, což je a bude podstatná část celkových nákladů. Tuto nedokonalost modelu otevřeně přiznáváme. Tyto náklady porostou mimo jiné kvůli elektrifikaci a kvůli rostoucí spotřebě elektřiny. Dá se předpokládat, že ve scénáři výrazně většího rozvoje obnovitelných zdrojů budou tyto náklady vyšší než ve scénáři menšího rozvoje obnovitelných zdrojů. Tyto \"vícenáklady\" rozvoje OZE bychom do modelu rádi zahrnuli, ale nevíme o žádných dostatečně kvalitních a transparentních odhadech vztahu těchto nákladů s rozvojem OZE. Velmi oceníme, když kdokoliv v české energetice zpracuje kvalitní otevřenou studii s transparentní metodikou, vstupy a výstupy, na které budeme moci dále stavět."
%}

{% include expander-figure.html
    name="oze-drazsi"
    class="qa-uhli"
    label="Státy s vysokým podílem fotovoltaických a větrných elektráren nemají nízkou cenu elektřiny pro zákazníka. Jak tedy může OZE zlevňovat elektřinu?"
    content="To je pravda, ale vyvozovat z takového srovnání jasné závěry ohledně cest k levné elektřině v budoucnu je metodologicky ošemetné.

Nejlevnější z hlediska současných nákladů je samozřejmě nic moc nedělat a těžit z velkých investic v minulých dekádách (např. francouzská flotila jaderných elektráren rychle stárne, kdyby ji měli průběžně obnovovat, budou jejich náklady a konečné ceny elektřiny určitě vyšší). Pokud by stát zcela přestal opravovat svoje silnice, určitě by mohl snížit daně. Byl by to důkaz prozíravé a efektivní správy?

Státy s vysokým podílem OZE (např. Německo) navíc podstatnou část tohoto rozvoje udělaly v době mnohem dražších obnovitelných technologií. Ceny solárních panelů za posledních 15 let let [dramaticky klesly](/cena-energie), k podstatnému poklesu nákladů došlo i u větrných elektráren. Odvozovat z toho nevýhodnost rozvoje OZE do budoucna je podobně zavádějící, jako varovat před rozvojem fotovoltaiky na základě českého zpackaného solárního boomu okolo roku 2010."
%}

{% include expander-figure.html
    name="dotace"
    class="qa-uhli"
    label="Fakta o klimatu doporučují provozní dotace, aby české OZE dokázaly konkurovat dotovaným německým OZE. Nebylo by lepší importovat dotovanou Německou elektřinu?

Německo už od ledna 2025 nebude poskytovat nové smlouvy na 20leté garance výkupních cen, ale jen instalační dotace. Vyprázdněný státní rozpočet bohatého Německa to neumožňuje. Proč by mělo provozní dotace zavádět Česko?"
    content="Taková interpretace provozních dotací je úplně mimo realitu proběhlé reformy trhu s elektřinou v EU, která v principu nebude umožňovat nové provozní dotace vyplácet v době záporných cen na trhu. Cílem tohoto nového mechanismu je nadále nestimulovat výrobu v době přebytků a přispět tak k omezování výskytu záporných cen na trhu. Tento mechanismus se ostatně také projeví u provozní podpory pro nový jaderný zdroj v Dukovanech.

Německo možná v budoucnu přejde na investiční dotace pro obnovitelné zdroje, to ale nesouvisí s tím, jak je německá státní kasa prázdná nebo plná. Rozhodně neplatí, že by investiční dotace byly pro veřejné rozpočty jakkoliv výrazně levnější nebo efektivnější než dobře nastavené provozní dotace. Stejně tak neplatí, že by v Německu (z důvodu údajně vyprázdněné veřejné pokladny) chtěli omezovat tempo rozvoje obnovitelných zdrojů. Detailní diskusi možné budoucí podpory OZE v Německu nabízí nedávná [publikace](https://www.bmwk.de/Redaktion/DE/Publikationen/Energie/20240801-strommarktdesign-der-zukunft.pdf?__blob=publicationFile&v=18) Ministerstva pro hospodářství a ochrany klimatu (str. 26–54).

Samozřejmě, pro Česko je z principu výhodné importovat německé přebytky dotované německými spotřebiteli. Se stejným argumentem by se dalo namítat, že nemá smysl provozně dotovat jaderné elektrárny, lepší by bylo nedostatek elektřiny v zimě řešit německými plynovkami podpořenými německými kapacitními platbami. To je absurdní představa, která by nevedla k energetické bezpečnosti.

Samozřejmě má smysl podporovat rozumný podíl obnovitelné elektřiny chytře nastavenou formou podpory, stejně jako má smysl podporovat rozumný podíl jaderné elektřiny chytře nastavenou formou podpory. Nemusíme se napříč energetickým sektorem shodnout na tom, co je pro Česko rozumný podíl obnovitelné a jaderné elektřiny, ale dá se o tom dále věcně diskutovat."
%}

## Předpoklady vývoje v Evropě jsou dostatečně robustní

Jedna část výhrad směřuje k tomu, že naše předpoklady o vývoji v Evropě a tedy o možnostech importu elektřiny jsou údajně příliš optimistické. Podle výsledků modelování by **Česko opravdu nebylo podstatně závislé na importu**, dováželo by jen 3–4 % své roční spotřeby elektřiny. Předpoklady o rozvoji v zahraničí vychází z výhledu jednotlivých provozovatelů přenosových soustav v Evropě. Předpoklady se samozřejmě vždy do nějaké míry liší od následné reality. Naše dodatečné analýzy ale ukazují, že ani při pomalejším rozvoji zdrojů napříč Evropou nehrozí nedodávky elektřiny.


{% include expander-figure.html
    name="plyn-de"
    class="qa-uhli"
    label="Nespoléháte v modelování příliš na rozvoj plynových elektráren v Německu, který se v poslední době zadrhává? Není odhad dostupnosti dodávek levné elektřiny ze zahraničí v kritickém zimním období příliš optimistický?

Studie MAF22 od ČEPS říká, že už v roce 2030 budeme výrazně zdrojově nepřiměření. Není to v rozporu s vašimi výsledky?"
    content="Co se týče vývoje instalovaného výkonu v Německu a dalších státech v Evropě, vycházíme z pokladů provozovatelů přenosových soustav pro celoevropské modelování ERAA 2023 (v době zpracování modelování pro studii nebyly veřejně k dispozici novější data). V dodatečných analýzách (viz str. 25) zkoumáme scénář, při kterém by tempo rozvoje nových zdrojů bylo poloviční oproti předpokladům. Ani v této konfiguraci by v Česku nehrozily nedodávky nad úrovní normy spolehlivosti.

Předběžné podklady pro ERAA 2024 skutečně dávají o něco nižší odhady instalovaných výkonů plynových zdrojů v Německu, než se kterými za základě ERAA 2023 počítá naše studie. To ale nic nemění na podstatě výsledku: při vysoké ceně povolenky pro rok 2025 ani při rychlém rozvoji moderní energetiky pro rok 2028 nebude Česko podstatně závislé na dovozu elektřiny, dovážet 3–4 % spotřeby opravdu není žádné dramatické číslo. K většině tohoto dovozu navíc dochází z tržních důvodů (v době levnější výroby v zahraničí). V Česku dostupné zdroje i po uzavření většiny uhelných elektráren dokážou pokrýt zimní špičky spotřeby.

Studie MAF 2022 je pesimističtější než naše modelování především pro Progresivní a Dekarbonizační scénář, pro vzdálenější horizonty 2035 a 2040 a z části i pro rok 2030. To ovšem vychází z toho, jak jsou scénáře analyzované v MAF sestavené. Po roce 2030 totiž nepočítají s žádnými dalšími řiditelnými zdroji (kromě jaderných zdrojů), přestože výrazně stoupá předpokládaná spotřeba elektřiny. **To je komplikované vyjádření triviálního pozorování: pokud nebudeme stavět dostatek nových řiditelných zdrojů, budeme mít časem velký problém.** Nijak to ale není v rozporu s našimi výsledky pro roky 2025 a 2028."
%}

{% include expander-figure.html
    name="uhli-pro-jistotu"
    class="qa-uhli"
    label="Nevyplatilo by se kvůli nejistotě vývoje za našimi hranicemi nechat uhelné elektrárny v provozu déle?"
    content="Samozřejmě záleží na scénáři vývoje v Evropě. Pokud by ten scénář byl velmi špatný (např. velmi pomalá výstavba plynových zdrojů napříč Evropou, výrazné technické problémy s francouzskou jadernou flotilou podobně jako před pár lety, problémy s cenou či dodávkami zemního plynu, apod.), tak to bude mít silné dopady na možnosti a ceny importu elektřiny.

My vycházíme ze scénáře ERAA 2023 a v tomto scénáři nedodávky a extrémně vysoké ceny nehrozí. Každý si dokáže představit více či méně katastrofické scénáře, při kterých bude elektřina drahá (ostatně při nedávné plynové krizi byla drahá i s uhelnými zdroji).

Za každé snížení rizika se platí. Udržovat další roky v provozu (všechny) uhelné elektrárny je však podle našeho modelování neúměrně nákladné snižování rizika.

O čem se jistě dá v rámci snižování rizika diskutovat, je převedení části dnes nepotřebných uhelných zdrojů do strategických rezerv, právě pro případ nečekaně nepříznivého geopolitického vývoje. Taková diskuse by ale vyžadovala kvalitní podklady k technické proveditelnosti, celkovým nákladům, apod.

Další teoretickou možností (byť v rozporu s evropským právem) je nějaká forma podpory pro velmi omezený počet uhelných zdrojů a lomů, na zřetelně ohraničenou dobu. Taková podpora by mohla řešit další možné problémy s poskytováním podpůrných služeb nebo s udržením potřebné těžby pro teplárenství. Protože taková podpora by byla drahá jak ekonomicky tak politicky ve vztahu k EU, bezpodmínečně by vyžadovala solidní a důvěryhodnou analýzu, proč je nutná. Žádná taková analýza zatím neexistuje."
%}

## Česko potřebujeme omezit rizika využití zemního plynu na výrobu elektřiny

Podle kritiků naší práce je přechod na zemní plyn dražší a riskantnější než udržet uhlí. Dražší to není, podle výsledků modelování při drahé emisní povolence je omezení výroby z uhlí a mírné navýšení výroby ze zemního plynu a dovozu elektřiny nejlevnější možné řešení.

Samozřejmě je ale potřeba se bavit o rizicích. Studie rozhodně neprosazuje významný přechod na zemní plyn, protože ten má také svoje ekonomické, geopolitické i klimatické problémy. Je ale potřeba rozlišovat instalovaný výkon (např. investičně relativně levných špičkových zdrojů elektřiny) a celkovou roční výrobu.

Z hlediska stability soustavy a zajištění dodávek elektřiny je potřeba vysoký instalovaný výkon řiditelných zdrojů: krátkodobě hlavně plynových, pomůže ale také akumulace nebo flexibilita spotřeby; dlouhodobě může také pomoci rozvoj jaderné energetiky.

Všechny problémy zemního plynu jsou svázané s objemem jeho celkové spotřeby. Ta souvisí s celkovou roční výrobou elektřiny (a tepla) ze zemního plynu. Tu je samozřejmě z uvedených důvodů potřeba držet nízkou, jak ostatně píšeme ve studii. Jedinými smysluplnými kroku, jak v dalších 10 letech držet výrobu ze zemního plynu na přijatelně nízké úrovni jsou: rozvoj obnovitelných zdrojů (obzvláště větrné energetiky) a s tím související rozvoj akumulace a rozvoj flexibility spotřeby. Z dlouhodobého hlediska pak tyto kroky může doplnit rozvoj jaderné energetiky.

{% include expander-figure.html
    name="plyn-jak"
    class="qa-uhli"
    label="Nahradit více než 30 milionů tun těženého uhlí v ČR plynem znamená dovézt k současné spotřebě kolem 7 mld. m3 dalších až 12 mld. m3. Kudy se tolik zemního plynu doveze?"
    content="V analyzovaném scénáři, kdy by se z důvodu nerentability odstavila většina uhelných elektráren, narůstá spotřeba zemního plynu v modelu jen o 13 TWh, tedy asi 1,2 mld. m³.

Uvedený odhad 12 mld. m3 je tedy řádově nadsazený a vychází z absurdního předpokladu, že je potřeba zemním plynem nahradit veškerou primární energii uhlí. To je špatně ze dvou důvodů: (1) výroba elektřiny v moderních paroplynových elektrárnách je o 30–50 % účinnější než výroba ve starých uhelných elektrárnách, (2) Česko nepotřebuje nahradit veškerou současnou výrobu elektřiny z uhlí. Není třeba nahrazovat část, která se exportuje, a nebude potřeba nahrazovat část, kterou postupně nahradí obnovitelné zdroje."
%}

{% include expander-figure.html
    name="uhli-nevyplati"
    class="qa-uhli"
    label="Může se odklon od uhlí Česku ekonomicky vyplatit, když přijde o 20 mld. Kč z exportu elektřiny a bude mít dodatečné náklady okolo 100 mld. Kč za navýšení importu zemního plynu a o dalších 100 mld. Kč za import elektřiny?"
    content="Pojďme to přepočítat.
* Při výše zmíněném dovozu dalších 13 TWh zemního plynu by elektrárny za toto palivo zaplatily 9–13 mld. Kč. Horní odhad vychází z ceny 1 000 Kč/MWh (aktuální cena na TTF na rok 2025), dolní odhad vychází z ceny 670 Kč/MWh (aktuální cena na TTF na rok 2028).
* Česko by po odstavení většiny uhelných elektráren dováželo řádově 4 % elektřiny, nikoliv 40 %, které se z uhlí vyrábí dnes. Čisté náklady na přeshraniční výměnu by činily kolem 6 mld. Kč. Podle modelového scénáři by dovoz elektřiny ve výši 3,6 TWh ročně totiž stál okolo 9 mld. Kč, vývoz elektřiny ve výši 1 TWh elektřiny by naopak přinesl příjmy ve výši 3 mld. Kč.

Obě čísla jsou ale poměrně irelevantní, protože vyrábět místo toho více elektřiny z uhlí by bylo ještě dražší, hlavně kvůli vyšším nákladům na emisní povolenky. Proto ve světě s dražší emisní povolenkou není export uhelné elektřiny ekonomicky plausibilní. Podle výpočtů modelu by v roce 2028 stálo dotování uhelné energetiky jen pro zajištění vyrovnané importní bilance o 6 mld. Kč každoročně více."
%}

{% include expander-figure.html
    name="plyn-kudy"
    class="qa-uhli"
    label="Německo plánuje část své plynové infrastruktury přestavovat na vodík. Neomezí to možnosti importu zemního plynu do ČR? Kudy potřebný plyn dovezeme?"
    content="To je legitimní obava, kterou je potřeba řešit na úrovni mezinárodní diplomacie. Všechny (připravované) české energetické strategické dokumenty počítají v příštích 5–10 letech s mírně rostoucí spotřebou zemního plynu. Bezpečnost takového dovozu je potřeba zajistit a současně je potřeba snižovat spotřebu zemního plynu v dalších sektorech, např. energetickými renovacemi budov apod."
%}

{% include expander-figure.html
    name="plyn-klima"
    class="qa-uhli"
    label="S využitím zemního plynu jsou spojené velké nepřímé emise skleníkových plynů – úniky metanu při těžbě a přepravě. Dává přechod na zemní plyn vůbec z hlediska klimatu smysl, když je emisně srovnatelná s výrobou z uhlí?

Evropa plánuje tyto nepřímé emise metanu také zatížit emisní povolenkou. Dává přechod na zemní plyn vůbec nějaký smysl ekonomicky?"
    content="Ano, s využitím zemního plynu jsou spojené úniky metanu a CO2 při těžbě a transportu. (To mimochodem platí i pro uhlí, při jehož těžbě v Česku unikají skoro 2 Mt skleníkových plynů, což je více než 1,5 % české emisní stopy.)

Výroba elektřiny ze zemního plynu i tak produkuje zhruba o třetinu nižší celkové emise než výroba elektřiny z uhlí (viz např. parametry IPCC nebo analýza Clean Air Task Force). To je z hlediska dekarbonizace neuspokojivé zlepšení, proto dává přechod na zemní plyn smysl jen při splnění těchto podmínek:

1. **Zemní plyn bude jen jako doplněk OZE** (a jádra). To znamená, že výroba ze zemního plynu nesmí nahradit výrobu uhlí 1:1, je třeba bezodkladně rozvíjet obnovitelné zdroje, akumulaci, flexibilitu spotřeby. I tak budou potřeba záložní zdroje elektřiny, plynové turbíny i paroplynové zdroje jsou pro to technicky vhodnější než uhelné zdroje, protože rychlými změnami výkonu mohou lépe doplňovat proměnlivou výrobu z OZE.
2. Je třeba **snižovat úniky metanu při těžbě i transportu** zemního plynu, k čemuž se dostaneme níže.

Kromě toho je třeba v souladu s taxonomií co nejdříve přejít od zemního plynu k zeleným plynům (biometan, vodík) nebo využívat technologii zachytávání uhlíku CCUS. To nebude snadné ani levné zařídit pro velké instalované výkony nebo pro velké objemy výroby ze zemního plynu (kvůli omezené dostupnosti biometanu či vodíku, vysokým investičním nákladům technologie CCUS a omezením infrastruktury na ukládání CO2). **Z toho důvodu je třeba investice do plynových zdrojů velmi pečlivě zvažovat** a rozvíjet kromě nich také bezemisní nástroje k balancování soustavy jako např. akumulaci.

**Přechod na zemní plyn z hlediska trhu s elektřinou rozhodně smysl dává, protože není v plánu zatížit nepřímé emise metanu emisní povolenkou.** Evropská unie bude místo toho regulovat nepřímé emise metanu jiným způsobem. K postupnému snížení úniků metanu směřuje nedávno přijaté nařízení EU ([EU/2024/1787](https://energy.ec.europa.eu/news/new-eu-methane-regulation-reduce-harmful-emissions-fossil-fuels-europe-and-abroad-2024-05-27_en)), které navazuje na [strategii EU ke snížení emisí metanu](https://eur-lex.europa.eu/legal-content/CS/TXT/HTML/?uri=CELEX:52020DC0663) z roku 2020 i na [Global Methane Pledge](https://www.globalmethanepledge.org/) z konference COP26 v Glasgow v roce 2021. Toto nařízení požaduje po všech producentech dovážejících do EU ropu, uhlí a zemní plyn, aby od roku 2027 monitorovali a reportovali úniky metanu při těžbě a aby od roku 2030 plnili emisní limity (které ještě nebyly stanoveny). V případě neplnění těchto limitů dojde na pokuty, jejichž výše ale bude v gesci jednotlivých členských států. Cílem tedy není zavést zpoplatnění veškerých úniků metanu, ale jen tlačit producenty k relativně snadným technickým opatřením, které tyto úniky podstatně sníží."
%}

## Co z toho tedy plyne pro uhelnou energetiku?

**Kvalitně diskutovat o budoucnosti energetiky můžeme jen na základě otevřených a transparentních výpočtů** (např. pomocí otevřených modelů s otevřenými vstupními daty, okrajovými podmínkami i výstupy). Naše studie se k tomuto snaží přispět. Další věcné diskuzi by nepochybně prospěly další, ještě kvalitněji zpracované otevřené studie, které by kritizované aspekty naší práce vylepšily.

Za naší interpretací výsledků si nicméně stojíme. Naše studie rozhodně neříká, že v Česku můžeme okamžitě uzavřít všechny uhelné elektrárny kromě elektrárny Ledvice nebo dokonce, že by je Česko mělo okamžitě uzavřít. Studie pouze popisuje ekonomické faktory, které mohou vést k uzavírání uhelných elektráren, a tvrdí, že velká většina těchto elektráren není potřeba pro udržení zdrojové přiměřenosti.

Přímo v manažerském shrnutí navíc píšeme, že je potřeba (i) udržet v provozu uhelné teplárny (a související nutnou těžbu uhlí) a (ii) urychleně najít náhradní řešení všech typů podpůrných služeb, které dnes uhelné elektrárny poskytují.

Na základě veřejně dostupných dat v principu není možné určit, jak přesně vypadá nejlevnější možná trajektorie postupného odklonu od uhelné energetiky. I na základě dostupných dat lze ale říci, že touto nejlevnější cestou rozhodně nebude plošné dotování výroby elektřiny z mnoha uhelných elektráren a udržení všech čtyř současných hnědouhelných lomů v provozu.

**Opravdu tady někdo chce dotovat výrobu elektřiny, kterou budeme exportovat?**
