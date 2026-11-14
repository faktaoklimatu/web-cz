// Blog „ETS2 a zranitelné domácnosti“: klikací popovery, poznámky, kalkulačka, otevření rozbalovacího boxu z kotvy.
(function () {
    // --- poznámky
    document.querySelectorAll('.note-b').forEach(function (b) {
        b.addEventListener('click', function () {
            b.parentNode.classList.add('open');
            b.setAttribute('aria-expanded', 'true');
        });
    });

    // --- popovery
    var openPop = null, openSrc = null;
    function closePop() {
        if (openPop) { openPop.remove(); openPop = null; }
        if (openSrc) { openSrc.setAttribute('aria-expanded', 'false'); openSrc = null; }
    }
    function showPop(src) {
        if (openSrc === src) { closePop(); return; }
        closePop();
        var w = document.createElement('div');
        w.className = 'popwin'; w.setAttribute('role', 'dialog');
        var pv = src.querySelector('.pv');
        var t = pv ? pv.textContent.trim().replace(/[.:]$/, '') : '';
        if (t.length > 70) t = t.slice(0, 67).replace(/\s\S*$/, '').replace(/[.,;:]$/, '') + '…';
        w.innerHTML = '<div class="ph"></div><div class="pbody"></div><button type="button" aria-label="Zavřít">×</button>';
        w.querySelector('.ph').textContent = t;
        w.querySelector('.pbody').innerHTML = src.querySelector('.pb').innerHTML;
        w.querySelector('button').addEventListener('click', function (e) { e.stopPropagation(); closePop(); src.focus(); });
        document.body.appendChild(w);
        var r = src.getBoundingClientRect(), pw = w.offsetWidth, ph = w.offsetHeight;
        var left = Math.min(Math.max(8, r.left), innerWidth - pw - 8), top = r.bottom + 6;
        if (top + ph > innerHeight - 8) top = Math.max(8, r.top - ph - 6);
        w.style.left = left + 'px'; w.style.top = top + 'px';
        openPop = w; openSrc = src; src.setAttribute('aria-expanded', 'true');
    }
    document.querySelectorAll('.pop-inline').forEach(function (el) {
        el.setAttribute('role', 'button'); el.setAttribute('aria-expanded', 'false');
        el.addEventListener('click', function (e) { if (e.target.closest('a')) return; e.stopPropagation(); showPop(el); });
        el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showPop(el); } });
    });
    document.addEventListener('click', function (e) { if (openPop && !openPop.contains(e.target)) closePop(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePop(); });
    window.addEventListener('scroll', closePop, { passive: true });

    // --- odkaz na kotvu rozbalovacího boxu ho rozbalí
    function openAnchor(id) {
        var t = id && document.getElementById(id);
        if (!t || !t.classList.contains('ets2-anchor')) return;
        var box = t.nextElementSibling;
        var body = box && box.querySelector('.expander-body.collapse');
        if (body && window.jQuery) window.jQuery(body).collapse('show');
    }
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function () { openAnchor(a.getAttribute('href').slice(1)); });
    });
    if (location.hash) openAnchor(location.hash.slice(1));

    // --- kalkulačka
    var calc = document.getElementById('kalkulacka');
    if (calc) {
        var fmtK = function (v) { return Math.round(v).toLocaleString('cs-CZ') + ' Kč'; };
        var update = function () {
            var p = +document.getElementById('price').value, k = p / 60;
            var h = +calc.querySelector('input[name=heat]:checked').value * k;
            document.getElementById('price-out').textContent = p + ' €/t';
            document.getElementById('r-total').textContent = fmtK(h) + ' měsíčně';
            document.getElementById('r-heat').textContent = fmtK(h);
            document.getElementById('r-year').textContent = fmtK(h * 12);
            var ib = document.getElementById('r-band'), inb = p >= 60 && p <= 76;
            ib.textContent = inb ? 'v pravděpodobném pásmu' : (p < 60 ? 'pod pravděpodobným pásmem' : 'nad pravděpodobným pásmem');
            ib.classList.toggle('out', !inb);
        };
        calc.querySelectorAll('input[name=home]').forEach(function (r) {
            r.addEventListener('change', function () {
                calc.querySelectorAll('#heat .grp').forEach(function (g) {
                    var on = g.dataset.home === r.value; g.hidden = !on;
                    if (on) g.querySelector('input').checked = true;
                });
                update();
            });
        });
        calc.addEventListener('input', update);
        update();
    }
})();
