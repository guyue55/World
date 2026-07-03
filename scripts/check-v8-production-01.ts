import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(1)
failIfErrors(errors)
console.log('V8 production batch 01 check passed.')
