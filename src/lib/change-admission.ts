import changeAdmissionPolicy from '../../data/domains/governance/change-admission-policy.json'

export type ChangeLevel = {
  id: string
  risk: 'low' | 'medium' | 'high' | 'critical'
  requires: string[]
}

export type ChangeAdmission = {
  level: ChangeLevel
  allowed: boolean
  reason: string
}

export function getChangeAdmissionPolicy() {
  return changeAdmissionPolicy
}

export function getChangeLevels(): ChangeLevel[] {
  return changeAdmissionPolicy.levels as ChangeLevel[]
}

export function evaluateChangeAdmission(levelId: string): ChangeAdmission {
  const level = getChangeLevels().find((item) => item.id === levelId)

  if (!level) {
    return {
      level: {
        id: levelId,
        risk: 'critical',
        requires: ['manual review', 'snapshot plan', 'check:world-core'],
      },
      allowed: false,
      reason: `未知变更层级 ${levelId}，默认按 critical 处理。`,
    }
  }

  return {
    level,
    allowed: true,
    reason: `${levelId} 变更可进入流程，但必须满足：${level.requires.join(' / ')}`,
  }
}
