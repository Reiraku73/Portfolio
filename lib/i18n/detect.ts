import type { NextRequest } from 'next/server'
import { defaultLocale, hasLocale, LOCALE_COOKIE, type Locale } from './config'

// ISO 3166-1 alpha-2 codes of countries where Spanish is the main language.
const SPANISH_SPEAKING_COUNTRIES = new Set([
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'ES', 'GQ', 'GT',
  'HN', 'MX', 'NI', 'PA', 'PE', 'PR', 'PY', 'SV', 'UY', 'VE',
])

// Picks the highest-ranked supported language from an Accept-Language header,
// e.g. "pt-BR,pt;q=0.9,en;q=0.8" -> "en". Region subtags are ignored (es-AR -> es).
export function localeFromAcceptLanguage(header: string | null): Locale | undefined {
  if (!header) return undefined

  const ranked = header
    .split(',')
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='))
      return {
        lang: tag.trim().toLowerCase().split('-')[0],
        quality: q ? Number(q.slice(2)) : 1,
        index,
      }
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)

  for (const { lang } of ranked) {
    if (hasLocale(lang)) return lang
  }
  return undefined
}

export function localeFromCountry(country: string | null): Locale | undefined {
  if (!country) return undefined
  return SPANISH_SPEAKING_COUNTRIES.has(country.toUpperCase()) ? 'es' : 'en'
}

// Order: manual choice (cookie) > browser language > visitor's country > default.
// The country header is set by the host: Vercel sends x-vercel-ip-country,
// Cloudflare sends cf-ipcountry. Locally neither exists.
export function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookie && hasLocale(cookie)) return cookie

  return (
    localeFromAcceptLanguage(request.headers.get('accept-language')) ??
    localeFromCountry(
      request.headers.get('x-vercel-ip-country') ?? request.headers.get('cf-ipcountry'),
    ) ??
    defaultLocale
  )
}
