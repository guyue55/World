import batch from '../data/v5/stage-04/14-plugin-install-sandbox.json'

const errors: string[] = []

if (batch.batch !== 14) errors.push('batch number mismatch')
if (batch.stage !== 4) errors.push('stage number mismatch')
if (batch.status !== 'complete') errors.push('batch status must be complete')
if (batch.goals.length < 2) errors.push('goals too few')
if (batch.outputs.length < 1) errors.push('outputs missing')
if (batch.productionLive !== false) errors.push('productionLive must remain false')
if (!batch.moduleBoundary.rule.includes('not src/lib/v5')) errors.push('V5 src/lib rule missing')


if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V5 batch 14 check passed.')
