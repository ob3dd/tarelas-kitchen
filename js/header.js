export function initHeader() {
  const header = document.getElementById('header');
  const toggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = mobileNav.querySelectorAll('a');

  // Sticky header shrink on scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 50);
  }, { passive: true });

  // Mobile menu toggle
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('is-active');
    mobileNav.classList.toggle('is-open');
    document.body.style.overflow = mobileNav.classList.contains('is-open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('is-active');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Close on overlay click
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
      toggle.classList.remove('is-active');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = header.querySelectorAll('.header__nav a');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { passive: true });
}
