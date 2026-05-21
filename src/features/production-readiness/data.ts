import type { ProductionGate } from './model'

export const productionGates: ProductionGate[] = [
  {
    id: 'local-build',
    title: '本地构建',
    status: 'passed',
    evidence: 'npm run build 可在当前环境通过时记录。',
    requiredForProduction: true,
  },
  {
    id: 'preview-deploy',
    title: '预览部署',
    status: 'pending',
    evidence: '需要真实平台预览 URL 和 smoke 结果。',
    requiredForProduction: true,
  },
  {
    id: 'manual-privacy-signoff',
    title: '人工隐私签收',
    status: 'pending',
    evidence: '需要人工确认公开页面不泄露私密原文。',
    requiredForProduction: true,
  },
  {
    id: 'rollback-plan',
    title: '回滚计划',
    status: 'passed',
    evidence: '仓库内记录回滚策略和 Git 基线。',
    requiredForProduction: true,
  },
]

export function getBlockedProductionGates() {
  return productionGates.filter((gate) => gate.status === 'blocked')
}

export function getPendingProductionGates() {
  return productionGates.filter((gate) => gate.status === 'pending')
}

export function isProductionLiveAllowed() {
  return productionGates.every((gate) => !gate.requiredForProduction || gate.status === 'passed')
}
