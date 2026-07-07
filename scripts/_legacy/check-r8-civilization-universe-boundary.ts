import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = [
  'data/r8-civilization-universe/civilization-universe.json',
  'src/components/r8-civilization-universe/CivilizationUniverseEngine.tsx',
  'src/components/r8-civilization-universe/CivilizationUniverseSection.tsx',
  'src/components/r8-civilization-universe/NodeLifeConstellation.tsx',
  'src/components/r8-civilization-universe/UniverseObjectWorkbench.tsx',
  'src/components/r8-civilization-universe/WorldTrailBreadcrumb.tsx',
  'src/app/api/r8/civilization-universe/route.ts',
]

const forbidden = [
  'process.env.OPENAI_API_KEY',
  'fetch("https://api.openai.com',
  "fetch('https://api.openai.com",
  'prisma.',
  'createClient(',
  'INSERT INTO',
  'UPDATE ',
  'DELETE ',
  'fs.writeFile',
  'writeFileSync',
]

for (const file of files) {
  const content = fs.readFileSync(path.join(root, file), 'utf8')
  for (const token of forbidden) {
    if (content.includes(token)) throw new Error(`R8.9 boundary violation in ${file}: ${token}`)
  }
}

const engine = fs.readFileSync(path.join(root, 'src/components/r8-civilization-universe/CivilizationUniverseEngine.tsx'), 'utf8')
if (!engine.includes('try {') || !engine.includes('catch')) throw new Error('R8.9 localStorage access must be guarded')
if (!engine.includes('reducedMotion')) throw new Error('R8.9 civilization engine must respect reducedMotion')

const api = fs.readFileSync(path.join(root, 'src/app/api/r8/civilization-universe/route.ts'), 'utf8')
for (const token of ['productionWrite: false', 'databaseRequired: false', 'aiRequired: false']) {
  if (!api.includes(token)) throw new Error(`R8.9 API boundary missing ${token}`)
}

console.log('R8.9 civilization universe boundary check passed.')
