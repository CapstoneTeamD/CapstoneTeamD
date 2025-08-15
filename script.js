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
    // Initialize - show first testimonial (if any)
    try {
        showTestimonial(0);
    } catch (e) {
        // ignore if testimonial elements missing
    }

    // --- IT Pulse: Live Feed, Tips & Tools ---
    const feedEl = document.getElementById('feed');
    const lastUpdatedEl = document.getElementById('last-updated');
    const refreshBtn = document.getElementById('refresh-feed');
    const autoUpdateCheckbox = document.getElementById('auto-update');
    const tipsGrid = document.getElementById('tips-grid');
    const toolsList = document.getElementById('tools-list');

    // Sample data (in a real app, you'd call external APIs)
    const sampleHeadlines = [
        {source: 'Reuters', title: 'Major cloud provider reports outage affecting thousands', category: 'Cloud', timeOffsetMins: 5},
        {source: 'The Verge', title: 'New smartphone chipset promises big AI gains', category: 'Hardware', timeOffsetMins: 12},
        {source: 'ZDNet', title: 'Critical zero-day patched in popular web server', category: 'Security', timeOffsetMins: 20},
        {source: 'TechCrunch', title: 'Startups raise $200M for developer tooling', category: 'Business', timeOffsetMins: 30},
        {source: 'Wired', title: 'How to harden your home Wi‑Fi network', category: 'Advice', timeOffsetMins: 45}
    ];

    const sampleTips = [
        {title: 'Quickly check open ports on macOS', body: 'Use: lsof -iTCP -sTCP:LISTEN -n -P to list listening ports and owning processes.'},
        {title: 'Secure your SSH', body: 'Disable root login, use key-based auth, and change the default port to reduce noise.'},
        {title: 'Browser privacy', body: 'Use container or profile-based browsing for accounts and enable tracking protection.'}
    ];

    const sampleTools = [
        {name: 'htop', desc: 'Interactive process viewer for Unix systems.'},
        {name: 'jq', desc: 'Lightweight and flexible JSON processor.'},
        {name: 'nmap', desc: 'Network discovery and security auditing tool.'}
    ];

    function renderFeed(items) {
        if (!feedEl) return;
        feedEl.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('article');
            card.className = 'feed-card';
            card.innerHTML = `
                <h3 class="feed-title">${escapeHtml(item.title)}</h3>
                <p class="feed-meta"><strong>${escapeHtml(item.source)}</strong> • ${escapeHtml(item.category)} • ${formatTime(item.date)}</p>
                <p class="feed-body">${escapeHtml(item.summary || '')}</p>
            `;
            feedEl.appendChild(card);
        });
    }

    function formatTime(d) {
        const now = new Date();
        const diff = Math.round((now - d) / 60000); // minutes
        if (diff < 1) return 'just now';
        if (diff === 1) return '1 minute ago';
        if (diff < 60) return `${diff} minutes ago`;
        return d.toLocaleString();
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, function (c) {
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c];
        });
    }

    function buildFeed() {
        // Create feed items based on sample data with timestamps
        const now = new Date();
        const items = sampleHeadlines.map(h => ({
            ...h,
            date: new Date(now - (h.timeOffsetMins * 60000)),
            summary: ''
        }));
        // Add a simulated breaking item occasionally
        if (Math.random() > 0.7) {
            items.unshift({source: 'Breaking', title: 'Investigating reports of a global phishing campaign targeting developers', category: 'Security', date: new Date(), summary: 'We are seeing coordinated phishing emails targeting developer tools and CI systems.'});
        }
        return items;
    }

    async function fetchNewsAPI(key) {
        // Fetch top technology headlines from NewsAPI.org
        // Note: using a client-side API key exposes it to users. For production use a server proxy.
        const url = `https://newsapi.org/v2/top-headlines?category=technology&pageSize=12&language=en&apiKey=${encodeURIComponent(key)}`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Network response was not ok');
            const json = await res.json();
            if (json.status !== 'ok' || !Array.isArray(json.articles)) throw new Error('Invalid response');
            return json.articles.map(a => ({
                source: (a.source && a.source.name) || 'News',
                title: a.title || 'Untitled',
                category: a.category || 'Tech',
                date: a.publishedAt ? new Date(a.publishedAt) : new Date(),
                summary: a.description || ''
            }));
        } catch (err) {
            console.warn('NewsAPI fetch failed:', err);
            return null;
        }
    }

    async function updateFeed() {
        let items = null;
        const key = (typeof window !== 'undefined' && window.NEWSAPI_KEY) ? window.NEWSAPI_KEY : null;
        if (key) {
            // try live fetch; fallback to sample if there's an error
            items = await fetchNewsAPI(key);
        }
        if (!items || items.length === 0) {
            items = buildFeed();
        }
        renderFeed(items);
        const now = new Date();
        if (lastUpdatedEl) lastUpdatedEl.textContent = `Last updated: ${now.toLocaleString()}`;
    }

    // initial render
    updateFeed();

    // Auto-update hourly (for demo we'll use 1 minute if in dev)
    let autoInterval = null;
    function startAutoUpdate() {
        stopAutoUpdate();
        // hourly in production: 60 * 60 * 1000
        const intervalMs = 60 * 60 * 1000;
        // For demo, use 60s if running on localhost (we'll still use 60s here to be visible)
        const useMs = 60 * 1000;
        autoInterval = setInterval(updateFeed, useMs);
    }

    function stopAutoUpdate() {
        if (autoInterval) clearInterval(autoInterval);
        autoInterval = null;
    }

    if (autoUpdateCheckbox && autoUpdateCheckbox.checked) startAutoUpdate();

    if (refreshBtn) refreshBtn.addEventListener('click', () => {
        updateFeed();
    });

    if (autoUpdateCheckbox) autoUpdateCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) startAutoUpdate(); else stopAutoUpdate();
    });

    // Render tips and tools
    function renderTips() {
        if (!tipsGrid) return;
        tipsGrid.innerHTML = '';
        sampleTips.forEach(t => {
            const card = document.createElement('div');
            card.className = 'tip-card';
            card.innerHTML = `<h3>${escapeHtml(t.title)}</h3><p>${escapeHtml(t.body)}</p>`;
            tipsGrid.appendChild(card);
        });
    }

    function renderTools() {
        if (!toolsList) return;
        toolsList.innerHTML = '';
        sampleTools.forEach(t => {
            const item = document.createElement('div');
            item.className = 'tool-item';
            item.innerHTML = `<h4>${escapeHtml(t.name)}</h4><p>${escapeHtml(t.desc)}</p>`;
            toolsList.appendChild(item);
        });
    }

    renderTips();
    renderTools();

    // Signup form: simple UX
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(signupForm);
            const email = formData.get('email');
            alert(`Thanks! ${email} has been subscribed (demo).`);
            signupForm.reset();
        });
    }
});