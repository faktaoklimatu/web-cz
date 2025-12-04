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
        class="card status-{{ facility.status }}"
        data-name="{{ facility.name }}"
    >
        <div class="card-header">
            <div>
                <h3 id="{{ facility.name | slugify: "latin" }}">{{ facility.name }}</h3>
                <h4>{{ facility.name_details }}</h4>
            </div>
            <span class="owner">{{ facility.owner }}</span>
        </div>
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;">
            <div class="card-body">
                <p class="status-line">
                    <i class="status-icon fas {% case facility.status %}{% when "done" %}fa-circle-check{% when "in-progress" %}fa-circle-question{% when "problematic" %}fa-triangle-exclamation{% endcase %}"></i> {{ facility.status_text }}
                </p>
                <p>{{ facility.notes }}</p>
            </div>
            <div class="card-body">
                <dl>
                    <dt>Vytápěné domácnosti</dt>
                    <dd class="households-number{% if facility.num_households %} zero{% endif %}">
                        {{ facility.num_households | round_signif: 2 | format_number }}
                    </dd>
                    {% if facility.share_households %}
                    <dd class="households-share"><span class="figure">{{ facility.share_households }} %</span> domácností</dd>
                    {% endif %}
                    {% if facility.munis_supplied %}
                    <dd class="munis-supplied">{{ facility.munis_supplied }}</dd>
                    {% endif %}
                    {% if facility.x and facility.y %}
                    <dt class="map">
                        <img src="/assets-local/figures/{{ page.slug }}/mapa-cr.svg">
                        <div class="locator" style="left: {{ facility.x }}%; top: {{ facility.y }}%;"></div>
                    </dt>
                    {% endif %}
                    {% if facility.other_heating %}
                    <dd class="other-heating">+ {{ facility.other_heating }}</dd>
                    {% endif %}
                    <dt>Emise skleníkových plynů</dt>
                    <dd>{{ facility.emissions_latest | round_signif: 2 | format_number }} Mt CO<sub>2</sub>eq</dd>
                </dl>
            </div>
            <div class="card-body">
                <dl>
                    <dt>V současnosti využívá</dt>
                    <dd>
                        {% for fuel in facility.fuels_main_today %}
                        <span class="badge badge-pill badge-primary">{{ fuel }}</span>
                        {% endfor %}
                        {% if facility.fuels_secondary_today %} + {% for fuel in facility.fuels_secondary_today %} <span class="badge badge-pill badge-secondary">{{ fuel }}</span>{% endfor %}{% endif %}
                    </dd>
                    <dt>Plánuje využívat</dt>
                    <dd>
                        {% for fuel in facility.fuels_main_future %}
                        <span class="badge badge-pill badge-success">{{ fuel }}</span>
                        {% endfor %}
                        {% if facility.fuels_secondary_future %} + {% for fuel in facility.fuels_secondary_future %} <span class="badge badge-pill badge-secondary">{{ fuel }}</span>{% endfor %}{% endif %}
                    </dd>
                </dl>
            </div>
            <div class="card-body small">
                {% unless facility.mf_subsidies or facility.chp_subsidies %}
                <p>Žádné dotace</p>
                {% endunless %}
                {% if facility.mf_subsidies %}
                <p>Dotace z ModFondu:</p>
                <ul>
                    {% for subsidy in facility.mf_subsidies %}
                    <li>{{ subsidy.name }}<br><b>{{ subsidy.amount | format_number }} mil. Kč</b></li>
                    {% endfor %}
                </ul>
                {% endif %}
                {% if facility.chp_subsidies %}
                <p>Provozní podpora KVET</p>
                <ul>
                    {% for subsidy in facility.chp_subsidies %}
                    <li>({{ subsidy.status }}) {{ subsidy.power }} MWe – {{ subsidy.fuel }} (od {{ subsidy.since }})</li>
                    {% endfor %}
                </ul>
                {% endif %}
            </div>
        </div>
    </div>
    {% endfor %}
</div>
