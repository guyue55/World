import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(16)
failIfErrors(errors)
console.log('V8 production batch 16 check passed.')
