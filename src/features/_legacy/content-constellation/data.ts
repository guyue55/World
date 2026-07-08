import type { ContentEdge, ContentNode, ReadingPath } from './model'
export const contentNodes: ContentNode[] = [
 { id:'world-manifesto', title:'世界宣言', href:'/node/world-manifesto', type:'world-rule', visibility:'public', description:'古月浮屿的世界观原点。', tags:['world','origin'], weight:10 },
 { id:'ai-boundary', title:'AI 灯塔边界', href:'/node/ai-lighthouse-boundary', type:'world-rule', visibility:'public', description:'AI 可以照亮，但不能越权。', tags:['ai','boundary'], weight:9 },
 { id:'digital-universe', title:'个人数字宇宙定义', href:'/node/personal-digital-universe-definition', type:'article', visibility:'public', description:'定义 word-life 的长期方向。', tags:['universe','definition'], weight:8 },
 { id:'first-visit', title:'第一次访问路径', href:'/paths/first-visit', type:'path', visibility:'public', description:'给新访客的第一条路径。', tags:['path','onboarding'], weight:7 },
 { id:'tech-ai', title:'技术与 AI 路径', href:'/paths/tech-ai', type:'path', visibility:'public', description:'从技术、AI、工程视角理解这个世界。', tags:['tech','ai'], weight:7 },
 { id:'archive-index', title:'归档馆', href:'/archive', type:'archive', visibility:'public', description:'长期内容沉淀与索引。', tags:['archive'], weight:6 },
 { id:'family-memory-redacted', title:'家庭记忆脱敏节点', href:'/memory-graph', type:'theme-island', visibility:'private-redacted', description:'只展示脱敏状态，不暴露原文。', tags:['family','redacted'], weight:10 },
]
export const contentEdges: ContentEdge[] = [
 { id:'manifesto-definition', source:'world-manifesto', target:'digital-universe', relation:'explains', label:'定义展开' },
 { id:'manifesto-boundary', source:'world-manifesto', target:'ai-boundary', relation:'protects', label:'边界保护' },
 { id:'first-visit-manifesto', source:'first-visit', target:'world-manifesto', relation:'continues', label:'第一站' },
 { id:'first-visit-definition', source:'first-visit', target:'digital-universe', relation:'continues', label:'理解世界' },
 { id:'tech-ai-boundary', source:'tech-ai', target:'ai-boundary', relation:'references', label:'AI 规则' },
 { id:'archive-definition', source:'archive-index', target:'digital-universe', relation:'belongs-to', label:'长期沉淀' },
 { id:'family-protects-boundary', source:'family-memory-redacted', target:'ai-boundary', relation:'protects', label:'私密脱敏' },
]
export const readingPaths: ReadingPath[] = [
 { id:'first-visit', title:'第一次进入古月浮屿', description:'从世界宣言到个人数字宇宙定义。', nodeIds:['world-manifesto','digital-universe','first-visit'] },
 { id:'ai-boundary', title:'理解 AI 灯塔边界', description:'理解 AI 为什么是灯塔，而不是太阳。', nodeIds:['ai-boundary','tech-ai','family-memory-redacted'] },
 { id:'archive-growth', title:'长期归档与内容生长', description:'从归档馆理解内容如何进入长期世界。', nodeIds:['archive-index','digital-universe','world-manifesto'] },
]
