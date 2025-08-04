# Šulak Band - Official Website

Welcome to the Sulak Band website repo. This project serves as the official website for the Sulak Band.

## Project Structure

```
sulak-website/
├── index.html              # Main HTML structure with containers
├── .htaccess              # Apache server configuration & security
├── robots.txt             # Search engine directives
├── CNAME                  # GitHub Pages custom domain
├── SERVER-SETUP.md        # Local development server guide
│
├── sections/              # Modular HTML sections (dynamically loaded)
│   ├── header.html        # Logo and site header
│   ├── information.html   # Band info and description
│   ├── music.html         # Streaming platform links
│   ├── releases.html      # Album releases with Spotify embed
│   ├── shows.html         # Tour dates and venue information
│   ├── bios.html          # Band member biographies
│   ├── merch.html         # Merchandise preview and store links
│   ├── origin.html        # Šulak mythology and Babylonian lore
│   ├── contact.html       # Contact and booking information
│   ├── footer.html        # Social media links and copyright
│   └── README.md          # Section architecture documentation
│
├── src/                   # Source code and assets
│   ├── css/               # Modular CSS architecture
│   │   ├── styles.css     # Main CSS file (imports all others)
│   │   ├── base.css       # Variables, typography, foundations
│   │   ├── animations.css # All keyframe animations
│   │   ├── layout.css     # Header, nav, sections, footer layout
│   │   ├── components.css # Links, embeds, visit counter, bios
│   │   ├── effects.css    # Metal text, fire text, special effects
│   │   ├── responsive.css # Mobile and responsive design
│   │   ├── social-media.css # Social media integration styles
│   │   ├── critical.css   # Above-the-fold critical CSS
│   │   └── README.md      # CSS organization documentation
│   │
│   └── js/                # JavaScript functionality
│       ├── section-loader-optimized.js # High-performance section loading
│       ├── section-loader.js # Original section loading system
│       ├── performance-monitor.js # Performance and analytics tracking
│       └── scripts.js     # Visit counter and site interactions
│
└── assets/                # Static assets and media
    ├── images/            # All image assets organized by type
    │   ├── favicon/       # Website favicons (multiple sizes)
    │   ├── Bios/          # Band member photos
    │   ├── Icons/         # Social media and UI icons
    │   ├── album-art/     # Album covers and artwork
    │   ├── merch-preview/ # Merchandise preview images
    │   └── show-fliers/   # Concert and show promotional materials
    └── README.md          # Asset organization documentation
```

## Performance Optimizations

### ** Loading Strategy**
- **Priority-based section loading** - Critical content loads first
- **Lazy loading** - Non-critical sections load when needed
- **Image optimization** - Proper loading attributes and compression
- **Resource preloading** - DNS prefetch and asset preloading

### ** Caching Strategy**
- **Browser caching** - Long-term caching for static assets
- **Section caching** - Dynamic content cached in memory
- **Service worker ready** - Prepared for offline capabilities
- **ETags** - Efficient cache validation

### ** JavaScript Optimizations**
- **Deferred loading** - Scripts load after critical content
- **Intersection Observer** - Efficient lazy loading and animations
- **requestAnimationFrame** - Smooth 60fps animations
- **Passive listeners** - Non-blocking scroll performance

### ** CSS Optimizations**
- **Modular architecture** - Efficient CSS organization
- **Critical CSS** - Above-the-fold styles prioritized
- **CSS compression** - Gzip compression enabled
- **Animation optimization** - GPU-accelerated transforms

### ** Server Optimizations**
- **Compression** - Gzip/Deflate for all text assets
- **Cache headers** - Optimal cache control policies
- **Security headers** - Performance-aware security
- **Keep-alive** - Reduced connection overhead

### ** Analytics & Monitoring**
- **Page visit tracking** - Daily visits and unique visitors
- **User behavior analytics** - Section views, link clicks, scroll depth
- **Performance monitoring** - Core Web Vitals, loading times, memory usage
- **Session tracking** - Time spent, interactions, bounce rate
- **Device & browser analytics** - Visitor technology breakdown
- **Export capabilities** - JSON export for external analysis

## Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Local server for development (Python, Node.js, or Apache)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KubinB/sulak-website.git
   cd sulak-website
   ```

2. **Start a local server** (required for section loading):
   ```bash
   # Python (recommended)
   python -m http.server 8000
   
   # Node.js alternative
   npx http-server -p 8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

4. **Wait for scripts to load** - The analytics commands will be available after the page fully loads (you'll see a console message confirming this)

## Analytics & Monitoring

When running locally, the website includes comprehensive analytics and performance monitoring:

### **How to Access Analytics**

1. **Start local server** and open `http://localhost:8000`
2. **Open browser developer console** (F12 or Ctrl+Shift+I)
3. **Wait for the message**: `Analytics commands available:`
4. **Run any of the available commands** listed below

### **Available Analytics Commands**
```javascript
// Get analytics summary
sulakAnalytics.summary()

// Generate detailed analytics report  
sulakAnalytics.report()

// Export analytics data as JSON
sulakAnalytics.export()

// Clear all analytics data
sulakAnalytics.clear()
```

### **Tracked Metrics**
- **Page Visits**: Daily visits, unique visitors, returning visitors
- **User Behavior**: Section views, link clicks, scroll depth, time spent
- **Performance**: Load times, Core Web Vitals, resource timing
- **Technology**: Device types (mobile/desktop/tablet), browsers, referrers
- **Session Data**: Interactions, navigation patterns, bounce rate

### **Data Storage**
Analytics data is stored locally in browser localStorage and can be exported for external analysis. Data includes:
- Visit analytics by date
- Section popularity and engagement
- Link click tracking (internal vs external)
- Session duration and interaction metrics
- Performance timing data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
