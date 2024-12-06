// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function authenticate(request) {
  const token = request.cookies.get('token')?.value;

  const url = request.nextUrl.clone();

  if (!token) {
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/dashboard*'],
};