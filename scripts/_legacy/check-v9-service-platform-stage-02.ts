import { checkStage, failIfErrors } from './check-v9-service-platform-common'

const errors = checkStage(2, [5, 6, 7, 8])
failIfErrors(errors)
console.log('V9 service platform stage 02 check passed.')
