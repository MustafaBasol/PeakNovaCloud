export function getEntityId(entity) {
  if (!entity) {
    return ''
  }

  return entity.id || entity._id || ''
}