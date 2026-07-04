import { checkBatch, failIfErrors } from './check-v9-service-platform-common'

const errors = checkBatch(9)
failIfErrors(errors)
console.log('V9 service platform batch 09 check passed.')
