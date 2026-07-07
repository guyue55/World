import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(15)
failIfErrors(errors)
console.log('V8 production batch 15 check passed.')
