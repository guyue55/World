import fs from 'node:fs'
import path from 'node:path'
import inheritanceExportPlan from '../data/domains/archive/inheritance-export-plan.json'
import timeCapsuleAnnualBookPlan from '../data/domains/archive/time-capsule-annual-book-plan.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (timeCapsuleAnnualBookPlan.timeCapsules.length < 3) errors.push('time capsules too few')
  if (timeCapsuleAnnualBookPlan.timeCapsules.some((item) => item.contentStored !== false)) {
    errors.push('time capsule must not store content')
  }
  if (timeCapsuleAnnualBookPlan.annualWorldBook.sections.length < 5) errors.push('annual world book sections too few')
  if (inheritanceExportPlan.packages.length < 4) errors.push('inheritance packages too few')
  if (inheritanceExportPlan.packages.some((item) => item.containsPrivate !== false)) {
    errors.push('inheritance export must not contain private content in this phase')
  }
  if (!inheritanceExportPlan.confirmationRules.some((rule) => rule.includes('containsPrivate=true'))) {
    errors.push('confirmation rules must forbid private export')
  }

  ;[
    'src/lib/phase-five-inheritance.ts',
    'src/components/private-archive/TimeCapsulePanel.tsx',
    'src/components/private-archive/AnnualWorldBookPanel.tsx',
    'src/components/private-archive/InheritanceExportPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing inheritance file: ${file}`)
  })

  const page = read('src/app/private-archive/page.tsx')
  if (!page.includes('TimeCapsulePanel') || !page.includes('AnnualWorldBookPanel') || !page.includes('InheritanceExportPanel')) {
    errors.push('private archive page missing inheritance panels')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-five-inheritance']) errors.push('package missing check:phase-five-inheritance')
  if (!pkg.scripts['phase-five-inheritance:print']) errors.push('package missing phase-five-inheritance:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase five inheritance check passed.')
}

main()
