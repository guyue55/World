import { checkBoundary, failIfErrors } from './check-r6-service-bridge-common'

failIfErrors(checkBoundary())
console.log('check:r6-service-bridge:boundary passed')
