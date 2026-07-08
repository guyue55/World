import type { LighthouseSuggestion } from './model'
export const lighthouseWorkbenchSuggestions: LighthouseSuggestion[] = [
 { id:'curate-theme', title:'整理主题展览', description:'把公开内容整理为一个主题展览草案。', risk:'medium', status:'requires-audit', action:'draft-content', humanRequired:true, boundary:'只生成草稿，不自动发布。' },
 { id:'recommend-first-path', title:'推荐新访客路径', description:'为第一次访问者生成三条公开阅读路径。', risk:'low', status:'preview', action:'recommend-path', humanRequired:false, boundary:'仅使用公开节点和脱敏信号。' },
 { id:'privacy-risk-flag', title:'公开内容风险提示', description:'检查公开内容是否可能误含私密信号。', risk:'high', status:'requires-audit', action:'flag-risk', humanRequired:true, boundary:'只提示风险，不读取私密原文。' },
 { id:'raw-private-blocked', title:'阻止私密原文读取', description:'任何读取私密原文的动作都必须被拒绝。', risk:'high', status:'rejected', action:'read-private-raw', humanRequired:true, boundary:'禁止读取 private/vault/sealed/silent 原文。' },
]
export const forbiddenLighthouseActions = ['publish','delete','change-visibility','read-private-raw'] as const
