import phaseFourContentSeeds from '../data/phase-four-content-seeds.json'

function main() {
  console.log(`${phaseFourContentSeeds.name}`)
  console.log(`stageProgress=${phaseFourContentSeeds.stageProgress}`)
  console.log(`items=${phaseFourContentSeeds.items.length}`)
  console.log(`public=${phaseFourContentSeeds.items.filter((seed) => seed.visibility === 'public').length}`)
  console.log(`columns=${new Set(phaseFourContentSeeds.items.map((seed) => seed.column)).size}`)
}

main()
