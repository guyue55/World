import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors } from './check-r5-ai-lighthouse-common'

failIfErrors([
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles([
    'data/r5-ai-lighthouse/r6-handoff.json',
    'docs/10-development-history/r5-ai-lighthouse/r5-round-plan.md',
    'docs/10-development-history/r5-ai-lighthouse/r5-to-r6-handoff.md',
    'scripts/run-r5-ai-lighthouse-build.mjs',
  ]),
  ...checkBoundary(),
])
console.log('check:r5-ai-lighthouse:stage-04 passed')
