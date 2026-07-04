import finalClosure from '../data/pre-v4/batch-04-final-closure.json'

console.log(finalClosure.name)
console.log(`stageProgress=${finalClosure.stageProgress}`)
console.log(`completedBatches=${finalClosure.completedBatches}`)
console.log(`completedCapabilities=${finalClosure.completedCapabilities.length}`)
console.log(`v4PlanningAllowed=${finalClosure.v4PlanningAllowed}`)
console.log(`v4FormalDevelopmentAllowed=${finalClosure.v4FormalDevelopmentAllowed}`)
console.log(`releaseReady=${finalClosure.releaseReady}`)
console.log(`productionLive=${finalClosure.productionLive}`)
console.log(`finalDecision=${finalClosure.finalDecision}`)
