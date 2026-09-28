/**
 * TAAGA BY DISHA — LUXURY UI/UX POLISH & INTERACTION CONTROLLER
 * Phase 2 Deliverable: Lenis Fluid Scroll, GSAP ScrollTrigger Sync, PDP Tactile Zoom & Magnetic Cards
 * 
 * Capabilities:
 * 1. Global Lenis smooth scroll wrapping with luxury weighted inertia (duration 1.2s, exponential ease).
 * 2. Strict GSAP Ticker & ScrollTrigger synchronization (prevents canvas hero scrub jitter).
 * 3. Mobile physics tuning (bypasses/disables Lenis interpolation on viewports < 768px / touch devices).
 * 4. High-resolution PDP Tactile Zoom micro-interactions with slow-ease lerp cursor inspection.
 * 5. Desktop magnetic card micro-tilt and seamless folded-to-drape cross-fade handlers.
 * 6. Zero CLI/npm dependencies — 100% copy-pasteable for Shopify visual themes and web editors.
 */

(function () {
  'use strict';

  class TaagaLuxuryPolish {
    constructor() {
      this.lenis = null;
      this.gsapTickerCallback = null;
      this.fallbackRafId = null;
      this.isMobile = this.checkMobile();
      this.zoomInstances = [];
      this.init();
    }

    /**
     * Determines whether the current device is a touch screen or mobile viewport (< 768px).
     * Prevents misclassifying modern 1080p/4K touchscreen desktop & laptop displays as mobile.
     */
    checkMobile() {
      return (
        window.innerWidth < 768 ||
        window.matchMedia('(max-width: 767px)').matches ||
        (('ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)) && window.innerWidth < 1024)
      );
    }

    init() {
      // 1. Initialize Lenis Smooth Scroll with GSAP Synchronization
      this.initLenisScroll();

      // 2. Initialize PDP High-Resolution Tactile Zoom Micro-Interactions
      this.initPdpTactileZoom();

      // 3. Initialize Magnetic Micro-Interactions on Product Cards
      this.initCardInteractions();

      // 4. Bridge Cart Drawer open/close states to stop/start Lenis scroll
      this.initCartLenisBridge();

      // 5. Initialize Flagship Features: Stories, Hotspots, Occasions, VIP Club, Swatches
      this.initStoryReels();
      this.initShopTheLookHotspots();
      this.initOccasionFilters();
      this.initCartGiftProgress();
      this.initPrivilegeClaim();
      this.initCardSwatches();
      this.initCatalogViewToggle();

      // 6. Handle Viewport Resize and Mobile Physics Transitions
      window.addEventListener('resize', () => this.handleResize(), { passive: true });
    }

    /* ========================================================================
       1. GLOBAL FLUID SCROLLING (LENIS INTEGRATION & GSAP SYNC)
       ======================================================================== */
    async initLenisScroll() {
      // Ensure Lenis script is loaded
      await this.ensureLenisLoaded();
      // Ensure GSAP and ScrollTrigger are loaded if present in page
      await this.ensureGsapLoaded();

      if (typeof Lenis === 'undefined') {
        console.warn('[TaagaPolish] Lenis library could not be loaded; continuing with native scroll.');
        return;
      }

      this.isMobile = this.checkMobile();

      // Mobile Tuning: If viewport < 768px or touch device, respect native momentum scrolling physics
      if (this.isMobile) {
        document.documentElement.classList.remove('lenis-enabled');
        document.documentElement.classList.add('lenis-mobile-native');
        return;
      }

      // Desktop Configuration: Weighty, premium boutique tactile feel
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.0,
        syncTouch: false, // Strict: Never hijack touch events
        autoRaf: false, // Strict: Raf handled explicitly by GSAP ticker
        infinite: false
      });

      document.documentElement.classList.remove('lenis-mobile-native');
      document.documentElement.classList.add('lenis-enabled');

      // STRICT GSAP SYNCHRONIZATION:
      // Hook Lenis scroll to GSAP ScrollTrigger to prevent hero video scrub jitter or frame desync
      this.syncWithGsap();
    }

    /**
     * Dynamically loads Lenis CDN if not already in document
     */
    ensureLenisLoaded() {
      if (typeof Lenis !== 'undefined') return Promise.resolve();

      return new Promise((resolve) => {
        const existing = document.querySelector('script[src*="lenis"]');
        if (existing) {
          existing.addEventListener('load', resolve, { once: true });
          if (typeof Lenis !== 'undefined') resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => {
          console.warn('[TaagaPolish] Lenis CDN failed to load; using native scrolling.');
          resolve();
        };
        document.head.appendChild(script);
      });
    }

    /**
     * Ensures GSAP and ScrollTrigger are loaded if deferred or loaded asynchronously
     */
    ensureGsapLoaded() {
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if ((typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') || attempts > 30) {
            clearInterval(interval);
            resolve();
          }
        }, 50);
      });
    }

    /**
     * Synchronizes Lenis requestAnimationFrame with GSAP Ticker & ScrollTrigger
     */
    syncWithGsap() {
      if (!this.lenis) return;

      const updateScrollTrigger = () => {
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.update();
        }
      };

      // Notify ScrollTrigger whenever Lenis scrolls
      this.lenis.on('scroll', updateScrollTrigger);

      // Clean up any previously registered ticker callback or fallback loop
      if (this.gsapTickerCallback && typeof gsap !== 'undefined') {
        gsap.ticker.remove(this.gsapTickerCallback);
        this.gsapTickerCallback = null;
      }
      if (this.fallbackRafId) {
        cancelAnimationFrame(this.fallbackRafId);
        this.fallbackRafId = null;
      }

      // Connect Lenis RAF directly to GSAP ticker
      if (typeof gsap !== 'undefined') {
        this.gsapTickerCallback = (time) => {
          if (this.lenis) {
            this.lenis.raf(time * 1000);
          }
        };

        gsap.ticker.add(this.gsapTickerCallback);

        // Turn off GSAP ticker lag smoothing to eliminate lag spikes during canvas scrubs
        gsap.ticker.lagSmoothing(0);
      } else {
        // Fallback standalone RAF loop if GSAP is unavailable
        const raf = (time) => {
          if (this.lenis) {
            this.lenis.raf(time);
            this.fallbackRafId = requestAnimationFrame(raf);
          }
        };
        this.fallbackRafId = requestAnimationFrame(raf);
      }
    }

    destroyLenis() {
      if (this.gsapTickerCallback && typeof gsap !== 'undefined') {
        gsap.ticker.remove(this.gsapTickerCallback);
        this.gsapTickerCallback = null;
      }
      if (this.fallbackRafId) {
        cancelAnimationFrame(this.fallbackRafId);
        this.fallbackRafId = null;
      }
      if (this.lenis) {
        this.lenis.destroy();
        this.lenis = null;
      }
      document.documentElement.classList.remove('lenis-enabled');
      document.documentElement.classList.add('lenis-mobile-native');
    }

    handleResize() {
      const nowMobile = this.checkMobile();
      if (nowMobile !== this.isMobile) {
        this.isMobile = nowMobile;
        if (this.isMobile && this.lenis) {
          // Tear down Lenis on mobile to restore native physics cleanly without ticker crashes
          this.destroyLenis();
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        } else if (!this.isMobile && !this.lenis) {
          // Re-initialize on desktop
          document.documentElement.classList.remove('lenis-mobile-native');
          this.initLenisScroll();
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        }
      }
    }

    /**
     * Synchronizes Cart Drawer visibility with Lenis to prevent background page scroll
     */
    initCartLenisBridge() {
      const cartDrawer = document.getElementById('cart-drawer');
      if (!cartDrawer) return;

      const observer = new MutationObserver(() => {
        const isOpen = cartDrawer.classList.contains('is-open');
        if (isOpen && this.lenis) {
          this.lenis.stop();
        } else if (!isOpen && this.lenis && !document.body.classList.contains('pdp-modal-locked')) {
          this.lenis.start();
        }
      });
      observer.observe(cartDrawer, { attributes: true, attributeFilter: ['class'] });
    }

    /* ========================================================================
       2. PRODUCT DETAIL PAGE (PDP) TACTILE ZOOM MICRO-INTERACTIONS
       ======================================================================== */
    initPdpTactileZoom() {
      // Find all PDP zoom containers in document
      const zoomElements = document.querySelectorAll('[data-tactile-zoom], .pdp-media-zoom, .tactile-zoom-stage');
      zoomElements.forEach((el) => {
        if (!el.__zoomInstance) {
          const instance = new PdpTactileZoom(el);
          el.__zoomInstance = instance;
          this.zoomInstances.push(instance);
        }
      });

      // Setup global Quick-Inspect Modal for catalog cards
      this.initCatalogQuickInspect();
    }

    /**
     * Enables clicking on any catalog card's detail/zoom button to open the tactile inspector
     */
    initCatalogQuickInspect() {
      if (this.quickInspectBound) return;
      this.quickInspectBound = true;

      document.addEventListener('click', (e) => {
        const inspectBtn = e.target.closest('[data-open-zoom-inspect]');
        if (!inspectBtn) return;
        e.preventDefault();

        const card = inspectBtn.closest('.product-card');
        if (!card) return;

        const title = inspectBtn.dataset.title || card.querySelector('.product-card__title')?.textContent?.trim() || 'Handloom Saree';
        const craft = inspectBtn.dataset.craft || card.querySelector('.product-card__craft-origin')?.textContent?.trim() || 'Artisanal Handloom';
        const zoomImg = inspectBtn.dataset.zoomSrc || card.querySelector('.product-card__image--drape')?.src || card.querySelector('.product-card__image')?.src;
        const foldedImg = card.querySelector('.product-card__image--folded')?.src || zoomImg;

        this.openPdpZoomModal({ title, craft, zoomImg, foldedImg });
      });
    }

    openPdpZoomModal(data) {
      let modal = document.getElementById('pdp-tactile-zoom-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'pdp-tactile-zoom-modal';
        modal.className = 'pdp-zoom-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Tactile Fabric Inspection Modal');
        modal.innerHTML = `
          <div class="pdp-zoom-modal__backdrop" data-close-modal></div>
          <div class="pdp-zoom-modal__content" data-lenis-prevent>
            <button type="button" class="pdp-zoom-modal__close" data-close-modal aria-label="Close Inspector">&times;</button>
            <div class="pdp-zoom-modal__header">
              <span class="sub-title" id="pdp-modal-craft"></span>
              <h2 class="pdp-zoom-modal__title" id="pdp-modal-title"></h2>
              <p class="pdp-zoom-modal__hint">Hover & glide cursor slowly across fabric to inspect handspun weave, zari kadwa & pallu detail.</p>
            </div>
            <div class="pdp-zoom-modal__stage-wrap">
              <div class="tactile-zoom-stage" id="pdp-modal-zoom-stage" data-tactile-zoom data-zoom-scale="2.5">
                <img id="pdp-modal-zoom-img" class="tactile-zoom-img" src="" alt="High resolution inspection" loading="eager" width="1200" height="1500">
                <div class="tactile-zoom-hud" aria-hidden="true">
                  <span class="tactile-zoom-hud__pill">2.5× High-Definition Weave Inspection</span>
                  <span class="tactile-zoom-hud__coords" id="pdp-modal-coords" data-zoom-coords>X: 50% | Y: 50%</span>
                </div>
              </div>
            </div>
            <div class="pdp-zoom-modal__footer">
              <div class="pdp-zoom-modal__swatches">
                <button type="button" class="pdp-zoom-modal__swatch is-active" id="btn-swatch-drape">Model Drape</button>
                <button type="button" class="pdp-zoom-modal__swatch" id="btn-swatch-folded">Folded Raw Fabric</button>
              </div>
              <span class="pdp-zoom-modal__meta">Silk Mark Certified • 100% Zero Pixelation AI Draping Architecture</span>
            </div>
          </div>
        `;
        document.body.appendChild(modal);

        // Bind modal close
        modal.querySelectorAll('[data-close-modal]').forEach((btn) => {
          btn.addEventListener('click', () => {
            modal.classList.remove('is-open');
            document.body.classList.remove('pdp-modal-locked');
            const stage = document.getElementById('pdp-modal-zoom-stage');
            if (stage && stage.__zoomInstance) stage.__zoomInstance.reset();
            if (this.lenis) this.lenis.start();
          });
        });

        // Close on Escape key
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            modal.classList.remove('is-open');
            document.body.classList.remove('pdp-modal-locked');
            const stage = document.getElementById('pdp-modal-zoom-stage');
            if (stage && stage.__zoomInstance) stage.__zoomInstance.reset();
            if (this.lenis) this.lenis.start();
          }
        });
      }

      // Populate data
      document.getElementById('pdp-modal-title').textContent = data.title;
      document.getElementById('pdp-modal-craft').textContent = data.craft;
      const zoomImgEl = document.getElementById('pdp-modal-zoom-img');
      zoomImgEl.src = data.zoomImg;

      const stage = document.getElementById('pdp-modal-zoom-stage');

      // Swatch toggle buttons — ensure clean reset to default drape state
      const btnDrape = document.getElementById('btn-swatch-drape');
      const btnFolded = document.getElementById('btn-swatch-folded');

      btnDrape.classList.add('is-active');
      btnFolded.classList.remove('is-active');

      btnDrape.onclick = () => {
        btnDrape.classList.add('is-active');
        btnFolded.classList.remove('is-active');
        zoomImgEl.src = data.zoomImg;
        if (stage && stage.__zoomInstance) stage.__zoomInstance.reset();
      };

      btnFolded.onclick = () => {
        btnFolded.classList.add('is-active');
        btnDrape.classList.remove('is-active');
        zoomImgEl.src = data.foldedImg;
        if (stage && stage.__zoomInstance) stage.__zoomInstance.reset();
      };

      // Open Modal
      modal.classList.add('is-open');
      document.body.classList.add('pdp-modal-locked');
      if (this.lenis) this.lenis.stop();

      // Init or reset zoom stage inside modal
      if (!stage.__zoomInstance) {
        stage.__zoomInstance = new PdpTactileZoom(stage);
      } else {
        stage.__zoomInstance.reset();
      }
    }

    /* ========================================================================
       3. MAGNETIC HOVER MICRO-INTERACTIONS (PRODUCT CARDS)
       ======================================================================== */
    initCardInteractions() {
      // Find all product cards with dual-image hover drape
      const cards = document.querySelectorAll('.product-card');
      if (!cards.length) return;

      cards.forEach((card) => {
        if (card.__hasCardInteractions) return;
        card.__hasCardInteractions = true;

        const mediaWrap = card.querySelector('.product-card__media-wrap');
        const drapeImg = card.querySelector('.product-card__image--drape');

        if (!mediaWrap) return;

        // Subtle 3D Magnetic Tilt Micro-Interaction (Desktop only)
        if (!this.isMobile) {
          let rafId = null;
          let targetRotX = 0;
          let targetRotY = 0;
          let currentRotX = 0;
          let currentRotY = 0;

          const renderTilt = () => {
            currentRotX += (targetRotX - currentRotX) * 0.12;
            currentRotY += (targetRotY - currentRotY) * 0.12;

            if (Math.abs(targetRotX - currentRotX) > 0.01 || Math.abs(targetRotY - currentRotY) > 0.01) {
              mediaWrap.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
              rafId = requestAnimationFrame(renderTilt);
            } else {
              // Smoothly terminated: clean up inline transform cleanly with zero race condition
              currentRotX = targetRotX;
              currentRotY = targetRotY;
              if (targetRotX === 0 && targetRotY === 0) {
                mediaWrap.style.transform = '';
              } else {
                mediaWrap.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
              }
              rafId = null;
            }
          };

          card.addEventListener('mousemove', (e) => {
            const rect = mediaWrap.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            // Maximum tilt angle: ±3.5 degrees (understated luxury restraint)
            targetRotX = (0.5 - y) * 7;
            targetRotY = (x - 0.5) * 7;

            if (!rafId) {
              rafId = requestAnimationFrame(renderTilt);
            }
          }, { passive: true });

          card.addEventListener('mouseleave', () => {
            targetRotX = 0;
            targetRotY = 0;
            if (!rafId) {
              rafId = requestAnimationFrame(renderTilt);
            }
          });
        }

        // Preload Drape Image on cursor hover or focus
        card.addEventListener('mouseenter', () => {
          if (drapeImg && drapeImg.dataset.src && !drapeImg.src) {
            drapeImg.src = drapeImg.dataset.src;
          }
        }, { once: true, passive: true });
      });
    }

    /* ========================================================================
       5. ANNOUNCEMENT & PRIVILEGE TICKER BAR
       ======================================================================== */
    initAnnouncementTicker() {
      // Disabled per patron request for a clean, non-intrusive luxury header
      return;
    }

    /* ========================================================================
       6. CIRCULAR STORY REELS & MODAL VIEWER
       ======================================================================== */
    initStoryReels() {
      const reelButtons = document.querySelectorAll('.story-reel-item');
      const modal = document.getElementById('story-reels-modal');
      if (!reelButtons.length || !modal) return;

      let progressInterval = null;
      let currentStoryIdx = 0;
      const totalStories = reelButtons.length;

      const openStory = (idx) => {
        currentStoryIdx = idx;
        const btn = reelButtons[idx];
        const title = btn.dataset.storyTitle || 'Artisan Story';
        const desc = btn.dataset.storyDesc || '';
        const media = btn.dataset.storyMedia || '';
        const craft = btn.dataset.storyCraft || 'Handloom Heritage';
        const link = btn.dataset.storyLink || '#catalog';

        modal.querySelector('.story-modal-title').textContent = title;
        modal.querySelector('.story-modal-desc').textContent = desc;
        modal.querySelector('.story-header-name').textContent = craft;
        const img = modal.querySelector('.story-modal-media');
        if (img) img.src = media;
        const ctaBtn = modal.querySelector('.story-modal-btn');
        if (ctaBtn) {
          ctaBtn.onclick = () => {
            closeStory();
            const target = document.querySelector(link);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          };
        }

        // Setup progress bar
        const fills = modal.querySelectorAll('.story-progress-fill');
        fills.forEach((fill, i) => {
          if (i < idx) fill.style.width = '100%';
          else if (i > idx) fill.style.width = '0%';
          else fill.style.width = '0%';
        });

        modal.classList.add('is-open');
        document.body.classList.add('pdp-modal-locked');
        if (this.lenis) this.lenis.stop();

        // Animate progress segment over 5 seconds
        clearInterval(progressInterval);
        let pct = 0;
        progressInterval = setInterval(() => {
          pct += 2;
          if (fills[currentStoryIdx]) fills[currentStoryIdx].style.width = pct + '%';
          if (pct >= 100) {
            clearInterval(progressInterval);
            if (currentStoryIdx + 1 < totalStories) {
              openStory(currentStoryIdx + 1);
            } else {
              closeStory();
            }
          }
        }, 100);
      };

      const closeStory = () => {
        clearInterval(progressInterval);
        modal.classList.remove('is-open');
        document.body.classList.remove('pdp-modal-locked');
        if (this.lenis) this.lenis.start();
      };

      reelButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => openStory(idx));
      });

      modal.querySelectorAll('[data-close-story]').forEach((el) => {
        el.addEventListener('click', closeStory);
      });

      // Tap left/right to navigate
      modal.querySelector('.story-modal-card')?.addEventListener('click', (e) => {
        if (e.target.closest('.story-modal-close') || e.target.closest('.story-modal-btn')) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX < rect.width * 0.35 && currentStoryIdx > 0) {
          openStory(currentStoryIdx - 1);
        } else if (clickX > rect.width * 0.65 && currentStoryIdx + 1 < totalStories) {
          openStory(currentStoryIdx + 1);
        }
      });
    }

    /* ========================================================================
       7. INTERACTIVE SHOP THE LOOK HOTSPOTS
       ======================================================================== */
    initShopTheLookHotspots() {
      const pins = document.querySelectorAll('.hotspot-pin');
      const popover = document.getElementById('hotspot-popover');
      if (!pins.length || !popover) return;

      const showPopover = (pin) => {
        pins.forEach((p) => p.classList.remove('is-active'));
        pin.classList.add('is-active');

        const title = pin.dataset.itemTitle || '';
        const price = pin.dataset.itemPrice || '';
        const variantId = pin.dataset.variantId || '';

        popover.querySelector('.hotspot-popover__title').textContent = title;
        popover.querySelector('.hotspot-popover__price').textContent = price;

        const addBtn = popover.querySelector('.hotspot-popover__btn');
        if (addBtn) {
          addBtn.onclick = () => {
            const cardAddBtn = document.querySelector(`[data-variant-id="${variantId}"]`);
            if (cardAddBtn) cardAddBtn.click();
            else {
              const trigger = document.getElementById('cart-drawer-trigger');
              if (trigger) trigger.click();
            }
          };
        }

        const x = parseFloat(pin.dataset.x) || 50;
        const y = parseFloat(pin.dataset.y) || 50;
        popover.style.left = (x > 60 ? (x - 35) : (x + 4)) + '%';
        popover.style.top = (y > 70 ? (y - 20) : y) + '%';
        popover.classList.add('is-visible');
      };

      pins.forEach((pin) => {
        pin.addEventListener('click', (e) => {
          e.stopPropagation();
          showPopover(pin);
        });
        pin.addEventListener('mouseenter', () => showPopover(pin));
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.hotspot-canvas-wrap')) {
          popover.classList.remove('is-visible');
          pins.forEach((p) => p.classList.remove('is-active'));
        }
      });

      const bundleBtn = document.getElementById('btn-shop-trousseau-bundle');
      if (bundleBtn) {
        bundleBtn.addEventListener('click', () => {
          const btn1 = document.querySelector('[data-variant-id="saree-01"]');
          if (btn1) btn1.click();
          setTimeout(() => {
            const drawer = document.getElementById('cart-drawer');
            if (drawer && !drawer.classList.contains('is-open')) {
              document.getElementById('cart-drawer-trigger')?.click();
            }
          }, 300);
        });
      }
    }

    /* ========================================================================
       8. CURATED BY OCCASION FILTER TABS
       ======================================================================== */
    initOccasionFilters() {
      const tabButtons = document.querySelectorAll('.occasion-tab-btn');
      const cards = document.querySelectorAll('.product-card');
      if (!tabButtons.length || !cards.length) return;

      tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          tabButtons.forEach((b) => b.classList.remove('is-active'));
          btn.classList.add('is-active');

          const filter = btn.dataset.occasionFilter || 'all';

          cards.forEach((card) => {
            const cardOccasion = card.dataset.occasion || 'all';
            const matches = filter === 'all' || cardOccasion.includes(filter);

            if (matches) {
              card.style.display = '';
              if (typeof gsap !== 'undefined') {
                gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
              } else {
                card.style.opacity = '1';
              }
            } else {
              card.style.display = 'none';
            }
          });

          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }
        });
      });
    }

    /* ========================================================================
       9. LIVE CART DRAWER GIFT PROGRESSION BAR
       ======================================================================== */
    initCartGiftProgress() {
      const giftBar = document.getElementById('cart-gift-bar');
      const giftFill = document.getElementById('cart-gift-fill');
      const giftMsg = document.getElementById('cart-gift-msg');
      if (!giftBar || !giftFill || !giftMsg) return;

      const THRESHOLD = 50000;

      const updateGiftProgress = () => {
        const subtotalEl = document.getElementById('cart-drawer-subtotal');
        if (!subtotalEl) return;
        const text = subtotalEl.textContent.replace(/[^0-9]/g, '');
        const currentSubtotal = parseInt(text, 10) || 0;

        if (currentSubtotal >= THRESHOLD) {
          giftFill.style.width = '100%';
          giftFill.style.background = 'linear-gradient(90deg, #14b8a6, #c99b53)';
          giftMsg.innerHTML = '<span>🎉 <strong>Privilege Unlocked:</strong> Complimentary Pure Silk Stole (₹4,500 value) added!</span>';
        } else {
          const remaining = THRESHOLD - currentSubtotal;
          const pct = Math.min(100, Math.round((currentSubtotal / THRESHOLD) * 100));
          giftFill.style.width = pct + '%';
          giftFill.style.background = 'linear-gradient(90deg, var(--color-teal-primary), var(--color-teal-vibrant))';
          const formattedRemaining = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(remaining);
          giftMsg.innerHTML = `<span>Add <strong>${formattedRemaining}</strong> more for a <em>Complimentary Pure Silk Stole</em></span> <span>${pct}%</span>`;
        }
      };

      const subtotalEl = document.getElementById('cart-drawer-subtotal');
      if (subtotalEl) {
        const observer = new MutationObserver(updateGiftProgress);
        observer.observe(subtotalEl, { childList: true, characterData: true, subtree: true });
      }
      updateGiftProgress();
    }

    /* ========================================================================
       10. DISCREET REAL-TIME PURCHASE PULSES
       ======================================================================== */
    initPurchasePulses() {
      // Disabled per patron request: acquire notifications permanently silenced
      return;
    }

    /* ========================================================================
       11. TAAGA PRIVILEGE CLUB INSTANT CLAIM
       ======================================================================== */
    initPrivilegeClaim() {
      const claimBtn = document.getElementById('btn-claim-privilege-pass');
      if (!claimBtn) return;

      claimBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('ATELIER2026').catch(() => {});
        claimBtn.textContent = '✓ Privilege Pass Activated (10% Off)';
        claimBtn.style.background = 'var(--color-gold-zari)';
        claimBtn.style.color = '#120b07';

        setTimeout(() => {
          document.getElementById('cart-drawer-trigger')?.click();
        }, 400);
      });
    }

    /* ========================================================================
       12. ARCHITECTURAL CARD SWATCH PERSPECTIVE LENSES
       ======================================================================== */
    initCardSwatches() {
      document.addEventListener('click', (e) => {
        const dot = e.target.closest('.card-swatch-dot');
        if (!dot) return;

        const card = dot.closest('.product-card');
        if (!card) return;

        const dots = card.querySelectorAll('.card-swatch-dot');
        dots.forEach(d => d.classList.remove('is-active'));
        dot.classList.add('is-active');

        const viewType = dot.getAttribute('data-view');
        const viewSrc = dot.getAttribute('data-src');
        const foldedImg = card.querySelector('.product-card__image--folded');
        const drapeImg = card.querySelector('.product-card__image--drape');
        const inspectBtn = card.querySelector('[data-open-zoom-inspect]');

        if (viewType === 'drape' && drapeImg) {
          if (foldedImg) foldedImg.style.opacity = '0';
          drapeImg.style.opacity = '1';
          if (inspectBtn) inspectBtn.setAttribute('data-zoom-src', drapeImg.src);
        } else if (viewType === 'folded' && foldedImg) {
          if (foldedImg) foldedImg.style.opacity = '1';
          if (drapeImg) drapeImg.style.opacity = '0';
          if (inspectBtn) inspectBtn.setAttribute('data-zoom-src', foldedImg.src);
        } else if (viewSrc && drapeImg) {
          drapeImg.src = viewSrc;
          if (foldedImg) foldedImg.style.opacity = '0';
          drapeImg.style.opacity = '1';
          if (inspectBtn) inspectBtn.setAttribute('data-zoom-src', viewSrc);
        }
      });
    }

    /* ========================================================================
       13. CATALOG VIEW MODE TOGGLE (EDITORIAL LOOKBOOK VS ARCHIVE GRID)
       ======================================================================== */
    initCatalogViewToggle() {
      const toggleContainer = document.querySelector('.catalog-view-toggle');
      const gridContainer = document.getElementById('product-grid-container');
      if (!toggleContainer || !gridContainer) return;

      const buttons = toggleContainer.querySelectorAll('.catalog-view-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');

          const mode = btn.getAttribute('data-view-mode');
          if (mode === 'editorial') {
            gridContainer.classList.add('product-grid--editorial');
          } else {
            gridContainer.classList.remove('product-grid--editorial');
          }

          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }
        });
      });
    }
  }

  /* ========================================================================
     PDP TACTILE ZOOM COMPONENT (Slow-Ease Lerp Cursor Magnifier)
     ======================================================================== */
  class PdpTactileZoom {
    constructor(container) {
      this.container = container;
      this.img = container.querySelector('.tactile-zoom-img, [data-zoom-img], img');
      if (!this.img) return;

      this.scale = parseFloat(container.dataset.zoomScale) || 2.4; // 2.4x luxury macro inspection
      this.lerpFactor = 0.085; // Silky slow-ease velocity
      this.isHovered = false;

      // Coordinate state
      this.targetX = 0.5;
      this.targetY = 0.5;
      this.currentX = 0.5;
      this.currentY = 0.5;
      this.currentScale = 1.0;
      this.targetScale = 1.0;
      this.rafId = null;

      // Coordinate display HUD
      this.coordLabel = container.querySelector('#pdp-modal-coords, [data-zoom-coords]');

      this.init();
    }

    init() {
      // CSS isolation & hardware acceleration
      this.container.classList.add('has-tactile-zoom');
      this.img.style.willChange = 'transform, transform-origin';
      this.img.style.transformOrigin = '50% 50%';

      this.container.addEventListener('mouseenter', (e) => this.onMouseEnter(e));
      this.container.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
      this.container.addEventListener('mouseleave', () => this.onMouseLeave());

      // Touch / Mobile Support (Tap to inspect)
      this.container.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
      this.container.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: true });
      this.container.addEventListener('touchend', () => this.onMouseLeave());

      // Accessible Keyboard Support (Tab + Arrows)
      this.container.setAttribute('tabindex', '0');
      this.container.setAttribute('role', 'region');
      this.container.setAttribute('aria-label', 'Interactive Fabric Texture Zoom. Use arrow keys to pan.');
      this.container.addEventListener('keydown', (e) => this.onKeyDown(e));
      this.container.addEventListener('blur', () => this.onMouseLeave());
    }

    onMouseEnter(e) {
      this.isHovered = true;
      this.targetScale = this.scale;
      this.container.classList.add('is-zooming');
      this.updateCoordinates(e);
      this.startLoop();
    }

    onMouseMove(e) {
      if (!this.isHovered) return;
      this.updateCoordinates(e);
    }

    updateCoordinates(e) {
      const rect = this.container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const rawX = (clientX - rect.left) / rect.width;
      const rawY = (clientY - rect.top) / rect.height;

      // Clamp strictly between 0 and 1
      this.targetX = Math.max(0, Math.min(1, rawX));
      this.targetY = Math.max(0, Math.min(1, rawY));

      this.updateCoordLabel(this.targetX, this.targetY);
    }

    updateCoordLabel(x, y) {
      if (this.coordLabel) {
        const pctX = Math.round(x * 100);
        const pctY = Math.round(y * 100);
        this.coordLabel.textContent = `X: ${pctX}% | Y: ${pctY}%`;
      }
    }

    onMouseLeave() {
      this.isHovered = false;
      this.container.classList.remove('is-zooming');
      this.targetScale = 1.0;
      this.targetX = 0.5;
      this.targetY = 0.5;
      this.startLoop();
    }

    onTouchStart(e) {
      this.isHovered = true;
      this.targetScale = this.scale;
      this.container.classList.add('is-zooming');
      this.updateCoordinates(e);
      this.startLoop();
    }

    onTouchMove(e) {
      if (!this.isHovered) return;
      this.updateCoordinates(e);
    }

    onKeyDown(e) {
      const step = 0.08;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        if (!this.isHovered) {
          this.isHovered = true;
          this.targetScale = this.scale;
          this.container.classList.add('is-zooming');
          this.startLoop();
        }
        if (e.key === 'ArrowUp') this.targetY = Math.max(0, this.targetY - step);
        if (e.key === 'ArrowDown') this.targetY = Math.min(1, this.targetY + step);
        if (e.key === 'ArrowLeft') this.targetX = Math.max(0, this.targetX - step);
        if (e.key === 'ArrowRight') this.targetX = Math.min(1, this.targetX + step);
        this.updateCoordLabel(this.targetX, this.targetY);
      } else if (e.key === 'Escape' || e.key === 'Enter') {
        this.onMouseLeave();
      }
    }

    startLoop() {
      if (this.rafId) cancelAnimationFrame(this.rafId);

      const loop = () => {
        // Linear interpolation (lerp) for weighty slow-ease tactile inertia
        this.currentX += (this.targetX - this.currentX) * this.lerpFactor;
        this.currentY += (this.targetY - this.currentY) * this.lerpFactor;
        this.currentScale += (this.targetScale - this.currentScale) * this.lerpFactor;

        this.render();

        if (!this.isHovered) {
          const scaleRest = Math.abs(this.currentScale - 1.0) < 0.005;
          const posRest = Math.abs(this.currentX - 0.5) < 0.005 && Math.abs(this.currentY - 0.5) < 0.005;
          if (scaleRest && posRest) {
            this.currentScale = 1.0;
            this.currentX = 0.5;
            this.currentY = 0.5;
            this.img.style.transform = '';
            this.img.style.transformOrigin = '50% 50%';
            this.updateCoordLabel(0.5, 0.5);
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
            return;
          }
        }

        this.rafId = requestAnimationFrame(loop);
      };

      this.rafId = requestAnimationFrame(loop);
    }

    render() {
      // Mathematically guaranteed bounds containment:
      // Setting transformOrigin to normalized cursor coordinates and scaling
      // ensures the image covers 100% of the container with ZERO void gap at any scale >= 1.
      const originX = (this.currentX * 100).toFixed(2);
      const originY = (this.currentY * 100).toFixed(2);
      this.img.style.transformOrigin = `${originX}% ${originY}%`;
      this.img.style.transform = `scale3d(${this.currentScale.toFixed(3)}, ${this.currentScale.toFixed(3)}, 1)`;
    }

    reset() {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      this.isHovered = false;
      this.targetScale = 1.0;
      this.currentScale = 1.0;
      this.targetX = 0.5;
      this.targetY = 0.5;
      this.currentX = 0.5;
      this.currentY = 0.5;
      this.container.classList.remove('is-zooming');
      this.img.style.transform = '';
      this.img.style.transformOrigin = '50% 50%';
      this.updateCoordLabel(0.5, 0.5);
    }
  }

  // Self-initialize on DOM ready or immediate if ready
  function initTaagaPolish() {
    if (!window.__taagaLuxuryPolish) {
      window.__taagaLuxuryPolish = new TaagaLuxuryPolish();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTaagaPolish);
  } else {
    initTaagaPolish();
  }

  // Support Shopify Theme Customizer section updates
  document.addEventListener('shopify:section:load', () => {
    if (window.__taagaLuxuryPolish) {
      window.__taagaLuxuryPolish.initPdpTactileZoom();
      window.__taagaLuxuryPolish.initCardInteractions();
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }
  });

  // Export classes for testing / modular access
  window.TaagaLuxuryPolish = TaagaLuxuryPolish;
  window.PdpTactileZoom = PdpTactileZoom;
})();
