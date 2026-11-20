/**
 * LUMINA BRIDAL STUDIO — CORE FRONTEND CONTROLLER (main.js)
 * Modular ES6+ controller for Navigation, Theme, RTL, 3D Tilt, Interactive
 * Sliders, Tabs, Accordions, Portfolio Filter, Lightbox, Service Calculator,
 * Animated Counters, and Form Validation.
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. THEME (LIGHT / DARK) & RTL INITIALIZATION
     ------------------------------------------------------------------------ */
  const STORAGE_THEME = 'aurelle_theme';
  const STORAGE_DIR = 'aurelle_dir';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_THEME, theme);
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to Ivory Rouge Light Mode' : 'Switch to Midnight Plum Dark Mode'
      );
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
  }

  function initThemeAndRTL() {
    const savedTheme = localStorage.getItem(STORAGE_THEME);
    const systemDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    const savedDir = localStorage.getItem(STORAGE_DIR) || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);

    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });

    document.querySelectorAll('[data-rtl-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentDir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', currentDir);
        localStorage.setItem(STORAGE_DIR, currentDir);
        btn.textContent = currentDir === 'rtl' ? 'LTR' : 'RTL';
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. PAGE CURTAIN REVEAL & STICKY HEADER & MOBILE OVERLAY
     ------------------------------------------------------------------------ */
  function initNavigation() {
    const curtain = document.querySelector('.page-curtain');
    if (curtain) {
      setTimeout(() => curtain.classList.add('is-hidden'), 260);
    }

    const header = document.querySelector('.site-header');
    if (header) {
      const onScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 20);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    const mobileOverlay = document.getElementById('mobileOverlay');
    const openBtns = document.querySelectorAll('[data-mobile-open]');
    const closeBtns = document.querySelectorAll('[data-mobile-close]');

    if (mobileOverlay) {
      openBtns.forEach((btn) =>
        btn.addEventListener('click', () => {
          mobileOverlay.classList.add('is-open');
          mobileOverlay.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        })
      );
      const closeMenu = () => {
        mobileOverlay.classList.remove('is-open');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        mobileOverlay.querySelectorAll('.mobile-nav-dropdown.is-open').forEach((dd) => {
          dd.classList.remove('is-open');
          const toggle = dd.querySelector('.mobile-dropdown-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
      };
      closeBtns.forEach((btn) => btn.addEventListener('click', closeMenu));
      mobileOverlay.querySelectorAll('.mobile-dropdown-toggle').forEach((toggle) => {
        toggle.addEventListener('click', () => {
          const parent = toggle.closest('.mobile-nav-dropdown');
          if (!parent) return;
          const isOpen = parent.classList.toggle('is-open');
          toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      });

      const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
      const parentMap = {
        'service-details.html': 'services.html',
        'look-details.html': 'portfolio.html',
        'booking-confirmation.html': 'book-now.html'
      };
      const matchFile = parentMap[currentFile] || currentFile;

      mobileOverlay.querySelectorAll('.mobile-nav-link[href]').forEach((link) => {
        const href = (link.getAttribute('href') || '').split('?')[0].toLowerCase();
        if (href === matchFile) {
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'page');
        }
      });

      mobileOverlay.querySelectorAll('.mobile-dropdown-link[href]').forEach((link) => {
        const href = (link.getAttribute('href') || '').split('?')[0].toLowerCase();
        if (href === currentFile) {
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'page');
          const toggle = link.closest('.mobile-nav-dropdown')?.querySelector('.mobile-dropdown-toggle');
          if (toggle) toggle.classList.add('is-active');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('is-open')) {
          closeMenu();
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     3. CUSTOM LIPSTICK-DOT DESKTOP CURSOR
     ------------------------------------------------------------------------ */
  function initCustomCursor() {
    if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    window.addEventListener(
      'mousemove',
      (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        ring.style.left = `${e.clientX}px`;
        ring.style.top = `${e.clientY}px`;
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------------------
     4. BEFORE / AFTER DRAG SLIDER & SIGNATURE TECHNIQUES SWAP (HOME 1)
     ------------------------------------------------------------------------ */
  function initBeforeAfterAndTechniques() {
    document.querySelectorAll('[data-ba-slider]').forEach((slider) => {
      const range = slider.querySelector('.ba-range');
      if (!range) return;
      const updatePos = () => {
        slider.style.setProperty('--ba-pos', `${range.value}%`);
      };
      range.addEventListener('input', updatePos);
      updatePos();
    });

    const techItems = document.querySelectorAll('[data-tech-item]');
    const techImg = document.getElementById('techniqueActiveImg');
    const techWebp = document.getElementById('techniqueActiveWebp');
    const techCaption = document.getElementById('techniqueActiveCaption');

    if (techItems.length && techImg) {
      techItems.forEach((item) => {
        item.addEventListener('click', () => {
          techItems.forEach((t) => t.classList.remove('is-active'));
          item.classList.add('is-active');
          const jpg = item.getAttribute('data-img-jpg');
          const webp = item.getAttribute('data-img-webp');
          const alt = item.getAttribute('data-img-alt');
          if (techWebp && webp) techWebp.setAttribute('srcset', webp);
          if (jpg) techImg.setAttribute('src', jpg);
          if (alt) {
            techImg.setAttribute('alt', alt);
            if (techCaption) techCaption.textContent = alt;
          }
        });
      });
    }
  }

  /* ------------------------------------------------------------------------
     5. INTERACTIVE TABS & ACCORDIONS & PRICING VENUE TOGGLE
     ------------------------------------------------------------------------ */
  function initTabsAndAccordions() {
    document.querySelectorAll('[data-tabs]').forEach((tabGroup) => {
      const buttons = tabGroup.querySelectorAll('[data-tab-target]');
      const panels = tabGroup.querySelectorAll('[data-tab-panel]');
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-tab-target');
          buttons.forEach((b) => {
            const active = b === btn;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-selected', active ? 'true' : 'false');
          });
          panels.forEach((panel) => {
            const match = panel.getAttribute('data-tab-panel') === targetId;
            panel.classList.toggle('is-active', match);
          });
        });
      });
    });

    document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        if (!item) return;
        const isOpen = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });

    /* Studio vs At Your Venue Pricing Toggle on services.html */
    const locationBtns = document.querySelectorAll('[data-venue-mode]');
    if (locationBtns.length) {
      locationBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const mode = btn.getAttribute('data-venue-mode');
          locationBtns.forEach((b) => {
            b.classList.toggle('btn--primary', b === btn);
            b.classList.toggle('btn--ghost', b !== btn);
          });
          document.querySelectorAll('[data-price-studio]').forEach((priceEl) => {
            priceEl.textContent =
              mode === 'venue'
                ? priceEl.getAttribute('data-price-venue')
                : priceEl.getAttribute('data-price-studio');
          });
        });
      });
    }
  }

  /* ------------------------------------------------------------------------
     6. PORTFOLIO FILTER & ACCESSIBLE LIGHTBOX MODAL
     ------------------------------------------------------------------------ */
  function initPortfolioAndLightbox() {
    const filterBtns = document.querySelectorAll('[data-filter]');
    const portfolioItems = document.querySelectorAll('[data-category]');

    if (filterBtns.length && portfolioItems.length) {
      filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const cat = btn.getAttribute('data-filter');
          filterBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
          portfolioItems.forEach((card) => {
            const categories = (card.getAttribute('data-category') || '').split(' ');
            const visible = cat === 'all' || categories.includes(cat);
            card.style.display = visible ? '' : 'none';
          });
        });
      });
    }

    const lightbox = document.getElementById('aurelleLightbox');
    if (lightbox) {
      const lbImg = document.getElementById('lightboxImage');
      const lbTitle = document.getElementById('lightboxTitle');
      const lbDesc = document.getElementById('lightboxDesc');

      document.querySelectorAll('[data-lightbox-open], [data-lightbox-src]').forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const card = trigger.closest('.tilt-card');
          const cardImg = card ? card.querySelector('.card-media img') : null;
          const src = trigger.getAttribute('data-lightbox-src') || (cardImg ? cardImg.getAttribute('src') : '');
          const title = trigger.getAttribute('data-lightbox-title') || 'Lumina Bridal Artistry';
          const desc = trigger.getAttribute('data-lightbox-desc') || '';
          if (lbImg && src) {
            lbImg.setAttribute('src', src);
            lbImg.setAttribute('alt', title);
          }
          if (lbTitle) lbTitle.textContent = title;
          if (lbDesc) lbDesc.textContent = desc;
          lightbox.classList.add('is-open');
          lightbox.setAttribute('aria-hidden', 'false');
        });
      });

      lightbox.querySelectorAll('[data-modal-close]').forEach((btn) => {
        btn.addEventListener('click', () => {
          lightbox.classList.remove('is-open');
          lightbox.setAttribute('aria-hidden', 'true');
        });
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
          lightbox.classList.remove('is-open');
          lightbox.setAttribute('aria-hidden', 'true');
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     7. INTERACTIVE SERVICE CALCULATOR (services.html)
     ------------------------------------------------------------------------ */
  function initServiceCalculator() {
    const checkboxes = document.querySelectorAll('[data-calc-price]');
    const totalEl = document.getElementById('calcTotalAmount');
    const countEl = document.getElementById('calcSelectedCount');
    if (!checkboxes.length || !totalEl) return;

    const recalc = () => {
      let total = 0;
      let count = 0;
      checkboxes.forEach((cb) => {
        const label = cb.closest('.calc-option-label');
        if (cb.checked) {
          total += parseFloat(cb.getAttribute('data-calc-price') || '0');
          count += 1;
          if (label) label.classList.add('is-checked');
        } else if (label) {
          label.classList.remove('is-checked');
        }
      });
      totalEl.textContent = `$${total.toLocaleString()}`;
      if (countEl) {
        countEl.textContent = `${count} bespoke service${count === 1 ? '' : 's'} selected`;
      }
    };

    checkboxes.forEach((cb) => cb.addEventListener('change', recalc));
    recalc();
  }

  /* ------------------------------------------------------------------------
     8. ANIMATED STAT COUNTERS
     ------------------------------------------------------------------------ */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const animateCounter = (el) => {
      const target = parseFloat(el.getAttribute('data-counter') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const isDecimal = String(target).includes('.');
      let current = 0;
      const steps = 36;
      const inc = target / steps;
      const timer = setInterval(() => {
        current += inc;
        if (current >= target) {
          el.textContent = `${isDecimal ? target.toFixed(1) : Math.round(target)}${suffix}`;
          clearInterval(timer);
        } else {
          el.textContent = `${isDecimal ? current.toFixed(1) : Math.round(current)}${suffix}`;
        }
      }, 28);
    };

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      counters.forEach((c) => obs.observe(c));
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ------------------------------------------------------------------------
     9. TOAST NOTIFICATIONS & UNIVERSAL FORM VALIDATION
     ------------------------------------------------------------------------ */
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 4200);
  }

  function initForms() {
    /* Show / hide password toggles on Auth pages */
    document.querySelectorAll('[data-toggle-password]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const inputId = btn.getAttribute('data-toggle-password');
        const input = document.getElementById(inputId);
        if (!input) return;
        const isPwd = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPwd ? 'text' : 'password');
        if (btn.querySelector('svg')) {
          btn.classList.toggle('is-visible', isPwd);
          btn.setAttribute('aria-label', isPwd ? 'Hide password' : 'Show password');
          btn.setAttribute('aria-pressed', isPwd ? 'true' : 'false');
        } else {
          btn.textContent = isPwd ? 'Hide' : 'Show';
        }
      });
    });

    document.querySelectorAll('form[data-validate]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        form.querySelectorAll('[required]').forEach((field) => {
          const group = field.closest('.form-group');
          const val = (field.value || '').trim();
          let fieldValid = val.length > 0;

          if (fieldValid && field.type === 'email') {
            fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
          }

          field.classList.toggle('is-invalid', !fieldValid);
          if (group) group.classList.toggle('has-error', !fieldValid);
          if (!fieldValid) valid = false;
        });

        if (!valid) {
          showToast('Please complete all highlighted required fields.');
          return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Processing...';
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
          const successMsg =
            form.getAttribute('data-success-message') ||
            'Thank you! Our bridal concierge has received your submission.';
          showToast(successMsg);

          const redirectUrl = form.getAttribute('data-redirect');
          if (redirectUrl) {
            setTimeout(() => {
              window.location.href = redirectUrl;
            }, 900);
          } else {
            form.reset();
          }
        }, 650);
      });
    });
  }

  /* ------------------------------------------------------------------------
     10. SCROLL TO TOP BUTTON
     ------------------------------------------------------------------------ */
  function initScrollTop() {
    if (document.querySelector('.scroll-top-btn')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.setAttribute('title', 'Back to top');
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>';
    document.body.appendChild(btn);

    const toggleVisibility = () => {
      btn.classList.toggle('is-visible', window.scrollY > 320);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener('click', () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     11. SERVICE DETAILS SWITCHER (service-details.html)
     ------------------------------------------------------------------------ */
  function initServiceDetails() {
    const nav = document.getElementById('serviceSelectorNav');
    if (!nav) return;

    const CHECK_SVG =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';

    const SERVICES = {
      'bridal-makeup': {
        docTitle: 'Signature HD & Airbrush Bridal Suite | Lumina Studio',
        breadcrumb: 'Signature HD & Airbrush Bridal Suite',
        heroEyebrow: 'Flagship Bridal Commission • 3.5 Hours',
        heroTitleHtml: 'Signature HD &amp; Silicone <span class="script-accent">Airbrush</span> Bridal Suite',
        heroSubtitle: 'Engineered for 8K cinema lenses, tear resistance, and unhurried luxury on your wedding morning.',
        imageBase: '../assets/images/services/srv-detail-hero',
        imageAlt: 'Macro bridal beauty preparation and airbrush luminosity session',
        dossierEyebrow: 'Detailed Dossier',
        dossierTitle: 'Artistry That Breathes With Your Skin',
        body1:
          'Unlike conventional bridal makeup that relies on heavy opaque layers, the Lumina Signature Suite treats your complexion like fine silk. We begin with a 25-minute cryo-lymphatic massage to lift facial contours and infuse low-molecular hyaluronic moisture before applying micro-atomized silicone airbrush pigments or hand-buffed micro-HD creams.',
        body2:
          'Whether your ceremony takes place under midday Mediterranean sunshine, beside a warm sacred fire mandap, or beneath crystal ballroom chandeliers, our color-corrected pigments maintain natural skin texture and true-to-life undertone accuracy for 18+ continuous hours.',
        checklistCol1: [
          '25-Min Rose-Quartz Cryo-Glass Facial Prep',
          'Custom Undertone Mixing (HD or Silicone Airbrush)',
          '40–60 Individual Knot-Free Cashmere Silk Lashes',
          'Neck, Collarbone & Back Complexion Harmonizing'
        ],
        checklistCol2: [
          'Architectural Bridal Hair & Crown Padding',
          'Saree, Double Dupatta, or Cathedral Veil Pinning',
          '18-Hour Waterproof Thermal Polymer Lock',
          'Monogrammed Velvet Lip & Blotting Silk Clutch'
        ],
        processEyebrow: '210-Minute Choreography',
        processHeading: 'In-Suite Wedding Morning Process Steps',
        steps: [
          {
            time: '00:00 – 00:40',
            title: 'Step 1: Cryo-Prep & Hair Base',
            text: 'While hydrogel gold peptide patches depuff your under-eyes, our hair architect sets thermal volume rollers and anchors hidden veil combs.',
            badge: '40 Minutes'
          },
          {
            time: '00:40 – 01:45',
            title: 'Step 2: Eye & Lash Architecture',
            text: 'Multi-dimensional lid shading, waterproof gel tightlining, and individual cashmere flare mapping calibrated to lift your eye contour.',
            badge: '65 Minutes'
          },
          {
            time: '01:45 – 02:40',
            title: 'Step 3: Airbrush Complexion & Lip',
            text: 'Editorial underpainting followed by micro-atomized airbrush misting, cream blush draping, and our 3-layer velvet lip seal.',
            badge: '55 Minutes'
          },
          {
            time: '02:40 – 03:30',
            title: 'Step 4: Draping, Jewels & Lens Check',
            text: 'Precision garment steaming, necklace/mathapatti anchoring, veil pinning, and final test portraits under daylight & flash.',
            badge: '50 Minutes'
          }
        ],
        matrixEyebrow: 'Dermatological Calibration',
        matrixHeading: 'Suitable For & Skin-Type Formulation Matrix',
        matrix: [
          {
            tag: 'Dry / Dehydrated Skin',
            title: 'Hydro-Silk Micro-HD',
            text: 'Infused with squalane and polyglutamic essence for a cushioned, dewy glass-skin bounce that never flakes.',
            badge: '100% Compatible'
          },
          {
            tag: 'Oily / Combination Skin',
            title: 'Silicone Matte-Velvet Airbrush',
            text: 'Controls T-zone sebum for 18 hours while preserving satin cheekbone luminosity in tropical climates.',
            badge: '100% Compatible'
          },
          {
            tag: 'Sensitive / Rosacea / Acne',
            title: 'Non-Comedogenic Mineral HD',
            text: 'Fragrance-free color-neutralizing green/peach micro-veils that calm erythema with zero pore congestion.',
            badge: '100% Compatible'
          }
        ],
        sidebarRibbon: 'Instant Suite Lock',
        sidebarTitle: 'Signature Bridal Suite',
        sidebarPrice: '$680',
        sidebarDesc: 'Includes full makeup, hair architecture, lashes, cryo-prep, and garment/veil draping (3.5 hours).',
        sidebarBullets: [
          'Only $170 (25%) Retainer Due Today',
          'Free Date Reschedule Up to 45 Days Prior',
          'Direct Chat Access in Bride Dashboard'
        ]
      },
      engagement: {
        docTitle: 'Engagement & Pre-Wedding Editorial Suite | Lumina Studio',
        breadcrumb: 'Engagement & Pre-Wedding',
        heroEyebrow: 'Ring & Shoot Commission • 2.5 Hours',
        heroTitleHtml: 'Engagement &amp; <span class="script-accent">Pre-Wedding</span> Editorial Suite',
        heroSubtitle: 'Luminous rose-quartz editorial glow and camera-ready hair styling for ring ceremonies and save-the-date shoots.',
        imageBase: '../assets/images/services/srv-engagement',
        imageAlt: 'Engagement and Pre-Wedding Editorial Glam service portrait',
        dossierEyebrow: 'Ring Ceremony & Editorial Shoot',
        dossierTitle: 'Soft-Focus Radiance Under Golden Hour & Flash',
        body1:
          'Designed for intimate engagement soirées, roka ceremonies, and outdoor pre-wedding portrait sessions, this commission balances luminous skin vitality with romantic, touchable hair architecture. We sculpt high points with champagne pearl balms that catch natural twilight without glittering under macro photography.',
        body2:
          'Every pigment is calibrated for close-up ring-exchange shots and candid movement, pairing effortlessly with pastel lehengas, cocktail gowns, or tailored silk separates.',
        checklistCol1: [
          '15-Min Lymphatic Dewy Skin Infusion',
          'Soft-Focus Micro-HD Complexion Veil',
          'Fluttery Individual Silk Lash Placement',
          'Rose-Quartz Cream Blush & Lip Stain'
        ],
        checklistCol2: [
          'Romantic Textured Waves or Low Chignon',
          'Dupatta or Cocktail Cape Pinning',
          'Humidity-Resistant Light Polymer Mist',
          'Complimentary Touch-Up Lip Vial'
        ],
        processEyebrow: '150-Minute Choreography',
        processHeading: 'Engagement & Shoot Preparation Steps',
        steps: [
          {
            time: '00:00 – 00:30',
            title: 'Step 1: Hydration & Hair Prep',
            text: 'Hyaluronic misting and thermal pin-curl setting for effortless, bouncy volume that holds outdoors.',
            badge: '30 Minutes'
          },
          {
            time: '00:30 – 01:15',
            title: 'Step 2: Soft-Focus Eye & Brow',
            text: 'Feathered brow lamination, satin champagne lid wash, and subtle winged liner tailored to your eye shape.',
            badge: '45 Minutes'
          },
          {
            time: '01:15 – 02:00',
            title: 'Step 3: Luminous Skin & Cheek',
            text: 'Sheer-to-medium micro-HD blending with seamless cream sculpting for zero harsh lines in close-ups.',
            badge: '45 Minutes'
          },
          {
            time: '02:00 – 02:30',
            title: 'Step 4: Hair Styling & Outfit Pin',
            text: 'Final wave brushing, delicate floral or pearl hair pins, and outfit drape securing.',
            badge: '30 Minutes'
          }
        ],
        matrixEyebrow: 'Lighting & Setting Calibration',
        matrixHeading: 'Ideal Occasions & Finish Profiles',
        matrix: [
          {
            tag: 'Golden Hour Portraits',
            title: 'Dewy Rose-Quartz Glow',
            text: 'Reflects natural sunset warmth with zero heavy powder cast on cheekbones and bridge of nose.',
            badge: 'Camera Ready'
          },
          {
            tag: 'Evening Ring Ceremony',
            title: 'Satin Velvet Editorial',
            text: 'Balanced satin finish that resists indoor spotlight shine while keeping skin supple.',
            badge: 'Flash Tested'
          },
          {
            tag: 'Coastal / Garden Venues',
            title: 'Wind-Proof Pinning & Seal',
            text: 'Flexible hairspray architecture and waterproof lash adhesive built for outdoor breezes.',
            badge: '12-Hour Hold'
          }
        ],
        sidebarRibbon: 'Ring & Shoot Favorite',
        sidebarTitle: 'Engagement & Pre-Wedding',
        sidebarPrice: '$420',
        sidebarDesc: 'Includes luminous HD makeup, editorial hair styling, lashes, and outfit pinning (2.5 hours).',
        sidebarBullets: [
          'Only $105 (25%) Retainer Due Today',
          'Ideal for Roka, Engagement & Save-the-Date',
          'Direct Moodboard Sync in Bride Dashboard'
        ]
      },
      reception: {
        docTitle: 'Reception Couture Glam Suite | Lumina Studio',
        breadcrumb: 'Reception Couture Glam',
        heroEyebrow: 'Evening Ballroom Commission • 3 Hours',
        heroTitleHtml: 'Reception <span class="script-accent">Couture</span> Evening Glamour',
        heroSubtitle: 'Red-carpet smoked cut-crease or gilded bronze eye drama with flash-proof setting and collarbone illuminator.',
        imageBase: '../assets/images/services/srv-reception',
        imageAlt: 'Couture Reception Evening Glamour makeup service portrait',
        dossierEyebrow: 'Ballroom & Red-Carpet Drama',
        dossierTitle: 'High-Contrast Glamour Built for Crystal Chandeliers',
        body1:
          'Your wedding reception calls for heightened evening drama that commands ballroom lighting and high-ISO flash photography. We transition your aesthetic into sculpted bronze or espresso smoked eyes, velvet-matte complexion perfection, and sculpted Hollywood waves or sleek architectural updos.',
        body2:
          'We also airbrush a transfer-proof champagne pearl sheen across your collarbones, shoulders, and back so your evening gown or reception lehenga photographs seamlessly from every angle.',
        checklistCol1: [
          '20-Min Cryo-Contouring & Pore-Blurring Prep',
          'Flash-Proof Velvet HD or Airbrush Complexion',
          'Smoked Cut-Crease or Gilded Bronze Eye Artistry',
          'Full-Volume Wispy Cashmere Silk Lashes'
        ],
        checklistCol2: [
          '24K Transfer-Proof Décolleté & Shoulder Glow',
          'Brushed Hollywood Waves or Sleek Couture Bun',
          'Evening Gown / Reception Dupatta Anchoring',
          'Touch-Up Velvet Lip & Blotting Kit'
        ],
        processEyebrow: '180-Minute Choreography',
        processHeading: 'Evening Ballroom Transformation Steps',
        steps: [
          {
            time: '00:00 – 00:35',
            title: 'Step 1: Cryo-Lift & Roller Set',
            text: 'Chilled cryo-globes tighten contours while large-barrel thermal rollers build red-carpet wave structure.',
            badge: '35 Minutes'
          },
          {
            time: '00:35 – 01:30',
            title: 'Step 2: Dramatic Eye Sculpting',
            text: 'Precision metallic foil or smoked espresso shadow layering with waterproof kohl and dimensional lashes.',
            badge: '55 Minutes'
          },
          {
            time: '01:30 – 02:20',
            title: 'Step 3: Velvet Skin & Body Glow',
            text: 'Flash-tested complexion sculpting paired with transfer-resistant 24K pearl collarbone illumination.',
            badge: '50 Minutes'
          },
          {
            time: '02:20 – 03:00',
            title: 'Step 4: Wave Brush-Out & Gown Fit',
            text: 'Glossy Hollywood wave combing, statement earring securing, and final flash-test portrait.',
            badge: '40 Minutes'
          }
        ],
        matrixEyebrow: 'Evening Lighting Matrix',
        matrixHeading: 'Tailored For Ballroom & Spotlight Venues',
        matrix: [
          {
            tag: 'Direct Flash & Paparazzi',
            title: 'Zero-Flashback Setting',
            text: 'Silica-free micro-milled powders eliminate white cast under direct camera flash.',
            badge: '8K Flash Safe'
          },
          {
            tag: 'Off-Shoulder & Backless',
            title: 'Seamless Body Harmonizing',
            text: 'Tone-matched airbrush body veil resists transfer onto silk, satin, or velvet.',
            badge: 'Zero Transfer'
          },
          {
            tag: 'Dance Floor Longevity',
            title: '16-Hour Sebum Lock',
            text: 'Dual-polymer setting seals eye drama and lip pigment through dinner and dancing.',
            badge: 'Sweat Resistant'
          }
        ],
        sidebarRibbon: 'Evening Showstopper',
        sidebarTitle: 'Reception Couture Glam',
        sidebarPrice: '$540',
        sidebarDesc: 'Includes dramatic evening makeup, Hollywood waves or updo, lashes, and collarbone glow (3 hours).',
        sidebarBullets: [
          'Only $135 (25%) Retainer Due Today',
          'Includes 24K Transfer-Proof Body Glow',
          'Optional Quick-Change Add-On Available'
        ]
      },
      mehendi: {
        docTitle: 'Mehendi & Haldi Floral Radiance | Lumina Studio',
        breadcrumb: 'Mehendi & Haldi Radiance',
        heroEyebrow: 'Daylight Festive Commission • 2 Hours',
        heroTitleHtml: 'Mehendi &amp; Haldi <span class="script-accent">Floral</span> Radiance',
        heroSubtitle: 'Water-resistant dewy glass tint, botanical lip stain, and intricate braided floral hair work built for outdoor courtyards.',
        imageBase: '../assets/images/services/srv-mehendi',
        imageAlt: 'Mehendi and Haldi Floral Dewy Radiance bridal look',
        dossierEyebrow: 'Daylight Courtyard Festivities',
        dossierTitle: 'Breathable Glass Skin & Fresh Floral Braiding',
        body1:
          'Outdoor sunlit festivities demand makeup that looks effortlessly fresh in direct daylight while withstanding heat, turmeric rituals, and hours of celebration. We use ultra-sheer, water-resistant skin tints and cream cheek stains that let your natural skin glow through.',
        body2:
          'Our hair architect weaves intricate fishtail, waterfall, or bubble braids adorned with fresh baby’s breath, mogra buds, or marigold accents secured comfortably for all-day movement.',
        checklistCol1: [
          'Cooling Botanical Rosewater & Aloe Prep',
          'Water-Resistant Dewy Glass Complexion Tint',
          'Sun-Kissed Cream Blush & Botanical Lip Stain',
          'Natural Flutter Individual Lash Accents'
        ],
        checklistCol2: [
          'Intricate Braided or Half-Up Festive Hair',
          'Fresh Floral Pinning (Mogra / Baby’s Breath)',
          'Lightweight Dupatta or Cape Securing',
          'UV-Safe Sweat-Resistant Setting Mist'
        ],
        processEyebrow: '120-Minute Choreography',
        processHeading: 'Daylight Festive Preparation Steps',
        steps: [
          {
            time: '00:00 – 00:25',
            title: 'Step 1: Cooling Hydration Prep',
            text: 'Chilled rose hydrosol compress and lightweight gel moisturizer to keep skin cool outdoors.',
            badge: '25 Minutes'
          },
          {
            time: '00:25 – 01:05',
            title: 'Step 2: Glass Skin & Sunlit Eyes',
            text: 'Sheer breathable tint, warm apricot lid wash, and waterproof tightlining.',
            badge: '40 Minutes'
          },
          {
            time: '01:05 – 01:40',
            title: 'Step 3: Braided Hair Architecture',
            text: 'Textured crown volume woven into a secure braid ready for floral jewellery.',
            badge: '35 Minutes'
          },
          {
            time: '01:40 – 02:00',
            title: 'Step 4: Fresh Florals & Maangtikka',
            text: 'Hand-pinning fresh blooms and lightweight floral jewellery for courtyard comfort.',
            badge: '20 Minutes'
          }
        ],
        matrixEyebrow: 'Outdoor Performance',
        matrixHeading: 'Engineered For Sunlit Courtyard Events',
        matrix: [
          {
            tag: 'Midday Sunlight',
            title: 'Zero-Cake Sheer Tint',
            text: 'Micro-sheer pigments blend invisibly without settling into lines under bright sun.',
            badge: 'Daylight True'
          },
          {
            tag: 'Haldi & Splash Safe',
            title: 'Hydrophobic Barrier Mist',
            text: 'Repels moisture and gentle splashes while remaining breathable and comfortable.',
            badge: 'Water Resistant'
          },
          {
            tag: 'All-Day Dancing',
            title: 'Weightless Braided Hold',
            text: 'Hidden elastic and pin anchoring keeps braids and florals intact for 10+ hours.',
            badge: '10-Hour Hold'
          }
        ],
        sidebarRibbon: 'Daylight Festive',
        sidebarTitle: 'Mehendi & Haldi Suite',
        sidebarPrice: '$360',
        sidebarDesc: 'Includes water-resistant glass skin makeup, braided hair architecture, and floral pinning (2 hours).',
        sidebarBullets: [
          'Only $90 (25%) Retainer Due Today',
          'Water-Resistant & Sweat-Proof Formula',
          'Pairs Seamlessly With Fresh Floral Add-On'
        ]
      },
      'party-family': {
        docTitle: 'Party & Family Luxury Styling | Lumina Studio',
        breadcrumb: 'Party & Family Styling',
        heroEyebrow: 'Bridal Entourage Commission • 75 Mins / Guest',
        heroTitleHtml: 'Party &amp; <span class="script-accent">Family</span> Luxury Styling',
        heroSubtitle: 'Cohesive luxury HD makeup and hairstyling for mothers of the bride/groom, sisters, and bridesmaid suites.',
        imageBase: '../assets/images/services/srv-bridesmaids',
        imageAlt: 'Family and Bridesmaids Luxury Party Styling service',
        dossierEyebrow: 'Entourage & Family Harmony',
        dossierTitle: 'Cohesive Elegance Across Every Generation',
        body1:
          'Your mothers, sisters, and closest bridesmaids deserve the same calibrated luxury and camera-ready polish as the bride. Our dedicated entourage team works in coordinated harmony so your entire bridal party is ready on schedule with zero morning rush.',
        body2:
          'We tailor textures specifically for each guest—from age-graceful luminous satin finishes for mothers of the bride and groom to modern soft-glam waves and sleek buns for bridesmaids.',
        checklistCol1: [
          'Skin-Type Tailored Prep & Hydration',
          'Full Micro-HD Complexion & Soft-Glam Eyes',
          'Complimentary Strip or Cluster Silk Lashes',
          'Age-Graceful Crease-Free Under-Eye Setting'
        ],
        checklistCol2: [
          'Blowout, Waves, or Classic Textured Updo',
          'Saree or Dupatta Pleating & Pinning',
          'Coordinated Palette Matching Wedding Theme',
          '75-Minute Streamlined Suite Turnaround'
        ],
        processEyebrow: '75-Minute Guest Flow',
        processHeading: 'Streamlined Entourage Styling Steps',
        steps: [
          {
            time: '00:00 – 00:15',
            title: 'Step 1: Skin Prep & Shade Match',
            text: 'Quick hydrating primer and custom undertone matching for natural-looking coverage.',
            badge: '15 Minutes'
          },
          {
            time: '00:15 – 00:45',
            title: 'Step 2: HD Makeup & Lashes',
            text: 'Balanced eye definition, soft cheek sculpting, lashes, and long-wear lip color.',
            badge: '30 Minutes'
          },
          {
            time: '00:45 – 01:05',
            title: 'Step 3: Hair Styling',
            text: 'Polished blowout, soft curls, or classic chignon tailored to neckline and jewellery.',
            badge: '20 Minutes'
          },
          {
            time: '01:05 – 01:15',
            title: 'Step 4: Saree / Dupatta Pin',
            text: 'Clean pleat pressing and discreet safety-pin anchoring for effortless movement.',
            badge: '10 Minutes'
          }
        ],
        matrixEyebrow: 'Multi-Guest Calibration',
        matrixHeading: 'Customized For Every Entourage Role',
        matrix: [
          {
            tag: 'Mothers & Elders',
            title: 'Luminous Satin Lift',
            text: 'Weightless hydrating serums and soft matte-satin pigments that never settle into fine lines.',
            badge: 'Crease-Free'
          },
          {
            tag: 'Bridesmaids & Sisters',
            title: 'Coordinated Soft Glam',
            text: 'Harmonized blush and lip tones that complement bridesmaid ensembles in group portraits.',
            badge: 'Photo Cohesive'
          },
          {
            tag: 'Group Bookings (3+)',
            title: 'Dedicated Extra Artists',
            text: 'We dispatch additional senior artists so large suites finish simultaneously on time.',
            badge: 'On-Schedule'
          }
        ],
        sidebarRibbon: 'Entourage Favorite',
        sidebarTitle: 'Party & Family Styling',
        sidebarPrice: '$220',
        sidebarDesc: 'Per guest rate. Includes full HD makeup, hairstyling, lashes, and saree/dupatta pinning (75 mins).',
        sidebarBullets: [
          'Only $55 (25%) Retainer Per Guest Today',
          'Additional Artists Available for 4+ Guests',
          'Age-Graceful & Sensitive-Skin Safe Formulas'
        ]
      },
      'hair-draping': {
        docTitle: 'Hair Architecture & Couture Draping | Lumina Studio',
        breadcrumb: 'Hair Architecture & Draping',
        heroEyebrow: 'Crown & Couture Silhouette • 90 Mins',
        heroTitleHtml: 'Hair <span class="script-accent">Architecture</span> &amp; Couture Draping',
        heroSubtitle: 'Sculpted chignons, vintage Hollywood waves, Russian silk extension integration, and damage-free saree or cathedral veil anchoring.',
        imageBase: '../assets/images/services/srv-hair',
        imageAlt: 'Architectural Bridal Hairstyling and Fresh Floral Work service',
        dossierEyebrow: 'Structural Hair & Garment Engineering',
        dossierTitle: 'Weightless Crown Volume & Runway-Crisp Pleats',
        body1:
          'A bridal silhouette is only as strong as its structural foundation. Our Hair Architects engineer hidden internal anchor grids that support heavy mathapattis, passas, cathedral veils, and fresh floral garlands without pulling on your scalp or loosening during hours of dancing.',
        body2:
          'Paired with our Couture Draping discipline, we steam-press and micro-pleat heirloom Kanjeevaram sarees, double-dupatta lehengas, and sheer organza veils so every fold drapes with editorial symmetry.',
        checklistCol1: [
          'Thermal Volume Setting & Root-Lift Architecture',
          'Sculpted Chignon, Hollywood Waves, or Braided Crown',
          'Seamless Clip-In Extension Blending (Client or Studio)',
          'Hidden Veil & Heavy Jewellery Anchor Grid'
        ],
        checklistCol2: [
          'Micro-Steam Garment & Border Pressing',
          'Heirloom Saree or Double-Dupatta Precision Draping',
          'Damage-Free Cathedral Veil Comb Anchoring',
          'Humidity-Lock Gloss & Flyaway Serum Finish'
        ],
        processEyebrow: '90-Minute Choreography',
        processHeading: 'Hair & Draping Engineering Steps',
        steps: [
          {
            time: '00:00 – 00:25',
            title: 'Step 1: Thermal Base & Extensions',
            text: 'Heat-protectant prep, barrel setting, and seamless color-matched extension placement.',
            badge: '25 Minutes'
          },
          {
            time: '00:25 – 00:55',
            title: 'Step 2: Crown Sculpting',
            text: 'Building the chignon, wave pattern, or braided silhouette with zero visible pins.',
            badge: '30 Minutes'
          },
          {
            time: '00:55 – 01:15',
            title: 'Step 3: Jewels & Floral Wiring',
            text: 'Anchoring maangtikka, passa, or fresh mogra/orchid arrangements into the structural grid.',
            badge: '20 Minutes'
          },
          {
            time: '01:15 – 01:30',
            title: 'Step 4: Saree / Veil Draping',
            text: 'Precision pleating, shoulder-fall pinning, and cathedral veil placement.',
            badge: '15 Minutes'
          }
        ],
        matrixEyebrow: 'Silhouette Matrix',
        matrixHeading: 'Specialized Across Every Bridal Ensemble',
        matrix: [
          {
            tag: 'Heirloom Silk Sarees',
            title: 'Crisp Box-Pleat Draping',
            text: 'Narrow or traditional pallu pleating steamed flat to elongate your posture.',
            badge: 'Precision Press'
          },
          {
            tag: 'Double-Dupatta Lehengas',
            title: 'Balanced Shoulder & Head Veil',
            text: 'Distributes heavy zari dupatta weight evenly so your head drape never tugs.',
            badge: 'Zero Tension'
          },
          {
            tag: 'Cathedral & Mantilla Veils',
            title: 'Quick-Release Comb Lock',
            text: 'Holds securely outdoors in wind while releasing cleanly for your reception transition.',
            badge: 'Easy Release'
          }
        ],
        sidebarRibbon: 'Structural Precision',
        sidebarTitle: 'Hair & Couture Draping',
        sidebarPrice: '$280',
        sidebarDesc: 'Includes architectural bridal hairstyling, jewellery/floral anchoring, and couture saree or veil draping (90 mins).',
        sidebarBullets: [
          'Only $70 (25%) Retainer Due Today',
          'Saree/Veil Draping Only Option Also Available ($180)',
          'Compatible With Russian Silk Extensions Add-On'
        ]
      },
      trial: {
        docTitle: 'Bespoke 3-Hour Bridal Trial | Lumina Studio',
        breadcrumb: 'Bespoke Bridal Trial',
        heroEyebrow: 'Pre-Wedding Lab • 3 Hours',
        heroTitleHtml: 'Bespoke 3-Hour <span class="script-accent">Bridal Trial</span>',
        heroSubtitle: 'Private consultation testing HD vs Airbrush on half-face or two full eye and lip variations with studio portrait lighting.',
        imageBase: '../assets/images/services/srv-trial',
        imageAlt: 'Bespoke 3-Hour Bridal Trial and Skin Consultation session',
        dossierEyebrow: 'Pre-Wedding Artistry Lab',
        dossierTitle: 'Preview & Perfect Your Look Before Wedding Morning',
        body1:
          'Your bridal trial eliminates every ounce of wedding-morning guesswork. Over three unhurried hours in our Beverly Hills sanctuary, your Lead Creative Director analyzes your skin undertones, tests Micro-HD against Silicone Airbrush, and custom-blends your exact foundation, blush, and lip formulas.',
        body2:
          'We photograph your finished look under calibrated 5600K daylight, warm candlelight, and direct camera flash—then archive your formula card inside your Bride Dashboard. Best of all, your $240 trial fee is 100% credited when you upgrade to The Lumina Sovereign or Empress suite.',
        checklistCol1: [
          'Dermatological Skin & Sensitivity Assessment',
          'Side-by-Side Micro-HD vs Silicone Airbrush Test',
          'Two Eye & Lip Colorway Variations',
          'Custom Cashmere Lash Length & Curl Mapping'
        ],
        checklistCol2: [
          'Hair Silhouette & Veil/Jewellery Placement Mockup',
          '5600K Daylight & Direct Flash Test Portraits',
          '90-Day Pre-Wedding Skincare Roadmap',
          '100% Credited Toward Sovereign or Empress Suite'
        ],
        processEyebrow: '180-Minute Lab Session',
        processHeading: 'Inside Your 3-Hour Bridal Trial',
        steps: [
          {
            time: '00:00 – 00:35',
            title: 'Step 1: Moodboard & Skin Audit',
            text: 'Reviewing your lehenga/gown swatches, jewellery tones, and skin hydration baseline.',
            badge: '35 Minutes'
          },
          {
            time: '00:35 – 01:40',
            title: 'Step 2: Formula & Eye Calibration',
            text: 'Testing HD vs Airbrush longevity and comparing two tailored eye & lash styles.',
            badge: '65 Minutes'
          },
          {
            time: '01:40 – 02:30',
            title: 'Step 3: Hair & Veil Mockup',
            text: 'Pinning your trial updo or waves with your actual veil, dupatta, or headpiece.',
            badge: '50 Minutes'
          },
          {
            time: '02:30 – 03:00',
            title: 'Step 4: Lighting Test & Formula Lock',
            text: 'Capturing daylight/flash test photos and saving your custom shade recipe.',
            badge: '30 Minutes'
          }
        ],
        matrixEyebrow: 'Trial Benefits',
        matrixHeading: 'What You Walk Away With',
        matrix: [
          {
            tag: 'Multi-Light Verification',
            title: 'Daylight & Flash Portraits',
            text: 'See exactly how your complexion photographs under every lighting condition.',
            badge: 'Zero Surprises'
          },
          {
            tag: 'Ingredient Safety',
            title: 'Allergy & Wear Test',
            text: 'Wear your trial look for the rest of the day to verify 12+ hour comfort and hold.',
            badge: 'Dermatologist Safe'
          },
          {
            tag: 'Suite Upgrade Credit',
            title: '100% Fee Credited',
            text: 'Your $240 investment applies directly toward Sovereign or Empress commissions.',
            badge: 'Full Credit'
          }
        ],
        sidebarRibbon: 'Credited Toward Suite',
        sidebarTitle: 'Bespoke Bridal Trial',
        sidebarPrice: '$240',
        sidebarDesc: '3-hour private studio lab testing HD vs Airbrush, two look variations, hair mockup, and lighting test.',
        sidebarBullets: [
          '100% Credited Toward Sovereign / Empress Suite',
          'Includes 5600K Daylight & Flash Test Photos',
          'Custom Formula Saved to Bride Dashboard'
        ]
      }
    };

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el && typeof value === 'string') el.textContent = value;
    };

    const renderList = (id, items) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = items.map((item) => `<li>${CHECK_SVG} ${item}</li>`).join('');
    };

    const applyService = (rawKey, updateUrl) => {
      const key = SERVICES[rawKey] ? rawKey : 'bridal-makeup';
      const data = SERVICES[key];

      document.title = data.docTitle;
      setText('serviceBreadcrumbCurrent', data.breadcrumb);
      setText('serviceHeroEyebrow', data.heroEyebrow);
      const heroTitle = document.getElementById('service-detail-title');
      if (heroTitle) heroTitle.innerHTML = data.heroTitleHtml;
      setText('serviceHeroSubtitle', data.heroSubtitle);

      const webp = document.getElementById('serviceHeroWebp');
      const img = document.getElementById('serviceHeroImg');
      if (webp) webp.setAttribute('srcset', `${data.imageBase}.webp`);
      if (img) {
        img.setAttribute('src', `${data.imageBase}.jpg`);
        img.setAttribute('alt', data.imageAlt);
      }

      setText('serviceDossierEyebrow', data.dossierEyebrow);
      setText('serviceDossierTitle', data.dossierTitle);
      setText('serviceDossierBody1', data.body1);
      setText('serviceDossierBody2', data.body2);

      renderList('serviceChecklistCol1', data.checklistCol1);
      renderList('serviceChecklistCol2', data.checklistCol2);

      setText('serviceProcessEyebrow', data.processEyebrow);
      setText('serviceProcessHeading', data.processHeading);
      const processGrid = document.getElementById('serviceProcessGrid');
      if (processGrid) {
        processGrid.innerHTML = data.steps
          .map(
            (step) => `
              <article class="tilt-card">
                <span class="card-tag">${step.time}</span>
                <h4 class="card-title">${step.title}</h4>
                <p class="card-text">${step.text}</p>
                <div class="card-footer"><span class="badge badge--gold">${step.badge}</span></div>
              </article>`
          )
          .join('');
      }

      setText('serviceMatrixEyebrow', data.matrixEyebrow);
      setText('serviceMatrixHeading', data.matrixHeading);
      const matrixGrid = document.getElementById('serviceMatrixGrid');
      if (matrixGrid) {
        matrixGrid.innerHTML = data.matrix
          .map(
            (card) => `
              <article class="tilt-card">
                <span class="card-tag">${card.tag}</span>
                <h4 class="card-title">${card.title}</h4>
                <p class="card-text">${card.text}</p>
                <div class="card-footer"><span class="badge badge--success">${card.badge}</span></div>
              </article>`
          )
          .join('');
      }

      setText('serviceSidebarRibbon', data.sidebarRibbon);
      setText('serviceSidebarTitle', data.sidebarTitle);
      const priceEl = document.getElementById('serviceSidebarPrice');
      if (priceEl) {
        priceEl.innerHTML = `${data.sidebarPrice} <span class="fs-sm text-muted">USD</span>`;
      }
      setText('serviceSidebarDesc', data.sidebarDesc);
      renderList('serviceSidebarBullets', data.sidebarBullets);

      const bookLink = document.getElementById('serviceBookLink');
      if (bookLink) {
        bookLink.setAttribute('href', `book-now.html?service=${encodeURIComponent(key)}`);
      }

      nav.querySelectorAll('[data-service-key]').forEach((btn) => {
        const active = btn.getAttribute('data-service-key') === key;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      if (window.AurelleTilt && typeof window.AurelleTilt.init === 'function') {
        window.AurelleTilt.init();
      }

      if (updateUrl && window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('service', key);
        window.history.replaceState({}, '', url.toString());
      }
    };

    nav.querySelectorAll('[data-service-key]').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyService(btn.getAttribute('data-service-key'), true);
      });
    });

    const params = new URLSearchParams(window.location.search);
    const initialService = params.get('service');
    if (initialService && SERVICES[initialService]) {
      applyService(initialService, false);
    }
  }

  /* ------------------------------------------------------------------------
     12. BOOTSTRAP ON DOMCONTENTLOADED
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initThemeAndRTL();
    initNavigation();
    initCustomCursor();
    if (window.AurelleTilt) window.AurelleTilt.init();
    if (window.AurelleReveal) window.AurelleReveal.init();
    if (window.AurelleSlider) window.AurelleSlider.init();
    initBeforeAfterAndTechniques();
    initTabsAndAccordions();
    initPortfolioAndLightbox();
    initServiceCalculator();
    initServiceDetails();
    initCounters();
    initForms();
    initScrollTop();
  });

  window.AurelleToast = showToast;
})();
