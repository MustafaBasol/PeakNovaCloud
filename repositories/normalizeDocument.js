function toPlainObject(record) {
  if (!record) {
    return record
  }

  if (typeof record.toObject === 'function') {
    return record.toObject()
  }

  return { ...record }
}

export function normalizeDocument(record) {
  if (!record) {
    return record
  }

  const plain = toPlainObject(record)

  if (plain._id) {
    const id = String(plain._id)
    return {
      ...plain,
      id,
      _id: id,
    }
  }

  if (plain.id) {
    const id = String(plain.id)
    return {
      ...plain,
      id,
      _id: id,
    }
  }

  return plain
}

export function normalizeDocuments(records) {
  if (!Array.isArray(records)) {
    return []
  }

  return records.map(normalizeDocument)
}