document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when a navigation link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // 2. Portfolio Category Filtering
  const filterButtons = document.querySelectorAll('.tab-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 3. Scroll Fade-In Animation (IntersectionObserver)
  const fadeInElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, observerOptions);

  fadeInElements.forEach(element => {
    observer.observe(element);
  });

  // 4. Contact Form Handler (Submits to Web3Forms via Fetch API)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;

      // Disable button and show sending state
      submitBtn.disabled = true;
      submitBtn.innerText = 'Sending...';
      formStatus.innerText = '';

      // Prepare form data for Web3Forms API
      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });

        const result = await response.json();

        if (response.status === 200) {
          formStatus.style.color = '#1040A0'; // Primary Blue
          formStatus.innerText = 'Success! Your message has been sent to COLDZ Studio.';
          contactForm.reset();
        } else {
          formStatus.style.color = '#E52E2E'; // Red Accent
          formStatus.innerText = result.message || 'Something went wrong. Please try again.';
        }
      } catch (error) {
        formStatus.style.color = '#E52E2E';
        formStatus.innerText = 'Network error. Please check your internet connection.';
      } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    });
  }

});