export function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (!parallaxElements.length) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    parallaxElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const speed = parseFloat(el.dataset.parallax) || 0.15;

      // Only animate when element is in/near viewport
      if (rect.bottom < -200 || rect.top > windowH + 200) return;

      const center = rect.top + rect.height / 2;
      const offset = (center - windowH / 2) * speed;

      el.style.transform = `translateY(${offset}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial call
  updateParallax();
}
