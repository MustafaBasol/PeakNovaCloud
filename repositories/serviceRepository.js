import prisma from '@/libs/prisma'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'

function buildServicePageData(data) {
  return {
    service: data.service,
    section: data.section,
    title: data.title || null,
    description: data.description || null,
    image: data.image || null,
    buttonText: data.buttonText || null,
    language: data.language,
    cards: data.cards ?? [],
  }
}

export async function listServicesByLanguage(language) {
  const records = await prisma.servicePage.findMany({
    where: { language },
    orderBy: { createdAt: 'asc' },
  })
  return normalizeDocuments(records)
}

export async function listServicePagesByNameAndLanguage(service, language) {
  const records = await prisma.servicePage.findMany({
    where: { language, service },
    orderBy: { createdAt: 'asc' },
  })
  return normalizeDocuments(records)
}

export async function createServicePage(data) {
  const record = await prisma.servicePage.create({
    data: buildServicePageData(data),
  })
  return normalizeDocument(record)
}

export async function deleteServicePageById(id) {
  const record = await prisma.servicePage.delete({
    where: { id },
  })
  return normalizeDocument(record)
}

export async function updateServicePageById(id, data) {
  const record = await prisma.servicePage.update({
    where: { id },
    data: buildServicePageData(data),
  })
  return normalizeDocument(record)
}

export async function updateServicePagesBySectionAndLanguage(section, language, data) {
  const updateData = {}

  if (data.description) updateData.description = data.description
  if (data.title) updateData.title = data.title
  if (data.image) updateData.image = data.image
  if (data.buttonText) updateData.buttonText = data.buttonText
  if (data.service) updateData.service = data.service
  if (data.section) updateData.section = data.section
  if (data.language) updateData.language = data.language
  if (data.cards) updateData.cards = data.cards

  return prisma.servicePage.updateMany({
    where: { section, language },
    data: updateData,
  })
}