/* TEMPORARY chart-tuning sidebar for the ETS dashboard.
 *
 * Only runs with ?dev=1 in the URL, so it can never reach a normal visitor.
 * Mutates window.ETS_CFG (defined in ets-dashboard.js) and redraws the live
 * charts — there is no second sandbox copy to keep in sync. Settings survive a
 * page reload via localStorage. When the look is final, hit "Kopírovat" and
 * paste the snippet over the CFG block in ets-dashboard.js + the :root block
 * in the page, then delete this file and its <script> tag.
 */
(function () {
  if (!new URLSearchParams(location.search).has("dev")) return;
  const CFG = window.ETS_CFG;
  if (!CFG) return;

  const STORE = "ets-dev-cfg";
  // Colours the HTML legend swatches read, so they follow the charts.
  const CSS_VARS = {
    colorEmissions: "--ets-emissions",
    colorUncovered: "--ets-uncovered",
    colorAlloc: "--ets-alloc",
    colorLine: "--ets-line",
    hatchColor: "--ets-hatch",
  };
  // Sizes that live in CSS (px) rather than in CFG — one per chart.
  // Chart 2's height is derived in JS from its row count (rows are as thick
  // as chart 1's bars), so only chart 1's height is settable here.
  const CSS_LEN = {
    timelineHeight: "--ets-timeline-height",
  };
  const lens = {};
  const rootStyle = getComputedStyle(document.documentElement);
  Object.entries(CSS_LEN).forEach(([k, v]) => {
    lens[k] = parseInt(rootStyle.getPropertyValue(v)) || 340;
  });

  // Colours, hatch and typography are deliberately shared by both charts —
  // only geometry is split, since that is what differs per chart.
  const FIELDS = [
    ["Barvy (společné)", [
      ["colorEmissions", "Emise (celý sloupec)", "color"],
      ["colorUncovered", "Emise nepokryté", "color"],
      ["colorLine", "Čára alokace", "color"],
      ["haloColor", "Odsazení pod čárou", "color"],
      ["colorAlloc", "Pozadí šrafování", "color"],
      ["axisTextColor", "Text os", "color"],
      ["gridColor", "Mřížka", "color"],
    ]],
    ["Graf 1 — emise a povolenky v čase", [
      ["allocStepped", "Povolenky jako schodovitý graf", "checkbox"],
      ["barPadding", "Mezera mezi roky (řídí i tloušťku v grafu 2)", "range", 0, 0.8, 0.01],
      ["lineWidth", "Tloušťka čáry alokace", "range", 0, 8, 0.5],
      ["tickCount", "Počet dílků na ose", "range", 2, 12, 1],
      ["timelineHeight", "Výška grafu (px)", "range", 200, 700, 10],
    ]],
    ["Graf 2 — pokrytí podle odvětví", [
      ["barPaddingActivity", "Mezera mezi odvětvími", "range", 0, 0.8, 0.01],
      ["lineWidthActivity", "Tloušťka čáry alokace", "range", 0, 8, 0.5],
      ["tickCountActivity", "Počet dílků na ose", "range", 2, 12, 1],
      ["minBarActivity", "Min. tloušťka řádku (px)", "range", 0, 60, 1],
    ]],
    ["Čára alokace (společné)", [
      ["haloWidth", "Šířka odsazení (0 = vypnuto)", "range", 0, 6, 0.25],
    ]],
    ["Šrafování (společné)", [
      ["showSurplus", "Zobrazit alokaci navíc", "checkbox"],
      ["hatchAngle", "Úhel", "range", 0, 180, 5],
      ["hatchSize", "Rozteč", "range", 2, 20, 1],
      ["hatchStroke", "Tloušťka čáry", "range", 0.5, 6, 0.25],
      ["hatchOpacity", "Průhlednost", "range", 0, 1, 0.05],
      ["hatchColor", "Barva", "color"],
    ]],
    ["Typografie (společné)", [
      ["axisFontSize", "Popisky os", "range", 8, 22, 0.5],
      ["axisLabelFontSize", "Názvy odvětví", "range", 8, 24, 0.5],
      ["valueFontSize", "Hodnoty v grafu", "range", 8, 22, 0.5],
    ]],
  ];

  // A key that is neither in CFG nor a CSS length would silently tune
  // nothing — say so loudly instead.
  FIELDS.forEach(([group, rows]) => rows.forEach(([k]) => {
    if (!(k in CSS_LEN) && !(k in CFG))
      console.error(`[ets-dev] "${k}" (${group}) is not in ETS_CFG — control will do nothing`);
  }));

  const inputs = {};       // key -> {input, out, type}, filled while building
  const get = k => (k in CSS_LEN ? lens[k] : CFG[k]);
  const allKeys = () => FIELDS.flatMap(([, rows]) => rows.map(([k]) => k));
  function set(k, v) {
    if (k in CSS_LEN) {
      lens[k] = v;
      document.documentElement.style.setProperty(CSS_LEN[k], v + "px");
      return;
    }
    CFG[k] = v;
    if (CSS_VARS[k]) document.documentElement.style.setProperty(CSS_VARS[k], v);
    if (k === "showSurplus")
      document.querySelectorAll(".legend-surplus").forEach(el => { el.hidden = !v; });
  }

  // Restore a previous session before building the inputs, so they show it.
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || "{}");
    Object.entries(saved).forEach(([k, v]) => {
      if (k in CSS_LEN || k in CFG) set(k, v);
    });
  } catch (e) { /* ignore a corrupted/blocked store */ }

  const save = () => {
    const out = {};
    FIELDS.forEach(([, rows]) => rows.forEach(([k]) => { out[k] = get(k); }));
    try { localStorage.setItem(STORE, JSON.stringify(out)); } catch (e) { /* ignore */ }
  };

  const apply = () => { save(); window.ETS_REDRAW(); };

  // ── Saved views ───────────────────────────────────────────────────────────
  // A view is just a snapshot of every knob. Applying one pushes the values
  // into CFG/CSS *and* back into the controls, then redraws — so switching is
  // one click and the panel keeps telling the truth about what is on screen.
  const VIEWS_STORE = "ets-dev-views";
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
    Object.entries(v).forEach(([k, val]) => { if (k in CSS_LEN || k in CFG) set(k, val); });
    // Push the new values back into the controls.
    Object.entries(inputs).forEach(([k, { input, out, type }]) => {
      const val = get(k);
      if (type === "checkbox") input.checked = !!val; else input.value = val;
      if (out) out.textContent = val;
    });
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
  #ets-dev { position: fixed; top: 80px; right: 16px; width: 280px; z-index: 2000;
    max-height: calc(100vh - 100px); overflow-y: auto;
    background: #fff; border: 1px solid #cbd5e0; border-radius: 8px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.18); font: 12px/1.4 system-ui, sans-serif;
    color: #2d3748; }
  #ets-dev.collapsed .ets-dev-body { display: none; }
  #ets-dev-head { display: flex; align-items: center; justify-content: space-between;
    padding: 8px 10px; background: #2d3748; color: #fff; border-radius: 7px 7px 0 0;
    cursor: move; font-weight: 600; user-select: none; }
  #ets-dev-head button { background: none; border: none; color: #fff; font-size: 14px;
    cursor: pointer; padding: 0 4px; }
  .ets-dev-body { padding: 8px 10px 10px; }
  .ets-dev-group { font-weight: 700; text-transform: uppercase; letter-spacing: .04em;
    font-size: 10px; color: #718096; margin: 12px 0 4px;
    border-top: 1px solid #edf2f7; padding-top: 8px; }
  .ets-dev-group:first-child { border-top: none; margin-top: 0; padding-top: 0; }
  .ets-dev-row { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
  .ets-dev-row label { flex: 1 1 auto; }
  .ets-dev-row input[type=range] { flex: 0 0 90px; width: 90px; }
  .ets-dev-row input[type=color] { flex: 0 0 34px; width: 34px; height: 22px; padding: 0;
    border: 1px solid #cbd5e0; background: none; }
  .ets-dev-row input[type=checkbox] { flex: 0 0 auto; margin: 0; }
  .ets-dev-row output { flex: 0 0 34px; text-align: right; font-variant-numeric: tabular-nums;
    color: #718096; }
  .ets-dev-view { display: flex; align-items: center; gap: 6px; padding: 3px 6px;
    border-radius: 4px; cursor: pointer; }
  .ets-dev-view:hover { background: #edf2f7; }
  .ets-dev-view.active { background: #2d3748; color: #fff; }
  .ets-dev-view-name { flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis;
    white-space: nowrap; }
  .ets-dev-view-del { background: none; border: none; color: inherit; opacity: .5;
    cursor: pointer; font-size: 13px; line-height: 1; padding: 0 2px; }
  .ets-dev-view-del:hover { opacity: 1; }
  .ets-dev-empty { color: #a0aec0; font-style: italic; padding: 2px 6px; }
  .ets-dev-actions { display: flex; gap: 6px; margin-top: 12px; }
  .ets-dev-actions button { flex: 1; padding: 5px; font-size: 11px; cursor: pointer;
    border: 1px solid #cbd5e0; border-radius: 4px; background: #f7fafc; }
  `;
  document.head.appendChild(document.createElement("style")).textContent = css;

  const panel = document.createElement("div");
  panel.id = "ets-dev";
  panel.innerHTML = `<div id="ets-dev-head"><span>Ladění grafů</span>
      <button type="button" id="ets-dev-toggle" title="Sbalit">–</button></div>
    <div class="ets-dev-body"></div>`;
  const body = panel.querySelector(".ets-dev-body");

  // Views sit at the top — while comparing, this is the block you reach for.
  body.insertAdjacentHTML("beforeend", `<div class="ets-dev-group">Pohledy</div>
    <div id="ets-dev-views"></div>
    <div class="ets-dev-actions">
      <button type="button" id="ets-dev-save-view">+ Uložit pohled</button>
      <button type="button" id="ets-dev-flip" title="klávesa: mezerník">⇄ Blikat A/B</button>
    </div>`);

  FIELDS.forEach(([group, rows]) => {
    body.insertAdjacentHTML("beforeend", `<div class="ets-dev-group">${group}</div>`);
    rows.forEach(([key, label, type, min, max, step]) => {
      const row = document.createElement("div");
      row.className = "ets-dev-row";
      const v = get(key);
      const attrs = type === "range" ? `min="${min}" max="${max}" step="${step}" value="${v}"`
                  : type === "checkbox" ? (v ? "checked" : "")
                  : `value="${v}"`;
      row.innerHTML = `<label>${label}</label>
        <input type="${type}" ${attrs}>
        ${type === "range" ? `<output>${v}</output>` : ""}`;
      const input = row.querySelector("input");
      const out = row.querySelector("output");
      inputs[key] = { input, out, type };
      input.addEventListener("input", () => {
        const val = type === "range" ? parseFloat(input.value)
                  : type === "checkbox" ? input.checked
                  : input.value;
        set(key, val);
        if (out) out.textContent = val;
        apply();
      });
      body.appendChild(row);
    });
  });

  body.insertAdjacentHTML("beforeend", `<div class="ets-dev-actions">
      <button type="button" id="ets-dev-copy">Kopírovat</button>
      <button type="button" id="ets-dev-reset">Výchozí</button>
    </div>`);
  document.body.appendChild(panel);

  // Collapse.
  panel.querySelector("#ets-dev-toggle").addEventListener("click", () => {
    panel.classList.toggle("collapsed");
    panel.querySelector("#ets-dev-toggle").textContent =
      panel.classList.contains("collapsed") ? "+" : "–";
  });

  // Drag by the header, so the panel can be moved off whatever it covers.
  const head = panel.querySelector("#ets-dev-head");
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
    const box = document.getElementById("ets-dev-views");
    if (!box) return;
    const names = Object.keys(views);
    box.innerHTML = "";
    if (!names.length) {
      box.innerHTML = `<div class="ets-dev-empty">Zatím žádné pohledy.</div>`;
      return;
    }
    names.forEach(n => {
      const row = document.createElement("div");
      row.className = "ets-dev-view" + (recent[0] === n ? " active" : "");
      row.innerHTML = `<span class="ets-dev-view-name" title="Použít">${n}</span>
        <button type="button" class="ets-dev-view-del" title="Smazat">×</button>`;
      row.querySelector(".ets-dev-view-name").addEventListener("click", () => applyView(n));
      row.querySelector(".ets-dev-view-del").addEventListener("click", e => {
        e.stopPropagation();
        delete views[n];
        recent = recent.filter(r => r !== n);
        storeViews(views);
        renderViews();
      });
      box.appendChild(row);
    });
  }

  panel.querySelector("#ets-dev-save-view").addEventListener("click", () => {
    const name = prompt("Název pohledu:", "varianta " + (Object.keys(views).length + 1));
    if (!name) return;
    views[name] = snapshot();
    storeViews(views);
    recent = [name, ...recent.filter(n => n !== name)].slice(0, 2);
    renderViews();
  });

  panel.querySelector("#ets-dev-flip").addEventListener("click", flip);

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

  // Paste-ready snippet: the CFG block for the JS + the :root block for the page.
  panel.querySelector("#ets-dev-copy").addEventListener("click", () => {
    const cfgLines = Object.keys(CFG)
      .map(k => `    ${k}: ${typeof CFG[k] === "string" ? `"${CFG[k]}"` : CFG[k]},`)
      .join("\n");
    const text =
      `// ets-dashboard.js\n  const CFG = {\n${cfgLines}\n  };\n\n` +
      `/* page <style> */\n:root {\n` +
      `  --ets-emissions: ${CFG.colorEmissions};\n` +
      `  --ets-uncovered: ${CFG.colorUncovered};\n` +
      `  --ets-alloc: ${CFG.colorAlloc};\n` +
      `  --ets-hatch: ${CFG.hatchColor};\n` +
      `  --ets-line: ${CFG.colorLine};\n` +
      `  --ets-timeline-height: ${lens.timelineHeight}px;\n}\n`;
    navigator.clipboard.writeText(text)
      .then(() => alert("Zkopírováno do schránky:\n\n" + text))
      .catch(() => prompt("Zkopírujte ručně:", text));
  });

  panel.querySelector("#ets-dev-reset").addEventListener("click", () => {
    try { localStorage.removeItem(STORE); } catch (e) { /* ignore */ }
    location.reload();
  });
})();
