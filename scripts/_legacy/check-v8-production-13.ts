import { checkBatch, failIfErrors } from './check-v8-production-common'

const errors = checkBatch(13)
failIfErrors(errors)
console.log('V8 production batch 13 check passed.')
