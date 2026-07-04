import { checkBoundary, failIfErrors } from './check-r1-production-common'

failIfErrors(checkBoundary())
console.log('R1 production boundary check passed.')
