import acceptanceReadinessContract from '../data/acceptance-readiness-contract.json'
import lintExecutionReadiness from '../data/lint-execution-readiness.json'
import phaseTwoExperienceAcceptanceChecklist from '../data/phase-two-experience-acceptance-checklist.json'
import stageCompletionGate from '../data/stage-completion-gate.json'

function main() {
  console.log(`${acceptanceReadinessContract.name}`)
  console.log(`stageProgress=${acceptanceReadinessContract.stageProgress}`)
  console.log(`executionGroups=${acceptanceReadinessContract.executionGroups.length}`)
  console.log(`lintStatus=${lintExecutionReadiness.currentStatus}`)
  console.log(`acceptanceRoutes=${phaseTwoExperienceAcceptanceChecklist.routes.length}`)
  console.log(`stageOneStatus=${stageCompletionGate.currentStatus}`)
}

main()
