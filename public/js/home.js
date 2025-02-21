function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.querySelector(".content").style.marginLeft = "250px";
}

// Close the sidenav
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.querySelector(".content").style.marginLeft = "0";
}

// ===================================================dark mode======================================
document.addEventListener("DOMContentLoaded", () => {
  let darkbtn = document.querySelector(".dark-light");

  darkbtn.addEventListener("click", () => {
    let body = document.body;
    body.classList.toggle("dark-mood");

    let h5 = document.querySelector(".dark-light h5");
    const originalText = "Dark Mode";
    const newText = "Light Mode";
    h5.innerText = h5.innerText === originalText ? newText : originalText;

    let dbText = document.querySelectorAll(".dark-mood-text");
    let sectionSlide = document.querySelectorAll(".dark-bg");
    let icon = document.querySelector("#icon-mood");
    if (icon.classList.contains("fa-moon")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      for (let i = 0; i < dbText.length; i++) {
        dbText[i].style.color = "white";
      }
      for (let i = 0; i < sectionSlide.length; i++) {
        sectionSlide[i].style.backgroundColor = "black";
      }
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      for (let i = 0; i < dbText.length; i++) {
        dbText[i].style.color = "black";
      }
      for (let i = 0; i < sectionSlide.length; i++) {
        sectionSlide[i].style.backgroundColor = "white";
      }
    }
  });
});

// --------------------------video==================-------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector("#video-id");
  const muteBtn = document.querySelector("#mute-btn i");

  if (video && muteBtn) {
    muteBtn.addEventListener("click", () => {
      if (video.muted) {
        video.muted = false;
        muteBtn.classList.remove("fa-volume-xmark");
        muteBtn.classList.add("fa-volume-high");
      } else {
        video.muted = true;
        muteBtn.classList.remove("fa-volume-high");
        muteBtn.classList.add("fa-volume-xmark");
      }
    });
  } else {
    // console.error('Video or mute button not found in the DOM.');
  }
});

// --------------------------crausal==================-------------------------------------
var TrandingSlider = new Swiper(".place-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: "#nextBtn",
    prevEl: "#prevBtn",
  },
});

//-----------------------------------nearBy ==============================
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".near-search");
  const radioButtons = document.querySelectorAll('input[name="nearBy"]');

  if (searchButton && radioButtons) {
    searchButton.addEventListener("click", () => {
      // Find the selected radio button
      const selectedRadio = Array.from(radioButtons).find(
        (radio) => radio.checked
      );

      if (!selectedRadio) {
        alert("Please select a place to search!");
        return;
      }

      // Redirect to Google Maps with the selected query
      const searchQuery = encodeURIComponent(selectedRadio.value);
      const mapsUrl = `https://www.google.com/maps/search/${searchQuery}`;
      window.open(mapsUrl, "_blank"); // Open in a new tab
    });
  }
});

//==========================================destination_dist.ejs==================================
document.addEventListener("DOMContentLoaded", () => {
  const searchHeartSpan = document.querySelector(".heart-span");
  const searchHeart = document.querySelector(".heart");
  // searchHeart.style.color="red"

  if (searchHeart && searchHeartSpan) {
    searchHeartSpan.addEventListener("click", () => {
      if (searchHeart.classList.contains("fa-regular")) {
        searchHeart.classList.remove("fa-regular");
        searchHeart.classList.add("fa-solid");
      } else {
        searchHeart.classList.remove("fa-solid");
        searchHeart.classList.add("fa-regular");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");

  if (next && prev) {
    next.addEventListener("click", function () {
      let items = document.querySelectorAll(".item1");
      document.querySelector(".slide1").appendChild(items[0]);
    });

    prev.addEventListener("click", function () {
      let items = document.querySelectorAll(".item1");
      document.querySelector(".slide1").prepend(items[items.length - 1]); // here the length of items = 6
    });
  }
});
