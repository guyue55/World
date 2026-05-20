import dependencyGraph from '../../data/engineering/dependency-graph.json'

export type DependencyGraphIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getDependencyGraph() {
  return dependencyGraph
}

export function validateDependencyGraph(): DependencyGraphIssue[] {
  const issues: DependencyGraphIssue[] = []
  const nodeIds = new Set(dependencyGraph.nodes.map((node) => node.id))

  dependencyGraph.edges.forEach((edge) => {
    if (!nodeIds.has(edge.from)) {
      issues.push({
        id: `missing-edge-from-${edge.from}`,
        severity: 'error',
        message: `依赖边引用了不存在的 from：${edge.from}`,
      })
    }

    if (!nodeIds.has(edge.to)) {
      issues.push({
        id: `missing-edge-to-${edge.to}`,
        severity: 'error',
        message: `依赖边引用了不存在的 to：${edge.to}`,
      })
    }
  })

  return issues
}
