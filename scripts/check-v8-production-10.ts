import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(10)
failIfErrors(errors)
console.log('V8 production batch 10 check passed.')
