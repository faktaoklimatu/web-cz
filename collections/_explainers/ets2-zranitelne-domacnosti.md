---
layout:      explainer
title:       "Kdo by zaplatil za dražší topení? Zhruba 260 tisíc domácností by potřebovalo pomoc"
slug:        "ets2-zranitelne-domacnosti"
published:   2026-11-04
cover-source-author:      "alpha innotec"
cover-source-text:        "Unsplash"
cover-source-license:     "Unsplash License"
cover-source-license-url: "https://unsplash.com/license"
cover-source-url:         "https://unsplash.com/photos/outdoor-heat-pump-unit-next-to-a-brick-building-4VCm8l6wLQY"
authors:
  - id: "jakub-komarek"
  - id: "jan-krcal"
    minor-role: "editace"
  - id: "marcel-otruba"
    minor-role: "vizualizace"
extra-scripts:
- https://d3js.org/d3.v7.min.js
- /assets-local/charts/fok-theme.js
- /assets-local/js/ets2-blog.js
- /assets-local/js/chart-download.js
- /assets-local/js/ets2-grafy.js
perex: |
  Evropská povolenka ETS2 by od roku 2028 zdražila uhlí, plyn, benzín a naftu. Nejvíc by chudší domácnosti zasáhlo zdražení vytápění. Domácnostem s penězi na výměnu kotle by to dalo další důvod přejít na tepelné čerpadlo. Zhruba 240–285 tisíc chudších domácností by na změnu ale potřebovalo pomoc ze Sociálního klimatického fondu. Peníze by byly: povolenky by Česku za roky 2028–2032 vynesly zhruba 150 miliard korun. Jaké jsou možnosti?
---

## Jak se mění spotřeba fosilních paliv?

České domácnosti topí čím dál méně uhlím a plynem. Fosilní paliva včetně jejich podílu na elektřině a teple ze sítě tvořila v roce 2005 tři čtvrtiny energie, kterou domácnosti spotřebovaly, v roce 2024 už jen polovinu.[^bilance] Uhlí v domácnostech ubylo o polovinu a plynu o třetinu, přibylo dřeva a pelet a tepla z tepelných čerpadel (2005–2024). Teplo ze sítě je v grafu rozdělené na velké teplárny, které už povolenky platí v ETS1, a menší výtopny, na které by se vztahovalo ETS2. Ty dodávají jen asi pětinu tepla. Pod ETS2 by tak v roce 2024 spadala zhruba třetina energie domácností (uhlí, plyn a teplo z menších výtopen, 84 PJ). Další třetina už povolenky platí v ETS1 (elektřina a teplo z velkých tepláren, 84 PJ) a zbytek je mimo povolenky (dřevo a okolní teplo z tepelných čerpadel, 93 PJ).

<script type="application/json" id="graf-spotreba-data">{{ site.data.ets2.spotreba_domacnosti | jsonify }}</script>
{% include includes-local/chart-panel.html
    id="graf-spotreba"
    title="V domácnostech se spaluje méně uhlí a plynu, elektřiny ze sítě je zhruba stejně"
    alt="Spotřeba energie domácností 2005–2024 podle toho, co do domácností přiteklo: ubývá uhlí, plynu a tepla ze sítě, přibývá dřeva a okolního a solárního tepla, elektřiny je zhruba stejně."
    source='Eurostat, <a href="https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table">energetické bilance nrg_bal_c</a>, konečná spotřeba energie domácností (FC_OTH_HH_E).'
%}

Mění se i vytápění. V roce 2022, kdy prudce zdražil plyn, si české domácnosti koupily přes 60 tisíc tepelných čerpadel, zhruba dvakrát víc než rok předtím.[^tc-2022] Když ceny opadly, prodeje v roce 2024 klesly asi na 20 tisíc.[^tc-2024] V roce 2024 tak tepelná čerpadla domácnostem poprvé dodala víc energie než uhlí: 17 proti 14 petajoulům. Přechod výrazně zrychlí, když se fosilní paliva prodraží.

{% include includes-local/chart-panel.html
    id="graf-uhli-tc"
    class="narrow-figure"
    title="Uhlí v domácnostech ubývá, tepla z tepelných čerpadel přibývá"
    caption="Uhlí spálené v domácnostech a okolní a solární teplo (hlavně z tepelných čerpadel), PJ (2005–2024)"
    alt="Uhlí spálené v domácnostech kleslo z 29 PJ v roce 2005 na 14 PJ v roce 2024, okolní a solární teplo vzrostlo z 0,5 PJ na 17 PJ."
    source='Eurostat, <a href="https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table">energetické bilance nrg_bal_c</a>, konečná spotřeba energie domácností (FC_OTH_HH_E).'
%}

{% capture ex_emise %}

Emise CO₂ ze spotřeby energie domácností klesly mezi lety 2005 a 2024 zhruba o 44 %, z 27 na 15 milionů tun. Dvě třetiny z nich nevznikají v domácnostech, ale v elektrárnách a teplárnách, které vyrábějí elektřinu a teplo ze sítě. Tam emise klesly o 46 %. Emise z uhlí a plynu spálených přímo v domácnostech klesly o 41 %, z 8,3 na 4,9 milionu tun. Právě ty by zpoplatnilo ETS2, elektřina a velké teplárny už povolenky platí v ETS1.

<script type="application/json" id="graf-emise-data">{{ site.data.ets2.emise_domacnosti | jsonify }}</script>
{% include includes-local/chart-panel.html
    id="graf-emise"
    title="Emise CO₂ ze spotřeby energie domácností"
    caption="Emise CO₂ ze spotřeby energie domácností podle zdroje, Mt CO₂ (2005–2024)"
    alt="Emise CO₂ ze spotřeby energie domácností 2005–2024: z uhlí a plynu spálených v domácnosti a z výroby elektřiny a tepla ze sítě v elektrárnách a teplárnách."
    source='Eurostat, <a href="https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table">energetické bilance nrg_bal_c</a>; emisní faktory <a href="https://mzp.gov.cz/system/files/2026-02/opok-Vypoctove_faktory_2025_ETS2-20260213.pdf">ČHMÚ</a> a výchozí hodnoty IPCC; výpočet Fakt o klimatu.'
%}

{% endcapture %}
{% include expander-figure.html name="emise" label="Emise klesají v domácnostech i při výrobě elektřiny a tepla" content=ex_emise %}

## Co by změnilo zavedení ETS2?

{% include preview-box.html title="Související explainer" slug="emisni-povolenky-ets-2" %}

Druhý evropský systém emisních povolenek by se týkal paliv na vytápění budov, do silniční dopravy a do menších průmyslových provozů, které nejsou ve stávajícím systému povolenek. Jejich dodavatelé by za každé prodané palivo museli odevzdat povolenky za emise, které vzniknou jeho spálením u koncového spotřebitele, a cenu by promítli do koncových cen uhlí, plynu, benzínu a nafty.

Ropu a plyn Česko téměř celé dováží,[^dovoz] takže světové cenové šoky dopadají přímo na domácnosti. Plynová krize i letošní uzavření Hormuzského průlivu[^hormuz] je stály víc, než by je stálo zavedení ETS2.

<script type="application/json" id="graf-soky-data">{{ site.data.ets2.soky | jsonify }}</script>
{% include includes-local/chart-panel.html
    id="graf-soky"
    class="narrow-figure"
    title="Fosilní šoky stály domácnosti víc, než by stálo ETS2"
    caption="Náklad navíc pro typovou domácnost v rodinném domě s plynovým kotlem a pro typickou domácnost s autem na benzín (asi 600 litrů ročně), Kč měsíčně včetně DPH"
    alt="Plyn v rodinném domě: zdražení 2021–2023 asi 1 770 Kč měsíčně, ETS2 asi 440 Kč. Benzín: zdražení 2025–2026 asi 510 Kč měsíčně, ETS2 asi 190 Kč."
    source='<a href="https://csu.gov.cz/produkty/spotreba-paliv-a-energii-v-domacnostech-energo-2021">ČSÚ ENERGO 2021</a>, <a href="https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_202/default/table">Eurostat nrg_pc_202</a>, ceny benzínu viz odkazy v textu, spotřeba benzínu: medián domácností s autem podle EU-SILC 2024 a Statistiky rodinných účtů; výpočet Fakt o klimatu.'
%}

Každé tepelné čerpadlo místo kotle a každé elektroauto místo spalovacího motoru chrání domácnost před dalším šokem, který nemáme pod kontrolou.
{: .callout}


ETS2 by podle evropských pravidel mělo začít platit v roce 2028, o rok později, než se původně plánovalo.[^odklad] [V našem základním scénáři](#metodika) (asi 60 eur za tunu v roce 2028) by vytápění rodinného domu hnědým uhlím zdražilo o 33–42 % a vytápění plynem o 12–13 %. U uhlí záleží výsledná míra zdražení na tom, zda domácnost přitápí dřevem, které ETS2 nepodléhá.

{% include preview-box.html title="Související studie" slug="2026-analyza-opatreni-domacnosti" %}

Zavedení ETS2 by zdražilo uhlí a plyn, a odchod od nich by se proto vyplatil víc: teplo z tepelného čerpadla v sazbě pro tepelná čerpadla už dnes vychází zhruba o desetinu až dvě pětiny levněji než ze staršího plynového kotle a zhruba stejně jako ze starého kotle na uhlí. V našem základním scénáři by bylo o pětinu až polovinu levnější než z plynu i z uhlí.[^cena-tepla] Na tuto pobídku ale nemohou reagovat všichni stejně. Domácnosti se středními a vyššími příjmy si investici do čerpadla, zateplení nebo elektroauta spíše mohou dovolit. Chudším častěji chybějí úspory i přístup k úvěru, což je podle ministerstva financí jedna z hlavních bariér renovací.[^mf-bariery] Je proto pravděpodobné, že od uhlí a plynu odejdou dříve domácnosti s vyššími příjmy a chudší zůstanou u dražších paliv déle, pokud jim s výměnou nikdo nepomůže.

Kolik by zdražení stálo právě vaši domácnost a jak by si vedlo tepelné čerpadlo, si můžete spočítat v kalkulačce.

{% include includes-local/ets2-blog/kalkulacka.html %}

{% capture ex_doprava %}

**Pro rozpočty domácností by doprava byla menší problém než vytápění.** Proto se v tomto textu soustředíme na vytápění. Tankování by zdražilo zhruba o 10 %, vytápění rodinného domu uhlím o třetinu až dvě pětiny, kolem 1 300 Kč měsíčně. Ceny benzínu a nafty navíc kolísají víc, než by s nimi pohnulo ETS2.

Doprava je oblast, kde fosilních paliv v Česku neubývá. Konečná spotřeba ropy, z velké části v dopravě, je [o 14 % vyšší než v roce 2005](https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table) a její podíl na konečné spotřebě energie stoupl z 26 na 33 % (2005–2024).

Zavedení ETS2 by při ceně 60 € za tunu zdražilo benzín [asi o 3,8 Kč a naftu asi o 4,4 Kč za litr](#metodika) včetně DPH. Kolik by to domácnost stálo, záleží hlavně na tom, kolik jezdí. Polovina domácností s autem by připlatila méně než 190 Kč měsíčně, čtvrtina méně než 110 Kč. Desetina by ale dala víc než 500 Kč měsíčně, typicky ti, kdo denně dojíždějí autem daleko. Auto má asi dvě třetiny domácností, mezi zranitelnými jen dvě pětiny. Pro srovnání: benzín letos po uzavření Hormuzského průlivu zdražil asi o 10 Kč za litr, tedy víc než dvojnásobně.

Elektroauto ETS2 nezatíží, protože elektřina spadá pod stávající systém ETS1. U dopravy je ale přechod pro chudší domácnosti ještě těžší než u vytápění: ojeté elektroauto je zatím drahé, kdo nemůže nabíjet doma, závisí na [veřejných nabíječkách, kterých je zatím málo](https://www.seznamzpravy.cz/clanek/ekonomika-byznys-doprava-cesko-ma-jednu-nabijecku-na-kazdych-pet-aut-sit-ale-eu-stale-nestaci-282982), a na venkově často chybí veřejná doprava. Sociální klimatický fond proto umožňuje podporovat i čistší a dostupnou dopravu, například příspěvky na veřejnou dopravu nebo na ojeté nízkoemisní vozy. Český návrh plánu ale počítá hlavně s [poptávkovou dopravou a nákupem bezemisních autobusů](https://www.cde-org.cz/media/object/2884/skf_analyza_04_2026.docx.pdf) v hůře obsloužených oblastech.

{% endcapture %}
{% include expander.html name="doprava" label="Na okraj: Jak ETS2 dopadne na dopravu?" content=ex_doprava %}

## Kdo by potřeboval pomoc s vytápěním?

**Zranitelnost posuzujeme podle vytápění, ne podle dopravy.** Topit se musí a domácnost je v krátké době odkázaná na kotel, který má. Výměna stojí desítky až stovky tisíc korun. Doprava zatěžuje rozpočty méně a nerovnoměrně: auto má jen asi dvě pětiny zranitelných domácností, ale dvě třetiny všech domácností, a zdražení tankování se dá zčásti omezit tím, že člověk jezdí méně. Dopravní chudoba je skutečná, hlavně na venkově, potřebuje ale jiné nástroje (veřejnou dopravu, sdílení, příspěvky na dojíždění). Proto ji rozebíráme zvlášť v [boxu výše](#doprava).

Pro většinu domácností by zavedení ETS2 znamenalo stokoruny měsíčně. U části z nich by ale prohloubilo chudobu, ve které už jsou. Za zranitelné považujeme domácnosti, které splňují tři podmínky současně:

- patří do **spodních dvou pětin podle příjmu přepočteného na velikost domácnosti**;
- po zavedení ETS2 by **dávaly za energie na bydlení víc než dvojnásobek mediánového podílu na příjmu** (indikátor energetické chudoby 2M);
- zdražení vytápění kvůli ETS2 by jim **vzalo aspoň 1 % čistého příjmu**.[^podminka-1]

Takových domácností je podle [našeho výpočtu](#metodika) z šetření EU-SILC zhruba 240–290 tisíc, necelých 6 % všech. Zdražení vytápění by je stálo v průměru kolem 700 Kč měsíčně, 2,4 % příjmu. Kdo jezdí autem, připlatil by navíc i za benzín nebo naftu. Nejvíc jich bydlí v rodinných domech vytápěných plynem. Nejtvrději by to ale dopadlo na rodinné domy na uhlí: zranitelná je tam každá pátá domácnost a zdražení vytápění by jí vzalo 4,2 % příjmu. Energetická chudoba v uhelných domech by stoupla z 16 na 22 %.[^energeticka-chudoba]

U dálkového tepla by zdražení nebylo plošné. Velké teplárny nad 20 MW už povolenky platí ve stávajícím systému ETS1,[^ets1-teplarny] pod ETS2 by spadly jen menší výtopny na plyn a uhlí. Dražší teplo by se tak týkalo hlavně bytů napojených na menší výtopnu, typicky v menších městech nebo na jednotlivých sídlištích s vlastní kotelnou.

{% include includes-local/ets2-blog/typove-domacnosti.html %}

Graf níže ukazuje, proč na palivu tolik záleží. Rodinných domů na uhlí je jen asi 220 tisíc, zranitelný je ale skoro každý pátý. Domů na plyn je čtyřikrát víc a zranitelný je zhruba každý osmý, v absolutních číslech je jich proto nejvíc. Z 1,5 milionu bytů na teple z velkých tepláren je zranitelných jen asi 21 tisíc, a to kvůli plynu na vaření nebo ohřev vody.

<script type="application/json" id="graf-skupiny-data">{{ site.data.ets2.skupiny | jsonify }}</script>
{% include includes-local/chart-panel.html
    id="graf-skupiny"
    title="Kolik domácností topí uhlím a plynem a kolik z nich je zranitelných"
    caption="Jeden čtvereček = 10 tisíc domácností, červeně zranitelné domácnosti (základní scénář)"
    alt="Velikost skupin domácností podle typu bydlení a vytápění a počet zranitelných domácností v nich"
    source='výpočet Fakt o klimatu z <a href="https://csu.gov.cz/zivotni-podminky">ČSÚ EU-SILC 2024</a>; byty na teple rozdělené na asi 380 tis. domácností napojených na zdroj v ETS2 a zbytek na zdrojích v ETS1, kterým by ETS2 topení nezdražilo (<a href="https://faktaoklimatu.cz/studie/2026-odchod-teplaren-od-uhli">Fakta o klimatu</a>).'
%}

## Proč hodně záleží na mikroregionu?

Kde by zavedení ETS2 dopadlo nejvíc, záleží na tom, čím se v regionu topí. Uhlím topí podle sčítání 2021[^sldb] zhruba každý desátý rodinný dům, nejčastěji v [Ústeckém](#mapa-rd_uhli-kraj-CZ042), [Libereckém](#mapa-rd_uhli-kraj-CZ051), [Plzeňském](#mapa-rd_uhli-kraj-CZ032) a [Karlovarském](#mapa-rd_uhli-kraj-CZ041) kraji a na periferiích: ve správních obvodech obcí s rozšířenou působností [Broumov](#mapa-rd_uhli-orp-broumov), [Frýdlant](#mapa-rd_uhli-orp-frydlant) nebo [Sedlčany](#mapa-rd_uhli-orp-sedlcany) je to přes čtvrtinu domů. Plyn převažuje v rodinných domech na [jižní Moravě](#mapa-rd_plyn-kraj-CZ064) a v [Praze](#mapa-rd_plyn-orp-praha), v bytových domech hlavně v [Libereckém](#mapa-bj_plyn-kraj-CZ051), [Jihomoravském](#mapa-bj_plyn-kraj-CZ064) kraji a na [Vysočině](#mapa-bj_plyn-kraj-CZ063). Dálkové teplo ze zdrojů, které by spadaly pod ETS2, je hlavně v menších městech s vlastní plynovou nebo uhelnou výtopnou, například v [Rýmařově](#mapa-teplo_ets2-orp-rymarov), [Varnsdorfu](#mapa-teplo_ets2-orp-varnsdorf) nebo [Aši](#mapa-teplo_ets2-orp-as).[^eru]

<script type="application/json" id="graf-mapy-data">{{ site.data.ets2.orp_mapa.features | jsonify }}</script>
<script type="application/json" id="graf-kraje-data">{{ site.data.ets2.kraje_mapa | jsonify }}</script>
{% include includes-local/chart-panel.html
    id="graf-mapy"
    class="wide-figure-desktop"
    title="Kde se topí uhlím a kde plynem"
    caption="Podíl obydlených bytů podle paliva, správní obvody obcí s rozšířenou působností (2021), tmavě hranice krajů"
    alt="Čtyři mapy správních obvodů ORP: podíl rodinných domů na plyn a na uhlí, bytů v bytových domech na plyn a odhad bytů na teple ze zdroje v ETS2."
    source='<a href="https://vdb.czso.cz">ČSÚ, Sčítání lidu, domů a bytů 2021</a>, <a href="https://eru.gov.cz/vysledne-ceny-tepelne-energie-v-cr-2024">ERÚ, Výsledné ceny tepelné energie 2024</a>, výpočet Fakt o klimatu. Hranice SO ORP: <a href="https://vdp.cuzk.cz/">ČÚZK</a> přes balík <a href="https://github.com/jlacko/RCzechia">RCzechia</a>.'
%}

Palivo ale nestačí. Stejné zdražení dopadne jinak na domácnost s vysokým a s nízkým příjmem a jinak na zateplený a nezateplený dům. Ministerstvo financí proto pro každý správní obvod obce s rozšířenou působností spočítalo, jakou část příjmů domácnosti v průměru dávají za vytápění. Nejvyšší podíl vychází na periferiích s rodinnými domy, často tam, kde se topí uhlím: v [Broumově](#mapa-mf-orp-broumov), [Podbořanech](#mapa-mf-orp-podborany) nebo [Frýdlantu](#mapa-mf-orp-frydlant) je to přes 16 % příjmů, v [Praze](#mapa-mf-orp-praha) necelých 6 % (2026).[^mf-mikroregiony] Tam by zavedení ETS2 dopadlo nejcitelněji a tam by se vyplatilo nejvíc posílit podporu výměny zdrojů a zateplení.
{: #mapa-chudoby}

{% include includes-local/chart-panel.html
    id="graf-mapa-mf"
    title="Energetickou chudobou jsou nejvíc ohrožené periferie s rodinnými domy"
    caption="SO ORP podle podílu předpokládaných výdajů na vytápění na disponibilních příjmech domácností, rozdělené jako v reportu MF do kvartilů, tmavě hranice krajů"
    alt="Mapa správních obvodů ORP podle ohrožení energetickou chudobou podle ministerstva financí: nejvíc ohrožené jsou periferie s rodinnými domy."
    source='<a href="https://mpo.gov.cz/assets/cz/energetika/uspory-energie/aktuality/2026/11/Tematicky-report_Mikroregionalni_ukazatel_energeticke_chudoby_MF.pdf">Ministerstvo financí, Mikroregionální ukazatel energetické chudoby</a> (2026). Hranice SO ORP: <a href="https://vdp.cuzk.cz/">ČÚZK</a> přes balík <a href="https://github.com/jlacko/RCzechia">RCzechia</a>, zjednodušené. Ukazatel popisuje průměr území, ne jednotlivé domácnosti.'
%}

{% include preview-box.html title="Pokračování série" slug="ets2-socialni-klimaticka-politika" %}

{% capture ex_lim %}
- **Pracujeme s typovými domácnostmi (archetypy), ne s konkrétními domy.** Spotřeby jsou průměry za skupinu podle typu bydlení a paliva. Skutečná domácnost může spotřebovat výrazně víc i méně.
- **Neznáme energetický stav domu.** Data neříkají, zda je dům zateplený, jaká má okna nebo jak starý je kotel. Dva domy na uhlí se stejnými příjmy tak mohou mít velmi odlišný účet i dopad ETS2.
- **Nevíme, zda domácnost dotápí, nebo přetápí.** Vycházíme ze skutečné spotřeby, takže domácnost, která šetří na úkor tepla a zdraví, se může jevit méně zasažená, než by odpovídalo potřebě. Skutečnou energetickou chudobu tak spíš podceňujeme.
- **Nezohledňujeme reakci domácností.** Výpočet předpokládá stejnou spotřebu před a po zavedení ETS2. Ve skutečnosti část domácností začne šetřit nebo vymění zdroj.
- **Zdroj dálkového tepla neznáme.** U bytů na teple předpokládáme podíl zdrojů spadajících pod ETS2 pracovním odhadem.
- **Cena povolenky je nejistá.** Základní scénář počítá s asi 60 € za tunu v roce 2028, trh nyní čeká víc. Dopady rostou s cenou zhruba úměrně.
{% endcapture %}
{% capture ex_metodika %}

- Dopady na domácnosti: mikrodata [EU-SILC 2024](https://csu.gov.cz/zivotni-podminky) (příjmy, typ bydlení, vytápění, výdaje na energie), pohonné hmoty a podíl uhlí v pevných palivech ze [Statistiky rodinných účtů 2023](https://csu.gov.cz/rodinne_ucty).
- Ceny: plyn podle realizovaných cen Eurostatu, dálkové teplo podle [ERÚ 2024](https://eru.gov.cz/vysledne-ceny-tepelne-energie-v-cr-2024), uhlí podle ceníků uhelných skladů; vše převedeno na rok 2028.
- Scénář A: povolenka 45 eur (ceny 2020), tedy asi 60 eur za tunu v roce 2028. Eura převádíme kurzem 24,2 Kč, který [Česká národní banka čeká pro rok 2028](https://www.cnb.cz/cs/menova-politika/prognoza/). Emisní faktory podle ČHMÚ.
- Odhady nákladů jednotlivých možností jsou řádové a slouží k porovnání, ne jako rozpočtová kalkulace.
- Typové domácnosti a detailní výsledky jsou v naší prezentaci a metodice.
- Renovace, návratnost zateplení a kapacity stavebnictví: Ministerstvo financí, [hlavní report](#ODKAZ-MF-hlavni-report); regionální rozložení: [Mikroregionální ukazatel energetické chudoby](https://mpo.gov.cz/assets/cz/energetika/uspory-energie/aktuality/2026/11/Tematicky-report_Mikroregionalni_ukazatel_energeticke_chudoby_MF.pdf) (2026).

{% include expander.html name="omezeni" label="Omezení výpočtu" content=ex_lim %}

{% endcapture %}
{% include expander.html name="metodika" label="Na okraj: Jak jsme počítali?" content=ex_metodika %}

## Poznámky a zdroje

[^bilance]: Fosilní paliva včetně jejich podílu na elektřině a teple ze sítě. Eurostat, [energetické bilance nrg_bal_c](https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table), konečná spotřeba energie domácností (2005–2024).
[^tc-2022]: [oEnergetice.cz](https://oenergetice.cz/teplo/asociace-zajem-domacnosti-o-tepelna-cerpadla-stagnuje-je-nejnizsi-za-tri-roky).
[^tc-2024]: [Energožrouti.cz](https://energozrouti.cz/clanek/trh-s-tepelnymi-cerpadly-v-cr-se-vraci-k-normalu-vyrobci-zustavaji-optimisticti).
[^dovoz]: Eurostat, [závislost na dovozu energie nrg_ind_id](https://ec.europa.eu/eurostat/databrowser/view/nrg_ind_id/default/table).
[^hormuz]: [IEA, Strait of Hormuz](https://www.iea.org/about/oil-security-and-emergency-response/strait-of-hormuz).
[^odklad]: [Notes from Poland](https://notesfrompoland.com/2025/11/05/poland-hails-success-in-delaying-new-eu-emissions-system/) (5. 11. 2025).
[^cena-tepla]: Výpočet Fakt o klimatu (skript 12_cena_tepla.R): cena elektřiny [ČSÚ](https://csu.gov.cz/ceny-energii) v pásmu spotřeby 5–15 a nad 15 MWh (1. pololetí 2026) jako přiblížení sazby pro tepelná čerpadla, sezónní topný faktor 2,5–3, plynový kotel s účinností 85 %, uhelný 55–65 %. Dřevo, kterého se ETS2 netýká, zůstává nejlevnější.
[^mf-bariery]: Ministerstvo financí, [hlavní report](#ODKAZ-MF-hlavni-report).
[^podminka-1]: Bez této podmínky by mezi zranitelné spadaly i chudé domácnosti, kterým by zavedení ETS2 skoro nic nevzalo, například byty na elektřinu nebo na teple z velké teplárny v ETS1. Ty jsou energeticky chudé už dnes a potřebují pomoc z jiných důvodů. Podmínka vybírá ty, kterým by chudobu prohloubilo právě ETS2, a podporu ze Sociálního klimatického fondu lze proto zacílit na dopad ETS2. Benzín a naftu do této podmínky nezapočítáváme: podpora ze Sociálního klimatického fondu by měla mířit hlavně na vytápění, kde domácnost nemá snadnou náhradu. Hranice 1 % je naše volba: odpovídá zhruba 250 Kč měsíčně u domácnosti s čistým příjmem 25 tisíc Kč.
[^energeticka-chudoba]: Podle [ministerstva průmyslu a obchodu](https://mpo.gov.cz/cz/energetika/uspory-energie/dotace-a-setreni-energie/energeticka-chudoba/energeticka-chudoba--283379/) je domácnost energeticky chudá, pokud nemá dostatečný disponibilní příjem a přístup k základním energetickým službám kvůli vysokým výdajům za energie nebo vysoké energetické náročnosti bydlení. Výdajové kritérium je podíl výdajů za energie na příjmu vyšší než dvojnásobek mediánu (tzv. 2M).
[^ets1-teplarny]: [Směrnice (EU) 2023/959](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023L0959) o systému pro obchodování s povolenkami na emise skleníkových plynů.
[^sldb]: ČSÚ, [Sčítání lidu, domů a bytů 2021](https://vdb.czso.cz).
[^eru]: [ERÚ, Výsledné ceny tepelné energie 2024](https://eru.gov.cz/vysledne-ceny-tepelne-energie-v-cr-2024), výpočet Fakt o klimatu.
[^mf-mikroregiony]: Ministerstvo financí, [Mikroregionální ukazatel energetické chudoby](https://mpo.gov.cz/assets/cz/energetika/uspory-energie/aktuality/2026/11/Tematicky-report_Mikroregionalni_ukazatel_energeticke_chudoby_MF.pdf) (2026).

{% comment %}Dočasné cíle zástupných odkazů #ODKAZ-*, aby prošla kontrola odkazů v buildu. Smazat, až budou odkazy doplněné.{% endcomment %}
<span id="ODKAZ-PDF-studie"></span><span id="ODKAZ-MF-hlavni-report"></span>
