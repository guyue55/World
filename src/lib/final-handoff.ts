import phaseTwoFinalHandoffGate from '../../data/release/phase-two-final-handoff-gate.json'
import phaseTwoFinalCheckMatrix from '../../data/release/phase-two-final-check-matrix.json'
import nextStageReadiness from '../../data/release/next-stage-readiness.json'

export function getPhaseTwoFinalHandoffGate() {
  return phaseTwoFinalHandoffGate
}

export function getPhaseTwoFinalCheckMatrix() {
  return phaseTwoFinalCheckMatrix
}

export function getNextStageReadiness() {
  return nextStageReadiness
}

export function getFinalHandoffSummary() {
  return {
    decision: phaseTwoFinalHandoffGate.handoffDecision,
    status: phaseTwoFinalHandoffGate.status,
    completedBatches: phaseTwoFinalHandoffGate.handoffScope.completedPhaseTwoBatches,
    hardeningBatches: phaseTwoFinalHandoffGate.handoffScope.completedHardeningBatches,
    checks: phaseTwoFinalCheckMatrix.checks.length,
    nextTracks: nextStageReadiness.tracks.length,
  }
}
