// Grafy série ETS2 a domácnosti. Data jsou vložená ze _data/ets2/*.csv (generuje R/13_data_web.R v dílně,
// ručně neupravovat); kreslí knihovna fok-chart-* (assets-local/charts/).
(function () {
    if (!window.d3 || typeof FoKTheme === 'undefined') return;
    var cz = function (v, d) { return (+v).toLocaleString('cs-CZ', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };

    var GRAFY = {
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
