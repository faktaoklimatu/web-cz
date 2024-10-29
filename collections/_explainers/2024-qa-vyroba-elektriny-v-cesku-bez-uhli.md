---
layout:      explainer
title:       "Výroba elektřiny v Česku bez uhlí: dodatečné Q&A ke studii"
slug:        "2024-qa-vyroba-elektriny-v-cesku-bez-uhli"
published:   2024-10-26
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
    Česko má dnes nadbytečnou kapacitu uhelných zdrojů. Současně zde probíhá debata, zda je rychlý odklon od uhlí ve výrobě elektřiny možný, nebo není. Na politické úrovni jde zejména o diskuzi okolo možných uhelných „přílepků“ k zákonu nazývanému Lex OZE 3. Analytický tým Fakt o klimatu vydal v září 2024 studii <a href="/2024-vyroba-elektriny-v-cesku-bez-uhli">Výroba elektřiny v Česku bez uhlí</a>, kde argumentuje, že velká většina současných uhelných elektráren není pro zajištění dodávek elektřiny potřeba. Následující text podrobně odpovídá na sadu otázek a připomínek, které se po zveřejnění studie objevily, a znovu vysvětluje její hlavní sdělení.
---

**Argument "kapacita uhelných zdrojů je nadbytečná" je velmi jednoduchý:** současný čistý instalovaný výkon řiditelných zdrojů v Česku je přibližně 15,4 GW (bez slunce, větru a průtočných vodních elektráren – nejsou to řiditelné zdroje a tedy nemusí být schopny vyrábět v době, kdy je budeme potřebovat). Špička zatížení za posledních 10 let byla 11,4 GW, tedy o 4 GW nižší, než je uvedený instalovaný výkon.

{% include figure.html
    name="instalovany-vykon-cr.svg"
    alt="Řiditelných zdrojů je dnes v ČR 15,4 GW netto, historické maximum zatížení je 11,4 GW"
%}

{% include preview-box.html
    title="Studie o odklonu od uhlí"
    text="Tento text rozvíjí nedávno zveřejněnou studii a odpovídá na sadu otázek, které se po jejím zveřejnění objevily."
    slug="2024-vyroba-elektriny-v-cesku-bez-uhli"
%}

**Česko má tedy nadbytek řiditelného výkonu v řádu několika GW.** Část tohoto řiditelného instalovaného výkonu samozřejmě nemůže běžet stále na plný výkon, např. vodní či přečerpávací vodní elektrárny nebo jaderné elektrárny při plánovaných i neplánovaných odstávkách jednotlivých bloků.

Navíc extrémní špička zatížení trvá nanejvýš několik hodin. Například během rekordního 15. února 2021 bylo zatížení v pásmu 10,8–11,4 GW jen 7 hodin (mezi 7. a 13. hodinou), tedy výrobu nad 10,8 GW by v ten den byla schopna dodat přečerpávací elektrárna Dlouhé stráně. Obecně je zatížení nad 10,8 GW v Česku poměrně vzácné: za posledních 10 let k němu došlo jen ve 4 letech – v součtu to bylo 69 hodin a nikdy netrvalo toto zatížení déle než 8 hodin.

**Proč má Česko takový nadbytečný výkon?** Z ekonomických důvodů. Při současné ceně emisních povolenek je výroba elektřiny z uhlí levnější než výroba ze zemního plynu. Většina takto vyrobené elektřiny z uhlí směřuje na export.

Ze stejných ekonomických důvodů ale v případě nárůstu ceny emisní povolenky dojde k výraznému útlumu výroby elektřiny z uhlí a tedy k prudkému poklesu ziskovosti uhelných elektráren. To by záhy mohlo vést až k uzavření některých elektráren a lomů. Toto uzavření nepotřebných uhelných elektráren by vedlo ke snížení celkových nákladů energetického sektoru, protože provoz lomů a uhelných elektráren má vysoké fixní náklady. Naopak udržovat tyto elektrárny v provozu formou státní podpory by celkové náklady jenom zvýšilo.

**Pro důležitá rozhodnutí v energetice jsou potřeba podrobnější analýzy.** Proto jsou ve zmíněné studii zpracovány scénáře na základě modelu celé propojené evropské soustavy, v hodinovém rozlišení a napříč mnoha scénáři počasí, které ovlivňuje spotřebu elektřiny i výrobu z obnovitelných zdrojů. Tato studie dochází k podobným závěrům jako zjednodušená úvaha výše.

Studie vyvolala řadu různých reakcí a komentářů. Tento text se zaměřuje na ty nejpodstatnější a rozděluje je do několika kategorií.

**Obecně platí, že pro kvalitní rozhodování je potřeba vést podrobnou a věcnou diskuzi, proto jsou vítány jakékoli konstruktivní a fundované komentáře podložené otevřenými daty a modely.** Tým Fakt o klimatu považuje za velmi důležité, aby Česko procházelo dekarbonizací a modernizací s co nejmenšími ekonomickými náklady a sociálními dopady, a k tomuto cíli se také snaží svou prací přispět.

## Studie používá standardní model elektroenergetiky v hodinovém rozlišení

Část připomínek se soustředí na to, že model používaný ve studii není dokonalý. To je pravda. Každý model je z principu nepřesný a nedokonalý a podle toho je třeba také interpretovat jeho výstupy. Nedostatky vyplývají buď z povahy dat, která jsou pro modelování k dispozici, nebo z prostých technických a výpočetních limitů samotného modelu. Daly by se shrnout do tří kategorií:

{% include expander-figure.html
    name="omezeni-prenosu"
    class="qa-uhli"
    label="Váš model nezahrnuje omezení na přenosu uvnitř jednotlivých zemí. Nenadsazuje možnosti importu elektřiny?"
    content="Ano, model nezahrnuje omezení přenosové soustavy uvnitř jednotlivých států. To je standardně používané zjednodušení, které pomáhá udržet přijatelné výpočetní nároky. Nevíme o žádném geograficky jemnějším modelu celoevropské soustavy, jehož výsledky by jakkoliv vstupovaly do české veřejné debaty. Roční čistý import Česka v jednotlivých scénářích není nijak zásadní a česká soustava na něm nezávisí, toto omezení modelu tedy nemá na výsledky podstatný vliv."
%}

{% include expander-figure.html
    name="podpurne-sluzby"
    class="qa-uhli"
    label="Váš model neobsahuje podpůrné služby. Může Česko odstavit uhelné elektrárny, které tyto služby poskytují?"
    content="Služby výkonové rovnováhy jsou modelovány implicitně, studie popisuje použitou metodiku. Nefrekvenční podpůrné služby jako \"start ze tmy\" model skutečně nezahrnuje, což studie otevřeně přiznává. V manažerském shrnutí studie stojí: \"Je třeba urychleně najít náhradní řešení všech typů podpůrných služeb, které dnes uhelné elektrárny poskytují.\"

To samozřejmě také může znamenat o něco pomalejší odstavování uhelných elektráren, než jaké vychází na základě modelové optimalizace. Během topné sezóny nečekáme z hlediska služeb výkonové rovnováhy zásadní problémy, protože i po odstavení většiny uhelných elektráren by v síti zůstalo velké množství řiditelných zdrojů, které tyto služby mohou dodávat. Část služeb výkonové rovnováhy je navíc možné obchodovat přeshraničně, což může snižovat jejich cenu. Jak ale naznačuje letošní tzv. superkritický scénář od společnosti ČEPS, mimo topnou sezónu může po odstavení většiny uhelných zdrojů docházet k nedostatku kapacity služeb výkonové rovnováhy (FCR, FRR−, aFFR+, aFRR−). Proto je třeba dokončit implementaci Lex OZE 3 a vpustit tak na trh řadu nových poskytovatelů, včetně akumulace a agregace.

Větší jasnost by do tohoto tématu měla přinést chystaná zpráva MAF 2023 od společnosti ČEPS."
%}

{% include expander-figure.html
    name="tezba-uhli"
    class="qa-uhli"
    label="Proč model nezahrnuje těžbu uhlí a spoustu technických aspektů, které s tím souvisí?"
    content="Přestože těžbu uhlí model nezahrnuje, studie jasně pojmenovává dopady snižující se těžby na ekonomiku provozu jednotlivých lomů. Pro zahrnutí lomů a provázanosti zdrojů uhlí a kotlů do modelace bohužel chybí hodnověrné a úplné veřejně dostupné informace."
%}

Tyto nedokonalosti modelu je tak potřeba řešit na úrovni interpretace výsledků (více v závěru textu).

## Použitá metodika modelování energetiky je technologicky neutrální

Některé připomínky směřují k tomu, že použitá metodika modelování straní obnovitelným zdrojům. Studie však používá standardní metodiku, která je technologicky neutrální. V každém případě Česko potřebuje najít racionální cestu vpřed s co možná nejnižšími náklady, bez ohledu na konkrétní technologie.

{% include expander-figure.html
    name="jadro-spot"
    class="qa-uhli"
    label="Model Fakt o klimatu simuluje pouze spotovou cenu, většina elektřiny se ale prodává na forwardech, např. z jádra. Nevede pak k nesmyslným výsledkům, které nemohou být výhodné pro zákazníka?

OZE nemohou přispět k levné elektřině, to může jedině jádro. OZE mohou zlevňovat, jen pokud je jich málo, pokud nedochází k jejich omezování a pokud dramaticky neovlivňují síť. Jinak stoupají náklady na síťové a regulační služby a na provozní dotace. Nemýlí se model Fakt o klimatu, když započítává pouze cenu silové elektřiny?"
    content="Použitý model nesimuluje spotovou cenu, pouze počítá nákladově optimální nasazování zdrojů hodinu po hodině, což je chování, ke kterému taktéž v principu vede spotový trh. Na tomto chování nic podstatného nemění ani obchodování na forwardovém trhu. I ten, kdo prodal svou elektřinu roky dopředu na forwardovém trhu, bude dál obchodovat na spotovém trhu, pokud se mu to vyplatí: může nakoupit levně na spotu, snížit vlastní výrobu a ušetřit tak na provozních nákladech.

V tzv. _long-run_ optimalizaci, používané ve studii [Cesty k čisté a levné elektřině v roce 2050](/studie/2024-cesty-k-ciste-a-levne-elektrine-2050), zahrnuje optimalizace kombinaci investičních a provozních nákladů. To vede k nákladově optimálnímu mixu, v němž jsou investiční i provozní náklady na záložní zdroje, náklady na pokrývání výkyvů ve výrobě z obnovitelných zdrojů i ekonomické ztráty související s mařením elektřiny z obnovitelných zdrojů. Tato metodika tak implicitně zahrnuje i náklady na potřebné dotace, které by zajistily obnovitelný zdrojům rentabilitu.

Tato metoda nestraní ani proměnlivým obnovitelným zdrojům, ani stabilním jaderným zdrojům. Ve výpočtech hledáme nákladově co nejefektivnější dekarbonizaci Česka. (Ostatně výše uvedená dřívější studie otevřeně konstatuje, že pokud by se podařilo zajistit nízké investiční náklady u nových velkých jaderných bloků nebo se podaří obdobně zlevnit výstavbu SMRs, pak by rozvoj jaderné energetiky podstatně přispíval ke snížení celkových nákladů. Autoři studie však na základě širší sady scénářů nepovažují za strategické, aby Česko vsadilo _výhradně_ na rozvoj jaderné energetiky.)

V optimalizaci nejsou náklady na rozvoj a údržbu přenosové a distribuční soustavy, což je a bude podstatná část celkových nákladů. Tuto nedokonalost modelu studie otevřeně přiznává. Tyto náklady se budou zvyšovat mimo jiné kvůli další elektrifikaci a kvůli rostoucí spotřebě elektřiny. Dá se předpokládat, že ve scénáři výrazně většího rozvoje obnovitelných zdrojů budou tyto náklady vyšší než ve scénáři menšího rozvoje obnovitelných zdrojů. Tyto \"vícenáklady\" rozvoje OZE bychom do modelu rádi zahrnuli, ale nevíme o žádných dostatečně kvalitních a transparentních odhadech vztahu těchto nákladů s rozvojem OZE. Autoři studie velmi ocení, když kdokoliv v české energetice zpracuje kvalitní otevřenou studii s transparentní metodikou, vstupy a výstupy, na které bude možné dále stavět."
%}

{% include expander-figure.html
    name="oze-drazsi"
    class="qa-uhli"
    label="Státy s vysokým podílem fotovoltaických a větrných elektráren nemají nízkou cenu elektřiny pro zákazníka. Jak tedy může OZE zlevňovat elektřinu?"
    content="To je pravda, ale vyvozovat z takového srovnání jasné závěry ohledně cest k levné elektřině v budoucnu je metodologicky ošemetné.

Z hlediska současných nákladů je nejlevnější nic zásadního nedělat a těžit z velkých investic v minulých dekádách (např. francouzská \"flotila\" jaderných elektráren rychle stárne, a kdyby měla být průběžně obnovována, budou náklady a konečné ceny elektřiny určitě vyšší). Nicméně když použijeme analogii: pokud by stát zcela přestal opravovat své silnice, sice by určitě mohl snížit daně, byl by to ale důkaz prozíravé a efektivní správy?

Státy s vysokým podílem OZE (např. Německo) navíc podstatnou část tohoto rozvoje udělaly v době mnohem dražších obnovitelných technologií. Ceny solárních panelů za posledních 15 let [velmi výrazně klesly](/infografiky/cena-energie), k podstatnému poklesu nákladů došlo i u větrných elektráren. Odvozovat z toho nevýhodnost rozvoje OZE do budoucna je podobně zavádějící jako varovat před rozvojem fotovoltaiky na základě nepovedeného českého solárního boomu okolo roku 2010."
%}

{% include expander-figure.html
    name="dotace"
    class="qa-uhli"
    label="Fakta o klimatu doporučují provozní dotace, aby české OZE dokázaly konkurovat dotovaným německým OZE. Nebylo by lepší importovat dotovanou německou elektřinu?

Německo už od ledna 2025 nebude poskytovat nové smlouvy na 20leté garance výkupních cen, ale jen instalační dotace. Vyprázdněný státní rozpočet bohatého Německa to neumožňuje. Proč by mělo provozní dotace zavádět Česko?"
    content="Podobné interpretace provozních dotací vůbec neberou v potaz proběhlé reformy trhu s elektřinou v EU, kdy v principu nebude možné vyplácet nové provozní dotace v době záporných cen na trhu. Cílem tohoto nového mechanismu je nadále nestimulovat výrobu v době přebytků a přispět tak k omezování výskytu záporných cen na trhu. Tento mechanismus se ostatně projeví také u provozní podpory pro nový jaderný zdroj v Dukovanech.

Německo možná v budoucnu přejde na investiční dotace pro obnovitelné zdroje. To ale nesouvisí s tím, jak je německá státní pokladna prázdná nebo plná, a rozhodně neplatí, že by investiční dotace byly pro veřejné rozpočty výrazně levnější nebo efektivnější než dobře nastavené dotace provozní. Stejně tak neplatí, že by v Německu (z důvodu údajně vyprázdněné veřejné pokladny) chtěli omezovat tempo rozvoje obnovitelných zdrojů. Detailní diskuzi možné budoucí podpory OZE v Německu nabízí nedávná [publikace](https://www.bmwk.de/Redaktion/DE/Publikationen/Energie/20240801-strommarktdesign-der-zukunft.pdf?__blob=publicationFile&v=18) německého ministerstva pro hospodářství a ochranu klimatu (str. 26–54).

Ano, pro Česko by v principu bylo výhodné importovat německé přebytky dotované německými spotřebiteli. Se stejným argumentem by se ovšem dalo namítat, že nemá smysl provozně dotovat jaderné elektrárny a lepší by bylo nedostatek elektřiny v zimě řešit německými plynovými elektrárnami, které jsou podpořeny německými kapacitními platbami. To by však k energetické bezpečnosti nevedlo.

Určitě má smysl podporovat rozumný podíl obnovitelné elektřiny dobře nastavenou formou podpory (a totéž platí o podílu elektřiny z jádra). I když nebude napříč energetickým sektorem shoda, co je pro Česko rozumný podíl obnovitelné a jaderné elektřiny, dá se o tom dále věcně diskutovat."
%}

## Předpoklady vývoje v Evropě jsou dostatečně robustní

Jiná část výhrad se vztahuje k tomu, že předpoklad dalšího vývoje v Evropě a tedy i možností budoucího importu elektřiny je příliš optimistický. Podle výsledků modelování by ale **Česko nebylo podstatně závislé na importu**, dováželo by jen 3–4 % své roční spotřeby elektřiny. Předpoklady o rozvoji v zahraničí vycházejí z výhledu jednotlivých provozovatelů přenosových soustav v Evropě. Předpoklady se samozřejmě vždy do nějaké míry liší od reality. Naše dodatečné analýzy ale ukazují, že ani při pomalejším rozvoji zdrojů napříč Evropou nedodávky elektřiny v Česku nehrozí.


{% include expander-figure.html
    name="plyn-de"
    class="qa-uhli"
    label="Nespoléháte v modelování příliš na rozvoj plynových elektráren v Německu, který se v poslední době zadrhává? Není odhad dostupnosti dodávek levné elektřiny ze zahraničí v kritickém zimním období příliš optimistický?

Studie MAF22 od ČEPS říká, že už v roce 2030 budeme výrazně zdrojově nepřiměření. Není to v rozporu s vašimi výsledky?"
    content="Co se týče vývoje instalovaného výkonu v Německu a dalších státech v Evropě, vychází studie z pokladů provozovatelů přenosových soustav pro celoevropské modelování ERAA 2023 (v době zpracování modelování pro studii nebyly veřejně k dispozici novější data). V dodatečných analýzách (viz str. 25) zkoumáme scénář, při kterém by tempo rozvoje nových zdrojů bylo poloviční oproti předpokladům. Ani v této konfiguraci by v Česku nehrozily nedodávky nad úrovní normy spolehlivosti.

Předběžné podklady pro ERAA 2024 skutečně dávají o něco nižší odhady instalovaných výkonů plynových zdrojů v Německu, než se kterými za základě ERAA 2023 počítá naše studie. To ale nic nemění na podstatě výsledku: při vysoké ceně povolenky pro rok 2025 ani při rychlém rozvoji moderní energetiky pro rok 2028 nebude Česko podstatně závislé na dovozu elektřiny. Dovážet 3–4 % spotřeby není nic dramatického. K většině tohoto dovozu navíc dochází z tržních důvodů (v době levnější výroby v zahraničí). V Česku dostupné zdroje dokážou i po uzavření většiny uhelných elektráren pokrýt zimní špičky spotřeby.

Studie MAF 2022 je pesimističtější než naše modelování především pro Progresivní a Dekarbonizační scénář, pro vzdálenější horizonty 2035 a 2040 a zčásti i pro rok 2030. To ovšem vychází z toho, jak jsou scénáře analyzované v MAF sestaveny. Po roce 2030 totiž nepočítají s žádnými dalšími řiditelnými zdroji (kromě jaderných zdrojů), přestože předpokládaná spotřeba elektřiny výrazně stoupá. **To je komplikované vyjádření triviálního pozorování: pokud nebude Česko stavět dostatek nových řiditelných zdrojů, bude mít časem velký problém.** Nijak to ale není v rozporu s našimi výsledky pro roky 2025 a 2028."
%}

{% include expander-figure.html
    name="uhli-pro-jistotu"
    class="qa-uhli"
    label="Nevyplatilo by se kvůli nejistotě vývoje za našimi hranicemi nechat uhelné elektrárny v provozu déle?"
    content="Samozřejmě záleží na scénáři dalšího vývoje v Evropě. Pokud by ten scénář byl velice špatný (např. velmi pomalá výstavba plynových zdrojů napříč Evropou, výrazné technické problémy s francouzskými jadernými elektrárnami podobně jako před pár lety, problémy s cenou či dodávkami zemního plynu apod.), bude to mít silné dopady na možnosti a ceny importu elektřiny.

Naše studie vychází ze scénáře ERAA 2023 a v tomto scénáři nedodávky a extrémně vysoké ceny nehrozí. Každý si dokáže představit více či méně katastrofické scénáře, při kterých bude elektřina drahá (ostatně při nedávné plynové krizi byla drahá i s uhelnými zdroji).

Za každé snížení rizika se platí. Udržovat další roky v provozu (všechny) uhelné elektrárny je však podle našeho modelování nákladné, a to neúměrně ke snižování rizika.

O čem se jistě dá v rámci snižování rizika diskutovat, je převedení části dnes nepotřebných uhelných zdrojů do strategických rezerv, právě pro případ nečekaně nepříznivého geopolitického vývoje. Taková diskuze by ale vyžadovala kvalitní podklady k technické proveditelnosti, celkovým nákladům apod.

Další teoretickou možností (ta je nicméně v rozporu s evropskou legislativou) je nějaká forma podpory pro velmi omezený počet uhelných zdrojů a lomů, na zřetelně ohraničenou dobu. Taková podpora by mohla řešit další možné problémy s poskytováním podpůrných služeb nebo s udržením potřebné těžby pro teplárenství. Protože taková podpora by byla drahá jak ekonomicky, tak politicky (ve vztahu k EU), vyžadovala by důvěryhodnou analýzu, která vysvětlí, proč je nutná. Žádná taková analýza zatím neexistuje."
%}

## Česko potřebuje omezit rizika spojená s využíváním zemního plynu na výrobu elektřiny

Podle kritiků studie je přechod na zemní plyn dražší a riskantnější než udržet uhlí.

Dražší není – podle výsledků modelování při drahé emisní povolence je omezení výroby z uhlí a mírné navýšení výroby ze zemního plynu a dovozu elektřiny nejlevnější možné řešení.

O rizicích je ale důležité diskutovat. Studie rozhodně neprosazuje významný přechod na zemní plyn, protože s ním jsou spojeny ekonomické, geopolitické i klimatické problémy. Nicméně je třeba rozlišovat instalovaný výkon (např. investičně relativně levných špičkových zdrojů elektřiny) a celkovou roční výrobu.

Pro stabilitu soustavy a zajištění dodávek elektřiny je nutný vysoký instalovaný výkon řiditelných zdrojů: krátkodobě hlavně plynových, pomůže ale také akumulace nebo flexibilita spotřeby. V dlouhodobém horizontu může pomoci i rozvoj jaderné energetiky.

Všechny problémy spojené se zemním plynem se vztahují k objemu jeho celkové spotřeby. Ta souvisí s celkovou roční výrobou elektřiny (a tepla) ze zemního plynu. Tuto výrobu je z uvedených důvodů potřeba držet nízkou, jak je ostatně zmíněno i ve studii. Z kroků, jak v dalších 10 letech držet výrobu ze zemního plynu na přijatelně nízké úrovni, dávají smysl pouze tyto: rozvoj obnovitelných zdrojů (hlavně větrné energetiky) a s tím související rozvoj akumulace a flexibility spotřeby. Z dlouhodobého hlediska pak tyto kroky může doplnit rozvoj jaderné energetiky.

{% include expander-figure.html
    name="plyn-jak"
    class="qa-uhli"
    label="Nahradit více než 30 milionů tun těženého uhlí v ČR plynem znamená dovézt k současné spotřebě kolem 7 mld. m<sup>3</sup> dalších až 12 mld. m<sup>3</sup>. Kudy se tolik zemního plynu doveze?"
    content="V analyzovaném scénáři, kdy by byla z důvodu nerentability odstavena většina uhelných elektráren, narůstá spotřeba zemního plynu v modelu jen o 13 TWh, tedy asi 1,2 mld. m<sup>3</sup>.

Uvedený odhad 12 mld. m<sup>3</sup> je tedy řádově nadsazený a vychází z předpokladu, že je nutné zemním plynem nahradit veškerou primární energii uhlí. Tak to však není, a to ze dvou důvodů: (1) výroba elektřiny v moderních paroplynových elektrárnách je o 30–50 % účinnější než výroba ve starých uhelných elektrárnách, (2) Česko nepotřebuje nahradit veškerou současnou výrobu elektřiny z uhlí. Není třeba nahrazovat část, která se exportuje, a nebude potřeba nahrazovat část, kterou postupně nahradí obnovitelné zdroje."
%}

{% include expander-figure.html
    name="uhli-nevyplati"
    class="qa-uhli"
    label="Může se odklon od uhlí Česku ekonomicky vyplatit, když přijde o 20 mld. Kč z exportu elektřiny a bude mít dodatečné náklady okolo 100 mld. Kč za navýšení importu zemního plynu a o dalších 100 mld. Kč za import elektřiny?"
    content="Pojďme to přepočítat.
* Při výše zmíněném dovozu dalších 13 TWh zemního plynu by elektrárny za toto palivo zaplatily 9–13 mld. Kč. Horní odhad vychází z ceny 1 000 Kč/MWh (aktuální cena na TTF na rok 2025), dolní odhad vychází z ceny 670 Kč/MWh (aktuální cena na TTF na rok 2028).
* Česko by po odstavení většiny uhelných elektráren dováželo řádově 4 % elektřiny, nikoliv 40 %, které se z uhlí vyrábí dnes. Čisté náklady na přeshraniční výměnu by činily kolem 6 mld. Kč. Podle modelového scénáři by dovoz elektřiny ve výši 3,6 TWh ročně totiž stál okolo 9 mld. Kč, vývoz elektřiny ve výši 1 TWh elektřiny by naopak přinesl příjmy ve výši 3 mld. Kč.

Obě čísla ale nejsou relevantní, protože vyrábět místo toho více elektřiny z uhlí by bylo ještě dražší, hlavně kvůli vyšším nákladům na emisní povolenky. Proto ve světě s dražší emisní povolenkou nedává export uhelné elektřiny ekonomicky smysl. Podle výpočtů modelu by v roce 2028 stálo dotování uhelné energetiky jen pro zajištění vyrovnané importní bilance každoročně o 6 mld. Kč více."
%}

{% include expander-figure.html
    name="plyn-kudy"
    class="qa-uhli"
    label="Německo plánuje část své plynové infrastruktury přestavovat na vodík. Neomezí to možnosti importu zemního plynu do ČR? Kudy potřebný plyn dovezeme?"
    content="To je legitimní obava, kterou je potřeba řešit na úrovni mezinárodní diplomacie. Všechny (připravované) české energetické strategické dokumenty počítají v příštích 5–10 letech s mírně rostoucí spotřebou zemního plynu. Bezpečnost takového dovozu je nutné zajistit a současně je třeba snižovat spotřebu zemního plynu v dalších sektorech, např. energetickými renovacemi budov apod."
%}

{% include expander-figure.html
    name="plyn-klima"
    class="qa-uhli"
    label="S využitím zemního plynu jsou spojeny velké nepřímé emise skleníkových plynů – úniky metanu při těžbě a přepravě. Dává přechod na zemní plyn vůbec z hlediska klimatu smysl, když je emisně srovnatelná s výrobou z uhlí?

Evropa plánuje tyto nepřímé emise metanu také zatížit emisní povolenkou. Dává přechod na zemní plyn vůbec nějaký smysl ekonomicky?"
    content="Ano, s využitím zemního plynu jsou spojeny úniky metanu a CO<sub>2</sub> při těžbě a transportu. (To mimochodem platí i pro uhlí, při jehož těžbě v Česku unikají téměř 2 Mt skleníkových plynů, což je více než 1,5 % emisní stopy Česka.)

Výroba elektřiny ze zemního plynu i tak produkuje zhruba o třetinu nižší celkové emise než výroba elektřiny z uhlí (viz např. parametry IPCC nebo analýza Clean Air Task Force). To je z hlediska dekarbonizace neuspokojivé zlepšení, proto dává přechod na zemní plyn smysl jen při splnění těchto podmínek:

1. **Zemní plyn bude jen jako doplněk OZE** (a jádra). To znamená, že výroba ze zemního plynu nesmí nahradit výrobu uhlí 1:1, je třeba bezodkladně rozvíjet obnovitelné zdroje, akumulaci, flexibilitu spotřeby. I tak budou potřeba záložní zdroje elektřiny – plynové turbíny i paroplynové zdroje jsou pro to technicky vhodnější než uhelné zdroje, protože rychlými změnami výkonu mohou lépe doplňovat proměnlivou výrobu z OZE.
2. Je třeba **snižovat úniky metanu při těžbě i transportu** zemního plynu (viz níže).

Kromě toho je třeba v souladu s taxonomií EU co nejdříve přejít od zemního plynu k zeleným plynům (biometan, vodík) nebo využívat technologii zachytávání uhlíku CCUS. To nebude snadné ani levné zařídit pro velké instalované výkony nebo pro velké objemy výroby ze zemního plynu (kvůli omezené dostupnosti biometanu či vodíku, vysokým investičním nákladům technologie CCUS a omezením infrastruktury na ukládání CO<sub>2</sub>). **Z toho důvodu je třeba investice do plynových zdrojů velmi pečlivě zvažovat** a rozvíjet kromě nich také bezemisní nástroje k balancování soustavy jako např. akumulaci.

**Přechod na zemní plyn z hlediska trhu s elektřinou rozhodně smysl dává, protože není v plánu zatížit nepřímé emise metanu emisní povolenkou.** Evropská unie bude místo toho regulovat nepřímé emise metanu jiným způsobem. K postupnému snížení úniků metanu směřuje nedávno přijaté nařízení EU ([EU/2024/1787](https://energy.ec.europa.eu/news/new-eu-methane-regulation-reduce-harmful-emissions-fossil-fuels-europe-and-abroad-2024-05-27_en)), které navazuje na [strategii EU ke snížení emisí metanu](https://eur-lex.europa.eu/legal-content/CS/TXT/HTML/?uri=CELEX:52020DC0663) z roku 2020 i na [Global Methane Pledge](https://www.globalmethanepledge.org/) z konference COP26 v Glasgow v roce 2021. Toto nařízení požaduje po všech producentech dovážejících do EU ropu, uhlí a zemní plyn, aby od roku 2027 monitorovali a reportovali úniky metanu při těžbě a aby od roku 2030 plnili emisní limity (ty zatím nebyly stanoveny). V případě neplnění těchto limitů dojde na pokuty, jejichž výše ale bude v gesci jednotlivých členských států. Cílem tedy není zavést zpoplatnění veškerých úniků metanu, ale jen tlačit producenty k relativně snadným technickým opatřením, které tyto úniky podstatně sníží."
%}

## Co z toho plyne pro uhelnou energetiku v Česku?

**Diskuze o budoucnosti energetiky může být užitečná pouze v případě, že vychází z otevřených a transparentních výpočtů** (např. pomocí otevřených modelů s otevřenými vstupními daty, okrajovými podmínkami i výstupy). Zde zmiňovaná studie od výrobě elektřiny bez uhlí se snaží k této věcné diskuzi přispět. Aby mohla tato diskuze pokračovat, měly by vzniknout další, ještě kvalitněji zpracované otevřené studie, které by kritizované aspekty vylepšily.

Za interpretací výsledků si nicméně stojíme. Studie rozhodně neříká, že v Česku je možné okamžitě uzavřít všechny uhelné elektrárny kromě elektrárny Ledvice, nebo dokonce že by je Česko mělo okamžitě uzavřít. Studie pouze popisuje ekonomické faktory, které mohou vést k uzavírání uhelných elektráren, a tvrdí, že velká většina těchto elektráren není pro udržení zdrojové přiměřenosti potřeba.

V manažerském shrnutí studie navíc stojí, že je potřeba (i) udržet v provozu uhelné teplárny (a související nutnou těžbu uhlí) a (ii) urychleně najít náhradní řešení všech typů podpůrných služeb, které dnes uhelné elektrárny poskytují.

Na základě veřejně dostupných dat není v principu možné určit, jak přesně vypadá nejlevnější možná trajektorie postupného odklonu od uhelné energetiky. I na základě dostupných dat lze ale říci, že touto nejlevnější cestou rozhodně nebude plošné dotování výroby elektřiny z mnoha uhelných elektráren a udržení všech čtyř současných hnědouhelných lomů v provozu.

**Opravdu chce někdo dotovat výrobu elektřiny, kterou bude Česko exportovat?**
