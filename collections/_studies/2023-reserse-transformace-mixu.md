---
layout:        survey
title:         "Proměny mixů výroby elektřiny"
slug:          2023-reserse-transformace-mixu
redirect_from: /2023-reserse-transformace-mixu
weight:        311
published:     2023-05-14
tags-scopes:   [ eu ]
tags-topics:   [ energetika ]
caption:       "Přehled cest, kterými se ubírají vybrané státy Evropy a světa v transformaci mixu výroby elektřiny."
intro: |
  Ve všech státech světa dochází od začátku tisíciletí k proměně mixů výroby elektřiny – v Česku se na výrobě elektřiny stále z více než poloviny podílí fosilní paliva, naopak na Slovensku je to jaderná energie. V souvislosti s klimatickými cíly pro snižování emisí skleníkových plynů však obecně dochází k útlumu elektřiny z fosilních paliv, především z uhlí, a více či méně se zvyšuje zastoupení obnovitelných zdrojů – hlavně větrných a solárních. V několika státech hraje nadále důležitou roli jaderná energetika, avšak přístup k ní se napříč státy liší – zatímco některé v ní vidí cestu k dekarbonizaci (Česko nebo Francie), jiné se rozhodly pro její úplné opuštění (Německo či Itálie).
extra-scripts: [ /assets-local/js/reserse-transformace-mixu.js ]
---

{% assign countries = site.data.reserse-transformace-mixu.items %}

{% include figure.html
name="mix-legenda.png"
name-mobile="mix-legenda.png"
class="narrow-text mb-2"
alt="Legenda k rešerši s následujícím obsahem: Rešerše obsahuje příběhy transformace mixů výroby elektřiny jednotlivých států ve třech různých perspektivách – v grafickém znázornění proměny zastoupení fosilních, obnovitelných a jaderných zdrojů v letech 2000 až 2021, z pohledu základních energetických ukazatelů (podíl jednotlivých zdrojů, celková roční výroba, import/export a emisní intenzita) vycházejících z databáze Ember a formou krátkého textu, který nastiňuje klíčové události z hlediska tamního vývoje elektroenergetiky. Státy je přitom možné řadit podle hodnoty jednotlivých ukazatelů, a to vzestupně i sestupně."
%}

{:.narrow-text  }
**Jak číst grafické znázornění?** Čím blíže je bod vrcholu trojúhelníku (<span style="color:#af69a6">⬤</span> fialová část), tím více jsou v daném roce v mixu výroby elektřiny zastoupena fosilní paliva (uhlí a zemní plyn). Čím blíže je bod levému rohu trojúhelníku (<span style="color:#5988bf">⬤</span> modrá část), tím více je v mixu zastoupena jaderná energie. Čím blíže je bod pravému rohu trojúhelníku (<span style="color:#fcc679">⬤</span> žlutá část), tím více jsou v mixu zastoupeny obnovitelné zdroje energie (vítr, slunce, voda a biomasa).

<ul class="inline-bullet-list">
    {%- for country in countries %}
    <li><a href="#{{ country.code }}">{{ country.name }}</a></li>
    {%- endfor %}
</ul>

<div class="d-none justify-content-end align-items-center">
    <label class="mb-0 mr-2" for="mixes-sort-property-selector">Seřadit podle:</label>
    <select id="mixes-sort-property-selector" class="custom-select w-auto" value="name">
        <option value="name">Názvu</option>
        <option value="fossil">Podílu fosilních paliv</option>
        <option value="nuclear">Podílu jádra</option>
        <option value="renewables">Podílu obnovitelných zdrojů</option>
        <option value="production">Celkové roční výroby</option>
        <option value="netImports">Čistého importu/exportu</option>
        <option value="co2Intensity">Emisní intenzity</option>
    </select>
    <a class="btn btn-secondary sort-order-selector" href="{{ page.url }}">
        <i class="fas fa-arrow-down-a-z"></i>
    </a>
</div>

<div id="mix-transformation-survey-countries">
    {% for country in countries %}
    {% include includes-local/transformace-mixu/country.html
        id=country.code
        name=country.name
        flag-url=country.flag-url
        fossil=country.fossil
        nuclear=country.nuclear
        renewables=country.renewables
        production=country.production
        net-imports=country.net-imports
        co2-intensity=country.intensity
        story=country.text
    %}
    {% endfor %}
</div>
