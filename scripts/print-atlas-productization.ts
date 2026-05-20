import areas from '../data/domains/experience/areas.json'
import nodes from '../data/domains/experience/nodes.json'
import areaLinks from '../data/domains/experience/area-links.json'
import atlasProductizationContract from '../data/domains/experience/atlas-productization-contract.json'

function main() {
  const publicNodes = nodes.filter((node) => node.visibility === 'public' || node.visibility === 'semiPublic')
  console.log(`${atlasProductizationContract.name}`)
  console.log(`areas=${areas.length}`)
  console.log(`publicAreas=${areas.filter((area) => area.defaultVisibility === 'public').length}`)
  console.log(`publicNodes=${publicNodes.length}`)
  console.log(`areaLinks=${areaLinks.links.length}`)
  console.log(`pageParts=${atlasProductizationContract.pageParts.length}`)
}

main()
