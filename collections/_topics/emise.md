---
layout:        topic
title:         "Emise skleníkových plynů"
slug:          "emise"
redirect_from: "/emise"
sitemap:       false
published:     2022-07-01
weight:        20

dashboard:
- title:       "Celkové emise (2018)"
  unit:        "CO<sub>2</sub>eq"
  value:       "51,2 mld. tun"   # Tohle je tricky -> IPCC uvádí cca 58 Gt CO2eq. EDGAR nepočítá LULUCF a tvrdí, že LULUCF je souhrnně net sink (~ 5 Gt CO2). Oproti tomu IPCC uvádí LULUCF emise cca 6.6 Gt CO2, protože odlišně definuje "antropogenní" (nezahrnuje pohlcování existujícími ekosystémy).
  subtitle:    "emise celého světa"
  unit-vs:     "CO<sub>2</sub>eq"
  value-vs:    "131,4 mil. tun"
  subtitle-vs: "emise Česka"
  source:      "EDGAR, European Commission"
  source-url:  "https://edgar.jrc.ec.europa.eu/report_2021?vis=ghgtot#emissions_table"
- title:       "Emise na osobu (2015)"
  unit:        "CO<sub>2</sub>eq"
  value:       "6,5 tun"
  subtitle:    "světový průměr"
  value-vs:    "12,1 tun"
  subtitle-vs: "Česko"
  source:      "Fakta o klimatu"
  source-url:  "/emise-svet-na-osobu"
- title:       "Emisní závazky (2022)"
  value:       "87 % emisí"
  unit:        "CO<sub>2</sub>"
  subtitle:    "pochází ze zemí směřujících k **uhlíkové neutralitě**"
  source:      "Fakta o klimatu"
  source-url:  "/emisni-zavazky"

subtopics:
  # V kostce
- lead: |
    Skleníkové plyny se dostávají do atmosféry **spalováním fosilních paliv** a dalšími procesy, jako například **kácením lesů**, **produkcí cementu**, **pěstováním rýže** či **chovem dobytka**. Pro volbu rychlých a účinných opatření na snižování emisí je nutné nejprve porozumět, v jakých státech a jaké lidské činnosti způsobují nejvíce emisí:
  commented-content:
  - slug: "emise-svet"
    comment-key: 1
    comment: |
      Polovina světových emisí pochází z Asie. Na tomto kontinentu žije asi 60 % světové populace.
  - slug: "emise-svet-na-osobu"
    comment-key: 2
    comment: |
      **ČR je** v přepočtu na obyvatele **velkým producentem skleníkových plynů**: 12 tun CO<sub>2</sub>eq na osobu ročně. To je 2x víc než světový průměr a 1,4x víc než průměr EU.
  - slug: "emise-cr-detail"
    comment-key: 3
    comment: |
      Hlavním zdrojem vysokých emisí v ČR jsou **elektrárny a teplárny** (40 %). Dále pak **průmysl** (20 %), **silniční doprava** (15 %) a **lokální plynové a uhelné kotle** (10 %).
  qa:
  # TODO: Dopsat odpověď a zveřejnit.
  # - q: "Skleníkové plyny, CO<sub>2</sub>, CO<sub>2</sub>eq. Co to vlastně znamená a jaký je mezi těmito pojmy rozdíl?"
  #   a: |
  #     Blah.
  - q: "Uvolňují se skleníkové plyny i v důsledku přírodních procesů?"
    a: |
      Mnohé přírodní jevy také uvolňují skleníkové plyny. Například dýcháním člověk vyprodukuje přibližně 300 kg CO<sub>2</sub> za rok, podobně oxid uhličitý vydechují také jiné organismy. Dýchání však nepřispívá ke klimatické změně, neboť se jedná o uzavřený cyklus uhlíku: veškerý vydechovaný uhlík byl dříve pohlcen z atmosféry při fotosyntéze rostlin. Silným skleníkovým plynem je vodní pára, avšak její cyklus v atmosféře je také uzavřený a množství vypařené vody je dáno teplotou. Ke skleníkovému jevu přispívá také sopečná činnost, avšak v mnohem menší míře než lidská činnost.

  - q: "Jaké jsou celkové světové emise?"
    a: |
      V roce 2012 byly celosvětové emise 46 miliard tun CO<sub>2</sub>eq, dnes jsou již přes 50 miliard tun CO<sub>2</sub>eq ročně.
  - q: "Jak se emise různých skleníkových plynů sčítají dohromady?"
    a: |
      Jednotlivé skleníkové plyny se přepočítávají na tzv. CO<sub>2</sub>eq, tedy na množství oxidu uhličitého, které by mělo stejný příspěvek ke skleníkovému jevu atmosféry jako množství vypuštěných jiných plynů. Vzhledem k různému poločasu života jednotlivých plynů v atmosféře se tento příspěvek uvažuje za určitou standardizovanou dobu, zpravidla uvažujeme horizont 100 a používáme tzv. GWP100 koeficienty (například pro metan se jedná o hodnotu 28, tedy je 28krát silnější skleníkový plyn než CO<sub>2</sub>).
  - q: "Jak velké jsou emise České republiky?"
    a: |
      V roce 2018 vypustila Česká republika 129 milionů tun CO2eq, přepočteno na obyvatele to je 12,2 tuny CO<sub>2</sub>eq na osobu. Světový průměr v roce 2015 byl 6,5 tun CO<sub>2</sub>eq na osobu, průměrný Čech tak ke klimatické změně přispívá téměř dvojnásobně oproti celosvětovému průměru.
  - q: "Co jsou hlavní zdroje lidských emisí?"
    a: |
      Oxid uhličitý tvoří přibližně 70 % světových emisí a jeho hlavním zdrojem je spalování fosilních paliv, především v energetice, průmyslu a dopravě.
  - q: "Co můžeme udělat pro snížení emisí?"
    a: |
      Klíčové je především snížit emise v energetice a v průmyslu. Účinným opatřením zde je zpoplatnění emisí skleníkových plynů, například formou emisních povolenek. Jako jedinec můžeme přispět především úsporami v domácnostech (vytápění, ohřev teplé vody, spotřeba elektřiny), následně omezením automobilové dopravy a snížením konzumace masa a mléčných výrobků.

- id:          "mnozstvi"
  title:       "Množství vypouštěných skleníkových plynů"
  lead: |
    V roce 2012 celý svět vypustil do atmosféry 46 miliard tun CO2eq. Tato jednotka přepočítává množství různých skleníkových plynů na množství CO2, které by mělo stejný příspěvek ke skleníkovému jevu. Například metan je 28krát silnější skleníkový plyn než oxid uhličitý (při uvažovaném stoletém horizontu), tedy 1 tuna metanu představuje 28 tun CO2eq.

    Klimatická změna závisí na celkovém množství skleníkových plynů v atmosféře, při srovnávání jednotlivých zemí je také vhodné vyjádření na jednoho obyvatele. Tím je možné porovnat, jak ke klimatické změně přispívá průměrný obyvatel dané země.
  content:
  - emise-svet
  - emise-svet-na-osobu
  - emise-eu
  - emise-eu-poradi
  - emise-vybrane-staty
  - emise-eu-detail
  - emise-eu-vyvoj
  - emise-eu-na-osobu

- id:          "cesko"
  title:       "Emise skleníkových plynů v České republice"
  lead: |
    V porovnání s celosvětovou hodnotou se mohou zdát emise České republiky zanedbatelné – v roce 2018 Česká republika vypustila 129 milionů tun CO<sub>2</sub>eq – je však užitečné vyjádřit množství skleníkových plynů i na jednoho obyvatele, v takovém přepočtu průměrný Čech emituje dvakrát větší množství skleníkových plynů, než je celosvětový průměr.
  content:
  - emise-cr
  - emise-cr-detail
  - emise-eu-vyvoj
  - nejvetsi-emitenti-cr

- id:          "sektory"
  title:       "Emise podle sektorů"
  lead: |
    Jednotlivá hospodářská odvětví přispívají ke klimatické změně v různé míře. Například v České republice je energetika (včetně tepláren) zodpovědná za téměř 40 % emisí skleníkových plynů, oproti tomu průmysl přispívá 20 %, doprava 16 % a zemědělství přibližně 7 %. Několik desítek největších zdrojů (především elektráren a průmyslových závodů) je tak zodpovědných za 45 % českých emisí.

    Podíl jednotlivých sektorů na emisích se liší jak v čase, tak napříč zeměmi. V České republice jsou relativně vyšší emise z energetiky oproti ostatním zemím kvůli vyššímu podílu uhelných elektráren a skutečnosti, že Česká republika je vývozcem elektřiny. Naopak emise ze zemědělství jsou v České republice relativně nižší, neboť některé potraviny dovážíme.
  content:
  - emise-fosilni-paliva
  - nejvetsi-emitenti-cr
  - emise-cr
  - emise-vyroba-cementu
  - emise-dychani
  - emise-sr
  - 2020-globalni-zprava-o-elektrine


- id:          "budouci-otepleni"
  title:       "Vztah mezi emisemi a budoucím oteplením"
  lead: |
    Globální oteplení je přibližně přímo úměrné celkovému množství emisí skleníkových plynů, které vypouštíme do atmosféry. Abychom zastavili klimatickou změnu, je tedy nutné přestat vypouštět skleníkové plyny a dosáhnout takzvané uhlíkové neutrality. Roli však nehraje pouze kdy skutečně snížíme množství vypouštěných plynů na nulu, ale také trajektorie, po které toto snížení bude probíhat. Je velký rozdíl, pokud budeme až do roku 2050 vypouštět tolik emisí jako dnes, a pak náhle snížíme emise na nulu, nebo pokud je budeme snižovat rovnoměrně po celou dobu až do roku 2050 – první scénář by vedl přibližně k dvojnásobnému oteplení oproti druhému.

    Množství emisí, které lze ještě vypustit, abychom nepřekročili určitou teplotní hranici, se označuje jako uhlíkový rozpočet. Cíl Pařížské dohody o udržení nárůstu teploty výrazně pod 2 °C lze tedy pomocí uhlíkového rozpočtu přeformulovat jako určité množství skleníkových plynů, které lidstvo ještě může vypustit, aby tohoto cíle dosáhlo.
  content:
  - souvislost-emise-otepleni
  - emisni-scenare-pariz
  - uhlikovy-rozpocet-cr
  - koncept-uhlikovy-rozpocet
  - 1979-charneyho-zprava
  - koncept-cesty-k-neutralite

- id:          "neutralita"
  title:       "Uhlíková neutralita"
  lead: |
    Pro zastavení klimatické změny je nutné přestat vypouštět skleníkové plyny, neboli dosáhnout tzv. net-zero či klimatické neutrality. Výraz "net-zero" můžeme přeložit jako "čistá nula" a je tím myšleno, že daný stát či firma je uhlíkově neutrální, tedy odstraňuje z atmosféry stejné množství skleníkových plynů jako do atmosféry vypouští. Tato situace je také označována jako klimatická neutralita nebo uhlíková neutralita, ačkoli tento poslední pojem se někdy může týkat pouze oxidu uhličitého, nikoli všech skleníkových plynů. K dosažení uhlíkové neutrality se již přihlásily státy zodpovědné za téměř 90 % světových emisí oxidu uhličitého (aktuální k únoru 2022).
  content:
  - emisni-zavazky
  - 2021-reserse-zavazky-statu
  - uhlikova-neutralita

- id:          "mitigace"
  title:       "Opatření ke snižování emisí"
  lead: |
    Podíl jednotlivých sektorů na emisích skleníkových plynů poskytuje užitečné vodítko pro zaměření mitigačních snah. Největších emisních úspor může Česká republika dosáhnout proměnou svého energetického mixu. Jednotlivci však také mohou přispět ke snížení emisí, například snížením energetické náročnosti svých domácností nebo omezením automobilové dopravy, případně také nižší konzumací masa a mléčných výrobků.
  content:  # U nového obsahu zvaž přidání také do dohody-legislativa>eu a ekonomika>opatreni.
  - potencial-zpusobu-snizeni-emisi
  - emisni-povolenky-ets
  - zpoplatneni-emisi-svet
  - mitigacni-opatreni-mmf
  - 2019-mitigacni-opatreni-mmf
  - fit-for-55
  - fit-for-55-opatreni
  - 2016-snizeni-emisi-cr

- id:     "intenzity"
  title:  "Emisní intenzity ekonomik"
  lead: |
    Emisní intenzita ekonomiky označuje množství skleníkových plynů vyprodukovaných na jednotku HDP a zpravidla se uvádí v gramech CO<sub>2</sub>eq na jeden dolar. Emisní intenzity tak uvádí další relativní vyjádření vedle emisí na osobu a často poskytují detailnější vhled do emisí jednotlivých zemí.

    Více rozvinuté země mají zpravidla méně emisně náročné ekonomiky, neboť služby tvoří větší podíl jejich hospodářství. Oproti tomu v méně rozvinutých zemích tvoří větší podíl hospodářství emisně náročné sektory: zemědělství, průmysl a stavebnictví. Emisní intenzity ekonomik také vysvětlují, proč některé státy se srovnatelnými emisemi na osobu mohou mít velice odlišnou životní úroveň.
  content:  # U nového obsahu zvaž přidání také do ekonomika>pricina.
  - emise-svet-na-hdp
  - emisni-intenzity
---

Lidmi způsobené emise skleníkových plynů posilují skleníkový efekt atmosféry a vedou tak k oteplení Země. Hlavní skleníkový plyn je **oxid uhličitý** (CO<sub>2</sub>), který přispívá k oteplování asi ze 70 %. Oxid uhličitý uvolňujeme nejvíce spalováním fosilních paliv a dále kácením pralesů nebo výrobou oceli a cementu. Další významný skleníkový plyn **metan** (CH<sub>4</sub>) uniká hlavně při těžbě fosilních paliv a při chovu dobytka. Skleníkovými plyny jsou i **oxid dusný** – nejvíce z používání umělých dusíkatých hnojiv – ⁠a řada synteticky vyráběných **fluorovaných plynů**.

K zastavení klimatické změny je klíčové dosáhnout **klimatické neutrality** – nepřidávat další skleníkové plyny do atmosféry.