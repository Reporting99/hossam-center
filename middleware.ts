import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { DEFAULT_LOCALE, LOCALES } from '~/lib/page-mappings';

// Locale set and default come from the route registry, so the redirect
// target always equals the hreflang x-default target.
const locales = LOCALES;
const defaultLocale = DEFAULT_LOCALE;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and public/asset files
    '/((?!_next|api|assets|videos|favicon.ico|robots.txt|sitemap.xml|sitemap-0.xml|Website Logo.png|Website Logo Red.png|screenshot.jpg|.*\\..*).*)',
  ],
};
