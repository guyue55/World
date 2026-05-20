import phaseTwoCharter from '../data/phase-two-charter.json'
import phaseTwoExecutionBoard from '../data/phase-two-execution-board.json'
import phaseTwoRoutePlan from '../data/phase-two-route-plan.json'
import phaseTwoContentCoverPlan from '../data/phase-two-content-cover-plan.json'

function main() {
  console.log(`${phaseTwoCharter.name}`)
  console.log(`status=${phaseTwoCharter.status}`)
  console.log(`lanes=${phaseTwoExecutionBoard.lanes.length}`)
  console.log(`p0Lanes=${phaseTwoExecutionBoard.lanes.filter((lane) => lane.priority === 'P0').length}`)
  console.log(`routes=${phaseTwoRoutePlan.routes.length}`)
  console.log(`contentTargets=${phaseTwoContentCoverPlan.contentTargets.length}`)
}

main()
