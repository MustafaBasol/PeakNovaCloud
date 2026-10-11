export function failureBody(error) {
  const status = error?.status === 401 || error?.status === 403 ? error.status : 400
  const message = status === 401 ? 'Unauthorized' : status === 403 ? 'Forbidden' : (error?.message || 'Bad request')
  return { status, body: { success: false, error: message } }
}
