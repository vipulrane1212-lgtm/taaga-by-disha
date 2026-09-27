# -*- coding: utf-8 -*-
import os
import json
import zipfile

base_dir = r"c:\Users\Admin\Desktop\testcartel"

# =====================================================================
# 1. UPDATE index.html
# =====================================================================
index_path = os.path.join(base_dir, "index.html")
with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1.1 Announcement Bar
announcement_html = """  <!-- ========================================================================
       0. TOP ANNOUNCEMENT & PRIVILEGE TICKER BAR
       ======================================================================== -->
  <aside class="announcement-bar" role="region" aria-label="Privilege Announcements">
    <div class="announcement-bar__inner">
      <div class="announcement-bar__item is-active">
        <span class="announcement-bar__pill">Inaugural Privilege</span>
        <span>Complimentary Handcrafted Pure Silk Blouse Piece with orders above ₹25,000</span>
        <span class="announcement-bar__code" data-copy-code="ATELIER2026" title="Click to copy code">Code: ATELIER2026</span>
      </div>
      <div class="announcement-bar__item">
        <span class="announcement-bar__pill">Silk Mark Certified</span>
        <span>100% Pure Mulberry &amp; Tussar Silk • Handwoven upon Ancestral Pit Looms</span>
      </div>
      <div class="announcement-bar__item">
        <span class="announcement-bar__pill">Patron Concierge</span>
        <span>Complimentary Insured Express Delivery Across India &amp; Worldwide • 14-Day Silk Trial</span>
      </div>
    </div>
  </aside>
"""

if 'class="announcement-bar"' not in html:
    html = html.replace('<header class="taaga-header"', announcement_html + '\n  <header class="taaga-header"')

# 1.2 Story Reels
story_reels_html = """
    <!-- ========================================================================
         2.5 CIRCULAR STORY REELS: THE HANDLOOM CHRONICLES
         ======================================================================== -->
    <section class="story-reels-section" aria-label="Artisan Stories &amp; Chronicles">
      <div class="story-reels-container">
        <button type="button" class="story-reel-item" data-story-title="The 160-Hour Pit Loom Ritual" data-story-desc="Inside Murshidabad's heritage clusters where master weavers shuttle gossamer mulberry threads into ethereal Jamdani motifs." data-story-craft="Bengal Heritage Guild" data-story-media="./assets/catalog/saree-01-drape.webp" data-story-link="#catalog">
          <div class="story-reel-avatar-wrap">
            <div class="story-reel-avatar-inner">
              <img src="./assets/catalog/saree-01-drape.webp" alt="Bengal Pit Looms" class="story-reel-img" loading="lazy">
            </div>
            <span class="story-reel-badge">★</span>
          </div>
          <span class="story-reel-label">Bengal Looms</span>
        </button>

        <button type="button" class="story-reel-item" data-story-title="Royal Bridal Trousseau Edits" data-story-desc="Heavy Kanjeevaram silks interlocked with authentic Korvai techniques and 24K electroplated gold zari borders." data-story-craft="Kanchipuram Atelier" data-story-media="./assets/catalog/saree-04-drape.webp" data-story-link="#catalog">
          <div class="story-reel-avatar-wrap">
            <div class="story-reel-avatar-inner">
              <img src="./assets/catalog/saree-04-drape.webp" alt="Bridal Trousseau" class="story-reel-img" loading="lazy">
            </div>
            <span class="story-reel-badge">★</span>
          </div>
          <span class="story-reel-label">Bridal Edit</span>
        </button>

        <button type="button" class="story-reel-item" data-story-title="The Authentic Kadwa Needle Weave" data-story-desc="Each Kadwa buti is individually shuttled by hand in Varanasi with zero loose floats on the reverse side." data-story-craft="Varanasi Guild" data-story-media="./assets/catalog/saree-02-drape.webp" data-story-link="#catalog">
          <div class="story-reel-avatar-wrap">
            <div class="story-reel-avatar-inner">
              <img src="./assets/catalog/saree-02-drape.webp" alt="Kadwa Zari Guide" class="story-reel-img" loading="lazy">
            </div>
            <span class="story-reel-badge">★</span>
          </div>
          <span class="story-reel-label">Kadwa Zari</span>
        </button>

        <button type="button" class="story-reel-item" data-story-title="Chanderi Shimmer &amp; Gold Tissue" data-story-desc="Spun with sheer silk warps and gossamer cotton wefts, reflecting gentle diffused luminosity in evening lights." data-story-craft="Chanderi Cluster" data-story-media="./assets/catalog/saree-03-drape.webp" data-story-link="#catalog">
          <div class="story-reel-avatar-wrap">
            <div class="story-reel-avatar-inner">
              <img src="./assets/catalog/saree-03-drape.webp" alt="Chanderi Tissue" class="story-reel-img" loading="lazy">
            </div>
            <span class="story-reel-badge">★</span>
          </div>
          <span class="story-reel-label">Chanderi Silk</span>
        </button>

        <button type="button" class="story-reel-item" data-story-title="Organic Forest Tussar Textures" data-story-desc="Rich, textured golden filaments reeled from wild forest cocoons by indigenous weaver collectives in Bhagalpur." data-story-craft="Bhagalpur Collective" data-story-media="./assets/catalog/saree-05-drape.webp" data-story-link="#catalog">
          <div class="story-reel-avatar-wrap">
            <div class="story-reel-avatar-inner">
              <img src="./assets/catalog/saree-05-drape.webp" alt="Wild Tussar" class="story-reel-img" loading="lazy">
            </div>
            <span class="story-reel-badge">★</span>
          </div>
          <span class="story-reel-label">Wild Tussar</span>
        </button>

        <button type="button" class="story-reel-item" data-story-title="Maheshwar Reversible Borders" data-story-desc="Ancestral Narmada river inspired borders that drape seamlessly from either side with fluid grace." data-story-craft="Maheshwar Fort Guild" data-story-media="./assets/catalog/saree-06-drape.webp" data-story-link="#catalog">
          <div class="story-reel-avatar-wrap">
            <div class="story-reel-avatar-inner">
              <img src="./assets/catalog/saree-06-drape.webp" alt="Maheshwari Borders" class="story-reel-img" loading="lazy">
            </div>
            <span class="story-reel-badge">★</span>
          </div>
          <span class="story-reel-label">Reversible</span>
        </button>
      </div>
    </section>
"""

if 'class="story-reels-section"' not in html:
    html = html.replace('</section>\n\n    <!-- ========================================================================\n         3. PRODUCT CATALOG', '</section>\n' + story_reels_html + '\n    <!-- ========================================================================\n         3. PRODUCT CATALOG')

# 1.3 Occasion Tabs
occasion_tabs_html = """        <!-- Curated By Occasion Filter Tabs -->
        <div class="occasion-tabs-wrap" role="tablist" aria-label="Curated Occasion Filters">
          <button type="button" class="occasion-tab-btn is-active" data-occasion-filter="all">All Heirlooms (6)</button>
          <button type="button" class="occasion-tab-btn" data-occasion-filter="bridal">Bridal Trousseau</button>
          <button type="button" class="occasion-tab-btn" data-occasion-filter="festive">Festive Heritage</button>
          <button type="button" class="occasion-tab-btn" data-occasion-filter="cocktail">Evening Cocktail</button>
          <button type="button" class="occasion-tab-btn" data-occasion-filter="daywear">Airy Luxury</button>
        </div>
"""

if 'class="occasion-tabs-wrap"' not in html:
    html = html.replace('</header>\n\n        <!-- The 2-Column Mobile, 3-Column Desktop Grid', '</header>\n\n' + occasion_tabs_html + '\n        <!-- The 2-Column Mobile, 3-Column Desktop Grid')

html = html.replace('data-product-id="saree-01"', 'data-product-id="saree-01" data-occasion="festive bridal"')
html = html.replace('data-product-id="saree-02"', 'data-product-id="saree-02" data-occasion="bridal cocktail"')
html = html.replace('data-product-id="saree-03"', 'data-product-id="saree-03" data-occasion="cocktail daywear"')
html = html.replace('data-product-id="saree-04"', 'data-product-id="saree-04" data-occasion="bridal festive"')
html = html.replace('data-product-id="saree-05"', 'data-product-id="saree-05" data-occasion="festive daywear"')
html = html.replace('data-product-id="saree-06"', 'data-product-id="saree-06" data-occasion="daywear cocktail"')

# 1.4 Middle Sections (Shop The Look, Privilege Club, Press Marquee, Reviews)
middle_sections_html = """
    <!-- ========================================================================
         3.5 INTERACTIVE "SHOP THE LOOK" EDITORIAL HOTSPOT CANVAS
         ======================================================================== -->
    <section class="shop-the-look-section" id="shop-the-look" aria-labelledby="stl-heading">
      <div class="shop-the-look-grid">
        <div class="hotspot-canvas-wrap">
          <img src="./assets/catalog/saree-01-drape.webp" alt="Shop The Trousseau Look: Surya Mukhi Jamdani" class="hotspot-canvas-img" loading="lazy">
          
          <button type="button" class="hotspot-pin" style="top: 48%; left: 42%;" data-x="42" data-y="48" data-item-title="Surya Mukhi Jamdani Saree" data-item-price="₹34,500" data-variant-id="saree-01" data-item-image="./assets/catalog/saree-01-folded.webp" aria-label="Inspect Surya Mukhi Saree">
            <span class="hotspot-pin-pulse"></span>
            <span class="hotspot-pin-core">•</span>
          </button>

          <button type="button" class="hotspot-pin" style="top: 26%; left: 52%;" data-x="52" data-y="26" data-item-title="Mulberry Raw Silk Tailored Blouse" data-item-price="Complimentary (Code: ATELIER2026)" data-variant-id="saree-01" aria-label="Inspect Mulberry Blouse">
            <span class="hotspot-pin-pulse"></span>
            <span class="hotspot-pin-core">•</span>
          </button>

          <button type="button" class="hotspot-pin" style="top: 68%; left: 32%;" data-x="32" data-y="68" data-item-title="Handspun 24K Zari Pallu Tassels" data-item-price="Hand-knotted by Guild Masters" data-variant-id="saree-01" aria-label="Inspect Pallu Tassels">
            <span class="hotspot-pin-pulse"></span>
            <span class="hotspot-pin-core">•</span>
          </button>

          <div class="hotspot-popover" id="hotspot-popover">
            <h4 class="hotspot-popover__title">Surya Mukhi Jamdani Saree</h4>
            <div class="hotspot-popover__price">₹34,500</div>
            <button type="button" class="hotspot-popover__btn">Add Piece To Bag</button>
          </div>
        </div>

        <div class="shop-the-look-content">
          <span class="sub-title">Editorial Curation • Autumn Edition</span>
          <h2 id="stl-heading" class="section-title" style="font-size: 2.25rem; margin-top: 0.5rem;">
            The Autumn Sun Solstice Look
          </h2>
          <p style="color: var(--color-text-muted-dark); font-size: 0.9375rem; line-height: 1.7; margin: 1.25rem 0 1.75rem 0;">
            A masterclass in textural dialogue: the ochre warmth of raw Bengal mulberry silk harmonizes with vibrant peacock teal borders. Styled with custom-measured blouse piece tailored in our Calcutta atelier.
          </p>

          <div style="background: var(--color-rust-deepest); border: 1px solid var(--color-rust-border); border-radius: 6px; padding: 1.25rem; margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
              <span style="font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-gold-zari); font-weight: 600;">Complete Trousseau Curation</span>
              <span style="font-size: 1.125rem; color: #fff; font-weight: 600;">₹34,500</span>
            </div>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.8125rem; color: var(--color-rust-muted); display: flex; flex-direction: column; gap: 0.35rem;">
              <li>✓ Surya Mukhi Jamdani Saree (160h Pit Loom Weave)</li>
              <li>✓ Complimentary Handloom Raw Silk Blouse Piece (Worth ₹4,500)</li>
              <li>✓ Hand-knotted Zari Tassels &amp; Fall-Pico Finishing Included</li>
              <li>✓ Insured Express Courier with Silk Mark Authenticity Seal</li>
            </ul>
          </div>

          <button type="button" class="btn-primary-teal" id="btn-shop-trousseau-bundle" style="width: 100%; padding: 1.15rem; font-size: 0.9375rem;">
            <span>Shop Complete Trousseau Look (1-Click)</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- ========================================================================
         3.6 TAAGA PRIVILEGE CLUB (VIP PATRON MEMBERSHIP MODULE)
         ======================================================================== -->
    <section class="privilege-club-section" id="privilege-club" aria-labelledby="privilege-heading">
      <div class="privilege-card-wrap">
        <div style="display: flex; justify-content: center;">
          <div class="privilege-card-visual" role="img" aria-label="Taaga Privilege Club Gold Card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <span style="font-family: var(--font-serif); font-size: 1.25rem; letter-spacing: 0.15em; color: var(--color-gold-zari); font-weight: 700;">TAAGA</span>
              <div class="privilege-card-chip"></div>
            </div>
            <div>
              <div style="font-family: monospace; font-size: 1rem; letter-spacing: 0.2em; color: rgba(255,255,255,0.7); margin-bottom: 0.5rem;">
                7204 •••• •••• 2026
              </div>
              <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                  <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-rust-muted);">Cardholder</div>
                  <div style="font-size: 0.8125rem; color: #fff; font-weight: 600; letter-spacing: 0.05em;">ESTEEMED PATRON</div>
                </div>
                <div>
                  <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-rust-muted);">Privilege Tier</div>
                  <div style="font-size: 0.8125rem; color: var(--color-gold-zari); font-weight: 600;">GOLD ATELIER</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span class="sub-title">Patron Inner Circle</span>
          <h2 id="privilege-heading" class="section-title" style="font-size: 2.25rem; margin-top: 0.5rem;">
            The Taaga Privilege Pass
          </h2>
          <p style="color: var(--color-text-muted-dark); font-size: 0.9375rem; line-height: 1.6; margin: 1rem 0;">
            Directly supporting ancestral handloom pit looms. Become an enrolled patron to unlock bespoke atelier services on all acquisitions.
          </p>

          <ul class="privilege-perks-list">
            <li class="privilege-perk-item">
              <svg class="privilege-perk-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span><strong>Instant 10% Welcome Credit</strong> applied directly across all handloom sarees (Code: <code>ATELIER2026</code>)</span>
            </li>
            <li class="privilege-perk-item">
              <svg class="privilege-perk-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span><strong>Bespoke Fall, Pico &amp; Blouse Tailoring</strong> complimentary on all orders</span>
            </li>
            <li class="privilege-perk-item">
              <svg class="privilege-perk-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span><strong>48-Hour Early Access</strong> to limited 1-of-1 master weaver archival drops</span>
            </li>
            <li class="privilege-perk-item">
              <svg class="privilege-perk-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span><strong>Private WhatsApp Concierge</strong> with Disha &amp; master draping stylists</span>
            </li>
          </ul>

          <button type="button" class="btn-primary-teal" id="btn-claim-privilege-pass" style="padding: 1rem 2rem; font-size: 0.875rem;">
            <span>Claim 10% Privilege Pass (Instant Unlock)</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ========================================================================
         3.7 EDITORIAL PRESS & CRITICS MARQUEE
         ======================================================================== -->
    <section class="press-marquee-section" aria-label="Press &amp; Citations">
      <div class="press-marquee-track">
        <div class="press-item">
          <span class="press-logo-text">VOGUE</span>
          <span class="press-quote">“Resurrecting endangered pit-loom traditions with haute-couture reverence.”</span>
        </div>
        <div class="press-item">
          <span class="press-logo-text">HARPER'S BAZAAR</span>
          <span class="press-quote">“Where ancestral Indian craftsmanship meets contemporary digital flagships.”</span>
        </div>
        <div class="press-item">
          <span class="press-logo-text">ELLE</span>
          <span class="press-quote">“The definitive sanctuary for pure handloom silk connoisseurs.”</span>
        </div>
        <div class="press-item">
          <span class="press-logo-text">ARCHITECTURAL DIGEST</span>
          <span class="press-quote">“Wearable art woven with centuries of generational patience.”</span>
        </div>
        <div class="press-item">
          <span class="press-logo-text">THE HINDU LIFESTYLE</span>
          <span class="press-quote">“A breath of pure oxygen in an era of synthetic fast fashion.”</span>
        </div>
        <div class="press-item">
          <span class="press-logo-text">VOGUE</span>
          <span class="press-quote">“Resurrecting endangered pit-loom traditions with haute-couture reverence.”</span>
        </div>
        <div class="press-item">
          <span class="press-logo-text">HARPER'S BAZAAR</span>
          <span class="press-quote">“Where ancestral Indian craftsmanship meets contemporary digital flagships.”</span>
        </div>
        <div class="press-item">
          <span class="press-logo-text">ELLE</span>
          <span class="press-quote">“The definitive sanctuary for pure handloom silk connoisseurs.”</span>
        </div>
      </div>
    </section>

    <!-- ========================================================================
         3.8 CUSTOMER LOVE & UNBOXING REVIEWS
         ======================================================================== -->
    <section class="reviews-section" id="reviews" aria-labelledby="reviews-heading">
      <div class="catalog-container">
        <header class="catalog-header" style="text-align: center; align-items: center;">
          <span class="sub-title">Patron Testimonials</span>
          <h2 id="reviews-heading" class="section-title">Voices From The Sanctuary</h2>
          <p style="max-width: 540px; color: var(--color-text-muted-dark); font-size: 0.9375rem; line-height: 1.6; text-align: center;">
            Over 2,400 heirlooms delivered to patrons across 18 countries. Every parcel is Silk Mark verified, scented with natural vetiver root, and wrapped in organic muslin.
          </p>
        </header>

        <div class="reviews-carousel-track">
          <article class="review-card">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <div class="review-stars">★★★★★</div>
                <span class="review-verified-badge">✓ Silk Mark Verified</span>
              </div>
              <p style="font-size: 0.9375rem; color: #fff; line-height: 1.6; font-style: italic;">
                “The weight and fall of the Surya Mukhi Jamdani is unlike anything you find in commercial stores. The fabric breathes like pure poetry, and the tactile zoom on the site was 100% true to real life.”
              </p>
            </div>
            <div style="border-top: 1px solid rgba(68, 42, 27, 0.6); padding-top: 0.875rem;">
              <div style="font-weight: 600; color: #fff; font-size: 0.875rem;">Dr. Radhika Sen</div>
              <div style="font-size: 0.75rem; color: var(--color-rust-muted);">South Kensington, London • Surya Mukhi Jamdani</div>
            </div>
          </article>

          <article class="review-card">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <div class="review-stars">★★★★★</div>
                <span class="review-verified-badge">✓ Silk Mark Verified</span>
              </div>
              <p style="font-size: 0.9375rem; color: #fff; line-height: 1.6; font-style: italic;">
                “I wore the Neelambari Kora Silk to my daughter's sangeet. The contrast between the midnight blue and pure kadwa zari was breathtaking. The concierge service over WhatsApp was so reassuring.”
              </p>
            </div>
            <div style="border-top: 1px solid rgba(68, 42, 27, 0.6); padding-top: 0.875rem;">
              <div style="font-weight: 600; color: #fff; font-size: 0.875rem;">Meenakshi Sundaram</div>
              <div style="font-size: 0.75rem; color: var(--color-rust-muted);">Alwarpet, Chennai • Neelambari Kora Silk</div>
            </div>
          </article>

          <article class="review-card">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <div class="review-stars">★★★★★</div>
                <span class="review-verified-badge">✓ Silk Mark Verified</span>
              </div>
              <p style="font-size: 0.9375rem; color: #fff; line-height: 1.6; font-style: italic;">
                “The Raktambari Kanjeevaram is a true heirloom piece. The Korvai hand-interlocking is pristine, and the stole gift was such a thoughtful luxury touch. Worth every single rupee.”
              </p>
            </div>
            <div style="border-top: 1px solid rgba(68, 42, 27, 0.6); padding-top: 0.875rem;">
              <div style="font-weight: 600; color: #fff; font-size: 0.875rem;">Anupama Singhania</div>
              <div style="font-size: 0.75rem; color: var(--color-rust-muted);">Bandra West, Mumbai • Raktambari Kanjeevaram</div>
            </div>
          </article>
        </div>
      </div>
    </section>
"""

if 'id="shop-the-look"' not in html:
    html = html.replace('</section>\n\n    <!-- Footer Space -->', '</section>\n' + middle_sections_html + '\n    <!-- Footer Space -->')

# 1.5 Cart Gift Progress
cart_gift_html = """    <!-- Live Gift Progression Bar -->
    <div class="cart-gift-bar" id="cart-gift-bar">
      <div class="cart-gift-bar__msg" id="cart-gift-msg">
        <span>Add <strong>₹50,000</strong> for a <em>Complimentary Pure Silk Stole</em></span>
        <span>0%</span>
      </div>
      <div class="cart-gift-bar__track">
        <div class="cart-gift-bar__fill" id="cart-gift-fill"></div>
      </div>
    </div>
"""

if 'id="cart-gift-bar"' not in html:
    html = html.replace('<div class="cart-drawer__body" id="cart-drawer-items"', cart_gift_html + '    <div class="cart-drawer__body" id="cart-drawer-items"')

# 1.6 Floating Elements (Story Modal, Toast, WhatsApp)
floating_html = """
  <!-- ========================================================================
       5. INTERACTIVE STORY REELS MODAL VIEWER
       ======================================================================== -->
  <div class="story-modal" id="story-reels-modal" role="dialog" aria-modal="true" aria-label="Story Viewer">
    <div class="story-modal-card">
      <img src="" alt="Story media" class="story-modal-media">
      <div class="story-modal-overlay"></div>
      <div class="story-modal-header">
        <div class="story-progress-bar-wrap">
          <div class="story-progress-seg"><div class="story-progress-fill"></div></div>
          <div class="story-progress-seg"><div class="story-progress-fill"></div></div>
          <div class="story-progress-seg"><div class="story-progress-fill"></div></div>
          <div class="story-progress-seg"><div class="story-progress-fill"></div></div>
          <div class="story-progress-seg"><div class="story-progress-fill"></div></div>
          <div class="story-progress-seg"><div class="story-progress-fill"></div></div>
        </div>
        <div class="story-header-content">
          <div class="story-header-profile">
            <img src="./assets/catalog/saree-01-drape.webp" alt="Avatar" class="story-header-avatar">
            <span class="story-header-name">Bengal Heritage Guild</span>
          </div>
          <button type="button" class="story-modal-close" data-close-story aria-label="Close Story">&times;</button>
        </div>
      </div>
      <div class="story-modal-footer">
        <h3 class="story-modal-title">The 160-Hour Pit Loom Ritual</h3>
        <p class="story-modal-desc">Inside Murshidabad heritage clusters where master weavers shuttle gossamer threads.</p>
        <button type="button" class="story-modal-btn">Explore This Weave</button>
      </div>
    </div>
  </div>

  <!-- ========================================================================
       6. REAL-TIME PURCHASE PULSE TOAST
       ======================================================================== -->
  <div class="purchase-pulse-toast" id="purchase-pulse-toast" role="status" aria-live="polite">
    <img src="./assets/catalog/saree-01-drape.webp" alt="Purchased Item" class="pulse-img">
    <div class="pulse-info">
      <div class="pulse-headline"><strong>Aarohi M.</strong> (New Delhi) acquired <em>Surya Mukhi Jamdani</em></div>
      <div class="pulse-time">Verified Purchase • 4m ago</div>
    </div>
  </div>

  <!-- ========================================================================
       7. WHATSAPP VIP CONCIERGE FLOATING BUTTON
       ======================================================================== -->
  <a href="https://wa.me/919876543210?text=Hello%20Disha,%20I%20am%20exploring%20Taaga%20artisanal%20handloom%20sarees%20and%20would%20love%20master%20draping%20advice." target="_blank" rel="noopener noreferrer" class="vip-concierge-float" aria-label="Chat with VIP Master Draper on WhatsApp">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
    <span>VIP Styling Concierge</span>
  </a>
"""

if 'id="story-reels-modal"' not in html:
    html = html.replace('<!-- Interactive Scripts -->', floating_html + '\n  <!-- Interactive Scripts -->')

with open(index_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated index.html successfully!")

# =====================================================================
# 2. CREATE NEW SHOPIFY LIQUID SECTIONS
# =====================================================================
sections_dir = os.path.join(base_dir, "sections")
os.makedirs(sections_dir, exist_ok=True)

# 2.1 sections/story-reels.liquid
story_reels_liquid = """<section class="story-reels-section" aria-label="{{ section.settings.heading | escape }}">
  <div class="story-reels-container">
    {%- for block in section.blocks -%}
      <button 
        type="button" 
        class="story-reel-item" 
        data-story-title="{{ block.settings.title | escape }}"
        data-story-desc="{{ block.settings.description | escape }}"
        data-story-craft="{{ block.settings.craft_origin | escape }}"
        data-story-media="{% if block.settings.image != blank %}{{ block.settings.image | image_url: width: 800 }}{% else %}./assets/catalog/saree-01-drape.webp{% endif %}"
        data-story-link="{{ block.settings.link_url | default: '#catalog' }}"
        {{ block.shopify_attributes }}
      >
        <div class="story-reel-avatar-wrap">
          <div class="story-reel-avatar-inner">
            {%- if block.settings.image != blank -%}
              <img src="{{ block.settings.image | image_url: width: 200 }}" alt="{{ block.settings.title | escape }}" class="story-reel-img" loading="lazy">
            {%- else -%}
              <img src="./assets/catalog/saree-01-drape.webp" alt="Story" class="story-reel-img" loading="lazy">
            {%- endif -%}
          </div>
          <span class="story-reel-badge">★</span>
        </div>
        <span class="story-reel-label">{{ block.settings.short_label | default: block.settings.title }}</span>
      </button>
    {%- else -%}
      <button type="button" class="story-reel-item" data-story-title="The 160-Hour Pit Loom Ritual" data-story-desc="Inside Murshidabad's heritage clusters." data-story-craft="Bengal Heritage Guild" data-story-media="./assets/catalog/saree-01-drape.webp" data-story-link="#catalog">
        <div class="story-reel-avatar-wrap">
          <div class="story-reel-avatar-inner"><img src="./assets/catalog/saree-01-drape.webp" alt="Bengal Looms" class="story-reel-img" loading="lazy"></div>
          <span class="story-reel-badge">★</span>
        </div>
        <span class="story-reel-label">Bengal Looms</span>
      </button>
      <button type="button" class="story-reel-item" data-story-title="Royal Bridal Trousseau Edits" data-story-desc="Heavy Kanjeevaram silks." data-story-craft="Kanchipuram Atelier" data-story-media="./assets/catalog/saree-04-drape.webp" data-story-link="#catalog">
        <div class="story-reel-avatar-wrap">
          <div class="story-reel-avatar-inner"><img src="./assets/catalog/saree-04-drape.webp" alt="Bridal Trousseau" class="story-reel-img" loading="lazy"></div>
          <span class="story-reel-badge">★</span>
        </div>
        <span class="story-reel-label">Bridal Edit</span>
      </button>
    {%- endfor -%}
  </div>
</section>

{% schema %}
{
  "name": "Story Reels",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "Artisan Stories & Chronicles" }
  ],
  "blocks": [
    {
      "type": "story",
      "name": "Artisan Story",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Story Avatar Image" },
        { "type": "text", "id": "short_label", "label": "Avatar Short Label", "default": "Bengal Looms" },
        { "type": "text", "id": "title", "label": "Story Title", "default": "The 160-Hour Pit Loom Ritual" },
        { "type": "textarea", "id": "description", "label": "Story Description" },
        { "type": "text", "id": "craft_origin", "label": "Artisan Guild Origin", "default": "Bengal Heritage Guild" },
        { "type": "url", "id": "link_url", "label": "Shop CTA Link" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Story Reels",
      "blocks": [
        { "type": "story", "settings": { "short_label": "Bengal Looms", "title": "The 160-Hour Pit Loom Ritual" } },
        { "type": "story", "settings": { "short_label": "Bridal Edit", "title": "Royal Bridal Trousseau Edits" } }
      ]
    }
  ]
}
{% endschema %}
"""

with open(os.path.join(sections_dir, "story-reels.liquid"), "w", encoding="utf-8") as f:
    f.write(story_reels_liquid)

# 2.2 sections/shop-the-look.liquid
stl_liquid = """<section class="shop-the-look-section" id="shop-the-look" aria-labelledby="stl-heading-{{ section.id }}">
  <div class="shop-the-look-grid">
    <div class="hotspot-canvas-wrap">
      {%- if section.settings.image != blank -%}
        <img src="{{ section.settings.image | image_url: width: 1200 }}" alt="{{ section.settings.heading | escape }}" class="hotspot-canvas-img" loading="lazy">
      {%- else -%}
        <img src="./assets/catalog/saree-01-drape.webp" alt="Shop The Look" class="hotspot-canvas-img" loading="lazy">
      {%- endif -%}

      <button type="button" class="hotspot-pin" style="top: 48%; left: 42%;" data-x="42" data-y="48" data-item-title="{{ section.settings.item_title_1 | default: 'Surya Mukhi Jamdani Saree' }}" data-item-price="{{ section.settings.item_price_1 | default: '₹34,500' }}" data-variant-id="saree-01" aria-label="Inspect Saree">
        <span class="hotspot-pin-pulse"></span>
        <span class="hotspot-pin-core">•</span>
      </button>

      <button type="button" class="hotspot-pin" style="top: 26%; left: 52%;" data-x="52" data-y="26" data-item-title="{{ section.settings.item_title_2 | default: 'Mulberry Raw Silk Blouse' }}" data-item-price="Complimentary with code ATELIER2026" data-variant-id="saree-01" aria-label="Inspect Blouse">
        <span class="hotspot-pin-pulse"></span>
        <span class="hotspot-pin-core">•</span>
      </button>

      <div class="hotspot-popover" id="hotspot-popover">
        <h4 class="hotspot-popover__title">Surya Mukhi Jamdani Saree</h4>
        <div class="hotspot-popover__price">₹34,500</div>
        <button type="button" class="hotspot-popover__btn">Add Piece To Bag</button>
      </div>
    </div>

    <div class="shop-the-look-content">
      <span class="sub-title">{{ section.settings.sub_heading | default: 'Editorial Curation' }}</span>
      <h2 id="stl-heading-{{ section.id }}" class="section-title" style="font-size: 2.25rem; margin-top: 0.5rem;">
        {{ section.settings.heading | default: 'The Autumn Sun Solstice Look' }}
      </h2>
      <p style="color: var(--color-text-muted-dark); font-size: 0.9375rem; line-height: 1.7; margin: 1.25rem 0 1.75rem 0;">
        {{ section.settings.description | default: 'A masterclass in textural dialogue: the warmth of raw Bengal mulberry silk harmonizes with vibrant peacock teal borders.' }}
      </p>

      <button type="button" class="btn-primary-teal" id="btn-shop-trousseau-bundle" style="width: 100%; padding: 1.15rem; font-size: 0.9375rem;">
        <span>Shop Complete Trousseau Look (1-Click)</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Shop The Look Hotspot",
  "settings": [
    { "type": "image_picker", "id": "image", "label": "Editorial Lookbook Image" },
    { "type": "text", "id": "sub_heading", "label": "Sub-title", "default": "Editorial Curation • Autumn Edition" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "The Autumn Sun Solstice Look" },
    { "type": "textarea", "id": "description", "label": "Description", "default": "A masterclass in textural dialogue." },
    { "type": "text", "id": "item_title_1", "label": "Hotspot 1 Title", "default": "Surya Mukhi Jamdani Saree" },
    { "type": "text", "id": "item_price_1", "label": "Hotspot 1 Price", "default": "₹34,500" },
    { "type": "text", "id": "item_title_2", "label": "Hotspot 2 Title", "default": "Raw Silk Tailored Blouse" }
  ],
  "presets": [
    { "name": "Shop The Look Hotspot" }
  ]
}
{% endschema %}
"""

with open(os.path.join(sections_dir, "shop-the-look.liquid"), "w", encoding="utf-8") as f:
    f.write(stl_liquid)

# 2.3 sections/privilege-club.liquid
privilege_liquid = """<section class="privilege-club-section" id="privilege-club" aria-labelledby="privilege-heading-{{ section.id }}">
  <div class="privilege-card-wrap">
    <div style="display: flex; justify-content: center;">
      <div class="privilege-card-visual" role="img" aria-label="Taaga Privilege Club Gold Card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <span style="font-family: var(--font-serif); font-size: 1.25rem; letter-spacing: 0.15em; color: var(--color-gold-zari); font-weight: 700;">TAAGA</span>
          <div class="privilege-card-chip"></div>
        </div>
        <div>
          <div style="font-family: monospace; font-size: 1rem; letter-spacing: 0.2em; color: rgba(255,255,255,0.7); margin-bottom: 0.5rem;">
            7204 •••• •••• 2026
          </div>
          <div style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-rust-muted);">Cardholder</div>
              <div style="font-size: 0.8125rem; color: #fff; font-weight: 600; letter-spacing: 0.05em;">ESTEEMED PATRON</div>
            </div>
            <div>
              <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-rust-muted);">Privilege Tier</div>
              <div style="font-size: 0.8125rem; color: var(--color-gold-zari); font-weight: 600;">GOLD ATELIER</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <span class="sub-title">{{ section.settings.sub_heading | default: 'Patron Inner Circle' }}</span>
      <h2 id="privilege-heading-{{ section.id }}" class="section-title" style="font-size: 2.25rem; margin-top: 0.5rem;">
        {{ section.settings.heading | default: 'The Taaga Privilege Pass' }}
      </h2>
      <p style="color: var(--color-text-muted-dark); font-size: 0.9375rem; line-height: 1.6; margin: 1rem 0;">
        {{ section.settings.description | default: 'Directly supporting ancestral handloom pit looms. Become an enrolled patron to unlock bespoke atelier services.' }}
      </p>

      <ul class="privilege-perks-list">
        <li class="privilege-perk-item">
          <svg class="privilege-perk-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span><strong>Instant 10% Welcome Credit</strong> applied directly across all handloom sarees (Code: <code>ATELIER2026</code>)</span>
        </li>
        <li class="privilege-perk-item">
          <svg class="privilege-perk-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span><strong>Bespoke Fall, Pico &amp; Blouse Tailoring</strong> complimentary on all orders</span>
        </li>
        <li class="privilege-perk-item">
          <svg class="privilege-perk-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span><strong>48-Hour Early Access</strong> to limited 1-of-1 master weaver archival drops</span>
        </li>
        <li class="privilege-perk-item">
          <svg class="privilege-perk-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span><strong>Private WhatsApp Concierge</strong> with Disha &amp; master draping stylists</span>
        </li>
      </ul>

      <button type="button" class="btn-primary-teal" id="btn-claim-privilege-pass" style="padding: 1rem 2rem; font-size: 0.875rem;">
        <span>Claim 10% Privilege Pass (Instant Unlock)</span>
      </button>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Privilege Club",
  "settings": [
    { "type": "text", "id": "sub_heading", "label": "Sub-title", "default": "Patron Inner Circle" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "The Taaga Privilege Pass" },
    { "type": "textarea", "id": "description", "label": "Description", "default": "Directly supporting ancestral handloom pit looms." }
  ],
  "presets": [
    { "name": "Privilege Club" }
  ]
}
{% endschema %}
"""

with open(os.path.join(sections_dir, "privilege-club.liquid"), "w", encoding="utf-8") as f:
    f.write(privilege_liquid)

# 2.4 sections/press-marquee.liquid
press_liquid = """<section class="press-marquee-section" aria-label="Press &amp; Citations">
  <div class="press-marquee-track">
    <div class="press-item">
      <span class="press-logo-text">VOGUE</span>
      <span class="press-quote">“Resurrecting endangered pit-loom traditions with haute-couture reverence.”</span>
    </div>
    <div class="press-item">
      <span class="press-logo-text">HARPER'S BAZAAR</span>
      <span class="press-quote">“Where ancestral Indian craftsmanship meets contemporary digital flagships.”</span>
    </div>
    <div class="press-item">
      <span class="press-logo-text">ELLE</span>
      <span class="press-quote">“The definitive sanctuary for pure handloom silk connoisseurs.”</span>
    </div>
    <div class="press-item">
      <span class="press-logo-text">ARCHITECTURAL DIGEST</span>
      <span class="press-quote">“Wearable art woven with centuries of generational patience.”</span>
    </div>
    <div class="press-item">
      <span class="press-logo-text">THE HINDU LIFESTYLE</span>
      <span class="press-quote">“A breath of pure oxygen in an era of synthetic fast fashion.”</span>
    </div>
    <div class="press-item">
      <span class="press-logo-text">VOGUE</span>
      <span class="press-quote">“Resurrecting endangered pit-loom traditions with haute-couture reverence.”</span>
    </div>
    <div class="press-item">
      <span class="press-logo-text">HARPER'S BAZAAR</span>
      <span class="press-quote">“Where ancestral Indian craftsmanship meets contemporary digital flagships.”</span>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Press Marquee",
  "settings": [],
  "presets": [
    { "name": "Press Marquee" }
  ]
}
{% endschema %}
"""

with open(os.path.join(sections_dir, "press-marquee.liquid"), "w", encoding="utf-8") as f:
    f.write(press_liquid)

# 2.5 sections/reviews-carousel.liquid
reviews_liquid = """<section class="reviews-section" id="reviews" aria-labelledby="reviews-heading-{{ section.id }}">
  <div class="catalog-container">
    <header class="catalog-header" style="text-align: center; align-items: center;">
      <span class="sub-title">Patron Testimonials</span>
      <h2 id="reviews-heading-{{ section.id }}" class="section-title">Voices From The Sanctuary</h2>
      <p style="max-width: 540px; color: var(--color-text-muted-dark); font-size: 0.9375rem; line-height: 1.6; text-align: center;">
        Over 2,400 heirlooms delivered to patrons across 18 countries. Every parcel is Silk Mark verified and wrapped in organic muslin.
      </p>
    </header>

    <div class="reviews-carousel-track">
      <article class="review-card">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <div class="review-stars">★★★★★</div>
            <span class="review-verified-badge">✓ Silk Mark Verified</span>
          </div>
          <p style="font-size: 0.9375rem; color: #fff; line-height: 1.6; font-style: italic;">
            “The weight and fall of the Surya Mukhi Jamdani is unlike anything you find in commercial stores. The fabric breathes like pure poetry.”
          </p>
        </div>
        <div style="border-top: 1px solid rgba(68, 42, 27, 0.6); padding-top: 0.875rem;">
          <div style="font-weight: 600; color: #fff; font-size: 0.875rem;">Dr. Radhika Sen</div>
          <div style="font-size: 0.75rem; color: var(--color-rust-muted);">South Kensington, London • Surya Mukhi Jamdani</div>
        </div>
      </article>

      <article class="review-card">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <div class="review-stars">★★★★★</div>
            <span class="review-verified-badge">✓ Silk Mark Verified</span>
          </div>
          <p style="font-size: 0.9375rem; color: #fff; line-height: 1.6; font-style: italic;">
            “I wore the Neelambari Kora Silk to my daughter's sangeet. The contrast between midnight blue and pure kadwa zari was breathtaking.”
          </p>
        </div>
        <div style="border-top: 1px solid rgba(68, 42, 27, 0.6); padding-top: 0.875rem;">
          <div style="font-weight: 600; color: #fff; font-size: 0.875rem;">Meenakshi Sundaram</div>
          <div style="font-size: 0.75rem; color: var(--color-rust-muted);">Alwarpet, Chennai • Neelambari Kora Silk</div>
        </div>
      </article>

      <article class="review-card">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <div class="review-stars">★★★★★</div>
            <span class="review-verified-badge">✓ Silk Mark Verified</span>
          </div>
          <p style="font-size: 0.9375rem; color: #fff; line-height: 1.6; font-style: italic;">
            “The Raktambari Kanjeevaram is a true heirloom piece. The Korvai hand-interlocking is pristine, and the stole gift was so thoughtful.”
          </p>
        </div>
        <div style="border-top: 1px solid rgba(68, 42, 27, 0.6); padding-top: 0.875rem;">
          <div style="font-weight: 600; color: #fff; font-size: 0.875rem;">Anupama Singhania</div>
          <div style="font-size: 0.75rem; color: var(--color-rust-muted);">Bandra West, Mumbai • Raktambari Kanjeevaram</div>
        </div>
      </article>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Reviews Carousel",
  "settings": [],
  "presets": [
    { "name": "Reviews Carousel" }
  ]
}
{% endschema %}
"""

with open(os.path.join(sections_dir, "reviews-carousel.liquid"), "w", encoding="utf-8") as f:
    f.write(reviews_liquid)

# 2.6 snippets/cart-drawer.liquid (add gift bar)
cart_snippet_path = os.path.join(base_dir, "snippets", "cart-drawer.liquid")
with open(cart_snippet_path, "r", encoding="utf-8") as f:
    cart_liquid = f.read()

if 'id="cart-gift-bar"' not in cart_liquid:
    cart_gift_snippet = """    <!-- Live Gift Progression Bar -->
    <div class="cart-gift-bar" id="cart-gift-bar">
      <div class="cart-gift-bar__msg" id="cart-gift-msg">
        <span>Add <strong>₹50,000</strong> for a <em>Complimentary Pure Silk Stole</em></span>
        <span>0%</span>
      </div>
      <div class="cart-gift-bar__track">
        <div class="cart-gift-bar__fill" id="cart-gift-fill"></div>
      </div>
    </div>
"""
    cart_liquid = cart_liquid.replace('<div class="cart-drawer__body" id="cart-drawer-items"', cart_gift_snippet + '    <div class="cart-drawer__body" id="cart-drawer-items"')
    with open(cart_snippet_path, "w", encoding="utf-8") as f:
        f.write(cart_liquid)

print("Created all new liquid sections and snippets successfully!")

# =====================================================================
# 3. UPDATE templates/index.json
# =====================================================================
templates_dir = os.path.join(base_dir, "templates")
index_json_path = os.path.join(templates_dir, "index.json")

flagship_index_json = {
  "sections": {
    "hero_scrub": {
      "type": "hero-video-scrub",
      "settings": {
        "frame_count": 180,
        "preload_count": 20,
        "pad_length": 4,
        "pin_duration": "+=300%",
        "scrub_smoothness": 0.5,
        "badge_text": "Artisanal Edition 2026 • Handwoven Heritage",
        "heading": "Taaga by Disha <br><em>The Poetics of Handloom</em>"
      }
    },
    "story_reels": {
      "type": "story-reels",
      "settings": {
        "heading": "Artisan Stories & Chronicles"
      }
    },
    "catalog_grid": {
      "type": "product-grid",
      "settings": {
        "sub_heading": "Curated Autumn Archive",
        "heading": "The Handloom Sanctuary",
        "description": "Woven upon ancestral pit looms across Bengal, Varanasi, and Maheshwar. Each creation honors singular artisan lineage.",
        "products_to_show": 6
      }
    },
    "shop_the_look": {
      "type": "shop-the-look",
      "settings": {
        "sub_heading": "Editorial Curation • Autumn Edition",
        "heading": "The Autumn Sun Solstice Look",
        "description": "A masterclass in textural dialogue."
      }
    },
    "privilege_club": {
      "type": "privilege-club",
      "settings": {
        "sub_heading": "Patron Inner Circle",
        "heading": "The Taaga Privilege Pass"
      }
    },
    "press_marquee": {
      "type": "press-marquee",
      "settings": {}
    },
    "reviews_carousel": {
      "type": "reviews-carousel",
      "settings": {}
    }
  },
  "order": [
    "hero_scrub",
    "story_reels",
    "catalog_grid",
    "shop_the_look",
    "privilege_club",
    "press_marquee",
    "reviews_carousel"
  ]
}

with open(index_json_path, "w", encoding="utf-8") as f:
    json.dump(flagship_index_json, f, indent=2)

print("Updated templates/index.json with all flagship sections!")

# =====================================================================
# 4. REPACK taaga-by-disha-theme.zip
# =====================================================================
zip_path = os.path.join(base_dir, "taaga-by-disha-theme.zip")
theme_folders = ["layout", "sections", "snippets", "templates", "locales", "config", "assets"]

with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for folder in theme_folders:
        folder_path = os.path.join(base_dir, folder)
        if not os.path.exists(folder_path):
            continue
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                if file.endswith(".mp4"):
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, base_dir)
                zipf.write(file_path, arcname)

size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"Repackaged {zip_path} ({size_mb:.2f} MB) successfully!")

