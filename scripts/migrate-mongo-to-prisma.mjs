import 'dotenv/config'
import mongoose from 'mongoose'
import { PrismaClient } from '@prisma/client'

const { MONGO_URI, DATABASE_URL } = process.env
const prisma = new PrismaClient()

if (!MONGO_URI) {
  throw new Error('MONGO_URI is required for migration')
}

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required for migration')
}

const looseSchema = new mongoose.Schema({}, { strict: false, collection: undefined })

const About = mongoose.models.MigrationAbout || mongoose.model('MigrationAbout', looseSchema, 'abouts')
const Faq = mongoose.models.MigrationFaq || mongoose.model('MigrationFaq', looseSchema, 'faqs')
const Logos = mongoose.models.MigrationLogos || mongoose.model('MigrationLogos', looseSchema, 'logos')
const Project = mongoose.models.MigrationProject || mongoose.model('MigrationProject', looseSchema, 'projects')
const PageContent = mongoose.models.MigrationPageContent || mongoose.model('MigrationPageContent', looseSchema, 'pagecontents')
const ServicePage = mongoose.models.MigrationServicePage || mongoose.model('MigrationServicePage', looseSchema, 'servicepages')
const Blog = mongoose.models.MigrationBlog || mongoose.model('MigrationBlog', looseSchema, 'blogs')
const Seo = mongoose.models.MigrationSeo || mongoose.model('MigrationSeo', looseSchema, 'seos')

function normalizeLanguage(value) {
  if (value === 'en' || value === 'tr' || value === 'fr') {
    return value
  }

  throw new Error(`Unsupported language value: ${value}`)
}

function normalizeKeywords(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

async function migrateCollection({ label, sourceModel, loadTargetIds, mapRecord, write }) {
  const sourceRecords = await sourceModel.find({}).lean()
  const existingIds = await loadTargetIds()

  let created = 0
  let skipped = 0

  for (const sourceRecord of sourceRecords) {
    const sourceId = String(sourceRecord._id)

    if (existingIds.has(sourceId)) {
      skipped += 1
      continue
    }

    const data = mapRecord(sourceRecord)
    await write(sourceId, data)
    created += 1
  }

  console.log(`${label}: created=${created}, skipped=${skipped}, total=${sourceRecords.length}`)
}

async function main() {
  await mongoose.connect(MONGO_URI, { bufferCommands: false })

  await migrateCollection({
    label: 'About',
    sourceModel: About,
    loadTargetIds: async () => new Set((await prisma.about.findMany({ select: { id: true } })).map((item) => item.id)),
    mapRecord: (record) => ({
      title: record.title,
      description: record.description,
      language: normalizeLanguage(record.language),
      createdAt: record.createdAt ?? new Date(),
      updatedAt: record.updatedAt ?? new Date(),
    }),
    write: async (id, data) => {
      await prisma.about.create({ data: { id, ...data } })
    },
  })

  await migrateCollection({
    label: 'Faq',
    sourceModel: Faq,
    loadTargetIds: async () => new Set((await prisma.faq.findMany({ select: { id: true } })).map((item) => item.id)),
    mapRecord: (record) => ({
      question: record.question,
      answer: record.answer,
      language: normalizeLanguage(record.language),
      createdAt: record.createdAt ?? new Date(),
      updatedAt: record.updatedAt ?? new Date(),
    }),
    write: async (id, data) => {
      await prisma.faq.create({ data: { id, ...data } })
    },
  })

  await migrateCollection({
    label: 'Logos',
    sourceModel: Logos,
    loadTargetIds: async () => new Set((await prisma.logos.findMany({ select: { id: true } })).map((item) => item.id)),
    mapRecord: (record) => ({
      name: record.name,
      description: record.description,
      language: normalizeLanguage(record.language),
      icon: record.Icon,
      color: record.color,
      createdAt: record.createdAt ?? new Date(),
      updatedAt: record.updatedAt ?? new Date(),
    }),
    write: async (id, data) => {
      await prisma.logos.create({ data: { id, ...data } })
    },
  })

  await migrateCollection({
    label: 'Project',
    sourceModel: Project,
    loadTargetIds: async () => new Set((await prisma.project.findMany({ select: { id: true } })).map((item) => item.id)),
    mapRecord: (record) => ({
      name: record.name,
      title: record.title ?? null,
      language: normalizeLanguage(record.language),
      description: record.description,
      image: record.image ?? null,
      createdAt: record.createdAt ?? new Date(),
      updatedAt: record.updatedAt ?? new Date(),
    }),
    write: async (id, data) => {
      await prisma.project.create({ data: { id, ...data } })
    },
  })

  await migrateCollection({
    label: 'PageContent',
    sourceModel: PageContent,
    loadTargetIds: async () => new Set((await prisma.pageContent.findMany({ select: { id: true } })).map((item) => item.id)),
    mapRecord: (record) => ({
      section: record.section,
      title: record.title ?? null,
      description: record.description ?? null,
      image: record.image ?? null,
      buttonText: record.buttonText ?? null,
      language: normalizeLanguage(record.language),
      cards: Array.isArray(record.cards) ? record.cards : [],
      createdAt: record.createdAt ?? new Date(),
      updatedAt: record.updatedAt ?? new Date(),
    }),
    write: async (id, data) => {
      await prisma.pageContent.create({ data: { id, ...data } })
    },
  })

  await migrateCollection({
    label: 'ServicePage',
    sourceModel: ServicePage,
    loadTargetIds: async () => new Set((await prisma.servicePage.findMany({ select: { id: true } })).map((item) => item.id)),
    mapRecord: (record) => ({
      service: record.service,
      section: record.section,
      title: record.title ?? null,
      description: record.description ?? null,
      image: record.image ?? null,
      buttonText: record.buttonText ?? null,
      language: normalizeLanguage(record.language),
      cards: Array.isArray(record.cards) ? record.cards : [],
      createdAt: record.createdAt ?? new Date(),
      updatedAt: record.updatedAt ?? new Date(),
    }),
    write: async (id, data) => {
      await prisma.servicePage.create({ data: { id, ...data } })
    },
  })

  await migrateCollection({
    label: 'Blog',
    sourceModel: Blog,
    loadTargetIds: async () => new Set((await prisma.blog.findMany({ select: { id: true } })).map((item) => item.id)),
    mapRecord: (record) => ({
      title: record.title,
      slug: record.slug,
      content: Array.isArray(record.content) ? record.content : [],
      coverImage: record.coverImage ?? null,
      language: normalizeLanguage(record.language),
      summary: record.summary,
      seo: record.seo ?? null,
      createdAt: record.createdAt ?? new Date(),
      updatedAt: record.updatedAt ?? new Date(),
    }),
    write: async (id, data) => {
      await prisma.blog.create({ data: { id, ...data } })
    },
  })

  await migrateCollection({
    label: 'Seo',
    sourceModel: Seo,
    loadTargetIds: async () => new Set((await prisma.seo.findMany({ select: { id: true } })).map((item) => item.id)),
    mapRecord: (record) => ({
      page: record.page,
      language: normalizeLanguage(record.language),
      title: record.title,
      description: record.description,
      keywords: normalizeKeywords(record.keywords),
      slug: record.slug,
      url: record.URL ?? record.url ?? null,
      ogTitle: record.ogTitle ?? null,
      ogDescription: record.ogDescription ?? null,
      ogImage: record.ogImage ?? null,
      robots: record.robots ?? 'index, follow',
      createdAt: record.createdAt ?? new Date(),
      updatedAt: record.updatedAt ?? new Date(),
    }),
    write: async (id, data) => {
      await prisma.seo.create({ data: { id, ...data } })
    },
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
    await prisma.$disconnect()
  })