
import { checkBoundary, failIfErrors } from './check-r3-content-life-common'

failIfErrors(checkBoundary())
console.log('R3 content life boundary check passed.')
