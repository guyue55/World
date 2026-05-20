import runtimeAdapterContract from '../data/core/runtime-adapter-contract.json'
import runtimeIntegrationGates from '../data/release/runtime-integration-gates.json'
import runtimeReadinessBoard from '../data/release/runtime-readiness-board.json'

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
