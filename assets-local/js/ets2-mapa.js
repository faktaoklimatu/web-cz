// Mapy SO ORP pro ETS2 série (includes-local/ets2-blog/mapa-orp.html).
// Vrstvy: mf = ohrožení energetickou chudobou (MF, kvartily), uhli / plyn = rodinné domy podle paliva (SLDB 2021).
// Data jsou vložená ze _data/ets2/orp_mapa.json (generuje R/10_mapa_orp.R v dílně).
(function () {
    if (!window.d3) return;
    var fmt1 = function (v) { return v == null ? '–' : v.toLocaleString('cs-CZ', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' %'; };
    var fmtN = function (v) { return v == null ? '–' : Math.round(v).toLocaleString('cs-CZ'); };

    // GDAL (R/sf) zapisuje GeoJSON podle RFC 7946 (vnější kruh proti směru hodinových ručiček),
    // d3 čeká opačné pořadí; jinak by polygon pokryl celou zeměkouli. Přetáčíme každý polygon zvlášť
    // (i uvnitř MultiPolygon a GeometryCollection); čáry vynecháme.
    function prevrat(g) {
        if (!g) return null;
        if (g.type === 'GeometryCollection') {
            var polys = [];
            g.geometries.map(prevrat).filter(Boolean).forEach(function (x) {
                polys = polys.concat(x.type === 'Polygon' ? [x.coordinates] : x.coordinates);
            });
            return polys.length ? { type: 'MultiPolygon', coordinates: polys } : null;
        }
        if (g.type !== 'Polygon' && g.type !== 'MultiPolygon') return null;
        (g.type === 'Polygon' ? [g.coordinates] : g.coordinates).forEach(function (p) {
            if (d3.geoArea({ type: 'Polygon', coordinates: p }) > 2 * Math.PI) p.forEach(function (ring) { ring.reverse(); });
        });
        return g;
    }

    function stupnice(klic, prahy, od, do_) {
        var n = prahy.length + 1;
        var barvy = d3.range(n).map(function (i) { return d3.interpolateRgb(od, do_)(i / (n - 1)); });
        return {
            barva: function (p) { var v = p[klic]; if (v == null) return '#ddd'; var i = 0; while (i < prahy.length && v >= prahy[i]) i++; return barvy[i]; },
            legenda: barvy.map(function (b, i) {
                return [b, i === 0 ? 'pod ' + prahy[0] + ' %' : (i === n - 1 ? prahy[n - 2] + ' % a víc' : prahy[i - 1] + '–' + prahy[i] + ' %')];
            })
        };
    }

    document.querySelectorAll('.ets2-mapa').forEach(function (fig) {
        var el = fig.querySelector('.orp-data'), host = fig.querySelector('.mapwrap');
        if (!el || !host) return;
        var geo = JSON.parse(el.textContent);
        geo.features.forEach(function (f) { f.geometry = prevrat(f.geometry); });
        geo.features = geo.features.filter(function (f) { return f.geometry; });
        var vrstvy = fig.dataset.vrstvy.split(',');
        var info = fig.querySelector('.mapa-info'), legend = fig.querySelector('.mapa-legenda'), sel = fig.querySelector('.orp-select');

        // MF: kvartily podle pořadí, jako report MF
        var vals = geo.features.map(function (f) { return f.properties.podil; }).sort(function (a, b) { return b - a; });
        var nQ = Math.ceil(vals.length / 4), tHi = vals[nQ - 1], tMid = vals[2 * nQ - 1];
        var VRSTVY = {
            mf: {
                barva: function (p) { return p.podil >= tHi ? '#b8402c' : (p.podil >= tMid ? '#f2a283' : '#f4eee8'); },
                legenda: [['#b8402c', 'Velmi ohrožené (horní kvartil)'], ['#f2a283', 'Ohrožené (2. kvartil)'], ['#f4eee8', 'Ostatní']],
                radky: function (p) { return [['Výdaje na vytápění / příjmy', fmt1(p.podil)], ['Podíl obydlí v rodinných domech', fmt1(p.rd)], ['Rodinné domy ve třídě E–G', fmt1(p.rd_eg)]]; }
            },
            uhli: stupnice('rd_uhli', [5, 10, 15, 20, 25], '#f4eee8', '#4a2418'),
            plyn: stupnice('rd_plyn', [20, 35, 50, 65], '#eef3fa', '#0050ae')
        };
        VRSTVY.uhli.radky = VRSTVY.plyn.radky = function (p) {
            return [['Byty v rodinných domech (2021)', fmtN(p.rd_byty)], ['z toho na uhlí', fmt1(p.rd_uhli)], ['z toho na plyn', fmt1(p.rd_plyn)], ['z toho na dřevo a pelety', fmt1(p.rd_drevo)]];
        };
        var aktivni = vrstvy[0], vybrany = null;

        var W = 800, proj = d3.geoMercator().fitWidth(W, geo), path = d3.geoPath(proj);
        var H = Math.ceil(path.bounds(geo)[1][1]) + 2;
        var svg = d3.select(host).append('svg').attr('viewBox', '0 0 ' + W + ' ' + H).attr('width', '100%').style('display', 'block');
        var feats = geo.features.slice().sort(function (a, b) { return a.properties.orp.localeCompare(b.properties.orp, 'cs'); });
        var paths = svg.append('g').selectAll('path').data(feats).join('path')
            .attr('d', path).attr('stroke', '#fff').attr('stroke-width', 0.6).style('cursor', 'pointer')
            .on('mouseenter', function (e, d) { ukaz(d); })
            .on('click', function (e, d) { ukaz(d); sel.value = d.properties.orp; });
        // Hranice krajů nad obvody (bez reakce na myš)
        var krajeEl = fig.querySelector('.kraje-data');
        if (krajeEl) {
            var kraje = JSON.parse(krajeEl.textContent);
            kraje.features.forEach(function (f) { f.geometry = prevrat(f.geometry); });
            svg.append('g').attr('class', 'kraje').style('pointer-events', 'none')
                .selectAll('path').data(kraje.features.filter(function (f) { return f.geometry; })).join('path')
                .attr('d', path).attr('fill', 'none').attr('stroke', '#3a3a45').attr('stroke-width', 1.4).attr('stroke-linejoin', 'round');
        }
        var gKraje = svg.select('g.kraje');
        feats.forEach(function (f) { var o = document.createElement('option'); o.value = o.textContent = f.properties.orp; sel.appendChild(o); });
        sel.addEventListener('change', function () { var d = feats.find(function (f) { return f.properties.orp === sel.value; }); if (d) ukaz(d); });

        function ukaz(d) {
            vybrany = d;
            var p = d.properties, radky = VRSTVY[aktivni].radky(p);
            paths.attr('stroke', function (x) { return x === d ? '#f06a4e' : '#fff'; }).attr('stroke-width', function (x) { return x === d ? 2.2 : 0.6; });
            paths.filter(function (x) { return x === d; }).raise();
            if (!gKraje.empty()) gKraje.raise();
            info.innerHTML = '<b></b><span class="k"></span>' + radky.map(function () { return '<div class="r"><span></span><span></span></div>'; }).join('');
            info.querySelector('b').textContent = p.orp;
            info.querySelector('.k').textContent = p.kraj || '';
            info.querySelectorAll('.r').forEach(function (r, i) { r.children[0].textContent = radky[i][0]; r.children[1].textContent = radky[i][1]; });
        }
        function nastav(v) {
            aktivni = v;
            var V = VRSTVY[v];
            paths.attr('fill', function (d) { return V.barva(d.properties); });
            legend.innerHTML = '';
            V.legenda.forEach(function (l) {
                var s = document.createElement('span'); s.className = 'pol';
                var sw = document.createElement('i'); sw.style.background = l[0]; s.appendChild(sw);
                s.appendChild(document.createTextNode(l[1])); legend.appendChild(s);
            });
            if (!gKraje.empty()) {
                var k = document.createElement('span'); k.className = 'pol';
                var ln = document.createElement('i'); ln.className = 'kraj-cara'; k.appendChild(ln);
                k.appendChild(document.createTextNode('Hranice krajů')); legend.appendChild(k);
            }
            fig.querySelectorAll('[data-pro]').forEach(function (x) { x.hidden = x.dataset.pro.split(' ').indexOf(v) < 0; });
            fig.querySelectorAll('.mapa-vrstvy button').forEach(function (bt) { bt.setAttribute('aria-pressed', bt.dataset.vrstva === v ? 'true' : 'false'); });
            if (vybrany) ukaz(vybrany);
        }
        fig.querySelectorAll('.mapa-vrstvy button').forEach(function (bt) { bt.addEventListener('click', function () { nastav(bt.dataset.vrstva); }); });
        nastav(aktivni);
    });
})();
