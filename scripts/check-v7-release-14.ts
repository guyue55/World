import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(14)
failIfErrors(errors)
console.log('V7 release batch 14 check passed.')
