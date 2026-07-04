import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(7)
failIfErrors(errors)
console.log('V7 release batch 07 check passed.')
