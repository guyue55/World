import { checkStage, failIfErrors } from './check-v8-production-common'

const errors = checkStage(2, [5, 6, 7, 8])
failIfErrors(errors)
console.log('V8 production stage 02 check passed.')
