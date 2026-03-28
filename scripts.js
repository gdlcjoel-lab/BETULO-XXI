document.addEventListener('DOMContentLoaded', () => {
    
    // 1. NAVBAR SCROLL EFFECT
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  
    // 2. MOBILE MENU TOGGLE
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
  
    // 3. NUMBER COUNTER ANIMATION (Intersection Observer)
    const counterElement = document.querySelector('.counter-number');
    let counted = false;

    if (counterElement) {
        const targetNumber = parseInt(counterElement.getAttribute('data-target') || '1200', 10);
        
        const animateCounter = () => {
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                if (elapsedTime < duration) {
                    const progress = elapsedTime / duration;
                    // Ease out expo for smooth slowdown
                    const currentNumber = Math.floor(targetNumber * (1 - Math.pow(2, -10 * progress)));
                    counterElement.innerText = `+${currentNumber}`;
                    requestAnimationFrame(updateCounter);
                } else {
                    counterElement.innerText = `+${targetNumber}`;
                }
            };
            requestAnimationFrame(updateCounter);
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                counted = true;
                animateCounter();
            }
        }, { threshold: 0.5 });
        
        observer.observe(counterElement);
    }
  
    // 4. FAQ ACCORDION LOGIC
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
});
