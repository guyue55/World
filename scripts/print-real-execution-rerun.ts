import realExecutionRerunContract from '../data/real-execution-rerun-contract.json'
import realExecutionRerunRecord from '../data/real-execution-rerun-record.json'

function main() {
  console.log(`${realExecutionRerunContract.name}`)
  console.log(`stageProgress=${realExecutionRerunContract.stageProgress}`)
  console.log(`steps=${realExecutionRerunContract.steps.length}`)
  console.log(`runs=${realExecutionRerunRecord.runs.length}`)
  console.log(`pending=${realExecutionRerunRecord.runs.filter((run) => run.status === 'pending').length}`)
}

main()
