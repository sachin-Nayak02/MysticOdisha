 // Scroll Reveal Animation
 const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach((el) => {
    observer.observe(el);
});

// Like Button Interaction
const likeBtn = document.getElementById('likeBtn');
if(likeBtn){

    likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('liked');
        const icon = likeBtn.querySelector('i');
        icon.classList.toggle('fa-solid');
        icon.classList.toggle('fa-regular');
    });
}

// Share Button Interaction
document.addEventListener("DOMContentLoaded", () => {
document.getElementById('shareBtn').addEventListener('click', () => {
    navigator.share({
        title: '<%= place.name %>',
        text: 'Check out this amazing place in Odisha!',
        url: window.location.href
    }).catch(console.error);
});
});
// document.getElementsByClassName('share').addEventListener('click', () => {
//     navigator.share({
//         title: '<%= place.name %>',
//         text: 'Check out this amazing place in Odisha!',
//         url: window.location.href
//     }).catch(console.error);
// });