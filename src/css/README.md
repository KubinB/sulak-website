# CSS Architecture - Šulak Website

This document describes the modular CSS organization for the Šulak Band website.

## File Structure

```
src/css/
├── styles.css         # Main CSS file (imports all modules)
├── base.css           # Variables, typography, foundational styles
├── animations.css     # All keyframe animations and effects
├── layout.css         # Header, navigation, sections, footer layout
├── components.css     # Reusable components (links, embeds, counters)
├── effects.css        # Special visual effects (metal/fire text)
├── responsive.css     # Media queries and mobile optimization
├── social-media.css   # Social media integration and icons
└── README.md          # This documentation file
```

## Design System

### CSS Custom Properties (Variables)
Located in `base.css`, these variables ensure consistency across the site:

```css
/* Colors */
--primary-red: #cc3333;        /* Main brand color */
--highlight-red: #ff4444;      /* Hover and accent color */
--bright-red: #ff6666;         /* Brightest red for emphasis */
--gunmetal: #1c2329;           /* Dark backgrounds */
--gunmetal-dark: #0f1419;      /* Darker backgrounds */
--gunmetal-light: #242a31;     /* Lighter gunmetal variant */
--dark-bg: #0a0a0a;            /* Deepest black backgrounds */
--text-light: #f0f0f0;         /* Primary text color */

/* Gradients */
--gradient-gunmetal: linear-gradient(135deg, #1c2329, #0f1419);
--gradient-red: linear-gradient(135deg, #cc3333, #aa2222);

/* Effects */
--shadow-red: rgba(204, 51, 51, 0.5);
--shadow-gunmetal: rgba(28, 35, 41, 0.8);
--border-red: rgba(204, 51, 51, 0.6);
```

## File Descriptions

### `styles.css`
**Purpose:** Main CSS file that imports all other modules
**Contains:** 
- Import statements for all CSS modules
- Base font imports
- Global reset styles

### `base.css`
**Purpose:** Foundation styles and design system
**Contains:**
- CSS custom properties (color palette, gradients, shadows)
- Body styles with animated background
- Typography hierarchy (h1, h2, h3, p, lists)
- Base interactive element styles

### `animations.css`
**Purpose:** All keyframe animations used throughout the site
**Contains:**
- `backgroundShift` - Animated gradient backgrounds
- `characterFloat` - Floating Šulak character effects
- `particleFloat` - Glowing particle animations
- `headerPulse`, `navFlicker` - UI element animations
- `titlePulse`, `fadeInUp`, `slideInLeft` - Text animations
- `linkGlow`, `embedPulse` - Interactive element effects
- `metalShine`, `fireFlicker` - Special text effects
- `borderRotate`, `shimmer` - Border and accent animations

### `layout.css`
**Purpose:** Main structural layout and positioning
**Contains:**
- Header styling with logo positioning and effects
- Navigation bar with hover states and metal styling
- Section containers with floating animations
- Footer layout with glow effects and fixed positioning
- Z-index management for layered elements

### `components.css`
**Purpose:** Reusable component styles
**Contains:**
- Link styles (`.red-link`, `.red-link-bold` with glow effects)
- Album cover styling with hover transformations
- Spotify embed containers with rotating border effects
- Platform buttons for streaming services
- Band member biography cards and layouts
- Visit counter styling and positioning
- Grid layouts for merchandise and shows

### `effects.css`
**Purpose:** Special visual effects and text treatments
**Contains:**
- `.metal-text` - Metallic gradient text effect
- `.fire-text` - Animated fire-like text with flickering
- Glow effects and text shadows
- Special hover states with scale and rotation
- Particle effects and floating elements

### `responsive.css`
**Purpose:** Mobile optimization and responsive design
**Contains:**
- Mobile-first media queries
- Responsive typography scaling
- Touch-friendly interaction sizing
- Mobile navigation adjustments
- Responsive grid layouts for content

### `social-media.css`
**Purpose:** Social media integration and icon styling
**Contains:**
- Footer social media strip layout
- Platform-specific hover colors (Facebook blue, Instagram gradient, etc.)
- Social icon animations and effects
- Responsive social media positioning
- Integration with main site theme

## Mobile Optimization

Special attention to mobile experience:
- **Touch-friendly** button and link sizing
- **Readable typography** at all screen sizes
- **Efficient animations** that don't drain battery
- **Fast loading** through optimized CSS delivery
- **Accessible interactions** for all users

---

### effects.css
Special visual effects:
- `.metal-text` - Shining metal text effect
- `.fire-text` - Flickering fire text effect

### responsive.css
Media queries for mobile responsiveness:
- Navigation adjustments for smaller screens
- Album cover size adjustments
- Typography scaling
- Background character adjustments for mobile

## CSS Variables

The following CSS custom properties are defined in `base.css`:
- `--primary-red`: Main red color (#cc3333) - toned down from bright red
- `--accent-red`: Darker accent red (#aa2222)
- `--highlight-red`: Bright highlight red (#ff4444) - for high contrast elements
- `--bright-red`: Brightest red accent (#ff6666) - for hover states and emphasis
- `--gunmetal`: Primary gunmetal accent (#1c2329) - darker and more dramatic
- `--gunmetal-light`: Light gunmetal shade (#242a31) - subtle contrast
- `--gunmetal-dark`: Dark gunmetal shade (#0f1419) - deepest shadows
- `--dark-bg`: Primary dark background (#000000)
- `--dark-bg-alt`: Alternative dark background (#0a0a0a)
- `--dark-bg-red`: Dark red background (#0f0505)
- `--text-light`: Light text color (#f0f0f0)
- `--text-medium`: Medium text color (#cccccc)
- `--text-gunmetal`: Gunmetal text accent (#6a7a87) - muted for subtlety
- `--border-red`: Red border with transparency
- `--border-gunmetal`: Gunmetal border with transparency (darker)
- `--shadow-red`: Red shadow with transparency
- `--shadow-gunmetal`: Gunmetal shadow with transparency (darker and stronger)
- `--gradient-dark`: Main background gradient with darker gunmetal accents
- `--gradient-section`: Section background gradient with darker gunmetal
- `--gradient-gunmetal`: Pure darker gunmetal gradient

## Usage

To use these styles, simply link to the main `styles.css` file in your HTML:

```html
<link rel="stylesheet" href="src/css/styles.css">
```

The main file will automatically import all other necessary CSS modules.
