// Grafy série ETS2 a domácnosti. Data jsou vložená ze _data/ets2/*.csv (generuje R/13_data_web.R v dílně,
// ručně neupravovat); kreslí knihovna fok-chart-* (assets-local/charts/).
(function () {
    if (!window.d3 || typeof FoKTheme === 'undefined') return;
    var cz = function (v, d) { return (+v).toLocaleString('cs-CZ', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };

    var GRAFY = {
        // Čtverečkový graf: velikost skupin (1 čtvereček = 10 tis. domácností) a zranitelné v nich
        skupiny: function (sel, data) {
            var JED = 10, SL = 22, Q = 13, G = 3, LW = 236, W = 600;
            var rows = data.map(function (d) {
                // skupina bez posuzované zranitelnosti (byty na teple ze zdroje v ETS1): zranitelne_tis je NA
                var bez = d.zranitelne_tis === 'NA' || d.zranitelne_tis === '' || d.zranitelne_tis == null;
                var n = Math.round(+d.domacnosti_tis / JED), z = bez ? 0 : Math.min(n, Math.round(+d.zranitelne_tis / JED));
                return { d: d, n: n, z: z, bez: bez, r: Math.ceil(n / SL) };
            });
            var y = 0, H = 0;
            // zvýrazněné skupiny (podbarvení řádku): domácnosti, kterým by ETS2 zdražilo topení nejvíc
            var ZVYR = ['RD plyn', 'RD uhlí', 'byt plyn', 'byt teplo (zdroj v ETS2)'];
            rows.forEach(function (r) { r.h = Math.max(r.r * (Q + G), 44); r.zvyr = ZVYR.indexOf(r.d.archetyp) >= 0; r.y = y + 6; y += r.h + 18; });
            y += 6;
            H = y;
            var svg = d3.select(sel).append('svg').attr('viewBox', '0 0 ' + W + ' ' + H).attr('width', '100%').style('display', 'block')
                .style('font-family', FoKTheme.font);
            var g = svg.selectAll('g.sk').data(rows).join('g').attr('class', 'sk').attr('transform', function (r) { return 'translate(0,' + r.y + ')'; });
            g.filter(function (r) { return r.zvyr; }).append('rect').attr('x', -6).attr('y', -6).attr('width', W + 6)
                .attr('height', function (r) { return r.h + 10; }).attr('rx', 6).attr('fill', '#fdeee9');
            g.append('text').attr('x', 0).attr('y', 11).attr('font-size', 13).attr('font-weight', 700).attr('fill', FoKTheme.colors.text)
                .text(function (r) { return r.d.popisek.replace(/ \(.*\)$/, ''); });
            g.append('text').attr('x', 0).attr('y', 28).attr('font-size', 12).attr('fill', FoKTheme.colors.grey)
                .text(function (r) { return cz(r.d.domacnosti_tis) + ' tis. domácností'; });
            g.append('text').attr('x', 0).attr('y', 44).attr('font-size', 12).attr('font-weight', 700).attr('fill', '#c2412a')
                .attr('fill', function (r) { return r.bez ? FoKTheme.colors.grey : '#c2412a'; })
                .attr('font-weight', function (r) { return r.bez ? 400 : 700; })
                .text(function (r) { return r.bez ? 'topení ETS2 nezdraží, neposuzováno' : cz(r.d.zranitelne_tis) + ' tis. zranitelných (' + cz(r.d.podil_zranitelnych_pct) + ' %)'; });
            g.each(function (r) {
                d3.select(this).selectAll('rect.ctv').data(d3.range(r.n)).join('rect').attr('class', 'ctv')
                    .attr('x', function (i) { return LW + (i % SL) * (Q + G); })
                    .attr('y', function (i) { return Math.floor(i / SL) * (Q + G); })
                    .attr('width', Q).attr('height', Q).attr('rx', 2)
                    .attr('fill', function (i) { return i < r.z ? '#f06a4e' : '#c9d6e6'; })
                    .append('title').text(r.d.popisek + ': ' + cz(r.d.domacnosti_tis) + ' tis. domácností' + (r.bez ? '' : ', z toho ' + cz(r.d.zranitelne_tis) + ' tis. zranitelných'));
            });
        },
        // Spotřeba energie domácností podle zdroje, PJ (2005–2024)
        spotreba: function (sel, data) {
            var keys = ['uhli', 'plyn', 'drevo', 'jadro', 'oze'];
            fokAreaChartStacked(sel, data.map(function (d) {
                var r = { rok: +d.rok }; keys.forEach(function (k) { r[k] = +d[k]; }); return r;
            }), {
                x: function (d) { return d.rok; },
                keys: keys,
                colors: { uhli: '#8e2a1a', plyn: '#d9573b', drevo: '#c9b27c', jadro: '#a6e3bf', oze: '#5dcc7c' },
                labels: { uhli: 'Uhlí', plyn: 'Plyn a ropné produkty', drevo: 'Dřevo a jiná biomasa', jadro: 'Jádro a ostatní', oze: 'Obnovitelná elektřina a tepelná čerpadla' },
                legend: true,
                yLabel: 'PJ',
                xFormat: function (x) { return String(x); },
                xTickValues: [2005, 2010, 2015, 2020, 2024],
                width: 600, height: 360,
                tooltipHtml: function (r) {
                    return '<b>' + r.rok + '</b><br>' + keys.map(function (k) {
                        return { uhli: 'Uhlí', plyn: 'Plyn a ropné produkty', drevo: 'Dřevo a jiná biomasa', jadro: 'Jádro a ostatní', oze: 'Obnovitelná el. a TČ' }[k] + ': ' + cz(r[k], 1) + ' PJ';
                    }).join('<br>');
                }
            });
        },
        // Fosilní šoky vs. ETS2, Kč měsíčně
        soky: function (sel, data) {
            fokBarChartStacked(sel, data.map(function (d) {
                return { label: d.polozka, sok: d.druh === 'sok' ? +d.kc_mesic : 0, ets2: d.druh === 'ets2' ? +d.kc_mesic : 0 };
            }), {
                keys: ['sok', 'ets2'], horizontal: true, showInnerLabels: true,
                colors: { sok: '#d9573b', ets2: '#0050ae' }, labels: { sok: 'Cenový šok', ets2: 'Zavedení ETS2' },
                yLabel: 'Kč měsíčně', width: 600, height: 230, margins: { left: 200 }, narrowLabelsOutside: true,
                labelFormat: function (v) { return cz(v) + ' Kč'; },
                tooltipHtml: function (r) { return '<b>' + r.label + '</b><br>≈ ' + cz(r.sok + r.ets2) + ' Kč měsíčně'; }
            });
        },
        // Zranitelné domácnosti podle archetypu, tis.
        zranitelne: function (sel, data) {
            fokBarChartStacked(sel, data.map(function (d) {
                return { label: d.popisek + ' · ' + cz(d.ets2_kc_mesic) + ' Kč', v: +d.zranitelne_tis, raw: d };
            }), {
                keys: ['v'], horizontal: true, showInnerLabels: true, legend: false,
                colors: { v: '#0050ae' }, labels: { v: 'Zranitelné domácnosti, tis.' },
                yLabel: 'tis. domácností', width: 600, height: 260, margins: { left: 210 }, narrowLabelsOutside: true,
                labelFormat: function (v) { return cz(v) + ' tis.'; },
                tooltipHtml: function (r) {
                    var d = r.raw;
                    return '<b>' + d.popisek + '</b><br>asi ' + cz(d.zranitelne_tis) + ' tis. domácností (95% interval ' + d.interval_tis + ' tis.)<br>ETS2 by je stálo ' + cz(d.ets2_kc_mesic) + ' Kč měsíčně, ' + cz(d.ets2_pct_prijmu, 1) + ' % příjmu';
                }
            });
        },
        // Bodový graf: náklad (x) proti vrácené části zdražení (y), jeden bod = jedno pravidlo
        'kompenzace-bod': function (sel, data) {
            var W = 600, H = 360, m = { t: 16, r: 20, b: 46, l: 52 };
            var CIL = ['pal_vlastni_teplo', 'pal_vlastni_teplo_vse'];
            // popisky: hlouček cílených pravidel má popisky pod sebou s vodicí čarou (absolutní poloha v datech x, y);
            // ostatní body mají popisek vedle sebe [dx, dy, zarovnání]
            var ABS = { pal_vlastni_teplo: [75, 82], pal_vlastni_teplo_vse: [75, 74] };
            var POS = { plosne: [-12, 4, 'end'] };
            var xmax = Math.ceil(d3.max(data, function (d) { return +d.naklad_obdobi_mld; }) / 50) * 50;
            var x = d3.scaleLinear().domain([0, xmax]).range([m.l, W - m.r]);
            var y = d3.scaleLinear().domain([0, 100]).range([H - m.b, m.t]);
            var svg = d3.select(sel).append('svg').attr('viewBox', '0 0 ' + W + ' ' + H).attr('width', '100%').style('display', 'block')
                .style('font-family', FoKTheme.font).style('font-size', '12px');
            // cílová oblast: levně a hodně vráceno
            svg.append('rect').attr('x', x(0)).attr('y', y(100)).attr('width', x(60) - x(0)).attr('height', y(60) - y(100)).attr('fill', '#e6eef8').attr('rx', 4);
            svg.append('text').attr('x', x(0) + 6).attr('y', y(100) + 14).attr('fill', '#0050ae').attr('font-size', 11).text('levně a hodně vráceno');
            svg.append('g').attr('transform', 'translate(0,' + y(0) + ')').call(d3.axisBottom(x).ticks(5).tickFormat(function (v) { return cz(v); }))
                .call(function (g) { g.selectAll('text').attr('fill', FoKTheme.colors.grey); g.selectAll('line,path').attr('stroke', '#bbb'); });
            svg.append('g').attr('transform', 'translate(' + m.l + ',0)').call(d3.axisLeft(y).ticks(5).tickFormat(function (v) { return v + ' %'; }))
                .call(function (g) { g.selectAll('text').attr('fill', FoKTheme.colors.grey); g.selectAll('line,path').attr('stroke', '#bbb'); });
            svg.append('text').attr('x', W - m.r).attr('y', H - 8).attr('text-anchor', 'end').attr('fill', FoKTheme.colors.grey).text('Stálo by za roky 2028–2032, mld. Kč');
            svg.append('text').attr('transform', 'rotate(-90)').attr('x', -m.t).attr('y', 14).attr('text-anchor', 'end').attr('fill', FoKTheme.colors.grey).text('Zranitelní dostanou zpět, % zdražení');
            // pravidla s poklesem v čase: plný bod v plné výši (2028–2029), šipka k prázdnému kroužku = rok 2032 (25 % plné výše)
            var kles = data.filter(function (d) { return +d.vyrovnano_pct > +d.vyrovnano_2032_pct; });
            svg.append('defs').append('marker').attr('id', 'sipka-kles').attr('viewBox', '0 0 10 10').attr('refX', 9).attr('refY', 5)
                .attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto')
                .append('path').attr('d', 'M0,0 L10,5 L0,10 z').attr('fill', '#0050ae');
            svg.selectAll('line.kles').data(kles).join('line').attr('class', 'kles')
                .attr('x1', function (d) { return x(+d.naklad_obdobi_mld); }).attr('x2', function (d) { return x(+d.naklad_obdobi_mld); })
                .attr('y1', function (d) { return y(+d.vyrovnano_pct) + 9; }).attr('y2', function (d) { return y(+d.vyrovnano_2032_pct) - 8; })
                .attr('stroke', '#0050ae').attr('stroke-dasharray', '3 2').attr('marker-end', 'url(#sipka-kles)');
            svg.selectAll('circle.duch').data(kles).join('circle').attr('class', 'duch')
                .attr('cx', function (d) { return x(+d.naklad_obdobi_mld); }).attr('cy', function (d) { return y(+d.vyrovnano_2032_pct); })
                .attr('r', 6).attr('fill', 'none').attr('stroke', '#0050ae').attr('stroke-width', 1.5);
            if (kles.length) svg.append('text').attr('x', x(d3.max(kles, function (d) { return +d.naklad_obdobi_mld; })) + 12)
                .attr('y', y(+kles[0].vyrovnano_2032_pct) - 10).attr('fill', '#0050ae').attr('font-size', 11)
                .text('v roce 2032 platba klesne na čtvrtinu a vrátí ' + kles[0].vyrovnano_2032_pct + ' % (průměr za 5 let ' + kles[0].vyrovnano_obdobi_pct + ' %)');
            var b = svg.selectAll('g.bod').data(data).join('g').attr('class', 'bod')
                .attr('transform', function (d) { return 'translate(' + x(+d.naklad_obdobi_mld) + ',' + y(+d.vyrovnano_pct) + ')'; });
            b.append('circle').attr('r', 7).attr('fill', function (d) { return CIL.indexOf(d.pravidlo) >= 0 ? '#0050ae' : '#8a96a3'; }).attr('stroke', '#fff').attr('stroke-width', 1.5)
                .append('title').text(function (d) { return d.popisek + ': ' + cz(d.naklad_obdobi_mld, 1) + ' mld. Kč za 2028–2032, vrátí ' + d.vyrovnano_pct + ' % zdražení, nedostane nic ' + d.nedostalo_pct + ' % zranitelných'; });
            var cil = function (d) { return CIL.indexOf(d.pravidlo) >= 0; };
            b.filter(function (d) { return ABS[d.pravidlo]; }).insert('line', 'circle')
                .attr('x1', 0).attr('y1', 0).attr('stroke', '#0050ae').attr('stroke-width', 1)
                .attr('x2', function (d) { return x(ABS[d.pravidlo][0]) - x(+d.naklad_obdobi_mld) - 3; })
                .attr('y2', function (d) { return y(ABS[d.pravidlo][1]) - y(+d.vyrovnano_pct) - 4; });
            b.append('text')
                .attr('x', function (d) { return ABS[d.pravidlo] ? x(ABS[d.pravidlo][0]) - x(+d.naklad_obdobi_mld) : (POS[d.pravidlo] || [10])[0]; })
                .attr('y', function (d) { return ABS[d.pravidlo] ? y(ABS[d.pravidlo][1]) - y(+d.vyrovnano_pct) : (POS[d.pravidlo] || [0, 4])[1]; })
                .attr('text-anchor', function (d) { return (POS[d.pravidlo] || [0, 0, 'start'])[2]; })
                .attr('fill', FoKTheme.colors.text).attr('font-weight', function (d) { return cil(d) ? 700 : 400; })
                .text(function (d) { return d.popisek; });
        },
        // Tok peněz z povolenek ETS2 (Sankey), data _data/ets2/tok_penez.csv
        'tok': function (sel, data) {
            if (!d3.sankey) return;
            var W = 760, H = 470, TOP = 34;
            var BARVY = {
                'Vytápění domácností': '#d9573b', 'Osobní auta': '#e98a6f', 'Nákladní doprava': '#8a96a3', 'Vytápění služeb a úřadů': '#9aa6b2',
                'Povolenky ETS2': '#53616e', 'Sociální klimatický fond': '#0050ae', 'Státní rozpočet': '#2b3a4a',
                'Investice z plánu': '#5b8fd0', 'Přímé platby': '#f06a4e', 'Další opatření': '#a8b4c2' };
            var SLOUPCE = ['Kdo by platil', 'Povolenky', 'Kam jde výnos', 'Na co by šel'];
            // Jekyll vkládá do textu nezlomitelné mezery (např. za „a“, „z“), sjednotit kvůli párování názvů
            data = data.filter(function (d) { return d.zdroj !== 'citlivost'; });
            data = data.map(function (d) { return { zdroj: d.zdroj.replace(/\u00a0/g, ' '), cil: d.cil.replace(/\u00a0/g, ' '), mld: d.mld }; });
            var jm = []; data.forEach(function (d) { [d.zdroj, d.cil].forEach(function (n) { if (jm.indexOf(n) < 0) jm.push(n); }); });
            var graf = d3.sankey().nodeId(function (d) { return d.name; }).nodeWidth(12).nodePadding(22).nodeSort(null)
                .extent([[0, TOP], [W, H - 4]])({
                    nodes: jm.map(function (n) { return { name: n }; }),
                    links: data.filter(function (d) { return +d.mld > 0; }).map(function (d) { return { source: d.zdroj, target: d.cil, value: +d.mld }; })
                });
            var svg = d3.select(sel).append('svg').attr('viewBox', '0 0 ' + W + ' ' + H).attr('width', '100%').style('display', 'block')
                .style('font-family', FoKTheme.font).style('font-size', '12px');
            // záhlaví sloupců
            var xs = d3.groups(graf.nodes, function (d) { return d.depth; }).map(function (g) { return g[1][0]; });
            svg.append('g').selectAll('text').data(xs).join('text')
                .attr('x', function (d) { return d.depth === 0 ? d.x0 : (d.x0 > W / 2 && d.depth === 3 ? d.x1 : (d.x0 + d.x1) / 2); })
                .attr('y', 14).attr('text-anchor', function (d) { return d.depth === 0 ? 'start' : (d.depth === 3 ? 'end' : 'middle'); })
                .attr('font-size', 11).attr('font-weight', 700).attr('letter-spacing', '0.04em').attr('fill', FoKTheme.colors.grey)
                .text(function (d) { return SLOUPCE[d.depth].toUpperCase(); });
            // toky: z plátců barva plátce, dál barva cíle; přímé platby zvýrazněné
            var barvaToku = function (d) { return d.source.depth === 0 ? BARVY[d.source.name] : BARVY[d.target.name]; };
            svg.append('g').attr('fill', 'none').selectAll('path').data(graf.links).join('path')
                .attr('d', d3.sankeyLinkHorizontal()).attr('stroke', barvaToku)
                .attr('stroke-opacity', function (d) { return d.target.name === 'Přímé platby' ? 0.8 : 0.28; })
                .attr('stroke-width', function (d) { return Math.max(1, d.width); })
                .append('title').text(function (d) { return d.source.name + ' → ' + d.target.name + ': ' + cz(d.value) + ' mld. Kč'; });
            svg.append('g').selectAll('rect').data(graf.nodes).join('rect')
                .attr('x', function (d) { return d.x0; }).attr('y', function (d) { return d.y0; }).attr('rx', 2)
                .attr('width', function (d) { return d.x1 - d.x0; }).attr('height', function (d) { return Math.max(2, d.y1 - d.y0); })
                .attr('fill', function (d) { return BARVY[d.name] || '#888'; });
            // popisky: název tučně, částka pod ním; bílý obrys kvůli čitelnosti nad toky
            var lab = svg.append('g').selectAll('text').data(graf.nodes).join('text')
                .attr('x', function (d) { return d.depth >= 2 ? d.x0 - 8 : d.x1 + 8; })
                .attr('y', function (d) { return (d.y0 + d.y1) / 2 - 7; })
                .attr('text-anchor', function (d) { return d.depth >= 2 ? 'end' : 'start'; })
                .attr('paint-order', 'stroke').attr('stroke', 'var(--bg, #fff)').attr('stroke-width', 4).attr('stroke-linejoin', 'round');
            lab.append('tspan').attr('font-weight', 700).attr('fill', function (d) { return d.name === 'Přímé platby' ? '#c2412a' : FoKTheme.colors.text; })
                .text(function (d) { return d.name; });
            lab.append('tspan').attr('x', function (d) { return d.depth >= 2 ? d.x0 - 8 : d.x1 + 8; }).attr('dy', '1.3em')
                .attr('fill', FoKTheme.colors.grey).text(function (d) { return cz(d.value) + ' mld. Kč'; });
        },
        // Pravidla přímé platby: náklad a vyrovnaný podíl zdražení
        'kompenzace-naklad': function (sel, data) {
            fokBarChartStacked(sel, data.map(function (d) { return { label: d.popisek, v: +d.naklad_mld, raw: d }; }), {
                keys: ['v'], horizontal: true, showInnerLabels: true, legend: false, title: 'Stálo by ročně, mld. Kč',
                colors: { v: '#53616e' }, labels: { v: 'mld. Kč ročně' }, width: 600, height: 240, margins: { left: 270 }, narrowLabelsOutside: true,
                labelFormat: function (v) { return cz(v, 1); },
                tooltipHtml: function (r) { var d = r.raw; return '<b>' + d.popisek + '</b><br>' + cz(d.naklad_mld, 1) + ' mld. Kč ročně<br>zranitelným by šlo ' + d.k_zranitelnym_pct + ' % peněz<br>nedostalo by nic ' + d.nedostalo_pct + ' % zranitelných'; }
            });
        },
        'kompenzace-vyrovnano': function (sel, data) {
            fokBarChartStacked(sel, data.map(function (d) { return { label: d.popisek, v: +d.vyrovnano_pct, raw: d }; }), {
                keys: ['v'], horizontal: true, showInnerLabels: true, legend: false, title: 'Zranitelní by dostali zpět, % svého zdražení',
                colors: { v: '#0050ae' }, labels: { v: '%' }, yMax: 100, width: 600, height: 240, margins: { left: 270 }, narrowLabelsOutside: true,
                labelFormat: function (v) { return v + ' %'; },
                tooltipHtml: function (r) { var d = r.raw; return '<b>' + d.popisek + '</b><br>vrátilo by ' + d.vyrovnano_pct + ' % zdražení'; }
            });
        }
    };

    document.querySelectorAll('.ets2-graf').forEach(function (el, i) {
        var fig = el.closest('figure'), dataEl = fig && fig.querySelector('.graf-data');
        var kresli = GRAFY[el.dataset.graf];
        if (!dataEl || !kresli) return;
        var data = JSON.parse(dataEl.textContent);
        if (!data || !data.length) { el.textContent = 'Data grafu zatím chybí (spusťte R/13_data_web.R).'; return; }
        if (!el.id) el.id = 'ets2-graf-' + i;
        kresli('#' + el.id, data);
    });
})();
