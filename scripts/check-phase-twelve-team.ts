import fs from 'node:fs'
import path from 'node:path'
import longTermSustainabilityGovernancePlan from '../data/long-term-sustainability-governance-plan.json'
import platformGovernanceDashboardPlan from '../data/platform-governance-dashboard-plan.json'
import teamCollaborationGovernanceWorkflow from '../data/team-collaboration-governance-workflow.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (teamCollaborationGovernanceWorkflow.teamReady !== false) errors.push('teamReady must remain false')
  if (teamCollaborationGovernanceWorkflow.workflows.length < 6) errors.push('team workflows too few')
  if (teamCollaborationGovernanceWorkflow.workflows.some((item) => item.requiresApproval !== true || item.privateSafe !== true)) {
    errors.push('team workflows must require approval and be private safe')
  }
  if (platformGovernanceDashboardPlan.governanceDashboardReady !== false) errors.push('governanceDashboardReady must remain false')
  if (platformGovernanceDashboardPlan.cards.length < 7) errors.push('governance dashboard cards too few')
  if (longTermSustainabilityGovernancePlan.sustainabilityReady !== false) errors.push('sustainabilityReady must remain false')
  if (longTermSustainabilityGovernancePlan.tracks.length < 6) errors.push('sustainability tracks too few')

  ;[
    'src/lib/phase-twelve-team.ts',
    'src/components/governance/TeamCollaborationPanel.tsx',
    'src/components/governance/GovernanceDashboardPanel.tsx',
    'src/components/governance/SustainabilityPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing team file: ${file}`)
  })

  const page = read('src/app/governance/page.tsx')
  if (!page.includes('TeamCollaborationPanel') || !page.includes('GovernanceDashboardPanel') || !page.includes('SustainabilityPanel')) {
    errors.push('governance page missing team/governance panels')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-twelve-team']) errors.push('package missing check:phase-twelve-team')
  if (!pkg.scripts['phase-twelve-team:print']) errors.push('package missing phase-twelve-team:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase twelve team governance check passed.')
}

main()
