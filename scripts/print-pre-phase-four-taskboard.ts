import prePhaseFourTaskboard from '../data/pre-phase-four-taskboard.json'

function main() {
  console.log(`${prePhaseFourTaskboard.name}`)
  console.log(`stageProgress=${prePhaseFourTaskboard.stageProgress}`)
  console.log(`completedStructureLines=${prePhaseFourTaskboard.completedStructureLines.length}`)
  console.log(`mustNotSkipBeforePhaseFour=${prePhaseFourTaskboard.mustNotSkipBeforePhaseFour.length}`)
  console.log(`carryForwardToPhaseFour=${prePhaseFourTaskboard.carryForwardToPhaseFour.length}`)
}

main()
