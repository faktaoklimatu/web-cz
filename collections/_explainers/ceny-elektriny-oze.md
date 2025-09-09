---
layout:      explainer
title:       "Jak rozvoj solárních a větrných elektráren ovlivňuje ceny elektřiny?"
slug:        "ceny-elektriny-oze"
published:   2025-09-24
authors:
  - ids: ["matej-grabovsky", "jan-krcal"]
  - id: "matej-grabovsky"
    minor-role: "vizualizace"
  - id: "jirka-lnenicka"
    minor-role: "editace"
weight:      77
tags-scopes: [ eu ]
tags-topics: [ energetika ]
cover-source-author:      "Nick Nice"
cover-source-text:        "a house with a cloudy sky"
cover-source-license:     "Unsplash licence"
cover-source-license-url: "https://unsplash.com/license"
cover-source-url:         "https://unsplash.com/photos/a-house-with-a-cloudy-sky-PIoYdeasfU0"
perex: |
  Jak se rostoucí instalovaný výkon a výroba z fotovoltaických a větrných elektráren promítá do cen elektřiny pro koncové zákazníky? Slunce a vítr jednoznačně zlevňují velkoobchodní elektřinu, avšak o tom, jestli a jak se toto zlevnění projeví u konečných spotřebitelů, rozhodují i další položky na faktuře. V tomto explaineru vysvětlujeme, co tvoří cenu na faktuře a jak konkrétně státy EU přenášejí na konečné spotřebitele náklady a výnosy rozvoje obnovitelných zdrojů.
---

{% include tldr.html content="
- Rozvoj fotovoltaiky a větru jednoznačně snižuje velkoobchodní ceny elektřiny.
- O tom, jak se zlevňování promítne do konečných cen, rozhoduje mimo jiné struktura tarifů, rozložení nákladů mezi stát a různé skupiny spotřebitelů (domácnosti vs. podniky) a další pravidla.
- Ceny pro koncové zákazníky i regulace v oblasti energetiky jsou napříč Evropou dosti rozmanité. Proto se ceny i mezi jinak podobnými státy mohou významně lišit.
- Rozmanité jsou i nástroje, kterými státy platí za rozvoj obnovitelných zdrojů, případně kterými kompenzují vysoké ceny zranitelným skupinám spotřebitelů.
" %}

Ceny energií jsou silným tématem veřejné debaty, a to nejen v souvislosti s dekarbonizací. V nedávné době se dostaly do popředí zejména po Ruské invazi na Ukrajinu v roce 2022 a související "energetické krizi". Ačkoliv za zdražováním v tomto období stála zejména vysoká cena zemního plynu na světových trzích, nebyla zdaleka jedinou příčinou. Mnohé hlasy přisuzují zdražování Zelené dohodě pro Evropu (tzv. *Green Dealu*) a rozvoji obnovitelných zdrojů energie (OZE), zvláště pak fotovoltaických a větrných elektráren.

Realita je však složitější a do cen pro koncové zákazníky vstupuje mnoho různých, navzájem provázaných faktorů. Jak se tedy cena na fakturách za elektřinu stanovuje a jakou roli v tom opravdu hrají obnovitelné zdroje?

## Z čeho se skládá cena elektřiny na vyúčtování?

Ceny pro koncové zákazníky se tradičně rozdělují na tři složky:[^deleni-eurostat]

- **Energie a dodávky** (angl. *energy & supply*). Tuto složku tvoří náklady dodavatele, zejména náklady na nákup elektřiny na velkoobchodním trhu, administrativní náklady dodavatelské společnosti, služby pro zákazníky atd.
- **Náklady na sítě** (*network costs*). Tuto složku tvoří náklady na přenosovou a distribuční soustavu, mj. také poplatek za jistič, náklady ztrát v síti, systémové služby atd.
- **Daně a další poplatky** (*taxes & other levies*). Zbývající část faktury tvoří daň z přidané hodnoty (DPH), daň z elektřiny, environmentální daně, poplatky za podporu obnovitelných zdrojů, poplatky za jaderné zdroje atd.

{% include expander-figure.html
    name="regulovana-slozka"
    class="contrast-figure"
    label="Co je to regulovaná a neregulovaná složka?"
    content="
V Česku se faktura dělí na tzv. regulovanou složku, neregulovanou složku a daně. Neregulovaná složka odpovídá odpovídá první kategorii podle dělení výše, tedy ceně za energie a dodávky. Regulovaná složka v Česku zahrnuje náklady na sítě a navíc tzv. poplatek za podporované zdroje energií (POZE),* který však v oficiálních statistikách spadá až do třetí kategorie mezi daně a poplatky.

{:.longread-tiny}
\* Podporované zdroje energií zahrnují kromě fotovoltaických a větrných elektráren podporu i biomasy, využití odpadního tepla, vysoce účinné kogenerace a akumulace elektřiny.
"
%}

Například v roce 2024 platily za elektřinu české domácnost v průměru 32,2 ¢/kWh (přibližně 8 Kč/kWh).[^jednotka-ceny] Z toho přibližně čtvrtinu tvořily daně a poplatky, čtvrtinu náklady na sítě a polovinu energie a dodávky.

{% include figure.html
    name="slozky-ceny-cz.svg"
    class="narrow-figure"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

Jak je zřejmé z popisu výše, většinu položek na vyúčtování tvoří náklady nějakého aktéra v systému – ať už je to dodavatel, distributor, provozovatel přenosové soustavy nebo třeba stát. Pro důkladnější objasnění jednotlivých složek ceny a jejich výše nutné zavést pojem *systémové náklady* a vysvětlit rozdíl mezi náklady a cenami.

## Jaké jsou náklady na výrobu a dodávky elektřiny?

Pro zajištění spolehlivých dodávek elektrické energie je potřeba toho hodně zařídit: je nutné postavit infrastrukturu (stožáry, dráty, transformátory, rozvodny) a elektrárny, je nutné je udržovat v dobré kondici, je nutné zajistit palivo pro elektrárny a zařídit řadu dalších služeb (administrativa, provoz trhu s elektřinou). Všechny tyto činnosti stojí peníze. Součtu všech těchto nákladů v elektrizační soustavě se říká **systémové náklady**. Ty zahrnují:

- náklady na **stavbu, provoz a údržbu zdrojů energií** (elektráren, tepláren, akumulace, záložních zdrojů atd.),[^naklady-stabilizace] včetně mezd zaměstnanců, nákladů na palivo nebo emisní povolenky a přiměřeného zisku
- náklady na **stavbu, provoz a údržbu infrastruktury** (přenosové a distribuční soustavy), včetně nákladů provozovatelů soustav a jejich přiměřeného zisku
- **administrativní náklady** spojené s dodávkami energií (náklady dodavatelů elektřiny, regulačního úřadu, datového centra, provoz trhu s elektřinou atd.)

Všechny tyto náklady musí z dlouhodobého pohledu vždy někdo zaplatit. Typicky se tyto náklady vyúčtují skrz trh s elektřinou a cenovou regulaci ve faktuře koncovým spotřebitelům. Kromě toho se může část z nich pokrývat z různých dotačních fondů, ze státního rozpočtu apod. Následující sekce se proto zaměřují na složky, ze kterých faktura sestává, a jaká opatření nebo pravidla se běžně využívají pro rozdělení systémových nákladů (a výnosů) elektrizační soustavy mezi spotřebitele.

{% include figure.html
    name="naklady-vs-zdroje-financi.png"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}


Jelikož se systémové náklady hradí kombinací různých zdrojů a v různých časových horizontech, **ceny na vyúčtování nemusí vždy odpovídat aktuálním nákladům** spojeným s provozem a údržbou soustavy. V některých případech mohou být ceny elektřiny nižší, než odpovídá nákladům – dodavatel mohl například nakoupit levnou elektřinu dostatečně dlouho dopředu nebo mohou být národní pravidla nastavena tak, že zbylou část nákladů hradí stát ze svého rozpočtu (např. z daní nebo z výnosů z prodeje emisních povolenek[^povolenky-poze]). Jindy naopak mohou být ceny na fakturách (zejména v první složce) vyšší, než odpovídá nákladům – to pak znamená nadměrné zisky pro některé výrobce či dodavatele elektřiny.

Zatímco celkové systémové náklady se dají jen nepřesně odhadovat, oficiální statistiky o cenách elektřiny jsou spolehlivé a podávají zprávu alespoň o tom, jak se v průběhu času průměrné ceny (včetně jednotlivých složek) vyvíjejí pro různé skupiny spotřebitelů.

## Jak do nákladů a cen vstupuje rozvoj obnovitelných zdrojů?

Jak tedy výstavba a provoz obnovitelných zdrojů ovlivňuje systémové náklady a jak se tyto náklady promítají do cen elektřiny? Následující výčet není vyčerpávající – popisuje pouze hlavní způsoby, jimiž rozvoj obnovitelných zdrojů působí na ceny elektřiny.

Jak slunce a vítr **zlevňují** elektřinu na trhu:

- **Výroba z fotovoltaiky a větrných elektráren nahrazuje výrobu z dražších (typicky fosilních) zdrojů,** a snižuje tak průměrné velkoobchodní ceny (tzv. *merit order effect*). V důsledku tak dodavatelům elektřiny v průměru snižuje náklady na nákup silové elektřiny,[^moe-studie] a tak i neregulovanou složku vyúčtování.
- Analogicky výroba z fotovoltaiky tzv. "za elektroměrem" (např. na střeše rodinného domu nebo skladu) může nasytit část lokální spotřeby. Důsledkem je nižší poptávka po elektřině ze sítě, což opět v průměru sníží její cenu na trhu, protože na pokrytí poptávky stačí méně výkonu a tak i levnější zdroje.
- Díky nižší výrobě z fosilních paliv je pak nižší i poptávka po zemním plynu a emisních povolenkách, což může snižovat jejich cenu na trhu a tak může v průměru snížit i ceny elektřiny ve špičkách, kdy je potřeba zapojit více fosilních zdrojů elektřiny.

Jak mohou slunce a vítr zvyšovat náklady a tím elektřinu **zdražovat**:

- Obnovitelné zdroje často dostávají nějakou formu **státní podpory**, což může vést k vysokým nákladům,[^statni-podpora] které někdo musí zaplatit. Pokud se tato podpora vyúčtuje na faktuře, zvýší to spotřebitelům cenu elektřiny.
- Distribuovaná výroba elektřiny (oproti "staré", centralizované energetice) vyžaduje investice do nové **síťové infrastruktury** a posilování existující infrastruktury.
- Kvůli své proměnlivosti vyžadují **záložní zdroje**, které musí někdo zaplatit, aby byly provozuschopné. Existují různé způsoby, jak se tyto zálohy typicky financují (kapacitní trhy či strategické rezervy, *scarcity pricing*).
- Velký podíl obnovitelných zdrojů v síti může vyžadovat vyšší náklady na **vyrovnávání výkyvů** mezi výrobou a spotřebou. Časté zvyšování a snižování výkonu stojí tepelné elektrárny palivo navíc a také vede k rychlejšímu opotřebení, což provozovatelé promítají do nabízených cen za elektřinu a podpůrné služby.[^mareni]

Je důležité dodat, že zatímco **zdražující vlivy jsou spíše dočasného charakteru** (např. státní podpora se vyplácí pouze po omezenou dobu, investice na výstavbu nové infrastruktury jsou jednorázové a její následná údržba je výrazně levnější), **zlevňující vlivy přetrvávají dlouhodobě.** Zároveň mnohé ze zdražujících vlivů vyřeší postupující modernizace energetiky, technologická vylepšení a větší konkurence mezi firmami v sektoru.[^konkurence]

Provázanost zmíněných faktorů zjednodušeně ilustruje následující schéma.[^dalsi-faktory]

{% include figure.html
    name="diagram-faktoru.png"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

O tom, jak silně a jak rychle se jednotlivé faktory projeví v konečných cenách, rozhoduje zejména **nastavení pravidel státem, hlavně pak cenová regulace a tarifní struktura**. Právě tato pravidla určují, jakými kanály se systémové náklady rozloží mezi různé skupiny spotřebitelů, státní rozpočet a další zdroje financí.

Dá se to ilustrovat právě na tom, jaký vliv na konečné ceny elektřiny má snižování velkoobchodních cen. Mnohé studie evropského trhu s elektřinou dokazují, že **ke snižování velkoobchodních cen přispívá právě vyšší výroba ze slunce a větru**.[^moe-velikost-efektu] Do jaké míry a jak rychle se toto zlevnění projeví na vyúčtování však záleží i na dalších faktorech, z nichž hlavním je, jak moc jsou spotřebitelé vystavení velkoobchodním cenám (podrobněji viz sekce [*Dynamické tarify*](#dynamické-tarify) níže) a jakým způsobem se uhradí případné vyšší náklady na integraci proměnlivých zdrojů.

{% include figure.html
    name="diagram-faktoru-podil-oze.png"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

### Jak velký je vliv různých faktorů?

Kvantifikovat sílu provázání mezi různými faktory, které vstupují do ceny elektřiny, je obecně velmi obtížné, někdy i nemožné. Některé proměnné ale mají jasný mechanismus, jakým na ceny působí, a tak lze jejich vliv kvantifikovat poměrně přesně.

Cena zemního plynu patří mezi proměnné, které ceny elektřiny ovlivňují nejsilněji. Je to dáno tím, že cenu elektřiny hodinu po hodině určuje tzv. závěrný zdroj, kterým je často elektrárna spalující právě zemní plyn. Pro podrobnosti viz explainer [*Jak se na trhu stanovuje cena elektřiny?*](/explainery/cena-elektriny-na-trhu) Vliv dalších faktorů však nemusí být tak přímočarý jako v případě ceny plynu, neboť mechanismus působení může být mnohem složitější a nemusí se jednoznačně projevit v agregovaných datech.

{% capture priklad-vlivu %}
Podíváme-li se na to, jak souvisí cena zemního plynu s velkoobchodní cenou elektřiny, dostaneme následující graf. Ten ukazuje vztah mezi první složkou ceny a cenou zemního plynu v zemích EU v průběhu posledních 5–7 let. Světlé úsečky ukazují průměrný vliv ceny plynu na cenu elektřinu v jednotlivých zemích. Růžové reprezentují státy, kde je tento vztah pozitivní, tj. se zdražením plynu se zdražovala i elektřina.

{% include figure.html
    name="scatter-plyn-vs-energie.png"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

Příkladem složitější vazby může být vztah mezi výstavbou fotovoltaických a větrných elektráren a síťovou složkou ceny. Z letmého pohledu na data se může zdát, že vztah je jednoznačně pozitivní, ale mechanismus je ve skutečnosti složitější a méně přímočarý než u cen zemního plynu. Bohatší státy Evropské unie mají typicky více fotovoltaiky a větrníků. Zároveň ale mají i obecně vyšší cenovou hladinu, což zkresluje porovnání nákladů mezi státy.

{% include figure.html
    name="scatter-oze-vs-site.png"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

**Proč nejde předpovídat budoucnost na základě historických dat?** Kvůli komplexním interakcím mezi různými proměnnými, z nichž mnohé dostupná data nezachycují, nelze z historických dat v energetice jednoduše predikovat budoucí vývoj. Vzorce v datech, regulační a politická rozhodnutí se v průběhu času mění a nelze snadno říct, že když X v minulosti způsobilo Y, způsobí totéž i v budoucnu.

Například náklady na výstavbu nízkouhlíkové energetiky byly v roce 2010 větší než náklady pokračování výroby z fosilních paliv. Se zdražující emisní povolenkou a zlevňujícími nízkouhlíkovými technologiemi tomu ale v roce 2030 může být naopak.
{% endcapture %}

{% include expander-figure.html
    name="priklad-cena-zemniho-plynu"
    class="contrast-figure"
    label="Příklad: Vliv ceny zemního plynu a vliv výstavby OZE"
    content=priklad-vlivu
%}

## Jaké ceny a pravidla mají evropské státy?

Jak ukazuje následující graf pro rok 2024, koncové ceny elektřiny se mezi státy EU značně liší. Nejvíce za elektřinu v roce 2024 platily německé domácnosti, přibližně 40 centů na kWh dodané elektřiny (zhruba 10 Kč/kWh). Na opačném konci cenové škály se nacházely domácnosti v Bulharsku a Maďarsku, kde platili lehce nad 10 ¢/kWh (přibližně 2,5 Kč/kWh). Jak vysvětlit čtyřnásobný rozdíl mezi nejvyššími a nejnižšími cenami?

{% include figure.html
    name="ceny-eu.svg"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

Pro podrobnější pochopení rozdílů si ceny můžeme rozpadnout na jednotlivé složky (viz sekce [*Z čeho se skládá cena elektřiny na vyúčtování*](#z-čeho-se-skládá-cena-elektřiny-na-vyúčtování) výše). Na první pohled je zřejmé, že se v různých státech liší nejen koncové ceny, ale i podíl jednotlivých složek na ceně. Například v Řecku je podíl daní a poplatků malý a největší část ceny tvoří ceny za energii a dodávky. V Irsku, Rakousku a Nizozemsku jsou dokonce čisté daně záporné. Litva má nejvyšší podíl síťové složky, atd.

{% include figure.html
    name="ceny-eu-komponenty.png"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

V Česku stát první složku ceny (energie a dodávky) ovlivňuje jen nepřímo, s výjimkou krátkodobého zastropování cen energií v době energetické krize. Další složky ceny ale přímo reguluje skrz energetickou politiku, nastavení daní a cenovou regulaci v energetice.

Pohled za hranice Česka (nebo pohled za hranice energetiky) ukazuje, že existuje široká škála možností, jak takovou regulaci nastavit. Následující sekce na příkladech zemí EU ukazují různé možnosti nastavení pravidel, cenové regulace, tarifů atd. a možné dopady těchto rozhodnutí. Patří mezi ně

1. dynamické tarify (např. s cenami průměrovanými po dnech nebo měsících)
2. zastropování cen (pak je potřeba výrobce kompenzovat nebo jinak zajistit dostatečnou kapacitu pro pokrytí poptávky)
3. slevy na dani nebo vyúčtování
4. sociální tarify (speciální tarify nebo slevy pro zranitelné skupiny)
5. přesun nákladů do státního rozpočtu
6. oboustranné rozdílové smlouvy

### Dynamické tarify

Většina domácností v Česku (i dalších evropských státech) využívá dlouhodobě fixované tarify. U takových tarifů je cena elektřiny každou hodinu v roce stejná, zafixovaná ve smlouvě zpravidla na rok až dva dopředu. Tyto tarify domácnostem zásadně snižují nejistotu budoucích nákladů, ale neumožňují pružně reagovat na aktuální tržní podmínky.

U dynamických tarifů se ceny elektřiny (přesněji první složka, energie a dodávky) mění častěji, třeba každý měsíc nebo i každou hodinu, podle vývoje na velkoobchodním trhu. To umožňuje koncovým zákazníkům reagovat na aktuální přebytek nebo nedostatek elektřiny (např. odložením spotřeby do hodin s nižšími cenami), což je pro systém výhodné zejména při vysokém podílu proměnlivých obnovitelných zdrojů. V delším horizontu to také rychleji přenáší zlevnění (ale i zdražení) z trhu do vyúčtování.

Dynamické tarify vyžadují instalaci tzv. chytrých elektroměrů (angl. *smart meters*). Zatímco v Česku [rozvoj chytrých elektroměrů zaostává](https://iotbusinessnews.com/2024/02/22/06300-smart-electricity-meter-market-2024-global-adoption-landscape/), v některých státech EU je má [prakticky každá domácnost](https://aegis.acer.europa.eu/chest/dataitems/585/view).

Zjednodušeně lze dynamické tarify rozdělit na spotové (cena se mění hodinu po hodině podle velkoobchodního trhu) a variabilní (cena se průměruje za delší období, třeba týden nebo měsíc).[^kombinace-variabilnich] V širším smyslu sem mohou patřit i tzv. *time-of-use* tarify, kdy se cena mění podle denní doby, ale cenové úrovně jsou zafixované na delší dobu dopředu (příkladem je v Česku tzv. "noční proud", přesněji vysoký a nízký tarif).
Následující tři grafy ukazují vývoj silové složky ceny pro domácnosti ve srovnání s velkoobchodními cenami na příkladu tří zemí s vysokým podílem dynamických tarifů.

- V Dánsku jsou dynamické tarify rozšířené, na nějaké formě dynamického tarifu je přibližně [70 % domácností](https://www.thelocal.dk/20241115/can-you-save-money-in-denmark-this-winter-with-a-variable-rate-electricity-contract).
- Ve Španělsku je základní regulovaný tarif dynamický a využívá jej přibližně 28 % domácností.[^spanelsko-pvpc] Cena se určuje dílem z každodenních velkoobchodních cen, dílem z cen na dlouhodobém trhu (v roce 2025 byl tento poměr 60:40).
- V Řecku je na dynamickém tarifu většina domácností (v roce 2024 to bylo [až 90 %](https://www.reuters.com/world/europe/greece-offers-new-round-power-bill-subsidies-households-2024-12-06/)). Nejpopulárnějším je tzv. ["zelený tarif"](https://www.ekathimerini.com/economy/1270787/growing-number-of-consumers-opt-for-fixed-electricity-tariffs/), ve kterém se cena mění každý měsíc.

{% include figure.html
    name="spot-vs-energie-dynamicke.png"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

Naproti tomu domácnosti v Česku, Německu a Francii využívají převážně dlouhodobě fixované tarify, a proto maji ceny v těchto zemích větší setrvačnost.

{% include figure.html
    name="spot-vs-energie-fixovane.png"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

Kromě dynamických tarifů za samotnou dodávku elektřiny lze také nastavit flexibilně poplatek za *distribuci* elektřiny. Např. v Belgii se tento poplatek stanovuje podle špičkové spotřeby v daném měsíci (místo běžné platby podle celkem spotřebované elektřiny nebo podle velikosti jističe). V Dánsku i Španělsku mají distributoři [možnost nastavit síťové poplatky](https://ens.dk/sites/default/files/media/documents/2024-11/liberalisation_of_the_danish_power_sector_-_report_final.pdf) tak, aby motivovaly přesouvat spotřebu mimo špičky. Flexibilní poplatky za distribuci dále finančně motivují k uzpůsobení spotřeby situaci v síti.

V Česku je drtivá většina domácností na dlouhodobých tarifech. Spotový tarif má asi jen [1 % domácností](https://www.acer.europa.eu/sites/default/files/documents/Publications/2025-Retail-Monitoring-Report-Country-Sheets-Electricity.pdf#p=12). Chytrým elektroměrem disponují pouze [3 % domácností](https://aegis.acer.europa.eu/chest/dataitems/585/view) (průměr v EU je 60 %).

### Zastropování cen

Nejjednodušším způsobem regulace cen pro koncové zákazníky je jejich přímé snížení nebo zastropování. Dlouhodobě ceny domácnostem zastropují například [Bulharsko](https://www.bta.bg/en/news/economy/952789-household-electricity-bills-how-new-consumer-support-mechanism-works), [Maďarsko](https://abouthungary.hu/news-in-brief/hungarian-government-to-continue-utility-price-cap-scheme), [Polsko](https://www.reuters.com/business/energy/poland-keep-household-energy-price-freeze-2025-spend-13-bln-2024-11-19/) a [Slovensko](https://www.reuters.com/world/europe/slovak-government-extend-electricity-price-cap-households-2024-11-20/). Nejde jen o reakci na energetickou krizi – tyto země mají ceny elektřiny pro domácnosti dlouhodobě pod nákladovými cenami. V praxi to znamená, že náklady, které výrobci elektřiny tak jako tak mají, musí doplatit stát.

{% include figure.html
    name="spot-vs-energie-zastropovane.png"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

Přímé zastropování se většinou týká pouze domácností a často jen spotřeby do určité hranice, např. průměrné roční spotřeby. Nad touto hranicí může být cenový strop vyšší nebo může být cena neregulovaná.

Některé státy v energetické krizi použily určitou formu zastropování cen na burze. Španělsko a Portugalsko v letech 2022–2023 nastavily [cenový strop na zemní plyn](https://ec.europa.eu/commission/presscorner/detail/en/ip_22_3550) pro výrobce elektřiny (přičemž rozdíl zčásti dopláceli spotřebitelé ve speciálním poplatku, zčásti provozovatel přenosové soustavy z výnosů z exportu). Záměrem bylo zlevnit nabídkovou cenu elektřiny ze zemního plynu a tím snížit průměrné ceny na burze. Toto opatření bylo široce kritizováno, neboť zlevnění plynu (resp. zastropování jeho ceny) ekonomicky nemotivuje ke snížení jeho spotřeby.[^kritika-stropu-plynu]

V Česku se zastropovaly koncové ceny elektřiny (a zemního plynu) pouze v roce 2023.

### Slevy na dani a vyúčtování

Stát může domácnostem nabízet slevu na dani nebo na celém vyúčtování za elektřinu.

- V Nizozemsku jde o dlouhodobý program [fixní slevy na](https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/overige_belastingen/belastingen_op_milieugrondslag/energiebelasting/) dani, která postupem času roste (v přepočtu od cca 8 000 Kč ročně za každé odběrné místo v roce 2017 po cca 13 000 Kč v roce 2025). Takovou fixní slevou na dani stát občanům snižuje celkové platby za elektřinu, přitom ale plně zachová motivaci k energetickým úsporám. V tomto aspektu je takové opatření výhodnější než zastropovaná elektřina.
- V Irsku se v letech 2022–2025 na vyúčtování automaticky aplikovala sleva (v roce 2024 [přibližně 6 000 Kč](https://www.citizensinformation.ie/en/consumer/utilities/electricity-account-credit/)). Podobné dočasné opatření zavedlo Rakousko v roce 2022. Jednalo se o jednorázovou [slevu ve výši přibližně 3 700 Kč](https://www.bmf.gv.at/dam/jcr%3Ad430ba6a-ad9a-4ef1-8345-2d9cdced97c0/20220504_FAQs%20total_english%20%281%29.pdf) (v přepočtu), které si domácnosti mohly odečíst z vyúčtování za elektřinu.

Tyto slevy lze vidět v datech, nejlépe na výrazně negativních daních pro domácnosti s nízkou spotřebou.

{% include figure.html
    name="ceny-slevy.png"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

V Česku se slevy na dani v souvislosti s energiemi neuplatňují.

### Sociální tarify

Sociální tarify jsou dalším způsobem, jak snížit dopady drahé elektřiny na obyvatelstvo. Narozdíl od zastropování cen ovšem mohou být přesně zacílené na obyvatele ohrožené energetickou chudobou a tím dosáhnout většího sociálního efektu za méně peněz.

- Itálie nabízí [slevu z vyúčtování](https://www.arera.it/consumatori/bonus-sociale/bonus-sociale-per-disagio-economico/a-quanto-ammontano): nízkopříjmové domácnosti si můžou zažádat o slevu (podle velikosti domácnosti od cca 300 Kč po 500 Kč měsíčně), která se jim strhává při každém vyúčtování. Podobně jako nizozemská sleva na dani jde o fixní slevu a tak motivuje k energetickým úsporám.
- Belgie obdobně nabízí [sociální tarif](https://www.creg.be/fr/consommateurs/prix-et-tarifs/tarif-social/tarif-social-pour-lenergie). Jde o speciální zlevněný tarif pro zranitelné domácnosti (např. pro některé příjemce sociálních dávek nebo nájemníky v sociálních bytech). Cena se určuje každý kvartál podle nejlevnějšího tarifu v předchozím měsíci, navíc je omezeno, jak moc může cena v sociálním tarifu mezi kvartály vzrůst.
- Francie od roku 2019 nabízí [voucher pro nízkopříjmové domácnosti](https://www.cre.fr/en/electricity/retail-electricity-market/presentation.html), který se může použít na část plateb za elektřiny nebo na nákladů na energetickou renovaci.
- Irsko poskytuje [slevy na vyúčtování](https://www.citizensinformation.ie/en/social-welfare/extra-social-welfare-benefits/household-benefits-package/) seniorům nad 70 let a dalším zranitelným skupinám obyvatel.

V Česku žádné sociální tarify na energie nejsou. Nicméně platby za energie vstupují do výpočtu [příspěvku na bydlení](https://www.mpsv.cz/prispevek-na-bydleni).

### Přesun nákladů do rozpočtu

Německo díky velkým investicím nastartovalo velký (globální) boom obnovitelných zdrojů, zejména fotovoltaických elektráren, a dodnes za to platí. V 10. letech dokonce ceny pro koncové zákazníky rostly rostly, přestože velkoobchodní klesaly, právě kvůli nákladům na podporu OZE, které platí právě zákazníci ve formě speciálního poplatku na vyúčtování. Během energetické krize v roce 2022 německá vláda [rozhodla o trvalém zrušení](https://www.cleanenergywire.org/news/germany-stops-landmark-mechanism-funded-renewables-expansion-power-bills) tohoto poplatku a přesunu nákladů do státního rozpočtu, což mimo jiné znatelně ulevilo rapidně rostoucím cenám. Ke stejnému kroku přistoupilo například i Dánsko [už v roce 2017](https://www.pv-magazine.com/2017/05/22/danish-government-unveils-bill-to-introduce-tax-on-self-consumed-pv-power/).

Následující graf ukazuje rozložení [nákladů na podporu obnovitelných zdrojů](https://www.netztransparenz.de/de-de/Erneuerbare-Energien-und-Umlagen/EEG/Transparenzanforderungen/EEG-Konten%C3%BCbersicht) v Německu mezi spotřebitele a státní rozpočet od roku 2010.

{% include figure.html
    name="naklady-nemecko.png"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

Obdobně se stát může rozhodnout přenést do rozpočtu část nákladů pro jiné složky ceny, např. nákladů na sítě.[^verejna-infrastruktura]

V Česku se poplatek za podporované zdroje energií dočasně (od října 2022 do prosince 2023) plně [přesunul do státního rozpočtu](https://www.mesec.cz/aktuality/domacnosti-i-firmy-zacnou-opet-v-pristim-roce-platit-poplatky-za-obnovnitelne-zdroje-energie-poze/). Náklady na sítě v Česku (s výjimkou nákladů placených z evropských dotačních fondů) plně nesou spotřebitelé.

### Oboustranné rozdílové smlouvy

Oboustranná [rozdílová smlouva](https://frankbold.org/zpravodaj/kategorie/aktualne/rozdilove-smlouvy-inovativni-nastroj-pro-podporu-obnovitelnych-zdroju-energie) (angl. *two-way contract for difference* nebo *2-way CfD*) umožňuje, aby státy poskytly investorům do nových obnovitelných (případně jaderných) zdrojů větší jistotu návratnosti, a zároveň zajišťuje, že případné dodatečné výnosy se státu vrátí.

Hlavní součástí smlouvy je tzv. *strike price*, tedy průměrná cena elektřiny, při které je projekt dostatečně návratný. Ta se typicky určuje formou aukce. Když je cena elektřiny na trhu nižší a provozovatelé elektráren mají nedostatečné výnosy z prodeje vyrobené elektřiny, stát na jejich provoz doplácí. Když je naopak cena vyšší, provozovatelé část tržeb vrací státu.

Běžným záměrem je stanovovat *strike price* tak, aby tyto smlouvy byly pro stát přibližně nákladově neutrální. U většiny typů nových zdrojů elektřiny totiž není nutné je systematicky dotovat, rozdílové smlouvy hlavně zásadně snižují vysoké investiční riziko, tím projekty výrazně zlevňují a umožňují jejich realizaci.

Z hlediska ceny elektřiny je zásadní, jakým způsobem a kdo platí případné náklady těchto smluv a stejně jak a kdo získává případné výnosy. Napříč Evropou jsou režimy různé, náklady a výnosy může nést stát nebo spotřebitelé elektřiny nebo se mohou dělit mezi stát a mezi spotřebitele.

Rozdílové smlouvy se pro podporu obnovitelných zdrojů používají v mnoha evropských zemích, např. ve [Velké Británii](https://www.businessenergydeals.co.uk/blog/contracts-for-difference/), [Polsku](https://www.dentons.com/en/insights/newsletters/2025/january/24/powered-by-dentons/powered-by-dentons-january-2025/result-of-polands-2024-res-auctions), [Litvě](https://renewablesnow.com/news/lithuania-to-relaunch-700-mw-offshore-wind-tender-on-june-9-1276449/), [Rumunsku](https://balkangreenenergynews.com/romania-declares-winners-of-its-wind-solar-power-cfd-auctions/), [Maďarsku](https://www.ait.ac.at/fileadmin/mc/energy/downloads/IES/Projekte/Comparision_of_CfD_related_best_practices.pdf#page=14), [Španělsku](https://www.ait.ac.at/fileadmin/mc/energy/downloads/IES/Projekte/Comparision_of_CfD_related_best_practices.pdf#page=22) a dalších.[^dalsi-cfd]

{% include figure.html
    name="cfd-vyuctovani.png"
    alt="TODO: Alt text"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/ceny-elektriny-oze"
%}

Skrytou formou rozdílových smluv je do jisté míry i (spolu)vlastnictví energetických firem státem – zisky (nebo jejich část) firmy odvádí státu na dividendách, ztráty také hradí stát jako majitel-investor. Dva příklady:

- Francouzský EDF (státem vlastněný výhradní provozovatel jaderných elektráren) musí elektřinu z jaderných zdrojů [prodávat konkurenčním dodavatelům za nízké ceny](https://www.world-nuclear-news.org/Articles/Agreement-on-post-ARENH-nuclear-electricity-pricin) (42 €/MWh do roku 2025, 70 €/MWh od roku 2026). Výnosy EDF nad touto hladinou stát přerozděluje.
- Podobně Česko těží ze svých stávajících jaderných elektráren, primárně ve formě dividend z ČEZu, provozovatele jaderných elektráren Temelín a Dukovany. Od roku 2000, kdy ČEZ začal dividendy vyplácet, z nich [stát obdržel 350 miliard korun](https://ct24.ceskatelevize.cz/clanek/ekonomika/cez-vyplati-dividendu-z-lonskeho-zisku-47-korun-za-akcii-celkove-253-miliardy-362257).

V Česku stála za solárním boomem v letech 2006–2010 "starší" forma provozní podpory, garantovaná výkupní cena (angl. *feed-in tariff*), která provozovateli elektrárny zaručuje pevnou cenu za každou kilowatthodinu dodanou do sítě. Takto jednoduché schéma má však více problémů, například motivuje dodávat do sítě, i když je elektřiny přebytek, nebo neumožňuje k zákazníkům vrátit část potenciálních nadměrných zisků.

## Zdroje a poznámky

[^deleni-eurostat]: Toto zjednodušené dělení odpovídá klasifikaci [podle Eurostatu](https://ec.europa.eu/eurostat/cache/metadata/en/nrg_pc_204_sims.htm) a často se používá ve energetických statistikách evropských států.
[^jednotka-ceny]: Pro ceny v tomto explaineru budeme pro konzistenci používat jednotku ¢/kWh (eurocent na kilowatthodinu elektřiny). Pro přibližný převod na Kč/kWh lze zjednodušeně dělit čtyřmi (kurz 1 € ≈ 25 Kč).
[^naklady-stabilizace]: To zahrnuje i náklady na stabilizaci soustavy, vyrovnávání výkyvů atd.
[^povolenky-poze]: V Česku se takto platí z výnosů část poplatků na podporu obnovitelných zdrojů energie.
[^moe-studie]: Viz např. [studie IMF](https://doi.org/10.5089/9798400224362.001) z roku 2022. Záleží však na tom, jak dlouho dopředu dodavatel energií elektřinu nakupuje, resp. jak přímo je zákazník vystaven velkoobchodním cenám (viz dále v explaineru).
[^statni-podpora]: Podpora pro výstavbu solární energetiku v Česku okolo roku 2010 vedla ke každoročním nákladům ve výši desítek miliard korun. Od té doby se ale technologie obnovitelných zdrojů výrazně zlevnily a tak státní podpora nemusí nutně vést k vysokým veřejným nákladům. Současný doporučený způsob podpory je formou tzv. rozdílových smluv (angl. *contracts for difference*, CfD), což dokonce může přinášet výnosy do státního rozpočtu. Viz sekce dále v explaineru.
[^mareni]: Vzhledem k tomu, že výroba z fotovoltaických (v menší míře i větrných) elektráren je často korelovaná přes velké území, může docházet k plnému vytížení přeshraničních přenosových linek a nutnosti využít náhradní zdroje elektřiny. Tím vznikají náklady na maření elektřiny, *congestion management* a redispečink. Do jisté míry se jedná o náklady pomalého rozvoje sítí v minulosti.
[^konkurence]: Například pro vyrovnávání výkyvů dnes slouží hlavně konvenční, často fosilní, a tedy drahé, elektrárny. Čím dál relevantnějšími technologiemi jsou však bateriová úložiště a flexibilita spotřeby, které na výkyvy dokáží reagovat rychleji, flexibilněji a v důsledku levněji než konvenční elektrárny.
[^dalsi-faktory]: Jednotlivé složky, a tedy i výsledné ceny, ovlivňují i další faktory (a komplexní vazby mezi nimi): spotřeba elektřiny, geografické podmínky a počasí, průměrná cenová hladina dané ekonomiky, kapacity přeshraničních spojení a další. Tyto proměnné zde pro zjednodušení pomíjíme.
[^moe-velikost-efektu]: Historicky zvýšení podílu slunce a větru na výrobě o jeden procentní bod snižovalo tržní ceny v různých zemích v průměru o 0,6–0,8 %. Viz např. [working paper IMF (2022)](https://doi.org/10.5089/9798400224362.001), [Kolb et al. (2020)](https://ideas.repec.org/a/eee/rensus/v134y2020ics1364032120305955.html), [Bourn et al. (2021)](https://ayrtonb.github.io/Merit-Order-Effect/), [BBVA Research (2025)](https://www.bbvaresearch.com/wp-content/uploads/2025/02/EW_Reaping_the_benefits_edi2docxFinal.pdf), [Clò et al. (2015)](https://ideas.repec.org/a/eee/enepol/v77y2015icp79-88.html).
[^kombinace-variabilnich]: Případně se oba přístupy dají kombinovat, např. 60 % ceny ze spotového trhu a 40 % z dlouhodobějších trhů (jako v případě španělského tarifu [PVPC](https://www.ree.es/en/operation/electricity-system/pvpc)).
[^spanelsko-pvpc]: Španělsky [*precio voluntario pequeño consumidor*](https://www.ree.es/en/operation/electricity-system/pvpc), PVPC.
[^kritika-stropu-plynu]: Vedlo to také k vyššímu exportu elektřiny vyrobené ze zemního plynu do Francie. Navíc kompenzace v podobě položky na vyúčtování za elektřinu znamenala menší finanční úspory pro domácnosti. Takové opatření plošné zároveň pokřivuje trh, neboť dopad na zákazníky s fixními tarify byl větší na ty s variabilními. Více viz [Center on Global Energy Policy](https://www.energypolicy.columbia.edu/wp-content/uploads/2023/05/Iberian-Exception_Commentary_CGEP_051723-2.pdf) a [ACER](https://acer.europa.eu/sites/default/files/documents/Publications/2023_MMR_EmergencyMeasures.pdf).
[^verejna-infrastruktura]: Zatímco rozvoj a údržba některých typů veřejné infrastruktury se hradí převážně z veřejných financí (např. silniční síť), rozvoj a údržbu elektrické sítě platí skoro výhradně spotřebitelé dodávané elektřiny. Jde o podstatné peníze: náklady na přenosovou a distribuční soustavu v Česku tvoří 20–30 % průměrné ceny na vyúčtování.
[^dalsi-cfd]: Základní přehled rozdílových smluv napříč Evropou a rozbor několik případových studií poskytuje report [*Comparison of CfD-related best practices across Europe*](https://www.ait.ac.at/fileadmin/mc/energy/downloads/IES/Projekte/Comparision_of_CfD_related_best_practices.pdf) výzkumného centra REKK z roku 2024.
