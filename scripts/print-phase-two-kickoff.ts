import phaseTwoCharter from '../data/versions/archive/phase-two-charter.json'
import phaseTwoExecutionBoard from '../data/engineering/phase-two-execution-board.json'
import phaseTwoRoutePlan from '../data/domains/experience/phase-two-route-plan.json'
import phaseTwoContentCoverPlan from '../data/domains/content/phase-two-content-cover-plan.json'

function main() {
  console.log(`${phaseTwoCharter.name}`)
  console.log(`status=${phaseTwoCharter.status}`)
  console.log(`lanes=${phaseTwoExecutionBoard.lanes.length}`)
  console.log(`p0Lanes=${phaseTwoExecutionBoard.lanes.filter((lane) => lane.priority === 'P0').length}`)
  console.log(`routes=${phaseTwoRoutePlan.routes.length}`)
  console.log(`contentTargets=${phaseTwoContentCoverPlan.contentTargets.length}`)
}

main()
