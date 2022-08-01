---
layout:      infographic
title:       "Srovnání scénářů transformace elektroenergetiky ČR"
slug:        "srovnani-energetickych-scenaru-cr"
redirect_from: "/srovnani-scenaru"
published:   2020-11-20
weight:      73
tags-scopes: [ cr ]
tags-topics: [ energetika, opatreni ]
caption:     "Srovnání pěti nedávných scénářů pro transformaci české elektroenergetiky do roku 2030. Scénáře se radikálně liší ve svém dopadu na snížení emisí skleníkových plynů souvisejících s výrobou elektřiny. Stejně tak se scénáře liší zaměřením a použitou metodikou."
data-our:    "https://docs.google.com/spreadsheets/d/14CB428mF-_iHTgrLb2Dd0zJZ4xHUMdGhbr_FZ2fZy6k/edit"
data-orig:
  - [ "Ember", "https://ember-climate.org/project/coal-free-czechia-2030/" ]
  - [ "Energynautics", "https://en.frankbold.org/sites/default/files/publikace/czech_grid_without_coal_by_2030_fin_0.pdf" ]
  - [ "Energynautics (navazující studie)", "https://frankbold.org/sites/default/files/publikace/sensitivity_analysis_czech_grid_without_coal_by_2030.pdf" ]
  - [ "BloombergNEF", "https://data.bloomberglp.com/professional/sites/24/BNEF-white-paper-EU-coal-transition-Final-6-July.pdf" ] 
  - [ "NECP", "https://www.mpo.cz/cz/energetika/strategicke-a-koncepcni-dokumenty/vnitrostatni-plan-ceske-republiky-v-oblasti-energetiky-a-klimatu--252016/" ]
---

V této infografice dáváme srovnání více scénářů vývoje [elektroenergetiky](/temata/energetika#scenare-2030-cr) v ČR.

## Jak číst tento graf

**V horní části grafiky** srovnáváme stav v roce 2019 a stav v roce 2030 podle **výroby elektřiny**: Tento parametr zachycuje, kolik které zdroje elektřiny dodají do přenosové soustavy. Formálně je to tzv. _čistá výroba_, která nepočítá elektřinu, kterou elektrárny samy spotřebují. Snížení celkové výroby znamená, že se (vlivem úspor) sníží spotřeba, že se sníží _čistý vývoz_ nebo že dokonce budeme více elektřiny dovážet než vyvážet.

{% include preview-box.html
    title="Jednotlivé scénáře"
    class="double-preview-box"
    card_class="col-6 p-1"
    text="Ke každému scénáři jsme připravili detailní samostatnou infografiku."
    slug="2020-scenar-bloombergnef,2020-scenar-ember,2020-scenar-mckinsey,2018-scenar-energynautics,2019-scenar-necp"
%}

Postupný odklon od fosilních zdrojů a nejvíce pak od uhlí znamená snížení **emisí skleníkových plynů**. Každá studie takové snížení počítá pomocí vlastní metodiky (a nebo nepočítá vůbec). Proto pro všechny studie **uvádíme náš výpočet snížení emisí**, založený na rozdílu v mixu výroby mezi lety 2019 a 2030 a na emisních koeficientech od IPCC. Více o metodice výpočtu najdete níže.

**Ve spodní části grafiky** srovnáváme vybrané aspekty jednotlivých scénářů. V této tabulce ukazujeme rozdíl v zaměření jednotlivých scénářů a v metodice použité při jejich vytváření.

Samozřejmě bylo v průběhu let zpracováno více scénářů transformace české energetiky, než jsme schopni srovnat v jedné grafice, více jich najdete v naší [rešerši](/2020-reserse-transformace-energetiky).

### V čem se scénáře liší

Nejzásadnější rozdíl je v samotném **energetickém mixu** a tím pádem v dopadu scénářů na snížení <glossary id="antropogennisklenikoveplyny">emisí skleníkových plynů</glossary>. Tato metrika nejvíce souvisí s podílem uhlí a zemního plynu na výrobě elektřiny. Scénáře se ovšem také podstatně liší v poměru mezi výrobou ze slunce, větru a z biomasy a bioplynu. Jediné scénáře BloombergNEF a McKinsey mají biomasu a bioplyn jako součást tržní optimalizace a docházejí k překvapivému snížení výroby. Scénář BloombergNEF má také výrazný nepoměr mezi sluncem a větrem -- ve prospěch větrných elektráren, které mají oproti solárním panelům vyrovnanější výrobu během dne i během roku. Díky tomu si tak tento mix dokáže vystačit s menším množstvím instalovaného výkonu plynových elektráren.

Scénáře se liší v **míře předvídaného [uhelného phase-outu](/infografiky/uhelny-phaseout-eu)**. Scénáře NECP a McKinsey plánují odstavení jen některých uhelných elektráren. Scénář Energynautics uvažuje odstavení všech uhelných _elektráren_, přesto zbývá nezanedbatelná výroba elektřiny z uhelných tepláren (kombinovaná výroba elektřiny a tepla). Scénáře Ember a BloombergNEF zacházejí nejdále a počítají s odstavením všech uhelných _elektráren i tepláren_.

Scénáře se v poslední řadě liší ve svém **zaměření a metodice**. Například scénář Energynautics se zaměřuje na stabilitu přenosové soustavy, a proto stanovuje instalovaný výkon jednotlivých zdrojů na základě expertních odhadů. Naopak scénáře Ember, BloombergNEF a McKinsey hledají změny v instalovaném výkonu pomocí tržní optimalizace. Scénář Ember při tom v rámci zadání zkoumá, jak by vypadala varianta úplného uhelného phase-outu, zatímco scénáře BloombergNEF a McKinsey posuzují variantu s celkově nejnižšími náklady.

{% include includes-local/energeticke-scenare/v-cem-se-shoduji.md %}

## Metodické komentáře ke grafice

### Rozdělení zdrojů do kategorií: rok 2019

Pro výrobu za rok 2019 vycházíme z dat [Energetického regulačního úřadu](https://www.eru.cz) (ERÚ) a uvažujeme množství vyrobené elektřiny z dané suroviny nehledě na typ elektrárny, ve které byla vyrobena.

Kromě toho zbývá malá kategorie ostatní výroby, kterou pro přehlednost nezobrazujeme (protože energetické scénáře je typicky neuvádějí). Tvoří ji komunální a průmyslový odpad, odpadní teplo, topné oleje a ostatní kapalná paliva a činí 0,27 TWh, tedy jen asi 0,3 % celkové výroby.

### Rozdělení zdrojů do kategorií: rok 2030

**[BloombergNEF](/studie/2020-scenar-bloombergnef):** Oproti číslům ve studii upravujeme výrobu vodních elektráren tak, aby byla porovnatelná s dalšími elektroenergetickými studiemi, tj. vynecháváme přečerpávací elektrárny. Pro samotné vodní elektrárny tedy odvozujeme plánovanou výrobu od současného koeficientu využití a plánovaného instalovaného výkonu.

**[Ember](/studie/2020-scenar-ember):** Oproti číslům ve studii mírně upravujeme kategorizaci, aby více odpovídala našemu rozdělení pro rok 2019 a také dalším studiím.

* **Plyn:** Studie Ember jako plyn označuje pouze paroplynové elektrárny a nové plynové kogenerační jednotky, protože stávající kogenerační jednotky nejsou předmětem optimalizace v jejich modelu. My je k této kategorii přidáváme, konkrétně kategorii _Other thermal_ z jejich podkladových dat. Kromě stávajících kogeneračních jednotek jsou v kategorii _Other thermal_ další zařízení, jako například spalovny odpadu. Ty jsou ovšem zanedbatelné instalovaným výkonem i výrobou, a tak jejich zařazení do kategorie plyn nemá znatelný vliv na grafiku ani na odhad emisí.
* **Biomasa a bioplyn:** Studie tuto kategorii neuvádí (protože není předmětem optimalizace v modelu), my do ní z podkladových dat vybíráme kategorii _Other renewable_, což je v naprosté většině právě biomasa a bioplyn (kromě toho také biologicky rozložitelný komunální odpad).

**[McKinsey](/studie/2020-scenar-mckinsey):** Stejně jako u studie BloombergNEF, oproti číslům ve studii upravujeme výrobu vodních elektráren tak, aby byla porovnatelná s dalšími elektroenergetickými studiemi, tj. vynecháváme přečerpávací elektrárny. Pro samotné vodní elektrárny tedy opět odvozujeme plánovanou výrobu od současného koeficientu využití a plánovaného instalovaného výkonu.

Studie se také odlišuje v kategorizaci bioplynu, který oproti nám zařazuje do kategorie plyn. Přesné množství bioplynu ve scénáři není známé a dle vyjádření autorů je toto množství velmi malé, a tak jsme hodnoty ve scénáři neupravovali. Kategorie plyn zde tedy zahrnuje i malé množství bioplynu a kategorie biomasa a bioplyn ve skutečnosti zahrnuje pouze biomasu.

**[Energynautics](/studie/2018-scenar-energynautics):** Čísla udávaná přímo ve studii dobře odpovídají naší kategorizaci, takže je přímo přebíráme.

**[NECP](/studie/2019-scenar-necp):** Čísla o výrobě přebíráme přímo ze studie (ve skutečnosti jsou kombinací dvou tabulek, jedna udává výrobu z obnovitelných zdrojů v TJ, druhá výrobu z konvenčních zdrojů v TWh).

{% include includes-local/energeticke-scenare/emise.md %}
