import phaseFourContentProgram from '../../data/phase-four-content-program.json'
import phaseFourContentSeeds from '../../data/phase-four-content-seeds.json'
import phaseFourScopeContract from '../../data/phase-four-scope-contract.json'

export function getPhaseFourContentProgram() {
  return phaseFourContentProgram
}

export function getPhaseFourContentSeeds() {
  return phaseFourContentSeeds.items
}

export function getPhaseFourContentSummary() {
  const seeds = phaseFourContentSeeds.items

  return {
    stageProgress: phaseFourScopeContract.stageProgress,
    theme: phaseFourContentProgram.theme,
    focus: phaseFourScopeContract.focus.length,
    seedCount: seeds.length,
    publicSeeds: seeds.filter((seed) => seed.visibility === 'public').length,
    columns: Array.from(new Set(seeds.map((seed) => seed.column))).length,
    cadenceWeeks: phaseFourContentProgram.firstMonthCadence.length,
  }
}
