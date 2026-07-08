
import { r3AreaDensity, r3ContentPaths, r3Relations, r3Roadmap, r3WorldNodes } from './data'

export function assertR3ContentLifeBoundary(): string[] {
  const errors: string[] = []
  const nodeIds = new Set(r3WorldNodes.map((node) => node.id))

  if (r3Roadmap.productionLive !== false) errors.push('R3 must keep productionLive false until real external deployment is signed off')
  if (r3WorldNodes.length < 30) errors.push('R3 must include at least 30 real or seed content nodes')
  if (r3ContentPaths.length < 5) errors.push('R3 must include at least 5 exploration paths')
  if (r3AreaDensity.length < 7) errors.push('R3 must keep the 7-area world trunk visible')

  for (const node of r3WorldNodes) {
    if (!node.title || !node.worldTitle) errors.push(`node ${node.id} missing dual title`)
    if (!node.createdAt || !node.area || !node.visibility || !node.lifeStage) errors.push(`node ${node.id} missing four-dimensional coordinate`)
    if (!node.nextAction) errors.push(`node ${node.id} missing next action`)
    if (node.maturity < 0 || node.maturity > 100) errors.push(`node ${node.id} maturity out of range`)
    if ((node.visibility === 'private' || node.visibility === 'sealed') && node.publicIndexAllowed) errors.push(`node ${node.id} leaks private/sealed content into public index`)
    for (const relationId of node.relations) {
      if (!nodeIds.has(relationId)) errors.push(`node ${node.id} references missing relation ${relationId}`)
    }
  }

  for (const relation of r3Relations) {
    if (!nodeIds.has(relation.from)) errors.push(`relation from missing node ${relation.from}`)
    if (!nodeIds.has(relation.to)) errors.push(`relation to missing node ${relation.to}`)
    if (!relation.explanation) errors.push(`relation ${relation.from} -> ${relation.to} missing explanation`)
  }

  return errors
}
