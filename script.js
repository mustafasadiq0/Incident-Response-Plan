// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Scroll animations
    initScrollAnimations();
    
    // Statistics counter animation
    initCounterAnimation();
    
    // Mobile menu toggle
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
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
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.phase-item, .template-card, .resource-card, .program-card, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Statistics counter animation
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isMoney = target.includes('M');
    
    let numericTarget;
    if (isPercentage) {
        numericTarget = parseInt(target.replace('%', ''));
    } else if (isMoney) {
        numericTarget = parseFloat(target.replace('M', ''));
    } else {
        numericTarget = parseInt(target);
    }
    
    let current = 0;
    const increment = numericTarget / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
            current = numericTarget;
            clearInterval(timer);
        }
        
        let displayValue;
        if (isPercentage) {
            displayValue = Math.floor(current) + '%';
        } else if (isMoney) {
            displayValue = current.toFixed(2) + 'M';
        } else {
            displayValue = Math.floor(current);
        }
        
        element.textContent = displayValue;
    }, 50);
}

// Mobile menu toggle
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Phase interaction
document.addEventListener('DOMContentLoaded', function() {
    const phaseItems = document.querySelectorAll('.phase-item');
    
    phaseItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Template download functionality
function downloadTemplate(templateName) {
    // This would typically trigger a download
    // For now, we'll show an alert
    alert(`تحميل ${templateName} - سيتم إضافة رابط التحميل الفعلي لاحقاً`);
}

// Add click handlers for template downloads
document.addEventListener('DOMContentLoaded', function() {
    const downloadLinks = document.querySelectorAll('.template-download');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const templateTitle = this.parentElement.querySelector('.template-title').textContent;
            downloadTemplate(templateTitle);
        });
    });
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.onclick = scrollToTop;
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
});

// Add CSS for scroll to top button
const scrollButtonStyles = `
.scroll-to-top {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.scroll-to-top:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
}
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = scrollButtonStyles;
document.head.appendChild(styleSheet);

// Search functionality (if needed in the future)
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // Implement search logic here
            console.log('Searching for:', query);
        });
    }
}

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
    }
}

// Form validation (if forms are added later)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Local storage functions for user preferences
function saveUserPreference(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getUserPreference(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Theme toggle (if dark mode is added later)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    const isDark = body.classList.contains('dark-theme');
    saveUserPreference('darkMode', isDark);
}

// Load user preferences on page load
document.addEventListener('DOMContentLoaded', function() {
    const darkMode = getUserPreference('darkMode');
    if (darkMode) {
        document.body.classList.add('dark-theme');
    }
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .template-download');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Performance monitoring
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Page load time:', loadTime + 'ms');
            }, 0);
        });
    }
}

// Initialize performance monitoring
logPerformance();

