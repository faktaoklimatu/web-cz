---
layout:      explainer
title:       "Kolik stojí vypouštění emisí skleníkových plynů?"
slug:        "spolecenske-naklady-uhliku"
published:   2026-04-12
authors:
  - ids: ["tom-protivinsky", "katerina-kolouchova"]
  - id: "marcel-otruba"
    minor-role: "vizualizace"
  - name: "Barbora Zoja Zuchová"
    minor-role: "korektura"
weight:      76
tags-scopes: [ svet ]
tags-topics: [ emise, opatreni, ekonomika ]
cover-source-author:        "Marcel Otruba"
cover-source-text:          "Fakta o klimatu"
cover-source-license:       "CC BY 4.0"
cover-source-license-url:   "https://creativecommons.org/licenses/by/4.0/deed.cs"
cover-source-url:           "https://faktaoklimatu.cz/explainery/nastroje-stat"
perex: |
    Snižování emisí skleníkových plynů není jednoduché, protože fosilní paliva jsou stále široce využívána napříč celým hospodářstvím. Nízkoemisní opatření s sebou přinášejí samozřejmě náklady. Avšak vypouštění skleníkových plynů má také svoji cenu, jen mnohem méně zjevnou. Tato cena, jejíž výše odráží škody, které způsobí vypuštění jedné tuny oxidu uhličitého, se označuje jako společenské náklady uhlíku.
---

**Každá vypuštěná tuna skleníkových plynů přispívá ke změně klimatu**[^otepleni-ipcc], a tím prohlubuje budoucí negativní dopady na společnost, ekonomiku i ekosystémy. Tyto dopady se projevují jak prostřednictvím krátkodobých jevů, jako jsou extrémní projevy počasí, tak dlouhodobých změn, například poklesu zemědělských výnosů v důsledku sucha nebo posunu vegetačních pásem.

Na místě je tak otázka, jak velké jsou budoucí škody způsobené každou další dnes vypuštěnou tunou skleníkových plynů v porovnání s náklady na to, aby se tyto plyny do ovzduší vůbec nedostaly.

Budoucí škody způsobené každou další dnes vypuštěnou tunou oxidu uhličitého, se označují jako **společenské náklady uhlíku** (*Social Cost of Carbon*, SCC) a zpravidla se vyjadřují v dolarech na tunu CO<sub>2</sub>.[^scc-definice] Společenské náklady uhlíku rovněž označují, jak velkého přínosu dosáhneme (kolik peněz ušetříme), pokud dnes vypuštění dodatečné tuny CO<sub>2</sub> zabráníme. Výše tohoto přínosu je totiž shodná s výší škody, ke které by došlo v opačném případě.

Hodnota společenských nákladů uhlíku je užitečná pro analýzu přínosů a nákladů při politickém rozhodování a pro posouzení přiměřenosti jednotlivých dekarbonizačních opatření. Porovnáváme přitom náklady na jejich realizaci s odhadovaným přínosem, tedy výší škod, kterým zabráníme, když zvažované opatření přijmeme. Pokud jsou přínosy opatření vyšší než jejich cena, lze říct, že se toto opatření finančně vyplatí.

## Co ovlivňuje výši společenských nákladů uhlíku?

Hodnota SCC je výsledkem modelování s mnoha vstupy. Konečnou výši přitom ovlivňují především:

* **klimatické dopady a škody** zahrnuté do modelu a jejich ekonomický dopad,
* **diskontní míra**, která vyjadřuje, jakou hodnotu dnes přikládáme budoucnosti.

### Klimatické dopady a škody

SCC v závislosti na použitém modelu může zahrnovat například škody plynoucí ze:

* ztrát na majetku a infrastruktuře v důsledku extrémních jevů (např. povodní nebo požárů),
* dopadů na lidské zdraví (např. úmrtnost a nemocnost spojená s vlnami veder),
* změn zemědělské produkce a dostupnosti vody,
* ztráty ekosystémových služeb a biodiverzity,
* snížení produktivity lidské práce.

V jednotlivých oblastech se přitom modelují jak **negativní, tak i některé potenciálně pozitivní dopady** změny klimatu. Patří mezi ně například nižší náklady na vytápění v chladnějších regionech nebo pokles úmrtnosti spojený s velmi nízkými teplotami.

Výsledná výše SCC závisí především na tom, **jaké typy dopadů jsou v modelu zahrnuty a jak je specifikována tzv. funkce škod, která z těchto dopadů vyvozuje peněžní hodnotu**. Ta vyjadřuje vztah mezi změnou klimatu – typicky vyjádřenou růstem globální průměrné teploty – a velikostí ekonomických ztrát v jednotlivých sektorech a regionech. Funkce škod obvykle vychází z empirické literatury, která odhaduje, jak změny teplot a související klimatické jevy ovlivňují lidské zdraví, zemědělství, produktivitu práce nebo další části ekonomiky.

### Diskontní míra

Budoucí klimatické škody vznikají často až za desítky let, zatímco náklady na jejich omezení existují již dnes. Aby bylo možné tyto dvě veličiny porovnat a posoudit, zda se investice do dekarbonizačních opatření vyplatí, používá se diskontní míra, která **určuje, jakou hodnotu připisujeme budoucím škodám dnes**. Jinými slovy, převádí budoucí škody na jejich **současnou hodnotu**.

**Starší modely** používaly **jednoduché diskontování s fixní diskontní mírou**. V takovém modelu znamená každý další rok v budoucnosti rovnoměrné snižování současné hodnoty. Graf níže ukazuje, jak se současná hodnota budoucí škody mění v závislosti na zvolené diskontní míře a počtu let, za které škoda nastane – čím později k tomu dojde, tím nižší hodnotu má dnes. Například při 2% diskontní míře odpovídá škodě ve výši 100 $, která nastane za 35 let, současná hodnota přibližně 50 $. Pokud by ke stejné škodě došlo až za 70 let, její současná hodnota by byla pouze 25 $. Zjednodušeně řečeno, model tedy škodám dopadajícím na děti současné generace přiřazuje zhruba poloviční váhu (55 % při uvažované délce generace 30 let) a škodám dopadajícím na její vnuky méně než třetinovou váhu (30 %).

{% include figure.html
    name="diskontni-mira.svg"
    alt="Graf ukazuje, jak různá výše hodnoty diskontní míry snižuje dnešní hodnotu budoucí škody v čase. Čím je diskontní míra vyšší, tím je nižší a naopak."
    caption="Diskontní míra a její vliv na dnešní hodnotu budoucí škody."
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/"
%}

Diskontní míru lze chápat také jako úročení nad rámec inflace: současná hodnota budoucích škod odpovídá částce, kterou by bylo nutné dnes investovat, aby při daném úročení v budoucnu dosáhla na hodnotu těchto škod.

**Moderní modely** často používají tzv. **Ramseyho diskontování**, které odvozuje diskontní míru z předpokladů o preferencích společnosti a budoucím ekonomickém růstu. Klíčovou roli zde hraje skutečnost, že hodnota budoucího dolaru závisí na bohatství společnosti. Pokud bude například za 50 let společnost dvakrát bohatší než dnes, pak budoucí škoda ve výši 100 $ bude představovat relativně menší ztrátu blahobytu, než by představovala dnes. V takové situaci může být její současná hodnota přibližně srovnatelná se škodou v hodnotě dnešních 50 $.

Ramseyho přístup tak kombinuje dvě složky: **čistou časovou preferenci** (nakolik upřednostňujeme současnost před budoucností) a **vliv budoucího bohatství**, tedy do jaké míry budou příští generace schopny nést škody snáze díky vyšší životní úrovni. Pokud by budoucí společnost byla přibližně stejně bohatá jako dnešní, pak by i budoucí škody měly téměř stejnou váhu jako škody současné.

Odhady společenských nákladů uhlíku se proto obvykle počítají pomocí simulace mnoha možných trajektorií dalšího vývoje ekonomiky a emisí. V některých scénářích může ekonomika růst rychleji, v jiných pomaleji, a tím se mění i relativní význam budoucích škod. Diskontování se proto může v jednotlivých simulovaných budoucnostech lišit.

{% include preview-box.html
    title="Sternova zpráva"
    text="Jedna z nejznámějších analýz ekonomických dopadů změny klimatu."
    slug="2006-sternova-zprava"
%}

Ideální výše diskontní míry je předmětem akademických diskuzí a v praxi se lze setkat s různými hodnotami:

* **Nízká diskontní míra**. Předpokládá, že budoucí generace mají skoro stejnou váhu jako generace současná. Například [Sternova zpráva](https://faktaoklimatu.cz/studie/2006-sternova-zprava) používá míru 1,4 %. Takový přístup vede k vyšším odhadům současné hodnoty budoucích klimatických škod a podporuje rychlejší klimatickou akci.
* **Vysoká diskontní míra**. Odráží silnější preferenci současnosti a předpoklad, že budoucí společnost bude výrazně bohatší, takže škody pro ni budou představovat relativně menší újmu z hlediska blahobytu. Zastáncem vyšší diskontní míry (kolem 4 %) je například americký ekonom William Nordhaus. Vyšší diskontní míra však může vést k odkládání investic do dekarbonizace, protože snižuje dnešní hodnotu budoucích škod.

{% include figure.html
    name="diskontni-mira-nizka-vysoka.svg"
    alt="Graf ukazuje vývoj dnešní hodnoty budoucí škody na příkladu dvou diskontních měr – 1,4 % a 4 %."
    caption="Různé přístupy ke stanovení výše diskontní míry."
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/"
%}

## Příklad: Společenské náklady uhlíku dle EPA

Model Agentury pro ochranu životního prostředí USA (*Environmental Protection Agency*, EPA) je vhodným příkladem výpočtu SCC, protože je dobře popsaný (včetně jeho limitů) a do nástupu druhé administrativy Donalda Trumpa byl prakticky využíván pro rozhodování o investic do dekarbonizačních opatření.[^epa-zdroje]

Podle modelu EPA **způsobí tuna CO<sub>2</sub> vypuštěná v roce 2025 škodu ve výši přibližně 260 $**.[^epa-diskontni-mira] Model však zahrnuje pouze některé z očekávaných dopadů změny klimatu (viz níže), což tyto odhady činí relativně konzervativními.

Tato hodnota společenských nákladů uhlíku znamená, že **v Česku** – při ročních emisích zhruba 10 t CO<sub>2</sub>eq na osobu – představují škody způsobené emisemi skleníkových plynů přibližně **52 400 Kč na osobu ročně**.[^scc-kc]

{% capture hdp %}

Globální dopady změny klimatu lze vyjádřit také jako škody v poměru k celosvětovému HDP pro určitý rok v porovnání s HDP ve světě bez změny klimatu.

**Strukturální modely** (sektorální modely použité v odhadu EPA) vychází z popisu mechanismů, jak oteplení ovlivňuje jednotlivé sektory (např. zemědělství, zdraví, energetiku), a tyto dílčí dopady následně agregují do celkového dopadu na ekonomiku. Modely pro rok 2100 odhadují škody v hodnotě **méně než 3 % HDP při oteplení o 2 °C** a přibližně 5 % HDP při oteplení o 4 °C ve srovnání s hypotetickým scénářem bez změny klimatu.

Oproti tomu **statistické modely** odvozují dopady z historických dat – sledují, jak se ekonomická aktivita měnila v letech s odlišnými teplotami a srážkami, a na základě toho vyjadřují, jaké dopady lze očekávat v budoucnu. Pro rok 2100 udávají škody ve výši **více než 10 % HDP při oteplení o 2 °C** a až 20–30 % HDP při oteplení o 4 °C. Takové modely se dosud k odhadům společenských nákladů uhlíku nepoužívají, ačkoliv by vedly k násobně vyšším odhadům nákladů. Zde uváděný odhad společenských nákladů uhlíku 260 $/t CO<sub>2 </sub>podle EPA je vhodné považovat za velice konzervativní, který představuje pouze spodní hranici budoucích ekonomických škod.

Srovnání výsledků jednotlivých modelů nabízí například Šestá hodnotící zpráva IPCC, WG II, s. [2497](https://www.ipcc.ch/report/ar6/wg2/downloads/report/IPCC_AR6_WGII_Chapter16.pdf).

{% endcapture %}

{% include expander-figure.html
    name="hdp"
    expanded=false
    class="contrast-figure"
    label="Kontext: Alternativní vyčíslení: škody jako poměr k HDP"
    content=hdp
%}

### Jak model společenské náklady uhlíku počítá?

EPA společenské náklady uhlíku počítá na základě čtyř komponent:

{% include figure.html
    name="schema.svg"
    alt="Schematické zobrazení komponent modelu EPA."
    caption="Schéma modelu EPA."
    source-text="EPA"
    source-url="https://www.epa.gov/system/files/documents/2023-12/epa_scghg_2023_report_final.pdf"
%}

1. **Socioekonomický vývoj a emise:** zahrnuje predikce vývoje populace, ekonomického růstu a odpovídajících emisí skleníkových plynů.
2. **Klimatický model:** podle predikovaných budoucích emisí modeluje atmosférické koncentrace skleníkových plynů, průměrnou teplotu a vzestup mořské hladiny.
3. **Model dopadů a škod:** socioekonomické projekce a výstupy z klimatického modelu vstupují do funkce škod (viz výše), která na jejich základě odhaduje budoucí škody převedené na peněžní hodnotu.
4. **Diskontování:** výsledný odhad společenských nákladů uhlíku závisí do velké míry na tom, jakou hodnotu přikládáme budoucnosti. Tu určuje diskontní míra (viz výše). Střední hodnota diskontní míry, se kterou model pracuje, je 2 %.

{% capture nejistota %}

Výsledný odhad SCC je daný tzv. Monte Carlo simulací, která umožňuje modelovat nejistotu v parametrech jednotlivých komponent prostřednictvím simulace mnoha různých scénářů současně. Výstupem modelu je pak celé pravděpodobnostní rozložení společenských nákladů uhlíku. Výsledné hodnoty SCC jsou průměrem ze všech modelovaných scénářů.

Při nižší diskontní míře roste hodnota přisuzovaná budoucím škodám, což zároveň zvyšuje nejistotu v odhadu SCC, protože míra škod ve vzdálené budoucnosti je sama o sobě nejistá. Například ve [studii](https://www.nature.com/articles/s41586-022-05224-9) Renner et al. (2022) v základním scénáři s 2% diskontní mírou je 5. percentil odhadu 44 $, průměr 185 $ a 95. percentil 413 $ na tunu CO<sub>2</sub>.

{% include figure.html
    name="nejistota.png"
    alt="Graf ukazuje nejistotu výsledné výše SCC při různých hodnotách diskontní míry. Čím je diskontní míra nižší, tím je nejistota ohledně výsledných SCC vyšší."
    caption="Scénáře modelování SCC při různých diskontních mírách včetně nejistoty."
    source-text="Rennert et al. (2022)"
    source-url="https://www.nature.com/articles/s41586-022-05224-9"
%}

{% endcapture %}

{% include expander-figure.html
    name="nejistota"
    expanded=false
    class="contrast-figure"
    label="Na okraj: Nejistota modelu"
    content=nejistota
%}

### Jaké klimatické škody model zahrnuje?

Změna klimatu je pro posouzení dopadů **modelována pouze jako změna průměrné povrchové teploty a vzestup mořské hladiny**. Škody, které jsou způsobené jinými projevy klimatické změny – například extrémními projevy počasí (povodně), změnou srážek nebo acidifikací oceánů – v modelu vůbec nejsou zahrnuté.[^epa-limity]

Započítané škody jsou v modelu EPA reprezentovány prostřednictvím **tří různých modelů dopadů a škod** a výsledný odhad společenských nákladů uhlíku odpovídá jejich průměru.

* První a druhý model odhadují škody v jednotlivých sektorech (jde o tzv. sektorální strukturální modely) na národní a regionální úrovni.[^epa-modely]
* Třetí model vychází z metaanalýzy odborných studií.

Sektorální modely zahrnují klimatické škody v následujících oblastech:

* lidské zdraví – úmrtí v důsledku vysokých či nízkých teplot,
* náklady na energie – výdaje na elektřinu a jiná paliva,
* produktivita práce – snížená produktivita práce v důsledku vysokých teplot,
* zemědělství – dopad na úrodu šesti nejrozšířenějších plodin,
* pobřežní oblasti – náklady způsobené záplavami pobřežních oblastí, poškozením infrastruktury, související migrací a potřebou adaptačních opatření.

Z těchto pěti oblastí je více než polovina společenských nákladů způsobena dopadem na lidské zdraví[statisticky-zivot8], následně také dopady na zemědělství a produktivitu práce. Náklady na energie se příliš nezvýší, neboť zároveň dojde k úsporám v zimních měsících. Škody v pobřežních oblastech jsou poměrně nízké, protože model předpokládá optimální adaptaci daných oblastí na dopady změny klimatu.

Model nezahrnuje celou řadu dalších očekávaných škod – například náklady související se zajištěním pitné vody, úbytkem biodiverzity, změnami v ekosystémových službách, v lesnictví a chovu dobytka, dopady na lidské zdraví spojené s rozšířením infekčních chorob, dopady acidifikace oceánů nebo v důsledku bodů zlomu.[^epa-oblasti]

### Je americký model relevantní i pro Česko a Evropu?

EPA modeluje globální škody bez ohledu na to, zda se projeví v USA nebo kdekoli jinde na světě. Existují jiné odborné studie, které modelují společenské náklady uhlíku pro jednotlivé země – odhady pro jednotlivé země jsou ale vždy výrazně nižší než globální odhad, protože globální škody jsou dané agregací (tedy součtem) škod ve všech jednotlivých zemích.[^dopady-hdp]

Pokud by jednotlivé země braly při rozhodování o implementaci klimatických opatření v úvahu pouze společenské náklady uhlíku pro ně samotné, pak by nedošlo k přijetí prakticky žádných klimatických opatření. Na druhou stranu jednotná hodnota pro celý svět zakrývá nerovnost dopadů změny klimatu, které jsou v každém regionu jiné. Z pohledu rozhodování celého lidstva je však relevantní odhad škod právě ten globální, neboť škody způsobené dnešními emisemi skleníkových plynů nerespektují hranice a dopadají na všechny státy. Mezinárodní spolupráce je pro vyřešení klimatické změny klíčová a některé vědecké studie zdůrazňují reciprocitu při zavádění mitigačních opatření – akce jedné země může motivovat k přijímání opatření jiné státy.

## Přínosy a limity konceptu

### Přínosy

* **SCC umožňuje vyčíslovat škody**, které působí změna klimatu, **a srovnávat je s náklady na dekarbonizační opatření**, která by jim zabránila.
* Slouží jako **podklad pro tvorbu politik** založených na analytických podkladech.

### Limity

* **Modely nezahrnují všechny škody**, které mohou v souvislosti s postupující změnou klimatu nastat (viz model EPA výše). V důsledku toho může být výše SCC výrazně podhodnocená.
* **Řada budoucích dopadů je zatížena nejistotou** – např. v socioekonomickém vývoji, schopnosti adaptace nebo četnosti a intenzitě extrémních jevů počasí.
* **Hodnotu SCC ovlivňuje nastavení parametrů**, především diskontní míry nebo také použitých modelů škod a předpoklady o budoucím ekonomickém růstu. Různé volby parametrů mohou měnit výsledek i několikanásobně.
* **SCC nezachycuje odlišnou míru dopadů v jednotlivých částech světa.** Hodnota SCC je stejná pro celý svět, protože změna klimatu nemá hranice a je potřeba ji řešit globálně. Bez dalšího kontextu (například vyjádřením poměru očekávaných škod vůči HDP daného státu) to však může odvracet pozornost od skutečnosti, že např. v regionech Afriky nebo jihovýchodní Asie budou dopady vyšší než v Evropě.

## Závěr

Mnohé z nákladů za vypouštění emisí skleníkových plynů lze pociťovat již dnes: cena elektřiny z uhlí a zemního plynu je vyšší i kvůli platbám za [emisní povolenky](https://faktaoklimatu.cz/explainery/emisni-povolenky-ets), v EU se bude od roku 2028 zavádět [další systém emisních povolenek](https://faktaoklimatu.cz/explainery/emisni-povolenky-ets-2), který zvýší ceny pohonných hmot, zemního plynu a uhlí. Cena stávajících evropských emisních povolenek se v roce 2025 pohybovala okolo 70–80 € za tunu CO<sub>2</sub> (cca 80–90 $).

Na druhou stranu, společenské náklady uhlíku jsou i současnými neúplnými modely odhadované na 260 $ za tunu CO<sub>2</sub>, tedy částku **několikanásobně vyšší, než je dnešní cena povolenek**, kterou znečišťovatelé musí platit. Tato výrazně vyšší škoda se však projeví zejména v budoucnu a zpravidla také dopadne na jiné osoby než ty, které dnes spalují fosilní paliva. Zejména proto je dnes tak složité přijímat, zavádět a dobře vysvětlovat dekarbonizační opatření. Z pohledu analýzy nákladů a přínosů se však taková opatření jednoznačně vyplatí. IPCC v Šesté hodnotící zprávě odhaduje, že do roku 2030 je možné snížit světové emise v porovnání s rokem 2019 o polovinu s náklady nižšími než 100 $ za tunu CO<sub>2</sub> (viz Souhrnnou zprávu Šesté hodnotící zprávy IPCC, s. [102–103](https://www.ipcc.ch/report/ar6/syr/downloads/report/IPCC_AR6_SYR_FullVolume.pdf)). **Cena za velkou část dekarbonizace je tak nižší než budoucí náklady neřešené změny klimatu.**

## Poznámky

[^otepleni-ipcc]: Podle Šesté hodnotící zprávy Mezivládního panelu OSN pro změnu klimatu každých 1000 Gt CO<sub>2</sub> způsobí oteplení o přibližně 0,45 °C (*[Summary for Policymakers](https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_SPM.pdf)*, s. 28).

[^scc-definice]: Přesnější by tedy bylo označení společenské náklady oxidu uhličitého, které se však v praxi nepoužívá, pouze ve zkrácené podobě SC-CO<sub>2</sub>; podobně lze definovat a kvantifikovat také společenské náklady metanu a oxidu dusného.

[^epa-zdroje]: Model EPA do velké míry vychází z modelu společenských nákladů uhlíku publikovaném ve vědeckém časopise *Nature* v roce 2021 (Rennert et al., 2022). Kompletní zdrojový kód modelu je k dispozici na [GitHubu](https://github.com/USEPA/scghg). Zároveň je k dispozici i [zpráva](https://www.epa.gov/system/files/documents/2023-12/epa_scghg_2023_report_final.pdf), která popisuje poslední aktualizaci z roku 2023. S nástupem druhé administrativy Donalda Trumpa došlo k zastavení využívání SCC ke tvorbě politik – viz výkonné nařízení č. [14154](https://www.federalregister.gov/d/2025-01956/p-44).

[^epa-diskontni-mira]: Technické upřesnění: Při 2% diskontní míře udává EPA hodnotu společenských nákladů uhlíku ve výši 190 $/t CO<sub>2</sub> pro rok 2020 a 230 $/t CO<sub>2</sub> pro rok 2030, vyjádřeno v dolarech roku 2020 (tabulka s hodnotami pro různé diskontní míry je k dispozici ve [zprávě EPA](https://www.epa.gov/system/files/documents/2023-12/epa_scghg_2023_report_final.pdf) na s. 4). Společenské náklady se zvyšují lineárně, pro rok 2025 jsou společenské náklady uhlíku 210 $ v cenách roku 2020, po přepočtu do současných cen roku 2025 tedy 261 $/t CO<sub>2</sub> (kumulativní dolarová inflace byla v letech 2020–2025 více než 20 %).

[^scc-kc]: Emise na osobu v Česku (t CO<sub>2</sub>eq) × SCC × kurz CZK/USD, tedy ~10 × 261 × 21 = 52 400 Kč.

[^epa-limity]: Toto je zcela zásadní neúplnost modelu a je důležité, aby budoucí odhady zahrnovaly i tyto další projevy změny klimatu. Například extrémní srážky a rozsáhlé povodně způsobily jen v posledních letech v Evropě vysoké škody – podle [Evropské agentury pro životní prostředí](https://www.eea.europa.eu/en/analysis/publications/european-climate-risk-assessment) (2024) povodně v Německu a Belgii v roce 2021 zavinily škodu ve výši 44 miliard € a 200 mrtvých, povodně ve Slovinsku v roce 2023 způsobily škodu 10 miliard €, tedy přibližně 16 % slovinského HDP. Ačkoliv u vzniku povodní hrají roli i jiné faktory než změna klimatu, je pravděpodobné, že nárůst extrémních srážek [navyšuje](https://faktaoklimatu.cz/explainery/vliv-klimatu-na-extremy-prirucka#povodn%C4%9B) i četnost a intenzitu povodní.

[^epa-modely]: Konkrétně jde o modely DSCIM a GIVE (viz [zprávu EPA](https://www.epa.gov/system/files/documents/2023-12/epa_scghg_2023_report_final.pdf), s. 2).

[^statisticky-zivot]: Dopady na lidské zdraví jsou založené na odhadu, jak změna klimatu ovlivní úmrtnost v jednotlivých regionech. Dodatečná úmrtí jsou převedena na peněžní hodnotu pomocí tzv. hodnoty statistického života ([value of a statistical life, VSL](https://en.wikipedia.org/wiki/Value_of_a_statistical_life)). Základní hodnota pro USA je v jiných regionech (nebo v budoucích společnostech) upravena dle jejich blahobytu ve srovnání s USA, tedy podle HDP na osobu.

[^epa-oblasti]: Přehled oblastí, které model zahrnuje a nezahrnuje, nabízí tabulka 3.2.1 na s. 87 ve [zprávě EPA](https://www.epa.gov/system/files/documents/2023-12/epa_scghg_2023_report_final.pdf).

[^dopady-hdp]: Dopady na HDP v jednotlivých zemích zobrazuje např. [dashboard](https://climatedata.imf.org/pages/ngfs/#ngfs7) Mezinárodního měnového fondu.