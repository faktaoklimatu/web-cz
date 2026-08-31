---
layout:           publication
title:            "Analýza opatření pro dekarbonizaci domácností v ČR"
subtitle:         "Co ovlivňuje, zda se vyplatí zateplení, tepelné čerpadlo nebo elektroauto?"
slug:             2026-analyza-opatreni-domacnosti
redirect_from:
  - 2026-analyza-opatreni-domacnosti
published:        2026-07-28
background_color: "#0C80D8"
text_color: "white"
button_style: "btn-outline-light"
organizations:
  - name: "Fakta o klimatu"
    logo: "fakta.svg"
authors:
  - id: "katerina-kolouchova"
  - id: "jan-krcal"
  - id: "petr-danis"
  - ids: ["marcel-otruba"]
    minor-role: "vizualizace a grafická úprava"
  - name: "Barbora Zoja Zuchová"
    minor-role: "korektura"
type:             "Studie"
extra-scripts:
  - /assets-local/figures/2026-analyza-opatreni-domacnosti/srovnani-opatreni-chart.js
  - /assets-local/figures/2026-analyza-opatreni-domacnosti/scenare-cen-energii-chart.js
perex: |
  Rezidenční budovy a osobní automobilová doprava zodpovídají za přibližně čtvrtinu emisí skleníkových plynů v Česku. Domácnosti jsou proto nedílnou součástí úspěšné dekarbonizace. Tato studie srovnává vybraná nízkoemisní opatření u domácností s obdobnými vysokoemisními variantami a ukazuje, jak toto srovnání vychází ekonomicky, emisně a co do závislosti na importu fosilních paliv. Uvažuje přitom různé vstupní parametry těchto opatření a různé scénáře ceny paliv či emisní povolenky.
---

{% include preview-box.html
    title="Interaktivní nástroj"
    text="Můžete si zde sami nastavit vstupní parametry a prohlédnout si detailní srovnání nízkoemisních opatření s jejich emisně náročnějšími alternativami."
    slug="2026-interaktivni-prehled-opatreni-domacnosti"
%}

## Kontext

Svět se začíná postupně odklánět od využívání uhlí, ropy a zemního plynu. To je důsledkem následujících trendů:
* **Technologický pokrok** nízkoemisních technologií
* **Klimatická politika** a zpoplatnění emisí
* **Snaha o nezávislost** na dovozech fosilních paliv

Jednou z cest, jak se na dekarbonizaci mohou podílet domácnosti, jsou **investice do nízkoemisních opatření**, jako jsou:

<div class="row opatreni-ikony">
<div class="col-6 col-md-3">
<img src="/assets-local/figures/2026-analyza-opatreni-domacnosti/ikona-elektromobily.svg" alt="">
Elektromobily
</div>
<div class="col-6 col-md-3">
<img src="/assets-local/figures/2026-analyza-opatreni-domacnosti/tepelne-cerpadlo.svg" alt="">
Tepelná čerpadla
</div>
<div class="col-6 col-md-3">
<img src="/assets-local/figures/2026-analyza-opatreni-domacnosti/zatepleni.svg" alt="">
Zateplení domu
</div>
<div class="col-6 col-md-3">
<img src="/assets-local/figures/2026-analyza-opatreni-domacnosti/fotovoltaika.svg" alt="">
Střešní fotovoltaika
</div>
</div>

## Otázky, na které se studie zaměřuje

<dl id="opatreni-otazky">
<dt>Jak se nízkoemisní opatření vyplatí ekonomicky?</dt>
<dd>Zkoumáme ekonomickou výhodnost za celou dobu životnosti skrze rozdíl v Net Present Value oproti vysokoemisní variantě (např. tepelné čerpadlo vs. plynový kotel).</dd>

<dt>O kolik nízkoemisní opatření sníží emise CO<sub>2</sub>? O kolik sníží import ropy a zemního plynu?</dt>
<dd>Za celý životní cyklus v porovnání s vysokoemisní variantou.</dd>

<dt>Jak výsledek závisí na vstupních parametrech?</dt>
<dd>Modelujeme scénáře s rozdílnými vstupními parametry (např. energetická třída domu), cenami opatření, cenami uhlíku, paliv a elektřiny.</dd>
</dl>

## Výsledky základního scénáře

**Různá opatření přináší různé kombinace výhod.** Řada zkoumaných opatření přináší jak úsporu financí za celou dobu své životnosti, tak snížení emisí CO<sub>2</sub> či importu zemního plynu a ropy. Dekarbonizační opatření už zdaleka nejsou pouze otázkou klimatickou, velká část se vyplatí i ekonomicky a posiluje energetickou soběstačnost Česka díky snížené závislosti na dovozu fosilních paliv.

<div class="longread-figure">
<div id="srovnani-opatreni"></div>
</div>

## Vstupní data a scénáře cen energií

Kompletní sadu vstupních parametrů použitou pro analýzu opatření naleznete v našem [datasetu](https://docs.google.com/spreadsheets/d/1B5GQVkr3jh0dDXflDDjGOmC_nnb_bFX-OwR4t94pfNM/edit?usp=sharing).

Dataset obsahuje i námi definované tři scénáře vývoje cen paliv a elektřiny včetně emisní intenzity a ceny emisní povolenky (v případě net-zero scénáře).

{% include expander-figure.html
    name="scenare-cen-energii"
    label="Scénáře vývoje cen energií"
    class="large-expander-title"
    content="<div id=\"scenare-cen-energii\"></div>"
%}

## Poděkování

Autorský tým děkuje za konzultace Michalu Čejkovi, Karolíně Smutkové, Tomáši Stavovi a Petru Vomáčkovi.
