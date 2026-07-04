import { checkStage, failIfErrors } from './check-v9-service-platform-common'

const errors = checkStage(4, [13, 14, 15, 16])
failIfErrors(errors)
console.log('V9 service platform stage 04 check passed.')
