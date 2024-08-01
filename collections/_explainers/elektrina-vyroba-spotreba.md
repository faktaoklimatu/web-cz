---
layout:      explainer
title:       "Výroba, výkon a spotřeba elektřiny v Česku"
slug:        "elektrina-vyroba-spotreba"
published:   2024-07-15
authors:
  - ids: ["ondras-pribyla"]
  - id: "jirka-lnenicka"
    minor-role: "editace"
  - id: "marcel-otruba"
    minor-role: "vizualizace"
  - name: ""
    affiliation: 
    minor-role: "konzultace"
weight:      74
tags-scopes: [ svet ]
tags-topics: [ emise, opatreni ]
cover-source-author:      ""
cover-source-text:        "Unsplash"
cover-source-license:     "Unsplash License"
cover-source-license-url: "https://unsplash.com/license"
cover-source-url:         ""
perex: 
---
## Výroba, výkon a spotřeba elektřiny v Česku


### Základní čísla a pojmy

_Perex bude zde._

Moderní společnost se bez elektřiny neobejde – pro své fungování ji potřebují technologie, které denně používáme, klíčová je pro výrobní sektory ekonomiky i oblast služeb. Elektřinu lze vyrábět z řady různých zdrojů (různě emisně náročných), dá se přeměňovat na jiné formy energie (například na teplo) a je možné ji také transportovat na velké vzdálenosti. 

Co se týče spotřeby, průměrná česká domácnost[^1] v bytě spotřebuje 2 450 kilowatthodin elektřiny ročně, v rodinném domě je to v průměru 5 317 kWh (tedy více než dvojnásobek). Vedle toho spotřebovává velké množství elektřiny průmysl, doprava a další odvětví. Celkově se v Česku ročně spotřebuje přibližně 60 TWh elektřiny, přičemž elektrárny vyrobí cca 84 TWh. Tento text rozebírá tato čísla podrobněji a vysvětluje rozdíly v základních pojmech a používaných jednotkách.


## Výkon a spotřeba elektřiny

O výkonu a spotřebě elektřiny se dá uvažovat na různých úrovních: na úrovni jednotlivých spotřebičů (a jejich využívání), na úrovni domácností, měst a nebo celého státu. Tato kapitola popisuje každou z těchto úrovní ve větším detailu.   

{% capture rozdil-vykon-spotreba %}

**Výkon** udává, kolik energie je dodáno za určitou jednotku času. Jednotkou výkonu je watt (W).

{:.callout-box}
1W = 1 joule energie dodaný za 1 sekundu  

Například na uvaření jednoho litru vody je potřeba přibližně 340 000 J energie[^2][^3]. Když chceme vodu uvařit rychle, používáme obvykle rychlovarnou konvici. Typický příkon takové konvice je okolo 2 100 W (tedy za sekundu předá vodě 2 100 J energie) a uvaření vody bude trvat zhruba 2,5 minuty.

_Poznámka: Namísto výkonu se často používá pojem “příkon”, tedy spotřeba určitého elektrického spotřebiče za sekundu. Z technického hlediska dává toto rozlišování smysl, tento text však z důvodu zjednodušení mezi příkonem a výkonem nerozlišuje._

**Spotřeba** znamená, kolik energie spotřebuje určitý elektrický spotřebič za určitý čas. Používanou jednotkou je watthodina (Wh), případně kilowatthodina (kWh). 

Například na uvaření jednoho litru vody v rychlovarné konvici se spotřebuje zhruba 90 Wh (2,5 minuty = 150 sekund = 0,04 hod. krát 2 100 W = 90 Wh) Celková denní či roční spotřeba konvice nicméně závisí na tom, jak často se v ní voda vaří: kdybychom vařili litr vody jednou za den, bude denní spotřeba konvice 90 Wh a roční přibližně 33 kWh (90 Wh krát 365 dní = 32 850 Wh, tj. 33 kWh). Budeme-li vařit dvakrát, bude spotřeba dvojnásobná atd. – jinak řečeno: celková spotřeba závisí jednak na výkonu a jednak na častosti používání spotřebiče. 

{% endcapture %}

{% include expander-figure.html
    name="rozdil-vykon-spotreba"
    expanded=false
    class="contrast-figure"
    label="Jaký je rozdíl mezi výkonem a spotřebou?"
    content=rozdil-vykon-spotreba
%}

{% capture mega-giga-tera-peta %}

V energetice se často používají předpony pro vyjádření velkého množství základních jednotek (wattů / watthodin / joulů). Například jeden megawatt (1 MW) odpovídá jednomu milionu wattů.  

<table>
  <tr>
   <td>1 000 (10<sup>3</sup>) W
   </td>
   <td><strong>kW</strong>
   </td>
   <td><strong>kilowatt</strong>
   </td>
  </tr>
  <tr>
   <td>1 000 000 (10<sup>6</sup>)W
   </td>
   <td><strong>MW</strong>
   </td>
   <td><strong>megawatt</strong>
   </td>
  </tr>
  <tr>
   <td>1 000 000 000 (10<sup>9</sup>) W
   </td>
   <td><strong>GW</strong>
   </td>
   <td><strong>gigawatt</strong>
   </td>
  </tr>
  <tr>
   <td>1 000 000 000 000 (10<sup>12</sup>) W
   </td>
   <td><strong>TW</strong>
   </td>
   <td><strong>terawatt</strong>
   </td>
  </tr>
  <tr>
   <td>1 000 000 000 000 000 (10<sup>15</sup>) W
   </td>
   <td><strong>PW</strong>
   </td>
   <td><strong>petawatt</strong>
   </td>
  </tr>
</table>

{% endcapture %}

{% include expander-figure.html
    name="mega-giga-tera-peta"
    expanded=false
    class="contrast-figure"
    label="Kolik je mega-, giga-, tera-, peta-?"
    content=mega-giga-tera-peta
%}

### Spotřebiče

Různé spotřebiče se liší svým výkonem a používají se také různě často nebo dlouho. U některých navíc není množství využívané energie konstantní po celou dobu provozu – například pračky nebo myčky na nádobí mají největší výkon na začátku svého cyklu, kdy ohřívají vodu. Rozlišuje se proto **špičkový (maximální) výkon**[^4]_ _(tedy největší možný výkon spotřebiče) a **průměrný výkon**, tedy_ _kolik elektřiny spotřebič v průměru odebírá při svém provozu ze sítě. Celková spotřeba spotřebiče potom závisí na tom, jaký je jeho výkon (příkon) a jak dlouho a často se používá. Například roční spotřeba chladničky běžící nonstop je cca 250 kWh, pračka používaná třikrát týdně spotřebuje za rok asi 160 kWh. Pro představu přináší srovnání spotřeby několika běžných domácích spotřebičů následující tabulka:

{% include figure.html
    name="cs-spotreba-spotrebice-des.svg"
    alt="TODO"
    source-text="Údaje vychází z šetření Českého statistického úřadu ENERGO 2021"
    source-url="https://www.czso.cz/csu/czso/energo-2021"
%}

### Domácnosti

Průměrný výkon české domácnosti[^6] je přibližně 420 W[^7]. Maximální výkon domácnosti závisí na jističích v rozvodové skříni – ty zajišťují, že je domácnost chráněna před zkraty nebo přetížením. U běžných bytů je maximální výkon 5750 W, u rodinných domů je to 17 250 W[^8]. \

Uvedený průměrný výkon české domácnosti je skutečně jen průměrnou hodnotou, neboť jednotlivé domácnosti se svou roční spotřebou elektřiny značně liší – záleží například na tom, zda jde o byt nebo rodinný dům, jestli domácnost elektřinou i topí (což v Česku není příliš obvyklé), případně ji používá na vaření apod. Průměrná česká domácnost **v bytě** spotřebuje **za rok 1 212 kWh na osobu**, **v rodinném domě** je to **2 030 kWh na osobu**.

{% include figure.html
    name="cs-spotreba-byt-dom-des.svg"
    alt="TODO"
    source-text="TODO"
    source-url="https://www.czso.cz/csu/czso/energo-2021"
%}

#### Domácnosti ve městech

Ve městě s 20 000 obyvateli je výkon všech domácností přibližně 2,6 MW a roční spotřeba 22,4 GWh. Do celkového výkonu a spotřeby města je ovšem nutné započítat také průmysl, služby, dopravu, veřejné osvětlení a mnoho dalšího. Na domácnosti připadá jen menší část celkové spotřeby: například v Brně spotřebují **domácnosti přibližně** 448,4 GWh, což je asi **čtvrtina z celkové spotřeby města** (1,8 TWh)[^9]. Podobné je to v Praze: domácnosti cca čtvrtina (1,5 TWh) z celkové spotřeby elektřiny v Praze (6 TWh)[^10]. Příklady roční spotřeby elektřiny ve městech různých velikostí ukazuje následující tabulka[^11].

{% include figure.html
    class="wide-figure-desktop"
    name="cs-spotreba-domacnosti-mapa-des.svg"
    name-mobile="cs-spotreba-domacnosti-mapa-des.svg"
    alt="TODO"
    source-text="TODO"
%}

### Celé Česko

Výkon celého Česka kolísá mezi 4,5 GW a 11,5 GW. Záleží především na ročním období (v zimě je například topná sezóna, tedy elektřiny je potřeba více) a také na tom, jestli je právě den či noc.

{% include figure.html
    class="narrow-figure"
    name="cs-vykon-ceska.svg"
    alt="TODO"
    source-url="https://www.czso.cz/csu/czso/energo-2021"
%}

Domácností je v Česku celkem cca 4,2 milionu a jejich celková roční spotřeba elektřiny v roce 2022 byla cca 16 TWh[^12], tedy zhruba čtvrtina z celkové spotřeby země[^13] (cca 60 TWh). Z hlediska spotřeby elektřiny jsou domácnosti v současnosti druhým největším sektorem, hned za průmyslem. Zároveň se očekává, že zejména v průmyslu a dopravě bude spotřeba elektřiny s pokračující dekarbonizací (vyžadující čistou, bezemisní elektřinu) významně narůstat. Rozdělení spotřeby elektřiny v Česku mezi jednotlivé sektory v roce 2022 ukazuje graf níže[^14]:

{% include figure.html
    name="cs-spotreba-elektriny-domacnosti-des.svg"
    alt="TODO"
    source-text="TODO"
    source-url="https://www.czso.cz/csu/czso/energo-2021"
%}

## Výkon a výroba elektřiny

Elektřina se vyrábí z různých zdrojů – poměr využití těchto zdrojů při výrobě se označuje jako **energetický mix**.** **V energetickém mixu Česka mají stále významný podíl fosilní zdroje, více než 40 % se stále vyrábí z uhlí. S ohledem na mezinárodní závazky Česka snižovat emise skleníkových plynů a zároveň s ohledem na očekávaný nárůst spotřeby elektřiny zmíněný výše to znamená, že energetický mix Česka musí projít velkou proměnou – elektřinu budeme muset získávat z jiných zdrojů.    

U všech typů zdrojů je základní charakteristikou tzv. **instalovaný výkon **(nejčastěji uváděný v megawattech). Ten ukazuje, kolik elektřiny dokáže elektrárna dodávat, když je využívána na maximum. Elektrárny však málokdy běží stále na plný výkon – různé typy elektráren jsou v provozu různě dlouhou dobu, například větrná elektrárna potřebuje, aby foukal vítr, výkon vodní elektrárny může být závislý na průtoku vody apod. Pro lepší představu o skutečné roční produkci elektrárny je tedy potřeba vzít v potaz také tzv. **koeficient** **využití** – jak dlouho a často během roku běží tato elektrárna naplno. 

Příklad: pokud by elektrárna měla instalovaný výkon 1 000 MW a pracovala by celý rok (8 760 hodin), může vyrobit až 8 760 000 MWh (8,76 TWh) elektrické energie. Má-li koeficient využití 80 %, což je typické pro jaderné elektrárny, je její skutečný roční výkon přibližně 7 008 000 MWh za rok (80 % z 8 760 000 MWh). Ve srovnání s tím má běžná větrná elektrárna instalovaný výkon 5 MW a koeficient využití pro tento typ elektrárny v Česku je 24 % (záleží na tom, jak často, jak dlouho a jak silně fouká vítr). Za rok tedy vyrobí tato elektrárna s instalovaným výkonem 5 MW celkem 10 512 MWh elektrické energie (24 % z 8 760 × 5). 

Rozdíly v instalovaných výkonech a koeficientech využití pro různé typy elektráren v Česku 

{% include figure.html
    class="wide-figure-desktop"
    name="cs-elektrarny-dashboard-des.svg"
    name-mobile="cs-elektrarny-dashboard-des.svg"
    alt="TODO"
    source-text="TODO"
%}

(zdroje k tabulce jsou v google sheetu, tabulka bude vskutečnosti nějaká infografika) \
 \
Pokud srovnáme údaje uvedené v tabulce s průměrnou spotřebou domácností a měst různé velikosti, vyplyne z toho, že solární panely mohou snadno pokrýt spotřebu domácnosti v rodinném domě, jedna větrná elektrárna stačí na spotřebu všech domácností v malém městě (okolo 1 000 obyvatel, tedy například Špindlerova Mlýna). Město o velikosti Olomouce spotřebuje přibližně tolik elektřiny, kolik vyrobí jeden blok uhelné elektrárny. Toto srovnání výroby a spotřeby zároveň dává lepší představu, jak velké části obyvatel se dotkne, když bude takový blok uhelné elektrárny odstaven a přestane se využívat, nebo kolik fotovoltaiky či větrných elektráren potřebuje vybudovat obec pro své obyvatele a firmy, které zde působí, aby měli všichni dostatek levné elektřiny po celý rok.      \

{% include figure.html
    class="wide-figure-desktop"
    name="cs-vyroba-spotreba-des.svg"
    name-mobile="cs-vyroba-spotreba.svg"
    alt="TODO"
    source-text="TODO"
%}


Je také důležité si uvědomit, že stavět velké elektrárny není jednoduché, rychlé ani levné. Zatímco solární panel si může na svůj dům pořídit poměrně snadno téměř každý vlastník a větrnou elektrárnu mohou společně financovat menší investiční skupiny, postavit novou jadernou elektrárnu není bez finanční pomoci státu možné ani pro velkou energetickou společnost. Navíc je výstavba jaderné elektrárny projekt na mnoho let (tedy elektřinu začne tato elektrárna dodávat až za dlouho a do té doby se bez ní musíme obejít). Snadnost a cenová dostupnost jsou přitom důležitými faktory realizace, což je zřetelně vidět například na počtu instalací – fotovoltaických systémů bylo v ČR v roce 2023 nainstalováno přes 80 000[^15], o celkovém instalovaném výkonu 970 MW, což se blíží výkonu jednoho bloku moderní jaderné elektrárny. Ve srovnání s tím se v Česku za posledních 50 let postavilo pouze 6 jaderných bloků. _ \
_ \



<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]:
     V průměrné domácnosti v ČR bydlí 2,15 lidí viz. [https://scitani.gov.cz/velikost-hospodarici-domacnosti](https://scitani.gov.cz/velikost-hospodarici-domacnosti)

[^2]:
     Měrná tepelná kapacita vody je 4180 Jkg<sup>−1</sup>K<sup>−1  </sup>tzn. pro zvýšení teploty jednoho kg vody (což je ekvivalent litru) o jeden stupeň je potřeba 4 180 J. Podle toho je výchozí teplota, tento příklad uvažuje 20°C, je potřeba 80 × 4180 = 334 400 J

[^3]:
     V energetice se většinou spotřebovaná energie neudává v joulech, ale ve watthodinách (Wh). Je to praktičtější: 60 W žárovka, která svítí hodinu, spotřebuje 60 Wh (při převodu na jouly by jedna 1 KWh byla 3 600 J, je to tedy složitější převod).

[^4]:
     Tohle bývá na spotřebičích uvedeno na bezpečnostním štítku

[^5]:
     [ENERGO 2021](https://www.czso.cz/csu/czso/energo-2021)

[^6]:
     V průměrné domácnosti v ČR bydlí 2,15 lidí viz. [https://scitani.gov.cz/velikost-hospodarici-domacnosti](https://scitani.gov.cz/velikost-hospodarici-domacnosti)

[^7]:
     Průměrná spotřeba bytu podle Energo 2021 : počet hodin v roce = 3 685,5 : 8 760 = 0,4207 kW = 420 W

[^8]:
     U běžných bytů v bytovém domě, kde se nevyužívá elektřina k vaření nebo ohřevu vody, se používá jistič 1x25A, který umožní maximální výkon 5 750 W. Pro rodinné domy to bývá 3x25A, tedy maximální dovolený výkon je 17 250 W; P = U × I = 1 × 230 × 25 = 5 750 W; respektive P = 3 × 230 × 25 = 17 250 W

[^9]:
     [Brno v číslech - infrastruktura a rozvoj města](https://data.brno.cz/pages/bvc-infrastruktura-a-rozvoj-mesta)

[^10]:
     [ERU: roční zpráva o provozu elektrizační soustavy ČR pro rok 2022](https://www.eru.cz/rocni-zprava-o-provozu-elektrizacni-soustavy-cr-pro-rok-2022)

[^11]:
     Výpočet v tabulce: zaokrouhlený počet obyvatel vynásobený průměrnou spotřebou na člověka v bytě v bytovém domě. Počítá se spotřeba na osobu v bytě, protože pro česká města obvykle platí, že většina jejich obyvatel bydlí v bytových domech.

[^12]:
     [https://www.eru.cz/rocni-zprava-o-provozu-elektrizacni-soustavy-cr-pro-rok-2022](https://www.eru.cz/rocni-zprava-o-provozu-elektrizacni-soustavy-cr-pro-rok-2022)

[^13]:
     Podrobněji o výrobě a spotřebě ČR [v naší infografice](https://faktaoklimatu.cz/infografiky/elektrina-cr)

[^14]:
     Zdroj: [ERU/fakta](https://docs.google.com/spreadsheets/d/1nnRI9Wns9R7S7GEZ6iNbU_EqBfQeBkD7m0JMZ6TyXNs/edit#gid=1183184545)

[^15]:
     [ČTK](https://www.ceskenoviny.cz/zpravy/2463692)
