
import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors, readJson } from './check-r3-content-life-common'

const roadmap = readJson('data/r3-content-life/roadmap.json')
const nodes = readJson('data/r3-content-life/world-nodes.json')
const paths = readJson('data/r3-content-life/content-paths.json')
const density = readJson('data/r3-content-life/area-density.json')
const extensions = readJson('data/r3-content-life/extension-registry.json')

const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles([
    'src/features/r3-content-life/index.ts',
    'src/features/r3-content-life/guards.ts',
    'src/components/r3-content-life/R3ContentLifeHero.tsx',
    'src/components/r3-content-life/R3NodeConstellation.tsx',
    'src/app/r3-content-life/page.tsx',
    'docs/10-development-history/r3-content-life/r3-all-tasks-and-extension-plan.md',
    'docs/10-development-history/r3-content-life/r3-execution-report.md',
    'docs/10-development-history/r3-content-life/handoff-to-r4.md',
  ]),
  ...checkBoundary(),
]

if (roadmap.stages.length !== 4) errors.push('R3 roadmap must have 4 stages')
if (roadmap.batches.length !== 16) errors.push('R3 roadmap must have 16 batches')
if (nodes.nodes.length < 30) errors.push('R3 node inventory too small')
if (paths.paths.length < 5) errors.push('R3 path inventory too small')
if (density.areas.length < 7) errors.push('R3 area density must keep 7 trunk areas')
if (extensions.items.length < 10) errors.push('R3 extension registry too small')
if (roadmap.productionLive !== false) errors.push('R3 must not set productionLive true')

failIfErrors(errors)
console.log('R3 content life aggregate check passed.')
