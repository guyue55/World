export type WorldZoneKind = 'gateway' | 'atlas' | 'node-field' | 'pathway' | 'river' | 'garden' | 'observatory' | 'orbit'
export type WorldLayer = 'surface' | 'memory' | 'creation' | 'private-redacted' | 'ai-boundary'

export type WorldZone = {
  id: string
  title: string
  kind: WorldZoneKind
  layer: WorldLayer
  description: string
  route: string
  visualCue: string
  priority: number
}

export type WorldJourney = {
  id: string
  title: string
  description: string
  stops: string[]
  mood: 'calm' | 'cosmic' | 'garden' | 'archive'
}

export type WorldMetric = {
  id: string
  title: string
  value: string
  status: 'ready' | 'tracked' | 'pending-real-content' | 'pending-real-run'
}
