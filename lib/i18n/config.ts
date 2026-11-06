// Shared by proxy.ts (edge) and the app, so no server-only imports here.

export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]

// Used when neither the cookie, the browser language nor the country give a hint.
export const defaultLocale: Locale = 'en'

// Set by the language switcher so a manual choice wins over detection.
export const LOCALE_COOKIE = 'NEXT_LOCALE'

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

// For places that can't reject an unknown language, like the error screen:
// anything that isn't a supported locale falls back to the default one.
export const toLocale = (value: unknown): Locale =>
  typeof value === 'string' && hasLocale(value) ? value : defaultLocale
