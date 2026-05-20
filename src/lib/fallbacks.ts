import fallbackStrategy from '../../data/core/fallback-strategy.json'

export type FallbackRule = {
  capability: string
  fallback: string
  required: boolean
}

export type FallbackIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getFallbackStrategy() {
  return fallbackStrategy
}

export function getFallbackRules(): FallbackRule[] {
  return fallbackStrategy.fallbacks as FallbackRule[]
}

export function validateFallbackStrategy(): FallbackIssue[] {
  const issues: FallbackIssue[] = []
  const seen = new Set<string>()

  getFallbackRules().forEach((rule) => {
    if (seen.has(rule.capability)) {
      issues.push({
        id: `duplicate-fallback-${rule.capability}`,
        severity: 'error',
        message: `重复 fallback 能力：${rule.capability}`,
      })
    }

    seen.add(rule.capability)

    if (!rule.fallback) {
      issues.push({
        id: `missing-fallback-${rule.capability}`,
        severity: 'error',
        message: `能力 ${rule.capability} 缺少 fallback。`,
      })
    }
  })

  return issues
}
