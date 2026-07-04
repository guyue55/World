import { getV2FinalStatus } from '../src/lib/v2/final'

const status = getV2FinalStatus()
console.log('古月浮屿 V2 Final Status')
console.log(`completedStages=${status.summary.completedStages}`)
console.log(`completedBatches=${status.summary.completedBatches}`)
console.log(`v2Status=${status.summary.v2Status}`)
console.log(`productionStatus=${status.summary.productionStatus}`)
console.log(`releaseReady=${status.summary.releaseReady}`)
console.log(`nextVersion=${status.summary.nextVersion}`)
