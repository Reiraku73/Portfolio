import type { Metadata } from 'next'
import Link from 'next/link'
import { MdArrowForward } from 'react-icons/md'
import { BTN_GHOST } from '@/components/ui/Section'
import { clientDictionaries } from '@/lib/i18n/clientDictionaries'
import { locales } from '@/lib/i18n/config'
import { fontVariables } from './fonts'
import './globals.css'

// 404 for any URL that matches no route (/es/anything, /fr...). Needed because
// the root layout lives in app/[lang]/, so an unknown URL has no layout to
// render a not-found page in. It also has no language, so it shows both.
// Enabled by experimental.globalNotFound in next.config.ts.

export const metadata: Metadata = {
  title: `404 · ${clientDictionaries.es.notFound.title} / ${clientDictionaries.en.notFound.title}`,
}

export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${fontVariables} antialiased`}>
      <body className="min-h-full font-sans">
        <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-bg px-5 py-15 text-center text-ink">
          <h1 className="font-display text-[clamp(80px,14vw,160px)] leading-none text-accent">404</h1>
          <div className="flex flex-col gap-10 md:flex-row md:gap-16">
            {locales.map((locale) => {
              const dict = clientDictionaries[locale].notFound
              return (
                <section key={locale} lang={locale} className="flex max-w-xs flex-col items-center gap-3">
                  <h2 className="font-display text-[clamp(28px,4vw,40px)] leading-none">{dict.title}</h2>
                  <p className="text-[15px] text-dim">{dict.text}</p>
                  <Link href={`/${locale}`} className={`${BTN_GHOST} mt-2 px-6 py-3 text-sm`}>
                    {dict.home} <MdArrowForward aria-hidden />
                  </Link>
                </section>
              )
            })}
          </div>
        </main>
      </body>
    </html>
  )
}
