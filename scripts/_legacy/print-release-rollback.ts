import releaseRollbackContract from '../data/release/release-rollback-contract.json'

function main() {
  console.log(`${releaseRollbackContract.name}`)
  console.log(`stageProgress=${releaseRollbackContract.stageProgress}`)
  console.log(`failureScenarios=${releaseRollbackContract.failureScenarios.length}`)
  console.log(`rollbackRules=${releaseRollbackContract.rollbackRules.length}`)
}

main()
