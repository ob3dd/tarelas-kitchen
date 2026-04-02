import { getCart, getCartTotal, clearCart } from './cart.js';

export function initCheckout() {
  const overlay = document.getElementById('checkout-overlay');
  const closeBtn = document.getElementById('checkout-close');
  const form = document.getElementById('checkout-form');

  closeBtn.addEventListener('click', () => closeCheckout());
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCheckout();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate required fields
    const fields = form.querySelectorAll('[required]');
    let valid = true;

    fields.forEach(field => {
      const parent = field.closest('.checkout__field');
      if (!field.value.trim()) {
        parent.classList.add('has-error');
        valid = false;
      } else {
        parent.classList.remove('has-error');
      }
    });

    if (!valid) return;

    // Build WhatsApp message
    const name = document.getElementById('checkout-name').value;
    const phone = document.getElementById('checkout-phone').value;
    const email = document.getElementById('checkout-email').value;
    const address = document.getElementById('checkout-address').value;
    const notes = document.getElementById('checkout-notes').value;

    const cart = getCart();
    const total = getCartTotal();

    let message = `*New Order from Tarela's Kitchen Website*\n\n`;
    message += `*Customer:* ${name}\n`;
    message += `*Phone:* ${phone}\n`;
    if (email) message += `*Email:* ${email}\n`;
    message += `*Address:* ${address}\n`;
    if (notes) message += `*Notes:* ${notes}\n`;
    message += `\n*Order Details:*\n`;

    cart.forEach(item => {
      message += `- ${item.name} x${item.qty} — $${(item.price * item.qty).toFixed(2)}\n`;
    });

    message += `\n*Total: $${total.toFixed(2)}*`;

    // REPLACE: Update with actual WhatsApp number
    const whatsappNumber = '11234567890';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Show confirmation
    form.style.display = 'none';
    document.getElementById('checkout-summary').style.display = 'none';
    document.getElementById('checkout-confirmation').classList.add('is-visible');

    // Clear cart
    clearCart();
  });
}

function closeCheckout() {
  const overlay = document.getElementById('checkout-overlay');
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';

  // Reset form state after animation
  setTimeout(() => {
    document.getElementById('checkout-form').style.display = '';
    document.getElementById('checkout-form').reset();
    document.getElementById('checkout-summary').style.display = '';
    document.getElementById('checkout-confirmation').classList.remove('is-visible');
    document.querySelectorAll('.checkout__field').forEach(f => f.classList.remove('has-error'));
  }, 300);
}
