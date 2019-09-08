---
layout:     default
title:      "Slovník pojmů"
slug:       slovnik
---
<!--
ukázka jak používat hesla v textech stránek: {% include glossary.html id='chmu' %}
-->

<p>Stručný přehled nejčastěji používaných hesel a zkratek s krátkým vysvětlením či komentářem.</p>
<p>&nbsp;</p>

{% for item in site.data.glossary %}
<h2 id="{{ item.id }}" class="notransform">{{ item.name-short }}</h2>
<p>{{ item.name-long }} &ndash; {{ item.description }}</p>
{% endfor %}
