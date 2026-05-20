import nodes from '../data/domains/experience/nodes.json'
import paths from '../data/domains/experience/paths.json'
import lighthousePrompts from '../data/domains/ai/lighthouse-prompts.json'
import lighthouseProductizationContract from '../data/domains/ai/lighthouse-productization-contract.json'

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
