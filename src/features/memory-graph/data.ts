import type { MemoryGraphSummary, MemoryNode } from './model'
export const memoryGraphNodesV2: MemoryNode[] = [
 { id:'world-origin', title:'世界观原点', visibility:'public', weight:10, summary:'古月浮屿作为个人数字宇宙的起点。', related:['ai-boundary','time-river'] },
 { id:'ai-boundary', title:'AI 灯塔边界', visibility:'public', weight:9, summary:'AI 可以照亮、解释、建议，但不能越权。', related:['world-origin','private-archive-signal'] },
 { id:'time-river', title:'时间河', visibility:'public', weight:8, summary:'V1-V6 与第二轮演进的长期时间结构。', related:['world-origin','release-records'] },
 { id:'release-records', title:'封版记录', visibility:'public', weight:7, summary:'本地工程门禁、审查报告和交接记录。', related:['time-river'] },
 { id:'private-archive-signal', title:'私密档案信号', visibility:'private-redacted', weight:10, summary:'仅显示脱敏存在性与边界状态，不显示原文。', related:['ai-boundary'] },
 { id:'family-memory-signal', title:'家庭记忆信号', visibility:'private-redacted', weight:9, summary:'家庭内容只进入脱敏图谱，不进入公开构建原文。', related:['private-archive-signal'] },
]
export function getMemoryGraphSummary(): MemoryGraphSummary { return { total: memoryGraphNodesV2.length, publicCount: memoryGraphNodesV2.filter(n=>n.visibility==='public').length, redactedCount: memoryGraphNodesV2.filter(n=>n.visibility==='private-redacted').length } }
