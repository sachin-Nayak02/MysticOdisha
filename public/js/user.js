// document.addEventListener("DOMContentLoaded", () => {
// });
let userid=document.getElementById("user-id").value
document.addEventListener("DOMContentLoaded", () => {
document.getElementById("profile-input").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            document.getElementById("profile-img").src = reader.result; // Preview image
        };
        reader.readAsDataURL(file);
    }
});
});
async function uploadProfilePicture() {
    const fileInput = document.getElementById("profile-input");
    const file = fileInput.files[0];

    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("userId", userid); 


    try {
        const response = await fetch("/upload-profile", {
            method: "POST",
            body: formData
           
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server Error Response:", errorText);
            alert("Upload failed: " + errorText);
            return;
        }

        const data = await response.json();
        console.log("Server Response:", data);

        if (data.imageUrl) {
            document.getElementById("profile-img").src = data.imageUrl; // Update UI
            alert("Profile picture updated!");
        } else {
            alert("Upload failed!");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("Something went wrong!");
    }
}

// async function uploadProfilePicture() {
//     const fileInput = document.getElementById("profile-input");
//     const file = fileInput.files[0];

//     if (!file) return alert("Please select an image!");

//     const formData = new FormData();
//     const userId = "<%= user2._id.toString() %>";  // Get user ID from EJS

//     console.log("User ID in JS:", userId); // ✅ Debugging user ID in browser

//     formData.append("profilePicture", file);
//     formData.append("userId", userId); // ✅ Send correct user ID

//     try {
//         const response = await fetch("/upload-profile", {
//             method: "POST",
//             body: formData
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("Server Error Response:", errorText);
//             alert("Upload failed: " + errorText);
//             return;
//         }

//         const data = await response.json();
//         console.log("Server Response:", data);

//         if (data.imageUrl) {
//             document.getElementById("profile-img").src = data.imageUrl; // Update UI
//             alert("Profile picture updated!");
//         } else {
//             alert("Upload failed!");
//         }
//     } catch (error) {
//         console.error("Fetch Error:", error);
//         alert("Something went wrong!");
//     }
// }
