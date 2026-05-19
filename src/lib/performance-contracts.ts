import performanceBudget from '../../data/performance-budget.json'
import renderingStrategy from '../../data/rendering-strategy.json'
import loadingStrategy from '../../data/loading-strategy.json'
import interactionSmoothnessContract from '../../data/interaction-smoothness-contract.json'

export type PerformanceIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getPerformanceBudget() {
  return performanceBudget
}

export function getRenderingStrategy() {
  return renderingStrategy
}

export function getLoadingStrategy() {
  return loadingStrategy
}

export function getInteractionSmoothnessContract() {
  return interactionSmoothnessContract
}

export function validatePerformanceContracts(): PerformanceIssue[] {
  const issues: PerformanceIssue[] = []

  if (performanceBudget.budgets.length < 6) {
    issues.push({
      id: 'performance-budget-too-small',
      severity: 'error',
      message: '性能预算数量不足。',
    })
  }

  if (renderingStrategy.layers.length < 4) {
    issues.push({
      id: 'rendering-layers-too-few',
      severity: 'error',
      message: '渲染分层不足。',
    })
  }

  loadingStrategy.strategies.forEach((item) => {
    if (!item.load || !item.avoid) {
      issues.push({
        id: `loading-strategy-incomplete-${item.id}`,
        severity: 'error',
        message: `加载策略 ${item.id} 缺少 load 或 avoid。`,
      })
    }
  })

  if (interactionSmoothnessContract.rules.length < 6) {
    issues.push({
      id: 'interaction-rules-too-few',
      severity: 'warning',
      message: '交互流畅度规则偏少。',
    })
  }

  return issues
}
