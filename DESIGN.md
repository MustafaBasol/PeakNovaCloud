---
version: 1.0
name: PeakNova-design-system
description: White canvas for an AI-native engineering studio. One interactive blue, the logo blue. Gold stays in the logo. Apple-grade restraint in typography, spacing and motion. The UI stays quiet.

colors:
  # Brand (measured from public/brand/logo-full-transparent.png)
  brand-blue: "#1558A5"        # logo blue. Brand surfaces and logo only. NOT for text on dark (2.8:1)
  brand-gold: "#BBA43F"        # logo gold. Stars, summit moment, 1 highlight per page max. Never a button

  # Canvas (white theme, locked site-wide)
  bg: "#FFFFFF"                # page background
  surface: "#F4F6F8"           # raised areas (form, cards, code blocks)
  surface-2: "#E8EDF2"         # hover on surface, inputs
  line: "rgba(20,24,31,0.08)"  # hairlines
  line-strong: "rgba(20,24,31,0.16)" # input borders, focus-adjacent

  # Text
  text: "#14181F"              # ~18:1 on white
  text-muted: "#3E4856"        # ~9:1 on white, body secondary
  text-subtle: "#5A6573"       # ~5.9:1 on white, captions, meta. Never below this

  # Interactive (single accent family, the logo blue)
  accent: "#1558A5"            # primary button fill. White text ~7:1
  accent-hover: "#114A8C"      # hover/pressed
  accent-link: "#1558A5"       # links on white, ~7:1
  accent-link-hover: "#0E3F78"
  focus-ring: "#1558A5"

  # Summit mark (a hairline, not body text)
  gold-text: "#8A7420"         # darker than logo gold so a thin rule reads on white

  # Status (forms only)
  danger: "#B42318"
  success: "#067647"

typography:
  family-sans: "Geist, system-ui, -apple-system, 'Segoe UI', sans-serif"
  family-mono: "'Geist Mono', ui-monospace, 'SF Mono', monospace"
  display-xl: { size: "clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)", weight: 600, lineHeight: 1.04, tracking: "-0.035em" }
  display-lg: { size: "clamp(2rem, 1.4rem + 2.4vw, 3.25rem)", weight: 600, lineHeight: 1.08, tracking: "-0.03em" }
  display-md: { size: "clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)", weight: 600, lineHeight: 1.15, tracking: "-0.02em" }
  lead:       { size: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)", weight: 400, lineHeight: 1.5, tracking: "-0.01em" }
  body:       { size: "1.0625rem", weight: 400, lineHeight: 1.6, tracking: "-0.006em" }   # 17px like Apple
  body-sm:    { size: "0.9375rem", weight: 400, lineHeight: 1.55, tracking: "0" }
  caption:    { size: "0.8125rem", weight: 500, lineHeight: 1.4, tracking: "0.005em" }
  mono:       { size: "0.8125rem", weight: 400, lineHeight: 1.5, tracking: "0" }
  button:     { size: "0.9375rem", weight: 500, lineHeight: 1, tracking: "-0.005em" }

spacing:   # 4px base
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "6": 24px
  "8": 32px
  "12": 48px
  "16": 64px
  "24": 96px
  "32": 128px
  "40": 160px
  section-y: "clamp(96px, 12vw, 176px)"
  gutter: "clamp(16px, 4vw, 40px)"

layout:
  max-width: 1280px
  text-measure: 64ch
  grid: "12 columns desktop, 6 tablet, 4 mobile"
  nav-height: 64px

radius:   # documented rule: pills for actions, 16 for containers, 10 for inputs
  input: 10px
  container: 16px
  media: 16px
  pill: 9999px

elevation:
  none: "none"                  # default. Hierarchy comes from surface color and space
  hairline: "0 0 0 1px var(--line)"
  floating: "0 1px 0 rgba(255,255,255,0.8) inset, 0 12px 40px rgba(20,24,31,0.06)"  # nav when scrolled, dialogs only

motion:
  ease-out: "cubic-bezier(0.16, 1, 0.3, 1)"
  ease-in-out: "cubic-bezier(0.65, 0, 0.35, 1)"
  duration-micro: 160ms
  duration-ui: 240ms
  duration-reveal: 600ms
  stagger: 50ms
  reveal-distance: 16px

components:
  button-primary: { bg: "{colors.accent}", text: "#FFFFFF", radius: "{radius.pill}", padding: "12px 22px", height: 44px, typography: "{typography.button}", hover: "{colors.accent-hover}", active: "scale(0.98)" }
  button-secondary: { bg: "transparent", text: "{colors.text}", border: "1px solid {colors.line-strong}", radius: "{radius.pill}", padding: "12px 22px", height: 44px, hover-bg: "rgba(20,24,31,0.04)" }
  text-link: { color: "{colors.accent-link}", hover: "{colors.accent-link-hover}", underline: "on hover, 1px, offset 3px" }
  nav: { height: 64px, bg-top: "rgba(255,255,255,0.86)", bg-scrolled: "rgba(255,255,255,0.86) + backdrop-blur(20px) saturate(160%)", border-scrolled: "1px solid {colors.line}" }
  input: { bg: "{colors.surface-2}", border: "1px solid {colors.line-strong}", radius: "{radius.input}", height: 48px, font-size: "16px min (iOS zoom)", focus: "2px ring {colors.focus-ring}, offset 2px" }
  card: { bg: "{colors.surface}", border: "1px solid {colors.line}", radius: "{radius.container}", padding: "32px" }
  footer: { bg: "{colors.bg}", border-top: "1px solid {colors.line}", text: "{colors.text-muted}" }
---

## Overview

The canvas is white. Text is near-black. The only interactive color is the logo blue. There is no 3D scene on the page.

The UI behaves like Apple's: confident type, generous space, one accent, almost no chrome.

**Key characteristics**
- One theme for the whole site (white). Sections do not invert to a dark band.
- One interactive color family (`accent`, `accent-link`). Nothing else is clickable-looking.
- Gold stays in the logo. The closing section may use one thin gold rule. Max one gold element per viewport.
- Hierarchy comes from size, weight and space. Not from boxes, shadows or gradients.
- Every motion explains something: where content comes from, where the user is in the climb, that an action was received.

## Colors

- `brand-blue` is the logo color and the only button and link color. White text on it is about 7:1.
- `accent` and `accent-link` are that same blue. One family.
- Neutrals are cool, not warm gray.
- The page background is white. Near-black is for text, not for surfaces.
- No decorative gradients in the UI.

## Typography

- Geist Sans for everything, Geist Mono only for small technical labels (stack names, code, data in case studies). Two families, never more.
- Display weight 600 with negative tracking. Body 17px at 1.6.
- Headlines use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.
- Max measure 64ch for body copy.
- Emphasis inside a headline: weight or `text-muted` color shift within the same family. Never a different font, never gradient text.
- Uppercase micro-labels ("eyebrows"): max 1 per 3 sections across the page.
- `font-variant-numeric: tabular-nums` wherever numbers are compared.

## Layout

- 12-column grid, max width 1280px, fluid gutters. Text-heavy pages (blog, legal) use a 720px column.
- Section vertical rhythm: `section-y`. Within a section: 48 to 64px between headline block and content.
- Home sections are left-aligned. On mobile, content is full width.
- At least 4 different layout families across the home page. No layout family twice in a row. No more than 2 consecutive image/text splits.
- Hero: max 4 text elements, headline max 2 lines at 1440, subtext max 20 words.

## Elevation & depth

Flat by default. Depth comes from `surface` vs `bg`, and from the nav's frosted state after scroll. The `floating` shadow is used only on the scrolled nav and on dialogs.

## Shapes

Documented rule, applied everywhere: **actions are pills, containers and media are 16px, inputs are 10px.** Full-bleed bands have 0 radius.

## Components

- **Nav:** logo left, 5 links center or right (Services, Work, Blog, About, plus the locale switcher), one primary button "contact" intent right. Transparent at top, frosted after 24px of scroll. Single line at 1024px+; below that a full-screen sheet menu with focus trap.
- **Primary button:** pill, `accent` fill, 44px height, one-line label (max 3 words), `scale(0.98)` on press, focus ring 2px `focus-ring` with 2px offset.
- **Only one contact label per locale**, used in nav, hero, summit and footer (see content brief).
- **Cards:** only where items are browsable and comparable (blog list, work list). Services are not cards on the home page.
- **Forms:** label above, helper below, error below in `danger` with an icon and text (never color only), 48px inputs, 16px min font size.
- **Media frames:** 16px radius, `line` hairline, real images only. Missing assets render a visible, labeled placeholder in development and block production builds.

## Motion

| Use | Spec |
|---|---|
| Section reveal | opacity 0 to 1, y 16px to 0, 600ms `ease-out`, once, 50ms stagger, triggered at 30% visibility |
| Hover (buttons, links) | 160ms color/background, no movement except a 1px arrow nudge on link arrows |
| Press | `scale(0.98)`, 120ms |
| Nav frost | 240ms background + border |
| Page transitions | none (instant navigation is the Apple feel) |

All motion is disabled or reduced to opacity-only under `prefers-reduced-motion: reduce`.

## Do's and Don'ts

**Do**
- Keep the UI quiet. The logo carries the mark.
- Use real NoraMedi screenshots (demo data) in framed media.
- Write short: headline ≤ 8 words, supporting paragraph ≤ 25 words per block on the home page.
- Keep gold rare enough that it means "you arrived".

**Don't**
- No purple/indigo "AI glow", no neon, no glassmorphism on content blocks, no mesh blobs.
- No three equal feature cards, no zigzag stacks, no section-number eyebrows ("01 / Services").
- No div-built fake dashboards, fake terminals or fake chat windows.
- No invented metrics, logos, testimonials, awards or certifications.
- No scroll cue ("Scroll to explore"), no custom cursor, no preloader screen.
- No em dash or en dash in visible text.

## Responsive behavior

| Width | Changes |
|---|---|
| < 640 | single column, nav sheet, display sizes at clamp minimum |
| 640 to 1023 | 6-col grid, nav sheet |
| 1024 to 1439 | full nav, 12-col |
| ≥ 1440 | content locks at 1280 |

Touch targets ≥ 44px. Respect `env(safe-area-inset-*)`.
