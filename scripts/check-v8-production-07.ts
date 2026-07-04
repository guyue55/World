import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(7)
failIfErrors(errors)
console.log('V8 production batch 07 check passed.')
