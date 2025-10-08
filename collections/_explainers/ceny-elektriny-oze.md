---
layout:      explainer
title:       "Jak rozvoj solárních a větrných elektráren ovlivňuje ceny elektřiny?"
slug:        "ceny-elektriny-oze"
published:   2025-10-02
authors:
  - ids: ["matej-grabovsky", "jan-krcal"]
  - ids: ["marcel-otruba", "matej-grabovsky"]
    minor-role: "vizualizace"
  - id: "jirka-lnenicka"
    minor-role: "editace"
weight:      77
tags-scopes: [ eu ]
tags-topics: [ energetika ]
cover-source-author:      "Arno Senoner"
cover-source-text:        "A wind farm with a wind turbine in the background"
cover-source-license:     "Unsplash licence"
cover-source-license-url: "https://unsplash.com/license"
cover-source-url:         "https://unsplash.com/photos/a-wind-farm-with-a-wind-turbine-in-the-background-6lOxktnqo04"
perex: |
  Jak se rostoucí instalovaný výkon a výroba z fotovoltaických a větrných elektráren promítá do cen elektřiny pro koncové zákazníky? Solární a větrné elektrárny jednoznačně zlevňují velkoobchodní elektřinu. Cenu elektřiny pro koncové spotřebitele však významně ovlivňují i další položky, například daně nebo náklady na rozvoj sítí, které záleží hlavně na regulacích v daném státě. Následující text vysvětluje, z čeho se cena elektřiny na faktuře skládá, a popisuje různé způsoby, jimiž státy EU přenášejí náklady a výnosy rozvoje obnovitelných zdrojů na konečné spotřebitele.
---

{% include tldr.html content="
- Rozvoj fotovoltaiky a větru jednoznačně snižuje velkoobchodní ceny elektřiny.
- O tom, jak se zlevňování promítne do konečných cen pro zákazníky, rozhoduje mimo jiné struktura tarifů, rozložení nákladů mezi stát a různé skupiny spotřebitelů (domácnosti vs. podniky) a další pravidla.
- Ceny elektřiny pro koncové zákazníky i regulace v oblasti energetiky jsou napříč Evropou dost rozmanité. I mezi jinak podobnými státy se mohou značně lišit.
- Různé jsou také nástroje, jimiž státy platí za rozvoj obnovitelných zdrojů, případně kompenzují vysoké ceny elektřiny ekonomicky zranitelným skupinám spotřebitelů.
" %}

Ceny energií jsou silným tématem veřejné debaty, a to nejen v souvislosti s dekarbonizací. V nedávné době se dostaly do popředí zejména po ruské invazi na Ukrajinu v roce 2022 a následné "energetické krizi". Ačkoliv za zdražováním v tomto období stála zejména vysoká cena zemního plynu na světových trzích, nebyla zdaleka jedinou příčinou.

Mnohé hlasy přisuzují zdražování Zelené dohodě pro Evropu (tzv. *Green Dealu*) a rozvoji obnovitelných zdrojů energie (OZE), zvláště pak fotovoltaických a větrných elektráren. Realita je však složitější a do cen pro koncové zákazníky vstupuje mnoho různých, navzájem provázaných faktorů. Jak se tedy cena na fakturách za elektřinu stanovuje a jakou roli v tom skutečně hrají obnovitelné zdroje?

## Z čeho se skládá cena elektřiny na vyúčtování?

Ceny pro koncové zákazníky se zpravidla rozdělují na tři složky:[^deleni-eurostat]

- **Energie a dodávky** (angl. *energy & supply*). Tuto složku tvoří náklady dodavatele, zejména náklady na nákup elektřiny na velkoobchodním trhu, administrativní náklady dodavatelské společnosti, služby pro zákazníky atd.
- **Náklady na sítě** (*network costs*). Tuto složku tvoří náklady na přenosovou a distribuční soustavu, mj. také poplatek za jistič, náklady ztrát v síti, systémové služby apod.
- **Daně a další poplatky** (*taxes & other levies*). Zbývající část ceny na faktuře tvoří daň z přidané hodnoty (DPH), daň z elektřiny, environmentální daně, poplatky za podporu obnovitelných zdrojů, poplatky za jaderné zdroje atd.

{% include expander-figure.html
    name="regulovana-slozka"
    class="contrast-figure"
    label="Co je to regulovaná a neregulovaná složka?"
    content="
V Česku se cena na vyúčtování skládá z tzv. regulované složky, neregulované složky a daně. Neregulovaná složka odpovídá odpovídá první kategorii podle dělení výše, tedy ceně za energie a dodávky. Regulovaná složka v Česku zahrnuje náklady na sítě a navíc tzv. poplatek za podporované zdroje energií (POZE),* který však v oficiálních statistikách spadá až do třetí kategorie mezi daně a poplatky.

{:.longread-tiny}
\* Podporované zdroje energií zahrnují kromě fotovoltaických a větrných elektráren podporu i biomasy, využití odpadního tepla, vysoce účinné kogenerace a akumulace elektřiny.
"
%}

Například v roce 2024 platily české domácnosti za elektřinu v průměru 0,32 €/kWh (přibližně 8 Kč/kWh).[^jednotka-ceny] Z toho přibližně čtvrtinu tvořily daně a poplatky, čtvrtinu náklady na sítě a polovinu cena za energie a dodávky.

{% include figure.html
    name="slozky-ceny-cz.png"
    class="narrow-figure"
    alt="Skládaný sloupcový graf ukazující skladbu průměrné ceny elektřiny pro české domácnosti v roce 2024 (celkem 0,32 €/kWh). Největší podíl tvořily náklady dodavatelů (51 %), menší části pak náklady na sítě, DPH a ostatní daně."
    source-text="Eurostat"
    source-url="https://ec.europa.eu/eurostat/databrowser/product/view/nrg_pc_204_c"
%}

Jak je zřejmé z popisu výše, většinu položek ve vyúčtování tvoří náklady některého aktéra v celém systému – ať už je to dodavatel, distributor, provozovatel přenosové soustavy nebo třeba stát.

Pro důkladnější objasnění jednotlivých složek ceny a jejich výše je nutné vysvětlit pojem *systémové náklady* a rozdíl mezi náklady a cenami. Tomu se věnuje následující kapitola textu.

## Jaké jsou náklady na výrobu a dodávky elektřiny?

K zajištění spolehlivých dodávek elektřiny je toho potřeba hodně zařídit: je nutné postavit elektrárny a infrastrukturu pro přenos a distribuci (stožáry, dráty, transformátory, rozvodny), to vše je nutné udržovat v dobrém technickém stavu, kromě toho je rovněž nutné zajistit palivo pro elektrárny a zařídit řadu dalších služeb (spojených např. s administrativou a provozem trhu s elektřinou). Součtu všech těchto nákladů v elektrizační soustavě se říká **systémové náklady**. Ty zahrnují:

- náklady na **stavbu, provoz a údržbu zdrojů energií** (elektráren, tepláren, akumulace, záložních zdrojů atd.),[^naklady-stabilizace] včetně mezd zaměstnanců, nákladů na palivo nebo emisní povolenky a také přiměřeného zisku
- náklady na **stavbu, provoz a údržbu infrastruktury** (přenosové a distribuční soustavy), včetně nákladů provozovatelů soustav a jejich přiměřeného zisku
- **administrativní náklady** spojené s dodávkami energií (náklady dodavatelů elektřiny, regulačního úřadu, datového centra, provoz trhu s elektřinou apod.)

Všechny tyto náklady musí z dlouhodobého pohledu vždy někdo zaplatit. Typicky se tak děje na trhu s elektřinou a skrz cenovou regulaci na vyúčtování koncovým spotřebitelům. Kromě toho mohou část z nich pokrývat různé dotační fondy, státní rozpočet a podobně. Následující část textu se zaměřuje na složky, z nichž se cena na faktuře skládá, a popisuje, jaká opatření nebo pravidla se běžně využívají pro rozdělení systémových nákladů (a výnosů) elektrizační soustavy mezi spotřebitele.

{% include figure.html
    name="naklady-vs-zdroje-financi.png"
    alt="Tabulka se dvěma sloupci. Sloupec vlevo s nadpisem Systémové náklady: náklady na zdroje energií, náklady na infrastrukturu, administrativní náklady. Sloupec vpravo s nadpisem Zdroje financí: vyúčtování domácností, vyúčtování podniků a institucí, státní pokladna, fondy a dotační programy."
%}

Protože se systémové náklady hradí kombinací různých zdrojů a v různých časových horizontech, **ceny na vyúčtování nemusejí vždy odpovídat aktuálním nákladům** spojeným s provozem a údržbou soustavy. V některých případech mohou být ceny elektřiny nižší, než odpovídá nákladům – dodavatel mohl například nakoupit levnou elektřinu dostatečně dlouho dopředu nebo mohou být národní pravidla nastavena tak, že zbylou část nákladů hradí stát ze svého rozpočtu (např. z daní či z výnosů z prodeje emisních povolenek[^povolenky-poze]). Jindy naopak mohou být ceny na fakturách (zejména v první složce) vyšší, než odpovídá nákladům – některým výrobcům či dodavatelům elektřiny to pak přináší nadměrné zisky.

Zatímco celkové systémové náklady se dají odhadovat jen nepřesně, oficiální statistiky o cenách elektřiny jsou spolehlivé a podávají zprávu alespoň o tom, jak se v průběhu času průměrné ceny (včetně jednotlivých složek) vyvíjejí pro různé skupiny spotřebitelů.

## Jak do nákladů a cen vstupuje rozvoj obnovitelných zdrojů?

Jak tedy systémové náklady ovlivňuje výstavba a provoz obnovitelných zdrojů a jak se tyto náklady promítají do cen elektřiny? Následující výčet není vyčerpávající – popisuje pouze hlavní způsoby, jimiž rozvoj obnovitelných zdrojů působí na ceny elektřiny.

Jak slunce a vítr **zlevňují** elektřinu na trhu:

- **Výroba z fotovoltaických a větrných elektráren nahrazuje výrobu z dražších (typicky fosilních) zdrojů,** a snižuje tak průměrné velkoobchodní ceny (tzv. *merit order effect*). V důsledku tak dodavatelům elektřiny v průměru snižuje náklady na nákup silové elektřiny,[^moe-studie] a tím i neregulovanou složku vyúčtování.
- Analogicky výroba z fotovoltaiky tzv. "za elektroměrem" (např. na střeše rodinného domu nebo skladu) může nasytit část lokální spotřeby. Důsledkem je nižší poptávka po elektřině ze sítě, což opět v průměru sníží její cenu na trhu, protože na pokrytí poptávky stačí méně výkonu a tedy i levnější zdroje.
- Díky nižší výrobě z fosilních paliv je pak nižší i poptávka po zemním plynu a emisních povolenkách, což může snižovat jejich cenu na trhu a tedy i v průměru snížit ceny elektřiny ve špičkách, kdy je potřeba zapojit více fosilních zdrojů.

Jak mohou slunce a vítr zvyšovat náklady a tím elektřinu **zdražovat**:

- Obnovitelné zdroje často dostávají nějakou formu **státní podpory**, což může vést k vysokým nákladům,[^statni-podpora] které někdo musí zaplatit. Pokud se tato podpora vyúčtuje na faktuře, zvýší to cenu elektřiny koncovým spotřebitelům.
- Distribuovaná výroba elektřiny vyžaduje (ve srovnání s dřívější centralizovanou energetikou) **investice do** nové síťové **infrastruktury** a posilování už existující infrastruktury.
- Kvůli své proměnlivosti vyžadují **záložní zdroje**, které pokryjí spotřebu v delších obdobích, kdy málou fouká a nesvítí slunce. Provoz záložních zdrojů je oproti běžným zdrojům dražší, protože běží jen po malou část roku, ale jejich provozovatelé musí i tak zaplatit jejich výstavbu, údržbu a další fixní náklady. Existují různé způsoby, jak se tyto zálohy typicky financují (kapacitní trhy či strategické rezervy nebo tzv. [*scarcity pricing*](https://blueprint.raponline.org/scarcity-pricing/)).
- Velký podíl obnovitelných zdrojů v síti může vyžadovat vyšší náklady na okamžité **vyrovnávání výkyvů** mezi výrobou a spotřebou pomocí tepelných elektráren. Časté zvyšování a snižování výkonu stojí tyto elektrárny palivo navíc a také vede k rychlejšímu opotřebení, což jejich provozovatelé promítají do nabízených cen za elektřinu a podpůrné služby.[^mareni]

K výše uvedenému je zároveň důležité dodat, že zatímco **zdražující vlivy jsou spíše dočasného charakteru** (např. státní podpora se vyplácí pouze po omezenou dobu, investice na výstavbu nové infrastruktury jsou jednorázové a její následná údržba už je výrazně levnější), **zlevňující vlivy přetrvávají dlouhodobě.** Zároveň mnohé ze zdražujících vlivů vyřeší postupující modernizace energetiky, technologická vylepšení a větší konkurence mezi firmami v sektoru.[^konkurence]

Provázanost zmíněných faktorů zjednodušeně ilustruje následující schéma.[^dalsi-faktory]

{% include figure.html
    name="diagram-faktoru.png"
    class="wide-figure-desktop"
    alt="Schéma s šipkami znázorňující, z jakých složek se skládá konečná cena elektřiny na faktuře. Hlavními částmi jsou energie a dodávky, náklady na sítě a daně s poplatky, které se dále větví na faktory jako velkoobchodní ceny, investice do infrastruktury či podpora obnovitelných zdrojů. Diagram ukazuje provázanost regulačních, technických a tržních vlivů."
%}

{% include preview-box.html
    title="Role státu, trhu a regulací"
    text="O tom, jak se v průběhu času proměňovaly role státu a trhu s elektřinou, a o možnostech dalšího vývoje v Evropské unii, pojednává související text."
    slug="vyvoj-systemu-elektriny"
%}

O tom, jak silně a jak rychle se jednotlivé faktory projeví v konečných cenách elektřiny, rozhoduje zejména **nastavení pravidel státem, hlavně pak cenová regulace a tarifní struktura**. Právě tato pravidla určují, jakými kanály se systémové náklady rozloží mezi různé skupiny spotřebitelů, státní rozpočet a další zdroje financí.

Dá se to ukázat na tom, jaký vliv na konečné ceny elektřiny má snižování velkoobchodních cen (viz schéma níže). Mnohé studie evropského trhu s elektřinou dokazují, že **ke snižování velkoobchodních cen přispívá právě vyšší výroba ze slunce a větru**.[^moe-velikost-efektu] Do jaké míry a jak rychle se toto zlevnění projeví na vyúčtování však záleží i na dalších faktorech – především na tom, jak hodně jsou spotřebitelé vystaveni velkoobchodním cenám (podrobněji viz sekce [*Dynamické tarify*](#dynamické-tarify) v další kapitole) a jakým způsobem se uhradí případné vyšší náklady na integraci proměnlivých zdrojů.

{% include figure.html
    name="diagram-faktoru-podil-oze.png"
    alt="Výřez z myšlenkové mapy ukazuje část faktorů tvořících cenu elektřiny. Vizuálně podtrhuje, že složka „Energie a dodávky“ závisí na velkoobchodní ceně elektřiny, kterou ovlivňuje mimo jiné podíl fotovoltaiky a větru na výrobě."
%}

### Jak velký je vliv jednotlivých faktorů?

Určit míru provázanosti jednotlivých faktorů, které ovlivňují cenu elektřiny, je obecně velmi obtížné, někdy i nemožné. Některé proměnné ale mají jasný mechanismus, jakým na ceny působí, proto lze jejich vliv kvantifikovat poměrně přesně.

Cena zemního plynu patří mezi proměnné, jež ceny elektřiny ovlivňují nejsilněji. Je to dáno tím, že cenu elektřiny hodinu po hodině určuje tzv. závěrný zdroj, kterým je často právě elektrárna spalující zemní plyn (podrobněji viz text [*Jak se na trhu stanovuje cena elektřiny?*](/explainery/cena-elektriny-na-trhu)).

Vliv dalších faktorů už tak přímočarý být nemusí – mechanismus působení může být mnohem složitější a nemusí se jednoznačně projevit v agregovaných datech.

{% capture priklad-vlivu %}
Vztah mezi první složkou ceny a cenou zemního plynu v zemích EU v průběhu posledních 5–7 let ukazuje následující graf. Úsečky ukazují průměrný vliv ceny plynu na cenu elektřiny v jednotlivých zemích, barevné úsečky reprezentují státy, kde se zdražením plynu zdražovala i elektřina (a šedé úsečky státy, kde se zlevňovala).

{% include figure.html
    name="scatter-plyn-vs-energie-des.png"
    name-mobile="scatter-plyn-vs-energie-mob.png"
    alt="Bodový graf s regresními čarami ukazující vztah mezi průměrnou cenou zemního plynu a cenou elektřiny v EU. Ve většině zemí ceny elektřiny rostou spolu s cenou plynu, přičemž Řecko, Irsko a Itálie vykazují silnou závislost a Finsko naopak slabší. Graf zdůrazňuje rozdílnou citlivost jednotlivých států na vývoj cen plynu."
    source-text="Eurostat, výpočty Fakta o klimatu"
%}

Příkladem složitější vazby může být vztah mezi výstavbou fotovoltaických a větrných elektráren a síťovou složkou ceny. Z letmého pohledu na data se může zdát, že vztah je jednoznačně pozitivní, ale mechanismus je ve skutečnosti složitější a méně přímočarý než u cen zemního plynu. Bohatší státy Evropské unie obvykle mají fotovoltaických a větrných elektráren více, zároveň ale mají i obecně vyšší cenovou hladinu, což porovnání nákladů mezi státy zkresluje.

{% include figure.html
    name="scatter-oze-vs-site-des.png"
    name-mobile="scatter-oze-vs-site-mob.png"
    alt="Bodový graf ukazující vztah mezi instalovaným výkonem solárních a větrných elektráren a síťovou složkou ceny elektřiny v zemích EU. V Belgii náklady na sítě klesaly i při postupné výstavbě zdrojů, zatímco v Nizozemsku rychlý rozvoj obnovitelných zdrojů vedl k růstu těchto nákladů. Celkově graf ilustruje rozdílný dopad rozšiřování obnovitelných zdrojů na ceny sítí v jednotlivých zemích."
    source-text="Eurostat, Ember, výpočty Fakta o klimatu"
%}

{% endcapture %}

{% include expander-figure.html
    name="priklad-cena-zemniho-plynu"
    class="contrast-figure"
    label="Příklad: Vliv ceny zemního plynu a vliv výstavby OZE"
    content=priklad-vlivu
%}

**Proč nejde předpovídat budoucnost na základě historických dat?** Kvůli komplexním interakcím mezi různými proměnnými, z nichž mnohé nejsou v dostupných datech zachyceny, nelze z historických dat v energetice jednoduše predikovat budoucí vývoj. Vzorce v datech, ale i regulační a politická rozhodnutí se v průběhu času mění, a nelze proto snadno říct, že když *X* v minulosti způsobilo *Y*, způsobí totéž i v budoucnu.

Například náklady na výstavbu nízkouhlíkové energetiky byly v roce 2010 větší než náklady spojené s pokračující výrobou z fosilních paliv. Se zdražující emisní povolenkou a zlevňujícími nízkouhlíkovými technologiemi to ale v roce 2030 už může být naopak.

## Jaké ceny a pravidla mají jinde v Evropě?

Jak ukazuje následující graf pro rok 2024, koncové ceny elektřiny se mezi jednotlivými státy EU značně liší. Nejvíce za elektřinu v roce 2024 platily německé domácnosti – přibližně 40 centů na kWh dodané elektřiny (zhruba 10 Kč/kWh). Na opačném konci cenové škály se nacházely domácnosti v Bulharsku a Maďarsku, kde lidé platili jen o málo více než 10 centů na kWh (přibližně 2,5 Kč/kWh). Jak tento čtyřnásobný rozdíl mezi nejvyššími a nejnižšími cenami vysvětlit?

{% include figure.html
    name="ceny-eu-des.png"
    name-mobile="ceny-eu-mob.png"
    alt="Sloupcový graf porovnávající průměrné ceny elektřiny pro domácnosti v zemích EU v roce 2024. Nejvyšší cenu mělo Německo (0,41 €/kWh), nejnižší Maďarsko (0,11 €/kWh), zatímco Česko (0,32 €/kWh) se nachází mírně nad průměrem EU (0,29 €/kWh)."
    source-text="Eurostat"
    source-url="https://ec.europa.eu/eurostat/databrowser/product/view/nrg_pc_204_c"
%}

Pro podrobnější pochopení rozdílů se lze podívat na jednotlivé složky ceny (viz sekce [*Z čeho se skládá cena elektřiny na vyúčtování*](#z-čeho-se-skládá-cena-elektřiny-na-vyúčtování) výše). Na první pohled je zřejmé, že se v různých státech liší nejen koncové ceny, ale i podíl jednotlivých složek na ceně. Například v Řecku je podíl daní a poplatků malý a největší část ceny tvoří ceny za energii a dodávky. V Irsku, Rakousku, Nizozemsku a Lucembursku jsou dokonce čisté daně záporné. Litva má zase nejvyšší podíl síťové složky a tak dál.

{% include figure.html
    name="ceny-eu-komponenty-des.png"
    name-mobile="ceny-eu-komponenty-mob.png"
    alt="Skládaný sloupcový graf porovnávající ceny elektřiny pro domácnosti v EU v roce 2024 podle jejich složek. Ukazuje podíly nákladů na energie, sítě, DPH a další daně, přičemž některé státy mají zápornou složku díky daňovým slevám."
    source-text="Eurostat"
    source-url="https://ec.europa.eu/eurostat/databrowser/product/view/nrg_pc_204_c"
%}

V Česku stát první složku ceny (energie a dodávky) ovlivňuje jen nepřímo, s výjimkou krátkodobého zastropování cen energií v době energetické krize. Další složky ceny ale reguluje přímo pomocí energetické politiky, nastavení daní a prostřednictvím cenové regulace v energetice.

Pohled za hranice Česka (nebo pohled za hranice energetiky) nicméně ukazuje, že existuje široká škála možností, jak takovou regulaci nastavit. Následující část textu na příkladech zemí EU ukazuje různé možnosti nastavení pravidel, cenové regulace, tarifů atd. a možné dopady těchto rozhodnutí. Patří mezi ně:

1. dynamické tarify (např. s cenami průměrovanými po dnech nebo měsících)
2. zastropování cen
3. slevy na dani nebo vyúčtování
4. sociální tarify (speciální tarify nebo slevy pro ekonomicky zranitelné skupiny)
5. přesun nákladů do státního rozpočtu
6. oboustranné rozdílové smlouvy

### Dynamické tarify

Většina domácností v Česku (i dalších evropských státech) využívá dlouhodobě fixované tarify. U takových tarifů je cena elektřiny každou hodinu v roce stejná, zafixovaná ve smlouvě zpravidla na rok až dva dopředu. Tyto tarify domácnostem značně snižují nejistotu budoucích nákladů, ale neumožňují pružně reagovat na aktuální tržní podmínky.

**U dynamických tarifů se ceny elektřiny** (přesněji první složka – energie a dodávky) **mění častěji, třeba každý měsíc nebo i každou hodinu**, podle vývoje na velkoobchodním trhu. To umožňuje koncovým zákazníkům reagovat na aktuální přebytek nebo nedostatek elektřiny (např. odložením spotřeby do hodin s nižšími cenami), což je pro systém výhodné zejména při vysokém podílu proměnlivých obnovitelných zdrojů. V delším horizontu to také rychleji přenáší zlevnění (ale i zdražení) z trhu do vyúčtování.

Dynamické tarify vyžadují instalaci tzv. chytrých elektroměrů (angl. *smart meters*). Zatímco v Česku [rozvoj chytrých elektroměrů zaostává](https://iotbusinessnews.com/2024/02/22/06300-smart-electricity-meter-market-2024-global-adoption-landscape/), v některých státech EU je má [prakticky každá domácnost](https://aegis.acer.europa.eu/chest/dataitems/585/view).

Zjednodušeně lze dynamické tarify rozdělit na spotové (cena se mění hodinu po hodině podle velkoobchodního trhu) a variabilní (cena se průměruje za delší období, třeba týden nebo měsíc).[^kombinace-variabilnich] V širším smyslu sem mohou patřit i tzv. *time-of-use* tarify, kdy se cena mění podle denní doby, ale cenové úrovně jsou zafixované na delší dobu dopředu (příkladem je v Česku tzv. "noční proud", přesněji vysoký a nízký tarif).

Následující tři grafy ukazují vývoj silové složky ceny pro domácnosti ve srovnání s velkoobchodními cenami na příkladu tří zemí s vysokým podílem dynamických tarifů.

- V Dánsku jsou dynamické tarify rozšířené, některý z nich má přibližně [70 % domácností](https://www.thelocal.dk/20241115/can-you-save-money-in-denmark-this-winter-with-a-variable-rate-electricity-contract).
- Ve Španělsku je základní regulovaný tarif dynamický a využívá jej přibližně 28 % domácností.[^spanelsko-pvpc] Cena vychází zčásti z každodenních velkoobchodních cen, zčásti z cen na dlouhodobém trhu (v roce 2025 byl tento poměr 60:40).
- V Řecku má dynamický tarif většina domácností (v roce 2024 to bylo [až 90 %](https://www.reuters.com/world/europe/greece-offers-new-round-power-bill-subsidies-households-2024-12-06/)). Nejpopulárnější je tzv. ["zelený tarif"](https://www.ekathimerini.com/economy/1270787/growing-number-of-consumers-opt-for-fixed-electricity-tariffs/), ve kterém se cena mění každý měsíc.

{% include figure.html
    name="spot-vs-energie-dynamicke-des.png"
    name-mobile="spot-vs-energie-dynamicke-mob.png"
    alt="Čárové grafy ukazující vývoj velkoobchodních cen elektřiny a cen pro domácnosti v Dánsku, Řecku a Španělsku mezi lety 2017–2024. Ve všech třech zemích ceny prudce stouply kolem roku 2022 a poté rychle klesly. Anotace zdůrazňuje, že v těchto zemích se velkoobchodní ceny rychle promítají do koncových cen pro domácnosti."
    source-text="Eurostat, Energy-Charts.info"
%}

Naproti tomu domácnosti v Česku, Německu a Francii využívají převážně dlouhodobě fixované tarify, proto mají ceny v těchto zemích větší setrvačnost.

{% include figure.html
    name="spot-vs-energie-fixovane-des.png"
    name-mobile="spot-vs-energie-fixovane-mob.png"
    alt="Čárové grafy srovnávající velkoobchodní ceny elektřiny a ceny pro domácnosti v Česku, Francii a Německu mezi lety 2017–2024. Ve všech zemích došlo k prudkému nárůstu velkoobchodních cen kolem roku 2022, ale oproti předchozí sadě grafů se zdražení promítlo do cen domácností až s odstupem."
    source-text="Eurostat, Energy-Charts.info"
%}

Kromě dynamických tarifů za samotnou dodávku elektřiny lze nastavit flexibilně také poplatek za *distribuci* elektřiny. Např. v Belgii se tento poplatek stanovuje podle špičkové spotřeby v daném měsíci (místo běžné platby podle celkového množství spotřebované elektřiny nebo podle velikosti jističe). V Dánsku i Španělsku mají distributoři [možnost nastavit síťové poplatky](https://ens.dk/sites/default/files/media/documents/2024-11/liberalisation_of_the_danish_power_sector_-_report_final.pdf) tak, aby motivovaly přesouvat spotřebu mimo špičky. Flexibilní poplatky za distribuci dále finančně motivují uzpůsobit spotřebu situaci v síti.

V Česku má naprostá většina domácností dlouhodobé tarify. Spotový tarif má asi jen [1 % domácností](https://www.acer.europa.eu/sites/default/files/documents/Publications/2025-Retail-Monitoring-Report-Country-Sheets-Electricity.pdf#p=12) a chytrým elektroměrem disponují pouze [3 % domácností](https://aegis.acer.europa.eu/chest/dataitems/585/view) (průměr v EU je 60 %).

### Zastropování cen

Nejjednodušším způsobem regulace cen pro koncové zákazníky je jejich přímé snížení nebo zastropování. Dlouhodobě ceny domácnostem zastropovává například [Bulharsko](https://www.bta.bg/en/news/economy/952789-household-electricity-bills-how-new-consumer-support-mechanism-works), [Maďarsko](https://abouthungary.hu/news-in-brief/hungarian-government-to-continue-utility-price-cap-scheme), [Polsko](https://www.reuters.com/business/energy/poland-keep-household-energy-price-freeze-2025-spend-13-bln-2024-11-19/) či [Slovensko](https://www.reuters.com/world/europe/slovak-government-extend-electricity-price-cap-households-2024-11-20/). Nejde jen o reakci na energetickou krizi – tyto země mají ceny elektřiny pro domácnosti dlouhodobě pod nákladovými cenami. V praxi to znamená, že náklady, které výrobci elektřiny tak jako tak mají, musí doplatit stát.

{% include figure.html
    name="spot-vs-energie-zastropovane-des.png"
    name-mobile="spot-vs-energie-zastropovane-mob.png"
    alt="Čárové grafy ukazující vývoj velkoobchodních cen elektřiny, cen pro domácnosti a pro průmysl v Maďarsku, Bulharsku, Polsku a na Slovensku mezi lety 2017–2024. Ceny pro domácností zůstávají díky zastropování stabilně nízké, zatímco komerční ceny kopíruje velkoobchodní."
    source-text="Eurostat, Energy-Charts.info"
%}

Přímé zastropování se většinou týká pouze domácností a často jen spotřeby do určité hranice, např. průměrné roční spotřeby. Nad touto hranicí může být cenový strop vyšší nebo může být cena neregulovaná.

Některé státy během energetické krize použily určitou formu zastropování cen na burze. Španělsko a Portugalsko v letech 2022–2023 nastavily [cenový strop na zemní plyn](https://ec.europa.eu/commission/presscorner/detail/en/ip_22_3550) pro výrobce elektřiny (přičemž rozdíl zčásti dopláceli spotřebitelé ve speciálním poplatku, zčásti pak provozovatel přenosové soustavy z výnosů z exportu). Záměrem bylo zlevnit nabídkovou cenu elektřiny ze zemního plynu a tím snížit průměrné ceny na burze. Toto opatření bylo široce kritizováno, neboť zlevnění plynu (resp. zastropování jeho ceny) ekonomicky nemotivuje ke snížení jeho spotřeby.[^kritika-stropu-plynu]

V Česku byly ceny elektřiny (a zemního plynu) pro koncové spotřebitele zastropovány pouze v roce 2023.

### Slevy na dani a vyúčtování

Stát může domácnostem nabízet slevu na dani nebo na celém vyúčtování za elektřinu.

- V Nizozemsku jde o dlouhodobý program [fixní slevy na dani](https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/overige_belastingen/belastingen_op_milieugrondslag/energiebelasting/), která postupem času roste (v přepočtu od cca 8 000 Kč ročně za každé odběrné místo v roce 2017 po cca 13 000 Kč v roce 2025). Takovou fixní slevou na dani stát občanům snižuje celkové platby za elektřinu, přitom ale plně zachová motivaci k energetickým úsporám. V tomto ohledu jde o výhodnější opatření, než je zastropování ceny elektřiny.
- V Irsku se v letech 2022–2025 na vyúčtování automaticky aplikovala sleva (v roce 2024 v přepočtu [přibližně 6 000 Kč](https://www.citizensinformation.ie/en/consumer/utilities/electricity-account-credit/)). Podobné dočasné opatření zavedlo Rakousko v roce 2022. Jednalo se o jednorázovou [slevu v přepočtu ve výši přibližně 3 700 Kč](https://www.bmf.gv.at/dam/jcr%3Ad430ba6a-ad9a-4ef1-8345-2d9cdced97c0/20220504_FAQs%20total_english%20%281%29.pdf), které si domácnosti mohly z vyúčtování za elektřinu odečíst.

Tyto slevy lze vidět v datech, nejlépe na výrazně negativních daních v těchto zemích pro domácnosti s nízkou spotřebou.

{% include figure.html
    name="ceny-slevy-des.png"
    name-mobile="ceny-slevy-mob.png"
    alt="Skládané sloupcové grafy porovnávající ceny elektřiny podle spotřeby domácností v Nizozemsku, Irsku a Rakousku. V Nizozemsku se výrazně projevuje daňová sleva, zejména u domácností s nízkou spotřebou, což vede až k záporné složce daní. V Irsku a Rakousku jsou rozdíly mezi nízkou a vysokou spotřebou méně výrazné."
    source-text="Eurostat"
    source-url="https://ec.europa.eu/eurostat/databrowser/product/view/nrg_pc_204_c"
%}

V Česku se slevy na dani v souvislosti s energiemi neuplatňují.

### Sociální tarify

Sociální tarify jsou další možností, jak dopady drahé elektřiny na obyvatelstvo snížit. Na rozdíl od zastropování cen mohou být přesněji zacílené na obyvatele ohrožené energetickou chudobou a tím dosáhnout většího sociálního efektu za méně peněz.

- Itálie nabízí [slevu z vyúčtování](https://www.arera.it/consumatori/bonus-sociale/bonus-sociale-per-disagio-economico/a-quanto-ammontano): nízkopříjmové domácnosti si mohou zažádat o slevu (podle velikosti domácnosti je to v přepočtu od cca 300 Kč po 500 Kč měsíčně), jež se jim strhává při každém vyúčtování. Podobně jako nizozemská sleva na dani jde o fixní slevu, která motivuje k energetickým úsporám.
- Belgie obdobně nabízí [sociální tarif](https://www.creg.be/fr/consommateurs/prix-et-tarifs/tarif-social/tarif-social-pour-lenergie) – speciální zlevněný tarif pro ekonomicky zranitelné domácnosti (např. pro některé příjemce sociálních dávek nebo nájemníky v sociálních bytech). Cena se určuje každý kvartál podle nejlevnějšího tarifu v předchozím měsíci. Navíc je omezeno, o kolik se může mezi kvartály zvýšit.
- Francie od roku 2019 nabízí [voucher pro nízkopříjmové domácnosti](https://www.cre.fr/en/electricity/retail-electricity-market/presentation.html), který lze využít na část plateb za elektřinu nebo na náklady spojené s energetickou renovací.
- Irsko poskytuje [slevy na vyúčtování](https://www.citizensinformation.ie/en/social-welfare/extra-social-welfare-benefits/household-benefits-package/) seniorům nad 70 let a dalším ekonomicky zranitelným skupinám obyvatel.

V Česku žádné sociální tarify na energie nejsou, nicméně platby za energie vstupují do výpočtu [příspěvku na bydlení](https://www.mpsv.cz/prispevek-na-bydleni).

### Přesun nákladů do rozpočtu

Německo v minulosti díky velkým investicím nastartovalo velký (globální) boom obnovitelných zdrojů, zejména fotovoltaických elektráren, a dodnes za to platí. V první dekádě tohoto století dokonce ceny pro koncové zákazníky rostly, přestože velkoobchodní klesaly – právě kvůli nákladům na podporu OZE, které zákazníci platili formou speciálního poplatku ve vyúčtování. Během energetické krize v roce 2022 však německá vláda [rozhodla o trvalém zrušení](https://www.cleanenergywire.org/news/germany-stops-landmark-mechanism-funded-renewables-expansion-power-bills) tohoto poplatku a přesunu nákladů do státního rozpočtu, což mimo jiné znatelně ulevilo velmi rychle rostoucím cenám. Ke stejnému kroku přistoupilo například Dánsko [už v roce 2017](https://www.pv-magazine.com/2017/05/22/danish-government-unveils-bill-to-introduce-tax-on-self-consumed-pv-power/).

Následující graf ukazuje rozložení [nákladů na podporu obnovitelných zdrojů](https://www.netztransparenz.de/de-de/Erneuerbare-Energien-und-Umlagen/EEG/Transparenzanforderungen/EEG-Konten%C3%BCbersicht) v Německu (podle tzv. zákona EEG, něm. *Erneuerbare-Energien-Gesetz*) mezi spotřebitele, federální rozpočet a fond na podporu obnovitelných zdrojů (od roku 2010).

{% include figure.html
    name="naklady-nemecko-des.png"
    name-mobile="naklady-nemecko-mob.png"
    alt="Skládaný sloupcový graf zobrazující financování podpory obnovitelných zdrojů v Německu v letech 2010–2024. Do roku 2022 náklady nesli převážně spotřebitelé přes poplatky na vyúčtování, zatímco po energetické krizi a od roku 2024 je financování zajištěno z federálního rozpočtu. Výše potřebné podpory se v průběhu let měnila v závislosti na rozvoje nových zdrojů a tržních cenách elektřiny."
    source-text="Netztransparenz"
    source-url="https://www.netztransparenz.de/de-de/Erneuerbare-Energien-und-Umlagen/EEG/Transparenzanforderungen/EEG-Konten%C3%BCbersicht"
%}

Obdobně se stát může rozhodnout přenést do rozpočtu část nákladů tvořících jiné složky ceny, např. část nákladů na sítě.[^verejna-infrastruktura]

V Česku se poplatek za podporované zdroje energií dočasně (od října 2022 do prosince 2023) plně [přesunul do státního rozpočtu](https://www.mesec.cz/aktuality/domacnosti-i-firmy-zacnou-opet-v-pristim-roce-platit-poplatky-za-obnovnitelne-zdroje-energie-poze/). Náklady na sítě v Česku (s výjimkou nákladů placených z evropských dotačních fondů) hradí pouze spotřebitelé.

### Oboustranné rozdílové smlouvy

Díky oboustranné [rozdílové smlouvě](https://frankbold.org/zpravodaj/kategorie/aktualne/rozdilove-smlouvy-inovativni-nastroj-pro-podporu-obnovitelnych-zdroju-energie) (angl. *two-way contract for difference* nebo *2-way CfD*) mohou státy poskytnout investorům do nových obnovitelných (případně jaderných) zdrojů větší jistotu návratnosti a zároveň je zajištěno, že případné dodatečné výnosy se státu vrátí.

Hlavní součástí takové smlouvy je tzv. *strike price*, tedy průměrná cena elektřiny, při které má projekt dostatečnou návratnost. Tato cena se typicky určuje formou aukce. Když je cena elektřiny na trhu nižší a provozovatelé elektráren mají nedostatečné výnosy z prodeje vyrobené elektřiny, stát na jejich provoz doplácí. Když je naopak cena vyšší, provozovatelé část tržeb vrací státu.

Běžným záměrem je stanovovat *strike price* tak, aby tyto smlouvy byly pro stát přibližně nákladově neutrální. U většiny typů nových zdrojů elektřiny totiž není nutné je systematicky dotovat – rozdílové smlouvy hlavně významně snižují vysoké investiční riziko, čímž projekty výrazně zlevňují a umožňují jejich realizaci.

Z hlediska ceny elektřiny je zásadní, jak a kdo platí případné náklady těchto smluv a jak a kdo získává případné výnosy. Napříč Evropou to funguje různě: náklady a výnosy může nést stát či spotřebitelé elektřiny nebo se mohou mezi stát a spotřebitele dělit.

Rozdílové smlouvy se na podporu obnovitelných zdrojů využívají v mnoha evropských zemích, např. ve [Velké Británii](https://www.businessenergydeals.co.uk/blog/contracts-for-difference/), [Polsku](https://www.dentons.com/en/insights/newsletters/2025/january/24/powered-by-dentons/powered-by-dentons-january-2025/result-of-polands-2024-res-auctions), [Litvě](https://renewablesnow.com/news/lithuania-to-relaunch-700-mw-offshore-wind-tender-on-june-9-1276449/), [Rumunsku](https://balkangreenenergynews.com/romania-declares-winners-of-its-wind-solar-power-cfd-auctions/), [Maďarsku](https://www.ait.ac.at/fileadmin/mc/energy/downloads/IES/Projekte/Comparision_of_CfD_related_best_practices.pdf#page=14), [Španělsku](https://www.ait.ac.at/fileadmin/mc/energy/downloads/IES/Projekte/Comparision_of_CfD_related_best_practices.pdf#page=22) a jinde.[^dalsi-cfd]

Skrytou formou rozdílových smluv je do jisté míry i (spolu)vlastnictví energetických firem státem – zisky (nebo jejich část) firmy odvádí státu na dividendách, ztráty také hradí stát jako majitel-investor. Dva příklady:

- Francouzský EDF (státem vlastněný výhradní provozovatel jaderných elektráren) musí elektřinu z jaderných zdrojů [prodávat konkurenčním dodavatelům za nízké ceny](https://www.world-nuclear-news.org/Articles/Agreement-on-post-ARENH-nuclear-electricity-pricin) (42 €/MWh do roku 2025, 70 €/MWh od roku 2026). Výnosy EDF nad touto hladinou stát přerozděluje.
- Podobně Česko těží ze svých stávajících jaderných elektráren, primárně ve formě dividend z ČEZu, který je provozovatelem JE Temelín a Dukovany. Od roku 2000, kdy ČEZ začal dividendy vyplácet, z nich [stát obdržel 350 miliard korun](https://ct24.ceskatelevize.cz/clanek/ekonomika/cez-vyplati-dividendu-z-lonskeho-zisku-47-korun-za-akcii-celkove-253-miliardy-362257).

"Starší" forma provozní podpory stála v Česku za solárním boomem v letech 2006–2010. Šlo o garantovanou výkupní cenu (angl. *feed-in tariff*), která provozovateli elektrárny zaručovala pevnou cenu za každou kilowatthodinu dodanou do sítě. Takto jednoduché schéma má však více problémů, například motivuje dodávat do sítě, i když je elektřiny přebytek, nebo neumožňuje vrátit část potenciálních nadměrných zisků k zákazníkům.

## Zdroje a poznámky

[^deleni-eurostat]: Toto zjednodušené dělení odpovídá klasifikaci [podle Eurostatu](https://ec.europa.eu/eurostat/cache/metadata/en/nrg_pc_204_sims.htm) a často se používá v energetických statistikách evropských států.
[^jednotka-ceny]: Pro ceny v tomto textu se pro konzistenci a snazší srovnávání používá jednotka €/kWh (euro na kilowatthodinu elektřiny). Pro orientační přepočet na Kč/kWh v tomto textu používáme směnný kurz 1 € ≈ 25 Kč.
[^naklady-stabilizace]: To zahrnuje i náklady na stabilizaci soustavy, vyrovnávání výkyvů atd.
[^povolenky-poze]: V Česku se takto platí z výnosů část poplatků na podporu obnovitelných zdrojů energie.
[^moe-studie]: Viz např. [studie IMF](https://doi.org/10.5089/9798400224362.001) z roku 2022. Záleží však na tom, jak dlouho dopředu dodavatel energií elektřinu nakupuje, resp. jak přímo je zákazník vystaven velkoobchodním cenám (viz dále v textu).
[^statni-podpora]: Podpora pro výstavbu solární energetiky v Česku okolo roku 2010 vedla ke každoročním nákladům ve výši desítek miliard korun. Od té doby však technologie obnovitelných zdrojů výrazně zlevnily, a státní podpora tak nemusí nutně vést k vysokým veřejným nákladům. Současný doporučený způsob podpory je formou tzv. rozdílových smluv (angl. *contracts for difference*, CfD), což dokonce může přinášet výnosy do státního rozpočtu. Viz sekce [_Oboustranné rozdílové smlouvy_](#oboustranné-rozdílové-smlouvy).
[^mareni]: Vzhledem k tomu, že momentální výroba z fotovoltaických (a v menší míře i větrných) elektráren je často velmi podobná na velkém území najednou (viz např. [Riepien, Brown, Zavala, 2025](https://doi.org/10.1016/j.adapen.2024.100202)), může docházet k plnému vytížení přeshraničních přenosových linek a nutnosti využít náhradní zdroje elektřiny. Tím vznikají náklady na maření elektřiny, *congestion management* a redispečink. Do jisté míry se jedná o náklady způsobené pomalým rozvojem sítí v minulosti.
[^konkurence]: Například pro vyrovnávání výkyvů dnes slouží hlavně konvenční, často fosilní (a tedy drahé) elektrárny. Čím dál relevantnějšími technologiemi jsou však bateriová úložiště a flexibilita spotřeby, které na výkyvy dokáží reagovat rychleji, flexibilněji a tím i levněji než konvenční elektrárny.
[^dalsi-faktory]: Jednotlivé složky, a tedy i výsledné ceny, ovlivňují též další faktory (a komplexní vazby mezi nimi): spotřeba elektřiny, geografické podmínky a počasí, průměrná cenová hladina dané ekonomiky, kapacity přeshraničních spojení a další. Tyto proměnné jsou zde pro zjednodušení ponechány stranou.
[^moe-velikost-efektu]: Historicky zvýšení podílu slunce a větru na výrobě o jeden procentní bod snižovalo tržní ceny v různých zemích v průměru o 0,6–0,8 %. Viz např. [working paper IMF (2022)](https://doi.org/10.5089/9798400224362.001), [Kolb et al. (2020)](https://ideas.repec.org/a/eee/rensus/v134y2020ics1364032120305955.html), [Bourn et al. (2021)](https://ayrtonb.github.io/Merit-Order-Effect/), [BBVA Research (2025)](https://www.bbvaresearch.com/wp-content/uploads/2025/02/EW_Reaping_the_benefits_edi2docxFinal.pdf), [Clò et al. (2015)](https://ideas.repec.org/a/eee/enepol/v77y2015icp79-88.html).
[^kombinace-variabilnich]: Případně se oba přístupy dají kombinovat, např. 60 % ceny ze spotového trhu a 40 % z dlouhodobějších trhů (jako v případě španělského tarifu [PVPC](https://www.ree.es/en/operation/electricity-system/pvpc)).
[^spanelsko-pvpc]: Španělsky [*precio voluntario pequeño consumidor*](https://www.ree.es/en/operation/electricity-system/pvpc), PVPC.
[^kritika-stropu-plynu]: Vedlo to také k vyššímu exportu elektřiny vyrobené ze zemního plynu do Francie. Navíc kompenzace v podobě položky na vyúčtování za elektřinu znamenala pro domácnosti menší finanční úspory. Takové plošné opatření zároveň pokřivuje trh, neboť dopad na zákazníky s fixními tarify byl větší než na ty s variabilními. Více viz [Center on Global Energy Policy](https://www.energypolicy.columbia.edu/wp-content/uploads/2023/05/Iberian-Exception_Commentary_CGEP_051723-2.pdf) a [ACER](https://acer.europa.eu/sites/default/files/documents/Publications/2023_MMR_EmergencyMeasures.pdf).
[^verejna-infrastruktura]: Zatímco rozvoj a údržba některých typů veřejné infrastruktury se hradí převážně z veřejných financí (např. silniční síť), rozvoj a údržbu elektrické sítě platí téměř výhradně spotřebitelé dodávané elektřiny. Jde o dost peněz: náklady na přenosovou a distribuční soustavu v Česku tvoří 20–30 % průměrné ceny na vyúčtování za elektřinu.
[^dalsi-cfd]: Základní přehled rozdílových smluv napříč Evropou a rozbor několika případových studií poskytuje report [*Comparison of CfD-related best practices across Europe*](https://www.ait.ac.at/fileadmin/mc/energy/downloads/IES/Projekte/Comparision_of_CfD_related_best_practices.pdf) výzkumného centra REKK z roku 2024.
