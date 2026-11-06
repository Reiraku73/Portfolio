'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MdArrowForward, MdRefresh } from 'react-icons/md'
import { BTN_GHOST, BTN_PRIMARY } from '@/components/ui/Section'
import { clientDictionaries } from '@/lib/i18n/clientDictionaries'
import { toLocale } from '@/lib/i18n/config'

// Shown when a page under /[lang] throws while rendering. The [lang] layout
// (fonts, <html lang>) stays, so only the page content is replaced.
// Next 16 passes `unstable_retry` (not `reset`): it re-renders the page.
export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  const lang = toLocale(useParams<{ lang: string }>().lang)
  const dict = clientDictionaries[lang].error

  useEffect(() => {
    // In production the message is generic; the digest matches the server logs.
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-5 text-center text-ink">
      <div className="mb-4 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[3.5px] text-accent">
        <span className="inline-block h-px w-6 bg-accent" />
        {dict.label}
      </div>
      <h1 className="font-display text-[clamp(40px,6vw,72px)] leading-none">{dict.title}</h1>
      <p className="mt-3 mb-8 max-w-md text-[15px] text-dim">{dict.text}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => unstable_retry()} className={`${BTN_PRIMARY} px-7 py-3.5 text-sm`}>
          <MdRefresh aria-hidden /> {dict.retry}
        </button>
        <Link href={`/${lang}`} className={`${BTN_GHOST} px-7 py-3.5 text-sm`}>
          {dict.home} <MdArrowForward aria-hidden />
        </Link>
      </div>
    </main>
  )
}
