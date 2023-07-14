---
layout:        survey
title:         "Půdní uhlík"
slug:          2023-reserse-soil-carbon
redirect_from: "/2023-reserse-soil-carbon"
weight:        305
published:     2023-07-14
tags-scopes:   [ svet ]
tags-topics:   [ emise, opatreni ]
caption:       "Přehled institucí a článků věnujících se zachytávání a ukládání uhlíku z atmosféry."
intro: |
  <i>Carbon capture and storage</i> (CCS) je proces, při kterém je zachytáván CO<sub>2</sub>, který je následně uložen, aby neunikl zpět do atmosféry. Jedná se o potenciálně klíčový nástroj pro mitigaci změn klimatu a je součástí většiny scénářů k dosažení klimatické neutrality.
items:
  studies:
    - name: Role of soil carbon in natural climate solutions. Bossio et al., 2020
      link: https://www.nature.com/articles/s41893-020-0491-z
      source: Nature Sustainability
      description: |
        * Analýza tzv. dvanácti opatření blízkých přírodě (Natural Climate Solutions – NCS), podporujících ukládání a uchovávání uhlíku v půdě – pro každé opatření vyčíslen mitigační potenciál (v GtCO2e ročně) v roce 2030 ve třech úrovních finanční náročnosti.
        * Návaznost na [Griscom et al., 2017](https://www.researchgate.net/publication/320536154_Natural_climate_solutions)
    - name: Grassland management impacts on soil carbon stocks. A new synthesis. Conant et al., 2017
      link: https://esajournals.onlinelibrary.wiley.com/doi/epdf/10.1002/eap.1473
      source: Ecological Applications
      description: |
        * V půdě na pastvinách se celosvětově nachází o cca 50 % víc SOC víc než v lesní půdě.
        * Meta-analýza vlivu různých praktik managementu pastvin (přeměna orné půdy na pastvinu; přeměna přirozeného ekosystému na pastvinu; využití žížal; hnojení; oheň(vypalování?); pastva; (trvalé) travní porosty - trávnaté porasty; rekultivace) na SOC.
        * Přeměnou orné půdy na pastvinu je možné zvýšit množství SOC o 40 %.
    - name: Farming with crops and rocks to address global climate, food and soil security. Beerling et al., 2018.
      link: https://www.nature.com/articles/s41477-018-0108-y
      source: Nature Plants
      description: |
        * Základní představení metody _enhanced weathering_ (vylepšené zvětrávání), při které se do půdy zabudovávají křemičité horniny (studie se věnuje hlavně bazaltu), jež reagují s CO2 za vzniku stabilnějších forem uhlíku a dalších produktů.
        * Zkoumání pozitivních účinků této metody na půdu a zemědělskou produkci; potřeba dalšího výzkumu.
    - name: Biochar in climate change mitigation. Lehmann et al., 2021.
      link: https://bpb-us-e1.wpmucdn.com/blogs.cornell.edu/dist/8/7329/files/2021/12/NatureGeoscience-14-883-892-2021-Lehmann.pdf
      source: 
      description: |
        * Podrobný přehled možností využití biouhlí v mitigaci klimatické změny
        * Vysvětlení půdních chemických mechanismů účinků biouhlí
        * Výhody využití biouhlí:
            * Pyrolyzovaná biomasa (biouhlí) je oproti surové biomase odolnější vůči rozkladu a uvolňování skleníkových plynů
            * Podpora růstu rostlin
            * Snížení míry mineralizace existujícího půdního organického uhlíku
            * Možnost zachytávání a ukládání (<glossary id="ccs">_carbon capture and storage_</glossary>) látek vznikajících při pyrolýze
    - name:
      link: 
      source: 
      description: 
    - name:
      link: 
      source: 
      description: 
    - name:
      link: 
      source: 
      description: 
    - name:
      link: 
      source: 
      description: 
    - name:
      link: 
      source: 
      description: 
    - name:
      link: 
      source: 
      description: 
    - name:
      link: 
      source: 
      description: 
    - name:
      link: 
      source: 
      description: 
---

## Studie

<table class="table table-striped table-hover mt-4 mb-4">
  <thead>
    <tr>
      <th scope="col" class="text-uppercase">Studie/článek</th>
      <th scope="col" class="text-uppercase">Zdroj</th>
      <th scope="col" class="text-uppercase">Shrnutí</th>
    </tr>
  </thead>
  <tbody>
    {% for item in page.items.studies %}
    <tr>
      <td class="align-middle font-weight-bold">
        <a href="{{ item.link }}">{{ item.name }}</a>
      </td>
      <td class="align-middle">{{ item.source }}</td>
      <td class="align-middle">{{ item.description | markdownify }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

