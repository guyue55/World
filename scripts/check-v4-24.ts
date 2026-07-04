import batch from '../data/v4/stage-06/24-v4-final-v5-entry.json'

const errors: string[] = []

if (batch.batch !== 24) errors.push('batch number mismatch')
if (batch.stage !== 6) errors.push('stage number mismatch')
if (batch.status !== 'complete') errors.push('batch status must be complete')
if (batch.goals.length < 2) errors.push('goals too few')
if (batch.outputs.length < 1) errors.push('outputs missing')
if (batch.releaseReady !== false) errors.push('releaseReady must remain false')
if (batch.productionLive !== false) errors.push('productionLive must remain false')
if (!batch.moduleBoundary.rule.includes('not src/lib/v4')) errors.push('V4 src/lib rule missing')

if (batch.v5PlanningAllowed !== true) errors.push('V5 planning should be allowed')
if (batch.v5FormalDevelopmentAllowed !== false) errors.push('V5 formal development must remain blocked')
if (batch.completedBatches !== 24) errors.push('completedBatches must be 24')


if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V4 batch 24 check passed.')
