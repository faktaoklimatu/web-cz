---
layout:      survey
title:       "Dashboard teplárenství"
slug:        2025-dashboard-teplarenstvi
weight:      303
published:   2025-10-30
tags-scopes: [ eu ]
tags-topics: [ opatreni ]
use-preview-image: true
caption:     "Dashboard teplárenství."
intro: |
  Už šestnáct států Evropské unie přijalo svůj vlastní klimatický zákon. Každý z nich v něm představuje své ambice na snižování emisí skleníkových plynů a cesty k nízkoemisní budoucnosti – míra detailu se ovšem v různých zemích dost liší. Zasazení klimatických závazků do zákona je důležité v tom, že aktéři ve veřejné i soukromé sféře mají větší zodpovědnost za jejich plnění a zároveň se tyto závazky stávají odolnějšími vůči změnám politické nebo ekonomické situace v zemi. Česko zatím svůj klimatický zákon nemá.

items:  
- name: Teplárna Kladno s.r.o.
  city: Kladno
  region: Středočeský kraj
  owner: Sev.en
  status: problematic
  status-comment: v r. 2024–25 probíhala jednání o cenách tepla; firma zvažovala ukončení dodávek tepla z uhlí k 2026, pokud se s městem neshodne (alternativou je plyn). V 12/2024 vyčlenila neuhelná aktiva do Sev.en Zeta a.s.; plán bateriového úložiště.
  target-year: 2030
  fuel-current: coal
  fuel-target: natural-gas
  heated-households: 45000
  heated-households-pct: 45
  heated-other: Průmysl Kladno; městské objekty
  emissions: 1382063
  emissions-decline: 73
  emissions-comment: Emise z kogenerace; část na výrobu elektřiny.
  grants-modfond:
    - name: Modernizační fond – Plynofikace Teplárny Kladno I
      url: https://www.7.cz/cz/skupina/teplarna-kladno.html
      comment: Předběžná žádost o podporu přechodu na ZP a akumulaci tepla.
      sum: 1800000000
      succesful: false
  grants-other:
    - name: Místní akumulační projekt – bateriové úložiště
      url: https://www.7.cz/cz/skupina/teplarna-kladno.html
      comment: Podpora regionálních energetických projektů.
      sum: 150000000

- name: ENERGETIKA TŘINEC, a.s.
  city: Třinec
  region: Moravskoslezský kraj
  owner: Moravia Steel
  status: on-track
  status-comment: Závodní CHP teplárna Třineckých železáren zásobující hutě i město Třinec (~1 600 TJ/rok). Probíhá výstavba PPC1 na zemní plyn s uvedením koncem 2027.
  target-year: 2030
  fuel-current: blast-furnace-gas
  fuel-target: natural-gas
  heated-households: 20000
  heated-households-pct: 45
  heated-other: Hutě; CZT Třinec
  emissions: 1337644
  emissions-decline: 87
  emissions-comment: Nie všetky emisie sú z výroby tepla.
  grants-modfond:
    - name: Instalace FVE na budově údržby ENEZY
      url: https://www.etas.trz.cz/dokumenty/v%C5%98%20-%20nov%C3%BD%20zdroj%20na%20zp%20-%20paroplynov%C3%BD%20cyklus%20ppc1.pdf
      comment: Registrační číslo projektu 7211100057; schválená dotace 2 730 719,23 Kč; celkové výdaje 12 213 591,44 Kč.
      sum: 1000000
      succesful: true
  grants-other:
    - name: ENERGETIKA TŘINEC, a.s.
      url: https://www.etas.trz.cz/
      comment: Interní investice do PPC1 a energetiky.
      sum: 500000

- name: ENERGOTRANS - Elektrárna Mělník 1
  city: Mělník
  region: Středočeský
  owner: ČEZ
  status: on-track
  status-comment: Kogenerační zdroj dodává teplo hlavně do Prahy; ekologizace odsířením a filtrací popílku.
  target-year: 2030
  fuel-current: coal
  fuel-target: natural-gas
  heated-households: 70000
  heated-households-pct: 60
  heated-other: CZT Praha; Neratovice
  emissions: 1285945
  emissions-decline: 81
  emissions-comment: Emise převážně z uhelných kotlů; kogenerace.
  grants-modfond:
    - name: Modernizační fond – Přestavba horkovodního zdroje EMĚ I
      url: https://www.cez.cz
      comment: Plynofikace a modernizace kogenerace pro Prahu.
      sum: 3200000000
      succesful: false
  grants-other: []

- name: Sokolovská uhlená - Teplárna a PPC Vřesová
  city: Sokolov
  region: Karlovarský
  owner: SUAS
  status: on-track
  status-comment: Zásobuje Karlovy Vary, Chodov aj.; PPC 2× ~200 MWe dnes převážně plyn/záloha.
  target-year: 2030
  fuel-current: syngas
  fuel-target: natural-gas
  heated-households: 30000
  heated-households-pct: 60
  heated-other: Karlovy Vary; Chodov; průmysl regionu
  emissions: 807781
  emissions-decline: 45
  emissions-comment: Historický „energo-plyn“ a uhlí; mix se mění.
  grants-modfond: []
  grants-other:
    - name: RES+ – FVE SUAS region
      url: https://www.suas.cz
      comment: Podpora obnovitelných zdrojů skupiny v regionu.
      sum: 120000000

- name: Energotrans - Elektrárna Mělník 2
  city: Mělník
  region: Středočeský
  owner: ČEZ
  status: merge
  status-comment: Lokalita Mělník prochází přestavbou; ESP, FGD a SNCR instalovány.
  target-year: 2030
  fuel-current: coal
  fuel-target: natural-gas
  heated-households: 25000
  heated-households-pct: 60
  heated-other: Napojení na pražský horkovod
  emissions: 448818
  emissions-decline: 60
  emissions-comment: Emise před útlumem lokality a přechodem na ZP.
  grants-modfond:
    - name: Modernizační fond – Transformace EMĚ II
      url: https://www.cez.cz
      comment: Předběžný rámec podpory pro plynofikaci.
      sum: 900000000
      succesful: false
  grants-other: []

- name: ČEZ - Teplárna Trmice
  city: Ústí nad Labem
  region: Ústecký
  owner: ČEZ
  status: on-track
  status-comment: Zásobuje většinu Ústí n. L.; ekologizace po r. 1994; záložní plynová kotelna.
  target-year: 2030
  fuel-current: coal
  fuel-target: natural-gas
  heated-households: 50000
  heated-households-pct: 60
  heated-other: CZT Ústí n. L.; průmysl
  emissions: 386018
  emissions-decline: 61
  emissions-comment: Část emisí z kogenerace mimo teplo.
  grants-modfond: []
  grants-other:
    - name: Místní zdroje – výměna předávacích stanic
      url: https://www.cez.cz
      comment: Zvyšování účinnosti CZT.
      sum: 60000000

- name: ŠKO-ENERGO Teplárna Mladá Boleslav
  city: Mladá Boleslav
  region: Středočeský
  owner: ŠKODA
  status: on-track
  status-comment: Závodní CHP pro Škoda Auto a CZT (~14 000 domácností); Power-to-Heat.
  target-year: 2030
  fuel-current: coal
  fuel-target: biomass
  heated-households: 14000
  heated-households-pct: 60
  heated-other: Škoda Auto; město Mladá Boleslav
  emissions: 356704
  emissions-decline: 86
  emissions-comment: Vysoký pokles díky spoluspalování biomasy a modernizacím.
  grants-modfond:
    - name: Decarbonizace ŠKO-ENERGO 2024–2027
      url: https://www.sko-energo.cz
      comment: Příspěvek Modernizačního fondu na přechod od uhlí.
      sum: 2179624125
      succesful: true
  grants-other: []

- name: United Energy - Teplárna Komořany
  city: Komořany
  region: Ústecký
  owner: United Energy
  status: on-track
  status-comment: Velký zdroj KVET v Mostě-Komořanech; 10 fluidních kotlů.
  target-year: 2030
  fuel-current: coal
  fuel-target: natural-gas
  heated-households: 60000
  heated-households-pct: 60
  heated-other: Most; Litvínov; průmysl
  emissions: 317227
  emissions-decline: 34
  emissions-comment: Výrazný podíl na dodávkách CZT v regionu.
  grants-modfond:
    - name: Modernizační fond – Komořany NG pilot
      url: https://www.ue.cz
      comment: Přechod na plyn a úpravy KVET.
      sum: 1500000000
      succesful: false
  grants-other:
    - name: Regionální program ÚK – horkovody
      url: https://www.kr-ustecky.cz
      comment: Rekonstrukce rozvodů.
      sum: 80000000

- name: TAMERO INVEST - Teplárna Kralupy
  city: Kralupy nad Vltavou
  region: Středočeský
  owner: TAMERO
  status: no_change_needed
  status-comment: Podniková KVET v areálu Synthos; zásobuje i CZT Kralupy a Chvatěruby.
  target-year: 2030
  fuel-current: natural-gas
  fuel-target: natural-gas
  heated-households: 22000
  heated-households-pct: 60
  heated-other: Synthos Kralupy; CZT Kralupy; Chvatěruby
  emissions: 315795
  emissions-decline: 78
  emissions-comment: Vysoce účinná KVET; v souladu s BAT.
  grants-modfond: []
  grants-other:
    - name: Interní investice – modernizace turbín
      url: https://www.synthosgroup.com/cz/
      comment: Zvyšování účinnosti a spolehlivosti.
      sum: 90000000

- name: Plzeňská teplárenská, a.s. - Teplárna ELU III
  city: Plzeň
  region: Plzeňský
  owner: Plzeň
  status: on-track
  status-comment: Kombinovaná výroba elektřiny a tepla (CZT Plzeň); bioblok a spoluspalování biomasy.
  target-year: 2030
  fuel-current: coal
  fuel-target: natural-gas
  heated-households: 65000
  heated-households-pct: 60
  heated-other: CZT Plzeň; ZEVO Plzeň integrace
  emissions: 261547
  emissions-decline: 67
  emissions-comment: Emise klesají díky biobloku a plánovaným PPC.
  grants-modfond:
    - name: Modernizační fond – PPC Plzeň (2×)
      url: https://www.pltep.cz
      comment: Přechod na paroplynové zdroje 2026–2028.
      sum: 3200000000
      succesful: true
  grants-other: []

- name: DEZA - teplárna závodu
  city: Valašské Meziříčí
  region: Zlínský
  owner: Agrofert
  status: no_change_needed
  status-comment: Podniková KVET pro výroby DEZA a část externích odběratelů (CZT Valašské Meziříčí).
  target-year: 2030
  fuel-current: natural-gas
  fuel-target: natural-gas
  heated-households: 18000
  heated-households-pct: 60
  heated-other: DEZA závody; CZT Valašské Meziříčí
  emissions: 229491
  emissions-decline: 90
  emissions-comment: CEMS instalován; přebytky elektřiny v zimě do sítě.
  grants-modfond: []
  grants-other:
    - name: Interní investice – rekonstrukce K5
      url: https://deza.cz
      comment: Modernizace parního kotle a měření emisí.
      sum: 45000000

- name: Veolia Energie - Teplárna Olomouc
  city: Olomouc
  region: Olomoucký
  owner: Veolia
  status: on-track
  status-comment: Přechod na TAP/SRF + biomasu; K3 přestavěn na plyn 06/2023; K5 multipalivový.
  target-year: 2030
  fuel-current: coal
  fuel-target: refuse-derived-fuel
  heated-households: 50000
  heated-households-pct: 60
  heated-other: CZT Olomouc; univerzitní areály
  emissions: 227912
  emissions-decline: 78
  emissions-comment: Pokles díky K3 na plyn a filtrům TZL.
  grants-modfond:
    - name: Modernizační fond – K5 multipalivový
      url: https://www.veolia.cz
      comment: Retrofit pro TAP/SRF a biomasu.
      sum: 1100000000
      succesful: true
  grants-other: []

- name: Teplárna Otrokovice - Teplárna
  city: Otrokovice
  region: Zlínský
  owner: Teplárna Otrokovice
  status: on-track
  status-comment: KVET pro průmysl (Continental Barum) a CZT Otrokovice, Zlín-Malenovice, Napajedla.
  target-year: 2030
  fuel-current: coal
  fuel-target: biomass
  heated-households: 42000
  heated-households-pct: 60
  heated-other: Continental Barum; CZT Zlín-Malenovice; Napajedla
  emissions: 182262
  emissions-decline: 55
  emissions-comment: Odsíření a nízko-NOx úpravy 2016–2020.
  grants-modfond:
    - name: Modernizační fond – Biomasa K3/K4
      url: https://www.teplarna-otrokovice.cz
      comment: Přestavba dvou kotlů na biomasu.
      sum: 700000000
      succesful: false
  grants-other:
    - name: Regionální podpora – rekonstrukce rozvodů
      url: https://www.zlinsky.cz
      comment: Snížení ztrát v CZT.
      sum: 60000000

- name: Teplárna České Budějovice, Novohradská ulice
  city: České Budějovice
  region: Jihočeský
  owner: České Budějovice
  status: on-track
  status-comment: Horkovod Temelín→ČB (od 10/2023); K12 na 100 % biomasu (2022–2025); cíl konec uhlí do 2029 (ZEVO Vráto).
  target-year: 2029
  fuel-current: coal
  fuel-target: biomass
  heated-households: 60000
  heated-households-pct: 60
  heated-other: CZT České Budějovice; napojení na Temelín
  emissions: 154629
  emissions-decline: 59
  emissions-comment: Bezemisní teplo z Temelína postupně snižuje emise.
  grants-modfond:
    - name: Modernizační fond – Horkovod Temelín–ČB
      url: https://www.c-budejovice.cz
      comment: Podpora bezemisního tepla; akumulace.
      sum: 950000000
      succesful: true
  grants-other: []

- name: Teplárna Zlín s.r.o.
  city: Zlín
  region: Zlínský
  owner: Sev.en
  status: on-track
  status-comment: ~17 tis. domácností; IPPC povolilo až 20 % biomasy; nový plynový kotel K23.
  target-year: 2030
  fuel-current: coal
  fuel-target: biomass
  heated-households: 17000
  heated-households-pct: 60
  heated-other: CZT Zlín; průmysl Zlín
  emissions: 149947
  emissions-decline: 60
  emissions-comment: Kombinace fluidních bloků a plyn. špiček.
  grants-modfond:
    - name: Modernizační fond – Biomasa ve Zlíně
      url: https://www.seven.cz
      comment: Přechod části výroby na biomasu; rozvody.
      sum: 580000000
      succesful: false
  grants-other: []

- name: Teplárny Brno - Provoz Červený Mlýn
  city: Brno
  region: Jihomoravský
  owner: Brno
  status: done
  status-comment: Moderní paroplynový zdroj (1999); špičkové plynové kotle 2021–2022; elektrodový kotel a akumulace.
  target-year: 2030
  fuel-current: natural-gas
  fuel-target: natural-gas
  heated-households: 80000
  heated-households-pct: 60
  heated-other: Horkovody Žabovřesky–Lesná–Líšeň; PpS pro ČEPS
  emissions: 132269
  emissions-decline: 91
  emissions-comment: Nízké emise díky PPC a moderním kotlům.
  grants-modfond: []
  grants-other:
    - name: Městská investice – akumulace tepla
      url: https://teplarny.brno.cz
      comment: Zvýšení flexibility soustavy.
      sum: 120000000

- name: Plzeňská teplárenská - centrální zdroj tepla Plzeň
  city: Plzeň
  region: Plzeňský
  owner: Plzeň
  status: merge
  status-comment: CZTP tvoří areály Teplárna a Energetika; probíhá dekarbonizace – 2× PPC 2026–2028; konec uhlí do 2030.
  target-year: 2030
  fuel-current: coal
  fuel-target: natural-gas
  heated-households: 68000
  heated-households-pct: 60
  heated-other: CZT Plzeň; ZEVO Plzeň
  emissions: 125155
  emissions-decline: 30
  emissions-comment: Emise klesnou s náběhem PPC a útlumem uhlí.
  grants-modfond:
    - name: Modernizační fond – Přechod CZT Plzeň na PPC
      url: https://www.pltep.cz
      comment: Dotace ~3,2 mld. Kč na dva PPC; investice ~7 mld. Kč.
      sum: 3200000000
      succesful: true
  grants-other: []

- name: ENERGY U/L, a.s., kotelna
  city: Ústí nad Labem
  region: Ústecký
  owner: ENERGY U/L
  status: problematic
  status-comment: Uhelný KVET na Střekově; město s ČEZ ESCO staví nové plynové zdroje mimo ENERGY.
  target-year: 2030
  fuel-current: coal
  fuel-target: natural-gas
  heated-households: 30000
  heated-households-pct: 60
  heated-other: Střekov – parní rozvody; veřejné budovy
  emissions: 100988
  emissions-decline: 88
  emissions-comment: Filtry TZL a odsíření instalovány; K4 záložní.
  grants-modfond: []
  grants-other:
    - name: Město Ústí – náhrada zdrojů Střekov
      url: https://www.usti.cz/cz/uredni-portal/seznamy-zprav/aktualni-informace/teplo-pro-zakazniky-thmu-strekove-bude-podle-planu.html
      comment: Nové plynové zdroje pro Střekov.
      sum: 100000000

- name: Veolia Energie - Teplárna Přívoz
  city: Ostrava
  region: Moravskoslezský
  owner: Veolia
  status: done
  status-comment: Městský zdroj CZT v centru Ostravy; po plynofikaci hlavní provoz na ZP a KP.
  target-year: 2030
  fuel-current: natural-gas
  fuel-target: natural-gas
  heated-households: 40000
  heated-households-pct: 60
  heated-other: CZT Ostrava – centrum; administrativní objekty
  emissions: 81943
  emissions-decline: 70
  emissions-comment: Uhelný K3 ukončen po 12/2022.
  grants-modfond: []
  grants-other:
    - name: Místní grant – výměníkové stanice
      url: https://www.veolia.cz
      comment: Zvyšování účinnosti odběru tepla.
      sum: 35000000

- name: Teplárny Brno - Provoz Špitálka
  city: Brno
  region: Jihomoravský
  owner: Brno
  status: merge
  status-comment: IPPC 2023; EIA 2022; plánované sloučení v rámci brněnské soustavy.
  target-year: 2030
  fuel-current: natural-gas
  fuel-target: natural-gas
  heated-households: 50000
  heated-households-pct: 60
  heated-other: Centrální brněnská soustava; kogenerace
  emissions: 37310
  emissions-decline: 53
  emissions-comment: Protitlaká kogenerace; nízké specifické emise.
  grants-modfond: []
  grants-other: []
---

{:.narrow-text}
Evropská unie přijala vlastní [klimatický zákon](https://eur-lex.europa.eu/legal-content/CS/TXT/HTML/?uri=CELEX:32021R1119) v roce 2021. Zavázala se v něm dosáhnout <glossary id="carbon-neutrality">klimatické neutrality</glossary> v roce 2050 a do roku 2030 snížit své emise skleníkových plynů o 55 % oproti roku 1990. Tento zákon je však závazný pouze pro Unii jako celek – pro jednotlivé členské státy nestanovuje klimatické cíle ani neupravuje trajektorii k jejich dosažení. K roku 2023 přijalo vlastní klimatický zákon 16 z 27 států Unie. Diskuze o klimatickém zákoně dále probíhá na Slovensku a ve Slovinsku. V ostatních státech se toto téma buď ve větší míře neřeší, nebo jen na mimovládní úrovni (v rámci občanské společnosti apod.)


<div class="heating-plants-survey">
  {% for item in page.items %}
    <div
        class="card"
        data-name="{{ item.name }}"
        {% if item.status == "problematic" %}
          style="background-color: rgba(255, 167, 167, 0.17)"
        {% endif %}
    >
        <h5 class="card-header" id="{{ include.code }}"  {% if item.status == "problematic" %} style="background-color: rgb(255 130 130 / 17%)"{% endif %}>
            {% if item.status == "problematic" %}
              <span style="color: #a80223; font-weight: bold"><i class="fa-solid fa-triangle-exclamation"></i> </span>
              {% elsif item.status == "on-track" %}
              <span style="color: #eba000ff"><i class="fa-solid fa-circle-arrow-right"></i> </span>
              {% elsif item.status == "no-change-needed" %}
              <span style="color: #05737bff"><i class="fa-solid fa-circle-check"></i> </span>
              {% elsif item.status == "done" %}
              <span style="color: #05737bff"><i class="fa-solid fa-circle-check"></i> </span>
              {% else %}
              <span style="color:rgba(104, 104, 104, 1)f"><i class="fa-solid fa-circle-question"></i></span>
            {% endif %}
            {{ item.name }}   , 
            <span style="color: grey">
              <span style="font-weight: 400;"> {{ item.city }},   </span>
              <span style="font-weight: 400;"> {{ item.owner }}</span>
            </span>
        </h5>
        <section class="summary">
          
          <div class="card-body">
            <span class="label">Dodáva teplo do</span><br>
            {% assign house_count = item.heated-households | divided_by: 10000 | round %}
            <span>
              {% for i in (1..house_count) %}
                <i class="fa-solid fa-house" style="font-size:0.8rem; color:grey"></i>
              {% endfor %}
              <br>
            </span>
            <span><b>{{ item.heated-households }} domácností</b></span><br>
            <span><i>a taky pro {{ item.heated-other }}</i></span>
          </div>
          
          <div class="card-body">
            <span class="label">Emise CO<sub>2</sub>eq</span><br>
            <span><b>{{ item.emissions | divided_by: 1000 }} tisíc tun</b></span><br>
            <span class="label">Pokles emisí</span><br>
            <span><b>na {{ item.emissions-decline }} % z 2022</b></span><br>
            <svg width="50" height="50" viewBox="-2 -10 60 60">
              <defs>
                <marker id="arrow-line" viewBox="0 0 10 10"
                        refX="9" refY="5" markerWidth="6" markerHeight="6"
                        orient="auto">
                  <path d="M9 5 L3.5 1.5 M9 5 L3.5 8.5"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                </marker>
              </defs>

              <line x1="0" y1="0"
                    x2="50" y2="{{ 100 | minus: item.emissions-decline | divided_by: 2 }}"
                    stroke="currentColor" stroke-width="2"
                    marker-end="url(#arrow-line)" />
            </svg>
          </div>

          <div class="card-body">
            <span class="label">Status transformace</span><br> 
            {% if item.status == "problematic" %}
            <span style="color: #a80223; font-weight: bold"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Problematické</span><br>
            {% elsif item.status == "on-track" %}
            <span style="color: #eba000ff"><i class="fa-solid fa-circle-arrow-right"></i>&nbsp;<b>On-track</b>&nbsp;→&nbsp;{{item.target-year}}</span><br>
            {% elsif item.status == "no-change-needed" %}
            <span style="color: #05737bff"><i class="fa-solid fa-circle-check"></i>&nbsp;<b>Není treba transformovat</b></span><br>
            {% elsif item.status == "done" %}
            <span style="color: #05737bff"><i class="fa-solid fa-circle-check"></i>&nbsp;<b>Hotovo</b></span><br>
            {% else %}
            <span>{{item.status}}, {{item.target-year}}</span><br>
            {% endif %}
            <span class="label">Hlavní palivo</span><br> 
            <span>
                {% if item.status == "on-track" %}
                  {% assign is-target-fuel = "&nbsp;→&nbsp;" | append: item.fuel-target %}
                {% else %}
                  {% assign is-target-fuel = "" %}
                {% endif %}
                {% if item.fuel-current == "coal" %}

                <span><b>Uhlí</b> {{ is-target-fuel }}</span>
                {% elsif item.fuel-current == "blast-furnace-gas" %}
                <span><b>Hutní&nbsp;plyn</b> {{ is-target-fuel }}</span>
                {% elsif item.fuel-current == "natural-gas" %}
                <span><b>Zemní&nbsp;plyn</b> {{ is-target-fuel }}</span>
                {% elsif item.fuel-current == "syngas" %}
                <span><b>Energoplyn</b> {{ is-target-fuel }}</span>
                {% else %}
                <b>{{item.fuel-current}}</b> {{ is-target-fuel }}
                {% endif %}
            </span><br>
            <span class="label">Komentář k transformaci</span><br>
            <p><i>{{ item.status-comment }}</i></p>  
          </div>
            
          <div class="card-body">
            <span class="label">Dotace</span><br>
            {% for grant in item.grants-modfond -%}
            {%- if forloop.index > 1 %},{% endif %}
            {% if grant.url %}
            <i style="color: grey" class="fa-solid fa-newspaper"></i> <a href="{{ grant.url }}" title="{{ grant.comment }}" data-toggle="tooltip">{{ grant.name }}</a><br>
            {%- else -%}
            {{ grant.name }}
            {%- endif -%}
            <i style="color: grey" class="fa-solid fa-sack-dollar"> </i> {{ grant.sum }} <br>
            <p><i>{{ grant.comment }}</i></p>
            {% endfor %}
          </div>
        </section>
    </div>
  {% endfor %}
</div>


{% comment %}
  Plná verze rešerše: tabulka s jednotlivými studiemi.
{% endcomment %}
<table class="table table-striped table-hover d-none d-md-table mt-4">
  <thead>
    <tr>
      <th scope="col" class="text-uppercase align-left">Názov</th>
      <th scope="col" class="text-uppercase align-left">Mesto</th>
      <th scope="col" class="text-uppercase align-left">Hlavní palivo</th>
      <th scope="col" class="text-uppercase align-left">% DOM</th>
      <th scope="col" class="text-uppercase align-left">Status dekarbonizace</th>
      <th scope="col" class="text-uppercase align-left">Vlastník</th>
      <th scope="col" class="text-uppercase align-left">Dotace</th>
      <th scope="col" class="text-uppercase align-left">Odkazy</th>

    </tr>
  </thead>
  <tbody>
    {% for item in page.items %}
    <tr>
      <td class="align-left"><strong>{{ item.name }}</strong></td>
      <td class="align-left"><b>{{ item.city }}</b>,<br>{{ item.region }}</td>
      <td class="align-left" title="{{ item.technology-comment }}" data-toggle="tooltip">
        {% if item.fuel == "coal" %}
        <span style="color: #915258ff"><i class="fa-solid fa-gem"></i>&nbsp;Uhlí</span>
        {% elsif item.fuel == "blast-furnace-gas" %}
        <span style="color: #a06b9fff"><i class="fa-solid fa-fire-flame-simple"></i>&nbsp;Hutní&nbsp;plyn</span>
        {% elsif item.fuel == "natural-gas" %}
        <span style="color: #a06b9fff"><i class="fa-solid fa-fire-flame-simple"></i>&nbsp;Zemní&nbsp;plyn</span>
        {% elsif item.fuel == "syngas" %}
        <span style="color: #a06b9fff"><i class="fa-solid fa-fire-flame-simple"></i>&nbsp;Energoplyn</span>
        {% else %}
        <b>{{item.fuel}}</b>
        {% endif %}
      </td>
      <td class="align-left"><strong>{{ item.percentage-of-households }} %</strong></td>
      <td class="align-left" title="{{ item.status-comment }}" data-toggle="tooltip">
        {% if item.status == "problematic" %}
        <span style="color: #a80223; font-weight: bold"><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Problematické</span>
        {% elsif item.status == "on-track" %}
        <span style="color: #05737bff"><i class="fa-solid fa-chart-line"></i>&nbsp;<b>On-track</b>&nbsp;→&nbsp;{{item.target-year}}</span>
        {% elsif item.status == "no-change-needed" %}
        <span style="color: #05737bff"><i class="fa-solid fa-check"></i>&nbsp;<b>Není treba transformovat</b></span>
        {% elsif item.status == "done" %}
        <span style="color: #05737bff"><i class="fa-solid fa-check"></i></i>&nbsp;<b>Hotovo</b></span>
        {% else %}
        <span>{{item.status}}, {{item.target-year}}</span>
        {% endif %}
      </td>
      <td class="align-left">{{ item.owner }}</td>
      <td class="align-left">
        {% for grant in item.grants -%}
        {%- if forloop.index > 1 %},{% endif %}
        {% if grant.url %}
        <a href="{{ grant.url }}" title="{{ grant.comment }}" data-toggle="tooltip">{{ grant.name }}</a>
        {%- else -%}
        {{ grant.name }}
        {%- endif -%}
        {% endfor %}
      </td>
      <td class="align-left">
        {% for link in item.other-links -%}
        {%- if forloop.index > 1 %},{% endif %}
        {% if link.url %}
        <a href="{{ link.url }}"> </a>
        {%- else -%}
        {%- endif -%}
        {% endfor %}
      </td>
    </tr>
    {% endfor %}
  </tbody>
</table>
