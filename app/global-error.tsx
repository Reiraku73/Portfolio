'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { MdArrowForward, MdRefresh } from 'react-icons/md'
import { BTN_GHOST, BTN_PRIMARY } from '@/components/ui/Section'
import { clientDictionaries } from '@/lib/i18n/clientDictionaries'
import { toLocale } from '@/lib/i18n/config'
import { fontVariables } from './fonts'
import './globals.css'

// Last-resort screen for errors in app/[lang]/layout.tsx itself, which
// app/[lang]/error.tsx can't catch. It replaces the layout, so it brings its
// own <html>, styles and fonts. No metadata export here (client component):
// the title goes in a <title> tag.
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  const lang = toLocale(useParams<{ lang?: string }>()?.lang)
  const dict = clientDictionaries[lang].error

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang={lang} className={`${fontVariables} antialiased`}>
      <body className="min-h-full font-sans">
        <title>{dict.title}</title>
        <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-5 text-center text-ink">
          <h1 className="font-display text-[clamp(40px,6vw,72px)] leading-none">{dict.title}</h1>
          <p className="mt-3 mb-8 max-w-md text-[15px] text-dim">{dict.text}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => unstable_retry()} className={`${BTN_PRIMARY} px-7 py-3.5 text-sm`}>
              <MdRefresh aria-hidden /> {dict.retry}
            </button>
            {/* A plain <a>: a full page load is the safest way out of a broken layout */}
            <a href={`/${lang}`} className={`${BTN_GHOST} px-7 py-3.5 text-sm`}>
              {dict.home} <MdArrowForward aria-hidden />
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
