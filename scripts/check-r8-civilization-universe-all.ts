import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const requiredFiles = [
  'data/r8-civilization-universe/civilization-universe.json',
  'src/components/r8-civilization-universe/types.ts',
  'src/components/r8-civilization-universe/CivilizationUniverseEngine.tsx',
  'src/components/r8-civilization-universe/CivilizationUniverseSection.tsx',
  'src/components/r8-civilization-universe/NodeLifeConstellation.tsx',
  'src/components/r8-civilization-universe/UniverseObjectWorkbench.tsx',
  'src/components/r8-civilization-universe/WorldTrailBreadcrumb.tsx',
  'src/components/r8-civilization-universe/index.ts',
  'src/app/api/r8/civilization-universe/route.ts',
  'docs/10-development-history/r8-civilization-universe/r8-9-civilization-universe-plan.md',
]

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)))
if (missing.length > 0) throw new Error(`R8.9 civilization universe missing files: ${missing.join(', ')}`)

const data = JSON.parse(fs.readFileSync(path.join(root, 'data/r8-civilization-universe/civilization-universe.json'), 'utf8')) as {
  version?: string
  principles?: string[]
  completionCriteria?: string[]
  civilizationLayers?: Array<{ id?: string; name?: string; realName?: string; purpose?: string; objects?: string[]; defaultAction?: string }>
  worldObjects?: Array<{ id?: string; name?: string; realName?: string; action?: string; href?: string; risk?: string; mode?: string }>
  nodeLives?: Array<{ id?: string; worldTitle?: string; realTitle?: string; area?: string; stage?: string; maturity?: number; visibility?: string; trust?: string; origin?: string; relations?: string[]; growth?: string[]; nextAction?: string }>
  routeAnchors?: Array<{ match?: string; where?: string; what?: string; do?: string[]; next?: string[]; visibility?: string }>
  dailyWorld?: { moods?: string[]; todayPrompts?: string[]; maintenanceRituals?: string[] }
}

if (data.version !== 'R8.9') throw new Error('R8.9 civilization universe version mismatch')
if (!Array.isArray(data.principles) || data.principles.length < 5) throw new Error('R8.9 principles are insufficient')
if (!Array.isArray(data.completionCriteria) || data.completionCriteria.length < 5) throw new Error('R8.9 completion criteria are insufficient')
if (!Array.isArray(data.civilizationLayers) || data.civilizationLayers.length < 6) throw new Error('R8.9 must include at least six civilization layers')
if (!Array.isArray(data.worldObjects) || data.worldObjects.length < 6) throw new Error('R8.9 must include object workbench items')
if (!Array.isArray(data.nodeLives) || data.nodeLives.length < 4) throw new Error('R8.9 must include node life passports')
if (!Array.isArray(data.routeAnchors) || data.routeAnchors.length < 6) throw new Error('R8.9 must include route anchors')
if (!data.dailyWorld?.todayPrompts?.length || !data.dailyWorld.maintenanceRituals?.length) throw new Error('R8.9 daily world rituals are missing')

for (const layer of data.civilizationLayers) {
  if (!layer.id || !layer.name || !layer.realName || !layer.purpose || !layer.defaultAction) throw new Error(`R8.9 layer lacks identity: ${layer.id}`)
  if (!Array.isArray(layer.objects) || layer.objects.length < 4) throw new Error(`R8.9 layer lacks objects: ${layer.id}`)
}

for (const object of data.worldObjects) {
  if (!object.id || !object.name || !object.realName || !object.action || !object.href || !object.risk || !object.mode) {
    throw new Error(`R8.9 object lacks fields: ${object.id}`)
  }
}

for (const node of data.nodeLives) {
  if (!node.id || !node.worldTitle || !node.realTitle || !node.area || !node.stage || typeof node.maturity !== 'number') {
    throw new Error(`R8.9 node passport lacks fields: ${node.id}`)
  }
  if (!node.visibility || !node.trust || !node.origin || !node.nextAction) throw new Error(`R8.9 node lacks governance fields: ${node.id}`)
  if (!Array.isArray(node.relations) || node.relations.length < 3) throw new Error(`R8.9 node lacks relation explanations: ${node.id}`)
  if (!Array.isArray(node.growth) || node.growth.length < 4) throw new Error(`R8.9 node lacks growth track: ${node.id}`)
}

const requiredMatches = ['/', '/atlas', '/timeline', '/archive', '/node', '/r4-creator']
const matches = new Set(data.routeAnchors.map((anchor) => anchor.match))
const missingMatches = requiredMatches.filter((match) => !matches.has(match))
if (missingMatches.length > 0) throw new Error(`R8.9 missing route anchors: ${missingMatches.join(', ')}`)

const shell = fs.readFileSync(path.join(root, 'src/components/world/WorldShell.tsx'), 'utf8')
for (const token of ['CivilizationUniverseEngine', 'UniverseObjectWorkbench', 'WorldTrailBreadcrumb']) {
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
  if (!content.includes('CivilizationUniverseSection')) throw new Error(`${page} does not include CivilizationUniverseSection`)
  if (!content.includes('NodeLifeConstellation')) throw new Error(`${page} does not include NodeLifeConstellation`)
}

console.log('R8.9 civilization universe all check passed.')
