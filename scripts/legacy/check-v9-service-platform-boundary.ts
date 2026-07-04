import { checkBoundary, failIfErrors } from './check-v9-service-platform-common'

const errors = checkBoundary()
failIfErrors(errors)
console.log('V9 service platform boundary check passed.')
