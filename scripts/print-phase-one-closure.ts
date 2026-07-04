import {
  getNextPhaseReadiness,
  getPhaseOneCompletionMatrix,
  getPhaseOneExitCriteria,
  getPhaseOneRemainingWork,
} from '../src/lib/phase-one-closure'

function main() {
  const matrix = getPhaseOneCompletionMatrix()
  const remaining = getPhaseOneRemainingWork()
  const exitCriteria = getPhaseOneExitCriteria()
  const next = getNextPhaseReadiness()

  console.log(`${matrix.name}: ${matrix.status}`)
  console.log(`completedDomains=${matrix.completedDomains.length}`)
  console.log(`remainingDomains=${matrix.remainingDomains.length}`)

  console.log('P0 remaining work:')
  remaining.items.filter((item) => item.priority === 'P0').forEach((item) => {
    console.log(`- ${item.id}: ${item.title}`)
  })

  console.log(`exitCriteria=${exitCriteria.mustPass.length}`)
  console.log('recommended next batches:')
  next.recommendedNextBatches.forEach((item) => console.log(`- ${item.id}: ${item.title}`))
}

main()
