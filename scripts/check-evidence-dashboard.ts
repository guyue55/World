// 用途：检查证据仪表盘
import fs from 'node:fs'
import path from 'node:path'
import evidenceDashboardContract from '../data/release/evidence-dashboard-contract.json'
import releaseReadyEvidenceMatrix from '../data/release/release-ready-evidence-matrix.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const errors: string[] = []

  if (evidenceDashboardContract.route !== '/evidence') {
    errors.push('evidence dashboard route must be /evidence')
  }

  if (evidenceDashboardContract.sections.length < 5) {
    errors.push('evidence dashboard sections too few')
  }

  if (releaseReadyEvidenceMatrix.status !== 'prepared-not-satisfied') {
    errors.push('evidence matrix must remain prepared-not-satisfied')
  }

  if (!releaseReadyEvidenceMatrix.items.some((item) => item.status === 'open')) {
    errors.push('release blocker evidence item should remain open')
  }

  const legacyEvidenceComponents: Array<{ id: string; primary: string; legacy?: string }> = [
    { id: 'evidence-page', primary: 'src/app/_legacy/evidence/page.tsx' },
    { id: 'EvidenceHero', primary: 'src/components/evidence/EvidenceHero.tsx', legacy: 'src/components/_legacy/evidence/EvidenceHero.tsx' },
    { id: 'EvidenceMatrixPanel', primary: 'src/components/evidence/EvidenceMatrixPanel.tsx', legacy: 'src/components/_legacy/evidence/EvidenceMatrixPanel.tsx' },
    { id: 'EvidenceCommandPanel', primary: 'src/components/evidence/EvidenceCommandPanel.tsx', legacy: 'src/components/_legacy/evidence/EvidenceCommandPanel.tsx' },
  ]
  legacyEvidenceComponents.forEach((entry) => {
    if (!exists(entry.primary) && !(entry.legacy && exists(entry.legacy))) {
      errors.push(`missing evidence file: ${entry.primary}`)
    }
  })

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Evidence dashboard check passed.')
}

main()
