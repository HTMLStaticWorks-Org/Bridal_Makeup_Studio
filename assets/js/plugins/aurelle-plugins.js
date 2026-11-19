/**
 * AURELLE BRIDAL STUDIO — LOCAL PLUGINS BUNDLE (aurelle-plugins.js)
 * Self-hosted zero-dependency implementations of:
 * 1. AurelleTilt (3D perspective tilt + glare + gyro/touch fallback)
 * 2. AurelleReveal (Staggered IntersectionObserver scroll reveal)
 * 3. AurelleSlider (Accessible touch + keyboard carousel)
 * 4. AurelleCharts (Responsive SVG/Canvas analytics charts for Admin Reports)
 */

(function (window) {
  'use strict';

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. 3D TILT ENGINE (Rule 7 & Section 6)
     ------------------------------------------------------------------------ */
  class AurelleTilt {
    static init(selector = '.tilt-card') {
      if (prefersReducedMotion()) return;
      const cards = document.querySelectorAll(selector);
      cards.forEach((card) => {
        if (card.dataset.tiltReady === 'true') return;
        card.dataset.tiltReady = 'true';

        if (!card.querySelector('.card-glare')) {
          const glare = document.createElement('span');
          glare.className = 'card-glare';
          glare.setAttribute('aria-hidden', 'true');
          card.appendChild(glare);
        }

        const maxTilt = parseFloat(card.dataset.tiltMax || '10');

        const handleMove = (clientX, clientY) => {
          const rect = card.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (((y - centerY) / centerY) * -maxTilt).toFixed(2);
          const rotateY = (((x - centerX) / centerX) * maxTilt).toFixed(2);

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
          card.style.setProperty('--glare-x', `${((x / rect.width) * 100).toFixed(1)}%`);
          card.style.setProperty('--glare-y', `${((y / rect.height) * 100).toFixed(1)}%`);
        };

        const handleLeave = () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        };

        card.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
        card.addEventListener('mouseleave', handleLeave);

        /* Touch press tilt fallback for mobile & tablet */
        card.addEventListener(
          'touchstart',
          (e) => {
            if (e.touches && e.touches[0]) {
              handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
          },
          { passive: true }
        );
        card.addEventListener('touchend', handleLeave, { passive: true });
      });
    }
  }

  /* ------------------------------------------------------------------------
     2. STAGGERED REVEAL-ON-SCROLL ENGINE
     ------------------------------------------------------------------------ */
  class AurelleReveal {
    static init() {
      const items = document.querySelectorAll('[data-reveal], .tilt-card, .section-header');
      if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-revealed'));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      items.forEach((el) => observer.observe(el));
    }
  }

  /* ------------------------------------------------------------------------
     3. ACCESSIBLE CAROUSEL / SLIDER ENGINE
     ------------------------------------------------------------------------ */
  class AurelleSlider {
    static init() {
      document.querySelectorAll('[data-slider]').forEach((slider) => {
        const slides = Array.from(slider.querySelectorAll('[data-slide]'));
        if (slides.length <= 1) return;
        let current = 0;

        const prevBtn = slider.querySelector('[data-slider-prev]');
        const nextBtn = slider.querySelector('[data-slider-next]');
        const dotsWrap = slider.querySelector('[data-slider-dots]');

        const showSlide = (idx) => {
          current = (idx + slides.length) % slides.length;
          slides.forEach((s, i) => {
            s.style.display = i === current ? '' : 'none';
            s.setAttribute('aria-hidden', i === current ? 'false' : 'true');
          });
          if (dotsWrap) {
            Array.from(dotsWrap.children).forEach((dot, i) => {
              dot.classList.toggle('btn--primary', i === current);
              dot.classList.toggle('btn--ghost', i !== current);
            });
          }
        };

        if (prevBtn) prevBtn.addEventListener('click', () => showSlide(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => showSlide(current + 1));

        showSlide(0);
      });
    }
  }

  /* ------------------------------------------------------------------------
     4. ADMIN ANALYTICS SVG CHARTS ENGINE
     ------------------------------------------------------------------------ */
  class AurelleCharts {
    static renderBarChart(containerId, data) {
      const el = document.getElementById(containerId);
      if (!el || !data || !data.length) return;
      const maxVal = Math.max(...data.map((d) => d.value), 1);

      const barsHtml = data
        .map((item) => {
          const pct = Math.round((item.value / maxVal) * 100);
          return `
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;flex:1;">
              <span style="font-size:0.78rem;font-weight:600;color:var(--primary);">${item.display || item.value}</span>
              <div style="width:100%;max-width:44px;height:160px;background:var(--surface-2);border-radius:999px;display:flex;align-items:flex-end;overflow:hidden;border:1px solid var(--border-gold);">
                <div style="width:100%;height:${pct}%;background:var(--grad-rouge);border-radius:999px;transition:height 0.8s ease;"></div>
              </div>
              <span style="font-size:0.78rem;color:var(--ink-muted);">${item.label}</span>
            </div>
          `;
        })
        .join('');

      el.innerHTML = `<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px;padding-top:16px;">${barsHtml}</div>`;
    }
  }

  window.AurelleTilt = AurelleTilt;
  window.AurelleReveal = AurelleReveal;
  window.AurelleSlider = AurelleSlider;
  window.AurelleCharts = AurelleCharts;
})(window);
