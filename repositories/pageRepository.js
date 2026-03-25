import prisma from '@/libs/prisma'
import { loadPageModel } from '@/repositories/mongoRuntime'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'
import { shouldUsePrisma } from '@/repositories/repositoryRuntime'

export async function listPagesByLanguageAndSection(language, section) {
  if (shouldUsePrisma()) {
    const records = await prisma.pageContent.findMany({
      where: {
        language,
        section: section ? { contains: section } : undefined,
      },
      orderBy: { createdAt: 'asc' },
    })
    return normalizeDocuments(records)
  }

  const PAGE = await loadPageModel()
  const records = await PAGE.find({ language, section: { $regex: section } }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function createPage(data) {
  if (shouldUsePrisma()) {
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

  const PAGE = await loadPageModel()
  const record = await PAGE.create({
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

export async function deletePageById(id) {
  if (shouldUsePrisma()) {
    const record = await prisma.pageContent.delete({
      where: { id },
    })
    return normalizeDocument(record)
  }

  const PAGE = await loadPageModel()
  const record = await PAGE.findOneAndDelete({ _id: id })
  return normalizeDocument(record)
}

export async function updatePageById(id, data) {
  if (shouldUsePrisma()) {
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

  const PAGE = await loadPageModel()
  const record = await PAGE.findOneAndUpdate(
    { _id: id },
    {
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