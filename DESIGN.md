---
schemaVersion: 2
name: PrimeCore Design System
register: brand
updated: "2026-06-14T03:22:23+03:00"
sources:
  - PRODUCT.md
  - css/styles.css
colors:
  primeNight: "#101217"
  primeSurface: "#171a22"
  primeRaised: "#202631"
  commandCyan: "#38bdf8"
  signalIndigo: "#818cf8"
  ink: "#f6f7fb"
  mutedInk: "#b3bac8"
  dayCanvas: "#f4f7fb"
  daySurface: "#ffffff"
  dayRaised: "#eaf0f7"
  dayAccent: "#0284c7"
  dayIndigo: "#4f46e5"
  success: "#10b981"
  warning: "#f59e0b"
  dangerSoft: "#fecaca"
typography:
  headingFamily: "Outfit, sans-serif"
  bodyFamily: "Inter, sans-serif"
  h1: "clamp(2rem, 5vw, 3.5rem)"
  h2: "clamp(1.5rem, 4vw, 2.75rem)"
  h3: "clamp(1.25rem, 3vw, 2rem)"
  body: "clamp(0.875rem, 1.5vw, 1.0625rem)"
radii:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "clamp(3rem, 8vw, 6rem)"
components:
  primaryButton:
    backgroundColor: "{colors.commandCyan}"
    textColor: "#ffffff"
    borderRadius: "{radii.sm}"
    padding: "0.75rem 1.75rem"
  outlineButton:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    borderRadius: "{radii.sm}"
    padding: "0.75rem 1.75rem"
  card:
    backgroundColor: "{colors.primeSurface}"
    textColor: "{colors.ink}"
    borderRadius: "{radii.md}"
    padding: "1.75rem"
  packageCard:
    backgroundColor: "{colors.primeSurface}"
    textColor: "{colors.ink}"
    borderRadius: "{radii.lg}"
    padding: "2rem"
  input:
    backgroundColor: "{colors.primeNight}"
    textColor: "{colors.ink}"
    borderRadius: "{radii.sm}"
    padding: "0.95rem 1rem"
---

## 1. Overview

PrimeCore is a premium Arabic-first RTL technology storefront. Its public experience should feel like a curated high-end tech showroom: confident, precise, trustworthy, and bold without becoming noisy. The owner dashboard exists to support the catalog, but the public brand surface is the identity driver.

Creative north star: **The Precision Showroom**. Every page should feel selected and intentional, with strong hierarchy, calm density, sharp Arabic alignment, and cyan/blue accents used as signals rather than decoration.

The design language is dark-first. Light mode is a polished companion, not a replacement: soft daylight surfaces, dark readable text, restrained borders, and the same decisive cyan/indigo brand energy.

Core qualities:

- Premium: spacious but not empty, focused but not plain.
- Trustworthy: readable details, stable controls, clear contact paths, consistent cards and forms.
- Bold: strong headings, confident contrast, memorable visual presence, and accents that guide attention.
- Technical: precise borders, glassy header surfaces, measured glow, clean geometry, and no generic marketplace clutter.

## 2. Colors

PrimeCore uses a compact dark-first palette with cyan and indigo accents. Cyan is the action and trust signal; indigo gives depth and premium tension. Avoid spreading accents across every element. The strongest color moments should belong to CTAs, active navigation, prices, meaningful icons, and selected states.

Primary dark palette:

- Prime Night `#101217`: main page canvas.
- Prime Surface `#171a22`: standard raised surface and cards.
- Prime Raised `#202631`: secondary panels, image wells, inputs where needed.
- Ink `#f6f7fb`: main text.
- Muted Ink `#b3bac8`: secondary Arabic copy and metadata.
- Command Cyan `#38bdf8`: primary accent, active states, icons, prices.
- Signal Indigo `#818cf8`: gradient partner and premium depth.

Light mode palette:

- Day Canvas `#f4f7fb`: soft page background, never raw white.
- Day Surface `#ffffff`: cards and panels.
- Day Raised `#eaf0f7`: subtle fills and image wells.
- Day Text `#101827`: strong readable text.
- Day Muted `#5e697a`: secondary text.
- Day Accent `#0284c7`: cyan adapted for light backgrounds.
- Day Indigo `#4f46e5`: gradient partner and active depth.

Semantic colors:

- Success `#10b981`: new/available/positive states.
- Warning `#f59e0b`: used/attention states.
- Danger Soft `#fecaca`: error text on dark surfaces.

Usage rules:

- Use gradients only for important actions, active admin tabs, hero accents, and premium CTA panels.
- Use glow as atmosphere, not as a neon effect.
- Keep cards mostly neutral; let hierarchy, borders, and one accent line do the work.
- In light mode, preserve contrast with stronger text and softer surfaces rather than simply inverting the dark theme.

## 3. Typography

PrimeCore pairs `Outfit` for headings and interface emphasis with `Inter` for body copy. The site is Arabic RTL in experience, so line length, alignment, and rhythm must be judged visually in Arabic first.

Type scale:

- H1: `clamp(2rem, 5vw, 3.5rem)`.
- H2: `clamp(1.5rem, 4vw, 2.75rem)`.
- H3: `clamp(1.25rem, 3vw, 2rem)`.
- H4: `clamp(1rem, 2.5vw, 1.5rem)`.
- Body: `clamp(0.875rem, 1.5vw, 1.0625rem)`.
- Labels and badges: `0.75rem` to `0.95rem`, usually 600-700 weight.

Hierarchy rules:

- Hero headings should be large, compact, and assertive. They can carry the brand drama.
- Card headings should stay tighter and smaller; do not use hero-scale type inside dense panels.
- Paragraphs should stay comfortable, usually around `1.7` line height and `65ch` max width.
- Arabic copy should remain right-aligned unless a component has a clear reason to center.
- Avoid negative letter spacing. PrimeCore should feel crisp, not squeezed.

## 4. Elevation

Elevation is created through tonal layers, thin borders, and controlled shadow. The mood is premium technical glass, not heavy floating cards.

Base layers:

- Page canvas: Prime Night or Day Canvas.
- Header: translucent surface with blur and a scroll shadow.
- Cards: Prime Surface or Day Surface with a low-contrast border.
- Raised wells: Prime Raised or Day Raised for product images, icons, inputs, and muted panels.

Shadow system:

- Ambient card shadow: `0 14px 32px rgba(0, 0, 0, 0.22), 0 0 24px rgba(56, 189, 248, 0.08)`.
- Light card shadow: `0 18px 38px rgba(15, 23, 42, 0.08), 0 0 18px rgba(2, 132, 199, 0.05)`.
- Header shadow: stronger only when scrolled.
- CTA glow: small cyan glow around important header and hero actions.

Interaction motion:

- Use subtle transitions around `0.25s ease`.
- Cards may lift slightly on hover.
- Buttons may translate up by 1-2px and increase shadow.
- Respect reduced-motion preferences when adding new motion.

## 5. Components

Buttons:

- Primary buttons use the cyan/indigo gradient, white text, `8px` radius, and confident padding.
- Header `ابدأ الآن` should remain a stronger gradient than ordinary CTAs because it is a top-level action.
- Outline buttons are quiet, transparent, bordered, and become cyan-tinted on hover.
- Buttons must keep stable dimensions on mobile and never cause horizontal scroll.

Navigation:

- Desktop navigation is compact, right-to-left, and centered around clear active states.
- Active nav links use cyan/indigo underline treatment rather than large filled pills.
- Mobile navigation is a focused panel, not a full-screen takeover. It should preserve RTL order, contrast, and theme toggle access.

Cards:

- Standard `.pc-card` uses `--bg-secondary`, `--border`, `12px` radius, and an accent strip on hover.
- Product cards should feel catalog-like but curated: stable image wells, clear status badges, readable title/specs, and price emphasis.
- Package cards may be taller and more detailed; on mobile packages should stack one per row to keep Arabic details readable.
- Service cards should be concise, action-oriented, and use icon blocks rather than decorative illustrations.

Forms and owner workflows:

- Inputs use dark/light theme variables, `8px` radius, strong labels, and readable placeholders.
- Admin panels may be more utilitarian, but they should still share the PrimeCore surface, border, and accent language.
- Success and error messages must be high-contrast in both themes.

Theme toggle:

- The toggle is a compact utility control with moon/sun icon states.
- It should appear in public and owner contexts without becoming a primary CTA.
- Persist the selected theme in localStorage and preserve the default dark-first identity.

WhatsApp CTA:

- The floating WhatsApp button can be vivid green because it is a platform affordance.
- Keep it visually isolated from PrimeCore cyan/blue so it reads as contact, not brand decoration.

## 6. Do's and Don'ts

Do:

- Design Arabic RTL first, including spacing, reading rhythm, and navigation order.
- Keep PrimeCore dark-first, premium, bold, and technically confident.
- Use cyan/blue accents deliberately for actions, active states, icons, and prices.
- Make desktop hero sections feel composed and full without adding random decoration.
- Keep mobile layouts calm, readable, and free of horizontal scroll.
- Prefer fewer, stronger visual decisions over many small decorative effects.
- Maintain clear contrast in both dark and light modes.
- Keep public storefront pages more expressive than internal owner pages.

Don't:

- Do not make the site look like a cheap marketplace or generic electronics template.
- Do not use Bootstrap-like component density, default cards, or generic marketing sections.
- Do not turn the brand into a childish neon/gaming interface.
- Do not use random AI-style gradients as background decoration.
- Do not make light mode raw white, weak gray, or low contrast.
- Do not crowd product/package cards with too many competing badges or colors.
- Do not replace premium spacing with empty space; every large area should feel intentional.
- Do not let owner/admin needs define the public brand identity.
