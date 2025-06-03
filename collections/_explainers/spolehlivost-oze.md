---
layout:      explainer
title:       "Jak spolehlivě vyrábí v Česku solární a větrné zdroje?"
type:        "Analýza"
slug:        "spolehlivost-oze"
published:   2025-06-23
authors:
  - id: "matej-grabovsky"
  - id: "matej-grabovsky"
    minor-role: "vizualizace"
weight:      98.5
tags-scopes: [ cr ]
tags-topics: [ energetika ]
cover-source-author:        "Karsten Würth"
cover-source-text:          "Unsplash"
cover-source-license:       "Unsplash licence"
cover-source-license-url:   "https://unsplash.com/license"
cover-source-url:           "https://unsplash.com/photos/windmill-surrounded-by-grass-during-daytime-w_a40DuyPAc"
perex: |
    Výroba elektřiny ze slunce a větru je v čase velmi proměnlivá, a to jak v průběhu dne, tak během roku. Podrobná analýza dat ukazuje, že solární a větrné elektrárny jsou většinou spolehlivé zdroje energie a že i v nejméně příznivých obdobích jí vyrobí nemalé množství. Pro stabilní dodávky elektřiny jsou ale potřeba baterie a záložní zdroje, které v nutných případech dokážou rychle naskočit a doplnit nedostatky výroby.
---

{% include tldr.html content="
- Bezemisní energetiku **nelze postavit na jednom zdroji**. Vyžaduje dobrý mix slunce a větru, akumulaci a záložní zdroje.
- **Na sezónní úrovni** jsou v Česku solární a větrné zdroje velmi spolehlivé. Při správném poměru instalovaných výkonů se jejich výroba **dobře doplňuje**.
- **Období velmi nízké výroby v Česku nastávají** v zimních měsících, když je souběžně zamračeno a málo fouká vítr. V zimní polovině roku bývá průměrně 24 dní, kdy vítr vyrobí méně než čtvrtinu dlouhodobého průměru. Pro taková období jsou potřeba **záložní zdroje**, případně sezónní akumulace.
- Spolehlivá výroba při dobrém poměru solárních a větrných elektráren znamená **nízké využití záložních elektráren**, jejichž provoz může být nákladný nebo znečišťující.
- Spolehlivost výroby a celkovou odolnost soustavy významně **posiluje dobré propojení napříč Evropou**.
" %}

Proč se zabývat proměnlivostí obnovitelných zdrojů energie (OZE)? Rozvoj bezemisní energetiky v Česku bude pravděpodobně zahrnovat široké nasazení proměnlivých solárních a větrných zdrojů, jejichž výroba se liší v různých částech roku i v rámci dne a závisí na aktuálním počasí. Spotřebitelé však potřebují spolehlivé, nepřerušované dodávky elektřiny. Tento konflikt nastoluje pro energetiku důležité otázky:

- Do jaké míry se dá na základu proměnlivé solární a větrné výroby stavět fungující bezemisní energetika?
- Kolik elektřiny dokážou tyto zdroje poskytnout spolehlivě a jak velkou část spotřeby bude nutné doplnit dalšími zdroji?
- Do jaké míry mohou s vyrovnáváním proměnlivé výroby pomáhat různé druhy akumulace energie a jaké další nástroje jsou k dispozici?

## Co myslíme spolehlivou výrobou?

Pro zjednodušení se na spolehlivost výroby můžeme dívat ve dvou odlišných časových horizontech:

1. **Sezónní** pohled. V jakém rozsahu se pohybuje výroba po měsících nebo po rocích? Při vhodné kombinaci instalovaných výkonů se slunce a vítr v ročním a sezónním horizontu dobře doplňují – v období, kdy málo svítí slunce, typicky více fouká vítr a naopak. V měsíčních součtech se spolehlivě vyrobí 50 % dlouhodobého průměru (při optimálním poměru výroby z větru : slunce 3 : 1).
2. **Den ode dne** je výroba ze slunce a větru poměrně dobře předvídatelná, ale i tak se přirozenými vlivy každý den do různé míry mění. V průměru 9krát za rok, nejčastěji mezi listopadem a lednem, nastávají dny, kdy zároveň málo svítí slunce i málo fouká vítr, tzv. *Dunkelflaute*.[^definice-dunkelflaute] Pro tyto případy je nutné mít dostatek **záložních zdrojů**, případně dostatek kapacit pro akumulaci energie.

Oba pohledy podrobněji rozebíráme v následujících sekcích.

Pro jednoduchost v tomto textu pomíjíme další dvě relevantní časové škály: dlouhodobé vzorce (jak se výroba mění na škále desetiletí, např. vlivem změny klimatu) a okamžitou, vnitrodenní proměnlivost (jak se výroba proměňuje minutu po minutě nebo hodinu po hodině). Vyrovnávání vnitrodenní variability je obzvlášť důležité u fotovoltaiky, avšak lze jej poměrně dobře řešit pomocí dnes existujících technologií akumulace a flexibility spotřeby.

## Sezónní proměnlivost

Na nejvyšší úrovni dává smysl bavit se o variabilitě celkové výroby za celý rok nebo po měsících. V jakém rozsahu (relativně vůči dlouhodobému průměru) se pohybuje roční nebo měsíční výroba fotovoltaické nebo větrné elektrárny v Česku?[^dataset] Jelikož celková výroba závisí na aktuálním instalovaném výkonu, který se v čase vyvíjí, zaměříme se dále na poměr výroby (za rok, měsíc, den atd.) vůči dlouhodobému průměru.

V ročním součtu se v Česku ze slunce v každém roce vyrobí přibližně ±10 % elektřiny oproti dlouhodobému průměru. V polovině roků (mezi 25. až 75. percentilem) je rozsah dokonce jen ±3 %. Rozptyl výroby z větru je o něco větší – všechny roky v datasetu se vejdou do rozmezí přibližně ±15 %, prostřední polovina do ±5 %.

{% include figure.html
    name="rocni-vyroba.svg"
    alt="Bodový graf srovnávající roční výrobu elektřiny ze slunce a větru v Česku. Polovina let se u slunce odchyluje maximálně o ±3 % od průměru, zatímco u větru je to ±5 %."
%}

Proměnlivost solární a větrné výroby na úrovni celých roků je tedy poměrně omezená, avšak zatím žádná technologie nedokáže účinně a spolehlivě přenášet elektřinu přes tak dlouhá časová období. Proto je potřeba prozkoumat i kratší časové úseky.

Graf výroby po měsících má vcelku předvídatelný tvar – v Česku slunce nejvíc svítí v létě a vítr nejvíc fouká naopak v zimě. Fotovoltaické a větrné elektrárny se tak sezónně dobře doplňují.[^mesicni-prumer]

{% include figure.html
    name="mesicni-vyroba.svg"
    alt="Dva sloupcové grafy znázorňující měsíční výrobu. Výška sloupce odpovídá jako procentnímu rozdílu oproti průměrnému měsíci. Maximum u slunce bývá uprostřed léta, u větru v zimních měsících."
%}

Jak se zdroje mezi sebou liší?

- **Slunce** dominuje v létě, ale v zimě je jen doplňkovým zdrojem. V půlroce od dubna do září se v Česku vyrobí téměř 70 % z celé roční výroby fotovoltaiky. Výroba v letních měsících je průměrně třikrát až čtyřikrát vyšší než v zimních.
- **Vítr** je naopak převažujícím zdrojem v zimě. Výroba z větru je o něco méně koncentrovaná – od října do března se v Česku vyrobí přibližně 60 % z celkové roční výroby větrných elektráren.

**Solární výroba je v rámci roku více proměnlivá než větrná.** Výroba v nejméně příznivých zimních měsících u slunce klesá až k pouhé čtvrtině oproti těm nejpříznivějším letním, zatímco u větru výroba v letních měsících klesá v průměru jen zhruba k polovině nejpříznivější zimní výroby. U větru je ovšem vyšší variabilita u jednotlivých měsíců napříč lety (viz následující graf).

**Měsíční výroba má mezi lety přirozeně větší variabilitu než v součtu za celý rok.** Z fotovoltaiky se v zimních měsících vyrobí o 40–80 % méně oproti průměru, v létě je to o 20–70 % více. Variabilita výroby z větru je opět o něco větší než u slunce, ale i v letních měsících, kdy fouká nejméně, výroba z větrných elektráren téměř neklesá pod 40 % z průměrného měsíce.[^priciny-variability]

{% include figure.html
    name="mesicni-variabilita.svg"
    alt="Sloupcový graf s body znázorňujícími měsíční výrobu v různých letech. Solární výroba má podobnou míru meziročního kolísání každý měsíc, zatímco větrná kolísá výrazně víc, hlavně v zimních měsících."
%}

Jak se zdroje liší mezi různými roky?

- U **slunce** je rozsah proměnlivosti v průběhu roku skoro totožný; nejvíce proměnlivá je výroba na jaře a na podzim.
- U **větru** je proměnlivost obecně vyšší. Nejširší je rozsah výroby z větru v zimních měsících. Například v největrnějším lednu by se historicky vyrobilo čtyřikrát více elektřiny než v tom nejméně větrném.

Z obou grafů je patrné, že fotovoltaické a větrné elektrárny se sezónně dobře doplňují – málo slunečné měsíce bývají často větrnější a naopak. Zároveň je možné tyto zdroje instalovat v takovém poměru, aby jejich kombinovaná měsíční výroba měla nízkou proměnlivost a zároveň přibližně kopírovala očekávanou spotřebu elektřiny.

### Jak integrovat obnovitelné zdroje na sezónní úrovni?

Jak do elektrizační soustavy co nejlépe integrovat proměnlivé zdroje, jejichž výroba závisí na počasí a měsíc od měsíce se mění? Jak přenést energii z přebytkových měsíců a jak se připravit na období nízké výroby? Existuje hned několik postupů a technologií, které se zapojováním obnovitelných zdrojů pomáhají.

{% comment %}
Seznam musíme zapsat v HTML kvůli vloženému grafu v prvním bodě.
{% endcomment %}
<ol>
<li markdown="1">
**Dobrý mix slunce a větru.** Podle jakého pravidla dimenzovat instalovaný výkon obnovitelných zdrojů? Při nastavení poměru výroby ze slunce a větru 1 : 3 odpovídá křivka kombinované měsíční výroby poměrně dobře měsíční spotřebě elektřiny.[^pomer-vyroby-vykonu]

{% include figure.html
    name="mesicni-mix.svg"
    class="narrow-figure"
    alt="Sloupcový graf zobrazující měsíční výrobu elektřiny z větru a slunce v ročním poměru 3 k 1. Průběh spotřeby je vyznačen tenkou černou čarou nad sloupci."
%}
</li>
<li markdown="1">
**Mírné naddimenzování obnovitelné výroby.** Z hlediska budoucího systému nemusí být cílem, aby průměrná výroba jen odpovídala spotřebě. Vhodnější by bylo dimenzovat zdroje tak, aby se v průměru generovaly určité nadbytky, které by se daly dlouhodobě akumulovat v sezónní akumulaci.[^dostupnost-sezonni-akumulace] Takové naddimenzování by mírně snížilo dopady proměnlivosti napříč roky.

To může ilustrovat příklad lednové výroby. Kdyby Česko postavilo tolik větrných elektráren, aby se z nich v průměrném lednu vyrobilo 40 % spotřeby, je potřeba počítat s tím (a dimenzovat podle toho propojení, akumulaci i další zdroje), že v různých letech v lednu mohou vyrobit 20–80 % spotřeby.[^lednova-vyroba] Kdyby Česko postavilo tolik větrných elektráren, které v průměru pokryjí 60 % lednové spotřeby, byl by tento rozsah napříč lety 30–120 %. To znamená, že při velmi nepříznivém lednu by chybělo o něco méně elektřiny. Tak jako tak je potřeba dostatek záložních zdrojů, aby dokázaly vyplnit mezery ve výrobě při nejméně příznivém počasí.
</li>
<li markdown="1">
**Propojení** elektrizačních soustav států napříč Evropou **pomocí interkonektorů**. Tato propojení dokážou přenášet elektřinu z oblastí přebytků tam, kde je elektřiny momentálně nedostatek – ať už se jedná o nadvýrobu z OZE nebo využití dostupných kapacit akumulace nebo záložních zdrojů v sousedních státech. Rozvoj sítí v Evropě je investičně i časově nákladný, avšak zvyšuje efektivitu využití všech dostupných zdrojů a v důsledku [snižuje i celkové náklady](https://www.entsoe.eu/outlooks/tyndp/2024/) na výrobu elektřiny a provoz elektrizační soustavy (dle modelování evropských provozovatelů přenosových soustav ENTSO-E).
</li>
<li markdown="1">
Sezónní **akumulace elektřiny**. Baterie a přečerpávací elektrárny momentálně nejvíce pomáhají s vyrovnáváním v řádu hodin až dnů. Pro sezónní akumulaci je potřeba technologie s vysokým poměrem kapacity k instalovanému výkonu. Dnes tuto funkci do jisté míry plní velké akumulační vodní nádrže, avšak jejich potenciál je v Evropě už téměř vyčerpaný. Potenciální budoucí technologie akumulace s vysokou kapacitou by umožnila přenášet energii až na úrovni týdnů či měsíců a pomohla by tak integrovat velké přebytky z OZE. Taková technologie ale zatím není dostupná v dostatečné škále a dostatečně levně. Mezi kandidáty aktuálně patří akumulace do vodíku (pomocí elektrolýzy a následného spalování v plynových turbínách) nebo jiných syntetických paliv s vysokou hustotou energie (syntetické plyny, metanol, amoniak atd.).
</li>
<li markdown="1">
**Akumulace tepla a chladu** v systémech zásobování teplem, v domácnostech i průmyslu. V létě lze velké přebytky elektřiny z fotovoltaiky použít pro ohřev vody v obřích zásobnících (pomocí elektrokotlů nebo tepelných čerpadel) a ukládat tak energii pro zásobování domácností teplem v chladnějších obdobích. Mezi pokročilejší technologie pro sezónní ukládání patří ukládání tepla do roztavených solí nebo do zemské kůry (geotermální energie).
</li>
</ol>

## Denní proměnlivost

Kolik elektřiny běžně vyrobí fotovoltaická nebo větrná elektrárna v každém dni? Jelikož ze slunce se nejvíce vyrábí v létě a z větru zase v zimě, zaměříme se v následující analýze

- u **fotovoltaických elektráren na výrobu v letní polovině roku** (od dubna do září, kdy se vyrobí přibližně 70 % roční výroby ze slunce) a
- u **větrných elektráren na výrobu v zimní polovině roku** (od října do března, kdy se vyrobí kolem 60 % celkové roční výroby).

V jednotlivých dnech roku je výroba z OZE proměnlivá, avšak není zcela nahodilá. V letní polovině roku v Česku výroba ze slunce klesá pod 25 % dlouhodobého průměru pouze ve třech dnech (v průměru přes 38 zkoumaných let). U větru takové dny nastávají kvůli větší přirozené variabilitě násobně častěji. V zimní polovině roku klesá denní výroba pod 25 % průměrně 24krát, tedy přibližně jednou za týden.

Při vhodném nastavení poměru instalovaných výkonů (viz [předchozí sekce](#jak-integrovat-obnoviteln%C3%A9-zdroje-na-sez%C3%B3nn%C3%AD-%C3%BArovni)) se dny s velmi nízkou výrobou počítají v jednotkách. Pod jednu čtvrtinu celoročního průměru klesá kombinovaná výroba ze slunce a větru v průměru v 9 dnech za rok.

{:.table}
| | Slunce<br><span class="small text-muted">v letní polovině roku</span> | Vítr<br><span class="small text-muted">v zimní polovině roku</span> | Slunce + vítr<br><span class="small text-muted">po celý rok</span> |
|-------------------------|-----:|-----:|----:|
| Celkem dní              |  183 | 183¼ | 365¼ |
| Dny pod 25 %[^hranice-ref] |  2,9 | 24,0 | 9,4 |
| Dva a více dní pod 25 % |  0,8 | 15,1 | 4,3 |
| Tři a více dní pod 25 % |  0,2 |  8,6 | 1,6 |

{% capture dunkelflaute %}
Pojem pochází z němčiny a označuje období, kdy je zataženo a vítr téměř nefouká, a dochází tak k velmi malé výrobě elektřiny z obnovitelných zdrojů. Doslovný překlad by znamenal "temné bezvětří".

Taková období nastávají několikrát do roka, v Česku téměř pokaždé mezi říjnem a lednem, kdy jsou dny krátké a potenciál slunce je tak minimální. Ve spojení s obzvlášť nízkými teplotami (tedy vyšší spotřebou elektřiny) je to ještě komplikovanější na zajištění dostatečné výroby.

Právě v těchto dnech potřebuje energetická soustava záložní zdroje, které 90 nebo i 98 % roku stojí, ale jednou za čas jsou potřeba pro zajištění spolehlivých dodávek elektřiny (a tepla). Výroba z těchto zdrojů může být nákladná, ale jejich výstavba je oproti jiným konvenčním zdrojů relativně levná. Výstavba těchto zdrojů ani výjimečná (byť nákladná) výroba celkové náklady na provoz elektrizační soustavy v součtu významně neovlivní.

Příklad takového období ukazuje následující graf výroby z OZE (žluté a modré sloupečky) a spotřeby (černá křivka) v Německu v lednu 2025. Několik dní po sobě panovalo silné bezvětří a v některých dnech i oblačnost.

{% include figure.html
    name="dunkelflaute-priklad.svg"
    alt="Graf zobrazuje hodinový průběh spotřeby a výroby elektřiny v Německu v jednom týdnu v lednu 2025. Počínaje 15. lednem má několik následujících dní velmi nízkou výrobu z obnovitelných zdrojů."
    source-text="Energy-Charts.info"
    source-url="https://energy-charts.info/charts/power/chart.htm?l=en&c=DE&week=03&legendItems=ew4w4"
%}
{% endcapture %}

{% include expander-figure.html
    name="dunkelflaute"
    class="contrast-figure"
    label="Co je to *Dunkelflaute*?"
    content=dunkelflaute
%}

### Slunce

Výrobu ze slunce charakterizuje několik základních pozorování:

- V Česku fotovoltaika vyrábí **nejvíce od května do července**.
- Proměnlivost výroby v letní polovině roku je poměrně omezená – **v polovině dní se pohybuje v rozmezí ±21 %** od dlouhodobého průměru.
- V letní polovině roku se výjimečně stává, že je dva nebo více dní po sobě nad celým Českem významně zataženo (tj. výroba klesne pod 50 % průměru), v průměru čtyřikrát.
- Výroba je v převážné většině dní relativně vysoká a nepravidelně klesá k nízkým hodnotám (jako třeba pod 50 % průměrné výroby). Zároveň téměř nikdy nestoupá nad hranici 160 % průměru.[^zesikmeni-slunce] Je to dáno podnebím ve střední Evropě a technologií výroby elektřiny ze slunečního záření.

{% include figure.html
    name="denni-histogram-slunce.svg"
    class="narrow-figure"
    alt="Histogram znázorňujíčí četnost dnů podle toho, o kolik procent se výroba ze slunce v letní půlce roku odchyluje od průměru. Polovina dní leží v rozmezí ±21 % od průměru."
%}

Konkrétní příklad výroby z fotovoltaiky v letní půlce roku ukazuje následující graf (podle počasí roku 2014). Šedé body ukazují kolísání výroby den ode dne – ve většině dní se pohybuje blízko průměru. Přibližně jednou za 12 dní se objeví den s výrobou pod 50 %, ale téměř vždy následuje den, který je opět blíže průměru. Výjimkou jsou zde například dva horší dny uprostřed května.

{% include figure.html
    name="denni-vyroba-slunce-1.svg"
    alt="Čárový graf klouzavého průměru výroby ze slunce v Česku v jednom půlroce. Body zobrazují výrobu po dnech."
%}

Pro snazší srovnání napříč roky je užitečné se místo výroby den po dni dívat na klouzavý průměr – žlutá křivka v grafu ukazuje průměr výroby v sedmi po sobě jdoucích dnech. Pro zhodnocení realistického rozsahu variability je důležité se dívat na výrobu napříč mnoha roky. Proto následující graf ukazuje hypotetickou výrobu v pěti různých letech (podle počasí roků 2001–2005).

{% include figure.html
    name="denni-vyroba-slunce-5.svg"
    alt="Čárový graf klouzavých průměrů výroby ze slunce v Česku v pěti vybraných půlrocích. Světlé body na pozadí zobrazují denní výrobu."
%}

Z grafu je patrné, že výroba se (v klouzavém průměru) pohybuje v poměrně úzkém pásu kolem dlouhodobého průměru.

Přebytky, tedy elektřinu, která se okamžitě nespotřebuje, lze do nějaké míry akumulovat (v bateriích, přečerpávacích vodních nádržích apod.) a využít v následujících dnech. Technologie akumulace (zejména lithiové baterie) ale zatím nejsou dostatečně levné na to, aby se na solární výrobě s akumulací dala postavit celá elektroenergetika, a to ani v letních měsících.

Teoreticky lze postavit tolik fotovoltaických elektráren, aby i za méně příznivých lét vyrobily dostatek přebytků, a tolik baterií, aby tyto přebytky zvládly absorbovat a přenést do nejméně slunečných dní. Takový systém by však při současných cenách technologií byl astronomicky drahý. Proto je nezbytné stavět bezemisní energetiku na pestrém mixu různých technologií, které se navzájem doplňují a posilují – slunce, vítr a jádro, doplněné flexibilní spotřebou, dobře dimenzovanou akumulací a záložními zdroji.

**Jaký význam má pro slunce geografické rozptýlení zdrojů a propojení mezi státy?** Čím větší je plocha, na které jsou fotovoltaické elektrárny instalované, tím menší je variabilita jejich výroby. Propojení soustav evropských států tak pomáhá stabilizovat proměnlivost výroby. Následující graf ukazuje hypotetickou celkovou výrobu ze slunce v celoevropském součtu (pokud by státy byly perfektně propojené) ve stejných pěti rocích jako v předchozím grafu.[^inst-vykony-slunce]

{% include figure.html
    name="denni-vyroba-slunce-evropa.svg"
    alt="Čárový graf klouzavých průměrů výroby ze slunce v celé Evropě v pěti vybraných půlrocích. Světlé body na pozadí zobrazují denní výrobu. Rozptyl čar i bodů od průměru je mnohem menší než v případě samotného Česka."
%}

Výroba v evropském součtu má v některých obdobích podobný průběh jako v Česku, ale ani v nejméně slunečných dnech letní poloviny roku (např. na konci září) téměř neklesá pod 50 % dlouhodobého průměru.

### Vítr

Výrobu elektřiny z větru v Česku charakterizují následující znaky:

- V průměru vítr vyrábí nejvíce od prosince do února.
- Proměnlivost větru v zimních měsících je více než dvojnásobná oproti slunci – v polovině dní se pohybuje v rozmezí přibližně ±50 % od dlouhodobého průměru.
- V zimní polovině roku se poměrně často stává, že dva nebo více dní po sobě v celém Česku málo fouká (tj. výroba klesne pod 50 % průměru), takových dní je v průměru 23.
- Výroba se ve většině dní pohybuje blízko průměru nebo pod ním a nepravidelně stoupá k vysokým hodnotám (nezřídka nad 200 % průměru).[^zesikmeni-vitr] Tento vzorec je opět dán podnebím ve střední Evropě a fyzikou přeměny energie z větru.

{% include figure.html
    name="denni-histogram-vitr.svg"
    class="narrow-figure"
    alt="Histogram znázorňující četnost dnů podle toho, o kolik procent se výroba z větru v zimní půlce roku odchyluje od průměru. Polovina dní leží v rozmezí ±50 % od průměru."
%}

Pro ilustraci typické denní variability ukazuje následující graf opět výrobu den po dni v jednom půlroce mezi říjnem a březnem. Oproti slunci se výroba často pohybuje pod průměrem a jednou za několik dní poskočí vysoko nad něj, nezřídka i nad 200 %. Ve srovnání se sluncem jsou u větru častější také posloupnosti dní, kdy fouká velice málo, zde např. několik dní v kuse na konci prosince.

{% include figure.html
    name="denni-vyroba-vitr-1.svg"
    alt="Čárový graf klouzavého průměru výroby z větru v Česku v jednom půlroce. Body zobrazují výrobu po dnech."
%}

Stejně jako u slunce je užitečné se podívat na variabilitu napříč mnoha roky (vyjádřenou v 7denním klouzavém průměru).

{% include figure.html
    name="denni-vyroba-vitr-5.svg"
    alt="Čárový graf klouzavých průměrů výroby z větru v Česku v pěti vybraných půlrocích. Světlé body na pozadí zobrazují denní výrobu."
%}

Variabilita křivky větrné výroby je mnohem větší než u slunce, ale na sezónní úrovni se slunce a vítr dobře doplňují. Tato data pouze podtrhují, že bezemisní energetiku je nutné na pestrém mixu různých technologií, které se navzájem doplňují a podporují.
I pro vítr platí, že čím větší rozlohu větrné elektrárny pokrývají, tím stabilnější je v součtu výroba. Propojení napříč Evropou opět snižuje rozsah variability a denní výrobu vyhlazuje, i když o něco méně než u fotovoltaiky.

{% include figure.html
    name="denni-vyroba-vitr-evropa.svg"
    alt="Čárový graf klouzavých průměrů výroby z větru v celé Evropě v pěti vybraných půlrocích. Světlé body na pozadí zobrazují denní výrobu. Rozptyl čar i bodů od průměru je významně menší než v případě samotného Česka."
%}

### Jak integrovat obnovitelné zdroje na denní úrovni?

Jak do elektrizační soustavy co nejlépe integrovat proměnlivé zdroje, jejichž výroba závisí na počasí a den ode dne se mění? Jak co nejlépe využít přebytky z výroby, které se okamžitě nevyužijí, a jak se připravit na období nízké výroby? I na denní úrovni lze použít podobné technologie jako pro sezónní vyrovnávání, ale škála možností se ještě rozšiřuje.

1. **Propojení** elektrizačních soustav států napříč Evropou **pomocí interkonektorů**. Tato propojení dokážou přenášet elektřinu z oblastí přebytků tam, kde je elektřiny momentálně nedostatek (ať už se u sousedních států jedná o nadvýrobu z OZE nebo o využití dostupných kapacit záložních zdrojů či akumulace). Propojení tak umožňuje, jak ukazují grafy výše, efektivně vyrovnávat výkyvy v proměnlivé výrobě ze slunce a větru. Jak je uvedeno výše, rozvoj sítí v Evropě je investičně i časově nákladný, avšak umožňuje nejefektivnější využití všech dostupných zdrojů a v důsledku [snižuje i celkové náklady](https://www.entsoe.eu/outlooks/tyndp/2024/) na výrobu elektřiny a provoz elektrizační soustavy.
2. **Akumulace elektřiny** (tedy zejména baterie, přečerpávací vodní elektrárny nebo akumulační vodní nádrže) pomáhá s vyrovnáváním spotřeby a výroby v řádu hodin až dnů. Spolu se správným poměrem solárních a větrných zdrojů pro optimální sezónní výrobu je potřeba vhodně dimenzovat i kapacity akumulace (relativně k výkonům OZE), aby se s co nejmenšími náklady dalo co nejvíce přebytků přenést do dnů s nízkou výrobou.
    Technologie akumulace s vysokým poměrem kapacity k instalovaném výkonu (nad 100 h) by umožnila přenášet energii až na úrovni jednoho týdne a pomohla by tak ještě efektivněji integrovat velké množství OZE. Taková technologie ale zatím není dostupná v dostatečné škále a dostatečně levně.
3. **Akumulace tepla a chladu** v systémech zásobování teplem, v domácnostech i průmyslu. V období nadbytku lze velké přebytky elektřiny z větru či fotovoltaiky použít pro ohřev vody v obřích zásobnících (pomocí elektrokotlů nebo tepelných čerpadel) a ukládat tak energii pro zásobování teplem v obdobích s nižší obnovitelnou výrobou. Podobně lze využívat tepelnou kapacitu budov nebo zařízení (například chladírnu lze v hodině s velkými přebytky nachladit o něco více než obvykle a předejít tak spotřebě třeba ve večerní špičce).
4. **Flexibilita spotřeby v domácnostech** nebo při nabíjení elektroaut. Elektroauto se může levněji nabít v poledne, kdy hodně vyrábí fotovoltaika, nebo uprostřed noci, kdy je jinak velmi nízká spotřeba. Podobně domácí spotřebiče nebo baterie mohou flexibilně reagovat na aktuální ceny elektřiny (a tedy přebytky nebo nedostatky elektřiny v síti).
5. **Flexibilita spotřeby v průmyslu**, schopnost a ochota průmyslových podniků přesunout (tzv. *load shifting*) nebo přizpůsobit spotřebu v určité hodině dne aktuální výrobě elektřiny (potažmo její ceně).
6. **Akumulace energie do formy paliva**, např. výroba zeleného vodíku elektrolýzou při větších přebytcích (elektrolyzéry fungují nejlépe při stabilním příkonu, proto nejsou vhodné na absorpci drobných hodinových nebo denních výkyvů). Vodík najde své využití zejména v průmyslu, ale v případě potřeby z něj lze vyrábět i elektřinu spalováním v plynových turbínách.
7. **Záložní zdroje** elektřiny. Jedná se o elektrárny, teplárny nebo třeba spalovací motory, které lze rychle nastartovat a regulovat jejich výkon podle aktuální potřeby. V praxi se může jednat o elektrárny na biometan, vodíkové turbíny nebo fosilní zdroje, jež však v porovnání s dneškem budou mnohem méně využívané a budou plnit jen podpůrnou funkci. Nutný výkon záloh se dimenzuje na špičkovou spotřebu, nikoliv na celkový instalovaný výkon OZE (ten může být násobně vyšší).[^inst-vykon-zaloh]

Tyto technologie jsou vyzkoušené a v různých formách fungují po celém světě.

{% include preview-box.html
    title="Česko má druhý nejnižší podíl slunce a větru na výrobě elektřiny v EU"
    slug="elektrina-oze-eu"
%}

Téměř všechny státy Evropské unie mají vyšší podíl slunce a větru na výrobě elektřiny než Česko. Průměr zemí EU je 29 % (data za rok 2024[^ember-yearly-data]), zatímco v Česku se ze slunce a větru vyrobí pouze 6,4 % elektřiny. Největší podíl mají Dánsko (69 %), Portugalsko (46 %), Nizozemsko (45 %), Řecko (43 %), Španělsko (43 %) a Německo (43 %). Všechny tyto státy zvládají i takto velké objemy elektřiny z obnovitelných zdrojů už dnes integrovat a účelně využít.

Jak ukazují data v tomto explaineru, výroba elektřiny ze slunce a větru je výrazně proměnlivá během dnů i v rámci sezóny. Tato proměnlivost má ale svoje pravidelnosti a lze s ní pracovat řadou různých opatření a technologií. Rozhodně nelze spoléhat pouze na solární a větrné zdroje, v budoucnu ale mohou být (a v mnoha zemích Evropy už dnes jsou) významnou součástí výrobního mixu.

## Poznámky

[^definice-dunkelflaute]: Pojem *Dunkelflaute* nemá jednotnou, rozšířenou definici. Pro účely tohoto článku tak definujeme dny, ve kterých je kombinovaná výroba ze slunce a větru

[^dataset]: Analýzy v tomto explaineru vychází z [datasetu tzv. Panevropské klimatické databáze (PECD)](https://www.entsoe.eu/eraa/2023/downloads/#Input%20Data), který slouží jako podklad pro celoevropské hodnocení zdrojové přiměřenosti (ERAA) organizace ENTSO-E za rok 2023. Data o historickém počasí v tomto dataset vychází z tzv. reanalýzy [ERA5](https://www.ecmwf.int/en/forecasts/dataset/ecmwf-reanalysis-v5). Všechny analýzy zobrazované v tomto explaineru jsou open source a přístupné jako [Jupyter notebook v repozitáři na GitHubu](https://github.com/faktaoklimatu/data-analysis/blob/master/notebooks/spolehlivost-oze.ipynb).

[^ref-obdobi]: Jedná se o průměr při historickém počasí na území dnešního Česka v letech 1982–2019.

[^mesicni-prumer]: Hodnota označená v grafu jako průměr odpovídá měsíční výrobě elektřiny z daného zdroje v průměru za celý rok.

[^priciny-variability]: Příčiny vyšší variability u větru jsou meteorologické i technologické. Na větrnost, zejména v zimě, mívají negativní vliv tzv. blokující tlakové výše (angl. *blocking weather*), které mohou na velkém území způsobit i několik dní trvající bezvětří. Mají však menší vliv na tvorbu oblačnosti, tudíž méně postihují výrobu ze slunce. Výroba z fotovoltaiky je úměrná osvitu, větrné turbíny ovšem mnohem citlivěji reagují na rychlost větru, což opět vede k vyšší variabilitě výroby (turbíny mají určitý operační rozsah rychlostí větru: vyžadují minimální rychlost, aby se roztočily, a zároveň rychlost nesmí překročit určitou mez, nad kterou se z bezpečnostních důvodu automaticky vypnou).

[^dostupnost-sezonni-akumulace]: Tento postup stojí na dostupnosti vhodných technologií pro sezónní akumulaci, tedy na budoucím technologickém vývoji.

[^pomer-vyroby-vykonu]: Průměrný roční koeficient využití fotovoltaiky je v podmínkách Česka zhruba poloviční oproti využití větru. Poměr výroby 1 : 3 (slunce : vítr) tedy odpovídá poměru instalovaných výkonů přibližně 2 : 3.

[^lednova-vyroba]: Tuto lednovou proměnlivost nemohou zachránit solární zdroje, jejichž lednová výroba je obecně nízká.

[^hranice-ref]: U slunce a větru se hranice 25 % vztahuje k průměrné výrobě za dané období – za letní, resp. zimní polovinu roku. U kombinace slunce + vítr se hranice 25 % vztahuje k celoročnímu průměru výroby při (sezónně) optimálním poměru roční výroby ze slunce a větru 1 : 3 (viz předchozí sekce, [Jak integrovat obnovitelné zdroje na sezónní úrovni?](#jak-integrovat-obnoviteln%C3%A9-zdroje-na-sez%C3%B3nn%C3%AD-%C3%BArovni)).

[^zesikmeni-slunce]: Statisticky řečeno, rozdělení denní výroby z fotovoltaiky je zešikmené doleva.

[^inst-vykony-slunce]: Instalované výkony solárních zdrojů vycházejí ze scénáře pro rok 2025 podle podkladů provozovatelů přenosových soustav pro ERAA 2023.

[^zesikmeni-vitr]: Statisticky řečeno, rozdělení denní výroby z větru je zešikmené doprava.

[^inst-vykon-zaloh]: Z modelování [mnoha různých scénářů české elektroenergetiky v roce 2050](/studie/2024-cesty-k-ciste-a-levne-elektrine-2050) vychází potřebný výkon záložních zdrojů kolem 10 GW. Pro hrubou představu: 1 GW paroplynových záloh s CCS by vyžadoval investici kolem 60 mld. korun (bez nákladů na financování). S úrokovou mírou 8 % se náklady přes 30 let provozu elektrárny rozloží do přibližně 5 mld. korun ročně. Náklady na financování zdroje sníží nějaká forma státní garance nebo zavedení kapacitních mechanismů pro záložní zdroje.

[^ember-yearly-data]: Zdroj dat: [Yearly Electricity Data](https://ember-energy.org/data/yearly-electricity-data/), Ember.
