// Locale detection tests. Run with `npm test` (node:test, no extra dependencies).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { NextRequest } from 'next/server'
import { detectLocale, localeFromAcceptLanguage, localeFromCountry } from './detect'

// Minimal stand-in for NextRequest: detectLocale only reads one cookie and a few headers.
function fakeRequest({ cookie, headers = {} }: { cookie?: string; headers?: Record<string, string> }) {
  return {
    cookies: { get: () => (cookie === undefined ? undefined : { value: cookie }) },
    headers: { get: (name: string) => headers[name] ?? null },
  } as unknown as NextRequest
}

test('Accept-Language: picks the highest-ranked supported language', () => {
  assert.equal(localeFromAcceptLanguage('pt-BR,pt;q=0.9,en;q=0.8'), 'en')
  assert.equal(localeFromAcceptLanguage('es-AR,es;q=0.9,en;q=0.8'), 'es')
  assert.equal(localeFromAcceptLanguage('en;q=0.5,es;q=0.9'), 'es')
})

test('Accept-Language: ignores q=0 and unsupported languages', () => {
  assert.equal(localeFromAcceptLanguage('es;q=0,en;q=0.1'), 'en')
  assert.equal(localeFromAcceptLanguage('fr,de'), undefined)
  assert.equal(localeFromAcceptLanguage(null), undefined)
})

test('Country: Spanish-speaking countries get es, any other gets en', () => {
  assert.equal(localeFromCountry('AR'), 'es')
  assert.equal(localeFromCountry('mx'), 'es')
  assert.equal(localeFromCountry('US'), 'en')
  assert.equal(localeFromCountry(null), undefined)
})

test('detectLocale: the cookie wins over everything else', () => {
  const request = fakeRequest({ cookie: 'en', headers: { 'accept-language': 'es', 'x-vercel-ip-country': 'AR' } })
  assert.equal(detectLocale(request), 'en')
})

test('detectLocale: an invalid cookie is ignored', () => {
  assert.equal(detectLocale(fakeRequest({ cookie: 'fr', headers: { 'accept-language': 'es' } })), 'es')
})

test('detectLocale: the browser language comes before the country', () => {
  const request = fakeRequest({ headers: { 'accept-language': 'en-US', 'x-vercel-ip-country': 'AR' } })
  assert.equal(detectLocale(request), 'en')
})

test('detectLocale: falls back to the country (Vercel or Cloudflare header)', () => {
  assert.equal(detectLocale(fakeRequest({ headers: { 'accept-language': 'fr', 'x-vercel-ip-country': 'CL' } })), 'es')
  assert.equal(detectLocale(fakeRequest({ headers: { 'cf-ipcountry': 'ES' } })), 'es')
})

test('detectLocale: with no signal at all, uses the default (en)', () => {
  assert.equal(detectLocale(fakeRequest({})), 'en')
})
