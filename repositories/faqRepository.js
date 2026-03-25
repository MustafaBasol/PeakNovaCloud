import prisma from '@/libs/prisma'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'

export async function listFaqByLanguage(language) {
  const records = await prisma.faq.findMany({
    where: { language },
    orderBy: { createdAt: 'asc' },
  })
  return normalizeDocuments(records)
}

export async function createFaq(data) {
  const record = await prisma.faq.create({
    data: {
      question: data.question,
      answer: data.answer,
      language: data.language,
    },
  })
  return normalizeDocument(record)
}

export async function deleteFaqById(id) {
  const record = await prisma.faq.delete({
    where: { id },
  })
  return normalizeDocument(record)
}

export async function updateFaqById(id, data) {
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