---
layout:        topic
title:         "Energetika"
tag-name:      "energetika"
slug:          "energetika"
redirect_from: "/energetika"
published:     2022-04-05
weight:        30
intro: |
  Energetika se zabývá **získáváním, přeměnou a distribucí všech forem energie.** V první řadě jde o **těžbu** a distribuci uhlí, ropy, zemního plynu a dalších paliv. Na to navazuje jejich zpracování, tedy **výroba a distribuce elektřiny, tepla a pohonných hmot**. Kromě toho se fosilní paliva také **spalují přímo**: v průmyslu, v domácnostech a ve službách.

  Právě energetika je z hlediska dekarbonizace stěžejní oblastí: **těžba a spalování fosilních paliv stojí za ¾ celosvětových emisí** skleníkových plynů. Nahrazení fosilních paliv nicméně vyžaduje přechod na bezemisní elektřinu (například z obnovitelných zdrojů) a elektrifikaci dopravy, vytápění i průmyslu. Nejvíce pozornosti je proto v této sekci věnováno **výrobě elektřiny.**

dashboard:
- type:        "compare"
  col-lg-size: "5"
  col-xl-size: "4-5"
  title:       "**Emisní faktor elektřiny** <span class='nobr'>za rok 2019</span>"
  data:
  - region:    "cz"
    value:     "**369** g CO<sub>2</sub>eq"
    subtitle:  "za kWh elektřiny"
  - region:    "eu"
    value:     "**212** g CO<sub>2</sub>eq"
    subtitle:  "za kWh elektřiny"
  source:      "Fakta o klimatu"
  source-url:  "/elektrina-na-osobu-eu"
- type:        "compare"
  col-lg-size: "3-5"
  title:       "**Podíl bezemisní elektřiny** (2019)"
  data:
  - region:    "cz"
    value:     "**48** %"
  - region:    "eu"
    value:     "**61** %"
  source:      "Fakta o klimatu"
  source-url:  "/elektrina-na-osobu-eu"
- type:        "compare"
  col-lg-size: "3-5"
  title:       "**Růst výkonu solárních zdrojů** <span class='nobr'>(2013–2021)</span>"
  data:
  - region:    "cz"
    value:     "**+5** %"
    subtitle:  "+100 MW"
  - region:    "world"
    value:     "**+800** %"
    subtitle:  "+794 000 MW"
  source:      "IEA"
  source-url:  "https://www.iea.org/articles/renewables-2021-data-explorer?mode=market&region=World&publication=2021&product=PV"

subtopics:
  # V kostce
- lead: |
    Výroba elektřiny v Evropě prochází v současnosti **rychlou transformací**. Vedou k ní tři tlaky: (1) za posledních 10 let prudce klesly [ceny elektřiny z obnovitelných zdrojů](/cena-energie), (2) výrazně zesílilo [zpoplatnění emisí skleníkových plynů](/zpoplatneni-emisi-svet) v energetice a (3) válka na Ukrajině připomněla nebezpečí velké závislosti na importovaných fosilních palivech.

    Jak daleko jsme v této transformaci dnes? Jinými slovy: z jakých zdrojů se v současné době elektřina vyrábí?
  commented-content:
  - slug: elektrina-cr
    comment-key: "ČR"
    comment: |
      **Více než polovina elektřiny** se u nás stále vyrábí **z fosilních zdrojů**.
  - slug: elektrina-na-osobu-eu
    comment-key: "EU"
    comment: |
      V mnoha zemích EU **obnovitelné zdroje postupně nahrazují stávající fosilní zdroje**.
  - slug: elektrina-svet
    comment-key: "<i class='fa-solid fa-earth-europe'></i>"
    comment: |
      **Celosvětově je dekarbonizace velká výzva. Dávno už ale začala**. Např. Indie chce do roku 2030 vyrábět 50 % elektřiny z obnovitelných zdrojů.
  qa:
  -
    q: "Jak může Česko snížit svoje emise v energetice?"
    a: |
      České emise lze výrazně a poměrně rychle a levně snížit **rozvojem obnovitelných zdrojů energie**, obzvláště pak z větru a slunce. To způsobí, že uhelné a plynové elektrárny nebudou vyrábět nepřetržitě, ale budou pouze pokrývat mezery ve výrobě elektřiny ze slunce a větru. Při patřičném rozvoji obnovitelných zdrojů nám může stačit méně než třetina dnešní elektřiny z fosilních zdrojů. Bližší detaily ukazují [scénáře transformace české elektroenergetiky do roku 2030](#scenare-2030-cr) (níže).

      Dalším možným způsobem snížení emisí v energetice je **rozvoj jaderných zdrojů**. V Česku ovšem nelze čekat žádný nový reaktor dříve než v roce 2036 (realisticky spíše kolem roku 2040), což je příliš pozdě vzhledem k našim emisním závazkům. Rozvoj jaderné energetiky tedy dává smysl pouze v kombinaci s rozvojem obnovitelných zdrojů.

- id:          "mix"
  title:       "Současný stav: Jak vyrábíme elektřinu?"
  title-short: "Jak vyrábíme elektřinu?"
  lead: |
    Český mix zdrojů elektřiny má v současnosti dva pilíře: **hnědé uhlí** a **jádro**. Z obnovitelných zdrojů dnes pochází asi desetina elektřiny. Z toho zhruba polovinu tvoří bioplyn a biomasa, čtvrtinu slunce, o zbytek se starají vodní a větrné elektrárny. **Evropské země mají velmi rozdílné energetické mixy**, celkově pak mají fosilní, jaderné a obnovitelné zdroje v EU přibližně třetinové podíly. **V rozvojovém světě výroba elektřiny prudce stoupá**, převážně díky rozvoji uhelné energetiky. I tam ale v posledních letech znatelně roste role obnovitelných zdrojů.
  content:
  - elektrina-cr
  - elektrina-sr
  - elektrina-mix-eu
  - elektrina-na-osobu-eu
  - elektrina-na-osobu-svet
  - elektrina-svet
  - 2023-reserse-transformace-mixu

- id:          "emise-v-energetice"
  title:       "Současný stav: Emise z energetiky"
  title-short: "Emise"
  lead: |
    Z elektroenergetiky a teplárenství pochází přibližně **40 % emisí skleníkových plynů v ČR**, z toho největší část tvoří uhelné zdroje.
    V širším slova smyslu k energetice patří také doprava (16 % emisí), lokální vytápění a ohřev teplé vody v domácnostech, firmách a institucích (10 % emisí) a spalování v průmyslu (8 % emisí). Dohromady tedy zpracování a spalování fosilních paliv v Česku tvoří skoro tři čtvrtiny emisí skleníkových plynů. Podobný podíl mají fosilní paliva i v emisích celé EU.
  qa:
  - q: "Proč v posledních letech v Evropě klesají emise v energetice?"
    a: |
      **V Evropě v posledních 10 letech sledujeme jasný odklon od uhlí**, za kterým stojí primárně regulace EU: jednak [emisní povolenky](/explainery/emisni-povolenky-ets), jednak čím dál přísnější limity na znečištění vzduchu. Některé státy k tomu přidaly vlastní regulace, např. _[carbon price support](https://researchbriefings.files.parliament.uk/documents/SN05927/SN05927.pdf)_ ve Velké Británii, který tam od roku 2013 doplňoval emisní povolenky a dohromady zajišťoval cenu emisí, která motivovala k transformaci energetiky.

      Uhlí v evropské energetice nahrazujeme z velké části obnovitelnými zdroji a z menší části zemním plynem, každá země ale [má tento poměr jinak](/infografiky/elektrina-na-osobu-eu). Pro [několik států včetně Česka](/infografiky/uhelny-phaseout-eu) je uhlí stále podstatnou součástí energetického mixu.

  content:
  - elektrina-cr
  - emise-cr
  - emise-cr-vyvoj
  - emise-eu-vyvoj
  - uhelny-phaseout-eu

- id:          "legislativa"
  title:       "Legislativní kontext"
  title-short: "Legislativa"
  lead: |
    Evropskou energetiku zásadně ovlivňují dva koncepty: **liberalizovaný trh s elektřinou** a systém **obchodování s emisními povolenkami**.
  qa:
  - q: "Proč je cena elektřiny v Česku tak citlivá na cenu zemního plynu?"
    a: |
      Momentální **cenu silové elektřiny určuje nejdražší zdroj**, který je nutný k pokrytí momentální spotřeby elektřiny. Plynové elektrárny jsou (při velmi vysokých cenách zemního plynu) tímto nejdražším zdrojem, který je ještě často nutné používat (obzvláště v obdobích vyšší spotřeby, tedy v zimě a během dne). Tento zdroj pak táhne nahoru i průměrnou cenu silové elektřiny, která se propisuje do faktur koncových zákazníků.
  - q: "Jaký smysl mají evropské emisní povolenky?"
    a: |
      Systém obchodování s emisními povolenkami narovnává tržní prostředí tím, že **zpoplatňuje zatěžování životního prostředí**. V ekonomickém jazyce jde o _internalizaci externalit_. Cena produktu (např. elektřiny z fosilních zdrojů) tak zahrnuje škody na životním prostředí (např. způsobené spalováním fosilních paliv). Emisní povolenky jsou jeden z možných způsobů **zpoplatnění emisí**, v některých státech se místo toho nebo jako doplněk používá uhlíková daň.
  content:
  - cena-elektriny-na-trhu
  - emisni-povolenky-ets
  - zpoplatneni-emisi-svet
  - repowereu
  - vyvoj-systemu-elektriny
  - 21-rust-cen-elektriny

- id:          "technologie"
  title:       "Technologie: Potenciál a cena"
  title-short: "Technologie"
  lead: |
    Při zvažování budoucího vývoje elektroenergetiky jsou klíčové tyto aspekty jednotlivých technologií: jaká je **cena**, tedy investiční a provozní náklady, příp. sdružené náklady na výrobu? Jaký je **potenciál technologie**, tj. kolik spotřeby dokáže pokrýt? Jaká je **flexibilita výroby**, tedy dokážeme výkon podle potřeby regulovat? Dále je při úvahách o budoucnosti elektroenergetiky důležitá i společenská přijatelnost, geopolitika a energetická bezpečnost.
  qa:
  - q: "Jak můžeme do sítě integrovat obnovitelné zdroje, když je jejich výroba proměnlivá a závislá na počasí?"
    a: |
      Elektrizační soustavu nelze postavit _pouze_ na slunci a větru. Je potřeba je doplnit dalšími technologiemi a nástroji, které zajistí neustálé balancování výroby a spotřeby: **flexibilní zdroje** (např. biomasa a bioplyn nebo uhlí a zemní plyn, ideálně s technologií _CCS_), **flexibilita spotřeby** (např. odkládání spotřeby v průmyslovém chlazení na období nadbytku obnovitelné elektřiny) a **ukládání elektřiny krátkodobě** (např. bateriemi nebo přečerpávacími elektrárnami) a **dlouhodobě** (např. vodíkem nebo syntetickými palivy).

      V dnešní době se k tomuto vyrovnávání využívají hlavně existující fosilní elektrárny. V důsledku tak výroba z obnovitelných zdrojů ukrajuje z výroby z uhlí a zemního plynu.
  content:
  - cena-energie
  - potencial-vetrne-energie-cr
  - potencial-solarni-energie-cr-strechy

- id:          "scenare-2030-cr"
  title:       "Scénáře vývoje: Česká energetika v roce 2030"
  title-short: "Scénáře Česko 2030"
  lead: |
    EU se zavázala **snížit emise skleníkových plynů do roku 2030 o 55 %** (oproti roku 1990). K dosažení tohoto cíle je klíčová právě transformace energetiky. **Jaké jsou scénáře pro transformaci tohoto sektoru v Česku?**
  qa:
  - q: "Proč žádný z těchto scénářů neuvažuje rozvoj jaderné energetiky?"
    a: |
      Do roku 2030 není možné postavit žádný nový velký jaderný reaktor. Pokud se pustíme do výstavby nových jaderných bloků, budou uvedeny do provozu nejdříve v druhé polovině třicátých let (realisticky spíše až kolem roku 2040), a v roce 2030 tak nijak neovlivní výrobu elektřiny.
  content:
  - srovnani-energetickych-scenaru-cr
  - scenar-transformace-elektroenergetiky
  - 2023-rozvoj-obnovitelne-energie-v-cesku-do-2030
  - 2020-scenar-bloombergnef
  - 2020-scenar-mckinsey
  - 2020-scenar-ember
  - 2018-scenar-energynautics
  - 2019-scenar-necp
  - 2020-reserse-transformace-energetiky

- id:          "serie-elektrina-2050-cr"
  series:      True
  title:       "Bezemisní energetika v Česku v roce 2050"
  title-short: "Bezemisní energetika v Česku 2050"
  series-short-lead: |
    Tento text je součástí série textů o základních kamenech bezemisní energetiky.
  lead: |
    Ve vzdálenější budoucnosti budeme potřebovat **elektřinu vyrábět klimaticky neutrálně**. Navíc jí kvůli elektrifikaci jiných sektorů budeme potřebovat výrazně více. Jaké jsou technologické možnosti takové transformace? Jaká jsou kritéria, podle kterých můžeme vyhodnocovat různé scénáře takové transformace?
  content:
  - bezemisni-energetika-cr-1-scenare
  - bezemisni-energetika-cr-2-technologie
---
