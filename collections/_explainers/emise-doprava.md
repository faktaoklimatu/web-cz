---
layout:      explainer
title:       "Jak se na emisích skleníkových plynů podílí osobní doprava?"
slug:        "emise-doprava"
published:   2024-01-23
authors:
  - name: "Zbyněk Štajer"
  - id: "jirka-lnenicka"
    minor-role: "editace"
  - id: "kristi-psorn-zakopcanova"
    minor-role: "vizualizace dat"
weight:      74
tags-scopes: [ cr, eu ]
tags-topics: [ emise, energetika ]
cover-source-author:      "aled7"
cover-source-text:        "Pixabay"
cover-source-license:     "Pixabay License"
cover-source-license-url: "https://pixabay.com/service/license-summary/"
cover-source-url:         "https://pixabay.com/photos/traffic-road-vehicles-cars-urban-4522805/"
perex:      "Bez kvalitní a spolehlivé dopravy se moderní společnost neobejde: umožňuje dostupnost služeb, rozvoj podnikání a obchodu, podporuje sociální aspekty života a mnoho dalšího. Zároveň z dopravy pochází přibližně čtvrtina světových emisí skleníkových plynů. Kde tyto emise vznikají a jak je minimalizovat, aniž bychom přišli o výhody, které nám doprava přináší?"
---

Pro téměř polovinu států světa platí, že největší podíl na emisích skleníkových plynů, které jsou spojeny s výrobou energie, má právě sektor dopravy. U zbývajících zemí je doprava na druhém či třetím místě.[^prvnimisto] V celosvětovém měřítku vzniká při přepravě osob a nákladu zhruba **čtvrtina emisí skleníkových plynů**.[^ctvrtina] Které typy dopravy jich produkují nejvíce a jaké jsou možnosti dalšího vývoje dopravního sektoru?

## Kontext: doprava v Evropě a ve světě

V globálním měřítku je necelá polovina (46 %) všech emisí z dopravy spojena s přepravou nákladu, zbytek (54 %) vzniká při přepravování osob.[^split] Tento text se zaměřuje především na **osobní dopravu a její emise**,[^osobni] a to zejména v evropském kontextu a s ohledem na specifika osobní dopravy v Česku. U osobní dopravy je vždy potřeba brát tyto regionální rozdíly v potaz – co platí pro jednu zemi, nemusí platit pro jinou.

Celkové emise z dopravy v EU v roce 2020 dosáhly 670 milionů tun CO<sub>2</sub>, což je srovnatelné s celkovými emisemi evropského průmyslu. Celkový výkon osobní dopravy byl v témže roce 8 750 miliard osobokilometrů.[^osobokilometr] Co se nicméně z těchto čísel vyčíst nedá, ale co je pro úvahy o transformaci osobní dopravy důležité: u kterých dopravních prostředků vzniká nejvíce emisí v poměru k výkonu nebo jakou roli hraje vzdálenost. Spíše než o celkových emisích z dopravy je totiž užitečnější uvažovat o výkonech a emisích jednotlivých druhů dopravy a také o různých vzdálenostech, na které se lidé dopravují.

{% include figure.html
    name="vykony-emise-evropa-des.svg"
    alt="Graf srovnávající podíl dopravních módů na přepravním výkonu a emisích v osobní dopravě v Evropě. Zatímco automobily a letadla zajišťují 72 % přepravního výkonu, produkují až 88 % emisí skleníkových plynů."
    source-text="OECD, ITF Transport Outlook 2023, zpracování Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/emise-doprava"
%}

Jak ukazuje graf výše, různé druhy osobní dopravy přispívají k celkovým emisím skleníkových plynů v různé míře. Nejvíce emisí (téměř 85 %) produkují automobily a letadla, přestože zajišťují pouze 72 % celkového přepravního výkonu – auta s 52 % výkonu mají 64% podíl na emisích, letadla s 20 % výkonu se na emisích podílejí z 24 %. Naproti tomu vlaky zajišťují 10 % výkonu, ale jsou s nimi spojena pouhá 2 % emisí v dopravě.

Poměr mezi množstvím emisí a přepravním výkonem se nazývá **emisní intenzita**. V osobní dopravě se emisní intenzita počítá v emisích na osobokilometr (oskm).[^osobokilometr] Znalost emisní intenzity umožňuje srovnat různé druhy dopravy a jejich vliv na životní prostředí. Následující tabulka obsahuje přehled emisní intenzity pro jednotlivé typy dopravních prostředků.

{:.table}
| Dopravní prostředek    | Výkon<br><span class="text-muted">(mld. oskm)</span> | Emise<br><span class="text-muted">(Mt CO<sub>2</sub>)</span> | Intenzita<br><span class="text-muted">(g CO<sub>2</sub>/oskm)</span> |
|------------------------|-------:|------:|-----:|
| Osobní automobily      | 4502,6 | 430,5 | 95,6 |
| Letadla                | 1760,1 | 159,7 | 90,7 |
| Autobusy               | 1187,4 | 67,4  | 56,8 |
| Osobní vlaky           | 796,8  | 10,4  | 13,1 |
| Nemotorizovaná vozidla | 364,4  | 0,0   | 0,0  |
| Jednostopá vozidla     | 135,0  | 6,0   | 44,5 |

Kromě emisní intenzity hraje u emisí z osobní dopravy významnou roli i **vzdálenost, na kterou se cestující dopravují**. Ne všechny dopravní prostředky jsou pro každou cestu stejně vhodné, proto je důležité v úvahách o různých typech dopravy délku trasy zohlednit. Osobní doprava může být:

1. **Mezinárodní a meziměstská** (cestování přes mezinárodní hranice nebo mezi většími městy uvnitř jednoho státu) – např. cesta z Ostravy do Prahy nebo z Berlína do Paříže
2. **Regionální** (vnitrostátní cesty mimo města) – např. cesta z Dukovan do Třebíče nebo z České Lípy do Mladé Boleslavi
3. **Městská a příměstská** (aktivita v městských oblastech) – např. cesta z Podolí do Libně nebo z Pohořelic do Brna

{% include figure.html
    name="sankey-vzdalenost-dopravni-prostredky-des.svg"
    name-mobile="sankey-vzdalenost-dopravni-prostredky-mob.svg"
    alt="Graf zobrazující, jakými prostředky lidé v Eropě cestují na různé vzdálenosti"
    source-text="OECD, ITF Transport Outlook 2023, zpracování Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/emise-doprava"
%}

Tento graf přehledně ukazuje, které druhy osobní dopravy se v Evropě využívají při cestování na různé vzdálenosti. Následující část textu přináší další podrobnosti a popisuje faktory, které ovlivňují volbu dopravního prostředku. Nastiňuje také změny, které by mohly pomoci snížit emise v dalších letech.

## Mezinárodní a meziměstská doprava

{% include figure.html
    name="vykony-emise-mezinarodni-des.svg"
    alt="Sloupcový graf zobrazující přepravní výkony a emise v mezinárodní a meziměstské dopravě. Nejvíce výkonu, 51 %, zajišťují letadla, zatímco produkují 63 % emisí skleníkových plynů"
    source-text="OECD, ITF Transport Outlook 2023, zpracování Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/emise-doprava"
%}

Mezinárodní a meziměstská osobní doprava se využívá hlavně **při pracovních cestách a pro turistické účely**. Na kratší trasy do vzdálenosti 500 kilometrů, jako je například cesta z Prahy do Brna, volí lidé nejčastěji osobní auto nebo vlak. Na středně dlouhých trasách mezi 500 a 3 000 kilometry (např. cesta z Prahy do Bruselu) převažuje využití automobilů. U vzdáleností nad 3 000 kilometrů (cesta z Prahy do New Yorku) se obvykle upřednostňuje letecká doprava, která je také často jedinou možnou volbou, zejména při překonávání oceánu.

### Jak by mohla vypadat budoucnost?

Emise z osobní dopravy na velké vzdálenosti je možné snížit například **změnou některých cestovních zvyklostí**, jako je výměna delších cest za kratší (třeba prostřednictvím podpory místní turistiky), ne vždy je také cestování nutné (některé služební cesty může nahradit videokonference). K další redukci emisí povede **přechod na elektromobily a využívání udržitelného paliva v letadlech**.[^letadla] Celkový objem emisí, zejména na kratších a středních trasách, může rovněž významně snížit **větší využívání vlaků**, které mají mnohem nižší emisní intenzitu než letecká a automobilová doprava.

## Regionální doprava

{% include figure.html
    name="vykony-emise-regionalni-des.svg"
    alt="Sloupcový graf zobrazující přepravní výkony a emise v regionální dopravě. Osobní automobily zajišťují 70 % přepravního výkonu a produkují 84 % emisí."
    source-text="OECD, ITF Transport Outlook 2023, zpracování Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/emise-doprava"
%}

**Převaha osobních automobilů** v regionální osobní dopravě je do značné míry způsobena jejich pohodlností a flexibilitou, což je obzvláště důležité v oblastech, kde je hromadná doprava omezená nebo neexistuje. Tento trend byl v minulosti ještě zesilován územním plánováním, které v řadě případů upřednostňovalo silniční sítě před infrastrukturou veřejné dopravy, takže používání automobilů není v mnoha případech pouze osobní preferencí, ale leckdy i nutností. Svou roli hraje také kulturní status spojený s vlastněním automobilu.[^kultura]

Hromadná doprava na regionální úrovni mnohdy není snadno dostupná a nejezdí dostatečně často a rychle na to, aby pokryla základní potřeby lidí, kteří musí někam cestovat kvůli zaměstnání, k lékaři, kvůli nákupu potravin či návštěvě svých blízkých.

### Jak by mohla vypadat budoucnost?

Protože v následujících dekádách bude pravděpodobně dál přibývat lidí žijících ve městech, poptávka po dopravě v regionech bude zřejmě časem opadat (v Evropě se očekává pokles až o 22 %[^pokles]), a i nadále se zde tedy bude hodně jezdit auty. Úbytek poptávky po regionální hromadné dopravě přinese otázku její finanční udržitelnosti. Rychlé nahrazení aut se spalovacími motory elektrickými vozy je ovšem v regionální osobní dopravě jen částečným řešením – výrazně sice pomůže její dekarbonizaci, nezvýší však dostupnost dopravy pro ty, kteří si takový vůz nebudou moci dovolit. Proto je nutné **přehodnotit koncepci regionální osobní dopravy jako celku** – například více podporovat sdílenou dopravu, přepravu "na objednávku" či tzv. *mobility huby*.[^huby]

## Městská a příměstská doprava

{% include figure.html
    name="vykony-emise-mestska-des.svg"
    alt="Sloupcový graf zobrazující přepravní výkony a emise v městské a příměstské dopravě"
    source-text="OECD, ITF Transport Outlook 2023, zpracování Fakta o klimatu"
    source-url="https://faktaoklimatu.cz/explainery/emise-doprava"
%}

I zde **převažuje využívání osobních automobilů** (produkujících přes 80 % emisí). Lidé dají přednost autu, jestliže pro ně hromadná doprava není atraktivní – není dostupná, bezpečná a spolehlivá nebo nejezdí dostatečně často. Také infrastruktura pro nemotorizované způsoby přepravy (chůze, jízda na kole) je v řadě měst nedostatečná, v Česku v některých případech dokonce prakticky neexistuje (např. síť cyklostezek v Brně).

Současné trendy, jako je rostoucí popularita práce na dálku a online nakupování, mění i způsoby, jak lidé městský prostor využívají. Tradiční uspořádání měst už dnes proto nemusí plně vyhovovat dopravním potřebám a v důsledku toho se mění i požadavky na městskou dopravní infrastrukturu – aby byla flexibilnější a lépe reagovala na nové způsoby využívání městského prostoru.

### Jak by mohla vypadat budoucnost?

S tím, jak lidí ve městech přibývá, nabývá na významu také **potřeba kvalitní městské a příměstské dopravy**. Zároveň lidé stále více žijí na předměstí daleko od centra, kde je mnohdy síť hromadné dopravy řídká, což vede k jejich větší závislosti na osobních automobilech.

Při dalším strategickém plánování proto bude důležité více myslet na udržitelnější způsoby osobní dopravy. Zejména plánovat a budovat infrastrukturu pro nemotorizovanou dopravu, protože ta je pro cesty do 10 km (v městském prostředí) zpravidla nejvýhodnější. A na delší cesty nabídnout místo osobního auta atraktivní alternativu – dostupnou a spolehlivou hromadnou dopravu.

Pouhá elektrifikace automobilové dopravy stačit nebude, protože emise skleníkových plynů nejsou jediný problém, který automobily ve městech způsobují. Zabírají také hodně místa, přinášejí další znečištění a snižují bezpečnost dopravního provozu pro ostatní – zejména pro chodce a cyklisty. **Méně aut ve městech** umožní lépe využívat veřejný prostor, lepší obslužnost hromadnou dopravou, povede k nižšímu znečištění a celkovému zlepšení kvality života a veřejného zdraví.

## Závěr

V osobní dopravě v Evropě i v Česku dnes lidé spoléhají především na auta. To je také důvod, proč emise skleníkových plynů z osobní dopravy každoročně rostou – nová auta jsou sice efektivnější a produkují méně CO<sub>2</sub> na kilometr, zároveň ale aut stále přibývá a míra jejich využití stoupá. Větší je i obliba aut typu SUV, která mají vyšší spotřebu, a tedy vytvářejí i více emisí.

Snížení celkových emisí v dopravě proto není jen technologický problém, jde také změnu některých vzorců chování, jež jsou dnes s osobní dopravou spojeny. Co jsou tedy hlavní změny, jež povedou ke snížení emisí skleníkových plynů z dopravy?

- **Změna způsobu dopravy** – spočívající v tom, že dopravní prostředek s vysokou emisní intenzitou je nahrazen tam, kde to jde. Zejména se jedná o větší využívání vlaků na střední a dlouhé vzdálenosti (místo aut a letadel), rozvoj hromadné dopravy na regionální a městské úrovni (místo aut) a podporu cestování na kole a pěšky na krátké vzdálenosti ve městech (opět místo aut).

- **Snižování emisní intenzity** u jednotlivých typů dopravních prostředků – nejde přitom pouze o výměnu aut se spalovacím motorem za elektromobily, ale také o využívání udržitelných paliv v letecké dopravě nebo pokračování v elektrifikaci vlakových tratí.

- **Vytváření příležitostí pro změnu chování** – navazuje na první bod – aby lidé preferovali méně emisně intenzivní dopravu, musí pro ně být atraktivnější. U hromadné dopravy to znamená zvyšovat její dostupnost a spolehlivost, v případě individuální dopravy (pěší, jízdní kolo, koloběžka aj.) budovat ve městech související infrastrukturu (cyklostezky, úschovny či garáže pro kola, chodníky apod.).

- **Snižování potřeby cestovat** – strategickým plánováním při budování měst a jejich revitalizaci se zaměřovat na snižování vzdáleností, které lidé potřebují urazit na nákup, za prací nebo s dětmi do školky. Kromě toho je možné také podporovat místní turistiku a práci na dálku. Svou roli (zejména v regionální dopravě) může sehrát i další digitalizace, která umožní například minimalizovat cesty na úřady a podobně.

## Zdroje a poznámky

[^prvnimisto]: [United Nations: Climate Change Factsheet](https://www.un.org/sites/un2.un.org/files/media_gstc/FACT_SHEET_Climate_Change.pdf)
[^ctvrtina]: [International Energy Agency: Global energy-related CO2 emissions by sector](https://www.iea.org/data-and-statistics/charts/global-energy-related-co2-emissions-by-sector)
[^osobni]: Toto zaměření textu souvisí s tím, že technologický pokrok v oblastech, jako jsou elektromobily a sdílená mobilita, rychle proměňuje právě osobní dopravu, a ke snižování emisí tak nabízí bezprostřednější a dostupnější příležitosti – ve srovnání s odvětvím nákladní dopravy, kde jsou technologické změny obecně pomalejší a složitější.
[^split]: [OECD: ITF Transport Outlook 2023](https://www.oecd-ilibrary.org/sites/b6cc9ad5-en/1/3/2/index.html?itemId=/content/publication/b6cc9ad5-en&_csp_=973044770350cae58fdc7934e9ee151a&itemIGO=oecd&itemContentType=book#section-d1e7667-adea820d82)
[^osobokilometr]: Osobokilometr je jednotka, pomocí které se měří osobní přepravní výkon – označuje jednu osobu přepravenou na vzdálenost jednoho kilometru. Jak si to představit: když sedím v autě sám a ujedu vzdálenost jednoho kilometru, je to jeden osobokilometr přepravního výkonu. Bude-li v autě čtyřčlenná rodina, pak jeden ujetý kilometr vzdálenosti znamená čtyři osobokilometry přepravního výkonu.
[^letadla]: [ICAO: Sustainable Aviation Fuel](https://www.icao.int/environmental-protection/pages/SAF.aspx)
[^kultura]: [Evropská komise: Mobility & Transport – Road Safety](https://road-safety.transport.ec.europa.eu/eu-road-safety-policy/priorities/safe-road-use/elderly-drivers/older-drivers/safety-versus-mobility-and-quality-life/importance-private-car_en)
[^pokles]: [OECD: ITF Transport Outlook 2023](https://www.oecd-ilibrary.org/sites/b6cc9ad5-en/1/3/3/index.html?itemId=/content/publication/b6cc9ad5-en&_csp_=973044770350cae58fdc7934e9ee151a&itemIGO=oecd&itemContentType=book#section-d1e1491-8f83291030)
[^huby]: Mobility hub je místo, kde se sdružují různé druhy dopravy: autobusy, vlaky, sdílená auta či kola. Tyto huby jsou navrženy tak, aby lidem usnadňovaly přestupování mezi různými druhy dopravy a tím podporovaly efektivní cestování.
