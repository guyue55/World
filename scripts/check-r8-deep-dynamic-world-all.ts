import fs from 'node:fs'
import path from 'node:path'

const required = [
  'data/r8-deep-dynamic-world/plan.json',
  'data/r8-deep-dynamic-world/page-matrix.json',
  'src/features/r8-deep-dynamic-world/index.ts',
  'src/components/r8-deep-dynamic-world/UniverseStage.tsx',
  'src/components/r8-deep-dynamic-world/WorldRouteTransition.tsx',
  'src/components/r8-deep-dynamic-world/DynamicCompassOverlay.tsx',
  'src/components/r8-deep-dynamic-world/WorldPulseRibbon.tsx',
  'src/components/r8-deep-dynamic-world/DeepAtlasUniverse.tsx',
  'src/components/r8-deep-dynamic-world/DeepTimelineUniverse.tsx',
  'src/components/r8-deep-dynamic-world/DeepArchiveObservatory.tsx',
  'src/components/r8-deep-dynamic-world/DeepPathNavigator.tsx',
  'src/components/r8-deep-dynamic-world/DeepLighthouseSimulator.tsx',
  'src/components/r8-deep-dynamic-world/ImmersiveNodeReader.tsx',
  'docs/10-development-history/r8-deep-dynamic-world/r8-2-deep-dynamic-world-plan.md',
]

const missing = required.filter((item) => !fs.existsSync(path.join(process.cwd(), item)))
if (missing.length > 0) {
  console.error(`Missing R8.2 dynamic world files:\n${missing.join('\n')}`)
  process.exit(1)
}

const shell = fs.readFileSync(path.join(process.cwd(), 'src/components/world/WorldShell.tsx'), 'utf8')
for (const token of ['UniverseStage', 'WorldRouteTransition', 'DynamicCompassOverlay', 'WorldPulseRibbon']) {
  if (!shell.includes(token)) {
    console.error(`WorldShell missing ${token}`)
    process.exit(1)
  }
}

const pages = [
  ['src/app/atlas/page.tsx', 'DeepAtlasUniverse'],
  ['src/app/timeline/page.tsx', 'DeepTimelineUniverse'],
  ['src/app/archive/page.tsx', 'DeepArchiveObservatory'],
  ['src/app/paths/page.tsx', 'DeepPathNavigator'],
  ['src/app/ask/page.tsx', 'DeepLighthouseSimulator'],
  ['src/app/node/[slug]/page.tsx', 'ImmersiveNodeReader'],
]
for (const [file, token] of pages) {
  const source = fs.readFileSync(path.join(process.cwd(), file), 'utf8')
  if (!source.includes(token)) {
    console.error(`${file} missing ${token}`)
    process.exit(1)
  }
}

console.log('R8.2 deep dynamic world check passed.')
