import { checkBatch, failIfErrors } from './check-v7-release-common'

const errors = checkBatch(6)
failIfErrors(errors)
console.log('V7 release batch 06 check passed.')
