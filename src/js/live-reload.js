// Live Reload for Development
// Automatically refreshes the page when files change

class LiveReload {
    constructor(interval = 2000) {
        this.interval = interval;
        this.lastModified = {};
        this.isActive = false;
        this.checkInterval = null;
    }

    // Initialize live reload
    init() {
        console.log('Live reload enabled');
        this.isActive = true;
        this.startChecking();
    }

    // Start checking for file changes
    startChecking() {
        this.checkInterval = setInterval(() => {
            this.checkForChanges();
        }, this.interval);
    }

    // Stop checking for changes
    stop() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
            this.isActive = false;
            console.log('Live reload stopped');
        }
    }

    // Check if any files have changed
    async checkForChanges() {
        const filesToCheck = [
            'src/css/styles.css',
            'src/js/scripts.js',
            'src/js/section-loader-optimized.js',
            'sections/header.html',
            'sections/information.html',
            'sections/music.html',
            'sections/releases.html',
            'sections/shows.html',
            'sections/bios.html',
            'sections/merch.html',
            'sections/origin.html',
            'sections/contact.html',
            'sections/footer.html'
        ];

        for (const file of filesToCheck) {
            try {
                const response = await fetch(file, { method: 'HEAD' });
                const lastModified = response.headers.get('last-modified');
                
                if (lastModified) {
                    if (this.lastModified[file] && this.lastModified[file] !== lastModified) {
                        console.log(`File changed: ${file} - Reloading page...`);
                        window.location.reload();
                        return;
                    }
                    this.lastModified[file] = lastModified;
                }
            } catch (error) {
                // Silently ignore errors (file might not exist or be accessible)
            }
        }
    }

    // Manual reload trigger (can be called from console)
    reload() {
        console.log('Manual reload triggered');
        window.location.reload();
    }

    // Toggle live reload on/off
    toggle() {
        if (this.isActive) {
            this.stop();
        } else {
            this.init();
        }
    }
}

// Initialize live reload
const liveReload = new LiveReload();
liveReload.init();

// Make available globally for manual control
window.liveReload = liveReload;

console.log('Development tools available:');
console.log('  • liveReload.reload() - Manual reload');
console.log('  • liveReload.toggle() - Enable/disable auto-reload');
console.log('  • liveReload.stop() - Stop auto-reload');