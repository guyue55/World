import type { ServiceAdapterContract } from './model'

export const serviceAdapterContracts: ServiceAdapterContract[] = [
  {
    id: 'ai-suggestion-adapter',
    name: 'AI 建议服务适配器',
    status: 'mocked',
    risk: 'high',
    purpose: '未来接入真实 AI 建议服务，目前仅保留 mock contract。',
    secretPolicy: '不在仓库中保存 API Key；生产通过环境变量注入。',
    productionReady: false,
  },
  {
    id: 'content-ingestion-adapter',
    name: '内容接入适配器',
    status: 'planned',
    risk: 'medium',
    purpose: '未来从真实 CMS、Markdown 或云文档接入内容。',
    secretPolicy: '只读取公开内容或脱敏元数据。',
    productionReady: false,
  },
  {
    id: 'asset-source-adapter',
    name: '素材来源适配器',
    status: 'planned',
    risk: 'medium',
    purpose: '未来管理真实图片、SVG 与授权元数据。',
    secretPolicy: '素材来源和授权说明必须可追溯。',
    productionReady: false,
  },
]

export function getProductionReadyAdapters() {
  return serviceAdapterContracts.filter((adapter) => adapter.productionReady)
}

export function getHighRiskAdapters() {
  return serviceAdapterContracts.filter((adapter) => adapter.risk === 'high')
}
