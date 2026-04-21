---
layout:        survey
type:          "Interaktivní přehled"
title:         "Opatření pro dekarbonizaci domácností"
slug:          2026-opatreni-dekarbonizace-domacnosti
redirect_from:
- /opatreni-dekarbonizace-domacnosti
weight:        210
published:     2026-04-21
tags-scopes:   [ cesko ]
tags-topics:   [ opatreni, budovy, doprava ]
caption:       "Jak jsou nákladově efektivní různá opatření pro dekarbonizaci domácností?"
intro: |
    Tento přehled porovnává nákladovou efektivitu opatření pro dekarbonizaci domácností – jak v oblasti budov, tak v dopravě. Pro každé opatření lze porovnat jeho efektivitu v různých kontextech (typ budovy nebo vozidla).
---

<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
  window.COSTS_AND_BENEFITS = {{ site.data["costs-and-benefits"] | jsonify }};
</script>

{% assign data = site.data["costs-and-benefits"] %}

# Budovy

{% assign building_measure_names = "" | split: "" %}
{% for measure in data.buildings_measures %}
  {% if measure.measure_baseline_id %}
    {% unless building_measure_names contains measure.measure_name %}
      {% assign building_measure_names = building_measure_names | push: measure.measure_name %}
    {% endunless %}
  {% endif %}
{% endfor %}

{% for name in building_measure_names %}
## {{ name }}

{% endfor %}

# Doprava

{% assign transport_measure_names = "" | split: "" %}
{% for measure in data.transport_measures %}
  {% if measure.measure_baseline_id %}
    {% unless transport_measure_names contains measure.measure_name %}
      {% assign transport_measure_names = transport_measure_names | push: measure.measure_name %}
    {% endunless %}
  {% endif %}
{% endfor %}

{% for name in transport_measure_names %}
## {{ name }}

{% endfor %}
