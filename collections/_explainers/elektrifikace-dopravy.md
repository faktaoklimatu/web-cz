---
layout:      explainer
title:       "Elektrifikace v dopravě"
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
    Jaký dopad bude mít rostoucí trend elektrifikace silniční dopravy na spotřebu elektřiny v ČR? Naše analýza zkoumá potenciální změny ve spotřebě v kontextu přechodu na elektrická vozidla.
---

Globální prodej elektrických vozidel zaznamenává významný nárůst[^narustEV]. Vlády po celém světě implementují strategie pro postupné vyřazování vozidel na benzín a naftu. Navíc stále více výrobců se zaměřuje na trh s elektrickými auty.

Je zřejmé, že budoucnost silniční dopravy je elektrická.

Co to znamená pro naši spotřebu elektřiny? Zdvojnásobí se naše potřeby, ztrojnásobí nebo dokonce zdesetinásobí?

Následující analýza představujeme výpočty pro Českou republiku s cílem zjistit, jaká by byla spotřeba elektřiny, pokud by všechna naše vozidla jezdila na elektřinu. 


## Emise z dopravy

Doprava představuje třetí největší zdroj emisí v České republice, s celkovým objemem 19,27 milionu tun CO<sub>2</sub>eq[^tretinejvetsi], přičemž většinu tohoto množství generuje právě silniční doprava[^95].

Osobní automobily vyprodukují přibližně 60% emisí silniční dopravy. A ačkoliv se spotřeba u nových vozidel snižuje, celkové emise tohoto sektoru rostou kvůli narůstajícímu množství vozidel a zvětšujícímu se používání aut typu SUV[^SUV]. V roce 2020 bylo v ČR registrováno 6,1 milionu osobních aut[^vicavicOA], které za celý rok ujely něco mezi 62 a 72 miliardami kilometrů[^proc2020]. Celkový roční nájezd je potřeba vypočítat, protože přesný údaj pro Českou republiku není dostupný.

{% capture nir %}

V NIR [(National greenhouse gas inventory report)](https://unfccc.int/documents/627756) lze dohledat kolik emisí vyprodukují osobní auta (10150 kt CO<sub>2</sub>). Vzhledem k tomu, že podle [Svazu dovozců automobilů](https://portal.sda-cia.cz/stat.php?v#str=vpp) průměrné stáří těchto vozidel bylo v roce 2020 okolo 15,5 roku[^stari], bylo klíčové zohlednit ve výpočtech, že starší vozidla mají vyšší emisní faktor než novější modely. Auta jsou v Centrálním registru vozidel rozdělena do tří kategorií podle stáří: méně než 5 let, 5–10 let a více než 10 let. Pro každou kategorii byly použity odpovídající emisní faktory, které vychází z údajů o spotřebě paliva poskytovaných výrobci automobilů. Emisní faktor se vypočítá podle následujícího vzorce: Emisní faktor (g/km)=(Spotřeba paliva (l/100km)×Emise CO2 na litr paliva (g/l))/100, kde emise CO2 na litr pro benzín jsou 2330 g/l a pro diesel 2680 g/l. Tyto hodnoty bývají často nižší než skutečná spotřeba, což pro účely výpočtů to není překážkou. Vyšší emisní faktor by naopak znamenal nižší roční nájezd. Tato analýza tedy ukazuje spíše méně optimistický scénář.

{% endcapture %}

{% include expander-figure.html
    name="nir"
    expanded=false
    class="contrast-figure "
    label="National Greenhouse Gas Inventory Report"
    content=nir
%}

### Osobní automobily

Standardní elektrické auto, například [Škoda Enyaq 60](https://ev-database.org/car/2019/Skoda-Enyaq-60), má spotřebu 164 Wh/km[^spotreba]. Ano, existují elektrické auta, které mají vyšší efektivitu např. [Tesla Model 3](https://ev-database.org/car/1991/Tesla-Model-3), ale v ČR stále nejčastěji kupujeme škodovky[^skodovky].

Celkovou spotřebu elektřiny, kdyby všechna osobní auta byla Škoda Enyaq 60, získáme prostým vynásobení ročního nájezdu a spotřeby. Osobní auta by tedy spotřebovala přibližně 10–12 TWh elektřiny. Kdyby ta auta byly Tesly Model 3, tak by spotřebovala jen 8–9,5 TWh.

### Lehká užitková vozidla

Lehká užitková vozidla jsou především klasické malé dodávky[^dodavky]. V ČR jich po silnicích jezdí 600 tisíc a jejich celkový roční nájezd je v rozmezí 9 a 10 miliardami kilometrů[^jakoauta]. Za předpokladu, že by všechna tato vozidla byla typu [Mercedes eVito Tourer](https://ev-database.org/car/1615/Mercedes-eVito-Tourer-Long-90-kWh) se spotřebou 278 Wh/km, jejich roční spotřeba elektřiny by se pohybovala mezi 2,5 a 3  TWh.

### Nákladní doprava a autobusy

Nejistota stále panuje ohledně toho, jak bude probíhat elektrifikace nákladní dopravy. Musí se zvážit mnoho aspektů, jako jsou kapacita nákladu vozidel, délka a doba jejich cest, náklady na pořízení a ekologický provoz nákladních aut. Nejpravděpodobnější scénář představuje postupnou výměnu dieselových vozidel za elektrická[^budoucnostnakladaku].

V sektoru nákladní dopravy panuje nedostatek certifikovaných dat o spotřebě, což je částečně způsobeno závislostí spotřeby na hmotnosti nákladu. Dle neoficiálních zdrojů se zdá, že průměrná spotřeba nákladních vozidel se za posledních 20 let výrazně nezměnila[^nakladakyspotreba]. V důsledku toho byl pro výpočet celkového nájezdu aplikován jednotný emisní faktor pro všechny nákladní automobily, přičemž autobusy byly kvůli jejich malému podílu na emisích pro zjednodušení vyloučeny[^bezautobusu]. Odhadovaný roční nájezd se tak pohybuje mezi 5 a 7 miliardami kilometrů.

Obdobně jako u tradičních nákladních vozidel se spalovacími motory, i pro elektrické varianty chybí oficiální údaje o spotřebě. V důsledku toho se pro výpočet spotřeby používá rozsah 1 200 až 1 800 Wh/kilometr[^kilometr]. Na jeho základě se odhad celkové spotřeby elektřiny pro elektrická nákladní auta pohybuje mezi 6 a 13 TWh.

## Celková spotřeba

KCelková spotřeba je prostým součtem spotřeb pro jednotlivé sektory silniční dopravy. Dohromady činí něco mezi 19 a 27,5 TWh, pokud by byla všechna vozidla v ČR byla nahrazena elektrickými.

Vzhledem k tomu, že v ČR se každoročně vyrobí přibližně 82 TWh elektrické energie a spotřebuje se kolem 60 TWh[^bilance], vypadá elektrifikace silniční dopravy jako uskutečnitelná i bez energetických kompromisů. Tento krok přináší výzvu, ale současně i šanci ukázat, jak lze modernizaci dopravního sektoru sladit s cíli energetické udržitelnosti. 

## Zdroje a poznámky

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
