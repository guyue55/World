// 用途：检查运维导出规划
import fs from 'node:fs'
import path from 'node:path'
import phaseThreeOperationsExportContract from '../data/core/phase-three-operations-export-contract.json'
import phaseThreePlanningFinalReport from '../data/release/phase-three-planning-final-report.json'
import exportInheritanceMatrix from '../data/domains/archive/export-inheritance-matrix.json'
import inheritanceExportPlan from '../data/domains/archive/inheritance-export-plan.json'
import releasePreparationFinalReport from '../data/release/release-preparation-final-report.json'
import { getOperationsExportSummary } from '../src/lib/operations-export-planning'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseThreeOperationsExportContract.operationModules.length < 5) {
    errors.push('operation modules too few')
  }

  if (phaseThreeOperationsExportContract.exportFormats.length < 5) {
    errors.push('export formats too few')
  }

  if (!phaseThreeOperationsExportContract.privacyRules.some((rule) => rule.includes('private'))) {
    errors.push('privacy rules must mention private boundary')
  }

  if (phaseThreePlanningFinalReport.completedBatches.length !== 4) {
    errors.push('phase three planning final report must record 4 batches')
  }

  if (phaseThreePlanningFinalReport.summary.releaseDecision !== 'not-ready-for-release') {
    errors.push('phase three final report must preserve not-ready-for-release')
  }

  if (!exportInheritanceMatrix.packages.some((item) => item.id === 'private-inheritance-package' && item.requiresConfirmation)) {
    errors.push('private inheritance package must require confirmation')
  }

  if (!inheritanceExportPlan.packages.some((item) => item.id === 'annual-world-book' && item.confirmationRequired)) {
    errors.push('annual world book must exist and require confirmation')
  }

  const summary = getOperationsExportSummary()
  if (summary.annualWorldBooks < 1) errors.push('operations export summary missing annual world book')
  if (summary.confirmationRequiredExports < 3) errors.push('confirmation-required export count too low')
  if (summary.privateContainingExports !== 0) errors.push('current export plan must not contain private raw content')

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release final report must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:operations-export-planning']) errors.push('package missing check:operations-export-planning')
  if (!pkg.scripts['operations-export:print']) errors.push('package missing operations-export:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Operations export planning check passed.')
}

main()
