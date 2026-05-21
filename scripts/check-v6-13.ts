import batch from '../data/v6/stage-04/13-agent-society-model.json'

const errors: string[] = []

if (batch.batch !== 13) errors.push('batch number mismatch')
if (batch.stage !== 4) errors.push('stage number mismatch')
if (batch.status !== 'complete') errors.push('batch status must be complete')
if (batch.goals.length < 2) errors.push('goals too few')
if (batch.outputs.length < 1) errors.push('outputs missing')
if (batch.productionLive !== false) errors.push('productionLive must remain false')
if (!batch.moduleBoundary.rule.includes('not src/lib/v6')) errors.push('V6 src/lib rule missing')


if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V6 batch 13 check passed.')
