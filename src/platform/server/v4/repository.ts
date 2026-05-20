export type V4WorldNodeRecord = {
  id: string
  title: string
  visibility: 'public' | 'private' | 'family' | 'draft'
}

export class V4InMemoryWorldRepository {
  private readonly nodes = new Map<string, V4WorldNodeRecord>()

  upsertNode(node: V4WorldNodeRecord) {
    this.nodes.set(node.id, node)
    return node
  }

  getNode(id: string) {
    return this.nodes.get(id) ?? null
  }

  listPublicNodes() {
    return [...this.nodes.values()].filter((node) => node.visibility === 'public')
  }

  listPrivateNodesForAuditOnly() {
    return [...this.nodes.values()].filter((node) => node.visibility !== 'public')
  }
}
