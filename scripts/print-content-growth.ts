import phaseThreeContentGrowthContract from '../data/domains/content/phase-three-content-growth-contract.json'
import themeExhibitionMap from '../data/domains/experience/theme-exhibition-map.json'
import contentGrowthBoard from '../data/domains/content/content-growth-board.json'

function main() {
  console.log(`${phaseThreeContentGrowthContract.name}`)
  console.log(`stageProgress=${phaseThreeContentGrowthContract.stageProgress}`)
  console.log(`modules=${phaseThreeContentGrowthContract.growthModules.length}`)
  console.log(`exhibitions=${themeExhibitionMap.exhibitions.length}`)
  console.log(`publicExhibitions=${themeExhibitionMap.exhibitions.filter((item) => item.visibility === 'public').length}`)
  console.log(`boardLanes=${contentGrowthBoard.lanes.length}`)
}

main()
