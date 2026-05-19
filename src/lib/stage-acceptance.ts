import stageCompletionGate from '../../data/stage-completion-gate.json'
import ciReadinessContract from '../../data/ci-readiness-contract.json'
import releasePreviewChecklist from '../../data/release-preview-checklist.json'
import finalAcceptanceChecklist from '../../data/final-acceptance-checklist.json'

export type StageAcceptanceIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getStageCompletionGate() {
  return stageCompletionGate
}

export function getCiReadinessContract() {
  return ciReadinessContract
}

export function getReleasePreviewChecklist() {
  return releasePreviewChecklist
}

export function getFinalAcceptanceChecklist() {
  return finalAcceptanceChecklist
}

export function validateStageAcceptance(): StageAcceptanceIssue[] {
  const issues: StageAcceptanceIssue[] = []

  if (stageCompletionGate.currentStatus !== 'not-yet-complete') {
    issues.push({
      id: 'stage-status-overclaim',
      severity: 'error',
      message: '当前阶段不得在真实构建和真实 QA 前标记完成。',
    })
  }

  const externalGates = stageCompletionGate.completionGates.filter((gate) => gate.status === 'external-required')
  if (externalGates.length < 4) {
    issues.push({
      id: 'external-gates-too-few',
      severity: 'warning',
      message: '外部真实验收门禁偏少。',
    })
  }

  if (!ciReadinessContract.steps.includes('npm run build')) {
    issues.push({
      id: 'ci-build-step-missing',
      severity: 'error',
      message: 'CI 缺少 build 步骤。',
    })
  }

  if (releasePreviewChecklist.requiredChecks.length < 10) {
    issues.push({
      id: 'preview-checks-too-few',
      severity: 'error',
      message: '预览发布检查项不足。',
    })
  }

  if (finalAcceptanceChecklist.acceptanceAreas.length < 8) {
    issues.push({
      id: 'acceptance-areas-too-few',
      severity: 'error',
      message: '最终验收区域不足。',
    })
  }

  return issues
}
