import type { ObservabilitySignal } from './model'

export const observabilitySignals: ObservabilitySignal[] = [
  {
    id: 'build-health',
    title: '构建健康度',
    type: 'release',
    status: 'tracked',
    description: '记录 lint/typecheck/build/check 结果。',
  },
  {
    id: 'privacy-boundary',
    title: '隐私边界健康度',
    type: 'privacy',
    status: 'tracked',
    description: '检查公开页面不暴露 private raw content。',
  },
  {
    id: 'content-freshness',
    title: '内容新鲜度',
    type: 'content',
    status: 'planned',
    description: '未来追踪内容更新时间、路径完整度和展览覆盖。',
  },
  {
    id: 'performance-budget',
    title: '性能预算',
    type: 'performance',
    status: 'planned',
    description: '未来接入 Lighthouse / Web Vitals 预算。',
  },
]
