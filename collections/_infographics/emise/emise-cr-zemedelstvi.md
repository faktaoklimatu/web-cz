---
layout:         infographic
title:          "Emise skleníkových plynů ze zemědělství v ČR"
slug:           "emise-cr-zemedelstvi"
redirect_from:  "/emise-cr-zemedelstvi"
published:      2024-07-12
weight:         51
tags-scopes:    [ cr ]
tags-topics:    [ emise ]
caption:        "Podíl zemědělství (včetně spalování fosilních paliv v tomto sektoru) na celkových emisích skleníkových plynů Česka v roce 2022 byl 8,2 %."
dataset:        "emise-cr"
---

## Které skleníkové plyny v zemědělství vznikají?

Na rozdíl od jiných sektorů, kde většina emisí skleníkových plynů připadá na oxid uhličitý (jako například v [průmyslu](https://faktaoklimatu.cz/infografiky/emise-cr-prumysl?q=prumys)), vznikají v zemědělství převážně jiné skleníkové plyny. Při přepočtu na CO<sub>2</sub>eq mají největší podíl emise metanu (42 %) a emise oxidu dusného (42 %). Podíl emisí oxidu uhličitého je v zemědělství 16 % (a kdybychom do celkových emisí ze zemědělství nezapočítávali emise ze spalování fosilních paliv, byl by podíl emisí CO<sub>2</sub> pouze 4 %).


{% include expander-figure.html
    name="slozky-organick0-hmoty"
    class="contrast-figure"
    label="Kontext: Proč se používá přepočet na CO<sub>2</sub>eq"
    content="
Z hlediska oteplování atmosféry se různé skleníkové plyny od sebe liší svým účinkem – některé jsou výrazně „silnější“ než jiné. Aby bylo možné je mezi sebou porovnávat, používá se přepočet na CO<sub>2</sub>eq. Ten říká, jaké množství CO<sub>2</sub> by mělo stejný (ekvivalentní) účinek z hlediska skleníkového efektu jako určité množství jiného skleníkového plynu za nějakou standardizovanou dobu (typicky 100 let). Vzorec pro výpočet CO<sub>2</sub>eq je *množství skleníkového plynu* × *GWP koeficient* (global warming potential, tedy potenciál globálního oteplování). Například GWP koeficient pro metan má hodnotu 28 ([IPCC](https://www.ipcc.ch/site/assets/uploads/2018/02/WG1AR5_Chapter08_FINAL.pdf), str. 714), což je možné s určitým zjednodušením chápat tak, že metan je 28× silnější skleníkový plyn než oxid uhličitý, resp. 1 tuna tohoto plynu má podobný účinek jako 28 tun CO<sub>2</sub>. GWP koeficient pro oxid dusný je 265, tedy ještě téměř desetkrát vyšší než GWP koeficient metanu.
"
%}

### Metan
Emise metanu (CH<sub>4</sub>) vznikají v zemědělství převážně při procesu **enterické fermentace** (91 % emisí metanu), tedy během trávení přežvýkavců (krávy, kozy, ovce). V komplikovaném žaludku přežvýkavců, složeném ze čtyř propojených částí, žijí bakterie, které kvašením (fermentací) pomáhají rozkládat potravu na jednodušší látky. Při tomto procesu vzniká metan, který pak zvířata říhají a vydechují[^entericka-fermentace]. Naprostá většina emisí tohoto skleníkového plynu v zemědělství je spojena s chovem hovězího dobytka, trávení ostatních zvířat (ovce, kozy, prasata) se na těchto emisích podílí jen minimálně.

Množství vyprodukovaného metanu závisí hlavně na počtu zvířat. Nicméně důležitým faktorem je také to, kolik potravy zvíře přijme a jak se k ní dostane (pokud se kráva pohybuje v prostoru chléva, spotřebuje na získávání potravy méně energie, a potřebuje tedy i méně potravy ve srovnání s krávou, která se pohybuje po pastvině a hledá potravu, vodu a přístřešek).[^animal-welfare] [^dalsi-faktory]

Dalším zdrojem metanu v zemědělství je také **hnůj** vznikající z odpadu vyprodukovaného chovanými zvířaty. V tomto případě vzniká metan činností bakterií, které rozkládají organickou hmotu bez přístupu kyslíku. Tyto emise představují přibližně 9 % celkových emisí metanu ze zemědělství. 

{% include preview-box.html
    title="Jaké jsou emise skleníkových plynů z průmyslu v ČR?"
    text="Obdobnou [infografiku](/infografiky/emise-cr-prumysl) jsme vytvořili i pro emise z průmyslu v ČR."
    slug="emise-cr-prumysl"
%}

### Oxid dusný
Hlavním zdrojem emisí oxidu dusného (N<sub>2</sub>O) jsou **zemědělské půdy**, respektive způsob jejich obhospodařování. Množství emisí závisí například na množství a formě dodávaných hnojiv nebo na způsobu orby (zda a jak se půda oře). Látky (organické i syntetické), které se dostávají do půdy, jsou rozkládány bakteriemi. Organickou hmotu a složitější látky přeměňují na jednodušší sloučeniny využitelné pro rostliny – jedním z produktů těchto procesů je však i oxid dusný. Konkrétně jsou zdroji těchto emisí:
- Syntetická (60 %) a organická hnojiva (5 %) aplikovaná na půdu
- Zbytky rostlin ponechané na poli (12 %)[^zbytky-rostlin]
- Moč a výkaly pasoucích se zvířat (2 %)
- Rozkládající se organická hmota v půdě[^org-hmota] [^procenta-vysvetleni]

Z těchto zdrojů se emise (N<sub>2</sub>O) uvolňují buď přímo, nebo nepřímo[^prime-neprime].
{% include expander-figure.html
    name="slozky-organick0-hmoty"
    class="contrast-figure"
    label="Kontext: Přímé a nepřímé emise"
    content="
**Přímé emise**: Z uvedených zdrojů se dusíkaté sloučeniny (např. amoniak – NH<sub>3</sub>) uvolňují do půdy, kde v důsledku aktivity půdních bakterií procházejí různými chemickými procesy (tzv. nitrifikační a denitrifikační procesy), při kterých vzniká také oxid dusný.  
**Nepřímé emise**: Dusíkaté sloučeniny se z půdy uvolňují do ovzduší nebo pronikají do povrchových či podzemních vod (vyplavování). Z ovzduší dopadají zpět na půdu (atmosférický spad) nebo se dostávají do povrchových vod a teprve pak se proměňují na oxid dusný a znovu se uvolňují do atmosféry. 
"
%}


Zdrojem emisí oxidu dusného je také **hnůj** – N<sub>2</sub>O se uvolňuje při nitrifikačních a denitrifikačních procesech. Mezi faktory, které množství těchto emisí ovlivňují, patří např. forma hnoje (např. kejda nebo mrva) či způsob jeho uskladnění (např. v tekuté kejdě vzniká více emisí než v sušší mrvě). Hnůj je rovněž zdrojem nepřímých emisí oxidu dusného: dusík se z hnoje uvolňuje např. ve formě amoniaku, který se v plynném nebo kapalném skupenství dostává do půdy nebo povrchových vod. Zde opět probíhají chemické procesy, jejichž výsledkem jsou emise N<sub>2</sub>O.

### Oxid uhličitý
Emise CO<sub>2</sub> představují 16 % celkových emisí ze zemědělství. Malé množství těchto emisí vzniká při vápnění půd a při aplikaci močoviny, výrazně větší podíl na emisích CO<sub>2</sub> v zemědělství má spalování fosilních paliv. **Vápnění** slouží ke snižování kyselosti zemědělských půd – používá se vápenec nebo dolomit, oba se však postupně rozkládají (mimo jiné) na vodu a oxid uhličitý. **Močovina** se aplikuje na pole jako průmyslově vyráběné dusíkaté hnojivo. V půdě se však rozkládá na amoniak a oxid uhličitý. Emise ze **spalování fosilních paliv** vznikají například při využívání traktorů nebo kombajnů na orbu, hnojení, sklizeň, sečení a podobně. 

## Zdroje a poznámky

[^entericka-fermentace]: Enterická fermentace probíhá pouze u býložravců. Ti tento proces potřebují k tomu, aby byli schopni z poměrně málo výživné potravy (ve srovnání s potravou masožravců nebo všežravců) získat co nejvíce energie. U přežvýkavců (např. kráva, koza, ovce, jelen) se potrava posouvá tam a zpět, u býložravců s jednoduchým žaludkem jde o tzv. fermentaci zadního střeva, tedy fermentační procesy se neodehrávají v žaludku, ale až ve střevě.
[^prime-neprime]: Dělení emisí na přímé a nepřímé v tomto případě vychází z kategorií, které při výpočtu emisí používá [IPCC](https://www.ipcc-nggip.iges.or.jp/public/gp/bgp/4_6_Indirect_N2O_Agriculture.pdf) a také [ČHMÚ](https://www.chmi.cz/files/portal/docs/uoco/oez/nis/NIR/CZE_NID-2024-2022_main_text_UNFCCC.pdf). Nesouvisí s dělením emisí dle Scope 1, 2 a 3, které se používá v emisním účetnictví. 
[^procenta-vysvetleni]: Procenta v závorkách udávají podíl, jímž se každý ze zdrojů podílí na přímých emisích. Do celkových emisí se však započítávají také emise nepřímé – atmosférický spad nebo vyplavování (přibližně 22 % emisí N<sub>2</sub>O).
[^org-hmota]: Rozkladem organické hmoty se do atmosféry uvolňuje oxid uhličitý. Část uhlíku obsaženého v organické hmotě však zůstává "uzavřená" v humusu (organické hmotě v různém stádiu rozkladu). Vhodnými zemědělskými praktikami a osevními postupy je možné uhlík v půdě uchovávat (zamezovat rozkladu organické hmoty). Například v roce 2022 bylo více uhlíku z organické hmoty v půdě uchováno než uvolněno do atmosféry.
[^dalsi-faktory]: Mezi další faktory ovlivňující množství emisí patří rovněž např. velikost zvířete, množství vyprodukovaného mléka (pokud jde o dojnice) nebo obsah tuku v mléce.
[^animal-welfare]: V této souvislosti je ovšem třeba zmínit, že i když je chov na volné pastvině emisně náročnější, z hlediska welfare chovaných zvířat jde o mnohem vhodnější variantu.
[^zbytky-rostlin]: Při rozkladu zbytků rostlin ponechaných na poli se sice část uhlíku uvolňuje do atmosféry, zároveň je však tato organická hmota velmi důležitá např. pro půdní biodiverzitu a napomáhá vytváření vhodné půdní struktury.
