---
layout:      explainer
title:       "Jak dekarbonizovat výrobu oceli?"
slug:        "dekarbonizace-oceli"
published:   2023-09-11
authors:
  - id: "adam-bilek"
  - id: "jirka-lnenicka"
    minor-role: "editace"
  - id: "marcel-otruba"
    minor-role: "ilustrace"
  - name: "Jiří Mravec"
    affiliation: Třinecké železárny
    minor-role: "konzultace"
weight:      74
tags-scopes: [ svet ]
tags-topics: [ emise, opatreni ]
cover-source-author:      "Ant Rozetsky"
cover-source-text:        "Unsplash"
cover-source-license:     "Unsplash License"
cover-source-license-url: "https://unsplash.com/license"
cover-source-url:         "https://unsplash.com/photos/io7dX_1EFCg"
perex: |
    Výroba oceli je emisně velmi náročná. Zároveň se jedná o materiál, který je pro fungování moderní společnosti naprosto zásadní. Proto je dekarbonizace tohoto průmyslového sektoru velice důležitá. Cest k ní vede několik a každá má své výhody i nevýhody.
---

{% include preview-box.html
    title="Technologie dekarbonizace průmyslu"
    text="Více informací najdete v tomto textu."
    slug="technologie-dekarbonizace-prumyslu"
%}

Ocel je jednou z nejdůležitějších surovin a lidstvo ji využívá ve stavebnictví, dopravě, průmyslu i mnoha dalších odvětvích. V technické praxi se rozlišují různé druhy ocelí a litin, někdy se také odděluje výroba surového železa a jeho další zpracování. Pro základní představu o možnostech dekarbonizace ale nejsou tyto detaily příliš podstatné, a proto se jimi tento text nezabývá.

## Výroba oceli a emise skleníkových plynů

{% include preview-box.html
    title="Jak se na dekarbonizaci dívají v jedné z oceláren v Česku"
    text="Rozhovor s oceláři přináší tato epizoda podcastu 2050."
    slug="28-trinecke-zelezarny"
%}

Celkově se na světě ročně vyrobí 1,9 milionu tun oceli.[^vyroba-oceli-data] Většina této produkce (okolo 75 %) probíhá ve vysokých pecích, kde se spaluje uhlí či koks. Zbývajících 25 % připadá na elektrické obloukové pece, případně na tzv. přímou redukci železa. Tyto dva výrobní postupy se velmi liší svou emisní intenzitou.[^emisniintenzitaoceli-WEF] Zatímco v případě surového železa vyráběného ve vysokých pecích připadá na každou vyrobenou tunu oceli cca 2,3 tuny oxidu uhličitého (t CO<sub>2</sub>), při recyklaci železa v pecích obloukových vzniká na 1 tunu oceli pouze 0,6 t CO<sub>2</sub>. Celosvětově je průměrná emisní intenzita výroby oceli 1,9 t CO<sub>2</sub> na tunu oceli,[^emisni-intenzita-srovnani] v jednotlivých zemích však může být toto číslo velmi různé – vždy záleží na konkrétním poměru výrobních technologií.[^emisniintenzitaoceli-zeme]

Celkově představuje výroba oceli **7 % světových emisí skleníkových plynů a 11 % světových emisí CO<sub>2</sub>**. Zhruba polovina těchto emisí vzniká při spalování uhlí (koksu), druhá polovina při chemické reakci.[^emiseocel] Železné rudy jsou totiž sloučeniny železa s kyslíkem (například Fe<sub>3</sub>O<sub>4</sub>, Fe<sub>2</sub>O<sub>3</sub>)[^zelezne-rudy] a při výrobě surového železa je nutné tento kyslík z rudy vyvázat (tzv. redukční reakce). K tomu se ve vysokých pecích používá koks, který slouží nejen jako palivo, ale i jako redukční činidlo (uhlík z koksu na sebe naváže kyslík z rudy).

{% include figure.html
    name="vzorec.svg"
    alt="FeCO3 + C ⟶ Fe + CO2"
%}

Protože uhlí (koks) je fosilní palivo, jedna z klíčových cest pro dekarbonizaci výroby surového železa spočívá v tom použít namísto uhlíku vodík – při redukční reakci pak nevzniká CO<sub>2</sub>, ale voda. Technologicky však jde o jiný proces a vodík není možné používat v současných vysokých pecích.

## Dekarbonizace výroby oceli

Tento průmyslový sektor bude obtížné dekarbonizovat (patří k tzv. *hard-to-abate sectors*). Existují už ale první projekty, které ukazují, že nízkoemisní ocel vyrábět lze.

{% capture greensteel %}

[SSAB](https://www.smithsonianmag.com/smart-news/green-steel-produced-first-time-180978550/) – pomocí zeleného vodíku byla ocel poprvé vyrobena (a následně využita na výrobu kamionů) v roce 2021 v rámci pilotního projektu ve Švédsku. Ve velkém měřítku by měla být zelená ocel vyráběna od roku 2026.

[H2 Green Steel](https://www.mining-technology.com/news/green-steel-hydrogen/) – na rok 2025 se ve Švédsku plánuje spuštění první větší ocelárny, která bude vyrábět uhlíkově neutrální ocel s využitím zeleného vodíku. Bude se jednat o první větší ocelárnu tohoto druhu.

[Emirates Steel Arkhan](https://www.emiratessteelarkan.com/emirates-steel-arkan-demonstrates-industrialsustainability-leadership-during-the-make-it-in-the-emirates-forum2023/) – první ocelárna, která ve větším měřítku využívá technologii zachytávání uhlíku (CCS). Emisní náročnost zde produkované oceli je však pouze o 45 % nižší než v případě konvenčně vyráběné oceli, pro další snížení emisí tak existuje ještě velký prostor.

Seznam projektů v EU, které mají za cíl snížit emisní náročnost výroby oceli, lze najít na webu [EUROFER](https://www.eurofer.eu/issues/climate-and-energy/maps-of-key-low-carbon-steel-projects/).

{% endcapture %}

{% include expander-figure.html
    name="greensteel"
    expanded=false
    class="contrast-figure "
    label="Příklady projektů využívajících dekarbonizační technologie"
    content=greensteel
%}

Je tedy na místě zvažovat, jak lze tyto projekty škálovat, kolik to bude stát a jak se to projeví na celkových emisích z výroby oceli. Na tyto a další otázky se snaží odpovědět tzv. **sektorové dekarbonizační scénáře**, což jsou studie možného vývoje sektoru výroby oceli, který by vedl k nízkým nebo nulovým emisím skleníkových plynů.

V dalším textu vycházíme z dekarbonizačních scénářů těchto institucí:
- IPCC: [Sixth Assessment Report – Working Group III: Kapitola 11](https://www.ipcc.ch/report/ar6/wg3/downloads/report/IPCC_AR6_WGIII_FullReport.pdf)
- Mission Possible Partnership: [Making Net Zero Steel Possible](https://missionpossiblepartnership.org/wp-content/uploads/2022/09/Making-Net-Zero-Steel-possible.pdf)
- Mezinárodní agentura pro energii: [Iron and Steel Technology Roadmap](https://iea.blob.core.windows.net/assets/eb0c8ec1-3665-4959-97d0-187ceca189a8/Iron_and_Steel_Technology_Roadmap.pdf)
- McKinsey: [Transition to Net Zero: Steel](https://www.mckinsey.com/capabilities/sustainability/our-insights/spotting-green-business-opportunities-in-a-surging-net-zero-world/transition-to-net-zero/steel)
- World Economic Forum: [Net Zero Industry Tracker (2022)](https://www3.weforum.org/docs/WEF_NetZero_Industry_Tracker_2022_Edition.pdf)

**Všechny tyto scénáře se shodují v několika obecných rysech:**
- **Výroba oceli v budoucnu mírně poroste** a lze očekávat, že v roce 2050 bude o 10–40 % vyšší než dnes. Při využívání současných technologií by to znamenalo nárůst emisí z dnešních cca 3 Gt CO<sub>2</sub> na 4–4,5 Gt CO<sub>2</sub>.
- Scénáře zpravidla nepočítají s úplnou dekarbonizací sektoru. Například scénář Making Net Zero Possible směřuje k emisím okolo 0,3 Gt CO<sub>2</sub> v roce 2050. To je nicméně už jen malá část současných emisí v tomto odvětví.
- Dominantní roli v dekarbonizaci hrají **tři technologie: využití zeleného vodíku, CCS a recyklace**, přičemž každá z těchto technologii by se mohla na snížení emisí podílet 20–30 %. Podrobnosti o těchto technologiích a možnostech jejich nasazení jsou uvedeny níže. Míra jejich využití totiž bude záviset na situaci v daném regionu.
- **Dekarbonizovaná ocel bude dražší**, u zelené oceli se očekává zvýšení ceny o 25–50 %. **Na cenách koncových výrobků se ale toto zvýšení ceny oceli projeví jen málo**. Automobil či dům, v nichž je použita nízkoemisní ocel, bude stát cca o 1 % více než ten, který využívá ocel vyrobenou současnými technologiemi[^wef] – cena oceli tvoří zpravidla pouze zlomek celkové ceny produktu.
- **Zpoplatňování emisí skleníkových plynů** (např. systém EU ETS) **bude zvyšovat konkurenceschopnost nízkoemisní oceli**. Lze očekávat, že při cenách 180–360 dolarů za tunu CO<sub>2</sub> by byla nízkoemisní ocel stejně drahá jako ocel vyráběná současnými metodami (nebo i levnější). Podobně se například ceny přiblíží nebo zcela srovnají v důsledku *Inflation Reduction Act* (IRA) v USA, který poskytuje významné slevy na daních podnikům, které vyrábějí zelený vodík a zachytávají CO<sub>2</sub>.[^iravodik]

### Jaké technologie je možné využít?

#### Přímá redukce železa zeleným vodíkem

{% include lead-in-figure.html
    name="prima-redukce-vodikem.svg"
    class="leadin-figure-small"
    alt="Piktogram přímé redukce železa zeleným vodíkem"
%}

Umožňuje nahradit emisně nejnáročnější část výroby oceli – vysoké pece, ve kterých se jako palivo i jako redukční činidlo používá koks. Takto vyrobené surové železo je pak nutné dále zpracovávat v elektrických obloukových pecích. Nutnou podmínkou je dostupnost vodíkové infrastruktury (elektrolyzéry, skladovací kapacity nebo produktovody). Cena zeleného vodíku, a tedy i cena oceli vyráběné s jeho využitím, pak bude závislá na ceně elektřiny – a lze proto očekávat, že tento způsob bude využíván zejména v oblastech s dostatkem obnovitelných zdrojů. Kromě toho by přechod na výrobu oceli pomocí zeleného vodíku vyžadoval velké investice do nových typů vysokých pecí. V důsledku zmíněných faktorů se tak redukce zeleným vodíkem uplatní jen asi u třetiny očekávané výroby oceli, přestože vypadá jako nejvíce přímočaré řešení.

#### Zachytávání CO<sub>2</sub> (CCS)

{% include lead-in-figure.html
    name="zachytavani-co2.svg"
    class="leadin-figure-small"
    alt="Piktogram zachytávání CO2"
%}

Na vysoké pece je možné nainstalovat zařízení na zachytávání oxidu uhličitého (tzv. <glossary id="ccs">CCS</glossary>). Tato zařízení dokáží zachytit 90–95 % emisí CO<sub>2</sub> dané ocelárny. Čím je ovšem míra zachytávání vyšší, tím je proces také energeticky a finančně náročnější. Technologie zachytávání CO<sub>2</sub> je zatím ve fázi drobných pilotních projektů.[^ocelccscena] Nutnou podmínkou pro větší využití CCS je dostupnost geologických úložišť pro zachycené CO<sub>2</sub>.

#### Recyklace a čistá elektřina

{% include lead-in-figure.html
    name="recyklace.svg"
    class="leadin-figure-small"
    alt="Piktogram recyklace a čistá elektřiny"
%}

Při současné recyklaci oceli v elektrických obloukových pecích vzniká ve srovnání s výrobou ze surového železa ve vysokých pecích jen zlomek emisí (při běžném mixu elektřiny je to 0,6 tuny CO<sub>2</sub> na tunu oceli oproti 2,3 tuny CO<sub>2</sub> při výrobě ve vysoké peci). Pokud by byly obloukové pece napájeny z nízkoemisních zdrojů elektřiny (obnovitelné zdroje nebo jádro), vyráběly by prakticky bezemisní ocel. Již dnes jde o používanou technologii, například v USA se takto vyrábí 70 % oceli.[^iravodik] Celkově se na světě recykluje okolo 85 % oceli,[^ocelrecyklace] klíčovým limitem pro využití této technologie bude dostupnost železného šrotu (ocel je materiál s dlouhou životností, objem využitelného šrotu je tedy relativně omezený).

#### Doplňkové technologie

Mezi doplňkové metody patří například přímá redukce železa pomocí zemního plynu, která je vhodná v regionech, kde je plyn levný a dostupný (například v USA či Rusku). Emisní intenzita v tomto případě dosahuje 1 tuny CO<sub>2</sub> na tunu vyrobené oceli, oproti výrobě ve vysokých pecích je tedy emisní stopa více než o polovinu nižší.[^iravodik] Dále je částečně možné jako palivo či redukční činidlo využívat biomasu. Vzhledem k potřebě velkého množství biomasy bude nicméně tato metoda nejspíš využívána jen omezeně, v regionech s vysokou dostupností biomasy, jako je Brazílie či Rusko.[^mckinsey] Využití biomasy ovšem s sebou nese i environmentální rizika a šetrnost řešení je často sporná. Dalšího drobného snížení emisí lze dosáhnout například zvyšováním efektivity existujících pecí či využíváním železných rud s vyšším obsahem železa.

### Co ovlivní průběh dekarbonizace?

Budoucnost konkrétní ocelárny bude záležet na řadě faktorů: na výši státní podpory pro tyto podniky, vzdálenosti od geologického úložiště pro zachycené CO<sub>2</sub> či na ceně zeleného vodíku a navazující infrastruktuře. V případě neúspěšné transformace se může stát, že některé ocelárny zaniknou, protože se výroba přesune někam, kde bude levný vodík či CCS. Zdroje často ovlivňovaly umístění ocelárny i v minulosti (například blízkost uhelných dolů).

Zároveň státy pokládají výrobu oceli za strategické průmyslové odvětví. Proto i když transformace probíhá v tržním prostředí, kde spolu různé ocelárny soutěží cenou, budou vlády výrobu nebo její dekarbonizaci významně podporovat. Do určité míry se to děje už dnes a přímé i nepřímé formy státní podpory může do budoucna ještě přibývat.

Hlavní opatření, které budou průběh dekarbonizace sektoru ovlivňovat:

- **Mechanismy snižující rozdíly v cenách nízkoemisní a vysokoemisní oceli**: ceny emisních povolenek či uhlíkové daně, investiční podpora (v EU například prostřednictvím Inovačního fondu), daňové úlevy na zavádění potřebných technologií (v USA například daňové úlevy na výrobu zeleného vodíku) nebo tzv. systém uhlíkového vyrovnávání na hranicích (CBAM).[^cbam]
- **Poptávka po nízkoemisní oceli**: zpracovatelé mohou o nízkoemisní oceli uvažovat i v případě, že bude dražší – protože se například zavázali snižovat svou uhlíkovou stopu nebo po nich výrobky s nižší emisní stopou budou chtít koncoví zákazníci.
- **Rozvoj výroby zeleného vodíku a technologií pro zachytávání CO<sub>2</sub>**.

V následujících letech bude stát mnoho oceláren před rozhodnutím, kterou cestou dekarbonizace se vydat. Tato rozhodnutí zásadně ovlivní jejich dlouhodobé fungování, na druhou stranu se musejí rozhodovat v prostředí plném nejistot – například plán na využití zeleného vodíku se může ukázat jako nevhodný, jestliže bude rozvoj jeho výroby pomalý nebo cena vysoká. Tato nepřehlednost prostředí vede k tomu, že mnoho výrobců oceli s potřebnými investicemi zatím vyčkává.

{% include figure.html
    name="ocel.jpg"
    alt="Výroba oceli"
    caption="1 tuna oceli = cca 1,9 tun CO<sub>2</sub>"
    source-text="Unsplash"
    source-url="https://unsplash.com/photos/zHK__gTTTds"
%}

## Poznámky a zdroje

[^vyroba-oceli-data]: [World Steel Association: Crude steel production](https://worldsteel.org/steel-topics/statistics/world-steel-in-figures-2022/)
[^emisniintenzitaoceli-zeme]: Studie [Steel Climate Impact](https://www.globalefficiencyintel.com/steel-climate-impact-international-benchmarking-energy-co2-intensities) uvádí emisní intenzity pro řadu zemí. Zatímco například v USA je průměrná emisní intenzita přibližně 1 t CO<sub>2</sub> na tunu vyrobené oceli, v Německu je to  1,5 t CO<sub>2</sub> a v Číně okolo 2 t CO<sub>2</sub>. Hlavní rozdíl spočívá v rozdílném poměru mezi výrobou ve vysokých pecích (tedy výrobou surového železa) a výrobou v obloukových pecích (tedy recyklací oceli) v jednotlivých zemích.
[^emisniintenzitaoceli-WEF]: [World Economic Forum: Net Zero Industry Tracker (2022)](https://www3.weforum.org/docs/WEF_NetZero_Industry_Tracker_2022_Edition.pdf)
[^emisni-intenzita-srovnani]: Zatímco Světové ekonomické fórum [WEF: Net Zero Industry Tracker (2022)](https://www3.weforum.org/docs/WEF_NetZero_Industry_Tracker_2022_Edition.pdf) uvádí průměrnou světovou emisní intenzitu výroby oceli 1,9 t CO<sub>2</sub>,  [Mezinárodní agentura pro energii (IEA)](https://www.iea.org/energy-system/industry/steel) uvádí průměrnou světovou emisní intenzitu 1,4 t CO<sub>2</sub> na tunu vyrobené oceli. Rozdíl mezi těmito údaji o emisní intenzitě je pravděpodobně způsoben různým započítáváním nepřímých emisí (scope 2), případně může souviset s tím, které procesy jsou do výroby oceli započítávány.
[^zelezne-rudy]: [Wikipedie: Železná ruda](https://cs.wikipedia.org/wiki/%C5%BDelezn%C3%A1_ruda)
[^ocelrecyklace]: [Yale Environment 360, 2021: Can the World’s Most Polluting Heavy Industries Decarbonize?](https://e360.yale.edu/features/can-the-worlds-most-polluting-heavy-industries-decarbonize)
[^wef]: [World Economic Forum, 2022: Net Zero Industry Tracker 2022 Edition](https://www3.weforum.org/docs/WEF_NetZero_Industry_Tracker_2022_Edition.pdf).
[^vysokepece]: [McKinsey&Company, 2022: Steel Transition to Net-Zero](https://www.mckinsey.com/capabilities/sustainability/our-insights/spotting-green-business-opportunities-in-a-surging-net-zero-world/transition-to-net-zero/steel)
[^emiseocel]: [Eurostat/EEA](https://docs.google.com/spreadsheets/d/1K5dbcngapuIdgrCRG0V8uV-c0ppirfYTwvvp8t54V3w/edit#gid=283480625).
[^mckinsey]: [McKinsey&Company, 2020: Decarbonization challenge for steel](https://www.mckinsey.com/industries/metals-and-mining/our-insights/decarbonization-challenge-for-steel)
[^h2greensteel]: [Mining Technology, 2023: Europe’s first commercial green steel plant to open in Sweden](https://www.mining-technology.com/news/green-steel-hydrogen/)
[^ocelteplota]: [Carbon Chain, 2022: Understand your steel emissions](https://www.carbonchain.com/blog/understand-your-steel-emissions)
[^missionpossible]: [Mission Possible Partnership, 2022: Making Net-Zero Steel Possible](https://missionpossiblepartnership.org/wp-content/uploads/2022/09/Making-Net-Zero-Steel-possible.pdf)
[^ocelccscena]: [MIT, 2021: How efficient is carbon capture and storage?](https://climate.mit.edu/ask-mit/how-efficient-carbon-capture-and-storage). Očekávaná cena zachytávání CO<sub>2</sub> se podle [IEA](https://www.iea.org/commentaries/is-carbon-capture-too-expensive) pohybuje kolem 35–95 eur (900–2 250 Kč) za tunu CO<sub>2</sub>. Cena oceli závisí na druhu požadovaného produktu a místě výroby, v západní Evropě se průměrná cena podle [Steel Benchmarker](http://steelbenchmarker.com/history.pdf) pohybuje kolem 700–800 eur (16 700–19 100 Kč).
[^iravodik]: [Boston Consulting Group: Impact of IRA, IIJA, CHIPS, and Energy Act of 2020 on Clean Technologies](https://breakthroughenergy.org/wp-content/uploads/2023/04/Steel-Cleantech-Policy-Impact-Assessment.pdf). V USA stojí tuna oceli vyrobená konvenční cestou ve vysoké peci 360 dolarů. Díky podpoře zeleného vodíku v rámci IRA může tuna surové oceli vyrobené pomocí zeleného vodíku stát 370 dolarů.
[^cbam]: [Evropská komise: Mechanismus uhlíkového vyrovnání na hranicích: Otázky a odpovědi](https://ec.europa.eu/commission/presscorner/detail/cs/qanda_21_3661)
