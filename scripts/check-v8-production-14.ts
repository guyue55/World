import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(14)
failIfErrors(errors)
console.log('V8 production batch 14 check passed.')
