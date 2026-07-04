import phaseEightProductionEnvironmentMatrix from '../data/release/phase-eight-production-environment-matrix.json'
import phaseEightProductionScopeContract from '../data/release/phase-eight-production-scope-contract.json'

function main() {
  console.log(`${phaseEightProductionScopeContract.name}`)
  console.log(`stageProgress=${phaseEightProductionScopeContract.stageProgress}`)
  console.log(`focus=${phaseEightProductionScopeContract.focus.length}`)
  console.log(`environments=${phaseEightProductionEnvironmentMatrix.environments.length}`)
  console.log(`productionRequirements=${phaseEightProductionEnvironmentMatrix.productionRequirements.length}`)
  console.log(`requiredSecrets=${phaseEightProductionEnvironmentMatrix.requiredSecrets.length}`)
}

main()
