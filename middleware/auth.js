import jwt from 'jsonwebtoken';

export class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Called directly from API route handlers. It throws so the caller's
// try/catch rejects the request before any repository write runs.
// Missing or invalid credentials are 401. A valid token whose role is not
// admin is 403. Tokens issued before roles existed have no role and stay valid.
export function authenticate(request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    throw new HttpError('Unauthorized', 401);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload && typeof payload === 'object' && payload.role && payload.role !== 'admin') {
      throw new HttpError('Forbidden', 403);
    }
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError('Unauthorized', 401);
  }
}

export async function withAuth(request, action) {
  authenticate(request);
  return action();
}
