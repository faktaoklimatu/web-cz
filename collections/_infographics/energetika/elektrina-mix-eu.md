---
layout:     infographic
title:      "Podíl zdrojů na výrobě elektřiny v EU a Británii"
slug:       "elektrina-mix-eu"
redirect_from: "/elektrina-mix-eu"
published:  2023-02-24
weight:     92.5
tags-scopes: [ eu ]
tags-topics: [ energetika ]
caption:    "Výroba elektřiny ve státech Evropské unie a ve Velké Británii v roce 2021 podle podílu jaderných, fosilních a obnovitelných zdrojů. V Česku se na výrobě elektřiny podílely z 50 % fosilní paliva, z 37 % jaderná energie a 13 % vyrobily obnovitelné zdroje."
data-orig:  [["Náš Jupyter notebook", "https://github.com/faktaoklimatu/data-analysis/blob/master/notebooks/electricity-mixes-eu.ipynb"]]
---

## Jak číst infografiku

* Infografika znázorňuje **množství vyrobené elektřiny podle jednotlivých zdrojů energie v roce 2021** ve státech EU a ve Velké Británii. Hodnoty jsou uváděny v TWh vyrobené elektřiny za rok.
* Pozice státu v trojúhelníku je definovaná podílem fosilní, jaderné a obnovitelné energie na výrobě elektřiny.
* Čím blíže je stát vrcholu trojúhelníku (<span style="color:#af69a6">⬤</span> fialová část), tím více jsou v jeho mixu výroby elektřiny zastoupena fosilní paliva (uhlí a zemní plyn).
* Čím blíže je stát levému rohu trojúhelníku (<span style="color:#5988bf">⬤</span> modrá část), tím více je v jeho mixu zastoupena jaderná energie. Lze vidět, že v přibližně polovině států EU se pro výrobu elektřiny jaderná energie vůbec nevyužívá (jde o státy, které leží na pravém rameni trojúhelníku).
* Čím blíže je stát pravému rohu trojúhelníku (<span style="color:#fcc679">⬤</span> žlutá část), tím více jsou v jeho mixu zastoupeny obnovitelné zdroje energie (vítr, slunce, voda a biomasa).

## Cesty transformace v Česku, Německu a Polsku

{% include preview-box.html
    title="Proměny elektroenergetiky v Evropě a dalších státech"
    text="Další příběhy transformace, včetně grafického provedení, přinášíme v samostatné rešerši."
    slug="2023-reserse-transformace-mixu"
%}

Pro bližší představu přinášíme základní informace o elektroenergetice v Česku, Německu a Polsku.

### Česko

**Hlavním zdrojem elektřiny Česka je stále uhlí**, které má skončit v roce 2033[^programove-prohlaseni]. Dalším významným producentem elektřiny jsou **čtyři bloky v jaderné elektrárně Dukovany a dva bloky v Temelíně**. V současnosti [probíhá tendr](https://oenergetice.cz/jaderne-elektrarny/tendr-na-dukovansky-blok-postoupi-do-dalsi-faze-vyprsi-termin-pro-prvni-nabidky) na výstavbu dalšího bloku v Dukovanech. Rozvoj solární energie byl koncem předminulé dekády utlumen kvůli [špatně nastavenému systému financování](https://www.irozhlas.cz/zpravy-domov/fotovoltaika-energetika-obnovitelne-zdroje_1912040600_jab) a od té doby vidíme spíše stagnaci. U větrné energie je situace podobná.

### Německo

Německo se se svou politikou [**Energiewende**](https://www.cleanenergywire.org/easyguide) staví do pozice jednoho z hlavních lídrů přechodu na obnovitelné zdroje energie a chce být první velkou průmyslovou ekonomikou, která provede udržitelnou energetickou tranzici. Součástí tohoto plánu je další **budování elektráren na obnovitelné zdroje**, ale zároveň i **tranformace přenosové sítě**, aby se elektřina z větru, produkovaná převážně na severu Německa, dostala na průmyslový jih země. Energiewende znamená ovšem i **odstup od jaderné energie**, který měl nastat do konce roku 2022, ovšem v důsledku energetické krize [dochází k odkladu](https://www.dw.com/en/germany-extends-lifetime-of-all-3-remaining-nuclear-plants/a-63466196) uzavření zbývajících tří doposud neodstavených jaderných elektráren. I kvůli probíhajícímu odstupu od jaderné energie Německo stále ve velkém spoléhá na využívání fosilních paliv, zejména uhlí a plynu. Šest z deseti největších uhelných elektráren v EU se nachází [v Německu](https://www.statista.com/statistics/1264199/largest-operational-coal-power-plants-by-capacity-in-the-eu-27/)[^lutzerath], přičemž kompletní [odklon od uhlí](/infografiky/uhelny-phaseout-eu) má podle programového prohlášení současné vlády nastat ideálně v roce 2030.

### Polsko

Polsko je nadále **silně závislé na uhlí** a najdeme zde i [největší uhelnou elektrárnu](https://cs.wikipedia.org/wiki/Elektr%C3%A1rna_Be%C5%82chat%C3%B3w) v EU (poblíž města Bełchatów). Uhlí má dosud velkou podporu mezi politiky i odbory. Polská vláda společně s odbory podepsala [dohodu](https://www.cire.pl/artykuly/serwis-informacyjny-cire-24/175624-podpisano-porozumienie-w-sprawie-zasad-i-tempa-transformacji-gornictwa), ve které přislíbila podporovat těžbu uhlí až do roku 2049. Polsko dále vnímá hrozbu závislosti na ruském plynu, proto investovalo do strategických projektů s cílem zvýšit možnou kapacitu dovozu zkapalněného plynu, například přes [LNG terminál ve Świnoujście](https://warsawinstitute.review/news-en/the-importance-of-the-swinoujscie-lng-terminal-in-light-of-the-energy-crisis-in-europe/). Země v posledních letech rovněž **významně rozvíjí větrné a solární zdroje**. Dlouhodobým strategickým cílem v energetice je i postavení první [polské jaderné elektrárny](https://world-nuclear.org/information-library/country-profiles/countries-o-s/poland.aspx), nicméně budoucnost tohoto projektu zůstává nejistá.

## Mix výroby elektřiny vs. energetický mix

Mix výroby elektřiny zobrazuje kombinaci různých zdrojů, jež se využívají k výrobě elektřiny. Od energetického mixu se odlišuje tím, že **ukazuje pouze produkci elektřiny, nikoli celkové využívání energie**. Mix výroby elektřiny je užitečný k zobrazení procentuální závislosti na různých zdrojích, a lze se tak dívat třeba na to, jaké zastoupení v dané zemi mají nízkouhlíkové či obnovitelné zdroje.

Kromě relativního zastoupení jednotlivých zdrojů, je potřeba brát v úvahu i exportní bilanci země. Některé země mají z hlediska produkce elektřiny velmi čistý energetický mix, jejich produkce ale nepokrývá celou domácí spotřebu elektřiny a další elektřinu importují z fosilních zdrojů ze zahraničí. Skutečná uhlíková stopa takové země pak může být vyšší než u země, která je ve své domácí výrobě procentuálně více závislá na fosilních palivech. I přesto se jedná o užitečný nástroj k porovnávání různých zemí, zejména pokud jej zkombinujeme s poměrem produkce a spotřeby a uhlíkovou intenzitou.

## Zdroj dat a poznámky

Infografika je založená na datech o výrobě a spotřebě elektřiny od organizace [Ember](https://ember-climate.org/). Jedná se o nezávislý klimatický think-tank, zaměřený na podporu přechodu od uhlí k čistým zdrojům elektřiny. Ember vychází především z dat Eurostatu (pro roky 2000–2019), novější data byla doplněna z ENTSO-E a z dalších zdrojů.

[^programove-prohlaseni]: Rok 2033 vychází z [programového prohlášení](https://www.vlada.cz/assets/jednani-vlady/programove-prohlaseni/programove-prohlaseni-vlady-Petra-Fialy.pdf) vlády Petra Fialy.
[^lutzerath]: V Německu je tak těžba uhlí velké společenské téma – na začátku roku 2023 například probíhaly [protesty](https://www.reuters.com/business/environment/germanys-rwe-calls-end-showdown-over-coal-mine-expansion-2023-01-11/) proti bourání vesnice Lützerath právě kvůli těžbě uhlí.
