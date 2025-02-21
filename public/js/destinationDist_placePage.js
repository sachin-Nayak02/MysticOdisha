 // Function to copy the URL to the clipboard
 function copyToClipboard() {
    // Get the current page URL
    const url = window.location.href;

    // Use the Clipboard API to copy the URL
    navigator.clipboard.writeText(url).then(() => {
        // Show the confirmation message
        const copyMessage = document.getElementById('copyMessage');
        copyMessage.style.display = 'block';

        // Hide the message after 2 seconds
        setTimeout(() => {
            copyMessage.style.display = 'none';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Add an event listener to the share button
let shareButtons=document.getElementsByClassName('shareBtn');

for (let i = 0; i < shareButtons.length; i++) {
    shareButtons[i].addEventListener('click', copyToClipboard);
  }