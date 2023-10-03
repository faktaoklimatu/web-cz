---
layout:     dataset
title:      "Emise skleníkových plynů EU"
slug:       "emise-eu"
published:  2020-04-19
weight:     60
tags-scopes: [ eu ]
tags-topics: [ emise ]
caption:    "Dataset obsahuje dva indikátory pro všechny státy EU (a některé další státy): Velikost populace k 1. 1. 2016 a Emise skleníkových plynů (CO<sub>2</sub>, N<sub>2</sub>O, CH<sub>4</sub>, HFC, PFC, SF<sub>6</sub>, NF<sub>3</sub> a přepočet na tuny CO<sub>2</sub>eq) za rok 2016."
data-our:    "https://docs.google.com/spreadsheets/d/13ELU4C1XTQO4O99fcvP6b0AlmkW_ptik59_Nq6Fqv4s/edit?usp=sharing"
data-orig:  [ [ "Zdrojová data Eurostat", "https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=env_air_gge&lang=en" ] ]
---

## Emise skleníkových plynů

{% include warning.html
    title="Tato data nejsou úplně aktuální"
    text="V současnosti už jsou pro oba indikátory k dispozici data i za rok 2017, zatím jsme datovou sadu neaktualizovali."
%}


{% include data-header.html
    name="Eurostat"
    description="Dataset env_air_gge. V tabulce zobrazujeme souhrnné hodnoty všech <glossary id='antropogennisklenikoveplyny'>skleníkových plynů (GHG)</glossary> pro rok 2016 v milionech tun <glossary id='co2eq'>CO<sub>2</sub>eq</glossary>, v jedné ose hodnoty SRC_CRF (kategorie zdroje emisí), v druhé ose hodnoty GEO (geografická oblast)."
    url="https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=env_air_gge&lang=en"
    licence="CC BY 4.0"
    licence-url="https://creativecommons.org/licenses/by/4.0/"
    licence-proof="https://ec.europa.eu/info/legal-notice_en"
%}

{% include data-header.html
    name="EEA (European Environmental Agency)"
    description="Dataset demo_pjan. Agentura EEA je pověřená tato data shromažďovat od členských států EU, Eurostat tato data jen přebírá (ovšem má lepší rozhraní pro prohlížení dat)."
    url="https://www.eea.europa.eu/data-and-maps/data/national-emissions-reported-to-the-unfccc-and-to-the-eu-greenhouse-gas-monitoring-mechanism-15"
    licence="Licence EEA, podobná CC BY"
    licence-proof="https://www.eea.europa.eu/legal/copyright"
%}

Data emisí skleníkových plynů jsou shromažďována v rámci inventarizace emisí skleníkových plynů jednotlivých státu podle Rámcové úmluvy OSN o změně klimatu (UNFCCC). Za Evropskou unii data kompiluje EEA (_European Environmental Agency_) do souhrnné zprávy a dále data publikuje Eurostat.

### Přepočet na <glossary id='co2eq'>CO<sub>2</sub>eq</glossary>

Z databáze vybíráme hodnotu pro všechny sledované skleníkové plyny: CO<sub>2</sub> a další plyny (CH<sub>4</sub>, N<sub>2</sub>O, SF<sub>6</sub>, HFC, PFC, NF<sub>3</sub>) přepočtené na ekvivalentní množství CO<sub>2</sub> emisí pomocí [koeficientu GWP](https://en.wikipedia.org/wiki/Global_warming_potential#Values). Tento koeficient pro každý plyn zohledňuje jeho absorpční vlastnosti a dobu, po kterou zůstane v atmosféře. V souladu s Kjótským protokolem data používají pro přepočet časový horizont 100 let. Koeficienty GWP použité pro přepočet jsou podle IPCC AR4, což byla [platná metodika](https://unfccc.int/process-and-meetings/transparency-and-reporting/methods-for-climate-change-transparency/common-metrics) UNFCCC pro rok 2016. Konkrétně jsou to hodnoty 25 pro CH<sub>4</sub>, 298 pro N<sub>2</sub>0, 22800 pro SF<sub>6</sub> a 17200 pro NF<sub>3</sub>. HFC a PFC zahrnují celou řadu plynů s rozdílnými koeficienty, všechny hodnoty najdete v tabulce 2.14 v [errata k AR4](https://www.ipcc.ch/site/assets/uploads/2018/05/ar4-wg1-errata.pdf).

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
    url="http://appsso.eurostat.ec.europa.eu/nui/show.do?wai=true&dataset=demo_pjan"
    licence="CC BY 4.0"
    licence-url="https://creativecommons.org/licenses/by/4.0/"
    licence-proof="https://ec.europa.eu/info/legal-notice_en"
%}

Z tohoto datasetu vybíráme pouze data za rok 2016.
