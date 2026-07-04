import { checkRequiredFiles, checkStage, failIfErrors } from './check-r6-service-bridge-common'

failIfErrors([
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkRequiredFiles(['data/r6-service-bridge/storage-ports.json', 'src/app/api/r6/service-health/route.ts', 'src/app/api/r6/nodes/route.ts', 'src/features/r6-service-bridge/data.ts']),
])
console.log('check:r6-service-bridge:stage-02 passed')
