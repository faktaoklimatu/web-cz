---
layout:     infographic
title:      "Územní stopa elektřiny ze slunce, větru a biomasy"
slug:       "uzemni-stopa-oze"
redirect_from: "/uzemni-stopa-oze"
published:  2023-09-15
weight:     90
tags-scopes: [ cr ]
tags-topics: [ energetika, opatreni ]
caption:    "Fotovoltaika má menší územní stopu než větrné parky, převážnou část území s větrnými elektrárnami lze ovšem využít k dalšímu účelu (třeba jako pole, louku nebo les). U solárních elektráren umístěných v krajině je toto dvojí využití také možné, ale omezenější. Mnohonásobně větší územní stopu pak má cíleně pěstovaná biomasa, která tak může sloužit pouze jako doplňkový zdroj energie."
data-our:   "https://docs.google.com/spreadsheets/d/1SIiWX_pCvMLBQKPB25q6xLOZxWAxHYIBSQpmHPhlKsQ/edit"
---

## Jak číst tuto grafiku

Grafika porovnává územní stopu (územní náročnost) obnovitelných zdrojů elektřiny, tedy jak velká plocha území ČR by byla nutná k výrobě 25 TWh elektřiny za rok – zhruba 40 % současné spotřeby. Přibližně stejné množství elektřiny by do sítě ročně dodaly tři velké jaderné bloky (například dva bloky v Temelíně a jeden nový v Dukovanech).

## Kolik obnovitelných zdrojů může Česko na svém území vybudovat?
<!-- ## Kolik území na rozvoj obnovitelných zdrojů Česko má? -->

{% include preview-box.html
    title="Kolik elektřiny z obnovitelných zdrojů Česko potřebuje?"
    text="Různé scénáře dekarbonizace a vývoje spotřeby popisuje následující text."
    slug="bezemisni-energetika-cr-1-scenare"
    text-below="Ve zkratce: k dekarbonizaci do roku 2050 Česko výrazný rozvoj obnovitelných zdrojů elektřiny potřebuje – a to i v případě velkého rozvoje jaderné energetiky. V závislosti na scénáři **Česko může v roce 2050 potřebovat 50–100 TWh obnovitelné elektřiny ročně**."
%}

**Pro rozvoj větrných parků a fotovoltaiky v Česku není územní stopa zásadním limitujícím faktorem.** Dobře to ukazuje srovnání se současným stavem. Už dnes se totiž znatelná část našeho území využívá pouze pro energetiku, a to velmi neefektivně. Jen na bionaftu se využívá řepka z polí o rozloze asi na 1,5 % území, což je zhruba třetina celkové rozlohy řepkových polí u nás. Z této řepky ale lze získat jen asi 3 TWh energie ve formě bionafty, což pokryje pouze 4 % spotřeby energie v dopravě v ČR. Naproti tomu solární panely a větrné elektrárny by na stejně velkém území vyrobily 15× více – asi 45 TWh čisté elektřiny ročně[^oze-misto-repky], což by pokrylo téměř 75 % současné spotřeby elektřiny v ČR. A kromě toho je možné území s větrnými elektrárnami a fotovoltaikou využívat současně i k dalším účelům (viz Dvojí využití půdy níže) a při dobře promyšlené výstavbě i podpořit biodiverzitu (například pestré louky a remízky ve větrných parcích), což v případě monokultury s řepkou není možné.

Naopak **biomasa může mít na území ČR v produkci elektřiny a energie obecně pouze doplňkovou roli**. Tyto omezené kapacity je vhodné využívat na speciální účely (kapalná biopaliva pro nákladní nebo leteckou dopravu, zálohování elektrické sítě nebo vytápění), u kterých zatím nemusí být bezemisní alternativa vždy levnějším řešením.

{% capture jen_fve %}
Fotovoltaika má podle zvolené metodiky nejmenší územní stopu. To ovšem není jediný aspekt dobrého energetického mixu a je třeba **mezi jednotlivými obnovitelnými zdroji hledat vhodný poměr**.

- **Pro stabilitu sítě** je nutné, aby v každém okamžiku během celého roku existovala rovnováha mezi spotřebou a výrobou elektřiny. Pro vyváženou produkci elektřiny je proto potřeba využívat slunce i vítr současně (ideálně s převahou elektřiny z větru), protože větrnost je v Česku vyšší zejména během topné sezóny, kdy slunce svítí méně a kdy je spotřeba elektřiny nejvyšší.
{% include figure.html
    class="figure-in-list"
    name="solar-wind-seasonality-des.svg"
    name-mobile="solar-wind-seasonality-mob.svg"
    alt="Převaha větru by vedla k sezónně vyrovnané výrobě."
    source-text="Fakta o klimatu"
%}
- **Pro posílení energetické bezpečnosti** je ze všech obnovitelných zdrojů rovněž nejvhodnější větrná energetika. Právě ta může svou výrobou během zimy nejvíce omezit závislost Česka na dovozu zemního plynu.
{% endcapture %}

{% include expander-figure.html
    name="jen-fve"
    class="contrast-figure"
    label="Může Česko rozvíjet výhradně fotovoltaiku?"
    content=jen_fve
%}

## Metodika výpočtu a další souvislosti

Výpočet územní stopy závisí na použité metodice a odhadovaných parametrech, a v literatuře se proto liší. Zde jsou předpoklady a metodika výpočtu uvedeny pro každý zdroj zvlášť.

### Vítr

**Metodické poznámky**. Výpočet využívá didaktický model vycházející ze [studie](https://www.ufa.cas.cz/DATA/vetrna-energie/Potencial_vetrne_energie_2020.pdf) Ústavu fyziky atmosféry AV ČR. Pro větší přehlednost pracuje s jediným typem větrné elektrárny[^vte-typ] o maximálním výkonu 5 MW, průměru rotoru 160 m a koeficientu využití 29 %. Předpokládá rozmístění věží do čtvercové sítě s rozestupy, které odpovídají 4,5-násobku průměru rotoru[^vte-rozestupy] (tedy 720 m). Na každou elektrárnu proto vychází územní stopa v podobě čtvercové parcely o přibližné ploše 0,5 km2.
{% include figure.html
    name="wind-scheme-des.svg"
    name-mobile="wind-scheme-mob.svg"
    alt="Didaktický model pro výpočet územní stopy větrných parků."
    source-text="Fakta o klimatu"
%}

- Z hlediska zastavěné plochy je územní stopa větrných parků téměř nulová. Důležitou roli při rozhodování o další výstavbě bude nicméně hrát i vizuální stránka, tedy viditelnost větrných elektráren v krajině.  Velikost území, které by při výše uvedené výstavbě bylo silně ovlivněno výhledem na větrné elektrárny, by mohl být naopak vyšší než uváděných 1,3 %.
- Množství elektřiny vyrobené na hektar půdy se může s dalším technologickým vývojem ještě zvyšovat.[^vte-technologicky-rozvoj] Došlo k tomu i v minulosti: v posledních 20 letech se například zásadně zvětšila výška věží i průměr rotorů elektráren. S dalším zvětšováním by výroba elektřiny na hektar dále rostla – větší rotor totiž využije větší pás pohybujícího se vzduchu, navíc s rostoucí vzdáleností od země se zvyšuje také průměrná rychlost větru. To ale zároveň znamená, že by takové elektrárny byly viditelné na větší vzdálenosti, a celkový dopad na charakter krajiny proto nelze přesně odhadnout.

**Dvojí využití půdy**. Věže elektráren, transformátory a přístupové cesty by zabraly jen nepatrnou část z uvedených 1,3 % území. Téměř veškerou půdu ve větrných parcích lze dále využívat jako pole, pastviny, lesy nebo pro fotovoltaiku. V zalesněné krajině jsou také větrné parky více skryté, a tedy méně nápadné. Navíc výroba z větru a ze slunce ve stejné lokalitě se může vzájemně  doplňovat: především s ohledem na sezónní variabilitu (léto–zima) a částečně i variabilitu denní (den–noc). Kapacita napojení na přenosovou soustavu je pak využita efektivněji.

**"Hluková stopa"**. Kromě námitek spojených s přítomností větrných elektráren v krajině a narušením jejího rázu zaznívají také obavy z hlukového zatížení. V tomto směru je nicméně optimalizace dnes už velmi pokročilá a stavby jsou povolovány jen v dostatečné vzdálenosti (minimálně 500 m) od rezidenční zástavby. To znamená, že bezpečně splňují hlukové normy a ve většině případů se hluk při provozu turbíny příliš neliší od hluku pozadí (hluk způsobený větrem je silnější než hluk elektrárny).[^vte-hluk]

**Ekologická stopa**. V některých oblastech mohou být větrné parky rizikem pro netopýry a větší ptačí druhy, což může znamenat omezení výstavby v těchto lokalitách. Na mnoha dalších místech se však o velký problém nejedná nebo lze negativní dopady zásadně omezit selektivním vypínáním turbín v kritických obdobích, aniž by docházelo ke znatelným ztrátám na celkové produkci elektřiny.[^vte-vypinani] Vypínání provozu je například vhodné při aktivitě netopýrů během teplých letních nocí, v období tahu ptáků, po sklizni plodin či při sečení trávy. Z hlediska rizik je také dobré zmínit, že větším nebezpečím pro ptáky jsou průhledné a lesklé plochy staveb, doprava, elektrické vedení v krajině, znečištění ovzduší, jedy používané například k hubení škůdců v zemědělství nebo klimatická změna.[^vte-riziko-ptaci]

<!-- TODO: smazat, pokud bez boxu je to ok. S boxem by se musely vyřešit nefunkční footnotes.
{% capture detaily_vte %}
{% endcapture %}
{% include expander-figure.html
    name="detaily_vte"
    class="contrast-figure"
    label='Hluková a ekologická "stopa" větrné energetiky'
    content=detaily_vte
%}
-->

### Slunce

**Metodické poznámky**. Při výpočtu byly uvažovány fotovoltaické panely instalované v rovnoběžných řadách, v energeticky optimálním sklonu a s energeticky optimálními mezerami (v poledne zimního slunovratu se zastíní celá mezera, ale ne panely samotné).[^fve-rozestupy] V půdorysu tak pod šikmými panely leží necelá třetina parcely. Územní plocha fotovoltaické elektrárny byla ještě  navýšena o třetinu kvůli potřebě přístupových cest, okrajů a dalšího technického vybavení. Jde o odhad situace za 10–20 let, přičemž se předpokládá efektivita nejlepších dostupných FVE panelů dneška – [23 %](https://www.cleanenergyreviews.info/blog/most-efficient-solar-panels). V tomto ohledu se tedy jedná o spíše konzervativní odhad, neboť do budoucna lze očekávat mírné zvýšení konverzní efektivity panelů.[^fve-technologicky-rozvoj]

{% include figure.html
    name="solar-scheme-des.svg"
    name-mobile="solar-scheme-mob.svg"
    alt="Ilustrace optimálních rozestupů mezi řadami fotovoltaických panelů."
    source-text="Fakta o klimatu"
%}
Pro přesnější výpočet by bylo nutné zahrnout ještě další faktory, například postupné mírné snižování efektivity instalovaných panelů v čase.

**Dvojí využití půdy.**

- **V zemědělství**. Navzdory vysoké efektivitě fotovoltaiky jsou někdy velké instalace na polích kritizovány kvůli "znehodnocení" zemědělské půdy. Jedním z možných řešení je takzvaná "[agrivoltaika](https://cs.wikipedia.org/wiki/Agrovoltaika)", kdy jsou solární panely zpravidla instalovány výš (dál od země) a pod nimi se pěstují vybrané plodiny, kterým se lépe daří v částečném zastínění (příliš mnoho slunce znamená, že fotosyntéza už neprobíhá, navíc dochází k rychlému odparu). Mezi takové plodiny patří špenát, locika salátová, bazalka, brokolice a další. Stín pod panely ale vyhledávají i pasoucí se zvířata.[^fve-agrivoltaika] Zároveň vegetace prospívá i fotovoltaickým panelům, neboť je do určité míry ochlazuje a tím zvyšuje jejich efektivitu. Rozvoji agrivoltaiky v Česku zatím brání legislativa.
- **V zástavbě a dříve využívaných lokalitách**. Kromě toho lze velkou část fotovoltaických zdrojů umístit i na [střechy a fasády budov](/infografiky/potencial-solarni-energie-cr-strechy).[^fve-strechy] Například studie EGÚ Brno odhaduje technický potenciál střech na 9 TWh ročně. Dále lze pro výrobu elektřiny využít také brownfieldy nebo lokality znehodnocené těžbou uhlí.

**Srovnání s územním dopadem těžby uhlí**. Územní dopad 25 TWh elektřiny z fotovoltaiky je srovnatelný s územním dopadem z české uhelné energetiky. V ČR je dnes těžbou uhlí zasaženo přibližně 0,7 % území, což přináší jen o málo více než 25 TWh elektřiny.[^fve-versus-uhli]

### Biomasa

**Metodické poznámky**. Výpočet se opírá o [studii](https://dspace.library.uu.nl/bitstream/handle/1874/21677/NWS-E-2006-41.pdf?sequence=1) Utrechtské univerzity. Ta předpokládá využití rychle rostoucích dřevin (topol nebo vrba) pěstovaných v tzv. výmladkových plantážích.
{% include figure.html
    name="ukazka-biomasa.jpg"
    name-mobile="ukazka-biomasa.jpg"
    alt="Ukázka výmladkové plantáže vrby."
    caption="Ukázka výmladkové plantáže vrby."
    source-text="biomass connect"
    source-url="https://www.biomassconnect.org/technical-articles/harvesting-of-short-rotation-coppice-willow/"
%}

V souladu se studií i výpočet pro infografiku počítá s průměrným výnosem 10 tun suché hmoty na hektar za rok, spalným teplem 19,4 MJ na tunu a [efektivitou elektráren 40 %](https://www.iea.org/reports/biomass-for-power-generation-and-chp). Ještě o něco vyšší výnosy by mohla přinést tráva zvaná ozdobnice (miscanthus), ta ale zatím není v Česku rozšířená.[^biomasa-miscanthus]

Podobně jako u hnědého uhlí se finančně (ani z hlediska získané energie) nevyplatí přepravovat biomasu na větší vzdálenosti. Proto je potřeba mít v zemi k dispozici větší množství menších elektráren, ty ale zároveň nedosahují efektivity elektráren velkých. Přesto se dá v tomto případě počítat se 40% efektivitou – spalováním biomasy totiž kromě elektřiny vzniká také teplo.[^biomasa-kogenerace]

Pro přesnější výpočet územní stopy by bylo nutné započítat i energetickou spotřebu při obdělávání, zpracování a přepravě energetických plodin. V případě rychle rostoucích dřevin je ovšem [takto spotřebovaná energie jen malým zlomkem energie vyrobené](https://www.mdpi.com/2073-4395/11/7/1272), protože jejich pěstování a zpracování je poměrně nenáročné (např. na rozdíl od již zmiňované řepky není třeba je obdělávat, hnojit, ošetřovat postřikem ani složitě zpracovávat).

**Proč má smysl porovnávat územní stopu na výrobu elektřiny, když se biomasa často používá na vytápění nebo v dopravě?** Převod na energii ve formě elektřiny umožňuje porovnat výnos z biomasy s výrobou ze slunce a větru. Takový převod není pro biomasu ve srovnání územní stopy nevýhodný, protože z elektřiny můžeme získat podobný nebo větší užitek než z přímého užití biomasy ve vytápění a dopravě:

- **Ve vytápění** lze elektřinu převést na násobek tepelné energie pomocí tepelného čerpadla. Ztrátová konverze biomasy na elektřinu a použití této elektřiny v tepelném čerpadle tak má tepelně zhruba stejný efekt jako přímé spalování biomasy na teplo.
- **V dopravě** má kWh elektřiny násobně vyšší užitek než kWh energie získané z paliva pro spalovací motor. Konverze biomasy na elektřinu a její použití v elektromotoru tak bude vycházet ještě lépe než konverze biomasy na biopaliva a využití těchto paliv ve spalovacím motoru.

**Emisní stopa biomasy.** Hlavním důvodem pro využití obnovitelných zdrojů energie je v době klimatické změny potřeba transformace na nízkouhlíkovou společnost. Proto je důležité nastavit také pravidla pro udržitelné využívání biomasy, aby celková emisní stopa takto vyrobené energie byla co nejnižší. Evropská unie taková [pravidla pro udržitelnou biomasu](https://energy.ec.europa.eu/topics/renewable-energy/bioenergy/biomass_en) už stanovena má a postupně je zpřísňuje. Pravidla se řídí následujícím principem: energetické využívání biomasy musí mít znatelně nižší emise než jejich fosilní alternativa.[^biomasa-uspora-emise] Zároveň nesmí vést ke ztrátám uhlíku ze zemědělské půdy ani škodit lesům neudržitelnou těžbou.[^biomasa-ochrana-lesu]

## Poznámky

[^oze-misto-repky]: Tento odhad nepočítá s dvojím využitím půdy, tedy kombinací větrných a solárních elektráren na stejném území. Při dvojím využití půdy by byl energetický zisk z 1,5 % území ČR ještě vyšší než zmíněných 45 TWh za rok. Kdyby se například solární a větrné elektrárny kombinovaly jen na třetině tohoto území (tedy kombinace větrných a solárních parků na 0,5 % území, samostatné větrné parky na 0,8 % území, samostatné solární parky na 0,2 % území), mohlo by na tomto území být vyrobeno okolo 60 TWh za rok.
[^vte-typ]: Výpočet předpokládá typ elektráren z optimistického scénáře pro kategorii "vrchovina" (parametry jsou v Tabulce 9 ve [studii](https://www.ufa.cas.cz/DATA/vetrna-energie/Potencial_vetrne_energie_2020.pdf)). Studie dále rozlišuje kategorie "hory" a "nížina", které se ale v územní stopě liší nepatrně.
[^vte-rozestupy]: Větrné elektrárny lze umístit i s menšími rozestupy za cenu nižší výroby elektřiny na jednu elektrárnu (s nižším koeficientem využití), zato s vyšší výrobou elektřiny na hektar. To může být racionální ekonomická volba, pokud se ceny instalací budou dále snižovat, ale nebude dostatek parcel, na nichž by byla povolena výstavba.
[^vte-technologicky-rozvoj]: Vyšší výrobu na hektar by teoreticky měly větrné elektrárny s efektivnější konverzí kinetické energie na elektřinu. Nicméně současné konstrukce jsou již vysoce optimalizované a další zlepšení je omezeno praktickými i teoretickými limity (efektivitu nad 59,3 % vylučuje tzv. [Betzův limit](https://en.wikipedia.org/wiki/Betz%27s_law), ten ovšem v praxi stejně není dosažitelný – současné kvalitní turbíny dosahují v optimálních podmínkách efektivity kolem 45 %).
[^vte-hluk]: Štěpán Honzíček v diplomové práci [Problematika hluku větrných elektráren](https://www.vut.cz/www_base/zav_prace_soubor_verejne.php?file_id=192616) shrnuje: "Zkušenosti nasbírané během vývoje větrných elektráren jsou už tak významné, že se podařilo provozní hluk výrazně eliminovat. Lze tedy vyjádřit fakt, že hluk větrných turbín je v současnosti nízký. … součástí povolovacího řízení je hluková studie, která teoreticky ověří, zda jsou v lokalitě dodrženy limity hluku. Následně se podle výsledků hlukové studie zpravidla provede praktické ověření měřením. Neměla by tedy nastat situace, že je postavena větrná elektrárna, která bude překračovat limity hluku a někoho obtěžovat."
[^vte-vypinani]: [IPCC: AR6, WGIII, Chapter 6: Energy Systems](https://www.ipcc.ch/report/ar6/wg3/downloads/report/IPCC_AR6_WGIII_Chapter06.pdf), strana 637.
[^vte-riziko-ptaci]: David Hanslian: [Aktualizace potenciálu větrné energie v České republice z perspektivy roku 2020](https://www.ufa.cas.cz/DATA/vetrna-energie/Potencial_vetrne_energie_2020.pdf), strana 36.

[^fve-rozestupy]: Územní stopu by šlo dále snižovat menšími mezerami mezi řadami fotovoltaických panelů a jejich menším sklonem. Například panely instalované "na plocho", které  by zakrývaly 60 % plochy parcely, by pro stejnou výrobu potřebovaly poloviční prostor. Toto uspořádání by mírně zmenšilo výrobu elektřiny na jeden panel – koeficient využití – a mírně navýšilo sezónní nevyváženost výroby.
[^fve-technologicky-rozvoj]: Nicméně i zde jsou určitá fyzikální omezení: efektivita běžných "single junction" panelů nemůže překročit 31 % (tzv. [Shockley–Queisser limit](https://en.wikipedia.org/wiki/Shockley%E2%80%93Queisser_limit)). ["Multi-junction" panely](https://en.wikipedia.org/wiki/Multi-junction_solar_cell) jsou zatím doménou výzkumných laboratoří a speciálních aplikací, například v letectví a kosmonautice.
[^fve-agrivoltaika]: Možnosti agrivoltaiky popisuje [článek](https://www.nrel.gov/news/program/2022/growing-plants-power-and-partnerships.html) americké výzkumné organizace NREL.
[^fve-strechy]: Menší instalace na střechách jsou ovšem v přepočtu výrazně dražší než velké solární parky. Např. společnost Lazard ve svých [analýzách](https://www.lazard.com/research-insights/2023-levelized-cost-of-energyplus/) odhaduje, že malé instalace jsou 2–5× dražší.
[^fve-versus-uhli]: Územní stopu odhaduje Calla ve svém sborníku [Ekologická obnova území narušených těžbou nerostných surovin a průmyslovými deponiemi](http://www.calla.cz/piskovny/wordpress/wp-content/uploads/sbornik_internet.pdf) (strana 15). Většina této plochy připadá na  těžbu hnědého uhlí, kterého se v posledních letech ročně vytěžilo něco přes 100 TWh. Téměř vše směřovalo do elektráren a tepláren, kde se z něj vyrobilo asi 28 TWh elektřiny.

[^biomasa-miscanthus]: Ozdobnice obrovská (_miscanthus giganteus_) má vyšší energetické výnosy na hektar mimo jiné díky fotosyntéze typu C4. Její pěstování není zatím u nás rozšířeno a podle [Lewandowského a spol.](https://dspace.library.uu.nl/bitstream/handle/1874/21677/NWS-E-2006-41.pdf?sequence=1) se kvůli prvotním nákladům vyplatí méně než pěstování rychle rostoucí dřevin. Například ale v Anglii se podle [statistik](https://www.gov.uk/government/statistics/area-of-crops-grown-for-bioenergy-in-england-and-the-uk-2008-2020/section-2-plant-biomass-miscanthus-short-rotation-coppice-and-straw) ozdobnice pěstuje na výrazně větších plochách než rychle rostoucí dřeviny.
[^biomasa-kogenerace]: Například konverze jednotky bioenergie na 25 % elektřiny a 60 % tepla lze počítat jako ekvivalent 40 % elektřiny, z čehož 15 % je použito v tepelném čerpadle s topným faktorem 4.
[^biomasa-uspora-emise]: Konkrétně musí využití biomasy v dopravě ušetřit v nejnovějších zařízení alespoň 65 % emisí, využití biomasy k výrobě elektřiny a tepla pak musí ušetřit (od roku 2026) alespoň 80 % emisí. Do emisí z využití biomasy se počítá její pěstování, doprava a zpracování, stejně jako emise související se změnou obsahu uhlíku v půdě, příp. zachycení emisí v elektrárnách a teplárnách pomocí CCS.
[^biomasa-ochrana-lesu]: Z vysoce druhově pestrých lesů není možné biomasu využívat vůbec.
