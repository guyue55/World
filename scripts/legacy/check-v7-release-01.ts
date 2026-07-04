import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(1)
failIfErrors(errors)
console.log('V7 release batch 01 check passed.')
