import acceptanceReadinessContract from '../data/release/acceptance-readiness-contract.json'
import lintExecutionReadiness from '../data/release/lint-execution-readiness.json'
import phaseTwoExperienceAcceptanceChecklist from '../data/domains/experience/phase-two-experience-acceptance-checklist.json'
import stageCompletionGate from '../data/release/stage-completion-gate.json'

function main() {
  console.log(`${acceptanceReadinessContract.name}`)
  console.log(`stageProgress=${acceptanceReadinessContract.stageProgress}`)
  console.log(`executionGroups=${acceptanceReadinessContract.executionGroups.length}`)
  console.log(`lintStatus=${lintExecutionReadiness.currentStatus}`)
  console.log(`acceptanceRoutes=${phaseTwoExperienceAcceptanceChecklist.routes.length}`)
  console.log(`stageOneStatus=${stageCompletionGate.currentStatus}`)
}

main()
