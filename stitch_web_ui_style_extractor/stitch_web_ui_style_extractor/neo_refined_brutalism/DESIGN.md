---
name: Neo-Refined Brutalism
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c2caaf'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#8c947b'
  outline-variant: '#424935'
  surface-tint: '#95da11'
  primary: '#a9f131'
  on-primary: '#223600'
  primary-container: '#8fd400'
  on-primary-container: '#385700'
  inverse-primary: '#446900'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#fbceff'
  on-tertiary: '#520e62'
  tertiary-container: '#f2a5ff'
  on-tertiary-container: '#743284'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#aff838'
  primary-fixed-dim: '#95da11'
  on-primary-fixed: '#121f00'
  on-primary-fixed-variant: '#334f00'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#fdd6ff'
  tertiary-fixed-dim: '#f4aeff'
  on-tertiary-fixed: '#340042'
  on-tertiary-fixed-variant: '#6b2a7b'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
  surface-elevated: '#0F0F0F'
  surface-card: '#1C1C1C'
  off-white: '#FAF5EF'
typography:
  display-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
spacing:
  stack-xl: 8rem
  stack-lg: 4rem
  stack-md: 2rem
  gutter: 1.5rem
  margin-desktop: 5rem
  margin-mobile: 1.25rem
  border-width: 3px
---

## Brand & Style
The design system embodies a "Refined Neubrutalist" aesthetic, specifically tailored for a high-end tech laboratory environment. It targets developers, engineers, and tech-forward innovators who value clarity, raw power, and precision. 

The visual language is characterized by a stark, high-contrast interface that utilizes heavy structural lines to create clear boundaries. By combining the intentional "unrefined" nature of Brutalism with a sophisticated, pure-black dark mode and precision-engineered typography, the UI evokes a feeling of being "under the hood" of a powerful, modern machine. It is authoritative, technical, and unapologetically bold.

## Colors
The palette is rooted in a "Pure Black" (#000000) foundation to achieve infinite depth and high energy efficiency on OLED displays. 

- **Primary:** A vibrant Lime Green (#8FD400) is used exclusively for status indicators, "Always Open" signaling, and critical success actions. It acts as the singular chromatic highlight against the monochrome backdrop.
- **Secondary:** White (#FFFFFF) serves as the primary ink color for headings and the background for high-impact neubrutalist cards.
- **Neutral/Surface:** We use a tiered dark grey system (#0F0F0F and #1C1C1C) to provide subtle separation between the deep background and interactive surface areas.

## Typography
The typographic hierarchy utilizes three distinct families to balance character with utility:

1.  **Headlines (Bricolage Grotesque):** Used for large displays and section headers. These must be set with **tight tracking** (negative letter spacing) and heavy weights to create a high-impact, editorial feel.
2.  **Body (Manrope):** Provides a clean, highly legible counterpoint to the expressive headlines. Used for all long-form text and descriptions.
3.  **Labels & Metadata (JetBrains Mono):** Injected for a "code-like" technical feel. Used for categories, tags, and small utility text.

Ensure all uppercase text in JetBrains Mono has increased letter spacing for legibility.

## Layout & Spacing
This design system employs a **fixed-width central container** for desktop (max-width: 1280px) to maintain readable line lengths, while utilizing a fluid 12-column grid within that container.

- **Vertical Rhythm:** Use generous "stack" spacing between major sections (8rem) to create an airy, premium feel that contrasts with the heavy borders.
- **Grid:** 12 columns for desktop, 6 for tablet, and 2 for mobile.
- **Margins:** High-impact "Refined Brutalism" relies on consistent 3px border widths across all structural components, creating a rhythmic, architectural look.

## Elevation & Depth
In this design system, depth is not conveyed through shadows or blurs, but through **Tonal Layering** and **Hard Strokes**.

- **Level 0 (Background):** Pure Black (#000000).
- **Level 1 (Surface):** Dark Grey (#0F0F0F) or Off-White (#FAF5EF). 
- **The "Lift" Effect:** Instead of shadows, use a 3px solid black border on light surfaces to "cut" them out of the background. For dark surfaces, use a subtle 1px border in a lighter grey (#1C1C1C) to define the edge.
- **Interaction:** On hover, components should translate -4px / -4px with a solid background "shadow" (a hard offset rectangle) appearing behind them, mimicking a physical pop-up.

## Shapes
The shape language is strictly **Sharp (0px)**. All containers, buttons, and input fields must have square corners to maintain the technical, brutalist aesthetic. The only exception is the "status dot" indicator, which remains a perfect circle to denote organic "liveness."

## Components

- **Buttons:** Primary buttons use a white background with a 3px solid black border and black text (Bricolage Grotesque, Bold). Hover state involves a color shift to the primary lime green (#8FD400) or a 4px offset "hard shadow."
- **Cards:** Use either a white (#FFFFFF) or off-white (#FAF5EF) background with a mandatory 3px black border. Content inside should have generous padding (2rem).
- **Chips/Tags:** Monospaced (JetBrains Mono) text inside a 1px bordered box. Use the primary green for "active" or "open" states.
- **Input Fields:** Clear, transparent backgrounds with a 2px white bottom-border only. On focus, the border turns to primary green. Use JetBrains Mono for placeholder text.
- **Status Indicators:** A small, pulsating circle of #8FD400 paired with "Always Open" in JetBrains Mono.
- **Lists:** Separated by 1px solid grey (#1C1C1C) horizontal rules, with significant vertical padding between items to ensure a "de-cluttered" feel.