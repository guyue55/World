import batch from '../data/v6/stage-06/21-open-world-protocol.json'

const errors: string[] = []

if (batch.batch !== 21) errors.push('batch number mismatch')
if (batch.stage !== 6) errors.push('stage number mismatch')
if (batch.status !== 'complete') errors.push('batch status must be complete')
if (batch.goals.length < 2) errors.push('goals too few')
if (batch.outputs.length < 1) errors.push('outputs missing')
if (batch.productionLive !== false) errors.push('productionLive must remain false')
if (!batch.moduleBoundary.rule.includes('not src/lib/v6')) errors.push('V6 src/lib rule missing')


if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V6 batch 21 check passed.')
