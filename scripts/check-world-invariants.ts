import { assertWorldInvariants, evaluateWorldInvariants } from '../src/lib/world-invariants'
import { createPublicWorldIndex } from '../src/lib/public-index'

function main() {
  const invariants = evaluateWorldInvariants()
  const publicIndex = createPublicWorldIndex()

  assertWorldInvariants()

  const privateInPublicIndex = publicIndex.nodes.filter((node) => !['public', 'semiPublic'].includes(node.visibility))

  if (privateInPublicIndex.length > 0) {
    throw new Error(`Public index contains private nodes: ${privateInPublicIndex.map((node) => node.id).join(', ')}`)
  }

  console.log(`World invariants passed. ${invariants.length}/${invariants.length} checks passed.`)
}

main()
