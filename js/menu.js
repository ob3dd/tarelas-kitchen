export function initMenu() {
  const tabs = document.querySelectorAll('.menu__tab');
  const cards = document.querySelectorAll('.menu__card');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;

      // Update active tab
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      // Filter cards
      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('is-hidden');
          // Re-trigger animation
          card.classList.remove('is-visible');
          requestAnimationFrame(() => {
            card.classList.add('is-visible');
          });
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}
