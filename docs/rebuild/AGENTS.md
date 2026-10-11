# PeakNova Website Rebuild: Agent Handbook

> Read this file completely before writing any code. Then read, in order:
> 1. `DESIGN.md` (design system, tokens, visual rules)
> 2. `docs/site-spec.json` (routes, page sections, redirects, form schema, SEO)
> 3. `docs/content-brief.md` (positioning, voice, source copy, glossary)
> 4. `.cursor/rules/*.mdc` (enforced rules, auto-attached by Cursor)
>
> If anything in these files conflicts, priority is: owner instruction in chat > AGENTS.md > DESIGN.md > .cursor/rules > docs/*.

---

## 1. Mission

Rebuild `https://www.peaknovas.com` from a Salesforce-consultancy site into the site of an **AI-native engineering studio**.

**Quality bar (owner's words, non-negotiable):** a visitor must immediately think *"this was built by people who know exactly what they are doing."* Apple-level UX: calm, precise, fast, nothing accidental. Mediocre output is a failed task, not a first draft.

**Signature moment:** a scroll-driven 3D journey up a snowy mountain (the PeakNova logo mark). Scrolling climbs the mountain; the page ends at the summit where the two gold stars of the logo ignite next to the contact call to action.

### Audience
| Segment | Region | What they need to see in 10 seconds |
|---|---|---|
| Founders, COOs, Heads of Ops at SMEs and mid-market | EU (FR, DE first) + TR | "These people can put AI agents into our real operations, safely." |
| Technical buyers (CTO, Eng Lead) | EU + TR | Engineering depth: architecture, data protection, reliability |
| Existing Salesforce clients | EU + TR | CRM/Salesforce expertise still exists (secondary) |

### Positioning hierarchy (strict)
1. **AI Agents** (primary)
2. **AI solutions** (LLM integration, RAG, AI features inside products)
3. **Automation** (workflow and process automation, n8n / custom)
4. **Full-stack custom software** (web platforms, SaaS)
5. **CRM & Salesforce** (a real service, never on the hero). One hub page under Services. The existing offering pages stay and are reached from that hub, restyled to this site.

**Product:** NoraMedi (`https://noramedi.com`), a multi-tenant clinic operating platform built by PeakNova. It is the flagship case study.

**Never mention:** "Autoviseo" (discontinued, must not appear anywhere). Team size or headcount (owner does not want it public).

---

## 2. Decisions

### Locked by the owner
| ID | Decision |
|---|---|
| L1 | Domain stays `peaknovas.com` |
| L2 | Locales: `tr`, `en`, `fr`, `de` (all four complete, no half-translated pages) |
| L3 | Logo is kept as is. Assets in `public/brand/`. Do not redraw, recolor or "improve" it |
| L4 | Blog and case studies are required |
| L5 | Single conversion path: **contact form** (no demo booking, no calendar embed) |
| L6 | Hosting: **Hostinger** |
| L7 | AI / AI Agents / custom development is primary. Salesforce stays a service: hub at `/services/crm-salesforce/`, existing offering pages kept and restyled, not deleted |

### Defaults applied (owner has not confirmed yet; build so they are easy to change)
| ID | Default | Alternative | How to keep it reversible |
|---|---|---|---|
| D1 | **White theme, locked site-wide** (owner, 11 Oct 2026) | Dark | All colors via CSS custom properties in `DESIGN.md` tokens. No hard-coded hex in components |
| D2 | **Static export** (`output: "export"`), works on every Hostinger plan | Node server on Hostinger VPS / Node plan | No server-only Next.js features (no middleware, no ISR, no route handlers, no server actions). Contact form posts to a PHP endpoint (see §6) |

If the owner later says "light theme" or "we have a VPS", only tokens and deployment change, not components.

---

## 3. Before you start: install the design skills

These skills were selected by the owner. Install them into the repo so Cursor's agent can load them:

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend
npx skills add https://github.com/Leonxlnx/taste-skill --skill redesign-skill
npx skills add https://github.com/Leonxlnx/taste-skill --skill output-skill
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
git clone --depth 1 https://github.com/VOIDXAI/taste .agents/taste
git clone --depth 1 https://github.com/VoltAgent/awesome-design-md .agents/awesome-design-md
```

Copies of the most relevant references are already vendored in `docs/reference/` (Apple and Linear DESIGN.md, Vercel Web Interface Guidelines).

**How to use them:**
- `design-taste-frontend`: apply its Section 14 **Pre-Flight Check** before declaring any page done.
- `web-design-guidelines`: run it as an audit on every PR-sized change (`file:line` findings, fix all).
- `taste`: use for code review of architecture and components at the end of each phase.
- `docs/reference/apple.DESIGN.md`: reference for rhythm, typography discipline, single-accent rule. Do not copy Apple's colors or fonts; our tokens are in `DESIGN.md`.

---

## 4. Stack

Use the latest stable release of each. Verify before installing; do not assume versions.

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router), React, TypeScript `strict` | `output: "export"`, `trailingSlash: true`, `images.unoptimized: true` |
| Styling | Tailwind CSS v4 + CSS custom properties | Tokens from `DESIGN.md` live in `src/styles/tokens.css` |
| i18n | `next-intl` (static rendering mode) | `generateStaticParams` for all locales. No middleware (static export) |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei`, `maath` | Lazy loaded, client-only, see `.cursor/rules/20-scene.mdc` |
| Scroll driving | `gsap` + `ScrollTrigger` | Only for scene progress and pinned sections |
| UI motion | `motion` (`motion/react`) | Never inside the R3F tree, never in the same component as GSAP |
| Content | MDX via `velite` or `content-collections` | Blog and case studies in `content/{locale}/...` |
| Icons | `@phosphor-icons/react` | One family, one weight (`regular`), never hand-drawn SVG icons |
| Fonts | Geist Sans + Geist Mono (self-hosted via `geist` package / `next/font/local`) | Verify glyph coverage for `ğ ı İ ş ç ö ü é è à ç ß ä` before committing |
| Forms | Native form + small client component, server endpoint in PHP | See §6 |
| Images | Pre-optimized at build time with `sharp` (AVIF + WebP + fallback) | Script: `scripts/optimize-images.ts` |
| Analytics | None by default. If the owner asks: Plausible or Umami (cookieless) | Cookieless means no consent banner needed |
| Quality | ESLint, Prettier, `tsc --noEmit`, Playwright smoke tests, Lighthouse CI | All must pass in CI |

**Banned:** jQuery, Bootstrap, any UI kit used in its default look, `lucide-react`, Google Fonts `<link>`, CSS-in-JS runtimes, `window.addEventListener("scroll")`, smooth-scroll hijacking libraries on by default.

---

## 5. Repository structure

```
.
├── AGENTS.md  DESIGN.md
├── .cursor/rules/              # enforced rules (auto-attached)
├── docs/                       # site-spec.json, content-brief.md, reference/
├── content/
│   ├── tr/ en/ fr/ de/
│   │   ├── blog/*.mdx
│   │   └── work/*.mdx
├── messages/{tr,en,fr,de}.json # UI strings (next-intl)
├── public/
│   ├── brand/                  # logo files (do not modify)
│   ├── scene/                  # poster stills, optional GLB
│   ├── api/contact.php         # form endpoint (deployed as-is to Hostinger)
│   └── .htaccess               # generated by scripts/gen-htaccess.ts
├── scripts/                    # gen-htaccess.ts, optimize-images.ts, gen-sitemap.ts, gen-og.ts
└── src/
    ├── app/[locale]/...        # routes from docs/site-spec.json
    ├── components/
    │   ├── ui/                 # Button, Link, Input, Textarea, Checkbox, Select...
    │   ├── layout/             # Nav, Footer, LocaleSwitcher, SkipLink
    │   ├── sections/           # one file per section in site-spec
    │   └── scene/              # 3D only (client)
    ├── lib/                    # i18n config, content loaders, seo helpers, scroll-progress store
    └── styles/                 # tokens.css, globals.css
```

---

## 6. Hosting and deployment (Hostinger, static)

- Build: `next build` produces `out/`. Upload `out/` to `public_html/` (Hostinger Git deploy or FTP via CI).
- **Routing:** Next.js `redirects()` does not work with static export. Generate `public/.htaccess` from `docs/site-spec.json` with `scripts/gen-htaccess.ts`:
  - 301 redirects for every legacy URL in `redirects`.
  - `/` redirects to the best locale using `Accept-Language` (`tr`, `fr`, `de`, else `en`). Never by IP.
  - Force HTTPS and `www`.
  - Long cache for hashed assets (`/_next/static/*`: 1 year, immutable), short cache for HTML.
  - Security headers: `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, a CSP that allows only self + required origins.
  - Custom 404 per locale (`out/{locale}/404.html`).
- **Contact form endpoint:** `public/api/contact.php`
  - Accepts `POST` JSON only, validates every field server-side against the schema in `docs/site-spec.json`.
  - Honeypot field + minimum fill time (3 s) + simple file-based rate limit (5 requests / IP / hour).
  - Sends via SMTP (Hostinger mailbox) using PHPMailer. Credentials from a `config.php` **outside** `public_html`, never committed.
  - Returns `{ ok: true }` or `{ ok: false, errors: { field: code } }`. Never echoes user input back as HTML.
  - Stores nothing beyond the email (GDPR/KVKK data minimization). State this in the privacy page.

---

## 7. Build phases

Work phase by phase. At the end of each phase: run the Pre-Flight Check, run `web-design-guidelines` on changed files, fix everything, then summarize to the owner with screenshots (desktop 1440, mobile 390).

### Phase 0: Foundation
Repo, tooling, CI, tokens, fonts, i18n skeleton, layout shell (nav, footer, skip link, locale switcher), empty routes for every page in `site-spec.json`.

```gherkin
Scenario: Every route builds in every locale
  Given the project is built with "next build"
  When I list the files in "out/"
  Then every route from docs/site-spec.json exists for tr, en, fr and de
  And no page renders a missing translation key

Scenario: Tokens are the only color source
  Given the source in "src/"
  When I search for hex or rgb color literals outside "src/styles/tokens.css"
  Then I find none
```

### Phase 1: Home page content, no 3D yet
Build every home section as real, responsive, accessible DOM with final copy. The page must be excellent **without** the 3D scene (it is the reduced-motion and no-WebGL experience).

```gherkin
Scenario: Home works with JavaScript disabled
  Given JavaScript is disabled
  When I open "/en/"
  Then all section headings and body copy are readable
  And the contact link in the hero navigates to "/en/contact/"

Scenario: Hero fits the first viewport
  Given a 1440x900 and a 390x844 viewport
  When the home page loads
  Then the headline, subtext and primary CTA are visible without scrolling
```

### Phase 2: 3D summit journey
Implement the scene exactly per `.cursor/rules/20-scene.mdc`. Scene is decoration over a complete page, never a dependency.

```gherkin
Scenario: Scroll climbs the mountain
  Given WebGL is available and reduced motion is not requested
  When I scroll from the top of the home page to the contact section
  Then the camera moves continuously from the valley to the summit
  And the two gold stars ignite only in the final section

Scenario: Reduced motion
  Given the user prefers reduced motion
  When I scroll the home page
  Then no scroll-linked camera movement happens
  And static stills of the mountain are shown instead

Scenario: Performance budget
  Given a mid-range Android device profile in Lighthouse (mobile)
  When the home page is audited
  Then LCP is under 2.5 s, CLS under 0.1, TBT under 200 ms
  And the 3D chunk is not part of the initial JS bundle
```

### Phase 3: Inner pages
Services (5), Work index + NoraMedi case study, About, Contact (with working form), Privacy, Legal notice.

```gherkin
Scenario: Contact form happy path
  Given I am on "/de/contact/"
  When I fill all required fields with valid values and submit
  Then the submit button shows a loading state and stays labelled
  And I see a success message announced via aria-live
  And the owner receives one email containing the submitted fields

Scenario: Contact form validation
  Given I submit the form with an invalid email
  Then the error appears below the email field in German
  And focus moves to the first invalid field
```

### Phase 4: Blog, SEO, migration
MDX blog with 4 locales, migrate the 3 existing posts (owner supplies text), sitemap, hreflang, OG images, JSON-LD, `.htaccess` redirects.

```gherkin
Scenario: Legacy URLs are preserved
  Given every legacy path in docs/site-spec.json "redirects"
  When I request it on the deployed site
  Then I receive a single 301 to the mapped new path
```

### Phase 5: QA and launch
Full Pre-Flight Check on every page, `web-design-guidelines` audit on the whole `src/`, `taste` review, Lighthouse, real-device test (iPhone Safari, Android Chrome, desktop Safari/Chrome/Firefox), native-speaker review of FR and DE copy (owner arranges).

---

## 8. Definition of Done (every page)

- [ ] Pre-Flight Check from `design-taste-frontend` Section 14 passes, every box
- [ ] `web-design-guidelines` audit: zero findings
- [ ] Lighthouse mobile: Accessibility 100, Best Practices 100, SEO 100, Performance ≥ 95 (inner pages), ≥ 85 (home with scene)
- [ ] Keyboard-only walkthrough possible; visible focus everywhere
- [ ] Tested at 360, 390, 768, 1024, 1440, 1920 widths and at 200% zoom
- [ ] All four locales complete; German strings tested for overflow (they are ~30% longer)
- [ ] No em dash or en dash in any visible string
- [ ] No invented numbers, clients, logos, testimonials or certifications
- [ ] No console errors or warnings

---

## 9. Owner inputs still needed (ask, do not invent)

| # | Input | Used in | Until provided |
|---|---|---|---|
| 1 | Confirm D1 (dark theme) and D2 (Hostinger plan type) | Everything | Use defaults |
| 2 | Legal entity name, address, registration, VAT, responsible person | Legal notice (required for DE/FR visitors), footer | Visible `TODO` block in dev only; build fails in production mode if empty |
| 3 | Contact recipient email + SMTP mailbox | Contact endpoint | Local mock |
| 4 | Real NoraMedi screenshots **with demo data only** (no real patient data, KVKK) | Case study, home product section | Labeled placeholder slots, never fake UI built from divs |
| 5 | Text of the 3 existing blog posts | Blog migration | Keep slugs reserved |
| 6 | Client names / logos with permission | Any "clients" section | Section is not rendered |
| 7 | Social profile URLs (LinkedIn etc.) | Footer, JSON-LD | Omit |
| 8 | Native review for FR and DE | Launch | Launch blocked |
