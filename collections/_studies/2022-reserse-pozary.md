---
layout:      survey
title:       "Požáry vegetace a jejich souvislosti s klimatickou změnou"
slug:        2022-reserse-pozary
redirect_from: "/2022-reserse-pozary"
weight:      301
published:   2021-06-10
tags-scopes: [ cr, svet ]
tags-topics: [ priroda ]
caption:     "Přehled článků a zdrojů zabývajících se požáry vegetace či lesními požáry v souvislosti s klimatickou změnou."
intro: |
  Informace o českých lesích a jejich stavu jsou roztříštěny mezi soukromé i státní organizace, české i zahraniční zdroje. Tato rešerše poskytuje základní vhled do organizací zabývajících se správou českých lesů a poskytováním informací o nich. Dále poskytuje odkazy na souhrnné studie a grafiky, na projekty zpracovávající interaktivní mapy a data o lesích.
items:
  interactives:
    - name: "FireRisk.cz"
      authors: "CzechGlobe"
      link: "https://www.firerisk.cz/"
      description: "Aktuální předpověď rizika výskytu přírodních požárů v ČR"
      note: ""
    - name: "Aktuální data o požárech v EU"
      authors: "COPERNICUS" 
      link: "https://effis.jrc.ec.europa.eu/apps/effis.statistics/seasonaltrend"
      description: "Aktuální data o spálené ploše pro jednotlivé země EU, srovnání se předchozími roky. Data pocházejí z družicových sledování."
      note: "Aktualizováno týdně"
  studies:
    - name: "Global and Regional Trends and Drivers of Fire Under Climate Change"
      authors: "Reviews of Geophysics"
      link: "https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2020RG000726"
      description: "Článek analyzuje data o požárech v jednotlivých regionech i globálně. Klíčová zjištění: Frekvence počasí vhodného k šíření požárů roste (v pozorovaných trendech délky požární sezóny) a v důsledku klimatické změny se očekává další růst. Spálená plocha v některých roste (Východní Sibiř, Sev. Amerika), jinde klesá (africké savany, stepi jižní Ameriky a Asie), přičemž globálně spálená plocha klesá. Článek rozebírá faktory, které ovlivňují množství spálené plochy v jednotlivých oblasetech."
      timeframe: "2022"
    - name: "A human-driven decline in global burned area"
      authors: "Science"
      link: "https://www.science.org/doi/10.1126/science.aal4108"
      description: "Článek analyzuje dlouhodobé trendy v parametrech požárů vegetace. Klíčová zjištění: Mezi 1998 a 2015 se plocha ročně spálená požáry vegetace zmenšila téměř o čtvrtinu. Pokles je koncentrován v savanách a oblastech s nižším zápojem korun stromů, naopak v oblastech s vyšším zápojen korun je pozorován růst spálené plochy. Hlavní faktory v redukci spálené plochy jsou rozšiřování obdělávané plochy a intensifikace zemědělství."
      timeframe: "2017"
    - name: "Metodika: adaptační opatření v rizikových oblastech výskytu požárů vegetace"
      authors: "CzechGlobe"
      link: "https://firerisk.cz/download/3e013e9e3b549f8727dd819b9fedeba5/nmets2.pdf"
      description: "Metodika formuluje odstupňovaná adaptační a mitigační opatření ke zmírnění požárního rizika a šíření požáru v krajině (les a zemědělská půda). Jako protipožární opatření v lesích uvádí metodika například budování protipožárních pásů zpomalujících šíření požárů, nebo pásů z hůře hořlavých dřevin (lípy, javory, jasan, olše); snižování množství snadno zápalného materiálu v lesích; rozčlenění souvislých jehličnatých komplexů; dobudování a údržbu přístupových komunikací a zdrojů vody pro hašení požárů "
      timeframe: "2020"
    - name: "Požár v Hřensku 2022, analýza faktorů."
      authors: "ČHMÚ, projekt Perun "
      link: "https://www.perun-klima.cz/downloads/pozar.pdf"
      description: ""
      timeframe: "2022"
  
    
---


## Aktuální data

<table class="table table-striped table-hover mt-4 mb-4">
  <thead>
    <tr>
      <th scope="col" class="text-uppercase">Název zdroje</th>
      <th scope="col" class="text-uppercase">Instituce</th>
      <th scope="col" class="text-uppercase">Popis</th>
      <th scope="col" class="text-uppercase">Aktualizace</th>
    </tr>
  </thead>
  <tbody>
    {% for item in page.items.interactives %}
    <tr>
      <td class="align-middle font-weight-bold">
        <a href="{{ item.link }}">{{ item.name }}</a>
      </td>
      <td class="align-middle">{{ item.authors }}</td>
      <td class="align-middle">{{ item.description | markdownify }}</td>
      <td class="align-middle">{{ item.timeframe }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>
 


## Studie

<table class="table table-striped table-hover mt-4 mb-4">
  <thead>
    <tr>
      <th scope="col" class="text-uppercase">Název zdroje</th>
      <th scope="col" class="text-uppercase">Autoři</th>
      <th scope="col" class="text-uppercase">Popis</th>
      <th scope="col" class="text-uppercase">Rok vydání / Aktualizace</th>
    </tr>
  </thead>
  <tbody>
    {% for item in page.items.studies %}
    <tr>
      <td class="align-middle font-weight-bold">
        <a href="{{ item.link }}">{{ item.name }}</a>
      </td>
      <td class="align-middle">{{ item.authors }}</td>
      <td class="align-middle">{{ item.description | markdownify }}</td>
      <td class="align-middle">{{ item.timeframe }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>
