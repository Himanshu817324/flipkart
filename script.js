window.onload = function () {
  const slides = document.getElementsByClassName('carousel-item');
  const dotsContainer = document.querySelector('.carouselDots');
  let currentSlide = 0;
  let autoPlayInterval;
  let touchStartX = 0;
  let touchEndX = 0;
  const carouselContainer = document.querySelector('.carouselContainer');
  const isMobile = window.innerWidth <= 768;

  // Generate dots dynamically
  function createDots() {
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'carouselDot';
      if (i === 0) dot.classList.add('active');
      // Create an indicator element for active state
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      dot.appendChild(indicator);
      // Dot click handler
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    // Remove active classes from current slide and dot
    slides[currentSlide].classList.remove('active');
    dotsContainer.children[currentSlide].classList.remove('active');

    // Update current slide index
    currentSlide = index;

    // Add active classes to new slide and dot
    slides[currentSlide].classList.add('active');
    dotsContainer.children[currentSlide].classList.add('active');

    // Reset autoplay and progress animation
    resetAutoPlay();
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);

    // Reset progress of all indicator elements
    const dots = document.querySelectorAll('.carouselDot');
    dots.forEach(dot => {
      const indicator = dot.querySelector('.indicator');
      indicator.style.width = '0%';
    });

    // Start the progress animation for the active dot
    const activeDot = document.querySelector('.carouselDot.active');
    if (activeDot) {
      const activeIndicator = activeDot.querySelector('.indicator');
      // Force reflow to ensure animation triggers
      void activeIndicator.offsetWidth;
      activeIndicator.style.width = '100%';
    }

    autoPlayInterval = setInterval(nextSlide, 3500);
  }

  // Touch event handlers for the main carousel
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  }

  function handleSwipe() {
    // Calculate swipe distance
    const swipeDistance = touchEndX - touchStartX;
    // Minimum swipe distance required (in pixels)
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      // Swiped right - go to previous slide
      prevSlide();
    } else if (swipeDistance < -minSwipeDistance) {
      // Swiped left - go to next slide
      nextSlide();
    }
  }

  // Initialize carousel
  function initCarousel() {
    createDots();
    slides[0].classList.add('active');
    resetAutoPlay();

    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);

    // Add touch events for swipe on mobile
    if (carouselContainer) {
      carouselContainer.addEventListener('touchstart', handleTouchStart, false);
      carouselContainer.addEventListener('touchend', handleTouchEnd, false);
    }
  }

  initCarousel();

  // Handle mobile menus - ensure proper functionality with JavaScript
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const moreOptions = document.querySelector('.dotsConainer .data');

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', function (e) {
      e.stopPropagation(); // Prevent document click from firing immediately
      const mobileNavMenu = document.getElementById('mobileNavMenu');

      if (mobileNavMenu) {
        // Toggle the show class on nav menu
        mobileNavMenu.classList.toggle('show');

        // Close more options if open
        const mobileMoreOptions = document.getElementById('mobileMoreOptions');
        if (mobileMoreOptions && mobileMoreOptions.classList.contains('show')) {
          mobileMoreOptions.classList.remove('show');
        }
      }
    });
  }

  if (moreOptions) {
    moreOptions.addEventListener('click', function (e) {
      e.stopPropagation(); // Prevent document click from firing immediately
      const mobileMoreOptions = document.getElementById('mobileMoreOptions');

      if (mobileMoreOptions) {
        // Toggle the show class on more options menu
        mobileMoreOptions.classList.toggle('show');

        // Close nav menu if open
        const mobileNavMenu = document.getElementById('mobileNavMenu');
        if (mobileNavMenu && mobileNavMenu.classList.contains('show')) {
          mobileNavMenu.classList.remove('show');
        }
      }
    });
  }

  // Add support for mobile-menu-btn if it exists
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const mobileNavMenu = document.getElementById('mobileNavMenu');
      if (mobileNavMenu) {
        mobileNavMenu.classList.toggle('show');
      }
    });
  }

  // Add swipe gesture support for mobile navigation drawer
  const addSwipeSupport = () => {
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    if (!mobileNavMenu) return;

    let touchStartX = 0;
    let touchEndX = 0;

    mobileNavMenu.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    mobileNavMenu.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
    }, { passive: true });

    function handleSwipeGesture() {
      // Swipe left (to close menu)
      if (touchStartX - touchEndX > 50) {
        mobileNavMenu.classList.remove('show');
      }
    }
  };

  addSwipeSupport();

  // Hide the CTA element after 5 seconds
  const ctaElement = document.querySelector('.cta');
  if (ctaElement) {
    setTimeout(() => {
      ctaElement.style.display = 'none';
    }, 8000);
  }
};





// product slider

const categories = {
  electronics: [
    { id: 1, name: "Fastrack Smartwatches", price: "From ₹1,399", image: "images/electronics/1.webp" },
    { id: 2, name: "Best Truewireless Headphones", price: "Grab Now", image: "images/electronics/2.webp" },
    { id: 3, name: "Best of Shavers", price: "From ₹1,649", image: "images/electronics/3.webp" },
    { id: 4, name: "Projector", price: "$From ₹9,999", image: "images/electronics/4.webp" },
    { id: 5, name: "Printers", price: "From ₹10,190", image: "images/electronics/5.webp" },
    { id: 6, name: "Boat Smartwatches", price: "From ₹999", image: "images/electronics/6.webp" },
    { id: 7, name: "Projectors", price: "From ₹6,990", image: "images/electronics/7.webp" },
    { id: 8, name: "Best Selling Mobile Speakers", price: "From ₹499", image: "images/electronics/8.webp" },
    { id: 9, name: "Monitors", price: "From ₹7,949", image: "images/electronics/9.webp" },
    { id: 10, name: "Noise Smartwatches", price: "From ₹1,099", image: "images/electronics/10.webp" }
  ],
  beauty: [
    { id: 11, name: "Top Selling Stationery", price: "From ₹49", image: "images/beauty/1.webp" },
    { id: 12, name: "Treadmill, Exercise Bikes & More", price: "Up to 70% Off", image: "images/beauty/2.webp" },
    { id: 13, name: "Geared Cycles", price: "Up to 70% Off", image: "images/beauty/3.webp" },
    { id: 14, name: "Electric Cycles", price: "Up to 70% Off", image: "images/beauty/4.webp" },
    { id: 15, name: "Best of Action Toys", price: "Up to 70% Off", image: "images/beauty/5.webp" },
    { id: 16, name: "Gym Essentials", price: "From ₹139", image: "images/beauty/6.webp" },
    { id: 17, name: "Microphones", price: "Up to 70% Off", image: "images/beauty/7.webp" },
    { id: 18, name: "Musical Keyboards", price: "Up to 70% Off", image: "images/beauty/8.webp" },
    { id: 19, name: "Dry Fruits", price: "Upto 75% Off", image: "images/beauty/9.webp" },
    { id: 20, name: "Remote Control Toys", price: "Upto 80% Off", image: "images/beauty/10.webp" }
  ],
  Books: [
    { id: 21, name: "Yoga Mat", price: "From ₹ 159", image: "images/Books/1.webp" },
    { id: 22, name: "Self Help Books", price: "Min 20% off", image: "images/Books/2.webp" },
    { id: 23, name: "Puzzles & Cubes", price: "From ₹ 79", image: "images/Books/3.webp" },
    { id: 24, name: "Soft Toys", price: "Up to 70% Off", image: "images/Books/4.webp" },
    { id: 25, name: "Geared Cycles", price: "Up to 70% Off", image: "images/Books/5.webp" },
    { id: 26, name: "Electric Cycles", price: "Up to 40% Off", image: "images/Books/6.webp" },
    { id: 27, name: "String Instruments", price: "Up to 70% Off", image: "images/Books/7.webp" },
    { id: 28, name: "Fiction Books", price: "Up to 70% Off", image: "images/Books/8.webp" },
    { id: 29, name: "Remote Control Toys", price: "Up to 80% Off", image: "images/Books/9.webp" },
    { id: 30, name: "Oats", price: "From ₹ 179", image: "images/Books/10.webp" }
  ],
  topDeals: [
    { id: 31, name: "Apple iPads", price: "Shop Now!", image: "images/topDeals/1.webp" },
    { id: 32, name: "Puma, Adidas...", price: "Min. 40% off", image: "images/topDeals/2.webp" },
    { id: 33, name: "Instax Cameras", price: "From ₹3,999", image: "images/topDeals/3.webp" },
    { id: 34, name: "Buy Now", price: "From ₹99", image: "images/topDeals/4.webp" },
    { id: 35, name: "Camera Bags", price: "Min 50% Off", image: "images/topDeals/5.webp" },
    { id: 36, name: "Allen Solly & Van Heusen", price: "Min. 40%  Off", image: "images/topDeals/6.webp" },
    { id: 37, name: "Bata, Khadim's ...", price: "Under ₹499", image: "images/topDeals/7.webp" },
    { id: 38, name: "Apple Pencil", price: "Shop Now", image: "images/topDeals/8.webp" },
    { id: 39, name: "Grab Now", price: "From ₹49", image: "images/topDeals/9.webp" },
    { id: 40, name: "Aftershave", price: "From ₹289", image: "images/topDeals/10.webp" }
  ],
  furniture: [
    { id: 41, name: "Mattresses", price: "From ₹2,990", image: "images/furniture/1.webp" },
    { id: 42, name: "Sofa & Sectional", price: "From ₹7,999", image: "images/furniture/2.webp" },
    { id: 43, name: "Office Chairs", price: "From ₹1,890", image: "images/furniture/3.webp" },
    { id: 44, name: "Beds", price: "From ₹1,790", image: "images/furniture/4.webp" },
    { id: 45, name: "TV Units", price: "From ₹1,249", image: "images/furniture/5.webp" },
    { id: 46, name: "Sofa Sets", price: "From ₹21,999", image: "images/furniture/6.webp" },
    { id: 47, name: "Sofa Beds", price: "From ₹6,099", image: "images/furniture/7.webp" },
    { id: 48, name: "Recliner", price: "₹10,499", image: "images/furniture/8.webp" },
    { id: 49, name: "Dining Table", price: "From ₹11,999", image: "images/furniture/9.webp" },
    { id: 50, name: "Storage Cabinet", price: "₹10,699", image: "images/furniture/10.webp" }
  ],
  appliances: [
    { id: 51, name: "Godrej Refrigerator", price: "From ₹7,240", image: "images/appliances/1.webp" },
    { id: 52, name: "Samsung Refrigerator", price: "From ₹12,690", image: "images/appliances/2.webp" },
    { id: 53, name: "Semi Automatic Washing Machines", price: "Buy now", image: "images/appliances/3.webp" },
    { id: 54, name: "Double Door Refrigerator", price: "From ₹16,129", image: "images/appliances/4.webp" },
    { id: 55, name: "Top Load Washing Machines", price: "Buy now", image: "images/appliances/5.webp" },
    { id: 56, name: "Marq Refrigerator", price: "From ₹8,999", image: "images/appliances/6.webp" },
    { id: 57, name: "Big Washing Machines", price: "Buy Now", image: "images/appliances/7.webp" },
    { id: 58, name: "Energy Efficient Refrigerator", price: "From ₹14,590", image: "images/appliances/8.webp" },
    { id: 59, name: "Front Load Washing Machines", price: "Buy now", image: "images/appliances/9.webp" },
    { id: 60, name: "Blender", price: "$100", image: "images/appliances/10.webp" }
  ],
  fashion: [
    { id: 61, name: "Puma, Adidas...", price: "Min. 40% off", image: "images/Fashion/1.webp" },
    { id: 62, name: "Lingrie Sets", price: "Under rs.299", image: "images/Fashion/2.webp" },
    { id: 63, name: "Swim & Beach Wear", price: "Under rs.299", image: "images/Fashion/3.webp" },
    { id: 64, name: "Women's Shirts", price: "Min. 70% off", image: "images/Fashion/4.webp" },
    { id: 65, name: "Middies", price: "Min. 60% Off", image: "images/Fashion/5.webp" },
    { id: 66, name: "Women Handbags", price: "From rs.499", image: "images/Fashion/6.webp" },
    { id: 67, name: "Best selling Styles", price: "Min. 40% Off", image: "images/Fashion/7.webp" },
    { id: 68, name: "Women Tops", price: "From rs. 149", image: "images/Fashion/8.webp" },
    { id: 69, name: "Women Panties", price: "From rs. 199", image: "images/Fashion/9.webp" },
    { id: 66, name: "Camisoles & Slips", price: "Under rs.299", image: "images/Fashion/10.webp" }
  ],
  topStyles: [
    { id: 71, name: "Fashion Dream,Mars Infiniti ...", price: "Min. 60% Offf", image: "images/topStyles/1.webp" },
    { id: 72, name: "Women Bra", price: "From ₹99", image: "images/topStyles/2.webp" },
    { id: 73, name: "U.S. Polo Assn., Highlander..", price: "Min. 40% Off", image: "images/topStyles/3.webp" },
    { id: 74, name: "Bags, Trolleys, Luggage...", price: "50-70%+Extra 10% Off", image: "images/topStyles/4.webp" },
    { id: 75, name: "Sweatshirts, Hoodies, Jackets...", price: "From ₹249", image: "images/topStyles/5.webp" },
    { id: 76, name: "Camisoles & Slips", price: "Under rs.299", image: "images/topStyles/6.webp" },
    { id: 77, name: "Being Human, Ruf & Tuf, Lee..", price: "Min. 50% Off", image: "images/topStyles/7.webp" },
    { id: 78, name: "Ketch, Mast & Harbour..", price: "From ₹399", image: "images/topStyles/8.webp" },
    { id: 79, name: "Crazy Deals on Handbags", price: "Min 60% Off", image: "images/topStyles/9.webp" },
    { id: 80, name: "Nivia, Van Heusen Flex..", price: "Up to 60% Off", image: "images/topStyles/10.webp" }
  ]
};

function populateCarousels() {
  Object.keys(categories).forEach(category => {
    const container = document.getElementById(category);
    categories[category].forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <div class="cards-body d-flex flex-column">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
              </div>
          `;
      container.appendChild(card);
    });
  });
}

function scrollCarousel(category, amount) {
  const container = document.getElementById(category);
  if (container) {
    // Adjust scroll amount based on screen size
    const adjustedAmount = window.innerWidth <= 768 ? amount * 0.6 : amount;
    container.scrollBy({ left: adjustedAmount, behavior: "smooth" });
  }
}

// Add touch swipe functionality to product carousels
function addTouchSwipeToCarousels() {
  const carousels = document.querySelectorAll('.cardCarousel');

  carousels.forEach(carousel => {
    let startX, startScrollLeft, isScrolling = false;

    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - carousel.offsetLeft;
      startScrollLeft = carousel.scrollLeft;
      isScrolling = true;
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
      if (!isScrolling) return;
      e.preventDefault();
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5; // Scroll speed multiplier
      carousel.scrollLeft = startScrollLeft - walk;
    }, { passive: false });

    carousel.addEventListener('touchend', () => {
      isScrolling = false;
    }, { passive: true });
  });
}

// Function to adjust UI based on screen size
function adjustForScreenSize() {
  const isMobile = window.innerWidth <= 768;

  // Adjust carousel navigation buttons visibility
  const navButtons = document.querySelectorAll('.carousel-container .nav-button');
  navButtons.forEach(button => {
    button.style.display = isMobile ? 'none' : 'flex';
  });

  // Make product cards more touch-friendly on mobile
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (isMobile) {
      card.style.touchAction = 'pan-x';
      card.style.minHeight = '180px';
    } else {
      card.style.touchAction = 'auto';
      card.style.minHeight = 'auto';
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  populateCarousels();
  addTouchSwipeToCarousels();
  adjustForScreenSize();

  // Listen for window resize events
  window.addEventListener('resize', function () {
    adjustForScreenSize();
  });
});

{/* <button>Add to Cart</button> */ }



const homeDecorProducts = [
  { name: "Cups & Saucers", image: "images/homeDecorProducts/1.webp", discount: "Special Offer" },
  { name: "Bookshelves", image: "images/homeDecorProducts/2.webp", discount: "Min. 50% Off" },
  { name: "Carpet Rugs", image: "images/homeDecorProducts/3.webp", discount: "Min. 50% Off" },
  { name: "Artificial Plants", image: "images/homeDecorProducts/4.webp", discount: "Min. 50% Off" }
];

const stylishHomeProducts = [
  { name: "Mosquito Nets", image: "images/stylishHomeProducts/1.webp", discount: "Min. 50% Off" },
  { name: "Bedsheets", image: "images/stylishHomeProducts/2.webp", discount: "Top Sellers" },
  { name: "Pillows", image: "images/stylishHomeProducts/3.webp", discount: "Min. 50% Off" },
  { name: "Shoe Rack", image: "images/stylishHomeProducts/4.webp", discount: "Min. 50% Off" }
];

const gadgetsProducts = [
  { name: "Trimmers", image: "images/gadgetsProducts/1.webp", discount: "Min. 50% Off" },
  { name: "Hair Dryers", image: "images/gadgetsProducts/2.webp", discount: "Min. 50% Off" },
  { name: "Shavers", image: "images/gadgetsProducts/3.webp", discount: "Min. 50% Off" },
  { name: "Projectors", image: "images/gadgetsProducts/4.webp", discount: "Min. 50% Off" }
];

const seasonalPicks = [
  { name: "Dry Fruit, Nut & Seed", image: "images/seasonalPicks/1.webp", discount: "Min. 50% Off" },
  { name: "Women's Sarees", image: "images/seasonalPicks/2.webp", discount: "Min. 50% Off" },
  { name: "Women's Gowns", image: "images/seasonalPicks/3.webp", discount: "Min. 50% Off" },
  { name: "Clocks", image: "images/seasonalPicks/4.webp", discount: "Min. 50% Off" }
];

const winterEssentials = [
  { name: "Men’s Sports Shoes", image: "images/winterEssentials/1.webp", discount: "Min. 70% Off" },
  { name: "Men's Tracksuits", image: "images/winterEssentials/2.webp", discount: "Grab Or Gone" },
  { name: "Watches", image: "images/winterEssentials/3.webp", discount: "Min. 50% Off" },
  { name: "Backpacks", image: "images/winterEssentials/4.webp", discount: "Min. 70% Off" }
];

const travelEssentials = [
  { name: "Men’s Casual Shoes", image: "images/travelEssentials/1.webp", discount: "Min. 70% Off" },
  { name: "Men’s Slippers & Flip-Flops", image: "images/travelEssentials/2.webp", discount: "Min. 70% Off" },
  { name: "Trimmers", image: "images/travelEssentials/3.webp", discount: "Min. 50% Off" },
  { name: "Men's Jeans", image: "images/travelEssentials/4.webp", discount: "Min. 50% Off" }
];

const weddingEssentials = [
  { name: "Women's Ethnic Sets", image: "images/wedding/1.webp", discount: "Special offer" },
  { name: "Smart Watches", image: "images/wedding/2.webp", discount: "Min. 40% Off" },
  { name: "Topwear", image: "images/wedding/3.webp", discount: "Min. 50% Off" },
  { name: "Lips", image: "images/wedding/4.webp", discount: "Min. 50% Off" }
];

const shivratriEssentials = [
  { name: "Dry Fruit, Nut & Seed", image: "images/shivratriEssentials/1.webp", discount: "Min. 50% Off" },
  { name: "Speakers", image: "images/shivratriEssentials/2.webp", discount: "Special offer" },
  { name: "Toran", image: "images/shivratriEssentials/3.webp", discount: "Bestsellers" },
  { name: "Kitchen Trolleys", image: "images/shivratriEssentials/4.webp", discount: "Min. 50% Off" }
];



function renderCategory(containerId, categoryName, productList) {
  const container = document.getElementById(containerId);
  const categoryCard = document.createElement("div");
  categoryCard.classList.add("col-md-4", "col-12", "mb-3", "px-0", "px-md-2");
  categoryCard.innerHTML = `
      <div class="cards px-0 px-md-3">
          <div class="top">
            <h5 class="card-title mb-0">${categoryName}</h5>
            <div class=" arrow d-flex align-items-center">
              <button class="view-more-btn px-2"> > </button>
            </div>
          </div>
          <div class="cardHolder row row-cols-2 g-2">
              ${productList.map(product => `
                  <div class="cardOuter col">
                      <div class="cardInner">
                        <div class="image">
                          <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        </div>
                        <div class="cardBody d-flex flex-column">
                          <h6 class="cards-title">${product.name}</h6>
                          <div class="description">
                            <p class="discount-text">${product.discount}</p>
                          </div>
                        </div>
                      </div>
                  </div>
              `).join('')}
          </div>
      </div>
  `;
  container.appendChild(categoryCard);

}

function renderProducts() {
  renderCategory("product-container", "Home Decor & Furnishings", homeDecorProducts);
  renderCategory("product-container", "Make Your Home Stylish", stylishHomeProducts);
  renderCategory("product-container", "Trending Gadgets & Appliances", gadgetsProducts);
  renderCategory("extra-product-container", "Season’s Top Picks", seasonalPicks);
  renderCategory("extra-product-container", "Winter Essentials", winterEssentials);
  renderCategory("extra-product-container", "Travel Essential Picks", travelEssentials);
}

document.addEventListener("DOMContentLoaded", function () {
  renderProducts();

  // Close mobile menus when clicking outside
  document.addEventListener('click', function (event) {
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    const mobileMoreOptions = document.getElementById('mobileMoreOptions');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const moreOptions = document.querySelector('.dotsConainer');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    // Check if click was outside of navigation elements
    const isOutsideNavMenu = mobileNavMenu &&
      !mobileNavMenu.contains(event.target) &&
      !(hamburgerMenu && hamburgerMenu.contains(event.target)) &&
      !(mobileMenuBtn && mobileMenuBtn.contains(event.target));

    // Check if click was outside of more options elements
    const isOutsideMoreOptions = mobileMoreOptions &&
      !mobileMoreOptions.contains(event.target) &&
      !(moreOptions && moreOptions.contains(event.target));

    // If clicking outside mobile nav menu, close it
    if (isOutsideNavMenu && mobileNavMenu.classList.contains('show')) {
      mobileNavMenu.classList.remove('show');
    }

    // If clicking outside more options menu, close it
    if (isOutsideMoreOptions && mobileMoreOptions.classList.contains('show')) {
      mobileMoreOptions.classList.remove('show');
    }
  });

  // Initialize touch events for document body to detect edge swipes
  let touchStartX = 0;

  document.body.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  document.body.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const mobileNavMenu = document.getElementById('mobileNavMenu');

    // Edge swipe detection - if swipe starts near the left edge (< 30px)
    if (touchStartX < 30 && touchEndX - touchStartX > 70) {
      // Right swipe from left edge - open menu
      if (mobileNavMenu && !mobileNavMenu.classList.contains('show')) {
        mobileNavMenu.classList.add('show');
      }
    }
  }, { passive: true });
});


function renderSingle(containerId, categoryName, productList) {
  const container = document.getElementById(containerId);
  const categoryCard = document.createElement("div");
  categoryCard.classList.add("col-12", "mb-3", "px-0");
  categoryCard.innerHTML = `
      <div class="cards px-0 px-md-3">
          <div class="top">
            <h5 class="card-title mb-0">${categoryName}</h5>
            <div class=" arrow d-flex align-items-center">
              <button class="view-more-btn px-2"> > </button>
            </div>
          </div>
          <div class="cardHolder row row-cols-2 g-2">
              ${productList.map(product => `
                  <div class="cardOuter col">
                      <div class="cardInner">
                        <div class="image">
                          <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        </div>
                        <div class="cardBody d-flex flex-column">
                          <h6 class="cards-title">${product.name}</h6>
                          <div class="description">
                            <p class="discount-text">${product.discount}</p>
                          </div>
                        </div>
                      </div>
                  </div>
              `).join('')}
          </div>
          
      </div>
  `;
  container.appendChild(categoryCard);

}

function renderSingleProducts() {
  renderSingle("wedding-product-container", "Wedding & Gifting Specials", weddingEssentials);
  renderSingle("shivratri-product-container", "Maha Shivratri Essentials", shivratriEssentials);
}

document.addEventListener("DOMContentLoaded", function () {
  renderSingleProducts();

  // Add smooth scrolling to menu items
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      // Close mobile menu after selection on mobile
      const mobileNavMenu = document.getElementById('mobileNavMenu');
      if (mobileNavMenu && mobileNavMenu.classList.contains('show') && window.innerWidth <= 768) {
        mobileNavMenu.classList.remove('show');
      }

      // Smooth scroll to associated section if any
      const targetText = item.querySelector('span span')?.textContent;
      if (targetText) {
        const sections = document.querySelectorAll('.productCarousel');

        sections.forEach(section => {
          const title = section.querySelector('.title');
          if (title && title.textContent.toLowerCase().includes(targetText.toLowerCase())) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    });
  });

  // Add submenu toggle for mobile navigation
  const subMenuToggles = document.querySelectorAll('.menu-item.has-submenu');
  subMenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      // Only handle submenu toggle on mobile
      if (window.innerWidth <= 768) {
        const submenu = this.querySelector('.submenu');
        if (submenu) {
          // Prevent parent click if clicking on the toggle arrow
          if (e.target.classList.contains('toggle-icon')) {
            e.preventDefault();
            e.stopPropagation();
            submenu.classList.toggle('show');
          }
        }
      }
    });
  });
});



{/* <img src="${product.image}" class="card-img-top" alt="${product.name}">
  <div class="cards-body text-center">
    <h6 class="cards-title">${product.name}</h6>
    <p class="discount-text">${product.discount}</p>
  </div> */}

