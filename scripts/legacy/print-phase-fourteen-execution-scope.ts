import phaseFourteenExecutionSprintScopeContract from '../data/engineering/phase-fourteen-execution-sprint-scope-contract.json'
import realExecutionBlockerLedger from '../data/release/real-execution-blocker-ledger.json'
import realExecutionQueue from '../data/engineering/real-execution-queue.json'

function main() {
  console.log(`${phaseFourteenExecutionSprintScopeContract.name}`)
  console.log(`stageProgress=${phaseFourteenExecutionSprintScopeContract.stageProgress}`)
  console.log(`focus=${phaseFourteenExecutionSprintScopeContract.focus.length}`)
  console.log(`executionQueueReady=${realExecutionQueue.executionQueueReady}`)
  console.log(`items=${realExecutionQueue.items.length}`)
  console.log(`blockerLedgerReady=${realExecutionBlockerLedger.blockerLedgerReady}`)
  console.log(`blockers=${realExecutionBlockerLedger.blockers.length}`)
}

main()
