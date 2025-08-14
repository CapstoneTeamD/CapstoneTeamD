document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Pause auto-rotation on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    });
    
    // Age Range Slider
    const ageMin = document.getElementById('age-min');
    const ageMax = document.getElementById('age-max');
    const minAgeValue = document.getElementById('min-age');
    const maxAgeValue = document.getElementById('max-age');
    
    ageMin.addEventListener('input', function() {
        if (parseInt(ageMax.value) < parseInt(this.value)) {
            ageMax.value = this.value;
            maxAgeValue.textContent = this.value;
        }
        minAgeValue.textContent = this.value;
    });
    
    ageMax.addEventListener('input', function() {
        if (parseInt(ageMin.value) > parseInt(this.value)) {
            ageMin.value = this.value;
            minAgeValue.textContent = this.value;
        }
        maxAgeValue.textContent = this.value;
    });
    
    // Modal Handling - Updated with proper close functionality
const loginModal = document.getElementById('login-modal');
const profileModal = document.getElementById('profile-modal');
const loginBtns = document.querySelectorAll('.login-btn, .switch-tab[data-tab="login"]');
const signupBtns = document.querySelectorAll('.btn-primary:not(.login-btn), .switch-tab[data-tab="signup"]');
const closeModalBtns = document.querySelectorAll('.close-modal');
const viewProfileBtns = document.querySelectorAll('.profile-actions .btn-outline');

// Open Login Modal
loginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Switch to login tab if coming from switch link
        if (btn.classList.contains('switch-tab')) {
            const loginTab = document.querySelector('.tab-btn[data-tab="login"]');
            loginTab.click();
        }
    });
});

// Open Signup Modal
signupBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Only prevent default if it's not a "Next" button in pagination
        if (!btn.classList.contains('pagination') && !btn.classList.contains('profile-actions')) {
            e.preventDefault();
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Switch to signup tab if coming from switch link
            if (btn.classList.contains('switch-tab')) {
                const signupTab = document.querySelector('.tab-btn[data-tab="signup"]');
                signupTab.click();
            }
        }
    });
});

// View Profile Modal
viewProfileBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        profileModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close Modals - Updated with better event handling
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Stop event propagation to prevent bubbling to window click handler
        e.stopPropagation();
        loginModal.style.display = 'none';
        profileModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside - Updated with better targeting
window.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target === profileModal) {
        loginModal.style.display = 'none';
        profileModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
    // Tab Switching in Modal
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(tb => tb.classList.remove('active'));
            btn.classList.add('active');
            
            // Show corresponding tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation - check if required fields are filled
            const inputs = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'var(--danger-color)';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // In a real app, you would submit the form here
                alert('Form submitted successfully!');
                if (form.closest('.modal')) {
                    form.closest('.modal').style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if (pageYOffset >= (sectionTop - navbarHeight - 50)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Initialize - show first testimonial
    showTestimonial(0);
});