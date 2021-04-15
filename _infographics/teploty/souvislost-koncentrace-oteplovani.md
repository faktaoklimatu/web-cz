---
layout:     infographic
title:      "Souvislost koncentrace CO₂ a globálního oteplování"
slug:       "souvislost-koncentrace-oteplovani"
redirect_from: "/souvislost-koncentrace-oteplovani"
published:  2021-04-1
weight:     90
tags-scopes: [ svet ]
tags-topics: [ klima ]
caption:    "Z historických dat i modelování budoucího vývoje plyne, že oteplení planety je přibližně přímo úměrné nárůstu koncentrací CO<sub>2</sub> v atmosféře. Jinak řečeno, každé zvýšení koncentrací CO<sub>2</sub> o 10 ppm vede zvýšení teploty zhruba o 0,1 °C."
data-our:   "https://docs.google.com/spreadsheets/d/1aVn3Uz1wLUtmATagtZHEpeayiee6uy_BRAivZPwfb2s/edit?usp=sharing"
data-orig:	[ [ "Zdrojová data NASA", "https://data.giss.nasa.gov/gistemp/" ], [ "Keelingova křivka", "https://scripps.ucsd.edu/programs/keelingcurve/" ] ]

---

<p class="perex">

</p>

{% include preview-box.html
    text="V textu explaineru podrobněji vysvětlujeme přímou úměrnost mezi oteplením a zvýšením koncentrace CO<sub>2</sub> a vlivy dalších skleníkových plynů a aerosolů nebo setrvačnosti klimatu."
    slug="expl-souvislost-koncentrace-oteplovani"
%}


## Co je zobrazeno v grafu

Body v levé části grafu zobrazují jednotlivé roky v období 1884 - 2020. Umístění bodu vždy odpovídá hodnotám koncentrace CO<sub>2</sub> v daném roce (na vodorovné ose) a hodnotám teplotní anomálie pro daný rok (na svislé ose). V grafu je vidět, že závislost přibližně odpovídá přímé úměrnosti, kdy **každé zvýšení koncentrací CO<sub>2</sub> o 10 ppm vede zvýšení teploty zhruba o 0,1 °C**. Tuto závislost podrobněji diskutujeme níže v textu a v souvisejícím explaineru [Jak moc se oteplí, když se zvýší koncentrace CO₂?](/explainery/expl-souvislost-koncentrace-oteplovani). 

Body zobrazující jednotlivé roky jsou barevně odlišeny vždy po dvaceti letech a je tak vidět, že se nárůst koncentrací CO<sub>2</sub> v posledních letech zrychluje, což odpovídá zvyšjícím se každoročním emisím CO<sub>2</sub>.

V pravé části grafu pak zobrazujeme očekávané hodnoty oteplení pro vyšší koncentrace CO<sub>2</sub>, pokud budou emise pokračovat dosavadním tempem. 

## V čem je vztah mezi koncentrací CO<sub>2</sub> a oteplováním nepřesný?

Dominantní vliv oxidu uhličitého na oteplování je dobře prokázaný a **graf** tedy **zobrazuje kauzalitu** (příčinnou souvislost), nikoliv jen náhodnou korelaci. Na druhou stranu, oteplování je ovlivněno mnoha dalšími faktory: dalšími skleníkovými plyny, prouděnimi v atnomsféře a oceánu, které rozvádějí teplo po planetě, ale také  aerosoly a formováním oblačnosti, které mají stíníci efekt. Je tedy správné tvrdit, že každé zvýšení koncentrací CO<sub>2</sub> o 10 ppm vede zvýšení teploty zhruba o 0,1 °C ? V následujících odstavcích diskutujeme, v čem je vztah pouze přibližný. 

 * Teoreticky odvozený vztah pro závislost oteplení na koncentraci skleníkového plynu je logaritmický [^55], [^111]. V malém rozmezí koncentrací jej ale můžeme dobře aproximovat vztahem lineárním, což ukazují i změřená data.

 $$
 \Delta T(c) = S \cdot  log_2 (\frac{c_0 + \Delta c}{c_0}) \approx \frac{S}{c_0 ln 2} \cdot \Delta c 
 $$

 V tomto vztahu $$c_0$$ označuje počáteční koncentraci, $$\Delta c$$ nárůst koncentrace a $$S$$ je parametr zvaný *citlivost klimatu* a vyjadřuje, o kolik se zvýší teplota planety, když se zdvojnásobí koncentrace skleníkového plynu v atmosféře. **Přímá úměrnost mezi koncentracemi a oteplením přestane dýt dobrou aproximací, pokud nárůst koncentrací bude příliš velký**.FIXME: tento odstavec je pokračováním toho před rovnicí a má být odsazen odpovídajícím způsobem. prosím opravit při sazbě. ENF-FIXME.

 * Klimatický systém má setrvačnost - některé procesy dosahují rovnováhy během jednotek let, jiné během desítek
 či stovek let. Proto je potřeba rozlišovat **krátkodobou citlivost klimatu** (*TCR, Transient climate response*), která zohledňuje procesy v řádu jednotek let, **rovnovážnou citlivost klimatu** (*ECS, Equilibrium Climate Sensitivity*), která zohledňuje procesy v řádu desitek let a **dlouhodobou odezvu klimatu** (*ESS, Earth System sensitivity*), která zohledňuje procesy v řádu stovek a tisíců let [^105],[^107],[^66]. Ze současných modelů klimatického systému vychází hodnoty krátkodobé citlivosti klimatu *TCR* okolo 1,7 °C (v rozmezí 1.3 - 3.0°C) [^67] a hodnoty rovnovážné citlivosti klimatu *ECS* okolo 3°C (v rozmezí 2,3 - 4,7 °C) [^109],[^68]. Data, která zobrazujeme v grafu, jsou průběžná a odpovídají krátkodobé odezvě klimatu. Kdyby se koncentrace stabilizovaly, teploty by ještě několik desítek let rostly, než by se oteplování zastavilo na hodnotách odpovídajících rovnovážné citlivosti klimatu. Jinak řečeno, **přímá úměrnost mezi koncentracemi a oteplením přestane platit, když by se radikálně snížily emise CO<sub>2</sub> na hodnoty blízké nule.** V takovém případě by se koncentrace stabilizovaly, nebo začaly snižovat, ale teplota planety by ještě nějakou dobu rostla.          

* Oxid uhličitý zodpovídá přibližně za 70 % oteplení [^77]. Zbývajících 30 % je způsobeno dalšími skleníkovými plyny, zejména metanem a oxidem dusným, jejichž koncentrace v atmosféře také rostou. Spolu se skleníkovými plyny ale lidstvo vypouští i aerosoly, které mají na planetu ochlazující efekt, protože odráží sluneční záření a napomáhají vzniku mraků [^101]. Zobrazené oteplení zahrnuje všechny tyto jevy, ale na vodorovné ose jsou vynášeny jen koncentrace CO<sub>2</sub>. **Tvrzení o přímé úměrnosti mezi nárůstem koncentrací a oteplením je tedy zkreslující v tom, že ukazuje pouze závislost na dominantním faktoru.** Ochlazující efekt aerosolů a oteplující efekt dalších skleníkových plynů se ale částečně vyruší, a lze tedy tvrdit, že  CO<sub>2</sub> je řídícím faktorem z výrazně více než 70 %.

## Odkud pocházejí data v této infografice?

* Hodnoty teplotní anomálie pro jednotlivé roky pocházejí z datasetu *NASA Goddard Institute for Space Studies* a více se o konceptu teplotní anomálie můžete dočíst v doprovodném textu k infografice [Vývoj světové teplotní anomálie](/infografiky/vyvoj-teplotni-anomalie).

* Hodnoty koncentrace CO<sub>2</sub> pro jednotlivé roky vycházejí z měření *Scripps Institution of Oceanography* který je součástí <glossary id="noaa">NOAA</glossary>. Samostatně vývoj koncentrací CO<sub>2</sub> v atmosféře zpracováváme v grafice [Vývoj koncentrace CO₂ v atmosféře](/koncentrace-co2)

* Trendová křivka odpovídá rovnici $$\Delta T(c) = S \cdot log_2 (\frac{c}{c_0})$$, kde $$c$$ je koncentrace, $$c_0$$ počáteční koncentrace a $$S$$ je parametr průběžné citlivosti klimatu. Tento teoretický vztah se používá v idealizovaných podmínkách simulací buď jako vztah pro oteplení po ustanovení rovnováhy, kdy S odpovídá ECS (*Equilibrium Climate Sensitivity*) nebo pro průběžnou hodnotu oteplení při každoročním zvyšování koncentrace  CO<sub>2</sub> o 1 %, kdy S odpovídá TCR (*Transient Climate Response*). Ve zobrazených datech je ovšem oteplení nejen důsledkem zvýšení koncentrací CO<sub>2</sub>, ale také zvyšování koncentrací dalších skleníkových plynů. Proto hodnoty TCR a ECS zjištěné simulacemi bereme pouze jako orientační a hodnotu S pro zobrazení závislosti fitujeme. ( S = 2,37 °C). Pás nejistoty je zobrazen mezi S = 2,0 °C a S = 3,1 °C, což odpovídá profilu nejistoty v TCR i ECS částečně zohledňuje efekt setrvačnosti klimatu při stabilizaci koncentrací CO<sub>2</sub>.   

## Historická poznámka

Souvislost globálního oteplování a koncentrace atmosferického oxidu uhličitého je jednou z klíčových a nejdéle zkoumaných souvislostí v rámci studia klimatické změny. První výpočty publikoval Svante Arrhenius již v roce 1886 a jeho odhady citlivosti klimatu jsou potvrzovány a zpřesňovány dalšími studiemi. Podrobněji se o tom můžete dočíst v grafice a textu [Historie výzkumu skleníkového efektu](/infografiky/historie-sklenikoveho-efektu) 


## Zdroje a další odkazy

[^55]: Přesněji řečeno, radiační působení (*radiatative forcing*) je přímo úměrné logaritmu koncentrace a oteplení je přímo úměrné radiačnímu působení, podrobněji viz [en.wikipedia: Radiative Forcing](https://en.wikipedia.org/wiki/Radiative_forcing)

[^66]: Podrobnější diskuse o konceptu citlivosti klimatu včetně různých časových škál [en.wikipedia: Measures of Climate Sensitivity](https://en.wikipedia.org/wiki/Climate_sensitivity#Measures_of_climate_sensitivity)

[^67]: G.A. Meehl et. al. [Context for interpreting equilibrium climate sensitivity and transient climate response from the CMIP6 Earth system models](https://advances.sciencemag.org/content/6/26/eaba1981)

[^68]: S. C. Sherwood, Webb, et. al. [An Assessment of Earth's Climate Sensitivity Using Multiple Lines of Evidence](https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2019RG000678)

[^80]: Matthews, H.D., Tokarska, K.B., Nicholls, Z.R.J. et al. [Opportunities and challenges in using remaining carbon budgets to guide climate policy. Nat. Geosci. 13, 769–779 (2020).](https://doi.org/10.1038/s41561-020-00663-3)

[^77]: [Annual Greengouse Gas index](https://www.globalchange.gov/browse/indicators/annual-greenhouse-gas-index)

[^101]: Myhre, G., Myhre, C. E.L., Samset, B. H. & Storelvmo, T. (2013) [Aerosols and their Relation to Global Climate and Climate Sensitivity, *Nature Education Knowledge*](https://www.nature.com/scitable/knowledge/library/aerosols-and-their-relation-to-global-climate-102215345/)

[^105]: Knutti R. Hegerl. [Beyond Equilibrium Climate Sensitivity](https://www.nature.com/articles/ngeo3017), otevřená verze článku [zde](https://www.research-collection.ethz.ch/handle/20.500.11850/197761)

[^107]: Carbon Brief explainer: [How scientists estimate climate sensitivity](https://www.carbonbrief.org/explainer-how-scientists-estimate-climate-sensitivity)

[^109]: Carbon brief guest post: [Why low-end climate sensitivity can now be ruled out](https://www.carbonbrief.org/guest-post-why-low-end-climate-sensitivity-can-now-be-ruled-out)

[^111]: Sceptical science: [How could global warming accelerate if CO₂ is 'logarithmic'?](https://skepticalscience.com/why-global-warming-can-accelerate.html)


