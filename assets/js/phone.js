// A shorter page on a phone. Three tools, all marked up in index.html and drawn in style.css (Phones):
//   .m-rail  a row of cards that swipes sideways, with dots under it
//   .m-fold  a side part that folds to its heading (music, advancements, languages, config builder, old worlds)
//   .m-more  the second half of a section, behind one button per section (its label is the section's data-more)
// Wider screens and readers without JS get the whole page as it is: nothing here hides anything above the breakpoint.
(function () {
  var phone = matchMedia('(max-width: 47.99rem)');

  // ---- .m-more: one button per section, after the last part it shows ----
  var mores = [];
  document.querySelectorAll('main > section[data-more]').forEach(function (section) {
    var parts = section.querySelectorAll('.m-more');
    if (!parts.length) return;
    var container = section.querySelector('.container');
    var last = parts[parts.length - 1];
    while (last.parentElement !== container) last = last.parentElement;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'button m-more-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span class="m-more-sign" aria-hidden="true"></span><span class="m-more-label"></span>';
    var label = btn.querySelector('.m-more-label');
    label.textContent = section.dataset.more;
    last.after(btn);
    var more = { section: section, btn: btn, label: label };
    btn.addEventListener('click', function () {
      var open = !section.classList.contains('is-more');
      setMore(more, open);
      // closing pulls the page up under the reader: keep the button where their thumb is
      if (!open) btn.scrollIntoView({ block: 'center', behavior: 'instant' });
    });
    mores.push(more);
  });

  function setMore(more, open) {
    more.section.classList.toggle('is-more', open);
    more.btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    more.label.textContent = open ? 'Show less' : more.section.dataset.more;
    if (open) more.section.querySelectorAll('.m-more').forEach(announceOpen);
  }

  // ---- .m-fold: on a phone the heading becomes a button ----
  var folds = [];
  document.querySelectorAll('.m-fold').forEach(function (fold) {
    var head = fold.querySelector('h3');
    if (!head) return;
    head.classList.add('m-fold-head');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'm-fold-btn';
    btn.setAttribute('aria-expanded', 'false');
    var sign = document.createElement('span');
    sign.className = 'm-fold-sign';
    sign.setAttribute('aria-hidden', 'true');
    btn.addEventListener('click', function () { setFold(f, !fold.classList.contains('is-open')); });
    var f = { fold: fold, head: head, btn: btn, sign: sign };
    folds.push(f);
  });

  function setFold(f, open) {
    f.fold.classList.toggle('is-open', open);
    f.btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) announceOpen(f.fold);
  }

  // the heading's own content moves into the button on a phone, and back out above it
  function mountFolds(on) {
    folds.forEach(function (f) {
      if (on && f.btn.parentNode !== f.head) {
        while (f.head.firstChild) f.btn.appendChild(f.head.firstChild);
        f.btn.appendChild(f.sign);
        f.head.appendChild(f.btn);
      } else if (!on && f.btn.parentNode === f.head) {
        f.sign.remove();
        while (f.btn.firstChild) f.head.appendChild(f.btn.firstChild);
        f.btn.remove();
      }
    });
  }

  // a part that was hidden while its script laid it out can redo that now (the advancement tree listens)
  function announceOpen(el) {
    window.dispatchEvent(new CustomEvent('phone:open', { detail: el }));
  }

  // ---- .m-rail: dots that follow the swipe ----
  var rails = [];
  document.querySelectorAll('.m-rail').forEach(function (rail) {
    var dots = document.createElement('div');
    dots.className = 'm-dots';
    dots.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < rail.children.length; i++) dots.appendChild(document.createElement('span'));
    // the dots join the page only on a phone: on a wide page they would sit between a grid and the rule that spaces what follows it
    var r = { rail: rail, box: dots, dots: dots.children };
    var queued = false;
    rail.addEventListener('scroll', function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; markDot(r); });
    }, { passive: true });
    rails.push(r);
  });

  function markDot(r) {
    var rail = r.rail;
    var kids = rail.children;
    var at = 0;
    if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4) {
      at = kids.length - 1;
    } else {
      var start = rail.getBoundingClientRect().left + parseFloat(getComputedStyle(rail).paddingLeft);
      var best = Infinity;
      for (var i = 0; i < kids.length; i++) {
        var d = Math.abs(kids[i].getBoundingClientRect().left - start);
        if (d < best) { best = d; at = i; }
      }
    }
    for (var j = 0; j < r.dots.length; j++) r.dots[j].classList.toggle('is-on', j === at);
  }

  // a rail is a scroll area: reachable by keyboard and named, but only while it is one
  function mountRails(on) {
    rails.forEach(function (r) {
      if (on) {
        if (!r.box.isConnected) r.rail.after(r.box);
        r.rail.tabIndex = 0;
        r.rail.setAttribute('role', 'region');
        markDot(r);
      } else {
        r.box.remove();
        r.rail.removeAttribute('tabindex');
        r.rail.removeAttribute('role');
      }
    });
  }

  // ---- a link into a folded part opens it first, so the jump lands ----
  function reveal(target) {
    if (!target || !phone.matches) return;
    var fold = target.closest('.m-fold');
    folds.forEach(function (f) { if (f.fold === fold) setFold(f, true); });
    if (target.closest('.m-more')) {
      var section = target.closest('main > section');
      mores.forEach(function (m) { if (m.section === section) setMore(m, true); });
    }
  }

  function targetOf(hash) {
    if (!hash || hash.length < 2) return null;
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); } catch (e) { return null; }
  }

  // capture phase: open before the browser looks for the target
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a) reveal(targetOf(a.hash));
  }, true);
  window.addEventListener('hashchange', function () {
    var t = targetOf(location.hash);
    reveal(t);
    if (t && phone.matches) t.scrollIntoView({ block: 'start' });
  });

  function apply() {
    mountFolds(phone.matches);
    mountRails(phone.matches);
  }
  apply();
  phone.addEventListener('change', apply);

  // arriving on a link into a folded part (from the wiki, say)
  var first = targetOf(location.hash);
  if (first && phone.matches && (first.closest('.m-fold') || first.closest('.m-more'))) {
    reveal(first);
    var go = function () { first.scrollIntoView({ behavior: 'instant', block: 'start' }); };
    requestAnimationFrame(go);
    if (document.readyState !== 'complete') addEventListener('load', function () { requestAnimationFrame(go); }, { once: true });
  }
})();
