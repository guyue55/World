import phaseTwoCharter from '../data/versions/archive/phase-two-charter.json'
import phaseTwoExecutionBoard from '../data/engineering/phase-two-execution-board.json'
import phaseTwoRoutePlan from '../data/domains/experience/phase-two-route-plan.json'
import phaseTwoContentCoverPlan from '../data/domains/content/phase-two-content-cover-plan.json'

function main() {
  const errors: string[] = []

  if (phaseTwoCharter.status !== 'started-with-stage-one-evidence-pending') {
    errors.push('phase two charter must preserve stage-one evidence pending status')
  }

  if (!phaseTwoCharter.relationshipToStageOne.mustNotDo.includes('不得修改 stage-completion-gate.currentStatus 为 complete。')) {
    errors.push('phase two charter must not bypass stage completion gate')
  }

  const lanes = new Set(phaseTwoExecutionBoard.lanes.map((lane) => lane.id))
  ;['evidence-closure', 'home-productization', 'content-seed', 'visual-interaction-fix', 'performance-optimization'].forEach((id) => {
    if (!lanes.has(id)) errors.push(`missing phase two lane: ${id}`)
  })

  const routes = new Set(phaseTwoRoutePlan.routes.map((route) => route.route))
  ;['/', '/archive', '/node/[slug]', '/paths'].forEach((route) => {
    if (!routes.has(route)) errors.push(`missing phase two route plan: ${route}`)
  })

  if (phaseTwoContentCoverPlan.contentTargets.length < 5) {
    errors.push('content targets are too few')
  }

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase two kickoff check passed.')
}

main()
