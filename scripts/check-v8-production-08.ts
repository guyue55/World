import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(8)
failIfErrors(errors)
console.log('V8 production batch 08 check passed.')
