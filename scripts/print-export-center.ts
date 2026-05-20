import exportCenterImplementationContract from '../data/core/export-center-implementation-contract.json'
import exportInheritanceMatrix from '../data/domains/archive/export-inheritance-matrix.json'

function main() {
  console.log(`${exportCenterImplementationContract.name}`)
  console.log(`stageProgress=${exportCenterImplementationContract.stageProgress}`)
  console.log(`route=${exportCenterImplementationContract.route}`)
  console.log(`packages=${exportInheritanceMatrix.packages.length}`)
  console.log(`confirmationRequired=${exportInheritanceMatrix.packages.filter((item) => item.requiresConfirmation).length}`)
}

main()
