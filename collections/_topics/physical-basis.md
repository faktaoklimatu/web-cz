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
    Klimatická změna je složitý řetězec příčin a následků: lidstvo mění složení atmosféry spalováním fosilních paliv a dalšími činnostmi, zvýšené množství skleníkových plynů zadržuje teplo v atmosféře a způsobuje globální oteplování a to má za následek tání ledovců, sucha nebo extrémy jako povodně nebo vlny veder. Klimatická změna se neprojevuje všude stejně: různé oblasti světa se oteplují různě rychle
 
  content:
  - schema-klimaticke-zmeny
  - souvislost-koncentrace-oteplovani
  - mapa-zmeny-tepoty

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
    Skleníkové plyny zachytávají teplené záření.
  qa:
  - q: "Co znamená Citlivost klimatu? "
    a: |
      Čím vyšší koncentrace CO2 v atmosféře, tím vyšší teplota planety. Zvýšení koncentrace o 10 ppm (parts per million) způsobí oteplení planety asi o 0,1 °C. Tento přibližný vztah je užitečný k mnoha úvahám a odhadům budoucího vývoje, 
  - q: "Co znamená Uhlíkový rozpočet? "
    a: |
       Podobně jako rodinný rozpočet na dovolenou udává, kolik peněz je celkově možné utratit v průběhu dovolené, globální uhlíkový rozpočet říká, jaké množství CO2 může ještě lidstvo vypustit, aby nebyla překročena určitá hodnota globálního oteplení.

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
  - q: "Co to jsou body zlomu?"
    a: |
      Momentální cenu silové elektřiny určuje nejdražší zdroj, který je nutný k pokrytí momentální spotřeby elektřiny. Plynové elektrárny jsou (při velmi vysokých cenách zemního plynu) tímto nejdražším zdrojem,  který je ještě často nutné používat (obzvláště v obdobích vyšší spotřeby, tedy v zimě a během dne). Tento zdroj pak táhne nahoru i průměrnou cenu silové elektřiny, která se propisuje do faktur koncových zákazníků.

  content:
  - body-zlomu-1
  - body-zlomu-2
  - body-zlomu-3

- id:          "extrémy"
  title:       "Extrémní jevy"
  lead: |
    Při zvažování budoucího vývoje elektroenergetiky jsou klíčové tyto aspekty jednotlivých technologií: Jaká je **cena**, tedy investiční a provozní náklady, příp. sdružené náklady na výrobu? Jaký je **potenciál rozvoje**, tedy kolik spotřeby dokáže daná technologie pokrýt? Jaká je **flexibilita výroby**, tedy dokážeme výkon podle potřeby regulovat? Důležitou roli hraje i společenská přijatelnost, geopolitika a energetická bezpečnost.

  content:
  - tropicke-dny-brno
  - tropicke-dny-praha

---

_Energetika_ zahrnuje těžbu fosilních paliv, elektroenergetiku, plynárenství, teplárenství, pohonné hmoty, atd. V našich materiálech se věnujeme hlavně _elektřině_, protože v budoucí energetice bude zastávat klíčovou roli.

Sektor **elektroenergetiky** je celosvětově největším zdrojem emisí skleníkových plynů (v roce 2017 tvořil cca 40 % emisí CO<sub>2</sub> a cca 25 % emisí všech <glossary id='antropogennisklenikoveplyny'>skleníkových plynů</glossary>). Svým dopadem přesahuje zemědělství stejně jako spalování fosilních paliv v dopravě, spalování fosilních paliv v průmyslu nebo produkci cementu. V rámci elektroenergetiky přes 70 % světových emisí pochází z uhlí, přes 20 % ze zemního plynu, asi 5 % tvoří deriváty ropy. V české elektroenergetice tvoří uhlí dokonce okolo 90 % emisí.
