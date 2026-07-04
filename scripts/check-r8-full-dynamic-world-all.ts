import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const requiredFiles = [
  'data/r8-full-dynamic-world/dynamic-world-plan.json',
  'data/r8-full-dynamic-world/route-scenes.json',
  'data/r8-full-dynamic-world/dynamic-actions.json',
  'src/components/r8-full-dynamic-world/FullUniverseOrchestrator.tsx',
  'src/components/r8-full-dynamic-world/LivingWorldViewport.tsx',
  'src/components/r8-full-dynamic-world/DynamicScenePrelude.tsx',
  'src/components/r8-full-dynamic-world/WorldModeSwitcher.tsx',
  'src/components/r8-full-dynamic-world/WorldActionRituals.tsx',
  'src/components/r8-full-dynamic-world/index.ts',
  'src/app/api/r8/dynamic-world/route.ts',
  'docs/10-development-history/r8-full-dynamic-world/r8-3-full-dynamic-world-plan.md',
]

const pageFiles = [
  'src/app/page.tsx',
  'src/app/about/page.tsx',
  'src/app/manifesto/page.tsx',
  'src/app/world/page.tsx',
  'src/app/world-map/page.tsx',
  'src/app/time-river/page.tsx',
  'src/app/lighthouse/page.tsx',
  'src/app/r4-creator/page.tsx',
  'src/app/r6-service/page.tsx',
  'src/app/r7-evolution/page.tsx',
  'src/app/r8-public/page.tsx',
  'src/app/status/page.tsx',
]

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8')) as T
}

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)))
if (missing.length) {
  console.error(`R8.3 missing files:\n${missing.join('\n')}`)
  process.exit(1)
}

const plan = readJson<{ version: string; stages: unknown[]; mustDynamicRoutes: string[] }>('data/r8-full-dynamic-world/dynamic-world-plan.json')
if (plan.version !== 'R8.3') throw new Error('R8.3 plan version mismatch')
if (plan.stages.length !== 4) throw new Error('R8.3 must have 4 stages')
if (plan.mustDynamicRoutes.length < 16) throw new Error('R8.3 must cover broad dynamic routes')

const scenes = readJson<{ scenes: { match: string; objects: string[] }[] }>('data/r8-full-dynamic-world/route-scenes.json')
if (scenes.scenes.length < 16) throw new Error('R8.3 scene registry is too small')
scenes.scenes.forEach((scene) => {
  if (!scene.match || scene.objects.length < 3) throw new Error(`Invalid scene ${scene.match}`)
})

pageFiles.forEach((file) => {
  const source = fs.readFileSync(path.join(root, file), 'utf8')
  if (!source.includes('@/components/r8-full-dynamic-world') && file !== 'src/app/page.tsx') {
    throw new Error(`${file} is not connected to R8.3 dynamic world components`)
  }
})

const shell = fs.readFileSync(path.join(root, 'src/components/world/WorldShell.tsx'), 'utf8')
for (const token of ['FullUniverseOrchestrator', 'LivingWorldViewport']) {
  if (!shell.includes(token)) throw new Error(`WorldShell missing ${token}`)
}

console.log('R8.3 full dynamic world all check passed')
