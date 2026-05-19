import exportContract from '../../data/export-contract.json'
import type { Visibility } from './types'
import { getPublicNodes } from './nodes'

export type ExportBundle = {
  id: string
  description: string
  include: string[]
  excludeVisibility: Visibility[]
}

export type ExportContractIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getExportContract() {
  return exportContract
}

export function getExportBundles(): ExportBundle[] {
  return exportContract.bundles as ExportBundle[]
}

export function validateExportContract(): ExportContractIssue[] {
  const issues: ExportContractIssue[] = []
  const bundleIds = new Set<string>()

  getExportBundles().forEach((bundle) => {
    if (bundleIds.has(bundle.id)) {
      issues.push({
        id: `duplicate-export-bundle-${bundle.id}`,
        severity: 'error',
        message: `重复导出包：${bundle.id}`,
      })
    }

    bundleIds.add(bundle.id)

    if (!bundle.include.includes('data/world-manifest.json') && bundle.id !== 'archive-snapshot') {
      issues.push({
        id: `missing-manifest-${bundle.id}`,
        severity: 'warning',
        message: `导出包 ${bundle.id} 建议包含 world-manifest。`,
      })
    }
  })

  const publicBundle = getExportBundles().find((bundle) => bundle.id === 'public-world')
  const publicNodes = getPublicNodes()

  if (!publicBundle) {
    issues.push({
      id: 'missing-public-world-bundle',
      severity: 'error',
      message: '缺少 public-world 导出包。',
    })
  }

  if (publicNodes.length === 0) {
    issues.push({
      id: 'empty-public-export',
      severity: 'error',
      message: '公开导出没有任何公开节点。',
    })
  }

  return issues
}
