import defectExecutionQueue from '../data/defect-execution-queue.json'
import defectExecutionQueueContract from '../data/defect-execution-queue-contract.json'

function main() {
  console.log(`${defectExecutionQueueContract.name}`)
  console.log(`stageProgress=${defectExecutionQueueContract.stageProgress}`)
  console.log(`sources=${defectExecutionQueueContract.sources.length}`)
  console.log(`severity=${defectExecutionQueueContract.severity.length}`)
  console.log(`statuses=${defectExecutionQueueContract.allowedStatuses.length}`)
  console.log(`queueStatus=${defectExecutionQueue.status}`)
  console.log(`queueItems=${defectExecutionQueue.items.length}`)
}

main()
