---
layout:        survey
title:         "Vodík v energetice"
slug:          2023-reserse-vodik
redirect_from: "/2023-reserse-vodik"
weight:        305
published:     2024-01-18
tags-scopes:   [ svet ]
tags-topics:   [ emise, opatreni ]
use-preview-image: true
caption:       "Vodík v energetice"
intro: |
  Vodík je nejlehčí a nejčastější prvek, který tvoří až 90% atomů ve vesmíru. Díky své schopnosti akumulace energie se o něm často mluví jako o technologii budoucnosti, jeho použití je však v jiných odvětvích zcela běžné již mnoho let. Dnes je využíván mimo jiné například v chemickém průmyslu jako redukční činidlo, či v zemědělství pro výrobu hnojiv. Zatímco v roce 2022 dosáhla celosvětová poptávka po vodíku 95 Mt, v roce 2050 se odhaduje až na 600 Mt.

  V současnosti (2024) se vodík vyrábí skoro po celém světě, včetně ČR. U nás jde však téměř výhradně o šedý (vysokoemisní) vodík vyráběný v rámci petro-chemického průmyslu firmami jako např. litvínovský Unipetrol či ústecká Spolchemie. Výroba zeleného vodíku se u nás postupně zavádí v rámci několika výzkumných projektů.

items:
  metrics:
    - name: Energetický obsah
      value: 33,3 MWh/t
      comment: Jde o [výhřevnost vodíku](https://www.engineeringtoolbox.com/fuels-higher-calorific-values-d_169.html) (v angličtině _lower heating value_ nebo také _net calorific value_), tedy množství tepla, které se uvolní při spálení vodíku (do této hodnoty není započteno skupenské teplo vodní páry obsažené ve spalinách). Vůči této hodnotě se běžně udávají účinnosti elektrolyzérů, palivových článků, turbín, apod.
    - name: Účinnost elektrolyzérů
      value: 65–70 %
      comment: |
        **Elektrolyzéry slouží pro výrobu vodíku pomocí elektřiny a vody.** V současnosti komerčně dostupné PEM (_Proton Exchange Membrane_) elektrolyzéry dosahují účinnosti až 70 %. Tento údaj znamená, že z 1 MWh elektřiny se vyrobí množství vodíku s energetickým obsahem 0,65–0,7 MWh, což je asi 20 kg vodíku.

        Další vývoj ale probíhá v mnoha směrech, vyšší účinnost by mohly v komerční škále poskytnout např. technologie SOEC (_Solid Oxide Electrolysis_), AEM (_Anion Exchange Membrane Electrolysers_) nebo pokročilé alkalické elektrolyzéry (např. firma Hysata plánuje do roku 2025 uvést na trh model s udávanou účinností až 95%). Více detailů je ve zprávě [Global Hydrogen Review](https://www.iea.org/reports/global-hydrogen-review-2023), str. 140.
    - name: Účinnost palivových článků
      value: 60 %
      comment: |
        **Slouží pro konverzi vodíku na elektřinu**, například ve vodíkových autech. Účinnost se liší podle technologie, 60 % dosahují technologie PEM, AFC a SOFC. Tento údaj znamená, že z vodíku s energetickým obsahem 1 MWh se vyrobí 0,6 MWh elektřiny. Větší přehled o dostupných technologiích palivových článků poskytuje např. fact sheet od [energy.gov](https://www.energy.gov/eere/fuelcells/articles/fuel-cells-fact-sheet).
    - name: Současná výroba (2022)
      subname: z toho nízkoemisní
      value: 95 Mt
      subvalue: < 1 Mt
      comment: Celosvětová produkce vodíku byla v roce 2022 okolo 95 milionů tun (dle zprávy [Global Hydrogen Review](https://www.iea.org/reports/global-hydrogen-review-2023), str. 64).
    - name: Očekávaná výroba (2030)
      subname: z toho nízkoemisní
      value: "> 150 Mt"
      subvalue: 20-38 Mt
      comment: Celosvětová spotřeba vodíku v roce 2030 se odhaduje minimálně na 150 milionů tun (dle zprávy [Global Hydrogen Review](https://www.iea.org/reports/global-hydrogen-review-2023), str. 66). Podle těchto odhadů by měl nízkoemisní vodík tvořit 20–38 milionů tun (podle toho, zda započítáme projekty v rané fázi plánování).
  projects:
    - name: SG Hydrogen Napajedla
      company: Solar Global
      link: https://www.solarglobal.cz/vodik
      description: První český projekt komerčního elektrolyzéru na výrobu zeleného vodíku pomocí elektřiny z vlastní střešní solární elektrárny.
      production: 30 tun
      year: 2023
    - name: H2 Triangle
      company: For H2 Energy
      link: https://www.forh2e.com/cs/projekty-a-reference/vodikovy-strategicky-projekt-h.html
      description: Projekt zahrnuje výstavbu lokálního vodíkového hospodářství, rozvoj vědecko-výzkumné činnosti v oblasti vodíku a vybudování výrobních a montážních hal, které poskytnou zázemí pro dodavatele vodíkových technologií. Výstavba bude realizována v areálu Strategické průmyslové zóny Triangle u Žatce.
      production: 630 tun
      year: 2025
    - name: VOZARTEK
      company: Veolia
      link: https://www.vecr.cz/nase-sluzby/co-nabizime/vodikove-projekty-veolia/
      description: Projekt na výrobu zeleného vodíku v teplárně ve Frýdku-Místku. Jako zdroj energie bude sloužit kombinace elektrické energie z FVE a odpadní biomasy. V budoucnu je plánovaná také větrná elektrárna.
      production: 270 tun
      year: 2026
    - name: Green Mine
      company: SevEn
      link: https://www.greenmine.cz/body-zmeny/#vodik
      description: Elektrolyzér má vzniknout v rámci projektu Green Mine, který představuje celkovou revitalizaci mosteckého lomu ČSA, v němž skončí těžba v roce 2025.
      production: 360 tun
      year: 2027
    - name: FVE s akumulací pomocí vodíku
      company: Orlen Unipetrol
      link: https://www.e15.cz/byznys/prumysl-a-energetika/unipetrol-ziskal-dotaci-na-miliardovy-vodikovy-projekt-obri-elektrolyzer-spusti-do-ctyr-let-1399502
      description: Největší český výrobce šedého vodíku plánuje pro chod elektrolyzéru kombinovat vlastní energii ze slunce s dodávkami zelené energie od jiných subjektů.
      production: 4500 tun
      year: 2027
  institutions:
    - name: Česká vodíková technologická platforma
      region: ČR
      link: https://www.hytep.cz/
      description: Projekt vzniklý z Ministerstva průmyslu a obchodu, spolufinancovaný z EU. Jeho cílem je podpora rozvoje vodíku v ČR pomocí propojování zainteresovaných subjektů, vzájemného informování, prosazování zájmů rozvoje vodíku v kontaktu se státní správou apod.
    - name: Clean Hydrogen Partnership
      region: EU
      link: https://www.clean-hydrogen.europa.eu/index_en
      description: "Jedná se o partnerství 3 institucí: Evropské komise, Hydrogen Europe a Hydrogen Europe Research.
      Hlavním cílem je přispět financováním výzkumu a inovací k plnění cílů Green Dealu a Vodíkové strategie. Dále pak urychlit rozvoj čistého vodíku a posílit jeho konkurenceschopnost."
    - name: Hydrogen Europe
      region: EU
      link: https://hydrogeneurope.eu/
      description: Sdružení více než 400 firem a institucí z 25 evropských zemí. Součást Clean Hydrogen Partnership, ve kterém reprezentuje zájmy komerčního sektoru.
    - name: Hydrogen Europe Research
      region: EU
      link: https://hydrogeneuroperesearch.eu/
      description: Sdružení 140 univerzit a výzkumných organizací z 29 zemí. Součást Clean Hydrogen Partnership, ve kterém reprezentuje zájmy akademické sféry.
    - name: Fuel Cell and Hydrogen Energy Association (FCHEA)
      region: USA
      link: https://www.fchea.org
      description: Průmyslová asociace působící v USA. Sdružuje přes 90 firem v oblasti výroby, distribuce a inovací vodíkové energetiky. Cílem je podpora komercializace a propagace vodíkových palivových článků.
    - name: Hydrogen Council
      region: globální
      link: https://hydrogencouncil.com/en/
      description: Iniciativa leaderů firem napříč různými sektory (energetika, doprava, zpracovatelský průmysl) s cílem podpořit transformaci čisté energetiky. Nyní sdružuje přes 150 firem z celého světa.
  studies:
    - name: "Hydrogen energy, economy and storage: review and recommendation"
      link: https://www.sciencedirect.com/science/article/abs/pii/S036031991931465X
      source: J. O. Abe et&nbsp;al.
      description: Článek identifikuje dostupnost technologií pro skladování vodíku jako základní překážku pro široký rozvoj vodíkové ekonomiky. **Dává přehled technologií pro skladování vodíku z technického i ekonomického pohledu**, se zaměřením na pevné skupenství ve formě hydridů kovů (včetně porovnání energetické hodnoty vodíku na kg hmotnosti oproti ostatním konvenčním zdrojům energie).
      journal: International Journal of Hydrogen Energy
      year: 2019
    - name: "Hydrogen production for energy: An overview"
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0360319919345926"
      source: Furat Dawood et&nbsp;al.
      description: Zkoumá **využití vodíku v energetice**, od výroby a čištění, přes ukládání (včetně bezpečnostních aspektů), až po využití vodíku. V závislosti na cestách výroby vodíku porovnává emisní náročnost celého životního cyklu.
      journal: International Journal of Hydrogen Energy
      year: 2020
    - name: "Hydrogen energy systems: A critical review of technologies, applications, trends and challenges"
      link: https://www.sciencedirect.com/science/article/pii/S1364032121004688
      source: Meiling Yue et&nbsp;al.
      description: Zaměřuje se na možnosti **využití vodíku v energetice**, od výroby vodíku přes ukládání a distribuci až po konverzi zpět na elektřinu nebo využití v dopravě. Statisticky analyzuje data z dostupné literatury a zkoumá příklady projektů ve světě. Zkoumá náklady, efektivitu a životnost jednotlivých technologií.
      journal: Energy Reviews
      year: 2021
    - name: "Blue and green hydrogen energy to meet European Union decarbonisation objectives. An overview of perspectives and the current state of affairs"
      link: https://www.sciencedirect.com/science/article/abs/pii/S0360319922046675
      source: Giovanni Lagioia et&nbsp;al.
      description: Článek dává narativní přehled literatury o **současném stavu technologií pro výrobu zeleného a modrého vodíku** a možnostech jejich příspěvku k plnění dekarbonizačních cílů EU.
      journal: International Journal of Hydrogen Energy
      year: 2022
  strategies:
    - name: Vodíková strategie EU
      link: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52020DC0301
      description: Dokument z roku 2020 od Evropské komise. Rozděluje budoucí vývoj vodíku do roku 2050 na 3 etapy zaměřující se na instalaci elektrolyzérů, výrobu zeleného vodíku, import vodíku a jeho využití při vyrovnávání elektrizační soustavy.
      year: 2020
    - name: Vodíková strategie ČR
      link: https://www.mpo.cz/assets/cz/prumysl/strategicke-projekty/2021/8/Vodikova-strategie_CZ_G_2021-26-07.pdf
      description: Hlavní vodíková strategie České republiky vytvořená společně Ministerstvem průmyslu a obchodu, Ministerstvem dopravy a Ministerstvem životního prostředí. Vychází z Vodíkové strategie EU a bohužel neobsahuje mnoho konkrétních cílů. Udává prognózu spotřeby vodíku po odvětvích a očekávaný časový vývoj zavádění vodíku do dopravy, průmyslu apod., stejně jako u evropské strategie je období do roku 2050 rozdělené na 3 etapy.
      year: 2021
    - name: Národní akční plán čisté mobility ČR
      link: https://www.mpo.cz/cz/prumysl/zpracovatelsky-prumysl/automobilovy-prumysl/aktualizace-narodniho-akcniho-planu-ciste-mobility--254445/
      description: "Tento dokument od Ministerstva průmyslu a obchodu obsahuje na rozdíl od Vodíkové strategie velmi konkrétní a měřitelné cíle: pro rok 2030 například 870 vodíkových autobusů, 40–50 tisíc osobních vodíkových vozidel a 80 plnicích stanic."
      year: 2020
  companies:
    - name: Linde PLC
      capitalizaion: $185 mld.
      category: Chemický průmysl
      link: https://www.linde-engineering.com/en/hydrogen/index.html
      description: Největší světová firma na výrobu průmyslových plynů, zároveň jeden z největších výrobců vodíku. Pokrývá celý hodnotový řetězec od výroby po distribuci a ukládání. Na svém webu firma uvádí, že vyrábí šedý, modrý i zelený vodík, podle různých dostupných informací v současné době silně investuje do rozvoje modrého a zeleného vodíku.
    - name: Air Products & Chemicals
      capitalizaion: $63 mld.
      category: Chemický průmysl
      link: https://www.airproducts.com/industries/hydrogen-fueling-for-mobility
      description: Air Products vyrábí škálu průmyslových plynů, mimo jiné i vodík. V současnosti silně investuje do modrého a zeleného vodíku.
    - name: ČEZ
      capitalizaion: $23 mld.
      category: Energetika
      link: https://www.cez.cz/
      description: Největší výrobce elektřiny v ČR plánuje vyrábět zelený vodík z vlastních zdrojů. Například má již v plánu konkrétní projekt na plnící stanici se 100% zeleným vodíkem v Mníšku pod Brdy.
    - name: Orlen Unipetrol
      capitalizaion: $7 mld.
      category: Petrochemický průmysl
      link: https://www.orlenunipetrol.cz/
      description: Největší výrobce (šedého) vodíku v ČR, dceřiná společnost polského PKN Orlen. V současnosti se zaměřuje na výstavbu plnících stanic pro vodíková auta - plánuje 28 stanic do roku 2030. Na začátku roku 2024 má dvě v provozu, další ve výstavbě. V budoucnu plánuje investovat i do zeleného vodíku.
    - name: Plug Power
      capitalizaion: $5 mld.
      category: Technologie
      link: https://www.plugpower.com/
      description: Americká firma specializující se na výrobu palivových článků, které se používají pro konverzi vodíku na elektřinu, hlavně pro sektor dopravy. Kromě toho také vyrábí elektrolyzéry a sadu technologií na přepravu, skladování a čerpání vodíku do aut.
    - name: Fuel Cell Energy
      capitalizaion: $0,76 mld.
      category: Technologie
      link: https://www.fuelcellenergy.com/
      description: Firma zaměřující se na výrobu vodíkových palivových článků a také technologie na výrobu bezemisního vodíku z bioplynu. Jejím cílem je přispět k dekarbonizaci energetického průmyslu.
  interactives:
    - name: Vodíková mapa ČR
      link: https://www.cistadoprava.cz/mapy/h2/
      authors: Centrum dopravního výzkumu
      description: Interaktivní mapa prezentující aktuální stav vodíkových projektů v České republice. Pro každý bod uvádí provozovatele, stupeň realizace a způsob výroby vodíku.
    - name: Interactive Hydrogen Dashboard
      link: http://gulfpub-gisstg.esriemcs.com/pe-hydrogen-dashboard/tabs/h2dashboard.html
      authors: Global Energy Infrastructure
      description: Interaktivní mapa prezentující aktuální stav vodíkových projektů po celém světě, pravděpodobně však není pro některé státy příliš detailní (jako např. pro ČR). Pro každý bod uvádí provozovatele, stupeň realizace a způsob výroby vodíku.
---

## Přehled současného stavu a odhady dalšího rozvoje

{:.narrow-text}
Základní orientaci v tématu vodíku dodává **přehledová publikace [Global Hydrogen Review](https://www.iea.org/reports/global-hydrogen-review-2023)** od **Mezinárodní energetické agentury** (IEA). Tato publikace je v posledních letech každoročně aktualizovaná a shrnuje veškerou aktuální situaci ohledně využití vodíku v energetice, zahrnující výrobu, spotřebu, infrastrukturu, obchod, politiku, inovace, apod. Napříč publikací se porovnává realita současného stavu ohlášených projektů a politických opatření s žádoucím stavem podle dekarbonizačního scénáře _Net Zero Emissions by 2050_.

<div class="narrow-text" markdown="1">

{% capture vodik %}

V přírodě se vodík vyskytuje nejčastěji ve formě sloučenin (voda, metan, atd.), je tedy možné jej z těchto sloučenin "vyrábět". Podle původu, resp. emisní náročnosti, se vodík označuje různými "barvami".

{% include includes-local/barvy-vodiku.html %}

{:.mt-4}
Kromě toho se ještě někdy mluví o **bílém** vodíku - vyskytuje se pod zemí již v čisté formě a je tedy možné jej těžit. Doposud je však reálně využívané pouze jediné naleziště v africkém Mali, další jsou ve fázi explorace či přípravy na těžbu. Jde o poměrně neprobádanou oblast, situace se tedy může v blízké době celkem rychle změnit.

{% endcapture %}

{% include expander-figure.html
    name="vodik"
    expanded=false
    class="contrast-figure "
    label="Kontext: Jaké jsou barvy a původ vodíku"
    content=vodik
%}
</div>

### Základní údaje

<table class="table table-striped table-hover mt-4 mb-4 d-none d-md-table">
  <thead>
    <tr>
      <th scope="col" class="text-uppercase">Název</th>
      <th scope="col" class="text-uppercase">Hodnota</th>
      <th scope="col" class="text-uppercase">Komentář</th>
    </tr>
  </thead>
  <tbody>
    {% for item in page.items.metrics %}
    <tr>
      <td class="align-middle font-weight-bold">
        <p class="text-nowrap">{{ item.name }}</p>
        {% if item.subname %}<p class="mt-3 text-nowrap font-weight-normal">→ {{ item.subname }}</p>{% endif %}
      </td>
      <td class="align-middle">
        {{ item.value }}
        {% if item.subvalue %}<p class="mt-3 text-nowrap">{{ item.subvalue }}</p>{% endif %}
      </td>
      <td class="align-middle small">{{ item.comment | markdownify }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

### Vybrané akademické přehledové články

<table class="table table-striped table-hover mt-4 mb-4">
  <thead>
    <tr>
      <th scope="col" class="text-uppercase">Název</th>
      <th scope="col" class="text-uppercase">Rok</th>
      <th scope="col" class="text-uppercase">Autor</th>
      <th scope="col" class="text-uppercase">Žurnál</th>
      <th scope="col" class="text-uppercase">Popis</th>
    </tr>
  </thead>
  <tbody>
    {% for item in page.items.studies %}
    <tr>
      <td class="align-middle font-weight-bold">
        <a href="{{ item.link }}">{{ item.name }}</a>
      </td>
      <td class="align-middle">{{ item.year }}</td>
      <td class="align-middle">{{ item.source }}</td>
      <td class="align-middle">{{ item.journal }}</td>
      <td class="align-middle">{{ item.description | markdownify }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

## Politika kolem nízkoemisního vodíku

### České a evropské strategie a plány

{:.narrow-text}
Technologický a ekonomický vývoj vodíkových technologií úzce souvisí s politickým rámcem. Za poslední roky vznikla sada strategií, které se snaží přispět k rozvoji role nízkoemisního vodíku.

<table class="table table-striped table-hover mt-4 mb-4">
  <thead>
    <tr>
      <th scope="col" class="text-uppercase">Název</th>
      <th scope="col" class="text-uppercase">Rok</th>
      <th scope="col" class="text-uppercase">Popis</th>
    </tr>
  </thead>
  <tbody>
    {% for item in page.items.strategies %}
    <tr>
      <td class="align-middle font-weight-bold">
        <a href="{{ item.link }}">{{ item.name }}</a>
      </td>
      <td class="align-middle">{{ item.year }}</td>
      <td class="align-middle">{{ item.description | markdownify }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

### Vodíkové platformy a asociace

{:.narrow-text}
Kromě vodíkových strategií hrají velkou roli platformy, které propojují jednotlivé aktéry a firmy aktivní v rozvoji vodíku.

<table class="table table-striped table-hover mt-4 mb-4">
  <thead>
    <tr>
      <th scope="col" class="text-uppercase">Název</th>
      <th scope="col" class="text-uppercase">Oblast</th>
      <th scope="col" class="text-uppercase">Popis</th>
    </tr>
  </thead>
  <tbody>
    {% for item in page.items.institutions %}
    <tr>
      <td class="align-middle font-weight-bold">
        <a href="{{ item.link }}">{{ item.name }}</a>
      </td>
      <td class="align-middle">{{ item.region }}</td>
      <td class="align-middle">{{ item.description | markdownify }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

## Příklady projektů a aktivních firem

### Interaktivní aplikace

{:.narrow-text}
Vodíkové mapy a interaktivní přehledy dávájí představu o aktuálním stavu této technologie v ČR i ve světě.

<table class="table table-striped table-hover mt-4 mb-4">
  <thead>
    <tr>
      <th scope="col" class="text-uppercase">Název</th>
      <th scope="col" class="text-uppercase">Autoři</th>
      <th scope="col" class="text-uppercase">Popis</th>
    </tr>
  </thead>
  <tbody>
    {% for item in page.items.interactives %}
    <tr>
      <td class="align-middle font-weight-bold">
        <a href="{{ item.link }}">{{ item.name }}</a>
      </td>
      <td class="align-middle">{{ item.authors }}</td>
      <td class="align-middle">{{ item.description | markdownify }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

### Vybrané projekty na výrobu zeleného vodíku v ČR

{:.narrow-text}
Pro perspektivu, podle [Vodíkové strategie ČR](https://www.mpo.cz/assets/cz/rozcestnik/pro-media/tiskove-zpravy/2021/7/VODIK-A4-BOOK-final.pdf) by se v ČR v roce 2030 mohlo spotřebovat okolo 100 tisíc tun nízkoemisního vodíku (v roce 2050 dokonce více než 1,5 mil. tun). Zde zmíněné plánované projekty tedy pokryjí jen malý zlomek této spotřeby.

<table class="table table-striped table-hover mt-4 mb-4">
  <thead>
    <tr>
      <th scope="col" class="text-uppercase">Název</th>
      <th scope="col" class="text-uppercase">Investor</th>
      <th scope="col" class="text-uppercase">Uvedení do provozu</th>
      <th scope="col" class="text-uppercase">Plán roční produkce</th>
      <th scope="col" class="text-uppercase">Popis</th>
    </tr>
  </thead>
  <tbody>
    {% for item in page.items.projects %}
    <tr>
      <td class="align-middle font-weight-bold">
        <a href="{{ item.link }}">{{ item.name }}</a>
      </td>
      <td class="align-middle">{{ item.company }}</td>
      <td class="align-middle">{{ item.year }}</td>
      <td class="align-middle">{{ item.production }}</td>
      <td class="align-middle">{{ item.description | markdownify }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

### Vybrané významné firmy v sektoru nízkoemisního vodíku

<table class="table table-striped table-hover mt-4 mb-4">
  <thead>
    <tr>
      <th scope="col" class="text-uppercase">Název</th>
      <th scope="col" class="text-uppercase">Kategorie</th>
      <th scope="col" class="text-uppercase">Tržní kapitalizace</th>
      <th scope="col" class="text-uppercase">Popis</th>
    </tr>
  </thead>
  <tbody>
    {% for item in page.items.companies %}
    <tr>
      <td class="align-middle font-weight-bold">
        <a href="{{ item.link }}">{{ item.name }}</a>
      </td>
      <td class="align-middle">{{ item.category }}</td>
      <td class="align-middle">{{ item.capitalizaion }}</td>
      <td class="align-middle">{{ item.description | markdownify }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>
