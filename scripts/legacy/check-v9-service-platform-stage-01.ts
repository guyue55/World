import { checkStage, failIfErrors } from './check-v9-service-platform-common'

const errors = checkStage(1, [1, 2, 3, 4])
failIfErrors(errors)
console.log('V9 service platform stage 01 check passed.')
