import deployment from '../data/v2/stage-05/17-v2-deployment-environments.json'
import finalReport from '../data/v2/stage-05/20-v2-final-report.json'
import migration from '../data/v2/stage-05/19-v2-v1-migration-compatibility.json'
import observability from '../data/v2/stage-05/18-v2-observability-backup.json'
import roadmap from '../data/v2/v2-roadmap-summary.json'

const errors: string[] = []

if (!deployment.environments.includes('production')) errors.push('production environment missing')
if (!deployment.releaseRules.includes('manual signoff required')) errors.push('manual signoff rule missing')
if (observability.signals.length < 7) errors.push('observability signals too few')
if (!migration.compatibilityRules.includes('no private auto-migration')) errors.push('private migration safety missing')
if (finalReport.decision !== 'v2-structure-complete-v2-1-planning-allowed-real-implementation-pending') {
  errors.push('V2 final decision mismatch')
}
if (roadmap.completedStages !== 5) errors.push('completedStages must be 5')
if (roadmap.completedBatches !== 20) errors.push('completedBatches must be 20')
if (roadmap.releaseReady !== false) errors.push('releaseReady must remain false')
if (roadmap.nextVersion !== 'V2.1') errors.push('next version mismatch')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V2 stage 05 check passed.')
