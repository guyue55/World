import longTermSustainabilityGovernancePlan from '../data/domains/governance/long-term-sustainability-governance-plan.json'
import platformGovernanceDashboardPlan from '../data/domains/governance/platform-governance-dashboard-plan.json'
import teamCollaborationGovernanceWorkflow from '../data/domains/governance/team-collaboration-governance-workflow.json'

function main() {
  console.log(`${teamCollaborationGovernanceWorkflow.name}`)
  console.log(`stageProgress=${teamCollaborationGovernanceWorkflow.stageProgress}`)
  console.log(`teamReady=${teamCollaborationGovernanceWorkflow.teamReady}`)
  console.log(`workflows=${teamCollaborationGovernanceWorkflow.workflows.length}`)
  console.log(`governanceDashboardReady=${platformGovernanceDashboardPlan.governanceDashboardReady}`)
  console.log(`dashboardCards=${platformGovernanceDashboardPlan.cards.length}`)
  console.log(`sustainabilityReady=${longTermSustainabilityGovernancePlan.sustainabilityReady}`)
  console.log(`tracks=${longTermSustainabilityGovernancePlan.tracks.length}`)
}

main()
