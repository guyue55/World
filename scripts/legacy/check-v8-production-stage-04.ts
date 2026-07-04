import { checkStage, failIfErrors } from './check-v8-production-common'

const errors = checkStage(4, [13, 14, 15, 16])
failIfErrors(errors)
console.log('V8 production stage 04 check passed.')
