// async function sendOTP() {
//     const email = document.getElementById("email").value;
//     const button = document.getElementById("send-otp-btn");
//     const loader = document.getElementById("loader");

//     if (!email) {
//         alert("Please enter your email!");
//         return;
//     }

//     // Disable button and show loader
//     button.disabled = true;
//     loader.style.display = "inline-block";

//     try {
//         const response = await fetch("/auth/forgot-password", {  // Use "/auth/forgot-password"
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email })
//         });

//         const data = await response.json();

//         if (data.success) {
//             alert("OTP sent successfully!");
//         } else {
//             alert("Failed to send OTP.");
//         }
//     } catch (error) {
//         alert("Something went wrong!");
//     } finally {
//         // Enable button and hide loader
//         button.disabled = false;
//         loader.style.display = "none";
//     }
// }
