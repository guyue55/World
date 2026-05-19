import localAcceptanceRunner from '../data/local-acceptance-runner.json'
import stageClosureUpdateProtocol from '../data/stage-closure-update-protocol.json'

function main() {
  console.log(`${localAcceptanceRunner.name}`)
  console.log(`runner=${localAcceptanceRunner.runner}`)
  console.log(`output=${localAcceptanceRunner.output}`)
  console.log(`steps=${localAcceptanceRunner.steps.map((step) => step.id).join(', ')}`)
  console.log(`state=${stageClosureUpdateProtocol.from} -> ${stageClosureUpdateProtocol.to}`)
}

main()
