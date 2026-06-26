/* ================================================
   HEMS CONSTRUCTION LTD — MAIN JAVASCRIPT
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- SPARKLES ---- */
  const sparkleContainer = document.getElementById('sparkles');
  if (sparkleContainer) {
    for (let i = 0; i < 30; i++) {
      const s = document.createElement('div');
      s.classList.add('sparkle');
      s.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        --dur: ${2 + Math.random() * 4}s;
        --delay: ${Math.random() * 6}s;
        width: ${3 + Math.random() * 5}px;
        height: ${3 + Math.random() * 5}px;
      `;
      sparkleContainer.appendChild(s);
    }
  }

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });

  /* ---- SCROLL ANIMATIONS ---- */
  const targets = document.querySelectorAll(
    '.service-card, .why-feature, .process-step, .contact-item, .section-header, .why-text, .why-visual, .contact-info, .contact-form-wrap, .footer-brand, .footer-links'
  );
  targets.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Staggered delay for service cards
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));

  /* ---- CONTACT FORM ---- */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const fname = document.getElementById('fname').value.trim();
      const email = document.getElementById('email').value.trim();
      if (!fname || !email) {
        shakeBtn();
        return;
      }

      // Simulate submission
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Sending...';
      submitBtn.querySelector('.btn-icon').textContent = '⏳';

      setTimeout(() => {
        form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
        submitBtn.style.display = 'none';
        formSuccess.classList.add('visible');
      }, 1200);
    });
  }

  function shakeBtn() {
    submitBtn.style.animation = 'none';
    submitBtn.offsetHeight; // reflow
    submitBtn.style.animation = 'shake 0.4s ease';
  }

  /* ---- SMOOTH ANCHOR SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- SHAKE ANIMATION (CSS inject) ---- */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(style);

});
