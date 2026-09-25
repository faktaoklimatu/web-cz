/* Shared "Stáhnout SVG" button for the site's d3 charts.
 *
 * Drop the script on a page and give any button the class and the target:
 *
 *   <button type="button" class="svg-download"
 *           data-svg="ets-svg-timeline"
 *           data-filename="ets-vyvoj-v-case.svg"
 *           data-title="#ets-timeline-title"
 *           data-subtitle="#ets-filter-summary"
 *           data-source="#ets-source-timeline">
 *
 * data-title / data-subtitle / data-source are optional selectors. The first
 * two are drawn into a band above the chart and the third below it, under the
 * CREDIT line — on the page all three live in the panel's HTML rather than in
 * the SVG, so the file would otherwise lose them. The page's own "Stáhnout SVG"
 * button is never drawn: it is a control, meaningless once the file is open
 * elsewhere. Everything else is read off the live chart, so the file follows
 * the page's CSS without repeating any of it here.
 *
 * Text is converted to outlines so the file survives a trip to a machine
 * without the webfont — the usual destination is print. That needs the font as
 * a real file, so each family a page uses has to appear in FONTS below; an
 * unregistered family degrades to live text rather than silently exporting the
 * wrong typeface.
 */
(function () {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const XLINK_NS = "http://www.w3.org/1999/xlink";
  const PAD = 16;   // inset of the drawn text, and the gap around each band

  // Drawn under every exported chart, above the source line.
  const CREDIT = "Grafika: Fakta o klimatu";

  const OPENTYPE_URL = "https://cdnjs.cloudflare.com/ajax/libs/opentype.js/1.3.4/opentype.min.js";

  // Subsets of the upstream Apache-2.0 releases, cut to latin + Czech.
  // Keys are the weights the charts actually ask for; see nearestWeight().
  const FONTS = {
    roboto: {
      400: "/assets-local/fonts/Roboto-400.ttf",
      500: "/assets-local/fonts/Roboto-500.ttf",
      700: "/assets-local/fonts/Roboto-700.ttf",
    },
  };

  // ── Font loading ──────────────────────────────────────────────────────────

  let opentypePromise = null;
  function loadOpentype() {
    if (window.opentype) return Promise.resolve(window.opentype);
    if (!opentypePromise) {
      opentypePromise = new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = OPENTYPE_URL;
        s.onload = () => resolve(window.opentype);
        s.onerror = () => reject(new Error("opentype.js se nepodařilo načíst"));
        document.head.appendChild(s);
      });
    }
    return opentypePromise;
  }

  // The first family in a CSS font-family list, unquoted and lowercased, is
  // the one the browser actually used if it loaded at all — the rest of the
  // list is the fallback chain, which is not what we want to bake in.
  function primaryFamily(fontFamily) {
    return (fontFamily || "").split(",")[0].trim().replace(/^["']|["']$/g, "").toLowerCase();
  }

  // A chart may ask for a weight we hold no file for (600, or a keyword like
  // "bold"). Snap to the closest cut we do have rather than failing the whole
  // export over one label.
  function nearestWeight(cuts, weight) {
    const want = weight === "bold" ? 700 : weight === "normal" ? 400 : parseInt(weight, 10) || 400;
    return cuts.reduce((best, w) => (Math.abs(w - want) < Math.abs(best - want) ? w : best));
  }

  const fontCache = {};
  function loadFont(url) {
    if (!fontCache[url]) {
      fontCache[url] = loadOpentype()
        .then(ot => fetch(url).then(r => {
          if (!r.ok) throw new Error(`font ${url}: HTTP ${r.status}`);
          return r.arrayBuffer();
        }).then(buf => ot.parse(buf)));
    }
    return fontCache[url];
  }

  // Loads every cut registered for the family, keyed by weight. Resolves to
  // null for a family we hold no files for — the caller then leaves the text
  // alone instead of exporting it in some other typeface.
  function loadFamily(family) {
    const cuts = FONTS[family];
    if (!cuts) return Promise.resolve(null);
    const weights = Object.keys(cuts).map(Number);
    return Promise.all(weights.map(w => loadFont(cuts[w])))
      .then(fonts => {
        const byWeight = {};
        weights.forEach((w, i) => { byWeight[w] = fonts[i]; });
        return { weights, byWeight };
      });
  }

  // ── Measuring ─────────────────────────────────────────────────────────────

  // The header text has to be wrapped before it exists anywhere renderable —
  // getComputedTextLength() reads 0 on a detached node — so it is measured on
  // a canvas instead of in the DOM.
  const measureCtx = document.createElement("canvas").getContext("2d");
  function wrapToWidth(text, font, width) {
    measureCtx.font = font;
    const lines = [];
    let line = "";
    text.split(/\s+/).filter(Boolean).forEach(word => {
      const next = line ? line + " " + word : word;
      if (line && measureCtx.measureText(next).width > width) { lines.push(line); line = word; }
      else line = next;
    });
    if (line) lines.push(line);
    return lines;
  }

  // ── Text → outlines ───────────────────────────────────────────────────────

  // Resolves one <text>/<tspan>'s own position. SVG lets x/y be inherited from
  // the parent <text> and dy be expressed in em, which is why this cannot just
  // read the attributes off the node.
  function resolvePos(node, parentX, parentY, fontSize) {
    const attr = (name, fallback) => {
      const v = node.getAttribute(name);
      return v === null || v === "" ? fallback : v;
    };
    let x = parseFloat(attr("x", parentX));
    let y = parseFloat(attr("y", parentY));
    const dx = attr("dx", null), dy = attr("dy", null);
    if (dx !== null) x += /em$/.test(dx) ? parseFloat(dx) * fontSize : parseFloat(dx);
    if (dy !== null) y += /em$/.test(dy) ? parseFloat(dy) * fontSize : parseFloat(dy);
    return { x, y };
  }

  // Each <text> becomes one <g> of <path>s in its place, so z-order and any
  // transform on an ancestor are untouched. The anchor has to be applied by
  // hand: a path has no text-anchor, so the advance width is measured and the
  // origin shifted before the outline is generated.
  function outlineText(textEl, fonts, computed) {
    function draw(node, inherited) {
      const cs = window.getComputedStyle(node) || inherited.cs;
      const fontSize = parseFloat((cs && cs.fontSize) || inherited.fontSize) || inherited.fontSize;
      const weight = (cs && cs.fontWeight) || inherited.weight;
      const fill = (cs && cs.fill) || inherited.fill;
      const anchor = (cs && cs.textAnchor) || inherited.anchor;

      const kids = Array.from(node.children).filter(c => c.tagName === "tspan");
      const pos = resolvePos(node, inherited.x, inherited.y, fontSize);

      if (kids.length) {
        // A <text> holding tspans: its own direct text is ignored (that is how
        // the charts build wrapped labels), each tspan carries its own line.
        let cursor = { x: pos.x, y: pos.y };
        const out = [];
        kids.forEach(k => {
          const r = draw(k, { ...inherited, cs, fontSize, weight, fill, anchor, x: cursor.x, y: cursor.y });
          cursor = r.pos;
          out.push(...r.paths);
        });
        return { pos: cursor, paths: out };
      }

      const text = node.textContent || "";
      if (!text.trim()) return { pos, paths: [] };

      const font = fonts.byWeight[nearestWeight(fonts.weights, weight)];
      let x = pos.x;
      if (anchor === "middle" || anchor === "end") {
        const advance = font.getAdvanceWidth(text, fontSize);
        x -= anchor === "middle" ? advance / 2 : advance;
      }
      const path = font.getPath(text, x, pos.y, fontSize);
      const el = document.createElementNS(SVG_NS, "path");
      el.setAttribute("d", path.toPathData(2));
      el.setAttribute("fill", fill);
      return { pos, paths: [el] };
    }

    const { paths } = draw(textEl, {
      cs: computed, x: 0, y: 0,
      fontSize: parseFloat(computed.fontSize) || 12,
      weight: computed.fontWeight, fill: computed.fill, anchor: computed.textAnchor,
    });
    return paths;
  }

  // Outlines are generated from the LIVE chart, where getComputedStyle resolves
  // CSS-inherited sizes and fills, then dropped into the clone at the matching
  // index. Converting the clone directly would lose every value that comes from
  // a stylesheet rather than an attribute.
  function outlineInto(clone, live, fonts) {
    const liveTexts = live.querySelectorAll("text");
    const cloneTexts = clone.querySelectorAll("text");
    if (liveTexts.length !== cloneTexts.length) return false;   // out of step, leave as text
    liveTexts.forEach((liveText, i) => {
      const paths = outlineText(liveText, fonts, window.getComputedStyle(liveText));
      const target = cloneTexts[i];
      const g = document.createElementNS(SVG_NS, "g");
      // A <text> can carry its own transform — the sankey rotates its node
      // labels that way in the transposed layout — and the outlines are in that
      // element's local frame, so the group has to inherit it.
      const transform = target.getAttribute("transform");
      if (transform) g.setAttribute("transform", transform);
      paths.forEach(p => g.appendChild(p));
      target.parentNode.replaceChild(g, target);
    });
    return true;
  }

  // ── Export ────────────────────────────────────────────────────────────────

  function buildSvg(btn) {
    const src = document.getElementById(btn.dataset.svg);
    if (!src) throw new Error(`chybí <svg id="${btn.dataset.svg}">`);
    const rect = src.getBoundingClientRect();
    const w = Math.round(rect.width), h = Math.round(rect.height);
    const family = window.getComputedStyle(src).fontFamily;

    // Sizes and colours come off the live elements, so the export follows the
    // page's CSS tokens as they are retuned rather than repeating them here.
    function itemFrom(selector, weight) {
      const el = selector && document.querySelector(selector);
      const text = el && el.textContent.trim();
      if (!text) return null;
      const cs = window.getComputedStyle(el);
      const link = el.querySelector && el.querySelector("a");
      return {
        text, weight,
        size: Math.round(parseFloat(cs.fontSize)),
        fill: cs.color,
        href: link ? link.href : null,
      };
    }

    // Stacks a run of blocks from `startY`, wrapping each to the page width.
    // Returns the baseline of the last line, which is what the band's height
    // is then measured from. `anchor` of "end" hangs the lines off the right
    // margin; x is then the edge they end at, not the one they start from.
    function layout(items, startY, anchor) {
      const x = anchor === "end" ? w - PAD : PAD;
      let y = startY;
      const lines = [];
      items.forEach((it, i) => {
        if (i) y += Math.round(it.size * 0.5);   // gap between blocks
        wrapToWidth(it.text, `${it.weight} ${it.size}px ${family}`, w - 2 * PAD).forEach(t => {
          y += Math.round(it.size * 1.3);
          lines.push({ t, y, x, anchor, size: it.size, weight: it.weight, fill: it.fill, href: it.href });
        });
      });
      return { lines, end: y };
    }

    const headItems = [itemFrom(btn.dataset.title, 700), itemFrom(btn.dataset.subtitle, 400)]
      .filter(Boolean);
    const head = layout(headItems, PAD);
    const headerH = head.lines.length ? head.end + PAD : 0;

    // Credit and source go under the chart, credit first. The "Stáhnout SVG"
    // button sits in the same row on the page but is deliberately left out: it
    // is a control, meaningless once the file is open somewhere else.
    const source = itemFrom(btn.dataset.source, 400);
    const credit = {
      text: CREDIT, weight: 400,
      size: source ? source.size : 13,
      fill: source ? source.fill : "#a0aec0",
    };
    const footTop = headerH + h + PAD;

    // The two sit on one line. Measuring first rather than assuming they fit:
    // a narrow export, or a source naming several datasets, would otherwise run
    // the line off the canvas — in that case they stack instead.
    let foot = null;
    if (source) {
      measureCtx.font = `400 ${credit.size}px ${family}`;
      const creditW = measureCtx.measureText(credit.text).width;
      measureCtx.font = `400 ${source.size}px ${family}`;
      const gap = Math.round(credit.size * 1.2);
      const sourceW = measureCtx.measureText(source.text).width;
      if (creditW + gap + sourceW <= w - 2 * PAD) {
        // Both hang off the right margin: the source ends at it, the credit one
        // gap further left. Each is anchored rather than placed by its left
        // edge, so the run's right edge is exact whichever way it is drawn.
        const y = footTop + Math.round(credit.size * 1.3);
        foot = {
          end: y,
          lines: [
            { t: credit.text, y, x: Math.round(w - PAD - sourceW - gap), anchor: "end",
              size: credit.size, weight: 400, fill: credit.fill },
            { t: source.text, y, x: w - PAD, anchor: "end",
              size: source.size, weight: 400, fill: source.fill, href: source.href },
          ],
        };
      }
    }
    if (!foot) foot = layout([credit, source].filter(Boolean), footTop, "end");
    const totalH = foot.end + PAD;

    const out = document.createElementNS(SVG_NS, "svg");
    out.setAttribute("xmlns", SVG_NS);
    out.setAttribute("xmlns:xlink", XLINK_NS);
    out.setAttribute("width", w);
    out.setAttribute("height", totalH);
    out.setAttribute("viewBox", `0 0 ${w} ${totalH}`);
    out.setAttribute("font-family", family);

    // On the page the panel supplies the white behind the charts; the file has
    // to carry its own, or it opens transparent (grey or black in most viewers).
    const bg = document.createElementNS(SVG_NS, "rect");
    bg.setAttribute("width", w);
    bg.setAttribute("height", totalH);
    bg.setAttribute("fill", "#fff");
    out.appendChild(bg);

    // The chart goes in as a nested <svg> rather than being merged: charts that
    // set their own viewBox (a sankey, say) would be rescaled by the outer one.
    // A nested <svg> keeps whatever coordinate system each chart already has.
    const inner = src.cloneNode(true);
    inner.removeAttribute("id");   // the id belongs to the element on the page

    // Elements painted `transparent` exist only to catch pointer events —
    // chart 1 lays one over each year for its tooltip. They are invisible in a
    // browser, but `transparent` is a CSS3 colour keyword that SVG 1.1 does not
    // accept as a paint value: a renderer that follows the older spec, which
    // includes the ones a designer opens the file in, discards it and falls
    // back to fill's initial value — black. The file then opens with solid
    // bars across the chart. Dropping them cannot change how it looks: with no
    // fill and no stroke they draw nothing either way.
    inner.querySelectorAll('[fill="transparent"]').forEach(el => {
      const stroke = el.getAttribute("stroke");
      if (!stroke || stroke === "none") el.remove();
    });
    inner.setAttribute("x", 0);
    inner.setAttribute("y", headerH);
    inner.setAttribute("width", w);
    inner.setAttribute("height", h);
    out.appendChild(inner);

    return { out, inner, src, family, lines: head.lines.concat(foot.lines) };
  }

  // The heading and the credit line are this script's own drawing, so unlike
  // the chart's labels they never exist on the page and have no computed style
  // to read — every value is already in hand, and each line is emitted straight
  // as text or as outlines. A line carrying an href is wrapped in an SVG <a>,
  // so the source stays reachable from the file itself.
  function appendLines(out, lines, fonts) {
    lines.forEach(l => {
      let node;
      if (fonts) {
        const font = fonts.byWeight[nearestWeight(fonts.weights, l.weight)];
        node = document.createElementNS(SVG_NS, "path");
        const x = l.anchor === "end" ? l.x - font.getAdvanceWidth(l.t, l.size) : l.x;
        node.setAttribute("d", font.getPath(l.t, x, l.y, l.size).toPathData(2));
        node.setAttribute("fill", l.fill);
      } else {
        node = document.createElementNS(SVG_NS, "text");
        node.setAttribute("x", l.x);
        node.setAttribute("y", l.y);
        if (l.anchor) node.setAttribute("text-anchor", l.anchor);
        node.setAttribute("font-size", l.size);
        node.setAttribute("font-weight", l.weight);
        node.setAttribute("fill", l.fill);
        node.textContent = l.t;
      }
      if (l.href) {
        const a = document.createElementNS(SVG_NS, "a");
        // href for current viewers, xlink:href for the SVG 1.1 ones.
        a.setAttribute("href", l.href);
        a.setAttributeNS(XLINK_NS, "xlink:href", l.href);
        a.appendChild(node);
        node = a;
      }
      out.appendChild(node);
    });
  }

  function serialize(out, filename) {
    const url = URL.createObjectURL(new Blob(
      ['<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(out)],
      { type: "image/svg+xml;charset=utf-8" }
    ));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "graf.svg";
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Safari can still be reading the blob when click() returns.
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function download(btn) {
    const { out, inner, src, family, lines } = buildSvg(btn);
    return loadFamily(primaryFamily(family)).then(fonts => {
      const outlined = !!fonts && outlineInto(inner, src, fonts);
      appendLines(out, lines, outlined ? fonts : null);
      serialize(out, btn.dataset.filename);
      return outlined;
    });
  }

  function bind() {
    document.querySelectorAll("button.svg-download").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.disabled = true;
        download(btn)
          .catch(err => {
            console.error("Stažení SVG selhalo:", err);
            // opentype.js or the fonts may be unreachable. A file whose text is
            // still text is worth more than no file at all, so fall back to one
            // rather than leaving the click with nothing to show for it.
            try {
              const fallback = buildSvg(btn);
              appendLines(fallback.out, fallback.lines, null);
              serialize(fallback.out, btn.dataset.filename);
            } catch (e) { console.error(e); }
          })
          .finally(() => { btn.disabled = false; });
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
