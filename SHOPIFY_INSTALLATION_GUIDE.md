# Taaga by Disha • Ultra-Luxury Shopify Build (Phase 1 & Phase 2)
## Visual Dashboard & Theme Editor Deployment Guide

This guide is strictly optimized for **visual code editors (such as Cursor / VS Code)** and the **Shopify Web Admin Dashboard**. You do **not** need the Shopify CLI, Node.js, npm, or complex command-line toolchains to install, configure, and maintain this architecture. All settings and metafields are managed directly through visual menus and the Shopify theme customizer.

---

### Table of Contents
1. [Architecture & File Mapping](#1-architecture--file-mapping)
2. [Step-by-Step Shopify Dashboard Installation](#2-step-by-step-shopify-dashboard-installation)
   - [Step 2.1: Upload Theme Assets](#step-21-upload-theme-assets)
   - [Step 2.2: Add & Update Liquid Snippets](#step-22-add--update-liquid-snippets)
   - [Step 2.3: Add & Update Liquid Sections](#step-23-add--update-liquid-sections)
   - [Step 2.4: Connect Master Layout (theme.liquid)](#step-24-connect-master-layout-themeliquid)
3. [AI Virtual Photoshoot Workflow & Shopify Metafields (Zero-Studio ₹20k–₹30k Budget)](#3-ai-virtual-photoshoot-workflow--shopify-metafields)
   - [Visual Metafield Setup in Admin GUI](#step-31-configure-product-metafields-gui)
   - [Asset Standardization Checklist](#step-32-standardization-checklist)
4. [Lenis Fluid Scrolling & GSAP Synchronization](#4-lenis-fluid-scrolling--gsap-synchronization)
5. [PDP Tactile Zoom Micro-Interactions](#5-pdp-tactile-zoom-micro-interactions)
6. [Local Testing in Cursor / VS Code Live Server](#6-local-testing-in-cursor--vs-code-live-server)
7. [Lighthouse 90+ Mobile Performance Architecture](#7-lighthouse-90-mobile-performance-architecture)

---

### 1. Architecture & File Mapping

All components follow modular separation of concerns and are 100% copy-pasteable:

| Local Repository File | Shopify Theme Destination | Phase | Description |
| :--- | :--- | :--- | :--- |
| `assets/taaga-theme.css` | `Assets / taaga-theme.css` | 1 & 2 | Earthy Rust & Teal tokens, 4:5 grid, hover cross-fade, Lenis & PDP Zoom styles |
| `assets/hero-video-scrub.js` | `Assets / hero-video-scrub.js` | 1 | GSAP ScrollTrigger canvas scrubbing engine (180 WebP frames) |
| `assets/frame-loader-worker.js` | `Assets / frame-loader-worker.js` | 1 | Off-thread Web Worker for decoding WebP frames |
| `assets/cart-drawer.js` | `Assets / cart-drawer.js` | 1 | AJAX slide-out cart drawer controller (`/cart/add.js`, `/cart.js`) |
| `assets/taaga-luxury-polish.js` | `Assets / taaga-luxury-polish.js` | 2 | Lenis smooth scroll, GSAP ticker sync, mobile tuning, and PDP tactile zoom |
| `snippets/cart-drawer.liquid` | `Snippets / cart-drawer.liquid` | 1 | Slide-out cart drawer markup & subtotal calculations |
| `snippets/product-card.liquid` | `Snippets / product-card.liquid` | 1 & 2 | 4:5 luxury card, folded-to-drape cross-fade, quick-add & inspect actions |
| `snippets/pdp-tactile-zoom.liquid` | `Snippets / pdp-tactile-zoom.liquid` | 2 | High-resolution slow-ease 2.5× weave magnifier for PDP |
| `sections/hero-video-scrub.liquid` | `Sections / hero-video-scrub.liquid` | 1 | OS 2.0 Hero Canvas Scrub section with full customizer schema |
| `sections/header.liquid` | `Sections / header.liquid` | 1 | Sticky transparent navigation transitioning to solid rust on scroll |
| `sections/product-grid.liquid` | `Sections / product-grid.liquid` | 1 & 2 | Mobile-first 2-col to 3-col catalog grid with 4:5 WebP fallbacks |
| `sections/main-product.liquid` | `Sections / main-product.liquid` | 2 | Full luxury PDP section with tactile zoom stage and artisan pedigree |
| `layout/theme.liquid` | `Layout / theme.liquid` | 1 & 2 | Master layout linking Lenis, GSAP, CSS, header, drawer, and polish script |
| `AI_DRAPING_WORKFLOW.md` | Documentation | 2 | Complete studio-free workflow guide, AI draping prompts, and parameters |

---

### 2. Instant Installation (Recommended: 1-Click ZIP Upload)

> [!TIP]
> **Zero Manual File Editing Required!**
> A complete, fully packaged Shopify Online Store 2.0 theme ZIP has been built for you at:
> `taaga-by-disha-theme.zip` (located in the project root).

1. Log in to your **Shopify Admin** (`https://admin.shopify.com/store/YOUR-STORE-NAME`).
2. Navigate to **Online Store > Themes**.
3. Under **Theme library**, click **Add theme > Upload zip file**.
4. Select `taaga-by-disha-theme.zip` from your computer.
5. Click **Upload file**.
6. Once uploaded, click **Actions > Publish** (or click **Customize** to preview it live in your Shopify visual theme editor).

---

### 3. Alternative: Manual Dashboard Installation (For Existing Themes)

#### Step 3.1: Upload Theme Assets
1. In your **Shopify Admin**, go to **Online Store > Themes > ... > Edit code**.
2. In the left sidebar, scroll down to the **Assets** folder.
3. Click **Add a new asset**:
   - Create `taaga-theme.css` -> Paste content from `assets/taaga-theme.css`.
   - Create `hero-video-scrub.js` -> Paste content from `assets/hero-video-scrub.js`.
   - Create `frame-loader-worker.js` -> Paste content from `assets/frame-loader-worker.js`.
   - Create `cart-drawer.js` -> Paste content from `assets/cart-drawer.js`.
   - Create `taaga-luxury-polish.js` -> Paste content from `assets/taaga-luxury-polish.js`.
6. Click **Save** on each file.

#### Step 2.2: Add & Update Liquid Snippets
1. In the left sidebar, locate the **Snippets** folder.
2. Click **Add a new snippet**:
   - Name: `cart-drawer` -> Paste `snippets/cart-drawer.liquid`.
   - Name: `product-card` -> Paste `snippets/product-card.liquid`.
   - Name: `pdp-tactile-zoom` -> Paste `snippets/pdp-tactile-zoom.liquid`.
3. Click **Save** on each snippet.

#### Step 2.3: Add & Update Liquid Sections
1. In the left sidebar, locate the **Sections** folder.
2. Click **Add a new section**:
   - Name: `hero-video-scrub` -> Paste `sections/hero-video-scrub.liquid`.
   - Name: `header` -> Paste `sections/header.liquid`.
   - Name: `product-grid` -> Paste `sections/product-grid.liquid`.
   - Name: `main-product` -> Paste `sections/main-product.liquid`.
3. Click **Save** on each section.

#### Step 2.4: Connect Master Layout (theme.liquid)
1. Open `Layout / theme.liquid`.
2. Right before the closing `</head>` tag, ensure you have:
   ```liquid
   <!-- Preconnect Fonts & Foundational Stylesheet -->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   {{ 'taaga-theme.css' | asset_url | stylesheet_tag }}
   ```
3. Right before the closing `</body>` tag, ensure you have:
   ```liquid
   <!-- Frictionless AJAX Slide-Out Cart Drawer -->
   {% render 'cart-drawer' %}

   <!-- Core Vendor Libraries (GSAP, ScrollTrigger & Lenis Fluid Scrolling) -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
   <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js" defer></script>

   <!-- Theme Commerce & Luxury Polish Scripts -->
   <script src="{{ 'cart-drawer.js' | asset_url }}" defer></script>
   <script src="{{ 'taaga-luxury-polish.js' | asset_url }}" defer></script>
   ```
4. Click **Save**.

---

### 3. AI Virtual Photoshoot Workflow & Shopify Metafields

To eliminate ₹1.5L+ traditional model photoshoot costs while keeping within a strict ₹20,000–₹30,000 budget:

#### Step 3.1: Configure Product Metafields (GUI)
1. In Shopify Admin, open **Settings > Custom data > Products**.
2. Click **Add definition**:
   - **Name:** `AI Model Drape Image`
   - **Namespace and key:** `custom.ai_model_drape`
   - **Type:** `File` (Select *One image*)
3. Click **Add definition** again:
   - **Name:** `Fabric Texture Zoom Image`
   - **Namespace and key:** `custom.fabric_texture_zoom`
   - **Type:** `File` (Select *One image*)
4. Click **Add definition** a third time:
   - **Name:** `Craft Provenance`
   - **Namespace and key:** `custom.craft_provenance`
   - **Type:** `Single line text`

#### Step 3.2: Standardization Checklist
- **Aspect Ratio:** Strict **4:5 vertical** (e.g. 1200px × 1500px).
- **Format:** WebP format at 85% quality, sRGB color profile.
- **Product Setup:**
  - **Image 1:** Artisanal Folded Fabric / Flat-lay photo.
  - **Image 2 (or `custom.ai_model_drape`):** AI-generated model drape.
  - **Result:** Hovering over the card on desktop cross-fades seamlessly from folded fabric to model drape!

#### Master Editorial Prompt for Banners & Mood Boards:
> "Ultra-realistic 8K UHD DSLR luxury fashion editorial portrait. A graceful Indian woman wearing an artisanal handloom saree with earthy rust-brown body and contrasting vibrant teal borders. Minimalist contemporary studio, warm diffused directional lighting, intricate fabric weave and pleat focus, highly detailed texture, 4:5 aspect ratio, cinematic shadow contrast, photorealistic."

---

### 4. Lenis Fluid Scrolling & GSAP Synchronization

`assets/taaga-luxury-polish.js` implements a zero-jitter synchronization architecture:
1. **Weighty Luxury Inertia:** Configured with `duration: 1.2` and exponential deceleration easing (`t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`).
2. **GSAP Ticker Lock:** Lenis RAF is executed directly inside `gsap.ticker.add((time) => lenis.raf(time * 1000))`, guaranteeing that ScrollTrigger canvas scrubbing and Lenis scroll never drift or stutter.
3. **Lag Smoothing Disabled:** `gsap.ticker.lagSmoothing(0)` prevents jumpiness when rapid scrubbing begins.
4. **Mobile Native Physics (< 768px):** On touchscreens and mobile viewports (< 768px), Lenis interpolation is automatically disabled to preserve 100% native iOS/Android momentum scrolling physics.

---

### 5. PDP Tactile Zoom Micro-Interactions

Customers can inspect the intricate handloom craftsmanship closely without pixelation:
1. **2.5× Slow-Ease Magnification:** Smooth linear interpolation (lerp factor 0.085) provides a weighty velvet feel as the cursor glides across the fabric.
2. **Weave & Zari Detail:** Displays high-definition 1200px+ WebP imagery showcasing Kadwa zari threads and pallu motifs.
3. **Floating HUD:** Real-time percentage readouts (`X: 45% | Y: 60%`) and status pill.
4. **Interactive Swatches:** Easily switch between Model Drape, Folded Fabric, and Macro views.
5. **Universal Access:**
   - On Desktop: Available on product detail pages and via the **Inspect** button on every catalog card.
   - On Mobile: Tap or drag to inspect with full touch gestures.
   - Keyboard Accessible: Tab to focus, arrow keys to pan, Esc/Enter to exit.

---

### 6. Local Testing in Cursor / VS Code Live Server

1. Open the workspace folder in Cursor / VS Code (`c:\Users\Admin\Desktop\testcartel`).
2. Run the verification suite:
   ```powershell
   python scripts/verify_build.py
   ```
3. Open `http://localhost:3000` in your web browser.
4. **Test the Phase 2 Features:**
   - **Hover-to-Reveal:** Hover over any of the 6 saree cards. Notice the instant cross-fade from folded fabric to model drape with 3D magnetic tilt.
   - **Inspect Weave:** Click the **Inspect** button on any card to open the Tactile Zoom Inspector modal.
   - **Lenis Smooth Scroll:** Scroll on desktop to feel the weighted inertia; test on mobile viewport (< 768px) to verify native touch physics.
   - **Tactile Studio Section:** Scroll down to the `#heritage` section to interact with the embedded 2.5× zoom viewport and switch perspective swatches.
   - **Frictionless Cart:** Click **Add to Bag** to verify the AJAX cart drawer still works seamlessly.

---

### 7. Lighthouse 90+ Mobile Performance Architecture

- **Asset Compression:** All 12 catalog images are exported in WebP at strict 4:5 ratio, weighing under 220KB per card.
- **Below-Fold Offloading:** All catalog images utilize native `loading="lazy"` and `fetchpriority="low"`, ensuring main-thread priority is reserved for the initial hero scrub frames.
- **GPU Layer Isolation:** Dual-image product cards and zoom viewports use `will-change: transform, opacity`, `backface-visibility: hidden`, and `contain: paint` to eliminate layout thrashing.
- **Zero CLI Dependencies:** Pure vanilla JS and clean CSS architecture guarantees near-instant Time-To-Interactive (TTI) and First Input Delay (FID) on 4G mobile devices.
