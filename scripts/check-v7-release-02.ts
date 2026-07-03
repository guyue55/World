import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(2)
failIfErrors(errors)
console.log('V7 release batch 02 check passed.')
