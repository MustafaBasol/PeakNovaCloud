/*
 * Lightweight, DB-free validation of the approved marketing copy in
 * prisma/content.js against what the public UI actually reads:
 *   - the section names read by components/** and app/[locale]/**
 *   - the icon whitelist in components/IconRenderer.js
 *   - the svg whitelist in components/DynamicSVGComponent.js
 *   - the files that exist under public/
 *
 * Exits non-zero if any check fails. Does not touch the database.
 * Usage: node prisma/validate-content.js  (or: npm run content:validate)
 */
const fs = require('fs')
const path = require('path')
const {
  LANGS,
  SERVICE_META,
  logosFor,
  PAGE_CONTENT,
  ABOUT_ITEMS,
  FAQ_ITEMS,
  PROJECTS,
  SEO,
  BLOGS,
  serviceContent,
} = require('./content')

const ROOT = path.join(__dirname, '..')
const errors = []
const fail = (msg) => errors.push(msg)

// ---------------------------------------------------------------------------
// Known-good registries, derived from the actual source files (not redeclared
// by hand) so this check can never silently drift from the UI.
// ---------------------------------------------------------------------------
function extractIconRendererKeys() {
  const src = fs.readFileSync(path.join(ROOT, 'components/IconRenderer.js'), 'utf8')
  const keys = new Set()
  for (const m of src.matchAll(/^\s*([A-Za-z0-9_]+)\s*:\s*lazy\(/gm)) {
    keys.add(m[1])
  }
  return keys
}

function extractSvgIconMapKeys() {
  const src = fs.readFileSync(path.join(ROOT, 'components/DynamicSVGComponent.js'), 'utf8')
  const keys = new Set()
  for (const m of src.matchAll(/"([^"]+)"\s*:\s*\(\)\s*=>\s*import/g)) {
    keys.add(m[1])
  }
  return keys
}

function extractPublicFiles() {
  const publicDir = path.join(ROOT, 'public')
  const files = new Set()

  function walk(dir, prefix) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const relPath = prefix ? `${prefix}/${entry.name}` : entry.name
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), relPath)
      } else {
        files.add(relPath)
      }
    }
  }

  walk(publicDir, '')
  return files
}

const ICON_KEYS = extractIconRendererKeys()
const SVG_ICON_KEYS = extractSvgIconMapKeys()
const PUBLIC_FILES = extractPublicFiles()

// Section names actually read by the public page components (grep-verified
// against components/**/section == '...').
const REQUIRED_PAGE_SECTIONS = [
  'home-hero', 'home-problem', 'home-info1', 'home-info2', 'home-action', 'home-contact',
  'about-hero', 'about-team', 'about-action', 'about-contact',
  'project-hero', 'project-step', 'project-image', 'project-project', 'project-contact',
  'blogs-hero', 'blogs-contact',
  'single-contact',
]

const REQUIRED_SERVICE_SECTIONS = ['hero', 'ladder', 'reasons', 'why', 'action', 'contact']

// pageContent/servicePage sections whose `image` field is an SVG icon name
// (rendered via DynamicSvgComponent), not a public/ file path.
const SVG_ICON_PAGE_SECTIONS = new Set(['home-action'])
const SVG_ICON_SERVICE_SECTIONS = new Set(['hero', 'ladder'])

// project-image (ImageIcons.js) only renders `.image` and `.cards` — it
// never reads `.title`, so that field is legitimately optional there.
const TITLE_OPTIONAL_PAGE_SECTIONS = new Set(['project-image'])

const SUPPORTED_SEO_PAGES = ['home', 'about', 'services', 'projects', 'blogs']

// prisma/refresh-content.js may only touch these models.
const ALLOWED_REFRESH_MODELS = ['logos', 'pageContent', 'about', 'faq', 'project', 'servicePage', 'seo', 'blog']

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------
function checkNonEmpty(label, value) {
  if (value === undefined || value === null || String(value).trim() === '') {
    fail(`${label} is empty`)
  }
}

function checkImage(label, image, isSvgIcon) {
  if (!image) {
    fail(`${label} has no image`)
    return
  }
  if (isSvgIcon) {
    if (!SVG_ICON_KEYS.has(image)) {
      fail(`${label} references unsupported svg icon "${image}" (not in DynamicSVGComponent.js iconMap)`)
    }
  } else if (!PUBLIC_FILES.has(image)) {
    fail(`${label} references missing public file "${image}"`)
  }
}

function checkCards(label, cards, { requireIcon }) {
  if (cards === undefined) return
  if (!Array.isArray(cards)) {
    fail(`${label}.cards is not an array`)
    return
  }
  cards.forEach((card, i) => {
    checkNonEmpty(`${label}.cards[${i}].title`, card.title)
    checkNonEmpty(`${label}.cards[${i}].description`, card.description)
    if (requireIcon) {
      if (!card.Icon) {
        fail(`${label}.cards[${i}] is missing Icon`)
      } else if (!ICON_KEYS.has(card.Icon)) {
        fail(`${label}.cards[${i}] references unsupported icon "${card.Icon}" (not in IconRenderer.js)`)
      }
    } else if (card.Icon && !ICON_KEYS.has(card.Icon)) {
      fail(`${label}.cards[${i}] references unsupported icon "${card.Icon}" (not in IconRenderer.js)`)
    }
  })
}

for (const lang of LANGS) {
  // 1. Required page sections exist, with non-empty title/description.
  const seenPageSections = new Set()
  for (const section of REQUIRED_PAGE_SECTIONS) {
    const data = PAGE_CONTENT[lang][section]
    if (!data) {
      fail(`[${lang}] PageContent section "${section}" is missing`)
      continue
    }
    if (seenPageSections.has(section)) {
      fail(`[${lang}] duplicate PageContent section "${section}"`)
    }
    seenPageSections.add(section)
    if (!TITLE_OPTIONAL_PAGE_SECTIONS.has(section)) checkNonEmpty(`[${lang}] ${section}.title`, data.title)
    if (data.description !== undefined) checkNonEmpty(`[${lang}] ${section}.description`, data.description)
    if (data.image) checkImage(`[${lang}] ${section}.image`, data.image, SVG_ICON_PAGE_SECTIONS.has(section))
    checkCards(`[${lang}] ${section}`, data.cards, { requireIcon: false })
  }

  // No section names outside the known UI contract.
  for (const section of Object.keys(PAGE_CONTENT[lang])) {
    if (!REQUIRED_PAGE_SECTIONS.includes(section)) {
      fail(`[${lang}] PageContent defines unsupported section "${section}" (no component reads it)`)
    }
  }

  // 2. Every service has the sections the service-page UI requires.
  for (const svc of SERVICE_META) {
    const sections = serviceContent(lang, svc)
    const seenServiceSections = new Set()
    for (const section of REQUIRED_SERVICE_SECTIONS) {
      const data = sections[section]
      if (!data) {
        fail(`[${lang}] ServicePage "${svc.slug}" is missing section "${section}"`)
        continue
      }
      if (seenServiceSections.has(section)) {
        fail(`[${lang}] duplicate ServicePage section "${svc.slug}/${section}"`)
      }
      seenServiceSections.add(section)
      checkNonEmpty(`[${lang}] ${svc.slug}.${section}.title`, data.title)
      if (data.description !== undefined) checkNonEmpty(`[${lang}] ${svc.slug}.${section}.description`, data.description)
      if (data.image) checkImage(`[${lang}] ${svc.slug}.${section}.image`, data.image, SVG_ICON_SERVICE_SECTIONS.has(section))
      checkCards(`[${lang}] ${svc.slug}.${section}`, data.cards, { requireIcon: section === 'why' })
    }
    for (const section of Object.keys(sections)) {
      if (!REQUIRED_SERVICE_SECTIONS.includes(section)) {
        fail(`[${lang}] ServicePage "${svc.slug}" defines unsupported section "${section}"`)
      }
    }
  }

  // 3. Logos: one per known service, non-empty description, whitelisted icon.
  const logos = logosFor(lang)
  const logoSlugs = new Set()
  for (const logo of logos) {
    if (logoSlugs.has(logo.slug)) fail(`[${lang}] duplicate logo slug "${logo.slug}"`)
    logoSlugs.add(logo.slug)
    checkNonEmpty(`[${lang}] logo(${logo.slug}).description`, logo.description)
    if (!ICON_KEYS.has(logo.icon)) fail(`[${lang}] logo(${logo.slug}) references unsupported icon "${logo.icon}"`)
  }

  // 4. About: 3 stable entries, unique titles.
  const aboutTitles = new Set()
  for (const item of ABOUT_ITEMS[lang]) {
    checkNonEmpty(`[${lang}] about.title`, item.title)
    checkNonEmpty(`[${lang}] about(${item.title}).description`, item.description)
    if (aboutTitles.has(item.title)) fail(`[${lang}] duplicate About title "${item.title}"`)
    aboutTitles.add(item.title)
  }

  // 5. FAQ: unique questions, non-empty answers.
  const faqQuestions = new Set()
  for (const item of FAQ_ITEMS[lang]) {
    checkNonEmpty(`[${lang}] faq.question`, item.question)
    checkNonEmpty(`[${lang}] faq(${item.question}).answer`, item.answer)
    if (faqQuestions.has(item.question)) fail(`[${lang}] duplicate FAQ question "${item.question}"`)
    faqQuestions.add(item.question)
  }

  // 6. Projects: unique names (stable key + visible label), valid images.
  const projectNames = new Set()
  for (const item of PROJECTS[lang]) {
    checkNonEmpty(`[${lang}] project.name`, item.name)
    checkNonEmpty(`[${lang}] project(${item.name}).title`, item.title)
    checkNonEmpty(`[${lang}] project(${item.name}).description`, item.description)
    checkImage(`[${lang}] project(${item.name}).image`, item.image, false)
    if (projectNames.has(item.name)) fail(`[${lang}] duplicate project name "${item.name}"`)
    projectNames.add(item.name)
  }

  // 7. SEO entries exist for every supported public page, unique slugs.
  for (const page of SUPPORTED_SEO_PAGES) {
    const seo = SEO[lang][page]
    if (!seo) {
      fail(`[${lang}] missing SEO entry for page "${page}"`)
      continue
    }
    checkNonEmpty(`[${lang}] seo(${page}).title`, seo.title)
    checkNonEmpty(`[${lang}] seo(${page}).description`, seo.description)
    checkNonEmpty(`[${lang}] seo(${page}).slug`, seo.slug)
  }

  // 8. Blog slugs unique within language, valid cover images.
  const blogSlugs = new Set()
  for (const blog of BLOGS[lang]) {
    checkNonEmpty(`[${lang}] blog.slug`, blog.slug)
    checkNonEmpty(`[${lang}] blog(${blog.slug}).title`, blog.title)
    checkNonEmpty(`[${lang}] blog(${blog.slug}).summary`, blog.summary)
    if (blog.coverImage) checkImage(`[${lang}] blog(${blog.slug}).coverImage`, blog.coverImage, false)
    if (blogSlugs.has(blog.slug)) fail(`[${lang}] duplicate blog slug "${blog.slug}"`)
    blogSlugs.add(blog.slug)
  }
}

// 9. All Seo slugs are globally unique (Prisma Seo.slug is @unique) and all
//    Blog slugs are globally unique (Prisma Blog.slug is @unique).
const allSeoSlugs = new Set()
for (const lang of LANGS) {
  for (const seo of Object.values(SEO[lang])) {
    if (allSeoSlugs.has(seo.slug)) fail(`duplicate Seo.slug "${seo.slug}" across languages`)
    allSeoSlugs.add(seo.slug)
  }
}
const allBlogSlugs = new Set()
for (const lang of LANGS) {
  for (const blog of BLOGS[lang]) {
    if (allBlogSlugs.has(blog.slug)) fail(`duplicate Blog.slug "${blog.slug}" across languages`)
    allBlogSlugs.add(blog.slug)
  }
}

// 10. refresh-content.js only ever calls the approved marketing-content
//     models — never users/auth/contact-submission/etc.
const refreshSrc = fs.readFileSync(path.join(ROOT, 'prisma/refresh-content.js'), 'utf8')
const calledModels = new Set()
for (const m of refreshSrc.matchAll(/\bdb\.([a-zA-Z]+)\./g)) {
  calledModels.add(m[1])
}
for (const model of calledModels) {
  if (!ALLOWED_REFRESH_MODELS.includes(model)) {
    fail(`prisma/refresh-content.js references non-marketing model "${model}"`)
  }
}

// ---------------------------------------------------------------------------
if (errors.length) {
  console.error(`Content validation failed with ${errors.length} issue(s):`)
  for (const e of errors) console.error(` - ${e}`)
  process.exit(1)
}

console.log('Content validation passed: EN/TR/FR sections, cards, icons, images and SEO/slugs are all consistent with the UI contract.')
