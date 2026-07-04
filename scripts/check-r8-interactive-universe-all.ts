import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const required = [
  'data/r8-interactive-universe/interactive-scenes.json',
  'src/components/r8-interactive-universe/InteractiveUniverseEngine.tsx',
  'src/components/r8-interactive-universe/WorldModeDock.tsx',
  'src/components/r8-interactive-universe/LivingQuestRail.tsx',
  'src/components/r8-interactive-universe/ObservationSearchPanel.tsx',
  'src/components/r8-interactive-universe/InteractiveUniverseSection.tsx',
  'src/app/api/r8/interactive-universe/route.ts',
  'docs/10-development-history/r8-interactive-universe/r8-7-interactive-universe-plan.md',
]

const missing = required.filter((file) => !existsSync(path.join(root, file)))
if (missing.length > 0) {
  throw new Error(`R8.7 missing files: ${missing.join(', ')}`)
}

const data = JSON.parse(readFileSync(path.join(root, 'data/r8-interactive-universe/interactive-scenes.json'), 'utf8')) as { routes: unknown[]; mainlines: unknown[]; principles: unknown[] }
if (!Array.isArray(data.routes) || data.routes.length < 8) throw new Error('R8.7 needs at least 8 interactive routes')
if (!Array.isArray(data.mainlines) || data.mainlines.length < 3) throw new Error('R8.7 needs at least 3 mainlines')
if (!Array.isArray(data.principles) || data.principles.length < 5) throw new Error('R8.7 needs principles')

const shell = readFileSync(path.join(root, 'src/components/world/WorldShell.tsx'), 'utf8')
for (const token of ['InteractiveUniverseEngine', 'WorldModeDock', 'LivingQuestRail', 'ObservationSearchPanel']) {
  if (!shell.includes(token)) throw new Error(`WorldShell missing ${token}`)
}

console.log('R8.7 interactive universe all check passed')
