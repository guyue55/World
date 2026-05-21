import type { ContentChannelDefinition, ContentIndexEntry } from './model'
export const contentChannels: ContentChannelDefinition[] = [
 { id:'article', title:'文章', description:'面向公开阅读的长文、项目记录和观点。', placements:['home','constellation','time-river'] },
 { id:'life', title:'生活', description:'生活片段、日常记录和可公开的个人观察。', placements:['home','constellation'] },
 { id:'tech', title:'技术', description:'工程、AI、工具链、架构和实践复盘。', placements:['home','constellation','lighthouse'] },
 { id:'photo', title:'照片', description:'真实照片、旅行、自然、视觉素材和图像故事。', placements:['home','constellation'] },
 { id:'world-rule', title:'世界规则', description:'世界观、边界、AI 守则、公开/私密规则。', placements:['constellation','lighthouse'] },
 { id:'ai-suggestion', title:'AI 建议', description:'来自 AI 灯塔的建议、审计和风险提示。', placements:['lighthouse'] },
]
export const contentIndexEntries: ContentIndexEntry[] = [
 { seedId:'origin-of-word-life', channel:'article', placement:'home', status:'ready', priority:10 },
 { seedId:'ai-as-lighthouse', channel:'world-rule', placement:'lighthouse', status:'ready', priority:9 },
 { seedId:'floating-digital-world', channel:'photo', placement:'constellation', status:'reviewed', priority:8 },
 { seedId:'round-timeline', channel:'article', placement:'time-river', status:'ready', priority:7 },
 { seedId:'redacted-family-memory', channel:'life', placement:'memory-graph', status:'draft', priority:6 },
]
export const getChannelById=(id:ContentChannelDefinition['id'])=>contentChannels.find(c=>c.id===id)
export const getIndexEntriesByPlacement=(placement:ContentIndexEntry['placement'])=>contentIndexEntries.filter(e=>e.placement===placement)
