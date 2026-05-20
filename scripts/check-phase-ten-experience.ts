import fs from 'node:fs'
import path from 'node:path'
import multiDeviceExperienceMatrix from '../data/multi-device-experience-matrix.json'
import multiDeviceExportPlan from '../data/multi-device-export-plan.json'
import pwaOfflineAccessPlan from '../data/pwa-offline-access-plan.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (multiDeviceExperienceMatrix.deviceReady !== false) errors.push('deviceReady must remain false')
  if (multiDeviceExperienceMatrix.devices.length < 4) errors.push('devices too few')
  if (pwaOfflineAccessPlan.pwaReady !== false) errors.push('pwaReady must remain false')
  if (pwaOfflineAccessPlan.features.length < 5) errors.push('PWA features too few')
  if (multiDeviceExportPlan.exportReady !== false) errors.push('exportReady must remain false')
  if (multiDeviceExportPlan.formats.length < 4) errors.push('export formats too few')
  if (multiDeviceExportPlan.formats.some((item) => item.humanReviewRequired !== true)) errors.push('exports must require human review')
  ;[
    'src/app/intelligent-ops/page.tsx',
    'src/lib/phase-ten-experience.ts',
    'src/components/intelligent-ops/IntelligentOpsHero.tsx',
    'src/components/intelligent-ops/MultiDevicePanel.tsx',
    'src/components/intelligent-ops/PwaOfflinePanel.tsx',
    'src/components/intelligent-ops/MultiDeviceExportPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing experience file: ${file}`)
  })
  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-ten-experience']) errors.push('package missing check:phase-ten-experience')
  if (!pkg.scripts['phase-ten-experience:print']) errors.push('package missing phase-ten-experience:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase ten experience check passed.')
}

main()
