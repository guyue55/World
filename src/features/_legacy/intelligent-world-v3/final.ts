import aiKernel from '../../../data/v3/stage-01/04-v3-stage-one-final.json'
import finalReport from '../../../data/v3/v3-final-closure-report.json'
import legacy from '../../../data/v3/stage-04/16-v3-stage-four-final.json'
import multiSpace from '../../../data/v3/stage-02/08-v3-stage-two-final.json'
import v4Gate from '../../../data/v3/stage-05/20-v3-final-v4-gate.json'
import visualUniverse from '../../../data/v3/stage-03/12-v3-stage-three-final.json'

export function getV3FinalStatus() {
  return {
    finalReport,
    stages: {
      aiKernel,
      multiSpace,
      visualUniverse,
      legacy,
      v4Gate,
    },
    summary: {
      completedStages: finalReport.completedStages,
      completedBatches: finalReport.completedBatches,
      v3Status: finalReport.v3Status,
      v4PlanningAllowed: finalReport.v4PlanningAllowed,
      v4DevelopmentRecommended: finalReport.v4DevelopmentRecommended,
      releaseReady: finalReport.releaseReady,
      productionLive: finalReport.productionLive,
    },
  }
}
