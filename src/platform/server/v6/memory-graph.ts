export type V6MemoryNodeRecord = {
  id: string
  visibility: 'public' | 'trusted' | 'family' | 'private'
  weight: number
}

export type V6MemoryEdgeRecord = {
  from: string
  to: string
  visibility: 'public' | 'trusted' | 'family' | 'private'
}

export class V6MemoryGraphStore {
  private readonly nodes = new Map<string, V6MemoryNodeRecord>()
  private readonly edges: V6MemoryEdgeRecord[] = []

  addNode(node: V6MemoryNodeRecord) {
    this.nodes.set(node.id, node)
  }

  addEdge(edge: V6MemoryEdgeRecord) {
    this.edges.push(edge)
  }

  listPublicNodes() {
    return [...this.nodes.values()].filter((node) => node.visibility === 'public')
  }

  exportRedactedGraph() {
    return {
      nodes: [...this.nodes.values()].filter((node) => node.visibility !== 'private'),
      edges: this.edges.filter((edge) => edge.visibility !== 'private'),
    }
  }
}
