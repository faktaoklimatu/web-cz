---
layout:      explainer
title:       "Dekarbonizace domácností už běží. Cílenou podporu by potřebovalo zhruba 300 tisíc domácností"
slug:        "ets2-zranitelne-domacnosti"
series-id:   "serie-ets2-domacnosti"
series-order: "I"
type:        "ETS2 · domácnosti · Sociální klimatický fond"
published:   2026-11-04
cover-source-author:      "alpha innotec"
cover-source-text:        "Unsplash"
cover-source-license:     "Unsplash License"
cover-source-license-url: "https://unsplash.com/license"
cover-source-url:         "https://unsplash.com/photos/outdoor-heat-pump-unit-next-to-a-brick-building-4VCm8l6wLQY"
authors:
  - name: "Jakub Komárek"
extra-scripts:
- https://d3js.org/d3.v7.min.js
- /assets-local/charts/fok-theme.js
- /assets-local/charts/fok-utils.js
- /assets-local/charts/fok-chart-area-stacked.js
- /assets-local/charts/fok-chart-bar-stacked.js
- /assets-local/js/ets2-blog.js
- /assets-local/js/ets2-mapa.js
- /assets-local/js/ets2-grafy.js
perex: |
  Evropská povolenka ETS2 by od roku 2028 zdražila uhlí, plyn, benzín a naftu. Domácnostem s penězi na výměnu kotle by to dalo další důvod přejít na tepelné čerpadlo. Zhruba 270–310 tisíc chudších domácností by na změnu ale potřebovalo pomoc ze Sociálního klimatického fondu. Jaké jsou možnosti?
---

{% include series-box.html series-id=page.series-id selected=page.slug %}

{% include tldr.html title="Hlavní zjištění" content="
- **Zavedení ETS2 by změnilo, co se domácnostem vyplatí.** Uhlí, plyn, benzín a nafta by zdražily. Tepelné čerpadlo, které už dnes vychází levněji než starší plynový kotel, by se vyplatilo ještě víc, a nově by výrazně porazilo i starý kotel na uhlí.
- **Domácnosti se středními a vyššími příjmy** by tak dostaly další důvod přejít na čistší vytápění. Na investici mají.
- **Pro většinu domácností by zavedení ETS2 znamenalo stokoruny měsíčně.** U části z nich by ale prohloubilo chudobu, ve které už jsou.
- **Zhruba 270–310 tisíc zranitelných domácností** by zavedení ETS2 zasáhlo citelně. Nejtvrději rodinné domy na uhlí, které by stálo 1 450 Kč měsíčně. Nejvíc zranitelných ale bydlí v domech na plyn, kde by to bylo 750 Kč.
" %}

<p class="dlrow"><a class="dl" href="#ODKAZ-PDF-studie" download>Stáhnout celou studii (PDF)</a></p>

## Jak se mění spotřeba fosilních paliv?

České domácnosti topí čím dál méně uhlím a plynem. Fosilní paliva včetně jejich podílu na elektřině a teple ze sítě tvořila v roce 2005 [tři čtvrtiny energie, kterou domácnosti spotřebovaly](https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table), v roce 2024 už jen polovinu. Uhlí v domácnostech ubylo o polovinu a plynu o třetinu, přibylo dřeva a pelet a tepla z tepelných čerpadel (2005–2024).

Mění se i vytápění. V roce 2022, kdy prudce zdražil plyn, si české domácnosti koupily [přes 60 tisíc tepelných čerpadel](https://oenergetice.cz/teplo/asociace-zajem-domacnosti-o-tepelna-cerpadla-stagnuje-je-nejnizsi-za-tri-roky), zhruba dvakrát víc než rok předtím. Když ceny opadly, prodeje v roce 2024 klesly [asi na 20 tisíc](https://energozrouti.cz/clanek/trh-s-tepelnymi-cerpadly-v-cr-se-vraci-k-normalu-vyrobci-zustavaji-optimisticti). Přechod tedy výrazně zrychlí, když se fosilní paliva prodraží.

<figure class="ets2-figure ets2-graf-fig">
    <h3 class="js-toc-ignore">Na vytápění a provoz domácnosti padne o třetinu méně fosilních paliv než v roce 2005</h3>
    <p class="ets2-sub">Spotřeba energie domácností na vytápění, ohřev vody, vaření a spotřebiče, bez paliv do aut, PJ (2005–2024)</p>
    <script type="application/json" class="graf-data">{{ site.data.ets2.spotreba_domacnosti | jsonify }}</script>
    <div class="ets2-graf" data-graf="spotreba" role="img" aria-label="Skladba konečné spotřeby energie v Česku 2005 a 2024: uhlí 11,5 a 3,6 %, plyn 24,8 a 18,8 %, ropa 26,1 a 32,6 %, teplo 10,0 a 7,5 %, elektřina 18,5 a 20,9 %, obnovitelné a ostatní 9,0 a 16,5 %"></div>
    <div class="ets2-src">Zdroj: Eurostat, <a href="https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table">energetické bilance nrg_bal_c</a>, konečná spotřeba energie domácností (FC_OTH_HH_E). <span class="note-wrap"><button type="button" class="note-b" aria-expanded="false">poznámky</button><span class="note-t"> Uhlí a plyn zahrnují i jejich podíl na elektřině a teple ze sítě; k plynu jsou přičteny ropné produkty a ostatní fosilní zdroje. Dřevo a jiná biomasa = tuhá biopaliva spalovaná přímo v domácnostech (Eurostat R5110-5150_W6000RI). Jádro a ostatní = jaderná, biomasová a ostatní část elektřiny a tepla ze sítě, biopaliva, bioplyn a odpad. Tepelná čerpadla = okolní teplo. Spotřeba elektřiny je rozpočtena podle skladby hrubé výroby elektřiny v Česku v daném roce (<a href="https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_peh/default/table">Eurostat nrg_bal_peh</a>); dovoz a vývoz elektřiny rozpočet nezohledňuje, jde o přiblížení. Stejně je podle paliv rozpočteno teplo ze sítě (hrubá výroba tepla tamtéž); jeho obnovitelná část (2005 asi 3 %, 2024 asi 14 %) je ve střední vrstvě. Graf ukazuje konečnou energii: elektřina a tepelná čerpadla odvedou s jednotkou energie víc práce než spalování, takže skutečný posun ve službách, jako je teplo v domě nebo ujeté kilometry, je větší, než graf ukazuje.</span></span></div>
  </figure>

**Co je ETS2.** Druhý evropský systém emisních povolenek by se týkal paliv na vytápění budov, do silniční dopravy a do menších průmyslových provozů, které nejsou ve stávajícím systému povolenek. Jejich dodavatelé by za každé prodané palivo museli odevzdat povolenky za emise, které vzniknou jeho spálením u koncového spotřebitele, a cenu by promítli do koncových cen uhlí, plynu, benzínu a nafty.

{% include includes-local/ets2-blog/preview-link.html url="https://faktaoklimatu.cz/explainery/emisni-povolenky-ets-2" kicker="Související explainer" title="Jak bude fungovat zpoplatnění emisí z dopravy a budov (tzv. ETS 2)?" sub="Fakta o klimatu" %}

Ropu a plyn Česko [téměř celé dováží](https://ec.europa.eu/eurostat/databrowser/view/nrg_ind_id/default/table), takže světové cenové šoky dopadají přímo na domácnosti. Plynová krize i letošní uzavření [Hormuzského průlivu](https://www.iea.org/about/oil-security-and-emergency-response/strait-of-hormuz) je stály víc, než by je stálo zavedení ETS2.

<figure class="ets2-figure ets2-graf-fig">
    <h3 class="js-toc-ignore">Fosilní šoky stály domácnosti víc, než by stálo ETS2</h3>
    <p class="ets2-sub">Náklad navíc pro typovou domácnost v rodinném domě s plynovým kotlem a autem na benzín, Kč měsíčně včetně DPH</p>
    <script type="application/json" class="graf-data">{{ site.data.ets2.soky | jsonify }}</script>
    <div class="ets2-graf" data-graf="soky" role="img" aria-label="Plyn v rodinném domě: zdražení 2021–2023 asi 1 770 Kč měsíčně, ETS2 asi 440 Kč. Benzín: zdražení 2025–2026 asi 650 Kč měsíčně, ETS2 asi 270 Kč."></div>
    <div class="ets2-src">Zdroj: <a href="https://csu.gov.cz/produkty/spotreba-paliv-a-energii-v-domacnostech-energo-2021">ČSÚ ENERGO 2021</a>, <a href="https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_202/default/table">Eurostat nrg_pc_202</a>, ceny benzínu viz odkazy v textu; výpočet Fakt o klimatu. <span class="note-wrap"><button type="button" class="note-b" aria-expanded="false">poznámky</button><span class="note-t"> Spotřeba typové domácnosti: rodinný dům na plyn asi 16,5 tisíce kWh (1 554 m³), auto 787 l ročně. Ceny plynu pro odběr 20–199 GJ včetně daní: průměr 2021 1,43 Kč/kWh, průměr 2023 2,72 Kč/kWh. ETS2 při 60 € za tunu (scénář A). Zdražení plynu v roce 2023 částečně tlumil úsporný tarif, který v grafu není.</span></span></div>
  </figure>

Každé tepelné čerpadlo místo kotle a každé elektroauto místo spalovacího motoru chrání domácnost před dalším šokem, který nemáme pod kontrolou.
{: .callout}

## Co by změnilo zavedení ETS2?

ETS2 by podle evropských pravidel mělo začít platit v roce 2028, [o rok později, než se původně plánovalo](https://notesfrompoland.com/2025/11/05/poland-hails-success-in-delaying-new-eu-emissions-system/). [V našem základním scénáři](#metodika) (asi 60 eur za tunu v roce 2028) by vytápění rodinného domu hnědým uhlím zdražilo o 33–42 % a vytápění plynem o 12–13 %. U uhlí záleží výsledná míra zdražení na tom, zda domácnost přitápí dřevem, které ETS2 nepodléhá.

Zavedení ETS2 by zdražilo uhlí a plyn, a odchod od nich by se proto vyplatil víc: teplo z tepelného čerpadla v sazbě pro tepelná čerpadla už dnes vychází zhruba o desetinu až dvě pětiny levněji než ze staršího plynového kotle a zhruba stejně jako ze starého kotle na uhlí. V našem základním scénáři by bylo o pětinu až polovinu levnější než z plynu i z uhlí. <span class="note-wrap"><button type="button" class="note-b" aria-expanded="false">poznámky</button><span class="note-t"> Výpočet Fakt o klimatu (skript 12_cena_tepla.R): cena elektřiny <a href="https://csu.gov.cz/ceny-energii">ČSÚ</a> v pásmu spotřeby 5–15 a nad 15 MWh (1. pololetí 2026) jako přiblížení sazby pro tepelná čerpadla, sezónní topný faktor 2,5–3, plynový kotel s účinností 85 %, uhelný 55–65 %. Dřevo, kterého se ETS2 netýká, zůstává nejlevnější.</span></span> Na tuto pobídku ale nemohou reagovat všichni stejně. Domácnosti se středními a vyššími příjmy si investici do čerpadla, zateplení nebo elektroauta spíše mohou dovolit. Chudším častěji chybějí úspory i přístup k úvěru, což je podle ministerstva financí [jedna z hlavních bariér renovací](#ODKAZ-MF-hlavni-report). Je proto pravděpodobné, že od uhlí a plynu odejdou dříve domácnosti s vyššími příjmy a chudší zůstanou u dražších paliv déle, pokud jim s výměnou nikdo nepomůže.

{% include includes-local/ets2-blog/preview-link.html url="https://faktaoklimatu.cz/studie/2026-analyza-opatreni-domacnosti" kicker="Související studie" title="Analýza opatření pro dekarbonizaci domácností v ČR" sub="Kdy se vyplatí tepelné čerpadlo, zateplení nebo elektroauto · Fakta o klimatu" %}

{% include includes-local/ets2-blog/kalkulacka.html %}

<div id="doprava" class="ets2-anchor"></div>

{% capture ex_doprava %}

**Pro rozpočty domácností by doprava byla menší problém než vytápění.** Tankování by zdražilo zhruba o 12 %, kolem 270 Kč měsíčně na domácnost s autem. Vytápění rodinného domu uhlím by zdražilo o třetinu až dvě pětiny, kolem 1 450 Kč měsíčně. Ceny benzínu a nafty navíc kolísají víc, než by s nimi pohnulo ETS2.

Doprava je oblast, kde fosilních paliv v Česku neubývá. Konečná spotřeba ropy, z velké části v dopravě, je [o 14 % vyšší než v roce 2005](https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table) a její podíl na konečné spotřebě energie stoupl z 26 na 33 % (2005–2024).

Zavedení ETS2 by při ceně 60 € za tunu zdražilo benzín a naftu [zhruba o 4–5 Kč za litr](#metodika) včetně DPH. Domácnost s autem natankuje v průměru [787 litrů ročně](https://csu.gov.cz/produkty/spotreba-paliv-a-energii-v-domacnostech-energo-2021), takže by ji to stálo kolem 270 Kč měsíčně. Auto přitom používá asi tři čtvrtiny domácností. Pro srovnání: benzín letos po uzavření Hormuzského průlivu zdražil asi o 10 Kč za litr, tedy víc než dvojnásobně.

Elektroauto ETS2 nezatíží, protože elektřina spadá pod stávající systém ETS1. U dopravy je ale přechod pro chudší domácnosti ještě těžší než u vytápění: ojeté elektroauto je zatím drahé, kdo nemůže nabíjet doma, závisí na [veřejných nabíječkách, kterých je zatím málo](https://www.seznamzpravy.cz/clanek/ekonomika-byznys-doprava-cesko-ma-jednu-nabijecku-na-kazdych-pet-aut-sit-ale-eu-stale-nestaci-282982), a na venkově často chybí veřejná doprava. Sociální klimatický fond proto počítá i s podporou čistší a dostupné dopravy, například s příspěvky na veřejnou dopravu nebo na ojeté nízkoemisní vozy.

{% endcapture %}
{% include expander.html name="doprava" label="Na okraj: Jak ETS2 dopadne na dopravu?" content=ex_doprava %}

## Kdo by potřeboval pomoc?

Pro většinu domácností by zavedení ETS2 znamenalo stokoruny měsíčně. U části z nich by ale prohloubilo chudobu, ve které už jsou. Za zranitelné považujeme domácnosti, které splňují tři podmínky současně:

- patří do spodních dvou pětin podle příjmu na osobu;
- po zavedení ETS2 by dávaly za energie na bydlení víc než dvojnásobek mediánového podílu na příjmu (indikátor energetické chudoby 2M);
- <span class="pop-inline" tabindex="0"><span class="pv">ETS2 by jim vzalo aspoň 1 % čistého příjmu.</span><span class="pb" hidden>Bez této podmínky by mezi zranitelné spadaly i chudé domácnosti, kterým by zavedení ETS2 skoro nic nevzalo, například byty na elektřinu nebo na teple z velké teplárny v ETS1. Ty jsou energeticky chudé už dnes a potřebují pomoc z jiných důvodů. Podmínka vybírá ty, kterým by chudobu prohloubilo právě ETS2, a podporu ze Sociálního klimatického fondu lze proto zacílit na dopad ETS2. Hranice 1 % je naše volba: odpovídá zhruba 250 Kč měsíčně u domácnosti s čistým příjmem 25 tisíc Kč.</span></span>
{: .plain}

Takových domácností je podle [našeho výpočtu](#metodika) z šetření EU-SILC zhruba 270–310 tisíc, kolem 6 % všech. ETS2 by je stálo v průměru 780 Kč měsíčně, 2,7 % příjmu. Nejvíc jich bydlí v rodinných domech vytápěných plynem. Nejtvrději by to ale dopadlo na rodinné domy na uhlí: zranitelná je tam každá pátá domácnost a ETS2 by jí vzalo 4,7 % příjmu. <span class="pop-inline" tabindex="0"><span class="pv">Energetická chudoba</span><span class="pb" hidden>Podle <a href="https://mpo.gov.cz/cz/energetika/uspory-energie/dotace-a-setreni-energie/energeticka-chudoba/energeticka-chudoba--283379/">ministerstva průmyslu a obchodu</a> je domácnost energeticky chudá, pokud nemá dostatečný disponibilní příjem a přístup k základním energetickým službám kvůli vysokým výdajům za energie nebo vysoké energetické náročnosti bydlení. Výdajové kritérium je podíl výdajů za energie na příjmu vyšší než dvojnásobek mediánu (tzv. 2M).</span></span> v uhelných domech by stoupla z 16 na 22 %.

U dálkového tepla by zdražení nebylo plošné. Velké teplárny nad 20 MW už povolenky platí ve [stávajícím systému ETS1](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023L0959), pod ETS2 by spadly jen menší výtopny na plyn a uhlí. Dražší teplo by se tak týkalo hlavně bytů napojených na menší výtopnu, typicky v menších městech nebo na jednotlivých sídlištích s vlastní kotelnou.

{% include includes-local/ets2-blog/typove-domacnosti.html %}

<figure class="ets2-figure ets2-graf-fig">
    <h3 class="js-toc-ignore">Nejvíc zranitelných je v domech na plyn, nejvíc by zaplatily domy na uhlí</h3>
    <p class="ets2-sub">Zranitelné domácnosti podle typu bydlení a vytápění, tis.; v popisku náklad ETS2 v Kč měsíčně a % příjmu</p>
    <script type="application/json" class="graf-data">{{ site.data.ets2.zranitelne | jsonify }}</script>
    <div class="ets2-graf" data-graf="zranitelne" role="img" aria-label="Zranitelné domácnosti: rodinné domy na plyn 110–130 tis., 750 Kč měsíčně; rodinné domy na uhlí 40–50 tis., 1 450 Kč; byty na plyn 40–60 tis., 570 Kč; byty na teple ze zdroje v ETS2 30–40 tis., 500 Kč; ostatní 40–50 tis., 650 Kč"></div>
    <div class="ets2-src">Zdroj: výpočet Fakt o klimatu z <a href="https://csu.gov.cz/zivotni-podminky">ČSÚ EU-SILC 2024</a> a <a href="https://csu.gov.cz/rodinne_ucty">SRÚ 2023</a>; scénář A, ceny a příjmy 2028. <span class="note-wrap"><button type="button" class="note-b" aria-expanded="false">poznámky</button><span class="note-t"> Byty na teple jen v rozsahu asi 380 tis. domácností napojených na zdroje v ETS2.</span></span></div>
  </figure>

Ohrožení se liší i podle území. [Nový mikroregionální ukazatel ministerstva financí](https://mpo.gov.cz/assets/cz/energetika/uspory-energie/aktuality/2026/11/Tematicky-report_Mikroregionalni_ukazatel_energeticke_chudoby_MF.pdf) porovnává předpokládané výdaje na vytápění s disponibilními příjmy v každém správním obvodu obce s rozšířenou působností (SO ORP). Nejvíc ohrožené jsou vnější i vnitřní periferie s převahou starších rodinných domů, například SO ORP Broumov, Frýdlant, Konice, Hořice, Votice nebo Vlašim. Nízké příjmy přitom nejsou podmínkou: zhruba třetina nejohroženějších obvodů má příjmy nadprůměrné, rozhoduje hlavně podíl rodinných domů a jejich energetická náročnost.

{% include includes-local/ets2-blog/mapa-orp.html vrstvy="uhli,plyn" %}

{% include includes-local/ets2-blog/preview-link.html url="/explainery/ets2-socialni-klimaticka-politika" kicker="Pokračování série" title="Česku chybí sociální klimatická politika. Stát ale ani neví, kdo čím topí" sub="Sociální klimatická politika, 2. díl · Fakta o klimatu" %}

<div id="metodika" class="ets2-anchor"></div>

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
- Scénář A: povolenka 45 eur (ceny 2020), tedy asi 60 eur za tunu v roce 2028. Emisní faktory podle ČHMÚ.
- Odhady nákladů jednotlivých možností jsou řádové a slouží k porovnání, ne jako rozpočtová kalkulace.
- Typové domácnosti a detailní výsledky jsou v naší prezentaci a metodice.
- Renovace, návratnost zateplení a kapacity stavebnictví: Ministerstvo financí, [hlavní report](#ODKAZ-MF-hlavni-report); regionální rozložení: [Mikroregionální ukazatel energetické chudoby](https://mpo.gov.cz/assets/cz/energetika/uspory-energie/aktuality/2026/11/Tematicky-report_Mikroregionalni_ukazatel_energeticke_chudoby_MF.pdf) (2026).

{% include expander.html name="omezeni" label="Omezení výpočtu" content=ex_lim %}

{% endcapture %}
{% include expander.html name="metodika" label="Na okraj: Jak jsme počítali?" content=ex_metodika %}

## Poznámky a zdroje

1. [konečné spotřebě energie](https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table) – ec.europa.eu
2. [elektřiny z jádra](https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_peh/default/table) – ec.europa.eu
3. [přes 60 tisíc tepelných čerpadel](https://oenergetice.cz/teplo/asociace-zajem-domacnosti-o-tepelna-cerpadla-stagnuje-je-nejnizsi-za-tri-roky) – oenergetice.cz
4. [asi na 20 tisíc](https://energozrouti.cz/clanek/trh-s-tepelnymi-cerpadly-v-cr-se-vraci-k-normalu-vyrobci-zustavaji-optimisticti) – energozrouti.cz
5. [téměř celé dováží](https://ec.europa.eu/eurostat/databrowser/view/nrg_ind_id/default/table) – ec.europa.eu
6. [Hormuzského průlivu](https://www.iea.org/about/oil-security-and-emergency-response/strait-of-hormuz) – iea.org
7. [ČSÚ ENERGO 2021](https://csu.gov.cz/produkty/spotreba-paliv-a-energii-v-domacnostech-energo-2021) – csu.gov.cz
8. [Eurostat nrg_pc_202](https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_202/default/table) – ec.europa.eu
9. [o rok později, než se původně plánovalo](https://notesfrompoland.com/2025/11/05/poland-hails-success-in-delaying-new-eu-emissions-system/) – notesfrompoland.com
10. [evropská pravidla](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023L0959) – eur-lex.europa.eu
11. [cena budoucích kontraktů na prosinec 2028](https://www.ice.com/products/83048353/EUA-2-Futures/expiry) – ice.com
12. [ČHMÚ](https://mzp.gov.cz/system/files/2026-02/opok-Vypoctove_faktory_2025_ETS2-20260213.pdf) – mzp.gov.cz
13. [ČSÚ EU-SILC 2024](https://csu.gov.cz/zivotni-podminky) – csu.gov.cz
14. [SRÚ 2023](https://csu.gov.cz/rodinne_ucty) – csu.gov.cz
15. [ČÚZK](https://vdp.cuzk.cz/) – vdp.cuzk.cz
16. [RCzechia](https://github.com/jlacko/RCzechia) – github.com
17. [ERÚ 2024](https://eru.gov.cz/vysledne-ceny-tepelne-energie-v-cr-2024) – eru.gov.cz
