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
            const heroCarousel = document.querySelector('.hero-carousel');
            const aboutHero = document.querySelector('.about-hero');
            const heroElement = heroCarousel || aboutHero;

            if (heroElement) {
                const heroHeight = heroElement.offsetHeight;

                // If we're still in the hero section (dark background)
                if (scrollY < heroHeight - 100) {
                    navbar.classList.remove('navbar-light');
                    if (floatingLogo) floatingLogo.classList.remove('logo-dark');
                    if (floatingLogoImg && window.whiteLogo) floatingLogoImg.src = window.whiteLogo;
                } else {
                    // We're in light sections
                    navbar.classList.add('navbar-light');
                    if (floatingLogo) floatingLogo.classList.add('logo-dark');
                    if (floatingLogoImg && window.blackLogo) floatingLogoImg.src = window.blackLogo;
                }
            } else {
                // For pages without a hero, default to light navbar
                navbar.classList.add('navbar-light');
                if (floatingLogo) floatingLogo.classList.add('logo-dark');
                if (floatingLogoImg && window.blackLogo) floatingLogoImg.src = window.blackLogo;
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

// Dropdown Navigation
document.addEventListener('DOMContentLoaded', function () {
    const desktopDropdowns = document.querySelectorAll('.header-nav .nav-dropdown');

    desktopDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');

        if (toggle) {
            toggle.addEventListener('click', function (e) {
                if (window.innerWidth > 1024) {
                    if (toggle.getAttribute('href') === '#') {
                        e.preventDefault();
                    }
                }
            });
        }
    });
});