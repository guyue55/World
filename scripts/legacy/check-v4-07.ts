import batch from '../data/v4/stage-02/07-collaboration-review.json'

const errors: string[] = []

if (batch.batch !== 7) errors.push('batch number mismatch')
if (batch.stage !== 2) errors.push('stage number mismatch')
if (batch.status !== 'complete') errors.push('batch status must be complete')
if (batch.goals.length < 2) errors.push('goals too few')
if (batch.outputs.length < 1) errors.push('outputs missing')
if (batch.releaseReady !== false) errors.push('releaseReady must remain false')
if (batch.productionLive !== false) errors.push('productionLive must remain false')
if (!batch.moduleBoundary.rule.includes('not src/lib/v4')) errors.push('V4 src/lib rule missing')


if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V4 batch 07 check passed.')
