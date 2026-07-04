import nodes from '../data/domains/experience/nodes.json'
import relations from '../data/core/relations.json'
import nodeReadingContract from '../data/domains/experience/node-reading-contract.json'

function main() {
  const publicNodes = nodes.filter((node) => node.visibility === 'public' || node.visibility === 'semiPublic')
  console.log(`${nodeReadingContract.name}`)
  console.log(`layoutParts=${nodeReadingContract.layout.length}`)
  console.log(`publicNodes=${publicNodes.length}`)
  console.log(`nodesWithContentPath=${publicNodes.filter((node) => Boolean(node.contentPath)).length}`)
  console.log(`nodesWithCover=${publicNodes.filter((node) => Boolean(node.cover)).length}`)
  console.log(`relations=${relations.length}`)
}

main()
