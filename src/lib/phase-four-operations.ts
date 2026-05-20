import phaseFiveHandoffPreparation from '../../data/release/phase-five-handoff-preparation.json'
import phaseFourOperationsBoard from '../../data/operations/phase-four-operations-board.json'

export function getPhaseFourOperationsBoard() {
  return phaseFourOperationsBoard
}

export function getPhaseFiveHandoffPreparation() {
  return phaseFiveHandoffPreparation
}

export function getPhaseFourOperationsSummary() {
  return {
    stageProgress: phaseFourOperationsBoard.stageProgress,
    lanes: phaseFourOperationsBoard.lanes.length,
    metrics: phaseFourOperationsBoard.metrics.length,
    phaseFiveFocus: phaseFiveHandoffPreparation.phaseFiveCandidateFocus.length,
    phaseFiveForbidden: phaseFiveHandoffPreparation.mustNotImplementInPhaseFour.length,
    handoffQuestions: phaseFiveHandoffPreparation.handoffQuestions.length,
  }
}
