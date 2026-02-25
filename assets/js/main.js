// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavPanel = document.getElementById('mobileNavPanel');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const body = document.body;

    function openMenu() {
        if (!mobileMenuBtn || !mobileNavPanel) return;
        mobileNavPanel.classList.add('is-open');
        body.classList.add('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.documentElement.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (!mobileMenuBtn || !mobileNavPanel) return;
        mobileNavPanel.classList.remove('is-open');
        body.classList.remove('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.documentElement.style.overflow = '';
        body.style.overflow = '';
    }

    function toggleMenu() {
        if (!mobileNavPanel) return;
        if (mobileNavPanel.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Event Listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    // Close button
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMenu);
    }

    // Overlay click
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on navigation links (non-dropdown toggles)
    if (mobileNavPanel) {
        const navLinks = mobileNavPanel.querySelectorAll('.mobile-nav a:not(.nav-dropdown-toggle)');
        navLinks.forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }

    // Mobile dropdown toggles — only the arrow buttons toggle the dropdown
    if (mobileNavPanel) {
        const dropdownArrows = mobileNavPanel.querySelectorAll('.mobile-nav .mobile-dropdown-arrow');
        dropdownArrows.forEach(function (arrow) {
            arrow.addEventListener('click', function (e) {
                e.preventDefault();
                var parent = this.closest('.nav-dropdown');
                // Close other open dropdowns
                var siblings = mobileNavPanel.querySelectorAll('.mobile-nav .nav-dropdown.is-open');
                siblings.forEach(function (sib) {
                    if (sib !== parent) sib.classList.remove('is-open');
                });
                parent.classList.toggle('is-open');
            });
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
        if (window.innerWidth > 1024 && body.classList.contains('menu-open')) {
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
                '.rc-hero',
                '.wm-hero',
                '.nm-hero',
                '.ns-hero',
                '.sm-hero',
                '.neaf-hero',
                '.nbsel-hero',
                '.cnc-hero',
                '.cop-hero',
                '.nem-hero'
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
                    // Dark background (hero) — no blur bg on logo
                    navbar.classList.remove('navbar-light');
                    navbar.classList.add('navbar-dark');
                    if (floatingLogo) {
                        floatingLogo.classList.remove('logo-dark');
                        floatingLogo.classList.remove('logo-bg');
                    }
                    if (floatingLogoImg && window.whiteLogo) {
                        if (floatingLogoImg.src !== window.whiteLogo) {
                            floatingLogoImg.src = window.whiteLogo;
                        }
                    }
                } else {
                    // Light background (content or minimal hero) — show blur bg on logo
                    navbar.classList.add('navbar-light');
                    navbar.classList.remove('navbar-dark');
                    if (floatingLogo) {
                        floatingLogo.classList.add('logo-dark');
                        floatingLogo.classList.add('logo-bg');
                    }
                    if (floatingLogoImg && window.blackLogo) {
                        if (floatingLogoImg.src !== window.blackLogo) {
                            floatingLogoImg.src = window.blackLogo;
                        }
                    }
                }
            } else {
                // For pages without a hero section, default to light navbar (black logo) + blur bg
                navbar.classList.add('navbar-light');
                navbar.classList.remove('navbar-dark');
                if (floatingLogo) {
                    floatingLogo.classList.add('logo-dark');
                    floatingLogo.classList.add('logo-bg');
                }
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

    // Comprehensive site-wide search index with keywords for word-based matching
    const searchIndex = [
        { title: 'Home', url: '/', keywords: 'home landing welcome nature classrooms education children' },
        { title: 'About Us', url: '/about/', keywords: 'about us team mission vision goals organisation nature classrooms who we are people' },
        { title: 'Nature Classrooms in Media', url: '/media/', keywords: 'media news press coverage articles publications newspaper' },
        { title: 'Resource Creation', url: '/resourcecreation/', keywords: 'resource creation develop design materials curriculum content' },
        { title: 'Capacity Building & Training', url: '/capacity/', keywords: 'capacity building training workshops teachers educators professional development skills' },
        { title: 'Research', url: '/research/', keywords: 'research studies papers findings academic evidence data' },
        { title: 'Outreach & Public Engagement', url: '/outreach/', keywords: 'outreach public engagement events community awareness campaigns' },
        { title: 'Resources', url: '/resources/', keywords: 'resources downloads materials teaching learning tools all' },
        { title: 'Bingos', url: '/resources/bingos/', keywords: 'bingo bingos game nature observation seasonal rain winter summer spring activity' },
        { title: 'Activities', url: '/resources/activities/', keywords: 'activities games outdoor indoor nature play learning fun children' },
        { title: 'Alphabet Charts', url: '/resources/alphabet-charts/', keywords: 'alphabet charts letters language kashmiri tamil gojri gujarati regional script writing' },
        { title: 'Anchor Charts', url: '/resources/anchor-charts/', keywords: 'anchor charts posters visual classroom display reference' },
        { title: 'Natural History', url: '/resources/natural-history/', keywords: 'natural history biodiversity species wildlife flora fauna animals plants' },
        { title: 'Modules', url: '/resources/modules/', keywords: 'modules learning units lesson plans curriculum structured teaching' },
        { title: 'Story Books', url: '/resources/theres-nothing-there/', keywords: 'storybooks stories reading books children narrative tales nothing there' },
        { title: 'There\'s Nothing There — Game', url: '/game/', keywords: 'game play interactive storybook nothing there fun' },
        { title: 'Our Approach', url: '/our-approach/', keywords: 'approach pedagogy methodology teaching philosophy framework nature based learning' },
        { title: 'Nature Classrooms Pedagogy', url: '/our-approach/#pedagogy', keywords: 'pedagogy teaching methods approach nature based experiential learning outdoor' },
        { title: 'Nature Learning Framework', url: '/our-approach/#framework', keywords: 'framework structure model design learning nature checklist assessment' },
        { title: 'Blog', url: '/blog/', keywords: 'blog posts articles updates stories writing news' },
        { title: 'Suttha Muttha Project', url: '/suttha-muttha/', keywords: 'suttha muttha project bangalore nature games immersion workshop animals eat walk children' },
        { title: 'Nature Education Assessment Framework (NEAF)', url: '/nature-education-assessment-framework/', keywords: 'neaf assessment framework evaluation nature education measuring outcomes timeline' },
        { title: 'Nature-Based Social-Emotional Learning', url: '/nature-based-social-emotional-learning/', keywords: 'social emotional learning sel nature based wellbeing mindfulness empathy feelings workshop pilot' },
        { title: 'Children and Nature in the City', url: '/children-nature-city/', keywords: 'children nature city urban biodiversity environment outdoor spaces azim premji' },
        { title: 'Communities of Practice', url: '/communitiesofpractice/', keywords: 'communities practice network educators collaboration peer learning sharing group' },
        { title: 'Nature Educators Meet-ups', url: '/natureeducator/', keywords: 'nature educators meetups gatherings professional community networking meetings events' },
        { title: 'Water Module — Life in Water', url: '/watermodule/', keywords: 'water module aquatic life ecosystems pond river lake marine fish wetlands' },
        { title: 'Nature Moves', url: '/naturemoves/', keywords: 'nature moves movement animals body physical activity dance actions bingo resource' },
        { title: 'Nature Strokes', url: '/naturestrokes/', keywords: 'nature strokes art drawing painting creative illustration sketching' },
        { title: 'Kashmiri Alphabet Charts', url: '/kashmirialphabetcharts/', keywords: 'kashmiri alphabet chart language script letters kashmir coloring cut-outs activity' },
        { title: 'Tamil Alphabet Charts', url: '/tamilalphabetcharts/', keywords: 'tamil alphabet chart language script letters vowels consonants explainer activity' },
        { title: 'Gojri Alphabet Chart', url: '/gojrialphabetchart/', keywords: 'gojri alphabet chart language script letters booklet' },
        { title: 'Gujarati Alphabet Chart', url: '/gujaratialphabetchart/', keywords: 'gujarati alphabet chart language script letters activity sheets' },
        { title: 'Plant Posters', url: '/plantposter/', keywords: 'plant poster tree flower neem milkweed fishtail palm singapore cherry lotus botanical' },
        { title: 'Seasonal Bingos', url: '/seasonal-bingos/', keywords: 'seasonal bingo rain winter spring summer seasons weather observation nature' },
        { title: 'Hidden Housemates', url: '/hidden-housemates/', keywords: 'hidden housemates insects animals home indoor creatures living together' },
        { title: 'Behaviour Tales', url: '/behaviortales/', keywords: 'behaviour tales behavior animal grooming stories charts' },
        { title: 'Nature Learning Checklist', url: '/our-approach/#checklist', keywords: 'checklist learning assessment tracking progress nature goals evaluate' }
    ];

    // Ghost Content API search (works on live Ghost site)
    let ghostApiUrl = null;
    let ghostApiKey = null;

    // Auto-detect Ghost API from meta tags
    const ghostUrlMeta = document.querySelector('meta[name="ghost:api_url"]') ||
                          document.querySelector('link[rel="ghost-api"]');
    const ghostKeyMeta = document.querySelector('meta[name="ghost:api_key"]');

    // Try to detect from the site URL
    if (window.location.origin && !window.location.origin.includes('localhost')) {
        ghostApiUrl = window.location.origin + '/ghost/api/content';
    }

    async function searchGhostAPI(query) {
        if (!ghostApiUrl) return [];

        // Try to find the content API key from Ghost's built-in search or config
        try {
            // Ghost injects the API key — try fetching from the search endpoint
            const searchUrl = ghostApiUrl + '/posts/?key=' + ghostApiKey +
                '&filter=title:~\'' + encodeURIComponent(query) + '\'' +
                '&fields=title,url,excerpt,custom_excerpt&limit=10';

            const response = await fetch(searchUrl);
            if (!response.ok) return [];

            const data = await response.json();
            return (data.posts || []).map(function(post) {
                return {
                    title: post.title,
                    url: post.url,
                    excerpt: post.custom_excerpt || post.excerpt || '',
                    source: 'ghost'
                };
            });
        } catch (e) {
            return [];
        }
    }

    function searchStaticIndex(query) {
        const words = query.toLowerCase().split(/\s+/).filter(function(w) { return w.length > 0; });

        // Score each item based on how many query words match
        var scored = [];
        searchIndex.forEach(function(item) {
            var searchText = (item.title + ' ' + item.keywords + ' ' + item.url).toLowerCase();
            var score = 0;
            var allMatch = true;

            words.forEach(function(word) {
                if (searchText.includes(word)) {
                    score++;
                    // Bonus for title match
                    if (item.title.toLowerCase().includes(word)) {
                        score += 2;
                    }
                    // Bonus for exact keyword match
                    if (item.keywords.split(' ').indexOf(word) !== -1) {
                        score += 1;
                    }
                } else {
                    allMatch = false;
                }
            });

            // Include if at least one word matches; rank higher if all match
            if (score > 0) {
                if (allMatch) score += 3;
                scored.push({ item: item, score: score });
            }
        });

        // Sort by score descending
        scored.sort(function(a, b) { return b.score - a.score; });

        return scored.map(function(s) {
            return {
                title: s.item.title,
                url: s.item.url,
                excerpt: '',
                source: 'static'
            };
        });
    }

    var searchTimeout = null;

    function handleSearch(e) {
        var query = e.target.value.trim();

        if (query.length < 2) {
            renderResults([], 0);
            return;
        }

        // Debounce
        if (searchTimeout) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function() {
            // Static search (immediate)
            var staticResults = searchStaticIndex(query);

            // Show only 2 preview results + "See all" link
            renderResults(staticResults.slice(0, 2), staticResults.length);

            // Also try Ghost API search if available (async, merges results)
            if (ghostApiUrl && ghostApiKey) {
                searchGhostAPI(query).then(function(apiResults) {
                    if (apiResults.length > 0) {
                        var seen = {};
                        var merged = [];

                        apiResults.forEach(function(r) {
                            var key = r.url.replace(/\/$/, '');
                            if (!seen[key]) {
                                seen[key] = true;
                                merged.push(r);
                            }
                        });

                        staticResults.forEach(function(r) {
                            var key = r.url.replace(/\/$/, '');
                            if (!seen[key]) {
                                seen[key] = true;
                                merged.push(r);
                            }
                        });

                        renderResults(merged.slice(0, 2), merged.length);
                    }
                });
            }
        }, 150);
    }

    function highlightMatch(text, query) {
        if (!query || query.length < 2) return text;
        var words = query.toLowerCase().split(/\s+/).filter(function(w) { return w.length > 1; });
        var result = text;
        words.forEach(function(word) {
            var regex = new RegExp('(' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
            result = result.replace(regex, '<mark>$1</mark>');
        });
        return result;
    }

    function renderResults(results, totalCount) {
        searchResults.innerHTML = '';
        var query = searchInput.value.trim();

        if (results.length === 0 && query.length >= 2) {
            var li = document.createElement('li');
            li.className = 'search-no-results';
            li.innerHTML = '<span>No results found for "' + query + '"</span>';
            searchResults.appendChild(li);
            return;
        }

        results.forEach(function(result) {
            var li = document.createElement('li');
            li.className = 'search-result-item';

            var excerptHtml = '';
            if (result.excerpt) {
                var shortExcerpt = result.excerpt.substring(0, 100);
                if (result.excerpt.length > 100) shortExcerpt += '…';
                excerptHtml = '<span class="search-result-excerpt">' + highlightMatch(shortExcerpt, query) + '</span>';
            }

            li.innerHTML =
                '<a href="' + result.url + '">' +
                    '<span class="search-result-title">' + highlightMatch(result.title, query) + '</span>' +
                    excerptHtml +
                '</a>';
            searchResults.appendChild(li);
        });

        // "See all results" link when there are more
        if (totalCount > 2 && query.length >= 2) {
            var seeAll = document.createElement('li');
            seeAll.className = 'search-see-all';
            seeAll.innerHTML = '<a href="/search/?q=' + encodeURIComponent(query) + '">See all ' + totalCount + ' results &rarr;</a>';
            searchResults.appendChild(seeAll);
        }
    }

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
        renderResults([], 0);
    }

    // Event Listeners
    searchToggle.addEventListener('click', toggleSearch);
    searchInput.addEventListener('input', handleSearch);

    // Enter key navigates to search page
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            var q = searchInput.value.trim();
            if (q.length >= 2) {
                window.location.href = '/search/?q=' + encodeURIComponent(q);
            }
        }
    });

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
// Team Card Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
    const teamCards = document.querySelectorAll('.team-card');
    const modal = document.getElementById('teamModal');

    if (!modal || teamCards.length === 0) return;

    const modalImage = modal.querySelector('.team-modal-image');
    const modalName = modal.querySelector('.team-modal-name');
    const modalRole = modal.querySelector('.team-modal-role');
    const modalBio = modal.querySelector('.team-modal-bio');
    const modalClose = modal.querySelector('.team-modal-close');

    // Add "Read More" hint to each card (only if bio has content)
    teamCards.forEach(card => {
        const bio = card.querySelector('.team-bio');
        const bioText = bio ? bio.querySelector('p') : null;
        const info = card.querySelector('.team-info');

        if (bioText && bioText.textContent.trim().length > 0 && info) {
            const readMore = document.createElement('span');
            readMore.className = 'team-read-more';
            readMore.innerHTML = 'Read More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            // Insert after team-info
            card.appendChild(readMore);
        }
    });

    // Open modal on "Read More" click
    document.addEventListener('click', function (e) {
        const readMoreBtn = e.target.closest('.team-read-more');
        if (!readMoreBtn) return;

        const card = readMoreBtn.closest('.team-card');
        if (!card) return;

        const img = card.querySelector('.team-card-image');
        const name = card.querySelector('.team-info h3');
        const role = card.querySelector('.team-info .role');
        const bio = card.querySelector('.team-bio');

        if (img) {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
        }
        if (name) modalName.textContent = name.textContent;
        if (role) modalRole.textContent = role.textContent;
        if (bio) modalBio.innerHTML = bio.innerHTML;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

// ================================================================
// SEARCH RESULTS PAGE
// ================================================================
document.addEventListener('DOMContentLoaded', function () {
    var searchPageInput = document.getElementById('searchPageInput');
    var searchPageResults = document.getElementById('searchPageResults');
    var searchPageSummary = document.getElementById('searchPageSummary');
    var searchPageEmpty = document.getElementById('searchPageEmpty');
    var searchPageClear = document.getElementById('searchPageClear');
    var searchPageTabs = document.getElementById('searchPageTabs');
    var countAll = document.getElementById('countAll');
    var countPages = document.getElementById('countPages');
    var countPosts = document.getElementById('countPosts');

    if (!searchPageInput || !searchPageResults) return;

    // Same search index as navbar (pages only)
    var pageIndex = [
        { title: 'Home', url: '/', keywords: 'home landing welcome nature classrooms education children', type: 'page' },
        { title: 'About Us', url: '/about/', keywords: 'about us team mission vision goals organisation nature classrooms who we are people', type: 'page' },
        { title: 'Nature Classrooms in Media', url: '/media/', keywords: 'media news press coverage articles publications newspaper', type: 'page' },
        { title: 'Resource Creation', url: '/resourcecreation/', keywords: 'resource creation develop design materials curriculum content', type: 'page' },
        { title: 'Capacity Building & Training', url: '/capacity/', keywords: 'capacity building training workshops teachers educators professional development skills', type: 'page' },
        { title: 'Research', url: '/research/', keywords: 'research studies papers findings academic evidence data neaf nature education assessment framework social emotional learning', type: 'page' },
        { title: 'Outreach & Public Engagement', url: '/outreach/', keywords: 'outreach public engagement events community awareness campaigns', type: 'page' },
        { title: 'Resources', url: '/resources/', keywords: 'resources downloads materials teaching learning tools all', type: 'page' },
        { title: 'Bingos', url: '/resources/bingos/', keywords: 'bingo bingos game nature observation seasonal rain winter summer spring activity', type: 'page' },
        { title: 'Activities', url: '/resources/activities/', keywords: 'activities games outdoor indoor nature play learning fun children', type: 'page' },
        { title: 'Alphabet Charts', url: '/resources/alphabet-charts/', keywords: 'alphabet charts letters language kashmiri tamil gojri gujarati regional script writing', type: 'page' },
        { title: 'Anchor Charts', url: '/resources/anchor-charts/', keywords: 'anchor charts posters visual classroom display reference', type: 'page' },
        { title: 'Natural History', url: '/resources/natural-history/', keywords: 'natural history biodiversity species wildlife flora fauna animals plants', type: 'page' },
        { title: 'Modules', url: '/resources/modules/', keywords: 'modules learning units lesson plans curriculum structured teaching water nature moves', type: 'page' },
        { title: 'Story Books', url: '/resources/theres-nothing-there/', keywords: 'storybooks stories reading books children narrative tales nothing there', type: 'page' },
        { title: 'There\'s Nothing There — Game', url: '/game/', keywords: 'game play interactive storybook nothing there fun', type: 'page' },
        { title: 'Our Approach', url: '/our-approach/', keywords: 'approach pedagogy methodology teaching philosophy framework nature based learning checklist', type: 'page' },
        { title: 'Blog', url: '/blog/', keywords: 'blog posts articles updates stories writing news', type: 'page' },
        { title: 'Suttha Muttha Project', url: '/suttha-muttha/', keywords: 'suttha muttha project bangalore nature games immersion workshop animals eat walk children fig tree maadhyama', type: 'page' },
        { title: 'Nature Education Assessment Framework (NEAF)', url: '/nature-education-assessment-framework/', keywords: 'neaf assessment framework evaluation nature education measuring outcomes timeline inlaks ravi sankaran', type: 'page' },
        { title: 'Nature-Based Social-Emotional Learning', url: '/nature-based-social-emotional-learning/', keywords: 'social emotional learning sel nature based wellbeing mindfulness empathy feelings workshop pilot nbsel', type: 'page' },
        { title: 'Children and Nature in the City', url: '/children-nature-city/', keywords: 'children nature city urban biodiversity environment outdoor spaces azim premji', type: 'page' },
        { title: 'Communities of Practice', url: '/communitiesofpractice/', keywords: 'communities practice network educators collaboration peer learning sharing group sessions', type: 'page' },
        { title: 'Nature Educators Meet-ups', url: '/natureeducator/', keywords: 'nature educators meetups gatherings professional community networking meetings events', type: 'page' },
        { title: 'Water Module — Life in Water', url: '/watermodule/', keywords: 'water module aquatic life ecosystems pond river lake marine fish wetlands explore', type: 'page' },
        { title: 'Nature Moves', url: '/naturemoves/', keywords: 'nature moves movement animals body physical activity dance actions bingo resource bank', type: 'page' },
        { title: 'Nature Strokes', url: '/naturestrokes/', keywords: 'nature strokes art drawing painting creative illustration sketching', type: 'page' },
        { title: 'Kashmiri Alphabet Charts', url: '/kashmirialphabetcharts/', keywords: 'kashmiri alphabet chart language script letters kashmir coloring cut-outs activity', type: 'page' },
        { title: 'Tamil Alphabet Charts', url: '/tamilalphabetcharts/', keywords: 'tamil alphabet chart language script letters vowels consonants explainer activity', type: 'page' },
        { title: 'Gojri Alphabet Chart', url: '/gojrialphabetchart/', keywords: 'gojri alphabet chart language script letters booklet', type: 'page' },
        { title: 'Gujarati Alphabet Chart', url: '/gujaratialphabetchart/', keywords: 'gujarati alphabet chart language script letters activity sheets', type: 'page' },
        { title: 'Plant Posters', url: '/plantposter/', keywords: 'plant poster tree flower neem milkweed fishtail palm singapore cherry lotus botanical', type: 'page' },
        { title: 'Seasonal Bingos', url: '/seasonal-bingos/', keywords: 'seasonal bingo rain winter spring summer seasons weather observation nature', type: 'page' },
        { title: 'Hidden Housemates', url: '/hidden-housemates/', keywords: 'hidden housemates insects animals home indoor creatures living together', type: 'page' },
        { title: 'Behaviour Tales', url: '/behaviortales/', keywords: 'behaviour tales behavior animal grooming stories charts', type: 'page' },
    ];

    // Blog post data — on live Ghost site these come from the API
    var blogPostIndex = [
        { title: 'How Spiders Won Over a Classroom', url: '/blog/how-spiders-won/', keywords: 'spiders classroom animals nature educator diary observation bingo children', excerpt: 'On a workshop about animal homes, children played a bingo game about spiders. They found all spiders except the signature spider.', type: 'post' },
        { title: 'Observing Nature through Binoculars', url: '/blog/observing-nature/', keywords: 'binoculars birds lake kingfisher observation nature outdoor field trip', excerpt: 'A day by the lake watching birds and learning about their unique characteristics.', type: 'post' },
        { title: 'Nature Classroom Pilot Study', url: '/blog/pilot-study/', keywords: 'pilot study research engagement memory retention urban schools nature learning', excerpt: 'Preliminary results from our pilot study on nature-integrated learning in urban public schools.', type: 'post' },
        { title: 'The Art of Biodiversity', url: '/blog/art-of-biodiversity/', keywords: 'art biodiversity charcoal sketches clay models flora fauna workshop', excerpt: 'Students transformed scientific observations into beautiful charcoal sketches and clay models of local flora and fauna.', type: 'post' },
        { title: 'Morning Walks in the Forest', url: '/blog/morning-walks/', keywords: 'forest morning walk trail bird calls sounds nature listening', excerpt: 'Learning to listen to the sounds of the forest and identify different bird calls during our early morning nature trail.', type: 'post' },
    ];

    var allIndex = pageIndex.concat(blogPostIndex);
    var activeTab = 'all';
    var currentResults = { pages: [], posts: [], all: [] };

    function searchFullIndex(query) {
        var words = query.toLowerCase().split(/\s+/).filter(function(w) { return w.length > 0; });
        var scored = [];

        allIndex.forEach(function(item) {
            var searchText = (item.title + ' ' + item.keywords + ' ' + (item.excerpt || '')).toLowerCase();
            var score = 0;
            var allMatch = true;

            words.forEach(function(word) {
                if (searchText.includes(word)) {
                    score++;
                    if (item.title.toLowerCase().includes(word)) score += 3;
                    if (item.keywords.split(' ').indexOf(word) !== -1) score += 1;
                } else {
                    allMatch = false;
                }
            });

            if (score > 0) {
                if (allMatch) score += 5;
                scored.push({ item: item, score: score });
            }
        });

        scored.sort(function(a, b) { return b.score - a.score; });
        return scored.map(function(s) { return s.item; });
    }

    function highlightText(text, query) {
        if (!query || query.length < 2) return text;
        var words = query.toLowerCase().split(/\s+/).filter(function(w) { return w.length > 1; });
        var result = text;
        words.forEach(function(word) {
            var regex = new RegExp('(' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
            result = result.replace(regex, '<mark>$1</mark>');
        });
        return result;
    }

    function updateTabs() {
        countAll.textContent = '(' + currentResults.all.length + ')';
        countPages.textContent = '(' + currentResults.pages.length + ')';
        countPosts.textContent = '(' + currentResults.posts.length + ')';
    }

    function renderSearchPage(query) {
        var results = activeTab === 'pages' ? currentResults.pages :
                      activeTab === 'posts' ? currentResults.posts :
                      currentResults.all;

        searchPageResults.innerHTML = '';

        if (!query || query.length < 2) {
            searchPageResults.innerHTML = '<div class="search-page-empty"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><p>Start typing to search across all pages and blog posts</p></div>';
            searchPageSummary.textContent = '';
            return;
        }

        if (results.length === 0) {
            searchPageResults.innerHTML = '<div class="search-page-no-results"><h3>No results found</h3><p>Try different keywords or check spelling</p></div>';
            searchPageSummary.textContent = '0 results found for "' + query + '"';
            return;
        }

        searchPageSummary.textContent = results.length + ' result' + (results.length !== 1 ? 's' : '') + ' found for "' + query + '"';

        if (activeTab === 'all') {
            // Group by type
            var pages = currentResults.pages;
            var posts = currentResults.posts;

            if (pages.length > 0) {
                var heading = document.createElement('h2');
                heading.className = 'search-section-heading';
                heading.textContent = 'Pages (' + pages.length + ')';
                searchPageResults.appendChild(heading);
                pages.forEach(function(item) {
                    searchPageResults.appendChild(createResultCard(item, query));
                });
            }

            if (posts.length > 0) {
                var heading2 = document.createElement('h2');
                heading2.className = 'search-section-heading';
                heading2.textContent = 'Blog Posts (' + posts.length + ')';
                searchPageResults.appendChild(heading2);
                posts.forEach(function(item) {
                    searchPageResults.appendChild(createResultCard(item, query));
                });
            }
        } else {
            results.forEach(function(item) {
                searchPageResults.appendChild(createResultCard(item, query));
            });
        }
    }

    function createResultCard(item, query) {
        var div = document.createElement('div');
        div.className = 'search-page-result';

        var titleHtml = '<div class="search-page-result-title"><a href="' + item.url + '">' + highlightText(item.title, query) + '</a></div>';

        var excerptHtml = '';
        if (item.excerpt) {
            excerptHtml = '<p class="search-page-result-excerpt">' + highlightText(item.excerpt, query) + '</p>';
        } else {
            // Build excerpt from keywords
            var keywordsExcerpt = item.keywords.split(' ').slice(0, 15).join(', ');
            excerptHtml = '<p class="search-page-result-excerpt">' + highlightText(keywordsExcerpt, query) + '</p>';
        }

        div.innerHTML = titleHtml + excerptHtml;
        return div;
    }

    function doSearch() {
        var query = searchPageInput.value.trim();

        // Toggle clear button
        if (searchPageClear) {
            searchPageClear.classList.toggle('is-visible', query.length > 0);
        }

        var results = searchFullIndex(query);

        currentResults.all = results;
        currentResults.pages = results.filter(function(r) { return r.type === 'page'; });
        currentResults.posts = results.filter(function(r) { return r.type === 'post'; });

        updateTabs();
        renderSearchPage(query);
    }

    // Input handler with debounce
    var pageSearchTimeout = null;
    searchPageInput.addEventListener('input', function() {
        if (pageSearchTimeout) clearTimeout(pageSearchTimeout);
        pageSearchTimeout = setTimeout(doSearch, 200);
    });

    // Clear button
    if (searchPageClear) {
        searchPageClear.addEventListener('click', function() {
            searchPageInput.value = '';
            searchPageClear.classList.remove('is-visible');
            doSearch();
            searchPageInput.focus();
        });
    }

    // Tabs
    if (searchPageTabs) {
        var tabs = searchPageTabs.querySelectorAll('.search-tab');
        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                tabs.forEach(function(t) { t.classList.remove('is-active'); });
                tab.classList.add('is-active');
                activeTab = tab.getAttribute('data-tab');
                renderSearchPage(searchPageInput.value.trim());
            });
        });
    }

    // Check for ?q= parameter in URL
    var urlParams = new URLSearchParams(window.location.search);
    var queryParam = urlParams.get('q');
    if (queryParam) {
        searchPageInput.value = queryParam;
        doSearch();
    }
});
