import phaseEightDomainHttpsCdnPolicy from '../../data/phase-eight-domain-https-cdn-policy.json'
import phaseEightProductionDashboard from '../../data/phase-eight-production-dashboard.json'
import phaseEightProductionDeploymentChecklist from '../../data/phase-eight-production-deployment-checklist.json'
import phaseEightProductionEnvironmentMatrix from '../../data/phase-eight-production-environment-matrix.json'
import phaseEightProductionScopeContract from '../../data/phase-eight-production-scope-contract.json'

export function getPhaseEightProductionScopeContract() {
  return phaseEightProductionScopeContract
}

export function getPhaseEightProductionEnvironmentMatrix() {
  return phaseEightProductionEnvironmentMatrix
}

export function getPhaseEightProductionDeploymentChecklist() {
  return phaseEightProductionDeploymentChecklist
}

export function getPhaseEightDomainHttpsCdnPolicy() {
  return phaseEightDomainHttpsCdnPolicy
}

export function getPhaseEightProductionDashboard() {
  return phaseEightProductionDashboard
}

export function getPhaseEightProductionSummary() {
  const checklist = phaseEightProductionDeploymentChecklist.steps

  return {
    stageProgress: phaseEightProductionDashboard.stageProgress,
    productionLive: phaseEightProductionDashboard.productionLive,
    environments: phaseEightProductionEnvironmentMatrix.environments.length,
    checklistItems: checklist.length,
    pendingItems: checklist.filter((item) => String(item.status).startsWith('pending')).length,
    dashboardCards: phaseEightProductionDashboard.cards.length,
    productionRequirements: phaseEightProductionEnvironmentMatrix.productionRequirements.length,
  }
}
