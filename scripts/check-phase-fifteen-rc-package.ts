import fs from 'node:fs'
import path from 'node:path'
import phaseFifteenBlockerClosurePlan from '../data/phase-fifteen-blocker-closure-plan.json'
import rcEvidencePackageChecklist from '../data/rc-evidence-package-checklist.json'
import releaseCandidateManifest from '../data/release-candidate-manifest.json'
import releaseCandidatePlan from '../data/release-candidate-plan.json'
import releaseReadinessTransitionGate from '../data/release-readiness-transition-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (phaseFifteenBlockerClosurePlan.blockerClosureReady !== false) errors.push('blockerClosureReady must remain false')
  if (phaseFifteenBlockerClosurePlan.blockers.length < 4) errors.push('blockers too few')
  if (phaseFifteenBlockerClosurePlan.blockers.some((blocker) => blocker.status === 'closed')) {
    errors.push('blockers must not be pre-closed')
  }
  if (rcEvidencePackageChecklist.rcEvidencePackageReady !== false) errors.push('rcEvidencePackageReady must remain false')
  if (rcEvidencePackageChecklist.sections.length < 8) errors.push('RC evidence sections too few')
  if (rcEvidencePackageChecklist.sections.every((section) => section.status === 'complete' || section.status === 'passed')) {
    errors.push('RC evidence package must not be complete yet')
  }
  if (releaseCandidateManifest.releaseCandidateReady !== false) errors.push('releaseCandidateReady must remain false')
  if (releaseCandidateManifest.packageGenerated !== false) errors.push('packageGenerated must remain false')
  if (releaseCandidatePlan.releaseCandidateReady !== false) errors.push('releaseCandidatePlan must remain false')
  if (releaseReadinessTransitionGate.releaseReady !== false) errors.push('releaseReady must remain false')
  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-fifteen-rc-package']) errors.push('package missing check:phase-fifteen-rc-package')
  if (!pkg.scripts['phase-fifteen-rc-package:print']) errors.push('package missing phase-fifteen-rc-package:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase fifteen RC package check passed.')
}

main()
