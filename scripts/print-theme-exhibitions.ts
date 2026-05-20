import themeExhibitionMap from '../data/theme-exhibition-map.json'
import themeExhibitionImplementationContract from '../data/theme-exhibition-implementation-contract.json'

function main() {
  console.log(`${themeExhibitionImplementationContract.name}`)
  console.log(`stageProgress=${themeExhibitionImplementationContract.stageProgress}`)
  console.log(`route=${themeExhibitionImplementationContract.route}`)
  console.log(`exhibitions=${themeExhibitionMap.exhibitions.length}`)
  console.log(`public=${themeExhibitionMap.exhibitions.filter((item) => item.visibility === 'public').length}`)
}

main()
