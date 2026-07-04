import { getWorldOntology } from '../src/lib/ontology'
import { getAllAreaCoordinates } from '../src/lib/spatial'
import { getEvolutionPolicy } from '../src/lib/evolution'

function main() {
  const ontology = getWorldOntology()

  console.log(`Ontology v${ontology.version}`)
  console.log(`Entities: ${ontology.entities.map((entity) => entity.id).join(', ')}`)
  console.log(`Semantic layers: ${ontology.semanticLayers.map((layer) => layer.id).join(', ')}`)
  console.log(`Area coordinates: ${getAllAreaCoordinates().length}`)
  console.log(`Evolution change types: ${getEvolutionPolicy().changeTypes.length}`)
}

main()
