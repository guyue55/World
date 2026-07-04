import { checkBatch, failIfErrors } from './check-v10-intelligent-world-common'

const errors = checkBatch(13)
failIfErrors(errors)
console.log('V10 intelligent world batch 13 check passed.')
