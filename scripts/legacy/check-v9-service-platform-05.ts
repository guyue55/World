import { checkBatch, failIfErrors } from './check-v9-service-platform-common'

const errors = checkBatch(5)
failIfErrors(errors)
console.log('V9 service platform batch 05 check passed.')
