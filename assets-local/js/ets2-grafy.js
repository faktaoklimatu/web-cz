// Grafy série ETS2 a domácnosti, v podobě panelů FoK (includes-local/chart-panel.html, styly
// assets-local/_chart-panel.scss, export PNG/SVG assets-local/js/chart-download.js).
// Data jsou vložená ze _data/ets2/*.csv (generuje R/13_data_web.R v dílně, ručně neupravovat)
// jako <script type="application/json" id="graf-<název>-data"> vedle panelu id="graf-<název>".
// Popisek jednotek a alternativní text bere skript z atributů data-caption a aria-label na <svg>.
// Legenda a popisek jsou uvnitř svg, aby je export zachoval.
(function () {
    'use strict';
    if (!window.d3 || typeof FoKTheme === 'undefined') return;

    var T = FoKTheme.colors;
    // Barvy série, každý význam jednou: modrá = ETS2 a domácnosti, které by zasáhlo, a cílená pravidla;
    // červená = cenový šok; šedá = ostatní. Paliva mají vlastní barvy (FUEL), stejné ve všech grafech a mapách série.
    var COL = {
        ets2: '#3B3B93',   // jako kalkulačka (a kalkulačka v explaineru emisni-povolenky-ets-2)
        zranitelne: T.sectors.energetika,   // zranitelné domácnosti ve čtverečkovém grafu
        sok: T.negative,
        ostatni: T.lightGrey,
        ctverecek: d3.interpolateRgb('#fff', T.lightGrey)(0.55),
        pozadi: T.gridLine
    };
    // Spotřeba domácností podle toho, co do nich přiteklo; pořadí vrstev zdola nahoru. Teplo ze sítě
    // je v pohledu ETS rozdělené na zdroje v ETS1 a ETS2, se stejnou barvou i popiskem.
    var FUEL = [
        { key: 'uhli', label: 'Uhlí', color: '#993d59' },
        { key: 'plyn', label: 'Plyn a ropné produkty', color: '#e27373' },
        { key: 'drevo', label: 'Dřevo a jiná biomasa', color: '#e0c7a4' },
        { key: 'tc', label: 'Okolní a solární teplo', color: '#2dab96' },
        { key: 'teplo', label: 'Teplo ze sítě', color: '#a17db8' },
        { key: 'teplo_ets1', label: 'Teplo ze sítě', color: '#a17db8' },
        { key: 'teplo_ets2', label: 'Teplo ze sítě', color: '#a17db8' },
        { key: 'elektrina', label: 'Elektřina', color: '#6db7cc' }
    ];
    var fuel = function (k) { return FUEL.filter(function (f) { return f.key === k; })[0]; };
    // Pohledy grafu spotřeby: jeden graf, nebo malé grafy se stejnou osou y
    var POHLEDY = [
        { key: 'kde', label: 'Kde vznikají emise', panely: [
            { title: 'Energie vyrobená v domácnosti', sub: 'na vytápění, ohřev vody, vaření a spotřebiče', keys: ['uhli', 'plyn', 'drevo', 'tc'] },
            { title: 'Energie dodaná\nz elektráren a tepláren', keys: ['teplo', 'elektrina'] }] },
        { key: 'celkem', label: 'Celkem', panely: [{ keys: ['uhli', 'plyn', 'drevo', 'tc', 'teplo', 'elektrina'] }] },
        { key: 'ets', label: 'ETS1 a ETS2', panely: [
            { title: 'Zpoplatněno v ETS1', keys: ['teplo_ets1', 'elektrina'] },
            { title: 'Zpoplatnilo by ETS2', keys: ['uhli', 'plyn', 'teplo_ets2'] },
            { title: 'Bez povolenek', keys: ['drevo', 'tc'] }] },
        { key: 'uhli-tc', label: 'Uhlí a okolní teplo', panely: [{ keys: ['uhli', 'tc'] }] },
        // každý zdroj zvlášť, všechny panely mají stejnou osu y; název panelu nahrazuje legendu
        { key: 'zdroje', label: 'Všechny zdroje zvlášť', bezLegendy: true, panely: [
            { title: 'Uhlí', keys: ['uhli'] },
            { title: 'Plyn a ropné produkty', keys: ['plyn'] },
            { title: 'Dřevo a biomasa', keys: ['drevo'] },
            { title: 'Okolní a solární teplo', keys: ['tc'] },
            { title: 'Teplo ze sítě', keys: ['teplo'] },
            { title: 'Elektřina', keys: ['elektrina'] }] }
    ];
    // Emise CO2 (emise_domacnosti.csv), samostatný graf pod spotřebou: elektřina a teplo ze sítě s emisemi
    // elektráren a tepláren; dřevo a TČ 0
    // zrcadlí výchozí pohled grafu spotřeby: vlevo domácnost, vpravo elektrárny a teplárny
    var EMISE = { key: 'emise', jednotka: 'Mt CO₂', desetiny: 2, panely: [
        { title: 'Emise ze spalování paliv v domácnostech', keys: ['uhli', 'plyn'] },
        { title: 'Emise z výroby elektřiny a dálkového tepla', keys: ['teplo', 'elektrina'] }] };
    // Přepínače pohledů jen pro vývoj: ?dev=1 v adrese
    var DEV = new URLSearchParams(location.search).get('dev') === '1';
    var C = { grid: '#edf2f7', axis: '#718096', title: '#2d3748', axisFont: 12, legendFont: 14 };

    var cz = function (v, d) { return (+v).toLocaleString('cs-CZ', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };
    var isNA = function (v) { return v === 'NA' || v === '' || v == null; };

    // Tooltip jako u ostatních panelů (.d3-tooltip v _chart-panel.scss)
    var tip = d3.select('body').append('div').attr('class', 'd3-tooltip');
    function showTip(ev, html) { tip.html(html).style('display', 'block'); moveTip(ev); }
    function moveTip(ev) {
        var n = tip.node();
        tip.style('left', Math.min(ev.clientX + 14, window.innerWidth - n.offsetWidth - 8) + 'px')
            .style('top', Math.max(ev.clientY - n.offsetHeight - 12, 8) + 'px');
    }
    function hideTip() { tip.style('display', 'none'); }
    var sw = function (c) { return '<span class="swatch" style="background:' + c + '"></span>'; };

    // Legenda jako text v svg, popisek v barvě čtverečku; zalamuje se na šířku, vrací výšku.
    function legend(parent, items, width, fontSize) {
        var fs = fontSize || C.legendFont, g = parent.append('g'), rowH = fs + 6, gap = 14, x = 0, y = 0;
        items.forEach(function (it) {
            var item = g.append('g');
            item.append('rect').attr('y', -10).attr('width', 12).attr('height', 12).attr('fill', it.color);
            var lab = d3.lab(it.color);
            var t = item.append('text').attr('x', 17).attr('font-size', fs).attr('font-weight', 500)
                .attr('fill', lab.l > 75 ? lab.darker(1.5) : it.color).text(it.label);
            var w = 17 + t.node().getComputedTextLength();
            if (x > 0 && x + w > width) { x = 0; y += rowH; }
            item.attr('transform', 'translate(' + x + ',' + (y + 12) + ')');
            x += w + gap;
        });
        return y + rowH + 6;
    }

    // Text zalomený na šířku; vrací počet řádků.
    function wrap(t, str, x, maxW, lh) {
        var line = t.append('tspan').attr('x', x), lines = 1;
        str.split(' ').forEach(function (word) {
            var prev = line.text();
            line.text(prev ? prev + ' ' + word : word);
            if (prev && line.node().getComputedTextLength() > maxW) {
                line.text(prev);
                line = t.append('tspan').attr('x', x).attr('dy', lh).text(word);
                lines += 1;
            }
        });
        return lines;
    }

    // Tučný popisek jednotek nad grafem; vrací výšku, kterou zabral.
    function caption(svg, text, width) {
        if (!text) return 0;
        var t = svg.append('text').attr('y', 12).attr('font-size', 13).attr('font-weight', 700).attr('fill', C.axis);
        return wrap(t, text, 0, width, 16) * 16 + 8;
    }

    function axisText(sel) { return sel.attr('font-size', C.axisFont).attr('fill', C.axis); }

    // Osa y jako v grafech fok-chart-* (fokAxisYWidth, fokAxisYLabel v fok-utils.js): levý okraj = nejširší
    // popisek + odsazení, takže nejširší popisek začíná na levém okraji svg; jednotka hned za nejvyšším popiskem
    // („250 PJ“) na podkladu barvy pozadí, který zakryje mřížku.
    var TICK_PAD = 6;
    function sirkaOsyY(svg, y, ticks, fmt) {
        var t = svg.append('text').attr('font-size', C.axisFont), sirka = 0;
        y.ticks(ticks).forEach(function (v) { t.text(fmt ? fmt(v) : cz(v)); sirka = Math.max(sirka, t.node().getComputedTextLength()); });
        t.remove();
        return Math.ceil(sirka) + TICK_PAD;
    }
    // g: skupina posunutá na levý okraj grafu; popisky: false u dalších panelů vedle prvního
    function osaY(g, y, ticks, sirkaMrizky, jednotka, popisky, fmt) {
        g.call(d3.axisLeft(y).ticks(ticks).tickSize(-sirkaMrizky).tickPadding(TICK_PAD)
            .tickFormat(popisky ? function (v) { return fmt ? fmt(v) : cz(v); } : ''))
            .call(function (a) { a.select('.domain').remove(); a.selectAll('.tick line').attr('stroke', C.grid); axisText(a.selectAll('.tick text')); });
        if (!popisky || !jednotka) return;
        // jednotka ve vlastní skupině na konci rodiče, aby ležela nad daty
        var lg = d3.select(g.node().parentNode).append('g').attr('transform', g.attr('transform'));
        var horni = d3.max(y.ticks(ticks)), box = lg.append('rect');
        var t = axisText(lg.append('text')).attr('x', -TICK_PAD).attr('dx', '0.3em').attr('y', y(horni)).attr('dy', '0.32em').text(jednotka);
        var b = t.node().getBBox();
        box.attr('x', b.x).attr('y', b.y).attr('width', b.width + 4).attr('height', b.height).attr('fill', '#fff');
    }
    // Osa x pod nejnižší mřížkou s mezerou, bez čáry osy; čárky 1,5× delší než výchozí
    function osaX(g, x, tickValues, fmt) {
        g.call(d3.axisBottom(x).tickValues(tickValues).tickFormat(fmt || d3.format('d')).tickSize(6).tickPadding(4))
            .call(function (a) {
                a.select('.domain').remove();
                a.selectAll('.tick line').attr('stroke', C.axis);
                axisText(a.selectAll('.tick text'));
            });
        return g;
    }

    // Hlavička grafu: popisek jednotek a legenda; vrací y, kde začíná graf.
    function head(svg, width, items, text) {
        var top = caption(svg, text || svg.node().dataset.caption, width);
        if (items) top += legend(svg.append('g').attr('transform', 'translate(0,' + top + ')'), items, width);
        return top + 8;
    }

    // Kreslí hned a znovu při každé změně šířky svg; draw(svg, šířka, data) vrací výšku.
    // dataName: data jiného panelu na stejné stránce (dvě mapy ze stejného orp_mapa.json).
    function mount(name, draw, dataName) {
        var el = document.getElementById('graf-' + name + '-svg');
        var dataEl = document.getElementById('graf-' + (dataName || name) + '-data');
        if (!el || !dataEl) return;
        var data = JSON.parse(dataEl.textContent);
        if (!data || !data.length) { el.outerHTML = '<p>Data grafu zatím chybí (spusťte R/13_data_web.R).</p>'; return; }
        // šířka svg, ne rodiče: panel s class="narrow-figure" má svg užší (_chart-panel.scss)
        var sirka = function () { return Math.round(el.getBoundingClientRect().width); };
        var last = 0;
        var redraw = function () {
            var w = sirka();
            if (!w) return;
            last = w;
            var svg = d3.select(el);
            svg.selectAll('*').remove();
            svg.attr('height', draw(svg, w, data));
        };
        new ResizeObserver(function () { if (sirka() !== last) redraw(); }).observe(el.parentNode);
        document.fonts.ready.then(redraw);
        redraw();
        return redraw;
    }

    // Řada přepínačů nad svg, jako v ostatních panelech (.seg v _chart-panel.scss)
    function prepinac(name, options, onChange) {
        var el = document.getElementById('graf-' + name + '-svg');
        if (!el) return;
        var seg = d3.select(el.parentNode).insert('div', function () { return el; }).attr('class', 'seg').attr('role', 'group');
        seg.selectAll('button').data(options).join('button')
            .attr('type', 'button').text(function (d) { return d.label; })
            .classed('active', function (d, i) { return i === 0; })
            .attr('aria-pressed', function (d, i) { return String(i === 0); })
            .on('click', function (ev, d) {
                seg.selectAll('button').classed('active', false).attr('aria-pressed', 'false');
                d3.select(this).classed('active', true).attr('aria-pressed', 'true');
                onChange(d);
            });
    }

    // Spotřeba energie domácností podle přímých toků, PJ (2005–2024), a emise CO2: plošné grafy po panelech.
    // getPohled() vrací, který pohled kreslit (spotřeba se přepíná, emise mají jeden).
    // vyska: násobek výšky grafu (výchozí 1)
    function kresliSpotrebu(getPohled, vyska) { return function (svg, w, zdroj) {
        var pohled = getPohled();
        var jed = pohled.jednotka || 'PJ', des = pohled.desetiny || 1;
        var rows = zdroj.map(function (d) {
            var r = { rok: +d.rok }; FUEL.forEach(function (f) { r[f.key] = +d[f.key]; });
            if (d.teplo == null) r.teplo = r.teplo_ets1 + r.teplo_ets2;
            return r;
        });
        var panely = pohled.panely, n = panely.length;
        var keys = d3.merge(panely.map(function (p) { return p.keys; }));
        // legenda: každý popisek jednou, v pořadí FUEL
        var leg = [];
        FUEL.forEach(function (f) {
            if (keys.indexOf(f.key) >= 0 && !leg.some(function (l) { return l.label === f.label; })) leg.push(f);
        });
        var top = head(svg, w, pohled.bezLegendy ? null : leg);
        var ymax = d3.max(panely, function (p) { return d3.max(rows, function (r) { return d3.sum(p.keys, function (k) { return r[k]; }); }); });
        var y = d3.scaleLinear().domain([0, ymax]).nice(4);
        var left = sirkaOsyY(svg, y, 4), gapX = 40, axisH = 32, rowGap = 16;
        var cols = Math.max(1, Math.min(n, Math.floor((w - left - 6 + gapX) / (150 + gapX))));
        var panelW = (w - left - 6 - gapX * (cols - 1)) / cols;
        // název panelu: tučně, „\n“ = nový řádek, zalamuje se na šířku panelu (první sloupec i přes osu y);
        // sub = řádek běžným písmem pod názvem. Vrací počet řádků; výška záhlaví podle nejdelšího.
        var titleW = function (i) { return panelW + (i % cols === 0 ? left : 0); };
        var nazev = function (g, p, x, maxW) {
            var radky = 0;
            p.title.split('\n').map(function (t) { return [t, 700]; }).concat(p.sub ? [[p.sub, 400]] : []).forEach(function (r) {
                var t = g.append('text').attr('y', 14 + 17 * radky).attr('font-size', 15).attr('font-weight', r[1]).attr('fill', C.title);
                radky += wrap(t, r[0], x, maxW, 17);
            });
            return radky;
        };
        var radkuNazvu = d3.max(panely, function (p, i) {
            if (!p.title) return 0;
            var g = svg.append('g'), k = nazev(g, p, 0, titleW(i));
            g.remove();
            return k;
        });
        var titleH = n > 1 ? 34 + 17 * (radkuNazvu - 1) : 0;
        var plotH = (vyska || 1) * (n === 1 ? Math.max(220, Math.min(320, w * 0.5)) : Math.max(160, Math.min(240, panelW * 0.75)));
        y.range([plotH, 0]);
        var x = d3.scaleLinear().domain(d3.extent(rows, function (r) { return r.rok; })).range([0, panelW]);
        var xTicks = panelW >= 300 ? [2005, 2010, 2015, 2020, 2024] : [2005, 2015, 2024];
        var area = d3.area().x(function (d) { return x(d.data.rok); }).y0(function (d) { return y(d[0]); }).y1(function (d) { return y(d[1]); });
        panely.forEach(function (p, i) {
            var col = i % cols, row = Math.floor(i / cols);
            var g = svg.append('g').attr('transform', 'translate(' + (left + col * (panelW + gapX)) + ',' +
                (top + row * (titleH + plotH + axisH + rowGap)) + ')');
            if (p.title) nazev(g, p, col === 0 ? -left : 0, titleW(i));
            var pg = g.append('g').attr('transform', 'translate(0,' + titleH + ')');
            pg.selectAll('path.plocha').data(d3.stack().keys(p.keys)(rows)).join('path')
                .attr('class', 'plocha').attr('fill', function (s, j) { return fuel(p.keys[j]).color; }).attr('d', area)
                .attr('stroke', '#fff').attr('stroke-width', 1).attr('stroke-linejoin', 'round');
            osaY(pg.insert('g', ':first-child'), y, 4, panelW, jed, col === 0);
            osaX(pg.append('g').attr('transform', 'translate(0,' + (plotH + 6) + ')'), x, xTicks)
                .selectAll('.tick text').attr('text-anchor', function (d, j, all) { return j === 0 ? 'start' : j === all.length - 1 ? 'end' : 'middle'; });
            var rule = pg.append('line').attr('y1', 0).attr('y2', plotH).attr('stroke', C.title).style('display', 'none');
            pg.append('rect').attr('width', panelW).attr('height', plotH).attr('fill', 'transparent')
                .on('mousemove', function (ev) {
                    var yr = Math.max(2005, Math.min(2024, Math.round(x.invert(d3.pointer(ev)[0]))));
                    var r = rows.filter(function (d) { return d.rok === yr; })[0];
                    rule.attr('x1', x(yr)).attr('x2', x(yr)).style('display', null);
                    showTip(ev, '<b>' + (p.title ? p.title + ', ' : '') + yr + '</b><br>' + p.keys.slice().reverse().map(function (k) {
                        return sw(fuel(k).color) + fuel(k).label + ': ' + cz(r[k], des) + ' ' + jed;
                    }).join('<br>') + '<br>celkem ' + cz(d3.sum(p.keys, function (k) { return r[k]; }), des) + ' ' + jed);
                })
                .on('mouseleave', function () { rule.style('display', 'none'); hideTip(); });
        });
        var rows_ = Math.ceil(n / cols);
        return top + rows_ * (titleH + plotH + axisH) + (rows_ - 1) * rowGap;
    }; }
    // Uhlí spálené v domácnostech a okolní a solární teplo (hlavně tepelná čerpadla), PJ: čárový graf
    // s popisky na konci čar. Data jako graf spotřeby (spotreba_domacnosti.csv).
    mount('uhli-tc', function (svg, w, data) {
        var KEYS = ['uhli', 'tc'];
        var rows = data.map(function (d) { return { rok: +d.rok, uhli: +d.uhli, tc: +d.tc }; });
        var y = d3.scaleLinear().domain([0, d3.max(rows, function (d) { return Math.max(d.uhli, d.tc); })]).nice(4);
        var m = { l: sirkaOsyY(svg, y, 4) }, r = w < 480 ? 90 : 150;
        var top = head(svg, w, null) + 14, plotH = Math.max(200, Math.min(300, w * 0.45));
        var x = d3.scaleLinear().domain(d3.extent(rows, function (d) { return d.rok; })).range([m.l, w - r]);
        y.range([top + plotH, top]);
        osaY(svg.append('g').attr('transform', 'translate(' + m.l + ',0)'), y, 4, w - r - m.l, 'PJ', true);
        osaX(svg.append('g').attr('transform', 'translate(0,' + (top + plotH + 6) + ')'), x, w - r - m.l >= 300 ? [2005, 2010, 2015, 2020, 2024] : [2005, 2015, 2024]);
        var last = rows[rows.length - 1], dole = -Infinity;
        KEYS.forEach(function (k) {
            svg.append('path').datum(rows).attr('fill', 'none').attr('stroke', fuel(k).color).attr('stroke-width', 3)
                .attr('d', d3.line().x(function (d) { return x(d.rok); }).y(function (d) { return y(d[k]); }));
        });
        // popisky na konci čar shora dolů, aby se nepřekrývaly
        KEYS.slice().sort(function (a, b) { return last[b] - last[a]; }).forEach(function (k) {
            var yy = Math.max(y(last[k]) + 4, dole + 15);
            var t = svg.append('text').attr('x', x(last.rok) + 8).attr('y', yy).attr('font-size', 13).attr('font-weight', 700).attr('fill', fuel(k).color);
            dole = yy + (wrap(t, fuel(k).label, x(last.rok) + 8, r - 12, 15) - 1) * 15;
        });
        var rule = svg.append('line').attr('y1', top).attr('y2', top + plotH).attr('stroke', C.title).style('display', 'none');
        svg.append('rect').attr('x', m.l).attr('y', top).attr('width', w - r - m.l).attr('height', plotH).attr('fill', 'transparent')
            .on('mousemove', function (ev) {
                var yr = Math.round(x.invert(d3.pointer(ev)[0])), d = rows.filter(function (q) { return q.rok === yr; })[0];
                if (!d) return;
                rule.attr('x1', x(yr)).attr('x2', x(yr)).style('display', null);
                showTip(ev, '<b>' + yr + '</b><br>' + KEYS.map(function (k) { return sw(fuel(k).color) + fuel(k).label + ': ' + cz(d[k], 1) + ' PJ'; }).join('<br>'));
            })
            .on('mouseleave', function () { rule.style('display', 'none'); hideTip(); });
        return top + plotH + 32;
    }, 'spotreba');

    var pohled = POHLEDY[0];
    var spotreba = mount('spotreba', kresliSpotrebu(function () { return pohled; }, 1.2));
    if (spotreba && DEV) prepinac('spotreba', POHLEDY, function (d) { pohled = d; spotreba(); });
    mount('emise', kresliSpotrebu(function () { return EMISE; }));


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

    // Mapy SO ORP (orp_mapa.json, R/10_mapa_orp.R). Každá mapa: key = vlastnost v datech, prahy tříd
    // (pole, nebo funkce dat), barvy od světlé k tmavé a popisky tříd; bez barev se škála dopočte z palety paliva.
    var fmtPct = function (v) { return v == null ? '–' : cz(v, 1) + ' %'; };
    // Zvýraznění oblasti z textu (odkazy na konci souboru): oblast = { mapa, typ: 'orp' | 'kraj', kod }; mapa = klíč
    // mapy (rd_uhli, rd_plyn, bj_plyn, teplo_ets2, mf), bez něj všechny mapy; ORP podle názvu bez diakritiky („broumov“),
    // kraj podle kódu NUTS 3 („CZ042“). Každá vykreslená mapa si uloží funkci, která zvýraznění použije (svg._zvyraznit),
    // i po překreslení.
    var oblast = null, mapySvg = [];
    var bezDiakritiky = function (t) { return t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '-'); };
    var patri = function (p) { return oblast.typ === 'orp' ? bezDiakritiky(p.orp) === oblast.kod : p.KOD_CZNUTS3 === oblast.kod; };
    function zvyraznit(o) { oblast = o; mapySvg.forEach(function (n) { if (n._zvyraznit) n._zvyraznit(); }); }
    function mapy(MAPY, tipRadky) {
        return function (svg, w, data) {
            var geo = data._geo;
            if (!geo) {
                geo = { type: 'FeatureCollection', features: data.slice() };
                geo.features.forEach(function (f) { f.geometry = prevrat(f.geometry); });
                geo.features = geo.features.filter(function (f) { return f.geometry; });
                data._geo = geo;
                // hranice krajů (kraje_mapa.json), jednou na stránku pro všechny mapy
                var krajeEl = document.getElementById('graf-kraje-data');
                data._kraje = krajeEl ? JSON.parse(krajeEl.textContent).features
                    .map(function (f) { f.geometry = prevrat(f.geometry); return f; }).filter(function (f) { return f.geometry; }) : [];
            }
            var top = head(svg, w, null);
            // samostatná mapa (normální šířka) má stejnou velikost jako jedna mapa v širší mřížce map paliv, zarovnaná vlevo
            var gapX = 24, gapY = 22, ref = document.getElementById('graf-mapy-svg');
            var sirka = MAPY.length === 1 && ref && ref.clientWidth ? ref.clientWidth : w;
            var mrizka = sirka >= 560 ? 2 : 1, cols = Math.min(MAPY.length, mrizka);
            var panelW = Math.min(w, (sirka - gapX * (mrizka - 1)) / mrizka);
            var proj = d3.geoMercator().fitWidth(panelW, geo), path = d3.geoPath(proj);
            var mapH = Math.ceil(path.bounds(geo)[1][1]) + 2;
            var bins = MAPY.map(function (m) {
                var prahy = typeof m.prahy === 'function' ? m.prahy(geo.features) : m.prahy, n = prahy.length + 1;
                var tmava = m.zdroj && d3.lab(fuel(m.zdroj).color).darker(m.zdroj === 'teplo' ? 1.8 : 1).formatHex();
                var barvy = m.barvy || d3.range(n).map(function (i) { return d3.interpolateRgb('#f4f1ee', tmava)(i / (n - 1)); });
                return {
                    barva: function (v) { if (v == null) return '#ddd'; var i = 0; while (i < prahy.length && v >= prahy[i]) i++; return barvy[i]; },
                    legenda: barvy.map(function (b, i) {
                        return { color: b, label: m.popisky ? m.popisky[i] :
                            i === 0 ? 'pod ' + prahy[0] + ' %' : i === n - 1 ? prahy[n - 2] + ' % a víc' : prahy[i - 1] + '–' + prahy[i] };
                    })
                };
            });
            var all = [], y = top;
            for (var r = 0; r < Math.ceil(MAPY.length / cols); r++) {
                var rowH = 0, heads = [];
                for (var c = 0; c < cols; c++) {
                    var i = r * cols + c; if (i >= MAPY.length) break;
                    var g = svg.append('g').attr('transform', 'translate(' + c * (panelW + gapX) + ',' + y + ')'), hh = 0;
                    if (MAPY[i].title) {
                        var t = g.append('text').attr('y', 14).attr('font-size', 14).attr('font-weight', 700).attr('fill', C.title);
                        hh = wrap(t, MAPY[i].title, 0, panelW, 16) * 16 + 6;
                    }
                    hh += legend(g.append('g').attr('transform', 'translate(0,' + hh + ')'), bins[i].legenda, panelW, 12);
                    hh += 14;   // mezera mezi legendou a mapou
                    heads.push({ g: g, hh: hh, i: i });
                    rowH = Math.max(rowH, hh);
                }
                heads.forEach(function (h) {
                    var m = MAPY[h.i], b = bins[h.i];
                    var mg = h.g.append('g').attr('transform', 'translate(0,' + rowH + ')');
                    var ps = mg.append('g').selectAll('path').data(geo.features).join('path').attr('d', path)
                        .attr('fill', function (f) { return b.barva(f.properties[m.key]); }).attr('stroke', '#fff').attr('stroke-width', 0.4)
                        .on('mousemove', function (ev, f) {
                            all.forEach(function (a) {
                                var q = a.ps;
                                q.attr('stroke', function (x) { return x === f ? C.title : '#fff'; }).attr('stroke-width', function (x) { return x === f ? 1.5 : 0.4; });
                                q.filter(function (x) { return x === f; }).raise();
                            });
                            showTip(ev, '<b>' + f.properties.orp + '</b><br>' + tipRadky(f.properties).join('<br>'));
                        })
                        .on('mouseleave', function () { styl(); hideTip(); });
                    all.push({ ps: ps, mapa: m.mapa || m.key, kraje: mg.append('g').attr('class', 'kraje').style('pointer-events', 'none')
                        .selectAll('path').data(data._kraje).join('path').attr('d', path)
                        .attr('fill', 'none').attr('stroke', C.title).attr('stroke-width', 1).attr('stroke-linejoin', 'round') });
                });
                y += rowH + mapH + gapY;
            }
            // zvýraznění z textu jen v mapě, o které text mluví: ostatní obvody vyblednou, ORP tmavý obrys,
            // kraj silnější hranice
            var styl = function () {
                var kraj = oblast && oblast.typ === 'kraj' ? (geo.features.filter(function (f) { return patri(f.properties); })[0] || { properties: {} }).properties.KOD_KRAJ : null;
                all.forEach(function (a) {
                    var tady = oblast && (!oblast.mapa || oblast.mapa === a.mapa);
                    a.ps.attr('stroke', '#fff').attr('stroke-width', 0.4)
                        .attr('opacity', function (f) { return !tady || patri(f.properties) ? 1 : 0.3; });
                    if (tady && oblast.typ === 'orp') a.ps.filter(function (f) { return patri(f.properties); }).raise().attr('stroke', C.title).attr('stroke-width', 2.5);
                    a.kraje.attr('stroke-width', function (f) { return tady && kraj && f.properties.KOD_KRAJ === kraj ? 3 : 1; });
                });
            };
            svg.node()._zvyraznit = styl;
            if (mapySvg.indexOf(svg.node()) < 0) mapySvg.push(svg.node());
            styl();
            return y - gapY;
        };
    }

    // Kde se topí uhlím a plynem a kde je teplo ze zdrojů v ETS2. Barvy z palet paliv ve spotřebě.
    // Mřížka 2×2: plyn vlevo (nahoře rodinné domy, dole byty); obě mapy plynu mají stejnou škálu, uhlí a teplo také.
    var PRAHY_PLYN = [10, 20, 35, 50, 65], PRAHY_UHLI_TEPLO = [5, 10, 15, 20, 25];
    var PALIVA = [
        { key: 'rd_plyn', title: 'Rodinné domy na plyn', zdroj: 'plyn', prahy: PRAHY_PLYN },
        { key: 'rd_uhli', title: 'Rodinné domy na uhlí', zdroj: 'uhli', prahy: PRAHY_UHLI_TEPLO },
        { key: 'bj_plyn', title: 'Byty v bytových domech na plyn', zdroj: 'plyn', prahy: PRAHY_PLYN },
        { key: 'teplo_ets2', title: 'Byty na teple ze zdroje v ETS2 (odhad)', zdroj: 'teplo', prahy: PRAHY_UHLI_TEPLO }
    ];
    mount('mapy', mapy(PALIVA, function (p) { return PALIVA.map(function (q) { return q.title + ': ' + fmtPct(p[q.key]); }); }));

    // Ohrožení energetickou chudobou podle MF: kvartily podle pořadí, jako v reportu MF.
    var MF = [{
        key: 'podil', mapa: 'mf',
        prahy: function (fs) {
            var v = fs.map(function (f) { return f.properties.podil; }).sort(d3.descending), q = Math.ceil(v.length / 4);
            return [v[2 * q - 1], v[q - 1]];
        },
        barvy: ['#f4f1ee', d3.interpolateRgb('#fff', '#7f5a99')(0.45), '#7f5a99'],
        popisky: ['Ostatní', 'Ohrožené (2. kvartil)', 'Velmi ohrožené (horní kvartil)']
    }];
    mount('mapa-mf', mapy(MF, function (p) {
        return ['Výdaje na vytápění / příjmy: ' + fmtPct(p.podil), 'Podíl obydlí v rodinných domech: ' + fmtPct(p.rd), 'Rodinné domy ve třídě E–G: ' + fmtPct(p.rd_eg)];
    }), 'mapy');

    // Fosilní šoky vs. ETS2, Kč měsíčně: pruhy od levého okraje, popisek bílý v pruhu, hodnota za pruhem
    // v barvě pruhu, bez legendy. Když se popisek do pruhu nevejde, je za pruhem v jeho barvě před hodnotou.
    // názvy skupin v grafu (v datech z R zkratky)
    var SKUP_SOKY = { 'RD na plyn': 'Rodinný dům na plyn', 'Auto': 'Průměrné auto' };
    mount('soky', function (svg, w, data) {
        var items = data.map(function (d) {
            var p = d.polozka.split(': ');
            var skup = SKUP_SOKY[p[0]] || p[0], jmeno = p[1].replace('→', '–');
            return { skup: skup, jmeno: jmeno, druh: d.druh, v: +d.kc_mesic, raw: skup + ': ' + jmeno };
        });
        var top = head(svg, w, null) + 8, barH = 30, gap = 8, fs = 15, valW = 90;
        var x = d3.scaleLinear().domain([0, d3.max(items, function (d) { return d.v; })]).range([0, Math.max(60, w - valW)]);
        var y = top;
        d3.groups(items, function (d) { return d.skup; }).forEach(function (grp) {
            svg.append('text').attr('y', y + 15).attr('font-size', 16).attr('font-weight', 700).attr('fill', C.title).text(grp[0]);
            y += 26;
            grp[1].forEach(function (d) {
                var col = d.druh === 'ets2' ? COL.ets2 : COL.sok, bw = x(d.v);
                var row = svg.append('g').attr('transform', 'translate(0,' + y + ')')
                    .on('mousemove', function (ev) { showTip(ev, '<b>' + d.raw + '</b><br>≈ ' + cz(d.v) + ' Kč měsíčně'); })
                    .on('mouseleave', hideTip);
                row.append('rect').attr('width', bw).attr('height', barH).attr('fill', col);
                var lab = row.append('text').attr('x', 10).attr('y', barH / 2).attr('dy', '0.35em').attr('font-size', fs).attr('fill', '#fff').text(d.jmeno);
                var konec = bw + 8;
                if (lab.node().getComputedTextLength() > bw - 20) {
                    lab.attr('x', konec).attr('fill', col);
                    konec += lab.node().getComputedTextLength() + 8;
                }
                row.append('text').attr('x', konec).attr('y', barH / 2).attr('dy', '0.35em').attr('font-size', fs).attr('font-weight', 700)
                    .attr('fill', col).text(cz(d.v) + ' Kč');
                y += barH + gap;
            });
            y += 18;
        });
        return y - 18;
    });

    // Čtverečkový graf: velikost skupin (1 čtvereček = 10 tis. domácností) a zranitelné v nich
    // pohledy: bloky po 22 čtverečcích v řadě, nebo pruhy 4 čtverečky vysoké plněné zleva doprava
    var SKUP_POHLEDY = [{ key: 'pruhy', label: 'Pruhy' }, { key: 'bloky', label: 'Bloky' }];
    var skupPohled = SKUP_POHLEDY[0];
    // Čtverečkový graf skupin; o (volitelně): JED (tis. na čtvereček), zLabel, oLabel, zSlovo, poradi (zachovat pořadí dat)
    var kresliCtverecky = function (o) { o = Object.assign({ JED: 10, zLabel: 'Zranitelné domácnosti', oLabel: 'Ostatní domácnosti', zSlovo: 'zranitelných', poradi: false }, o || {}); return function (svg, w, data) {
        var JED = o.JED, SL = 22, PAD = 8, LW = 220, pruhy = skupPohled.key === 'pruhy', VYS = 4;
        // pořadí podle podílu zranitelných, skupina bez posuzování (NA) na konec
        if (!o.poradi) data = data.slice().sort(function (a, b) {
            return (isNA(b.podil_zranitelnych_pct) ? -1 : +b.podil_zranitelnych_pct) - (isNA(a.podil_zranitelnych_pct) ? -1 : +a.podil_zranitelnych_pct);
        });
        // v pruzích jsou skupiny, kterým ETS2 topení skoro nezdraží, sloučené do jedné na konci (bez pravidla 4 čtverečků)
        var SLOUCIT = ['ostatní: byt elektřina', 'ostatní: RD elektřina', 'ostatní: RD dřevo a biomasa', 'ostatní: RD tepelné čerpadlo', 'byt teplo (zdroj v ETS1)',
                       'ostatní: ostatní (solární a FVE, byty na dřevo nebo uhlí, dálkové teplo v RD, jiné)'];
        // web-core po vykreslení mění mezeru za jednopísmennými slovy na nezlomitelnou, i ve vložených datech
        var sloucit = function (d) { return SLOUCIT.indexOf(d.archetyp.replace(/\u00a0/g, ' ')) >= 0; };
        if (pruhy) {
            var sl = data.filter(sloucit);
            data = data.filter(function (d) { return !sloucit(d); });
            var dom = d3.sum(sl, function (d) { return +d.domacnosti_tis; }), zr = d3.sum(sl, function (d) { return isNA(d.zranitelne_tis) ? 0 : +d.zranitelne_tis; });
            data.push({ popisek: 'Ostatní', pozn: '(Byty a rodinné domy na elektřinu, rodinné domy na dřevo a na TČ, byty na teple ze zdroje v ETS1)', domacnosti_tis: dom,
                        zranitelne_tis: zr, podil_zranitelnych_pct: 100 * zr / dom, slouceno: true });
        }
        var top = head(svg, w, [{ key: 'z', label: o.zLabel, color: COL.zranitelne }, { key: 'o', label: o.oLabel, color: COL.ctverecek }]);
        var wide = w >= 520;
        var x0 = wide ? PAD + LW : PAD, textW = wide ? LW - PAD : w - 2 * PAD;
        var pocet = function (d) { return Math.round(+d.domacnosti_tis / JED); };
        var sloupcu = pruhy ? d3.max(data.filter(function (d) { return !d.slouceno; }), function (d) { return Math.ceil(pocet(d) / VYS); }) : SL;
        // čtverečky jako ve vaflovém grafu explaineru o světových regionech: ostré rohy, mezera 2 px
        var pitch = Math.min(18, (w - x0 - PAD) / sloupcu), Q = pitch - 2;
        var y = top;
        data.forEach(function (d) {
            // skupina bez posuzované zranitelnosti (byty na teple ze zdroje v ETS1): zranitelne_tis je NA
            var bez = isNA(d.zranitelne_tis);
            var n = pocet(d), z = bez ? 0 : Math.min(n, Math.round(+d.zranitelne_tis / JED));
            // výška ve čtverečcích: bloky po 22 v řadě; pruhy 4 vysoké, sloučená skupina tak vysoká, aby se vešla do šířky
            var vys = !pruhy ? Math.ceil(n / SL) : d.slouceno ? Math.ceil(n / sloupcu) : VYS;
            var px = function (i) { return pruhy ? Math.floor(i / vys) : i % SL; };
            var py = function (i) { return pruhy ? i % vys : Math.floor(i / SL); };
            var g = svg.append('g').attr('transform', 'translate(0,' + y + ')')
                .on('mousemove', function (ev) {
                    showTip(ev, '<b>' + d.popisek + '</b><br>' + cz(d.domacnosti_tis) + ' tis. domácností' + (bez ? '' : '<br>z toho ' + cz(d.zranitelne_tis) + ' tis. ' + o.zSlovo));
                })
                .on('mouseleave', hideTip);
            var t = g.append('text').attr('y', 11).attr('font-size', 13).attr('font-weight', 700).attr('fill', C.title);
            var dy = (wrap(t, d.popisek.replace(/ \(.*\)$/, ''), PAD, textW, 15) - 1) * 15;
            // vysvětlivka pod názvem skupiny běžným písmem a šedě (sloučená skupina „Ostatní“)
            if (d.pozn) dy += wrap(g.append('text').attr('y', 26 + dy).attr('font-size', 12).attr('fill', T.grey), d.pozn, PAD, textW, 14) * 14;
            g.append('text').attr('x', PAD).attr('y', 28 + dy).attr('font-size', 12).attr('fill', T.grey).text(cz(d.domacnosti_tis) + ' tis. domácností');
            g.append('text').attr('x', PAD).attr('y', 44 + dy).attr('font-size', 12).attr('font-weight', bez ? 400 : 700).attr('fill', bez ? T.grey : COL.zranitelne)
                .text(bez ? 'topení ETS2 nezdraží, neposuzováno' : cz(d.zranitelne_tis) + ' tis. ' + o.zSlovo + ' (' + cz(d.podil_zranitelnych_pct) + ' %)');
            var textH = 44 + dy, gridH = vys * pitch;
            var h = wide ? Math.max(gridH, textH) : textH + 6 + gridH;
            g.selectAll('rect.ctv').data(d3.range(n)).join('rect').attr('class', 'ctv')
                .attr('x', function (i) { return x0 + px(i) * pitch; })
                .attr('y', function (i) { return (wide ? 0 : textH + 6) + py(i) * pitch; })
                .attr('width', Q).attr('height', Q)
                .attr('fill', function (i) { return i < z ? COL.zranitelne : COL.ctverecek; });
            y += h + 18;
        });
        return y - 6;
    }; };
    var kresliSkupiny = kresliCtverecky();
    var skupiny = mount('skupiny', kresliSkupiny);
    // díl I: zranitelné domácnosti podle toho, zda mají důchodce nebo pracujícího, a kolik z nich nemá rezervu
    mount('rezerva', kresliCtverecky({ JED: 10, zLabel: 'Nemůže si dovolit neočekávaný výdaj', oLabel: 'Ostatní zranitelné domácnosti', zSlovo: 'bez rezervy', poradi: true }));
    // díl II: domácnosti s nárokem na platbu a zranitelné mezi nimi (stejný čtverečkový graf)
    mount('opravneni', kresliSkupiny);
    if (skupiny && DEV) prepinac('skupiny', SKUP_POHLEDY, function (d) { skupPohled = d; skupiny(); });

    // Bodový graf: náklad (x) proti vrácené části zdražení (y), jeden bod = jedno pravidlo
    // pohled na část vráceného zdražení: plná výše (2028–2029), průměr za období, poslední rok 2032 (naše pravidla na 25 %)
    var KOMP_POHLEDY = [{ key: 'vyrovnano_pct', label: '2028 a 2029', cap: 'v letech plné výše (2028 a 2029)' },
                        { key: 'vyrovnano_obdobi_pct', label: 'Průměr 2028–2032', cap: 'v průměru za roky 2028–2032' },
                        { key: 'vyrovnano_2032_pct', label: '2032', cap: 'v roce 2032, kdy naše platba klesne na čtvrtinu' }];
    var kompPohled = KOMP_POHLEDY[0];
    var kompenzace = mount('kompenzace', function (svg, w, data) {
        var V = kompPohled.key;
        var CIL = ['pal_vlastni_teplo_vse', 'pal_vlastni_teplo'];   // cílená pravidla, popisky nad sebou
        var isCil = function (d) { return CIL.indexOf(d.pravidlo) >= 0; };
        var y = d3.scaleLinear().domain([0, 100]), pct = function (v) { return v + ' %'; };
        var m = { l: sirkaOsyY(svg, y, 5, pct), r: 12 };
        var top = caption(svg, svg.node().dataset.caption.replace('v letech plné výše', kompPohled.cap), w) + 14;
        var plotH = Math.max(260, Math.min(380, w * 0.6));
        var xmax = Math.ceil(d3.max(data, function (d) { return +d.naklad_mld; }) / 10) * 10;
        var x = d3.scaleLinear().domain([0, xmax]).range([m.l, w - m.r]);
        y.range([top + plotH, top]);
        // cílová oblast: levně a hodně vráceno
        svg.append('rect').attr('x', x(0)).attr('y', y(100)).attr('width', x(15) - x(0)).attr('height', y(60) - y(100)).attr('fill', COL.pozadi).attr('rx', 4);
        var zona = svg.append('text').attr('y', y(100) + 24).attr('font-size', 12).attr('font-weight', 700).attr('fill', COL.ets2);
        wrap(zona, 'levně a hodně vráceno', x(0) + 6, x(15) - x(0) - 8, 14);
        osaY(svg.insert('g', ':first-child').attr('transform', 'translate(' + m.l + ',0)'), y, 5, w - m.r - m.l, 'zdražení dostanou zranitelní zpět', true, pct);
        osaX(svg.append('g').attr('transform', 'translate(0,' + (y(0) + 6) + ')'), x, x.ticks(5), function (v) { return cz(v); });
        axisText(svg.append('text')).attr('x', w - m.r).attr('y', y(0) + 44).attr('text-anchor', 'end').text('Stálo by ročně, mld. Kč');

        // popisky: cílená pravidla pod sebou vpravo od hloučku s vodicí čarou, ostatní vedle bodu
        var xLab = x(16), labW = w - m.r - xLab, yLab = y(60);
        var bodTip = function (d) {
            return '<b>' + d.popisek + '</b><br>stálo by ' + cz(d.naklad_mld, 1) + ' mld. Kč ročně<br>zranitelným by šlo ' + d.k_zranitelnym_pct +
                ' % peněz<br>vrátilo by ' + d[V] + ' % jejich zdražení (' + kompPohled.label + ')<br>nedostalo by nic ' + d.nedostalo_pct + ' % zranitelných';
        };
        CIL.forEach(function (k) {
            var d = data.filter(function (r) { return r.pravidlo === k; })[0];
            if (!d) return;
            var t = svg.append('text').attr('y', yLab + 4).attr('font-size', 12).attr('font-weight', 700).attr('fill', T.text);
            var lines = wrap(t, d.popisek, xLab, labW, 15);
            svg.append('line').attr('x1', x(+d.naklad_mld)).attr('y1', y(+d[V])).attr('x2', xLab - 4).attr('y2', yLab)
                .attr('stroke', COL.ets2);
            yLab += lines * 15 + 10;
        });
        svg.selectAll('circle.bod').data(data).join('circle').attr('class', 'bod')
            .attr('cx', function (d) { return x(+d.naklad_mld); }).attr('cy', function (d) { return y(+d[V]); }).attr('r', 7)
            .attr('fill', function (d) { return isCil(d) ? COL.ets2 : COL.ostatni; }).attr('stroke', '#fff').attr('stroke-width', 1.5)
            .on('mousemove', function (ev, d) { showTip(ev, bodTip(d)); }).on('mouseleave', hideTip);
        data.filter(function (d) { return !isCil(d); }).forEach(function (d) {
            var levo = d.pravidlo === 'plosne';
            svg.append('text').attr('x', x(+d.naklad_mld) + (levo ? -12 : 12)).attr('y', y(+d[V]) + 4)
                .attr('text-anchor', levo ? 'end' : 'start').attr('font-size', 12).attr('fill', T.text).text(d.popisek);
        });
        return y(0) + 52;
    });
    if (kompenzace) prepinac('kompenzace', KOMP_POHLEDY, function (d) { kompPohled = d; kompenzace(); });

    // Kolik by dostala zranitelná domácnost měsíčně: zdražení vytápění proti platbě podle návrhu PAQ a CVF a našeho návrhu
    mount('castky', function (svg, w, data) {
        var S = [{ key: 'zdrazeni', label: 'Zdražení vytápění kvůli ETS2', color: COL.sok },
                 { key: 'paq', label: 'Návrh PAQ a CVF', color: COL.ostatni },
                 { key: 'cil', label: 'Cílená sleva a příplatek k důchodu', color: d3.interpolateRgb('#fff', COL.ets2)(0.4) },
                 { key: 'nas', label: 'Náš návrh', color: COL.ets2 }];
        var top = head(svg, w, S);
        var PAD = 8, barH = 18, gap = 4, wide = w >= 520, LW = wide ? 200 : 0;
        var xmax = d3.max(data, function (d) { return d3.max(S, function (s) { return +d[s.key]; }); });
        var x = d3.scaleLinear().domain([0, xmax * 1.15]).range([0, w - LW - 2 * PAD]);
        var y = top + 6;
        data.forEach(function (d) {
            var g = svg.append('g').attr('transform', 'translate(0,' + y + ')');
            var t = g.append('text').attr('y', 13).attr('font-size', 13).attr('font-weight', 700).attr('fill', C.title);
            var lines = wrap(t, d.skupina, PAD, wide ? LW - 2 * PAD : w - 2 * PAD, 15);
            var by = wide ? 0 : lines * 15 + 6;
            S.forEach(function (s, i) {
                var v = +d[s.key], yy = by + i * (barH + gap);
                g.append('rect').attr('x', LW + PAD).attr('y', yy).attr('width', x(v)).attr('height', barH).attr('fill', s.color)
                    .on('mousemove', function (ev) { showTip(ev, '<b>' + d.skupina + '</b><br>' + s.label + ': ' + cz(v) + ' Kč měsíčně'); })
                    .on('mouseleave', hideTip);
                g.append('text').attr('x', LW + PAD + x(v) + 6).attr('y', yy + 13).attr('font-size', 12).attr('fill', T.text).text(cz(v) + ' Kč');
            });
            y += Math.max(wide ? lines * 15 : 0, by + S.length * (barH + gap)) + 18;
        });
        return y;
    });

    // Peníze na pomoc, mld. Kč ročně: fond a náklad pomoci.
    // Modrá = přímé platby (strop fondu i cílená platba), světle modrá = investice; výměna zdrojů je rozsah.
    var FIN_POHLEDY = [{ key: 'rok', label: 'Ročně' }, { key: 'obdobi', label: 'Za celé období fondu' }];
    var finPohled = FIN_POHLEDY[0];
    var financovani = mount('financovani', function (svg, w, vse) {
        var data = vse.filter(function (d) { return d.pohled === finPohled.key; });
        var svetle = d3.interpolateRgb('#fff', COL.ets2)(0.4);
        if (finPohled.key === 'obdobi') return financovaniObdobi(svg, w, data, svetle);
        var SEG = {
            prime: { label: 'přímé platby, nejvýš 37,5 %', color: COL.ets2 },
            investice: { label: 'investice', color: svetle },
            cilena: { label: 'cílená platba', color: COL.ets2 },
            pruvodci: { label: 'průvodci', color: svetle },
            vymena: { label: 'výměna zdrojů', color: svetle }
        };
        var RADKY = [
            { key: 'fond', label: 'Česko by dostalo ze Sociálního klimatického fondu' },
            { key: 'pomoc', label: 'Pomoc zranitelným domácnostem by stála' }
        ];
        var top = head(svg, w, [{ label: 'Přímé platby', color: COL.ets2 }, { label: 'Investice', color: svetle }]);
        var m = { l: 0, r: 56 }, barH = 26, labH = 20, gap = 18;
        var total = function (rows) { return d3.sum(rows, function (d) { return +d.mld; }); };
        var xmax = d3.max(RADKY, function (r) {
            var rows = data.filter(function (d) { return d.radek === r.key; });
            return total(rows) + d3.max(rows, function (d) { return isNA(d.mld_max) ? 0 : d.mld_max - d.mld; });
        });
        var x = d3.scaleLinear().domain([0, xmax]).range([m.l, w - m.r]);
        var yBar = {}, xStrop = null;
        RADKY.forEach(function (r, i) {
            var y0 = top + i * (labH + barH + gap);
            svg.append('text').attr('y', y0 + 14).attr('font-size', 14).attr('font-weight', 600).attr('fill', T.text).text(r.label);
            var yb = yBar[r.key] = y0 + labH, acc = 0, hi = 0;
            data.filter(function (d) { return d.radek === r.key; }).forEach(function (d) {
                var s = SEG[d.segment], v = +d.mld, vMax = isNA(d.mld_max) ? v : +d.mld_max;
                var tipText = '<b>' + s.label + '</b><br>' + (vMax > v ? cz(v, 1) + '–' + cz(vMax, 1) : cz(v, 2)) + ' mld. Kč ročně';
                var g = svg.append('g').on('mousemove', function (ev) { showTip(ev, tipText); }).on('mouseleave', hideTip);
                g.append('rect').attr('x', x(acc)).attr('y', yb).attr('width', x(acc + v) - x(acc)).attr('height', barH).attr('fill', s.color);
                if (vMax > v) g.append('rect').attr('x', x(acc + v)).attr('y', yb).attr('width', x(acc + vMax) - x(acc + v)).attr('height', barH)
                    .attr('fill', s.color).attr('opacity', 0.45);
                var t = g.append('text').attr('x', x(acc) + 6).attr('y', yb + barH / 2 + 4).attr('font-size', 12)
                    .attr('fill', s.color === svetle ? T.text : '#fff').text(s.label);
                if (t.node().getComputedTextLength() > x(acc + v) - x(acc) - 10) t.remove();
                if (d.segment === 'prime') xStrop = x(acc + v);
                acc += v; hi = Math.max(hi, acc - v + vMax);
            });
            var c1 = function (v) { return (+v.toFixed(1)).toLocaleString('cs-CZ'); };
            var lo = acc, popis = hi > lo + 0.05 ? c1(lo) + '–' + c1(hi) : c1(lo);
            svg.append('text').attr('x', x(hi) + 6).attr('y', yb + barH / 2 + 5).attr('font-size', 14).attr('font-weight', 700)
                .attr('fill', T.text).text(popis);
        });
        // strop přímých plateb z fondu protažený k nákladu pomoci
        if (xStrop != null) {
            svg.append('line').attr('x1', xStrop).attr('x2', xStrop).attr('y1', yBar.fond).attr('y2', yBar.pomoc + barH + 4)
                .attr('stroke', T.text).attr('stroke-dasharray', '3 3');
            axisText(svg.append('text')).attr('x', xStrop + 4).attr('y', yBar.pomoc + barH + 16).text('strop přímých plateb z fondu');
        }
        return yBar.pomoc + barH + 24;
    });
    if (financovani) prepinac('financovani', FIN_POHLEDY, function (d) { finPohled = d; financovani(); });

    // Tok peněz z povolenek ETS2 za roky 2028–2032 (tok_penez.csv): kdo platí → povolenky → kam jde výnos → na co.
    // Přímé platby a investice v barvách grafu financování; plátci a ostatní šedě.
    mount('tok', function (svg, w, data) {
        if (!d3.sankey) return 0;
        var svetle = d3.interpolateRgb('#fff', COL.ets2)(0.4);
        var BARVY = {
            'Vytápění domácností': COL.sok, 'Osobní auta': T.grey, 'Nákladní doprava': T.grey, 'Vytápění služeb a úřadů': T.grey,
            'Povolenky ETS2': C.title, 'Sociální klimatický fond': C.title, 'Státní rozpočet (jen klima a sociální)': C.title,
            'Investice z plánu': svetle, 'Přímé platby': COL.ets2, 'Další klimatická a sociální opatření': COL.ostatni, 'Rozdíl proti stropu': T.grey };
        var SLOUPCE = ['Kdo by platil', 'Povolenky', 'Kam jde výnos', 'Na co by šel'];
        // web-core po vykreslení mění mezeru za jednopísmennými slovy na nezlomitelnou, i ve vložených datech
        var rows = data.filter(function (d) { return d.zdroj !== 'citlivost' && +d.mld > 0; }).map(function (d) {
            return { zdroj: d.zdroj.replace(/ /g, ' '), cil: d.cil.replace(/ /g, ' '), mld: +d.mld };
        });
        var jm = [];
        rows.forEach(function (d) { [d.zdroj, d.cil].forEach(function (n) { if (jm.indexOf(n) < 0) jm.push(n); }); });
        var top = caption(svg, svg.node().dataset.caption, w) + 24, H = top + 440;
        var graf = d3.sankey().nodeId(function (d) { return d.name; }).nodeAlign(d3.sankeyLeft).nodeWidth(12).nodePadding(22).nodeSort(null)
            .extent([[0, top], [w, H - 4]])({
                nodes: jm.map(function (n) { return { name: n }; }),
                links: rows.map(function (d) { return { source: d.zdroj, target: d.cil, value: d.mld }; })
            });
        var xs = d3.groups(graf.nodes, function (d) { return d.depth; }).map(function (g) { return g[1][0]; });
        svg.append('g').selectAll('text').data(xs).join('text')
            .attr('x', function (d) { return d.depth === 0 ? d.x0 : d.depth === 3 ? d.x1 : (d.x0 + d.x1) / 2; })
            .attr('y', top - 10).attr('text-anchor', function (d) { return d.depth === 0 ? 'start' : d.depth === 3 ? 'end' : 'middle'; })
            .attr('font-size', 11).attr('font-weight', 700).attr('fill', C.axis)
            .text(function (d) { return SLOUPCE[d.depth].toUpperCase(); });
        var barva = function (d) { return BARVY[d.name] || COL.ostatni; };
        svg.append('g').attr('fill', 'none').selectAll('path').data(graf.links).join('path')
            .attr('d', d3.sankeyLinkHorizontal())
            .attr('stroke', function (d) { return barva(d.source.depth === 0 ? d.source : d.target); })
            .attr('stroke-opacity', function (d) { return d.target.name === 'Přímé platby' ? 0.8 : 0.3; })
            .attr('stroke-width', function (d) { return Math.max(1, d.width); })
            .on('mousemove', function (ev, d) { showTip(ev, '<b>' + d.source.name + ' → ' + d.target.name + '</b><br>' + cz(d.value) + ' mld. Kč'); })
            .on('mouseleave', hideTip);
        svg.append('g').selectAll('rect').data(graf.nodes).join('rect')
            .attr('x', function (d) { return d.x0; }).attr('y', function (d) { return d.y0; }).attr('rx', 2)
            .attr('width', function (d) { return d.x1 - d.x0; }).attr('height', function (d) { return Math.max(2, d.y1 - d.y0); })
            .attr('fill', barva);
        // popisky: název tučně, částka pod ním; bílý obrys kvůli čitelnosti nad toky
        var lx = function (d) { return d.depth >= 2 ? d.x0 - 8 : d.x1 + 8; };
        var lab = svg.append('g').selectAll('text').data(graf.nodes).join('text')
            .attr('x', lx).attr('y', function (d) { return (d.y0 + d.y1) / 2 - 7; })
            .attr('text-anchor', function (d) { return d.depth >= 2 ? 'end' : 'start'; }).attr('font-size', 12)
            .attr('paint-order', 'stroke').attr('stroke', '#fff').attr('stroke-width', 4).attr('stroke-linejoin', 'round');
        lab.append('tspan').attr('font-weight', 700).attr('fill', function (d) { return d.name === 'Přímé platby' ? COL.ets2 : T.text; })
            .text(function (d) { return d.name; });
        lab.append('tspan').attr('x', lx).attr('dy', '1.3em').attr('fill', C.axis).text(function (d) { return cz(d.value) + ' mld. Kč'; });
        return H;
    });

    // Pohled za celé období: každá položka vlastní pruh, fond 2026–2032, opatření 2028–2032
    function financovaniObdobi(svg, w, data, svetle) {
        var SKUPINY = [
            { key: 'fond', label: 'Sociální klimatický fond pro Česko, 2026–2032', polozky: {
                celkem: { label: 'Celkem včetně národního podílu', color: COL.ostatni },
                prime: { label: 'Nejvýš na přímé platby (37,5 %)', color: COL.ets2 },
                investice: { label: 'Zbytek na investice', color: svetle } } },
            { key: 'pomoc', label: 'Opatření, 2028–2032', polozky: {
                cilena: { label: 'Cílená platba podle návrhu výše', color: COL.ets2 },
                vymena: { label: 'Výměna zdrojů ve všech zranitelných domech na uhlí', color: svetle },
                pruvodci: { label: 'Síť průvodců', color: svetle } } }
        ];
        var top = head(svg, w, null, 'Základní scénář, mld. Kč za celé období');
        var m = { r: 64 }, barH = 22, labH = 18, rowGap = 10, groupGap = 18;
        var kreslene = data.filter(function (d) { return d.radek === 'fond' || d.radek === 'pomoc'; });
        var x = d3.scaleLinear().domain([0, d3.max(kreslene, function (d) { return isNA(d.mld_max) ? +d.mld : +d.mld_max; })]).range([0, w - m.r]);
        var c1 = function (v) { return (+(+v).toFixed(1)).toLocaleString('cs-CZ'); };
        var y = top;
        SKUPINY.forEach(function (sk) {
            svg.append('text').attr('y', y + 14).attr('font-size', 14).attr('font-weight', 700).attr('fill', T.text).text(sk.label);
            y += 26;
            data.filter(function (d) { return d.radek === sk.key; }).forEach(function (d) {
                var p = sk.polozky[d.segment], v = +d.mld, vMax = isNA(d.mld_max) ? v : +d.mld_max;
                var popis = vMax > v ? c1(v) + '–' + c1(vMax) : c1(v);
                axisText(svg.append('text')).attr('y', y + 12).attr('fill', T.text).text(p.label);
                var yb = y + labH;
                var g = svg.append('g').on('mousemove', function (ev) { showTip(ev, '<b>' + p.label + '</b><br>' + popis + ' mld. Kč'); })
                    .on('mouseleave', hideTip);
                g.append('rect').attr('y', yb).attr('width', x(v)).attr('height', barH).attr('fill', p.color);
                if (vMax > v) g.append('rect').attr('x', x(v)).attr('y', yb).attr('width', x(vMax) - x(v)).attr('height', barH)
                    .attr('fill', p.color).attr('opacity', 0.45);
                svg.append('text').attr('x', x(vMax) + 6).attr('y', yb + barH / 2 + 5).attr('font-size', 14).attr('font-weight', 700)
                    .attr('fill', T.text).text(popis);
                y = yb + barH + rowGap;
            });
            y += groupGap;
        });
        return y;
    }
    // Odkazy v textu na oblasti v mapách: [Broumov](#mapa-rd_uhli-orp-broumov), [Ústeckém](#mapa-rd_uhli-kraj-CZ042);
    // mapa je nepovinná (#mapa-orp-broumov zvýrazní ve všech). Jen na zařízení s myší: najetí zvýrazní oblast.
    // Na dotykových jsou to obyčejná slova.
    var sMysi = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    document.querySelectorAll('a[href^="#mapa-"]').forEach(function (a) {
        var m = a.getAttribute('href').match(/^#mapa-(?:(rd_uhli|rd_plyn|bj_plyn|teplo_ets2|mf)-)?(orp|kraj)-(.+)$/);
        if (!m) return;
        var o = { mapa: m[1], typ: m[2], kod: m[3] };
        a.classList.add(sMysi ? 'mapa-odkaz' : 'mapa-odkaz-vypnuto');
        a.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); });
        if (!sMysi) { a.setAttribute('tabindex', '-1'); return; }
        ['mouseenter', 'focus'].forEach(function (ev) { a.addEventListener(ev, function () { zvyraznit(o); }); });
        ['mouseleave', 'blur'].forEach(function (ev) { a.addEventListener(ev, function () { zvyraznit(null); }); });
    });
})();
