import dashboard from '../data/pre-v4/batch-03-entry-dashboard.json'
import { getPreV4GateStatus } from '../src/lib/pre-v4/gate'

const errors: string[] = []
const status = getPreV4GateStatus()

if (dashboard.dashboardRoute !== '/pre-v4-gate') errors.push('dashboard route mismatch')
if (status.summary.gateGroups < 7) errors.push('gate groups too few')
if (status.summary.v4PlanningAllowed !== true) errors.push('planning should be allowed')
if (status.summary.v4DevelopmentAllowed !== false) errors.push('development should remain blocked')
if (status.summary.releaseReady !== false) errors.push('releaseReady must remain false')
if (status.summary.productionLive !== false) errors.push('productionLive must remain false')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('Pre-V4 entry dashboard check passed.')
