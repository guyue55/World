import { checkStage, failIfErrors } from './check-v10-intelligent-world-common'

const errors = checkStage(4, [13, 14, 15, 16])
failIfErrors(errors)
console.log('V10 intelligent world stage 04 check passed.')
