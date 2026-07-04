import realCommandExecutionAttempts from '../data/engineering/real-command-execution-attempts.json'
import realExecutionResultSummary from '../data/engineering/real-execution-result-summary.json'

function main() {
  console.log(`${realCommandExecutionAttempts.name}`)
  console.log(`stageProgress=${realCommandExecutionAttempts.stageProgress}`)
  console.log(`allRequiredCommandsPassed=${realCommandExecutionAttempts.allRequiredCommandsPassed}`)
  console.log(`attempted=${realCommandExecutionAttempts.summary.attempted}`)
  console.log(`passed=${realCommandExecutionAttempts.summary.passed}`)
  console.log(`failedOrBlocked=${realCommandExecutionAttempts.summary.failedOrBlocked}`)
  console.log(`releaseReadyEligible=${realCommandExecutionAttempts.summary.releaseReadyEligible}`)
  console.log(`queuePassed=${realExecutionResultSummary.passed}`)
  console.log(`queueBlocked=${realExecutionResultSummary.blocked}`)
  console.log(`queuePending=${realExecutionResultSummary.pending}`)
  for (const result of realCommandExecutionAttempts.results) {
    console.log(`${result.id} | ${result.status} | exit=${result.exitCode}`)
  }
}

main()
