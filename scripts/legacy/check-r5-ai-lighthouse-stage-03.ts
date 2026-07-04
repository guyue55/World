import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors } from './check-r5-ai-lighthouse-common'

failIfErrors([
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkRequiredFiles([
    'data/r5-ai-lighthouse/review-queue.json',
    'data/r5-ai-lighthouse/audit-log.json',
    'src/features/r5-ai-lighthouse/guards.ts',
    'src/components/r5-ai-lighthouse/R5ReviewQueuePanel.tsx',
  ]),
  ...checkBoundary(),
])
console.log('check:r5-ai-lighthouse:stage-03 passed')
