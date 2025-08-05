import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip if pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return NextResponse.next();

  // Only redirect from root path
  if (pathname === '/') {
    const acceptLang = request.headers.get('accept-language');
    const preferredLang = acceptLang?.split(',')[0].split('-')[0] || defaultLocale;

    const matchedLocale = locales.includes(preferredLang) ? preferredLang : defaultLocale;

    request.nextUrl.pathname = `/${matchedLocale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // For other paths without locale, prefix with default
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
