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

    // Cloud-focused sample data (fallback when no NewsAPI key provided)
    const sampleHeadlines = [
        {source: 'Stratoscloud', title: 'Multi-region control planes become default for resilience', category: 'Architecture', timeOffsetMins: 8},
        {source: 'Stratoscloud', title: 'Serverless containers gain predictable cold-start guarantees', category: 'Serverless', timeOffsetMins: 22},
        {source: 'Stratoscloud', title: 'New managed Confidential VMs announced across major providers', category: 'Security', timeOffsetMins: 35},
        {source: 'Stratoscloud', title: 'Open-source tooling standardizes cloud cost observability', category: 'FinOps', timeOffsetMins: 50}
    ];

    const sampleTips = [
        {title: 'Optimize object storage lifecycle', body: 'Use lifecycle policies to tier older objects to colder, cheaper storage and reduce monthly costs.'},
        {title: 'Right-size instances with confidence', body: 'Leverage workload sampling and CPU/memory profiles before resizing to avoid performance regressions.'},
        {title: 'Design for failure', body: 'Architect services across AZs/regions and use health checks + automated failover.'}
    ];

    const sampleTools = [
        {name: 'k9s', desc: 'Terminal UI to interact with Kubernetes clusters.'},
        {name: 'Prometheus + Grafana', desc: 'Open-source monitoring and visualization stack for observability.'},
        {name: 'Terragrunt', desc: 'Thin wrapper for Terraform that provides DRY patterns for multi-environment infra.'}
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

    // --- Experts & Upcoming ---
    const expertsListEl = document.getElementById('experts-list');
    const upcomingListEl = document.getElementById('upcoming-list');

    const sampleExperts = [
        {name: 'Aisha Khan', title: 'Cloud Reliability Lead, NovaCloud', bio: 'Champion of multi-region control planes and self-healing systems.', twitter: '@aishakhan', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60', profileUrl: 'https://twitter.com/aishakhan'},
        {name: 'Luis Moreno', title: 'Principal Security Engineer, OpenDefend', bio: 'Builds cloud runtime protections and supply-chain defenses.', twitter: '@lmoreno_sec', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?auto=format&fit=crop&w=400&q=60', profileUrl: 'https://twitter.com/lmoreno_sec'},
        {name: 'Chen Wei', title: 'Director, Distributed Systems, Qube', bio: 'Engineer focused on consensus, orchestration, and edge patterns.', twitter: '@chenwei_sys', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=60', profileUrl: 'https://twitter.com/chenwei_sys'},
        {name: 'Elena Petrova', title: 'AI & Cloud Ethics, ThoughtFrame', bio: 'Researches safe ML deployment, governance and responsible inference.', twitter: '@elenapetrova', avatar: 'https://images.unsplash.com/photo-1531123414780-f0b2b29d2d6b?auto=format&fit=crop&w=400&q=60', profileUrl: 'https://twitter.com/elenapetrova'}
    ];

    const sampleUpcoming = [
        {title: 'Provider-native confidential compute expands', desc: 'More regions and managed services will support confidential VMs and enclaves this year.'},
        {title: 'Cross-cloud networking primitives standardize', desc: 'Expect improved APIs and tooling for secure cross-cloud connectivity and service mesh federation.'},
        {title: 'Edge cloud platforms for real-time inference', desc: 'New offerings will bring LLM inference closer to devices with low-latency guarantees.'},
        {title: 'Billing models evolve for sustainable workloads', desc: 'New per-inference and burst-based pricing options will appear to support ML workloads.'}
    ];

    function renderExperts() {
        if (!expertsListEl) return;
        expertsListEl.innerHTML = '';
        sampleExperts.forEach(ex => {
            const card = document.createElement('div');
            card.className = 'expert-card';
            card.innerHTML = `
                <div class="expert-top">
                    <img src="${escapeHtml(ex.avatar || '')}" alt="${escapeHtml(ex.name)}" class="expert-avatar">
                    <div class="expert-info">
                        <h4>${escapeHtml(ex.name)}</h4>
                        <p class="expert-title">${escapeHtml(ex.title)}</p>
                    </div>
                </div>
                <p class="expert-bio">${escapeHtml(ex.bio)}</p>
                <p class="expert-twitter"><a href="${escapeHtml(ex.profileUrl || '#')}" target="_blank" rel="noopener noreferrer">${escapeHtml(ex.twitter || '')}</a></p>
            `;
            expertsListEl.appendChild(card);
        });
    }

    function renderUpcoming() {
        if (!upcomingListEl) return;
        // Keep the header, render list below
        upcomingListEl.querySelectorAll('.upcoming-item').forEach(n => n.remove());
        sampleUpcoming.forEach(item => {
            const el = document.createElement('div');
            el.className = 'upcoming-item';
            el.innerHTML = `<strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.desc)}</p>`;
            upcomingListEl.appendChild(el);
        });
    }

    renderExperts();
    renderUpcoming();

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