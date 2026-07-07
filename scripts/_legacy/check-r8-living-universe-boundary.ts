import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const forbidden = ['three', '@react-three', 'webgl', 'navigator.gpu', 'window.fetch(', 'openai', 'anthropic']
const files = [
  'src/components/r8-living-universe/LivingUniverseField.tsx',
  'src/components/r8-living-universe/LivingAreaIdentity.tsx',
  'src/components/r8-living-universe/UniverseRitualDock.tsx',
  'src/components/r8-living-universe/LivingUniverseSection.tsx'
]

for (const file of files) {
  const content = fs.readFileSync(path.join(root, file), 'utf8').toLowerCase()
  for (const token of forbidden) {
    if (content.includes(token)) throw new Error(`R8.4 boundary violation in ${file}: ${token}`)
  }
  if (!content.includes('reducedmotion') && file !== 'src/components/r8-living-universe/LivingUniverseSection.tsx') {
    throw new Error(`R8.4 component lacks reduced-motion handling: ${file}`)
  }
}

const scenes = fs.readFileSync(path.join(root, 'data/r8-living-universe/living-scenes.json'), 'utf8').toLowerCase()
for (const privateWord of ['password', 'secret', 'token', 'address']) {
  if (scenes.includes(privateWord)) throw new Error(`R8.4 scene data contains sensitive boundary word: ${privateWord}`)
}

console.log('R8.4 living universe boundary check passed.')
