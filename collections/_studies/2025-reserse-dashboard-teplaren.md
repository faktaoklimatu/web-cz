---
layout:        survey
title:         "Plány odchodu od uhlí velkých teplárenských soustav"
slug:          2025-reserse-dashboard-teplaren
redirect_from:
- /2025-reserse-dashboard-teplaren
- /dashboard-teplaren
weight:        209
published:     2025-12-20
tags-scopes:   [ cesko ]
tags-topics:   [ energetika ]
# use-preview-image: true
caption:       "Přehled scénářů transformace českých tepláren spalujících uhlí"
intro: |
    Tato rešerše ukazuje 32 největších teplárenských soustav, které dohromady zásobují přes milion českých domácností, což je 69 % všech domácností výtápěných dálkovým teplem. (Dalších 5 % tvoří menší soustavy v systému EU ETS 1, zbylyých 26 % pak soustavy mimo systém EU ETS 1.)
---

{% assign facilities = site.data.dashboard-teplaren.items %}

<ul class="inline-bullet-list" style="font-size: .8rem;">
    {%- for facility in facilities %}
    <li><a href="#{{ facility.name | slugify: "latin" }}">{{ facility.name }}</a></li>
    {%- endfor %}
</ul>

<div id="tabulka-reserse-teplaren">
    {% for facility in facilities %}
    <div
        class="card"
        data-name="{{ facility.name }}"
    >
        <h5 class="card-header" id="{{ facility.name | slugify: "latin" }}">
            {{ facility.name }}<span class="owner">{{ facility.owner }}</span>
        </h5>
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;">
            <div class="card-body">
                {{ facility.status }}<br/>
                {{ facility.notes }}
            </div>
            <div class="card-body">
                <dl>
                    <dt>Vytápěné domácnosti</dt>
                    <dd>{{ facility.num_households }}</dd>
                    {% if facility.other_heating %}
                    <dd>{{ facility.other_heating }}</dd>
                    {% endif %}
                    <dt>Emise skleníkových plynů</dt>
                    <dd>{{ facility.emissions_latest }} Mt CO<sub>2</sub>eq</dd>
                </dl>
            </div>
            <div class="card-body">
                <dl>
                    <dt>V současnosti využívá</dt>
                    <dd>{{ facility.fuels_main_today }}{% if facility.fuels_secondary_today %} + {{ facility.fuels_secondary_today }}{% endif %}</dd>
                    <dt>Plánuje využívat</dt>
                    <dd>{{ facility.fuels_main_future }}{% if facility.fuels_secondary_future %} + {{ facility.fuels_secondary_future }}{% endif %}</dd>
                </dl>
            </div>
            <div class="card-body">
                Dotace z ModFondu
            </div>
        </div>
    </div>
    {% endfor %}
</div>
