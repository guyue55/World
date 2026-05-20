import dependencyBuildEvidenceMatrix from '../data/dependency-build-evidence-matrix.json'
import phaseThirteenHardeningScopeContract from '../data/phase-thirteen-hardening-scope-contract.json'
import securityBaselineImplementationPlan from '../data/security-baseline-implementation-plan.json'

function main() {
  console.log(`${phaseThirteenHardeningScopeContract.name}`)
  console.log(`stageProgress=${phaseThirteenHardeningScopeContract.stageProgress}`)
  console.log(`focus=${phaseThirteenHardeningScopeContract.focus.length}`)
  console.log(`evidenceReady=${dependencyBuildEvidenceMatrix.evidenceReady}`)
  console.log(`checks=${dependencyBuildEvidenceMatrix.checks.length}`)
  console.log(`securityBaselineReady=${securityBaselineImplementationPlan.securityBaselineReady}`)
  console.log(`baseline=${securityBaselineImplementationPlan.baseline.length}`)
}

main()
