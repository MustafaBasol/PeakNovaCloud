import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import jwt from 'jsonwebtoken'
import { authenticate, withAuth } from '../middleware/auth.js'
import { failureBody } from '../libs/httpError.js'
import { generateToken } from '../libs/auth.js'

process.env.JWT_SECRET = 'test-secret'

function requestWith(token) {
  return { cookies: { get: () => (token ? { value: token } : undefined) } }
}

const writeRoutes = [
  'app/api/getAbout/route.js',
  'app/api/getBlogs/route.js',
  'app/api/getBlogs/[slug]/route.js',
  'app/api/getFaq/route.js',
  'app/api/getLogos/route.js',
  'app/api/getPage/route.js',
  'app/api/getProjects/route.js',
  'app/api/getSeo/route.js',
  'app/api/getService/route.js',
  'app/api/getService/[serviceName]/route.js',
]

test('missing and invalid tokens are 401 and do not run the write', async () => {
  let writes = 0
  await assert.rejects(
    () => withAuth(requestWith(undefined), async () => { writes += 1 }),
    (error) => error.status === 401,
  )
  await assert.rejects(
    () => withAuth(requestWith('not-a-token'), async () => { writes += 1 }),
    (error) => error.status === 401,
  )
  assert.equal(writes, 0)
  assert.throws(() => authenticate(requestWith(undefined)), (error) => error.status === 401)
})

test('a token with a non-admin role is 403 and does not run the write', async () => {
  const token = jwt.sign({ role: 'reader' }, process.env.JWT_SECRET)
  let writes = 0
  await assert.rejects(
    () => withAuth(requestWith(token), async () => { writes += 1 }),
    (error) => error.status === 403 && error.message === 'Forbidden',
  )
  assert.equal(writes, 0)
})

test('admin and legacy tokens are allowed to write', async () => {
  const admin = generateToken()
  const legacy = jwt.sign({}, process.env.JWT_SECRET)
  assert.equal(await withAuth(requestWith(admin), async () => 'ok'), 'ok')
  assert.equal(await withAuth(requestWith(legacy), async () => 'ok'), 'ok')
})

test('write failures use 401, 403 and 400', () => {
  const unauthorized = failureBody(Object.assign(new Error('Unauthorized'), { status: 401 }))
  const forbidden = failureBody(Object.assign(new Error('Forbidden'), { status: 403 }))
  const invalid = failureBody(new Error('Slug already exists. Please choose a different slug.'))
  assert.deepEqual(unauthorized, { status: 401, body: { success: false, error: 'Unauthorized' } })
  assert.deepEqual(forbidden, { status: 403, body: { success: false, error: 'Forbidden' } })
  assert.equal(invalid.status, 400)
  assert.equal(invalid.body.error.includes('Slug already exists'), true)
})

test('content write routes authenticate before the repository call', () => {
  for (const file of writeRoutes) {
    const source = readFileSync(path.join(process.cwd(), file), 'utf8')
    assert.match(source, /authenticate\(request\)/)
    assert.match(source, /writeFailure\(error\)/)
    const writes = source.split(/export async function (?:POST|PATCH|PUT|DELETE)/).slice(1)
    assert.ok(writes.length > 0, file)
    for (const body of writes) {
      const authAt = body.indexOf('authenticate(request)')
      const repoAt = body.search(/await (?:create|update|delete|find)/)
      assert.ok(authAt !== -1, file)
      if (repoAt !== -1) assert.ok(authAt < repoAt, file)
    }
  }
})

test('public read and login routes stay open', () => {
  const auth = readFileSync('app/api/auth/route.js', 'utf8')
  const mail = readFileSync('app/api/sendMail/route.js', 'utf8')
  const health = readFileSync('app/api/health/route.js', 'utf8')
  assert.equal(auth.includes('authenticate('), false)
  assert.equal(mail.includes('authenticate('), false)
  assert.equal(health.includes('authenticate('), false)
  assert.match(auth, /status: 401/)
  assert.match(auth, /Password required/)
})

test('production start does not push the database schema', () => {
  const start = readFileSync('scripts/start-production.sh', 'utf8')
  const prepare = readFileSync('scripts/prepare-deployment.sh', 'utf8')
  assert.equal(start.includes('db push'), false)
  assert.equal(prepare.includes('db push'), false)
  assert.match(start, /prisma generate/)
})

test('route files under app/api are the expected set', () => {
  const found = []
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry)
      if (statSync(full).isDirectory()) walk(full)
      else if (entry === 'route.js') found.push(full)
    }
  }
  walk('app/api')
  for (const file of writeRoutes) assert.ok(found.includes(file), file)
})
