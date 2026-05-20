import phaseTwoClosureContract from '../data/phase-two-closure-contract.json'
import phaseTwoClosureReport from '../data/phase-two-closure-report.json'
import lintExecutionReadiness from '../data/lint-execution-readiness.json'

function main() {
  console.log(`${phaseTwoClosureReport.name}`)
  console.log(`stageProgress=${phaseTwoClosureReport.stageProgress}`)
  console.log(`decision=${phaseTwoClosureReport.decision}`)
  console.log(`completedBatches=${phaseTwoClosureContract.completedBatches.length}`)
  console.log(`routes=${phaseTwoClosureReport.summary.experienceRoutesProductized.length}`)
  console.log(`lintStatus=${lintExecutionReadiness.currentStatus}`)
}

main()
