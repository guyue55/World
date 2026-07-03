import { checkRequiredFiles, checkStage, failIfErrors } from './check-r6-service-bridge-common'

failIfErrors([
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkRequiredFiles(['data/r6-service-bridge/audit-events.json', 'data/r6-service-bridge/operation-queue.json', 'data/r6-service-bridge/export-jobs.json', 'src/app/api/r6/audit/route.ts']),
])
console.log('check:r6-service-bridge:stage-03 passed')
