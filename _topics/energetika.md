---
layout:        topic
title:         "Energetika"
slug:          "energetika"
redirect_from: "/energetika"
published:     2022-04-05
map:           true

dashboard:
- 
  title:       "Emisní faktor elektřiny (2019)"
  unit:        "g CO<sub>2</sub>eq / kWh"
  value:       369
  subtitle:    "v Česku"
  value-vs:    212
  subtitle-vs: "průměr EU"
  source:      "Fakta o klimatu"
  source-url:  "https://docs.google.com/spreadsheets/d/1SQSnRSfTQ5HVxVJvwj4igfl22hyblYVjDo_INceKy4I/edit#gid=979818322"
- 
  title:       "Bezemisní elektřina (2019)"
  value:       "48 %"
  subtitle:    "podíl v Česku"
  value-vs:    "61 %"
  subtitle-vs: "podíl v EU"
  source:      "Fakta o klimatu"
  source-url:  "https://docs.google.com/spreadsheets/d/1SQSnRSfTQ5HVxVJvwj4igfl22hyblYVjDo_INceKy4I/edit#gid=979818322"
- 
  title:       "Růst solárních zdrojů (2013-2021)"
  value:       "+ 5 %"
  subtitle:    "ČR: nárůst o 100 MW za 9 let"
  value-vs:    "+ 800 %"
  subtitle-vs: "svět: nárůst o 794 000 MW za 9 let"
  source:      "IEA"
  source-url:  "https://www.iea.org/articles/renewables-2021-data-explorer?mode=market&region=World&publication=2021&product=PV"

subtopics:
- # V kostce
  content:
  - "elektrina-cr"
  - "emise-cr"

-
  id:          "mix"
  title:       "Z čeho vyrábíme elektřinu"
  perex: |
    Český mix zdrojů elektřiny má v současnosti dva pilíře: **hnědé uhlí** a **jádro**. Z obnovitelných zdrojů dnes pochází asi desetina elektřiny. Bioplyn a biomasa z toho tvoří asi polovinu, čtvrtinu slunce, o zbytek se starají vodní a větrné elektrárny.
  content:
  - "elektrina-cr"
  - "elektrina-sr"
  - "elektrina-na-osobu-eu"
  - "elektrina-na-osobu-svet"
  - "elektrina-svet"
  - "2020-globalni-zprava-o-elektrine"

- 
  id:          "emise-v-energetice"
  title:       "Emise v energetice"
  perex: |    
    Elektroenergetika a teplárenství stojí přibližně za **40 % emisí skleníkových plynů v ČR**, největší část z toho tvoří uhelné zdroje. 
    V širším slova smyslu k energetice patří také doprava (16 % emisí), lokální vytápění a ohřev teplé vody v domácnostech, firmách a institucích (10 % emisí) a spalování v průmyslu (8 % emisí). Dohromady tedy zpracování a spalování fosilních paliv v Česku tvoří skoro tři čtvrtě emisí skleníkových plynů.
  qa:
  - 
    question:  "Jak se v Evropě vyvíjí emise v energetice v posledních letech?"
    answer: |
      V Evropě v posledních 10 letech sledujeme jasný odklon od uhlí, za kterým stojí primárně regulace EU: jednak [emisní povolenky](/explainery/emisni-povolenky-ets), jednak čím dál přísnější limity na znečištění vzduchu. Některé státy k tomu přidaly vlastní regulace, např. _[carbon price support](https://researchbriefings.files.parliament.uk/documents/SN05927/SN05927.pdf)_ ve Velké Británii, který tam od roku 2013 doplňoval emisní povolenky a dohromady zajišťoval cenu emisí, která motivovala k transformaci energetiky.

      Uhlí v evropské energetice nahrazujeme z velké části obnovitelnými zdroji a z menší části zemním plynem, každá země ale [má tento poměr jinak](/infografiky/elektrina-na-osobu-eu). Pro [několik států včetně Česka](/infografiky/uhelny-phaseout-eu) je stále uhlí podstatnou součástí energetického mixu.
  -
    question:  "Jak může Česko snížit svoje emise v energetice?"
    answer: |
      Česko může **výrazně** snížit svoje emise, pokud fosilní zdroje nebudou poskytovat *baseline* ale budou pouze pokrývat mezery ve výrobě ze slunce a větru. Při patřičném rozvoji obnovitelných zdrojů nám může stačit méně než třetina dnešní elektřiny z fosilních zdrojů. 

  content:
  - "elektrina-cr"
  - "emise-cr"
  - "emise-cr-vyvoj"
  - "emise-eu-vyvoj"
  - "emise-fosilni-paliva"

-
  id:          "ceny-technologie"
  title:       "Technologie, potenciál, cena"
  content:
  - "cena-elektriny-na-trhu"
  - "cena-energie"
  - "potencial-vetrne-energie-cr"
  - "potencial-solarni-energie-cr-strechy"

-
  id:          "scenare-2030-cr"
  title:       "Česká energetika v roce 2030"
  content:
  - "srovnani-energetickych-scenaru-cr"
  - "scenar-transformace-elektroenergetiky"
  - "2020-scenar-bloombergnef"
  - "2020-scenar-mckinsey"
  - "2020-scenar-ember"
  - "2018-scenar-energynautics"
  - "2019-scenar-necp"
  - "2020-reserse-transformace-energetiky"

-
  id:          "scenare-2050"
  title:       "Energetika v roce 2050"
  content:
  - "2020-transformace-energetiky-do-2050"
  - "2016-snizeni-emisi-cr"
 # TODO: pridat https://2050podcast.cz/epizody/2-transformace-energetiky
---

_Energetika_ zahrnuje těžbu fosilních paliv, elektroenergetiku, plynárenství, teplárenství, pohonné hmoty, atd. V našich materiálech se věnujeme hlavně _elektřině_, protože v budoucí energetice bude zastávat klíčovou roli.

Sektor **elektroenergetiky** je celosvětově největším zdrojem emisí skleníkových plynů (v roce 2017 tvořil cca 40 % emisí CO<sub>2</sub> a cca 25 % emisí všech <glossary id='antropogennisklenikoveplyny'>skleníkových plynů</glossary>). Svým dopadem přesahuje zemědělství stejně jako spalování fosilních paliv v dopravě, spalování fosilních paliv v průmyslu nebo produkci cementu. V rámci elektroenergetiky přes 70 % světových emisí pochází z uhlí, přes 20 % ze zemního plynu, asi 5 % tvoří deriváty ropy. V české elektroenergetice tvoří uhlí dokonce okolo 90 % emisí.