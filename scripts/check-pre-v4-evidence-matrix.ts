import matrix from '../data/pre-v4/batch-01-evidence-matrix.json'

const errors: string[] = []

if (matrix.requiredEvidence.length < 8) errors.push('requiredEvidence too small')
if (!matrix.notSatisfied.includes('real production database')) errors.push('real database gap must remain explicit')
if (matrix.v4PlanningAllowed !== true) errors.push('V4 planning should be allowed')
if (matrix.v4DevelopmentAllowed !== false) errors.push('V4 formal development must remain blocked')
if (matrix.releaseReady !== false) errors.push('releaseReady must remain false')
if (matrix.productionLive !== false) errors.push('productionLive must remain false')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('Pre-V4 evidence matrix check passed.')
