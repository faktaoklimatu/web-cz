/* Grafy explaineru „Jak rozvoj solárních a větrných elektráren ovlivňuje ceny elektřiny?“
 *
 * Markup: includes-local/chart-panel.html (one per chart, id = graf-*), export:
 * assets-local/js/chart-download.js. Axes, labels and arrows: assets-local/charts/fok-utils.js.
 *
 * Data: assets-local/files/ceny-elektriny-oze/*.csv, from data-analysis
 * notebooks/ceny-elektriny-oze.ipynb:
 *   electricity-prices-household.csv     data/precooked/<rok>-electricity-prices-household.parquet as is
 *   electricity-prices-nonhousehold.csv  data/precooked/<rok>-electricity-prices-nonhousehold.parquet as is
 *   electricity-prices-household-bands.csv  Eurostat nrg_pc_204_c by consumption band,
 *                                        TAX_OTHER = TAX_FEE_LEV_CHRG − TAX_CAP − TAX_RNW − VAT
 *   EEG-2010-2025.csv                    data/netztransparenz, as is
 */
(function () {
  "use strict";
  if (typeof d3 === "undefined") return;

  const DIR = "/assets-local/files/ceny-elektriny-oze/";
  // The year the single-year charts show; the chart titles in the .md name it too.
  const YEAR = 2025;

  // The library's theme with smaller axis labels, for these charts only.
  const theme = { ...FoKTheme, fontSize: { ...FoKTheme.fontSize, axisLabel: 10 } };
  const UNIT = "€/kWh";
  const num = (v, d = 2) => fokFormatNumber(v, d);

  // Price components, bottom of the stack first; colours as in the notebook.
  const COMPONENTS = [
    { key: "nrg",  label: "Energie a dodávky",       color: "#4b8f9e", of: d => d.NRG_SUP },
    { key: "netc", label: "Náklady na sítě",         color: "#80c9ca", of: d => d.NETC },
    { key: "tax",  label: "Ostatní daně a poplatky", color: "#f5906c", of: d => d.TAX_CAP + d.TAX_RNW + d.TAX_OTHER },
    { key: "vat",  label: "DPH",                     color: "#b55f3f", of: d => d.VAT },
  ];
  // Light fills would leave their label unreadable on white.
  const textColor = c => d3.lab(c).l > 75 ? d3.lab(c).darker(1.2).formatHex() : c;

  // Every column but the country code and the band is a number; d3.autoType would make the year a Date.
  const TEXT = ["Country", "Band"];
  const csv = file => d3.csv(DIR + file, d => Object.fromEntries(Object.entries(d)
    .map(([k, v]) => [k, TEXT.includes(k) ? v : v === "" ? null : +v])));

  const tip = fokTooltip(theme);

  // Width of `text` at `size` px in the chart font. Measured on a canvas, so
  // before the webfont loads it measures the fallback; pages redraw once
  // document.fonts.ready.
  const measure = (text, size) => {
    const c = (measure.ctx ??= document.createElement("canvas").getContext("2d"));
    c.font = `${size}px ${theme.font}`;
    return c.measureText(text).width;
  };

  // Annotation texts sit at a default place, moved by px offsets per chart and
  // per width ("narrow" under 500 px). With ?dev=1 the texts can be dragged;
  // "Kopírovat layout" copies the offsets to paste here.
  // The positions set in ?dev=1 and copied with "Kopírovat layout" (wide only so far).
  const LAYOUT = {
    "graf-slozky-ceny-cz": {
      "wide": {
        "vat": {
          "dx": -4,
          "dy": -41,
          "curve": [
            0.326,
            0.238,
            0.485,
            -0.395
          ]
        },
        "tax": {
          "dx": -1,
          "dy": -17
        },
        "netc": {
          "dx": -2,
          "dy": 19,
          "curve": [
            0.429,
            -0.175,
            0.48,
            0.246
          ]
        },
        "nrg": {
          "dx": -1,
          "dy": -42
        }
      }
    },
    "graf-spot-dynamicke": {
      "wide": {
        "poznamka": {
          "dx": 158,
          "dy": 117,
          "curve": [
            0.339,
            0.206,
            0.636,
            0.307
          ],
          "start": [
            -8,
            -3
          ],
          "tip": [
            1,
            -6
          ]
        }
      }
    },
    "graf-spot-fixovane": {
      "wide": {
        "poznamka": {
          "dx": 8,
          "dy": 135,
          "start": [
            -10,
            30
          ],
          "curve": [
            0.208,
            0.204,
            0.552,
            0.573
          ]
        }
      }
    },
    "graf-ceny-eu-komponenty": {
      "wide": {
        "zaporne": {
          "dx": -11,
          "dy": 14,
          "curve": [
            0.287,
            -0.413,
            0.72,
            -0.3
          ]
        }
      }
    },
    "graf-naklady-nemecko": {
      "wide": {
        "kriz": {
          "curve": [
            0.337,
            -0.234,
            0.452,
            0.365
          ]
        }
      }
    },
    "graf-slevy": {
      "wide": {
        "poznamka": {
          "dx": -17,
          "dy": -18,
          "curve": [
            0.378,
            0.202,
            0.531,
            -0.334
          ]
        }
      }
    },
    "graf-zastropovane": {
      "wide": {
        "poznamka": {
          "curve": [
            0.506,
            0.127,
            0.381,
            -0.331
          ],
          "start": [
            85,
            -12
          ],
          "tip": [
            -5,
            18
          ]
        }
      }
    },
    "graf-scatter-site": {
      "wide": {
        "belgie": {
          "dx": 7,
          "dy": -23
        },
        "nizozemsko": {
          "dx": 150,
          "dy": 127
        }
      }
    },
    "graf-scatter-plyn": {
      "wide": {
        "rostla": {
          "dx": 30,
          "dy": -1
        },
        "finsko": {
          "dx": 18,
          "dy": 14
        }
      }
    }
  };
  const DEV = new URLSearchParams(location.search).has("dev");
  const STORE = "fok-layout:" + location.pathname;
  const variantOf = w => w < 500 ? "narrow" : "wide";
  if (DEV) {
    try { Object.assign(LAYOUT, JSON.parse(localStorage.getItem(STORE)) ?? {}); } catch (e) { /* private mode */ }
    const bar = d3.select("body").append("div")
      .style("position", "fixed").style("left", "12px").style("bottom", "12px").style("z-index", 9999)
      .style("display", "flex").style("gap", "6px");
    bar.append("button").text("Kopírovat layout").on("click", () => {
      // Untouched texts leave empty objects behind: dropped, as are the levels they empty.
      const prune = o => Object.fromEntries(Object.entries(o).flatMap(([k, v]) => {
        if (Array.isArray(v) || typeof v !== "object") return [[k, v]];
        const p = prune(v);
        return Object.keys(p).length ? [[k, p]] : [];
      }));
      const json = JSON.stringify(prune(LAYOUT), (k, v) =>
        typeof v !== "number" ? v : +v.toFixed(k === "dx" || k === "dy" ? 0 : 3), 2);
      navigator.clipboard.writeText(json);
      console.log(json);
    });
    bar.append("button").text("Reset").on("click", () => {
      try { localStorage.removeItem(STORE); } catch (e) { /* private mode */ }
      location.reload();
    });
  }

  // Lines of runs [text, style, colour?]: "b" bold in the text's colour, "c" the
  // colour, none grey; a third item gives the run its own colour.
  function runs(g, x, y, lines, color, fontSize) {
    const text = g.append("text").attr("y", y).attr("font-family", theme.font).attr("font-size", fontSize);
    lines.forEach((line, i) => {
      const row = text.append("tspan").attr("x", x).attr("dy", i ? "1.25em" : "0.35em");
      line.forEach(([t, s, c]) => row.append("tspan").text(t)
        .attr("font-weight", s === "b" ? theme.fontWeight.bold : null)
        .attr("fill", c ?? (s ? color : theme.colors.grey)));
    });
    return text;
  }

  // Default bends, by `shape`: from the text level out and level in (S, default), vertical out
  // and in, or level out and vertical in (an elbow). In px, from [x, y] to [x, y].
  const lerp = (a, b, u) => a + (b - a) * u;
  const SHAPES = {
    level: (s, t) => [[lerp(s[0], t[0], 0.5), s[1]], [lerp(s[0], t[0], 0.5), t[1]]],
    vertical: (s, t) => [[s[0], lerp(s[1], t[1], 0.5)], [t[0], lerp(s[1], t[1], 0.5)]],
    elbow: (s, t) => [[lerp(s[0], t[0], 0.7), s[1]], [t[0], lerp(s[1], t[1], 0.3)]],
  };

  // A text at `at` (px, moved by the layout's dx, dy), with an arrow from its
  // first line's left end to `target` if there is one. The arrow's bend is
  // `curve`: its two control points as [along, across] the chord from text to
  // target, in chord lengths, so it keeps its shape at any width.
  // a: { key, at, target?, lines, color, fontSize, anchor?, background?, from?, shape? }
  // `from`: [dx, dy] from `at`, where the arrow leaves, e.g. under the text;
  // without it the arrow leaves from the text's left end.
  function annotation(g, ctx, a) {
    const v = ((LAYOUT[ctx.id] ??= {})[variantOf(ctx.width)] ??= {});
    const o = DEV ? (v[a.key] ??= {}) : (v[a.key] ?? {});
    // `maxX`: the furthest right the text may start, whatever the layout moves it by.
    const at = [Math.min(a.at[0] + (o.dx ?? 0), a.maxX ?? Infinity), a.at[1] + (o.dy ?? 0)];
    // Where the arrow starts, relative to the text's position: the layout's `start` (set by dragging
    // the square handle in ?dev=1), else the note's `from`, else the text's own left end.
    const fromOff = o.start ?? a.from;
    const s = fromOff ? [at[0] + fromOff[0], at[1] + fromOff[1]] : at;
    const save = () => {
      try { localStorage.setItem(STORE, JSON.stringify(LAYOUT)); } catch (e) { /* private mode */ }
      ctx.redraw();
    };
    // Measured against the <svg>: the redraw replaces the group the dragged element was in.
    const drag = on => d3.drag().container(function () { return this.ownerSVGElement; }).on("drag", on);

    if (a.target) {
      // The arrow's tip: the note's target, moved by the layout's `tip` (the round handle in ?dev=1).
      const t = [a.target[0] + (o.tip?.[0] ?? 0), a.target[1] + (o.tip?.[1] ?? 0)];
      const d = [t[0] - s[0], t[1] - s[1]], p = [-d[1], d[0]];
      const L2 = d[0] ** 2 + d[1] ** 2 || 1;
      const toPx = (u, n) => [s[0] + u * d[0] + n * p[0], s[1] + u * d[1] + n * p[1]];
      const toCurve = c => {
        const r = [c[0] - s[0], c[1] - s[1]];
        return [(r[0] * d[0] + r[1] * d[1]) / L2, (r[0] * p[0] + r[1] * p[1]) / L2];
      };
      // Default: level out of the text, level into the target.
      const controls = () => o.curve ? [toPx(o.curve[0], o.curve[1]), toPx(o.curve[2], o.curve[3])]
        : SHAPES[a.shape ?? "level"](s, t);
      fokArrow(g, { target: t, textEnd: s, controls: controls(), lines: [], background: false, color: a.color }, theme);
      if (DEV) {
        const cs = controls();
        [[s, cs[0]], [t, cs[1]]].forEach(([from, c]) => g.append("line")
          .attr("x1", from[0]).attr("y1", from[1]).attr("x2", c[0]).attr("y2", c[1])
          .attr("stroke", "#1a88ff").attr("stroke-width", 0.75).attr("stroke-dasharray", "2 2"));
        cs.forEach((c, i) => g.append("circle").attr("cx", c[0]).attr("cy", c[1]).attr("r", 4)
          .attr("fill", "#fff").attr("stroke", "#1a88ff").attr("stroke-width", 1.5).style("cursor", "grab")
          .call(drag(ev => {
            const now = controls();
            now[i] = [now[i][0] + ev.dx, now[i][1] + ev.dy];
            o.curve = [...toCurve(now[0]), ...toCurve(now[1])];
            save();
          })));
        // The tip of the arrow: a filled circle.
        g.append("circle").attr("cx", t[0]).attr("cy", t[1]).attr("r", 5)
          .attr("fill", "#1a88ff").attr("stroke", "#fff").attr("stroke-width", 1.5).style("cursor", "grab")
          .call(drag(ev => {
            const cur = o.tip ?? [0, 0];   // read now: a redraw replaces this handler's closure mid-drag
            o.tip = [Math.round(cur[0] + ev.dx), Math.round(cur[1] + ev.dy)];
            save();
          }));
        // The start of the arrow: a square, dragged to anywhere (the curve keeps its shape relative to the chord).
        g.append("rect").attr("x", s[0] - 4).attr("y", s[1] - 4).attr("width", 8).attr("height", 8)
          .attr("fill", "#fff").attr("stroke", "#1a88ff").attr("stroke-width", 2).style("cursor", "grab")
          .call(drag(ev => {
            const cur = o.start ?? a.from ?? [0, 0];   // read now: a redraw replaces this handler's closure mid-drag
            o.start = [Math.round(cur[0] + ev.dx), Math.round(cur[1] + ev.dy)];
            save();
          }));
      }
    }

    // A white halo round the letters keeps gridlines and data from running through them.
    const text = runs(g, a.target && !a.from ? at[0] + 6 : at[0], at[1], a.lines, a.color, a.fontSize)
      .attr("text-anchor", a.anchor ?? "start")
      .attr("stroke", "#fff").attr("stroke-width", 4).attr("paint-order", "stroke").attr("stroke-linejoin", "round");
    if (a.background) {
      const b = text.node().getBBox();
      g.insert("rect", () => text.node()).attr("x", b.x - 4).attr("y", b.y - 2)
        .attr("width", b.width + 8).attr("height", b.height + 4).attr("fill", "#fff");
    }
    if (DEV) {
      text.style("cursor", "move").call(drag(ev => {
        o.dx = (o.dx ?? 0) + ev.dx;
        o.dy = (o.dy ?? 0) + ev.dy;
        save();
      }));
    }
  }

  // Draws into the panel's <svg> now, on every width change and once the
  // webfont is in (labels are measured). `draw(svg, ctx)` returns the height;
  // ctx is { id, width, redraw }.
  function mount(id, draw) {
    const el = document.getElementById(id + "-svg");
    if (!el) return;
    let last = 0;
    const redraw = () => {
      const w = el.parentNode.clientWidth;
      if (!w) return;
      last = w;
      const svg = d3.select(el);
      svg.selectAll("*").remove();
      svg.attr("width", w).attr("height", draw(svg, { id, width: w, redraw }));
    };
    new ResizeObserver(() => { if (el.parentNode.clientWidth !== last) redraw(); }).observe(el.parentNode);
    document.fonts.ready.then(redraw);
  }

  // ── Složky ceny pro české domácnosti ─────────────────────────────────────
  // One stacked bar, no axis: each component's value inside, its share and
  // what it is to the right.
  function componentsBar(svg, ctx, row) {
    const parts = COMPONENTS.map(c => ({ ...c, v: c.of(row) }));
    const total = d3.sum(parts, p => p.v);
    let y0 = 0;
    parts.forEach(p => { p.y0 = y0; y0 += p.v; });
    const pct = p => num(p.v / total * 100, 1) + " %";
    const LABELS = {
      vat:  p => [[[pct(p), "b"], [" průměrné ceny"]], [[`v roce ${YEAR} tvořila`]], [["daň z přidané hodnoty", "b"]]],
      tax:  p => [[[pct(p), "b"]], [["Ostatní daně a poplatky", "b"]]],
      netc: p => [[[pct(p), "b"]], [["Náklady na sítě", "b"]]],
      nrg:  p => [[[pct(p), "b"]], [["Největší část ceny elektřiny"]], [["tvořily "], ["náklady dodavatelů", "b"]],
        [["(energie a dodávky)", "c"]]],
    };

    const plotH = 320, top = 34, fontSize = 12;
    const y = d3.scaleLinear().domain([0, total]).range([plotH, 0]);
    const barW = Math.min(90, ctx.width / 5), barX = 1, textX = barX + barW + Math.min(60, ctx.width / 8);

    const g = svg.append("g").attr("transform", `translate(0,${top})`);

    g.selectAll("rect.seg").data(parts).join("rect").attr("class", "seg")
      .attr("x", barX).attr("width", barW)
      .attr("y", p => y(p.y0 + p.v)).attr("height", p => y(p.y0) - y(p.y0 + p.v))
      .attr("fill", p => p.color).attr("stroke", "#fff").attr("stroke-width", 1)
      .on("mouseover", (ev, p) => {
        tip.show(`<strong>${p.label}</strong><br>${num(p.v)} ${UNIT} (${num(p.v / total * 100, 1)} %)`);
        tip.move(ev);
      })
      .on("mousemove", ev => tip.move(ev))
      .on("mouseleave", () => tip.hide());

    g.selectAll("text.val").data(parts.filter(p => y(p.y0) - y(p.y0 + p.v) >= 18)).join("text")
      .attr("class", "val").attr("x", barX + barW / 2).attr("y", p => y(p.y0 + p.v / 2)).attr("dy", "0.35em")
      .attr("text-anchor", "middle").attr("fill", "#fff").attr("font-family", theme.font)
      .attr("font-size", 11).attr("pointer-events", "none").text(p => num(p.v));

    fokLabel(g, barX + barW / 2, y(total) - 8, {
      lines: [`${num(total)} ${UNIT}`], anchor: "middle", fontSize, color: theme.colors.text,
    }, theme);
    // Texts at their segment's middle, pushed apart from the top down by the
    // height of the one above, then back up if that ran them off the bottom.
    const lineH = fontSize * 1.25;
    const labels = parts.slice().reverse().map(p => ({ p, lines: LABELS[p.key](p), at: y(p.y0 + p.v / 2) }));
    labels.forEach((l, i) => {
      if (i) l.at = Math.max(l.at, labels[i - 1].at + labels[i - 1].lines.length * lineH + 12);
    });
    const last = labels[labels.length - 1];
    const over = last.at + (last.lines.length - 1) * lineH - plotH;
    if (over > 0) labels.forEach(l => { l.at -= over; });
    labels.forEach(({ p, lines, at }) => annotation(g, ctx, {
      key: p.key, target: [barX + barW, y(p.y0 + p.v / 2)], at: [textX, at], lines,
      color: p.color, fontSize,   // the column's own colour, not darkened
    }));

    return top + plotH + 4;
  }

  // ── Ceny v zemích EU ─────────────────────────────────────────────────────
  // The EU members, ISO 3 → ISO 2: the data's codes → the axis on phones and
  // the Czech names (Intl). Norway in the data is left out, as in the notebook.
  const ISO2 = {
    AUT: "AT", BEL: "BE", BGR: "BG", HRV: "HR", CYP: "CY", CZE: "CZ", DNK: "DK", EST: "EE", FIN: "FI",
    FRA: "FR", DEU: "DE", GRC: "GR", HUN: "HU", IRL: "IE", ITA: "IT", LVA: "LV", LTU: "LT", LUX: "LU",
    MLT: "MT", NLD: "NL", POL: "PL", PRT: "PT", ROU: "RO", SVK: "SK", SVN: "SI", ESP: "ES", SWE: "SE",
  };
  const countryName = new Intl.DisplayNames(["cs"], { type: "region" });
  const HIGHLIGHT = "CZE";
  const COUNTRY_PADDING = 0.35;
  // The width of a bar in the country chart (04) on a page `width` px wide, which the
  // bands chart (09) gives its bars too, so the bars match across the article.
  function countryBarWidth(width) {
    const ticks = [0, 0.1, 0.2, 0.3, 0.4];
    const left = fokAxisYWidth(d3.scaleLinear().domain([0, 0.4]), { tickValues: ticks, tickFormat: v => num(v) }, theme);
    return (width - left - 2) / (27 - COUNTRY_PADDING + 2 * COUNTRY_PADDING) * (1 - COUNTRY_PADDING);
  }
  // Height of the country charts in px per €/kWh, the same in both, so that a
  // bar is as tall in one as in the other; narrower on phones.
  const PX_PER_EUR = { wide: 715, narrow: 625 };
  const Y_LABEL = [[["Průměrná cena elektřiny", "b"], [` (${UNIT})`]]];

  // Legend as svg text in the swatches' colours, wrapped to `width`. Items:
  // { key, label, color, kind: "box" | "hatch" | "marker" }. Returns its height
  // and each swatch's centre, for an arrow to point at.
  function legend(g, items, width, fontSize) {
    const rowH = fontSize * 1.8, gap = 18, sw = fontSize * 0.85, at = {}, lineH = fontSize * 1.25;
    let x = 0, y = 0, extra = 0;   // extra: height the longest label of the row adds with its further lines
    items.forEach(it => {
      const item = g.append("g");
      if (it.kind === "marker") {
        const th = it.thickness ?? 2;   // a line swatch is 2 px thick, 3 for a marker that is 3 px in the chart
        item.append("rect").attr("y", -sw / 2 - th / 2).attr("width", sw + 4).attr("height", th).attr("fill", it.color);
      } else {
        item.append("rect").attr("y", -sw / 2 - 4).attr("width", sw).attr("height", sw)
          .attr("fill", it.kind === "hatch" ? "#fff" : it.color);
        // The swatch is small: its stripes are drawn at half size, so that it shows several of them.
        if (it.kind === "hatch") fokHatch(item.append("g").attr("transform", `translate(0,${-sw / 2 - 4}) scale(0.5)`), 0, 0, sw * 2, sw * 2, it.color);
      }
      // A label may be given in several lines, split at "\n"; the swatch sits by the first.
      const t = item.append("text").attr("font-family", theme.font)
        .attr("font-size", fontSize).attr("font-weight", 500)
        .attr("fill", it.kind === "marker" ? it.color : textColor(it.color));
      const lines = it.label.split("\n");
      const spans = lines.map((line, i) => t.append("tspan").attr("x", sw + 6).attr("dy", i ? lineH : 0).text(line));
      if (it.suffix) spans[spans.length - 1].append("tspan").attr("font-weight", null).text(it.suffix);
      const w = sw + 6 + d3.max(spans, sp => sp.node().getComputedTextLength());
      if (x > 0 && x + w > width) { x = 0; y += rowH + extra; extra = 0; }
      extra = Math.max(extra, (lines.length - 1) * lineH);
      item.attr("transform", `translate(${x},${y + fontSize})`);
      at[it.key] = [x + sw / 2, y + fontSize - sw / 2 - 4];
      x += w + gap;
    });
    return { h: y + rowH + extra, at };
  }

  // Bars by country, highest first, Česko darker and bold. Plain (o.stacked
  // false: the total) or the components stacked, negative ones hatched below
  // zero, with the total as a marker. o: { rows, stacked, top, extras(g, s) }
  // where `top` is the height the chart's own things above the y label take
  // (drawn by o.above(svg, width) → height) and extras draws over the plot.
  function countryBars(svg, ctx, o) {
    const narrow = variantOf(ctx.width) === "narrow", fontSize = narrow ? 11 : 12;
    const rows = o.rows.slice().sort((a, b) => b.total - a.total);
    const top = o.above ? o.above(svg, ctx.width, fontSize) : 0;
    runs(svg, 0, top + 10, Y_LABEL, theme.colors.grey, fontSize);
    const plotTop = top + 34;

    const keys = COMPONENTS.map(c => c.key);
    const series = o.stacked ? d3.stack().keys(keys).offset(d3.stackOffsetDiverging)(rows) : [];
    const lo = o.stacked ? Math.min(0, d3.min(series, s => d3.min(s, d => d[0]))) : 0;
    const hi = d3.max(rows, r => o.stacked ? Math.max(r.total, d3.sum(keys, k => Math.max(0, r[k]))) : r.total);
    // Ticks every 0.1; the top one may sit a little under the highest bar, as
    // in the original, rather than add a nearly empty band.
    const step = 0.1;
    const ticks = d3.range(Math.floor(lo / step + 1e-9), Math.ceil(hi / step - 0.15) + 1).map(i => i * step);
    const domain = [ticks[0], Math.max(hi, ticks[ticks.length - 1])];
    const plotH = Math.round((domain[1] - domain[0]) * PX_PER_EUR[variantOf(ctx.width)]);
    const y = d3.scaleLinear().domain(domain).range([plotH, 0]);
    const axis = { tickValues: ticks, tickFormat: v => num(v).replace("-", "−") };
    const left = fokAxisYWidth(y, axis, theme);
    const innerW = ctx.width - left - 2;
    const x = d3.scaleBand().domain(rows.map(r => r.Country)).range([0, innerW]).padding(COUNTRY_PADDING);
    const bw = x.bandwidth();
    const name = r => narrow ? ISO2[r.Country] : countryName.of(ISO2[r.Country]);

    const g = svg.append("g").attr("transform", `translate(${left},${plotTop})`);
    g.append("g").call(fokAxisY(y, { ...axis, gridWidth: innerW }, theme));

    const hover = (sel, html) => sel
      .on("mouseover", (ev, d) => { tip.show(html(d)); tip.move(ev); })
      .on("mousemove", ev => tip.move(ev))
      .on("mouseleave", () => tip.hide());
    const head = r => `<strong>${countryName.of(ISO2[r.Country])}</strong><br>`;

    if (!o.stacked) {
      g.selectAll("rect.bar").data(rows).join("rect").attr("class", "bar")
        .attr("x", r => x(r.Country)).attr("width", bw)
        .attr("y", r => y(r.total)).attr("height", r => y(0) - y(r.total))
        .attr("fill", r => r.Country === HIGHLIGHT ? "#235e85" : "#8fafc4")
        .call(hover, r => head(r) + `${num(r.total)} ${UNIT}`);
    } else {
      const stackTip = r => head(r) + COMPONENTS.slice().reverse()
        .map(c => `<span style="color:${textColor(c.color)}">■</span> ${o.labels?.[c.key] ?? c.label}: ${num(r[c.key], 3)}`)
        .join("<br>") + `<br><strong>Cena elektřiny: ${num(r.total)} ${UNIT}</strong>`;
      series.forEach(s => {
        const c = COMPONENTS.find(k => k.key === s.key);
        s.forEach(d => {
          const r = d.data, y0 = y(Math.max(d[0], d[1])), h = Math.abs(y(d[0]) - y(d[1]));
          if (!h) return;
          const neg = r[s.key] < 0;
          g.append("rect").datum(r).attr("x", x(r.Country)).attr("width", bw).attr("y", y0).attr("height", h)
            .attr("fill", neg ? "#fff" : c.color).attr("stroke", "#fff").attr("stroke-width", 0.5)
            .call(hover, stackTip);
          if (neg) fokHatch(g, x(r.Country), y0, bw, h, c.color);
        });
      });
      g.selectAll("rect.total").data(rows).join("rect").attr("class", "total")
        .attr("x", r => x(r.Country) - 2).attr("width", bw + 4)
        .attr("y", r => y(r.total) - 1.5).attr("height", 3).attr("fill", theme.colors.text)
        .attr("pointer-events", "none");
    }

    // The zero line over the bars, not under them.
    g.append("line").attr("x2", innerW).attr("y1", y(0)).attr("y2", y(0))
      .attr("stroke", theme.colors.grey).attr("stroke-width", 1);

    // Country names under the plot: names at 45°, on phones codes upright,
    // since 27 bars leave no room for them side by side.
    const labels = g.append("g").attr("font-family", theme.font).attr("font-size", narrow ? 10 : 12);
    rows.forEach(r => {
      const cx = x(r.Country) + bw / 2, ly = plotH + 6;
      labels.append("text").text(name(r))
        .attr("fill", r.Country === HIGHLIGHT ? theme.colors.text : theme.colors.grey)
        .attr("font-weight", r.Country === HIGHLIGHT ? theme.fontWeight.bold : null)
        .attr("x", cx).attr("y", ly).attr("dy", narrow ? "0.35em" : "0.71em").attr("text-anchor", "end")
        .attr("transform", `rotate(${narrow ? -90 : -45},${cx},${ly})`);
    });

    o.extras?.(g, { svg, x, y, bw, rows, innerW, left, plotTop, fontSize, narrow });
    return plotTop + plotH + Math.ceil(labels.node().getBBox().height) + 12;
  }

  // ── Velkoobchodní cena vs. energie a dodávky ─────────────────────────────
  // Small multiples of two lines, one panel per country, on one scale. As in
  // the regions explainer, the first panel's name starts at the chart's left
  // edge, over the tick labels. o: { rows, countries: [ISO 3…], note }
  const SERIES = [
    { key: "SpotPrice", label: "Velkoobchodní cena", color: "#75808e", kind: "marker" },
    { key: "NRG_SUP", label: "Energie a dodávky pro domácnosti", color: "#f4465b", kind: "marker" },
  ];
  const PLOT_H = { wide: 150, narrow: 130 };
  // Gridlines run GRID_PAD px past the plot on both sides.
  const GRID_PAD = 6;
  // x axis ticks: TICK_GAP below the axis line (not touching it),
  // TICK long, the labels a little below their ends. A label is centred on its tick, except
  // that the first and the last sit so that the tick falls between their first two / last two
  // digits (a quarter of the width in from the end), which keeps them within the panel.
  const TICK_GAP = 5, TICK = 7.2;
  // The axis line and its ticks: a lighter grey than the labels.
  const AXIS_COLOR = "#a0aec0";
  const xTicks = a => {
    a.selectAll(".tick line").attr("y1", TICK_GAP).attr("y2", TICK_GAP + TICK).attr("stroke", AXIS_COLOR);
    a.selectAll(".tick text").attr("y", TICK_GAP + TICK + 5).attr("text-anchor", "middle")
      .attr("x", (d, j, all) => {
        const w = measure(String(d), theme.fontSize.axisLabel);
        return j === 0 ? w / 4 : j === all.length - 1 ? -w / 4 : 0;
      });
  };
  // The y axis of a panel: gridlines past the plot, labels on the first one only.
  const yAxisIn = (p, y, axis, panelW, first) => p.append("g").attr("transform", `translate(${-GRID_PAD},0)`)
    .call(fokAxisY(y, { ...axis, tickFormat: first ? axis.tickFormat : () => "", gridWidth: panelW + 2 * GRID_PAD }, theme));
  // The axis line, as wide as the gridlines.
  const axisLine = (p, panelW, y0) => p.append("line").attr("x1", -GRID_PAD).attr("x2", panelW + GRID_PAD)
    .attr("y1", y0).attr("y2", y0).attr("stroke", AXIS_COLOR).attr("stroke-width", 1);
  // A panel's name, in capitals and grey, a weight heavier than the axis caption, NAME_DY plus its
  // own height below the panel's top.
  const NAME_DY = 8;
  const panelName = (g, x, text, size) => g.append("text").attr("x", x).attr("y", NAME_DY + size).attr("dy", "0.9em")
    .attr("font-family", theme.font).attr("font-size", size).attr("font-weight", 500).attr("fill", theme.colors.grey)
    .text(text.toLocaleUpperCase("cs"));
  const CAPTION = [[["Průměrná cena elektřiny"]]];
  // Room right of the last panel for the gridlines' end and the last year label's overhang.
  const RIGHT = GRID_PAD + 8;
  const Y_MAX = 0.38, X_TICKS = [2017, 2020, YEAR];

  // The width of a small-multiples panel in a row of `slots`, and the gap between panels.
  // Shared by the line charts and the bands chart, so panels are as wide in one as in the other
  // (the bands chart's own axis labels are wider, which moves its panels but does not resize them).
  function panelSize(width, slots, narrow) {
    const probe = d3.scaleLinear().domain([0, Y_MAX]);
    const left = fokAxisYWidth(probe, { tickValues: [0, 0.1, 0.2, 0.3], tickFormat: v => num(v) }, theme) + GRID_PAD;
    const gap = narrow ? 18 : 26;
    return { gap, w: (width - left - RIGHT - gap * (slots - 1)) / slots };
  }

  // The note's lines for the width (`narrow` ones, if it has them), and each as plain text.
  const narrowNote = (n, variant) => variant === "narrow" && n.narrow ? n.narrow : n.lines;
  const plainOf = lines => lines.map(l => l.map(r => r[0]).join(""));

  function lineMultiples(svg, ctx, o) {
    const variant = variantOf(ctx.width), fontSize = variant === "narrow" ? 11 : 12;
    const lineH = fontSize * 1.25;
    const series = o.series ?? SERIES, below = o.note.below;
    const legendH = legend(svg.append("g"), series, ctx.width, fontSize).h;
    const noteLines = narrowNote(o.note, variant);
    // The room over the panels for a note that stands there; none for one the layout moves to the side (wide only).
    const noteH = o.note.sideNote && variant !== "narrow" ? 0 : noteLines.length * lineH + 26;
    const cols = o.countries.length, slots = o.slots ?? cols;
    const nameH = 26, axisH = TICK_GAP + TICK + 28;
    let noteTop = legendH + 8;
    const ticks = [0, 0.1, 0.2, 0.3];
    const axis = { tickValues: ticks, tickFormat: v => num(v) };
    const y = d3.scaleLinear().domain([0, Y_MAX]).range([PLOT_H[variant], 0]);
    const left = fokAxisYWidth(y, axis, theme) + GRID_PAD;
    // The caption is one line, the unit a second, level with the top tick: room above the plot if the tick is too near its top.
    const topY = y(d3.max(ticks)), captionH = Math.max(6, Math.ceil(lineH + 6 - topY));
    // `slots` panels' width, however many there are: three panels as wide as in a row of four.
    // The gap between panels leaves the gridlines of neighbours clear of each other.
    const { w: panelW, gap: gapX } = panelSize(ctx.width, slots, variant === "narrow");
    const x = d3.scaleLinear().domain([X_TICKS[0], YEAR]).range([0, panelW]);
    const panelTop = below ? legendH + 14 : noteTop + noteH;
    const plotTop = panelTop + nameH + captionH;
    const line = key => d3.line().defined(d => d[key] != null).x(d => x(d.Year)).y(d => y(d[key]));
    // `slotAt`: the slot of each panel, to leave one free (default: in order).
    const panelX = i => left + (o.slotAt?.[i] ?? i) * (panelW + gapX);
    let target;

    o.countries.forEach((code, i) => {
      const data = o.rows.filter(d => d.Country === code && d.Year >= X_TICKS[0]).sort((a, b) => a.Year - b.Year);
      const g = svg.append("g").attr("transform", `translate(${panelX(i)},${panelTop})`);
      // The name of the first panel starts at the svg's left edge, over the tick labels.
      panelName(g, i === 0 ? -left : 0, countryName.of(ISO2[code]), fontSize - 1);
      if (i === 0) runs(g, -left, nameH + captionH + topY - lineH, CAPTION, theme.colors.grey, fontSize - 1);

      const p = g.append("g").attr("transform", `translate(0,${nameH + captionH})`);
      const ax = yAxisIn(p, y, axis, panelW, i === 0);
      series.forEach(sr => p.append("path").datum(data).attr("d", line(sr.key))
        .attr("fill", "none").attr("stroke", sr.color).attr("stroke-width", 2)
        .attr("stroke-linejoin", "round").attr("stroke-linecap", "butt"));
      axisLine(p, panelW, y(0));
      p.append("g").attr("transform", `translate(0,${y(0)})`)
        .call(fokAxisX(x, { tickValues: variant === "narrow" ? [X_TICKS[0], YEAR] : X_TICKS, tickFormat: d3.format("d") }, theme))
        .call(a => a.select(".domain").remove())
        .call(xTicks);
      // The unit after the top tick label, over the data like the library's other axis units.
      if (i === 0) fokAxisYLabel(ax, y, axis, UNIT, { inline: true }, theme);

      if (code === o.note.target.country) {
        const d = data.find(r => r.Year === o.note.target.year);
        target = [panelX(i) + x(d.Year) + (o.note.target.dx ?? 0), plotTop + y(d[o.note.target.key]) + (o.note.target.dy ?? 0)];
      }

      const rule = p.append("line").attr("y1", 0).attr("y2", y(0))
        .attr("stroke", theme.colors.text).attr("stroke-width", 1).style("display", "none");
      p.append("rect").attr("width", panelW).attr("height", y(0)).attr("fill", "transparent")
        .on("mousemove", ev => {
          const d = d3.least(data, r => Math.abs(x(r.Year) - d3.pointer(ev)[0]));
          rule.style("display", null).attr("x1", x(d.Year)).attr("x2", x(d.Year));
          tip.show(`<strong>${countryName.of(ISO2[code])}, ${d.Year}</strong><br>` + series.filter(sr => d[sr.key] != null)
            .map(sr => `<span style="color:${sr.color}">■</span> ${sr.label}: ${num(d[sr.key], 3)} ${UNIT}`).join("<br>"));
          tip.move(ev);
        })
        .on("mouseleave", () => { rule.style("display", "none"); tip.hide(); });
    });

    // The note: above the panels with its arrow leaving from under the text, or
    // below them with the arrow leaving from over it.
    const n = o.note, ng = svg.append("g"), bottom = plotTop + PLOT_H[variant] + axisH;
    if (below) noteTop = bottom + 8;
    annotation(ng, ctx, {
      key: "poznamka", lines: noteLines, color: n.color, fontSize, shape: "vertical",
      // `endAlign`: the note ends at the right edge of its panel instead of starting at its left edge.
      anchor: n.endAlign ? "end" : undefined,
      at: [n.atPanel != null ? panelX(n.atPanel) + (n.endAlign ? panelW : 0) : left + n.atFrac * (ctx.width - left),
        noteTop + fontSize * 0.5], target,
      from: [(n.endAlign ? n.fromFrac - 1 : n.fromFrac) * d3.max(plainOf(noteLines), t => measure(t, fontSize)),
        below ? -fontSize * 0.9 : (noteLines.length - 1) * lineH + fontSize * 0.9],
    });

    return below ? bottom + 8 + noteLines.length * lineH + 8 : bottom;
  }

  // ── Slevy na dani: ceny podle pásem spotřeby ─────────────────────────────
  // One panel per country, five bars by consumption band, the components
  // stacked (price without taxes, VAT, other taxes; a net-negative tax hatched
  // below zero) and the total as a marker. All panels on one scale.
  const BANDS = ["KWH_LT1000", "KWH1000-2499", "KWH2500-4999", "KWH5000-14999", "KWH_LE15000"];
  const BAND_LABEL = ["do 1 000 kWh/rok", "1 000–2 499 kWh/rok", "2 500–4 999 kWh/rok", "5 000–14 999 kWh/rok", "15 000 kWh/rok a více"];
  const BAND_PARTS = [
    { key: "base", label: "Cena bez daní", color: "#a2bfc2" },
    { key: "vat", label: "DPH", color: "#b45f3f" },
    { key: "tax", label: "Daně a poplatky (mimo DPH)", color: "#f5906c" },
  ];
  const BANDS_H = { wide: 250, narrow: 210 };

  function bandMultiples(svg, ctx, o) {
    const variant = variantOf(ctx.width), narrow = variant === "narrow", fontSize = narrow ? 11 : 12;
    const legendItems = [
      { key: "base", label: "Cena bez daní", color: BAND_PARTS[0].color },
      { key: "vat", label: "DPH", color: BAND_PARTS[1].color },
      { key: "tax", label: "Daně a poplatky", suffix: " (mimo DPH)", color: BAND_PARTS[2].color },
      { key: "neg", label: "Záporné daně", color: BAND_PARTS[2].color, kind: "hatch" },
    ];
    const legendH = legend(svg.append("g"), legendItems, ctx.width, fontSize).h;

    const keys = BAND_PARTS.map(k => k.key);
    const panels = o.countries.map(code => ({ code, rows: BANDS.map(b => {
      const r = o.rows.find(d => d.Country === code && d.Year === YEAR && d.Band === b);
      const v = { base: r.NETC + r.NRG_SUP, vat: r.VAT, tax: r.TAX_CAP + r.TAX_RNW + r.TAX_OTHER };
      return { ...v, total: v.base + v.vat + v.tax };
    }) }));
    const all = panels.flatMap(p => p.rows);
    const lo = d3.min(all, r => Math.min(0, r.tax)), hi = d3.max(all, r => r.base + r.vat + Math.max(0, r.tax));
    const step = 0.5, ticks = d3.range(Math.floor(lo / step), Math.ceil(hi / step) + 1).map(i => i * step);
    const plotH = BANDS_H[variant];
    const y = d3.scaleLinear().domain(d3.extent(ticks)).range([plotH, 0]);
    const axis = { tickValues: ticks, tickFormat: v => num(v).replace("-", "−") };
    const left = fokAxisYWidth(y, axis, theme) + GRID_PAD;

    const lineH = fontSize * 1.25, topY = y(d3.max(ticks));
    const nameH = 38, captionH = Math.max(6, Math.ceil(lineH + 6 - topY));
    // Panels as wide as in a row of four, like chart 08's.
    const { w: panelW, gap: gapX } = panelSize(ctx.width, 4, narrow);
    // Bars as wide as chart 04's: the padding that gives that width (step = panelW / (5 + p), width = step (1 − p)).
    const barTarget = countryBarWidth(ctx.width), pad = Math.max(0.05, (panelW - 5 * barTarget) / (panelW + barTarget));
    const x = d3.scaleBand().domain(BANDS).range([0, panelW]).padding(pad);
    const bw = x.bandwidth(), top = legendH + 14, plotTop = top + nameH + captionH;
    const panelX = i => left + i * (panelW + gapX);
    const sub = narrow ? 9 : 10, subH = sub * 1.25;
    let target;

    panels.forEach((pn, i) => {
      const g = svg.append("g").attr("transform", `translate(${panelX(i)},${top})`);
      panelName(g, i === 0 ? -left : 0, countryName.of(ISO2[pn.code]), fontSize - 1);
      if (i === 0) runs(g, -left, nameH + captionH + topY - lineH, [[["Průměrná cena elektřiny v roce " + YEAR]]],
        theme.colors.grey, fontSize - 1);

      const p = g.append("g").attr("transform", `translate(0,${nameH + captionH})`);
      const ax = yAxisIn(p, y, axis, panelW, i === 0);

      const data = pn.rows.map((r, j) => ({ ...r, band: BANDS[j], j }));
      const series = d3.stack().keys(keys).offset(d3.stackOffsetDiverging)(data);
      const tipHtml = r => `<strong>${countryName.of(ISO2[pn.code])}, ${BAND_LABEL[r.j]}</strong><br>` + BAND_PARTS.slice().reverse()
        .map(k => `<span style="color:${textColor(k.color)}">■</span> ${k.label}: ${num(r[k.key], 3)}`).join("<br>")
        + `<br><strong>Cena elektřiny: ${num(r.total)} ${UNIT}</strong>`;
      series.forEach(sr => {
        const part = BAND_PARTS.find(k => k.key === sr.key);
        sr.forEach(d => {
          const r = d.data, h = Math.abs(y(d[0]) - y(d[1])), y0 = y(Math.max(d[0], d[1]));
          if (!h) return;
          const neg = r[sr.key] < 0;
          p.append("rect").datum(r).attr("x", x(r.band)).attr("width", bw).attr("y", y0).attr("height", h)
            .attr("fill", neg ? "#fff" : part.color)
            .on("mouseover", (ev, r2) => { tip.show(tipHtml(r2)); tip.move(ev); })
            .on("mousemove", ev => tip.move(ev)).on("mouseleave", () => tip.hide());
          if (neg) fokHatch(p, x(r.band), y0, bw, h, part.color);
        });
      });
      axisLine(p, panelW, y(0));
      p.selectAll("rect.total").data(data).join("rect").attr("class", "total")
        .attr("x", r => x(r.band) - 2).attr("width", bw + 4).attr("y", r => y(r.total) - 1.5).attr("height", 3)
        .attr("fill", theme.colors.text).attr("pointer-events", "none");

      // Tick marks under every bar, the axis along the bottom of the plot.
      axisLine(p, panelW, plotH);
      p.append("g").attr("transform", `translate(0,${plotH})`)
        .call(fokAxisX(x, { tickValues: BANDS, tickFormat: () => "" }, theme))
        .call(a => a.select(".domain").remove())
        .call(xTicks);
      if (i === 0) fokAxisYLabel(ax, y, axis, UNIT, { inline: true }, theme);
      // Only the ends are named; the first panel also says what they are.
      const ly = plotH + TICK_GAP + TICK + 6;
      // The units are short: in a panel this wide the two ends would otherwise run into each other.
      const first = ["nízká", "spotřeba"].map(t => [[t, "b"]]), last = ["vysoká", "spotřeba"].map(t => [[t, "b"]]);
      const unitsL = ["do 1 000", "kWh/rok"];
      const unitsR = ["15 000+", "kWh/rok"];
      runs(p, x(BANDS[0]), ly + sub * 0.6, i === 0 ? [...first, ...unitsL.map(t => [[t]])] : first,
        theme.colors.grey, sub);
      runs(p, x(BANDS[4]) + bw, ly + sub * 0.6, i === 0 ? [...last, ...unitsR.map(t => [[t]])] : last,
        theme.colors.grey, sub).attr("text-anchor", "end");

      if (i === 0) target = [panelX(0) + x(BANDS[0]) + bw, plotTop + y(-0.6)];
    });

    const n = o.note;
    annotation(svg.append("g"), ctx, {
      key: "poznamka", lines: narrow ? n.narrow : n.wide, color: theme.colors.grey, fontSize, target,
      // Wide: the four lines centred on the arrow, which leaves level from their middle.
      at: [target[0] + (narrow ? 16 : 60), narrow ? plotTop + y(-0.33) : target[1] - 1.5 * lineH],
      from: narrow ? undefined : [-6, 1.5 * lineH],
    });

    return plotTop + plotH + TICK_GAP + TICK + 6 + 4 * subH + 6;
  }

  // ── Bodové grafy: vztah dvou veličin v zemích EU ─────────────────────────
  // Every country-year a dot, each country's trend a line (least squares over its own years, from
  // its smallest x to its largest). A few countries are picked out in colour, with a note.
  // o: { points: [{ c, year, x, y }], highlight: { code: colour }, yMax, yTicks, xTicks, xDecimals,
  //      yCaption: [lines], xCaption: [lines of runs], tipX, tipY, notes: [...] }
  // A note: { key, lines, narrow? (lines), at: [fx, y] (fraction of the plot's width, data y),
  //           endAlign? (on phones: ends at the right edge), target?: [fx, y], from?, shape? }
  const LINE_GREY = "#c5a7c9", DOT_GREY = "#75808e";
  const xTicksCentered = a => { xTicks(a); a.selectAll(".tick text").attr("x", 0); };

  function scatterChart(svg, ctx, o) {
    const variant = variantOf(ctx.width), narrow = variant === "narrow", fontSize = narrow ? 11 : 12;
    const lineH = fontSize * 1.25, plotH = narrow ? Math.round(ctx.width * 0.85) : 400;
    const xMax = d3.max(o.points, d => d.x) * 1.02;
    const y = d3.scaleLinear().domain([0, o.yMax]).range([plotH, 0]);
    const axis = { tickValues: o.yTicks, tickFormat: v => num(v) };
    const left = fokAxisYWidth(y, axis, theme) + GRID_PAD;
    const innerW = ctx.width - left - RIGHT;
    const x = d3.scaleLinear().domain([0, xMax]).range([0, innerW]);
    // The caption stands over the unit, which is level with the top tick: room above if that is too near the top.
    const topY = y(d3.max(o.yTicks));
    const plotTop = Math.max(0, Math.ceil(o.yCaption.length * lineH + 6 - topY)) + 4;
    const g = svg.append("g").attr("transform", `translate(${left},${plotTop})`);
    runs(g, -left, topY - o.yCaption.length * lineH, o.yCaption.map(t => [[t]]), theme.colors.grey, fontSize);
    const ax = yAxisIn(g, y, axis, innerW, true);
    axisLine(g, innerW, plotH);
    g.append("g").attr("transform", `translate(0,${plotH})`)
      .call(fokAxisX(x, { tickValues: o.xTicks, tickFormat: v => num(v, o.xDecimals) }, theme))
      .call(a => a.select(".domain").remove())
      .call(xTicksCentered);
    const captionY = plotH + TICK_GAP + TICK + 5 + 12 + 16;
    runs(g, innerW / 2, captionY, o.xCaption, theme.colors.grey, fontSize).attr("text-anchor", "middle");

    // Each country's line.
    const trend = pts => {
      const mx = d3.mean(pts, d => d.x), my = d3.mean(pts, d => d.y);
      const sxx = d3.sum(pts, d => (d.x - mx) ** 2);
      if (pts.length < 2 || !sxx) return null;
      const k = d3.sum(pts, d => (d.x - mx) * (d.y - my)) / sxx, [x0, x1] = d3.extent(pts, d => d.x);
      return [[x0, my + k * (x0 - mx)], [x1, my + k * (x1 - mx)]];
    };
    const countries = [...d3.group(o.points, d => d.c)];
    const isHl = c => c in o.highlight;
    const drawLines = list => list.forEach(([c, pts]) => {
      const t = trend(pts);
      if (t) g.append("path").attr("d", d3.line()(t.map(([a, b]) => [x(a), y(b)])).replace(/NaN/g, "0"))
        .attr("fill", "none").attr("stroke", isHl(c) ? o.highlight[c] : LINE_GREY)
        .attr("stroke-width", isHl(c) ? 2.5 : 1).attr("stroke-linecap", "butt");
    });
    const tipHtml = d => `<strong>${countryName.of(ISO2[d.c])}, ${d.year}</strong><br>${o.tipX}: ${num(d.x, 3)}<br>${o.tipY}: ${num(d.y, 3)} ${UNIT}`;
    const drawDots = list => list.forEach(([c, pts]) => g.selectAll(null).data(pts).join("circle")
      .attr("cx", d => x(d.x)).attr("cy", d => y(d.y)).attr("r", isHl(c) ? 3.5 : 2.5)
      .attr("fill", isHl(c) ? o.highlight[c] : DOT_GREY).attr("stroke", "#fff").attr("stroke-width", 0.8)
      .on("mouseover", (ev, d) => { tip.show(tipHtml(d)); tip.move(ev); })
      .on("mousemove", ev => tip.move(ev)).on("mouseleave", () => tip.hide()));
    const plain = countries.filter(([c]) => !isHl(c)), picked = countries.filter(([c]) => isHl(c));
    drawLines(plain);
    drawDots(plain);
    drawLines(picked);
    drawDots(picked);
    fokAxisYLabel(ax, y, axis, UNIT, { inline: true }, theme);

    o.notes.forEach(n => {
      const lines = narrow && n.narrow ? n.narrow : n.lines, W = d3.max(plainOf(lines), t => measure(t, fontSize));
      const end = narrow && n.endAlign;
      annotation(g, ctx, {
        key: n.key, lines, color: theme.colors.grey, fontSize, shape: n.shape,
        anchor: end ? "end" : undefined,
        // A note starts where its fraction says, but (maxX) never so far right that it runs off the plot.
        at: [end ? innerW + GRID_PAD : n.at[0] * innerW, y(n.at[1])],
        maxX: end ? undefined : innerW + GRID_PAD - W,
        target: n.target && [n.target[0] * innerW, y(n.target[1])],
        from: n.target ? [(end ? -W : 0) - 10, 1.5 * lineH] : undefined,
      });
    });
    return plotTop + captionY + o.xCaption.length * lineH + 6;
  }

  // ── Náklady na podporu OZE v Německu ─────────────────────────────────────
  // Stacked bars by year: what the levy on bills brought in, what the federal
  // budget paid, and the EEG account's balance (hatched when negative, where it
  // had a surplus), with what was paid out to the operators as a marker. A
  // bracket over the years of the levy, two arrows.
  const EEG = [
    { key: "levy", label: "Financování z poplatků na vyúčtování", color: "#f45366" },
    { key: "fed", label: "Financování z federálního rozpočtu", color: "#eda80c" },
    { key: "eeg", label: "Bilance účtu EEG", color: "#9670af" },
  ];
  const EEG_PX = { wide: 4.96, narrow: 4 };   // px per mld. €

  function eegChart(svg, ctx, rows) {
    const variant = variantOf(ctx.width), narrow = variant === "narrow", fontSize = narrow ? 11 : 12;
    const lineH = fontSize * 1.25;
    // The legend's labels break into two lines.
    const LEGEND_LABEL = { levy: "Financování z poplatků\nna vyúčtování", fed: "Financování z federálního\nrozpočtu", eeg: "Bilance účtu EEG" };
    const legendItems = [EEG[0], EEG[2], EEG[1]].map(k => ({ key: k.key, label: LEGEND_LABEL[k.key], color: k.color }))
      .concat([{ key: "total", label: "Finance vyplacené\nprovozovatelům", color: theme.colors.text, kind: "marker", thickness: 3 }]);
    const legendH = legend(svg.append("g"), legendItems, ctx.width, fontSize).h;

    const series = d3.stack().keys(EEG.map(k => k.key)).offset(d3.stackOffsetDiverging)(rows);
    const lo = d3.min(series, sr => d3.min(sr, d => d[0])), hi = d3.max(series, sr => d3.max(sr, d => d[1]));
    const ticks = [-10, 0, 10, 20, 30];
    const domain = [Math.floor(lo * 2) / 2, Math.max(hi, 30)];
    const plotH = Math.round((domain[1] - domain[0]) * EEG_PX[variant]);
    const y = d3.scaleLinear().domain(domain).range([plotH, 0]);
    const axis = { tickValues: ticks, tickFormat: v => num(v, 0).replace("-", "−") };
    const left = fokAxisYWidth(y, axis, theme) + GRID_PAD;
    // Wide: the note on 2024 sits right of the bars. Narrow: below the axis.
    const rightW = narrow ? 0 : Math.round(ctx.width * 0.27);
    const innerW = ctx.width - left - RIGHT - rightW;
    const x = d3.scaleBand().domain(rows.map(r => r.year)).range([0, innerW]).padding(COUNTRY_PADDING);
    const bw = x.bandwidth(), xc = yr => x(yr) + bw / 2, last = rows[rows.length - 1].year;
    const topOf = yr => d3.max(series, sr => sr[rows.findIndex(r => r.year === yr)][1]);

    const RED = EEG[0].color, ORANGE = EEG[1].color, GREY = theme.colors.grey;
    const NOTE_PERIOD = [[["Do července 2022 platily za podporu"]], [["obnovitelných zdrojů "], ["výhradně spotřebitelé", "b"]],
      [["formou "], ["poplatku na vyúčtování", "b", RED]]];
    const NOTE_CRISIS = [[["Vlivem vysokých velkoobchodních"]], [["cen "], ["během energetické krize", "b"]],
      [["klesla nutná výše podpory", "b"]]];
    const NOTE_FED = [[["Od roku 2024"]], [["se podpora hradí"]], [["z "], ["federálního rozpočtu", "b", ORANGE]]];
    // Notes above the bars: the bracket's, with the crisis one beside it (wide) or over it (narrow).
    const aboveH = (narrow ? NOTE_CRISIS.length + NOTE_PERIOD.length : NOTE_PERIOD.length) * lineH + 14 + 26;
    const plotTop = legendH + 10 + aboveH, axisH = TICK_GAP + TICK + 28;

    const g = svg.append("g").attr("transform", `translate(${left},${plotTop})`);
    const ax = yAxisIn(g, y, axis, innerW, true);

    const tipHtml = r => `<strong>${r.year}</strong><br>` + [EEG[0], EEG[2], EEG[1]]
      .map(k => `<span style="color:${textColor(k.color)}">■</span> ${k.label}: ${num(r[k.key])} mld. €`).join("<br>")
      + `<br><strong>Finance vyplacené provozovatelům: ${num(r.payments)} mld. €</strong>`;
    series.forEach(sr => {
      const c = EEG.find(k => k.key === sr.key).color;
      sr.forEach(d => {
        const r = d.data, h = Math.abs(y(d[0]) - y(d[1])), y0 = y(Math.max(d[0], d[1]));
        if (h < 0.05) return;
        const neg = r[sr.key] < 0;
        g.append("rect").datum(r).attr("x", x(r.year)).attr("width", bw).attr("y", y0).attr("height", h)
          .attr("fill", neg ? "#fff" : c).attr("stroke", "#fff").attr("stroke-width", 0.5)
          .on("mouseover", (ev, r2) => { tip.show(tipHtml(r2)); tip.move(ev); })
          .on("mousemove", ev => tip.move(ev)).on("mouseleave", () => tip.hide());
        if (neg) fokHatch(g, x(r.year), y0, bw, h, c);
      });
    });
    axisLine(g, innerW, y(0));
    g.selectAll("rect.total").data(rows).join("rect").attr("class", "total")
      .attr("x", r => x(r.year) - 2).attr("width", bw + 4).attr("y", r => y(r.payments) - 1.5).attr("height", 3)
      .attr("fill", theme.colors.text).attr("pointer-events", "none");
    g.append("g").attr("transform", `translate(0,${plotH})`)
      .call(fokAxisX(x, { tickValues: [2010, 2015, 2020, last], tickFormat: d => String(d) }, theme))
      .call(a => a.select(".domain").remove())
      .call(xTicks);
    fokAxisYLabel(ax, y, axis, "mld. €", { inline: true }, theme);

    // The bracket over the years of the levy, 2010 to the middle of 2022, and its note over its right end.
    const bracketY = y(hi) - 22, bx1 = xc(2010), bx2 = xc(2022);
    g.append("path").attr("d", `M${bx1},${bracketY + 12}V${bracketY}H${bx2}V${bracketY + 12}`)
      .attr("fill", "none").attr("stroke", GREY).attr("stroke-width", 1);
    const periodTop = bracketY - 12 - (NOTE_PERIOD.length - 1) * lineH;
    annotation(g, ctx, { key: "obdobi", lines: NOTE_PERIOD, color: GREY, fontSize, anchor: "end", at: [bx2, periodTop] });

    // The crisis: its arrow down to 2022's bar.
    const crisisW = d3.max(plainOf(NOTE_CRISIS), t => measure(t, fontSize));
    annotation(g, ctx, {
      key: "kriz", lines: NOTE_CRISIS, color: GREY, fontSize, shape: "vertical",
      at: narrow ? [innerW + GRID_PAD - crisisW, periodTop - NOTE_CRISIS.length * lineH - 6] : [xc(2023) + 15, periodTop],
      from: [(narrow ? 0.8 : 0.25) * crisisW, (NOTE_CRISIS.length - 1) * lineH + fontSize * 0.9],
      target: [xc(2022), y(topOf(2022)) - 4],
    });

    // From 2024 on: right of the last bar, or under the axis on a phone.
    const fedW = d3.max(plainOf(NOTE_FED), t => measure(t, fontSize));
    annotation(g, ctx, narrow ? {
      key: "federal", lines: NOTE_FED, color: GREY, fontSize, anchor: "end", shape: "vertical",
      at: [innerW + GRID_PAD, plotH + axisH + 8 + fontSize], from: [-0.5 * fedW, -fontSize],
      target: [xc(last), y(0) + 8],
    } : {
      key: "federal", lines: NOTE_FED, color: GREY, fontSize, shape: "elbow",
      at: [xc(last) + bw / 2 + 36, y(topOf(last)) - 40], from: [-6, 0],
      target: [xc(last), y(topOf(last)) - 4],
    });

    return plotTop + plotH + axisH + (narrow ? NOTE_FED.length * lineH + 24 : 0);
  }

  csv("EEG-2010-2025.csv").then(raw => {
    const rows = raw.map(r => {
      const v = Object.fromEntries(["payments_to_producers_eur", "income_from_eeg_levy_eur", "federal_budget_transfers_eur"]
        .map(k => [k, r[k] / 1e9]));
      return { year: r.year, payments: v.payments_to_producers_eur, levy: v.income_from_eeg_levy_eur,
        fed: v.federal_budget_transfers_eur,
        // What neither the levy nor the budget covered: the EEG account's balance, negative when it had a surplus.
        eeg: v.payments_to_producers_eur - v.income_from_eeg_levy_eur - v.federal_budget_transfers_eur };
    });
    mount("graf-naklady-nemecko", (svg, ctx) => eegChart(svg, ctx, rows));
  });

  csv("electricity-prices-household-bands.csv").then(rows => {
    mount("graf-slevy", (svg, ctx) => bandMultiples(svg, ctx, {
      rows, countries: ["NLD", "IRL", "AUT"],
      // Four lines at every width.
      note: (lines => ({ wide: lines, narrow: lines }))(
        [[["Daňová sleva se v"]], [["Nizozemsku nejvýrazněji"]], [["projevila "], ["u domácností", "b"]], [["s nejnižší spotřebou", "b"]]]),
    }));
  });

  csv("electricity-prices-household.csv").then(rows => {
    const cz = rows.find(d => d.Country === "CZE" && d.Year === YEAR);
    if (!cz) return console.warn(`ceny-elektriny-oze: no CZE row for ${YEAR}`);
    mount("graf-slozky-ceny-cz", (svg, ctx) => componentsBar(svg, ctx, cz));

    const year = rows.filter(d => d.Year === YEAR)
      .map(d => ({ Country: d.Country, ...Object.fromEntries(COMPONENTS.map(c => [c.key, c.of(d)])) }))
      .map(d => ({ ...d, total: d3.sum(COMPONENTS, c => d[c.key]) }));
    const eu = year.find(d => d.Country === "EU");
    const members = year.filter(d => ISO2[d.Country]);
    if (members.length !== 27) console.warn(`ceny-elektriny-oze: ${members.length} EU members in ${YEAR}`);

    // Dvě bodové závislosti: all years, the 27 members (the data's EU average and Norway are left out).
    const dots = rows.filter(d => ISO2[d.Country]);
    const GREY_BOLD = "b";
    const RED = "#cb4f5f", DARKRED = "#8f0d0d", ORANGE = "#e8582b", PURPLE = "#9a4a88", LILAC = "#c49ac5", TEAL = "#1f8a8f";
    const gas = dots.filter(d => d.GasPrice != null && d.NRG_SUP != null)
      .map(d => ({ c: d.Country, year: d.Year, x: d.GasPrice, y: d.NRG_SUP }));
    mount("graf-scatter-plyn", (svg, ctx) => scatterChart(svg, ctx, {
      points: gas, highlight: { GRC: DARKRED, IRL: RED, ITA: ORANGE, FIN: PURPLE },
      yMax: Math.max(0.4, d3.max(gas, d => d.y) * 1.02), yTicks: [0, 0.1, 0.2, 0.3, 0.4],
      xTicks: [0, 0.05, 0.1, 0.15], xDecimals: 2,
      yCaption: ["Průměrná cena", "za energie a dodávky"],
      xCaption: [[["Průměrná cena zemního plynu", "b"], [` (${UNIT}, bez DPH)`]]],
      tipX: "Cena zemního plynu", tipY: "Energie a dodávky",
      notes: [
        { key: "recko", at: [0.17, 0.34],
          lines: [[["Ceny v "], ["Řecku", "b", DARKRED], [", "], ["Irsku", "b", RED], [" a "], ["Itálii", "b", ORANGE], [" jsou silně"]],
            [["provázané s cenami zemního plynu"]]],
          narrow: [[["Ceny v "], ["Řecku", "b", DARKRED], [", "], ["Irsku", "b", RED]], [["a "], ["Itálii", "b", ORANGE], [" jsou silně provázané"]],
            [["s cenami zemního plynu"]]] },
        { key: "rostla", at: [0.71, 0.3], target: [0.64, 0.238], shape: "elbow", endAlign: true,
          lines: [[["Cena elektřiny téměř "], ["ve všech", GREY_BOLD]], [["státech ", GREY_BOLD], ["rostla", "b", LILAC], [" s cenou zemního"]],
            [["plynu, jen různým tempem"]]] },
        { key: "finsko", at: [0.81, 0.067], endAlign: true,
          lines: [[["Ceny ve "], ["Finsku", "b", PURPLE], [" jsou na"]], [["zemní plyn méně citlivé"]]] },
      ],
    }));

    const grid = dots.filter(d => d.SolarGW != null && d.WindGW != null && d.NETC != null)
      .map(d => ({ c: d.Country, year: d.Year, x: (d.SolarGW + d.WindGW) / d.Population * 1e6, y: d.NETC }));
    // The axis follows the data: ticks every 0.05 (every 0.1 over 0.2), the top one the first at or over the highest dot.
    const gridMax = d3.max(grid, d => d.y), gridStep = gridMax > 0.2 ? 0.1 : 0.05;
    const gridTop = Math.round(Math.ceil(gridMax / gridStep - 1e-9) * gridStep * 100) / 100;
    mount("graf-scatter-site", (svg, ctx) => scatterChart(svg, ctx, {
      points: grid, highlight: { BEL: TEAL, NLD: RED },
      yMax: gridTop, yTicks: d3.range(0, gridTop / gridStep + 0.5).map(i => Math.round(i * gridStep * 100) / 100),
      xTicks: [0, 0.5, 1, 1.5, 2], xDecimals: 1,
      yCaption: ["Průměrná složka", "nákladů na sítě"],
      xCaption: [[["Instalovaný výkon fotovoltaických a větrných elektráren", "b"]], [["(kW na obyvatele)"]]],
      tipX: "Výkon FVE a větru (kW na obyvatele)", tipY: "Náklady na sítě",
      notes: [
        { key: "belgie", at: [0.085, 0.8 * gridTop],
          lines: [[["V "], ["Belgii", "b", TEAL], [" složka nákladů na sítě"]], [["klesala", "b"], [" navzdory postupné výstavbě zdrojů"]]],
          narrow: [[["V "], ["Belgii", "b", TEAL], [" složka nákladů na sítě"]], [["klesala", "b"], [" navzdory postupné"]], [["výstavbě zdrojů"]]] },
        { key: "nizozemsko", at: [0.65, 0.93 * gridTop], endAlign: true,
          lines: [[["V "], ["Nizozemsku", "b", RED], [" spolu s velmi"]], [["rychlým rozvojem nových"]],
            [["zdrojů náklady na sítě "], ["rostly", "b"]]] },
      ],
    }));

    mount("graf-ceny-eu", (svg, ctx) => countryBars(svg, ctx, {
      rows: members,
      extras: (g, s) => {
        g.append("line").attr("x2", s.innerW).attr("y1", s.y(eu.total)).attr("y2", s.y(eu.total))
          .attr("stroke", "#708090").attr("stroke-width", 1).attr("stroke-dasharray", "6 4");
        // Both left-aligned, at the left end of the longer one, which ends at the plot's edge.
        const note = ["Vážený průměr všech spotřebních pásem.", "Ceny včetně DPH, přepočítané na € podle",
          `průměrného směnného kurzu v roce ${YEAR}.`];
        const x0 = s.innerW - Math.ceil(d3.max(note, t => measure(t, s.fontSize)));
        annotation(g, ctx, {
          key: "prumer", at: [x0, s.y(eu.total)], background: true,
          lines: [[["Průměr zemí EU", "b"]]], color: theme.colors.grey, fontSize: s.fontSize,
        });
        annotation(g, ctx, {
          key: "poznamka", at: [x0, s.y(eu.total) - 3.2 * s.fontSize * 1.25], background: true,
          lines: note.map(t => [[t]]), color: theme.colors.grey, fontSize: s.fontSize,
        });
      },
    }));

    const NOTES = {
      dynamicke: { country: "GRC", year: 2023, key: "NRG_SUP", color: theme.colors.grey,
        lines: [[["Velkoobchodní ceny se"]], [["do "], ["cen pro domácnosti", "c", SERIES[1].color]], [["promítají rychle"]]],
        atPanel: 2, fromFrac: 0.5, sideNote: true },
      fixovane: { country: "FRA", year: 2024, key: "NRG_SUP", color: theme.colors.grey,
        lines: [[["V zemích s převahou"]], [["dlouhodobě fixovaných"]], [["kontraktů nastupuje reakce"]],
          [["postupně a se zpožděním", "b"]]],
        atPanel: 3, fromFrac: 0.1, sideNote: true },
    };
    const multiples = (id, countries, note, extra) => mount(id, (svg, ctx) =>
      lineMultiples(svg, ctx, { rows, countries, note: { ...note, target: note }, ...extra }));
    // Three panels in a row of four: the last slot stays free.
    multiples("graf-spot-dynamicke", ["DNK", "ESP", "GRC"], NOTES.dynamicke, { slots: 4 });
    multiples("graf-spot-fixovane", ["CZE", "DEU", "FRA"], NOTES.fixovane, { slots: 4 });

    // Zastropování: the same, plus industry's price, four countries.
    const SERIES_NH = [...SERIES, { key: "NRG_SUP_nh", label: "Průmysl a komerční sféra", color: "#7272bf", kind: "marker" }];
    csv("electricity-prices-nonhousehold.csv").then(nh => {
      const nhPrice = new Map(nh.map(d => [d.Country + d.Year, d.NRG_SUP]));
      const both = rows.map(d => ({ ...d, NRG_SUP_nh: nhPrice.get(d.Country + d.Year) ?? null }));
      mount("graf-zastropovane", (svg, ctx) => lineMultiples(svg, ctx, {
        rows: both, countries: ["HUN", "BGR", "POL", "SVK"], series: SERIES_NH,
        note: { country: "BGR", year: 2022, key: "SpotPrice", dx: 10, dy: 24, color: theme.colors.grey,
          lines: [[["V Bulharsku se ceny regulují pouze "], ["domácnostem", "c", SERIES[1].color], ["."]],
            [["Průmysl", "b", "#7272bf"], [" je plně vystaven velkoobchodním výkyvům"]]],
          narrow: [[["V Bulharsku se ceny"]], [["regulují pouze "], ["domácnostem", "c", SERIES[1].color], ["."]],
            [["Průmysl", "b", "#7272bf"], [" je plně vystaven"]], [["velkoobchodním výkyvům"]]],
          below: true, atPanel: 1, fromFrac: 0.36, target: { country: "BGR", year: 2022, key: "SpotPrice", dx: 10, dy: 24 } },
      }));
    });

    const LEGEND = [
      { key: "nrg", label: "Energie a dodávky", color: COMPONENTS[0].color },
      { key: "netc", label: "Náklady na sítě", color: COMPONENTS[1].color },
      { key: "tax", label: "Další daně a poplatky", color: COMPONENTS[2].color },
      { key: "neg", label: "Záporné daně", color: COMPONENTS[2].color, kind: "hatch" },
      { key: "vat", label: "DPH", color: COMPONENTS[3].color },
      { key: "total", label: "Cena elektřiny", color: theme.colors.text, kind: "marker", thickness: 3 },
    ];
    let legendAt = {};
    mount("graf-ceny-eu-komponenty", (svg, ctx) => countryBars(svg, ctx, {
      rows: members, stacked: true, labels: { tax: "Další daně a poplatky" },
      above: (svg, width, fontSize) => {
        const l = legend(svg.append("g"), LEGEND, width, fontSize);
        legendAt = l.at;
        return l.h + 2 * fontSize;   // room for the note on negative taxes
      },
      extras: (g, s) => {
        const [hx, hy] = legendAt.neg;
        annotation(g, ctx, {
          key: "zaporne", at: [hx + 40 - s.left, hy + 30 - s.plotTop], target: [hx - s.left, hy + 10 - s.plotTop],
          lines: [[["Daňové slevy mohou vést"]], [["k čisté záporné složce daní"]]],
          color: theme.colors.grey, fontSize: s.fontSize,
        });
        const cx = s.x(HIGHLIGHT) + s.bw / 2, [lo] = s.y.domain();
        if (lo < 0) fokArrow(g, { target: [cx, s.y(0)], textEnd: [cx, s.y(lo)], bezier: [0, 0, 1, 1],
          lines: [], background: false, color: theme.colors.grey }, theme);
      },
    }));
  });
})();
