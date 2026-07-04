import paths from '../data/domains/experience/paths.json'
import pathProductizationContract from '../data/domains/experience/path-productization-contract.json'

function main() {
  const publicPaths = paths.filter((item) => item.visibility === 'public')
  console.log(`${pathProductizationContract.name}`)
  console.log(`publicPaths=${publicPaths.length}`)
  console.log(`audiences=${Array.from(new Set(publicPaths.map((item) => item.audience))).join(', ')}`)
  console.log(`pageParts=${pathProductizationContract.pageParts.length}`)
  console.log(`nodesInPaths=${publicPaths.reduce((sum, item) => sum + item.nodeSlugs.length, 0)}`)
}

main()
