
//  ====== Header section start ====== 

// ----------------- SIDEBAR TOGGLE -----------------
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
  updateNavbarVisibility();
}

function openKitchenSidebar() {
  document.getElementById("kitchenSidebar").classList.add("active");
  updateNavbarVisibility();
}

function closeKitchenSidebar() {
  document.getElementById("kitchenSidebar").classList.remove("active");
  updateNavbarVisibility();
}

function openBathroomSidebar() {
  document.getElementById("bathroomSidebar").classList.add("active");
  updateNavbarVisibility();
}

function closeBathroomSidebar() {
  document.getElementById("bathroomSidebar").classList.remove("active");
  updateNavbarVisibility();
}

// ----------------- SEARCH TOGGLE -----------------
function toggleSearch() {
  const searchBar = document.getElementById("searchBar");
  searchBar.classList.toggle("active");
  updateNavbarVisibility();
}

// ----------------- BATHROOM CATEGORY TOGGLE -----------------
function toggleBathroomCategory(event, categoryId) {
  event.preventDefault();

  // Desktop (hover से control होगा, JS से नहीं)
  if (window.innerWidth > 1024) return;

  // Mobile/Tablet पर click से toggle होगा
  const category = document.getElementById(categoryId);
  const parentCategory = event.target.closest('.bathroom-sidebar-category');

  parentCategory.classList.toggle('active');
  category.classList.toggle("active");

  updateNavbarVisibility();
}

// ----------------- NAVBAR VISIBILITY CONTROL -----------------
function updateNavbarVisibility() {
  if (window.innerWidth > 1024) return; // Desktop पर कोई change नहीं होगा

  const sidebar = document.getElementById("sidebar");
  const kitchenSidebar = document.getElementById("kitchenSidebar");
  const bathroomSidebar = document.getElementById("bathroomSidebar");
  const searchBar = document.getElementById("searchBar");

  const navbar = document.querySelector(".navbar");
  const icons = document.querySelector(".icons");
  const toggleBtn = document.querySelector(".mobile-toggle");

  const isAnythingOpen =
    (sidebar && sidebar.classList.contains("active")) ||
    (kitchenSidebar && kitchenSidebar.classList.contains("active")) ||
    (bathroomSidebar && bathroomSidebar.classList.contains("active")) ||
    (searchBar && searchBar.classList.contains("active"));

  if (isAnythingOpen) {
    if (navbar) navbar.style.display = "none";
    if (icons) icons.style.display = "none";
    if (toggleBtn) toggleBtn.style.display = "none";
  } else {
    if (navbar) navbar.style.display = "flex";
    if (icons) icons.style.display = "flex";
    if (toggleBtn) toggleBtn.style.display = "block";
  }
}

// ----------------- DESKTOP BATHROOM DROPDOWN HOVER FUNCTIONALITY -----------------
document.addEventListener('DOMContentLoaded', function () {
  // Only add hover functionality for desktop
  function initBathroomHover() {
    if (window.innerWidth > 1024) {
      const bathroomLinks = document.querySelectorAll('.bathroom-categories a[data-target]');
      const allBathroomContents = document.querySelectorAll('.bathroom-content');

      bathroomLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
          const targetId = this.getAttribute('data-target');

          // Hide all content first
          allBathroomContents.forEach(content => {
            content.style.display = 'none';
          });

          // Show target content
          const targetContent = document.getElementById(targetId);
          if (targetContent) {
            targetContent.style.display = 'block';
          }
        });
      });

      // Keep content visible when hovering over the content itself
      allBathroomContents.forEach(content => {
        content.addEventListener('mouseenter', function () {
          this.style.display = 'block';
        });

        content.addEventListener('mouseleave', function () {
          const self = this;
          setTimeout(() => {
            if (!document.querySelector('.bathroom-categories a:hover')) {
              self.style.display = 'none';
            }
          }, 100);
        });
      });

      // Hide all content when mouse leaves the entire bathroom mega menu
      const bathroomMega = document.querySelector('.bathroom-mega');
      if (bathroomMega) {
        bathroomMega.addEventListener('mouseleave', function () {
          allBathroomContents.forEach(content => {
            content.style.display = 'none';
          });
        });

        // Also hide content when entering the mega menu initially
        bathroomMega.addEventListener('mouseenter', function () {
          allBathroomContents.forEach(content => {
            content.style.display = 'none';
          });
        });
      }
    }
  }

  // Initialize on page load
  initBathroomHover();
});

// ----------------- CLICK OUTSIDE LOGIC -----------------
document.addEventListener("click", function (event) {
  const sidebar = document.getElementById("sidebar");
  const kitchenSidebar = document.getElementById("kitchenSidebar");
  const bathroomSidebar = document.getElementById("bathroomSidebar");
  const searchBar = document.getElementById("searchBar");
  const toggleBtn = document.querySelector(".mobile-toggle");
  const searchIcon = document.querySelector(".fa-search");

  // --- Close Search ---
  if (searchBar && searchBar.classList.contains("active") &&
    !searchBar.contains(event.target) &&
    event.target !== searchIcon) {
    searchBar.classList.remove("active");
    updateNavbarVisibility();
  }

  // --- Close Sidebars on outside click ---
  const isSidebarActive =
    (sidebar && sidebar.classList.contains("active")) ||
    (kitchenSidebar && kitchenSidebar.classList.contains("active")) ||
    (bathroomSidebar && bathroomSidebar.classList.contains("active"));

  if (isSidebarActive) {
    const clickedInsideSidebar =
      (sidebar && sidebar.contains(event.target)) ||
      (kitchenSidebar && kitchenSidebar.contains(event.target)) ||
      (bathroomSidebar && bathroomSidebar.contains(event.target));

    if (!clickedInsideSidebar && event.target !== toggleBtn && !toggleBtn.contains(event.target)) {
      if (sidebar) sidebar.classList.remove("active");
      if (kitchenSidebar) kitchenSidebar.classList.remove("active");
      if (bathroomSidebar) bathroomSidebar.classList.remove("active");
      updateNavbarVisibility();
    }
  }
});

// ----------------- WINDOW RESIZE HANDLER -----------------
window.addEventListener('resize', function () {
  // Reset bathroom content display for mobile
  if (window.innerWidth <= 1024) {
    const allBathroomContents = document.querySelectorAll('.bathroom-content');
    allBathroomContents.forEach(content => {
      content.style.display = '';
    });
  }
});

// ----------------- RESET ON PAGE RELOAD -----------------
window.onbeforeunload = () => {
  // reset all sidebars
  document.querySelectorAll("#sidebar, #kitchenSidebar, #bathroomSidebar, #searchBar")
    .forEach(el => el && el.classList.remove("active"));

  // reset all dropdowns
  document.querySelectorAll(".bathroom-sidebar-category.active, .bathroom-dropdown.active, .bathroom-content.active")
    .forEach(el => el.classList.remove("active"));
};

//  ====== Header section end ====== 


//   ====== Banner section start ====== 

var imageSwiper = new Swiper(".image-swiper", {
  loop: true,
  effect: "fade", // "slide", "cube", "coverflow", "flip" bhi try kar sakte ho
  speed: 1200,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
});

//   ====== Banner section end ====== 


// ====== Parallax effect section start ======= 

window.addEventListener("scroll", () => {
  const bg = document.querySelector(".parallax-bg");
  let scrollY = window.scrollY;
  bg.style.transform = `translateY(${scrollY * 0.4}px)`; // speed adjust kar
});

// ====== Parallax effect section end ======= 


// ======= products Section start ======

function initFeaturedSwiper() {
  if (window.innerWidth > 576) {
    if (!document.querySelector(".featured-products .mySwiper").swiper) {
      new Swiper(".featured-products .mySwiper", {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        breakpoints: {
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        },
      });
    }
  } else {
    let swiperInstance = document.querySelector(".featured-products .mySwiper").swiper;
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
    }
  }
}

// Page load + resize pr run karo
initFeaturedSwiper();
window.addEventListener("resize", initFeaturedSwiper);


// ======= products Section end ======