function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.querySelector(".content").style.marginLeft = "250px";
  }
  
  // Close the sidenav
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.querySelector(".content").style.marginLeft = "0";
  }


  let darkbtn=document.querySelector(".dark-light");
  darkbtn.addEventListener("click",()=>{
    let body=document.body;
    body.classList.toggle("dark-mood")
    
    let h5=document.querySelector(".dark-light h5");
    const originalText = "Dark Mood";
    const newText = "Light Mood";
    h5.innerText = h5.innerText === originalText ? newText : originalText;
    
    let icon=document.querySelector("#icon-mood");
    if (icon.classList.contains('fa-moon')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }

  });
  // --------------------------video==================-------------------------------------
    const video = document.querySelector('#video-id');
    const muteBtn = document.querySelector('#mute-btn i');


    // Mute/Unmute functionality
    muteBtn.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        muteBtn.classList.remove('fa-volume-xmark')
        muteBtn.classList.add('fa-volume-high')
      } else {
        video.muted = true;
        muteBtn.classList.remove('fa-volume-high')
        muteBtn.classList.add('fa-volume-xmark')
      }
    });
  // --------------------------crausal==================-------------------------------------
  const cardContainer = document.getElementById('cardContainer');
      const cards = document.querySelectorAll('.card');
      let currentIndex = 0;
      
      function updateSlider() {
        cards.forEach((card, index) => {
          if (index === currentIndex) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        });
      
        // Adjust the translate3d value to center the active image
        const translateX = -currentIndex * (cardContainer.offsetWidth / cards.length);
        cardContainer.style.transform = `translate3d(${translateX}px, 0, 0)`;
      }
      
      // Event listeners for buttons
      document.getElementById('prevBtn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateSlider();
      });
      
      document.getElementById('nextBtn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
      });
      
      // Initialize the slider
      updateSlider();
//-----------------------------------nearBy ==============================
const searchButton = document.querySelector('.near-search');
const radioButtons = document.querySelectorAll('input[name="nearBy"]');

searchButton.addEventListener('click', () => {
  // Find the selected radio button
  const selectedRadio = Array.from(radioButtons).find(radio => radio.checked);

  if (!selectedRadio) {
    alert('Please select a place to search!');
    return;
  }

  // Redirect to Google Maps with the selected query
  const searchQuery = encodeURIComponent(selectedRadio.value);
  const mapsUrl = `https://www.google.com/maps/search/${searchQuery}`;
  window.open(mapsUrl, '_blank'); // Open in a new tab
});
  
   