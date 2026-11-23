/**
 * ============================================================================
 * MR. MANOJ L. DESHMUKH — PRINCIPAL CUM PROFESSOR
 * Govt. B.Sc. Nursing College, Jalna | SWA President
 * Interactive JavaScript Engine
 * ============================================================================
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. STICKY NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTING
  // ---------------------------------------------------------------------------
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], footer[id]');
    const mobileBtn = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
      }

      // Highlight active section
      let current = '';
      sections.forEach(section => {
        const top = section.offsetTop - 140;
        const height = section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    // Mobile Menu Toggle & Luxurious Drawer Support
    const mobileBackdrop = document.getElementById('mobileBackdrop');

    function closeMobileMenu() {
      if (navMenu) navMenu.classList.remove('mobile-open');
      if (mobileBtn) mobileBtn.classList.remove('open');
      if (mobileBackdrop) mobileBackdrop.classList.remove('active');
      document.body.classList.remove('menu-locked');
    }

    function toggleMobileMenu() {
      if (!navMenu) return;
      const isOpen = navMenu.classList.toggle('mobile-open');
      if (mobileBtn) mobileBtn.classList.toggle('open', isOpen);
      if (mobileBackdrop) mobileBackdrop.classList.toggle('active', isOpen);
      document.body.classList.toggle('menu-locked', isOpen);
    }

    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', toggleMobileMenu);

      if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', closeMobileMenu);
      }

      navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });

      const drawerBtn = navMenu.querySelector('.mobile-drawer-btn');
      if (drawerBtn) {
        drawerBtn.addEventListener('click', closeMobileMenu);
      }

      window.addEventListener('resize', () => {
        if (window.innerWidth > 1140) {
          closeMobileMenu();
        }
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 2. STAT NUMBER COUNTERS (INTERSECTION OBSERVER)
  // ---------------------------------------------------------------------------
  function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const duration = 1600;
          const start = 0;
          const startTime = performance.now();

          function updateCounter(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const val = Math.floor(start + (target - start) * ease);
            el.textContent = val;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    counters.forEach(c => observer.observe(c));
  }

  // ---------------------------------------------------------------------------
  // 3. ANNUAL REPORT / MILESTONES MODAL
  // ---------------------------------------------------------------------------
  function initReportModal() {
    const openBtn = document.getElementById('openPubsModalBtn');
    const modal = document.getElementById('pubsModal');
    const closeBtn = document.getElementById('closePubsModal');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 4. TOAST NOTIFICATION UTILITY
  // ---------------------------------------------------------------------------
  function showToast(msg) {
    const toast = document.getElementById('toastBox');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 300);
    }, 3500);
  }

  // ---------------------------------------------------------------------------
  // 5. NEWSLETTER SUBSCRIPTION
  // ---------------------------------------------------------------------------
  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    const input = document.getElementById('newsletterEmail');

    if (form && input) {
      form.addEventListener('submit', () => {
        const email = input.value.trim();
        if (email) {
          showToast(`Thank you! ${email} has been subscribed to the Principal's Official Dispatches.`);
          input.value = '';
        }
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 6. BACK TO TOP BUTTON
  // ---------------------------------------------------------------------------
  function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ---------------------------------------------------------------------------
  // INITIALIZE ON DOM LOAD
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initCounters();
    initReportModal();
    initNewsletter();
    initBackToTop();
  });

})();
