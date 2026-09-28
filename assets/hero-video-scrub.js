/**
 * TAAGA BY DISHA - HERO GSAP CANVAS VIDEO SCRUB ARCHITECTURE
 * 
 * Maps an extracted sequence of ~180 WebP frames from a 6-second UGC video (30fps)
 * to the user's scroll depth using HTML5 Canvas & GSAP ScrollTrigger.
 * 
 * Performance:
 * - Aggressive eager preloading of first 15-20 frames for instant initial response.
 * - Background Web Worker / Asynchronous batch loading for frames 21-180.
 * - Nearest-frame fallback during rapid scrubbing with zero-stale auto-repaint.
 * - High-DPI canvas sizing with devicePixelRatio clamping for mobile GPU efficiency.
 * - Absolute URL worker resolution supporting cross-origin CDN assets.
 * - 90+ Lighthouse Mobile score optimization.
 */

class HeroVideoScrub {
  constructor(container) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) return;

    this.canvas = this.container.querySelector('.hero-scrub-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: false });

    // Configuration from data attributes with robust defaults
    this.frameCount = parseInt(this.container.dataset.frameCount, 10) || 180;
    this.preloadCount = parseInt(this.container.dataset.preloadCount, 10) || 20;
    this.padLength = parseInt(this.container.dataset.padLength, 10) || 4;

    // Dual-Asset Responsive Video Architecture (Desktop Landscape vs Mobile Portrait)
    this.desktopUrlTemplate = this.container.dataset.desktopUrlTemplate || './assets/frames-desktop/frame_{index}.webp';
    this.mobileUrlTemplate = this.container.dataset.mobileUrlTemplate || this.container.dataset.urlTemplate || './assets/frames/frame_{index}.webp';
    this.isDesktop = window.innerWidth >= 768;
    this.urlTemplate = this.isDesktop ? this.desktopUrlTemplate : this.mobileUrlTemplate;

    this.workerUrl = this.container.dataset.workerUrl || './assets/frame-loader-worker.js';
    this.pinDuration = this.container.dataset.pinDuration || '+=300%';
    this.scrubSmoothness = parseFloat(this.container.dataset.scrubSmoothness) || 0.5;

    // Cache & State
    this.frames = new Array(this.frameCount).fill(null);
    this.loadStatus = new Array(this.frameCount).fill(0); // 0: unread, 1: loading, 2: ready, -1: error
    this.currentRenderedIndex = -1;
    this.playhead = { frame: 0 };
    this.isWorkerActive = false;
    this.worker = null;
    this.initialPreloadPromise = null;

    // UI Elements
    this.loaderEl = this.container.querySelector('.hero-scrub__loader');
    this.heroContent = this.container.querySelector('.hero-scrub-content');

    this.init();
  }

  init() {
    this.setupCanvasDimensions();
    window.addEventListener('resize', () => this.handleResize());

    // Step 1: Eagerly load the first batch (15-20 frames)
    this.preloadInitialFrames().then(() => {
      // Step 2: Ensure GSAP is ready and initialize ScrollTrigger
      this.ensureGsapLoaded()
        .then(() => {
          this.initScrollTrigger();
        })
        .catch((err) => {
          console.warn('[HeroScrub] GSAP initialization fallback:', err);
        });

      // Step 3: Trigger background loading for remaining frames
      this.initBackgroundLoader();
    });
  }

  /**
   * Generates the URL for a specific zero-based frame index
   */
  getFrameUrl(index) {
    const frameNum = index + 1;
    const padded = String(frameNum).padStart(this.padLength, '0');
    return this.urlTemplate.replace('{index}', padded);
  }

  /**
   * Dynamic script loader guaranteeing GSAP & ScrollTrigger availability
   */
  ensureGsapLoaded() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const loadScript = (src) => new Promise((res, rej) => {
        const s = document.createElement('script');
        s.src = src;
        s.async = false;
        s.onload = res;
        s.onerror = rej;
        document.head.appendChild(s);
      });

      const gsapPromise = typeof gsap === 'undefined'
        ? loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js')
        : Promise.resolve();

      gsapPromise
        .then(() => {
          if (typeof ScrollTrigger === 'undefined') {
            return loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');
          }
        })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * High-DPI canvas setup with retina clamping to prevent GPU memory bloat on mobile
   */
  setupCanvasDimensions() {
    const rect = this.container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Clamp to 2x for mobile efficiency

    this.canvasWidth = Math.round(rect.width * dpr);
    this.canvasHeight = Math.round(rect.height * dpr);

    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    // Re-draw current frame if already loaded
    if (this.currentRenderedIndex >= 0) {
      this.renderFrame(this.currentRenderedIndex, true);
    }
  }

  handleResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      const wasDesktop = this.isDesktop;
      this.isDesktop = window.innerWidth >= 768;

      // If crossed responsive breakpoint, switch template and reload frames
      if (wasDesktop !== this.isDesktop) {
        this.urlTemplate = this.isDesktop ? this.desktopUrlTemplate : this.mobileUrlTemplate;
        this.frames = new Array(this.frameCount).fill(null);
        this.loadStatus = new Array(this.frameCount).fill(0);
        this.currentRenderedIndex = -1;
        this.preloadInitialFrames().then(() => {
          this.initBackgroundLoader();
        });
      }

      this.setupCanvasDimensions();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 150);
  }

  /**
   * Aggressive eager preload of initial 15-20 frames
   */
  async preloadInitialFrames() {
    const eagerCount = Math.min(this.preloadCount, this.frameCount);
    const initialPromises = [];

    // Load frame 0 FIRST and render immediately for instant visual
    try {
      await this.loadSingleFrame(0);
      this.renderFrame(0);
    } catch (err) {
      console.warn('[HeroScrub] Frame 0 fallback triggered:', err);
    }

    // Concurrently load the rest of the eager batch
    for (let i = 1; i < eagerCount; i++) {
      initialPromises.push(this.loadSingleFrame(i).catch(() => null));
    }

    await Promise.all(initialPromises);

    // Hide loading indicator once eager frames are loaded
    if (this.loaderEl) {
      this.loaderEl.classList.add('is-hidden');
    }
  }

  /**
   * Loads a single image on main thread via Image()
   */
  loadSingleFrame(index) {
    if (this.frames[index]) return Promise.resolve(this.frames[index]);
    if (this.loadStatus[index] === 1) return Promise.resolve(null);

    this.loadStatus[index] = 1; // Loading
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async'; // Offload decode where supported
      img.src = this.getFrameUrl(index);
      img.onload = () => {
        this.frames[index] = img;
        this.loadStatus[index] = 2; // Ready
        this.checkRepaint(index);
        resolve(img);
      };
      img.onerror = (e) => {
        this.loadStatus[index] = -1; // Error
        reject(e);
      };
    });
  }

  /**
   * Repaints canvas immediately when a newly loaded frame matches current scroll target
   * or replaces an earlier low-fidelity fallback
   */
  checkRepaint(frameIndex) {
    const currentTarget = Math.min(
      this.frameCount - 1,
      Math.max(0, Math.round(this.playhead.frame))
    );
    if (currentTarget === frameIndex || (this.currentRenderedIndex !== currentTarget && this.loadStatus[currentTarget] === 2)) {
      this.renderFrame(currentTarget, true);
    }
  }

  /**
   * Initializes background Web Worker or falls back to async batch queue
   */
  async initBackgroundLoader() {
    const remainingIndices = [];
    for (let i = this.preloadCount; i < this.frameCount; i++) {
      remainingIndices.push(i);
    }

    if (remainingIndices.length === 0) return;

    // Resolve URL template to absolute URI so worker context fetches correctly
    const absoluteBaseUrl = new URL(this.urlTemplate, window.location.href).href.replace('%7Bindex%7D', '{index}');

    const startWorker = (worker) => {
      this.worker = worker;
      this.isWorkerActive = true;

      this.worker.onmessage = (e) => {
        const { type, frameIndex, bitmap, objectUrl } = e.data;
        if (type === 'FRAME_LOADED') {
          this.frames[frameIndex] = bitmap;
          this.loadStatus[frameIndex] = 2;
          this.checkRepaint(frameIndex);
        } else if (type === 'FRAME_LOADED_URL') {
          const img = new Image();
          img.src = objectUrl;
          this.frames[frameIndex] = img;
          this.loadStatus[frameIndex] = 2;
          this.checkRepaint(frameIndex);
        } else if (type === 'FRAME_ERROR') {
          this.loadStatus[frameIndex] = -1;
          // Fallback to direct load on main thread if worker failed on this frame
          this.loadSingleFrame(frameIndex).catch(() => {});
        }
      };

      this.worker.onerror = (err) => {
        console.warn('[HeroScrub] Worker runtime error, falling back to async batch loader:', err);
        this.runAsyncBatchLoader(remainingIndices.filter(i => this.loadStatus[i] !== 2));
      };

      this.worker.postMessage({
        type: 'LOAD_BATCH',
        frames: remainingIndices,
        baseUrl: absoluteBaseUrl,
        padLength: this.padLength
      });
    };

    // Attempt Web Worker with Blob fallback for cross-origin CDN support
    if (window.Worker && !window.location.protocol.startsWith('file')) {
      try {
        const isSameOrigin = new URL(this.workerUrl, window.location.href).origin === window.location.origin;
        if (isSameOrigin) {
          const worker = new Worker(this.workerUrl);
          startWorker(worker);
          return;
        } else {
          // Cross-origin CDN URL (e.g. cdn.shopify.com): fetch script & create Blob worker
          const res = await fetch(this.workerUrl, { mode: 'cors' });
          if (res.ok) {
            const scriptText = await res.text();
            const blob = new Blob([scriptText], { type: 'application/javascript' });
            const blobUrl = URL.createObjectURL(blob);
            const worker = new Worker(blobUrl);
            startWorker(worker);
            return;
          }
        }
      } catch (e) {
        console.info('[HeroScrub] Web Worker unavailable (CORS/CSP/file protocol). Falling back to async queue:', e);
      }
    }

    // Graceful asynchronous batch loader using requestIdleCallback / chunking
    this.runAsyncBatchLoader(remainingIndices);
  }

  /**
   * Asynchronous batch loader: Loads in throttled chunks during browser idle time
   */
  runAsyncBatchLoader(indices) {
    const CHUNK_SIZE = 4;
    let pointer = 0;

    const loadNextChunk = () => {
      if (pointer >= indices.length) return;
      const chunk = indices.slice(pointer, pointer + CHUNK_SIZE);
      pointer += CHUNK_SIZE;

      Promise.all(chunk.map(idx => this.loadSingleFrame(idx).catch(() => null)))
        .then(() => {
          if (window.requestIdleCallback) {
            window.requestIdleCallback(loadNextChunk, { timeout: 1000 });
          } else {
            setTimeout(loadNextChunk, 30);
          }
        });
    };

    if (window.requestIdleCallback) {
      window.requestIdleCallback(loadNextChunk, { timeout: 500 });
    } else {
      setTimeout(loadNextChunk, 100);
    }
  }

  /**
   * GSAP ScrollTrigger scrub setup
   */
  initScrollTrigger() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[HeroScrub] GSAP or ScrollTrigger not found. Ensure CDN scripts are loaded.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const header = document.querySelector('.taaga-header');

    // Timeline for hero video frame scrub
    const scrubTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.container,
        start: 'top top',
        end: this.pinDuration,
        pin: true,
        scrub: this.scrubSmoothness,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Playhead maps exactly to frame 0 -> frameCount - 1
          const targetIndex = self.progress >= 1
            ? this.frameCount - 1
            : Math.min(
                this.frameCount - 1,
                Math.max(0, Math.round(this.playhead.frame))
              );
          this.renderFrame(targetIndex);
        },
        onLeave: () => {
          // Guarantee final maximum frame is painted when pinned scrub completes
          this.renderFrame(this.frameCount - 1, true);
          if (header) header.classList.add('header--scrolled');
        },
        onEnterBack: () => {
          if (header) header.classList.remove('header--scrolled');
        }
      }
    });

    // Tween the virtual playhead frame counter
    scrubTimeline.to(this.playhead, {
      frame: this.frameCount - 1,
      ease: 'none',
      duration: 1
    }, 0);

    // Subtle luxury fade & lift of hero text overlay as scrolling progresses
    if (this.heroContent) {
      scrubTimeline.to(this.heroContent, {
        opacity: 0,
        y: -40,
        ease: 'power1.out',
        duration: 0.35
      }, 0.05);
    }
  }

  /**
   * Finds the closest available frame index if target frame is still downloading
   */
  getNearestLoadedIndex(targetIndex) {
    if (this.loadStatus[targetIndex] === 2 && this.frames[targetIndex]) {
      return targetIndex;
    }

    // Search backwards first (most visually coherent during forward scroll)
    for (let i = targetIndex - 1; i >= 0; i--) {
      if (this.loadStatus[i] === 2 && this.frames[i]) return i;
    }

    // Search forwards if no prior frame exists
    for (let i = targetIndex + 1; i < this.frameCount; i++) {
      if (this.loadStatus[i] === 2 && this.frames[i]) return i;
    }

    return 0; // Ultimate fallback to frame 0
  }

  /**
   * Renders the designated frame with aspect-ratio preserving cover math
   */
  renderFrame(targetIndex, force = false) {
    if (!force && targetIndex === this.currentRenderedIndex && this.loadStatus[targetIndex] === 2) return;

    let frameToDraw = null;
    let actualIndex = targetIndex;

    if (this.loadStatus[targetIndex] === 2 && this.frames[targetIndex]) {
      frameToDraw = this.frames[targetIndex];
      actualIndex = targetIndex;
    } else {
      // Prioritize loading the requested target frame immediately
      if (this.loadStatus[targetIndex] === 0) {
        this.loadSingleFrame(targetIndex);
      }
      actualIndex = this.getNearestLoadedIndex(targetIndex);
      frameToDraw = this.frames[actualIndex];
    }

    if (!frameToDraw) return;

    const cw = this.canvasWidth;
    const ch = this.canvasHeight;
    const iw = frameToDraw.naturalWidth || frameToDraw.width;
    const ih = frameToDraw.naturalHeight || frameToDraw.height;

    if (!iw || !ih) return;

    // CSS object-fit: cover equivalent in Canvas 2D
    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const drawW = iw * ratio;
    const drawH = ih * ratio;
    let shiftX = (cw - drawW) / 2;
    let shiftY = (ch - drawH) / 2;

    // Desktop framing: give slight right bias if widescreen image is cropped horizontally,
    // preserving full visibility of the draped model and twirl on the center-right
    if (this.isDesktop && drawW > cw) {
      shiftX = Math.max(cw - drawW, (cw - drawW) * 0.42);
    }

    this.ctx.clearRect(0, 0, cw, ch);
    this.ctx.drawImage(frameToDraw, 0, 0, iw, ih, shiftX, shiftY, drawW, drawH);

    // Accurately record what was actually painted on the canvas
    this.currentRenderedIndex = actualIndex;
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const heroInstances = [];
  document.querySelectorAll('[data-hero-video-scrub]').forEach((el) => {
    heroInstances.push(new HeroVideoScrub(el));
  });
  window.__taagaHeroInstances = heroInstances;
});
