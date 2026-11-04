import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PROJECTS } from '../data/projects'
import { orderedPlatforms } from './projects'

const empty = { status: 'dev' as const, screenshots: [] }

test('the primary platform comes first', () => {
  assert.deepEqual(orderedPlatforms({ primary: 'mobile', platforms: { web: empty, mobile: empty } }), ['mobile', 'web'])
  assert.deepEqual(orderedPlatforms({ primary: 'web', platforms: { web: empty, mobile: empty } }), ['web', 'mobile'])
})

test('a single-platform project gets a single tab', () => {
  assert.deepEqual(orderedPlatforms({ primary: 'web', platforms: { web: empty } }), ['web'])
})

test('a primary platform that is missing is skipped', () => {
  assert.deepEqual(orderedPlatforms({ primary: 'mobile', platforms: { web: empty } }), ['web'])
})

test('every project declares its primary platform', () => {
  for (const project of PROJECTS) {
    assert.ok(project.platforms[project.primary], `${project.id} has no ${project.primary} platform`)
  }
})
