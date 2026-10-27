/* TEMPORARY tuning sidebar for the explainer klimaticka-politika-svetove-regiony,
 * built from the ETS dashboard one (ETS-ladici-sidebar.md).
 *
 * Only runs with ?dev=1 in the URL, so it can never reach a normal visitor.
 * Every knob is a CSS variable on :root (defaults in assets-local/_chart-panel.scss).
 * The region and electricity-mix colours are shared with the charts (grafy.js reads them at draw
 * time), so a colour change also calls window.REGIONY_REDRAW. Settings survive
 * a reload via localStorage. When the look is final, hit "Kopírovat" and paste the :root block over the one in
 * _chart-panel.scss, then delete this file and its extra-scripts line.
 */
(function () {
  if (!new URLSearchParams(location.search).has("dev")) return;

  const STORE = "regiony-dev-cfg";
  // key -> [CSS variable, fallback, unit, redraw]; unit "" means a colour.
  // Colours and knobs marked redraw are read by the charts, which then redraw.
  const VARS = {
    colorEU: ["--region-eu", "#36369b", ""],
    colorCina: ["--region-cina", "#e0495a", ""],
    colorUSA: ["--region-usa", "#3b85d8", ""],
    colorIndie: ["--region-indie", "#8546af", ""],
    mixCoal: ["--mix-coal", "#914b64", ""],
    mixFossil: ["--mix-fossil", "#e29292", ""],
    mixNuclear: ["--mix-nuclear", "#a7cad3", ""],
    mixOze: ["--mix-oze", "#008a94", ""],
    tint: ["--region-tint", 0, "%"],
    border: ["--region-border", 0, "px"],
    radius: ["--region-radius", 8, "px"],
    pad: ["--region-pad", 0, "px"],
    titleSize: ["--region-title-size", 22, "px"],
    textSize: ["--region-text-size", 1.1, "rem"],
    lineHeight: ["--region-line-height", 1.2, "em"],
    ruleWidth: ["--region-rule", 2.5, "px"],
    ruleGap: ["--region-rule-gap", 6, "px"],
    ruleLength: ["--region-rule-length", 24, "px"],
    timelineGap: ["--timeline-label-gap", 9, "px", true],
    stickyTop: ["--sticky-top", 72, "px"],
  };
  // key -> [selector, class]: checkboxes that toggle a class, not a variable.
  const CLASSES = {
    sticky: ["body", "rg-sticky"],
    stickyBox: ["body", "rg-sticky-box"],
    stickyMini: ["body", "rg-sticky-mini"],
    squaresRegion: ["body", "rg-squares-region"],
  };
  // key -> [selector, { class: label }]: a dropdown putting one of the classes
  // ("" = none) on what the selector matches.
  const SELECTS = {
    dotStyle: ["body", { "": "Plné s bílým okrajem", "rg-dot-ring": "Kroužek", "rg-dot-tick": "Svislá čárka",
                         "rg-dot-diamond": "Kosočtverec" }],
  };

  const FIELDS = [
    ["Barvy regionů", [
      ["colorEU", "EU", "color"],
      ["colorCina", "Čína", "color"],
      ["colorUSA", "USA", "color"],
      ["colorIndie", "Indie", "color"],
    ]],
    ["Mix výroby elektřiny", [
      ["mixCoal", "Uhlí", "color"],
      ["mixFossil", "Plyn a ostatní fosilní", "color"],
      ["mixNuclear", "Jádro", "color"],
      ["mixOze", "Obnovitelné zdroje", "color"],
    ]],
    ["Boxy", [
      ["tint", "Podbarvení (%)", "range", 0, 30, 1],
      ["border", "Rámeček (px, 0 = vypnuto)", "range", 0, 6, 0.5],
      ["radius", "Zaoblení rohů (px)", "range", 0, 32, 1],
      ["pad", "Vnitřní odsazení (px)", "range", 0, 48, 1],
    ]],
    ["Nadpis", [
      ["titleSize", "Velikost nadpisu (px)", "range", 14, 40, 1],
      ["ruleWidth", "Linka: tloušťka (px)", "range", 1, 12, 0.5],
      ["ruleGap", "Linka: odsazení (px)", "range", 0, 32, 1],
      ["ruleLength", "Linka: délka u EU (px, ostatní podle emisí)", "range", 4, 120, 1],
    ]],
    ["Emise podle sektorů (čtverečky)", [
      ["squaresRegion", "Čtverečky v barvě regionu, slábnoucí po sektorech", "checkbox"],
    ]],
    ["Přilepené grafy (emise, mix)", [
      ["sticky", "Přilepit nahoru při čtení sekce", "checkbox"],
      ["stickyBox", "V boxu", "checkbox"],
      ["stickyMini", "Při scrollu zmenšit na 1/3", "checkbox"],
      ["stickyTop", "Odsazení shora (px)", "range", 0, 160, 1],
    ]],
    ["Časová osa cílů", [
      ["timelineGap", "Odsazení popisků neutrality (px)", "range", 0, 30, 1],
      ["dotStyle", "Dílčí cíle (malé body)", "select"],
    ]],
    ["Hlavní charakteristiky", [
      ["textSize", "Velikost písma (rem)", "range", 0.7, 1.6, 0.05],
      ["lineHeight", "Řádkování (em)", "range", 1, 2.2, 0.05],
    ]],
  ];

  // Per chart (every .d3-panel on the page): space above and below, and the
  // "Zdroj … Stáhnout" line shown or not, right or left. A VARS entry with a
  // selector (5th item) sets its variable on those elements, not on :root.
  document.querySelectorAll(".d3-panel").forEach(p => {
    const id = p.id, sel = "#" + id;
    VARS[id + ":mt"] = ["--panel-mt", 24, "px", false, sel];
    VARS[id + ":mb"] = ["--panel-mb", 32, "px", false, sel];
    CLASSES[id + ":nofoot"] = [sel, "no-foot"];
    SELECTS[id + ":align"] = [sel, { "": "vpravo", "foot-left": "vlevo" }];
    const title = p.querySelector(".d3-title")?.textContent.trim();
    const untitled = { "graf-podil": "Podíl na emisích (čtverečky)", "graf-cile": "Časová osa cílů" };
    FIELDS.push(["Graf: " + (untitled[id] || (title ? title.slice(0, 32) : id)), [
      [id + ":mt", "Odsazení nad (px)", "range", 0, 96, 1],
      [id + ":mb", "Odsazení pod (px)", "range", 0, 96, 1],
      [id + ":nofoot", "Skrýt lištu Zdroj / Stáhnout", "checkbox"],
      [id + ":align", "Lišta zarovnaná", "select"],
    ]]);
  });

  const vals = {};
  Object.entries(VARS).forEach(([k, [cssVar, fallback, unit, , sel]]) => {
    const raw = getComputedStyle(sel ? document.querySelector(sel) : document.documentElement)
      .getPropertyValue(cssVar).trim();
    vals[k] = unit ? (Number.isFinite(parseFloat(raw)) ? parseFloat(raw) : fallback)
                   : (/^#[0-9a-f]{6}$/i.test(raw) ? raw.toLowerCase() : fallback);
  });
  Object.entries(CLASSES).forEach(([k, [sel, cls]]) => {
    vals[k] = !!document.querySelector(sel)?.classList.contains(cls);
  });
  Object.entries(SELECTS).forEach(([k, [sel, opts]]) => {
    const el = document.querySelector(sel);
    vals[k] = Object.keys(opts).find(c => c && el?.classList.contains(c)) || "";
  });

  FIELDS.forEach(([group, rows]) => rows.forEach(([k]) => {
    if (!(k in VARS) && !(k in CLASSES) && !(k in SELECTS)) console.error(`[regiony-dev] "${k}" (${group}) is not in VARS — control will do nothing`);
  }));

  const inputs = {};       // key -> sync(), which shows the value in its row
  const get = k => vals[k];
  const allKeys = () => FIELDS.flatMap(([, rows]) => rows.map(([k]) => k));
  const known = k => k in VARS || k in CLASSES || k in SELECTS;
  function set(k, v) {
    vals[k] = v;
    if (k in SELECTS) {
      const [sel, opts] = SELECTS[k];
      document.querySelectorAll(sel).forEach(el => {
        el.classList.remove(...Object.keys(opts).filter(Boolean));
        if (v) el.classList.add(v);
      });
      if (window.REGIONY_REDRAW) window.REGIONY_REDRAW();   // charts read some of these classes
      return;
    }
    if (k in CLASSES) {
      document.querySelectorAll(CLASSES[k][0]).forEach(el => el.classList.toggle(CLASSES[k][1], !!v));
      if (window.REGIONY_REDRAW) window.REGIONY_REDRAW();   // charts read some of these classes
      return;
    }
    const targets = VARS[k][4] ? document.querySelectorAll(VARS[k][4]) : [document.documentElement];
    targets.forEach(el => el.style.setProperty(VARS[k][0], v + VARS[k][2]));
    if ((!VARS[k][2] || VARS[k][3]) && window.REGIONY_REDRAW) window.REGIONY_REDRAW();
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
  .rg-dev-row select { flex: 0 0 130px; width: 130px; font: inherit; }
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

  // The per-chart groups start collapsed: for them the stored set lists the open ones.
  const perChart = g => g.startsWith("Graf: ");
  FIELDS.forEach(([group, rows]) => {
    const shut = perChart(group) !== collapsed.has(group);
    const head = document.createElement("div");
    head.className = "rg-dev-group" + (shut ? " collapsed" : "");
    head.innerHTML = `<span class="rg-dev-caret">▾</span><span>${group}</span>`;
    const box = document.createElement("div");
    box.hidden = shut;
    head.addEventListener("click", () => {
      const isCollapsed = !box.hidden;
      box.hidden = isCollapsed;
      head.classList.toggle("collapsed", isCollapsed);
      if (perChart(group) !== isCollapsed) collapsed.add(group); else collapsed.delete(group);
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
        : type === "select"
          ? `<select>${Object.entries(SELECTS[key][1]).map(([c, l]) => `<option value="${c}">${l}</option>`).join("")}</select>`
          : `<input type="checkbox">`);
      const [input, out] = row.querySelectorAll("input, select");
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
    const text = ":root {\n" + Object.entries(VARS).filter(([, v]) => !v[4])
      .map(([k, [cssVar, , unit]]) => `    ${cssVar}: ${vals[k]}${unit};`).join("\n") + "\n}\n" +
      Object.entries(VARS).filter(([, v]) => v[4])
        .map(([k, [cssVar, , unit, , sel]]) => `/* ${sel}: ${cssVar}: ${vals[k]}${unit} */\n`).join("") +
      Object.entries(CLASSES)
        .map(([k, [sel, cls]]) => `/* ${sel}: ${vals[k] ? "add" : "no"} class ${cls} in the page markup */\n`).join("") +
      Object.entries(SELECTS)
        .map(([k, [sel, opts]]) => `/* ${k}: ${opts[vals[k]]} (${sel}${vals[k] ? " class " + vals[k] : ", no class"}) */\n`).join("");
    navigator.clipboard.writeText(text)
      .then(() => alert("Zkopírováno do schránky:\n\n" + text))
      .catch(() => prompt("Zkopírujte ručně:", text));
  });

  // A sticky chart counts as stuck while its section runs under the top edge;
  // .is-stuck lets the CSS shrink it, --title-h moves it under its title.
  const stuckCheck = () => document.querySelectorAll(".sticky-scope > .d3-panel").forEach(p => {
    const top = parseFloat(getComputedStyle(p).top) || 0, scope = p.parentNode.getBoundingClientRect();
    const stuck = document.body.classList.contains("rg-sticky") && scope.top < top && scope.bottom > top + 40;
    p.classList.toggle("is-stuck", stuck);
    if (stuck) p.style.setProperty("--title-h", p.querySelector(".d3-title").offsetHeight + "px");
  });
  addEventListener("scroll", stuckCheck, { passive: true });

  panel.querySelector("#rg-dev-reset").addEventListener("click", () => {
    try { localStorage.removeItem(STORE); } catch (e) { /* ignore */ }
    location.reload();
  });
})();
