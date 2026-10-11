import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import {
  escapeHtml,
  processContact,
  renderContactHtml,
  resetRateLimit,
  takeRateLimit,
  validateContact,
  verifyTurnstile,
  visitorIp,
} from '../libs/contactRequest.js'

const valid = {
  name: 'Ada',
  surname: 'Lovelace',
  email: 'ada@example.com',
  telefon: '+90 555 000 0000',
  servis: 'Bir randevu akisi.',
}

const env = {
  MAIL_USER: 'mailer@example.com',
  MAIL_PASS: 'secret-not-logged',
  EMAIL: 'inbox@example.com',
}

function headers(map = {}) {
  return { get: (name) => map[name.toLowerCase()] }
}

describe('contact request', { concurrency: 1 }, () => {
test('escapes html in the message body', () => {
  const html = renderContactHtml({
    ...valid,
    name: '<script>alert(1)</script>',
    servis: `"quoted" & 'x'`,
  })
  assert.equal(html.includes('<script>'), false)
  assert.match(html, /&lt;script&gt;/)
  assert.match(html, /&quot;quoted&quot;/)
  assert.match(html, /&#39;x&#39;/)
})

test('rejects missing, oversized and malformed fields', () => {
  assert.equal(validateContact(null).ok, false)
  assert.equal(validateContact({ ...valid, email: 'not-an-email' }).ok, false)
  assert.equal(validateContact({ ...valid, name: '' }).ok, false)
  assert.equal(validateContact({ ...valid, telefon: 'abc' }).ok, false)
  assert.equal(validateContact({ ...valid, servis: 'x'.repeat(4001) }).ok, false)
  assert.equal(validateContact({ ...valid, name: 'A'.repeat(81) }).ok, false)
  assert.equal(validateContact(valid).ok, true)
})

test('honeypot and bot payload are rejected without sending', async () => {
  resetRateLimit()
  let sent = 0
  const result = await processContact({
    raw: JSON.stringify({ data: { ...valid, website: 'https://spam.example' } }),
    headers: headers(),
    send: async () => { sent += 1 },
    env,
  })
  assert.equal(result.status, 400)
  assert.equal(sent, 0)
  assert.equal(JSON.stringify(result).includes('secret-not-logged'), false)
})

test('oversized body is rejected before send', async () => {
  resetRateLimit()
  let sent = 0
  const result = await processContact({
    raw: 'x'.repeat(8001),
    headers: headers(),
    send: async () => { sent += 1 },
    env,
  })
  assert.equal(result.status, 400)
  assert.equal(sent, 0)
})

test('rate limit blocks the sixth attempt and does not send', async () => {
  resetRateLimit()
  let sent = 0
  const send = async () => { sent += 1 }
  for (let i = 0; i < 5; i += 1) {
    const ok = await processContact({
      raw: JSON.stringify({ data: valid }),
      headers: headers({ 'cf-connecting-ip': '203.0.113.10' }),
      send,
      env: { ...env, TRUST_CLOUDFLARE: 'true' },
      now: 1_000 + i,
    })
    assert.equal(ok.status, 200)
  }
  const blocked = await processContact({
    raw: JSON.stringify({ data: valid }),
    headers: headers({ 'cf-connecting-ip': '203.0.113.10' }),
    send,
    env: { ...env, TRUST_CLOUDFLARE: 'true' },
    now: 2_000,
  })
  assert.equal(blocked.status, 429)
  assert.ok(blocked.retryAfter > 0)
  assert.equal(sent, 5)
})

test('spoofed forwarding headers are ignored unless Cloudflare is trusted', () => {
  assert.equal(visitorIp(headers({ 'cf-connecting-ip': '203.0.113.8', 'x-forwarded-for': '1.1.1.1' }), { trustCloudflare: false }), 'direct')
  assert.equal(visitorIp(headers({ 'cf-connecting-ip': '203.0.113.8' }), { trustCloudflare: true }), '203.0.113.8')
  assert.equal(visitorIp(headers({ 'x-forwarded-for': '1.1.1.1' }), { trustCloudflare: true }), 'missing')
})

test('separate trusted ips do not share a bucket', () => {
  resetRateLimit()
  for (let i = 0; i < 5; i += 1) takeRateLimit('203.0.113.1', 10_000)
  assert.equal(takeRateLimit('203.0.113.1', 10_000).ok, false)
  assert.equal(takeRateLimit('203.0.113.2', 10_000).ok, true)
})

test('turnstile is skipped until a secret is configured', async () => {
  const skipped = await verifyTurnstile('', '203.0.113.1', {})
  assert.equal(skipped.ok, true)
  let called = false
  const checked = await verifyTurnstile('token', '203.0.113.1', { TURNSTILE_SECRET_KEY: 'secret' }, async () => {
    called = true
    return { json: async () => ({ success: false }) }
  })
  assert.equal(called, true)
  assert.equal(checked.ok, false)
})

test('missing smtp config fails closed without calling send', async () => {
  resetRateLimit()
  let sent = 0
  const result = await processContact({
    raw: JSON.stringify({ data: valid }),
    headers: headers(),
    send: async () => { sent += 1 },
    env: {},
  })
  assert.equal(result.status, 500)
  assert.equal(result.log.event, 'mail_not_configured')
  assert.equal(sent, 0)
  assert.equal(JSON.stringify(result.log).includes('MAIL_PASS'), false)
})

test('smtp failures do not echo the provider error', async () => {
  resetRateLimit()
  const result = await processContact({
    raw: JSON.stringify({ data: valid }),
    headers: headers(),
    send: async () => {
      const error = new Error('535 user secret-not-logged rejected')
      error.code = 'EAUTH'
      error.responseCode = 535
      throw error
    },
    env,
  })
  assert.equal(result.status, 500)
  assert.equal(result.body.message, 'Failed to Send Email')
  assert.equal(result.log.code, 'EAUTH')
  assert.equal(result.log.responseCode, 535)
  assert.equal(JSON.stringify(result.log).includes('secret-not-logged'), false)
})

test('a valid submission keeps the existing success payload', async () => {
  resetRateLimit()
  let mail
  const result = await processContact({
    raw: JSON.stringify({ data: valid }),
    headers: headers(),
    send: async (message) => { mail = message },
    env,
  })
  assert.equal(result.status, 200)
  assert.deepEqual(result.body, { message: 'Email Sent Successfully' })
  assert.equal(mail.from, 'mailer@example.com')
  assert.equal(mail.replyTo, 'ada@example.com')
  assert.equal(mail.html.includes('<script>'), false)
})

test('escapeHtml covers ampersands before other entities', () => {
  assert.equal(escapeHtml(`&<>"'`), '&amp;&lt;&gt;&quot;&#39;')
})
})
