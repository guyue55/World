import manualSignoffPreparationChecklist from '../data/manual-signoff-preparation-checklist.json'
import realExecutionResultSummary from '../data/real-execution-result-summary.json'

function main() {
  console.log(`${realExecutionResultSummary.name}`)
  console.log(`stageProgress=${realExecutionResultSummary.stageProgress}`)
  console.log(`realExecutionPassed=${realExecutionResultSummary.realExecutionPassed}`)
  console.log(`totalRequired=${realExecutionResultSummary.totalRequired}`)
  console.log(`passed=${realExecutionResultSummary.passed}`)
  console.log(`blocked=${realExecutionResultSummary.blocked}`)
  console.log(`pending=${realExecutionResultSummary.pending}`)
  console.log(`manualSignoffReady=${manualSignoffPreparationChecklist.manualSignoffReady}`)
  console.log(`signoffItems=${manualSignoffPreparationChecklist.items.length}`)
}

main()
