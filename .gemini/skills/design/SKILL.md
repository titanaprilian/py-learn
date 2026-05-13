---
name: PyLearn Design System
colors:
  surface: "#fbf8ff"
  surface-dim: "#dbd9e1"
  surface-bright: "#fbf8ff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f5f2fa"
  surface-container: "#efedf4"
  surface-container-high: "#e9e7ef"
  surface-container-highest: "#e4e1e9"
  on-surface: "#1b1b21"
  on-surface-variant: "#454651"
  inverse-surface: "#303036"
  inverse-on-surface: "#f2eff7"
  outline: "#767682"
  outline-variant: "#c6c5d3"
  surface-tint: "#4b57aa"
  primary: "#142175"
  on-primary: "#ffffff"
  primary-container: "#2e3a8c"
  on-primary-container: "#9ea9ff"
  inverse-primary: "#bcc3ff"
  secondary: "#006b5f"
  on-secondary: "#ffffff"
  secondary-container: "#76f4e0"
  on-secondary-container: "#006f63"
  tertiary: "#4b2000"
  on-tertiary: "#ffffff"
  tertiary-container: "#6d3200"
  on-tertiary-container: "#f09b63"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#dfe0ff"
  primary-fixed-dim: "#bcc3ff"
  on-primary-fixed: "#000d60"
  on-primary-fixed-variant: "#333f91"
  secondary-fixed: "#79f7e3"
  secondary-fixed-dim: "#59dbc7"
  on-secondary-fixed: "#00201c"
  on-secondary-fixed-variant: "#005047"
  tertiary-fixed: "#ffdbc7"
  tertiary-fixed-dim: "#ffb689"
  on-tertiary-fixed: "#311300"
  on-tertiary-fixed-variant: "#723603"
  background: "#fbf8ff"
  on-background: "#1b1b21"
  surface-variant: "#e4e1e9"
  accent-amber: "#FFB100"
  bg-off-white: "#F8F9FA"
  surface-white: "#FFFFFF"
  text-high-contrast: "#1A1A1A"
  text-medium-contrast: "#4A4A4A"
  border-light: "#E0E0E0"
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.2"
  headline-lg:
    fontFamily: Inter
    fontSize: 39px
    fontWeight: "700"
    lineHeight: "1.2"
  headline-md:
    fontFamily: Inter
    fontSize: 31px
    fontWeight: "700"
    lineHeight: "1.3"
  headline-sm:
    fontFamily: Inter
    fontSize: 25px
    fontWeight: "600"
    lineHeight: "1.3"
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "400"
    lineHeight: "1.5"
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: "400"
    lineHeight: "1.6"
  label-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "600"
    lineHeight: "1.2"
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: "600"
    lineHeight: "1.2"
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 31px
    fontWeight: "700"
    lineHeight: "1.2"
  headline-md-mobile:
    fontFamily: Inter
    fontSize: 25px
    fontWeight: "700"
    lineHeight: "1.3"
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  xxl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 24px
---

# DESIGN.md - Learning Management System (LMS)

## Brand Identity

- **Name:** EduStream
- **Mission:** Streamlining education through intuitive, accessible, and engaging digital learning experiences.
- **Personality:** Professional, modern, encouraging, and clear.

## Visual Language

### Color Palette

- **Primary:** Deep Indigo (#2E3A8C) - Trust, authority, and focus.
- **Secondary:** Vibrant Teal (#00A896) - Growth, energy, and success.
- **Accent:** Amber (#FFB100) - Highlights, warnings, and achievements.
- **Neutral:**
  - Background: Off-white (#F8F9FA)
  - Surface: White (#FFFFFF)
  - Text (High Contrast): Dark Slate (#1A1A1A)
  - Text (Medium Contrast): Cool Gray (#4A4A4A)
  - Border/Divider: Light Gray (#E0E0E0)

### Typography

- **Headings:** 'Inter', sans-serif. Bold weights for hierarchy.
- **Body:** 'Inter', sans-serif. Regular weight (400) for readability, Semi-bold (600) for emphasis.
- **Scale:** Modular scale (1.25 ratio) for consistent sizing.

### Layout & Spacing

- **Grid:** 12-column responsive grid with 24px gutters.
- **Spacing System:** 8px base unit (8, 16, 24, 32, 48, 64).
- **Radius:** 8px for cards and buttons; 4px for input fields.
- **Elevation:** Subtle shadows (Soft Blur) for depth on cards and navigation bars.

### Component Patterns

- **Buttons:**
  - Primary: Filled Deep Indigo, white text.
  - Secondary: Outlined Deep Indigo.
  - Success: Filled Teal.
- **Inputs:** Clean, outlined fields with clear labels and helpful focus states.
- **Cards:** White background, subtle border, and soft shadow.

## User Persona: Learner

- **Goals:** Access course material quickly, track progress, and complete assignments.
- **Pain Points:** Cluttered interfaces, confusing navigation, and lack of visual feedback.
