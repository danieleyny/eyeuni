/* ============================================
   BOAZ FITNESS STUDIOS — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // ---- Intro Animation (first-load splash) ----
  const intro = document.getElementById('intro');
  if (intro) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.add('intro-active');
    sessionStorage.setItem('boazIntroShown', '1');

    const total = reduce ? 1200 : 4400;
    let dismissed = false;

    function dismissIntro() {
      if (dismissed) return;
      dismissed = true;
      intro.classList.add('intro--out');
      document.body.classList.remove('intro-active');
      window.setTimeout(function () {
        if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
      }, 1000);
    }

    window.setTimeout(dismissIntro, total);

    // Skip on click/key after a short delay so accidental clicks during render don't dismiss
    window.setTimeout(function () {
      intro.addEventListener('click', dismissIntro);
      window.addEventListener('keydown', dismissIntro, { once: true });
    }, 600);
  }

  // ---- Navbar Scroll Behavior ----
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  const floatingCTA = document.querySelector('.floating-cta');
  let ctaPulsed = false;

  function onScroll() {
    const scrollY = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 60);
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 500);
    }
    if (floatingCTA) {
      // Show after the user scrolls past the hero so it doesn't compete with primary CTAs
      const trigger = Math.min(window.innerHeight * 0.6, 500);
      const show = scrollY > trigger;
      floatingCTA.classList.toggle('visible', show);
      if (show && !ctaPulsed) {
        ctaPulsed = true;
        floatingCTA.classList.add('pulse');
        window.setTimeout(function () { floatingCTA.classList.remove('pulse'); }, 5400);
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Hamburger Menu ----
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Scroll Reveal (Intersection Observer) ----
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var easedProgress = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(easedProgress * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq__question');
    var answer = item.querySelector('.faq__answer');

    if (btn && answer) {
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all
        faqItems.forEach(function (other) {
          other.classList.remove('open');
          var otherAnswer = other.querySelector('.faq__answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });

        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // ---- Form Validation ----
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var isValid = true;
      var requiredFields = form.querySelectorAll('[required]');

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(function (group) {
        group.classList.remove('has-error');
      });

      requiredFields.forEach(function (field) {
        var group = field.closest('.form-group');
        var value = field.value.trim();

        if (!value) {
          isValid = false;
          if (group) group.classList.add('has-error');
        }

        // Email validation
        if (field.type === 'email' && value) {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            isValid = false;
            if (group) group.classList.add('has-error');
          }
        }

        // Phone validation (basic)
        if (field.type === 'tel' && value) {
          var phoneRegex = /^[+]?[\d\s\-().]{7,}$/;
          if (!phoneRegex.test(value)) {
            isValid = false;
            if (group) group.classList.add('has-error');
          }
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Scroll to first error
        var firstError = form.querySelector('.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

  // ---- Gold Particle Effect (Hero) ----
  var canvas = document.getElementById('hero-particles');

  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 40;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.opacityDir = Math.random() > 0.5 ? 0.003 : -0.003;
    }

    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity += this.opacityDir;

      if (this.opacity <= 0.05 || this.opacity >= 0.6) {
        this.opacityDir *= -1;
      }

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201, 168, 76, ' + this.opacity + ')';
      ctx.fill();
    };

    for (var i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    var animating = true;

    // Only animate when hero is in view
    var heroSection = canvas.closest('.hero');
    if (heroSection && 'IntersectionObserver' in window) {
      var heroObserver = new IntersectionObserver(function (entries) {
        animating = entries[0].isIntersecting;
      }, { threshold: 0 });
      heroObserver.observe(heroSection);
    }

    function animateParticles() {
      if (animating) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (p) {
          p.update();
          p.draw();
        });
      }
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight + 20 : 80;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ---- Mobile CTA — scroll to nearest form ----
  var mobileCTABtn = document.querySelector('.mobile-cta .btn');
  if (mobileCTABtn) {
    mobileCTABtn.addEventListener('click', function (e) {
      var form = document.querySelector('.lead-form') || document.querySelector('.contact-form');
      if (form) {
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight + 20 : 80;
        var targetPosition = form.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  }

  // ---- Text reveal animation on hero h1 ----
  var heroH1 = document.querySelector('.hero h1');
  if (heroH1) {
    heroH1.style.opacity = '0';
    heroH1.style.transform = 'translateY(30px)';
    heroH1.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';

    requestAnimationFrame(function () {
      setTimeout(function () {
        heroH1.style.opacity = '1';
        heroH1.style.transform = 'translateY(0)';
      }, 200);
    });
  }

  // ---- Hero subheading + buttons staggered reveal ----
  var heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    var fadeItems = heroContent.querySelectorAll('.subheading, .hero__buttons, .hero__label');
    fadeItems.forEach(function (item, index) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(function () {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 500 + index * 150);
    });
  }

})();
