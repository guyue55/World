import { checkStage, failIfErrors } from './check-v10-intelligent-world-common'

const errors = checkStage(3, [9, 10, 11, 12])
failIfErrors(errors)
console.log('V10 intelligent world stage 03 check passed.')
