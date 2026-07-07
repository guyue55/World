import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(10)
failIfErrors(errors)
console.log('V7 release batch 10 check passed.')
