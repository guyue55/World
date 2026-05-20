import nodes from '../data/nodes.json'
import areas from '../data/areas.json'
import paths from '../data/paths.json'
import archiveProductizationContract from '../data/archive-productization-contract.json'

function main() {
  const publicNodes = nodes.filter((node) => node.visibility === 'public' || node.visibility === 'semiPublic')
  console.log(`${archiveProductizationContract.name}`)
  console.log(`publicNodes=${publicNodes.length}`)
  console.log(`featuredNodes=${publicNodes.filter((node) => node.featured?.home || node.featured?.representative).length}`)
  console.log(`nodesWithCover=${publicNodes.filter((node) => Boolean(node.cover)).length}`)
  console.log(`areas=${areas.length}`)
  console.log(`paths=${paths.length}`)
}

main()
