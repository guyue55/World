import gate from '../data/v2-1/stage-04-v3-entry-gate.json'
import './check-v2-1-stage-01'
import './check-v2-1-stage-02'
import './check-v2-1-stage-03'

const errors: string[] = []

if (gate.completedBatches !== 4) errors.push('completedBatches must be 4')
if (gate.completedCapabilities.length < 12) errors.push('completedCapabilities too small')
if (gate.v3PlanningAllowed !== true) errors.push('v3 planning should be allowed')
if (gate.v3DevelopmentRecommended !== false) errors.push('v3 development should not be recommended before real infra')
if (gate.productionLive !== false) errors.push('productionLive must remain false')
if (gate.releaseReady !== false) errors.push('releaseReady must remain false')
if (!gate.externalRealWorkStillRequired.includes('replace in-memory repository with real database')) {
  errors.push('real database remaining work must be explicit')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V2 before V3 gate check passed.')
