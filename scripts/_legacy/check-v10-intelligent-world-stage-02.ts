import { checkStage, failIfErrors } from './check-v10-intelligent-world-common'

const errors = checkStage(2, [5, 6, 7, 8])
failIfErrors(errors)
console.log('V10 intelligent world stage 02 check passed.')
