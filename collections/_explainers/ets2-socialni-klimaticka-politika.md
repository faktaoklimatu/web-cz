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
- /assets-local/charts/d3-sankey.min.js
- /assets-local/js/ets2-grafy.js
perex: |
  Evropská pravidla počítají s tím, že sociální dopady ETS2 tlumí členské státy. Jaké nástroje mají, kolik by stály a co z toho zatím chystá Česko?
---

{% include series-box.html series-id=page.series-id selected=page.slug %}

{% include tldr.html title="Hlavní zjištění" content="
- **Od roku 2028 by ETS2 zdražilo vytápění plynem a uhlím a pohonné hmoty.** Citelně by zasáhlo asi 260 tisíc domácností s nízkými příjmy, které na zdražení nemají. Průměrně by je stálo 810 Kč měsíčně, domácnosti v rodinných domech na uhlí kolem 1 450 Kč.
- **Český návrh Sociálního klimatického plánu přímé platby nepočítá**, přestože by je pravidla fondu dovolila. Kritizuje to veřejný ochránce práv i Centrum pro dopravu a energetiku.
- **Hlavní problém není, kolik peněz dát, ale jak je doručit.** Stát neví, čím kdo topí, nezná příjmy domácností (jen jednotlivců) a nemá účty, kam peníze poslat. Dávky, o které se musí žádat, čerpá jen čtvrtina až polovina oprávněných.
- **V zahraničí funguje automatická výplata tam, kde stát umí spojit příjem s bydlištěm** (Francie do roku 2023) nebo navázat platbu na existující dávku či důchod (Španělsko, Irsko). Kde se musí žádat, čerpání padá (Francie od roku 2024) nebo lidé systém obcházejí (Polsko).
- **Pro Česko navrhujeme dočasnou platbu podle paliva a typu bydlení, kterou by stát doručoval třemi kanály.** Příjemcům dávek na bydlení by ji přidal k energetickému paušálu. Domácnosti s důchodcem by jednou doložily palivo a dál by platbu dostávaly automaticky jako příplatek k důchodu. Ostatní by si zažádaly jednoduchou žádostí s velkou kampaní: příjem by úřad ověřil sám, domácnost by doložila jen palivo. Platba by s rostoucím příjmem plynule klesala k nule u mediánu. V plné výši by stála asi 6 mld. Kč ročně, za roky 2028–2032 asi 21 mld. Kč, a zranitelným by vrátila necelé tři čtvrtiny zdražení vytápění.
- **Návrh PAQ Research a CVF by stál 13 mld. Kč ročně, ale zranitelným domácnostem by z něj šlo jen 6 % peněz** a vyrovnal by jim jen zhruba třetinu zdražení vytápění. Jeho hlavní části (sleva na dani, valorizace důchodů) navíc nejsou cílené, a nešlo by je proto platit ze Sociálního klimatického fondu.
- Koho by zavedení ETS2 zasáhlo nejvíc a kde tyto domácnosti žijí, rozebíráme v [prvním textu série](/explainery/ets2-zranitelne-domacnosti).
" %}

<div class="ets2-todo" markdown="1">
**[doplnit úvod]** Rámec EU: sociální klimatickou politiku jako úkol členských států ukládají směrnice o energetické účinnosti (EED), o energetické náročnosti budov (EPBD) a pravidla ETS2 a Sociálního klimatického fondu (ověřit v právních textech). Co zatím dělá Česko: návrh Sociálního klimatického plánu bez přímé podpory (podpora tvrzení: [veřejný ochránce práv](https://www.ochrance.cz/uploads-import/ESO/57597-2025_soci%C3%A1ln%C3%AD_klimatick%C3%BD_pl%C3%A1n.pdf), 18. 12. 2025, a [analýza CDE](https://www.cde-org.cz/media/object/2884/skf_analyza_04_2026.docx.pdf), duben 2026), vláda ETS2 odmítá. Teze: Česko zavádí jen to, co mu unijní právo přímo ukládá.
</div>

## Co chystá Česko?

Zavedení ETS2 by domácnostem zdražilo vytápění hned od roku 2028, výměna kotle nebo zateplení ale trvá roky. Na toto přechodné období proto [nařízení o Sociálním klimatickém fondu](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023R0955) dovoluje státům vyplácet zranitelným domácnostem dočasné přímé platby.

**Český návrh Sociálního klimatického plánu přímé platby nepočítá.** [Plán je vylučuje](https://mzp.gov.cz/system/files/2026-01/OFDE-prvni_verze_SKP_pro_MPR-20251218.docx) s odkazem na dávky, přestože by mohly tvořit až 37,5 % nákladů plánu. Kritizuje to [veřejný ochránce práv](https://www.ochrance.cz/uploads-import/ESO/57597-2025_soci%C3%A1ln%C3%AD_klimatick%C3%BD_pl%C3%A1n.pdf): podle něj v plánu „chybí kompenzace pro toto kritické přechodné období“, tedy dobu od zavedení ETS2 do chvíle, než se projeví investice do renovací. Absenci přímé podpory jako jednu z nejproblematičtějších částí plánu označuje i [Centrum pro dopravu a energetiku](https://www.cde-org.cz/media/object/2884/skf_analyza_04_2026.docx.pdf).

<div id="skp" class="ets2-anchor"></div>

{% capture ex_skp %}

První verze plánu, kterou připravilo [ministerstvo životního prostředí](https://mzp.gov.cz/cz/agenda/prehled-dotaci/socialni-klimaticky-fond), dává peníze do renovací rodinných a bytových domů, stavby dostupných nájemních bytů, přestavby ubytoven, poradenství a veřejné dopravy. Z pohledu dopadů ETS2 má ale několik slabin:

- **Žádný most.** Přímou podporu plán vylučuje s odkazem na dávky. Domácnost na uhlí by ale od roku 2028 platila 1 450 Kč měsíčně navíc dřív, než se k ní renovace dostane.
- **Málo výměn kotlů.** Z 38 800 podpořených rodinných domů má jít jen asi 7 200 o výměnu zdroje vytápění. Zranitelných domácností v domech na uhlí je přitom 40–50 tisíc a na plyn 110–130 tisíc.
- **Výměny necílí na palivo.** Renovace cílí na příjem a energetickou třídu domu, ne na to, čím se v něm topí. U investice to přitom jde: starý kotel na uhlí se při výměně fyzicky odstraní. Podporu tak může dostat i domácnost, které by zavedení ETS2 účty skoro nezvýšilo, třeba v domě, kde se topí dřevem.
- **Drahé nájemní byty.** Nové nájemní byty do fondu patří: nabízejí bydlení tam, kde se renovace nevyplatí. Na zhruba 3&nbsp;500 bytů ale jde 560 milionů eur, tedy přes 4 miliony korun na byt.
- **Doprava neřeší okamžitý dopad.** Investice do veřejné a poptávkové dopravy jsou podle [Centra pro dopravu a energetiku](https://www.cde-org.cz/media/object/2884/skf_analyza_04_2026.docx.pdf) dlouhodobé a zranitelní na jejich účinek můžou čekat roky. CDE se také ptá, zda nákup bezemisních autobusů opravdu míří na dopravní chudobu.
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
| Příjem domácnosti | Příjmy jednotlivců u finanční správy, ČSSZ a Úřadu práce | Neví, kdo s kým žije. Chybí lidé bez daňového přiznání a bez dávek. |
| Kde domácnost bydlí | Trvalý pobyt v registru obyvatel, typ domu v RÚIAN | Trvalý pobyt je k adrese domu, ne bytu, a často neodpovídá skutečnosti. Katastr zná vlastníka, ne obyvatele. |
| Čím domácnost topí | Údaj o vytápění v RÚIAN, doklady o kontrole kotlů | Údaj v RÚIAN je špatně vyplněný. Kontroly kotlů nejsou centrálně evidované a nerozlišují uhlí od dřeva. |
| Kam poslat peníze | Účty příjemců důchodů a dávek | Centrální evidence bankovních účtů neexistuje. |
{: .table .ets2-tabulka}

**Proč je propojování dat tak těžké:**

- **Stát nemá pojem domácnosti.** Registr obyvatel eviduje jednotlivce a jejich adresu, ale ne, kdo s kým hospodaří. Adresa je místo domu, byty v domě registr nerozlišuje ([zákon o základních registrech](https://www.zakonyprolidi.cz/cs/2009-111)).
- **Každý úřad zná člověka pod jiným identifikátorem.** Základní registry používají pro každou agendu jiný identifikátor (AIFO), propojit údaje dvou úřadů jde jen přes převodník identifikátorů a jen tam, kde to výslovně dovoluje zákon. Sdílení přes propojený datový fond spravuje [Digitální a informační agentura](https://dia.gov.cz).
- **Daňová data chrání mlčenlivost.** Finanční správa může údaje z daňových přiznání předat jinému úřadu jen tam, kde to zákon výslovně umožňuje ([daňový řád, § 52 a násl.](https://www.zakonyprolidi.cz/cs/2009-280)). Podobně jsou chráněná data ČSSZ a Úřadu práce.
- **Úřady nevědí, čím kdo topí.** Takový údaj v žádném použitelném státním registru není.

Když údaj chybí, musí si domácnost zažádat sama. Superdávku, o kterou se žádá, [čerpá jen čtvrtina až polovina oprávněných](https://www.paqresearch.cz/content/files/2026/03/PAQ-CVF_ETS2.pdf). Ze zranitelných domácností podle našeho výpočtu pobírá dávky na bydlení jen 16 %, v rodinných domech na uhlí jen 2 % ([EU-SILC 2024](https://ec.europa.eu/eurostat/web/microdata/european-union-statistics-on-income-and-living-conditions)).

## Jak to dělají jinde?

<div id="zahranici" class="ets2-anchor"></div>

{% capture ex_zahranici %}

| Země | Nástroj | Jak se pozná nárok | Musí se žádat? | Výsledek |
|---|---|---|---|---|
| **Rakousko** | Klimabonus 2022–2024, 145–290 eur ročně (asi 3 500–7 000 Kč) | Hlavní bydliště z registru obyvatel, účet od finanční správy | Ne | Přes 90 % převodem, ostatní poukázka poštou. Stál přes 4,1 mld. eur (asi 100 mld. Kč), víc než vynesla uhlíková daň. Zrušen kvůli rozpočtu. |
| **Francie** | chèque énergie, 48–277 eur ročně (asi 1 200–6 700 Kč) | Příjem z daňových údajů, adresa z daně z bydlení | Do roku 2023 ne | Čerpání 84 %. Po zrušení daně z bydlení stát přišel o adresy, musí se žádat a čerpání kleslo na odhadem 3–12 %. |
| **Španělsko** | bono social térmico, od 50 eur (asi 1 200 Kč) podle klimatické zóny | Automaticky příjemci sociálního tarifu elektřiny | Ne | Funguje automaticky, ale jen pro ty, kdo si dřív požádali o sociální tarif. |
| **Irsko** | Fuel Allowance, 38 eur (asi 920 Kč) týdně po 28 týdnů | Senioři s testem příjmu, příjemci vybraných dávek | Jednou | Vyplácí se s dávkami, každý rok bez nové žádosti. |
| **Polsko** | dodatek węglowy 2022, jednorázově 3 000 zł (asi 16 500 Kč), bez příjmového testu; jiná paliva měla vlastní příspěvek (pelety 3 000, topný olej 2 000, dřevo 1 000, LPG 500 zł) | Uhlí zapsané v registru zdrojů tepla | Ano, na obci | Rozhodovalo uhlí jako hlavní zdroj přiznaný v registru zdrojů tepla k 11. 8. 2022, pozdější přiznání se nepočítala. Bez rozhodného dne by se lidé mohli na uhlí přepsat dodatečně. Obce kontrolovaly kotle v domácnostech. |
| **Německo** | Klimageld, zatím nevyplácený | Daňové číslo a účet | Ne (plán) | Systém pro přímé platby se staví od roku 2021 a stále není hotový. Účet je evidovaný jen u 16 z 86 mil. daňových čísel. |
{: .table .ets2-tabulka}

Zdroje: [Klimabonusgesetz](https://gesetzefinden.at/bundesrecht/bundesgesetze/klibg), [ORF](https://orf.at/stories/3366925/), [ORF](https://orf.at/stories/3293206/), [vienna.at](https://www.vienna.at/klimabonus-faellt-weg-pendler-erhalten-neuen-steuer-ausgleich/9323774), [Hellowatt](https://www.hellowatt.fr/blog/fin-versement-automatique-cheque-energie/), [Consumo Responde](https://www.consumoresponde.es/artículos/el_bono_social_termico), [gov.ie](https://www.gov.ie/fuelallowance), [Infor](https://www.infor.pl/prawo/nowosci-prawne/5578929,Koniec-ze-zmiana-deklaracji-w-CEEB-aby-dostac-dodatek-weglowy.html), [gov.pl](https://www.gov.pl/attachment/6e7dd744-9419-4a2f-bcc7-6b06ae6dd7c1), [Murator: příspěvek na jiná paliva](https://muratordom.pl/prawo/formalnosci-budowlane/ustawa-o-wsparciu-dla-odbiorcow-ciepla-przyjeta-przez-rzad-kto-dostanie-doplate-do-ogrzewania-aa-qavY-pQGp-vDXU.html), [Murator](https://muratordom.pl/prawo/formalnosci-budowlane/zlozyles-wniosek-o-3000-zl-dodatku-weglowego-urzednicy-przyjda-i-sprawdza-czy-na-pewno-palisz-weglem-aa-fKHc-nTQT-1dHk.html), [Bundestag](https://www.bundestag.de/presse/hib/kurzmeldungen-1183566).

**Rakousko po Klimabonusu** přímou náhradu pro domácnosti nezavedlo. Ztrojnásobí daňový odpočet pro dojíždějící, z něhož by nejbohatší pětina dostala asi 250 mil. eur a nejchudší asi 20 mil. ([vienna.at](https://www.vienna.at/vcoe-kritik-an-verdreifachung-von-pendlereuro/9458621)).

{% endcapture %}
{% include expander.html name="zahranici" label="Na okraj: Přímé platby v šesti zemích" content=ex_zahranici %}

**Poučení:**

1. **Automatická výplata všem funguje, ale je drahá.** Rakousko ji zrušilo kvůli rozpočtu.
2. **Automatické cílení funguje, když stát spojí příjem s bydlištěm.** Francie měla vysoké čerpání, dokud tuto vazbu neztratila.
3. **Navázání na existující dávku je levné, ale převezme její nízké čerpání.**
4. **Nárok podle paliva na žádost vede k obcházení.** Rozhodný den musí být známý od začátku a data o palivu musí být taková, která domácnost nemůže sama změnit.

## Jaká je rozumná cesta pro Česko?

Žádný nástroj sám nestačí. Přímá platba pomůže hned, ale dům na uhlí zůstane domem na uhlí. Výměna zdroje pomůže natrvalo, ale trvá roky.

**Nárok by měly jen nízko- a nižší středopříjmové domácnosti.** **Platba by s rostoucím příjmem plynule klesala, bez ostré hranice.** Plnou by dostaly domácnosti do horní hranice 3. decilu ekvivalizovaného příjmu, pak by klesala k nule na hranici 5. decilu (mediánu). Nikdo by tak nepřišel o celou platbu kvůli pár korunám příjmu navíc. Jednotlivec s čistým příjmem do zhruba 31 tis. Kč měsíčně by dostal celou platbu, od 39 tis. Kč nic. U páru jsou hranice 44 a 55 tis. Kč, u čtyřčlenné rodiny 62 a 78 tis. Kč ([EU-SILC 2024](https://ec.europa.eu/eurostat/web/microdata/european-union-statistics-on-income-and-living-conditions), výpočet Fakta o klimatu).

**Výše platby** by se lišila podle paliva a typu bydlení:

| | plyn | tuhá paliva | teplo ze zdroje v ETS2 |
|---|---|---|---|
| rodinný dům | 650 Kč | 1 300 Kč | – |
| byt | 550 Kč | – | 430 Kč |
{: .table .ets2-tabulka}

Částky jsou měsíční a odpovídají průměrnému zdražení vytápění zranitelných domácností v dané skupině, benzín a naftu platba nevyrovnává. Kdyby o platbu požádali všichni oprávnění, stála by v plné výši 6,0 mld. Kč ročně, dostalo by ji 89 % zranitelných domácností a vrátila by jim 72 % zdražení vytápění. Zbylých 11 % jsou domácnosti s jiným nebo kombinovaným vytápěním ([EU-SILC 2024](https://ec.europa.eu/eurostat/web/microdata/european-union-statistics-on-income-and-living-conditions), výpočet Fakta o klimatu). Stát by o ni rozšířil Sociální klimatický plán a navýšení zaplatil z výnosů z dražeb povolenek ETS2 ([víc níže](#financovani)).

**Otevřená otázka: byty na teple z velkých tepláren.** Velké teplárny jsou v [systému povolenek od roku 2005](https://climate.ec.europa.eu/eu-action/carbon-markets/about-eu-ets_en), ETS2 by jejich teplo nezdražilo. Nájemník ale obvykle neví, odkud teplo do domu jde. Nabízí se dvě varianty:

- **Platit jen bytům na teple ze zdroje v ETS2.** Přesnější a levnější: peníze jdou jen tam, kde by ETS2 topení zdražilo. Zdroj tepla by potvrdil dodavatel tepla.
- **Platit všem bytům na dálkovém teple stejně.** Jednodušší na vysvětlení i vyřízení, ale [stálo by to asi 9,5 místo 6,0 mld. Kč ročně](https://ec.europa.eu/eurostat/web/microdata/european-union-statistics-on-income-and-living-conditions) a zranitelným by to nevrátilo víc. Peníze navíc by šly domácnostem, kterým by ETS2 topení nezdražilo.

**Navrhujeme tři kanály podle toho, co už stát o domácnosti ví:**

**1. Příjemci dávek na bydlení: vyšší energetický paušál**

- Příjem i bydlení mají ověřené a superdávka už počítá s energetickým paušálem i se zvláštní částkou na tuhá paliva. Platbu by stačilo přidat k paušálu, [vláda ho může zvýšit nařízením](https://www.epravo.cz/_dataPublic/sbirky/2025/Sb_2025_151_PZZ.pdf).
- **Dosah je ale malý:** dávky na bydlení pobírá jen 16 % zranitelných domácností.

**2. Domácnosti s důchodcem: jednou doložit palivo, pak automaticky s důchodem**

- Tři čtvrtiny zranitelných domácností v rodinných domech mají v domácnosti důchodce. Právě pro starší lidi je opakovaná žádost největší bariéra.
- ČSSZ by vyplácela dočasný příplatek k důchodu, oddělený od valorizace. Jen tak by byl dočasný a šel by platit ze Sociálního klimatického fondu.
- Výše příplatku by závisela na příjmu celé domácnosti a s rostoucím příjmem by plynule klesala, jak je popsáno výše. To vyžaduje spojit důchod s příjmy ostatních osob na stejné adrese, tedy výjimku z ochrany dat popsané výše.
- **ČSSZ neví, čím kdo topí.** Typ domu by šel zjistit z registru adres, palivo ne. Důchodce by proto jednou doložil palivo stejným dokladem jako ostatní žadatelé a dál by platba chodila s důchodem sama. Bez dokladu by stát musel platit všem stejně: domácnost na tuhá paliva by dostala méně, než by ji ETS2 stálo, a domácnost s tepelným čerpadlem peníze, které nepotřebuje.

**3. Ostatní domácnosti: jednoduchá žádost s velkou kampaní**

- **Příjem by si ověřil úřad sám** z dat finanční správy, ČSSZ a Úřadu práce se souhlasem žadatele. Domácnost by nic nedokládala.
- **Domácnost by doložila jen palivo:** vyúčtování plynu (je na něm odběrné místo a spotřeba, takže data od distributorů nejsou potřeba), doklad o kontrole kotle na tuhá paliva, nebo potvrzení od SVJ, družstva či dodavatele tepla. Doklad by musel být z doby před rozhodným dnem, aby se nezopakovalo polské přepisování na uhlí.
- **Kampaň a pomoc obcí:** pro lidi, kteří online žádost sami nezvládnou, by pomohli sociální pracovníci obcí, kontaktní místa a energetické poradny.
- **Riziko:** i s kampaní si část oprávněných nezažádá. Ve Francii po přechodu na žádost kleslo čerpání z 84 % na odhadem 3–12 % ([Hellowatt](https://www.hellowatt.fr/blog/fin-versement-automatique-cheque-energie/)).

Platba by byla dočasná a klesala by podle předem známého plánu: v letech 2028 a 2029 plná, pak by každý rok klesla o čtvrtinu (75, 50 a 25 %) a po roce 2032 by skončila. Domácnost tak ví, kolik a jak dlouho dostane, a má čas vyměnit zdroj, na což jí plán dává investice. Přechod na čistší zdroj by platbu neukončil. Výše by se odvíjela od skutečné ceny povolenky: kdyby byla vyšší než 60 eur za tunu, platba by se úměrně zvýšila. Za roky 2028–2032 by platba stála asi 21 mld. Kč, kdyby o ni požádali všichni oprávnění.


Vedle platby:

- **Dlouhodobě výměna zdroje a zateplení**, nejvíc v rodinných domech na uhlí, s plnou úhradou pro nejchudší, platbou rovnou firmě, průvodcem z obce a kontrolou cen i práce. Hranici zranitelnosti z naší analýzy by šlo použít i jako kritérium pro tyto dotace, například pro nárok na plnou úhradu výměny. Podporu renovací lze posílit i v SO ORP, které [mapa v prvním dílu](/explainery/ets2-zranitelne-domacnosti#mapa-chudoby) ukazuje jako nejohroženější.
- **Platby by postupně ubývaly, investice přibývaly.**
{: .plain}



Výměnu zdroje ani zateplení přitom v bytě nájemník sám nezařídí, rozhoduje majitel domu nebo společenství vlastníků. Pro nájemníky proto zůstává platba hlavní pomocí déle.

Vedle peněz může být stejně velkou překážkou kapacita. Polsko ani Irsko nenarazily na nedostatek dotací, ale na [nedostatek firem, poradců a kontroly](https://demagog.org.pl/analizy_i_raporty/spor-o-program-czyste-powietrze-jest-lepiej-czy-gorzej/); irské domácnosti čekají na plně hrazenou renovaci [kolem dvou let](https://www.oireachtas.ie/en/debates/question/2025-04-29/306). V Česku bude podle ministerstva financí ve vrcholu let 2028–2030 [chybět řádově 31 tisíc pracovníků](#ODKAZ-MF-hlavni-report) jen na renovace podle evropské směrnice o budovách a od roku 2029 se přidá stavba Dukovan. Síť průvodců, cenové stropy a ověřování nároku by proto bylo potřeba připravit předem.

## Kde na to vzít?

<div id="financovani" class="ets2-anchor"></div>

**Peníze by byly.** Domácnosti by v cenách paliv zaplatily za povolenky ETS2 podle [našeho výpočtu](/explainery/ets2-zranitelne-domacnosti#metodika) kolem 26 miliard korun ročně. Povolenky by v cenách paliv platily i firmy, například nákladní doprava, obchody a kanceláře za vytápění budov nebo menší průmyslové provozy. Čeští odběratelé paliv by za roky 2028–2032 zaplatili za povolenky podle našeho odhadu zhruba 195 miliard korun bez DPH. Vycházíme z [emisí v roce 2024](https://ec.europa.eu/eurostat/databrowser/view/env_air_gge/default/table), u budov počítáme s poklesem o 3 % ročně, u dopravy se stagnací a od roku 2028 s mírně nižší spotřebou kvůli vyšším cenám. Podle tempa poklesu v [projekcích ČHMÚ](https://opendata.chmi.cz/air_quality/products/GHG_emissions/projections/documents/Projections_GHG_2025_CZ.pdf) (2025) by to bylo asi o desetinu méně, zhruba 170 miliard. Analýza [PwC pro ministerstvo životního prostředí](https://mzp.gov.cz/system/files/2025-10/Kulaty%CC%81%20stu%CC%8Al%20dopady%20ETS2%20PWC-2.pdf) počítá s nižší cenou povolenky a odhaduje výnos 154–205 miliard za roky 2027–2032, podobný řád vychází i z [evropského odhadu Transport & Environment](https://uploads.transportenvironment.org/production/files/ETS2_implementation_report.pdf) (2025).

Výnos by šel dvěma cestami:

- **Sociální klimatický fond.** Platí se z dražeb v celé EU. Česko z něj může za roky 2026–2032 dostat až [1,56 miliardy eur](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023R0955), při kurzu 24,2 Kč za euro, který [Česká národní banka čeká pro rok 2028](https://www.cnb.cz/cs/menova-politika/prognoza/), asi 38 miliard korun. Nejméně čtvrtinu plánu musí stát doplatit ze svého rozpočtu, celkem tak jde zhruba o 50 miliard. Nařízení sice pro odklad ETS2 kvůli vysokým cenám energií počítá s menším fondem, ETS2 se ale odložilo [jiným nařízením](https://eur-lex.europa.eu/eli/reg/2026/667/oj/ces) a fond podle [Evropské komise](https://eprs.europarl.europa.eu/EPRS_BRI(2025)772878) zůstává stejný. Přímé platby smějí tvořit [nejvýš 37,5 % celkových nákladů plánu](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023R0955) a [měly by být dočasné a postupně klesat](https://oeil.europarl.europa.eu/oeil/en/document-summary?id=1741138), zbytek musí jít na investice. Do fondu přitom čeští odběratelé paliv přispějí zhruba stejně, kolik z něj Česko dostane: podíl Česka na emisích ETS2 v EU je asi 2,5 %, podíl na fondu 2,4 %.
- **Ostatní výnosy z dražeb** by šly rovnou do státního rozpočtu. Česko by z nich dostalo podíl podle svých emisí, tedy zhruba tolik, kolik zaplatí jeho odběratelé paliv. Stát je musí použít na klimatická a sociální opatření. Přímou podporu z nich [směrnice o ETS dovoluje bez pevného limitu](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023L0959), pokud míří na domácnosti s nízkými příjmy.

{% include includes-local/ets2-blog/financovani-tok.html %}

**Jak by se přímá platba zaplatila.** Platba nemusí jít na úkor renovací ani dopravy. Stát musí do plánu přidat [nejméně čtvrtinu nákladů](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023R0955), může ale přidat víc. Navrhujeme proto plán rozšířit: investice by zůstaly, jak je navrhlo ministerstvo životního prostředí, a přímé platby by se přidaly navrch. Navýšení by stát zaplatil z výnosů z dražeb ETS2, kterých by i po zaplacení plánu zbývalo víc než sto miliard. Plán je jeden celek, takže přímé platby by se platily zhruba z poloviny z evropského fondu a z poloviny ze státního rozpočtu. Přímé platby by tvořily necelou třetinu plánu, pod limitem 37,5 %. Vyplácel by je stát přes ČSSZ a Úřad práce, kanály popsané výše, a Evropská komise by fond uvolňovala podle splnění cílů zapsaných v plánu. Podmínkou je, aby plán platbu obsahoval jako dočasnou přímou podporu příjmu. Dnešní návrh plánu ji nemá.

<div id="skf" class="ets2-anchor"></div>

{% capture ex_skf %}

Fond vznikl spolu s ETS2, aby zdražení paliv nedopadlo nejvíc na ty, kdo se mu nemohou vyhnout. Členské státy z něj mají v letech 2026–2032 dostávat peníze na podporu zranitelných domácností a malých firem: na zateplení, výměnu zdrojů, čistší dopravu i dočasné přímé platby. Protože se start ETS2 posunul na rok 2028, chybí fondu na začátku příjmy z dražeb. EU je chce [překlenout dřívějším prodejem povolenek ETS2](https://carbonmarketwatch.org/wp-content/uploads/2026/01/20260105_CMW-feedback-on-ETS2-early-auctioning.pdf). Každý stát k tomu přidává nejméně čtvrtinu z vlastních zdrojů a musí předložit plán, jak peníze použije. Víc o fondu i o využití výnosů z ETS2 v našem [vysvětlení emisních povolenek ETS2](https://faktaoklimatu.cz/explainery/emisni-povolenky-ets-2#soci%C3%A1ln%C3%AD-klimatick%C3%BD-fond-a-dal%C5%A1%C3%AD-vyu%C5%BEit%C3%AD-v%C3%BDnos%C5%AF).

{% endcapture %}
{% include expander.html name="skf" label="Kontext: Co je Sociální klimatický fond?" content=ex_skf %}

Ze samotného fondu by peníze na pomoc zranitelným domácnostem stačily jen zčásti. Pro představu, kolik by stály jednotlivé kroky ročně:

- cílená platba podle paliva a typu bydlení (návrh výše): asi 6 miliard;
- výměna zdrojů ve všech 43 tisících zranitelných domech na uhlí do roku 2032: 2,6–3,5 miliardy, za celé období 2028–2032 tedy zhruba 13–17 miliard;
- síť průvodců, kteří domácnostem pomohou s výměnou: asi čtvrt miliardy.


Záleží tedy na nastavení. Pokud by se část výnosů vracela cíleně, mohly by nejzranitelnější domácnosti dostat zpět víc, než by je zavedení ETS2 stálo, a zbytek by mohl jít na výměnu zdrojů, které jim účty sníží natrvalo.

Všechny tyto odhady předpokládají, že ETS2 začne platit v roce 2028. Pokud by se jeho zavedení odložilo nebo změnilo, posunul by se i výnos a načasování peněz z fondu.

## Jak si stojí návrh PAQ Research a CVF?

[PAQ Research a Centrum pro veřejné finance (2026)](https://www.paqresearch.cz/content/files/2026/03/PAQ-CVF_ETS2.pdf) navrhují kompenzovat ETS2 třemi opatřeními:

- **zvýšení slevy na poplatníka** o 1 200 Kč ročně pro všechny pracující, s náklady 5,9 mld. Kč ročně,
- **mimořádná valorizace důchodů** za 5,5 mld. Kč ročně,
- **zvýšení energetického paušálu o 20 %** pro příjemce dávek na bydlení.

Výhodou návrhu je jednoduchost: využívá existující systémy a nevyžaduje nová data. Podle našeho výpočtu má ale zásadní nevýhody.

<figure class="ets2-figure ets2-graf-fig">
  <h3 class="js-toc-ignore">Cílená platba by vrátila zranitelným víc za menší peníze</h3>
  <p class="ets2-sub">Pravidla přímé platby v základním scénáři: kolik by stála za roky 2028–2032 a jakou část zdražení vytápění by zranitelné domácnosti dostaly zpět v letech plné výše. Náš návrh od roku 2030 klesá, ostatní pravidla platí celých pět let</p>
  <script type="application/json" class="graf-data">{{ site.data.ets2.kompenzace | jsonify }}</script>
  <div class="ets2-graf" data-graf="kompenzace-bod" role="img" aria-label="Pravidla přímé platby: roční náklad proti části zdražení, kterou zranitelné domácnosti dostanou zpět"></div>
  <div class="ets2-src">Zdroj: výpočet Fakt o klimatu z <a href="https://ec.europa.eu/eurostat/web/microdata/european-union-statistics-on-income-and-living-conditions">EU-SILC 2024</a>; návrh PAQ a CVF podle <a href="https://www.paqresearch.cz/content/files/2026/03/PAQ-CVF_ETS2.pdf">PAQ Research a CVF (2026)</a>.</div>
</figure>

| | Návrh PAQ a CVF | Náš návrh |
|---|---|---|
| Náklad ročně | 13,0 mld. Kč | 6,0 mld. Kč |
| Podíl peněz, který by šel zranitelným | 6 % | 33 % |
| Zranitelných by nedostalo nic | 6 % | 11 % |
| Část zdražení vytápění, kterou by zranitelní dostali zpět | 32 % | 72 % |
| z toho rodinné domy na tuhá paliva | 15 % | 78 % |
{: .table .ets2-tabulka}

Zdroj: [EU-SILC 2024](https://ec.europa.eu/eurostat/web/microdata/european-union-statistics-on-income-and-living-conditions), výpočet Fakta o klimatu. Valorizace je rozpočítaná na všechny důchodce se stejným úhrnem jako v návrhu.
{: .ets2-tab-src}

1. **Je drahý a málo cílený.** Sleva na dani jde všem pracujícím, valorizace všem důchodcům. Zranitelným domácnostem by šlo jen 6 % peněz.
2. **Nejvíc zasaženým by vrátil nejméně.** Domácnosti v rodinných domech na uhlí by ETS2 stálo kolem 1 450 Kč měsíčně, návrh by jim vrátil jen 15 % zdražení vytápění. Sleva na dani i valorizace jsou stejné bez ohledu na to, čím domácnost topí.
3. **Většinu by nešlo platit ze Sociálního klimatického fondu.** Fond smí platit jen dočasnou podporu zranitelným domácnostem ([čl. 4 odst. 3 a čl. 8 odst. 2 nařízení 2023/955](https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32023R0955)). Plošná sleva ani valorizace všech důchodů tuto podmínku nesplňují. Valorizace navíc zůstává v důchodu trvale, takže není dočasná. Autoři sami uvádějí, že zbývajících asi 11,5 mld. Kč ročně „by musel financovat státní rozpočet“ ([s. 30](https://www.paqresearch.cz/content/files/2026/03/PAQ-CVF_ETS2.pdf)).
4. **Cílená část dosáhne jen na menšinu.** Energetický paušál dostanou jen příjemci dávek na bydlení, tedy 16 % zranitelných.

<div id="statni-sprava" class="ets2-anchor"></div>

{% capture ex_statni %}

| Kdo | Co by mohl prozkoumat |
|---|---|
| **MPSV a ČSSZ** | Zda jde vyplácet dočasný příplatek k důchodu odděleně od valorizace a jak spojit důchod s příjmy ostatních osob v domácnosti |
| **MPSV a Úřad práce** | Jak by vypadala jednoduchá online žádost, u které úřad ověří příjem sám a žadatel doloží jen palivo; jakou kapacitu by kontrola dokladů vyžadovala |
| **Digitální a informační agentura** | Jak přes propojený datový fond a převodník identifikátorů zpřístupnit Úřadu práce a ČSSZ příjmová data potřebná pro tento účel, a jaký zákonný titul je k tomu potřeba |
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
26. [Infor](https://www.infor.pl/prawo/nowosci-prawne/5578929,Koniec-ze-zmiana-deklaracji-w-CEEB-aby-dostac-dodatek-weglowy.html), [gov.pl](https://www.gov.pl/attachment/6e7dd744-9419-4a2f-bcc7-6b06ae6dd7c1), [Murator: příspěvek na jiná paliva](https://muratordom.pl/prawo/formalnosci-budowlane/ustawa-o-wsparciu-dla-odbiorcow-ciepla-przyjeta-przez-rzad-kto-dostanie-doplate-do-ogrzewania-aa-qavY-pQGp-vDXU.html) – infor.pl
27. [Murator](https://muratordom.pl/prawo/formalnosci-budowlane/zlozyles-wniosek-o-3000-zl-dodatku-weglowego-urzednicy-przyjda-i-sprawdza-czy-na-pewno-palisz-weglem-aa-fKHc-nTQT-1dHk.html) – muratordom.pl
28. [Bundestag](https://www.bundestag.de/presse/hib/kurzmeldungen-1183566) – bundestag.de
29. [vienna.at](https://www.vienna.at/vcoe-kritik-an-verdreifachung-von-pendlereuro/9458621) – vienna.at
30. [kolem dvou let](https://www.oireachtas.ie/en/debates/question/2025-04-29/306) – oireachtas.ie
31. [ministerstvo životního prostředí](https://mzp.gov.cz/cz/agenda/prehled-dotaci/socialni-klimaticky-fond) – mzp.gov.cz
32. [překlenout dřívějším prodejem povolenek ETS2](https://carbonmarketwatch.org/wp-content/uploads/2026/01/20260105_CMW-feedback-on-ETS2-early-auctioning.pdf) – carbonmarketwatch.org
33. [měly by být dočasné a postupně klesat](https://oeil.europarl.europa.eu/oeil/en/document-summary?id=1741138) – oeil.europarl.europa.eu
34. [veřejný ochránce práv: připomínky k první verzi Sociálního klimatického plánu](https://www.ochrance.cz/uploads-import/ESO/57597-2025_soci%C3%A1ln%C3%AD_klimatick%C3%BD_pl%C3%A1n.pdf) – ochrance.cz
35. [Centrum pro dopravu a energetiku: Sociální klimatický plán. Co obsahuje a co v něm chybí? (duben 2026)](https://www.cde-org.cz/media/object/2884/skf_analyza_04_2026.docx.pdf) – cde-org.cz

{% comment %}Dočasné cíle zástupných odkazů #ODKAZ-*, aby prošla kontrola odkazů v buildu. Smazat, až budou odkazy doplněné.{% endcomment %}
<span id="ODKAZ-PDF-studie"></span><span id="ODKAZ-MF-hlavni-report"></span>
