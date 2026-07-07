import batch from '../data/v4/stage-06/21-platform-governance-center.json'

const errors: string[] = []

if (batch.batch !== 21) errors.push('batch number mismatch')
if (batch.stage !== 6) errors.push('stage number mismatch')
if (batch.status !== 'complete') errors.push('batch status must be complete')
if (batch.goals.length < 2) errors.push('goals too few')
if (batch.outputs.length < 1) errors.push('outputs missing')
if (batch.releaseReady !== false) errors.push('releaseReady must remain false')
if (batch.productionLive !== false) errors.push('productionLive must remain false')
if (!batch.moduleBoundary.rule.includes('not src/lib/v4')) errors.push('V4 src/lib rule missing')


if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V4 batch 21 check passed.')
