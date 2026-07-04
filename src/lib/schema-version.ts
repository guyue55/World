import schemaVersions from '../../data/core/schema-versions.json'

export type SchemaVersionReport = {
  current: string
  compatibleFrom: string
  objectVersions: Array<{
    object: string
    version: string
    breaking: boolean
  }>
}

export function getSchemaVersionReport(): SchemaVersionReport {
  return {
    current: schemaVersions.current,
    compatibleFrom: schemaVersions.compatibleFrom,
    objectVersions: Object.entries(schemaVersions.objects).map(([object, value]) => ({
      object,
      version: value.version,
      breaking: value.breaking,
    })),
  }
}

export function assertSchemaVersionSupported(version: string): void {
  if (version !== schemaVersions.current && version < schemaVersions.compatibleFrom) {
    throw new Error(`Unsupported schema version: ${version}`)
  }
}
