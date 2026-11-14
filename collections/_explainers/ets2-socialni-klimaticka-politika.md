---
layout:      explainer
title:       "Česku chybí sociální klimatická politika. Stát ale ani neví, kdo čím topí"
slug:        "ets2-socialni-klimaticka-politika"
series-id:   "serie-ets2-domacnosti"
series-order: "II"
type:        "ETS2 · domácnosti · Sociální klimatický fond"
published:   2026-11-04
cover-source-author:      "Jirka Dl"
cover-source-text:        "Wikimedia Commons"
cover-source-license:     "CC BY-SA 3.0"
cover-source-license-url: "https://creativecommons.org/licenses/by-sa/3.0/"
cover-source-url:         "https://commons.wikimedia.org/wiki/File:Air_Pollution_from_local_heating.JPG"
authors:
  - name: "Jakub Komárek"
extra-scripts:
- https://d3js.org/d3.v7.min.js
- /assets-local/charts/fok-theme.js
- /assets-local/charts/fok-utils.js
- /assets-local/charts/fok-chart-bar-stacked.js
- /assets-local/js/ets2-blog.js
- /assets-local/js/ets2-mapa.js
- /assets-local/js/ets2-grafy.js
perex: |
  [doplnit perex – pracovní návrh:] Evropská pravidla počítají s tím, že sociální dopady ETS2 tlumí členské státy. Jaké nástroje mají, kolik by stály a co z toho zatím chystá Česko?
---

{% include series-box.html series-id=page.series-id selected=page.slug %}

{% include tldr.html title="Hlavní zjištění" content="
- **Od roku 2028 by ETS2 zdražilo vytápění plynem a uhlím a pohonné hmoty.** Citelně by zasáhlo asi 290 tisíc domácností s nízkými příjmy, které na zdražení nemají. Průměrně by je stálo 780 Kč měsíčně, domácnosti v rodinných domech na uhlí kolem 1 450 Kč.
- **Český návrh Sociálního klimatického plánu přímé platby nepočítá**, přestože by je pravidla fondu dovolila. Kritizuje to veřejný ochránce práv i Centrum pro dopravu a energetiku.
- **Hlavní problém není, kolik peněz dát, ale jak je doručit.** Stát neví, čím kdo topí, nezná příjmy domácností (jen jednotlivců) a nemá účty, kam peníze poslat. Dávky, o které se musí žádat, čerpá jen čtvrtina až polovina oprávněných.
- **Návrh PAQ Research a CVF by stál 13 mld. Kč ročně, ale zranitelným domácnostem by z něj šlo jen 7 % peněz** a vyrovnal by jim méně než třetinu zdražení. Jeho hlavní části (sleva na dani, valorizace důchodů) navíc nejsou cílené, a nešlo by je proto platit ze Sociálního klimatického fondu.
- **V zahraničí funguje automatická výplata tam, kde stát umí spojit příjem s bydlištěm** (Francie do roku 2023) nebo navázat platbu na existující dávku či důchod (Španělsko, Irsko). Kde se musí žádat, čerpání padá (Francie od roku 2024) nebo lidé systém obcházejí (Polsko).
- **Pro Česko navrhujeme dva kanály.** Domácnosti s důchodcem by platbu dostaly automaticky jako dočasný příplatek k důchodu. Ostatní by si o ni požádaly jednoduchou žádostí s velkou kampaní: příjem by úřad ověřil sám, domácnost by doložila jen palivo. Nárok by měly jen domácnosti s příjmem pod mediánem a cílená platba by stála 6–8 mld. Kč ročně.
- Koho by zavedení ETS2 zasáhlo nejvíc a kde tyto domácnosti žijí, rozebíráme v [prvním textu série](/explainery/ets2-zranitelne-domacnosti).
" %}

<div class="ets2-todo" markdown="1">
**[doplnit úvod]** Rámec EU: sociální klimatickou politiku jako úkol členských států ukládají směrnice o energetické účinnosti (EED), o energetické náročnosti budov (EPBD) a pravidla ETS2 a Sociálního klimatického fondu (ověřit v právních textech). Co zatím dělá Česko: návrh Sociálního klimatického plánu bez přímé podpory (podpora tvrzení: [veřejný ochránce práv](https://www.ochrance.cz/uploads-import/ESO/57597-2025_soci%C3%A1ln%C3%AD_klimatick%C3%BD_pl%C3%A1n.pdf), 18. 12. 2025, a [analýza CDE](https://www.cde-org.cz/media/object/2884/skf_analyza_04_2026.docx.pdf), duben 2026), vláda ETS2 odmítá. Teze: Česko zavádí jen to, co mu unijní právo přímo ukládá.
</div>

## Co chystá Česko?

Zavedení ETS2 by domácnostem zdražilo vytápění hned od roku 2028, výměna kotle nebo zateplení ale trvá roky. Na toto přechodné období proto [nařízení o Sociálním klimatickém fondu](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023R0955) dovoluje státům vyplácet zranitelným domácnostem dočasné přímé platby.

**Český návrh Sociálního klimatického plánu přímé platby nepočítá.** [Plán je vylučuje](https://mzp.gov.cz/system/files/2026-01/OFDE-prvni_verze_SKP_pro_MPR-20251218.docx) s odkazem na dávky, přestože by na ně šlo použít až 37,5 % fondu. Kritizuje to [veřejný ochránce práv](https://www.ochrance.cz/uploads-import/ESO/57597-2025_soci%C3%A1ln%C3%AD_klimatick%C3%BD_pl%C3%A1n.pdf): podle něj v plánu „chybí kompenzace pro toto kritické přechodné období“, tedy dobu od zavedení ETS2 do chvíle, než se projeví investice do renovací. Absenci přímé podpory jako jednu z nejproblematičtějších částí plánu označuje i [Centrum pro dopravu a energetiku](https://www.cde-org.cz/media/object/2884/skf_analyza_04_2026.docx.pdf).

<div id="skp" class="ets2-anchor"></div>

{% capture ex_skp %}

První verze plánu, kterou připravilo [ministerstvo životního prostředí](https://mzp.gov.cz/cz/agenda/prehled-dotaci/socialni-klimaticky-fond), dává peníze do renovací rodinných a bytových domů, stavby dostupných nájemních bytů, přestavby ubytoven, poradenství a veřejné dopravy. Z pohledu dopadů ETS2 má ale několik slabin:

- **Žádný most.** Přímou podporu plán vylučuje s odkazem na dávky. Domácnost na uhlí by ale od roku 2028 platila 1 450 Kč měsíčně navíc dřív, než se k ní renovace dostane.
- **Málo výměn kotlů.** Z 38 800 podpořených rodinných domů má jít jen asi 7 200 o výměnu zdroje vytápění. Zranitelných domácností v domech na uhlí je přitom 40–50 tisíc a na plyn 110–130 tisíc.
- **Výměny necílí na palivo.** Renovace cílí na příjem a energetickou třídu domu, ne na to, čím se v něm topí. U investice to přitom jde: starý kotel na uhlí se při výměně fyzicky odstraní. Podporu tak může dostat i domácnost, které by zavedení ETS2 účty skoro nezvýšilo, třeba v domě, kde se topí dřevem.
- **Velké investice s malým dosahem.** Nové nájemní byty i poptávková doprava do fondu patří: nabízejí bydlení tam, kde se renovace nevyplatí, a dopravu tam, kde autobus nejezdí. Na zhruba 3&nbsp;500 bytů ale jde 560 milionů eur, tedy přes 4 miliony korun na byt. U poptávkové dopravy plán platí hlavně nákup tisíce vozů, provoz jen na rozjezd, a nestanovuje jízdné ani napojení na krajskou dopravu.
- **Chybí analýza dopadů.** Plán pracuje jen s průměrnou domácností. Kdo zaplatí nejvíc a kde žije, neřeší.

{% endcapture %}
{% include expander.html name="skp" label="Na okraj: Co obsahuje návrh českého Sociálního klimatického plánu?" content=ex_skp %}

## Jak lze zranitelným domácnostem pomoci?

Nástroje, které jiné země používají, se dají rozdělit do tří skupin. Každá řeší něco jiného.

**Přímé platby** pomohou hned, ale příčinu neodstraní. Pokud jde o pevnou částku, a ne slevu z ceny, zůstává domácnosti důvod šetřit a přejít na jiný zdroj. Nejlépe fungují platby, o které není nutné žádat: [Británie posílá slevu automaticky](https://gov.uk/government/consultations/expanding-the-warm-home-discount-scheme-2025-to-2026/expanding-the-warm-home-discount-scheme-2025-to-2026-consultation-document-accessible-webpage) příjemcům příjmově testovaných dávek ([Francie podle daňových dat](https://www.effy.fr/magazine/actualite/cheque-energie-avril-2026). Česko má podobný kanál v [superdávce](#ODKAZ-PDF-studie), která už počítá s energetickým paušálem i se zvláštní částkou na tuhá paliva a [vláda je může zvýšit nařízením](https://www.epravo.cz/_dataPublic/sbirky/2025/Sb_2025_151_PZZ.pdf). Dávky ale čerpá [jen čtvrtina až polovina domácností](https://www.paqresearch.cz/post/davky-necerpani/), které na ně mají nárok.

**Výměna zdroje a renovace** odstraní příčinu natrvalo. Nejchudší ale nemají na spoluúčast ani na předfinancování a často nezvládnou papíry. [Rakousko](https://www.umweltfoerderung.at/fileadmin/user_upload/umweltfoerderung/private/sauber_heizen_fuer_alle/SHFA2026_Infoblatt.pdf) a [Slovinsko](https://zero500.ekosklad.si/uploads/5b300c08-5c34-4700-a3cf-018ce424ed34/Javni-poziv-ZERO-500.pdf) jim proto platí celou výměnu, peníze posílají rovnou firmě a domácnost provází poradce. Polsko ukázalo i druhou stranu: bez cenových stropů a kontroly [přitáhne stoprocentní dotace podvodníky](https://demagog.org.pl/analizy_i_raporty/spor-o-program-czyste-powietrze-jest-lepiej-czy-gorzej/).

**Ceny a sazby** se zavádějí nejsnáz, ale sleva z ceny tlumí smysl ETS2. [Maďarsko má plošný cenový strop](https://rekk.hu/downloads/academic_publications/rekk_policybrief_hu_2026_02.pdf): stát domácnostem garantuje nízkou regulovanou cenu plynu a elektřiny a rozdíl proti tržní ceně doplácí. Je to drahé a domácnosti topící dřevem nebo uhlím z toho nemají nic. Česko naopak už má zvláštní sazbu elektřiny pro tepelná čerpadla s nízkým tarifem 22 hodin denně. [V nízkém tarifu stojí distribuce zlomek běžné ceny a megawatthodina elektřiny vychází zhruba o třetinu levněji](https://www.cez.cz/webpublic/file/edee/ceniky/moo_ele_cez_online_na_1_rok_01012026_01012026.pdf) než v běžné sazbě. [Taková sazba přechod urychluje](https://www.raponline.org/wp-content/uploads/2025/10/RAP-press-release-making-electricity-cheaper.pdf) a je důležité ji zachovat. Nejde jen o výši sazby, ale i o její předvídatelnost. Když v roce 2022 vyletěly ceny energií, musela vláda [zastropovat cenu elektřiny](https://uv.gov.cz/assets/media-centrum/aktualne/PREZENTACE_STROP_FINAL.pdf) pro všechny domácnosti. Kdo zvažuje přechod na tepelné čerpadlo, potřebuje vědět, že ho podobná krize nezaskočí víc než souseda s plynovým kotlem.

## Proč stát neumí poslat peníze tam, kde jsou potřeba?

Aby platba došla ke správným domácnostem, musí stát u každé znát tři věci: příjem domácnosti, zda ji ETS2 zasáhne, a kam poslat peníze. Dnes nezná spolehlivě ani jednu.

| Co je potřeba | Co stát má | Proč to nestačí |
|---|---|---|
| Příjem domácnosti | Příjmy jednotlivců u finanční správy, ČSSZ a úřadu práce | Neví, kdo s kým žije. Chybí lidé bez daňového přiznání a bez dávek. |
| Kde domácnost bydlí | Trvalý pobyt v registru obyvatel, typ domu v RÚIAN | Trvalý pobyt je k adrese domu, ne bytu, a často neodpovídá skutečnosti. Katastr zná vlastníka, ne obyvatele. |
| Čím domácnost topí | Údaj o vytápění v RÚIAN, doklady o kontrole kotlů | Údaj v RÚIAN je špatně vyplněný. Kontroly kotlů nejsou centrálně evidované a nerozlišují uhlí od dřeva. |
| Kam poslat peníze | Účty příjemců důchodů a dávek | Centrální evidence bankovních účtů neexistuje. |
{: .table .ets2-tabulka}

**Proč je propojování dat tak těžké:**

- **Stát nemá pojem domácnosti.** Registr obyvatel eviduje jednotlivce a jejich adresu, ale ne, kdo s kým hospodaří. Adresa je místo domu, byty v domě registr nerozlišuje ([zákon o základních registrech](https://www.zakonyprolidi.cz/cs/2009-111)).
- **Každý úřad zná člověka pod jiným identifikátorem.** Základní registry používají pro každou agendu jiný identifikátor (AIFO), propojit údaje dvou úřadů jde jen přes převodník identifikátorů a jen tam, kde to výslovně dovoluje zákon. Sdílení přes propojený datový fond spravuje [Digitální a informační agentura](https://dia.gov.cz).
- **Daňová data chrání mlčenlivost.** Finanční správa může údaje z daňových přiznání předat jinému úřadu jen tam, kde to zákon výslovně umožňuje ([daňový řád, § 52 a násl.](https://www.zakonyprolidi.cz/cs/2009-280)). Podobně jsou chráněná data ČSSZ a úřadu práce.
- **Úřady nevědí, čím kdo topí.** Takový údaj v žádném použitelném státním registru není.

Když údaj chybí, musí si domácnost zažádat sama. Superdávku, o kterou se žádá, [čerpá jen čtvrtina až polovina oprávněných](https://www.paqresearch.cz/content/files/2026/03/PAQ-CVF_ETS2.pdf). Ze zranitelných domácností podle našeho výpočtu pobírá dávky na bydlení jen 15 %, v rodinných domech na uhlí jen 2 % ([EU-SILC 2024](https://ec.europa.eu/eurostat/web/microdata/european-union-statistics-on-income-and-living-conditions)).

## Co navrhují PAQ Research a CVF?

[PAQ Research a Centrum pro veřejné finance (2026)](https://www.paqresearch.cz/content/files/2026/03/PAQ-CVF_ETS2.pdf) navrhují kompenzovat ETS2 třemi opatřeními:

- **zvýšení slevy na poplatníka** o 1 200 Kč ročně pro všechny pracující, s náklady 5,9 mld. Kč ročně,
- **mimořádná valorizace důchodů** za 5,5 mld. Kč ročně,
- **zvýšení energetického paušálu o 20 %** pro příjemce dávek na bydlení.

Výhodou návrhu je jednoduchost: využívá existující systémy a nevyžaduje nová data. Podle našeho výpočtu má ale zásadní nevýhody.

| | Návrh PAQ a CVF | Cílená varianta |
|---|---|---|
| Náklad ročně | 13,0 mld. Kč | 6,7–8,2 mld. Kč |
| Podíl peněz, který by šel zranitelným | 7 % | 28–34 % |
| Zranitelných by nedostalo nic | 7 % | 6–15 % |
| Část zdražení, kterou by zranitelní dostali zpět | 29 % | 70–71 % |
| z toho rodinné domy na tuhá paliva | 14 % | 79 % |
{: .table .ets2-tabulka}

Zdroj: [EU-SILC 2024](https://ec.europa.eu/eurostat/web/microdata/european-union-statistics-on-income-and-living-conditions), výpočet Fakta o klimatu. Valorizace je rozpočítaná na všechny důchodce se stejným úhrnem jako v návrhu.
{: .ets2-tab-src}

1. **Je drahý a málo cílený.** Sleva na dani jde všem pracujícím, valorizace všem důchodcům. Zranitelným domácnostem by šlo jen 7 % peněz.
2. **Nejvíc zasaženým by vrátil nejméně.** Domácnosti v rodinných domech na uhlí by ETS2 stálo kolem 1 450 Kč měsíčně, návrh by jim vrátil jen 14 % této částky. Sleva na dani i valorizace jsou stejné bez ohledu na to, čím domácnost topí.
3. **Většinu by nešlo platit ze Sociálního klimatického fondu.** Fond smí platit jen dočasnou podporu zranitelným domácnostem ([čl. 4 odst. 3 a čl. 8 odst. 2 nařízení 2023/955](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023R0955)). Plošná sleva ani valorizace všech důchodů tuto podmínku nesplňují. Valorizace navíc zůstává v důchodu trvale, takže není dočasná. Autoři sami uvádějí, že zbývajících asi 11,5 mld. Kč ročně „by musel financovat státní rozpočet“ ([s. 30](https://www.paqresearch.cz/content/files/2026/03/PAQ-CVF_ETS2.pdf)).
4. **Cílená část dosáhne jen na menšinu.** Energetický paušál dostanou jen příjemci dávek na bydlení, tedy 15 % zranitelných.

## Jak to dělají jinde?

<div id="zahranici" class="ets2-anchor"></div>

{% capture ex_zahranici %}

| Země | Nástroj | Jak se pozná nárok | Musí se žádat? | Výsledek |
|---|---|---|---|---|
| **Rakousko** | Klimabonus 2022–2024, 145–290 eur ročně | Hlavní bydliště z registru obyvatel, účet od finanční správy | Ne | Přes 90 % převodem, ostatní poukázka poštou. Stál přes 4,1 mld. eur, víc než vynesla uhlíková daň. Zrušen kvůli rozpočtu. |
| **Francie** | chèque énergie, 48–277 eur ročně | Příjem z daňových údajů, adresa z daně z bydlení | Do roku 2023 ne | Čerpání 84 %. Po zrušení daně z bydlení stát přišel o adresy, musí se žádat a čerpání kleslo na odhadem 3–12 %. |
| **Španělsko** | bono social térmico, od 50 eur podle klimatické zóny | Automaticky příjemci sociálního tarifu elektřiny | Ne | Funguje automaticky, ale jen pro ty, kdo si dřív požádali o sociální tarif. |
| **Irsko** | Fuel Allowance, 38 eur týdně po 28 týdnů | Senioři s testem příjmu, příjemci vybraných dávek | Jednou | Vyplácí se s dávkami, každý rok bez nové žádosti. |
| **Polsko** | dodatek węglowy 2022, 3 000 zł | Uhlí zapsané v registru zdrojů tepla | Ano, na obci | Lidé se hromadně přepisovali na uhlí, dokud zákon neurčil rozhodný den. Obce kontrolovaly kotle v domácnostech. |
| **Německo** | Klimageld, zatím nevyplácený | Daňové číslo a účet | Ne (plán) | Systém pro přímé platby se staví od roku 2021 a stále není hotový. Účet je evidovaný jen u 16 z 86 mil. daňových čísel. |
{: .table .ets2-tabulka}

Zdroje: [Klimabonusgesetz](https://gesetzefinden.at/bundesrecht/bundesgesetze/klibg), [ORF](https://orf.at/stories/3366925/), [ORF](https://orf.at/stories/3293206/), [vienna.at](https://www.vienna.at/klimabonus-faellt-weg-pendler-erhalten-neuen-steuer-ausgleich/9323774), [Hellowatt](https://www.hellowatt.fr/blog/fin-versement-automatique-cheque-energie/), [Consumo Responde](https://www.consumoresponde.es/artículos/el_bono_social_termico), [gov.ie](https://www.gov.ie/fuelallowance), [Infor](https://www.infor.pl/prawo/nowosci-prawne/5578929,Koniec-ze-zmiana-deklaracji-w-CEEB-aby-dostac-dodatek-weglowy.html), [Murator](https://muratordom.pl/prawo/formalnosci-budowlane/zlozyles-wniosek-o-3000-zl-dodatku-weglowego-urzednicy-przyjda-i-sprawdza-czy-na-pewno-palisz-weglem-aa-fKHc-nTQT-1dHk.html), [Bundestag](https://www.bundestag.de/presse/hib/kurzmeldungen-1183566).

**Rakousko po Klimabonusu** přímou náhradu pro domácnosti nezavedlo. Ztrojnásobí daňový odpočet pro dojíždějící, z něhož by nejbohatší pětina dostala asi 250 mil. eur a nejchudší asi 20 mil. ([vienna.at](https://www.vienna.at/vcoe-kritik-an-verdreifachung-von-pendlereuro/9458621)).

{% endcapture %}
{% include expander.html name="zahranici" label="Na okraj: Přímé platby v šesti zemích" content=ex_zahranici %}

**Poučení:**

1. **Automatická výplata všem funguje, ale je drahá.** Rakousko ji zrušilo kvůli rozpočtu.
2. **Automatické cílení funguje, když stát spojí příjem s bydlištěm.** Francie měla vysoké čerpání, dokud tuto vazbu neztratila.
3. **Navázání na existující dávku je levné, ale převezme její nízké čerpání.**
4. **Nárok podle paliva na žádost vede k obcházení.** Rozhodný den musí být známý od začátku a data o palivu musí být taková, která domácnost nemůže sama změnit.

## Co navrhujeme pro Česko?

Žádný nástroj sám nestačí. Přímá platba pomůže hned, ale dům na uhlí zůstane domem na uhlí. Výměna zdroje pomůže natrvalo, ale trvá roky.

**Nárok by měly jen nízko- a nižší středopříjmové domácnosti.** Plnou platbu by dostaly domácnosti do horní hranice 3. decilu ekvivalizovaného příjmu, pak by plynule klesala k nule na hranici 5. decilu (mediánu). Jednotlivec s čistým příjmem do zhruba 31 tis. Kč měsíčně by dostal celou platbu, od 39 tis. Kč nic. U páru jsou hranice 44 a 55 tis. Kč, u čtyřčlenné rodiny 62 a 78 tis. Kč ([EU-SILC 2024](https://ec.europa.eu/eurostat/web/microdata/european-union-statistics-on-income-and-living-conditions), výpočet Fakta o klimatu).

**Navrhujeme dva kanály podle toho, kde automatika funguje:**

**1. Domácnosti s důchodcem: automaticky přes důchod**

- Tři čtvrtiny zranitelných domácností v rodinných domech mají v domácnosti důchodce. Právě pro starší lidi je žádost největší bariéra.
- ČSSZ by vyplácela dočasný příplatek k důchodu, oddělený od valorizace. Jen tak by byl dočasný a šel by platit ze Sociálního klimatického fondu.
- Podmínkou by byl příjem domácnosti pod hranicí. To vyžaduje spojit důchod s příjmy ostatních osob na stejné adrese, tedy výjimku z ochrany dat popsané výše.

**2. Ostatní domácnosti: jednoduchá žádost s velkou kampaní**

- **Příjem by si ověřil úřad sám** z dat finanční správy, ČSSZ a úřadu práce se souhlasem žadatele. Domácnost by nic nedokládala.
- **Domácnost by doložila jen palivo:** vyúčtování plynu (je na něm odběrné místo a spotřeba, takže data od distributorů nejsou potřeba), doklad o kontrole kotle na tuhá paliva, nebo potvrzení od SVJ, družstva či dodavatele tepla. Doklad by musel být z doby před rozhodným dnem, aby se nezopakovalo polské přepisování na uhlí.
- **Kampaň a pomoc obcí:** pro lidi, kteří online žádost sami nezvládnou, by pomohli sociální pracovníci obcí, kontaktní místa a energetické poradny.
- **Riziko:** i s kampaní si část oprávněných nezažádá. Ve Francii po přechodu na žádost kleslo čerpání z 84 % na odhadem 3–12 % ([Hellowatt](https://www.hellowatt.fr/blog/fin-versement-automatique-cheque-energie/)).

**Výše platby** by se lišila podle paliva a typu bydlení (rodinný dům na tuhá paliva 1 450 Kč, rodinný dům na plyn 750 Kč, byt na plyn 570 Kč, byt na teple ze zdroje v ETS2 500 Kč měsíčně). Kdyby o ni požádali všichni oprávnění, stála by 6,7 mld. Kč ročně, dostalo by ji 85 % zranitelných domácností a vrátila by jim 70 % zdražení. Zbylých 15 % jsou domácnosti s jiným nebo kombinovaným vytápěním ([EU-SILC 2024](https://ec.europa.eu/eurostat/web/microdata/european-union-statistics-on-income-and-living-conditions), výpočet Fakta o klimatu). Ze Sociálního klimatického fondu by šlo pokrýt jen 2–2,5 mld. Kč, zbytek by musel jít z národních výnosů z dražeb ETS2.

Platba by byla dočasná a klesající podle předem známého plánu (například plná v letech 2028–2029, konec v roce 2032). Přechod na čistší zdroj by ji neukončil.

<figure class="ets2-figure ets2-graf-fig">
  <h3 class="js-toc-ignore">[pracovní nadpis] Cílená platba by vrátila zranitelným víc za menší peníze</h3>
  <p class="ets2-sub">[pracovní podnadpis] Pravidla přímé platby v základním scénáři: kolik by stála ročně a jakou část svého zdražení by zranitelné domácnosti dostaly zpět</p>
  <script type="application/json" class="graf-data">{{ site.data.ets2.kompenzace | jsonify }}</script>
  <div class="ets2-graf" data-graf="kompenzace-naklad" role="img" aria-label="Náklad pravidel přímé platby v mld. Kč ročně"></div>
  <div class="ets2-graf" data-graf="kompenzace-vyrovnano" role="img" aria-label="Jakou část zdražení by zranitelné domácnosti dostaly zpět"></div>
  <div class="ets2-src">Zdroj: výpočet Fakt o klimatu z <a href="https://ec.europa.eu/eurostat/web/microdata/european-union-statistics-on-income-and-living-conditions">EU-SILC 2024</a>; návrh PAQ a CVF podle <a href="https://www.paqresearch.cz/content/files/2026/03/PAQ-CVF_ETS2.pdf">PAQ Research a CVF (2026)</a>.</div>
</figure>

Vedle platby:

- **Dlouhodobě výměna zdroje a zateplení**, nejvíc v rodinných domech na uhlí, s plnou úhradou pro nejchudší, platbou rovnou firmě, průvodcem z obce a kontrolou cen i práce. Podporu renovací lze posílit i v SO ORP, které mapa ukazuje jako nejohroženější.
- **Platby by postupně ubývaly, investice přibývaly.**
{: .plain}

<div id="mapa-box" class="ets2-anchor"></div>

{% capture ex_mapa %}{% include includes-local/ets2-blog/mapa-orp.html vrstvy="mf" %}{% endcapture %}
{% include expander.html name="mapa-box" label="Mapa: Kde je energetická chudoba nejvyšší?" content=ex_mapa %}


Výměnu zdroje ani zateplení přitom v bytě nájemník sám nezařídí, rozhoduje majitel domu nebo společenství vlastníků. Pro nájemníky proto zůstává platba hlavní pomocí déle.

Vedle peněz může být stejně velkou překážkou kapacita. Polsko ani Irsko nenarazily na nedostatek dotací, ale na [nedostatek firem, poradců a kontroly](https://demagog.org.pl/analizy_i_raporty/spor-o-program-czyste-powietrze-jest-lepiej-czy-gorzej/); irské domácnosti čekají na plně hrazenou renovaci [kolem dvou let](https://www.oireachtas.ie/en/debates/question/2025-04-29/306). V Česku bude podle ministerstva financí ve vrcholu let 2028–2030 [chybět řádově 31 tisíc pracovníků](#ODKAZ-MF-hlavni-report) jen na renovace podle evropské směrnice o budovách a od roku 2029 se přidá stavba Dukovan. Síť průvodců, cenové stropy a ověřování nároku by proto bylo potřeba připravit předem.

<div id="skf" class="ets2-anchor"></div>

{% capture ex_skf %}

Fond vznikl spolu s ETS2, aby zdražení paliv nedopadlo nejvíc na ty, kdo se mu nemohou vyhnout. Členské státy z něj mají v letech 2026–2032 dostávat peníze na podporu zranitelných domácností a malých firem: na zateplení, výměnu zdrojů, čistší dopravu i dočasné přímé platby. Protože se start ETS2 posunul na rok 2028, chybí fondu na začátku příjmy z dražeb. EU je chce [překlenout dřívějším prodejem povolenek ETS2](https://carbonmarketwatch.org/wp-content/uploads/2026/01/20260105_CMW-feedback-on-ETS2-early-auctioning.pdf). Každý stát k tomu přidává nejméně čtvrtinu z vlastních zdrojů a musí předložit plán, jak peníze použije. Víc o fondu i o využití výnosů z ETS2 v našem [vysvětlení emisních povolenek ETS2](https://faktaoklimatu.cz/explainery/emisni-povolenky-ets-2#soci%C3%A1ln%C3%AD-klimatick%C3%BD-fond-a-dal%C5%A1%C3%AD-vyu%C5%BEit%C3%AD-v%C3%BDnos%C5%AF).

{% endcapture %}
{% include expander.html name="skf" label="Kontext: Co je Sociální klimatický fond?" content=ex_skf %}

**Peníze by byly.** Domácnosti by v cenách paliv zaplatily za povolenky ETS2 podle [našeho výpočtu](/explainery/ets2-zranitelne-domacnosti#metodika) kolem 26 miliard korun ročně, podobně odhadují i [PAQ a CVF](https://www.paqresearch.cz/content/files/2026/03/PAQ-CVF_ETS2.pdf). Tyto peníze by přes dodavatele paliv skončily ve výnosu z dražeb povolenek. Z výnosu dražeb v celé EU se platí [Sociální klimatický fond](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023R0955), zbytek dostanou státy do rozpočtu. Z fondu by Česko za roky 2026–2032 mělo dostat zhruba 42 miliard korun, tedy v průměru asi 6 miliard ročně. Původně počítalo [ministerstvo životního prostředí](https://mzp.gov.cz/cz/agenda/prehled-dotaci/socialni-klimaticky-fond) s až 50 miliardami, ale [nařízení o fondu](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023R0955) při odkladu ETS2 na rok 2028 snižuje celkový objem fondu asi o šestinu. Zhruba tři čtvrtiny peněz pocházejí z evropského fondu, nejméně čtvrtinu musí stát doplatit ze svého rozpočtu.

Na pomoc zranitelným domácnostem by peníze stačily jen zčásti. Pro představu, kolik by stály jednotlivé kroky ročně:

- cílená platba podle paliva a typu bydlení (návrh výše): asi 6,7 miliardy;
- výměna zdrojů ve všech 43 tisících zranitelných domech na uhlí do roku 2032: 2,6–3,5 miliardy, za celé období 2028–2032 tedy zhruba 13–17 miliard;
- síť průvodců, kteří domácnostem pomohou s výměnou: asi čtvrt miliardy.

Přímé platby přitom mohou tvořit nejvýš 37,5 % fondu, zhruba 2–2,5 miliardy ročně, a [měly by být dočasné a postupně klesat](https://oeil.europarl.europa.eu/oeil/en/document-summary?id=1741138), zbytek musí jít na investice.

Záleží tedy na nastavení. Pokud by se část výnosů vracela cíleně, mohly by nejzranitelnější domácnosti dostat zpět víc, než by je zavedení ETS2 stálo, a zbytek by mohl jít na výměnu zdrojů, které jim účty sníží natrvalo.

Všechny tyto odhady předpokládají, že ETS2 začne platit v roce 2028. Pokud by se jeho zavedení odložilo nebo změnilo, posunul by se i výnos a načasování peněz z fondu.

<div id="statni-sprava" class="ets2-anchor"></div>

{% capture ex_statni %}

| Kdo | Co by mohl prozkoumat |
|---|---|
| **MPSV a ČSSZ** | Zda jde vyplácet dočasný příplatek k důchodu odděleně od valorizace a jak spojit důchod s příjmy ostatních osob v domácnosti |
| **MPSV a úřad práce** | Jak by vypadala jednoduchá online žádost, u které úřad ověří příjem sám a žadatel doloží jen palivo; jakou kapacitu by kontrola dokladů vyžadovala |
| **Digitální a informační agentura** | Jak přes propojený datový fond a převodník identifikátorů zpřístupnit úřadu práce a ČSSZ příjmová data potřebná pro tento účel, a jaký zákonný titul je k tomu potřeba |
| **MF a Generální finanční ředitelství** | Za jakých podmínek by šlo se souhlasem žadatele předat údaje z daňových přiznání pro ověření příjmu |
| **ČSÚ** | Jak moc se trvalý pobyt v registru obyvatel liší od skutečného bydlení (porovnání se sčítáním 2021), zvlášť pro rodinné domy a byty |
| **MŽP** | Zda zavést centrální evidenci kontrol kotlů na tuhá paliva s typem paliva; jak zapsat platbu do Sociálního klimatického plánu jako přímou podporu příjmu |
| **ERÚ** | Které cenové lokality tepla používají zdroj na plyn nebo uhlí mimo ETS1, aby šlo ověřit potvrzení od dodavatelů tepla |
| **Obce s rozšířenou působností a kraje** | Jak by sociální pracovníci a kontaktní místa pomáhali se žádostmi; zda by kraje mohly využít seznamy z kotlíkových dotací, aby domácnosti, které už vyměnily kotel, o platbu nepřišly |
{: .table .ets2-tabulka}

{% endcapture %}
{% include expander.html name="statni-sprava" label="Na okraj: Co může státní správa prozkoumat" content=ex_statni %}

<p class="dlrow"><a class="dl" href="#ODKAZ-PDF-studie" download>Stáhnout celou studii (PDF)</a></p>

## Poznámky a zdroje

1. [analýzu CDE](https://www.cde-org.cz) – cde-org.cz
2. [Británie posílá slevu automaticky](https://gov.uk/government/consultations/expanding-the-warm-home-discount-scheme-2025-to-2026/expanding-the-warm-home-discount-scheme-2025-to-2026-consultation-document-accessible-webpage) – gov.uk
3. [Francie podle daňových dat](https://www.effy.fr/magazine/actualite/cheque-energie-avril-2026) – effy.fr
4. [vláda je může zvýšit nařízením](https://www.epravo.cz/_dataPublic/sbirky/2025/Sb_2025_151_PZZ.pdf) – epravo.cz
5. [jen čtvrtina až polovina domácností](https://www.paqresearch.cz/post/davky-necerpani/) – paqresearch.cz
6. [Rakousko](https://www.umweltfoerderung.at/fileadmin/user_upload/umweltfoerderung/private/sauber_heizen_fuer_alle/SHFA2026_Infoblatt.pdf) – umweltfoerderung.at
7. [Slovinsko](https://zero500.ekosklad.si/uploads/5b300c08-5c34-4700-a3cf-018ce424ed34/Javni-poziv-ZERO-500.pdf) – zero500.ekosklad.si
8. [přitáhne stoprocentní dotace podvodníky](https://demagog.org.pl/analizy_i_raporty/spor-o-program-czyste-powietrze-jest-lepiej-czy-gorzej/) – demagog.org.pl
9. [Maďarsko má plošný cenový strop](https://rekk.hu/downloads/academic_publications/rekk_policybrief_hu_2026_02.pdf) – rekk.hu
10. [V nízkém tarifu stojí distribuce zlomek běžné ceny a megawatthodina elektřiny vychází zhruba o třetinu levněji](https://www.cez.cz/webpublic/file/edee/ceniky/moo_ele_cez_online_na_1_rok_01012026_01012026.pdf) – cez.cz
11. [Taková sazba přechod urychluje](https://www.raponline.org/wp-content/uploads/2025/10/RAP-press-release-making-electricity-cheaper.pdf) – raponline.org
12. [zastropovat cenu elektřiny](https://uv.gov.cz/assets/media-centrum/aktualne/PREZENTACE_STROP_FINAL.pdf) – uv.gov.cz
13. [zákon o základních registrech](https://www.zakonyprolidi.cz/cs/2009-111) – zakonyprolidi.cz
14. [Digitální a informační agentura](https://dia.gov.cz) – dia.gov.cz
15. [daňový řád, § 52 a násl.](https://www.zakonyprolidi.cz/cs/2009-280) – zakonyprolidi.cz
16. [čerpá jen čtvrtina až polovina oprávněných](https://www.paqresearch.cz/content/files/2026/03/PAQ-CVF_ETS2.pdf) – paqresearch.cz
17. [EU-SILC 2024](https://ec.europa.eu/eurostat/web/microdata/european-union-statistics-on-income-and-living-conditions) – ec.europa.eu
18. [čl. 4 odst. 3 a čl. 8 odst. 2 nařízení 2023/955](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023R0955) – eur-lex.europa.eu
19. [Klimabonusgesetz](https://gesetzefinden.at/bundesrecht/bundesgesetze/klibg) – gesetzefinden.at
20. [ORF](https://orf.at/stories/3366925/) – orf.at
21. [ORF](https://orf.at/stories/3293206/) – orf.at
22. [vienna.at](https://www.vienna.at/klimabonus-faellt-weg-pendler-erhalten-neuen-steuer-ausgleich/9323774) – vienna.at
23. [Hellowatt](https://www.hellowatt.fr/blog/fin-versement-automatique-cheque-energie/) – hellowatt.fr
24. [Consumo Responde](https://www.consumoresponde.es/artículos/el_bono_social_termico) – consumoresponde.es
25. [gov.ie](https://www.gov.ie/fuelallowance) – gov.ie
26. [Infor](https://www.infor.pl/prawo/nowosci-prawne/5578929,Koniec-ze-zmiana-deklaracji-w-CEEB-aby-dostac-dodatek-weglowy.html) – infor.pl
27. [Murator](https://muratordom.pl/prawo/formalnosci-budowlane/zlozyles-wniosek-o-3000-zl-dodatku-weglowego-urzednicy-przyjda-i-sprawdza-czy-na-pewno-palisz-weglem-aa-fKHc-nTQT-1dHk.html) – muratordom.pl
28. [Bundestag](https://www.bundestag.de/presse/hib/kurzmeldungen-1183566) – bundestag.de
29. [vienna.at](https://www.vienna.at/vcoe-kritik-an-verdreifachung-von-pendlereuro/9458621) – vienna.at
30. [kolem dvou let](https://www.oireachtas.ie/en/debates/question/2025-04-29/306) – oireachtas.ie
31. [ministerstvo životního prostředí](https://mzp.gov.cz/cz/agenda/prehled-dotaci/socialni-klimaticky-fond) – mzp.gov.cz
32. [překlenout dřívějším prodejem povolenek ETS2](https://carbonmarketwatch.org/wp-content/uploads/2026/01/20260105_CMW-feedback-on-ETS2-early-auctioning.pdf) – carbonmarketwatch.org
33. [měly by být dočasné a postupně klesat](https://oeil.europarl.europa.eu/oeil/en/document-summary?id=1741138) – oeil.europarl.europa.eu
34. [veřejný ochránce práv: připomínky k první verzi Sociálního klimatického plánu](https://www.ochrance.cz/uploads-import/ESO/57597-2025_soci%C3%A1ln%C3%AD_klimatick%C3%BD_pl%C3%A1n.pdf) – ochrance.cz
35. [Centrum pro dopravu a energetiku: Sociální klimatický plán. Co obsahuje a co v něm chybí? (duben 2026)](https://www.cde-org.cz/media/object/2884/skf_analyza_04_2026.docx.pdf) – cde-org.cz
