import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const requiredFiles = [
  'data/r8-scene-universe/scene-universe.json',
  'src/components/r8-scene-universe/SceneUniverseEngine.tsx',
  'src/components/r8-scene-universe/SceneDepthField.tsx',
  'src/components/r8-scene-universe/SceneUniverseSection.tsx',
  'src/components/r8-scene-universe/index.ts',
  'src/app/api/r8/scene-universe/route.ts',
  'docs/10-development-history/r8-scene-universe/r8-8-scene-universe-plan.md',
]

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)))
if (missing.length > 0) {
  throw new Error(`R8.8 scene universe missing files: ${missing.join(', ')}`)
}

const dataPath = path.join(root, 'data/r8-scene-universe/scene-universe.json')
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8')) as {
  version?: string
  principles?: string[]
  completionCriteria?: string[]
  worldScale?: Record<string, string[]>
  routes?: Array<{
    match?: string
    worldName?: string
    realName?: string
    place?: string
    story?: string
    sceneObjects?: string[]
    lifeStage?: string
    scale?: string
    defaultMode?: string
    primaryAction?: string
    secondaryActions?: string[]
    quest?: string
    next?: Array<{ label?: string; href?: string }>
  }>
  fallback?: unknown
}

if (data.version !== 'R8.8') throw new Error('R8.8 scene universe version mismatch')
if (!Array.isArray(data.principles) || data.principles.length < 5) throw new Error('R8.8 principles are insufficient')
if (!Array.isArray(data.completionCriteria) || data.completionCriteria.length < 5) throw new Error('R8.8 completion criteria are insufficient')
if (!data.worldScale?.near?.length || !data.worldScale.middle?.length || !data.worldScale.far?.length) {
  throw new Error('R8.8 world scale must include near, middle, and far layers')
}
if (!Array.isArray(data.routes) || data.routes.length < 8) throw new Error('R8.8 must cover at least 8 core routes')

const requiredMatches = ['/', '/atlas', '/timeline', '/archive', '/node', '/ask', '/r4-creator', '/r7-evolution']
const matches = new Set(data.routes.map((route) => route.match))
const missingMatches = requiredMatches.filter((match) => !matches.has(match))
if (missingMatches.length > 0) throw new Error(`R8.8 missing route scenes: ${missingMatches.join(', ')}`)

for (const route of data.routes) {
  const label = route.match ?? 'unknown'
  if (!route.worldName || !route.realName || !route.place || !route.story) throw new Error(`R8.8 route ${label} lacks identity fields`)
  if (!Array.isArray(route.sceneObjects) || route.sceneObjects.length < 4) throw new Error(`R8.8 route ${label} lacks scene objects`)
  if (!route.primaryAction || !Array.isArray(route.secondaryActions) || route.secondaryActions.length < 3) throw new Error(`R8.8 route ${label} lacks actions`)
  if (!Array.isArray(route.next) || route.next.length < 2) throw new Error(`R8.8 route ${label} lacks next paths`)
}

const shell = fs.readFileSync(path.join(root, 'src/components/world/WorldShell.tsx'), 'utf8')
for (const token of ['SceneDepthField', 'SceneUniverseEngine']) {
  if (!shell.includes(token)) throw new Error(`WorldShell does not include ${token}`)
}

const pages = [
  'src/app/page.tsx',
  'src/app/atlas/page.tsx',
  'src/app/timeline/page.tsx',
  'src/app/archive/page.tsx',
  'src/app/paths/page.tsx',
  'src/app/ask/page.tsx',
  'src/app/node/[slug]/page.tsx',
]
for (const page of pages) {
  const content = fs.readFileSync(path.join(root, page), 'utf8')
  if (!content.includes('SceneUniverseSection')) throw new Error(`${page} does not include SceneUniverseSection`)
}

console.log('R8.8 scene universe all check passed.')
