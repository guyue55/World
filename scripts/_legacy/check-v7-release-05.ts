import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(5)
failIfErrors(errors)
console.log('V7 release batch 05 check passed.')
