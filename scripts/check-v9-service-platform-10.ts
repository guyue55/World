import { checkBatch, failIfErrors } from './check-v9-service-platform-common'

const errors = checkBatch(10)
failIfErrors(errors)
console.log('V9 service platform batch 10 check passed.')
