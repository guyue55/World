import compatibilityMatrix from '../../data/compatibility-matrix.json'

export type CompatibilityItem = {
  future: string
  dependsOn: string[]
  v1Status: 'ready' | 'reserved' | 'missing'
}

export type CompatibilityIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getCompatibilityMatrix() {
  return compatibilityMatrix
}

export function getCompatibilityItems(): CompatibilityItem[] {
  return compatibilityMatrix.matrix as CompatibilityItem[]
}

export function validateCompatibilityMatrix(): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = []

  getCompatibilityItems().forEach((item) => {
    if (item.dependsOn.length === 0) {
      issues.push({
        id: `compat-empty-deps-${item.future}`,
        severity: 'error',
        message: `${item.future} 缺少 V1 依赖说明。`,
      })
    }

    if (item.v1Status === 'missing') {
      issues.push({
        id: `compat-missing-${item.future}`,
        severity: 'warning',
        message: `${item.future} 当前缺少 V1 地基。`,
      })
    }
  })

  return issues
}
