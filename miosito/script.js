// Performance: Throttle function to limit execution rate
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Stop observing after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Defer IntersectionObserver initialization
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => initializeAnimations(), { timeout: 2000 });
    } else {
        setTimeout(initializeAnimations, 100);
    }

    // Add parallax effect to hero (throttled for performance)
    const hero = document.querySelector('.hero');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (hero) {
        const handleScroll = throttle(() => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');

            if (scrolled < window.innerHeight) { // Only run when hero is visible
                if (heroContent) {
                    requestAnimationFrame(() => {
                        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                        heroContent.style.opacity = 1 - (scrolled * 0.002);
                    });
                }

                // Hide scroll indicator when user scrolls
                if (scrollIndicator) {
                    if (scrolled > 100) {
                        scrollIndicator.style.opacity = '0';
                        scrollIndicator.style.pointerEvents = 'none';
                    } else {
                        scrollIndicator.style.opacity = '1';
                        scrollIndicator.style.pointerEvents = 'auto';
                    }
                }
            }
        }, 16); // ~60fps

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Smooth scroll when clicking scroll indicator
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('.about-section');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // Dynamic budget options based on service type
        const serviceSelect = document.getElementById('service');
        const budgetSelect = document.getElementById('budget');
        const budgetLabel = document.getElementById('budget-label');

        if (serviceSelect && budgetSelect) {
            serviceSelect.addEventListener('change', function() {
                const serviceType = this.value;
                budgetSelect.innerHTML = ''; // Clear existing options

                if (serviceType === 'website' || serviceType === 'both') {
                    // Website budget options (one-time project)
                    budgetLabel.textContent = 'Budget Range (One-time)';
                    const websiteOptions = [
                        { value: '', text: 'Select your budget range' },
                        { value: 'less-than-500', text: 'Less than €500' },
                        { value: '500-1000', text: '€500 - €1,000' },
                        { value: '1000-3000', text: '€1,000 - €3,000' },
                        { value: '3000-5000', text: '€3,000 - €5,000' },
                        { value: '5000-10000', text: '€5,000 - €10,000' },
                        { value: 'more-than-10000', text: 'More than €10,000' },
                        { value: 'flexible', text: 'Flexible / Let\'s Discuss' }
                    ];
                    websiteOptions.forEach(opt => {
                        const option = document.createElement('option');
                        option.value = opt.value;
                        option.textContent = opt.text;
                        budgetSelect.appendChild(option);
                    });
                } else if (serviceType === 'automation') {
                    // Automation budget options (monthly subscription)
                    budgetLabel.textContent = 'Monthly Budget Range';
                    const automationOptions = [
                        { value: '', text: 'Select your monthly budget' },
                        { value: '19.99-50', text: '€19.99 - €50/month' },
                        { value: '50-100', text: '€50 - €100/month' },
                        { value: '100-200', text: '€100 - €200/month' },
                        { value: '200-500', text: '€200 - €500/month' },
                        { value: 'more-than-500', text: 'More than €500/month' },
                        { value: 'flexible', text: 'Flexible / Let\'s Discuss' }
                    ];
                    automationOptions.forEach(opt => {
                        const option = document.createElement('option');
                        option.value = opt.value;
                        option.textContent = opt.text;
                        budgetSelect.appendChild(option);
                    });
                } else if (serviceType === 'consultation') {
                    // Consultation options
                    budgetLabel.textContent = 'Budget Range';
                    const consultationOptions = [
                        { value: '', text: 'Select your budget range' },
                        { value: 'hourly-50-100', text: '€50 - €100/hour' },
                        { value: 'hourly-100-200', text: '€100 - €200/hour' },
                        { value: 'project-based', text: 'Project-based pricing' },
                        { value: 'flexible', text: 'Flexible / Let\'s Discuss' }
                    ];
                    consultationOptions.forEach(opt => {
                        const option = document.createElement('option');
                        option.value = opt.value;
                        option.textContent = opt.text;
                        budgetSelect.appendChild(option);
                    });
                } else {
                    // Default state
                    budgetLabel.textContent = 'Budget Range';
                    const defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.textContent = 'Select service type first';
                    budgetSelect.appendChild(defaultOption);
                }
            });
        }

        // Form submission handling
        contactForm.addEventListener('submit', function(e) {
            const submitButton = contactForm.querySelector('.form-submit');
            const originalText = submitButton.textContent;

            // Change button text while submitting
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Note: Formspree will handle the actual submission
            // This just provides visual feedback
        });
    }
});

// Deferred animation initialization for better performance
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Only observe visible and near-visible elements initially
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function showPage(pageName) {
    const currentPage = document.querySelector('.page-section.active');

    // Add exit animation to current page
    if (currentPage) {
        currentPage.classList.add('page-exit');

        setTimeout(() => {
            // Hide all pages
            const pages = document.querySelectorAll('.page-section');
            pages.forEach(page => {
                page.classList.remove('active', 'page-exit');
            });

            // Show selected page
            const newPage = document.getElementById(pageName);
            newPage.classList.add('active');

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Re-observe new animated elements
            const newAnimatedElements = newPage.querySelectorAll('.animate-on-scroll');
            newAnimatedElements.forEach(el => {
                el.classList.remove('animated');
                observer.observe(el);
            });
        }, 300);
    } else {
        // First load - no animation
        const pages = document.querySelectorAll('.page-section');
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageName).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showProjectDetail(projectId) {
    const currentPage = document.querySelector('.page-section.active');

    // Add exit animation to current page
    if (currentPage) {
        currentPage.classList.add('page-exit');

        setTimeout(() => {
            // Hide all pages
            const pages = document.querySelectorAll('.page-section');
            pages.forEach(page => {
                page.classList.remove('active', 'page-exit');
            });

            // Show selected project detail
            const newPage = document.getElementById(projectId);
            newPage.classList.add('active');

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Re-observe new animated elements
            const newAnimatedElements = newPage.querySelectorAll('.animate-on-scroll');
            newAnimatedElements.forEach(el => {
                el.classList.remove('animated');
                observer.observe(el);
            });
        }, 300);
    } else {
        // First load - no animation
        const pages = document.querySelectorAll('.page-section');
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(projectId).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
