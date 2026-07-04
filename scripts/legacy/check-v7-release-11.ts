import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(11)
failIfErrors(errors)
console.log('V7 release batch 11 check passed.')
