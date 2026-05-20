import ontology from '../../data/core/world-ontology.json'
import type { Node } from './types'
import { getAllNodes } from './nodes'

export type OntologyIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getWorldOntology() {
  return ontology
}

export function validateSemanticLayers(nodes: Node[] = getAllNodes()): OntologyIssue[] {
  const issues: OntologyIssue[] = []
  const layers = new Set(ontology.semanticLayers.map((layer) => layer.id))

  nodes.forEach((node) => {
    if (node.layer && !layers.has(node.layer)) {
      issues.push({
        id: `unknown-layer-${node.id}`,
        severity: 'error',
        message: `节点 ${node.id} 使用了未知语义层：${node.layer}`,
      })
    }

    if (node.layer === 'imagination' && node.visibility === 'public' && !node.tags.includes('imagination')) {
      issues.push({
        id: `imagination-tag-${node.id}`,
        severity: 'warning',
        message: `公开想象层节点 ${node.id} 应显式包含 imagination 标签。`,
      })
    }
  })

  return issues
}
