
//  ====== Header section start ====== 

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


// Search bar 
const products = [
  { title: "Shower Column Set In Oil", price: "Rs. 20,600.00", oldPrice: "Rs. 33,210.00", discount: "-38%", img1: "Assets/kitchen1.avif", img2: "Assets/kitchen2.webp", keywords: ["shower", "bath", "bathroom"] },
  { title: "Luxury Basin Tap", price: "Rs. 8,999.00", oldPrice: "Rs. 12,000.00", discount: "-25%", img1: "Assets/kitchen1.avif", img2: "Assets/kitchen2.webp", keywords: ["basin", "tap", "faucet"] },
  { title: "Modern Kitchen Sink", price: "Rs. 15,500.00", oldPrice: "Rs. 20,000.00", discount: "-22%", img1: "Assets/kitchen1.avif", img2: "Assets/kitchen2.webp", keywords: ["kitchen", "sink", "cooking"] },
  { title: "Wall Mounted Shower Mixer", price: "Rs. 11,200.00", oldPrice: "Rs. 16,000.00", discount: "-30%", img1: "Assets/kitchen1.avif", img2: "Assets/kitchen2.webp", keywords: ["shower", "mixer", "bath"] },
  { title: "Wall Mounted Shower Mixer", price: "Rs. 11,200.00", oldPrice: "Rs. 16,000.00", discount: "-30%", img1: "Assets/kitchen1.avif", img2: "Assets/kitchen2.webp", keywords: ["shower", "mixer", "bath"] },
  { title: "Wall Mounted Shower Mixer", price: "Rs. 11,200.00", oldPrice: "Rs. 16,000.00", discount: "-30%", img1: "Assets/kitchen1.avif", img2: "Assets/kitchen2.webp", keywords: ["shower", "mixer", "bath"] },
  { title: "Stylish Kitchen Faucet", price: "Rs. 9,800.00", oldPrice: "Rs. 14,000.00", discount: "-29%", img1: "Assets/kitchen1.avif", img2: "Assets/kitchen2.webp", keywords: ["kitchen", "faucet", "tap"] }
];

let recentSearches = [];

function updateRecentSearches() {
  let container = document.getElementById("recentSearches");
  container.innerHTML = "";

  recentSearches.forEach((item, index) => {
    container.innerHTML += `
            <span class="recent-item">
                <a href="#" onclick="showSuggestions('${item}')">${item}</a>
                <button onclick="removeRecent(${index})">✕</button>
            </span>
        `;
  });
}

function removeRecent(index) {
  recentSearches.splice(index, 1);
  updateRecentSearches();
}

function showSuggestions(query) {
  let bar = document.getElementById("searchBar");
  let container = document.getElementById("searchSuggestions");
  container.innerHTML = "";

  if (!query) {
    bar.classList.remove("results-open");
    container.innerHTML = "<p>Type something to search</p>";
    return;
  }

  // ✅ Add to recent searches (no duplicates)
  let lowerQuery = query.toLowerCase();
  if (!recentSearches.some(s => s.toLowerCase() === lowerQuery)) {
    recentSearches.unshift(query);
    if (recentSearches.length > 5) recentSearches.pop();
  }
  updateRecentSearches();

  let filtered = products.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.keywords.some(k => k.includes(lowerQuery))
  );

  if (filtered.length === 0) {
    bar.classList.add("results-open");
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  // ✅ Agar result hai → full height karo
  bar.classList.add("results-open");

  filtered.forEach(p => {
    let card = `
        <div class="product-card">
            <div class="product-image">
                <span class="discount-badge">${p.discount}</span>
                <img src="${p.img1}" alt="Product" class="main-img">
                <img src="${p.img2}" alt="Product Hover" class="hover-img">

                <div class="hover-icons">
                    <button data-tooltip="Add to Cart"><i class="fa fa-shopping-bag"></i></button>
                    <button data-tooltip="Wishlist"><i class="fa fa-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h6>${p.title}</h6>
                <span class="price">${p.price}</span>
                <span class="old-price">${p.oldPrice}</span>
            </div>
        </div>`;
    container.innerHTML += card;
  });
}

/* ✅ Toggle SearchBar */
function toggleSearch() {
  const bar = document.getElementById("searchBar");
  const input = document.getElementById("searchInput");
  const suggestions = document.getElementById("searchSuggestions");

  if (bar.classList.contains("active")) {
    // Closing → clear input and suggestions + reset height
    input.value = "";
    suggestions.innerHTML = "";
    bar.classList.remove("active", "results-open");
  } else {
    // Opening
    bar.classList.add("active");
    bar.classList.remove("results-open");
    input.focus();
    suggestions.innerHTML = ""; // ✅ ensure clean start
  }
}


//  ====== Header section end ====== 


//   ====== Banner section start ====== 

var imageSwiper = new Swiper(".image-swiper", {
  loop: true,
  effect: "fade",
  speed: 1200,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // dots click karne par slide change hoga
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


//  ====== Shop by color section start ======

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

//  ====== Shop by color section end ======