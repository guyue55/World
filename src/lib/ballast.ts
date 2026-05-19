import worldCharterRuntime from '../../data/world-charter-runtime.json'
import principleCheckMap from '../../data/principle-check-map.json'
import longTermInvariants from '../../data/long-term-invariants.json'
import antiFragilityStrategy from '../../data/anti-fragility-strategy.json'
import futureStressTests from '../../data/future-stress-tests.json'

export type BallastIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getWorldCharterRuntime() {
  return worldCharterRuntime
}

export function getPrincipleCheckMap() {
  return principleCheckMap
}

export function getLongTermInvariants() {
  return longTermInvariants
}

export function getAntiFragilityStrategy() {
  return antiFragilityStrategy
}

export function getFutureStressTests() {
  return futureStressTests
}

export function validateBallast(): BallastIssue[] {
  const issues: BallastIssue[] = []

  worldCharterRuntime.charterArticles.forEach((article) => {
    if (!article.runtimeMapping || article.runtimeMapping.length === 0) {
      issues.push({
        id: `charter-no-runtime-${article.id}`,
        severity: 'error',
        message: `宪章条款 ${article.id} 缺少运行时映射。`,
      })
    }
  })

  principleCheckMap.mappings.forEach((mapping) => {
    if (!mapping.checks || mapping.checks.length === 0) {
      issues.push({
        id: `principle-no-check-${mapping.principle}`,
        severity: 'error',
        message: `原则缺少检查映射：${mapping.principle}`,
      })
    }

    if (!mapping.evidence || mapping.evidence.length === 0) {
      issues.push({
        id: `principle-no-evidence-${mapping.principle}`,
        severity: 'error',
        message: `原则缺少证据映射：${mapping.principle}`,
      })
    }
  })

  const criticalInvariants = longTermInvariants.invariants.filter((item) => item.level === 'critical')
  if (criticalInvariants.length < 3) {
    issues.push({
      id: 'critical-invariants-too-few',
      severity: 'error',
      message: 'critical 长期不变量不足。',
    })
  }

  if (antiFragilityStrategy.strategies.length < 6) {
    issues.push({
      id: 'anti-fragility-too-few',
      severity: 'error',
      message: '反脆弱策略不足。',
    })
  }

  if (futureStressTests.scenarios.length < futureStressTests.minimumScenarioCount) {
    issues.push({
      id: 'stress-tests-too-few',
      severity: 'error',
      message: '未来压力测试场景不足。',
    })
  }

  return issues
}
