# Assets Directory

This directory contains all static assets for the Šulak Band website, organized by type and purpose for easy maintenance and optimal performance.

## Directory Structure

```
assets/
├── images/                    # All visual assets
│   ├── favicon/               # Website favicons and app icons
│   │   ├── favicon.ico        # Main favicon
│   │   ├── favicon-16x16.png  # 16px favicon
│   │   ├── favicon-32x32.png  # 32px favicon
│   │   ├── apple-touch-icon.png # iOS app icon
│   │   ├── android-chrome-192x192.png # Android icon
│   │   ├── android-chrome-512x512.png # Android icon
│   │   └── site.webmanifest   # Web app manifest
│   │
│   ├── Bios/                  # Band member photographs
│   │   ├── alekh.jpg          # Alekh - Guitarist
│   │   ├── bandphoto.jpg      # Full band photo
│   │   ├── Bill.jpg           # Bill - Guitarist
│   │   ├── brenden.jpg        # Brenden - Bassist
│   │   ├── Gavin.jpg          # Gavin - Lead Vocalist
│   │   └── Jake.jpg           # Jake - Drummer
│   │
│   ├── Icons/                 # UI and social media icons
│   │   ├── facebook.png       # Facebook social icon
│   │   ├── instagram.png      # Instagram social icon
│   │   ├── tiktok.png         # TikTok social icon
│   │   ├── email.png          # Email contact icon
│   │   ├── email2.png         # Alternative email icon
│   │   ├── applemusic.png     # Apple Music platform icon
│   │   ├── spotify.png        # Spotify platform icon
│   │   ├── youtube.png        # YouTube platform icon
│   │   ├── linktree.png       # Linktree social icon
│   │   ├── cart.png           # Shopping cart icon
│   │   └── cart2.jpg          # Alternative cart icon
│   │
│   ├── album-art/             # Album covers and music artwork
│   │   └── album_cover.jpeg   # Main album artwork
│   │
│   ├── merch-preview/         # Merchandise preview images
│   │   ├── shirt.jpg          # T-shirt preview
│   │   ├── hoodie.jpg         # Hoodie preview
│   │   ├── hat.jpg            # Hat preview
│   │   └── womens tank.jpg    # Women's tank top preview
│   │
│   ├── show-fliers/           # Concert promotional materials
│   │   ├── current/           # Upcoming shows
│   │   └── past/              # Past show archives
│   │       ├── 1-Haltom Jan-25-25.jpg
│   │       ├── 2-Renos Feb-7-25.png
│   │       ├── 3-Haltom Feb-23-25.jpg
│   │       ├── 4-Haltom Mar-21-25.jpg
│   │       ├── 5-TubBar Mar-30-25.jpg
│   │       └── 6-TxTeaRoom Apr-16-25.jpg
│   │
│   ├── header_logo.jpg        # Main header logo
│   ├── logo_blk.png          # Black version of logo
│   ├── logo_wht.png          # White version of logo
│   ├── sulak_color.png       # Color version of logo
│   └── under-construction.png # Temporary construction notice
└── README.md                  # This documentation file
```

## Image Guidelines

### Formats
- **Logos:** PNG with transparency preferred
- **Photos:** JPG for optimal file size
- **Icons:** PNG for crisp edges and transparency
- **Favicons:** ICO and PNG formats for compatibility

### Sizing Recommendations
- **Social Icons:** 32x32px or 64x64px for web display
- **Band Photos:** High resolution (1200px+ width) for quality
- **Album Art:** Square format, 500x500px minimum
- **Merch Previews:** Consistent aspect ratio for grid display

### Optimization
- Compress images for web without losing quality
- Use appropriate formats (PNG for transparency, JPG for photos)
- Consider WebP format for modern browsers (future enhancement)

## Naming Conventions

- **Lowercase with underscores** for consistency: `logo_wht.png`
- **Descriptive names** that indicate purpose: `under-construction.png`
- **Date format** for show fliers: `venue_month-day-year.jpg`
- **Size indicators** for favicons: `favicon-32x32.png`

## Adding New Assets

When adding new images:

1. **Choose appropriate directory** based on image purpose
2. **Follow naming conventions** for consistency
3. **Optimize file size** before adding to repository
4. **Update this README** if adding new categories
5. **Test on multiple devices** to ensure proper display

## erformance Notes

- All images are optimized for web delivery
- Favicon package includes multiple sizes for different devices
- Social media icons use consistent sizing for uniform appearance
- Show fliers are archived by date for easy organization

## Responsive Considerations

Images are used responsively throughout the site:
- CSS handles scaling and positioning
- Multiple favicon sizes serve different device needs
- Social icons maintain consistent appearance across screen sizes

---

*Keep this directory organized and well-documented for optimal website performance and maintainability.*