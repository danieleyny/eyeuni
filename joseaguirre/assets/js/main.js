/* Jose Aguirre — interactions. Vanilla JS. */
(function () {
  'use strict';
  var doc = document, W = window;
  var reduce = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = W.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ============ Calendly config (single source of truth) ============ */
  var CAL_URL = 'https://calendly.com/joseaguirrefitness/onlinecoaching';
  var CAL_THEME = '?hide_gdpr_banner=1&background_color=14161a&text_color=f4f5f7&primary_color=e8b33d';

  /* ============ i18n (ES captured from DOM; EN dictionary below) ============ */
  var EN = {
    'meta.desc': 'Online 1:1 coaching for men 30+. Lose fat without living at the gym and build a lean, sustainable physique with Jose Aguirre.',
    'loader.tag': 'Fat-Loss Coach', 'a11y.skip': 'Skip to content',
    'nav.method': 'Method', 'nav.results': 'Results', 'nav.about': 'About', 'nav.coaching': 'Coaching',
    'cta.book': 'Book your call',
    'hero.eyebrow': 'Fat-Loss Coach', 'hero.loc': 'Lima, Peru · Online coaching',
    'hero.h1a': 'Lose fat without living', 'hero.h1b': 'at the gym.',
    'hero.h1a1': 'Lose ', 'hero.h1grasa': 'fat', 'hero.h1a2': ' without living',
    'hero.sub': 'I help men 30+ build a lean, athletic physique they can actually keep — and feel good again.',
    'hero.cta': 'Book your free call', 'hero.cta2': 'See the method',
    'hero.trust': 'Online 1:1 coaching · 33,000+ men follow his method',
    'proof.loc': 'Lima, Peru · Training since 2013 · 100% online coaching',
    'proof.followers': 'followers', 'proof.clients': 'men transformed', 'proof.years': 'training since 2013', 'proof.online': 'online · at your pace',
    'prob.kicker': 'Who it’s for',
    'prob.h2': 'You’re 30+, you’ve tried everything… and nothing sticks.',
    'prob.body': 'Impossible diets, two-hour workouts, plans that ignore your job, your family and your real life. You don’t need a magazine-cover body. You need a method you can sustain — and to feel strong, light and energetic again.',
    'prob.b1': 'No extreme diets', 'prob.b2': 'No living at the gym', 'prob.b3': 'No gaining it back',
    'method.kicker': 'The method', 'method.h2': 'A method that fits your real life.',
    'method.s1t': 'We assess your starting point', 'method.s1b': 'Body composition, habits, schedule and your real goal. No guessing.',
    'method.s2t': 'You train smart', 'method.s2b': 'Sessions built around your time, not your exhaustion.',
    'method.s3t': 'You eat without suffering', 'method.s3b': 'Flexible nutrition that fits your life — no absurd bans.',
    'method.s4t': 'You keep it', 'method.s4b': 'Habits that stay for good, not one more diet.',
    'method.bfcap': 'Your goal isn’t an impossible number. It’s a lean physique you can maintain.',
    'res.kicker': 'Results', 'res.h2': 'Real bodies. Changes that last.',
    'res.before': 'Before', 'res.after': 'After',
    'res.c1': 'fat lost · 5 months', 'res.c2': 'to a sustainable physique',
    'res.q1': 'I looked in the mirror and recognised myself again. And this time I didn’t gain it back.',
    'res.q2': 'No crazy diets or hours at the gym. It fit around my work and my kids.',
    'about.kicker': 'About Jose', 'about.h2': 'An athletic body, built for real life.',
    'about.loc': 'Lima, Peru · Training since 2013',
    'then.cap': 'Lima, 2013 — where it all started.',
    'about.story': 'From that kid in Lima to the coach I am today.',
    'about.p1': 'I’m an online fat-loss coach, based in Lima, Peru. I’ve been training since 2013 and have spent years helping men 30+ get back in shape without putting their life on hold — because what you can’t sustain doesn’t count.',
    'about.p2': 'Most men don’t want a huge physique. They want to feel good again: strong, light, full of energy. That’s my whole job.',
    'about.sig': 'I won’t promise you abs in 30 days. I’ll teach you to keep them for life.',
    'coach.kicker': '1:1 Coaching', 'coach.h2': 'One program. Made for you.',
    'coach.f1': 'Personalised training plan', 'coach.f2': 'Flexible nutrition, your way',
    'coach.f3': 'Weekly tracking and adjustments', 'coach.f4': 'Direct support with me',
    'coach.f5': 'Built around your time and life',
    'coach.note': 'Limited spots. First a call to see if we’re a fit — no commitment.',
    'coach.loading': 'Loading calendar…', 'coach.fallback': 'Open the calendar in a new tab',
    'cont.kicker': 'Content', 'cont.h2': 'See it in action.',
    'faq.kicker': 'Questions', 'faq.h2': 'What I get asked most.',
    'faq.q1': 'Do I need a gym?', 'faq.a1': 'Not required. I adapt the plan to what you have — gym, home or minimal equipment. What matters is that it’s sustainable for you.',
    'faq.q2': 'How much time do I need per day?', 'faq.a2': 'Less than you think. I design efficient 30–45 min sessions that fit your schedule, not your exhaustion.',
    'faq.q3': 'Does it work if I’m 40 or 50+?', 'faq.a3': 'That’s exactly who I work with. The method adjusts to your age, recovery and starting point.',
    'faq.q4': 'How does online coaching work?', 'faq.a4': 'You get your plan, weekly check-ins and direct contact with me. We adjust as we go based on your results.',
    'faq.q5': 'What if I have little time or travel a lot?', 'faq.a5': 'The plan adapts to your real life: travel, hotels, eating out. No excuses, but no punishment either.',
    'faq.q6': 'What happens on the call?', 'faq.a6': 'We talk about your situation and goal, and see if we’re a fit. No pressure, no commitment.',
    'final.h2': 'Ready to feel good again?', 'final.sub': 'Start with a free call. No commitment.',
    'bar.title': '1:1 Coaching', 'bar.sub': 'Start with a free call'
  };

  var nodes = [].slice.call(doc.querySelectorAll('[data-i18n]'));
  var ES = {};
  nodes.forEach(function (n) {
    var k = n.getAttribute('data-i18n'), attr = n.getAttribute('data-i18n-attr');
    ES[k] = attr ? n.getAttribute(attr) : n.textContent;
  });
  var TITLE = { es: 'Jose Aguirre — Coach de Pérdida de Grasa', en: 'Jose Aguirre — Fat-Loss Coach' };
  var SUF_EN = { ' años': ' yrs', ' sem': ' wks' };
  var curLang = 'es';

  function applyLang(lang) {
    curLang = lang;
    var dict = lang === 'en' ? EN : ES;
    nodes.forEach(function (n) {
      var k = n.getAttribute('data-i18n'); if (dict[k] == null) return;
      var attr = n.getAttribute('data-i18n-attr');
      if (attr) n.setAttribute(attr, dict[k]); else n.textContent = dict[k];
    });
    doc.documentElement.lang = lang;
    doc.title = TITLE[lang] || TITLE.es;
    doc.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('is-active', b.dataset.lang === lang); });
    repaintCounters();
    try { localStorage.setItem('ja_lang', lang); } catch (e) {}
  }
  (function initLang() {
    var q = new URLSearchParams(location.search).get('lang');
    var saved; try { saved = localStorage.getItem('ja_lang'); } catch (e) {}
    applyLang(q === 'en' || q === 'es' ? q : (saved || 'es'));
    doc.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.dataset.lang); });
    });
  })();

  /* ============ Loader ============ */
  (function loader() {
    var el = doc.getElementById('loader'); if (!el) return;
    var hero = doc.querySelector('.hero');
    var seen = false; try { seen = sessionStorage.getItem('ja_seen') === '1'; } catch (e) {}
    var pctEl = doc.getElementById('loaderPct'), barEl = el.querySelector('.loader__bar i');
    function setPct(v) { if (pctEl) pctEl.textContent = String(v).padStart(2, '0'); if (barEl) barEl.style.width = v + '%'; el.setAttribute('aria-valuenow', v); }
    function reveal() { if (hero) hero.classList.add('on'); }
    function finish() { setPct(100); el.classList.add('is-done'); reveal(); setTimeout(function () { el.classList.add('is-hidden'); }, 850); try { sessionStorage.setItem('ja_seen', '1'); } catch (e) {} }
    if (seen || reduce) { el.classList.add('is-done', 'is-hidden'); reveal(); return; }
    var DUR = 1200, t0 = null;
    (function tick(now) { if (t0 === null) t0 = now; var p = Math.min(1, (now - t0) / DUR); setPct(Math.round((1 - Math.pow(1 - p, 2)) * 100)); if (p < 1) requestAnimationFrame(tick); })(performance.now());
    var minShow = 1500, start = Date.now(), done = false;
    function go() { if (done) return; done = true; setTimeout(finish, Math.max(0, minShow - (Date.now() - start))); }
    if (doc.readyState === 'complete') go(); else W.addEventListener('load', go, { once: true });
    setTimeout(go, 2200);
  })();

  /* ============ Scroll progress bar ============ */
  (function scrollbar() {
    var bar = doc.getElementById('scrollbar'); if (!bar) return;
    var ticking = false;
    function update() {
      var h = doc.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? (W.scrollY / max) : 0;
      bar.style.transform = 'scaleX(' + Math.max(0, Math.min(1, p)) + ')';
      ticking = false;
    }
    update();
    W.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    W.addEventListener('resize', update, { passive: true });
  })();

  /* ============ Nav + mobile menu ============ */
  (function nav() {
    var n = doc.getElementById('nav');
    var onScroll = function () { n.classList.toggle('is-scrolled', W.scrollY > 40); };
    onScroll(); W.addEventListener('scroll', onScroll, { passive: true });
    var toggle = doc.getElementById('navToggle'), menu = doc.getElementById('menu');
    function setOpen(o) { doc.body.classList.toggle('menu-open', o); toggle.setAttribute('aria-expanded', o); menu.setAttribute('aria-hidden', !o); }
    toggle.addEventListener('click', function () { setOpen(!doc.body.classList.contains('menu-open')); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  })();

  /* ============ Smooth anchor scroll with offset ============ */
  (function anchors() {
    var navH = function () { return parseInt(getComputedStyle(doc.documentElement).getPropertyValue('--nav-h'), 10) || 72; };
    doc.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href'); if (id.length < 2) return;
        var t = doc.querySelector(id); if (!t) return;
        e.preventDefault();
        W.scrollTo({ top: t.getBoundingClientRect().top + W.scrollY - navH() - 8, behavior: reduce ? 'auto' : 'smooth' });
      });
    });
  })();

  /* ============ Reveals + trigger counters/bf-scale ============ */
  var counters = [].slice.call(doc.querySelectorAll('.count'));
  function paintCount(el, v) {
    var suf = el.dataset.suffix || '';
    if (curLang === 'en' && SUF_EN[suf]) suf = SUF_EN[suf];
    el.textContent = v.toLocaleString('es-ES') + suf;
    el._val = v;
  }
  function repaintCounters() { if (!counters) return; counters.forEach(function (el) { if (el._done) paintCount(el, +el.dataset.to); }); }
  function runCount(el) {
    if (el._done) return; el._done = true;
    if (reduce) { paintCount(el, +el.dataset.to); return; }
    var to = +el.dataset.to, t0 = null, DUR = 1400;
    (function t(now) { if (t0 === null) t0 = now; var p = Math.min(1, (now - t0) / DUR); paintCount(el, Math.round((1 - Math.pow(1 - p, 3)) * to)); if (p < 1) requestAnimationFrame(t); })(performance.now());
  }
  (function reveals() {
    var items = doc.querySelectorAll('.reveal, .mask');
    if (reduce || !('IntersectionObserver' in W)) {
      items.forEach(function (el) { el.classList.add('in'); });
      counters.forEach(function (el) { paintCount(el, +el.dataset.to); el._done = true; });
      var m = doc.getElementById('bfMarker'); if (m) m.style.left = '70%';
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var sibs = [].slice.call(el.parentNode.querySelectorAll(':scope > .reveal'));
        var i = sibs.indexOf(el);
        if (i > 0) el.style.transitionDelay = Math.min(i * 60, 300) + 'ms';
        el.classList.add('in');
        el.querySelectorAll && el.querySelectorAll('.count').forEach(runCount);
        if (el.classList.contains('count')) runCount(el);
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
    // counters may live inside .reveal (handled) or standalone
    counters.forEach(function (el) { io.observe(el); });
    // bf-scale marker
    var scale = doc.querySelector('.bfscale'), marker = doc.getElementById('bfMarker');
    if (scale && marker) {
      var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { marker.style.left = '70%'; io2.unobserve(e.target); } }); }, { threshold: 0.4 });
      io2.observe(scale);
    }
  })();

  /* ============ Before/After slider ============ */
  (function ba() {
    var frame = doc.querySelector('.ba__frame'); if (!frame) return;
    var clip = doc.getElementById('baClip'), handle = doc.getElementById('baHandle');
    var dragging = false;
    function set(pct) {
      pct = Math.max(0, Math.min(100, pct));
      clip.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      handle.style.left = pct + '%';
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }
    function fromX(clientX) { var r = frame.getBoundingClientRect(); set(((clientX - r.left) / r.width) * 100); }
    function clearGlide() { clip.style.transition = ''; handle.style.transition = ''; }
    frame.addEventListener('pointerdown', function (e) { nudged = true; clearGlide(); dragging = true; handle.setPointerCapture && handle.setPointerCapture(e.pointerId); fromX(e.clientX); });
    W.addEventListener('pointermove', function (e) { if (dragging) fromX(e.clientX); });
    W.addEventListener('pointerup', function () { dragging = false; });
    handle.addEventListener('keydown', function (e) {
      var cur = parseFloat(handle.getAttribute('aria-valuenow')) || 50;
      if (e.key === 'ArrowLeft') { nudged = true; clearGlide(); set(cur - 4); e.preventDefault(); }
      if (e.key === 'ArrowRight') { nudged = true; clearGlide(); set(cur + 4); e.preventDefault(); }
    });
    set(50);

    // Auto-nudge once on first scroll into view (50 → 63 → 50) to invite interaction.
    var nudged = false;
    function nudge() {
      if (nudged || dragging) return; nudged = true;
      var glide = 'clip-path .55s cubic-bezier(0.16,1,0.3,1)';
      clip.style.transition = glide; handle.style.transition = 'left .55s cubic-bezier(0.16,1,0.3,1)';
      set(63);
      setTimeout(function () { if (!dragging) set(50); }, 620);
      setTimeout(clearGlide, 1250);
    }
    if (!reduce && 'IntersectionObserver' in W) {
      var nio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { setTimeout(nudge, 400); nio.unobserve(e.target); } });
      }, { threshold: 0.55 });
      nio.observe(frame);
    }
  })();

  /* ============ Magnetic CTAs (desktop) ============ */
  if (finePointer && !reduce) {
    doc.querySelectorAll('.btn--mag').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        var y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.style.transform = 'translate(' + (x * 8) + 'px,' + (y * 6) + 'px)';
      });
      btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    });
  }

  /* ============ Marquee ============ */
  (function marquee() {
    var track = doc.getElementById('marquee'); if (!track) return;
    var phrases = ['Físicos reales, no de portada', 'Sostenible', 'Para hombres +30', 'Sin dietas extremas', 'Vida real', 'Coaching 1:1', 'Volver a sentirte bien', 'Atlético y ligero'];
    var html = phrases.map(function (p) { return '<span class="marquee__item">' + p + '</span>'; }).join('');
    track.innerHTML = html + html; // duplicate for seamless loop
  })();

  /* ============ FAQ: single-open ============ */
  (function faq() {
    var list = doc.querySelectorAll('.faq__list .ac');
    list.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (d.open) list.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  })();

  /* ============ Sticky mobile booking bar ============ */
  (function bookbar() {
    var bar = doc.getElementById('bookbar'), hero = doc.querySelector('.hero'); if (!bar || !hero) return;
    var onScroll = function () { bar.classList.toggle('on', W.scrollY > hero.offsetHeight * 0.6); };
    onScroll(); W.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ============ Calendly (popup + inline + skeleton) ============ */
  (function calendly() {
    doc.querySelectorAll('[data-cal]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        if (W.Calendly && Calendly.initPopupWidget) Calendly.initPopupWidget({ url: CAL_URL + CAL_THEME });
        else W.open(CAL_URL, '_blank');
      });
    });
    var inline = doc.getElementById('calInline'), wrap = doc.querySelector('.coaching__cal');
    (function init() {
      if (!W.Calendly || !Calendly.initInlineWidget) return setTimeout(init, 200);
      if (inline.dataset.init) return; inline.dataset.init = '1';
      Calendly.initInlineWidget({ url: CAL_URL + CAL_THEME, parentElement: inline });
      var iv = setInterval(function () {
        var f = inline.querySelector('iframe');
        if (f) { f.addEventListener('load', function () { wrap.classList.add('is-ready'); }); clearInterval(iv); }
      }, 150);
      setTimeout(function () { wrap && wrap.classList.add('is-ready'); }, 5000);
    })();
  })();

  var y = doc.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
