/**
 * fosilni-elektrina-vysvetleni.js — the illustrations in the section "Jak to
 * počítáme" of collections/_studies/2026-interaktivni-prehled-fosilni-elektrina.md
 *
 * Data: assets-local/files/fosilni-elektrina/explainer.json, written by hand by
 * export_explainer.py in data-analysis (not by the regular pipeline):
 *   month    a few countries, one month, hourly: price, plant costs, wind and solar (GW),
 *            with the places to annotate
 *   noon     Germany, May-August noon and evening, 2021 vs 2022
 *   nordics  Sweden and Germany, yearly price, Swedish floor, ETS, Norwegian hydro
 */
document.addEventListener('DOMContentLoaded', () => {
  const DATA = '/assets-local/files/fosilni-elektrina/explainer.json';
  const theme = FoKTheme;
  const C = {
    lignite: '#81334b', hardcoal: '#4b5563', gas: '#d87069',
    price: '#111827', priceBelow: '#a8afb7', wind: '#2a78d6', solar: '#e0a100',
    grey: theme.colors.grey, grid: theme.axis.gridColor,
  };
  const FUELS = [
    { key: 'lignite', label: 'hnědé uhlí' },
    { key: 'hardcoal', label: 'černé uhlí' },
    { key: 'gas', label: 'plyn' },
  ];
  const num = (v, d = 0) => v.toFixed(d).replace('.', ',').replace('-', '−');
  const signed = (v, d = 1) => (v > 0 ? '+' : '') + num(v, d);
  const MONTHS = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'];

  const svgIn = (el, W, H) => d3.select(el).html('').append('svg')
    .attr('width', W).attr('height', H).attr('viewBox', `0 0 ${W} ${H}`)
    .style('display', 'block').attr('font-family', 'inherit');

  // Text of several lines at (x, y), growing downward.
  function textBlock(g, lines, x, y, o = {}) {
    const t = g.append('text').attr('x', x).attr('y', y).attr('font-size', o.size ?? 12)
      .attr('fill', o.color ?? '#1a202c').attr('text-anchor', o.anchor ?? 'start')
      .attr('font-weight', o.weight ?? 400);
    lines.forEach((l, i) => t.append('tspan').attr('x', x).attr('dy', i ? '1.25em' : 0).text(l));
    return t;
  }

  // ── 1. One month of hourly prices and plant costs, for a chosen country ───
  // The annotations come with the data (export_explainer.py finds them): their
  // texts are made here, and laid out in rows so that no two overlap and no
  // leader line crosses another text.
  const noteText = (a, c) => {
    const w = v => num(v);
    switch (a.type) {
      case 'calm': return `Bezvětří: vítr jen ${w(a.wind)} GW, cena až ${w(a.price)} EUR/MWh je nad náklady, fosilní elektrárny ji určují`;
      case 'wind': return `Větrné dny: vítr v průměru ${w(a.wind)} GW, cena je pod náklady v ${a.below} % hodin`;
      case 'sun': return `Slunce: ${a.day}. ${c.mo}. v poledne ${w(a.noon)}, večer ${w(a.eve)} EUR/MWh`;
      case 'ramp': return a.price_from < 15 && a.price_to < 15
        ? `Solární špička roste z ${w(a.solar_from)} na ${w(a.solar_to)} GW, polední cena je trvale kolem nuly`
        : `Nástup slunce: špička roste z ${w(a.solar_from)} na ${w(a.solar_to)} GW, polední cena klesá ze ${w(a.price_from)} na ${w(a.price_to)} EUR/MWh`;
      default: return '';
    }
  };
  // Wrap a text to lines of at most `max` characters.
  const wrap = (text, max) => {
    const lines = [];
    let cur = '';
    text.split(' ').forEach(word => {
      if ((cur + ' ' + word).trim().length > max && cur) { lines.push(cur); cur = word; } else cur = (cur + ' ' + word).trim();
    });
    return [...lines, cur];
  };

  function drawMarch(el, month, iso) {
    const W = Math.round(el.getBoundingClientRect().width);
    if (!W) return;
    const m = month.countries[iso];
    const wide = W >= 760;
    const [yr, mo] = month.month.split('-').map(Number);
    const mg = { top: 14, right: 12, left: 56 };
    const H1 = wide ? 320 : 250, H2 = 96, GAP = 30, AXIS = 22;
    const hours = d3.max(m.hour) + 1;
    const x = d3.scaleLinear().domain([0, hours]).range([mg.left, W - mg.right]);

    // 1. Lay out the annotations (wide screens): rows of text above the chart.
    const probeSvg = d3.select(el).html('').append('svg').attr('width', W).attr('height', 10).attr('font-family', 'inherit');
    const probe = probeSvg.append('text').attr('font-size', 11.5);
    const widthOf = t => { probe.text(t); return probe.node().getComputedTextLength(); };
    const notes = m.notes.map((a, i) => ({ ...a, n: i + 1, text: noteText(a, { mo }) }))
      .sort((p, q) => p.target - q.target);
    const ROW_H = 36, MAXW = 34;
    let rows = 0;
    if (wide) {
      const placed = [];
      notes.forEach(a => {
        a.lines = wrap(a.text, MAXW);
        a.w = d3.max(a.lines, widthOf);
        a.px = x(a.target);
        a.tx = Math.min(Math.max(a.px - 8, mg.left), W - mg.right - a.w);
        let row = 0;
        for (; row < 5; row++) {
          const clash = placed.some(p => (p.row === row && a.tx < p.tx + p.w + 12 && a.tx + a.w + 12 > p.tx)
            || (p.row > row && a.px > p.tx - 5 && a.px < p.tx + p.w + 5)    // my leader through a lower text
            || (p.row < row && p.px > a.tx - 5 && p.px < a.tx + a.w + 5));  // an upper leader through my text
          if (!clash) break;
        }
        a.row = row;
        rows = Math.max(rows, row + 1);
        placed.push(a);
      });
      // Lines of one note can be more than two: the row height follows the longest.
    }
    probeSvg.remove();
    const maxLines = wide ? d3.max(notes, a => a.lines.length) : 0;
    const rowH = Math.max(ROW_H, maxLines * 14 + 8);
    mg.top = wide ? 14 + rows * rowH + 14 : 14 + 22;   // narrow: room for the colour key

    const H = mg.top + H1 + GAP + H2 + AXIS;
    const svg = svgIn(el, W, H);
    const y1 = d3.scaleLinear().domain([-30, 230]).range([mg.top + H1, mg.top]);
    const top2 = mg.top + H1 + GAP;
    const y2 = d3.scaleLinear().domain([0, 50]).range([top2 + H2, top2]);
    const days = d3.range(0, 28, 7);

    // Grid, axes.
    const yTicks = [0, 50, 100, 150, 200];
    svg.append('g').selectAll('line').data(yTicks).join('line')
      .attr('x1', mg.left).attr('x2', W - mg.right).attr('y1', y1).attr('y2', y1)
      .attr('stroke', d => d === 0 ? C.grey : C.grid);
    svg.append('g').selectAll('text').data(yTicks).join('text')
      .attr('x', mg.left - 6).attr('y', d => y1(d) + 4).attr('text-anchor', 'end')
      .attr('font-size', 11).attr('fill', C.grey).text(d => d);
    svg.append('text').attr('x', mg.left - 6).attr('y', mg.top - 4).attr('text-anchor', 'end')
      .attr('font-size', 10).attr('fill', C.grey).text('EUR/MWh');
    svg.append('g').selectAll('line').data(days).join('line')
      .attr('x1', d => x(d * 24)).attr('x2', d => x(d * 24))
      .attr('y1', mg.top).attr('y2', top2 + H2).attr('stroke', C.grid).attr('stroke-dasharray', '2 3');
    svg.append('g').selectAll('text').data(days).join('text')
      .attr('x', d => x(d * 24)).attr('y', top2 + H2 + 16).attr('text-anchor', d => d === 0 ? 'start' : 'middle')
      .attr('font-size', 11).attr('fill', C.grey).text(d => `${1 + d}. ${mo}.`);
    [0, 25, 50].forEach(v => {
      svg.append('line').attr('x1', mg.left).attr('x2', W - mg.right).attr('y1', y2(v)).attr('y2', y2(v)).attr('stroke', C.grid);
      svg.append('text').attr('x', mg.left - 6).attr('y', y2(v) + 4).attr('text-anchor', 'end')
        .attr('font-size', 11).attr('fill', C.grey).text(v);
    });
    svg.append('text').attr('x', mg.left - 6).attr('y', top2 - 16).attr('text-anchor', 'end')
      .attr('font-size', 10).attr('fill', C.grey).text('GW');

    // The plant costs: steps; the price above or below the cheapest of them.
    const fuels = FUELS.filter(f => m[f.key]);
    svg.append('defs').append('clipPath').attr('id', 'fe-march-clip')
      .append('rect').attr('x', mg.left).attr('y', mg.top).attr('width', W - mg.left - mg.right).attr('height', H1);
    const plot = svg.append('g').attr('clip-path', 'url(#fe-march-clip)');
    fuels.forEach(f => plot.append('path').datum(m.hour.map((h, i) => [h, m[f.key][i]]))
      .attr('d', d3.line().x(d => x(d[0])).y(d => y1(d[1])).curve(d3.curveStepAfter))
      .attr('fill', 'none').attr('stroke', C[f.key]).attr('stroke-width', 2));
    const floor = m.hour.map((_, i) => Math.min(...fuels.map(f => m[f.key][i])));
    const above = [], below = [];
    for (let i = 1; i < m.hour.length; i++) {
      if (m.hour[i] - m.hour[i - 1] !== 1) continue;
      const seg = `M${x(m.hour[i - 1])},${y1(m.price[i - 1])}L${x(m.hour[i])},${y1(m.price[i])}`;
      ((m.price[i - 1] + m.price[i]) / 2 > (floor[i - 1] + floor[i]) / 2 ? above : below).push(seg);
    }
    plot.append('path').attr('d', below.join('')).attr('fill', 'none').attr('stroke', C.priceBelow).attr('stroke-width', 1.2);
    plot.append('path').attr('d', above.join('')).attr('fill', 'none').attr('stroke', C.price).attr('stroke-width', 1.2);

    // Wind and solar.
    [['wind', C.wind], ['solar', C.solar]].forEach(([k, col]) => svg.append('path')
      .datum(m.hour.map((h, i) => [h, m[k][i]]))
      .attr('d', d3.line().x(d => x(d[0])).y(d => y2(d[1]))).attr('fill', 'none')
      .attr('stroke', col).attr('stroke-width', 1.4));

    if (wide) {
      // Direct labels of the plant costs, spread so that they do not overlap, with a halo.
      const last = m.hour.length - 1, endX = x(m.hour[last]) - 4;
      const labs = fuels.map(f => ({ f, y: y1(m[f.key][last]) })).sort((p, q) => p.y - q.y);
      labs[0].y -= 8;
      for (let i = 1; i < labs.length; i++) labs[i].y = Math.max(labs[i].y + 12, labs[i - 1].y + 16);
      labs.forEach(l => svg.append('text').attr('x', endX).attr('text-anchor', 'end').attr('y', l.y)
        .attr('font-size', 11).attr('font-weight', 600).attr('fill', C[l.f.key]).text(l.f.label)
        .attr('stroke', '#fff').attr('stroke-width', 3).attr('paint-order', 'stroke'));
    } else {
      // On a narrow screen a colour key above the chart instead (the markers need the room).
      let kx = mg.left;
      fuels.forEach(f => {
        svg.append('line').attr('x1', kx).attr('x2', kx + 16).attr('y1', 8).attr('y2', 8).attr('stroke', C[f.key]).attr('stroke-width', 3);
        const t = svg.append('text').attr('x', kx + 21).attr('y', 12).attr('font-size', 11).attr('fill', C[f.key]).attr('font-weight', 600).text(f.label);
        kx += 21 + t.node().getComputedTextLength() + 14;
      });
    }
    // Wind and solar labels.
    svg.append('text').attr('x', mg.left + 4).attr('y', y2(46)).attr('font-size', 11).attr('font-weight', 600).attr('fill', C.wind).text('vítr')
      .attr('stroke', '#fff').attr('stroke-width', 3).attr('paint-order', 'stroke');
    svg.append('text').attr('x', mg.left + 40).attr('y', y2(46)).attr('font-size', 11).attr('font-weight', 600).attr('fill', C.solar).text('slunce')
      .attr('stroke', '#fff').attr('stroke-width', 3).attr('paint-order', 'stroke');

    // Annotations: a soft band over the days and a callout, or a numbered marker.
    notes.forEach(a => {
      svg.append('rect').attr('x', x(a.from)).attr('width', x(a.to) - x(a.from)).attr('y', mg.top).attr('height', top2 + H2 - mg.top)
        .attr('fill', '#81334b').attr('opacity', 0.05);
      const i = m.hour.indexOf(a.target), px = x(a.target), py = y1(Math.max(-30, Math.min(230, m.price[i])));
      if (wide) {
        const ty = 14 + a.row * rowH;
        svg.append('line').attr('x1', px).attr('x2', px).attr('y1', ty + 10 + (a.lines.length - 1) * 14 + 4).attr('y2', py - 4)
          .attr('stroke', '#1a202c').attr('stroke-width', 0.8);
        textBlock(svg, a.lines, a.tx, ty + 10, { size: 11.5 });
      } else {
        svg.append('circle').attr('cx', px).attr('cy', py - 12).attr('r', 8).attr('fill', '#1a202c');
        svg.append('text').attr('x', px).attr('y', py - 8.5).attr('text-anchor', 'middle').attr('font-size', 10.5)
          .attr('font-weight', 700).attr('fill', '#fff').text(a.n);
      }
    });
    const list = el.parentNode.querySelector('.fe-ex-notes');
    if (list) {
      list.innerHTML = wide ? '' : '<ol>' + notes.map(a => `<li>${a.text}</li>`).join('') + '</ol>';
    }
    const cap = el.parentNode.querySelector('figcaption');
    if (cap) cap.textContent = `${m.name}, 1.–${Math.floor(d3.max(m.hour) / 24) + 1}. ${mo}. ${yr}. Ceny: Ember (CC BY 4.0), výroba: Energy-Charts, Fraunhofer ISE (CC BY 4.0), náklady: výpočet Fakta o klimatu.`;
  }

  // ── 2. The ladder of costs against midday and evening prices ──────────────
  function drawNoon(el, noon) {
    const W = Math.round(el.getBoundingClientRect().width);
    if (!W) return;
    const narrow = W < 560;
    const H = 360 + (narrow ? 22 : 0), mg = { top: 26 + (narrow ? 22 : 0), bottom: 70, left: 52, right: 10 };
    const svg = svgIn(el, W, H);
    const y = d3.scaleLinear().domain([0, 400]).range([H - mg.bottom, mg.top]);
    svg.append('g').selectAll('line').data([0, 100, 200, 300, 400]).join('line')
      .attr('x1', mg.left).attr('x2', W - mg.right).attr('y1', y).attr('y2', y).attr('stroke', d => d === 0 ? C.grey : C.grid);
    svg.append('g').selectAll('text').data([0, 100, 200, 300, 400]).join('text')
      .attr('x', mg.left - 6).attr('y', d => y(d) + 4).attr('text-anchor', 'end').attr('font-size', 11).attr('fill', C.grey).text(d => d);
    svg.append('text').attr('x', mg.left - 6).attr('y', mg.top - 12).attr('text-anchor', 'end').attr('font-size', 10).attr('fill', C.grey).text('EUR/MWh');
    // A colour key on a narrow screen, where the lines carry only their numbers.
    if (narrow) {
      let kx = mg.left;
      FUELS.forEach(f => {
        svg.append('line').attr('x1', kx).attr('x2', kx + 16).attr('y1', 12).attr('y2', 12).attr('stroke', C[f.key]).attr('stroke-width', 3);
        const t = svg.append('text').attr('x', kx + 21).attr('y', 16).attr('font-size', 11).attr('fill', C[f.key]).attr('font-weight', 600).text(f.label);
        kx += 21 + t.node().getComputedTextLength() + 14;
      });
    }
    const colW = (W - mg.left - mg.right) / 2;
    ['2021', '2022'].forEach((year, ci) => {
      const d = noon[year];
      const x0 = mg.left + colW * ci, mx = x0 + colW * (narrow ? 0.18 : 0.14);   // x of the price markers
      const lx0 = mx + (narrow ? 34 : 56), lx1 = x0 + colW * (narrow ? 0.62 : 0.52);
      svg.append('text').attr('x', x0 + colW / 2).attr('y', H - mg.bottom + 20).attr('text-anchor', 'middle')
        .attr('font-size', 14).attr('font-weight', 700).attr('fill', '#1a202c').text(`květen–srpen ${year}`);
      const dip = 100 - d.above.lignite;
      textBlock(svg, narrow ? ['v poledne pod náklady', `hnědého uhlí: ${dip} % hodin`, `nad náklady plynu: ${d.above.gas} %`]
        : ['v poledne pod náklady hnědého uhlí', `v ${dip} % hodin, nad náklady plynu v ${d.above.gas} %`],
        x0 + colW / 2, H - mg.bottom + 38, { size: 11.5, anchor: 'middle', color: '#53616e' });
      // Costs as horizontal lines; the labels are spread so that they do not overlap.
      FUELS.forEach(f => svg.append('line').attr('x1', lx0).attr('x2', lx1)
        .attr('y1', y(d[f.key])).attr('y2', y(d[f.key])).attr('stroke', C[f.key]).attr('stroke-width', 3));
      const labels = FUELS.map(f => ({ ...f, v: d[f.key], y: y(d[f.key]) })).sort((p, q) => p.y - q.y);
      for (let i = 1; i < labels.length; i++) labels[i].y = Math.max(labels[i].y, labels[i - 1].y + 17);
      labels.forEach(l => {
        if (Math.abs(l.y - y(l.v)) > 3) svg.append('line').attr('x1', lx1 + 2).attr('x2', lx1 + 6).attr('y1', y(l.v)).attr('y2', l.y)
          .attr('stroke', C[l.key]).attr('stroke-width', 1);
        svg.append('text').attr('x', lx1 + 8).attr('y', l.y + 4).attr('font-size', 12).attr('font-weight', 600).attr('fill', C[l.key])
          .text(narrow ? num(l.v) : `${l.label} ${num(l.v)}`);
      });
      // Evening and midday price: the labels above and below their markers.
      svg.append('line').attr('x1', mx).attr('x2', mx).attr('y1', y(d.evening)).attr('y2', y(d.price)).attr('stroke', '#9aa3ad').attr('stroke-width', 2);
      svg.append('circle').attr('cx', mx).attr('cy', y(d.evening)).attr('r', 6).attr('fill', '#fff').attr('stroke', C.price).attr('stroke-width', 2);
      svg.append('circle').attr('cx', mx).attr('cy', y(d.price)).attr('r', 6).attr('fill', C.price);
      svg.append('text').attr('x', mx).attr('y', y(d.evening) - 12).attr('text-anchor', 'middle').attr('font-size', 12)
        .attr('fill', '#1a202c').text(`večer ${num(d.evening)}`);
      svg.append('text').attr('x', mx).attr('y', y(d.price) + 24).attr('text-anchor', 'middle').attr('font-size', 12)
        .attr('font-weight', 700).attr('fill', '#1a202c').text(`poledne ${num(d.price)}`);
    });
  }

  // ── 3. What changed at noon in Germany between the two summers ───────────
  function drawTable(el, noon) {
    const a = noon['2021'].gw, b = noon['2022'].gw;
    const clean = o => o.solar + o.wind + o.nuclear + o.hydro + o.biomass;
    const fossil = o => o.lignite_gen + o.hard_coal_gen + o.gas_gen;
    const row = (label, f, o = {}) => {
      const x = f(a), z = f(b), d = z - x;
      return `<tr class="${o.cls ?? ''}"><th>${label}</th><td>${num(x, 1)}</td><td>${num(z, 1)}</td><td class="chg">${signed(d)}</td></tr>`;
    };
    el.innerHTML = '<table class="fe-table"><thead><tr><th>Německo, květen–srpen, 11–15 h (průměrný výkon, GW)</th><th>2021</th><th>2022</th><th>změna</th></tr></thead><tbody>' +
      row('Slunce', o => o.solar) + row('Vítr', o => o.wind) + row('Jádro', o => o.nuclear) +
      row('Voda', o => o.hydro) + row('Biomasa', o => o.biomass) +
      row('Slunce, vítr, jádro, voda a biomasa celkem', clean, { cls: 'sum' }) +
      row('Spotřeba v Německu', o => o.load) + row('Čisté vývozy do zahraničí', o => o.export) +
      row('Hnědé uhlí', o => o.lignite_gen) + row('Černé uhlí', o => o.hard_coal_gen) + row('Plyn', o => o.gas_gen) +
      row('Fosilní elektrárny celkem', fossil, { cls: 'sum' }) + '</tbody></table>';
  }

  // ── 4. Sweden: price against the floor, with the German price ─────────────
  function drawNordics(el, n) {
    const W = Math.round(el.getBoundingClientRect().width);
    if (!W) return;
    const SE_P = 'Švédsko: cena elektřiny', SE_F = 'Švédsko: náklady nejlevnější fosilní elektrárny', DE_P = 'Německo: cena elektřiny';
    const data = n.year.flatMap((yr, i) => [
      { series: SE_P, year: yr, value: n.se_price[i] },
      { series: SE_F, year: yr, value: n.se_floor[i] },
      { series: DE_P, year: yr, value: n.de_price[i] },
    ]);
    el.id ||= 'fe-ex-nordics';
    fokLineChart(`#${el.id}`, data, {
      multi: true, x: d => d.year, y: d => d.value, series: d => d.series, width: W, height: 300,
      theme: { ...theme, colors: { ...theme.colors, categorical: ['#2a78d6', C.lignite, '#6b7280'] } },
      legend: true, yDomain: [0, 250], yTickValues: [0, 50, 100, 150, 200, 250], yFormat: v => v,
      xDomain: [2016, 2025], xTickValues: n.year, xFormat: String,
      dashed: k => k === DE_P, yLabel: 'EUR/MWh',
    });
  }

  d3.json(DATA).then(data => {
    let country = Object.keys(data.month.countries)[0];
    const picker = document.getElementById('fe-ex-country');
    const els = {
      march: document.getElementById('fe-ex-march'), noon: document.getElementById('fe-ex-noon'),
      table: document.getElementById('fe-ex-table'), nordics: document.getElementById('fe-ex-nordics'),
    };
    const draw = () => {
      if (els.march) drawMarch(els.march, data.month, country);
      if (els.noon) drawNoon(els.noon, data.noon);
      if (els.table) drawTable(els.table, data.noon);
      if (els.nordics) drawNordics(els.nordics, data.nordics);
    };
    if (picker) {
      picker.innerHTML = Object.entries(data.month.countries)
        .map(([iso, c]) => `<button type="button" data-iso="${iso}" aria-pressed="${iso === country}">${c.name}</button>`).join('');
      picker.addEventListener('click', event => {
        const b = event.target.closest('button');
        if (!b || b.dataset.iso === country) return;
        country = b.dataset.iso;
        picker.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.iso === country)));
        draw();
      });
    }
    draw();
    let last = '';
    const widthKey = () => Object.values(els).map(e => e ? Math.round(e.getBoundingClientRect().width) : 0).join();
    last = widthKey();
    const redraw = () => { const k = widthKey(); if (k !== last) { last = k; draw(); } };
    window.addEventListener('resize', redraw);
    // The section sits in an expander: draw it once it is open (the observer does too).
    document.querySelectorAll('a.expander[data-target="#fe-method"]').forEach(a => a.addEventListener('click', () => {
      [150, 450, 900].forEach(t => setTimeout(redraw, t));
    }));
    Object.values(els).forEach(e => e && new ResizeObserver(redraw).observe(e));
  });
});
