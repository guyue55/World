import { checkStage, failIfErrors } from './check-v9-service-platform-common'

const errors = checkStage(3, [9, 10, 11, 12])
failIfErrors(errors)
console.log('V9 service platform stage 03 check passed.')
