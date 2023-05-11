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
  Nejen v Evropě, ale i v jiných státech světa dochází od začátku tisíciletí k proměně mixů výroby elektřiny a rolí jednotlivých zdrojů. V souvislosti s klimatickými cíly pro snižování emisí skleníkových plynů dochází k útlumu elektřiny z fosilních paliv, především z uhlí, a více či méně se zvyšuje zastoupení obnovitelných zdrojů – hlavně větrných a solárních. V několika státech hraje nadále důležitou roli jaderná energetika, avšak přístup k ní se napříč státy liší – zatímco některé v ní vidí cestu k dekarbonizaci (Česko nebo Francie), jiné se rozhodly pro její úplné opuštění (Německo či Itálie).
---

{% assign countries = site.data.reserse-transformace-mixu.items %}

Rešerše obsahuje příběhy transformace mixů výroby elektřiny jednotlivých států ve třech různých perspektivách – v **grafickém znázornění** proměny zastoupení fosilních, obnovitelných a jaderných zdrojů v letech 2000 až 2021, z pohledu **základních energetických ukazatelů** (podíl jednotlivých zdrojů, celková roční výroba, import/export a emisní intenzita) vycházejících z databáze Ember a formou **krátkého textu**, který nastiňuje klíčové události z hlediska tamního vývoje elektroenergetiky. Státy je přitom možné řadit podle hodnoty jednotlivých ukazatelů, a to vzestupně i sestupně.

**Jak číst grafické znázornění?** Čím blíže je bod vrcholu trojúhelníku (<span style="color:#af69a6">⬤</span> fialová část), tím více jsou v daném roce v mixu výroby elektřiny zastoupena fosilní paliva (uhlí a zemní plyn). Čím blíže je bod levému rohu trojúhelníku (<span style="color:#5988bf">⬤</span> modrá část), tím více je v mixu zastoupena jaderná energie. Čím blíže je bod pravému rohu trojúhelníku (<span style="color:#fcc679">⬤</span> žlutá část), tím více jsou v mixu zastoupeny obnovitelné zdroje energie (vítr, slunce, voda a biomasa).

<ul class="inline-bullet-list">
    {%- for item in countries %}
    <li><a href="#{{ item.code }}">{{ item.name }}</a></li>
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
        <!-- FIXME: Broken for now. localeCompare() does not take the minus sign into account. -->
        <option value="netImports">Čistého importu/exportu</option>
        <option value="co2Intensity">Emisní intenzity</option>
    </select>
    <a class="btn btn-secondary sort-order-selector" href="{{ page.url }}">
        <i class="fas fa-arrow-down-a-z"></i>
    </a>
</div>

<div id="mix-transformation-survey-countries">
    {% for item in countries %}
    {% include includes-local/transformace-mixu/country.html
        id=item.code
        name=item.name
        flag-url=item.flag-url
        fossil=item.fossil
        nuclear=item.nuclear
        renewables=item.renewables
        production=item.production
        net-imports=item.net-imports
        co2-intensity=item.intensity
        story=item.text
    %}
    {% endfor %}
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const alphabeticProperties = ['name'];
    const $propertySelector = $('#mixes-sort-property-selector');
    const $sortOrderButton = $propertySelector.siblings('.sort-order-selector').first();
    const $countryCards = $('#mix-transformation-survey-countries > .card');
    let sortProperty = $propertySelector[0].value;
    // 1 = ascending (A→Z, 0→9), -1 = descending (Z→A, 9→0)
    let sortOrder = 1;

    $propertySelector.parent().removeClass('d-none').addClass('d-flex');

    const sortCards = () => {
        // Update UI.
        if (alphabeticProperties.includes(sortProperty)) {
            if (sortOrder === 1) {
                $sortOrderButton.find('i')[0].className = 'fas fa-arrow-down-a-z';
            } else {
                $sortOrderButton.find('i')[0].className = 'fas fa-arrow-down-z-a';
            }
        } else {
            if (sortOrder === 1) {
                $sortOrderButton.find('i')[0].className = 'fas fa-arrow-down-1-9';
            } else {
                $sortOrderButton.find('i')[0].className = 'fas fa-arrow-down-9-1';
            }
        }

        // Sort the cards using CSS order property.
        const compare = (a, b) => {
            const propA = a.dataset[sortProperty];
            const propB = b.dataset[sortProperty];
            return sortOrder * propA.localeCompare(propB, 'cs', { numeric: true });
        };

        $countryCards.get().sort(compare).forEach((card, i) => {
            card.style.order = 1 + i;
        });
    };

    $sortOrderButton.on('click', (event) => {
        sortOrder *= -1;
        sortCards();
        event.preventDefault();
    });

    $propertySelector.on('change', ({ target }) => {
        sortProperty = target.value;
        sortCards();
    });
});
</script>
