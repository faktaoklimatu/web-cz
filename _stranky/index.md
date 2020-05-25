---
layout: empty
title: Fakta o klimatu
slug: index
---
<div class="section intro pb-4">
    <div class="container">
        <h1 id="home">Fakta o změně<br>klimatu</h1>
        <span class="tagline">Veřejně dostupné infografiky a datasety</span>
        <p>Shromažďujeme data o klimatu a klimatické změně, která poskytují vědecké instituce (ČHMÚ, NASA, Eurostat a jiné) a zpracováváme z nich grafy a infografiky pro další použití.<br/>
            <a href="/aktuality" class="btn btn-secondary mt-3"><i class="fas fa-fw fa-newspaper"></i> Aktuality</a>
            <a href="https://twitter.com/{{ site.twitter }}" target="_blank" class="btn btn-secondary mt-3"><i class="fab fa-fw fa-twitter"></i> Twitter</a>
            <a href="{{ site.newsletter }}" target="_blank" class="btn btn-secondary mt-3"><i class="fas fa-fw fa-envelope-open-text"></i> Newsletter</a>
        </p>
        <hr/>
        <span class="tagline">Přehled témat, kterým se věnujeme</span>
        <div class="tags-list">
            {% assign tags-scopes-all = site.data.tags_categorized.tags-scopes | map: "id" %}
            {% include tags.html tags=tags-scopes-all link="true" friendly-name="true" container-class="mt-4" %}
            {% assign tags-topics-all = site.data.tags_categorized.tags-topics | map: "id" %}
            {% include tags.html tags=tags-topics-all link="true" %}
        </div>
    </div>
</div>

{% assign sorted_index_tags = site.data.tags | where_exp: "item", "item.index-weight > 0" | sort: "index-weight" %}
{% for index_tag in sorted_index_tags %}
<div class="section"><div class="container" markdown="1">

{:#{{ index_tag.id }}}
# {{ index_tag.name-long | capitalize }}

{:.lead}
{{ index_tag.description }}

{% assign infographics = site.infografiky | where_exp: "item", "item.tags contains index_tag.id" | sort: "weight" %}
{% include preview-blocks.html blocks=infographics %}

</div></div>
{% endfor %}

<div class="section"><div class="container" markdown="1">

{:#studie}
# Studie, články, analýzy

{:.lead}
Zde pro vás vybíráme nejdůležitější studie, články a analýzy týkající se změn klimatu – vždy uvádíme, proč je studie důležitá, jaké jsou její hlavní závěry a další komentáře a poznámky.

{% include preview-blocks.html blocks=site.studie %}

</div></div>
<div class="section"><div class="container" markdown="1">

{:#datasety}
# Naše datasety

{:.lead}
Najít data vědeckých či statistických institucí a zorientovat se v nich, to je velký kus naší práce. Její výsledek dáváme k dispozici v této sekci s přehledem našich datasetů. V sekci _Naše datasety_ odkazujeme na původní zdroje a vysvětlujeme, jak přesně z těchto dat vycházejí naše infografiky. Můžou vám pomoci jak hlouběji pochopit fakta, tak při tvorbě vašich vlastních materiálů.

{% include preview-blocks.html blocks=site.datasety %}

</div></div>

<div class="section">
    <div class="container">
        <h1 id="pages">Ostatní stránky</h1>
        <div class="row justify-content-md-center">
            <div class="col-12 col-sm-4">
                <a href="/zdroje" class="preview-card card">
                    <div class="card-body">
                        <h5>Další zdroje a odkazy</h5>
                        <p class="card-text">Rozcestník odkazů na stránky vybraných výzkumných institucí, repozitářů dat i projektů vizualizující data.</p>
                        <button class="btn btn-primary btn-block"><i class="fas fa-fw fa-globe"></i> Další zdroje a odkazy</button>
                    </div>
                </a>
            </div>
            <div class="col-12 col-sm-4">
                <a href="/slovnik" class="preview-card card">
                    <div class="card-body">
                        <h5>Slovník pojmů</h5>
                        <p class="card-text">Stručný přehled nejčastěji používaných hesel a zkratek s krátkým vysvětlením či komentářem. Slovník postupně dopracováváme.</p>
                        <button class="btn btn-primary btn-block"><i class="fas fa-fw fa-book"></i> Slovník pojmů</button>
                    </div>
                </a>
            </div>
            <div class="col-12 col-sm-4">
                <a href="/aktuality" class="preview-card card">
                    <div class="card-body">
                        <h5>Aktuality</h5>
                        <p class="card-text">Stručný přehled novinek, oprav a aktualizací na našem webu.</p>
                        <button class="btn btn-primary btn-block"><i class="fas fa-fw fa-newspaper"></i> Aktuality</button>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>

<div class="section"><div class="container" markdown="1">

{:#creators}
# O nás a myšlenka projektu

Jsme akademici, doktorandi, klimatologové, IT profesionálové nebo studenti. Sami jsme si zkusili vyhledat data o teplotě či emisích, najít určité informace v mnohasetstránkových zprávách IPCC nebo původních článcích. Jde to, ale musíte umět dobře anglicky, musíte si dohledávat spoustu souvislostí a stojí to spoustu času.

Rozhodli jsme se proto, že tu práci, kterou jsme s hledáním dat sami měli, ostatním ušetříme – zpracujeme infografiky, dáme odkazy na původní data i naše zpracované datasety na jedno místo a doplníme základní souvislosti. A dáme je k dispozici všem, pro koho budou užitečné. Doufáme, že se postupně tyto informace dostanou ke všem, kterých se změny klimatu týkají. Tedy ke všem.

Lidé, kteří výrazně přispěli k podobě tohoto webu a dat, které na něm vidíte: Ondráš Přibyla, Martin Ukrop, Kristi Zákopčanová, Martin crysman Zahradník, Marek Lahoda, Olda Sklenář, Jeňa Krčál, Tom Protivinský, Tom Pšorn, Martin Set Křivánek a mnozí další. Úplný seznam lidí, kteří pomohli, byť i s drobnostmi, [najdete zde](https://github.com/mukrop/faktaoklimatu/blob/master/CONTRIBUTORS.md).

</div></div>
