import fs from 'node:fs'
import migration from '../data/pre-v4/src-structure-migration-map.json'

const errors: string[] = []

for (const item of migration.moves) {
  if (!fs.existsSync(item.to)) {
    errors.push(`missing target ${item.to}`)
  }
  if (!fs.existsSync(item.from)) {
    errors.push(`missing compatibility path ${item.from}`)
  }
}

if (fs.existsSync('src/lib/v4')) {
  errors.push('src/lib/v4 must not be created; use src/features/v4-* instead')
}

const requiredDocs = [
  'docs-architecture/src-structure-before-v4.md',
  'src/features/README.md',
  'src/platform/README.md',
  'src/shared/README.md',
]

for (const doc of requiredDocs) {
  if (!fs.existsSync(doc)) {
    errors.push(`missing ${doc}`)
  }
}

if (!migration.v4Rule.includes('do not create src/lib/v4')) {
  errors.push('V4 no src/lib/v4 rule missing')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('Pre-V4 src structure check passed.')
