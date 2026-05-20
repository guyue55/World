import { getV3FinalStatus } from '../src/lib/v3/final'

const status = getV3FinalStatus()
console.log('古月浮屿 V3 Final Status')
console.log(`completedStages=${status.summary.completedStages}`)
console.log(`completedBatches=${status.summary.completedBatches}`)
console.log(`v3Status=${status.summary.v3Status}`)
console.log(`v4PlanningAllowed=${status.summary.v4PlanningAllowed}`)
console.log(`v4DevelopmentRecommended=${status.summary.v4DevelopmentRecommended}`)
console.log(`releaseReady=${status.summary.releaseReady}`)
console.log(`productionLive=${status.summary.productionLive}`)
