// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavPanel = document.getElementById('mobileNavPanel');
    const body = document.body;

    function toggleMenu() {
        if (!mobileMenuBtn || !mobileNavPanel) return;
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';

        // Toggle classes
        mobileNavPanel.classList.toggle('is-open');
        body.classList.toggle('menu-open');

        // Update aria-expanded attribute
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);

        // Prevent body scroll when menu is open
        if (!isExpanded) {
            document.documentElement.style.overflow = 'hidden';
            body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
            body.style.overflow = '';
        }
    }

    function closeMenu() {
        if (!mobileMenuBtn || !mobileNavPanel) return;
        mobileNavPanel.classList.remove('is-open');
        body.classList.remove('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.documentElement.style.overflow = '';
        body.style.overflow = '';
    }

    // Event Listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking on navigation links
    if (mobileNavPanel) {
        const navLinks = mobileNavPanel.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && body.classList.contains('menu-open')) {
            closeMenu();
        }
    });

    // Close menu on window resize to desktop
    function handleResize() {
        if (window.innerWidth > 1023 && body.classList.contains('menu-open')) {
            closeMenu();
        }
    }

    window.addEventListener('resize', handleResize);
});

// Navbar Scroll Effect
document.addEventListener('DOMContentLoaded', function () {
    let scrollTimer = null;
    const navbar = document.getElementById('siteHeader');
    const floatingLogo = document.getElementById('floatingLogo');
    const floatingLogoImg = document.getElementById('floatingLogoImg');

    // These will be overridden by the inline script in default.hbs if needed for asset paths
    // but we can try to guess or use the ones existing in DOM
    const whiteLogo = floatingLogoImg ? floatingLogoImg.getAttribute('src') : '';

    function handleScroll() {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }

        scrollTimer = setTimeout(function () {
            const scrollY = window.pageYOffset;

            if (!navbar) return;

            // Add scrolled class after 100px
            if (scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }

            // Detect section backgrounds
            // Check for various hero section classes across different pages
            const heroSelectors = [
                '.hero-carousel',
                '.about-hero',
                '.capacity-hero',
                '.resources-hero',
                '.research-hero',
                '.outreach-hero',
                '.media-hero',
                '.resourcecreation-hero',
                '.approach-hero',
                '.rc-hero'
            ];

            let heroElement = null;
            for (const selector of heroSelectors) {
                const el = document.querySelector(selector);
                if (el) {
                    heroElement = el;
                    break;
                }
            }

            if (heroElement) {
                const heroHeight = heroElement.offsetHeight;
                const isMinimal = heroElement.classList.contains('hero-minimal');

                // Threshold for switching - usually near the bottom of hero
                const threshold = heroHeight - 80;

                if (scrollY < threshold && !isMinimal) {
                    // Dark background (hero)
                    navbar.classList.remove('navbar-light');
                    navbar.classList.add('navbar-dark');
                    if (floatingLogo) floatingLogo.classList.remove('logo-dark');
                    if (floatingLogoImg && window.whiteLogo) {
                        if (floatingLogoImg.src !== window.whiteLogo) {
                            floatingLogoImg.src = window.whiteLogo;
                        }
                    }
                } else {
                    // Light background (content or minimal hero)
                    navbar.classList.add('navbar-light');
                    navbar.classList.remove('navbar-dark');
                    if (floatingLogo) floatingLogo.classList.add('logo-dark');
                    if (floatingLogoImg && window.blackLogo) {
                        if (floatingLogoImg.src !== window.blackLogo) {
                            floatingLogoImg.src = window.blackLogo;
                        }
                    }
                }
            } else {
                // For pages without a hero section, default to light navbar (black logo)
                navbar.classList.add('navbar-light');
                navbar.classList.remove('navbar-dark');
                if (floatingLogo) floatingLogo.classList.add('logo-dark');
                if (floatingLogoImg && window.blackLogo) {
                    if (floatingLogoImg.src !== window.blackLogo) {
                        floatingLogoImg.src = window.blackLogo;
                    }
                }
            }
        }, 10);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
});

// Hero Carousel
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (slides[index]) slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance carousel every 5 seconds
    setInterval(nextSlide, 5000);

    // Read More Button - Smooth Scroll
    const readMoreBtn = document.getElementById('readMoreBtn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function () {
            const carousel = document.querySelector('.hero-carousel');
            const nextSection = carousel.nextElementSibling;

            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Search Dropdown Functionality
document.addEventListener('DOMContentLoaded', function () {
    const searchToggle = document.getElementById('searchToggle');
    const searchDropdown = document.getElementById('searchDropdown');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (!searchToggle || !searchDropdown || !searchInput || !searchResults) return;

    // Search Index Data (Mocking content for the theme)
    const searchIndex = [
        { title: 'Home', url: '/' },
        { title: 'About Us', url: '/about/' },
        { title: 'Vision & Goals', url: '/about/#vision' },
        { title: 'Nature Classrooms in Media', url: '/media/' },
        { title: 'Our Work: Resource Creation', url: '/resourcecreation/' },
        { title: 'Our Work: Capacity Building & Training', url: '/capacity/' },
        { title: 'Our Work: Research', url: '/research/' },
        { title: 'Our Work: Outreach & Public Engagement', url: '/outreach/' },
        { title: 'Resources: All', url: '/resources/' },
        { title: 'Resources: Bingos', url: '/resources/bingos/' },
        { title: 'Resources: Alphabet Charts', url: '/resources/alphabet-charts/' },
        { title: 'Resources: Anchor Charts', url: '/resources/anchor-charts/' },
        { title: 'Resources: Natural History', url: '/resources/natural-history/' },
        { title: 'Resources: Modules', url: '/resources/modules/' },
        { title: 'Resources: Activities', url: '/resources/activities/' },
        { title: 'Resources: There\'s Nothing There', url: '/resources/theres-nothing-there/' },
        { title: 'Our Approach', url: '/our-approach/' },
        { title: 'Our Approach: Pedagogy', url: '/our-approach/#pedagogy' },
        { title: 'Our Approach: Framework', url: '/our-approach/#framework' },
        { title: 'Blog', url: '/blog/' },
        { title: 'Suttha Muttha Project', url: '/resourcecreation/#featured' },
        { title: 'Nature Learning Checklist', url: '/our-approach/#checklist' }
    ];

    function toggleSearch(e) {
        e.stopPropagation();
        const isActive = searchDropdown.classList.contains('is-active');

        if (!isActive) {
            searchDropdown.classList.add('is-active');
            searchToggle.classList.add('is-active');
            setTimeout(() => searchInput.focus(), 100);
        } else {
            closeSearch();
        }
    }

    function closeSearch() {
        searchDropdown.classList.remove('is-active');
        searchToggle.classList.remove('is-active');
        searchInput.value = '';
        renderResults([]);
    }

    function handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            renderResults([]);
            return;
        }

        const filtered = searchIndex.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.url.toLowerCase().includes(query)
        );

        renderResults(filtered);
    }

    function renderResults(results) {
        searchResults.innerHTML = '';

        results.forEach(result => {
            const li = document.createElement('li');
            li.className = 'search-result-item';
            li.innerHTML = `
                <a href="${result.url}">
                    <span class="search-result-title">${result.title}</span>
                </a>
            `;
            searchResults.appendChild(li);
        });
    }

    // Event Listeners
    searchToggle.addEventListener('click', toggleSearch);
    searchInput.addEventListener('input', handleSearch);

    // Close on click outside
    document.addEventListener('click', function (e) {
        if (!searchDropdown.contains(e.target) && !searchToggle.contains(e.target)) {
            closeSearch();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeSearch();
        }
    });

    // Prevent search dropdown from closing when clicking inside
    searchDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});
// Team Card Expansion Functionality
document.addEventListener('DOMContentLoaded', function () {
    const teamCards = document.querySelectorAll('.team-card');

    teamCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Check if user clicked a link inside the card
            if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) {
                return;
            }

            const isExpanded = this.classList.contains('expanded');

            // Close other expanded cards first
            document.querySelectorAll('.team-card.expanded').forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('expanded');
                }
            });

            // Toggle expansion
            this.classList.toggle('expanded');
        });
    });
});
