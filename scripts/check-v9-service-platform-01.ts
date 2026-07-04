import { checkBatch, failIfErrors } from './check-v9-service-platform-common'

const errors = checkBatch(1)
failIfErrors(errors)
console.log('V9 service platform batch 01 check passed.')
