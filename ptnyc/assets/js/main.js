/* PTNYC — interactions. Vanilla JS, no dependencies. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var doc = document;

  /* ---------- Loader ---------- */
  (function loader() {
    var el = doc.getElementById('loader');
    if (!el) return;
    var seen = false;
    try { seen = sessionStorage.getItem('ptnyc_seen') === '1'; } catch (e) {}

    function finish() {
      el.classList.add('is-done');
      el.setAttribute('aria-valuenow', '100');
      window.setTimeout(function () { el.classList.add('is-hidden'); }, 750);
      try { sessionStorage.setItem('ptnyc_seen', '1'); } catch (e) {}
    }

    if (seen || reduce) {
      // No animation on repeat visits or reduced motion — just remove it.
      el.classList.add('is-done');
      el.classList.add('is-hidden');
      return;
    }

    // Exit as soon as the page is ready, but keep the intro on screen briefly,
    // and never longer than 2.2s total.
    var minShow = 1450; // lets the mark + hairline play
    var start = Date.now();
    var done = false;
    function go() {
      if (done) return; done = true;
      var wait = Math.max(0, minShow - (Date.now() - start));
      window.setTimeout(finish, wait);
    }
    if (doc.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
    window.setTimeout(go, 2200); // hard cap
  })();

  /* ---------- Nav scroll state ---------- */
  (function navState() {
    var nav = doc.getElementById('nav');
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ---------- Mobile menu ---------- */
  (function mobileMenu() {
    var toggle = doc.getElementById('navToggle');
    var menu = doc.getElementById('mobileMenu');
    if (!toggle || !menu) return;
    function setOpen(open) {
      doc.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    toggle.addEventListener('click', function () {
      setOpen(!doc.body.classList.contains('menu-open'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && doc.body.classList.contains('menu-open')) setOpen(false);
    });
  })();

  /* ---------- Smooth anchor scroll with sticky-nav offset ---------- */
  (function anchors() {
    var navH = function () {
      var v = getComputedStyle(doc.documentElement).getPropertyValue('--nav-h');
      return parseInt(v, 10) || 72;
    };
    doc.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        var target = doc.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var y = target.getBoundingClientRect().top + window.scrollY - navH() - 6;
        window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
        history.replaceState(null, '', id);
      });
    });
  })();

  /* ---------- Scroll reveals ---------- */
  (function reveals() {
    var items = doc.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // subtle stagger for siblings sharing a parent
        var sibs = Array.prototype.slice.call(el.parentNode.querySelectorAll(':scope > .reveal'));
        var i = sibs.indexOf(el);
        el.style.transitionDelay = (i > 0 ? Math.min(i * 70, 350) : 0) + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- Booking form: validation + mailto fallback ---------- */
  (function bookingForm() {
    var form = doc.getElementById('bookingForm');
    if (!form) return;
    var status = doc.getElementById('formStatus');
    var CONTACT_EMAIL = 'hello@ptnyc.example'; // TODO: replace with the studio's real inbox

    function setErr(id, msg) {
      var field = doc.getElementById(id).closest('.field');
      field.classList.toggle('invalid', !!msg);
      var err = form.querySelector('.field__err[data-for="' + id + '"]');
      if (err) err.textContent = msg || '';
    }
    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var goal = form.goal.value.trim();
      var ok = true;
      setErr('f-name', name ? '' : (ok = false, 'Please enter your name.'));
      setErr('f-email', validEmail(email) ? '' : (ok = false, 'Please enter a valid email.'));
      setErr('f-goal', goal ? '' : (ok = false, 'A line about your goal helps.'));
      if (!ok) { status.textContent = ''; status.classList.remove('ok'); return; }

      var phone = form.phone.value.trim();
      var time = form.time.value.trim();
      var body =
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + (phone || '—') + '\n' +
        'Preferred time: ' + (time || '—') + '\n\n' +
        'Goal:\n' + goal + '\n';
      var href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent('Session enquiry — ' + name) +
        '&body=' + encodeURIComponent(body);

      status.textContent = 'Opening your email app…';
      status.classList.add('ok');
      window.location.href = href;
    });

    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        var f = input.closest('.field');
        if (f && f.classList.contains('invalid')) {
          var err = form.querySelector('.field__err[data-for="' + input.id + '"]');
          f.classList.remove('invalid');
          if (err) err.textContent = '';
        }
      });
    });
  })();

  /* ---------- Footer year ---------- */
  var y = doc.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
