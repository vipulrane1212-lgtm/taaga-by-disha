# TAAGA BY DISHA — AI VIRTUAL PHOTOSHOOT WORKFLOW & CATALOG PARAMETERS
## Phase 2: Luxury UI/UX Polish & AI Catalog Generation (Zero-Studio ₹20,000–₹30,000 Budget Optimization)

---

## 1. Executive Strategy & Budget Optimization

### The Traditional Dilemma
A traditional high-fashion editorial photoshoot for luxury handloom sarees imposes prohibitive upfront production costs:
* Physical Studio Hire (Mumbai/Delhi/Varanasi): ₹25,000 – ₹45,000 / day
* Professional Fashion Model (Agency-represented): ₹30,000 – ₹60,000 / day
* Hair & Makeup Artist (Specialized luxury ethnic styling): ₹15,000 – ₹25,000 / day
* Master Saree Draping Stylist (Crucial for crisp pleating & pallu arrangement): ₹12,000 – ₹20,000 / day
* Senior Fashion Photographer + Lighting Rig: ₹35,000 – ₹60,000 / day
* Digital Retouching (Zari color grading, flyaway cleanup, 20 SKU set): ₹20,000 – ₹35,000
**Total Traditional Photoshoot Cost for 20 SKUs: ₹1,37,000 – ₹2,45,000**

### The Taaga by Disha Virtual Solution (₹20,000 – ₹30,000 Cap)
By leveraging AI draping synthesis paired with studio-standard flat-lay photography, Taaga by Disha achieves an ultra-luxury, high-editorial aesthetic while maintaining a strict 85% cost reduction:
1. **Artisanal Flat-Lay Studio (In-House / Local):** ₹5,000 – ₹8,000 (diffused daylight rig + archival parchment props)
2. **Specialized Textile AI Compute Subscriptions:** ₹6,000 – ₹10,000 (Stylic.ai Pro / The Textile AI Enterprise credits / Midjourney v6 Pro / Flux.1 Pro)
3. **High-Res Upscaling & WebP Optimization Pipeline:** ₹2,000 – ₹4,000 (Magnific AI / Real-ESRGAN / Sharp automation)
4. **Artisan Guild Royalties & Contributor Fund:** ₹7,000 – ₹8,000 directly returned to weaver collectives
**Total Net Production Cost: ₹20,000 – ₹30,000 (Sustainable, Repeatable for all seasonal drops)**

---

## 2. Flat-Lay Raw Photo Capture Specifications

To enable generative draping tools to preserve 100% weave authenticity, raw folded saree photos must adhere to strict photographic standards:

| Parameter | Production Standard | Reason |
| :--- | :--- | :--- |
| **Color Temperature** | 5000K – 5400K Neutral Daylight | Prevents metallic zari threads (gold/silver) from shifting hue |
| **Color Rendering Index (CRI)** | 96+ High CRI LED Softboxes | Captures subtle vegetable dyes, rust-brown terracotta, and teal pigments |
| **Camera Angle** | Strict 90° Overhead Orthographic (Top-Down) | Eliminates keystoning and perspective distortion on folded border repeats |
| **Aperture & DoF** | f/8 to f/11 (Edge-to-edge sharpness) | Ensures corner motifs (Kadwa, Jamdani butis) remain tack-sharp |
| **Focal Length** | 50mm to 85mm Prime Lens | Zero barrel distortion across intricate woven borders |
| **Background Surface** | Raw handmade ivory parchment or rustic raw linen | Complements brand heritage and facilitates clean alpha masking |
| **Compositional Elements** | Folded pleat stack, prominent pallu section, border edge, raw yarn spool | Provides the AI engine with macro cues for fabric weight and drape fall |

---

## 3. Specialized Textile AI Draping Engines & Workflow Parameters

### Recommended Engines:
1. **Stylic.ai / The Textile AI (Primary Textile Drapers):**
   * *Mechanism:* Uses geometry-preserving textile segmentation to map flat fabric onto 3D human body meshes.
   * *Best for:* Catalog front-facing drape, reverse pallu drape, pleat alignment.
2. **Flux.1 Pro / Midjourney v6 (Secondary Editorial Lifestyle):**
   * *Mechanism:* Generates context-rich environmental portraits, atmosphere, directional lighting, and aspirational mood boards.

### Parameter Matrix for AI Drape Processing:

```yaml
Workflow: Flat-Lay to Virtual Model Drape
Engine: Stylic.ai / The Textile AI (v2.4+)
Input_1: Raw Flat-lay Folded Saree (High-Res 4000x5000px, 5000K white balance)
Input_2: Saree Pallu & Border Closeup Crop (for motif cross-referencing)

Generation Parameters:
  Model_Ethnicity: South Asian / Indian Contemporary
  Skin_Tone_Grading: Warm undertone, radiant natural dewy finish, unbleached
  Age_Profile: 26 - 32 years old
  Facial_Expression: Serene, dignified, understated luxury
  Pose_Profile: 
    - Pose_A (Catalog View): Standing 3/4 turn, hands gently clasped at waist, pallu flowing gracefully over left shoulder
    - Pose_B (Detail Pallu View): Gentle over-the-shoulder gaze, focusing on border intricate threadwork
  Draping_Style: Traditional Classic Nivi Drape (6-yard with 7-9 crisp front pleats and 1.2m pallu fall)
  Fabric_Physics:
    - Weight: Heavy Silk (Kanjeevaram) / Airy Sheer (Chanderi) / Stiff Handspun (Jamdani)
    - Fall: Heavy cascade with natural organic folds (zero synthetic plastic sheen)
    - Border_Alignment: Strict preservation of gold zari korvai border along pleat edges and pallu rim
  Denoising_Strength: 0.38 (Prevents AI hallucination of imaginary patterns; preserves exact warp/weft)
  ControlNet_Settings:
    - Preprocessor: Openpose (Body geometry) + Lineart_Realistic (Saree borders)
    - Control_Weight: 1.0 (Body), 1.25 (Textile Motif Alignment)
  Lighting_Style: Minimalist warm diffused directional studio light, soft falloff shadows
```

---

## 4. Master Editorial Prompts (Midjourney v6 / Flux.1 Pro)

### A. Homepage Lifestyle & Master Editorial Prompt
For homepage hero backgrounds, video transition stills, and editorial mood boards:

```text
Ultra-realistic 8K UHD DSLR luxury fashion editorial portrait. A graceful Indian woman wearing an artisanal handloom saree with earthy rust-brown body and contrasting vibrant teal borders. Minimalist contemporary studio, warm diffused directional lighting, intricate fabric weave and pleat focus, highly detailed texture, 4:5 aspect ratio, cinematic shadow contrast, photorealistic. --ar 4:5 --style raw --v 6.0 --q 2 --c 0
```

### B. Neelambari Kora Silk Saree (Peacock Teal & Deep Midnight Blue)
```text
Ultra-realistic 8K UHD DSLR luxury fashion editorial portrait. A graceful Indian woman wearing an artisanal handloom Neelambari saree with deep midnight blue and peacock teal body and contrasting gold kadwa zari border. Minimalist contemporary studio, warm diffused directional lighting, intricate fabric weave, 4:5 aspect ratio, cinematic shadow contrast, photorealistic. --ar 4:5 --style raw --v 6.0
```

### C. Maitree Chanderi Tissue Saree (Ivory-Cream & Champagne Gold Zari)
```text
Ultra-realistic 8K UHD DSLR luxury fashion editorial portrait. A graceful Indian woman wearing an artisanal handloom Chanderi tissue saree with shimmering ivory-cream body and champagne gold and silver zari pallu. Minimalist contemporary studio, warm diffused directional lighting, intricate sheer fabric weave, 4:5 aspect ratio, cinematic shadow contrast, photorealistic. --ar 4:5 --style raw --v 6.0
```

### D. Raktambari Kanjeevaram Saree (Crimson Rust & Pure Gold Korvai)
```text
Ultra-realistic 8K UHD DSLR luxury fashion editorial portrait. A graceful Indian woman wearing an artisanal handloom Raktambari Kanjeevaram saree with rich deep crimson rust silk body and broad pure gold korvai zari border. Minimalist contemporary studio, warm diffused directional lighting, intricate weave texture, 4:5 aspect ratio, cinematic shadow contrast, photorealistic. --ar 4:5 --style raw --v 6.0
```

### E. Dhaneshwari Tussar Silk Saree (Golden Wheat Wild Silk)
```text
Ultra-realistic 8K UHD DSLR luxury fashion editorial portrait. A graceful Indian woman wearing an artisanal handloom Dhaneshwari Tussar silk saree with natural golden wheat raw tussar body and contrasting burnt amber border. Minimalist contemporary studio, warm diffused directional lighting, coarse wild silk texture, 4:5 aspect ratio, photorealistic. --ar 4:5 --style raw --v 6.0
```

### F. Alaknanda Maheshwari Silk-Cotton (Olive Green & Reversible Copper)
```text
Ultra-realistic 8K UHD DSLR luxury fashion editorial portrait. A graceful Indian woman wearing an artisanal handloom Alaknanda Maheshwari saree with deep olive forest green body and reversible copper-rust Narmada border. Minimalist contemporary studio, warm diffused directional lighting, lightweight handspun silk-cotton weave, 4:5 aspect ratio, photorealistic. --ar 4:5 --style raw --v 6.0
```

---

## 5. Asset Standardization & Export Pipeline

Every visual asset in the Taaga catalog must satisfy strict technical benchmarks to safeguard mobile performance:

1. **Aspect Ratio:** Strict **4:5 vertical aspect ratio** (0.800 ratio) across all catalog cards and editorial zoom modules.
2. **Resolution Standards:**
   * **Catalog Thumbnails:** 800px × 1000px (Display size: ~360px on mobile, ~420px on desktop 3-col).
   * **PDP High-Resolution Zoom Assets:** 1200px × 1500px to 1600px × 2000px (Guarantees zero pixelation during 2.5x micro-inspection).
   * **Minimum Dimension:** At least 1000px on the longest side.
3. **Format & Compression:**
   * **Format:** WebP (lossy with sharp edge preservation, quality = 85–88).
   * **Target File Size:** Under 220KB per catalog image, under 450KB per 2000px PDP zoom master.
   * **Color Profile:** sRGB (IEC61966-2.1) embedded for cross-browser color consistency on OLED & Retina screens.
4. **Metadata Indexing:**
   * File naming pattern: `saree-[id]-folded.webp` (default view) and `saree-[id]-drape.webp` (hover reveal).
   * Alt tags: `[Saree Name] - Artisanal Handloom [Craft] with [Border Description]`.

---

## 6. Shopify Admin Direct Integration (Zero CLI / Zero Terminal)

To deploy these assets into an active Shopify store without code or command-line scripts:

### Step 1: Upload Media Assets
1. Open **Shopify Admin > Content > Files**.
2. Click **Upload files** and select your 4:5 standardized `.webp` assets (`saree-01-folded.webp`, `saree-01-drape.webp`, etc.).
3. Shopify will assign a permanent CDN URL for each (e.g. `https://cdn.shopify.com/s/files/.../saree-01-drape.webp`).

### Step 2: Configure Product Metafields (Web Admin GUI)
1. Navigate to **Shopify Admin > Settings > Custom data > Products**.
2. Click **Add definition**:
   * **Name:** `AI Model Drape Image`
   * **Namespace and key:** `custom.ai_model_drape`
   * **Type:** `File` (Select *One image*)
3. Add a second definition:
   * **Name:** `High-Res Tactile Zoom Image`
   * **Namespace and key:** `custom.fabric_texture_zoom`
   * **Type:** `File` (Select *One image*)

### Step 3: Assign Assets to Products
1. Go to **Shopify Admin > Products** and select a saree SKU.
2. Set the **Featured Media** (Image #1) as the **Artisanal Folded Fabric / Flat-Lay**.
3. Set the **Media Image #2** (or the `custom.ai_model_drape` metafield) as the **AI-Generated Model Drape**.
4. Save the product. The `product-card.liquid` snippet and `taaga-luxury-polish.js` automatically read and cross-fade between these two states on customer hover!
