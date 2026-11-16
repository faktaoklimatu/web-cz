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
