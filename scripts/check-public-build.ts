import nodes from '../data/nodes.json'
import type { Node } from '../src/lib/types'
import { mustExcludeFromPublicBuild } from '../src/lib/visibility'

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

  console.log('Public build check passed.')
}

main()
