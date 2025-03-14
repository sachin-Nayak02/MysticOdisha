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
document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".rating-star");
    const ratingValue = document.getElementById("ratingValue");
    const feedbackForm = document.getElementById("feedbackForm");
    const comments = document.getElementById("comments");
    const thankYouMessage = document.getElementById("thankYouMessage");
    const rateExperienceHeading = document.querySelector(".text-center.mb-4");
    const submitButton = feedbackForm.querySelector("button[type='submit']"); // Select the submit button

    // Create an error message div inside the feedback container
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("text-danger", "text-center", "mt-3");
    feedbackForm.appendChild(errorMessage);

    // Initially disable the submit button since no rating is selected
    submitButton.disabled = true;

    stars.forEach(star => {
        star.addEventListener("click", () => {
            const value = parseInt(star.getAttribute("data-value"));
            ratingValue.value = value;

            stars.forEach((s, index) => {
                s.classList.toggle("active", index < value);
            });

            // Enable the submit button when a rating is selected
            submitButton.disabled = false;
        });
    });

    feedbackForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const rating = parseInt(ratingValue.value) || 0; // Default to 0 if no value
        const feedbackText = comments.value.trim();

        // Hide messages initially
        errorMessage.style.display = "none";
        thankYouMessage.style.display = "none";

        if (rating === 0) {
            errorMessage.textContent = "❌ Rating cannot be 0 stars. Please provide a valid rating.";
            errorMessage.style.display = "block";
            submitButton.disabled = true; // Disable button again if rating is reset or invalid
            return;
        }

        if (rating <= 3 && feedbackText === "") {
            errorMessage.textContent = "⚠️ Feedback comments are required for ratings of 3 stars or below.";
            errorMessage.style.display = "block";
            return;
        }

        const formData = { rating, comments: feedbackText };

        try {
            const response = await fetch("/submit-feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                feedbackForm.style.display = "none";
                rateExperienceHeading.style.display = "none";
                thankYouMessage.style.display = "block";
            } else {
                errorMessage.textContent = data.error;
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            errorMessage.textContent = "Something went wrong. Please try again.";
            errorMessage.style.display = "block";
        }
    });
});
