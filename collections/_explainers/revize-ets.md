---
layout:      explainer
title:       "Jak se změní evropské emisní povolenky po roce 2030"
slug:        "revize-ets"
published:   2026-10-15
authors:
  - id: "katerina-kolouchova"
  - name: "Štěpán Vizi"
    affiliation: "Centrum pro dopravu a energetiku"
  - name: "Heda Čepelová"
    affiliation: "Centrum pro dopravu a energetiku"
  - name: "Zuzana Gruberová"
    affiliation: "Centrum pro dopravu a energetiku"
    minor-role: "editace"
  - name: "Alžběta Jurčová"
    affiliation: "Centrum pro dopravu a energetiku"     
    minor-role: "editace"
  - id: "marcel-otruba"
    minor-role: "vizualizace"
extra-scripts:
- https://d3js.org/d3.v7.min.js
- /assets-local/js/revize-ets-strop.js
- /assets-local/js/revize-ets-svg.js
- /assets-local/js/revize-ets-sektory.js
- /assets-local/js/revize-ets-vynosy.js
- /assets-local/js/revize-ets-nabidka.js
- /assets-local/js/revize-ets-bezplatne.js
- /assets-local/js/chart-download.js
cover-source-author:        "Venti Views"
cover-source-text:          "Unsplash"
cover-source-license:       "Unsplash License"
cover-source-license-url:   "https://unsplash.com/license"
cover-source-url:           "https://unsplash.com/photos/aerial-view-of-blue-and-white-boat-on-body-of-water-during-daytime-FPKnAO-CF6M"
perex: |
    Evropská komise navrhla změny systému obchodování s emisemi (EU ETS). Většina z nich se projeví po roce 2030. Co se má změnit v tempu snižování emisí, rozšíření na další sektory, podpoře průmyslu nebo využívání mezinárodních kreditů a co tyto změny znamenají pro fungování ETS?
---

{% include preview-box.html
    title="Jak funguje zpoplatnění emisí v EU?"
    text="Koho se emisní povolenky v EU týkají a jak se systém postupně vyvíjí?"
    slug="emisni-povolenky-ets"
%}

**[Systém EU pro obchodování s emisemi](https://climate.ec.europa.eu/areas-action/carbon-markets/about-eu-ets_en)** (*Emission Trading System*, ETS) funguje od roku 2005. Zahrnuje **emisně nejnáročnější sektory ekonomiky: výrobu elektřiny a tepla, průmysl, leteckou a námořní dopravu**, které se podílí na přibližně 40 % unijních emisí.[^ets-rozsah] Za uplynulé dvě dekády poklesly emise skleníkových plynů v těchto sektorech **o 50 %** (zatímco v celé ekonomice EU klesly o 36 %[^lulucf]).

{% include includes-local/ets-timeline.html %}

## Co se má na fungování ETS změnit?

Podmínky fungování systému ETS po roce 2030 (v některých případech dříve) má upravit návrh [revize směrnice o emisním obchodování](https://ec.europa.eu/commission/presscorner/detail/cs/ip_26_1596), který Evropská komise představila v červenci 2026. Cílem navrhovaných změn je přizpůsobit systém novému klimatickému cíli EU, podle kterého mají emise do roku 2040 klesnout o 90 % oproti roku 1990. Návrh se přímo netýká systému ETS2 pro budovy a silniční dopravu, jehož plnohodnotné fungování je plánováno od roku 2028.[^ets2]

{% include includes-local/revize-ets-shrnuti.html %}

## Zpomalení tempa snižování emisí

Počet povolenek, které jsou uvolňovány na trh, se každoročně snižuje.

**Tempo snižování určuje tzv. lineární redukční faktor** (*Linear Reduction Factor*, LRF). Ten udává, o kolik povolenek se celkový strop každoročně sníží. Toto snížení je vyjádřeno relativně vůči průměrnému množství povolenek v letech 2008–2012. V současnosti platný LRF ve výši 4,3 % znamená každoroční snížení o přibližně 88 milionů povolenek. Podle návrhu Komise se má **LRF snížit a tempo snižování stropu zpomalit.** Zatímco do roku 2030 má být LRF 4,4 %, podle návrhu Komise by mezi lety 2031–2035 došlo k jeho poklesu na 3,7 % a po roce 2036 na 1,7 %.[^lrf-kredity] Namísto vyčerpání povolenek v roce 2040 **nově návrh počítá s jejich prodejem až do 40. let**.

{% include includes-local/revize-ets-strop.html %}

{% capture oko_graf %}{% include includes-local/revize-ets-nabidka.html %}{% endcapture %}

<div class="callout-commentary fok" markdown="1">

**Komentář Fakt o klimatu:**

Množství povolenek, které se budou podle aktuálního návrhu nově vydávat v letech 2031–2040, je v souladu s unijním emisním cílem pro rok 2040 a souvisejícím uhlíkovým rozpočtem (ve variantě 85% snížení emisí na území EU a 5 % skrze mezinárodní kredity). Kromě těchto cca 5,3 mld. povolenek se ale v tomto období může uplatnit podstatné množství již existujících povolenek, což by znamenalo vyšší emise a nenaplnění unijních cílů, jak ukazuje [analýza Öko-Institutu](https://www.oeko.de/publikation/assessing-the-2026-commission-proposal-for-the-eu-ets-1/). Jde jednak o přebytek povolenek vydražených v předchozích fázích, které zatím nikdo neuplatnil (cca 0,5 mld. povolenek), a dále o povolenky uložené v rezervě tržní stability (asi 1,2 mld. povolenek). Uvolnění velkého množství povolenek z rezervy tržní stability se těžko předvídá, protože závisí na budoucí situaci na trhu, ale rozhodně nelze vyloučit, že k němu v průběhu 30. nebo 40. let dojde. Pokud by tak emise v sektorech ETS1 byly výrazně vyšší, než odpovídá počtu nově vydaných povolenek, buď by došlo k nesplnění emisních cílů EU, nebo by tento rozdíl musely kompenzovat jiné sektory emisí. Je ale otázka, které – emise z dopravy se zatím snižovat nedaří a v zemědělství klesají velmi mírně.

{% include expander-figure.html
    name="oko-nabidka"
    expanded=false
    class="contrast-figure"
    label="Nabídka a poptávka povolenek ve fázi V podle Öko-Institutu"
    content=oko_graf
%}

</div>


## Rozšíření o další sektory

**ETS dnes pokrývá asi 40 % unijních emisí,** po revizi půjde o několik procentních bodů současných emisí více.[^ets2-podil]

Dojde-li k rozšíření ETS o další sektory, dojde k navýšení stropu odpovídajícímu množství emisí, které daný sektor produkuje.

{% include includes-local/revize-ets-sektory.html %}

## Využití mezinárodních kreditů

Návrh přichází **s možností využívat po roce 2036 ke kompenzaci domácích emisí mezinárodní kredity** – tedy snížení emisí mimo EU. S možností využít mezinárodní kredity pro dosažení 90% snížení emisí v EU v roce 2040 totiž počítá i Evropský klimatický zákon (a to až do výše 5 % emisí roku 1990). V praxi by to fungovalo tak, že výnosy z prodeje **260 milionů povolenek** využije Komise na nákup kreditů v objemu 260 Mt CO<sub>2</sub>, které poté rovnou vyřadí (a tedy s nimi nebude nijak dál obchodovat). Pokud by do roku 2036 nebyly dostupné kredity, které budou dostatečně kvalitní a důvěryhodné, došlo by k navýšení LRF z 1,7 % na 2,7 % (a tedy navýšení ambice pro domácí snižování emisí).

{% include includes-local/revize-ets-schema.html typ="kredity" %}

<div class="callout-commentary fok" markdown="1">

**Komentář Fakt o klimatu:**

Ačkoliv zavedení mezinárodních kreditů může podpořit mezinárodní spolupráci a mitigační projekty mimo EU, hlavní prioritou v rámci ETS by mělo zůstat snižování emisí na území Unie. Je klíčové, aby případné kredity skutečně odpovídaly dosaženému snížení emisí a aby toto snížení bylo měřitelné a kontrolovatelné. Také by měly podporovat mitigační projekty, ke kterým by jinak nedošlo (zásada adicionality).[^offsety] Pojistka v podobě vyššího LRF v případě nedostupnosti kvalitních kreditů je důležitým opatřením pro zachování avizované ambice ve snižování emisí skleníkových plynů.

</div>

<div class="callout-commentary cde" markdown="1">

**Komentář Centra pro dopravu a energetiku:**

Využití mezinárodních kreditů by znamenalo, že se Česko (případně ve spolupráci s jinými státy) nebo EU stane financujícím subjektem, který investuje potřebné zdroje na realizaci dekarbonizačních opatření mimo své území. Česko však potřebuje především pokrýt vlastní investiční mezeru související s dekarbonizací. Podle Ministerstva životního prostředí činí celková výše investičních potřeb nezbytných k dosažení klimatických cílů do roku 2030 přibližně 3,5 bilionu korun. Směřování investičních prostředků mimo EU, respektive mimo českou ekonomiku, tak zvyšuje riziko, že se tuzemská investiční mezera dále prohloubí, protože místní ekonomika bude v soutěži o investice čelit silné konkurenci řady dalších zemí. Proto by Česko v zásadě nemělo podporovat využití mezinárodních kreditů, dokud nebude zřejmé, že jejich využití zásadně neohrozí pokrytí vlastních investičních potřeb.

</div>

## Zahrnutí negativních emisí

Negativní emise (*Carbon Direct Removals*, CDRs) jsou ty, které jsou zachyceny a uloženy pomocí **technologie zachytávání a ukládání uhlíku** (*Carbon Capture and Storage*, CCS). Směrnice konkrétně hovoří především o BioCCS (zachytávání CO<sub>2</sub> při spalování biomasy) a DACCS (přímé zachytávání CO<sub>2</sub> ze vzduchu). Právě ty mají být podle návrhu revize nově zahrnuty do systému ETS. Má proto také dojít k postupnému navýšení stropu v součtu o **250 milionů povolenek**[^bioccs-podniky] během let 2031–2040, čímž dojde ke zvětšení prostoru pro produkci emisí. Výnosy z dražby těchto povolenek pak Komise použije na nákup certifikátů dokládajících odstranění emisí.[^crcf] [^cdr-pojistka]

{% include includes-local/revize-ets-schema.html typ="odstraneni" %}

<div class="callout-commentary fok" markdown="1">

**Komentář Fakt o klimatu:**

Ačkoliv negativní emise [hrají roli](https://icapcarbonaction.com/system/files/document/icap-thematic-brief_cdr-in-selected-etss_final.pdf) v několika mimounijních ETS systémech, zatím jde pouze o řešení využívající ukládání v přírodě (*nature-based solutions*), jako je zalesňování.[^ulozeni-v-prirode] Technologie jako BioCCS nebo DACCS jsou zatím spíše v pilotní fázi; v EU existují pouze [jednotky projektů](https://co2re.co/FacilityData) (další jsou v přípravě), a nejsou proto zatím komerčně škálovatelné. Je tak otázkou, zda v následujících letech dojde k potřebnému rozvoji trhu a zda bude vůbec možné zakoupit odstranění jedné tuny CO<sub>2</sub> za cenu emisní povolenky. Očekávaná cena odstraňování CO<sub>2</sub> vyvolává nejistotu, zda dojde k plánované emisní redukci a zda navýšení stropu bude dorovnáno odpovídajícím množstvím CDRs. Přílišné spoléhání na CCS technologie s sebou nese riziko oddalování dekarbonizace i v případech, kdy existují jiná řešení.

</div>

## Založení Průmyslové dekarbonizační banky

Průmyslová dekarbonizační banka (*Industrial Decarbonisation Bank*, IDB) má doplnit Inovační a Modernizační fond při **podpoře průmyslu v dekarbonizaci**.

Její **první fáze** by přitom začala fungovat už v letech 2028–2030 jako tzv. *Investment Booster*. Komise zamýšlí vybrat podniky, které investují do dekarbonizačních projektů, a mezi ně rozdělit 400 milionů povolenek podle principu *first in, first served* (ale při splnění stanovených kritérií[^kriteria]). Podpora jim bude vydána zpětně ve formě povolenek na základě ověřeného snížení emisí.

{% include includes-local/revize-ets-schema.html typ="idb" faze="1" %}

Ve **druhé fázi** (po roce 2031) pak banka uvolní do dražby dalších 400 milionů povolenek, přičemž výnosy budou sloužit mj. k financování *Carbon Contracts for Difference* (CCfDs).[^ccfd]

{% include includes-local/revize-ets-schema.html typ="idb" faze="2" %}

## Nová pravidla pro využití výnosů

Dosud musely členské státy využít veškeré výnosy z aukcí emisních povolenek na klimatická a dekarbonizační opatření.[^kompenzace] Podle návrhu revize by **nově** musely použít **nejméně 50 % výnosů přímo na dekarbonizaci sektorů spadajících pod ETS**.

Zbylé výnosy by pak státy mohly použít na další klimatická a dekarbonizační opatření,[^dalsi-opatreni] a to nově i ta, která nejsou explicitně uvedená ve směrnici.

100 % výnosů musí být využito v souladu s klimatickými cíli EU a **nesmí vést k prodlužování závislosti na fosilních palivech**. Návrh obsahuje také zlepšení transparentnosti ohledně využívání výnosů. Nová pravidla by vešla v platnost společně s novým zněním směrnice, tedy ještě před rokem 2030.

{% include includes-local/revize-ets-vynosy.html %}

<div class="callout-commentary cde" markdown="1">

**Komentář Centra pro dopravu a energetiku:**

Místo současné jasně dané povinnosti využít všechny výnosy na dekarbonizační opatření přináší návrh komplikovanější pravidla a zároveň dává státům volnější ruku při rozhodování o využití poloviny výnosů. Vzniká tak riziko, že část výnosů bude využita na opatření bez skutečného dopadu na snižování emisí. Mezi prioritními tématy nápadně chybí jakákoliv sociální opatření nebo podpora domácností, které lze financovat až ze zbývající neprioritní části výnosů. Jde přitom o klíčovou součást transformace. Je dobře, že návrh nově explicitně vylučuje investice, které by prodlužovaly závislost na fosilních palivech, je ale otázka, jak přesně se bude toto pravidlo uplatňovat.

Očekávaným důsledkem stanovení prioritních témat je, že více peněz poputuje do sektorů, které spadají pod systém ETS. Návrh zdůrazňuje zejména dekarbonizaci průmyslu. V této souvislosti je potřeba upozornit na to, že průmyslové podniky již dostávají významnou finanční podporu formou bezplatných povolenek (viz níže) a tato podpora má nadále pokračovat. Přínos bezplatných povolenek pro dekarbonizaci je přitom diskutabilní. Průmyslový podnik čerpající finance z výnosů tak bude dostávat rovnou dvojí podporu, což vyvolává otázky ohledně efektivity takového financování. Bude proto klíčové nastavit a vymáhat pravidla tak, aby podpora průmyslu měla skutečný dekarbonizační dopad.

</div>

### Modernizační fond

Revize EU ETS v první řadě potvrzuje, že **Modernizační fond bude pokračovat i po roce 2030**.

Tento nástroj cílí na méně bohaté evropské státy včetně Česka a umožňuje financovat dekarbonizační projekty v průmyslu a dopravě, nebo například renovace budov či modernizaci dálkového vytápění.

**Od roku 2031** nicméně **bude vyloučena podpora projektů využívajících fosilní paliva**, tedy včetně zemního plynu. Revize naopak přikládá větší význam elektrifikaci. Nově bude čerpání prostředků z Modernizačního fondu podmíněno dodržováním zásad právního státu a zásady „významně nepoškozovat“, tedy zohledňovat případné environmentální dopady.[^dnsh]

Pro Česko dochází k mírnému procentnímu navýšení finanční alokace z dosavadních 12,6 % na budoucích 13,02 %, nicméně celková výše finančních prostředků se bude odvíjet od ceny emisních povolenek.

<div class="callout-commentary cde" markdown="1">

**Komentář Centra pro dopravu a energetiku:**

Pro Česko představuje Modernizační fond klíčový nástroj podpory dekarbonizace průmyslu.[^mf-programy] Jeho pokračování po roce 2030 tak může představovat významný impuls pro systémové snižování emisí CO<sub>2</sub> i v sektorech, kde tato změna vyžaduje vyšší investiční a modernizační úsilí. Ze zkušeností s dosavadní správou Modernizačního fondu je patrné, že rozhodující je motivace k přípravě kvalitních projektů se skutečným dekarbonizačním potenciálem. Česko například doposud financovalo z Modernizačního fondu transformaci dálkového vytápění spočívající v přechodu od uhlí k zemnímu plynu. To ale představuje jen dočasné řešení a nezbavuje českou ekonomiku potřeby významných investic do budoucna. Navržená revize navíc oslabuje kontrolní mechanismy v podobě účasti veřejnosti nebo sociálních záruk. O to významnější roli budou hrát státní instituce, jako Státní fond životního prostředí (SFŽP) a MŽP, které mohou samy aktivně usilovat o větší transparentnost a demokratičnost rozhodování o jednotlivých oblastech podpory a jejich podmínkách.

</div>

## Bezplatné povolenky nejméně do roku 2038

{% include preview-box.html
    title="Interaktivní přehled: Bezplatné povolenky v Česku"
    text="Jaká odvětví a zařízení dostávají povolenky zdarma?"
    slug="2026-interaktivni-prehled-ets"
%}

{% include preview-box.html
    title="Jak funguje CBAM?"
    text="Koho se CBAM týká a jak souvisí s bezplatnými povolenkami?"
    slug="cbam"
%}

Bezplatné povolenky přidělované zejména průmyslu a dalším emisně náročným odvětvím měly podle stávající legislativy postupně ubývat, mimo jiné proto, že **ochraně evropského průmyslu před konkurencí ze zemí s nižšími klimatickými standardy nově napomáhá** [**uhlíkové vyrovnání na hranicích**](https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en) (*Carbon Border Adjustment Mechanism*, CBAM). Navržená revize ale tento útlum zpomaluje. **Bezplatné povolenky** v sektorech, na které se uplatňuje CBAM, **by měly nově pokračovat do roku 2038**, tedy o čtyři roky déle, než se původně plánovalo. U ostatních emisně náročných odvětví revize jasný termín jejich ukončení nestanovuje. V současnosti se bezplatně přiděluje více než 40 % všech povolenek,[^bezplatne-cesko] v průmyslu dokonce jejich většina.

Firmy, které chtějí bezplatné povolenky získat, budou nově muset předložit **plán dekarbonizačních investic v EU**. Jejich plánovaná hodnota má odpovídat hodnotě přidělených bezplatných povolenek. 80 % povolenek by firmy získaly na základě předloženého investičního plánu, zbývajících 20 % až v návaznosti na skutečně realizované investice.

<div class="callout-commentary cde" markdown="1">

**Komentář Centra pro dopravu a energetiku:**

Bezplatné povolenky jsou dlouhodobě kritizovaným nástrojem, o jejich přínosnosti výrazně pochybuje například i [Evropský účetní dvůr](https://carbonmarketwatch.org/publications/implementing-act-updating-benchmark-values-for-free-allocation-of-emission-allowances/). Hlavním problémem je, že v dosavadní podobě odčerpávají prostředky, které by mohly financovat dekarbonizaci, a zároveň firmy nijak nemotivují ke skutečnému snižování emisí. Podmínka doložení investičních plánů v hodnotě odpovídající bezplatné alokaci je proto alespoň částečně posun správným směrem oproti stávající praxi poskytování povolenek bez jakékoli protihodnoty. Na druhou stranu, podobný mechanismus už se uplatňuje u jiných nástrojů, a je tak možné hodnotit jeho limity. Například v Modernizačním fondu bylo podmínkou, že podpora teplárenství je možná v případě, že firmy doloží své dekarbonizační plány. Ty byly v Česku zveřejněny až s několikaletým zpožděním, ačkoliv evropská legislativa jejich zveřejnění přímo nařizuje, a nebylo tak možné účinně kontrolovat jejich naplňování. Právě transparentnost a vymahatelnost investičních plánů tak bude klíčová i v případě revize EU ETS v oblasti bezplatných emisních povolenek.

</div>

{% include includes-local/revize-ets-bezplatne.html %}

## Proces projednávání

{% include includes-local/ets-timeline.html typ="proces" %}

## Poznámky

[^ets-rozsah]: Tyto sektory však zatím nepodléhají ETS v plné šíři. Například v případě výroby elektřiny a tepla zahrnuje pouze instalace s tepelným příkonem vyšším než 20 MW (ty s nižším příkonem mají být od roku 2028 součástí emisního obchodování druhé generace, ETS2). Podobně u letecké a námořní dopravy je zahrnuta pouze část (především ta odehrávající se celá na území EU) a postupně dochází k rozšiřování záběru.

[^lulucf]: Bez propadů emisí v rámci LULUCF.

[^ets2]: ETS2 je však součástí stejné evropské směrnice jako původní systém ETS, takže lze očekávat, že některé členské státy a politické skupiny v Evropském parlamentu budou usilovat také o jeho změny v rámci projednávání revize směrnice.

[^lrf-kredity]: Případně 2,7 %, pokud by po roce 2036 nebyly k dispozici dostatečně kvalitní mezinárodní kredity.

[^ets2-podil]: ETS2 by v současnosti pokrylo dalších 40 % unijních emisí.

[^offsety]: Tomu, jak poznat kvalitní mezinárodní kredity/offsety, se věnuje např. [text Jak poznat kvalitní uhlíkový offset?](/explainery/uhlikove-offsety-otazky)

[^bioccs-podniky]: Směrnice umožňuje využití BioCCS i jednotlivými podniky, které si jím mohou vykompenzovat vlastní emise CO<sub>2</sub>. Pokud by k tomu došlo, toto vykompenzované množství se odečte od celkového množství nakupovaného Evropskou komisí.

[^crcf]: Podobu certifikátů stanovuje [nařízení o odstraňování uhlíku a uhlíkovém zemědělství](https://eur-lex.europa.eu/legal-content/CS/TXT/HTML/?uri=OJ:L_202403012) (*Carbon Removals and Carbon Farming*, CRCF).

[^cdr-pojistka]: Pokud by certifikáty byly dražší než povolenka, může pro jejich nákup Evropská komise vydražit dodatečných 10 milionů povolenek. S dalšími pojistkami návrh nepočítá, zároveň má ale Komise do roku 2034 předložit zprávu o stavu trhu s CDRs (a případně by mohla navrhnout úpravy mechanismu, pokud jejich nabídka nebo cena nebyla adekvátní).

[^ulozeni-v-prirode]: Negativní emise ve formě ukládání v přírodě v EU kvůli otázkám spojeným s jejich trvanlivostí zatím zařazeny nejsou, ale návrh počítá s jejich možným využitím v budoucnu.

[^kriteria]: Mezi kritéria by se měly řadit minimální požadavky na snížení emisí, povinná dokumentace, nebo velikost záruky za dokončení projektu vydané autorizovanou bankou (jako podíl celkové požadované podpory) a potvrzení existence této záruky Evropské komisi.

[^ccfd]: CCfDs jsou nástrojem, kdy Evropská komise podniku zaručí fixní cenu za tunu uspořeného CO<sub>2</sub>, aby měl jistotu, že se investice vyplatí i v časech, kdy by cena emisní povolenky byla z různých důvodů nižší. V takovém případě by Komise tento rozdíl podniku doplatila. Naopak pokud by byla cena emisní povolenky vyšší, podnik by přebytek Komisi vrátil.

[^kompenzace]: Kromě prostředků na kompenzaci nepřímých nákladů a pokrytí administrativních nákladů systému může stát část výnosů v současnosti využít také na finanční kompenzaci některým odvětvím za zvýšení nákladů na elektřinu v důsledku zpoplatnění emisí uhlíku.

[^dalsi-opatreni]: Např. zateplování budov, sociální podporu domácností, opatření proti odlesňování, adaptaci na dopady změny klimatu, kvalifikace a rekvalifikace pracovníků nebo nově snižování zemědělských emisí.

[^dnsh]: Může jít například o stavbu nové montážní linky pro novou technologii, která ale zvýší množství odpadu a zároveň nebude aplikovat principy cirkulární ekonomiky, tj. řešit recyklaci nebo předcházení vzniku odpadu.

[^mf-programy]: Dosavadní oblasti podpory a jejich alokace lze najít na [webu Státního fondu životního prostředí](https://sfzp.gov.cz/dotace-a-pujcky/modernizacni-fond/programy).

[^bezplatne-cesko]: Jen v Česku jde o víc než [10 milionů povolenek v roce 2025](https://climate.ec.europa.eu/document/download/fd4dc8e9-e445-4913-86d5-f97a9a3bcbee_en?filename=table_allocation_process_2025_en.pdf), což odpovídá polovině veškerých průmyslových emisí (i těch nezahrnutých do systému EU ETS).
