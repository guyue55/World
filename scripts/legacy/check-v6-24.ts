import batch from '../data/v6/stage-06/24-v6-final-closure.json'

const errors: string[] = []

if (batch.batch !== 24) errors.push('batch number mismatch')
if (batch.stage !== 6) errors.push('stage number mismatch')
if (batch.status !== 'complete') errors.push('batch status must be complete')
if (batch.goals.length < 2) errors.push('goals too few')
if (batch.outputs.length < 1) errors.push('outputs missing')
if (batch.productionLive !== false) errors.push('productionLive must remain false')
if (!batch.moduleBoundary.rule.includes('not src/lib/v6')) errors.push('V6 src/lib rule missing')

if (batch.v7PlanningAllowed !== true) errors.push('V7 planning should be allowed')
if (batch.completedBatches !== 24) errors.push('completedBatches must be 24')

const hasLocalEvidence =
  batch.localEngineeringReady === true &&
  batch.releaseReady === true &&
  batch.buildStatus === 'passed-87-of-87-static-pages'

if (hasLocalEvidence && batch.v7FormalDevelopmentAllowed !== true) {
  errors.push('V7 formal development should be allowed after V6 local engineering evidence')
}

if (!hasLocalEvidence && batch.v7FormalDevelopmentAllowed !== false) {
  errors.push('V7 formal development must remain blocked before real V6 evidence')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V6 batch 24 check passed.')
