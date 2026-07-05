import contentProductizationBaseline from '../../data/domains/content/content-productization-baseline.json'
import coverStrategy from '../../data/core/cover-strategy.json'
import projectionDensityStrategy from '../../data/domains/experience/projection-density-strategy.json'
import seedContentQualityGate from '../../data/domains/content/seed-content-quality-gate.json'
import nodesData from '../../data/domains/experience/nodes.json'
import pathsData from '../../data/domains/experience/paths.json'
import eventsData from '../../data/core/world-events.json'
import type { Node, Path, WorldEvent } from './types'
import { isPublicVisible } from './visibility'

export type ContentProductizationIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getContentProductizationBaseline() {
  return contentProductizationBaseline
}

export function getCoverStrategy() {
  return coverStrategy
}

export function getProjectionDensityStrategy() {
  return projectionDensityStrategy
}

export function getSeedContentQualityGate() {
  return seedContentQualityGate
}

export function validateContentProductization(): ContentProductizationIssue[] {
  const issues: ContentProductizationIssue[] = []
  const nodes = nodesData as Node[]
  const paths = pathsData as Path[]
  const events = eventsData as WorldEvent[]
  const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
  const publicNodeBySlug = new Map(publicNodes.map((node) => [node.slug, node]))
  const publicNodeById = new Map(publicNodes.map((node) => [node.id, node]))

  if (contentProductizationBaseline.homeSections.length < 5) {
    issues.push({
      id: 'home-sections-too-few',
      severity: 'error',
      message: '首页产品化板块不足。',
    })
  }

  coverStrategy.coverKinds.forEach((kind) => {
    if (!kind.useFor.length || !kind.style) {
      issues.push({
        id: `cover-kind-incomplete-${kind.id}`,
        severity: 'error',
        message: `封面策略 ${kind.id} 不完整。`,
      })
    }
  })

  projectionDensityStrategy.routes.forEach((route) => {
    if (!route.mustBalance.length) {
      issues.push({
        id: `density-route-incomplete-${route.route}`,
        severity: 'error',
        message: `页面密度策略不完整：${route.route}`,
      })
    }
  })

  if (seedContentQualityGate.qualityGates.length < 6) {
    issues.push({
      id: 'seed-quality-gates-too-few',
      severity: 'warning',
      message: '种子内容质量门槛偏少。',
    })
  }

  publicNodes
    .filter((node) => node.featured?.home || node.featured?.representative || node.featured?.recommended)
    .forEach((node) => {
      if (!node.summary || !node.contentPath || node.tags.length < 2) {
        issues.push({
          id: `featured-node-incomplete-${node.slug}`,
          severity: 'error',
          message: `精选节点 ${node.slug} 必须具备摘要、正文路径和至少两个标签。`,
        })
      }
    })

  publicNodes
    .filter((node) => node.featured?.pathCore)
    .forEach((node) => {
      if (!node.contentPath || node.tags.length < 2) {
        issues.push({
          id: `path-core-node-incomplete-${node.slug}`,
          severity: 'error',
          message: `路径核心节点 ${node.slug} 必须具备正文路径和标签。`,
        })
      }
    })

  paths
    .filter((path) => path.visibility === 'public')
    .forEach((path) => {
      const publicPathNodeCount = path.nodeSlugs.filter((slug) => publicNodeBySlug.has(slug)).length
      if (publicPathNodeCount < 3 || !path.estimatedMinutes) {
        issues.push({
          id: `public-path-incomplete-${path.id}`,
          severity: 'error',
          message: `公开路径 ${path.id} 必须有至少 3 个公开节点和预计阅读时间。`,
        })
      }
    })

  events
    .filter((event) => !event.visibility || isPublicVisible(event.visibility))
    .forEach((event) => {
      const privateLinks = (event.nodeIds ?? []).filter((id) => !publicNodeById.has(id))
      if (privateLinks.length > 0) {
        issues.push({
          id: `public-event-links-private-node-${event.id}`,
          severity: 'error',
          message: `公开事件 ${event.id} 不得链接非公开节点：${privateLinks.join(', ')}。`,
        })
      }
    })

  return issues
}
