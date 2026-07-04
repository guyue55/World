export type V6WorldRelationKind = 'public-link' | 'trusted-link' | 'family-link' | 'project-link' | 'blocked-link'

export type V6WorldNode = {
  id: string
  title: string
  visibility: 'public' | 'trusted' | 'family' | 'private'
}

export type V6WorldRelation = {
  fromWorldId: string
  toWorldId: string
  kind: V6WorldRelationKind
  auditRequired: true
  includesPrivateRawContent: false
}

export const v6WorldNetworkPolicy = {
  privateRawReplicationAllowed: false,
  discoveryRequiresCapabilityDescriptor: true,
  eventStreamRequiresRedaction: true,
}
