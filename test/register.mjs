// Lets `node --test` run the app's TypeScript as is. Node strips the types,
// but the source imports local files without an extension ("./config"),
// which Next resolves and Node doesn't. This hook retries those with ".ts".
// Only the test script loads it; the app build never sees it.
import { register } from 'node:module'

register(
  'data:text/javascript,' +
    encodeURIComponent(`
      export async function resolve(specifier, context, nextResolve) {
        try {
          return await nextResolve(specifier, context)
        } catch (error) {
          const isLocal = specifier.startsWith('./') || specifier.startsWith('../')
          if (!isLocal || /\\.[cm]?[jt]sx?$/.test(specifier)) throw error
          return nextResolve(specifier + '.ts', context)
        }
      }
    `),
)
