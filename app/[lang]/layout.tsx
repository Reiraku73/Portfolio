import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Anton, DM_Mono, DM_Sans } from 'next/font/google'
import { hasLocale, locales } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import '../globals.css'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const dmMono = DM_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-dm-mono' })

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
    <html lang={lang} className={`${anton.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  )
}
