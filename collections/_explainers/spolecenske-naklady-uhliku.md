---
layout:      explainer
title:       "Kolik stojí vypouštění emisí skleníkových plynů?"
slug:        "spolecenske-naklady-uhliku"
published:   2026-01-21
authors:
  - ids: ["tom-protivinsky", "katerina-kolouchova"]
  - id: "marcel-otruba"
    minor-role: "vizualizace"
weight:      76
tags-scopes: [ svet ]
tags-topics: [ emise, opatreni, ekonomika ]
cover-source-author:        "Artem Zhukov"
cover-source-text:          "Unsplash"
cover-source-license:       "Unsplash License"
cover-source-license-url:   "https://unsplash.com/license"
cover-source-url:           "https://unsplash.com/photos/cars-on-road-in-between-trees-during-daytime-5HGOyBMlvww"
perex: |
    Snižování emisí skleníkových plynů není jednoduché, protože fosilní paliva jsou stále široce využívána napříč celým hospodářstvím. Nízkoemisní opatření znamenají kromě jiného náklady. Avšak vypouštění skleníkových plynů má také svoji cenu, jen mnohem více skrytou. Tato cena, jejíž výše odráží škody, které způsobí vypuštění jedné tuny oxidu uhličitého, se označuje jako společenské náklady uhlíku.
---
**Každá vypuštěná tuna skleníkových plynů přispívá ke změně klimatu,** a tím zvyšuje budoucí negativní dopady na společnost, ekonomiku i ekosystémy. Tyto dopady se projevují jak prostřednictvím krátkodobých jevů, jako jsou extrémní projevy počasí, tak dlouhodobých změn, například poklesu zemědělských výnosů v důsledku sucha nebo posunu vegetačních pásem.

Na místě je tak otázka, jak velké jsou budoucí škody způsobené každou další dnes vypuštěnou tunou skleníkových plynů v porovnání s náklady, které je potřeba zaplatit, aby tyto skleníkové plyny nebyly vůbec vypuštěny.

Velikost budoucích škod, které jsou způsobené každou další dnes vypuštěnou tunou oxidu uhličitého, se označují jako **společenské náklady uhlíku** (*Social Cost of Carbon*, SCC) a zpravidla se vyjadřují v dolarech na tunu CO<sub>2</sub>.[^1] Společenské náklady uhlíku rovněž označují, jak velkého přínosu dosáhneme (kolik peněz ušetříme), pokud dnes vypuštění dodatečné tuny CO<sub>2</sub> zabráníme. Výše tohoto přínosu je totiž shodná s výší škody, ke které by došlo v opačném případě.

Hodnota společenských nákladů uhlíku je užitečná pro analýzu přínosů a nákladů při politickém rozhodování a pro posouzení přiměřenosti jednotlivých dekarbonizačních opatření. Porovnáváme přitom náklady na jejich realizaci s odhadovaným přínosem, tedy výší škod, které zabráníme, když zvažované opatření přijmeme. Pokud jsou přínosy opatření vyšší než jejich cena, lze říct, že se toto opatření finančně vyplatí.


## Co ovlivňuje výši společenských nákladů uhlíku?

Hodnota SCC je výsledkem modelování s mnoha vstupy. Konečnou výši přitom ovlivňují především:

* **klimatické dopady a škody** zahrnuté do modelu  a jejich ekonomický dopad a
* **diskontní míra**, která vyjadřuje, jakou hodnotu dnes přikládáme budoucnosti.

### Klimatické dopady a škody

SCC v závislosti na použitém modelu může zahrnovat například škody plynoucí ze:

* ztrát na majetku a infrastruktuře v důsledku extrémních jevů (např. povodní nebo požárů),
* dopadů na lidské zdraví (např. úmrtnost a nemocnost spojená s vlnami veder),
* změn zemědělské produkce a dostupnosti vody,
* ztráty ekosystémových služeb a biodiverzity,
* snížení ekonomické produktivity.

Vliv dopadů a škod na výši SCC závisí především na tom, jaké typy škod jsou v modelu zahrnuty, jaká peněžní hodnota je jim přiřazena a jaký tvar má použitá ***funkce škod***. Ta vyjadřuje **vztah mezi změnou klimatu**, respektive nárůstem globální průměrné teploty, **a výší ekonomických ztrát**. Její tvar říká, s jakou intenzitou škody narůstají.

{% include figure.html
    name="krivka-skod.png"
    class="narrow-figure"
    alt="TODO"
    caption="Křivka škod jako vztah mezi oteplením a ekonomickými škodami."
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/"
%}

### Diskontní míra

Budoucí klimatické škody vznikají často až za desítky let, zatímco náklady na jejich omezení existují již dnes. Aby bylo možné tyto dvě veličiny porovnat (a vyhodnotit, zda se investice do dekarbonizačního opatření vyplatí), používá se diskontní míra, která **určuje, jakou hodnotu připisujeme budoucím škodám dnes**. Jinými slovy, vyjadřuje míru urgence pro investice do klimatických opatření.

Současnou hodnotu budoucí škody lze vypočítat podle následujícího vzorce:

{:.equation}
$$
\text{Současná hodnota škody} = \frac{\text{Budoucí hodnota škody}}{(1+r)^t}
$$

kde *r* = diskontní míra, *t* = počet let, za kolik škoda nastane.

Čím je diskontní míra nižší, tím vyšší váhu budoucí škodě přisuzujeme a naopak.

Graf níže ukazuje, jak se současná hodnota budoucí škody proměňuje v závislosti na zvolené diskontní míře a počtu let, za kolik škoda nastane – čím později, tím je její hodnota dnes nižší. Například při 2% diskotntní míře odpovídá škodě ve výši 100 $, která nastane za 35 let, současná hodnota 50 $. Pokud by stejná škoda nastala až za 70 let, byla by její současná hodnota jen 25 $. Zjednodušeně řečeno, model tedy škodám dopadajícím na děti současné generace přiřazuje zhruba poloviční váhu (55 % při uvažované délce generace 30 let) a škodám dopadajícím na její vnuky méně než třetinovou váhu (30 %).

{% include figure.html
    name="diskontni-mira.svg"
    class="narrow-figure"
    alt="TODO"
    caption="Diskontní míra a její vliv na hodnotu budoucí škody dnes."
    source-text="Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/"
%}

Diskontní míru lze chápat i jako úročení nad rámec inflace: současná hodnota budoucích škod je daná tím, jak velkou částku by bylo nezbytné dnes investovat, aby při 2% úročení byla v budoucnu rovna hodnotě škod.

{% include preview-box.html
    title="Sternova zpráva"
    text="Jedna z nejznámějších analýz ekonomických dopadů změny klimatu."
    slug="2006-sternova-zprava"
%}

Ideální výše diskontní míry je předmětem akademických diskuzí a v praxi se lze setkat s různými hodnotami:

* **Nízká diskontní míra**. Předpokladá, že budoucí generace mají skoro stejnou váhu jako dnešní. Například [Sternova zpráva](https://faktaoklimatu.cz/studie/2006-sternova-zprava) používá míru 1,4 %. Motivuje k rychlejší klimatické akci, protože častěji platí, že dnešní hodnota budoucí škody je vyšší než náklad na dekarbonizační opatření.
* **Vysoká diskontní míra**. Odráží preferenci současnosti před budoucností a předpoklad, že společnost bude bohatší, a tedy škoda pro ně bude představovat relativně menší újmu z pohledu jejich blahobytu. Zastáncem vyšší diskontní míry (kolem 4 %) je například William Nordhaus. Může ale oddalovat investice do dekarbonizačních opatření, protože to činí dnešní hodnotu budoucí škody nižší než náklad na dekarbonizační opatření.

## Příklad: společenské náklady uhlíku dle Agentury pro ochranu životního prostředí USA

Model Agentury pro ochranu životního prostředí USA (*Environmental Protection Agency*, EPA) je vhodným příkladem výpočtu SCC, protože je dobře popsaný (včetně jeho limitů) a do nástupu druhé administrativy Donalda Trumpa byl prakticky využíván pro rozhodování o investic do dekarbonizačních opatření.[^2] [^3]

### Jak velké škody způsobí dnes vypuštěná tuna oxidu uhličitého?

Podle modelu EPA **způsobí tuna CO<sub>2</sub> vypuštěná v roce 2025 škodu ve výši přibližně 260 dolarů**.[^4] Model však zahrnuje pouze některé z očekávaných dopadů změny klimatu (viz níže), což tyto odhady činí relativně konzervativními.

Jinými slovy, tato hodnota společenských nákladů uhlíku znamená, že **v Česku** způsobí vypouštění emisí skleníkových plynů škody ve výši přibližně **52 400 korun ročně na osobu**.[^5]

{% capture hdp %}

Globální dopady změny klimatu lze vyjádřit také jako škody v poměru k celosvětovému HDP pro určitý rok v porovnání s HDP ve světě bez změny klimatu.

**Strukturální modely** (sektorální modely použité v odhadu EPA) vychází z popisu mechanismů, jak oteplení ovlivňuje jednotlivé sektory (např. zemědělství, zdraví, energetiku), a tyto dílčí dopady následně agregují do celkového dopadu na ekonomiku. Ty pro rok 2100 odhadují na škody v hodnotě **méně než 3 % HDP při oteplení o 2 °C** a přibližně 5 % HDP při oteplení o 4 °C v porovnání s hypotetickým scénářem bez změny klimatu.

Oproti tomu **statistické modely** odvozují dopady z historických dat – sledují, jak se ekonomická aktivita měnila v letech s odlišnými teplotami a srážkami, a na základě toho vyjadřují, jaké dopady lze očekávat v budoucnu. Pro rok 2100 udávají škody ve výši **více než 10 % HDP při oteplení o 2 °C** a až 20–30 % HDP při oteplení o 4 °C. Takové modely se dosud k odhadům společenských nákladů uhlíku nepoužívají, ačkoliv by vedly k násobně vyšším odhadům nákladů. Zde uváděný odhad společenských nákladů uhlíku 260 $/t CO<sub>2 </sub>podle EPA je vhodné považovat za velice konzervativní, který představuje pouze spodní hranici budoucích ekonomických škod.

Srovnání výsledků jednotlivých modelů nabízí například Šestá hodnotící zpráva IPCC, WG II, str. [2497](https://www.ipcc.ch/report/ar6/wg2/downloads/report/IPCC_AR6_WGII_Chapter16.pdf).

{% endcapture %}

{% include expander-figure.html
    name="hdp"
    expanded=false
    class="contrast-figure"
    label="Kontext: Dopady změny klimatu jako poměr k HDP"
    content=hdp
%}

{% capture opatreni %}

Mnohé z nákladů na snižování emisí skleníkových plynů lze pociťovat již dnes: cena elektřiny z uhlí a zemního plynu je vyšší kvůli platbám za [emisní povolenky](https://faktaoklimatu.cz/explainery/emisni-povolenky-ets), v EU se bude od roku 2028 zavádět [další systém emisních povolenek](https://faktaoklimatu.cz/explainery/emisni-povolenky-ets-2), který mírně zvýší ceny pohonných hmot, zemního plynu a uhlí. Cena stávajících evropských emisních povolenek se v roce 2025 pohybovala okolo 70–80 eur za tunu CO<sub>2</sub> (cca 80–90 $).

Společenské náklady uhlíku jsou i současnými neúplnými modely odhadované na 260 dolarů za tunu CO<sub>2</sub>, tedy částku několikanásobně vyšší, než je dnešní cena povolenek, kterou znečišťovatelé musí platit. Tato výrazně vyšší škoda se však projeví zejména v budoucnu a zpravidla také dopadne na jiné osoby, než ty, které dnes spaluje fosilní paliva. Zejména proto je dnes tak složité přijímat, zavádět a dobře vysvětlovat dekarbonizační opatření. Z pohledu analýzy nákladů a přínosů se však taková opatření jednoznačně vyplatí. IPCC v Šesté hodnotící zprávě odhaduje, že do roku 2030 je možné snížit světové emise v porovnání s rokem 2019 o polovinu s náklady nižšími než 100 dolarů za tunu CO<sub>2</sub> (viz Souhrnná zpráva Šesté hodnotící zprávy IPCC, str. [102–103](https://www.ipcc.ch/report/ar6/syr/downloads/report/IPCC_AR6_SYR_FullVolume.pdf)). Cena za dekarbonizaci je tak nižší než budoucí náklady neřešené změny klimatu.

{% endcapture %}

{% include expander-figure.html
    name="opatreni"
    expanded=false
    class="contrast-figure"
    label="Kontext: Jak vysoké jsou náklady na snižování emisí ve srovnání se společenskými náklady uhlíku?"
    content=opatreni
%}

### Jak model společenské náklady uhlíku počítá?

EPA společenské náklady uhlíku počítá na základě čtyř komponent:

**[jako schéma: 1 → 2 → 3 → 4]**

1. **Socioekonomický vývoj a emise:** zahrnuje predikce vývoje populace, ekonomického růstu a odpovídajících emisí skleníkových plynů.
2. **Klimatický model:** podle predikovaných budoucích emisí modeluje atmosférické koncentrace skleníkových plynů, průměrnou teplotu a vzestup mořské hladiny.
3. **Model dopadů a škod:** socioekonomické projekce a výstupy z klimatického modelu vstupují do funkce škod (viz výše), která na jejich základě odhaduje budoucí škody převedené na peněžní hodnotu.
4. **Diskontování:** výsledný odhad společenských nákladů uhlíku závisí do velké míry na tom, jakou hodnotu přikládáme budoucnosti. Tu určuje diskontní míra (viz výše) a střední hodnota, se kterou model pracuje, jsou 2 %.

{% capture nejistota %}

Výsledný odhad SCC je daný tzv. Monte Carlo simulací, která umožňuje modelovat nejistotu v parametrech jednotlivých komponent prostřednictvím simulace mnoha různých scénářů zároveň. Výstupem modelu je pak celé pravděpodobnostní rozložení společenských nákladů uhlíku. Výsledné hodnoty SCC jsou průměrem ze všech modelovaných scénářů.

Například dle [studie](https://www.nature.com/articles/s41586-022-05224-9) Renner et al. (2022) s nižší diskontní mírou roste nejistota výše SCC. V základním scénáři s 2% diskontní mírou je 5. percentil odhadu 44 $, průměr 185 $ a 95. percentil 413 $ na tunu CO<sub>2</sub>.

{% include figure.html
    name="nejistota.png"
    class="narrow-figure"
    alt="TODO"
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

Změna klimatu je pro posouzení dopadů **modelována pouze jako změna průměrné povrchové teploty a vzestup mořské hladiny**. Škody, které jsou způsobené jinými projevy klimatické změny – například extrémními projevy počasí (vlny veder, povodně), změnou srážek nebo acidifikací oceánů – v modelu vůbec nejsou zahrnuté.[^7]

Zahrnuté škody jsou v modelu EPA reprezentovány prostřednictvím **tří různých modelů dopadů a škod** a výsledný odhad společenských nákladů uhlíku odpovídá jejich průměru.
* První a druhý model odhadují škody v jednotlivých sektorech (jde o tzv. sektorální strukturální modely) na národní a regionální úrovni.[^8]
* Třetí model vychází z metaanalýzy odborných studií.

Sektorální modely zahrnují klimatické škody v následujících oblastech:
* Lidské zdraví – úmrtí v důsledku vysokých či nízkých teplot.
* Náklady na energie – výdaje na elektřinu a jiná paliva.
* Produktivita práce – snížená produktivita práce v důsledku vysokých teplot.
* Zemědělství – dopad na úrodu šesti nejrozšířenějších plodin.
* Pobřežní oblasti – náklady způsobené záplavami pobřežních oblastí, poškozením infrastruktury, související migrací a potřebou adaptačních opatření.

Z těchto pěti oblastí je více než polovina společenských nákladů způsobena dopadem na lidské zdraví, následně také dopady na zemědělství a produktivitu práce. Náklady na energie se příliš nezvýší, neboť zároveň dojde k úsporám v zimních měsících. Škody v pobřežních oblastech jsou poměrně nízké, protože model předpokládá optimální adaptaci daných oblastí na dopady změny klimatu.

Model nezahrnuje celou řadu dalších očekávaných škod – například náklady související se zajištěním pitné vody, úbytkem biodiverzity, změnami v ekosystémových službách, v lesnictví a chovu dobytka, dopady na lidské zdraví v důsledku rozšíření infekčních chorob, dopady acidifikace oceánů nebo v důsledku bodů zlomu.[^9]

### Je americký model relevantní i pro Česko a Evropu?

EPA modeluje globální škody bez ohledu na to, zda-li se projeví v USA nebo kdekoli jinde na světě. Existují jiné odborné studie, které modelují společenské náklady uhlíku pro jednotlivé země – odhady pro jednotlivé země jsou vždy výrazně nižší než globální odhad, protože globální škody jsou dané agregací (tedy součtem) škod přes všechny jednotlivé země.[^10]

Pokud by jednotlivé země braly při rozhodování o implementaci klimatických opatření v úvahu pouze společenské náklady uhlíku pro ně samotné, pak by nedošlo k přijetí prakticky žádných klimatických opatření. Na druhou stranu jednotná hodnota pro celý svět maskuje nerovnost dopadů změny klimatu, které jsou v každém regionu jiné. Mezinárodní spolupráce je pro vyřešení klimatické změny klíčová a některé vědecké studie zdůrazňují reciprocitu při zavádění mitigačních opatření – akce jedné země může motivovat k přijímání opatření jiné státy.

## Limity konceptu

Koncept společenských nákladů uhlíku je v mnoha ohledech užitečný, protože umožňuje vyčíslovat škody a srovnávat je s náklady na dekarbonizační opatření, což podporuje tvorbu politik založenou na analytických podkladech. Jak už bylo naznačeno výše, má ale i své limity::

* **Modely nezahrnují všechny škody**, které mohou v souvislosti s postupující změnou klimatu nastat (viz model EPA výše). Výše SCC tak může být výrazně podhodnocená.
* **Řada budoucích dopadů je zatížena nejistotou** – např. v sociekonomickém vývoji, schopnosti adaptace nebo četnosti a intenzitě extrémních jevů počasí.
* **Hodnotu SCC ovlivňuje nastavení parametrů**, především diskontní míry nebo také tvar funkce škod a předpoklady o budoucím ekonomickém růstu. Různé volby parametrů mohou měnit výsledek i několikanásobně.
* **Hodnota SCC je stejná pro celý svět**. Ačkoliv změna klimatu nemá hranice a je potřeba ji řešit globálně, použití jedné hodnoty pro celý svět může zastírat různou míru dopadů v jednotlivých částech světa a odvracet tak pozornost od toho, že např. v regionech Afriky nebo jihovýchodní Asie budou dopady vyšší než v Evropě.

## Zdroje a poznámky

[^1]:
     Přesnější by tedy bylo označení společenské náklady oxidu uhličitého, které se však v praxi nepoužívá, pouze ve zkrácené podobě SC-CO2; podobně lze definovat a kvantifikovat také společenské náklady metanu a oxidu dusného.

[^2]:
     Model EPA do velké míry vychází z modelu společenských nákladů uhlíku publikovaném ve vědeckém časopise Nature v roce 2021 (Rennert et al., 2022). Kompletní zdrojový kód modelu je k dispozici na [GitHubu](https://github.com/USEPA/scghg). Zároveň je k dispozici i [zpráva](https://www.epa.gov/system/files/documents/2023-12/epa_scghg_2023_report_final.pdf), která popisuje poslední aktualizaci z roku 2023.

[^3]:
     S nástupem druhé administrativy Donalda Trumpa došlo k zastavení využívání SCC ke tvorbě politik. Výkonné nařízení č. [14154](https://www.federalregister.gov/d/2025-01956/p-44) SCC mj. uvádí: *„The calculation of the “social cost of carbon” is marked by logical deficiencies, a poor basis in empirical science, politicization, and the absence of a foundation in legislation.“*

[^4]:
     Technické upřesnění: Při 2% diskontní míře udává EPA hodnotu společenských nákladů uhlíku ve výši 190 $/t CO<sub>2</sub> pro rok 2020 a 230 $/t CO<sub>2</sub> pro rok 2030, vyjádřeno v dolarech roku 2020 (tabulka s hodnotami pro různé diskontní míry je k dispozici ve [zprávě EPA](https://www.epa.gov/system/files/documents/2023-12/epa_scghg_2023_report_final.pdf) na str. 4). Společenské náklady se zvyšují lineárně, pro rok 2025 jsou společenské náklady uhlíku 210 $ v cenách roku 2020, po přepočtu do současných cen roku 2025 tedy 261 $/t CO<sub>2</sub> (kumulativní dolarová inflace byla v letech 2020–2025 více než 20 %).

[^5]:
     Emise na osobu v Česku (t CO<sub>2</sub>eq) × SCC × kurz CZK/USD, tedy ~10 × 261 × 21 = 52 400 korun.

[^7]:
     Toto je zcela zásadní neúplnost modelu a je důležité, aby budoucí odhady zahrnovaly i tyto další projevy změny klimatu. Například extrémní srážky a rozsáhlé povodně způsobily jen v posledních letech v Evropě vysoké škody – podle [Evropské agentury pro životní prostředí](https://www.eea.europa.eu/en/analysis/publications/european-climate-risk-assessment) (2024) povodně v Německu a Belgii v roce 2021 zavinily škodu ve výši 44 miliard eur a 200 mrtvých, povodně ve Slovinsku v roce 2023 způsobily škodu 10 miliard eur, tedy přibližně 16 % slovinského HDP. Ačkoliv u vzniku povodní hrají roli i jiné faktory než změna klimatu, je pravděpodobné, že nárůst extrémních srážek [navyšuje](https://faktaoklimatu.cz/explainery/vliv-klimatu-na-extremy-prirucka#povodn%C4%9B) i četnost a intenzitu povodní.

[^8]:

     Konkrétně jde o modely DSCIM a GIVE (viz [zpráva EPA](https://www.epa.gov/system/files/documents/2023-12/epa_scghg_2023_report_final.pdf), str. 2).

[^9]:
     Přehled oblastí, které model zahrnuje a nezahrnuje nabízí tabulka 3.2.1 na str. 87 ve [zprávě EPA](https://www.epa.gov/system/files/documents/2023-12/epa_scghg_2023_report_final.pdf).

[^10]:
     Dopady na HDP v jednotlivých zemích zobrazuje [dashboard](https://climatedata.imf.org/pages/ngfs/#ngfs7) Mezinárodního měnového fondu.
