import prisma from '@/libs/prisma'
import { loadFaqModel } from '@/repositories/mongoRuntime'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'
import { shouldUsePrisma } from '@/repositories/repositoryRuntime'

export async function listFaqByLanguage(language) {
  if (shouldUsePrisma()) {
    const records = await prisma.faq.findMany({
      where: { language },
      orderBy: { createdAt: 'asc' },
    })
    return normalizeDocuments(records)
  }

  const FAQ = await loadFaqModel()
  const records = await FAQ.find({ language }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function createFaq(data) {
  if (shouldUsePrisma()) {
    const record = await prisma.faq.create({
      data: {
        question: data.question,
        answer: data.answer,
        language: data.language,
      },
    })
    return normalizeDocument(record)
  }

  const FAQ = await loadFaqModel()
  const record = await FAQ.create({
    question: data.question,
    answer: data.answer,
    language: data.language,
  })
  return normalizeDocument(record)
}

export async function deleteFaqById(id) {
  if (shouldUsePrisma()) {
    const record = await prisma.faq.delete({
      where: { id },
    })
    return normalizeDocument(record)
  }

  const FAQ = await loadFaqModel()
  const record = await FAQ.findOneAndDelete({ _id: id })
  return normalizeDocument(record)
}

export async function updateFaqById(id, data) {
  if (shouldUsePrisma()) {
    const record = await prisma.faq.update({
      where: { id },
      data: {
        question: data.question,
        answer: data.answer,
        language: data.language,
      },
    })
    return normalizeDocument(record)
  }

  const FAQ = await loadFaqModel()
  const record = await FAQ.findOneAndUpdate(
    { _id: id },
    {
      question: data.question,
      answer: data.answer,
      language: data.language,
    },
    { new: true }
  )
  return normalizeDocument(record)
}