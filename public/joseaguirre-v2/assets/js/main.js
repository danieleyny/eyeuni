/* Jose Aguirre V2 — light editorial. Vanilla JS. */
(function () {
  'use strict';
  var doc = document, W = window;
  var reduce = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = W.matchMedia('(hover:hover) and (pointer:fine)').matches;

  var CAL_URL = 'https://calendly.com/joseaguirrefitness/onlinecoaching';
  var CAL_THEME = '?hide_gdpr_banner=1&background_color=fbfaf7&text_color=191612&primary_color=9a7a46';

  /* ---------- i18n (ES from DOM; EN below) ---------- */
  var EN = {
    'meta.desc': 'Online 1:1 coaching for men 30+. Feel good in your body again — lose fat without living at the gym, with a sustainable method. Lima, training since 2013.',
    'loader.sub': 'Lima · Online coaching', 'a11y.skip': 'Skip to content',
    'nav.philo': 'Philosophy', 'nav.method': 'Method', 'nav.story': 'Story', 'nav.results': 'Results', 'nav.coaching': 'Coaching',
    'cta.book': 'Book your call', 'cta.bookShort': 'Book',
    'hero.eyebrow': 'Fat-loss coach · Lima, Peru',
    'hero.h1a': 'Feel good in', 'hero.h1b': 'your body again.',
    'hero.sub': 'I help men 30+ lose fat without living at the gym — and build a lean, athletic physique they can keep.',
    'hero.cta2': 'See the method', 'hero.cred': 'Online 1:1 · Training since 2013',
    'manif.a': 'Most men don’t want', 'manif.b': 'a huge physique.', 'manif.c': 'They want to feel good again.',
    'chap.philo': 'Philosophy', 'chap.method': 'The method', 'chap.story': 'Story · Since 2013', 'chap.results': 'Results', 'chap.coaching': 'Coaching',
    'philo.h2a': 'A method that', 'philo.h2b': 'fits your life.',
    'philo.p1': 'I don’t believe in punishing diets or impossible routines. I believe in a method that fits your work, your family and your life — for good.',
    'philo.p2': 'The goal isn’t a magazine-cover body. It’s feeling strong, light and full of energy — and never losing it again.',
    'cred.community': 'community', 'cred.since': 'Since 2013', 'cred.sinceL': 'training', 'cred.online': 'online coaching', 'cred.age': 'the age I understand best',
    'method.h2': 'Four steps. No shortcuts.',
    'method.s1t': 'We assess', 'method.s1b': 'Your composition, habits, schedule and real goal. Nothing gets programmed until it’s understood.',
    'method.s2t': 'You train smart', 'method.s2b': 'Sessions built around your time, not your exhaustion.',
    'method.s3t': 'You eat without suffering', 'method.s3b': 'Flexible nutrition that fits your life — no absurd bans.',
    'method.s4t': 'You keep it', 'method.s4b': 'Habits that stay for good, not one more diet.',
    'method.bftarget': 'sustainable target',
    'break.cap': 'Consistency, not perfection.',
    'story.cap': 'Lima, 2013 — where it all started.',
    'story.h2a': 'From that kid', 'story.h2b': 'in Lima to the', 'story.h2c': 'coach I am today.',
    'story.p1': 'Thirteen years learning what really works — and what doesn’t. Testing, correcting, coaching real men with busy lives.',
    'story.p2': 'What I learned is simple: what you can’t sustain doesn’t count. So my method is built around your life, not the other way around.',
    'res.h2': 'Real change. That lasts.', 'res.before': 'Before', 'res.after': 'After',
    'res.q1': 'I recognised myself in the mirror again — and this time I didn’t gain it back.',
    'res.q2': 'No crazy diets or hours at the gym. Finally something that fits my life.',
    'coach.h2a': 'A 1:1 program,', 'coach.h2b': 'made for you.',
    'coach.f1': 'Personalised plan', 'coach.f2': 'Flexible nutrition', 'coach.f3': 'Weekly check-ins', 'coach.f4': 'Direct support with me', 'coach.f5': 'Built around your life',
    'coach.note': 'Book a call to see if we’re a fit. No commitment.',
    'coach.loading': 'Loading calendar…', 'coach.fbtitle': 'Book your free call', 'coach.fbsub': '15 minutes, no commitment — let’s see if we’re a fit.', 'coach.fallback': 'Open the calendar in a new tab',
    'faq.kicker': 'Questions', 'faq.h2': 'What I get asked most.',
    'faq.q1': 'Do I need a gym?', 'faq.a1': 'Not required. I adapt the plan to what you have — gym, home or minimal equipment. What matters is that it’s sustainable for you.',
    'faq.q2': 'How much time do I need per day?', 'faq.a2': 'Less than you think. Efficient 30–45 min sessions that fit your schedule.',
    'faq.q3': 'Does it work if I’m 40 or 50+?', 'faq.a3': 'That’s exactly who I work with. The method adjusts to your age, recovery and starting point.',
    'faq.q4': 'How does online coaching work?', 'faq.a4': 'You get your plan, weekly check-ins and direct contact with me. We adjust as we go.',
    'faq.q5': 'What if I travel or have little time?', 'faq.a5': 'The plan adapts to your real life: travel, hotels, eating out. No excuses, but no punishment either.',
    'faq.q6': 'What happens on the call?', 'faq.a6': 'We talk about your situation and goal, and see if we’re a fit. No pressure.',
    'final.h2': 'Shall we start?', 'final.sub': 'Book a free call. No commitment.',
    'foot.loc': 'Lima, Peru · Online coaching', 'bar.title': '1:1 Coaching · start with a call'
  };
  var nodes = [].slice.call(doc.querySelectorAll('[data-i18n]'));
  var ES = {};
  nodes.forEach(function (n) { var k = n.getAttribute('data-i18n'), a = n.getAttribute('data-i18n-attr'); ES[k] = a ? n.getAttribute(a) : n.textContent; });
  var TITLE = { es: 'Jose Aguirre — Coach de Pérdida de Grasa · Lima', en: 'Jose Aguirre — Fat-Loss Coach · Lima' };
  var counters;
  function applyLang(lang) {
    W._lang = lang;
    var dict = lang === 'en' ? EN : ES;
    nodes.forEach(function (n) { var k = n.getAttribute('data-i18n'); if (dict[k] == null) return; var a = n.getAttribute('data-i18n-attr'); if (a) n.setAttribute(a, dict[k]); else n.textContent = dict[k]; });
    doc.documentElement.lang = lang; doc.title = TITLE[lang] || TITLE.es;
    doc.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('is-active', b.dataset.lang === lang); });
    if (counters) counters.forEach(function (el) { if (el._done) el.textContent = (+el.dataset.to).toLocaleString('es-ES') + (el.dataset.suffix || ''); });
    try { localStorage.setItem('ja2_lang', lang); } catch (e) {}
  }
  (function initLang() {
    var q = new URLSearchParams(location.search).get('lang'), s; try { s = localStorage.getItem('ja2_lang'); } catch (e) {}
    applyLang(q === 'en' || q === 'es' ? q : (s || 'es'));
    doc.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { applyLang(b.dataset.lang); }); });
  })();

  /* ---------- Loader ---------- */
  (function loader() {
    var el = doc.getElementById('loader'); if (!el) return;
    var seen = false; try { seen = sessionStorage.getItem('ja2_seen') === '1'; } catch (e) {}
    function finish() { el.classList.add('is-done'); setTimeout(function () { el.classList.add('is-hidden'); }, 820); try { sessionStorage.setItem('ja2_seen', '1'); } catch (e) {} }
    if (seen || reduce) { el.classList.add('is-done', 'is-hidden'); return; }
    var minShow = 1500, start = Date.now(), done = false;
    function go() { if (done) return; done = true; setTimeout(finish, Math.max(0, minShow - (Date.now() - start))); }
    if (doc.readyState === 'complete') go(); else W.addEventListener('load', go, { once: true });
    setTimeout(go, 2200);
  })();

  /* ---------- Nav + menu ---------- */
  (function nav() {
    var n = doc.getElementById('nav');
    var onScroll = function () { n.classList.toggle('is-scrolled', W.scrollY > 30); };
    onScroll(); W.addEventListener('scroll', onScroll, { passive: true });
    var t = doc.getElementById('navToggle'), m = doc.getElementById('menu');
    function setOpen(o) { doc.body.classList.toggle('menu-open', o); t.setAttribute('aria-expanded', o); m.setAttribute('aria-hidden', !o); }
    t.addEventListener('click', function () { setOpen(!doc.body.classList.contains('menu-open')); });
    m.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  })();

  /* ---------- Anchor scroll with offset ---------- */
  (function anchors() {
    var navH = function () { return parseInt(getComputedStyle(doc.documentElement).getPropertyValue('--nav-h'), 10) || 74; };
    doc.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href'); if (id.length < 2) return; var tg = doc.querySelector(id); if (!tg) return;
        e.preventDefault(); W.scrollTo({ top: tg.getBoundingClientRect().top + W.scrollY - navH() - 8, behavior: reduce ? 'auto' : 'smooth' });
      });
    });
  })();

  /* ---------- Reveals (fade, image-clip, line-mask) + counters + bf-line ---------- */
  counters = [].slice.call(doc.querySelectorAll('.count'));
  function runCount(el) {
    if (el._done) return; el._done = true;
    if (reduce) { el.textContent = (+el.dataset.to).toLocaleString('es-ES') + (el.dataset.suffix || ''); return; }
    var to = +el.dataset.to, t0 = null, D = 1500;
    (function t(now) { if (t0 === null) t0 = now; var p = Math.min(1, (now - t0) / D); el.textContent = Math.round((1 - Math.pow(1 - p, 3) ) * to).toLocaleString('es-ES') + (el.dataset.suffix || ''); if (p < 1) requestAnimationFrame(t); })(performance.now());
  }
  (function reveals() {
    var items = doc.querySelectorAll('.reveal, .reveal-img, .linem');
    if (reduce || !('IntersectionObserver' in W)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      counters.forEach(function (el) { runCount(el); });
      var bm = doc.getElementById('bfMark'); if (bm) bm.style.left = '72%';
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; var el = e.target;
        var sibs = [].slice.call(el.parentNode.querySelectorAll(':scope > .reveal'));
        var i = sibs.indexOf(el); if (i > 0) el.style.transitionDelay = Math.min(i * 60, 320) + 'ms';
        el.classList.add('is-in');
        el.querySelectorAll && el.querySelectorAll('.count').forEach(runCount);
        io.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
    counters.forEach(function (el) { io.observe(el.closest('.cstat') || el); });
    var scale = doc.querySelector('.bfline'), mark = doc.getElementById('bfMark');
    if (scale && mark) { var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { mark.style.left = '72%'; io2.unobserve(e.target); } }); }, { threshold: 0.4 }); io2.observe(scale); }
  })();

  /* ---------- Before/After slider + auto-nudge ---------- */
  (function ba() {
    var frame = doc.querySelector('.ba__frame'); if (!frame) return;
    var clip = doc.getElementById('baClip'), handle = doc.getElementById('baHandle'), dragging = false, nudged = false;
    function set(p) { p = Math.max(0, Math.min(100, p)); clip.style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)'; handle.style.left = p + '%'; handle.setAttribute('aria-valuenow', Math.round(p)); }
    function fromX(x) { var r = frame.getBoundingClientRect(); set(((x - r.left) / r.width) * 100); }
    function clr() { clip.style.transition = ''; handle.style.transition = ''; }
    frame.addEventListener('pointerdown', function (e) { nudged = true; clr(); dragging = true; handle.setPointerCapture && handle.setPointerCapture(e.pointerId); fromX(e.clientX); });
    W.addEventListener('pointermove', function (e) { if (dragging) fromX(e.clientX); });
    W.addEventListener('pointerup', function () { dragging = false; });
    handle.addEventListener('keydown', function (e) { var c = parseFloat(handle.getAttribute('aria-valuenow')) || 50; if (e.key === 'ArrowLeft') { nudged = true; clr(); set(c - 4); e.preventDefault(); } if (e.key === 'ArrowRight') { nudged = true; clr(); set(c + 4); e.preventDefault(); } });
    set(50);
    function nudge() { if (nudged || dragging) return; nudged = true; var g = 'cubic-bezier(0.22,1,0.36,1)'; clip.style.transition = 'clip-path .6s ' + g; handle.style.transition = 'left .6s ' + g; set(64); setTimeout(function () { if (!dragging) set(50); }, 660); setTimeout(clr, 1350); }
    if (!reduce && 'IntersectionObserver' in W) { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { setTimeout(nudge, 500); io.unobserve(e.target); } }); }, { threshold: 0.5 }); io.observe(frame); }
  })();

  /* ---------- Gallery drag-to-scroll (desktop) ---------- */
  (function gallery() {
    var g = doc.querySelector('.gallery'); if (!g || !finePointer) return;
    var down = false, sx = 0, sl = 0, moved = 0;
    g.addEventListener('pointerdown', function (e) { down = true; moved = 0; sx = e.clientX; sl = g.scrollLeft; g.style.cursor = 'grabbing'; });
    W.addEventListener('pointermove', function (e) { if (!down) return; var d = e.clientX - sx; moved += Math.abs(d); g.scrollLeft = sl - d; });
    W.addEventListener('pointerup', function () { down = false; g.style.cursor = ''; });
    g.addEventListener('click', function (e) { if (moved > 8) e.preventDefault(); }, true);
    g.style.cursor = 'grab';
  })();

  /* ---------- Subtle parallax on the full-bleed break image ---------- */
  (function parallax() {
    if (reduce) return;
    var img = doc.querySelector('.imgbreak img'); if (!img) return;
    var ticking = false;
    function upd() {
      var r = img.getBoundingClientRect(), vh = W.innerHeight;
      if (r.bottom > 0 && r.top < vh) { var prog = (r.top + r.height / 2 - vh / 2) / vh; img.style.transform = 'translateY(' + (prog * 26) + 'px) scale(1.08)'; }
      ticking = false;
    }
    img.style.transform = 'scale(1.08)';
    W.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  })();

  /* ---------- FAQ single-open ---------- */
  (function faq() {
    var l = doc.querySelectorAll('.faq__list .ac');
    l.forEach(function (d) { d.addEventListener('toggle', function () { if (d.open) l.forEach(function (o) { if (o !== d) o.open = false; }); }); });
  })();

  /* ---------- Sticky mobile booking bar ---------- */
  (function bookbar() {
    var bar = doc.getElementById('bookbar'), hero = doc.querySelector('.hero'); if (!bar || !hero) return;
    var onScroll = function () { bar.classList.toggle('on', W.scrollY > hero.offsetHeight * 0.7); };
    onScroll(); W.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ---------- Calendly (light popup + inline + fallback) ---------- */
  (function calendly() {
    doc.querySelectorAll('[data-cal]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); if (W.Calendly && Calendly.initPopupWidget) Calendly.initPopupWidget({ url: CAL_URL + CAL_THEME }); else W.open(CAL_URL, '_blank'); });
    });
    var inline = doc.getElementById('calInline'), wrap = doc.querySelector('.coaching__cal'), settled = false, tries = 0;
    function d(fail) { if (settled) return; settled = true; wrap.classList.add('is-ready'); if (fail) wrap.classList.add('cal-failed'); }
    (function init() {
      if (W.Calendly && Calendly.initInlineWidget) {
        if (inline.dataset.init) return; inline.dataset.init = '1';
        Calendly.initInlineWidget({ url: CAL_URL + CAL_THEME, parentElement: inline });
        var iv = setInterval(function () { var f = inline.querySelector('iframe'); if (f) { f.addEventListener('load', function () { d(false); }); clearInterval(iv); } }, 150);
        setTimeout(function () { d(false); }, 4500); return;
      }
      if (++tries < 28) setTimeout(init, 200);
    })();
    setTimeout(function () { if (!inline.querySelector('iframe')) d(true); }, 5500);
  })();

  var y = doc.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
