/* TEMPORARY chart-tuning sidebar for the dovoz fosilních paliv dashboard.
 *
 * Only runs with ?dev=1 in the URL, so it can never reach a normal visitor.
 * Mutates window.DOVOZ_CFG (defined in dovoz-fosilnich-paliv.js) and redraws
 * the live charts through window.DOVOZ_REDRAW. Settings survive a page reload
 * via localStorage. When the look is final, hit "Kopírovat" and paste the
 * snippet over the DOVOZ_CFG block in dovoz-fosilnich-paliv.js + the variables
 * in _dovoz-fosilnich-paliv.scss, then delete this file and its extra-scripts
 * line. Built from ~/Downloads/ETS-ladici-sidebar.md.
 */
(function () {
  if (!new URLSearchParams(location.search).has("dev")) return;
  const CFG = window.DOVOZ_CFG;
  if (!CFG) return;

  const STORE = "dovoz-dev-cfg";
  // Sizes that live in CSS (px) rather than in CFG. They are declared on
  // body.dovoz-fosilnich-paliv, so they are overridden on <body> too — set on
  // :root, the body's own declaration would win.
  const CSS_LEN = {
    gap: ["--dovoz-gap", 16],
    padY: ["--dovoz-pad-y", 16],
    padX: ["--dovoz-pad-x", 18],
    headingSize: ["--dovoz-heading-size", 24],
    chartTitleSize: ["--dovoz-chart-title-size", 18],
    kpiLabelSize: ["--dovoz-kpi-label-size", 13],
    kpiValueSize: ["--dovoz-kpi-value-size", 24],
    textSize: ["--dovoz-text-size", 14],
    noteSize: ["--dovoz-note-size", 13],
  };
  const lens = {};
  const bodyStyle = getComputedStyle(document.body);
  Object.entries(CSS_LEN).forEach(([k, [cssVar, fallback]]) => {
    lens[k] = parseFloat(bodyStyle.getPropertyValue(cssVar)) || fallback;
  });

  const FIELDS = [
    ["Paliva", [
      ["colorRopa", "Ropa", "color"],
      ["colorPlyn", "Zemní plyn", "color"],
      ["colorTotal", "Čára celkem / průměr podle zemí", "color"],
    ]],
    ["Ceny", [
      ["showBenchmarks", "Burzovní ceny (Brent, TTF)", "checkbox"],
      ["colorBenchmark", "Barva burzovní ceny", "color"],
      ["gasGCV", "Plyn ve spalném teple", "checkbox"],
    ]],
    ["Podíl na HDP", [
      ["gdpFirst", "Jako první KPI box", "checkbox"],
      ["showDefense", "Výdaje na obranu", "checkbox"],
      ["colorDefense", "Barva linky obrany", "color"],
      ["showMsmt", "Výdaje na školství (MŠMT)", "checkbox"],
      ["colorMsmt", "Barva linky MŠMT", "color"],
      ["showSfdi", "Výdaje na dopravu (SFDI)", "checkbox"],
      ["colorSfdi", "Barva linky SFDI", "color"],
    ]],
    ["Země původu", [
      ["rusko", "Rusko", "color"],
      ["azerbajdzan", "Ázerbájdžán", "color"],
      ["kazachstan", "Kazachstán", "color"],
      ["norsko", "Norsko", "color"],
      ["saudska_arabie", "Saúdská Arábie", "color"],
      ["usa", "USA", "color"],
      ["nemecko", "Německo", "color"],
      ["ostatni", "Ostatní", "color"],
    ]],
    ["Grafy", [
      ["chartHeight", "Výška grafů (px)", "range", 160, 480, 10],
      ["chartFraction", "Šířka grafů ve sloupci (podíl)", "range", 0.3, 1, 0.05],
      ["barPadding", "Mezera mezi sloupci", "range", 0, 0.8, 0.01],
      ["lineWidth", "Tloušťka čáry", "range", 0.5, 6, 0.5],
      ["areaOpacity", "Plocha malých grafů", "range", 0, 1, 0.05],
      ["exploreYMax", "Osa Y po měsících (PJ)", "range", 10, 100, 5],
      ["toolAspect", "Poměr stran velkého grafu (výška/šířka)", "range", 0.4, 1.2, 0.05],
      ["axisTextColor", "Text os a legendy", "color"],
      ["gridColor", "Mřížka", "color"],
    ]],
    ["Typografie grafů", [
      ["titleSize", "Nadpisy grafů (px)", "range", 10, 28, 0.5],
      ["axisSize", "Popisky os a legenda (px)", "range", 8, 20, 0.5],
    ]],
    ["Stránka", [
      ["fuelBoxed", "Sloupce jako boxy", "checkbox"],
      ["fuelBoxColored", "Rámeček v barvě paliva", "checkbox"],
      ["headingSize", "Nadpis paliva (px)", "range", 14, 40, 1],
      ["chartTitleSize", "Nadpis grafu (px)", "range", 12, 32, 1],
      ["kpiLabelSize", "KPI popisek (px)", "range", 8, 22, 0.5],
      ["kpiValueSize", "KPI číslo (px)", "range", 12, 48, 1],
      ["textSize", "Text pod grafy (px)", "range", 10, 20, 0.5],
      ["noteSize", "Poznámka pod grafem (px)", "range", 10, 20, 0.5],
      ["gap", "Mezera mezi panely (px)", "range", 0, 48, 2],
      ["padY", "Odsazení panelů nahoře/dole (px)", "range", 0, 40, 1],
      ["padX", "Odsazení panelů po stranách (px)", "range", 0, 40, 1],
    ]],
  ];

  // A key that is neither in CFG nor a CSS length would silently tune
  // nothing — say so loudly instead.
  FIELDS.forEach(([group, rows]) => rows.forEach(([k, , type]) => {
    if (!(k in CSS_LEN) && !(k in CFG))
      console.error(`[dovoz-dev] "${k}" (${group}) is not in DOVOZ_CFG — control will do nothing`);
    else if (type === "color" && !/^#[0-9a-f]{6}$/i.test(CFG[k]))
      console.error(`[dovoz-dev] "${k}" (${group}) must be #rrggbb — the picker and hex box read nothing else`);
  }));

  const inputs = {};       // key -> sync(), which shows the value in its row
  const get = k => (k in CSS_LEN ? lens[k] : CFG[k]);
  const allKeys = () => FIELDS.flatMap(([, rows]) => rows.map(([k]) => k));
  function set(k, v) {
    if (k in CSS_LEN) {
      lens[k] = v;
      document.body.style.setProperty(CSS_LEN[k][0], v + "px");
      return;
    }
    CFG[k] = v;
  }

  // Only knobs actually touched are remembered. Saving all of them meant one
  // slider drag froze the entire set, so every value later committed as a new
  // default stayed invisible behind a stale stored copy of the old one.
  const touched = new Set();

  // Restore a previous session before building the inputs, so they show it.
  // This runs before the data has loaded, so the first draw already uses it.
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || "{}");
    Object.entries(saved).forEach(([k, v]) => {
      if (k in CSS_LEN || k in CFG) { set(k, v); touched.add(k); }
    });
  } catch (e) { /* ignore a corrupted/blocked store */ }

  const save = () => {
    const out = {};
    allKeys().forEach(k => { if (touched.has(k)) out[k] = get(k); });
    try { localStorage.setItem(STORE, JSON.stringify(out)); } catch (e) { /* ignore */ }
  };

  // DOVOZ_REDRAW appears only once the CSVs have loaded.
  const apply = () => { save(); window.DOVOZ_REDRAW?.(); };

  // ── Saved views ───────────────────────────────────────────────────────────
  // A view is just a snapshot of every knob. Applying one pushes the values
  // into CFG/CSS *and* back into the controls, then redraws — so switching is
  // one click and the panel keeps telling the truth about what is on screen.
  const VIEWS_STORE = "dovoz-dev-views";
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
      if (k in CSS_LEN || k in CFG) { touched.add(k); set(k, val); }
    });
    // Push the new values back into the controls.
    Object.values(inputs).forEach(sync => sync());
    recent = [name, ...recent.filter(n => n !== name)].slice(0, 2);
    renderViews();
    apply();
  }

  function flip() {
    const names = recent.length >= 2 ? recent : Object.keys(views).slice(0, 2);
    if (names.length < 2) { alert("Ulož aspoň dva pohledy."); return; }
    applyView(names[0] === recent[0] ? names[1] : names[0]);
  }

  // ── Panel ─────────────────────────────────────────────────────────────────
  const css = `
  #dovoz-dev { position: fixed; top: 80px; right: 16px; width: 280px; z-index: 2000;
    max-height: calc(100vh - 100px); overflow-y: auto;
    background: #fff; border: 1px solid #cbd5e0; border-radius: 8px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.18); font: 12px/1.4 system-ui, sans-serif;
    color: #2d3748; }
  #dovoz-dev.collapsed .dovoz-dev-body { display: none; }
  #dovoz-dev-head { display: flex; align-items: center; justify-content: space-between;
    padding: 8px 10px; background: #2d3748; color: #fff; border-radius: 7px 7px 0 0;
    cursor: move; font-weight: 600; user-select: none; }
  #dovoz-dev-head button { background: none; border: none; color: #fff; font-size: 14px;
    cursor: pointer; padding: 0 4px; }
  .dovoz-dev-body { padding: 8px 10px 10px; }
  .dovoz-dev-group { font-weight: 700; text-transform: uppercase; letter-spacing: .04em;
    font-size: 10px; color: #718096; margin: 12px 0 4px;
    border-top: 1px solid #edf2f7; padding-top: 8px;
    cursor: pointer; user-select: none; display: flex; gap: 5px; align-items: center; }
  .dovoz-dev-group:hover { color: #2d3748; }
  .dovoz-dev-group:first-child { border-top: none; margin-top: 0; padding-top: 0; }
  .dovoz-dev-caret { display: inline-block; width: 8px; transition: transform .12s; }
  .dovoz-dev-group.collapsed .dovoz-dev-caret { transform: rotate(-90deg); }
  .dovoz-dev-row { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
  .dovoz-dev-row label { flex: 1 1 auto; }
  .dovoz-dev-row input[type=range] { flex: 0 0 76px; width: 76px; min-width: 0; }
  .dovoz-dev-row input[type=color] { flex: 0 0 34px; width: 34px; height: 22px; padding: 0;
    border: 1px solid #cbd5e0; background: none; }
  .dovoz-dev-row input[type=checkbox] { flex: 0 0 auto; margin: 0; }
  .dovoz-dev-row input.dovoz-dev-num { flex: 0 0 52px; width: 52px; padding: 1px 3px;
    border: 1px solid #cbd5e0; border-radius: 3px; font: inherit; text-align: right;
    font-variant-numeric: tabular-nums; color: #2d3748; }
  .dovoz-dev-row input.dovoz-dev-hex { flex: 0 0 64px; width: 64px; padding: 1px 3px;
    border: 1px solid #cbd5e0; border-radius: 3px; font: inherit;
    font-variant-numeric: tabular-nums; color: #2d3748; }
  .dovoz-dev-view { display: flex; align-items: center; gap: 6px; padding: 3px 6px;
    border-radius: 4px; cursor: pointer; }
  .dovoz-dev-view:hover { background: #edf2f7; }
  .dovoz-dev-view.active { background: #2d3748; color: #fff; }
  .dovoz-dev-view-name { flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis;
    white-space: nowrap; }
  .dovoz-dev-view-del { background: none; border: none; color: inherit; opacity: .5;
    cursor: pointer; font-size: 13px; line-height: 1; padding: 0 2px; }
  .dovoz-dev-view-del:hover { opacity: 1; }
  .dovoz-dev-empty { color: #a0aec0; font-style: italic; padding: 2px 6px; }
  .dovoz-dev-actions { display: flex; gap: 6px; margin-top: 12px; }
  .dovoz-dev-actions button { flex: 1; padding: 5px; font-size: 11px; cursor: pointer;
    border: 1px solid #cbd5e0; border-radius: 4px; background: #f7fafc; }
  `;
  document.head.appendChild(document.createElement("style")).textContent = css;

  const panel = document.createElement("div");
  panel.id = "dovoz-dev";
  panel.innerHTML = `<div id="dovoz-dev-head"><span>Ladění grafů</span>
      <button type="button" id="dovoz-dev-toggle" title="Sbalit">–</button></div>
    <div class="dovoz-dev-body"></div>`;
  const body = panel.querySelector(".dovoz-dev-body");

  // Views sit at the top — while comparing, this is the block you reach for.
  body.insertAdjacentHTML("beforeend", `<div class="dovoz-dev-group">Pohledy</div>
    <div id="dovoz-dev-views"></div>
    <div class="dovoz-dev-actions">
      <button type="button" id="dovoz-dev-save-view">+ Uložit pohled</button>
      <button type="button" id="dovoz-dev-flip" title="klávesa: mezerník">⇄ Blikat A/B</button>
    </div>`);

  // Collapsed groups are remembered, so a panel folded down to the section you
  // are working in stays that way across the reloads a tuning session involves.
  const COLLAPSE_STORE = "dovoz-dev-collapsed";
  let collapsed;
  try { collapsed = new Set(JSON.parse(localStorage.getItem(COLLAPSE_STORE) || "[]")); }
  catch (e) { collapsed = new Set(); }

  FIELDS.forEach(([group, rows]) => {
    const head = document.createElement("div");
    head.className = "dovoz-dev-group" + (collapsed.has(group) ? " collapsed" : "");
    head.innerHTML = `<span class="dovoz-dev-caret">▾</span><span>${group}</span>`;
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
      row.className = "dovoz-dev-row";
      // Ranges get a number box beside them: the slider is for feeling out a
      // value, the box for typing an exact one (and for going past the
      // slider's range when needed). Colours get a box with their hex code,
      // to read, copy or type over.
      row.innerHTML = `<label>${label}</label>` + (
        type === "range"
          ? `<input type="range" min="${min}" max="${max}" step="${step}">
             <input type="number" class="dovoz-dev-num" step="${step}">`
        : type === "color"
          ? `<input type="color">
             <input type="text" class="dovoz-dev-hex" maxlength="7" spellcheck="false" aria-label="${label} (hex)">`
        : `<input type="checkbox">`);
      const [input, out] = row.querySelectorAll("input");
      const sync = () => {
        const v = get(key);
        if (type === "checkbox") input.checked = !!v; else input.value = v;
        if (out) out.value = v;
      };
      sync();
      inputs[key] = sync;
      const push = val => { touched.add(key); set(key, val); apply(); };
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

  body.insertAdjacentHTML("beforeend", `<div class="dovoz-dev-actions">
      <button type="button" id="dovoz-dev-copy">Kopírovat</button>
      <button type="button" id="dovoz-dev-reset">Výchozí</button>
    </div>`);
  document.body.appendChild(panel);

  // Collapse.
  panel.querySelector("#dovoz-dev-toggle").addEventListener("click", () => {
    panel.classList.toggle("collapsed");
    panel.querySelector("#dovoz-dev-toggle").textContent =
      panel.classList.contains("collapsed") ? "+" : "–";
  });

  // Drag by the header, so the panel can be moved off whatever it covers.
  const head = panel.querySelector("#dovoz-dev-head");
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
    const box = document.getElementById("dovoz-dev-views");
    if (!box) return;
    const names = Object.keys(views);
    box.innerHTML = "";
    if (!names.length) {
      box.innerHTML = `<div class="dovoz-dev-empty">Zatím žádné pohledy.</div>`;
      return;
    }
    names.forEach(n => {
      const row = document.createElement("div");
      row.className = "dovoz-dev-view" + (recent[0] === n ? " active" : "");
      row.innerHTML = `<span class="dovoz-dev-view-name" title="Použít"></span>
        <button type="button" class="dovoz-dev-view-del" title="Smazat">×</button>`;
      row.querySelector(".dovoz-dev-view-name").textContent = n;
      row.querySelector(".dovoz-dev-view-name").addEventListener("click", () => applyView(n));
      row.querySelector(".dovoz-dev-view-del").addEventListener("click", e => {
        e.stopPropagation();
        delete views[n];
        recent = recent.filter(r => r !== n);
        storeViews(views);
        renderViews();
      });
      box.appendChild(row);
    });
  }

  panel.querySelector("#dovoz-dev-save-view").addEventListener("click", () => {
    const name = prompt("Název pohledu:", "varianta " + (Object.keys(views).length + 1));
    if (!name) return;
    views[name] = snapshot();
    storeViews(views);
    recent = [name, ...recent.filter(n => n !== name)].slice(0, 2);
    renderViews();
  });

  panel.querySelector("#dovoz-dev-flip").addEventListener("click", flip);

  // Spacebar flips — the fastest way to spot a small difference. Only while
  // focus is not in a control, and only on this ?dev=1 page.
  document.addEventListener("keydown", e => {
    if (e.code !== "Space" || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" ||
              t.tagName === "BUTTON" || t.isContentEditable)) return;
    e.preventDefault();   // stop the page scrolling instead
    flip();
  });

  renderViews();

  // Paste-ready snippet: the CFG block for the JS + the variables for the SCSS.
  panel.querySelector("#dovoz-dev-copy").addEventListener("click", () => {
    const cfgLines = Object.keys(CFG)
      .map(k => `  ${k}: ${typeof CFG[k] === "string" ? `'${CFG[k]}'` : CFG[k]},`)
      .join("\n");
    const cssLines = Object.entries(CSS_LEN)
      .map(([k, [cssVar]]) => `    ${cssVar}: ${lens[k]}px;`)
      .join("\n");
    const text =
      `// dovoz-fosilnich-paliv.js\nwindow.DOVOZ_CFG = {\n${cfgLines}\n};\n\n` +
      `/* _dovoz-fosilnich-paliv.scss, body.dovoz-fosilnich-paliv { … } */\n${cssLines}\n`;
    navigator.clipboard.writeText(text)
      .then(() => alert("Zkopírováno do schránky:\n\n" + text))
      .catch(() => prompt("Zkopírujte ručně:", text));
  });

  panel.querySelector("#dovoz-dev-reset").addEventListener("click", () => {
    try { localStorage.removeItem(STORE); } catch (e) { /* ignore */ }
    location.reload();
  });
})();
