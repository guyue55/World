import longTermSustainabilityGovernancePlan from '../../data/long-term-sustainability-governance-plan.json'
import platformGovernanceDashboardPlan from '../../data/platform-governance-dashboard-plan.json'
import teamCollaborationGovernanceWorkflow from '../../data/team-collaboration-governance-workflow.json'

export function getTeamCollaborationGovernanceWorkflow() {
  return teamCollaborationGovernanceWorkflow
}

export function getPlatformGovernanceDashboardPlan() {
  return platformGovernanceDashboardPlan
}

export function getLongTermSustainabilityGovernancePlan() {
  return longTermSustainabilityGovernancePlan
}

export function getPhaseTwelveTeamSummary() {
  return {
    stageProgress: teamCollaborationGovernanceWorkflow.stageProgress,
    teamReady: teamCollaborationGovernanceWorkflow.teamReady,
    workflows: teamCollaborationGovernanceWorkflow.workflows.length,
    governanceDashboardReady: platformGovernanceDashboardPlan.governanceDashboardReady,
    dashboardCards: platformGovernanceDashboardPlan.cards.length,
    sustainabilityReady: longTermSustainabilityGovernancePlan.sustainabilityReady,
    sustainabilityTracks: longTermSustainabilityGovernancePlan.tracks.length,
  }
}
