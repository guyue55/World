import completionMatrix from '../../data/phase-one-completion-matrix.json'
import remainingWork from '../../data/phase-one-remaining-work.json'
import exitCriteria from '../../data/phase-one-exit-criteria.json'
import nextPhaseReadiness from '../../data/next-phase-readiness.json'

export type PhaseOneClosureIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getPhaseOneCompletionMatrix() {
  return completionMatrix
}

export function getPhaseOneRemainingWork() {
  return remainingWork
}

export function getPhaseOneExitCriteria() {
  return exitCriteria
}

export function getNextPhaseReadiness() {
  return nextPhaseReadiness
}

export function validatePhaseOneClosure(): PhaseOneClosureIssue[] {
  const issues: PhaseOneClosureIssue[] = []

  if (completionMatrix.completedDomains.length < 10) {
    issues.push({
      id: 'completed-domains-too-few',
      severity: 'warning',
      message: '已完成领域登记偏少。',
    })
  }

  if (completionMatrix.remainingDomains.length < 6) {
    issues.push({
      id: 'remaining-domains-too-few',
      severity: 'error',
      message: '剩余领域登记不足。',
    })
  }

  const p0Items = remainingWork.items.filter((item) => item.priority === 'P0')
  if (p0Items.length < 4) {
    issues.push({
      id: 'p0-items-too-few',
      severity: 'error',
      message: 'P0 收口项不足。',
    })
  }

  if (exitCriteria.mustPass.length < 6) {
    issues.push({
      id: 'exit-criteria-too-few',
      severity: 'error',
      message: '第一阶段退出标准不足。',
    })
  }

  if (nextPhaseReadiness.recommendedNextBatches.length < 4) {
    issues.push({
      id: 'next-batches-too-few',
      severity: 'warning',
      message: '下一阶段建议批次偏少。',
    })
  }

  return issues
}
