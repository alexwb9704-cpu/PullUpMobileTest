// ===================================
// Mobile Menu Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });
        
        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
});

// ===================================
// Gallery Filter
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items with animation
                galleryItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        // Show item with staggered animation
                        setTimeout(() => {
                            item.style.display = 'block';
                            item.style.animation = 'fadeInUp 0.4s ease forwards';
                        }, index * 50);
                    } else {
                        // Hide item
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});

// ===================================
// Contact Form Handling
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.phone || !data.service || !data.location) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real implementation, you would send this to a server
            // For now, we'll just simulate a successful submission
            console.log('Form submitted:', data);
            
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Optionally, scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // In a real implementation, you might want to:
            // 1. Send data to a server endpoint
            // 2. Send an email notification
            // 3. Integrate with a CRM
            // Example:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your form. Please try again or call us directly.');
            });
            */
        });
    }
});

// ===================================
// Phone Number Formatting
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove all non-numeric characters
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as (XXX) XXX-XXXX
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '(' + value;
                } else if (value.length <= 6) {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
                } else {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            
            e.target.value = value;
        });
    }
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===================================
// Intersection Observer for Fade-in Animations
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.value-card, .service-card, .why-item, .gallery-item, .faq-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// ===================================
// Sticky Header with Shadow on Scroll
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
            
            lastScroll = currentScroll;
        });
    }
});

// ===================================
// Form Validation Enhancements
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    formInputs.forEach(input => {
        // Add real-time validation feedback
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc2626';
            } else {
                this.style.borderColor = '';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#4a90e2';
        });
        
        input.addEventListener('input', function() {
            if (this.hasAttribute('required') && this.value.trim()) {
                this.style.borderColor = '#10b981';
            }
        });
    });
});

// ===================================
// Email Validation
// ===================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// Keyboard Navigation Enhancement
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Escape key closes mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Trap focus in mobile menu when open
    const mobileMenu = document.querySelector('.nav-menu');
    if (mobileMenu) {
        const focusableElements = mobileMenu.querySelectorAll('a, button');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        mobileMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' && mobileMenu.classList.contains('active')) {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }
});

// ===================================
// Gallery Image Lazy Loading Simulation
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-item-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.5s ease';
                    imageObserver.unobserve(entry.target);
                }
            });
        });
        
        galleryImages.forEach(img => imageObserver.observe(img));
    }
});

// ===================================
// Performance: Debounce Function
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// Console Welcome Message (Optional)
// ===================================
console.log('%cPull-Up Mobile Window Tinting', 'font-size: 20px; font-weight: bold; color: #4a90e2;');
console.log('%cServing Columbia, SC since 2017', 'font-size: 14px; color: #6b7280;');
console.log('%cCall us: 803-999-0448', 'font-size: 14px; color: #1a2332;');
