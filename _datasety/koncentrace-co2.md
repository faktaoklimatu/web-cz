---
layout:     dataset
title:      "Vývoj koncentrace CO₂ a O₂ v atmosféře"
slug:       "koncentrace-co2"
published:  2020-04-19
weight:     10
tags-scopes: [ svet ]
tags-topics: [ klima ]
caption:    "Dataset obsahuje tři různé datové řady pro CO₂ lišící se časovým rozsahem, zdrojem dat i metodikou a jednu datovou řadu pro koncentrace O₂. Koncentrace CO₂ jsou uvedeny v jednotkách ppm."
data-our:   "https://docs.google.com/spreadsheets/d/1DYrIsmgy_S6IIWGtsk55Jor6zSDrf6-qT8Og9n7oDoU/edit?usp=sharing"
data-orig:	[ [ "EPICA", "ftp://ftp.ncdc.noaa.gov/pub/data/paleo/icecore/antarctica/epica_domec/edc-co2-2008.xls" ]
            , [ "Scripps", "https://scrippsco2.ucsd.edu/data/atmospheric_co2/icecore_merged_products" ]
            , [ "Keelingova křivka", "https://scripps.ucsd.edu/programs/keelingcurve/" ] 
            , [ "Koncentrace O₂", "http://scrippso2.ucsd.edu/osub2sub-data.html"]]
---

<div class="section"><div class="container" markdown="1">

## Keelingova křivka, rok 1958–současnost

{% include data-header.html
    name="Scripps Institution of Oceanography"
    description="C. D. Keeling, S. C. Piper, R. B. Bacastow, M. Wahlen, T. P. Whorf, M. Heimann, and H. A. Meijer, Exchanges of atmospheric CO2 and 13CO2 with the terrestrial biosphere and oceans from 1978 to 2000. I. Global aspects, SIO Reference Series, No. 01-06, Scripps Institution of Oceanography, San Diego, 88 pages, 2001. http://escholarship.org/uc/item/09v319r9"
    url="https://scrippsco2.ucsd.edu/data/atmospheric_co2/primary_mlo_co2_record.html"
    doi="http://doi.org/10.6075/J08W3BHW"
    licence="CC BY 4.0"
    licence-url="http://creativecommons.org/licenses/by/4.0/"
    licence-proof="http://doi.org/10.6075/J08W3BHW"
%}

Data pochází z instrumentálního měření na Mauna Loa na Havaji. Používá se pro ně velmi přesné manometricky kalibrované spektroskopické měření, které vyvinul Charles Keeling. Konstrukci měřicích přístrojů i příběh Charlese Keelinga podrobně popisuje článek v Analytical Chemistry: [Charles David Keeling and the Story of Atmospheric CO<sub>2</sub> Measurements](https://pubs.acs.org/doi/full/10.1021/ac1001492). V odebraných vzorcích vzduchu se sleduje nejen koncentrace CO<sub>2</sub> v jednotkách <glossary id='ppm'>ppm</glossary>, ale i isotopické složení uhlíku (poměr zastoupení <sup>12</sup>C, <sup>13</sup>C a <sup>14</sup>C). Toto složení pomáhá určit, z jakého zdroje uhlík pochází, zda ze spalování fosilních paliv, z dýchání rostlin, ze sopky apod. Přesnost měřených hodnot je ± 0.1 ppm (podle [původního Keelingova článku](https://scrippsco2.ucsd.edu/assets/publications/keeling_tellus_1960.pdf) i podle [Mezinárodního ústavu pro míry a váhy](https://www.bipm.org/utils/common/pdf/chemistry/GAS2015_poster_CO2.pdf)). Názorně metodu měření přibližuje [popularizační video](https://scripps.ucsd.edu/programs/keelingcurve/2018/04/12/video/) Ralpha Keelinga.

Datová sada obsahuje jen měsíční průměry měření, detailní denní a týdenní průměry jsou ke stažení zvlášť na [stránce měřící stanice](https://scrippsco2.ucsd.edu/data/atmospheric_co2/mlo.html). Při počítání průměrných hodnot je časová řada očištěna o měření, která se výrazně odchylují od okolních měření. Takové odchylky bývají způsobeny vlivem ostrovní vegetace z nižší nadmořské výšky (některá odpoledne k měřící stanici zavane tento vzduch s nižší koncentrací CO<sub>2</sub>), případně vyšší sopečnou aktivitou (která naopak koncentraci CO<sub>2</sub> zvyšuje). Stejně tak bývají některé hodnoty zpětně aktualizovány kvůli rekalibraci referenčních plynů a dalším kontrolám kvality. Další informace o zpracování měřených dat najdete v [článku](https://scripps.ucsd.edu/programs/keelingcurve/2014/07/28/how-is-co2-data-processed/) na webových stránkách ústavu.

</div></div>
<div class="section"><div class="container" markdown="1">

## Kompozitní dataset Scripps, posledních 2000 let

{% include data-header.html
    name="Scripps Institution of Oceanography"
    description="Macfarling Meure, C. et al., 2006: Law Dome CO2, CH4 and N2O ice core records extended to 2000 years BP. Geophysical Research Letters, 33."
    url="https://scrippsco2.ucsd.edu/data/atmospheric_co2/icecore_merged_products.html"
    doi="https://doi.org/10.1029/2006GL026152"
    licence="zdarma k použití, vyžaduje odkázání zdroje"
    licence-proof="https://scrippsco2.ucsd.edu/data/atmospheric_co2/icecore_merged_products.html"
%}

Tento dataset je složen ze dvou měření:

* Keelingovo měření z Mauna Loa (od roku 1958, viz výše) a z jižního pólu (od roku 1957, viz [stránka stanice](https://scrippsco2.ucsd.edu/data/atmospheric_co2/spo.html)).
* Měření historických koncentrací za posledních 2000 let z ledovcových vrtů v oblasti Law Dome ve východní Antarktidě (66°46′08″S, 112°48′28″E). Měření byla prováděna postupně z různých vrtů, proto je nejvíce vzorků pro nejbližších 200 let, o něco méně vzorků pro předchozích 1000 let a nejméně vzorků z prvního tisíciletí našeho letopočtu.

Historické koncentrace jsou měřeny stejnou metodou jako Keelingovo měření výše. Jen vzorky vzduchu jsou odlišné, jde o vzduch zachycený v bublinkách v ledu. Stáří vzduchu je určeno hloubkou a radioizotopovým datováním.

Jsou současná měření a historická data srovnatelná? Měřené hodnoty z bublinek v ledu antarktického ledovce a současná měření se velmi přesně překrývají. Zároveň historická data z různých ledovců (Antarktida, Grónsko, horské ledovce) jsou vysoce konzistentní. Jediným omezením ledovcových dat je, že získaná koncentrace odpovídá zhruba desetiletému klouzavému průměru koncentrací, kvůli difuzi vzduchu v pomalu tuhnoucích vrchních vrstvách firnu.

</div></div>
<div class="section"><div class="container" markdown="1">

## Kompozitní dataset EPICA, posledních 800 000 let

{% include data-header.html
    name="NOAA (National Oceanic and Atmospheric Administration)"
    description="Bereiter, B., Eggleston, S., Schmitt, J., Nehrbass‐Ahles, C., Stocker, T. F., Fischer, H., Kipfstuhl, S., and Chappellaz, J. ( 2015), Revision of the EPICA Dome C CO2 record from 800 to 600 kyr before present, Geophys. Res. Lett., 42, 542– 549."
    url="http://ncdc.noaa.gov/paleo/study/17975"
    doi="https://doi.org/10.1002/2014GL061957"
    licence="zdarma k použití, vyžaduje odkázání zdroje"
    licence-proof="https://www1.ncdc.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt"
%}

V rámci projektu EPICA (European Project for Ice Coring in Antartica) byly získány nejstarší vzorky ledu pro měření koncentrace CO<sub>2</sub> v rámci tohoto datasetu. Ty pocházejí ze dvou vrtů na Antarktidě:

* Epica-DML, u německé Kohnovy stanice (75°00′06″S; 00°04′04″E, hloubka vrtu 2 774 m).
* Dome C, u francouzsko-italské stanice Concordia (75°06′04″S; 123°20′52″E, hloubka vrtu 3 270 m).

Tento dataset je ovšem složen z měření z mnohem více ledovcových vrtů z dalších výzkumných projektů:

* Law Dome, viz dataset SCRIPPS výše.
* WAIS, měřený v rámci amerického výzkumného projektu v západní Antarktidě (79°28′04.8″S; 112°05′09.6″W, hloubka vrtu 3 405 m).
* Siple Dome, měřený v rámci amerického výzkumného projektu v Zemi Marie Byrdové (81°39′15″S 149°00′18″W, hloubka vrtu 974 m).
* TALDICE, měřený v rámci evropského výzkumného projektu v oblasti Talos Dome (72°49′40″S 159°11′00″E, hloubka vrtu 1620 m).
* Vostok, měřený od sedmdesátých let u sovětské polární stanice Vostok (78°27′50″S 106°50′15″E, hloubka nejhlubšího vrtu z roku 1996 je 3623 m).

Přestože mnohé z vrtů obsahují záznamy z širšího časového období, tento dataset je složen následujícím způsobem
(níže používané "BP" je zkratka pro *before present* a odkazuje pro roky před rokem 1950):

* -51–2000 let BP: Law Dome (Rubino et al., 2013, MacFarling Meure et al., 2006),
* 2–11 tisíc let BP: Dome C (Monnin et al., 2001 + 2004),
* 11–22 tisíc let BP: WAIS (Marcott et al., 2014), od těchto měření je odečteno 4 ppm pro vyvážení systematické chyby měření,
* 22–40 tisíc let BP: Siple Dome (Ahn et al., 2014),
* 40–60 tisíc let BP: TALDICE (Bereiter et al., 2012),
* 60–115 tisíc let BP: E-DML (Bereiter et al., 2012),
* 105–155 tisíc let BP: Dome C Sublimation (Schneider et al., 2013),
* 155–393 tisíc let BP: Vostok (Petit et al., 1999),
* 393–611 tisíc let BP: Dome C (Siegenthaler et al., 2005),
* 612–800 tisíc let BP: Dome C (Bereiter et al., 2014).

</div></div>
<div class="section"><div class="container" markdown="1">

## Koncentrace O<sub>2</sub> na Mauna Loa, rok 1989–současnost

{% include data-header.html
    name="Scripps Institution of Oceanography"
    description="Scripps O<sub>2</sub> Program, Atmospheric Oxygen Research."
    url="https://scrippso2.ucsd.edu/index.html"
    licence="otevřená vědecká data (licence není specifikovaná)"
%}

Tento dataset pochází z instrumentálního měření na sopce Mauna Loa na Havaji. Metodu pro velmi přesné měření koncentrací O<sub>2</sub> objevil v roce 1988 Ralph Keeling, syn Charlese Keelinga, a podrobně ji popsal ve své [disertační práci](http://bluemoon.ucsd.edu/publications/ralph/34_PhDthesis.pdf). Tato metoda spočívá v interferometrickém měření indexu lomu vzduchu, který je závislý na poměru koncentrací kyslíku a dusíku. Tento dataset tedy technicky obsahuje měření poměru koncentrace O<sub>2</sub>/N<sub>2</sub> a je udáván ve formě relativního rozdílu vůči referenčnímu vzorku přibližně z poloviny osmdesátých let (vynásobené milionem, proto je označována "per meg"). Přesnou definici této jednotky včetně převodu na ppm najdete na stránkách [Scrippsova O2 programu](http://scrippso2.ucsd.edu/units-and-terms.html). Podle těchto instrukcí jsme také převedli tato naměřená data na jednotky ppm, abychom je mohli srovnat s růstem koncentrace CO<sub>2</sub>.

</div></div>
