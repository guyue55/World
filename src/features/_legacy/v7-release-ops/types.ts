export type V7Status = 'complete' | 'planned' | 'blocked' | 'local-structure-ready' | 'handoff-ready'

export type V7ReleaseCard = {
  id: string
  title: string
  state: string
  description: string
}

export type V7EvidenceItem = {
  id: string
  title: string
  command: string
  status: string
  requiredForReleaseReady: boolean
}

export type V7OperationCadence = {
  id: string
  name: string
  items: string[]
}

export type V7ExtensionItem = {
  id: string
  name: string
  kind: string
  status: V7Status
  description: string
}
