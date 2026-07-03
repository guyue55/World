import { checkRequiredFiles, checkStage, failIfErrors } from './check-r6-service-bridge-common'

failIfErrors([
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles(['data/r6-service-bridge/privacy-boundary.json', 'data/r6-service-bridge/r7-handoff.json', 'scripts/check-r6-service-bridge-boundary.ts', 'docs/10-development-history/r6-service-bridge/final-report.md']),
])
console.log('check:r6-service-bridge:stage-04 passed')
