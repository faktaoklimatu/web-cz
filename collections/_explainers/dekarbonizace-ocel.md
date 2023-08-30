---
layout:      explainer
title:       "Jak dekarbonizovat výrobu oceli?"
slug:        "dekarbonizace-ocel"
published:   2023-09-07
authors:
  - id: "adam-bilek"
  - id: "jirka-lnenicka"
    minor-role: "editace"
  - name: "Jiří Mravec"
    affiliation: Třinecké železárny
    minor-role: "konzultace"

weight:      74
tags-scopes: [  ]
tags-topics: [  ]
cover-source-author:        "Ant Rozetsky"
cover-source-text:          "Unsplash"
cover-source-license:       "Unsplash License"
cover-source-license-url:   "https://unsplash.com/license"
cover-source-url:           "https://unsplash.com/photos/io7dX_1EFCg"
perex:       "Výroba oceli je emisně velmi náročná a jedná se o naprosto zásadní materiál potřebný pro fungování moderní společnosti. Je tak nutné její výrobu dekarbonizovat. Cest dekarbonizace je mnoho a každá má své výhody i nevýhody."
---

{% include preview-box.html
    title="Jaké jsou technologie dekarbonizace průmyslu?"
    text="Detailnější pohled na technologie dekarbonizace průmyslu výrobu můžete najít v našem explaineru."
    slug="technologie-dekarbonizace-prumyslu"
%}

Ocel je jednou z nejdůležitějších surovin, kterou lidstvo využívá ve stavebnictví, dopravě, průmyslu i mnoha dalších odvětvích. V technické praxi se rozlišují různé druhy ocelí a litin a také se někdy proces výroby rozděluje na výrobu surového železa a jeho další zpracování. Pro základní představu o možnostech dekarbonizace ale nejsou tyto detaily příliš podstatné a proto do nich v tomto textu nezabíháme.

## Výroba oceli a emise skleníkových plynů

{% include preview-box.html
    title="Dekarbonizace z perspektivy konkrétní ocelárny v Česku"
    text="Povídání o výrobě a dekarbonizaci oceli v českých podmínkách nabízí epizoda podcastu 2050."
    slug="28-trinecke-zelezarny"
%}

Celkově se na světě ročně vyrobí 1,9 Gt oceli.[^vyroba-oceli-data] Většina této výroby - okolo 75% - probíhá ve vysokých pecích pomocí spalování uhlí či koksu, zbývajících 25% připadá na elektrické obloukové pece případně tzv. přímou redukci železa. Tyto technologie se velmi liší svou emisní intenzitou.[^emisniintenzitaoceli-WEF] Zatímco na výrobu surového železa ve vysokých pecích připadá na každou vyrobenou tunu oceli cca 2,3 tCO<sub>2</sub>, při recyklaci železa v obloukových pecích vzniká pouze 0,6 tCO<sub>2</sub> na 1 tunu oceli. Světová průměrná emisní intenzita výroby je 1,9 tCO<sub>2</sub>[^emisni-intenzita-srovnani] na tunu oceli, v jednotlivých zemích se ale může velmi lišit podle poměru výrobních technologií.[^emisniintenzitaoceli-zeme]

Celkově představuje výroba oceli 7 % světových emisí skleníkových plynů a 11% světoých emisí CO<sub>2</sub>. Zhruba polovina emisí z výroby oceli je způsobena přímo spalováním uhlí (koksu), druhá polovina pochází z chemické reakce.[^emiseocel] Konkrétně jde o to, že železné rudy jsou sloučeniny železa s kyslíkem (například Fe<sub>3</sub>O<sub>4</sub>, Fe<sub>2</sub>O<sub>3</sub>)[^zelezne-rudy] a při výrobě surového železa je nutné kyslík z rudy vyvázat (tzv. redukční reakce). K tomu se ve vysokých pecích používá koks, který slouží nejen jako palivo, ale i jako redukční činidlo a uhlík z koksu na sebe naváže kyslík z rudy.

{% include figure.html
    name="vzorec.svg"
    alt="FeCO3 + C ⟶ Fe + CO2"
%}

Jednou z klíčových cest pro dekarbonizaci výroby surového železa je proto namísto uhlíku (koksu) použít vodík a při redukční reakci pak nevzniká CO<sub>2</sub>, ale voda. Technologicky však jde o jiný proces a vodík není možné používat v současných vysokých pecích.

## Dekarbonizace výroby oceli

Výroba oceli patří mezi sektory, které bude obtížné dekarbonizovat (tzv. hard-to-abate sectors), nicméně již existují demonstrační projekty, které ukazují, že lze vyrábět a prodávat nízkoemisní ocel za pomocí potřebných technologií.

{% capture greensteel %}

[SSAB](https://www.smithsonianmag.com/smart-news/green-steel-produced-first-time-180978550/) - První příklad oceli vyrobené ze zeleného vodíku je ze Švédska z roku 2021. Vyprodukovaná ocel byla následně použitá pro výrobu kamionů. Jednalo se o pilotní projekt a zelená ocel ve velkém měřítku se plánuje vyrábět od roku 2026.

[H2 Green Steel](https://www.mining-technology.com/news/green-steel-hydrogen/) - Na rok 2025 se ve Švédsku plánuje spuštění první větší ocelárny, která bude vybrábět uhlíkově neutrální ocel ze zeleného vodíku. Bude se jednat o větší první ocelárnu vyrábějící ocel ze zeleného vodíku.

[Emirates Steel Arkhan](https://www.emiratessteelarkan.com/emirates-steel-arkan-demonstrates-industrialsustainability-leadership-during-the-make-it-in-the-emirates-forum2023/): Jedná se o první ocelárnu, která ve větším měřítku využívá technologii CCS. Vyrobená ocel je ovšem pouze o 45 % méně emisně náročná než při více konvenčních postupech a existuje tak ještě velký prostor pro snížení emisí. 

Seznam projektů v EU, které mají za cíl snížit emisní náročnost výroby oceli lze nalézt na webu [EUROFER](https://www.eurofer.eu/issues/climate-and-energy/maps-of-key-low-carbon-steel-projects/)

{% endcapture %}

{% include expander-figure.html
    name="greensteel"
    expanded=false
    class="contrast-figure "
    label="Příklady projektů využívajících dekarbonizační technologie"
    content=greensteel
%}

Je tedy na místě zvažovat, jak lze tyto projekty škálovat, kolik to bude stát a jak se to projeví na celkových emisích sektoru výroby oceli. Na tyto a další otázky se snaží odpovědět tzv. **sektorové dekabonizační scénáře**, což jsou studie možného vývoje sektoru výroby oceli, který by vedl k nízkým nebo nulovým emisím skleníkových plynů.

Dále vycházíme z dekarbonizačních scénářů těchto institucí:
- IPCC: [Sixth Assessment Report - Working Group III: Kapitola 11](https://www.ipcc.ch/report/ar6/wg3/downloads/report/IPCC_AR6_WGIII_FullReport.pdf)
- Mission Possible Partnership: [Making Net Zero Steel Possible](https://missionpossiblepartnership.org/wp-content/uploads/2022/09/Making-Net-Zero-Steel-possible.pdf)
- Mezinárodní energetická agentura: [Iron and Steel Technology Roadmap](https://iea.blob.core.windows.net/assets/eb0c8ec1-3665-4959-97d0-187ceca189a8/Iron_and_Steel_Technology_Roadmap.pdf)
- McKinsey: [Transition to Net Zero: Steel](https://www.mckinsey.com/capabilities/sustainability/our-insights/spotting-green-business-opportunities-in-a-surging-net-zero-world/transition-to-net-zero/steel)
- World Economic Forum: [Net Zero Industry Tracker (2022)](https://www3.weforum.org/docs/WEF_NetZero_Industry_Tracker_2022_Edition.pdf)

**Všechny tyto scénáře se shodují v několika obecných rysech:**
- Výroba oceli v budoucnu mírně poroste a lze očekávat, že v roce 2050 bude o 10–40 % vyšší než dnes. Kdyby se přitom stále používali současné technologie, emise z výroby oceli by vzrostly z dnešních cca 3 GtCO<sub>2</sub> na 4 - 4,5 GtCO<sub>2</sub>.
- Scénáře zpravidla nepočítají s úplnou dekarbonizací sektoru. Například scénář Making Net Zero Possible směřuje k emisím okolo 0,3 GtCO<sub>2</sub> v roce 2050, což je ale zlomek současných emisí sektoru.
- Dominantní roli v dekarbonizaci hrají tři technologie: využití zeleného vodíku, CCS a recyklace, přičemž každá z těchto technologii by se mohla na snížení emisí podílet 20-30%. Podrobněji tyto technologie a možnosti jejich nasazení diskutujeme níže. Míra využití technologií totiž bude závislá na situaci v daném regionu.
- Dekarbonizovaná ocel bude dražší, *green premium* se očekává 25-50% ceny. Na cenách koncových výrobků se ale toto zvýšení ceny oceli projeví jen málo. Auto či dům vyrobené z dekarbonizované oceli budou stát cca o 1% více než ty vyrobené současnými technologiemi[^wef], jelikož cena oceli tvoří zpravidla pouze zlomek celkové ceny produktu.
- Zpoplatňování emisí skleníkových plynů (např. systém EU ETS) bude konkurenceschopnost nízkoemisní oceli zvyšovat. Lze čekat, že při cenách mezi 180 - 360 USD /tCO<sub>2</sub> by byla nízkoemisní ocel stejně drahá nebo levnější než ocel vyráběná současnými metodami. Podobně například v důsledku Inflation Reduction Act (IRA) v USA, který pro podniky, které vyrábějí zelený vodík a zachytávají CO<sub>2</sub> dává významné slevy na daních, se ceny nízkoemisní oceli přiblíží nebo zcela srovnají s cenami oceli vyráběné současnými postupy.[^iravodik]

### Technologie pro dekarbonizaci výroby oceli

* **Přímá redukce železa zeleným vodíkem**: Umožnuje nahrazení emisně nejnáročnější části výroby oceli: vysokých pecí, ve kterých se jako palivo i jako redukční činidlo používá koks. Takto vyrobené surové železo je pak nutné dále zpracovávat v elektrickcýh obloukových pecích. Nutnou podmínkou je dostupnost vodíkové infrastruktury (elektrolyzéry, skladovací kapacity nebo produktovody). Cena zeleného vodíku, a tedy i oceli vyráběné tímto způsobem, pak bude závislá na ceně elektřiny a lze tedy očekávat, že tento způsob se dobře uplatní v oblastech, kde je dostatek obnovitelných zdrojů. Kromě toho by přechod na výrobu oceli zeleným vodíkem vyžadoval velké investice do nových typů vysokých pecí. Přestože redukce zeleným vodíkem vypadá jako nejvíce přímočaré řešení, uplatní se v důsledku výše zmíněných faktorů jen asi ve třetině očekávané výroby oceli.

* **Zachytávání CO<sub>2</sub> (CCS)**: Na vysoké pece je možné nainstalovat zařízení na zachytávání CO<sub>2</sub>. Tato zařízení dokáží zachytit 90-95 % emisí CO<sub>2</sub> dané ocelárny. Čím je vyšší míra zachytávání, tím je proces energeticky i finančně náročnější. Technologie zachytávání CO<sub>2</sub> je zatím ve fázi drobných pilotních projektů.[^ocelccscena] Nutnou podmínkou pro využití CCS je dostupnost geologických úložišt pro zachycené CO<sub>2</sub>.

* **Recyklace a čistá elektřina**: Současná recyklace oceli v elektrických obloukových pecích produkuje ve srovnání s výrobou ve vysokých pecích jen zlomek emisí (při běžném mixu elektřiny 0,6 tun CO<sub>2</sub> na tunu oceli oproti 2,3 tun CO<sub>2</sub> při výrobě nové oceli ve vysoké peci). Pokud by byly obloukové pece napájeny z nízkoemisních zdrojů elektřiny (obnovitelné zdroje nebo jádro), vyráběly by prakticky bezemisní ocel. Již dnes jde o používanou technologii, například v USA je takto vyrobeno 70 % oceli.[^iravodik] Celkově se na světě recykluje okolo 85 % oceli[^ocelrecyklace], klíčovým limitem pro využití této technologie bude dostupnost železného šrotu.

* **Doplňkové technologie**: Mezi doplňkové metody patří například přímá redukce železa pomocí zemního plynu, která je vhodná v regionech kde je levný a dostupný jako například v USA či Rusku. Emisní intenzita takto vyrobené oceli dosahuje 1 tuny CO<sub>2</sub> na tunu vyrobené oceli. Jedná se tak o méně než polovinu emisní stopy oceli vyráběné ve vysokých pecích.[^iravodik] Dále je částečně možné využívat biomasu jako palivo či redukční činidlo. Vzhledem k nutnosti velkých dodávek biomasy se ovšem jedná o řešení, které bude spíše uplatnitelné v regionech s vysokou dostupností biomasy jako například v Brazílii či Rusku.[^mckinsey] Další drobné snížení emisí lze dosáhnout například zvyšováním efektivity existujích pecí či využíváním železných rud s vyšším procentem železa.

### Jaké faktory budou ovlivňovat průběh dekarbonizace výroby oceli?

Co se stane s konkrétní ocelárnou záleží na řadě faktorů. Rozhodující bude například míra státní podpory, blízkost geologického úložiště pro zachycené CO<sub>2</sub> či cena zeleného vodíku a navazující infrastruktura. V případě neuspěšné transformace se může stát, že konkrétní ocelárna zanikne, protože se výroba přesune někam, kde bude levný vodík či CCS. Koneckonců i v minulosti bylo běžné, že umístění ocelárny ovlivňovala například blízkost ke zdrojům uhlí.

Výroba oceli se ovšem pokládá za strategické průmyslové odvětví. Transformace tedy sice probíhá v tržním prostředí, ve kterém spolu různé ocelárny soutěží cenou, zároveň ale budou státy výrobu nebo její dekarbonizaci významně podporovat (jak se tomu již dnes do určité míry děje) a míra přímé i nepřímé formy státní podpory může do budoucna ještě posilovat.

Hlavní opatření, které budou průběh dekarbonizace sektoru ovlivňovat jsou:

- **Mechanismy budou snižující rozdíly v cenách nízkoemisní a vysokoemisní oceli**: Ceny emisních povolenek či výše uhlíkové daně, investiční podpora (v EU například skrz Inovační fond), daňové úlevy na aplikaci potřebných technologií (v USA například daňové úlevy na výrobu zeleného vodíku) nebo tzv.  systém uhlíkového vyrovnávání na hranicích (CBAM).[^cbam]
- **Poptávka po nízkoemisní oceli**: zpracovatelé mohou být ochotni použít nízkoemisní ocel i přesto, že je dražší, například kvůli svým závazkům snižovat uhlíkovou stopu, nebo kvůli poptávce koncových zákazníků, která bude zohledňovat emisní stopu výrobku.
- **Rozvoj výroby zeleného vodíku a technologií pro zachytávání CO<sub>2</sub>**.

V následujích letech bude stát mnoho oceláren před rozhodnutím kterou cestou dekarbonizace se vydat. Tato rozhodnutí zásadně ovlivní jejich dlouhodobé fungování, ale zároveň se ale musí rozhodovat v prostředí, ve kterém je mnoho nejistot - například plán na využití zeleného vodíku se může ukázat jako nevhodný, když bude rozvoj jeho výroby bude pomalý nebo jeho cena vysoká. Tato nepřehlednost prostředí vede k tomu, že mnoho výrobců s investicemi zatím vyčkává.

{% include figure.html
    name="ocel.jpg"
    alt="Výroba oceli"
    caption="1 tuna oceli = cca 1,9 tun CO<sub>2</sub>"
    source-text="Unsplash"
    source-url="https://unsplash.com/photos/zHK__gTTTds"
%}

## Poznámky a zdroje

[^vyroba-oceli-data]: [World steel association: crude steel production](https://worldsteel.org/steel-topics/statistics/world-steel-in-figures-2022/)  
[^emisniintenzitaoceli-zeme]: Studie [Steel climate impact](https://www.globalefficiencyintel.com/steel-climate-impact-international-benchmarking-energy-co2-intensities) uvádí emisní intenzity pro řadu zemí. Zatímco například v USA je průměrná emisní intenzita výroby oceli přibližně 1 tCO<sub>2</sub> na 1t oceli, v Německu je to  1,5 tCO<sub>2</sub> a v Číně okolo 2 tCO<sub>2</sub> na vyrobenou tunu oceli. Hlavní rozdíl mezi zeměmi spočívá v poměru mezi výrobou ve vysokých pecích (tedy výrobou surového železa) a výrobou v obloukových pecích (tedy recyklací oceli).
[^emisniintenzitaoceli-WEF]: [World Economic Forum: Net Zero Industry Tracker (2022)](https://www3.weforum.org/docs/WEF_NetZero_Industry_Tracker_2022_Edition.pdf)
[^emisni-intenzita-srovnani]: Zatímco světové ekonomické fórum [WEF: Net Zero Industry Tracker (2022)](https://www3.weforum.org/docs/WEF_NetZero_Industry_Tracker_2022_Edition.pdf) uvádí průměrnou světovou emisní intenzitu výroby oceli 1,9tCO<sub>2</sub>,  [Mezinárodní agentura pro energii (IEA)](https://www.iea.org/energy-system/industry/steel) uvádí průměrnou světovou emisní intenzitu výroby oceli 1,4 tCO<sub>2</sub> na 1t oceli. Rozdíl mezi těmito údaji o emisní intenzitě je pravděpodobně způsoben různým započítáním nepřímých emisí (scope 2), případně může souviset s odlišnými definicemi které procesy se do výroby oceli započítají.
[^zelezne-rudy]: [CS Wikipedia: železná ruda](https://cs.wikipedia.org/wiki/%C5%BDelezn%C3%A1_ruda)
[^ocelrecyklace]: [Yale Environment 360, 2021: Can the World’s Most Polluting Heavy Industries Decarbonize?](https://e360.yale.edu/features/can-the-worlds-most-polluting-heavy-industries-decarbonize)
[^wef]: [World Economic Forum, 2022: Net Zero Industry Tracker 2022 Edition](https://www3.weforum.org/docs/WEF_NetZero_Industry_Tracker_2022_Edition.pdf).
[^vysokepece]: [McKinsey&Company, 2022: Steel Transition to Net-Zero](https://www.mckinsey.com/capabilities/sustainability/our-insights/spotting-green-business-opportunities-in-a-surging-net-zero-world/transition-to-net-zero/steel)
[^emiseocel]: [Eurostat/EEA](https://docs.google.com/spreadsheets/d/1K5dbcngapuIdgrCRG0V8uV-c0ppirfYTwvvp8t54V3w/edit#gid=283480625).
[^mckinsey]: [McKinsey&Company, 2020: Decarbonization challenge for steel](https://www.mckinsey.com/industries/metals-and-mining/our-insights/decarbonization-challenge-for-steel)
[^h2greensteel]: [Mining Technology, 2023: Europe’s first commercial green steel plant to open in Sweden](https://www.mining-technology.com/news/green-steel-hydrogen/)
[^ocelteplota]: [Carbon Chain, 2022: Understand your steel emissions](https://www.carbonchain.com/blog/understand-your-steel-emissions)
[^missionpossible]: [Mission Possible Partnership, 2022: Making Net-Zero Steel Possible](https://missionpossiblepartnership.org/wp-content/uploads/2022/09/Making-Net-Zero-Steel-possible.pdf)
[^ocelccscena]: [MIT, 2021: How efficient is carbon capture and storage?](https://climate.mit.edu/ask-mit/how-efficient-carbon-capture-and-storage). Očekávaná cena zachytávání CO<sub>2</sub> se podle [IEA](https://www.iea.org/commentaries/is-carbon-capture-too-expensive) pohybuje kolem 35-95 eur (900-2250 českých korun) za tunu CO<sub>2</sub>. Cena oceli je závislá na druhu požadovaného produktu a výrobní lokaci, v Západní evropě se průměrná cena podle [Steel Benchmarker](http://steelbenchmarker.com/history.pdf) pohybuje kolem 700-800 eur (16700-19100 českých korun).
[^iravodik]: [Boston Consulting Group: Impact of IRA, IIJA, CHIPS, and Energy Act of 2020 on Clean Technologies](https://breakthroughenergy.org/wp-content/uploads/2023/04/Steel-Cleantech-Policy-Impact-Assessment.pdf). V USA stojí vyrobit ocel konvenční cestou skrz vysoké pece $360 za tunu surové oceli. Podpora pro výrobu zeleného vodíku v rámci IRA znamená, že vyrobit ocel za pomocí zeleného vodíku může stát $370 za tunu surové oceli.
[^cbam]: [Evropská komise: Mechanismus uhlíkového vyrovnání na hranicích: Otázky a odpovědi](https://ec.europa.eu/commission/presscorner/detail/cs/qanda_21_3661)

