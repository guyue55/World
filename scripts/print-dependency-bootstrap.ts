import dependencyBootstrapContract from '../data/dependency-bootstrap-contract.json'
import dependencyBootstrapRecord from '../data/dependency-bootstrap-record.json'

function main() {
  console.log(`${dependencyBootstrapContract.name}`)
  console.log(`stageProgress=${dependencyBootstrapContract.stageProgress}`)
  console.log(`status=${dependencyBootstrapRecord.status}`)
  console.log(`requiredTools=${dependencyBootstrapContract.requiredTools.length}`)
  console.log(`failureClasses=${dependencyBootstrapContract.failureClasses.length}`)
  console.log(`preferredInstall=${dependencyBootstrapContract.installStrategy.preferred}`)
}

main()
