# Šulak Website - Modular Section Architecture

This website uses a **modular section loader** approach for maintainability and clean code organization.

## How It Works

1. **`index.html`** - Main page with container divs
2. **JavaScript dynamically loads** each section from this folder
3. **Edit any section file** and refresh browser to see changes
4. **Requires local server** to avoid CORS restrictions

## Section Files
Each section is its own HTML file for easy editing:

- **`header.html`** - Site header with logo and under-construction notice
- **`bios.html`** - Band member biographies and descriptions  
- **`origin.html`** - Šulak mythology and Babylonian demon lore
- **`information.html`** - General band info, links, and booking contact
- **`releases.html`** - Album releases and Spotify embed
- **`shows.html`** - Show listings, tour dates, and venue information
- **`merch.html`** - Merchandise store links
- **`music.html`** - Streaming platform links (Spotify, Apple Music, YouTube)
- **`contact.html`** - Contact information and booking details
- **`footer.html`** - Site footer with copyright

## Local Development 🔧

**Start a local server to view the site:**

```bash
# Python (recommended)
python -m http.server 8000

# Then open: http://localhost:8000
```

See `SERVER-SETUP.md` for more server options.

## File Structure
```
sulak-website/
├── index.html                    ← Main page with containers
├── SERVER-SETUP.md              ← Local server guide
├── sections/                    ← Edit these files!
│   ├── header.html
│   ├── bios.html
│   ├── origin.html
│   ├── information.html
│   ├── releases.html
│   ├── shows.html
│   ├── merch.html
│   ├── music.html
│   ├── contact.html
│   └── footer.html
└── src/
    ├── css/                     ← Modular stylesheets
    │   ├── styles.css
    │   ├── base.css
    │   ├── animations.css
    │   └── ...
    └── js/
        ├── section-loader.js    ← The magic happens here
        └── scripts.js           ← Main site functionality
```
