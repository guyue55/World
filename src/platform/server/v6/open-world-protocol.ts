export type V6OpenWorldProtocolDocument = {
  version: '6.0.0'
  schema: string
  permissionControlled: true
  privateDataAccessible: false
}

export function createV6OpenWorldProtocol(schema: string): V6OpenWorldProtocolDocument {
  return {
    version: '6.0.0',
    schema,
    permissionControlled: true,
    privateDataAccessible: false,
  }
}
