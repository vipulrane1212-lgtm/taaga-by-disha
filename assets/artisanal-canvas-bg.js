/**
 * TAAGA BY DISHA — ARTISANAL LOOM CANVAS BACKGROUND ENGINE
 * Creative Detailing: Generative Warp & Weft Loom Grid, Floating Hallmark Seals,
 * and Cursor-Reactive 24K Gold Silk Light Sheen.
 * 
 * Zero dependencies, GPU-accelerated 2D canvas, ultra-lightweight (<6KB).
 */

(function () {
  'use strict';

  class ArtisanalCanvasBackground {
    constructor() {
      this.canvas = document.getElementById('artisanal-canvas-bg');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d', { alpha: true });
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = 0;
      this.height = 0;
      this.scrollY = window.scrollY || 0;

      // Cursor position with smooth lerp
      this.mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Animation loop control
      this.rafId = null;
      this.isRendering = false;
      this.lastDrawTime = 0;

      this.init();
    }

    init() {
      this.handleResize();
      this.setupEventListeners();
      this.startLoop();
    }

    setupEventListeners() {
      window.addEventListener('resize', () => this.handleResize(), { passive: true });
      
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
      const rect = document.documentElement.getBoundingClientRect();
      this.width = window.innerWidth;
      this.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight);

      this.canvas.width = Math.floor(this.width * this.dpr);
      this.canvas.height = Math.floor(window.innerHeight * this.dpr);
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.zIndex = '0';
      this.canvas.style.pointerEvents = 'none';

      this.ctx.scale(this.dpr, this.dpr);
      this.draw();
    }

    wakeLoop() {
      if (!this.isRendering) {
        this.startLoop();
      }
    }

    startLoop() {
      this.isRendering = true;
      const animate = (timestamp) => {
        this.rafId = requestAnimationFrame(animate);

        // Smooth cursor lerp
        const dx = this.mouse.targetX - this.mouse.x;
        const dy = this.mouse.targetY - this.mouse.y;
        this.mouse.x += dx * 0.08;
        this.mouse.y += dy * 0.08;

        this.draw();

        // Idle power-saving: if mouse has settled and no active motion, stop loop
        if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2 && !this.mouse.active) {
          this.stopLoop();
        }
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

    draw() {
      const ctx = this.ctx;
      const w = this.width;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Subtle Warp & Weft Loom Grid
      this.drawLoomGrid(ctx, w, h);

      // 2. Draw Artisanal Watermark Seals & Heritage Monograms
      this.drawArtisanalWatermarks(ctx, w, h);

      // 3. Draw Cursor-Reactive 24K Gold Silk Sheen
      if (this.mouse.active && this.mouse.x > -500 && !this.prefersReducedMotion) {
        this.drawSilkSheen(ctx, this.mouse.x, this.mouse.y);
      }
    }

    /**
     * Draws fine microscopic intersecting threads simulating a master weaver's pit loom warp.
     */
    drawLoomGrid(ctx, w, h) {
      const spacing = 36; // Micro-grid spacing in pixels
      const scrollOffset = (this.scrollY * 0.15) % spacing;

      ctx.save();
      ctx.lineWidth = 0.5;

      // Vertical warp lines (subtle raw silk filament tint)
      for (let x = 0; x <= w; x += spacing) {
        const isAccentThread = (x / spacing) % 8 === 0;
        ctx.strokeStyle = isAccentThread ? 'rgba(197, 160, 89, 0.07)' : 'rgba(168, 159, 151, 0.035)';
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal weft lines (floating with slight scroll parallax)
      for (let y = -spacing; y <= h + spacing; y += spacing) {
        const adjustedY = y - scrollOffset;
        const isAccentThread = (Math.round(y / spacing)) % 8 === 0;
        ctx.strokeStyle = isAccentThread ? 'rgba(197, 160, 89, 0.07)' : 'rgba(168, 159, 151, 0.035)';
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

      // Motif 1: Varanasi Atelier Geographic Indication Seal (Top Right Area)
      const sealX = w > 1024 ? w - 160 : w - 80;
      const sealY = 220;
      
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.06)';
      ctx.fillStyle = 'rgba(197, 160, 89, 0.05)';
      ctx.lineWidth = 1;

      // Double-circle compass seal
      ctx.beginPath();
      ctx.arc(sealX, sealY, 54, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sealX, sealY, 48, 0, Math.PI * 2);
      ctx.stroke();

      // Cardinal marks
      ctx.beginPath();
      ctx.moveTo(sealX, sealY - 54);
      ctx.lineTo(sealX, sealY - 42);
      ctx.moveTo(sealX, sealY + 54);
      ctx.lineTo(sealX, sealY + 42);
      ctx.moveTo(sealX - 54, sealY);
      ctx.lineTo(sealX - 42, sealY);
      ctx.moveTo(sealX + 54, sealY);
      ctx.lineTo(sealX + 42, sealY);
      ctx.stroke();

      // Seal typography
      ctx.font = '7px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '1.5px';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VARANASI GI TAG', sealX, sealY - 14);
      ctx.font = '8px "Playfair Display", serif';
      ctx.fillText('25°19′N 82°58′E', sealX, sealY + 2);
      ctx.font = '6px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('HERITAGE GUILD', sealX, sealY + 16);

      // Motif 2: Artisanal Pit-Loom Shuttle Icon (Mid-Left Area)
      if (w > 768) {
        const shuttleX = 90;
        const shuttleY = h * 0.55;

        ctx.strokeStyle = 'rgba(197, 160, 89, 0.055)';
        ctx.fillStyle = 'rgba(197, 160, 89, 0.04)';
        ctx.lineWidth = 1.2;

        // Elegant geometric shuttle shape
        ctx.beginPath();
        ctx.moveTo(shuttleX - 40, shuttleY);
        ctx.quadraticCurveTo(shuttleX, shuttleY - 14, shuttleX + 40, shuttleY);
        ctx.quadraticCurveTo(shuttleX, shuttleY + 14, shuttleX - 40, shuttleY);
        ctx.stroke();

        // Inner bobbin spool
        ctx.beginPath();
        ctx.arc(shuttleX, shuttleY, 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '6px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('TAAGA LOOM RITUAL', shuttleX, shuttleY + 24);
      }

      ctx.restore();
    }

    /**
     * Renders a soft radial 24K gold silk light glint following user's cursor.
     */
    drawSilkSheen(ctx, x, y) {
      ctx.save();
      const radius = 340;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(212, 175, 55, 0.05)');
      gradient.addColorStop(0.4, 'rgba(197, 160, 89, 0.025)');
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
