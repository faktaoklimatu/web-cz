---
layout:      explainer
title:       "Jak se ke klimatické politice staví USA, Čína a Indie ve srovnání s EU"
slug:        "klimaticka-politika-svetove-regiony"
published:   2026-08-26
# TODO: doplnit autory a jejich role
authors:
  - id: "eliska-soperova"
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
    Od přijetí Pařížské dohody se globální přístup k dekarbonizaci zásadně proměnil. Snižování emisí už není jen environmentálním či morálním imperativem, ale je přímo spojené s otázkami energetické bezpečnosti a stává se předmětem soupeření o budoucí ekonomický růst. Environmentální cíle se tak dnes neoddělitelně prolínají s energetickou a průmyslovou politikou. Zatímco Evropská unie k této transformaci přistupuje primárně skrze klimatickou legislativu a regulace, ostatní globální hráči vycházejí z odlišných podmínek a volí jiné nástroje. V praxi však dosahují značných pokroků a v řadě technologických i průmyslových ohledů Evropu předstihují.
---

Tento text zasazuje evropský přístup do globálního kontextu a srovnává jej s přístupem USA, Číny a Indie. **Společně tito čtyři aktéři představují největší světové emitenty skleníkových plynů a zodpovídají za více než polovinu globálních emisí CO<sub>2</sub>**. Podrobněji srovnáváme jejich regulatorní rámce i reálný pokrok v dekarbonizaci a ukazujeme souvislosti s energetickou strukturou (import a export jednotlivých paliv) jejich ekonomik, stejně jako limity plynoucí z odlišných politických systémů či socioekonomické reality.

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
- <i class="fa-solid fa-landmark region-icon" aria-hidden="true"></i> [**Složitá governance a národní kompetence**](#eu-governance)

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
- <i class="fa-solid fa-arrow-right-arrow-left region-icon" aria-hidden="true"></i> [**Politická polarizace a volatilita**](#usa-polarizace)
- <i class="fa-solid fa-oil-well region-icon" aria-hidden="true"></i> [**Tržní pragmatismus**](#usa-pragmatismus)

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

**Zpoplatnění emisí a regulace:** Hlavním motorem evropské transformace je tržní mechanismus – systém obchodování s emisními povolenkami (EU ETS). Ten vytváří přímý tlak na snižování emisí a je doplněn komplexním systémem regulací, emisních cílů a technologických standardů zaměřených na poptávkovou stranu ekonomiky.
{: #eu-zpoplatneni}

**Dotace:** Druhým pilířem je rozsáhlá finanční podpora ze systémových fondů a dotací financovaných ze zisků EU ETS. Ve srovnání s Čínou tyto dotace více směřují k podpoře koncových uživatelů a k plošnému nasazování technologií (podpora zateplování, instalace solárních panelů či nákupu elektromobilů).
{: #eu-dotace}

**Složitá governance a národní kompetence:** Unijní legislativa vzniká mnohostranným vyjednáváním, což sice zajišťuje širokou konsensuální shodu, ale výrazně prodlužuje schvalování i implementaci. Zároveň volba národního energetického mixu a dílčí průmyslové politiky zůstávají ve výlučné pravomoci jednotlivých členských států.
{: #eu-governance}

### Čína
{: .js-toc-ignore .region-cina}

**Průmyslová politika a energetická bezpečnost:** Hlavním motorem transformace je silná státní průmyslová politika. Rozvoj čistých technologií (solární a větrné elektrárny, baterie, elektromobilita) slouží primárně k vymanění se ze závislosti na dovozu fosilních paliv a k dosažení dominance v globálních dodavatelských řetězcích.
{: #cina-prumyslova-politika}

**Dotace výrobcům a levné půjčky:** Čína masivně podporuje budování průmyslových výrobních kapacit a cíleně tak vytváří produkční přebytky a vysoce kompetitivní vnitřní prostředí. Díky tomu čínské firmy snižují výrobní ceny technologií a dominují světovému exportu.
{: #cina-dotace}

**Domácí rozvoj obnovitelných zdrojů a elektromobility:** Čína není pouhým exportérem. Na svém území Čína v posledních letech instaluje více solárních a větrných elektráren než zbytek světa dohromady a je světovým lídrem v elektromobilitě. Zároveň však pro zajištění energetické bezpečnosti stále buduje i nové uhelné elektrárny.
{: #cina-domaci-rozvoj}

**Centrální řízení:** Politické rozhodování probíhá striktně shora dolů, což umožňuje mimořádně rychlé schvalování a výstavbu infrastruktury. Odvrácenou stranou tohoto přístupu je riziko neefektivních investic a zadlužování regionů. Čínský způsob řízení vede k systémovým přešlapům a má závažné sociální a lidskoprávní dopady.
{: #cina-centralni-rizeni}

**Ideologické ukotvení:** Ochrana přírody a rozvoj čistých technologií jsou základními kameny tzv. Ekologické civilizace, oficiální ideologie, která informuje tvorbu politik v Číně. Podle ní se Čína posouvá do vyššího vývojového stádia, kde člověk a příroda žijí v harmonii.
{: #cina-ideologie}

### USA
{: .js-toc-ignore .region-usa}

**Daňové úlevy a protekcionismus:** Federální klimaticko-energetická politika se neopírá o regulaci, ale o masivní daňové úlevy („cukr bez biče“), které jsou ale podmíněné tím, že se technologie vyrobí v USA.
{: #usa-danove-ulevy}

**Politická polarizace a volatilita:** Klimatická agenda je v USA předmětem tvrdého kulturně-politického boje, což činí dlouhodobé federální směřování nestabilním. Zatímco Bidenova administrativa prosadila rekordní podporu čistým technologiím, Donald Trump tuto agendu odmítá, podporuje fosilní průmysl a stahuje USA z Pařížské dohody.
{: #usa-polarizace}

**Tržní pragmatismus:** Spojené státy jsou největším světovým těžařem a exportérem ropy i zkapalněného zemního plynu (LNG). Systém nijak nepenalizuje fosilní průmysl, ale zároveň kvůli ekonomické výhodnosti buduje i obnovitelné zdroje. Různé státy se v přístupu k energetické transformaci velmi liší – například Kalifornie či New York se ve svém přístupu podobají EU, zatímco republikánské státy jako Texas nebo Západní Virginie jakožto velcí producenti ropy a uhlí se otevřeně staví proti jakýmkoliv klimatickým opatřením.
{: #usa-pragmatismus}

### Indie
{: .js-toc-ignore .region-indie}

**Celkový růst energetiky:** Poptávka po energii strmě roste, a proto Indie neprochází klasickou tranzicí (nahrazováním fosilních zdrojů), ale masivně rozvíjí čisté zdroje – to je především cestou k nasycení poptávky a zajištění prosperity obyvatel.
{: #indie-rust}

**Solární boom a státní garance:** Země zažívá obrovský rozvoj solární energetiky, který je tažen efektivním systémem transparentních aukcí a státem zaručených dlouhodobých kontraktů. Indie disponuje širokou paletou opatření, kde již zmíněné finanční nástroje doplňují regulace, fiskální nástroje, veřejná podpora a připravovaný systém obchodování s emisními povolenkami.
{: #indie-solarni-boom}

**Klimatické finance a sociální spravedlnost:** Indie je rozvojová ekonomika a je významným příjemcem mezinárodní rozvojové pomoci. Prioritou je zajištění cenově dostupné energie pro stamiliony lidí, kteří se teprve vymaňují z chudoby. Zároveň je Indie aktivní v mezinárodních jednáních, kde usiluje o reformy mezinárodních finančních institucí s cílem zprostředkovat potřebné financování energetické transformace pro rozvojové země.
{: #indie-finance}


## Klimatické cíle, hlavní nástroje a governance

{% include includes-local/chart-panel.html
    id="graf-cile"
    class="no-foot"
    title=" "
    source='národní příspěvky (NDC) a strategie jednotlivých zemí, zpracování Fakta o klimatu'
%}

### Evropská unie
{: .js-toc-ignore .region-eu}
**Politiky a strategické dokumenty:** EU je průkopníkem klimatické politiky. V návaznosti na závazky přijaté v rámci Pařížské dohody EU vytvořila vlastní komplexní systém cílů, regulací a technologických standardů. Klíčovým mezníkem je přijetí zastřešující strategie Zelená dohoda v roce 2019 a Evropského klimatického zákona v roce 2021. Dříve samostatná agenda klimatické politiky se v posledních letech postupně integruje s řešením energetické bezpečnosti a ochranou hospodářské konkurenceschopnosti, a to zejména po přijetí strategie Dohody pro čistý průmysl (*Clean Industrial Deal*, CID).

**Nástroje:** Nejúčinnějším nástrojem je tržní mechanismus obchodování s emisními povolenkami. V sektorech ETS 1 (průmysl a energetika) došlo od roku 2005 ke snížení emisí o polovinu, proto se v rámci ETS 2 od roku 2028 rozšiřuje i na budovy a dopravu. Výnosy z prodeje povolenek financují čisté technologie (Modernizační a Inovační fond) i zmírnění sociálních dopadů (Sociální klimatický fond). Tržní mechanismus doplňují sektorové cíle (podíl OZE, energetická účinnost), technické standardy (emisní limity vozidel) a zelená taxonomie, která definuje, které ekonomické aktivity jsou udržitelné, a přesměrovává tak soukromé investice na jejich podporu.

**Governance:** Klimatická politika EU vzniká víceúrovňovým procesem, na kterém se podílejí unijní instituce, členské státy i veřejnost. Legislativní proces stojí na třech pilířích, kdy Evropská komise pravidla navrhuje, zatímco Rada EU (členské státy) a Evropský parlament (reprezentující občany) je společně schvalují. Výsledná legislativa má dvě hlavní formy. Směrnice určuje závazný cíl, ale nechává na státech, aby rozhodly, jakým způsobem cíle dosáhnou. Pro sjednocení pravidel pak slouží nařízení, která jsou plošně účinná ihned po schválení.

{% include figure.html
    name="evropsky-parlament-plenum.jpg"
    caption="Plenární zasedání Evropského parlamentu ve Štrasburku během rozpravy o stavu Unie, září 2023"
    alt="Fotografie velkého půlkruhového jednacího sálu Evropského parlamentu shora, poslanci sedí v řadách modrých lavic"
    source-text="Evropský parlament, Wikimedia Commons"
    source-url="https://commons.wikimedia.org/wiki/File:State_of_the_EU-_Ukraine,_Green_Deal,_Economy,_China,_Artificial_Intelligence_-_53188705655.jpg"
%}

### USA
{: .js-toc-ignore .region-usa}
**Strategie a politiky:** Za Bidenovy administrativy se klimatická politika opírala jak o mezinárodní rámec Pařížské dohody, tak o národní strategie. V roce 2021 Bidenova administrativa vydala dlouhodobou klimatickou strategii s cílem dosáhnout klimatické neutrality do roku 2050. V roce 2025 pak, ještě před nástupem Trumpa, USA zveřejnily aktualizovaný mezinárodní emisní závazek pro rok 2035. S návratem Trumpa USA odstoupily od Pařížské dohody a upustily od všech klimatických strategií.

**Nástroje:** V USA je energetická transformace poháněna trhem. Hlavními nástroji státu jsou daňové úlevy, které byly hlavním pilířem Bidenova ambiciózního zákona o snížení inflace (*Inflation Reduction Act*, IRA). Ten zavedl daňové úlevy pro čisté technologie, jako jsou elektromobily a obnovitelné zdroje. Následná Trumpova administrativa tuto podporu sice zrušila, energetická transformace však pokračuje dál, a to díky přetrvávající ekonomické atraktivitě čistých technologií.

**Governance:** Směřování americké klimatické politiky do velké míry určuje prezident, a to přes exekutivní příkazy a kontrolu nad agenturou pro ochranu životního prostředí EPA, která stanovuje emisní limity a regulace. Jednotlivé státy však mají značnou autonomii, proto se jejich klimatická opatření a cíle výrazně liší a často vedou ke sporům s federální vládou.

### Čína
{: .js-toc-ignore .region-cina}
**Politiky a strategie:** Čína si stanovuje své dlouhodobé cíle prostřednictvím mezinárodních závazků v rámci Pařížské dohody. Takto přijala svůj tzv. dvojí emisní cíl (*dual carbon target*) uhlíkové neutrality a zvrácení nárůstu emisí uhlíku do roku 2030, stejně jako svůj první absolutní emisní cíl pro rok 2035. Detailně však Čína plánuje klimatickou politiku v rámci svých pětiletých plánů, kde klimatická politika dostala s postupem času vlastní kapitolu.

**Nástroje:** Rozvoj čistých technologií v Číně stojí především na masivní dotační politice. Stát cíleně financuje výzkum a optimalizaci výrobních procesů, což v kombinaci s kontrolou dodavatelských řetězců a tvrdou konkurencí na domácím trhu vedlo k radikálnímu snížení výrobních nákladů. Díky této veřejné podpoře a obrovským úsporám z rozsahu Čína srazila ceny zelených technologií na minimum, čímž zásadně přispěla k jejich zlevnění po celém světě.

**Governance:** Stejně jako celý stát i čínská klimatická politika jsou centrálně řízeny a určovány zhora centrální vládou. Hlavní rozhodující moc má Ústřední výbor Komunistické strany Číny (CCCPC) v čele s čínským vůdcem Si Ťin-pchingem, který určuje hlavní směr a vydává obecné strategie. Byl to právě Si Ťin-pching, kdo po svém nástupu v roce 2013 začal prosazovat energetickou transformaci a ohlásil nástup ekologické civilizace (pokročilejší vývojové stádium čínské společnosti). Na základě pokynů vedení pak Čínský národní lidový kongres (NPCC), který je ekvivalentem parlamentu, přijímá konkrétní závazné cíle. Ty jsou následně rozdělovány mezi nižší správní celky.

{% include figure.html
    name="vsecinske-shromazdeni-2018.jpg"
    caption="Plenární zasedání Všečínského shromáždění lidových zástupců ve Velké síni lidu v Pekingu, kde téměř tři tisíce delegátů hlasují o změně ústavy, 11. března 2018"
    alt="Fotografie velkého sálu s rudými závěsy a státním znakem Číny nad pódiem, v řadách sedí delegáti, v popředí fotografové s teleobjektivy"
    source-text="Voice of America, Wikimedia Commons"
    source-url="https://commons.wikimedia.org/wiki/File:2018-03-11_第十三届全国人民代表大会第一次会议表决修宪案.jpg"
%}

### Indie
{: .js-toc-ignore .region-indie}
**Politiky a strategie:** Klimatická politika Indie se opírá o mezinárodní klimatický rámec pod Pařížskou dohodou, v rámci kterého pravidelně přijímá své mezinárodní závazky. Indie si kromě cíle klimatické neutrality v roce 2070 stanovila také dva další oficiální cíle pro emisní intenzitu a podíl elektřiny z nefosilních zdrojů. Kromě toho Indie přijala zastřešující národní politický rámec *National Action Plan on Climate Change* (NAPCC) a disponuje řadou sektorových strategií s dalšími indikativními cíli. Například v národním plánu pro elektřinu Indie plánuje vystavět 280 GW solární kapacity do roku 2030 a v rámci národního plánu pro dopravu si Indie stanovila za cíl dosáhnout 30% podílu elektroaut do stejného roku.

**Nástroje:** Indie staví svou klimatickou politiku na kombinaci různých opatření od přímých dotací přes tržní pobídky až po technologické standardy. Zásadním nástrojem dekarbonizace se staly elektronické reverzní aukce (pořádané agenturou SECI), v nichž developeři v reálném čase snižují výkupní ceny elektřiny na minimum výměnou za dlouhodobé kontrakty se státním odběratelem. Tento tržní tlak na straně velkých zdrojů doplňují cílené dotační programy pro rezidenční a zemědělskou fotovoltaiku (např. PM-KUSUM a PM Surya Ghar).

**Governance:** V Indii je v otázce klimatu vedoucím orgánem *Ministry of New and Renewable Energy*, které je podporováno expertními institucemi, jako jsou NITI Aayog, vládní think tank zabývající se veřejnou politikou, a *National Institute of Solar Energy* (NISE), nezávislá výzkumná organizace zaměřená na solární energetiku. V Indii funguje „kooperativní federalismus“, kdy klimatické politiky a strategie jsou přijímány centrální vládou a státy a svazová území se na implementaci výrazně podílejí tím, že si mohou přizpůsobit strategie svým specifickým podmínkám.

## Energetická soběstačnost (import a export energií)

{% include figure.html
    name="lng-tanky.jpg"
    caption="Nádrže na zkapalněný zemní plyn (LNG) na palubě lodi v přístavu"
    alt="Fotografie dvou velkých nádrží s nápisem LNG na palubě modré lodi s jeřáby, v pozadí modrá obloha"
    source-text="Markus Kammermann, Unsplash"
    source-url="https://unsplash.com/photos/two-large-lng-tanks-on-a-barge-with-cranes-Wx6aqlqbdys"
%}

### Evropská unie
{: .js-toc-ignore .region-eu}
EU dováží ~60 % primární spotřeby energií a jde tak o jeden z globálně nejméně soběstačných regionů. Dříve EU dovážela podstatnou část ropy a zemního plynu z Ruska, po roce 2022 a invazi Ruska na Ukrajinu však své dodavatelské řetězce radikálně změnila.

<div class="region-detail region-stats" markdown="1">

**Ropa:** Dovoz pokrývá 96 % spotřeby. Ruskou ropu nahradily dodávky z USA, Norska a Kazachstánu.

**Zemní plyn:** Z dovozu pochází 90 % spotřeby plynu v EU. Ruský potrubní plyn byl z velké části nahrazen dodávkami z Norska (to se stalo největším dodavatelem s podílem kolem 30 % celkového dovozu) a masivním dovozem zkapalněného plynu z USA a oblasti Perského zálivu.

**Uhlí:** Dovozní závislost u černého uhlí je ~60 % (hnědé se těží lokálně). Hlavní importní země: USA, Kolumbie, Austrálie, Kazachstán či Jihoafrická republika.

</div>

### USA
{: .js-toc-ignore .region-usa}
USA se díky rozvoji těžby ropy a plynu z břidlic dostaly do pozice vývozce energie. To jim poskytuje geopolitickou nezávislost a průmyslovou výhodu v podobě levných domácích surovin; zároveň se to promítá i do jejich přístupu ke globálnímu odchodu od fosilních paliv.

<div class="region-detail region-stats" markdown="1">

**Ropa:** USA jsou globálním čistým vývozcem ropy. Velké objemy lehké ropy těží a vyvážejí (do Evropy i Asie), ale nadále dovážejí těžkou ropu (hlavně z Kanady a Mexika), která je technologicky vhodnější pro některé americké rafinérie.

**Zemní plyn:** Země je zcela soběstačná. USA jsou největším producentem plynu a zároveň největším exportérem LNG na světě (zásobují zejména evropské a asijské trhy).

**Uhlí:** Protože americké elektrárny přecházejí na plyn a domácí spotřeba uhlí klesá, produkce dolů směřuje primárně na export (do Indie, Asie a nově i do Evropy).

</div>

### Čína
{: .js-toc-ignore .region-cina}
Čína si i přes masivní nárůst spotřeby udržuje vysokou energetickou soběstačnost ~85 %, tedy dováží jen ~15 % primární spotřeby energií. V absolutních číslech je však gigantickým dovozcem. Svou strategickou zranitelnost kompenzuje světově bezprecedentním budováním obnovitelných zdrojů a rozsáhlou domácí těžbou uhlí.

<div class="region-detail region-stats" markdown="1">

**Ropa:** Dováží přes 70 % spotřeby a celkově je největším světovým importérem. Hlavními dodavateli jsou Rusko a země Blízkého východu.

**Zemní plyn:** Dováží přes 40 % spotřeby. Jde o kombinaci potrubního plynu (z Turkmenistánu a Ruska) a námořního dovozu LNG (z Austrálie, Kataru a USA).

**Uhlí:** Čína je suverénně největším světovým těžařem, ale kvůli enormní domácí spotřebě a logistice v pobřežních oblastech zůstává zároveň i celkově největším světovým dovozcem černého uhlí (nakupuje zejména z Mongolska, Ruska a Austrálie).

</div>

### Indie
{: .js-toc-ignore .region-indie}
Indie má mimořádně nízkou energetickou soběstačnost. Zemi s více než miliardovou populací a prudce rostoucí průmyslovou výrobou chybí domácí zdroje ropy a plynu, což její ekonomiku činí silně závislou na cenách na světových trzích.

<div class="region-detail region-stats" markdown="1">

**Ropa:** Indie dováží téměř 90 % ropy; jejím klíčovým dodavatelem se po roce 2022 a uzavření Hormuzského průlivu stalo Rusko, následované Irákem, Saúdskou Arábií a USA.

**Zemní plyn:** Dováží zhruba 50 % své spotřeby, téměř výhradně ve formě LNG přes námořní terminály. Dominantními dodavateli jsou Katar a Spojené arabské emiráty, podíl ale navyšují i USA.

**Uhlí:** Indie volí podobnou strategii jako Čína, je druhým největším těžařem na světě a domácí uhlí tvoří páteř její energetiky. Kvůli nižší kvalitě domácí suroviny a obrovské poptávce však musí přes 20 % objemu dovážet (koksovatelné uhlí z Austrálie, energetické z Indonésie a Ruska).

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
Zatímco globálně emise rostou, EU je **od roku 1990 snížila o 40 %** (k roku 2025). Největší zásluhu na tom mají energetika a průmysl, kde k poklesu přispěly konec uhlí, rozvoj obnovitelných zdrojů a vyšší efektivita výroby. Přesto tyto sektory patří mezi největší zdroje emisí, a to kvůli přetrvávající závislosti EU na zemním plynu. Nejslabším článkem zůstává doprava, kde kvůli pokračujícímu využívání fosilních paliv emise klesly jen minimálně a v mnoha členských státech stále rostou. I přes dosavadní úspěchy však není jisté, zda EU svých ambiciózních klimatických cílů dosáhne. Proto bude naprosto klíčové důsledné zavádění dalších klimatických opatření a politik samotnými členskými státy.

<div class="region-stats" markdown="1">

<i class="fa-solid fa-cloud-arrow-up stat-icon" aria-hidden="true"></i> Roční emise: **3,16 miliardy t CO<sub>2</sub>eq**

<i class="fa-solid fa-user stat-icon" aria-hidden="true"></i> Emise na hlavu: **7,14 t CO<sub>2</sub>eq**

<i class="fa-solid fa-layer-group stat-icon" aria-hidden="true"></i> Podíl na historických emisích CO<sub>2</sub>: **16,27 %**

</div>

### USA
{: .js-toc-ignore .region-usa}
Na rozdíl od EU **snížily** USA **své emise oproti roku 1990 pouze o 5 %**. Největší pokles zaznamenala energetika, a to hlavně díky přechodu z uhlí na levný zemní plyn po břidlicové revoluci (tzv. *Shale Boom*) v roce 2005. Energetika však zůstává nejvíce znečišťujícím sektorem, a to proto, že USA jsou největším producentem a vývozcem ropy a zemního plynu. Podobně velkým znečišťovatelem je doprava, kde za vysokými emisemi stojí extrémní závislost na osobních autech a specifická rozlehlá geografie amerických měst. Navzdory Trumpově klimaskeptické politice predikce ukazují, že USA jsou na cestě ke snížení emisí o 26 % až 41 % do roku 2040 a k dekarbonizaci v roce 2058. Klíčový je trh, který pod tlakem globální ekonomiky pohání rozvoj čistých technologií, a to navzdory všem překážkám ze strany americké vlády.

<div class="region-stats" markdown="1">

<i class="fa-solid fa-cloud-arrow-up stat-icon" aria-hidden="true"></i> Roční emise: **5,91 miliardy t CO<sub>2</sub>eq**

<i class="fa-solid fa-user stat-icon" aria-hidden="true"></i> Emise na hlavu: **17,34 t CO<sub>2</sub>eq**

<i class="fa-solid fa-layer-group stat-icon" aria-hidden="true"></i> Podíl na historických emisích CO<sub>2</sub>: **23,52 %**

</div>

### Čína
{: .js-toc-ignore .region-cina}
Jako „světová továrna“ a prudce se rozvíjející ekonomika je Čína největším globálním emitentem; její **emise však v posledních dvou letech stagnují a v roce 2025 dokonce začaly klesat,** a to díky masivnímu rozvoji obnovitelných zdrojů energie. Tento trend vytváří paradox, kdy je země zároveň největším znečišťovatelem i světovým lídrem v kapacitě OZE. Klíčovým zdrojem znečištění zůstává sektor výroby elektřiny a tepla poháněný uhlím. Naopak doprava tvoří pouhých 10 % čínských emisí, mnohem méně než je tomu u vyspělých ekonomik. Svůj podíl má na tom velký rozvoj elektromobility.

<div class="region-stats" markdown="1">

<i class="fa-solid fa-cloud-arrow-up stat-icon" aria-hidden="true"></i> Roční emise: **15,54 miliardy t CO<sub>2</sub>eq**

<i class="fa-solid fa-user stat-icon" aria-hidden="true"></i> Emise na hlavu: **10,81 t CO<sub>2</sub>eq**

<i class="fa-solid fa-layer-group stat-icon" aria-hidden="true"></i> Podíl na historických emisích CO<sub>2</sub>: **15,42 %**

</div>

### Indie
{: .js-toc-ignore .region-indie}
Indie je příkladem rychle se rozvíjející ekonomiky, jejíž emise prudce rostou. Přesto **nárůst emisí v poslední době prudce zpomaluje**, a to zejména díky masivní výstavbě solárních parků, která zároveň zásadně přispěla k dosažení univerzálního přístupu indické populace k elektřině. Na rozdíl od ostatních zemí je v Indii jedním z největších znečišťovatelů sektor zemědělství, který je masivním zdrojem emisí metanu a je zodpovědný za pětinu všech emisí. Nejvíce znečišťujícím sektorem však zůstává výroba elektřiny a tepla, kde je Indie, podobně jako Čína, závislá na uhlí.

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
V posledních letech začínají v unijním elektrickém mixu hrát **zásadní roli nízkoemisní zdroje** a podíl zemního plynu na výrobě elektřiny se snižuje. Aktuálně **71 % elektřiny pochází z čistých zdrojů** (vítr, slunce, biomasa, hydro nebo jádro) a z toho 30 p. b. obstarávají solární a větrná energie. V EU největší rozvoj zažívá solární energetika, kdy v posledních pěti letech produkce elektřiny ze slunce rostla meziročně o 21 %. Zároveň rok 2025 byl rokem, kdy ze slunce a větru pocházelo víc elektřiny než z fosilních zdrojů ve 14 z 27 evropských zemí.

#### USA
{: .js-toc-ignore .region-usa}
Přestože rozvoj OZE v USA má o něco pomalejší a pozdější nástup, i USA zažívají v posledních letech prudký **rozvoj solární a větrné energie**. Aktuálně **43 % elektřiny pochází z čistých zdrojů** a z toho 19 p. b. ze slunce a větru. Podíl elektřiny v některých amerických státech je i vyšší. Například v Kalifornii z obnovitelných zdrojů pochází kolem 60 % elektřiny. V Kansasu 50 % elektřiny pochází pouze z větru.

#### Čína
{: .js-toc-ignore .region-cina}
Čínský elektrický **mix byl historicky postaven na uhelných zdrojích**. To se ale v posledních letech mění. Čína je **regionem s největším nárůstem solární a větrné kapacity** ve velmi krátké době. Elektřina z obnovitelných zdrojů tak z velké části uspokojuje rostoucí poptávku po elektřině a rok 2025 byl prvním rokem, kdy OZE vyrobily více elektřiny než uhlí. Aktuálně **42 % elektřiny pochází z čistých zdrojů**, z toho polovina z větru a slunce.

#### Indie
{: .js-toc-ignore .region-indie}
Podobně jako Čína se i Indie potýká s prudkým nárůstem poptávky po elektřině a její **mix je založený především na uhlí**. V posledních pěti letech však Indie masivně staví solární zdroje a bateriová úložiště. Podíl elektřiny z OZE tak rychle roste, zatímco podíl elektřiny z uhlí se snižuje ze 75 % v roce 2023 na 71 % v roce 2025. Aktuálně tak **27 % elektřiny pochází z čistých zdrojů** a z toho 14 p. b. ze slunce a větru.

</div>

### Rozvoj obnovitelných zdrojů

{% include includes-local/chart-panel.html
    id="graf-oze"
    class="no-title"
    title="Rozvoj obnovitelných zdrojů, 2000–2025"
    source='<a href="https://ember-energy.org/data/yearly-electricity-data/">Ember</a>, populace: <a href="https://population.un.org/wpp/">OSN (World Population Prospects 2024)</a>'
%}

Právě výstavba kapacity obnovitelných zdrojů je oblast, kde rozvojové země jako Čína a Indie překvapí. Zatímco v EU nebo USA výstavba průběžně roste, v Indii a Číně dochází ke skokovým meziročním nárůstům. Například Čína během prvních šesti měsíců v roce 2025 postavila dvakrát tolik OZE kapacity jako celý svět dohromady a Indie díky své rychlé výstavbě OZE nyní disponuje 3. největší kapacitou OZE na světě poté, co v roce 2025 předstihla Německo.

{% include figure.html
    name="talatan-solarni-park.jpg"
    caption="Solární park Talatan v čínské provincii Čching-chaj, jeden z největších na světě. Vpravo nádrž Longyangxia na Žluté řece."
    alt="Satelitní snímek pouště, ve které tmavé obdélníky solárních panelů pokrývají plochu mnoha kilometrů; vpravo zelená vodní nádrž"
    source-text="Copernicus Sentinel-2, Wikimedia Commons"
    source-url="https://commons.wikimedia.org/wiki/File:2026-03-02-00_00_2026-03-02-23_59_Sentinel-2_L2A_True_color_(1).jpg"
%}

### Elektromobilita


V oblasti elektromobility je **Čína jasným světovým lídrem**. Na domácím trhu tvoří elektromobily již přes polovinu prodejů nových aut a čínští výrobci ovládají i globální scénu. V roce 2025 pocházelo 60 % celosvětově prodaných elektromobilů z Číny, zatímco z EU a USA pocházelo shodně pouze 15 %.

{% include includes-local/chart-panel.html
    id="graf-elektromobily"
    title="Podíl elektromobilů na prodejích nových aut, 2010–2025"
    source='<a href="https://www.iea.org/reports/global-ev-outlook-2026">IEA Global EV Outlook 2026</a> přes <a href="https://ourworldindata.org/grapher/electric-car-sales-share">Our World in Data</a>'
%}

{% capture box-elektrifikace %}
Elektrifikace je vedle výstavby OZE druhým pilířem dekarbonizace. K jejímu měření slouží např. **podíl elektřiny na konečné spotřebě energie**. Tento indikátor ukazuje, do jaké míry spotřebitelé přecházejí od přímého spalování paliv k využívání elektrické energie. Zatímco **v Číně dosahuje hodnoty 32 %, v EU a USA stagnuje od desátých let na 24 % a v Indii činí 21 %**.

Čína vede zejména díky rychlé instalaci tepelných čerpadel a rozvoji elektromobility. Díky tomu role uhlí v sektoru budov a průmyslu klesá a elektřina se stala hlavním zdrojem energie jak v sektoru budov, tak v průmyslu, a rychle posiluje i v dopravě. Velkou roli hraje také posilování přenosových soustav a velká výstavba bateriových úložišť, které umožňují rychlou integraci OZE do elektrické sítě.

Oproti tomu míra elektrifikace v USA a EU už od roku 2010 stagnuje na hodnotách kolem 20 %, a to zejména kvůli nedostatečné kapacitě elektrické sítě a chybějícím bateriovým úložištím.

Elektrifikace v Indii je sice pomalejší, ale to se v posledních letech mění. Je řízena rychlou výstavbou OZE, zejména velkých solárních parků, doplněnou rychlou výstavbou rezidenční a zemědělské fotovoltaiky a instalací elektrických čerpadel. Odbyt elektromobilů není tak rychlý, s podporou vlády však dochází k rychlé elektrifikaci dvou- a tříkolových vozidel, která v roce 2025 tvořila 60 % a 26 % prodejů.

Data pro Čínu, USA a EU (OECD) viz [China Energy Transition Review 2025](https://ember-energy.org/app/uploads/2025/09/China-Energy-Transition-Review-2025.pdf#page=22.99), Ember, s. 23.

{% include includes-local/chart-panel.html
    id="graf-elektrifikace"
    title="Podíl elektřiny na konečné spotřebě energie, 2000–2019"
    source='<a href="https://www.iea.org/data-and-statistics/charts/share-of-electricity-in-total-final-consumption-in-selected-countries-and-regions-2000-2020">IEA</a>'
%}
{% endcapture %}

{% include expandable.html id-prefix="collapse-regiony" counter=1 title="### Jaká je v jednotlivých regionech míra elektrifikace?"
    content=box-elektrifikace
%}

{% capture box-investice %}
Ukazatel investic do energetické transformace vyjadřuje objem veřejných a soukromých financí vynaložených na výstavbu čistých technologií a infrastruktury. Pro objektivní srovnání jednotlivých států je vhodné sledovat jejich podíl na HDP, který eliminuje vliv velikosti ekonomiky (a také rozdílných cenových hladin).

Samotná výše investic však přímo neodráží skutečné tempo dekarbonizace, protože je nutné zohlednit také další faktory, jako jsou růst celkové poptávky po elektřině, míra zapojení veřejného sektoru nebo poměr výdajů směřujících do čistých versus fosilních zdrojů. Přesto dobře ukazuje, jak se jednotlivé státy angažují v energetické transformaci a jsou tak schopny mobilizovat investice. Každý region k tomu volí jinou strategii: EU sází na robustní politický rámec, USA na pobídky pro soukromý kapitál a spotřebitele a Čína na masivní budování výrobních kapacit. Čína je absolutním lídrem, co se týče investic do energetické transformace. V roce 2025 tyto investice dosáhly částky 800 miliard. Čína se tak podílí 34 % na celosvětových investicích a investuje více než dalších šest zemí dohromady.

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
EU je dlouhodobým lídrem v mezinárodní klimatické politice. Ambiciózní cíle prosazovala již od podpisu Rámcové úmluvy OSN o změně klimatu (UNFCCC) v roce 1992 i při vyjednání Pařížské dohody v roce 2015. Její vystupování však bývá komplikované a nejednotné. Jelikož je životní prostředí sdílenou kompetencí, musí EU před jednáními složitě hledat shodu mezi všemi členskými státy. Na mezinárodní úrovni ji pak reprezentují Evropská komise, aktuální předsednická země Rady EU a jednání se účastní i prezident Evropské rady. Své delegace vysílají i samotné členské státy, aby mohly hájit své individuální zájmy.

### USA
{: .js-toc-ignore .region-usa}
USA hrají v klimatických jednáních klíčovou roli díky svému ekonomickému vlivu a vysokým emisím. Do jednání jsou zapojeny od přijetí UNFCCC v roce 1992, prosazují však spíše flexibilní a tržní mechanismy než závazné emisní cíle. Z toho důvodu neratifikovaly Kjótský protokol. V roce 2014 USA oznámily s Čínou společné klimatické kroky a později se připojily k Pařížské dohodě, která umožňuje státům stanovovat si vlastní dobrovolné cíle. Přesto USA za vlády Donalda Trumpa od Pařížské dohody i od rámce UNFCCC odstoupily.

### Čína
{: .js-toc-ignore .region-cina}
Čína je smluvní stranou UNFCCC a připojila se ke Kjótskému protokolu i Pařížské dohodě. Prosazuje princip společné, ale rozdílné odpovědnosti a nadále trvá na statusu rozvojové země, který jí dává větší flexibilitu při snižování emisí. Přestože sama finanční pomoc nepožaduje, poskytuje ji jiným rozvojovým státům skrze vlastní iniciativy (jako *South–South Cooperation* nebo *Belt and Road Initiative*). Do mezinárodních jednání se zapojuje stále aktivněji a akcentuje obchodní spolupráci, což jí pomáhá posilovat globální vliv a podporovat domácí sektor čistých technologií. Dělá to však spíše z ekonomických a mocenských důvodů, a ne pro záchranu klimatu. Proto mnozí pozorovatelé nevěří, že by se Čína ujala role lídra v mezinárodních klimatických jednáních.

### Indie
{: .js-toc-ignore .region-indie}
Jakožto velký zastánce multilateralismu je Indie aktivním členem mezinárodních jednání a podporuje mezinárodní spolupráci. Indie v mezinárodních jednáních dlouhodobě prosazuje princip společné, ale rozdílné odpovědnosti a klimatické spravedlnosti. Tyto zásady nevyužívá ke zbavení se odpovědnosti, ale k získání potřebné flexibility pro svůj rozvoj. Dlouhodobě požaduje předvídatelné a dostatečné klimatické finance ze strany vyspělých států, které hodnotí jako nezbytné pro dekarbonizaci rozvojového světa. Za tímto účelem se kromě mezinárodních klimatických jednání účastní a vede řadu iniciativ s cílem reformovat mezinárodní finanční instituce a zpřístupnit finance pro energetickou transformaci a ochranu klimatu rozvojovým státům.

## Poznámky

