import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(8)
failIfErrors(errors)
console.log('V7 release batch 08 check passed.')
