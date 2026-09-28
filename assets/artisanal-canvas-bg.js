/**
 * TAAGA BY DISHA — ARTISANAL LOOM CANVAS BACKGROUND ENGINE
 * Creative Detailing: Generative Warp & Weft Loom Grid, Floating Hallmark Seals,
 * Hand-Drafted Weaver Diagrams, Drifting 24K Gold Silk Filaments & Cursor Sheen.
 * 
 * GPU-accelerated 2D canvas, ultra-lightweight, 60fps buttery smooth.
 */

(function () {
  'use strict';

  class ArtisanalCanvasBackground {
    constructor() {
      this.canvas = document.getElementById('artisanal-canvas-bg');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d', { alpha: true });
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.scrollY = window.scrollY || 0;

      // Cursor position with smooth lerp
      this.mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 24K Gold Silk Floating Particles
      this.particles = [];
      this.initParticles();

      // Animation loop control
      this.rafId = null;
      this.isRendering = false;

      this.init();
    }

    init() {
      this.handleResize();
      this.setupEventListeners();
      this.startLoop();
    }

    initParticles() {
      const count = window.innerWidth < 768 ? 20 : 45;
      this.particles = [];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          length: 12 + Math.random() * 28,
          angle: (Math.random() - 0.5) * 0.8,
          speedX: (Math.random() - 0.5) * 0.35,
          speedY: 0.15 + Math.random() * 0.45,
          opacity: 0.2 + Math.random() * 0.45,
          curve: (Math.random() - 0.5) * 8
        });
      }
    }

    setupEventListeners() {
      window.addEventListener('resize', () => {
        this.handleResize();
        this.initParticles();
      }, { passive: true });
      
      window.addEventListener('scroll', () => {
        this.scrollY = window.scrollY || 0;
        this.wakeLoop();
      }, { passive: true });

      // Track cursor position for the 24K gold silk sheen
      window.addEventListener('mousemove', (e) => {
        this.mouse.targetX = e.clientX;
        this.mouse.targetY = e.clientY;
        this.mouse.active = true;
        this.wakeLoop();
      }, { passive: true });

      document.addEventListener('mouseleave', () => {
        this.mouse.active = false;
      });

      // Pause rendering when page is hidden
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stopLoop();
        } else {
          this.wakeLoop();
        }
      });
    }

    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.canvas.width = Math.floor(this.width * this.dpr);
      this.canvas.height = Math.floor(this.height * this.dpr);
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.zIndex = '0';
      this.canvas.style.pointerEvents = 'none';

      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.draw();
    }

    wakeLoop() {
      if (!this.isRendering) {
        this.startLoop();
      }
    }

    startLoop() {
      this.isRendering = true;
      const animate = () => {
        this.rafId = requestAnimationFrame(animate);

        // Smooth cursor lerp
        const dx = this.mouse.targetX - this.mouse.x;
        const dy = this.mouse.targetY - this.mouse.y;
        this.mouse.x += dx * 0.08;
        this.mouse.y += dy * 0.08;

        this.updateParticles();
        this.draw();
      };

      this.rafId = requestAnimationFrame(animate);
    }

    stopLoop() {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      this.isRendering = false;
    }

    updateParticles() {
      if (this.prefersReducedMotion) return;
      const w = this.width;
      const h = this.height;

      for (let p of this.particles) {
        p.y += p.speedY;
        p.x += p.speedX;

        // Subtle repulsion from cursor
        if (this.mouse.active) {
          const pdx = p.x - this.mouse.x;
          const pdy = p.y - this.mouse.y;
          const dist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            p.x += (pdx / dist) * force * 1.5;
            p.y += (pdy / dist) * force * 1.5;
          }
        }

        // Wrap around boundaries
        if (p.y > h + 30) {
          p.y = -30;
          p.x = Math.random() * w;
        }
        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
      }
    }

    draw() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Artisanal Warm Alabaster Canvas Base with Soft Vignette
      this.drawCanvasBase(ctx, w, h);

      // 2. Draw Generative Pit Loom Warp & Weft Grid with Gold Accents
      this.drawLoomGrid(ctx, w, h);

      // 3. Draw Artisanal Watermark Seals, Weaver Blueprints & Heritage Monograms
      this.drawArtisanalWatermarks(ctx, w, h);

      // 4. Draw Floating 24K Gold Silk Filaments
      this.drawSilkParticles(ctx);

      // 5. Draw Cursor-Reactive 24K Gold Silk Luster
      if (this.mouse.active && this.mouse.x > -500 && !this.prefersReducedMotion) {
        this.drawSilkSheen(ctx, this.mouse.x, this.mouse.y);
      }
    }

    /**
     * Draws warm artisanal parchment base with subtle tactile grain gradient.
     */
    drawCanvasBase(ctx, w, h) {
      const baseGrad = ctx.createRadialGradient(w * 0.5, h * 0.45, 100, w * 0.5, h * 0.5, Math.max(w, h));
      baseGrad.addColorStop(0, '#FAF8F5');
      baseGrad.addColorStop(0.6, '#F6F2EA');
      baseGrad.addColorStop(1, '#EDE6DA');

      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, w, h);
    }

    /**
     * Draws fine microscopic intersecting threads simulating a master weaver's pit loom warp.
     */
    drawLoomGrid(ctx, w, h) {
      const spacing = 48; // Architectural grid module
      const scrollOffset = (this.scrollY * 0.2) % spacing;

      ctx.save();

      // Subtle organic vertical warp threads
      for (let x = 0; x <= w; x += spacing) {
        const isMajorZari = (x / spacing) % 4 === 0;
        ctx.lineWidth = isMajorZari ? 1.0 : 0.5;
        ctx.strokeStyle = isMajorZari ? 'rgba(197, 160, 89, 0.22)' : 'rgba(175, 160, 145, 0.12)';
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();

        // Precision crosshair ticks at major intersections
        if (isMajorZari) {
          for (let y = -spacing; y <= h + spacing; y += spacing * 4) {
            const crossY = y - scrollOffset;
            ctx.strokeStyle = 'rgba(197, 160, 89, 0.45)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - 5, crossY);
            ctx.lineTo(x + 5, crossY);
            ctx.moveTo(x, crossY - 5);
            ctx.lineTo(x, crossY + 5);
            ctx.stroke();
          }
        }
      }

      // Horizontal weft threads (floating with slight scroll parallax)
      for (let y = -spacing; y <= h + spacing; y += spacing) {
        const adjustedY = y - scrollOffset;
        const isMajorZari = (Math.round(y / spacing)) % 4 === 0;
        ctx.lineWidth = isMajorZari ? 0.9 : 0.45;
        ctx.strokeStyle = isMajorZari ? 'rgba(197, 160, 89, 0.18)' : 'rgba(175, 160, 145, 0.09)';
        ctx.beginPath();
        ctx.moveTo(0, adjustedY);
        ctx.lineTo(w, adjustedY);
        ctx.stroke();
      }

      ctx.restore();
    }

    /**
     * Draws floating watermark seals (Pit Loom Shuttle, Varanasi GI Coordinates, Silk Mark).
     */
    drawArtisanalWatermarks(ctx, w, h) {
      ctx.save();

      // =====================================================================
      // SEAL 1: VARANASI GI TAG & HERITAGE COMPASS (Top Right Area)
      // =====================================================================
      const sealX = w > 1024 ? w - 180 : w - 85;
      const sealY = 240;
      
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.32)';
      ctx.fillStyle = 'rgba(197, 160, 89, 0.28)';
      ctx.lineWidth = 1.2;

      // Double-circle compass seal
      ctx.beginPath();
      ctx.arc(sealX, sealY, 56, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.arc(sealX, sealY, 50, 0, Math.PI * 2);
      ctx.stroke();

      // Cardinal ticks
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sealX, sealY - 58); ctx.lineTo(sealX, sealY - 44);
      ctx.moveTo(sealX, sealY + 58); ctx.lineTo(sealX, sealY + 44);
      ctx.moveTo(sealX - 58, sealY); ctx.lineTo(sealX - 44, sealY);
      ctx.moveTo(sealX + 58, sealY); ctx.lineTo(sealX + 44, sealY);
      ctx.stroke();

      // Seal typography
      ctx.font = '600 8px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '2px';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VARANASI GI TAG', sealX, sealY - 16);

      ctx.font = 'italic 500 11px "Playfair Display", serif';
      ctx.fillStyle = 'rgba(18, 17, 16, 0.45)';
      ctx.fillText('25°19′N 82°58′E', sealX, sealY + 2);

      ctx.font = '600 7px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(197, 160, 89, 0.45)';
      ctx.fillText('HERITAGE ATELIER', sealX, sealY + 18);

      // =====================================================================
      // SEAL 2: ANCESTRAL PIT-LOOM SHUTTLE BLUEPRINT (Mid-Left Area)
      // =====================================================================
      if (w > 850) {
        const shuttleX = 120;
        const shuttleY = h * 0.52;

        ctx.strokeStyle = 'rgba(197, 160, 89, 0.28)';
        ctx.fillStyle = 'rgba(197, 160, 89, 0.25)';
        ctx.lineWidth = 1.4;

        // Elegant geometric shuttle profile
        ctx.beginPath();
        ctx.moveTo(shuttleX - 48, shuttleY);
        ctx.quadraticCurveTo(shuttleX, shuttleY - 18, shuttleX + 48, shuttleY);
        ctx.quadraticCurveTo(shuttleX, shuttleY + 18, shuttleX - 48, shuttleY);
        ctx.stroke();

        // Inner bobbin gold spool
        ctx.beginPath();
        ctx.arc(shuttleX, shuttleY, 6, 0, Math.PI * 2);
        ctx.stroke();

        // Thread lines escaping shuttle
        ctx.lineWidth = 0.7;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(shuttleX + 48, shuttleY);
        ctx.lineTo(shuttleX + 85, shuttleY - 14);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = '600 7px "Plus Jakarta Sans", sans-serif';
        ctx.letterSpacing = '1.5px';
        ctx.fillText('160H PIT LOOM RITUAL', shuttleX, shuttleY + 28);

        ctx.font = '500 6.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = 'rgba(142, 122, 102, 0.5)';
        ctx.fillText('GENUINE MULBERRY WARP', shuttleX, shuttleY + 40);
      }

      // =====================================================================
      // SEAL 3: SILK MARK CERTIFIED CREST (Bottom Right Area)
      // =====================================================================
      if (w > 1024) {
        const smX = w - 140;
        const smY = h * 0.82;

        ctx.strokeStyle = 'rgba(197, 160, 89, 0.25)';
        ctx.fillStyle = 'rgba(197, 160, 89, 0.28)';
        ctx.lineWidth = 1.0;

        // Diamond crest
        ctx.beginPath();
        ctx.moveTo(smX, smY - 24);
        ctx.lineTo(smX + 28, smY);
        ctx.lineTo(smX, smY + 24);
        ctx.lineTo(smX - 28, smY);
        ctx.closePath();
        ctx.stroke();

        ctx.font = '700 7px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('SILK MARK', smX, smY - 4);
        ctx.font = '500 6px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = 'rgba(18, 17, 16, 0.38)';
        ctx.fillText('100% PURE SILK', smX, smY + 7);
      }

      ctx.restore();
    }

    /**
     * Draws shimmering 24K gold silk filaments drifting through the air.
     */
    drawSilkParticles(ctx) {
      if (this.prefersReducedMotion) return;
      ctx.save();

      for (let p of this.particles) {
        ctx.strokeStyle = `rgba(197, 160, 89, ${p.opacity * 0.6})`;
        ctx.lineWidth = 0.85;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.quadraticCurveTo(
          p.x + p.curve, 
          p.y + p.length * 0.5, 
          p.x + p.speedX * 6, 
          p.y + p.length
        );
        ctx.stroke();
      }

      ctx.restore();
    }

    /**
     * Renders a soft radial 24K gold silk light glint following user's cursor.
     */
    drawSilkSheen(ctx, x, y) {
      ctx.save();
      const radius = 380;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(218, 185, 95, 0.18)');
      gradient.addColorStop(0.35, 'rgba(197, 160, 89, 0.08)');
      gradient.addColorStop(0.7, 'rgba(197, 160, 89, 0.025)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.__taagaArtisanalBg = new ArtisanalCanvasBackground();
    });
  } else {
    window.__taagaArtisanalBg = new ArtisanalCanvasBackground();
  }
})();
