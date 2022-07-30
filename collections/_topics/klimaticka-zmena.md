---
layout:        topic
title:         "Klimatická změna"
slug:          "klimaticka-zmena"
redirect_from: "/klimaticka-zmena"
sitemap:       false
published:     2022-04-05
weight:        10

dashboard:
- type:        "single"
  col-lg-size: "3-5"
  col-xl-size: 3
  value:       "**419** ppm"
  subtitle:    "**koncentrace CO<sub>2</sub>** v atmosféře v roce 2022"
  # comment:     "(celých 10 000 let před průmyslovou revolucí byla stabilní koncentrace ~270 ppm)"
  source:      "Fakta o klimatu"
  source-url:  "/koncentrace-co2"
- type:        "single"
  col-lg-size: "3-5"
  col-xl-size: 3
  value:       "**+ 1,2 °C**"
  subtitle:    "**oteplení světa** od druhé poloviny 19. století"
  # comment:     "(to je asi asi +0,2 °C za dekádu)"
  source:      "Fakta o klimatu"
  source-url:  "https://docs.google.com/spreadsheets/d/1SQSnRSfTQ5HVxVJvwj4igfl22hyblYVjDo_INceKy4I/edit#gid=979818322"
- type:        "single"
  col-lg-size: "3-5"
  col-xl-size: 3
  value:       "**+ 2,1 °C**"
  subtitle:    "**oteplení Česka** od roku 1960"
  # comment:     "(to je asi asi +0,35 °C za dekádu)"
  source:      "Fakta o klimatu"
  source-url:  "https://docs.google.com/spreadsheets/d/1SQSnRSfTQ5HVxVJvwj4igfl22hyblYVjDo_INceKy4I/edit#gid=979818322"
- type:        "compare"
  col-lg-size: 5
  col-xl-size: "4-5"
  title:       "**Zalednění Severního ledového oceánu**"
  data:
  - value:     "**7,5** mil. km²"
    subtitle:  "v září 1980"
  - value:     "**4** mil. km²"
    subtitle:  "v září 2020"
  source:      "NSIDC"
  source-url:  "http://nsidc.org/arcticseaicenews/2021/09/"
- type:        "compare"
  col-lg-size: 5
  col-xl-size: "4-5"
  title:       "**Očekávané zvýšení hladin oceánů**"
  data:
  - value:     "**50–80** cm"
    subtitle:  "do roku **2100**"
  - value:     "**100–420** cm"
    subtitle:  "do roku **2300**"
  source:      "IPCC"
  source-url:  "https://www.ipcc.ch/report/ar6/wg1/"

subtopics:
  # Klimatická změna v kostce
- lead: |
    Jak se vyznat ve složité problematice klimatu a jeho změn? Pro začátek je určitě dobré vědět, že:
  commented-content:
  - slug: "schema-klimaticke-zmeny"
    comment-key: 1
    comment: |
      Současná změna klimatu je **série příčin a následků**: lidstvo mění složení atmosféry, což zesiluje skleníkový efekt. Ten pak způsobuje oteplování, tání ledovců a další jevy.
  - slug: "souvislost-koncentrace-oteplovani"
    comment-key: 2
    comment: |
      **Čím více skleníkových plynů** lidstvo vypustí do atmosféry, **tím více se planeta oteplí**.
  - slug: "mapa-zmeny-teploty"
    comment-key: 3
    comment: |
      Klimatická změna se neprojevuje všude stejně: **různé oblasti světa se oteplují různě rychle**.

- id:          "data"
  title:       "Data a pozorované změny"
  lead: |
     Měření teploty z meteorologických stanic i družic, měření koncentrací skleníkových plynů ze současné atmosféry i z ledovcových vrtů, data o každoročních změnách v množství sněhu a ledu i data o vzestupu hladin oceánů – všechny tyto údaje umožňují představit si rychlost a rozsah probíhající klimatické změny a porovnat ji se změnami, kterými planeta procházela v minulosti.
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
    Skleníkové plyny zachytávají tepelné záření. Dynamika. Uhlíkový cyklus.
  qa:
  - q: "Co znamená citlivost klimatu?"
    a: |
      Čím vyšší jsou koncentrace CO<sub>2</sub> v atmosféře, tím vyšší je teplota planety. Zvýšení koncentrace oxidu uhličitého o 10 ppm (*parts per million*) způsobí oteplení planety asi o 0,1 °C. Tento přibližný vztah je užitečný k odhadům budoucího vývoje.
  - q: "Co znamená uhlíkový rozpočet?"
    a: |
      Podobně jako rodinný rozpočet na dovolenou udává, kolik peněz je celkově možné utratit v průběhu dovolené, globální uhlíkový rozpočet říká, jaké množství CO<sub>2</sub> může ještě lidstvo vypustit, aby nebyla překročena určitá hodnota globálního oteplení.

  content:
  - historie-sklenikoveho-efektu
  - dukazy-vlivu-co2
  - souvislost-koncentrace-oteplovani
  - otepleni-zvysenim-koncentrace-co2
  - 8-ipcc-ar6-cast-1
  - souvislost-emise-otepleni
  - koncept-uhlikovy-rozpocet
  - emise-dychani
  - cykly-koncentrace-co2

- id:          "dopady-budoucnost"
  title:       "Dopady a budoucí vývoj"
  lead: |
    Vyšší teploty a častější sucha nepříznivě ovlivňují zdraví lesů a pěstování potravin, vzestup hladin oceánů ohrožuje města na pobřeží a kvůli tání horských ledovců chybí voda v povodích, která jsou jimi napájena. To jsou příklady dopadů klimatické změny. **Velikost dopadů**, s nimiž se budeme setkávat v následujících desetiletích, přímo **závisí na tom, kolik skleníkových plynů do atmosféry ještě vypustíme**. Pro jednotlivé emisní scénáře pak vědci modelují další budoucí vývoj klimatické změny a její očekávané dopady.
  qa:
  - q: "Co to jsou body zlomu?"
    a: |
      Každý ekosystém má svůj "bod zlomu", tedy moment, kdy začne být změna přírodních podmínek natolik významná, že už ji tento ekosystém není schopen dále zvládat a "zlomí se" – podobně jako větev stromu při příliš velkém zatížení. Zatímco oteplení o 1,5 °C bude fatální "jen" pro většinu korálových útesů v oceánech, hranicí 2 °C se již blížíme pravděpodobným bodům zlomu u mnoha velkých ekosystémů na naší planetě, jako jsou například severské jehličnaté lesy.

  content:  # U nového obsahu zvaž přidání také do ekonomika>ekonomicke-dopady.
  - schema-klimaticke-zmeny
  - ubyvani-biodiverzity
  - vymirani-koralovych-utesu
  - body-zlomu-1
  - body-zlomu-2
  - body-zlomu-3
  - emisni-scenare-pariz
  - souvislost-emise-otepleni
  - 23-dopady-zmen-klimatu
  - 2019-science-vyjadreni-vedcu
  - 2019-klimaticke-podminky-cr-1

- id:          "extremy"
  title:       "Extrémní jevy"
  lead: |
    Vlny veder na pevnině i tzv. "mořské vlny veder", přívalové deště, dlouhé periody sucha, hurikány (odborně "tropické cyklóny") nebo počasí s rizikem lesních požárů (kombinace sucha a větru) patří mezi **extrémní projevy počasí**, které **se s postupující klimatickou změnou vyskytují častěji než dříve a přicházejí s větší intenzitou**.

  content:
  - vliv-klimatu-na-extremy
  - vliv-klimatu-na-extremy-prirucka
  - vliv-klimatu-na-extremy-cesko
  - tropicke-dny-brno
  - tropicke-dny-praha
---

**Současná klimatická změna je způsobena činností člověka**. Tím se výrazně liší od změn klimatu v minulosti. **Spalování uhlí, ropy a zemního plynu** a některé další činnosti **mění složení atmosféry** a přidávají do ní skleníkové plyny. Zesílený skleníkový efekt pak způsobuje oteplování s důsledky jako tání ledovců, vzestup hladin oceánů, dlouhodobá sucha nebo častější vlny veder a jiné extrémní projevy počasí.

**Dopady změny klimatu** na společnost i přírodu, s nimiž se budeme setkávat v následujících desetiletích, **budou přímo závislé na množství skleníkových plynů, které ještě do atmosféry vypustíme**, ať už spalováním fosilních paliv nebo jinými aktivitami, při nichž vzniká velké množství emisí.
