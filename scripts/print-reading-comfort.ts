import readingComfortContract from '../data/domains/experience/reading-comfort-contract.json'

function main() {
  console.log(`${readingComfortContract.name}`)
  console.log(`pageParts=${readingComfortContract.pageParts.length}`)
  console.log(`rules=${readingComfortContract.rules.length}`)
  console.log(`performanceRules=${readingComfortContract.performanceRules.length}`)
}

main()
