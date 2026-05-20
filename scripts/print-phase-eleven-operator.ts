import operatorDashboardPlan from '../data/operator-dashboard-plan.json'
import runtimeEvidenceRecordPlan from '../data/runtime-evidence-record-plan.json'
import runtimeGrowthLoopPlan from '../data/runtime-growth-loop-plan.json'

function main() {
  console.log(`${operatorDashboardPlan.name}`)
  console.log(`stageProgress=${operatorDashboardPlan.stageProgress}`)
  console.log(`dashboardReady=${operatorDashboardPlan.dashboardReady}`)
  console.log(`cards=${operatorDashboardPlan.cards.length}`)
  console.log(`growthLoopReady=${runtimeGrowthLoopPlan.growthLoopReady}`)
  console.log(`growthSteps=${runtimeGrowthLoopPlan.steps.length}`)
  console.log(`evidenceReady=${runtimeEvidenceRecordPlan.evidenceReady}`)
  console.log(`evidenceRecords=${runtimeEvidenceRecordPlan.records.length}`)
}

main()
