import prisma from '@/libs/prisma'
import { loadServiceModel } from '@/repositories/mongoRuntime'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'
import { shouldUsePrisma } from '@/repositories/repositoryRuntime'

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
  if (shouldUsePrisma()) {
    const records = await prisma.servicePage.findMany({
      where: { language },
      orderBy: { createdAt: 'asc' },
    })
    return normalizeDocuments(records)
  }

  const SERVICE = await loadServiceModel()
  const records = await SERVICE.find({ language }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function listServicePagesByNameAndLanguage(service, language) {
  if (shouldUsePrisma()) {
    const records = await prisma.servicePage.findMany({
      where: { language, service },
      orderBy: { createdAt: 'asc' },
    })
    return normalizeDocuments(records)
  }

  const SERVICE = await loadServiceModel()
  const records = await SERVICE.find({ language, service }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function createServicePage(data) {
  if (shouldUsePrisma()) {
    const record = await prisma.servicePage.create({
      data: buildServicePageData(data),
    })
    return normalizeDocument(record)
  }

  const SERVICE = await loadServiceModel()
  const record = await SERVICE.create({
    service: data.service,
    section: data.section,
    title: data.title,
    description: data.description,
    image: data.image,
    buttonText: data.buttonText,
    language: data.language,
    cards: data.cards,
  })
  return normalizeDocument(record)
}

export async function deleteServicePageById(id) {
  if (shouldUsePrisma()) {
    const record = await prisma.servicePage.delete({
      where: { id },
    })
    return normalizeDocument(record)
  }

  const SERVICE = await loadServiceModel()
  const record = await SERVICE.findOneAndDelete({ _id: id })
  return normalizeDocument(record)
}

export async function updateServicePageById(id, data) {
  if (shouldUsePrisma()) {
    const record = await prisma.servicePage.update({
      where: { id },
      data: buildServicePageData(data),
    })
    return normalizeDocument(record)
  }

  const SERVICE = await loadServiceModel()
  const record = await SERVICE.findOneAndUpdate(
    { _id: id },
    {
      service: data.service,
      section: data.section,
      title: data.title,
      description: data.description,
      image: data.image,
      buttonText: data.buttonText,
      language: data.language,
      cards: data.cards,
    },
    { new: true }
  )
  return normalizeDocument(record)
}

export async function updateServicePagesBySectionAndLanguage(section, language, data) {
  if (shouldUsePrisma()) {
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

  const SERVICE = await loadServiceModel()

  const updateData = {}

  if (data.description) updateData.description = data.description
  if (data.title) updateData.title = data.title
  if (data.image) updateData.image = data.image
  if (data.buttonText) updateData.buttonText = data.buttonText
  if (data.service) updateData.service = data.service
  if (data.section) updateData.section = data.section
  if (data.language) updateData.language = data.language
  if (data.cards) updateData.cards = data.cards

  return SERVICE.updateMany(
    { section, language },
    {
      $set: updateData,
    }
  )
}