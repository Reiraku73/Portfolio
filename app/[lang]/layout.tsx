import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, locales } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { fontVariables } from '../fonts'
import '../globals.css'

// Both languages are prerendered at build time; any other /[lang] is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const { meta } = await getDictionary(lang)
  return {
    title: meta.title,
    description: meta.description,
    // hreflang links so search engines index each language separately.
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  }
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <html lang={lang} className={`${fontVariables} antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  )
}
