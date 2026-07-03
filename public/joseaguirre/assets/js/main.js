/* Jose Aguirre — "Athletic Performance System" (Option A). Vanilla JS. */
(function () {
  'use strict';
  var doc = document, W = window;
  var reduce = W.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var CAL = 'https://calendly.com/joseaguirrefitness/onlinecoaching';

  /* ---------- i18n ---------- */
  var EN = {
    'meta.desc': 'Online coaching system for men 30+. Lose fat without living at the gym and keep an athletic body. Lima, since 2013.',
    'a11y.skip': 'Skip to content',
    'loader.sys': 'Loading system',
    'nav.system': 'System', 'nav.results': 'Results', 'nav.coach': 'Coach', 'nav.program': 'Program', 'nav.faq': 'FAQ',
    'cta.book': 'Book your call',
    'hero.eyebrow': 'Lima, Peru · Since 2013 · Online coaching',
    'hero.h1a': 'Lose fat.', 'hero.h1b': 'Without living', 'hero.h1c': 'at the gym.',
    'hero.sub': 'A system for men 30+ who want to feel strong, light and energized again — and keep it.',
    'hero.cta2': 'See the system',
    'score.community': 'Community', 'score.years': 'Years', 'score.men': 'Men', 'score.online': 'Online',
    'fit.kicker': 'Qualification', 'fit.h2': 'Is it for you?',
    'fit.yes': 'It’s for you if', 'fit.no': 'It’s not for you if',
    'fit.y1': 'You’re 30+ and want to get back in shape.',
    'fit.y2': 'You tried it alone and it didn’t stick.',
    'fit.y3': 'You want something sustainable, not a crash diet.',
    'fit.y4': 'You’re short on time and need a clear plan.',
    'fit.n1': 'You want a miracle transformation in 30 days.',
    'fit.n2': 'You want to live inside the gym.',
    'fit.n3': 'You’re not ready to be consistent.',
    'fit.n4': 'You want shortcuts instead of a method.',
    'sys.kicker': 'The system', 'sys.h2': 'Four phases. One method.', 'sys.protocol': 'Protocol',
    'sys.p1t': 'Assess', 'sys.p1d': 'Your starting point — composition, habits and schedule. No guessing.',
    'sys.p2t': 'Train', 'sys.p2d': 'Smart sessions, built for your time — not for your exhaustion.',
    'sys.p3t': 'Nourish', 'sys.p3d': 'Flexible nutrition that fits your life. No punishment, no absurd bans.',
    'sys.p4t': 'Sustain', 'sys.p4d': 'Habits that stay for good. The goal isn’t to start — it’s to not stop.',
    'break.t': 'Consistency', 'break.t2': 'perfection',
    'res.kicker': 'Results', 'res.h2': 'The scoreboard doesn’t lie.',
    'res.s1': 'Average', 'res.s2': 'Weeks', 'res.s3': 'Keep it off',
    'res.before': 'Before', 'res.after': 'After',
    'res.quote': '“I recognized myself again — and this time I didn’t gain it back.”',
    'res.loss': 'Every week you wait is a week you don’t get back. The best time to start was yesterday. The second best is today.',
    'coach.kicker': 'Your coach', 'coach.h2': 'A coach in your corner.',
    'coach.p1': '13 years helping men 30+ get back in shape without putting their life on hold. I don’t believe in punishing diets or impossible routines — I believe in a method that fits you and that you can sustain.',
    'coach.t1': 'I started', 'coach.t2': '+250 men',
    'coach.sig': '“I won’t promise you abs in 30 days. I’ll teach you to keep them for life.”',
    'tst.kicker': 'Testimonials',
    'tst.q1': 'I lost 12 kilos without giving up nights out with friends. Finally something I can keep.',
    'tst.q2': 'I thought it was too late at my age. I was wrong. I have more energy now than at 25.',
    'tst.q3': 'I train 3 times a week, eat normally, and keep losing. It’s a system, not a diet.',
    'prog.kicker': 'The program', 'prog.h2': '1:1 online coaching.',
    'prog.scarcity': 'Limited spots · By application',
    'prog.f1': 'Personalized training plan',
    'prog.f2': 'Flexible nutrition built for you',
    'prog.f3': 'Weekly tracking and adjustments',
    'prog.f4': 'Direct contact with me',
    'prog.f5': 'A method that adapts to your life',
    'prog.note': 'First a call to see if we’re a fit. No commitment.',
    'prog.loading': 'Loading calendar…',
    'prog.fbt': 'Book your free call', 'prog.fbsub': '15 minutes, no commitment.', 'prog.fblink': 'Open calendar',
    'faq.h2': 'Frequently asked.',
    'faq.q1': 'Do I need to go to a gym?', 'faq.a1': 'Not required. I adapt the plan to what you have — gym, home or minimal equipment. What matters is that it’s sustainable for you.',
    'faq.q2': 'How much time do I need a day?', 'faq.a2': 'Less than you think. Efficient 30–45 minute sessions that fit your schedule.',
    'faq.q3': 'Does it work if I’m 40+ or 50+?', 'faq.a3': 'That’s exactly who I work with. The method adjusts to your age, recovery and starting point.',
    'faq.q4': 'How does online coaching work?', 'faq.a4': 'You get your plan, weekly tracking and direct contact with me. We adjust as we go.',
    'faq.q5': 'What if I travel or have little time?', 'faq.a5': 'The plan adapts to real life: travel, hotels, dinners out. No excuses, but no punishment either.',
    'faq.q6': 'What happens on the call?', 'faq.a6': 'We talk about your situation and goal, and see if we’re a fit. No pressure.',
    'final.h2': 'Start today.', 'final.sub': 'Book a free call. No commitment.'
  };
  var TICKER = {
    es: ['Físico sostenible', 'Sin vivir en el gimnasio', 'Para hombres +30', 'Volver a sentirte bien', 'Un sistema, no una dieta'],
    en: ['Sustainable body', 'Without living at the gym', 'For men 30+', 'Feel good again', 'A system, not a diet']
  };
  var TITLE = { es: 'Jose Aguirre — Sistema de Pérdida de Grasa · Lima', en: 'Jose Aguirre — Fat-Loss System · Lima' };

  var nodes = [].slice.call(doc.querySelectorAll('[data-i18n]'));
  var ES = {};
  nodes.forEach(function (n) { var k = n.getAttribute('data-i18n'), a = n.getAttribute('data-i18n-attr'); ES[k] = a ? n.getAttribute(a) : n.textContent; });
  var counters;
  function buildTicker(lang) {
    var t = doc.getElementById('ticker'); if (!t) return;
    var one = (TICKER[lang] || TICKER.es).map(function (p) { return '<span class="ticker__i">' + p + '</span>'; }).join('');
    t.innerHTML = one + one + one + one;
  }
  function applyLang(lang) {
    var dict = lang === 'en' ? EN : ES;
    nodes.forEach(function (n) { var k = n.getAttribute('data-i18n'); if (dict[k] == null) return; var a = n.getAttribute('data-i18n-attr'); if (a) n.setAttribute(a, dict[k]); else n.textContent = dict[k]; });
    buildTicker(lang);
    doc.documentElement.lang = lang; doc.title = TITLE[lang] || TITLE.es;
    doc.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('is-active', b.dataset.lang === lang); });
    if (counters) counters.forEach(function (el) { if (el._done) el.textContent = fmt(el); });
    try { localStorage.setItem('ja1_lang', lang); } catch (e) {}
  }
  (function initLang() {
    var q = new URLSearchParams(location.search).get('lang'), s; try { s = localStorage.getItem('ja1_lang'); } catch (e) {}
    applyLang(q === 'en' || q === 'es' ? q : (s || 'es'));
    doc.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { applyLang(b.dataset.lang); }); });
  })();

  /* ---------- Loader ---------- */
  (function loader() {
    var el = doc.getElementById('loader'), bar = doc.getElementById('loaderBar'), num = doc.getElementById('loaderNum');
    if (!el) return;
    if (reduce) { el.classList.add('is-done'); return; }
    var p = 0, done = false;
    var iv = setInterval(function () {
      p += Math.max(2, (100 - p) * 0.12);
      if (p >= 100) { p = 100; clearInterval(iv); finish(); }
      if (bar) bar.style.width = p + '%';
      if (num) num.textContent = ('0' + Math.round(p)).slice(-2);
    }, 45);
    function finish() { if (done) return; done = true; setTimeout(function () { el.classList.add('is-done'); }, 200); }
    setTimeout(finish, 2200);
    W.addEventListener('load', function () { setTimeout(finish, 300); });
  })();

  /* ---------- Nav / menu / action bar / progress ---------- */
  (function chrome() {
    var nav = doc.getElementById('nav'), burger = doc.getElementById('burger'), menu = doc.getElementById('menu'),
        bar = doc.getElementById('actionbar'), prog = doc.getElementById('prog'), hero = doc.querySelector('.hero');
    function onScroll() {
      var y = W.scrollY;
      if (nav) nav.classList.toggle('is-scrolled', y > 20);
      if (bar && hero) bar.classList.toggle('on', y > hero.offsetHeight * 0.6);
      if (prog) { var h = doc.documentElement.scrollHeight - W.innerHeight; prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%'; }
    }
    W.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    function toggleMenu(open) {
      if (!menu || !burger) return;
      var isOpen = open == null ? !menu.classList.contains('is-open') : open;
      menu.classList.toggle('is-open', isOpen); burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen); menu.setAttribute('aria-hidden', !isOpen);
      doc.body.style.overflow = isOpen ? 'hidden' : '';
    }
    if (burger) burger.addEventListener('click', function () { toggleMenu(); });
    if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggleMenu(false); }); });
  })();

  /* ---------- Counters ---------- */
  function fmt(el) {
    var lang = doc.documentElement.lang;
    var v = (+el.dataset.to).toLocaleString(lang === 'en' ? 'en-US' : 'es-ES');
    return (el.dataset.prefix || '') + v + (el.dataset.suffix || '');
  }
  counters = [].slice.call(doc.querySelectorAll('.num'));
  (function countUp() {
    function run(el) {
      if (el._done) return; el._done = true;
      var to = +el.dataset.to, t0 = null, dur = 1300;
      if (reduce) { el.textContent = fmt(el); return; }
      function step(t) {
        if (!t0) t0 = t; var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        var cur = Math.round(to * e);
        el.textContent = (el.dataset.prefix || '') + cur.toLocaleString(doc.documentElement.lang === 'en' ? 'en-US' : 'es-ES') + (el.dataset.suffix || '');
        if (k < 1) requestAnimationFrame(step); else el.textContent = fmt(el);
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in W)) { counters.forEach(run); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }); }, { threshold: 0.4 });
    counters.forEach(function (el) { io.observe(el); });
    // Backstop: never leave a counter stuck at 0 if IO misbehaves
    setTimeout(function () { counters.forEach(function (el) { if (!el._done) { el._done = true; el.textContent = fmt(el); } }); }, 5000);
  })();

  /* ---------- Protocol phases ---------- */
  (function protocol() {
    var list = doc.getElementById('sysList'); if (!list) return;
    var phases = [].slice.call(list.querySelectorAll('.phase'));
    var imgs = [].slice.call(doc.querySelectorAll('.sys__img'));
    var meta = doc.getElementById('sysMeta');
    function open(i) {
      phases.forEach(function (p, idx) { var on = idx === i; p.classList.toggle('is-open', on); p.setAttribute('aria-expanded', on); });
      imgs.forEach(function (m, idx) { m.classList.toggle('is-on', idx === i); });
      if (meta) meta.textContent = ('0' + (i + 1)).slice(-2) + ' / 04';
    }
    phases.forEach(function (p, i) { p.addEventListener('click', function () { open(i); }); });
    open(0);
  })();

  /* ---------- Before / after slider ---------- */
  (function ba() {
    var frame = doc.getElementById('baFrame'), before = doc.getElementById('baBefore'), handle = doc.getElementById('baHandle');
    if (!frame || !before || !handle) return;
    var pct = 50, nudged = false;
    function set(p) { pct = Math.max(2, Math.min(98, p)); before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)'; handle.style.left = pct + '%'; }
    function fromX(x) { var r = frame.getBoundingClientRect(); set(((x - r.left) / r.width) * 100); }
    var drag = false;
    function down(e) { drag = true; fromX((e.touches ? e.touches[0] : e).clientX); e.preventDefault(); }
    function move(e) { if (!drag) return; fromX((e.touches ? e.touches[0] : e).clientX); }
    function up() { drag = false; }
    handle.addEventListener('mousedown', down); frame.addEventListener('mousedown', down);
    W.addEventListener('mousemove', move); W.addEventListener('mouseup', up);
    handle.addEventListener('touchstart', down, { passive: false }); frame.addEventListener('touchstart', down, { passive: false });
    W.addEventListener('touchmove', move, { passive: true }); W.addEventListener('touchend', up);
    handle.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') set(pct - 4); if (e.key === 'ArrowRight') set(pct + 4); });
    set(50);
    if (!reduce && 'IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting && !nudged) { nudged = true; var s = Date.now(); (function a() { var k = (Date.now() - s) / 700; if (k < 1) { set(50 + Math.sin(k * Math.PI) * 16); requestAnimationFrame(a); } else set(50); })(); } }); }, { threshold: 0.5 });
      io.observe(frame);
    }
  })();

  /* ---------- Testimonials carousel ---------- */
  (function tst() {
    var track = doc.getElementById('tstTrack'), prev = doc.getElementById('tstPrev'), next = doc.getElementById('tstNext'), dotsW = doc.getElementById('tstDots');
    if (!track) return;
    var items = track.children.length, i = 0;
    if (dotsW) for (var d = 0; d < items; d++) { var b = doc.createElement('b'); b.dataset.i = d; dotsW.appendChild(b); }
    var dots = dotsW ? [].slice.call(dotsW.children) : [];
    function go(n) { i = (n + items) % items; track.style.transform = 'translateX(-' + (i * 100) + '%)'; dots.forEach(function (dd, idx) { dd.classList.toggle('on', idx === i); }); }
    if (prev) prev.addEventListener('click', function () { go(i - 1); });
    if (next) next.addEventListener('click', function () { go(i + 1); });
    dots.forEach(function (dd) { dd.addEventListener('click', function () { go(+dd.dataset.i); }); });
    var x0 = null;
    track.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); x0 = null; });
    go(0);
  })();

  /* ---------- Reveals ---------- */
  (function reveals() {
    var els = [].slice.call(doc.querySelectorAll('.shead, .fit__cols, .sys__list, .res__stats, .res__grid, .coach__grid, .prog__grid, .faq__list, .final .wrap'));
    els.forEach(function (e) { e.classList.add('reveal'); });
    if (reduce || !('IntersectionObserver' in W)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }); }, { threshold: 0.14 });
    els.forEach(function (e) { io.observe(e); });
    // Backstop: never leave content hidden if IO misbehaves
    setTimeout(function () { els.forEach(function (e) { e.classList.add('is-in'); }); }, 3500);
    // hero headline clip reveal
    doc.querySelectorAll('.hero__h1 .l').forEach(function (l, i) { l.classList.add('clip'); setTimeout(function () { l.classList.add('is-in'); }, 300 + i * 120); });
  })();

  /* ---------- Calendly ---------- */
  (function calendly() {
    var loaded = false, failed = false;
    function load(cb) {
      if (loaded) return cb && cb();
      var css = doc.createElement('link'); css.rel = 'stylesheet'; css.href = 'https://assets.calendly.com/assets/external/widget.css'; doc.head.appendChild(css);
      var s = doc.createElement('script'); s.src = 'https://assets.calendly.com/assets/external/widget.js'; s.async = true;
      s.onload = function () { loaded = true; cb && cb(); };
      s.onerror = function () { failed = true; markFail(); };
      doc.head.appendChild(s);
      setTimeout(function () { if (!W.Calendly && !loaded) { failed = true; markFail(); } }, 6000);
    }
    function markFail() { var w = doc.getElementById('calWrap'); if (w) w.classList.add('cal-failed'); }
    var color = { background: '0C0D0F', text: 'ECEDEA', primary: 'C8F14A' };
    var url = CAL + '?hide_gdpr_banner=1&background_color=' + color.background + '&text_color=' + color.text + '&primary_color=' + color.primary;
    doc.querySelectorAll('[data-cal]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); load(function () { if (W.Calendly) W.Calendly.initPopupWidget({ url: url }); else W.open(CAL, '_blank'); }); });
    });
    var inline = doc.getElementById('calInline');
    if (inline && 'IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (!en.isIntersecting) return; io.disconnect();
          load(function () {
            var wrap = doc.getElementById('calWrap');
            if (W.Calendly) { W.Calendly.initInlineWidget({ url: url, parentElement: inline }); if (wrap) wrap.classList.add('is-ready'); }
            else if (wrap) wrap.classList.add('cal-failed');
          });
        });
      }, { rootMargin: '400px' });
      io.observe(inline);
    }
  })();
})();
