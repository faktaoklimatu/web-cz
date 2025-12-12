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
    Tato rešerše ukazuje 32 největších teplárenských soustav, které dohromady zásobují přes milion českých domácností, což je 69 % všech domácností výtápěných dálkovým teplem. (Dalších 5 % tvoří menší soustavy v systému EU ETS 1, zbylých 26 % pak soustavy mimo systém EU ETS 1.)
---

{% assign facilities = site.data.dashboard-teplaren.items %}
{% assign highlights = site.data.dashboard-teplaren.highlights %}

<script src="https://d3js.org/d3.v7.min.js"></script>

<div id="highlights-dashboard-teplaren" class="card-deck mb-4">
    {% for item in highlights %}
    <div class="card status-{{ item.status }}">
        <div class="card-body">
            <h3>
                {% case item.status %}
                {% when "done" %} Odchod od uhlí dokončen
                {% when "in-progress" %} Odchod od uhlí probíhá
                {% when "problematic" %} Nejasný odchod od uhlí
                {% endcase %}
            </h3>
            <h4>
                {% include includes-local/dashboard-teplaren/status-icon.html status=item.status %}
                <b>{{ item.number }}</b> soustav
            </h4>
            <p><b>{{ item.num_households | round_signif: 2 | format_number }}</b> domácností</p>
            <p><b>{{ item.ghg_share | round_signif: 2 | format_number }} %</b> emisí ČR</p>
        </div>
    </div>
    {% endfor %}
</div>

<div class="overal-grpahics-dashboard-teplaren">
    <div class="map" id="dashboard-teplaren-map" data-facilities='{{ facilities | jsonify | escape }}'>
        <h4>Mapa tepláren</h4>
    </div>
    <div class="treemap">
        <h4>Podíl českých domácností připojených na CZT</h4>
        {% include figure.html
            name="treemap-domacnosti.png"
            alt=""
            source-text=""
        %}
    </div>
</div>

<div id="toc-dashboard-teplaren">
    <div class="controls">
        <div class="form-check status-problematic">
            <input class="form-check-input" type="checkbox" value="" id="checkProblematic" checked>
            <label class="form-check-label" for="checkProblematic">Problematické</label>
        </div>
        <div class="form-check status-in-progress">
            <input class="form-check-input" type="checkbox" value="" id="checkInProgress" checked>
            <label class="form-check-label" for="checkInProgress">Probíhající</label>
        </div>
        <div class="form-check status-done">
            <input class="form-check-input" type="checkbox" value="" id="checkDone" checked>
            <label class="form-check-label" for="checkDone">Dokončené</label>
        </div>
    </div>
    <ul class="inline-bullet-list flex-grow-1">
        {%- for facility in facilities %}
        <li class="status-{{ facility.status }}">
            <a href="#{{ facility.name | slugify: "latin" }}">{{ facility.name }}</a>
        </li>
        {%- endfor %}
    </ul>
</div>

<div id="tabulka-dashboard-teplaren">
    {% for facility in facilities %}
    {% include includes-local/dashboard-teplaren/teplarenska-soustava.html
        facility=facility
    %}
    {% endfor %}
</div>