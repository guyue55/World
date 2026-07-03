import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(5)
failIfErrors(errors)
console.log('V8 production batch 05 check passed.')
