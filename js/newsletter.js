export function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const success = document.getElementById('newsletter-success');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    success.classList.add('is-visible');
  });
}
