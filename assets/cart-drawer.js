/**
 * TAAGA BY DISHA - AJAX SLIDE-OUT CART DRAWER CONTROLLER
 * 
 * Intercepts add-to-cart actions, communicates with Shopify AJAX API (/cart/add.js, /cart.js, /cart/change.js),
 * and dynamically renders line items without page refreshes.
 * Includes local mock fallback for previewing in visual editors (Cursor / VS Code Live Server).
 */

class TaagaCartDrawer {
  constructor() {
    this.drawer = document.getElementById('cart-drawer');
    this.overlay = document.getElementById('cart-drawer-overlay');
    this.trigger = document.getElementById('cart-drawer-trigger');
    this.closeBtn = document.getElementById('cart-drawer-close');
    this.itemsContainer = document.getElementById('cart-drawer-items');
    this.emptyState = document.getElementById('cart-empty-state');
    this.footer = document.getElementById('cart-drawer-footer');
    this.subtotalEl = document.getElementById('cart-drawer-subtotal');
    this.countEl = document.getElementById('cart-drawer-count');
    this.headerBadge = document.getElementById('cart-icon-bubble-count');
    this.shopBtn = document.getElementById('cart-drawer-shop-btn');

    this.isOpen = false;
    this.isShopifyLive = typeof window.Shopify !== 'undefined' && !window.location.protocol.startsWith('file');

    // Local Mock State for visual editors / static prototypes
    this.mockCart = {
      item_count: 0,
      total_price: 0,
      currency: 'INR',
      items: []
    };

    this.init();
  }

  init() {
    if (!this.drawer) return;

    // Event Listeners for Open / Close
    if (this.trigger) {
      this.trigger.addEventListener('click', () => this.open());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }
    if (this.shopBtn) {
      this.shopBtn.addEventListener('click', () => {
        this.close();
        const catalog = document.getElementById('catalog');
        if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Escape Key Support & Focus Trap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Intercept Quick Add Buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-quick-add]');
      if (btn) {
        e.preventDefault();
        this.handleQuickAdd(btn);
      }
    });

    // Intercept Standard Shopify Product Forms
    document.addEventListener('submit', (e) => {
      const form = e.target.closest('form[action*="/cart/add"]');
      if (form) {
        e.preventDefault();
        this.handleFormSubmit(form);
      }
    });

    // Fetch initial cart data
    this.fetchCart();
  }

  open() {
    this.isOpen = true;
    this.drawer.classList.add('is-open');
    this.drawer.setAttribute('aria-hidden', 'false');
    if (this.overlay) {
      this.overlay.classList.add('is-active');
      this.overlay.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';

    // Trap focus to close button
    if (this.closeBtn) {
      setTimeout(() => this.closeBtn.focus(), 100);
    }
  }

  close() {
    this.isOpen = false;
    this.drawer.classList.remove('is-open');
    this.drawer.setAttribute('aria-hidden', 'true');
    if (this.overlay) {
      this.overlay.classList.remove('is-active');
      this.overlay.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';

    if (this.trigger) {
      this.trigger.focus();
    }
  }

  /**
   * Formats numbers to currency (Default INR / Rupee or active Shopify currency)
   */
  formatMoney(cents) {
    const currency = (window.Shopify && window.Shopify.currency && window.Shopify.currency.active) || 'INR';
    try {
      return (cents / 100).toLocaleString('en-IN', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0
      });
    } catch (e) {
      return '₹' + Math.round(cents / 100).toLocaleString('en-IN');
    }
  }

  /**
   * Fetches latest cart object from Shopify AJAX API or mock state
   */
  async fetchCart() {
    if (this.isShopifyLive) {
      try {
        const res = await fetch('/cart.js');
        if (res.ok) {
          const cart = await res.json();
          this.renderCart(cart);
          return;
        }
      } catch (e) {
        console.warn('[TaagaCart] Shopify cart.js request failed, falling back to local state:', e);
      }
    }
    // Static / preview mode fallback
    this.renderCart(this.mockCart);
  }

  /**
   * Handles standard Shopify product <form action="/cart/add"> submissions
   */
  async handleFormSubmit(form) {
    const submitBtn = form.querySelector('[type="submit"]') || form.querySelector('button');
    if (submitBtn) submitBtn.classList.add('is-loading');

    const formData = new FormData(form);

    if (this.isShopifyLive) {
      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        if (response.ok) {
          await this.fetchCart();
          this.open();
        } else {
          const errData = await response.json().catch(() => ({}));
          console.error('[TaagaCart] Add item failed:', errData);
          alert(errData.description || 'Could not add item to bag. Please try again.');
        }
      } catch (err) {
        console.error('[TaagaCart] Network error adding item:', err);
      } finally {
        if (submitBtn) submitBtn.classList.remove('is-loading');
      }
      return;
    }

    // Mock Mode Execution for Visual Editor / Standalone Preview
    const variantId = formData.get('id') || ('sample-' + Date.now());
    const quantity = parseInt(formData.get('quantity'), 10) || 1;
    const title = form.querySelector('[name="properties[Title]"]')?.value ||
                  form.dataset.productTitle ||
                  form.closest('.product-card')?.querySelector('.product-card__title')?.textContent?.trim() ||
                  'Artisanal Handloom Saree';
    const price = parseInt(form.dataset.productPrice, 10) || 3450000;
    const image = form.dataset.productImage || '';
    const craft = form.querySelector('[name="properties[Craft]"]')?.value || 'Handloom Jamdani';

    const existing = this.mockCart.items.find(item => item.id === variantId);
    if (existing) {
      existing.quantity += quantity;
      existing.line_price = existing.quantity * existing.price;
    } else {
      this.mockCart.items.push({
        id: variantId,
        key: 'key-' + variantId,
        title: title,
        price: price,
        line_price: price * quantity,
        quantity: quantity,
        featured_image: { url: image },
        properties: { Craft: craft }
      });
    }

    this.recalculateMockCart();
    setTimeout(() => {
      if (submitBtn) submitBtn.classList.remove('is-loading');
      this.renderCart(this.mockCart);
      this.open();
    }, 250);
  }

  /**
   * Handles Quick Add button click
   */
  async handleQuickAdd(button) {
    const variantId = button.dataset.variantId || 'sample-saree-1';
    const title = button.dataset.title || 'Artisanal Handloom Saree';
    const price = parseInt(button.dataset.price, 10) || 2850000; // in cents
    const image = button.dataset.image || '';
    const craft = button.dataset.craft || 'Handloom Jamdani';

    button.classList.add('is-loading');

    if (this.isShopifyLive) {
      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: variantId,
            quantity: 1
          })
        });

        if (response.ok) {
          await this.fetchCart();
          this.open();
        } else {
          console.error('[TaagaCart] Add item failed:', await response.text());
        }
      } catch (err) {
        console.error('[TaagaCart] Network error adding item:', err);
      } finally {
        button.classList.remove('is-loading');
      }
      return;
    }

    // Mock Mode Execution for Visual Editor / Standalone Preview
    const existing = this.mockCart.items.find(item => item.id === variantId);
    if (existing) {
      existing.quantity += 1;
      existing.line_price = existing.quantity * existing.price;
    } else {
      this.mockCart.items.push({
        id: variantId,
        key: 'key-' + variantId,
        title: title,
        price: price,
        line_price: price,
        quantity: 1,
        featured_image: { url: image },
        properties: { Craft: craft }
      });
    }

    this.recalculateMockCart();
    setTimeout(() => {
      button.classList.remove('is-loading');
      this.renderCart(this.mockCart);
      this.open();
    }, 250);
  }

  recalculateMockCart() {
    let count = 0;
    let total = 0;
    this.mockCart.items.forEach(item => {
      count += item.quantity;
      total += item.price * item.quantity;
    });
    this.mockCart.item_count = count;
    this.mockCart.total_price = total;
  }

  /**
   * Updates line item quantity
   */
  async updateQuantity(lineKey, newQty) {
    if (this.isShopifyLive) {
      try {
        const response = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: lineKey,
            quantity: newQty
          })
        });
        if (response.ok) {
          const updatedCart = await response.json();
          this.renderCart(updatedCart);
        }
      } catch (err) {
        console.error('[TaagaCart] Error updating quantity:', err);
      }
      return;
    }

    // Mock Mode
    const itemIndex = this.mockCart.items.findIndex(item => item.id === lineKey || item.key === lineKey);
    if (itemIndex > -1) {
      if (newQty <= 0) {
        this.mockCart.items.splice(itemIndex, 1);
      } else {
        this.mockCart.items[itemIndex].quantity = newQty;
        this.mockCart.items[itemIndex].line_price = newQty * this.mockCart.items[itemIndex].price;
      }
      this.recalculateMockCart();
      this.renderCart(this.mockCart);
    }
  }

  /**
   * Renders the cart HTML
   */
  renderCart(cart) {
    if (!this.itemsContainer) return;

    // Update Counts & Badges
    const count = cart.item_count || 0;
    if (this.countEl) this.countEl.textContent = count;
    if (this.headerBadge) this.headerBadge.textContent = count;
    if (this.subtotalEl) this.subtotalEl.textContent = this.formatMoney(cart.total_price || 0);

    let itemsList = this.itemsContainer.querySelector('.cart-drawer__items-list');
    if (!itemsList) {
      itemsList = document.createElement('div');
      itemsList.className = 'cart-drawer__items-list';
      if (this.emptyState) {
        this.itemsContainer.insertBefore(itemsList, this.emptyState);
      } else {
        this.itemsContainer.appendChild(itemsList);
      }
    }

    if (count === 0) {
      if (this.emptyState) this.emptyState.style.display = 'block';
      if (this.footer) this.footer.style.display = 'none';
      itemsList.innerHTML = '';
      return;
    }

    if (this.emptyState) this.emptyState.style.display = 'none';
    if (this.footer) this.footer.style.display = 'flex';

    // Build Items Markup
    let html = '';
    cart.items.forEach((item) => {
      const imgUrl = (item.featured_image && (item.featured_image.url || item.featured_image)) || '';
      const craft = (item.properties && item.properties.Craft) || 'Artisanal Handloom';

      html += `
        <div class="cart-item" data-line-key="${item.key || item.id}">
          <div class="cart-item__image-wrap">
            ${imgUrl ? `<img src="${imgUrl}" alt="${item.title}" class="cart-item__image" loading="lazy">` : `<div style="background: var(--color-rust-deepest); width: 100%; height: 100%;"></div>`}
          </div>
          <div class="cart-item__meta">
            <span class="cart-item__craft">${craft}</span>
            <h3 class="cart-item__title">${item.title}</h3>
            <span class="cart-item__price">${this.formatMoney(item.price)}</span>
            <div class="cart-item__qty-control">
              <button type="button" class="cart-item__qty-btn" data-action="decrement" aria-label="Decrease quantity">-</button>
              <span class="cart-item__qty-value">${item.quantity}</span>
              <button type="button" class="cart-item__qty-btn" data-action="increment" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button type="button" class="cart-item__remove-btn" data-action="remove" aria-label="Remove item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `;
    });

    itemsList.innerHTML = html;

    // Attach Listeners to Quantity and Remove buttons
    itemsList.querySelectorAll('.cart-item').forEach(itemEl => {
      const lineKey = itemEl.dataset.lineKey;
      const currentQty = parseInt(itemEl.querySelector('.cart-item__qty-value').textContent, 10);

      itemEl.querySelector('[data-action="decrement"]').addEventListener('click', () => {
        this.updateQuantity(lineKey, currentQty - 1);
      });
      itemEl.querySelector('[data-action="increment"]').addEventListener('click', () => {
        this.updateQuantity(lineKey, currentQty + 1);
      });
      itemEl.querySelector('[data-action="remove"]').addEventListener('click', () => {
        this.updateQuantity(lineKey, 0);
      });
    });
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.__taagaCartDrawer = new TaagaCartDrawer();
});
