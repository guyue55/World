import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors, readJson } from './check-v7-release-common'

const roadmap = readJson('data/v7-release-ops/roadmap.json')
const extensions = readJson('data/v7-release-ops/extension-registry.json')
const cockpit = readJson('data/v7-release-ops/release-cockpit.json')
const evidence = readJson('data/v7-release-ops/evidence-matrix.json')

const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles([
    'src/features/v7-release-ops/data.ts',
    'src/features/v7-release-ops/guards.ts',
    'src/components/v7-release/V7ReleaseHero.tsx',
    'src/components/v7-release/V7StageBoard.tsx',
    'src/components/v7-release/V7ExtensionRegistry.tsx',
    'src/components/v7-release/V7HandoffPanel.tsx',
    'src/app/v7-release/page.tsx',
    'docs/10-development-history/v7-release-ops/v7-round-07-all-tasks-and-extension-plan.md',
    'docs/10-development-history/v7-release-ops/v7-round-07-execution-report.md',
    'docs/10-development-history/v7-release-ops/quality-gates.md',
  ]),
  ...checkBoundary(),
]

if (roadmap.stages.length !== 4) errors.push('V7 roadmap must have 4 stages')
if (roadmap.batches.length !== 16) errors.push('V7 roadmap must have 16 batches')
if (extensions.items.length < 15) errors.push('V7 extension registry too small')
if (cockpit.cards.length < 5) errors.push('V7 cockpit cards too few')
if (evidence.releaseReady !== false) errors.push('V7 evidence releaseReady must be false')

failIfErrors(errors)
console.log('V7 release aggregate check passed.')
