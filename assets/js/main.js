(function() {
  'use strict';

  // ===== Header scroll effect =====
  function initHeaderScroll() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    function handleScroll() {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // ===== Mobile menu toggle =====
  function initMobileMenu() {
    const toggleBtn = document.getElementById('navToggle');
    const nav = document.getElementById('siteNav');
    
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener('click', function() {
      const isOpen = nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        nav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== Swiper initialization =====
  function initSwipers() {
    if (typeof Swiper === 'undefined') {
      console.warn('Swiper not loaded');
      return;
    }

    // Apartments slider
    if (document.querySelector('.swiper-apartments')) {
      new Swiper('.swiper-apartments', {
        loop: true,
        slidesPerView: 1,
        autoHeight: false,
        navigation: {
          nextEl: '.swiper-apartments .swiper-button-next',
          prevEl: '.swiper-apartments .swiper-button-prev',
        },
        pagination: {
          el: '.swiper-apartments .swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
      });
    }

    // Amenities slider
    if (document.querySelector('.swiper-amenities')) {
      new Swiper('.swiper-amenities', {
        loop: true,
        slidesPerView: 1,
        navigation: {
          nextEl: '.swiper-amenities .swiper-button-next',
          prevEl: '.swiper-amenities .swiper-button-prev',
        },
        pagination: {
          el: '.swiper-amenities .swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      });
    }
  }

  // ===== Parallax effect =====
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    function handleParallax() {
      parallaxElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const elementPosition = element.offsetTop;
        const distance = scrollPosition - elementPosition + window.innerHeight;
        
        if (distance > 0 && distance < window.innerHeight * 2) {
          const offset = distance * 0.3;
          element.style.transform = `translateX(${offset - 40}px)`;
        }
      });
    }

    window.addEventListener('scroll', handleParallax, { passive: true });
    handleParallax();
  }

  // ===== Lazy loading setup =====
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.loading = 'lazy';
      });
    }
  }

  // ===== Initialize all =====
  function init() {
    document.addEventListener('DOMContentLoaded', function() {
      initHeaderScroll();
      initMobileMenu();
      initLazyLoad();
    });

    // Swiper may load async, so wait a bit
    setTimeout(initSwipers, 100);
    setTimeout(initParallax, 150);
  }

  init();
})();
