import { NextResponse, type NextRequest } from 'next/server'
import { locales } from '@/lib/i18n/config'
import { detectLocale } from '@/lib/i18n/detect'

// Every page lives under /es or /en. Requests without a locale prefix
// (usually just "/") are redirected to the detected language.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocalePrefix) return

  request.nextUrl.pathname = `/${detectLocale(request)}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Skip Next internals and any path with a file extension (screenshots, icon.png...).
  matcher: ['/((?!_next|.*\\..*).*)'],
}
