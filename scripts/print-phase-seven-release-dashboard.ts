import phaseSevenReleaseDashboard from '../data/phase-seven-release-dashboard.json'
import phaseSevenReleaseEvidenceLedger from '../data/phase-seven-release-evidence-ledger.json'
import phaseSevenSeoAnalyticsPlan from '../data/phase-seven-seo-analytics-plan.json'

function main() {
  console.log(`${phaseSevenReleaseDashboard.name}`)
  console.log(`stageProgress=${phaseSevenReleaseDashboard.stageProgress}`)
  console.log(`releaseReady=${phaseSevenReleaseDashboard.releaseReady}`)
  console.log(`cards=${phaseSevenReleaseDashboard.cards.length}`)
  console.log(`evidence=${phaseSevenReleaseEvidenceLedger.items.length}`)
  console.log(`seoChecks=${phaseSevenSeoAnalyticsPlan.seoChecks.length}`)
}

main()
