import type { MemoryNode } from './model'
const forbiddenRawSignals = ['原文：','raw:','secret:','vault:','sealed raw']
export function isRedactedMemoryNodeSafe(node: MemoryNode){ if(node.visibility!=='private-redacted') return true; return !forbiddenRawSignals.some(signal=>node.summary.toLowerCase().includes(signal)) }
export function getUnsafeRedactedMemoryNodes(nodes: MemoryNode[]){ return nodes.filter(node=>!isRedactedMemoryNodeSafe(node)) }
