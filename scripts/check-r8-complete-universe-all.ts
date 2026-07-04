import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const requiredFiles = [
  'data/r8-complete-universe/complete-universe-plan.json',
  'data/r8-complete-universe/complete-scenes.json',
  'data/r8-complete-universe/complete-rituals.json',
  'src/components/r8-complete-universe/CompleteUniverseEngine.tsx',
  'src/components/r8-complete-universe/UniverseObjectConstellation.tsx',
  'src/components/r8-complete-universe/TodayWorldPanel.tsx',
  'src/components/r8-complete-universe/CompleteUniverseSection.tsx',
  'src/components/r8-complete-universe/index.ts',
  'src/app/api/r8/complete-universe/route.ts',
  'docs/10-development-history/r8-complete-universe/r8-5-complete-universe-plan.md',
]

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)))
if (missing.length > 0) throw new Error(`R8.5 missing files: ${missing.join(', ')}`)

const scenes = JSON.parse(fs.readFileSync(path.join(root, 'data/r8-complete-universe/complete-scenes.json'), 'utf8')) as {
  scenes: Array<{ match: string; title: string; realName: string; seasonalMood: string; objects: string[]; rituals: string[]; worldState: string; next: Array<{ label: string; href: string }> }>
}

const mustHaveRoutes = ['/', '/atlas', '/timeline', '/archive', '/paths', '/ask', '/node', '/r4-creator', '/r7-evolution', '/r8-public']
for (const route of mustHaveRoutes) {
  const scene = scenes.scenes.find((item) => item.match === route)
  if (!scene) throw new Error(`R8.5 scene missing route: ${route}`)
  if (!scene.title || !scene.realName || !scene.seasonalMood || !scene.worldState) throw new Error(`R8.5 scene lacks explanation: ${route}`)
  if (scene.objects.length < 6) throw new Error(`R8.5 scene lacks world objects: ${route}`)
  if (scene.rituals.length < 4) throw new Error(`R8.5 scene lacks rituals: ${route}`)
  if (scene.next.length < 3) throw new Error(`R8.5 scene lacks next paths: ${route}`)
}

const shell = fs.readFileSync(path.join(root, 'src/components/world/WorldShell.tsx'), 'utf8')
for (const token of ['CompleteUniverseEngine', 'UniverseObjectConstellation']) {
  if (!shell.includes(token)) throw new Error(`WorldShell does not include ${token}`)
}

const corePages = ['src/app/page.tsx', 'src/app/atlas/page.tsx', 'src/app/timeline/page.tsx', 'src/app/archive/page.tsx', 'src/app/paths/page.tsx', 'src/app/ask/page.tsx', 'src/app/node/[slug]/page.tsx']
for (const file of corePages) {
  const content = fs.readFileSync(path.join(root, file), 'utf8')
  if (!content.includes('CompleteUniverseSection')) throw new Error(`R8.5 section missing in ${file}`)
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')) as { scripts?: Record<string, string> }
for (const script of ['check:r8-complete-universe:all', 'check:r8-complete-universe:boundary']) {
  if (!packageJson.scripts?.[script]) throw new Error(`package.json missing ${script}`)
}

console.log('R8.5 complete universe all check passed.')
