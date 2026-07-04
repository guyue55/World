import evolutionPolicy from '../../data/domains/governance/evolution-policy.json'

export type EvolutionRequirement = {
  changeType: string
  requiresSnapshot: boolean
  requiresWorldEvent: boolean
  requiresReview: boolean
}

export function getEvolutionPolicy() {
  return evolutionPolicy
}

export function getEvolutionRequirement(changeType: string): EvolutionRequirement {
  const found = evolutionPolicy.changeTypes.find((item) => item.id === changeType)

  if (!found) {
    return {
      changeType,
      requiresSnapshot: true,
      requiresWorldEvent: true,
      requiresReview: true,
    }
  }

  return {
    changeType: found.id,
    requiresSnapshot: found.requiresSnapshot,
    requiresWorldEvent: found.requiresWorldEvent,
    requiresReview: found.requiresReview,
  }
}

export function shouldCreateWorldEvent(changeType: string): boolean {
  return getEvolutionRequirement(changeType).requiresWorldEvent
}

export function shouldCreateSnapshot(changeType: string): boolean {
  return getEvolutionRequirement(changeType).requiresSnapshot
}
