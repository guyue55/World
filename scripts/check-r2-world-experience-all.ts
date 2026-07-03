import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors, readJson } from './check-r2-world-experience-common'

const roadmap = readJson('data/r2-world-experience/roadmap.json')
const extensions = readJson('data/r2-world-experience/extension-registry.json')
const passports = readJson('data/r2-world-experience/area-passports.json')
const anchors = readJson('data/r2-world-experience/compass-anchors.json')
const modes = readJson('data/r2-world-experience/mode-switching.json')

const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles([
    'src/features/r2-world-experience/data.ts',
    'src/features/r2-world-experience/guards.ts',
    'src/components/r2-world-entry/WorldEntryHero.tsx',
    'src/components/r2-world-entry/WorldAtlasGateway.tsx',
    'src/components/r2-world-entry/WorldCompassGuide.tsx',
    'src/components/r2-world-entry/AreaPassportGrid.tsx',
    'src/app/r2-world/page.tsx',
    'docs/10-development-history/r2-world-experience/r2-all-tasks-and-extension-plan.md',
    'docs/10-development-history/r2-world-experience/r2-execution-report.md',
    'docs/10-development-history/r2-world-experience/handoff-to-r3.md',
  ]),
  ...checkBoundary(),
]

if (roadmap.stages.length !== 4) errors.push('R2 roadmap must have 4 stages')
if (roadmap.batches.length !== 16) errors.push('R2 roadmap must have 16 batches')
if (extensions.items.length < 12) errors.push('R2 extension registry too small')
if (passports.areas.length < 7) errors.push('R2 area passport matrix too small')
if (anchors.anchors.length !== 7) errors.push('R2 compass must keep exactly 7 anchors')
if (modes.modes.length < 3) errors.push('R2 must include world/reality/reading modes')
if (roadmap.productionLive !== false) errors.push('R2 must not set productionLive true')

failIfErrors(errors)
console.log('R2 world experience aggregate check passed.')
