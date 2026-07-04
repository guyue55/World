import prePhaseFourFinalReport from '../data/release/pre-phase-four-final-report.json'
import prePhaseFourFinalReadiness from '../data/release/pre-phase-four-final-readiness.json'

function main() {
  console.log(`${prePhaseFourFinalReport.name}`)
  console.log(`stageProgress=${prePhaseFourFinalReport.stageProgress}`)
  console.log(`decision=${prePhaseFourFinalReport.decision}`)
  console.log(`releaseDecision=${prePhaseFourFinalReport.releaseDecision}`)
  console.log(`completedBatches=${prePhaseFourFinalReport.completedBatches.length}`)
  console.log(`phaseFourEntryDecision=${prePhaseFourFinalReport.phaseFourEntryDecision}`)
  console.log(`readinessItems=${prePhaseFourFinalReadiness.items.length}`)
  console.log(`readinessStatus=${prePhaseFourFinalReadiness.status}`)
}

main()
