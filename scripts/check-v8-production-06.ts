import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(6)
failIfErrors(errors)
console.log('V8 production batch 06 check passed.')
