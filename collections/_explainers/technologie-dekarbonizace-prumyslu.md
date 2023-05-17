---
layout:      explainer
title:       "Jaké jsou technologie dekarbonizace průmyslu?"
slug:        "technologie-dekarbonizace-prumyslu"
published:   2023-5-10
authors:
  - id: "adam-bilek"
  - ids: ["jirka-lnenicka"]
    minor-role: "editace"
weight:      74
tags-scopes: [  ]
tags-topics: [  ]
cover-source-author:        "Anton Eprev"
cover-source-text:          "Unsplash"
cover-source-license:       "Unsplash License"
cover-source-license-url:   "https://unsplash.com/license"
cover-source-url:           "https://unsplash.com/photos/SQEo2zSXB04"
perex:       "Průmysl výrazně přispívá ke změně klimatu tím, že vypouští velké množství skleníkových plynů. Zároveň jde o oblast lidské činnosti, jejíž dekarbonizace je velmi obtížná. V tomto textu přinášíme přehled hlavních možností, jak lze snížit emise v důležitých výrobních sektorech a popisujeme očekávaný vývoj potřebných technologií a potenciální problémy, které bude potřeba řešit."
---
## Úvod

Při dekarbonizaci průmyslu potřebujeme **jednak nahradit zdroje tepelné energie** využívané při výrobě, **jednak snížit emisní náročnost výrobních procesů**, což jsou často chemické reakce. Důležité bude také **zachytávat emise CO<sub>2</sub>**, které snížit nedovedeme (obvykle proto, že jinou technologii výroby nemáme k dispozici).

K celkové obtížnosti transformace tohoto sektoru přispívají také **ekonomické aspekty a potřeba vybudovat či upravit rozsáhlou infrastrukturu**, bez které se zavádění nových paliv a technologií neobejde.

## Jak můžeme průmysl dekarbonizovat?

Pro celý sektor existují tři **hlavní metody**:

- zachytávání CO<sub>2</sub>
- využití vodíku s nízkou uhlíkovou stopou
- elektrifikace

V omezené míře nám se snížením emisí mohou pomoci také tyto **doplňkové metody**:

- recyklace
- využití odpadů a biomasy jako paliv
- náhrada používaných surovin či výsledného produktu šetrnější alternativou
- zvyšování efektivity a různé úspory

## Hlavní metody

### Zachytávání CO<sub>2</sub> (CCS)

Proces zachytávání CO<sub>2</sub> se označuje zkratkou CCS (_Carbon Capture and Storage_). Zachycené CO<sub>2</sub> je následně přepraveno a uloženo v geologických strukturách, například do vytěžených ložisek zemního plynu a ropy či do hluboce uložených geologických vrstev obsahujících slanou vodu. Teoreticky je možné zachycené CO<sub>2</sub> i průmyslově využít, do budoucna se však očekává, že většina bude uložena.[^ulozeni]

Tato technologie se pro využití v dekarbonizaci průmyslu hodí zejména v případech, kdy **chemické reakce**, při nichž vzniká CO<sub>2</sub>, **neumíme přímo nahradit** či **nedokážeme výrazně snížit** jejich emisní náročnost. Příkladem může být proces kalcinace při výrobě cementu, kdy se uhličitan vápenatý (CaCO<sub>3</sub>) mění na oxid vápenatý (CaO) a uvolňuje se oxid uhličitý (CO<sub>2</sub>). Bez tohoto chemického procesu se zatím výroba cementu neobejde, nezbývá tedy než uvolněný oxid uhličitý zachytit.

Projekty zachytávání CO<sub>2</sub> často cílí na **zachycení 90 % emisí CO<sub>2</sub>** daného průmyslového provozu (čím blíže jsme 100% zachycení, tím více se proces zdražuje a komplikuje[^zachyceni]). V praxi jsou už otestovány různé způsoby zachytávání oxidu uhličitého, v dnešní době však **nejsou v průmyslu příliš běžné**. Většímu využití brání především poměrně **vysoké finanční náklady** na instalaci a provoz zařízení. K tomu se přidává skutečnost, že zatím není vybudována dostatečně **rozsáhlá infrastruktura**, jež by umožnila následný transport a uložení či zpracování CO<sub>2</sub>. Do budoucna tak musí zejména být připravena podzemní úložiště pro zachycené CO<sub>2</sub>.

Přesto se CCS u mnoha výrobních procesů v průmyslu do budoucna jeví jako **možné a efektivní řešení**, které má **potenciál využití ve velkém měřítku**.

### Zelený vodík

**Může nahradit fosilní paliva**, která se v průmyslu spalují kvůli dodání tepla. Vhodný je zejména v situacích, kdy je nutné dosáhnout velmi vysokých teplot (např. při výrobě oceli je to okolo 1500 °C[^1500]). Zároveň může v některých případech sloužit jako **náhrada vstupních surovin**, které se používají při chemických reakcích během průmyslových procesů – tak je tomu například při výrobě amoniaku.

Lze proto očekávat, že zelený vodík bude při dekarbonizaci průmyslu hrát klíčovou roli. Míra jeho využití bude nicméně značně závislá na vývoji jeho ceny, dnes je cena zeleného vodíku příliš vysoká. Důležité je obzvláště srovnání s cenou fosilních paliv, které může nahrazovat.

Momentálně se celosvětově **95 % vodíku pro průmyslové využití vyrábí ze zemního plynu**,[^plyn] takže o jeho nízké emisní intenzitě nemůže zatím být řeč. Tato situace se ovšem může změnit – jestliže se vodík začne ve velkém vyrábět pomocí obnovitelné elektřiny. V tom případě mluvíme o **zeleném vodíku, který je považován za jednu z hlavních metod dekarbonizace průmyslu**.

{% capture vodik %}

Vyrobený vodík rozlišujeme podle jeho původu, resp. emisní náročnosti produkce, a označujeme jej různými "barvami". Z hlediska možného využití jsou nejdůležitější tyto čtyři:

- **Zelený** – produkován štěpením vody pomocí elektrolýzy, veškerá potřebná energie pochází z obnovitelných zdrojů
- **Růžový** – získáván elektrolýzou za pomoci elektřiny a tepla z jaderných elektráren
- **Modrý** – vyráběn ze zemního plynu, ale emise z tohoto procesu jsou zachyceny a následně uloženy či využity
- **Šedý** – produkován ze zemního plynu bez zachytávání CO<sub>2</sub> (v současnosti zatím zdaleka nejběžnější způsob výroby)

{% endcapture %}

{% include expander-figure.html
    name="vodik"
    expanded=false
    class="contrast-figure "
    label="Kontext: Barvy a původ vodíku"
    content=vodik
%}

Dále bude nutné vybudovat infrastrukturu potřebnou k přepravě – ta je kvůli fyzikálním vlastnostem vodíku výrazně složitější než například u zemního plynu. Kvůli nízké objemové hustotě energie zabírá vodík poměrně velký objem, což komplikuje proces stlačení. Dále je nezbytné vybudovat také speciální infrastrukturu, která minimalizuje riziko úniku plynu. Pokud bychom chtěli vodík zkapalnit, museli bychom jej zchladit na -253 °C[^253] (teplota potřebná pro zkapalnění zemního plynu je -161,5 °C[^161]).

#### Můžeme očekávat, že se CCS a vodík v budoucnu významně rozšíří?

Zachytávání CO<sub>2</sub> i využití vodíku jsou momentálně drahá řešení, která nejsou zdaleka tak rozšířená, jak bychom pro dekarbonizaci průmyslu potřebovali. To se do budoucna může změnit s tím, jak se tyto technologie budou dále vyvíjet, **náklady na jejich používání budou klesat** a zároveň poroste související trh. Ke zlevnění by mělo přispět také postupné **dosažení úspor z rozsahu**, tedy snížením nákladů na vyrobený produkt prostřednictvím zvýšení objemu produkce společně se získáním více zkušeností s výstavbou a provozem potřebných zařízení. (Podobný vývoj byl v posledních dvou desetiletích vidět například u obnovitelných zdrojů energie.)

Pokud dojde ke zlevnění a vybudování související infrastruktury, **půjde o výraznou pomoc v našich snahách dekarbonizovat průmysl**. Na druhou stranu musíme počítat i s rizikem, že tato infrastruktura nebude vznikat dostatečně rychle nebo že úspory z rozsahu budou omezené a vodík i CCS zůstanou ekonomicky nedostupnými.

### Elektrifikace

Spalování v průmyslu lze částečně nahradit i využitím elektřiny – k **dodání potřebného tepla**. Toto řešení je nicméně vhodné spíše u nižších teplot, například v papírenském průmyslu, kde se potřebné teploty pohybují v rozmezí 50–250 °C.[^250]

V některých odvětvích jsou ovšem při výrobě nutné tak vysoké teploty, že je zde elektrifikace technicky velmi složitá a zároveň značně neekonomická. Typickým příkladem je cement, při jehož produkci je zapotřebí dosáhnout teplot v rozmezí 1300–1450 °C.[^1450] V takových případech je ke zvážení varianta v podobě hybridního zařízení, které pro dosažení potřebné teploty využívá elektřinu a (například) zemní plyn. Takovéto hybridní pece najdou uplatnění třeba ve sklářském průmyslu.[^hybrid]

**U elektřiny zároveň záleží na její emisní intenzitě**. Pokud je vyrobená z fosilních paliv, nemusí náhrada těchto paliv v rámci spalování v průmyslu vycházet emisně lépe. Dojde-li naopak k rozvoji nízkoemisních zdrojů elektřiny, bude tento problém vyřešen a **elektrifikace může ke snižování průmyslových emisí významně přispět**.

## Doplňkové metody

Mezi ně patří: recyklace, využívání biomasy a odpadů k vytápění, různé náhrady surovin či využívání alternativních produktů a také úspory díky zvyšující se efektivitě.

Vědecký a technologický pokrok může do určité míry v rámci dekarbonizace průmyslu rovněž pomoci – je například možné, že budou objeveny nové, efektivnější technologie či postupy. Nicméně spoléhat na to příliš nemůžeme. U průmyslových odvětví, kde je dekarbonizace největším oříškem, probíhá takový výzkum a vývoj už mnoho let. Nové technologie a postupy tak budou mít spíše podobu **drobných zlepšení**, pravděpodobnost radikálních změn není velká.

### Recyklace

V mnoha průmyslových odvětvích v současnosti už využíváme relativně vysokou míru recyklace, alespoň v rozvinutých zemích. Například u hliníku dosahuje v EU recyklace 76,3 %.[^76] Takže i když v některých odvětvích ještě určité snížení emisí díky recyklaci možné je, prostor pro další výrazný posun v tomto směru je často už omezený. Navíc recyklaci mnohdy paradoxně limituje také dlouhá životnost některých produktů (platí třeba u výrobků z oceli).

Kromě toho recyklovaný materiál může být náročnější na zpracování nebo má omezenou využitelnost, někde se tedy jeho sběr a znovupoužití zatím ekonomicky nevyplácí.

### Využití odpadů a biomasy jako paliv

**Dnes už funguje mnoho podniků, které odpady nebo biomasu zčásti využívají**, ani zde tedy často nebývá prostoru ke zlepšení mnoho. V konkrétních případech některých provozů (např. u cementáren) může být takový postup výhodný ekonomicky i pro přírodu, ale zdaleka jej nelze uplatnit všude. Jednak to není technicky možné a jednak by při opravdu velkém přechodu brzy došlo k problému s **nedostatkem vhodného odpadu i environmentálně udržitelné biomasy**. Ve spalovaném odpadu (v podobě tzv. _tuhých alternativních paliv_) je navíc velká část uhlíku fosilního původu, takže jeho využití nepřináší významné snížení emisí.[^tap] Ani spalování biomasy nemusí mít tak nízkou uhlíkovou stopu, jak se často prezentuje.[^biomasa]

### Náhrada surovin či produktu šetrnější alternativou

O nahrazování jednotlivých částí výrobního řetězce můžeme uvažovat zejména ve dvou rovinách:

- **Substituce vstupních surovin, z nichž vyrábíme.** Plasty nemusí být z ropných produktů, ale z biomasy; slínek (důležitý meziprodukt při výrobě cementu) lze zčásti nahradit odpadními materiály z jiných odvětví a podobně.
- **Použití alternativy za výsledný produkt.** Místo betonu a oceli lze ve stavebnictví více využívat dřevo, plastové obaly můžeme leckde nahradit skleněnými nebo papírovými.

Nahrazování primárních zdrojů je považováno za součást potenciálních řešení, pomůže nám ale jen s relativně malým procentem emisí nebo při ní narážíme na další problémy (např. jiné vlastnosti hotového výrobku). **Ve většině případů se alternativy základní vstupní suroviny nebo jiný katalyzátor reakce hledají jen velmi obtížně.** Třeba cement, jak jej známe dnes, nelze vyrobit bez vápence.

**Pokud uvažujeme o alternativě výsledného produktu** (typicky za plasty), tak případnou **náhražkou často bývá pouze produkt z jiného průmyslového sektoru, který je také  potřeba dekarbonizovat**. U nahrazování přírodními alternativami (ať už jde o surovinu nebo produkt) je opět nutné vzít v úvahu, že kvalitního dřeva, biomasy apod. nemáme a nebudeme mít k dispozici neomezené množství.

### Zvyšování efektivity a provozní úspory

Z hlediska zvyšování efektivity a maximálních provozních úspor už mnoho průmyslových odvětví došlo daleko. Každý další krok ke zvýšení efektivity tak znamená mnohem menší zlepšení než dříve. V minulosti nebyla snaha o optimalizaci postupů v průmyslu motivovaná snahou dekarbonizovat, často šlo spíše o úspory z ekonomických důvodů. Přesto stále určitý prostor pro další optimalizaci v průmyslu existuje, zejména v globálním měřítku, kde často narážíme na rozdíly například mezi průmyslem v západní Evropě a Číně.

## Pomohlo by, kdybychom snížili svou spotřebu?

V souvislosti s dekarbonizací a transformaci průmyslu se často objevují také otázky ohledně celkového snižování spotřeby. Vzhledem ke stále rostoucí a urbanizující se populaci a fungování ekonomického systému, který je založen na ekonomickém růstu[^nerust], jsou **rozsáhlejší úspory ve spotřebě v nejbližších dekádách nepravděpodobné**. Naopak **v klíčových průmyslových odvětvích očekáváme zvýšení globální poptávky** až o desítky procent (platí například pro ocel, cement, hliník či amoniak).[^poptavka]

Dále lze v souvislosti s dekarbonizací průmyslu uvažovat o **zavedení principů [cirkulární ekonomiky](https://incien.org/wp-content/uploads/2022/10/incien_study_CZ_DIGI.pdf)**. Zatímco v tradičním lineárním modelu se produkt vyrobí, použije a nakonec vyhodí jako odpad, v cirkulární ekonomice jde o to pracovat se zdroji a materiály co nejefektivněji a co nejvíce je recyklovat a znovu využívat. Nejde tedy jen o zlepšení procesu recyklace, které rozebíráme výše. Je zde také snaha navrhnout produkt tak, aby bylo možné jej používat opakovaně, případně zavést systémy umožňující sdílené využívání produktů, například sdílením aut či kol, které přispívají k tomu, že se vyrábí méně. Jinými slovy: **cílem cirkulární ekonomiky je minimalizovat odpad, snížit tlak na omezené zdroje a vytvořit udržitelnější a odolnější ekonomiku**. Tento přístup postupně získává na popularitě, mimo jiné díky tomu, že umožňuje snížit náklady na zdroje a energii, redukovat emise skleníkových plynů a má řadu ekonomických i sociálních přínosů. Jeho hlavní uplatnění je ovšem spíše v segmentu koncových produktů (například u oblečení, osobních automobilů nebo ve stavebnictví) – daleko těžší je zavést tyto principy přímo u výroby základních průmyslových surovin, například při výrobě oceli (která je navíc emisně mnohem náročnější). Koncept cirkulární ekonomiky tedy může pomoct snižovat poptávku po základních průmyslových surovinách, ale nelze na něj u dekarbonizace průmyslu zásadně spoléhat.

## Jaké tržní a regulační nástroje mohou dekarbonizaci podpořit?

Dekarbonizaci průmyslu by pomohly také **ekonomické pobídky, systematická podpora a vytvoření vhodného legislativního prostředí**. V Evropské unii to může být Průmyslový plán Zelené dohody, v USA Inflation Reduction Act – oba podporují dekarbonizaci průmyslu například prostřednictvím finančních pobídek pro CCS či vodík.

V EU je rovněž v plánu používat **mechanismus uhlíkového vyrovnání na hranicích (CBAM)**, tedy v podstatě uhlíkové clo. Proč bude potřeba jej zavést? Dekarbonizace průmyslu je nákladný proces, který mnohdy povede ke zdražení výsledného produktu. Hrozí tak, že evropské firmy, které se transformovaly dřív než firmy jinde ve světě, by najednou nebyly konkurenceschopné. Navíc musí ještě pokrýt své emise povolenkami v rámci systému EU ETS. V rámci uhlíkového vyrovnání je proto vypočítána uhlíková intenzita daného produktu a dovozce zboží vyrobeného mimo EU si bude muset zakoupit certifikát, aby dorovnal cenu a ta tak byla srovnatelná s cenou produktu vyrobeného v Unii.

Dále existuje koncept takzvaných **advance market commitments** (předběžné tržní závazky), tedy závazek určité firmy, že do budoucna koupí konkrétní produkty spojené s dekarbonizací. Například do nějakého roku zaplatí za kredity spojené s odstraněním CO<sub>2</sub> z atmosféry nebo se zaváže k zakoupení nízkoemisního průmyslového produktu (třeba "zelené" oceli). Protože vývoj těchto technologií je velmi drahý a zpočátku nekonkurenceschopný, dává systém předběžných tržních závazků firmám, které tyto nové technologie vyvíjejí, větší záruku – vědí už, že mají do budoucna zajištěné nějaké odběratele.

## Závěr

Z předchozích kapitol plyne, že i když jde o obtížný proces, průmysl dekarbonizovat lze.

Hlavními technologiemi dekarbonizace jsou CCS a vodík, bude ovšem nutné je výrazně rozšířit a vybudovat pro ně nutnou infrastrukturu, aby byly cenově dostupnější. Klíčová je také elektrifikace průmyslu, která ovšem závisí i na dekarbonizaci samotné výroby elektřiny.
Mezi doplňkové nástroje patří zvyšování efektivity, recyklace, využití odpadů a biomasy v rámci spalování a různé formy nahrazování.

Protože nelze čekat výrazný pokles poptávky po základních typech průmyslového zboží a průmysl je zároveň výrazným zdrojem emisí, o to více je nutné podpořit právě dekarbonizaci průmyslu. Musí vznikat ambiciózní legislativa a na ni navázaná výrazná finanční podpora, dále je třeba zajistit konkurenceschopnost transformujících se průmyslů a v neposlední řadě je důležité, aby jednotlivá odvětví průmyslu v rámci dekarbonizace více spolupracovala, například prostřednictvím sdílení infrastruktury.

## Zdroje a poznámky

[^ulozeni]: [Očekává se](https://iea.blob.core.windows.net/assets/deebef5d-0c34-4539-9d0c-10b13d840027/NetZeroby2050-ARoadmapfortheGlobalEnergySector_CORR.pdf), že 95 % zachyceného CO<sub>2</sub> bude uloženo pod zem a zbylých 5 % by bylo využito na výrobu syntetických paliv. U využití zachyceného uhlíku je drobný háček: pokud vyrobíme syntetická paliva ze zachyceného uhlíku původem z fosilních paliv, tento uhlík se zase brzy uvolní do atmosféry při spálení těchto syntetických paliv. Proto je důležité zachycovat uhlík také z biomasy, abychom mohli dosáhnout neutrální emisní bilance.
[^zachyceni]: Je jednodušší zachytávat CO<sub>2</sub> při vyšších koncentracích a tudíž po odstranění většiny molekul [se proces stává obtížnějším](https://climate.mit.edu/ask-mit/how-efficient-carbon-capture-and-storage).
[^1500]: [1500 °C dosahuje tekuté železo poté co opustí pec](https://www.eurofer.eu/about-steel/learn-about-steel/what-is-steel-and-how-is-steel-made/).
[^plyn]:  [Jedná se o proces kdy metan reaguje s vodní párou](https://www.energy.gov/eere/fuelcells/hydrogen-fuel-basics). Při této reakci se uvolňuje CO<sub>2</sub> podobně jako při spalování metanu.
[^253]: Tento proces je [výrazně energeticky a finančně náročný](https://www.energy.gov/eere/fuelcells/liquid-hydrogen-delivery).
[^161]: Objem zkapalněného zemního plynu zaujímá přibližně [1/600](https://portal.ct.gov/PURA/Gas-Pipeline-Safety/What-is-LNG) objemu zemního plynu v klasické plynné formě.
[^250]: [75 % potřebné energie](https://www.researchgate.net/figure/Processes-with-corresponding-temperatures-and-media-required-in-a-paper-industry_tbl2_285782158) je využito právě na spalování aby bylo dosaženo potřebných teplot.
[^1450]: Takto vysoké teploty jsou nutné pro [tvorbu slínku](https://www.ametek-land.com/-/media/ameteklandinstruments/documentation/industries/cementlime/ametek_land_application_note_temperature_measurement_in_cement_manufacturing_rev1.pdf).
[^hybrid]: Nejnovější pece ve vývoji [používají 80 % elektřiny a 20 % zemního plynu](https://www.britglass.org.uk/sites/default/files/British%20Glass%20-%20Net%20Zero%20Strategy.pdf)
[^76]: Jedná se například o [recyklaci plechovek, ale i průmyslově využitého hliníku](https://www.csis.org/analysis/decarbonizing-aluminum-rolling-out-more-sustainable-sector).
[^tap]: Kromě cementářství je o tuhá alternativní paliva [dnes v Česku zájem](https://www.ekonews.cz/z-odpadu-je-zadane-palivo-pere-se-o-nej-kdekdo-zajem-maji-i-teplarny-a-elektrarny/) i ze strany tepláren a elektráren.
[^biomasa]: Jedním z problémů při rozsáhlém získávání biomasy může být [vyčerpávání půdních zásob uhlíku či organického humusu](https://www.mdpi.com/1996-1073/15/24/9619).
[^nerust]: Lze tak zaznamenat kritické hlasy [nerůstového hnutí](https://cs.wikipedia.org/wiki/Ner%C5%AFst) poukazující na obtížnost či rovnou nemožnost zkombinovat ekonomický růst s výrazným poklesem spotřeby, což vyvolává potřebu hledat nový ekonomický model. Oproti tomu Zelená dohoda pro Evropu (Green Deal) je založena na myšlence environmentálního a ekonomického [*decouplingu*](https://www.europarl.europa.eu/RegData/etudes/ATAG/2020/651916/EPRS_ATA(2020)651916_EN.pdf), tedy zanechání ekonomického růstu jako cíle s vidinou jeho oddělení od růstu spotřeby prostřednictvím zvyšování efektivity či zavádění nových technologií.
[^poptavka]: Největší růst se může týkat [Číny, Indie, Jihovýchodní Asie a Afriky](https://www3.weforum.org/docs/WEF_NetZero_Industry_Tracker_2022_Edition.pdf).
