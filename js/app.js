(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  let scrollTicking = false;

  /* ===== HAMBURGER TOGGLE ===== */
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isOpen);
      nav.classList.toggle('open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        if (hamburger.getAttribute('aria-expanded') === 'true') {
          hamburger.setAttribute('aria-expanded', 'false');
          nav.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ===== SCROLL EVENT — INJECT .is-scrolled ===== */
  function updateScrollState() {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    scrollTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollState);
      scrollTicking = true;
    }
  });

  updateScrollState();

  /* ===== INTERSECTION OBSERVER — .reveal SCROLL ANIMATIONS ===== */
  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      revealElements.forEach(function (el) {
        observer.observe(el);
      });
    }
  } else {
    var revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(function (el) {
      el.classList.add('active');
    });
  }

})();
