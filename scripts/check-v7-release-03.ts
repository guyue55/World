import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(3)
failIfErrors(errors)
console.log('V7 release batch 03 check passed.')
