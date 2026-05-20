import privateArchiveIndex from '../data/private-archive-index.json'

function main() {
  console.log(`${privateArchiveIndex.name}`)
  console.log(`stageProgress=${privateArchiveIndex.stageProgress}`)
  console.log(`items=${privateArchiveIndex.items.length}`)
  console.log(`excluded=${privateArchiveIndex.items.filter((item) => item.publicBuild === 'excluded').length}`)
  console.log(`contentStored=${privateArchiveIndex.items.filter((item) => item.contentStored).length}`)
}

main()
