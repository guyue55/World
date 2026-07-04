import { checkRequiredFiles, checkStage, failIfErrors } from './check-r6-service-bridge-common'

failIfErrors([
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkRequiredFiles(['data/r6-service-bridge/identity-rbac.json', 'data/r6-service-bridge/api-contracts.json', 'src/app/r6-service/page.tsx', 'src/components/r6-service-bridge/R6ServiceHero.tsx']),
])
console.log('check:r6-service-bridge:stage-01 passed')
