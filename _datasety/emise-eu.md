---
layout:     dataset
title:      "Emise EU"
slug:       "emise-eu"
weight:     10
tags:       [ emise, eu ]
caption:    "Dataset obsahuje dva indikátory pro všechny státy EU (a některé další státy): Velikost populace (k 1. 1. 2016) a Emise skleníkových plynů (CO2, N2O, CH4, HFC, PFC, SF6, NF3 a přepočet na CO2eq, pro rok 2016)."
dataset-url:    "https://docs.google.com/spreadsheets/d/1KNL5d1CwLsLc8INquN7z5ABdr52APEsDjEsUcYGh_Mk/edit#gid=979818322"
data-orig:  [ [ "Zdrojová data Eurostat", "https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=env_air_gge&lang=en" ] ]
---
<div class="section"><div class="container" markdown="1">

## Emise skleníkových plynů

{% include warning.html
    title="Tato data nejsou úplně aktuální"
    text="V současnosti už jsou pro oba indikátory k dispozici data i za rok 2017, zatím jsme datovou sadu neaktualizovali."
%}

<div class="row"><div class="col-md-6">
{% include data-header.html
    name="Eurostat"
    description="Dataset env_air_gge V tabulce zobrazujeme souhrnné hodnoty všech skleníkových plynů (GHG) pro rok 2016 v milionech tun CO2eq, v jedné ose hodnoty SRC_CRF (kategorie zdroje emisí), v druhé ose hodnoty GEO (geografická oblast)."
    url="https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=env_air_gge&lang=en"
    licence="CC BY 4.0"
    licence-url="https://creativecommons.org/licenses/by/4.0/"
    licence-proof="https://ec.europa.eu/info/legal-notice_en"
%}
</div><div class="col-md-6">
{% include data-header.html
    name="EEA (European Environmental Agency)"
    description="dataset demo_pjan"
    url="https://www.eea.europa.eu/data-and-maps/data/national-emissions-reported-to-the-unfccc-and-to-the-eu-greenhouse-gas-monitoring-mechanism-15"
    licence="Licence EEA (podobná CC BY) – TODO pridat odkaz"
    licence-url="#"
    licence-proof="https://www.eea.europa.eu/legal/copyright"
%}
</div></div>

**Data emisí skleníkových plynů** jsou shromažďována v rámci inventarizace emisí skleníkových plynů jednotlivých státu podle Rámcové úmluvy OSN o změně klimatu (UNFCCC). Za evropskou unii data kompiluje EEA (European Environmental Agency) do souhrnné zprávy a dále data publikuje Eurostat.

**Přepočet na CO2eq.** Z databáze vybíráme hodnotu pro všechny sledované skleníkové plyny: CO2 a další plyny (CH4, N2O, SF6, HFC, PFC, NF3) přepočtené na ekvivalentní množství CO2 emisí pomocí potenciálu globálního oteplování (GWP). Tento potenciál u každého plynu závisí na jeho radiačních vlastnostech, molekulární váze a na době, po kterou zůstane v atmosféře. V souladu s Kjótským protokolem data používají pro přepočet časový horizont 100 let. Konstanty GWP použité pro přepočet jsou v podle IPCC AR4, což byla [platná metodika](https://unfccc.int/process-and-meetings/transparency-and-reporting/methods-for-climate-change-transparency/common-metrics) UNFCCC pro rok 2016. Konkrétně jsou to hodnoty 25 pro CH4, 298 pro N20, 22800 pro SF6 a 17200 pro NF3. HFC a PFC zahrnují celou řadu plynů s rozdílnými koeficienty, všechny hodnoty najdete v tabulce 2.14 v [errata k AR4](https://www.ipcc.ch/site/assets/uploads/2018/05/ar4-wg1-errata.pdf).

**Kategorie emisí podle zdroje.** Emise jsou rozděleny podle jejich zdrojů podle metodiky UNFCCC nazvané CRF (Common Reporting Format). Pro naše účely vybíráme souhrnnou kategorii TOTX4_MEMONIA, která obsahuje všechny sektory přímých a nepřímých emisí kromě memo položek (s výjimkou mezinárodní letecké dopravy, která je zahrnuta) a kromě položky LULUCF:

* Memo položky jsou položky, které se reportují v rámci CRF, ale nejsou zahrnuty do celkové sumy emisí pro danou zemi, protože jejich přiřazení jednotlivým zemím je problematické. Tyto položky obsahují např. mezinárodní leteckou a lodní dopravu.
* Data pro mezinárodní leteckou dopravu jsou založena na množství paliva prodaného (tedy natankovaného) na území daného státu, a tedy není přesnou reprezentací spotřeby občanů daného státu. Pro případ Česka je tedy pravděpodobně podhodnocený (mnoho Čechů létá z Vídně či Bratislavy) a neodpovídá zcela množství emisí, které Češi způsobí (typicky např. let českého člověka do New Yorku s přestupem v Amsterdamu se započítá do zobrazených emisí jen jako Praha–Amsterdam, zatímco emise z letu Amsterdam–New York se započtou Nizozemí). Není také započítáno, že emise vypuštěné vysoko v atmosféře mají přibližně dvojnásobný efekt, ani druhotný oteplující efekt kondenzačních stop letadel.
* LULUCF: Land Use -- Land Use Change-- Forestry (využítí zemědělské půdy, změna využítí zemědělské půdy a lesnictví), má smysl oddělit od zbytku, protože TODO a také proto je v našich grafikách nezahrnujeme. Emise v tomto sektoru jsou ve většině zemí Evropy (včetně České republiky) záporné.

Detailní metodické pokyny k shromažďování dat o emisích CRF (Common Reporting Format) nabízí např. (starší) [dokument UNFCCC](https://unfccc.int/resource/docs/cop5/07.pdf). [Více kontextu](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Greenhouse_gas_emission_statistics&redirect=no#Trends_in_greenhouse_gas_emissions) této statistiky také nabízí Eurostat.

</div></div>
<div class="section"><div class="container" markdown="1">

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

</div></div>
