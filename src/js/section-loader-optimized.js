/**
 * High-Performance Section Loader - Optimized Dynamic HTML Loading
 * Features: Lazy loading, caching, priority loading, error recovery
 */

class SectionLoader {
    constructor() {
        this.sections = [
            // Critical sections loaded first
            { file: 'header.html', target: 'header-container', priority: 1 },
            { file: 'information.html', target: 'information-container', priority: 1 },
            { file: 'footer.html', target: 'footer-container', priority: 1 },
            
            // Secondary sections loaded after critical content
            { file: 'music.html', target: 'music-container', priority: 2 },
            { file: 'releases.html', target: 'releases-container', priority: 2 },
            { file: 'shows.html', target: 'shows-container', priority: 2 },
            
            // Tertiary sections loaded on demand or after main content
            { file: 'bios.html', target: 'bios-container', priority: 3, lazy: true },
            { file: 'merch.html', target: 'merch-container', priority: 3, lazy: true },
            { file: 'origin.html', target: 'origin-container', priority: 3, lazy: true },
            { file: 'contact.html', target: 'contact-container', priority: 3, lazy: true }
        ];
        
        this.cache = new Map();
        this.loadedSections = new Set();
        this.observer = null;
        this.initIntersectionObserver();
    }

    // Initialize Intersection Observer for lazy loading
    initIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        const section = this.sections.find(s => s.target === sectionId);
                        if (section && section.lazy && !this.loadedSections.has(section.file)) {
                            this.loadSection(section);
                            this.observer.unobserve(entry.target);
                        }
                    }
                });
            }, { 
                rootMargin: '100px', // Load 100px before entering viewport
                threshold: 0.1 
            });
        }
    }

    async loadSection(section) {
        this.loadStartTime = performance.now(); // Track loading start time
        
        // Check cache first
        if (this.cache.has(section.file)) {
            this.renderSection(section, this.cache.get(section.file));
            return;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
            
            const response = await fetch(`sections/${section.file}`, {
                signal: controller.signal,
                cache: 'force-cache' // Use browser cache when available
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const html = await response.text();
            
            // Cache the content
            this.cache.set(section.file, html);
            this.loadedSections.add(section.file);
            
            this.renderSection(section, html);
            
        } catch (error) {
            console.error(`Failed to load ${section.file}:`, error.message);
            this.handleLoadError(section, error);
        }
    }

    renderSection(section, html) {
        const targetElement = document.getElementById(section.target);
        if (targetElement) {
            // Add loading state to prevent layout shift
            targetElement.classList.add('section-loading');
            
            // Use DocumentFragment for better performance
            const fragment = document.createDocumentFragment();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            while (tempDiv.firstChild) {
                fragment.appendChild(tempDiv.firstChild);
            }
            
            // Use requestAnimationFrame to ensure smooth rendering
            requestAnimationFrame(() => {
                targetElement.appendChild(fragment);
                
                // Remove loading state and add loaded state
                requestAnimationFrame(() => {
                    targetElement.classList.remove('section-loading');
                    targetElement.classList.add('section-loaded');
                    
                    console.log(`Rendered ${section.file}`);
                    
                    // Dispatch custom event for section loaded
                    targetElement.dispatchEvent(new CustomEvent('sectionLoaded', {
                        detail: { 
                            section: section.file,
                            loadTime: performance.now() - this.loadStartTime
                        }
                    }));
                });
            });
        }
    }

    handleLoadError(section, error) {
        const targetElement = document.getElementById(section.target);
        if (targetElement) {
            if (error.name === 'AbortError') {
                targetElement.innerHTML = `<p class="error-message">${section.file} taking too long to load...</p>`;
            } else {
                targetElement.innerHTML = `<p class="error-message">Failed to load content. <button onclick="location.reload()">Retry</button></p>`;
            }
        }
    }

    async loadPriorityGroup(priority) {
        const prioritySections = this.sections.filter(s => s.priority === priority && !s.lazy);
        const loadPromises = prioritySections.map(section => this.loadSection(section));
        await Promise.all(loadPromises);
    }

    setupLazyLoading() {
        if (!this.observer) return;
        
        const lazySections = this.sections.filter(s => s.lazy);
        lazySections.forEach(section => {
            const targetElement = document.getElementById(section.target);
            if (targetElement) {
                this.observer.observe(targetElement);
            }
        });
    }

    async loadAllSections() {
        console.log('Loading Šulak website...');
        
        try {
            // Load critical sections first (priority 1)
            await this.loadPriorityGroup(1);
            
            // Use requestIdleCallback for non-critical sections if available
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    this.loadPriorityGroup(2);
                });
            } else {
                // Fallback: load with small delay
                setTimeout(() => this.loadPriorityGroup(2), 100);
            }
            
            // Setup lazy loading for remaining sections
            this.setupLazyLoading();
            
            console.log('Critical sections loaded! Lazy loading enabled for remaining content.');
            
            // Initialize features after critical sections load
            if (window.initializePageFeatures) {
                window.initializePageFeatures();
            }
            
        } catch (error) {
            console.error('Error during section loading:', error);
        }
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadAllSections());
        } else {
            this.loadAllSections();
        }
    }

    // Public method to manually load a section
    loadSectionManually(sectionName) {
        const section = this.sections.find(s => s.file === sectionName);
        if (section && !this.loadedSections.has(section.file)) {
            return this.loadSection(section);
        }
    }

    // Clear cache method for development
    clearCache() {
        this.cache.clear();
        this.loadedSections.clear();
        console.log('🧹 Section cache cleared');
    }
}

// Initialize the optimized section loader
const sectionLoader = new SectionLoader();
sectionLoader.init();

// Make it globally available for debugging
window.sectionLoader = sectionLoader;
