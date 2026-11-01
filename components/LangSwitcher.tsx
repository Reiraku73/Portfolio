'use client'

import Link from 'next/link'
import { locales, LOCALE_COOKIE, type Locale } from '@/lib/i18n/config'

// Plain links to /es and /en. The cookie remembers the choice so the proxy
// sends the visitor to the same language next time they open "/".
export function LangSwitcher({
  current,
  label,
  className = '',
}: {
  current: Locale
  label: string
  className?: string
}) {
  return (
    <div role="group" aria-label={label} className={`flex gap-1 ${className}`}>
      {locales.map((locale) => {
        const active = locale === current
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            hrefLang={locale}
            scroll={false}
            aria-current={active ? 'true' : undefined}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`
            }}
            className={`rounded border px-[9px] py-[3px] font-mono text-[11px] tracking-[1px] transition-all ${
              active ? 'border-accent bg-accent text-white' : 'border-line text-subtle hover:text-ink'
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
