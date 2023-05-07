---
layout:        survey
title:         "Proměny energetických mixů"
slug:          2023-reserse-transformace-mixu
redirect_from: /2023-reserse-transformace-mixu
weight:        311
published:     2023-05-14
tags-scopes:   [ eu ]
tags-topics:   [ energetika ]
caption:       "Přehled cest, kterými se ubíraly vybrané státy Evropy a světa v transformaci výroby elektřiny."
intro: |
  TODO: Napsat perex
---

{% assign countries = site.data.reserse-transformace-mixu.items %}

TODO: Napsat intro

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

<div id="country-cards-container" class="d-flex flex-column">
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
    const $countryCards = $('#country-cards-container > .card');
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
