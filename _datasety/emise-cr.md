---
layout:     dataset
title:      "Emise skleníkových plynů ČR"
slug:       "emise-cr"
weight:     10
tags:       [ emise, co2, CR ]
caption:    "Dataset obsahuje tři indikátory pro Českou republiku: velikost populace (k 1. 1. 2016), emise skleníkových plynů (CO2, N2O, CH4, HFC, PFC, SF6, NF3 a přepočet na CO2eq, pro rok 2016) a data ze systému emisních povolenek (za rok 2016)."
dataset-url:    "https://docs.google.com/spreadsheets/d/1y52VXoiW7OmzT1sm1UQeT0XhZTuKge1962A4pjFmqzg/edit?usp=sharing"
data-orig:  [ [ "Eurostat", "https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=env_air_gge&lang=en" ]
            , ["European Commission", "https://ec.europa.eu/clima/sites/clima/files/ets/registry/docs/verified_emissions_2016_en.xlsx" ] ]
---
<div class="section"><div class="container" markdown="1">

TODO: STALENESS WARNING: V současnosti už jsou pro emise skleníkových plynů i pro data emisních povolenek k dispozici data i za rok 2017, zatím jsme datovou sadu neaktualizovali.

## Emise skleníkových plynů

{% include data-header.html name="Eurostat" description="Dataset env_air_gge V tabulce zobrazujeme souhrnné hodnoty všech skleníkových plynů (GHG) pro rok 2016 v milionech tun CO2eq, v jedné ose hodnoty SRC_CRF (kategorie zdroje emisí), v druhé ose hodnoty GEO (geografická oblast)." url="https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=env_air_gge&lang=en" licence="CC BY 4.0" licence-url="https://creativecommons.org/licenses/by/4.0/" licence-proof="https://ec.europa.eu/info/legal-notice_en" %}

{% include data-header.html name="EEA (European Environmental Agency)" description="dataset demo_pjan" url="https://www.eea.europa.eu/data-and-maps/data/national-emissions-reported-to-the-unfccc-and-to-the-eu-greenhouse-gas-monitoring-mechanism-15" licence="Licence EEA (podobná CC BY)" licence-url="#" licence-proof="https://www.eea.europa.eu/legal/copyright" %}

**Emise skleníkových plynů.** Tento dataset obsahuje stejná data o emisích jako dataset Emise EU, jen je omezen na Českou republiku. Více informací o této datové sadě je na stránce dat [Emise EU](https://www.faktaoklimatu.cz/datasety/emise-eu).

</div></div>
<div class="section"><div class="container" markdown="1">

## Data ze systému emisních povolenek

{% include data-header.html name="Evropská komise" url="https://ec.europa.eu/clima/sites/clima/files/ets/registry/docs/verified_emissions_2016_en.xlsx" licence="CC BY 4.0" licence-url="https://creativecommons.org/licenses/by/4.0/" licence-url="#" licence-proof="https://ec.europa.eu/info/legal-notice_en" %}

Data pocházejí z databází EU o obchodování s emisními povolenkami ([EU Transaction Log](https://ec.europa.eu/clima/ets/oha.do?languageCode=en)). Konkrétně jsou založena na tabulce kompilované Evropskou komisí, která obsahuje všechny evropské podniky, které v databázi vystupují od roku 2013. Systém obchodování s emisními povolenkami EU (EU ETS, Emission Trading System) funguje na principu “cap and trade”, tedy Evropská komise stanoví celkový limit povolenek, tedy vyprodukovaných emisí, jednotlivé podniky mohou povolenky dražit a pak s nimi následně mezi sebou obchodovat. Limit povolenek v systému tak přirozeně stanoví jejich cenu. Hlavní myšlenka tohoto systému je, že motivuje trh k cenově optimálnímu snižování emisí. Více obecných informací najdete na webu systému [ETS](https://ec.europa.eu/clima/policies/ets_en) a na webu [registru EUTL](https://ec.europa.eu/clima/policies/ets/registry_en).

</div></div>
<div class="section"><div class="container" markdown="1">

## Velikost populace ČR

{% include data-header.html name="ČSÚ" url="https://www.czso.cz/csu/czso/pocet-obyvatel-v-obcich" licence="ČSÚ (podobná CC BY 4.0)" licence-url="https://creativecommons.org/licenses/by/4.0/" licence-proof="https://www.czso.cz/csu/czso/podminky_pro_vyuzivani_a_dalsi_zverejnovani_statistickych_udaju_csu" %}