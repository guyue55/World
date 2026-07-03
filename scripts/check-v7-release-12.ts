import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(12)
failIfErrors(errors)
console.log('V7 release batch 12 check passed.')
