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
│   │   └── README.md      # CSS organization documentation
│   │
│   └── js/                # JavaScript functionality
│       ├── section-loader.js # Dynamic section loading system
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
