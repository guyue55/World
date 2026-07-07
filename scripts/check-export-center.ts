// 用途：检查导出中心
import fs from 'node:fs'
import path from 'node:path'
import exportCenterImplementationContract from '../data/core/export-center-implementation-contract.json'
import exportInheritanceMatrix from '../data/domains/archive/export-inheritance-matrix.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const errors: string[] = []

  if (exportCenterImplementationContract.route !== '/export-center') {
    errors.push('export center route must be /export-center')
  }

  if (exportInheritanceMatrix.packages.length < 5) {
    errors.push('export package count too low')
  }

  if (!exportInheritanceMatrix.packages.some((item) => item.id === 'private-inheritance-package' && item.requiresConfirmation)) {
    errors.push('private inheritance package must require confirmation')
  }

  if (!exists('src/app/_legacy/export-center/page.tsx')) errors.push('missing export center page')
  if (!exists('src/components/export-center/ExportCenterHero.tsx')) errors.push('missing ExportCenterHero')
  if (!exists('src/components/export-center/ExportPackageGrid.tsx')) errors.push('missing ExportPackageGrid')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Export center check passed.')
}

main()
