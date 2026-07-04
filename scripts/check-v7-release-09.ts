import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(9)
failIfErrors(errors)
console.log('V7 release batch 09 check passed.')
