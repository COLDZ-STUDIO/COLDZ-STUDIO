// Loader Control
window.addEventListener('load', () => {
  document.getElementById('loader').classList.add('hidden');
});

// Custom Animated Cursor
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  dot.style.left = `${posX}px`;
  dot.style.top = `${posY}px`;

  outline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Navbar Blur on Scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Scroll Reveal Intersection Observer
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Animated Statistics Counter
const counters = document.querySelectorAll('.counter');
let counted = false;

const statsSection = document.getElementById('about');
window.addEventListener('scroll', () => {
  const rect = statsSection.getBoundingClientRect();
  if (rect.top <= window.innerHeight && !counted) {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const updateCount = () => {
        const increment = target / 50;
        if (count < target) {
          count += increment;
          counter.innerText = Math.ceil(count) + "+";
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + "+";
        }
      };
      updateCount();
    });
    counted = true;
  }
});

// Filterable Portfolio Gallery
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    portfolioCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// DYNAMIC PRICING TIER CALCULATOR (FIXED FUNCTIONALITY)
function selectPlanTier(tier, cardElement) {
  document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('selected'));
  cardElement.classList.add('selected');

  const priceElems = [
    { id: 'price-web', unit: '/ page' },
    { id: 'price-logo', unit: '/ logo' },
    { id: 'price-thumb', unit: '/ thumb' },
    { id: 'price-video', unit: '/ video' },
    { id: 'price-menu', unit: '/ design' }
  ];

  priceElems.forEach(item => {
    const elem = document.getElementById(item.id);
    const basePrice = parseInt(elem.getAttribute('data-base'));
    let finalPrice = basePrice;

    if (tier === 'pro') {
      finalPrice = Math.floor(basePrice * 0.95); // 5% discount
    } else if (tier === 'priority') {
      finalPrice = Math.floor(basePrice * 0.90); // 10% discount
    }

    elem.innerHTML = `₹${finalPrice} <span class="per-unit">${item.unit}</span>`;
  });

  const customElem = document.getElementById('price-custom');
  if (tier === 'pro') {
    customElem.innerHTML = `10% Off`;
  } else if (tier === 'priority') {
    customElem.innerHTML = `10-25% Off`;
  } else {
    customElem.innerHTML = `Tailored`;
  }
}

// Auto-Advancing Testimonials Carousel Logic
let currentSlide = 0;
const track = document.getElementById('testimonial-track');
const dots = document.querySelectorAll('#carousel-nav .dot');
const totalSlides = dots.length;
let autoSlideTimer;

function setSlide(index) {
  currentSlide = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  setSlide(currentSlide);
}

function startAutoSlide() {
  autoSlideTimer = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideTimer);
}

startAutoSlide();
const carouselElem = document.getElementById('testimonial-carousel');
carouselElem.addEventListener('mouseenter', stopAutoSlide);
carouselElem.addEventListener('mouseleave', startAutoSlide);

// Contact Form Handler
function handleFormSubmit(e) {
  e.preventDefault();
  alert("Thank you for your message! COLDZ Studio will respond shortly.");
  e.target.reset();
}
