import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(11)
failIfErrors(errors)
console.log('V8 production batch 11 check passed.')
