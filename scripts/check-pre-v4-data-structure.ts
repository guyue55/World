import fs from 'node:fs'
import registry from '../data/_data-structure-registry.json'

const errors: string[] = []

const rootJsonFiles = fs
  .readdirSync('data')
  .filter((file) => file.endsWith('.json') && file !== '_data-structure-registry.json')

if (rootJsonFiles.length > 0) {
  errors.push(`data root contains JSON files: ${rootJsonFiles.join(', ')}`)
}

for (const target of Object.values(registry.mapping)) {
  if (!fs.existsSync(String(target))) {
    errors.push(`missing moved data file: ${target}`)
  }
}

const requiredDirs = [
  'data/core',
  'data/domains/ai',
  'data/domains/archive',
  'data/domains/content',
  'data/domains/experience',
  'data/domains/governance',
  'data/engineering',
  'data/operations',
  'data/release',
  'data/versions/archive',
]

for (const dir of requiredDirs) {
  if (!fs.existsSync(dir)) {
    errors.push(`missing data directory: ${dir}`)
  }
}

if (!registry.rules.includes('avoid adding new JSON files directly under data/')) {
  errors.push('root data JSON rule missing')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('Pre-V4 data structure check passed.')
