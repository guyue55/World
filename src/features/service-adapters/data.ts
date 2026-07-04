import type { ServiceAdapterContract } from './model'
export const serviceAdapterContracts: ServiceAdapterContract[] = [
 { id:'ai-suggestion-adapter', name:'AI 建议服务适配器', status:'mocked', risk:'high', purpose:'未来接入真实 AI 建议服务，目前只保留 mock contract。', secretPolicy:'env-only', secretPolicyNote:'API Key 不进入仓库；生产通过环境变量注入。', productionReady:false },
 { id:'content-ingestion-adapter', name:'内容接入适配器', status:'planned', risk:'medium', purpose:'未来从真实 CMS、Markdown 或云文档接入内容。', secretPolicy:'env-only', secretPolicyNote:'只读取公开内容或脱敏元数据。', productionReady:false },
 { id:'asset-source-adapter', name:'素材来源适配器', status:'planned', risk:'medium', purpose:'未来管理真实图片、SVG 与授权元数据。', secretPolicy:'no-secret-required', secretPolicyNote:'素材来源和授权说明必须可追溯。', productionReady:false },
]
export const getProductionReadyAdapters=()=>serviceAdapterContracts.filter(a=>a.productionReady)
export const getHighRiskAdapters=()=>serviceAdapterContracts.filter(a=>a.risk==='high')
