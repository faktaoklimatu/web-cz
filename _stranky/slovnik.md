---
layout:     default
title:      "Slovník pojmů"
slug:       slovnik
published:  false
---
Intro odstavec: Toto je slovnik pojmov, preco je tam, co v nom najdu, ...

Ukazka vkladania vstupov slovnika do textu: Napr. zmienit {% include glossary.html id='chmu' %} alebo inu instituciu.

{% for item in site.data.glossary %}
<h2 id="{{ item.id }}">{{ item.name-long }}</h2>
<p>{{ item.description }}</p>
{% endfor %}