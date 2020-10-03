---
layout: empty
title: Fakta o klimatu
slug: index
---
<div class="section intro">
    <div class="container">
        <h1 class="display-1" id="home">Fakta o změně<br>klimatu</h1>
        <span class="tagline">Veřejně dostupné<br>infografiky a datasety</span>
        <p class="mb-5">Shromažďujeme data o klimatu a klimatické změně, která poskytují vědecké instituce (ČHMÚ, NASA, Eurostat a jiné) a zpracováváme z nich grafy a infografiky pro <a href="/jak-pouzivat" title="Jak používat naše materiály">další použití</a>.<br/>
            <a href="/aktuality" class="btn btn-secondary mt-3"><i class="fas fa-fw fa-newspaper"></i> Aktuality</a>
            <a href="https://twitter.com/{{ site.twitter }}" target="_blank" class="btn btn-secondary mt-3"><i class="fab fa-fw fa-twitter"></i> Twitter</a>
            <a href="{{ site.newsletter }}" target="_blank" class="btn btn-secondary mt-3"><i class="fas fa-fw fa-envelope-open-text"></i> Newsletter</a>
        </p>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <h2 class="nav-link bg-extralight-blue active" id="homee-tab" data-toggle="tab" href="#homee" role="tab" aria-controls="homee" aria-selected="true">Pro veřejnost</h2>
            </li>
            <li class="nav-item" role="presentation">
                <h2 class="nav-link bg-extralight-green" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Pro učitele</h2>
            </li>
            <li class="nav-item" role="presentation">
                <h2 class="nav-link bg-extralight-red" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Pro novináře</h2>
            </li>
        </ul>
    </div>
</div>

<div class="tab-content" id="myTabContent">
  <div class="section tab-pane fade show active bg-extralight-blue pt-4 pb-4" id="homee" role="tabpanel" aria-labelledby="homee-tab"><div class="container">
    <p class="lead mb-0"> Ak ste tu prvy krat, pozrite sa na nasledovne infografiky...</p>
    {% assign featured = site.infografiky | where_exp: "item", "item.slug == 'schema-klimaticke-zmeny' or item.slug == 'emise-cr-detail' or item.slug == 'koncentrace-co2'" %}
    {% include preview-blocks.html blocks=featured limit=3 %}
    <a href="/explainery" class="btn btn-primary"><i class="fas fa-fw fa-binoculars"></i> Explainery</a>
    <a href="/slovnik" class="btn btn-primary"><i class="fas fa-fw fa-book"></i> Slovník pojmů</a>
    <a href="" class="btn btn-primary"><i class="fas fa-fw fa-globe"></i> Další zdroje a odkazy</a>
    <a href="/podporte-nas" class="btn btn-primary"><i class="fas fa-fw fa-heart"></i> Podpořte nás</a>
    Atlas
  </div></div>
  
  <div class="section tab-pane fade bg-extralight-green pt-4 pb-4" id="profile" role="tabpanel" aria-labelledby="profile-tab"><div class="container">
  <ul>
    <li>Atlas + metodika! (Atlas ma cathy obrazok)</li>
    <li><a href="/explainery" class="btn btn-primary"><i class="fas fa-fw fa-binoculars"></i> Explainery</a></li>
    <li><a href="/slovnik" class="btn btn-primary"><i class="fas fa-fw fa-book"></i> Slovník pojmů</a></li>
    <li><a href="/jak-pouzivat" class="btn btn-primary"><i class="fas fa-fw fa-book-reader"></i> Jak používat naše materiály</a></li>  
  </ul>
  </div></div>

  <div class="section tab-pane fade bg-extralight-red pt-4 pb-4" id="contact" role="tabpanel" aria-labelledby="contact-tab"><div class="container">
  <ul>
    <li><a href="/explainery" class="btn btn-primary"><i class="fas fa-fw fa-binoculars"></i> Explainery</a></li>
    <li><a href="/slovnik" class="btn btn-primary"><i class="fas fa-fw fa-book"></i> Slovník pojmů</a></li>
    <li><a href="/jak-pouzivat" class="btn btn-primary"><i class="fas fa-fw fa-book-reader"></i> Jak používat naše materiály</a></li>
    <li>Jak nas kontaktovat, co pisat o time, presskit? (loga a pod.)</li>
  </ul>
  </div></div>
</div>

<div class="section section-new"><div class="container" markdown="1">

{:#new .display-2}
## Nejnovější materiály

{:.lead}
Zajímají vás naše novinky? V této sekci vždy najdete naše nejnovější infografiky, výtahy studií a datasety. Úplný seznam novinek a aktualit najdete i v [přehledu na samostatné stránce](/aktuality).

{% assign objects = site.infografiky | concat: site.studie | concat: site.datasety | sort: "published" | reverse %}
{% include preview-blocks.html blocks=objects link="news" limit=6 %}

</div></div>

{% assign sorted_index_tags = site.data.tags | where_exp: "item", "item.index-weight > 0" | sort: "index-weight" %}
<div class="section"><div class="container" markdown="1">
{: .display-2}
## Oblasti, kterým se věnujeme

{:.lead}
Klimatická změna je složitý komplex vzájemně provázaných jevů. Data, která sbíráme, třídíme a zpracováváme, se proto dotýkají různých oborů lidské činnosti – od ekonomiky přes politiku až po energetiku. Pro usnadnění orientace na webu třídíme naše materiály do níže uvedených kategorií.

<div class="accordion" id="accordionExample">
{% for index_tag in sorted_index_tags %}
<div class="accordion-item">
    <div class="accordion-header collapsed" id="heading_{{ index_tag.id }}" data-toggle="collapse" data-target="#collapse_{{ index_tag.id }}" aria-expanded="false" aria-controls="collapse_{{ index_tag.id }}">
        <h3 class="display-3">
        <span class="fa fa-fw fa-chevron-up"></span>
        {{ index_tag.name-long | capitalize }}
        <small class="text-secondary d-none d-md-inline">({% include object-stats.html tag=index_tag.id %})</small>
        </h3>
    </div>
    <div class="collapse" id="collapse_{{ index_tag.id }}"  aria-labelledby="heading_{{ index_tag.id }}" data-parent="#accordionExample" markdown="1">
{:.lead}
{{ index_tag.description | markdownify }}

{% assign objects = site.infografiky | concat: site.studie | where_exp: "item", "item.tags contains index_tag.id" | sort: "weight" %}
{% include preview-blocks.html blocks=objects link=index_tag limit=6 %}

</div>
</div>
{% endfor %}
</div> <!-- accordion end -->

</div></div>
<div class="section"><div class="container" markdown="1">
{:#creators .display-2}
## O nás a naší práci

{:.lead}
Projekt Fakta o klimatu usiluje o zkvalitnění společenské diskuse o klimatické změně.
Snažíme se dodávat srozumitelné údaje široké veřejnosti a vizuálně zpracovávat vědecké informace, aby bylo rozhodování ve věcech týkajících se klimatu založené na aktuálních a ověřených datech.

<div id="carouselExampleCaptions" class="carousel slide mb-4 mt-4" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800" height="400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: First slide"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#555" dy=".3em">First slide</text></svg>
      <div class="carousel-caption d-none d-md-block">
        <h5>Naše na kulatém stole v senátu...</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </div>
    <div class="carousel-item">
      <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800" height="400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Second slide"><title>Placeholder</title><rect width="100%" height="100%" fill="#666"></rect><text x="50%" y="50%" fill="#444" dy=".3em">Second slide</text></svg>
      <div class="carousel-caption d-none d-md-block">
        <h5>Naše práce byla v těchto novinách...</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
    <div class="carousel-item">
      <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800" height="400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Third slide"><title>Placeholder</title><rect width="100%" height="100%" fill="#555"></rect><text x="50%" y="50%" fill="#333" dy=".3em">Third slide</text></svg>
      <div class="carousel-caption d-none d-md-block">
        <h5>Atlas a spolupráce s Lipkou...</h5>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

{:.lead}
Debata o klimatické změně je komplikovaná a na všech stranách plná zbytečných emocí, polopravd a mýtů. Chceme poutat pozornost na důležitá témata a stavět most mezi vědci a lidmi, kterých se změny klimatu týkají. A to jsou všichni lidé.

{:.lead}
Jsme tým profesionálů zabývajících se různými obory – přírodovědou, informatikou, pedagogikou nebo komunikací. Pracuje na dobrovolnické bázi a finance na provoz získáváme od dárců, nepracujeme na ničí objednávku. Při naší činnosti komunikujeme s politiky, energetickými firmami i aktivistickými hnutími. Fakta o klimatu jsou však nezávislý projekt, který může podpořit každý.

<div class="button-block">
    <a href="/o-projektu" class="btn btn-primary btn-lg"><i class="fas fa-fw fa-info"></i> Více o projektu</a>
    <a href="/podporte-nas" class="btn btn-primary btn-lg"><i class="fas fa-fw fa-heart"></i> Podpořte nás</a>
</div>

</div></div>
