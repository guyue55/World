import releaseCandidateAcceptanceEvidenceManifest from '../data/release/release-candidate-acceptance-evidence-manifest.json'

function main() {
  console.log(`${releaseCandidateAcceptanceEvidenceManifest.name}`)
  console.log(`stageProgress=${releaseCandidateAcceptanceEvidenceManifest.stageProgress}`)
  console.log(`evidenceItems=${releaseCandidateAcceptanceEvidenceManifest.requiredEvidence.length}`)
  console.log(`required=${releaseCandidateAcceptanceEvidenceManifest.requiredEvidence.filter((item) => item.required).length}`)
  console.log(`optional=${releaseCandidateAcceptanceEvidenceManifest.requiredEvidence.filter((item) => !item.required).length}`)
}

main()
