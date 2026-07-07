import phaseThreeOperationsExportContract from '../data/core/phase-three-operations-export-contract.json'
import phaseThreePlanningFinalReport from '../data/release/phase-three-planning-final-report.json'
import exportInheritanceMatrix from '../data/domains/archive/export-inheritance-matrix.json'

function main() {
  console.log(`${phaseThreeOperationsExportContract.name}`)
  console.log(`stageProgress=${phaseThreeOperationsExportContract.stageProgress}`)
  console.log(`operationModules=${phaseThreeOperationsExportContract.operationModules.length}`)
  console.log(`exportFormats=${phaseThreeOperationsExportContract.exportFormats.length}`)
  console.log(`packages=${exportInheritanceMatrix.packages.length}`)
  console.log(`completedBatches=${phaseThreePlanningFinalReport.completedBatches.length}`)
  console.log(`decision=${phaseThreePlanningFinalReport.decision}`)
}

main()
