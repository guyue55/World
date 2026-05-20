import finalReport from '../data/v4/v4-final-closure-report.json'

console.log(finalReport.name)
console.log(`completedStages=${finalReport.completedStages}`)
console.log(`completedBatches=${finalReport.completedBatches}`)
console.log(`v4Status=${finalReport.v4Status}`)
console.log(`v5PlanningAllowed=${finalReport.v5PlanningAllowed}`)
console.log(`v5FormalDevelopmentAllowed=${finalReport.v5FormalDevelopmentAllowed}`)
console.log(`releaseReady=${finalReport.releaseReady}`)
console.log(`productionLive=${finalReport.productionLive}`)
