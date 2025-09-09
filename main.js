//  ====== Header section start ====== 

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.toggle("active");
  updateNavbarVisibility();
}

function openKitchenSidebar() {
  const el = document.getElementById("kitchenSidebar");
  if (el) el.classList.add("active");
  updateNavbarVisibility();
}

function closeKitchenSidebar() {
  const el = document.getElementById("kitchenSidebar");
  if (el) el.classList.remove("active");
  updateNavbarVisibility();
}

function openBathroomSidebar() {
  const el = document.getElementById("bathroomSidebar");
  if (el) el.classList.add("active");
  updateNavbarVisibility();
}

function closeBathroomSidebar() {
  const el = document.getElementById("bathroomSidebar");
  if (el) el.classList.remove("active");
  updateNavbarVisibility();
}

// ----------------- SEARCH TOGGLE -----------------
function toggleSearch() {
  const searchBar = document.getElementById("searchBar");
  if (searchBar) searchBar.classList.toggle("active");
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

  if (parentCategory) parentCategory.classList.toggle('active');
  if (category) category.classList.toggle("active");

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

    // Guard toggleBtn usage to avoid errors when toggleBtn is null
    const clickedToggleBtn = toggleBtn && (event.target === toggleBtn || toggleBtn.contains(event.target));

    if (!clickedInsideSidebar && !clickedToggleBtn) {
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
  if (!container) return;
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
  if (!container || !bar) return;
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
                  <button data-tooltip="Add to Cart"><i class="bi bi-bag"></i></button>
                  <button data-tooltip="Wishlist"><i class="bi bi-heart"></i></button>
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

  if (!bar) return;

  if (bar.classList.contains("active")) {
    // Closing → clear input and suggestions + reset height
    if (input) input.value = "";
    if (suggestions) suggestions.innerHTML = "";
    bar.classList.remove("active", "results-open");
  } else {
    // Opening
    bar.classList.add("active");
    bar.classList.remove("results-open");
    if (input) input.focus();
    if (suggestions) suggestions.innerHTML = ""; // ✅ ensure clean start
  }
}


// Active link handler
document.querySelectorAll('.mobile-bottom-nav a[data-nav]').forEach(link => {
  link.addEventListener('click', function (e) {
    if (this.getAttribute('href') === '#') e.preventDefault();
    document.querySelectorAll('.mobile-bottom-nav a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});


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
  if (!bg) return;
  let scrollY = window.scrollY;
  bg.style.transform = `translateY(${scrollY * 0.4}px)`; // speed adjust kar
});

// ====== Parallax effect section end ======= 


// ======= products Section start ======

function initFeaturedSwipers() {
  const swiperContainers = document.querySelectorAll(".featured-products .mySwiper");

  swiperContainers.forEach((swiperContainer) => {
    if (window.innerWidth > 576) {
      // Agar already init nahi hua to init karo
      if (!swiperContainer.swiper) {
        new Swiper(swiperContainer, {
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
      // Agar chhota screen hai to destroy kar do
      if (swiperContainer.swiper) {
        swiperContainer.swiper.destroy(true, true);
      }
    }
  });
}

// Page load + resize par run karo
initFeaturedSwipers();
window.addEventListener("resize", initFeaturedSwipers);


// ======= products Section end ======


//  ====== Shop by color section start ======

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    const targetId = btn.dataset.tab;
    const targetEl = document.getElementById(targetId);
    if (targetEl) targetEl.classList.add('active');
  });
});

//  ====== Shop by color section end ======


// ====== Products details section start ======

function changeImage(imgElement) {
  const current = document.getElementById("currentImage");
  if (current && imgElement) current.src = imgElement.src;

  let thumbnails = document.querySelectorAll(".thumbnails img");
  thumbnails.forEach(img => img.classList.remove("active"));
  if (imgElement) imgElement.classList.add("active");
}

function increaseQty() {
  let qty = document.getElementById("quantityInput");
  qty.value = parseInt(qty.value) + 1;
}

function decreaseQty() {
  let qty = document.getElementById("quantityInput");
  if (parseInt(qty.value) > 1) qty.value = parseInt(qty.value) - 1;
}

// CART FUNCTIONS
function openCart() {
  document.getElementById("cartModal").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
  updateSubtotal();
}

function closeCart() {
  document.getElementById("cartModal").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}

function changeCartQty(btn, change) {
  const qtyInput = btn.parentNode.querySelector("input");
  let qty = parseInt(qtyInput.value) + change;
  if (qty < 1) qty = 1;
  qtyInput.value = qty;
  updateSubtotal();
}

function deleteCartItem(el) {
  el.parentNode.remove();
  document.getElementById("cartCount").textContent =
    document.querySelectorAll(".cart-item").length;
  updateSubtotal();
}

function updateSubtotal() {
  let subtotal = 0;
  document.querySelectorAll(".cart-item").forEach(item => {
    const priceText = item.querySelector(".item-price").textContent.replace("Rs.", "").replace(",", "").trim();
    const price = parseInt(priceText);
    const qty = parseInt(item.querySelector("input").value);
    subtotal += price * qty;
  });
  document.getElementById("cartSubtotal").textContent = "Rs. " + subtotal.toLocaleString();
}

function addToCart() {
  let btn = document.getElementById("addToCartBtn");
  btn.textContent = "Loading...";   // button text change

  setTimeout(() => {
    btn.textContent = "ADD TO CART";  // reset text
    openCart(); // modal open
  }, 1000);
}


// ====== Products details section end ======


/* ====== Cart page start ====== */

// Quantity update
function changeQuantity(el, change) {
  if (!el) return;
  let qtyEl = el.parentElement ? el.parentElement.querySelector(".qty") : null;
  if (!qtyEl) return;
  let qty = parseInt(qtyEl.innerText) + change;
  if (qty < 1) qty = 1;
  qtyEl.innerText = qty;

  // Update total price (sample calculation)
  let price = 20950; // per item (dummy)
  const itemTotalEl = el.closest("tr") ? el.closest("tr").querySelector(".item-total") : null;
  if (itemTotalEl) itemTotalEl.innerText = "₹ " + (price * qty).toLocaleString();
}

// Remove item
function removeItem(el) {
  const tr = el ? el.closest("tr") : null;
  if (tr) tr.remove();
}

/* ====== Cart page end ====== */


// ====== Login page start ======

function sendOTP() {
  let mobileEl = document.getElementById("mobile");
  let mobile = mobileEl ? mobileEl.value : "";
  if (mobile.length < 10) {
    alert("Please enter valid mobile number");
    return;
  }
  const message = document.getElementById("message");
  const mobileForm = document.getElementById("mobileForm");
  const otpForm = document.getElementById("otpForm");
  if (message) message.style.display = "block";
  if (mobileForm) mobileForm.style.display = "none";
  if (otpForm) otpForm.style.display = "block";
}

function verifyOTP() {
  const getVal = id => (document.getElementById(id) ? document.getElementById(id).value : "");
  let otp =
    getVal("otp1") +
    getVal("otp2") +
    getVal("otp3") +
    getVal("otp4");

  if (otp.length < 4) {
    alert("Please enter complete OTP");
    return;
  }
  // Hide OTP sent message when verifying
  const message = document.getElementById("message");
  const successMsg = document.getElementById("successMsg");
  const otpForm = document.getElementById("otpForm");
  if (message) message.style.display = "none";
  if (successMsg) successMsg.style.display = "block";
  if (otpForm) otpForm.style.display = "none";
}

function moveNext(current, nextId) {
  if (!current) return;
  if (current.value.length === 1 && nextId) {
    const nextEl = document.getElementById(nextId);
    if (nextEl) nextEl.focus();
  }
}

// ====== Login page end ======

// ====== Checkout page start ======

function selectPayment(element, method) {
  if (!element) return;
  // Remove active class from all payment options
  document.querySelectorAll('.payment-option').forEach(option => {
    option.classList.remove('active');
  });

  // Add active class to selected option
  element.classList.add('active');

  // Check the radio button
  const radio = element.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;

  // Show/hide payment forms
  const cardForm = document.getElementById('cardForm');
  const upiForm = document.getElementById('upiForm');
  if (cardForm) cardForm.classList.remove('show');
  if (upiForm) upiForm.classList.remove('show');

  if (method === 'card') {
    if (cardForm) cardForm.classList.add('show');
  } else if (method === 'upi') {
    if (upiForm) upiForm.classList.add('show');
  }
}

function selectBilling(element, option) {
  if (!element) return;
  // Remove active class from all billing options
  document.querySelectorAll('.billing-option').forEach(opt => {
    opt.classList.remove('active');
  });

  // Add active class to selected option
  element.classList.add('active');

  // Check the radio button
  const radio = element.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;

  // Show/hide billing form
  const billingForm = document.getElementById('differentBillingForm');
  if (option === 'different') {
    if (billingForm) billingForm.classList.add('show');
  } else {
    if (billingForm) billingForm.classList.remove('show');
  }
}

function processPayment() {
  const form = document.getElementById('checkoutForm');
  const selectedPaymentEl = document.querySelector('input[name="paymentMethod"]:checked');
  const selectedPayment = selectedPaymentEl ? selectedPaymentEl.value : null;
  const cardForm = document.getElementById('cardForm');

  if (!selectedPayment) {
    alert('Please select a payment method.');
    return;
  }

  // Validate card form if Credit/Debit Card is selected
  if (selectedPayment === 'card') {
    if (cardForm) {
      const cardInputs = cardForm.querySelectorAll('input[required]');
      let valid = true;
      cardInputs.forEach(input => {
        if (!input.checkValidity()) {
          valid = false;
          input.reportValidity();
        }
      });
      if (!valid) {
        alert('Please fill in all required card details.');
        return;
      }
    }
  }

  if (form && form.checkValidity()) {
    alert('Order placed successfully! 🎉\n\nThank you for your purchase. You will receive a confirmation email shortly.');
  } else {
    alert('Please fill in all required fields.');
    if (form) form.reportValidity();
  }
}

// Add smooth animations on load
window.addEventListener('load', function () {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.5s ease';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    }, index * 100);
  });

  // Set Cash on Delivery as default active (guarded)
  const codInput = document.querySelector('.payment-option input[value="cod"]');
  if (codInput) {
    const codOption = codInput.closest('.payment-option');
    if (codOption) codOption.classList.add('active');
  }
});

// ====== Checkout page end ======



// ====== Profile page start ======    

// ====== DATA ======
let countdownTimer = null;
const ordersData = [
  { orderNo: '#ORD001', date: '15/01/2024', total: '₹1,250', status: 'completed' },
  { orderNo: '#ORD002', date: '18/01/2024', total: '₹890', status: 'pending' },
  { orderNo: '#ORD003', date: '20/01/2024', total: '₹2,100', status: 'completed' },
  { orderNo: '#ORD004', date: '22/01/2024', total: '₹1,550', status: 'processing' }
];

// ====== UTIL ======
function parseDDMMYYYY(str) {
  // 'dd/mm/yyyy' -> Date
  const [d, m, y] = str.split('/').map(Number);
  return new Date(y, m - 1, d);
}

// ====== SIDEBAR ======
function dashToggleSidebar() {
  const sidebar = document.getElementById('dashSidebar');
  const backdrop = document.getElementById('dashBackdrop');
  const toggleBtn = document.getElementById('dashToggleBtn');

  if (sidebar) sidebar.classList.toggle('dash-active');
  if (backdrop) backdrop.classList.toggle('dash-show');

  const isActive = sidebar && sidebar.classList.contains('dash-active');
  if (window.innerWidth <= 768) {
    if (toggleBtn) toggleBtn.style.display = isActive ? 'none' : 'block';
  }
}

function dashCloseSidebar() {
  const sidebar = document.getElementById('dashSidebar');
  const backdrop = document.getElementById('dashBackdrop');
  const toggleBtn = document.getElementById('dashToggleBtn');

  if (sidebar) sidebar.classList.remove('dash-active');
  if (backdrop) backdrop.classList.remove('dash-show');

  if (window.innerWidth <= 768) {
    if (toggleBtn) toggleBtn.style.display = 'block';
  }
}

// ====== SECTIONS ======
function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const targetSection = document.getElementById(sectionId);
  if (targetSection) targetSection.classList.add('active');

  const targetLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
  if (targetLink) targetLink.classList.add('active');

  if (sectionId === 'logout') startLogoutCountdown();
  else stopLogoutCountdown();
}

// ====== LOGOUT TIMER ======
function startLogoutCountdown() {
  stopLogoutCountdown(); // ensure clean start
  let seconds = 5;
  const countdownElement = document.getElementById('countdown');
  if (!countdownElement) return;

  countdownElement.textContent = seconds;
  countdownTimer = setInterval(() => {
    seconds--;
    countdownElement.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(countdownTimer);
      countdownTimer = null;
      console.log('Redirecting to login page...');
      // window.location.href = '/login';
    }
  }, 1000);
}

function stopLogoutCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
  const countdownElement = document.getElementById('countdown');
  if (countdownElement) countdownElement.textContent = '5';
}

// ====== SUMMARY ======
function updateSummaryCards() {
  const pendingCount = ordersData.filter(o => o.status === 'pending').length;
  const completedCount = ordersData.filter(o => o.status === 'completed').length;
  const pendingEl = document.getElementById('pendingOrdersCount');
  const completedEl = document.getElementById('completedOrdersCount');
  if (pendingEl) pendingEl.textContent = pendingCount;
  if (completedEl) completedEl.textContent = completedCount;
}

// ====== TABLES ======
function rowHTML(order) {
  return `
        <td><strong>${order.orderNo}</strong></td>
        <td>${order.date}</td>
        <td><strong>${order.total}</strong></td>
        <td><span class="status-badge status-${order.status}">${order.status}</span></td>
        <td>
          <button class="action-btn btn-view" data-order="${order.orderNo}" aria-label="View order ${order.orderNo}">
            <i class="fas fa-eye"></i> View
          </button>
        </td>
      `;
}

function populateOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  ordersData.forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = rowHTML(order);
    tbody.appendChild(tr);
  });
  filterOrders(); // apply current filters
}

function populateRecentOrders() {
  const tbody = document.getElementById('recentOrdersTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const recent = [...ordersData]
    .sort((a, b) => parseDDMMYYYY(b.date) - parseDDMMYYYY(a.date))
    .slice(0, 3);

  recent.forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = rowHTML(order);
    tbody.appendChild(tr);
  });
}

function filterOrders() {
  const searchTerm = (document.getElementById('orderSearch')?.value || '').toLowerCase();
  const filterStatus = document.getElementById('orderFilter')?.value || 'all';
  const rows = document.querySelectorAll('#ordersTableBody tr');

  rows.forEach(row => {
    const orderNo = row.querySelector('td:first-child')?.textContent.toLowerCase() || '';
    const status = row.querySelector('.status-badge')?.textContent.toLowerCase() || '';
    const matchesSearch = orderNo.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || status === filterStatus;
    row.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
  });
}

// ====== EVENTS ======
document.addEventListener('DOMContentLoaded', () => {
  // Init sections and data
  showSection('dashboard');
  updateSummaryCards();
  populateOrdersTable();
  populateRecentOrders();

  // Sidebar toggles
  document.getElementById('dashToggleBtn')?.addEventListener('click', dashToggleSidebar);
  document.getElementById('dashBackdrop')?.addEventListener('click', dashCloseSidebar);
  document.querySelector('.dash-close-btn')?.addEventListener('click', dashCloseSidebar);

  // Sidebar nav
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
      if (window.innerWidth <= 768) dashCloseSidebar();
    });
  });

  // Filters
  document.getElementById('orderSearch')?.addEventListener('input', filterOrders);
  document.getElementById('orderFilter')?.addEventListener('change', filterOrders);

  // Logout cancel
  document.getElementById('cancelLogout')?.addEventListener('click', () => {
    stopLogoutCountdown();
    showSection('dashboard');
  });

  // Scoped event delegation to ORDERS TABLE ONLY (prevents crashes from address buttons)
  const ordersTbody = document.getElementById('ordersTableBody');
  ordersTbody?.addEventListener('click', function (e) {
    const btn = e.target.closest('.action-btn');
    if (!btn) return;

    const orderNo = btn.getAttribute('data-order');
    if (!orderNo) return;

    if (btn.classList.contains('btn-view')) {
      console.log(`Viewing details for ${orderNo}`);
    }
    if (btn.classList.contains('btn-edit')) {
      console.log(`Editing ${orderNo}`);
    }
    if (btn.classList.contains('btn-delete')) {
      if (confirm(`Are you sure you want to delete ${orderNo}?`)) {
        const idx = ordersData.findIndex(o => o.orderNo === orderNo);
        if (idx !== -1) {
          ordersData.splice(idx, 1);
          populateOrdersTable();
          populateRecentOrders();
          updateSummaryCards();
          console.log(`${orderNo} deleted successfully`);
        }
      }
    }
  });

  // Responsive: keep toggle button state correct
  const toggleBtn = document.getElementById('dashToggleBtn');
  const sidebar = document.getElementById('dashSidebar');
  const backdrop = document.getElementById('dashBackdrop');

  function handleResize() {
    if (window.innerWidth > 768) {
      if (backdrop) backdrop.classList.remove('dash-show');
      if (sidebar) sidebar.classList.remove('dash-active');
      if (toggleBtn) toggleBtn.style.display = 'none';
    } else {
      if (!sidebar || !sidebar.classList.contains('dash-active')) {
        if (toggleBtn) toggleBtn.style.display = 'block';
      }
    }
  }
  window.addEventListener('resize', handleResize);
  handleResize(); // set initial state
});

// ====== Profile page end ====== 



