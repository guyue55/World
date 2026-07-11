// 用途：兼容 M20 入口，验证 Reality-First 迁移录屏的来源、途中和抵达事实。
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
const failures = []
const pointerPath = 'docs/90-archive/reports/worldos-reality-first/latest-evidence.json'

if (!fs.existsSync(path.join(root, pointerPath))) failures.push('缺少 Reality-First fresh evidence 指针')
else {
  const pointer = readJson(pointerPath)
  const manifest = readJson(pointer.manifest)
  const migrationReportPath = path.join(path.dirname(pointer.manifest), 'flows/migrations/browser-observations.json')
  if (!fs.existsSync(path.join(root, migrationReportPath))) failures.push('缺少迁移浏览器观察')
  else {
    const report = readJson(migrationReportPath)
    for (const result of report.results ?? []) {
      if (!result.arrived || !result.arrivalState) failures.push(`${result.name} 未真实抵达`)
      if (result.name !== 'reduced-path-node' && !result.transit) failures.push(`${result.name} 未捕捉途中态`)
      if (result.final?.active !== 'false' || result.final?.overflow || result.errors?.length) failures.push(`${result.name} 未稳定释放迁移层`)
    }
    if ((report.results ?? []).length < 7) failures.push(`迁移流程不足：${report.results?.length ?? 0}/7`)
    if (!report.edgeChecks?.fastCancelBack || !report.edgeChecks?.route404Settled) failures.push('快速后退或 404 迁移恢复失败')
  }
  for (const flow of ['first-visit', 'scene-migration']) if (!manifest.flows?.[flow]?.bytes) failures.push(`${flow} 录屏缺失`)
}

const shell = fs.readFileSync(path.join(root, 'src/components/world/SceneTransitionShell.tsx'), 'utf8')
const migration = fs.readFileSync(path.join(root, 'src/lib/runtime/scene-migration.ts'), 'utf8')
for (const token of ['SceneMigrationLayer', 'markSceneMigrationArriving', 'restoreSceneMigrationFocus']) if (!shell.includes(token)) failures.push(`SceneTransitionShell 缺少 ${token}`)
for (const token of ["kind: 'leaving'", "kind: 'inTransit'", "kind: 'arriving'", "kind: 'settled'"]) if (!migration.includes(token)) failures.push(`迁移状态机缺少 ${token}`)

if (failures.length) {
  console.error('WorldOS spatial continuity check failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}
console.log('WorldOS spatial continuity check passed: 7 fresh migration flows')
