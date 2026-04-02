export function initAccordion() {
  const items = document.querySelectorAll('.faq__item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all
      items.forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.faq__answer').style.maxHeight = null;
      });

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}
