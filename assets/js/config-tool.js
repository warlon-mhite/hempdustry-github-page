// Config builder for the "For servers and modpacks" section: every key of config/hempdustry.json with its
// default and range (copied from HempdustryConfig.java, the same on every loader and version; mildew is 26.x
// only), presets from the wiki's Server Guide, and a live file that holds only what differs from the defaults,
// since the mod fills the rest in itself. Without JavaScript the static "hemp only" card stays.
(function () {
  'use strict';
  const mount = document.querySelector('[data-cfg-tool]');
  if (!mount) return;

  const STEPS = [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10, 15, 20, 30, 50, 75, 100];
  const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  const MAX_TIME = 32000;
  const n = v => String(+v.toFixed(3));
  const times = (v, word) => v === 1 ? 'as shipped' : n(v) + '× ' + word;
  const clock = t => { const s = Math.round(t / 20); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') + ' min'; };

  const SECTIONS = [
    { id: 'effects', title: 'Effects', icon: 'indica_spliff', applies: '<code>/hempdustry reload</code> applies it at once.', keys: [
      { key: 'enabled', type: 'bool', def: true, name: 'Effects', help: 'The master switch. Off is hemp only: smoking and edibles give no effects. Green-outs have their own switch.' },
      { key: 'greenOut', type: 'bool', def: true, name: 'Green-outs', help: 'Smoking too much can green you out.' },
      { key: 'greenOutChanceMultiplier', type: 'mult', def: 1, min: 0, max: 100, name: 'Green-out chance', help: 'How likely a green-out is. A single bud never greens you out.', say: v => v === 0 ? 'never' : times(v, 'as likely') },
      { key: 'nausea', type: 'bool', def: true, name: 'Nausea', help: 'Off: the mod never applies Nausea, not even in a green-out. An accessibility switch.' },
      { key: 'munchies', type: 'bool', def: true, name: 'Munchies', help: 'Off: the mod never applies Hunger.' },
      { key: 'debuffs', type: 'bool', def: true, name: 'Debuffs', help: 'Off: no harmful effect at all, and so no green-outs, which are made of nothing else.' },
      { key: 'maxLevel', type: 'int', def: 4, min: 1, max: 10, name: 'Effect level cap', help: 'The highest level any effect can reach, the costs included. The PvP setting.', say: v => 'up to ' + ROMAN[v] },
      { key: 'maxBuffLevel', type: 'int', def: 2, min: 1, max: 10, name: 'Buff level cap', help: 'The highest level a helpful effect can reach. A bud with a concentrate goes one past it. Raise it for a kitchen-sink pack.', say: v => 'up to ' + ROMAN[v] },
      { key: 'durationMultiplier', type: 'mult', def: 1, min: 0.05, max: 10, name: 'Effect length', help: 'How long every effect lasts, smoking and edibles alike.', say: v => times(v, 'as long') },
      { key: 'cooldownMultiplier', type: 'mult', def: 1, min: 0, max: 10, name: 'Cooldowns', help: 'Every smokeable’s cooldown, and the minute a green-out locks you out of smoking.', say: v => v === 0 ? 'no cooldown' : times(v, 'as long') },
      { key: 'onsetMultiplier', type: 'mult', def: 1, min: 0.05, max: 10, name: 'Edible onset', help: 'How long an edible takes to kick in. At 0.5 a Perfect edible hits after about 45 seconds.', say: v => times(v, 'the wait') }
    ] },
    { id: 'world', title: 'World', icon: 'grow_pot', applies: '<code>/hempdustry reload</code> applies it at once.', keys: [
      { key: 'cropGrowthMultiplier', type: 'mult', def: 1, min: 0.05, max: 20, name: 'Crop growth', help: 'How fast all three strains grow, in fields, Grow Pots and Hydro Trays.', say: v => times(v, 'as fast') },
      { key: 'machineSpeedMultiplier', type: 'mult', def: 1, min: 0.05, max: 20, name: 'Machine speed', help: 'The Decarboxylator (25 s a tray) and the Hemp Press (10 s an item). The Infuser has its own clocks.', say: v => times(v, 'as fast') },
      { key: 'creepersSeekHemp', type: 'bool', def: true, name: 'Creepers in fields', help: 'Creepers now and then lurk in grown, open-sky hemp fields.' },
      { key: 'mildew', type: 'bool', def: true, only26: true, name: 'Powdery mildew', help: 'Hemp under a roof can catch it. Only on Minecraft 26.2 and 26.3.' }
    ] },
    { id: 'infuser', title: 'Infuser', icon: 'infuser_front', applies: '<code>/hempdustry reload</code> applies it at once, to batches already simmering too.', keys: [
      { key: 'minTimeTicks', type: 'ticks', def: 6000, min: 20, max: MAX_TIME - 20, name: 'Earliest take-out', help: 'The earliest a batch can come out. Hemp dissolves into it until then, up to 24.', say: clock },
      { key: 'fullTimeTicks', type: 'ticks', def: 18000, min: 40, max: MAX_TIME, name: 'Full simmer', help: 'What Perfect cannabutter needs. Always at least a second past the earliest take-out.', say: clock }
    ] },
    { id: 'loot', title: 'Loot', icon: 'industrial_hemp_seeds', applies: '<code>/hempdustry reload</code>, then <code>/reload</code>. Opened chests keep what they had.', keys: [
      { key: 'enabled', type: 'bool', def: true, name: 'Loot', help: 'Hemp seeds in grass and chests, Beldía in the desert, music discs in dungeons, hemp in shipwrecks.' },
      { key: 'chanceMultiplier', type: 'mult', def: 1, min: 0, max: 10, name: 'Loot chance', help: 'Scales every added chance, each still capped at 100%. 0 removes the chance-based ones.', say: v => v === 0 ? 'none by chance' : times(v, 'as likely') }
    ] },
    { id: 'client', title: 'Client', icon: 'bell', applies: 'Read from each player’s own file, so it belongs in a modpack’s config. A server ignores it.', keys: [
      { key: 'updateCheck', type: 'bool', def: true, name: 'Update notice', help: 'Says once in chat when a newer Hempdustry is out. Turn it off in a modpack, where the update can’t be taken.' },
      { key: 'biomeTintStrength', type: 'lin', def: 0.35, min: 0, max: 1, step: 0.05, name: 'Biome tint', help: 'How far Purple Kush and Lemon Haze take on the local grass colour.', say: v => v === 0 ? 'as painted' : v === 1 ? 'full grass tint' : Math.round(v * 100) + '% of the grass tint' },
      { key: 'ripeAroma', type: 'bool', def: true, name: 'Ripe aroma', help: 'The faint wisps that curl off a ripe plant.' }
    ] }
  ];
  // The order the mod writes the sections in (keys inside each are alphabetical).
  const FILE_ORDER = ['client', 'effects', 'world', 'infuser', 'loot'];

  const PRESETS = [
    { name: 'Hemp only', icon: 'hemp_fiber', set: { 'effects.enabled': false, 'effects.greenOut': false } },
    { name: 'No green-outs', icon: 'indica_buds', set: { 'effects.greenOut': false } },
    { name: 'No nausea', icon: 'hemp_milk_bucket', set: { 'effects.nausea': false } },
    { name: 'Fast farming', icon: 'grow_lamp', set: { 'world.cropGrowthMultiplier': 2, 'world.machineSpeedMultiplier': 2, 'infuser.minTimeTicks': 3000, 'infuser.fullTimeTicks': 9000 } },
    { name: 'No creepers in fields', icon: 'hemp_bale', set: { 'world.creepersSeekHemp': false } },
    { name: 'No loot', icon: 'industrial_hemp_seeds', set: { 'loot.enabled': false } },
    { name: 'For a modpack', icon: 'knowledge_book', set: { 'client.updateCheck': false } }
  ];

  const KEYS = {};
  SECTIONS.forEach(s => s.keys.forEach(k => { k.id = s.id + '.' + k.key; k.section = s.id; KEYS[k.id] = k; }));
  const state = {};
  const reset = () => Object.values(KEYS).forEach(k => { state[k.id] = k.def; });
  reset();
  let mc26 = true;

  const el = (tag, attrs, html) => {
    const e = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([a, v]) => { if (v !== undefined && v !== null && v !== false) e.setAttribute(a, v === true ? '' : v); });
    if (html !== undefined) e.innerHTML = html;
    return e;
  };
  const slot = icon => '<span class="slot"><img src="assets/icons/' + icon + '.png" alt="" width="16" height="16"></span>';

  // Pulls a value into its range the way the mod does, the Infuser's full simmer after its earliest take-out.
  function clamp(k, v) {
    let min = k.min, max = k.max;
    if (k.id === 'infuser.fullTimeTicks') min = state['infuser.minTimeTicks'] + 20;
    v = Math.min(max, Math.max(min, v));
    return k.type === 'int' || k.type === 'ticks' ? Math.round(v) : +v.toFixed(3);
  }
  function setValue(id, v) {
    state[id] = KEYS[id].type === 'bool' ? v : clamp(KEYS[id], v);
    if (id === 'infuser.minTimeTicks' && state['infuser.fullTimeTicks'] < state[id] + 20) state['infuser.fullTimeTicks'] = state[id] + 20;
  }
  const live = k => !k.only26 || mc26;
  const changed = k => live(k) && state[k.id] !== k.def;

  // ---- the page ----
  const top = el('div', { class: 'cfg-top' });
  top.innerHTML =
    '<div class="cfg-presets"><p class="cfg-label" id="cfg-presets-label">Start from a preset <span>(they combine, press again to undo)</span></p>' +
    '<div class="cfg-preset-list" role="group" aria-labelledby="cfg-presets-label"></div></div>' +
    '<fieldset class="cfg-version"><legend class="cfg-label">Minecraft</legend>' +
    '<label><input type="radio" name="cfg-mc" value="26" checked><span>26.2 or 26.3</span></label>' +
    '<label><input type="radio" name="cfg-mc" value="old"><span>1.21.11 or older</span></label></fieldset>';
  const presetList = top.querySelector('.cfg-preset-list');
  const presetButtons = PRESETS.map(p => {
    const b = el('button', { type: 'button', class: 'cfg-preset', 'aria-pressed': 'false' }, '<img src="assets/icons/' + p.icon + '.png" alt="" width="16" height="16">' + p.name);
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') === 'true';
      Object.entries(p.set).forEach(([id, v]) => setValue(id, on ? KEYS[id].def : v));
      unflashAll();
      render();
    });
    presetList.append(b);
    return b;
  });
  const resetAll = el('button', { type: 'button', class: 'cfg-preset cfg-reset-all' }, 'Defaults');
  resetAll.addEventListener('click', () => { reset(); unflashAll(); render(); });
  presetList.append(resetAll);
  top.querySelectorAll('[name="cfg-mc"]').forEach(r => r.addEventListener('change', () => { mc26 = r.value === '26'; render(); }));

  const body = el('div', { class: 'cfg-body' });
  const form = el('div', { class: 'cfg-form' });
  const rows = {};

  SECTIONS.forEach(s => {
    const fs = el('fieldset', { class: 'cfg-section' });
    fs.innerHTML = '<legend>' + slot(s.icon) + '<span>' + s.title + '</span> <code>' + s.id + '</code></legend><p class="cfg-applies">' + s.applies + '</p>';
    if (s.id === 'effects') fs.append(el('p', { class: 'cfg-warn', hidden: true, 'data-cfg-warn': '' }));
    s.keys.forEach(k => {
      const row = el('div', { class: 'cfg-row' + (k.type === 'bool' ? ' cfg-row-bool' : '') });
      const inputId = 'cfg-' + k.id.replace('.', '-');
      row.innerHTML = '<div class="cfg-text"><label for="' + inputId + '">' + k.name + ' <code>' + k.key + '</code></label>' +
        '<p>' + k.help + '</p><p class="cfg-moot" hidden></p></div><div class="cfg-control"></div>' +
        '<button type="button" class="cfg-undo" aria-label="Back to the default for ' + k.name + '" title="Back to the default">↺</button>';
      const ctl = row.querySelector('.cfg-control');
      const ui = { row, moot: row.querySelector('.cfg-moot') };
      if (k.type === 'bool') {
        ui.box = el('input', { type: 'checkbox', id: inputId, class: 'cfg-switch', role: 'switch' });
        ui.box.addEventListener('change', () => { setValue(k.id, ui.box.checked); render(); });
        ui.say = el('span', { class: 'cfg-say', 'aria-hidden': 'true' });
        ctl.append(ui.box, ui.say);
      } else {
        const stepped = k.type === 'mult';
        const steps = stepped ? STEPS.filter(v => v >= k.min && v <= k.max) : null;
        if (stepped && steps[0] !== k.min) steps.unshift(k.min);
        ui.range = el('input', stepped
          ? { type: 'range', min: 0, max: steps.length - 1, step: 1, 'aria-label': k.name, tabindex: '-1' }
          : { type: 'range', min: k.min, max: k.max, step: k.step || (k.type === 'ticks' ? 20 : 1), 'aria-label': k.name, tabindex: '-1' });
        ui.num = el('input', { type: 'number', id: inputId, min: k.min, max: k.max, step: k.type === 'int' || k.type === 'ticks' ? 1 : 'any', inputmode: k.type === 'int' || k.type === 'ticks' ? 'numeric' : 'decimal' });
        ui.say = el('span', { class: 'cfg-say', 'aria-live': 'polite' });
        ui.fromRange = () => stepped ? steps[+ui.range.value] : +ui.range.value;
        ui.toRange = v => stepped ? steps.reduce((best, s, i) => Math.abs(s - v) < Math.abs(steps[best] - v) ? i : best, 0) : v;
        ui.range.addEventListener('input', () => { unflash(ui); setValue(k.id, ui.fromRange()); render(); });
        ui.num.addEventListener('input', () => {
          const v = parseFloat(ui.num.value);
          if (!isNaN(v) && v >= k.min && v <= k.max) { unflash(ui); setValue(k.id, v); render(ui.num); }
        });
        ui.num.addEventListener('change', () => {
          const v = parseFloat(ui.num.value);
          if (isNaN(v)) { render(); return; }
          setValue(k.id, v);
          render();
          if (state[k.id] !== v) flash(ui, 'Pulled into ' + n(k.id === 'infuser.fullTimeTicks' ? state['infuser.minTimeTicks'] + 20 : k.min) + '–' + n(k.max) + ', as the mod would' + '.');
        });
        const pair = el('div', { class: 'cfg-pair' });
        pair.append(ui.range, ui.num);
        ctl.append(pair, ui.say);
      }
      row.querySelector('.cfg-undo').addEventListener('click', () => { unflash(ui); setValue(k.id, k.def); render(); });
      rows[k.id] = ui;
      fs.append(row);
    });
    form.append(fs);
  });
  function unflash(ui) { clearTimeout(ui.t); if (ui.moot) ui.moot.classList.remove('cfg-flash'); }
  const unflashAll = () => Object.values(rows).forEach(unflash);
  function flash(ui, text) {
    ui.moot.textContent = text;
    ui.moot.hidden = false;
    ui.moot.classList.add('cfg-flash');
    clearTimeout(ui.t);
    ui.t = setTimeout(() => { ui.moot.classList.remove('cfg-flash'); render(); }, 3500);
  }

  // the file, next to the controls on a wide screen
  const out = el('figure', { class: 'config-card cfg-out' });
  out.innerHTML =
    '<figcaption><span class="config-dots" aria-hidden="true"></span><code>config/hempdustry.json</code><span class="cfg-count" aria-live="polite"></span></figcaption>' +
    '<pre><code data-cfg-json></code></pre>' +
    '<div class="cfg-actions"><button type="button" class="button button-primary" data-cfg-copy>Copy</button>' +
    '<button type="button" class="button cfg-dl" data-cfg-dl>Download</button></div>' +
    '<p class="config-note" data-cfg-note></p>' +
    '<details class="cfg-import"><summary>Start from your own file</summary>' +
    '<label for="cfg-paste" class="cfg-label">Paste your <code>hempdustry.json</code></label>' +
    '<textarea id="cfg-paste" rows="6" spellcheck="false" placeholder="{ &quot;effects&quot;: { … } }"></textarea>' +
    '<button type="button" class="button cfg-dl" data-cfg-load>Load it</button><p class="cfg-import-note" aria-live="polite"></p></details>';
  const jsonCode = out.querySelector('[data-cfg-json]');
  const note = out.querySelector('[data-cfg-note]');
  const count = out.querySelector('.cfg-count');

  function fileObject() {
    const o = {};
    FILE_ORDER.forEach(sid => {
      const keys = SECTIONS.find(s => s.id === sid).keys.filter(changed);
      // The Infuser's two clocks go together, so the file says what the grading will read.
      if (sid === 'infuser' && keys.length === 1) keys.splice(0, 1, ...SECTIONS.find(s => s.id === sid).keys);
      if (!keys.length) return;
      o[sid] = {};
      keys.slice().sort((a, b) => a.key < b.key ? -1 : 1).forEach(k => { o[sid][k.key] = state[k.id]; });
    });
    return o;
  }
  // JSON as the mod writes it: two spaces, decimals always with a point (1.0, not 1).
  function fileText(o) {
    const sids = Object.keys(o);
    if (!sids.length) return '{}';
    return '{\n' + sids.map(sid => '  "' + sid + '": {\n' + Object.entries(o[sid]).map(([key, v]) => {
      const k = KEYS[sid + '.' + key];
      const val = typeof v === 'boolean' ? String(v) : (k.type === 'mult' || k.type === 'lin') && Number.isInteger(v) ? v.toFixed(1) : String(v);
      return '    "' + key + '": ' + val;
    }).join(',\n') + '\n  }').join(',\n') + '\n}';
  }
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const paint = t => esc(t).replace(/"([^"]+)":/g, '<span class="k">"$1"</span>:').replace(/: ([^,\n{]+)/g, ': <span class="v">$1</span>');

  function render(typing) {
    Object.values(KEYS).forEach(k => {
      const ui = rows[k.id], v = state[k.id];
      ui.row.hidden = !live(k);
      ui.row.classList.toggle('is-changed', changed(k));
      if (k.type === 'bool') {
        ui.box.checked = v;
        ui.say.textContent = v ? 'On' : 'Off';
      } else {
        ui.range.value = ui.toRange(v);
        if (ui.num !== typing) ui.num.value = v;
        ui.say.textContent = k.say(v);
      }
      if (!ui.moot.classList.contains('cfg-flash')) { ui.moot.hidden = true; ui.moot.textContent = ''; }
    });
    const s = state;
    const moot = (id, why) => { const ui = rows[id]; if (ui.moot.classList.contains('cfg-flash')) return; ui.moot.textContent = why; ui.moot.hidden = false; };
    if (!s['effects.enabled']) ['maxLevel', 'maxBuffLevel', 'durationMultiplier', 'onsetMultiplier', 'nausea', 'munchies'].forEach(k => moot('effects.' + k, 'No effect while Effects is off.'));
    if (!s['effects.debuffs']) ['greenOut', 'greenOutChanceMultiplier', 'nausea', 'munchies'].forEach(k => moot('effects.' + k, 'Debuffs off already stops this.'));
    else if (!s['effects.greenOut']) moot('effects.greenOutChanceMultiplier', 'No green-outs at all while Green-outs is off.');
    if (s['effects.maxBuffLevel'] > s['effects.maxLevel']) moot('effects.maxBuffLevel', 'Held at ' + ROMAN[s['effects.maxLevel']] + ' by the effect level cap.');
    if (!s['loot.enabled']) moot('loot.chanceMultiplier', 'Nothing to scale while Loot is off.');

    const warn = form.querySelector('[data-cfg-warn]');
    const greenOuts = s['effects.greenOut'] && s['effects.debuffs'] && s['effects.greenOutChanceMultiplier'] > 0;
    warn.hidden = s['effects.enabled'] || !greenOuts;
    if (!warn.hidden && !warn.firstChild) {
      warn.innerHTML = '<b>Green-outs still happen with effects off.</b> A full one ends a player’s buffs and empties their saturation. ';
      const fix = el('button', { type: 'button', class: 'cfg-fix' }, 'Turn green-outs off');
      fix.addEventListener('click', () => { setValue('effects.greenOut', false); render(); });
      warn.append(fix);
    }
    Object.values(KEYS).forEach(k => rows[k.id].row.classList.toggle('is-moot', !rows[k.id].moot.hidden && !rows[k.id].moot.classList.contains('cfg-flash')));

    PRESETS.forEach((p, i) => presetButtons[i].setAttribute('aria-pressed', String(Object.entries(p.set).every(([id, v]) => live(KEYS[id]) && state[id] === v))));

    const o = fileObject();
    const changes = Object.values(KEYS).filter(changed).length;
    count.textContent = changes ? changes + (changes === 1 ? ' change' : ' changes') : 'defaults';
    jump.hidden = !changes || outSeen || !formSeen;
    jump.textContent = 'Your file: ' + count.textContent + ' ↓';
    jsonCode.innerHTML = paint(fileText(o));
    const steps = [];
    if (!changes) steps.push('<b>All defaults.</b> No file needed: the mod writes the full one on its first start.');
    else {
      const server = Object.keys(o).some(sid => sid !== 'client');
      if (server) steps.push('<b>On the server</b>, save it as <code>config/hempdustry.json</code> and run <code>/hempdustry reload</code>' + (o.loot ? ', then <code>/reload</code> for the loot' : '') + '. The mod fills in every other key at its default.');
      if (o.client) steps.push('<b>The client part</b> works from each player’s own file: ship it in the modpack’s <code>config</code> folder.');
    }
    note.innerHTML = steps.join(' ');
    out.querySelectorAll('[data-cfg-copy], [data-cfg-dl]').forEach(b => { b.disabled = !changes; });
  }

  // copy and download
  const copyBtn = out.querySelector('[data-cfg-copy]');
  copyBtn.addEventListener('click', () => {
    const text = fileText(fileObject()) + '\n';
    const done = ok => { copyBtn.textContent = ok ? 'Copied' : 'Select and copy'; setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(() => done(true), () => done(false));
    else {
      const r = document.createRange(); r.selectNodeContents(jsonCode);
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      let ok = false; try { ok = document.execCommand('copy'); } catch (e) { /* the selection stays for a manual copy */ }
      done(ok);
    }
  });
  out.querySelector('[data-cfg-dl]').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([fileText(fileObject()) + '\n'], { type: 'application/json' }));
    const a = el('a', { href: url, download: 'hempdustry.json' });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  // load a file someone already has: known keys are taken (and pulled into range), the rest reported
  out.querySelector('[data-cfg-load]').addEventListener('click', () => {
    const msg = out.querySelector('.cfg-import-note');
    let data;
    try { data = JSON.parse(out.querySelector('#cfg-paste').value); } catch (e) {
      msg.textContent = 'That isn’t valid JSON. The mod would leave a file like this alone and apply nothing in it.';
      return;
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) { msg.textContent = 'The file should be one { … } object with sections in it.'; return; }
    reset();
    unflashAll();
    let taken = 0;
    const unknown = [], wrong = [], fixed = [];
    // The Infuser's earliest take-out goes first, so the full simmer is checked against the new one.
    const entries = [];
    Object.entries(data).forEach(([sid, sec]) => {
      if (!sec || typeof sec !== 'object' || Array.isArray(sec)) { unknown.push(sid); return; }
      Object.entries(sec).forEach(([key, v]) => { if (key !== '_comment') entries.push([sid + '.' + key, v]); });
    });
    entries.sort((a, b) => (a[0] === 'infuser.fullTimeTicks') - (b[0] === 'infuser.fullTimeTicks'));
    entries.forEach(([id, v]) => {
      const k = KEYS[id];
      if (!k) { unknown.push(id); return; }
      if (k.type === 'bool' ? typeof v !== 'boolean' : typeof v !== 'number') { wrong.push(id); return; }
      setValue(id, v);
      if (state[id] !== v) fixed.push(id);
      taken++;
    });
    if (state['world.mildew'] === false && !mc26) { mc26 = true; top.querySelector('[name="cfg-mc"][value="26"]').checked = true; }
    render();
    msg.textContent = 'Loaded ' + taken + (taken === 1 ? ' setting' : ' settings') + '.' +
      (fixed.length ? ' Pulled into range: ' + fixed.join(', ') + '.' : '') +
      (unknown.length ? ' Not keys of the mod, which drops them too: ' + unknown.join(', ') + '.' : '') +
      (wrong.length ? ' The wrong type, left at the default: ' + wrong.join(', ') + '. The mod may refuse a file like that, so use the one built here.' : '');
  });

  // On a narrow screen the file sits below every key: a bar at the bottom jumps to it while it's out of sight.
  const jump = el('a', { class: 'cfg-jump', href: '#cfg-file', hidden: true });
  out.id = 'cfg-file';
  out.setAttribute('tabindex', '-1');
  let outSeen = false, formSeen = false;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(es => { outSeen = es[es.length - 1].isIntersecting; render(); }).observe(out);
    new IntersectionObserver(es => { formSeen = es[es.length - 1].isIntersecting; render(); }).observe(form);
  }
  form.append(jump);
  body.append(form, out);
  mount.append(top, body);
  mount.hidden = false;
  document.querySelectorAll('[data-cfg-static]').forEach(s => { s.hidden = true; });
  render();
})();
