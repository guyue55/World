import performanceMetricsModel from '../../data/performance-metrics-model.json'
import routePerformanceProfiles from '../../data/route-performance-profiles.json'
import smoothnessAuditChecklist from '../../data/smoothness-audit-checklist.json'
import largeContentStrategy from '../../data/large-content-strategy.json'
import performanceRegressionGuard from '../../data/performance-regression-guard.json'

export type PerformanceRegressionIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getPerformanceMetricsModel() {
  return performanceMetricsModel
}

export function getRoutePerformanceProfiles() {
  return routePerformanceProfiles
}

export function getSmoothnessAuditChecklist() {
  return smoothnessAuditChecklist
}

export function getLargeContentStrategy() {
  return largeContentStrategy
}

export function getPerformanceRegressionGuard() {
  return performanceRegressionGuard
}

export function validatePerformanceRegression(): PerformanceRegressionIssue[] {
  const issues: PerformanceRegressionIssue[] = []

  if (performanceMetricsModel.metrics.length < 8) {
    issues.push({
      id: 'metrics-too-few',
      severity: 'error',
      message: '性能指标模型指标不足。',
    })
  }

  routePerformanceProfiles.profiles.forEach((profile) => {
    if (!profile.primaryRisk || !profile.mustKeep.length) {
      issues.push({
        id: `route-profile-incomplete-${profile.route}`,
        severity: 'error',
        message: `页面性能档案不完整：${profile.route}`,
      })
    }
  })

  if (smoothnessAuditChecklist.auditItems.length < 6) {
    issues.push({
      id: 'smoothness-audit-too-small',
      severity: 'warning',
      message: '流畅度审计项偏少。',
    })
  }

  if (largeContentStrategy.growthStages.length < 4) {
    issues.push({
      id: 'large-content-stages-too-few',
      severity: 'error',
      message: '大规模内容阶段策略不足。',
    })
  }

  if (performanceRegressionGuard.guards.length < 5) {
    issues.push({
      id: 'performance-regression-guards-too-few',
      severity: 'error',
      message: '性能回归守门项不足。',
    })
  }

  return issues
}
