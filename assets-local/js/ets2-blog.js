// Blog „ETS2 a zranitelné domácnosti“: kalkulačka, otevření rozbalovacího boxu z kotvy.
(function () {
    // --- odkaz #<name> na rozbalovací box (expander.html name=…) ho rozbalí a posune se k němu
    function openAnchor(id) {
        var body = id && document.getElementById('collapse-figure-' + id);
        if (!body || !window.jQuery) return;
        window.jQuery(body).collapse('show');
        body.parentNode.scrollIntoView();
    }
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function () { openAnchor(a.getAttribute('href').slice(1)); });
    });
    if (location.hash) openAnchor(location.hash.slice(1));

    // --- kalkulačka: náklad zvolené typové domácnosti (value = Kč měsíčně při 60 €/t) roste lineárně s cenou
    var calc = document.getElementById('kalkulacka');
    if (calc) {
        var input = document.getElementById('kalk-input');
        var kurz = parseFloat(document.getElementById('kalk-kurz').textContent.replace(',', '.'));
        var cz = function (v) { return Math.round(v).toLocaleString('cs-CZ'); };
        var update = function () {
            var p = +input.value, volba = calc.querySelector('input[name=heat]:checked');
            var bydleni = calc.querySelector('input[name=home]:checked').parentNode.textContent.trim();
            var m = +volba.value * p / 60;
            document.getElementById('kalk-eur').textContent = p;
            document.getElementById('kalk-czk').textContent = cz(p * kurz);
            document.getElementById('kalk-nazev').textContent = bydleni + ', ' + volba.parentNode.textContent.trim().replace(/^./, function (c) { return c.toLowerCase(); });
            calc.querySelector('.kalk-mesic').textContent = (m > 0 ? '+' : '') + cz(m);
            calc.querySelector('.kalk-rok span').textContent = cz(m * 12);
        };
        calc.querySelectorAll('input[name=home]').forEach(function (r) {
            r.addEventListener('change', function () {
                calc.querySelectorAll('.kalk-grp').forEach(function (g) {
                    g.hidden = g.dataset.home !== r.value;
                    if (!g.hidden) g.querySelector('input').checked = true;
                });
                update();
            });
        });
        calc.addEventListener('input', update);
        calc.addEventListener('change', update);
        update();
    }
})();
