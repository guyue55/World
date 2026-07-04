export type V6UniverseRoom = {
  id: string
  name: string
  spatialPermission: 'public' | 'trusted' | 'family' | 'private'
  semanticFallbackRequired: true
}

export type V6UniversePresence = {
  actorId: string
  roomId: string
  role: 'owner' | 'collaborator' | 'viewer' | 'agent'
}
