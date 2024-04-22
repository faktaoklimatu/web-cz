---
layout: empty
title: Fakta o klimatu
slug: index
---
<div class="section intro">
    <div class="container clearfix">
        <h1 class="display" id="home">Fakta o změně<br>klimatu</h1>
        <span class="tagline">Veřejně dostupné <span class='nobr'>infografiky, data a články</span></span>
        <p>
        Jsme tým nezávislých analytiků a expertů, který usiluje o to, aby diskuze v naší zemi o klimatických změnách byla věcná, kultivovaná a založená na vědeckých poznatcích a ověřených datech.
        <br/>
        </p>
        <p class="intro-buttons">
            <a href="{{ site.fundraising }}" class="btn btn-primary d-md-none"><i class="fas fa-fw fa-heart"></i> Podpořte nás</a>
            <a href="#temata" class="btn btn-secondary no-ext-link-icon">Naše grafy a články</a>
            <a href="https://2050podcast.cz/" class="btn btn-secondary no-ext-link-icon">Podcast 2050 <i class="fas fa-fw fa-headphones"></i></a>
            <a class="btn btn-secondary no-ext-link-icon" href="#newsletter-modal" id="newsletter-embed" data-toggle="modal" data-target="#newsletter-modal">
            <span class="fas fa-fw fa-envelope-open-text"></span> Odebírejte newsletter</a><br/>
        </p>
    </div>
    <div class="container">
        <ul class="nav nav-tabs flex-nowrap flex-md-wrap align-items-stretch overflow-hidden" role="tablist">
            <li class="nav-item" role="presentation">
                <h2 class="nav-link bg-extralight-blue active" id="tab-role-1" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Vybíráme: Atlas of Climate Change</h2>
            </li>
            <li class="nav-item" role="presentation">
                <h2 class="nav-link bg-extralight-lightblue" id="tab-role-2" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Nejnovější</h2>
            </li>
            <li class="nav-item" role="presentation">
                <h2 class="nav-link bg-extralight-gray" id="tab-role-3" data-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Naše publikace</h2>
            </li>
        </ul>
    </div>
</div>

<div class="tab-content" id="myTabContent">
  <div class="section tab-pane fade show active bg-extralight-blue pt-4 pb-4" id="tab1" role="tabpanel" aria-labelledby="tab-role-1"><div class="container lead">
    <div class="row">
      <div class="col-md-8">
        <p>Kvalitní debata o klimatické změně je z mnoha důvodů komplikovaná, ať už složitostí tématu nebo pro silné emoce, které zákonitě vzbuzuje. K hledání a nacházení řešení klimatické změny je potřeba vést <strong>konstruktivní a informovanou diskuzi</strong>, která je založena na <strong>datech a faktech</strong>.</p>
        <p>Proto jsme připravili <a href="https://factsonclimate.org/atlas" target="_blank">anglickou verzi <strong>Atlasu klimatické změny</strong></a>. Cílem Atlasu je podpořit globální snahu o zvyšování povědomí o jednom z nejpalčivějších témat současnosti, zároveň chce publikace pomoci v <strong>hledání efektivních řešení</strong>. Novinka je k dispozici ke stažení ve formátu PDF.</p>
      </div>
      <div class="col-md">
        <a class="no-ext-link-icon" href="https://factsonclimate.org/atlas" target="_blank">
          <img src="/assets-local/img/atlas-en-front.png" class="img-fluid" alt="Vizualizace anglického Atlasu klimatické změny">
        </a>
      </div>
    </div>
  </div></div>

  <div class="section tab-pane fade bg-extralight-lightblue pt-4 pb-4" id="tab2" role="tabpanel" aria-labelledby="tab-role-2"><div class="container">
    <p class="lead mb-0">Zajímají vás naše novinky? V této sekci vždy najdete naše nejnovější infografiky a články.</p>

    {% assign slugs = site.infographics | concat: site.studies | concat: site.datasets | concat: site.explainers | sort: "published" | reverse | map: "slug" | slice: 0, 6 %}
    {% include preview-blocks-expandable.html slugs=slugs rows=1 %}

    <p class="lead">Pro pravidelné kvalitní informace o klimatické změně můžete sledovat náš newsletter nebo Twitter.
    Kvalitní debatu o klimatické změně a projekt Fakta o klimatu můžete také podpořit – finančně nebo používáním našich dat a grafik.</p>
    <a href="#newsletter-modal" class="btn btn-primary" id="newsletter-embed" data-toggle="modal" data-target="#newsletter-modal"><i class="fas fa-fw fa-envelope-open-text"></i> Newsletter</a>
    <a href="https://twitter.com/{{ site.twitter }}" target="_blank" class="btn btn-secondary"><i class="fab fa-fw fa-x-twitter"></i> @faktaoklimatu</a>
  </div></div>

  <div class="section tab-pane fade bg-extralight-gray pt-4 pb-4" id="tab3" role="tabpanel" aria-labelledby="tab-role-3"><div class="container">
    <p class="lead mb-0">Kromě infografik, článků a rešerší tvoříme i materiály pro vzdělávání a zpracováváme odborné studie.</p>

    {% assign featured_slugs = "atlas, 2023-rozvoj-obnovitelne-energie-v-cesku-do-2030, 2023-prinos-lesni-certifikace-v-casech-klimaticke-zmeny" | split: ", " %}
    {%- include preview-blocks-expandable.html slugs=featured_slugs rows=1 no_include_tags=true %}

    <a href="/publikace" class="btn btn-primary"><i class="fas fa-fw fa-book"></i> Všechny publikace</a>
  </div></div>
</div>

{% assign sorted_topics = site.topics | where_exp: "item", "item.weight > 0" | sort: "weight" %}
<div class="section"><div class="container" markdown="1">
{:#temata .display}
## Oblasti, kterým se věnujeme

{:.lead .narrow-text}
Klimatická změna je složitý komplex vzájemně provázaných jevů. Data, která sbíráme, třídíme a zpracováváme, se&nbsp;proto dotýkají různých oborů lidské činnosti – od ekonomiky přes politiku až po energetiku.

<div class="row topic-tiles">
{%- for topic in sorted_topics %}
<div class="topic-tile col-6 col-md-4 p-0">
<a class="mb-3 my-md-3" href="{{ topic.url }}">
  <img class="mx-3" loading="eager" src="/assets/illustrations/{{ topic.slug }}_mini.svg" alt="{{ topic.title }}">
  <h3 class="mx-3">{{ topic.title | capitalize }}</h3>
</a>
</div>
{%- endfor %}
</div>

</div></div>
<div class="section"><div class="container clearfix" markdown="1">
{:#o-projektu .display}
## O naší práci

<div class="row about-us lead mb-5 justify-content-between">
<div class="col-12 col-md-6 pt-2 pt-md-4" markdown="1">

**Děláme rešeršní a analytickou práci**. Hledáme v datech to relevantní pro hlubší pochopení klimatické změny, jejích dopadů a možnostech řešení. Zaměřujeme se na to podstatné pro český kontext a českou společnost.

**Komunikujeme ke klíčovým skupinám**. Tvoříme datové vizualizace, články, podcasty nebo přednášky pro veřejnost i klienty z firemní a veřejné sféry.

**Konzultujeme**. S novináři, politiky nebo firmami konzultujeme témata týkající se změny klimatu a transformace k bezemisní společnosti.

</div>
<div class="col-12 col-md-6 col-lg-5 pt-4" markdown="1">
### Usilujeme o

{:.arrow}
* **Přehledné a všem dostupné informace** o klimatické změně a možných cestách k bezemisní společnosti
* **Politická rozhodnutí zakotvená v datech** a důkladně zpracovaných analýzách
* **Vzdělanou a informovanou společnost**, kultivovanou veřejnou debatu a kvalitní zpravodajství
</div>

<div class="col-12 mt-3">
<a href="/o-nas" class="btn btn-primary btn-md-lg"><i class="fas fa-fw fa-info"></i> Více o projektu</a>
</div>
</div>

{:.display}
### Ocenění

<div class="row about-us lead">
<div class="col-12 col-md-6 col-lg-4 p-3 p-md-4 price">
<div class="price-1"></div>
<div markdown="1">
**[Cena Josefa Vavrouška](https://www.cenajosefavavrouska.cz/Laureati)** za výjimečný počin (za rok 2022)
</div>
</div>
<div class="col-12 col-md-6 col-lg-4 p-3 p-md-4 price">
<div class="price-2"></div>
<div markdown="1">
**Cena AFO Olomouc** za významný přínos popularizaci vědy (2022)
</div>
</div>
<div class="col-12 col-md-6 col-lg-4 p-3 p-md-4 price">
<div class="price-3"></div>
<div markdown="1">
**[Cena za komunikaci klimatické změny](https://www.cenazaklima.cz/laureati/)** (2020) od České učené společnosti a OSN
</div>
</div>
</div>

</div></div>
<div class="section"><div class="container clearfix" markdown="1">

{:.display .mb-3 #vyuzivaji}
## Kdo využívá naše materiály

{:.lead .narrow-text}
Naše infografiky a texty využívají  české i zahraniční instituce, zpravodajské portály, konzultační společnosti, školy a další aktéři.

<div class="logos mt-md-5 mb-md-4">
<img loading="eager" class="square" src="/assets-local/o-nas/logo-cnb.png" alt="Česká národní banka">
<img loading="eager" src="/assets-local/o-nas/logo-mzp.png" alt="Ministerstvo životního prostředí">
<img loading="eager" class="square" src="/assets-local/o-nas/logo-pwc.png" alt="PwC">
<img loading="eager" class="square" src="/assets-local/o-nas/logo-omg.png" alt="OMG Media Group">
<img loading="eager" src="/assets-local/o-nas/logo-mckinsey.png" alt="McKinsey">
<img loading="eager" src="/assets-local/o-nas/logo-deloitte.png" alt="Deloitte">
<img loading="eager" src="/assets-local/o-nas/logo-ct.png" alt="Česká televize">
<img loading="eager" src="/assets-local/o-nas/logo-seznam-zpravy.png" alt="Seznam Zprávy">
<img loading="eager" src="/assets-local/o-nas/logo-irozhlas.png" alt="iRozhlas">
<img loading="eager" src="/assets-local/o-nas/logo-respekt.png" alt="Respekt">
</div>

</div></div>
