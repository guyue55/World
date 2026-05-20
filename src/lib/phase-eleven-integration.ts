import runtimeAdapterContract from '../../data/runtime-adapter-contract.json'
import runtimeIntegrationGates from '../../data/runtime-integration-gates.json'
import runtimeReadinessBoard from '../../data/runtime-readiness-board.json'

export function getRuntimeIntegrationGates() {
  return runtimeIntegrationGates
}

export function getRuntimeAdapterContract() {
  return runtimeAdapterContract
}

export function getRuntimeReadinessBoard() {
  return runtimeReadinessBoard
}

export function getPhaseElevenIntegrationSummary() {
  return {
    stageProgress: runtimeIntegrationGates.stageProgress,
    integrationReady: runtimeIntegrationGates.integrationReady,
    gates: runtimeIntegrationGates.gates.length,
    readyGates: runtimeIntegrationGates.gates.filter((gate) => gate.ready).length,
    adapterReady: runtimeAdapterContract.adapterReady,
    adapters: runtimeAdapterContract.adapters.length,
    runtimeReady: runtimeReadinessBoard.runtimeReady,
    readinessItems: runtimeReadinessBoard.readiness.length,
  }
}
