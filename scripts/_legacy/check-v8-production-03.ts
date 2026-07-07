import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(3)
failIfErrors(errors)
console.log('V8 production batch 03 check passed.')
