---
layout:        topic
title:         "Klimatická změna"
slug:          "physical-basis"
redirect_from: "/physical-basis"
published:     2022-04-05
map:           true

dashboard:
- title:       "Koncentrace CO2 v atmosféře"
  unit:        "ppm"
  value:       419
  comment:    "v roce 2022"
  value-vs:    270
  comment-vs: "od konce poslední doby ledové až do průmyslové revoluce"
  source:      "Fakta o klimatu"
  source-url:  "https://docs.google.com/spreadsheets/d/1SQSnRSfTQ5HVxVJvwj4igfl22hyblYVjDo_INceKy4I/edit#gid=979818322"
- title:       "Oteplování svět"
  value:       "1,2 °C"
  comment:     "od 1850 - 1900 , tempo růstu +0.2°C za dekádu"
  source:      "Fakta o klimatu"
  source-url:  "https://docs.google.com/spreadsheets/d/1SQSnRSfTQ5HVxVJvwj4igfl22hyblYVjDo_INceKy4I/edit#gid=979818322"
- title:       "Oteplování ČR"
  value-vs:    "2,1°C"
  comment:     "od 1960, tempo růstu +0.35°C za dekádu"
  source:      "Fakta o klimatu"
  source-url:  "https://docs.google.com/spreadsheets/d/1SQSnRSfTQ5HVxVJvwj4igfl22hyblYVjDo_INceKy4I/edit#gid=979818322"
- title:       "Růst hladin oceánů"
  value:       "+3,7 mm / rok "
  comment:     "budoucí vývoj: +0.5-0.8m (v roce 2100),  "
  comment-vs:  "+1.0 - 4,2m (v r0ce 2300)" 
  source:      "IEA"
  source-url:  "https://www.iea.org/articles/renewables-2021-data-explorer?mode=market&region=World&publication=2021&product=PV"
- title:       "Zalednění severního oceánu"
  value:       "7,5 mil km2"
  subtitle:    "září 1980"
  comment:     "nárůst o 100 MW za 9 let"
  value-vs:    "4 mil km2 "
  subtitle-vs: "září 2020"
  source:      "NSIDC"
  source-url:  "http://nsidc.org/arcticseaicenews/2021/09/"


subtopics:
  # Klimatická změna v kostce
- lead: |
    Výroba elektřiny prochází **turbulentním obdobím**: za posledních 10 let prudce **klesly ceny obnovitelných zdrojů**, v Evropě i jinde výrazně **zesílilo zpoplatnění emisí skleníkových plynů** v energetice, které dále urychluje transformaci. To zvyšuje tržní tlak na uhelné a plynové elektrárny, které tvoří asi třetinu evropského mixu?
  qa:
  -
    q: "Jak může Česko snížit svoje emise v energetice?"
    a: |
      České emise lze výrazně a poměrně rychle a levně snížit **rozvojem obnovitelných zdrojů**, obzvláště pak větru a slunce. To způsobí, že uhelné a plynové elektrárny nebudou vyrábět nepřetržitě ale budou pouze pokrývat mezery ve výrobě ze slunce a větru. Při patřičném rozvoji obnovitelných zdrojů nám může stačit méně než třetina dnešní elektřiny z fosilních zdrojů. Bližší detaily ukazují [scénáře transformace české elektroenergetiky do roku 2030](#scenare-2030-cr) (níže).

      Výrazný **rozvoj jaderných zdrojů** je další možný způsob snížení emisí v energetice. V Česku ovšem nelze čekat žádný nový reaktor dříve než v roce 2036 (realisticky spíše kolem roku 2040), což je příliš pozdě vzhledem k našim emisním závazkům. Rozvoj jaderné energetiky tedy dává smysl pouze v kombinaci s rozvojem obnovitelných zdrojů.
  content:
  - schema-klimaticke-zmeny
  - souvislost-koncentrace-oteplovani
  - teplota-cr

- id:          "data"
  title:       "Data a pozorované změny"
  lead: |
    
  content:
  - teplotni-anomalie
  - teplota-cr
  - teplota-22000-let
  - mapa-zmeny-teploty
  - koncentrace-co2
  - cykly-koncentrace-co2
  - souvislost-koncentrace-oteplovani
  - teplota-cr-mesice
  - trend-teplot-cr

- id:          "fyzika"
  title:       "Fyzikální základy a principy"
  lead: |
    .
  qa:
  - q: "Proč v posledních letech v Evropě klesají emise v energetice?"
    a: |
      V Evropě v posledních 10 letech sledujeme jasný odklon od uhlí, za kterým stojí primárně regulace EU: jednak [emisní povolenky](/explainery/emisni-povolenky-ets), jednak čím dál přísnější limity na znečištění vzduchu. Některé státy k tomu přidaly vlastní regulace, např. _[carbon price support](https://researchbriefings.files.parliament.uk/documents/SN05927/SN05927.pdf)_ ve Velké Británii, který tam od roku 2013 doplňoval emisní povolenky a dohromady zajišťoval cenu emisí, která motivovala k transformaci energetiky.

      Uhlí v evropské energetice nahrazujeme z velké části obnovitelnými zdroji a z menší části zemním plynem, každá země ale [má tento poměr jinak](/infografiky/elektrina-na-osobu-eu). Pro [několik států včetně Česka](/infografiky/uhelny-phaseout-eu) je stále uhlí podstatnou součástí energetického mixu.

  content:
  - souvislost-koncentrace-oteplovani
  - emise-dychani
  - dukazy-vlivu-co2
  - otepleni-zvysenim-koncentrace-co2
  - cykly-koncentrace-co2
  - souvislost-emise-otepleni
  - koncept-uhlikovy-rozpocet

- id:          "dopady-budoucnost"
  title:       "Dopady a budoucí vývoj"
  lead: |
    Evropskou energetiku zásadně ovlivňují dva koncepty: **liberalizovaný trh s elektřinou** a systém **obchodování s emisními povolenkami**.
  qa:
  - q: "Proč je cena elektřiny v Česku tak citlivá na cenu zemního plynu?"
    a: |
      Momentální cenu silové elektřiny určuje nejdražší zdroj, který je nutný k pokrytí momentální spotřeby elektřiny. Plynové elektrárny jsou (při velmi vysokých cenách zemního plynu) tímto nejdražším zdrojem,  který je ještě často nutné používat (obzvláště v obdobích vyšší spotřeby, tedy v zimě a během dne). Tento zdroj pak táhne nahoru i průměrnou cenu silové elektřiny, která se propisuje do faktur koncových zákazníků.
  - q: "Jaký smysl mají evropské emisní povolenky?"
    a: |
      Systém obchodování s emisními povolenkami narovnává tržní prostředí tím, že **zpoplatňuje zatěžování životního prostředí**. V ekonomickém jazyce jde o _internalizaci externalit_. Cena produktu (např. elektřiny z fosilních zdrojů) tak zahrnuje škody na životním prostředí (např. způsobené spalováním fosilních paliv). Emisní povolenky jsou
      jeden z možných způsobů **zpoplatnění emisí**, v některých státech se místo toho používá uhlíková daň.
  content:
  - body-zlomu-1
  - body-zlomu-2
  - body-zlomu-3

- id:          "extrémy"
  title:       "Extrémní jevy"
  lead: |
    Při zvažování budoucího vývoje elektroenergetiky jsou klíčové tyto aspekty jednotlivých technologií: Jaká je **cena**, tedy investiční a provozní náklady, příp. sdružené náklady na výrobu? Jaký je **potenciál rozvoje**, tedy kolik spotřeby dokáže daná technologie pokrýt? Jaká je **flexibilita výroby**, tedy dokážeme výkon podle potřeby regulovat? Důležitou roli hraje i společenská přijatelnost, geopolitika a energetická bezpečnost.
  qa:
  - q: "Jak můžeme integrovat do sítě obnovitelné zdroje, když je jejich výroba proměnlivá a závislá na počasí?"
    a: |
      Grid nelze postavit _pouze_ na slunci a větru, je potřeba je doplnit dalšími technologiemi a nástroji, které zajistí neustálé balancování výroby a spotřeby: **flexibilní zdroje** (např. biomasa a bioplyn nebo uhlí a zemní plyn ideálně s technologií _CCS_), **flexibilita spotřeby** (např. odkládání spotřeby v průmyslovém chlazení na období nadbytku obnovitelné elektřiny) a **ukládání elektřiny krátkodobě** (např. baterie, přečerpávací elektrárny) a **dlouhodobě** (např. vodík nebo syntetická paliva).

      V dnešní době se k tomuto balancování využívají hlavně existující fosilní elektrárny. V důsledku tak výroba z obnovitelných zdrojů ukrajuje z výroby z uhlí a zemního plynu.
  content:
  - tropicke-dny-brno
  - tropicke-dny-praha

---

_Energetika_ zahrnuje těžbu fosilních paliv, elektroenergetiku, plynárenství, teplárenství, pohonné hmoty, atd. V našich materiálech se věnujeme hlavně _elektřině_, protože v budoucí energetice bude zastávat klíčovou roli.

Sektor **elektroenergetiky** je celosvětově největším zdrojem emisí skleníkových plynů (v roce 2017 tvořil cca 40 % emisí CO<sub>2</sub> a cca 25 % emisí všech <glossary id='antropogennisklenikoveplyny'>skleníkových plynů</glossary>). Svým dopadem přesahuje zemědělství stejně jako spalování fosilních paliv v dopravě, spalování fosilních paliv v průmyslu nebo produkci cementu. V rámci elektroenergetiky přes 70 % světových emisí pochází z uhlí, přes 20 % ze zemního plynu, asi 5 % tvoří deriváty ropy. V české elektroenergetice tvoří uhlí dokonce okolo 90 % emisí.
