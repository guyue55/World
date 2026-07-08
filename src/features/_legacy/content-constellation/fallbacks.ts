import type { ContentNode } from './model'
export function getContentEmptyState(nodes: ContentNode[]) { return nodes.length>0 ? null : { title:'星图暂时为空', description:'没有可公开展示的内容节点。私密内容不会为了填充界面而暴露。' } }
export function isSafePublicContentNode(node: ContentNode) { return node.visibility !== 'private-redacted' || node.description.includes('脱敏') || node.description.includes('不暴露原文') }
