---
layout:     empty
title:      Děkujeme za podporu!
slug:       dekujeme
extrascripts: thankyou
sitemap:    false
---
<div class="section">
    <div class="container clearfix">
        <figure class="d-none d-md-block float-right w-50 ml-4">
            <img src="/assets-local/team/tym-fakta-o-klimatu.jpg" class="rounded w-100" alt="Jádro týmu Fakta o klimatu"/>
        </figure>
        <h1>{{ page.title }}</h1>
        <div class="payment-box">
            <p class="lead">Platbu prosím zašlete ze svého účtu dle parametrů níže.</p>
            <table id="payment-table" class="lead">
            <tr>
                <th>Číslo účtu</th>
                <td>2198370339/0800</td>
            </tr>
            <tr>
                <th>Variabilní symbol</th>
                <td id="vs"></td>
            </tr>
            <tr>
                <th>Částka</th>
                <td><span id="amount"></span> Kč</td>
            </tr>
            </table>
        </div>
        <p class="lead mb-4">I díky vašemu příspěvku můžeme dál fungovat. V případě dotazů se nám neváhejte ozvat na <a href="mailto:dary@faktaoklimatu.cz" title="Kontaktní adresa pro dárce">dary@faktaoklimatu.cz</a>.</p>
        <p class="pb-2">Chcete-li být informováni o novinkách, přihlaste se do odběru našeho newslettru nebo sledujte náš Twitter.</p>
        <a href="#newsletter-modal" class="btn btn-primary" id="newsletter-embed" data-toggle="modal" data-target="#newsletter-modal"><i class="fas fa-fw fa-envelope-open-text"></i> Newsletter</a>
        <a href="https://twitter.com/{{ site.twitter }}" target="_blank" class="btn btn-secondary"><i class="fab fa-fw fa-x-twitter"></i> X</a>
        <figure class="d-md-none w-100 mt-2">
            <img src="/assets-local/team/tym-fakta-o-klimatu.jpg" class="rounded w-100" alt="Jádro týmu Fakta o klimatu"/>
        </figure>
    </div>
</div>

