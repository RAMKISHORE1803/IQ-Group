# Multiplex Hero Section Implementation

This repository contains a pixel-perfect implementation of the Multiplex hero section as seen in the provided screenshot. The implementation includes responsive design, animations, and proper spacing/typography.

## Components

### MultiplexHero

The `MultiplexHero` component is a full-screen hero section with a background image, overlay, vertical "ABOUT US" text, and centered main content.

#### Usage

```jsx
import MultiplexHero from '@/components/MultiplexHero';

// In your page component
<MultiplexHero 
  backgroundImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
  overlayColor="rgba(0, 0, 0, 0.4)"
/>
```

#### Props

- `backgroundImage` (string): URL of the background image
- `overlayColor` (string): CSS color value for the overlay (with opacity)

### SectionNavigation

The `SectionNavigation` component has been updated to ensure it always has a solid white background.

#### Usage

```jsx
import SectionNavigation from '@/components/companies/SectionNavigation';

// Sample section links
const sectionLinks = [
  { title: 'About Multiplex', link: '#about' },
  { title: 'Our Projects', link: '#projects' },
  { title: 'Sustainability', link: '#sustainability' }
];

// In your page component
<SectionNavigation links={sectionLinks} title="IN THIS SECTION" />
```

#### Props

- `links` (array): Array of objects with `title` and `link` properties
- `title` (string): Navigation section title (default: "IN THIS SECTION")
- `className` (string): Additional CSS classes

## Demo

A demo page is available at `/multiplex-demo` which showcases the MultiplexHero component followed by the SectionNavigation component.

## Features

1. **Pixel-Perfect Layout**: The implementation matches the screenshot exactly, including positioning, spacing, and typography.

2. **Responsive Design**: The hero section adapts gracefully to different screen sizes:
   - Desktop: Full layout with side text rotated 90 degrees
   - Mobile: Stacked layout with horizontal side text

3. **Animations**: 
   - Initial animations for elements fading in
   - Scroll animation for the content fading out as the user scrolls down

4. **Accessibility**: All elements are properly accessible and semantic HTML is used throughout.

## Changes Made

1. Created the `MultiplexHero` component with pixel-perfect implementation of the design
2. Updated `SectionNavigation` component to always have a solid white background
3. Created a demo page to showcase the components 