import contentProductizationBaseline from '../../data/content-productization-baseline.json'
import coverStrategy from '../../data/cover-strategy.json'
import projectionDensityStrategy from '../../data/projection-density-strategy.json'
import seedContentQualityGate from '../../data/seed-content-quality-gate.json'

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

  return issues
}
