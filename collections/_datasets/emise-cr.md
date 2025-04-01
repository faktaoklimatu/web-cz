---
layout:     dataset
title:      "Emise skleníkových plynů ČR"
slug:       "emise-cr"
published:  2020-04-19
weight:     70
tags-scopes: [ cr ]
tags-topics: [ emise ]
caption:    "Dataset obsahuje dva indikátory pro Českou republiku: emise skleníkových plynů (CO<sub>2</sub>, N<sub>2</sub>O, CH<sub>4</sub>, HFC, PFC, SF<sub>6</sub>, NF<sub>3</sub> a přepočet na CO<sub>2</sub>eq) za rok 2022 a data ze systému emisních povolenek za rok 2022."
data-our:    "https://docs.google.com/spreadsheets/d/13Pb-4rxuMvIb7edLepEz2BPR3l5cDm8M0v5wlWV0tA0/edit?usp=sharing"
data-orig:
  - [ "Eurostat", "https://ec.europa.eu/eurostat/databrowser/product/view/ENV_AIR_GGE" ]
  - [ "European Commission", "https://ec.europa.eu/clima/document/download/9bcb5ebd-47bd-49af-8c19-a24df8077cf9_en?filename=verified_emissions_2021_en.xlsx" ]
---

## Emise skleníkových plynů za rok 2021 a 2022

{% include data-header.html
    name="Eurostat"
    description="Dataset env_air_gge. V tabulce zobrazujeme souhrnné hodnoty všech skleníkových plynů (GHG) pro roky 2021 a 2022 v milionech tun CO<sub>2</sub>eq, v jedné ose hodnoty SRC_CRF (kategorie zdroje emisí), v druhé ose hodnoty GEO (geografická oblast)."
    url="https://ec.europa.eu/eurostat/databrowser/product/view/ENV_AIR_GGE"
    licence="CC BY 4.0"
    licence-url="https://creativecommons.org/licenses/by/4.0/"
    licence-proof="https://ec.europa.eu/info/legal-notice_en"
%}

{% include data-header.html
    name="EEA (European Environmental Agency)"
    description="Dataset demo_pjan. Agentura EEA je pověřená tato data shromažďovat od členských států EU, Eurostat tato data jen přebírá (ovšem má lepší rozhraní pro prohlížení dat)."
    url="https://www.eea.europa.eu/data-and-maps/data/national-emissions-reported-to-the-unfccc-and-to-the-eu-greenhouse-gas-monitoring-mechanism-15"
    licence="Licence EEA (podobná CC BY)"
    licence-proof="https://www.eea.europa.eu/legal/copyright"
%}

Tento dataset obsahuje stejná data o emisích jako dataset Emise EU, jen je omezen na Českou republiku. Více informací o této datové sadě je na [stránce datasetu Emise EU](emise-eu).

## Data ze systému emisních povolenek za rok 2021

{% include data-header.html
    name="Evropská komise"
    description="Tabulka všech evropských podniků v systému ETS a jejich potvrzených emisí do roku 2021."
    url="https://ec.europa.eu/clima/document/download/9bcb5ebd-47bd-49af-8c19-a24df8077cf9_en?filename=verified_emissions_2021_en.xlsx"
    licence="CC BY 4.0"
    licence-url="https://creativecommons.org/licenses/by/4.0/"
    licence-proof="https://ec.europa.eu/info/legal-notice_en"
%}

Data pocházejí z [databáze EU](https://climate.ec.europa.eu/eu-action/eu-emissions-trading-system-eu-ets/union-registry_en) o obchodování s emisními povolenkami ([EU Transaction Log](https://ec.europa.eu/clima/ets/oha.do?languageCode=en)). Konkrétně jsou založena na tabulce kompilované Evropskou komisí, která obsahuje všechny evropské podniky, které v databázi vystupují od roku 2013. Systém obchodování s emisními povolenkami EU (EU ETS, _Emission Trading System_) funguje na principu _cap and trade_, tedy Evropská komise stanoví celkový limit povolenek, tedy vyprodukovaných emisí, jednotlivé podniky mohou povolenky dražit a pak s nimi následně mezi sebou obchodovat. Limit povolenek v systému tak přirozeně stanoví jejich cenu. Hlavní myšlenka tohoto systému je, že motivuje trh k cenově optimálnímu snižování emisí. Více obecných informací najdete na webu systému [ETS](https://ec.europa.eu/clima/policies/ets_en) a na webu [registru EUTL](https://ec.europa.eu/clima/policies/ets/registry_en).
