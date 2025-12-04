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

<ul class="inline-bullet-list" style="font-size: .8rem;">
    {%- for facility in facilities %}
    <li><a href="#{{ facility.name | slugify: "latin" }}">{{ facility.name }}</a></li>
    {%- endfor %}
</ul>

<div id="tabulka-dashboard-teplaren">
    {% for facility in facilities %}
    {% include includes-local/dashboard-teplaren/teplarenska-soustava.html
        facility=facility
    %}
    {% endfor %}
</div>
