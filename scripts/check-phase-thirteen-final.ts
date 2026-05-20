import fs from 'node:fs'
import path from 'node:path'
import dependencyBuildEvidenceMatrix from '../data/dependency-build-evidence-matrix.json'
import deploymentHardeningPlan from '../data/deployment-hardening-plan.json'
import identityRbacAuditProofPlan from '../data/identity-rbac-audit-proof-plan.json'
import phaseFourteenEntryGate from '../data/phase-fourteen-entry-gate.json'
import phaseThirteenHardeningFinalReport from '../data/phase-thirteen-hardening-final-report.json'
import realServiceAdapterImplementationPlan from '../data/real-service-adapter-implementation-plan.json'
import releaseEvidencePackagePlan from '../data/release-evidence-package-plan.json'
import releaseReadinessTransitionGate from '../data/release-readiness-transition-gate.json'
import securityBaselineImplementationPlan from '../data/security-baseline-implementation-plan.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (phaseThirteenHardeningFinalReport.completedBatches.length !== 4) {
    errors.push('phase thirteen final report must record 4 batches')
  }
  if (phaseThirteenHardeningFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }
  if (phaseThirteenHardeningFinalReport.productionDecision !== 'production-not-live') {
    errors.push('productionDecision must remain production-not-live')
  }
  if (phaseThirteenHardeningFinalReport.hardeningDecision !== 'implementation-hardening-structure-ready-real-evidence-not-complete') {
    errors.push('hardeningDecision mismatch')
  }

  const flags = [
    dependencyBuildEvidenceMatrix.evidenceReady,
    securityBaselineImplementationPlan.securityBaselineReady,
    realServiceAdapterImplementationPlan.adapterImplementationReady,
    identityRbacAuditProofPlan.proofReady,
    deploymentHardeningPlan.deploymentHardeningReady,
    releaseEvidencePackagePlan.evidencePackageReady,
    releaseReadinessTransitionGate.transitionAllowed,
    releaseReadinessTransitionGate.releaseReady,
  ]

  if (flags.some((flag) => flag !== false)) {
    errors.push('all phase thirteen readiness flags must remain false')
  }

  if (releaseReadinessTransitionGate.conditions.some((condition) => condition.met !== false)) {
    errors.push('release-ready conditions must remain unmet')
  }

  if (phaseThirteenHardeningFinalReport.phaseFourteenEntryDecision !== 'phase-fourteen-planning-allowed-real-execution-evidence-sprint-not-started') {
    errors.push('phase fourteen entry decision mismatch')
  }

  if (!phaseFourteenEntryGate.mustNotDo.includes('mark pending-real-run as passed')) {
    errors.push('phase fourteen gate must forbid marking pending-real-run as passed')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-thirteen-final']) errors.push('package missing check:phase-thirteen-final')
  if (!pkg.scripts['phase-thirteen-final:print']) errors.push('package missing phase-thirteen-final:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase thirteen final check passed.')
}

main()
