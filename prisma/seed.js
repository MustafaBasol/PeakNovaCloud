/*
 * Seeds professional Salesforce-consulting content for PeakNova, in EN/TR/FR.
 * Idempotent: skips rows that already exist for a given language/section/slug,
 * so operator edits made from the dashboard are never overwritten.
 * Content lives in prisma/content.js (shared with prisma/refresh-content.js).
 * Usage: node prisma/seed.js  (DATABASE_URL must be set)
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

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required to run the seed')
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function upsertIfMissing(model, where, data) {
  const existing = await prisma[model].findFirst({ where })
  if (existing) {
    return existing
  }
  return prisma[model].create({ data })
}

async function seedLanguage(lang) {
  for (const logo of logosFor(lang)) {
    await upsertIfMissing(
      'logos',
      { language: lang, name: logo.name },
      { name: logo.name, description: logo.description, icon: logo.icon, color: logo.color, language: lang },
    )
  }

  for (const [section, data] of Object.entries(PAGE_CONTENT[lang])) {
    await upsertIfMissing(
      'pageContent',
      { language: lang, section },
      { section, language: lang, title: data.title ?? null, description: data.description ?? null, image: data.image ?? null, buttonText: data.buttonText ?? null, cards: data.cards ?? [] },
    )
  }

  for (const item of ABOUT_ITEMS[lang]) {
    await upsertIfMissing('about', { language: lang, title: item.title }, { ...item, language: lang })
  }

  for (const item of FAQ_ITEMS[lang]) {
    await upsertIfMissing('faq', { language: lang, question: item.question }, { ...item, language: lang })
  }

  for (const item of PROJECTS[lang]) {
    await upsertIfMissing('project', { language: lang, name: item.name }, { ...item, language: lang })
  }

  for (const svc of SERVICE_META) {
    const sections = serviceContent(lang, svc)
    for (const [section, data] of Object.entries(sections)) {
      await upsertIfMissing(
        'servicePage',
        { language: lang, service: svc.slug, section },
        { service: svc.slug, section, language: lang, title: data.title ?? null, description: data.description ?? null, image: data.image ?? null, buttonText: data.buttonText ?? null, cards: data.cards ?? [] },
      )
    }
  }

  for (const [page, seo] of Object.entries(SEO[lang])) {
    await prisma.seo.upsert({
      where: { slug: seo.slug },
      update: {},
      create: {
        page,
        language: lang,
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        slug: seo.slug,
        ogTitle: seo.ogTitle ?? seo.title,
        ogDescription: seo.ogDescription ?? seo.description,
      },
    })
  }

  for (const blog of BLOGS[lang]) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {},
      create: {
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        coverImage: blog.coverImage ?? null,
        language: lang,
        summary: blog.summary,
      },
    })
  }

  console.log(`Seeded ${lang}`)
}

async function main() {
  for (const lang of LANGS) {
    await seedLanguage(lang)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
