import realExecutionRunbookContract from '../data/engineering/real-execution-runbook-contract.json'

function main() {
  console.log(`${realExecutionRunbookContract.name}`)
  console.log(`stageProgress=${realExecutionRunbookContract.stageProgress}`)
  realExecutionRunbookContract.orderedSteps.forEach((step, index) => {
    console.log(`${index + 1}. ${step.id}: ${step.command} -> ${step.expectedArtifact}`)
  })
}

main()
