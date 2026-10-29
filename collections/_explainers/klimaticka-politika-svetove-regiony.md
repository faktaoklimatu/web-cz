---
layout:      explainer
title:       "Srovnání klimaticko-energetické politiky EU, Číny, USA a Indie"
slug:        "klimaticka-politika-svetove-regiony"
published:   2026-10-30
authors:
  - id: "eliska-soperova"
  - ids: ["katerina-kolouchova", "ondras-pribyla"]
    minor-role: "konzultace"
  - id: "marcel-otruba"
    minor-role: "vizualizace"
  - name: "Barbora Zoja Zuchová"
    minor-role: "korektura"
extra-scripts:
- https://d3js.org/d3.v7.min.js
- /assets-local/js/chart-download.js
- /assets-local/figures/klimaticka-politika-svetove-regiony/grafy.js
- /assets-local/js/svetove-regiony-dev-sidebar.js
cover-source-author:        "Marcel Otruba (zadání pro AI)"
cover-source-text:          "Fakta o klimatu, vygenerováno pomocí AI"
cover-source-license:       "CC BY 4.0"
cover-source-license-url:   "https://creativecommons.org/licenses/by/4.0/deed.cs"
cover-source-url:           "https://faktaoklimatu.cz/explainery/klimaticka-politika-svetove-regiony"
perex: |
    Od přijetí Pařížské dohody se celosvětový přístup k dekarbonizaci zásadně proměnil. Snižování emisí už není jen environmentálním či morálním imperativem, ale je přímo spojené s otázkami energetické bezpečnosti a stává se předmětem soupeření o budoucí ekonomický růst. Environmentální cíle se tak dnes neoddělitelně prolínají s energetickou a průmyslovou politikou. Zatímco Evropská unie k této transformaci přistupuje primárně skrze klimatickou legislativu a regulace, ostatní světoví hráči vycházejí z odlišných podmínek a volí jiné nástroje. V praxi však dosahují značných pokroků a v řadě technologických i průmyslových ohledů EU předstihují.
---

Tento text zasazuje přístup EU do globálního kontextu a srovnává jej s přístupem USA, Číny a Indie. Společně **tito čtyři aktéři představují největší světové emitenty skleníkových plynů** a zodpovídají za více než polovinu globálních emisí CO<sub>2</sub>. Podrobněji srovnáváme jejich regulatorní rámce i reálný pokrok v dekarbonizaci a ukazujeme souvislosti s energetickou strukturou jejich ekonomik (import a export jednotlivých paliv), stejně jako limity plynoucí z odlišných politických systémů či socioekonomické reality.

{% include includes-local/chart-panel.html
    id="graf-podil"
    class="no-foot"
    title=" "
    source='<a href="https://edgar.jrc.ec.europa.eu/report_2025">EDGAR</a> (Společné výzkumné středisko EK, 2025)'
%}


## Hlavní charakteristiky

<div class="row region-grid">
<div class="col-12 col-md-6 mb-4"><div class="region-box region-eu" markdown="1">

### Evropská unie
{: .js-toc-ignore .region-eu}

- <i class="fa-solid fa-scale-balanced region-icon" aria-hidden="true"></i> [**Zpoplatnění emisí a regulace**](#eu-zpoplatneni)
- <i class="fa-solid fa-coins region-icon" aria-hidden="true"></i> [**Dotace**](#eu-dotace)
- <i class="fa-solid fa-landmark region-icon" aria-hidden="true"></i> [**Víceúrovňové řízení a národní kompetence**](#eu-rizeni)
- <i class="fa-solid fa-earth-europe region-icon" aria-hidden="true"></i> [**Vedoucí role v ochraně klimatu**](#eu-vedouci-role)

</div></div>
<div class="col-12 col-md-6 mb-4"><div class="region-box region-cina" markdown="1">

### Čína
{: .js-toc-ignore .region-cina}

- <i class="fa-solid fa-industry region-icon" aria-hidden="true"></i> [**Průmyslová politika a energetická bezpečnost**](#cina-prumyslova-politika)
- <i class="fa-solid fa-hand-holding-dollar region-icon" aria-hidden="true"></i> [**Dotace výrobcům a levné půjčky**](#cina-dotace)
- <i class="fa-solid fa-solar-panel region-icon" aria-hidden="true"></i> [**Domácí rozvoj obnovitelných zdrojů a elektromobility**](#cina-domaci-rozvoj)
- <i class="fa-solid fa-sitemap region-icon" aria-hidden="true"></i> [**Centrální řízení**](#cina-centralni-rizeni)
- <i class="fa-solid fa-leaf region-icon" aria-hidden="true"></i> [**Ideologické ukotvení**](#cina-ideologie)

</div></div>
<div class="col-12 col-md-6 mb-4"><div class="region-box region-usa" markdown="1">

### USA
{: .js-toc-ignore .region-usa}

- <i class="fa-solid fa-percent region-icon" aria-hidden="true"></i> [**Daňové úlevy a protekcionismus**](#usa-danove-ulevy)
- <i class="fa-solid fa-arrow-right-arrow-left region-icon" aria-hidden="true"></i> [**Politická polarizace a nestabilita**](#usa-polarizace)
- <i class="fa-solid fa-oil-well region-icon" aria-hidden="true"></i> [**Tržní pragmatismus**](#usa-pragmatismus)
- <i class="fa-solid fa-map-location-dot region-icon" aria-hidden="true"></i> [**Autonomie jednotlivých států**](#usa-autonomie)

</div></div>
<div class="col-12 col-md-6 mb-4"><div class="region-box region-indie" markdown="1">

### Indie
{: .js-toc-ignore .region-indie}

- <i class="fa-solid fa-arrow-trend-up region-icon" aria-hidden="true"></i> [**Celkový růst energetiky**](#indie-rust)
- <i class="fa-solid fa-sun region-icon" aria-hidden="true"></i> [**Solární boom a státní garance**](#indie-solarni-boom)
- <i class="fa-solid fa-hand-holding-heart region-icon" aria-hidden="true"></i> [**Klimatické finance a sociální spravedlnost**](#indie-finance)

</div></div>
</div>

### Evropská unie
{: .js-toc-ignore .region-eu}

**Zpoplatnění emisí a regulace:** Hlavním motorem evropské transformace je tržní mechanismus – systém obchodování s emisními povolenkami (EU ETS). Ten vytváří přímý tlak na snižování emisí a je doplněn komplexním systémem regulací, emisních cílů a technologických standardů zaměřených na poptávku firem a domácností.
{: #eu-zpoplatneni}

**Dotace:** Druhým pilířem je rozsáhlá finanční podpora z fondů a dotačních programů financovaných z výnosů aukcí emisních povolenek v systému EU ETS. Podporují jak koncové uživatele a plošné zavádění technologií (zateplování, instalace solárních panelů či nákup elektromobilů), tak velké investice do nových technologií (Modernizační a Inovační fond).
{: #eu-dotace}

**Víceúrovňové řízení a národní kompetence:** Unijní legislativa vzniká mnohostranným vyjednáváním, které vyžaduje hledání široké shody, ale zároveň prodlužuje schvalování i zavádění do praxe. Volba národního energetického mixu a řada rozhodnutí v průmyslové politice přitom zůstávají v pravomoci jednotlivých členských států, které musí respektovat společná unijní pravidla.
{: #eu-rizeni}

**Vedoucí role v ochraně klimatu:** Evropská unie je průkopníkem klimatické politiky a hlavním tahounem v mezinárodních jednáních. Stála u zrodu klíčových smluv a dlouhodobě prosazuje ambiciózní cíle. Ostatní země motivuje ke snižování emisí buď příkladem, nebo přímým ekonomickým tlakem, jak ukazuje mechanismus uhlíkového vyrovnání na hranicích (CBAM).
{: #eu-vedouci-role}

### Čína
{: .js-toc-ignore .region-cina}

**Průmyslová politika a energetická bezpečnost:** Hlavním motorem transformace je silná státní průmyslová politika. Rozvoj čistých technologií (solární a větrné elektrárny, baterie, elektromobilita) slouží primárně ke zbavení se závislosti na dovozu ropy a zemního plynu a k dosažení dominance v globálních dodavatelských řetězcích.
{: #cina-prumyslova-politika}

**Dotace výrobcům a levné půjčky:** Čína masivně podporuje budování průmyslových výrobních kapacit a cíleně tak vytváří produkční přebytky a vysoce konkurenční prostředí na domácím trhu. Díky tomu čínské firmy snižují výrobní ceny technologií a dominují světovému exportu.
{: #cina-dotace}

**Domácí rozvoj obnovitelných zdrojů a elektromobility:** Čína není pouhým exportérem. Na svém území v posledních letech instaluje více solárních a větrných elektráren než zbytek světa dohromady a je světovým lídrem v elektromobilitě. Zároveň však pro zajištění energetické bezpečnosti stále buduje i nové uhelné elektrárny.
{: #cina-domaci-rozvoj}

**Centrální řízení:** Politické rozhodování probíhá striktně shora dolů, což umožňuje mimořádně rychlé schvalování a výstavbu infrastruktury. Odvrácenou stranou tohoto přístupu je riziko neefektivních investic a zadlužování regionů. Čínský způsob řízení vede k systémovým chybám a má závažné sociální a lidskoprávní dopady.
{: #cina-centralni-rizeni}

**Ideologické ukotvení:** Ochrana přírody a rozvoj čistých technologií jsou základními kameny tzv. ekologické civilizace, oficiální ideologie, která ovlivňuje tvorbu politik v Číně. Podle ní se Čína posouvá do vyššího vývojového stádia, kde člověk a příroda žijí v harmonii.
{: #cina-ideologie}

### USA
{: .js-toc-ignore .region-usa}

**Daňové úlevy a protekcionismus:** Federální klimaticko-energetická politika klade důraz spíše na masivní daňové úlevy než na regulaci („cukr bez biče“). Podmínky těchto úlev zároveň zvýhodňují výrobu v USA.
{: #usa-danove-ulevy}

**Politická polarizace a nestabilita:** Klimatická agenda je v USA předmětem tvrdého kulturně-politického boje, což vede k nestabilitě federální politiky v dlouhodobém horizontu. Zatímco Bidenova administrativa prosadila rekordní podporu čistým technologiím, Donald Trump tuto agendu odmítá, podporuje fosilní průmysl a stáhl USA z Pařížské dohody.
{: #usa-polarizace}

**Tržní pragmatismus:** Spojené státy těží nejvíce ropy a zemního plynu na světě a zároveň vyvážejí nejvíce zkapalněného zemního plynu (LNG). Systém nepenalizuje fosilní průmysl, zároveň se v zemi kvůli ekonomické výhodnosti budují i obnovitelné zdroje.
{: #usa-pragmatismus}

**Autonomie jednotlivých států:** Různé státy se v přístupu k energetické transformaci velmi liší – například Kalifornie či New York postupují podobně jako EU, zatímco republikánské státy jako Texas nebo Západní Virginie se jakožto velcí producenti ropy a uhlí otevřeně staví proti jakýmkoliv klimatickým opatřením.
{: #usa-autonomie}

### Indie
{: .js-toc-ignore .region-indie}

**Celkový růst energetiky:** Poptávka po energii strmě roste, a proto Indie neprochází klasickou tranzicí (nahrazováním fosilních zdrojů), ale masivně rozvíjí čisté zdroje především proto, aby uspokojila poptávku a zajistila prosperitu obyvatel.
{: #indie-rust}

**Solární boom a státní garance:** Země zažívá obrovský rozvoj solární energetiky, který pohání efektivní systém transparentních aukcí a státem zaručených dlouhodobých kontraktů. Indie využívá širokou škálu opatření: již zmíněné finanční nástroje doplňují regulace, fiskální nástroje, veřejná podpora a připravovaný systém obchodování s emisními povolenkami.
{: #indie-solarni-boom}

**Klimatické finance a sociální spravedlnost:** Indie je rozvojová ekonomika a významný příjemce mezinárodní rozvojové pomoci. Prioritou je zajištění cenově dostupné energie pro stamiliony lidí, kteří se teprve vymaňují z chudoby. Zároveň je Indie aktivní v mezinárodních jednáních, kde usiluje o reformy mezinárodních finančních institucí s cílem zprostředkovat rozvojovým zemím potřebné financování energetické transformace.
{: #indie-finance}


## Klimatické cíle, hlavní nástroje a řízení

{% include includes-local/chart-panel.html
    id="graf-cile"
    class="no-foot"
    title=" "
    source='národní příspěvky (NDC) a strategie jednotlivých zemí, zpracování Fakta o klimatu'
%}

### Evropská unie
{: .js-toc-ignore .region-eu}
**Politiky a strategické dokumenty:** EU je průkopníkem klimatické politiky. V návaznosti na závazky přijaté v rámci Pařížské dohody vytvořila vlastní komplexní systém cílů, regulací a technologických standardů. Klíčovým mezníkem je přijetí zastřešující strategie **Zelená dohoda v roce 2019** a **Evropského klimatického zákona** v roce 2021. Dříve samostatná agenda klimatické politiky se v posledních letech postupně propojuje s řešením **energetické bezpečnosti** a ochranou hospodářské **konkurenceschopnosti**, a to zejména po přijetí Dohody pro čistý průmysl (*Clean Industrial Deal*, CID).

**Nástroje:** Nejúčinnějším nástrojem je tržní mechanismus **obchodování s emisními povolenkami** (EU ETS). V sektorech ETS 1 (průmysl a energetika) došlo od roku 2005 ke snížení emisí o polovinu, proto se v rámci ETS 2 od roku 2028 rozšiřuje i na budovy a silniční dopravu. Výnosy z prodeje povolenek financují čisté technologie (Modernizační a Inovační fond) i zmírnění sociálních dopadů (Sociální klimatický fond). Tržní mechanismus doplňují sektorové cíle (podíl OZE, energetická účinnost), technické standardy (emisní limity vozidel) a zelená taxonomie. Ta definuje, které ekonomické aktivity jsou udržitelné, a přesměrovává tak soukromé investice na jejich podporu.

**Řízení:** Klimatická politika EU vzniká víceúrovňovým procesem, na kterém se podílejí unijní instituce, členské státy i veřejnost. Legislativní proces stojí na třech pilířích: Evropská komise pravidla navrhuje, zatímco Rada EU (členské státy) a Evropský parlament (reprezentující občany) je společně schvalují. Výsledná legislativa má dvě hlavní formy. Směrnice určuje závazný cíl, ale nechává na státech, aby rozhodly, jakým způsobem cíle dosáhnou. Pro sjednocení pravidel pak slouží nařízení, která jsou plošně účinná ihned po schválení.

{% include figure.html
    name="evropsky-parlament-plenum.jpg"
    caption="Plenární zasedání Evropského parlamentu ve Štrasburku během rozpravy o stavu Unie, září 2023"
    alt="Fotografie velkého půlkruhového jednacího sálu Evropského parlamentu shora, poslanci sedí v řadách modrých lavic"
    source-text="Evropský parlament, Wikimedia Commons"
    source-url="https://commons.wikimedia.org/wiki/File:State_of_the_EU-_Ukraine,_Green_Deal,_Economy,_China,_Artificial_Intelligence_-_53188705655.jpg"
%}

### USA
{: .js-toc-ignore .region-usa}
**Strategie a politiky:** Za Bidenovy administrativy se klimatická politika opírala jak o mezinárodní rámec Pařížské dohody, tak o národní strategie. V roce 2021 vydala Bidenova administrativa dlouhodobou klimatickou strategii s cílem dosáhnout klimatické neutrality do roku 2050. V prosinci 2024 pak, ještě před návratem Trumpa do úřadu, USA zveřejnily aktualizovaný mezinárodní emisní závazek pro rok 2035. S návratem Trumpa **USA odstoupily od Pařížské dohody** a upustily od všech klimatických strategií.

**Nástroje:** V USA je energetická transformace poháněna trhem. Hlavními nástroji státu jsou **daňové úlevy**, na nichž stál Bidenův ambiciózní **zákon o snížení inflace** (*Inflation Reduction Act*, IRA). Ten je zavedl pro čisté technologie, jako jsou elektromobily a obnovitelné zdroje. Následná Trumpova administrativa tuto podporu sice zrušila, energetická transformace však pokračuje dál, a to díky přetrvávající ekonomické atraktivitě čistých technologií.

**Řízení:** Směřování americké klimatické politiky do velké míry určuje prezident, a to prostřednictvím exekutivních příkazů a kontroly nad Agenturou pro ochranu životního prostředí EPA, která stanovuje emisní limity a regulace. Jednotlivé státy však mají značnou autonomii, proto se jejich klimatická opatření a cíle výrazně liší a často vedou ke sporům s federální vládou.

### Čína
{: .js-toc-ignore .region-cina}
**Politiky a strategie:** Čína si stanovuje své dlouhodobé cíle prostřednictvím mezinárodních závazků v rámci Pařížské dohody. Takto přijala svůj tzv. **dvojí emisní cíl** (*dual carbon target*) zvrácení nárůstu emisí uhlíku do roku 2030 a dosažení uhlíkové neutrality, stejně jako svůj první absolutní emisní cíl pro rok 2035. Detailně však Čína plánuje klimatickou politiku v rámci svých **pětiletých plánů**, v nichž klimatická politika dostala s postupem času vlastní kapitolu.

**Nástroje:** Rozvoj čistých technologií v Číně stojí především na systému **centrálně stanovených cílů** a **masivní dotační politice**. Stát cíleně financuje výzkum a optimalizaci výrobních procesů, což v kombinaci s kontrolou dodavatelských řetězců a tvrdou konkurencí na domácím trhu vedlo k radikálnímu snížení výrobních nákladů. Díky této veřejné podpoře a obrovským úsporám z rozsahu Čína srazila ceny zelených technologií na minimum, čímž zásadně přispěla k jejich zlevnění po celém světě.

**Řízení:** Stejně jako celý stát i čínská klimatická politika je centrálně řízena a určována shora vládou. Hlavní rozhodující moc má Ústřední výbor Komunistické strany Číny (CCCPC) v čele s čínským vůdcem Si Ťin-pchingem, který určuje hlavní směr a vydává obecné strategie. Byl to právě Si Ťin-pching, kdo po svém nástupu v roce 2013 začal prosazovat energetickou transformaci a ohlásil nástup ekologické civilizace (pokročilejší vývojové stádium čínské společnosti). Na základě pokynů vedení pak Čínský národní lidový kongres (NPCC), který je ekvivalentem parlamentu, přijímá konkrétní závazné cíle. Ty jsou následně rozdělovány mezi nižší správní celky.

{% include figure.html
    name="vsecinske-shromazdeni-2018.jpg"
    caption="Plenární zasedání Všečínského shromáždění lidových zástupců ve Velké síni lidu v Pekingu, kde téměř tři tisíce delegátů hlasují o změně ústavy, 11. března 2018"
    alt="Fotografie velkého sálu s rudými závěsy a státním znakem Číny nad pódiem, v řadách sedí delegáti, v popředí fotografové s teleobjektivy"
    source-text="Voice of America, Wikimedia Commons"
    source-url="https://commons.wikimedia.org/wiki/File:2018-03-11_第十三届全国人民代表大会第一次会议表决修宪案.jpg"
%}

### Indie
{: .js-toc-ignore .region-indie}
**Politiky a strategie:** Klimatická politika Indie se opírá o mezinárodní klimatický rámec pod Pařížskou dohodou, v němž země pravidelně přijímá své mezinárodní závazky. Indie si kromě cíle **klimatické neutrality v roce 2070** stanovila také dva další oficiální cíle pro emisní intenzitu a podíl elektřiny z nefosilních zdrojů. Kromě toho Indie přijala zastřešující národní politický rámec *National Action Plan on Climate Change* (NAPCC) a disponuje řadou sektorových strategií s dalšími indikativními cíli. Například v národním plánu pro elektřinu Indie hodlá vybudovat 280 GW solární kapacity do roku 2030 a v rámci národního plánu pro dopravu si Indie stanovila za cíl dosáhnout 30% podílu elektroaut do stejného roku.

**Nástroje:** Indie staví svou klimatickou politiku na kombinaci různých opatření od přímých dotací přes tržní pobídky až po technologické standardy. Zásadním nástrojem dekarbonizace se staly **elektronické reverzní aukce** (pořádané agenturou SECI), v nichž developeři v reálném čase snižují výkupní ceny elektřiny na minimum výměnou za dlouhodobé kontrakty se státním odběratelem. Tento tržní tlak u velkých zdrojů doplňují cílené dotační programy pro fotovoltaiku na obytných budovách a v zemědělství (např. PM-KUSUM a PM Surya Ghar).

**Řízení:** V Indii je v otázce klimatu vedoucím orgánem Ministry of New and Renewable Energy, který je podporován expertními institucemi, jako jsou NITI Aayog – vládní think tank zabývající se veřejnou politikou, a National Institute of Solar Energy (NISE) – nezávislá výzkumná organizace zaměřená na solární energetiku. V Indii funguje „kooperativní federalismus“: klimatické politiky a strategie jsou přijímány centrální vládou a státy a svazová území se na implementaci výrazně podílejí tím, že si mohou přizpůsobit strategie svým specifickým podmínkám.

## Energetická soběstačnost (import a export paliv)

**Míra závislosti na dovozu paliv zásadně určuje, jak rychle a ochotně se jednotlivé ekonomiky odklánějí od fosilních zdrojů.** Zejména u ropy a zemního plynu, které se obchodují na propojeném globálním trhu, existuje vysoké **riziko výpadků dodávek a výrazného kolísání cen**. Pro země, které jsou na dovozu těchto paliv závislé, pak v době geopolitické nestability obnovitelné a nízkoemisní zdroje zaručují podstatně vyšší energetickou soběstačnost a stabilitu. Důležitým faktorem je pak míra elektrifikace ekonomiky. Čím větší část spotřeby energie stát pokryje z domácích bezemisních zdrojů, tím méně fosilních paliv musí dovážet. (Více o elektrifikaci níže.)

{% include figure.html
    name="lng-tanky.jpg"
    caption="Nádrže na zkapalněný zemní plyn (LNG) na palubě lodi v přístavu"
    alt="Fotografie dvou velkých nádrží s nápisem LNG na palubě modré lodi s jeřáby, v pozadí modrá obloha"
    source-text="Markus Kammermann, Unsplash"
    source-url="https://unsplash.com/photos/two-large-lng-tanks-on-a-barge-with-cranes-Wx6aqlqbdys"
%}

### Evropská unie
{: .js-toc-ignore .region-eu}
Dovoz pokrývá [~60 %](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/wdn-20260318-1) spotřeby primární energie v EU. Jde tak o **jeden z globálně nejméně soběstačných regionů**. Dříve EU dovážela podstatnou část ropy a zemního plynu z Ruska, po ruské invazi na Ukrajinu v roce 2022 však své dodavatelské řetězce radikálně změnila.

<div class="region-detail region-stats" markdown="1">

**Ropa:** Dovoz pokrývá [96 %](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Energy_statistics_-_an_overview#Energy_dependency) spotřeby. Ruskou ropu nahradily dodávky z USA, Norska a Kazachstánu.

**Zemní plyn:** Z dovozu pochází [85 %](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Energy_statistics_-_an_overview#Energy_dependency) spotřeby plynu v EU. Ruský potrubní plyn byl z velké části nahrazen dodávkami z Norska (to se stalo největším dodavatelem s podílem kolem [30 %](https://energy.ec.europa.eu/news/quarterly-reports-highlight-solar-record-and-progress-away-russian-gas-2025-07-04_en) celkového dovozu) a masivním dovozem zkapalněného plynu z USA a oblasti Perského zálivu.

**Uhlí:** Dovozní závislost u černého uhlí je [~60 %](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Coal_production_and_consumption_statistics#:~:text=In%202024%2C%20solar%20overtook%20coal%20as%20a,of%20hard%20coal%20and%20brown%20coal%2C%202025.) (hnědé se těží lokálně). Hlavní dodavatelské země: USA, Kolumbie, Austrálie, Kazachstán či Jihoafrická republika.

</div>

### USA
{: .js-toc-ignore .region-usa}
USA se díky **rozvoji těžby ropy a plynu z břidlic** dostaly do **pozice vývozce energie**. To jim poskytuje geopolitickou nezávislost a průmyslovou výhodu v podobě levných domácích surovin; zároveň se to promítá i do jejich přístupu ke globálnímu odchodu od fosilních paliv.

<div class="region-detail region-stats" markdown="1">

**Ropa:** USA jsou v souhrnu čistým vývozcem ropy a ropných produktů. Velké objemy lehké ropy těží a vyvážejí (do Evropy i Asie), ale nadále dovážejí těžkou ropu (hlavně z Kanady a Mexika), která je technologicky vhodnější pro některé americké rafinérie.

**Zemní plyn:** Země je zcela soběstačná. USA jsou největším producentem plynu a zároveň největším exportérem LNG na světě (zásobují zejména evropské a asijské trhy).

**Uhlí:** Protože americké elektrárny přecházejí na plyn a domácí spotřeba uhlí klesá. Necelou čtvrtinu svého uhlí USA vyváží (do Indie a dalších asijských zemí a nově i do Evropy).

</div>

### Čína
{: .js-toc-ignore .region-cina}
Čína si i přes masivní nárůst spotřeby udržuje **vysokou energetickou soběstačnost** – domácí produkce pokrývá asi [85 %](https://english.www.gov.cn/news/202412/14/content_WS675ce85ac6d0868f4e8edf3d.html) spotřeby primární energie, dovoz tedy jen ~15 %. **V absolutních číslech je však gigantickým dovozcem.** Svou strategickou zranitelnost kompenzuje světově bezprecedentním budováním obnovitelných zdrojů a rozsáhlou domácí těžbou uhlí.

<div class="region-detail region-stats" markdown="1">

**Ropa:** Dovoz pokrývá přes [70 %](https://chinapower.csis.org/china-energy-security/) spotřeby a Čína je celkově největším světovým importérem. Hlavními dodavateli jsou Rusko a země Blízkého východu.

**Zemní plyn:** Dovoz pokrývá přes [40 %](https://chinapower.csis.org/china-energy-security/) spotřeby. Jde o kombinaci potrubního plynu (z Turkmenistánu a Ruska) a námořního dovozu LNG (z Austrálie, Kataru a USA).

**Uhlí:** Čína je suverénně největším světovým těžařem, ale kvůli enormní domácí spotřebě a logistice v pobřežních oblastech zůstává zároveň i celkově největším světovým dovozcem černého uhlí (nakupuje zejména z Mongolska, Ruska a Austrálie).

</div>

### Indie
{: .js-toc-ignore .region-indie}
Indie dováží téměř [40 %](https://www.iea.org/countries/india/energy-mix) své primární energie. Indie má **mimořádně nízkou energetickou soběstačnost**. Zemi s více než miliardovou populací a prudce rostoucí průmyslovou výrobou chybí domácí zdroje ropy a plynu, což její ekonomiku činí **silně závislou na cenách na světových trzích**.

<div class="region-detail region-stats" markdown="1">

**Ropa:** Indie dováží téměř [90 %](https://www.energyinst.org/statistical-review) ropy; jejím klíčovým dodavatelem se po roce 2022 a uzavření Hormuzského průlivu stalo Rusko, následované Irákem, Saúdskou Arábií a USA.

**Zemní plyn:** Dovoz pokrývá zhruba [50 %](https://www.energyinst.org/statistical-review) spotřeby plynu, téměř výhradně ve formě LNG přes námořní terminály. Dominantními dodavateli jsou Katar a Spojené arabské emiráty, podíl ale navyšují i USA.

**Uhlí:** Indie volí podobnou strategii jako Čína, je druhým největším těžařem na světě a domácí uhlí tvoří páteř její energetiky. Kvůli nižší kvalitě domácí suroviny a obrovské poptávce však musí přes [20 %](https://www.iea.org/reports/india-energy-outlook-2021) objemu dovážet (koksovatelné uhlí z Austrálie, energetické z Indonésie a Ruska).

</div>

## Emise jednotlivých aktérů a jejich historický vývoj

<div class="sticky-scope" markdown="1">

{% include includes-local/chart-panel.html
    id="graf-emise"
    class="no-title"
    title="Emise skleníkových plynů čtyř největších emitentů, 1990–2024"
    source='<a href="https://edgar.jrc.ec.europa.eu/report_2025">EDGAR</a> (Společné výzkumné středisko EK, 2025)'
%}

### Evropská unie
{: .js-toc-ignore .region-eu}
Zatímco globálně emise rostou, EU je **od roku 1990 snížila o [40 %](https://www.eea.europa.eu/en/analysis/publications/key-trends-and-drivers-in-ghg-emissions-in-the-eu)** (k roku 2024). Největší zásluhu na tom mají energetika a průmysl, kde k poklesu přispěly: útlum využívání uhlí, rozvoj obnovitelných zdrojů a vyšší efektivita výroby. Přesto tyto sektory patří mezi největší zdroje emisí, a to kvůli přetrvávající závislosti EU na zemním plynu. Nejslabším článkem zůstává doprava, kde kvůli pokračujícímu využívání fosilních paliv emise klesly jen minimálně a v mnoha členských státech stále rostou. I přes dosavadní úspěchy však není jisté, zda EU svých ambiciózních klimatických cílů dosáhne. Proto bude naprosto klíčové důsledné zavádění dalších klimatických opatření a politik samotnými členskými státy.

<div class="region-stats" markdown="1">

<i class="fa-solid fa-cloud-arrow-up stat-icon" aria-hidden="true"></i> Roční emise: **3,16 miliardy t CO<sub>2</sub>eq**

<i class="fa-solid fa-user stat-icon" aria-hidden="true"></i> Emise na hlavu: **7,14 t CO<sub>2</sub>eq**

<i class="fa-solid fa-layer-group stat-icon" aria-hidden="true"></i> Podíl na historických emisích CO<sub>2</sub>: **16,27 %**

</div>

### USA
{: .js-toc-ignore .region-usa}
Na rozdíl od EU **snížily** USA **své emise oproti roku 1990 pouze o [3 %](https://edgar.jrc.ec.europa.eu/report_2026)**. Největší pokles zaznamenala energetika, a to hlavně díky přechodu z uhlí na levný zemní plyn po břidlicové revoluci (tzv. *Shale Boom*) v roce 2005. Energetika však zůstává nejvíce znečišťujícím sektorem, a to proto, že USA jsou největším producentem a vývozcem ropy a zemního plynu. Podobně velkým znečišťovatelem je doprava, kde za vysokými emisemi stojí extrémní závislost na osobních autech a rozlehlost amerických měst. Navzdory Trumpově klimaskeptické politice predikce ukazují, že USA jsou na cestě ke snížení emisí [o 26 % až 41 % do roku 2040 oproti hodnotám z roku 2005](https://rhg.com/research/taking-stock-2025/) a [k dekarbonizaci v roce 2058](https://www.dnv.com/energy-transition-outlook/north-america/). Klíčový je trh, který pod tlakem globální ekonomiky pohání rozvoj čistých technologií, a to navzdory všem překážkám ze strany americké vlády.

<div class="region-stats" markdown="1">

<i class="fa-solid fa-cloud-arrow-up stat-icon" aria-hidden="true"></i> Roční emise: **5,91 miliardy t CO<sub>2</sub>eq**

<i class="fa-solid fa-user stat-icon" aria-hidden="true"></i> Emise na hlavu: **17,34 t CO<sub>2</sub>eq**

<i class="fa-solid fa-layer-group stat-icon" aria-hidden="true"></i> Podíl na historických emisích CO<sub>2</sub>: **23,52 %**

</div>

### Čína
{: .js-toc-ignore .region-cina}
Jako „světová továrna“ a prudce se rozvíjející ekonomika je Čína největším globálním emitentem; její **emise však v posledních dvou letech stagnují a v roce 2025 dokonce začaly klesat,** a to díky masivnímu rozvoji obnovitelných zdrojů energie. Tento trend vytváří paradox, kdy je země zároveň největším znečišťovatelem i světovým lídrem v kapacitě OZE. Klíčovým zdrojem znečištění zůstává sektor výroby elektřiny a tepla poháněný uhlím. Naopak doprava tvoří pouhých [10 %](https://www.iea.org/countries/china/emissions) čínských emisí, mnohem méně, než je tomu u vyspělých ekonomik. Svůj podíl má na tom velký rozvoj elektromobility.

<div class="region-stats" markdown="1">

<i class="fa-solid fa-cloud-arrow-up stat-icon" aria-hidden="true"></i> Roční emise: **15,54 miliardy t CO<sub>2</sub>eq**

<i class="fa-solid fa-user stat-icon" aria-hidden="true"></i> Emise na hlavu: **10,81 t CO<sub>2</sub>eq**

<i class="fa-solid fa-layer-group stat-icon" aria-hidden="true"></i> Podíl na historických emisích CO<sub>2</sub>: **15,42 %**

</div>

### Indie
{: .js-toc-ignore .region-indie}
Indie je příkladem rychle se rozvíjející ekonomiky, jejíž emise prudce rostou. Přesto **nárůst emisí v poslední době výrazně zpomaluje**, a to zejména díky masivní výstavbě solárních parků, která zároveň zásadně přispěla k tomu, aby měli všichni obyvatelé Indie přístup k elektřině. Na rozdíl od ostatních zemí je v Indii jedním z největších znečišťovatelů sektor zemědělství, který je významným zdrojem emisí metanu a je zodpovědný za pětinu všech emisí. Nejvíce znečišťujícím sektorem však zůstává výroba elektřiny a tepla, kde je Indie, podobně jako Čína, závislá na uhlí.

<div class="region-stats" markdown="1">

<i class="fa-solid fa-cloud-arrow-up stat-icon" aria-hidden="true"></i> Roční emise: **4,37 miliardy t CO<sub>2</sub>eq**

<i class="fa-solid fa-user stat-icon" aria-hidden="true"></i> Emise na hlavu: **3,04 t CO<sub>2</sub>eq**

<i class="fa-solid fa-layer-group stat-icon" aria-hidden="true"></i> Podíl na historických emisích CO<sub>2</sub>: **3,57 %**

</div>

</div>

## Vývoj ve vybraných oblastech

### Mix výroby elektřiny

<div class="sticky-scope" markdown="1">

{% include includes-local/chart-panel.html
    id="graf-mix"
    class="no-title"
    title="Mix výroby elektřiny, 2000–2025"
    source='<a href="https://ember-energy.org/data/yearly-electricity-data/">Ember</a>, populace: <a href="https://population.un.org/wpp/">OSN (World Population Prospects 2024)</a>'
%}

#### Evropská unie
{: .js-toc-ignore .region-eu}
V posledních letech začínají v unijním mixu výroby elektřiny hrát **zásadní roli nízkoemisní zdroje** a podíl zemního plynu na výrobě elektřiny se snižuje. Aktuálně **[71 %](https://ember-energy.org/latest-insights/european-electricity-review-2026/) elektřiny pochází z čistých zdrojů** (vítr, slunce, biomasa, vodní energie nebo jádro) a z toho [30 p. b.](https://ember-energy.org/latest-insights/european-electricity-review-2026/) obstarávají solární a větrná energie. V EU největší rozvoj zažívá solární energetika: v posledních pěti letech produkce elektřiny ze slunce rostla meziročně o [21 %](https://ember-energy.org/latest-insights/european-electricity-review-2026/). Zároveň rok 2025 byl rokem, kdy ze slunce a větru pocházelo víc elektřiny než z fosilních zdrojů ve 14 z 27 členských zemí EU.

#### USA
{: .js-toc-ignore .region-usa}
Přestože se OZE v USA začaly rozvíjet později a o něco pomaleji, i USA zažívají v posledních letech prudký **rozvoj solární a větrné energie**. Aktuálně **[43 %](https://ember-energy.org/countries-and-regions/united-states-of-america/) elektřiny pochází z čistých zdrojů** a z toho [19 p. b.](https://ember-energy.org/countries-and-regions/united-states-of-america/) ze slunce a větru. Podíl elektřiny z obnovitelných zdrojů je v některých amerických státech ještě vyšší. Například v Kalifornii dosahuje přibližně [60 %](https://www.chooseenergy.com/data-center/electricity-sources-by-state/). V Kansasu [50 %](https://www.chooseenergy.com/data-center/electricity-sources-by-state/) elektřiny pochází pouze z větru.

#### Čína
{: .js-toc-ignore .region-cina}
Čínský **mix výroby elektřiny byl historicky postaven na uhelných zdrojích**. To se ale v posledních letech mění. Čína je **regionem s největším nárůstem solární a větrné kapacity** ve velmi krátké době. Elektřina z obnovitelných zdrojů tak z velké části uspokojuje rostoucí poptávku po elektřině a rok 2025 byl prvním rokem, kdy solární a větrná kapacita byla vyšší než ta uhelná. Aktuálně **[42 %](https://ember-energy.org/countries-and-regions/china/) elektřiny pochází z čistých zdrojů**, z toho polovina z větru a slunce.

#### Indie
{: .js-toc-ignore .region-indie}
Podobně jako Čína se i Indie potýká s prudkým nárůstem poptávky po elektřině a její **mix je založený především na uhlí**. V posledních pěti letech však Indie masivně staví solární zdroje a bateriová úložiště. Podíl elektřiny z OZE tak rychle roste, zatímco podíl elektřiny z uhlí se snížil [ze 75 % v roce 2023 na 71 % v roce 2025](https://ember-energy.org/latest-insights/global-electricity-review-2026/). Aktuálně tak **[27 %](https://ember-energy.org/countries-and-regions/india/) elektřiny pochází z čistých zdrojů** a z toho [14 p. b.](https://ember-energy.org/countries-and-regions/india/) ze slunce a větru.

</div>

### Rozvoj obnovitelných zdrojů

{% include includes-local/chart-panel.html
    id="graf-oze"
    class="no-title"
    title="Rozvoj obnovitelných zdrojů, 2000–2025"
    source='<a href="https://ember-energy.org/data/yearly-electricity-data/">Ember</a>, populace: <a href="https://population.un.org/wpp/">OSN (World Population Prospects 2024)</a>'
%}

Právě rozšiřování kapacity obnovitelných zdrojů je oblast, kde rozvojové země jako Čína a Indie překvapí. Zatímco v EU nebo USA výstavba průběžně roste, v Indii a Číně dochází ke skokovým meziročním nárůstům. Například Čína během prvních šesti měsíců v roce 2025 postavila dvakrát tolik OZE kapacity jako zbytek světa dohromady a Indie díky své rychlé výstavbě OZE nyní disponuje 3. největší kapacitou OZE na světě poté, co v roce 2025 předstihla Německo.

{% include figure.html
    name="talatan-solarni-park.jpg"
    caption="Solární park Talatan v čínské provincii Čching-chaj, jeden z největších na světě. Vpravo nádrž Longyangxia na Žluté řece."
    alt="Satelitní snímek pouště, ve které tmavé obdélníky solárních panelů pokrývají plochu mnoha kilometrů; vpravo zelená vodní nádrž"
    source-text="Copernicus Sentinel-2, Wikimedia Commons"
    source-url="https://commons.wikimedia.org/wiki/File:2026-03-02-00_00_2026-03-02-23_59_Sentinel-2_L2A_True_color_(1).jpg"
%}

### Elektromobilita


V oblasti elektromobility je **Čína jasným světovým lídrem**. Na domácím trhu tvoří elektromobily již přes polovinu prodejů nových aut a čínští výrobci ovládají i globální scénu. V roce 2025 [60 %](https://www.iea.org/reports/global-ev-outlook-2026/executive-summary) celosvětově prodaných elektromobilů pocházelo z Číny, zatímco z EU a USA pocházelo shodně pouze [15 %](https://www.iea.org/reports/global-ev-outlook-2026/executive-summary).

{% include includes-local/chart-panel.html
    id="graf-elektromobily"
    title="Podíl elektromobilů na prodejích nových aut, 2010–2025"
    source='<a href="https://www.iea.org/reports/global-ev-outlook-2026">IEA Global EV Outlook 2026</a> přes <a href="https://ourworldindata.org/grapher/electric-car-sales-share">Our World in Data</a>'
%}

{% capture box-elektrifikace %}
Elektrifikace je vedle výstavby OZE druhým pilířem dekarbonizace. K jejímu měření slouží např. **podíl elektřiny na konečné spotřebě energie**. Tento indikátor ukazuje, do jaké míry spotřebitelé přecházejí od přímého spalování paliv k využívání elektřiny. Zatímco **v Číně dosahuje hodnoty [32 %](https://www.iea.org/reports/electrification), v EU a USA stagnuje od desátých let na [24 %](https://www.iea.org/reports/electrification) a v Indii činí [21 %](https://www.iea.org/reports/electrification)**.

Čína vede zejména díky rychlé instalaci tepelných čerpadel a rozvoji elektromobility. Role uhlí v sektoru budov a průmyslu tak klesá a elektřina se v těchto odvětvích stala hlavním zdrojem energie, rychle posiluje i v dopravě. Důležité je také posilování přenosových soustav a velká výstavba bateriových úložišť, které umožňují rychlou integraci OZE do elektrické sítě.

Oproti tomu míra elektrifikace v USA a EU už od roku 2010 stagnuje na hodnotách kolem 20 %, a to zejména kvůli nedostatečné kapacitě elektrické sítě a chybějícím bateriovým uložištím.

Elektrifikace v Indii je sice pomalejší, ale to se v posledních letech mění. Pohání ji rychlá výstavba OZE, zejména velkých solárních parků, doplněná rozvojem rezidenční a zemědělské fotovoltaiky a instalací elektrických čerpadel. Odbyt elektromobilů neroste tak rychle, s podporou vlády však dochází k rychlé elektrifikaci dvou- a tříkolových vozidel, která aktuálně tvoří přes [88 %](https://www.imarcgroup.com/india-electric-two-wheeler-market#:~:text=Table_content%3A%20%7C%20Report%20Features%20%7C%20Details%20%7C,Okinawa%20Autotech%2C%20Revolt%20Intellicorp%20Private%20Limited%2C%20etc.) všech prodaných elektrovozidel.

{% include includes-local/chart-panel.html
    id="graf-elektrifikace"
    title="Podíl elektřiny na konečné spotřebě energie, 1990–2024"
    source='<a href="https://www.iea.org/data-and-statistics/data-product/world-energy-balances-highlights">IEA World Energy Balances Highlights 2026</a> (EU: 23 členských států bez Bulharska, Chorvatska, Kypru a Malty)'
%}
{% endcapture %}

{% include expandable.html id-prefix="collapse-regiony" counter=1 title="### Jaká je v jednotlivých regionech míra elektrifikace?"
    content=box-elektrifikace
%}

{% capture box-investice %}
Ukazatel investic do energetické transformace vyjadřuje objem veřejných a soukromých financí vynaložených na zavádění čistých technologií a výstavbu infrastruktury. Pro objektivní srovnání jednotlivých států je vhodné sledovat jejich podíl na HDP, který eliminuje vliv velikosti ekonomiky (a také rozdílných cenových hladin).

Samotná výše investic však přímo neodráží skutečné tempo dekarbonizace, protože je nutné zohlednit také další faktory, jako jsou růst celkové poptávky po elektřině, míra zapojení veřejného sektoru nebo poměr výdajů směřujících do čistých versus fosilních zdrojů. Přesto dobře ukazuje, jak se jednotlivé státy angažují v energetické transformaci a jak dokážou mobilizovat investice. Každý region k tomu volí jinou strategii: EU sází na robustní politický rámec, USA na pobídky pro soukromý kapitál a spotřebitele a Čína na masivní budování výrobních kapacit. Čína je absolutním lídrem, co se týče investic do energetické transformace. V roce 2025 tyto investice dosáhly částky 800 miliard dolarů. Čína se tak podílí [34 %](https://about.bnef.com/insights/finance/energy-transition-investment-trends/#download-report-summary) na celosvětových investicích a investuje více než dalších šest zemí dohromady.

{% include includes-local/chart-panel.html
    id="graf-investice"
    title="Investice do energetické transformace v roce 2025"
    source='<a href="https://about.bnef.com/energy-transition-investment/">BloombergNEF</a>, HDP: <a href="https://www.imf.org/external/datamapper/NGDPD@WEO">MMF</a>'
%}
{% endcapture %}

{% include expandable.html id-prefix="collapse-regiony" counter=2 title="### Jak jednotlivé regiony investují do energetické transformace?"
    content=box-investice
%}

## Role v mezinárodních klimatických jednáních

{% include figure.html
    name="cop30-zaverecne-plenum.jpg"
    caption="Vyjednavači se radí u stolu předsednictví během přestávky v závěrečném plenárním zasedání COP30 v Belému."
    alt="Fotografie skupiny vyjednavačů, kteří se skloněni radí kolem sedícího muže u stolu s cedulkou COP President"
    source-text="UN Climate Change, Flickr"
    source-url="https://www.flickr.com/photos/unfccc/54940354665/"
%}

### Evropská unie
{: .js-toc-ignore .region-eu}
EU je **dlouhodobým lídrem v mezinárodní klimatické politice**. Ambiciózní cíle prosazovala již od podpisu Rámcové úmluvy OSN o změně klimatu (UNFCCC) v roce 1992 i při vyjednání Pařížské dohody v roce 2015. Její vystupování však bývá komplikované a nejednotné. Jelikož je životní prostředí sdílenou kompetencí, musí EU před jednáními složitě hledat shodu mezi všemi členskými státy. Na mezinárodní úrovni ji pak reprezentují Evropská komise a aktuální předsednická země Rady EU. Jednání se účastní také předseda Evropské rady a své delegace vysílají i samotné členské státy, aby mohly hájit své individuální zájmy.

### USA
{: .js-toc-ignore .region-usa}
USA hrají v klimatických jednáních **klíčovou roli díky svému ekonomickému vlivu** a vysokým emisím. Do jednání jsou zapojeny od přijetí UNFCCC v roce 1992, prosazují však spíše flexibilní a tržní mechanismy než závazné emisní cíle. Z toho důvodu neratifikovaly Kjótský protokol. V roce 2014 USA oznámily s Čínou společné klimatické kroky a později se připojily k Pařížské dohodě, která umožňuje státům stanovovat si vlastní dobrovolné cíle. Přesto USA za vlády Donalda Trumpa od Pařížské dohody odstoupily a oznámily také odstoupení od Rámcové úmluvy OSN o změně klimatu (UNFCCC).

### Čína
{: .js-toc-ignore .region-cina}
Čína je smluvní stranou UNFCCC a připojila se ke Kjótskému protokolu i Pařížské dohodě. **Prosazuje princip společné, ale rozdílné odpovědnosti** a nadále **trvá na statusu rozvojové země**, který jí dává větší flexibilitu při snižování emisí. Přestože sama finanční pomoc nepožaduje, poskytuje ji jiným rozvojovým státům skrze vlastní iniciativy (jako *South–South Cooperation* nebo *Belt and Road Initiative*). Do mezinárodních jednání se zapojuje stále aktivněji a akcentuje obchodní spolupráci, což jí pomáhá posilovat globální vliv a podporovat domácí sektor čistých technologií. Dělá to však spíše z ekonomických a mocenských důvodů, a ne pro záchranu klimatu. Proto mnozí pozorovatelé nevěří, že by se Čína ujala role lídra v mezinárodních klimatických jednáních.

### Indie
{: .js-toc-ignore .region-indie}
Jakožto velký **zastánce multilateralismu** je Indie aktivním členem mezinárodních jednání a podporuje mezinárodní spolupráci. Dlouhodobě prosazuje **princip společné, ale rozdílné odpovědnosti** a klimatické spravedlnosti. Tyto zásady nevyužívá ke zbavení se odpovědnosti, ale k získání potřebné flexibility pro svůj rozvoj. Dlouhodobě požaduje předvídatelné a dostatečné klimatické finance ze strany vyspělých států, které hodnotí jako nezbytné pro dekarbonizaci rozvojového světa. Za tímto účelem se kromě mezinárodních klimatických jednání zapojuje do řady iniciativ, které také vede. Jejich cílem je reformovat mezinárodní finanční instituce a zpřístupnit finance pro energetickou transformaci a ochranu klimatu rozvojovým státům.
