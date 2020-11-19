---
layout:      infographic
title:       "Srovnání scénářů transformace elektroenergetiky ČR"
slug:        "srovnani-energetickych-scenaru-cr"
published:   2020-11-20
weight:      73
tags-scopes: [ cr ]
tags-topics: [ energetika, opatreni ]
caption:     "TODO"
data-our:    "https://docs.google.com/spreadsheets/d/16fITQ_Y51CWL1co734tU5hHQUAf298chxxr3q0-lFWI/edit"
# data-orig:   []
---

## Jak číst tento graf

V této infografice dáváme srovnání [různých scénářů](/temata/energetika) vývoje elektroenergetiky v ČR.

Stav v roce 2019 a stav v roce 2030 srovnáváme podle **výroby elektřiny**: Tento parametr zachycuje, kolik které zdroje elektřiny dodají do přenosové soustavy. Formálně je to tzv. _čistá výroba_, která nepočítá elektřinu, kterou elektrárny samy spotřebují. Snížení celkové výroby znamená, že se (vlivem úspor) sníží spotřeba, že se sníží _čistý vývoz_ nebo že dokonce budeme více elektřiny dovážet než vyvážet.

**Emise skleníkových plynů:** Postupný odklon od fosilních zdrojů a nejvíce pak od uhlí znamená snížení emisí skleníkových plynů. Každá studie takové snížení počítá pomocí vlastní metodiky (a nebo nepočítá vůbec). Proto pro všechny studie **uvádíme náš výpočet snížení emisí** založený na rozdílu v mixu výroby mezi lety 2019 a 2030 a na emisních koeficientech od IPCC. Více o metodice výpočtu najdete níže.

{% include _texts/energeticke-scenare/v-cem-se-shoduji.md %}

<details markdown=1>
<summary>
<h2>Metodické komentáře ke grafice</h2>
</summary>

### Rozdělení zdrojů do kategorií: rok 2019

Pro výrobu za rok 2019 vycházíme z dat [Energetického regulačního úřadu](https://www.eru.cz) (ERÚ) a uvažujeme množství vyrobené elektřiny z dané suroviny nehledě na typ elektrárny, ve které byla vyrobena.

Kromě toho zbývá malá kategorie ostatní výroby, kterou pro přehlednost nezobrazujeme (protože energetické scénáře je typicky neuvádějí). Tvoří ji komunální a průmyslový odpad, odpadní teplo, topné oleje a ostatní kapalná paliva a činí 0,27 TWh, tedy jen asi 0,3 % celkové výroby.

### Rozdělení zdrojů do kategorií: rok 2030

**[Ember](/studie/2020-scenar-ember):** Oproti číslům udávaným v samotné studii mírně upravujeme kategorizaci, aby více odpovídala našemu rozdělení pro rok 2019 a také dalším studiím.

* **Plyn:** Studie Ember jako plyn označuje pouze paroplynové elektrárny a nové plynové kogenerační jednotky, protože stávající kogenerační jednotky nejsou předmětem optimalizace v jejich modelu. My je této kategorii přidáváme, konkrétně kategorii “Other thermal” z jejich podkladových dat. Kromě stávajících kogeneračních jednotek jsou v kategorii _Other thermal_ další zařízení, jako například spalovny odpadu. Ty jsou ovšem zanedbatelné instalovaným výkonem i výrobou, a tak jejich zařazení do kategorie plyn nemá znatelný vliv na grafiku ani na odhad emisí.
* **Biomasa a bioplyn:** Studie tuto kategorii neuvádí (protože není předmětem optimalizace v modelu), my do ní z podkladových dat vybíráme kategorii _Other renewable_, což je v naprosté většině právě biomasa a bioplyn (kromě toho také biologicky rozložitelný komunální odpad).

**[BloombergNEF](/studie/2020-scenar-bloombergnef):** Oproti číslům udávaným v samotné studii jen upravujeme výrobu vodních elektráren: studie uvádí součet vodních i přečerpávacích. Protože studie nepočítá se stavbou nových přečerpávacích elektráren, tak od této jejich predikce odpočítáváme skutečnou výrobu v roce 2019.

**[Energynautics](/studie/2018-scenar-energynautics):** Čísla udávaná přímo ve studii dobře odpovídají naší kategorizaci, takže je přímo přebíráme.

**[NECP](/studie/2019-scenar-necp):** Čísla o výrobě přebíráme přímo ze studie (ve skutečnosti jsou kombinací dvou tabulek, jedna udává výrobu z obnovitelných zdrojů v TJ, druhá výrobu z konvenčních zdrojů v TWh).

{% include _texts/energeticke-scenare/emise.md %}
</details>
