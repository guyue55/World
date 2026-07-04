import { checkStage, failIfErrors } from './check-v8-production-common'

const errors = checkStage(1, [1, 2, 3, 4])
failIfErrors(errors)
console.log('V8 production stage 01 check passed.')
