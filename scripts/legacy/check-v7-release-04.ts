import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(4)
failIfErrors(errors)
console.log('V7 release batch 04 check passed.')
