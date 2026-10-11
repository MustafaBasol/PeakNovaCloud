const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5
const MAX_BODY = 8000

const hits = new Map()

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^\+?[0-9][0-9\s().-]{6,30}$/
const IP = /^[0-9a-fA-F:.]+$/

export function resetRateLimit() {
  hits.clear()
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function clean(value) {
  return String(value ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim()
}

function isIp(value) {
  if (typeof value !== 'string') return false
  const ip = value.trim()
  if (ip.length < 3 || ip.length > 45 || ip.includes(',')) return false
  return IP.test(ip)
}

/**
 * CF-Connecting-IP is used only when the process is configured to trust Cloudflare
 * (origin reachable solely through cloudflared). Otherwise client-supplied
 * forwarding headers are ignored so a caller cannot rotate the rate-limit key.
 */
export function visitorIp(headers, { trustCloudflare = false } = {}) {
  if (!trustCloudflare) return 'direct'
  const cf = headers?.get?.('cf-connecting-ip')
  if (isIp(cf)) return cf.trim()
  return 'missing'
}

export function takeRateLimit(key, now = Date.now()) {
  const recent = (hits.get(key) || []).filter((at) => now - at < WINDOW_MS)
  if (recent.length >= MAX_ATTEMPTS) {
    hits.set(key, recent)
    const retryAfter = Math.max(1, Math.ceil((WINDOW_MS - (now - recent[0])) / 1000))
    return { ok: false, retryAfter }
  }
  recent.push(now)
  hits.set(key, recent)
  return { ok: true }
}

export function validateContact(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return { ok: false }
  if (clean(data.website) || clean(data.company)) return { ok: false }

  const name = clean(data.name)
  const surname = clean(data.surname)
  const email = clean(data.email)
  const telefon = clean(data.telefon)
  const servis = clean(data.servis)

  if (name.length < 1 || name.length > 80) return { ok: false }
  if (surname.length < 1 || surname.length > 80) return { ok: false }
  if (email.length > 254 || !EMAIL.test(email) || /[<>]/.test(email)) return { ok: false }
  if (telefon.length > 32 || !PHONE.test(telefon)) return { ok: false }
  if (servis.length < 1 || servis.length > 4000) return { ok: false }

  return { ok: true, value: { name, surname, email, telefon, servis, turnstileToken: clean(data.turnstileToken) } }
}

export function renderContactHtml(value) {
  return `
    <h3>YENİ MÜSTERİ</h3>
    <ul>
      <li>isim: ${escapeHtml(value.name)}</li>
      <li>soyisim: ${escapeHtml(value.surname)}</li>
      <li>email: ${escapeHtml(value.email)}</li>
      <li>tel: ${escapeHtml(value.telefon)}</li>
    </ul>
    <p>istek: ${escapeHtml(value.servis)}</p>
  `
}

export async function verifyTurnstile(token, ip, env, fetchImpl = fetch) {
  const secret = env.TURNSTILE_SECRET_KEY
  if (!secret) return { ok: true, skipped: true }
  if (!token) return { ok: false }
  const body = new URLSearchParams()
  body.set('secret', secret)
  body.set('response', token)
  if (ip !== 'direct' && ip !== 'missing') body.set('remoteip', ip)
  const response = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  })
  const payload = await response.json().catch(() => null)
  return { ok: Boolean(payload?.success) }
}

const fail = (status, extra) => ({ status, body: { message: 'Failed to Send Email' }, ...extra })

export async function processContact({ raw, headers, now = Date.now(), send, env, fetchImpl }) {
  if (typeof raw !== 'string' || raw.length > MAX_BODY) return fail(400)

  const ip = visitorIp(headers, { trustCloudflare: env.TRUST_CLOUDFLARE === 'true' })
  const limit = takeRateLimit(ip, now)
  if (!limit.ok) return fail(429, { retryAfter: limit.retryAfter })

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    return fail(400)
  }

  const valid = validateContact(parsed?.data)
  if (!valid.ok) return fail(400)

  const turnstile = await verifyTurnstile(valid.value.turnstileToken, ip, env, fetchImpl)
  if (!turnstile.ok) return fail(400)

  if (!env.MAIL_USER || !env.MAIL_PASS || !env.EMAIL) {
    return fail(500, { log: { event: 'mail_not_configured' } })
  }

  try {
    await send({
      from: env.MAIL_USER,
      to: env.EMAIL,
      replyTo: valid.value.email,
      subject: 'Potansiyel Müşteri',
      html: renderContactHtml(valid.value),
    })
  } catch (error) {
    return fail(500, {
      log: {
        event: 'mail_send_failed',
        code: error?.code || 'unknown',
        responseCode: error?.responseCode || null,
      },
    })
  }

  return { status: 200, body: { message: 'Email Sent Successfully' } }
}
