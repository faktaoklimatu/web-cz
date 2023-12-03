---
layout:      explainer
title:       "Jaký dopad bude mít elektrifikace dopravy na spotřebu elektřiny v ČR? "
slug:        "elektrifikace-dopravy"
published:   2023-11-20
authors:
  - ids: ["ondras-pribyla"]
  - id: "jirka-lnenicka"
    minor-role: "editace"
  - id: "marcel-otruba"
    minor-role: "ilustrace"
  - name: ""
    affiliation: 
    minor-role: "konzultace"
weight:      74
tags-scopes: [ svet ]
tags-topics: [ emise, opatreni ]
cover-source-author:      ""
cover-source-text:        "Unsplash"
cover-source-license:     "Unsplash License"
cover-source-license-url: "https://unsplash.com/license"
cover-source-url:         ""
perex: |
    Jaký dopad bude mít elektrifikace dopravy na spotřebu elektřiny v ČR? Perex Perex Perex
---

Prodeje elektroaut rychle rostou. Zatímco v roce 2020 tvořily méně něž 5% všech prodaných vozidel na světě, v roce 2023 už je to 18% [^narustEV]. Vlády po celém světě plánují strategie pro postupné vyřazování vozidel na benzín a naftu a výrobci každý rok uvádějí na trh nové elektrické modely. Je zřejmé, že silniční doprava se bude postupně elektrifikovat.

**Co to znamená pro spotřebu elektřiny v Česku?** Bude kvůli elektroautům potřeba stavět nové elektrárny, nebo by mohly stačit ty, které máme? 

V tomto článku ukazujeme způsob, jak nárůst spotřeby vypočítat z dostupných dat. Ukazuje se, že nahrazení všech osobních aut elektroauty by znamenalo nárůst spotřeby o 8-12TWh a elektrifikace celé silniční dopravy včetně té nákladní by znamenala nárůst spotřeby o 16-26 TWh.  

{% capture kontext %}

Asi Obrázek --- Doprava představuje třetí největší zdroj emisí v České republice, s celkovým objemem 19,27 milionu tun CO<sub>2</sub>eq[^tretinejvetsi], přičemž většinu tohoto množství generuje právě silniční doprava[^95].

Osobní automobily vyprodukují přibližně 60% emisí silniční dopravy. A ačkoliv se spotřeba u nových vozidel snižuje, celkové emise tohoto sektoru rostou kvůli narůstajícímu množství vozidel a zvětšujícímu se používání aut typu SUV[^SUV]. V roce 2020 bylo v ČR registrováno 6,1 milionu osobních aut[^vicavicOA], které za celý rok ujely něco mezi 62 a 72 miliardami kilometrů[^proc2020].

{% endcapture %}

{% include expander-figure.html
    name="kontext"
    expanded=false
    class="contrast-figure "
    label="Kontext: Emise z dopravy"
    content=kontext
%}

## Metoda výpočtu a předpoklady 

Princip výpočtu je jednoduchý. Potřebujeme zjistit, kolik kilometrů ročně najedou vozidla dané kategorie (osobní auta, lehké dodávky a nákladní auta) a tento roční nájezd vynásobíme spotřebou elektřiny na kilometr, což pro elektroauta je dobře známý parametr. 

Proměna dopravy ale nemusí znamenat jen elektrifikaci, může se změnit i to, jak se různé dopravní prostředky používají. Práce z domu může vést k tomu, že lidé budou méně jezdit auty, část dopravy mezi městy možná zvládnou vysokorychlostní železnice, a dopavu ve městech mohou zcela proměnit autonomní vozidla. Výpočty níže tyto změny neberou v úvahu a jednoduše ukazují **o kolik by narostla spotřeba elekřiny, kdybychom elektrifikovali silniční dopravu a nezměnili to, jak automobily v Česku používáme**. 
Podrobněji diskutujeme předpoklady a citlivost výpočtu na různé parametry níže. 

## Nájezdy a spotřeba osobních automobilů

V Česku je registrováno okolo 6,5 milionů osobních aut[^vicavicOA] a různé průzkumy[^pruzkumy] mezi řidiči uvádějí, že běžný nájezd je mírně nad 10 000 km ročně. Tyto průzkumy by tedy naznačovaly celkový nájezd v ČR o něco více než 65 miliard kilometrů. Bylo by možné celkový nájezd osobních aut spočítat přesněji? 

Můžeme vyjít z ročních emisí CO2 osobních automobilů v Česku, které v roce 2020 byly 10,15 MtCO2. Při spotřebě 6 - 7 l na 100 km a emisím 2,3 kg CO2 z litru benzínu by byl celkový roční nájezd osobních automobilů **mezi 68 - 80 miliardami kilometrů**. Výpočet můžeme dále zpřesňovat, uvažovat že část aut jezdí na benzín a část na diesel a zahrnout různá stáří a tedy i různé emisní koeficienty vozidel. Výsledek však zůstává stejný. (Podrobněji viz tabulka *- odkaz na tabulku, dát ji standardním způsobem do zdrojů + na správný GoogleDisk*)

Kdyby všechna osobní auta byla nahrazena například [Škodou Enyaq 60](https://ev-database.org/car/2019/Skoda-Enyaq-60), která má spotřebu 164 Wh/km[^spotreba], zvýšila by se spotřeba elektřiny v Česku o 10-12TWh. Kdyby byla osobní auta nahrazena jiným vozem s vyšší efektivitou (např. [Tesla Model 3](https://ev-database.org/car/1991/Tesla-Model-3), spotřeba 132Wh/km), zvýšila by se spotřeba elektřiny jen o 8-9,5 TWh.

## Nájezdy a spotřeba nákladních automobilů

**Lehká užitková vozidla**, tedy vlastně klasické klasické malé dodávky[^dodavky] se také postupně budou elektrifikovat. V ČR jich po silnicích jezdí 600 tisíc a jejich celkový roční nájezd je v rozmezí 9 a 10 miliardami kilometrů[^jakoauta]. Za předpokladu, že by všechna tato vozidla byla typu [Mercedes eVito Tourer](https://ev-database.org/car/1615/Mercedes-eVito-Tourer-Long-90-kWh) se spotřebou 278 Wh/km, jejich roční spotřeba elektřiny by se pohybovala mezi 2,5 a 3  TWh.

Pro **kamiony a další těžkou nákladní dopravu** je výpočet spíše hrubým odhadem závislým na mnoha předpokladech. Jedním z důvodů je, že elektrifikace kamionové dopravy jednou z více možných budoucností a to, jak moc se elektro-kamiony prosadí, závisí na mnoha aspektech[^budoucnostnakladaku]. Dalším faktorem je, že spotřeba kamionů závisí na hmotnosti nákladu. Lze tak jen zhruba odhadovat, že celkový roční nájezd se pohybuje mezi 5 a 7 miliardami kilometrů. Při spotřebě elektřiny v rozsahu 1 200 až 1 800 Wh/kilometr[^kilometr] můžeme odhadovat, že spotřeba elektřiny při plné elektrifikaci těžké nákladní dopravy by byla mezi 6 a 13 TWh.

## Celková spotřeba

Celková spotřeba je prostým součtem spotřeb pro jednotlivé sektory silniční dopravy. Dohromady činí něco mezi 19 a 27,5 TWh, pokud by byla všechna vozidla v ČR byla nahrazena elektrickými.

*Doplnit timeline elektrifikace (bude to velmi postupné - do 2030 jen část osobních aut, náklaďáky půjdou až někdy po 2040???...)*

Vzhledem k tomu, že v ČR se každoročně vyrobí přibližně 82 TWh elektrické energie a spotřebuje se kolem 60 TWh[^bilance], vypadá elektrifikace silniční dopravy jako uskutečnitelná i bez energetických kompromisů. Tento krok přináší výzvu, ale současně i šanci ukázat, jak lze modernizaci dopravního sektoru sladit s cíli energetické udržitelnosti. 

## Metodologické poznámky a diskuse citlivosti na parametry

* autobusy
* citlivost na vstupní údaj emisí (a tedy nájezdů)
* další komentáře k metodě výpočtu

## Zdroje a poznámky
[^pruzkumy]: https://www.auto.cz/cesi-rocne-ujedou-deset-az-dvacet-tisic-kilometru-77823
[^narustEV]: International Energy Agency uvádí, že v roce 2022 tvořily elektrické vozy 14% všech prodaných osobních automobilů, zatímco v roce 2021 to bylo 9% a v roce 2020 méně než 5%, jak je uvedeno v [Global EV Outlook 2023](https://www.iea.org/reports/global-ev-outlook-2023)
[^tretinejvetsi]: Jedná se o 16.1% z celkových emisí ČR viz. [Infografika Emise skleníkových plynů v ČR podle sektorů](/infografiky/emise-cr)
[^95]: Je to přibližně 95 %.
[^SUV]: S emisním faktorem, který je bližší hodnotám typickým pro lehká užitková vozidla.
[^vicavicOA]: Podle [Svazu dovozců automobilů](https://portal.sda-cia.cz/stat.php?v#str=vpp) dosáhl počet registrovaných osobních automobilů v ČR na konci roku 2023 hranici 6,5 milionu.
[^proc2020]: Jako základní rok pro tuto analýzu byl zvolen rok 2020, protože je to nejnovější rok, pro který jsou k dispozici kvalitní data.
[^spotreba]: Tento údaj udává výrobce na základě WLTP (Rated Consumption).  WLTP (Worldwide Harmonized Light Vehicles Test Procedure) zavedený v roce 2017, je moderní standard pro hodnocení emisí a účinnosti automobilů. Nahradil zastaralou metodu NEDC a od roku 2018 se stal povinným pro všechny nové automobily v EU, včetně elektrických. Tato změna byla částečně reakcí na [skandál s falšováním emisí](https://www.theguardian.com/business/ng-interactive/2015/sep/23/volkswagen-emissions-scandal-explained-diesel-cars). U elektrických automobilů měří zejména míru spotřeby elektřiny a maximální dojezd.
[^skodovky]: Uvádí  [Centrum dopravního výzkumu](https://www.cistadoprava.cz/registrace-novych-vozidel-v-cr/).
[^dodavky]: Vozidla kategorie N1 podle UNECE, jež jsou definována jako ‘Vozidla určená pro přepravu zboží s maximální hmotností nepřevyšující 3,5 tuny’ viz. [EU classification of vehicle types](https://alternative-fuels-observatory.ec.europa.eu/general-information/vehicle-types).
[^jakoauta]: Pro lehká užitná vozidla je použita stejná metoda výpočtu jako u osobních aut.
[^budoucnostnakladaku]: viz. [The European Heavy-Duty Vehicle Market until 2040: Analysis of Decarbonization Pathways](https://theicct.org/wp-content/uploads/2023/01/hdv-europe-decarb-costs-jan23.pdf)
[^nakladakyspotreba]: Muncrief, Rachel. [“Shell Game? Debating Real-World Fuel Consumption Trends for Heavy-Duty Vehicles in Europe.”](https://theicct.org/shell-game-debating-real-world-fuel-consumption-trends-for-heavy-duty-vehicles-in-europe/) ICCT Staff Blog (blog), April 24, 2017.
[^bezautobusu]: Přibližně 5%, viz. [Ročenka dopravy 2020](https://www.sydos.cz/cs/rocenka-2020/rocenka/htm_cz/cz20_721000.html).
[^kilometr]: [Shoman et al., 2023: Battery electric long-haul trucks in Europe: Public charging, energy, and power requirements](https://www.sciencedirect.com/science/article/pii/S1361920923002225).
[^bilance]: Uvádí Energetický regulační úřad v [Roční zprávě o provozu elektrizační soustavy ČR pro rok 2022](https://www.eru.cz/rocni-zprava-o-provozu-elektrizacni-soustavy-cr-pro-rok-2022).
