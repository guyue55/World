import extensionRegistry from '../../data/extension-registry.json'
import capabilitySlots from '../../data/capability-slots.json'
import moduleBoundaries from '../../data/module-boundaries.json'

export type ExtensionPoint = {
  id: string
  owner: string
  stability: 'stable' | 'experimental' | 'guarded'
  requires: string[]
}

export type CapabilitySlot = {
  id: string
  phase: string
  status: 'reserved' | 'active' | 'deprecated'
  boundary: string
}

export type ExtensionCheckIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getExtensionRegistry() {
  return extensionRegistry
}

export function getExtensionPoints(): ExtensionPoint[] {
  return extensionRegistry.extensionPoints as ExtensionPoint[]
}

export function getCapabilitySlots(): CapabilitySlot[] {
  return capabilitySlots.slots as CapabilitySlot[]
}

export function getModuleBoundaries() {
  return moduleBoundaries
}

export function getExtensionPoint(id: string): ExtensionPoint | undefined {
  return getExtensionPoints().find((point) => point.id === id)
}

export function getPhaseCapabilitySlots(phase: string): CapabilitySlot[] {
  return getCapabilitySlots().filter((slot) => slot.phase === phase)
}

export function validateExtensionRegistry(): ExtensionCheckIssue[] {
  const issues: ExtensionCheckIssue[] = []
  const namespaces = new Set(extensionRegistry.namespaces.map((namespace) => namespace.id))
  const pointIds = new Set<string>()

  getExtensionPoints().forEach((point) => {
    if (pointIds.has(point.id)) {
      issues.push({
        id: `duplicate-extension-point-${point.id}`,
        severity: 'error',
        message: `重复扩展点：${point.id}`,
      })
    }

    pointIds.add(point.id)

    if (!namespaces.has(point.owner)) {
      issues.push({
        id: `missing-extension-owner-${point.id}`,
        severity: 'error',
        message: `扩展点 ${point.id} 引用了不存在的 namespace：${point.owner}`,
      })
    }

    if (point.requires.length === 0) {
      issues.push({
        id: `empty-extension-requires-${point.id}`,
        severity: 'warning',
        message: `扩展点 ${point.id} 没有声明进入条件。`,
      })
    }
  })

  Object.entries(extensionRegistry.futurePhases).forEach(([phase, value]) => {
    value.allowedExtensionPoints.forEach((pointId) => {
      if (!pointIds.has(pointId)) {
        issues.push({
          id: `future-phase-missing-point-${phase}-${pointId}`,
          severity: 'error',
          message: `未来阶段 ${phase} 引用了不存在的扩展点：${pointId}`,
        })
      }
    })
  })

  getCapabilitySlots().forEach((slot) => {
    const phase = extensionRegistry.futurePhases[slot.phase as keyof typeof extensionRegistry.futurePhases]

    if (!phase) {
      issues.push({
        id: `slot-missing-phase-${slot.id}`,
        severity: 'error',
        message: `能力插槽 ${slot.id} 引用了不存在的阶段：${slot.phase}`,
      })
    }

    if (!slot.boundary) {
      issues.push({
        id: `slot-missing-boundary-${slot.id}`,
        severity: 'error',
        message: `能力插槽 ${slot.id} 缺少边界说明。`,
      })
    }
  })

  return issues
}
