import fs from 'node:fs'
import navigationStateContract from '../data/domains/experience/navigation-state-contract.json'
import stage from '../data/experience/experience-realization-stage.json'
import {
  constellationNodes,
  experienceNodes,
  experienceThemeModes,
  lighthouseSuggestions,
  memoryGraphNodes,
  timeRiverEvents,
  worldNetworkNodes,
} from '../src/features/experience-realization'

const requiredFiles = [
  'data/experience/experience-realization-stage.json',
  'src/features/experience-realization/index.ts',
  'src/features/experience-realization/data.ts',
  'src/components/experience/CelestialPanel.tsx',
  'src/components/experience/UniverseHero.tsx',
  'src/components/experience/LighthouseQueue.tsx',
  'src/components/experience/MemoryGraphView.tsx',
  'src/components/experience/ThemeModeGallery.tsx',
  'src/app/page.tsx',
  'src/app/world-map/page.tsx',
  'src/app/constellation/page.tsx',
  'src/app/time-river/page.tsx',
  'src/app/lighthouse/page.tsx',
  'src/app/memory-graph/page.tsx',
  'src/app/theme-system/page.tsx',
  'src/app/v6-world-network/page.tsx',
]

const requiredRoutes = [
  '/',
  '/world-map',
  '/constellation',
  '/time-river',
  '/lighthouse',
  '/memory-graph',
  '/theme-system',
  '/v6-world-network',
]

const errors: string[] = []

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) errors.push(`missing ${file}`)
}

for (let index = 1; index <= 8; index += 1) {
  const prefix = String(index).padStart(2, '0')
  const dataFile = fs.readdirSync('data/experience/batches').find((file) => file.startsWith(prefix))
  if (!dataFile) errors.push(`missing experience batch ${prefix}`)
}

const navHrefs = new Set(navigationStateContract.items.map((item) => item.href))
for (const route of requiredRoutes) {
  if (!navHrefs.has(route)) errors.push(`experience route not in primary navigation: ${route}`)
}

const stageRoutes = new Set(stage.routes)
for (const route of requiredRoutes) {
  if (!stageRoutes.has(route)) errors.push(`experience route not in stage routes: ${route}`)
}

if (experienceNodes.length < 8) errors.push('experienceNodes must include at least 8 entries')
if (experienceThemeModes.length !== 4) errors.push('experienceThemeModes must include 4 themes')
if (constellationNodes.length < 6) errors.push('constellationNodes too few')
if (timeRiverEvents.length < 6) errors.push('timeRiverEvents too few')
if (lighthouseSuggestions.some((item) => item.risk === 'high' && !item.status.includes('审计'))) {
  errors.push('high risk lighthouse suggestion must require audit')
}
if (!memoryGraphNodes.some((node) => node.visibility === '私密')) {
  errors.push('memory graph must include private redacted signal')
}
if (!worldNetworkNodes.some((world) => world.kind === 'private' && world.description.includes('脱敏'))) {
  errors.push('world network private node must mention redaction')
}

const sourceFiles = [
  'src/app/page.tsx',
  'src/app/world-map/page.tsx',
  'src/app/constellation/page.tsx',
  'src/app/time-river/page.tsx',
  'src/app/lighthouse/page.tsx',
  'src/app/memory-graph/page.tsx',
  'src/app/theme-system/page.tsx',
  'src/app/v6-world-network/page.tsx',
  'src/components/experience/LighthouseQueue.tsx',
  'src/components/experience/MemoryGraphView.tsx',
]

for (const file of sourceFiles) {
  const source = fs.readFileSync(file, 'utf8')
  if (source.includes('Date.now(')) errors.push(`${file} uses Date.now in render path`)
  if (source.includes('Math.random(')) errors.push(`${file} uses Math.random in render path`)
  if (source.includes('typeof window')) errors.push(`${file} uses typeof window in render path`)
}

const nextAppRoot = '.next/server/app'
if (fs.existsSync(nextAppRoot)) {
  for (const route of requiredRoutes.filter((route) => route !== '/')) {
    const routeDir = `${nextAppRoot}/${route.slice(1)}`
    if (!fs.existsSync(routeDir)) errors.push(`missing build route artifact: ${route}`)
  }
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('Experience realization checks passed.')
