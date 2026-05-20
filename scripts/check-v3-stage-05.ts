import finalReport from '../data/v3/v3-final-closure-report.json'
import gap from '../data/v3/stage-05/18-v3-security-hardening-gap.json'
import sustainability from '../data/v3/stage-05/17-v3-sustainability-cost-boundary.json'
import v4Entry from '../data/v3/stage-05/19-v4-entry-scope-candidate.json'
import v4Gate from '../data/v3/stage-05/20-v3-final-v4-gate.json'

const errors: string[] = []

if (!sustainability.costRules.includes('no always-on expensive agents')) errors.push('expensive agent cost guard missing')
if (!gap.blockers.includes('no staging smoke proof')) errors.push('staging smoke blocker missing')
if (!v4Entry.entryConditions.includes('accessibility proof')) errors.push('accessibility proof entry condition missing')
if (v4Gate.v4PlanningAllowed !== true) errors.push('V4 planning should be allowed')
if (v4Gate.v4DevelopmentRecommended !== false) errors.push('V4 development should not be recommended')
if (finalReport.completedStages !== 5) errors.push('completedStages must be 5')
if (finalReport.completedBatches !== 20) errors.push('completedBatches must be 20')
if (finalReport.releaseReady !== false) errors.push('releaseReady must remain false')
if (finalReport.productionLive !== false) errors.push('productionLive must remain false')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V3 stage 05 check passed.')
