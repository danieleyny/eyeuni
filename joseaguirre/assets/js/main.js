/* Jose Aguirre — "Deep Focus" · Cinematic Navy (Option A). Vanilla JS. */
(function () {
  'use strict';
  var doc = document, W = window;
  var reduce = W.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var CAL = 'https://calendly.com/joseaguirrefitness/onlinecoaching';

  /* ---------- i18n ---------- */
  var EN = {
    'meta.desc': '1:1 online coaching for men 30+. Lose fat and build an athletic body without living at the gym. Lima, since 2013.',
    'a11y.skip': 'Skip to content',
    'cta.book': 'Book your call',
    'nav.who': 'Who it’s for', 'nav.method': 'The method', 'nav.training': 'The training', 'nav.proof': 'Results', 'nav.coach': 'Your coach', 'nav.program': 'The program',
    'hero.eyebrow': 'Online coaching',
    'hero.h1': 'Feel good in your body again.',
    'hero.sub': '1:1 coaching for men 30+ who want to lose fat and build an athletic body — without living at the gym.',
    'hero.cta2': 'See the method',
    'hero.trust': '+33,000 men follow his method · Training since 2013',
    'stat.community': 'community', 'stat.since': 'Since 2013', 'stat.since2': 'training', 'stat.online': 'online',
    'reso.t': 'You don’t need a cover-model physique. You need to feel strong, light and energized again — and be able to keep it.',
    'val.p1': 'No extreme diets', 'val.p2': 'No living at the gym', 'val.p3': 'No gaining it back',
    'coach.kicker': 'Your coach',
    'quien.kicker': 'Who it’s for',
    'quien.h': 'For the man who has already tried everything.',
    'quien.body': 'Impossible diets, two-hour routines, plans that ignore your work and your family. Not here. A method that fits your real life — and that you can sustain.',
    'quien.line': 'No extreme diets · No living at the gym · No gaining it back.',
    'metodo.kicker': 'The method', 'metodo.h': 'A simple system, in four steps.',
    'step.1t': 'Assess', 'step.1d': 'We understand your starting point: composition, habits, schedule and your real goal.',
    'step.2t': 'Train', 'step.2d': 'Efficient sessions, designed for your time — not to exhaust you.',
    'step.3t': 'Nourish', 'step.3d': 'Flexible nutrition that fits your life, without absurd restrictions.',
    'step.4t': 'Sustain', 'step.4d': 'Habits that stay. Not one more diet — a way of living.',
    'train.kicker': 'The training', 'train.h': 'Smart training, not endless training.',
    'train.p1t': 'Strength', 'train.p1d': 'Build muscle that keeps your metabolism running.',
    'train.p2t': 'Conditioning', 'train.p2d': 'Energy and endurance for everyday life.',
    'train.p3t': 'Mobility', 'train.p3d': 'Move without pain, in and out of the gym.',
    'train.p4t': 'Technique', 'train.p4d': 'Train safely — for good.',
    'train.spec': '30–45 min sessions · at home or the gym · adapted to your time',
    'prueba.kicker': 'Results', 'prueba.h': 'Real change. That lasts.',
    'prueba.before': 'Before', 'prueba.after': 'After', 'prueba.avg': 'Average', 'prueba.weeks': 'Weeks',
    'prueba.q': '“I recognized myself in the mirror again — and this time I didn’t gain it back.”',
    'prueba.cite': '— Carlos, 41',
    'coach.h': 'I’m Jose Aguirre.',
    'coach.p1': 'Fat-loss coach, from Lima. I’ve trained since 2013 and spent years helping men 30+ get back in shape without putting their life on hold.',
    'coach.philo': 'Most men don’t want a huge physique. They want to feel good again. That’s my whole job.',
    'coach.sig': 'I won’t promise you abs in 30 days. I’ll teach you to keep them for life.',
    'prog.kicker': '1:1 coaching', 'prog.h': 'A program made for you.',
    'prog.f1': 'Personalized training plan',
    'prog.f2': 'Flexible nutrition built for you',
    'prog.f3': 'Weekly tracking and adjustments',
    'prog.f4': 'Direct support from me',
    'prog.f5': 'Adapted to your time and your life',
    'prog.note': 'Limited spots. First a call to see if we’re a fit — no commitment.',
    'prog.loading': 'Loading calendar…',
    'prog.fbt': 'Book your free call', 'prog.fbsub': '15 minutes, no commitment.', 'prog.fblink': 'Open calendar',
    'faq.h': 'Frequently asked',
    'faq.q1': 'Do I need to go to a gym?', 'faq.a1': 'Not required. I adapt the plan to what you have — gym, home or minimal equipment. What matters is that it’s sustainable for you.',
    'faq.q2': 'How much time a day?', 'faq.a2': 'Less than you think. Efficient 30–45 minute sessions that fit your schedule.',
    'faq.q3': 'Does it work if I’m 40+ or 50+?', 'faq.a3': 'That’s exactly who I work with. The method adjusts to your age, recovery and starting point.',
    'faq.q4': 'How does online coaching work?', 'faq.a4': 'You get your plan, weekly tracking and direct contact with me. We adjust as we go.',
    'faq.q5': 'What if I travel or have little time?', 'faq.a5': 'The plan adapts to real life: travel, hotels, dinners out. No excuses, but no punishment either.',
    'faq.q6': 'What happens on the call?', 'faq.a6': 'We talk about your situation and goal, and see if we’re a fit. No pressure.',
    'cierre.h': 'Start when you’re ready.', 'cierre.sub': 'A free call. No commitment.'
  };
  var TITLE = { es: 'Jose Aguirre — Coaching de Pérdida de Grasa · Lima', en: 'Jose Aguirre — Fat-Loss Coaching · Lima' };
  var nodes = [].slice.call(doc.querySelectorAll('[data-i18n]'));
  var ES = {};
  nodes.forEach(function (n) { var k = n.getAttribute('data-i18n'), a = n.getAttribute('data-i18n-attr'); ES[k] = a ? n.getAttribute(a) : n.textContent; });
  function applyLang(lang) {
    var dict = lang === 'en' ? EN : ES;
    nodes.forEach(function (n) { var k = n.getAttribute('data-i18n'); if (dict[k] == null) return; var a = n.getAttribute('data-i18n-attr'); if (a) n.setAttribute(a, dict[k]); else n.textContent = dict[k]; });
    doc.documentElement.lang = lang; doc.title = TITLE[lang] || TITLE.es;
    doc.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('is-active', b.dataset.lang === lang); });
    try { localStorage.setItem('ja1_lang', lang); } catch (e) {}
  }
  (function initLang() {
    var q = new URLSearchParams(location.search).get('lang'), s; try { s = localStorage.getItem('ja1_lang'); } catch (e) {}
    applyLang(q === 'en' || q === 'es' ? q : (s || 'es'));
    doc.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { applyLang(b.dataset.lang); }); });
  })();

  /* ---------- Loader ---------- */
  (function loader() {
    var el = doc.getElementById('loader'); if (!el) return;
    var scene = doc.getElementById('loaderScene'), shatter = doc.getElementById('shatter');
    function hide() { el.classList.add('is-hidden'); }
    if (reduce || !shatter) { setTimeout(hide, 500); return; }
    // Build navy shards tiling the screen; they fly apart from the smash point on cue.
    var W_ = W.innerWidth, H_ = W.innerHeight;
    var cols = Math.max(4, Math.round(W_ / 96)), rows = Math.max(6, Math.round(H_ / 96));
    var ox = W_ / 2, oy = H_ * 0.42, frag = doc.createDocumentFragment();
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var x = c * W_ / cols, y = r * H_ / rows, w = W_ / cols, h = H_ / rows;
      for (var t = 0; t < 2; t++) {
        var s = doc.createElement('div'); s.className = 'shard';
        s.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;clip-path:' + (t ? 'polygon(100% 0,100% 100%,0 100%)' : 'polygon(0 0,100% 0,0 100%)');
        var cx = x + w / 2, cy = y + h / 2, dx = cx - ox, dy = cy - oy, d = Math.max(1, Math.sqrt(dx * dx + dy * dy)), f = 140 + Math.random() * 300;
        s.style.setProperty('--tx', (dx / d * f + (Math.random() - 0.5) * 46) + 'px');
        s.style.setProperty('--ty', (dy / d * f + (Math.random() - 0.5) * 46 + 70) + 'px');
        s.style.setProperty('--rot', ((Math.random() - 0.5) * 100) + 'deg');
        s.style.transitionDelay = (Math.random() * 90) + 'ms';
        frag.appendChild(s);
      }
    }
    shatter.appendChild(frag);
    var SMASH = 1780;
    setTimeout(function () {
      if (scene) { scene.classList.add('smash'); }
      setTimeout(function () {
        if (scene) scene.classList.add('gone');
        el.classList.add('shattering');
        if (el.animate) try { el.animate([{ transform: 'translate(0,0)' }, { transform: 'translate(4px,-3px)' }, { transform: 'translate(-4px,3px)' }, { transform: 'translate(0,0)' }], { duration: 130 }); } catch (e) {}
        shatter.classList.add('go');
        setTimeout(hide, 850);
      }, 300);
    }, SMASH);
  })();

  /* ---------- Bar / progress / dock / menu ---------- */
  (function chrome() {
    var bar = doc.getElementById('bar'), prog = doc.getElementById('prog'), dock = doc.getElementById('dock'),
        burger = doc.getElementById('burger'), menu = doc.getElementById('menu'), hero = doc.querySelector('.hero');
    function onScroll() {
      var y = W.scrollY;
      if (bar) bar.classList.toggle('is-scrolled', y > 20);
      if (dock && hero) dock.classList.toggle('on', y > hero.offsetHeight * 0.65);
      if (prog) { var h = doc.documentElement.scrollHeight - W.innerHeight; prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%'; }
    }
    W.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    function toggle(open) {
      if (!menu || !burger) return;
      var isOpen = open == null ? !menu.classList.contains('is-open') : open;
      menu.classList.toggle('is-open', isOpen); burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen); menu.setAttribute('aria-hidden', !isOpen);
      doc.body.style.overflow = isOpen ? 'hidden' : '';
    }
    if (burger) burger.addEventListener('click', function () { toggle(); });
    if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggle(false); }); });
  })();

  /* ---------- Reveals + Ken-Burns ---------- */
  (function reveals() {
    var els = [].slice.call(doc.querySelectorAll('.reveal'));
    var kbs = [].slice.call(doc.querySelectorAll('.kb'));
    if (reduce || !('IntersectionObserver' in W)) {
      els.forEach(function (e) { e.classList.add('is-in'); });
      kbs.forEach(function (e) { e.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io2.unobserve(en.target); } });
    }, { threshold: 0.1 });
    kbs.forEach(function (e) { io2.observe(e); });
    // Backstop: never leave content hidden if IO misbehaves
    setTimeout(function () { els.forEach(function (e) { e.classList.add('is-in'); }); kbs.forEach(function (e) { e.classList.add('is-in'); }); }, 3500);
  })();

  /* ---------- Before / after slider ---------- */
  (function ba() {
    var frame = doc.getElementById('baFrame'), before = doc.getElementById('baBefore'), handle = doc.getElementById('baHandle');
    if (!frame || !before || !handle) return;
    var pct = 50, nudged = false, drag = false;
    function set(p) { pct = Math.max(2, Math.min(98, p)); before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)'; handle.style.left = pct + '%'; }
    function fromX(x) { var r = frame.getBoundingClientRect(); set(((x - r.left) / r.width) * 100); }
    function down(e) { drag = true; fromX((e.touches ? e.touches[0] : e).clientX); if (e.cancelable) e.preventDefault(); }
    function move(e) { if (!drag) return; fromX((e.touches ? e.touches[0] : e).clientX); }
    function up() { drag = false; }
    handle.addEventListener('mousedown', down); frame.addEventListener('mousedown', down);
    W.addEventListener('mousemove', move); W.addEventListener('mouseup', up);
    handle.addEventListener('touchstart', down, { passive: false }); frame.addEventListener('touchstart', down, { passive: false });
    W.addEventListener('touchmove', move, { passive: true }); W.addEventListener('touchend', up);
    handle.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') set(pct - 4); if (e.key === 'ArrowRight') set(pct + 4); });
    set(50);
    if (!reduce && 'IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting && !nudged) { nudged = true; var s = Date.now(); (function a() { var k = (Date.now() - s) / 900; if (k < 1) { set(50 + Math.sin(k * Math.PI) * 14); requestAnimationFrame(a); } else set(50); })(); } }); }, { threshold: 0.5 });
      io.observe(frame);
    }
  })();

  /* ---------- Training video (desktop + motion only; poster elsewhere) ---------- */
  (function trainVideo() {
    var v = doc.querySelector('.train__video'); if (!v) return;
    if (reduce) { v.removeAttribute('autoplay'); try { v.pause(); } catch (e) {} return; } // poster only for reduced motion
    var play = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
    play();
    v.addEventListener('canplay', play, { once: true });
    v.addEventListener('loadeddata', play, { once: true });
    doc.addEventListener('touchstart', play, { once: true, passive: true });
  })();

  /* ---------- Calendly ---------- */
  (function calendly() {
    var loaded = false;
    function load(cb) {
      if (loaded) return cb && cb();
      var css = doc.createElement('link'); css.rel = 'stylesheet'; css.href = 'https://assets.calendly.com/assets/external/widget.css'; doc.head.appendChild(css);
      var s = doc.createElement('script'); s.src = 'https://assets.calendly.com/assets/external/widget.js'; s.async = true;
      s.onload = function () { loaded = true; cb && cb(); };
      s.onerror = function () { markFail(); };
      doc.head.appendChild(s);
      setTimeout(function () { if (!W.Calendly && !loaded) markFail(); }, 6000);
    }
    function markFail() { var w = doc.getElementById('calWrap'); if (w) w.classList.add('cal-failed'); }
    var url = CAL + '?hide_gdpr_banner=1&background_color=10151F&text_color=E9E4DA&primary_color=86AECB';
    doc.querySelectorAll('[data-cal]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); load(function () { if (W.Calendly) W.Calendly.initPopupWidget({ url: url }); else W.open(CAL, '_blank'); }); });
    });
    var inline = doc.getElementById('calInline');
    if (inline && 'IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (!en.isIntersecting) return; io.disconnect();
          load(function () { var wrap = doc.getElementById('calWrap'); if (W.Calendly) { W.Calendly.initInlineWidget({ url: url, parentElement: inline }); if (wrap) wrap.classList.add('is-ready'); } else if (wrap) wrap.classList.add('cal-failed'); });
        });
      }, { rootMargin: '400px' });
      io.observe(inline);
    }
  })();
})();
