import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);
const supportedLocales = new Set(routing.locales);

export default function proxy(request) {
  const { pathname } = request.nextUrl;

  // Root path is handled by next-intl and redirected/re-written
  // according to the configured default locale.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pn-path', pathname);
  const withPath = new NextRequest(request, { headers: requestHeaders });

  if (pathname === '/') {
    return intlMiddleware(withPath);
  }

  const firstSegment = pathname.split('/').filter(Boolean)[0];

  // Only explicitly supported locale prefixes may enter
  // the localized application routes.
  if (supportedLocales.has(firstSegment)) {
    return intlMiddleware(withPath);
  }

  // Prevent arbitrary paths such as /xmlrpc.php, /sitemap.xml,
  // and /invalid-locale from being interpreted as a locale and
  // passed into Prisma enum filters.
  return new NextResponse('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export const config = {
  matcher: [
    '/',
    '/(en|fr|de|tr)/:path*',

    // Invalid extensionless first segments such as /invalid-locale.
    '/((?!api|_next|_vercel|.*\\..*).*)',

    // Common bot probes that previously reached app/[locale].
    '/xmlrpc.php',
    '/sitemap.xml',
  ],
};
