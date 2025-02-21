// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('contactForm');
//     const successMessage = document.getElementById('successMessage');

//     // Floating label functionality
//     document.querySelectorAll('.floating-label input, .floating-label textarea').forEach(input => {
//         input.addEventListener('input', () => {
//             if (input.value.trim() !== '') {
//                 input.parentNode.querySelector('label').classList.add('active');
//             } else {
//                 input.parentNode.querySelector('label').classList.remove('active');
//             }
//         });
//     });

//     // Form submission handler
//     form.addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         // Simulate form submission
//         const formData = new FormData(form);
        
//         // Add loading state
//         const submitBtn = form.querySelector('.submit-btn');
//         submitBtn.innerHTML = 'Sending...';
//         submitBtn.disabled = true;

//         // Simulate API call
//         setTimeout(() => {
//             // Show success message
//             successMessage.classList.add('show');
            
//             // Reset form and button
//             form.reset();
//             submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
//             submitBtn.disabled = false;
            
//             // Remove success message after 3 seconds
//             setTimeout(() => {
//                 successMessage.classList.remove('show');
//             }, 3000);
//         }, 1500);
//     });

//     // Add animation on scroll
//     const observerOptions = {
//         threshold: 0.1
//     };

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.style.opacity = 1;
//                 entry.target.style.transform = 'translateY(0)';
//             }
//         });
//     }, observerOptions);

//     // Observe elements with animation classes
//     document.querySelectorAll('.contact-info, .contact-form').forEach(el => {
//         el.style.opacity = 0;
//         el.style.transform = 'translateY(20px)';
//         el.style.transition = 'all 0.6s ease-out';
//         observer.observe(el);
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Floating label functionality
    document.querySelectorAll('.floating-label input, .floating-label textarea').forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.parentNode.querySelector('label').classList.add('active');
            } else {
                input.parentNode.querySelector('label').classList.remove('active');
            }
        });
    });

    // Form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Add loading state
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Send form data to the backend
            const response = await fetch('http://localhost:3030/mysticodisha/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Show success message
                successMessage.classList.add('show');
                form.reset();

                // Reset button state
                submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;

                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 3000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the message. Please try again.');
            submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
        }
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.contact-info, .contact-form').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});