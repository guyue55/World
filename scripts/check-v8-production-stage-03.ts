import { checkStage, failIfErrors } from './check-v8-production-common'

const errors = checkStage(3, [9, 10, 11, 12])
failIfErrors(errors)
console.log('V8 production stage 03 check passed.')
