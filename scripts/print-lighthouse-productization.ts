import nodes from '../data/nodes.json'
import paths from '../data/paths.json'
import lighthousePrompts from '../data/lighthouse-prompts.json'
import lighthouseProductizationContract from '../data/lighthouse-productization-contract.json'

function main() {
  const publicNodes = nodes.filter((node) => node.visibility === 'public')
  const publicPaths = paths.filter((item) => item.visibility === 'public')
  console.log(`${lighthouseProductizationContract.name}`)
  console.log(`prompts=${lighthousePrompts.prompts.length}`)
  console.log(`publicNodes=${publicNodes.length}`)
  console.log(`publicPaths=${publicPaths.length}`)
  console.log(`pageParts=${lighthouseProductizationContract.pageParts.length}`)
}

main()
