import { build } from 'esbuild'
import fs from 'node:fs'

const ID = '@gsnowdrift/dsh-java-ops'

const result = await build({
  entryPoints: ['src/client.js'],
  bundle: true,
  write: false,
  format: 'cjs',
  platform: 'browser',
  target: 'es2020',
  // Only the modules DSH's shared browser table can resolve may stay external.
  // Everything else (Radix and friends) is bundled into this file.
  external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client'],
  legalComments: 'none',
})

if (result.outputFiles.length !== 1) throw new Error('expected exactly one bundle')
const bundled = result.outputFiles[0].text

// The loader hands the factory a `require` that resolves against the shared
// table, so the bundle runs inside the factory with a module scope of its own.
const out = `window.__ModuleLoader__.load({
  id: '${ID}',
  factory(require) {
    var module = { exports: {} }
    var exports = module.exports
${bundled
  .split('\n')
  .map((line) => (line === '' ? '' : '    ' + line))
  .join('\n')}
    return module.exports
  },
})
`

fs.writeFileSync('lib/client.js', out, 'utf8')
console.log('built lib/client.js', out.length, 'bytes')
