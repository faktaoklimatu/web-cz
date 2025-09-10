---
layout:     dataset
title:      "Emise skleníkových plynů EU"
slug:       "emise-eu"
published:  2020-04-19
weight:     60
tags-scopes: [ eu ]
tags-topics: [ emise ]
caption:    "Dataset obsahuje dva indikátory pro všechny státy EU (a některé další státy): Velikost populace a Emise skleníkových plynů (CO<sub>2</sub>, N<sub>2</sub>O, CH<sub>4</sub>, HFC, PFC, SF<sub>6</sub>, NF<sub>3</sub> a přepočet na tuny CO<sub>2</sub>eq)."
data-our:    "https://docs.google.com/spreadsheets/d/1oC35vzLZh70H5XPLsArC-yj85ZBc96K1--hnU1bRNuY/edit?usp=sharing"
data-orig:  [ [ "Zdrojová data Eurostat", "https://ec.europa.eu/eurostat/databrowser/view/env_air_gge/default/table?lang=en" ] ]
---

## Emise skleníkových plynů

{% include data-header.html
    name="Eurostat"
    description="Dataset env_air_gge. V tabulce zobrazujeme souhrnné hodnoty všech <glossary id='antropogennisklenikoveplyny'>skleníkových plynů (GHG)</glossary> pro rok 2023 v milionech tun <glossary id='co2eq'>CO<sub>2</sub>eq</glossary>, v jedné ose hodnoty SRC_CRF (kategorie zdroje emisí), v druhé ose hodnoty GEO (geografická oblast)."
    url="https://ec.europa.eu/eurostat/databrowser/view/env_air_gge/default/table?lang=en"
    licence="CC BY 4.0"
    licence-url="https://creativecommons.org/licenses/by/4.0/"
    licence-proof="https://ec.europa.eu/info/legal-notice_en"
%}

Data emisí skleníkových plynů jsou shromažďována v rámci inventarizace emisí skleníkových plynů jednotlivých státu podle Rámcové úmluvy OSN o změně klimatu (UNFCCC). Za Evropskou unii data kompiluje EEA (_European Environmental Agency_) do souhrnné zprávy a dále data publikuje Eurostat.

### Přepočet na <glossary id='co2eq'>CO<sub>2</sub>eq</glossary>

Z databáze vybíráme hodnotu pro všechny sledované skleníkové plyny: CO<sub>2</sub> a další plyny (CH<sub>4</sub>, N<sub>2</sub>O, SF<sub>6</sub>, HFC, PFC, NF<sub>3</sub>) přepočtené na ekvivalentní množství CO<sub>2</sub> emisí pomocí [koeficientu GWP](https://en.wikipedia.org/wiki/Global_warming_potential#Values). Tento koeficient pro každý plyn zohledňuje jeho absorpční vlastnosti a dobu, po kterou zůstane v atmosféře. V souladu s Kjótským protokolem data používají pro přepočet časový horizont 100 let.

### Kategorie emisí podle zdroje

Emise jsou rozděleny podle jejich zdrojů podle metodiky UNFCCC nazvané CRF (_Common Reporting Format_). Pro naše účely vybíráme souhrnnou kategorii TOTX4_MEMONIA, která obsahuje všechny sektory přímých a nepřímých emisí kromě memo položek (s výjimkou mezinárodní letecké dopravy, která je zahrnuta) a kromě položky LULUCF:

* Memo položky jsou položky, které se reportují v rámci CRF, ale nejsou zahrnuty do celkové sumy emisí pro danou zemi, protože jejich přiřazení jednotlivým zemím je problematické. Tyto položky obsahují např. mezinárodní leteckou a lodní dopravu.
* Data pro mezinárodní leteckou dopravu jsou založena na množství paliva prodaného (tedy natankovaného) na území daného státu, a tedy není přesnou reprezentací spotřeby občanů daného státu. Pro případ Česka je tedy pravděpodobně podhodnocený (mnoho Čechů létá z Vídně či Bratislavy) a neodpovídá zcela množství emisí, které Češi způsobí (typicky např. let českého člověka do New Yorku s přestupem v Amsterdamu se započítá do zobrazených emisí jen jako Praha–Amsterdam, zatímco emise z letu Amsterdam–New York se započtou Nizozemí). Není také započítáno, že emise vypuštěné vysoko v atmosféře mají přibližně dvojnásobný oteplovací efekt, ani druhotný oteplující efekt kondenzačních stop letadel.
* LULUCF: _Land Use / Land Use Change / Forestry_ (využití zemědělské půdy, změna využití zemědělské půdy a lesnictví) v našich grafikách nezahrnujeme z prezentačních důvodů. Emise v tomto sektoru jsou ve většině zemí Evropy (včetně České republiky) nepříliš velké, ale hlavně záporné, a tudíž je těžké je srozumitelně zobrazit v jednom grafu s kladnými položkami.

Detailní metodické pokyny k shromažďování dat o emisích CRF (_Common Reporting Format_) nabízí např. (starší) [dokument UNFCCC](https://unfccc.int/resource/docs/cop5/07.pdf). [Více kontextu](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Greenhouse_gas_emission_statistics&redirect=no#Trends_in_greenhouse_gas_emissions) této statistiky také nabízí Eurostat.

## Velikost populace

{% include data-header.html
    name="Eurostat"
    description="dataset demo_pjan"
    url="https://ec.europa.eu/eurostat/databrowser/view/tps00001/default/table?lang=en"
    licence="CC BY 4.0"
    licence-url="https://creativecommons.org/licenses/by/4.0/"
    licence-proof="https://ec.europa.eu/info/legal-notice_en"
%}

Z tohoto datasetu vybíráme pouze data za rok 2023.
