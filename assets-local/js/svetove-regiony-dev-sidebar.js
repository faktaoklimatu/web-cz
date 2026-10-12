/* TEMPORARY tuning sidebar for the explainer klimaticka-politika-svetove-regiony,
 * built from the ETS dashboard one (ETS-ladici-sidebar.md).
 *
 * Only runs with ?dev=1 in the URL, so it can never reach a normal visitor.
 * Every knob is a CSS variable on :root (defaults in assets-local/_chart-panel.scss).
 * The region colours are shared with the charts (grafy.js reads them at draw
 * time), so a colour change also calls window.REGIONY_REDRAW. Settings survive
 * a reload via localStorage. When the look is final, hit "Kopírovat" and paste the :root block over the one in
 * _chart-panel.scss, then delete this file and its extra-scripts line.
 */
(function () {
  if (!new URLSearchParams(location.search).has("dev")) return;

  const STORE = "regiony-dev-cfg";
  // key -> [CSS variable, fallback, unit]; unit "" means a colour.
  const VARS = {
    colorEU: ["--region-eu", "#36369b", ""],
    colorCina: ["--region-cina", "#e0495a", ""],
    colorUSA: ["--region-usa", "#3b85d8", ""],
    colorIndie: ["--region-indie", "#37a97e", ""],
    tint: ["--region-tint", 0, "%"],
    border: ["--region-border", 1, "px"],
    radius: ["--region-radius", 8, "px"],
    pad: ["--region-pad", 16, "px"],
    flag: ["--region-flag", 22, "px"],
    titleSize: ["--region-title-size", 22, "px"],
    cardWidth: ["--region-card-width", 85, "%"],
    fade: ["--region-fade", 15, "%"],
  };
  // key -> [selector, class]: checkboxes that toggle a class, not a variable.
  const CLASSES = {
    carousel: [".region-grid", "is-carousel"],
  };

  const FIELDS = [
    ["Barvy regionů", [
      ["colorEU", "EU", "color"],
      ["colorCina", "Čína", "color"],
      ["colorUSA", "USA", "color"],
      ["colorIndie", "Indie", "color"],
    ]],
    ["Boxy", [
      ["tint", "Podbarvení (%)", "range", 0, 30, 1],
      ["border", "Rámeček (px, 0 = vypnuto)", "range", 0, 6, 0.5],
      ["radius", "Zaoblení rohů (px)", "range", 0, 32, 1],
      ["pad", "Vnitřní odsazení (px)", "range", 0, 48, 1],
    ]],
    ["Nadpis", [
      ["flag", "Velikost vlajky (px)", "range", 12, 64, 1],
      ["titleSize", "Velikost nadpisu (px)", "range", 14, 40, 1],
    ]],
    ["Hlavní charakteristiky", [
      ["carousel", "Karusel místo mřížky 2×2", "checkbox"],
      ["cardWidth", "Šířka karty (%)", "range", 50, 100, 1],
      ["fade", "Přechod okraje (%)", "range", 0, 40, 1],
    ]],
  ];

  const vals = {};
  const rootStyle = getComputedStyle(document.documentElement);
  Object.entries(VARS).forEach(([k, [cssVar, fallback, unit]]) => {
    const raw = rootStyle.getPropertyValue(cssVar).trim();
    vals[k] = unit ? (parseFloat(raw) || fallback)
                   : (/^#[0-9a-f]{6}$/i.test(raw) ? raw.toLowerCase() : fallback);
  });
  Object.entries(CLASSES).forEach(([k, [sel, cls]]) => {
    vals[k] = !!document.querySelector(sel)?.classList.contains(cls);
  });

  FIELDS.forEach(([group, rows]) => rows.forEach(([k]) => {
    if (!(k in VARS) && !(k in CLASSES)) console.error(`[regiony-dev] "${k}" (${group}) is not in VARS — control will do nothing`);
  }));

  const inputs = {};       // key -> sync(), which shows the value in its row
  const get = k => vals[k];
  const allKeys = () => FIELDS.flatMap(([, rows]) => rows.map(([k]) => k));
  const known = k => k in VARS || k in CLASSES;
  function set(k, v) {
    vals[k] = v;
    if (k in CLASSES) {
      document.querySelectorAll(CLASSES[k][0]).forEach(el => el.classList.toggle(CLASSES[k][1], !!v));
      return;
    }
    document.documentElement.style.setProperty(VARS[k][0], v + VARS[k][2]);
    if (!VARS[k][2] && window.REGIONY_REDRAW) window.REGIONY_REDRAW();
  }

  // Only knobs actually touched are remembered. Saving all of them meant one
  // slider drag froze the entire set, so every value later committed as a new
  // default stayed invisible behind a stale stored copy of the old one.
  const touched = new Set();

  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || "{}");
    Object.entries(saved).forEach(([k, v]) => {
      if (known(k)) { set(k, v); touched.add(k); }
    });
  } catch (e) { /* ignore a corrupted/blocked store */ }

  const save = () => {
    const out = {};
    allKeys().forEach(k => { if (touched.has(k)) out[k] = get(k); });
    try { localStorage.setItem(STORE, JSON.stringify(out)); } catch (e) { /* ignore */ }
  };

  // ── Saved views ───────────────────────────────────────────────────────────
  const VIEWS_STORE = "regiony-dev-views";
  const loadViews = () => {
    try { return JSON.parse(localStorage.getItem(VIEWS_STORE) || "{}"); }
    catch (e) { return {}; }
  };
  const storeViews = v => {
    try { localStorage.setItem(VIEWS_STORE, JSON.stringify(v)); } catch (e) { /* ignore */ }
  };
  let views = loadViews();
  let recent = [];   // last two view names applied, for the A/B flip

  const snapshot = () => Object.fromEntries(allKeys().map(k => [k, get(k)]));

  function applyView(name) {
    const v = views[name];
    if (!v) return;
    Object.entries(v).forEach(([k, val]) => {
      if (known(k)) { touched.add(k); set(k, val); }
    });
    Object.values(inputs).forEach(sync => sync());
    recent = [name, ...recent.filter(n => n !== name)].slice(0, 2);
    renderViews();
    save();
  }

  function flip() {
    const names = recent.length >= 2 ? recent : Object.keys(views).slice(0, 2);
    if (names.length < 2) { alert("Ulož aspoň dva pohledy."); return; }
    applyView(names[0] === recent[0] ? names[1] : names[0]);
  }

  // ── Panel ─────────────────────────────────────────────────────────────────
  const css = `
  #rg-dev { position: fixed; top: 80px; right: 16px; width: 280px; z-index: 2000;
    max-height: calc(100vh - 100px); overflow-y: auto;
    background: #fff; border: 1px solid #cbd5e0; border-radius: 8px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.18); font: 12px/1.4 system-ui, sans-serif;
    color: #2d3748; }
  #rg-dev.collapsed .rg-dev-body { display: none; }
  #rg-dev-head { display: flex; align-items: center; justify-content: space-between;
    padding: 8px 10px; background: #2d3748; color: #fff; border-radius: 7px 7px 0 0;
    cursor: move; font-weight: 600; user-select: none; }
  #rg-dev-head button { background: none; border: none; color: #fff; font-size: 14px;
    cursor: pointer; padding: 0 4px; }
  .rg-dev-body { padding: 8px 10px 10px; }
  .rg-dev-group { font-weight: 700; text-transform: uppercase; letter-spacing: .04em;
    font-size: 10px; color: #718096; margin: 12px 0 4px;
    border-top: 1px solid #edf2f7; padding-top: 8px;
    cursor: pointer; user-select: none; display: flex; gap: 5px; align-items: center; }
  .rg-dev-group:hover { color: #2d3748; }
  .rg-dev-group:first-child { border-top: none; margin-top: 0; padding-top: 0; }
  .rg-dev-caret { display: inline-block; width: 8px; transition: transform .12s; }
  .rg-dev-group.collapsed .rg-dev-caret { transform: rotate(-90deg); }
  .rg-dev-row { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
  .rg-dev-row label { flex: 1 1 auto; margin: 0; }
  .rg-dev-row input[type=range] { flex: 0 0 76px; width: 76px; min-width: 0; }
  .rg-dev-row input[type=checkbox] { flex: 0 0 auto; margin: 0; }
  .rg-dev-row input[type=color] { flex: 0 0 34px; width: 34px; height: 22px; padding: 0;
    border: 1px solid #cbd5e0; background: none; }
  .rg-dev-row input.rg-dev-num { flex: 0 0 52px; width: 52px; padding: 1px 3px;
    border: 1px solid #cbd5e0; border-radius: 3px; font: inherit; text-align: right;
    font-variant-numeric: tabular-nums; color: #2d3748; }
  .rg-dev-row input.rg-dev-hex { flex: 0 0 64px; width: 64px; padding: 1px 3px;
    border: 1px solid #cbd5e0; border-radius: 3px; font: inherit;
    font-variant-numeric: tabular-nums; color: #2d3748; }
  .rg-dev-view { display: flex; align-items: center; gap: 6px; padding: 3px 6px;
    border-radius: 4px; cursor: pointer; }
  .rg-dev-view:hover { background: #edf2f7; }
  .rg-dev-view.active { background: #2d3748; color: #fff; }
  .rg-dev-view-name { flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis;
    white-space: nowrap; }
  .rg-dev-view-del { background: none; border: none; color: inherit; opacity: .5;
    cursor: pointer; font-size: 13px; line-height: 1; padding: 0 2px; }
  .rg-dev-view-del:hover { opacity: 1; }
  .rg-dev-empty { color: #a0aec0; font-style: italic; padding: 2px 6px; }
  .rg-dev-actions { display: flex; gap: 6px; margin-top: 12px; }
  .rg-dev-actions button { flex: 1; padding: 5px; font-size: 11px; cursor: pointer;
    border: 1px solid #cbd5e0; border-radius: 4px; background: #f7fafc; }
  `;
  document.head.appendChild(document.createElement("style")).textContent = css;

  const panel = document.createElement("div");
  panel.id = "rg-dev";
  panel.innerHTML = `<div id="rg-dev-head"><span>Ladění boxů</span>
      <button type="button" id="rg-dev-toggle" title="Sbalit">–</button></div>
    <div class="rg-dev-body"></div>`;
  const body = panel.querySelector(".rg-dev-body");

  body.insertAdjacentHTML("beforeend", `<div class="rg-dev-group">Pohledy</div>
    <div id="rg-dev-views"></div>
    <div class="rg-dev-actions">
      <button type="button" id="rg-dev-save-view">+ Uložit pohled</button>
      <button type="button" id="rg-dev-flip" title="klávesa: mezerník">⇄ Blikat A/B</button>
    </div>`);

  const COLLAPSE_STORE = "regiony-dev-collapsed";
  let collapsed;
  try { collapsed = new Set(JSON.parse(localStorage.getItem(COLLAPSE_STORE) || "[]")); }
  catch (e) { collapsed = new Set(); }

  FIELDS.forEach(([group, rows]) => {
    const head = document.createElement("div");
    head.className = "rg-dev-group" + (collapsed.has(group) ? " collapsed" : "");
    head.innerHTML = `<span class="rg-dev-caret">▾</span><span>${group}</span>`;
    const box = document.createElement("div");
    box.hidden = collapsed.has(group);
    head.addEventListener("click", () => {
      const isCollapsed = !box.hidden;
      box.hidden = isCollapsed;
      head.classList.toggle("collapsed", isCollapsed);
      if (isCollapsed) collapsed.add(group); else collapsed.delete(group);
      try { localStorage.setItem(COLLAPSE_STORE, JSON.stringify([...collapsed])); }
      catch (e) { /* ignore */ }
    });
    body.appendChild(head);
    body.appendChild(box);

    rows.forEach(([key, label, type, min, max, step]) => {
      const row = document.createElement("div");
      row.className = "rg-dev-row";
      row.innerHTML = `<label>${label}</label>` + (
        type === "range"
          ? `<input type="range" min="${min}" max="${max}" step="${step}">
             <input type="number" class="rg-dev-num" step="${step}">`
        : type === "color"
          ? `<input type="color">
             <input type="text" class="rg-dev-hex" maxlength="7" spellcheck="false" aria-label="${label} (hex)">`
          : `<input type="checkbox">`);
      const [input, out] = row.querySelectorAll("input");
      const sync = () => {
        if (type === "checkbox") input.checked = !!get(key); else input.value = get(key);
        if (out) out.value = get(key);
      };
      sync();
      inputs[key] = sync;
      const push = val => { touched.add(key); set(key, val); save(); };
      input.addEventListener("input", () => {
        push(type === "range" ? parseFloat(input.value)
           : type === "checkbox" ? input.checked
           : input.value);
        sync();
      });
      // A hex box takes "#rrggbb" or "rrggbb"; anything else is still being typed.
      const parse = text => {
        const t = text.trim();
        if (type === "color") return /^#?[0-9a-f]{6}$/i.test(t) ? "#" + t.replace("#", "").toLowerCase() : null;
        return Number.isFinite(parseFloat(t)) ? parseFloat(t) : null;
      };
      if (out) out.addEventListener("input", () => {
        const val = parse(out.value);
        if (val === null) return;   // mid-typing "-", "" or a partial hex
        push(val);
        input.value = val;          // slider clamps itself to its range; the swatch follows
      });
      box.appendChild(row);
    });
  });

  body.insertAdjacentHTML("beforeend", `<div class="rg-dev-actions">
      <button type="button" id="rg-dev-copy">Kopírovat</button>
      <button type="button" id="rg-dev-reset">Výchozí</button>
    </div>`);
  document.body.appendChild(panel);

  panel.querySelector("#rg-dev-toggle").addEventListener("click", () => {
    panel.classList.toggle("collapsed");
    panel.querySelector("#rg-dev-toggle").textContent =
      panel.classList.contains("collapsed") ? "+" : "–";
  });

  // Drag by the header, so the panel can be moved off whatever it covers.
  const head = panel.querySelector("#rg-dev-head");
  head.addEventListener("mousedown", e => {
    if (e.target.tagName === "BUTTON") return;
    const r = panel.getBoundingClientRect();
    const dx = e.clientX - r.left, dy = e.clientY - r.top;
    const move = ev => {
      panel.style.left = (ev.clientX - dx) + "px";
      panel.style.top = (ev.clientY - dy) + "px";
      panel.style.right = "auto";
    };
    const up = () => { document.removeEventListener("mousemove", move);
                       document.removeEventListener("mouseup", up); };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    e.preventDefault();
  });

  function renderViews() {
    const box = document.getElementById("rg-dev-views");
    if (!box) return;
    const names = Object.keys(views);
    box.innerHTML = "";
    if (!names.length) {
      box.innerHTML = `<div class="rg-dev-empty">Zatím žádné pohledy.</div>`;
      return;
    }
    names.forEach(n => {
      const row = document.createElement("div");
      row.className = "rg-dev-view" + (recent[0] === n ? " active" : "");
      row.innerHTML = `<span class="rg-dev-view-name" title="Použít">${n}</span>
        <button type="button" class="rg-dev-view-del" title="Smazat">×</button>`;
      row.querySelector(".rg-dev-view-name").addEventListener("click", () => applyView(n));
      row.querySelector(".rg-dev-view-del").addEventListener("click", e => {
        e.stopPropagation();
        delete views[n];
        recent = recent.filter(r => r !== n);
        storeViews(views);
        renderViews();
      });
      box.appendChild(row);
    });
  }

  panel.querySelector("#rg-dev-save-view").addEventListener("click", () => {
    const name = prompt("Název pohledu:", "varianta " + (Object.keys(views).length + 1));
    if (!name) return;
    views[name] = snapshot();
    storeViews(views);
    recent = [name, ...recent.filter(n => n !== name)].slice(0, 2);
    renderViews();
  });

  panel.querySelector("#rg-dev-flip").addEventListener("click", flip);

  // Spacebar flips — the fastest way to spot a small difference.
  document.addEventListener("keydown", e => {
    if (e.code !== "Space" || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" ||
              t.tagName === "BUTTON" || t.isContentEditable)) return;
    e.preventDefault();
    flip();
  });

  renderViews();

  // Paste-ready :root block for _chart-panel.scss.
  panel.querySelector("#rg-dev-copy").addEventListener("click", () => {
    const text = ":root {\n" + Object.entries(VARS)
      .map(([k, [cssVar, , unit]]) => `    ${cssVar}: ${vals[k]}${unit};`).join("\n") + "\n}\n" +
      Object.entries(CLASSES)
        .map(([k, [sel, cls]]) => `/* ${sel}: ${vals[k] ? "add" : "no"} class ${cls} in the page markup */\n`).join("");
    navigator.clipboard.writeText(text)
      .then(() => alert("Zkopírováno do schránky:\n\n" + text))
      .catch(() => prompt("Zkopírujte ručně:", text));
  });

  panel.querySelector("#rg-dev-reset").addEventListener("click", () => {
    try { localStorage.removeItem(STORE); } catch (e) { /* ignore */ }
    location.reload();
  });
})();
