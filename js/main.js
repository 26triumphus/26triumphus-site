/* =============================================
   26 Triumphus — main.js
   ============================================= */

(function () {
  'use strict';

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav__toggle');
  const mobileNav = document.querySelector('.nav__mobile');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Active nav link based on current page ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (
      href === currentPage ||
      (currentPage === '' && href === 'index.html') ||
      (currentPage === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  // --- Scroll: add shadow to nav ---
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(0,0,0,0.3)'
        : 'none';
    }, { passive: true });
  }

  // --- Intersection Observer: fade-in on scroll ---
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    '.feature-card, .service-card, .value-card, .about-intro, .about-stats, .contact-layout'
  ).forEach(function (el) {
    el.classList.add('fade-in');
    observer.observe(el);
  });

})();
