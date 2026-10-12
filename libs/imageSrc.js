export function publicSrc(value) {
  if (!value || typeof value !== 'string') return ''
  if (value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://')) return value
  return `/${value}`
}
