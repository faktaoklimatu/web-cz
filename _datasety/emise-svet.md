---
layout:     dataset
title:      "Emise skleníkových plynů světa"
slug:       "emise-svet"
weight:     50
tags:       [ emise, svet ]
caption:    "Dataset obsahuje časové řady tří indikátorů pro všechny státy (a některá závislá území) světa. Delší časové řady zachycují vývoj emisí v čase, propojení všech indikátorů umožňuje detailnější analýzu, například srovnání emisí na obyvatele nebo na jednotku HDP."
dataset-url:    "https://docs.google.com/spreadsheets/d/1A1DJVqQEbvs8PfQDrav1i56cfFUIzSL5CAg2jqmXALQ"
data-orig:  [ [ "Zdrojová databáze EDGAR", "https://edgar.jrc.ec.europa.eu/overview.php?v=50_GHG" ] ]
---
<div class="section"><div class="container" markdown="1">

## Emise skleníkových plynů za rok 2015

{% include data-header.html
    name="Evropská komise, JRC (Joint Research Centre)"
    description="EDGAR (Emissions Database for Global Atmospheric Research), verze 5.0"
    url="https://edgar.jrc.ec.europa.eu/overview.php?v=50_GHG"
    licence="CC BY 4.0"
    licence-url="https://creativecommons.org/licenses/by/4.0/"
    licence-proof="https://ec.europa.eu/info/legal-notice_en"
%}

Databáze obsahuje dlouhé časové řady pro emise <glossary id='antropogennisklenikoveplyny'>skleníkových plynů</glossary> CO<sub>2</sub>, CH<sub>4</sub> a NO<sub>2</sub> pro jednotlivé státy. V datasetu světových emisí jsou tyto tři plyny uvedeny samostatně na jednotlivých listech (v případě CO<sub>2</sub> se jedná o emise nezahrnující krátkodobé uhlíkové cykly). Nejsou tedy zahrnuté některé marginální skleníkové plyny (fluorované uhlovodíky apod.). Emise CH<sub>4</sub> a N<sub>2</sub>O lze převést na ekvivalentní množství CO<sub>2</sub> emisí pomocí [koeficientu GWP](https://en.wikipedia.org/wiki/Global_warming_potential#Values). Tento koeficient pro každý plyn zohledňuje jeho absorpční vlastnosti, a na dobu, po kterou zůstane v atmosféře. V souladu se zavedenou praxí používáme hodnoty pro 100letý časový horizont bez uvážení zpětné vazby klimatického uhlíku, pro které Pátá hodnotící zpráva panelu IPCC uvádí hodnoty 28 pro CH<sub>4</sub> a 265 pro N<sub>2</sub>O. Tedy jedna tuna CH<sub>4</sub> vede ke srovnatelnému efektu na klimatické změny jako dvacet osm tun CO<sub>2</sub>, v datasetu jsou uvedeny emise přepočtené na ekvivalent CO<sub>2</sub> pro všechny státy za rok 2015.

Data za rok 2015 jsou nejnovější existující pro celý svět pro emise <glossary id='co2eq'>CO<sub>2</sub>eq</glossary>. Datset EDGAR v případě emisí CO<sub>2</sub> sahá až do roku 2018. Rovněž pro některé regiony existují novější data (OECD nabízí data o emisích skleníkových plynů členských států až do roku 2017). Globální uhlíkový atlas (Global Carbon Atlas) uvádí emise pouze pro CO<sub>2</sub> pro jednotlivé státy mezi lety 1960 a 2018.

</div></div>
<div class="section"><div class="container" markdown="1">

## Velikost ekonomik

{% include data-header.html
    name="Světová banka"
    description="Indikátor NY.GDP.MKTP.PP.KD."
    url="https://data.worldbank.org/indicator/NY.GDP.MKTP.PP.KD"
    licence="CC BY 4.0"
    licence-url="https://creativecommons.org/licenses/by/4.0/"
    licence-proof="https://data.worldbank.org/indicator/NY.GDP.MKTP.PP.KD"
%}

Zdrojem dat o velikosti ekonomik je Světová banka, indikátor NY.GDP.MKTP.PP.KD. Tento indikátor hrubého domácího produktu (HDP, anglicky Gross Domestic Product, GDP) je vyjádřený v konstantních mezinárodních dolarech roku 2011. Nominální HDP (tzn. vyjádřeno v lokální měně daného roku a případně převedeno aktuálním kurzem) není pro srovnání v čase a mezi státy vhodné, neboť je zkresleno inflací a různými cenovými hladinami v jednotlivých zemích. Proto tento indikátor používá:

* **Konstantní dolary roku 2011:** Ceny v roce 2011 se považují za základní, pokud v následujících letech je vyšší HDP i vyšší ceny, je HDP přepočteno jako kupní síla daného roku v cenách z roku 2011 (aby nedošlo ke zkreslení inflací). Tento přepočet je založen na tzv. spotřebním koši, tedy souboru produktů, které nakupuje průměrný spotřebitel.
* **Mezinárodní dolary:** Běžné měnové kurzy nejsou vhodné pro srovnání úrovně života v jednotlivých zemích, neboť nepostihují rozdíly v cenách. "Mezinárodní dolary" proto převádí měny takovým způsobem, aby byla zachována srovnatelná kupní síla, která se opět přepočítává pomocí spotřebního koše (technicky se tento přepočet nazývá "podle parity kupní síly", anglicky "purchasing power parity" a zkracuje se jako PPP, proto je v list v datasetu pojmenovaný GDP PPP). Srovnatelné HDP na obyvatele vyjádřeno v mezinárodních dolarech tedy znamená srovnatelnou životní úroveň, toto vyjádření je zpravidla vhodnější k porovnávání zemí.

Indikátor NY.GDP.MKTP.PP.KD tedy používá korekci pro inflaci i pro odlišné cenové hladiny, proto je vhodný k porovnávání v čase i napříč jednotlivými zeměmi. Samotné měření ekonomik či materiální životní úrovně prostřednictvím HDP je samozřejmě jen přibližné, přesto se jedná o užitečný ukazatel, který dobře koreluje s mnoha dalšími indikátory.

</div></div>
<div class="section"><div class="container" markdown="1">

## Geografická data

Pro prezentaci výsledků potřebujeme další dvě pomocné tabulky, a to velikost populace v jednotlivých zemích a rozdělení zemí do regoinů.

### Velikost populace

{% include data-header.html
    name="Světová banka"
    description="Indikátor SP.POP.TOTL."
    url="https://data.worldbank.org/indicator/SP.POP.TOTL"
    licence="CC BY 4.0"
    licence-url="https://creativecommons.org/licenses/by/4.0/"
    licence-proof="https://data.worldbank.org/indicator/SP.POP.TOTL"
%}

Data o velikosti populací pochází také od Světové banky, konkrétně se jedná o indikátor SP.POP.TOTL.

### Rozdělení do regionů

Země jsou v jednotlivých listech označené třípísmenným kódem podle normy ISO 3166-1, která umožňuje propojení dat z různých zdrojů (jména zemí zpravidla nejsou konzistentní pro různé zdroje). Dataset rovněž obsahuje přiřazení zemí do větších geografických celků. Toto zařazení závisí vždy na výběru konkrétních regionů a není zcela jednoznačné, proto dataset obsahuje několik geografických rozdělení – do regionů podle Světové banky a podle doporučení [Wikimedia](https://meta.wikimedia.org/wiki/List_of_countries_by_regional_classification), rovněž i námi vytvořené přiřazení pro infografiky.

</div></div>
