import dependencyEslintBlockerFixPlan from '../data/dependency-eslint-blocker-fix-plan.json'
import phaseFifteenRcScopeContract from '../data/phase-fifteen-rc-scope-contract.json'
import releaseCandidatePlan from '../data/release-candidate-plan.json'

function main() {
  console.log(`${phaseFifteenRcScopeContract.name}`)
  console.log(`stageProgress=${phaseFifteenRcScopeContract.stageProgress}`)
  console.log(`focus=${phaseFifteenRcScopeContract.focus.length}`)
  console.log(`releaseCandidateReady=${releaseCandidatePlan.releaseCandidateReady}`)
  console.log(`requiredEvidence=${releaseCandidatePlan.requiredEvidence.length}`)
  console.log(`fixReady=${dependencyEslintBlockerFixPlan.fixReady}`)
  console.log(`fixSteps=${dependencyEslintBlockerFixPlan.fixSteps.length}`)
}

main()
