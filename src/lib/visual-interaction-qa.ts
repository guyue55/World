import visualQaChecklist from '../../data/visual-qa-checklist.json'
import interactionQaChecklist from '../../data/interaction-qa-checklist.json'
import layoutResponsiveContract from '../../data/layout-responsive-contract.json'
import visualInteractionDefectRegister from '../../data/visual-interaction-defect-register.json'

export type VisualInteractionIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getVisualQaChecklist() {
  return visualQaChecklist
}

export function getInteractionQaChecklist() {
  return interactionQaChecklist
}

export function getLayoutResponsiveContract() {
  return layoutResponsiveContract
}

export function getVisualInteractionDefectRegister() {
  return visualInteractionDefectRegister
}

export function validateVisualInteractionQa(): VisualInteractionIssue[] {
  const issues: VisualInteractionIssue[] = []

  if (visualQaChecklist.viewports.length < 4) {
    issues.push({
      id: 'viewports-too-few',
      severity: 'error',
      message: '多端视觉 QA 视口数量不足。',
    })
  }

  if (visualQaChecklist.routes.length < 8) {
    issues.push({
      id: 'visual-routes-too-few',
      severity: 'error',
      message: '视觉 QA 路由覆盖不足。',
    })
  }

  interactionQaChecklist.interactions.forEach((item) => {
    if (!item.checks.length) {
      issues.push({
        id: `interaction-checks-empty-${item.id}`,
        severity: 'error',
        message: `交互项 ${item.id} 缺少检查点。`,
      })
    }
  })

  const dashboardZone = layoutResponsiveContract.layoutZones.find((zone) => zone.id === 'dashboard')
  if (!dashboardZone) {
    issues.push({
      id: 'dashboard-zone-missing',
      severity: 'error',
      message: '缺少 dashboard 布局宽度区域。',
    })
  }

  const highDefects = visualInteractionDefectRegister.defects.filter((item) => item.severity === 'high')
  if (highDefects.length === 0) {
    issues.push({
      id: 'high-defects-missing',
      severity: 'warning',
      message: '缺少高优先级视觉/交互缺陷记录。',
    })
  }

  return issues
}
