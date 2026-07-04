import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const requiredFiles = [
  'data/r8-dynamic-world/roadmap.json',
  'data/r8-dynamic-world/interaction-spec.json',
  'src/features/r8-dynamic-world/index.ts',
  'src/features/r8-dynamic-world/data.ts',
  'src/components/r8-dynamic-world/WorldRuntimeProvider.tsx',
  'src/components/r8-dynamic-world/WorldMotionLayer.tsx',
  'src/components/r8-dynamic-world/DynamicWorldHero.tsx',
  'src/components/r8-dynamic-world/DynamicAtlasExplorer.tsx',
  'src/components/r8-dynamic-world/DynamicTimeRiver.tsx',
  'src/components/r8-dynamic-world/NodeOpeningRitual.tsx',
  'src/components/r8-dynamic-world/LighthouseConsole.tsx',
  'src/components/r8-dynamic-world/DynamicWorldAcceptance.tsx',
  'src/components/r8-dynamic-world/index.ts',
  'docs/10-development-history/r8-dynamic-world/r8-1-dynamic-world-plan.md',
]

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)))
if (missing.length > 0) {
  console.error(`R8.1 dynamic world missing files:\n${missing.join('\n')}`)
  process.exit(1)
}

const page = fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8')
const shell = fs.readFileSync(path.join(root, 'src/components/world/WorldShell.tsx'), 'utf8')
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')) as { scripts?: Record<string, string> }

const pageMarkers = [
  'DynamicWorldHero',
  'DynamicAtlasExplorer',
  'DynamicTimeRiver',
  'NodeOpeningRitual',
  'LighthouseConsole',
  'DynamicWorldAcceptance',
]
const missingPageMarkers = pageMarkers.filter((marker) => !page.includes(marker))
if (missingPageMarkers.length > 0) {
  console.error(`R8.1 homepage missing dynamic markers: ${missingPageMarkers.join(', ')}`)
  process.exit(1)
}

const shellMarkers = ['WorldRuntimeProvider', 'WorldMotionLayer', 'WorldRuntimeDock']
const missingShellMarkers = shellMarkers.filter((marker) => !shell.includes(marker))
if (missingShellMarkers.length > 0) {
  console.error(`R8.1 shell missing runtime markers: ${missingShellMarkers.join(', ')}`)
  process.exit(1)
}

for (const scriptName of ['check:r8-dynamic-world:all', 'check:r8-dynamic-world:boundary']) {
  if (!packageJson.scripts?.[scriptName]) {
    console.error(`package.json missing ${scriptName}`)
    process.exit(1)
  }
}

const roadmap = JSON.parse(fs.readFileSync(path.join(root, 'data/r8-dynamic-world/roadmap.json'), 'utf8')) as { stages?: unknown[]; batches?: unknown[] }
const spec = JSON.parse(fs.readFileSync(path.join(root, 'data/r8-dynamic-world/interaction-spec.json'), 'utf8')) as { dynamicSurfaces?: unknown[]; acceptance?: unknown[] }
if (!Array.isArray(roadmap.stages) || roadmap.stages.length !== 4) {
  console.error('R8.1 roadmap must contain 4 stages.')
  process.exit(1)
}
if (!Array.isArray(roadmap.batches) || roadmap.batches.length !== 16) {
  console.error('R8.1 roadmap must contain 16 batches.')
  process.exit(1)
}
if (!Array.isArray(spec.dynamicSurfaces) || spec.dynamicSurfaces.length < 6) {
  console.error('R8.1 interaction spec must contain at least 6 dynamic surfaces.')
  process.exit(1)
}
if (!Array.isArray(spec.acceptance) || spec.acceptance.length < 7) {
  console.error('R8.1 interaction spec must contain at least 7 acceptance items.')
  process.exit(1)
}

console.log('R8.1 dynamic world implementation check passed.')
