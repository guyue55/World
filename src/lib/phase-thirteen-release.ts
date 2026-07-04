import deploymentHardeningPlan from '../../data/release/deployment-hardening-plan.json'
import releaseEvidencePackagePlan from '../../data/release/release-evidence-package-plan.json'
import releaseReadinessTransitionGate from '../../data/release/release-readiness-transition-gate.json'

export function getDeploymentHardeningPlan() {
  return deploymentHardeningPlan
}

export function getReleaseEvidencePackagePlan() {
  return releaseEvidencePackagePlan
}

export function getReleaseReadinessTransitionGate() {
  return releaseReadinessTransitionGate
}

export function getPhaseThirteenReleaseSummary() {
  return {
    stageProgress: releaseReadinessTransitionGate.stageProgress,
    deploymentHardeningReady: deploymentHardeningPlan.deploymentHardeningReady,
    deploymentItems: deploymentHardeningPlan.items.length,
    evidencePackageReady: releaseEvidencePackagePlan.evidencePackageReady,
    evidenceSections: releaseEvidencePackagePlan.sections.length,
    releaseReady: releaseReadinessTransitionGate.releaseReady,
    transitionAllowed: releaseReadinessTransitionGate.transitionAllowed,
    conditions: releaseReadinessTransitionGate.conditions.length,
  }
}
