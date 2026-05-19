import contracts from '../../data/projection-contracts.json'
import type { Node } from './types'
import { getPublicNodes } from './nodes'
import { getAllPaths } from './paths'
import { getHomeProjections, getArchiveProjections, getAtlasProjections } from './projections'
import { canSearch } from './permissions'

export type ProjectionContractIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
  target?: string
}

function issue(id: string, severity: 'warning' | 'error', message: string, target?: string): ProjectionContractIssue {
  return { id, severity, message, target }
}

function hasPathReference(node: Node): boolean {
  return getAllPaths().some((path) => path.nodeSlugs.includes(node.slug))
}

export function validateProjectionContracts(): ProjectionContractIssue[] {
  const issues: ProjectionContractIssue[] = []
  const publicNodes = getPublicNodes()

  getHomeProjections().forEach((projection) => {
    const node = publicNodes.find((item) => item.id === projection.nodeId)

    if (!node) {
      issues.push(issue(`home-missing-node-${projection.nodeId}`, 'error', '首页投影引用了不存在或不可公开的节点。', projection.nodeId))
      return
    }

    if (!node.summary) {
      issues.push(issue(`home-summary-${node.id}`, 'error', '首页投影节点必须有 summary。', node.id))
    }

    if (!(node.featured?.home || node.featured?.representative)) {
      issues.push(issue(`home-featured-${node.id}`, 'error', '首页投影节点必须来自 featured.home 或 featured.representative。', node.id))
    }
  })

  getArchiveProjections().forEach((projection) => {
    const node = publicNodes.find((item) => item.id === projection.nodeId)
    if (!node) issues.push(issue(`archive-missing-node-${projection.nodeId}`, 'error', '档案馆投影引用了不可公开节点。', projection.nodeId))
    if (node && !canSearch(node.visibility)) issues.push(issue(`archive-search-${node.id}`, 'error', '档案馆投影节点不允许被搜索。', node.id))
  })

  getAtlasProjections().forEach((projection) => {
    const node = publicNodes.find((item) => item.id === projection.nodeId)
    if (node && !node.areaId) issues.push(issue(`atlas-area-${node.id}`, 'error', 'Atlas 投影节点必须有 areaId。', node.id))
  })

  publicNodes.filter((node) => node.featured?.pathCore).forEach((node) => {
    if (!hasPathReference(node)) {
      issues.push(issue(`path-core-reference-${node.id}`, 'warning', 'pathCore 节点应至少出现在一条 Path 中。', node.id))
    }
  })

  return issues
}

export function getProjectionContracts() {
  return contracts
}
