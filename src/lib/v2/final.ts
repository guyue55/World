import aiOps from '../../data/v2/stage-04/16-v2-stage-four-final.json'
import content from '../../data/v2/stage-03/12-v2-stage-three-final.json'
import finalReport from '../../data/v2/stage-05/20-v2-final-report.json'
import platform from '../../data/v2/stage-01/04-v2-stage-one-final.json'
import roadmap from '../../data/v2/v2-roadmap-summary.json'
import security from '../../data/v2/stage-02/08-v2-audit-evidence-foundation.json'

export function getV2FinalStatus() {
  return {
    roadmap,
    stages: {
      platform,
      security,
      content,
      aiOps,
      finalReport,
    },
    summary: {
      completedStages: roadmap.completedStages,
      completedBatches: roadmap.completedBatches,
      v2Status: roadmap.v2Status,
      productionStatus: roadmap.productionStatus,
      releaseReady: roadmap.releaseReady,
      nextVersion: roadmap.nextVersion,
    },
  }
}
