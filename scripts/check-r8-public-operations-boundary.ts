import { checkBoundary, failIfErrors } from './check-r8-public-operations-common'

failIfErrors(checkBoundary())
console.log('check:r8-public-operations:boundary passed')
