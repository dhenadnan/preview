// Product Image Carousel
document.addEventListener('DOMContentLoaded', function() {
    // Hero carousel
    const heroImages = document.querySelectorAll('.hero-carousel img');
    let currentHeroIndex = 0;
    
    if (heroImages.length > 0) {
        setInterval(() => {
            heroImages[currentHeroIndex].classList.remove('active');
            heroImages[currentHeroIndex].classList.add('prev');
            
            currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
            
            heroImages[currentHeroIndex].classList.remove('prev');
            heroImages[currentHeroIndex].classList.add('active');
            
            // Remove prev class after transition
            setTimeout(() => {
                heroImages.forEach(img => img.classList.remove('prev'));
            }, 800);
        }, 4000);
    }
    
    // Initialize product image carousels with manual controls
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        const images = item.querySelectorAll('.product-images img');
        const indicators = item.querySelectorAll('.indicator');
        const prevBtn = item.querySelector('.prev-btn');
        const nextBtn = item.querySelector('.next-btn');
        let currentIndex = 0;

        const updateCarousel = (newIndex, direction = 'right') => {
    if (newIndex === currentIndex) return;

    const currentImg = images[currentIndex];
    const newImg = images[newIndex];

    // Reset semua class
    images.forEach(img => img.classList.remove('slide-left', 'slide-right', 'active', 'enter-left', 'enter-right'));

    if (direction === 'right') {
        // gambar lama keluar ke kiri
        currentImg.classList.add('slide-left');

        // gambar baru start dari kanan
        newImg.classList.add('enter-right');
        void newImg.offsetWidth; // reflow
        newImg.classList.add('active');
        newImg.classList.remove('enter-right');
    } else {
        // gambar lama keluar ke kanan
        currentImg.classList.add('slide-right');

        // gambar baru start dari kiri
        newImg.classList.add('enter-left');
        void newImg.offsetWidth; // reflow
        newImg.classList.add('active');
        newImg.classList.remove('enter-left');
    }

    // Update indikator
    indicators[currentIndex].classList.remove('active');
    indicators[newIndex].classList.add('active');

    currentIndex = newIndex;
};



        // Next button
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newIndex = (currentIndex + 1) % images.length;
            updateCarousel(newIndex, 'right');
        });

        // Previous button
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
            updateCarousel(newIndex, 'left');
        });

        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                if (index > currentIndex) {
                    updateCarousel(index, 'right');
                } else if (index < currentIndex) {
                    updateCarousel(index, 'left');
                }
            });
        });

        // Auto-rotate images every 5 seconds
        setInterval(() => {
            const newIndex = (currentIndex + 1) % images.length;
            updateCarousel(newIndex, 'right');
        }, 10000);
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // WhatsApp floating button animation
    const floatingWa = document.querySelector('.floating-wa');
    
    // Add click tracking for analytics (optional)
    floatingWa.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('WhatsApp button clicked');
    });
    
    // Product CTA click tracking
    const productCTAs = document.querySelectorAll('.product-cta');
    
    productCTAs.forEach(cta => {
        cta.addEventListener('click', (e) => {
            const productName = e.target.closest('.product-item').querySelector('h3').textContent;
            console.log(`Product CTA clicked: ${productName}`);
        });
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navMenuLinks = document.querySelectorAll('.nav-menu a');
        navMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Lazy loading for images (performance optimization)
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Form validation (if contact form is added later)
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    };
    
    // Scroll to top functionality
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // Add scroll to top button if page is long
    let scrollTopBtn;
    
    const createScrollTopBtn = () => {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: var(--primary-brown);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            z-index: 999;
        `;
        
        scrollTopBtn.addEventListener('click', scrollToTop);
        document.body.appendChild(scrollTopBtn);
    };
    
    createScrollTopBtn();
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Performance optimization: Debounce scroll events
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    const debouncedScroll = debounce(() => {
        // Scroll-based animations or calculations
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
});

// Utility functions
const utils = {
    // Format phone number for WhatsApp
    formatPhoneForWhatsApp: (phone) => {
        return phone.replace(/\D/g, '').replace(/^0/, '62');
    },
    
    // Generate WhatsApp URL with message
    generateWhatsAppURL: (phone, message) => {
        const formattedPhone = utils.formatPhoneForWhatsApp(phone);
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Animate counter numbers
    animateCounter: (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
};

// Export utils for potential use in other scripts
window.MebelUtils = utils;

// Testimonials carousel
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevTestimonial = document.querySelector('.prev-testimonial');
const nextTestimonial = document.querySelector('.next-testimonial');
let currentTestimonialIndex = 0;

let isAnimating = false; // flag animasi

if (testimonialItems.length > 0) {
    const updateTestimonial = (newIndex, direction = 'right') => {
        if (newIndex === currentTestimonialIndex || isAnimating) return;

        isAnimating = true; // lock

        const currentItem = testimonialItems[currentTestimonialIndex];
        const newItem = testimonialItems[newIndex];

        // Reset
        testimonialItems.forEach(item => {
            item.classList.remove('slide-left', 'slide-right', 'active', 'enter-left', 'enter-right');
        });

        if (direction === 'right') {
            // current keluar kiri
            currentItem.classList.add('slide-left');
            currentItem.classList.remove('active');

            // new masuk dari kanan
            newItem.classList.add('enter-right');
            void newItem.offsetWidth; 
            newItem.classList.add('active');
            newItem.classList.remove('enter-right');
        } else {
            // current keluar kanan
            currentItem.classList.add('slide-right');
            currentItem.classList.remove('active');

            // new masuk dari kiri
            newItem.classList.add('enter-left');
            void newItem.offsetWidth; 
            newItem.classList.add('active');
            newItem.classList.remove('enter-left');
        }

        // Update dots
        testimonialDots[currentTestimonialIndex].classList.remove('active');
        testimonialDots[newIndex].classList.add('active');

        currentTestimonialIndex = newIndex;

        // Unlock setelah animasi selesai
        setTimeout(() => {
            isAnimating = false;
        }, 700); // sama dengan durasi CSS transition
    };

    // Next
    nextTestimonial.addEventListener('click', () => {
        const newIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
        updateTestimonial(newIndex, 'right');
    });

    // Prev
    prevTestimonial.addEventListener('click', () => {
        const newIndex = currentTestimonialIndex === 0 ? testimonialItems.length - 1 : currentTestimonialIndex - 1;
        updateTestimonial(newIndex, 'left');
    });

    // Dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index > currentTestimonialIndex) {
                updateTestimonial(index, 'right');
            } else if (index < currentTestimonialIndex) {
                updateTestimonial(index, 'left');
            }
        });
    });

    // Auto-rotate
    setInterval(() => {
        const newIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
        updateTestimonial(newIndex, 'right');
    }, 6000);
}
