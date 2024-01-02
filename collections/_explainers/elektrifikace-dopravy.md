---
layout:      explainer
title:       "Jaký dopad bude mít elektrifikace dopravy na spotřebu elektřiny v ČR? "
slug:        "elektrifikace-dopravy"
published:   2023-11-20
authors:
  - name: "Zbyněk Štajer"
  - id: "jirka-lnenicka"
    minor-role: "editace"
  - id: "marcel-otruba"
    minor-role: "ilustrace"
weight:      74
tags-scopes: [ svet ]
tags-topics: [ emise, opatreni ]
cover-source-author:      ""
cover-source-text:        "Unsplash"
cover-source-license:     "Unsplash License"
cover-source-license-url: "https://unsplash.com/license"
cover-source-url:         ""
perex: |
    Elektroaut přibývá, celosvětově jejich prodej rychle roste. Jaký dopad bude mít elektrifikace dopravy na spotřebu elektřiny v ČR?
---

 Zatímco v roce 2020 tvořily elektromobily celosvětově méně než 5 % všech prodaných vozidel, v roce 2023 už to bylo 18 %.[^narustEV] Vlády mnoha zemí plánují strategie pro postupné vyřazování vozidel na benzín a naftu a výrobci každý rok uvádějí na trh nové elektrické modely. Z toho všeho je zřejmé, že silniční doprava se bude postupně elektrifikovat.

**Co to znamená pro spotřebu elektřiny v Česku?** Bude kvůli elektroautům potřeba postavit nové elektrárny, nebo budou stačit ty stávající? 

Tento text ukazuje, jakým způsobem lze budoucí nárůst spotřeby vypočítat z dostupných dat. Z výpočtu vychází, že nahrazení všech osobních aut elektromobily by vedlo k nárůstu spotřeby o 8–12 TWh ročně a elektrifikace veškeré silniční dopravy (tedy i nákladní) by znamenala nárůst spotřeby o 16–26 TWh.  

{% include figure.html
    name="zacpa.jpg"
    alt="Osobní automobily"
    caption="Osobní automobily = 60 % emisí ze silniční dopravy"
    source-text="Unsplash"
    source-url="https://unsplash.com/photos/cars-on-road-during-daytime-R7nSPG8edVI"
%}

{% capture kontext %}

Doprava je v Česku třetím největším [zdrojem emisí](/infografiky/emise-cr): jde o 16,1 % z celkových emisí země (19,27 milionu tun CO<sub>2</sub>eq), přičemž naprostá většina pochází z dopravy po silnicích – až 95 %.

{% include figure.html
    name="kontext-doprava-emise.svg"
    alt="TODO kontext dopravní emise"
%}

Emise z osobních automobilů tvoří v rámci silniční dopravy přibližně 60 %. A i když se spotřeba u nových vozidel postupně snižuje, celkové emise tohoto sektoru stále rostou: jednak dál narůstá počet vozidel a jednak se více používají vozy typu SUV, tedy auta s emisním faktorem, který se blíží hodnotám typickým pro lehká užitková vozidla (dodávky). Podle [Svazu dovozců automobilů](https://portal.sda-cia.cz/stat.php?v#str=vpp) bylo v roce 2020 v ČR registrováno 6,1 milionu osobních aut. Jejich celkový nájezd se odhaduje na 62 až 72 miliard kilometrů. Analýza v tomto textu vychází z roku 2020, protože je to nejnovější rok, pro který jsou k dispozici kvalitní data.

{% endcapture %}

{% include expander-figure.html
    name="kontext"
    expanded=false
    class="contrast-figure "
    label="Kontext: Emise z dopravy"
    content=kontext
%}

## Metoda výpočtu a předpoklady 

Princip výpočtu je jednoduchý: potřebujeme vědět, kolik kilometrů ročně najedou vozidla dané kategorie (osobní auta, lehké dodávky a nákladní auta), a tento roční nájezd pak vynásobit spotřebou elektřiny na kilometr, což je u elektroaut dobře známý parametr. 

Při úvahách o nárůstu budoucí spotřeby je nicméně důležité vzít v potaz, že proměna dopravy nemusí znamenat jen elektrifikaci – může se změnit i to, v jaké míře budou jednotlivé dopravní prostředky využívány. Například častější práce z domu může vést k tomu, že budou někteří lidé jezdit méně, cestování mezi velkými městy možná zčásti pokryjí vysokorychlostní železnice, stejně tak dopravu ve městech mohou zcela proměnit autonomní vozidla. Výpočty uvedené níže tyto změny neberou v úvahu a jednoduše ukazují, **o kolik by narostla spotřeba elektřiny, kdybych byla silniční doprava elektrifikována a zároveň se nezměnil způsob, jak automobily v Česku používáme**.

Více o předpokladech a citlivosti výpočtu na různé parametry je uvedeno dále v textu. 

## Nájezdy a spotřeba osobních automobilů

V Česku je registrováno okolo 6,5 milionů osobních aut[^vicavicOA] a různé průzkumy[^pruzkumy] mezi řidiči uvádějí, že běžný nájezd se pohybuje mírně nad 10 000 km ročně. Tyto průzkumy tedy naznačují, že celkový nájezd v ČR je něco přes 65 miliard kilometrů. Bylo by možné tento nájezd spočítat přesněji? 

Při výpočtu lze vyjít z ročních emisí CO<sub>2</sub> osobních automobilů v Česku: v roce 2020 to bylo 10,15 megatun CO<sub>2</sub>. Při spotřebě 6–7 l na 100 km a emisích 2,3 kg CO<sub>2</sub> z litru benzínu by se celkový roční nájezd osobních automobilů v Česku pohyboval **mezi 68–80 miliardami kilometrů**. Tento výpočet je možné dále zpřesňovat – brát například v potaz, že část aut jezdí na benzín a část na naftu, nebo je možné zahrnout různá stáří, a tedy i různé emisní koeficienty vozidel. Výsledek však zůstává stejný (podrobněji viz tabulka *- odkaz na tabulku, dát ji standardním způsobem do zdrojů + na správný GoogleDisk*).

Jak by se při tomto celkovém ročním nájezdu proměnila spotřeba elektřiny v Česku, kdyby byly všechny osobní vozy nahrazeny elektroauty? To záleží na typu elektromobilu a jeho efektivitě. Pro představu: v případě [Škody Enyaq 60](https://ev-database.org/car/2019/Skoda-Enyaq-60), která má spotřebu 164 Wh/km[^spotreba], by se celková roční spotřeba elektřiny zvýšila o 10–12 TWh. Kdyby byla osobní auta nahrazena jiným vozem s vyšší efektivitou (např. [Tesla Model 3](https://ev-database.org/car/1991/Tesla-Model-3) se spotřebou 132 Wh/km), vzrostla by celková spotřeba elektřiny v Česku jen o 8–9,5 TWh ročně.

## Nájezdy a spotřeba nákladních automobilů

**Lehká užitková vozidla**, tedy běžné malé dodávky[^dodavky], se budou postupně elektrifikovat také. V ČR jich po silnicích jezdí 600 tisíc a jejich celkový roční nájezd se pohybuje v rozmezí 9 a 10 miliard kilometrů[^jakoauta]. Kdyby byla všechna tato vozidla typu [Mercedes eVito Tourer](https://ev-database.org/car/1615/Mercedes-eVito-Tourer-Long-90-kWh) se spotřebou 278 Wh/km, jejich celková roční spotřeba by se pohybovala mezi 2,5 a 3 TWh.

Pro **kamiony a další těžkou nákladní dopravu** je výpočet spíše hrubým odhadem. Elektrifikace kamionové dopravy je totiž jen jedním z více možných budoucích scénářů, a jak moc se kamiony na elektřinu prosadí, nebo budou pro transport nákladu preferována jiná řešení, závisí na řadě faktorů[^budoucnostnakladaku]. Kromě toho je také důležité vzít v úvahu, že spotřeba kamionů velmi závisí na hmotnosti přepravovaného nákladu. V důsledku toho lze celkový roční nájezd silniční nákladní dopravy odhadovat jen přibližně – někde mezi 5 a 7 miliardami kilometrů. Při spotřebě elektřiny 1200 až 1800 Wh/km[^kilometr] by se pak spotřeba elektřiny při plné elektrifikaci těžké nákladní dopravy pohybovala mezi 6 a 13 TWh ročně.

## Celková spotřeba silniční dopravy

Celková spotřeba silniční dopravy je prostým součtem spotřeb pro jednotlivé sektory. Dohromady je to něco mezi 19 a 27,5 TWh ročně (pokud by v Česku byla všechna vozidla se spalovacím motorem nahrazena vozidly elektrickými).

{% include figure.html
    name="spotreba-elektrifikovana-doprava.svg"
    alt="TODO spotřeba navýšená o elektrifikovanou dopravu"
%}

​
Kdyby byl trend nákupu elektroaut v Česku stejný jako dnes, v roce 2030 by jich zde jezdilo 100 tisíc a na svůj roční provoz by potřebovala 0,1 TWh elektrické energie. Kdyby byl trend stejný jako v EU, jezdilo bych jich v roce 2030 po českých silnicích necelých 400 tisíc a potřebovala by 0,6 TWh elektrické energie.[^vypocet2030] Obecně je možné konstatovat, že **změna bude velmi pozvolná**, a to nejen v sektoru osobních automobilů, ale i u ostatních druhů aut, **a nebude proto znamenat náhlé změny celkové spotřeby elektřiny v Česku**.

Vzhledem k tomu, že se v ČR každoročně vyrobí přibližně 82 TWh elektřiny a spotřebuje se jí cca 60 TWh[^bilance], vypadá tedy postupná elektrifikace silniční dopravy jako uskutečnitelná i bez energetických kompromisů. Přináší s sebou samozřejmě různé výzvy, zároveň je ale zřejmé, že modernizaci tohoto sektoru je možné sladit s cíli energetické udržitelnosti. 

## Metodologické poznámky a diskuze citlivosti na parametry

* Emisní kategorie "Heavy duty trucks and buses"[^hdt], ze které tento text vychází při výpočtu celkového nájezdu kamionů, obsahuje i emise vyprodukované autobusy. Pro jednoduchost nejsou emise z autobusové dopravy do výpočtu zahrnuty, tvoří totiž jen cca 5 % emisí v této kategorii.[^bezautobusu]

* Výpočty v tomto textu vycházejí z dat pro rok 2020. Při použití aktuálnějších dat by výsledky byly jiné, protože doprava v roce 2020 vypadala kvůli pandemii Covid-19 jinak než v roce 2023. Výkony osobní dopravy se proměnily – lidé postupně začali více jezdit auty a méně využívat hromadnou dopravu. Celkové nájezdy, výkony, a tedy i emise jsou proto v současnosti vyšší.[^vyvojdopravy]

## Zdroje a poznámky
[^pruzkumy]: [Auto.cz: Češi ročně ujedou deset až dvacet tisíc kilometrů](https://www.auto.cz/cesi-rocne-ujedou-deset-az-dvacet-tisic-kilometru-77823)
[^narustEV]: International Energy Agency (IEA) uvádí, že v roce 2022 tvořily elektrické vozy celosvětově už 14 % všech prodaných osobních automobilů. V roce 2021 to bylo 9 % a v roce 2020 méně než 5 % (viz [Global EV Outlook 2023](https://www.iea.org/reports/global-ev-outlook-2023)).
[^vicavicOA]: Podle [Svazu dovozců automobilů](https://portal.sda-cia.cz/stat.php?v#str=vpp) dosáhl počet registrovaných osobních automobilů v ČR na konci roku 2023 hranice 6,5 milionu.
[^spotreba]: Tento údaj udává výrobce na základě standardu WLTP (Rated Consumption). WLTP (Worldwide Harmonized Light Vehicles Test Procedure) je moderní standard zavedený v roce 2017, který se používá při hodnocení emisní náročnosti a účinnosti automobilů. Nahradil zastaralou metodu NEDC a od roku 2018 se stal povinným pro všechny nové automobily v EU, včetně elektrických. Tato změna byla částečně reakcí na [skandál s falšováním emisí](https://www.theguardian.com/business/ng-interactive/2015/sep/23/volkswagen-emissions-scandal-explained-diesel-cars). U elektrických automobilů se měří zejména spotřeba elektřiny a maximální dojezd.
[^skodovky]: Tento údaj uvádí [Centrum dopravního výzkumu](https://www.cistadoprava.cz/registrace-novych-vozidel-v-cr/).
[^dodavky]: Vozidla kategorie N1 podle UNECE, jež jsou definována jako "vozidla určená pro přepravu zboží s maximální hmotností nepřevyšující 3,5 tuny" – viz [EU classification of vehicle types](https://alternative-fuels-observatory.ec.europa.eu/general-information/vehicle-types).
[^jakoauta]: Pro lehká užitná vozidla je použita stejná metoda výpočtu jako u osobních aut.
[^budoucnostnakladaku]: Viz [The European Heavy-Duty Vehicle Market until 2040: Analysis of Decarbonization Pathways](https://theicct.org/wp-content/uploads/2023/01/hdv-europe-decarb-costs-jan23.pdf).
[^nakladakyspotreba]: Muncrief, Rachel. [“Shell Game? Debating Real-World Fuel Consumption Trends for Heavy-Duty Vehicles in Europe.”](https://theicct.org/shell-game-debating-real-world-fuel-consumption-trends-for-heavy-duty-vehicles-in-europe/) ICCT Staff Blog (blog), April 24, 2017.
[^bezautobusu]: Přibližně 5 %, viz [Ročenka dopravy 2020](https://www.sydos.cz/cs/rocenka-2020/rocenka/htm_cz/cz20_721000.html).
[^kilometr]: [Shoman et al., 2023: Battery electric long-haul trucks in Europe: Public charging, energy, and power requirements](https://www.sciencedirect.com/science/article/pii/S1361920923002225).
[^bilance]: Tento údaj uvádí Energetický regulační úřad v [Roční zprávě o provozu elektrizační soustavy ČR pro rok 2022](https://www.eru.cz/rocni-zprava-o-provozu-elektrizacni-soustavy-cr-pro-rok-2022).
[^vypocet2030]: V ČR je ročně registrováno přibližně 200 tisíc nových automobilů [(Svaz dovozců automobilů: Registrace nových OA v ČR)](https://portal.sda-cia.cz/stat.php?n#str=nova), přičemž bateriová elektrická vozidla (BEV) tvořila v roce 2023 přibližně 3 % registrací [(CDV: Registrace všech čistých automobilů v ČR)](https://www.cistadoprava.cz/registrace-vsech-cistych-vozidel-v-cr-dle-nap-cm/). Pokud zůstane meziroční růst stejný (+0,5 %), bude v roce 2030 v ČR registrováno 100 tisíc elektroaut. Stejná logika je uplatněna při odhadu vývoje na evropském trhu [EEA: New registrations of electric vehicles in Europe](https://www.eea.europa.eu/en/analysis/indicators/new-registrations-of-electric-vehicles), kde bylo v roce 2022 registrováno mezi novými auty 12 % elektroaut, přičemž meziroční růst je přibližně +5 % *viz tabulka.
[^hdt]: Kódové označení 1.A.3.b.iii (Heavy duty trucks and buses) je definováno v [2006 IPCC Guidelines for National Greenhouse Gas Inventories](https://www.ipcc-nggip.iges.or.jp/public/2006gl/index.html).
[^bezautobusu]: Přibližně 5 %, viz [Ročenka dopravy 2020](https://www.sydos.cz/cs/rocenka-2020/rocenka/htm_cz/cz20_721000.html).
[^vyvojdopravy]: [Envirometr: Výkon osobní dopravy ČR](https://www.envirometr.cz/data/vykon-osobni-dopravy)
