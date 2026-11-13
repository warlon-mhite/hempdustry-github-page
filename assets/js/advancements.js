// The Hempdustry advancement tab, drawn the way the game draws it: vanilla's window, frames, connectors and
// tooltips, laid out as a tree that grows to the right. Titles and descriptions are the game's en_us text
// (26.3 line); the tips come from the wiki's Advancements page.
(function () {
  'use strict';

  var host = document.querySelector('[data-adv]');
  if (!host) return;

  var WIKI = 'https://github.com/warlon-mhite/hempdustry-java/wiki/Advancements';
  var STORE = 'hempdustry-advancements';

  // id, parent, icon, frame, title, game description, tip, wiki anchor, flags
  // flags: n = new in 2.1, h = hidden in game, x = Minecraft 26.2 and 26.3 only
  var A = [
    ['hempdustry', null, 'indica_seeds', 'task', 'High Hopes', 'Plant a different kind of seed and see where it grows',
      'Earned the moment any hemp seed is in your inventory; planting it is up to you. Seeds come from tall grass, chests and wild plants.', 'the-plant', ''],
    ['indica_strain', 'hempdustry', 'indica_buds', 'task', 'Purple Kush', 'Harvest Purple Kush Buds from a short, leafy plant',
      'Any Purple Kush Buds in your inventory count. Wild plants grow in plains, jungles, swamps and lush caves.', 'the-plant', ''],
    ['sativa_strain', 'hempdustry', 'sativa_buds', 'task', 'Lemon Haze', 'Harvest Lemon Haze Buds from one that needs the headroom',
      'Leave two clear blocks above the seed: it grows three tall. Wild in savannas, sunflower plains and badlands.', 'the-plant', ''],
    ['kif_country', 'hempdustry', 'beldia_buds', 'task', 'Kif Country', 'Harvest Beldía Buds from a plant watered in sand',
      'A wild plant counts: they grow already ripe along desert rivers and shores. Planted, Beldía wants sand with water within four blocks.', 'the-plant', 'n'],
    ['hemp_hearts', 'hempdustry', 'toasted_hemp_seeds', 'task', 'Hemp Hearts', 'Eat a food made from Hemp Seeds',
      'Toasted Hemp Seeds (seeds in a furnace, smoker or campfire) is the quickest; the Hemp Seed Bar and Siemieniotka count too. Hemp milk does not: it is drunk, not eaten.', 'the-plant', ''],
    ['parrot_tamer', 'hempdustry', 'feather', 'task', 'Pretty Polly', 'Tame a Parrot with hemp seeds',
      'Parrots take hemp seeds just as they take wheat seeds. Keep feeding one until the hearts show.', 'the-plant', ''],
    ['schwag', 'hempdustry', 'schwag', 'task', 'Down to Seeds and Stems', 'Get your hands on some Schwag, a bud gone to seed',
      'Stressed plants spoil their buds into Schwag, and even a healthy ripe plant gives one now and then. Shipwreck supply chests carry a little.', 'the-plant', 'n'],
    ['you_get_what_you_pay_for', 'schwag', 'emerald', 'task', 'You Get What You Pay For', 'Take a hit of Schwag',
      'Bargain hunters: cheap weed has a reputation. There is only one way to find out whether it is deserved.', 'hidden-advancements', 'h'],
    ['trim_season', 'hempdustry', 'shears', 'task', 'Trim Season', 'Shear a growing hemp plant for a Hemp Leaf',
      'First window: the plant’s last stage at one block tall. Second: after it shoots up to two blocks, before it is ripe. Shearing a ripe plant does not count.', 'trimming', ''],
    ['perfect_cut', 'trim_season', 'hemp_leaf', 'task', 'Perfect Cut', 'Harvest a plant you sheared in both of its trim windows',
      'Trim it in both windows, then let it ripen before you break it: breaking it early does not count.', 'trimming', ''],
    ['sticky_fingers', 'trim_season', 'charas', 'task', 'Sticky Fingers', 'Shear a ripe plant until it gives up Charas',
      'Each ripe plant can be rubbed once: one time in four it gives Charas, one in eight if it grew under any lamp or was stressed. Work along a row.', 'trimming', 'n'],
    ['well_done', 'trim_season', 'scorched_hemp', 'task', 'Well Done', 'Scorch Hemp in a Furnace',
      'Smelt a Hemp Leaf, a bud or Schwag. The spent bud a Redstone Vaporizer hands back counts too.', 'trimming', 'n'],
    ['first_contact', 'hempdustry', 'spliff', 'task', 'First Contact', 'Take your first hit, whatever you smoke it in',
      'A bud over a sheet of Paper rolls a Spliff; hold it and right-click. Any device, any strain.', 'smoking', ''],
    ['blaze_it', 'first_contact', 'clock', 'challenge', 'Blaze It!', 'Take a hit while the clock reads 4:20 in the afternoon',
      'A matter of timing: every smoker knows the number, and Minecraft has clocks. Be holding something lit when the two agree.', 'hidden-advancements', 'h'],
    ['wake_and_bake', 'first_contact', 'red_bed', 'challenge', 'Wake and Bake', 'Take a hit in the first moments after sunrise',
      'Breakfast of champions: how you start your day says a lot about you. Some people reach for the coffee.', 'hidden-advancements', 'h'],
    ['the_munchies', 'first_contact', 'cookie', 'task', 'The Munchies', 'Eat while high and too hungry to sprint',
      'Hunger comes with every smokeable. Eat anything while you are under it and your food bar is at 6 or less, the point where you can no longer sprint.', 'smoking', 'x'],
    ['pipe_dream', 'first_contact', 'wooden_pipe', 'task', 'Pipe Dream', 'Pack a Wooden Pipe and take a hit from it',
      'A plank over three sticks. Pack it in the crafting grid with a bud in its own slot.', 'smoking', ''],
    ['bong_voyage', 'pipe_dream', 'bong', 'task', 'Bong Voyage', 'Take a hit from a packed Bong',
      'Any of the eighteen bongs counts: clear, tinted or stained. Hold right-click; the hit lands when the draw is done.', 'smoking', ''],
    ['burnout', 'pipe_dream', 'anvil', 'task', 'Burnout', 'Smoke a Wooden Pipe or a Bong down to its last hit',
      'The hit that wears it out is the one that counts, and the device breaks with it. A Wooden Pipe lasts eight hits, a Bong twenty-four.', 'smoking', ''],
    ['vapor_trail', 'first_contact', 'vaporizer', 'task', 'Vapor Trail', 'Take a hit from a Redstone Vaporizer',
      'Iron, redstone and hemp planks. One bud a bowl, and it can never green you out.', 'smoking', 'n'],
    ['hemprepreneurs', 'hempdustry', 'hemp_stem', 'task', 'Hemprepreneurs', 'Harvest your first Hemp Stem',
      'Break any ripe plant. Lemon Haze gives the most stems, twice what Purple Kush gives; Beldía gives few.', 'building-and-growing-indoors', ''],
    ['hemp_builder', 'hemprepreneurs', 'hemp_brick', 'task', 'Hemp Builder', 'Craft your first Hemp Brick',
      'Four stems make two Hempcrete; four Hempcrete make a Hemp Brick.', 'building-and-growing-indoors', ''],
    ['pothead', 'hemp_builder', 'grow_pot', 'task', 'Pothead', 'Place a Grow Pot',
      'Five Hemp Bricks around a block of dirt.', 'building-and-growing-indoors', 'n'],
    ['sea_of_green', 'pothead', 'hydro_tray', 'task', 'Sea of Green', 'Harvest a plant from a Hydro Tray',
      'Any ripe plant broken in a tray counts, running or not. The tray is a Grow Pot with four copper ingots and a redstone dust.', 'building-and-growing-indoors', 'n'],
    ['midnight_sun', 'pothead', 'grow_lamp', 'task', 'Midnight Sun', 'Harvest a plant grown under a Grow Lamp',
      'Light the lamp before the seed takes its first growth step and keep it lit to the end: the plant remembers. Hang it one to three blocks above the grown plant.', 'building-and-growing-indoors', 'n'],
    ['top_shelf', 'midnight_sun', 'indica_buds', 'goal', 'Top Shelf', 'Harvest a fully trimmed plant grown under a Grow Lamp in a Hydro Tray',
      'Both trims, the lamp from start to finish, and a tray that never runs dry or stops pumping while the plant flowers.', 'building-and-growing-indoors', 'n'],
    ['activation_energy', 'hemp_builder', 'decarboxylator', 'goal', 'Activation Energy', 'Build a Decarboxylator out of seven Blocks of Hemp Bricks',
      'Seven Blocks of Hemp Bricks and a copper ingot: some five hundred stems. Earned as soon as the oven is in your inventory.', 'the-kitchen', ''],
    ['got_bhang', 'activation_energy', 'bhang_bucket', 'task', 'Got Bhang?', 'Drink Bhang',
      'No Infuser needed: two Decarboxylated Hemp, a milk bucket (hemp milk works) and sugar, in the crafting grid.', 'the-kitchen', ''],
    ['rinse_cycle', 'activation_energy', 'washed_decarboxylated_hemp', 'task', 'Rinse Cycle', 'Rinse Decarboxylated Hemp in a water cauldron',
      'Right-click a water cauldron with Decarboxylated Hemp. Optional for butter, but it decides how good the butter can get.', 'the-kitchen', ''],
    ['butter_late_than_never', 'rinse_cycle', 'cannabutter', 'task', 'Butter Late Than Never', 'Simmer your first Cannabutter in an Infuser',
      'Pour a bucket of milk into the Infuser, add Decarboxylated Hemp, and light a campfire underneath.', 'the-kitchen', ''],
    ['give_it_an_hour', 'butter_late_than_never', 'space_cookie', 'task', 'Give It an Hour', 'Eat an edible, and wait',
      'Earned on the first bite, no waiting: Cannabutter Toast, a Space Cookie, a Space Brownie, Dawamesk or a Bucket of Bhang. A slice of Space Cake does not count: the cake is eaten off the block.', 'the-kitchen', ''],
    ['club_des_hashischins', 'butter_late_than_never', 'dawamesk', 'task', 'Club des Hashischins', 'Eat Dawamesk',
      'Cannabutter, sugar, a honey bottle and sweet berries: a whole batch of butter in a single piece, the strongest edible there is.', 'the-kitchen', ''],
    ['perfect_batch', 'butter_late_than_never', 'infuser', 'challenge', 'Perfect Batch', 'Infuse a batch with nothing unwashed and nothing rushed',
      'For perfectionists in the kitchen: every batch of butter gets a report card. Bring one home with nothing but top marks.', 'hidden-advancements', 'h'],
    ['green_threads', 'hemprepreneurs', 'hemp_fiber', 'task', 'Green Threads', 'Turn a Hemp Stem into Hemp Fiber',
      'A stem in the crafting grid makes four fibre; ret it in a water cauldron first and it makes six.', 'cloth-and-extraction', ''],
    ['chill_set', 'green_threads', 'hemp_beanie', 'task', 'The Chill Set', 'Collect a full set of hemp armor',
      'All four pieces in your inventory count. Worn together, they halve your odds of coughing and of nausea.', 'cloth-and-extraction', ''],
    ['its_not_pollen', 'green_threads', 'kief', 'task', 'It’s Not Pollen', 'Sift Kief in a Sifting Box',
      'Fill it like a composter: seven buds (four of Beldía) or about forty-seven Hemp Leaves give nine Kief.', 'cloth-and-extraction', 'n'],
    ['hot_off_the_press', 'its_not_pollen', 'hashish_bar', 'task', 'Hot Off the Press', 'Press Kief into Hashish',
      'The Hemp Press, with heat underneath, presses Kief into Hashish one piece at a time; nine pieces craft into the bar.', 'cloth-and-extraction', 'n'],
    ['cloud_nine', 'hot_off_the_press', 'hashish', 'task', 'Cloud Nine', 'Cut a Hashish Bar into pieces',
      'Set the bar down and right-click it with a sword, or a modded knife. Shears will not do.', 'cloth-and-extraction', 'n'],
    ['one_small_step', 'cloud_nine', 'moon_rock', 'task', 'One Small Step', 'Craft a Moon Rock',
      'A bud, a Rosin and a coat (Hashish, Kief, Filtered Hashish, Bubble Hash, Filtered Kief or Charas), in any arrangement.', 'cloth-and-extraction', 'n'],
    ['double_zero', 'hot_off_the_press', 'filtered_hashish', 'task', 'Double Zero', 'Obtain Filtered Hashish',
      'Press Bubble Hash, or press Kief you have sifted a second time (Filtered Kief).', 'cloth-and-extraction', 'n'],
    ['under_pressure', 'double_zero', 'rosin', 'task', 'Under Pressure', 'Press Filtered Hashish into Rosin',
      'One more turn of the press. A single Rosin fills a whole bong bowl.', 'cloth-and-extraction', 'n'],
    ['see_you_ice_o_later', 'its_not_pollen', 'bubble_hash', 'task', 'See You Ice-O-Later', 'Fill a Sifting Box with water, jacket it in ice and wash the trichomes out into Bubble Hash',
      'Any ice counts: plain, packed or blue, on all four sides. Plain ice melts in bright light, so build it in the dark.', 'cloth-and-extraction', 'n'],
    ['around_the_world_in_80_grams', 'its_not_pollen', 'compass', 'challenge', 'Around the World in 80 Grams', 'Obtain Charas, Hashish, Filtered Hashish, Bubble Hash and Rosin',
      'The five need not be in your inventory at the same time. Charas, rubbed off ripe plants, is the slow one.', 'cloth-and-extraction', 'n']
  ];

  var FRAME_NAME = { task: 'Task', goal: 'Goal', challenge: 'Challenge' };
  var nodes = {}, order = [];
  A.forEach(function (r) {
    var n = { id: r[0], parent: r[1], icon: r[2], frame: r[3], title: r[4], desc: r[5], tip: r[6], anchor: r[7],
      isNew: r[8].indexOf('n') >= 0, secret: r[8].indexOf('h') >= 0, only26: r[8].indexOf('x') >= 0, kids: [] };
    nodes[n.id] = n; order.push(n);
  });
  order.forEach(function (n) { if (n.parent) nodes[n.parent].kids.push(n); });
  var root = nodes.hempdustry;

  // ---- Layout: depth goes right (28 px a column, as in the game), siblings stack down (27 px a row).
  // Each subtree is laid out on its own, then pushed down just far enough that no row of it, at any depth,
  // touches the subtrees above it; a parent sits halfway between its first and last child.
  function layout(n, depth) {
    n.depth = depth;
    if (!n.kids.length) { n.row = 0; var c = {}; c[depth] = [0, 0]; return { nodes: [n], contour: c }; }
    var all = [], contour = {};
    n.kids.forEach(function (k, i) {
      var sub = layout(k, depth + 1);
      var shift = 0;
      if (i > 0) {
        Object.keys(sub.contour).forEach(function (d) {
          if (contour[d]) shift = Math.max(shift, contour[d][1] - sub.contour[d][0] + 1);
        });
      }
      sub.nodes.forEach(function (m) { m.row += shift; });
      Object.keys(sub.contour).forEach(function (d) {
        var lo = sub.contour[d][0] + shift, hi = sub.contour[d][1] + shift;
        contour[d] = contour[d] ? [Math.min(contour[d][0], lo), Math.max(contour[d][1], hi)] : [lo, hi];
      });
      all = all.concat(sub.nodes);
    });
    n.row = (n.kids[0].row + n.kids[n.kids.length - 1].row) / 2;
    contour[depth] = [n.row, n.row];
    all.push(n);
    return { nodes: all, contour: contour };
  }
  var placed = layout(root, 0).nodes;
  var minRow = Math.min.apply(null, placed.map(function (n) { return n.row; }));
  var PAD = 8, maxX = 0, maxY = 0;
  placed.forEach(function (n) {
    n.x = PAD + n.depth * 28;
    n.y = PAD + Math.floor((n.row - minRow) * 27);
    maxX = Math.max(maxX, n.x); maxY = Math.max(maxY, n.y);
  });
  var W = maxX + 29 + PAD + 4, H = maxY + 26 + PAD;

  // ---- Remembered ticks (this browser only)
  var done = {};
  try { (JSON.parse(localStorage.getItem(STORE)) || []).forEach(function (id) { if (nodes[id]) done[id] = true; }); } catch (e) {}
  function save() {
    try {
      var ids = Object.keys(done);
      if (ids.length) localStorage.setItem(STORE, JSON.stringify(ids)); else localStorage.removeItem(STORE);
    } catch (e) {}
  }

  // ---- Build the DOM
  function el(tag, cls, attrs) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }
  function icon(n) { return 'assets/icons/' + n.icon + '.png'; }
  function frameSrc(n) { return 'assets/advancements/' + n.frame + '_frame_' + (done[n.id] ? 'obtained' : 'unobtained') + '.png'; }

  var view = host.querySelector('.adv-view');
  var tipLayer = host.querySelector('.adv-tips');
  var card = host.querySelector('.adv-card');
  var secretToggle = host.querySelector('[data-adv-secrets]');
  var canvas = el('div', 'adv-canvas');
  canvas.style.setProperty('--w', W);
  canvas.style.setProperty('--h', H);

  // Connectors, as AdvancementWidget.drawConnectivity draws them: a black line three pixels wide, then a
  // white one pixel wide on top, out from the parent, down (or up) halfway between the columns, and in.
  var svgNS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'adv-lines');
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  svg.setAttribute('aria-hidden', 'true');
  var shadowG = document.createElementNS(svgNS, 'g'), lineG = document.createElementNS(svgNS, 'g');
  shadowG.setAttribute('fill', '#000'); lineG.setAttribute('fill', '#fff');
  function rect(g, x, y, w, h, n) {
    var r = document.createElementNS(svgNS, 'rect');
    r.setAttribute('x', x); r.setAttribute('y', y); r.setAttribute('width', w); r.setAttribute('height', h);
    if (n.secret) r.setAttribute('class', 'is-secret');
    g.appendChild(r);
  }
  placed.forEach(function (n) {
    if (!n.parent) return;
    var p = nodes[n.parent];
    var px = p.x + 13, jx = p.x + 30, py = p.y + 13, cx = n.x + 13, cy = n.y + 13;
    var top = Math.min(py, cy), bottom = Math.max(py, cy);
    // shadow: 3 px thick
    rect(shadowG, px, py - 1, jx - px + 2, 3, n);
    rect(shadowG, jx - 1, cy - 1, cx - jx + 1, 3, n);
    rect(shadowG, jx - 1, top - 1, 3, bottom - top + 3, n);
    // line: 1 px
    rect(lineG, px, py, jx - px + 1, 1, n);
    rect(lineG, jx, cy, cx - jx + 1, 1, n);
    rect(lineG, jx, top, 1, bottom - top + 1, n);
  });
  svg.appendChild(shadowG); svg.appendChild(lineG);
  canvas.appendChild(svg);

  placed.sort(function (a, b) { return a.depth - b.depth || a.y - b.y; });
  placed.forEach(function (n) {
    var b = el('button', 'adv-node', { type: 'button', 'data-id': n.id, tabindex: '-1' });
    b.style.setProperty('--x', n.x);
    b.style.setProperty('--y', n.y);
    if (n.secret) b.classList.add('is-secret');
    var f = el('img', 'adv-frame', { src: frameSrc(n), alt: '', width: '26', height: '26' });
    var i = el('img', 'adv-icon', { src: icon(n), alt: '', width: '16', height: '16', loading: 'lazy' });
    b.appendChild(f); b.appendChild(i);
    n.button = b; n.frameImg = f;
    label(n);
    canvas.appendChild(b);
  });
  view.appendChild(canvas);

  function label(n) {
    n.button.setAttribute('aria-label', n.title + ', ' + FRAME_NAME[n.frame].toLowerCase() + (done[n.id] ? ', ticked' : '') + (n.secret ? ', hidden in game' : ''));
    n.button.setAttribute('aria-pressed', selected === n ? 'true' : 'false');
  }

  // ---- Tooltip: the frame-coloured title bar with the description box under (or over) it.
  var tip = el('div', 'adv-tip');
  tip.hidden = true;
  tipLayer.appendChild(tip);
  var tipFor = null;
  function showTip(n) {
    tipFor = n;
    tip.className = 'adv-tip adv-tip-' + n.frame + (done[n.id] ? ' is-done' : '');
    tip.innerHTML = '';
    var desc = el('p', 'adv-tip-desc'); desc.textContent = n.desc;
    var bar = el('p', 'adv-tip-bar'); bar.textContent = n.title;
    var f = el('img', 'adv-tip-frame', { src: frameSrc(n), alt: '', width: '26', height: '26' });
    var i = el('img', 'adv-tip-icon', { src: icon(n), alt: '', width: '16', height: '16' });
    tip.appendChild(desc); tip.appendChild(bar); tip.appendChild(f); tip.appendChild(i);
    tip.hidden = false;
    placeTip();
  }
  function hideTip() { tip.hidden = true; tipFor = null; }
  function placeTip() {
    if (!tipFor) return;
    var layer = tipLayer.getBoundingClientRect();
    var b = tipFor.button.getBoundingClientRect();
    tip.classList.remove('is-left', 'is-up', 'is-free');
    tip.style.setProperty('--room', layer.width + 'px');
    var k = b.width / 26; // one game pixel, in CSS pixels
    var x = b.left - layer.left - 3 * k, y = b.top - layer.top; // the box starts 3 px left of the frame
    var w = tip.offsetWidth, h = tip.offsetHeight;
    var left = x, top = y;
    if (x + w > layer.width && x + 29 * k - w >= 0) { tip.classList.add('is-left'); left = x + 29 * k - w; }
    else if (x + w > layer.width) {
      // too wide to hang off either side of the frame (a phone): float it just below or above the
      // advancement, without its own copy of the frame
      tip.classList.add('is-free');
      w = tip.offsetWidth; h = tip.offsetHeight;
      left = Math.max(0, Math.min(x, layer.width - w));
      top = y + 28 * k + h <= layer.height || y - 2 * k - h < 0 ? y + 28 * k : y - 2 * k - h;
    }
    if (!tip.classList.contains('is-free') && y + h > layer.height && y + 26 * k - h >= 0) { tip.classList.add('is-up'); top = y + 26 * k - h; }
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  }

  // ---- Selection and the card beside the window
  var selected = null;
  var cardIcon = card.querySelector('.adv-card-icon');
  var cardFrame = card.querySelector('.adv-card-frame');
  var cardTitle = card.querySelector('.adv-card-title');
  var cardMeta = card.querySelector('.adv-card-meta');
  var cardDesc = card.querySelector('.adv-card-desc');
  var cardTip = card.querySelector('.adv-card-tip');
  var cardPath = card.querySelector('.adv-card-path');
  var cardTick = card.querySelector('[data-adv-tick]');
  var cardWiki = card.querySelector('.adv-card-wiki');
  var progress = host.querySelector('[data-adv-progress]');
  var resetBtn = host.querySelector('[data-adv-reset]');

  function select(n, focus) {
    var prev = selected;
    selected = n;
    if (prev) { prev.button.classList.remove('is-selected'); prev.button.tabIndex = -1; label(prev); }
    n.button.classList.add('is-selected');
    n.button.tabIndex = 0;
    label(n);
    if (focus) n.button.focus({ preventScroll: true });
    reveal(n);
    cardFrame.src = frameSrc(n);
    cardIcon.src = icon(n);
    cardTitle.textContent = n.title;
    var meta = [FRAME_NAME[n.frame]];
    if (n.isNew) meta.push('New in 2.1');
    if (n.only26) meta.push('Minecraft 26.2 and 26.3 only');
    if (n.secret) meta.push('Hidden until earned');
    cardMeta.innerHTML = '';
    meta.forEach(function (m, i) {
      var s = el('span', i === 0 ? 'adv-pill adv-pill-' + n.frame : 'adv-pill');
      s.textContent = m;
      cardMeta.appendChild(s);
    });
    cardDesc.textContent = n.desc;
    cardTip.textContent = n.tip;
    // the road from the root, each step a link back into the tree
    cardPath.innerHTML = '';
    var chain = [], p = n;
    while (p) { chain.unshift(p); p = p.parent ? nodes[p.parent] : null; }
    if (chain.length > 1) chain.forEach(function (c, i) {
      if (i) cardPath.appendChild(document.createTextNode(' › '));
      if (c === n) { var b = el('b'); b.textContent = c.title; cardPath.appendChild(b); return; }
      var a = el('button', 'adv-link', { type: 'button' });
      a.textContent = c.title;
      a.addEventListener('click', function () { select(c, true); });
      cardPath.appendChild(a);
    });
    var kids = n.kids.filter(function (k) { return !k.secret || showSecrets; });
    if (kids.length) {
      if (chain.length > 1) cardPath.appendChild(el('br'));
      cardPath.appendChild(document.createTextNode('Leads to '));
      kids.forEach(function (k, i) {
        if (i) cardPath.appendChild(document.createTextNode(i === kids.length - 1 ? ' and ' : ', '));
        var a = el('button', 'adv-link', { type: 'button' });
        a.textContent = k.title;
        a.addEventListener('click', function () { select(k, true); });
        cardPath.appendChild(a);
      });
    }
    cardWiki.href = WIKI + '#' + n.anchor;
    paintTick();
  }

  function paintTick() {
    var n = selected;
    cardTick.setAttribute('aria-pressed', done[n.id] ? 'true' : 'false');
    cardTick.querySelector('span').textContent = done[n.id] ? 'Earned' : 'Mark as earned';
    var count = Object.keys(done).length, total = order.length;
    progress.textContent = count + ' of ' + total;
    progress.parentNode.style.setProperty('--done', count / total);
    resetBtn.hidden = count === 0;
  }

  function setDone(n, on) {
    if (on) done[n.id] = true; else delete done[n.id];
    n.frameImg.src = frameSrc(n);
    label(n);
    if (n === selected) { cardFrame.src = frameSrc(n); paintTick(); }
    if (tipFor === n) showTip(n);
    save();
  }

  // Keep the picked advancement inside the window, as little scrolling as it takes.
  function reveal(n) {
    var k = n.button.offsetWidth / 26;
    var x = n.x * k, y = n.y * k, m = 12 * k;
    var vw = view.clientWidth, vh = view.clientHeight;
    var sl = view.scrollLeft, st = view.scrollTop;
    if (x - m < sl) sl = x - m; else if (x + 29 * k + m > sl + vw) sl = x + 29 * k + m - vw;
    if (y - m < st) st = y - m; else if (y + 26 * k + m > st + vh) st = y + 26 * k + m - vh;
    view.scrollTo({ left: sl, top: st, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  // ---- Hidden advancements: off by default, as in the game
  var showSecrets = false;
  function paintSecrets() {
    host.classList.toggle('show-secrets', showSecrets);
    if (!showSecrets && selected && selected.secret) select(nodes[selected.parent], false);
    else if (selected) select(selected, false);
  }
  secretToggle.addEventListener('change', function () { showSecrets = secretToggle.checked; paintSecrets(); });

  // ---- Input
  canvas.addEventListener('click', function (e) {
    var b = e.target.closest('.adv-node');
    if (!b || dragged) return;
    var n = nodes[b.dataset.id];
    if (selected === n) setDone(n, !done[n.id]); else select(n, true);
  });
  canvas.addEventListener('pointerover', function (e) {
    var b = e.target.closest('.adv-node');
    if (b && e.pointerType === 'mouse') showTip(nodes[b.dataset.id]);
  });
  canvas.addEventListener('pointerout', function (e) {
    var b = e.target.closest('.adv-node');
    if (b && e.pointerType === 'mouse' && !b.contains(e.relatedTarget) && document.activeElement !== b) hideTip();
  });
  canvas.addEventListener('focusin', function (e) {
    var b = e.target.closest('.adv-node');
    if (b) showTip(nodes[b.dataset.id]);
  });
  canvas.addEventListener('focusout', function () { hideTip(); });
  view.addEventListener('scroll', placeTip, { passive: true });
  window.addEventListener('resize', placeTip);

  // Arrow keys walk the tree: left to the parent, right to the first child, up and down to the nearest
  // advancement above or below in the same column.
  canvas.addEventListener('keydown', function (e) {
    var b = e.target.closest('.adv-node');
    if (!b) return;
    var n = nodes[b.dataset.id], next = null;
    var visible = function (m) { return !m.secret || showSecrets; };
    if (e.key === 'ArrowLeft' && n.parent) next = nodes[n.parent];
    else if (e.key === 'ArrowRight') next = n.kids.filter(visible).sort(function (a, c) { return a.y - c.y; })[0] || null;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      var down = e.key === 'ArrowDown';
      placed.forEach(function (m) {
        if (m.depth !== n.depth || !visible(m) || m === n) return;
        if (down ? m.y <= n.y : m.y >= n.y) return;
        if (!next || Math.abs(m.y - n.y) < Math.abs(next.y - n.y)) next = m;
      });
    } else if (e.key === 'Home') next = root;
    else if (e.key === 'Escape') { hideTip(); return; }
    else return;
    e.preventDefault();
    if (next) { select(next, true); showTip(next); }
  });

  // Drag the background with the mouse to pan, as in the game (touch scrolls natively).
  var drag = null, dragged = false;
  view.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag = { x: e.clientX, y: e.clientY, sl: view.scrollLeft, st: view.scrollTop };
    dragged = false;
  });
  window.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!dragged && Math.abs(dx) + Math.abs(dy) < 5) return;
    if (!dragged) { dragged = true; view.classList.add('is-dragging'); hideTip(); }
    view.scrollLeft = drag.sl - dx;
    view.scrollTop = drag.st - dy;
  });
  window.addEventListener('pointerup', function () {
    if (!drag) return;
    drag = null;
    view.classList.remove('is-dragging');
    setTimeout(function () { dragged = false; }, 0);
  });

  cardTick.addEventListener('click', function () { setDone(selected, !done[selected.id]); });
  resetBtn.addEventListener('click', function () {
    Object.keys(done).forEach(function (id) { setDone(nodes[id], false); });
  });

  host.hidden = false;
  var fallback = document.querySelector('[data-adv-fallback]');
  if (fallback) fallback.hidden = true;
  select(root, false);
  // open on the root, a little in from the left, halfway down the window
  function centre() {
    var k0 = root.button.offsetWidth / 26;
    view.scrollTop = Math.max(0, root.y * k0 - view.clientHeight / 2 + 13 * k0);
    view.scrollLeft = 0;
  }
  centre();
  // on a phone the tree starts folded away (phone.js), with nothing to measure: centre it when it opens
  window.addEventListener('phone:open', function (e) {
    if (e.detail && e.detail.contains(host)) centre();
  });
})();
