export type V6ProtocolVersion = '6.0.0'

export type V6WorldCapabilitySpec = {
  capability: string
  requiresPermission: boolean
  privateDataAccessible: false
}

export type V6OpenWorldProtocol = {
  version: V6ProtocolVersion
  schema: string
  exportStandard: string
  importStandard: string
  permissionControlled: true
}
