export type V6MemoryVisibility = 'public' | 'trusted' | 'family' | 'private'

export type V6MemoryNode = {
  id: string
  title: string
  visibility: V6MemoryVisibility
  weight: number
  timestamp: string
}

export type V6MemoryEdge = {
  from: string
  to: string
  relation: string
  visibility: V6MemoryVisibility
}

export const v6MemoryGraphPolicy = {
  visibilityRequired: true,
  privateGraphExportRequiresRedaction: true,
}
