import acceptance from '../../data/v3-concept/06-acceptance-risk-v4-entry-map.json'
import ai from '../../data/v3-concept/04-ai-capability-audit-workflow.json'
import domain from '../../data/v3-concept/03-domain-service-task-breakdown.json'
import finalReport from '../../data/v3-concept/v3-concept-completion-final-report.json'
import pageMatrix from '../../data/v3-concept/02-page-module-matrix.json'
import product from '../../data/v3-concept/01-product-experience-blueprint.json'
import visual from '../../data/v3-concept/05-visual-universe-multidevice-task-map.json'

export function getV3ConceptCompletionStatus() {
  return {
    product,
    pageMatrix,
    domain,
    ai,
    visual,
    acceptance,
    finalReport,
    summary: {
      completedBatches: finalReport.completedBatches,
      routes: pageMatrix.routes.length,
      domainModels: domain.domainModels.length,
      services: domain.services.length,
      aiLayers: ai.capabilityLayers.length,
      visualViews: visual.visualViews.length,
      acceptanceCriteria: acceptance.acceptanceCriteria.length,
      risks: acceptance.riskRegister.length,
      v4PlanningAllowed: acceptance.v4PlanningAllowed,
      v4FormalDevelopmentAllowed: acceptance.v4FormalDevelopmentAllowed,
      releaseReady: acceptance.releaseReady,
      productionLive: acceptance.productionLive,
    },
  }
}
