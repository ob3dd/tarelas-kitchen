let cart = [];

export function initCart() {
  // Load from localStorage
  const saved = localStorage.getItem('tarela-cart');
  if (saved) {
    try { cart = JSON.parse(saved); } catch { cart = []; }
  }

  const overlay = document.getElementById('cart-overlay');
  const toggleBtn = document.getElementById('cart-toggle');
  const closeBtn = document.getElementById('cart-close');

  toggleBtn.addEventListener('click', () => openCart());
  closeBtn.addEventListener('click', () => closeCart());
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCart();
  });

  // Add to cart buttons — menu cards
  document.querySelectorAll('.menu__card-add').forEach(btn => {
    btn.addEventListener('click', () => {
      addItem(btn.dataset.name, parseFloat(btn.dataset.price), btn.dataset.image);
    });
  });

  // Add to cart buttons — featured cards
  document.querySelectorAll('.card-btn[data-name]').forEach(btn => {
    btn.addEventListener('click', () => {
      addItem(btn.dataset.name, parseFloat(btn.dataset.price), btn.dataset.image);
    });
  });

  // Checkout button
  document.getElementById('checkout-btn').addEventListener('click', () => {
    closeCart();
    openCheckout();
  });

  updateUI();
}

function addItem(name, price, image) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }
  save();
  updateUI();
  openCart();
}

function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  save();
  updateUI();
}

function updateQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeItem(name);
    return;
  }
  save();
  updateUI();
}

function save() {
  localStorage.setItem('tarela-cart', JSON.stringify(cart));
}

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateUI() {
  const badge = document.getElementById('cart-badge');
  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');
  const subtotalEl = document.getElementById('cart-subtotal');

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  // Badge
  badge.textContent = totalQty;
  badge.classList.toggle('has-items', totalQty > 0);

  // Empty state
  if (cart.length === 0) {
    emptyEl.style.display = '';
    footerEl.style.display = 'none';
    // Remove item elements but keep empty
    itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());
    return;
  }

  emptyEl.style.display = 'none';
  footerEl.style.display = '';

  // Render items
  itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());

  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item__image"><img src="${item.image}" alt="${item.name}" /></div>
      <div class="cart-item__details">
        <p class="cart-item__name">${item.name}</p>
        <p class="cart-item__price">$${item.price.toFixed(2)}</p>
        <div class="cart-item__controls">
          <button class="cart-item__qty-btn" data-action="decrease" data-name="${item.name}">-</button>
          <span class="cart-item__qty">${item.qty}</span>
          <button class="cart-item__qty-btn" data-action="increase" data-name="${item.name}">+</button>
        </div>
      </div>
      <button class="cart-item__remove" data-name="${item.name}" aria-label="Remove">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;
    itemsEl.appendChild(el);
  });

  // Event delegation for qty buttons
  itemsEl.querySelectorAll('.cart-item__qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const delta = btn.dataset.action === 'increase' ? 1 : -1;
      updateQty(btn.dataset.name, delta);
    });
  });

  itemsEl.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', () => removeItem(btn.dataset.name));
  });

  subtotalEl.textContent = `$${getTotal().toFixed(2)}`;
}

function openCart() {
  document.getElementById('cart-overlay').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('is-open');
  document.body.style.overflow = '';
}

function openCheckout() {
  const overlay = document.getElementById('checkout-overlay');
  const summary = document.getElementById('checkout-summary');

  // Build summary
  let html = '';
  cart.forEach(item => {
    html += `<div class="checkout__summary-item"><span>${item.name} x${item.qty}</span><span>$${(item.price * item.qty).toFixed(2)}</span></div>`;
  });
  html += `<div class="checkout__summary-total"><span>Total</span><span>$${getTotal().toFixed(2)}</span></div>`;
  summary.innerHTML = html;

  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

// Expose for checkout module
export function getCart() { return cart; }
export function getCartTotal() { return getTotal(); }
export function clearCart() {
  cart = [];
  save();
  updateUI();
}
