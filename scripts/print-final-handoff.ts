import phaseTwoFinalHandoffGate from '../data/phase-two-final-handoff-gate.json'
import phaseTwoFinalCheckMatrix from '../data/phase-two-final-check-matrix.json'
import nextStageReadiness from '../data/next-stage-readiness.json'

function main() {
  console.log(`${phaseTwoFinalHandoffGate.name}`)
  console.log(`stageProgress=${phaseTwoFinalHandoffGate.stageProgress}`)
  console.log(`decision=${phaseTwoFinalHandoffGate.handoffDecision}`)
  console.log(`status=${phaseTwoFinalHandoffGate.status}`)
  console.log(`checks=${phaseTwoFinalCheckMatrix.checks.length}`)
  console.log(`nextTracks=${nextStageReadiness.tracks.length}`)
}

main()
