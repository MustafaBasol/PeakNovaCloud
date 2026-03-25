import prisma from '@/libs/prisma'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'

export async function listPagesByLanguageAndSection(language, section) {
  const records = await prisma.pageContent.findMany({
    where: {
      language,
      section: section ? { contains: section } : undefined,
    },
    orderBy: { createdAt: 'asc' },
  })
  return normalizeDocuments(records)
}

export async function createPage(data) {
  const record = await prisma.pageContent.create({
    data: {
      section: data.section,
      title: data.title || null,
      description: data.description || null,
      image: data.image || null,
      buttonText: data.buttonText || null,
      language: data.language,
      cards: data.cards ?? [],
    },
  })
  return normalizeDocument(record)
}

export async function deletePageById(id) {
  const record = await prisma.pageContent.delete({
    where: { id },
  })
  return normalizeDocument(record)
}

export async function updatePageById(id, data) {
  const record = await prisma.pageContent.update({
    where: { id },
    data: {
      section: data.section,
      title: data.title || null,
      description: data.description || null,
      image: data.image || null,
      buttonText: data.buttonText || null,
      language: data.language,
      cards: data.cards ?? [],
    },
  })
  return normalizeDocument(record)
}