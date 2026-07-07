import gate from '../data/v2-1/stage-04-v3-entry-gate.json'

console.log(gate.name)
console.log(`stageProgress=${gate.stageProgress}`)
console.log(`completedBatches=${gate.completedBatches}`)
console.log(`completedCapabilities=${gate.completedCapabilities.length}`)
console.log(`v2BeforeV3Status=${gate.v2BeforeV3Status}`)
console.log(`v3PlanningAllowed=${gate.v3PlanningAllowed}`)
console.log(`v3DevelopmentRecommended=${gate.v3DevelopmentRecommended}`)
console.log(`releaseReady=${gate.releaseReady}`)
console.log(`productionLive=${gate.productionLive}`)
console.log(`externalRealWorkStillRequired=${gate.externalRealWorkStillRequired.length}`)
