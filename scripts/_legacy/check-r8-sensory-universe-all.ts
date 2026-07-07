import fs from 'node:fs'
import path from 'node:path'

type Scene = {
  match: string
  title: string
  place: string
  weather: string
  gravity: string
  near: string[]
  middle: string[]
  far: string[]
  ritual: string
  soundHint: string
  next: Array<{ label: string; href: string }>
}

const root = process.cwd()
const requiredFiles = [
  'data/r8-sensory-universe/sensory-scenes.json',
  'data/r8-sensory-universe/world-objects.json',
  'src/components/r8-sensory-universe/SensoryUniverseEngine.tsx',
  'src/components/r8-sensory-universe/CosmicWeatherLayer.tsx',
  'src/components/r8-sensory-universe/SpatialJourneyMap.tsx',
  'src/components/r8-sensory-universe/SensoryUniverseSection.tsx',
  'src/components/r8-sensory-universe/index.ts',
  'src/app/api/r8/sensory-universe/route.ts',
  'docs/10-development-history/r8-sensory-universe/r8-6-sensory-universe-plan.md',
]

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)))
if (missing.length > 0) {
  throw new Error(`R8.6 sensory universe missing files:\n${missing.join('\n')}`)
}

const scenesData = JSON.parse(fs.readFileSync(path.join(root, 'data/r8-sensory-universe/sensory-scenes.json'), 'utf8')) as { scenes: Scene[] }
const requiredMatches = ['/', '/atlas', '/timeline', '/archive', '/paths', '/ask', '/node', '/r4-creator']
const matches = new Set(scenesData.scenes.map((scene) => scene.match))
const missingScenes = requiredMatches.filter((match) => !matches.has(match))
if (missingScenes.length > 0) throw new Error(`R8.6 missing scene matches: ${missingScenes.join(', ')}`)

for (const scene of scenesData.scenes) {
  const bad = [scene.near, scene.middle, scene.far].some((items) => !Array.isArray(items) || items.length < 3)
  if (bad) throw new Error(`Scene ${scene.match} must include at least 3 near/middle/far items`)
  if (!scene.ritual || !scene.weather || !scene.soundHint || scene.next.length < 2) {
    throw new Error(`Scene ${scene.match} lacks ritual/weather/soundHint/next`)
  }
}

const shell = fs.readFileSync(path.join(root, 'src/components/world/WorldShell.tsx'), 'utf8')
for (const token of ['CosmicWeatherLayer', 'SpatialJourneyMap', 'SensoryUniverseEngine']) {
  if (!shell.includes(token)) throw new Error(`WorldShell does not include ${token}`)
}

const pageTargets = ['src/app/page.tsx', 'src/app/atlas/page.tsx', 'src/app/timeline/page.tsx', 'src/app/archive/page.tsx', 'src/app/paths/page.tsx', 'src/app/ask/page.tsx', 'src/app/node/[slug]/page.tsx']
for (const file of pageTargets) {
  const content = fs.readFileSync(path.join(root, file), 'utf8')
  if (!content.includes('SensoryUniverseSection')) throw new Error(`${file} does not include SensoryUniverseSection`)
}

console.log('R8.6 sensory universe all check passed.')
