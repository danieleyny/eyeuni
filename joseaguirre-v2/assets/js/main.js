/* Jose Aguirre V2 — "The Lookbook". Vanilla JS. */
(function () {
  'use strict';
  var doc = document, W = window;
  var reduce = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = W.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var CAL_URL = 'https://calendly.com/joseaguirrefitness/onlinecoaching';
  var CAL_THEME = '?hide_gdpr_banner=1&background_color=f5f1ea&text_color=16130f&primary_color=96703c';

  var EN = {
    'meta.desc': 'Online 1:1 coaching for men 30+. Feel good in your body again — lose fat without living at the gym, with a sustainable method. Lima, since 2013.',
    'loader.sub': 'Lima · Online coaching', 'a11y.skip': 'Skip to content',
    'cta.book': 'Book your call', 'cta.bookShort': 'Book',
    'rail.0': '00 Home', 'rail.1': '01 Philosophy', 'rail.2': '02 Method', 'rail.3': '03 Story', 'rail.4': '04 Results', 'rail.5': '05 Coaching',
    'rail.1b': 'Philosophy', 'rail.2b': 'Method', 'rail.3b': 'Story', 'rail.4b': 'Results', 'rail.5b': 'Coaching',
    'hero.eyebrow': 'Fat-loss coach · Lima, Peru',
    'hero.h1a': 'Feel', 'hero.h1b': 'good again', 'hero.h1c': 'in your body.',
    'hero.sub': 'I help men 30+ lose fat without living at the gym — and build a lean, athletic physique they can keep.',
    'hero.cta2': 'See the method',
    'manif.full': 'Most men don’t want a huge physique. They want to feel good again.',
    'chead.philo': 'Philosophy', 'chead.method': 'The method', 'chead.story': 'Story · Since 2013', 'chead.results': 'Results', 'chead.coaching': 'Coaching',
    'philo.cap': '— 01 · Lima, today',
    'philo.h2a': 'A method that', 'philo.h2b': 'fits your life.',
    'philo.p1': 'I don’t believe in punishing diets or impossible routines. I believe in a method that fits your work, your family and your life — for good.',
    'philo.s1': 'The goal isn’t a magazine-cover body. It’s feeling strong, light and full of energy.',
    'philo.s2': 'And, above all, never losing it again. What you can’t sustain doesn’t count.',
    'method.s1t': 'We assess', 'method.s1b': 'Your composition, habits, schedule and real goal. Nothing gets programmed until it’s understood.',
    'method.s2t': 'You train smart', 'method.s2b': 'Sessions built around your time, not your exhaustion.',
    'method.s3t': 'You eat without suffering', 'method.s3b': 'Flexible nutrition that fits your life — no absurd bans.',
    'method.s4t': 'You keep it', 'method.s4b': 'Habits that stay for good, not one more diet.',
    'story.h2a': 'From that kid in Lima', 'story.h2b': 'to the coach I am today.',
    'story.lead': '13 years learning what really works — testing, correcting, coaching real men with busy lives.',
    'tl.n1': '— 03 · Lima, where it started', 'tl.n2': 'First clients, first transformations.', 'tl.n3': '100% online coaching — for men 30+.', 'tl.n4': 'A method that lasts, for life.', 'tl.today': 'Today',
    'break.cap': 'Consistency, not perfection.',
    'res.before': 'Before', 'res.after': 'After',
    'res.q1a': '“I recognised myself', 'res.q1b': 'in the mirror again — and', 'res.q1c': 'this time I didn’t gain it back.”',
    'sr.community': 'community', 'sr.since': 'Since 2013', 'sr.sinceL': 'training', 'sr.online': 'online',
    'coach.h2a': 'A 1:1 program,', 'coach.h2b': 'made for you.',
    'coach.f1': 'Personalised plan', 'coach.f2': 'Flexible nutrition', 'coach.f3': 'Weekly check-ins', 'coach.f4': 'Direct support with me', 'coach.f5': 'Built around your life',
    'coach.note': 'By application — first a call to see if we’re a fit. No commitment.',
    'coach.loading': 'Loading calendar…', 'coach.fbtitle': 'Book your free call', 'coach.fbsub': '15 minutes, no commitment — let’s see if we’re a fit.', 'coach.fallback': 'Open the calendar in a new tab',
    'faq.kicker': 'Questions', 'faq.h2': 'What I get asked most.',
    'faq.q1': 'Do I need a gym?', 'faq.a1': 'Not required. I adapt the plan to what you have — gym, home or minimal equipment. What matters is that it’s sustainable for you.',
    'faq.q2': 'How much time per day?', 'faq.a2': 'Less than you think. Efficient 30–45 min sessions that fit your schedule.',
    'faq.q3': 'Does it work at 40 or 50+?', 'faq.a3': 'That’s exactly who I work with. The method adjusts to your age, recovery and starting point.',
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
  var counters, curLang = 'es';
  function splitWords(el) { var t = (el.getAttribute('data-src') || el.textContent).trim(); el.innerHTML = t.split(/\s+/).map(function (w, i) { return '<span class="mw"><span style="animation-delay:' + (i * 55) + 'ms">' + w + '</span></span>'; }).join(' '); }
  function applyLang(lang) {
    curLang = lang; var dict = lang === 'en' ? EN : ES;
    nodes.forEach(function (n) { var k = n.getAttribute('data-i18n'); if (dict[k] == null) return; var a = n.getAttribute('data-i18n-attr'); if (a) n.setAttribute(a, dict[k]); else n.textContent = dict[k]; });
    doc.querySelectorAll('[data-words]').forEach(splitWords);
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

  /* Loader */
  (function loader() {
    var el = doc.getElementById('loader'); if (!el) return;
    var seen = false; try { seen = sessionStorage.getItem('ja2b_seen') === '1'; } catch (e) {}
    function fin() { el.classList.add('is-done'); setTimeout(function () { el.classList.add('is-hidden'); }, 850); try { sessionStorage.setItem('ja2b_seen', '1'); } catch (e) {} }
    if (seen || reduce) { el.classList.add('is-done', 'is-hidden'); return; }
    var minShow = 1500, start = Date.now(), done = false;
    function go() { if (done) return; done = true; setTimeout(fin, Math.max(0, minShow - (Date.now() - start))); }
    if (doc.readyState === 'complete') go(); else W.addEventListener('load', go, { once: true });
    setTimeout(go, 2200);
  })();

  /* Top bar + menu */
  (function bar() {
    var b = doc.getElementById('bar');
    var os = function () { b.classList.toggle('is-scrolled', W.scrollY > 30); }; os(); W.addEventListener('scroll', os, { passive: true });
    var t = doc.getElementById('navToggle'), m = doc.getElementById('menu');
    function so(o) { doc.body.classList.toggle('menu-open', o); t.setAttribute('aria-expanded', o); m.setAttribute('aria-hidden', !o); }
    t.addEventListener('click', function () { so(!doc.body.classList.contains('menu-open')); });
    m.addEventListener('click', function (e) { if (e.target.closest('a')) so(false); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') so(false); });
  })();

  /* Anchor scroll */
  (function anchors() {
    var bh = function () { return parseInt(getComputedStyle(doc.documentElement).getPropertyValue('--bar-h'), 10) || 74; };
    doc.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) { var id = a.getAttribute('href'); if (id.length < 2) return; var tg = doc.querySelector(id); if (!tg) return; e.preventDefault(); W.scrollTo({ top: tg.getBoundingClientRect().top + W.scrollY - bh() - 8, behavior: reduce ? 'auto' : 'smooth' }); });
    });
  })();

  /* Reveals + counters */
  counters = [].slice.call(doc.querySelectorAll('.count'));
  function runCount(el) { if (el._done) return; el._done = true; if (reduce) { el.textContent = (+el.dataset.to).toLocaleString('es-ES') + (el.dataset.suffix || ''); return; } var to = +el.dataset.to, t0 = null; (function t(now) { if (t0 === null) t0 = now; var p = Math.min(1, (now - t0) / 1500); el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * to).toLocaleString('es-ES') + (el.dataset.suffix || ''); if (p < 1) requestAnimationFrame(t); })(performance.now()); }
  (function reveals() {
    var items = doc.querySelectorAll('.reveal, .reveal-img, .linem, .manifesto, .timeline');
    if (reduce || !('IntersectionObserver' in W)) { items.forEach(function (el) { el.classList.add('is-in'); }); counters.forEach(runCount); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (!e.isIntersecting) return; var el = e.target; var sibs = [].slice.call(el.parentNode.querySelectorAll(':scope > .reveal')); var i = sibs.indexOf(el); if (i > 0) el.style.transitionDelay = Math.min(i * 60, 320) + 'ms'; el.classList.add('is-in'); el.querySelectorAll && el.querySelectorAll('.count').forEach(runCount); io.unobserve(el); });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
    counters.forEach(function (el) { io.observe(el.closest('.sr') || el); });
  })();

  /* Scroll-spy rail */
  (function spy() {
    var links = doc.querySelectorAll('.rail a'), secs = doc.querySelectorAll('[data-chapter]'); if (!links.length) return;
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { var i = +e.target.dataset.chapter; links.forEach(function (a, idx) { a.classList.toggle('is-active', idx === i); }); } }); }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    secs.forEach(function (s) { io.observe(s); });
  })();

  /* Ticker */
  (function ticker() {
    var t = doc.getElementById('ticker'); if (!t) return;
    var ph = ['Sostenible, no extremo', 'Para hombres +30', 'Sin vivir en el gimnasio', 'Vida real', 'Lima · desde 2013', 'Volver a sentirte bien'];
    var html = ph.map(function (p) { return '<span class="ticker__i">' + p + '</span>'; }).join('');
    t.innerHTML = html + html;
  })();

  /* Método — horizontal pin (desktop) / carousel dots (mobile) */
  (function metodo() {
    var sec = doc.getElementById('c02'), track = doc.getElementById('metodoTrack'), barI = doc.getElementById('metodoBar'), dotsW = doc.getElementById('metodoDots');
    if (!sec || !track) return;
    var desk = W.matchMedia('(min-width:1080px)');
    var panels = track.querySelectorAll('.mpanel').length;
    function onScroll() {
      if (!desk.matches || reduce) { track.style.transform = ''; return; }
      var r = sec.getBoundingClientRect(), h = sec.offsetHeight - W.innerHeight;
      var p = h > 0 ? Math.max(0, Math.min(1, -r.top / h)) : 0;
      track.style.transform = 'translate3d(-' + (p * (panels - 1) * 100) + 'vw,0,0)';
      if (barI) barI.style.width = ((1 / panels) * 100 + p * (1 - 1 / panels) * 100) + '%';
    }
    W.addEventListener('scroll', function () { requestAnimationFrame(onScroll); }, { passive: true });
    W.addEventListener('resize', onScroll); onScroll();
    if (dotsW) {
      for (var i = 0; i < panels; i++) { var b = doc.createElement('b'); if (i === 0) b.className = 'on'; dotsW.appendChild(b); }
      var dots = dotsW.querySelectorAll('b');
      track.addEventListener('scroll', function () { if (desk.matches) return; var w = track.querySelector('.mpanel').getBoundingClientRect().width + 0.001; var idx = Math.round(track.scrollLeft / w); dots.forEach(function (d, k) { d.classList.toggle('on', k === idx); }); }, { passive: true });
    }
  })();

  /* Before/After slider + nudge */
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

  /* Drag-to-scroll for filmstrip (desktop) */
  (function drag() {
    if (!fine) return;
    doc.querySelectorAll('.filmstrip').forEach(function (g) {
      var down = false, sx = 0, sl = 0, moved = 0;
      g.addEventListener('pointerdown', function (e) { down = true; moved = 0; sx = e.clientX; sl = g.scrollLeft; g.style.cursor = 'grabbing'; });
      W.addEventListener('pointermove', function (e) { if (!down) return; var d = e.clientX - sx; moved += Math.abs(d); g.scrollLeft = sl - d; });
      W.addEventListener('pointerup', function () { down = false; g.style.cursor = ''; });
      g.addEventListener('click', function (e) { if (moved > 8) e.preventDefault(); }, true);
      g.style.cursor = 'grab';
    });
  })();

  /* Parallax on break image */
  (function parallax() {
    if (reduce) return; var img = doc.querySelector('.break img'); if (!img) return; var ticking = false;
    function upd() { var r = img.getBoundingClientRect(), vh = W.innerHeight; if (r.bottom > 0 && r.top < vh) { var prog = (r.top + r.height / 2 - vh / 2) / vh; img.style.transform = 'translateY(' + (prog * 28) + 'px) scale(1.09)'; } ticking = false; }
    img.style.transform = 'scale(1.09)'; W.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
  })();

  /* Magnetic CTA */
  if (fine && !reduce) {
    doc.querySelectorAll('.btn--mag').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) { var r = btn.getBoundingClientRect(); btn.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) / (r.width / 2) * 6) + 'px,' + ((e.clientY - r.top - r.height / 2) / (r.height / 2) * 5) + 'px)'; });
      btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    });
  }

  /* FAQ single-open */
  (function faq() { var l = doc.querySelectorAll('.faq__list .ac'); l.forEach(function (d) { d.addEventListener('toggle', function () { if (d.open) l.forEach(function (o) { if (o !== d) o.open = false; }); }); }); })();

  /* Sticky mobile bar */
  (function bookbar() { var bar = doc.getElementById('bookbar'), hero = doc.querySelector('.hero'); if (!bar || !hero) return; var os = function () { bar.classList.toggle('on', W.scrollY > hero.offsetHeight * 0.7); }; os(); W.addEventListener('scroll', os, { passive: true }); })();

  /* Calendly */
  (function calendly() {
    doc.querySelectorAll('[data-cal]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); if (W.Calendly && Calendly.initPopupWidget) Calendly.initPopupWidget({ url: CAL_URL + CAL_THEME }); else W.open(CAL_URL, '_blank'); }); });
    var inline = doc.getElementById('calInline'), wrap = doc.querySelector('.coaching__cal'), settled = false, tries = 0;
    function d(fail) { if (settled) return; settled = true; wrap.classList.add('is-ready'); if (fail) wrap.classList.add('cal-failed'); }
    (function init() {
      if (W.Calendly && Calendly.initInlineWidget) { if (inline.dataset.init) return; inline.dataset.init = '1'; Calendly.initInlineWidget({ url: CAL_URL + CAL_THEME, parentElement: inline }); var iv = setInterval(function () { var f = inline.querySelector('iframe'); if (f) { f.addEventListener('load', function () { d(false); }); clearInterval(iv); } }, 150); setTimeout(function () { d(false); }, 4500); return; }
      if (++tries < 28) setTimeout(init, 200);
    })();
    setTimeout(function () { if (!inline.querySelector('iframe')) d(true); }, 5500);
  })();

  var y = doc.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
