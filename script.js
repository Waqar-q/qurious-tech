// ========================================
// QURIOUS TECH - JAVASCRIPT FUNCTIONALITY
// ========================================

// ========= NAVBAR SCROLL EFFECT =========
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========= MOBILE MENU TOGGLE =========
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ========= SMOOTH SCROLL FOR ANCHOR LINKS =========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========= SCROLL REVEAL ANIMATION =========
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

// Initial check for elements already in viewport
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ========= ACTIVE NAV LINK ON SCROLL =========
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

function setActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Handle both full paths and hash links
        if (href.includes(window.location.pathname.split('/').pop())) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ========= NEWSLETTER FORM HANDLER =========
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Show success message (in real implementation, this would submit to backend)
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        newsletterForm.reset();
    });
}

// ========= CONTACT FORM HANDLER =========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: contactForm.querySelector('#name').value,
            email: contactForm.querySelector('#email').value,
            subject: contactForm.querySelector('#subject').value,
            message: contactForm.querySelector('#message').value
        };
        
        // Show success message (in real implementation, this would submit to backend)
        alert(`Thank you ${formData.name}! Your message has been received. We'll get back to you at ${formData.email} soon.`);
        contactForm.reset();
    });
}

// ========= VAULT SEARCH FUNCTIONALITY =========
const vaultSearch = document.getElementById('vaultSearch');
const articleCards = document.querySelectorAll('.article-card');

if (vaultSearch) {
    vaultSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        articleCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tag = card.querySelector('.article-tag').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || tag.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ========= CATEGORY FILTERING =========
const categoryTabs = document.querySelectorAll('.category-tab');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        const category = tab.getAttribute('data-category');
        
        articleCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// ========= VIDEO CARD CLICK HANDLER =========
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Only trigger if not clicking the actual link
        if (!e.target.closest('a')) {
            const link = card.querySelector('a');
            if (link) {
                window.open(link.href, '_blank');
            }
        }
    });
});

// ========= SCROLL TO TOP =========
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========= PERFORMANCE: INTERSECTION OBSERVER FOR IMAGES =========
// Lazy load images when they come into viewport
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ========= DARK MODE PREFERENCE (Optional Enhancement) =========
// Respect user's system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    // User prefers light mode - but since we're a dark theme brand, we keep dark
    // This is just for future enhancement
}

// ========= CONSOLE MESSAGE =========
console.log('%c⚡ Qurious Tech', 'color: #36C9F6; font-size: 24px; font-weight: bold;');
console.log('%cBuilding the Physical Brain of the Future', 'color: #A637FF; font-size: 14px;');
console.log('%cInterested in working with us? Visit: https://qurioustech.com/contact', 'color: #36C9F6; font-size: 12px;');

// ========= PREVENT FORM RESUBMISSION ON REFRESH =========
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ========= ACCESSIBILITY: KEYBOARD NAVIGATION =========
// Enhanced keyboard navigation for interactive elements
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ========= YOUTUBE VIDEO ID UPDATER HELPER =========
// Helper function to easily update YouTube video IDs
// Usage: updateVideoIds(['VIDEO_ID_1', 'VIDEO_ID_2', ...])
function updateVideoIds(videoIds) {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach((card, index) => {
        if (videoIds[index]) {
            const videoId = videoIds[index];
            
            // Update thumbnail
            const thumbnail = card.querySelector('.video-thumbnail img');
            if (thumbnail) {
                thumbnail.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            }
            
            // Update link
            const link = card.querySelector('a');
            if (link) {
                link.href = `https://youtube.com/watch?v=${videoId}`;
            }
            
            // Update data attribute
            card.setAttribute('data-video-id', videoId);
        }
    });
}

// Example usage (commented out):
// updateVideoIds([
//     'dQw4w9WgXcQ',  // Video 1
//     'dQw4w9WgXcQ',  // Video 2
//     // ... add more video IDs
// ]);

// ========= FORM VALIDATION HELPERS =========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#FF4444';
        } else {
            input.style.borderColor = '';
        }
        
        // Special validation for email
        if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            input.style.borderColor = '#FF4444';
        }
    });
    
    return isValid;
}

// ========= ANALYTICS TRACKING (Placeholder) =========
// Add your analytics tracking code here
function trackEvent(eventName, eventData) {
    // Example: Google Analytics
    // gtag('event', eventName, eventData);
    
    // Example: Custom analytics
    console.log('Event tracked:', eventName, eventData);
}

// Track page views
window.addEventListener('load', () => {
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
});

// Track button clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        trackEvent('button_click', {
            button_text: e.target.textContent,
            button_location: window.location.pathname
        });
    });
});

// ========= LOADING ANIMATION =========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial reveal animation
    setTimeout(() => {
        revealOnScroll();
    }, 100);
});

// ========= ERROR HANDLING =========
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You could send this to an error tracking service
});

// ========= SERVICE WORKER REGISTRATION (Optional for PWA) =========
// Uncomment if you want to add offline support
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}
*/

// ========= INITIALIZATION =========
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer if needed
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // Initialize any other components
    console.log('Qurious Tech website initialized');
});
