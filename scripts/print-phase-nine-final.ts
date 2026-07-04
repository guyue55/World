import phaseNineContentBrandFinalReport from '../data/domains/content/phase-nine-content-brand-final-report.json'
import phaseTenEntryGate from '../data/release/phase-ten-entry-gate.json'

function main() {
  console.log(`${phaseNineContentBrandFinalReport.name}`)
  console.log(`stageProgress=${phaseNineContentBrandFinalReport.stageProgress}`)
  console.log(`decision=${phaseNineContentBrandFinalReport.decision}`)
  console.log(`releaseDecision=${phaseNineContentBrandFinalReport.releaseDecision}`)
  console.log(`productionDecision=${phaseNineContentBrandFinalReport.productionDecision}`)
  console.log(`contentDecision=${phaseNineContentBrandFinalReport.contentDecision}`)
  console.log(`completedBatches=${phaseNineContentBrandFinalReport.completedBatches.length}`)
  console.log(`completedCapabilities=${phaseNineContentBrandFinalReport.completedCapabilities.length}`)
  console.log(`phaseTenEntryDecision=${phaseNineContentBrandFinalReport.phaseTenEntryDecision}`)
  console.log(`phaseTenFocus=${phaseTenEntryGate.phaseTenCandidateFocus.length}`)
}

main()
