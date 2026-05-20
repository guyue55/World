import phaseEightProductionEnvironmentMatrix from '../data/phase-eight-production-environment-matrix.json'
import phaseEightProductionScopeContract from '../data/phase-eight-production-scope-contract.json'

function main() {
  console.log(`${phaseEightProductionScopeContract.name}`)
  console.log(`stageProgress=${phaseEightProductionScopeContract.stageProgress}`)
  console.log(`focus=${phaseEightProductionScopeContract.focus.length}`)
  console.log(`environments=${phaseEightProductionEnvironmentMatrix.environments.length}`)
  console.log(`productionRequirements=${phaseEightProductionEnvironmentMatrix.productionRequirements.length}`)
  console.log(`requiredSecrets=${phaseEightProductionEnvironmentMatrix.requiredSecrets.length}`)
}

main()
