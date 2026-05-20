import runtimeAdapterContract from '../data/runtime-adapter-contract.json'
import runtimeIntegrationGates from '../data/runtime-integration-gates.json'
import runtimeReadinessBoard from '../data/runtime-readiness-board.json'

function main() {
  console.log(`${runtimeIntegrationGates.name}`)
  console.log(`stageProgress=${runtimeIntegrationGates.stageProgress}`)
  console.log(`integrationReady=${runtimeIntegrationGates.integrationReady}`)
  console.log(`gates=${runtimeIntegrationGates.gates.length}`)
  console.log(`readyGates=${runtimeIntegrationGates.gates.filter((gate) => gate.ready).length}`)
  console.log(`adapterReady=${runtimeAdapterContract.adapterReady}`)
  console.log(`adapters=${runtimeAdapterContract.adapters.length}`)
  console.log(`runtimeReady=${runtimeReadinessBoard.runtimeReady}`)
}

main()
