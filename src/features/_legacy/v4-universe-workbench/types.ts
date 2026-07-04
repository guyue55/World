export type V4UniverseViewMode =
  | 'rich-spatial'
  | 'canvas-2d'
  | 'svg-graph'
  | 'semantic-list'
  | 'reduced-motion'
  | 'low-end-device'

export type V4UniverseOperation = {
  name: string
  viewModes: V4UniverseViewMode[]
  auditRequired: boolean
  fallbackRequired: boolean
}

export const v4UniverseOperations: V4UniverseOperation[] = [
  { name: 'drag memory node', viewModes: ['rich-spatial', 'canvas-2d', 'svg-graph'], auditRequired: true, fallbackRequired: true },
  { name: 'connect memory edge', viewModes: ['rich-spatial', 'canvas-2d', 'svg-graph'], auditRequired: true, fallbackRequired: true },
  { name: 'create exhibition constellation', viewModes: ['rich-spatial', 'semantic-list'], auditRequired: true, fallbackRequired: true },
]
