import evolutionPolicy from '../../data/evolution-policy.json'

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

  return found
}

export function shouldCreateWorldEvent(changeType: string): boolean {
  return getEvolutionRequirement(changeType).requiresWorldEvent
}

export function shouldCreateSnapshot(changeType: string): boolean {
  return getEvolutionRequirement(changeType).requiresSnapshot
}
