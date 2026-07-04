import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(2)
failIfErrors(errors)
console.log('V8 production batch 02 check passed.')
