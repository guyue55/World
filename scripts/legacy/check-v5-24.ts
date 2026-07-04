import batch from '../data/v5/stage-06/24-v5-final-closure.json'

const errors: string[] = []

if (batch.batch !== 24) errors.push('batch number mismatch')
if (batch.stage !== 6) errors.push('stage number mismatch')
if (batch.status !== 'complete') errors.push('batch status must be complete')
if (batch.goals.length < 2) errors.push('goals too few')
if (batch.outputs.length < 1) errors.push('outputs missing')
if (batch.productionLive !== false) errors.push('productionLive must remain false')
if (!batch.moduleBoundary.rule.includes('not src/lib/v5')) errors.push('V5 src/lib rule missing')

if (batch.v6PlanningAllowed !== true) errors.push('V6 planning should be allowed')
if (batch.v6FormalDevelopmentAllowed !== false) errors.push('V6 formal development must remain blocked before real evidence')
if (batch.completedBatches !== 24) errors.push('completedBatches must be 24')


if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V5 batch 24 check passed.')
