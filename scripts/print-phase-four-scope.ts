import phaseFourScopeContract from '../data/core/phase-four-scope-contract.json'
import phaseFourContentProgram from '../data/domains/content/phase-four-content-program.json'

function main() {
  console.log(`${phaseFourScopeContract.name}`)
  console.log(`stageProgress=${phaseFourScopeContract.stageProgress}`)
  console.log(`focus=${phaseFourScopeContract.focus.length}`)
  console.log(`nonGoals=${phaseFourScopeContract.nonGoals.length}`)
  console.log(`entryGuards=${phaseFourScopeContract.entryGuards.length}`)
  console.log(`cadenceWeeks=${phaseFourContentProgram.firstMonthCadence.length}`)
}

main()
