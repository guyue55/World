import { contentEdges, contentNodes, readingPaths } from './data'
export function getRelatedContentNodes(nodeId: string) { const ids=contentEdges.filter(e=>e.source===nodeId||e.target===nodeId).map(e=>e.source===nodeId?e.target:e.source); return contentNodes.filter(n=>ids.includes(n.id)) }
export function getNextPathHints(nodeId: string) { return readingPaths.filter(p=>p.nodeIds.includes(nodeId)) }
export function getContentNodeById(nodeId: string) { return contentNodes.find(n=>n.id===nodeId) }
