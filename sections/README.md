# Šulak Website - Modular Section Architecture

This website uses a **modular section loader** approach for maintainability, clean code organization, and easy content management.

## How It Works

1. **`index.html`** - Main page with container divs for each section
2. **JavaScript dynamically loads** each section from this folder via `section-loader.js`
3. **Edit any section file** and refresh browser to see changes instantly
4. **Requires local server** to avoid CORS restrictions (see SERVER-SETUP.md)

## Section Files

Each section is its own HTML file for easy editing and maintenance:

### Core Sections
- **`header.html`** - Site header with Šulak logo and branding
- **`information.html`** - General band info, description, and key links
- **`music.html`** - Streaming platform links (Spotify, Apple Music, YouTube)
- **`releases.html`** - Album releases with embedded Spotify player
- **`shows.html`** - Tour dates, venue information, and show fliers
- **`bios.html`** - Band member biographies with photos and descriptions
- **`merch.html`** - Merchandise preview grid and store links
- **`origin.html`** - Šulak mythology and Babylonian demon lore
- **`contact.html`** - Contact information and booking details
- **`footer.html`** - Social media links, visit counter, and copyright

### Content Features
- **Responsive design** - All sections adapt to mobile and desktop
- **Social media integration** - Platform-specific styling and links
- **Interactive elements** - Hover effects and smooth animations
- **Performance optimized** - Lazy loading and efficient rendering

## Local Development

**Start a local server to view the site:**

```bash
# Python (recommended)
python -m http.server 8000
# Then open: http://localhost:8000

# Node.js alternative
npx http-server -p 8000

# PHP alternative (if installed)
php -S localhost:8000
```

See `SERVER-SETUP.md` for additional server options and troubleshooting.

## Complete File Structure

```
sulak-website/
├── index.html                    ← Main page with section containers
├── .htaccess                     ← Server configuration & security
├── robots.txt                    ← Search engine directives
├── SERVER-SETUP.md              ← Local development guide
│
├── sections/                    ← Edit these files for content!
│   ├── header.html              ← Logo and site branding
│   ├── information.html         ← Band info and description
│   ├── music.html               ← Streaming platform links
│   ├── releases.html            ← Albums with Spotify embed
│   ├── shows.html               ← Tour dates and venues
│   ├── bios.html                ← Member biographies
│   ├── merch.html               ← Merchandise and store
│   ├── origin.html              ← Mythology and lore
│   ├── contact.html             ← Contact and booking
│   ├── footer.html              ← Social links and copyright
│   └── README.md                ← This documentation
│
├── src/                         ← Source code and styles
│   ├── css/                     ← Modular CSS architecture
│   │   ├── styles.css           ← Main CSS file (imports all)
│   │   ├── base.css             ← Variables and foundations
│   │   ├── animations.css       ← All keyframe animations
│   │   ├── layout.css           ← Header, nav, footer layout
│   │   ├── components.css       ← Reusable components
│   │   ├── effects.css          ← Metal/fire text effects
│   │   ├── responsive.css       ← Mobile optimization
│   │   ├── social-media.css     ← Social integration
│   │   └── README.md            ← CSS documentation
│   │
│   └── js/                      ← JavaScript functionality
│       ├── section-loader.js    ← Dynamic section loading
│       └── scripts.js           ← Visit counter & interactions
│
└── assets/                      ← Static assets
    ├── images/                  ← All visual assets
    │   ├── favicon/             ← Website icons
    │   ├── Bios/                ← Band member photos
    │   ├── Icons/               ← Social media icons
    │   ├── album-art/           ← Album covers
    │   ├── merch-preview/       ← Merchandise images
    │   └── show-fliers/         ← Concert promotional materials
    └── README.md                ← Asset documentation
```

##  Adding New Sections

1. **Create new HTML file** in `/sections/` directory
2. **Add container div** to `index.html`:
   ```html
   <div id="newsection-container">
       <!-- Content will be loaded from sections/newsection.html -->
   </div>
   ```
3. **Update navigation** in `index.html` if needed:
   ```html
   <a href="#newsection">New Section</a>
   ```
4. **Section auto-loads** via JavaScript - no additional configuration needed

## Mobile Optimization

All sections are designed to be mobile-responsive:
- **Touch-friendly** interaction areas
- **Readable typography** at all screen sizes
- **Optimized images** for faster mobile loading
- **Efficient layouts** that work on small screens

## Brand Consistency

Maintain the Šulak brand identity across all sections:
- **Dark color palette** with strategic red accents
- **Metal typography** using `.metal-text` and `.fire-text` classes
- **Consistent spacing** and layout patterns
- **Unified animation** timing and effects

---
