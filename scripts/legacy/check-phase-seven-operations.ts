import fs from 'node:fs'
import path from 'node:path'
import phaseSevenBackupRollbackPlan from '../data/operations/phase-seven-backup-rollback-plan.json'
import phaseSevenLongTermOperationsPlan from '../data/operations/phase-seven-long-term-operations-plan.json'
import phaseSevenVersionGovernance from '../data/domains/governance/phase-seven-version-governance.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (phaseSevenLongTermOperationsPlan.cadence.length < 6) errors.push('operations cadence too small')
  if (phaseSevenBackupRollbackPlan.backupTargets.length < 5) errors.push('backup targets too few')
  if (phaseSevenBackupRollbackPlan.rollbackSteps.length < 6) errors.push('rollback steps too few')
  if (phaseSevenVersionGovernance.versionRules.length < 5) errors.push('version rules too few')
  if (phaseSevenVersionGovernance.requiredRecords.length < 7) errors.push('required records too few')
  if (!phaseSevenBackupRollbackPlan.rules.includes('私密数据不进入公开备份包。')) {
    errors.push('backup plan must exclude private data from public backup')
  }

  ;[
    'src/lib/phase-seven-operations.ts',
    'src/components/release/LongTermOperationsPanel.tsx',
    'src/components/release/BackupRollbackPanel.tsx',
    'src/components/release/VersionGovernancePanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing operations file: ${file}`)
  })

  const page = read('src/app/release/page.tsx')
  if (!page.includes('LongTermOperationsPanel') || !page.includes('BackupRollbackPanel') || !page.includes('VersionGovernancePanel')) {
    errors.push('release page missing operation panels')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-seven-operations']) errors.push('package missing check:phase-seven-operations')
  if (!pkg.scripts['phase-seven-operations:print']) errors.push('package missing phase-seven-operations:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase seven operations check passed.')
}

main()
