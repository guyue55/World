import { checkStage, failIfErrors } from './check-v10-intelligent-world-common'

const errors = checkStage(1, [1, 2, 3, 4])
failIfErrors(errors)
console.log('V10 intelligent world stage 01 check passed.')
