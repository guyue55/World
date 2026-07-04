import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = [
  'data/r8-scene-universe/scene-universe.json',
  'src/components/r8-scene-universe/SceneUniverseEngine.tsx',
  'src/components/r8-scene-universe/SceneDepthField.tsx',
  'src/components/r8-scene-universe/SceneUniverseSection.tsx',
  'src/app/api/r8/scene-universe/route.ts',
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
]

for (const file of files) {
  const content = fs.readFileSync(path.join(root, file), 'utf8')
  for (const token of forbidden) {
    if (content.includes(token)) throw new Error(`R8.8 boundary violation in ${file}: ${token}`)
  }
}

const engine = fs.readFileSync(path.join(root, 'src/components/r8-scene-universe/SceneUniverseEngine.tsx'), 'utf8')
if (!engine.includes('try {') || !engine.includes('catch')) throw new Error('R8.8 localStorage access must be guarded')
if (!engine.includes('reducedMotion')) throw new Error('R8.8 scene engine must respect reducedMotion')

const api = fs.readFileSync(path.join(root, 'src/app/api/r8/scene-universe/route.ts'), 'utf8')
for (const token of ['staticSafe: true', 'productionWrite: false', 'aiRequired: false', 'databaseRequired: false']) {
  if (!api.includes(token)) throw new Error(`R8.8 API boundary missing ${token}`)
}

console.log('R8.8 scene universe boundary check passed.')
