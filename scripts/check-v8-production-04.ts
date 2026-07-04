import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(4)
failIfErrors(errors)
console.log('V8 production batch 04 check passed.')
