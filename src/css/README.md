# CSS Organization

This document describes the organization of the CSS files for the Sulak website.

## File Structure

```
src/css/
├── styles.css        # Main CSS file that imports all others
├── base.css          # Base styles, CSS variables, typography, and foundational elements
├── animations.css    # All keyframe animations
├── layout.css        # Header, navigation, sections, footer layout styles
├── components.css    # Specific components (links, album covers, Spotify embeds)
├── effects.css       # Special visual effects (metal text, fire text)
└── responsive.css    # Media queries and responsive design styles
```

## File Descriptions

### styles.css
The main CSS file that imports all other CSS modules. This is the only file that needs to be linked in the HTML.

### base.css
- CSS custom properties (variables) for colors and gradients
- Body styles and background effects
- Basic typography (h1, h2, p, ul, li)
- Foundational list item styles and hover effects

### animations.css
All keyframe animations used throughout the site:
- `backgroundShift` - Animated gradient background
- `characterFloat` - Sulak character floating animation
- `particleFloat` - Glowing particle effects
- `headerPulse`, `navFlicker`, `sectionFloat` - Layout animations
- `titlePulse`, `fadeInUp`, `slideInLeft` - Typography animations
- `linkGlow`, `embedPulse`, `borderRotate` - Component animations
- `metalShine`, `fireFlicker` - Effect animations

### layout.css
Main structural layout styles:
- Header with logo and animations
- Navigation bar with hover effects
- Section containers with floating animations
- Footer with glow effects

### components.css
Specific component styles:
- Link styles (`.red-link`, `.red-link-bold`)
- Album cover styling with hover effects
- Spotify embed container with rotating border effect

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
