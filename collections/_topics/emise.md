---
layout:        topic
title:         "Emise skleníkových plynů"
slug:          "emise"
redirect_from: "/emise"
published:     2022-07-01
sitemap:       false
map:           true

dashboard:
- title:       "Celkové emise (2018)"
  unit:        "tun CO<sub>2</sub>eq"
  value:       "51,2 miliard"   # Tohle je tricky -> IPCC uvádí cca 58 Gt CO2eq. EDGAR nepočítá LULUCF a tvrdí, že LULUCF je souhrnně net sink (~ 5 Gt CO2). Oproti tomu IPCC uvádí LULUCF emise cca 6.6 Gt CO2, protože odlišně definuje "antropogenní" (nezahrnuje pohlcování existujícími ekosystémy).
  subtitle:    "celosvětově"
  unit-vs:     "tun CO<sub>2</sub>eq"
  value-vs:    "131,4 milionů"
  subtitle-vs: "Česká republika"
  source:      "EDGAR, European Commission"
  source-url:  "https://edgar.jrc.ec.europa.eu/report_2021?vis=ghgtot#emissions_table"
- title:       "Emise na osobu (2015)"
  unit:        "tun CO<sub>2</sub>eq"
  value:       "6,5"
  subtitle:    "světový průměr"
  value-vs:    "12,1"
  subtitle-vs: "Česká republika"
  source:      "Fakta o klimatu"
  source-url:  "https://docs.google.com/spreadsheets/d/1A1DJVqQEbvs8PfQDrav1i56cfFUIzSL5CAg2jqmXALQ/edit#gid=0"
- title:       "Emisní závazky (2022)"
  value:       "87 %"
  subtitle:    "emisí CO<sub>2</sub>eq pochází ze zemí směřujících k uhlíkové neutralitě"
  source:      "Fakta o klimatu"
  source-url:  "https://faktaoklimatu.cz/infografiky/emisni-zavazky"

subtopics:
  # V kostce
- lead: |
    Skleníkové plyny se dostávají do atmosféry spalováním fosilních paliv a dalšími procesy, jako například produkcí cementu, pěstováním rýže či chovem dobytka. V přepočtu na obyvatele je Česká republika významným producentem <glossary id='antropogennisklenikoveplyny'>skleníkových plynů</glossary>: zatímco světový průměr je 6,5 tun <glossary id='co2eq'>CO<sub>2</sub>eq</glossary> na osobu za rok, průměrný Čech vypouští ročně 12,1 tun CO<sub>2</sub>eq (data za rok 2015). Hlavní příčinou je velké množství elektřiny, které vyrábíme v uhelných elektrárnách. Pro rychlá a účinná opatření na snižování emisí je nutné nejprve porozumět, jaké lidské činnosti způsobují nejvíce emisí.
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
  content:
  - emise-svet
  - emise-svet-na-osobu
  - emise-cr-detail

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
  content:
  - potencial-zpusobu-snizeni-emisi
  - zpoplatneni-emisi-svet
  - emisni-povolenky-ets
  - mitigacni-opatreni-mmf
  - 2019-mitigacni-opatreni-mmf
  - 2016-snizeni-emisi-cr

- id:     "intenzity"
  title:  "Emisní intenzity ekonomik"
  lead: |
    Emisní intenzita ekonomiky označuje množství skleníkových plynů vyprodukovaných na jednotku HDP a zpravidla se uvádí v gramech CO<sub>2</sub>eq na jeden dolar. Emisní intenzity tak uvádí další relativní vyjádření vedle emisí na osobu a často poskytují detailnější vhled do emisí jednotlivých zemí.

    Více rozvinuté země mají zpravidla méně emisně náročné ekonomiky, neboť služby tvoří větší podíl jejich hospodářství. Oproti tomu v méně rozvinutých zemích tvoří větší podíl hospodářství emisně náročné sektory: zemědělství, průmysl a stavebnictví. Emisní intenzity ekonomik také vysvětlují, proč některé státy se srovnatelnými emisemi na osobu mohou mít velice odlišnou životní úroveň.
  content:
  - emise-svet-na-hdp
  - emisni-intenzity
---

**Klimatická změna je způsobena antropogenními, tedy lidmi zaviněnými, emisemi <glossary id='antropogennisklenikoveplyny'>skleníkových plynů</glossary>.** Hlavním skleníkovým plynem je CO<sub>2</sub> (oxid uhličitý), který přispívá ke změně klimatu přibližně 70 % a je uvolňován především při spalování fosilních paliv: uhlí, ropy a zemního plynu. Dalšími skleníkovými plyny jsou CH<sub>4</sub> (metan), N<sub>2</sub>O (oxid dusný) a některé další, méně časté plyny. Rozsah klimatické změny a celkové oteplení závisí především na tom, kolik skleníkových plynů vypustíme v budoucnu.
