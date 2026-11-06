// Locale helper tests. Run with `npm test` (node:test, no extra dependencies).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { defaultLocale, toLocale } from './config'

test('toLocale: keeps a supported locale', () => {
  assert.equal(toLocale('es'), 'es')
  assert.equal(toLocale('en'), 'en')
})

test('toLocale: falls back to the default for anything else', () => {
  for (const value of ['fr', 'ES', '', undefined, null, ['es'], 42]) {
    assert.equal(toLocale(value), defaultLocale)
  }
})
