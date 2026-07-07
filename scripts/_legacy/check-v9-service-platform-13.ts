import { checkBatch, failIfErrors } from './check-v9-service-platform-common'

const errors = checkBatch(13)
failIfErrors(errors)
console.log('V9 service platform batch 13 check passed.')
