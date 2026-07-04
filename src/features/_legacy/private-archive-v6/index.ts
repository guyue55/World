import aiContext from '../../../data/v6-private-archive/ai-redacted-context.json'
import redactedArchiveIndex from '../../../data/v6-private-archive/redacted-archive-index.json'
import privacyLayers from '../../../data/v6-private-archive/privacy-layers.json'
import timeCapsules from '../../../data/v6-private-archive/time-capsules.json'
import type { V6ArchiveExportPlan, V6ArchiveRecord, V6PrivateArchiveDashboard, V6PrivacyLayer, V6TimeCapsule } from './types'

const layers = privacyLayers.layers as V6PrivacyLayer[]
const records = redactedArchiveIndex.records as V6ArchiveRecord[]
const capsules = timeCapsules.capsules as V6TimeCapsule[]

export function getV6PrivacyLayers(): V6PrivacyLayer[] {
  return layers
}

export function getV6RedactedArchiveRecords(): V6ArchiveRecord[] {
  return records
}

export function getV6TimeCapsules(): V6TimeCapsule[] {
  return capsules
}

export function getV6AiRedactedContext() {
  return aiContext
}

export function createV6PrivateArchiveDashboard(): V6PrivateArchiveDashboard {
  const excludedLayers = layers.filter((layer) => layer.publicBuild === 'excluded')
  const vaultSignals = records.filter((record) => record.layer === 'vault' || record.status === 'vault-signal-only').length
  const sealedSignals = records.filter((record) => record.layer === 'sealed' || record.status === 'sealed-signal-only').length

  return {
    totalRecords: records.length,
    excludedFromPublicBuild: excludedLayers.length,
    aiReadableRecords: records.filter((record) => !record.containsRawPrivateContent && record.aiReadableSummary.length > 0).length,
    reviewRequiredLayers: layers.filter((layer) => layer.requiresHumanReviewBeforePublish).length,
    vaultSignals,
    sealedSignals,
    productionLive: false,
  }
}

export function createV6ArchiveExportPlans(): V6ArchiveExportPlan[] {
  return [
    {
      id: 'public-world-summary',
      label: '公开世界摘要包',
      allowed: true,
      requiresOwnerReview: true,
      includesRawPrivateContent: false,
      description: '只导出公开内容与已脱敏摘要，用于 V8 发布运营。',
    },
    {
      id: 'ai-context-pack',
      label: 'AI 只读上下文包',
      allowed: true,
      requiresOwnerReview: true,
      includesRawPrivateContent: false,
      description: '只给 AI 提供边界、索引、摘要和禁止动作。',
    },
    {
      id: 'vault-raw-export',
      label: '保险箱原文导出',
      allowed: false,
      requiresOwnerReview: true,
      includesRawPrivateContent: true,
      description: '不允许进入公开构建或自动导出流程。',
    },
  ]
}

export function assertV6PrivateArchiveSafe(): string[] {
  const errors: string[] = []
  const forbiddenPublicLayers = layers.filter((layer) => layer.publicBuild !== 'excluded' && !layer.aiReadable && layer.requiresHumanReviewBeforePublish)
  if (forbiddenPublicLayers.length > 0) errors.push(`unsafe public layer policy: ${forbiddenPublicLayers.map((layer) => layer.id).join(', ')}`)

  const rawRecords = records.filter((record) => record.containsRawPrivateContent)
  if (rawRecords.length > 0) errors.push(`redacted index contains raw private content: ${rawRecords.map((record) => record.id).join(', ')}`)

  const unsafeCapsules = capsules.filter((capsule) => capsule.rawContentStoredHere)
  if (unsafeCapsules.length > 0) errors.push(`time capsule metadata stores raw content: ${unsafeCapsules.map((capsule) => capsule.id).join(', ')}`)

  const unsafeExport = createV6ArchiveExportPlans().filter((plan) => plan.allowed && plan.includesRawPrivateContent)
  if (unsafeExport.length > 0) errors.push(`raw private export allowed: ${unsafeExport.map((plan) => plan.id).join(', ')}`)

  return errors
}
