import { checkBoundary, failIfErrors } from './check-r4-creator-workbench-common'

failIfErrors(checkBoundary())
console.log('R4 creator workbench boundary check passed.')
