import prisma from '@/libs/prisma'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'

export async function listAboutByLanguage(language) {
  const records = await prisma.about.findMany({
    where: { language },
    orderBy: { createdAt: 'asc' },
  })
  return normalizeDocuments(records)
}

export async function createAbout(data) {
  const record = await prisma.about.create({
    data: {
      title: data.title,
      description: data.description,
      language: data.language,
    },
  })
  return normalizeDocument(record)
}

export async function deleteAboutById(id) {
  const record = await prisma.about.delete({
    where: { id },
  })
  return normalizeDocument(record)
}

export async function updateAboutById(id, data) {
  const record = await prisma.about.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      language: data.language,
    },
  })
  return normalizeDocument(record)
}