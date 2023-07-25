---
layout:        topic
title:         "Emise skleníkových plynů"
tag-name:      "emise"
slug:          "emise"
redirect_from: "/emise"
published:     2022-07-01
weight:        20
intro: |
  Lidmi způsobené emise skleníkových plynů zesilují v atmosféře skleníkový efekt, což vede k oteplování planety. Hlavním skleníkovým plynem je **oxid uhličitý** (CO<sub>2</sub>), který k oteplování přispívá přibližně ze 70 %. Jeho koncentrace v atmosféře rostou především kvůli spalování fosilních paliv, ale například i kácení pralesů nebo výrobě oceli a cementu. Dalším významným skleníkovým plynem je **metan** (CH<sub>4</sub>), který do atmosféry uniká hlavně při těžbě fosilních paliv a chovu dobytka. Ke skleníkovým plynům patří i **oxid dusný** (vznikající zejména při používání umělých dusíkatých hnojiv) ⁠a řada synteticky vyráběných **fluorovaných plynů**.

  K zastavení klimatické změny je klíčové dosáhnout celosvětově tzv. **klimatické neutrality** – tedy stavu, kdy lidstvo už svou činností nebude přidávat do atmosféry žádné skleníkové plyny.

dashboard:
- type:        "compare"
  col-xl-size: "3-5"
  title:       "**Celkové emise** za rok 2018"
  data:
  - region:    "world"
    value:     "**51,2**"  # Tohle je tricky -> IPCC uvádí cca 58 Gt CO2eq. EDGAR nepočítá LULUCF a tvrdí, že LULUCF je souhrnně net sink (~ 5 Gt CO2). Oproti tomu IPCC uvádí LULUCF emise cca 6.6 Gt CO2, protože odlišně definuje "antropogenní" (nezahrnuje pohlcování existujícími ekosystémy).
    subtitle:  "mld. tun CO<sub>2</sub>eq"
  - region:    "cz"
    value:     "**129**"  # Pro EU / Česko všude používáme Eurostat data (metriku TOTX4_MEMONIA). Sice to není zcela konzistentní s daty z Edgaru, ale je lepší používat všude stejné číslo.
    subtitle:  "mil. tun CO<sub>2</sub>eq"
  source:      "EDGAR, European Commission (světové emise) a Eurostat (emise ČR)"
  source-url:  "https://edgar.jrc.ec.europa.eu/report_2021?vis=ghgtot#emissions_table"
- type:        "compare"
  col-xl-size: "3-5"
  title:       "**Emise na osobu** za rok 2018"
  data:
  - region:    "world"
    value:     "**6,8**"
    subtitle:  "tun CO<sub>2</sub>eq"
  - region:    "cz"
    value:     "**12,2**"  # Opět založeno na Eurostat datech, aby bylo konzistentní s dalšími grafikami.
    subtitle:  "tun CO<sub>2</sub>eq"
  source:      "Fakta o klimatu"
  source-url:  "/emise-svet-na-osobu"
- type:        "single"
  col-xl-size: "3-5"
  value:       "**87 %** emisí CO<sub>2</sub>"
  subtitle:    "pochází ze **zemí směřujících k uhlíkové neutralitě**"
  source:      "Fakta o klimatu"
  source-url:  "/emisni-zavazky"

subtopics:
  # V kostce
- lead: |
    Skleníkové plyny se do atmosféry dostávají **spalováním fosilních paliv** a dalšími aktivitami spojenými s člověkem, jako je například **kácení lesů, produkce cementu, pěstování rýže či chov dobytka**. Při hledání rychlých a účinných opatření ke snižování emisí je třeba vzít v potaz při jakých lidských činnostech a ve kterých státech vzniká emisí nejvíce:
  commented-content:
  - slug: "emise-svet"
    comment-key: 1
    comment: |
      Polovina světových emisí pochází z Asie. Na tomto kontinentu žije asi 60 % světové populace.
  - slug: "emise-svet-na-osobu"
    comment-key: 2
    comment: |
      **ČR** je v přepočtu na osobu **velkým producentem skleníkových plynů**: 12 tun CO<sub>2</sub>eq na osobu ročně. To je 2× více než světový průměr a 1,4× více než průměr EU.
  - slug: "emise-cr-detail"
    comment-key: 3
    comment: |
      Hlavním zdrojem emisí v ČR jsou **elektrárny a teplárny** (40 %). Dále pak **průmysl** (20 %), **silniční doprava** (15 %) a **lokální plynové a uhelné kotle** (10 %).
  qa:
  - q: "Co můžeme pro snížení emisí udělat?"
    a: |
      Klíčové je především **snížit emise skleníkových plynů v energetice a v průmyslu**, tedy transformovat tyto sektory směrem k nízkoemisním alternativám. Účinným opatřením pro snižování emisí je **zpoplatnění emisí skleníkových plynů**, například formou emisních povolenek nebo uhlíkové daně. Na individuální rovině lze přispět především **úsporami v domácnostech** (týkajících se vytápění, ohřevu teplé vody nebo spotřeby elektřiny), **omezením automobilové dopravy a snížením konzumace masa a mléčných výrobků**.

- id:          "mnozstvi"
  title:       "Množství emisí skleníkových plynů"
  title-short: "Množství emisí"
  lead: |
    **V roce 2018 celý svět vypustil do atmosféry 51,2 miliard tun CO<sub>2</sub>eq**. Tato jednotka přepočítává množství různých skleníkových plynů na množství CO<sub>2</sub>, které by mělo stejný příspěvek ke skleníkovému jevu. Například metan je 28× silnější skleníkový plyn než oxid uhličitý (při uvažovaném stoletém horizontu), tedy 1 tuna metanu představuje 28 tun CO<sub>2</sub>eq.

    Klimatická změna závisí na celkovém množství skleníkových plynů v atmosféře, při srovnávání jednotlivých zemí je však také vhodné vyjádření na obyvatele. Tím je možné porovnat, jak ke klimatické změně přispívají vzhledem k počtu obyvatel různě veliké státy.
  content:
  - emise-svet
  - emise-svet-na-osobu
  - emise-eu
  - emise-eu-poradi
  - emise-vybrane-staty
  - emise-eu-detail
  - emise-eu-vyvoj
  - emise-eu-na-osobu
  - emise-co2-svet-vyvoj
  qa:
  - q: "Jaké jsou celkové světové emise?"
    a: |
      V roce 2012 byly celosvětové emise 46 miliard tun CO<sub>2</sub>eq, **dnes** již **dosahují hodnoty přes 50 miliard tun CO<sub>2</sub>eq ročně**.
  - q: "Skleníkové plyny, CO<sub>2</sub>, CO<sub>2</sub>eq. Co to vlastně znamená a jaký je mezi těmito pojmy rozdíl?"
    a: |
      Skleníkových plynů je řada, **nejvýznamnější z nich je oxid uhličitý, tedy CO<sub>2</sub>**. Jednotka tuna CO<sub>2</sub> udává tedy výhradně množství oxidu uhličitého. Jednotka tuna **CO<sub>2</sub>eq** pak vyjadřuje **úhrnné množství** více <glossary id="antropogennisklenikoveplyny">skleníkových plynů</glossary> přepočtených na ekvivalentní množství CO<sub>2</sub>.
  - q: "Jak se emise různých skleníkových plynů sčítají dohromady na CO<sub>2</sub>eq?"
    a: |
      **Jednotlivé skleníkové plyny se přepočítávají na tzv. CO<sub>2</sub>eq** (CO<sub>2</sub> ekvivalent), tedy na množství oxidu uhličitého, které by mělo stejný příspěvek ke skleníkovému jevu atmosféry jako množství těchto ostatních vypuštěných plynů. Vzhledem k různému poločasu života jednotlivých plynů v atmosféře se tento příspěvek uvažuje za určitou standardizovanou dobu, zpravidla uvažujeme horizont 100 let a používáme tzv. GWP (*Global Warming Potentital*) koeficienty. Zatímco CO<sub>2</sub> jakožto referenčními plynu náleží koeficient 1, pro metan se jedná o hodnotu 28 pro horizont 100 let, jinými slovy, jde 28× silnější skleníkový plyn než CO<sub>2</sub>.

- id:          "cesko"
  title:       "Emise skleníkových plynů v Česku"
  title-short: "Emise v ČR"
  lead: |
    V porovnání s celosvětovými emisemi se mohou zdát emise Česka zanedbatelné – v roce 2018 Česká republika vypustila 129 milionů tun CO<sub>2</sub>eq. Pro relativní srovnávání s jinými státy je ale užitečné vyjádřit množství skleníkových plynů i v přepočtu na jednoho obyvatele – v takovém případě **jsou emise na osobu v Česku dvakrát vyšší, než je celosvětový průměr**.
  content:
  - emise-cr
  - emise-cr-detail
  - emise-cr-vyvoj
  - nejvetsi-emitenti-cr
  qa:
  - q: "Jak velké jsou emise Česka?"
    a: |
      **V roce 2018 Česko vypustilo 129 milionů tun CO<sub>2</sub>eq**, přepočteno na obyvatele jde o 12,2 tuny CO<sub>2</sub>eq na osobu. Světový průměr v roce 2015 byl 6,5 tun CO<sub>2</sub>eq na osobu. **Emise Česka na osobu jsou tedy dvakrát vyšší, než je celosvětový průměr**.

- id:          "sektory"
  title:       "Emise dle sektorů"
  lead: |
    Jednotlivá hospodářská odvětví přispívají ke klimatické změně v různé míře. Například **v Česku je energetika** (včetně tepláren) **zodpovědná za téměř 40 % emisí skleníkových plynů**, oproti tomu průmysl přispívá 20 %, doprava 16 % a zemědělství přibližně 7 %. Za téměř polovinu českých emisí (45 %) zodpovídá pouze několik desítek největších zdrojů (především elektráren a průmyslových závodů).

    Podíl jednotlivých sektorů na emisích se liší jak v čase, tak napříč zeměmi. V Česku jsou relativně vyšší emise z energetiky oproti ostatním zemím kvůli vyššímu podílu uhelných elektráren a skutečnosti, že Česko je vývozcem elektřiny. Naopak emise ze zemědělství jsou v Česku relativně nižší, neboť některé potraviny dovážíme.
  content:
  - emise-fosilni-paliva
  - nejvetsi-emitenti-cr
  - emise-cr
  - emise-vyroba-cementu
  - emise-dychani
  - emise-sr
  - dekarbonizace-mineralniho-prumyslu
  - emise-eu-prumysl
  qa:
  - q: "Uvolňují se skleníkové plyny nejen v důsledku lidské činnosti, ale také přírodních procesů?"
    a: |
      Mnohé přírodní jevy také uvolňují skleníkové plyny. Například dýcháním člověk vyprodukuje přibližně 300 kg CO<sub>2</sub> za rok, podobně oxid uhličitý vydechují také jiné organismy. Dýchání však nepřispívá ke klimatické změně, neboť se jedná o uzavřený cyklus uhlíku: veškerý vydechovaný uhlík byl dříve pohlcen z atmosféry při fotosyntéze rostlin. Silným skleníkovým plynem je vodní pára, avšak její cyklus v atmosféře je také uzavřený a množství vypařené vody je dáno teplotou. Ke skleníkovému jevu přispívá také sopečná činnost, avšak v mnohem menší míře než lidská činnost.
  - q: "Co jsou hlavní zdroje lidských emisí?"
    a: |
      Na přibližně 70 % světových emisí skleníkových plynů se podílí oxid uhličitý. Jeho hlavním zdrojem je **spalování fosilních paliv**, především v energetice, průmyslu a dopravě.



- id:          "budouci-otepleni"
  title:       "Vztah mezi emisemi a budoucím oteplením"
  title-short: "Emise a oteplování"
  lead: |
    **Globální oteplení je** přibližně **přímo úměrné celkovému množství emisí skleníkových plynů**, které vypouštíme do atmosféry. Pro zastavení klimatické změny **je** tedy **nutné přestat vypouštět skleníkové plyny** a dosáhnout takzvané klimatické neutrality. Roli však nehraje pouze to, kdy skutečně snížíme množství vypouštěných plynů na nulu, ale také trajektorie, podle které toto snížení bude probíhat. Je velký rozdíl, pokud budeme až do roku 2050 vypouštět tolik emisí jako dnes, a pak náhle snížíme emise na nulu, nebo pokud je budeme snižovat rovnoměrně po celou dobu až do roku 2050 – první scénář by vedl přibližně k dvojnásobnému oteplení oproti druhému.

    **Množství emisí, které lze ještě vypustit, abychom nepřekročili určitou teplotní hranici, se označuje jako uhlíkový rozpočet**. Cíl Pařížské dohody o udržení nárůstu teploty výrazně pod 2 °C lze tedy pomocí uhlíkového rozpočtu přeformulovat jako určité množství skleníkových plynů, které lidstvo ještě může vypustit, aby tohoto cíle dosáhlo.
  content:
  - souvislost-emise-otepleni
  - emisni-scenare-pariz
  - uhlikovy-rozpocet-cr
  - koncept-uhlikovy-rozpocet
  - 1979-charneyho-zprava
  - koncept-cesty-k-neutralite

- id:          "neutralita"
  title:       "Klimatická neutralita"
  lead: |
    **Pro zastavení klimatické změny je nutné přestat vypouštět skleníkové plyny**, neboli dosáhnout tzv. net-zero či klimatické neutrality. Výraz "net-zero" můžeme přeložit jako "čistá nula" a je tím myšleno, že daný stát či firma je klimaticky neutrální, tedy odstraňuje z atmosféry stejné množství skleníkových plynů jako do atmosféry vypouští. Tato situace je také označována jako klimatická neutralita nebo uhlíková neutralita s tím, že druhý z pojmů se většinou týká pouze oxidu uhličitého, nikoli všech skleníkových plynů. **K dosažení uhlíkové neutrality se již přihlásily státy zodpovědné za téměř 90 % světových emisí oxidu uhličitého** (k únoru 2022).
  content:
  - emisni-zavazky
  - 2021-reserse-zavazky-statu
  - uhlikova-neutralita

- id:          "mitigace"
  title:       "Opatření ke snižování emisí"
  title-short: "Opatření"
  lead: |
    Podíl jednotlivých sektorů na emisích skleníkových plynů poskytuje užitečné vodítko pro zaměření mitigačních snah. Největších emisních úspor může Česko dosáhnout **proměnou** svého **energetického mixu**. Jednotlivci však také mohou přispět ke snížení emisí, například **snížením energetické náročnosti** svých domácností nebo **omezením automobilové dopravy**, případně také **nižší konzumací masa a mléčných výrobků**.
  content:  # U nového obsahu zvaž přidání také do dohody-legislativa>eu a ekonomika>opatreni.
  - potencial-zpusobu-snizeni-emisi
  - emisni-povolenky-ets
  - zpoplatneni-emisi-svet
  - mitigacni-opatreni-mmf
  - fit-for-55
  - fit-for-55-opatreni
  - 2022-reserse-ccs

- id:          "intenzity"
  title:       "Emise vs. HDP: emisní intenzity ekonomik"
  title-short: "Emise vs. HDP"
  lead: |
    **Emisní intenzita ekonomiky označuje množství skleníkových plynů vyprodukovaných na jednotku HDP** a zpravidla se uvádí v gramech CO<sub>2</sub>eq na jeden dolar. Emisní intenzity tak vedle emisí na osobu slouží jako další relativní vyjádření a často poskytují detailnější vhled do emisí jednotlivých zemí.

    Hospodářsky rozvinutější země mají zpravidla méně emisně náročné ekonomiky, neboť služby tvoří větší podíl jejich hospodářství. Oproti tomu v rozvojových zemích tvoří větší podíl hospodářství emisně náročné sektory: zemědělství, průmysl a stavebnictví. Emisní intenzity ekonomik také vysvětlují, proč některé státy se srovnatelnými emisemi na osobu mohou mít velice odlišnou životní úroveň.
  content:  # U nového obsahu zvaž přidání také do ekonomika>pricina.
  - emise-svet-na-hdp
  - emisni-intenzity
---
