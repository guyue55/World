import { checkBatch, failIfErrors } from './check-v9-service-platform-common'

const errors = checkBatch(6)
failIfErrors(errors)
console.log('V9 service platform batch 06 check passed.')
