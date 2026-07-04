import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(15)
failIfErrors(errors)
console.log('V7 release batch 15 check passed.')
