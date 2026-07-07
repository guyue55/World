import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(12)
failIfErrors(errors)
console.log('V8 production batch 12 check passed.')
