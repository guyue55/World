import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const requiredFiles = [
  'data/r8-living-universe/living-universe-plan.json',
  'data/r8-living-universe/living-scenes.json',
  'src/components/r8-living-universe/LivingUniverseField.tsx',
  'src/components/r8-living-universe/LivingAreaIdentity.tsx',
  'src/components/r8-living-universe/UniverseRitualDock.tsx',
  'src/components/r8-living-universe/LivingUniverseSection.tsx',
  'src/components/r8-living-universe/index.ts',
  'docs/10-development-history/r8-living-universe/r8-4-living-universe-plan.md'
]

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')) as { scripts?: Record<string, string> }
const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)))
if (missing.length > 0) {
  throw new Error(`R8.4 missing files: ${missing.join(', ')}`)
}

const scenes = JSON.parse(fs.readFileSync(path.join(root, 'data/r8-living-universe/living-scenes.json'), 'utf8')) as {
  scenes: Array<{ match: string; worldName: string; realName: string; answer: string; near: string[]; mid: string[]; far: string[]; civilization: string[]; next: Array<{ label: string; href: string }> }>
}

const mustHaveRoutes = ['/', '/atlas', '/timeline', '/archive', '/paths', '/ask', '/node', '/r4-creator', '/r7-evolution']
for (const route of mustHaveRoutes) {
  const scene = scenes.scenes.find((item) => item.match === route)
  if (!scene) throw new Error(`R8.4 scene missing route: ${route}`)
  if (!scene.worldName || !scene.realName || !scene.answer) throw new Error(`R8.4 scene lacks identity: ${route}`)
  if (scene.near.length < 3 || scene.mid.length < 3 || scene.far.length < 3) {
    throw new Error(`R8.4 scene lacks three-depth objects: ${route}`)
  }
  if (scene.civilization.length < 3) throw new Error(`R8.4 scene lacks civilization traces: ${route}`)
  if (scene.next.length < 2) throw new Error(`R8.4 scene lacks next gates: ${route}`)
}

const shell = fs.readFileSync(path.join(root, 'src/components/world/WorldShell.tsx'), 'utf8')
for (const token of ['LivingUniverseField', 'LivingAreaIdentity', 'UniverseRitualDock']) {
  if (!shell.includes(token)) throw new Error(`WorldShell does not include ${token}`)
}

for (const scriptName of ['check:r8-living-universe:all', 'check:r8-living-universe:boundary']) {
  if (!packageJson.scripts?.[scriptName]) throw new Error(`package.json missing ${scriptName}`)
}

console.log('R8.4 living universe all check passed.')
