import foundationBaseline from '../../data/core/foundation-baseline.json'
import handoffManifest from '../../data/release/foundation-handoff-manifest.json'
import futureGuardrails from '../../data/core/future-expansion-guardrails.json'
import developerOnboarding from '../../data/core/developer-onboarding.json'

export type BaselineIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getFoundationBaseline() {
  return foundationBaseline
}

export function getFoundationHandoffManifest() {
  return handoffManifest
}

export function getFutureExpansionGuardrails() {
  return futureGuardrails
}

export function getDeveloperOnboarding() {
  return developerOnboarding
}

export function validateFoundationBaseline(): BaselineIssue[] {
  const issues: BaselineIssue[] = []

  foundationBaseline.baselineItems.forEach((item) => {
    if (item.status !== 'established') {
      issues.push({
        id: `baseline-not-established-${item.id}`,
        severity: 'error',
        message: `基线项 ${item.id} 尚未 established。`,
      })
    }

    if (!item.evidence || item.evidence.length === 0) {
      issues.push({
        id: `baseline-missing-evidence-${item.id}`,
        severity: 'error',
        message: `基线项 ${item.id} 缺少 evidence。`,
      })
    }
  })

  handoffManifest.handoffItems.forEach((item) => {
    if (!item.path && !item.command) {
      issues.push({
        id: `handoff-missing-action-${item.id}`,
        severity: 'error',
        message: `交接项 ${item.id} 缺少 path 或 command。`,
      })
    }
  })

  if (futureGuardrails.guardrails.length < 8) {
    issues.push({
      id: 'guardrails-too-few',
      severity: 'error',
      message: '未来扩展护栏数量不足。',
    })
  }

  if (developerOnboarding.mustRead.length < 6) {
    issues.push({
      id: 'onboarding-must-read-too-few',
      severity: 'warning',
      message: '开发者必读文档偏少。',
    })
  }

  return issues
}
