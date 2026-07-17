/*
 * Controlled content refresh: pushes the approved PeakNova marketing copy
 * (prisma/content.js) into an existing database, replacing older generic
 * copy on the known marketing-content records and creating anything missing.
 *
 * Unlike prisma/seed.js (create-if-missing only), this script UPDATES
 * existing rows matched by a stable business key so a live database can be
 * brought in line with the approved copy without manual deletes.
 *
 * It only ever touches: Logos, PageContent, About, Faq, Project,
 * ServicePage, Seo, Blog — matched by stable keys (language+section,
 * language+service+section, language+name, slug, etc.). It never reads or
 * writes users, auth, contact submissions, or any other model.
 *
 * Usage:
 *   node prisma/refresh-content.js --dry-run
 *   node prisma/refresh-content.js --language=en
 *   node prisma/refresh-content.js
 */
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
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

function parseArgs(argv) {
  const args = { dryRun: false, language: null }
  for (const raw of argv) {
    if (raw === '--dry-run') {
      args.dryRun = true
    } else if (raw.startsWith('--language=')) {
      args.language = raw.split('=')[1]
    }
  }
  return args
}

function redact(message) {
  return String(message).replace(/postgres(ql)?:\/\/[^\s'"]+/gi, '[redacted-connection-string]')
}

const { dryRun, language } = parseArgs(process.argv.slice(2))

if (language && !LANGS.includes(language)) {
  console.error(`Unknown --language "${language}". Expected one of: ${LANGS.join(', ')}`)
  process.exit(1)
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required to run the content refresh')
  process.exit(1)
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const stats = { created: 0, updated: 0, unchanged: 0, skipped: 0 }

// Postgres/Prisma round-trips JSON object keys in a different order than
// they were written in, so a naive JSON.stringify comparison would flag
// every cards[] field as "changed" even when the content is identical.
function sameValue(a, b) {
  const va = a ?? null
  const vb = b ?? null

  if (Array.isArray(va) || Array.isArray(vb)) {
    if (!Array.isArray(va) || !Array.isArray(vb) || va.length !== vb.length) return false
    return va.every((item, i) => sameValue(item, vb[i]))
  }

  if (va && vb && typeof va === 'object' && typeof vb === 'object') {
    const keysA = Object.keys(va)
    const keysB = Object.keys(vb)
    if (keysA.length !== keysB.length) return false
    return keysA.every((key) => sameValue(va[key], vb[key]))
  }

  return va === vb
}

async function reconcile(db, model, where, targetData, compareFields) {
  const existing = await db[model].findFirst({ where })

  if (!existing) {
    stats.created += 1
    if (!dryRun) {
      await db[model].create({ data: targetData })
    }
    return
  }

  const changed = compareFields.some((field) => !sameValue(existing[field], targetData[field]))

  if (!changed) {
    stats.unchanged += 1
    return
  }

  stats.updated += 1
  if (!dryRun) {
    await db[model].update({ where: { id: existing.id }, data: targetData })
  }
}

async function refreshLanguage(db, lang) {
  for (const logo of logosFor(lang)) {
    await reconcile(
      db,
      'logos',
      { language: lang, name: logo.name },
      { name: logo.name, description: logo.description, icon: logo.icon, color: logo.color, language: lang },
      ['description', 'icon', 'color'],
    )
  }

  for (const [section, data] of Object.entries(PAGE_CONTENT[lang])) {
    await reconcile(
      db,
      'pageContent',
      { language: lang, section },
      { section, language: lang, title: data.title ?? null, description: data.description ?? null, image: data.image ?? null, buttonText: data.buttonText ?? null, cards: data.cards ?? [] },
      ['title', 'description', 'image', 'buttonText', 'cards'],
    )
  }

  for (const item of ABOUT_ITEMS[lang]) {
    await reconcile(
      db,
      'about',
      { language: lang, title: item.title },
      { title: item.title, description: item.description, language: lang },
      ['description'],
    )
  }

  for (const item of FAQ_ITEMS[lang]) {
    await reconcile(
      db,
      'faq',
      { language: lang, question: item.question },
      { question: item.question, answer: item.answer, language: lang },
      ['answer'],
    )
  }

  for (const item of PROJECTS[lang]) {
    await reconcile(
      db,
      'project',
      { language: lang, name: item.name },
      { name: item.name, title: item.title, description: item.description, image: item.image, language: lang },
      ['title', 'description', 'image'],
    )
  }

  for (const svc of SERVICE_META) {
    const sections = serviceContent(lang, svc)
    for (const [section, data] of Object.entries(sections)) {
      await reconcile(
        db,
        'servicePage',
        { language: lang, service: svc.slug, section },
        { service: svc.slug, section, language: lang, title: data.title ?? null, description: data.description ?? null, image: data.image ?? null, buttonText: data.buttonText ?? null, cards: data.cards ?? [] },
        ['title', 'description', 'image', 'buttonText', 'cards'],
      )
    }
  }

  for (const [page, seo] of Object.entries(SEO[lang])) {
    await reconcile(
      db,
      'seo',
      { slug: seo.slug },
      {
        page,
        language: lang,
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        slug: seo.slug,
        ogTitle: seo.ogTitle ?? seo.title,
        ogDescription: seo.ogDescription ?? seo.description,
      },
      ['title', 'description', 'keywords', 'ogTitle', 'ogDescription'],
    )
  }

  for (const blog of BLOGS[lang]) {
    await reconcile(
      db,
      'blog',
      { slug: blog.slug },
      {
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        coverImage: blog.coverImage ?? null,
        language: lang,
        summary: blog.summary,
      },
      ['title', 'content', 'coverImage', 'summary'],
    )
  }
}

function itemCountForLanguage(lang) {
  let n = 0
  n += logosFor(lang).length
  n += Object.keys(PAGE_CONTENT[lang]).length
  n += ABOUT_ITEMS[lang].length
  n += FAQ_ITEMS[lang].length
  n += PROJECTS[lang].length
  n += SERVICE_META.length * Object.keys(serviceContent(lang, SERVICE_META[0])).length
  n += Object.keys(SEO[lang]).length
  n += BLOGS[lang].length
  return n
}

async function main() {
  const targetLanguages = language ? [language] : LANGS
  const skippedLanguages = LANGS.filter((l) => !targetLanguages.includes(l))
  stats.skipped = skippedLanguages.reduce((sum, l) => sum + itemCountForLanguage(l), 0)

  if (dryRun) {
    for (const lang of targetLanguages) {
      await refreshLanguage(prisma, lang)
    }
  } else {
    await prisma.$transaction(
      async (tx) => {
        for (const lang of targetLanguages) {
          await refreshLanguage(tx, lang)
        }
      },
      { timeout: 60000, maxWait: 15000 },
    )
  }

  console.log(`Content refresh ${dryRun ? '(dry run) ' : ''}complete for: ${targetLanguages.join(', ')}`)
  if (skippedLanguages.length) {
    console.log(`Languages not requested (skipped): ${skippedLanguages.join(', ')}`)
  }
  console.log(`created=${stats.created} updated=${stats.updated} unchanged=${stats.unchanged} skipped=${stats.skipped}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error('Content refresh failed:', redact(err.message || err))
    await prisma.$disconnect()
    process.exit(1)
  })
