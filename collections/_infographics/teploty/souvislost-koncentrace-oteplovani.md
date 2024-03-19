---
layout:     infographic
title:      "Souvislost koncentrace CO₂ a globálního oteplování"
slug:       "souvislost-koncentrace-oteplovani"
redirect_from: "/souvislost-koncentrace-oteplovani"
published:  2021-05-01
weight:     90
tags-scopes: [ svet ]
tags-topics: [ klima ]
caption:    "Z historických dat i modelování budoucího vývoje plyne, že oteplování planety je (přibližně) přímo úměrné nárůstu koncentrací CO<sub>2</sub> v atmosféře. Přesněji řečeno: každé zvýšení koncentrací CO<sub>2</sub> o 10 ppm (parts per million) vede k nárůstu teploty zhruba o 0,1 °C."
data-our:   "https://docs.google.com/spreadsheets/d/1tAKT3SMfaM4oeAZL-RSCgBTfJyKnyvsyao3yAQArd_U/edit?usp=sharing"
data-orig:  [ [ "Zdrojová data NASA", "https://data.giss.nasa.gov/gistemp/" ], [ "Keelingova křivka", "https://keelingcurve.ucsd.edu/" ] ]
---

{% include preview-box.html
    title="Podrobnější popis souvislostí"
    text="Přímou úměrnost mezi oteplením a zvýšením koncentrace CO<sub>2</sub> a také vliv dalších skleníkových plynů a aerosolů nebo vliv setrvačnosti klimatu podrobněji vysvětlujeme v tomto textu."
    slug="otepleni-zvysenim-koncentrace-co2"
%}

## Co je zobrazeno v grafu

Body v levé části grafu zobrazují jednotlivé roky v období 1884–2020. Umístění bodu vždy odpovídá hodnotám koncentrace CO<sub>2</sub> v daném roce (na vodorovné ose) a hodnotám teplotní anomálie pro daný rok (na svislé ose). V grafu je vidět, že závislost přibližně odpovídá přímé úměrnosti, kdy **každé zvýšení koncentrací CO<sub>2</sub> o 10 ppm vede k nárůstu teploty zhruba o 0,1 °C**. Tato závislost je podrobněji popsána níže v textu a také v souvisejícím článku [Jak moc se oteplí, když se zvýší koncentrace CO₂?](/explainery/otepleni-zvysenim-koncentrace-co2).

Body ukazující jednotlivé roky jsou barevně odlišeny (vždy po 20 letech), a je tak vidět, že se nárůst koncentrací CO<sub>2</sub> v posledních letech zrychluje, což odpovídá zvyšujícím se každoročním emisím CO<sub>2</sub>.

V pravé části grafu pak zobrazujeme očekávané hodnoty oteplení pro vyšší koncentrace CO<sub>2</sub>, pokud budou emise pokračovat dosavadním tempem.

## V čem je vztah mezi koncentrací CO<sub>2</sub> a oteplováním nepřesný?

Dominantní vliv oxidu uhličitého na oteplování je dobře prokázán, a **graf** tedy **zobrazuje kauzalitu** (příčinnou souvislost), nikoliv jen náhodnou korelaci. Na druhou stranu je oteplování ovlivněno i mnoha jinými faktory: dalšími skleníkovými plyny, prouděním v atmosféře a oceánu, které rozvádí teplo po planetě, ale také aerosoly a formováním oblačnosti (stínící efekt). Je tedy správné tvrdit, že každé zvýšení koncentrací CO<sub>2</sub> o 10 ppm vede ke zvýšení teploty zhruba o 0,1 °C? Následující odstavce ukazují, v čem je tento vztah pouze přibližný.

* Teoreticky odvozený vztah pro závislost oteplení na koncentraci skleníkového plynu je logaritmický.[^1] [^11] V malém rozmezí koncentrací jej ale můžeme dobře aproximovat vztahem lineárním, což ukazují i naměřená data.

    $$
    \Delta T(c) = S \cdot \log_2 \left(\frac{c_0 + \Delta c}{c_0}\right) \approx \frac{S}{c_0 \ln 2} \cdot \Delta c
    $$

    V tomto vztahu $$c_0$$ označuje počáteční koncentraci, $$\Delta c$$ nárůst koncentrace a $$S$$ je parametr zvaný *citlivost klimatu* – ten vyjadřuje, o kolik se zvýší teplota planety, když se zdvojnásobí koncentrace skleníkového plynu v atmosféře. **Přímá úměrnost mezi koncentracemi a oteplením přestane být dobrou aproximací, bude-li nárůst koncentrací příliš velký**.

* Klimatický systém má setrvačnost – některé procesy dosahují rovnováhy během jednotek let, jiné během desítek či stovek let. Proto je potřeba rozlišovat **krátkodobou citlivost klimatu** (*TCR, Transient Climate Response*), která zohledňuje procesy v řádu jednotek let, **rovnovážnou citlivost klimatu** (*ECS, Equilibrium Climate Sensitivity*), zohledňující procesy v řádu desítek let, a **dlouhodobou odezvu klimatu** (*ESS, Earth System Sensitivity*), která zohledňuje procesy v řádu stovek a tisíců let.[^8] [^9] [^2] Ze současných modelů klimatického systému vycházejí hodnoty krátkodobé citlivosti klimatu *TCR* okolo 1,7 °C (v rozmezí 1,3–3,0 °C)[^3] a hodnoty rovnovážné citlivosti klimatu *ECS* okolo 3°C (v rozmezí 2,3–4,7 °C).[^10] [^4] Data, která zobrazujeme v grafu, jsou průběžná a odpovídají krátkodobé odezvě klimatu. Kdyby se koncentrace stabilizovaly, teploty by ještě několik desítek let rostly, než by se oteplování zastavilo na hodnotách odpovídajících rovnovážné citlivosti klimatu. Jinak řečeno: **přímá úměrnost mezi koncentracemi a oteplením přestane platit, jestliže se radikálně sníží emise CO<sub>2</sub> na hodnoty blízké nule.** V takovém případě by se koncentrace stabilizovaly nebo začaly snižovat, teplota planety by však ještě nějakou dobu rostla.

* Oxid uhličitý zodpovídá přibližně za 70 % oteplení.[^6] Zbývajících 30 % je způsobeno dalšími skleníkovými plyny, zejména metanem a oxidem dusným, jejichž koncentrace v atmosféře také rostou. Spolu se skleníkovými plyny ale lidstvo vypouští i aerosoly, které mají na planetu ochlazující efekt, protože odráží sluneční záření a napomáhají vzniku mraků.[^7] Zobrazené oteplení zahrnuje všechny tyto jevy, na vodorovné ose jsou nicméně vynášeny jen koncentrace CO<sub>2</sub>. **Tvrzení o přímé úměrnosti mezi nárůstem koncentrací a oteplením je tedy zkreslující v tom, že ukazuje pouze závislost na dominantním faktoru.** Protože se však ochlazující efekt aerosolů a oteplující efekt dalších skleníkových plynů navzájem částečně vyruší, lze tvrdit, že CO<sub>2</sub> je řídicím faktorem, stojícím za výrazně více než 70 % oteplení.

## Odkud pocházejí data v této infografice?

* Hodnoty teplotní anomálie pro jednotlivé roky jsou z datasetu *NASA Goddard Institute for Space Studies*. Více o konceptu teplotní anomálie v doprovodném textu k infografice [Vývoj světové teplotní anomálie](/infografiky/vyvoj-teplotni-anomalie).

* Hodnoty koncentrace CO<sub>2</sub> pro jednotlivé roky vycházejí z měření *Scripps Institution of Oceanography*, který je součástí <glossary id="noaa">NOAA</glossary>. Samostatně vývoj koncentrací CO<sub>2</sub> v atmosféře zpracováváme v grafice [Vývoj koncentrace CO₂ v atmosféře](/infografiky/koncentrace-co2).

* Trendová křivka odpovídá rovnici $$\Delta T(c) = S \cdot \log_2 (\frac{c}{c_0})$$, kde $$c$$ je koncentrace, $$c_0$$ počáteční koncentrace a $$S$$ je parametr průběžné citlivosti klimatu. Tento teoretický vztah se používá v idealizovaných podmínkách simulací – buď jako vztah pro oteplení po ustanovení rovnováhy, kdy S odpovídá ECS (*Equilibrium Climate Sensitivity*), nebo pro průběžnou hodnotu oteplení při každoročním zvyšování koncentrace CO<sub>2</sub> o 1 %, kdy S odpovídá TCR (*Transient Climate Response*). V zobrazených datech je ovšem oteplení nejen důsledkem zvýšení koncentrací CO<sub>2</sub>, ale také důsledkem zvyšování koncentrací dalších skleníkových plynů. Proto hodnoty TCR a ECS zjištěné simulacemi bereme pouze jako orientační a hodnotu S pro zobrazení závislosti fitujeme (S = 2,37 °C). Pás nejistoty je zobrazen mezi S = 2,0 °C a S = 3,1 °C, což odpovídá profilu nejistoty v TCR i ECS a částečně zohledňuje efekt setrvačnosti klimatu při stabilizaci koncentrací CO<sub>2</sub>.

## Historická poznámka

Souvislost globálního oteplování a koncentrace atmosférického oxidu uhličitého je jednou z klíčových a nejdéle zkoumaných souvislostí v rámci studia klimatické změny. První výpočty publikoval Svante Arrhenius již v roce 1886 a jeho odhady citlivosti klimatu jsou potvrzovány a zpřesňovány dalšími studiemi. Více v grafice a textu [Historie výzkumu skleníkového efektu](/infografiky/historie-sklenikoveho-efektu).

## Zdroje a poznámky

[^1]: Přesněji řečeno: radiační působení (*radiative forcing*) je přímo úměrné logaritmu koncentrace – a oteplení je přímo úměrné radiačnímu působení; více viz [en.wikipedia: Radiative Forcing](https://en.wikipedia.org/wiki/Radiative_forcing)
[^2]: Podrobnější diskuse o konceptu citlivosti klimatu včetně různých časových škál [en.wikipedia: Measures of Climate Sensitivity](https://en.wikipedia.org/wiki/Climate_sensitivity#Measures_of_climate_sensitivity)
[^3]: G. A. Meehl et. al. ["Context for interpreting equilibrium climate sensitivity and transient climate response from the CMIP6 Earth system models."](https://advances.sciencemag.org/content/6/26/eaba1981), Science Advances 6.26 (2020).
[^4]: S. C. Sherwood, Webb, et. al. ["An Assessment of Earth's Climate Sensitivity Using Multiple Lines of Evidence."](https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2019RG000678), Reviews of Geophysics 58.4 (2020).
[^5]: Matthews, H. D., Tokarska, K. B., Nicholls, Z. R. J. et al. ["Opportunities and challenges in using remaining carbon budgets to guide climate policy."](https://doi.org/10.1038/s41561-020-00663-3), Nature Geoscience 13.12, str. 769–779 (2020).
[^6]: [Annual Greenhouse Gas Index](https://www.globalchange.gov/browse/indicators/annual-greenhouse-gas-index)
[^7]: Myhre, G., Myhre, C. E. L., Samset, B. H. & Storelvmo, T. (2013) ["Aerosols and Their Relation to Global Climate and Climate Sensitivity."](https://www.nature.com/scitable/knowledge/library/aerosols-and-their-relation-to-global-climate-102215345/), Nature Education Knowledge 4.5, str. 7 (2013).
[^8]: Knutti R. Hegerl. ["Beyond Equilibrium Climate Sensitivity."](https://www.nature.com/articles/ngeo3017), Nature Geoscience 10.10, str. 727–736 (2017).
[^9]: Carbon Brief explainer: [How scientists estimate climate sensitivity](https://www.carbonbrief.org/explainer-how-scientists-estimate-climate-sensitivity)
[^10]: Carbon Brief guest post: [Why low-end climate sensitivity can now be ruled out](https://www.carbonbrief.org/guest-post-why-low-end-climate-sensitivity-can-now-be-ruled-out)
[^11]: Skeptical Science: [How could global warming accelerate if CO₂ is 'logarithmic'?](https://skepticalscience.com/why-global-warming-can-accelerate.html)
