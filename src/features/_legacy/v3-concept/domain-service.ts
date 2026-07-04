import breakdown from '../../../data/v3-concept/03-domain-service-task-breakdown.json'

export function getV3DomainServiceTaskBreakdown() {
  return {
    breakdown,
    summary: {
      domainModels: breakdown.domainModels.length,
      services: breakdown.services.length,
      implementationSteps: breakdown.implementationOrder.length,
      reviewSensitiveModels: breakdown.domainModels.filter((model) =>
        model.fields.includes('requiresReview') || model.fields.includes('redactionState'),
      ).length,
      ready: breakdown.ready,
    },
  }
}
