---
layout:        survey
type:          "Interaktivní přehled"
title:         "Odchod velkých tepláren od uhlí"
slug:          2026-odchod-teplaren-od-uhli
redirect_from:
- /2026-odchod-teplaren-od-uhli
- /dashboard-teplaren
- /odchod-teplaren-od-uhli
weight:        209
published:     2026-02-09
tags-scopes:   [ cesko ]
tags-topics:   [ energetika ]
# use-preview-image: true
caption:       "V jakém stavu je odchod od uhlí u velkých tepláren v Česku?"
intro: |
    Tento přehled ukazuje stav odchodu od uhlí velkých teplárenských soustav v Česku. Ty dohromady zásobují přes milion českých domácností, což jsou skoro tři čtvrtiny všech domácností vytápěných dálkovým teplem. Naprostá většina z nich buď od uhlí už odešla nebo odchod od uhlí připravuje.
extra-scripts: [ /assets-local/js/dashboard-teplaren.js ]
---
<div class="narrow-text" markdown="1">
<div id="last-updated" class="small">
Poslední aktualizace dat: {{ site.data["dashboard-teplaren"].timestamp | date: "%-d. %-m. %Y" }}
<div markdown="1">
(chyby a nepřesnosti prosíme hlaste na [info@faktaoklimatu.cz](mailto:info@faktaoklimatu.cz))
</div>
</div>
{% capture methodology %}

Tato rešerše je založena na celé řadě datových zdrojů (včetně ručního dohledávání veřejných informací).

#### Seznam teplárenských celků

Primárním zdrojem pro **seznam zařízení**  je [registr ETS 1](https://climate.ec.europa.eu/eu-action/carbon-markets/eu-emissions-trading-system-eu-ets/union-registry_en). Ten obsahuje lokality, na kterých je alespoň jeden zdroj s výkonem nad 20 MWt. Zařízení z tohoto registru jsou **ručně sloučena** do smysluplných větších teplárenských celků (každý takový celek je buď propojený rozvodnou sítí nebo jeho zařízení mají jednoho vlastníka a dodávají teplo do stejného města). K celkům jsou ručně přidané údaje o zařízeních pro energetické využití odpadu (prozatím mimo ETS 1).

Pro přehlednost jsou zde jen **větší teplárenské celky**, které dodávají teplo alespoň do 6 000 domácností nebo mají roční emise vyšší než 200 000 t CO<sub>2</sub> (a nebo mají přidělenu alespoň miliardovou dotaci z Modernizačního fondu). Kompletní seznam všech celků a jednotlivých zařízení obsahuje naše [tabulka s daty](https://docs.google.com/spreadsheets/d/1l7xMSDAxTTECF9JDzXAMPVOGy7_vZao12-MpD7_ZBuQ/edit?gid=775800394#gid=775800394).

#### Údaje o teplárnách

- **Počet domácností odebírajících teplo** z daného teplárenského celku je založený na veřejných datech ze [Sčítání lidí, domů a bytů 2021](https://scitani.gov.cz/). Pro každý celek byl do rešerše ručně doplněn seznam zásobovaných oblastí (obcí či městských částí). Pro každou takovou oblast je v datech ze sčítání odhadnutý počet domácností, které zde byly v roce 2021 zásobované dálkovým teplem. Jde tedy o několik let starý statistický odhad, nemusí přesně odpovídat současné realitě. Zobrazen je celkový součet zaokrouhlený na celé tisíce.
- **Emise skleníkových plynů** pocházejí z tabulky [ověřených emisí](https://climate.ec.europa.eu/document/download/385daec1-0970-44ab-917d-f500658e72aa_en?filename=verified_emissions_2024_en.xlsx) z registru ETS 1.
- **Dotace z Modernizačního fondu** (program HEAT) jsou založené na [veřejných datech](https://sfzp.gov.cz/dotace-a-pujcky/modernizacni-fond/schvalene-projekty/) od SFŽP, **provozní dotace KVET** pak na veřejných tabulkách ([2024/01](https://mpo.gov.cz/assets/cz/energetika/2024/11/Zprava-o-hodnoceni-1-aukce-na-podporu-elektriny-z--vysokoucinne_KVET-pro-rok-2024.pdf), [2024/02](https://mpo.gov.cz/assets/cz/energetika/2025/3/Zprava-o-hodnoceni-2-aukce-na-podporu-elektriny-z-KVET-pro-rok-2024-_1.pdf) a [2025/01](https://mpo.gov.cz/assets/cz/energetika/2025/9/Vyhodnoceni-nabidek-z-vyhlasenych-aukci-na-podporu-elektriny-z--vysokoucinne_KVET---1--vyzna-k-podani-nabidek-v-aukci-pro-rok-2025_1.pdf)) od Ministerstva průmyslu a obchodu (v obou případech s ručním přiřazením k teplárenským celkům).
- **Popis transformace teplárenských celků a jejich celkový stav** stejně jako jejich **vlastník** a **současná skladba paliv i ta plánovaná v budoucnu** jsou údaje založené na veřejných informacích: mediálních výstupech, webu vlastíka, žádostech EIA, dokumentaci IPPC, apod.
- Paliva jsou u teplárenských celků seřazená podle jejich odhadovaném podílu na mixu (v roce 2025). Jako doplňková jsou označena ta paliva, která podle našich odhadů tvoří méně než 15 % mixu. Ve všech případech ovšem jde o relativně hrubé odhady, protože přesné údaje o palivovém mixu tepláren nejsou veřejně dostupné.

Kompletní data najdete v doprovodné [tabulce](https://docs.google.com/spreadsheets/d/1l7xMSDAxTTECF9JDzXAMPVOGy7_vZao12-MpD7_ZBuQ). V ručně shromážděných údajích samozřejmě mohou být chyby či nepřesnosti. Ty prosíme hlaste na [info@faktaoklimatu.cz](mailto:info@faktaoklimatu.cz), včetně odkazu na veřejný aktuální zdroj dat, který uvádí opravený údaj.

{% endcapture %}

{% include expander-figure.html
    name="methodology"
    class="small-expander-title"
    label="Odkud pochází data a další metodika"
    content=methodology
%}
</div>

{% assign facilities = site.data.dashboard-teplaren.items %}
{% assign highlights = site.data.dashboard-teplaren.highlights %}

<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
  window.DASHBOARD_TEPLAREN = {
    highlights: {{ site.data["dashboard-teplaren"].highlights | jsonify }},
    facilities: {{ site.data["dashboard-teplaren"].items | jsonify }},
    num_households_ets2_total: {{ site.data["dashboard-teplaren"].num_households_ets2_total | jsonify }}
  };
</script>

<div id="overall-charts">
    <div id="map"></div>
    <div id="status-cards">
        {% for item in highlights %}
        <div class="card status-{{ item.status }}">
            <div class="card-body">
                <h3>
                    {% case item.status %}
                    {% when "done" %} {% include includes-local/dashboard-teplaren/status-icon.html status=item.status %} Odchod od uhlí dokončen
                    {% when "in-progress" %} {% include includes-local/dashboard-teplaren/status-icon.html status=item.status %} Odchod od uhlí probíhá
                    {% when "problematic" %} {% include includes-local/dashboard-teplaren/status-icon.html status=item.status %} Nejasný odchod od uhlí
                    {% when "not-shown" %} {% include includes-local/dashboard-teplaren/status-icon.html status=item.status %} Není zde všechno
                    {% endcase %}
                </h3>
                {% if item.status == "not-shown" %}
                    <p class="small">Pro přehlednost zde nejsou zobrazené menší teplárny v ETS 1 a dále malé teplárny a výtopny mimo systém ETS 1, kterých jsou dohromady stovky.</p>
                {% else %}
                    <p><i class="fa-solid fa-industry"></i> <b>{{ item.number }}</b> {% if item.number > 4 %}soustav{% else %}soustavy{% endif %}</p>
                    <p><i class="fa-solid fa-house-fire"></i> <b>{{ item.num_households | round_signif: 2 | format_number }}</b> domácností</p>
                {% endif %}
            </div>
        </div>
        {% endfor %}
    </div>
    <div id="subsidies-cards">
        <div class="card">
            <div class="card-body">
                <h3><i class="fas fa-sack-dollar"></i> Dotace a provozní podpora</h3>
                <p><b>{{ site.data.dashboard-teplaren.mf_chp_subsidies_total | format_number }}</b> mil. Kč z Modernizačního fondu</p>
                <p><b>{{ site.data.dashboard-teplaren.chp_subsidies_total_accepted | format_number }}</b> MWe s provozní podporou KVET</p>
            </div>
        </div>
    </div>
</div>

<div id="controls-status">
    <p>Filtr podle <b>stavu odchodu od uhlí</b></p>
    <div class="forms">
        <div class="form-check status-problematic">
            <input class="form-check-input" type="checkbox" value="" id="checkProblematic" checked>
            <label class="form-check-label" for="checkProblematic">Nejasný odchod</label>
        </div>
        <div class="form-check status-in-progress">
            <input class="form-check-input" type="checkbox" value="" id="checkInProgress" checked>
            <label class="form-check-label" for="checkInProgress">Probíhající odchod</label>
        </div>
        <div class="form-check status-done">
            <input class="form-check-input" type="checkbox" value="" id="checkDone" checked>
            <label class="form-check-label" for="checkDone">Dokončený odchod</label>
        </div>
    </div>
</div>

<div id="tabulka-dashboard-teplaren">
    {% for facility in facilities %}
    {% include includes-local/dashboard-teplaren/teplarenska-soustava.html
        facility=facility
    %}
    {% endfor %}
</div>
