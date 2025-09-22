---
layout:      explainer
title:       "Dekarbonizace teplárenství: jak v Česku vyrobit dost nízkoemisního tepla pro dálkové vytápění?"
slug:        "dekarbonizace-teplarenstvi-cr"
published:   2025-09-20
authors:
  - id: "jan-krcal"
  - id: "jirka-lnenicka"
    minor-role: "editace"
  - name: "Michaela Valentová"
    affiliation: ČVUT, Fakulta elektrotechnická
    minor-role: "konzultace"
weight:      50
tags-scopes: [ eu, cr ]
tags-topics: [ energetika ]
cover-source-author: "Hubert Kororo"
cover-source-license: "CC BY-SA 4.0"
cover-source-license-url: "https://creativecommons.org/licenses/by-sa/4.0/deed.cs"
cover-source-text: "Wikimedia Commons"
cover-source-url: "https://commons.wikimedia.org/wiki/File:Tepeln%C3%BD_nap%C3%A1je%C4%8D_M%C4%9Bln%C3%ADk-Praha_2021_06.jpg"
perex:       "Dálkové vytápění hraje v dodávkách tepla v současném Česku významnou roli. Zároveň je s ním spojeno velké množství emisí skleníkových plynů. Tento text ukazuje možnosti, jak sektor teplárenství dekarbonizovat a proč je tato transformace důležitá."

---

{% include tldr.html content="

- Teplárenství dodává v Česku teplo do více než třetiny domácností. Kromě toho vyrábí teplo také pro administrativní budovy a průmysl.
- Při výrobě dálkového tepla vzniká v současnosti velké množství emisí skleníkových plynů – v roce 2024 jej bylo více než 40 %   vyrobeno z uhlí a dalších 20 % ze zemního plynu.
- Současné české teplárenství čeká velká proměna: nejen kvůli dekarbonizaci a splnění závazků spojených s Pařížskou dohodou, ale i kvůli potřebě celkové modernizace. Kromě snížení emisí tak může tato proměna přinést i řadu dalších benefitů – například vyšší efektivitu, čistší životní prostředí nebo pomoc se stabilizací sítě s elektřinou, v níž bude vysoký podíl obnovitelných zdrojů.
- Konkrétně to znamená, že v dalších cca 5 letech české teplárenství pravděpodobně dokončí již probíhající přechod od uhlí k zemnímu plynu (a zčásti také k dalším palivům jako biomasa či zbytkový odpad). Už tento krok přinese znatelné snížení emisí skleníkových plynů.
- Dosáhnout po tomto přechodu na jiná paliva další významné redukce emisí je stále možné, ale bude to už náročnější. Vyžaduje to totiž hlubší proměnu fungování tepláren – směrem k (částečné) elektrifikaci, kombinování více zdrojů tepla, akumulaci tepla, chytrému řízení provozu a úsporám energie. Zásadní roli mohou u nízkoemisního dálkového tepla v budoucnu hrát velká tepelná čerpadla (využívající elektřinu).
- Takto významnou proměnu ovšem nelze realizovat bez dobře nastavené vládní strategie, cenové regulace a podpory z veřejných zdrojů.
" %}

## Jaký je současný stav teplárenství v Česku

Tato kapitola popisuje současnou situaci českého teplárenství. Následující kapitoly na ni pak navazují úvahami o možnostech dalšího vývoje.

### Co je to dálkové vytápění a jak funguje

Většina lidí má praktické zkušenosti s různými způsoby **lokálního vytápění** domů či bytů – od krbů nebo starých kamen na uhlí přes kotle na dřevo či pelety až po moderní plynové kotle nebo tepelná čerpadla. Takto se pomocí paliva či elektřiny vyrábí teplo přímo v nemovitosti (podle momentální potřeby). Tímto teplem se obvykle ohřívá voda, která pak koluje v topném systému a pomocí radiátorů vytápí jednotlivé místnosti.

Naopak při **dálkovém vytápění** se teplo vyrábí centrálně pro mnoho domů najednou – spalováním uhlí, zemního plynu, biomasy nebo odpadu. V teplárenství se teplo často vyrábí společně s elektřinou v tzv. kogeneraci, neboť je to výrazně energeticky efektivnější než vyrábět obojí odděleně. Velmi zjednodušeně se dá říct, že teplo je vedlejší produkt při výrobě elektřiny. Co v běžné tepelné elektrárně uniká chladicí věží jako odpadní teplo, to se v teplárně zužitkuje a prodá jako další hodnotný produkt. Někde se ale vyrábí pouze dálkové teplo – takovému zařízení se říká výtopna.

**Centrálně vyrobené teplo se tepelně izolovaným potrubím rozvádí** po městě, zpravidla opět ve formě horké vody. V každé budově připojené k dané soustavě jsou tepelné výměníky, kde se horkou vodou z teplárny ohřívá voda, kterou pak využívá oddělený topný systém sloužící k vytápění budovy. Zpět do teplárny se pak druhou sadou potrubí vrací chladnější, tzv. vratná voda. (Zjednodušeně by se to dalo přirovnat k cévnímu systému v lidském těle – podobně jako se tepnami rozvádí po těle okysličená krev a odkysličená se následně žílami vrací k srdci, tak se v systémech centrálního tepla rozvádí jednou sadou potrubí horká voda po městě a druhou sadou se pak ochlazená voda z výměníků vrací do teplárny.)[^teplarny-analogie]

{% include figure.html
    name="teplarna-schema-normal-des.svg"
    name-mobile="teplarna-schema-normal-mob.svg"
    caption-above="**Rozvody dálkového tepla se skládají ze dvou sad potrubí** (podobně jako v topném systému v rodinném domě)"
    alt="V teplárně se vyrábí teplo centrálně z uhlí, zemního plynu, biomasy či odpadu a rozvody o délce 1 až 40 km se rozvádí do jednotlivých budov"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Takových soustav dálkového vytápění je v Česku několik stovek, přičemž těch opravdu velkých (se spotřebou tepla nad 1 PJ) jsou u nás zhruba dvě desítky. Na rozdíl od elektrizační soustavy, která je v celé zemi propojená, tyto teplárenské soustavy navzájem propojené nejsou, neboť teplo má jiné vlastnosti než elektřina a rozvádět jej na vzdálenost několika set kilometrů se nevyplatí. Ztráty by byly příliš vysoké.

Velkou soustavu dálkového vytápění lze ukázat na příkladu rozvodné soustavy Pražské teplárenské (viz schematická mapa níže). Ta je zároveň specifická v tom, že má hlavní zdroj tepla mimořádně daleko od většiny spotřeby – až v Mělníku (napaječ do Prahy je dlouhý cca 35 km). U většiny tepláren je to jiné a zdroje tepla se nacházejí přímo ve městě nebo někde poblíž.

{% include figure.html
    name="rozvody-praha.svg"
    class="narrow-figure"
    caption-above="**V Praze je rozsáhlá propojená teplárenská síť.** (Výroba tepla probíhá v teplárně Mělník, spalovně Malešice a několika dalších zdrojích. Soustava zásobuje teplem hlavně části města na pravém břehu Vltavy. Další menší soustavy fungují ve čtvrtích na levém břehu řeky.)"
    alt="Na pravém břehu Vltavy se nachází rozsáhlá síť teplárenských rozvodů, většinu tepla pro tuto soustavu dodává teplárna v Mělníku"
    source-text="Pražská teplárenská"
    source-url="https://www.ptas.cz/odstavky-a-poruchy/"
%}

Kromě rezidenčních a administrativních budov zásobují teplárny často i průmyslové podniky. Zde může teplo sloužit pro samotné výrobní procesy – např. zahřívání, tavení nebo sušení. Některé průmyslové procesy však vyžadují vysoké teploty a teplo je pak nutné dodávat ve formě stlačené, velmi horké páry (o teplotách 200–500 °C).

(Samostatným tématem je **dálkové chlazení**, které dnes v Česku téměř neexistuje a tento text se jím nezabývá. Z důvodu oteplujícího se klimatu však bude chlazení budov postupně nabývat na důležitosti, což se týká i soustav potřebných pro dálkové zásobování chladem.)[^dalkovy-chlad]

### Jak vysoký je podíl dálkového tepla v Česku

Teplárenství má v Česku významnou roli.[^teplarny-rozsah] Podle evropského srovnání z roku 2017 zásobovalo dálkové teplo v Česku asi 40 % domácností. To je vyšší podíl než ve velké většině zemí EU, včetně zemí západní Evropy s podobným klimatem (jako je například Německo či Rakousko).

{% include figure.html
    name="podil-czt-normal-des.svg"
    name-mobile="podil-czt-normal-mob.svg"
    caption-above="**Česko má v evropském srovnání vysoký podíl domácností připojených k dálkovému teplu**"
    alt="Jen 5 zemí EU (v čele s Dánskem) má znatelně vyšší podíl domácností připojených k dálkovému teplu"
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Celkově se ve formě dálkového tepla v roce 2023 v Česku spotřebovalo asi 120 PJ energie. (Pro srovnání: v lokálním vytápění je to výrazně více – ve stejném roce to bylo cca 280 PJ tepla.[^lokalni-teplo])

{% include expander-figure.html
    name="PJ"
    class="contrast-figure"
    label="Co znamená zkratka PJ?"
    content="Jeden PJ (petajoule) je milion miliard (10<sup>15</sup>) joulů. Představit si to lze jako roční spotřebu dálkového tepla ve městě jako Chomutov s cca 50 000 obyvateli nebo jako energii, která by byla potřeba k přivedení asi 2 miliard rychlovarných konvic plných vody k varu (přibližně tolik vody by zaplnilo horní nádrž přečerpávací elektrárny Dlouhé stráně)."
%}

### Z čeho se dnes dálkové teplo v Česku vyrábí

Naprostá většina dálkového tepla se dnes v Česku vyrábí spalováním paliv, z velké části fosilních (uhlí a zemního plynu). Třetím nejvýznamnějším zdrojem dálkového tepla je biomasa. Až s velkým odstupem následuje využití odpadního tepla v průmyslu a spalování zbytkového odpadu.

{% include figure.html
    name="vyroba-dnes.svg"
    name-mobile="vyroba-dnes-mob.svg"
    caption-above="**Zásadní roli ve výrobě tepla dnes hrají fosilní zdroje uhlí a zemní plyn** \\
celková brutto výroba tepla: 142 PJ/rok"
    alt="Největší podíl na výrobě brutto v letech 2022–2024 mělo uhlí (45 %), plyn (25 %) a biomasa a bioplyn (20 %). Další zdroje jsou méně významné: odpadní teplo (6 %), odpad (3 %), jaderné teplo (1 %)."
    source-text="ERÚ, Roční zpráva o provozu teplárenských soustav České republiky (průměr za roky 2022–2024)"
    source-url="https://eru.gov.cz/rocni-zprava-o-provozu-teplarenskych-soustav-cr-za-rok-2024"
%}

Při výrobě tepla z fosilních paliv vznikají emise skleníkových plynů (významné jsou zejména při spalování uhlí). Pro snížení emisí v teplárenství je tedy nutné fosilní část výroby nahradit. To kromě redukce emisí značně sníží také znečištění vzduchu v okolí dnešních uhelných tepláren.

## Proč je dálkové teplo důležitou součástí dekarbonizace

Nebylo by snazší místo dekarbonizace tepláren přejít na lokální vytápění budov a to dekarbonizovat? Zde jsou tři hlavní důvody, proč tomu tak není a proč je strategické v rámci dekarbonizace celého hospodářství významnou část teplárenství v Česku udržet (a teplárny postupně dekarbonizovat):

- Teplárny mohou pomocí stávající infrastruktury dekarbonizovat mnoho budov najednou
- Teplárny mohou vyrábět teplo více způsoby, a často i účinněji
- Teplárny mohou pomáhat vyrovnávat elektrickou síť

#### Teplárny mohou pomocí stávající infrastruktury dekarbonizovat mnoho budov najednou

Teplárny s rozsáhlými sítěmi rozvodů a mnoha zákazníky v Česku už existují. Postupné snižování emisí díky dekarbonizaci zdroje centrálního tepla je tak organizačně výrazně snazší – jednotliví odběratelé se většinou nemusejí o nic starat a nic zařizovat.[^neusporne-budovy] Navíc pro stát či město není jednoduché zařídit, aby jednotlivé domácnosti v případě rozpadu větší teplárenské soustavy své vytápění skutečně dekarbonizovaly.[^rozpad-soustav]

#### Teplárny mohou vyrábět teplo více způsoby, a často i účinněji

Dálkové vytápění může být účinnější než individuální vytápění – a to i v případě, že se započítají ztráty v rozvodech tepla. Ve srovnání s lokálním vytápěním v něm totiž lze využít širší škálu technologií a zdrojů tepla:

- **Velká tepelná čerpadla** v dálkovém vytápění mají k dispozici mnohem více různých zdrojů tepla se stabilní teplotou během roku (odpadní teplo, teplo z čistíren odpadních vod, z řek, geotermálních vrtů apod.), díky čemuž mohou tyto zdroje lépe využívat (navíc s vyšší průměrnou účinností).
- Kromě toho je v teplárnách možné **spalovat širší škálu paliv** (mimo zemní plyn a biometan to mohou být i různé formy biomasy, zbytkový odpad a v budoucnu možná také nízkoemisní vodík).

Účinnost tepláren řeší evropská legislativa.[^evropska-legislativa] Ta zároveň u nově postavených budov motivuje k připojení těchto budov na účinné soustavy dálkového tepla.

#### Teplárny mohou pomáhat vyrovnávat elektrickou síť

Systémy dálkového tepla také umožňují lépe vyrovnávat výkyvy ve výrobě a spotřebě elektřiny – díky kombinované výrobě elektřiny a tepla i díky možnosti teplo akumulovat:

- při **přebytku elektřiny** mohou teplárny zvýšit spotřebu elektrokotlů a část přebytečné elektřiny akumulovat ve formě tepla,
- při **nedostatku elektřiny** mohou teplárny vyrábět teplo z paliv a současně s tím dodávat i elektřinu.

Z těchto důvodů mnoho evropských zemí plánuje své soustavy dálkového vytápění významně rozšiřovat.[^zahranici-rozsirovani] V Česku je situace jiná – hlavním tématem je spíše to, jak současný vysoký podíl dálkového vytápění udržet (jde tedy více o modernizaci stávajících soustav než o stavbu nových).

## Jak dekarbonizovat české teplárenství

Při hledání odpovědi na tuto otázku je užitečné rozlišovat:

- co lze realizovat v nejbližších letech, tedy přibližně do roku 2030
- jaké jsou možnosti další dekarbonizace do roku 2050

V nejbližších letech bude uhlí kvůli ekonomickým tlakům [^ekonomicke-duvody] postupně nahrazováno zemním plynem a jinými palivy. Úkolem na následující dvě dekády pak bude další transformace – aby se Česko co nejvíce dokázalo obejít i bez těchto paliv.

### Do roku 2030: přechod z uhlí na zemní plyn a další paliva

Dnes se v Česku ve velkém plánuje a realizuje **odklon od uhlí** (a přechod převážně k zemnímu plynu). Vedle ekonomických důvodů [^ekonomicke-duvody] to má i další velmi pragmatický důvod: v rámci stávajících těžebních limitů postupně dochází uhlí pro teplárenství. Očekává se, že odklon od uhlí bude okolo roku 2030 z velké části dokončen.

Kromě moderních plynových kogeneračních zdrojů je v Česku v plánu také výstavba nových teplárenských zdrojů na biomasu a nových spaloven odpadu.[^spalovny] Teplárny Brno rovněž plánují okolo roku 2030 zprovoznit 42 km dlouhý horkovod z Dukovan. Po zkušenostech z plynové krize v letech 2021–2022 se dnes každá teplárna snaží své zdroje tepla aspoň zčásti diverzifikovat. I přes tyto plány lze očekávat, že po odklonu od uhlí bude v Česku mezi lety 2030–2035 hlavním palivem na výrobu dálkového tepla zemní plyn.

{% include figure.html
    name="vyroba-2030.svg"
    name-mobile="vyroba-2030-mob.svg"
    caption-above="**Po odklonu od uhlí (okolo roku 2030) bude hlavním zdrojem dálkového tepla zemní plyn** \\
odhad celkové brutto výroby tepla: 130–140 PJ/rok (až o 8 % méně než dnes)"
    alt="Po roce 2030 může mít podle odhadů Fakt o klimatu plyn 60–68% podíl na výrobě brutto, biomasa a bioplyn 22–26% podíl. Další zdroje budou i nadále relativně málo významné: odpadní teplo, teplo okolního prostředí a elektřina (5–6 %), odpad (4–5 %), jaderné teplo (1–3 %)."
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Kromě toho se budou i v tomto krátkodobém horizontu už pravděpodobně objevovat první příklady využití moderních technologií založených na elektřině, které blíže popisuje další část textu, věnovaná období 2030–2050. V nejbližších letech půjde hlavně o elektrokotle, jež mohou sloužit ke stabilizaci sítě při přebytku elektřiny. Na rozdíl od často mediálně diskutovaných mařičů dokážou elektrokotle v teplárnách využít nadbytečnou energii ve formě tepla a toto teplo následně dodat zákazníkům. K využití tepla mohou sloužit i menší akumulační zásobníky (zjednodušeně řečeno velké "termosky"), které umožní tuto nárazově dostupnou energii uložit a využít později. Kromě toho by se v nejbližších letech mohly objevit též pilotní projekty větších tepelných čerpadel (využívajících nízkopotenciální odpadní teplo a teplo okolního prostředí).

{% capture natural_gas %}

Zemní plyn je stejně jako uhlí fosilní palivo – dává vůbec taková náhrada uhlí z hlediska ochrany klimatu smysl? Ano, důvody jsou tři:

- **Při spalování zemního plynu vzniká méně emisí než při spalování uhlí.** Emise CO<sub>2</sub> na jednotku tepelné energie jsou u plynu ve srovnání s hnědým uhlím zhruba poloviční.\*
- **Plynové elektrárny a teplárny jsou účinnější než uhelné.** Z technických důvodů mohou dosahovat vyšší účinnosti (zejména při výrobě elektřiny), ze stejného množství tepelné energie tedy mohou vyrobit energeticky hodnotnější produkt.
- **Plynové elektrárny a teplárny umožňují flexibilnější provoz než uhelné**, mohou proto lépe doplňovat proměnlivé obnovitelné zdroje elektřiny, jako jsou solární a větrné elektrárny.

Kromě toho může přechod k zemnímu plynu přinést i čistší vzduch s pozitivními dopady na zdraví populace v Česku – spalování zemního plynu výrazně méně znečišťuje ovzduší než spalování uhlí (saze, prach, oxidy síry a dusíku).

**Přechod na zemní plyn ale není řešením pro úplnou dekarbonizaci výroby dálkového tepla.** Využití zemního plynu dává do budoucna smysl hlavně jako doplněk k obnovitelným (či jaderným) zdrojům elektřiny a tepla. Další technologie, jež mohou budoucí využití zemního plynu snížit, přibližuje následující sekce.

{:.longread-tiny}
\* Konkrétně: při výrobě 1 kWh tepla spálením hnědého uhlí vzniká cca 400 g CO<sub>2</sub>, při spalování zemního plynu je to cca 200 g CO<sub>2</sub>. Energie chemické vazby u zemního plynu (neboli metanu, CH<sub>4</sub>) je jednoduše 2× vyšší na každý obsažený atom uhlíku než v případě uhlí. Zemní plyn má sice v současnosti nemalé nepřímé emise spojené s úniky při jeho těžbě a transportu (metan je sám o sobě silným skleníkovým plynem) a celkový emisní přínos přechodu od uhlí je tedy nižší, únikům metanu při těžbě a transportu však lze bránit relativně jednoduchými technickými opatřeními. Z velké části je to tedy řešitelný problém. Zabývá se jím evropské nařízení (z roku 2024) o snižování emisí metanu v odvětví energetiky.

{% endcapture %}

{% include expander-figure.html
    name="natural-gas"
    class="contrast-figure"
    label="Pomůže přechod na zemní plyn klimatu?"
    content=natural_gas
%}

Je důležité dodat, že konec využití uhlí na výrobu dálkového tepla je poměrně složitý koordinační problém. Těžba uhlí má totiž vysoké fixní náklady, proto se ekonomicky vyplatí jen při relativně vysokém odběru uhlí. Pokud české teplárny neukončí využívání uhlí koordinovaně, dojde k tomu, že bude těžba pro poslední zbývající teplárny vycházet neúměrně draze.[^studie-konec-uhli] Stát nicméně nemá stav transformace jednotlivých větších teplárenských soustav dobře zmapovaný a informace o jednotlivých investičních záměrech jsou roztříštěné.[^stav-transformace] Pro úspěšné řízení odklonu od uhlí a efektivní podporu tepláren v transformaci by měl stát tento informační nedostatek urychleně napravit.

### Mezi lety 2030–2050: náhrada zemního plynu tepelnými čerpadly, akumulací a nízkoemisními palivy

Další dekarbonizace teplárenství po roce 2030 bude spočívat v nahrazení velkého objemu výroby dálkového tepla ze zemního plynu (cca 60–70 % dálkového tepla) výrobou z jiných zdrojů, které budou mít ve srovnání s plynem výrazně nižší emise. Kromě skleníkových plynů půjde v dalších dekádách i o energetickou bezpečnost – o výrazné snížení závislosti Česka na dovozu zemního plynu. Tempo dosažení takovéto hlubší proměny teplárenství záleží na technologickém pokroku, především ale na politické vůli a společenské podpoře.

Přímočará cesta spočívající v pouhé náhradě paliva (místo zemního plynu využít biometan[^biometan] nebo nízkoemisní vodík[^vodik]) se z dnešního pohledu nezdá být ekonomicky příliš realistická. Nejspíš totiž vůbec nebude snadné získat za rozumnou cenu tolik nízkoemisních paliv, aby mohly nahradit veškerý zemní plyn.

Druhou možností je vyrábět dálkové teplo pomocí nízkoemisní elektřiny (s využitím tepelných čerpadel a elektrokotlů).[^teplo-bez-elektriny] Ani tato technologie ale nemůže v Česku z ekonomických důvodů snadno a rychle nahradit veškerou spotřebu zemního plynu – během topné sezóny by totiž musel být k dispozici dostatek levné nízkoemisní elektřiny. To by v českých podmínkách nejspíše vyžadovalo významný rozvoj jaderné i větrné energetiky a ani jedno z toho nelze před rokem 2040 očekávat.

V praxi tak bude pravděpodobně probíhat obojí – jak částečná elektrifikace výroby tepla, která sníží spotřebu zemního plynu, tak nahrazení alespoň části zbývajícího plynu nízkoemisními palivy, jako je biometan. Velká část tepláren bude schopna výrobu tepla pomocí elektřiny a pomocí nízkoemisních paliv kombinovat a oba způsoby bude možné díky chytrému řízení efektivně střídat podle aktuální situace na trhu s elektřinou. Díky tomu bude možné provozní náklady na výrobu tepla snižovat.

{% include figure.html
    name="vyroba-2050.svg"
    name-mobile="vyroba-2050-mob.svg"
    caption-above="**Z dlouhodobého hlediska lze výrobu dálkového tepla postavit na kombinaci tepelných čerpadel a nízkoemisních paliv** \\
odhad celkové brutto výroby tepla: 100–120 PJ/rok  (až o 30 % méně než dnes)"
    alt="Po roce 2050 mohou podle odhadů Fakt o klimatu hrát nejvýznamější roli tři skupiny zdrojů: zdroje založené na elektřině (25–50 %), různé plyny jako zemní plyn, bioplyn, příp. vodík (10–45 %) a biomasa (25–28%). Zbytek i nadále může tvořit odpad (2–5 %) a jaderné teplo (3–7 %)."
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz"
%}

Podíl spaloven odpadu na výrobě tepla je v dlouhodobém horizontu nižší než v krátkodobém, popsaném v předchozí sekci – předpokládá se totiž vyšší míra recyklace a snaha předcházet tvorbě odpadu. Naopak mírně vzrůst by mohlo využití jaderného tepla (v případě využití malých modulárních reaktorů). Z dnešního pohledu však není reálné očekávat nasazení malých modulárních reaktorů ve velkém množství menších teplárenských soustav – ať už kvůli vysokým nákladům či kvůli povolovacím procesům v oblasti jaderné bezpečnosti.

Zde jsou hlavní kroky vedoucí k nízkoemisnímu teplárenství v Česku:

#### Část energie lze uspořit

Úspory sníží jednak náklady a jednak požadavky na množství nízkoemisních paliv (např. biometan má v Česku omezený potenciál a čím úsporněji s ním bude nakládáno, tím více energetických potřeb může naplnit). Úspor energie je možné dosáhnout různými způsoby:

- **Energetická renovace budov připojených k teplárenským soustavám** – kvalitně renovovaný dům spotřebuje ve srovnání s domem bez renovace jen zlomek energie. To obzvláště platí při mrazivých teplotách a tak soustava s úspornými domy potřebuje méně záložních zdrojů tepla pro období nejhlubších mrazů (a spotřebuje v těchto zdrojích méně paliva). Vládní Dlouhodobá strategie renovací budov z roku 2020 předpokládá do roku 2050 pokles celkové spotřeby energie na vytápění budov téměř o 25 %.
- **Optimalizace provozu teplárenských soustav** může rovněž přinést značné úspory energie. Jednak lze pomocí digitalizace a moderních technologií řízení lépe průběžně měřit stav v rozvodech (a podle toho teplo efektivněji vyrábět a dodávat) a jednak může optimalizace umožnit snížit i teplotu vody v rozvodech, což by dále snížilo ztráty při rozvodu tepla.
- **Renovace rozvodné sítě**, tam kde je síť neúsporná – jde hlavně o náhradu zbývajících parních rozvodů do rezidenčních budov za efektivnější teplovodní. Taková renovace nicméně trvá dlouho, často je totiž nutné rozkopat ulice, a tedy i koordinovat kroky s dalšími opravami sítí a dalšími rekonstrukcemi ve městě.

Kromě zmíněných opatření bude spotřebu energie na vytápění dále snižovat také změna klimatu (například v Praze se za posledních 30 let oteplilo natolik, že potřeba vytápění klesla cca o 10 %).[^otepleni]

#### Teplo lze vyrábět pomocí elektřiny

Významného snížení emisí skleníkových plynů v českém teplárenství lze jen těžko dosáhnout bez výroby tepla pomocí nízkoemisní elektřiny. Nejdůležitější budoucí technologií jsou v tomto ohledu **tepelná čerpadla**. V teplárně fungují úplně stejně jako v rodinném domě – pomocí elektřiny čerpají obnovitelné teplo z chladnějšího okolního prostředí do teplé vody v teplárenských rozvodech. Takové čerpání tepla může být až překvapivě účinné: pomocí 1 kWh energie ve formě elektřiny může čerpadlo vyrobit cca 2,5–4,5 kWh energie ve formě tepla (podrobnosti jsou v rozbalovacím boxu níže).

V Evropě velká tepelná čerpadla už v řadě teplárenských soustav fungují, například ve Vídni či ve Stockholmu. V Česku se zatím prakticky nevyužívají, v plánu je výstavba čerpadel v Praze na Císařském ostrově.[^cerpadlo-praha]

{% capture heat_pumps %}

Proč je tepelné čerpadlo tak účinné? Na rozdíl od odporového ohřevu elektřinou (při němž se podle zákona zachování energie z 1 kWh elektřiny vyrobí 1 kWh tepla) nevyrábí tepelné čerpadlo teplo z jiné formy energie, ale využívá už existující teplo z venkovního prostředí. Pomocí uzavřeného cyklu, ve kterém speciální chladivo neustále mění tlak a skupenství, dokáže čerpadlo přesouvat teplo z chladnějšího venkovního prostředí do teplejšího prostředí vody v teplárenských rozvodech. Na stejném principu funguje třeba klimatizace nebo lednička – také přesouvá teplo z chladnějšího (vnitřního) prostředí do teplejšího (venkovního) prostředí.

Účinnost tepelného čerpadla klesá s rostoucím rozdílem teplot okolního prostředí a výstupní ohřáté vody. Pro účinnost je tedy důležité získat zdroj okolního tepla o co nejvyšší teplotě (zejména během zimy, kdy je dálkového tepla potřeba nejvíce) a současně vystačit s co nejchladnější vodou v teplárenských rozvodech (ideálně v rozmezí 60–80 °C). Možné komplikace spojené se snižováním teplot v rozvodech jsou popsány v závěrečné kapitole.

Možné **zdroje tepla** pro teplárenská tepelná čerpadla:

- **Odpadní teplo z čistírny odpadních vod**. V důsledku biologických procesů probíhajících v čistírně je vytékající voda i během zimy poměrně teplá, mezi 10–15 °C. Využitelnost tohoto zdroje závisí na průtoku čistírny (tedy na velikosti města) a na vzdálenosti čistírny od rozvodů tepla.
- **Další odpadní teplo** z klimatizací obchodních domů, datacenter, průmyslových procesů, elektráren apod. může být teplotně poměrně stálým zdrojem. Jeho využitelnost opět závisí na lokalitě zdroje, dostupnosti vhodných pozemků a dalších faktorech.
- **Voda z řeky** mívá v zimě vyšší teplotu než vzduch. V praxi lze nicméně využít jen řeky s větším průtokem (případně podzemní vodu v okolí takových řek), protože se jejich teplota drží dostatečně vysoko nad bodem mrazu a nehrozí tak zamrzání vody ve výměníku při odčerpávání tepla.
- **Okolní vzduch** je jako zdroj tepla technicky nejsnáze využitelný. Jeho nevýhodou je, že v zimě může výrazně klesat jeho teplota, a tedy i účinnost využití čerpadla. Pokud však teplárna využívá více zdrojů tepla, může být tepelné čerpadlo v největších mrazech nahrazeno výrobou z paliv, jejíž účinnost na venkovní teplotě nezávisí.
- **Geotermální vrty** mohou poskytovat teplo vysoké teploty (dle hloubky vrtu). Jsou ale investičně poměrně drahé a rizikové, takže těžko mohou vznikat bez veřejné podpory (nebo nějaké formy zajištění rizika).

**Hlavním limitem pro využití tepelných čerpadel je cena elektřiny**, zejména během topné sezóny. Jejich využití nedává ekonomicky smysl při drahé elektřině (tehdy je provozně levnější spalovat zemní plyn). Proto rozšíření tepelných čerpadel stojí na takové transformaci elektroenergetiky, která zajistí levnou elektřinu dostatečně často i během zimy (tedy hlavně na větrné a jaderné energetice). Dnes mohou teplárny tento limit částečně obejít využitím vlastní elektřiny – současným využitím tepelného čerpadla a plynové kogenerace, která dodá elektřinu na provoz čerpadla. Tím se teplárny zároveň vyhnou poplatkům za distribuci elektřiny (a také nejistotě ohledně budoucích cen elektřiny).
{% endcapture %}

{% include expander-figure.html
    name="heat-pumps"
    class="contrast-figure"
    label="Jak fungují tepelná čerpadla v teplárenství?"
    content=heat_pumps
%}

Kromě tepelných čerpadel lze v teplárenství nasadit také **elektrokotle**, jež mohou dobře využívat nárazové přebytky obnovitelné elektřiny (např. solární elektřiny v poledne během letních měsíců) a tím bránit jejímu maření. Výhodou kotlů oproti tepelným čerpadlům je řádově nižší pořizovací cena (na jednotku tepelného výkonu). Díky tomu jsou pro takové nárazové využití vhodnější než tepelná čerpadla. Jejich nevýhodou je výrazně nižší účinnost ve srovnání s čerpadly – z 1 kWh elektřiny vyrobí cca 1 kWh tepla. To ale není z hlediska ekonomiky provozu problém, protože přebytečná elektřina je prakticky zadarmo.[^cena-regulovana-slozka]

#### Teplo lze vyrábět z různých paliv

Dnes jsou paliva hlavním zdrojem dálkového tepla a bude tomu tak i okolo roku 2030. Důležitou roli budou nicméně hrát zřejmě i ve vzdálenější budoucnosti – hlavně při výrobě dálkového tepla v hodinách, dnech a týdnech, kdy bude elektřina hodně drahá. V těchto obdobích mohou nahrazovat nebo doplňovat výrobu tepla pomocí elektřiny a tím teplárnám snižovat provozní náklady. Jak ukazují grafy výše, v budoucnu budou v teplárenství důležitými palivy hlavně zemní plyn, biomasa, biometan a zbytkový odpad, příp. jaderné palivo.

**Kogenerační zdroje** (které dokážou z uvedených paliv vyrábět jak elektřinu, tak teplo) mohou kromě toho pomáhat stabilizovat elektrickou síť – vyrábět elektřinu v období, kdy je jí nedostatek. Kromě vysoce účinných kogeneračních zdrojů budou mít nadále své místo v teplárnách i méně účinné a mnohem levnější **záložní zdroje** tepla, a to zejména při nejvyšší poptávce v mimořádně chladných obdobích.[^zalozni-zdroje]

V posledních desetiletích v Česku probíhá postupný přechod k čistším palivům: od uhlí k zemnímu plynu a částečně k biomase. Tento přechod bude pokračovat i po roce 2030, může ale snadno narážet na limity dostupnosti nízkoemisních paliv – například nedostatek biometanu nebo udržitelné biomasy.[^nedostupnost-vodiku]

#### Teplo se dá akumulovat na později

Teplo lze ve formě horké vody relativně snadno a efektivně uložit na později. S tím má praktické zkušenosti každý, kdo má doma elektrokotel a využívá nízký tarif – voda se v zásobníku ohřívá během dne v časech, kdy je to ekonomicky výhodnější, protože elektřina v nízkém tarifu je levnější. Díky dobré izolaci vydrží voda horká na pozdější hodiny, kdy je její spotřeba vyšší. V teplárně to může fungovat úplně stejně, jen jde o mnohem větší zásobníky – zatímco pro rodinný dům může stačit objem 500 litrů, v teplárnách lze využít obří "termosky" o objemu milionů až stovek milionů litrů.[^akumulace-svet]

Akumulace tepla umožňuje do určité míry časově oddělit výrobu od spotřeby a tím získat při řízení výroby tepla určitou flexibilitu. Díky akumulaci je tak například možné:

- nárazově pomocí elektrokotlů vyrábět mnohem víc tepla, než se v soustavě právě spotřebovává – např. během několika hodin v letním poledni vyrobit velké množství tepla, které se pak spotřebuje během dalších 24 hodin,
- během dne řídit kombinovanou výrobu elektřiny a tepla tak, aby se maximalizoval ekonomický zisk – v hodinách s velmi drahou elektřinou vyrábět a prodávat co nejvíce elektřiny na úkor tepla a výrobu tepla naopak zvýšit na úkor elektřiny v hodinách s levnější elektřinou,
- podobně lze podle velkoobchodní ceny elektřiny řídit během dne výrobu tepla v tepelných čerpadlech.

Kromě tohoto krátkodobého řízení mohou akumulační nádrže sloužit i k sezónní akumulaci tepla, vyrobeného mimo topnou sezónu (například pomocí fototermických panelů). Nejvíce takových zásobníků je dnes ve Skandinávii.[^akumulace-dlouhodoba]

Akumulace v teplárenství tak může mít dvojí efekt. Zaprvé může zvýšit podíl tepla, které lze s rozumnými náklady vyrobit pomocí elektřiny. Zadruhé může díky ní teplárenství mít důležitou roli při stabilizaci elektrické sítě – při vyrovnávání výkyvů ve výrobě a spotřebě elektřiny.

V současném Česku dává zatím ekonomicky smysl pouze krátkodobá akumulace (např. v kombinaci s elektrokotli na využití přebytků solární elektřiny v období jaro–podzim). Pokud se v Česku podaří tolik potřebný výrazný rozvoj větrné energetiky,[^rozvoj-vitr] mohla by dlouhodobější akumulace tepla využívat také přebytky větrné elektřiny v zimě a pomáhat tak překlenovat týdny s nižší výrobou z větru.

## Jaké bariéry stojí v cestě dekarbonizaci teplárenství

Dekarbonizační cíl po roce 2030 je jednoduchý: nahradit převážnou většinu výroby tepla ze zemního plynu kombinací výroby pomocí elektřiny a nízkoemisních paliv. Není však zdaleka snadné se k tomuto cíli dostat. Jasná strategie dekarbonizace sektoru chybí a kromě toho je třeba překonat i ekonomicko-regulatorní, technologické a infrastrukturní bariéry.

### Chybějící strategie

Přestože národní energetické strategické dokumenty (jako je [Vnitrostátní plán České republiky v oblasti energetiky a klimatu](https://mpo.gov.cz/cz/energetika/strategicke-a-koncepcni-dokumenty/vnitrostatni-plan-ceske-republiky-v-oblasti-energetiky-a-klimatu--285293/) z roku 2024) zahrnují i teplárenství, nadále v tomto sektoru chybí **jasná a sdílená dlouhodobá strategie**. Taková, která by byla provázána se strategií rozvoje elektroenergetiky a strategií renovace budov a předvídatelně by se odrážela v nastavení regulací (včetně cenových), dotační podpory a podpory výzkumu a pilotních projektů v teplárenství. Bez této dlouhodobé předvídatelnosti může k hlubší transformaci celého sektoru dojít jen stěží.

### Ekonomické a regulatorní bariéry

Teplárenství je vysoce regulované odvětví,[^bariery-uvod-regulace] proto ekonomické bariéry úzce souvisejí s regulatorními:

- **Nízkoemisní výroba může být dražší a může s ní být spojeno vyšší riziko než u konvenční výroby.**[^bariery-naklady] Má sice často nižší provozní náklady, ale vyžaduje vysoké investice, které úspora provozních nákladů nemusí kompenzovat. Budoucí provozní náklady navíc není vždy snadné odhadovat (zejména budoucí ceny elektřiny). Zvýšení celkových nákladů pak musí být kompenzováno dotační podporou nebo zvýšením ceny tepla pro zákazníky.
- **Celková cena elektřiny (bez níž se neobejdou tepelná čerpadla) je dnes příliš vysoká.** To je obecnější problém pomalé transformace elektroenergetiky a její vysoké emisní intenzity, při které cenu elektřiny (obzvlášť v zimě) značně zvyšují emisní povolenky a drahý zemní plyn. Je to ovšem i problém cenové regulace v elektroenergetice – tepelná čerpadla čelí příliš vysokým stálým platbám (za kapacitu sítě), přestože by mohla být využívána flexibilně a distribuční síť tak příliš nezatěžovat. Stejně tak je ze strategického hlediska nevhodné, aby elektrifikaci brzdily vysoké poplatky na podporu obnovitelných zdrojů energie, které přetrvávají z minulosti.[^bariery-poze]
- **Krátkodobá cenová regulace neumožňuje do ceny tepla promítnout dlouhodobější transformaci.** Na rozdíl od sektorů elektroenergetiky a plynárenství, kde jsou 5letá regulační období, v teplárenství stanovuje Energetický regulační úřad ceny tepla vždy jen na 1 rok. Kromě toho mohou v některých soustavách transformaci blokovat účetní odpisy stávajících zařízení.[^bariery-odpisy] Cenovou regulaci v teplárenství proto bude potřeba upravit tak, aby brala více v potaz dlouhodobost dekarbonizace sektoru.[^bariery-regulace]

{% include preview-box.html
    slug="emisni-povolenky-ets-2"
%}

- **Teplárenství čelí konkurenci lokálního vytápění, které je méně zatíženo environmentální regulací.** Při zdražování dálkového tepla tak soustavám hrozí, že se od nich zákazníci budou odpojovat a budou přecházet na lokální vytápění. Od roku 2027 má fosilní paliva v lokálním vytápění nově zpoplatnit evropský systém EU ETS 2, který by měl vést k určitému narovnání podmínek mezi lokální a dálkovou výrobou tepla.[^bariery-lokalni-konkurence]
- **Transformaci tepláren někdy komplikuje vlastnická struktura.** Např. když rozvody tepla vlastní město a výrobu tepla vlastní soukromý subjekt. Veřejní a soukromí aktéři mají často protichůdné motivace, a tak může být obtížné se dohodnout na dlouhodobém směřování i na načasování změn.

### Technologické a infrastrukturní bariéry

Pro dobrou účinnost využití tepla okolního prostředí (pomocí tepelných čerpadel) a dalších nízkoemisních zdrojů tepla (jako je například fototermická energie, geotermální energie či nízkopotenciální odpadní teplo) je klíčové co nejvíce **snížit teplotu média v teplárenských rozvodech**. Tím je dnes obvykle stlačená voda o teplotě okolo 120 °C, v některých případech dokonce stlačená pára o teplotě až 200 °C či více. Pokud se teplotu média podaří snížit např. na 70–80 °C, je to pro tepelné čerpadlo výrazně snazší (zvýšení teploty např. z 15 °C na 80 °C je mnohem jednodušší než na 120 °C).

Snížení teploty rozvodů nicméně v některých případech vyžaduje kompletní rekonstrukci soustavy (parní sítě nelze provozovat s horkou vodou). To je nákladný projekt na mnoho let, vyžadující koordinaci s vedením města a dotační podporu.

V mnoha případech ale kompletní rekonstrukce nutná není a bariéry ke snížení teplot v rozvodech (tedy i zvýšení účinnosti) leží jinde:

- **Chybí data z provozu soustavy.** Digitalizace rozvodů by umožnila provoz optimalizovat – díky ní by totiž byla k dispozici průběžná data o teplotách, tlacích a průtocích v síti a bylo by možné automatizovaně řídit čerpadla a ventily. Na základě těchto dat se také může ukázat, že teplotu v soustavě lze snížit i bez jakýchkoliv dalších stavebních zásahů.
- **Zákazníci teplárny mají teplotu média garantovanou ve smlouvě o dodávce tepelné energie.** Proto může větší snížení teplot vyžadovat složité vyjednávání: čím větší soustava nebo část soustavy by se měla měnit, tím více je zákazníků, u nichž bude nutné smlouvy přejednat. Pomoci by mohla dlouhodobá strategie a regulace, která by provozovateli soustavy umožňovala (za předem stanovených podmínek) teploty snižovat.
- **Snižování teploty média často vyžaduje renovaci připojených budov, příp. jiné stavební zásahy.** Týká se to především budov s nejnižším energetickým standardem (tedy hlavně těch starých, které neprošly renovací). Pro rozvody s teplotou okolo 70 °C je vhodné renovovat budovy alespoň na úroveň energetické třídy D.[^bariery-renovace] Také proto se evropská [Směrnice o energetické náročnosti budov](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32024L1275) v revizi z roku 2024 zaměřuje mimo jiné právě na renovaci budov s nejnižším energetickým standardem. Návrh opatření, která takovou renovaci budov podpoří, je už na jednotlivých členských státech. Ty mají za úkol do konce roku 2026 sestavit svoje národní Vnitrostátní plány renovace budov, které by k tomuto cíli měly přispět.

## Zdroje a poznámky

{% include preview-box.html
    title="Podcastové epizody"
    text="Dekarbonizací teplárenství se také zabývají epizody našeho podcastu s Michaelou Valentovou (ČVUT) a s Václavem Kleinem (Gentec CHP)."
    slug="87-ceske-teplarenstvi,79-kogenerace"
%}

Tento text vychází z několika českých studiích a strategií:

- [Vnitrostátní plán České republiky v oblasti energetiky a klimatu](https://mpo.gov.cz/cz/energetika/strategicke-a-koncepcni-dokumenty/vnitrostatni-plan-ceske-republiky-v-oblasti-energetiky-a-klimatu--285293/). MPO, 2024
- Jaroslav Knápek, Michaela Valentová, Rostislav Krejcar, Jiří Vašíček, Jiří Vecka. [Klimaticko-energetické investice v teplárenství 2014–2030](https://ekonom.fel.cvut.cz/cs/katedra/lide/valenmi7/cic2030/reports/ipp-teplarenstvi-report-final.pdf). ČVUT v Praze, 2021
- Michaela Valentová, Jaroslav Knápek, Adam Kubín, Jiří Vašíček. [Dekarbonizace teplárenství: strategický, regulační a technologicko-ekonomický rámec v České republice](https://www.budovy21.cz/wp-content/uploads/2022/07/prehledova-studie-dekarbonizace-teplarenstvi-cvut-46-MB.pdf). ČVUT v Praze, 2022
- Martin Hájek, Jiří Vecka. [Potenciál využití nízkoteplotních zdrojů tepla v soustavách zásobování tepelnou energií (SZTE) v ČR](https://tscr.cz/wp-content/uploads/2024/05/potencial-vyuziti-nizkoteplotnich-zdroju-tepla-v-SZTE-v-CR-novy.pdf). Teplárenské sdružení České republiky, 2024
- Martin Hájek, Jiří Vecka. Ekonomické hodnocení využití tepelného čerpadla v rámci soustavy zásobování teplem. Teplárenské sdružení České republiky, 2025

Možné scénáře vývoje přibližně do roku 2030 a 2050 jsou založeny na vlastní rešerši dříve publikovaných scénářů a jejich cílem je ve zjednodušené formě ukázat základní strategické možnosti sektoru.

**Poznámky**

[^teplarny-analogie]: Tato analogie samozřejmě není zcela přesná, protože teplárenská soustava může mít mnoho zdrojů tepla (zatímco plíce v těle jsou dvě) a také řadu oddělených okruhů s různými teplotami, které jsou propojeny výměníkovými stanicemi (zatímco krev proudí v jediném propojeném systému).
[^dalkovy-chlad]: Dálkové teplo a chlad může poskytovat stejná teplárna ze stejného areálu. Je k tomu ovšem potřeba další sada potrubí – typicky rozvádějícího chladnou vodu – a zařízení na výrobu chladu, jako jsou tepelná čerpadla nebo tzv. trigenerace. Nové soustavy dálkového chladu mohou nejsnadněji vznikat v nových městských čtvrtích, u velkých obchodních a administrativních center, nemocnic nebo průmyslových areálů.
[^teplarny-rozsah]: Podle registru Energetického regulačního úřadu a dat ČSÚ je zde cca 600 soustav dálkového vytápění, na něž je napojeno cca 1,5 mil. domácností pomocí cca 5 000 km potrubí.
[^lokalni-teplo]: Založeno na [energetických bilancích](https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/) od Eurostatu. Toto číslo pro jednoduchost vynechává spalování v průmyslu, kde statistiky nerozlišují vytápění průmyslových budov od tepla využitého na výrobní procesy. Od konečné spotřeby energie v domácnostech (mimo dálkového tepla) dále odečítá hrubý odhad spotřeby energie na vaření, osvětlení a další spotřebiče (dle šetření [Energo 2021](https://csu.gov.cz/energo-2021)).
[^neusporne-budovy]: To nemusí platit v případě energeticky neúsporných budov při snižování teplot rozvodů – tento proces vyžaduje součinnost i na straně majitelů vytápěných budov (viz poslední kapitola).
[^rozpad-soustav]: V případě rozpadu teplárenských soustav může nastat hromadný přechod na individuální vytápění zemním plynem. Pak by bylo těžké domácnosti motivovat k přechodu na tepelná čerpadla nebo jiné nízkoemisní alternativy. V některých městských oblastech navíc není dostatek kapacity pro distribuci elektřiny, aby všechny domácnosti využívající dálkové teplo mohly své vytápění elektrifikovat (jednoduše řečeno často nejsou v ulicích zakopané dost "tlusté" elektrické kabely nebo je nedostačující kapacita existujících transformátorů, souvisejícího vedení vysokého napětí apod.).
[^evropska-legislativa]: Směrnice o energetické účinnosti (Energy Efficiency Directive, EED) definuje tzv. účinné systémy dálkového vytápění a chlazení. V revizi z roku 2023 požaduje postupně se zpřísňující limity na podíl energie z obnovitelných zdrojů a odpadního tepla (tedy teplo okolního prostředí, příp. odpadní teplo, s jehož využitím mohou pomoci tepelná čerpadla, a různé formy biomasy). V roce 2035 musí být tento podíl alespoň 50 %, v roce 2045 musí být podle směrnice tento podíl 75 %, v roce 2050 pak 100 %. Až do roku 2045 ovšem směrnice umožňuje zčásti nahradit tyto zdroje energie velmi vysokým podílem tzv. vysoce účinné kogenerace (která se dnes v českém teplárenství buduje).
[^zahranici-rozsirovani]: Viz např. [plán na vytápění](https://www.wien.gv.at/umwelt/waermeplan-2040) města Vídeň do roku 2040.
[^ekonomicke-duvody]: Ekonomické důvody konce uhlí ve výrobě elektřiny a tepla úzce souvisí s klimatickými důvody, protože výrobu z uhlí prodražují evropské emisní povolenky. Ty tímto způsobem do ceny započítávají klimatické externality, více viz text [Jak fungují evropské emisní povolenky?](/explainery/emisni-povolenky-ets)
[^spalovny]: Přehled budovaných a plánovaných spaloven nabízí např. [článek](https://archiv.hn.cz/c1-67516150-v-cesku-vznikaji-nove-spalovny-odpadu-misto-ctyr-jich-muze-byt-az-dvacet-jedna-podivejte-se-kde-maji-stat) z Hospodářských novin z konce roku 2024.
[^studie-konec-uhli]: Více detailů nabízí studie [Výroba elektřiny v Česku bez uhlí](/studie/2024-vyroba-elektriny-v-cesku-bez-uhli) z roku 2024 (v kapitole 5.4).
[^stav-transformace]: Nejvíce informací lze najít v žádostech o povolení EIA, v seznamech projektů podpořených z Modernizačního fondu a v seznamech projektů s udělenou provozní podporou pro vysoce účinnou kogeneraci elektřiny a tepla.
[^biometan]: Co se týče biometanu, vládní Akční plán rozvoje využívání biometanu odhaduje jeho potenciál pro rok 2030 okolo 500 mil. m<sup>3</sup> (tedy asi 5 TWh energie) a pro rok 2040 asi 2 300 mil. m<sup>3</sup> (asi 23 TWh energie). Takový objem už by byl velmi relevantní, nicméně stále zcela nedostačující pro nahrazení veškerého využití zemního plynu napříč celou energetikou předpokládané v roce 2030 (cca 80–100 TWh energie). Navíc není zřejmé, kolik z tohoto potenciálu se v Česku podaří naplnit.
[^vodik]: Rozšiřování výroby nízkoemisního vodíku v Evropě i ve světě zatím probíhá pomaleji, než se v minulosti předpokládalo. Rovněž ceny technologií klesají pomaleji. Je tak možné, že nízkoemisní vodík bude za přijatelnou cenu dostupný až po roce 2040 a pro potřeby teplárenství možná nebude dostatečně levný nikdy. Kromě toho je problematické jak skladování vodíku pro sezónní využití (nelze využít klasické plynové zásobníky), tak jeho doprava do jednotlivých tepláren (je třeba vybudovat nové přípojky pro vodík, případně v určité distribuční oblasti zcela nahradit zemní plyn vodíkem, což je obojí komplikované).
[^teplo-bez-elektriny]: Kromě elektrifikace lze teplo vyrábět i přímo a bez významné spotřeby elektřiny pomocí hlubších geotermálních zdrojů nebo fototermických panelů. Ani pro jednu z těchto dvou technologií ale Česko v evropském srovnání nemá optimální podmínky.
[^otepleni]: Konkrétně v Praze podle [dat](https://www.ptas.cz/data/folders/srovnani-parametru-indikujicich-spotrebu-tepelne-energie-v-topnych-sezonach-po-mesicich-1997-2024-f276.pdf) Pražské teplárenské za posledních 30 let klesly tzv. denostupně, což je běžná metrika v teplárenství, která popisuje, jak dlouhá a chladná je v daném místě topná sezóna. Trend denostupňů mezi sezónami 1997/98 a 2024/25 poklesl o více než 10 %, mezi jednotlivými sezónami jsou ale velké výkyvy (směrodatná odchylka denostupňů napříč sezónami je cca 8 % průměrného počtu denostupňů).
[^cerpadlo-praha]: Viz např. [článek](https://www.e15.cz/byznys/prumysl-a-energetika/tretinu-prahy-muze-vytapet-odpadni-voda-zajisti-to-tepelna-cerpadla-na-cisarskem-ostrove-1392279) v E15 z roku 2022. Ani v roce 2025 však stále není zřejmé, zda tento projekt skutečně vznikne. Mělo by jít o sadu čerpadel využívající odpadní teplo z Ústřední čistírny odpadních vod Praha.
[^cena-regulovana-slozka]: Dnes je v době přebytků prakticky zdarma silová složka elektřiny, nezanedbatelná ale zůstává regulovaná složka ceny (včetně poplatků na podporu obnovitelných zdrojů). Ekonomiku provozu při dnešní tarifní struktuře může výrazně vylepšit poskytování záporných služeb výkonové rovnováhy (tedy služeb, které stabilizují síť při nadbytku elektřiny). Do budoucna by ekonomiku provozu mohly proměnit flexibilní tarify, příp. účtování fixních plateb podle skutečné míry zatěžování soustavy v době největší spotřeby. Oba tyto zmíněné prvky tarifní struktury už dnes fungují v některých evropských zemích.
[^zalozni-zdroje]: Jde typicky o plynové kotle, podobné běžným kotlům v domácnostech, jen s výrazně vyšším výkonem. Záložní plynové kotle kromě pokrývání špiček spotřeby mohou sloužit jako záloha při odstávkách hlavních zdrojů tepla.
[^nedostupnost-vodiku]: Dle současného výhledu bude pro teplárenství pravděpodobně stejně cenově nedostupný i nízkoemisní vodík, minimálně do roku 2035 až 2040.
[^akumulace-svet]: Největší současné zařízení pro akumulaci horké vody v Česku je v Teplárnách Brno. Jde o dva nadzemní zásobníky (válcovité budovy), které mají dohromady objem cca 10 mil. litrů. Největší teplárenské akumulační zásobníky v Evropě jsou ve Skandinávii, například v dánském městě Vojens stojí [hloubený zásobník](https://solarheateurope.eu/casestudy/solar-district-heating-with-the-largest-pit-thermal-storage-globally/#:~:text=This%20extensive%20storage%20functions%20as,approximately%206%2C000%20tonnes%20per%20year.) o objemu 210 mil. litrů, ve finském městě Vantaa se dokonce buduje [podzemní zásobník](https://helsinkismart.fi/worlds-largest-cavern-thermal-energy-storage-built-in-vantaa) o objemu 1100 mil. litrů.
[^akumulace-dlouhodoba]: Například rekordní akumulační nádrž v Dánsku o objemu 210 mil. litrů zásobuje teplem město Vojens se 7 tisíci obyvateli. Díky této nádrži mohou fototermické panely v málo slunečné oblasti Dánska pokrýt cca 50 % spotřeby dálkového tepla v tomto městě.
[^rozvoj-vitr]: Ekonomický přínos rozvoje větrné energetiky ukazuje studie [Cesty k čisté a levné elektřině v roce 2050](/studie/2024-cesty-k-ciste-a-levne-elektrine-2050) z roku 2024.
[^bariery-uvod-regulace]: Teplárny kvůli nákladné rozvodné infrastruktuře tvoří tzv. přirozený monopol. Taková odvětví ve vyspělém světě běžně podléhají regulaci, což chrání zákazníky před možným zneužíváním monopolního postavení.
[^bariery-naklady]: Při započítání úplných nepřímých společenských nákladů fosilní energetiky by nízkoemisní výroba tepla ve většině případů vycházela znatelně levněji než fosilní výroba. Současná míra zpoplatnění uhlíku v [evropském systému ETS](/explainery/emisni-povolenky-ets) ovšem zdaleka nedosahuje úrovně odhadovaných celkových společenských nákladů spojených s vypouštěním CO<sub>2</sub>. Proto dává ekonomicky smysl dekarbonizaci teplárenství zčásti dotovat, příp. regulatorně vynucovat. Už dnes většina teplárenských zdrojů dostává nějakou formu dotací.
[^bariery-poze]: Většina těchto poplatků vznikla v rámci tzv. solárního boomu okolo roku 2010. Tento příběh nepovedené legislativy dobře popisuje [článek](https://www.irozhlas.cz/zpravy-domov/fotovoltaika-energetika-obnovitelne-zdroje_1912040600_jab) na serveru iRozhlas.cz.
[^bariery-odpisy]: Buď jsou stávající zařízení v soustavě už do značné míry účetně odepsaná a nízké další odpisy neumožňují financovat ani prostou obnovu (natož pak větší investice), nebo je soustava naopak zatížena vysokými nedávnými investicemi do uhelných zařízení, která nejsou a před jejich odstavením nebudou včas účetně odepsána.
[^bariery-regulace]: K tomu ovšem musí ERÚ dostat mandát, který je jasně definován v dlouhodobé vládní strategii, či dokonce v energetickém zákoně (po novelizaci).
[^bariery-lokalni-konkurence]: Cena povolenek v systému ETS 2 se ovšem ještě dlouho nemusí srovnat s cenou v systému ETS 1 – odpojování od teplárenských soustav proto nemusí dost účinně bránit.
[^bariery-renovace]: Někdy lze nedostatečný energetický standard kompenzovat dalšími zásahy, např. zvýšením rychlosti průtoku teplé vody v topném systému budovy, výměnou topných těles za větší, izolací rozvodů tepla uvnitř budovy, příp. instalací doplňkového lokálního zdroje tepla pro nejchladnější období.
