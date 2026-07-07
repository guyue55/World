import finalClosure from '../data/pre-v4/batch-04-final-closure.json'

const errors: string[] = []

if (finalClosure.completedBatches !== 4) errors.push('completedBatches must be 4')
if (finalClosure.completedCapabilities.length < 6) errors.push('completedCapabilities too few')
if (finalClosure.v4PlanningAllowed !== true) errors.push('V4 planning should be allowed')
if (finalClosure.v4FormalDevelopmentAllowed !== false) errors.push('V4 formal development must remain blocked')
if (finalClosure.v4DevelopmentRecommended !== false) errors.push('V4 development should not be recommended')
if (finalClosure.releaseReady !== false) errors.push('releaseReady must remain false')
if (finalClosure.productionLive !== false) errors.push('productionLive must remain false')
if (!finalClosure.remainingExternalWork.includes('fix tsx Permission denied in executable environment')) {
  errors.push('tsx permission remaining work must be explicit')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('Pre-V4 final closure check passed.')
