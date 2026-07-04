import lintEnvironmentContract from '../data/engineering/lint-environment-contract.json'
import lintExecutionReadiness from '../data/release/lint-execution-readiness.json'

function main() {
  console.log(`${lintEnvironmentContract.name}`)
  console.log(`stageProgress=${lintEnvironmentContract.stageProgress}`)
  console.log(`currentStatus=${lintExecutionReadiness.currentStatus}`)
  console.log(`localEslint=${lintExecutionReadiness.environmentProbe.localEslintBinary}`)
  console.log(`nodeModules=${lintExecutionReadiness.environmentProbe.nodeModules}`)
}

main()
