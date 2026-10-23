---
layout:        slides
type:          "Prezentace"
title:         "Co rozhoduje o prosperitě českého průmyslu?"
slug:          "prosperita-ceskeho-prumyslu"
published:     2026-10-12
authors:
  - id: "jakub-komarek"
preview_type:  "Prezentace"
preview_image: "/assets-local/figures/prosperita-ceskeho-prumyslu/nahled.png"
perex: |
  Zpracovatelský průmysl tvoří pětinu české ekonomiky, jeho obory ale stojí na velmi odlišných základech. Prezentace srovnává 18 oborů podle velikosti, vývoje výroby, nákladů, spotřeby energie a zahraničního obchodu. Ukazuje, že emisní povolenky jsou zásadní jen pro několik z nich – větším problémem celého průmyslu je pomalý růst produktivity.
extra-scripts:
- https://d3js.org/d3.v7.min.js
- /assets-local/charts/fok-theme.js
- /assets-local/charts/fok-utils.js
- /assets-local/js/prosperita-ceskeho-prumyslu.js
- /assets-local/js/chart-download.js
---

{% comment %}
Jedna snímka = jeden include, texty v Markdownu. Parametry popisují
web-core/_includes/slide.html, slide-section.html a slide-cover.html;
grafy (chart, panels) kreslí assets-local/js/prosperita-ceskeho-prumyslu.js.
{% endcomment %}

{% include slide-cover.html
  title="Co rozhoduje o prosperitě českého průmyslu?"
  subtitle="Průmysl není jeden: každý sektor stojí na jiných základech"
  byline="**Jakub Komárek,** Fakta o klimatu · říjen 2026"
%}

{% include slide-section.html
  letter="A"
  title="Průmysl není jeden"
  subtitle="Pět pohledů na různorodost oborů"
  tagline="Velikost · vývoj · náklady · energie · obchod"
%}

{% include slide.html
  title="Velikost: auta jsou pětina průmyslu"
  lead="**Auta** tvoří 21 % HPH průmyslu; hutě, papír a chemie dohromady 7 %"
  chart-title="Podíl oborů na HPH zpracovatelského průmyslu"
  chart-note="(2025)"
  chart="velikost"
  source="Zdroj: Eurostat nama_10_a64, nama_10_a64_e (2025, předběžně). Rafinerie vynechány."
  notes="
HPH 2025 (předběžně) a zaměstnanost 2025. Zpracovatelský průmysl tvoří 21 % HPH české ekonomiky (66 mld. €) a zaměstnává 1,33 mil. lidí. Podrobnější verze (tržby, zaměstnanost) v příloze.

Zdroje: [Eurostat nama_10_a64](https://ec.europa.eu/eurostat/databrowser/view/nama_10_a64/default/table?lang=en), [Eurostat nama_10_a64_e](https://ec.europa.eu/eurostat/databrowser/view/nama_10_a64_e/default/table?lang=en)
"
%}

{% include slide.html
  title="Vývoj: obory jdou opačnými směry"
  lead="**Auta a farmacie** rostou o desítky procent, **hutě** ztratily čtvrtinu výroby"
  chart-title="Změna objemu výroby"
  chart-note="(2015 → 2025)"
  chart="vyvoj"
  source="Potraviny a nábytek = vážený průměr podoborů (bez důvěrného tabáku), váhy = přidaná hodnota 2021; rafinerie důvěrné. Zdroj: Eurostat sts_inpr_a, sbs_ovw_act"
  notes="
Index průmyslové výroby 2015→2025. Průmysl celkem +18 %, většina růstu do 2018. Příspěvky oborů k růstu v příloze.

Zdroj: [Eurostat sts_inpr_a](https://ec.europa.eu/eurostat/databrowser/view/sts_inpr_a/default/table?lang=en)
"
%}

{% include slide.html
  title="Náklady: u někoho práce, u někoho energie"
  lead="**Chemie a hutě** platí hlavně za energii, **stroje a kovovýroba** za práci, **auta** za díly"
  chart-title="Co obory stojí: práce, nebo energie?"
  chart-note="(2024; velikost = HPH 2025; čáry = medián oborů)"
  chart="naklady"
  source="Celkové náklady = nákupy zboží a služeb + osobní náklady. Rafinerie vynechány. Zdroj: Eurostat sbs_ovw_act (2024), nama_10_a64"
  notes="
Podíl nákupů energie a osobních nákladů na celkových nákladech (nákupy zboží a služeb + osobní náklady), 2024. Čáry = medián 18 oborů a dělí obory do čtyř skupin.

Zdroj: [Eurostat sbs_ovw_act](https://ec.europa.eu/eurostat/databrowser/view/sbs_ovw_act/default/table?lang=en)
"
%}

{% include slide.html
  title="Energie: jiná paliva, jiné zranitelnosti"
  lead="**Hutě** jedou na koks, **papír** na biomasu, **cement a textil** na plyn, **auta a stroje** na elektřinu"
  chart-title="Energetická náročnost a hlavní zdroj energie"
  chart-note="(TJ na mil. € HPH, 2023, log. škála)"
  chart="energie"
  source="Hrubé užití energie vč. koksu do vysokých pecí a surovin pro chemii. Zdroj: Eurostat env_ac_pefasu (2023, poslední rok), nama_10_a64"
  notes="
PEFA – hrubé užití energie podle NACE, 2023 (poslední rok), vč. koksu do vysokých pecí a surovin pro chemii. Uhlí a koks nesou přímý náklad ETS; plyn nesl šok cen 2022–23; elektřina nese nepřímý náklad ETS; biomasa ETS nenese. Celá skladba energie v příloze.

Zdroj: [Eurostat env_ac_pefasu](https://ec.europa.eu/eurostat/databrowser/view/env_ac_pefasu/default/table?lang=en)
"
%}

{% include slide.html
  title="Kdo náklad nemůže přenést do cen"
  lead="**Hutě, chemie, papír**: energeticky náročné a z ~⅔ pokryté dovozem"
  chart-title="Energetická náročnost a dovozní konkurence"
  chart-note="(světle 2015, sytě 2024; velikost = HPH; prahy 10 TJ/mil. € a 50 %)"
  chart="expozice"
  source="Rafinerie a chemie sloučeny kvůli zlomu v řadě 2018; energie 2023. Zdroj: Eurostat FIGARO naio_10_fcp_ii2 a ii4, PEFA env_ac_pefa04, nama_10_a64"
  notes="
K grafu: Rafinerie a chemie sloučeny (C19 + C20): v národních účtech se v roce 2018 rafinace přesunula z C19 do C20 (zlom v řadě). Energie 2023 (2024 nezveřejněno). Zdroj: Eurostat FIGARO naio_10_fcp_ii2 (2015) a ii4 (2024), PEFA env_ac_pefa04, nama_10_a64

Osa x: dovozní penetrace (FIGARO 2015 a 2024), osa y: energetická náročnost (PEFA). Prahy 10 TJ/mil. € a 50 % dělí obory do čtyř kvadrantů; v pravém horním je nejtěžší promítnout náklady energie a ETS do cen. Rafinerie a chemie sloučeny kvůli zlomu v národních účtech 2018.

Zdroje: [Eurostat naio_10_fcp_ii4](https://ec.europa.eu/eurostat/databrowser/view/naio_10_fcp_ii4/default/table?lang=en), [Eurostat env_ac_pefa04](https://ec.europa.eu/eurostat/databrowser/view/env_ac_pefa04/default/table?lang=en)
"
%}

{% include slide.html
  title="Obchod: kdo čelí dovozu"
  lead="**Elektronika** čelí dovozu z celého světa, **cement a dřevo** jen sousedům"
  chart-title="Kolik domácí spotřeby pokrývá dovoz"
  chart-note="(dovozní penetrace 2024)"
  chart="obchod"
  source="Dovozní penetrace = dovoz / (produkce − vývoz + dovoz). \*CBAM jen část oboru (cement; hnojiva, vodík). Zdroj: Eurostat FIGARO naio_10_fcp_ii4 (2024)"
  notes="
Dovozní penetrace 2024 rozdělená na dovoz z EU a mimo EU. CBAM chrání proti dovozu jen ocel, cement, hnojiva, vodík, hliník a elektřinu. Vývozní stránka v příloze.

Zdroje: [Eurostat naio_10_fcp_ii4](https://ec.europa.eu/eurostat/databrowser/view/naio_10_fcp_ii4/default/table?lang=en), [nařízení (EU) 2023/956](https://eur-lex.europa.eu/eli/reg/2023/956/oj)
"
%}

{% include slide-section.html
  letter="B"
  title="Co na průmysl působí"
  subtitle="Energie a povolenky · práce · dovoz · ceny v EU"
  tagline="Každý faktor dopadá na jiné obory"
%}

{% include slide.html
  title="Hlavní náklad je energie, ne povolenka"
  chart-title="Náklady na energii a ETS ve všech odvětvích"
  chart-note="(% hrubé přidané hodnoty, 2024)"
  chart="naklady-ets"
  source="Nepřímé = elektřina × 0,85 t/MWh × 65 €/t (horní odhad); \*přímé = (emise − povolenky zdarma) × 65 €/t; — = bez zařízení v ETS; ¹ ² viz poznámky. Zdroj: Eurostat, EK Union Registry"
  notes="
K grafu: Nepřímé = spotřeba elektřiny 2023 × 0,85 t/MWh × 65 €/t (horní odhad, bez kompenzace). \*Přímé = (ověřené emise − bezplatné povolenky) × 65 €/t; procesní činnosti + 68 průmyslových spalovacích zdrojů; — = obor bez zařízení v ETS. ¹ Horní odhad vč. elektráren a kotelen podniků; bez nich −0,3 %. ² Nejlepší odhad: Energetika Třinec přičtena z 86,5 % (zbytek je teplo pro Třinec, ERÚ); rozpětí −5,2 až +2,1 %. Kompenzace nepřímých nákladů za rok 2024 (MPO) pokryla 24 % nepřímých nákladů hutí, 29 % u papíru a 16 % u chemie. C19 vynechána. Zdroje: Eurostat sbs_ovw_act, env_ac_pefasu, nama_10_a64; EK Union Registry; DEHSt; MPO.

Přímé čisté náklady 2024 = (ověřené emise − bezplatné povolenky) × 65 €/t, podle zařízení v registru EU ETS přiřazených k oborům (procesní činnosti + 68 průmyslových spalovacích zdrojů – všechny, které ETS dashboard FoK řadí k průmyslu). Chemie +7,1 % HPH (hlavně Unipetrol Petrochemie a Agrochemie, teplárna Kralupy pro Synthos), hutě +1,1 % (nejlepší odhad: Energetika Třinec přičtena z 86,5 %, zbytek je teplo pro Třinec podle ERÚ; rozpětí −5,2 až +2,1 %) – horní odhady zahrnují energetiky a elektrárny podniků (TAMEH, Energetika Třinec, elektrárny Unipetrolu), které část tepla a elektřiny prodávají do sítě a do dálkového vytápění. Bez nich (jen procesní zařízení) mají hutě přebytek (−5,2 % HPH) a chemie mírný přebytek (−0,3 %). Skutečná zátěž leží mezi oběma odhady; papír +0,6 %, stavební hmoty ≈ 0, potraviny +0,1 % (cukrovary, pivovary), dřevo −0,5 % (přebytek Kronospanu), auta +0,2 % (ŠKO-ENERGO, teplárna Škoda Auto; při započtení jen 78 % – zbytek je teplo pro Mladou Boleslav podle ERÚ – +0,1 %), dřevo −0,1 % (přebytek kotelen v Lukavci); výrobu sazí CS Cabot a kotelny Dřevozpracujícího družstva Lukavec, vedené v registru jako „jiná činnost“, jsme přiřadili ručně k chemii a ke dřevu; průmysl celkem +0,3 % HPH (horní odhad 0,31 %, nejlepší 0,28 %). Veřejné elektrárny a teplárny, včetně nezávislých tepláren zásobujících i průmysl (např. Teplárna Otrokovice), nezapočítáváme.

Zařízení v EU ETS mají i obory mimo oranžovou skupinu (potraviny a nápoje, pryž a plasty, dřevo, farmacie, auta, stroje, textil aj.); oranžově jsou jen obory s největšími emisemi a energetickou náročností. Jejich přímý čistý náklad je ale blízko nule (přebytky a deficity menších kotelen se vyrovnávají). Obory s pomlčkou nemají velká zařízení v ETS (menší kotelny pod 20 kt nejsou započteny).

Nepřímé náklady (ETS v ceně elektřiny) se týkají všech oborů: spotřeba elektřiny 2023 (PEFA) × 0,85 t CO₂/MWh (regionální faktor CZ-SK z pokynů ke státní podpoře) × 65 €/t. Je to horní odhad: předpokládá plné promítnutí do ceny a nezapočítává kompenzaci nepřímých nákladů ani vlastní výrobu elektřiny.

Kompenzace nepřímých nákladů: za náklady roku 2024 vyplatilo MPO v prosinci 2025 32 firmám 2,24 mld. Kč (≈ 89 mil. €; 13,6 % příjmů státu z aukcí povolenek), z toho hutě a slévárny 753 mil. Kč (Třinecké železárny 474 mil.), papír 719 mil., chemie vč. Unipetrolu RPA 669 mil., skelná vlákna 87 mil. ([MPO](https://mpo.gov.cz/cz/prumysl/prumysl-a-zivotni-prostredi/kompenzace-neprimych-nakladu/informace-o-vyplacenych-kompenzacich-neprimych-nakladu-za-kalendarni-rok-2024--291108/)). Pokrývá tak asi 24 % odhadovaného nepřímého nákladu hutí, 29 % papíru a 16 % chemie; po kompenzaci je nepřímý náklad hutí 8,1 % HPH místo 10,8 %, průmyslu celkem 1,8 % místo 1,9 %. U hutí je kompenzace (≈ 30 mil. €) vyšší než přímý náklad ETS (≈ 13 mil. €). Od 2026 platí pro ČR faktor 0,89 t/MWh (+5 %; dosud 0,85 pro region Česko-Slovensko) a kompenzace až 80 %; nově je způsobilá i organická chemie a část skla a keramiky ([pokyny EK C/2026/196](https://eur-lex.europa.eu/eli/C/2026/196/oj/eng)). Na náklady 2025 vyčlenila vláda 3,43 mld. Kč. C19 (rafinerie) vynechána kvůli velmi malé HPH.
"
%}

{% include slide.html
  title="Emisně náročné obory rostou pomaleji – v celé EU"
  lead="**Emisně náročné obory** (vpravo dole) rostou pomaleji – v celé EU, ale vazba je slabá"
  chart-title="Změna výroby 2015 → 2025 podle emisní náročnosti odvětví"
  chart-note="(ČR barevně; SK, DE, AT, PL, HU šedě)"
  chart="emisni"
  source="Emisní náročnost = emise / HPH, součty 2015–2019; C19 vynechána. Zdroj: Eurostat env_ac_ainah_r2, nama_10_a64, sts_inpr_a; ŠÚ SR pm0040ms"
  notes="
K grafu: Emisní náročnost = součet emisí 2015–2019 / součet HPH 2015–2019 (běžné ceny). Výroba = index průmyslové výroby; C19 vynechána. Zdroj: Eurostat env_ac_ainah_r2, nama_10_a64, sts_inpr_a; SK výroba: ŠÚ SR pm0040ms (skupiny oborů)

Každý bod je odvětví v jedné zemi (ČR barevně; Slovensko, Německo, Rakousko, Polsko a Maďarsko šedě jako srovnávací země). Slovensko publikuje index výroby jen za skupiny oborů (ŠÚ SR pm0040ms), proto má méně bodů. Osa x: emisní náročnost = součet emisí skleníkových plynů 2015–2019 / součet HPH 2015–2019 v běžných cenách (env_ac_ainah_r2, nama_10_a64); průměr za pět let tlumí výkyvy jednotlivých let a měří náročnost před a na začátku zdražení povolenek. Osa y: změna objemu výroby 2015→2025 (sts_inpr_a).

Odvětví s 10× vyšší emisní náročností rostla v průměru o 18 p. b. méně, korelace je ale jen −0,29 (102 bodů). Kontrola robustnosti: s náročností jen za rok 2018 vychází prakticky totéž (−18,2 p. b., korelace −0,29). Potraviny a nábytek mají index jako vážený průměr podoborů (váhy = přidaná hodnota 2021; tabák vynechán, v ČR je důvěrný). České potraviny vycházejí s náročností ~400 t CO₂e/mil. € (zpracování cukru, sušení – spalování plynu), tedy těsně nad prahem 300. Výpočet: R/04_intensity.R. Tento vztah nelze připsat jen ETS – stejná odvětví zasáhl i šok cen plynu a elektřiny v letech 2022–23.

Zdroj: [Eurostat env_ac_ainah_r2](https://ec.europa.eu/eurostat/databrowser/view/env_ac_ainah_r2/default/table?lang=en)
"
%}

{% include slide.html
  title="Elektřina: velký průmysl v Česku mezi nejdražšími"
  lead="**180 €/MWh** v ČR v roce 2025 (1. pol. 2026: 165 €) vs. 144 € v Polsku a 123 € v průměru EU"
  chart-title="Cena elektřiny pro průmysl"
  chart-note="(€/MWh bez DPH a vratných daní, odběr 70–150 GWh; 2025, 2019 a 1. pol. 2026)"
  chart="elektrina"
  source="Pásmo IF = 70–150 GWh ročně; 2019 a 2025 průměr pololetí, 2026 = 1. pololetí. Česká data z malého vzorku, viz poznámky. Zdroj: Eurostat nrg_pc_205"
  notes="
K grafu: Pásmo IF (70 000–149 999 MWh ročně, typický energeticky náročný podnik). 2019 a 2025 = průměr obou pololetí, 2026 = 1. pololetí (průměr EU27 zatím nezveřejněn). Data za ČR pocházejí ze šetření ČSÚ u 8 největších obchodníků; v pásmu IF je v Česku jen málo odběratelů, jednotlivé smlouvy proto mohou průměr výrazně ovlivnit. Zdroj: Eurostat nrg_pc_205

Průměrná cena elektřiny pro průmysl (pásmo IF, 70–150 GWh ročně – typický energeticky náročný podnik), bez DPH a vratných daní, průměr pololetí 2025, tečka = 2019. Rozdíly mezi státy EU dosahují desítek procent a mohou přesouvat elektricky náročnou výrobu. Pásmo IF (70–150 GWh) odpovídá typickému energeticky náročnému podniku; v Česku v něm firmy v roce 2025 platily víc (180 €/MWh) než menší odběratelé v pásmu ID 2–20 GWh (165 €/MWh) a v 1. pololetí 2026 také (165 vs. 146 €/MWh); v roce 2019 to bylo naopak (71 vs. 74 €/MWh). Ve srovnávaných zemích platí velcí odběratelé méně. V 1. pololetí 2026 cena v Česku klesla na 165 €/MWh a Maďarsko (167 €) je těsně před Českem.

Pozor: česká data pocházejí ze [šetření ČSÚ u 8 největších obchodníků](https://ec.europa.eu/eurostat/cache/metadata/EN/nrg_pc_204_sims_cz.htm) a v pásmu IF je v Česku jen málo odběratelů, takže průměr mohou ovlivnit jednotlivé smlouvy. Rozklad ceny od Eurostatu (nrg_pc_205_c) přisuzuje rozdíl síťovým poplatkům (58,5 vs. 38,5 €/MWh), ty však oficiálním tarifům ERÚ neodpovídají: podle [cenového rozhodnutí 11/2024](https://euroenergie.cz/CenovaRozhodnutiERU/2025/ERU-CR_2024_11.pdf) platí podnik na VN při 5 000–7 000 h využití 27–33 €/MWh a tarif nezávisí na velikosti odběru. Rozdíl proto pravděpodobně vzniká v ceně silové elektřiny ve smlouvách této malé skupiny odběratelů.

Pro srovnání podle tarifů regulátorů (profil 24 GWh, VN, 2025): Česko 26–29 €/MWh, Rakousko (Vídeň) 25, Slovensko (ZSD) 33, Německo 40 (bez slev §19 StromNEV), Maďarsko 42 €/MWh. Pokles v 1. pololetí 2026 odpovídá [převzetí POZE státem od 1. 1. 2026](https://ct24.ceskatelevize.cz/clanek/domaci/platby-za-obnovitelne-zdroje-se-zcela-presunou-na-stat-368357).

Zdroj: [Eurostat nrg_pc_205](https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_205/default/table?lang=en)
"
%}

{% include slide.html
  title="Větší problém než ETS: pomalý růst produktivity"
  lead="**Produktivita jen +28 % za 10 let** (≈ 2,5 % ročně), náklady práce +104 %"
  chart-title="Produktivita roste pomaleji než náklady práce"
  chart-note="(zpracovatelský průmysl)"
  panels="
produktivita-index: Česko (index 2015 = 100, v €) |
produktivita-ulc: Náklady práce na jednotku výkonu 2015 → 2025 |
produktivita-prace: Náklady práce v % tržeb 2024 (nejvyšší obory)
"
  cols="1fr 1fr 1.1fr"
  source="Náklady práce = náhrady zaměstnancům na pracujícího, v €; jednotkové = na reálnou HPH. \*SK 2015 → 2024. Zdroj: Eurostat nama_10_a64, nama_10_a64_e, sbs_ovw_act"
  notes="
K grafu: Náklady práce = náhrady zaměstnancům (D1) přepočtené na všechny pracující; jednotkové = na reálnou HPH. \*Slovensko 2015 → 2024. V € (zahrnuje posílení koruny). Zdroj: Eurostat nama_10_a64, nama_10_a64_e (2025 předběžně), sbs_ovw_act

Zpracovatelský průmysl, v eurech, 2015 = 100. Náklady práce na zaměstnance = náhrady zaměstnancům (D1) / počet zaměstnanců; produktivita = HPH ve stálých cenách (CLV15) / počet pracujících; náklady práce na jednotku výkonu = jejich podíl. 2015→2025: náklady práce na zaměstnance +104 %, produktivita +28 %, jednotkové náklady práce +58 % (Německo +27 %, Rakousko +25 %, Polsko +61 %, Slovensko +76 % do 2024, Maďarsko +94 %). Česko tak ztrácí nákladovou konkurenceschopnost vůči hlavním odběratelům; část růstu v eurech je posílení koruny 2022–23.

Náklady práce tvoří asi 54 % HPH průmyslu – výrazně víc než energie (~10 %) a ETS (~2 % nepřímo, 0,3 % přímo). Nejvyšší podíl nákladů práce na tržbách mají kromě nábytku a textilu stroje (19,6 %) a kovovýroba (18,6 %). Jde o „náhrady zaměstnancům“ včetně odvodů, ne jen mzdy. Hodnoty 2025 jsou předběžné.

Zdroje: [Eurostat nama_10_a64](https://ec.europa.eu/eurostat/databrowser/view/nama_10_a64/default/table?lang=en), [nama_10_a64_e](https://ec.europa.eu/eurostat/databrowser/view/nama_10_a64_e/default/table?lang=en), [sbs_ovw_act](https://ec.europa.eu/eurostat/databrowser/view/sbs_ovw_act/default/table?lang=en)
"
%}

{% include slide.html
  title="Manuální práce: Česko má nejvyšší podíl v regionu"
  lead="**64 % pracovníků** českého průmyslu jsou řemeslníci, obsluha strojů a montáž – v Německu 45 %"
  chart-title="Manuální profese ve zpracovatelském průmyslu"
  chart-note="(% zaměstnaných v průmyslu, 2025; tečka = 2022)"
  chart="manualni"
  source="Manuální = ISCO-08 třídy 7, 8 a 9; srovnání od 2022 kvůli metodickému zlomu v roce 2021 (u Slovinska velký). Zdroj: Eurostat lfsa_eisn2"
  notes="
K grafu: Manuální = ISCO-08 třídy 7, 8 a 9. Srovnání od 2022 – v roce 2021 je ve výběrovém šetření pracovních sil metodický zlom (velký u Slovinska). Rozdělení na ISCO 7/8/9 u Slovinska ovlivněno zlomem. Zdroj: Eurostat lfsa_eisn2

Podíl manuálních profesí (ISCO-08 třídy 7 řemeslníci a opraváři, 8 obsluha strojů a montážní dělníci, 9 pomocní pracovníci) na zaměstnanosti ve zpracovatelském průmyslu (NACE C), 2025, tečka = 2022. Česko 64 % (791 tis.), Slovinsko 63 %, Maďarsko 63 %, Slovensko 61 %, Polsko 57 %, EU27 54 %, Německo a Rakousko 45 %. Od 2022 klesl podíl v Česku jen o 2 p. b. (66 → 64 %), na Slovensku o 6, v Maďarsku o 4, v Rakousku o 4 p. b.

Srovnání začíná rokem 2022, protože v roce 2021 je ve výběrovém šetření pracovních sil metodický zlom (nové nařízení EU); u Slovinska velký – mezi ISCO 7/8 a 9 se přesunulo přes 40 tis. lidí, proto je jeho rozdělení na skupiny nespolehlivé. Vysoký podíl montáže a obsluhy strojů (ISCO 8: CZ 26 %, DE 12 %) odpovídá roli „montovny“ a souvisí s nižší produktivitou.

Zdroj: [Eurostat lfsa_eisn2](https://ec.europa.eu/eurostat/databrowser/view/lfsa_eisn2/default/table?lang=en)
"
%}

{% include slide-section.html
  letter="C"
  title="Příběhy oborů"
  subtitle="Auta, stroje, hutě, chemie, stavební materiály"
  tagline="Každý obor má jiný problém"
%}

{% include slide.html
  title="Auta: zatím vítěz, ale rizika rostou"
  lead="**Výroba +48 % (Německo −20 %)**, ale produktivita roste pomaleji než náklady práce a sílí Čína"
  panels="
auta-vyroba: Výroba aut (index 2015 = 100) |
auta-prace: Náklady práce vs. výroba na pracujícího (2015 = 100) |
auta-cina: Dovoz osobních aut z Číny do EU (mld. €)
"
  cards="
Vítěz posledních let
: Výroba +48 % od 2015, Německo −20 %. Auta tvoří pětinu HPH průmyslu a přinesla polovinu jeho růstu.

Produktivita nestačí
: Výroba na pracujícího +43 %, náklady práce na zaměstnance +116 %. Výhoda levné práce se zužuje.

Čína a elektromobilita
: Dovoz čínských aut do EU vzrostl od 2015 ze 0,1 na 13,8 mld. €. ETS auta přímo netíží, CBAM zdraží ocel.
"
  source="V €, 2025 předběžně; dovoz z Číny = osobní auta (HS 8703) do EU27. Zdroj: Eurostat sts_inpr_a, nama_10_a64, nama_10_a64_e; Comext DS-059341"
  notes="
K grafu: Náklady práce = náhrady zaměstnancům na zaměstnance; výroba na pracujícího = index průmyslové výroby / počet pracujících; v €. 2025 předběžně. Dovoz z Číny = HS 8703 (osobní auta), EU27. Zdroj: Eurostat sts_inpr_a, nama_10_a64, nama_10_a64_e; Comext DS-059341

Výroba aut (C29): index průmyslové výroby 2015→2025 +48 %, Německo −20 % ([sts_inpr_a](https://ec.europa.eu/eurostat/databrowser/view/sts_inpr_a/default/table?lang=en)). Podíl na HPH průmyslu 2015 19 %, 2024 23 %; příspěvek k růstu průmyslu +9 p. b. z +18 %. Náklady práce na zaměstnance = náhrady zaměstnancům / zaměstnanci (nama_10_a64, nama_10_a64_e): +116 % 2015→2025. Výroba na pracujícího = index průmyslové výroby / pracující: +43 %, od 2023 stagnuje.

Dovoz osobních aut (HS 8703) z Číny do EU27: 0,13 mld. € (2015) → 14,5 mld. € (2023) → 13,8 mld. € (2025), [Comext DS-059341](https://ec.europa.eu/eurostat/comext/newxtweb/). Auta vyvážejí mimo oblast EU ETS 12 % produkce, dalších 6 % do Spojeného království.
"
%}

{% include slide.html
  title="Stroje: stagnace a slabá produktivita"
  lead="**Výroba +3 % za 10 let** – slabá poptávka z Německa a pomalý růst produktivity, ne ETS"
  panels="
stroje-vyroba: Výroba (index 2015 = 100) |
stroje-prace: Náklady práce vs. výroba na pracujícího (2015 = 100) |
stroje-naklady: Náklady na 100 € tržeb (2024)
"
  cards="
Deset let stagnace
: Výroba +3 % od 2015 (Německo −12 %); po vrcholu 2018 klesla o 9 %. Brzdí ji slabá poptávka z Německa.

Produktivita stojí
: Výroba na pracujícího jen +17 % za 10 let, náklady práce na zaměstnance +93 %; práce je hlavní náklad (19,6 € ze 100 € tržeb).

ETS téměř nehraje roli
: Energie 2 € ze 100 € tržeb. Riziko je spíš CBAM: dražší ocel a 22 % produkce mimo oblast EU ETS.
"
  source="Náklady na 100 € tržeb 2024; ETS v elektřině = horní odhad. Zdroj: Eurostat sts_inpr_a, nama_10_a64, nama_10_a64_e, sbs_ovw_act"
  notes="
K grafu: Výroba na pracujícího = index průmyslové výroby / pracující; náklady práce = náhrady zaměstnancům / zaměstnanci (v €). Náklady: sbs_ovw_act 2024; ETS v elektřině = horní odhad (0,85 t/MWh × 65 €/t). Zdroj: Eurostat sts_inpr_a, nama_10_a64, nama_10_a64_e

Stroje (C28). Výroba 2015→2025 +3 %, Německo −12 % (sts_inpr_a); od vrcholu 2018 −9 %. Příspěvek k růstu průmyslu 2015→2025 jen +0,3 p. b. při váze 9,5 % HPH. Náklady práce na zaměstnance +93 %, výroba na pracujícího +17 % (nama_10_a64, nama_10_a64_e). Náklady na 100 € tržeb 2024: práce 19,6 €, energie 2,0 €, z toho ETS v elektřině ~0,3 € ([sbs_ovw_act](https://ec.europa.eu/eurostat/databrowser/view/sbs_ovw_act/default/table?lang=en)). Stroje nemají velká zařízení v ETS. Mimo oblast EU ETS vyvážejí 22 % produkce (+3 % UK), FIGARO 2024.
"
%}

{% include slide.html
  title="Hutě: stejná povolenka, různé osudy"
  lead="**Česko −25 %, Polsko +24 %** – rozhoduje Liberty Ostrava, energie a poptávka"
  panels="
hute-vyroba: Výroba (index 2015 = 100) |
hute-ets: Emise a povolenky zdarma podle lokalit (mil. t) |
hute-naklady: Náklady na 100 € tržeb (2024)
"
  cols="1fr 1.15fr 0.85fr"
  cards="
Propad kvůli Liberty
: Výroba −25 % od 2015, hlavně kvůli odstávce vysokých pecí Liberty Ostrava (2023) a insolvenci (2024).

ETS dnes: dokupuje Třinec
: Ostrava stojí, Třinec dokupuje ≈ 0,5 mil. t ročně (nejlepší odhad 1,1 % HPH). Za ETS v ceně elektřiny mu stát vrátil 474 mil. Kč (2024).

CBAM: povolenky zdarma mizí
: Alokace oceli klesne na 51,5 % (2030) a na nulu (2034). Třinec by při dnešních emisích dokupoval 2,1 a 3,9 mil. t, až ≈ 250 mil. € ročně.
"
  source="\*Slovensko C24 + C25. Výhled: emise 2024, alokace TŽ krácená podle CBAM; ostatní hutě nezobrazeny. Zdroj: Eurostat sts_inpr_a, sbs_ovw_act; EK Union Registry"
  notes="
K grafu: \*Slovensko C24 + C25 (ŠÚ SR). Ostrava = Liberty Ostrava + TAMEH, Třinec = Třinecké železárny + Energetika Třinec; ostatní hutě (±0,1 mil. t ročně) nezobrazeny. Výhled 2030 a 2034: emise 2024, alokace TŽ krácená podle CBAM (2030 na 51,5 %, 2034 na 0). ETS přímo = nejlepší odhad (Energetika Třinec 86,5 %, zbytek je teplo pro Třinec, ERÚ); ETS v elektřině = horní odhad. Zdroje: Eurostat sts_inpr_a, sbs_ovw_act; EK Union Registry; směrnice (EU) 2023/959

Hutě – základní kovy (C24). Výroba 2015→2025: Česko −25 %, Slovensko −12 % (C24+C25, ŠÚ SR), Německo −19 %, Polsko +24 % (sts_inpr_a). Liberty Ostrava: vysoké pece stojí od konce 2023, soud prohlásil podnik v červnu 2024 za insolventní; firma uváděla i nejistotu kolem povolenek, hlavní příčinou byly dluhy a provozní ztráty ([MetalMiner](https://agmetalminer.com/2024/07/05/ostrava-steel-manufacturing-plant/)).

ETS podle lokalit ([Union Registry](https://climate.ec.europa.eu/eu-action/carbon-markets/eu-emissions-trading-system-eu-ets/union-registry_en)): Ostrava = Liberty Ostrava a.s. (integrovaná huť, v registru vedená jako spalování) + TAMEH; Třinec = Třinecké železárny + Energetika Třinec. Huť dostává povolenky i za odpadní plyny, které spaluje energetika, proto má huť přebytek a energetika deficit – smysl dává až součet za lokalitu. Třinec dokupuje stabilně 0,5–1,0 mil. t ročně; Ostrava kolísala (2021 deficit 2,4 mil. t po snížení alokace ve 4. fázi) a od odstávky 2023 má přebytek. V letech 2019–2022 dokupovaly hutě průměrně ≈ 1,5 mil. t ročně; rok 2024 je kvůli Ostravě netypický.

Přímý náklad 2024: nejlepší odhad +1,1 % HPH (13 mil. €, 0,15 € ze 100 € tržeb) – Energetika Třinec přičtena z 86,5 %: z celkové výroby 12,8 PJ (elektřina 492 GWh, pára, horká a teplá voda; [Energetika Třinec](https://www.etas.trz.cz/vyrobni-ukazatele)) jde 1,73 PJ tepla konečným zákazníkům v Třinci ([ERÚ, Výsledné ceny tepelné energie 2024](https://eru.gov.cz/vysledne-ceny-tepelne-energie-v-cr-2024); v ceně tepla smí dodavatel uplatnit i náklad na povolenky). Podle tržeb ([výroční zpráva 2019](https://www.etas.trz.cz/dokumenty/vz_2019.pdf): 79 % skupině TŽ/Moravia Steel) by vyšlo 0,6 %; rozpětí −5,2 % (bez energetik) až +2,1 % HPH (celé energetiky). Kompenzace nepřímých nákladů za 2024: hutě a slévárny 753 mil. Kč, z toho Třinecké železárny 474 mil., Vítkovice Steel 62 mil. (MPO) – víc než přímý náklad ETS hutí.

Investice: Třinecké železárny plánují dekarbonizaci za ≈ 25 mld. Kč (elektrická oblouková pec místo jedné vysoké pece, briketovací linka, paroplynová elektrárna z Modernizačního fondu) a [žádají podporu 70–75 %](https://www.euro.cz/clanky/miliarda-eur-ma-zamirit-do-ekologizace-trineckych-zelezaren-firma-ale-zada-vladu-o-podobnou-podporu-jakou-maji-ostatni-ocelari-v-eu/); pec se kvůli nedostatečné podpoře [odkládá nejdřív na 2030](https://www.ekonews.cz/trinecke-zelezarny-odlozily-klicovy-dekarbonizacni-projekt-o-dva-roky-v-ostatnich-pokracuji/).

Výhled: alokace oceli se podle CBAM krátí na 97,5 % (2026), 51,5 % (2030) a 0 (2034) ([směrnice (EU) 2023/959](https://eur-lex.europa.eu/eli/dir/2023/959/oj)). Při emisích a ceně 2024 (65 €/t) by Třinec dokupoval 2,1 mil. t v 2030 a 3,9 mil. t v 2034, tj. až ≈ 250 mil. € ročně (≈ 22 % dnešní HPH hutí); bez započtení snižování emisí, změn benchmarků a ceny. Náklady na 100 € tržeb 2024: práce 12,5 €, energie 7,0 €, ETS přímo 0,15 € (sbs_ovw_act).
"
%}

{% include slide.html
  title="Chemie: kde ETS opravdu stojí peníze"
  lead="**Přímý náklad ETS až 7,1 % HPH** – nejvíc ze všech oborů; petrochemie pod CBAM nespadá"
  panels="
chemie-vyroba: Výroba (index 2015 = 100) |
chemie-ets: Emise a povolenky zdarma (mil. t) |
chemie-naklady: Náklady na 100 € tržeb (2024)
"
  cols="1fr 1.15fr 0.85fr"
  cards="
Největší přímý náklad ETS
: Emise převyšují povolenky zdarma o 2–3 mil. t ročně; v roce 2024 až 7,1 % HPH (0,9 € ze 100 € tržeb), vč. elektráren chemických podniků.

Energetický šok 2022–23
: Výroba +1 % od 2015 (Německo −21 %), od 2018 ale −10 %. Zemní plyn je palivo i surovina, ceny 2022–23 udeřily nejvíc.

Petrochemie mimo CBAM
: CBAM chrání jen hnojiva a vodík. Petrochemie čelí dovozu bez uhlíkové ceny, dovozní penetrace 62 %.
"
  source="Chemie v ETS = procesní zařízení + spalovací zdroje chemických podniků; ETS v elektřině = horní odhad. Zdroj: Eurostat sts_inpr_a, sbs_ovw_act; EK Union Registry"
  notes="
K grafu: Chemie v ETS = procesní zařízení + spalovací zdroje chemických podniků (Unipetrol Petrochemie, Agrochemie, Synthesia, Lovochemie, DEZA aj.). Náklady: sbs_ovw_act 2024; ETS v elektřině = horní odhad (0,85 t/MWh × 65 €/t). Zdroj: Eurostat sts_inpr_a; EK Union Registry

Chemie (C20). Výroba 2015→2025 +1 %, od 2018 −10 %; Německo 2015→2025 −21 % (sts_inpr_a). V národních účtech se 2018 rafinace přesunula z C19 do C20, index výroby to neovlivňuje. ETS: procesní činnosti + spalovací zdroje chemických podniků (Unipetrol Petrochemie, Agrochemie, Synthesia, Lovochemie, DEZA, Synthomer, Spolana, výroba sazí CS Cabot). Přímý čistý náklad 2024 ≈ 131 mil. € = 7,1 % HPH vč. teplárny Kralupy (TAMERO) zásobující Synthos (Union Registry); jen procesní zařízení −0,3 % (přebytek).

Náklady na 100 € tržeb 2024: práce 7,2 €, energie 5,3 €, ETS přímo 0,9 € (sbs_ovw_act). CBAM pokrývá hnojiva a vodík, ne organickou chemii ([nařízení (EU) 2023/956](https://eur-lex.europa.eu/eli/reg/2023/956/oj), příloha I). Dovozní penetrace rafinerií a chemie 62 % (FIGARO 2024).
"
%}

{% include slide.html
  title="Cement, sklo, keramika: chráněné vzdáleností"
  lead="**Regionální trh** – náklady ETS lze snáz přenést do cen, cement chrání CBAM"
  panels="
cement-vyroba: Výroba (index 2015 = 100) |
cement-ets: Emise a povolenky zdarma (mil. t) |
cement-naklady: Náklady na 100 € tržeb (2024)
"
  cols="1fr 1.15fr 0.85fr"
  cards="
Regionální trh
: Dovozní penetrace jen 31 %: cement a cihly se nevozí daleko, náklady lze snáz přenést do cen.

Povolenky zdarma těsně
: Emise převyšovaly povolenky zdarma 2016–2022, 2023–24 vyrovnáno, 2025 opět deficit 0,4 mil. t.

CBAM chrání cement, ne sklo
: Výroba 0 % od 2015 (Německo −17 %), od 2018 −10 % se stavebnictvím. Cement pod CBAM spadá, sklo a keramika ne.
"
  source="Náklady: sbs_ovw_act 2024; ETS v elektřině = horní odhad (0,85 t/MWh × 65 €/t). Zdroj: Eurostat sts_inpr_a; EK Union Registry"
  notes="
Ostatní nekovové minerální výrobky (C23): cement, vápno, sklo, keramika, cihly. Výroba 2015→2025 0 %, od 2018 −10 %; Německo 2015→2025 −17 % (sts_inpr_a). Dovozní penetrace 31 % (FIGARO 2024). ETS (činnosti 29–34, Union Registry): povolenky zdarma vs. ověřené emise – deficit 2016–2022, přebytek 2023, vyrovnáno 2024, deficit 0,44 mil. t v 2025. Náklady na 100 € tržeb 2024: práce 18,2 €, energie 8,5 €, ETS přímo ≈ 0 (sbs_ovw_act). CBAM pokrývá cement (a slínek), ne sklo a keramiku.
"
%}

{% include slide-section.html
  letter="D"
  title="Další souvislosti"
  subtitle="Povolenky zdarma · CBAM a vývoz · kraje"
%}

{% include slide.html
  title="Přímý náklad: průmysl povolenky dokupuje"
  lead="**Emise o 57 mil. t vyšší** než bezplatné povolenky (2013–2025), hlavně chemie a hutě"
  chart-title="Průmyslová zařízení v EU ETS v Česku"
  chart-note="(mil. t CO₂e za rok)"
  panels="
povolenky: Včetně průmyslových spalovacích zdrojů |
povolenky-procesni: Jen průmyslové činnosti 21–99 (dosavadní pohled)
"
  cols="1.65fr 1fr"
  source="Procesní činnosti 21–99 + 68 průmyslových zdrojů vedených jako spalování, bez veřejných elektráren a tepláren. Zdroj: EK Union Registry; ceny DEHSt"
  notes="
K grafu: Procesní činnosti EU ETS 21–99 + 68 průmyslových zdrojů vedených jako spalování (všechny průmyslové podle kategorizace ETS dashboardu FoK; bez veřejných elektráren a tepláren). Bez přechodné alokace pro výrobu elektřiny (čl. 10c). Zdroj: Evropská komise, Union Registry – verified_emissions_2025_en.xlsx; ceny: DEHSt

Průmyslová zařízení v EU ETS v ČR: procesní činnosti 21–99 (rafinerie, hutě, cement, vápno, sklo, keramika, papír, chemie) a navíc 68 průmyslových zařízení, která registr vede jako spalování (činnost 20; zařazení podle kategorizace [ETS dashboardu FoK](/studie/2026-interaktivni-prehled-ets)) – např. Unipetrol Petrochemie a Agrochemie, Energetika Třinec, Liberty Ostrava, TAMEH, ŠKO-ENERGO, TAMERO Kralupy, Mondi Štětí, DEZA, Synthesia, Lovochemie, cukrovary, pivovary, kotelny automobilek a strojíren (veřejné elektrárny a teplárny vynechány).

Pravý graf je dosavadní pohled jen na procesní činnosti, který ukazoval přebytek – ten však vznikal hlavně tím, že hutě dostávají povolenky i za odpadní plyny, které spalují jejich energetiky (ty pak vykazují deficit). Deficit 2013–2025: 57 mil. t, ≈ 2,0 mld. € v cenách daného roku; chemie ≈ 1,1 mld. €, hutě vč. energetik ≈ 0,4 mld. €. Bezplatné povolenky bez přechodné alokace na výrobu elektřiny (čl. 10c, do 2019) – s ní by byl deficit hutí asi o 6 mil. t menší.

Přiřazení TAMEH a Energetiky Třinec k hutím je horní odhad: vyrábějí v kogeneraci teplo a elektřinu i pro dálkové vytápění a síť. Povolenky za odpadní plyny (vysokopecní a koksárenský plyn) dostávají podle pravidel bezplatné alokace hutě, emise vykazují energetiky; elektřina povolenky zdarma nedostává. Hutě bez energetik (vč. Liberty Ostrava a.s., kterou registr vede jako spalování) mají v roce 2024 přebytek 0,9 mil. t, s celými energetikami deficit 0,4 mil. t. Podíl emisí krytých povolenkami zdarma: 63–86 % podle roku, obvykle 75–85 % – v souladu s [explainerem FoK o CBAM](/explainery/cbam) (průmysl dostává „téměř všechny“ povolenky zdarma, EU27).

Zdroj: [Union Registry](https://climate.ec.europa.eu/eu-action/carbon-markets/eu-emissions-trading-system-eu-ets/union-registry_en); ceny DEHSt.
"
%}

{% include slide.html
  title="CBAM a vývoz mimo oblast EU ETS"
  lead="**CBAM chrání trh EU, ne vývoz**: riziko nese downstream – stroje 22 %, auta 12 % (+ UK 6 %)"
  chart-title="Kolik produkce jde mimo oblast EU ETS"
  chart-note="(% produkce oboru, 2024; v závorce objem)"
  chart="cbam-vyvoz"
  source="Mimo oblast EU ETS = mimo EU, Norsko, Island, Lichtenštejnsko a Švýcarsko; tisk vynechán. Zdroj: Eurostat FIGARO naio_10_fcp_ii4 (2024); nařízení (EU) 2023/956"
  notes="
K grafu: Mimo oblast EU ETS = mimo EU, Norsko, Island, Lichtenštejnsko a Švýcarsko (propojený ETS); tyto země jsou z CBAM vyjmuty. Island a Lichtenštejnsko FIGARO neuvádí (zanedbatelné). Tisk vynechán. Zdroj: Eurostat FIGARO naio_10_fcp_ii4 (2024); nařízení (EU) 2023/956, příloha I

Cílem CBAM je chránit trh EU: dovážené zboží zaplatí za emise stejně jako zboží vyrobené v EU, takže výroba se nepřesune mimo EU kvůli uhlíkové ceně. Vývoz CBAM nechrání – evropský výrobce na trzích mimo EU dál soutěží s konkurenty, kteří za emise neplatí, a s ubýváním povolenek zdarma platí víc. CBAM zatěžuje dovoz do EU, ale nevrací náklady při vývozu.

Relevantní hranice není EU ani jednotný trh, ale oblast s uhlíkovou cenou EU ETS: Norsko, Island a Lichtenštejnsko jsou v EU ETS a Švýcarsko má ETS propojený – všechny jsou z CBAM vyjmuty. Spojené království má vlastní ETS a od 2027 vlastní CBAM, proto je vyznačeno zvlášť. Mimo oblast EU ETS jde 8 % produkce hutí (0,7 mld. €), ale 22 % produkce strojů, 19 % elektrických zařízení a 12 % aut (+6 % do UK; 13,4 mld. € vč. UK). Tyto obory pod CBAM nespadají, CBAM jim zdraží dováženou ocel a hliník a na trzích mimo EU nejsou chráněny. Komise v prosinci 2025 navrhla rozšíření CBAM na část navazujících výrobků ([explainer FoK o CBAM](/explainery/cbam)).

Zdroje: [Eurostat naio_10_fcp_ii4](https://ec.europa.eu/eurostat/databrowser/view/naio_10_fcp_ii4/default/table?lang=en), [nařízení (EU) 2023/956](https://eur-lex.europa.eu/eli/reg/2023/956/oj)
"
%}

{% include slide.html
  title="Kraje: emise ve dvou krajích, místa ubývají jinde"
  lead="**Moravskoslezský a Ústecký kraj**: 68 % emisí, ale místa ubývají i jinde (korelace ≈ 0)"
  panels="
kraje-mapa: Kruh = průmyslové emise EU ETS (Mt ročně, 2015–2019)<br>Odstín = místa v energeticky náročných oborech, % míst v průmyslu (2023) |
kraje-zamestnanost: Změna zaměstnanosti v průmyslu 2015 → 2023<br>podle emisí EU ETS na zaměstnaného
"
  source="Energeticky náročné obory = C17, C20, C23, C24; místa jen za regiony NUTS 2. Zdroj: Eurostat sbs_r_nuts2021, nama_10r_3empers; EK Union Registry; Natural Earth"
  notes="
K grafu: Energeticky náročné obory = papír, chemie, cement/sklo/keramika, hutě (NACE C17, C20, C23, C24); podniková statistika jen za regiony soudržnosti NUTS 2. Zdroje: Eurostat sbs_r_nuts2021 (2023), nama_10r_3empers; EK Union Registry (emise podle místa provozu); hranice: Natural Earth

Levý panel: kruh = průměrné roční ověřené emise průmyslových zařízení EU ETS 2015–2019 podle místa provozu ([Union Registry](https://climate.ec.europa.eu/eu-action/carbon-markets/eu-emissions-trading-system-eu-ets/union-registry_en)) – Moravskoslezský kraj 9,9 mil. t (hutě, koksovna, energetiky hutí), Ústecký 5,1 mil. t (Unipetrol, sklo, cement), dohromady 68 % průmyslových emisí; Středočeský 2,2 mil. t (rafinerie a teplárna Kralupy, vápenka, ŠKO-ENERGO, Spolana). Odstín = pracovní místa v energeticky náročných oborech (papír, chemie, cement/sklo/keramika, hutě) jako podíl míst ve zpracovatelském průmyslu 2023; podniková statistika podle místních jednotek existuje jen za regiony soudržnosti NUTS 2 ([Eurostat sbs_r_nuts2021](https://ec.europa.eu/eurostat/databrowser/view/sbs_r_nuts2021/default/table?lang=en)). Severozápad (Karlovarský + Ústecký) 22 % (23 tis. míst), Moravskoslezsko 17 % (26 tis.), ostatní regiony 8–12 %.

Pravý panel: změna zaměstnanosti ve zpracovatelském průmyslu 2015→2023 ([nama_10r_3empers](https://ec.europa.eu/eurostat/databrowser/view/nama_10r_3empers/default/table?lang=en)) vs. emise na zaměstnaného (průměrné emise 2015–2019 / průměrná zaměstnanost 2015–2019). Korelace +0,05, bez Prahy +0,22 – slabá a nevýznamná; n = 14, jen souvislost (chybí instrument typu Autor–Dorn–Hanson). ČR celkem −3,3 %; nejvíc ubylo v Karlovarském (−17 %), Libereckém (−9 %) a Pardubickém kraji (−7 %). Závislost na energeticky náročných oborech je soustředěná do dvou regionů, v úbytku míst se ale zatím neprojevila; odstávka Liberty Ostrava (2023–24) v datech do 2023 ještě není. Výpočet: R/05_regions.R.
"
%}

{% include slide.html
  title="Co z toho plyne"
  body="
1. ### Průmysl není jeden
   Obory se liší velikostí, náklady, energií i konkurencí – auta rostou, hutě ztrácejí, stroje stagnují.
2. ### Každý obor tlačí něco jiného
   Hutě a chemii energie a povolenky, stroje a kovovýrobu pomalý růst produktivity, auta Čína a přechod na elektromobilitu.
3. ### ETS je klíčový jen pro pár oborů
   Přímý náklad celého průmyslu je ≈ 0,3 % HPH; chemie až 7,1 %, hutě ≈ 1,1 % (po 2030 výrazně víc). Elektřina je pro velký průmysl mezi nejdražšími v EU.
4. ### Stěžejní je návrat růstu produktivity
   Od 2015 roste výroba na pracujícího o ~2,5 % ročně, náklady práce o ~7,4 %. Cesta k produktivitě se ale liší obor od oboru.
{: .slide__points}
"
  notes="
Bod 4: produktivita (HPH ve stálých cenách na pracujícího) zpracovatelského průmyslu 2015→2025 +28 % (≈ 2,5 % ročně), náklady práce na zaměstnance +104 % (≈ 7,4 % ročně), v eurech – stejná data jako na snímku 13; [Eurostat nama_10_a64](https://ec.europa.eu/eurostat/databrowser/view/nama_10_a64/default/table?lang=en), nama_10_a64_e. Bez rychlejšího růstu produktivity bude růst mezd dál snižovat konkurenceschopnost. Zdroje růstu produktivity jsou ale sektorové: v automotive a strojírenství inovace, automatizace a vyšší přidaná hodnota; v cementu nebo hutích spíš modernizace provozu a levná čistá energie.
"
%}

{% include slide-section.html
  letter="P"
  title="Příloha"
  subtitle="Podrobnější grafy a data"
  tagline="Společná příloha pro celou prezentaci"
%}

{% include slide.html
  title="Příloha: velikost oborů – HPH, zaměstnanost, tržby"
  lead="**Tři měřítka velikosti** dávají různé pořadí"
  chart-title="Velikost oborů"
  chart-note="(zpracovatelský průmysl = 21 % HPH ekonomiky; rafinerie vynechány)"
  chart="priloha-velikost"
  source="Zdroj: Eurostat nama_10_a64, nama_10_a64_e (2025, předběžně), sbs_ovw_act (2024)"
  notes="
Zdroje: [Eurostat nama_10_a64](https://ec.europa.eu/eurostat/databrowser/view/nama_10_a64/default/table?lang=en), [nama_10_a64_e](https://ec.europa.eu/eurostat/databrowser/view/nama_10_a64_e/default/table?lang=en), [sbs_ovw_act](https://ec.europa.eu/eurostat/databrowser/view/sbs_ovw_act/default/table?lang=en)
"
%}

{% include slide.html
  title="Příloha: kdo táhne výrobu nahoru a kdo dolů"
  lead="**Příspěvek** = váha oboru × změna výroby"
  chart-title="Kdo táhne výrobu nahoru a kdo dolů"
  chart-note="(seřazeno podle příspěvku; celkem 2015 → 2025: +18,4 %)"
  chart="priloha-prispevky"
  source="Příspěvek = váha 2015 × změna indexu. C19 důvěrné; potraviny a nábytek = vážený průměr podoborů (bez tabáku). Zdroj: Eurostat sts_inpr_a, nama_10_a64"
  notes="
Váhy = HPH 2015. Zdroj: [Eurostat sts_inpr_a](https://ec.europa.eu/eurostat/databrowser/view/sts_inpr_a/default/table?lang=en)
"
%}

{% include slide.html
  title="Příloha: skladba užité energie"
  lead="**Celá skladba** energie podle oborů"
  chart-title="Jakou energii obory používají a kolik"
  chart-note="(hrubé užití energie 2023)"
  chart="priloha-energie"
  source="Hrubé užití vč. vstupů do koksoven, vysokých pecí a surovin pro chemii; rafinerie vynechány. Zdroj: Eurostat env_ac_pefasu (2023)"
  notes="
K grafu: Hrubé užití = včetně vstupů do koksoven a vysokých pecí (hutě) a surovin (nafta v chemii). Ostatní ropné produkty zahrnují i naftu pro dopravu. Rafinerie vynechány. Zdroj: Eurostat env_ac_pefasu (2023)

Zdroj: [Eurostat env_ac_pefasu](https://ec.europa.eu/eurostat/databrowser/view/env_ac_pefasu/default/table?lang=en)
"
%}

{% include slide.html
  title="Příloha: skladba užité energie"
  lead="**Celá skladba** energie podle oborů"
  chart-title="Jakou energii obory používají a kolik"
  chart-note="(hrubé užití energie 2023)"
  chart="priloha-energie-2"
  wide="true"
  source="Hrubé užití vč. vstupů do koksoven, vysokých pecí a surovin pro chemii; rafinerie vynechány. Zdroj: Eurostat env_ac_pefasu (2023)"
  notes="
K grafu: Hrubé užití = včetně vstupů do koksoven a vysokých pecí (hutě) a surovin (nafta v chemii). Ostatní ropné produkty zahrnují i naftu pro dopravu. Rafinerie vynechány. Zdroj: Eurostat env_ac_pefasu (2023)

Zdroj: [Eurostat env_ac_pefasu](https://ec.europa.eu/eurostat/databrowser/view/env_ac_pefasu/default/table?lang=en)
"
%}

<p class="slide-download">Stáhnout graf: <button type="button" class="chart-download" data-svg="svg-priloha-energie-2" data-filename="skladba-uzite-energie.svg" data-title=".slide:has([data-chart='priloha-energie-2']) .slide-chart__title" data-source=".slide:has([data-chart='priloha-energie-2']) .slide__source">SVG</button></p>

{% include slide.html
  title="Domácnosti a energeticky náročný průmysl"
  lead="**Česko** má u energeticky náročného průmyslu nejvyšší hodnotu ze srovnávaných zemí, **Francie** výrazně nejnižší"
  chart-title="Domácnosti a energeticky náročný průmysl podle zemí"
  chart-note="(%)"
  chart="domacnosti-prumysl"
  wide="true"
  source="Hodnoty odečteny z grafu; Česko přibližně. Zdroj: DOPLNIT"
  notes="
Hodnoty pro DE, ES, FR, IT a NL odečteny z obrázku grafu (přesnost ± 0,05), Česko přibližně. Co graf ukazuje, rok a zdroj DOPLNIT.
"
%}

<p class="slide-download">Stáhnout graf: <button type="button" class="chart-download" data-svg="svg-domacnosti-prumysl" data-filename="domacnosti-prumysl.svg" data-title=".slide:has([data-chart='domacnosti-prumysl']) .slide-chart__title" data-source=".slide:has([data-chart='domacnosti-prumysl']) .slide__source">SVG</button></p>

{% include slide.html
  title="Příloha: dovoz a vývoz podle oborů"
  lead="**Dovozní penetrace** a vývoz mimo oblast EU ETS"
  chart-title="Konkurence z dovozu a závislost na vývozu"
  chart-note="(CBAM = obor pod uhlíkovým clem EU)"
  chart="priloha-obchod"
  source="Dovozní penetrace = dovoz / (produkce − vývoz + dovoz). \*CBAM jen část oboru. Zdroj: Eurostat FIGARO naio_10_fcp_ii4 (2024); nařízení (EU) 2023/956"
  notes="
K grafu: Dovozní penetrace = dovoz / (produkce − vývoz + dovoz). \*CBAM jen část oboru (cement; hnojiva, vodík). Zdroj: Eurostat FIGARO naio_10_fcp_ii4 (2024); nařízení (EU) 2023/956

Zdroj: [Eurostat naio_10_fcp_ii4](https://ec.europa.eu/eurostat/databrowser/view/naio_10_fcp_ii4/default/table?lang=en)
"
%}

{% include slide.html
  title="Příloha: souhrnná tabulka ukazatelů"
  lead="**Průmysl není jeden**: 18 oborů × 9 ukazatelů"
  chart-title="Průmysl není jeden: každý obor má jiný profil"
  chart-note="(čím sytější červená, tím vyšší hodnota mezi obory)"
  chart="souhrn"
  wide="true"
  source="Výroba: modrá = růst, červená = pokles; ostatní sloupce podle pořadí mezi obory. Zdroje: Eurostat, FIGARO, EK Union Registry (podrobně v poznámkách)"
  notes="
K grafu: Výroba: modrá = růst, červená = pokles. Ostatní sloupce: odstín podle pořadí mezi obory (přímý náklad ETS podle hodnoty). Zdroje: Eurostat nama_10_a64 (2025), sts_inpr_a, env_ac_pefasu (2023), sbs_ovw_act (2024), FIGARO naio_10_fcp_ii4 (2024); EK Union Registry (2024)

Barva = pořadí oboru mezi 18 obory v daném ukazateli (přímý náklad ETS podle hodnoty).
"
%}
