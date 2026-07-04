import fs from 'node:fs'
import path from 'node:path'

const errors: string[] = []
const required = [
  'README.md',
  'CONTRIBUTING.md',
  '.gitignore',
  '.github/workflows/ci.yml',
  'src',
  'data',
  'scripts',
  'public',
  'docs/README.md',
  'docs/document-inventory.json',
  'docs/00-inception',
  'docs/01-world-design',
  'docs/02-product-design',
  'docs/03-engineering-architecture',
  'docs/10-development-history',
  'docs/20-research',
  'docs/30-assets',
  'docs/90-archive',
]

for (const item of required) {
  if (!fs.existsSync(item)) errors.push(`missing ${item}`)
}

const devHistory = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'experience-realization']
for (const folder of devHistory) {
  const full = path.join('docs/10-development-history', folder)
  if (!fs.existsSync(full)) errors.push(`missing ${full}`)
}

const inventory = JSON.parse(fs.readFileSync('docs/document-inventory.json', 'utf8'))
const inventoryDocuments = Array.isArray(inventory.documents)
  ? inventory.documents
  : Array.isArray(inventory.copiedDocuments)
    ? inventory.copiedDocuments
    : []

if (inventoryDocuments.length < 100) {
  errors.push('docs inventory should contain migrated historical documents')
}

if (inventory.count !== inventoryDocuments.length) {
  errors.push('docs inventory count should match actual document entries')
}

const gitignore = fs.readFileSync('.gitignore', 'utf8')
const ignoredPatterns = ['node_modules/', '.next/', 'dist/', 'build/', 'coverage/', '*.zip', '*.patch', '*.rej', '*.orig']
for (const pattern of ignoredPatterns) {
  if (!gitignore.includes(pattern)) errors.push(`.gitignore missing ${pattern}`)
}

const sourceFiles = [
  'src/features/experience-realization/data.ts',
  'src/features/experience-realization/types.ts',
  'src/components/experience/UniverseHero.tsx',
  'src/components/experience/ThemeModeGallery.tsx',
  'scripts/check-experience-realization.ts',
]

for (const file of sourceFiles) {
  const source = fs.readFileSync(file, 'utf8')
  const importCount = (source.match(/^import /gm) || []).length
  if (file.endsWith('types.ts') && (source.match(/export type ExperienceRealmKind/g) || []).length !== 1) {
    errors.push(`${file} should define ExperienceRealmKind once`)
  }
  if (file.endsWith('data.ts') && (source.match(/export const experienceNodes/g) || []).length !== 1) {
    errors.push(`${file} should define experienceNodes once`)
  }
  if (file.includes('UniverseHero') && (source.match(/export function UniverseHero/g) || []).length !== 1) {
    errors.push(`${file} should define UniverseHero once`)
  }
  if (file.includes('ThemeModeGallery') && (source.match(/export function ThemeModeGallery/g) || []).length !== 1) {
    errors.push(`${file} should define ThemeModeGallery once`)
  }
  if (file.includes('check-experience') && (source.match(/const requiredFiles/g) || []).length !== 1) {
    errors.push(`${file} should define requiredFiles once`)
  }
  if (importCount > 20) errors.push(`${file} has unexpectedly many imports`)
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('Repo structure checks passed.')
