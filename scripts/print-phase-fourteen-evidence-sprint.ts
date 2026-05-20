import evidenceCollectorPlan from '../data/evidence-collector-plan.json'
import manualSignoffPreparationChecklist from '../data/manual-signoff-preparation-checklist.json'
import realExecutionBlockerLedger from '../data/real-execution-blocker-ledger.json'
import realExecutionQueue from '../data/real-execution-queue.json'
import realExecutionResultSummary from '../data/real-execution-result-summary.json'
import releaseReadinessTransitionGate from '../data/release-readiness-transition-gate.json'

function section(title: string) {
  console.log(`\n## ${title}`)
}

function main() {
  console.log('古月浮屿 V1 第十四阶段真实执行证据冲刺摘要')
  console.log(`stageProgress=${realExecutionResultSummary.stageProgress}`)
  console.log(`realExecutionPassed=${realExecutionResultSummary.realExecutionPassed}`)
  console.log(`passed=${realExecutionResultSummary.passed}`)
  console.log(`blocked=${realExecutionResultSummary.blocked}`)
  console.log(`pending=${realExecutionResultSummary.pending}`)

  section('Execution Queue')
  for (const item of realExecutionQueue.items) {
    console.log(`${item.id} | ${item.status} | ${item.command}`)
  }

  section('Blockers')
  for (const blocker of realExecutionBlockerLedger.blockers) {
    console.log(`${blocker.id} | ${blocker.severity} | blocks=${blocker.blocks.join(',')}`)
  }

  section('Manual Signoff')
  console.log(`manualSignoffReady=${manualSignoffPreparationChecklist.manualSignoffReady}`)
  for (const item of manualSignoffPreparationChecklist.items) {
    console.log(`${item.id} | ${item.status}`)
  }

  section('Release Conditions')
  console.log(`releaseReady=${releaseReadinessTransitionGate.releaseReady}`)
  console.log(`transitionAllowed=${releaseReadinessTransitionGate.transitionAllowed}`)
  for (const condition of releaseReadinessTransitionGate.conditions) {
    console.log(`${condition.id} | met=${condition.met}`)
  }

  section('Collector')
  console.log(`collectorReady=${evidenceCollectorPlan.collectorReady}`)
  for (const output of evidenceCollectorPlan.outputs) {
    console.log(`${output.id} | ${output.status} | ${output.file}`)
  }
}

main()
