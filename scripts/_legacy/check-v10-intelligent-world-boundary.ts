import { checkBoundary, failIfErrors } from './check-v10-intelligent-world-common'

const errors = checkBoundary()
failIfErrors(errors)
console.log('V10 intelligent world boundary check passed.')
