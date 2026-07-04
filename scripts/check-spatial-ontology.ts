import { validateAtlasContract } from '../src/lib/atlas-contract'
import { validateSemanticLayers } from '../src/lib/ontology'
import { validateRelationPolicy } from '../src/lib/relation-policy'

function main() {
  const issues = [
    ...validateAtlasContract(),
    ...validateSemanticLayers(),
    ...validateRelationPolicy(),
  ]

  const errors = issues.filter((issue) => issue.severity === 'error')

  if (errors.length > 0) {
    throw new Error(errors.map((issue) => `${issue.id}: ${issue.message}`).join('\n'))
  }

  console.log(`Spatial / ontology / relation checks passed. warnings=${issues.length - errors.length}`)
}

main()
