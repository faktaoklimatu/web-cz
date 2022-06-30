---
layout:        topic
title:         "Energetika"
slug:          "energetika"
redirect_from: "/energetika"
published:     2022-04-05
sitemap:       false
map:           true
weight:        30

dashboard:
- title:       "Emisní faktor elektřiny (2019)"
  unit:        "CO<sub>2</sub>eq"
  value:       "369 g"
  subtitle:    "emise z kWh elektřiny v **Česku**"
  value-vs:    "212 g"
  subtitle-vs: "emise z kWh elektřiny v **EU**"
  source:      "Fakta o klimatu"
  source-url:  "/elektrina-na-osobu-eu"
- title:       "Bezemisní elektřina (2019)"
  value:       "48 %"
  subtitle:    "podíl bezemisní elektřiny v **Česku**"
  value-vs:    "61 %"
  subtitle-vs: "podíl bezemisní elektřiny v **EU**"
  source:      "Fakta o klimatu"
  source-url:  "/elektrina-na-osobu-eu"
- title:       "Růst solárních zdrojů (2013–2021)"
  value:       "+5 %"
  subtitle:    "v **Česku** za 9 let jen +100 MW"
  value-vs:    "+800 %"
  subtitle-vs: "**celosvětově** za 9 let +794 000 MW"
  source:      "IEA"
  source-url:  "https://www.iea.org/articles/renewables-2021-data-explorer?mode=market&region=World&publication=2021&product=PV"

subtopics:
  # V kostce
- lead: |
    Výroba elektřiny v Evropě prochází **překotnou transformací**. Přispěly k ní tři faktory: (1) za posledních 10 let prudce klesly [ceny obnovitelných zdrojů](/cena-energie), (2) výrazně zesílilo [zpoplatnění emisí skleníkových plynů](/zpoplatneni-emisi-svet) v energetice, a (3) válka na Ukrajině připomněla nebezpečí velké závislosti na fosilních palivech. Jaký je současný stav výroby elektřiny ve světě?
  commented-content:
  - slug: elektrina-cr
    comment_number: "ČR"
    comment: |
      V Česku se stále **více než polovina elektřiny vyrábí z fosilních zdrojů**.
  - slug: elektrina-na-osobu-eu
    comment_number: "EU"
    comment: |
      V mnoha Evropských zemích **obnovitelné zdroje postupně nahrazují stávající fosilní zdroje**.
  - slug: elektrina-svet
    comment_number: "<i class='fa-solid fa-earth-europe'></i>"
    comment: |
      Celý svět při dekarbonizaci energetiky ještě čeká spousta práce. **Změna ale už probíhá na všech kontinetech.** Např. Indie se zavázala do roku 2030 pokrýt 50 % své spotřeby elektřiny z obnovitelných zdrojů.
  qa:
  -
    q: "Jak může Česko snížit svoje emise v energetice?"
    a: |
      České emise lze výrazně a poměrně rychle a levně snížit **rozvojem obnovitelných zdrojů**, obzvláště pak větru a slunce. To způsobí, že uhelné a plynové elektrárny nebudou vyrábět nepřetržitě ale budou pouze pokrývat mezery ve výrobě ze slunce a větru. Při patřičném rozvoji obnovitelných zdrojů nám může stačit méně než třetina dnešní elektřiny z fosilních zdrojů. Bližší detaily ukazují [scénáře transformace české elektroenergetiky do roku 2030](#scenare-2030-cr) (níže).

      Výrazný **rozvoj jaderných zdrojů** je další možný způsob snížení emisí v energetice. V Česku ovšem nelze čekat žádný nový reaktor dříve než v roce 2036 (realisticky spíše kolem roku 2040), což je příliš pozdě vzhledem k našim emisním závazkům. Rozvoj jaderné energetiky tedy dává smysl pouze v kombinaci s rozvojem obnovitelných zdrojů.

- id:          "mix"
  title:       "Současný stav: z čeho vyrábíme elektřinu?"
  lead: |
    Český mix zdrojů elektřiny má v současnosti dva pilíře: **hnědé uhlí** a **jádro**. Z obnovitelných zdrojů dnes pochází asi desetina elektřiny. Bioplyn a biomasa z toho tvoří asi polovinu, čtvrtinu slunce, o zbytek se starají vodní a větrné elektrárny. **Evropské země mají velmi rozdílné mixy**, v součtu mají zhruba třetinové podíly tyto zdroje: fosilní, jaderné, obnovitelné. **V rozvojovém světě výroba elektřiny prudce stoupá**, převážně díky rozvoji uhelné energetiky. I tam v posledních letech znatelně roste role obnovitelných zdrojů.
  content:
  - elektrina-cr
  - elektrina-sr
  - elektrina-na-osobu-eu
  - elektrina-na-osobu-svet
  - elektrina-svet
  - 2020-globalni-zprava-o-elektrine

- id:          "emise-v-energetice"
  title:       "Současný stav: Emise v energetice"
  lead: |
    Elektroenergetika a teplárenství stojí přibližně za **40 % emisí skleníkových plynů v ČR**, největší část z toho tvoří uhelné zdroje.
    V širším slova smyslu k energetice patří také doprava (16 % emisí), lokální vytápění a ohřev teplé vody v domácnostech, firmách a institucích (10 % emisí) a spalování v průmyslu (8 % emisí). Dohromady tedy zpracování a spalování fosilních paliv v Česku tvoří skoro tři čtvrtě emisí skleníkových plynů. Podobný podíl mají fosilní paliva i v emisích celé EU.
  qa:
  - q: "Proč v posledních letech v Evropě klesají emise v energetice?"
    a: |
      V Evropě v posledních 10 letech sledujeme jasný odklon od uhlí, za kterým stojí primárně regulace EU: jednak [emisní povolenky](/explainery/emisni-povolenky-ets), jednak čím dál přísnější limity na znečištění vzduchu. Některé státy k tomu přidaly vlastní regulace, např. _[carbon price support](https://researchbriefings.files.parliament.uk/documents/SN05927/SN05927.pdf)_ ve Velké Británii, který tam od roku 2013 doplňoval emisní povolenky a dohromady zajišťoval cenu emisí, která motivovala k transformaci energetiky.

      Uhlí v evropské energetice nahrazujeme z velké části obnovitelnými zdroji a z menší části zemním plynem, každá země ale [má tento poměr jinak](/infografiky/elektrina-na-osobu-eu). Pro [několik států včetně Česka](/infografiky/uhelny-phaseout-eu) je stále uhlí podstatnou součástí energetického mixu.

  content:
  - elektrina-cr
  - emise-cr
  - emise-cr-vyvoj
  - emise-eu-vyvoj

- id:          "legislativa"
  title:       "Legislativní kontext"
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
  - cena-elektriny-na-trhu
  - emisni-povolenky-ets
  - zpoplatneni-emisi-svet
  - 21-rust-cen-elektriny

- id:          "technologie"
  title:       "Technologie: potenciál, cena"
  lead: |
    Při zvažování budoucího vývoje elektroenergetiky jsou klíčové tyto aspekty jednotlivých technologií: Jaká je **cena**, tedy investiční a provozní náklady, příp. sdružené náklady na výrobu? Jaký je **potenciál rozvoje**, tedy kolik spotřeby dokáže daná technologie pokrýt? Jaká je **flexibilita výroby**, tedy dokážeme výkon podle potřeby regulovat? Důležitou roli hraje i společenská přijatelnost, geopolitika a energetická bezpečnost.
  qa:
  - q: "Jak můžeme integrovat do sítě obnovitelné zdroje, když je jejich výroba proměnlivá a závislá na počasí?"
    a: |
      Grid nelze postavit _pouze_ na slunci a větru, je potřeba je doplnit dalšími technologiemi a nástroji, které zajistí neustálé balancování výroby a spotřeby: **flexibilní zdroje** (např. biomasa a bioplyn nebo uhlí a zemní plyn ideálně s technologií _CCS_), **flexibilita spotřeby** (např. odkládání spotřeby v průmyslovém chlazení na období nadbytku obnovitelné elektřiny) a **ukládání elektřiny krátkodobě** (např. baterie, přečerpávací elektrárny) a **dlouhodobě** (např. vodík nebo syntetická paliva).

      V dnešní době se k tomuto balancování využívají hlavně existující fosilní elektrárny. V důsledku tak výroba z obnovitelných zdrojů ukrajuje z výroby z uhlí a zemního plynu.
  content:
  - cena-energie
  - potencial-vetrne-energie-cr
  - potencial-solarni-energie-cr-strechy

- id:          "scenare-2030-cr"
  title:       "Scénáře vývoje: Česká energetika v roce 2030"
  lead: |
    EU se zavázala **snížit emise skleníkových plynů do roku 2030 o 55 %** (oproti roku 1990). Transformace energetiky je klíčová k dosažení tohoto cíle. **Jaké jsou scénáře transformace tohoto sektoru v Česku?**
  qa:
  - q: "Proč žádný z těchto scénářů neuvažuje rozvoj jaderné energetiky?"
    a: |
      Do roku 2030 není možné postavit žádný nový velký jaderný reaktor. Pokud se pustíme do výstavby nových jaderných bloků, budou uvedeny do provozu nejdříve v druhé polovině třicátých let a v roce 2030 tak nijak neovlivní výrobu elektřiny.
  content:
  - srovnani-energetickych-scenaru-cr
  - scenar-transformace-elektroenergetiky
  - 2020-scenar-bloombergnef
  - 2020-scenar-mckinsey
  - 2020-scenar-ember
  - 2018-scenar-energynautics
  - 2019-scenar-necp
  - 2020-reserse-transformace-energetiky

- id:          "scenare-2050"
  title:       "Scénáře vývoje: Energetika v roce 2050"
  lead: |
    V dlouhodobém horizontu potřebujeme **elektřinu vyrábět klimaticky neutrálně**. Scénáře dekarbonizace stojí na výrazné elektrifikaci dalších oblastí našeho fungování, a tak budeme potřebovat **řádově dvojnásobek elektřiny oproti dnešku**.
  content:
  - 2020-transformace-energetiky-do-2050
  - 2016-snizeni-emisi-cr
  - 2-transformace-energetiky
---

_Energetika_ zahrnuje těžbu fosilních paliv, elektroenergetiku, plynárenství, teplárenství, pohonné hmoty, atd. V našich materiálech se věnujeme hlavně _elektřině_, protože v budoucí energetice bude zastávat klíčovou roli.

Sektor **elektroenergetiky** je celosvětově největším zdrojem emisí skleníkových plynů (v roce 2017 tvořil cca 40 % emisí CO<sub>2</sub> a cca 25 % emisí všech <glossary id='antropogennisklenikoveplyny'>skleníkových plynů</glossary>). Svým dopadem přesahuje zemědělství stejně jako spalování fosilních paliv v dopravě, spalování fosilních paliv v průmyslu nebo produkci cementu. V rámci elektroenergetiky přes 70 % světových emisí pochází z uhlí, přes 20 % ze zemního plynu, asi 5 % tvoří deriváty ropy. V české elektroenergetice tvoří uhlí dokonce okolo 90 % emisí.
