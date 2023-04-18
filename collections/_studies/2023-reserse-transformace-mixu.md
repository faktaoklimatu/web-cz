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

{% for item in countries %}
{% include includes-local/transformace-mixu/country.html
    id=item.code
    name=item.name
    flag-url=item.flag-url
    fossil=item.fossil
    nuclear=item.nuclear
    renewables=item.renewables
    production=item.production
    co2-intensity=item.intensity
    story=item.text
%}
{% endfor %}