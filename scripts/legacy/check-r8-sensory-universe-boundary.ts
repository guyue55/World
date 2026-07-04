import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const forbidden = ['new Audio(', 'navigator.mediaDevices', 'fetch(\'https://', 'fetch("https://', 'dangerouslySetInnerHTML']
const files = [
  'src/components/r8-sensory-universe/SensoryUniverseEngine.tsx',
  'src/components/r8-sensory-universe/CosmicWeatherLayer.tsx',
  'src/components/r8-sensory-universe/SpatialJourneyMap.tsx',
  'src/components/r8-sensory-universe/SensoryUniverseSection.tsx',
  'src/app/api/r8/sensory-universe/route.ts',
]

const violations: string[] = []
for (const file of files) {
  const content = fs.readFileSync(path.join(root, file), 'utf8')
  for (const token of forbidden) {
    if (content.includes(token)) violations.push(`${file}: ${token}`)
  }
}

const api = fs.readFileSync(path.join(root, 'src/app/api/r8/sensory-universe/route.ts'), 'utf8')
for (const token of ['force-static', 'databaseRequired: false', 'aiRequired: false', 'productionMutation: false']) {
  if (!api.includes(token)) violations.push(`api missing ${token}`)
}

if (violations.length > 0) throw new Error(`R8.6 boundary violations:\n${violations.join('\n')}`)
console.log('R8.6 sensory universe boundary check passed.')
