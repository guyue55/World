import { checkBoundary, failIfErrors } from './check-v8-production-common'

const errors = checkBoundary()
failIfErrors(errors)
console.log('V8 production boundary check passed.')
