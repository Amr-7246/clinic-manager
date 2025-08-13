
import { defaultLocale, locales } from './i18n';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname === '/'
  );

  if (pathnameIsMissingLocale) {
    const locale = req.headers.get('accept-language')?.split(',')[0] || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  return NextResponse.next();
}
