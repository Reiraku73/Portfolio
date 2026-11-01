import 'server-only'
import type es from '@/dictionaries/es.json'
import type { Locale } from './config'

// es.json is the reference shape: if en.json is missing a key, the build fails here.
export type Dictionary = typeof es

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import('@/dictionaries/es.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
}

export const getDictionary = (locale: Locale) => dictionaries[locale]()
