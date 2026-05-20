import phaseTwoCharter from '../../data/phase-two-charter.json'
import phaseTwoExecutionBoard from '../../data/phase-two-execution-board.json'
import phaseTwoRoutePlan from '../../data/phase-two-route-plan.json'
import phaseTwoContentCoverPlan from '../../data/phase-two-content-cover-plan.json'

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
