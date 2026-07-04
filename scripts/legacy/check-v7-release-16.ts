import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(16)
failIfErrors(errors)
console.log('V7 release batch 16 check passed.')
