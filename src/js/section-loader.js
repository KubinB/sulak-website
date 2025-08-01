/**
 * Section Loader - Dynamic HTML section loading
 * Loads individual HTML files from the sections/ directory
 * into designated containers on the main page.
 */

class SectionLoader {
    constructor() {
        this.sections = [
            { file: 'header.html', target: 'header-container' },
            { file: 'bios.html', target: 'bios-container' },
            { file: 'origin.html', target: 'origin-container' },
            { file: 'information.html', target: 'information-container' },
            { file: 'releases.html', target: 'releases-container' },
            { file: 'shows.html', target: 'shows-container' },
            { file: 'merch.html', target: 'merch-container' },
            { file: 'music.html', target: 'music-container' },
            { file: 'contact.html', target: 'contact-container' },
            { file: 'footer.html', target: 'footer-container' }
        ];
    }

    async loadSection(section) {
        try {
            const response = await fetch(`sections/${section.file}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const html = await response.text();
            const targetElement = document.getElementById(section.target);
            if (targetElement) {
                targetElement.innerHTML = html;
                console.log(`✅ Loaded ${section.file}`);
            } else {
                console.warn(`⚠️ Target element ${section.target} not found`);
            }
        } catch (error) {
            console.error(`❌ Failed to load ${section.file}:`, error.message);
            const targetElement = document.getElementById(section.target);
            if (targetElement) {
                targetElement.innerHTML = `<p>⚠️ Failed to load ${section.file}</p>`;
            }
        }
    }

    async loadAllSections() {
        console.log('� Loading Šulak website sections...');
        
        const loadPromises = this.sections.map(section => this.loadSection(section));
        await Promise.all(loadPromises);
        
        console.log('✅ All sections loaded!');
        
        // Re-initialize any scripts that depend on the loaded content
        if (window.initializePageFeatures) {
            window.initializePageFeatures();
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
}

// Initialize the section loader
const sectionLoader = new SectionLoader();
sectionLoader.init();
