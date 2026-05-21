import type { ObservabilitySignal } from './model'
export const observabilitySignals: ObservabilitySignal[] = [
 { id:'build-health', title:'构建健康度', type:'release', status:'tracked', description:'记录 check、lint、typecheck、build 和 audit 结果。' },
 { id:'privacy-boundary', title:'隐私边界健康度', type:'privacy', status:'tracked', description:'检查公开页面不暴露私密原始内容。' },
 { id:'content-freshness', title:'内容新鲜度', type:'content', status:'planned', description:'追踪内容更新时间、路径完整度和展览覆盖。' },
 { id:'asset-gap-count', title:'素材缺口数量', type:'asset', status:'tracked', description:'追踪 placeholder 与 candidate 素材缺口。' },
 { id:'ai-risk-log', title:'AI 风险日志', type:'ai', status:'tracked', description:'追踪 AI forbidden action 与 high risk workflow。' },
 { id:'performance-budget', title:'性能预算', type:'performance', status:'pending-real-run', description:'真实预览环境中接入 Lighthouse / Web Vitals 预算。' },
]
export const getTrackedSignals=()=>observabilitySignals.filter(s=>s.status==='tracked')
export const getPendingRealRunSignals=()=>observabilitySignals.filter(s=>s.status==='pending-real-run')
