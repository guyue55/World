import phaseFifteenBlockerClosurePlan from '../data/phase-fifteen-blocker-closure-plan.json'
import rcEvidencePackageChecklist from '../data/rc-evidence-package-checklist.json'
import releaseCandidateManifest from '../data/release-candidate-manifest.json'

function main() {
  console.log(`${releaseCandidateManifest.name}`)
  console.log(`stageProgress=${releaseCandidateManifest.stageProgress}`)
  console.log(`candidateId=${releaseCandidateManifest.candidateId}`)
  console.log(`releaseCandidateReady=${releaseCandidateManifest.releaseCandidateReady}`)
  console.log(`packageGenerated=${releaseCandidateManifest.packageGenerated}`)
  console.log(`evidenceStatus=${releaseCandidateManifest.evidenceStatus}`)
  console.log(`rcEvidencePackageReady=${rcEvidencePackageChecklist.rcEvidencePackageReady}`)
  console.log(`sections=${rcEvidencePackageChecklist.sections.length}`)
  console.log(`blockerClosureReady=${phaseFifteenBlockerClosurePlan.blockerClosureReady}`)
  console.log(`blockers=${phaseFifteenBlockerClosurePlan.blockers.length}`)
}

main()
