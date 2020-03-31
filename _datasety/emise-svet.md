---
layout:     dataset
title:      "Emise světa"
slug:       "emise-svet"
weight:     10
tags:       [ emise, svet ]
caption:    "Delší časové řady zachycují vývoj emisí v čase, propojení všech indikátorů umožňuje detailnější analýzu, například srovnání emisí na obyvatele nebo na jednotku HDP."
dataset-url:    "https://drive.google.com/open?id=1aZNVRC7lJM28FxbKKnXo7HsPlyE2RaMbG3KDs8igwec"
data-orig:  [ [ "Zdrojová databáze EDGAR", "https://edgar.jrc.ec.europa.eu/overview.php?v=432_GHG" ] ]
---
<div class="section"><div class="container" markdown="1">

## Emise skleníkových plynů

{% include data-header.html
    name="TODO"
    description="TODO"
    url="TODO"
    licence="TODO"
    licence-url="#"
    licence-proof="#"
%}

Data emisí skleníkových plynů pochází z Emisní databáze pro globální výzkum atmosféry (EDGAR, Emissions Database for Global Atmospheric Research), spravované Společným výzkumným střediskem Evropské komise (JRC, Joint Research Centre), konkrétně se jedná o verzi 4.3.2. Databáze obsahuje dlouhé časové řady pro emise CO2, CH4 a NO2 pro jednotlivé státy. V datasetu světových emisí jsou tyto tři plyny uvedeny samostatně na jednotlivých listech (v případě CO2 se jedná o emise nezahrnující krátkodobé uhlíkové cykly). Nejsou tedy zahrnuté některé marginální skleníkové plyny (fluorované uhlovodíky apod.). Emise CH4 a N2O lze převést na ekvivalentní množství CO2 emisí pomocí potenciálu globálního oteplování. V souladu se zavedenou praxí používáme hodnoty pro 100letý časový horizont bez uvážení zpětné vazby klimatického uhlíku, pro které Pátá hodnotící zpráva panelu IPCC uvádí hodnoty 28 pro CH4 a 265 pro N2O. Tedy jedna tuna CH4 vede ke srovnatelnému efektu na klimatické změny jako dvacet osm tun CO2, v datasetu jsou uvedeny emise přepočtené na ekvivalent CO2 pro všechny státy za rok 2012.

V době přípravy datasetu (září 2019) nebyla dostupná novější celosvětová data emisí skleníkových plynů. V listopadu 2019 Společné výzkumné středisko zveřejnilo novou verzi databáze EDGAR v5.0, s daty až do roku 2015, v případě emisí CO2 dokonce až do roku 2018. Rovněž pro některé regiony existují novější data (OECD nabízí data o emisích skleníkových plynů členských států až do roku 2017). Globální uhlíkový atlas (Global Carbon Atlas) uvádí emise pouze pro CO2 pro jednotlivé státy mezi lety 1960 a 2018.

</div></div>
<div class="section"><div class="container" markdown="1">

## Velikost populace

{% include data-header.html
    name="TODO"
    description="TODO"
    url="TODO"
    licence="TODO"
    licence-url="#"
    licence-proof="#"
%}

Data o velikosti populací pochází od Světové banky, konkrétně se jedná o indikátor SP.POP.TOTL.

</div></div>
