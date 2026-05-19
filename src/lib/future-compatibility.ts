import { getCapabilitySlots, getExtensionRegistry, validateExtensionRegistry } from './extensions'

export type FuturePhaseSummary = {
  id: string
  name: string
  allowedExtensionPoints: string[]
  capabilitySlots: ReturnType<typeof getCapabilitySlots>
}

export function getFuturePhaseSummaries(): FuturePhaseSummary[] {
  const registry = getExtensionRegistry()

  return Object.entries(registry.futurePhases).map(([id, phase]) => ({
    id,
    name: phase.name,
    allowedExtensionPoints: phase.allowedExtensionPoints,
    capabilitySlots: getCapabilitySlots().filter((slot) => slot.phase === id),
  }))
}

export function assertFutureCompatibility(): void {
  const errors = validateExtensionRegistry().filter((issue) => issue.severity === 'error')

  if (errors.length > 0) {
    throw new Error(errors.map((issue) => `${issue.id}: ${issue.message}`).join('\n'))
  }
}
