import jwt from 'jsonwebtoken';

// Called directly from API route handlers (not wired up as real Next.js
// middleware, despite the file's location) — it must throw on failure so the
// caller's try/catch actually rejects the request instead of silently
// continuing with an unused NextResponse return value.
export function authenticate(request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new Error('Unauthorized');
  }
}