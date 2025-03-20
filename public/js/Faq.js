// const toggles = document.querySelectorAll('.faq-toggle')

// toggles.forEach(toggle => {
//     toggle.addEventListener('click', () => {
//         toggle.parentNode.classList.toggle('active')
//     })
// })

const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});