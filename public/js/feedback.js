// document.addEventListener("DOMContentLoaded", function () {
//     const stars = document.querySelectorAll(".rating-star");
//     let selectedRating = 0;

//     stars.forEach(star => {
//         star.addEventListener("click", function () {
//             selectedRating = this.getAttribute("data-value");

//             // Highlight selected stars
//             stars.forEach(s => s.classList.remove("selected"));
//             for (let i = 0; i < selectedRating; i++) {
//                 stars[i].classList.add("selected");
//             }
//         });
//     });

//     // Submit feedback
//     document.addEventListener("DOMContentLoaded", () => {
//     document.querySelector(".submit-btn").addEventListener("click", function () {
//         let feedbackText = document.querySelector(".feedback-box").value;
//         if (selectedRating === 0) {
//             alert("Please select a rating!");
//         } else {
//             alert("Thank you for your feedback! Rating: ${selectedRating} Stars");
//         }
//     });
// });
// });

// Star rating functionality
const stars = document.querySelectorAll('.rating-star');
const ratingValue = document.getElementById('ratingValue');

stars.forEach(star => {
    star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'));
        ratingValue.value = value;
        
        stars.forEach((s, index) => {
            s.classList.toggle('active', index < value);
        });
    });
});

// Form submission handling
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Simple validation
    if (!this.checkValidity()) {
        return;
    }

    // Get form values
    const formData = {
        rating: ratingValue.value,
        comments: document.getElementById('comments').value
    };
    
    let total=0;
    let pepel=0;
    total+=formData.rating;
    ++pepel;
    let rating=total/pepel;
    console.log(rating);


    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);

    // Show thank you message and reset form
    this.reset();
    stars.forEach(star => star.classList.remove('active'));
    ratingValue.value = '';
    
    document.getElementById('feedbackForm').style.display = 'none';
    document.getElementById('thankYouMessage').style.display = 'block';
});
