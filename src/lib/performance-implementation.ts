import criticalPathContract from '../../data/critical-path-contract.json'
import staticAssetPolicy from '../../data/static-asset-policy.json'
import cacheStrategy from '../../data/cache-strategy.json'
import runtimeSplitContract from '../../data/runtime-split-contract.json'
import performanceGuard from '../../data/performance-guard.json'

export type PerformanceImplementationIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getCriticalPathContract() {
  return criticalPathContract
}

export function getStaticAssetPolicy() {
  return staticAssetPolicy
}

export function getCacheStrategy() {
  return cacheStrategy
}

export function getRuntimeSplitContract() {
  return runtimeSplitContract
}

export function getPerformanceGuard() {
  return performanceGuard
}

export function validatePerformanceImplementation(): PerformanceImplementationIssue[] {
  const issues: PerformanceImplementationIssue[] = []

  criticalPathContract.routes.forEach((route) => {
    if (!route.critical.length || !route.defer.length) {
      issues.push({
        id: `critical-path-incomplete-${route.route}`,
        severity: 'error',
        message: `关键路径 ${route.route} 缺少 critical 或 defer。`,
      })
    }
  })

  if (staticAssetPolicy.assetKinds.length < 5) {
    issues.push({
      id: 'asset-policy-too-small',
      severity: 'error',
      message: '静态资源策略不足。',
    })
  }

  if (cacheStrategy.strategies.length < 6) {
    issues.push({
      id: 'cache-strategy-too-small',
      severity: 'error',
      message: '缓存策略不足。',
    })
  }

  runtimeSplitContract.splitTargets.forEach((target) => {
    if (!target.component || !target.reason) {
      issues.push({
        id: `split-target-incomplete-${target.id}`,
        severity: 'error',
        message: `运行时拆分目标 ${target.id} 缺少 component 或 reason。`,
      })
    }
  })

  if (performanceGuard.checks.length < 5) {
    issues.push({
      id: 'performance-guard-too-small',
      severity: 'warning',
      message: '性能守门检查项偏少。',
    })
  }

  return issues
}
