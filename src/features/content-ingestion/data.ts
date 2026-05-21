import type { ContentSeed } from './model'
export const contentSeeds: ContentSeed[] = [
 { id:'origin-of-word-life', title:'word-life 的世界入口', summary:'解释为什么这个项目不是普通博客，而是个人数字宇宙。', type:'article', channel:'home', status:'ready', visibility:'public', tags:['world','origin'], assetIds:['cosmic-gateway-placeholder'] },
 { id:'ai-as-lighthouse', title:'AI 是灯塔，不是太阳', summary:'说明 AI 的建议、审计和边界，不允许自动越权。', type:'world-rule', channel:'lighthouse', status:'ready', visibility:'public', tags:['ai','boundary'], assetIds:['lighthouse-diagram-placeholder'] },
 { id:'floating-digital-world', title:'漂浮数字世界设计', summary:'把漂浮岛屿、星海、自然与技术感整合为第三轮真实内容和视觉资产方向。', type:'exhibition', channel:'constellation', status:'reviewed', visibility:'public', tags:['visual','floating-world'], assetIds:['floating-world-reference'] },
 { id:'redacted-family-memory', title:'家庭记忆脱敏信号', summary:'仅保留脱敏存在性，不暴露任何私密原始内容。', type:'diary', channel:'memory-graph', status:'draft', visibility:'private-redacted', tags:['family','redacted'], assetIds:[] },
 { id:'round-timeline', title:'从第一轮到第三轮', summary:'记录项目从仓库化、体验兑现到生产化准备的演进。', type:'project-log', channel:'time-river', status:'ready', visibility:'public', tags:['timeline','round'], assetIds:[] },
]
export const getPublicContentSeeds = () => contentSeeds.filter(s=>s.visibility==='public')
export const getRedactedContentSeeds = () => contentSeeds.filter(s=>s.visibility==='private-redacted')
