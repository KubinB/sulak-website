// High-Performance Site Scripts - Optimized for Efficiency

// Debounce utility for performance
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

// Optimized Visit Counter with throttling and error handling
class VisitCounter {
    constructor() {
        this.storageKey = 'sulak-visit-count';
        this.sessionKey = 'sulak-session-visit';
        this.maxCount = 999999; // Prevent overflow
        this.animationDuration = 1500; // Reduced animation time
    }

    getVisitCount() {
        try {
            const count = localStorage.getItem(this.storageKey);
            return count ? Math.min(parseInt(count), this.maxCount) : 0;
        } catch (error) {
            console.warn('localStorage unavailable, using sessionStorage');
            const count = sessionStorage.getItem(this.storageKey);
            return count ? Math.min(parseInt(count), this.maxCount) : 0;
        }
    }

    setVisitCount(count) {
        const safeCount = Math.min(count, this.maxCount);
        try {
            localStorage.setItem(this.storageKey, safeCount.toString());
        } catch (error) {
            sessionStorage.setItem(this.storageKey, safeCount.toString());
        }
    }

    shouldIncrementVisit() {
        // Only increment once per session
        try {
            if (sessionStorage.getItem(this.sessionKey)) {
                return false;
            }
            sessionStorage.setItem(this.sessionKey, 'true');
            return true;
        } catch (error) {
            return true; // Fallback to always increment if storage fails
        }
    }

    // Optimized counter animation using requestAnimationFrame
    animateCounter(element, targetCount) {
        if (!element || targetCount <= 0) return;

        const startTime = performance.now();
        const startCount = 0;
        const countDiff = targetCount - startCount;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.animationDuration, 1);
            
            // Use easeOutQuart for smooth deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(startCount + (countDiff * easeProgress));
            
            element.textContent = currentCount.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = targetCount.toLocaleString();
            }
        };

        requestAnimationFrame(animate);
    }

    init() {
        const countElement = document.getElementById('visit-count');
        if (!countElement) return;

        let visitCount = this.getVisitCount();
        
        if (this.shouldIncrementVisit()) {
            visitCount++;
            this.setVisitCount(visitCount);
        }

        // Start animation when element is visible
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(countElement, visitCount);
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(countElement);
        } else {
            // Fallback for browsers without IntersectionObserver
            this.animateCounter(countElement, visitCount);
        }
    }
}

// Optimized scroll handler with passive listeners
function initScrollOptimizations() {
    let ticking = false;
    
    const optimizedScrollHandler = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Add any scroll-based optimizations here
                ticking = false;
            });
            ticking = true;
        }
    };

    // Use passive listeners for better scroll performance
    if (supportsPassiveListeners()) {
        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    } else {
        window.addEventListener('scroll', optimizedScrollHandler);
    }
}

// Check for passive listener support
function supportsPassiveListeners() {
    let supportsPassive = false;
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) {}
    return supportsPassive;
}

// Image lazy loading optimization for older browsers
function initImageOptimizations() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (!img.src && img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback intersection observer for lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// Resource hint optimization
function addResourceHints() {
    const head = document.head;
    
    // DNS prefetch for external resources
    const dnsPrefetch = [
        'https://open.spotify.com',
        'https://sulak-merch.myspreadshop.com',
        'https://www.facebook.com',
        'https://www.instagram.com',
        'https://www.tiktok.com'
    ];

    dnsPrefetch.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        head.appendChild(link);
    });
}

// Error boundary for JavaScript errors
function initErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('JavaScript Error:', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });
    });

    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled Promise Rejection:', event.reason);
    });
}

// Main initialization function
function initializePageFeatures() {
    // Initialize visit counter
    const visitCounter = new VisitCounter();
    visitCounter.init();
    
    // Initialize scroll optimizations
    initScrollOptimizations();
    
    // Initialize image optimizations
    initImageOptimizations();
    
    // Add resource hints for better loading
    addResourceHints();
    
    // Initialize error handling
    initErrorHandling();
    
    console.log('Šulak website features initialized with performance optimizations');
}

// Initialize when DOM is ready or immediately if already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePageFeatures);
} else {
    initializePageFeatures();
}

// Make initialization function globally available
window.initializePageFeatures = initializePageFeatures;