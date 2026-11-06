import es from '@/dictionaries/client/es.json'
import en from '@/dictionaries/client/en.json'
import type { Locale } from './config'

// Texts used by client components (the error screen) and by the global 404.
// They live apart from the main dictionaries, which stay server-only, so the
// browser only downloads these few strings.
export type ClientDictionary = typeof es

// es.json is the reference shape: if en.json is missing a key, the build fails here.
export const clientDictionaries: Record<Locale, ClientDictionary> = { es, en }
