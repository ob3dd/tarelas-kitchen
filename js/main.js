import { initTheme } from './theme.js';
import { initHeader } from './header.js';
import { initAnimations } from './animations.js';
import { initCounters } from './counter.js';
import { initMenu } from './menu.js';
import { initCart } from './cart.js';
import { initCheckout } from './checkout.js';
import { initAccordion } from './accordion.js';
import { initNewsletter } from './newsletter.js';
import { initSlideshow } from './slideshow.js';
import { initParallax } from './parallax.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initAnimations();
  initCounters();
  initMenu();
  initCart();
  initCheckout();
  initAccordion();
  initNewsletter();
  initSlideshow();
  initParallax();
});
