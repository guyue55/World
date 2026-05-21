export type ObservabilitySignalType = 'performance' | 'privacy' | 'content' | 'release'

export type ObservabilitySignal = {
  id: string
  title: string
  type: ObservabilitySignalType
  status: 'tracked' | 'planned'
  description: string
}
