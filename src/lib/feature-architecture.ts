import pageCompositionContract from '../../data/page-composition-contract.json'
import featureModuleContract from '../../data/feature-module-contract.json'
import dataFlowContract from '../../data/data-flow-contract.json'
import scalabilityPartition from '../../data/scalability-partition.json'

export type FeatureArchitectureIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getPageCompositionContract() {
  return pageCompositionContract
}

export function getFeatureModuleContract() {
  return featureModuleContract
}

export function getDataFlowContract() {
  return dataFlowContract
}

export function getScalabilityPartition() {
  return scalabilityPartition
}

export function validateFeatureArchitecture(): FeatureArchitectureIssue[] {
  const issues: FeatureArchitectureIssue[] = []

  pageCompositionContract.pageKinds.forEach((pageKind) => {
    if (!pageKind.routes.length) {
      issues.push({
        id: `page-kind-no-route-${pageKind.id}`,
        severity: 'error',
        message: `页面类型 ${pageKind.id} 缺少 routes。`,
      })
    }

    if (!pageKind.mustUse.length) {
      issues.push({
        id: `page-kind-no-must-use-${pageKind.id}`,
        severity: 'warning',
        message: `页面类型 ${pageKind.id} 缺少 mustUse。`,
      })
    }
  })

  featureModuleContract.featureModules.forEach((module) => {
    if (!module.owns.length || !module.paths.length) {
      issues.push({
        id: `feature-module-incomplete-${module.id}`,
        severity: 'error',
        message: `特性模块 ${module.id} 缺少 owns 或 paths。`,
      })
    }
  })

  dataFlowContract.flow.forEach((flow) => {
    if (!flow.from || !flow.to || !flow.purpose) {
      issues.push({
        id: `data-flow-incomplete-${flow.from}-${flow.to}`,
        severity: 'error',
        message: '数据流定义不完整。',
      })
    }
  })

  if (scalabilityPartition.partitions.length < 5) {
    issues.push({
      id: 'scalability-partitions-too-few',
      severity: 'error',
      message: '扩展分区数量不足。',
    })
  }

  return issues
}
