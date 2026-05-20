import deploymentHardeningPlan from '../data/release/deployment-hardening-plan.json'
import releaseEvidencePackagePlan from '../data/release/release-evidence-package-plan.json'
import releaseReadinessTransitionGate from '../data/release/release-readiness-transition-gate.json'

function main() {
  console.log(`${releaseReadinessTransitionGate.name}`)
  console.log(`stageProgress=${releaseReadinessTransitionGate.stageProgress}`)
  console.log(`deploymentHardeningReady=${deploymentHardeningPlan.deploymentHardeningReady}`)
  console.log(`deploymentItems=${deploymentHardeningPlan.items.length}`)
  console.log(`evidencePackageReady=${releaseEvidencePackagePlan.evidencePackageReady}`)
  console.log(`evidenceSections=${releaseEvidencePackagePlan.sections.length}`)
  console.log(`releaseReady=${releaseReadinessTransitionGate.releaseReady}`)
  console.log(`transitionAllowed=${releaseReadinessTransitionGate.transitionAllowed}`)
}

main()
