// 用途：检查公开构建产物
import nodes from '../data/domains/experience/nodes.json'
import type { Node } from '../src/lib/types'
import { createPublicWorldIndex } from '../src/lib/public-index'
import { isPublicVisible, mustExcludeFromPublicBuild } from '../src/lib/visibility'

const allNodes = nodes as Node[]

function main() {
  const violations = allNodes.filter((node) => {
    if (mustExcludeFromPublicBuild(node.visibility)) {
      return Boolean(node.featured?.home || node.featured?.recommended || node.featured?.representative || node.featured?.pathCore)
    }
    return false
  })

  if (violations.length > 0) {
    throw new Error(
      `Private nodes cannot be featured in public build: ${violations.map((node) => node.id).join(', ')}`
    )
  }

  const aiViolations = allNodes.filter((node) => node.ai?.generated && !node.ai.reviewed && node.visibility === 'public')

  if (aiViolations.length > 0) {
    throw new Error(
      `Unreviewed AI generated nodes cannot be public: ${aiViolations.map((node) => node.id).join(', ')}`
    )
  }

  const publicIndex = createPublicWorldIndex()
  const leakedNodes = publicIndex.nodes.filter((node) => !isPublicVisible(node.visibility))
  if (leakedNodes.length > 0) {
    throw new Error(`Public index contains non-public nodes: ${leakedNodes.map((node) => node.id).join(', ')}`)
  }

  const areaVisibilityLeaks = publicIndex.areas.filter((area) => 'defaultVisibility' in area)
  if (areaVisibilityLeaks.length > 0) {
    throw new Error(`Public index areas must not expose defaultVisibility: ${areaVisibilityLeaks.map((area) => area.id).join(', ')}`)
  }

  const leakedEvents = publicIndex.events.filter((event) => event.visibility && !isPublicVisible(event.visibility))
  if (leakedEvents.length > 0) {
    throw new Error(`Public index contains non-public events: ${leakedEvents.map((event) => event.id).join(', ')}`)
  }

  console.log('Public build check passed.')
}

main()
