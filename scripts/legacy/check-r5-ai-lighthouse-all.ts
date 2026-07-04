import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors, readJson } from './check-r5-ai-lighthouse-common'

const roadmap = readJson('data/r5-ai-lighthouse/roadmap.json')
const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkBoundary(),
  ...checkRequiredFiles([
    'src/features/r5-ai-lighthouse/index.ts',
    'src/components/r5-ai-lighthouse/index.ts',
    'src/app/r5-lighthouse/page.tsx',
    'docs/10-development-history/r5-ai-lighthouse/r5-quality-gate-report.md',
  ]),
]

if (roadmap.stages.length !== 4) errors.push('R5 roadmap must have 4 stages')
if (roadmap.batches.length !== 16) errors.push('R5 roadmap must have 16 batches')
if (roadmap.productionLive !== false) errors.push('R5 productionLive must remain false')

failIfErrors(errors)
console.log('check:r5-ai-lighthouse:all passed')
