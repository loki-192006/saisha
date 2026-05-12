/* ═══════════════════════════════════════════════════════
   SAI SHA INTERIOR — World-Class Cinematic Interactions
   Enhanced Edition — Premium Motion × Luxury Feel
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     LOADER — Cinematic Reveal
  ───────────────────────────────────────── */
  const loader = document.getElementById('loader');

  window.addEventListener('load', function () {
    setTimeout(function () {
      if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
          /* Staggered hero entrance */
          const heroReveals = document.querySelectorAll('#home .reveal, .hero-section .reveal');
          heroReveals.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 180);
          });
        }, 300);
      }
    }, 2800);
  });


  /* ─────────────────────────────────────────
     SCROLL PROGRESS BAR
  ───────────────────────────────────────── */
  const scrollBar = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    if (!scrollBar) return;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    scrollBar.style.width = pct + '%';
  }


  /* ─────────────────────────────────────────
     NAVBAR SCROLL
  ───────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    navbar.classList.toggle('scrolled', y > 60);
    updateScrollProgress();
    updateParallax(y);
  }

  window.addEventListener('scroll', onScroll, { passive: true });


  /* ─────────────────────────────────────────
     MOBILE MENU
  ───────────────────────────────────────── */
  const toggle  = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', function () {
      const isOpen = toggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMenu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }


  /* ─────────────────────────────────────────
     SMOOTH SCROLL
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ─────────────────────────────────────────
     CUSTOM CURSOR (Desktop only)
  ───────────────────────────────────────── */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  if (!isTouchDevice && dot && ring) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let raf;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left  = mouseX + 'px';
      dot.style.top   = mouseY + 'px';
    });

    function animateCursor() {
      // Ring follows with smooth lag
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      raf = requestAnimationFrame(animateCursor);
    }
    animateCursor();

    /* Hover state on interactive elements */
    const hoverTargets = 'a, button, .proj-card, .svc-card, .testi-card, .btn, .navbar__link';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    });
  } else {
    // Hide cursor elements on touch
    if (dot)  dot.style.display  = 'none';
    if (ring) ring.style.display = 'none';
  }


  /* ─────────────────────────────────────────
     REVEAL ON SCROLL — Cinematic Observer
  ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;

          /* Staggered siblings: add slight delay based on index */
          const siblings = el.parentElement
            ? Array.from(el.parentElement.querySelectorAll(':scope > .reveal'))
            : [];
          const idx = siblings.indexOf(el);
          if (idx > 0) {
            el.style.transitionDelay = (idx * 0.1) + 's';
          }

          el.classList.add('visible');

          /* Trigger counters if inside stats */
          if (el.classList.contains('experience__stats') || el.closest('.experience__stats')) {
            const statsEl = el.classList.contains('experience__stats')
              ? el
              : el.closest('.experience__stats');
            startCounters(statsEl);
          }

          revealObserver.unobserve(el);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -80px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));

    /* Also observe reveal-stagger containers */
    document.querySelectorAll('.reveal-stagger').forEach(el => {
      const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            staggerObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
      staggerObserver.observe(el);
    });

    /* Stats container */
    const statsContainer = document.querySelector('.experience__stats');
    if (statsContainer) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startCounters(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      statsObserver.observe(statsContainer);
    }

  } else {
    revealEls.forEach(el => el.classList.add('visible'));
    document.querySelectorAll('.reveal-stagger').forEach(el => el.classList.add('visible'));
  }


  /* ─────────────────────────────────────────
     ANIMATED COUNTERS
  ───────────────────────────────────────── */
  function startCounters(container) {
    const counters = container.querySelectorAll('[data-target]');
    counters.forEach(counter => {
      if (counter.dataset.counted) return;
      counter.dataset.counted = 'true';

      const target   = parseFloat(counter.getAttribute('data-target'));
      const isFloat  = target % 1 !== 0;
      const duration = 2200;
      const stepTime = 16;
      const steps    = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      /* Easing function — ease-out cubic */
      function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

      let startTime = null;
      function tick(ts) {
        if (!startTime) startTime = ts;
        const elapsed  = ts - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value    = target * easeOut(progress);

        counter.innerText = isFloat ? value.toFixed(1) : Math.floor(value);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.innerText = isFloat ? target.toFixed(1) : target;
        }
      }
      requestAnimationFrame(tick);
    });
  }


  /* ─────────────────────────────────────────
     HERO PARTICLES — Floating Gold Dust
  ───────────────────────────────────────── */
  const particleContainer = document.getElementById('heroParticles');

  if (particleContainer) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');

      const size     = Math.random() * 2.5 + 0.5;
      const posX     = Math.random() * 100;
      const posY     = Math.random() * 100;
      const delay    = Math.random() * 14;
      const duration = 18 + Math.random() * 24;
      const opacity  = Math.random() * 0.25 + 0.05;
      const driftX   = (Math.random() - 0.5) * 80;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: var(--gold);
        opacity: 0;
        border-radius: 50%;
        top: ${posY}%;
        left: ${posX}%;
        animation: particleFloat ${duration}s ${delay}s infinite ease-in-out;
        pointer-events: none;
        --drift-x: ${driftX}px;
        --max-opacity: ${opacity};
      `;
      fragment.appendChild(particle);
    }

    particleContainer.appendChild(fragment);
  }

  /* Inject keyframes */
  const dynamicStyle = document.createElement('style');
  dynamicStyle.innerHTML = `
    @keyframes particleFloat {
      0%   { transform: translateY(0) translateX(0); opacity: 0; }
      10%  { opacity: var(--max-opacity, 0.15); }
      50%  { transform: translateY(-60px) translateX(var(--drift-x, 30px)); }
      90%  { opacity: var(--max-opacity, 0.15); }
      100% { transform: translateY(-120px) translateX(var(--drift-x, 30px)); opacity: 0; }
    }

    @keyframes heroImgBreath {
      0%, 100% { transform: scale(1); }
      50%       { transform: scale(1.015); }
    }
  `;
  document.head.appendChild(dynamicStyle);


  /* ─────────────────────────────────────────
     PARALLAX — Hero & Sections
  ───────────────────────────────────────── */
  const heroImg  = document.getElementById('heroParallaxImg');
  const heroLeft = document.querySelector('.hero__left');
  let   ticking  = false;

  function updateParallax(y) {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      if (heroImg && y < window.innerHeight * 1.2) {
        heroImg.style.transform = `translateY(${y * 0.12}px)`;
      }
      if (heroLeft && y < window.innerHeight * 1.2) {
        heroLeft.style.transform = `translateY(${y * 0.04}px)`;
        const fadeStart = window.innerHeight * 0.3;
        const opacity = y > fadeStart
          ? Math.max(0, 1 - (y - fadeStart) / (window.innerHeight * 0.5))
          : 1;
        heroLeft.style.opacity = opacity;
      }
      ticking = false;
    });
  }


  /* ─────────────────────────────────────────
     PROJECT CARD — Magnetic Hover Depth
  ───────────────────────────────────────── */
  document.querySelectorAll('.proj-card').forEach(card => {
    let isHovered = false;

    card.addEventListener('mouseenter', () => { isHovered = true; });
    card.addEventListener('mouseleave', () => {
      isHovered = false;
      const img = card.querySelector('.proj-card__img');
      if (img) img.style.transform = '';
    });

    card.addEventListener('mousemove', (e) => {
      if (!isHovered) return;
      const rect    = card.getBoundingClientRect();
      const x       = e.clientX - rect.left;
      const y       = e.clientY - rect.top;
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;
      const img = card.querySelector('.proj-card__img');
      if (img) {
        const moveX = ((x - centerX) / centerX) * 12;
        const moveY = ((y - centerY) / centerY) * 8;
        img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
      }
    });
  });


  /* ─────────────────────────────────────────
     MAGNETIC BUTTONS — Subtle Pull Effect
  ───────────────────────────────────────── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect    = btn.getBoundingClientRect();
      const x       = e.clientX - rect.left - rect.width  / 2;
      const y       = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translateY(-5px) translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });


  /* ─────────────────────────────────────────
     SERVICE CARDS — Stagger on Reveal
  ───────────────────────────────────────── */
  const svcGrid = document.querySelector('.services__grid');
  if (svcGrid && 'IntersectionObserver' in window) {
    const svcObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.svc-card');
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity    = '1';
              card.style.transform  = 'translateY(0)';
            }, i * 90);
          });
          svcObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    /* Initial state */
    svcGrid.querySelectorAll('.svc-card').forEach(card => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';
    });

    svcObserver.observe(svcGrid);
  }


  /* ─────────────────────────────────────────
     PROCESS STEPS — Sequential Reveal
  ───────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    document.querySelectorAll('.process-step').forEach((step, i) => {
      const stepObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 120);
            stepObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      stepObs.observe(step);
    });
  }


  /* ─────────────────────────────────────────
     ABOUT LIST — Cascade Reveal
  ───────────────────────────────────────── */
  const aboutList = document.querySelector('.about__list');
  if (aboutList && 'IntersectionObserver' in window) {
    const listObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('li');
          items.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-16px)';
            item.style.transition = `opacity 0.6s ${0.05 * i}s cubic-bezier(0.22,1,0.36,1), transform 0.6s ${0.05 * i}s cubic-bezier(0.22,1,0.36,1)`;
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateX(0)';
            }, 50 + i * 60);
          });
          listObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    listObs.observe(aboutList);
  }


  /* ─────────────────────────────────────────
     TESTIMONIAL CARDS — Subtle Tilt
  ───────────────────────────────────────── */
  document.querySelectorAll('.testi-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 4;
      card.style.transform = `translateY(-10px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ─────────────────────────────────────────
     SECTION AMBIENT LIGHT SWEEP
     (Gold shimmer line on section enter)
  ───────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('.section, .hero-section');
    const lightObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section--active');
        } else {
          entry.target.classList.remove('section--active');
        }
      });
    }, { threshold: 0.1 });
    sections.forEach(s => lightObs.observe(s));
  }


  /* ─────────────────────────────────────────
     HERO IMAGE — Subtle Breathing (idle)
  ───────────────────────────────────────── */
  const heroImgEl = document.querySelector('.hero__img');
  if (heroImgEl) {
    let idleTimer;
    let isParallaxing = false;

    window.addEventListener('scroll', () => {
      isParallaxing = true;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { isParallaxing = false; }, 1000);
    });
  }


  /* ─────────────────────────────────────────
     FOOTER — Active link highlight
  ───────────────────────────────────────── */
  const navLinks = document.querySelectorAll('.navbar__link');
  const allSections = document.querySelectorAll('section[id], .hero-section[id]');

  if ('IntersectionObserver' in window && navLinks.length) {
    const activeObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.4 });
    allSections.forEach(s => activeObs.observe(s));
  }


  /* ─────────────────────────────────────────
     PERFORMANCE — Reduce animations on low-end
  ───────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--ease-cinema', 'ease');
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    document.querySelectorAll('.reveal-stagger').forEach(el => el.classList.add('visible'));
  }

})();
