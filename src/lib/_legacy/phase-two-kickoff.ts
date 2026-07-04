import phaseTwoCharter from '../../data/versions/archive/phase-two-charter.json'
import phaseTwoExecutionBoard from '../../data/engineering/phase-two-execution-board.json'
import phaseTwoRoutePlan from '../../data/domains/experience/phase-two-route-plan.json'
import phaseTwoContentCoverPlan from '../../data/domains/content/phase-two-content-cover-plan.json'

export function getPhaseTwoCharter() {
  return phaseTwoCharter
}

export function getPhaseTwoExecutionBoard() {
  return phaseTwoExecutionBoard
}

export function getPhaseTwoRoutePlan() {
  return phaseTwoRoutePlan
}

export function getPhaseTwoContentCoverPlan() {
  return phaseTwoContentCoverPlan
}

export function getPhaseTwoP0LaneCount() {
  return phaseTwoExecutionBoard.lanes.filter((lane) => lane.priority === 'P0').length
}
